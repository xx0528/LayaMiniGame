import ViewBase from "../../View/ViewBase";
import GameManager from "../Manager/GameManager";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import User_wcjtn_ from "../../User/User";
import RoadManager from "../Manager/RoadManager";
import LevelDataConfig from "../Model/LevelConfig";
import SlowLaneCarManager from "../Manager/SlowLaneCarManager";
import PlayerManager from "../Manager/PlayerManager";
import ReliveBtn from "../../View/MyViews/UIobject/ReliveBtn";
import WX_wcjtn_API from "../../WXAPI";
import Game_wcjtn_Mgr from "../../Mgr/GameMgr";
import RecordBorad from "./uiOBJ/RecordBorad";
import NativeCallback from "../../NativeCallback";
import Sound_wcjtn_Mgr, { Sound_wcjtn_Type } from "../../Mgr/SoundMgr";

export default class GameView extends ViewBase {

    /** @prop {name:moneyNum, tips:"拥有的金币数量", type:Node, default:1000}*/
    public moneyNum: Laya.FontClip;
    /** @prop {name:remark, tips:"游戏结束描述", type:Node, default:1000}*/
    public remark: Laya.Image;
    /** @prop {name:winRemark, tips:"游戏胜利描述", type:Node, default:1000}*/
    public winRemark: Laya.Image;
    /** @prop {name:loseRemark, tips:"游戏失败描述", type:Node, default:1000}*/
    public loseRemark: Laya.Image;
    /** @prop {name:loseByFuel, tips:"没油了描述", type:Node, default:1000}*/
    public loseByFuel: Laya.Image;
    /** @prop {name:getCoin, tips:"当前关卡获取的金币", type:Node, default:1000}*/
    public getCoin: Laya.FontClip;
    /** @prop {name:completeCar, tips:"进度条上的小车", type:Node, default:1000}*/
    public completeCar: Laya.Sprite;
    /** @prop {name:mFuelTank, tips:"油箱", type:Node, default:1000}*/
    public mFuelTank: Laya.Image;
    /** @prop {name:reliveBtn, tips:"复活按钮", type:Node, default:1000}*/
    public reliveBtn: Laya.Button;
    /** @prop {name:overNum, tips:"超车数量", type:Node, default:1000}*/
    public overNum: Laya.FontClip;

    /** @prop {name:giveUpBtn, tips:"放弃按钮", type:Node, default:1000}*/
    public giveUpBtn: Laya.Button;

    private fuelHeight: number = 0;
    private fuelTimer: number = 32000;
    private mGetCoinAmountByGame = 0;
    private mCoinAmount: number = 0;
    private mReliveBtn: ReliveBtn;

    private mReliveTimeAmount: number = 0;
    private _overCarAmount: number = 0;

    private _recordBorad:RecordBorad;

    constructor() { super(); }

    onAwake() {
        super.onAwake();
        this.Init();

    }

    onStart() {
        super.onStart();
        this.fuelHeight = this.mFuelTank.height;
        // let fuelRatio = 600;
        // // if (LevelDataConfig.Instance().getDataByLevel().leveltype == 1) fuelRatio = 1500;
        this.RefreshFuelTank();
        this.mReliveTimeAmount = this.mReliveBtn.GetTimerAmount();
        this.overNum.value = this._overCarAmount.toString();
        this.giveUpBtn.visible = false;
    }

    onUpdate() {
        this.RefreshCoinAmount();
        // this.UpdateCar();
    }

