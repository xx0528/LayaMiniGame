import Shar_JJKLBB_eAd from "../ShareAd";
import LoopA_JJKLBB_dBox from "./LoopAdBox";

export default class ExLoopAdView extends Laya.Script {
    /** @prop {name:LoopDirection,tips:"轮播广告方向",default:"Vertical",type:Option,option:"Vertical,Horizontal"}*/
    // 返回字符串
    public LoopDirection: String = "Vertical";
    /** @prop {name:AdPosID,tips:"广告Id",default:"InsertAdLocationID",type:Int} */
    public AdPosID: number = Shar_JJKLBB_eAd.Insert_JJKLBB_AdLocationID;
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
        Shar_JJKLBB_eAd.get_JJKLBB_ADVs(this.AdPosID, (datas) => {
            if (self.owner && !self.owner.destroyed) {
                if (datas) {
                    this._list.array = datas;
                }
                else {
                    this._ownerSp.visible = false;
                }
            }
        }, false, true, this.sortDatas);
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
    protected sortDatas(datas: any): any {
        if (null == datas || 0 == datas.length)
            return [];
        let dataDic: { [appid: string]: any[] } = {};
        let keys = new Array<string>();
        for (let i = 0; i < datas.length; ++i) {
            let data = datas[i];
            if (dataDic[data.appid] == null) {
                dataDic[data.appid] = new Array();
                dataDic[data.appid].push(data);
                keys.push(data.appid);
            } else {
                dataDic[data.appid].push(data);
            }
        }
        for (let i = 0; i < keys.length; ++i) {
            let key = keys[i];
            let randomIndex = Math.floor(Math.random() * keys.length);
            let temp = keys[randomIndex];
            keys[randomIndex] = key;
            keys[i] = temp;
        }
        for (let i = 0; i < keys.length; ++i) {
            let key = keys[i];
            let dataArray = dataDic[key];
            for (let j = 0; j < dataArray.length; ++j) {
                let data = dataArray[j];
                let randomIndex = Math.floor(Math.random() * dataArray.length);
                let temp = dataArray[randomIndex];
                dataArray[randomIndex] = data;
                dataArray[j] = temp;
            }
        }
        let res = new Array<any>();
        let ignores = [];
        while (keys.length > 0) {
            let isComplate = true;
            for (let i = 0; i < keys.length; ++i) {
                let key = keys[i];
                let isOk = true;
                for (let j = 0; j < ignores.length; ++j) {
                    let ignore = ignores[j];
                    if (ignore == key) {
                        isOk = false;
                        break;
                    }
                }
                if (isOk) {
                    isComplate = false;
                    let data = dataDic[key].shift();
                    res.push(data);
                    ignores.push(key);
                    if (ignores.length > 3) {
                        ignores.shift();
                    }
                    if (dataDic[key].length <= 0) {
                        keys.splice(i, 1);
                        --i;
                        continue;
                    }
                }
                else {
                    continue;
                }
            }
            if (isComplate) {
                for (let j = 0; j < keys.length; ++j) {
                    let key = keys[j];
                    let isOk = true;
                    let dataArray = dataDic[key];
                    ignores.splice(0);
                    for (let h = 0; h < dataArray.length; ++h) {
                        let data = dataArray[h];
                        for (let i = 0; i < res.length; ++i) {
                            ignores.push(null == res[i - 2] ? null : res[i - 2].appid);
                            ignores.push(null == res[i - 1] ? null : res[i - 1].appid);
                            ignores.push(null == res[i] ? null : res[i].appid);
                            ignores.push(null == res[i + 1] ? null : res[i + 1].appid);
                            ignores.push(null == res[i + 2] ? null : res[i + 1].appid);
                            for (let k = 0; k < ignores.length; ++k) {
                                let ignore = ignores[k];
                                if (null != ignore && ignore == key) {
                                    isOk = false;
                                    break;
                                }
                            }
                            if (isOk) {
                                if (null != data) {
                                    let f = res.slice(0, i + 1);
                                    let b = res.slice(i + 1, res.length);
                                    res = f;
                                    res.push(data);
                                    for (let a = 0; a < b.length; ++a) {
                                        res.push(b[a]);
                                    }
                                }
                            }
                        }
                    }

                }
                break;
            }
            for (let i = 0; i < keys.length; ++i) {
                let key = keys[i];
                let randomIndex = Math.floor(Math.random() * keys.length);
                let temp = keys[randomIndex];
                keys[randomIndex] = key;
                keys[i] = temp;
            }
        }
        return res;
    }
    protected onListRender(cell: Laya.Box, index: number): void {
        var data = this._list.array[index];
        var loopAdBox: LoopA_JJKLBB_dBox = cell.getComponent(LoopA_JJKLBB_dBox);
        loopAdBox.setData(data);
    }
}