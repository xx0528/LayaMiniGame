import KRQ__wcjtn_Com_wcjtn_Base from "./KRQ_ComBase";
import IView_wcjtn_State_wcjtn_Listener from "../../View/IViewStateListener";
import WX_wcjtn_API from "../../WXAPI";
import App_wcjtn_Switch_wcjtn_Config from "../../Config/AppSwitchConfig";
import _wcjtn_ShareAd_wcjtn_ from "../../ShareAd/ShareAd";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "../../QQMiniGameAPI";
import Wu_wcjtn_dian_wcjtn_Mgr from "../../Mgr/WudianMgr";

export default class KRQ_wcjtn__Banner_wcjtn_ extends KRQ__wcjtn_Com_wcjtn_Base implements IView_wcjtn_State_wcjtn_Listener
{
    public get _wcjtn_Clip_wcjtn_()
    {
        return this.owner as Laya.Clip;
    }
    protected _wx_wcjtn_Banner : any = null;

    protected _on_wcjtn_Load : Function = null;
    protected _on_wcjtn_Error : Function = null;
    protected _on_wcjtn_Resize : Function = null;

    protected _is_wcjtn_Creating : boolean = false;
    protected _is_wcjtn_Destroyed: boolean = false;
    protected _is_wcjtn_Hide: boolean = false;

    onAwake()
    {
        this.Ad_wcjtn_Pos_wcjtn_ID = _wcjtn_ShareAd_wcjtn_.Banner_wcjtn_AdLocationID;
    }

    onStart()
    {
        this.ref_wcjtn_resh();
    }

    onEnable()
    {
        this._wcjtn_Sprite_wcjtn_.on(Laya.Event.CLICK,this,this.on_wcjtn_Click_wcjtn_Ad)
    }

    onDisable()
    {
        this._wcjtn_Sprite_wcjtn_.off(Laya.Event.CLICK,this,this.on_wcjtn_Click_wcjtn_Ad)
    }

    protected on_wcjtn_Click_wcjtn_Ad()
    {
        this.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program();
    }

