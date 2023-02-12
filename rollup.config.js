import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
// import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

export default [
  {
    input: 'src/index.js',
    external: ['@hotwired/stimulus'],
    output: [
      {
        name: 'Stimulus Form',
        file: 'dist/stimulus_form.umd.js',
        format: 'umd',
        globals: {
          '@hotwired/stimulus': 'Stimulus'
        }
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
    external: ['@hotwired/stimulus'],
    output: {
      file: 'dist/stimulus_form.min.js',
      format: 'es',
      sourcemap: true,
      globals: {
        '@hotwired/stimulus': 'Stimulus'
      }
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
