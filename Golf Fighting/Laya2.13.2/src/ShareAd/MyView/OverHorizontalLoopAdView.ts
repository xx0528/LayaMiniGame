import HorizontalLoopAdView from "../View/HorizontalLoopAdView";

export default class OverHorizontalLoopAdView extends HorizontalLoopAdView {

    
    constructor() { super(); }
    
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