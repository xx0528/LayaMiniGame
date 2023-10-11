import Share_ppxhc_Ad from "../ShareAd";
import Utilit_ from "../../Utilit";
import WXAPI_ from "../../WXAPI";
import ALD_ppxhc from "../../ALD";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import OPPO_ppxhc_API from "../../OPPOAPI";
import QQMiniGame_ppxhc_API from "../../QQMiniGameAPI";

export default class SingleAni_ppxhc_ADView extends Laya.Script 
{
    public AdPosID : number = Share_ppxhc_Ad.AniAdLocationID;
    protected _ownerSprite :Laya.Sprite;
    protected _animation : Laya.Animation;
    protected _data : any = null;

    onAwake()
    {
        this._ownerSprite = this.owner as Laya.Sprite;
        this._animation = this.owner.getChildByName("Animation") as Laya.Animation;
    }
    
    onEnable(): void 
    {
        this.refreshADVDis();
        this._ownerSprite.on(Laya.Event.CLICK,this,this.onSpClick);
    }

    onDisable(): void 
    {
        Laya.timer.clearAll(this);
        this._ownerSprite.off(Laya.Event.CLICK,this,this.onSpClick);
    }

    protected refreshADVDis()
    {
        var self = this;
        Share_ppxhc_Ad.getADVs_(this.AdPosID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                self._ownerSprite.visible = true;
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._animation.loadAtlas(data.atlas,Laya.Handler.create(self,function()
                {
                    self._animation.play(0,true);
                }));
                self._data = data;
            }
            else
            {
                self._ownerSprite.visible = false;
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