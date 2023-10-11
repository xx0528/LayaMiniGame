import KRQ_wcjtn__Single_wcjtn_Ad from "./KRQ_SingleAd";

export default class KRQ_Roll_wcjtn_Single_wcjtn_Ad extends KRQ_wcjtn__Single_wcjtn_Ad 
{
    protected _originX : number = null;

    onAwake()
    {
        super.onAwake();
        this._originX = this._wcjtn_Sprite_wcjtn_.x;
        this._wcjtn_Sprite_wcjtn_.x -= Laya.stage.width;
    }

    public play_wcjtn_Ani(onComplate? : Function)
    {
        let cur = this._originX;
        let next = cur - Laya.stage.width;
        this._wcjtn_Sprite_wcjtn_.x = next;
        Laya.Tween.to(this._wcjtn_Sprite_wcjtn_,
            {
                rotation : 360,
            }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () =>  {
                this._wcjtn_Sprite_wcjtn_.rotation = 0;
            }))
        Laya.Tween.to(this._wcjtn_Sprite_wcjtn_,
            {
                x : cur,
            },500,Laya.Ease.linearNone,Laya.Handler.create(this,()=>
            {
                this._wcjtn_Sprite_wcjtn_.x = cur;
                if(null != onComplate)
                {
                    onComplate();
                }
            }))
    }

}