export class Node {
    name: string
    children: Array<Node>

    constructor(opts: Node){
        this.name = opts.name
        this.children = opts.children
    }
}
