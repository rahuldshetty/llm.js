const cacheName = "llmjs-cache";

export async function loadBinaryResource(url, callback) {
    let cache = null, window = self;

    // Try to find if the model data is cached in Web Worker memory.
    if (typeof window === "undefined") {
        console.log("Oops, `window` is not defined")
    }
    else if(window && window.caches) {
        cache = await window.caches.open(cacheName);
        const cachedResponse = await cache.match(url);

        if (cachedResponse) {
            const data = await cachedResponse.arrayBuffer();
            const byteArray = new Uint8Array(data);
            callback(byteArray);
            return;
        }
    }

    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";

    req.onload = async (_) => {
        const arrayBuffer = req.response; // Note: not req.responseText
        if (arrayBuffer) {
            const byteArray = new Uint8Array(arrayBuffer);
            if (cache) await cache.put(url, new Response(arrayBuffer));
            callback(byteArray);
        }
    };

    req.send(null);
}

// Regex rule to remove model output from ggml scritps
const MODEL_DEBUG_PATTERN = [
    /main:.*/,
    /.*_model_load:.*/
]

export const is_model_output = (text) => {
    for(var i = 0; i < MODEL_DEBUG_PATTERN.length; i = i + 1){
        if(MODEL_DEBUG_PATTERN[i].test(text)){
            return false
        }
    }
    return true;
}

export const extract_file_name = (text) => {
    return text.substring(text.lastIndexOf('/')+1);
}