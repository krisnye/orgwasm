import wabtInit from "wabt";
const wabt = (wabtInit as any)();

function stringToArrayBuffer(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

export default function compileWasm(wat: string, filename = "anonymous.wat"): ArrayBuffer {
    let watBuffer = stringToArrayBuffer(wat);
    let wasmodule = wabt.parseWat(filename, watBuffer);
    debugger
    let wasm = wasmodule.toBinary({});
    return wasm.buffer;
}
