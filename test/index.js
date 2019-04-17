const fs = require("fs");
const path = require("path");
const compile = require("../lib/compile").default;
const chalk = require("chalk");
const assert = require("assert").strict;

let folders = fs.readdirSync(__dirname).filter(name => fs.statSync(path.join(__dirname, name)).isDirectory());
for (let name of folders) {
    test(name).catch(
        (e) => {
            console.error(chalk.red(`${name}: ${e}`));
        }
    ).then(
        () => {
            console.log(`${chalk.green("✓")} ${name}`);
        }
    );
}

async function test(name) {
    let directory = path.join(__dirname, name)
    let file = path.join(directory, `${name}.wast`)
    let source = fs.readFileSync(file, "utf8")
    //  load the test module
    let mod = require(directory);
    let options = mod.options || {};
    //  compile the ast
    let wasm = compile(source, path.relative(__dirname, file) + "#source", options);
    if (!options.text) {
        let { module: wasmModule, instance: wasmInstance } = await WebAssembly.instantiate(wasm, mod.imports);
        if (mod.test) {
            mod.test(wasmInstance.exports, assert);
        }
    } 
}
