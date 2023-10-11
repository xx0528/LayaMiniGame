import ViewBase from "../../View/ViewBase";
import GameManager from "../Manager/GameManager";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import CameraCtrl from "../Ctrl/CameraCtrl";
import StageManager from "../Manager/StageManager";
import ConstManager from "../Manager/ConstManager";
import PlayerManager from "../Manager/PlayerManager";
import Us_sdlyg_er from "../../User/User";
import GameHeadPic from "../Ctrl/GameHeadPic";
import AImanager from "../Manager/AIManager";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";
import WXAPI from "../../WXAPI";
import OPPOAPI from "../../OPPOAPI";
import GameSwitchConfig from "../../Config/GameSwitchConfig";
import NativeCallback from "../../NativeCallback";

export default class GameView extends ViewBase {

    private txt_ball_num: Laya.Text;
    private ball_num: Laya.Image;
    private ball_amount: number = 0;
    private guide: Laya.Image;
    private award_Level_Ball: Laya.Image;
    private key: Laya.Image;

    private owner_key: number = 0;
    private show_key: Laya.Image;
    private show_key_startY: number;
    private show_key_dis: number = 150;  //动画钥匙的位移
    private key_list: Laya.Sprite[] = new Array();

    private power: Laya.Image;      //力度条
    private power_bar: Laya.Image;
    private power_timer: number = 0;
    private power_right_bar: Laya.Image;
    private max_power_timer: number = 400;

    private m_camera: Laya.Camera;

    private m_current_stage_id = 0;
    private is_award: boolean = false;

    private bar_change: number = 0.02;

    private is_beat: boolean = false;

    private m_level: Laya.FontClip;
    private is_rank: boolean = false;
    private rank: Laya.Image;

    private play_head_pic: GameHeadPic;
    private ai_head_pic: GameHeadPic;

    private head_pic_show_timer:number = 1000;

    private btn_close:Laya.Button;
    
    private btn_getRightBar:Laya.Button;
    private could_show_right_bar:boolean = false;

    private clickArea:Laya.Box;

    private bottomLoopAD:Laya.Clip;


    constructor() { super(); }

    onAwake() {
        this.ball_num = this.owner.getChildByName("ballNum") as Laya.Image;
        this.txt_ball_num = this.ball_num.getChildByName("num") as Laya.Text;
        this.guide = this.owner.getChildByName("guide") as Laya.Image;
        this.award_Level_Ball = this.owner.getChildByName("award_Level_Ball") as Laya.Image;
        this.show_key = this.owner.getChildByName("addkey") as Laya.Image;
        this.power = this.owner.getChildByName("power") as Laya.Image;
        this.power_bar = this.power.getChildByName("bar") as Laya.Image;
        this.power_right_bar = this.power.getChildByName("right_bar") as Laya.Image;
        this.btn_close = this.owner.getChildByName("btn_close") as Laya.Button;
        this.btn_getRightBar = this.owner.getChildByName("btn_getRightBar") as Laya.Button;
        this.clickArea = this.owner.getChildByName("clickArea") as Laya.Box;
        this.bottomLoopAD = this.owner.getChildByName("LoopAD") as Laya.Clip;
        
        this.key = this.owner.getChildByName("key") as Laya.Image;
        for (let i = 0; i < 9; i++) {
            let k = this.key.getChildByName("key" + i).getChildByName("key") as Laya.Sprite;
            this.key_list.push(k);
            k.alpha = 0;
        }
        this.rank = this.owner.getChildByName("rank") as Laya.Image;
        this.play_head_pic = this.owner.getChildByName("play_head_pic").getComponent(GameHeadPic);
        this.ai_head_pic = this.owner.getChildByName("ai_head_pic").getComponent(GameHeadPic);

        this.max_power_timer = ConstManager.max_power_timer;
        this.rank.visible = false
        this.award_Level_Ball.visible = false;
        this.guide.visible = false;
        this.key.visible = false;
        this.show_key.alpha = 0;


        this.m_camera = CameraCtrl.Instance().GetCamera();

        if (GameManager.Instance().getFirst()) {
            this.guide.visible = true;
        }

        this.is_award = GameManager.Instance().getIsAwardGame();
        this.m_current_stage_id = PlayerManager.Instance().getCurrentStageID();
        this.m_level = this.owner.getChildByName("level") as Laya.FontClip;
        this.m_level.value = (Us_sdlyg_er.getLeveNum() + 1).toString();
        this.m_level.visible = !GameManager.Instance().getIsAwardGame();
        this.is_rank = GameManager.Instance().getIsRank();
    }

