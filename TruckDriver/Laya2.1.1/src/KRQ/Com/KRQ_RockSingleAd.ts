import KRQ_ppxhc_SingleAd from "./KRQ_SingleAd";

export default class KRQ_ppxhc_RockSingleAd extends KRQ_ppxhc_SingleAd
{
    public play_ppxhc_Ani(onComplate?: Function)  
    {
        let self = this;
        self.Sprite.rotation = 0;
        Laya.Tween.to(self.Sprite,
            {
                rotation: 20,
            }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, () => {
                Laya.Tween.to(self.Sprite,
                    {
                        rotation: 0,
                    }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, () => {
                        self.Sprite.rotation = 0;
                        if(null != onComplate)
                        {
                            onComplate();
                        }
                    }))
            }))
    }
}