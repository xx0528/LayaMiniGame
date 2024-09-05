import ryw_ShareAd from "../ShareAd";
import ryw_WXAPI from "../../WXAPI";
import ryw_ALD from "../../ALD";
import ryw_EventMgr from "../../Event/EventMgr";
import { ryw_EventDef } from "../../Event/EventDef";
import ryw_AppSwitchConfig from "../../Config/AppSwitchConfig";
import ryw_OPPOAPI from "../../OPPOAPI";
import ryw_QQMiniGameAPI from "../../QQMiniGameAPI";

export default class ryw_WudianBannerAdView extends Laya.Script {
    public ryw_AdPosID: number = ryw_ShareAd.ryw_BannerAdLocationID;
    protected ryw__displaySp: Laya.Sprite;
    protected ryw__data: any = null;

    public ryw_WXBannerWidth: number;
    protected ryw__wxBanner: any = null;

    onAwake() {
        this.ryw__displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this.ryw__displaySp.visible = false;
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.ryw_AD_WudianBanner_Show, this, this.ryw_ShowBanner);
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.ryw_AD_WudianBanner_Hide, this, this.ryw_HideBanner);
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.ryw_AD_WudianBanner_PreLoad, this, this.ryw_PreloadBanner);
    }

    onEnable(): void {
        this.ryw_PreloadBanner();
    }
    public ryw_PreloadBanner() {
        if ((this.owner as Laya.UIComponent).visible == false) return;
        var banner = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_banner;
        if (1 == banner && Laya.Browser.onMiniGame) {
            this.ryw_refreshWXBanner();
        }
        else {
            this.ryw_refreshBannerDis();
        }
    }
    public ryw_ShowBanner() {
        if ((this.owner as Laya.UIComponent).visible == false) return;
        console.log("showBanner");
        var banner = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_banner;
        if (1 == banner && Laya.Browser.onMiniGame && this.ryw__wxBanner) {
            console.log("WxshowBanner");
            this.ryw__wxBanner.show();
        }
        else if (this.ryw__data != null) {
            this.ryw__displaySp.visible = true;
            this.ryw__displaySp.on(Laya.Event.CLICK, this, this.ryw_onSpClick);
        }
    }
    public ryw_HideBanner() {
        this.ryw__displaySp.off(Laya.Event.CLICK, this, this.ryw_onSpClick);
        this.ryw__displaySp.visible = false;
        this.ryw_clearWXBaner();
    }
    onDestroy() {
        this.ryw_HideBanner();
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.ryw_AD_WudianBanner_Show, this, this.ryw_ShowBanner);
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.ryw_AD_WudianBanner_Hide, this, this.ryw_HideBanner);
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.ryw_AD_WudianBanner_PreLoad, this, this.ryw_PreloadBanner);
    }
    // onDisable(): void {
    //     this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
    //     this.clearWXBaner();
    // }

    protected ryw_refreshBannerDis() {
        var self = this;
        ryw_ShareAd.ryw_getADVs(this.ryw_AdPosID, (datas) => {
            if (datas && datas.length > 0) {
                var data = datas[Math.floor(Math.random() * datas.length)];
                self.ryw__displaySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self.ryw__displaySp.destroyed) {
                        self.ryw__displaySp.width = 750;
                        self.ryw__displaySp.height = 256;
                        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_WudianBanner_LoadComplete);
                    }
                }));
                self.ryw__data = data;
            }
        }, false)
    }

    protected ryw_onSpClick() {
        var data = this.ryw__data;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                ryw_WXAPI.ryw_navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    ryw_ShareAd.ryw_reportUserClick(data.appid);
                    ryw_ALD.ryw_aldSendReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        ryw_ALD.ryw_aldSendReportAdClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                ryw_OPPOAPI.ryw_navigateToMiniProgram(data.appid,data.title,data.url,(res)=>
                {
                    console.log("跳转成功")
                    ryw_ShareAd.ryw_reportUserClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
            {
                ryw_QQMiniGameAPI.ryw_navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    ryw_ShareAd.ryw_reportUserClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }

    protected ryw_refreshWXBanner() {
        if (!Laya.Browser.onMiniGame)
            return;
        this.ryw_clearWXBaner();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this.ryw__displaySp.localToGlobal(new Laya.Point(0, 0))

        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.ryw_WXBannerWidth ? this.ryw_WXBannerWidth / Laya.stage.width * sw : sw;

        this.ryw__wxBanner = Laya.Browser.window["wx"].createBannerAd(
            {
                adUnitId: ryw_WXAPI.ryw_bannerAdUnitId,
                adIntervals: 30,
                style:
                    {
                        left: left,
                        top: top,
                        width: width,
                    }
            })
        self.ryw__wxBanner.onLoad((res) => {
            console.log("误点Banner广告 加载完成");
            console.log(res);
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_WudianBanner_LoadComplete);
        })
        this.ryw__wxBanner.onError((err) => {
            console.log("误点Banner广告 加载失败");
            console.log(err);
            self.ryw_refreshBannerDis();
            self.ryw_clearWXBaner();
        })
        this.ryw__wxBanner.onResize(res => {
            console.log(self.ryw__wxBanner.style.realWidth, self.ryw__wxBanner.style.realHeight)
        })
        self.ryw__wxBanner.hide();
    }

    public ryw_clearWXBaner() {
        if (this.ryw__wxBanner) {
            this.ryw__wxBanner.destroy();
        }
        this.ryw__wxBanner = null;
    }
}