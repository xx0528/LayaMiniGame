import KRQ_Si_XYXZS_ngleAd from "./KRQ_SingleAd";

export default class KRQ_Roc_XYXZS_kSingleAd extends KRQ_Si_XYXZS_ngleAd
{
    public pl_XYXZS_ayAni(onComplate?: Function)  
    {
        let self = this;
        self.Sp_XYXZS_rite.rotation = 0;
        Laya.Tween.to(self.Sp_XYXZS_rite,
            {
                rotation: 20,
            }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, () => {
                Laya.Tween.to(self.Sp_XYXZS_rite,
                    {
                        rotation: 0,
                    }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, () => {
                        self.Sp_XYXZS_rite.rotation = 0;
                        if(null != onComplate)
                        {
                            onComplate();
                        }
                    }))
            }))
    }
}