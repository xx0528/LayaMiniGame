import ViewBase from "../../View/ViewBase";
import Game from "../../Game/Game";
import User_ppxhc from "../../User/User";
import ListSkin from "./ListSkin";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import WXAPI_ from "../../WXAPI";
import Utilit_ from "../../Utilit";
import Game_ppxhc_Mgr from "../../Mgr/GameMgr";
import InGameView_ppxhc_Template from "../../View/TemplateViews/InGame/InGameViewTemplate";
import KRQ_ppxhc_Banner from "../../KRQ/Com/KRQ_Banner";
import View_ppxhc_Mgr, { View_ppxhc_Def } from "../../Mgr/ViewMgr";
import MainView_ppxhc_Template from "../../View/TemplateViews/Main/MainViewTemplate";
import AppSwitchConfig from "../../Config/AppSwitchConfig";

export default class UIStart extends MainView_ppxhc_Template {
    private levelNum: Laya.FontClip;
    private moneyNum: Laya.Label;
    private mousebg: Laya.Image = null;
    private playMask: Laya.Box = null;
    private changeCarBtn: Laya.Image;
    private banner: KRQ_ppxhc_Banner = null;

    public onAwake(): void {
        super.onAwake();
        this.playMask = Utilit_.FindChild(this.owner, "CenterZone/PlayMask") as Laya.Box;
        this.playMask.on(Laya.Event.MOUSE_DOWN, this, this.OnPlayButton);
        this.moneyNum = this.owner.getChildByName("sp_money").getChildByName("moneynum") as Laya.Label;
        this.levelNum = Utilit_.FindChild(this.owner, "CenterZone/LevelInfo/LevelNum") as Laya.FontClip
        this.mousebg = this.owner.getChildByName("mousebg") as Laya.Image;

        this.changeCarBtn = this.owner.getChildByName("btn_changecar") as Laya.Image;
        this.changeCarBtn.on(Laya.Event.CLICK, this, this.ButtonChangeCar);
    }

    public onShow(): void {
        this.playMask.mouseEnabled = false;
        this.levelNum.value = User_ppxhc.get_ppxhc_LeveNum().toString();
        this.moneyNum.text = User_ppxhc.get_ppxhc_Money().toString();

        if (Game.Control.IsReadyCompleted) {
            this.OnReadyCompleted();
        }
    }

    onEnable(): void {
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.Game_ReadyCompleted, this, this.OnReadyCompleted);
    }

    onDisable(): void {
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.Game_ReadyCompleted, this, this.OnReadyCompleted);
    }

    OnPlayButton(): void {
        this.closeView();

        let logic = () => {
            if (AppSwitchConfig.getInstance().getAppSwitchData().skinWudian) {
                View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.TrialSkin);
            } else {
                Game.PlayGame();
                View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameView);
            }
        }

        WXAPI_.tryShowWXCrazyClick("疯狂点击", logic, () => {}, logic);
    }

    private ButtonChangeCar(): void {
        this.closeView();
        View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameSkin);
    }

    HandMove()  {
        Laya.Tween.to(this.mousebg.getChildByName("hand"), { scaleX: 1.3, scaleY: 1.3 }, 500, Laya.Ease.cubicInOut, Laya.Handler.create(this, () => {
            Laya.Tween.to(this.mousebg.getChildByName("hand"), { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.cubicInOut, Laya.Handler.create(this, () => {
                this.HandMove()
            }));
        }));
    }

    public OnReadyCompleted(): void {
        this.HandMove();
        this.mousebg.visible = true;
        this.mousebg.alpha = 0;
        this.playMask.mouseEnabled = true;
        Laya.Tween.to(this.mousebg, {alpha: 1}, 300);
        this.changeCarBtn.visible = true;
        Laya.Tween.to(this.changeCarBtn, {right: 0}, 300, Laya.Ease.backInOut);
    }

    OnGameStarted(): void {
        this.mousebg.visible = false;
        this.changeCarBtn.visible = false;
        let banner = this._krq_ppxhc_Main.Sprite.getChildByName("KRQ_Banner").getComponent(KRQ_ppxhc_Banner) as KRQ_ppxhc_Banner;
        banner.hide();
    }
}