-- Run once after loading Infinite Yield. The full IY source also has a native integration.
local api
for _,fn in ipairs(getgc()) do
    if type(fn)=='function' and debug.info(fn,'n')=='addPlugin' then
        local env=getfenv(fn)
        if type(env.deletePlugin)=='function' then api=env break end
    end
end
assert(api,'Load Infinite Yield first.')
if table.find(api.PluginsTable or {},'IYPluginStore.iy') then api.deletePlugin('IYPluginStore.iy') end
api.addPlugin('IYPluginStore.iy')
assert(getgenv().IYPluginStore,'Store initialization failed.')
getgenv().IYPluginStore.Open()
