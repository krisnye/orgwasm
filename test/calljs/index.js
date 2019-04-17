
module.exports = {
    imports: {
        js: {
            calljs(a, b) {
                return a + b
            }
        }
    },
    test(exports, assert) {
        assert.deepEqual(exports.add(30, 12), 42)
    }
}
