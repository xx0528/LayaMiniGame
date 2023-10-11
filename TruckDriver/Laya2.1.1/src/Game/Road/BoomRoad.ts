import RoadBase from "./RoadBase";
import PhysicTrigger3d from "../Tools/PhysicTrigger3d";
import HillCar from "../Car/HillCar";
import Sound_ppxhc_Mgr from "../../Mgr/SoundMgr";

export default class BoomRoad extends RoadBase {
    private barrels: Laya.Sprite3D = null;
    private effects: Laya.Sprite3D = null;
    private triggerBox: Laya.Sprite3D = null;
    onAwake(): void {
        super.onAwake();

        this.barrels = this.owner.getChildByName("Barrels") as Laya.Sprite3D;
        this.effects = this.owner.getChildByName("Effects") as Laya.Sprite3D;
        this.triggerBox = this.owner.getChildByName("Trigger") as Laya.Sprite3D;

        let trigger = PhysicTrigger3d.GetTrigger(this.triggerBox);
        trigger.OnTriggerEnter(this, this.OnTriggerEnter);

        let physicsComponent = this.triggerBox.getComponent(Laya.PhysicsComponent) as Laya.PhysicsComponent;
        physicsComponent.collisionGroup = 1000000 & ~1;
    }

    onEnable(): void {
        this.effects.active = false;
    }

    private OnTriggerEnter(self, other: Laya.PhysicsComponent) {
        let car = other.owner.getComponent(HillCar)
        if (car == null) {
            return;
        }

        this.PlayAnimation();
    }

    private PlayAnimation(): void {
        if (this.barrels.active == false)
            return;

        this.effects.active = false;
        this.effects.active = true;
        this.barrels.active = false;
        Sound_ppxhc_Mgr.instance_.play_ppxhc_Sound("oildrumsbang");
        Laya.timer.once(800, this, () => {
            this.effects.active = false;
        })
    }
}