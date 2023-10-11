import Game from "../Game";
import RoadBase from "./RoadBase";
import SplineRoad from "./SplineRoad";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import EndRoad from "./EndRoad";
import StartRoad from "./StartRoad";
import HillCar from "../Car/HillCar";
import SnowfieldRoad from "./SnowfieldRoad";
import SludgeRoad from "./SludgeRoad";
import CaveRoad from "./CaveRoad";
import SpeedUpRoad from "./SpeedUpRoad";
import Utilit_ from "../../Utilit";
import DrawbridgeRoad from "./DrawbridgeRoad";
import ZhuanluRoad from "./ZhuanluRoad";
import TiaoqiaoRoad from "./TiaoqiaoRoad";
import BoomRoad from "./BoomRoad";
import GoodRoad from "./GoodRoad";
import DollerRoad from "./DollerRoad";

export default class RoadMgr {
    private static _instance: RoadMgr;
    public static get Instance() {
        if (RoadMgr._instance == null)
            RoadMgr._instance = new RoadMgr;
        return RoadMgr._instance;
    }

    private plane: Laya.Sprite3D;
    private wayClassTypes: { [id: string]: any } = {};

    private colourMatching: any[] = [
        {
            planeColor: new Laya.Vector4(0.3795415, 0.7941176, 0.3824006, 1),
            roadColor: new Laya.Vector4(0.5382891, 0.245026, 0.7573529, 1)
        },
        {
            planeColor: new Laya.Vector4(0.3633218, 0.5783081, 0.7058823, 1),
            roadColor: new Laya.Vector4(0.7867647, 0.2661116, 0.7508579, 1)
        },
        {
            planeColor: new Laya.Vector4(0.6524901, 0.3986267, 0.7426471, 1),
            roadColor: new Laya.Vector4(0.8970588, 0.4606297, 0.1253244, 1)
        },
    ]

    private startWay: RoadBase = null;
    private endWay: RoadBase = null;
    private activeWays = [];
    private wayContainer: Laya.Sprite3D = null;

    private currentSegmentIndex: number = 0;

    public Init() {
        let prefab = Game.Prefabs["Prefab"];
        this.plane = prefab.getChildByName("Plane") as Laya.Sprite3D;
      
        this.wayClassTypes["Start"] = StartRoad;
        this.wayClassTypes["Left-RingRoad"] = SplineRoad;
        this.wayClassTypes["Left-RingRoad-Up"] = SplineRoad;
        this.wayClassTypes["Left-RingRoad-Down"] = SplineRoad;
        this.wayClassTypes["Snowfield"] = SnowfieldRoad;
        this.wayClassTypes["Sludge"] = SludgeRoad;
        this.wayClassTypes["Centrifuge_L"] = SplineRoad;
        this.wayClassTypes["Centrifuge_R"] = SplineRoad;
        this.wayClassTypes["Cave"] = CaveRoad;
        this.wayClassTypes["Road_boost_No"] = SpeedUpRoad;
        this.wayClassTypes["Serpentine_begin_r_R"] = SplineRoad;
        this.wayClassTypes["Drawbridge"] = DrawbridgeRoad;
        this.wayClassTypes["Zhuanlu"] = ZhuanluRoad;
        this.wayClassTypes["Tiaoqiao"] = TiaoqiaoRoad;
        this.wayClassTypes["Boom_No"] = BoomRoad;
        this.wayClassTypes["Good"] = GoodRoad;
        this.wayClassTypes["dollar_No"] = DollerRoad;
        this.wayClassTypes["End"] = EndRoad;

        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.Car_Moving, this, this.OnCarMoving);
    }

    public CreateEnvironment(colorType: number): void {
        this.CreateWayContainer();
        let plane = Laya.Sprite3D.instantiate(this.plane, this.wayContainer) as Laya.MeshSprite3D;
        plane.transform.localPositionY = -1.5;
        // plane.transform.localPositionZ = 77;

        let colorMath = this.colourMatching[colorType];
        let color = colorMath.planeColor.clone() as Laya.Vector4;
        (plane.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = color;
        Game.Camera.clearColor = color.clone();
        Game.Scene.fogColor = color.clone();
    }

    public LoadRoadLh(name: string, caller: any, complete: Function): void {
        let colorType = Utilit_.Clamp(Utilit_.getRandomInt(1, 4), 1, 3) - 1;
        Laya.Sprite3D.load(name, Laya.Handler.create(this, (prefab) => {
            this.CreateWayByNode(prefab.clone(), colorType);
            this.CreateEnvironment(colorType);
            if (complete != null) {
                complete.call(caller);
            }
            Laya.loader.clearRes(name);
        }));
    }

    public GetCarPosition(out: Laya.Vector3): void {
        this.startWay.GetEnterPosition().cloneTo(out);
    }

    public OpenWays(): void {
        this.currentSegmentIndex = 0;
        this.GetRunway(this.currentSegmentIndex).onEnable();
    }

    private OnCarMoving(car: HillCar, position: Laya.Vector3) {
        if (Game.Control.InGameing == false)
            return;
        let way = RoadMgr.Instance.GetRunway(this.currentSegmentIndex);
        if (!way.TryMoveWay(position, car)) {
            way.onDisableWay();
            this.currentSegmentIndex++;
            this.GetRunway(this.currentSegmentIndex).onEnable;
            return;
        }
        way.UpdateCarBehaiovr(car);
    }

    public GetRunway(index: number): RoadBase {
        if (index == 0) {
            return this.startWay;
        }
        else if ((index - 1) <= (this.activeWays.length - 1)) {
            return this.activeWays[index - 1];
        }
        else {
            return this.endWay;
        }
    }

    private CreateWayContainer(): void {
        let constName = "WayContainer";
        if (this.wayContainer != null)
            return;
        this.wayContainer = new Laya.Sprite3D(constName);
        Game.Scene.addChild(this.wayContainer);
    }

    public CreateWayByNode(round: Laya.Sprite3D, colorType): void {
        this.CreateWayContainer();
        this.wayContainer.addChild(round);
        !round.active && (round.active = true);
        round.transform.position = new Laya.Vector3;
        let roads = round.getChildByName("Roads");
        for (let i = 0; i < roads._children.length; i++) {
            let node = roads._children[i] as Laya.Sprite3D;
            var nodeName = node.name.split(" ")[0];
            let classType = this.wayClassTypes[nodeName];
            (classType == null) && (classType = RoadBase);
            let road = node.addComponent(classType) as RoadBase;
            road.Init();
            if (nodeName == "Start") {
                this.startWay = road;
            } else if (nodeName == "End") {
                this.endWay = road;
            } else if (nodeName.search("No") < 0) {
                this.activeWays.push(road);
            }
        }

        let node = Utilit_.FindChild(this.startWay.owner, "monster_road_road_finish/monster_road_road_finish_0") as Laya.Sprite3D;
        let meshSprite = node as Laya.MeshSprite3D;
        let blinnPhongMaterial = meshSprite.meshRenderer.sharedMaterial as Laya.BlinnPhongMaterial;
        let colorMath = this.colourMatching[colorType];
        let color = colorMath.roadColor.clone() as Laya.Vector4;
        blinnPhongMaterial.albedoColor = color;
    }

    public Clear(): void {
        this.startWay = null;
        this.endWay = null;
        this.activeWays = [];
        this.currentSegmentIndex = 0;
        this.wayContainer.removeSelf();
        this.wayContainer.destroy(true);
        this.wayContainer = null;
    }
}