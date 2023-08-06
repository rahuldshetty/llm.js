import path from 'path';
import { fileURLToPath } from 'url';
import CopyWebpackPlugin from 'copy-webpack-plugin';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default  {
  entry: path.resolve(__dirname, "src/ggml.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "ggml.js",
    library: {
      type: "module",
    },
  },
  externals: {
    "main": "./main.js"
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
                    from: 'build/main.js',
                    to: 'main.js'
                },
              //   {
              //     from: 'build/main.wasm',
              //     to: 'main.wasm'
              // },
            ],
        }),
    ],
  mode: "development",
  experiments: {
    outputModule: true,
  },
}