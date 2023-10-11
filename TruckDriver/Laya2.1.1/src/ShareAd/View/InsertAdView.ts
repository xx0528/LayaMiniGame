import Share_ppxhc_Ad from "../ShareAd";
import WXAPI_ from "../../WXAPI";
import ALD_ppxhc from "../../ALD";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import OPPO_ppxhc_API from "../../OPPOAPI";
import QQMiniGame_ppxhc_API from "../../QQMiniGameAPI";

export default class Insert_ppxhc_AdView extends Laya.Script 
{
    public AdPosID : number = Share_ppxhc_Ad.InsertAdLocationID_;
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
        Share_ppxhc_Ad.getADVs_(this.AdPosID,(datas)=>
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