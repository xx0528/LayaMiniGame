import BaseBuffer from "./BaseBuffer";
import HillCar from "../HillCar";

export default class SpeedUpBuffer extends BaseBuffer {

    constructor(duration: number) {
        super("SpeedUp", duration);
    }

    protected OnUpdate(car: HillCar) {
        if (!car.m_groundForward.IsOr) {
            return;
        }
        if (car.carMachine.curState.key == "SpeedUp") {
            var force = new Laya.Vector3;
            Laya.Vector3.scale(car.m_forward, 2000, force);
            let localOffset = new Laya.Vector3;
            car.rigidbody.applyForce(force);
            car.SetSpeedUpEffect(true);
        } else {
            car.SetSpeedUpEffect(false);
        }
    }

    protected OnEnable(car: HillCar) {

    }

    protected OnDisable(car: HillCar) {
        car.SetSpeedUpEffect(false);
    }
}