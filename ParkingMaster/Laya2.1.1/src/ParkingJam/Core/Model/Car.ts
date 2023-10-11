import GameObjcet from "./GameObject";
import { CarState } from "../../Constants";
import EventMgr from "../../../Event/EventMgr";
import { EventDef } from "../../../Event/EventDef";
import SoundMgr from "../../../Mgr/SoundMgr";
import Wall from "./Wall";
import AnimatorCtrl from "../../Util/Animator";
import VibrateMgr from "../../../Mgr/VibrateMgr";

export class CarType {
    w: number;
    h: number;
    val: number;
}

export default class Car extends GameObjcet {
    public tipDirection: number = -1;

    public val: number;

    public index: number;

    public startInLayout: number;

    private carTypes: Array<CarType> = [
        {"w": 2, "h": 3, val: 20},
        {"w": 2, "h": 4, val: 30},
        {"w": 2, "h": 5, val: 40},
    ];

    private _touchPoint: Laya.Point = new Laya.Point(0, 0);

    private _direction: number = 0;

    private _type: number;

    private _angle: number;

    private vector: Laya.Vector3 = new Laya.Vector3(0, 0, 0);

    private speed: number = 0.2;

    //标记是否是当前触摸选中的车辆
    private _curSelected: boolean = false;

    private streetsVect: Array<Laya.Vector3> = [];

    protected inCol:boolean = false;

    protected timerIsOn:boolean = false;

    private dt:number = 0;

    private readonly scaleFactor:number = 0.9;

    private lastIdlePos: Laya.Vector3 = new Laya.Vector3(0, 0, 0);

    private startRotation: boolean = false;

    // private isTweenAct: boolean = false;
    private colliding: boolean = false;

    private collideStay: boolean = false;

    private turnAngleDelta: number = 10;

    private isFan: boolean = false;

    private timer: Laya.Timer;

    constructor() { super(); }

    onAwake() {
        this.sprite = this.owner as Laya.Sprite3D;
        this.sprite.transform.localScaleX = this.scaleFactor;
        this.sprite.transform.localScaleY = this.scaleFactor;
        this.sprite.transform.localScaleZ = this.scaleFactor;
        this.animCtrl = this.owner.addComponent(AnimatorCtrl);
    }

    onEnable() {
        this.setState(CarState.Idle);
    }

    onDisable() {
    }

    onUpdate() {
        this.dt += 1;
        if (this.getState() == CarState.Move || this.getState() == CarState.MoveAction) {
            var lastState = this.getState();
            if (lastState == CarState.MoveAction && this.dt > 10) {
                SoundMgr.instance.playSound("car_run");
                this.dt = 0;
            }
            this.move();
        }
        else if (this.getState() == CarState.Collide) {
            //TODO 播放动画
            this.setState(CarState.CollideAction);
            if (!this.timerIsOn) {
                this.timerIsOn = true;
                Laya.timer.once(500, this, function(){
                    this.setState(CarState.Idle);
                    this.timerIsOn = false;
                    this.colliding = false;
                })
            }
        }
    }

    onMouseDown(): void {
        // if (this.isTweenAct) return;
        if (!this.getGameCtrl().game3dStartFlag) return;
        if (this.getState() != CarState.Idle) return;
        this._touchPoint.setTo(Laya.stage.mouseX, Laya.stage.mouseY);
        this._curSelected = true;
    }

