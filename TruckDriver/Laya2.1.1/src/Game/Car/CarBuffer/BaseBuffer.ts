import HillCar from "../HillCar";

export default abstract class BaseBuffer {
    public duration: number;

    constructor(name, duration) {
        this._name = name;
        this.duration = duration;
    }

    public _name: string;
    private _startTime: number;

    public Start(car: HillCar): void {
        this._startTime = Laya.timer.currTimer;
        this.OnEnable(car);
    }

    public TryUpdateBuffer(car: HillCar): boolean {
        this.OnUpdate(car);
        return (Laya.timer.currTimer - this._startTime) <= this.duration;
    }

    public Stop(car: HillCar): void {
        this.OnDisable(car);
    }

    protected abstract OnEnable(car: HillCar);

    protected abstract OnUpdate(car: HillCar);

    protected abstract OnDisable(car: HillCar);
}