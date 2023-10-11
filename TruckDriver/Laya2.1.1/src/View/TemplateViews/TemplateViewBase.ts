import ViewBase from "../ViewBase";
import Utilit_ from "../../Utilit";
import ViewMgr, { View_ppxhc_Def } from "../../Mgr/ViewMgr";
import MiniGameView_ppxhc_Template from "./MiniGame/MiniGameViewTemplate";
import WXAPI from "../../WXAPI";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import QQMiniGameAPI from "../../QQMiniGameAPI";
import EventMgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import Wudian_ppxhc_Mgr from "../../Mgr/WudianMgr";

export default class TemplateViewBase extends ViewBase 
{
    public get History_ppxhc_Btn()
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
        // this._topZone = this.View.getChildByName("TopZone") as Laya.Clip;
        // if(Utilit_.isIphoneX_())
        // {
        //     this._topZone.top =  this._topZone.top + 75;
        // }
        // this._historyBtn = this._topZone.getChildByName("HistoryBtn") as Laya.Sprite;
        // if(-1 == Wudian_ppxhc_Mgr.IpBlock_ppxhc_Flag())
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
        // this.History_ppxhc_Btn.on(Laya.Event.CLICK,this,this.onHistory_ppxhc_Btn)
        // EventMgr.instance.regEvemt_(Event_ppxhc_Def.App_OnUpdateIpBlockState,this,this.onUpdateIpBlockState);
    }

    remove_ppxhc_Event()
    {
        super.removeEvent();
        // this.History_ppxhc_Btn.off(Laya.Event.CLICK,this,this.onHistory_ppxhc_Btn);
        // EventMgr.instance.removeEvent_(Event_ppxhc_Def.App_OnUpdateIpBlockState,this,this.onUpdateIpBlockState);
    }

    protected onHistory_ppxhc_Btn()
    {
        // let self = this;
        // ViewMgr.instance.openView(View_ppxhc_Def.MiniGameView,null,(v : MiniGameView_ppxhc_Template)=>
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
        // if(Laya.Browser.onQGMiniGame || !noEnterBySearch || !Wudian_ppxhc_Mgr.GetIp_ppxhc_Blocked() 
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