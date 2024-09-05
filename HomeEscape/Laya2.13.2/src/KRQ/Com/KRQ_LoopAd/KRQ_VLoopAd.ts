import ryw_KRQ_HLoopAd from "./KRQ_HLoopAd";
import ryw_ShareAd from "../../../ShareAd/ShareAd";

export default class ryw_KRQ_VLoopAd extends ryw_KRQ_HLoopAd
{

    onAwake()  {
        this.ryw_AdPosID = ryw_ShareAd.ryw_MoreGameLocationID;
        
        this.ryw__list = this.owner.getChildByName("List") as Laya.List;
        this.ryw__list.renderHandler = Laya.Handler.create(this, this.ryw_onListRender, null, false)
        this.ryw__list.vScrollBarSkin = "";
    }

    protected ryw_move() {
        let tonum = this.ryw__cellSize.y + this.ryw__list.spaceY;
        let left = 0;
        if (!this.ryw__scrollForward) 
        {
            tonum *= -1;
            left = (this.ryw__list.scrollBar.max - this.ryw__list.scrollBar.value) % tonum * -1;
        }
        else
        {
            left = this.ryw__list.scrollBar.value % tonum;
        }
        if (this.ryw__list.scrollBar) {
            this.ryw__list.scrollBar.stopScroll();
            let scrollDelta = tonum;
            if(0 != left)
            {
                scrollDelta =  2 * tonum - left;
            }
            let self = this;
            Laya.Tween.to(self.ryw__list.scrollBar, { value: self.ryw__list.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self, () => {

            }))
            Laya.timer.once(1010,self,() => {
                if (self.ryw__list.scrollBar.value >= self.ryw__list.scrollBar.max) {
                    self.ryw__scrollForward = false;
                } else if (self.ryw__list.scrollBar.value <= 0) {
                    self.ryw__scrollForward = true;
                }
                Laya.timer.once(3000,self,() => {
                    if (self.ryw__list.scrollBar) {
                        self.ryw_move()
                    }
                });
            });
        }
    }
}