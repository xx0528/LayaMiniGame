export default class Button_wcjtn_Press extends Laya.Script 
{
    public on_wcjtn_Press : Function = null; 
    constructor() { super(); }
    protected _owner_wcjtn_Sp : Laya.Sprite;
    protected _press_wcjtn_: boolean  = false;
    onAwake()
    {
        this._owner_wcjtn_Sp = this.owner as Laya.Sprite;
    }
    
    onEnable(): void 
    {
        this._press_wcjtn_ = false;
        this._owner_wcjtn_Sp.on(Laya.Event.MOUSE_DOWN,this,this.on_wcjtn_Down)
        this._owner_wcjtn_Sp.on(Laya.Event.MOUSE_UP,this,this.on_wcjtn_Up)
        this._owner_wcjtn_Sp.on(Laya.Event.MOUSE_OUT,this,this.on_wcjtn_Out)
        
    }

    
    onDisable(): void 
    {
        this._press_wcjtn_ = false;
        this._owner_wcjtn_Sp.off(Laya.Event.MOUSE_DOWN,this,this.on_wcjtn_Down)
        this._owner_wcjtn_Sp.off(Laya.Event.MOUSE_UP,this,this.on_wcjtn_Up)
        this._owner_wcjtn_Sp.off(Laya.Event.MOUSE_OUT,this,this.on_wcjtn_Out)
    }

    onUpdate()
    {
        if(this._press_wcjtn_ && this.on_wcjtn_Press)
        {
            this.on_wcjtn_Press();
        }
    }
    protected on_wcjtn_Down()
    {
        this._press_wcjtn_ = true;
    }
    protected on_wcjtn_Up()
    {
        this._press_wcjtn_ = false;
    }

    protected on_wcjtn_Out()
    {
        this._press_wcjtn_ = false;
    }
}