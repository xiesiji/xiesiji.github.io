# Little Penguin, Time to Tidy!

一册帮助幼儿学习“玩完玩具主动收拾”的原创英文互动绘本，共 9 页（含封面）。

## 阅读

用浏览器直接打开 `Little-Penguin-Time-to-Tidy.html`。所有图片与 Patrick Hand 字体均已嵌入，无需联网或服务器。

- 点击大幅插画参与故事；收拾最后一个球时会切换为全部收好的画面。
- 使用 Back / Next 翻页，或使用键盘左右方向键。
- 最后一页点击 Read again 从头阅读，互动状态一并重置。
- Read aloud 使用设备英语语音。语音可用性和是否支持离线取决于设备，图文阅读不受影响。
- 支持系统减少动态效果设置。

## 素材与修改

- `assets/*.png`：9 幅无字原图，保留生成时原始文件。
- `assets/*.jpg`：完整构图的阅读用压缩副本。
- `story.json`：英文正文、替代文本、点击提示和动作配置。
- `storyboard.md`：完整文案与分镜。
- `image-prompts.json`：每页生成提示词和基准图记录。
- `book.template.html`：可编辑页面模板。
- `build.mjs`：构建脚本。运行 `node build.mjs` 重建独立 HTML。
- `fonts/`：Patrick Hand 字体及 OFL 授权。

## 验证说明

已核对 9 幅插画的角色和玩具连续性，检查自包含图片、字体、文案与交互配置。浏览器进程在当前环境无法启动，因此尚未完成桌面与手机的视觉预览检查；不将其标记为已通过。
