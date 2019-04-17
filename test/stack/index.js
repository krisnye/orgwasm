
module.exports = {
    options: { runtime: true },
    test(exports, assert) {
        assert.deepEqual(exports.add(30, 12), 42)
    }
}
