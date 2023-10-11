import Shar_XYXZS_eAd from "../ShareAd";
import W_XYXZS_XAPI from "../../WXAPI";
import A_XYXZS_LD from "../../ALD";
import Even_XYXZS_tMgr from "../../Event/EventMgr";
import { Even_XYXZS_tDef } from "../../Event/EventDef";
import AppSwi_XYXZS_tchConfig from "../../Config/AppSwitchConfig";
import OPP_XYXZS_OAPI from "../../OPPOAPI";
import QQMini_XYXZS_GameAPI from "../../QQMiniGameAPI";
import IViewSt_XYXZS_ateListener from "../../View/IViewStateListener";

export default class Banne_XYXZS_rAdView extends Laya.Script implements IViewSt_XYXZS_ateListener
{
    public AdPo_XYXZS_sID : number = Shar_XYXZS_eAd.Banner_XYXZS_AdLocationID;
    protected _d_XYXZS_isplaySp : Laya.Sprite;
    protected _d_XYXZS_ata : any = null;

    public WXBann_XYXZS_erWidth : number;
    protected _wxB_XYXZS_anner : any = null;

    onAwake()
    {
        this._d_XYXZS_isplaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        if(null == this._d_XYXZS_isplaySp)
        {
            this._d_XYXZS_isplaySp = this.owner as Laya.Sprite;
        }
    }
    
    onEnable(): void 
    {
        this._d_XYXZS_isplaySp.on(Laya.Event.CLICK,this,this.onSpC_XYXZS_lick);
        var banner = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().ba_XYXZS_nner;
        if(0 == banner)
        {
            this.refresh_XYXZS_BannerDis();
        }
        else if (1 == banner)
        {
            this.refresh_XYXZS_WXBanner();
        }
    }

    onDisable(): void 
    {
        this._d_XYXZS_isplaySp.off(Laya.Event.CLICK,this,this.onSpC_XYXZS_lick);
        this.clear_XYXZS_WXBaner();
    }

    protected refresh_XYXZS_BannerDis()
    {
        var self = this;
        Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdPo_XYXZS_sID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._d_XYXZS_isplaySp.loadImage(data.logo,Laya.Handler.create(self,function()
                {
                    if(!self._d_XYXZS_isplaySp.destroyed)
                    {
                        // self._d_XYXZS_isplaySp.width = 750;
                        // self._d_XYXZS_isplaySp.height = 256;
                    }
                }));
                self._d_XYXZS_ata = data;
            }
        },false)
    }

    protected onSpC_XYXZS_lick()
    {
        var data = this._d_XYXZS_ata;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                W_XYXZS_XAPI.navigateT_XYXZS_oMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                    A_XYXZS_LD.aldSend_XYXZS_ReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        A_XYXZS_LD.aldSend_XYXZS_ReportAdClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPP_XYXZS_OAPI.navigat_XYXZS_eToMiniProgram(data.appid,data.title,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame)  //qq小游戏
            {
                QQMini_XYXZS_GameAPI.navigateToMi_XYXZS_niProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }

    protected refresh_XYXZS_WXBanner()
    {
        if(!Laya.Browser.onMiniGame || !(this.owner as Laya.Sprite).visible)
            return;
        this.clear_XYXZS_WXBaner();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._d_XYXZS_isplaySp.localToGlobal(new Laya.Point(0,0))

        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WXBann_XYXZS_erWidth ? this.WXBann_XYXZS_erWidth / Laya.stage.width * sw : sw;

        this._wxB_XYXZS_anner = Laya.Browser.window["wx"].createBannerAd(
            {
                adUnitId : W_XYXZS_XAPI.bann_XYXZS_erAdUnitId,
                adIntervals : 30,
                style : 
                {
                    left:left,
                    top:top,
                    width: width,
                }
            })
            self._wxB_XYXZS_anner.onLoad((res) =>  {
            console.log("WXBanner广告 加载完成");
            console.log(res);
        })
        this._wxB_XYXZS_anner.onError((err) =>  {
            console.log("WXBanner广告 加载失败");
            console.log(err);
            self.refresh_XYXZS_BannerDis();
            self.clear_XYXZS_WXBaner();
        })
        this._wxB_XYXZS_anner.onResize(res => {
            console.log(self._wxB_XYXZS_anner.style.realWidth, self._wxB_XYXZS_anner.style.realHeight)
          })
          self._wxB_XYXZS_anner.show();
    }
    
    public clear_XYXZS_WXBaner()
    {
        if(this._wxB_XYXZS_anner)
        {
            this._wxB_XYXZS_anner.destroy();
        }
        this._wxB_XYXZS_anner = null;
    }

    public onView__XYXZS_XYXZS_Show()
    {
        var banner = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().ba_XYXZS_nner;
        if (1 == banner && null == this._wxB_XYXZS_anner)
        {
            this.refresh_XYXZS_WXBanner();
        }
    }

    public onViewHide()
    {
        this.clear_XYXZS_WXBaner();
    }
}