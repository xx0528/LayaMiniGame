import CameraMoveScript from "../../CameraMoveScript";
import SceneManager from "../Manager/SceneManager";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import User_wcjtn_ from "../../User/User";

export default class Camera extends Laya.Script {

    private static _instance: Camera;
    public static Instance(): Camera {
        return this._instance;
    }
    private mOwner: Laya.Sprite3D;
    private mCamera: Laya.Camera;

    private mStartPos:Laya.Vector3 = new Laya.Vector3(0,1.29,-3.68);

    private mMenuPos: Laya.Vector3 = new Laya.Vector3(-1.037, 0.8065599060058591, -5.2834547424316405);
    private mMenuRot: Laya.Vector3 = new Laya.Vector3(-9.844753429733803, 180, -1.1997108123651298e-15);

    private mDrivingLocalPos: Laya.Vector3 = new Laya.Vector3(-1.037, 0.15, -1.6);
    private mDrivingRot: Laya.Vector3 = new Laya.Vector3(-6.327983014211964, 180, -7.73379915245168e-16);

    private mOverTakeLocalPos: Laya.Vector3 = new Laya.Vector3(-1.1857875429273104, 1.3483932496702797, -6.897052740230979);
    private mOverTakeRot: Laya.Vector3 = new Laya.Vector3(-18.810397007940924, -179.312450645843, -6.703097649785998e-9);

    private mGameOverLocalPos:Laya.Vector3 = new Laya.Vector3(-1.0366785786747938, 5.274029811322687, -16.520498341321968);

    private mSkinLocalPos:Laya.Vector3 = new Laya.Vector3(2.776828130783511, 0.9670544925895491, 1.3143668467550922);
    private mSkinLocalRot:Laya.Vector3 = new Laya.Vector3(-27.397888441361758, 58.90880774587121, 0.0000017969461739164333);

    private mCar: Laya.Sprite3D;
    private mDisByCarZ: number = 0;
    private mDisByCarX: number = 0;

    private mCurrentTween:Laya.Tween;
    private mTempVector3 = new Laya.Vector3();

    private mMaxDisZ:number = -5;
    private mMinDisZ:number = -1;

    private mSpeedUpEff:Laya.Sprite3D;
    private mCarID:number = 0;

    private mOverScoreEff:Laya.Sprite3D;
    private mCrushEff:Laya.Sprite3D;
    private mColorBarEff:Laya.Sprite3D;

    constructor() { super(); }

    onAwake() {
        Camera._instance = this;
        this.Init();
    }

