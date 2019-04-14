import compileWasm from "./compileWasm";
import stringify from "./stringify";

export default function compile(wat, filename) {
    // let wat = stringify(ast);
    // TODO: here we can convert our higher level ast to wasm
    return compileWasm(wat, filename);
}