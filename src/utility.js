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