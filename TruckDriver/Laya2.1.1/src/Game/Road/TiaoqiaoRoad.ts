import RoadBase from "./RoadBase";
import PhysicTrigger3d from "../Tools/PhysicTrigger3d";
import Utilit_ from "../../Utilit";
import HillCar from "../Car/HillCar";

export default class TiaoqiaoRoad extends RoadBase {
    private plane: Laya.Sprite3D = null;
    private triggerBox: Laya.Sprite3D = null;
    onAwake(): void {
        super.onAwake();
        this.plane = this.owner.getChildByName("PlaneTrigger") as Laya.Sprite3D;
        this.triggerBox = this.owner.getChildByName("Trigger") as Laya.Sprite3D;

        let trigger = PhysicTrigger3d.GetTrigger(this.triggerBox);
        trigger.OnTriggerEnter(this, this.OnTriggerEnter);
    }

    private OnTriggerEnter(self, other: Laya.PhysicsComponent) {
        let car = other.owner.getComponent(HillCar)
        if (car == null) {
            return;
        }

        Laya.timer.once(200, this, this.PlayAnimation);
    }

    private PlayAnimation() {
        let fallingblocks = Utilit_.FindChild(this.owner, "road_tiaoqiao/road") as Laya.Sprite3D;
        for (let i = 0; i < fallingblocks._children.length; i++) {
            let transform = (fallingblocks._children[i] as Laya.Sprite3D).transform;
            Laya.Tween.to(transform, {localPositionY: -20}, 1000, null, null, i * 50);
        }

        Laya.Tween.to(this.plane.transform, {localScaleZ: 0}, 1700);
    }
}