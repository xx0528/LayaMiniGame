export default class Alpha_myqq_BreathingAni extends Laya.Script 
{

    public breathingSpeed = 500;
    protected _add : boolean = false;
    protected _ownerSprite : Laya.Sprite;
    
    onAwake()
    {
        this._ownerSprite = this.owner as Laya.Sprite;
    }
    
    onUpdate()
    {
        if(this._ownerSprite.visible)
        {
            this.bg_myqq_Ani();
        }
    }

    protected bg_myqq_Ani()
    {
        if(!this._add)
        {
            this._ownerSprite.alpha = this._ownerSprite.alpha - Laya.timer.delta / this.breathingSpeed  * 1
            if(this._ownerSprite.alpha <= 0)
            {
                this._add = true;
            }
        }
        else
        {
            this._ownerSprite.alpha = this._ownerSprite.alpha + Laya.timer.delta / this.breathingSpeed  * 1 
            if(this._ownerSprite.alpha >= 1)
            {
                this._add = false;
            }
        }
    }
}