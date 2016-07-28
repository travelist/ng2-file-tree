import {Component} from '@angular/core'
import {EventEmitter} from '@angular/core'
import {ElementRef} from '@angular/core'
import {Input} from '@angular/core'
import {Output} from '@angular/core'
import {OnInit} from '@angular/core'

import {Node} from './node'
import {NodeComponent} from './node.component'

const DIRECTORY_TREE_TEMPLATE = `
<div>
    <ul>
        <node [node]="directory" (clicked)="nodeClicked($event)"></node>
    </ul>
</div>
`

const DIRECTORY_TREE_STYLE = `
`

@Component({
    selector: 'directory-tree',
    template: DIRECTORY_TREE_TEMPLATE,
    directives: [NodeComponent],
    styles: [DIRECTORY_TREE_STYLE],
    host: {
        '(window:keydown)': 'keydownHandler($event)'
    }
})
export class DirectoryTreeComponent implements OnInit {
    @Input() directory: Node
    @Input() isActive: boolean
    @Output() onChange: EventEmitter<Node>
    @Output() clicked: EventEmitter<Node>

    currFocusNode: Node

    constructor(private _eref: ElementRef) {
        this.onChange = new EventEmitter()
        this.clicked = new EventEmitter()
    }

    ngOnInit() {
        this.directory = new Node(this.directory)
        this.currFocusNode = null
        this.isActive = false
    }

    nodeClicked(nextNode: Node) {
        this.updateFocusNode(nextNode)
        this.clicked.emit(nextNode)
    }

    keydownHandler(event: KeyboardEvent) {
        //if (!this.isActive) return

        console.log(event.keyCode)

        switch (event.keyCode) {
            case 13: // Enter
                this.onChange.emit(this.currFocusNode)
                break
            case 37: // left
                console.log(this.currFocusNode)
                console.log(this.currFocusNode.parent)
                // if focus on folder and it is not folded:
                //   fold folder
                // else if parent is exist:
                //   move to parent
                break
            case 38: // Up
                // Move to upper item
                break
            case 39: // Right
                // if focus on folder and it is folded:
                //   expand folder
                break
            case 40: // Down
                // Move to following item
                break
        }
    }

    private updateFocusNode(next: Node) {
        if (this.currFocusNode) this.currFocusNode.blur()
        this.currFocusNode = next
        this.currFocusNode.focus()
    }

}
