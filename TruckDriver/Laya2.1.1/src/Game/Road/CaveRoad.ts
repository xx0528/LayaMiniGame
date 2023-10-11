import RoadBase from "./RoadBase";
import PhysicTrigger3d from "../Tools/PhysicTrigger3d";
import Game from "../Game";
import HillCar from "../Car/HillCar";

export default class CaveRoad extends RoadBase {
    private enterTrigger: Laya.Sprite3D;
    private exitTrigger: Laya.Sprite3D;
    onAwake(): void {
        super.onAwake();
        this.enterTrigger = this.owner.getChildByName("EnterTrigger") as Laya.Sprite3D;
        this.exitTrigger = this.owner.getChildByName("ExitTrigger") as Laya.Sprite3D;

        let trigger = PhysicTrigger3d.GetTrigger(this.enterTrigger);
        trigger.OnTriggerEnter(this, this.OnCarEnter);

        trigger = PhysicTrigger3d.GetTrigger(this.exitTrigger);
        trigger.OnTriggerEnter(this, this.OnCarExit);
    }

    private OnCarEnter(self, other: Laya.PhysicsComponent): void {
        let car = other.owner.getComponent(HillCar)
        if (car == null) {
            return;
        }

        Game.CameraFollow.Switch("Cave");
    }

    private OnCarExit(self, other: Laya.PhysicsComponent): void {
        let car = other.owner.getComponent(HillCar)
        if (car == null) {
            return;
        }

        Game.CameraFollow.Switch("Driving");
    }
}