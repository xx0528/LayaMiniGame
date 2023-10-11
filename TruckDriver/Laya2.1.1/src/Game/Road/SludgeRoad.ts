import SnowfieldRoad from "./SnowfieldRoad";
import HillCar from "../Car/HillCar";
import Utilit_ from "../../Utilit";

export default class SludgeRoad extends SnowfieldRoad {
    private resistance: number = 1000;

    constructor() {
        super();
        this.maxSpeed = 20;
        this.sliptorque = 1000;
    }

    public UpdateCarBehaiovr(car: HillCar): void {
        if (car.m_groundForward.IsSet == false)
            return;
        
        car.SetTarget(this.GetTargetPoint());
        let length = Laya.Vector3.scalarLength(car.rigidbody.linearVelocity);
        let velocityNormal = car.rigidbody.linearVelocity.clone();
        Laya.Vector3.scale(velocityNormal, 1 / length, velocityNormal);
        let dot = Laya.Vector3.dot(velocityNormal, car.m_forward);
        length = dot * length;

        let value = Math.sin(Laya.timer.currFrame / 5);
        var torque = new Laya.Vector3(0, 1, 0);
        Laya.Vector3.scale(torque, value * this.sliptorque * Math.min(1, length / this.maxSpeed), torque);
        Utilit_.QuaternionVector3(car.transform.rotation, torque, torque);
        car.rigidbody.applyTorque(torque);

        let force = new Laya.Vector3;
        Laya.Vector3.scale(car.m_forward, this.resistance * -1, force);
        car.rigidbody.applyForce(force);
    }
}