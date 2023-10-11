import KRQ_ViewComBase from "./KRQ_ViewComBase";
import KRQ_RockSingleAd from "../Com/KRQ_RockSingleAd";

export default class KRQ_Floating extends KRQ_ViewComBase
{
    protected _centerZone : Laya.Clip = null;
    protected _rockSingleAds : Array<KRQ_RockSingleAd> = new Array<KRQ_RockSingleAd>();
    protected _aniSpaceing : number = 3000;

    onAwake()
    {
        this._centerZone = this.Sprite.getChildByName("CenterZone") as Laya.Clip;
        for (let i = 0; i < this._centerZone.numChildren; ++i)  
        {
            let child = this._centerZone.getChildAt(i) as Laya.Sprite;
            if(child.visible)
            {
                let rockAd = child.getComponent(KRQ_RockSingleAd) as KRQ_RockSingleAd;
                this._rockSingleAds.push(rockAd);
            }
        }
    }

    onStart()
    {
        let self = this;
        self.playAni();
        Laya.timer.loop(this._rockSingleAds.length * (this._aniSpaceing + 500),this,()=>
        {
            self.playAni(()=>
            {
                self.refreshAd();
            });
        })
    }

    public refreshAd()
    {
        for (let i = 0; i < this._rockSingleAds.length; ++i)  
        {
            let ad = this._rockSingleAds[i];
            if(null == ad.Data)
            {
                ad.Sprite.visible = false;
            }
            ad.refresh();
        }
    }

    protected playAni(onComplate? : Function)
    {
        let len = this._rockSingleAds.length;
        for (let i = 0; i < this._rockSingleAds.length; ++i)  
        {
            let index = i;
            let ad = this._rockSingleAds[index];
            Laya.timer.once(this._aniSpaceing * i,ad,()=>
            {
                if(index == len - 1)
                {
                    ad.playAni(onComplate);
                }
                else
                {
                    ad.playAni();
                }
            })
        }
    }
}