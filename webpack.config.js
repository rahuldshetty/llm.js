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
    "llamacpp-cpu": "./wasm/llamacpp-cpu.js",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: [
          /node_modules/,
          /\\build\\llama-bin\\bin\\*\.js$/,
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
          from: "build/llama-bin/bin/llama-cli.js",
          to: "wasm/llamacpp-cpu.js",
        }
      ],
    }),
  ],
  // mode: "development",
  experiments: {
    outputModule: true,
  },
};
