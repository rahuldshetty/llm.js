import {action} from "../actions.js";
import Module from "gpt-j";
import {loadBinaryResource, is_model_output} from "../utility.js"

// WASM Module
let module;

const model_path = "/models/model.bin";

// Function to send model line result
const write_result_fn = (text) => {
    // console.log('worker:' + text);
    console.log('model:' + text)
    if(is_model_output(text)){
        postMessage({
            event: action.WRITE_RESULT,
            line: text
        });
    }
}


// Function to initialize worker 
// and download model file
const init_worker_fn = async (model_path) => {
    const args = {
        'noInitialRun': true,
        'print': write_result_fn
    }

    module = await Module(args);

    const initCallback = (bytes) => {
        // create virtual fs folder for storing model bins
        module['FS_createPath']("/", "models", true, true);

        // load model
        module['FS_createDataFile']('/models', 'model.bin', bytes, true, true, true);
        
        // update callback action to worker main thread
        postMessage({
            event: action.INITIALIZED
        });

        console.log('model: Loaded')
    }

    loadBinaryResource(model_path, initCallback)
}

const run_main = (
    prompt,
    seed,
    max_token_len,
    top_k,
    top_p,
    temp,
    repeat_last_n,
    repeat_penalty
) => {
    console.log(seed)
    const args = [
        "-p", prompt.toString(),
        "-n", max_token_len.toString(),
        "--top_k", top_k.toString(),
        "--top_p", top_p.toString(),
        "--temp", temp.toString(),
        "-m", model_path
    ];

    console.log('model: calling main...')
    module['callMain'](args);

    postMessage({
        event: action.RUN_COMPLETED
    });
    console.log('model: Completed')
} 

// Worker Events
self.addEventListener('message', (e) => {
    switch(e.data.event){
        // load event
        case action.LOAD: {
            init_worker_fn(e.data.url);
            break;
        }

        // run main
        case action.RUN_MAIN:{
            run_main(
                e.data.prompt,
                e.data.seed,
                e.data.max_token_len,
                e.data.top_k,
                e.data.top_p,
                e.data.temp,
                e.data.repeat_last_n,
                e.data.repeat_penalty
            )
            break;
        }

    }
  }, false);
  