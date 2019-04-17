
function containsArray(array: any[]) {
    for (let element of array) {
        if (Array.isArray(element)) {
            return true
        }
    }
    return false
}

function newline(indent: number = 0, buffer: string[]) {
    buffer.push('\n')
    for (let i = 0; i < indent; i++) {
        buffer.push('  ')
    }
}

function append(ast, indent: number = 0, buffer: string[] = []) {
    if (!Array.isArray(ast)) {
        buffer.push(ast != null ? ast.toString() : "null")
    } else if (containsArray(ast)) {
        buffer.push("(", ast[0])
        indent++
        for (let element of ast.slice(1)) {
            if (element[0] === "$" || element[0] === '"') {
                buffer.push(" ")
            } else {
                newline(indent, buffer)
            }
            append(element, indent, buffer)
        }
        indent--
        newline(indent, buffer)
        buffer.push(")")
    } else {
        buffer.push("(")
        for (let i = 0; i < ast.length; i++) {
            let element = ast[i]
            if (i > 0) {
                buffer.push(" ")
            }
            append(element, indent, buffer)
        }
        buffer.push(")")
    }
    return buffer
}

export default function stringify(ast) {
    return append(ast).join("")
}