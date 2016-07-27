import {Component} from '@angular/core'
import {Input} from '@angular/core'
import {OnInit} from '@angular/core'

import {Node} from './node'

@Component({
    selector: 'node'
})
export class NodeComponent implements OnInit {
    @Input() item: Node
    folderOpened: boolean

    constructor(){}

    ngOnInit(){
        this.folderOpened = false
    }

    clickFolder(item: Node){
        this.folderOpened = !this.folderOpened

        console.log('click folder')
        console.log(item)

    }

    clickFile(item: Node){
        console.log('click file')
        console.log(item)
    }



}
