# Little Otter, Crack, Crack!

9 页英文亲子互动绘本。主角采用用户确认的九宫格第 4 号：红棕色海獭、奶油色小口鼻和胸口、深色爪脚，无服饰。海洋以少量蓝绿色拼贴水纹表现。

直接打开 Little-Otter-Crack-Crack.html 阅读。字体、插画和打印支持已内嵌，离线可用。

点击插画参与故事，Back / Next 或左右方向键翻页，最后一页 Read again 重新开始。第 5 页点击后由敲击切换为贝壳已打开的图，并保留结果。设备支持时可用 Read aloud，英语语音由设备提供，不保证离线可用。

Ctrl+P 或 macOS ⌘P 打印整本横版 A4，每幅插画一张；隐藏按钮和点击提示，展示完成后的文字与结果图。第 5 页直接打印打开的贝壳。

## 文件

- originals/：9 幅无字 PNG 与九宫格角色候选参考
- assets/：完整构图的阅读 JPEG
- story.json：正文、动作、反馈与结果图配置
- image-prompts.json：内置 imagegen 的逐图提示词及参考图
- storyboard.md：分镜和文案
- fonts/：Patrick Hand 字体及 OFL 授权
- book.template.html / build.mjs：可编辑模板和构建脚本
- qa/：排版、互动及打印检查记录

在上级 books/ 中保留 print-layout.mjs，运行 node books/little-otter-crack/build.mjs 可重建独立 HTML。不打包素材 ZIP。

## 动物行为依据

情节采用海獭仰浮进食、借石头打开硬壳食物的行为：
- Monterey Bay Aquarium: https://www.montereybayaquarium.org/animals-the-ocean/animals-a-to-z/sea-otter
- California Department of Fish and Wildlife, Tool Use: https://nrm.dfg.ca.gov/FileHandler.ashx?DocumentID=76378

本书以小石头作肚皮上的支点，双爪拿贝壳敲击；故事、文案和插画均为原创。
