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


export default class AImanager extends Laya.Script {

    private static _instance:AImanager;
    public static Instance(){
        return this._instance;
    }
    private ai_player: Player;
    private inGame: boolean = false;    //是否在游戏中
    private m_current_stage_id: number = 0;   //当前场地编号
    private current_pos: Laya.Vector3;       //当前所在场地位置
    private showWatiTime: number = 0;
    private m_club: Laya.Sprite3D;             //球杆
    private current_club_name: string = "normal";    //当前使用球杆的名字
    private current_people_name: string = "people2";
    private current_people_render: Laya.SkinnedMeshSprite3D;
    private max_timer: number = ConstManager.max_power_timer;     //蓄到满力所需时间
    private current_hole_pos: Laya.Vector3;          //当前球洞位置

    private m_ball_list: Ball[] = new Array();
    private current_ball_id: number = 0;
    private current_ball_pos: Laya.Vector3;

    private m_owner: Laya.Sprite3D;

    private beat_wait_timer: number = 2000;  //每次击打球的间隔
    private m_level: number = 0;

    private beat_right_rat: number = 0;

    constructor() { super(); }

    onAwake() {
        AImanager._instance = this;
        this.m_owner = this.owner as Laya.Sprite3D;
        let play = this.owner.getChildByName("Player") as Laya.Sprite3D;
        this.ai_player = play.addComponent(Player);
        this.m_club = play.getChildByName("club") as Laya.Sprite3D;
        this.showWatiTime = ConstManager.cameraMoveTime;
        this.max_timer = ConstManager.max_power_timer;

        for (let i = 0; i < this.m_club.numChildren; i++) {
            this.m_club.getChildAt(i).active = false;
        }
        let people_skin_amount = PropManager.getInstance().getPropBase(PropType.peopel).amount;
        for (let i = 0; i < people_skin_amount; i++) {
            play.getChildByName("people" + i).active = false;
        }
        (play.getChildByName("guangquan") as Laya.Sprite3D).active = true;
        for (let i = 0; i < 2; i++) {
            let b: Ball = this.m_owner.getChildByName("ball" + i).addComponent(Ball);
            b.hide();
            b.setManager(this.m_owner);
            this.m_ball_list.push(b);
        }
        this.m_owner.active = false;
    }


    /**
     * 监听到游戏开始的时候，需要做的事情
     */
    onGameStart() {
        this.setAILevel()
        this.m_owner.active = false;
        this.inGame = true;
        this.m_current_stage_id = 0;
        // this.m_ballManager.setBallAmount(3);
        // this.m_ballManager.createBall(false,true); 
        this.current_pos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
        this.current_hole_pos = StageManager.Instance().GetStageById(this.m_current_stage_id).getHolePos();
        this.current_ball_pos = new Laya.Vector3(this.current_pos.x - 0.6, this.current_pos.y, this.current_pos.z);
        this.randomSkin();
        this.showPlayer();
    }

    /**
     * 监听到游戏结束的时候，需要做的事情
     */
    onGameOver(isWin: boolean = false) {
        if(this.inGame){
            Laya.timer.clearAll(this);
            this.inGame = false;
            if (isWin) {
                this.ai_player.playAni(PlayerAniType.wudao);
            } else {
                this.ai_player.playAni(PlayerAniType.Dismay);
            }
        }
    }

    hide(){
        this.m_owner.active = false;
    }

    /**
     * 重置主角
     */
    resetAIPlayer() {
        this.m_current_stage_id = 0;
        this.inGame = false;
        this.m_owner.active = false;
    }

    setAILevel() {
        let num = Math.max((Us_sdlyg_er.getRankLevel()+Math.floor(-3+Math.random()*6)),0)
        let level = Math.min(Math.floor(num/5),5);
        this.beat_right_rat = AIlevel["level"+level];
        console.log("ai进球命中率",this.beat_right_rat);
        // this.beat_right_rat = AIlevel.level5
    }

