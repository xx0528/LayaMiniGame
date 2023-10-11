import WXAPI from "../../WXAPI";
import Shar_JJKLBB_eAd from "../ShareAd";
import A_JJKLBB_LD from "../../ALD";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import OPPO_JJKLBB_API from "../../OPPOAPI";
import QQMini_JJKLBB_GameAPI from "../../QQMiniGameAPI";
import View_JJKLBB_Mgr, { View_JJKLBB_Def } from "../../Mgr/ViewMgr";

export default class LoopA_JJKLBB_dBox extends Laya.Script 
{
    protected _displaySp : Laya.Sprite;
    protected _disText : Laya.Text;
    protected _data : any = null;
    protected _originW : number = 150;
    protected _originH : number = 150;
    protected _fontSize = 25;
    

    onAwake()
    {
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._originW = this._displaySp.width;
        this._originH = this._displaySp.height;
        this._disText =  this.owner.getChildByName("TitelText") as Laya.Text;
        this._disText.text = "";
        this._fontSize = this._disText.fontSize;
    }
    
    onEnable(): void 
    {
        this._displaySp.on(Laya.Event.CLICK,this,this.onSpC_JJKLBB_lick);
    }

    onDisable(): void 
    {
        this._displaySp.off(Laya.Event.CLICK,this,this.onSpC_JJKLBB_lick);
    }

    public setData(data)
    {
        if(data)
        {
            var self = this;
            this._displaySp.loadImage(data.logo,Laya.Handler.create(this,function()
            {
                if(!self._displaySp.destroyed)
                {
                    self._displaySp.width = self._originW;
                    self._displaySp.height = self._originH;
                }
            }));
            var str = String(data.title);
            var num = str.length;
            num = Math.max(5,num);
            var fontSize = Math.floor((5 / num) * this._fontSize);
            // this._disText.fontSize = fontSize;
            this._disText.text = str;
            this._data = data;
        }
    }

    protected onSpC_JJKLBB_lick()
    {
        var data = this._data;
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