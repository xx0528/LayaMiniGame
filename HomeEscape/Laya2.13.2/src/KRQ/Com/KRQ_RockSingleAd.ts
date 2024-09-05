import ryw_KRQ_SingleAd from "./KRQ_SingleAd";

export default class ryw_KRQ_RockSingleAd extends ryw_KRQ_SingleAd
{
    public ryw_playAni(onComplate?: Function)  
    {
        let self = this;
        self.ryw_Sprite.rotation = 0;
        Laya.Tween.to(self.ryw_Sprite,
            {
                rotation: 20,
            }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, () => {
                Laya.Tween.to(self.ryw_Sprite,
                    {
                        rotation: 0,
                    }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, () => {
                        self.ryw_Sprite.rotation = 0;
                        if(null != onComplate)
                        {
                            onComplate();
                        }
                    }))
            }))
    }
}