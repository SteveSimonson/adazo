#!/usr/bin/env python3
"""
Regenerate all category Product Reels with full Imagine video (R2 upload_url).

Requires:
  - MEDIA_UPLOAD_SECRET (.dev.vars or env)
  - XAI_API_KEY or Grok Build ~/.grok/auth.json
  - Deployed posters at https://adazo.com/brand/videos/reels/posters/{cat}.jpg
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "imagine-video.py"
OUT_DIR = ROOT / "public" / "brand" / "videos" / "reels"
SITE = "https://adazo.com"

# category → motion prompt (one simple camera/subject motion each)
REELS: list[tuple[str, str]] = [
    (
        "handbags",
        "Slow gentle camera push-in on the woman and structured black handbag, soft lobby light drifts, fabric barely moves, elegant calm fashion motion.",
    ),
    (
        "jewelry",
        "Slow push-in toward diamond earrings and tennis bracelet, light sparkles across stones, elegant still portrait with subtle jewelry gleam.",
    ),
    (
        "watches",
        "Gentle camera push on the steel luxury watch at the wrist, cool studio light slides across the crystal, quiet precision motion.",
    ),
    (
        "gold",
        "Slow camera drift across solid yellow gold chain and signet ring, warm amber light catches metal, confident quiet luxury motion.",
    ),
    (
        "luxury",
        "Soft push-in on the woman at the vanity with prestige cream jar, champagne light glows, silk robe barely moves, calm beauty ritual.",
    ),
    (
        "fragrance",
        "Gentle mist drift from perfume bottle near collarbone, soft violet light haze, slow elegant camera push, romantic fragrance motion.",
    ),
    (
        "skincare",
        "Serum drop glints near glowing skin, soft morning light, gentle camera push-in, serene clean beauty motion.",
    ),
    (
        "hair",
        "Hair strands catch warm light as she turns slightly, soft sheen motion, gentle camera push, luxurious hair campaign.",
    ),
    (
        "makeup",
        "Soft brush motion applying blush, warm glam light, subtle cheek catchlight, slow elegant camera push.",
    ),
    (
        "body",
        "Slow lotion-smooth hand glide on arm, spa steam soft light, gentle camera push, calm body-care ritual.",
    ),
    (
        "tools",
        "Chrome styling tools catch a cool light sweep on marble vanity, slight camera push, modern beauty tools energy.",
    ),
    (
        "sun-spf",
        "Soft daylight flare on sunscreen bottle near face, gentle breeze in linen, slow push-in, fresh summer SPF motion.",
    ),
    (
        "lips",
        "Glossy lip balm catchlight, subtle smile, blush silk backdrop, intimate slow camera push.",
    ),
    (
        "wellness",
        "Quiet pour into glass in morning light, calm breath, gentle camera push, wellness lifestyle motion.",
    ),
]


def main() -> None:
    only = set(sys.argv[1:]) if len(sys.argv) > 1 else None
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    failures: list[str] = []

    for cat, prompt in REELS:
        if only and cat not in only:
            continue
        image = f"{SITE}/brand/videos/reels/posters/{cat}.jpg"
        out = OUT_DIR / f"{cat}.mp4"
        print(f"\n=== {cat} ===", flush=True)
        cmd = [
            sys.executable,
            str(SCRIPT),
            "--image",
            image,
            "--prompt",
            prompt,
            "--name",
            f"{cat}-reel",
            "--key",
            f"video/reels/{cat}.mp4",
            "--out",
            str(out),
            "--duration",
            "6",
            "--resolution",
            "720p",
            "--aspect-ratio",
            "3:4",
        ]
        r = subprocess.run(cmd, cwd=str(ROOT))
        if r.returncode != 0:
            failures.append(cat)
            print(f"FAILED {cat}", flush=True)
        else:
            print(f"OK {cat} → {out}", flush=True)

    if failures:
        print(f"\nFailed: {', '.join(failures)}", file=sys.stderr)
        raise SystemExit(1)
    print("\nAll category reels generated.")


if __name__ == "__main__":
    main()
