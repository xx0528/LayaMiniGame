export default class Scale_JJKLBB_Breathing_JJKLBB_Ani extends Laya.Script 
{

    public breat_JJKLBB_hingSpeed = 2000;
    public maxS_JJKLBB_cale = 1;
    public minS_JJKLBB_cale = 0.9;
    protected _a_JJKLBB_dd : boolean = false;
    protected _own_JJKLBB_erSprite : Laya.Sprite;
    
    onAwake()
    {
        this._own_JJKLBB_erSprite = this.owner as Laya.Sprite;
    }

    onStart()
    {
        this._own_JJKLBB_erSprite.scale(this.maxS_JJKLBB_cale,this.maxS_JJKLBB_cale);
    }
    
    onEnable()
    {
        this._own_JJKLBB_erSprite.on(Laya.Event.FOCUS_CHANGE,this,this.onFoc_JJKLBB_usChange);
    }

    onDisable()
    {
        this._own_JJKLBB_erSprite.off(Laya.Event.FOCUS_CHANGE,this,this.onFoc_JJKLBB_usChange);
    }

    onUpdate()
    {
        if(this._own_JJKLBB_erSprite.visible)
        {
            this.bg_JJKLBB_Ani();
        }
    }

    protected bg_JJKLBB_Ani()
    {
        var delta = Math.min(50,Laya.timer.delta);
        if(!this._a_JJKLBB_dd)
        {
            var value = this._own_JJKLBB_erSprite.scaleX - delta / this.breat_JJKLBB_hingSpeed  * 1
            value = Math.max(this.minS_JJKLBB_cale,value)
            this._own_JJKLBB_erSprite.scale(value,value);
            if(this._own_JJKLBB_erSprite.scaleX <= this.minS_JJKLBB_cale)
            {
                this._a_JJKLBB_dd = true;
            }
        }
        else
        {
            var value = this._own_JJKLBB_erSprite.scaleX + delta / this.breat_JJKLBB_hingSpeed  * 1;
            value = Math.min(this.maxS_JJKLBB_cale,value)
            this._own_JJKLBB_erSprite.scale(value,value);
            if(this._own_JJKLBB_erSprite.scaleX >= this.maxS_JJKLBB_cale)
            {
                this._a_JJKLBB_dd = false;
            }
        }
    }

    protected onFoc_JJKLBB_usChange()
    {
        this._own_JJKLBB_erSprite.scale(this.maxS_JJKLBB_cale,this.maxS_JJKLBB_cale);
        this._a_JJKLBB_dd = false;
    }
}