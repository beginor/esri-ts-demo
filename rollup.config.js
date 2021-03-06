import rollup from 'rollup';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import terser from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

console.log('ROLLUP_WATCH: ' + process.env.ROLLUP_WATCH)

export default {
  input: './src/main.ts',
  output: {
    format: 'iife',
    file: './dist/bundle.js',
    sourcemap: !production
  },
  treeshake: production,
  external: [],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      sourceMap: !production
    }),
    css({ output: './dist/bundle.css' }),
    alias({}),
    nodeResolve({ mainFields: ['module', 'jsnext:main', 'main'] }),
    commonjs({
      include: []
    }),
    production && terser.terser({})
  ]
}
