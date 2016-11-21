# Angular2 File Tree [![CircleCI](https://circleci.com/gh/travelist/ng2-file-tree.svg?style=svg)](https://circleci.com/gh/travelist/ng2-file-tree)

Angular2 Component for rendering directory tree

<img src="https://raw.githubusercontent.com/travelist/ng2-directory-tree/master/demo/demo.gif" height="240px">
(Demo with mouse clicks and keyboard shortcuts)

Please feel free to open issues for new features, requirements, and bug reports. This repository is developing based on requests;)

## Installation

In `package.json`, add following lines in the `dependencies` block:

```
"font-awesome": "~4.7.0"  # Use any versions
"ng2-file-tree": "~0.4.0"
```

### [Angular2 QuickStart](https://angular.io/docs/ts/latest/quickstart.html)

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
```

We can import this library using SystemJS (`systemjs.config.js`):

```javascript
// This example is following to Angular2 Quick Start Documentation

(function (global) {
  System.config({
    paths: {
      'npm:': 'node_modules/'
    },
    map: {
      app: 'app',

      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',

      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',

      // Add this line (1/2)
      'ng2-file-tree': 'node_modules/ng2-file-tree',
    },
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },

      // Add this line (2/2)
      'ng2-file-tree': { defaultExtension: 'js' }
    }
  });
})(this);

```

### [Angular CLI](https://github.com/angular/angular-cli)

1. `../node_modules/font-awesome/css/font-awesome.css` to **style** block of *angular-cli.json*.
2. `../node_modules/font-awesome/fonts/*.+(otf|eot|svg|ttf|woff|woff2)` to **addons** block of *angular-cli.json*.

```json
/* angular-cli.json  */
{
  "apps": [
    {
      "styles": [
        "../node_modules/font-awesome/css/font-awesome.css"
      ]
    }
  ],
  "addons": [
    "../node_modules/font-awesome/fonts/*.+(otf|eot|svg|ttf|woff|woff2)"
  ]
}
```

## Usage

```javascript
// app/app.module.ts

// (1/2)
import { Ng2FileTreeModule } from 'ng2-file-tree/ng2-file-tree'

@NgModule({
  imports: [ BrowserModule, Ng2FileTreeModule ], // (2/2)
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```



```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<file-tree [tree]="fileTree"
                          (onChange)="logging($event)"
                          [keyboardWatch]=true>
               </file-tree>`
})
export class AppComponent {
    fileTree = {
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
