import { Component } from '@angular/core'
import { Input } from '@angular/core'
import { Output } from '@angular/core'
import { EventEmitter } from '@angular/core'

import { Node } from './node'

const NODE_COMPONENT_TEMPLATE = `
<li *ngIf="node.isDir()" class="all-item">
    <a (click)="clickItem(node)"
       class="folder-item"
       [ngClass]="{focus: node._focus}">
        <div style="white-space: nowrap">
            <span class="point" (click)="clickFolderExpand(node)">
                <i class="fa fa-fw fa-caret-right" *ngIf="!(node.isExpanded)"></i>
                <i class="fa fa-fw fa-caret-down" *ngIf="node.isExpanded"></i>
            </span>


            <i class="fa fa-folder-o" *ngIf="!(node.isExpanded)"></i>
            <i class="fa fa-folder-open-o" *ngIf="node.isExpanded"></i>
            {{ node.name }}
        </div>
    </a>

    <ul *ngIf="node.isExpanded" class="children-items">
        <node *ngFor="let n of node.children" [node]="n" (clicked)="propagate($event)"></node>
    </ul>
</li>
<li *ngIf="!node.isDir()" class="all-item">
    <a (click)="clickItem(node)"
       class="file-item"
       [ngClass]="{focus: node._focus}">
       <div style="white-space: nowrap">
           <i class="fa fa-file-o"></i> {{ node.name }} aaaas
       </div>
    </a>
</li>
`

const DIRECTORY_TREE_STYLE = `
.all-item {
  list-style-type: none;
  display:inline;
}
.folder-item { }
.file-item { padding-left: 0px; }
.children-items {
  padding-left: 25px;
  padding-top: 4px;
  padding-bottom: 4px;
}
.focus { color: steelblue }
`

@Component({
    selector: 'node',
    template: NODE_COMPONENT_TEMPLATE,
    styles: [DIRECTORY_TREE_STYLE]
})
export class NodeComponent {
    @Input() node: Node
    @Input() index: number
    @Output() clicked: EventEmitter<Node>

    constructor() { this.clicked = new EventEmitter() }

    clickFolderExpand(node: Node) { this.node.isExpanded = !this.node.isExpanded }

    clickItem(node: Node) { this.clicked.emit(node) }

    propagate(node: Node) { this.clicked.emit(node) }
}
