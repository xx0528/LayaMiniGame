import KRQ_ComBase from "../KRQ_ComBase";
import KRQ_Loo_XYXZS_pAdBox from "./KRQ_LoopAdBox";
import Shar_XYXZS_eAd from "../../../ShareAd/ShareAd";

export default class KRQ_HL_XYXZS_oopAd extends KRQ_ComBase 
{
    public get Clip()
    {
        return this.owner as Laya.Clip;
    }

    protected _list: Laya.List;
    protected _scrollForward = true;
    protected readonly _cellSize : Laya.Point = new Laya.Point();

    onAwake()  {
        this.AdP_XYXZS_osID = Shar_XYXZS_eAd.LoopA_XYXZS_dLocationID;
        
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._list.hScrollBarSkin = "";
    }
    
    public onStart() 
    {
        let self = this;
        this._list.width = self.Clip.width;
        this._list.height = self.Clip.height;
        self.refresh(()=>
        {
            let box = this._list.cells[0] as Laya.Box;
            self._cellSize.x = box.width;
            self._cellSize.y = box.height;
            setTimeout(() => {
                if (self._list.scrollBar) {
                    self._list.scrollBar.value = 0
                    self.move()
                }
            }, 2000);
        })
    }

    public refresh(onComplate? : Function)
    {
        let self = this;
        Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdP_XYXZS_osID,(datas)=>
        {
            if(null != datas)
            {
                self._da_XYXZS_tas = datas;
                self._list.array = self._da_XYXZS_tas;
                if(null != onComplate)
                {
                    onComplate();
                }
            }
        });
    }

    protected onListRender(cell: Laya.Box, index: number): void {
        var data = this._list.array[index];
        var loopAdBox : KRQ_Loo_XYXZS_pAdBox = cell.getComponent(KRQ_Loo_XYXZS_pAdBox);
        loopAdBox.set_XYXZS_Data(data);
    }

    protected move() {
        let tonum = this._cellSize.x + this._list.spaceX;
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
            Laya.timer.once(1010, self, () => {
                if (self._list.scrollBar.value >= self._list.scrollBar.max) {
                    self._scrollForward = false;
                } else if (self._list.scrollBar.value <= 0) {
                    self._scrollForward = true;
                }
                Laya.timer.once(3000, self, () => {
                    if (self._list.scrollBar) {
                        self.move()
                    }
                });
            })
        }
    }


} 