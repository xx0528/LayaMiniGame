import RoadBase from "./RoadBase";
import Utilit_ from "../../Utilit";
import HillCar from "../Car/HillCar";
import PhysicTrigger3d from "../Tools/PhysicTrigger3d";
import Game from "../Game";

export default class ZhuanluRoad extends RoadBase {
    private triggerBox: Laya.Sprite3D = null;
    private luExitPosition: Laya.Transform3D = null

    private CarEnter: boolean = false;

    onAwake(): void {
        super.onAwake();
        this.triggerBox = Utilit_.FindChild(this.owner, "road_zhuanlu/road2") as Laya.Sprite3D;
        this.luExitPosition = (this.owner.getChildByName("LuExitPosition") as Laya.Sprite3D).transform;

        let trigger = PhysicTrigger3d.GetTrigger(this.triggerBox);
        trigger.OnTriggerEnter(this, this.OnTriggerEnter);
        trigger.OnTriggerStay(this, this.OnTriggerStay);
    }
    
    onStart(): void {
        this.PlayAnimation();
    }

    public UpdateCarBehaiovr(car: HillCar): void {
        if (this.CarEnter == false) {
            super.UpdateCarBehaiovr(car);
        } else {
            let forward = car.m_forward.clone();
            Utilit_.QuaternionVector3(this.triggerBox.transform.rotation, forward, forward);
            Laya.Vector3.scale(forward, 5, forward);
            car.SetTarget(forward);
        }
    }

    public OnTriggerEnter(self, other: Laya.PhysicsComponent) {
        let car = other.owner.getComponent(HillCar)
        if (car == null) {
            return;
        }

        this.CarEnter = true;
    } 

    public OnTriggerStay(self, other:Laya.PhysicsComponent) {
        let car = other.owner.getComponent(HillCar)
        if ((car == null) || (this.CarEnter == false)) {
            return;
        }

        let distance = Laya.Vector3.distance(Game.Control.currentCar.head.position, this.luExitPosition.position);
        if (distance < 4) {
            this.CarEnter = false;
        }
    }

    private PlayAnimation(): void {
        Laya.Tween.to(this.triggerBox.transform, {localRotationEulerY: this.triggerBox.transform.localRotationEulerY + 90}, 3000, null, 
            Laya.Handler.create(this, () => {
                Laya.timer.once(2000, this, this.PlayAnimation);
            }));
    }
}