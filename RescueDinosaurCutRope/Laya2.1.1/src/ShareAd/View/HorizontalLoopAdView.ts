import Shar_JJKLBB_eAd from "../ShareAd";
import LoopA_JJKLBB_dBox from "./LoopAdBox";

export default class Horizon_JJKLBB_talLoopAdView_JJKLBB_ extends Laya.Script {
    public AdPos_JJKLBB_ID: number = Shar_JJKLBB_eAd.LoopAd_JJKLBB_LocationID;
    protected _li_JJKLBB_st: Laya.List;
    protected _scrollFo_JJKLBB_rward = true;

    onAwake()  {
        this._li_JJKLBB_st = this.owner.getChildByName("List") as Laya.List;
        this._li_JJKLBB_st.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._li_JJKLBB_st.hScrollBarSkin = "";
    }

    onEnable(): void {
        var self = this;
        Shar_JJKLBB_eAd.get_JJKLBB_ADVs(this.AdPos_JJKLBB_ID, (datas) =>  {
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
                    
                    this._li_JJKLBB_st.array = temp;
                }
                else if(datas &&datas.length > 50){
                    this._li_JJKLBB_st.array = datas;
                }
                else {
                    this._li_JJKLBB_st.array = datas;
                    (this.owner as Laya.Sprite).visible=false;
                }
            }
        });
    }

    onDisable(): void {

    }

    onUpdate()  {
        if (this._scrollFo_JJKLBB_rward)  {
            this._li_JJKLBB_st.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this._li_JJKLBB_st.scrollBar.value >= this._li_JJKLBB_st.scrollBar.max)  {
                this._scrollFo_JJKLBB_rward = false;
            }
        }
        else  {
            this._li_JJKLBB_st.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this._li_JJKLBB_st.scrollBar.value <= 0)  {
                this._scrollFo_JJKLBB_rward = true;
            }
        }
    }

    protected onListRender(cell: Laya.Box, index: number): void {
        var data = this._li_JJKLBB_st.array[index];
        var loopAdBox: LoopA_JJKLBB_dBox = cell.getComponent(LoopA_JJKLBB_dBox);
        loopAdBox.setData(data);
    }
}