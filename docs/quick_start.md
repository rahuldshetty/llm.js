# Quick Start

Download and extract latest [release](https://github.com/rahuldshetty/ggml.js/releases) of ggml.js package to your web project.

After extracting the zip file, you will find the package structure like this:

```
.
└── ggml.js/
    ├── wasm/
    │   ├── dollyv2.js
    │   ├── gpt2.js
    │   └── ...
    ├── ggml.js
    ├── 19.js
    └── ...
```

The  `ggml.js` file is the entry point to the model wrapper.

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



`script.js`
```js
// Import GGML wrapper
import {GGML} from "ggml.js/ggml.js";

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

// GGML wrapper
const app = new GGML(
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