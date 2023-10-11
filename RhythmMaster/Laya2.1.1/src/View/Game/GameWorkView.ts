import ViewBase from "../ViewBase";
import GameController from "../../Game/GameController";
import Event_myqq_Mgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";
import Utilit from "../../Utilit";
import View_myqq_Mgr, { ViewDef } from "../../Mgr/ViewMgr";

export default class GameWorkView extends ViewBase {

    private playTip: Laya.UIComponent;
    private touchTip: Laya.UIComponent;
    private progressBar: ProgressBar = null;

    private playStateFlags: Laya.Box;

    private songName: Laya.Label;
    private songSource: Laya.FontClip;
    private perfectCount: Laya.Box;

    onAwake(): void {
        this.touchTip = this.owner.getChildByName("Touch") as Laya.UIComponent;
        this.playTip = this.owner.getChildByName("ContinuePlay") as Laya.UIComponent;
        let node = this.owner.getChildByName("ProgressBar");
        this.progressBar = new ProgressBar(node as Laya.Image);
        this.playStateFlags = this.owner.getChildByName("PlayStateFlags") as Laya.Box;

        this.songName = Utilit.FindChild(this.owner, "SongName/Label") as Laya.Label;
        this.songSource = this.owner.getChildByName("SongSource") as Laya.FontClip;
        this.perfectCount = this.owner.getChildByName("PerfectCount") as Laya.Box;
    }

    onShow(): void {
        this.Reset();
        this.ShowGamePlay();
        this.songName.text = GameController.Instance.currentSong.songName;
    }

    Reset(): void {
        this.songName.text = "";
        this.songSource.value = "0";
        this.progressBar.Reset();
        this.playTip.visible = false;
        this.touchTip.visible = false;
        this.playStateFlags.visible = false;
    }

    onEnable(): void {
        Event_myqq_Mgr.instance.regEvemt(EventDef.Game_Failure, this, this.OnGameFailure);
        Event_myqq_Mgr.instance.regEvemt(EventDef.Game_Resurgence, this, this.onPlayResurgence)
        Event_myqq_Mgr.instance.regEvemt(EventDef.Game_Settle, this, this.onGamePlayState)
        Event_myqq_Mgr.instance.regEvemt(EventDef.Game_StateChange, this, this.OnGameStateChange);
        Event_myqq_Mgr.instance.regEvemt(EventDef.Game_SongSourceChange, this, this.onSourceChange);
    }

    onDisable(): void {
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);
        Event_myqq_Mgr.instance.removeEvent(EventDef.Game_Failure, this, this.OnGameFailure);
        Event_myqq_Mgr.instance.removeEvent(EventDef.Game_Settle, this, this.onGamePlayState)
        Event_myqq_Mgr.instance.removeEvent(EventDef.Game_Resurgence, this, this.onPlayResurgence)
        Event_myqq_Mgr.instance.removeEvent(EventDef.Game_StateChange, this, this.OnGameStateChange);
        Event_myqq_Mgr.instance.removeEvent(EventDef.Game_SongSourceChange, this, this.onSourceChange);
    }

    ShowPerfectCount(count): void {
        let label = this.perfectCount.getChildByName("Label") as Laya.FontClip;
        label.value = count;
        this.perfectCount.visible = true;
        Laya.timer.once(1 * 1000, this, this.closePerfectCount);
        Laya.Tween.clearAll(this.perfectCount);
        Laya.Tween.from(this.perfectCount, {scaleX: 1, scaleY: 1}, 0.2 * 1000, Laya.Ease.backOut);
    }

    private closePerfectCount(): void {
        this.perfectCount.visible = false;
    }

    onSourceChange(source, progress, continuousPerfect) {
        this.songSource.value = source;
        this.progressBar.UpdateValue(Math.min(1, progress));
        if (continuousPerfect < 3) {
            return;
        }
        this.ShowPerfectCount(continuousPerfect);
    }

    onGamePlayState(succeed) {
        let self = this;
        this.playStateFlags.visible = true;
        let winFlag = this.playStateFlags.getChildByName("Win") as Laya.UIComponent;
        let defeatedFlag = this.playStateFlags.getChildByName("Defeated") as Laya.UIComponent;
        
        winFlag.visible = succeed;
        defeatedFlag.visible = !succeed;
        Laya.Tween.clearAll(this.playStateFlags);
        Laya.Tween.from(this.playStateFlags, {y: 0}, 0.7 * 1000, Laya.Ease.backOut, Laya.Handler.create(this, () => {
            Laya.timer.once(500, this, () => {
                View_myqq_Mgr.instance.openView(ViewDef.GameSettleView, succeed, () => {
                    self.closeView();
                });
            })
        }));

        this.touchTip.visible = false;
        this.playTip.visible = false;
    }

    OnGameFailure(): void {
        Laya.timer.once(1000, this, () => {
            View_myqq_Mgr.instance.openView(ViewDef.GameFailureView);
        });
    }

    onPlayResurgence(): void {
        this.playStateFlags.visible = false;
        this.ShowGamePlay();
    }

    ShowGamePlay(): void {
        this.touchTip.visible = true;
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.OnClickGamePlay);
    }

    OnClickGamePlay(): void {
        console.log("onGamePlay");
        this.touchTip.visible = false;
        if (!GameController.Instance.isGameing) {
            GameController.Instance.GamePlay();
        } else {
            GameController.Instance.BallRun();
        }
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.OnClickGamePlay)
    }

    OnGameStateChange(notPause): void {
        if (notPause) {
            return;
        }

        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.OnClickResumeGame);
        this.ShowGamePause();
    }

    ShowGamePause(): void {
        this.playTip.visible = true;
        this.touchTip.visible = true;
        GameController.Instance.PauseGame();
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.OnClickResumeGame);
    }

    OnClickResumeGame(): void {
        console.log("onGameResume");
        this.playTip.visible = false;
        this.touchTip.visible = false;
        GameController.Instance.ResumeGame();
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.OnClickResumeGame)
    }

    onKeyDown(e:Laya.Event): void {
        if (e.keyCode == Laya.Keyboard.Q) {
            GameController.Instance.PauseGame();
        } else {
            GameController.Instance.ResumeGame();
        }
    }
}

class ProgressBar {
    private length: number;
    private minLeft: number;
    private minRight: number;
    private progress: Laya.Image;
    constructor(progressBar: Laya.Image) {
        this.progress = progressBar.getChildByName("Progress") as Laya.Image;
        this.minLeft = this.progress.left;
        this.minRight = this.progress.right;
        this.length = progressBar.width - this.progress.left;
    }

    public UpdateValue(value: number): void {
        this.progress.right = this.length - this.length * value;
        if (this.progress.right < this.minRight)
            this.progress.right = this.minRight;

        if (this.progress.left < this.minLeft)
            this.progress.left = this.minLeft;
    }

    public Reset(): void {
        this.progress.left = this.minLeft;
        this.progress.right = this.length;
    }
}