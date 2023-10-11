import Main_wcjtn_View_wcjtn_Template from "../TemplateViews/Main/MainViewTemplate";
import GameManager from "../../MyScripts/Manager/GameManager";
import Camera from "../../MyScripts/OBJ/Camera";
import Utilit_wcjtn_ from "../../Utilit";
import User_wcjtn_ from "../../User/User";
import PlayerManager from "../../MyScripts/Manager/PlayerManager";
import CarDataConfig from "../../MyScripts/Model/CarConfig";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import Circular_wcjtn_ProcessBar from "../CircularProcessBar";
import WX_wcjtn_API from "../../WXAPI";
import NativeCallback from "../../NativeCallback";
import Sound_wcjtn_Mgr, { Sound_wcjtn_Type } from "../../Mgr/SoundMgr";

export default class MyMainView extends Main_wcjtn_View_wcjtn_Template {
    /** @prop {name:btnSound, tips:"音乐开关按钮", type:Node, default:1000}*/
    public btnSound: Laya.Clip;
    /** @prop {name:btnSkin, tips:"皮肤开关", type:Node, default:1000}*/
    public btnSkin: Laya.Clip;
    /** @prop {name:skinZone, tips:"选择皮肤界面", type:Node, default:1000}*/
    public skinZone: Laya.Clip;
    /** @prop {name:skinCoinNum, tips:"皮肤界面金币数量", type:Node, default:1000}*/
    public skinCoinNum: Laya.FontClip;
    /** @prop {name:btnBackInSkin, tips:"皮肤界面返回按钮", type:Node, default:1000}*/
    public btnBackInSkin: Laya.Clip;
    /** @prop {name:btnLeftSkin, tips:"往左边选择皮肤按钮", type:Node, default:1000}*/
    public btnLeftSkin: Laya.Button;
    /** @prop {name:btnRightSkin, tips:"往右边选择皮肤按钮", type:Node, default:1000}*/
    public btnRightSkin: Laya.Button;
    /** @prop {name:btnChooseSkin, tips:"选择汽车皮肤", type:Node, default:1000}*/
    public btnChooseSkin: Laya.Button;
    /** @prop {name:btnUnlockSkin, tips:"解锁皮肤按钮", type:Node, default:1000}*/
    public btnUnlockSkin: Laya.Button;
    /** @prop {name:btnTry, tips:"试用皮肤按钮", type:Node, default:1000}*/
    public btnTry: Laya.Button;
    /** @prop {name:skinUnlockNum, tips:"解锁皮肤所需金币", type:Node, default:1000}*/
    public skinUnlockNum: Laya.FontClip;
    /** @prop {name:carAccelBar, tips:"汽车加速属性条", type:Node, default:1000}*/
    public carAccelBar: Laya.Image;
    /** @prop {name:guide, tips:"指引", type:Node, default:1000}*/
    /** @prop {name:overCarRecord, tips:"超车记录", type:Node, default:1000}*/
    public overCarRecord: Laya.FontClip;
    public guide: Laya.Image;
    private carID: number = 0;
    private maxAccel: number = 0;
    private maxBarWidth: number = 0;
    constructor() { super(); }


