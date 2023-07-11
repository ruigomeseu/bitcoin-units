import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
});
