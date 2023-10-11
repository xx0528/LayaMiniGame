import Carframe, { FrontBackVectorPair, AxleInfo, WheelRaycastResult } from "./Carframe";
import FSMStateMachine from "../StateMachine/FSMStateMachine";
import Utilit_ from "../../Utilit";
import Event_ppxhc_Mgr from "../../Event/EventMgr";
import { Event_ppxhc_Def } from "../../Event/EventDef";
import CargoMgr from "../Cargoes/CargoMgr";
import PhysicTrigger3d from "../Tools/PhysicTrigger3d";
import CarMgr from "./CarMgr";
import BaseBuffer from "./CarBuffer/BaseBuffer";
import Game from "../Game";
import Sound_ppxhc_Mgr from "../../Mgr/SoundMgr";
import Vibrate_ppxhc_Mgr from "../../Mgr/VibrateMgr";

var getHandler = Laya.Handler.create;
export default class HillCar extends Carframe {
    public radius: number = 0.5;
    public TurnStrength: number = 5000;
    public ForwardAcceleration: number = 5000;
    public ForwardDeceleration: number = 2500;
    public CargoTransferPoints: Laya.Sprite3D;
    public loadedCargos: Laya.Sprite3D[] = [];

    public carMachine: FSMStateMachine = null;
    public m_forward: Laya.Vector3 = new Laya.Vector3;
    public m_groundForward: FrontBackVectorPair = null;

    private defRotateSpeed: number = 50;
    private rotateSpeed: number = this.defRotateSpeed;
    public head: Laya.Transform3D = null;
    private buffers: { [id: string]: BaseBuffer } = {};
    private frontWheels: Laya.Sprite3D[] = [];
    private backWheels: Laya.Sprite3D[] = [];
    private backTrails: Laya.Sprite3D[] = [];
    private speedUpdaPosition: Laya.Sprite3D = null;
    private danqiEffect: Laya.Sprite3D = null;

    private targetPosition: Laya.Vector3 = new Laya.Vector3;
    private cargoTrigger: Laya.Sprite3D = null;
    private findTargetComplete: Laya.Handler = null;

    public onAwake(): void {
        super.onAwake();

        this.SuspensionLength = 1;
        this.SuspensionForce = 2000;
        this.AntiRollForce = 1000;

        this.CargoTransferPoints = this.owner.getChildByName("CargoPosition") as Laya.Sprite3D;
        this.frontWheels[0] = Utilit_.FindChild(this.owner, "Wheels/FL") as Laya.Sprite3D;
        this.frontWheels[1] = Utilit_.FindChild(this.owner, "Wheels/FR") as Laya.Sprite3D;
        this.backWheels[0] = Utilit_.FindChild(this.owner, "Wheels/BL") as Laya.Sprite3D;
        this.backWheels[1] = Utilit_.FindChild(this.owner, "Wheels/BR") as Laya.Sprite3D;
        this.backTrails[0] = this.backWheels[0].getChildByName("Trail") as Laya.Sprite3D;
        this.backTrails[1] = this.backWheels[1].getChildByName("Trail") as Laya.Sprite3D;

        this.head = (this.owner.getChildByName("Head") as Laya.Sprite3D).transform;
        let raycasts = this.owner.getChildByName("Raycasts") as Laya.Sprite3D;
        this.SuspensionLength = raycasts.transform.localPositionY + this.radius;
        let frontLeft = raycasts.getChildByName("FL") as Laya.Sprite3D;
        let frontRight = raycasts.getChildByName("FR") as Laya.Sprite3D;
        let backLeft = raycasts.getChildByName("BL") as Laya.Sprite3D;
        let backRight = raycasts.getChildByName("BR") as Laya.Sprite3D;
        this.AddFrontWheel(frontLeft, frontRight);
        this.AddBackWheel(backLeft, backRight);
        this.speedUpdaPosition = this.owner.getChildByName("SpeedUpPosition") as Laya.Sprite3D;
        this.danqiEffect = this.owner.getChildByName("Fx_danqi") as Laya.Sprite3D;

        this.cargoTrigger = this.owner.getChildByName("CargoTrigger") as Laya.Sprite3D;
        let trigger = PhysicTrigger3d.GetTrigger(this.cargoTrigger);
        trigger.OnTriggerEnter(this, this.OnCargoTriggerEnter);
        trigger.OnTriggerExit(this, this.OnCargoTriggerExit);

        this.carMachine = new FSMStateMachine;
        this.carMachine.AddAction("Stand", this, null, null, this.OnStandUpdate);
        this.carMachine.AddAction("SpeedUp", this, null, this.OnSpeedUpExit, this.OnSpeedUpUpdate);
        this.carMachine.AddAction("SpeedDown", this, this.OnSpeedDownEnter, this.OnSpeedDownExit, this.OnSpeedDownUpdate);
        this.carMachine.AddAction("ShutDown", this, this.OnShutDownEnter, this.OnShutDownExit, this.OnShutDownUpdate);
        this.carMachine.AddAction("FindTarget", this, this.OnFindTargetEnter, this.OnFindTargetExit, this.OnFindTargetUpdate);
        this.carMachine.AddAction("Death", this, this.OnDeathEnter);
    }

