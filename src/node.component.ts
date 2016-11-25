import { Component } from '@angular/core'
import { Input } from '@angular/core'
import { Output } from '@angular/core'
import { EventEmitter } from '@angular/core'

import { TreeNode } from './tree-node'

const NODE_COMPONENT_TEMPLATE = `
<li *ngIf="isExpandable()" class="all-item">
    <a (click)="clickItem(node)"
       class="folder-item"
       [ngClass]="{focus: node._focus}">
        <div style="white-space: nowrap">
            <span class="point" (click)="expandFolder()">
                <i class="fa fa-fw fa-caret-right" *ngIf="!isExpanded()"></i>
                <i class="fa fa-fw fa-caret-down" *ngIf="isExpanded()"></i>
            </span>

            <i class="fa fa-folder-o" *ngIf="!isExpanded()"></i>
            <i class="fa fa-folder-open-o" *ngIf="isExpanded()"></i>
            {{ node.name }}
        </div>
    </a>

    <ul *ngIf="isExpanded()" class="children-items">
        <node *ngFor="let n of node.children" [node]="n" (clicked)="propagate($event)"></node>
    </ul>
</li>

<li *ngIf="!isExpandable()" class="all-item">
    <a (click)="clickItem(node)"
       class="file-item"
       [ngClass]="{focus: node._focus}">
       <div style="white-space: nowrap">
           <i class="fa fa-file-o"></i> {{ node.name }}
       </div>
    </a>
</li>
`;

const DIRECTORY_TREE_STYLE = `
.all-item {
  list-style-type: none;
  display:inline;
}
.folder-item { }
.file-item { padding-left: 0px; }
.children-items {
  padding-left: 25px;
}
.focus { color: steelblue }
`;

@Component({
  selector: 'node',
  template: NODE_COMPONENT_TEMPLATE,
  styles: [DIRECTORY_TREE_STYLE]
})
export class NodeComponent {
  @Input() node:TreeNode;
  @Input() index:number;
  @Output() clicked:EventEmitter<TreeNode>;

  constructor() {
    this.clicked = new EventEmitter<TreeNode>()
  }

  isExpandable(): boolean {
    let isDirectory:boolean = this.node.isDir();
    return isDirectory;
  }

  isExpanded(): boolean {
    return this.node.isExpanded()
  }

  expandFolder():void {
    if (this.node.isExpanded()) {
      this.node.fold()
    } else {
      this.node.expand()
    }
  }

  clickItem(node:TreeNode) {
    this.clicked.emit(node)
  }

  propagate(node:TreeNode) {
    this.clicked.emit(node)
  }
}
