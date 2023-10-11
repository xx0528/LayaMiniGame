import ViewBase from "../ViewBase";
import WXAPI from "../../WXAPI";
import GameController from "../../Game/GameController";
import View_myqq_Mgr, { ViewDef } from "../../Mgr/ViewMgr";
import NativeCallback from "../../NativeCallback";
import Event_myqq_Mgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";

export default class GameFailureView extends ViewBase {
    private skipBtn: Laya.UIComponent;
    private resurgenceBtn: Laya.UIComponent;

    onAwake(): void {
        this.skipBtn = this.owner.getChildByName("SkipBtn") as Laya.UIComponent;
        this.resurgenceBtn = this.owner.getChildByName("ResurgenceBtn") as Laya.UIComponent;


        this.skipBtn.on(Laya.Event.CLICK, this, this.onClickSkip);
        this.resurgenceBtn.on(Laya.Event.CLICK, this, this.onClickResurgence);
    }

    onEnable()
    {
        super.onEnable();   
        
        Event_myqq_Mgr.instance.regEvemt(EventDef.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_myqq_Mgr.instance.regEvemt(EventDef.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }

    private onClickSkip(): void {
        console.log("跳过激励视频复活");
        this.closeView();
        GameController.Instance.GameOver();
    }

    protected onRewardVidewoFail() {
        View_myqq_Mgr.instance.openView(ViewDef.TipsView, "Video playback failed. Resurrection failed");
        this.closeView();
        GameController.Instance.GameOver();
    }

    protected onRewardVidewoSuccess() {
        this.closeView();
        GameController.Instance.ResurrectionGame();
    }

    private onClickResurgence(): void {
        console.log("激励视频复活准备");

        // if (true) {
        //     View_myqq_Mgr.instance.openView(ViewDef.TipsView, "抱歉当前暂时无法复活。。。");
        //     return;
        // }
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
        }else {
            this.closeView();
            GameController.Instance.ResurrectionGame();
        }

        // GameController.Instance.OpenRewardedVideo(Laya.Handler.create(this, (completed) => {
        //     if (!completed) {
        //         View_myqq_Mgr.instance.showTips("观看完整视频才能复活");
        //         return;
        //     }
        //     this.closeView();
        //     GameController.Instance.ResurrectionGame();
        // }));
    }

    onDisable(): void {
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);
        
        Event_myqq_Mgr.instance.removeEvent(EventDef.RewardVideoFail,this,this.onRewardVidewoFail);
        Event_myqq_Mgr.instance.removeEvent(EventDef.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }
}