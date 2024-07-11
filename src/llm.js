import { action } from "./actions.js";
import { loadBinaryResource } from "./utility.js";

import * as  model from "./models.js"; 

class LLM{
    // callback have to be defined before load_worker
    constructor(
        type,
        url,
        init_callback,
        write_result_callback,
        on_complete_callback
    ){
        this.type = type;
        this.url = url;
        this.init_callback = init_callback;   // called back when model is loaded
        this.write_result_callback = write_result_callback; // Expectes text parameter and will be called when model generates result.
        this.on_complete_callback = on_complete_callback;
    }
    
    load_worker() {
        switch(this.type){

            case model.MODELS.GGUF_CPU: {
                this.worker = new Worker(
                    new URL("./web-workers/llamacpp-cpu-worker.js", import.meta.url)
                    , {type: 'module'}
                );
                break;
            }
        }
        

        this.worker.onmessage = (event) => {
            switch (event.data.event) {
                // Load Model
                case action.INITIALIZED:{
                    if(this.init_callback) this.init_callback();
                    break;
                }

                // Capture result
                case action.WRITE_RESULT:{
                    if(this.write_result_callback) this.write_result_callback(event.data.line);
                    break;
                }

                // Execution Completed
                case action.RUN_COMPLETED:{
                    if(this.on_complete_callback) this.on_complete_callback();
                    break;
                }
            }
        };


        loadBinaryResource(this.url, (bytes)=>{
            this.worker.postMessage({
                event: action.LOAD,
                model_bytes: bytes
            });
        });
        
    }

    run({
            prompt, 
            seed=-1,
            max_token_len = 50,
            top_k = 40,
            top_p = 0.9,
            temp = 1.0,
            repeat_last_n = 32,
            repeat_penalty = 1.2,
            context_size = 256,
            grammar = '',
            json_schema = '',
            regex = ''
    }={}){        
        this.worker.postMessage({
            event: action.RUN_MAIN,
            prompt,
            seed,
            max_token_len,
            top_k,
            top_p,
            temp,
            repeat_last_n,
            repeat_penalty,
            context_size,
            grammar,
            json_schema,
            regex
        });
    }
}

export { LLM }