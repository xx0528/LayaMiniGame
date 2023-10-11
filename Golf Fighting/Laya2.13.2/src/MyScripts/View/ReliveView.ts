import ViewBase from "../../View/ViewBase";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";
import GameManager from "../Manager/GameManager";
import WXAPI from "../../WXAPI";
import WudianMgr from "../../Mgr/WudianMgr";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import CachedWXBannerAd from "../../CachedWXBannerAd";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import GameSwitchConfig from "../../Config/GameSwitchConfig";
import NativeCallback from "../../NativeCallback";

export default class ReliveView extends ViewBase {
    
    private btn_getBall:Laya.Button;
    private btn_giveUp:Laya.Button;

    private moveDis:number = 250;
    private wudianBannerShow:boolean = false;
    
    constructor() { super(); }

    onAwake(){
        this.btn_getBall = this.owner.getChildByName("btn_getBall") as Laya.Button;
        this.btn_giveUp = this.owner.getChildByName("btn_giveUp") as Laya.Button;
    }

    onStart(){
        this.btn_giveUp.visible = false;
        this.btn_giveUp.visible = true;

        if(WudianMgr.WudianFlag){
            this.hideBanner();
            this.addWuDianEvent();
            this.btnMoveStart();
        
        }else{
            this.showBanner();
            this.addBtnEvent();
        }
    }

    onClose(){
        super.onClose();
        this.hideBanner();
    }

    addEvent(){
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.MoreGameView,this,this.hideBanner);
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.OutMoreGameView,this,this.backMoreGame);
    }

    removeEvent(){
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.MoreGameView,this,this.hideBanner);
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.OutMoreGameView,this,this.backMoreGame);
        this.removeBtnEvent
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

    onRewardVidewoSuccess() {
        GameManager.Instance().gameRelive();
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.ReliveView);
    }

    clickGetBall(){
        if(GameManager.is_first_add_ball){
            GameManager.is_first_add_ball = false;
            GameManager.Instance().gameRelive();
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.ReliveView);
        }else{
            if (GameSwitchConfig.getInstance().openVideo != 1) {
                return;
            }
            if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                NativeCallback.CallNativeFunc("showRewardVideo");
            }
            else { 
                WXAPI.showRewardedVideoAd((complete)=>{
                    if(complete){
                        GameManager.Instance().gameRelive();
                        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.ReliveView);
                    }else{
                        console.log("加球视频未完整观看");
                    }
                },()=>{
                    console.log("加球视频加载失败");
                })
            }
            
        }
    }

    clickGiveUp(){        
        GameManager.Instance().gameOver(false);
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.ReliveView);
        
    }

    private addBtnEvent(){
        this.btn_getBall.on(Laya.Event.CLICK,this,this.clickGetBall);
        this.btn_giveUp.on(Laya.Event.CLICK,this,this.clickGiveUp);
    }

    private removeBtnEvent(){
        this.btn_getBall.off(Laya.Event.CLICK,this,this.clickGetBall);
        this.btn_giveUp.off(Laya.Event.CLICK,this,this.clickGiveUp);
    }

    private addWuDianEvent(){
        this.btn_getBall.on(Laya.Event.CLICK,this,this.clickGetBall);
        this.btn_giveUp.on(Laya.Event.CLICK,this,this.clickGiveUp);
    }

    private removeWuDianEvent(){
        this.btn_getBall.off(Laya.Event.CLICK,this,this.clickGetBall);
        this.btn_giveUp.off(Laya.Event.CLICK,this,this.clickGiveUp);
    }

    private btnMoveStart(){
        this.btn_getBall.bottom = this.btn_getBall.bottom-this.moveDis;
        this.btn_giveUp.bottom = this.btn_giveUp.bottom-this.moveDis;
    }

    private btnMoveEnd(){
        this.btn_getBall.bottom = this.btn_getBall.bottom+this.moveDis;
        this.btn_giveUp.bottom = this.btn_giveUp.bottom+this.moveDis;
    }

    clickShowWudianBanner(){
        this.removeWuDianEvent();
        Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer*1000,this,()=>{
            this.showBanner();
            this.wudianBannerShow = true;
        })
        Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer*1000,this,()=>{
            this.addBtnEvent();
            this.btnMoveEnd();
        })
    }

    backMoreGame(){
        if(this.wudianBannerShow)this.showBanner();
    }

    showBanner(){
        CachedWXBannerAd.show();
    }

    hideBanner(){
        CachedWXBannerAd.hide();
    }
}