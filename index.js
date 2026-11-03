import z from '@deepseek-ai/schemastery';
import { defaults, validateLibrary, themeSettings } from './model.js';
const color = z.string().pattern(/^#[0-9a-fA-F]{6}$/);
const theme = z.object({version:z.const(1),tokens:z.dict(z.object({light:color,dark:color})),preference:z.union(['light','dark','system']),fontSizes:z.object({text:z.number().step(1).min(10).max(22),code:z.number().step(1).min(10).max(16),terminal:z.number().step(1).min(10).max(20)}),fontFamilies:z.object({text:z.string(),code:z.string(),terminal:z.string()})});
export const Config = z.object({library:z.transform(z.object({current:theme,profiles:z.array(z.object({id:z.string(),name:z.string(),theme}))}),validateLibrary).default({current:defaults(),profiles:[]}).volatile()});
export const inject = ['settings','tools'];
export function apply(ctx) {
 ctx.effect(() => ctx.settings.configure({auto:false}));
 ctx.effect(() => ctx.tools.register({
  name:'prism_theme',
  description:'Read or save Prism Studio theme settings. Read returns the current library, named profiles and revision. Save validates and replaces the library; applyFonts optionally applies its typography and appearance. Changes affect this Harness profile.',
  parameters:{type:'object',properties:{action:{type:'string',enum:['read','save']},library:{type:'object',description:'Complete library from read, with current theme and profiles.'},revision:{type:'integer',description:'Library revision from read; required for save.'},applyFonts:{type:'boolean',description:'Apply saved typography and light/dark/system preference, default false.'}},required:['action'],additionalProperties:false},
  output:{schema:{type:'object'},render:(_a,v)=>[{type:'text',text:JSON.stringify(v)}]},
  async execute(args) {
   const find = ns => {const d=ctx.settings.describe().find(x=>x.ns===ns);if(!d)throw new Error(`Missing settings: ${ns}`);return d;};
   if(args.action==='save') {
    if(!Number.isInteger(args.revision))throw new Error('Read the current revision before saving');
    const library=validateLibrary(args.library);
    await ctx.settings.update('prism-theme',{library},args.revision);
    if(args.applyFonts){const fonts=find('ui-theme');await ctx.settings.update('ui-theme',themeSettings(library.current),fonts.revision);}
   } else if(args.action!=='read')throw new Error('Unknown action');
   const d=find('prism-theme');return {library:d.value.library,revision:d.revision};
  }
 }));
}
