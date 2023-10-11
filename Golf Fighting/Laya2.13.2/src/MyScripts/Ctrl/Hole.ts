import Ball from "./Ball";
import CameraCtrl from "./CameraCtrl";
import BallManager from "../Manager/BallManager";
import PlayerManager from "../Manager/PlayerManager";
import VibrateMgr from "../../Mgr/VibrateMgr";
import GameManager from "../Manager/GameManager";
import AIManager from "../Manager/AIManager";
import AImanager from "../Manager/AIManager";


export default class Hole extends Laya.Script3D {

    protected m_flag:Laya.Sprite3D;
    protected getScore_effect : Laya.Sprite3D;
    protected m_id:number;
    protected m_key:Laya.Sprite3D;
    protected isAwardGame:boolean = false;
    constructor() { super(); }

    onAwake(){
        this.m_flag = this.owner as Laya.Sprite3D;
        this.getScore_effect = this.m_flag.getChildByName("jinqiu") as Laya.Sprite3D;
        this.m_key = this.owner.parent.getChildByName("Key") as Laya.Sprite3D;
        this.m_key.active = false;
        this.getScore_effect.active = false; 
        this.isAwardGame = GameManager.Instance().getIsAwardGame();
    }

    onStart(){
        this.m_key.active = this.isAwardGame;
        
    }
    
    setId(id:number){
        this.m_id = id;
    }


    onCollisionEnter(collision: Laya.Collision){
        if(collision.other.owner.name == "Ball" || collision.other.owner.name == "aBall" ){
            let ball:Ball = collision.other.owner.getComponent(Ball);
            ball.hide();
            let manager = ball.getManager();
            if(manager.name == "PlayerManager"){
                this.getScore_effect.active = true;
                PlayerManager.Instance().updatePos(this.m_id);
                this.m_key.active = false;
                VibrateMgr.vibrateShort();
            }  
        }else if(collision.other.owner.name == "ball0" || collision.other.owner.name == "ball1"){
            let ball:Ball = collision.other.owner.getComponent(Ball);     
            ball.hide();       
            let manager = ball.getManager().getComponent(AImanager);
            manager.updatePos(this.m_id);
        }

    }

    getPos():Laya.Vector3{
        return this.m_flag.transform.position;
    }
}