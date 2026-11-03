import {readFile,writeFile} from 'node:fs/promises';
const model=(await readFile(new URL('./model.js',import.meta.url),'utf8')).replaceAll('export ','');
const css=await readFile(new URL('./styles.css',import.meta.url),'utf8');
const source=await readFile(new URL('./client-source.js',import.meta.url),'utf8');
await writeFile(new URL('./client.js',import.meta.url),`window.__ModuleLoader__.load({id:'@local/prism-theme',factory(require){\n${model}\nconst STYLES=${JSON.stringify(css)};\n${source}\n}});\n`);
