import ViewBase from "../ViewBase";
import Util_JJKLBB_it from "../../Utilit";
import Even_JJKLBB_tMgr from "../../Event/EventMgr";
import { Event_JJKLBB_Def } from "../../Event/EventDef";
import WXAPI from "../../WXAPI";
import View_JJKLBB_Mgr, { View_JJKLBB_Def } from "../../Mgr/ViewMgr";
import TouchCtr from "../../GameCore/TouchCtr";
import Game_JJKLBB_Mgr from "../../Mgr/GameMgr";
import Us_JJKLBB_er from "../../User/User";
import AppSwitch_JJKLBB_Config from "../../Config/AppSwitchConfig";
import Wudi_JJKLBB_anMgr from "../../Mgr/WudianMgr";
import A_JJKLBB_LD, { ALDEv_JJKLBB_entDef } from "../../ALD";
import SoundM_JJKLBB_gr from "../../Mgr/SoundMgr";
import NativeCallback from "../../NativeCallback";

export default class GameView extends ViewBase {
    protected _topZone: Laya.Clip;
    protected _exitBtn: Laya.Sprite;
    protected _restartBtn: Laya.Sprite;
    protected _skipBtn: Laya.Sprite;
    private _currentScene: Laya.Scene;
    private static _instance: GameView;

    public static get Instance(): GameView {
        return this._instance;
    }
    public get CurrentScene(): Laya.Scene {
        return this._currentScene;
    }

    onAwake() {
        GameView._instance = this;
        this._topZone = this.owner.getChildByName("TopZone") as Laya.Clip;
        if (Util_JJKLBB_it.isIp_JJKLBB_honeX()) {
            this._topZone.top = 70;
        }
        this._exitBtn = this._topZone.getChildByName("ExitBtn") as Laya.Sprite;
        this._restartBtn = this._topZone.getChildByName("RestartBtn") as Laya.Sprite;
        this._skipBtn = this._topZone.getChildByName("SkipBtn") as Laya.Sprite;
        A_JJKLBB_LD.aldSendOnlySingleReport(ALDEv_JJKLBB_entDef.EnterBattleView);
    }

    addEvent() {
        this._exitBtn.on(Laya.Event.CLICK, this, this.onExitBtn);
        this._restartBtn.on(Laya.Event.CLICK, this, this.onRestarBtn);
        this._skipBtn.on(Laya.Event.CLICK, this, this.onSkipBtn);

        
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }

