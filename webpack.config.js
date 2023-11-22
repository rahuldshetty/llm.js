import path from "path";
import { fileURLToPath } from "url";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // entry: path.resolve(__dirname, "src/llm.js"),
  entry: {
    llm: path.resolve(__dirname, "src/llm.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: "llm.js",
    filename: "[name].js",
    library: {
      type: "module",
    },
  },
  externals: {
    dollyv2: "./wasm/dollyv2.js",
    "gpt-2": "./wasm/gpt-2.js",
    "gpt-j": "./wasm/gpt-j.js",
    "gpt-neox": "./wasm/gpt-neox.js",
    mpt: "./wasm/mpt.js",
    replit: "./wasm/replit.js",
    starcoder: "./wasm/starcoder.js",

    llama: "./wasm/llama.js",
    llama2: "./wasm/llama2.js",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: [
          /node_modules/,
          /\\build\\ggml-bin\\bin\\*\.js$/,
          /\\build\\llama-bin\\bin\\*\.js$/,
          /\\build\\llama2\\*\.js$/,
        ],
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    // Copy .wasm files to dist folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "build/ggml-bin/bin/*.js",
          to: "wasm/[name].js",
        },
        {
          from: "build/llama-bin/bin/main.js",
          to: "wasm/llama.js",
        },
        {
          from: "build/llama2/*.js",
          to: "wasm/[name].js",
        },
      ],
    }),
  ],
  // mode: "development",
  experiments: {
    outputModule: true,
  },
};
