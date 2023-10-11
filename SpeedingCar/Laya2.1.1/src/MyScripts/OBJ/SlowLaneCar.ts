import Car from "./Car";

export default class SlowLaneCar extends Car {

    
    private mShakeSpeed:number = 1+Math.random();
    private mShakeRot:number = 0.7;

    constructor() { super(); }
    
    onAwake(){
        super.onAwake();

    }

    onUpdate(){
        this.Shake();

    }

    private Shake(){
        if(Math.abs(this.mCarModel.transform.localRotationEulerX)>=this.mShakeRot)this.mShakeSpeed=-this.mShakeSpeed;
        this.mCarModel.transform.localRotationEulerX+=this.mShakeSpeed*0.1;
    }


}