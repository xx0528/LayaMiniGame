import { Object3D } from "../Interface";
import GameCtrl from "../GameCtrl";
import Camera from "../Core/Model/Camera";
import Plane from "../Core/Model/Plane";
import Car from "../Core/Model/Car";
import Wall from "../Core/Model/Wall";
import Barrier from "../Core/Model/Barrier";
import EventMgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";
import Street from "../Core/Model/Street";
import GameObjcet from "../Core/Model/GameObject";
import Utilit from "../../Utilit";
import SoundMgr from "../../Mgr/SoundMgr";

export default class GameScene3D extends Laya.Script3D {
    public camera: Laya.Camera;
    public camera2: Laya.Camera;

    public _parkscene: Laya.Sprite3D;

    private gameCtrl:GameCtrl;
    private _once: boolean = true;

    private streets:{} = {
        plane: {name: "plane", component: Plane},
        street0: {name: "lu_001", component: Street, w: 5, h:3},
        street1: {name: "lu_002", component: Street, w: 3, h:3},
        street2: {name: "lu_003", component: Street, w: 5.2, h:3},
        street3: {name: "lu_004", component: Street, w: 3, h:3},
        street4: {name: "lu_005", component: Street, w: 5, h:3},
        street5: {name: "lu_006", component: Street},
    };

    private cars:{} = {
        car0: {name: "car_default", component: Car, objs: []},
    };

    private barriers:{} = {
        wall: {name: "Road_End_Sign", component: Wall},
        flowerPot: {name: "Decoration_Tree", component: GameObjcet},
        newsBox: {name: "hydrant_mesh", component: GameObjcet},
    };

    private particleCamera: Laya.Sprite3D;

    private particle: Laya.Sprite3D;

    private emotion: Laya.Sprite3D;

    private light: Laya.DirectionLight;

    private endPoint: Laya.Animator;

    private line: Laya.Sprite3D;

    private endRedLights: Array<Laya.Sprite3D> = [];

    private endGreenLights: Array<Laya.Sprite3D> = [];

    constructor() { super(); }

    onAwake(): void {
        laya.events.MouseManager.multiTouchEnabled = false
        
        this._parkscene = this.owner.getChildByName("scene") as Laya.Sprite3D;

        this.particle = this.owner.getChildByName("caidai_01") as Laya.Sprite3D;

        this.camera = this.owner.getChildByName("Main Camera") as Laya.Camera;
        this.camera.addComponent(Camera);

        this.camera2 = this._parkscene.getChildByName("Main Camera2") as Laya.Camera;

        this.endPoint = this.owner.getChildByName("dong").getChildByName("end").getComponent(Laya.Animator) as Laya.Animator;
        this.endPoint.speed = 0;

        let light = this.endPoint.owner.getChildByName("Sign").getChildByName("Light_Red.L") as Laya.Sprite3D;
        this.endRedLights.push(light);
        light = this.endPoint.owner.getChildByName("Sign").getChildByName("Light_Red.R") as Laya.Sprite3D;
        this.endRedLights.push(light);

        light = this.endPoint.owner.getChildByName("Sign").getChildByName("Light_Green.L") as Laya.Sprite3D;
        this.endGreenLights.push(light);
        light = this.endPoint.owner.getChildByName("Sign").getChildByName("Light_Green.R") as Laya.Sprite3D;
        this.endGreenLights.push(light);

        this.line = this._parkscene.getChildByName("barriers").getChildByName("line") as Laya.Sprite3D;
        // this.camera.clearFlag(1);
        // this.light = this.owner.getChildByName("Directional Light") as Laya.DirectionLight;
        // this.light.shadow = true;
        // this.light.shadowDistance = 130;
        // this.light.shadowResolution = 2048;
        // this.light.shadowPSSMCount = 1;
        // this.light.shadowPCFType = 0;
        // this.light.lightmapBakedType = 1;
        // this.light.intensity = 0.5;
        // console.log("intensity",this.light.lightmapBakedType);
        // this.particleCamera = this.owner.getChildByName("Main Camera").getChildByName("caidai") as Laya.Sprite3D;
        // this.particleCamera.active = true;

        this.emotion = this.owner.getChildByName("biaoqing_1") as Laya.Sprite3D;

        for (var k in this.streets) {
            var v = this.streets[k] as Object3D;
            v.obj = this.owner.getChildByName("scene").getChildByName(v.name);
            var compo = v.obj.addComponent(v.component);
            if (v.w && compo.setDefaultSize) {
                compo.setDefaultSize(v.w, v.h);
            }
            // Utilit.forEachChild(v.obj, (node)=>{
            //     var mesh = node as Laya.MeshSprite3D;
            //     if (mesh && mesh.meshRenderer) {
            //         mesh.meshRenderer.receiveShadow = true;
            //     }
            // });
        }

        for (var k in this.cars) {
            var v = this.cars[k] as Object3D;
            for (var i = 0; i < 3; i++) {
                var obj = this._parkscene.getChildByName("car").getChildByName(v.name + "_" + i) as Laya.Sprite3D;
                // Utilit.forEachChild(obj, (node)=>{
                //     var mesh = node as Laya.MeshSprite3D;
                //     if (mesh && mesh.meshRenderer) {
                //         mesh.meshRenderer.castShadow = true;
                //     }
                // });
                v.objs.push(obj);
            }
        }

        for (var k in this.barriers) {
            var v = this.barriers[k] as Object3D;
            v.obj = this._parkscene.getChildByName("barriers").getChildByName(v.name);
            // Utilit.forEachChild(v.obj, (node)=>{
            //     var mesh = node as Laya.MeshSprite3D;
            //     if (mesh && mesh.meshRenderer) {
            //         mesh.meshRenderer.castShadow = true;
            //     }
            // });
        }

        // var tree = this._parkscene.getChildByName("tree");
        // Utilit.forEachChild(tree, (node)=>{
        //     var mesh = node as Laya.MeshSprite3D;
        //     if (mesh && mesh.meshRenderer) {
        //         mesh.meshRenderer.castShadow = true;
        //     }
        // });

        // var plane = this.owner.getChildByName("Plane").getChildByName("Plane_0") as Laya.MeshSprite3D;
        // plane.meshRenderer.receiveShadow = true;
        
        // var objects = this.owner.getChildByName("budong");
        // Utilit.forEachChild(objects, (node)=>{
        //     var mesh = node as Laya.MeshSprite3D;
        //     if (mesh && mesh.meshRenderer)
        //         mesh.meshRenderer.castShadow = true;
        // });

        // (this.owner.getChildByName("Cube") as Laya.MeshSprite3D).meshRenderer.castShadow = true;

        this.owner.addComponent(GameCtrl);
    }
    
    onEnable(): void {
    }

    onDisable(): void {
    }

    onPostRender(): void {
        if (this._once) {
            EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView);
            SoundMgr.instance.playBGM('bg');
            this._once = false;
        }
    }

    onMouseClick(): void {
    }

}
