(module
    (import "js" "calljs" (func $calljs (param i32) (param i32) (result i32)))
    (func $add (param $lhs i32) (param $rhs i32) (result i32)
        get_local $lhs
        get_local $rhs
        call $calljs
    )
    (export "add" (func $add))
)