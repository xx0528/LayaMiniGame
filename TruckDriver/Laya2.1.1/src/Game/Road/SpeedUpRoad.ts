import RoadBase from "./RoadBase";
import PhysicTrigger3d from "../Tools/PhysicTrigger3d";
import Game from "../Game";
import SpeedUpBuffer from "../Car/CarBuffer/SpeedUpBuffer";
import HillCar from "../Car/HillCar";

export default class SpeedUpRoad extends RoadBase {
    private speedUpTrigger: Laya.Sprite3D = null;

    onAwake(): void {
        this.speedUpTrigger = this.owner.getChildByName("Trigger") as Laya.Sprite3D;

        let trigger = PhysicTrigger3d.GetTrigger(this.speedUpTrigger);
        trigger.OnTriggerStay(this, this.OnSpeedUpStay);

        let physicsCompleted = this.speedUpTrigger.getComponent(Laya.PhysicsComponent) as Laya.PhysicsComponent;
        physicsCompleted.collisionGroup = 5 & ~1;
    }

    private OnSpeedUpStay(self, other: Laya.PhysicsComponent) {
        let car = other.owner.getComponent(HillCar)
        if (car == null) {
            return;
        }

        Game.Control.currentCar.AddBuffer(new SpeedUpBuffer(1), true);
    }
}