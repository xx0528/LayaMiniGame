import Car from "./Car";
import GameManager from "../Manager/GameManager";
import Sound_wcjtn_Mgr, { Sound_wcjtn_Type } from "../../Mgr/SoundMgr";

export default class OverLaneCar extends Car {
    private mShakeSpeed: number = 1 + Math.random();
    private mShakeRot: number = 0.7;

    private mInFlashLight: boolean = false;



    constructor() { super(); }

    onAwake() {
        super.onAwake();
        this.mCar.transform.rotationEuler = new Laya.Vector3(0, 180, 0);


    }

    onUpdate() {
        this.Shake();

    }

    private Shake() {
        if (Math.abs(this.mCarModel.transform.localRotationEulerX) >= this.mShakeRot) this.mShakeSpeed = -this.mShakeSpeed;
        this.mCarModel.transform.localRotationEulerX += this.mShakeSpeed * 0.1;
    }

    GetLightPos(name: string): Laya.Sprite3D {
        if (name == "HeadLight0") {
            return this.mHeadLight0;
        } else {
            return this.mHeadLight1;
        }
    }

    FlashLight() {
        if (!this.mInFlashLight) {
            // Sound_wcjtn_Mgr.ins_wcjtn_tance.play_wcjtn_Sound(Sound_wcjtn_Type.Whistle);
            this.mInFlashLight = true;
            this.mHeadLight0.active = false;
            this.mHeadLight1.active = false;
            this.mHeadLight0.active = true;
            this.mHeadLight1.active = true;
            
        }
    }

    ResetLight() {
        this.mHeadLight0.active = false;
        this.mHeadLight1.active = false;
        this.mInFlashLight = false;
    }

    OnCrush(){
        this.mCarAni.enabled = true;
        this.mCarAni.play("BeHit",0,0);
    }
}