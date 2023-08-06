import {action} from "./actions.js";

import * as models from "./models.js" ;

class GGML{
    // callback have to be defined before load_worker
    constructor(
        type,
        url,
        init_callback,
        write_result_callback,
        on_complete_callback,
    ){
        this.type = type;
        this.url = url;
        this.init_callback = init_callback;   // called back when model is loaded
        this.write_result_callback = write_result_callback; // Expectes text parameter and will be called when model generates result.
        this.on_complete_callback = on_complete_callback;
    }
    
    load_worker() {
        switch(this.type){
            case models.MODELS.DOLLY_V2: {
                this.worker = new Worker(
                    // Webpack doesn't like variable/const to hold paths. Don't know why
                    new URL("./web-workers/dollyv2-worker.js", import.meta.url)
                    , {type: 'module'}
                );
                break;
            }

            case models.MODELS.GPT_2: {
                this.worker = new Worker(
                    new URL("./web-workers/gpt2-worker.js", import.meta.url)
                    , {type: 'module'}
                );
                break;
            }

            case models.MODELS.GPT_J: {
                this.worker = new Worker(
                    new URL("./web-workers/gptj-worker.js", import.meta.url)
                    , {type: 'module'}
                );
                break;
            }

            case models.MODELS.GPT_NEO_X: {
                this.worker = new Worker(
                    new URL("./web-workers/gptneox-worker.js", import.meta.url)
                    , {type: 'module'}
                );
                break;
            }

            case models.MODELS.MPT: {
                this.worker = new Worker(
                    new URL("./web-workers/mpt-worker.js", import.meta.url)
                    , {type: 'module'}
                );
                break;
            }

            case models.MODELS.REPLIT: {
                this.worker = new Worker(
                    new URL("./web-workers/replit-worker.js", import.meta.url)
                    , {type: 'module'}
                );
                break;
            }

            case models.MODELS.STARCODER: {
                this.worker = new Worker(
                    new URL("./web-workers/starcoder-worker.js", import.meta.url)
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

        this.worker.postMessage({
            event: action.LOAD,
            url: this.url,
        });
    }

    run({
            prompt, 
            seed=-1,
            max_token_len = 50,
            top_k = 40,
            top_p = 0.9,
            temp = 1.0,
            repeat_last_n = 64,
            repeat_penalty = 1.176
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
            repeat_penalty
        });
    }
}

export { GGML }