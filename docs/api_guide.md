# API Reference

## LLM (Class)

Wrapper class for LLM Models.

Usage:
```js
import {LLM} from "llm.js/llm.js";
```

### constructor (Method)

Model Initializer called during LLM app creation.

Parameter               | Description | Example
---                     |           ---               | ---
type                    | Type of Model. <br> Values:<br>- GGUF_CPU<br>  | 'GGUF_CPU'
url                     | Model URL | [./tiny_starcoder_py.Q8_0.gguf](https://huggingface.co/RichardErkhov/bigcode_-_tiny_starcoder_py-gguf/resolve/main/tiny_starcoder_py.Q8_0.gguf)
init_callback           | Callback method to run after model initialization. | `() => { console.log('model loaded') }`
write_result_callback   | Callback method to print model result. | `(text) => { console.log('model result:' + test) }`
on_complete_callback    | Callback method to run after model run. | `() => { console.log('model execution completed') }`

Usage:
```js
const app = new LLM(
    'GGUF_CPU',
    'https://huggingface.co/RichardErkhov/bigcode_-_tiny_starcoder_py-gguf/resolve/main/tiny_starcoder_py.Q8_0.gguf',
    ()=>{},
    (text)=>{console.log(text)},
    ()=>{}
);
```

### load_worker (Method)

Download and load model binary into WebAssembly's File System ⏬📂.

- Models are cached in the browser window.
- After the model initialization *init_callback* is called.

Usage:
```js
app.load_worker();
```


### run (Method)

Call this method to run your prompts and generate response 📝.

- This method takes an Object Parameter as Input ⚙️.
- Model output can be captured by the *write_result_callback* method.
- Once inference is completed, then the *on_complete_callback* is called. 

Parameter                | Description | Example
---                      |           ---               | ---
prompt (string)          | Initial text prompt for text generation. | 'def fibonacci(n):'
max_token_len (number)   | Maximum length of tokens to output.  |  (Default: 50)
top_k (number)           | No. of tokens to consider for model sampling.  | (Default: 40)
top_p (number)           | Cumulative probability limits for the samples tokens to consider.  | (Default: 0.9)
temp (number)            | Parameter to control distribution of model sampling. | (Default: 1.0)
context_size (number)      | Set total *context_size* for the model. | (Default: 512)
grammar (string)      | Specify a [GBNF grammar](https://github.com/ggerganov/llama.cpp/blob/master/grammars/README.md) to constrain model output to a specific format. | (Default: Not defined)
json_schema (string)      | Specify a [JSON schema](https://json-schema.org/) to constrain model output. | (Default: Not defined)


Usage:
```js
app.run({
    prompt: "def fibonacci(n):",
    top_k: 1
});
```