    onEnable(){
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameMenu,this,this.OnGameMenu);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameOver,this,this.OnGameOver);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ToSlowLane,this,this.ToSlowLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ToOverLane,this,this.ToOverTakeLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameRelive,this,this.ToSlowLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ChangeRoadLevel,this,this.OnChangeRoalLevel);
        this.mCamera.addComponent(CameraMoveScript);
        
    }

    onDestroy(){
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameMenu,this,this.OnGameMenu);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameOver,this,this.OnGameOver);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ToSlowLane,this,this.ToSlowLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ToOverLane,this,this.ToOverTakeLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameRelive,this,this.ToSlowLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ChangeRoadLevel,this,this.OnChangeRoalLevel);
        
        
    }



    private Init() {
        this.mOwner = this.owner as Laya.Sprite3D;
        this.mCamera = this.mOwner.getChildByName("Main Camera") as Laya.Camera;
        this.mSpeedUpEff = this.mOwner.getChildByName("SpeedUpEffect") as Laya.Sprite3D;
        this.mSpeedUpEff.active= false;
        this.mOverScoreEff = this.mOwner.getChildByName("Fx_posui") as Laya.Sprite3D;
        this.mOverScoreEff.active =false;
        this.mCrushEff = this.mOwner.getChildByName("Fx_crush") as Laya.Sprite3D;
        this.mCrushEff.active = false;
        this.mColorBarEff = this.mOwner.getChildByName("shenli") as Laya.Sprite3D;
        this.mColorBarEff.active = false;
        // this.mChangeEnvEff.play("anim_basi",0,0);
    }


    SetCameraPos() {
        this.mOwner.transform.position = new Laya.Vector3(this.mCar.transform.position.x - this.mDisByCarX,
            this.mOwner.transform.position.y, this.mCar.transform.position.z - this.mDisByCarZ);
    }

    SetFollowCar(car:Laya.Sprite3D){
        this.mCar = car;
        this.mDisByCarZ = this.mCar.transform.position.z - this.mOwner.transform.position.z;
        this.mDisByCarX = this.mCar.transform.position.x - this.mOwner.transform.position.x;
    }

    GetCameraPos(): Laya.Vector3 {
        return this.mOwner.transform.position;
    }

    onKeyDown(e: Laya.Event) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case 101:
                console.log(this.mCamera.transform.position, this.mCamera.transform.rotationEuler);
                break;
            case 102:
                console.log(this.mCamera.transform.localPosition, this.mCamera.transform.localRotationEuler);
                break;
        }
    }

    OnGameMenu(){
        this.mOwner.transform.position = this.mStartPos;
        this.mCarID = User_wcjtn_.getCarID();
        this.ToMenu();
        
    }   

    ShowOverScoreEff(){
        this.mColorBarEff.active = false;        
        this.mColorBarEff.active = true;
        Laya.timer.once(2000,this,()=>{
            this.mColorBarEff.active = false;
        })
        this.mOverScoreEff.active =false;
        this.mOverScoreEff.active =true;
    }


    ShowCrushEff(){
        this.mCrushEff.active =false;
        this.mCrushEff.active =true;
    }

    OnGameOver(){
        if(this.mCurrentTween)Laya.Tween.clear(this.mCurrentTween);
        this.mSpeedUpEff.active = false;
        this.mCurrentTween = Laya.Tween.to(this.mCamera.transform,
            { localPositionX: this.mGameOverLocalPos.x, localPositionY: this.mGameOverLocalPos.y, localPositionZ: this.mGameOverLocalPos.z },
            800, Laya.Ease.quintOut,Laya.Handler.create(this,()=>{
                Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.ShowResults)
            }));
    }

    ToOverTakeLane(speed:number = 1) {
        if(this.mCurrentTween)Laya.Tween.clear(this.mCurrentTween);
        Laya.Tween.clearTween(this.mCamera.transform);
        Laya.timer.clearAll(this);
        this.mSpeedUpEff.active = true;
        Laya.timer.once(150-this.mCarID*10,this,()=>{
            this.mCurrentTween = Laya.Tween.to(this.mCamera.transform,
                { localPositionX: this.mOverTakeLocalPos.x, 
                    localPositionY: this.mOverTakeLocalPos.y, 
                    localPositionZ: this.mOverTakeLocalPos.z,
                 },
                1000*4*speed, Laya.Ease.quintOut);
        })
        Laya.timer.once(100,this,()=>{
            Laya.Tween.to(this.mCamera.transform,
                {
                    localRotationEulerX:this.mOverTakeRot.x,
                    localRotationEulerZ:this.mOverTakeRot.z 
                 },
                1000*12*speed);
        })
    }

    ToSlowLane(speed:number = 1) {
        this.mSpeedUpEff.active = false;
        if(this.mCurrentTween)Laya.Tween.clear(this.mCurrentTween);
        Laya.Tween.clearTween(this.mCamera.transform);
        Laya.timer.clearAll(this);                
        this.mCurrentTween = Laya.Tween.to(this.mCamera.transform,
            { localPositionX: this.mDrivingLocalPos.x, 
                localPositionY: this.mDrivingLocalPos.y, 
                localPositionZ: this.mDrivingLocalPos.z,
                localRotationEulerX:this.mDrivingRot.x,
                localRotationEulerZ:this.mDrivingRot.z },
            1500*speed, Laya.Ease.backOut);
    }

    ToSkin(){
        Laya.timer.clearAll(this);                                
        if(this.mCurrentTween)Laya.Tween.clear(this.mCurrentTween);
        this.mCurrentTween = Laya.Tween.to(this.mCamera.transform,
            { localPositionX: this.mSkinLocalPos.x, 
                localPositionY: this.mSkinLocalPos.y, 
                localPositionZ: this.mSkinLocalPos.z,
                localRotationEulerX:this.mSkinLocalRot.x,
                localRotationEulerY:this.mSkinLocalRot.y,
                localRotationEulerZ:this.mSkinLocalRot.z },
            500, Laya.Ease.quadOut);
    }

    ToMenu(){
        Laya.timer.clearAll(this);                        
        if(this.mCurrentTween)Laya.Tween.clear(this.mCurrentTween);
        this.mCurrentTween = Laya.Tween.to(this.mCamera.transform,
            { localPositionX: this.mMenuPos.x, 
                localPositionY: this.mMenuPos.y, 
                localPositionZ: this.mMenuPos.z,
                localRotationEulerX:this.mMenuRot.x,
                localRotationEulerY:this.mMenuRot.y,
                localRotationEulerZ:this.mMenuRot.z },
            300);
    }

    private OnChangeRoalLevel(){
        // this.mChangeEnvEff.active = false;
        // this.mChangeEnvEff.active = true;

    }

}   