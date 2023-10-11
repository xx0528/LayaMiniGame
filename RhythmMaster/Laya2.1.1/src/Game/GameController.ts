import GameConst from "./GameConst";
import CameraMoveScript from "./Tools/CameraMoveScript";
import BallController, { BallColor } from "./BallController";
import MouseMgr from "./MouseMgr";
import View_myqq_Mgr, { ViewDef } from "../Mgr/ViewMgr";
import NoteBoardManager from "./NoteBoardManager";
import NoteManager from "./NoteManager";
import { Song } from "./Version";
import Event_myqq_Mgr from "../Event/EventMgr";
import { EventDef } from "../Event/EventDef";
import WXAPI from "../WXAPI";
import CameraFollow from "./CameraFollow";
import SoundManager from "./SoundManager";
import Vibrate_myqq_Mgr from "../Mgr/VibrateMgr";
import { PassSong } from "../User/User";
import AudioBand from "./Audio/AudioBand";
import AudioWraper from "./Audio/AudioWraper";
import NativeCallback from "../NativeCallback";

export default class GameController {
    private static _instance: GameController;

    public static get Instance(): GameController {
        if (GameController._instance == null)
            GameController._instance = new GameController();
        return GameController._instance;
    }

    private _inited = false;

    public currentSong: Song = null;
    public scene: Laya.Scene3D = null;
    public boardManager: NoteBoardManager = null;
    public ballController: BallController = null;
    public cameraFollow: CameraFollow = null;
    public isRun: boolean = false;
    public isReady: boolean = false;
    public isGameing: boolean = false;
    public isLoading: boolean = false;
    public realStartTime: number = 0;
    public soundPauseTime: number = 0;
    public SoundInPause: boolean = false;

    public currentSource: number = 0; //游戏分数
    public continuousPerfect: number = 0; // 最大连续的完美次数
    public currentPerfectCount: number = 0; //游戏完美总次数

    public Init(caller = null, completed = null): void {
        if (this._inited) {
            if (completed != null) {
                completed.call(caller);
            }
            return;
        }

        MouseMgr.Instance;
        this.LoadGameScene(GameConst.GameScenePath, this, (scene: Laya.Scene3D) => {
            this.scene = scene;
            let platformManager = scene.getChildByName("PlatformManager")
            this.boardManager = platformManager.addComponent(NoteBoardManager);

            let camera = scene.getChildByName("Main Camera") as Laya.Sprite3D;
            this.cameraFollow = camera.addComponent(CameraFollow);
            camera.getChildByName("Camera").addComponent(CameraMoveScript);

            let ball = scene.getChildByName("BallController");
            this.ballController = ball.addComponent(BallController);

            this.cameraFollow.SetTaget(this.ballController);

            if (completed != null)
                completed.call(this);
        });

        Laya.stage.on("visibilitychange", this, this.VisibilityChange)
    }

    private LoadGameScene(scenePath, caller, completed): void {
        Laya.Scene3D.load(scenePath, Laya.Handler.create(this, function (scene: Laya.Scene3D): void {
            Laya.stage.addChild(scene);
            Laya.stage.setChildIndex(scene, 0);
            if (completed == null || scene == null)
                return;
            completed.call(this, scene);
        }));
    }

    public RayCast(ray: Laya.Ray, rayHit: Laya.HitResult, dis): void {
        this.scene.physicsSimulation.rayCast(ray, rayHit, dis);
    }

    private LoadWaitingTime(callBack: Laya.Handler) {
        callBack.run();
    }

    private Load(song: Song, completed: Laya.Handler, progress?: Laya.Handler): void {
        this.isLoading = true;
        let self = this;
        let inError = false;
        function error(errerStr) {
            console.error(errerStr);
            inError = true;
            self.isLoading = false;
            this.ClearGameRes();
            Laya.loader.off(Laya.Event.ERROR, this, error);
            Laya.timer.clear(this, this.LoadWaitingTime);
            if (progress != null) { progress.recover(); }
            if (completed != null) { completed.runWith(false); completed.recover(); }
        }
        let updateProgress = Laya.Handler.create(this, (num) => {
            if (inError) { return; }
            if (num != 1 && progress != null) {
                progress.runWith(num);
            } else {
                self.isLoading = false;
                updateProgress.recover();
                Laya.loader.off(Laya.Event.ERROR, this, error);
                Laya.timer.clear(this, this.LoadWaitingTime);
                if (progress != null) { progress.runWith(1); progress.recover(); }
                if (completed != null) { completed.runWith(true); completed.recover(); }
            }
        }, null, false);
        let loadConfigCompleted = () => {
            if (inError) { return; }
            updateProgress.runWith(0.7);
            AudioBand.Instance.LoadJson(Laya.loader.getRes(song.songBandPath));
            NoteManager.Instance.LoadJson(Laya.loader.getRes(song.songJosnPath));
            this.boardManager.InitNoteBoard(NoteManager.Instance.songNote.clone());
            AudioWraper.Instance.Load(song.songPath, Laya.Handler.create(this, () => { 
                if (inError) { return; }
                updateProgress.runWith(1);
             }),Laya.Handler.create(this, error));
        }
        let res = [
            {url: song.songJosnPath, type: Laya.Loader.JSON}, 
            {url: song.songBandPath, type: Laya.Loader.JSON}
        ];
        let loader = Laya.loader.load(res, Laya.Handler.create(this, () => { Laya.timer.callLater(this, loadConfigCompleted) }),
            Laya.Handler.create(this, (num) => { updateProgress.runWith(num * 0.7); }, null, false));
        loader.on(Laya.Event.ERROR, this, error);
        Laya.timer.once(7 * 1000, this, this.LoadWaitingTime, [Laya.Handler.create(this, error, ["加载超时"])]);
    }

