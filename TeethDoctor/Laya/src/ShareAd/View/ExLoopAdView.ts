import ShareAd from "../ShareAd";
import LoopAdBox from "./LoopAdBox";
import Shar_XYXZS_eAd from "../ShareAd";

export default class ExLoopAdView extends Laya.Script {
    /** @prop {name:LoopDirection,tips:"轮播广告方向",default:"Vertical",type:Option,option:"Vertical,Horizontal"}*/
    // 返回字符串
    public LoopDirection: String = "Vertical";
    /** @prop {name:int1,tips:"广告Id",default:"Insert_XYXZS_AdLocationID",type:Int} */
    public AdPosID: number = ShareAd.Insert_XYXZS_AdLocationID;
    protected _list: Laya.List;
    protected _scrollForward = true;
    private _ownerSp: Laya.Sprite;
    onAwake() {
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._ownerSp = this.owner as Laya.Sprite;
        if (this.LoopDirection == "Horizontal") {
            this._list.hScrollBarSkin = "";
        }
        else {
            this._list.vScrollBarSkin = "";
        }
    }

    onEnable(): void {
        var self = this;
        Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdPosID, (datas) => {
            if (self.owner && !self.owner.destroyed) {
                if (datas) {
                    this._list.array = datas;
                }
                else {
                    this._ownerSp.visible = false;
                }
            }
        }, false, true, true);
    }

    onDisable(): void {

    }

    onUpdate() {
        if (this._scrollForward) {
            this._list.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this._list.scrollBar.value >= this._list.scrollBar.max) {
                this._scrollForward = false;
            }
        }
        else {
            this._list.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this._list.scrollBar.value <= 0) {
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