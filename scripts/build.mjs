import {mkdir,cp,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
await mkdir('dist',{recursive:true});await cp('public','dist',{recursive:true});
const catalog=JSON.parse(await readFile('data/catalog.json','utf8'));
const ids=new Set();for(const p of catalog.plugins){if(ids.has(p.id)||!/^https:\/\//.test(p.url)||!p.filename.toLowerCase().endsWith('.iy'))throw Error('Invalid entry '+p.id);ids.add(p.id);}
await writeFile('dist/catalog.json',JSON.stringify(catalog));
await mkdir('dist/downloads',{recursive:true});await cp('roblox/IYPluginStore.iy','dist/downloads/IYPluginStore.iy');
console.log(`Built ${ids.size} plugins. Installer SHA256: ${createHash('sha256').update(await readFile('roblox/IYPluginStore.iy')).digest('hex')}`);
