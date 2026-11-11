# Little Bear, In It Goes!

A nine-illustration English picture book for toddlers, with original painted-tissue collage artwork.

The book uses Patrick Hand, a clear, unjoined handwriting font by Patrick Wagesreiter. The font is embedded for consistent offline reading and distributed under the SIL Open Font License; the license is included in the HTML and `fonts/OFL.txt`.

Open `Little-Bear-In-It-Goes.html` in a browser. All pictures are embedded; reading and page interactions work without an internet connection. Tap the picture or use Next/Back. The dots jump to a page, and the left/right arrow keys turn pages.

Tap to help Little Bear keep paws back, put its own wrapper and tissue into the bin, practice washing, and give a high five. The book's refrain is: “Trash goes in. Paws stay out.” Every bin is white, round, open at the top, and lined with a black bag.

The optional Read aloud control uses the browser's speech service and an available English voice. Voice availability and offline speech depend on the device. Text and illustrations remain available without speech.

## Files

- `Little-Bear-In-It-Goes.html`: self-contained interactive book.
- `assets/01-*.png` through `assets/09-*.png`: nine full-resolution, text-free illustrations.
- `assets/*.jpg`: full-size compressed display copies.
- `story.json`: English page text, image descriptions and interaction prompts.
- `image-prompts.json`: final prompts used with the built-in image_gen tool.
- `fonts/`: the embedded Patrick Hand font and its license.
- `book.template.html` and `build.mjs`: editable source. Run `node build.mjs` to rebuild.

Illustrations use a golden bear in coral-red shorts. No existing picture-book character or composition was reused. Text is typeset separately from the artwork.