    public SetTarget(position: Laya.Vector3): void {
        position.cloneTo(this.targetPosition);
    }

    public SetShutDown(): void {
        this.carMachine.Switch("ShutDown");
    }

    public SetSpeedUp(): void {
        this.carMachine.Switch("SpeedUp");
        //Sound_ppxhc_Mgr.instance.playSound("normalDriving");
    }

    public SetSpeedUpOver(): void {
        this.carMachine.Switch("SpeedDown");
        //Sound_ppxhc_Mgr.instance.playSound("刹车");
    }

    public SetUnload(position: Laya.Vector3, complete: Laya.Handler): void {
        this.carMachine.Switch("FindTarget", [position, complete]);
    }

    private OnShutDownEnter(): void {
        this.rigidbody.linearFactor = new Laya.Vector3(0, 1, 0);
    }

    private OnShutDownExit(): void {
        this.rigidbody.linearFactor = new Laya.Vector3(1, 1, 1);
    }

    private OnShutDownUpdate(): void {
        let velocity = this.rigidbody.linearVelocity;
        velocity.setValue(0, velocity.y, 0);
        this.rigidbody.linearVelocity = velocity;
    }

    private OnStandUpdate(): void {
    }

    private OnSpeedUpUpdate(): void {
        if (!this.m_groundForward.IsOr) {
            return;
        }
        var force = new Laya.Vector3;
        Laya.Vector3.scale(this.m_forward, this.ForwardAcceleration, force);
        let localOffset = new Laya.Vector3;
        Laya.Vector3.subtract(this.speedUpdaPosition.transform.position, this.transform.position, localOffset);
        this.rigidbody.applyForce(force, localOffset);
    }

    private OnSpeedUpExit(): void {
    }

    private OnSpeedDownEnter(): void {
        this.rotateSpeed = 0;
        for (let i = 0; i < this.backWheels.length; i++) {
            this.backWheels[i].transform.localRotationEulerX = 0;
        }
    }

    private OnSpeedDownUpdate(): void {
        var axle = this.axleInfos[1];
        var forwardNormal = new Laya.Vector3;
        Laya.Vector3.normalize(this.m_forward, forwardNormal);
        var velocityNormal = new Laya.Vector3;
        Laya.Vector3.normalize(this.rigidbody.linearVelocity, velocityNormal);
        let length = Laya.Vector3.scalarLength(this.rigidbody.linearVelocity);
        let dot = Laya.Vector3.dot(velocityNormal, forwardNormal);
        if (dot < 0.2 || ((dot * length)) < 4) {
            this.carMachine.Switch("Stand");
        }
        else {
            if (this.axleInfos[1].LastLeftWheelResult == null) {
                this.ClearTrail(0);
            }
            else {
                this.CreateTrail(0);
            }

            if (this.axleInfos[1].LastRightWheelResult == null) {
                this.ClearTrail(1);
            }
            else {
                this.CreateTrail(1);
            }
        }
    }

