import ViewBase from "../../View/ViewBase";
import GameManager from "../Manager/GameManager";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";
import CameraCtrl, { CameraState } from "../Ctrl/CameraCtrl";
import PlayerManager from "../Manager/PlayerManager";
import WXAPI from "../../WXAPI";
import AImanager from "../Manager/AIManager";
import WudianMgr from "../../Mgr/WudianMgr";
import CachedWXBannerAd from "../../CachedWXBannerAd";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";

export default class OverDeriveView extends ViewBase {
    
    private btn_next:Laya.Button;
    private btn_home:Laya.Button;
    private btn_share:Laya.Button;    

    private share_url:string = "subRes/sdlyg_share.png";
    private share_title:string = "来一杆！";

    private moveDis:number = 250;
    private wudianBannerShow:boolean = false;

    constructor() { super(); }
    
    onAwake(){
        this.btn_next = this.owner.getChildByName("btn_next") as Laya.Button;
        this.btn_home = this.owner.getChildByName("btn_home") as Laya.Button;        
        this.btn_share = this.owner.getChildByName("btn_share") as Laya.Button;        
        this.btn_share.visible = false;
        
        CameraCtrl.Instance().SetState(CameraState.OverDerive);

    }



    onStart(){
        if(WudianMgr.WudianFlag){
            this.hideBanner();
            this.addWuDianEvent();
            this.btnMoveStart();
        
        }else{
            this.showBanner();
            this.addBtnEvent();
        }
    }

    addEvent(){
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.MoreGameView,this,this.hideBanner);
        Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.OutMoreGameView,this,this.backMoreGame);
    }

    removeEvent(){
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.MoreGameView,this,this.hideBanner);
        Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.OutMoreGameView,this,this.backMoreGame);
        this.removeBtnEvent();
    }

    private addBtnEvent(){
        this.btn_next.on(Laya.Event.CLICK,this,this.clickNext);
        this.btn_home.on(Laya.Event.CLICK,this,this.clickHome);
        this.btn_share.on(Laya.Event.CLICK,this,this.clickShare);
    }

    private removeBtnEvent(){
        this.btn_next.off(Laya.Event.CLICK,this,this.clickNext);
        this.btn_home.off(Laya.Event.CLICK,this,this.clickHome);
        this.btn_share.off(Laya.Event.CLICK,this,this.clickShare);
    }

    private addWuDianEvent(){
        this.btn_next.on(Laya.Event.CLICK,this,this.clickShowWudianBanner);
        this.btn_home.on(Laya.Event.CLICK,this,this.clickShowWudianBanner);
        this.btn_share.on(Laya.Event.CLICK,this,this.clickShowWudianBanner);
    }

    private removeWuDianEvent(){
        this.btn_next.off(Laya.Event.CLICK,this,this.clickShowWudianBanner);
        this.btn_home.off(Laya.Event.CLICK,this,this.clickShowWudianBanner);
        this.btn_share.off(Laya.Event.CLICK,this,this.clickShowWudianBanner);
    }

    private btnMoveStart(){
        this.btn_home.bottom = this.btn_home.bottom-this.moveDis;
        this.btn_next.bottom = this.btn_next.bottom-this.moveDis;
        this.btn_share.bottom = this.btn_share.bottom-this.moveDis;
    }

    private btnMoveEnd(){
        this.btn_home.bottom = this.btn_home.bottom+this.moveDis;
        this.btn_next.bottom = this.btn_next.bottom+this.moveDis;
        this.btn_share.bottom = this.btn_share.bottom+this.moveDis;
    }




    onClose(){
        super.onClose();
        this.removeBtnEvent();
        this.hideBanner();
    }

    clickNext(){
        if(GameManager.Instance().getIsRank()){
            AImanager.Instance().hide();
            CameraCtrl.Instance().SetState(CameraState.Menu);        
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.RankView);
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.OverDeriveView);
        }else{
            GameManager.Instance().normalStart();
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.OverDeriveView);
        }

    }

    clickHome(){
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MenuView);        
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.OverDeriveView);
    }

    clickShare(){
        WXAPI.share(()=>{
            console.log("分享了游戏")
        },this.share_title,this.share_url);
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