import GameScene3D from "./View/GameScene3D";
import LevelLogic from "./Core/LevelLogic";
import Car from "./Core/Model/Car";
import { LevelConfig } from "../Config/LevelConfig";
import { Object3D } from "./Interface";
import Camera from "./Core/Model/Camera";
import { RogueLevelConfig } from "../Config/RogueLevelConfig";
import User from "../User/User";
import EventMgr from "../Event/EventMgr";
import { EventDef } from "../Event/EventDef";
import ViewMgr, { ViewDef } from "../Mgr/ViewMgr";
import GameMgr from "../Mgr/GameMgr";
import Utils from "./Util/Utils";
import SmartTip from "./Core/SmartTip";
import Plane from "./Core/Model/Plane";
import AppConfig from "../AppConfig";

export default class GameCtrl extends Laya.Script3D {
    public camera: Camera;

    public isGuide:boolean = false;

    private ground: Laya.Sprite3D;

    private scene3D: GameScene3D;

    private scene: Laya.Scene3D;

    private ray: Laya.Ray = new Laya.Ray(Laya.Vector3._ZERO, Laya.Vector3._ZERO);

    private hitRet: Laya.HitResult = new Laya.HitResult();

    private levelLogic: LevelLogic = new LevelLogic(this);

    private parkSceneSrcPos: Laya.Vector3;

    private srcFieldView: number;

    private cameraSrcPos: Laya.Vector3;

    private smart: SmartTip = new SmartTip();

    private dstPos: Laya.Vector3;

    private dstRotation: Laya.Vector3;

    public game3dStartFlag: boolean = false;

    private gameNotStart: boolean = false;

    constructor() { super(); }

    onAwake(): void {
        var scene3D = this.owner.getComponent(GameScene3D)

        this.camera = scene3D.camera.getComponent(Camera) as Camera;
        this.scene = this.owner as Laya.Scene3D;
        this.ground = scene3D.ground;
        this.parkSceneSrcPos = scene3D._parkscene.transform.localPosition.clone();
        this.srcFieldView = this.camera.camera.fieldOfView;
        // this.camera.camera.transform.localPositionZ -= 3;
        this.cameraSrcPos = this.camera.camera.transform.localPosition.clone();
        this.dstRotation = this.camera.camera.transform.localRotationEuler.clone();
        // this.camera.camera.transform

        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);

        EventMgr.instance.regEvemt(EventDef.Game_OnLevelComplate, this, this.gameOver);
        EventMgr.instance.regEvemt(EventDef.Game_OnLevelStart, this, this.gameStart);
        EventMgr.instance.regEvemt(EventDef.Game_Refresh, this, this.gameRefresh);
        EventMgr.instance.regEvemt(EventDef.Game_Tip, this, this.gameTip);
        EventMgr.instance.regEvemt(EventDef.Game_TouchStart, this, this.gameTouchStart);
        EventMgr.instance.regEvemt(EventDef.Game_EnableCarTouch, this, this.enableCarTouch);

