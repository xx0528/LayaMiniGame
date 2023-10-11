import _wcjtn_ShareAd_wcjtn_ from "../ShareAd";
import LoopAd_wcjtn_Box from "./LoopAdBox";

export default class Loop_wcjtn_Ad_wcjtn_View extends Laya.Script {
    public Ad_wcjtn_Pos_wcjtn_ID: number = _wcjtn_ShareAd_wcjtn_.LoopAd_wcjtn_LocationID;
    protected _list_wcjtn_: Laya.List;
    protected _scroll_wcjtn_Forward = true;

    onAwake()  {
        this._list_wcjtn_ = this.owner.getChildByName("List") as Laya.List;
        this._list_wcjtn_.renderHandler = Laya.Handler.create(this, this.on_wcjtn_List_wcjtn_Render, null, false)
        this._list_wcjtn_.vScrollBarSkin = "";
    }

    onEnable(): void {
        var self = this;
        _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID, (datas) => {
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

                    this._list_wcjtn_.array = temp
                        ;
                }
                else {
                    this._list_wcjtn_.array = datas;
                    (this.owner as Laya.Sprite).visible = false;
                }
            }
        })
    }

    onDisable(): void {

    }

    onUpdate()  {
        if (this._scroll_wcjtn_Forward)  {
            this._list_wcjtn_.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this._list_wcjtn_.scrollBar.value >= this._list_wcjtn_.scrollBar.max)  {
                this._scroll_wcjtn_Forward = false;
            }
        }
        else  {
            this._list_wcjtn_.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this._list_wcjtn_.scrollBar.value <= 0)  {
                this._scroll_wcjtn_Forward = true;
            }
        }
    }

    protected on_wcjtn_List_wcjtn_Render(cell: Laya.Box, index: number): void {
        var data = this._list_wcjtn_.array[index];
        var loopAdBox: LoopAd_wcjtn_Box = cell.getComponent(LoopAd_wcjtn_Box);
        loopAdBox.set_wcjtn_Data(data);
    }
}