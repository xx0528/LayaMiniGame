import ShareAd from "../HyShareAd";
import HyLoopAdBox from "./HyLoopAdBox";

export default class HyHorizontalLoopAdView extends Laya.Script 
{
    public Adv_key : string = ShareAd.LoopAdAdv_key;
    protected _list : Laya.List;
    protected _scrollForward = true;

    onAwake()
    {
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._list.hScrollBarSkin = "";
    }
    
    onEnable(): void 
    {
        var self = this;
        ShareAd.get_myqq_ADVs(this.Adv_key,(datas)=>
        {
            if(datas && datas.length > 0 && datas.length < 50)
            {
                var temp = []
                var counter = 0;
                for(var i=0;i < 50;++i)
                {
                    if(counter >= datas.length)
                    {
                        counter = 0;
                    }
                    temp.push(datas[counter]);
                    ++counter;
                }
                this._list.array = temp;
            }
            else{
                this._list.array = datas;
            }
        })
    }

    onDisable(): void 
    {

    }

    onUpdate()
    {
        if(this._scrollForward)
        {
            this._list.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if(this._list.scrollBar.value >= this._list.scrollBar.max)
            {
                this._scrollForward = false;
            }
        }
        else
        {
            this._list.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if(this._list.scrollBar.value <= 0)
            {
                this._scrollForward = true;
            }
        }
    }

    protected onListRender (cell: Laya.Box, index: number): void 
    {
        var data = this._list.array[index];
        var loopAdBox : HyLoopAdBox = cell.getComponent(HyLoopAdBox);
        loopAdBox.setData(data);
    }
}