import ryw_SoundMgr from "../Mgr/SoundMgr";

export default class ryw_ButtonAnim extends Laya.Script {

    public ryw_useSound : boolean  = true;

    constructor() { super(); }

    onAwake(): void {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.ryw_onDown);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.ryw_onUp);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.ryw_onUp);
    }

    onDisable(): void {
        this.owner.offAll();
        Laya.Tween.clearAll(this);
    }

    public ryw_onDown(): void {
        Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
        if(this.ryw_useSound)
        {
            ryw_SoundMgr.ryw_instance.ryw_playSound("anniu");
        }
    }

    private ryw_onUp(): void {
        Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
    }
}