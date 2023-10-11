import Share_ppxhc_Ad from "../ShareAd";
import WXAPI_ from "../../WXAPI";
import ALD_ppxhc from "../../ALD";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import OPPO_ppxhc_API from "../../OPPOAPI";
import QQMiniGame_ppxhc_API from "../../QQMiniGameAPI";

export default class Wudian_ppxhc_BannerAdView extends Laya.Script {
    public AdPosID: number = Share_ppxhc_Ad.BannerAdLocationID_;
    protected _displaySp: Laya.Sprite;
    protected _data: any = null;

    public WXBannerWidth: number;
    protected _wxBanner: any = null;

    onAwake() {
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._displaySp.visible = false;
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.AD_WudianBanner_Show, this, this.ShowBanner);
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.AD_WudianBanner_Hide, this, this.HideBanner);
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.AD_WudianBanner_PreLoad, this, this.PreloadBanner);
    }

    onEnable(): void {
        this.PreloadBanner();
    }
    public PreloadBanner() {
        if ((this.owner as Laya.UIComponent).visible == false) return;
        var banner = AppSwitchConfig.getInstance().getAppSwitchData().banner;
        if (1 == banner && Laya.Browser.onMiniGame) {
            this.refreshWXBanner();
        }
        else {
            this.refreshBannerDis();
        }
    }
    public ShowBanner() {
        if ((this.owner as Laya.UIComponent).visible == false) return;
        console.log("showBanner");
        var banner = AppSwitchConfig.getInstance().getAppSwitchData().banner;
        if (1 == banner && Laya.Browser.onMiniGame && this._wxBanner) {
            console.log("WxshowBanner");
            this._wxBanner.show();
        }
        else if (this._data != null) {
            this._displaySp.visible = true;
            this._displaySp.on(Laya.Event.CLICK, this, this.onSpClick);
        }
    }
    public HideBanner() {
        this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
        this._displaySp.visible = false;
        this.clearWXBaner();
    }
    onDestroy() {
        this.HideBanner();
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.AD_WudianBanner_Show, this, this.ShowBanner);
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.AD_WudianBanner_Hide, this, this.HideBanner);
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.AD_WudianBanner_PreLoad, this, this.PreloadBanner);
    }
    // onDisable(): void {
    //     this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
    //     this.clearWXBaner();
    // }

    protected refreshBannerDis() {
        var self = this;
        Share_ppxhc_Ad.getADVs_(this.AdPosID, (datas) => {
            if (datas && datas.length > 0) {
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._displaySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self._displaySp.destroyed) {
                        self._displaySp.width = 750;
                        self._displaySp.height = 256;
                        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.AD_WudianBanner_LoadComplete);
                    }
                }));
                self._data = data;
            }
        }, false)
    }

    protected onSpClick() {
        var data = this._data;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                WXAPI_.navigateToMiniProgram_(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Share_ppxhc_Ad.reportUserClick_(data.appid);
                    ALD_ppxhc.aldSendReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.AD_OnShareAdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        ALD_ppxhc.aldSendReportAdClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPPO_ppxhc_API.navigateToMiniProgram(data.appid,data.title,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Share_ppxhc_Ad.reportUserClick_(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
            {
                QQMiniGame_ppxhc_API.navigateToMiniProgram_ppxhc(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Share_ppxhc_Ad.reportUserClick_(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }

    protected refreshWXBanner() {
        if (!Laya.Browser.onMiniGame)
            return;
        this.clearWXBaner();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._displaySp.localToGlobal(new Laya.Point(0, 0))

        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WXBannerWidth ? this.WXBannerWidth / Laya.stage.width * sw : sw;

        this._wxBanner = Laya.Browser.window["wx"].createBannerAd(
            {
                adUnitId: WXAPI_.bannerAdUnitId,
                adIntervals: 30,
                style:
                    {
                        left: left,
                        top: top,
                        width: width,
                    }
            })
        self._wxBanner.onLoad((res) => {
            console.log("误点Banner广告 加载完成");
            console.log(res);
            Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.AD_WudianBanner_LoadComplete);
        })
        this._wxBanner.onError((err) => {
            console.log("误点Banner广告 加载失败");
            console.log(err);
            self.refreshBannerDis();
            self.clearWXBaner();
        })
        this._wxBanner.onResize(res => {
            console.log(self._wxBanner.style.realWidth, self._wxBanner.style.realHeight)
        })
        self._wxBanner.hide();
    }

    public clearWXBaner() {
        if (this._wxBanner) {
            this._wxBanner.destroy();
        }
        this._wxBanner = null;
    }
}