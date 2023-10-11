import Loop_myqq_AdView from "./LoopAdView";
import Event_myqq_Mgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";

export default class Pop_myqq_AdView extends Laya.Script 
{

    protected _bg : Laya.Sprite;
    protected _popBtn : Laya.Sprite;
    protected _loopAd : Loop_myqq_AdView;

    onAwake()
    {
        this._bg = this.owner.getChildByName("BG") as Laya.Sprite;
        this._popBtn = this._bg.getChildByName("PopADBtn") as Laya.Sprite;
        this._loopAd = this._bg.getChildByName("LoopAD").getComponent(Loop_myqq_AdView);
        this._loopAd.AdPosID = 44;
    }
    
    onEnable(): void 
    {
        this._popBtn.on(Laya.Event.CLICK,this,this.on_myqq_PopBtnClick);
        Event_myqq_Mgr.instance.regEvemt(EventDef.AD_OnShareAdFail,this,this.on_myqq_ShareAdFail);
    }

    onDisable(): void 
    {
        this._popBtn.off(Laya.Event.CLICK,this,this.on_myqq_PopBtnClick);
        Event_myqq_Mgr.instance.removeEvent(EventDef.AD_OnShareAdFail,this,this.on_myqq_ShareAdFail);
    }


    protected on_myqq_PopBtnClick()
    {
        if(this._bg.x > 0)
        {
            this.pop_myqq_Down();
        }
        else
        {
            this.pop_myqq_Up();
        }
    }

    public pop_myqq_Down()
    {
        Laya.Tween.to(this._bg,
            {x : 0},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    public pop_myqq_Up()
    {
        Laya.Tween.to(this._bg,
            {x : this._bg.width},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    protected on_myqq_ShareAdFail()
    {
        this.pop_myqq_Up();
    }
}