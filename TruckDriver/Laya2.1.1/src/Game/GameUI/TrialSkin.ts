import GameWinViewTemplate from "../../View/TemplateViews/GameWin/GameWinViewTemplate";
import WXAPI_ from "../../WXAPI";
import Wudian_ppxhc_Mgr from "../../Mgr/WudianMgr";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import Utilit_ from "../../Utilit";
import GameConst from "../GameConst";
import User_ppxhc from "../../User/User";
import View_ppxhc_Mgr, { View_ppxhc_Def } from "../../Mgr/ViewMgr";
import Game from "../Game";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import NativeCallback from "../../NativeCallback";
import Event_ppxhc_Mgr from "../../Event/EventMgr";

export default class TrialSkin extends GameWinViewTemplate {
    private skipBtn: Laya.Image = null;
    private videoBtn: Laya.Image = null;
    public carImage: Laya.Image = null;
    private currentSkin: number = null;

    onAwake(): void {
        super.onAwake();

        this.skipBtn = this.owner.getChildByName("SkipBtn") as Laya.Image;
        this.videoBtn = this.owner.getChildByName("VideoBtn") as Laya.Image;
        this.carImage = Utilit_.FindChild(this.owner, "CarBox/Car") as Laya.Image;

        this.skipBtn.on(Laya.Event.CLICK, this, this.OnClickSkip);
        this.videoBtn.on(Laya.Event.CLICK, this, this.OnClickVideo);
    }

    onShow(): void {
        super.onShow();
        if (Wudian_ppxhc_Mgr.Wudian_ppxhc_Flag /*&& AppSwitchConfig.getInstance().getAppSwitchData().skinWudian == 1*/) {
            this.skipBtn.bottom = 50;
        }

        this.currentSkin = GameConst.Skins[Utilit_.getRandomInt(1, GameConst.Skins.length - 1)];
        this.carImage.skin = "Cars/" + (this.currentSkin - 1) + ".png";
    }

    
    onEnable(): void {
        super.onEnable();
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);

    }

    
    onDisable(): void {
        super.onDisable();
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);

    }

    OnClickSkip(): void {
        if(!this._click_ppxhc_Tag && Wudian_ppxhc_Mgr.Wudian_ppxhc_Flag /*&& AppSwitchConfig.getInstance().getAppSwitchData().skinWudian == 1*/)
        {
            var self = this
            if(!this._clickTiming_ppxhc_Tag)
            {
                this._clickTiming_ppxhc_Tag = true
                var btnMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
            }
            return;
        }

        this.closeView();
        Game.PlayGame();
        View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameView);
    }

    protected onRewardVidewoFail() {
        this.videoBtn.mouseEnabled = true;
        View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.TipsView, "Video playback failed. can't get new skin");
    }

    protected onRewardVidewoSuccess() {
        if (User_ppxhc.GetSelectiveSkin() != this.currentSkin) {
            User_ppxhc.add_ppxhc_Skin(this.currentSkin);
            User_ppxhc.SetSelectiveSkin(this.currentSkin, true);
            Game.Control.autoPlay = true;
        } 
        else {
            Game.PlayGame();
        }
        this.closeView();
        View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameView);
        this.videoBtn.mouseEnabled = true;
        return;
    }

    OnClickVideo(): void {
        let self = this;
        this.videoBtn.mouseEnabled = false;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
            return;
        }
        else {
            if (User_ppxhc.GetSelectiveSkin() != self.currentSkin) {
                User_ppxhc.add_ppxhc_Skin(self.currentSkin);
                User_ppxhc.SetSelectiveSkin(self.currentSkin, true);
                Game.Control.autoPlay = true;
            } 
            else {
                Game.PlayGame();
            }
            this.closeView();
            View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameView);
        }

        // WXAPI_.showRewardedVideoAd_((completed) => {
        //     this.videoBtn.mouseEnabled = true;
        //     if (completed) {
        //         if (User_ppxhc.GetSelectiveSkin() != self.currentSkin) {
        //             User_ppxhc.add_ppxhc_Skin(self.currentSkin);
        //             User_ppxhc.SetSelectiveSkin(self.currentSkin, true);
        //             Game.Control.autoPlay = true;
        //         } 
        //         else {
        //             Game.PlayGame();
        //         }
        //         this.closeView();
        //         View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameView);
        //     }
        // }, () => {
        //     this.videoBtn.mouseEnabled = true;
        // });
    }

    BtnUp(): void {
        super.BtnUp();
        this.skipBtn.bottom = null;
        this.skipBtn.y = 920;
    }
}