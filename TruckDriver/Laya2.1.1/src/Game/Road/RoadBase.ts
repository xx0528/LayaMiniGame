import DriveBehaiovr from "../Car/DriveBehaiovr";
import HillCar from "../Car/HillCar";

export default class RoadBase extends Laya.Script3D {
    protected enter: Laya.Transform3D;
    protected exit: Laya.Transform3D;

    public get transform(): Laya.Transform3D {
        return (this.owner as Laya.Sprite3D).transform;
    }

    public onAwake() {
        this.enter = (this.owner.getChildByName("EnterPosition") as Laya.Sprite3D).transform;
        this.exit = (this.owner.getChildByName("ExitPosition") as Laya.Sprite3D).transform;
    }

    public Init() {
    }

    public onEnableWay(): void {

    }

    public onDisableWay(): void {

    }

    public UpdateCarBehaiovr(car: HillCar): void {
        car.SetTarget(this.GetTargetPoint());
    }

    public SetEnterPosition(position: Laya.Vector3): void {
        let offset = new Laya.Vector3;
        Laya.Vector3.subtract(this.transform.position, this.enter.position, offset);
        let newPosition = new Laya.Vector3();
        Laya.Vector3.add(position, offset, newPosition);
        this.transform.position =  newPosition.clone();
    }

    public GetEnterPosition(): Laya.Vector3 {
        return this.enter.position;
    }

    public GetExitPosition(): Laya.Vector3 {
        return this.exit.position;
    }

    public TryMoveWay(currentPosition: Laya.Vector3, car: HillCar): boolean {
        let distance = Laya.Vector3.distance(currentPosition, this.exit.position);
        if (distance < 0.2 || currentPosition.z >= this.exit.position.z) {
            return false
        }
        return true;
    }

    public GetTargetPoint(): Laya.Vector3 {
        return this.exit.position.clone();
    }
}