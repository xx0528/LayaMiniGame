import TemplateViewBase from "../TemplateViewBase";
import KRQ_Main from "../../../KRQ/ViewCom/KRQ_Main";
import EventMgr from "../../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../../Event/EventDef";
import User from "../../../User/User";
import Utilit_ from "../../../Utilit";

export default class MainView_ppxhc_Template extends TemplateViewBase
{
    protected _krq_ppxhc_Main : KRQ_Main = null;

    protected _center_ppxhc_Zone : Laya.Clip = null;
    protected _start_ppxhc_Btn : Laya.Sprite = null;

    protected _level_ppxhc_Num : Laya.FontClip = null;
    protected _money_ppxhc_Num : Laya.FontClip = null;
    
    onAwake()
    {
        super.onAwake();

        // this._krq_ppxhc_Main = this.View.getChildByName("KRQ_Main").getComponent(KRQ_Main);
        this._center_ppxhc_Zone = this.View.getChildByName("CenterZone") as Laya.Clip;

        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if(aspectRatio  < 0.5) 
        {
            if(Utilit_.isIphoneX_())
            {
                this._center_ppxhc_Zone.top =  this._center_ppxhc_Zone.top + 75;
            }
        }
        else
        {
            this._center_ppxhc_Zone.top =  this._center_ppxhc_Zone.top - 200;
            if(Utilit_.isIphoneX_())
            {
                this._center_ppxhc_Zone.top =  this._center_ppxhc_Zone.top + 75;
            }
        }

        this._start_ppxhc_Btn = this._center_ppxhc_Zone.getChildByName("StartBtn") as Laya.Sprite;

        this._level_ppxhc_Num = this._center_ppxhc_Zone.getChildByName("LevelInfo").getChildByName("LevelNum") as Laya.FontClip;
        this._money_ppxhc_Num = this._center_ppxhc_Zone.getChildByName("MoneyInfo").getChildByName("MoneyNum") as Laya.FontClip;
    }

    onStart()
    {
        super.onStart();
        this._money_ppxhc_Num.value = String(User.get_ppxhc_Money());
        this._level_ppxhc_Num.value = String(User.get_ppxhc_LeveNum());
    }

    addEvent()
    {
        super.addEvent();
        this._start_ppxhc_Btn.on(Laya.Event.CLICK,this,this.onStartBtn);
        EventMgr.instance.regEvemt_(Event_ppxhc_Def.Game_OnUserMoneyChange,this,this.onUserMoneyChange);
    }

    remove_ppxhc_Event()
    {
        super.remove_ppxhc_Event();
        this._start_ppxhc_Btn.off(Laya.Event.CLICK,this,this.onStartBtn);
        EventMgr.instance.removeEvent_(Event_ppxhc_Def.Game_OnUserMoneyChange,this,this.onUserMoneyChange);
    }

    protected onStartBtn()
    {
        
    }

    protected onUserMoneyChange(para)
    {
        let curr = para.curr;
        let last = para.last;
        this._money_ppxhc_Num.value = String(curr);
    }
}