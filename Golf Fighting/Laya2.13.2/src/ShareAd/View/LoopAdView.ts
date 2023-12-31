import Share_sdlyg_Ad from "../ShareAd";
import LoopAdBox from "./LoopAdBox";

export default class LoopAdView extends Laya.Script {
    public AdPosID: number = Share_sdlyg_Ad.LoopAdLocationID;
    protected _list: Laya.List;
    protected _scrollForward = true;

    onAwake()  {
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._list.vScrollBarSkin = "";
    }

    onEnable(): void {
        var self = this;
        Share_sdlyg_Ad.getADVs(this.AdPosID, (datas) => {
            if (self.owner && !this.owner.destroyed) {
                if (datas && datas.length > 0 && datas.length < 50) {
                    (this.owner as Laya.Sprite).visible = true;
                    var temp = []
                    var counter = 0;
                    for (var i = 0; i < 50; ++i) {
                        if (counter >= datas.length) {
                            counter = 0;
                        }
                        temp.push(datas[counter]);
                        ++counter;
                    }

                    var groupLen = datas.length;
                    for (var i = 0; i < temp.length; ++i) 
                    {
                        var group = Math.floor(i / groupLen);
                        var startIndex = group * groupLen;
                        var randomIndex = Math.floor(Math.random() * groupLen) + startIndex;
                        var curValue = temp[i];
                        var randomValue = temp[randomIndex];
                        temp[randomIndex] = curValue;
                        temp[i] = randomValue;
                    }

                    this._list.array = temp
                        ;
                }
                else {
                    this._list.array = datas;
                    (this.owner as Laya.Sprite).visible = false;
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
}