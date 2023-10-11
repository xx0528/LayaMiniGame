import Shar_JJKLBB_eAd from "../ShareAd";
import LoopA_JJKLBB_dBox from "./LoopAdBox";

export default class LoopA_JJKLBB_dView extends Laya.Script {
    public AdPo_JJKLBB_sID: number = Shar_JJKLBB_eAd.LoopAd_JJKLBB_LocationID;
    protected _li_JJKLBB_st: Laya.List;
    protected _scrollF_JJKLBB_orward = true;

    onAwake()  {
        this._li_JJKLBB_st = this.owner.getChildByName("List") as Laya.List;
        this._li_JJKLBB_st.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._li_JJKLBB_st.vScrollBarSkin = "";
    }

    onEnable(): void {
        var self = this;
        Shar_JJKLBB_eAd.get_JJKLBB_ADVs(this.AdPo_JJKLBB_sID, (datas) => {
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

                    this._li_JJKLBB_st.array = temp;
                }
                else if(datas &&datas.length > 50){
                    this._li_JJKLBB_st.array = datas;
                }
                else {
                    this._li_JJKLBB_st.array = datas;
                    (this.owner as Laya.Sprite).visible = false;
                }
            }
        });
    }

    onDisable(): void {

    }

    onUpdate()  {
        if (this._scrollF_JJKLBB_orward)  {
            this._li_JJKLBB_st.scrollBar.value += 100 * Laya.timer.delta / 1500;
            if (this._li_JJKLBB_st.scrollBar.value >= this._li_JJKLBB_st.scrollBar.max)  {
                this._scrollF_JJKLBB_orward = false;
            }
        }
        else  {
            this._li_JJKLBB_st.scrollBar.value -= 100 * Laya.timer.delta / 1500;
            if (this._li_JJKLBB_st.scrollBar.value <= 0)  {
                this._scrollF_JJKLBB_orward = true;
            }
        }
    }

    protected onListRender(cell: Laya.Box, index: number): void {
        var data = this._li_JJKLBB_st.array[index];
        var loopAdBox: LoopA_JJKLBB_dBox = cell.getComponent(LoopA_JJKLBB_dBox);
        loopAdBox.setData(data);
    }
}