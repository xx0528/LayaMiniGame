import ryw_KRQ_SingleAd from "./KRQ_SingleAd";

export default class ryw_KRQ_RollSingleAd extends ryw_KRQ_SingleAd 
{
    protected _originX : number = null;

    onAwake()
    {
        super.onAwake();
        this._originX = this.ryw_Sprite.x;
        this.ryw_Sprite.x -= Laya.stage.width;
    }

    public ryw_playAni(onComplate? : Function)
    {
        let cur = this._originX;
        let next = cur - Laya.stage.width;
        this.ryw_Sprite.x = next;
        Laya.Tween.to(this.ryw_Sprite,
            {
                rotation : 360,
            }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () =>  {
                this.ryw_Sprite.rotation = 0;
            }))
        Laya.Tween.to(this.ryw_Sprite,
            {
                x : cur,
            },500,Laya.Ease.linearNone,Laya.Handler.create(this,()=>
            {
                this.ryw_Sprite.x = cur;
                if(null != onComplate)
                {
                    onComplate();
                }
            }))
    }

}