import Share_ppxhc_Ad from "../ShareAd";
import WXAPI_ from "../../WXAPI";
import ALD_ppxhc from "../../ALD";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import OPPO_ppxhc_API from "../../OPPOAPI";
import QQMiniGame_ppxhc_API from "../../QQMiniGameAPI";
import IViewStateListener_ppxhc_ from "../../View/IViewStateListener";
import WXAPI from "../../WXAPI";
import QQMiniGameAPI from "../../QQMiniGameAPI";

export default class Banner_ppxhc_AdView extends Laya.Script implements IViewStateListener_ppxhc_
{
    public AdPosID : number = Share_ppxhc_Ad.BannerAdLocationID_;
    protected _displaySp : Laya.Sprite;
    protected _data : any = null;

    public WXBannerWidth : number;
    protected _wxBanner : any = null;

    protected _onLoad : Function = null;
    protected _onError : Function = null;
    protected _onResize : Function = null;

    onAwake()
    {
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        if(null == this._displaySp)
        {
            this._displaySp = this.owner as Laya.Sprite;
        }
    }
    
    onEnable(): void 
    {
        this._displaySp.on(Laya.Event.CLICK,this,this.onSpClick);
        var banner = AppSwitchConfig.getInstance().getAppSwitchData().banner;
        if(0 == banner)
        {
            this.refreshBannerDis();
            let bannerRecreateTime = AppSwitchConfig.getInstance().getAppSwitchData().bannerRecreateTime;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.refreshBannerDis);
            
        }
        else if (1 == banner)
        {
            this.refreshWXBanner();
            let bannerRecreateTime = AppSwitchConfig.getInstance().getAppSwitchData().bannerRecreateTime;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.refreshWXBanner);
        }
    }

    onDisable(): void 
    {
        this._displaySp.off(Laya.Event.CLICK,this,this.onSpClick);
        this.clearWXBaner();
    }

    protected refreshBannerDis()
    {
        var self = this;
        Share_ppxhc_Ad.getADVs_(this.AdPosID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._displaySp.loadImage(data.logo,Laya.Handler.create(self,function()
                {
                    if(!self._displaySp.destroyed)
                    {
                        self._displaySp.width = 750;
                        self._displaySp.height = 256;
                    }
                }));
                self._data = data;
            }
        },false)
    }

    protected onSpClick()
    {
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
            else if (Laya.Browser.onQQMiniGame)  //qq小游戏
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

    protected refreshWXBanner()
    {
        if((!Laya.Browser.onMiniGame && !Laya.Browser.onQQMiniGame)
            || !(this.owner as Laya.Sprite).visible)
            return;
        this.clearWXBaner();
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
        var pos = this._displaySp.localToGlobal(new Laya.Point(0,0))

        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WXBannerWidth ? this.WXBannerWidth / Laya.stage.width * sw : sw;

        if(Laya.Browser.onMiniGame)
        {
            let recreateBannerIDList = AppSwitchConfig.getInstance().getAppSwitchData().recreateBannerIDList
            let bannerAdUnitId = recreateBannerIDList
            [
                Math.floor(Math.random() * recreateBannerIDList.length)
            ]
            if(null == bannerAdUnitId)
            {
                bannerAdUnitId = WXAPI.bannerAdUnitId;
            }
            self._wxBanner = Laya.Browser.window["wx"].createBannerAd(
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
                self._wxBanner.onLoad((res) =>  {
                console.log("WXBanner广告 加载完成");
                console.log(res);
            })
            self._wxBanner.onError((err) =>  {
                console.log("WXBanner广告 加载失败");
                console.log(err);
                self.refreshBannerDis();
                self.clearWXBaner();
            })
            self._wxBanner.onResize(res => {

              })
            self._wxBanner.show();
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            let recreateBannerIDList = AppSwitchConfig.getInstance().getAppSwitchData().recreateBannerIDList
            let bannerAdUnitId = recreateBannerIDList
            [
                Math.floor(Math.random() * recreateBannerIDList.length)
            ]
            if(null == bannerAdUnitId)
            {
                bannerAdUnitId = QQMiniGameAPI.bannerAdUnitId;
            }
            self._wxBanner = Laya.Browser.window["qq"].createBannerAd(
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
            if (null != self._wxBanner)  {
                self._onLoad = (res) => {
                    console.log("QQBanner广告 加载完成 : ", bannerAdUnitId);
                    console.log(res);
                    self._wxBanner.show();
                }
                self._wxBanner.onLoad(self._onLoad);
                self._onError = (err) => {
                    console.log("QQBanner广告 加载失败 : ", bannerAdUnitId);
                    console.log(err);
                    self.refreshBannerDis();
                    self.clearWXBaner();
                }
                self._wxBanner.onError(self._onError);
                self._onResize = (res) => {

                }
                self._wxBanner.onResize(self._onResize);
            }
            else  {
                self.refreshBannerDis();
            }
        }
    }
    
    public clearWXBaner()
    {
        if(this._wxBanner)
        {
            this._wxBanner.offLoad(this._onLoad);
            this._wxBanner.offError(this._onError);
            this._wxBanner.offResize(this._onResize);
            this._wxBanner.destroy();
        }
        this._wxBanner = null;
    }

    public onViewShow()
    {
        var banner = AppSwitchConfig.getInstance().getAppSwitchData().banner;
        if (1 == banner && null == this._wxBanner)
        {
            this.refreshWXBanner();
            let bannerRecreateTime = AppSwitchConfig.getInstance().getAppSwitchData().bannerRecreateTime;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.refreshWXBanner);
        }
        else
        {
            this.refreshBannerDis();
            let bannerRecreateTime = AppSwitchConfig.getInstance().getAppSwitchData().bannerRecreateTime;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.refreshBannerDis);
        }
    }

    public onViewHide()
    {
        this.clearWXBaner();
        Laya.timer.clearAll(this);
    }

    onDestroy()
    {
        this.clearWXBaner();
        Laya.timer.clearAll(this);
    }
}