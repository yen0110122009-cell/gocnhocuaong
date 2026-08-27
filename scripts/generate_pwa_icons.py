from PIL import Image, ImageDraw


def make_icon(size: int, output: str) -> None:
    image = Image.new("RGBA", (size, size), (255, 248, 251, 255))
    draw = ImageDraw.Draw(image)
    scale = size / 512

    # Soft pink rounded-square background.
    margin = int(20 * scale)
    draw.rounded_rectangle(
        (margin, margin, size - margin, size - margin),
        radius=int(112 * scale),
        fill=(255, 214, 231, 255),
    )

    # Mint inner glow.
    draw.ellipse(
        (int(54 * scale), int(54 * scale), int(458 * scale), int(458 * scale)),
        fill=(225, 247, 232, 255),
    )

    cx, cy = int(256 * scale), int(276 * scale)
    body_w, body_h = int(190 * scale), int(210 * scale)
    left, top, right, bottom = cx - body_w // 2, cy - body_h // 2, cx + body_w // 2, cy + body_h // 2

    # Wings.
    wing_fill = (255, 255, 255, 235)
    draw.ellipse((int(118 * scale), int(130 * scale), int(260 * scale), int(270 * scale)), fill=wing_fill, outline=(247, 174, 198, 255), width=max(2, int(6 * scale)))
    draw.ellipse((int(252 * scale), int(130 * scale), int(394 * scale), int(270 * scale)), fill=wing_fill, outline=(247, 174, 198, 255), width=max(2, int(6 * scale)))

    # Bee body.
    draw.ellipse((left, top, right, bottom), fill=(255, 208, 76, 255), outline=(47, 43, 48, 255), width=max(3, int(10 * scale)))
    stripe = int(34 * scale)
    for y in (top + int(60 * scale), top + int(122 * scale)):
        draw.rounded_rectangle((left + int(5 * scale), y, right - int(5 * scale), y + stripe), radius=stripe // 2, fill=(47, 43, 48, 255))

    # Head and antennae.
    head_r = int(72 * scale)
    hx, hy = cx, int(126 * scale)
    draw.ellipse((hx - head_r, hy - head_r, hx + head_r, hy + head_r), fill=(47, 43, 48, 255))
    draw.line((int(232 * scale), int(72 * scale), int(204 * scale), int(42 * scale)), fill=(47, 43, 48, 255), width=max(3, int(8 * scale)))
    draw.line((int(280 * scale), int(72 * scale), int(308 * scale), int(42 * scale)), fill=(47, 43, 48, 255), width=max(3, int(8 * scale)))
    draw.ellipse((int(198 * scale), int(34 * scale), int(214 * scale), int(50 * scale)), fill=(47, 43, 48, 255))
    draw.ellipse((int(300 * scale), int(34 * scale), int(316 * scale), int(50 * scale)), fill=(47, 43, 48, 255))

    # Face and smile.
    eye_r = int(9 * scale)
    draw.ellipse((int(227 * scale) - eye_r, int(116 * scale) - eye_r, int(227 * scale) + eye_r, int(116 * scale) + eye_r), fill=(255, 255, 255, 255))
    draw.ellipse((int(285 * scale) - eye_r, int(116 * scale) - eye_r, int(285 * scale) + eye_r, int(116 * scale) + eye_r), fill=(255, 255, 255, 255))
    draw.arc((int(234 * scale), int(122 * scale), int(278 * scale), int(158 * scale)), start=15, end=165, fill=(255, 255, 255, 255), width=max(2, int(6 * scale)))

    # Small green leaf accent.
    draw.ellipse((int(350 * scale), int(350 * scale), int(418 * scale), int(406 * scale)), fill=(77, 153, 99, 255))
    draw.line((int(350 * scale), int(402 * scale), int(394 * scale), int(362 * scale)), fill=(255, 255, 255, 220), width=max(2, int(5 * scale)))

    image.save(output, format="PNG", optimize=True)


make_icon(192, "assets/pwa/icon-192.png")
make_icon(512, "assets/pwa/icon-512.png")
