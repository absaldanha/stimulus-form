import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
// import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        name: 'Stimulus Form',
        file: 'dist/stimulus_form.umd.js',
        format: 'umd'
      },
      {
        file: 'dist/stimulus_form.js',
        format: 'es'
      },
    ],
    context: 'window',
    plugins: [
      resolve(),
      json(),
      typescript()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/stimulus_form.min.js',
      format: 'es',
      sourcemap: true
    },
    context: 'window',
    plugins: [
      resolve(),
      typescript(),
      json(),
      // terser({
      //   mangle: true,
      //   compress: true
      // })
    ]
  }
]
