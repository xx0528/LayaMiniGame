import Shar_JJKLBB_eAd from "../ShareAd";
import WXAPI from "../../WXAPI";
import A_JJKLBB_LD from "../../ALD";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import OPPO_JJKLBB_API from "../../OPPOAPI";
import QQMini_JJKLBB_GameAPI from "../../QQMiniGameAPI";

export default class Insert_JJKLBB_AdView extends Laya.Script 
{
    public AdP_JJKLBB_osID : number = Shar_JJKLBB_eAd.Insert_JJKLBB_AdLocationID;
    protected _disp_JJKLBB_laySp : Laya.Sprite;
    protected _d_JJKLBB_ata : any = null;

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
        this.refreshB_JJKLBB_annerDis();
        this._disp_JJKLBB_laySp.on(Laya.Event.CLICK,this,this.onSpC_JJKLBB_lick);
    }

    onDisable(): void 
    {
        this._disp_JJKLBB_laySp.off(Laya.Event.CLICK,this,this.onSpC_JJKLBB_lick);
    }

    protected refreshB_JJKLBB_annerDis()
    {
        var self = this;
        Shar_JJKLBB_eAd.get_JJKLBB_ADVs(this.AdP_JJKLBB_osID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._disp_JJKLBB_laySp.loadImage(data.logo,Laya.Handler.create(self,function()
                {
                    if(!self._disp_JJKLBB_laySp.destroyed)
                    {
                        self._disp_JJKLBB_laySp.width = 550;
                        self._disp_JJKLBB_laySp.height = 670;
                        self._disp_JJKLBB_laySp.scale(1,1);
                    }
                }));
                self._d_JJKLBB_ata = data;
            }
        });
    }

    protected onSpC_JJKLBB_lick()
    {
        var data = this._d_JJKLBB_ata;
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
                        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_OnShareAdFail_UseCancel);
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
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
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
}