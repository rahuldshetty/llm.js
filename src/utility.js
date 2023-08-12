export function loadBinaryResource(url, callback) {
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";

    req.onload = (event) => {
        const arrayBuffer = req.response; // Note: not req.responseText
        if (arrayBuffer) {
            const byteArray = new Uint8Array(arrayBuffer);
            callback(byteArray)
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