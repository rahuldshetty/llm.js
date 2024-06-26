<div align="center" style="display:flex; align-items:center;justify-content: center;background:#e1e1e1;color:#0f0f0f;padding:50px;">
    <img alt="llm.js logo" src="https://raw.githubusercontent.com/rahuldshetty/llm.js/master/docs/_media/logo.jpg">
</div>

<p align="center">
    <img alt="no-languages" src="https://img.shields.io/github/languages/count/rahuldshetty/llm.js?color=red&style=flat-square">
    <img alt="commit-activity" src="https://img.shields.io/github/commit-activity/w/rahuldshetty/llm.js?color=green&style=flat-square">
   <img alt="stars" src="https://img.shields.io/github/stars/rahuldshetty/llm.js?style=social">
</p>

# LLM.js

> Run Large-Language Models (LLMs) 🚀 directly in your browser!

<p align="center">
    <img alt="Sample" src="https://raw.githubusercontent.com/rahuldshetty/llm.js/master/docs/_media/demo.gif">
</p>

Example projects🌐✨: [Live Demo](https://rahuldshetty.github.io/llm.js-examples/)

Learn More: [Documentation](https://rahuldshetty.github.io/llm.js/) 

Models Supported:
-  [TinyLLaMA Series - 1,2,3🦙](https://huggingface.co/TinyLlama)
-  [GPT-2](https://huggingface.co/gpt2)
-  [Tiny Mistral Series](https://huggingface.co/Locutusque/TinyMistral-248M)
-  [Tiny StarCoder Py](https://huggingface.co/bigcode/tiny_starcoder_py)
-  [Qwen Models](https://huggingface.co/Qwen)
-  [TinySolar](https://huggingface.co/upstage/TinySolar-248m-4k-code-instruct)
-  [Pythia](https://github.com/EleutherAI/pythia)
-  [Mamba](https://huggingface.co/state-spaces/mamba-130m-hf)
and much more✨ 

## Features

- Run inference directly on browser (even on smartphones)
- Developed in pure JavaScript
- Web Worker to perform background tasks (model downloading/inference)
- Model Caching support
- Pre-built [packages](https://github.com/rahuldshetty/llm.js/releases) to directly plug-and-play into your web apps.

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
    'GGUF_CPU',

    // Model URL
    'https://huggingface.co/RichardErkhov/bigcode_-_tiny_starcoder_py-gguf/resolve/main/tiny_starcoder_py.Q8_0.gguf',

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