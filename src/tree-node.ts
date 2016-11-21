export enum FileType {
  file,
  dir
}

export interface TreeNodeParams {
  name: string
  type?: FileType
  children?: Array<TreeNodeParams>
  focus?: boolean
}

export class TreeNode {
  public name:string;
  public type:FileType;
  public children:Array<TreeNode>;

  private _parentNode:TreeNode;
  private _isFocused:boolean;
  private _isExpanded:boolean;

  constructor(params:TreeNodeParams, parent:TreeNode = null) {
    this.name = params.name;
    this.type = params.type || FileType.file;
    this.children = [];

    if (typeof(params.children) !== 'undefined') {
      params.children.forEach(
        (fileNodeParams) => this.children.push(new TreeNode(fileNodeParams, this))
      );
    }

    // update private values
    this._parentNode = parent;
    this._isFocused = params.focus || false;
    this._isExpanded = this.type === FileType.dir || this.children.length > 0
  }

  public isDir():boolean {
    return this.type === FileType.dir ||
      this.children.length > 0;
  }


  public getParentNode():TreeNode {
    return this._parentNode
  }

  public isExpanded():boolean {
    return this._isExpanded
  }

  public expand():void {
    this._isExpanded = true
  }

  public fold():void {
    this._isExpanded = false
  }

  public hasParent():boolean {
    return this.getParentNode !== null
  }

  public focus():void {
    this._isFocused = true
  }

  public blur():void {
    this._isFocused = false
  }

  public stringify() {
    return JSON.stringify(this, (key:string, value:any) => {
      if (key.includes('_')) return;
      return value
    })
  }
}
