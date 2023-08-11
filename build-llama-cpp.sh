set -e

BUILD_DIR=build

LLAMA_HASH="9ca4abe"
LLAMA_DIR=$BUILD_DIR/llama-cpp

# Clear build directory
# if [ -d $BUILD_DIR ]; then
#     rm -r $BUILD_DIR
# fi

# Clone ggml library
if [ ! -d $LLAMA_DIR ]; then
    echo "Downloading llama.cpp repository..."
    git clone https://github.com/ggerganov/llama.cpp.git $LLAMA_DIR
    cd $LLAMA_DIR
    git reset --hard $LLAMA_HASH

    # Apply patch
    # echo "Applying patch..."
    # git apply ../../patches/00-disable-hardwares.patch
fi

export EMCC_CFLAGS="-O3 -DNDEBUG -s FORCE_FILESYSTEM=1 -s EXPORT_ES6=1 -s MODULARIZE=1 -s TOTAL_MEMORY=2GB -s STACK_SIZE=524288 -s ALLOW_MEMORY_GROWTH -s EXPORTED_FUNCTIONS=_main -s EXPORTED_RUNTIME_METHODS=callMain -s BUILD_AS_WORKER=1 -s SINGLE_FILE=1 -s NO_EXIT_RUNTIME=1"

emmake make main
