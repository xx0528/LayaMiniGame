import KRQ_ppxhc_HLoopAd from "./KRQ_HLoopAd";
import Share_ppxhc_Ad from "../../../ShareAd/ShareAd";

export default class KRQ_VLoopAd extends KRQ_ppxhc_HLoopAd
{

    onAwake()  {
        this.AdPos_ppxhc_ID = Share_ppxhc_Ad.LoopAdLocationID_;
        this._ppxhc_list = this.owner.getChildByName("List") as Laya.List;
        this._ppxhc_list.renderHandler = Laya.Handler.create(this, this.onList_ppxhc_Render, null, false)
        this._ppxhc_list.vScrollBarSkin = "";
    }

    protected move() {
        let tonum = this._cell_ppxhc_Size.y + this._ppxhc_list.spaceY;
        let left = 0;
        if (!this._scroll_ppxhc_Forward) 
        {
            tonum *= -1;
            left = (this._ppxhc_list.scrollBar.max - this._ppxhc_list.scrollBar.value) % tonum * -1;
        }
        else
        {
            left = this._ppxhc_list.scrollBar.value % tonum;
        }
        if (this._ppxhc_list.scrollBar) {
            this._ppxhc_list.scrollBar.stopScroll();
            let scrollDelta = tonum;
            if(0 != left)
            {
                scrollDelta =  2 * tonum - left;
            }
            let self = this;
            Laya.Tween.to(self._ppxhc_list.scrollBar, { value: self._ppxhc_list.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self, () => {

            }))
            Laya.timer.once(1010,self,() => {
                if (self._ppxhc_list.scrollBar.value >= self._ppxhc_list.scrollBar.max) {
                    self._scroll_ppxhc_Forward = false;
                } else if (self._ppxhc_list.scrollBar.value <= 0) {
                    self._scroll_ppxhc_Forward = true;
                }
                Laya.timer.once(3000,self,() => {
                    if (self._ppxhc_list.scrollBar) {
                        self.move()
                    }
                });
            });
        }
    }
}