import KRQ__wcjtn_Com_wcjtn_Base from "../KRQ_ComBase";
import KRQ_wcjtn__Loop_wcjtn_Ad_wcjtn_Box from "./KRQ_LoopAdBox";
import _wcjtn_ShareAd_wcjtn_ from "../../../ShareAd/ShareAd";

export default class KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad extends KRQ__wcjtn_Com_wcjtn_Base 
{
    public get _wcjtn_Clip_wcjtn_()
    {
        return this.owner as Laya.Clip;
    }

    protected _wcjtn__list_wcjtn_: Laya.List;
    protected _scroll_wcjtn_Forward = true;
    protected readonly _cell_wcjtn_Size : Laya.Point = new Laya.Point();
    public isEnable : boolean = true;
    public useMovePause : boolean = true;
    public use_wcjtn_Local_wcjtn_Random : boolean = true;
    public use_wcjtn_Random : boolean = true;
    public sort_wcjtn_Datas : Function = null;
    
    onAwake()  {
        this.Ad_wcjtn_Pos_wcjtn_ID = _wcjtn_ShareAd_wcjtn_.LoopAd_wcjtn_LocationID;
        
        this._wcjtn__list_wcjtn_ = this.owner.getChildByName("List") as Laya.List;
        this._wcjtn__list_wcjtn_.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._wcjtn__list_wcjtn_.hScrollBarSkin = "";
    }
    
    public onStart() 
    {
        let self = this;
        this._wcjtn__list_wcjtn_.width = self._wcjtn_Clip_wcjtn_.width;
        this._wcjtn__list_wcjtn_.height = self._wcjtn_Clip_wcjtn_.height;
        self.ref_wcjtn_resh(() =>  {
            if (null != self._wcjtn__list_wcjtn_.cells && self._wcjtn__list_wcjtn_.cells.length > 0)  
            {
                let box = self._wcjtn__list_wcjtn_.cells[0] as Laya.Box;
                self._cell_wcjtn_Size.x = box.width;
                self._cell_wcjtn_Size.y = box.height;
                if (self.useMovePause)  
                {
                    setTimeout(() => 
                    {
                        if (self._wcjtn__list_wcjtn_.scrollBar) 
                        {
                            self._wcjtn__list_wcjtn_.scrollBar.value = 0
                            self.move()
                        }
                    }, 2000);
                }
            }
        })
    }

    public ref_wcjtn_resh(onComplate? : Function)
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
        _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID,(datas)=>
        {
            if(null != datas && datas.length > 0)
            {
                self._datas = datas;
                self._wcjtn__list_wcjtn_.array = self._datas;
                if(null != self._wcjtn_Sprite_wcjtn_ && !self._wcjtn_Sprite_wcjtn_.destroyed)
                {
                    self._wcjtn_Sprite_wcjtn_.visible = true;
                }
                if(null != onComplate)
                {
                    onComplate();
                }
            }
            else
            {
                if(null != self._wcjtn_Sprite_wcjtn_ && !self._wcjtn_Sprite_wcjtn_.destroyed)
                {
                    self._wcjtn_Sprite_wcjtn_.visible = false;
                }
            }
        },this.use_wcjtn_Random,this.use_wcjtn_Local_wcjtn_Random,this.sort_wcjtn_Datas)
    }

    protected onListRender(cell: Laya.Box, index: number): void {
        var data = this._wcjtn__list_wcjtn_.array[index];
        var loopAdBox : KRQ_wcjtn__Loop_wcjtn_Ad_wcjtn_Box = cell.getComponent(KRQ_wcjtn__Loop_wcjtn_Ad_wcjtn_Box);
        loopAdBox.set_wcjtn_Data(data);
    }

    protected move() {
        let tonum = this._cell_wcjtn_Size.x + this._wcjtn__list_wcjtn_.spaceX;
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
            Laya.timer.once(1010, self, () => {
                if (self._wcjtn__list_wcjtn_.scrollBar.value >= self._wcjtn__list_wcjtn_.scrollBar.max) {
                    self._scroll_wcjtn_Forward = false;
                } else if (self._wcjtn__list_wcjtn_.scrollBar.value <= 0) {
                    self._scroll_wcjtn_Forward = true;
                }
                Laya.timer.once(3000, self, () => {
                    if (self._wcjtn__list_wcjtn_.scrollBar) {
                        self.move()
                    }
                });
            })
        }
    }


    onUpdate()  {
        if(this.useMovePause)
            return;
        if (this._scroll_wcjtn_Forward)  {
            this._wcjtn__list_wcjtn_.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this._wcjtn__list_wcjtn_.scrollBar.value >= this._wcjtn__list_wcjtn_.scrollBar.max)  {
                this._scroll_wcjtn_Forward = false;
            }
        }
        else  {
            this._wcjtn__list_wcjtn_.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this._wcjtn__list_wcjtn_.scrollBar.value <= 0)  {
                this._scroll_wcjtn_Forward = true;
            }
        }
    }


} 