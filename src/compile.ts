import compileWasm from "./compileWasm";
import stringify from "./stringify";
import parse from "./parse";
import generateWasm from "./generateWasm";
import runtime from "./runtime";
import chalk from "chalk";

export default function compile(inputWat, filename, options = { runtime: false, dump: false, text: false }) {
    // parse the input
    let ast = parse(inputWat, filename)
    // add the runtime to the module
    if (options.runtime) {
        ast.splice(1, 0, ...runtime)
    }
    function dump(e?) {
        let errors = e ? [...e.toString().match(/:(\d+)\:/g).map(x => x[1])] : []
        function formatLine(text, i) {
            let color = errors.indexOf(i.toString()) >= 0 ? "red" : "white"
            return `${chalk.dim((i + 1).toString().padStart(2, ' ') + ":")} ${chalk[color](text)}`
        }
        console.log(filename + ":\n" + outputWat.split('\n').map(formatLine).join('\n'))
    }
    // convert it to vanilla web assembly ast
    let wasmAst = generateWasm(ast)
    // format it back as a string
    let outputWat = stringify(wasmAst)
    if (options.dump) {
        dump()
    }
    if (options.text) {
        return outputWat
    }
    // compile it into a wasm binary
    try {
        return compileWasm(outputWat, filename)
    } catch(e) {
        dump(e)
        throw e
    } 
}