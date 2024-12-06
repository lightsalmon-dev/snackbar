import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import del from "rollup-plugin-delete";

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  external: ["react"],
  plugins: [
    del({ targets: 'dist/*' }),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
};
