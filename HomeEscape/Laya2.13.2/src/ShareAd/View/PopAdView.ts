import ryw_LoopAdView from "./LoopAdView";
import ryw_EventMgr from "../../Event/EventMgr";
import { ryw_EventDef } from "../../Event/EventDef";

export default class ryw_PopAdView extends Laya.Script 
{

    protected ryw__bg : Laya.Sprite;
    protected ryw__popBtn : Laya.Sprite;
    protected ryw__loopAd : ryw_LoopAdView;

    onAwake()
    {
        this.ryw__bg = this.owner.getChildByName("BG") as Laya.Sprite;
        this.ryw__popBtn = this.ryw__bg.getChildByName("PopADBtn") as Laya.Sprite;
        this.ryw__loopAd = this.ryw__bg.getChildByName("LoopAD").getComponent(ryw_LoopAdView);
        this.ryw__loopAd.ryw_AdPosID = 44;
    }
    
    onEnable(): void 
    {
        this.ryw__popBtn.on(Laya.Event.CLICK,this,this.ryw_onPopBtnClick);
        ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.ryw_AD_OnShareAdFail,this,this.ryw_onShareAdFail);
    }

    onDisable(): void 
    {
        this.ryw__popBtn.off(Laya.Event.CLICK,this,this.ryw_onPopBtnClick);
        ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.ryw_AD_OnShareAdFail,this,this.ryw_onShareAdFail);
    }


    protected ryw_onPopBtnClick()
    {
        if(this.ryw__bg.x > 0)
        {
            this.ryw_popDown();
        }
        else
        {
            this.ryw_popUp();
        }
    }

    public ryw_popDown()
    {
        Laya.Tween.to(this.ryw__bg,
            {x : 0},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    public ryw_popUp()
    {
        Laya.Tween.to(this.ryw__bg,
            {x : this.ryw__bg.width},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    protected ryw_onShareAdFail()
    {
        this.ryw_popUp();
    }
}