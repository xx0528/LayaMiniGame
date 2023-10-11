import KRQ_ppxhc_SingleAd from "./KRQ_SingleAd";

export default class KRQ_ppxhc_RollSingleAd extends KRQ_ppxhc_SingleAd 
{
    protected _origin_ppxhc_X : number = null;

    onAwake()
    {
        super.onAwake();
        this._origin_ppxhc_X = this.Sprite.x;
        this.Sprite.x -= Laya.stage.width;
    }

    public play_ppxhc_Ani(onComplate? : Function)
    {
        let cur = this._origin_ppxhc_X;
        let next = cur - Laya.stage.width;
        this.Sprite.x = next;
        Laya.Tween.to(this.Sprite,
            {
                rotation : 360,
            }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () =>  {
                this.Sprite.rotation = 0;
            }))
        Laya.Tween.to(this.Sprite,
            {
                x : cur,
            },500,Laya.Ease.linearNone,Laya.Handler.create(this,()=>
            {
                this.Sprite.x = cur;
                if(null != onComplate)
                {
                    onComplate();
                }
            }))
    }

}