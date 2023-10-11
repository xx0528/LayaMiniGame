import KRQ_ComBase from "./KRQ_ComBase";
import IViewStateListener from "../../View/IViewStateListener";
import WXAPI from "../../WXAPI";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import ShareAd from "../../ShareAd/ShareAd";
import QQMiniGameAPI from "../../QQMiniGameAPI";
import WudianMgr from "../../Mgr/WudianMgr";

export default class KRQ_Banner extends KRQ_ComBase implements IViewStateListener
{
    public get Clip()
    {
        return this.owner as Laya.Clip;
    }
    protected _wxBanner : any = null;

    protected _onLoad : Function = null;
    protected _onError : Function = null;
    protected _onResize : Function = null;

    protected _isCreating : boolean = false;
    protected _isDestroyed: boolean = false;
    protected _isHide: boolean = false;

    onAwake()
    {
        this.AdPosID = ShareAd.BannerAdLocationID;
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
        this.navigateToMiniProgram();
    }

    public refresh(onComplate? : Function)
    {
        if (this._isDestroyed)
            return;
        let banner = AppSwitchConfig.getInstance().getAppSwitchData().banner;
        if (1 == banner)
        {
            this.refreshWXBanner();
            if(Laya.Browser.onQQMiniGame && WudianMgr.GetIpBlocked())
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
            if(Laya.Browser.onQQMiniGame && WudianMgr.GetIpBlocked())
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
        if (this._isCreating || this._isDestroyed)
            return;
            this._isCreating = true;
        super.refresh(() =>  {
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
            this._isCreating = false;
        })
    }

    protected refreshWXBanner()
    {
        if ((!Laya.Browser.onMiniGame && !Laya.Browser.onQQMiniGame) || null == this.Sprite || this.Sprite.destroyed || !this.Sprite.visible) {
            Laya.timer.clearAll(this);
            this.clearWXBaner();
            return;
        }
        if (this._isCreating || this._isDestroyed || this._isHide)
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
            self._isCreating = true;
            let recreateBannerIDList = AppSwitchConfig.getInstance().getAppSwitchData().recreateBannerIDList
            let bannerAdUnitId = recreateBannerIDList
            [
                Math.floor(Math.random() * recreateBannerIDList.length)
            ]
            if(null == bannerAdUnitId)
            {
                bannerAdUnitId = WXAPI.bannerAdUnitId;
            }
            this._wxBanner = Laya.Browser.window["wx"].createBannerAd(
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
            if(null != self._wxBanner)
            {
                self._wxBanner.onLoad((res) => {
                    console.log("KRQ  WXBanner广告 加载完成 : ", bannerAdUnitId);
                    console.log(res);
                    self._isCreating = false;
                    if(self._isDestroyed || null == self._wxBanner || self._isHide)
                    {
                        self.clearWXBaner();
                        return;
                    }
                    self._wxBanner.show();
                })
                self._wxBanner.onError((err) =>  {
                    console.log("KRQ WXBanner广告 加载失败 : ", bannerAdUnitId);
                    console.log(err);
                    self._isCreating = false;
                    self.clearWXBaner();
                    if(self._isDestroyed || self._isHide)
                    {
                        return;
                    }
                    self.refreshBanner();
                })
                self._wxBanner.onResize(res => {
        
                  })
            }
            else
            {
                self.refreshBanner();
            }
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            self._isCreating = true;
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
                    console.log("KRQ QQBanner广告 加载完成 : ", bannerAdUnitId);
                    console.log(res);
                    self._isCreating = false;
                    if(self._isDestroyed || null == self._wxBanner || self._isHide)
                    {
                        self.clearWXBaner();
                        return;
                    }
                    self._wxBanner.show();
                }
                self._wxBanner.onLoad(self._onLoad);
                self._onError = (err) => {
                    console.log("KRQ QQBanner广告 加载失败 : ", bannerAdUnitId);
                    console.log(err);
                    self._isCreating = false;
                    self.clearWXBaner();
                    if(self._isDestroyed || null == self._wxBanner || self._isHide)
                    {
                        return;
                    }
                    self.refreshBanner();
                }
                self._wxBanner.onError(self._onError);
                self._onResize = (res) => {

                }
                self._wxBanner.onResize(self._onResize);
            }
            else  {
                self.refreshBanner();
            }
        }
    }
    
    protected clearWXBaner()
    {
        if(this._wxBanner)
        {
            this._wxBanner.hide();
            this._wxBanner.offLoad(this._onLoad);
            this._wxBanner.offError(this._onError);
            this._wxBanner.offResize(this._onResize);
            this._wxBanner.destroy();
        }
        this._wxBanner = null;
    }

    public onViewShow()
    {
        this._isHide = false;
        let banner = AppSwitchConfig.getInstance().getAppSwitchData().banner;
        if (1 == banner)
        {
            if(null == this._wxBanner)
            {
                this.refreshWXBanner();
                if(Laya.Browser.onQQMiniGame && WudianMgr.GetIpBlocked())
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
            if(Laya.Browser.onQQMiniGame && WudianMgr.GetIpBlocked())
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
        this._isHide = true;
    }

    onDestroy()
    {
        this.clearWXBaner();
        Laya.timer.clearAll(this);
        this._isDestroyed = true;
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