    onMouseUp(): void {
        if (!this.getGameCtrl().game3dStartFlag) return;
        // console.log("car state", this.getState());
        // if (this.isTweenAct) return;
        if (this.getState() != CarState.Idle) return;
        var cur = new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY);
        var vect = new Laya.Vector2(this._touchPoint.x - cur.x, this._touchPoint.y - cur.y);
        var unit = new Laya.Vector2(0, 0);
        if (vect.y == 0 && vect.x == 0) return;
        if (this._direction == 1) {
            if (vect.y == 0)
                this.vector.z = 0;
            else
                this.vector.z = vect.y / Math.abs(vect.y);
            if (this.sprite.transform.rotationEuler.y == 180)
                this.vector.z = -this.vector.z;
            // console.log(this.sprite.transform.rotationEuler.y);
        } else {
            if (vect.x == 0)
                this.vector.z = 0;
            else
                this.vector.z = vect.x / Math.abs(vect.x);
            if (this.sprite.transform.rotationEuler.y == -90)
                this.vector.z = -this.vector.z;
            // console.log(this.sprite.transform.rotationEuler.y);
        }
        this.setState(CarState.Move);
        // SoundMgr.instance.playBGM("car_run");
        SoundMgr.instance.playSound("car_shache");
        // this.sprite.transform.localPositionX
        // Laya.Tween.to(this.sprite.transform, {localPositionX: 100}, 500);  
        EventMgr.instance.dispatch(EventDef.AD_HoriBanner_Enable, false);
        EventMgr.instance.dispatch(EventDef.Game_Guide, {visible: false});
        this.colliding = false;
        VibrateMgr.vibrateShort();
    }

    onTriggerEnter(other: Laya.PhysicsComponent) {
        // if (this.isTweenAct) return;
        if (this.colliding) return;
        this.colliding = true;
        this.collision(other);
        
    }

    onTriggerStay(other: Laya.PhysicsComponent) {
        if (this.colliding) return;
        if (this.collideStay) return;
        this.colliding = true;
        this.collision(other);
    }

    collision(other: Laya.PhysicsComponent) {
        if (this.owner.destroyed) return;
        if (this.getState() == CarState.Idle) {
            this.colliding = false;
            this.shakeAct(3);
        }
        if (this.getState() != CarState.Move) {
            if (other.owner.name == "destinaion2") {
                this.getGameCtrl().playEndAction(true);
                Laya.timer.clear(this.getGameCtrl(), this.getGameCtrl().playEndOffCaller);
                Laya.timer.once(1500, this.getGameCtrl(), this.getGameCtrl().playEndOffCaller);
            }
            if (other.owner.name == "destinaion") {
                var ctrl = this.getLevelCtrl();
                //延迟移除，防止再次触发trigger报错
                Laya.timer.once(1500, this, ()=>{
                    this.sprite.destroy();
                    this.destroy();
                });
                ctrl.deleteCar(this.index);
                if (this.startInLayout >= 0)
                    this.getLevelCtrl().clearCarInLayouts(this, this.startInLayout);
                // if (!this.getLevelCtrl().checkCarOnRoad())
                //     SoundMgr.instance.stopBGM();
                VibrateMgr.vibrateShort();
                SoundMgr.instance.playSound("car_out");
                ctrl.subCarNum();
                this.getGameCtrl().createParticle();
                if (ctrl.isOver()) {
                    Laya.timer.once(500, this, ()=>{
                        EventMgr.instance.dispatch(EventDef.AD_HoriBanner_Enable, true);
                        EventMgr.instance.dispatch(EventDef.Game_OnLevelComplate);
                    });
                }
                else {
                    if (this.getGameCtrl().isGuide)
                        this.getLevelCtrl().gameTip();
                }
            }
            return;
        }
        if (this.getState() != CarState.Idle) {
            if (this.sprite.getChildByName("biaoqing_1"))
                this.sprite.removeChildByName("biaoqing_1");
            this.sprite.addChild(this.getGameCtrl().getEmotionSp(this));
            if (other.owner.name.indexOf("car") >= 0) {
                if (other.owner.getChildByName("biaoqing_1"))
                    other.owner.removeChildByName("biaoqing_1");
                other.owner.addChild(this.getGameCtrl().getEmotionSp(other.owner.getComponent(Car)));
            }
        }
        if (this.startRotation) return;
        var otherCar = other.owner.getComponent(Car) as Car;
        if (otherCar && (otherCar.getState() == CarState.MoveAction || otherCar.getState() == CarState.Move)) {
            SoundMgr.instance.playSound("laba");
            Laya.timer.once(1000, this, ()=>{
                this.colliding = false;
                this.setState(CarState.Move);
                EventMgr.instance.dispatch(EventDef.Game_Guide, {visible: false});
            });
        } else {
            VibrateMgr.vibrateShort();
            SoundMgr.instance.playSound("collide");
        }
        if (otherCar && otherCar.getState() == CarState.MoveAction) {}
        else if (this.startInLayout >= 0) {
            var mapSize = this.getLevelCtrl().getMapSize();
            var line = this.startInLayout % mapSize.width;
            var row = Math.floor(this.startInLayout / mapSize.width);
            var anchor = this.getGameCtrl().getPlaneAnchor();
            var moveX = anchor.x - line;
            var moveZ = anchor.z - row + mapSize.height;
            if (this._direction == 1) {
                moveX -= this.w * 0.5;
                moveZ -= this.h * 0.5;
            } else {
                moveX -= this.h * 0.5;
                moveZ -= this.w * 0.5;
            }
            this.sprite.transform.localPositionX = moveX;
            this.sprite.transform.localPositionZ = moveZ;
        }
        this.setState(CarState.Collide);
    }

    updateLevelLayout() {
        var xDis = Math.round(this.sprite.transform.localPositionX - this.lastIdlePos.x);
        var zDis = Math.round(this.sprite.transform.localPositionZ - this.lastIdlePos.z);
        var lastStart = this.startInLayout;
        var layouts = this.getLevelCtrl().getLevelLayouts();
        var mapSize = this.getLevelCtrl().getMapSize();
        if (Math.abs(xDis) >= 1) {
            this.lastIdlePos.x = this.sprite.transform.localPositionX;
            this.startInLayout -= xDis;

            if (xDis > 0) {
                if (layouts[this.startInLayout] != 1 || layouts[this.startInLayout + mapSize.width] != 1) {
                    this.startInLayout = lastStart;
                }
            } else {
                if (layouts[this.startInLayout + (this.h - 1)] != 1 || layouts[this.startInLayout + mapSize.width + (this.h - 1)] != 1) {
                    this.startInLayout = lastStart;
                }
            }
        }
        if (Math.abs(zDis) >= 1) {
            this.lastIdlePos.z = this.sprite.transform.localPositionZ;
            this.startInLayout -= zDis * mapSize.width;

            if (zDis > 0) {
                if (layouts[this.startInLayout] != 1 || layouts[this.startInLayout + 1] != 1) {
                    this.startInLayout = lastStart;
                }
            } else {
                if (layouts[this.startInLayout + (this.h - 1) * mapSize.width] != 1 || layouts[this.startInLayout + (this.h - 1) * mapSize.width + 1] != 1) {
                    this.startInLayout = lastStart;
                }
            }
        }
        if (lastStart != this.startInLayout)
            this.getLevelCtrl().setLevelLayouts(this, lastStart);
    }

    shakeAct(time: number): void {
        if(!this.inCol){
            this.inCol = true
            time -= 1;
            var z = Math.random()*0.1 + 0.9;
            var x = Math.random()*0.1 + 0.9;
            var y = Math.random()*0.1 + 0.9;
            if (time == 0) {
                this.inCol = false
                z = this.scaleFactor
                x = this.scaleFactor
                y = this.scaleFactor
            }
            // console.log("shakeAct", z);
            var transform = this.sprite.transform;
            if (this.sprite.destroyed) return;
            Laya.Tween.to(transform, {localScaleX:x, localScaleY:y, localScaleZ:z}, 50, null, Laya.Handler.create(this, ()=>{
                if (time > 0) {
                    this.inCol = false
                    this.shakeAct(time);
                }
            }))
        }

    }

    init(_type: number, direction: number, index: number): void {
        var cfg = this.carTypes[_type];
        this.w = cfg.w;
        this.h = cfg.h;
        this.val = cfg.val + direction;
        this._type = _type;
        this.index = index;
        this.setDirection(direction);

        var spUp = this.getGameCtrl().getStreet("street0") as Laya.Sprite3D;
        var spDown = this.getGameCtrl().getStreet("street4") as Laya.Sprite3D;
        var spRight = this.getGameCtrl().getStreet("street2") as Laya.Sprite3D;
        var spLeft = this.getGameCtrl().getStreet("street5") as Laya.Sprite3D;
        var posUp = spUp.transform.localPosition.clone();
        var posDown = spDown.transform.localPosition.clone();
        // console.log("car init", posUp);
        this.streetsVect.push(posUp);
        this.streetsVect.push(spRight.transform.localPosition.clone());
        this.streetsVect.push(posDown);
        this.streetsVect.push(spLeft.transform.localPosition.clone());
        this.streetsVect[3].x += 1;
        this.streetsVect[1].x -= 1.5;
        this.streetsVect[0].z += 1.5;
        this.streetsVect[2].z += 1.5;
        console.log("streetsVect z",this.streetsVect[0].z)
        
        // this.streetsVect[2].x += 1;

        var compo = this.owner.getComponent(Laya.PhysicsComponent) as Laya.PhysicsComponent;
        compo.ccdMotionThreshold = 0.01;
    }

    setDirection(val: number) {
        //车方向只分竖向和横向，朝向上的角度随机
        var angles = [];
        if (val == 1) {
            angles = [0, 180];
        } else {
            angles = [90, -90];
        }
        this._direction = val;
        this._angle = angles[Math.round(Math.random())];
        this.sprite.transform.rotationEuler = new Laya.Vector3(0, this._angle, 0);
    }

    getDirection() {
        return this._direction;
    }

    getAngle(): number {
        return this._angle;
    }

    getCarProp(_type: number): CarType{
        return this.carTypes[_type];
    }

    getCarType(): number {
        return this._type;
    }

    move(): void {
        this.setLastPos(this.sprite.transform.localPosition);

        var vect = this.vector.clone();
        var pos = this.sprite.transform.localPosition;
        if (pos.x >= this.streetsVect[3].x - 1) {
            this.setState(CarState.MoveAction);
            vect.z *= this.speed;
            if (pos.x > this.streetsVect[3].x)
                pos.x = this.streetsVect[3].x;
            else
                this.sprite.transform.translate(vect, true);

            if (this.sprite.transform.rotationEuler.y <= -90 && this.sprite.transform.rotationEuler.y > -180) {
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y - this.turnAngleDelta, 0);
            }
            else if (this.sprite.transform.rotationEuler.y <= 270 && this.sprite.transform.rotationEuler.y > 180) {
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y - this.turnAngleDelta, 0);
            }
            else if (this.sprite.transform.rotationEuler.y >= 90 && this.sprite.transform.rotationEuler.y < 180) {
                this.isFan = true;
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y + this.turnAngleDelta, 0);
            } else {
                if (this.isFan) {
                    Laya.timer.once(50, this, ()=>{
                        this.vector.z = -1;
                    });
                }
                else {
                    this.vector.z = -1;
                }
            }
        }
        else if (pos.z <= this.streetsVect[2].z + 1) {
            this.setState(CarState.MoveAction);
            vect.z *= this.speed;
            if (pos.z < this.streetsVect[2].z)
                pos.z = this.streetsVect[2].z;
            else
                this.sprite.transform.translate(vect, true);
            
            if (this.sprite.transform.rotationEuler.y <= 0 && this.sprite.transform.rotationEuler.y > -90) {
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y - this.turnAngleDelta, 0);
            }
            else if (this.sprite.transform.rotationEuler.y >= 180 && this.sprite.transform.rotationEuler.y < 270) {
                this.isFan = true;
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y + this.turnAngleDelta, 0);
            } else {
                if (this.isFan) {
                    Laya.timer.once(50, this, ()=>{
                        this.vector.z = -1;
                    });
                }
                else {
                    this.vector.z = -1;
                }
            }
        }
        else if (pos.x <= this.streetsVect[1].x + 1) {
            this.setState(CarState.MoveAction);
            vect.z *= this.speed;
            if (pos.x < this.streetsVect[1].x)
                pos.x = this.streetsVect[1].x;
            else
                this.sprite.transform.translate(vect, true);
                
            if (this.sprite.transform.rotationEuler.y <= 90 && this.sprite.transform.rotationEuler.y > 0) {
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y - this.turnAngleDelta, 0);
            }
            else if (this.sprite.transform.rotationEuler.y >= -90 && this.sprite.transform.rotationEuler.y < 0) {
                this.isFan = true;
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y + this.turnAngleDelta, 0);
            } else {
                if (this.isFan) {
                    Laya.timer.once(50, this, ()=>{
                        this.vector.z = -1;
                    });
                }
                else {
                    this.vector.z = -1;
                }
            }
        }
        else if (pos.z >= this.streetsVect[0].z - 1) {
            this.setState(CarState.MoveAction);
            vect.z *= this.speed;
            if (pos.z > this.streetsVect[0].z)
                pos.z = this.streetsVect[0].z;
            else
                this.sprite.transform.translate(vect, true);

            if (this.sprite.transform.rotationEuler.y > 90) {
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y - this.turnAngleDelta, 0);
            }
            else if (this.sprite.transform.rotationEuler.y < 90) {
                this.isFan = true;
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y + this.turnAngleDelta, 0);
            } else {
                if (this.isFan) {
                    Laya.timer.once(50, this, ()=>{
                        this.vector.z = -1;
                    });
                }
                else {
                    this.vector.z = -1;
                }
            }
        }
        else {
            vect.z *= this.speed;
            if (vect.z == 0)
                this.setState(CarState.Idle);
            this.sprite.transform.translate(vect, true);
        }

        if (this.startInLayout >= 0) {
            if (this.getState() == CarState.MoveAction) {
                this.getLevelCtrl().clearCarInLayouts(this, this.startInLayout);
                this.startInLayout = -1;
            }
            else
            {
                this.updateLevelLayout();
            }
        }

        if (CarState.MoveAction) {
            this.colliding = false;
            this.collideStay = true;
        }
   }

   setLastIdlePos(pos: Laya.Vector3) {
       this.lastIdlePos = pos.clone();
   }

}