import KRQ_Main from "../../../KRQ/ViewCom/KRQ_Main";
import Event_wcjtn_Mgr from "../../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../../Event/EventDef";
import User_wcjtn_ from "../../../User/User";
import Utilit_wcjtn_ from "../../../Utilit";
import TT_wcjtn_Template_wcjtn_View_wcjtn_Base from "../TTTemplateViewBase";
import TT_wcjtn_API from "../../../TTAPI";
import App_wcjtn_Switch_wcjtn_Config from "../../../Config/AppSwitchConfig";

export default class TT_wcjtn_Main_wcjtn_ViewTemplate extends TT_wcjtn_Template_wcjtn_View_wcjtn_Base
{
    protected _center_wcjtn_Zone : Laya.Clip = null;
    protected _start_wcjtn_Btn : Laya.Sprite = null;

    protected _level_wcjtn_Num : Laya.FontClip = null;
    protected _money_wcjtn_Num : Laya.FontClip = null;
    
    protected _more_wcjtn_GameBtn : Laya.Sprite = null;
    protected _share_wcjtn_Btn : Laya.Sprite = null;

    onAwake()
    {
        super.onAwake();

        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone") as Laya.Clip;
        this._more_wcjtn_GameBtn = this._center_wcjtn_Zone.getChildByName("MoreGameBtn") as Laya.Clip;
        this._share_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("ShareBtn") as Laya.Clip;

        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit_wcjtn_.is_wcjtn_IphoneX())
            {
                this._center_wcjtn_Zone.top =  this._center_wcjtn_Zone.top + 75;
            }
        }
        else
        {
            this._center_wcjtn_Zone.top =  this._center_wcjtn_Zone.top - 200;
            if(Utilit_wcjtn_.is_wcjtn_IphoneX())
            {
                this._center_wcjtn_Zone.top =  this._center_wcjtn_Zone.top + 75;
            }
        }

        this._start_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("StartBtn") as Laya.Sprite;

        this._level_wcjtn_Num = this._center_wcjtn_Zone.getChildByName("LevelInfo").getChildByName("LevelNum") as Laya.FontClip;
        this._money_wcjtn_Num = this._center_wcjtn_Zone.getChildByName("MoneyInfo").getChildByName("MoneyNum") as Laya.FontClip;


        this._more_wcjtn_GameBtn.visible = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().tt_wcjtn_cfg.more_wcjtn_Game_wcjtn_Switch == 1;
    }

    onStart()
    {
        super.onStart();
        this._money_wcjtn_Num.value = String(User_wcjtn_.get_wcjtn_Money());
        this._level_wcjtn_Num.value = String(User_wcjtn_.get_wcjtn_LeveNum());
    }

    add_wcjtn_Event()
    {
        super.add_wcjtn_Event();
        this._start_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_Start_wcjtn_Btn);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change,this,this.on_wcjtn_User_wcjtn_MoneyChange);

        this._more_wcjtn_GameBtn.on(Laya.Event.CLICK,this,this.on_wcjtn_More_wcjtn_GameBtn);
        this._share_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_Share_wcjtn_Btn);
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        this._start_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_Start_wcjtn_Btn);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change,this,this.on_wcjtn_User_wcjtn_MoneyChange);

        this._more_wcjtn_GameBtn.off(Laya.Event.CLICK,this,this.on_wcjtn_More_wcjtn_GameBtn);
        this._share_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_Share_wcjtn_Btn);
    }

    protected on_wcjtn_Start_wcjtn_Btn()
    {
        
    }

    protected on_wcjtn_More_wcjtn_GameBtn()
    {
        TT_wcjtn_API.showMoreGamesModal(()=>
        {
            
        },()=>
        {

        })
    }

    protected on_wcjtn_Share_wcjtn_Btn()
    {
        TT_wcjtn_API.share_wcjtn_(()=>
        {

        })
    }

    protected on_wcjtn_User_wcjtn_MoneyChange(para)
    {
        let curr = para.curr;
        let last = para.last;
        this._money_wcjtn_Num.value = String(curr);
    }
}