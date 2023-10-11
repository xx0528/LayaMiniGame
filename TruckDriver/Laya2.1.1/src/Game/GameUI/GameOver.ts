import ViewBase from "../../View/ViewBase";
import View_ppxhc_Mgr, { View_ppxhc_Def } from "../../Mgr/ViewMgr";
import User_ppxhc from "../../User/User";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import Game from "../Game";
import GameWinView_ppxhc_Template from "../../View/TemplateViews/GameWin/GameWinViewTemplate";
import Wudian_ppxhc_Mgr from "../../Mgr/WudianMgr";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import WXADMgr, { WXBannder_ppxhc_Ad } from "../../Mgr/WXADMgr";
import WudianMgr from "../../Mgr/WudianMgr";
import Vibrate_ppxhc_Mgr from "../../Mgr/VibrateMgr";
import NativeCallback from "../../NativeCallback";

export default class GameOver extends GameWinView_ppxhc_Template {
    public Result = 0;
    public Tag: Laya.Sprite = null;
    onAwake(): void {
        super.onAwake();
        this.Tag = this.TopZone.getChildByName("Tag") as Laya.Sprite;
    }

    protected onBackBtn()
    {
        if(!this._click_ppxhc_Tag && WudianMgr.Wudian_ppxhc_Flag)
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

        //todo:你的代码
        this.closeView();
        Game.ResetGame();
        View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameHome, {view:0});
    }
    
    onEnable() {
        super.onEnable();
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.InsertVideoEnd,this,this.onInsertVideoEnd);
    }
    
    onInsertVideoEnd() {
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Car_LevelUp);
        this.closeView();
        View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameHome,{view:0});
    }

    protected onNextBtn()
    {
        if(!this._click_ppxhc_Tag && WudianMgr.Wudian_ppxhc_Flag)
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

        //todo:你的代码
        // this.closeView();
        // View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameContinue, {NextLevel:true});

        var randNum = Math.random();
        console.log("随机数值 ===========" + randNum);
        // randNum = 0.46;
        if ((Laya.Browser.onAndroid || Laya.Browser.onIOS) && randNum > 0.2) {
            NativeCallback.CallNativeFunc("showInsertVideo");
            NativeCallback.NowVideoType = "insertAd";
            Laya.SoundManager.muted = true;
        }
        else {
            Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Car_LevelUp);
            this.closeView();
            View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameHome,{view:0});
        }
        
    }

    onShow(): void {
        super.onShow();
        this.Result = this._data.Result
        
        View_ppxhc_Mgr.instance.closeView(View_ppxhc_Def.GameHome);
        if (this.Result == 2) {
            this.Tag.loadImage("Template/shibai.png")
            this._next_ppxhc_Btn.loadImage("Template/zaicitiaozhananniu.png");
        }
    }

    onClose(): void {
        super.onClose();
        if (this._banner != null) {
            this._banner.hide();
        }
    }
}