import Event_wcjtn_Mgr from "../../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../../Event/EventDef";

export default class SwitchBtn extends Laya.Script {
    /** @prop {name:speedPointer, tips:"速度表指针", type:Node, default:1000}*/
    public speedPointer: Laya.Sprite;
    /** @prop {name:speedBarMask, tips:"速度表进度条遮罩", type:Node, default:1000}*/
    public speedBarMask: Laya.Sprite;
    /** @prop {name:speedBar, tips:"速度表进度条", type:Node, default:1000}*/
    public speedBar: Laya.Sprite;
    private _mBtn: Laya.Button;
    private _inOverLane: boolean = false;
    constructor() { super(); }

    onAwake() {
        this._mBtn = this.owner as Laya.Button;
    }

    onEnable() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ToSlowLane, this, this.ToSlowLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ToOverLane, this, this.ToOverLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameOver,this,this.ToSlowLane);
    }

    onDestroy() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ToSlowLane, this, this.ToSlowLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ToOverLane, this, this.ToOverLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameOver,this,this.ToSlowLane);
        
    }

    onStart() {
        this.speedBarMask.graphics.drawPie(0, 0, 150, -180, -180+this.speedPointer.rotation, "#30c50b");
    }

    onUpdate() {
        if (this._inOverLane&&this._mBtn.visible) {
            if (this.speedPointer.rotation < 180) this.speedPointer.rotation++;
            this.speedBarMask.graphics.drawPie(0, 0, 150, -180, -180+this.speedPointer.rotation, "#30c50b");
        }

    }

    ToSlowLane() {
        this._inOverLane = false;
        this._mBtn.visible = false;
    }

    ToOverLane() {
        this._inOverLane = true;
    }

}