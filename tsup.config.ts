import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    entry: 'src/index.ts',
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
  outDir: 'dist',
});

