(module
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
