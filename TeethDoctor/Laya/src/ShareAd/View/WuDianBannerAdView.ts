import Shar_XYXZS_eAd from "../ShareAd";
import W_XYXZS_XAPI from "../../WXAPI";
import A_XYXZS_LD from "../../ALD";
import Even_XYXZS_tMgr from "../../Event/EventMgr";
import { Even_XYXZS_tDef } from "../../Event/EventDef";
import AppSwi_XYXZS_tchConfig from "../../Config/AppSwitchConfig";
import OPP_XYXZS_OAPI from "../../OPPOAPI";
import QQMini_XYXZS_GameAPI from "../../QQMiniGameAPI";

export default class Wudia_XYXZS_nBannerAdView extends Laya.Script {
    public AdP_XYXZS_osID: number = Shar_XYXZS_eAd.Banner_XYXZS_AdLocationID;
    protected _dis_XYXZS_playSp: Laya.Sprite;
    protected _da_XYXZS_ta: any = null;

    public WXBann_XYXZS_erWidth: number;
    protected _wxB_XYXZS_anner: any = null;

    onAwake() {
        this._dis_XYXZS_playSp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._dis_XYXZS_playSp.visible = false;
        Even_XYXZS_tMgr.in_XYXZS_stance.reg_XYXZS_Evemt(Even_XYXZS_tDef.AD_WudianBan_XYXZS_ner_Show, this, this.Show_XYXZS_Banner);
        Even_XYXZS_tMgr.in_XYXZS_stance.reg_XYXZS_Evemt(Even_XYXZS_tDef.AD_WudianB_XYXZS_anner_Hide, this, this.Hide_XYXZS_Banner);
        Even_XYXZS_tMgr.in_XYXZS_stance.reg_XYXZS_Evemt(Even_XYXZS_tDef.AD_Wudian_XYXZS_Banner_PreLoad, this, this.Prelo_XYXZS_adBanner);
    }

    onEnable(): void {
        this.Prelo_XYXZS_adBanner();
    }
    public Prelo_XYXZS_adBanner() {
        if ((this.owner as Laya.UIComponent).visible == false) return;
        var banner = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().ba_XYXZS_nner;
        if (1 == banner && Laya.Browser.onMiniGame) {
            this.refresh_XYXZS_WXBanner();
        }
        else {
            this.refres_XYXZS_hBannerDis();
        }
    }
    public Show_XYXZS_Banner() {
        if ((this.owner as Laya.UIComponent).visible == false) return;
        console.log("showBanner");
        var banner = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().ba_XYXZS_nner;
        if (1 == banner && Laya.Browser.onMiniGame && this._wxB_XYXZS_anner) {
            console.log("WxshowBanner");
            this._wxB_XYXZS_anner.show();
        }
        else if (this._da_XYXZS_ta != null) {
            this._dis_XYXZS_playSp.visible = true;
            this._dis_XYXZS_playSp.on(Laya.Event.CLICK, this, this.onSp_XYXZS_Click);
        }
    }
    public Hide_XYXZS_Banner() {
        this._dis_XYXZS_playSp.off(Laya.Event.CLICK, this, this.onSp_XYXZS_Click);
        this._dis_XYXZS_playSp.visible = false;
        this.clearWXBaner();
    }
    onDestroy() {
        this.Hide_XYXZS_Banner();
        Even_XYXZS_tMgr.in_XYXZS_stance.re_XYXZS_moveEvent(Even_XYXZS_tDef.AD_WudianBan_XYXZS_ner_Show, this, this.Show_XYXZS_Banner);
        Even_XYXZS_tMgr.in_XYXZS_stance.re_XYXZS_moveEvent(Even_XYXZS_tDef.AD_WudianB_XYXZS_anner_Hide, this, this.Hide_XYXZS_Banner);
        Even_XYXZS_tMgr.in_XYXZS_stance.re_XYXZS_moveEvent(Even_XYXZS_tDef.AD_Wudian_XYXZS_Banner_PreLoad, this, this.Prelo_XYXZS_adBanner);
    }
    // onDisable(): void {
    //     this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
    //     this.clearWXBaner();
    // }

    protected refres_XYXZS_hBannerDis() {
        var self = this;
        Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdP_XYXZS_osID, (datas) => {
            if (datas && datas.length > 0) {
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._dis_XYXZS_playSp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self._dis_XYXZS_playSp.destroyed) {
                        self._dis_XYXZS_playSp.width = 750;
                        self._dis_XYXZS_playSp.height = 256;
                        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_WudianBan_XYXZS_ner_LoadComplete);
                    }
                }));
                self._da_XYXZS_ta = data;
            }
        }, false)
    }

    protected onSp_XYXZS_Click() {
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
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
            {
                QQMini_XYXZS_GameAPI.navigateToMi_XYXZS_niProgram(data.appid,data.url,(res)=>
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

    protected refresh_XYXZS_WXBanner() {
        if (!Laya.Browser.onMiniGame)
            return;
        this.clearWXBaner();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._dis_XYXZS_playSp.localToGlobal(new Laya.Point(0, 0))

        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WXBann_XYXZS_erWidth ? this.WXBann_XYXZS_erWidth / Laya.stage.width * sw : sw;

        this._wxB_XYXZS_anner = Laya.Browser.window["wx"].createBannerAd(
            {
                adUnitId: W_XYXZS_XAPI.bann_XYXZS_erAdUnitId,
                adIntervals: 30,
                style:
                    {
                        left: left,
                        top: top,
                        width: width,
                    }
            })
        self._wxB_XYXZS_anner.onLoad((res) => {
            console.log("误点Banner广告 加载完成");
            console.log(res);
            Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_WudianBan_XYXZS_ner_LoadComplete);
        })
        this._wxB_XYXZS_anner.onError((err) => {
            console.log("误点Banner广告 加载失败");
            console.log(err);
            self.refres_XYXZS_hBannerDis();
            self.clearWXBaner();
        })
        this._wxB_XYXZS_anner.onResize(res => {
            console.log(self._wxB_XYXZS_anner.style.realWidth, self._wxB_XYXZS_anner.style.realHeight)
        })
        self._wxB_XYXZS_anner.hide();
    }

    public clearWXBaner() {
        if (this._wxB_XYXZS_anner) {
            this._wxB_XYXZS_anner.destroy();
        }
        this._wxB_XYXZS_anner = null;
    }
}