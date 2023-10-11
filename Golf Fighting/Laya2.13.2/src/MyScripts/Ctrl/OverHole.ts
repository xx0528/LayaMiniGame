import Hole from "./Hole";
import Ball from "./Ball";
import GameManager from "../Manager/GameManager";
import VibrateMgr from "../../Mgr/VibrateMgr";
import PlayerManager from "../Manager/PlayerManager";
import AImanager from "../Manager/AIManager";


export default class OverHole extends Hole {

    private m_box:Laya.Sprite3D;
    private couldOver:boolean = true;
    
    constructor() { super(); }

    onAwake(){
        super.onAwake();
        this.m_box = this.owner.parent.getChildByName("Box") as Laya.Sprite3D;
    }
    onStart(){
        super.onStart();
        this.m_box.active = !this.isAwardGame && !GameManager.Instance().getIsRank();

        
    }

    
    onCollisionEnter(collision: Laya.Collision){
        if(!this.couldOver)return;
        if(collision.other.owner.name == "Ball" || collision.other.owner.name == "aBall"){
            this.couldOver = false;
            let ball:Ball = collision.other.owner.getComponent(Ball);
            ball.hide();
            let manager = ball.getManager();
            if(manager.name == "PlayerManager"){
                this.getScore_effect.active = true;          
                VibrateMgr.vibrateShort();
                this.m_key.active = false;
                console.log("游戏结束");
                GameManager.Instance().gameOver();
                AImanager.Instance().onGameOver(false);
                //胜利了
            }
        }else if(collision.other.owner.name == "ball0" || collision.other.owner.name == "ball1"){
            this.couldOver = false;            
            console.log("对手进球了");
            let ball:Ball = collision.other.owner.getComponent(Ball);
            ball.hide();            
            GameManager.Instance().gameOver(false);
            AImanager.Instance().onGameOver(true);
        }
    }
}