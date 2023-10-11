import Share_myqq_Ad from "../ShareAd";
import Utilit from "../../Utilit";
import WXAPI from "../../WXAPI";
import ALD from "../../ALD";
import Event_myqq_Mgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";

export default class Single_myqq_AniADView extends Laya.Script 
{
    public AdPosID : number = Share_myqq_Ad.AniAdLocationID;
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
        this.refresh_myqq_ADVDis();
        this._ownerSprite.on(Laya.Event.CLICK,this,this.on_myqq_SpClick);
    }

    onDisable(): void 
    {
        Laya.timer.clearAll(this);
        this._ownerSprite.off(Laya.Event.CLICK,this,this.on_myqq_SpClick);
    }

    protected refresh_myqq_ADVDis()
    {
        var self = this;
        Share_myqq_Ad.get_myqq_ADVs(this.AdPosID,(datas)=>
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

    protected on_myqq_SpClick()
    {
        var data = this._data;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            WXAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
            {
                console.log("跳转成功")
                Share_myqq_Ad.reportUserClick(data.appid);
                ALD.aldSendReportAdClickSuccess(data);
            },(res)=>
            {
                console.log("跳转失败")
                Event_myqq_Mgr.instance.dispatch(EventDef.AD_OnShareAdFail);
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
    }
}