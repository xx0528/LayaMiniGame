import Carport from "../OBJ/Carport";
import SlowLaneCar from "../OBJ/SlowLaneCar";
import PlayerManager from "./PlayerManager";
import SceneManager from "./SceneManager";
import Coin from "../OBJ/Coin";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import GameManager from "./GameManager";
import CarDataConfig from "../Model/CarConfig";
import LevelDataConfig from "../Model/LevelConfig";
import Utilit_wcjtn_ from "../../Utilit";
import OverCarEffect from "../OBJ/OverCarEffect";
import RoadManager from "./RoadManager";
import User_wcjtn_ from "../../User/User";
import Rookie from "../OBJ/Rookie";
import ScoreCard from "../OBJ/ScoreCard";
import Camera from "../OBJ/Camera";
import Game_wcjtn_Mgr from "../../Mgr/GameMgr";

export default class SlowLaneCarManager extends Laya.Script {

    private static _instance:SlowLaneCarManager;
    public static Instance():SlowLaneCarManager{
        return this._instance;
    }
    private mLane:Laya.Sprite3D;
    private disZ:number = 0;
    private mInMove:boolean = false;
    private mMoveSpeed: number= 15;

    private mCarLists:SlowLaneCar[] = new Array();
    private mCurrentCarIndex:number = 0;
    private mCarAmount:number = 6;
    private mCarID:number = 0;

    private mCarPool:any[] = new Array();
    
    private mCoinPre:Laya.Sprite3D;
    private mCoinLists:Coin[] = new Array();
    private mCoinPanel:Laya.Sprite3D;

    private mAccel:number = 0;
    private mAccelTimer:number = 0;     
    private mRvehiclespeed:number = 0.4;    //当前关卡车辆加速度缩放比例
    private mRvehiclegenerateintervalMin:number = 20;   //当前关卡慢速道车辆间隔最小值
    private mRvehiclegenerateintervalMax:number = 30;   //当前关卡慢速道车辆间隔最大值

    private mOverGetCoin:number = 0 ;   //当前关卡超过一部车获得金币
    private _roadLevel : number = 0;

    private _overCarAmount:number = 0;
    private _hadRookie:boolean = false;

    private _inAwardLevel:boolean = false;


    
    constructor() { super(); }

    onAwake(){
        SlowLaneCarManager._instance = this;
        this.mLane = this.owner as Laya.Sprite3D;

        for(let i = 0 ; i < GameManager.CarAmount ; i++){
            let array:Laya.Sprite3D[] = new Array();
            this.mCarPool.push(array);
        }
        
        this.mCoinPre = SceneManager.Instance().GetChildByName("Coin");
        this.owner.addChild(this.mCoinPre);
        this.mCoinPanel = SceneManager.Instance().GetChildByName("CoinPanel");

    }

