import Loop_wcjtn_Ad_wcjtn_View from "./LoopAdView";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";

export default class Pop_wcjtn_Ad_wcjtn_View extends Laya.Script 
{

    protected _bg_wcjtn_ : Laya.Sprite;
    protected _pop_wcjtn_Btn : Laya.Sprite;
    protected _loop_wcjtn_Ad : Loop_wcjtn_Ad_wcjtn_View;

    onAwake()
    {
        this._bg_wcjtn_ = this.owner.getChildByName("BG") as Laya.Sprite;
        this._pop_wcjtn_Btn = this._bg_wcjtn_.getChildByName("PopADBtn") as Laya.Sprite;
        this._loop_wcjtn_Ad = this._bg_wcjtn_.getChildByName("LoopAD").getComponent(Loop_wcjtn_Ad_wcjtn_View);
        this._loop_wcjtn_Ad.Ad_wcjtn_Pos_wcjtn_ID = 44;
    }
    
    onEnable(): void 
    {
        this._pop_wcjtn_Btn.on(Laya.Event.CLICK,this,this.on_wcjtn_Pop_wcjtn_Btn_wcjtn_Click);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail,this,this.on_wcjtn_Share_wcjtn_AdFail);
    }

    onDisable(): void 
    {
        this._pop_wcjtn_Btn.off(Laya.Event.CLICK,this,this.on_wcjtn_Pop_wcjtn_Btn_wcjtn_Click);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail,this,this.on_wcjtn_Share_wcjtn_AdFail);
    }


    protected on_wcjtn_Pop_wcjtn_Btn_wcjtn_Click()
    {
        if(this._bg_wcjtn_.x > 0)
        {
            this.pop_wcjtn_Down();
        }
        else
        {
            this.pop_wcjtn_Up();
        }
    }

    public pop_wcjtn_Down()
    {
        Laya.Tween.to(this._bg_wcjtn_,
            {x : 0},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    public pop_wcjtn_Up()
    {
        Laya.Tween.to(this._bg_wcjtn_,
            {x : this._bg_wcjtn_.width},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    protected on_wcjtn_Share_wcjtn_AdFail()
    {
        this.pop_wcjtn_Up();
    }
}