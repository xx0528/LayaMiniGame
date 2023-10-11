import ViewBase from "../ViewBase";
import Utilit from "../../Utilit";
import ViewMgr, { ViewDef } from "../../Mgr/ViewMgr";
import MiniGameViewTemplate from "./MiniGame/MiniGameViewTemplate";
import WudianMgr from "../../Mgr/WudianMgr";
import WXAPI from "../../WXAPI";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import QQMiniGameAPI from "../../QQMiniGameAPI";
import EventMgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";

export default class TemplateViewBase extends ViewBase 
{
    public get HistoryBtn()
    {
        // if(null == this._historyBtn)
        // {
        //     this._historyBtn = this.TopZone.getChildByName("HistoryBtn") as Laya.Sprite;
        // }
        return this._historyBtn;
    }
    private _historyBtn : Laya.Sprite = null;
    public get TopZone()
    {
        if(null == this._topZone)
        {
            this._topZone = this.View.getChildByName("TopZone") as Laya.Clip;
        }
        return this._topZone;
    }
    protected _topZone : Laya.Clip = null;

    onAwake()
    {
        this._topZone = this.View.getChildByName("TopZone") as Laya.Clip;
        if(Utilit.isIphoneX())
        {
            this._topZone.top =  this._topZone.top + 75;
        }
        // this._historyBtn = this._topZone.getChildByName("HistoryBtn") as Laya.Sprite;
        // if(-1 == WudianMgr.IpBlockFlag())
        // {
        //     this._historyBtn.visible = false;
        // }
        // else
        // {
        //     this._historyBtn.visible = this.isShowHistoryBtn;
        // }
    }

    addEvent()
    {
        super.addEvent();
        // this.HistoryBtn.on(Laya.Event.CLICK,this,this.onHistoryBtn);
        EventMgr.instance.regEvemt(EventDef.App_OnUpdateIpBlockState,this,this.onUpdateIpBlockState);
    }

    removeEvent()
    {
        super.removeEvent();
        // this.HistoryBtn.off(Laya.Event.CLICK,this,this.onHistoryBtn);
        EventMgr.instance.removeEvent(EventDef.App_OnUpdateIpBlockState,this,this.onUpdateIpBlockState);
    }

    protected onHistoryBtn()
    {
        // let self = this;
        // ViewMgr.instance.openView(ViewDef.MiniGameView,null,(v : MiniGameViewTemplate)=>
        // {
        //     self.hide();
        //     v.onCloseEvent = ()=>
        //     {
        //         if(null != self.View && !self.View.destroyed)
        //         {
        //             self.show();
        //         }
        //     }
        // })
    }

    protected get isShowHistoryBtn()
    {
        // let launchScene = 0;
        // if(Laya.Browser.onMiniGame)
        // {
        //     launchScene = WXAPI.getLaunchOptionsSync().scene;
        // }
        // else if(Laya.Browser.onQQMiniGame)
        // {
        //     launchScene = QQMiniGameAPI.getLaunchOptionsSync().scene;
        // }
        // let noEnterBySearch: boolean = true;
        // let wudianSceneList = AppSwitchConfig.getInstance().getAppSwitchData().wudianSceneList;
        // for (let i = 0; i < wudianSceneList.length; ++i)  
        // {
        //     let wudianSceneValue = wudianSceneList[i];
        //     if(launchScene == wudianSceneValue)
        //     {
        //         noEnterBySearch = false;
        //     }
        // }
        // if(Laya.Browser.onQGMiniGame || !noEnterBySearch || !WudianMgr.GetIpBlocked() 
        //     || 0 ==  AppSwitchConfig.getInstance().getAppSwitchData().fakeBtn)
        // {
        //     return false;
        // }
        return true;
    }

    protected onUpdateIpBlockState(para)
    {
        // this._historyBtn.visible = this.isShowHistoryBtn;
    }
}