    onEnable(){
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameMenu,this,this.OnGameMenu);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ToOverLane,this,this.ToOverLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ToSlowLane,this,this.ToSlowLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameOver, this, this.OnGameOver);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ChangeRoadLevel, this, this.ChangeRoadLevel);
        
    }

    onDestroy(){
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameMenu,this,this.OnGameMenu);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ToOverLane,this,this.ToOverLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ToSlowLane,this,this.ToSlowLane);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameOver, this, this.OnGameOver);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ChangeRoadLevel, this, this.ChangeRoadLevel);
      
    }   


    onUpdate(){
        if(this.mInMove)this.JudgeOver();
    }

    private ToOverLane(){
        this.mAccelTimer = 0;     
        this.mAccel = CarDataConfig.Instance().getCarDataByID(this.mCarID).accel*this.mRvehiclespeed;                  
    }

    private ToSlowLane(){
        this.mAccel = 0;
        this.mAccelTimer = 0;        
    }

    private ChangeRoadLevel(){
        this._roadLevel = RoadManager.Instance().GetRoadLevel();
        this._inAwardLevel = LevelDataConfig.Instance().getDataByLevel(this._roadLevel).leveltype==1;
        this.mRvehiclespeed = LevelDataConfig.Instance().getDataByLevel(this._roadLevel).rvehiclespeed;
        this.mOverGetCoin = LevelDataConfig.Instance().getDataByLevel(this._roadLevel).overtakecoin;

    }
    
    /**
     * 初始化几台车辆
     */
    private InitSlowLaneCar(){
        this.SetIntervalDis();
        if(this.mCarLists.length>0){
            for(let i = 0 ; i< this.mCarAmount ; i++){
                this.UpdateDis();                                
                this.mCarLists[i].GetCar().transform.localPositionZ = this.disZ;
            }
        }else{
            for(let i = 0 ; i < this.mCarAmount ; i++){
                this.UpdateDis();                
                let index = Math.floor(Math.random()*GameManager.CarAmount)
                this.CreateCar(index);
                if(i==this.mCarAmount-1){
                    this.mCarID = index;
                }
            }
        }
        this.mCurrentCarIndex = 0;
        this.SetSpeed();

    }

    private UpdateDis(){
        this.disZ += Utilit_wcjtn_.getRandomByRange(this.mRvehiclegenerateintervalMin,this.mRvehiclegenerateintervalMax);                  
    }

    private CreateCar(id:number):Laya.Sprite3D{
        let sp = Laya.Sprite3D.instantiate(Carport.Instance().GetCarByID(id),this.owner);
        sp.transform.localPositionZ = this.disZ;
        sp.transform.localPositionX = -1.2;
        let car:SlowLaneCar = sp.addComponent(SlowLaneCar);
        car.mCarID = id;
        //放入池中
        this.mCarLists.push(car);             
        this.mCarPool[id].push(car);
        return sp;
    }
    
    /**
     * 判断最后那辆车是否被超了
     */
    private JudgeOver(){
        if(this.mCarLists[this.mCurrentCarIndex].GetHeadstock().z-PlayerManager.Instance().GetPlayerCar().GetTailstock().z<2.75){

            if(this._hadRookie){
                PlayerManager.Instance().OnRookieTime();
            }

            Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.OverCar);
            this._overCarAmount++;
            //更新距离
            this.UpdateDis();
            GameManager.Instance().AddGetCoin(this.mOverGetCoin);
            let index = Math.floor(Math.random()*GameManager.CarAmount)
            if(index!=this.mCarLists[this.mCurrentCarIndex].mCarID){
                //换一辆车
                this.mCarLists[this.mCurrentCarIndex].Hide();
                let sp = this.GetCarInPool(index);
                this.mCarLists[this.mCurrentCarIndex] = sp.getComponent(SlowLaneCar);
                this.mCarLists[this.mCurrentCarIndex].Show();
            }
            this.mCarLists[this.mCurrentCarIndex].GetCar().transform.localPositionZ = this.disZ;
            this.mCurrentCarIndex++;
            if(this._overCarAmount==(User_wcjtn_.getOverRecord()-1)){
                ScoreCard.getInstance().show(this.mCarLists[this.mCurrentCarIndex].GetCar());
            }else if(this._overCarAmount==User_wcjtn_.getOverRecord()){
                ScoreCard.getInstance().hide();
                Camera.Instance().ShowOverScoreEff();
            }
            if(this.mCurrentCarIndex>=this.mCarAmount)this.mCurrentCarIndex = 0;
            //奖励关卡
            if(this._inAwardLevel)this.ShowCoin();
            //重置加速时间
            this.mAccelTimer = 0;
            this.mCarID = index;
            this.configRookie();
            
        }
    }
    /**
     * 从车池中拿到没有在用的车模型
     * @param index 车子ID
     */
    private GetCarInPool(index:number):Laya.Sprite3D{
        let car : Laya.Sprite3D = null;
        for(let i = 0 ; i<this.mCarPool[index].length ; i++){
            let sp:Laya.Sprite3D = this.mCarPool[index][i].owner as Laya.Sprite3D;
            if(!sp.active){
                car = sp;
                break;
            }
        }
        if(car == null){
            car = this.CreateCar(index);
        }
        return car;
    }

    private configRookie(){
        this._hadRookie = false;
        if(Math.random()>0.8 && !PlayerManager.Instance().GetOnRookie && !this._inAwardLevel){
            this.mCarLists[this.mCurrentCarIndex].GetRookie().show();
            this._hadRookie = true;
        }
    }

    private SetSpeed(){
        this.mMoveSpeed = 15+Math.random()*5;
    }

    private OnGameMenu(){
        this.mLane.transform.position = new Laya.Vector3(0,0,0);
        this.disZ=0;
        this.mAccel = 0;
        this.mAccelTimer = 0;
        this.SetIntervalDis();
        this.InitSlowLaneCar();
        this.mInMove = true; 
        this._roadLevel = RoadManager.Instance().GetRoadLevel();  
        this._overCarAmount = 0;
              
        this.mRvehiclespeed = LevelDataConfig.Instance().getDataByLevel(this._roadLevel).rvehiclespeed;
        this.mOverGetCoin = LevelDataConfig.Instance().getDataByLevel(this._roadLevel).overtakecoin;
        this._inAwardLevel = LevelDataConfig.Instance().getDataByLevel(this._roadLevel).leveltype==1;   
        console.log(this._inAwardLevel, "this._inAwardLevel");     
    }

    private OnGameRelive(){
        this.mInMove = true;
    }

    private SetIntervalDis(){
        console.log(this._roadLevel);
        this.mRvehiclegenerateintervalMax = LevelDataConfig.Instance().getDataByLevel(this._roadLevel).rvehiclegenerateintervalMax;
        this.mRvehiclegenerateintervalMin = LevelDataConfig.Instance().getDataByLevel(this._roadLevel).rvehiclegenerateintervalMin;
    }

    Move(){
        let time = Utilit_wcjtn_.safeDelta()/1000;
        this.mAccelTimer+= time;
        let speed = this.mMoveSpeed+this.mAccelTimer*this.mAccel;
        let speedMax = 1.3 * this.mMoveSpeed;
        speed = Math.min(speedMax, speed);        

        this.mLane.transform.translate(new Laya.Vector3(0,0,speed*time));
    }

    GetSlowLaneSpeed():number{
        return this.mMoveSpeed;
    }

    GetSafePos():Laya.Vector3{
        return new Laya.Vector3(this.mCarLists[this.mCurrentCarIndex].GetTailstock().x,
            this.mCarLists[this.mCurrentCarIndex].GetTailstock().y,
            this.mCarLists[this.mCurrentCarIndex].GetTailstock().z-1)
    }

    GetCarTail():Laya.Vector3{
        return this.mCarLists[this.mCurrentCarIndex].GetTailstock();
    }

    ShowCoin(){
        let dis = this.GetCarTail().z+3- PlayerManager.Instance().GetPlayerCar().GetHeadstock().z;
        let amount = Math.floor(dis/2.5); //1.5是每个金币的间隔
        for(let i = 0 ; i < amount ; i++){
            let coin = this.mCoinLists[i];
            if(coin == null){
                coin = Laya.Sprite3D.instantiate(this.mCoinPre,this.mCoinPanel).addComponent(Coin);
                this.mCoinLists.push(coin);
            }
            let pos = new Laya.Vector3(this.mLane.transform.position.x-1.2,this.mLane.transform.position.y+0.25,PlayerManager.Instance().GetPlayerCar().GetHeadstock().z+dis/amount*i);
            coin.Show(pos);          
        }
    }

    private OnGameOver(){
        this.mInMove = false;
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.RecoverCoin);
    
    }



    private GetOverCarAmount():number{
        return this._overCarAmount;
    }
}