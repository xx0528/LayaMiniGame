import RoadMgr from "./Road/RoadMgr";
import CameraFollow from "./Camera/CameraFollow";
import Game from "./Game";
import FSMStateMachine, { FsmState } from "./StateMachine/FSMStateMachine";
import CarMgr from "./Car/CarMgr";
import CargoMgr from "./Cargoes/CargoMgr";
import Event_ppxhc_Mgr from "../Event/EventMgr";
import { Event_ppxhc_Def } from "../Event/EventDef";
import HillCar from "./Car/HillCar";
import View_ppxhc_Mgr, { View_ppxhc_Def } from "../Mgr/ViewMgr";
import User_ppxhc from "../User/User";
import Sound_ppxhc_Mgr from "../Mgr/SoundMgr";
import Utilit_ from "../Utilit";
import GameConst from "./GameConst";
import Game_ppxhc_Mgr from "../Mgr/GameMgr";

var getHandler = Laya.Handler.create;
export default class GameControl extends Laya.Script3D {
    public currentCar: HillCar = null;
    public InGameing: boolean = false;
    public autoPlay: boolean = false;

    private currentAwardRound: number = 0;
    private currentChangeCarRound: number = 0;
    public CurrentChangeCarIndex: number = 0;

    private _frameRate: number = 60;
    private _frameLength: number = 0;
    private _fAccumilatedTime: number = 0;
    private _physicsNextFrame: number = 0;
    private stateMachine: FSMStateMachine = null;

    public set frameRate(value) {
        this._frameRate = value;
        this._frameLength = 1000 / value;
    }

    public get IsAwardRound(): boolean {
        return this.currentAwardRound * GameConst.AwardRound < User_ppxhc.get_ppxhc_LeveNum();
    }

    public get IsChangeCarRound(): boolean {
        return this.currentChangeCarRound * GameConst.ChangeCarRound < User_ppxhc.get_ppxhc_LeveNum();
    }

    public get IsReadyCompleted(): boolean {
        return this.stateMachine.curState.key == "CanPlay";
    }

