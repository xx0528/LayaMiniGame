import Shar_XYXZS_eAd from "../ShareAd";
import Loop_XYXZS_AdBox from "./LoopAdBox";

export default class Horizont_XYXZS_alLoopAdView extends Laya.Script {
    public AdP_XYXZS_osID: number = Shar_XYXZS_eAd.LoopA_XYXZS_dLocationID;
    protected _l_XYXZS_ist: Laya.List;
    protected _scrol_XYXZS_lForward = true;

    onAwake()  {
        this._l_XYXZS_ist = this.owner.getChildByName("List") as Laya.List;
        this._l_XYXZS_ist.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._l_XYXZS_ist.hScrollBarSkin = "";
    }

    onEnable(): void {
        var self = this;
        Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdP_XYXZS_osID, (datas) =>  {
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
                    
                    this._l_XYXZS_ist.array = temp;
                }
                else {
                    this._l_XYXZS_ist.array = datas;
                }
            }
        })
    }

    onDisable(): void {

    }

    onUpdate()  {
        if (this._scrol_XYXZS_lForward)  {
            this._l_XYXZS_ist.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this._l_XYXZS_ist.scrollBar.value >= this._l_XYXZS_ist.scrollBar.max)  {
                this._scrol_XYXZS_lForward = false;
            }
        }
        else  {
            this._l_XYXZS_ist.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this._l_XYXZS_ist.scrollBar.value <= 0)  {
                this._scrol_XYXZS_lForward = true;
            }
        }
    }

    protected onListRender(cell: Laya.Box, index: number): void {
        var data = this._l_XYXZS_ist.array[index];
        var loopAdBox: Loop_XYXZS_AdBox = cell.getComponent(Loop_XYXZS_AdBox);
        loopAdBox.setData(data);
    }
}