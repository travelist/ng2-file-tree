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

  // Full file path from root node
  private fullFilepath: string;

  // Parent Node
  private parentNode:TreeNode;

  private _isFocused:boolean;
  private _isExpanded:boolean;

  constructor(params:TreeNodeParams, parent:TreeNode = null) {
    this.name = params.name;
    this.type = params.type || FileType.file;
    this.children = [];

    // update private values
    this.parentNode = parent;
    this._isFocused = params.focus || false;
    this._isExpanded = this.type === FileType.dir || this.children.length > 0;

    if (parent !== null) {
      let parentPath:string = this.parentNode.getFullPath();
      if (parentPath.slice(-1) === '/') {
        this.fullFilepath = `${parentPath}${this.name}`;
      } else {
        this.fullFilepath = `${parentPath}/${this.name}`;
      }
    } else {
      this.fullFilepath = this.name;
    }

    if (typeof(params.children) !== 'undefined' && params.children !== null) {
      params.children.forEach(
        (fileNodeParams) => this.children.push(new TreeNode(fileNodeParams, this))
      );
    }
  }

  getFullPath():string {
    return this.fullFilepath;
  }

  public isDir():boolean {
    return this.type === FileType.dir ||
      this.children.length > 0;
  }


  public getParentNode():TreeNode {
    return this.parentNode
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
