export const TOKEN_ROWS = [
 ['--dsw-alias-bg-base','画布背景','Canvas','#fff9f2','#201c30'],
 ['--dsw-alias-bg-layer-1','一级背景','Surface 1','#fff1e5','#29233d'],
 ['--dsw-alias-bg-layer-2','二级背景','Surface 2','#f6e8f5','#342d4b'],
 ['--dsw-alias-bg-overlay','浮层背景','Overlay','#fffaf5','#302940'],
 ['--dsw-alias-border-l1','柔和边框','Subtle border','#e7d8e5','#493d61'],
 ['--dsw-alias-border-l2','明显边框','Strong border','#c5a9c4','#76628e'],
 ['--dsw-alias-brand-primary','主题强调色','Accent','#9445ae','#dfabff'],
 ['--dsw-alias-label-primary','主要文字','Primary text','#36273f','#f6edff'],
 ['--dsw-alias-label-secondary','次要文字','Secondary text','#75627c','#bfb0cf'],
 ['--dsw-alias-state-error-primary','错误状态','Error','#bf365a','#ff8ba7'],
 ['--dsw-alias-state-idle-primary','空闲状态','Idle','#82738b','#b3a4c4'],
 ['--dsw-alias-state-success-primary','成功状态','Success','#207c65','#83dfbc'],
 ['--dsw-alias-state-warn-primary','警告状态','Warning','#9c650a','#f7cf7b'],
 ['--dsw-specific-sidebar-fill','侧栏背景','Sidebar','#f2eafa','#251f37'],
];
export const defaults = () => ({version:1, tokens:Object.fromEntries(TOKEN_ROWS.map(([key,,,light,dark])=>[key,{light,dark}])), preference:'system', fontSizes:{text:14,code:12,terminal:13}, fontFamilies:{text:'',code:'',terminal:''}});
const roles = ['text','code','terminal'];
export function validateTheme(value) {
 if (!value || value.version !== 1) throw new Error('Unsupported theme version');
 if (!['light','dark','system'].includes(value.preference)) throw new Error('Invalid appearance preference');
 const result = defaults();
 result.preference = value.preference;
 for (const [key] of TOKEN_ROWS) {
  for (const mode of ['light','dark']) {
   const color = value.tokens?.[key]?.[mode];
   if (typeof color !== 'string' || !/^#[0-9a-f]{6}$/i.test(color)) throw new Error(`Expected #RRGGBB for ${key} (${mode})`);
   result.tokens[key][mode] = color;
  }
 }
 for (const role of roles) {
  const size = value.fontSizes?.[role];
  if (!Number.isInteger(size) || size < 10 || size > ({text:22,code:16,terminal:20})[role]) throw new Error(`Invalid ${role} font size`);
  const family = value.fontFamilies?.[role];
  if (typeof family !== 'string' || family.length > 256 || /[<>\\\x00-\x1f]/.test(family)) throw new Error(`Invalid ${role} font family`);
  result.fontSizes[role] = size;
  result.fontFamilies[role] = family;
 }
 return result;
}
export function themeSettings(theme) {
 const t = validateTheme(theme);
 return {preference:t.preference,fontSize:t.fontSizes.text,codeFontSize:t.fontSizes.code,terminalFontSize:t.fontSizes.terminal,textFontFamily:t.fontFamilies.text,codeFontFamily:t.fontFamilies.code,terminalFontFamily:t.fontFamilies.terminal};
}
export function validateLibrary(value) {
 if (!value || !Array.isArray(value.profiles) || value.profiles.length > 50) throw new Error('Expected at most 50 saved themes');
 const ids = new Set();
 const profiles = value.profiles.map(p => {
  if (typeof p.id !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(p.id) || ids.has(p.id)) throw new Error('Invalid or duplicate theme id');
  ids.add(p.id);
  if (typeof p.name !== 'string' || !p.name.trim() || p.name.length > 80) throw new Error('Theme name must contain 1–80 characters');
  return {id:p.id,name:p.name.trim(),theme:validateTheme(p.theme)};
 });
 return {current:validateTheme(value.current),profiles};
}
