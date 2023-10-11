import WX_wcjtn_API from "../../WXAPI";
import _wcjtn_ShareAd_wcjtn_ from "../ShareAd";
import ALD from "../../ALD";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import OPPO_wcjtn_API from "../../OPPOAPI";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "../../QQMiniGameAPI";

export default class LoopAd_wcjtn_Box extends Laya.Script 
{
    protected _display_wcjtn_Sp : Laya.Sprite;
    protected _dis_wcjtn_Text : Laya.Text;
    protected _data_wcjtn_ : any = null;
    protected _origin_wcjtn_W : number = 150;
    protected _origin_wcjtn_H : number = 150;
    protected _font_wcjtn_Size = 25;
    

    onAwake()
    {
        this._display_wcjtn_Sp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._origin_wcjtn_W = this._display_wcjtn_Sp.width;
        this._origin_wcjtn_H = this._display_wcjtn_Sp.height;
        this._dis_wcjtn_Text =  this.owner.getChildByName("TitelText") as Laya.Text;
        this._dis_wcjtn_Text.text = "";
        this._font_wcjtn_Size = this._dis_wcjtn_Text.fontSize;
    }
    
    onEnable(): void 
    {
        this._display_wcjtn_Sp.on(Laya.Event.CLICK,this,this.on_wcjtn_Sp_wcjtn_Click);
    }

    onDisable(): void 
    {
        this._display_wcjtn_Sp.off(Laya.Event.CLICK,this,this.on_wcjtn_Sp_wcjtn_Click);
    }

    public set_wcjtn_Data(data)
    {
        if(data)
        {
            var self = this;
            this._display_wcjtn_Sp.loadImage(data.logo,Laya.Handler.create(this,function()
            {
                if(!self._display_wcjtn_Sp.destroyed)
                {
                    self._display_wcjtn_Sp.width = self._origin_wcjtn_W;
                    self._display_wcjtn_Sp.height = self._origin_wcjtn_H;
                }
            }));
            var str = String(data.title);
            var num = str.length;
            num = Math.max(5,num);
            var fontSize = Math.floor((5 / num) * this._font_wcjtn_Size);
            this._dis_wcjtn_Text.fontSize = fontSize;
            this._dis_wcjtn_Text.text = str;
            this._data_wcjtn_ = data;
        }
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
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
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
}