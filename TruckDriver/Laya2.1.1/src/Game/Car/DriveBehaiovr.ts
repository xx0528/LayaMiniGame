import RoadBase from "../Road/RoadBase";
import HillCar from "./HillCar";

export default class DriveBehaiovr {
    public way: RoadBase = null;

    constructor(way: RoadBase) {
        this.way = way;
    }

    public get TargetPoint(): Laya.Vector3 {
        return this.way.GetTargetPoint();
    }

    public UpdateBehaiovr(car: HillCar): void {
        // var targetDir = car.GetTargetDir(this.TargetPoint);
        // targetDir.cloneTo(car.drivingDirection);

        car.SetTarget(this.TargetPoint);
    }
}