# Building llm.js

In order to build llm.js, you need to have the following pre-requisites 🛠️ installed on your system:

* [CMake](https://cmake.org/download/): CMake is an open-source, cross-platform family of tools designed to build, test and package software.
* [Emscripten](https://emscripten.org/docs/getting_started/downloads.html): Emscripten is a complete compiler toolchain to WebAssembly, using LLVM, with a special focus on speed, size, and the Web platform.
* [Node JS](https://nodejs.org/it/download/current): Node.js is an open-source, cross-platform JavaScript runtime environment.

## Build WebAssembly bundles for GGML models

1) Clone llm.js repository to local:
    ```
    git clone https://github.com/rahuldshetty/llm.js.git
    cd llm.js
    ```

2) Run the llama build script to generate WASM files:
    ```
    sh scripts/build-llama-cpp-wasm.sh
    ```

This script will download the llama.cpp repository and apply llm.js patches to generate WebAssembly bundles.
You can find the WebAssembly JS files in `build/llama-bin/bin/` location.

## Package llm.js

Once the model bundles are generated, now we can build the llm.js JavaScript package with Web Bundles:

```
npm run build
```

This will generate JS bundles in `dist/` location. 

You can copy these contents to your project and import llm.js using JavaScript module. 
