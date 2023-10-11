import LoopA_JJKLBB_dView from "./LoopAdView";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";

export default class PopA_JJKLBB_dView extends Laya.Script 
{

    protected _b_JJKLBB_g : Laya.Sprite;
    protected _po_JJKLBB_pBtn : Laya.Sprite;
    protected _loo_JJKLBB_pAd : LoopA_JJKLBB_dView;

    onAwake()
    {
        this._b_JJKLBB_g = this.owner.getChildByName("BG") as Laya.Sprite;
        this._po_JJKLBB_pBtn = this._b_JJKLBB_g.getChildByName("PopADBtn") as Laya.Sprite;
        this._loo_JJKLBB_pAd = this._b_JJKLBB_g.getChildByName("LoopAD").getComponent(LoopA_JJKLBB_dView);
        this._loo_JJKLBB_pAd.AdPo_JJKLBB_sID = 44;
    }
    
    onEnable(): void 
    {
        this._po_JJKLBB_pBtn.on(Laya.Event.CLICK,this,this.onPopB_JJKLBB_tnClick);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail,this,this.onSha_JJKLBB_reAdFail);
    }

    onDisable(): void 
    {
        this._po_JJKLBB_pBtn.off(Laya.Event.CLICK,this,this.onPopB_JJKLBB_tnClick);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail,this,this.onSha_JJKLBB_reAdFail);
    }


    protected onPopB_JJKLBB_tnClick()
    {
        if(this._b_JJKLBB_g.x > 0)
        {
            this.pop_JJKLBB_Down();
        }
        else
        {
            this.po_JJKLBB_pUp();
        }
    }

    public pop_JJKLBB_Down()
    {
        Laya.Tween.to(this._b_JJKLBB_g,
            {x : 0},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    public po_JJKLBB_pUp()
    {
        Laya.Tween.to(this._b_JJKLBB_g,
            {x : this._b_JJKLBB_g.width},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    protected onSha_JJKLBB_reAdFail()
    {
        this.po_JJKLBB_pUp();
    }
}