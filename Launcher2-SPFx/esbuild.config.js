const fs = require('fs');
const path = require('path');

// Find all plugin directories
const pluginsDir = path.join(__dirname, 'src', 'plugins');
const plugins = fs.readdirSync(pluginsDir).filter(f => {
  return fs.statSync(path.join(pluginsDir, f)).isDirectory();
});

// Build esbuild config for each plugin
const entryPoints = {};
plugins.forEach(plugin => {
  entryPoints[path.join('plugins', plugin, plugin)] = path.join(pluginsDir, plugin, 'index.ts');
});

// JS plugins: copied as-is; plugins with build.json ({ "entry": "index.jsx", "out": "index.js" }) are bundled (JSX)
async function buildJsPlugins() {
  const srcRoot = path.join(__dirname, 'src', 'pluginsJS');
  const outRoot = path.join(__dirname, 'dist', 'pluginsJS');
  if (!fs.existsSync(srcRoot)) return;

  fs.cpSync(srcRoot, outRoot, { recursive: true });

  const dirs = fs.readdirSync(srcRoot).filter(f => {
    return !f.startsWith('_') && fs.statSync(path.join(srcRoot, f)).isDirectory();
  });

  for (const dir of dirs) {
    const buildFile = path.join(srcRoot, dir, 'build.json');
    if (!fs.existsSync(buildFile)) continue;
    const { entry, out } = JSON.parse(fs.readFileSync(buildFile, 'utf8'));

    await require('esbuild').build({
      entryPoints: [path.join(srcRoot, dir, entry)],
      outfile: path.join(outRoot, dir, out),
      bundle: true,
      minify: process.env.NODE_ENV === 'production',
      sourcemap: true,
      format: 'esm',
      loader: { '.js': 'jsx', '.jsx': 'jsx' },
      // Libraries are imported by URL (e.g. https://esm.sh/...) and resolved by the browser
      external: ['https://*'],
      define: {
        'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`
      }
    });
  }
}

Promise.all([require('esbuild').build({
  entryPoints,
  bundle: true,
  minify: process.env.NODE_ENV === 'production',
  sourcemap: true,
  outdir: path.join(__dirname, 'dist'),
  format: 'esm',
  splitting: true,
  external: ['react', 'react-dom', '@fluentui/react'],
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'development'}"`
  }
}), buildJsPlugins()]).catch(() => process.exit(1));
