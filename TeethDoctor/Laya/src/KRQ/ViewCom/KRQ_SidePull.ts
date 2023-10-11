import KRQ_View_XYXZS_ComBase from "./KRQ_ViewComBase";
import KRQ_V_XYXZS_LoopAd from "../Com/KRQ_LoopAd/KRQ_VLoopAd";

export default class KRQ_Sid_XYXZS_ePull extends KRQ_View_XYXZS_ComBase
{
    protected _krqV_XYXZS_LoopAd : KRQ_V_XYXZS_LoopAd = null;
    protected _pul_XYXZS_lBtn : Laya.Sprite = null;

    onAwake()
    {
        this._krqV_XYXZS_LoopAd = this.Sprite.getChildByName("KRQ_VLoopAd").getComponent(KRQ_V_XYXZS_LoopAd);
        this._pul_XYXZS_lBtn = this._krqV_XYXZS_LoopAd.Sp_XYXZS_rite.getChildByName("PullBtn") as Laya.Sprite;
        this._krqV_XYXZS_LoopAd.Sp_XYXZS_rite.x = -this._krqV_XYXZS_LoopAd.Sp_XYXZS_rite.width;
    }   

    onEnable()
    {
        this._pul_XYXZS_lBtn.on(Laya.Event.CLICK,this,this.onPu_XYXZS_llBtn);
    }

    onDisable()
    {
        this._pul_XYXZS_lBtn.off(Laya.Event.CLICK,this,this.onPu_XYXZS_llBtn);
    }

    protected onPu_XYXZS_llBtn()
    {
        if(this._krqV_XYXZS_LoopAd.Sp_XYXZS_rite.x < 0)
        {
            this.pu_XYXZS_ll();
        }
        else
        {
            this.pu_XYXZS_sh();
        }
    }

    public pu_XYXZS_ll()
    {
        Laya.Tween.to(this._krqV_XYXZS_LoopAd.Sp_XYXZS_rite,
            {
                x: 0
            }, 200, Laya.Ease.linearNone, null, 0, true)
    }

    public pu_XYXZS_sh()
    {
        Laya.Tween.to(this._krqV_XYXZS_LoopAd.Sp_XYXZS_rite,
            {
                x: -this._krqV_XYXZS_LoopAd.Sp_XYXZS_rite.width
            }, 200, Laya.Ease.linearNone, null, 0, true)
    }

    protected onSha_XYXZS_reAdFail()
    {
        this.pu_XYXZS_ll();
    }
}