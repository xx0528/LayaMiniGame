import KRQ_ppxhc_ComBase from "../KRQ_ComBase";
import KRQ_ppxhc_LoopAdBox from "./KRQ_LoopAdBox";
import Share_ppxhc_Ad from "../../../ShareAd/ShareAd";

export default class KRQ_ppxhc_HLoopAd extends KRQ_ppxhc_ComBase 
{
    public get Clip()
    {
        return this.owner as Laya.Clip;
    }
    public isEnable : boolean = true;
    public useMovePause : boolean = true;
    public useLocalRandom : boolean = true;
    public useRandom : boolean = true;
    public sortDatas : Function = null;

    protected _ppxhc_list: Laya.List;
    protected _scroll_ppxhc_Forward = true;
    protected readonly _cell_ppxhc_Size : Laya.Point = new Laya.Point();

    onAwake()  {
        this.AdPos_ppxhc_ID = Share_ppxhc_Ad.LoopAdLocationID_;
        
        this._ppxhc_list = this.owner.getChildByName("List") as Laya.List;
        this._ppxhc_list.renderHandler = Laya.Handler.create(this, this.onList_ppxhc_Render, null, false)
        this._ppxhc_list.hScrollBarSkin = "";
    }
    
    public onStart() 
    {
        let self = this;
        this._ppxhc_list.width = self.Clip.width;
        this._ppxhc_list.height = self.Clip.height;
        self.refresh_ppxhc(()=>
        {

            if(null != self._ppxhc_list.cells && self._ppxhc_list.cells.length > 0)
            {
                let box = self._ppxhc_list.cells[0] as Laya.Box;
                self._cell_ppxhc_Size.x = box.width;
                self._cell_ppxhc_Size.y = box.height;
                if(self.useMovePause)
                {
                    setTimeout(() => {
                        if (self._ppxhc_list.scrollBar) {
                            self._ppxhc_list.scrollBar.value = 0
                            self.move()
                        }
                    }, 2000);                
                }
            }
        })
    }

    public refresh_ppxhc(onComplate? : Function)
    {
        if(!this.isEnable)
        {
            if(null != onComplate)
            {
                onComplate();
            }
            return;
        }
        let self = this;
        console.log("-------------------- this.AdPosID:",this.AdPos_ppxhc_ID)
        Share_ppxhc_Ad.getADVs_(this.AdPos_ppxhc_ID,(datas)=>
        {
            if(null != datas && datas.length > 0)
            {
                console.log("-------------------- datas:",datas)
                self._datas = datas;
                self._ppxhc_list.array = self._datas;
                if(null != self.Sprite && !self.Sprite.destroyed)
                {
                    self.Sprite.visible = true;
                }
                if(null != onComplate)
                {
                    onComplate();
                }
            }
            else
            {
                if(null != self.Sprite && !self.Sprite.destroyed)
                {
                    self.Sprite.visible = false;
                }
            }
        },this.useRandom,this.useLocalRandom,this.sortDatas);
    }

    protected onList_ppxhc_Render(cell: Laya.Box, index: number): void {
        var data = this._ppxhc_list.array[index];
        var loopAdBox : KRQ_ppxhc_LoopAdBox = cell.getComponent(KRQ_ppxhc_LoopAdBox);
        loopAdBox.set_ppxhc_Data(data);
    }

    protected move() {
        let tonum = this._cell_ppxhc_Size.x + this._ppxhc_list.spaceX;
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
            Laya.timer.once(1010, self, () => {
                if (self._ppxhc_list.scrollBar.value >= self._ppxhc_list.scrollBar.max) {
                    self._scroll_ppxhc_Forward = false;
                } else if (self._ppxhc_list.scrollBar.value <= 0) {
                    self._scroll_ppxhc_Forward = true;
                }
                Laya.timer.once(3000, self, () => {
                    if (self._ppxhc_list.scrollBar) {
                        self.move()
                    }
                });
            })
        }
    }


    onUpdate()  {
        if(this.useMovePause)
            return;
        if (this._scroll_ppxhc_Forward)  {
            this._ppxhc_list.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this._ppxhc_list.scrollBar.value >= this._ppxhc_list.scrollBar.max)  {
                this._scroll_ppxhc_Forward = false;
            }
        }
        else  {
            this._ppxhc_list.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this._ppxhc_list.scrollBar.value <= 0)  {
                this._scroll_ppxhc_Forward = true;
            }
        }
    }


} 