import {Component} from '@angular/core'
import {Input} from '@angular/core'
import {Output} from '@angular/core'
import {OnInit} from '@angular/core'
import {EventEmitter} from '@angular/core'
import {NgClass} from '@angular/common';

import {Node} from './node'

const NODE_COMPONENT_TEMPLATE = `
<li class="all-item">

    <div *ngIf="node.children && node.children.length > 0">
        <a (click)="clickFolder(node)"
           class="folder-item"
           [ngClass]="{focus: node._focus}">

            <span class="point">
                <i class="fa fa-fw fa-caret-right" *ngIf="!(folderOpened)"></i>
                <i class="fa fa-fw fa-caret-down" *ngIf="folderOpened"></i>
            </span>

            <i class="fa fa-folder-o" *ngIf="!(folderOpened)"></i>
            <i class="fa fa-folder-open-o" *ngIf="folderOpened"></i>
            {{ node.name }}
        </a>

        <ul *ngIf="folderOpened" class="children-items">
            <node *ngFor="let n of node.children" [node]="n" (clicked)="propagate($event)"></node>
        </ul>
    </div>

    <div *ngIf="!node.children || !(node.children?.length > 0)">
        <a (click)="clickFile(node)"
           class="file-item animated fast fadeInDown"
           [ngClass]="{focus: node._focus}">
            <i class="fa fa-file-o"></i>
            {{ node.name }}
        </a>
    </div>
</li>
`

const DIRECTORY_TREE_STYLE = `
.all-item { list-style-type: none }
.folder-item { }
.file-item { padding-left: 20px }
.children-items {
  padding-left: 25px;
  padding-top: 4px;
}
.focus { color: steelblue }
`

@Component({
    selector: 'node',
    template: NODE_COMPONENT_TEMPLATE,
    directives: [NodeComponent, NgClass],
    styles: [DIRECTORY_TREE_STYLE]
})
export class NodeComponent implements OnInit {
    @Input() node: Node
    @Input() index: number
    @Output() clicked: EventEmitter
    folderOpened: boolean
    focused: boolean

    constructor() { this.clicked = new EventEmitter() }

    ngOnInit() {
        this.node = new Node(this.node)
        this.folderOpened = false
        this.focused = false
    }

    clickFolder(node: Node) {
        this.folderOpened = !this.folderOpened
        this.clicked.emit(node)
    }

    clickFile(node: Node) { this.clicked.emit(node) }

    propagate(node: Node) { this.clicked.emit(node) }
}