        EventMgr.instance.dispatch(EventDef.Game_OnLevelStart);
    }

    onDestroy(): void {
        EventMgr.instance.removeEvent(EventDef.Game_OnLevelComplate, this, this.gameOver);
        EventMgr.instance.removeEvent(EventDef.Game_OnLevelStart, this, this.gameStart);
        EventMgr.instance.removeEvent(EventDef.Game_Refresh, this, this.gameRefresh);
        EventMgr.instance.removeEvent(EventDef.Game_Tip, this, this.gameTip);
        EventMgr.instance.removeEvent(EventDef.Game_TouchStart, this, this.gameTouchStart);
        EventMgr.instance.removeEvent(EventDef.Game_EnableCarTouch, this, this.enableCarTouch);
    }

    enableCarTouch(enable) {
        if (!this.gameNotStart)
            this.game3dStartFlag = enable;
    }

    gameTouchStart() {
        this.switchCamera(1);
    }

    gameTip() {
        var layouts = this.levelLogic.getLevelLayouts().slice(0);
        var cars = this.levelLogic.getCars();
        var car = this.smart.check(layouts, cars, this.levelLogic.getMapSize());
        if (car && car != null) {
            this.showGameGuard(car);
        }
    }

    showGameGuard(car: Car) {
        var t = new Laya.Vector3();
        var camera = this.camera.camera as Laya.Camera;
        var p = car.sprite.transform.localPosition.clone();
        car.sprite.transform.localPosition = p;
        camera.viewport.project(car.sprite.transform.position, camera.projectionViewMatrix, t);
        // camera.transform.getForward
        // console.log(t);
        t.x += 10;
        t.y += 10;
        var x = null;
        var y = null;
        var offsets = [-80, 80, -150, 150];
        if (car.getDirection() == 1)
            y = offsets[car.tipDirection];
        else
            x = offsets[car.tipDirection];
        EventMgr.instance.dispatch(EventDef.Game_Guide, {pos:t, visible: true, offsetX: x, offsetY: y});
    }
    
    gameRefresh() {
        if (!this.game3dStartFlag) return;
        this.switchCamera(1);
        this.levelLogic.createLevel(User.getLeveNum());
    }

    gameStart() {
        this.game3dStartFlag = false;
        this.levelLogic.createLevel(User.getLeveNum());
        GameMgr.getInstance().saveGameData();
        this.switchCamera(2);
        // this.levelLogic.createLevel(8);
    }

    gameOver() {
        // this.createParticleCamera();
        EventMgr.instance.dispatch(EventDef.Game_Guide, {visible: false});
        this.getGoldReward();
    }

    getStreet(key: string): Laya.Sprite3D {
        var scene = this.owner.getComponent(GameScene3D);
        var cfg = scene.streets[key] as Object3D;
        return cfg.obj;
    }

    getGoldReward() {
        var gold = this.levelLogic.randomRange(16, 25);
        User.addMoney(gold);
    }

    createRandomBarrier(): Laya.Sprite3D {
        var t = ["flowerPot", "newsBox"];
        var index = Math.round(Math.random() * (t.length - 1));
        return this.createBarrier(t[index]);
    }

    createBarrier(key: string): Laya.Sprite3D {
        // console.log("key", key);
        var scene = this.owner.getComponent(GameScene3D);
        var cfg = scene.barriers[key] as Object3D;
        var obj = cfg.obj.clone() as Laya.Sprite3D;

        scene._parkscene.addChild(obj);

        obj.addComponent(cfg.component);

        return obj;
    }

    createCar(key: string, carType: number): Laya.Sprite3D {
        var scene = this.owner.getComponent(GameScene3D);
        var cfg = scene.cars[key] as Object3D;
        var obj = cfg.objs[carType].clone() as Laya.Sprite3D;

        scene._parkscene.addChild(obj);

        obj.addComponent(cfg.component);

        return obj;
    }

    getEmotionSp(car: Car): Laya.Sprite3D {
        var rects = [new Laya.Vector3(0.12, 3.63, -0.78), new Laya.Vector3(0.26, 3.63, -1.07), new Laya.Vector3(0.28, 5.1, -1.7)]
        var scene = this.owner.getComponent(GameScene3D);
        var emotion = scene.emotion.clone() as Laya.ShuriKenParticle3D;
        emotion.transform.localPosition = rects[car.getCarType()];
        emotion.transform.localScale = new Laya.Vector3(5, 5, 5);
        emotion.active = true;
        let ma = emotion._render.material as Laya.EffectMaterial;
        // let texture = Laya.loader.load("Emotions/biaoqing_1.png") as Laya.BaseTexture;
        // console.log(texture);
        var index = Utils.getInstance().randomRange(1, 4);
        Laya.loader.load(AppConfig.LocalTestReServer + "/Emotions/biaoqing_"+ index + ".png", Laya.Handler.create(this, (texture:Laya.BaseTexture)=>{
            // ma.texture = texture;
        }));
        Laya.timer.once(1000, this, ()=>{
            emotion.removeSelf();
        });
        return emotion;
    }

    createParticle(): Laya.Sprite3D {
        var scene = this.owner.getComponent(GameScene3D);
        var particleOver = scene.particle as Laya.Sprite3D;
        particleOver.active = true;
        Laya.timer.once(500, this, ()=>{
            particleOver.active = false;
        });
        return particleOver;
    }

    createParticleCamera(): Laya.Sprite3D {
        var scene = this.owner.getComponent(GameScene3D);
        var particleOver = scene.particleCamera as Laya.Sprite3D;
        particleOver.active = true;
        Laya.timer.once(1000, this, ()=>{
            particleOver.active = false;
        });
        return particleOver;
    }

    createLine(): Laya.Sprite3D {
        var scene = this.owner.getComponent(GameScene3D);
        var obj = scene.line.clone();
        scene._parkscene.addChild(obj);
        return obj;
    }

    setParkSceneOffset(offsetX: number = 0, offsetZ: number = 0) {
        var scene = this.owner.getComponent(GameScene3D);
        var pos = this.parkSceneSrcPos.clone();
        pos.x += offsetX;
        pos.z += offsetZ;
        scene._parkscene.transform.localPosition = pos;
    }

    setCameraProps(fieldOffset: number, offsetX:number, offsetY: number, offsetZ: number) {
        var camera = this.camera.camera;
        var src = this.cameraSrcPos.clone();

        camera.transform.localPosition = this.cameraSrcPos;
        camera.transform.translate(new Laya.Vector3(offsetX,offsetY,offsetZ));
        this.dstPos = camera.transform.localPosition.clone();
    }

    getPlaneAnchor(): Laya.Vector3 {
        var plane = this.getStreet("plane").getComponent(Plane) as Plane;
        return plane.getAnchor().clone();
    }

    playEndAction(isOn: boolean) {
        var endPoint = this.owner.getComponent(GameScene3D).endPoint as Laya.Animator;
        endPoint.speed = 1;
        if (isOn)
            endPoint.play("deng");
        else
            endPoint.play("deng2");
        // anim.on(Laya.Event.);
        this.turnEndLightOn(isOn);
    }

    playEndOffCaller() {
        this.playEndAction(false);
    }

    turnEndLightOn(isOn: boolean) {
        let endRedLights = this.owner.getComponent(GameScene3D).endRedLights as Array<Laya.Sprite3D>;
        let endGreenLights = this.owner.getComponent(GameScene3D).endGreenLights as Array<Laya.Sprite3D>;
        for (let l of endRedLights) {
            l.active = !isOn;
        }
        for (let l of endGreenLights) {
            l.active = isOn;
        }
    }

    switchCamera(_id: number) {
        let scene = this.owner.getComponent(GameScene3D);
        if (_id == 1) {
            Laya.Tween.to(scene.camera.transform, {
                localPositionX: this.dstPos.x, localPositionY: this.dstPos.y, localPositionZ: this.dstPos.z, 
                localRotationEulerX: this.dstRotation.x, localRotationEulerY: this.dstRotation.y, localRotationEulerZ: this.dstRotation.z}, 1000, null, 
                Laya.Handler.create(this, ()=>{
                    this.levelLogic.gameTip();
                    this.game3dStartFlag = true;
                    this.gameNotStart = false;
                }));
        }
        else if (_id == 2) {
            this.gameNotStart = true;
            var spPlane = this.getStreet("plane") as Laya.Sprite3D;
            var out = new Laya.Vector3(0, 180, 0);
            var position = spPlane.transform.localPosition.clone();
            position.x += 1;
            scene.camera2.transform.lookAt(position, out, true);
            scene.camera.transform.position = scene.camera2.transform.position;
            scene.camera.transform.localRotationEuler = scene.camera2.transform.localRotationEuler;
        }
    }

}