import ryw_KRQ_ComBase from "./KRQ_ComBase";
import IViewStateListener from "../../View/IViewStateListener";
import ryw_WXAPI from "../../WXAPI";
import ryw_AppSwitchConfig from "../../Config/AppSwitchConfig";
import ryw_ShareAd from "../../ShareAd/ShareAd";
import ryw_QQMiniGameAPI from "../../QQMiniGameAPI";
import ryw_WudianMgr from "../../Mgr/WudianMgr";

export default class ryw_KRQ_Banner extends ryw_KRQ_ComBase implements IViewStateListener
{
    public get ryw_Clip()
    {
        return this.owner as Laya.Clip;
    }
    protected ryw__wxBanner : any = null;

    protected ryw__onLoad : Function = null;
    protected ryw__onError : Function = null;
    protected ryw__onResize : Function = null;

    protected ryw__isCreating : boolean = false;
    protected ryw__isDestroyed: boolean = false;
    protected ryw__isHide: boolean = false;

    public onGetWXBanner(){
        return  this.ryw__wxBanner;
    }
    
    onAwake()
    {
        this.ryw_AdPosID = ryw_ShareAd.ryw_BannerAdLocationID;
    }

    onStart()
    {
        this.ryw_refresh();
    }

    onEnable()
    {
        this.ryw_Sprite.on(Laya.Event.CLICK,this,this.ryw_onClickAd)
    }

    onDisable()
    {
        this.ryw_Sprite.off(Laya.Event.CLICK,this,this.ryw_onClickAd)
    }

    protected ryw_onClickAd()
    {
        this.ryw_navigateToMiniProgram();
    }

