# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [1.0.2]

### Added

- Latest GGUF format supported with latest updated llama2-cpp module.
- Added *context_size* parameter for llama models.

### Changed

- Rebranded project to "ML.JS".
- Removed *STACK_SIZE* flag from build scripts.

## [1.0.1]

### Added

- Added support for [llama2.c](https://github.com/karpathy/llama2.c) models

### Changed

- Added *tokenizer_url* parameter in GGML Wrapper for supporting LLaMa2.  
- Upgraded ggml version to [244776a](https://github.com/ggerganov/ggml/commit/244776a089ebed7f0332f9c8bdc38d2d40464493)

## [1.0.0]

### Added

- ggml.js package
- Added Model Support for Dollyv2, GPT2, GPT J, GPT Neo X, MPT, Replit, StarCoder
- docsify documentation