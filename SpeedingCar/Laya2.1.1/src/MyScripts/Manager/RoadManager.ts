import SceneManager from "./SceneManager";
import Road from "../OBJ/Road";
import EnvirManager from "./EnvirManager";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import PlayerManager from "./PlayerManager";
import LevelDataConfig from "../Model/LevelConfig";
import Utilit_wcjtn_ from "../../Utilit";
import GameManager from "./GameManager";


export default class RoadManager extends Laya.Script {

    private static _instance:RoadManager;
    public static Instance():RoadManager{
        return this._instance;
    }
    private mRoadPre:Laya.Sprite3D;     //道路预制体
    private mRoadInterval:number = 49.15;   //道路间隔
    
    private mRoadPool:Laya.Sprite3D[] = new Array();    //道路对象池
    private mCurrentRoad:Laya.Sprite3D;
    private mRoadPosIndex:number = 0;
    private mRoadIndex:number = 0;

    private mCoinLists:Laya.Sprite3D[] = new Array();   //金币池

    private mCameraPos:Laya.Vector3;
    private mStartPole:Laya.Sprite3D;
    private mOverPole:Laya.Sprite3D;

    private mOverPosZ:number = 17;
    private mStartPosZ:number = 0;
    private mInGame:boolean = false;

    private mRoadLevel:number = 0;  //循环关卡道路等级
    private _tunnel:Laya.Sprite3D ; //隧道




    constructor() { super(); }

    onAwake(){
        RoadManager._instance = this;
        this.mRoadPre = this.owner.getChildByName("Road") as Laya.Sprite3D;
        this.mRoadPre.addComponent(Road);
        this.mCameraPos = SceneManager.Instance().GetChildByName("Camera").transform.position;
        this.mStartPole = this.owner.getChildByName("StartPole") as Laya.Sprite3D;
        this.mStartPole.active = false;
        this.mOverPole = this.owner.getChildByName("OverPole") as Laya.Sprite3D;
        this.mOverPole.active = false;
        this._tunnel = this.owner.getChildByName("tunnel") as Laya.Sprite3D;
        this._tunnel.active = false;

    }

    onEnable(){
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameMenu,this,this.OnGameMenu);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameStart,this,this.OnGameStart);
    }

    onDestroy(){
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameStart,this,this.OnGameStart);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameMenu,this,this.OnGameMenu);
        
    }

    onStart(){
        this.mRoadPool.push(this.mRoadPre);
        this.InitRoad(3);
        this.mCurrentRoad = this.mRoadPool[this.mRoadIndex];       
    }

    onUpdate(){
        if(this.mCurrentRoad){
            if(this.mCameraPos.z -this.mCurrentRoad.transform.position.z>50){
                this.ResetRoad();
            }
        }
        if(this.mInGame){         
            if(this.mOverPosZ<=PlayerManager.Instance().GetPlayerCar().GetTailstock().z){
                // this.mInGame = false;
                // GameManager.Instance().GameOver(true);
                this.SetChangeEnvPoint();
            }
        }
    }

    GetCompleteValue():number{
        let value = Math.max(0,1-(this.mOverPosZ-PlayerManager.Instance().GetPlayerCar().GetTailstock().z)/(this.mOverPosZ-this.mStartPole.transform.position.z));
        return value;

    }

    OnGameMenu(){
        this.mStartPole.active = false;
        this.mOverPole.active = false;
        this.mRoadPosIndex = -1;
        this.mRoadIndex = 0;
        for(let i = 0 ; i < this.mRoadPool.length; i++){
            this.SetRoadPos(this.mRoadPool[i]);
        }
        this.mRoadLevel = 0;
        this.mCurrentRoad = this.mRoadPool[this.mRoadIndex];    
        this.mInGame = false;    
    }

    OnGameStart(){
        this.mStartPole.active = true;
        let pos :Laya.Vector3 = PlayerManager.Instance().GetPlayerCar().GetCarPos();
        this.mStartPole.transform.position = new Laya.Vector3(this.mStartPole.transform.position.x,this.mStartPole.transform.position.y,pos.z+40);
        this._tunnel.active = true;
        this.mOverPosZ =20+ PlayerManager.Instance().GetPlayerCar().GetTailstock().z+LevelDataConfig.Instance().getDataByLevel(this.mRoadLevel).missiondistance;
        this._tunnel.transform.position = new Laya.Vector3(this._tunnel.transform.position.x,this._tunnel.transform.position.y,this.mOverPosZ);
        this.mInGame = true;
    }

    private SetChangeEnvPoint(){
        this.mRoadLevel++;
        if(this.mRoadLevel>=36)this.mRoadLevel=36;
        this.mOverPosZ =20+ PlayerManager.Instance().GetPlayerCar().GetTailstock().z+LevelDataConfig.Instance().getDataByLevel(this.mRoadLevel).missiondistance;
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.ChangeRoadLevel);

        Laya.timer.once(2000,this,()=>{
            this._tunnel.transform.position = new Laya.Vector3(this._tunnel.transform.position.x,this._tunnel.transform.position.y,this.mOverPosZ);        
        })
    }


    GetRoadLevel():number{
        return this.mRoadLevel;
    }


    GetOverPosZ():number{
        return this.mOverPosZ;
    }


    
    /**
     * 初始道路
     */
    private InitRoad(value:number){
        for(let i = 0 ; i < value ; i++){
            let road:Laya.Sprite3D = Laya.Sprite3D.instantiate(this.mRoadPre,this.owner);
            this.SetRoadPos(road);
            this.mRoadPool.push(road);
        }

    }

    /**
     * 设置道路位置
     */
    private SetRoadPos(road:Laya.Sprite3D){
        this.mRoadPosIndex++;
        road.transform.position =  new Laya.Vector3(0,0,this.mRoadInterval*this.mRoadPosIndex);
        EnvirManager.Instance().ShowEnvir(this.mRoadInterval*this.mRoadPosIndex);                
    }

    /**
     * 超出摄像机的道路重新设置位置 
     */

    private ResetRoad(){
        this.SetRoadPos(this.mCurrentRoad);
        this.mRoadIndex++;
        if(this.mRoadIndex>=this.mRoadPool.length)this.mRoadIndex=0;
        this.mCurrentRoad = this.mRoadPool[this.mRoadIndex];
    }





}