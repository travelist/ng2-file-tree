export class Node {
    name: string
    path: string
    mode: string
    type: string
    sha: string
    size: number
    children: Array<Node>
    _focus: boolean

    constructor(opts:{
        name?: string,
        path?: string,
        mode?: string,
        type?: string,
        sha?: string,
        size?: number,
        children: Array<Node>,
        _focus?: boolean
    }) {
        this.path = opts.path || ''
        this.name = opts.name || opts.path
        this.mode = opts.mode || ''
        this.type = opts.type || ''
        this.sha = opts.sha || ''
        this.size = opts.size
        this.children = opts.children
        this._focus = opts._focus || false
    }

    public focus() { this._focus = true }

    public blur() { this._focus = false }

}
