(module
    (memory 1 1)
    (func $add (param $lhs i32) (param $rhs i32) (result i32)
        (local $return i32)
        get_local $lhs
        get_local $rhs
        i32.add
        set_local $return
        get_local $return
        (i32.store (get_local $return) (i32.const 0))
    )
    (export "add" (func $add))
)