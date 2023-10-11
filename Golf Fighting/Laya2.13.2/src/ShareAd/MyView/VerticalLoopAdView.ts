import HorizontalLoopAdView from "../View/HorizontalLoopAdView";

export default class VerticalLoopAdView extends HorizontalLoopAdView {
    
    constructor() { super(); }
    
    onAwake()  {
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._list.vScrollBarSkin = "";
    }
}