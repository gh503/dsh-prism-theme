window.__ModuleLoader__.load({id:'@local/prism-theme',factory(require){
const TOKEN_ROWS = [
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
const defaults = () => ({version:2, enabled:true, disabledTokens:[], extraTokens:{}, tokens:Object.fromEntries(TOKEN_ROWS.map(([key,,,light,dark])=>[key,{light,dark}])), preference:'system', fontSizes:{text:14,code:12,terminal:13}, fontFamilies:{text:'',code:'',terminal:''}});
const roles = ['text','code','terminal'];
function cssValue(value) {
 if(typeof value!=='string'||!value.trim()||value.length>512||/[;{}<>\\\x00-\x1f]/.test(value)||/url\s*\(|\/\*|@import/i.test(value))throw new Error('Expected a CSS value without URLs or declarations');
 return value.trim();
}
function activeTokens(theme) {
 if(!theme.enabled)return {};
 return Object.fromEntries(Object.entries({...theme.tokens,...theme.extraTokens}).filter(([key])=>!theme.disabledTokens.includes(key)));
}
function validateTheme(value) {
 if (!value || ![1,2].includes(value.version)) throw new Error('Unsupported theme version');
 if (!['light','dark','system'].includes(value.preference)) throw new Error('Invalid appearance preference');
 const result = defaults();
 result.preference = value.preference;
 if(value.enabled!==undefined&&typeof value.enabled!=='boolean')throw new Error('Invalid theme enable flag');
 result.enabled=value.enabled??true;
 const disabled=value.disabledTokens??[];
 if(!Array.isArray(disabled)||disabled.length>114||disabled.some(k=>typeof k!=='string'||!/^--[a-zA-Z0-9_-]+$/.test(k)))throw new Error('Invalid inherited tokens');
 result.disabledTokens=[...new Set(disabled)];
 const extras=value.extraTokens??{};
 if(!extras||typeof extras!=='object'||Array.isArray(extras)||Object.keys(extras).length>100)throw new Error('Expected at most 100 extra tokens');
 for(const [key,pair] of Object.entries(extras)){
  if(!/^--[a-zA-Z0-9_-]+$/.test(key)||TOKEN_ROWS.some(row=>row[0]===key))throw new Error('Invalid or duplicate extra token');
  result.extraTokens[key]={light:cssValue(pair?.light),dark:cssValue(pair?.dark)};
 }
 for (const [key] of TOKEN_ROWS) {
  for (const mode of ['light','dark']) {
   const color = value.tokens?.[key]?.[mode];
   result.tokens[key][mode] = cssValue(color);
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
function themeSettings(theme) {
 const t = validateTheme(theme);
 return {preference:t.preference,fontSize:t.fontSizes.text,codeFontSize:t.fontSizes.code,terminalFontSize:t.fontSizes.terminal,textFontFamily:t.fontFamilies.text,codeFontFamily:t.fontFamilies.code,terminalFontFamily:t.fontFamilies.terminal};
}
function validateLibrary(value) {
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

const STYLES=".prism-studio{color:var(--dsw-alias-label-primary);max-width:920px;padding:8px 4px 32px}.prism-studio *{box-sizing:border-box}.prism-studio h2{font-size:23px;margin:0 0 7px}.prism-studio p{line-height:1.6;margin:8px 0}.prism-hero{display:flex;align-items:center;gap:16px;padding:24px;border-radius:24px;background:linear-gradient(125deg,var(--dsw-alias-bg-layer-2),var(--dsw-alias-bg-layer-1));border:1px solid var(--dsw-alias-border-l1)}.prism-mark{font-size:44px;color:var(--dsw-alias-brand-primary);transform:rotate(-12deg)}.prism-status{margin-left:auto;font-size:12px;white-space:nowrap;color:var(--dsw-alias-label-secondary)}.prism-muted{font-size:13px;color:var(--dsw-alias-label-secondary)}.prism-studio fieldset{min-width:0;margin:22px 0;padding:18px;border:1px solid var(--dsw-alias-border-l1);border-radius:18px}.prism-studio legend{font-weight:650;padding:0 9px}.prism-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:10px 0}.prism-studio button,.prism-studio input{font:inherit;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l1);border-radius:10px;padding:8px 11px;min-height:36px}.prism-studio button{cursor:pointer;transition:background .15s,border-color .15s}.prism-studio button:hover{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-brand-primary)}.prism-studio button[aria-pressed=true]{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-brand-primary)}.prism-studio button:disabled{opacity:.5;cursor:default}.prism-studio :focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:3px}.prism-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;margin-top:14px}.prism-color{padding:14px;border-radius:14px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1)}.prism-color label{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px}.prism-color input[type=color]{width:42px;height:36px;padding:3px;cursor:pointer}.prism-color input:not([type=color]){width:100%;font-family:monospace}.prism-color small{display:block;font-size:10px;margin-top:8px;overflow:hidden;text-overflow:ellipsis;color:var(--dsw-alias-label-secondary)}.prism-color [aria-invalid=true]{border-color:var(--dsw-alias-state-error-primary)}.prism-font{display:grid;grid-template-columns:minmax(0,1fr) 85px;gap:12px;margin-top:12px}.prism-font label{display:flex;flex-direction:column;gap:7px}.prism-font input{width:100%}.prism-profile{display:flex;justify-content:space-between;align-items:center;gap:12px;border-bottom:1px solid var(--dsw-alias-border-l1);padding:8px 0}.prism-profile strong{overflow-wrap:anywhere}.prism-error{padding:12px;border:1px solid var(--dsw-alias-state-error-primary);border-radius:12px;overflow-wrap:anywhere}.prism-error button{margin:8px}.prism-studio input[hidden]{display:none}@media(max-width:520px){.prism-hero{padding:16px;flex-wrap:wrap}.prism-status{margin-left:0}.prism-studio fieldset{padding:12px}.prism-grid{grid-template-columns:1fr}}@media(prefers-reduced-motion:reduce){.prism-studio button{transition:none}}\n";
const React = require('react');
const h = React.createElement;
return {inject:['slots','theme','locale','remote','remote.settings'], apply(ctx) {
 const ns='prism-theme';
 const zh={title:'棱彩主题工作室',intro:'暖白昼光 · 墨紫夜色 · 一点大胆的想象',appearance:'外观',light:'浅色',dark:'深色',system:'跟随系统',colors:'配色实验室',fonts:'字体与字号',text:'正文',code:'代码',terminal:'终端',family:'字体名称，留空使用默认',saved:'已保存',saving:'正在保存…',loading:'正在读取主题…',profiles:'我的主题',name:'主题名称',saveAs:'另存为主题',load:'应用',remove:'删除',reset:'恢复棱彩默认',resetConfirm:'恢复默认配色与字体？已保存的主题会保留。',deleteConfirm:'删除这个已保存的主题？',empty:'还没有保存主题。给当前搭配起个名字吧。',hint:'修改即时生效并自动保存。每个主题同时包含明暗配色和三组字体设置。',reload:'重新读取',error:'设置未完全同步。请导出保留当前配置，或重新读取后再试。',export:'导出当前配置',import:'导入配置',invalid:'无法导入：',contrast:'文字对比度',unsaved:'等待保存',fontHint:'使用这台设备已安装的字体；未安装时自动回退。',partial:'主题库已保存，字体或外观同步失败：',retry:'重试保存'};
 const en={title:'Prism Studio',intro:'Warm daylight · Plum midnight · A little imagination',appearance:'Appearance',light:'Light',dark:'Dark',system:'System',colors:'Color laboratory',fonts:'Typography',text:'Text',code:'Code',terminal:'Terminal',family:'Font family, blank for default',saved:'Saved',saving:'Saving…',loading:'Loading theme…',profiles:'My themes',name:'Theme name',saveAs:'Save as theme',load:'Apply',remove:'Delete',reset:'Restore Prism defaults',resetConfirm:'Restore default colors and fonts? Saved themes will remain.',deleteConfirm:'Delete this saved theme?',empty:'No saved themes yet. Give this palette a name.',hint:'Edits apply instantly and save automatically. Each theme includes both palettes and all three font settings.',reload:'Reload',error:'Settings are not fully synchronized. Export to preserve this draft, or reload and try again.',export:'Export current configuration',import:'Import configuration',invalid:'Cannot import: ',contrast:'Text contrast',unsaved:'Waiting to save',fontHint:'Use fonts installed on this device; unavailable fonts fall back automatically.',partial:'Theme library saved; typography or appearance sync failed: ',retry:'Retry save'};
 Object.assign(zh,{enabled:'启用主题覆盖',inherit:'继承底层主题',advanced:'高级主题变量',advancedHint:'通过官方覆盖接口写入 CSS 变量。只有被界面使用的变量才有效；内部变量可能随 Harness 更新改变。明暗值均须填写，不支持 URL 或整段 CSS。',tokenName:'变量名，例如 --dsw-custom-color',addToken:'添加变量',cssInvalid:'无效的 CSS 颜色',coverage:'接口覆盖范围',coverageText:'14 个公开颜色项、7 个持久化外观/字体设置，以及变量覆盖与撤销。主题注册是临时运行接口；命名配置通过保存方案实现。布局、动效、代码语法主题没有独立的稳定配置接口。',unavailable:'仅对启用的六位 HEX 实色计算',resetToken:'恢复本项默认'});
 Object.assign(en,{enabled:'Enable theme overrides',inherit:'Inherit underlying theme',advanced:'Advanced theme variables',advancedHint:'Write CSS variables through the official override API. Only variables consumed by the UI have an effect; internal names may change between Harness versions. Both palettes are required. URLs and CSS declarations are not supported.',tokenName:'Variable name, e.g. --dsw-custom-color',addToken:'Add variable',cssInvalid:'Invalid CSS color',coverage:'API coverage',coverageText:'14 exposed colors, 7 durable appearance/typography settings, and token override/disposal. Theme registration is transient; named presets provide saved themes. Layout, motion and syntax themes have no separate stable settings API.',unavailable:'Calculated only for enabled opaque six-digit HEX colors',resetToken:'Reset this color'});
 for(const [lang,dict] of Object.entries({zh,en}))ctx.effect(()=>ctx.locale.register(ns,lang,dict));
 const t=ctx.locale.bind(ns);
 let state={library:{current:defaults(),profiles:[]},revision:undefined,fontRevision:undefined,status:'loading',error:'',ready:false};
 const listeners=new Set(); let disposed=false,timer,writing=false,dirty=false,queuedReload=false,layerDispose,readGeneration=0,acceptedFonts=null;
 const publish=()=>{if(!disposed)for(const fn of listeners)fn();};
 const paint=()=>{layerDispose=ctx.theme.overrideTokens('@local/prism-theme',activeTokens(state.library.current));};
 const unpack=r=>{if(!r.ok)throw new Error(r.error?.message||r.error?.code||'Request failed');return r.value;};
 const clone=x=>JSON.parse(JSON.stringify(x));
 async function reload(){
  if(writing||dirty){queuedReload=true;return;}
  const generation=++readGeneration;
  try{
   const result=unpack(await ctx.remote.settings.describe());if(disposed||generation!==readGeneration)return;
   if(writing||dirty){queuedReload=true;return;}
   const own=result.namespaces.find(d=>d.ns===ns), fonts=result.namespaces.find(d=>d.ns==='ui-theme');
   if(!own||!fonts)throw new Error('Theme settings unavailable');
   state.library=validateLibrary(own.value.library);state.revision=own.revision;state.fontRevision=fonts.revision;
   const v=fonts.value;
   Object.assign(state.library.current,{preference:v.preference,fontSizes:{text:v.fontSize,code:v.codeFontSize,terminal:v.terminalFontSize},fontFamilies:{text:v.textFontFamily,code:v.codeFontFamily,terminal:v.terminalFontFamily}});
   acceptedFonts=themeSettings(state.library.current);
   state.ready=true;state.status='saved';state.error='';paint();publish();
  }catch(e){if(disposed||generation!==readGeneration||writing||dirty)return;state.status='error';state.error=String(e.message);publish();}
 }
 async function flush(){
  clearTimeout(timer);if(writing||!dirty||disposed)return;
  writing=true;dirty=false;state.status='saving';publish();
  const library=clone(state.library);let librarySaved=false;
  try{
   const own=unpack(await ctx.remote.settings.update(ns,{library},state.revision));state.revision=own.revision;librarySaved=true;
   const desiredFonts=themeSettings(library.current);
   const fontPatch=Object.fromEntries(Object.entries(desiredFonts).filter(([key,value])=>acceptedFonts?.[key]!==value));
   if(Object.keys(fontPatch).length){const fonts=unpack(await ctx.remote.settings.update('ui-theme',fontPatch,state.fontRevision));state.fontRevision=fonts.revision;acceptedFonts=desiredFonts;}
   state.status=dirty?'unsaved':'saved';state.error='';
  }catch(e){state.status='error';state.error=(librarySaved?t('partial'):'')+String(e.message);dirty=true;}
  finally{writing=false;publish();if(dirty&&state.status!=='error')void flush();else if(queuedReload&&!dirty){queuedReload=false;void reload();}}
 }
 function change(fn){if(!state.ready)return;++readGeneration;const library=clone(state.library);fn(library);state.library=validateLibrary(library);dirty=true;state.status='unsaved';state.error='';paint();publish();clearTimeout(timer);timer=setTimeout(flush,300);}
 ctx.effect(()=>()=>{disposed=true;clearTimeout(timer);layerDispose?.();listeners.clear();});
 ctx.effect(()=>ctx.remote.$on('settings/document-updated',()=>{void reload();}));
 ctx.on('connection/reset',()=>{void reload();});
 ctx.effect(()=>{const warn=e=>{if(dirty||writing){e.preventDefault();e.returnValue='';}};window.addEventListener('beforeunload',warn);return()=>window.removeEventListener('beforeunload',warn);});
 void reload();
 function Studio(){
  const [,refresh]=React.useState(0),[mode,setMode]=React.useState(ctx.theme.getTheme().active.colorScheme),[name,setName]=React.useState(''),[localError,setLocalError]=React.useState(''),[extraName,setExtraName]=React.useState('');
  React.useEffect(()=>{const fn=()=>refresh(n=>n+1);listeners.add(fn);const off=ctx.locale.subscribe(fn);return()=>{listeners.delete(fn);off();};},[]);
  const file=React.useRef(null), current=state.library.current;
  const button=(label,fn,props={})=>h('button',{type:'button',onClick:fn,...props},label);
  const lang=ctx.locale.getLocale().active.startsWith('zh');
  const lum=hex=>{const rgb=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
  const contrastKeys=['--dsw-alias-bg-base','--dsw-alias-label-primary'];
  const contrastOK=current.enabled&&contrastKeys.every(k=>!current.disabledTokens.includes(k)&&/^#[0-9a-f]{6}$/i.test(current.tokens[k][mode]));
  const [bg,fg]=contrastOK?contrastKeys.map(k=>lum(current.tokens[k][mode])):[0,0];
  const ratio=contrastOK?`${((Math.max(bg,fg)+.05)/(Math.min(bg,fg)+.05)).toFixed(1)}:1`:t('unavailable');
  const applyTheme=theme=>{change(lib=>{lib.current=clone(theme);});setMode(theme.preference==='system'?ctx.theme.getTheme().active.colorScheme:theme.preference);};
  const exportTheme=()=>{const blob=new Blob([JSON.stringify({current:current,profiles:state.library.profiles},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='prism-theme.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  return h('section',{className:'prism-studio'},h('style',null,STYLES),
   h('header',{className:'prism-hero'},h('span',{className:'prism-mark','aria-hidden':true},'✦'),h('div',null,h('h2',null,t('title')),h('p',null,t('intro'))),h('span',{className:'prism-status',role:'status'},t(state.status))),
   h('p',{className:'prism-muted'},t('hint')),
   h('label',null,h('input',{type:'checkbox',checked:current.enabled,disabled:!state.ready,onChange:e=>change(lib=>{lib.current.enabled=e.target.checked;})}),t('enabled')),
   h('details',null,h('summary',null,t('coverage')),h('p',{className:'prism-muted'},t('coverageText'))),
   state.error&&h('div',{role:'alert',className:'prism-error'},t('error'),' ',state.error,button(t('reload'),()=>{dirty=false;void reload();})),
   localError&&h('p',{role:'alert'},localError),
   h('fieldset',{disabled:!state.ready},h('legend',null,t('appearance')),h('div',{className:'prism-row'},...['light','dark','system'].map(m=>button((m==='light'?'☀ ':m==='dark'?'☾ ':'◐ ')+t(m),()=>{change(lib=>{lib.current.preference=m;});setMode(m==='system'?ctx.theme.getTheme().active.colorScheme:m);void flush();},{'aria-pressed':current.preference===m})))),
   h('fieldset',{disabled:!state.ready},h('legend',null,t('colors')),h('div',{className:'prism-row'},...['light','dark'].map(m=>button(t(m),()=>setMode(m),{'aria-pressed':mode===m})),h('span',{className:'prism-muted'},`${t('contrast')}: ${ratio}`)),
    h('div',{className:'prism-grid'},...TOKEN_ROWS.map(([key,cn,english])=>h(ColorRow,{key,token:key,label:lang?cn:english,mode,inherited:current.disabledTokens.includes(key),onInherit:checked=>change(lib=>{lib.current.disabledTokens=checked?[...new Set([...lib.current.disabledTokens,key])]:lib.current.disabledTokens.filter(k=>k!==key);}),onReset:()=>change(lib=>{lib.current.tokens[key]=defaults().tokens[key];lib.current.disabledTokens=lib.current.disabledTokens.filter(k=>k!==key);}),value:current.tokens[key][mode],onChange:value=>change(lib=>{lib.current.tokens[key][mode]=value;})})))),
   h('fieldset',{disabled:!state.ready},h('legend',null,t('advanced')),h('p',{className:'prism-muted'},t('advancedHint')),
    h('div',{className:'prism-row'},h('input',{value:extraName,placeholder:t('tokenName'),'aria-label':t('tokenName'),onChange:e=>setExtraName(e.target.value)}),button(t('addToken'),()=>{try{change(lib=>{lib.current.extraTokens[extraName]={light:'initial',dark:'initial'};});setExtraName('');setLocalError('');}catch(e){setLocalError(e.message);}},{disabled:!/^--[a-zA-Z0-9_-]+$/.test(extraName)||TOKEN_ROWS.some(r=>r[0]===extraName)||Object.hasOwn(current.extraTokens,extraName)})),
    ...Object.entries(current.extraTokens).map(([key,pair])=>h('div',{key},h('strong',null,key),...['light','dark'].map(m=>h(ValueInput,{key:m,label:t(m),value:pair[m],onCommit:v=>change(lib=>{lib.current.extraTokens[key][m]=v;})})),button(t('remove'),()=>change(lib=>{delete lib.current.extraTokens[key];lib.current.disabledTokens=lib.current.disabledTokens.filter(k=>k!==key);}))))),
   h('fieldset',{disabled:!state.ready},h('legend',null,t('fonts')),h('p',{className:'prism-muted'},t('fontHint')),...['text','code','terminal'].map(role=>h('div',{className:'prism-font',key:role},h('label',null,t(role),h('input',{type:'text',value:current.fontFamilies[role],placeholder:t('family'),maxLength:256,onChange:e=>{const value=e.target.value;if(!/[<>\\\x00-\x1f]/.test(value))change(lib=>{lib.current.fontFamilies[role]=value;});}})),h('label',null,'px',h('input',{type:'number',min:10,max:{text:22,code:16,terminal:20}[role],value:current.fontSizes[role],onChange:e=>{const n=Number(e.target.value);if(Number.isInteger(n)&&n>=10&&n<=({text:22,code:16,terminal:20})[role]){change(lib=>{lib.current.fontSizes[role]=n;});}}}))))),
   h('fieldset',{disabled:!state.ready},h('legend',null,t('profiles')),h('div',{className:'prism-row'},h('input',{'aria-label':t('name'),placeholder:t('name'),value:name,maxLength:80,onChange:e=>setName(e.target.value)}),button(t('saveAs'),()=>{change(lib=>lib.profiles.push({id:crypto.randomUUID(),name:name.trim(),theme:clone(current)}));setName('');},{disabled:!name.trim()||state.library.profiles.length>=50})),state.library.profiles.length===0&&h('p',{className:'prism-muted'},t('empty')),
    ...state.library.profiles.map(p=>h('div',{className:'prism-profile',key:p.id},h('strong',null,p.name),h('div',{className:'prism-row'},button(t('load'),()=>applyTheme(p.theme)),button(t('remove'),()=>{if(window.confirm(t('deleteConfirm')))change(lib=>{lib.profiles=lib.profiles.filter(x=>x.id!==p.id);});})))),
    h('div',{className:'prism-row'},button(t('export'),exportTheme),button(t('import'),()=>file.current.click()),button(t('reset'),()=>{if(window.confirm(t('resetConfirm')))applyTheme(defaults());})),
    h('input',{type:'file',accept:'.json,application/json',ref:file,hidden:true,onChange:async e=>{const selected=e.target.files?.[0];e.target.value='';if(!selected)return;try{if(selected.size>256000)throw new Error('File exceeds 256 KB');const library=validateLibrary(JSON.parse(await selected.text()));if(!window.confirm(lang?'导入会替换当前配置与已保存主题列表，继续？':'Import replaces the current configuration and saved themes. Continue?'))return;change(lib=>{lib.current=library.current;lib.profiles=library.profiles;});applyTheme(library.current);setLocalError('');}catch(err){setLocalError(t('invalid')+err.message);}}}))
  );
 }
 function ValueInput({label,value,onCommit,color=false}){
  const [draft,setDraft]=React.useState(value);React.useEffect(()=>setDraft(value),[value]);
  const valid=x=>{try{cssValue(x);return !color||CSS.supports('color',x);}catch{return false;}};
  return h('label',{className:'prism-row'},label,h('input',{value:draft,maxLength:512,spellCheck:false,'aria-label':label,'aria-invalid':!valid(draft),onChange:e=>{setDraft(e.target.value);if(valid(e.target.value))onCommit(e.target.value);},onBlur:()=>{if(!valid(draft))setDraft(value);}}));
 }
 function ColorRow({label,token,mode,value,onChange,inherited,onInherit,onReset}){
  return h('div',{className:'prism-color'},h('label',null,h('span',null,label),h('input',{type:'color',value:/^#[0-9a-f]{6}$/i.test(value)?value:'#000000','aria-label':label,onChange:e=>onChange(e.target.value)})),h(ValueInput,{key:mode,label:'CSS',value,onCommit:onChange,color:true}),h('label',null,h('input',{type:'checkbox',checked:inherited,onChange:e=>onInherit(e.target.checked)}),t('inherit')),h('button',{type:'button',onClick:onReset},t('resetToken')),h('small',{title:token},token.replace('--dsw-','')));
 }
 ctx.slots.inject('settings.section',()=>ctx.slots.register({name:'settings.section',id:'prism-theme',order:5,label:()=>t('title')},Studio));
}};

}});
