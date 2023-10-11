import KRQ_ViewComBase from "./KRQ_ViewComBase";
import KRQ_RollSingleAd from "../Com/KRQ_RollSingleAd";

export default class KRQ_GameOver extends KRQ_ViewComBase
{
    protected _centerZone : Laya.Clip = null;
    protected _rollSingleAds : Array<KRQ_RollSingleAd> = new Array<KRQ_RollSingleAd>();
    
    onAwake()
    {
        this._centerZone = this.Sprite.getChildByName("CenterZone") as Laya.Clip;
        for (let i = 0; i < this._centerZone.numChildren; ++i)  
        {
            let ad = this._centerZone.getChildAt(i).getComponent(KRQ_RollSingleAd) as KRQ_RollSingleAd;
            this._rollSingleAds.push(ad);
        }
    }

    onStart()
    {
        for (let i = 0; i < this._rollSingleAds.length; ++i)  
        {
            let ad = this._rollSingleAds[i];
            Laya.timer.once((this._rollSingleAds.length - i) * 150,this,()=>
            {
                ad.playAni();
            })
        }
    }
}