    add_wcjtn_Event() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.ShowResults, this, this.OnGameOver);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OverCar, this, this.RefreshFuelTank);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.OverCar, this, this.OverCar);
        this.reliveBtn.on(Laya.Event.CLICK, this, this.ClickReliveBtn);
        this.giveUpBtn.on(Laya.Event.CLICK,this,this.ClickGiveUpBtn);
    }

    remove_wcjtn_Event() {
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.ShowResults, this, this.OnGameOver);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OverCar, this, this.RefreshFuelTank);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.OverCar, this, this.OverCar);

        this.reliveBtn.off(Laya.Event.CLICK, this, this.ClickReliveBtn);
        this.giveUpBtn.off(Laya.Event.CLICK,this,this.ClickGiveUpBtn);
        

    }

    private Init() {
        this.mCoinAmount = User_wcjtn_.get_wcjtn_Money();
        this.moneyNum.value = this.mCoinAmount.toString();
        this.remark.visible = false;
        this.winRemark.visible = false;
        this.loseByFuel.visible = false;
        this.loseRemark.visible = false;
        this.getCoin.scale(0, 0);
        this.mReliveBtn = this.reliveBtn.getComponent(ReliveBtn);
        this._recordBorad = this.owner.getChildByName("newRecord").getComponent(RecordBorad);
    }

    onEnable() {
        super.onEnable();
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    }

    onDisable() {
        super.onDisable();
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    }
    
    onRewardVidewoFail() {
        if (NativeCallback.NowVideoType == "relive") {
            GameManager.Instance().OpenOverView();
            this.close_wcjtn_View();
            NativeCallback.NowVideoType = "";
        }
    }

    onRewardVidewoSuccess() {
        if (NativeCallback.NowVideoType == "relive") {
            GameManager.Instance().GameRelive();
            this.mReliveBtn.Hide();
            NativeCallback.NowVideoType = "";
        }
    }


    OnGameOver() {
        Laya.Tween.clearAll(this.mFuelTank);
        this.remark.scale(0, 0);
        this.remark.visible = true;
        this.getCoin.value = "+" + GameManager.Instance().GetCoinAmount();


        if(this._overCarAmount>User_wcjtn_.getOverRecord() || User_wcjtn_.getOverRecord()==null){
            //刷新了记录
            this.RefreshRecord();
            this._recordBorad.Show(this._overCarAmount, GameManager.Instance().GetCoinAmount());
        }else{
            if (!this.loseByFuel.visible) {
                this.winRemark.visible = GameManager.Instance().GameResults;
                this.loseRemark.visible = !GameManager.Instance().GameResults;
            }
            Laya.Tween.to(this.remark, { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.backOut, Laya.Handler.create(this, () => {
                this.OverAwardShow();
            }));
        }

    }

        /**
     * 刷新纪录
     */
    private RefreshRecord(){            
        User_wcjtn_.setOverRecord(this._overCarAmount);
        Game_wcjtn_Mgr.get_wcjtn_Instance().save_wcjtn_Game_wcjtn_Data();
    }

    private ClickGiveUpBtn(){
        Laya.timer.clearAll(this);
        GameManager.Instance().OpenOverView();
        this.close_wcjtn_View();
    }

    private OnGameRelive() {
        Laya.timer.clearAll(this);
        this.RefreshFuelTank();
        this.remark.visible = false;
        this.winRemark.visible = false;
        this.loseByFuel.visible = false;
        this.loseRemark.visible = false;
        this.getCoin.scale(0, 0);

    }

    private RefreshCoinAmount() {
        if (this.mGetCoinAmountByGame < GameManager.Instance().GetCoinAmount()) {
            this.mGetCoinAmountByGame++;
            this.mCoinAmount++;
            this.moneyNum.value = this.mCoinAmount.toString();
        }
    }

    private OverAwardShow() {
        //TODO金币获取动画效果   总时间在500ms完成   完成后关闭界面，打开导出界面
        if (GameManager.Instance().GameResults) {
            this.getCoin.scale(1, 1);
        }
        Laya.timer.once(2000,this,()=>{
            this.giveUpBtn.visible = true;
        })
        Laya.timer.once(500, this, () => {
            if (GameManager.Instance().GameResults) {
                //游戏胜利
                GameManager.Instance().OpenOverView();
                this.close_wcjtn_View();
            } else {
                //游戏失败
                this.mReliveBtn.Show();
                Laya.timer.once((this.mReliveTimeAmount + 2) * 1000, this, () => {
                    GameManager.Instance().OpenOverView();
                    this.close_wcjtn_View();
                })
                Laya.Tween.to(this.getCoin, { scaleX: 1, scaleY: 1 }, 1000, Laya.Ease.backOut);
                // Laya.timer.once(this.mReliveTimeAmount * 1000, this, () => {
                //     Laya.Tween.to(this.getCoin, { scaleX: 1, scaleY: 1 }, 1000, Laya.Ease.backOut);
                // })
            }

        })
    }

    UpdateCar() {
        let value = Math.min(266, (266 - this.completeCar.width / 2) * (RoadManager.Instance().GetCompleteValue()));
        this.completeCar.x = value;
    }

    close_wcjtn_View() {
        super.close_wcjtn_View();
        Laya.Tween.clearAll(this.mFuelTank);
    }

    private RefreshFuelTank() {
        Laya.Tween.clearAll(this.mFuelTank);
        Laya.Tween.to(this.mFuelTank, { height: this.fuelHeight }, 300, Laya.Ease.quadOut, Laya.Handler.create(this, () => {
            Laya.Tween.to(this.mFuelTank, { height: 0 }, this.fuelTimer, null, Laya.Handler.create(this, () => {
                PlayerManager.Instance().NoFuel();
                this.loseByFuel.visible = true;
                GameManager.Instance().GameOver(false);
            }))
        }))
    }

    private OverCar() {
        this._overCarAmount++;
        this.overNum.value = this._overCarAmount.toString();
        this.fuelTimer -= 150;
        this.fuelTimer = Math.max(8000,this.fuelTimer);
        // console.log(this.fuelTimer);
    }

    private ClickReliveBtn() {
        Laya.timer.clearAll(this);
        this.mReliveBtn.Hide();
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
            NativeCallback.NowVideoType = "relive";
            Laya.SoundManager.muted = true;
        }
        else {
            GameManager.Instance().GameRelive();
            this.mReliveBtn.Hide();
        }
    }


}