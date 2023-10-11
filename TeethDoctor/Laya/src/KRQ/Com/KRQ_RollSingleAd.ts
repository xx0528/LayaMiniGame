import KRQ_Si_XYXZS_ngleAd from "./KRQ_SingleAd";

export default class KRQ_Rol_XYXZS_lSingleAd extends KRQ_Si_XYXZS_ngleAd 
{
    protected _ori_XYXZS_ginX : number = null;

    onAwake()
    {
        super.onAwake();
        this._ori_XYXZS_ginX = this.Sp_XYXZS_rite.x;
        this.Sp_XYXZS_rite.x -= Laya.stage.width;
    }

    public pla_XYXZS_yAni(onComplate? : Function)
    {
        let cur = this._ori_XYXZS_ginX;
        let next = cur - Laya.stage.width;
        this.Sp_XYXZS_rite.x = next;
        Laya.Tween.to(this.Sp_XYXZS_rite,
            {
                rotation : 360,
            }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () =>  {
                this.Sp_XYXZS_rite.rotation = 0;
            }))
        Laya.Tween.to(this.Sp_XYXZS_rite,
            {
                x : cur,
            },500,Laya.Ease.linearNone,Laya.Handler.create(this,()=>
            {
                this.Sp_XYXZS_rite.x = cur;
                if(null != onComplate)
                {
                    onComplate();
                }
            }))
    }

}