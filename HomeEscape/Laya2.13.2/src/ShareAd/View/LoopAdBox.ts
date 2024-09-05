import ryw_WXAPI from "../../WXAPI";
import ryw_ShareAd from "../ShareAd";
import ryw_ALD from "../../ALD";
import ryw_EventMgr from "../../Event/EventMgr";
import { ryw_EventDef } from "../../Event/EventDef";
import ryw_OPPOAPI from "../../OPPOAPI";
import ryw_QQMiniGameAPI from "../../QQMiniGameAPI";

export default class ryw_LoopAdBox extends Laya.Script 
{
    protected ryw__displaySp : Laya.Sprite;
    protected ryw__disText : Laya.Text;
    protected ryw__data : any = null;
    protected ryw__originW : number = 150;
    protected ryw__originH : number = 150;
    protected ryw__fontSize = 25;
    

    onAwake()
    {
        this.ryw__displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this.ryw__originW = this.ryw__displaySp.width;
        this.ryw__originH = this.ryw__displaySp.height;
        this.ryw__disText =  this.owner.getChildByName("TitelText") as Laya.Text;
        this.ryw__disText.text = "";
        this.ryw__fontSize = this.ryw__disText.fontSize;
    }
    
    onEnable(): void 
    {
        this.ryw__displaySp.on(Laya.Event.CLICK,this,this.ryw_onSpClick);
    }

    onDisable(): void 
    {
        this.ryw__displaySp.off(Laya.Event.CLICK,this,this.ryw_onSpClick);
    }

    public ryw_setData(data)
    {
        if(data)
        {
            var self = this;
            this.ryw__displaySp.loadImage(data.logo,Laya.Handler.create(this,function()
            {
                if(!self.ryw__displaySp.destroyed)
                {
                    self.ryw__displaySp.width = self.ryw__originW;
                    self.ryw__displaySp.height = self.ryw__originH;
                }
            }));
            var str = String(data.title);
            var num = str.length;
            num = Math.max(5,num);
            var fontSize = Math.floor((5 / num) * this.ryw__fontSize);
            this.ryw__disText.fontSize = fontSize;
            this.ryw__disText.text = str;
            this.ryw__data = data;
        }
    }

    protected ryw_onSpClick()
    {
        var data = this.ryw__data;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                ryw_WXAPI.ryw_navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    ryw_ShareAd.ryw_reportUserClick(data.appid);
                    ryw_ALD.ryw_aldSendReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        ryw_ALD.ryw_aldSendReportAdClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                ryw_OPPOAPI.ryw_navigateToMiniProgram(data.appid,data.title,data.url,(res)=>
                {
                    console.log("跳转成功")
                    ryw_ShareAd.ryw_reportUserClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
            {
                ryw_QQMiniGameAPI.ryw_navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    ryw_ShareAd.ryw_reportUserClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }
}