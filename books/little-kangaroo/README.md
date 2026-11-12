# Brush, Brush, Roo!

原创英文幼儿互动绘本：小袋鼠学习刷牙。9 页，4:3 横版，手绘彩纸拼贴，Patrick Hand 手写字体。2026-11-12。

直接打开 `Brush-Brush-Roo.html`。正文由 HTML/CSS 排版，叠放在无字插画的留白上；文字不合成到图片中。图片与字体全部内嵌在 HTML 中，离线可阅读，不依赖服务器或外部资源。优先适配电脑和平板，也支持手机。

- 点击画面：显示与当前动作有关的鼓励或提示，不会自动翻页。
- Back / Next 或左右方向键：翻页。最后一页 Read again：重读。
- Read aloud：使用设备提供的英语语音。声音是否可用、是否支持离线取决于设备。

## 亲子共读

用 “Brush, brush!” 跟读，示范轻柔刷牙。第 3 页表现未清洁牙面的黄色菌斑；第 4 页的思考泡泡表现蛀牙可能带来的后果。故事强调预防，没有将刷牙画成修复蛀洞的治疗。

大人帮助孩子早晚各刷一次，每次约两分钟，刷到外侧、内侧和咀嚼面。使用适龄含氟牙膏；3 岁以下只需薄薄一抹（约米粒大小），3–6 岁用豌豆大小。让能够吐出的孩子吐掉多余牙膏，刷后不漱口。图中用很少牙膏，强调大人帮助；实际刷牙由大人完成或协助，绘本点击并不是刷牙计时器。

核对来源：[NHS — Children's teeth](https://www.nhs.uk/live-well/healthy-teeth-and-gums/taking-care-of-childrens-teeth/)；[UK oral hygiene guidance](https://www.gov.uk/government/publications/delivering-better-oral-health-an-evidence-based-toolkit-for-prevention/chapter-8-oral-hygiene)。访问日期：2026-11-12。

## 文件

- `Brush-Brush-Roo.html`：可离线单独使用的最终互动绘本。
- `originals/`：内置 image_gen 生成的九幅无字 PNG 原图。
- `assets/01.webp` … `09.webp`：1200×900 的 4:3 无字展示图片，WebP 质量 78，保留完整构图与白边。
- `story.json`：可编辑短句、画面描述与点击反馈。
- `image-prompts.json`：生成提示词、角色参考与分镜。
- `book.template.html`、`build.mjs`：可编辑源文件与重建脚本。
- `fonts/`：Patrick Hand 字体与 SIL Open Font License。
- `qa/`：跨视口验收记录和截图。

## 重建

需要 Node.js、macOS 自带 sips 和 cwebp。最终 HTML 阅读时不需要这些工具。

运行 `node build.mjs`，即可从无字原图生成 1200×900 WebP 展示图，并将图片、字体和 HTML 正文打包成最终互动绘本。无需生成带字图片。

插画通过内置 image_gen 逐页生成，均参考同一角色基准图。原始 PNG 保留在 `originals/`，用于后续编辑；浏览时只使用压缩后的无字 WebP 图片。正文修改 `story.json` 后重建即可。