    removeEvent() {
        this._exitBtn.off(Laya.Event.CLICK, this, this.onExitBtn);
        this._restartBtn.off(Laya.Event.CLICK, this, this.onRestarBtn);
        this._skipBtn.off(Laya.Event.CLICK, this, this.onSkipBtn);

        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.RewardVideoFail,this,this.onRewardVidewoFail);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.RewardVideoSuccess,this,this.onRewardVidewoSuccess);
    }

    protected onExitBtn() {
        this.CloseOldScene();
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_Exit_JJKLBB_Game);
        View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.MainView);
        this.closeView();
    }

    
    protected onRewardVidewoFail() {
        View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.TipsView, "Show Reward Video Faild");
        this._skipBtn.visible = true;
        this._restartBtn.visible = true;
    }

    protected onRewardVidewoSuccess() {
        if (NativeCallback.NowVideoType == "Reset") {
            this.LoadGame();
            this._restartBtn.visible = true;
        }
        else if (NativeCallback.NowVideoType == "Skip") {
            this.GameOver(true);
            this._skipBtn.visible = true;
        }
    }


    protected onRestarBtn() {
        this._restartBtn.visible = false;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.NowVideoType = "Reset";
            NativeCallback.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
        }else {
            this._restartBtn.visible = true;
        }

        // WXAPI.showRewardedVideoAd((ok) => {
        //     if (ok) {
        //         this.LoadGame();
        //     }
        //     this._skipBtn.visible = true;
        // }, () => {
        //     this._skipBtn.visible = true;
        // })
    }

    protected onSkipBtn() {
        this._skipBtn.visible = false;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback.NowVideoType = "Skip";
            NativeCallback.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
        }else {
            this._skipBtn.visible = true;
        }

        // WXAPI.showRewardedVideoAd((ok) => {
        //     if (ok) {
        //         //todo:开始下一关游戏，设置当前关卡进度
        //         this.GameOver(true);
        //     }
        //     this._skipBtn.visible = true;
        // }, () => {
        //     this._skipBtn.visible = true;
        // })
    }
    LoadGame() {
        this.CloseOldScene();
        // Laya.timer.frameOnce(2, this, () => {
        this.LoadStep1();
        // });
    }
    LoadStep1() {
        let level = this._data.levelNum;
        if (level > 50) {
            console.log("关卡超出边界,虚假关卡为:" + level);
            level = Math.ceil(this.GetRdSeed(level + 12345) * 48) + 2;
            console.log("关卡超出边界,真实关卡为:" + level);
        }
        // Laya.Scene.load("GameScene/CutRope - 副本.json", Laya.Handler.create(this, (scene: Laya.Scene) => {
        Laya.Scene.load("GameScene/level_" + level + ".json", Laya.Handler.create(this, (scene: Laya.Scene) => {
            this.owner.addChildAt(scene, 0);
            this._currentScene = scene;
            this._currentScene.addComponent(TouchCtr);
        }, null));
    }
    GetRdSeed(seed: number) {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / (233280.0);
    }
    CloseOldScene() {
        if (this._currentScene != null) {
            Laya.Physics.I.stop();
            // this._currentScene.removeSelf();
            this._currentScene.visible = false;
            this._currentScene.active = false;
            let self = this;
            // Laya.timer.frameOnce(1, self, () => {
            this._currentScene.destroy();
            this._currentScene = null;
            // });
        }
        (Laya.Physics.I as any)._enabled = false;
        Laya.Physics.I.start();
    }
    onShow() {
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_StopBgm);
        View_JJKLBB_Mgr.insta_JJKLBB_nce.closeView(View_JJKLBB_Def.MainView);
        Us_JJKLBB_er.subE_JJKLBB_nergy(this._data.costEnergy);
        this.LoadGame();
    }
    public GameOver(win: boolean) {
        console.log("Game Over, Result :", win);
        Laya.timer.frameOnce(1, this, () => {
            this.CloseOldScene();
            this.closeView();
        });
        if (Wudi_JJKLBB_anMgr.SecondWudianFlag) {
            let currTime = Laya.timer.currTimer;
            let data: any = {};
            data.PrizeCount = "恭喜获得皮肤";
            data.ClickType = 1;
            data.CompleteHander = Laya.Handler.create(this, (data, win) => {
                {
                    Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_onGameC_JJKLBB_omplate,
                        { isWin: win, levelNum: data.levelNum, crystalReward: data.crystalReward });
                }
                console.log("游戏开始狂点停留时间",(Laya.timer.currTimer - currTime) / 1000);
                A_JJKLBB_LD.aldSendOnlySingleReport(ALDEv_JJKLBB_entDef.StayComplateClickGetPrizeTime,
                    {
                        "时间": (Laya.timer.currTimer - currTime) / 1000
                    });
            }, [this._data, win]);
            View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.ClickGetPrize_2, data, () => {
                A_JJKLBB_LD.aldSendOnlySingleReport(ALDEv_JJKLBB_entDef.EnterComplateClickGetPrize);
                A_JJKLBB_LD.aldSendOnlySingleReport(ALDEv_JJKLBB_entDef.EnterComplateClickGetPrizeScene,
                    {
                        "场景值": WXAPI.getLaunchOptionsSync().scene
                    });
            });
        }
        else {
            Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.Game_onGameC_JJKLBB_omplate,
                { isWin: win, levelNum: this._data.levelNum, crystalReward: this._data.crystalReward });
        }
        // View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.GameView, date);
    }
}