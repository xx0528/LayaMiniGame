import SceneManager from "./SceneManager";
import Ball from "../Ctrl/Ball";
import Stage from "../Ctrl/Stage";
import BallManager from "./BallManager";
import ConstManager from "./ConstManager";
import StageManager from "./StageManager";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import Player from "../Ctrl/Player";
import CameraCtrl, { CameraState } from "../Ctrl/CameraCtrl";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";
import MenuView from "../View/MenuView";
import PlayerManager from "./PlayerManager";
import PropManager from "./PropManager";
import Sound_sdlyg_Mgr, { SoundType } from "../../Mgr/SoundMgr";
import Us_sdlyg_er from "../../User/User";
import Game_sdlyg_Mgr from "../../Mgr/GameMgr";
import AImanager from "./AIManager";
import WudianMgr from "../../Mgr/WudianMgr";
import { OverViewType } from "../View/OverView";

export default class GameManager extends Laya.Script {

    private static _instance: GameManager;
    public static Instance() {
        return this._instance;
    }

    private m_owner: Laya.Sprite3D;
    private _stage_Max: number = 8;
    private _stage_Min: number = 4;
    private _stage_current_amount = 0;


    private inGame: boolean = false;
    private current_game_ball_amount: number = 0;

    private isFirst: boolean = true;

    private level_config_json: JSON;

    private gameTimer: number = 0;       //玩的游戏局数
    private owner_key: number = 1;

    private user_avatarUrl: string = null;

    private is_rank_game: boolean = false;

    public static is_first_add_ball:boolean = true;


    constructor() { super(); }

    onAwake() {
        GameManager._instance = this;
        this.m_owner = this.owner as Laya.Sprite3D;
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MenuView);
        this.level_config_json = Game_sdlyg_Mgr.getInstance().getLevelJson();
    }

    onStart() {
        // this.SetLevelByJson();

        StageManager.Instance().SetStage(this.RandomLevel());

        SceneManager.Instance().setAwardScene();

        
    }
    

    /**
     * 根据json生成关卡
     */

    SetLevelByJson() {

        let data: any = this.level_config_json[Us_sdlyg_er.getLeveNum()];
        let res = this.RandomLevel(data.amount);
        StageManager.Instance().SetStage(res, () => {
            PlayerManager.Instance().resetPlayer();
        }, data.barrier_id_list, data.barrier_type_list);
    }


    /**
    * 随机生成关卡
    */
    RandomLevel(amount?: number): string[] {
        let res: string[] = new Array();
        if (!amount) amount = this._stage_Min + Math.floor(Math.random() * (this._stage_Max - this._stage_Min));
        this._stage_current_amount = amount;
        this.current_game_ball_amount = amount * 3;
        if (Us_sdlyg_er.getLeveNum() == 0) {
            this.current_game_ball_amount = 100;
        }
        for (let i = 0; i < amount; i++) {
            let stage_random: number = Math.floor(ConstManager.stagePre_Amount * Math.random()) + 1;
            let name: string = "Stage" + stage_random;
            res.push(name);
        }
        if (this.gameTimer == 3) this.current_game_ball_amount = 3;       //奖励关卡下
        if (this.is_rank_game) this.current_game_ball_amount = 1000;    //排外赛
        return res;
    }

    normalStart(){
        if(WudianMgr.WudianFlag){
            this.openClickGetPrize(Laya.Handler.create(this,()=>{
                this.refreshStage();
            }));
        }else{
            this.refreshStage();            
        }

    }

    rankStart(ai_path:string){
        if(WudianMgr.WudianFlag){
            this.openClickGetPrize(Laya.Handler.create(this,()=>{
                this.rankGameStart(ai_path);
            }))
        }else{
            this.rankGameStart(ai_path);            
        }

    }

    /**
     * 更换新的场地
     */

    refreshStage() {
        let self = this;
        this.is_rank_game = false;
        Game_sdlyg_Mgr.getInstance().saveGameData();
        StageManager.Instance().DestroyStage();     //销毁场地
        if (Us_sdlyg_er.getLeveNum() < 10 && this.gameTimer != 3) {
            //有关卡配置的模式
            this.SetLevelByJson();
        } else if (this.gameTimer == 3 && !this.is_rank_game) {
            //奖励关卡
            StageManager.Instance().SetStage(this.RandomLevel(9), () => {
                PlayerManager.Instance().resetPlayer();
            });
        } else {
            //没有关卡配置的模式下采用纯随机
            StageManager.Instance().SetStage(this.RandomLevel(), () => {
                PlayerManager.Instance().resetPlayer();
            });       //重新配置场地 
        }
        SceneManager.Instance().randomEnv();        //随机环境      
        Laya.timer.once(850,this,this.gameStart);
    }

