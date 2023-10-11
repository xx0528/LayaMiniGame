import KRQ_SingleAd from "./KRQ_SingleAd";

export default class KRQ_RollSingleAd extends KRQ_SingleAd 
{
    protected _originX : number = null;

    onAwake()
    {
        super.onAwake();
        this._originX = this.Sprite.x;
        this.Sprite.x -= Laya.stage.width;
    }

    public playAni(onComplate? : Function)
    {
        let cur = this._originX;
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