    public GameReady(song: Song, completed: Laya.Handler, progress?: Laya.Handler): void {
        if (this.isLoading == true) return;
        if (progress) { progress.once = false; }
        this.GameRest();
        this.currentSong = song;
        this.Load(song, Laya.Handler.create(this, (succeed) => {
            if (!succeed) {
                View_myqq_Mgr.instance.closeView(ViewDef.GameLoadingView);
                View_myqq_Mgr.instance.openView(ViewDef.GameMainView, null, () => {
                    View_myqq_Mgr.instance.openView(ViewDef.TipsView, "加载音乐失败！");
                });
                return;
            }
            this.isReady = true;
            this.realStartTime = Laya.timer.currTimer;
            MouseMgr.Instance.enable = true;
            if (completed != null) { completed.runWith(succeed); }
        }), progress);
    }

    public GamePlay(): void {
        if (!this.isReady) {
            console.error("未完成游戏音乐加载！");
            return;
        }
        this.isGameing = true;
        this.isRun = true;
        this.isReady = false;
        let songBeats = NoteManager.Instance.songNote.beats;
        let firstBeat = songBeats[0];
        let color = (firstBeat.notes[0].columnIndex % 3) as BallColor;
        this.ballController.Start(0, 0, color);
        AudioWraper.Instance.Play();
        this.boardManager.BandCubesStart();
        this.OnStageStateChange();
    }

    public GameFailure(): void {
        const time = 1;
        this.isRun = false;
        AudioWraper.Instance.Stop();
        Event_myqq_Mgr.instance.dispatch(EventDef.Game_Failure);
        this.OffStageStateChange();
    }

    public OpenRewardedVideo(completed: Laya.Handler): void {
        let self = this;
        if (Laya.Browser.onMiniGame) {
            WXAPI.showRewardedVideoAd((islookEnd) => {
                if (completed != null) { completed.runWith(islookEnd); }
            }, () => {
                if (completed != null) { completed.runWith(false); }
            })
        } else {
            if (completed != null) { completed.runWith(true); }
        }
    }

    public ResurrectionGame(): void {
        this.ballController.Resurrection();
        Event_myqq_Mgr.instance.dispatch(EventDef.Game_Resurgence);
    }

    public BallRun(): void {
        this.isRun = true;
        this.OnStageStateChange();
        this.ballController.Run();
        let timeAppear = NoteManager.Instance.GetBeatTimeAppear(this.ballController.RunBeatIndex);
        AudioWraper.Instance.PlayFromTime(timeAppear);
    }

    public GameEnd(): void {
        const time = 1;
        this.SettleSongRecord(true);
        AudioWraper.Instance.SoomthStop(1);
        Event_myqq_Mgr.instance.dispatch(EventDef.Game_Settle, true);
    }

    public get currStartLevel(): number {
        let num = Math.floor(NoteManager.Instance.songNote.beats.length / 3);
        let starLevel = Math.min(1, Math.floor((this.currentPerfectCount / num)));
        return starLevel;
    }

    public GameOver(): void {
        this.SettleSongRecord(false);
        Event_myqq_Mgr.instance.dispatch(EventDef.Game_Settle, false);
    }

    private SettleSongRecord(completed): void {
        this.isRun = false;
        this.isGameing = false;
        let name = this.currentSong.name;
        let starLevel = this.currStartLevel;
        SoundManager.Instance.SubPlayOneMoney(this.currentSong);
        SoundManager.Instance.SaveSongRecord(name, starLevel, this.currentSource, completed);
    }

