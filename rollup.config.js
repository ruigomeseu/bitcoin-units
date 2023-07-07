import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const pkg = require('./package.json');

export default {
  input: 'src/index.ts',
  plugins: [typescript({ tsconfig: './tsconfig.json' }), nodeResolve(), commonjs({})],
  output: [
    {
      file: pkg.module,
      format: 'esm',
      exports: 'auto',
      sourcemap: 'inline',
    },
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'auto',
      sourcemap: 'inline',
    },
    {
      name: 'BitcoinUnit',
      file: pkg.browser,
      format: 'umd',
      sourcemap: 'inline',
      plugins: [terser()],
      globals: {
        'big.js': 'Big',
      },
    },
  ],
};
