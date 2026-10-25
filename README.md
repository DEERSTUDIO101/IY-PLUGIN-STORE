# IY Plugin Store

A website and Infinite Yield plugin sharing a single catalog. The website provides search, saved plugins, sorting, source preview, downloads, and installation commands. The IY interface downloads files directly into the executor workspace, with enable, disable, update, and remove actions.

## Local preview

Requires Node.js 20 or newer. No package installation is needed.

```text
npm run build
npm test
npm start
```

Open http://localhost:4173. The current catalog is included in `data/catalog.json`; deployment does not depend on an external catalog request at build time.

## Netlify

Push this project to a GitHub repository and import that repository in Netlify. `netlify.toml` sets the build command and publish folder automatically. Once deployed, the website's **Connect to IY** instructions generate the correct `storeurl https://YOUR-SITE/catalog.json` command for that deployment.

The source repository is [DEERSTUDIO101/IY-PLUGIN-STORE](https://github.com/DEERSTUDIO101/IY-PLUGIN-STORE). A public Netlify deployment address must be configured in IY before online refresh can use the custom site.

## Infinite Yield

Download `IYPluginStore.iy` from the website and place it in your executor workspace. Run `addplugin IYPluginStore`, then the `storeurl` command from the website, then `pluginstore`.

For the local Potassium setup, `IYPluginStore.catalog.json` can contain the bundled catalog, allowing browsing and installation before the website is published. Plugin downloads still require internet access.

Commands: `pluginstore` / `store`, `storeurl URL`, `storerefresh`, `storeinstall ID`, `storeenable ID`, `storedisable ID`, and `storeremove ID`.

Install compiles the downloaded source for syntax validation without executing it, verifies the written contents, and records the version. Updating an enabled plugin requires disabling it first. Replaced files are backed up with a `.bak` extension. Disable removes IY commands; independent connections or changes made by third-party plugins may persist until rejoining.

To embed the store in the customized IY source:

```text
node scripts/integrate-iy.mjs "ABSOLUTE PATH TO IY SOURCE.lua"
```

The integration embeds the installer, registers its commands and adds a Plugin Store button under Manage Plugins. It does not depend on a second plugin file at runtime.

## Catalog maintenance

`npm run refresh` imports `.iy` attachments from the community-maintained [CarlDV/InfiniteYieldPluginStore](https://github.com/CarlDV/InfiniteYieldPluginStore) directory. Download URLs are pinned to the imported Git commit. Source attribution links to original posts; plugin source is downloaded from that repository, not copied into this project. Running refresh intentionally moves to the latest catalog snapshot.

Custom entries can be added to `data/custom.json` as an array using the same fields: `id`, `name`, `filename`, `description`, `author`, `category`, `version`, `updated`, `url`, `source`, and `size`. Use HTTPS download URLs and unique IDs consisting of letters, numbers, hyphens or underscores. Refresh preserves custom entries and combines them with the imported community catalog. Run refresh and build after changing custom entries.

## In-game responsive layout (v1.1)

The store uses Montserrat typography and 44-pixel main touch controls. Narrow screens show a full-width list, then a separate plugin detail view with Back navigation. Landscape and desktop screens retain the two-column layout. Long details and source previews scroll independently. Window resizing follows the active camera viewport. Layout geometry was checked in the Roblox client at 320x568, 390x844, 844x390 and 1280x720; physical mobile touch input remains untested.
