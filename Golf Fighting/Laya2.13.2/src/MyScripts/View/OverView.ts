import ViewBase from "../../View/ViewBase";
import GameManager from "../Manager/GameManager";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";
import CameraCtrl, { CameraState } from "../Ctrl/CameraCtrl";
import PlayerManager from "../Manager/PlayerManager";
import OverCup from "../Ctrl/OverCup";
import AImanager from "../Manager/AIManager";
import Game_sdlyg_Mgr from "../../Mgr/GameMgr";
import WXAPI from "../../WXAPI";
import WudianMgr from "../../Mgr/WudianMgr";
import CachedWXBannerAd from "../../CachedWXBannerAd";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";

export default class OverView extends ViewBase {

    private btn_openTreasure: Laya.Button;
    private btn_continue: Laya.Button;
    private title: Laya.Image;
    private btn_sideAD: Laya.Button;
    private is_rank: boolean = false;
    private m_cup: OverCup
    private bg: Laya.Box;

    private moveDis:number = 250;

    private wudianBannerShow:boolean = false;
    



    constructor() { super(); }

    onAwake() {
        this.btn_openTreasure = this.owner.getChildByName("btn_openTreasure") as Laya.Button;
        this.btn_continue = this.owner.getChildByName("btn_continue") as Laya.Button;
        this.title = this.owner.getChildByName("title") as Laya.Image;
        this.btn_sideAD = this.owner.getChildByName("btn_sideAD") as Laya.Button;
        this.btn_sideAD.visible = false;
        this.bg = this.owner.getChildByName("bg") as Laya.Box;
        this.m_cup = this.owner.getChildByName("cup").getComponent(OverCup);
        this.is_rank = GameManager.Instance().getIsRank();
    }

    onStart() {
        this.setTitle(this._data);
        if (this.is_rank) {
            this.inRank();
        } else {
            this.inNormal();
        }

        if(WudianMgr.WudianFlag){
            this.hideBanner();
            this.addWuDianEvent();
            this.btnMoveStart();
        
        }else{
            this.showBanner();
            this.addBtnEvent();
        }

    }

    onDestroy() {
        super.onDestroy();
        this.hideBanner();        
        Game_sdlyg_Mgr.getInstance().saveGameData();
    }

    addEvent() {
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.MoreGameView,this,this.hideBanner);
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.OutMoreGameView,this,this.backMoreGame);
        this.btn_sideAD.on(Laya.Event.CLICK, this, this.clickSideAD);
    }

    removeEvent(){
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.MoreGameView,this,this.hideBanner);
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.OutMoreGameView,this,this.backMoreGame);
        this.btn_sideAD.off(Laya.Event.CLICK, this, this.clickSideAD);
        this.removeBtnEvent();
    }

    private addBtnEvent(){
        this.btn_openTreasure.on(Laya.Event.CLICK, this, this.clickOpenTreasure);
        this.btn_continue.on(Laya.Event.CLICK, this, this.clickContinue);
    }

    private removeBtnEvent(){
        this.btn_openTreasure.off(Laya.Event.CLICK, this, this.clickOpenTreasure);
        this.btn_continue.off(Laya.Event.CLICK, this, this.clickContinue);
    }

    private addWuDianEvent(){
        this.btn_openTreasure.on(Laya.Event.CLICK, this, this.clickShowWudianBanner);
        this.btn_continue.on(Laya.Event.CLICK, this, this.clickShowWudianBanner);
    }

    private removeWuDianEvent(){
        this.btn_openTreasure.off(Laya.Event.CLICK, this, this.clickShowWudianBanner);
        this.btn_continue.off(Laya.Event.CLICK, this, this.clickShowWudianBanner);
    }

    private btnMoveStart(){
        this.btn_openTreasure.bottom = this.btn_openTreasure.bottom-this.moveDis;
        this.btn_continue.bottom = this.btn_continue.bottom-this.moveDis;
    }

    private btnMoveEnd(){
        this.btn_openTreasure.bottom = this.btn_openTreasure.bottom+this.moveDis;
        this.btn_continue.bottom = this.btn_continue.bottom+this.moveDis;
    }

    

    private setTitle(type: OverViewType) {
        this.title.alpha = 0;
        switch (type) {
            case OverViewType.WinGame:
                this.title.skin = "Over/win_title.min.png";
                if (this.is_rank) {
                    this.btn_openTreasure.visible = false;
                    this.m_cup.addStar();
                } else {
                    this.btn_continue.visible = false;
                }
                break;
            case OverViewType.LoseGame:
                this.title.skin = "Over/lose_title.min.png";
                this.btn_openTreasure.visible = false;
                if (this.is_rank) {
                    this.m_cup.subStar();
                }
                break;
            case OverViewType.ClickGetPrize:
                this.title.skin = "Over/win_title.min.png";
                if (this.is_rank) {
                    this.btn_openTreasure.visible = false;
                    this.m_cup.addStar();
                } else {
                    this.btn_continue.visible = false;
                }
                break;
        }

        Laya.Tween.to(this.title, { alpha: 1 }, 500, Laya.Ease.quintOut);
    }

    private inRank(){
        this.bg.visible = true;
        this.title.visible = false;
        Laya.timer.once(2000, this, () => {
            // View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.SideAdView);
            WXAPI.showInterstitialAd(() => { }, () => { });
        })
    }

    private inNormal(){
        this.bg.visible = false;
        this.m_cup.hide();
        // View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.SideAdView);
        WXAPI.showInterstitialAd(() => { }, () => { });
    }

    private clickOpenTreasure() {
        Laya.Tween.clearAll(this.title);
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.LotteryView,this._data);
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.OverView);
    }

    private clickContinue() {
        Laya.Tween.clearAll(this.title);
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.OverView);

        if(GameManager.Instance().getIsRank()){
            AImanager.Instance().hide();
            CameraCtrl.Instance().SetState(CameraState.Menu);        
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.RankView);
        }else{
            GameManager.Instance().normalStart();
        }
    }
    

    private clickSideAD() {
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.SideAdView);
    }

    private backMoreGame(){
        if(this.wudianBannerShow)this.showBanner();
    }

    private showBanner(){
        CachedWXBannerAd.show();
    }

    private hideBanner(){
        CachedWXBannerAd.hide();
    }

    private clickShowWudianBanner(){
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

}

export enum OverViewType {
    WinGame,
    LoseGame,
    ClickGetPrize,
}