    onDestroy() {
        super.onDestroy();

        if (this.is_award) {
            if (this.owner_key == 8) this.owner_key = 9;
            GameManager.Instance().setOnerKeyNum(this.owner_key);
        }
    }

    addEvent() {
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.SubBall, this, this.subBall);
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.HideGuide, this, this.hideGuide);
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.PlayerUpdatePos, this, this.playerUpdatePos);
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ChangeGamingPic, this, this.changeHeadPic);
        this.btn_close.on(Laya.Event.CLICK,this,this.clickClose);
        this.btn_getRightBar.on(Laya.Event.CLICK,this,this.clickGetRightBar);
        this.clickArea.on(Laya.Event.MOUSE_DOWN,this,this.downClickArea);
        this.clickArea.on(Laya.Event.MOUSE_UP,this,this.upClickArea);

    }

    removeEvent() {
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ChangeGamingPic, this, this.changeHeadPic);
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.SubBall, this, this.subBall);
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.HideGuide, this, this.hideGuide);
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.PlayerUpdatePos, this, this.playerUpdatePos);
        this.clickArea.off(Laya.Event.MOUSE_DOWN,this,this.downClickArea);
        this.clickArea.off(Laya.Event.MOUSE_UP,this,this.upClickArea);
    }

    onStart() {
        if(GameManager.Instance().getHighView()){
            this.btn_close.top = 147
        }

        this.ball_amount = GameManager.Instance().getGameBall();
        if (this.ball_amount >= 100) this.txt_ball_num.visible = false;
        this.txt_ball_num.text = this.ball_amount.toString();
        this.show_key_startY = this.show_key.y;
        this.hideHeadPic();

        if (this.is_award) {
            //奖励关卡
            this.ball_num.visible = false;
            this.key.visible = true;
            this.showAwardBall();
        }

        if (this.is_rank) {
            this.ai_head_pic.setPic(this._data.aiPic);
            this.play_head_pic.setPic(this._data.playPic);
            this.ball_num.visible = false;
            this.m_level.visible = false;
            this.rank.visible = true;
            Laya.timer.once(this.head_pic_show_timer,this,()=>{
                this.changeHeadPic();
            })
        }
        this.btn_getRightBar.visible = false;

        this.setRightBar();

        this.upPowerBarPos();
        this.refreshPowerBar();   

        if(Laya.Browser.onMiniGame){

        }else if(Laya.Browser.onQGMiniGame){
            this.onQGGame();
        }
    }

    onUpdate() {
        if (this.power.visible && this.is_beat) {
            this.power_timer += Laya.timer.delta;
            let ratio = Math.min(this.power_timer / this.max_power_timer, 1);
            this.power_bar.scaleX = ratio;
        }
        if (this.power_right_bar.visible) {
            if (this.power_right_bar.alpha <= 0) {
                this.bar_change = 0.1
            } else if (this.power_right_bar.alpha >= 0.9) {
                this.bar_change -= 0.1
            }
            this.power_right_bar.alpha += this.bar_change;
        }
    }

    downClickArea(){
        PlayerManager.Instance().storgePower();
    }

    upClickArea(){
        PlayerManager.Instance().desorbPower();
    }

    onEnable() {
        super.onEnable();
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }

    onDisable() {
        super.onDisable();
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }

    onRewardVidewoFail() {
    }

    onRewardVidewoSuccess(reward :string) {
        this.btn_getRightBar.visible = false;
        this.could_show_right_bar = true;
        this.setRightBar(); 
    }
    
    clickGetRightBar(){
        let success = Laya.Handler.create(this,()=>{
            this.btn_getRightBar.visible = false;
            this.could_show_right_bar = true;
            this.setRightBar();
        })
        if (GameSwitchConfig.getInstance().openVideo != 1) {
            return;
        }

        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
        }
        else if(Laya.Browser.onMiniGame){
            WXAPI.showRewardedVideoAd((res)=>{
                if(res){
                    success.method();
                }else{
                    console.log("获得精准击打视频未完整观看");
                }
            },()=>{
                console.log("获得精准击打视频加载观看");
            })
        }else if(Laya.Browser.onQGMiniGame){
            OPPOAPI.showRewardedVideoAd((res)=>{
                if(res){
                    success.method();
                }else{
                    console.log("获得精准击打视频未完整观看");
                }
            },()=>{
                console.log("获得精准击打视频加载观看");
            }) 
        }


    }

    clickClose(){
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MoreGameView,true);                
    }

    subBall() {
        this.ball_amount--;
        this.txt_ball_num.text = this.ball_amount.toString();

        //奖励关卡的情况下
        if (this.award_Level_Ball.visible) {
            let b = this.award_Level_Ball.getChildByName("ball" + this.ball_amount) as Laya.Sprite;
            Laya.Tween.to(b, { alpha: 0 }, 300); //渐隐
        }
    }
    /**
     * 显示奖励关卡下的球的数量
     */
    showAwardBall() {
        for (let i = 0; i < 3; i++) {
            let b = this.award_Level_Ball.getChildByName("ball" + i) as Laya.Sprite;
            b.alpha = 1;
        }
        this.award_Level_Ball.visible = true;
    }

    playerUpdatePos() {
        this.m_current_stage_id++;
        //TODO  奖励模式
        if (this.is_award) {
            Laya.Tween.to(this.key_list[this.owner_key], { alpha: 1 }, 600);
            this.owner_key++;
            GameManager.Instance().setOnerKeyNum(this.owner_key);
            this.ball_amount = GameManager.Instance().getGameBall();
            this.showAwardBall();
        }
        if(this.is_rank){
            this.hideHeadPic();
            Laya.timer.once(this.head_pic_show_timer,this,()=>{
                this.changeHeadPic();
            })
        }
        this.upPowerBarPos();
        this.setRightBar();
    }

    hideGuide() {
        if (this.guide.visible) this.guide.visible = false;
    }

    setRightBar() {
        if ((Us_sdlyg_er.getLeveNum() >= 11 && this.m_current_stage_id >= 1 || this.is_rank) && !this.could_show_right_bar) {
            this.power_right_bar.visible = false;
            if(!this.is_rank)this.btn_getRightBar.visible = true;
        }else{
            this.power_right_bar.visible = true;
            let rat = Math.sqrt(6.3 * StageManager.Instance().getRightDis(this.m_current_stage_id)) / ConstManager.max_power_dis;
            this.power_right_bar.width = this.power_bar.width * rat;
        }

    }


    keyShow() {
        this.show_key.pos(this.show_key.x, this.show_key_startY);
        this.show_key.alpha = 1;
        Laya.Tween.to(this.show_key, { y: this.show_key_startY - this.show_key_dis, alpha: 0 }, 800);
    }

    changeHeadPic() {
        this.play_head_pic.show(PlayerManager.Instance().getPlayerPos());
        if (PlayerManager.Instance().getCurrentStageID() == AImanager.Instance().getCurrentStageID()) {
            this.ai_head_pic.show(AImanager.Instance().getAIPos());
        }else{
            this.ai_head_pic.hide();
        }
    }

    hideHeadPic() {
        this.play_head_pic.hide();
        this.ai_head_pic.hide();
    }


    // setPowerBar(){
    //     let outPos :Laya.Vector3 = new Laya.Vector3(0,0,0);
    //     this.m_camera.viewport.project(this.m_enemy.transform.position, this.m_camera.projectionViewMatrix, outPos);
    //     this.name.pos(outPos.x / Laya.stage.clientScaleX-150,outPos.y / Laya.stage.clientScaleY-150);
    // }
    refreshPowerBar() {
        this.is_beat = false;
        this.power_timer = 0;
        this.power_bar.scaleX = 0;
    }

    upPowerBarPos() {
        return;
        let outPos: Laya.Vector4 = new Laya.Vector4(0, 0, 0);
        let beatPos: Laya.Vector3 = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
        this.m_camera.viewport.project(beatPos, this.m_camera.projectionViewMatrix, outPos);
        this.power.pos(outPos.x / Laya.stage.clientScaleX - 180, outPos.y / Laya.stage.clientScaleY + 60);
    }

    onKeyDown(e: Laya.Event) {
        if (e.keyCode == 97) {
            this.changeHeadPic();
        } else if (e.keyCode = 99) {
            this.hideHeadPic();
        }
    }

    onStageMouseDown() {
        this.is_beat = true;
    }

    onStageMouseUp() {
        this.refreshPowerBar();
    }

    onMiniGame(){

    }

    onQGGame(){
        this.bottomLoopAD.visible = false;
        OPPOAPI.showBannaer();
    }

}

