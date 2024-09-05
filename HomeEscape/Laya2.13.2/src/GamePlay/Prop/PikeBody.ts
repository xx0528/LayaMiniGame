import Pike from "./Pike";
import EventMgr from "../../Event/EventMgr";
import { ryw_EventDef } from "../../Event/EventDef";
import VibrateMgr from "../../Mgr/VibrateMgr";
import ryw_SoundMgr from "../../Mgr/SoundMgr";

//钎子
export default class PikeBody extends Laya.Script3D{

    protected ryw__collider : Laya.PhysicsCollider;
    protected ryw__pike : Pike;

    protected ryw__isAllowTouch = true;

    onAwake(){
        this.ryw__collider = this.owner.getComponent(Laya.PhysicsCollider) as Laya.PhysicsCollider;

    }

    onEnable(){
        EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onAllowTouch, this, this.ryw_onAllowTouch);
        EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_OnMovePike,this, this.ryw_onForbidTouch)
    }
    
    onDisable(){
        EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onAllowTouch, this, this.ryw_onAllowTouch);
        EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_OnMovePike,this, this.ryw_onForbidTouch)
    }

    ryw_onAllowTouch(){
        this.ryw__isAllowTouch = true;
    }

    ryw_onForbidTouch(){
        this.ryw__isAllowTouch = false;
    }

    ryw_onSetPike(pike:Pike){
        this.ryw__pike = pike;
    }

    ryw_onMyPikeMouseDown(){
        if (this.ryw__pike.ryw_tipsModeForbid){
            console.log("提示模式 此钎子不能动 ",this.ryw__pike.owner.name);
            ryw_SoundMgr.ryw_instance.ryw_playSound("err");
            this.ryw__pike.ryw_onVibrate();
            VibrateMgr.ryw_vibrateShort();
            return ;
        }
        
        if (false==this.ryw__isAllowTouch){
            ryw_SoundMgr.ryw_instance.ryw_playSound("err");
            this.ryw__pike.ryw_onVibrate();
            VibrateMgr.ryw_vibrateShort();
            return ;
        }
        this.ryw__isAllowTouch = false;

        this.ryw__collider.enabled = false;
        this.ryw__pike.ryw_onMyMouseDown();
    }

}