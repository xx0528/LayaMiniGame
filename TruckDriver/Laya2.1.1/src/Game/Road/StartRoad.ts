import RoadBase from "./RoadBase";
import Game from "../Game";
import HillCar from "../Car/HillCar";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";

export default class StartRoad extends RoadBase {
    private animationSprite: Laya.Sprite3D;

    public onAwake(): void {
        super.onAwake();

        this.animationSprite = this.owner.getChildByName("factory_tube") as Laya.Sprite3D;
    }

    private switchCameraDistance: number = 7;
    public TryMoveWay(currentPosition: Laya.Vector3, car: HillCar): boolean {
        let distance = Laya.Vector3.distance(currentPosition, this.enter.position);
        if (distance > this.switchCameraDistance) {
            Game.CameraFollow.Switch("Driving");
        }

        return super.TryMoveWay(currentPosition, car);
    }

    onEnable(): void {
        super.onEnable();

        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.Car_LoadUp, this, this.OnCarLoadUp)
    }

    onDisable(): void {
        super.onDisable();

        Event_ppxhc_Mgr.instance.removeEvent_(Event_ppxhc_Def.Car_LoadUp, this, this.OnCarLoadUp)
    }

    private OnCarLoadUp(): void {
        if (this.animationSprite == null)
            return;

        let scale = 1.01;
        let duration = 0.1 * 1000;
        let transform = this.animationSprite.transform;
        Laya.Tween.to(transform, {localScaleX: scale, localScaleY: scale, localScaleZ: scale}, duration, Laya.Ease.backInOut, 
            Laya.Handler.create(this, () => {
                Laya.Tween.to(transform, {localScaleX: 1, localScaleY: 1, localScaleZ: 1}, duration, Laya.Ease.backInOut);
            }), 0, true);
    }
}