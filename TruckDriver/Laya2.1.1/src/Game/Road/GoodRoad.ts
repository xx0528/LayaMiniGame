import RoadBase from "./RoadBase";
import PhysicTrigger3d from "../Tools/PhysicTrigger3d";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import HillCar from "../Car/HillCar";
import Game from "../Game";

export default class GoodRoad extends RoadBase {
    private isActive: boolean = false;
    private triggerBox: Laya.Sprite3D = null;

    onAwake(): void {
        super.onAwake();

        this.triggerBox = this.owner.getChildByName("Trigger") as Laya.Sprite3D;

        let trigger = PhysicTrigger3d.GetTrigger(this.triggerBox);
        trigger.OnTriggerEnter(this, this.OnTriggerEnter);

        let physicsComponent = this.triggerBox.getComponent(Laya.PhysicsComponent) as Laya.PhysicsComponent;
        physicsComponent.collisionGroup = 100000 & ~1;
    }

    onEnable(): void {
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.Game_RobmoneyEnd, this, this.OnRobmoneyEnd);
    }

    private OnTriggerEnter(self, other: Laya.PhysicsComponent) {
        let car = other.owner.getComponent(HillCar)
        if (car == null) {
            return;
        }

        this.isActive = true;
        this.triggerBox.offAll(Laya.Event.TRIGGER_ENTER);
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Game_RobmoneyStart);
    }

    private OnRobmoneyEnd(): void {
        this.isActive = false;
    }
    
    onUpdate(): void {
        if (this.isActive == false)
            return;
        
        let distance = Laya.Vector3.distance(this.triggerBox.transform.position, Game.Control.currentCar.transform.position);
        if (distance > 20) {
            this.isActive = false;
            Game.Control.EndRobmoney(false);
            Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Game_RobmoneyEnd);
        }
    }
}