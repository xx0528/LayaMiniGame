import Shar_JJKLBB_eAd from "../ShareAd";
import Util_JJKLBB_it from "../../Utilit";
import WXAPI from "../../WXAPI";
import A_JJKLBB_LD from "../../ALD";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import OPPO_JJKLBB_API from "../../OPPOAPI";
import QQMini_JJKLBB_GameAPI from "../../QQMiniGameAPI";

export default class SingleAn_JJKLBB_iADView extends Laya.Script 
{
    public AdPo_JJKLBB_sID : number = Shar_JJKLBB_eAd.AniAdLoca_JJKLBB_tionID;
    protected _owner_JJKLBB_Sprite :Laya.Sprite;
    protected _anima_JJKLBB_tion : Laya.Animation;
    protected _da_JJKLBB_ta : any = null;

    onAwake()
    {
        this._owner_JJKLBB_Sprite = this.owner as Laya.Sprite;
        this._anima_JJKLBB_tion = this.owner.getChildByName("Animation") as Laya.Animation;
    }
    
    onEnable(): void 
    {
        this.refreshADVDis();
        this._owner_JJKLBB_Sprite.on(Laya.Event.CLICK,this,this.onSpClick);
    }

    onDisable(): void 
    {
        Laya.timer.clearAll(this);
        this._owner_JJKLBB_Sprite.off(Laya.Event.CLICK,this,this.onSpClick);
    }

    protected refreshADVDis()
    {
        var self = this;
        Shar_JJKLBB_eAd.get_JJKLBB_ADVs(this.AdPo_JJKLBB_sID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                self._owner_JJKLBB_Sprite.visible = true;
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._anima_JJKLBB_tion.loadAtlas(data.atlas,Laya.Handler.create(self,function()
                {
                    self._anima_JJKLBB_tion.play(0,true);
                }));
                self._da_JJKLBB_ta = data;
                (self.owner.getChildByName("TitelText") as Laya.Text).text = data.title;
            }
            else
            {
                self._owner_JJKLBB_Sprite.visible = false;
            }
        },false)
    }

    protected onSpClick()
    {
        var data = this._da_JJKLBB_ta;
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