import ryw_KRQ_ViewComBase from "./KRQ_ViewComBase";
import ryw_KRQ_RollSingleAd from "../Com/KRQ_RollSingleAd";

export default class ryw_KRQ_GameOver extends ryw_KRQ_ViewComBase
{
    protected ryw__centerZone : Laya.Clip = null;
    protected ryw__rollSingleAds : Array<ryw_KRQ_RollSingleAd> = new Array<ryw_KRQ_RollSingleAd>();
    
    onAwake()
    {
        this.ryw__centerZone = this.ryw_Sprite.getChildByName("CenterZone") as Laya.Clip;
        for (let i = 0; i < this.ryw__centerZone.numChildren; ++i)  
        {
            let ad = this.ryw__centerZone.getChildAt(i).getComponent(ryw_KRQ_RollSingleAd) as ryw_KRQ_RollSingleAd;
            this.ryw__rollSingleAds.push(ad);
        }
    }

    onStart()
    {
        for (let i = 0; i < this.ryw__rollSingleAds.length; ++i)  
        {
            let ad = this.ryw__rollSingleAds[i];
            Laya.timer.once((this.ryw__rollSingleAds.length - i) * 150,this,()=>
            {
                ad.ryw_playAni();
            })
        }
    }
}
