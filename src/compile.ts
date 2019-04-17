import compileWasm from "./compileWasm";
import stringify from "./stringify";
import parse from "./parse";
import generateWasm from "./generateWasm";
import runtime from "./runtime";

export default function compile(inputWat, filename, options = { runtime: true, dump: false, text: false }) {
    // parse the input
    let ast = parse(inputWat, filename)
    // add the runtime to the module
    if (options.runtime) {
        ast.splice(1, 0, ...runtime)
    }
    // convert it to vanilla web assembly ast
    let wasmAst = generateWasm(ast)
    // format it back as a string
    let outputWat = stringify(wasmAst)
    if (options.dump) {
        console.log(filename + ":\n" + outputWat)
    }
    if (options.text) {
        return outputWat
    }
    // compile it into a wasm binary
    return compileWasm(outputWat, filename)
}