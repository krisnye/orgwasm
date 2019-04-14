import watTokenizer from "wat-tokenizer";
import traverse, { remove } from "./traverse";

function isWhitespace(node) {
    return !Array.isArray(node)
        && (node.toString().trim().length === 0);
}

function stripWhitespaceAddProperties(node: any[], properties) {
    return traverse(node, {
        post(node) {
            node = node.filter(a => !isWhitespace(a))
            Object.assign(node[0], properties);
            return node;
        }
    });
}

export default function parse(wat: string, file: string) {
    let tokenizer = watTokenizer();
    tokenizer.update(Buffer.from(wat));
    let tokens = tokenizer.final(true);
    let ast = stripWhitespaceAddProperties(tokens, { file });
    return ast[0];
}
