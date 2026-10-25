import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const repo='CarlDV/InfiniteYieldPluginStore';
async function json(url){const r=await fetch(url);if(!r.ok)throw Error(`${r.status} ${url}`);return r.json();}
const commit=await json(`https://api.github.com/repos/${repo}/commits/main`);
const base=`https://raw.githubusercontent.com/${repo}/${commit.sha}/`;
const data=await json(base+'data/plugins.json');
const plugins=[];
for(const p of data.plugins){for(const f of p.files||[]){
 if(!f.is_plugin||!f.filename?.toLowerCase().endsWith('.iy')||!f.url?.startsWith('plugins/'))continue;
 plugins.push({id:`community-${p.id}-${createHash('sha256').update(f.filename).digest('hex').slice(0,10)}`,name:p.name||f.filename.slice(0,-3),filename:f.filename,description:p.description||'Community plugin for Infinite Yield.',author:p.author?.name||p.author?.username||'Community',category:'Community',version:p.date?.slice(0,10)||'1',updated:p.date||'',url:base+f.url.split('/').map(encodeURIComponent).join('/'),source:p.message_url||`https://github.com/${repo}`,size:f.size||0});
}}
let custom=[];try{custom=JSON.parse(await readFile('data/custom.json','utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}plugins.unshift(...custom);
await mkdir('data',{recursive:true});
await writeFile('data/catalog.json',JSON.stringify({schemaVersion:1,name:'IY Plugin Store',updatedAt:new Date().toISOString(),source:{repository:repo,commit:commit.sha,url:`https://github.com/${repo}`},plugins},null,2));
console.log(`Imported ${plugins.length} installable files at ${commit.sha.slice(0,7)}`);
