import Ball from "../Ctrl/Ball";
import PreManager, { PreType } from "./PreManager";
import StageManager from "./StageManager";
import ConstManager from "./ConstManager";
import Stage from "../Ctrl/Stage";
import CameraCtrl from "../Ctrl/CameraCtrl";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import Player from "../Ctrl/Player";
import GameManager from "./GameManager";
import PlayerManager from "./PlayerManager";
import Us_sdlyg_er from "../../User/User";

    export default class BallManager extends Laya.Script {
        private _amount:number = ConstManager.ball_Amount;
        private _ballList:Ball[] = new Array();
        private _aBallList:Ball[] = new Array();
 
        private m_owner:Laya.Sprite3D;
        private m_player:PlayerManager;
        private _current_ball_id:number = 0;
        private game_ball_amount:number = 0;        //当局游戏球的总量
        private could_create:boolean = true;        //控制只会在最开始的时候创建一次 or  当球类皮肤加载完毕创建一次   不至于重复创建

        private m_current_showPos:Laya.Vector3;
        private m_current_stage_id:number = 0;
        private beat_effect:Laya.Sprite3D;

        private could_beat:boolean = true;


        constructor() { 
            super()
        }

        onAwake(){
            this._amount = ConstManager.ball_Amount;
            this.m_owner= this.owner as Laya.Sprite3D;
            this.m_player = this.m_owner.parent.getComponent(PlayerManager);
            this.beat_effect = this.m_owner.getChildByName("daji") as Laya.Sprite3D;
            this.beat_effect.active = false;
        }

        onStart(){
            this.createBall();

        }

        
        updatePos(){
            this.m_current_stage_id++;            
            this.m_current_showPos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
        }

        BeatBall(ratio:number){
            if(this.beat_effect.active)this.beat_effect.active = false;
            if(this.game_ball_amount<=0)return;
            if(!this.could_beat)return;
            this.could_beat = false;            
            this.game_ball_amount--;
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.SubBall);
            if(this.game_ball_amount==0){   //最后一球打出后  1.5s判断游戏是否已经结束了，没有视为失败了
                if(GameManager.Instance().getIsAwardGame()){
                    Laya.timer.once(2000,this,()=>{
                        if(GameManager.Instance().getInGame()){
                            GameManager.Instance().gameOver(GameManager.Instance().getOnerKeyNum()>0);
                        }
                    })

                }else{
                    Laya.timer.once(2000,this,()=>{
                        if(GameManager.Instance().getInGame()){
                            GameManager.Instance().couldRelive();
                        }
                    })
                }
            }
            this.beat_effect.transform.position = this.m_current_showPos;
            this.beat_effect.active = true;
            this._ballList[this._current_ball_id].beatBall(ratio);
            this._current_ball_id++;
            Laya.timer.once(250,this,()=>{
                this.ShowBall();            
            })
            // Laya.timer.once(400,this,()=>{
            //     this.could_beat = true;
            // })
            // this.ShowBall();
        }
/**
 * 从对象池中展示出一个球，没有空置的就创建一个
 */
        // ShowBall(pos:Laya.Vector3,complete?:laya.utils.Handler){
        //     if(this.game_ball_amount==1)console.log("最后一个球");
        //     if(this.game_ball_amount<=0)return;
        //     this._current_ball = null;
        //     for(let i = 0; i < this._ballList.length; i++){
        //         if(!this._ballList[i].getActive()){
        //             this._current_ball = this._ballList[i];
        //             break;
        //         }
        //     }
        //     if(this._current_ball==null){
        //         let ball:Ball;
        //         if(PreManager.CouldSetSkin){
        //            ball = PreManager.createPre(PreType.aBall,this.m_owner).addComponent(Ball)
        //         }else{
        //            ball = PreManager.createPre(PreType.Ball,this.m_owner).addComponent(Ball)                    
        //         }
        //         this._ballList.push(ball);
        //         this._current_ball = ball;
        //     }
        //     this._current_ball.show(pos);   
        //     if(complete)complete.method();
        // }

/**
 *另一种方式使用球
 */
        ShowBall(){          
            this.could_beat = true;
            if(this._current_ball_id>=this._amount)this._current_ball_id=0;                
            this._ballList[this._current_ball_id].show(this.m_current_showPos);   
        }

        createBall(ballSkinComplete:boolean = false){
            if(ballSkinComplete && this.could_create){
                this.m_current_showPos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();            
                this._ballList.forEach(ball => {
                    ball.ballDestroy();
                });
                this._ballList = [];
                for(let i = 0; i<this._amount;i++){
                    let ball:Ball;
                    ball = PreManager.createPre(PreType.aBall,this.m_owner).addComponent(Ball);                    
                    this._ballList.push(ball);
                    ball.setID(i);
                    ball.setManager(this.owner.parent as Laya.Sprite3D);
                }
                this.could_create = false;
                this.changeSkin(Us_sdlyg_er.getSkinConfig().ball)
            }else if(this._ballList.length<=0){
                this.m_current_showPos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();                            
                for(let i = 0; i<this._amount;i++){
                    console.log("创建了球");
                    let ball:Ball;
                    ball = PreManager.createPre(PreType.Ball,this.m_owner).addComponent(Ball);                    
                    this._ballList.push(ball);
                    ball.setID(i);     
                    ball.setManager(this.owner.parent as Laya.Sprite3D);                                  
                }
                this.changeSkin(Us_sdlyg_er.getSkinConfig().ball)
                
            }
            this.ShowBall();            
        }


        changeSkin(name:string){
            this._ballList.forEach(ball => {
                ball.setSkin(name);
            });
        }


        setBallAmount(num:number){
            Laya.timer.clearAll(this);
            this.game_ball_amount = num;
        }


/**
 * 回收所有的球
 */
        RecoverAllBall(){
            if(this._ballList.length>0){
                this._ballList.forEach(ball => {
                    ball.hide();
                });
            }
            this.m_current_stage_id = 0;
            this.m_current_showPos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();            
        }

    }