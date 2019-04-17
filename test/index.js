const fs = require("fs");
const path = require("path");
const compile = require("../lib/compile").default;
const chalk = require("chalk");
const assert = require("assert").strict;

let files = fs.readdirSync(__dirname).filter(name => name.endsWith(".test.js"));
for (let file of files) {
    let name = file.split('.')[0]
    test(file).catch(
        (e) => {
            console.error(chalk.red(`${name}: ${e}`));
        }
    ).then(
        () => {
            console.log(`${chalk.green("✓")} ${name}`);
        }
    );
}

async function test(file) {
    //  load the test module
    let mod = require(path.join(__dirname, file));
    let options = mod.options || {}
    //  compile the ast
    let wasm = compile(mod.source, file + "#source", options);
    if (!options.text) {
        let { module:wasmModule, instance: wasmInstance } = await WebAssembly.instantiate(wasm);
        let wasmExports = wasmInstance.exports
        if (mod.call) {
            let actual = wasmExports[mod.call](...(mod.arguments || []));
            let expected = mod.expected;
            assert.deepEqual(actual, expected);
        }
    } 
}
