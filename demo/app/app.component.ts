import { Component } from '@angular/core';
import { DirectoryTreeComponent } from 'ng2-directory-tree';

const TEMPLATE=`
<h1>My First Angular 2 App</h1>

<div style="float: left; width: 50%">
    <directory-tree [directory]="dir"
                    (onChange)="updateData($event)"
                    [keyboardWatch]=true>
    </directory-tree>
</div>
<div style="float: right; width: 50%">
    {{ data }}
</div>


`

@Component({
    selector: 'my-app',
    template: TEMPLATE,
    directives: [DirectoryTreeComponent]
})
export class AppComponent {
    data = null

    dir = {
        "name": "photos",
        "children": [
            {
                "name": "summer",
                "children": [
                    {
                        "name": "june",
                        "children": [
                            { "name": "abc.jpg" },
                            { "name": "def.jpg" },
                            { "name": "test.jpg" },
                            { "name": "test2.jpg" },
                            { "name": "zzzz.jpg" },
                        ]
                    }
                ]
            },
            { "name": "global.jpg" },
        ]
    }


    updateData(node) {
        console.log(node)
        this.data = node.stringify()
    }
}
