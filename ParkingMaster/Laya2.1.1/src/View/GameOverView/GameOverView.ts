import ViewBase from "../ViewBase";
import User from "../../User/User";
import EventMgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";
import SoundMgr from "../../Mgr/SoundMgr";
import AppSwitchConfig from "../../Config/AppSwitchConfig";
import AppConfig from "../../AppConfig";
import KRQ_SingleAd from "../../KRQ/Com/KRQ_SingleAd";
import BannerAdView from "../../ShareAd/View/BannerAdView";
import WudianMgr from "../../Mgr/WudianMgr";

export default class GameOverView extends ViewBase
{
    private layerBottom: Laya.UIComponent;

    private bannerAd: Laya.UIComponent;
    
    private singleAd: Array<KRQ_SingleAd> = [];

    private banner: BannerAdView;

    private nextBtn: Laya.Image;

    private nextBtnWd: Laya.Image;

    private lastPosY: number;

    private bannerVisible: boolean = true;

    constructor() { super(); }

    onAwake()
    {
        this.nextBtn = this.owner.getChildByName("btnNext") as Laya.Image;
        this.nextBtnWd = this.owner.getChildByName("btnNextWudian") as Laya.Image;
    }

    onDestroy() {
    }

    onStart() {
        // if (AppConfig.AD) {
        //     var cnt = 0;
        //     var tmpDatas = [];
        //     var adLayer = this.owner.getChildByName("KRQ_GameOver2").getChildByName("CenterZone");
        //     for (let ad of adLayer._children) {
        //         let comp = ad.getComponent(KRQ_SingleAd) as KRQ_SingleAd;
        //         this.singleAd.push(comp);
        //         comp.refresh(()=>{
        //             cnt ++;
        //             if (cnt == 4) {
        //                 tmpDatas.push(comp.Data);
        //                 this.checkADLoop();
        //             }
        //             // console.log("single ad data", comp.Data);
        //         });
        //     }
        // }
    }

    onUpdate() {

    }

    checkADLoop(index: number = 0) {
        var ad = this.singleAd[index];
        for (var i = 0; i < this.singleAd.length; i++) {
            let t = this.singleAd[i];
            if (index != i && ad && ad.Data != null && ad.Data.appid == t.Data.appid) {
                ad.refresh(()=>{
                    this.checkADLoop(index);
                });
                return;
            }
        }
        if (index < this.singleAd.length - 1)
            this.checkADLoop(index + 1);
    }

    onEnable() {
        // this.layerBottom = this.owner.getChildByName("layerBottom") as Laya.UIComponent;
        // this.bannerAd = this.layerBottom.getChildByName("BannerAD") as Laya.UIComponent;
        // this.banner = this.bannerAd.getComponent(BannerAdView) as BannerAdView;

        // let btnMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer;
        // let bannerMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer;
        // if (btnMoveTimer > 0 && bannerMoveTimer > 0 && WudianMgr.WudianFlag) {
        //     this.nextBtn.visible = false;
        //     this.nextBtnWd.visible = true;

        //     this.bannerVisible = false;
        //     this.bannerAd.visible = false;
        //     this.enableWxBanner(false);
        //     this.wudianLogic();
        //     // this.nextBtnWd.once(Laya.Event.MOUSE_UP, this, this._onClickNextWudian);
        // } else {
        //     this.nextBtnWd.visible = false;
        //     this.nextBtn.once(Laya.Event.MOUSE_UP, this, this._onClickNext);
        // }

        this.nextBtn.once(Laya.Event.MOUSE_UP, this, this._onClickNext);
        this.nextBtnWd.visible = false;
    }

    _onClickNext() {
        User.setLeveNum(User.getLeveNum() + 1);

        EventMgr.instance.dispatch(EventDef.Game_OnLevelStart);

        this.closeView();
    }

    _onClickNextWudian() {
        this.wudianLogic();
    }

    enableWxBanner(enable: boolean) {
        if (!Laya.Browser.onMiniGame) return;
        if (enable)
            this.banner.onViewShow();
        else
            this.banner.clearWXBaner();
    }

    wudianLogic() {
        let btnMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer;
        let bannerMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer;

        Laya.timer.once(btnMoveTimer * 1000, this, ()=>{
            this.nextBtn.visible = true;
            this.nextBtnWd.visible = false;
            this.nextBtn.once(Laya.Event.MOUSE_UP, this, this._onClickNext);
        });

        Laya.timer.once(bannerMoveTimer * 1000, this, ()=>{
            this.bannerVisible = true;
            this.bannerAd.visible = true;
            this.enableWxBanner(true);
        });
    }

}