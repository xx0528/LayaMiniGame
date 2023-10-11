import Sou_XYXZS_ndMgr from "../Mgr/SoundMgr";

export default class Butt_XYXZS_onAnim extends Laya.Script {

    public use_XYXZS_Sound : boolean  = true;

    constructor() { super(); }

    onAwake(): void {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.onD_XYXZS_own);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.o_XYXZS_nUp);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.o_XYXZS_nUp);
    }

    onDisable(): void {
        this.owner.offAll();
        Laya.Tween.clearAll(this);
    }

    public onD_XYXZS_own(): void {
        Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
        if(this.use_XYXZS_Sound)
        {
            Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("anniu");
        }
    }

    private o_XYXZS_nUp(): void {
        Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
    }
}