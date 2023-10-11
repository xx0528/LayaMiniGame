import Share_tippy_Ad from "../ShareAd";
import LoopAd_tippy_Box from "./LoopAdBox";

export default class LoopAd_tippy_View extends Laya.Script {
    public AdPosID: number = Share_tippy_Ad.LoopAdLocationID;
    protected _list: Laya.List;
    protected _scrollForward = true;

    onAwake()  {
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._list.vScrollBarSkin = "";
    }

    onEnable(): void {
        var self = this;
        Share_tippy_Ad.getADV_tippy_s(this.AdPosID, (datas) => {
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
                        window['nulad'] = false
                }
                else {
                    console.log("循环错误错误！！！！！！！！！！");
                    window['nulad'] = true
                    let p = self.owner.parent as Laya.Clip
                    this._list.array = datas;
                    (this.owner as Laya.Sprite).visible = false;
                    }
                    this._list.array = temp;
            }
            // else {
            //     console.log("循环错误错误！！！！！！！！！！");
            //     window['nulad'] = true
            //     let p = self.owner.parent as Laya.Clip
            //     this._list.array = datas;
            //     (this.owner as Laya.Sprite).visible = false;
            // }
        })
    //     if (LoopAd_tippy_View.datas == 1) {
    //         console.log("还没有等一下");
    //         setTimeout(() => {
    //             this.refreshADVDis()
    //         }, 500);
    //     } else if (LoopAd_tippy_View.datas) {
    //         // console.log("用之前的");
    //         func(LoopAd_tippy_View.datas)
    //     } else {
    //         console.log("第一个");
    //         LoopAd_tippy_View.datas = 1
    //         Share_tippy_Ad.getADV_tippy_s(this.AdPosID, func)
    //     }
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
        var loopAdBox: LoopAd_tippy_Box = cell.getComponent(LoopAd_tippy_Box);
        loopAdBox.set_tippy_Data(data);
    }
}