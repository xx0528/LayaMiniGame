import ryw_ViewBase from "../ViewBase";
import ryw_Utilit from "../../Utilit";
import ryw_ViewMgr, { ryw_ViewDef } from "../../Mgr/ViewMgr";
import ryw_MiniGameViewTemplate from "./MiniGame/MiniGameViewTemplate";
import ryw_WudianMgr from "../../Mgr/WudianMgr";
import ryw_WXAPI from "../../WXAPI";
import ryw_AppSwitchConfig from "../../Config/AppSwitchConfig";
import ryw_QQMiniGameAPI from "../../QQMiniGameAPI";
import ryw_EventMgr from "../../Event/EventMgr";
import { ryw_EventDef } from "../../Event/EventDef";

export default class ryw_TemplateViewBase extends ryw_ViewBase 
{
    public get ryw_HistoryBtn()
    {
        // if(null == this.ryw__historyBtn)
        // {
        //     this.ryw__historyBtn = this.ryw_TopZone.getChildByName("HistoryBtn") as Laya.Sprite;
        // }
        return this.ryw__historyBtn;
    }
    private ryw__historyBtn : Laya.Sprite = null;
    public get ryw_TopZone()
    {
        // if(null == this.ryw__topZone)
        // {
        //     this.ryw__topZone = this.ryw_View.getChildByName("TopZone") as Laya.Clip;
        // }
        return this.ryw__topZone;
    }
    protected ryw__topZone : Laya.Clip = null;

    onAwake()
    {
        // this.ryw__topZone = this.ryw_View.getChildByName("TopZone") as Laya.Clip;
        // if(ryw_Utilit.ryw_isIphoneX())
        // {
        //     this.ryw__topZone.top =  this.ryw__topZone.top + 75;
        // }
        // this.ryw__historyBtn = this.ryw__topZone.getChildByName("HistoryBtn") as Laya.Sprite;
        // if(-1 == ryw_WudianMgr.ryw_IpBlockFlag())
        // {
        //     this.ryw__historyBtn.visible = false;
        // }
        // else
        // {
        //     this.ryw__historyBtn.visible = this.isShowHistoryBtn;
        // }
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
        // this.ryw_HistoryBtn.on(Laya.Event.CLICK,this,this.ryw_onHistoryBtn);
        // ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.ryw_App_OnUpdateIpBlockState,this,this.onUpdateIpBlockState);
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        // this.ryw_HistoryBtn.off(Laya.Event.CLICK,this,this.ryw_onHistoryBtn);
        // ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.ryw_App_OnUpdateIpBlockState,this,this.onUpdateIpBlockState);
    }

    protected ryw_onHistoryBtn()
    {
        // let self = this;
        // ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_MiniGameView,null,(v : ryw_MiniGameViewTemplate)=>
        // {
        //     self.ryw_hide();
        //     v.ryw_onCloseEvent = ()=>
        //     {
        //         if(null != self.ryw_View && !self.ryw_View.destroyed)
        //         {
        //             self.ryw_show();
        //         }
        //     }
        // })
    }

    protected get isShowHistoryBtn()
    {
        // let launchScene = 0;
        // if(Laya.Browser.onMiniGame)
        // {
        //     launchScene = ryw_WXAPI.ryw_getLaunchOptionsSync().scene;
        // }
        // else if(Laya.Browser.onQQMiniGame)
        // {
        //     launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
        // }
        // let noEnterBySearch: boolean = true;
        // let wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
        // for (let i = 0; i < wudianSceneList.length; ++i)  
        // {
        //     let wudianSceneValue = wudianSceneList[i];
        //     if(launchScene == wudianSceneValue)
        //     {
        //         noEnterBySearch = false;
        //     }
        // }
        // if(Laya.Browser.onQGMiniGame || !noEnterBySearch || !ryw_WudianMgr.ryw_GetIpBlocked()
        //     || 0 ==  ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().fakeBtn)
        // {
        //     return false;
        // }
        return false;
    }

    protected onUpdateIpBlockState(para)
    {
        // this.ryw__historyBtn.visible = this.isShowHistoryBtn;
    }
}