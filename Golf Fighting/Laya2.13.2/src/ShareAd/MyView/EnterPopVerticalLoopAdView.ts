import Share_sdlyg_Ad from "../ShareAd";
import LoopAdBox from "../View/LoopAdBox";


export default class VerticalLoopAdView extends Laya.Script {
    public AdPosID: number = Share_sdlyg_Ad.InsertAdLocationID;
    protected _list: Laya.List;
    protected _scrollForward = true;

    onAwake()  {
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._list.vScrollBarSkin = "";
    }

    onEnable(): void {
        var self = this;
        Share_sdlyg_Ad.getADVs(this.AdPosID, (datas) =>  {
            if(datas!=null)datas.sort(function () { return Math.random() - 0.5; });            
            if (self.owner && !self.owner.destroyed)  {
                if (datas && datas.length > 0 && datas.length < 50)  {
                    var temp = []
                    var counter = 0;
                    for (var i = 0; i < 50; ++i)  {
                        if (counter >= datas.length)  {
                            counter = 0;
                        }
                        temp.push(datas[counter]);
                        ++counter;
                    }
                    this._list.array = temp;
                }
                else {
                    this._list.array = datas;
                }
            }
        })
    }

    onDisable(): void {

    }

    onUpdate()  {

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

    protected onListRender(cell: Laya.Box, index: number): void {
        var data = this._list.array[index];
        var loopAdBox: LoopAdBox = cell.getComponent(LoopAdBox);
        loopAdBox.setData(data);
    }

    RefreshAD(){
        this._list.scrollBar.value += Math.random()*100;
    }
}