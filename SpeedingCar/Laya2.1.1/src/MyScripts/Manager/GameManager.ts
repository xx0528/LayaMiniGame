import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import MultiplePassOutlineMaterial from "../Shader/MultiplePassOutlineMaterial";
import View_wcjtn_Mgr, { View_wcjtn_Def } from "../../Mgr/ViewMgr";
import LevelDataConfig from "../Model/LevelConfig";
import User_wcjtn_ from "../../User/User";
import Game_wcjtn_Mgr from "../../Mgr/GameMgr";
import Vibrate_wcjtn_Mgr from "../../Mgr/VibrateMgr";
import Sound_wcjtn_Mgr, { Sound_wcjtn_Type } from "../../Mgr/SoundMgr";
import SceneManager from "./SceneManager";
import { EnvirType } from "./EnvirManager";
import RoadManager from "./RoadManager";
import WX_wcjtn_API from "../../WXAPI";


export default class GameManager extends Laya.Script {


    private static _instance:GameManager;
    public static Instance(){
        return this._instance;
    }

    public static SoundSwitch:boolean = true;
    public static readonly CarAmount:number = 6;    //车的总数量
    private getCoinAmountByGame:number = 0;

    private _gameResults:boolean = false;

    private offMatLists:MultiplePassOutlineMaterial[] = new Array();
    
    public get GameResults() : boolean {
        return this._gameResults;
    }

    private mOffSet:number = 1;
    public static FirstGame = true;
    public static mCarID = 0;


    constructor() { super(); }

    onAwake(){
        GameManager._instance = this;
    }


    onStart(){
        View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.MyMainView);
        // Laya.timer.once(500,this,this.GameMenu);
        console.log(LevelDataConfig.Instance().getLevelAmount());
        Sound_wcjtn_Mgr.ins_wcjtn_tance.play_wcjtn_BGM(Sound_wcjtn_Type.Bgm);        
    }


    GameMenu() {
        //随机改变轨道偏移方向
        // // this.ChangeOffDir();
        // this.mOffSet = (Math.random()*2-1);
        // this.ChangeOffDir();
        
        //随机环境状态
        SceneManager.Instance().ConfigEnv(EnvirType.DesertDayTime);
    
        //首页状态
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.OnGameMenu);
        //摄像机，玩家车辆，道路在最开始的位置

        //所有车子正常往前面开
    }

    GameStart() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.OnGameStart);
        this.getCoinAmountByGame = 0;
        this._gameResults = false;
        View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.GameView);
        GameManager.FirstGame = false;
    }

    /**
     * 游戏结束
     * @param res 游戏结果
     */
    GameOver(res:boolean) {
        //游戏结果
        this._gameResults = res;
        //增加金币
        if(res)this.getCoinAmountByGame+=LevelDataConfig.Instance().getDataByLevel(RoadManager.Instance().GetRoadLevel()).levelcoin;
        //短震动
        Vibrate_wcjtn_Mgr.vibrate_wcjtn_Short();
        User_wcjtn_.add_wcjtn_Money(this.getCoinAmountByGame);
        //存档
        Game_wcjtn_Mgr.get_wcjtn_Instance().save_wcjtn_Game_wcjtn_Data();
        //游戏结束
        //摄像机拉远，停止玩家操作，
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.OnGameOver);
        GameManager.mCarID = User_wcjtn_.getCarID();
        
    }

    GameRestart() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.OnGameMenu);
    }

    GameRelive() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.OnGameRelive);
    }


    SetOffMaterial(mesh:Laya.MeshSprite3D){
        // return;
        // var customMaterial = new MultiplePassOutlineMaterial();
        // customMaterial.albedoTexture = (mesh.meshRenderer.material['albedoTexture']);
        // mesh.meshRenderer.sharedMaterial = customMaterial;
        // // this.offMatLists.push(customMaterial);
        // mesh.meshRenderer.receiveShadow = true;
        // mesh.meshRenderer.castShadow = true;
    }

    ChangeOffDir(){
        this.offMatLists.forEach(mat => {
            mat.offsetDir(this.mOffSet);
        });
    }

    ToExportView(){
        View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.Export2View);
    }

    AddGetCoin(num:number){
        this.getCoinAmountByGame+=num;
        Sound_wcjtn_Mgr.ins_wcjtn_tance.play_wcjtn_Sound(Sound_wcjtn_Type.GetCoin);
    }

    /**
     * 得到当前关卡获得金币的总量
     */
    GetCoinAmount():number{
        return this.getCoinAmountByGame;
    }

    /**
     * 打开结束导出界面
     */
    OpenOverView(){
        if(this._gameResults){
            //游戏胜利
            console.log("游戏胜利");
            User_wcjtn_.set_wcjtn_LeveNum(User_wcjtn_.get_wcjtn_LeveNum()+1);
            Game_wcjtn_Mgr.get_wcjtn_Instance().save_wcjtn_Game_wcjtn_Data();            
            View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.GameWinView);
        }else{
            //游戏失败
            console.log("游戏失败");
            View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.GameFailView);            
        }
        // let onSucess = ()=>{
        //     User_wcjtn_.add_wcjtn_Money(100);
        // }

        // let complete = ()=>{
        //     Game_wcjtn_Mgr.get_wcjtn_Instance().save_wcjtn_Game_wcjtn_Data();            
        //     View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.GameWinView);
        // }

        // WX_wcjtn_API.tryShowWXCrazyClick("100",complete,onSucess,complete);
        // Game_wcjtn_Mgr.get_wcjtn_Instance().save_wcjtn_Game_wcjtn_Data();            
        // View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.GameWinView);
    }

}