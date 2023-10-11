import ryw_ShareAd from "../ShareAd";
import ryw_Utilit from "../../Utilit";
import ryw_WXAPI from "../../WXAPI";
import ryw_ALD from "../../ALD";
import ryw_EventMgr from "../../Event/EventMgr";
import { ryw_EventDef } from "../../Event/EventDef";
import ryw_OPPOAPI from "../../OPPOAPI";
import ryw_QQMiniGameAPI from "../../QQMiniGameAPI";

export default class ryw_SingleAdView extends Laya.Script 
{
    public ryw_AdPosID : number = ryw_ShareAd.ryw_LoopAdLocationID;
    protected ryw__ownerSprite :Laya.Sprite;
    protected ryw__displaySp : Laya.Sprite;
    protected ryw__disText : Laya.Text;
    protected ryw__aniForward : boolean = false;
    protected ryw__data : any = null;
    protected ryw__fontSize = 25;
    protected ryw__originSize = 1;
    protected ryw__originW : number = 150;
    protected ryw__originH : number = 150;

    onAwake()
    {
        this.ryw__ownerSprite = this.owner as Laya.Sprite;
        this.ryw__displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this.ryw__originW = this.ryw__displaySp.width;
        this.ryw__originH = this.ryw__displaySp.height;
        this.ryw__disText =  this.owner.getChildByName("TitelText") as Laya.Text;
        this.ryw__disText.text = "";
        this.ryw__fontSize = this.ryw__disText.fontSize;
        this.ryw__originSize =  this.ryw__displaySp.scaleX;
    }
    
    onEnable(): void 
    {
        this.ryw_refreshADVDis();
        Laya.timer.loop(3000,this,this.ryw_refreshADVDis);

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
            if(self.owner && !self.owner.destroyed)
            {
                if(datas && datas.length > 0)
                {
                    (self.owner as Laya.Sprite).visible = true;
                    var data = datas[Math.floor(Math.random() * datas.length)];
    
                    self.ryw__displaySp.loadImage(data.logo,Laya.Handler.create(self,function()
                    {
                        if(!self.ryw__displaySp.destroyed)
                        {
                            self.ryw__displaySp.width = self.ryw__originW;
                            self.ryw__displaySp.height = self.ryw__originH;
                            self.ryw__displaySp.scale(self.ryw__originSize,self.ryw__originSize);
                        }
                    }));
                    var str = String(data.title);
                    var num = str.length;
                    var fontSize = Math.floor((5 / num) * this.ryw__fontSize);
                    self.ryw__disText.fontSize = fontSize;
                    self.ryw__disText.text = str;
                    self.ryw__data = data;
                }
                else
                {
                    (this.owner as Laya.Sprite).visible = false;
                }
            }
        })
    }

    onUpdate()
    {
        this.ryw_displayAni();
    }

    protected ryw_displayAni()
    {
        if(!this.ryw__aniForward)
        {
            var scale = this.ryw__displaySp.scaleX - Laya.timer.delta / 3000  * 1;
            scale = Math.max(scale,0);
            this.ryw__displaySp.scale(scale,scale);
            if(this.ryw__displaySp.scaleX <= 0.95 * this.ryw__originSize)
            {
                this.ryw__aniForward = true;
            }
        }
        else
        {
            var scale = this.ryw__displaySp.scaleX + Laya.timer.delta / 3000  * 1;
            scale = Math.min(scale,1 * this.ryw__originSize);
            this.ryw__displaySp.scale(scale,scale);
            if(this.ryw__displaySp.scaleX >= this.ryw__originSize)
            {
                this.ryw__aniForward = false;
            }
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