    public GetCurrentSongRecord(): PassSong {
        let song = this.currentSong;
        let passSong = new PassSong();
        passSong.name = song.name;
        passSong.source = this.currentSource;
        passSong.starLevel = this.currStartLevel;
        return passSong;
    }

    public GameRest(): void {
        this.isReady = false;
        this.RestSongSorce();
        this.ClearGameRes();
        this.OffStageStateChange();
        this.ballController.Reset();
        this.boardManager.BandCubesStop();
        MouseMgr.Instance.enable = false;
    }

    private ClearGameRes(): void {
        this.boardManager.Clear();
        AudioWraper.Instance.Clear();
        Laya.loader.clearUnLoaded();
        Laya.Resource.destroyUnusedResources();
        Laya.SoundManager.stopMusic();
        Laya.SoundManager.stopAllSound();
        if (this.currentSong) {
            Laya.loader.clearRes(this.currentSong.songPath);
            Laya.loader.clearRes(this.currentSong.songBandPath);
            Laya.loader.clearRes(this.currentSong.songJosnPath);
        }
    }

    public get CurrentRunTime(): number {
        return (Laya.timer.currTimer - this.realStartTime) / 1000;
    }

    public PauseGame(): void {
        if (this.SoundInPause) {
            return;
        }
        this.SoundInPause = true;
        this.soundPauseTime = AudioWraper.Instance.PlayPosition;
        AudioWraper.Instance.Pause();
        this.ballController.ActiveStand(true);
    }

    public ResumeGame(): void {
        if (!this.SoundInPause) {
            return;
        }
        this.SoundInPause = false;
        AudioWraper.Instance.Resume();
        this.soundPauseTime = 0;
        this.ballController.ActiveStand(false);
    }

    public AddSongSource(perfect: boolean, progress: number): void {
        const defSource: number = 58;
        const perfectSource: number = 100;
        if (!this.ballController.isRun) {
            return;
        }

        if (perfect) {
            this.continuousPerfect++;
            this.currentPerfectCount++;
            this.currentSource += perfectSource;
            Vibrate_myqq_Mgr.vibrateShort();
        } else {
            this.continuousPerfect = 0;
            this.currentSource += defSource;
            Vibrate_myqq_Mgr.ibrateLong();
        }
        Event_myqq_Mgr.instance.dispatch(EventDef.Game_SongSourceChange, [this.currentSource, progress, this.continuousPerfect]);
    }

    public RestSongSorce(): void {
        this.currentSource = 0;
        this.continuousPerfect = 0;
        this.currentPerfectCount = 0;
    }

    public GetColorMaterial(color: BallColor, outColor: Laya.Vector4): Laya.BaseMaterial {
        let colorString = "";
        outColor = outColor ? outColor : new Laya.Vector4();
        switch (color) {
            case BallColor.Red:
                colorString = "Red.lmat";
                outColor.setValue(255 / 255, 24 / 255, 24 / 255, 0.5);
                break;
            case BallColor.Blue:
                colorString = "Blue.lmat";
                outColor.setValue(28 / 255, 95 / 255, 255 / 255, 0.5);
                break;
            case BallColor.Yellow:
                colorString = "Yellow.lmat";
                outColor.setValue(255 / 255, 239 / 255, 28 / 255, 0.5);
                break;
        }
        let material = Laya.loader.getRes("subRes/Scenes/LayaScene_Game/Conventional/Assets/Material/" + colorString);
        if (material == null) {
            return null;
        }
        return material;
    }

    private OnStageStateChange(): void {
        Event_myqq_Mgr.instance.regEvemt(EventDef.Game_BLUR, this, this.StageOnBlur);
        Event_myqq_Mgr.instance.regEvemt(EventDef.Game_FOCUS, this, this.StageOnFocus);
    }

    private OffStageStateChange(): void {
        Event_myqq_Mgr.instance.removeEvent(EventDef.Game_BLUR, this, this.StageOnBlur);
        Event_myqq_Mgr.instance.removeEvent(EventDef.Game_FOCUS, this, this.StageOnFocus);
    }

    private VisibilityChange(): void {
        NativeCallback.ShowLog("VisibilityChange ------ " + Laya.stage.isVisibility);
        if (Laya.stage.isVisibility) {
            this.StageOnFocus();
        } else {
            this.StageOnBlur();
        }
    }

    private StageOnBlur(): void {
        NativeCallback.ShowLog("StageOnBlur========");
        if (!this.SoundInPause) {
            Event_myqq_Mgr.instance.dispatch(EventDef.Game_StateChange, false);
        }
    }

    private StageOnFocus(): void {
        NativeCallback.ShowLog("StageOnFocus=======");
        if (this.SoundInPause) {
            Event_myqq_Mgr.instance.dispatch(EventDef.Game_StateChange, true);
        }
    }
}