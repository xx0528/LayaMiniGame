import Game from "../Game";
import HillCar from "../Car/HillCar";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import Vibrate_ppxhc_Mgr from "../../Mgr/VibrateMgr";
import Utilit_ from "../../Utilit";
import Sound_ppxhc_Mgr from "../../Mgr/SoundMgr";

export default class CargoMgr {
    private static _instance: CargoMgr = null;
    public static get Instance() {
        if (this._instance == null)
            this._instance = new CargoMgr;
        return this._instance;
    }

    private cargoPrefabs: { [id: string]: Laya.Sprite3D } = {};
    private loadedCargos: Laya.Sprite3D[] = [];
    private totalLoadCargos: number = 0;

    public Init(): void {
        let prefab = Game.Prefabs["Prefab"];
        let cargos = prefab.getChildByName("Cargoes");
        for (let i = 0; i < cargos._children.length; i++) {
            let node: Laya.Node = cargos._children[i];
            this.cargoPrefabs[node.name] = node as Laya.Sprite3D;
        }
    }

    public TransferCargoes(car: HillCar, type: number, isAward: boolean, completed: Laya.Handler = null): void {
        let name = "Cargoe" + Utilit_.Clamp(type, 1, 5);
        let delay = 0;
        let cargoPosition = car.CargoTransferPoints;
        for (let i = 0; i < cargoPosition._children.length; i++) {
            let node = cargoPosition._children[i] as Laya.Sprite3D;
            let position = node.transform.position.clone();
            position.y = car.transform.position.y + 5;
            delay += 0.2;
            Laya.timer.once(delay * 1000, this, this.CreateCargo, [name, position], false)
        }
        if (isAward == false)
            this.totalLoadCargos = cargoPosition._children.length;
        delay += 0.7;
        Laya.timer.once(delay * 1000, this, () => {
            if (completed != null) {
                completed.run();
            }
        });
    }

    public UnloadCargoes(car: HillCar, position: Laya.Vector3[], completed: Laya.Handler = null): void {
        let totalCount = this.totalLoadCargos;
        let currentCount = car.loadedCargos.length;
        let level = Math.round(totalCount / 3);
        let delay: number = 0, index: number = 0;
        while (car.loadedCargos.length != 0) {
            index++;
            let cargo = car.loadedCargos.pop();
            delay += 0.2;
            Laya.timer.once(delay * 1000, this, (progress, level) => {
                Vibrate_ppxhc_Mgr.vibrate_ppxhc_Short();
                this.RetrieveCargo(cargo, position);
                Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Car_Unload, [progress, level]);
            }, [(index / currentCount), Utilit_.Clamp(Math.round(index / level), 1, 3)]);
        }
        delay += 0.5;
        Laya.timer.once(delay * 1000, this, () => {
            if (completed != null) {
                completed.run();
            }
        });
    }

    private CreateCargo(name: string, position: Laya.Vector3): void {
        let prefab = this.cargoPrefabs[name];
        if (prefab == null) {
            return;
        }

        let node = Laya.Sprite3D.instantiate(prefab, Game.Scene, false, position);
        node.active = true;
        let rigidbody = node.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        rigidbody.linearDamping = 0.1;
        rigidbody.friction = 3;
        rigidbody.overrideGravity = true;
        rigidbody.gravity = new Laya.Vector3(0, -15, 0);
        rigidbody.linearVelocity = new Laya.Vector3;
        rigidbody.applyImpulse(new Laya.Vector3(0, -5, 0));
        this.loadedCargos.push(node);
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Car_LoadUp);

        Sound_ppxhc_Mgr.instance_.play_ppxhc_Sound("fallingobject");
    }

    private RetrieveCargo(sprite: Laya.Sprite3D, points: Laya.Vector3[]): void {
        let transform = sprite.transform;
        let rigidbody = sprite.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D;
        rigidbody.isKinematic = true;
        let delay = 0;
        for (let i = 0; i < points.length; i++) {
            let position = points[i];
            Laya.timer.once(delay * 1000, this, () => {
                Laya.Tween.to(transform, {localPositionX: position.x, localPositionY: position.y, localPositionZ: position.z}, 500
                    , null, Laya.Handler.create(this, () => {
                        Sound_ppxhc_Mgr.instance_.play_ppxhc_Sound("suction");
                    }));
            });
            delay += 0.1;
        }
    }

    public Clear(): void {
        while (this.loadedCargos.length != 0) {
            let node = this.loadedCargos.pop();
            node.active = false;
            node.removeSelf();
            node.destroy(true);
        }
    }
}