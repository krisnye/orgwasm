import compileWasm from "./compileWasm";
import stringify from "./stringify";
import parse from "./parse";
import generateWasm from "./generateWasm";
import runtime from "./runtime";
import chalk from "chalk";

function transform(inputWat, filename, options) {
    // parse the input
    let ast = parse(inputWat, filename)
    // add the runtime to the module
    if (options.runtime) {
        ast.splice(1, 0, ...runtime)
    }
    // convert it to vanilla web assembly ast
    let wasmAst = generateWasm(ast)
    // format it back as a string
    return stringify(wasmAst)
}

export default function compile(inputWat, filename, options = { transform: false, runtime: false, dump: false, text: false }) {
    function dump(e?) {
        let errors = e ? [...e.toString().match(/:(\d+)\:/g).map(x => x[1])] : []
        function formatLine(text, i) {
            let color = errors.indexOf((i + 1).toString()) >= 0 ? "red" : "white"
            return `${chalk.dim((i + 1).toString().padStart(2, ' ') + ":")} ${chalk[color](text)}`
        }
        console.log(filename + ":\n" + outputWat.split('\n').map(formatLine).join('\n'))
    }
    let outputWat = options.transform ? transform(inputWat, filename, options) : inputWat
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