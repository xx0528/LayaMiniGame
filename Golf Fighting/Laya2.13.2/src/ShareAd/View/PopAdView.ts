import LoopAdView from "./LoopAdView";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";

export default class PopAdView extends Laya.Script 
{

    protected _bg : Laya.Sprite;
    protected _popBtn : Laya.Sprite;
    protected _loopAd : LoopAdView;

    onAwake()
    {
        this._bg = this.owner.getChildByName("BG") as Laya.Sprite;
        this._popBtn = this._bg.getChildByName("PopADBtn") as Laya.Sprite;
        this._loopAd = this._bg.getChildByName("LoopAD").getComponent(LoopAdView);
        this._loopAd.AdPosID = 44;
    }
    
    onEnable(): void 
    {
        this._popBtn.on(Laya.Event.CLICK,this,this.onPopBtnClick);
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.AD_OnShareAdFail,this,this.onShareAdFail);
    }

    onDisable(): void 
    {
        this._popBtn.off(Laya.Event.CLICK,this,this.onPopBtnClick);
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.AD_OnShareAdFail,this,this.onShareAdFail);
    }


    protected onPopBtnClick()
    {
        if(this._bg.x > 0)
        {
            this.popDown();
        }
        else
        {
            this.popUp();
        }
    }

    public popDown()
    {
        Laya.Tween.to(this._bg,
            {x : 0},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    public popUp()
    {
        Laya.Tween.to(this._bg,
            {x : this._bg.width},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    protected onShareAdFail()
    {
        this.popUp();
    }
}