import TrackWay from "../Path/TrackWay";
import Utilit_ from "../../Utilit";
import RoadBase from "./RoadBase";
import HillCar from "../Car/HillCar";

export default class SplineRoad extends RoadBase {
    public spline: Laya.Sprite3D;
    public trackWay: TrackWay = null;
    public currentWaypointIndex: number = 0;
    public pickNextWaypointDist: number = 3;
    public endReachedDistance: number = 5;
    public currentTargetPoint: Laya.Vector3 = new Laya.Vector3;

    public onAwake(): void {
        super.onAwake();
        this.spline = this.owner.getChildByName("Spline") as Laya.Sprite3D;
    }

    public Init() {
        super.Init();
        this.trackWay = new TrackWay();
        this.trackWay.CalculatePath(this.spline, 1, 1);
    }

    public TryMoveWay(currentPosition: Laya.Vector3, car: HillCar): boolean {
        let flag = this.CalculateTarget(currentPosition, car, this.currentTargetPoint);
        return flag;
    }

    public GetTargetPoint(): Laya.Vector3 {
        return this.currentTargetPoint;
    }

    public CalculateTarget(currentPosition: Laya.Vector3, car: HillCar, outTarget: Laya.Vector3): boolean {
        if (this.trackWay.WayPoints == null || this.trackWay.WayPoints.length == 0)
            return false;

        let vPath = this.trackWay.WayPoints;
        if (vPath.length == 1)
            vPath.splice(0, 0, currentPosition.clone() as Laya.Vector3);

        if (this.currentWaypointIndex >= vPath.length)
            this.currentWaypointIndex = vPath.length - 1;

        if (this.currentWaypointIndex <= 1)
            this.currentWaypointIndex = 1;

        let target = currentPosition.clone();
        while (true) {
            if (this.currentWaypointIndex >= vPath.length - 1)
                break;

            var position = new Laya.Vector3;
            Utilit_.InverseTransformPoint(car.transform, vPath[this.currentWaypointIndex], position);
            target.y = vPath[this.currentWaypointIndex].y;
            let distance = Laya.Vector3.distance(vPath[this.currentWaypointIndex], target)
            if (distance > this.pickNextWaypointDist && position.z > 0)
                break;

            this.currentWaypointIndex++;
        }

        let targetDistance = Laya.Vector3.distance(currentPosition, vPath[this.currentWaypointIndex]);
        if (this.currentWaypointIndex == (vPath.length - 1) && targetDistance <= this.endReachedDistance) {
            vPath[this.currentWaypointIndex].cloneTo(outTarget);
            return false;
        }
        vPath[this.currentWaypointIndex].cloneTo(outTarget);
        return true;
    }
}