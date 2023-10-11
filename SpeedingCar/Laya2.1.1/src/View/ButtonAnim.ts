import Sound_wcjtn_Mgr, { Sound_wcjtn_Type } from "../Mgr/SoundMgr";

export default class Button_wcjtn_Anim extends Laya.Script {

    public use_wcjtn_Sound : boolean  = true;

    constructor() { super(); }

    onAwake(): void {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.on_wcjtn_Down);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.on_wcjtn_Up);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.on_wcjtn_Up);
    }

    onDisable(): void {
        this.owner.offAll();
        Laya.Tween.clearAll(this);
    }

    public on_wcjtn_Down(): void {
        Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
        if(this.use_wcjtn_Sound)
        {
            Sound_wcjtn_Mgr.ins_wcjtn_tance.play_wcjtn_Sound(Sound_wcjtn_Type.ClickBtn);
        }
    }

    private on_wcjtn_Up(): void {
        Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
    }
}