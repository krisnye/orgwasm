
module.exports = {
    imports: {
        js: {
            memory: new WebAssembly.Memory({initial: 1, maximum: 1})
        }
    },
    test(exports, assert) {
        assert.deepEqual(exports.add(30, 12), 42)
        // make sure the memory has 42 written to the first 4 byte word
        let memory = new Int32Array(this.imports.js.memory.buffer)
        // console.log(memory.slice(0, 20))
        assert.deepEqual(memory[0], 42)
    }
}
