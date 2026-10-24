#!/usr/bin/env python3
"""Generate pretty local SVG placeholder images for the photo gallery."""
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "images")

# Each placeholder: (filename, top tint, bottom tint, accent, label number)
PLACEHOLDERS = [
    ("photo-1.svg", "#ffe3ec", "#ffc2d4", "#c2415f", "1"),
    ("photo-2.svg", "#f6e7ff", "#e2c2f5", "#8e44ad", "2"),
    ("photo-3.svg", "#fff0e6", "#ffd6ba", "#c1553b", "3"),
    ("photo-4.svg", "#ffe9f2", "#f7c8dd", "#a33b63", "4"),
    ("photo-5.svg", "#f3e8ff", "#d9b8f2", "#6c3483", "5"),
    ("photo-6.svg", "#ffe8ef", "#f9c6d7", "#b03a5b", "6"),
]

TEMPLATE = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="600" height="750" role="img" aria-label="Placeholder for photo {num}">
  <defs>
    <linearGradient id="bg{num}" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="{top}"/>
      <stop offset="100%" stop-color="{bottom}"/>
    </linearGradient>
    <radialGradient id="glow{num}" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="750" fill="url(#bg{num})"/>
  <rect width="600" height="750" fill="url(#glow{num})"/>

  <!-- elegant double frame -->
  <rect x="22" y="22" width="556" height="706" rx="14" fill="none" stroke="{accent}" stroke-opacity="0.4" stroke-width="2"/>
  <rect x="32" y="32" width="536" height="686" rx="10" fill="none" stroke="{accent}" stroke-opacity="0.18" stroke-width="1"/>

  <!-- corner flourishes -->
  <g stroke="{accent}" stroke-opacity="0.32" fill="none" stroke-width="2.4" stroke-linecap="round">
    <path d="M56 96 C 56 64, 76 56, 104 56"/>
    <path d="M544 96 C 544 64, 524 56, 496 56"/>
    <path d="M56 654 C 56 686, 76 694, 104 694"/>
    <path d="M544 654 C 544 686, 524 694, 496 694"/>
  </g>

  <!-- number tag -->
  <g>
    <rect x="252" y="56" width="96" height="42" rx="21" fill="#ffffff" fill-opacity="0.66" stroke="{accent}" stroke-opacity="0.35"/>
    <text x="300" y="84" text-anchor="middle" font-family="Georgia, serif" font-size="21" fill="{accent}" fill-opacity="0.85">№ {num}</text>
  </g>

  <!-- six-petal lily line-art -->
  <g transform="translate(300 340)" stroke="{accent}" stroke-opacity="0.5" fill="none" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
    <g transform="scale(2.05)">
      <path d="M0 0 C -8 -11, -9 -32, 0 -50 C 9 -32, 8 -11, 0 0 Z"/>
      <path d="M0 0 C -8 -11, -9 -32, 0 -50 C 9 -32, 8 -11, 0 0 Z" transform="rotate(60)"/>
      <path d="M0 0 C -8 -11, -9 -32, 0 -50 C 9 -32, 8 -11, 0 0 Z" transform="rotate(120)"/>
      <path d="M0 0 C -8 -11, -9 -32, 0 -50 C 9 -32, 8 -11, 0 0 Z" transform="rotate(180)"/>
      <path d="M0 0 C -8 -11, -9 -32, 0 -50 C 9 -32, 8 -11, 0 0 Z" transform="rotate(240)"/>
      <path d="M0 0 C -8 -11, -9 -32, 0 -50 C 9 -32, 8 -11, 0 0 Z" transform="rotate(300)"/>
      <circle cx="0" cy="0" r="6" fill="{accent}" fill-opacity="0.4" stroke="none"/>
    </g>
    <path d="M0 104 C -3 130, 4 152, 0 176" stroke-opacity="0.35"/>
  </g>

  <!-- sparkle dots -->
  <g fill="{accent}" fill-opacity="0.3">
    <circle cx="140" cy="200" r="3.4"/><circle cx="462" cy="176" r="2.8"/>
    <circle cx="446" cy="520" r="3.4"/><circle cx="132" cy="548" r="2.8"/>
  </g>

  <!-- labels -->
  <text x="300" y="606" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="32" fill="{accent}" fill-opacity="0.92" font-style="italic">Your photo {num}</text>
  <text x="300" y="646" text-anchor="middle" font-family="Georgia, serif" font-size="14" letter-spacing="3" fill="{accent}" fill-opacity="0.6">REPLACE ME WITH YOUR PICTURE</text>
  <line x1="240" y1="624" x2="360" y2="624" stroke="{accent}" stroke-opacity="0.3"/>
</svg>
"""


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    for name, top, bottom, accent, num in PLACEHOLDERS:
        path = os.path.join(OUT, name)
        with open(path, "w", encoding="utf-8") as f:
            f.write(TEMPLATE.format(num=num, top=top, bottom=bottom, accent=accent))
        print(f"wrote {path}")


if __name__ == "__main__":
    main()
