# Quick Start

Download and extract the latest [release](https://github.com/rahuldshetty/llm.js/releases) of the llm.js package to your web project. 📦💻

After extracting the zip file, you will find the package structure like this:

```
.
└── llm.js/
    ├── wasm/
    │   └── llamacpp-cpu.js
    ├── llm.js
    └── ...
```

The `llm.js` file is the entry point to the model wrapper.

Let us create a simple HTML file.

`index.html`
```html
<!DOCTYPE html>
<html lang="en">
    <body>

    <pre>
        <div id="result"></code>
    </pre>
    
    <script type="module" src="script.js"></script>
    </body>
</html>
```

Let's define a JS script file to load model with llm.js library and run LLM inference on browser.

`script.js`
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