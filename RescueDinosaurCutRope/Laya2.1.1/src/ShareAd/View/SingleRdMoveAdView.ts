import Shar_JJKLBB_eAd from "../ShareAd";
import Util_JJKLBB_it from "../../Utilit";
import WXAPI from "../../WXAPI";
import A_JJKLBB_LD from "../../ALD";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import OPPO_JJKLBB_API from "../../OPPOAPI";
/**
 * 会随机移动的单个广告和SinpleAdView不同之处在于需要有一个Sprite作为父部件，并且设置好Sprite的Width和Height属性
 * 该广告会在父部件的内部随机(Width和Height属性)移动
 * _moveSpd属性为移动速度，根据需要自行修改
 * 
 * @export
 * @class SingleRdMoveAdView
 * @extends {Laya.Script}
 */
export default class Singl_JJKLBB_eRdMoveA_JJKLBB_dView extends Laya.Script {
    public AdPo_JJKLBB_sID: number = Shar_JJKLBB_eAd.LoopAd_JJKLBB_LocationID;
    protected _owne_JJKLBB_rSprite: Laya.Sprite;
    protected _displ_JJKLBB_aySp: Laya.Sprite;
    protected _disT_JJKLBB_ext: Laya.Text;
    protected _aniFo_JJKLBB_rward: boolean = false;
    protected _dat_JJKLBB_a: any = null;
    protected _fon_JJKLBB_tSize = 25;
    protected _origi_JJKLBB_nSize = 1;
    protected _origi_JJKLBB_nW: number = 150;
    protected _origi_JJKLBB_nH: number = 150;
    protected _rdP_JJKLBB_oint_X: number;
    protected _rdPo_JJKLBB_int_Y: number;
    /* 移动速度 */
    protected _mov_JJKLBB_eSpd: number = 1000;
    onAwake() {
        this._owne_JJKLBB_rSprite = this.owner as Laya.Sprite;
        this._displ_JJKLBB_aySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._origi_JJKLBB_nW = this._displ_JJKLBB_aySp.width;
        this._origi_JJKLBB_nH = this._displ_JJKLBB_aySp.height;
        this._disT_JJKLBB_ext = this.owner.getChildByName("TitelText") as Laya.Text;
        this._disT_JJKLBB_ext.text = "";
        this._fon_JJKLBB_tSize = this._disT_JJKLBB_ext.fontSize;
        this._origi_JJKLBB_nSize = this._displ_JJKLBB_aySp.scaleX;
    }
    /**
     * 
     * 
     * @memberof SingleAdView
     */
    onEnable(): void {
        this.refresh_JJKLBB_ADVDis();
        Laya.timer.loop(3000, this, this.refresh_JJKLBB_ADVDis);
        this._rdP_JJKLBB_oint_X = this._owne_JJKLBB_rSprite.x;
        this._rdPo_JJKLBB_int_Y = this._owne_JJKLBB_rSprite.y;
        this._owne_JJKLBB_rSprite.on(Laya.Event.CLICK, this, this.onSp_JJKLBB_Click);
    }

    onDisable(): void {
        Laya.timer.clearAll(this);
        this._owne_JJKLBB_rSprite.off(Laya.Event.CLICK, this, this.onSp_JJKLBB_Click);
    }

    protected refresh_JJKLBB_ADVDis() {
        var self = this;
        Shar_JJKLBB_eAd.get_JJKLBB_ADVs(this.AdPo_JJKLBB_sID, (datas) => {
            if (datas && datas.length > 0) {
                (self.owner as Laya.Sprite).visible = true;
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._displ_JJKLBB_aySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self._displ_JJKLBB_aySp.destroyed) {
                        self._displ_JJKLBB_aySp.width = self._origi_JJKLBB_nW;
                        self._displ_JJKLBB_aySp.height = self._origi_JJKLBB_nH;
                        self._displ_JJKLBB_aySp.scale(self._origi_JJKLBB_nSize, self._origi_JJKLBB_nSize);
                    }
                }));
                var str = String(data.title);
                var num = str.length;
                var fontSize = Math.floor((5 / num) * this._fon_JJKLBB_tSize);
                self._disT_JJKLBB_ext.fontSize = fontSize;
                self._disT_JJKLBB_ext.text = str;
                self._dat_JJKLBB_a = data;
            }
            else {
                (this.owner as Laya.Sprite).visible = false;
            }
        })
    }

    onUpdate() {
        this.displ_JJKLBB_ayAni();
        this.Randon_JJKLBB_Move();
    }

    protected displ_JJKLBB_ayAni() {
        if (!this._aniFo_JJKLBB_rward) {
            var scale = this._displ_JJKLBB_aySp.scaleX - Laya.timer.delta / 3000 * 1;
            scale = Math.max(scale, 0);
            this._displ_JJKLBB_aySp.scale(scale, scale);
            if (this._displ_JJKLBB_aySp.scaleX <= 0.95 * this._origi_JJKLBB_nSize) {
                this._aniFo_JJKLBB_rward = true;
            }
        }
        else {
            var scale = this._displ_JJKLBB_aySp.scaleX + Laya.timer.delta / 3000 * 1;
            scale = Math.min(scale, 1 * this._origi_JJKLBB_nSize);
            this._displ_JJKLBB_aySp.scale(scale, scale);
            if (this._displ_JJKLBB_aySp.scaleX >= this._origi_JJKLBB_nSize) {
                this._aniFo_JJKLBB_rward = false;
            }
        }
    }
    protected Randon_JJKLBB_Move() {
        let x = Math.abs(this._owne_JJKLBB_rSprite.x - this._rdP_JJKLBB_oint_X);
        let y = Math.abs(this._owne_JJKLBB_rSprite.y - this._rdPo_JJKLBB_int_Y);
        if (x <= 1 || y <= 1) {
            let pt = this._owne_JJKLBB_rSprite.parent as Laya.Sprite;
            this._rdP_JJKLBB_oint_X = (Math.random() * pt.width);
            this._rdPo_JJKLBB_int_Y = (Math.random() * pt.height);
            x = this._owne_JJKLBB_rSprite.x - this._rdP_JJKLBB_oint_X;
            y = this._owne_JJKLBB_rSprite.y - this._rdPo_JJKLBB_int_Y;
            let distance = Math.sqrt(x * x + y * y);
            let time = 1000 * (distance / 100);
            Laya.Tween.to(this._owne_JJKLBB_rSprite, { x: this._rdP_JJKLBB_oint_X, y: this._rdPo_JJKLBB_int_Y }, time);
            return;
        }
    }
    protected onSp_JJKLBB_Click() {
        var data = this._dat_JJKLBB_a;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                WXAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_JJKLBB_eAd.reportUs_JJKLBB_erClick(data.appid);
                    A_JJKLBB_LD.aldSendReportA_JJKLBB_dClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_OnShareAdFail_UseCancel);                                                
                        A_JJKLBB_LD.aldSendRepo_JJKLBB_rtAdClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPPO_JJKLBB_API.navigat_JJKLBB_eToMiniPr_JJKLBB_ogram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_JJKLBB_eAd.reportUs_JJKLBB_erClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }
}