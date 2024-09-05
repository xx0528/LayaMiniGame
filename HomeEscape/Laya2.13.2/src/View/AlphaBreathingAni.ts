export default class ryw_AlphaBreathingAni extends Laya.Script 
{

    public ryw_breathingSpeed = 500;
    protected ryw__add : boolean = false;
    protected ryw__ownerSprite : Laya.Sprite;
    
    onAwake()
    {
        this.ryw__ownerSprite = this.owner as Laya.Sprite;
    }
    
    onUpdate()
    {
        if(this.ryw__ownerSprite.visible)
        {
            this.ryw_bgAni();
        }
    }

    protected ryw_bgAni()
    {
        if(!this.ryw__add)
        {
            this.ryw__ownerSprite.alpha = this.ryw__ownerSprite.alpha - Math.min(50,Laya.timer.delta) / this.ryw_breathingSpeed  * 1
            if(this.ryw__ownerSprite.alpha <= 0)
            {
                this.ryw__add = true;
            }
        }
        else
        {
            this.ryw__ownerSprite.alpha = this.ryw__ownerSprite.alpha + Math.min(50,Laya.timer.delta) / this.ryw_breathingSpeed  * 1 
            if(this.ryw__ownerSprite.alpha >= 1)
            {
                this.ryw__add = false;
            }
        }
    }
}