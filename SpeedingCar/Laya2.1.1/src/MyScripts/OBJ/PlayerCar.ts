import Car from "./Car";
import SlowLaneCarManager from "../Manager/SlowLaneCarManager";
import Camera from "./Camera";
import Wheel from "./Wheel";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import Sound_wcjtn_Mgr, { Sound_wcjtn_Type } from "../../Mgr/SoundMgr";
import Utilit_wcjtn_ from "../../Utilit";
import User_wcjtn_ from "../../User/User";
import GameManager from "../Manager/GameManager";
import Rookie from "./Rookie";
import Vibrate_wcjtn_Mgr from "../../Mgr/VibrateMgr";

export default class PlayerCar extends Car {

    private mAccel: number = 3;
    private mSpeed: number = 0;

    private mSlowAccel: number = 0;


    private mMoveType: CarMoveType = CarMoveType.InSlowLane;
    private mTween: Laya.Tween;

    private mLeftTrail: Laya.Sprite3D;
    private mRightTrail: Laya.Sprite3D;

    private mTrailDis: Laya.Vector3 = new Laya.Vector3(0, 0, 0);


    constructor() { super(); }

    onAwake() {
        this.mCar = this.owner as Laya.Sprite3D;
        this.mRig = this.mCar.getComponent(Laya.Rigidbody3D);
        this.mHeadstock = this.mCar.getChildByName("Headstock") as Laya.Sprite3D;
        this.mTailstock = this.mCar.getChildByName("Tailstock") as Laya.Sprite3D;
        this.mCarModel = this.mCar.getChildByName("CarModel") as Laya.MeshSprite3D;

        this.mHeadLight0 = (this.mCar.getChildByName("HeadLight0") as Laya.Sprite3D);
        this.mHeadLight0.active = false;
        this.mHeadLight1 = (this.mCar.getChildByName("HeadLight1") as Laya.Sprite3D);
        this.mHeadLight1.active = false;

        this.mRookie = this.mCar.getChildByName("rookie").addComponent(Rookie);
        this.mRookie.hide();

        this.modelStartLocalPos = this.mCarModel.transform.localPosition.clone();
        this.modelStartLocalRot = this.mCarModel.transform.localRotationEuler.clone();

        this.mCarAni = this.mCar.getComponent(Laya.Animator);
        this.mCarAni.enabled = false;

        let lunzi = this.mCarModel.getChildByName("lunzi") as Laya.Sprite3D;
        lunzi._children.forEach(child => {
            let wheel = (child as Laya.Sprite3D).addComponent(Wheel);
            this.mWheelLists.push(wheel);
        });

        (this.mCarModel as Laya.MeshSprite3D).meshRenderer.castShadow = true;
        this.mLeftTrail = this.mCar.getChildByName("leftTrail") as Laya.Sprite3D;
        this.mRightTrail = this.mCar.getChildByName("rightTrail") as Laya.Sprite3D;
    }

