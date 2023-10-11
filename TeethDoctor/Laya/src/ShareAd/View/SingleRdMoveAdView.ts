import Shar_XYXZS_eAd from "../ShareAd";
import Uti_XYXZS_lit from "../../Utilit";
import W_XYXZS_XAPI from "../../WXAPI";
import A_XYXZS_LD from "../../ALD";
import Even_XYXZS_tMgr from "../../Event/EventMgr";
import { Even_XYXZS_tDef } from "../../Event/EventDef";
import OPP_XYXZS_OAPI from "../../OPPOAPI";
/**
 * 会随机移动的单个广告和SinpleAdView不同之处在于需要有一个Sprite作为父部件，并且设置好Sprite的Width和Height属性
 * 该广告会在父部件的内部随机(Width和Height属性)移动
 * _moveSpd属性为移动速度，根据需要自行修改
 * 
 * @export
 * @class SingleRdMoveAdView
 * @extends {Laya.Script}
 */
export default class SingleRdMo_XYXZS_veAdView extends Laya.Script {
    public Ad_XYXZS_PosID: number = Shar_XYXZS_eAd.LoopA_XYXZS_dLocationID;
    protected _ow_XYXZS_nerSprite: Laya.Sprite;
    protected _di_XYXZS_splaySp: Laya.Sprite;
    protected _dis_XYXZS_Text: Laya.Text;
    protected _aniFo_XYXZS_rward: boolean = false;
    protected _da_XYXZS_ta: any = null;
    protected _fon_XYXZS_tSize = 25;
    protected _ori_XYXZS_ginSize = 1;
    protected _orig_XYXZS_inW: number = 150;
    protected _ori_XYXZS_ginH: number = 150;
    protected _rdP_XYXZS_oint_X: number;
    protected _rdP_XYXZS_oint_Y: number;
    /* 移动速度 */
    protected _moveSpd: number = 1000;
    onAwake() {
        this._ow_XYXZS_nerSprite = this.owner as Laya.Sprite;
        this._di_XYXZS_splaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._orig_XYXZS_inW = this._di_XYXZS_splaySp.width;
        this._ori_XYXZS_ginH = this._di_XYXZS_splaySp.height;
        this._dis_XYXZS_Text = this.owner.getChildByName("TitelText") as Laya.Text;
        this._dis_XYXZS_Text.text = "";
        this._fon_XYXZS_tSize = this._dis_XYXZS_Text.fontSize;
        this._ori_XYXZS_ginSize = this._di_XYXZS_splaySp.scaleX;
    }
    /**
     * 
     * 
     * @memberof SingleAdView
     */
    onEnable(): void {
        this.refreshADVDis();
        Laya.timer.loop(3000, this, this.refreshADVDis);
        this._rdP_XYXZS_oint_X = this._ow_XYXZS_nerSprite.x;
        this._rdP_XYXZS_oint_Y = this._ow_XYXZS_nerSprite.y;
        this._ow_XYXZS_nerSprite.on(Laya.Event.CLICK, this, this.onSpClick);
    }

    onDisable(): void {
        Laya.timer.clearAll(this);
        this._ow_XYXZS_nerSprite.off(Laya.Event.CLICK, this, this.onSpClick);
    }

    protected refreshADVDis() {
        var self = this;
        Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.Ad_XYXZS_PosID, (datas) => {
            if (datas && datas.length > 0) {
                (self.owner as Laya.Sprite).visible = true;
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._di_XYXZS_splaySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self._di_XYXZS_splaySp.destroyed) {
                        self._di_XYXZS_splaySp.width = self._orig_XYXZS_inW;
                        self._di_XYXZS_splaySp.height = self._ori_XYXZS_ginH;
                        self._di_XYXZS_splaySp.scale(self._ori_XYXZS_ginSize, self._ori_XYXZS_ginSize);
                    }
                }));
                var str = String(data.title);
                var num = str.length;
                var fontSize = Math.floor((5 / num) * this._fon_XYXZS_tSize);
                self._dis_XYXZS_Text.fontSize = fontSize;
                self._dis_XYXZS_Text.text = str;
                self._da_XYXZS_ta = data;
            }
            else {
                (this.owner as Laya.Sprite).visible = false;
            }
        })
    }

    onUpdate() {
        this.displayAni();
        this.RandonMove();
    }

    protected displayAni() {
        if (!this._aniFo_XYXZS_rward) {
            var scale = this._di_XYXZS_splaySp.scaleX - Laya.timer.delta / 3000 * 1;
            scale = Math.max(scale, 0);
            this._di_XYXZS_splaySp.scale(scale, scale);
            if (this._di_XYXZS_splaySp.scaleX <= 0.95 * this._ori_XYXZS_ginSize) {
                this._aniFo_XYXZS_rward = true;
            }
        }
        else {
            var scale = this._di_XYXZS_splaySp.scaleX + Laya.timer.delta / 3000 * 1;
            scale = Math.min(scale, 1 * this._ori_XYXZS_ginSize);
            this._di_XYXZS_splaySp.scale(scale, scale);
            if (this._di_XYXZS_splaySp.scaleX >= this._ori_XYXZS_ginSize) {
                this._aniFo_XYXZS_rward = false;
            }
        }
    }
    protected RandonMove() {
        let x = Math.abs(this._ow_XYXZS_nerSprite.x - this._rdP_XYXZS_oint_X);
        let y = Math.abs(this._ow_XYXZS_nerSprite.y - this._rdP_XYXZS_oint_Y);
        if (x <= 1 || y <= 1) {
            let pt = this._ow_XYXZS_nerSprite.parent as Laya.Sprite;
            this._rdP_XYXZS_oint_X = (Math.random() * pt.width);
            this._rdP_XYXZS_oint_Y = (Math.random() * pt.height);
            x = this._ow_XYXZS_nerSprite.x - this._rdP_XYXZS_oint_X;
            y = this._ow_XYXZS_nerSprite.y - this._rdP_XYXZS_oint_Y;
            let distance = Math.sqrt(x * x + y * y);
            let time = 1000 * (distance / 100);
            Laya.Tween.to(this._ow_XYXZS_nerSprite, { x: this._rdP_XYXZS_oint_X, y: this._rdP_XYXZS_oint_Y }, time);
            return;
        }
    }
    protected onSpClick() {
        var data = this._da_XYXZS_ta;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                W_XYXZS_XAPI.navigateT_XYXZS_oMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                    A_XYXZS_LD.aldSend_XYXZS_ReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        A_XYXZS_LD.aldSend_XYXZS_ReportAdClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPP_XYXZS_OAPI.navigat_XYXZS_eToMiniProgram(data.appid,data.title,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }
}