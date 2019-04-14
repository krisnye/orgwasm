import * as fs from "fs";
import compileWasm from "./compileWasm";

let wasm = compileWasm(`(module)`);
fs.writeFileSync("output.wat", wasm);

// OK, we can now compile web assembly text to wasm binary.
