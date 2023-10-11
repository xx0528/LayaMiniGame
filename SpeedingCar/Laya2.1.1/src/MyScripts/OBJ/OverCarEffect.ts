import Vibrate_wcjtn_Mgr from "../../Mgr/VibrateMgr";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";

export default class OverCarEffect extends Laya.Script {
    
    private static _instance:OverCarEffect;
    public static Instance():OverCarEffect{
        return this._instance;
    }
    private mOverEff:Laya.Sprite3D;
    private mFollowPos:Laya.Vector3;
    constructor() { super(); }
    
    onAwake(){
        OverCarEffect._instance = this;
        this.mOverEff = this.owner as Laya.Sprite3D;
        this.mOverEff.transform.scale = new Laya.Vector3(0.6,0.6,0.6);
        this.mOverEff.active = false;
    }

    onEnable(){
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OverCar,this,this.Show);
    }

    onDestroy(){
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OverCar,this,this.Show);

    }

    SetFollowPos(pos:Laya.Vector3){
        this.mFollowPos = pos;
    }

    onUpdate(){
        if(this.mOverEff.active){
            this.mOverEff.transform.position = this.mFollowPos;
        }
    }



    Show(){
        Laya.timer.clearAll(this);
        this.mOverEff.active = false;
        this.mOverEff.active = true;
        Vibrate_wcjtn_Mgr.vibrate_wcjtn_Short();
        Laya.timer.once(1000,this,()=>{
            this.mOverEff.active = false;
        })
    }
}