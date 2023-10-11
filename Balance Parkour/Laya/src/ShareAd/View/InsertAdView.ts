import Share_tippy_Ad from "../ShareAd";
import WXAPI from "../../WXAPI";
import AL_tippy_D from "../../ALD";
import Event_tippy_Mgr from "../../Event/EventMgr";
import { Event_tippy_Def } from "../../Event/EventDef";
import OPPOAPI from "../../OPPOAPI";
import QQMiniGameAPI from "../../QQMiniGameAPI";

export default class InsertAd_tippy_View extends Laya.Script 
{
    public AdPosID : number = Share_tippy_Ad.InsertAdLocationID;
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
        this.refresh_tippy_BannerDis();
        this._displaySp.on(Laya.Event.CLICK,this,this.onSp_tippy_Click);
    }

    onDisable(): void 
    {
        this._displaySp.off(Laya.Event.CLICK,this,this.onSp_tippy_Click);
    }

    protected refresh_tippy_BannerDis()
    {
        var self = this;
        Share_tippy_Ad.getADV_tippy_s(this.AdPosID,(datas)=>
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

    protected onSp_tippy_Click()
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
                    Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                    AL_tippy_D.aldSendReport_tippy_AdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        AL_tippy_D.aldSendReportAd_tippy_ClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPPOAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
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
                    Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }
}