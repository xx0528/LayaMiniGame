import ryw_ShareAd from "../ShareAd";
import ryw_Utilit from "../../Utilit";
import ryw_WXAPI from "../../WXAPI";
import ryw_ALD from "../../ALD";
import ryw_EventMgr from "../../Event/EventMgr";
import { ryw_EventDef } from "../../Event/EventDef";
import ryw_OPPOAPI from "../../OPPOAPI";
import ryw_QQMiniGameAPI from "../../QQMiniGameAPI";

export default class ryw_SingleAniADView extends Laya.Script 
{
    public ryw_AdPosID : number = ryw_ShareAd.ryw_AniAdLocationID;
    protected ryw__ownerSprite :Laya.Sprite;
    protected ryw__animation : Laya.Animation;
    protected ryw__data : any = null;

    onAwake()
    {
        this.ryw__ownerSprite = this.owner as Laya.Sprite;
        this.ryw__animation = this.owner.getChildByName("Animation") as Laya.Animation;
    }
    
    onEnable(): void 
    {
        this.ryw_refreshADVDis();
        this.ryw__ownerSprite.on(Laya.Event.CLICK,this,this.ryw_onSpClick);
    }

    onDisable(): void 
    {
        Laya.timer.clearAll(this);
        this.ryw__ownerSprite.off(Laya.Event.CLICK,this,this.ryw_onSpClick);
    }

    protected ryw_refreshADVDis()
    {
        var self = this;
        ryw_ShareAd.ryw_getADVs(this.ryw_AdPosID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                self.ryw__ownerSprite.visible = true;
                var data = datas[Math.floor(Math.random() * datas.length)];
                self.ryw__animation.loadAtlas(data.atlas,Laya.Handler.create(self,function()
                {
                    self.ryw__animation.play(0,true);
                }));
                self.ryw__data = data;
            }
            else
            {
                self.ryw__ownerSprite.visible = false;
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