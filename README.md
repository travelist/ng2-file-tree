# Ng2 File Tree [![CircleCI](https://circleci.com/gh/travelist/ng2-directory-tree.svg?style=svg&circle-token=c554ebe845b53a2e0db4bc4961ca1747c25168ea)](https://circleci.com/gh/travelist/ng2-directory-tree)

Angular2 Component for rendering directory tree

<img src="https://raw.githubusercontent.com/travelist/ng2-directory-tree/master/demo/demo.gif" height="240px">
(Demo with mouse clicks and keyboard shortcuts)

Please feel free to open issues for new features, requirements, and bug reports. Will deal with them accordingly.


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
import { FileTreeComponent } from 'ng2-directory-tree'

@Component({
    selector: 'my-app',
    template: `<directory-tree [directory]="dir"
                               (onChange)="logging($event)"
                               [keyboardWatch]=true>
               </directory-tree>`,
    directives: [FileTreeComponent]
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
                  "name": "windsurf.jpg"
                }]
            }
          ]
        }
      ]
    }

    logging(node) {
        console.log(node)
    }
}

```

### Features

- [ ] Handling keyboard event
  - [x] Move by up-arrow, down-arrow
  - [ ] Move by up-arrow, down-arrow
- [ ] General icon support (now it's hard coded)
- [ ] Change icons by file type (`.jpg`, `.js`, ...)
- [ ] ....so forth

### Contribution

Any reporting issues, sending pull requests, or even pushing the star button are welcome and appreciated.
