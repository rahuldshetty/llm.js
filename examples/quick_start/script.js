// Import GGML wrapper
import {GGML} from "../../dist/ggml.js";

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
    'STARCODER',        // Type of Model
    'https://huggingface.co/rahuldshetty/ggml.js/resolve/main/starcoder.bin', // Model URL
    on_loaded,          // On Model Load callback function
    write_result,       // On Model write callback function
    run_complete        // On Model completion callback function
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
