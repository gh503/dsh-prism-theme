# Theme API coverage · Harness 0.2.1-rc.5

Prism Studio 1.1.0 audits the live Theme inspection catalog, theme service contract, ui-theme Config schema and installed package documentation.

| Public capability | UI |
|---|---|
| 14 built-in color tokens, light/dark pairs | Color laboratory; picker plus browser-validated CSS color text |
| Partial token overrides | Inherit underlying theme checkbox per built-in token |
| Remove override layer | Enable theme overrides switch (empty override restores underlying values) |
| Composition-dependent CSS variables | Advanced variable editor with light/dark values and removal |
| preference | Light / dark / system |
| fontSize / codeFontSize / terminalFontSize | Text 10–22, code 10–16, terminal 10–20 px |
| textFontFamily / codeFontFamily / terminalFontFamily | Three comma-separated local font fallback lists; empty restores system stack |
| getTheme / theme-change | Runtime state plumbing, not a separate user setting |
| register / disposer | In-process single-scheme extension; custom IDs are not persisted by official preference settings. Saved paired presets provide the durable user workflow instead. |

All plugin settings, including inheritance flags and extra tokens, round-trip through named presets and JSON export/import. Version 1 files migrate to version 2 defaults on read. Version 2 files require Prism 1.1 or newer.

## Boundaries

The 14 basic names are documented colors. Extra names are NOT certified built-in settings: only tokens used by the current composition have an effect. Internal names may change with Harness upgrades. A generic variable field does not imply stable support for layout, radius, shadow, animation, line-height or syntax-highlighting settings. No dedicated stable Config fields for those were found.

Color text is checked using browser CSS.supports. Transparent/context-dependent values cannot be assigned an accurate contrast ratio without resolving the actual painted background; the editor reports unavailable rather than a guessed ratio. The color picker uses black as its fallback when a value cannot be represented as six-digit HEX; text remains authoritative.

Advanced values are passed as CSS variable values through the official theme service, never interpolated into a stylesheet. URLs, declaration separators, braces, comments and control characters are refused. Host validates the bounded value shape; browser support determines whether a value renders.

The built-in registry may contain other plugins' transient theme IDs. Prism does not take ownership of their lifecycle or present them as durable named presets. Its paired layer composes over the underlying theme.
