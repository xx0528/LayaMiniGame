import Share_sdlyg_Ad from "../ShareAd";
import HorizontalLoopAdView from "../View/HorizontalLoopAdView";
import MoreGameLoopAdBox from "./MoreGameLoopAdBox";

export default class OverDeriveLoopAdView extends HorizontalLoopAdView {

    constructor() { super(); }
    
    onAwake()  {
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._list.vScrollBarSkin = "";
    }

    onUpdate()  {
        if (this._scrollForward)  {
            this._list.scrollBar.value += 100 * Laya.timer.delta / 2500;
            if (this._list.scrollBar.value >= this._list.scrollBar.max)  {
                this._scrollForward = false;
            }
        }
        else  {
            this._list.scrollBar.value -= 100 * Laya.timer.delta / 2500;
            if (this._list.scrollBar.value <= 0)  {
                this._scrollForward = true;
            }
        }
    }
    
}