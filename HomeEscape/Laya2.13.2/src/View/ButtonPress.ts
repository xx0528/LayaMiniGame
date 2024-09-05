export default class ryw_ButtonPress extends Laya.Script 
{
    public ryw_onPress : Function = null; 
    constructor() { super(); }
    protected ryw__ownerSp : Laya.Sprite;
    protected ryw__press: boolean  = false;
    onAwake()
    {
        this.ryw__ownerSp = this.owner as Laya.Sprite;
    }
    
    onEnable(): void 
    {
        this.ryw__press = false;
        this.ryw__ownerSp.on(Laya.Event.MOUSE_DOWN,this,this.ryw_onDown)
        this.ryw__ownerSp.on(Laya.Event.MOUSE_UP,this,this.ryw_onUp)
        this.ryw__ownerSp.on(Laya.Event.MOUSE_OUT,this,this.ryw_onOut)
        
    }

    
    onDisable(): void 
    {
        this.ryw__press = false;
        this.ryw__ownerSp.off(Laya.Event.MOUSE_DOWN,this,this.ryw_onDown)
        this.ryw__ownerSp.off(Laya.Event.MOUSE_UP,this,this.ryw_onUp)
        this.ryw__ownerSp.off(Laya.Event.MOUSE_OUT,this,this.ryw_onOut)
    }

    onUpdate()
    {
        if(this.ryw__press && this.ryw_onPress)
        {
            this.ryw_onPress();
        }
    }
    protected ryw_onDown()
    {
        this.ryw__press = true;
    }
    protected ryw_onUp()
    {
        this.ryw__press = false;
    }

    protected ryw_onOut()
    {
        this.ryw__press = false;
    }
}