import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import { defineConfig } from "rollup";
import css from 'rollup-plugin-css-only'


const packages = [{ packageName: 'slideValidator', path: './packages/slideValidator' }];

const rollOpts = [];
packages.forEach(obj => {
  const rollObj = {
    plugins: [
      typescript(),
      css(),
      terser()],
    external: ["vue-demi"],
    input: obj.path + '/index.ts',
    output: [
      {
        format: "esm",
        compact: true,
        file: obj.path + '/dist/index.esm.js',
        sourcemap: true,
      },
      {
        compact: true,
        format: "cjs",
        file: obj.path + '/dist/index.cjs.js',
        sourcemap: true,
        exports: "default",
      },
      {
        file: obj.path + '/dist/index.global.js',
        format: "umd",
        name: obj.packageName,
        compact: true,
        sourcemap: true,
        globals: {
          "vue-demi": "VueDemi",
        },
      },
    ],
  };
  rollOpts.push(rollObj);

  rollOpts.push({
    input: obj.path + '/index.ts',
    plugins: [dts()],
    output: {
      file: obj.path + '/dist/index.d.ts',
      format: "es",
    },
  })
})

export default defineConfig(rollOpts)
