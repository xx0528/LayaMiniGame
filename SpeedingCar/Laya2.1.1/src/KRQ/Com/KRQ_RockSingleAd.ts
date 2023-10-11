import KRQ_wcjtn__Single_wcjtn_Ad from "./KRQ_SingleAd";

export default class KRQ_wcjtn__Rock_wcjtn_Single_wcjtn_Ad extends KRQ_wcjtn__Single_wcjtn_Ad
{
    public play_wcjtn_Ani(onComplate?: Function)  
    {
        let self = this;
        self._wcjtn_Sprite_wcjtn_.rotation = 0;
        Laya.Tween.to(self._wcjtn_Sprite_wcjtn_,
            {
                rotation: 20,
            }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, () => {
                Laya.Tween.to(self._wcjtn_Sprite_wcjtn_,
                    {
                        rotation: 0,
                    }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, () => {
                        self._wcjtn_Sprite_wcjtn_.rotation = 0;
                        if(null != onComplate)
                        {
                            onComplate();
                        }
                    }))
            }))
    }
}