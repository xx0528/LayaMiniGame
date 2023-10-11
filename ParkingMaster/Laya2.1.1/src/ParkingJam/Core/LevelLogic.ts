import { LevelConfig, LevelConfigData } from "../../Config/LevelConfig";
import GameCtrl from "../GameCtrl";
import Car, { CarType } from "./Model/Car";
import GameObjcet from "./Model/GameObject";
import { RogueLevelData, RogueLevelConfig } from "../../Config/RogueLevelConfig";
import Plane from "./Model/Plane";
import Street from "./Model/Street";
import { CarState } from "../Constants";
import EventMgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";
import HorizontalLayout from "../Components/HorizontalLayout";
import RoundTableRandom from "../Util/RoundTableRandom";

class Position {
    public cur: Laya.Vector3;
    public start: Laya.Vector3;

    constructor(start:Laya.Vector3) {
        this.cur = start.clone();
        this.start = start.clone();
    }

    setY(y: number) {
        this.cur.y = y;
    }

    setXZ(x: number, z: number) {
        this.cur.x = x;
        this.cur.z = z;
    }

    addXZ(offsetX: number, offsetZ: number) {
        this.cur.x += offsetX;
        this.cur.z += offsetZ;
    }

    addSrcXZ(offsetX: number, offsetZ: number) {
        this.start.x += offsetX;
        this.start.z += offsetZ;
    }

    setXY(x: number, z: number) {
        this.cur.x = x;
        this.cur.y = z;
    }

    addXY(offsetX: number, offsetZ: number) {
        this.cur.x += offsetX;
        this.cur.y += offsetZ;
    }

    addSrcXY(offsetX: number, offsetZ: number) {
        this.start.x += offsetX;
        this.start.y += offsetZ;
    }

}

//关卡逻辑类 负责关卡配置文件解析、关卡提示逻辑等
export default class LevelLogic {
    private carNum: number = 0;

    private ctrl: GameCtrl;

    private cars: Array<Car> = [];

    private rand: RoundTableRandom = new RoundTableRandom();

    private defaultSize: Laya.Size = new Laya.Size(5, 5);

    private objs: Array<Laya.Sprite3D> = [];

    private levelLayouts: Array<number> = [];

    private mapSize: Laya.Size;

    constructor(ctrl: GameCtrl) {
        this.ctrl = ctrl;
    }

    createLevel(level: number) {
        var isRogue = false;
        var rogueConfig = RogueLevelConfig.getInstance();
        var levelConfig = LevelConfig.getInstance();
        var data = null;
        if (level == 1)
            this.ctrl.isGuide = true;
        else
            this.ctrl.isGuide = false;

        // this.cars = [];
        // for (var i = 0; i < rogueConfig.getDataLength(); i++) {
        //     data = rogueConfig.getData(i);
        //     if (level >= data.level.min && level <= data.level.max) {
        //         isRogue = true;
        //         break;
        //     }
        // }
        var minLevel = levelConfig.getDataLength();
        if (level > minLevel) {
            level = this.randomRange(2, LevelConfig.getInstance().getDataLength());
        }
        this.clearCars();
        this.clearObjs();
        console.log("第", level, "关");

        if (isRogue)
            this.createRogueLevel(data);
        else
            this.createLevelWithConfig(LevelConfig.getInstance().getData(level - 1));
    }

    //创建随机关卡
    createRogueLevel(config: RogueLevelData) {
        var ctrl = this.ctrl;
        var rand = this.rand;
        var w = this.randomRange(config.map.w, config.map.max_w);
        var h = this.randomRange(config.map.h, config.map.max_h);
        var length = w * h;
        var levelStartPos = new Laya.Vector3(w * 0.5, 0, h * 0.5);

        rand.set("car", config.car);
        // ctrl.camera.addHeight(0);
        if (w > 12)
            ctrl.camera.addHeight(8);
        else
            ctrl.camera.resetPos();

        var planePos = new Position(levelStartPos);
        planePos.addXZ(-0.5, -0.5);
        var carPos = new Position(levelStartPos);
        carPos.setY(1);

        // console.log("random map size:", w, h);
        var layouts = [];
        var cnt = 0;
        for (var i = 0; i < length; i++) {
            layouts.push(1);
        }
        for (var i = 0; i < h; i++) {
            for (var j = 0; j < w; j++) {
                carPos.setXZ(carPos.start.x - j * 1, carPos.start.z - i * 1);
                if (rand.randomCheck(config.carAppear)) {
                    var carType = rand.getRandomIndex("car");
                    var direction = Math.round(Math.random());
                    var prop = new Car().getCarProp(carType);
                    if (this.canCreateCar(layouts, cnt, w, prop, direction)) {
                        var car = this.createCar(carType, direction, carPos) as Car;
                        this.resetLayouts(car, layouts, cnt, w, h, car.val);
                    }
                }
                planePos.setXZ(planePos.start.x - j * 1, planePos.start.z - i * 1);
                this.createUnit("plane", planePos.cur);
                cnt ++;
            }
        }
    }

