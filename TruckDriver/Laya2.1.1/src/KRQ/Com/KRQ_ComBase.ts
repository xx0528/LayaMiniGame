import WXAPI_ from "../../WXAPI";
import Share_ppxhc_Ad from "../../ShareAd/ShareAd";
import ALD_ppxhc from "../../ALD";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import OPPO_ppxhc_API from "../../OPPOAPI";
import QQMiniGame_ppxhc_API from "../../QQMiniGameAPI";
import TTAPI from "../../TTAPI";
import AppConfig from "../../AppConfig";
import ShareAd from "../../ShareAd/ShareAd";
import VIVOAPI from "../../VIVOAPI";

export default class KRQ_ppxhc_ComBase extends Laya.Script 
{
    public AdPos_ppxhc_ID : number = 315;

    public get Sprite()
    {
        return this.owner as Laya.Sprite;
    }

    protected _datas : Array<any> = [];

    public get Data()
    {
        return this._data;
    }
    protected _data : any = null;

    public refresh_ppxhc(onComplate? : Function)
    {
        let self = this;
        Share_ppxhc_Ad.getADVs_(this.AdPos_ppxhc_ID,(datas)=>
        {
            if(null != datas)
            {
                self._datas = datas;
                self._data = self._datas[Math.floor(Math.random() * datas.length)];
                if(null != onComplate)
                {
                    onComplate();
                }
            }
        },false)
    }

    protected navigateToMiniProgram_ppxhc(d? : any)
    {
        var data = null == d ? this._data : d;
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
            else if (Laya.Browser.onQQMiniGame)  //qq小游戏
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
            else if(Laya.Browser.onVVMiniGame)
            {
                VIVOAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    ShareAd.reportUserClick_(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (AppConfig.onTTMiniGame_ppxhc_) {
                TTAPI.showMoreGamesModal(() => {
                    console.log("跳转成功")
                    ShareAd.reportUserClick_(data.appid);
                }, () => {
                    console.log("跳转失败")
                    Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.AD_OnShareAdFail);
                });
            }
        }
    }

    
    public show()
    {
        this.Sprite.visible = true;
    }

    public hide()
    {
        this.Sprite.visible = false;
    }

    protected autoScroll_ppxhc_Text(text : Laya.Text)
    {
        if(text.overflow != Laya.Text.SCROLL)
            return;
        let forward : boolean = true;
        let deltaDis : number = 0;
        Laya.timer.frameLoop(1,text,()=>
        {
            let d = Laya.timer.delta / 1000 * 10;
            deltaDis += d;
            if(deltaDis >= text.textWidth / 2)
            {
                forward = !forward;
                deltaDis = 0;
            }
            if(forward)
            {
                text.scrollX += d;
            }
            else
            {
                text.scrollX -= d;
            }
        })
    }
}