    public onAwake(): void {
        this.frameRate = 60;
        this._fAccumilatedTime = Laya.timer.currTimer;
        this._physicsNextFrame = Laya.timer.currTimer + this._frameRate;

        this.stateMachine = new FSMStateMachine;
        this.stateMachine.AddAction("CanPlay", this, this.OnCanPlayEnter);
        this.stateMachine.AddAction("Ready", this, this.OnReadyEnter, this.OnReadyExit);
        this.stateMachine.AddAction("Gaming", this, this.OnGamingEnter, this.OnGamingExit, this.OnGamingUpdate);
        this.stateMachine.AddAction("Robmoney", this, this.OnRobMoneyEnter, this.OnRobMoneyExit);
        this.stateMachine.AddAction("ChangeCar", this, this.OnChangeCarEnter, this.OnChangeCarEnd);
        this.stateMachine.AddAction("GameOver");
        this.stateMachine.AddAction("Settle", this, this.OnSettleEnter);

        this.currentAwardRound = Math.ceil(User_ppxhc.get_ppxhc_LeveNum() / GameConst.AwardRound);
        this.currentChangeCarRound = Math.ceil(User_ppxhc.get_ppxhc_LeveNum() / GameConst.ChangeCarRound);

        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.Car_Death, this, this.OnCarDeath);
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.Car_Change, this, this.OnCarChange);
    }

    public GameReady(): void {
        this.stateMachine.Switch("Ready");
    }

    public GameStart() {
        if (this.stateMachine.curState.key != "CanPlay" || this.InGameing == true) {
            return;
        }
        this.InGameing = true;
        this.stateMachine.Switch("Gaming");
    }

    public GameOver(): void {
        this.stateMachine.Switch("GameOver");
    }

    public GameSettle(type): void {
        this.stateMachine.Switch("Settle", type);
    }

    public GameClear(): void {
        this.currentCar = null;
        this.InGameing = false;
    }

    public StartRobmoney(): void {
        this.stateMachine.Switch("Robmoney");
    }

    public EndRobmoney(completed: boolean): void {
        if (completed == false) {
            this.stateMachine.Switch("Gaming");
            return;
        }

        User_ppxhc.add_ppxhc_Money(100);
        Game_ppxhc_Mgr.getInstance().save_ppxhc_GameData();
        this.currentCar.SetShutDown();
        CargoMgr.Instance.TransferCargoes(this.currentCar, 5, true, Laya.Handler.create(this, () => {
            this.stateMachine.Switch("Gaming");
        }));
    }

    public StartChangeCar(): void {
        this.stateMachine.Switch("ChangeCar");
    }

    public EndChangeCar(completed): void {
        this.currentChangeCarRound++;
        if (completed == true) {
            User_ppxhc.add_ppxhc_Skin(this.CurrentChangeCarIndex);
            User_ppxhc.SetSelectiveSkin(this.CurrentChangeCarIndex, false);
        }
        this.stateMachine.Switch("Settle", 1);
    }

    public GetNextRoundName(level: number): string {
        let maxRound = 25;
        level--;
        if (level >= maxRound) {
            level = level % maxRound;
        }
        level++;
        let round = "Round" + level;
        let url = Game.basePath + round + ".lh";
        if (this.IsAwardRound == true) url = Game.basePath + "RoundAward" + ".lh"
        else if (level > 3) url = "https://oss.renyouwangluo.cn/ppxhc/Conventional/" + round + ".lh";
        return url;
    }

    public TryGenerateNotUnlockCars(): boolean {
        let notunlockCars: number[] = Utilit_.GetArrDifference(GameConst.Skins, User_ppxhc.GetOwnedSkin());
        this.CurrentChangeCarIndex = notunlockCars[Utilit_.getRandomInt(0, notunlockCars.length - 1)];
        return notunlockCars.length > 0;
    }

    private OnReadyEnter(): void {
        let position = new Laya.Vector3;
        RoadMgr.Instance.GetCarPosition(position);
        CarMgr.Instance.CreateCar("Car" + User_ppxhc.GetSelectiveSkin(), position);
        Game.CameraFollow.SetTarget(CarMgr.Instance.currentCar.owner as Laya.Sprite3D);
        this.currentCar = CarMgr.Instance.currentCar;
        this.currentCar.SetShutDown();
        Game.CameraFollow.Switch("Default");
        CargoMgr.Instance.TransferCargoes(this.currentCar, Utilit_.getRandomInt(1, 5), false, Laya.Handler.create(this, () => {
            this.stateMachine.Switch("CanPlay");
        }));
    }

    private OnReadyExit(): void {
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Game_ReadyCompleted);
    }

    private OnCanPlayEnter(): void {
        if (this.autoPlay == false) {
            return;
        }
        this.autoPlay = false;
        this.GameStart();
    }

    private OnGamingEnter(): void {
        Sound_ppxhc_Mgr.instance_.play_ppxhc_Sound("startoff");
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Game_GameStarted);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onGameOperation, [1]);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onGameOperation, [2]);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onGameOperation, [3]);
    }

    private OnGamingExit(): void {
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onGameOperation);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onGameOperation);
        Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.onGameOperation);
    }

    private OnGamingUpdate(): void {
    }

    private OnChangeCarEnter(): void {
        let notunlockCars: number[] = Utilit_.GetArrDifference(GameConst.Skins, User_ppxhc.GetOwnedSkin());
        if (Game.Control.IsChangeCarRound && notunlockCars.length > 0) {
            Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Car_ChangeTipStart);
        } else {

        }
    }

    private OnChangeCarEnd(): void {
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Car_ChangeTipEnd);
    }

    private OnSettleEnter(type): void {
        Laya.timer.once(1000, this, () => {
            Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Game_Settle, type);
            View_ppxhc_Mgr.instance.closeView(View_ppxhc_Def.GameView);
            View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameOver, { Result: type });
        });

        if (type != 1) return;
        User_ppxhc.set_ppxhc_LeveNum(User_ppxhc.get_ppxhc_LeveNum() + 1);
        if (this.IsAwardRound != true) {
            //User_ppxhc.set_ppxhc_LeveNum(User_ppxhc.get_ppxhc_LeveNum() + 1);
        } else {
            this.currentAwardRound++;
        }
    }

    private OnCarDeath(): void {
        this.GameSettle(2);
    }

    private onGameOperation(type: number) {
        if (this.InGameing == false)
            return;

        switch (type) {
            case 1: this.MouseDown(); return;
            case 2: this.MouseUp(); return;
            case 3: this.MouseUp(); return;
        }
    }

    private OnRobMoneyEnter(): void {
        this.currentCar.SetSpeedUpOver();
    }

    private OnRobMoneyExit(): void {
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Game_RobmoneyEnd);
    }

    private OnCarChange(): void {
        CarMgr.Instance.Clear();
        CargoMgr.Instance.Clear();
        this.stateMachine.Switch("Ready");
    }

    private MouseDown(): void {
        this.currentCar.SetSpeedUp();
    }

    private MouseUp(): void {
        this.currentCar.SetSpeedUpOver();
    }

    private GameLogicLoop(): void {
    }

    public onUpdate(): void {
        if (Laya.timer.delta == 0 || Laya.timer.delta > 1000)
            return;

        this._fAccumilatedTime += Laya.timer.delta;
        while (this._fAccumilatedTime > this._physicsNextFrame) {
            this._physicsNextFrame += this._frameLength;
        }

        this.onGameOperation(4);
        this.stateMachine.Update();
    }
}