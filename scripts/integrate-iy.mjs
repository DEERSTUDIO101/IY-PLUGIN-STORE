import {readFile,writeFile,copyFile,mkdir} from 'node:fs/promises';
const target=process.argv[2];if(!target)throw Error('Pass the absolute Infinite Yield source path.');
const module=await readFile('roblox/IYPluginStore.iy','utf8');let source=await readFile(target,'utf8');
const start='-- BEGIN IY PLUGIN STORE INTEGRATION';const end='-- END IY PLUGIN STORE INTEGRATION';
const block=`${start}\ndo\n    if table.find(PluginsTable, 'IYPluginStore.iy') then deletePlugin('IYPluginStore.iy') end\n    local makeStore = function()\n${module}\n    end\n    local storePlugin = makeStore()\n    for name, command in pairs(storePlugin.Commands) do\n        addcmd(name, command.Aliases, command.Function, 'IYPluginStoreBuiltin.iy')\n        addcmdtext(command.ListName or name, 'IYPluginStoreBuiltin.iy', command.Description)\n    end\nend\n${end}\n\n`;
if(source.includes(start)){const a=source.indexOf(start),b=source.indexOf(end,a);if(b<0)throw Error('Incomplete existing integration');source=source.slice(0,a)+block+source.slice(b+end.length).replace(/^\r?\n\r?\n/,'');}
else{const marker='addcmd("addallplugins",';const index=source.indexOf(marker);if(index<0)throw Error('Integration point not found');await mkdir('backups',{recursive:true});await copyFile(target,'backups/inf-yield-before-store.lua.bak');source=source.slice(0,index)+block+source.slice(index);}
await writeFile(target,source);console.log('Integrated Plugin Store into '+target);
