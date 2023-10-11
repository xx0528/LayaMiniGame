export default class Button_JJKLBB_Press extends Laya.Script 
{
    public onPr_JJKLBB_ess : Function = null; 
    constructor() { super(); }
    protected _own_JJKLBB_erSp : Laya.Sprite;
    protected _pr_JJKLBB_ess: boolean  = false;
    onAwake()
    {
        this._own_JJKLBB_erSp = this.owner as Laya.Sprite;
    }
    
    onEnable(): void 
    {
        this._pr_JJKLBB_ess = false;
        this._own_JJKLBB_erSp.on(Laya.Event.MOUSE_DOWN,this,this.onD_JJKLBB_own)
        this._own_JJKLBB_erSp.on(Laya.Event.MOUSE_UP,this,this.on_JJKLBB_Up)
        this._own_JJKLBB_erSp.on(Laya.Event.MOUSE_OUT,this,this.on_JJKLBB_Out)
        
    }

    
    onDisable(): void 
    {
        this._pr_JJKLBB_ess = false;
        this._own_JJKLBB_erSp.off(Laya.Event.MOUSE_DOWN,this,this.onD_JJKLBB_own)
        this._own_JJKLBB_erSp.off(Laya.Event.MOUSE_UP,this,this.on_JJKLBB_Up)
        this._own_JJKLBB_erSp.off(Laya.Event.MOUSE_OUT,this,this.on_JJKLBB_Out)
    }

    onUpdate()
    {
        if(this._pr_JJKLBB_ess && this.onPr_JJKLBB_ess)
        {
            this.onPr_JJKLBB_ess();
        }
    }
    protected onD_JJKLBB_own()
    {
        this._pr_JJKLBB_ess = true;
    }
    protected on_JJKLBB_Up()
    {
        this._pr_JJKLBB_ess = false;
    }

    protected on_JJKLBB_Out()
    {
        this._pr_JJKLBB_ess = false;
    }
}