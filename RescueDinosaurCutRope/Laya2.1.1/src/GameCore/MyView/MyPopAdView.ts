
import Event_JJKLBB_Mgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import LoopA_JJKLBB_dView from "../../ShareAd/View/LoopAdView";
import AppSwitch_JJKLBB_Config from "../../Config/AppSwitchConfig";

export default class MyPopAdView extends Laya.Script {

    protected _bg: Laya.Sprite;
    protected _popBtn: Laya.Sprite;
    protected _loopAd: LoopA_JJKLBB_dView;

    protected _popOut: Laya.Sprite;
    protected _popIn: Laya.Sprite;

    onAwake() {
        this._bg = this.owner.getChildByName("BG") as Laya.Sprite;
        this._popBtn = this._bg.getChildByName("PopADBtn") as Laya.Sprite;
        this._popOut = this._popBtn.getChildByName("PopOut") as Laya.Sprite;
        this._popIn = this._popBtn.getChildByName("PopIn") as Laya.Sprite;
        let loopAdOwner = this._bg.getChildByName("LoopAD");
        this._loopAd = loopAdOwner.getComponent(LoopA_JJKLBB_dView);
        this._popIn.visible = false;
        this._popOut.visible = true;

        this._popBtn.on(Laya.Event.CLICK, this, this.onPopBtnClick);

        // Event_JJKLBB_Mgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.AD_OnShareAdFail, this, this.onShareAdFail);
        // Event_JJKLBB_Mgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.AD_OpenSideView, this, this.SinglePopUp);
        // Event_JJKLBB_Mgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.AD_CloseSideView, this, this.SingelPopDown);
        // Event_JJKLBB_Mgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.AD_HideSideView, this, function () { this.owner.visible = false });
        // Event_JJKLBB_Mgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.AD_ShowSideView, this, function () { this.owner.visible = true });
    }

    onEnable(): void {
        this.popUp();
        // Event_JJKLBB_Mgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.AD_OnShareAdFail, this, this.onShareAdFail);
    }

    onDisable(): void {
        // this._popBtn.off(Laya.Event.CLICK, this, this.onPopBtnClick);
        // Event_JJKLBB_Mgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.AD_OnShareAdFail, this, this.onShareAdFail);
    }
    onStart() {
        if (AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().sideAdSwitch == 0) {
            Event_JJKLBB_Mgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_MainAdUiMask, [false]);
            this.owner.destroy();
        }
    }
    onDestroy() {
        // Event_JJKLBB_Mgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.AD_OnShareAdFail, this, this.onShareAdFail);
        // Event_JJKLBB_Mgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.AD_OpenSideView, this, this.SinglePopUp);
        // Event_JJKLBB_Mgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.AD_CloseSideView, this, this.SingelPopDown);
    }

    protected onPopBtnClick() {
        if (this._bg.x > 0) {
            this.popDown();
        }
        else {
            this.popUp();
        }
    }

    // public SinglePopUp() {
    //     Laya.Tween.to(this._bg,
    //         { x: 490 },
    //         250,
    //         Laya.Ease.circIn, Laya.Handler.create(this, () => {
    //             this._loopAd.enabled = true;
    //             this._popOut.visible = false;
    //             this._popIn.visible = true;
    //         }), null, true)
    // }
    // public SingelPopDown() {
    //     Laya.Tween.to(this._bg,
    //         { x: 0 },
    //         250,
    //         Laya.Ease.circIn, Laya.Handler.create(this, () => {
    //             this._loopAd.enabled = false;
    //             this._popOut.visible = true;
    //             this._popIn.visible = false;
    //         }), null, true)
    // }
    public popDown() {
        Event_JJKLBB_Mgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_MainAdUiMask, [false]);
        Laya.Tween.to(this._bg,
            { x: 0 },
            250,
            Laya.Ease.circIn, Laya.Handler.create(this, () => {
                this._loopAd.enabled = false;
                this._popOut.visible = true;
                this._popIn.visible = false;
                // Event_JJKLBB_Mgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_CloseBanner);
                // Event_JJKLBB_Mgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_OpenBottomLoopView);
                // console.log("EventDef.AD_CloseSideView");
            }), null, true)
    }

    public popUp() {
        this._loopAd.onEnable();
        Event_JJKLBB_Mgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_MainAdUiMask, [true]);
        Laya.Tween.to(this._bg,
            { x: 540 },
            250,
            Laya.Ease.circIn, Laya.Handler.create(this, () => {
                this._loopAd.enabled = true;
                this._popOut.visible = false;
                this._popIn.visible = true;
                // Event_JJKLBB_Mgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_OpenBanner);
                // Event_JJKLBB_Mgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_CloseBottomLoopView);
            }), null, true)
    }

    protected onShareAdFail() {
        this.popUp();
    }
}