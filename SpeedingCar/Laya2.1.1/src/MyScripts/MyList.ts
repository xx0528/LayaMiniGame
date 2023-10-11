export default class MyList extends Laya.Script {
    
    private mLists:Laya.List;
    constructor() { super(); }
    
    onAwake(){
        this.mLists = this.owner as Laya.List;
        this.mLists.vScrollBarSkin = "";
    }
}