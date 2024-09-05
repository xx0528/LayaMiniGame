import ryw_KRQ_ViewComBase from "./KRQ_ViewComBase";
import ryw_KRQ_RockSingleAd from "../Com/KRQ_RockSingleAd";

export default class ryw_KRQ_Floating extends ryw_KRQ_ViewComBase
{
    protected ryw__centerZone : Laya.Clip = null;
    protected ryw__rockSingleAds : Array<ryw_KRQ_RockSingleAd> = new Array<ryw_KRQ_RockSingleAd>();
    protected ryw__aniSpaceing : number = 3000;

    onAwake()
    {
        this.ryw__centerZone = this.ryw_Sprite.getChildByName("CenterZone") as Laya.Clip;
        for (let i = 0; i < this.ryw__centerZone.numChildren; ++i)  
        {
            let child = this.ryw__centerZone.getChildAt(i) as Laya.Sprite;
            if(child.visible)
            {
                let rockAd = child.getComponent(ryw_KRQ_RockSingleAd) as ryw_KRQ_RockSingleAd;
                this.ryw__rockSingleAds.push(rockAd);
            }
        }
    }

    onStart()
    {
        let self = this;
        self.ryw_playAni();
        Laya.timer.loop(this.ryw__rockSingleAds.length * (this.ryw__aniSpaceing + 500),this,()=>
        {
            self.ryw_playAni(()=>
            {
                self.ryw_refreshAd();
            });
        })
    }

    public ryw_refreshAd()
    {
        for (let i = 0; i < this.ryw__rockSingleAds.length; ++i)  
        {
            let ad = this.ryw__rockSingleAds[i];
            if(null == ad.ryw_Data)
            {
                ad.ryw_Sprite.visible = false;
            }
            ad.ryw_refresh();
        }
    }

    protected ryw_playAni(onComplate? : Function)
    {
        let len = this.ryw__rockSingleAds.length;
        for (let i = 0; i < this.ryw__rockSingleAds.length; ++i)  
        {
            let index = i;
            let ad = this.ryw__rockSingleAds[index];
            Laya.timer.once(this.ryw__aniSpaceing * i,ad,()=>
            {
                if(index == len - 1)
                {
                    ad.ryw_playAni(onComplate);
                }
                else
                {
                    ad.ryw_playAni();
                }
            })
        }
    }
}