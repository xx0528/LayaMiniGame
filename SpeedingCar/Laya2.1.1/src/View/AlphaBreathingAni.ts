export default class Alpha_wcjtn_Breathing_wcjtn_Ani extends Laya.Script 
{

    public breathing_wcjtn_Speed = 2000;
    protected _add_wcjtn_ : boolean = false;
    protected _owner_wcjtn_Sprite : Laya.Sprite;
    
    onAwake()
    {
        this._owner_wcjtn_Sprite = this.owner as Laya.Sprite;
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
            this._owner_wcjtn_Sprite.alpha = this._owner_wcjtn_Sprite.alpha - Math.min(50,Laya.timer.delta) / this.breathing_wcjtn_Speed  * 1
            if(this._owner_wcjtn_Sprite.alpha <= 0)
            {
                this._add_wcjtn_ = true;
            }
        }
        else
        {
            this._owner_wcjtn_Sprite.alpha = this._owner_wcjtn_Sprite.alpha + Math.min(50,Laya.timer.delta) / this.breathing_wcjtn_Speed  * 1 
            if(this._owner_wcjtn_Sprite.alpha >= 1)
            {
                this._add_wcjtn_ = false;
            }
        }
    }
}