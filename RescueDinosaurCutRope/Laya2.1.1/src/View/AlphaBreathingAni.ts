export default class Alpha_JJKLBB_Breathi_JJKLBB_ngAni extends Laya.Script 
{

    public breathi_JJKLBB_ngSpeed = 500;
    protected _ad_JJKLBB_d : boolean = false;
    protected _owne_JJKLBB_rSprite : Laya.Sprite;
    
    onAwake()
    {
        this._owne_JJKLBB_rSprite = this.owner as Laya.Sprite;
    }
    
    onUpdate()
    {
        if(this._owne_JJKLBB_rSprite.visible)
        {
            this.bg_JJKLBB_Ani();
        }
    }

    protected bg_JJKLBB_Ani()
    {
        var delta = Math.min(50,Laya.timer.delta);
        if(!this._ad_JJKLBB_d)
        {
            this._owne_JJKLBB_rSprite.alpha = this._owne_JJKLBB_rSprite.alpha - delta / this.breathi_JJKLBB_ngSpeed  * 1
            if(this._owne_JJKLBB_rSprite.alpha <= 0)
            {
                this._ad_JJKLBB_d = true;
            }
        }
        else
        {
            this._owne_JJKLBB_rSprite.alpha = this._owne_JJKLBB_rSprite.alpha + delta / this.breathi_JJKLBB_ngSpeed  * 1 
            if(this._owne_JJKLBB_rSprite.alpha >= 1)
            {
                this._ad_JJKLBB_d = false;
            }
        }
    }
}