import KRQ_View_XYXZS_ComBase from "./KRQ_ViewComBase";
import KRQ_Rol_XYXZS_lSingleAd from "../Com/KRQ_RollSingleAd";

export default class KRQ_G_XYXZS_ameOver extends KRQ_View_XYXZS_ComBase
{
    protected _cent_XYXZS_erZone : Laya.Clip = null;
    protected _rollSing_XYXZS_leAds : Array<KRQ_Rol_XYXZS_lSingleAd> = new Array<KRQ_Rol_XYXZS_lSingleAd>();
    
    onAwake()
    {
        this._cent_XYXZS_erZone = this.Sprite.getChildByName("CenterZone") as Laya.Clip;
        for (let i = 0; i < this._cent_XYXZS_erZone.numChildren; ++i)  
        {
            let ad = this._cent_XYXZS_erZone.getChildAt(i).getComponent(KRQ_Rol_XYXZS_lSingleAd) as KRQ_Rol_XYXZS_lSingleAd;
            this._rollSing_XYXZS_leAds.push(ad);
        }
    }

    onStart()
    {
        for (let i = 0; i < this._rollSing_XYXZS_leAds.length; ++i)  
        {
            let ad = this._rollSing_XYXZS_leAds[i];
            Laya.timer.once((this._rollSing_XYXZS_leAds.length - i) * 150,this,()=>
            {
                ad.pla_XYXZS_yAni();
            })
        }
    }
}
