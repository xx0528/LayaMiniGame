import KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base from "./KRQ_ViewComBase";
import KRQ_Roll_wcjtn_Single_wcjtn_Ad from "../Com/KRQ_RollSingleAd";

export default class KRQ_wcjtn__Game_wcjtn_Over extends KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base
{
    protected _center_wcjtn_Zone : Laya.Clip = null;
    protected _roll_wcjtn_SingleAd_wcjtn_s : Array<KRQ_Roll_wcjtn_Single_wcjtn_Ad> = new Array<KRQ_Roll_wcjtn_Single_wcjtn_Ad>();
    
    onAwake()
    {
        this._center_wcjtn_Zone = this._wcjtn_Sprite_wcjtn_.getChildByName("CenterZone") as Laya.Clip;
        for (let i = 0; i < this._center_wcjtn_Zone.numChildren; ++i)  
        {
            let ad = this._center_wcjtn_Zone.getChildAt(i).getComponent(KRQ_Roll_wcjtn_Single_wcjtn_Ad) as KRQ_Roll_wcjtn_Single_wcjtn_Ad;
            this._roll_wcjtn_SingleAd_wcjtn_s.push(ad);
        }
    }

    onStart()
    {
        for (let i = 0; i < this._roll_wcjtn_SingleAd_wcjtn_s.length; ++i)  
        {
            let ad = this._roll_wcjtn_SingleAd_wcjtn_s[i];
            Laya.timer.once((this._roll_wcjtn_SingleAd_wcjtn_s.length - i) * 150,this,()=>
            {
                ad.play_wcjtn_Ani();
            })
        }
    }
}
