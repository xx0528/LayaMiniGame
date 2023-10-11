export default class Button_myqq_Press extends Laya.Script 
{
    public onPress_myqq_ : Function = null; 
    constructor() { super(); }
    protected _ownerSp_myqq_ : Laya.Sprite;
    protected _press_myqq_: boolean  = false;
    onAwake()
    {
        this._ownerSp_myqq_ = this.owner as Laya.Sprite;
    }
    
    onEnable(): void 
    {
        this._press_myqq_ = false;
        this._ownerSp_myqq_.on(Laya.Event.MOUSE_DOWN,this,this.on_myqq_Down)
        this._ownerSp_myqq_.on(Laya.Event.MOUSE_UP,this,this.on_myqq_Up)
        this._ownerSp_myqq_.on(Laya.Event.MOUSE_OUT,this,this.on_myqq_Out)
        
    }

    
    onDisable(): void 
    {
        this._press_myqq_ = false;
        this._ownerSp_myqq_.off(Laya.Event.MOUSE_DOWN,this,this.on_myqq_Down)
        this._ownerSp_myqq_.off(Laya.Event.MOUSE_UP,this,this.on_myqq_Up)
        this._ownerSp_myqq_.off(Laya.Event.MOUSE_OUT,this,this.on_myqq_Out)
    }

    onUpdate()
    {
        if(this._press_myqq_ && this.onPress_myqq_)
        {
            this.onPress_myqq_();
        }
    }
    protected on_myqq_Down()
    {
        this._press_myqq_ = true;
    }
    protected on_myqq_Up()
    {
        this._press_myqq_ = false;
    }

    protected on_myqq_Out()
    {
        this._press_myqq_ = false;
    }
}