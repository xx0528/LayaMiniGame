import KRQ_ppxhc_ComBase from "./KRQ_ComBase";
import IViewStateListener_ppxhc_ from "../../View/IViewStateListener";
import WXAPI_ from "../../WXAPI";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import Share_ppxhc_Ad from "../../ShareAd/ShareAd";
import QQMiniGameAPI from "../../QQMiniGameAPI";
import WudianMgr from "../../Mgr/WudianMgr";

export default class KRQ_ppxhc_Banner extends KRQ_ppxhc_ComBase implements IViewStateListener_ppxhc_
{
    public get Clip()
    {
        return this.owner as Laya.Clip;
    }
    protected _wxBanner_ppxhc_ : any = null;

    protected _onLoad_ppxhc_ : Function = null;
    protected _onError_ppxhc_ : Function = null;
    protected _onResize_ppxhc_ : Function = null;

    protected _isCreating_ppxhc_ : boolean = false;
    protected _isDestroyed_ppxhc_: boolean = false;
    protected _isHide_ppxhc_: boolean = false;

    onAwake()
    {
        this.AdPos_ppxhc_ID = Share_ppxhc_Ad.BannerAdLocationID_;
    }

    onStart()
    {
        this.refresh();
    }

    onEnable()
    {
        this.Sprite.on(Laya.Event.CLICK,this,this.onClickAd)
    }

    onDisable()
    {
        this.Sprite.off(Laya.Event.CLICK,this,this.onClickAd)
    }

    protected onClickAd()
    {
        this.navigateToMiniProgram_ppxhc();
    }

    public refresh(onComplate? : Function)
    {
        if (this._isDestroyed_ppxhc_)
            return;
        let banner = AppSwitchConfig.getInstance().getAppSwitchData().banner;
        if (1 == banner)
        {
            this.refreshWXBanner();
            if(Laya.Browser.onQQMiniGame && WudianMgr.GetIp_ppxhc_Blocked())
            {
                let launchScene = QQMiniGameAPI.getLaunchOptionsSync().scene;
                let noEnterBySearch: boolean = true;
                let wudianSceneList = AppSwitchConfig.getInstance().getAppSwitchData().wudianSceneList;
                for (let i = 0; i < wudianSceneList.length; ++i)  
                {
                    let wudianSceneValue = wudianSceneList[i];
                    if(launchScene == wudianSceneValue)
                    {
                        noEnterBySearch = false;
                    }
                }
                if(noEnterBySearch)
                {
                    let bannerRecreateTime = AppSwitchConfig.getInstance().getAppSwitchData().bannerRecreateTime;
                    Laya.timer.loop(bannerRecreateTime * 1000,this,this.refreshWXBanner);
                }
            }
        }
        else
        {
            this.refreshBanner();
            if(Laya.Browser.onQQMiniGame && WudianMgr.GetIp_ppxhc_Blocked())
            {
                let launchScene = QQMiniGameAPI.getLaunchOptionsSync().scene;
                let noEnterBySearch: boolean = true;
                let wudianSceneList = AppSwitchConfig.getInstance().getAppSwitchData().wudianSceneList;
                for (let i = 0; i < wudianSceneList.length; ++i)  
                {
                    let wudianSceneValue = wudianSceneList[i];
                    if(launchScene == wudianSceneValue)
                    {
                        noEnterBySearch = false;
                    }
                }
                if(noEnterBySearch)
                {
                    let bannerRecreateTime = AppSwitchConfig.getInstance().getAppSwitchData().bannerRecreateTime;
                    Laya.timer.loop(bannerRecreateTime * 1000,this,this.refreshWXBanner);
                }
            }
        }
    }

    protected refreshBanner()
    {        
        if(null == this.Sprite || !this.Sprite.visible)
            return;
        if (this._isCreating_ppxhc_ || this._isDestroyed_ppxhc_)
            return;
            this._isCreating_ppxhc_ = true;
        super.refresh_ppxhc(() =>  {
            if(null != this._data)
            {
                let self = this;
                this.Sprite.loadImage(this._data.logo,Laya.Handler.create(this,function()
                {
                    if(null != self.Sprite && !self.Sprite.destroyed)
                    {
                        self.Sprite.width = 600;
                        self.Sprite.height = 205;
                    }
                }));
            }
            this._isCreating_ppxhc_ = false;
        })
    }

