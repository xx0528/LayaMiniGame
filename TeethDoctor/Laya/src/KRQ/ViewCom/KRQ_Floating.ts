import KRQ_View_XYXZS_ComBase from "./KRQ_ViewComBase";
import KRQ_Roc_XYXZS_kSingleAd from "../Com/KRQ_RockSingleAd";

export default class KRQ_Fl_XYXZS_oating extends KRQ_View_XYXZS_ComBase
{
    protected _cent_XYXZS_erZone : Laya.Clip = null;
    protected _rock_XYXZS_SingleAds : Array<KRQ_Roc_XYXZS_kSingleAd> = new Array<KRQ_Roc_XYXZS_kSingleAd>();
    protected _aniS_XYXZS_paceing : number = 3000;

    onAwake()
    {
        this._cent_XYXZS_erZone = this.Sprite.getChildByName("CenterZone") as Laya.Clip;
        for (let i = 0; i < this._cent_XYXZS_erZone.numChildren; ++i)  
        {
            let child = this._cent_XYXZS_erZone.getChildAt(i) as Laya.Sprite;
            if(child.visible)
            {
                let rockAd = child.getComponent(KRQ_Roc_XYXZS_kSingleAd) as KRQ_Roc_XYXZS_kSingleAd;
                this._rock_XYXZS_SingleAds.push(rockAd);
            }
        }
    }

    onStart()
    {
        let self = this;
        self.pla_XYXZS_yAni();
        Laya.timer.loop(this._rock_XYXZS_SingleAds.length * (this._aniS_XYXZS_paceing + 500),this,()=>
        {
            self.pla_XYXZS_yAni(()=>
            {
                self.refr_XYXZS_eshAd();
            });
        })
    }

    public refr_XYXZS_eshAd()
    {
        for (let i = 0; i < this._rock_XYXZS_SingleAds.length; ++i)  
        {
            let ad = this._rock_XYXZS_SingleAds[i];
            if(null == ad.Da_XYXZS_ta)
            {
                ad.Sp_XYXZS_rite.visible = false;
            }
            ad.re_XYXZS_fres();
        }
    }

    protected pla_XYXZS_yAni(onComplate? : Function)
    {
        let len = this._rock_XYXZS_SingleAds.length;
        for (let i = 0; i < this._rock_XYXZS_SingleAds.length; ++i)  
        {
            let index = i;
            let ad = this._rock_XYXZS_SingleAds[index];
            Laya.timer.once(this._aniS_XYXZS_paceing * i,ad,()=>
            {
                if(index == len - 1)
                {
                    ad.pl_XYXZS_ayAni(onComplate);
                }
                else
                {
                    ad.pl_XYXZS_ayAni();
                }
            })
        }
    }
}