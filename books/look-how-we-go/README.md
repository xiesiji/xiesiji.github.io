# Look How We Go!

原创幼儿英语互动绘本，认识汽车、公交车、自行车、火车、卡车、帆船、飞机和直升机。9 幅独立无字插画，含封面。无固定角色。

直接打开 `Look-How-We-Go.html` 即可离线阅读。图片和 Patrick Hand 字体均已内嵌，无需联网。点击图片显示拟声词和用途；按钮或左右方向键翻页，末页 Read again 重新开始。Read aloud 使用设备英语语音，是否可用及是否支持离线取决于设备。

- `assets/*.png`：内置 imagegen 生成的无字原图。
- `assets/*.jpg`：完整构图的展示副本。
- `story.json` / `story.md`：英文文案、分镜、点击反馈与图片描述。
- `image-prompts.json`：逐页完整提示词。
- `book.template.html` / `build.mjs`：可编辑模板与构建脚本。运行 `node build.mjs` 重建独立 HTML。
- `fonts/`：Patrick Hand 字体与 OFL 授权。
- `qa/`：多视口验证报告与预览。

图画由真实薄纸拼贴质感启发，采用原创交通工具造型、独立构图，无图内文字。图片拟声词是供亲子跟读的文字反馈，并非固定录音。
