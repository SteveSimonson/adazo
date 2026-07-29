#!/usr/bin/env python3
"""
Generate full Grok Imagine videos into Adazo R2 (ZDR-safe).

Flow:
  1. POST /api/media/upload-url  (Bearer MEDIA_UPLOAD_SECRET)
  2. POST https://api.x.ai/v1/videos/generations with output.upload_url
  3. Poll until done
  4. Download public_url (or xAI returned url) to a local path

Auth (first found wins):
  - XAI_API_KEY env
  - OIDC access token in ~/.grok/auth.json (Grok Build login)

Usage:
  python3 scripts/imagine-video.py \\
    --image https://adazo.com/brand/videos/reels/posters/handbags.jpg \\
    --name handbags-reel \\
    --prompt "Slow push-in, soft fabric motion" \\
    --out public/brand/videos/reels/handbags.mp4
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

SITE = os.environ.get("ADAZO_SITE", "https://adazo.com")
API = "https://api.x.ai/v1"


def die(msg: str, code: int = 1) -> None:
    print(f"error: {msg}", file=sys.stderr)
    raise SystemExit(code)


def load_xai_token() -> str:
    env = os.environ.get("XAI_API_KEY") or os.environ.get("XAI_TOKEN")
    if env:
        return env.strip()
    auth_path = Path.home() / ".grok" / "auth.json"
    if not auth_path.is_file():
        die("No XAI_API_KEY and no ~/.grok/auth.json — log into Grok Build or export a key")
    data = json.loads(auth_path.read_text())
    for entry in data.values():
        if isinstance(entry, dict) and entry.get("key"):
            return str(entry["key"])
    die("Could not find OIDC key in ~/.grok/auth.json")


def load_media_secret() -> str:
    env = os.environ.get("MEDIA_UPLOAD_SECRET")
    if env:
        return env.strip()
    # local wrangler secret mirror
    for cand in (
        Path(".dev.vars"),
        Path(__file__).resolve().parents[1] / ".dev.vars",
    ):
        if cand.is_file():
            for line in cand.read_text().splitlines():
                if line.startswith("MEDIA_UPLOAD_SECRET="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    die("MEDIA_UPLOAD_SECRET not set (env or .dev.vars)")


DEFAULT_UA = "AdazoImagineVideo/1.0 (+https://adazo.com)"


def http_json(
    method: str,
    url: str,
    *,
    headers: dict[str, str] | None = None,
    body: dict | None = None,
    timeout: int = 120,
) -> tuple[int, dict | str]:
    data = None if body is None else json.dumps(body).encode()
    hdrs = {"User-Agent": DEFAULT_UA, **(headers or {})}
    req = urllib.request.Request(
        url,
        data=data,
        headers=hdrs,
        method=method,
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read().decode()
            try:
                return resp.status, json.loads(raw) if raw else {}
            except json.JSONDecodeError:
                return resp.status, raw
    except urllib.error.HTTPError as e:
        raw = e.read().decode()
        try:
            return e.code, json.loads(raw) if raw else {"error": raw}
        except json.JSONDecodeError:
            return e.code, {"error": raw}


def mint_upload(
    secret: str,
    *,
    name: str,
    content_type: str = "video/mp4",
    ttl: int = 7200,
    key: str | None = None,
) -> dict:
    body: dict = {
        "kind": "video",
        "name": name,
        "contentType": content_type,
        "ttlSeconds": ttl,
    }
    if key:
        body["key"] = key
    status, data = http_json(
        "POST",
        f"{SITE}/api/media/upload-url",
        headers={
            "Authorization": f"Bearer {secret}",
            "Content-Type": "application/json",
        },
        body=body,
    )
    if status >= 300 or not isinstance(data, dict) or not data.get("ok"):
        die(f"mint upload-url failed ({status}): {data}")
    return data


def start_video(
    token: str,
    *,
    prompt: str,
    image_url: str,
    upload_url: str,
    duration: int,
    resolution: str,
    aspect_ratio: str | None,
    model: str,
) -> str:
    payload: dict = {
        "model": model,
        "prompt": prompt,
        "image": {"url": image_url},
        "duration": duration,
        "resolution": resolution,
        "output": {"upload_url": upload_url},
    }
    if aspect_ratio:
        payload["aspect_ratio"] = aspect_ratio
    status, data = http_json(
        "POST",
        f"{API}/videos/generations",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        body=payload,
    )
    if status >= 300 or not isinstance(data, dict) or not data.get("request_id"):
        die(f"video start failed ({status}): {data}")
    return str(data["request_id"])


def poll_video(token: str, request_id: str, *, timeout_s: int = 600) -> dict:
    deadline = time.time() + timeout_s
    while time.time() < deadline:
        status, data = http_json(
            "GET",
            f"{API}/videos/{request_id}",
            headers={"Authorization": f"Bearer {token}"},
            timeout=60,
        )
        if status >= 300 or not isinstance(data, dict):
            die(f"poll failed ({status}): {data}")
        st = data.get("status")
        prog = data.get("progress")
        print(f"  status={st} progress={prog}", flush=True)
        if st == "done":
            return data
        if st in ("failed", "expired"):
            die(f"video {st}: {data}")
        time.sleep(5)
    die("video poll timed out")


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(
        url,
        method="GET",
        headers={"User-Agent": DEFAULT_UA},
    )
    with urllib.request.urlopen(req, timeout=300) as resp, dest.open("wb") as f:
        while True:
            chunk = resp.read(1024 * 256)
            if not chunk:
                break
            f.write(chunk)


def resolve_image_url(image: str) -> str:
    """HTTPS URL pass-through, or local file → data URI for the API."""
    if image.startswith("http://") or image.startswith("https://") or image.startswith(
        "data:"
    ):
        return image
    path = Path(image)
    if not path.is_file():
        die(f"image not found: {image}")
    raw = path.read_bytes()
    # keep payloads reasonable
    if len(raw) > 12 * 1024 * 1024:
        die(f"image too large ({len(raw)} bytes): {image}")
    import base64
    import mimetypes

    mime = mimetypes.guess_type(path.name)[0] or "image/jpeg"
    b64 = base64.b64encode(raw).decode("ascii")
    return f"data:{mime};base64,{b64}"


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument(
        "--image",
        required=True,
        help="Public HTTPS image URL, data URI, or local file path (first frame)",
    )
    ap.add_argument("--prompt", required=True, help="Motion prompt")
    ap.add_argument("--name", required=True, help="Object name stem for R2 key")
    ap.add_argument("--out", required=True, help="Local path to write the MP4")
    ap.add_argument("--key", default=None, help="Optional full R2 key video/…")
    ap.add_argument("--duration", type=int, default=6)
    ap.add_argument("--resolution", default="720p", choices=["480p", "720p", "1080p"])
    ap.add_argument("--aspect-ratio", default=None, help="e.g. 3:4 or 4:5 if supported")
    ap.add_argument("--model", default="grok-imagine-video")
    ap.add_argument("--ttl", type=int, default=7200)
    args = ap.parse_args()

    token = load_xai_token()
    secret = load_media_secret()
    image_url = resolve_image_url(args.image)
    if image_url.startswith("data:"):
        print(f"image: local → data URI ({len(image_url)} chars)", flush=True)
    else:
        print(f"image: {image_url}", flush=True)

    print(f"minting R2 upload_url for {args.name}…", flush=True)
    mint = mint_upload(secret, name=args.name, ttl=args.ttl, key=args.key)
    upload_url = mint["upload_url"]
    public_url = mint["public_url"]
    print(f"  key={mint['key']}", flush=True)
    print(f"  public_url={public_url}", flush=True)

    print("starting Imagine video…", flush=True)
    request_id = start_video(
        token,
        prompt=args.prompt,
        image_url=image_url,
        upload_url=upload_url,
        duration=args.duration,
        resolution=args.resolution,
        aspect_ratio=args.aspect_ratio,
        model=args.model,
    )
    print(f"  request_id={request_id}", flush=True)

    result = poll_video(token, request_id)
    video = result.get("video") or {}
    # Prefer our public R2 URL (stable); fall back to whatever the API returns
    fetch_url = public_url
    # Give R2 a moment after PUT
    time.sleep(1)
    out = Path(args.out)
    print(f"downloading → {out}", flush=True)
    try:
        download(fetch_url, out)
    except Exception as e:
        alt = video.get("url")
        if alt and alt != fetch_url:
            print(f"  public_url failed ({e}); trying API url…", flush=True)
            download(str(alt), out)
        else:
            die(f"download failed: {e}")

    size = out.stat().st_size
    if size < 10_000:
        die(f"downloaded file too small ({size} bytes) — generation may have failed")
    print(
        json.dumps(
            {
                "ok": True,
                "request_id": request_id,
                "key": mint["key"],
                "public_url": public_url,
                "out": str(out),
                "bytes": size,
                "duration": video.get("duration"),
                "model": result.get("model"),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
