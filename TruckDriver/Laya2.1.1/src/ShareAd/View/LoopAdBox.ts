import WXAPI_ from "../../WXAPI";
import Share_ppxhc_Ad from "../ShareAd";
import ALD_ppxhc from "../../ALD";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import OPPO_ppxhc_API from "../../OPPOAPI";
import QQMiniGame_ppxhc_API from "../../QQMiniGameAPI";

export default class Loop_ppxhc_AdBox extends Laya.Script 
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
        this._displaySp.on(Laya.Event.CLICK,this,this.onSpClick);
    }

    onDisable(): void 
    {
        this._displaySp.off(Laya.Event.CLICK,this,this.onSpClick);
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
            this._disText.fontSize = fontSize;
            this._disText.text = str;
            this._data = data;
        }
    }

    protected onSpClick()
    {
        var data = this._data;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                WXAPI_.navigateToMiniProgram_(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Share_ppxhc_Ad.reportUserClick_(data.appid);
                    ALD_ppxhc.aldSendReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.AD_OnShareAdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        ALD_ppxhc.aldSendReportAdClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPPO_ppxhc_API.navigateToMiniProgram(data.appid,data.title,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Share_ppxhc_Ad.reportUserClick_(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
            {
                QQMiniGame_ppxhc_API.navigateToMiniProgram_ppxhc(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Share_ppxhc_Ad.reportUserClick_(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }
}