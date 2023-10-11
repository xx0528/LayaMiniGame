import HorizontalLoopAdView from "../View/HorizontalLoopAdView";

export default class VerticalSideADLoopView extends HorizontalLoopAdView {
    
    constructor() { super(); }
    
    
    onAwake()  {
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._list.vScrollBarSkin = "";
    }

    onUpdate()  {
        if (this._scrollForward)  {
            this._list.scrollBar.value += 100 * Laya.timer.delta / 1500;
            if (this._list.scrollBar.value >= this._list.scrollBar.max)  {
                this._scrollForward = false;
            }
        }
        else  {
            this._list.scrollBar.value -= 100 * Laya.timer.delta / 1500;
            if (this._list.scrollBar.value <= 0)  {
                this._scrollForward = true;
            }
        }
    }
}