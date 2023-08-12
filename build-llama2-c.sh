set -e

BUILD_DIR=build

LLAMA2_HASH="c426412"
LLAMA2_DIR=$BUILD_DIR/llama2

LLAMA2_OUTPUT="llama2.js"

# Clear build directory
# if [ -d $BUILD_DIR ]; then
#     rm -r $BUILD_DIR
# fi

# Clone llama2
if [ ! -d $LLAMA2_DIR ]; then
    echo "Downloading llama.cpp repository..."
    git clone https://github.com/karpathy/llama2.c.git $LLAMA2_DIR
    cd $LLAMA2_DIR
    git reset --hard $LLAMA2_HASH

    # Apply patch
    echo "Applying patch..."
    git apply ../../patches/00-llama2-c-emscripten.patch

    cd ../../ # move to root directory
fi

cd $LLAMA2_DIR

export EMCC_CFLAGS="-O3 -DNDEBUG -s FORCE_FILESYSTEM=1 -s EXPORT_ES6=1 -s MODULARIZE=1 -s INITIAL_MEMORY=1000MB -s MAXIMUM_MEMORY=4GB -s STACK_SIZE=11524288 -s ALLOW_MEMORY_GROWTH -s EXPORTED_FUNCTIONS=_main -s EXPORTED_RUNTIME_METHODS=callMain -s BUILD_AS_WORKER=1 -s SINGLE_FILE=1 -s NO_EXIT_RUNTIME=1"

if [ -d $LLAMA2_DIR ]; then
    rm $LLAMA2_OUTPUT
fi

emcc -O3 -o $LLAMA2_OUTPUT run.c -lm
