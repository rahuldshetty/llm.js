import path from 'path';
import { fileURLToPath } from 'url';
import CopyWebpackPlugin from 'copy-webpack-plugin';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default  {
  // entry: path.resolve(__dirname, "src/ggml.js"),
  entry:{
    'ggml': path.resolve(__dirname, "src/ggml.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: "ggml.js",
    filename: '[name].js',
    library: {
      type: "module",
    },
  },
  externals: {
    "dollyv2": "./wasm/dollyv2.js",
    "gpt-2": "./wasm/gpt-2.js",
    "gpt-j": "./wasm/gpt-j.js",
    "gpt-neox": "./wasm/gpt-neox.js",
    "mpt": "./wasm/mpt.js",
    "replit": "./wasm/replit.js",
    "starcoder": "./wasm/starcoder.js",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: [/node_modules/, /\\build\\bin\\bin\\*\.js$/],
        use: 'babel-loader',
      }
    ]
  },
  plugins: [
        // Copy .wasm files to dist folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'build/bin/bin/*.js',
                    to: 'wasm/[name].js'
                },
            ],
        }),
    ],
  // mode: "development",
  experiments: {
    outputModule: true,
  },
}