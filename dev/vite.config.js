const assetsDir = '';
//const assetsDir = 'assets/';

const outputDefaults = {
  format: 'iife',

  // remove hashes from filenames
  entryFileNames: `${assetsDir}[name].js`,
  chunkFileNames: `${assetsDir}[name].js`,
  assetFileNames: `${assetsDir}[name].[ext]`,
}

export default {
  plugins: [],
  root: "dev",
  base: "./",
  server: {
    host: 'localhost',
    hmr: {
      //port: 443,
    }
  },
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    //sourcemap: true,
    minify: false, // boolean | 'terser' | 'esbuild'
    // false: 5396.78 KiB // smaller git diffs
    // 'esbuild': 2027.36 KiB // default
    // 'terser': 2002.37 KiB
    rollupOptions: {
      output: {
        ...outputDefaults,
      }
    },
  },
  worker: {
    rollupOptions: {
      output: {
        ...outputDefaults,
      }
    },
  },
}
