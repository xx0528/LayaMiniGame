import FSMStateMachine from "./FSMStateMachine";
import HillCar from "../Car/HillCar";


var getHandler = Laya.Handler.create;
export default class CarStateMachine extends FSMStateMachine {
    private car: HillCar = null;

    constructor(car: HillCar) {
        super();

        this.car = car;
        this.AddAction("Stand");
        this.AddAction("SpeedUp", this, this.onSpeedUpEnter, null, this.onSpeedUpUpdate);
    }

    private onSpeedUpEnter() {

    }

    private onSpeedUpUpdate() {

    }

    
}