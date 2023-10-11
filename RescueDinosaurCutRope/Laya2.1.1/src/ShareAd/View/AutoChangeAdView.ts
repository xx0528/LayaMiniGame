import Shar_JJKLBB_eAd from "../ShareAd";
import LoopA_YZFC_dBox from "./LoopAdBox";

export default class AutoChangeAdView extends Laya.Script {
    public AdPosID: number = Shar_JJKLBB_eAd.LoopAd_JJKLBB_LocationID;
    public ShakeTime: number = 1000;
    public ChaneAdTime: number = 3000;
    public RotaAngel: number = 10;
    public Scale: number = 0.1;
    protected _list: Laya.List;
    protected _cells: Array<Laya.UIComponent>;
    protected _shakeTimer: number = 0;
    protected _changeAdTimer: number = 0;;
    protected _shakeIndex: number = 0;
    onAwake() {
        this._list = this.owner.getChildByName("List") as Laya.List;
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false)
        this._cells = this._list.cells;
        // this._list.hScrollBarSkin = "";
    }

    onEnable(): void {
        this.GetAdData();
    }

    onDisable(): void {

    }

    onUpdate() {
        if (this._changeAdTimer <= this.ChaneAdTime) {
            this._changeAdTimer += Laya.timer.delta;
        }
        // if (this._shakeTimer <= this.ShakeTime) {
        //     this._shakeTimer += Laya.timer.delta;
        //     let box = this._cells[this._shakeIndex];
        //     let period = this._shakeTimer / this.ShakeTime;
        //     let aniPeriod = 0;
        //     if (period >= 0 && period < 0.2) {
        //         aniPeriod = (period / 0.2);
        //     }
        //     else if (period >= 0.2 && period < 0.4) {
        //         aniPeriod = 1 - ((period - 0.2) / 0.2);
        //     }
        //     else if (period >= 0.4 && period < 0.6) {
        //         aniPeriod = -1 * ((period - 0.4) / 0.2);
        //     }
        //     else if (period >= 0.6 && period < 0.8) {
        //         aniPeriod = -1 + ((period - 0.6) / 0.2);
        //     }
        //     else {
        //         aniPeriod = 0;
        //     }
        //     box.rotation = aniPeriod * this.RotaAngel;
        //     box.scaleX = 1 - (aniPeriod * this.Scale);
        //     box.scaleY = box.scaleX;
        // }
        else {
            this._changeAdTimer = 0;
            this.GetAdData();
        }
    }
    protected onListRender(cell: Laya.Box, index: number): void {
        var data = this._list.array[index];
        var loopAdBox: LoopA_YZFC_dBox = cell.getComponent(LoopA_YZFC_dBox);
        loopAdBox.setData(data);
    }

    ShakeAni() {

    }

    GetAdData() {
        Shar_JJKLBB_eAd.get_JJKLBB_ADVs(this.AdPosID, (datas) => {
            if (this.owner && !this.owner.destroyed) {
                if (datas && datas.length > 0 && datas.length < 50) {
                    var temp = [];
                    datas.sort(() => { return 1 - Math.random() })
                    for (var i = 0; i < datas.length; ++i) {
                        let repeat = false;
                        for (let index = 0; index < temp.length; index++) {
                            const element = temp[index];
                            if (element.appid == datas[i]) {
                                repeat = true;
                                break;
                            }
                        }
                        if (!repeat) {
                            temp.push(datas[i]);
                        }
                    }
                    temp.sort(() => { return 1 - Math.random() })
                    this._list.array = temp;
                }
                else {
                    this._list.array = datas;
                    (this.owner as Laya.Sprite).visible = false;
                }
            }
        }, true, true);
    }
}