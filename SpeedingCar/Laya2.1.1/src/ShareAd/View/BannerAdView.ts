import _wcjtn_ShareAd_wcjtn_ from "../ShareAd";
import WX_wcjtn_API from "../../WXAPI";
import ALD from "../../ALD";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import App_wcjtn_Switch_wcjtn_Config from "../../Config/AppSwitchConfig";
import OPPO_wcjtn_API from "../../OPPOAPI";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "../../QQMiniGameAPI";
import IView_wcjtn_State_wcjtn_Listener from "../../View/IViewStateListener";

export default class Banner_wcjtn_Ad_wcjtn_View extends Laya.Script implements IView_wcjtn_State_wcjtn_Listener
{
    public Ad_wcjtn_Pos_wcjtn_ID : number = _wcjtn_ShareAd_wcjtn_.Banner_wcjtn_AdLocationID;
    protected _display_wcjtn_Sp : Laya.Sprite;
    protected _data_wcjtn_ : any = null;

    public WX_wcjtn_Banner_wcjtn_Width : number;
    protected _wx_wcjtn_Banner : any = null;

    protected _onLoad : Function = null;
    protected _onError : Function = null;
    protected _onResize : Function = null;

    onAwake()
    {
        this._display_wcjtn_Sp = this.owner.getChildByName("Display") as Laya.Sprite;
        if(null == this._display_wcjtn_Sp)
        {
            this._display_wcjtn_Sp = this.owner as Laya.Sprite;
        }
    }
    
    onEnable(): void 
    {
        this._display_wcjtn_Sp.on(Laya.Event.CLICK,this,this.on_wcjtn_Sp_wcjtn_Click);
        var banner = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().ba_wcjtn_nner;
        if(0 == banner)
        {
            this.refresh_wcjtn_Banner_wcjtn_Dis();
            let bannerRecreateTime = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.refresh_wcjtn_Banner_wcjtn_Dis);
            
        }
        else if (1 == banner)
        {
            this.refresh_wcjtn_Banner_wcjtn_Dis();
            let bannerRecreateTime = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.refresh_wcjtn_Banner_wcjtn_Dis);
        }
    }

    onDisable(): void 
    {
        this._display_wcjtn_Sp.off(Laya.Event.CLICK,this,this.on_wcjtn_Sp_wcjtn_Click);
        this.clear_wcjtn_WXBaner();
    }

    protected refresh_wcjtn_Banner_wcjtn_Dis()
    {
        var self = this;
        _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._display_wcjtn_Sp.loadImage(data.logo,Laya.Handler.create(self,function()
                {
                    if(!self._display_wcjtn_Sp.destroyed)
                    {
                        self._display_wcjtn_Sp.width = 750;
                        self._display_wcjtn_Sp.height = 256;
                    }
                }));
                self._data_wcjtn_ = data;
            }
        },false)
    }

    protected on_wcjtn_Sp_wcjtn_Click()
    {
        var data = this._data_wcjtn_;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                WX_wcjtn_API.navigate_wcjtn_To_wcjtn_MiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    _wcjtn_ShareAd_wcjtn_.report_wcjtn_User_wcjtn_Click(data.appid);
                    ALD.ald_wcjtn_Send_wcjtn_ReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        ALD.aldSend_wcjtn_ReportAd_wcjtn_ClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPPO_wcjtn_API.navigate_wcjtn_To_wcjtn_MiniProgram(data.appid,data.title,data.url,(res)=>
                {
                    console.log("跳转成功")
                    _wcjtn_ShareAd_wcjtn_.report_wcjtn_User_wcjtn_Click(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame)  //qq小游戏
            {
                QQ_wcjtn_Mini_wcjtn_GameAPI.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    _wcjtn_ShareAd_wcjtn_.report_wcjtn_User_wcjtn_Click(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }

    protected refresh_wcjtn_WXBanner()
    {
        if((!Laya.Browser.onMiniGame && !Laya.Browser.onQQMiniGame)
            || !(this.owner as Laya.Sprite).visible)
            return;
        this.clear_wcjtn_WXBaner();
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
        var pos = this._display_wcjtn_Sp.localToGlobal(new Laya.Point(0,0))

        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WX_wcjtn_Banner_wcjtn_Width ? this.WX_wcjtn_Banner_wcjtn_Width / Laya.stage.width * sw : sw;

        if(Laya.Browser.onMiniGame)
        {
            let recreateBannerIDList = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().recreate_wcjtn_Banner_wcjtn_IDList
            let bannerAdUnitId = recreateBannerIDList
            [
                Math.floor(Math.random() * recreateBannerIDList.length)
            ]
            if(null == bannerAdUnitId)
            {
                bannerAdUnitId = WX_wcjtn_API.banner_wcjtn_AdUnitId;
            }
            self._wx_wcjtn_Banner = Laya.Browser.window["wx"].createBannerAd(
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
                self._wx_wcjtn_Banner.onLoad((res) =>  {
                console.log("WXBanner广告 加载完成");
                console.log(res);
            })
            self._wx_wcjtn_Banner.onError((err) =>  {
                console.log("WXBanner广告 加载失败");
                console.log(err);
                self.refresh_wcjtn_Banner_wcjtn_Dis();
                self.clear_wcjtn_WXBaner();
            })
            self._wx_wcjtn_Banner.onResize(res => {

              })
            self._wx_wcjtn_Banner.show();
        }
        else if(Laya.Browser.onQQMiniGame)
        {
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
                self._onLoad = (res) => {
                    console.log("QQBanner广告 加载完成 : ", bannerAdUnitId);
                    console.log(res);
                    self._wx_wcjtn_Banner.show();
                }
                self._wx_wcjtn_Banner.onLoad(self._onLoad);
                self._onError = (err) => {
                    console.log("QQBanner广告 加载失败 : ", bannerAdUnitId);
                    console.log(err);
                    self.refresh_wcjtn_Banner_wcjtn_Dis();
                    self.clear_wcjtn_WXBaner();
                }
                self._wx_wcjtn_Banner.onError(self._onError);
                self._onResize = (res) => {

                }
                self._wx_wcjtn_Banner.onResize(self._onResize);
            }
            else  {
                self.refresh_wcjtn_Banner_wcjtn_Dis();
            }
        }
    }
    
    public clear_wcjtn_WXBaner()
    {
        if(this._wx_wcjtn_Banner)
        {
            this._wx_wcjtn_Banner.offLoad(this._onLoad);
            this._wx_wcjtn_Banner.offError(this._onError);
            this._wx_wcjtn_Banner.offResize(this._onResize);
            this._wx_wcjtn_Banner.destroy();
        }
        this._wx_wcjtn_Banner = null;
    }

    public onViewShow()
    {
        var banner = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().ba_wcjtn_nner;
        if (1 == banner && null == this._wx_wcjtn_Banner)
        {
            this.refresh_wcjtn_Banner_wcjtn_Dis();
            let bannerRecreateTime = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.refresh_wcjtn_Banner_wcjtn_Dis);
        }
        else
        {
            this.refresh_wcjtn_Banner_wcjtn_Dis();
            let bannerRecreateTime = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
            Laya.timer.loop(bannerRecreateTime * 1000,this,this.refresh_wcjtn_Banner_wcjtn_Dis);
        }
    }

    public onViewHide()
    {
        this.clear_wcjtn_WXBaner();
        Laya.timer.clearAll(this);
    }

    onDestroy()
    {
        this.clear_wcjtn_WXBaner();
        Laya.timer.clearAll(this);
    }
}