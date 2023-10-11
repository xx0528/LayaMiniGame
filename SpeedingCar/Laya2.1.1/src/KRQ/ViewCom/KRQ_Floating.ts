import KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base from "./KRQ_ViewComBase";
import KRQ_wcjtn__Rock_wcjtn_Single_wcjtn_Ad from "../Com/KRQ_RockSingleAd";

export default class KRQ_wcjtn__Floating_wcjtn_ extends KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base
{
    protected _center_wcjtn_Zone : Laya.Clip = null;
    protected _rock_wcjtn_Single_wcjtn_Ads : Array<KRQ_wcjtn__Rock_wcjtn_Single_wcjtn_Ad> = new Array<KRQ_wcjtn__Rock_wcjtn_Single_wcjtn_Ad>();
    protected _ani_wcjtn_Spaceing : number = 3000;

    onAwake()
    {
        this._center_wcjtn_Zone = this._wcjtn_Sprite_wcjtn_.getChildByName("CenterZone") as Laya.Clip;
        for (let i = 0; i < this._center_wcjtn_Zone.numChildren; ++i)  
        {
            let child = this._center_wcjtn_Zone.getChildAt(i) as Laya.Sprite;
            if(child.visible)
            {
                let rockAd = child.getComponent(KRQ_wcjtn__Rock_wcjtn_Single_wcjtn_Ad) as KRQ_wcjtn__Rock_wcjtn_Single_wcjtn_Ad;
                this._rock_wcjtn_Single_wcjtn_Ads.push(rockAd);
            }
        }
    }

    onStart()
    {
        let self = this;
        self.play_wcjtn_Ani();
        Laya.timer.loop(this._rock_wcjtn_Single_wcjtn_Ads.length * (this._ani_wcjtn_Spaceing + 500),this,()=>
        {
            self.play_wcjtn_Ani(()=>
            {
                self.refresh_wcjtn_Ad();
            });
        })
    }

    public refresh_wcjtn_Ad()
    {
        for (let i = 0; i < this._rock_wcjtn_Single_wcjtn_Ads.length; ++i)  
        {
            let ad = this._rock_wcjtn_Single_wcjtn_Ads[i];
            if(null == ad._wcjtn_Data_wcjtn_)
            {
                ad._wcjtn_Sprite_wcjtn_.visible = false;
            }
            ad.ref_wcjtn_resh();
        }
    }

    protected play_wcjtn_Ani(onComplate? : Function)
    {
        let len = this._rock_wcjtn_Single_wcjtn_Ads.length;
        for (let i = 0; i < this._rock_wcjtn_Single_wcjtn_Ads.length; ++i)  
        {
            let index = i;
            let ad = this._rock_wcjtn_Single_wcjtn_Ads[index];
            Laya.timer.once(this._ani_wcjtn_Spaceing * i,ad,()=>
            {
                if(index == len - 1)
                {
                    ad.play_wcjtn_Ani(onComplate);
                }
                else
                {
                    ad.play_wcjtn_Ani();
                }
            })
        }
    }
}