export default class Scale_wcjtn_Breathing_wcjtn_Ani extends Laya.Script 
{

    public breathing_wcjtn_Speed = 500;
    public max_wcjtn_Scale = 1;
    public min_wcjtn_Scale = 0.9;
    protected _add_wcjtn_ : boolean = false;
    protected _owner_wcjtn_Sprite : Laya.Sprite;
    
    onAwake()
    {
        this._owner_wcjtn_Sprite = this.owner as Laya.Sprite;
    }

    onStart()
    {
        this._owner_wcjtn_Sprite.scale(this.max_wcjtn_Scale,this.max_wcjtn_Scale);
    }
    
    onEnable()
    {
        this._owner_wcjtn_Sprite.on(Laya.Event.FOCUS_CHANGE,this,this.on_wcjtn_Focus_wcjtn_Change);
    }

    onDisable()
    {
        this._owner_wcjtn_Sprite.off(Laya.Event.FOCUS_CHANGE,this,this.on_wcjtn_Focus_wcjtn_Change);
    }

    onUpdate()
    {
        if(this._owner_wcjtn_Sprite.visible)
        {
            this.bg_wcjtn_Ani();
        }
    }

    protected bg_wcjtn_Ani()
    {
        if(!this._add_wcjtn_)
        {
            var value = this._owner_wcjtn_Sprite.scaleX - Math.min(50,Laya.timer.delta) / this.breathing_wcjtn_Speed  * 1
            value = Math.max(this.min_wcjtn_Scale,value)
            this._owner_wcjtn_Sprite.scale(value,value);
            if(this._owner_wcjtn_Sprite.scaleX <= this.min_wcjtn_Scale)
            {
                this._add_wcjtn_ = true;
            }
        }
        else
        {
            var value = this._owner_wcjtn_Sprite.scaleX + Math.min(50,Laya.timer.delta) / this.breathing_wcjtn_Speed  * 1;
            value = Math.min(this.max_wcjtn_Scale,value)
            this._owner_wcjtn_Sprite.scale(value,value);
            if(this._owner_wcjtn_Sprite.scaleX >= this.max_wcjtn_Scale)
            {
                this._add_wcjtn_ = false;
            }
        }
    }

    protected on_wcjtn_Focus_wcjtn_Change()
    {
        this._owner_wcjtn_Sprite.scale(this.max_wcjtn_Scale,this.max_wcjtn_Scale);
        this._add_wcjtn_ = false;
    }
}