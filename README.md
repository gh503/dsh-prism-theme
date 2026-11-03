# 棱彩主题工作室 / Prism Studio

<img src="icon.svg" width="72" height="72" alt="Prism Studio icon" />

**为 DeepSeek Harness 搭配自己的明暗主题，并把喜欢的配色保存下来。**

浅色采用暖白与莓紫，深色采用墨紫与柔和亮色。所有设置集中在一个插件界面中，无需手写 CSS。

[下载 v1.1.0 安装包](https://github.com/gh503/dsh-prism-theme/releases/download/v1.1.0/local-prism-theme-1.1.0.tgz) · [版本说明](https://github.com/gh503/dsh-prism-theme/releases/tag/v1.1.0) · [反馈问题](https://github.com/gh503/dsh-prism-theme/issues)

| | 浅色 · 暖白昼光 | 深色 · 墨紫夜色 |
|---|---|---|
| 画布 | `#fff9f2` | `#201c30` |
| 侧栏 | `#f2eafa` | `#251f37` |
| 强调色 | `#9445ae` | `#dfabff` |
| 主要文字 | `#36273f` | `#f6edff` |

*上表为默认配色数值，不是界面截图。*

安装后打开 **设置 → 棱彩主题工作室**。

- 14 个公开主题颜色项，明暗分别编辑，颜色选择器及 CSS 颜色输入（HEX、透明色、rgb/hsl 等）。
- 每项继承底层主题、整体开关，以及高级 CSS 变量的明暗值编辑。
- [官方接口覆盖与限制](API-COVERAGE.md)：高级变量只对当前界面实际使用的变量生效，不代表稳定的布局 API。
- 浅色、深色、跟随系统；正文、代码、终端的字体与字号。
- 配色即时预览；修改后约 300ms 自动保存到 Harness profile，字号与字体在保存确认后同步生效。
- 将当前明暗配色及字体另存为命名主题，应用或删除已保存方案。
- 导出/导入 JSON 配置。导入会替换当前配置与主题列表，建议先导出备份。
- 恢复默认保留命名主题。禁用插件移除配色覆盖；通过系统设置写入的字体、字号与明暗偏好仍保留。

界面显示保存状态。版本冲突或持久化失败时显示错误；“重新读取”放弃未保存预览并读取服务器配置。

配置为 profile 级设置，会影响该 profile 的所有会话。无外部字体、远程资源或分析请求。

## 安装与市场搜索

当前验证版本：DeepSeek Harness **0.2.1-rc.5**，Node.js 22 或以上。其他 Harness 版本需单独验证。

在 Harness 的 **插件 → 发现** 中由用户添加市场索引：

```text
https://raw.githubusercontent.com/gh503/dsh-prism-theme/main/market/index.json
```

然后搜索 `Prism` 或 `棱彩` 并安装。发现页由 Harness 的自定义插件市场功能提供；若没有该页，请先启用对应官方可选插件。该索引是本项目维护的公开源，并非 Harness 默认官方市场。

市场版本固定到 Git commit；无需 npm 发布账号。包名暂保留 `@local/prism-theme`，以保持已有本地安装与配置兼容。安装同名新版前请导出配置，并按 Harness 提示卸载旧包后重装。

## English

**Prism Studio** is a theme editor for DeepSeek Harness. It pairs a warm cream light palette with a plum dark palette and lets you customize all 14 exposed theme colors, plus text, code and terminal typography.

- Light, dark and system appearance modes.
- Color picker and CSS color text, per-token inheritance and an overall override switch.
- Advanced paired CSS variables; see [API coverage and boundaries](API-COVERAGE.md).
- Contrast readout only for supported opaque colors; v1 configurations migrate automatically.
- Debounced autosave, named presets, JSON import/export and default reset.
- Profile-wide persistent settings; no external fonts, analytics or remote assets.

**Install:** add the index URL above to **Plugins → Discover**, search for **Prism**, install, then open **Settings → Prism Studio**. This is an independent index; it is not included in Harness by default. Alternatively, use the prebuilt GitHub Release asset through the Harness plugin installer.

**Compatibility:** currently validated on Harness `0.2.1-rc.5`. Builds and schema/persistence checks pass; browser screenshot and full interaction acceptance are not yet automated. Disabling the plugin removes its color overrides; font and appearance settings written to Harness remain.

## 开发

`node build.mjs` 将共享模型、CSS 与客户端源码合成浏览器模块；`node --check client.js` 检查语法。

先运行 `npm install --ignore-scripts`，再运行 `npm run build` 和 `npm run check`。测试覆盖主题数据、配置 schema、命名主题读写及并发版本拒绝。构建产物随源码提交，安装不执行构建脚本。

安装及设置入口已在运行中的 Harness 验证；当前没有浏览器自动化截图或完整点击验收。

图标为本插件原创 SVG。
