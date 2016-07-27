import {DirectoryTreeComponent} from './src/directory-tree.component'
import {NodeComponent} from './src/node.component'
import {Node} from './src/node'

export * from './src/directory-tree.component'
export * from './src/node.component'
export * from './src/node'

export default {
    directives: [
        DirectoryTreeComponent,
        NodeComponent,
    ]
}
