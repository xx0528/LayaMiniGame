import Loop_ppxhc_AdView from "./LoopAdView";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";

export default class Pop_ppxhc_AdView extends Laya.Script 
{

    protected _bg : Laya.Sprite;
    protected _popBtn : Laya.Sprite;
    protected _loopAd : Loop_ppxhc_AdView;

    onAwake()
    {
        this._bg = this.owner.getChildByName("BG") as Laya.Sprite;
        this._popBtn = this._bg.getChildByName("PopADBtn") as Laya.Sprite;
        this._loopAd = this._bg.getChildByName("LoopAD").getComponent(Loop_ppxhc_AdView);
        this._loopAd.AdPosID = 44;
    }
    
    onEnable(): void 
    {
        this._popBtn.on(Laya.Event.CLICK,this,this.onPopBtnClick);
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.AD_OnShareAdFail,this,this.onShareAdFail);
    }

    onDisable(): void 
    {
        this._popBtn.off(Laya.Event.CLICK,this,this.onPopBtnClick);
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.AD_OnShareAdFail,this,this.onShareAdFail);
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