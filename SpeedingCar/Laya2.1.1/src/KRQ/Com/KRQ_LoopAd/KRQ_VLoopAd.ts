import KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad from "./KRQ_HLoopAd";
import _wcjtn_ShareAd_wcjtn_ from "../../../ShareAd/ShareAd";

export default class KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad extends KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad
{

    onAwake()  {
        this.Ad_wcjtn_Pos_wcjtn_ID = _wcjtn_ShareAd_wcjtn_.MoreGame_wcjtn_LocationID;

        this._wcjtn__list_wcjtn_ = this.owner.getChildByName("List") as Laya.List;
        this._wcjtn__list_wcjtn_.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._wcjtn__list_wcjtn_.vScrollBarSkin = "";
    }

    protected move() {
        let tonum = this._cell_wcjtn_Size.y + this._wcjtn__list_wcjtn_.spaceY;
        let left = 0;
        if (!this._scroll_wcjtn_Forward) 
        {
            tonum *= -1;
            left = (this._wcjtn__list_wcjtn_.scrollBar.max - this._wcjtn__list_wcjtn_.scrollBar.value) % tonum * -1;
        }
        else
        {
            left = this._wcjtn__list_wcjtn_.scrollBar.value % tonum;
        }
        if (this._wcjtn__list_wcjtn_.scrollBar) {
            this._wcjtn__list_wcjtn_.scrollBar.stopScroll();
            let scrollDelta = tonum;
            if(0 != left)
            {
                scrollDelta =  2 * tonum - left;
            }
            let self = this;
            Laya.Tween.to(self._wcjtn__list_wcjtn_.scrollBar, { value: self._wcjtn__list_wcjtn_.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self, () => {

            }))
            Laya.timer.once(1010,self,() => {
                if (self._wcjtn__list_wcjtn_.scrollBar.value >= self._wcjtn__list_wcjtn_.scrollBar.max) {
                    self._scroll_wcjtn_Forward = false;
                } else if (self._wcjtn__list_wcjtn_.scrollBar.value <= 0) {
                    self._scroll_wcjtn_Forward = true;
                }
                Laya.timer.once(3000,self,() => {
                    if (self._wcjtn__list_wcjtn_.scrollBar) {
                        self.move()
                    }
                });
            });
        }
    }
}