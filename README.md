# ng2-directory-tree

### Usage

```
"ng2-directory-tree": "*"
```

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
```

```javascript
// systemjs.config.js

var map = {
  ...

  'ng2-directory-tree': 'node_modules/ng2-directory-tree'
};

var packages = {
  ...

  'ng2-directory-tree': { main: 'ng2-directory-tree', defaultExtension: 'js' }
};

```


```javascript
import { Component } from '@angular/core';
import { DirectoryTreeComponent } from 'ng2-directory-tree'

@Component({
    selector: 'my-app',
    template: `<directory-tree [directory]="dir"></directory-tree>`,
    directives: [DirectoryTreeComponent]
})
export class AppComponent {
    dir = {
      "name": "photos",
      "children": [
        {
          "name": "summer",
          "children": [
            {
              "name": "june",
              "children": [
                {
                  "name": "windsurf.jpg",
                }]
            }
          ]
        }
      ]
    }
}

```
