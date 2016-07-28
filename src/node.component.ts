import {Component} from '@angular/core'
import {Input} from '@angular/core'
import {Output} from '@angular/core'
import {OnInit} from '@angular/core'
import {EventEmitter} from '@angular/core'
import {NgClass} from '@angular/common';

import {Node} from './node'

const NODE_COMPONENT_TEMPLATE = `
<li class="all-item">

    <div *ngIf="node.isFolder">
        <a (click)="clickItem(node)"
           class="folder-item"
           [ngClass]="{focus: node._focus}">

            <span class="point" (click)="clickFolderExpand(node)">
                <i class="fa fa-fw fa-caret-right" *ngIf="!(node.isExpanded)"></i>
                <i class="fa fa-fw fa-caret-down" *ngIf="node.isExpanded"></i>
            </span>

            <i class="fa fa-folder-o" *ngIf="!(node.isExpanded)"></i>
            <i class="fa fa-folder-open-o" *ngIf="node.isExpanded"></i>
            {{ node.name }}
        </a>

        <ul *ngIf="node.isExpanded" class="children-items">
            <node *ngFor="let n of node.children" [node]="n" (clicked)="propagate($event)"></node>
        </ul>
    </div>

    <div *ngIf="!node.isFolder">
        <a (click)="clickItem(node)"
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
    @Output() clicked: EventEmitter<Node>

    constructor() { this.clicked = new EventEmitter() }

    ngOnInit() { }

    clickFolderExpand(node: Node) { this.node.isExpanded = !this.node.isExpanded }

    clickItem(node: Node) { this.clicked.emit(node) }

    propagate(node: Node) { this.clicked.emit(node) }
}
