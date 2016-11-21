import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileTreeComponent } from './file-tree.component'
import { NodeComponent } from './node.component'

@NgModule({
  imports: [CommonModule],
  declarations: [FileTreeComponent, NodeComponent],
  exports: [FileTreeComponent, NodeComponent]
})
export class Ng2FileTreeModule {
}
