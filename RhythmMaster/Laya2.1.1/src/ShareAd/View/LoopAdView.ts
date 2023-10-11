import Share_myqq_Ad from "../ShareAd";
import Loop_myqq_AdBox from "./LoopAdBox";

export default class Loop_myqq_AdView extends Laya.Script {
    public AdPosID: number = Share_myqq_Ad.LoopAdLocationID;
    protected _list: Laya.List;
    protected _scrollForward = true;

    onAwake()  {
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.on_myqq_ListRender, null, false)
        this._list.vScrollBarSkin = "";
    }

    onEnable(): void {
        var self = this;
        Share_myqq_Ad.get_myqq_ADVs(this.AdPosID, (datas) => {
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

    protected on_myqq_ListRender(cell: Laya.Box, index: number): void {
        var data = this._list.array[index];
        var loopAdBox: Loop_myqq_AdBox = cell.getComponent(Loop_myqq_AdBox);
        loopAdBox.set_myqq_Data(data);
    }
}