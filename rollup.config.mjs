import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import filesize from "rollup-plugin-filesize";
import { readFileSync } from "fs"

const packageJson = JSON.parse(readFileSync("./package.json"))
const banner = `/*\n * StimulusForm ${packageJson.version} */`

const pretty = () => {
  return terser({
    mangle: false,
    compress: false,
    format: {
      comments: "all",
      indent_level: 2
    }
  })
}

export default [
  {
    input: "src/index.ts",
    external: ["@hotwired/stimulus"],
    output: [
      {
        name: "StimulusForm",
        file: "dist/stimulus_form.umd.js",
        format: "umd",
        banner,
        globals: {
          "@hotwired/stimulus": "Stimulus"
        }
      },
      {
        file: "dist/stimulus_form.js",
        format: "es",
        banner
      },
    ],
    plugins: [
      resolve(),
      typescript(),
      pretty(),
      filesize()
    ]
  }
]
