import ViewBase from "../ViewBase";
import EventMgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";
import ViewMgr, { ViewDef } from "../../Mgr/ViewMgr";
import User from "../../User/User";
import SoundMgr from "../../Mgr/SoundMgr";
import AppConfig from "../../AppConfig";
import HorizontalLayout from "../../ParkingJam/Components/HorizontalLayout";
import BannerAdView from "../../ShareAd/View/BannerAdView";
import KRQ_Banner from "../../KRQ/Com/KRQ_Banner";
import WXAPI from "../../WXAPI";
import Utils from "../../ParkingJam/Util/Utils";

export default class GameView extends ViewBase
{
    private overLayer: Laya.UIComponent;

    private levelLayout: HorizontalLayout;

    private levelLayoutOver: HorizontalLayout;

    private popAdFlag: boolean = false;

    private gold: Laya.Text;

    private rewardLayout: HorizontalLayout;

    private guideHand: Laya.Sprite;

    // private horiLoopAd: Laya.UIComponent;

    private goldLayout: Laya.UIComponent;

    private banner: KRQ_Banner;

    private horiSrcTop: number;

    private btnStart: Laya.UIComponent;

    constructor() { super(); }

    onAwake()
    {
        this.overLayer = this.owner.getChildByName("overLayer") as Laya.UIComponent;
        var btnRefresh = this.owner.getChildByName("layerTop").getChildByName("btnRefresh") as Laya.UIComponent;
        this.levelLayout = this.owner.getChildByName("layerTop").getChildByName("levelLayer").getComponent(HorizontalLayout);
        this.levelLayoutOver = this.overLayer.getChildByName("levelFontLayer").getComponent(HorizontalLayout);
        this.rewardLayout = this.overLayer.getChildByName("rewardLayer").getComponent(HorizontalLayout);
        this.guideHand = this.owner.getChildByName("guideHand") as Laya.Sprite;
        this.gold = this.owner.getChildByName("layerTop").getChildByName("rewardLayer").getChildByName("Text") as Laya.Text;
        this.gold.text = String(User.getMoney());
        btnRefresh.on(Laya.Event.MOUSE_UP, this, this._onClickRefresh);

        // this.horiLoopAd = this.owner.getChildByName("KRQ_HLoopAd") as Laya.UIComponent;
        // this.horiSrcTop = this.horiLoopAd.top;
        this.goldLayout = this.owner.getChildByName("layerTop").getChildByName("rewardLayer") as Laya.UIComponent;
        // this.banner = this.owner.getChildByName("layerBottom").getChildByName("KRQ_Banner").getComponent(KRQ_Banner) as KRQ_Banner;

        this.btnStart = this.owner.getChildByName("btnStart") as Laya.UIComponent;
        this.btnStart.on(Laya.Event.MOUSE_UP, this, this._onClickTouchStart);
    }

    addEvent() {
        super.addEvent();
        
        EventMgr.instance.regEvemt(EventDef.Game_OnLevelComplate, this, this.gameOver);
        EventMgr.instance.regEvemt(EventDef.Game_OnLevelStart, this, this.gameStart);
        EventMgr.instance.regEvemt(EventDef.Game_OnUserMoneyChange, this, this.moneyChange);
        EventMgr.instance.regEvemt(EventDef.Game_Guide, this, this.gameGuide);
        // EventMgr.instance.regEvemt(EventDef.AD_HoriBanner_Enable, this, this.horiBannerListener);
        EventMgr.instance.regEvemt(EventDef.Game_OnViewOpen, this, this._viewOpenListner);
        EventMgr.instance.regEvemt(EventDef.Game_OnViewClose, this, this._viewCloseListner);
    }

    onStart() {
        super.onStart();
        this.levelLayout.setNum(User.getLeveNum());        
        
    }

    removeEvent() {
        super.removeEvent();

        EventMgr.instance.removeEvent(EventDef.Game_OnLevelComplate, this, this.gameOver);
        EventMgr.instance.removeEvent(EventDef.Game_OnLevelStart, this, this.gameStart);
        EventMgr.instance.removeEvent(EventDef.Game_OnUserMoneyChange, this, this.moneyChange);
        EventMgr.instance.removeEvent(EventDef.Game_Guide, this, this.gameGuide);
        // EventMgr.instance.removeEvent(EventDef.AD_HoriBanner_Enable, this, this.horiBannerListener);
        EventMgr.instance.removeEvent(EventDef.Game_OnViewOpen, this, this._viewOpenListner);
        EventMgr.instance.removeEvent(EventDef.Game_OnViewClose, this, this._viewCloseListner);
    }

