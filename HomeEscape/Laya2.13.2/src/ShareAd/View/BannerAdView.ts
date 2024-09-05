import ryw_ShareAd from "../ShareAd";
import ryw_WXAPI from "../../WXAPI";
import ryw_ALD from "../../ALD";
import ryw_EventMgr from "../../Event/EventMgr";
import { ryw_EventDef } from "../../Event/EventDef";
import ryw_AppSwitchConfig from "../../Config/AppSwitchConfig";
import ryw_OPPOAPI from "../../OPPOAPI";
import ryw_QQMiniGameAPI from "../../QQMiniGameAPI";
import IViewStateListener from "../../View/IViewStateListener";

export default class ryw_BannerAdView extends Laya.Script implements IViewStateListener
{
    public ryw_AdPosID : number = ryw_ShareAd.ryw_BannerAdLocationID;
    protected ryw__displaySp : Laya.Sprite;
    protected ryw__data : any = null;

    public ryw_WXBannerWidth : number;
    protected ryw__wxBanner : any = null;

    protected _onLoad : Function = null;
    protected _onError : Function = null;
    protected _onResize : Function = null;

    onAwake()
    {
        this.ryw__displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        if(null == this.ryw__displaySp)
        {
            this.ryw__displaySp = this.owner as Laya.Sprite;
        }
    }
    
    onEnable(): void 
    {
        this.ryw__displaySp.on(Laya.Event.CLICK,this,this.ryw_onSpClick);
        var banner = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_banner;
        if(0 == banner)
        {
            this.ryw_refreshBannerDis();
            let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.ryw_refreshBannerDis);
            
        }
        else if (1 == banner)
        {
            this.ryw_refreshWXBanner();
            let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.ryw_refreshWXBanner);
        }
    }

    onDisable(): void 
    {
        this.ryw__displaySp.off(Laya.Event.CLICK,this,this.ryw_onSpClick);
        this.ryw_clearWXBaner();
    }

    protected ryw_refreshBannerDis()
    {
        var self = this;
        ryw_ShareAd.ryw_getADVs(this.ryw_AdPosID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                var data = datas[Math.floor(Math.random() * datas.length)];

                self.ryw__displaySp.loadImage(data.logo,Laya.Handler.create(self,function()
                {
                    if(!self.ryw__displaySp.destroyed)
                    {
                        self.ryw__displaySp.width = 750;
                        self.ryw__displaySp.height = 256;
                    }
                }));
                self.ryw__data = data;
            }
        },false)
    }

    protected ryw_onSpClick()
    {
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
            else if (Laya.Browser.onQQMiniGame)  //qq小游戏
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

    protected ryw_refreshWXBanner()
    {
        if((!Laya.Browser.onMiniGame && !Laya.Browser.onQQMiniGame)
            || !(this.owner as Laya.Sprite).visible)
            return;
        this.ryw_clearWXBaner();
        var self = this;
        let sysInfo = null;
        if(Laya.Browser.onMiniGame)
        {
            sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        }
        else if (Laya.Browser.onQQMiniGame)
        {
            sysInfo = Laya.Browser.window["qq"].getSystemInfoSync();
        }
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this.ryw__displaySp.localToGlobal(new Laya.Point(0,0))

        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.ryw_WXBannerWidth ? this.ryw_WXBannerWidth / Laya.stage.width * sw : sw;

        if(Laya.Browser.onMiniGame)
        {
            let recreateBannerIDList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_recreateBannerIDList
            let bannerAdUnitId = recreateBannerIDList
            [
                Math.floor(Math.random() * recreateBannerIDList.length)
            ]
            if(null == bannerAdUnitId)
            {
                bannerAdUnitId = ryw_WXAPI.ryw_bannerAdUnitId;
            }
            self.ryw__wxBanner = Laya.Browser.window["wx"].createBannerAd(
                {
                    adUnitId : bannerAdUnitId,
                    adIntervals : 30,
                    style : 
                    {
                        left:left,
                        top:top,
                        width: width,
                    }
                })
                self.ryw__wxBanner.onLoad((res) =>  {
                console.log("WXBanner广告 加载完成");
                console.log(res);
            })
            self.ryw__wxBanner.onError((err) =>  {
                console.log("WXBanner广告 加载失败");
                console.log(err);
                self.ryw_refreshBannerDis();
                self.ryw_clearWXBaner();
            })
            self.ryw__wxBanner.onResize(res => {

              })
            self.ryw__wxBanner.show();
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            let recreateBannerIDList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_recreateBannerIDList
            let bannerAdUnitId = recreateBannerIDList
            [
                Math.floor(Math.random() * recreateBannerIDList.length)
            ]
            if(null == bannerAdUnitId)
            {
                bannerAdUnitId = ryw_QQMiniGameAPI.ryw_bannerAdUnitId;
            }
            self.ryw__wxBanner = Laya.Browser.window["qq"].createBannerAd(
                {
                    adUnitId: bannerAdUnitId,
                    adIntervals: 30,
                    style:
                        {
                            left: left,
                            top: top,
                            width: width,
                        }
                })
            if (null != self.ryw__wxBanner)  {
                self._onLoad = (res) => {
                    console.log("QQBanner广告 加载完成 : ", bannerAdUnitId);
                    console.log(res);
                    self.ryw__wxBanner.show();
                }
                self.ryw__wxBanner.onLoad(self._onLoad);
                self._onError = (err) => {
                    console.log("QQBanner广告 加载失败 : ", bannerAdUnitId);
                    console.log(err);
                    self.ryw_refreshBannerDis();
                    self.ryw_clearWXBaner();
                }
                self.ryw__wxBanner.onError(self._onError);
                self._onResize = (res) => {

                }
                self.ryw__wxBanner.onResize(self._onResize);
            }
            else  {
                self.ryw_refreshBannerDis();
            }
        }
    }
    
    public ryw_clearWXBaner()
    {
        if(this.ryw__wxBanner)
        {
            this.ryw__wxBanner.offLoad(this._onLoad);
            this.ryw__wxBanner.offError(this._onError);
            this.ryw__wxBanner.offResize(this._onResize);
            this.ryw__wxBanner.destroy();
        }
        this.ryw__wxBanner = null;
    }

    public onViewShow()
    {
        var banner = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_banner;
        if (1 == banner && null == this.ryw__wxBanner)
        {
            this.ryw_refreshWXBanner();
            let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.ryw_refreshWXBanner);
        }
        else
        {
            this.ryw_refreshBannerDis();
            let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.ryw_refreshBannerDis);
        }
    }

    public onViewHide()
    {
        this.ryw_clearWXBaner();
        Laya.timer.clearAll(this);
    }

    onDestroy()
    {
        this.ryw_clearWXBaner();
        Laya.timer.clearAll(this);
    }
}