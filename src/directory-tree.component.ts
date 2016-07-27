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
        <node [node]="directory" (clicked)="nodeClicked($event)" [index]="0"></node>
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
    @Output() onChange: EventEmitter
    @Output() clicked: EventEmitter

    currFocusNode: Node

    constructor(private _eref: ElementRef) {
        this.onChange = new EventEmitter()
        this.clicked = new EventEmitter()
    }

    ngOnInit() {
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
                break
            case 38: // Up
                break
            case 39: // Right
                break
            case 40: // Down
                break
        }
    }

    private updateFocusNode(next: Node) {
        if (this.currFocusNode) this.currFocusNode.blur()
        this.currFocusNode = next
        this.currFocusNode.focus()
    }

}