    //根据配置数据创建关卡
    createLevelWithConfig(config: LevelConfigData) {
        var ctrl = this.ctrl;
        var w = config.map.w;
        var h = config.map.h;
        var levelStartPos = new Laya.Vector3(0, 0, 0);
        var space = 0;
        var plane = this.ctrl.getStreet("plane").getComponent(Plane) as Plane;
        var carStartPos = plane.getAnchor().clone();
        carStartPos.z += h;
        var carPos = new Position(carStartPos);
        // carPos.addSrcXZ(0, -0.5);
        plane.setScale(w, h);
        plane.setPosWithAnchor(w, h);
        this.mapSize = new Laya.Size(w, h);
        var street1 = this.ctrl.getStreet("street0").getComponent(Street) as Street;
        var street2 = this.ctrl.getStreet("street1").getComponent(Street) as Street;
        var street3 = this.ctrl.getStreet("street2").getComponent(Street) as Street;
        var street4 = this.ctrl.getStreet("street3").getComponent(Street) as Street;
        var street5 = this.ctrl.getStreet("street4").getComponent(Street) as Street;
        street1.setScale(w);
        street1.setPosByAnchor(plane.getAnchor(), - w * 0.5, h);
        street2.setPosByAnchor(plane.getAnchor(), - w - street2.defaultSize.width * 0.5, h + street2.defaultSize.height * 0.5 + 0.06);
        street3.setScale(h);
        street3.setPosByAnchor(plane.getAnchor(), - w + 0.05, h * 0.5);
        street4.setPosByAnchor(plane.getAnchor(), - w - street4.defaultSize.width * 0.5, - street4.defaultSize.height * 0.5 + 0.06);
        street5.setScale(w);
        street5.setPosByAnchor(plane.getAnchor(), - w * 0.5, - street5.defaultSize.height);
        // console.log("street1", street1.sprite.transform.position);

        this.createLine(plane.getAnchor(), street1, w, h, 90);
        this.createLine(plane.getAnchor(), street3, w, h, 0);
        this.createLine(plane.getAnchor(), street5, w, h, 90);

        // this.createMapLine(plane.getAnchor(), w, h);

        var layouts = config.layout.slice(0);
        this.levelLayouts = config.layout.slice(0);
        for (var i = 0; i < layouts.length; i++) {
            var value = layouts[i];
            var line = i % w;
            var row = Math.floor(i / w);
            if (value === 1) {
                continue;
            }
            carPos.setXZ(carPos.start.x - line * (1 + space), carPos.start.z - row * (1 + space));
            if (this.isCar(value)) {
                var carType = this.getCarType(value);
                var direction = value % 10;
                var car = this.createCar(carType, direction, carPos);
                car.startInLayout = i;
                this.resetLayouts(car, layouts, i, w, h);
            }
            else if (this.isWall(value)) {
                this.createWallRepeat(layouts, carPos.cur, i, line, row, w, h);
            }
            else if (this.isBarrier(value)) {
                carPos.addXZ(-0.5, -0.5);
                this.createRandomBarrier(carPos.cur);
            }
        }

        this.carNum = this.cars.length;
        console.log("createMap", w, h);
        this.adjustScenePosition(w, h);
        // this.adjustScenePosition(w, h);
        // this.gameTip();
    }

    createMapLine(anchor: Laya.Vector3, w: number, h: number) {
        let num = Math.floor((w + 1) / 3);
        let inter = Math.floor(w / num);
        let x = anchor.x - inter + 0.4;
        let length = h;

        for (var i = 0; i < num; i++) {
            let line = this.ctrl.createLine();
            line.transform.localRotationEulerY = 90;
            line.transform.localScaleX = length;
            line.transform.localPositionY += 0.1;
            line.transform.localPositionX = x - i * inter;
            line.transform.localPositionZ = anchor.z + length * 0.5;
            this.objs.push(line);
        }
    }

    createLine(anchor: Laya.Vector3, street: Street, w: number, h: number, angle: number) {     
        let num = Math.round(w / 2);
        for (var i = 0; i < num; i++) {
            let line = this.ctrl.createLine();
            if (angle == 90) {
                line.transform.localPositionX = anchor.x - i * 2 - 0.5;
                line.transform.localPositionZ = street.sprite.transform.localPositionZ + street.h + 0.5;
            } else {
                line.transform.localRotationEulerY = 90;
                line.transform.localPositionX = street.sprite.transform.localPositionX - street.w - 0.5;
                line.transform.localPositionZ = anchor.z + i * 2 + 0.5;
            }
            this.objs.push(line);
        }
    }

