import RoadBase from "./RoadBase";
import HillCar from "../Car/HillCar";
import Utilit_ from "../../Utilit";

export default class SnowfieldRoad extends RoadBase {
    protected sliptorque: number = 2000;
    protected maxSpeed: number = 20;

    public UpdateCarBehaiovr(car: HillCar): void {
        if (car.m_groundForward.IsSet == false)
            return;
        super.UpdateCarBehaiovr(car);

        let length = Laya.Vector3.scalarLength(car.rigidbody.linearVelocity);
        let velocityNormal = car.rigidbody.linearVelocity.clone();
        Laya.Vector3.scale(velocityNormal, 1 / length, velocityNormal);
        let dot = Laya.Vector3.dot(velocityNormal, car.m_forward);
        length = dot * length;

        var turnforce = new Laya.Vector3(1, 0, 0);
        let value = Math.sin(Laya.timer.currFrame / 5);
        Utilit_.QuaternionVector3(this.transform.rotation, turnforce, turnforce);
        Laya.Vector3.scale(turnforce, value * this.sliptorque * (dot * length / this.maxSpeed), turnforce);
        car.AddTurnForce(turnforce);
    }
}