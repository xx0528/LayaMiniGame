import Sound_ppxhc_Mgr from "../Mgr/SoundMgr";

export default class Button_ppxhc_Anim extends Laya.Script {

    public useSound : boolean  = true;

    constructor() { super(); }

    onAwake(): void {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.onDown);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.onUp);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.onUp);
    }

    onDisable(): void {
        this.owner.offAll();
        Laya.Tween.clearAll(this);
    }

    public onDown(): void {
        Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
        if(this.useSound)
        {
            Sound_ppxhc_Mgr.instance_.play_ppxhc_Sound("anniu");
        }
    }

    private onUp(): void {
        Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
    }
}