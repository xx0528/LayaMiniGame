import Sound_myqq_Mgr from "../Mgr/SoundMgr";

export default class Button_myqq_Anim extends Laya.Script {

    public use_myqq_Sound : boolean  = true;

    constructor() { super(); }

    onAwake(): void {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.on_myqq_Down);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.on_myqq_Up);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.on_myqq_Up);
    }

    onDisable(): void {
        this.owner.offAll();
        Laya.Tween.clearAll(this);
    }

    public on_myqq_Down(): void {
        Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
        if(this.use_myqq_Sound)
        {
            Sound_myqq_Mgr.instance.playSound("anniu");
        }
    }

    private on_myqq_Up(): void {
        Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
    }
}