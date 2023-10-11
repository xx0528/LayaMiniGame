import ryw_KRQ_ComBase from "../KRQ_ComBase";
import ryw_KRQ_LoopAdBox from "./KRQ_LoopAdBox";
import ryw_ShareAd from "../../../ShareAd/ShareAd";

export default class ryw_KRQ_HLoopAd extends ryw_KRQ_ComBase 
{
    public get ryw_Clip()
    {
        return this.owner as Laya.Clip;
    }

    public ryw_isEnable : boolean = true;
    public ryw_useMovePause : boolean = true;
    public ryw_useLocalRandom : boolean = false;
    public ryw_useRandom : boolean = false;
    public ryw_sortDatas : Function = null;

    protected ryw__list: Laya.List;
    protected ryw__scrollForward = true;
    protected readonly ryw__cellSize : Laya.Point = new Laya.Point();

    onAwake()  {
        this.ryw_AdPosID = ryw_ShareAd.ryw_LoopAdLocationID;
        
        this.ryw__list = this.owner.getChildByName("List") as Laya.List;
        this.ryw__list.renderHandler = Laya.Handler.create(this, this.ryw_onListRender, null, false)
        this.ryw__list.hScrollBarSkin = "";
    }
    
    public onStart() 
    {
        let self = this;
        this.ryw__list.width = self.ryw_Clip.width;
        this.ryw__list.height = self.ryw_Clip.height;
        self.ryw_refresh(()=>
        {
            if(null != self.ryw__list.cells && self.ryw__list.cells.length > 0)
            {
                let box = self.ryw__list.cells[0] as Laya.Box;
                self.ryw__cellSize.x = box.width;
                self.ryw__cellSize.y = box.height;
                if(self.ryw_useMovePause)
                {
                    setTimeout(() => {
                        if (self.ryw__list.scrollBar) {
                            self.ryw__list.scrollBar.value = 0
                            self.ryw_move()
                        }
                    }, 2000);                
                }
            }
        })
    }

    public ryw_refresh(onComplate? : Function)
    {
        if(!this.ryw_isEnable)
        {
            if(null != onComplate)
            {
                onComplate();
            }
            return;
        }
        let self = this;
        ryw_ShareAd.ryw_getADVs(this.ryw_AdPosID,(datas)=>
        {
            if(null != datas && datas.length > 0)
            {
                self.ryw__datas = datas;
                self.ryw__list.array = self.ryw__datas;
                if(null != self.ryw_Sprite && !self.ryw_Sprite.destroyed)
                {
                    self.ryw_Sprite.visible = true;
                }
                if(null != onComplate)
                {
                    onComplate();
                }
            }
            else
            {
                if(null != self.ryw_Sprite && !self.ryw_Sprite.destroyed)
                {
                    self.ryw_Sprite.visible = false;
                }
            }
        },this.ryw_useRandom,this.ryw_useLocalRandom,this.ryw_sortDatas)
    }

    protected ryw_onListRender(cell: Laya.Box, index: number): void {
        var data = this.ryw__list.array[index];
        var loopAdBox : ryw_KRQ_LoopAdBox = cell.getComponent(ryw_KRQ_LoopAdBox);
        loopAdBox.ryw_setData(data);
    }

    protected ryw_move() {
        let tonum = this.ryw__cellSize.x + this.ryw__list.spaceX;
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
            Laya.timer.once(1010, self, () => {
                if (self.ryw__list.scrollBar.value >= self.ryw__list.scrollBar.max) {
                    self.ryw__scrollForward = false;
                } else if (self.ryw__list.scrollBar.value <= 0) {
                    self.ryw__scrollForward = true;
                }
                Laya.timer.once(3000, self, () => {
                    if (self.ryw__list.scrollBar) {
                        self.ryw_move()
                    }
                });
            })
        }
    }


    onUpdate()  {
        if(this.ryw_useMovePause)
            return;
        if (this.ryw__scrollForward)  {
            this.ryw__list.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this.ryw__list.scrollBar.value >= this.ryw__list.scrollBar.max)  {
                this.ryw__scrollForward = false;
            }
        }
        else  {
            this.ryw__list.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this.ryw__list.scrollBar.value <= 0)  {
                this.ryw__scrollForward = true;
            }
        }
    }


} 