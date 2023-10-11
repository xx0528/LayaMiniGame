import WXAPI from "../../WXAPI";
import ShareAd from "../../ShareAd/ShareAd";
import ALD from "../../ALD";
import EventMgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";
import OPPOAPI from "../../OPPOAPI";
import QQMiniGameAPI from "../../QQMiniGameAPI";
import AppConfig from "../../AppConfig";
import TTAPI from "../../TTAPI";
import VIVOAPI from "../../VIVOAPI";

export default class KRQ_ComBase extends Laya.Script 
{
    public AdPosID : number = -10086;

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

    public refresh(onComplate? : Function)
    {
        let self = this;
        ShareAd.getADVs(this.AdPosID,(datas)=>
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

    protected navigateToMiniProgram(d? : any)
    {
        var data = null == d ? this._data : d;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                WXAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    ShareAd.reportUserClick(data.appid);
                    ALD.aldSendReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    EventMgr.instance.dispatch(EventDef.AD_OnShareAdFail);
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
                    ShareAd.reportUserClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    EventMgr.instance.dispatch(EventDef.AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame)  //qq小游戏
            {
                QQMiniGameAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    ShareAd.reportUserClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    EventMgr.instance.dispatch(EventDef.AD_OnShareAdFail);
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
                    ShareAd.reportUserClick(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    EventMgr.instance.dispatch(EventDef.AD_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (AppConfig.onTTMiniGame) {
                TTAPI.showMoreGamesModal(() => {
                    console.log("跳转成功")
                    ShareAd.reportUserClick(data.appid);
                }, () => {
                    console.log("跳转失败")
                    EventMgr.instance.dispatch(EventDef.AD_OnShareAdFail);
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

    protected autoScrollText(text : Laya.Text)
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