    //检测连续创建墙
    createWallRepeat(layouts: any, pos: Laya.Vector3, index: number, line: number, row: number, w: number, h: number) {
        var repeatDirection = 0;
        var firstPos = pos.clone();
        var isRepeat = false;
        pos.z -= 0.5;
        pos.x -= 0.5;
        if (line != w - 1) {//下标在横向末尾的时候不进行连续读取
            for (var i = 0; i < w - line; i++) {
                if (i > 0) {
                    var j = i + index;
                    if (this.isWall(layouts[j])) {
                        pos.x -= 1;
                        this.createUnit("wall", pos, 0);
                        layouts[j] = 1;
                        isRepeat = true;
                    } else {
                        break;
                    }
                }
            }
        }

        if (!isRepeat) {
            for (var i = 0; i < h - row; i++) {
                if (i > 0) {
                    var j = w * i + index;
                    if (this.isWall(layouts[j])) {
                        pos.z -= 1;
                        this.createUnit("wall", pos, 1);
                        layouts[j] = 1;
                        repeatDirection = 1;
                        isRepeat = true;
                    } else {
                        break;
                    }
                }
            }
        }

        layouts[index] = 1;
        firstPos.x -= 0.5;
        firstPos.z -= 0.5;
        if (!isRepeat) {
            var l = index % w;
            if (l == 0 || l == w - 1)
                repeatDirection = 1;
        }
        this.createUnit("wall", firstPos, repeatDirection);
    }

    createRandomBarrier(pos: Laya.Vector3): GameObjcet {
        var obj = this.ctrl.createRandomBarrier();
        var s = obj.getComponent(GameObjcet) as GameObjcet;
        s.setLevelCtrl(this, this.ctrl);
        pos.y = obj.transform.localPositionY + 0.1;
        obj.transform.localPosition = pos;
        this.objs.push(obj);
        return s;
    }

    createUnit(name: string, pos: Laya.Vector3, direction: number = null): GameObjcet {
        var obj = this.ctrl.createBarrier(name);
        var s = obj.getComponent(GameObjcet) as GameObjcet;
        s.setLevelCtrl(this, this.ctrl);
        pos.y = obj.transform.localPositionY + 0.1;
        obj.transform.localPosition = pos;
        this.objs.push(obj);
        if (direction != null) {
            if (direction == 1) {
                obj.transform.rotationEuler = new Laya.Vector3(0, 90, 0);
            } else {
                obj.transform.rotationEuler = new Laya.Vector3(0, 0, 0);
            }
        }
        return s;
    }

    createCar(carType: number, direction: number, pos: Position): Car {
        var car = this.ctrl.createCar("car0", carType);
        var s = car.getComponent(Car) as Car;
        s.setLevelCtrl(this, this.ctrl);
        s.init(carType, direction, this.cars.length);

        // var material = (s.sprite as Laya.MeshSprite3D).meshRenderer.material as (Laya.BlinnPhongMaterial);
        // var offset = this.cars.length + 1;
        // material.albedoColorB *= Math.pow(0.8, offset);
        // material.albedoColorG *= Math.pow(0.8, offset);
        // material.albedoColorR *= Math.pow(0.8, offset);

        if (direction == 1) {
            pos.addXZ(-s.w*0.5, -s.h*0.5);
        } else {
            pos.addXZ(-s.h*0.5, -s.w*0.5);
        }
        pos.cur.y = car.transform.localPositionY + 0.2;
        car.transform.localPosition = pos.cur;
        s.setLastPos(pos.cur);
        s.setLastIdlePos(pos.cur);

        this.cars.push(s);
        // console.log("car", this.cars.length, pos.cur);

        return s;
    }

    //创建汽车后将汽车在数组中的值重置，防止重复检测
    resetLayouts(car: Car, layouts: any, index: number, w: number, h: number, specifyVal: number = null) {
        var offset = 0;
        var val = specifyVal==null?1:specifyVal;
        if (car.getDirection() == 1) {
            for (var k = 0; k < car.h; k++) {
                for (var n = 0; n < car.w; n++) {
                    layouts[n + index + offset] = val;
                }
                offset += w;
            }
        } else {
            for (var k = 0; k < car.w; k++) {
                for (var n = 0; n < car.h; n++) {
                    layouts[n + index + offset] = val;
                }
                offset += w;
            }
        }
    }

    //判断是否是车
    isCar(value: number) {
        value = Math.floor(value/10);
        return (value === 2 || value === 3 || value === 4);
    }