    protected refreshWXBanner()
    {
        if ((!Laya.Browser.onMiniGame && !Laya.Browser.onQQMiniGame) || null == this.Sprite || this.Sprite.destroyed || !this.Sprite.visible) {
            Laya.timer.clearAll(this);
            this.clearWXBaner();
            return;
        }
        if (this._isCreating_ppxhc_ || this._isDestroyed_ppxhc_ || this._isHide_ppxhc_)
            return;
        this.clearWXBaner();
        let self = this;
        let sysInfo = null;
        if(Laya.Browser.onMiniGame)
        {
            sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        }
        else if (Laya.Browser.onQQMiniGame)
        {
            sysInfo = Laya.Browser.window["qq"].getSystemInfoSync();
        }
        let sw = sysInfo.screenWidth;
        let sh = sysInfo.screenHeight;
        let pos = this.Sprite.localToGlobal(new Laya.Point(0,0))
        let width = 300;
        let scale = self.Sprite.width / Laya.stage.width;
        let realWidth = sw * scale;
        let offset = (realWidth - width) / 2;
        let left = pos.x / Laya.stage.width * sw + offset;
        let top = pos.y / Laya.stage.height * sh;

        if(Laya.Browser.onMiniGame)
        {
            self._isCreating_ppxhc_ = true;
            let recreateBannerIDList = AppSwitchConfig.getInstance().getAppSwitchData().recreateBannerIDList
            let bannerAdUnitId = recreateBannerIDList
            [
                Math.floor(Math.random() * recreateBannerIDList.length)
            ]
            if(null == bannerAdUnitId)
            {
                bannerAdUnitId = WXAPI_.bannerAdUnitId;
            }
            this._wxBanner_ppxhc_ = Laya.Browser.window["wx"].createBannerAd(
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
            if(null != self._wxBanner_ppxhc_)
            {
                self._wxBanner_ppxhc_.onLoad((res) => {
                    console.log("KRQ  WXBanner广告 加载完成 : ", bannerAdUnitId);
                    console.log(res);
                    self._isCreating_ppxhc_ = false;
                    if(self._isDestroyed_ppxhc_ || null == self._wxBanner_ppxhc_ || self._isHide_ppxhc_)
                    {
                        self.clearWXBaner();
                        return;
                    }
                    self._wxBanner_ppxhc_.show();
                })
                self._wxBanner_ppxhc_.onError((err) =>  {
                    console.log("KRQ WXBanner广告 加载失败 : ", bannerAdUnitId);
                    console.log(err);
                    self._isCreating_ppxhc_ = false;
                    self.clearWXBaner();
                    if(self._isDestroyed_ppxhc_ || self._isHide_ppxhc_)
                    {
                        return;
                    }
                    self.refreshBanner();
                })
                self._wxBanner_ppxhc_.onResize(res => {
        
                  })
            }
            else
            {
                self.refreshBanner();
            }
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            self._isCreating_ppxhc_ = true;
            let recreateBannerIDList = AppSwitchConfig.getInstance().getAppSwitchData().recreateBannerIDList
            let bannerAdUnitId = recreateBannerIDList
            [
                Math.floor(Math.random() * recreateBannerIDList.length)
            ]
            if(null == bannerAdUnitId)
            {
                bannerAdUnitId = QQMiniGameAPI.bannerAdUnitId;
            }
            self._wxBanner_ppxhc_ = Laya.Browser.window["qq"].createBannerAd(
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
            if (null != self._wxBanner_ppxhc_)  {
                self._onLoad_ppxhc_ = (res) => {
                    console.log("KRQ QQBanner广告 加载完成 : ", bannerAdUnitId);
                    console.log(res);
                    self._isCreating_ppxhc_ = false;
                    if(self._isDestroyed_ppxhc_ || null == self._wxBanner_ppxhc_ || self._isHide_ppxhc_)
                    {
                        self.clearWXBaner();
                        return;
                    }
                    self._wxBanner_ppxhc_.show();
                }
                self._wxBanner_ppxhc_.onLoad(self._onLoad_ppxhc_);
                self._onError_ppxhc_ = (err) => {
                    console.log("KRQ QQBanner广告 加载失败 : ", bannerAdUnitId);
                    console.log(err);
                    self._isCreating_ppxhc_ = false;
                    self.clearWXBaner();
                    if(self._isDestroyed_ppxhc_ || null == self._wxBanner_ppxhc_ || self._isHide_ppxhc_)
                    {
                        return;
                    }
                    self.refreshBanner();
                }
                self._wxBanner_ppxhc_.onError(self._onError_ppxhc_);
                self._onResize_ppxhc_ = (res) => {

                }
                self._wxBanner_ppxhc_.onResize(self._onResize_ppxhc_);
            }
            else  {
                self.refreshBanner();
            }
        }
    }
    
    protected clearWXBaner()
    {
        if(this._wxBanner_ppxhc_)
        {
            this._wxBanner_ppxhc_.hide();
            this._wxBanner_ppxhc_.offLoad(this._onLoad_ppxhc_);
            this._wxBanner_ppxhc_.offError(this._onError_ppxhc_);
            this._wxBanner_ppxhc_.offResize(this._onResize_ppxhc_);
            this._wxBanner_ppxhc_.destroy();
        }
        this._wxBanner_ppxhc_ = null;
    }

    public onViewShow()
    {
        this._isHide_ppxhc_ = false;
        let banner = AppSwitchConfig.getInstance().getAppSwitchData().banner;
        if (1 == banner)
        {
            if(null == this._wxBanner_ppxhc_)
            {
                this.refreshWXBanner();
                if(Laya.Browser.onQQMiniGame && WudianMgr.GetIp_ppxhc_Blocked())
                {
                    let launchScene = QQMiniGameAPI.getLaunchOptionsSync().scene;
                    let noEnterBySearch: boolean = true;
                    let wudianSceneList = AppSwitchConfig.getInstance().getAppSwitchData().wudianSceneList;
                    for (let i = 0; i < wudianSceneList.length; ++i)  
                    {
                        let wudianSceneValue = wudianSceneList[i];
                        if(launchScene == wudianSceneValue)
                        {
                            noEnterBySearch = false;
                        }
                    }
                    if(noEnterBySearch)
                    {
                        let bannerRecreateTime = AppSwitchConfig.getInstance().getAppSwitchData().bannerRecreateTime;
                        Laya.timer.loop(bannerRecreateTime * 1000,this,this.refreshWXBanner);
                    }
                }
            }
        }
        else
        {
            this.refreshBanner();
            if(Laya.Browser.onQQMiniGame && WudianMgr.GetIp_ppxhc_Blocked())
            {
                let launchScene = QQMiniGameAPI.getLaunchOptionsSync().scene;
                let noEnterBySearch: boolean = true;
                let wudianSceneList = AppSwitchConfig.getInstance().getAppSwitchData().wudianSceneList;
                for (let i = 0; i < wudianSceneList.length; ++i)  
                {
                    let wudianSceneValue = wudianSceneList[i];
                    if(launchScene == wudianSceneValue)
                    {
                        noEnterBySearch = false;
                    }
                }
                if(noEnterBySearch)
                {
                    let bannerRecreateTime = AppSwitchConfig.getInstance().getAppSwitchData().bannerRecreateTime;
                    Laya.timer.loop(bannerRecreateTime * 1000,this,this.refreshWXBanner);
                }
            }
        }
    }

    public onViewHide()
    {
        this.clearWXBaner();
        Laya.timer.clearAll(this);
        this._isHide_ppxhc_ = true;
    }

    onDestroy()
    {
        this.clearWXBaner();
        Laya.timer.clearAll(this);
        this._isDestroyed_ppxhc_ = true;
    }

    public show()
    {
        super.show();
        this.onViewShow();
    }

    public hide()
    {
        super.hide();
        this.onViewHide();
    }
}

