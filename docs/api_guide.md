# API Reference

## GGML (Class)

Wrapper class for GGML Models.

Usage:
```js
import {GGML} from "ggml.js/ggml.js";
```

### constructor (Method)

Model Initializer called during GGML object creation

Parameter               | Description | Example
---                     |           ---               | ---
type                    | Type of Model. <br> Values:<br>- DOLLY_V2<br>- GPT_2<br>- GPT_J<br>- GPT_NEO_X<br>- MPT<br>- REPLIT<br>- STARCODER  | 'STARCODER'
url                     | Model URL | [./starcoder.bin](https://huggingface.co/rahuldshetty/ggml.js/resolve/main/starcoder.bin)
init_callback           | Callback method to run after model initialization. | `() => { console.log('model loaded') }`
write_result_callback   | Callback method to print model result. | `(text) => { console.log('model result:' + test) }`
on_complete_callback    | Callback method to run after model run. | `() => { console.log('model execution completed') }`

Usage:
```js
const app = new GGML(
    'STARCODER',
    'https://huggingface.co/rahuldshetty/ggml.js/resolve/main/starcoder.bin',
    ()=>{},
    (text)=>{console.log(text)},
    ()=>{}
);
```

### load_worker (Method)

Download and load model binary into WebAssembly's VM File System.

- Doesn't take in any parameters.
- This method should be called before the *run* method.

Usage:
```js
app.load_worker();
```


### run (Method)

Call this method to run model inference to generate text. 

- This method takes Object Parameter as Input.
- Model output can be captured by *write_result_callback* constructor method.

Parameter                | Description | Example
---                      |           ---               | ---
prompt (string)          | Initial text prompt for text generation. | 'def fibonacci(n):'
max_token_len (number)   | Maximum length of tokens to output.  |  (Default: 50)
top_k (number)           | No. of tokens to consider for model sampling.  | (Default: 40)
top_p (number)           | Cumulative probability limits for the samples tokens to consider.  | (Default: 0.9)
temp (number)            | Parameter to control distribution of model sampling. | (Default: 1.0)


Usage:
```js
app.run({
    prompt: "def fibonacci(n):",
    top_k: 1
});
```
