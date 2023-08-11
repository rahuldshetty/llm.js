set -e

BUILD_DIR=build

GGML_HASH="244776a"
GGML_DIR=$BUILD_DIR/ggml

TARGET_DIR=$BUILD_DIR/ggml-bin

# Clear build directory
# if [ -d $BUILD_DIR ]; then
#     rm -r $BUILD_DIR
# fi

# Clone ggml library
if [ ! -d $GGML_DIR ]; then
    echo "Downloading GGML repository..."
    git clone https://github.com/ggerganov/ggml.git $GGML_DIR
    cd $GGML_DIR
    git reset --hard $GGML_HASH

    # Apply patch
    echo "Applying patch..."
    git apply ../../patches/00-ggml-hardware-disable.patch

    cd ../../ # move to root directory
fi

if [ -d $TARGET_DIR ]; then
    rm -r $TARGET_DIR
fi

mkdir -p $TARGET_DIR

cd $TARGET_DIR

emcmake cmake ../../$GGML_DIR -DGGML_NO_ACCELERATE=ON

export EMCC_CFLAGS="-O3 -DNDEBUG -s FORCE_FILESYSTEM=1 -s EXPORT_ES6=1 -s MODULARIZE=1 -s TOTAL_MEMORY=2GB -s STACK_SIZE=524288 -s ALLOW_MEMORY_GROWTH -s EXPORTED_FUNCTIONS=_main -s EXPORTED_RUNTIME_METHODS=callMain -s BUILD_AS_WORKER=1 -s SINGLE_FILE=1 -s NO_EXIT_RUNTIME=1"

emmake make gpt-2 dollyv2 gpt-j gpt-neox mpt replit starcoder