    onEnable() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ToSlowLane, this, this.ToSlowLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ToOverLane, this, this.ToOverTakeLane);
    }

    onDestroy() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ToSlowLane, this, this.ToSlowLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ToOverLane, this, this.ToOverTakeLane);
    }


    SetAccle(accel: number) {
        this.mAccel = accel;
    }

    Move() {
        switch (this.mMoveType) {
            case CarMoveType.InSlowLane:
                this.SlowLaneMove();
                break;
            case CarMoveType.InOverLane:
                this.OverLaneMove();
                break;
            case CarMoveType.InRookie:
                this.RookieMove();
                break;
        }

    }

    private SlowLaneMove() {
        //回正运动
        // let speed = Math.max(SlowLaneCarManager.Instance().GetSlowLaneSpeed(), this.mSpeed);
        // Sound_wcjtn_Mgr.ins_wcjtn_tance.play_wcjtn_Sound(Sound_wcjtn_Type.Driving);

        // let speed = SlowLaneCarManager.Instance().GetSlowLaneSpeed();
        // let speedMax = 1.5 * speed;
        let dis = SlowLaneCarManager.Instance().GetSafePos().z - this.mHeadstock.transform.position.z;
        if (this.mHeadstock.transform.position.z - SlowLaneCarManager.Instance().GetCarTail().z < -0.5) {
            //横向运动                
            this.mCar.transform.localPositionX += Math.min(0, this.mLanePosX - this.mCar.transform.localPositionX) * (8+2*this.mCarID) * Utilit_wcjtn_.safeDelta() / 1000;
            //前进方向
            this.mSpeed = SlowLaneCarManager.Instance().GetSlowLaneSpeed() + dis * (0.8+0.3*this.mCarID);
            this.mCar.transform.translate(new Laya.Vector3(0, 0, this.mSpeed * Utilit_wcjtn_.safeDelta() / 1000));
        } else {
            this.mSpeed = SlowLaneCarManager.Instance().GetSlowLaneSpeed() + dis * 10;
            this.mCar.transform.translate(new Laya.Vector3(0, 0, this.mSpeed * Utilit_wcjtn_.safeDelta() / 1000));
        }
    }

    private RookieMove(){
        //横向运动
        this.mCar.transform.localPositionX += Math.max(0, this.mLanePosX + 2.3 - this.mCar.transform.localPositionX) * (8+2*this.mCarID) * Utilit_wcjtn_.safeDelta() / 1000;

        //超车运动
        let speed = Math.max(SlowLaneCarManager.Instance().GetSlowLaneSpeed(), this.mSpeed);
        let speedMax = (50+5*this.mCarID);
        speed += Utilit_wcjtn_.safeDelta() / 1000 * this.mAccel;
        speed = Math.min(speedMax, speed)*2.5;
        this.mSpeed = speed;
        this.mCar.transform.translate(new Laya.Vector3(0, 0, this.mSpeed * Utilit_wcjtn_.safeDelta() / 1000));
    }

    private OverLaneMove() {
        //横向运动
        this.mCar.transform.localPositionX += Math.max(0, this.mLanePosX + 2.3 - this.mCar.transform.localPositionX) * (8+2*this.mCarID) * Utilit_wcjtn_.safeDelta() / 1000;
        //超车运动
        let speed = Math.max(SlowLaneCarManager.Instance().GetSlowLaneSpeed(), this.mSpeed);
        let speedMax = 50+5*this.mCarID;
        speed += Utilit_wcjtn_.safeDelta() / 1000 * this.mAccel;
        speed = Math.min(speedMax, speed);
        this.mSpeed = speed;
        this.mCar.transform.translate(new Laya.Vector3(0, 0, this.mSpeed * Utilit_wcjtn_.safeDelta() / 1000));
    }

    /**
     * 变超车道
     */
    ToOverTakeLane() {
        this.mMoveType = CarMoveType.InOverLane;
        this.mSpeed = SlowLaneCarManager.Instance().GetSlowLaneSpeed() * 1.2;
    }

    /**
     * 回慢速道
     */
    ToSlowLane() {
        this.mMoveType = CarMoveType.InSlowLane;
        this.mSpeed = SlowLaneCarManager.Instance().GetSlowLaneSpeed();
        Sound_wcjtn_Mgr.ins_wcjtn_tance.stopSound(Sound_wcjtn_Type.SpeedUp);
    }
    /**
     * 进入无敌星时间
     */
    ToRookie(){
        this.mMoveType = CarMoveType.InRookie;
        this.mSpeed = SlowLaneCarManager.Instance().GetSlowLaneSpeed() * 1.2;        
    }

    Show(){
        super.Show();
        this.mCarID = GameManager.mCarID;
        this.mMoveType = CarMoveType.InSlowLane;
        
    }


    CompleteGame() {
        this.mMoveType = CarMoveType.InSlowLane;
        Laya.Tween.to(this.mCar.transform, { localPositionX: this.mLanePosX + 2.3 }, 100, Laya.Ease.quadOut, Laya.Handler.create(this, () => {
            Laya.Tween.to(this.mCar.transform, { localPositionZ: this.mCar.transform.localPositionZ + 20 }, 800, Laya.Ease.quadOut);
        }));
        Laya.timer.once(1800,this,()=>{
            this.mCar.transform.localPositionZ-=20;
            this.mCar.transform.localPositionX = this.mLanePosX;
        })
    }


    HideTrail() {
        this.mLeftTrail.active = false;
        this.mRightTrail.active = false;
    }


    SetTrail(leftTrail: Laya.Sprite3D, rightTrail: Laya.Sprite3D) {
        this.mLeftTrail.active = true;
        this.mRightTrail.active = true;
        // return;
        this.mLeftTrail.addChild(leftTrail);
        this.mRightTrail.addChild(rightTrail);
        leftTrail.transform.position = this.mLeftTrail.transform.position;
        leftTrail.transform.translate(this.mTrailDis);
        rightTrail.transform.position = this.mRightTrail.transform.position;
        rightTrail.transform.translate(this.mTrailDis);
    }

    SetOverEff(overEff: Laya.Sprite3D) {
        this.mCar.addChild(overEff);
        overEff.transform.position = this.GetHeadstock();
    }

    OnCrush() {
        this.mCarAni.enabled = true;
        this.mCarAni.play("Crush", 0, 0);
    }



}

export enum CarMoveType {
    InOverLane,
    InSlowLane,
    InCrash,
    InRookie,
}