import LoopAd_tippy_View from "./LoopAdView";
import Event_tippy_Mgr from "../../Event/EventMgr";
import { Event_tippy_Def } from "../../Event/EventDef";

export default class PopAd_tippy_View extends Laya.Script 
{

    protected _bg : Laya.Sprite;
    protected _popBtn : Laya.Sprite;
    protected _loopAd : LoopAd_tippy_View;

    onAwake()
    {
        this._bg = this.owner.getChildByName("BG") as Laya.Sprite;
        this._popBtn = this._bg.getChildByName("PopADBtn") as Laya.Sprite;
        this._loopAd = this._bg.getChildByName("LoopAD").getComponent(LoopAd_tippy_View);
        this._loopAd.AdPosID = 44;
    }
    
    onEnable(): void 
    {
        this._popBtn.on(Laya.Event.CLICK,this,this.onPop_tippy_BtnClick);
        Event_tippy_Mgr.ins_tippy_tance.regEvemt(Event_tippy_Def.AD__tippy_OnShareAdFail,this,this.onShare_tippy_AdFail);
    }

    onDisable(): void 
    {
        this._popBtn.off(Laya.Event.CLICK,this,this.onPop_tippy_BtnClick);
        Event_tippy_Mgr.ins_tippy_tance.removeEvent(Event_tippy_Def.AD__tippy_OnShareAdFail,this,this.onShare_tippy_AdFail);
    }


    protected onPop_tippy_BtnClick()
    {
        if(this._bg.x > 0)
        {
            this.pop_tippy_Down();
        }
        else
        {
            this.pop_tippy_Up();
        }
    }

    public pop_tippy_Down()
    {
        Laya.Tween.to(this._bg,
            {x : 0},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    public pop_tippy_Up()
    {
        Laya.Tween.to(this._bg,
            {x : this._bg.width},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    protected onShare_tippy_AdFail()
    {
        this.pop_tippy_Up();
    }
}