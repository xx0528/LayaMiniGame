import ViewBase from "../../View/ViewBase";
import CachedW_JJKLBB_XBannerAd from "../../CachedWXBannerAd";
import WXAPI from "../../WXAPI";
import View_JJKLBB_Mgr, { View_JJKLBB_Def } from "../../Mgr/ViewMgr";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import SkinC_JJKLBB_onfig, { SkinCon_JJKLBB_figData } from "../../Config/SkinConfig";
import Us_JJKLBB_er from "../../User/User";
import Wudi_JJKLBB_anMgr from "../../Mgr/WudianMgr";
import AppSwitch_JJKLBB_Config from "../../Config/AppSwitchConfig";


export default class GameOverSkin extends ViewBase {
    constructor() {
        super()
    }
    private _skin_Img: Laya.Image;
    private _skinIndex: number = 0;
    private _unlockSkin_Btn: Laya.Image;
    private _continue_Btn: Laya.Image;
    onAwake() {
        this._skin_Img = this.owner.getChildByName("SkinBg").getChildByName("Skin_Img") as Laya.Image;
        this._unlockSkin_Btn = this.owner.getChildByName("UnlockSkin_Btn") as Laya.Image;
        this._continue_Btn = this.owner.getChildByName("Continue_Btn") as Laya.Image;
    }

    addEvent() {
        this._unlockSkin_Btn.on(Laya.Event.CLICK, this, this.UnlockSkin);
        this._continue_Btn.on(Laya.Event.CLICK, this, this.CloseView);
    }

    removeEvent() {
        this._unlockSkin_Btn.off(Laya.Event.CLICK, this, this.UnlockSkin);
        this._continue_Btn.off(Laya.Event.CLICK, this, this.CloseView);
    }

    onShow() {
        let notOwned = [];
        var skinDatas = SkinC_JJKLBB_onfig.getIns_JJKLBB_tance().getSkin_JJKLBB_ConfigDatas();
        for (var i = 0; i < skinDatas.length; i++) {
            const owned = Us_JJKLBB_er.actorSkin_JJKLBB_IsUnlock(i);
            if (!owned) {
                if (Math.random() > 0.5) {
                    notOwned.push(i);
                }
            }
        }
        if (notOwned.length > 0) {
            i = notOwned[Math.floor(Math.random() * notOwned.length)];
        }
        else {
            i = skinDatas.length - 1;
        }
        this._skinIndex = i;
        this._skin_Img.skin = "subRes/player/" + (this._skinIndex + 1) + ".png";
        if (Wudi_JJKLBB_anMgr.WudianFlag) {
            this._continue_Btn.bottom = 100;
            this._continue_Btn.mouseEnabled = false;
            var btnMoveTimer = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().btnMov_JJKLBB_eTimer;
            var bannerMoveTimer = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().bannerMo_JJKLBB_veTimer;
            Laya.timer.once(bannerMoveTimer * 1000, this, this.ryw_BannerUp);
            Laya.timer.once(btnMoveTimer * 1000, this, this.ryw_BtnUp);
        }
        else {
            CachedW_JJKLBB_XBannerAd.changeShow();
        }
        super.onShow();
    }
    protected ryw_BannerUp() {
        CachedW_JJKLBB_XBannerAd.changeShow();
    }

    protected ryw_BtnUp() {
        this._continue_Btn.mouseEnabled = true;
        this._continue_Btn.bottom = 400;
        // this.ryw_HistoryBtn.visible = true;
    }

    onClose() {
        CachedW_JJKLBB_XBannerAd.hide();
        super.onClose();
    }

    CloseView() {
        // WXAPI.tryShowWXCrazyClick("加速", () => {
        //     ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.MyInGameView, true);
        // }, () => { }, () => {
        //     ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.MyInGameView, false);
        // })
        View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.LevelStateView);
        this.closeView();
    }

    /**
     * 解锁皮肤
     * 
     * @memberof GameOverSkin
     */
    UnlockSkin() {
        WXAPI.showRewardedVideoAd((res) => {
            if (res) {
                Us_JJKLBB_er.unlock_JJKLBB_ActorSkin(this._skinIndex);
                Us_JJKLBB_er.setCurA_JJKLBB_ctorSkin(this._skinIndex);
                Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_OnUser_JJKLBB_ActorSkin_JJKLBB_Change, this._skinIndex);
                View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.LevelStateView);
                this.closeView();
            }
            else {
                View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.TipsView, "要看完激励视屏才能解锁哦");
            }
        }, () => {
            View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.TipsView, "激励视屏拉取失败");
        });
    }
}