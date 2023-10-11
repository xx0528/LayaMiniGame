import SceneManager from "../Manager/SceneManager";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import RoadManager from "../Manager/RoadManager";
import LevelDataConfig from "../Model/LevelConfig";

export default class SplashScreen extends Laya.Script {


    private _mOwner:Laya.Sprite3D;    
    private _followSp:Laya.Sprite3D;
    private _envirID:number = 0;
    constructor() { super(); }
    
    onAwake(){
        this._mOwner = this.owner as Laya.Sprite3D;
        this._followSp = SceneManager.Instance().GetChildByName("Camera").getChildByName("Main Camera") as Laya.Sprite3D;
        this._mOwner.active = false;
    }

    onEnable(){
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ChangeRoadLevel,this,this.OnChangeRoadLevel);
    }

    onUpdate(){
        if(this._mOwner.active){
            this._mOwner.transform.position = this._followSp.transform.position;
        }
    }

    onDestroy(){
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ChangeRoadLevel,this,this.OnChangeRoadLevel);
        
    }

    private OnChangeRoadLevel(){
        // if(this._envirID == LevelDataConfig.Instance().getDataByLevel(RoadManager.Instance().GetRoadLevel()).envType)return;
        this._envirID = LevelDataConfig.Instance().getDataByLevel(RoadManager.Instance().GetRoadLevel()).envType;
        
        this._mOwner.active = false;
        this._mOwner.active = true;
        Laya.timer.once(1000,this,()=>{
            this._mOwner.active =false;
        })
    }
    
}