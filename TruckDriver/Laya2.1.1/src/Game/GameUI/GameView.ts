import InGameViewTemplate from "../../View/TemplateViews/InGame/InGameViewTemplate";
import Game from "../Game";
import WXAPI_ from "../../WXAPI";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import User_ppxhc from "../../User/User";
import Utilit_ from "../../Utilit";
import NativeCallback from "../../NativeCallback";

export default class GameView extends InGameViewTemplate {
    private levelNum: Laya.FontClip;
    private robmoneyBox: Laya.Box;
    private robmoneyBtn: Laya.Image;
    private noRobmoneyBtn: Laya.Image;

    private changeCarBox: Laya.Box;
    private changeCarRtBtn: Laya.Image;
    private noChangeCarBtn: Laya.Image;

    public onAwake(): void {
        super.onAwake();
        this.levelNum = Utilit_.FindChild(this.owner, "CenterZone/LevelInfo/LevelNum") as Laya.FontClip
        this.robmoneyBox = this.owner.getChildByName("Robmoney") as Laya.Box;
        this.robmoneyBtn = this.robmoneyBox.getChildByName("btn_robmoney") as Laya.Image;
        this.robmoneyBtn.on(Laya.Event.CLICK, this, this.ClickRobMoney, [true]);
        this.noRobmoneyBtn = this.robmoneyBox.getChildByName("btn_refuse") as Laya.Image;
        this.noRobmoneyBtn.on(Laya.Event.CLICK, this, this.ClickRobMoney, [false])

        this.changeCarBox = this.owner.getChildByName("ChangeCarBox") as Laya.Box;
        this.changeCarRtBtn = this.changeCarBox.getChildByName("btn_changecarRt") as Laya.Image;
        this.noChangeCarBtn = this.changeCarBox.getChildByName("btn_refuse") as Laya.Image;
        this.changeCarRtBtn.on(Laya.Event.CLICK, this, this.OnClickChangeCar, [true]);
        this.noChangeCarBtn.on(Laya.Event.CLICK, this, this.OnClickChangeCar, [false]);
    }

    onShow(): void {
        super.onShow();
        this.robmoneyBox.visible = false;
        this.changeCarBox.visible = false;
        this.levelNum.value = User_ppxhc.get_ppxhc_LeveNum().toString();
    }

    onEnable(): void {
        super.addEvent();
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.Game_RobmoneyStart, this, this.OnGameRobmoney);
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.Game_RobmoneyEnd, this, this.OnRobmoneyEnd);
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.Car_ChangeTipStart, this, this.OnChangeCarStart);
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.Car_ChangeTipEnd, this, this.OnChangeCarEnd);

        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }

    onDisable(): void {
        super.removeEvent();
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.Game_RobmoneyStart, this, this.OnGameRobmoney);
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.Game_RobmoneyEnd, this, this.OnRobmoneyEnd);
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.Car_ChangeTipStart, this, this.OnChangeCarStart);
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.Car_ChangeTipEnd, this, this.OnChangeCarEnd);
        
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }

    OnGameRobmoney(): void {
        this.robmoneyBox.visible = true;
        this.robmoneyBtn.mouseEnabled = true;
        this.noRobmoneyBtn.mouseEnabled = true;
        Game.Control.StartRobmoney();
    }

    ClickRobMoney(flag: boolean)  {
        if (flag == false) {
            Game.Control.EndRobmoney(false);
            return;
        }

        this.robmoneyBtn.mouseEnabled = false;
        let self = this;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
            NativeCallback.NowVideoType = "RobMoney";
            Laya.SoundManager.muted = true;
            return;
        }
        else {
            this.robmoneyBtn.mouseEnabled = true;
            this.robmoneyBox.visible = false;
            Game.Control.EndRobmoney(true);
        }

        // WXAPI_.showRewardedVideoAd_((completed) => {
        //     this.robmoneyBtn.mouseEnabled = true;
        //     this.robmoneyBox.visible = false;
        //     Game.Control.EndRobmoney(completed);
        //     if (completed == false) {
        //         return;
        //     }
        // }, () => {
        //     this.robmoneyBtn.mouseEnabled = true;
        //     this.robmoneyBox.visible = false;
        //     Game.Control.EndRobmoney(false);
        // })
    }

    OnRobmoneyEnd(): void {
        this.robmoneyBox.visible = false;
    }

    OnChangeCarStart(): void {
        this.changeCarBox.visible = true;
    }

    OnChangeCarEnd(): void {
        this.changeCarBox.visible = false;
        this.changeCarRtBtn.mouseEnabled = true;
        this.noChangeCarBtn.mouseEnabled = true;
    }

    protected onRewardVidewoFail() {
        if (NativeCallback.NowVideoType == "ChangeCar") {
            this.changeCarRtBtn.mouseEnabled = true;
            this.changeCarBox.visible = false;
            Game.Control.EndChangeCar(false);
        }
        else {
            this.robmoneyBtn.mouseEnabled = true;
            this.robmoneyBox.visible = false;
            Game.Control.EndRobmoney(false);
        }
    }

    protected onRewardVidewoSuccess() {
        if (NativeCallback.NowVideoType == "ChangeCar") {
            this.changeCarRtBtn.mouseEnabled = true;
            this.changeCarBox.visible = false;
            Game.Control.EndChangeCar(true);
        }
        else {
            this.robmoneyBtn.mouseEnabled = true;
            this.robmoneyBox.visible = false;
            Game.Control.EndRobmoney(true);
        }
        return;
    }

    OnClickChangeCar(flag): void {
        if (flag == false) {
            Game.Control.EndChangeCar(false);
            return;
        }

        this.changeCarRtBtn.mouseEnabled = false;
        let self = this;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
            NativeCallback.NowVideoType = "ChangeCar";
            return;
        }
        else {
            this.changeCarRtBtn.mouseEnabled = true;
            this.changeCarBox.visible = false;
            Game.Control.EndChangeCar(true);
        }

        // WXAPI_.showRewardedVideoAd_((completed) => {
        //     this.changeCarRtBtn.mouseEnabled = true;
        //     this.changeCarBox.visible = false;
        //     Game.Control.EndChangeCar(completed);
        //     if (completed == false) {
        //         return;
        //     }
        // }, () => {
        //     this.changeCarRtBtn.mouseEnabled = true;
        //     this.changeCarBox.visible = false;
        //     Game.Control.EndChangeCar(false);
        // })
    }
}