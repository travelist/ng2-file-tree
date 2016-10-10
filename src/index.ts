import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DirectoryTreeComponent } from './directory-tree.component'
import { NodeComponent } from './node.component'

@NgModule({
    imports: [CommonModule],
    declarations: [DirectoryTreeComponent, NodeComponent],
    exports: [DirectoryTreeComponent, NodeComponent]
})
export class Ng2DirectoryTreeModule {}