    onStart() {
        super.onStart();
        this.maxAccel = CarDataConfig.Instance().getCarDataByID(GameManager.CarAmount - 1).accel;
        this.maxBarWidth = this.carAccelBar.width;
        this.carID = User_wcjtn_.getCarID();
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_wcjtn_.is_wcjtn_IphoneX()) {
                this.skinZone.top = this.skinZone.top + 75;
            }
        }
        else {
            this.skinZone.top = this.skinZone.top - 200;
            if (Utilit_wcjtn_.is_wcjtn_IphoneX()) {
                this.skinZone.top = this.skinZone.top + 75;
            }
        }
        //配置声音开关
        this.btnSound.gray = !GameManager.SoundSwitch;
        this.skinZone.visible = false;
        this.setCoinNum();
        GameManager.Instance().GameMenu();
        if (!GameManager.FirstGame) Camera.Instance().ToSlowLane();
        this.guide.visible = false;

        let record = User_wcjtn_.getOverRecord();
        console.log("最高纪录应该是",record);
        if (record) {
            this.overCarRecord.value = record.toString();
        }
        if (GameManager.FirstGame) {
            this.guide.visible = true;
            this.Top_wcjtn_Zone.visible = false;
            this._center_wcjtn_Zone.visible = false;
            this._krq_wcjtn_Main._wcjtn_hide_wcjtn_();
        } else {
            //金币足够主动展示皮肤界面
            let id = User_wcjtn_.getEnoughCoinCarID();
            if (id >= 0) {
                this.carID = id;
                this.onSkinBtn();
            }


        }


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
        if (NativeCallback.NowVideoType == "tryskin") {
            this.add_wcjtn_Event();
            NativeCallback.NowVideoType = "";
        }
    }

    onRewardVidewoSuccess() {
        if (NativeCallback.NowVideoType == "tryskin") {
            this.add_wcjtn_Event();
            GameManager.mCarID = this.carID;
            this.showChooseBtn();
            NativeCallback.NowVideoType = "";
        }
    }


    add_wcjtn_Event() {
        super.add_wcjtn_Event();
        this.btnSound.on(Laya.Event.CLICK, this, this.onSoundBtn);
        this.btnSkin.on(Laya.Event.CLICK, this, this.onSkinBtn);
        this.btnBackInSkin.on(Laya.Event.CLICK, this, this.onBackMenuInSkinBtn);
        this.btnLeftSkin.on(Laya.Event.CLICK, this, this.onLeftSkinBtn);
        this.btnRightSkin.on(Laya.Event.CLICK, this, this.onRightSkinBtn);
        this.btnChooseSkin.on(Laya.Event.CLICK, this, this.onChooseSkinBtn);
        this.btnUnlockSkin.on(Laya.Event.CLICK, this, this.onUnlockSkinBtn);
        this.btnTry.on(Laya.Event.CLICK, this, this.onTrySkinBtn);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change, this, this.setCoinNum);
    }

    remove_wcjtn_Event() {
        super.remove_wcjtn_Event();
        this.btnSound.off(Laya.Event.CLICK, this, this.onSoundBtn);
        this.btnSkin.off(Laya.Event.CLICK, this, this.onSkinBtn);
        this.btnBackInSkin.off(Laya.Event.CLICK, this, this.onBackMenuInSkinBtn);
        this.btnLeftSkin.off(Laya.Event.CLICK, this, this.onLeftSkinBtn);
        this.btnRightSkin.off(Laya.Event.CLICK, this, this.onRightSkinBtn);
        this.btnChooseSkin.off(Laya.Event.CLICK, this, this.onChooseSkinBtn);
        this.btnUnlockSkin.off(Laya.Event.CLICK, this, this.onUnlockSkinBtn);
        this.btnTry.off(Laya.Event.CLICK, this, this.onTrySkinBtn);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change, this, this.setCoinNum);

    }

    private showChooseBtn() {

        let price = CarDataConfig.Instance().getCarDataByID(this.carID).price;
        this.carAccelBar.width = this.maxBarWidth * CarDataConfig.Instance().getCarDataByID(this.carID).accel / this.maxAccel;
        this.skinUnlockNum.value = price.toString();

        if (User_wcjtn_.hadCarByID(this.carID)) {
            this.btnChooseSkin.visible = true;
            this.btnUnlockSkin.visible = false;
            this.btnTry.visible = false;
        } else {
            this.btnChooseSkin.visible = false;
            this.btnUnlockSkin.visible = true;
            if (User_wcjtn_.get_wcjtn_Money() >= CarDataConfig.Instance().getCarDataByID(this.carID).price) {
                this.btnUnlockSkin.visible = true;
                this.btnTry.visible = false;

            } else {
                this.btnUnlockSkin.visible = false;
                this.btnTry.visible = true;
            }
        }
    }

    private setCoinNum() {
        this._money_wcjtn_Num.value = String(User_wcjtn_.get_wcjtn_Money());
        this.skinCoinNum.value = String(User_wcjtn_.get_wcjtn_Money());
    }

    private onSoundBtn() {
        GameManager.SoundSwitch = !GameManager.SoundSwitch;
        this.btnSound.gray = !GameManager.SoundSwitch;
        Sound_wcjtn_Mgr.ins_wcjtn_tance._wcjtn_Enabled_wcjtn_ = GameManager.SoundSwitch;
        if (GameManager.SoundSwitch) Sound_wcjtn_Mgr.ins_wcjtn_tance.play_wcjtn_BGM(Sound_wcjtn_Type.Bgm);
    }

    private onSkinBtn() {
        PlayerManager.Instance().ChooseCarByID(this.carID);
        Camera.Instance().ToSkin();
        this._center_wcjtn_Zone.visible = false;
        this.skinZone.visible = true;
        this.showChooseBtn();
    }

    private onTrySkinBtn() {
        Laya.timer.clearAll(this);
        this.remove_wcjtn_Event();
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
            NativeCallback.NowVideoType = "tryskin";
            Laya.SoundManager.muted = true;
        }
        else {
            this.add_wcjtn_Event();
            GameManager.mCarID = this.carID;
            this.showChooseBtn();
        }
    }

    private onBackMenuInSkinBtn() {
        this.carID = GameManager.mCarID;
        this.skinZone.visible = false;
        Laya.timer.once(500, this, () => {
            this._center_wcjtn_Zone.visible = true;
        })
        Camera.Instance().ToMenu();
        PlayerManager.Instance().ChooseCarByID(GameManager.mCarID);
    }

    private onRightSkinBtn() {
        this.carID++;
        if (this.carID >= GameManager.CarAmount) this.carID = 0;
        PlayerManager.Instance().ChooseCarByID(this.carID);
        this.showChooseBtn();
    }

    private onLeftSkinBtn() {
        this.carID--;
        if (this.carID < 0) this.carID = GameManager.CarAmount - 1;
        PlayerManager.Instance().ChooseCarByID(this.carID);
        this.showChooseBtn();
    }

    onStageClick() {
        if (GameManager.FirstGame) {
            this.on_wcjtn_Start_wcjtn_Btn();
        }
    }

    private onChooseSkinBtn() {
        GameManager.mCarID = this.carID;
        User_wcjtn_.setCarID(this.carID);
        this.onBackMenuInSkinBtn();
    }

    private onUnlockSkinBtn() {
        User_wcjtn_.unlockSkin(this.carID);
        this.showChooseBtn();
    }

    /**
     * 开始按钮
     */
    on_wcjtn_Start_wcjtn_Btn() {
        this.close_wcjtn_View();

        let success = ()=>{
            User_wcjtn_.add_wcjtn_Money(100);
        }

        let complete = ()=>{
            GameManager.Instance().GameStart();
        }

        WX_wcjtn_API.tryShowWXCrazyClick("100",complete,success,complete);
    }

}