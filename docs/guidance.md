# Guidance - Structuring LLM response

## JSON Schema

You can structure the LLM response to a JSON format which is helpful in function calling based use-cases.

```js
// JSON Schema
var json_schema = '{"type": "array","items": {"type": "string"},"minItems": 2,"maxItems": 5}'

// Initial Prompt
var initial_prompt = `<|im_start|>user
List Marvel superhero names.<|im_end|>
<|im_start|>assistant
`

// Load LLM App
const app = new LLM(
    // Initialize Parameters for model
    // ...
);
app.load_worker();

// Run model inference with grammar
app.run({
    prompt: initial_prompt,
    json_schema: json_schema,
    context_size: 512,
    max_token_len: 256
});

// You'll see output like this
// [ "Captain America", "The Hulk", "Thanos", "Black Widow", "WandaVision" ]
```

Currently the support is limited to in-line definitions, i.e you cannot load schema reference from remote locations.

## GBNF Grammar

LLM.js now supports Llama.cpp's underlying [GBNF](https://github.com/ggerganov/llama.cpp/blob/master/grammars/README.md) format to structure your LLM response.

```js
// CFG Grammar to generate list items
var grammar = `root ::= item+

# Excludes various line break characters
item ::= "- " ([a-zA-Z]+){1,10} "\n"
`

// Initial Prompt
var initial_prompt = `<|im_start|>user
List 9 planets in the Solar System<|im_end|>
<|im_start|>assistant
`

// Load LLM App
const app = new LLM(
    // Initialize Parameters for model
    // ...
);
app.load_worker();

// Run model inference with grammar
app.run({
    prompt: initial_prompt,
    grammar: grammar,
    context_size: 512,
    max_token_len: 256
});

// You'll see output like this
// - Mars
// - Venus
// - Earth
// ...
```

You can find more GBNF examples over [here](https://github.com/ggerganov/llama.cpp/tree/master/grammars). 
