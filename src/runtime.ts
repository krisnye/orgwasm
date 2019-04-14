
export default `
    (global $_stack.pointer (mut i32) i32.const 0)
    (func $_stack.enter (result i32)
        get_global $_stack.pointer
    )
    (func $_stack.leave (param $value i32)
        get_local $value
        set_global $_stack.pointer
    )
`
