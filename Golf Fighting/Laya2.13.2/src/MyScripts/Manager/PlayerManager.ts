import Player, { PlayerAniType } from "../Ctrl/Player";
import BallManager from "./BallManager";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import StageManager from "./StageManager";
import CameraCtrl, { CameraState } from "../Ctrl/CameraCtrl";
import ConstManager from "./ConstManager";
import PreManager, { PreType } from "./PreManager";
import Us_sdlyg_er from "../../User/User";
import Game_sdlyg_Mgr from "../../Mgr/GameMgr";
import PropManager, { PropType } from "./PropManager";
import GameManager from "./GameManager";
import Sound_sdlyg_Mgr, { SoundType } from "../../Mgr/SoundMgr";
import Ball from "../Ctrl/Ball";


export default class PlayerManager extends Laya.Script {

    private static _isntance:PlayerManager;
    public static Instance(){
        return this._isntance;
    }    

    private m_player:Player;
    private m_ballManager : BallManager;
    private inGame:boolean = false;    //是否在游戏中
    private m_current_stage_id:number =0;   //当前场地编号
    private current_pos:Laya.Vector3;       //当前所在场地位置
    private showWatiTime:number = 0;
    private menu_pos:Laya.Vector3 = new Laya.Vector3(0,0.133,-2.88); //在首页时候的位置
    private m_win_effect:Laya.Sprite3D;
    private m_club:Laya.Sprite3D;             //球杆
    private current_club_name:string = "normal";    //当前使用球杆的名字
    private current_people_name:string = "people2";
    private current_ball_name:string = "normal";   
    private isFirst:boolean = false;   
    private current_people_render:Laya.SkinnedMeshSprite3D;
    private could_beat:boolean = true;
    // private isShowBall:boolean = false;
    private record:boolean = false;     //记录时间开关
    private record_timer:number = 0;        //记录的时间
    private max_timer:number = 400;     //蓄到满力所需时间

    constructor() { super(); }

    onAwake(){
        PlayerManager._isntance = this;
        let play = this.owner.getChildByName("Player") as Laya.Sprite3D;
        this.m_player = play.addComponent(Player);
        this.m_club = play.getChildByName("club") as Laya.Sprite3D;
        this.m_ballManager = this.owner.getChildByName("BallManager").addComponent(BallManager);
        this.m_win_effect = this.owner.getChildByName("WinEffect") as Laya.Sprite3D;
        
        this.showWatiTime = ConstManager.cameraMoveTime;  
        this.max_timer = ConstManager.max_power_timer;

        this.addEvent();
        this.showInMenu();  
        for (let i = 0; i < this.m_club.numChildren; i++) {
            this.m_club.getChildAt(i).active = false;
        }
        let people_skin_amount = PropManager.getInstance().getPropBase(PropType.peopel).amount;
        for(let i = 0;i<people_skin_amount;i++){
            play.getChildByName("people"+i).active = false;
        }
        (play.getChildByName("guangquan") as Laya.Sprite3D).active = true;
    }

    onStart(){
        this.hideWinEffect();
        this.getPlayerSet();
        this.choosePeople(this.current_people_name);
        this.chooseClub(this.current_club_name);

    }


    onDestroy(){
        this.removeEvent();
    }

    onUpdate(){
        if(this.record)this.record_timer+=Laya.timer.delta;
    }
/**
 * 所有添加的监听的事件
 */
    addEvent(){
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.GameStart,this,this.onGameStart);
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ChooseProp,this,this.onChooseProp);
    }
/**
 * 移除所有的监听的事件
 */
    removeEvent(){
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.GameStart,this,this.onGameStart);
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ChooseProp,this,this.onChooseProp);
        
    }
/**
 * 监听到游戏开始的时候，需要做的事情
 */
    onGameStart(){
        this.inGame = true;
        this.m_ballManager.setBallAmount(GameManager.Instance().getGameBall());
        this.current_pos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
        this.showPlayer();
    }

/**
 * 监听到游戏结束的时候，需要做的事情
 */
    onGameOver(isWin:boolean){
        this.inGame = false;
        if(isWin){
            this.m_player.playAni(PlayerAniType.wudao);
            this.showWinEffect();
        }else{
            this.m_player.playAni(PlayerAniType.Dismay);
        }

    }

    onChooseProp(name:string){
        if(name.search("people")!=-1){
            this.choosePeople(name);
        }else if(name.search("club")!=-1){
            this.chooseClub(name);
        }else if(name.search("ball")!=-1){
            this.current_ball_name = name;
            // Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.ChangeBall,name);
            this.m_ballManager.changeSkin(name);
        }

    }

/**
 * 重置主角
 */
    resetPlayer(){   
        //========================恢复角色之前的皮肤设置
        let data = Us_sdlyg_er.getSkinConfig();
        this.choosePeople(data.people);
        this.chooseClub(data.club);    
        this.m_ballManager.changeSkin(data.ball);
        //=====================================
        this.m_ballManager.createBall(PreManager.CouldSetSkin);
        this.hideWinEffect();
        this.m_current_stage_id = 0;
        this.m_ballManager.RecoverAllBall();    //回收所有的球
        this.inGame = false;
        this.isFirst = GameManager.Instance().getFirst();
    }

