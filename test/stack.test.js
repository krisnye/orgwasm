
const runtime = require("../lib/runtime").default;

module.exports = {
    ast: `
        (module
            ${runtime}
            (func $add (param $lhs i32) (param $rhs i32) (result i32)
                (local $return i32)
                (call $_stack.enter)
                    get_local $lhs
                    get_local $rhs
                    i32.add
                    set_local $return
                (call $_stack.leave)
                get_local $return
            )
            (export "add" (func $add))
        )
    `,
    call: "add",
    arguments: [30, 12],
    expected: 42
}