    public ref_wcjtn_resh(onComplate? : Function)
    {
        if (this._is_wcjtn_Destroyed)
            return;
        let banner = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().ba_wcjtn_nner;
        if (1 == banner)
        {
            this.refresh_wcjtn_WXBanner();
            if(Laya.Browser.onQQMiniGame && Wu_wcjtn_dian_wcjtn_Mgr.Get_wcjtn_Ip_wcjtn_Blocked())
            {
                let launchScene = QQ_wcjtn_Mini_wcjtn_GameAPI.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
                let noEnterBySearch: boolean = true;
                let wudianSceneList = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
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
                    let banner_wcjtn_Recreate_wcjtn_Time = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
                    Laya.timer.loop(banner_wcjtn_Recreate_wcjtn_Time * 1000,this,this.refresh_wcjtn_WXBanner);
                }
            }
        }
        else
        {
            this.refresh_wcjtn_Banner();
            if(Laya.Browser.onQQMiniGame && Wu_wcjtn_dian_wcjtn_Mgr.Get_wcjtn_Ip_wcjtn_Blocked())
            {
                let launchScene = QQ_wcjtn_Mini_wcjtn_GameAPI.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
                let noEnterBySearch: boolean = true;
                let wudianSceneList = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
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
                    let banner_wcjtn_Recreate_wcjtn_Time = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
                    Laya.timer.loop(banner_wcjtn_Recreate_wcjtn_Time * 1000,this,this.refresh_wcjtn_WXBanner);
                }
            }
        }
    }

    protected refresh_wcjtn_Banner()
    {        
        if(null == this._wcjtn_Sprite_wcjtn_ || !this._wcjtn_Sprite_wcjtn_.visible)
            return;
        if (this._is_wcjtn_Creating || this._is_wcjtn_Destroyed)
            return;
            this._is_wcjtn_Creating = true;
        super.ref_wcjtn_resh(() =>  {
            if(null != this._data)
            {
                let self = this;
                this._wcjtn_Sprite_wcjtn_.loadImage(this._data.logo,Laya.Handler.create(this,function()
                {
                    if(null != self._wcjtn_Sprite_wcjtn_ && !self._wcjtn_Sprite_wcjtn_.destroyed)
                    {
                        self._wcjtn_Sprite_wcjtn_.width = 600;
                        self._wcjtn_Sprite_wcjtn_.height = 205;
                    }
                }));
            }
            this._is_wcjtn_Creating = false;
        })
    }

    protected refresh_wcjtn_WXBanner()
    {
        if ((!Laya.Browser.onMiniGame && !Laya.Browser.onQQMiniGame) || null == this._wcjtn_Sprite_wcjtn_ || this._wcjtn_Sprite_wcjtn_.destroyed || !this._wcjtn_Sprite_wcjtn_.visible) {
            Laya.timer.clearAll(this);
            this.clear_wcjtn_WXBaner();
            return;
        }
        if (this._is_wcjtn_Creating || this._is_wcjtn_Destroyed || this._is_wcjtn_Hide)
            return;
        this.clear_wcjtn_WXBaner();
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
        let pos = this._wcjtn_Sprite_wcjtn_.localToGlobal(new Laya.Point(0,0))
        let width = 300;
        let scale = self._wcjtn_Sprite_wcjtn_.width / Laya.stage.width;
        let realWidth = sw * scale;
        let offset = (realWidth - width) / 2;
        let left = pos.x / Laya.stage.width * sw + offset;
        let top = pos.y / Laya.stage.height * sh;

        if(Laya.Browser.onMiniGame)
        {
            self._is_wcjtn_Creating = true;
            let recreateBannerIDList = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().recreate_wcjtn_Banner_wcjtn_IDList
            let bannerAdUnitId = recreateBannerIDList
            [
                Math.floor(Math.random() * recreateBannerIDList.length)
            ]
            if(null == bannerAdUnitId)
            {
                bannerAdUnitId = WX_wcjtn_API.banner_wcjtn_AdUnitId;
            }
            this._wx_wcjtn_Banner = Laya.Browser.window["wx"].createBannerAd(
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
            if(null != self._wx_wcjtn_Banner)
            {
                self._wx_wcjtn_Banner.onLoad((res) => {
                    console.log("KRQ  WXBanner广告 加载完成 : ", bannerAdUnitId);
                    console.log(res);
                    self._is_wcjtn_Creating = false;
                    if(self._is_wcjtn_Destroyed || null == self._wx_wcjtn_Banner || self._is_wcjtn_Hide)
                    {
                        self.clear_wcjtn_WXBaner();
                        return;
                    }
                    self._wx_wcjtn_Banner.show();
                })
                self._wx_wcjtn_Banner.onError((err) =>  {
                    console.log("KRQ WXBanner广告 加载失败 : ", bannerAdUnitId);
                    console.log(err);
                    self._is_wcjtn_Creating = false;
                    self.clear_wcjtn_WXBaner();
                    if(self._is_wcjtn_Destroyed || self._is_wcjtn_Hide)
                    {
                        return;
                    }
                    self.refresh_wcjtn_Banner();
                })
                self._wx_wcjtn_Banner.onResize(res => {
        
                  })
            }
            else
            {
                self.refresh_wcjtn_Banner();
            }
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            self._is_wcjtn_Creating = true;
            let recreateBannerIDList = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().recreate_wcjtn_Banner_wcjtn_IDList
            let bannerAdUnitId = recreateBannerIDList
            [
                Math.floor(Math.random() * recreateBannerIDList.length)
            ]
            if(null == bannerAdUnitId)
            {
                bannerAdUnitId = QQ_wcjtn_Mini_wcjtn_GameAPI.banner_wcjtn_AdUnitId;
            }
            self._wx_wcjtn_Banner = Laya.Browser.window["qq"].createBannerAd(
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
            if (null != self._wx_wcjtn_Banner)  {
                self._on_wcjtn_Load = (res) => {
                    console.log("KRQ QQBanner广告 加载完成 : ", bannerAdUnitId);
                    console.log(res);
                    self._is_wcjtn_Creating = false;
                    if(self._is_wcjtn_Destroyed || null == self._wx_wcjtn_Banner || self._is_wcjtn_Hide)
                    {
                        self.clear_wcjtn_WXBaner();
                        return;
                    }
                    self._wx_wcjtn_Banner.show();
                }
                self._wx_wcjtn_Banner.onLoad(self._on_wcjtn_Load);
                self._on_wcjtn_Error = (err) => {
                    console.log("KRQ QQBanner广告 加载失败 : ", bannerAdUnitId);
                    console.log(err);
                    self._is_wcjtn_Creating = false;
                    self.clear_wcjtn_WXBaner();
                    if(self._is_wcjtn_Destroyed || null == self._wx_wcjtn_Banner || self._is_wcjtn_Hide)
                    {
                        return;
                    }
                    self.refresh_wcjtn_Banner();
                }
                self._wx_wcjtn_Banner.onError(self._on_wcjtn_Error);
                self._on_wcjtn_Resize = (res) => {

                }
                self._wx_wcjtn_Banner.onResize(self._on_wcjtn_Resize);
            }
            else  {
                self.refresh_wcjtn_Banner();
            }
        }
    }
    
    protected clear_wcjtn_WXBaner()
    {
        if(this._wx_wcjtn_Banner)
        {
            this._wx_wcjtn_Banner.hide();
            this._wx_wcjtn_Banner.offLoad(this._on_wcjtn_Load);
            this._wx_wcjtn_Banner.offError(this._on_wcjtn_Error);
            this._wx_wcjtn_Banner.offResize(this._on_wcjtn_Resize);
            this._wx_wcjtn_Banner.destroy();
        }
        this._wx_wcjtn_Banner = null;
    }

    public onViewShow()
    {
        this._is_wcjtn_Hide = false;
        let banner = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().ba_wcjtn_nner;
        if (1 == banner)
        {
            if(null == this._wx_wcjtn_Banner)
            {
                this.refresh_wcjtn_WXBanner();
                if(Laya.Browser.onQQMiniGame && Wu_wcjtn_dian_wcjtn_Mgr.Get_wcjtn_Ip_wcjtn_Blocked())
                {
                    let launchScene = QQ_wcjtn_Mini_wcjtn_GameAPI.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
                    let noEnterBySearch: boolean = true;
                    let wudianSceneList = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
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
                        let banner_wcjtn_Recreate_wcjtn_Time = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
                        Laya.timer.loop(banner_wcjtn_Recreate_wcjtn_Time * 1000,this,this.refresh_wcjtn_WXBanner);
                    }
                }
            }
        }
        else
        {
            this.refresh_wcjtn_Banner();
            if(Laya.Browser.onQQMiniGame && Wu_wcjtn_dian_wcjtn_Mgr.Get_wcjtn_Ip_wcjtn_Blocked())
            {
                let launchScene = QQ_wcjtn_Mini_wcjtn_GameAPI.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
                let noEnterBySearch: boolean = true;
                let wudianSceneList = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
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
                    let banner_wcjtn_Recreate_wcjtn_Time = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
                    Laya.timer.loop(banner_wcjtn_Recreate_wcjtn_Time * 1000,this,this.refresh_wcjtn_WXBanner);
                }
            }
        }
    }

    public onViewHide()
    {
        this.clear_wcjtn_WXBaner();
        Laya.timer.clearAll(this);
        this._is_wcjtn_Hide = true;
    }

    onDestroy()
    {
        this.clear_wcjtn_WXBaner();
        Laya.timer.clearAll(this);
        this._is_wcjtn_Destroyed = true;
    }

    public _wcjtn_show_wcjtn_()
    {
        super._wcjtn_show_wcjtn_();
        this.onViewShow();
    }

    public _wcjtn_hide_wcjtn_()
    {
        super._wcjtn_hide_wcjtn_();
        this.onViewHide();
    }
}

