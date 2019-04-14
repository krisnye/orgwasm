import compileWasm from "./compileWasm";
import stringify from "./stringify";
import parse from "./parse";
import generateWasm from "./generateWasm";

export default function compile(inputWat, filename) {
    let ast = parse(inputWat, filename);
    let wasmAst = generateWasm(ast);
    let outputWat = stringify(wasmAst);
    return compileWasm(outputWat, filename);
}