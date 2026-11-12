# Brush, Little Roo!

9 页英语幼儿互动绘本，含封面。暖黄色小袋鼠，4:3 横版手绘彩纸拼贴。

## 打开与使用

双击 `Brush-Little-Roo.html` 即可阅读，图片、字体、文案和交互均已内嵌，无需联网、服务器或安装依赖。电脑和平板优先，也适配手机。使用 Next / Back 或键盘左右方向键翻页；封面点击袋鼠可开始阅读。每页的轻点反馈不会自动连续翻页。

- 第 6 页：轻点画面，跟着袋鼠刷牙，显示简短鼓励。
- 第 7 页：点击 Front / Back / Tops，认识牙齿的不同表面。
- 第 8 页：点击 Morning / Night，记住早晚刷牙。
- 第 9 页：点击画面庆祝，Read again 从头阅读并重置互动。
- Read aloud 使用设备的英语语音，按设备和浏览器能力提供；不是固定录音，也不保证语音离线可用。图片阅读和互动可离线使用。

第 4–5 页的黄牙、蛀牙位于袋鼠的想象泡泡中，用来表现不刷牙可能带来的后果；后面的刷牙动作不会表示“刷牙能修复已经存在的蛀牙”。

## 修改与素材

- `assets/*.png`：9 张无字生成原图，均为 1448 × 1086，保留完整构图。
- `assets/*.jpg`：用于 HTML 的压缩展示副本；不改变构图。
- `story.json`：简短英文故事、画面描述、替代文本和互动提示。
- `image-prompts.json`：内置 image_gen 的每页提示词与参考关系。
- `reference-storyboard.png`：用户确认风格和内容的九宫格参考，含预览文字；正式页面原图全部无字。
- `book.template.html`：可编辑网页模板，文字通过 HTML 叠加在原图上方留白处。
- `fonts/PatrickHand-Regular.ttf` 和 `fonts/OFL.txt`：手写字体与授权。
- `qa/`：多视口检查结果、交互验证脚本及截图。

修改 `story.json` 的 text 可修改正文；互动逻辑在模板内。交互提示的源文案记录在 story.json 的 interaction 字段。不要直接改交付 HTML 后再构建，否则会覆盖直接修改。

在 macOS 上运行 `node build.mjs` 可重新构建（需要 Node.js 和系统自带的 sips）。其他系统可直接阅读最终 HTML，或调整构建脚本中生成 JPEG 副本的步骤。

文字采用 Patrick Hand，图文统一放在同一张 4:3 书页内；无字原图始终单独保留。本书使用内置 image_gen 生成原创插画。
