import Game from "../Game";
import HillCar from "./HillCar";
import Utilit_ from "../../Utilit";
export default class CarMgr {
    private static _instance: CarMgr;
    public static get Instance(): CarMgr {
        if (this._instance == null)
            this._instance = new CarMgr;
        return this._instance;
    }

    private carPrefabs: { [id: string]: Laya.Sprite3D } = {};
    private carTrialPrefabs:Laya.Sprite3D[] = [];

    public currentCar: HillCar = null;

    public Init(): void {
        let prefab = Game.Prefabs["Cars"];
        let cars = prefab;
        for (let i = 0; i < cars._children.length; i++) {
            let node = cars._children[i] as Laya.Sprite3D;
            this.carPrefabs[node.name] = node;
        }
        prefab = Game.Prefabs["Prefab"];
        let trails = prefab.getChildByName("Trails");
        for (let i = 0; i < trails._children.length; i++) {
            let node = trails._children[i] as Laya.Sprite3D;
            this.carTrialPrefabs.push(node);
        }
    }
    
    public CreateCar(level: string, position: Laya.Vector3): void {
        let prefab = this.carPrefabs[level];
        if (prefab == null) {
            return;
        }

        let node: Laya.Sprite3D = Laya.Sprite3D.instantiate(prefab, Game.Scene, false, position);
        node.transform.localRotationEulerY = 0;
        this.currentCar = node.addComponent(HillCar);
    }

    public CreateShowCar(level: string, parent: Laya.Node, position: Laya.Vector3, euler: Laya.Vector3) {
        let prefab = this.carPrefabs[level];
        if (prefab == null) {
            return;
        }

        let rotation: Laya.Quaternion = new Laya.Quaternion;
        Utilit_.QuaternionEuler(euler.x, euler.x, euler.x, rotation);
        let node: Laya.Sprite3D = Laya.Sprite3D.instantiate(prefab, parent);
        node.transform.localPosition = position;
        node.transform.localRotationEuler = euler;
        (node.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D).isKinematic = true;
    }

    public CreateTrail(parent: Laya.Sprite3D, index: number): void {
        index = Utilit_.Clamp(index, 0, this.carTrialPrefabs.length);
        let tempTrail = Laya.TrailSprite3D.instantiate(this.carTrialPrefabs[index]) as Laya.TrailSprite3D;
        tempTrail.active = true;
        tempTrail.trailFilter.time = 2;
        //(tempTrail.trailRenderer.material as Laya.TrailMaterial).color = new Laya.Vector4(1, 1, 1);
        tempTrail.trailFilter.alignment = Laya.TrailFilter.ALIGNMENT_TRANSFORM_Z;
        parent.addChild(tempTrail);
        tempTrail.transform.localPosition = new Laya.Vector3;
    }

    public Clear(): void {
        this.currentCar.owner.removeSelf();
        this.currentCar.owner.destroy();
        this.currentCar = null;
    }
}