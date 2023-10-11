import Share_sdlyg_Ad from "../ShareAd";
import HorizontalLoopAdView from "../View/HorizontalLoopAdView";
import MoreGameLoopAdBox from "./MoreGameLoopAdBox";

export default class MoreGameLoopAdView extends HorizontalLoopAdView {

    constructor() { super(); }
    
    onAwake()  {
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._list.vScrollBarSkin = "";
    }

    onUpdate(){
        
    }

    

    protected onListRender(cell: Laya.Box, index: number): void {
        var data = this._list.array[index];
        var loopAdBox: MoreGameLoopAdBox = cell.getComponent(MoreGameLoopAdBox);
        loopAdBox.setData(data);
    }
}