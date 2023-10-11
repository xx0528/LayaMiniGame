import RoadBase from "./RoadBase";
import PhysicTrigger3d from "../Tools/PhysicTrigger3d";
import HillCar from "../Car/HillCar";

export default class DrawbridgeRoad extends RoadBase {
    private triggerBox: Laya.Sprite3D;

    private drawbridges: Laya.Sprite3D[] = [];

    onAwake(): void {
        super.onAwake();

        let node = this.owner.getChildByName("road_qiaoqiaoban") as Laya.Sprite3D;
        for (let i = 0; i < node._children.length; i++) {
            if (node._children[i].name == "road_drawbridge_0") {
                this.drawbridges.push(node._children[i]);
            }
        }

        this.triggerBox = this.owner.getChildByName("Trigger") as Laya.Sprite3D;
        let trigger = PhysicTrigger3d.GetTrigger(this.triggerBox);
        trigger.OnTriggerEnter(this, this.OnTriggerEnter);
    }

    private OnTriggerEnter(self, other: Laya.PhysicsComponent) {
        let car = other.owner.getComponent(HillCar)
        if (car == null) {
            return;
        }

        this.PlayAnimation();
    }


    private PlayAnimation(): void {
        for (let i = 0; i < this.drawbridges.length; i++) {
            let sprite = this.drawbridges[i] as Laya.Sprite3D;
            Laya.Tween.to(sprite.transform, {localRotationEulerX: 0}, 1.5 * 1000);
        }
    }
}