import PlayerManager from "../Manager/PlayerManager";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";

export default class Rookie extends Laya.Script {

    private static _instance:Rookie;
    public static getInstance():Rookie{
        return this._instance;
    }
    private _rookie:Laya.Sprite3D;

    private _model:Laya.Sprite3D;
    private _getOff:number = 4;
    private _inOver:boolean = false;
    private _inOff:boolean =false;

    private _startX:number = 0;
    private _outPosition:Laya.Vector3;
    private _rot:Laya.Vector3 = new Laya.Vector3(0,0.05,0);
    constructor() { super(); }
    
    onAwake(){
        Rookie._instance = this;
        this._rookie = this.owner as Laya.Sprite3D;
        this._model = this._rookie.getChildByName("model") as Laya.Sprite3D;
        this._startX = this._model.transform.position.x;
        this._outPosition = new Laya.Vector3(this._startX,this._model.transform.position.y,this._model.transform.position.z);
        this.hide();
    }


    onUpdate(){
        if(this._rookie.active){
            this._model.transform.rotate(this._rot);
            if(this._model.transform.position.z-PlayerManager.Instance().GetPlayerCar().GetHeadstock().z<0.5){
                let pos = new Laya.Vector3(PlayerManager.Instance().GetPlayerCar().GetHeadstock().x,
                this._model.transform.position.y,
                this._model.transform.position.z);
                Laya.Vector3.lerp(this._model.transform.position,pos,0.1,this._outPosition);
            }else{
                let pos = new Laya.Vector3(this._startX,
                this._model.transform.position.y,
                this._model.transform.position.z);
                Laya.Vector3.lerp(this._model.transform.position,pos,0.1,this._outPosition);
            }
            this._model.transform.position = this._outPosition;
            
        }
    }



    show(){
        this._inOff = false;
        this._model.transform.localPositionX = -0.8;
        this._rookie.active = true;
    }

    hide(){
        this._rookie.active = false;
    }

}