/**
 * 展示主角
 */
    showPlayer(){
        if(!this.current_pos){
            this.current_pos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos()
        }
        this.m_player.showPlayerByPos(this.current_pos);
        this.m_player.playAni(PlayerAniType.Idle);
        this.m_ballManager.ShowBall();
    }

    showInMenu(){
        this.m_player.showPlayerByPos(this.menu_pos);
        this.m_player.playAni(PlayerAniType.Idle)
    }

    showWinEffect(){
        let pos = this.m_player.getTrans();
        this.m_win_effect.transform.position = new Laya.Vector3(pos.x,pos.y+2,pos.z);
        this.m_win_effect.active = true;
    }

    hideWinEffect(){
        if(this.m_win_effect)this.m_win_effect.active = false;        
    }


    // onStageMouseDown(){
    //     if(this.inGame && this.could_beat){ //&& this.could_beat){
    //         this.m_player.playAni(PlayerAniType.Idle);
    //         this.m_player.storgePower();
    //         // if(this.isShowBall){
    //         //     this.isShowBall = false;
    //         // }else{
    //         //     this.m_ballManager.ShowBall();
    //         // }
    //         //this.could_beat = false;
    //         this.record = true;
    //         this.record_timer = 0;
    //         this.could_beat = false;
    //     }   
    // }

    storgePower(){
        if(this.inGame && this.could_beat){ //&& this.could_beat){
            this.m_player.playAni(PlayerAniType.Idle);
            this.m_player.storgePower();
            // if(this.isShowBall){
            //     this.isShowBall = false;
            // }else{
            //     this.m_ballManager.ShowBall();
            // }
            //this.could_beat = false;
            this.record = true;
            this.record_timer = 0;
            this.could_beat = false;
        }  
    }

    desorbPower(){
        if(this.isFirst)Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.HideGuide);
        if(this.inGame && this.record){
            this.record=false;
            let ratio = Math.min(this.record_timer/this.max_timer,1);
            this.m_player.desorbPower(ratio);
            Laya.timer.once(60*ratio,this,()=>{
                this.m_ballManager.BeatBall(ratio);
                this.could_beat = true;
            })
        }
    }


    // onStageMouseUp(){
    //     if(this.isFirst)Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.HideGuide);
    //     if(this.inGame && this.record){
    //         this.record=false;
    //         let ratio = Math.min(this.record_timer/this.max_timer,1);
    //         this.m_player.desorbPower(ratio);
    //         Laya.timer.once(60*ratio,this,()=>{
    //             this.m_ballManager.BeatBall(ratio);
    //             this.could_beat = true;
    //         })
    //     }
    // }

/**
 * 更新主角所在位置
 */
    updatePos(hole_id:number){
        if(hole_id>=this.m_current_stage_id && this.inGame){
            //常规游戏时候
            this.m_ballManager.updatePos();
            this.m_current_stage_id++; 
            this.current_pos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();  
            CameraCtrl.Instance().SetState(CameraState.GetScore)
            Laya.timer.once(this.showWatiTime,this,this.showPlayer);
            Sound_sdlyg_Mgr.instance.playSound(SoundType.GetScore);

            //奖励关卡时候      每次更新位置会刷新球数，始终是3个
            if(GameManager.Instance().getIsAwardGame()){
                let num = GameManager.Instance().getGameBall();
                this.m_ballManager.setBallAmount(num);
            }
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.PlayerUpdatePos);
        }
    }

    getCurrentStageID():number{
        return this.m_current_stage_id;
    }

    chooseClub(name:string = "normal"){
        this.m_club.getChildByName(this.current_club_name).active = false;
        this.current_club_name = name;
        this.m_club.getChildByName(this.current_club_name).active = true;  

        let club = this.m_club.getChildByName(this.current_club_name) as Laya.MeshSprite3D;      
        
        //影子效果
        // if(name=="normal"){
        //     club.meshRenderer.castShadow = true;
        // }else{
        //     club._children.forEach(child => {
        //         console.log(child.name);
        //         child.meshRenderer.castShadow = true;
        //     });
        // }
        
    }

    choosePeople(name:string = "people2"){
        this.current_people_render = this.m_player.owner.getChildByName(this.current_people_name) as Laya.SkinnedMeshSprite3D;
        if(this.current_people_name!=name){
            this.current_people_render.active = false;
            this.current_people_name = name;
            this.current_people_render = this.m_player.owner.getChildByName(this.current_people_name) as Laya.SkinnedMeshSprite3D;
        }
        this.current_people_render.active = true; 
        // this.current_people_render.skinnedMeshRenderer.castShadow = true;        //影子
    }


    savePlayerSet(){
        Us_sdlyg_er.setSkin(this.current_people_name,this.current_club_name,this.current_ball_name);
        Game_sdlyg_Mgr.getInstance().saveGameData();
    }

    private getPlayerSet():any{
        let data = Us_sdlyg_er.getSkinConfig();
        this.current_people_name = data.people;
        this.current_club_name = data.club;
        this.current_ball_name = data.ball;
    }
    

    getPlayerPos():Laya.Vector3{
        return this.m_player.getTrans();
    }



}