import View_XYXZS_Base from "../../../../View/ViewBase";
import Vie_XYXZS_wMgr, { Vie_XYXZS_wDef } from "../../../../Mgr/ViewMgr";
import AppSwi_XYXZS_tchConfig from "../../../../Config/AppSwitchConfig";
import Gam_XYXZS_eMgr from "../../../../Mgr/GameMgr";
import Wudi_XYXZS_anMgr from "../../../../Mgr/WudianMgr";
import Cached_XYXZS_WXBannerAd from "../../../../CachedWXBannerAd";
import NativeCallback from "../../../../NativeCallback";
import Sou_XYXZS_ndMgr from "../../../../Mgr/SoundMgr";
import Even_XYXZS_tMgr from "../../../../Event/EventMgr";
import { Even_XYXZS_tDef } from "../../../../Event/EventDef";


export default class GameO_XYXZS_verView extends View_XYXZS_Base {

    protected _centerZone: Laya.Sprite;
    protected _btns: Laya.UIComponent;



    protected _nextLeverBtn: Laya.Sprite;
    // protected _backMainBtn: Laya.Sprite;
    protected _showWin: Laya.Sprite;
    protected _sk: Laya.Sprite;
    // protected _di: Laya.Sprite;
    onAwake() {

        this._centerZone = this.owner.getChildByName("CenterAd") as Laya.Sprite;

        this._btns = this.owner.getChildByName("Btns") as Laya.UIComponent;



        this._nextLeverBtn = this._btns.getChildByName("NextLeverBtn") as Laya.Sprite;
        // this._backMainBtn = this._btns.getChildByName("BackMainBtn") as Laya.Sprite;
        this._showWin = this.owner.getChildByName("ShowWin") as Laya.Sprite;
        // this._sk = this._showWin.getChildByName("Sk") as Laya.Sprite;
        // this._di = this.owner.getChildByName("Di") as Laya.Sprite;


        // let skeleton = new Laya.Skeleton();
        // skeleton.load("subRes/longgu/NewProject.sk", Laya.Handler.create(this, (res) => {
        //     this._sk.addChild(res);

        //     res.play(0, true);
        // }));
        Laya.timer.once(2000, this, () => {
            this._showWin.visible = false;
            // this._di.visible = false;
            this.BtnsShow();
            // this.CenterAdMoveShow();
        });


    }
    onStart() {
        Laya.timer.once(500, this, () => {
            Gam_XYXZS_eMgr.getIns_XYXZS_tance().CreatNextGameScene();
        });
    }

    onEnable() {
        super.onEnable();
        Even_XYXZS_tMgr.in_XYXZS_stance.reg_XYXZS_OnceEvent(Even_XYXZS_tDef.InsertVideoEnd,this,this.onInsertVideoEnd);
    }

    onInsertVideoEnd() {
        Vie_XYXZS_wMgr.inst_XYXZS_ance.open_XYXZS_View(Vie_XYXZS_wDef.Main_XYXZS_View);
        this.closeView();
        Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_BGM("BGM");
        NativeCallback.CallNativeFunc("loadNextAd");
    }

    addEvent() {

        this._nextLeverBtn.once(Laya.Event.CLICK, this, this.onNextLeverBtn);
        //  this._backMainBtn.on(Laya.Event.CLICK, this, this.onBackMainBtn);
    }
    removeEvent() {
        this._nextLeverBtn.off(Laya.Event.CLICK, this, this.onNextLeverBtn);
        //  this._backMainBtn.off(Laya.Event.CLICK, this, this.onBackMainBtn);
    }

    onCloseBtn() { }
    /*
    onBackMainBtn() {
        ViewMgr.instance.openView(ViewDef.MainView);
        this.closeView();

    }*/
    onNextLeverBtn() {
        // ViewMgr.instance.openView(ViewDef.MainView);
        // Vie_XYXZS_wMgr.inst_XYXZS_ance.open_XYXZS_View(Vie_XYXZS_wDef.More_XYXZS_GameView);
        // this.closeView();
        var randNum = Math.random();
        console.log("随机数值 ===========" + randNum);
        // randNum = 0.46;
        if ((Laya.Browser.onAndroid || Laya.Browser.onIOS) && randNum > 0.4) {
            NativeCallback.CallNativeFunc("showInsertVideo");
            NativeCallback.NowVideoType = "insertAd";
            Sou_XYXZS_ndMgr.ins_XYXZS_tance.stop_XYXZS_BGM();
        }
        else {
            Vie_XYXZS_wMgr.inst_XYXZS_ance.open_XYXZS_View(Vie_XYXZS_wDef.Main_XYXZS_View);
            this.closeView();
        }
    }

    BtnsShow() {
        // this._btns.visible = false;
        // //  let time = AppSwitchConfig.getInstance().getAppSwitchData().BackAndNextBtnDelayTime;
        // Laya.timer.once(2000, this, () => {
        //     this._btns.visible = true;
        // })
        if (Wudi_XYXZS_anMgr.Wud_XYXZS_ianFlag) {
            Cached_XYXZS_WXBannerAd.hide();
            this.InduceClick();
        }
        else {
            Cached_XYXZS_WXBannerAd.show();
        }
    }
    InduceClick() {
        this._btns.bottom = 0;
        this._btns.mouseEnabled = false;
        let btnMoveTimer = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().btnMo_XYXZS_veTimer * 1000;
        let bannerMoveTimer = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().banner_XYXZS_MoveTimer * 1000;
        Laya.timer.once(bannerMoveTimer, this, this.InduceMethod);
        Laya.timer.once(btnMoveTimer, this, this.MoveUp);
    }
    InduceMethod() {
        Cached_XYXZS_WXBannerAd.show();
    }
    MoveUp() {
        console.log("MoveUp")
        this._btns.mouseEnabled = true;
        this._btns.bottom = 284;
    }
    CenterAdMoveShow() {

        Laya.Tween.to(this._centerZone,
            { x: 0 },
            1000,
            Laya.Ease.circIn, Laya.Handler.create(this, () => {

            }), null, true)
    }

    onClose() {
        super.onClose();
        Cached_XYXZS_WXBannerAd.hide();
    }

}