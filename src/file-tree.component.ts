import { Component } from '@angular/core'
import { EventEmitter } from '@angular/core'
import { ElementRef } from '@angular/core'
import { SimpleChanges } from '@angular/core'
import { Input } from '@angular/core'
import { Output } from '@angular/core'
import { OnInit } from '@angular/core'
import { OnChanges } from '@angular/core'

import { TreeNode } from './tree-node'
import { NodeComponent } from './node.component'
import { TreeNodeParams } from './tree-node';
import {FileType} from "./tree-node";

const DIRECTORY_TREE_TEMPLATE:string = `
<ul class="ul-file-tree">
  <node [node]="root" (clicked)="fileTreeClicked($event)"></node>
</ul>
`;

const DIRECTORY_TREE_STYLE:string = `
.ul-file-tree { padding: 0; }
`;

@Component({
  selector: 'file-tree',
  template: DIRECTORY_TREE_TEMPLATE,
  styles: [DIRECTORY_TREE_STYLE],
  host: {
    '(window:keydown)': 'keydownHandler($event)'
  }
})
export class FileTreeComponent implements OnInit, OnChanges {
  @Input() tree:TreeNode;
  @Input() keyboardWatch:boolean;
  @Output() onChange:EventEmitter<TreeNode>;

  private root:TreeNode;
  private currFocusNode:TreeNode;

  constructor(private _eref:ElementRef) {
    this.onChange = new EventEmitter();
    this.keyboardWatch = false
  }

  ngOnInit() {
    this.root = new TreeNode(
      <TreeNodeParams>{name: '/', type: FileType.dir}
    );
    this.currFocusNode = null;
  }

  ngOnChanges(changes:SimpleChanges) {
    console.log("update");
    if (typeof(changes['tree'].currentValue) !== "undefined") {
      this.root = this.tree;
    }
  }

  fileTreeClicked(nextNode:TreeNode) {
    this.updateFocusNode(nextNode);
    this.onChange.emit(nextNode)
  }

  keydownHandler(event:KeyboardEvent) {
    if (!this.keyboardWatch) return;
    if (this.currFocusNode === null) return;

    switch (event.keyCode) {
      case 13: // Enter
        this.onChange.emit(this.currFocusNode);
        break;
      case 37: // left
        if (this.currFocusNode.isDir()
          && this.currFocusNode.isExpanded) {
          this.currFocusNode.fold();
          return
        }
        if (!this.currFocusNode.hasParent()) return;
        this.updateFocusNode(this.currFocusNode.getParentNode());
        break;
      case 38: // Up
        // Move to upper item
        break;
      case 39: // Right
        if (!this.currFocusNode.isDir()) return;
        if (!this.currFocusNode.isExpanded) {
          this.currFocusNode.expand();
        } else if (this.currFocusNode.children.length > 0) {
          this.updateFocusNode(this.currFocusNode.children[0])
        }
        break;
      case 40: // Down
        if (this.currFocusNode.isDir()
          && this.currFocusNode.isExpanded
          && this.currFocusNode.children.length > 0) {
          // first child
          this.updateFocusNode(this.currFocusNode.children[0])
        } else {
          // next sibling
        }
        break
    }
  }

  private updateFocusNode(next:TreeNode) {
    if (this.currFocusNode) {
      this.currFocusNode.blur()
    }
    this.currFocusNode = next;
    this.currFocusNode.focus()
  }
}
