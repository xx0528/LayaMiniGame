import KRQ_HL_XYXZS_oopAd from "./KRQ_HLoopAd";

export default class KRQ_VL_XYXZS_oopAd extends KRQ_HL_XYXZS_oopAd
{

    onAwake()  {
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._list.vScrollBarSkin = "";
    }

    protected move() {
        let tonum = this._cellSize.y + this._list.spaceY;
        let left = 0;
        if (!this._scrollForward) 
        {
            tonum *= -1;
            left = (this._list.scrollBar.max - this._list.scrollBar.value) % tonum * -1;
        }
        else
        {
            left = this._list.scrollBar.value % tonum;
        }
        if (this._list.scrollBar) {
            this._list.scrollBar.stopScroll();
            let scrollDelta = tonum;
            if(0 != left)
            {
                scrollDelta =  2 * tonum - left;
            }
            let self = this;
            Laya.Tween.to(self._list.scrollBar, { value: self._list.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self, () => {

            }))
            Laya.timer.once(1010,self,() => {
                if (self._list.scrollBar.value >= self._list.scrollBar.max) {
                    self._scrollForward = false;
                } else if (self._list.scrollBar.value <= 0) {
                    self._scrollForward = true;
                }
                Laya.timer.once(3000,self,() => {
                    if (self._list.scrollBar) {
                        self.move()
                    }
                });
            });
        }
    }
}