    private OnSpeedDownExit(): void {
        this.rotateSpeed = this.defRotateSpeed;
        this.ClearTrail(0);
        this.ClearTrail(1);
    }

    private OnFindTargetEnter(position: Laya.Vector3, complete: Laya.Handler): void {
        position.cloneTo(this.targetPosition);
        this.findTargetComplete = complete;
        this.rigidbody.linearVelocity = new Laya.Vector3();
    }

    private OnFindTargetExit(): void {
        this.rigidbody.linearVelocity = new Laya.Vector3();
    }

    private OnFindTargetUpdate(): void {
        var normal = new Laya.Vector3;
        Laya.Vector3.subtract(this.targetPosition, this.transform.position, normal);
        Laya.Vector3.normalize(normal, normal);
        Laya.Vector3.scale(normal, 7, normal);
        this.rigidbody.linearVelocity = normal;
        let distanceSqr = Laya.Vector3.distanceSquared(this.transform.position, this.targetPosition);
        if (distanceSqr <= 0.1) {
            this.findTargetComplete != null && this.findTargetComplete.run();
            this.SetShutDown();
        }
    }

    private OnDeathEnter(): void {
        Vibrate_ppxhc_Mgr.vibrate_ppxhc_Long();
        Sound_ppxhc_Mgr.instance_.play_ppxhc_Sound("death");
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Car_Death);
    }

    private OnCargoTriggerEnter(self, other: Laya.PhysicsComponent): void {
        var cargo = other.owner as Laya.Sprite3D;
        if (cargo.name.search("Cargoe") < 0) {
            return;
        }

        let index = this.loadedCargos.indexOf(cargo);
        if (index == -1) {
            this.loadedCargos.push(cargo);
        }
    }

    private OnCargoTriggerExit(self, other: Laya.PhysicsComponent): void {
        var cargo = other.owner as Laya.Sprite3D;
        if (cargo.name.search("Cargoe") < 0) {
            return;
        }

        let index = this.loadedCargos.indexOf(cargo);
        if (index != -1) {
            this.loadedCargos.splice(index, 1);
        }
    }

    protected OnCarTransform(): void {
        Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Car_Moving, [this, this.head.position]);

        this.UpdateBuffers();
        this.UpdateCurrentGroundForward();
        this.carMachine.Update();
        this.OrientationTarget(this.targetPosition);

        this.CheckCarState();
        this.CorrectionWheelRotation(this.frontWheels, true);
        this.CorrectionWheelRotation(this.backWheels, false);
        this.CorrectionWheelPosition(this.frontWheels, this.axleInfos[0]);
        this.CorrectionWheelPosition(this.backWheels, this.axleInfos[1]);
    }

    private UpdateCurrentGroundForward(): void {
        var groundForward = this.GetGroundBasedForward();
        if (groundForward.IsSet) {
            groundForward.Heading.cloneTo(this.m_forward);
        } else {
            let forward = new Laya.Vector3;
            this.transform.getForward(forward);
            Laya.Vector3.normalize(forward, forward);
            Laya.Vector3.scale(forward, -1, forward);
            forward.cloneTo(this.m_forward);
        }

        this.m_groundForward = groundForward;
    }

    public AddTurnForce(force: Laya.Vector3): void {
        let localOffset = new Laya.Vector3;
        Laya.Vector3.subtract(this.head.position, this.transform.position, localOffset);
        this.rigidbody.applyForce(force, localOffset);
    }

    private OrientationTarget(target: Laya.Vector3, scale: number = 1): void {
        var forwardNormal = new Laya.Vector3;
        Laya.Vector3.normalize(this.m_forward, forwardNormal);
        var velocityNormal = new Laya.Vector3;
        Laya.Vector3.normalize(this.rigidbody.linearVelocity, velocityNormal);
        let length = Laya.Vector3.scalarLength(this.rigidbody.linearVelocity);
        let dot = Laya.Vector3.dot(velocityNormal, forwardNormal);

        if (length > 2 && dot > 0.1) {
            var relativeWaypointPosition = new Laya.Vector3;
            Utilit_.InverseTransformPoint(this.transform, new Laya.Vector3(target.x, this.transform.position.y, target.z), relativeWaypointPosition);
            relativeWaypointPosition.y = 0;
            var value = relativeWaypointPosition.x / Laya.Vector3.scalarLength(relativeWaypointPosition);
            var turnforce = new Laya.Vector3(1, 0, 0);
            Utilit_.QuaternionVector3(this.transform.rotation, turnforce, turnforce);
            Laya.Vector3.scale(turnforce, value * this.TurnStrength * scale, turnforce);
            this.AddTurnForce(turnforce);
        }

        if (this.m_groundForward.IsSet && dot > 0.1) {
            var rotation = new Laya.Quaternion;
            Utilit_.FromToRotation(velocityNormal, forwardNormal, rotation);
            Utilit_.QuaternionVector3(rotation, velocityNormal, velocityNormal);
            Laya.Vector3.scale(velocityNormal, length, velocityNormal);
            this.rigidbody.linearVelocity = velocityNormal;

            // var originV = new Laya.Vector3;
            // Laya.Vector3.scale(forwardNormal, dot * length, originV);
            // let velocity = this.rigidbody.linearVelocity.clone();
            // Laya.Vector3.subtract(velocity, originV, velocity);
            // var rotation = new Laya.Quaternion;
            // Laya.Vector3.normalize(originV, velocityNormal);
            // Utilit.FromToRotation(forwardNormal, velocityNormal, rotation);
            // Utilit.QuaternionVector3(rotation, velocityNormal, velocityNormal);
            // Laya.Vector3.scale(velocityNormal, dot * length, velocityNormal);
            // Laya.Vector3.add(velocity, velocityNormal, velocity);
            // this.rigidbody.linearVelocity = velocity;
        }
    }

    private CorrectionWheelPosition(wheels: Laya.Sprite3D[], axis: AxleInfo): void {
        for (let i = 0; i < wheels.length; i++) {
            let wheel = wheels[i];
            let wheelResult: WheelRaycastResult = null;
            let position = new Laya.Vector3;
            (i == 0) && (wheelResult = axis.LastLeftWheelResult);
            (i == 1) && (wheelResult = axis.LastRightWheelResult);
            if (wheelResult != null) {
                wheelResult.ImpactPoint.cloneTo(position);
                Utilit_.InverseTransformPoint(wheel.transform._parent, position, position);
                Laya.Vector3.add(position, new Laya.Vector3(0, this.radius, 0), position);
            }
            else {
                wheel.transform.localPosition.cloneTo(position);
            }
            // let threshold = this.radius;
            // position.y = Math.max(-threshold, Math.min(position.y, threshold));
            let newPostion = wheel.transform.localPosition;
            Laya.Vector3.lerp(newPostion, position, 0.5, newPostion);
            wheel.transform.localPosition = newPostion;
        }
    }

    private CorrectionWheelRotation(wheels: Laya.Sprite3D[], IsFront: boolean): void {
        let velocityNormal = new Laya.Vector3;
        let length = Laya.Vector3.scalarLength(this.rigidbody.linearVelocity);
        if (length == 0) {
            return;
        }
        Laya.Vector3.scale(this.rigidbody.linearVelocity, 1 / length, velocityNormal);
        let dot = Laya.Vector3.dot(velocityNormal, this.m_forward);
        let speed = length * dot;

        var rotateSpeed = speed * (Laya.timer.delta / 1000) * this.rotateSpeed;
        for (let i = 0; i < wheels.length; i++) {
            wheels[i].transform.localRotationEulerX += rotateSpeed;
        }

        if (IsFront) {
            const maxWheelAngle = 45;
            var relativePosition = new Laya.Vector3;
            Utilit_.InverseTransformPoint(this.transform, new Laya.Vector3(this.targetPosition.x, this.transform.position.y, this.targetPosition.z), relativePosition);
            relativePosition.y = 0;
            Laya.Vector3.normalize(relativePosition, relativePosition);
            var wheelAngle = Utilit_.Vector3Angle(new Laya.Vector3(0, 0, 1), relativePosition, 1);
            wheelAngle = Math.max(-maxWheelAngle, Math.min(maxWheelAngle, wheelAngle));
            var curWheelAngle = wheels[0].transform.localRotationEulerY;
            curWheelAngle = Utilit_.LerpNumber(curWheelAngle, wheelAngle, 0.2);
            for (let i = 0; i < wheels.length; i++) {
                wheels[i].transform.localRotationEulerY = curWheelAngle;
            }
        }
    }

    private CheckCarState(): void {
        for (let i = 0; i < this.axleInfos.length; i++) {
            let axle = this.axleInfos[i];
            if ((axle.LastLeftWheelResult != null && axle.LastLeftWheelResult.Hit.collider.owner.name == "Plane") ||
                (axle.LastRightWheelResult != null && axle.LastRightWheelResult.Hit.collider.owner.name == "Plane")) {
                this.carMachine.Switch("Death");
            }
        }
    }

    private UpdateBuffers(): void {
        for (let key in this.buffers) {
            let buffer = this.buffers[key];
            if (!buffer.TryUpdateBuffer(this)) {
                this.buffers[key].Stop(this);
                delete this.buffers[key];
            }
        }
    }

    public onCollisionEnter(collision: Laya.Collision): void {
        let name = collision.other.owner.name.toLocaleLowerCase();
        if (name == "plane") {
            this.carMachine.Switch("Death");
        }
        else if (name.search("cargoe") >= 0) {
            let rigidbody = collision.other.owner.getComponent(Laya.Rigidbody3D);
            let velocity = new Laya.Vector3;
            Laya.Vector3.subtract(this.rigidbody.linearVelocity, rigidbody.linearVelocity, velocity)
            let length = Laya.Vector3.scalarLength(velocity);
            if (length > 4) {
                Vibrate_ppxhc_Mgr.vibrate_ppxhc_Short();
            }
        }
    }

    public AddBuffer(buffer: BaseBuffer, isCover: boolean): void {
        if (this.buffers[buffer._name] != null && !isCover) {
            return;
        }
        this.buffers[buffer._name] = buffer;
        buffer.Start(this);
    }

    public SetSpeedUpEffect(active: boolean): void {
        let activeSelf = this.danqiEffect.active;
        if (activeSelf == active) {
            return;
        }
        this.danqiEffect.active = active;
        if (active) {
            Game.CameraFollow.TweenOffset(0, 0, -3, 1);
            Sound_ppxhc_Mgr.instance_.play_ppxhc_Sound("speedUp");
        } else {
            Game.CameraFollow.TweenOffset(0, 0, 0, 2);
            Sound_ppxhc_Mgr.instance_.play_ppxhc_Sound("speedUpOver");
        }
    }

    public CreateTrail(index: number): void {
        if (this.backTrails[index]._children.length != 0)
            return;
        CarMgr.Instance.CreateTrail(this.backTrails[index], 0);
    }

    public ClearTrail(index: number): void {
        for (let i = 0; this.backTrails[index]._children.length; i++) {
            let trail = this.backTrails[index]._children[i] as Laya.Sprite3D;
            trail.removeSelf();
            Game.Scene.addChild(trail);
            Laya.timer.once(2 * 1000, this, () => {
                trail.removeSelf();
                trail.destroy(true);
            });
        }
    }
}

export class WheelAxis {
    public wheels: Laya.Sprite3D[] = [];
    public wheelMesh: Laya.Sprite3D[] = [];
}