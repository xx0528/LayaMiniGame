import RoadBase from "./RoadBase";
import PhysicTrigger3d from "../Tools/PhysicTrigger3d";
import HillCar from "../Car/HillCar";
import Utilit_ from "../../Utilit";

export default class DollerRoad extends RoadBase {
    private time: number = 0;
    private animator: Laya.Animator = null;
    private physicsComponent: Laya.PhysicsComponent = null;
    onAwake(): void {
        this.animator = this.owner.getComponent(Laya.Animator);
        this.animator.play("Def");

        this.physicsComponent = this.owner.getComponent(Laya.PhysicsComponent) as Laya.PhysicsComponent;
        this.physicsComponent.collisionGroup = 100000 & ~1;
    }

    onTriggerEnter(other: Laya.PhysicsComponent) {
        let car = other.owner.getComponent(HillCar) as HillCar;
        if (car == null) {
            return;
        }

        this.physicsComponent.enabled = false;
        this.physicsComponent.destroy();

        let position = this.transform.position;
        Utilit_.InverseTransformPoint(car.transform, position, position);

        this.owner.removeSelf();
        car.owner.addChild(this.owner);
        this.transform.localPosition = position.clone();
        this.animator.play("dollar_02");
        let clip = Utilit_.getAnimationClip(this.animator, 0, "dollar_02");
        Laya.timer.once(clip.duration() * 1000, this, () => {
            this.owner.removeSelf();
            this.owner.destroy();
        })
    }
}