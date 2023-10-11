import Share_sdlyg_Ad from "../ShareAd";
import WXAPI from "../../WXAPI";
import ALD from "../../ALD";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import OPPOAPI from "../../OPPOAPI";
import QQMiniGameAPI from "../../QQMiniGameAPI";

export default class InsertAdView extends Laya.Script 
{
    public AdPosID : number = Share_sdlyg_Ad.InsertAdLocationID;
    protected _displaySp : Laya.Sprite;
    protected _data : any = null;

    onAwake()
    {
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        if(null == this._displaySp)
        {
            this._displaySp = this.owner as Laya.Sprite;
        }
    }
    
    onEnable(): void 
    {
        this.refreshBannerDis();
        this._displaySp.on(Laya.Event.CLICK,this,this.onSpClick);
    }

    onDisable(): void 
    {
        this._displaySp.off(Laya.Event.CLICK,this,this.onSpClick);
    }

    protected refreshBannerDis()
    {
        var self = this;
        Share_sdlyg_Ad.getADVs(this.AdPosID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._displaySp.loadImage(data.logo,Laya.Handler.create(self,function()
                {
                    if(!self._displaySp.destroyed)
                    {
                        self._displaySp.width = 550;
                        self._displaySp.height = 670;
                        self._displaySp.scale(1,1);
                    }
                }));
                self._data = data;
            }
        },false)
    }

    protected onSpClick()
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
                    Share_sdlyg_Ad.reportUserClick(data.appid);
                    ALD.aldSendReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        ALD.aldSendReportAdClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPPOAPI.navigateToMiniProgram(data.appid,data.title,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Share_sdlyg_Ad.reportUserClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
            {
                QQMiniGameAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Share_sdlyg_Ad.reportUserClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }
}