    //判断是否是外墙
    isWall(value: number) {
        return (value === 5);
    }

    //判断是否是障碍物
    isBarrier(value: number) {
        return (value === 6);
    }

    //获取汽车类型
    getCarType(value: number): number {
        value = Math.floor(value/10);
        if (value === 2)
            return 0;
        else if (value === 3)
            return 1;
        else if (value === 4)
            return 2;
        return 0;
    }

    randomRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    canCreateCar(layouts: Array<number>, index: number, w: number, prop: CarType, direction: number): boolean {
        var offsetRow = prop.w;
        var offsetLine = prop.h;
        if (direction === 0) {
            offsetRow = prop.h;
            offsetLine = prop.w;
        }
        if ((index + offsetRow) % w > index % w 
            && index < layouts.length - w * 2
            && layouts[index] == 1
            && layouts[index + offsetRow] == 1
            && layouts[index + w * offsetLine] == 1
            && layouts[index + offsetRow + w * offsetLine] == 1)
            return true;
        return false;
    }

    getCarNum(): number {
        return this.carNum;
    }

    subCarNum() {
        this.carNum -= 1;
    }

    isOver(): boolean {
        return (this.carNum === 0);
    }

    clearObjs() {
        for (var k in this.objs) {
            this.objs[k].destroy();
        }
        this.objs = [];
    }

    clearCars() {
        for (var k in this.cars) {
            var car = this.cars[k];
            Laya.Tween.clearAll(car.sprite);
            this.cars[k].setState(CarState.None);
            this.cars[k].sprite.destroy();
        }
        this.cars = [];
    }

    deleteCar(index: number) {
        for (var i = 0; i < this.cars.length; i++) {
            var car = this.cars[i];
            if (car.index == index) {
                this.cars.splice(i, 1);
                break;
            }
        }
    }

    adjustScenePosition(w: number, h: number) {
        var offsetW = w - this.defaultSize.width;
        var offsetH = h - this.defaultSize.height;
        var x = 0;
        var z = 0;
        if (w >= 8) {
            x = - offsetW - 1;
        }
        if (h >= 3) {
            z = - offsetH;
        }
        console.log("offsetW", offsetW, offsetH);
        var plane = this.ctrl.getStreet("plane").getComponent(Plane) as Plane;
        // plane.setAnchorOffset(0, z);
        this.ctrl.setParkSceneOffset(0, z);

        var longer = w;
        // if (h > w)
        //     longer = h;
        
        var field = longer + 10;
        var maxY = -5;
        var maxZ = 15;
        var offsetX = 0;
        var offsetZ = maxZ / 11 * offsetW;
        var offsetY = 0;

        var _abs = w - h;
        if (Math.abs(_abs) > 1) {
            offsetX = _abs * 0.4;
        }
        
        if (h > 10) {
            offsetY = -5 / 5 * (h - 11);
        }
        // if (h > w)
        //     offsetY += h - w + 3;
        console.log("setCameraProps", offsetX, offsetY, offsetZ);
        this.ctrl.setCameraProps(field, offsetX, offsetY, offsetZ);
        // var spPlane = this.ctrl.getStreet("plane") as Laya.Sprite3D;
        // var out = new Laya.Vector3(0, 180, 0);
        // var position = spPlane.transform.localPosition.clone();
        // this.ctrl.camera.camera.transform.getUp(out);
        // position.x += 0.5;
        // this.ctrl.camera.camera.transform.lookAt(position, out, true);
    }

    checkCarOnRoad() {
        for (var car of this.cars) {
            if (car.getState() == CarState.MoveAction)
                return true;
        }
        return false;
    }

    gameTip() {
        var canTip = true;
        for (var car of this.cars) {
            if (car.getState() != CarState.Idle) {
                canTip = false;
                break;
            }
        }
        if (this.cars.length == 0) canTip = false;
        if (canTip)
            EventMgr.instance.dispatch(EventDef.Game_Tip);
    }

    setLevelLayouts(car: Car, lastStart: number) {
        this.resetLayouts(
            car, this.levelLayouts, lastStart, 
            this.mapSize.width, this.mapSize.height);
        this.resetLayouts(
            car, this.levelLayouts, car.startInLayout, 
            this.mapSize.width, this.mapSize.height, car.val);
    }

    clearCarInLayouts(car: Car, start: number) {
        this.resetLayouts(
            car, this.levelLayouts, start, 
            this.mapSize.width, this.mapSize.height);
    }

    getLevelLayouts(): Array<number> {
        return this.levelLayouts;
    }

    getCars(): Array<Car> {
        return this.cars;
    }

    getMapSize(): Laya.Size {
        return this.mapSize;
    }

}