    private _onClickTouchStart() {
        this.btnStart.visible = false;
        EventMgr.instance.dispatch(EventDef.Game_TouchStart);
        // let self = this;
        // let randomGold = Utils.getInstance().randomRange(50, 100);
        // let str = "恭喜获得" + randomGold + "金币";
        // WXAPI.tryShowWXCrazyClick(str, ()=>{
        //     User.addMoney(randomGold);
        //     EventMgr.instance.dispatch(EventDef.Game_TouchStart);
        // }, ()=>{

        // }, ()=>{
        //     EventMgr.instance.dispatch(EventDef.Game_TouchStart);
        // });
    }

    private _viewOpenListner(para): void {
    //    if (para.view == ViewDef.Export2View) {
    //        EventMgr.instance.dispatch(EventDef.Game_EnableCarTouch, false);
    //    }
    }

    private _viewCloseListner(para): void {
        if (para.view == ViewDef.GameWinView) {
            // ViewMgr.instance.openView(ViewDef.Export2View);
            this.show();
        }
        // else if (para.view == ViewDef.Export2View) {
        //     this.show();
        //     EventMgr.instance.dispatch(EventDef.Game_EnableCarTouch, true);
        // }
    }

    horiBannerListener(enable) {
        // this.goldLayout.visible = enable;
        // if (enable) {
        //     this.banner.show();
        //     this.horiLoopAd.top = this.horiSrcTop;
        // } else {
        //     this.horiLoopAd.top = Laya.stage.height * 0.85;
        //     this.banner.hide();
        // }

    }

    gameGuide(data: any) {
        this.guideHand.visible = data.visible;
        if (data.visible) {
            console.log("stage", Laya.stage.width, Laya.stage.height, data.pos);
            this.guideHand.pos(data.pos.x / Laya.stage.clientScaleX, data.pos.y / Laya.stage.clientScaleY);
            // this.guideHand.pos(0,0);
            console.log(this.guideHand.x, this.guideHand.y);
            var srcPos = new Laya.Vector2(data.pos.x, data.pos.y);
            Laya.Tween.clearAll(this.guideHand);
            this.guideMoveAct(srcPos, data.offsetX, data.offsetY);
        }
    }

    guideMoveAct(src: Laya.Vector2, x: number, y: number): void {
        var dst = 0;
        var t = null;
        if (x) {
            dst = src.x + x;
            t = {x: dst};
        }
        else if (y) {
            dst = src.y + y;
            t = {y: dst};
        }
        Laya.Tween.to(this.guideHand, t, 1000, null, Laya.Handler.create(this, ()=>{
            this.guideHand.pos(src.x, src.y);
            this.guideMoveAct(src, x, y);
        }))
    }

    moneyChange(value) {
        this.rewardLayout.setNum(value.curr - value.last);
        this.gold.text = String(User.getMoney());
    }

    gameStart() {
        this.btnStart.visible = true;
        this.popAdFlag = true;
        this.levelLayout.setNum(User.getLeveNum());
    }

    gameOver() {
        this.levelLayoutOver.setNum(User.getLeveNum());
        this.overLayer.visible = true;
        var img = this.overLayer.getChildByName("img") as Laya.Sprite;
        img.scaleX = 0.5;
        img.scaleY = 0.5;
        img.alpha = 0;
        Laya.Tween.to(img, {alpha:1, scaleX: 1, scaleY: 1}, 500, Laya.Ease.backInOut, Laya.Handler.create(this, ()=>{
            SoundMgr.instance.playSound("victory");
        }));
        Laya.timer.once(2000, this, this.showGameOverView);
    }

    showGameOverView() {
        this.overLayer.visible = false;
        
        ViewMgr.instance.openView(ViewDef.GameWinView, null, (view: ViewBase)=>{
            (view.owner as Laya.View).zOrder = 1;
            this.hide();
        });
    }

    _onClickRefresh() {
        // if (this.popAdFlag) {
        //     ViewMgr.instance.openView(ViewDef.Export2View, {refresh: true}, (view: ViewBase)=>{
        //         // (view.owner as Laya.View).zOrder = 1;
        //         this.hide();
        //     });
        //     this.popAdFlag = false;
        // } else {
        //     this.popAdFlag = true;
        //     EventMgr.instance.dispatch(EventDef.Game_Refresh);
        // }

        EventMgr.instance.dispatch(EventDef.Game_Refresh);
    }

}