    /**
     * 展示角色
     */
    showPlayer() {
        Laya.timer.clearAll(this);
        this.m_owner.active = true;
        if (!this.current_pos) {
            this.current_pos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos()
        }
        let show_pos = new Laya.Vector3(this.current_pos.x - 0.6, this.current_pos.y, this.current_pos.z)
        this.ai_player.showPlayerByPos(show_pos);
        this.ai_player.playAni(PlayerAniType.Idle);
        Laya.timer.once(500, this, this.autoStart)
        
    }

    autoStart() {
        this.beatBall();
    }


    private beatBall() {
        let right_x_dis = StageManager.Instance().getRightDis(this.m_current_stage_id);
        this.m_ball_list[this.current_ball_id].show(this.current_ball_pos);
        let ratio = Math.sqrt(6.8 * StageManager.Instance().getRightDis(this.m_current_stage_id)) / ConstManager.max_power_dis;
        if (this.beat_right_rat <= Math.random()) {
            let bias = Math.random()>0.5? (0.1+(Math.random()*0.2)) : -(0.1+(Math.random()*0.2));
            ratio +=bias;
            ratio = Math.max(0.3, Math.min(1, ratio));
        }
        // ratio+=0.1;
        this.ai_player.storgePower();
        Laya.timer.once(ratio * this.max_timer, this, () => {
            this.ai_player.desorbPower(ratio);
            let x_power = 2.5 / (5.8 * ratio);
            this.m_ball_list[this.current_ball_id].beatBall(ratio, x_power);
            this.current_ball_id++;
            if (this.current_ball_id >= this.m_ball_list.length) this.current_ball_id = 0;
            Laya.timer.once(this.beat_wait_timer, this, this.beatBall);
        })

    }

    private randomSkin() {
        let people = "people" + Math.floor(Math.random() * 9);
        let club = "club" + Math.floor(Math.random() * 20);
        this.choosePeople(people);
        this.chooseClub(club);
    }


    /**
     * 更新主角所在位置
     */
    updatePos(hole_id: number) {
        let self = this;
        if (hole_id >= this.m_current_stage_id && this.inGame) {
            //常规游戏时候
            // this.m_ballManager.updatePos();
            this.m_current_stage_id++;
            this.current_pos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
            this.current_ball_pos = new Laya.Vector3(this.current_pos.x - 0.6, this.current_pos.y, this.current_pos.z);
            Laya.timer.once(800,self,()=>{
                self.showPlayer();
                Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.ChangeGamingPic);
                
            })
        }
    }

    getCurrentStageID():number{
        return this.m_current_stage_id;
    }

    private chooseClub(name: string = "normal") {
        this.m_club.getChildByName(this.current_club_name).active = false;
        this.current_club_name = name;
        this.m_club.getChildByName(this.current_club_name).active = true;

        let club = this.m_club.getChildByName(this.current_club_name) as Laya.MeshSprite3D;

    }

    private choosePeople(name: string = "people2") {
        this.current_people_render = this.ai_player.owner.getChildByName(this.current_people_name) as Laya.SkinnedMeshSprite3D;
        if (this.current_people_name != name) {
            this.current_people_render.active = false;
            this.current_people_name = name;
            this.current_people_render = this.ai_player.owner.getChildByName(this.current_people_name) as Laya.SkinnedMeshSprite3D;
        }
        this.current_people_render.active = true;
    }


    onKeyDown(e: Laya.Event) {
        if (e.keyCode == 98) {
            console.log("展示了AI");
            this.onGameStart();
        }
    }

    getAIPos():Laya.Vector3{
        return this.ai_player.getTrans(); 
    }
}

export enum AIlevel {
    level0 = 0.3,
    level1 = 0.4,
    level2 = 0.5,
    level3 = 0.6,
    level4 = 0.7,
    level5 = 0.8,
}