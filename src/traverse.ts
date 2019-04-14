
export type VisitorCallback = (node: any[]) => any
export type Visitor = {
    post?: VisitorCallback
    pre?: VisitorCallback
}

export const remove: any = Symbol("traverse.remove");

export default function traverse(node: any[], visitor: Visitor) {
    if (visitor.pre) {
        let result = visitor.pre(node);
        if (result !== undefined)
            return result
    }
    for (let i = 0; i < node.length; i++) {
        let child = node[i];
        if (Array.isArray(child)) {
            let result = traverse(child, visitor);
            if (result !== undefined) {
                if (result === remove) {
                    node.splice(i--, 1);
                } else {
                    node[i] = result;
                }
            }
        }
    }
    if (visitor.post) {
        let result = visitor.post(node);
        if (result !== undefined)
            return result;
    }
    return node
}