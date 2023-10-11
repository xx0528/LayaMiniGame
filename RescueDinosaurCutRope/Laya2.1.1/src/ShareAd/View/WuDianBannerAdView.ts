import Shar_JJKLBB_eAd from "../ShareAd";
import WXAPI from "../../WXAPI";
import A_JJKLBB_LD from "../../ALD";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import AppSwitch_JJKLBB_Config from "../../Config/AppSwitchConfig";
import OPPO_JJKLBB_API from "../../OPPOAPI";
import QQMini_JJKLBB_GameAPI from "../../QQMiniGameAPI";

export default class WudianB_JJKLBB_annerAdV_JJKLBB_iew extends Laya.Script {
    public AdP_JJKLBB_osID: number = Shar_JJKLBB_eAd.BannerAdL_JJKLBB_ocationID;
    protected _disp_JJKLBB_laySp: Laya.Sprite;
    protected _da_JJKLBB_ta: any = null;

    public WXBann_JJKLBB_erWidth: number;
    protected _wxB_JJKLBB_anner: any = null;

    onAwake() {
        this._disp_JJKLBB_laySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._disp_JJKLBB_laySp.visible = false;
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.AD_Wudi_JJKLBB_anBanner_Show, this, this.ShowB_JJKLBB_anner);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.AD_Wudi_JJKLBB_anB_JJKLBB_anner_Hide, this, this.Hide_JJKLBB_Banner);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.AD_WudianBa_JJKLBB_nner_PreLoad, this, this.Preload_JJKLBB_Banner);
    }

    onEnable(): void {
        this.Preload_JJKLBB_Banner();
    }
    public Preload_JJKLBB_Banner() {
        if ((this.owner as Laya.UIComponent).visible == false) return;
        var banner = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().ban_JJKLBB_ner;
        if (1 == banner && Laya.Browser.onMiniGame) {
            this.refresh_JJKLBB_WXBanner();
        }
        else {
            this.refreshB_JJKLBB_annerDis();
        }
    }
    public ShowB_JJKLBB_anner() {
        if ((this.owner as Laya.UIComponent).visible == false) return;
        console.log("showBanner");
        var banner = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().ban_JJKLBB_ner;
        if (1 == banner && Laya.Browser.onMiniGame && this._wxB_JJKLBB_anner) {
            console.log("WxshowBanner");
            this._wxB_JJKLBB_anner.show();
        }
        else if (this._da_JJKLBB_ta != null) {
            this._disp_JJKLBB_laySp.visible = true;
            this._disp_JJKLBB_laySp.on(Laya.Event.CLICK, this, this.onSpC_JJKLBB_lick);
        }
    }
    public Hide_JJKLBB_Banner() {
        this._disp_JJKLBB_laySp.off(Laya.Event.CLICK, this, this.onSpC_JJKLBB_lick);
        this._disp_JJKLBB_laySp.visible = false;
        this.clearWXBaner();
    }
    onDestroy() {
        this.Hide_JJKLBB_Banner();
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.AD_Wudi_JJKLBB_anBanner_Show, this, this.ShowB_JJKLBB_anner);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.AD_Wudi_JJKLBB_anB_JJKLBB_anner_Hide, this, this.Hide_JJKLBB_Banner);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.AD_WudianBa_JJKLBB_nner_PreLoad, this, this.Preload_JJKLBB_Banner);
    }
    // onDisable(): void {
    //     this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
    //     this.clearWXBaner();
    // }

    protected refreshB_JJKLBB_annerDis() {
        var self = this;
        Shar_JJKLBB_eAd.get_JJKLBB_ADVs(this.AdP_JJKLBB_osID, (datas) => {
            if (datas && datas.length > 0) {
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._disp_JJKLBB_laySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self._disp_JJKLBB_laySp.destroyed) {
                        self._disp_JJKLBB_laySp.width = 750;
                        self._disp_JJKLBB_laySp.height = 256;
                        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_Wudia_JJKLBB_nBanner_Load_JJKLBB_Complete);
                    }
                }));
                self._da_JJKLBB_ta = data;
            }
        }, false)
    }

    protected onSpC_JJKLBB_lick() {
        var data = this._da_JJKLBB_ta;
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
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
            {
                QQMini_JJKLBB_GameAPI.navig_JJKLBB_ateToMiniP_JJKLBB_rogram(data.appid,data.url,(res)=>
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

    protected refresh_JJKLBB_WXBanner() {
        if (!Laya.Browser.onMiniGame)
            return;
        this.clearWXBaner();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._disp_JJKLBB_laySp.localToGlobal(new Laya.Point(0, 0))

        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WXBann_JJKLBB_erWidth ? this.WXBann_JJKLBB_erWidth / Laya.stage.width * sw : sw;

        this._wxB_JJKLBB_anner = Laya.Browser.window["wx"].createBannerAd(
            {
                adUnitId: WXAPI.bannerAdUnitId,
                adIntervals: 30,
                style:
                    {
                        left: left,
                        top: top,
                        width: width,
                    }
            })
        self._wxB_JJKLBB_anner.onLoad((res) => {
            console.log("误点Banner广告 加载完成");
            console.log(res);
            Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_Wudia_JJKLBB_nBanner_Load_JJKLBB_Complete);
        })
        this._wxB_JJKLBB_anner.onError((err) => {
            console.log("误点Banner广告 加载失败");
            console.log(err);
            self.refreshB_JJKLBB_annerDis();
            self.clearWXBaner();
        })
        this._wxB_JJKLBB_anner.onResize(res => {
            console.log(self._wxB_JJKLBB_anner.style.realWidth, self._wxB_JJKLBB_anner.style.realHeight)
        })
        self._wxB_JJKLBB_anner.hide();
    }

    public clearWXBaner() {
        if (this._wxB_JJKLBB_anner) {
            this._wxB_JJKLBB_anner.destroy();
        }
        this._wxB_JJKLBB_anner = null;
    }
}