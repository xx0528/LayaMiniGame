import ryw_ShareAd from "../ShareAd";
import ryw_WXAPI from "../../WXAPI";
import ryw_ALD from "../../ALD";
import ryw_EventMgr from "../../Event/EventMgr";
import { ryw_EventDef } from "../../Event/EventDef";
import ryw_OPPOAPI from "../../OPPOAPI";
import ryw_QQMiniGameAPI from "../../QQMiniGameAPI";

export default class ryw_InsertAdView extends Laya.Script 
{
    public ryw_AdPosID : number = ryw_ShareAd.ryw_InsertAdLocationID;
    protected ryw__displaySp : Laya.Sprite;
    protected ryw__data : any = null;

    onAwake()
    {
        this.ryw__displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        if(null == this.ryw__displaySp)
        {
            this.ryw__displaySp = this.owner as Laya.Sprite;
        }
    }
    
    onEnable(): void 
    {
        this.ryw_refreshBannerDis();
        this.ryw__displaySp.on(Laya.Event.CLICK,this,this.ryw_onSpClick);
    }

    onDisable(): void 
    {
        this.ryw__displaySp.off(Laya.Event.CLICK,this,this.ryw_onSpClick);
    }

    protected ryw_refreshBannerDis()
    {
        var self = this;
        ryw_ShareAd.ryw_getADVs(this.ryw_AdPosID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                var data = datas[Math.floor(Math.random() * datas.length)];

                self.ryw__displaySp.loadImage(data.logo,Laya.Handler.create(self,function()
                {
                    if(!self.ryw__displaySp.destroyed)
                    {
                        self.ryw__displaySp.width = 550;
                        self.ryw__displaySp.height = 670;
                        self.ryw__displaySp.scale(1,1);
                    }
                }));
                self.ryw__data = data;
            }
        },false)
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