/**
 * 真正的游戏开始
 */
    gameStart() {
        let complete = Laya.Handler.create(this,()=>{
            this.inGame = true;
            this.getIsAwardGame() ? this.owner_key = 0 : this.owner_key = 1;
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.GameView);
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.GameStart);
            CameraCtrl.Instance().SetState(CameraState.GameStart);
        });
        if(Us_sdlyg_er.ownerPropAll()){
            complete.method();
        }else{
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.TrySkinView,complete);            
        }
    }

    rankGameStart(ai_path: string) {
        let complete = Laya.Handler.create(this,()=>{
            this.is_rank_game = true;
            let data = {
                aiPic: ai_path,
                playPic: this.user_avatarUrl
            }
            StageManager.Instance().DestroyStage();     //销毁场地        
            StageManager.Instance().SetStage(this.RandomLevel(), () => {
                PlayerManager.Instance().resetPlayer();
            });
            SceneManager.Instance().randomEnv();        //随机环境       
            Laya.timer.once(850, this, () => {
                this.inGame = true;
                View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.GameView, data);
                Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.GameStart);
                CameraCtrl.Instance().SetState(CameraState.GameStart);
                AImanager.Instance().onGameStart();
            })
        })
        if(Us_sdlyg_er.ownerPropAll()){
            complete.method();
        }else{
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.TrySkinView,complete);            
        }
    }

    openClickGetPrize(method:Laya.Handler){
        let data : any = {};
        //狂点逻辑完成后的回调方法
        data.Complete = function(){
            console.log("狂点按钮结束");//在这里写入狂点窗口结束后需要调用的逻辑，例如弹出结算页面
            method.method();
            Us_sdlyg_er.addMoney(50);        //金币翻的倍数
            Sound_sdlyg_Mgr.instance.playSound(SoundType.GetCoin); 
        }
        // 完成点击之后获得的奖励数量，依照各项目不同自行实现
        data.PrizeCount = 50;
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.ClickGetPrize,data);
    }

    couldRelive() {
        this.inGame = false;
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.GameView);
        PlayerManager.Instance().onGameOver(false);
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.ReliveView);
    }

    gameOver(isWin: boolean = true) {
        if (this.isFirst) this.isFirst = false;
        if (!this.inGame && isWin) return;     //确保不会多次调用
        this.inGame = false;
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.GameView);
        PlayerManager.Instance().onGameOver(isWin);
        CameraCtrl.Instance().SetState(CameraState.GameOver);
        Laya.timer.once(2000, this, () => {         //给游戏结束一个展示时间
            if(isWin){
                View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.OverView,OverViewType.WinGame);            
            }else{
                View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.OverView,OverViewType.LoseGame);                                
            }
        })
        if (isWin) {
            if (this.gameTimer != 3 && !this.is_rank_game) Us_sdlyg_er.addLevelNum();
            Sound_sdlyg_Mgr.instance.playSound(SoundType.Win);
        } else {
            Sound_sdlyg_Mgr.instance.playSound(SoundType.Lose);
        }
        if (!this.is_rank_game) this.gameTimer++;
        if (this.gameTimer > 3) this.gameTimer = 0;
    }

    gameRelive() {
        this.current_game_ball_amount = 3;
        this.inGame = true;
        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.GameStart);
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.GameView);
    }

    getInGame(): boolean {
        return this.inGame;
    }
    /**
     * 得当当前游戏球数总数量   
     */
    getGameBall(): number {
        return this.current_game_ball_amount;
    }

    getHighView():boolean{
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        return (aspectRatio<0.5);
    }


    onKeyDown(e: Laya.Event) {
        console.log(e.keyCode);
        if (e.keyCode == 80) {
            this.refreshStage();
        } else if (e.keyCode == 101) {
            this.gameStart();
        } else if (e.keyCode == 104) {
            CameraCtrl.Instance().SetState(CameraState.GameStart);
        }
    }

    getFirst(): boolean {
        return this.isFirst;
    }

    getIsAwardGame(): boolean {
        return (this.gameTimer == 3 && !this.is_rank_game);
    }

    getOnerKeyNum(): number {
        return this.owner_key;
    }

    setOnerKeyNum(num: number) {
        this.owner_key = num;
    }

    getCurrentStageAmount(): number {
        return this._stage_current_amount;
    }

    getUserAvatarUrl(): string {
        return this.user_avatarUrl;
    }

    saveUserAvatarUrl(path: string) {
        this.user_avatarUrl = path;
    }

    getIsRank(): boolean {
        return this.is_rank_game;
    }


}