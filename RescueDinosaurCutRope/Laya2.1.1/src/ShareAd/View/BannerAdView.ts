import Shar_JJKLBB_eAd from "../ShareAd";
import WXAPI from "../../WXAPI";
import A_JJKLBB_LD from "../../ALD";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import AppSwitch_JJKLBB_Config from "../../Config/AppSwitchConfig";
import OPPO_JJKLBB_API from "../../OPPOAPI";
import QQMini_JJKLBB_GameAPI from "../../QQMiniGameAPI";

export default class Banne_JJKLBB_rAdView extends Laya.Script 
{
    public AdPo_JJKLBB_sID : number = Shar_JJKLBB_eAd.BannerAdL_JJKLBB_ocationID;
    protected _disp_JJKLBB_laySp : Laya.Sprite;
    protected _dat_JJKLBB_a : any = null;

    public WXBanne_JJKLBB_rWidth : number;
    protected _wxBan_JJKLBB_ner : any = null;

    onAwake()
    {
        this._disp_JJKLBB_laySp = this.owner.getChildByName("Display") as Laya.Sprite;
        if(null == this._disp_JJKLBB_laySp)
        {
            this._disp_JJKLBB_laySp = this.owner as Laya.Sprite;
        }
    }
    
    onEnable(): void 
    {
        this._disp_JJKLBB_laySp.on(Laya.Event.CLICK,this,this.onSpC_JJKLBB_lick);
        var banner = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().ban_JJKLBB_ner;
        if(0 == banner)
        {
            this.refreshB_JJKLBB_annerDis();
        }
        else if (1 == banner)
        {
            this.refresh_JJKLBB_WXBann_JJKLBB_er();
        }
    }

    onDisable(): void 
    {
        this._disp_JJKLBB_laySp.off(Laya.Event.CLICK,this,this.onSpC_JJKLBB_lick);
        this.clear_JJKLBB_WXBaner();
    }

    protected refreshB_JJKLBB_annerDis()
    {
        var self = this;
        Shar_JJKLBB_eAd.get_JJKLBB_ADVs(this.AdPo_JJKLBB_sID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._disp_JJKLBB_laySp.loadImage(data.logo,Laya.Handler.create(self,function()
                {
                    if(!self._disp_JJKLBB_laySp.destroyed)
                    {
                        self._disp_JJKLBB_laySp.width = 750;
                        self._disp_JJKLBB_laySp.height = 256;
                    }
                }));
                self._dat_JJKLBB_a = data;
            }
        },false)
    }

    protected onSpC_JJKLBB_lick()
    {
        var data = this._dat_JJKLBB_a;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                WXAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_JJKLBB_eAd.reportUs_JJKLBB_erClick(data.appid);
                    A_JJKLBB_LD.aldSendReportA_JJKLBB_dClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        A_JJKLBB_LD.aldSendRepo_JJKLBB_rtAdClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPPO_JJKLBB_API.navigat_JJKLBB_eToMiniPr_JJKLBB_ogram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_JJKLBB_eAd.reportUs_JJKLBB_erClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame)  //qq小游戏
            {
                QQMini_JJKLBB_GameAPI.navig_JJKLBB_ateToMiniP_JJKLBB_rogram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Shar_JJKLBB_eAd.reportUs_JJKLBB_erClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }

    protected refresh_JJKLBB_WXBann_JJKLBB_er()
    {
        if(!Laya.Browser.onMiniGame)
            return;
        this.clear_JJKLBB_WXBaner();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._disp_JJKLBB_laySp.localToGlobal(new Laya.Point(0,0))

        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WXBanne_JJKLBB_rWidth ? this.WXBanne_JJKLBB_rWidth / Laya.stage.width * sw : sw;

        this._wxBan_JJKLBB_ner = Laya.Browser.window["wx"].createBannerAd(
            {
                adUnitId : WXAPI.bannerAdUnitId,
                adIntervals : 30,
                style : 
                {
                    left:left,
                    top:top,
                    width: width,
                }
            })
            self._wxBan_JJKLBB_ner.onLoad((res) =>  {
            console.log("WXBanner广告 加载完成");
            console.log(res);
        })
        this._wxBan_JJKLBB_ner.onError((err) =>  {
            console.log("WXBanner广告 加载失败");
            console.log(err);
            self.refreshB_JJKLBB_annerDis();
            self.clear_JJKLBB_WXBaner();
        })
        this._wxBan_JJKLBB_ner.onResize(res => {
            console.log(self._wxBan_JJKLBB_ner.style.realWidth, self._wxBan_JJKLBB_ner.style.realHeight)
          })
          self._wxBan_JJKLBB_ner.show();
    }
    
    public clear_JJKLBB_WXBaner()
    {
        if(this._wxBan_JJKLBB_ner)
        {
            this._wxBan_JJKLBB_ner.destroy();
        }
        this._wxBan_JJKLBB_ner = null;
    }
}