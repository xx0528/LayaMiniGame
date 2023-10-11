import RoadBase from "./RoadBase";
import PhysicTrigger3d from "../Tools/PhysicTrigger3d";
import Game from "../Game";
import CargoMgr from "../Cargoes/CargoMgr";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import Sound_ppxhc_Mgr from "../../Mgr/SoundMgr";
import Utilit_ from "../../Utilit";
import GameConst from "../GameConst";
import User_ppxhc from "../../User/User";
import CarMgr from "../Car/CarMgr";

export default class EndRoad extends RoadBase {
    private finishBox: Laya.Sprite3D = null;
    private garage_tube_throat: Laya.Sprite3D = null;
    private xishouEffect: Laya.Sprite3D = null;
    private celebrateEffect: Laya.Sprite3D = null;
    private stars: Laya.Sprite3D[] = [];
    private carPosition: Laya.Vector3 = new Laya.Vector3(0, 0, -26);

    public onAwake(): void {
        super.onAwake();
        
        let starNode = this.owner.getChildByName("Starts");
        for (let i = 0; i < starNode._children.length; i++) {
            this.stars.push(starNode._children[i]);
        }
        this.celebrateEffect = this.owner.getChildByName("CelebrateEffect") as Laya.Sprite3D; 
        this.garage_tube_throat = this.owner.getChildByName("garage_tube_throat") as Laya.Sprite3D;
        this.xishouEffect = this.garage_tube_throat.getChildByName("FX_xishou") as Laya.Sprite3D;

        this.finishBox = this.owner.getChildByName("FinishTrigger") as Laya.Sprite3D;
        let physicsComponent = this.finishBox.getComponent(Laya.PhysicsComponent) as Laya.PhysicsComponent;
        physicsComponent.collisionGroup = 1000000 & ~1;
        let trigger = PhysicTrigger3d.GetTrigger(this.finishBox);
        trigger.OnTriggerEnter(this, this.OnFinishTriggerEnter);
    }

    onEnable(): void {
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.Car_Unload, this, this.OnCarUnload);
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.Car_ChangeTipEnd, this, this.OnChangeCarEnd);
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.Car_ChangeTipStart, this, this.OnChangeCarStart);
    }

    onDisable(): void{
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.Car_Unload, this, this.OnCarUnload);
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.Car_ChangeTipEnd, this, this.OnChangeCarEnd);
        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.Car_ChangeTipStart, this, this.OnChangeCarStart);
    }

    private OnFinishTriggerEnter(self, other): void {
        Sound_ppxhc_Mgr.instance_.play_ppxhc_Sound("arrivalterminal");
        this.celebrateEffect.active = true;
        Game.CameraFollow.Switch("Win");
        Game.Control.GameOver();
        Game.Control.currentCar.SetSpeedUpOver();
        Game.Control.currentCar.SetUnload(this.exit.position.clone(), Laya.Handler.create(this, this.OnArriveUnloadPoint));
    }

    private OnArriveUnloadPoint(): void {
        let points: Laya.Vector3[] = [];
        points.push(this.garage_tube_throat.transform.position.clone());
        this.xishouEffect.active = true;
        CargoMgr.Instance.UnloadCargoes(Game.Control.currentCar, points, Laya.Handler.create(this, this.OnUnLoadCompleted));
    }

    private OnUnLoadCompleted(): void {
        if (Game.Control.IsChangeCarRound && Game.Control.TryGenerateNotUnlockCars() == true) {
            Game.Control.StartChangeCar();
            return;
        }
        Game.Control.GameSettle(1);
    }

    private OnChangeCarStart(): void {
        CarMgr.Instance.CreateShowCar("Car" + Game.Control.CurrentChangeCarIndex, this.owner, this.carPosition, new Laya.Vector3(0, -90, 0));
    }

    private OnChangeCarEnd(): void {
        
    }

    private OnCarUnload(progress: number, level: number): void {
        level = Math.min(3, level);
        let star = this.stars[level - 1];
        if (star.active != true) {
            star.active = true;
            var scale = star.transform.localScale.clone() as Laya.Vector3;
            star.transform.localScale = new Laya.Vector3(0, 0, 0);
            Laya.Tween.to(star.transform, {localScaleX: scale.x, localScaleY: scale.y, localScaleZ: scale.z}, 400, Laya.Ease.backInOut);
        }
        
        if (progress == 1) {
            Laya.timer.once(400, this, () => {
                this.xishouEffect.active = false;
            });
        }
    }
}