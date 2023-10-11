import ryw_ShareAd from "../ShareAd";
import ryw_LoopAdBox from "./LoopAdBox";

export default class ryw_HorizontalLoopAdView extends Laya.Script {
    public ryw_AdPosID: number = ryw_ShareAd.ryw_LoopAdLocationID;
    protected ryw__list: Laya.List;
    protected ryw__scrollForward = true;

    onAwake()  {
        this.ryw__list = this.owner.getChildByName("List") as Laya.List;
        this.ryw__list.renderHandler = Laya.Handler.create(this, this.ryw_onListRender, null, false)
        this.ryw__list.hScrollBarSkin = "";
    }

    onEnable(): void {
        var self = this;
        ryw_ShareAd.ryw_getADVs(this.ryw_AdPosID, (datas) =>  {
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
                    
                    this.ryw__list.array = temp;
                }
                else {
                    this.ryw__list.array = datas;
                }
            }
        })
    }

    onDisable(): void {

    }

    onUpdate()  {
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

    protected ryw_onListRender(cell: Laya.Box, index: number): void {
        var data = this.ryw__list.array[index];
        var loopAdBox: ryw_LoopAdBox = cell.getComponent(ryw_LoopAdBox);
        loopAdBox.ryw_setData(data);
    }
}