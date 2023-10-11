import View_wcjtn_Base from "../ViewBase";
import Utilit_wcjtn_ from "../../Utilit";
import View_wcjtn_Mgr, { View_wcjtn_Def } from "../../Mgr/ViewMgr";
import Mini_wcjtn_Game_wcjtn_View_wcjtn_Template from "./MiniGame/MiniGameViewTemplate";
import Wu_wcjtn_dian_wcjtn_Mgr from "../../Mgr/WudianMgr";
import WX_wcjtn_API from "../../WXAPI";
import App_wcjtn_Switch_wcjtn_Config from "../../Config/AppSwitchConfig";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "../../QQMiniGameAPI";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";

export default class Template_wcjtn_View_wcjtn_Base extends View_wcjtn_Base 
{
    public get History_wcjtn_Btn()
    {
        if(null == this._history_wcjtn_Btn)
        {
            this._history_wcjtn_Btn = this.Top_wcjtn_Zone.getChildByName("HistoryBtn") as Laya.Sprite;
        }
        return this._history_wcjtn_Btn;
    }
    private _history_wcjtn_Btn : Laya.Sprite = null;
    public get Top_wcjtn_Zone()
    {
        if(null == this._top_wcjtn_Zone)
        {
            this._top_wcjtn_Zone = this.View_wcjtn_.getChildByName("TopZone") as Laya.Clip;
        }
        return this._top_wcjtn_Zone;
    }
    protected _top_wcjtn_Zone : Laya.Clip = null;

    onAwake()
    {
        this._top_wcjtn_Zone = this.View_wcjtn_.getChildByName("TopZone") as Laya.Clip;
        if(Utilit_wcjtn_.is_wcjtn_IphoneX())
        {
            this._top_wcjtn_Zone.top =  this._top_wcjtn_Zone.top + 75;
        }
        this._history_wcjtn_Btn = this._top_wcjtn_Zone.getChildByName("HistoryBtn") as Laya.Sprite;
        if(-1 == Wu_wcjtn_dian_wcjtn_Mgr.Ip_wcjtn_Block_wcjtn_Flag())
        {
            this._history_wcjtn_Btn.visible = false;
        }
        else
        {
            this._history_wcjtn_Btn.visible = this.is_wcjtn_Show_wcjtn_HistoryBtn;
        }
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
        this.History_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_History_wcjtn_Btn);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.App_On_wcjtn_Update_wcjtn_IpBlockState,this,this.on_wcjtn_UpdateIp_wcjtn_BlockState);
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        this.History_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_History_wcjtn_Btn);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.App_On_wcjtn_Update_wcjtn_IpBlockState,this,this.on_wcjtn_UpdateIp_wcjtn_BlockState);
    }

    protected on_wcjtn_History_wcjtn_Btn()
    {
        let self = this;
        View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.MiniGameView,null,(v : Mini_wcjtn_Game_wcjtn_View_wcjtn_Template)=>
        {
            self.hide_wcjtn_();
            v.on_wcjtn_CloseEvent = ()=>
            {
                if(null != self.View_wcjtn_ && !self.View_wcjtn_.destroyed)
                {
                    self.show_wcjtn_();
                }
            }
        })
    }

    protected get is_wcjtn_Show_wcjtn_HistoryBtn()
    {
        let launchScene = 0;
        if(Laya.Browser.onMiniGame)
        {
            launchScene = WX_wcjtn_API.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            launchScene = QQ_wcjtn_Mini_wcjtn_GameAPI.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
        }
        let noEnterBySearch: boolean = true;
        let wudianSceneList = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
        for (let i = 0; i < wudianSceneList.length; ++i)  
        {
            let wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        if(Laya.Browser.onQGMiniGame || !noEnterBySearch || !Wu_wcjtn_dian_wcjtn_Mgr.Get_wcjtn_Ip_wcjtn_Blocked() 
            || 0 == App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().fakeBtn)
        {
            return false;
        }
        return true;
    }

    protected on_wcjtn_UpdateIp_wcjtn_BlockState(para)
    {
        this._history_wcjtn_Btn.visible = this.is_wcjtn_Show_wcjtn_HistoryBtn;
    }
}