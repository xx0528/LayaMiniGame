import SoundM_JJKLBB_gr from "../Mgr/SoundMgr";

export default class Button_JJKLBB_Anim extends Laya.Script {

    public useSo_JJKLBB_und : boolean  = true;

    constructor() { super(); }

    onAwake(): void {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.onD_JJKLBB_own);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.on_JJKLBB_Up);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.on_JJKLBB_Up);
    }

    onDisable(): void {
        this.owner.offAll();
        Laya.Tween.clearAll(this);
    }

    public onD_JJKLBB_own(): void {
        Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
        if(this.useSo_JJKLBB_und)
        {
            SoundM_JJKLBB_gr.instance.playS_JJKLBB_ound("anniu");
        }
    }

    private on_JJKLBB_Up(): void {
        Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
    }
}