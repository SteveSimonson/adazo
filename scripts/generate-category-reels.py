#!/usr/bin/env python3
"""
Generate category Product Reels with full Imagine video (R2 upload_url).

Usage:
  python3 scripts/generate-category-reels.py              # gen 1, all cats
  python3 scripts/generate-category-reels.py --gen 2      # gen 2, all cats
  python3 scripts/generate-category-reels.py --gen 2 handbags jewelry

Requires MEDIA_UPLOAD_SECRET + XAI_API_KEY or ~/.grok/auth.json
Posters must already exist at public HTTPS paths.
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "imagine-video.py"
OUT_DIR = ROOT / "public" / "brand" / "videos" / "reels"
SITE = "https://adazo.com"

# category → motion prompt by generation
PROMPTS: dict[int, dict[str, str]] = {
    1: {
        "handbags": "Slow gentle camera push-in on the woman and structured black handbag, soft lobby light drifts, fabric barely moves, elegant calm fashion motion.",
        "jewelry": "Slow push-in toward diamond earrings and tennis bracelet, light sparkles across stones, elegant still portrait with subtle jewelry gleam.",
        "watches": "Gentle camera push on the steel luxury watch at the wrist, cool studio light slides across the crystal, quiet precision motion.",
        "gold": "Slow camera drift across solid yellow gold chain and signet ring, warm amber light catches metal, confident quiet luxury motion.",
        "luxury": "Soft push-in on the woman at the vanity with prestige cream jar, champagne light glows, silk robe barely moves, calm beauty ritual.",
        "fragrance": "Gentle mist drift from perfume bottle near collarbone, soft violet light haze, slow elegant camera push, romantic fragrance motion.",
        "skincare": "Serum drop glints near glowing skin, soft morning light, gentle camera push-in, serene clean beauty motion.",
        "hair": "Hair strands catch warm light as she turns slightly, soft sheen motion, gentle camera push, luxurious hair campaign.",
        "makeup": "Soft brush motion applying blush, warm glam light, subtle cheek catchlight, slow elegant camera push.",
        "body": "Slow lotion-smooth hand glide on arm, spa steam soft light, gentle camera push, calm body-care ritual.",
        "tools": "Chrome styling tools catch a cool light sweep on marble vanity, slight camera push, modern beauty tools energy.",
        "sun-spf": "Soft daylight flare on sunscreen bottle near face, gentle breeze in linen, slow push-in, fresh summer SPF motion.",
        "lips": "Glossy lip balm catchlight, subtle smile, blush silk backdrop, intimate slow camera push.",
        "wellness": "Quiet pour into glass in morning light, calm breath, gentle camera push, wellness lifestyle motion.",
    },
    2: {
        "handbags": "Woman walking city-sidewalk golden hour with structured bag at hip, slow tracking push, fabric and strap move gently, elegant fashion motion.",
        "jewelry": "Woman turns toward bright window, diamond necklace and earrings catch light in a soft flash, slow push-in, jewelry campaign motion.",
        "watches": "Close wrist as she adjusts a steel luxury watch cuff, cool side light slides across the dial, precise calm motion.",
        "gold": "Layered solid gold chains sway with a slow shoulder turn, warm amber light, confident jewelry motion.",
        "luxury": "She lifts a prestige cream jar lid, soft champagne light on fingertips and jar, intimate vanity ritual motion.",
        "fragrance": "Crystal perfume bottle tilts as mist drifts past collarbone, rose-violet haze, slow romantic camera push.",
        "skincare": "She pats serum into dewy cheek, soft daylight, gentle beauty motion, clean skincare campaign.",
        "hair": "Brush glides through glossy hair in warm backlight, strands fall softly, luxurious hair motion.",
        "makeup": "Lip color applies in a soft glide, mirror light, intimate glam makeup motion.",
        "body": "Body mist spray arcs in soft spa steam, slow push, calm body-care motion.",
        "tools": "Hair dryer sweeps with chrome gleam on marble, studio light arc, modern tools motion.",
        "sun-spf": "She taps SPF on cheek in beach linen breeze, soft sun flare, fresh summer motion.",
        "lips": "Lip balm press and soft smile, blush silk light, intimate lip-care motion.",
        "wellness": "Steam rises from morning mug by a bright window, quiet breath, wellness lifestyle motion.",
    },
}


def asset_names(cat: str, gen: int) -> tuple[str, str, str]:
    """poster basename, video basename, r2 key stem"""
    if gen <= 1:
        return cat, cat, cat
    return f"{cat}-g{gen}", f"{cat}-g{gen}", f"{cat}-g{gen}"


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--gen", type=int, default=1, help="Generation wave (1 or 2)")
    ap.add_argument("categories", nargs="*", help="Optional subset of categories")
    args = ap.parse_args()
    gen = args.gen
    if gen not in PROMPTS:
        print(f"error: unsupported generation {gen}", file=sys.stderr)
        raise SystemExit(2)

    prompts = PROMPTS[gen]
    cats = args.categories or list(prompts.keys())
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    failures: list[str] = []

    for cat in cats:
        if cat not in prompts:
            print(f"skip unknown {cat}", flush=True)
            continue
        poster_name, video_name, key_stem = asset_names(cat, gen)
        local_poster = ROOT / "public" / "brand" / "videos" / "reels" / "posters" / f"{poster_name}.jpg"
        # Prefer local poster (data URI) so gen-N works before CDN deploy
        if local_poster.is_file():
            image = str(local_poster)
        else:
            image = f"{SITE}/brand/videos/reels/posters/{poster_name}.jpg"
        out = OUT_DIR / f"{video_name}.mp4"
        print(f"\n=== gen{gen} {cat} ===", flush=True)
        cmd = [
            sys.executable,
            str(SCRIPT),
            "--image",
            image,
            "--prompt",
            prompts[cat],
            "--name",
            f"{key_stem}-reel",
            "--key",
            f"video/reels/{key_stem}.mp4",
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
    print(f"\nAll gen{gen} category reels generated.")


if __name__ == "__main__":
    main()
