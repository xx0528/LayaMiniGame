import KRQ_ComBase from "../KRQ_ComBase";
import KRQ_LoopAdBox from "./KRQ_LoopAdBox";
import ShareAd from "../../../ShareAd/ShareAd";

export default class KRQ_HLoopAd extends KRQ_ComBase 
{
    public get Clip()
    {
        return this.owner as Laya.Clip;
    }

    public isEnable : boolean = true;
    public useMovePause : boolean = true;
    public useLocalRandom : boolean = false;
    public useRandom : boolean = false;
    public sortDatas : Function = null;

    protected _list: Laya.List;
    protected _scrollForward = true;
    protected readonly _cellSize : Laya.Point = new Laya.Point();

    onAwake()  {
        this.AdPosID = ShareAd.LoopAdLocationID;
        
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
            if(null != self._list.cells && self._list.cells.length > 0)
            {
                let box = self._list.cells[0] as Laya.Box;
                self._cellSize.x = box.width;
                self._cellSize.y = box.height;
                if(self.useMovePause)
                {
                    setTimeout(() => {
                        if (self._list.scrollBar) {
                            self._list.scrollBar.value = 0
                            self.move()
                        }
                    }, 2000);                
                }
            }
        })
    }

    public refresh(onComplate? : Function)
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
        ShareAd.getADVs(this.AdPosID,(datas)=>
        {
            if(null != datas && datas.length > 0)
            {
                self._datas = datas;
                self._list.array = self._datas;
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

    protected onListRender(cell: Laya.Box, index: number): void {
        var data = this._list.array[index];
        var loopAdBox : KRQ_LoopAdBox = cell.getComponent(KRQ_LoopAdBox);
        loopAdBox.setData(data);
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


    onUpdate()  {
        if(this.useMovePause)
            return;
        if (this._scrollForward)  {
            this._list.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this._list.scrollBar.value >= this._list.scrollBar.max)  {
                this._scrollForward = false;
            }
        }
        else  {
            this._list.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this._list.scrollBar.value <= 0)  {
                this._scrollForward = true;
            }
        }
    }


} 