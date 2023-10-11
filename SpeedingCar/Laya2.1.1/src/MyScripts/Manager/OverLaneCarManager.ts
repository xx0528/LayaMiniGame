
import Carport from "../OBJ/Carport";
import OverLaneCar from "../OBJ/OverLaneCar";
import PlayerManager from "./PlayerManager";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import GameManager from "./GameManager";
import LevelDataConfig from "../Model/LevelConfig";
import Utilit_wcjtn_ from "../../Utilit";
import RoadManager from "./RoadManager";
import User_wcjtn_ from "../../User/User";

export default class OverLaneCarManager extends Laya.Script {

    private static _instance: OverLaneCarManager;
    public static Instance(): OverLaneCarManager {
        return this._instance;
    }
    private mLane: Laya.Sprite3D;
    private mCarAmount: number = 6;
    private disZ: number = 0;

    private mInMove: boolean = false;
    private mMoveSpeed: number = 20;

    private mCurrentCar:OverLaneCar;

    private mCarPool: any[] = new Array();
    private mLvehiclegenerateintervalMin: number = 100;
    private mLvehiclegenerateintervalMax: number = 150;
    private _roadLevel : number = 0;
    private _envirID:number = 0;

    
    constructor() { super(); }

    onAwake() {
        OverLaneCarManager._instance = this;
        this.mLane = this.owner as Laya.Sprite3D;

        for (let i = 0; i < GameManager.CarAmount; i++) {
            let array: Laya.Sprite3D[] = new Array();
            this.mCarPool.push(array);
        }


    }

    onEnable() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameMenu, this, this.OnGameMenu);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameOver, this, this.OnGameOver);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ChangeRoadLevel,this,this.ChangeRoadLevel);
    }

    onDestroy() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameMenu, this, this.OnGameMenu);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameOver, this, this.OnGameOver);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ChangeRoadLevel,this,this.ChangeRoadLevel);        

    }



    onUpdate() {
        if (this.mInMove) this.JudgeOver();
    }

    /**
    * 判断当前车辆是否离开了玩家车辆
    */
    private JudgeOver() {
        //闪车灯
        if (Math.abs(this.mCurrentCar.GetTailstock().x - PlayerManager.Instance().GetPlayerCar().GetHeadstock().x) < 1
            && (Math.abs(this.mCurrentCar.GetTailstock().z - PlayerManager.Instance().GetPlayerCar().GetHeadstock().z) < 40)) {
            this.mCurrentCar.FlashLight();
        }
        if (this.mCurrentCar.GetTailstock().z - PlayerManager.Instance().GetPlayerCar().GetHeadstock().z < -1) {
            this.RecoverCar();
        }
    }

    private RecoverCar(){
        // if (index != this.mCurrentCar.mCarID) {
        //     //换一辆车

        // }
        if(this.mCurrentCar)this.mCurrentCar.Hide();
        // this.mCurrentCar = this.GetCarInPool(index).getComponent(OverLaneCar);

        // this.mCurrentCar.Show();
        // this.mCurrentCar.GetCar().transform.localPositionZ = this.disZ;
        // this.mCurrentCar.ResetLight();     
        this.ShowCar();        
        this.SetSpeed();
        // if (this.mCurrentCarIndex >= this.mCarAmount) this.mCurrentCarIndex = 0;
    }

    private SetSpeed(){
        let index = Math.floor(Math.random()*LevelDataConfig.Instance().getDataByLevel(this._roadLevel).randomSpeedLists.length);
        // this.mMoveSpeed = LevelDataConfig.Instance().getDataByLevel(this._roadLevel).randomSpeedLists[index];
        // this.mMoveSpeed = 15 + Math.random() * 10;
        this.mMoveSpeed = 15+Math.random()*45+5*this._roadLevel;
    }

    private OnGameRelive(){
        this.RecoverCar();
        this.mInMove = true;
    }

    /**
    * 从车池中拿到没有在用的车模型
    * @param index 车子ID
    */
    private GetCarInPool(index: number): Laya.Sprite3D {
        let car: Laya.Sprite3D = null;
        for (let i = 0; i < this.mCarPool[index].length; i++) {
            let sp: Laya.Sprite3D = this.mCarPool[index][i].owner as Laya.Sprite3D;
            if (!sp.active) {
                car = sp;
                break;
            }
        }
        if (car == null) {
            car = this.CreateCar(index);
        }
        return car;
    }

    private ChangeRoadLevel(){
        this._roadLevel = RoadManager.Instance().GetRoadLevel();
        this.RecoverCar();
        // this.InitOverLaneCar();
    }

    private OnGameMenu() {
        this.mLane.transform.position = new Laya.Vector3(0, 0, 0);
        this.disZ = 0;
        this._roadLevel = 1;
        // if(LevelDataConfig.Instance().getDataByLevel(this._roadLevel).leveltype==0){
        //     this.mLane.active =true;
        //     this.InitSlowLaneCar();
        //     this.mInMove = true;
        // }else{
        //     this.mLane.active =false;
        // }
        this.mLane.active =true;
        this.mInMove = true;
        this.SetInterval();
        this.RecoverCar();
    }

    private SetInterval(){
        this.mLvehiclegenerateintervalMin = LevelDataConfig.Instance().getDataByLevel(this._roadLevel).lvehiclegenerateintervalMin;
        this.mLvehiclegenerateintervalMax = LevelDataConfig.Instance().getDataByLevel(this._roadLevel).lvehiclegenerateintervalMax;
    }

    private OnGameOver() {
        this.mInMove = false;
    }

    private ShowCar(){
        this.UpdateDis();
        let index = Math.floor(Math.random()*GameManager.CarAmount);
        this.mCurrentCar = this.GetCarInPool(index).getComponent(OverLaneCar);
        this.mCurrentCar.GetCar().transform.localPositionZ = this.disZ;
        this.mCurrentCar.Show();
    }



    private CreateCar(id: number): Laya.Sprite3D {
        let sp = Laya.Sprite3D.instantiate(Carport.Instance().GetCarByID(id), this.owner);
        sp.transform.localPositionZ = this.disZ;
        sp.transform.localPositionX = 1.1;
        let car: OverLaneCar = sp.addComponent(OverLaneCar);
        car.mCarID = id;
        //放入池中
        this.mCarPool[id].push(car);
        return sp;
    }

    private UpdateDis() {
        this.disZ += Utilit_wcjtn_.getRandomByRange(this.mLvehiclegenerateintervalMin, this.mLvehiclegenerateintervalMax);
    }

    Move() {
        let time = Utilit_wcjtn_.safeDelta() / 1000;
        let speed = this.mMoveSpeed + Math.random() * 10;
        this.mLane.transform.translate(new Laya.Vector3(0, 0, -this.mMoveSpeed * time));
    }

    GetHeadstock(): Laya.Vector3 {
        return this.mCurrentCar.GetHeadstock();
    }

    OnCrush(){
        this.mCurrentCar.OnCrush();
    }

}