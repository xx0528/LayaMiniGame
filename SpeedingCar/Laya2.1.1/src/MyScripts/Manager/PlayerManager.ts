import SceneManager from "./SceneManager";
import Carport from "../OBJ/Carport";
import Camera from "../OBJ/Camera";
import SlowLaneCarManager from "./SlowLaneCarManager";
import PlayerCar from "../OBJ/PlayerCar";
import OverLaneCarManager from "./OverLaneCarManager";
import GameManager from "./GameManager";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import User_wcjtn_ from "../../User/User";
import CarDataConfig from "../Model/CarConfig";
import OverCarEffect from "../OBJ/OverCarEffect";
import LevelDataConfig from "../Model/LevelConfig";
import Sound_wcjtn_Mgr, { Sound_wcjtn_Type } from "../../Mgr/SoundMgr";
import Vibrate_wcjtn_Mgr from "../../Mgr/VibrateMgr";

export default class PlayerManager extends Laya.Script {


    private static _instance: PlayerManager;
    public static Instance(): PlayerManager {
        return this._instance
    }
    private mCar: PlayerCar;
    private mCarLists: PlayerCar[] = new Array();

    private mStartPos: Laya.Vector3 = new Laya.Vector3(-1.2, 0.052, -4.829);
    private mStartRot: Laya.Vector3 = new Laya.Vector3(0, 0, 0);

    private mInMove: boolean = false;
    private mCrashEffect: Laya.Sprite3D;
    private mRookieCrashEff: Laya.Sprite3D;

    private mInGame:boolean = false;
    private mOverPosZ:number = 0;

    private mLeftTrail:Laya.Sprite3D;
    private mRightTrail:Laya.Sprite3D;

    private byCrush:boolean = false;
    private _hasFuel:boolean = true;

    private _rookieEff:Laya.Sprite3D;
    private _onRookie:boolean = false;
    private _onMagnet:boolean = false;


    constructor() { super(); }

    onAwake() {
        PlayerManager._instance = this;
        this.mCrashEffect = this.owner.getChildByName("CrashEffect") as Laya.Sprite3D;
        this.mCrashEffect.active = false;

        this.mLeftTrail = this.owner.getChildByName("leftTrail") as Laya.Sprite3D;
        this.mRightTrail = this.owner.getChildByName("rightTrail") as Laya.Sprite3D;
        
        this._rookieEff = this.owner.getChildByName("rookie") as Laya.Sprite3D;
        this.mRookieCrashEff = this.owner.getChildByName("rookieCrashEff") as Laya.Sprite3D;
        this.mRookieCrashEff.transform.scale = new Laya.Vector3(1.2,1.2,1.2);
        this.mRookieCrashEff.active = false;
        // this._rookieEff.active = false;
        // this.mOverCarEff.active = false;
    }