    public ryw_refresh(onComplate? : Function)
    {
        if (this.ryw__isDestroyed)
            return;
        let banner = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_banner;
        if (1 == banner)
        {
            this.ryw_refreshWXBanner();
            if(Laya.Browser.onQQMiniGame && ryw_WudianMgr.ryw_GetIpBlocked())
            {
                let launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
                let noEnterBySearch: boolean = true;
                let wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
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
                    let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
                    Laya.timer.loop(bannerRecreateTime * 1000,this,this.ryw_refreshWXBanner);
                }
            }
        }
        else
        {
            this.ryw_refreshBanner();
            if(Laya.Browser.onQQMiniGame && ryw_WudianMgr.ryw_GetIpBlocked())
            {
                let launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
                let noEnterBySearch: boolean = true;
                let wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
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
                    let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
                    Laya.timer.loop(bannerRecreateTime * 1000,this,this.ryw_refreshWXBanner);
                }
            }
        }
    }

    protected ryw_refreshBanner()
    {        
        if(null == this.ryw_Sprite || !this.ryw_Sprite.visible)
            return;
        if (this.ryw__isCreating || this.ryw__isDestroyed)
            return;
            this.ryw__isCreating = true;
        super.ryw_refresh(() =>  {
            if(null != this.ryw__data)
            {
                let self = this;
                this.ryw_Sprite.loadImage(this.ryw__data.logo,Laya.Handler.create(this,function()
                {
                    if(null != self.ryw_Sprite && !self.ryw_Sprite.destroyed)
                    {
                        self.ryw_Sprite.width = 600;
                        self.ryw_Sprite.height = 205;
                    }
                }));
            }
            this.ryw__isCreating = false;
        })
    }

    protected ryw_refreshWXBanner()
    {
        if ((!Laya.Browser.onMiniGame && !Laya.Browser.onQQMiniGame) || null == this.ryw_Sprite || this.ryw_Sprite.destroyed || !this.ryw_Sprite.visible) {
            Laya.timer.clearAll(this);
            this.ryw_clearWXBaner();
            return;
        }
        if (this.ryw__isCreating || this.ryw__isDestroyed || this.ryw__isHide)
            return;
        this.ryw_clearWXBaner();
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
        let pos = this.ryw_Sprite.localToGlobal(new Laya.Point(0,0))
        let width = 300;
        let scale = self.ryw_Sprite.width / Laya.stage.width;
        let realWidth = sw * scale;
        let offset = (realWidth - width) / 2;
        let left = pos.x / Laya.stage.width * sw + offset;
        let top = pos.y / Laya.stage.height * sh;

        if(Laya.Browser.onMiniGame)
        {
            self.ryw__isCreating = true;
            let recreateBannerIDList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_recreateBannerIDList
            let bannerAdUnitId = recreateBannerIDList
            [
                Math.floor(Math.random() * recreateBannerIDList.length)
            ]
            if(null == bannerAdUnitId)
            {
                bannerAdUnitId = ryw_WXAPI.ryw_bannerAdUnitId;
            }
            this.ryw__wxBanner = Laya.Browser.window["wx"].createBannerAd(
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
            if(null != self.ryw__wxBanner)
            {
                self.ryw__wxBanner.onLoad((res) => {
                    console.log("KRQ  WXBanner广告 加载完成 : ", bannerAdUnitId);
                    console.log(res);
                    self.ryw__isCreating = false;
                    if(self.ryw__isDestroyed || null == self.ryw__wxBanner || self.ryw__isHide)
                    {
                        self.ryw_clearWXBaner();
                        return;
                    }
                    self.ryw__wxBanner.show();
                })
                self.ryw__wxBanner.onError((err) =>  {
                    console.log("KRQ WXBanner广告 加载失败 : ", bannerAdUnitId);
                    console.log(err);
                    self.ryw__isCreating = false;
                    self.ryw_clearWXBaner();
                    if(self.ryw__isDestroyed || self.ryw__isHide)
                    {
                        return;
                    }
                    self.ryw_refreshBanner();
                })
                self.ryw__wxBanner.onResize(res => {
        
                  })
            }
            else
            {
                self.ryw_refreshBanner();
            }
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            self.ryw__isCreating = true;
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
                self.ryw__onLoad = (res) => {
                    console.log("KRQ QQBanner广告 加载完成 : ", bannerAdUnitId);
                    console.log(res);
                    self.ryw__isCreating = false;
                    if(self.ryw__isDestroyed || null == self.ryw__wxBanner || self.ryw__isHide)
                    {
                        self.ryw_clearWXBaner();
                        return;
                    }
                    self.ryw__wxBanner.show();
                }
                self.ryw__wxBanner.onLoad(self.ryw__onLoad);
                self.ryw__onError = (err) => {
                    console.log("KRQ QQBanner广告 加载失败 : ", bannerAdUnitId);
                    console.log(err);
                    self.ryw__isCreating = false;
                    self.ryw_clearWXBaner();
                    if(self.ryw__isDestroyed || null == self.ryw__wxBanner || self.ryw__isHide)
                    {
                        return;
                    }
                    self.ryw_refreshBanner();
                }
                self.ryw__wxBanner.onError(self.ryw__onError);
                self.ryw__onResize = (res) => {

                }
                self.ryw__wxBanner.onResize(self.ryw__onResize);
            }
            else  {
                self.ryw_refreshBanner();
            }
        }
    }
    
    protected ryw_clearWXBaner()
    {
        if(this.ryw__wxBanner)
        {
            this.ryw__wxBanner.hide();
            this.ryw__wxBanner.offLoad(this.ryw__onLoad);
            this.ryw__wxBanner.offError(this.ryw__onError);
            this.ryw__wxBanner.offResize(this.ryw__onResize);
            this.ryw__wxBanner.destroy();
        }
        this.ryw__wxBanner = null;
    }

    public onViewShow()
    {
        this.ryw__isHide = false;
        let banner = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_banner;
        if (1 == banner)
        {
            if(null == this.ryw__wxBanner)
            {
                this.ryw_refreshWXBanner();
                if(Laya.Browser.onQQMiniGame && ryw_WudianMgr.ryw_GetIpBlocked())
                {
                    let launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
                    let noEnterBySearch: boolean = true;
                    let wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
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
                        let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
                        Laya.timer.loop(bannerRecreateTime * 1000,this,this.ryw_refreshWXBanner);
                    }
                }
            }
        }
        else
        {
            this.ryw_refreshBanner();
            if(Laya.Browser.onQQMiniGame && ryw_WudianMgr.ryw_GetIpBlocked())
            {
                let launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
                let noEnterBySearch: boolean = true;
                let wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
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
                    let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
                    Laya.timer.loop(bannerRecreateTime * 1000,this,this.ryw_refreshWXBanner);
                }
            }
        }
    }

    public onViewHide()
    {
        this.ryw_clearWXBaner();
        Laya.timer.clearAll(this);
        this.ryw__isHide = true;
    }

    onDestroy()
    {
        this.ryw_clearWXBaner();
        Laya.timer.clearAll(this);
        this.ryw__isDestroyed = true;
    }

    public ryw_show()
    {
        super.ryw_show();
        this.onViewShow();
    }

    public ryw_hide()
    {
        super.ryw_hide();
        this.onViewHide();
    }
}

