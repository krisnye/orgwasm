
module.exports = {
    options: { transform: true, runtime: true },
    test(exports, assert) {
        assert.deepEqual(exports.add(30, 12), 42)
    }
}
