import {Component} from '@angular/core'
import {Input} from '@angular/core'

import {Node} from './node'

@Component({
    selector: 'directory-tree'
})
export class DirectoryTreeComponent {
    @Input() item: Node

    constructor(){}

}
