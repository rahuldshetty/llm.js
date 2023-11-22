<div align="center" style="display:flex; align-items:center;justify-content: center;background:#e1e1e1;color:#0f0f0f;padding:50px;">
    <img alt="llm.js logo" src="https://raw.githubusercontent.com/rahuldshetty/llm.js/master/docs/_media/logo.png" width="350">
</div>

<p align="center">
    <img alt="no-languages" src="https://img.shields.io/github/languages/count/rahuldshetty/llm.js?color=red&style=flat-square">
    <img alt="commit-activity" src="https://img.shields.io/github/commit-activity/w/rahuldshetty/llm.js?color=green&style=flat-square">
   <img alt="stars" src="https://img.shields.io/github/stars/rahuldshetty/llm.js?style=social">
</p>

# LLM.js

> Run Large-Language Models (LLMs) 🚀 directly in your browser!

Example projects🌐✨: [Live Demo](https://rahuldshetty.github.io/llm.js-examples/)

Learn More: [Documentation](https://rahuldshetty.github.io/llm.js/) 

Models Supported:
- [llama-cpp (GGUF/GGML)](https://github.com/ggerganov/llama.cpp)
- [LLaMa 2](https://github.com/karpathy/llama2.c)
- [Dolly v2](https://github.com/ggerganov/ggml/tree/master/examples/dolly-v2) 
- [GPT2](https://github.com/ggerganov/ggml/tree/master/examples/gpt-2)
- [GPT J](https://github.com/ggerganov/ggml/tree/master/examples/gpt-j)
- [GPT NEO X](https://github.com/ggerganov/ggml/tree/master/examples/gpt-neox)
- [MPT](https://github.com/ggerganov/ggml/tree/master/examples/mpt)
- [Replit](https://github.com/ggerganov/ggml/tree/master/examples/replit)
- [StarCoder](https://github.com/ggerganov/ggml/tree/master/examples/starcoder)

*New models/formats coming soon*⏰

## Installation

Download and extract the latest [release](https://github.com/rahuldshetty/llm.js/releases) of the llm.js package to your web application📦💻.

## Quick Start

```js
// Import LLM app
import {LLM} from "llm.js/llm.js";

// State variable to track model load status
var model_loaded = false;

// Initial Prompt
var initial_prompt = "def fibonacci(n):"

// Callback functions
const on_loaded = () => { 
    model_loaded = true; 
}
const write_result = (text) => { document.getElementById('result').innerText += text + "\n" }
const run_complete = () => {}

// Configure LLM app
const app = new LLM(
     // Type of Model
    'STARCODER',    

    // Model URL
    'https://huggingface.co/rahuldshetty/ggml.js/resolve/main/starcoder.bin', 

    // Model Load callback function
    on_loaded,          

    // Model Result callback function
    write_result,       

     // On Model completion callback function
    run_complete       
);

// Download & Load Model GGML bin file
app.load_worker();

// Trigger model once its loaded
const checkInterval = setInterval(timer, 5000);

function timer() {
    if(model_loaded){
            app.run({
            prompt: initial_prompt,
            top_k: 1
        });
        clearInterval(checkInterval);
    } else{
        console.log('Waiting...')
    }
}
```