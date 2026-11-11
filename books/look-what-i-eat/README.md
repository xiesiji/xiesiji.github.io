# Look What I Eat!

A 10-page English picture book for toddlers. Open **Look-What-I-Eat.html** in a browser. Images and Patrick Hand font are embedded, so the book works offline.

- One different animal per page; the rabbit page doubles as the cover.
- Tap the illustration to reveal “I eat …!” and a short phrase to repeat.
- Use Back / Next or the left / right arrow keys. At the end, choose Read again.
- Read aloud uses device English speech, when available. Voice availability and offline operation depend on the device.
- The pictures show selected foods these animals can eat, not their whole diets. Apples and watermelon are occasional foods, and bananas are only one part of some monkeys’ varied diets. This is a vocabulary book, not feeding guidance.

## Editable sources
`story.json` contains every page, question, answer, accessible image description and interaction phrase. `book.template.html` contains the reader. `image-prompts.json` records illustration prompts. `assets/*.png` are the original unlettered images; `assets/*.jpg` are display copies. `fonts/` contains Patrick Hand and its license.

Run `node build.mjs` in this folder after editing the sources to rebuild the standalone HTML. No third-party packages are required.
