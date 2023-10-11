export default class ryw_ScaleBreathingAni extends Laya.Script 
{

    public ryw_breathingSpeed = 500;
    public ryw_maxScale = 1;
    public ryw_minScale = 0.9;
    protected ryw__add : boolean = false;
    protected ryw__ownerSprite : Laya.Sprite;
    
    onAwake()
    {
        this.ryw__ownerSprite = this.owner as Laya.Sprite;
    }

    onStart()
    {
        this.ryw__ownerSprite.scale(this.ryw_maxScale,this.ryw_maxScale);
    }
    
    onEnable()
    {
        this.ryw__ownerSprite.on(Laya.Event.FOCUS_CHANGE,this,this.ryw_onFocusChange);
    }

    onDisable()
    {
        this.ryw__ownerSprite.off(Laya.Event.FOCUS_CHANGE,this,this.ryw_onFocusChange);
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
            var value = this.ryw__ownerSprite.scaleX - Math.min(50,Laya.timer.delta) / this.ryw_breathingSpeed  * 1
            value = Math.max(this.ryw_minScale,value)
            this.ryw__ownerSprite.scale(value,value);
            if(this.ryw__ownerSprite.scaleX <= this.ryw_minScale)
            {
                this.ryw__add = true;
            }
        }
        else
        {
            var value = this.ryw__ownerSprite.scaleX + Math.min(50,Laya.timer.delta) / this.ryw_breathingSpeed  * 1;
            value = Math.min(this.ryw_maxScale,value)
            this.ryw__ownerSprite.scale(value,value);
            if(this.ryw__ownerSprite.scaleX >= this.ryw_maxScale)
            {
                this.ryw__add = false;
            }
        }
    }

    protected ryw_onFocusChange()
    {
        this.ryw__ownerSprite.scale(this.ryw_maxScale,this.ryw_maxScale);
        this.ryw__add = false;
    }
}