    onEnable() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameMenu, this, this.OnGameMenu);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameOver, this, this.OnGameOver);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameStart, this, this.OnGameStart);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);
    }

    onDestroy(){
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameMenu, this, this.OnGameMenu);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameOver, this, this.OnGameOver);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameStart, this, this.OnGameStart);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);   
    }


    onStageMouseDown() {
        if (this.mInGame && !this._onRookie){
            Sound_wcjtn_Mgr.ins_wcjtn_tance.play_wcjtn_Sound(Sound_wcjtn_Type.SpeedUp);            
            Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.ToOverLane);
        } 
    }

    onStageMouseUp() {
        if (this.mInGame && !this._onRookie){
            Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.ToSlowLane);
        }
    }

    onUpdate() {
        if (this.mInMove) {
            this.mCar.Move();
            SlowLaneCarManager.Instance().Move();
            OverLaneCarManager.Instance().Move();
            Camera.Instance().SetCameraPos();            
            if(this.mInGame){
                if (this.JudgeCol()){
                    OverLaneCarManager.Instance().OnCrush();
                    console.log("撞到车了");
                    //TODO撞车动画
                    if(!this._onRookie){
                        GameManager.Instance().GameOver(false);
                        this.mCar.OnCrush();
                        this.byCrush = true;
                        this.ShowCrashEff();
                        Vibrate_wcjtn_Mgr.vibrate_wcjtn_Long()
                        
                        //this.ShowRookieCrashEff();                        
                        
                    }else{
                        this.ShowRookieCrashEff();
                        Vibrate_wcjtn_Mgr.vibrate_wcjtn_Short()
                    }
                } 
            }
        }
        if(this._onRookie){
            this._rookieEff.transform.position = this.mCar.GetCarPos();
        }
    }

    /**
     * 获取是否正在加速火箭
     */
    public get GetOnRookie():boolean{
        return this._onRookie;
    }

    NoFuel(){
        this._hasFuel = false;
    }


    OnGameOver() {
        this.mInMove = false;
        this.mInGame = false;
        Sound_wcjtn_Mgr.ins_wcjtn_tance.stopSound(Sound_wcjtn_Type.SpeedUp);
        if(!this._hasFuel)return;        
        if(!this.byCrush)this.mCar.CompleteGame();
    }

    OnGameRelive(){
        this.mInMove = true;
        this.mInGame = true;
        this.byCrush = false;
        this.mCar.Show();
    }

    OnGameStart() {
        OverCarEffect.Instance().SetFollowPos(this.mCar.GetHeadstock());        
        this.mCar.SetTrail(this.mLeftTrail,this.mRightTrail);
        this.mInGame = true;
        this.byCrush = false;
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.ToSlowLane);  
    }

    OnGameMenu() {
        this._hasFuel = true;
        this.mInGame = false;        
        //从车库提车
        if (this.mCar == null) {
            this.mCar = this.GetCarInPort(User_wcjtn_.getCarID());
        }else{
            this.ChooseCarByID(GameManager.mCarID);
        }
        this.mCar.ToSlowLane();        
        this.mCar.SetCarTrans(this.mStartPos, this.mStartRot);
        this.mCar.HideTrail();
        //摄像机跟随
        Camera.Instance().SetFollowCar(this.mCar.owner as Laya.Sprite3D);
        this.StartMove();
        this.mCrashEffect.active = false;
    }

    OnRookieTime(){
        this._onRookie = true;
        this._rookieEff.active = true;
        this.mCar.ToRookie();
        Camera.Instance().ToOverTakeLane();
        Laya.timer.once(4000,this,()=>{
            this._onRookie = false;
            this._rookieEff.active =false;
        })
        Laya.timer.once(3800,this,()=>{
            this.mCar.ToSlowLane();
            Camera.Instance().ToSlowLane();
        })

    }

    private GetCarInPort(id: number): PlayerCar {
        let sp: Laya.Sprite3D = Laya.Sprite3D.instantiate(Carport.Instance().GetCarByID(id));
        SceneManager.Instance().owner.addChild(sp);
        let car:PlayerCar = sp.addComponent(PlayerCar);
        this.mCarLists[id] = car;
        car.SetAccle(CarDataConfig.Instance().getCarDataByID(id).accel);
        return car;
    }


    ChooseCarByID(id: number) {
        if (this.mCarLists[id] == null) {
            this.GetCarInPort(id);
        }
        let pos = this.mCar.GetCarPos();
        this.mCar.Hide();
        this.mCar = this.mCarLists[id];
        this.mCar.SetCarTrans(pos, this.mStartRot);
        Camera.Instance().SetFollowCar(this.mCar.owner as Laya.Sprite3D);
    }

    /**
     * 开始驾驶
    */
    StartMove() {
        this.mInMove = true;
    }

    /**
     * 停止驾驶
     */
    StopMove() {
        this.mInMove = false;
    }

    GetPlayerCar(): PlayerCar {
        return this.mCar;
    }

    /**
     * 判断是否发生了碰撞
     */
    JudgeCol(): boolean {
        // if(LevelDataConfig.Instance().getDataByLevel().leveltype==1)return;
        let res: boolean = (Math.abs(this.mCar.GetHeadstock().x - OverLaneCarManager.Instance().GetHeadstock().x) < 1.25
            && Math.abs(this.mCar.GetHeadstock().z - OverLaneCarManager.Instance().GetHeadstock().z) < 1.25);
        return res;
    }

    private ShowCrashEff() {
        this.mRookieCrashEff.active = false;        
        this.mRookieCrashEff.transform.position = this.mCar.GetHeadstock();
        this.mRookieCrashEff.active = true;
        Sound_wcjtn_Mgr.ins_wcjtn_tance.play_wcjtn_Sound(Sound_wcjtn_Type.Crush);
    }

    private ShowRookieCrashEff() {
        // this.mRookieCrashEff.active = false;
        // this.mRookieCrashEff.transform.position = new Laya.Vector3(this.mCar.GetHeadstock().x,
        //     this.mCar.GetHeadstock().y,this.mCar.GetHeadstock().z+30);
        // this.mRookieCrashEff.active = true;

        Camera.Instance().ShowCrushEff();
        Sound_wcjtn_Mgr.ins_wcjtn_tance.play_wcjtn_Sound(Sound_wcjtn_Type.Crush);
    }

    onKeyDown(e:Laya.Event){
        if(e.keyCode == 51){
            Camera.Instance().ShowCrushEff();
        }
    }



}