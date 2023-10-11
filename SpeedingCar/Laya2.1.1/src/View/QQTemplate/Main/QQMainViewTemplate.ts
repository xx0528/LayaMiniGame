import KRQ_Main from "../../../KRQ/ViewCom/KRQ_Main";
import Event_wcjtn_Mgr from "../../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../../Event/EventDef";
import User_wcjtn_ from "../../../User/User";
import Utilit_wcjtn_ from "../../../Utilit";
import QQ_wcjtn_Template_wcjtn_ViewBase from "../QQTemplateViewBase";
import QQMiniGameAPI from "../../../QQMiniGameAPI";

export default class QQ_wcjtn_Main_wcjtn_View_wcjtn_Template extends QQ_wcjtn_Template_wcjtn_ViewBase
{
    protected _center_wcjtn_Zone : Laya.Clip = null;
    protected _start_wcjtn_Btn : Laya.Sprite = null;

    protected _level_wcjtn_Num : Laya.FontClip = null;
    protected _money_wcjtn_Num : Laya.FontClip = null;
    
    protected _more_wcjtn_Game_wcjtn_Btn : Laya.Sprite = null;

    onAwake()
    {
        super.onAwake();

        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone") as Laya.Clip;
        this._more_wcjtn_Game_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("MoreGameBtn") as Laya.Sprite;

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
            //this._center_wcjtn_Zone.top =  this._center_wcjtn_Zone.top - 200;
            if(Utilit_wcjtn_.is_wcjtn_IphoneX())
            {
                this._center_wcjtn_Zone.top =  this._center_wcjtn_Zone.top + 75;
            }
        }

        this._start_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("StartBtn") as Laya.Sprite;

        this._level_wcjtn_Num = this._center_wcjtn_Zone.getChildByName("LevelInfo").getChildByName("LevelNum") as Laya.FontClip;
        this._money_wcjtn_Num = this._center_wcjtn_Zone.getChildByName("MoneyInfo").getChildByName("MoneyNum") as Laya.FontClip;
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
        this._more_wcjtn_Game_wcjtn_Btn.on(Laya.Event.CLICK,this,this.onMore_wcjtn_Game_wcjtn_Btn);

        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change,this,this.on_wcjtn_User_wcjtn_MoneyChange);
    }

    remove_wcjtn_Event()
    {
        super.remove_wcjtn_Event();
        this._start_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_Start_wcjtn_Btn);
        this._more_wcjtn_Game_wcjtn_Btn.off(Laya.Event.CLICK,this,this.onMore_wcjtn_Game_wcjtn_Btn);
        
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change,this,this.on_wcjtn_User_wcjtn_MoneyChange);
    }

    protected on_wcjtn_Start_wcjtn_Btn()
    {
        
    }

    protected onMore_wcjtn_Game_wcjtn_Btn()
    {
        QQMiniGameAPI.show_wcjtn_App_wcjtn_BoxAd(()=>
        {
            
        });
    }

    protected on_wcjtn_User_wcjtn_MoneyChange(para)
    {
        let curr = para.curr;
        let last = para.last;
        this._money_wcjtn_Num.value = String(curr);
    }
}