import Camera from "../OBJ/Camera";
import RoadManager from "./RoadManager";
import Car from "../OBJ/Car";
import PlayerManager from "./PlayerManager";
import AiCar from "../OBJ/AiCar";
import HorizonPlane from "../OBJ/HorizonPlane";
import Carport from "../OBJ/Carport";
import GameManager from "./GameManager";
import SlowLaneCarManager from "./SlowLaneCarManager";
import OverLaneCarManager from "./OverLaneCarManager";
import MultiplePassOutlineMaterial from "../Shader/MultiplePassOutlineMaterial";
import EnvirManager, { EnvirType } from "./EnvirManager";
import OverCarEffect from "../OBJ/OverCarEffect";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import SplashScreen from "../OBJ/SplashScreen";
import LevelDataConfig from "../Model/LevelConfig";
import ScoreCard from "../OBJ/ScoreCard";

export default class SceneManager extends Laya.Script {


    private mScene: Laya.Scene3D;
    private static _instance: SceneManager;
    public static Instance(): SceneManager {
        return this._instance;
    }

    private _directionLight:Laya.DirectionLight;

    private _envirType:EnvirType= EnvirType.DesertDayTime; 
    private _envirID:number = 0;

    constructor() { super(); }

    onAwake() {
        SceneManager._instance = this;
        this.mScene = this.owner as Laya.Scene3D;
        MultiplePassOutlineMaterial.initShader();

    }

    onEnable(){
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ChangeRoadLevel,this,this.OnChangeRoadLevel);
    }

    onDestroy(){
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ChangeRoadLevel,this,this.OnChangeRoadLevel);
        
    }

    onStart() {
        this.GetChildByName("GameManager").addComponent(GameManager);
        this.GetChildByName("Camera").addComponent(Camera);
        this.GetChildByName("RoadManager").addComponent(RoadManager);
        this.GetChildByName("PlayerManager").addComponent(PlayerManager);
        // this.GetChildByName("aicar").addComponent(AiCar);
        this.GetChildByName("HorizonPlane").addComponent(HorizonPlane);
        this.GetChildByName("Carport").addComponent(Carport);
        this.GetChildByName("SlowLaneCarManager").addComponent(SlowLaneCarManager);
        this.GetChildByName("OverLaneCarManager").addComponent(OverLaneCarManager);
        this.GetChildByName("EnvirManager").addComponent(EnvirManager);
        this.GetChildByName("OverCarEffect").addComponent(OverCarEffect);
        this.GetChildByName("splashScreen").addComponent(SplashScreen);
        this.GetChildByName("scoreCard").addComponent(ScoreCard);

        this._directionLight = this.mScene.getChildByName("Directional Light") as Laya.DirectionLight;
        this._directionLight.shadow = true;
        this._directionLight.shadowDistance = 100;
        this._directionLight.shadowResolution = 2048;
        this._directionLight.shadowPSSMCount = 1;
        this._directionLight.shadowPCFType = 3;
        // Laya.timer.loop(1000*5,this,()=>{
        //     // MultiplePassOutlineMaterial.OffSetDir()
        // })
    }

    onUpdate(){
        // this._directionLight.transform.localRotationEulerY+=0.2;
        // console.log(this._directionLight.transform.localRotationEulerY)
    }


    GetChildByName(name: string): Laya.Sprite3D {
        let sp = this.mScene.getChildByName(name) as Laya.Sprite3D;
        return sp;
    }

    /**
     * 随机环境
     */
    ConfigEnv(res:number){
        // if(res==this._envirID)return;
        this._envirID = res;
        this._directionLight.transform.localRotationEulerY -= 180;
        switch (res) {
            case 0:
                this._envirType = EnvirType.DesertDayTime;
                //沙漠白天
                this._directionLight.color = new Laya.Vector3(1,1,1);
                this.mScene.skyRenderer.material["tintColor"] = new Laya.Vector4(0.5,0.5,0.5,0.5);
                break;
            case 1:
                this._envirType = EnvirType.DesertNight;
            
                //沙漠夜晚
                this._directionLight.color = new Laya.Vector3(188/255,199/255,255/255);
                this.mScene.skyRenderer.material["tintColor"] = new Laya.Vector4(150/255,45/255,45/255,0.5);
                break;
            case 2:
                this._envirType = EnvirType.CityDayTime;
            
                //都市白天
                this._directionLight.color = new Laya.Vector3(1,1,1);
                this.mScene.skyRenderer.material["tintColor"] = new Laya.Vector4(0.5,0.5,0.5,0.5);
                break;
            case 3:
                this._envirType = EnvirType.CityNight;
            
                //都市夜晚
                this._directionLight.color = new Laya.Vector3(188/255,199/255,255/255);
                this.mScene.skyRenderer.material["tintColor"] = new Laya.Vector4(150/255,45/255,45/255,0.5);
                break;
        }
        EnvirManager.Instance().SetEnvir(this._envirType);
        HorizonPlane.Instance().SetPlaneMat(this._envirType);
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.ChangeEnv,this._envirType);                      
    }

    public get GetEnvType():EnvirType{
        return this._envirType;
    }

    OnChangeRoadLevel(){
        Laya.timer.once(500,this,()=>{
            SceneManager.Instance().ConfigEnv(LevelDataConfig.Instance().getDataByLevel(RoadManager.Instance().GetRoadLevel()).envType);
        })
    }

}


