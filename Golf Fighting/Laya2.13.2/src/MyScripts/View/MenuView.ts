import ViewBase from "../../View/ViewBase";
import GameManager from "../Manager/GameManager";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "../../Mgr/ViewMgr";
import CameraCtrl, { CameraState } from "../Ctrl/CameraCtrl";
import PlayerManager from "../Manager/PlayerManager";
import Sound_sdlyg_Mgr, { SoundType } from "../../Mgr/SoundMgr";
import Us_sdlyg_er from "../../User/User";
import AImanager from "../Manager/AIManager";
import WXAPI from "../../WXAPI";
import App_sdlyg_Config from "../../AppConfig";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import OPPOAPI from "../../OPPOAPI";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";

export default class MenuView extends ViewBase {

    private btn_start: Laya.Button;
    private btn_skin: Laya.Button;
    private btn_moreGame: Laya.Button;
    private btn_sideAD: Laya.Button;
    private btn_rank: Laya.Button;
    private btn_close: Laya.Button;
    private logo: Laya.Image;
    private m_level: Laya.FontClip;
    private btn_autho: any;

    private couldRank:boolean = true;

    constructor() { super(); }

    onAwake() {
        this.btn_start = this.owner.getChildByName("btn_start") as Laya.Button;
        this.btn_skin = this.owner.getChildByName("btn_skin") as Laya.Button;
        this.btn_moreGame = this.owner.getChildByName("btn_moreGame") as Laya.Button;
        this.btn_moreGame.visible = false;
        this.btn_sideAD = this.owner.getChildByName("btn_sideAD") as Laya.Button;
        this.btn_sideAD.visible = false;
        this.btn_close = this.owner.getChildByName("btn_close") as Laya.Button;
        this.btn_rank = this.owner.getChildByName("btn_rank") as Laya.Button;
        this.logo = this.owner.getChildByName("logo") as Laya.Image;
        this.m_level = this.owner.getChildByName("level") as Laya.FontClip;

        this.m_level.value = (Us_sdlyg_er.getLeveNum() + 1).toString();
        if (GameManager.Instance().getHighView()) {
            this.btn_start.bottom += 200;
            this.btn_skin.bottom += 200;
            this.btn_moreGame.bottom += 200;
            // this.btn_sideAD.bottom += 200;
            this.btn_close.top = 147
        }
    }

    onDestroy() {
        super.onDestroy();
        if (this.btn_autho) this.btn_autho.destroy();
    }

    onStart() {
        AImanager.Instance().hide();
        CameraCtrl.Instance().SetState(CameraState.Menu);
        PlayerManager.Instance().showInMenu();
        this.logo.scale(0, 0);
        this.m_level.alpha = 0;
        Laya.Tween.to(this.logo, { scaleX: 1, scaleY: 1 }, 600, Laya.Ease.quadInOut);
        Laya.Tween.to(this.m_level, { alpha: 1 }, 600);
        if (Laya.Browser.onMiniGame) {
            this.onMiniGame();
        } else if (Laya.Browser.onQGMiniGame) {
            this.onQGGame();
        }
    }



    addEvent() {
        this.btn_start.on(Laya.Event.CLICK, this, this.clickStart);
        this.btn_skin.on(Laya.Event.CLICK, this, this.clickSkin);
        this.btn_moreGame.on(Laya.Event.CLICK, this, this.clickMoreGame);
        this.btn_sideAD.on(Laya.Event.CLICK, this, this.clickSideAD);
        this.btn_rank.on(Laya.Event.CLICK, this, this.clickRank);
        this.btn_close.on(Laya.Event.CLICK, this, this.clickClose);
    }

    removeEvent(){
        this.btn_start.off(Laya.Event.CLICK, this, this.clickStart);
        this.btn_skin.off(Laya.Event.CLICK, this, this.clickSkin);
        this.btn_moreGame.off(Laya.Event.CLICK, this, this.clickMoreGame);
        this.btn_sideAD.off(Laya.Event.CLICK, this, this.clickSideAD);
        this.btn_rank.off(Laya.Event.CLICK, this, this.clickRank);
        this.btn_close.off(Laya.Event.CLICK, this, this.clickClose);
    }

    clickClose() {
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MenuView);
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MoreGameView);
    }

    clickStart() {
        GameManager.Instance().normalStart();

        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MenuView);
        Sound_sdlyg_Mgr.instance.playSound(SoundType.Button);
    }

    clickRank() {
        if(this.couldRank){
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.RankView);
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MenuView);
            Sound_sdlyg_Mgr.instance.playSound(SoundType.Button);
        }

    }

    noAuthor() {
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var left = 0;
        var top = this.btn_rank.y / Laya.stage.height * sh;
        var width = this.btn_rank.width / Laya.stage.width * sw;
        var height = this.btn_rank.height / Laya.stage.width * sw;
        this.btn_autho = Laya.Browser.window["wx"].createUserInfoButton({
            type: 'image',
            image: "",
            style: {
                left: left,
                top: top,
                width: width,
                height: height,
            }
        })
        this.btn_autho.onTap((res) => {
            var userInfo = res.userInfo;
            var nickName = userInfo.nickName;
            var avatarUrl = userInfo.avatarUrl;
            console.log("用户授权了", userInfo);
            GameManager.Instance().saveUserAvatarUrl(avatarUrl);
            // this.clickRank();
            self.couldRank = true;
        })

    }

    clickSideAD() {
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.SideAdView);
    }


    clickSkin() {
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.BagView);
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MenuView);
        CameraCtrl.Instance().SetState(CameraState.Bag);

        Sound_sdlyg_Mgr.instance.playSound(SoundType.Button);
    }

    clickMoreGame() {
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MoreGame);
        View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MenuView);
    }

    onMiniGame() {
        this.getUserInfo();

        //================插屏部分===================
        WXAPI.showInterstitialAd(() => { }, () => { });
        //===========================================

        //=================开屏导出===================

        if (AppSwitchConfig.getInstance().getAppSwitchData().enterGamePop) {
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.EnterGamePop);
        }
        //======================================

        //=================主动展示侧边导出====================
        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.SideAdView);
        //=======================================================        
    }

    onQGGame() {
        OPPOAPI.showBannaer();
    }

    getUserInfo() {
        //==============获取头像部分==============
        let self = this;
        Laya.Browser.window["wx"].getUserInfo({
            success: function (res) {
                var userInfo = res.userInfo;
                var nickName = userInfo.nickName;
                var avatarUrl = userInfo.avatarUrl;
                console.log("用户授权了", userInfo);
                GameManager.Instance().saveUserAvatarUrl(avatarUrl);
                self.couldRank = true;
            },
            fail: function (res) {
                console.log("用户没有授权");
                self.noAuthor();
            }
        })
        //=========================================
    }


}