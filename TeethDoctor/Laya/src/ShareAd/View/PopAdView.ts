import LoopAdView from "./LoopAdView";
import Even_XYXZS_tMgr from "../../Event/EventMgr";
import { Even_XYXZS_tDef } from "../../Event/EventDef";

export default class PopA_XYXZS_dView extends Laya.Script 
{

    protected __XYXZS_bg : Laya.Sprite;
    protected _pop_XYXZS_Btn : Laya.Sprite;
    protected _loo_XYXZS_pAd : LoopAdView;

    onAwake()
    {
        this.__XYXZS_bg = this.owner.getChildByName("BG") as Laya.Sprite;
        this._pop_XYXZS_Btn = this.__XYXZS_bg.getChildByName("PopADBtn") as Laya.Sprite;
        this._loo_XYXZS_pAd = this.__XYXZS_bg.getChildByName("LoopAD").getComponent(LoopAdView);
        this._loo_XYXZS_pAd.AdPosID = 44;
    }
    
    onEnable(): void 
    {
        this._pop_XYXZS_Btn.on(Laya.Event.CLICK,this,this.onPop_XYXZS_BtnClick);
        Even_XYXZS_tMgr.in_XYXZS_stance.reg_XYXZS_Evemt(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail,this,this.onShar_XYXZS_eAdFail);
    }

    onDisable(): void 
    {
        this._pop_XYXZS_Btn.off(Laya.Event.CLICK,this,this.onPop_XYXZS_BtnClick);
        Even_XYXZS_tMgr.in_XYXZS_stance.re_XYXZS_moveEvent(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail,this,this.onShar_XYXZS_eAdFail);
    }


    protected onPop_XYXZS_BtnClick()
    {
        if(this.__XYXZS_bg.x > 0)
        {
            this.pop_XYXZS_Down();
        }
        else
        {
            this.p_XYXZS_opUp();
        }
    }

    public pop_XYXZS_Down()
    {
        Laya.Tween.to(this.__XYXZS_bg,
            {x : 0},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    public p_XYXZS_opUp()
    {
        Laya.Tween.to(this.__XYXZS_bg,
            {x : this.__XYXZS_bg.width},
            250,
            Laya.Ease.circIn,Laya.Handler.create(this,()=>
            {

            }),null,true)
    }

    protected onShar_XYXZS_eAdFail()
    {
        this.p_XYXZS_opUp();
    }
}