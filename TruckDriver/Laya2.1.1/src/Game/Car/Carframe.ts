import Game from "../Game";
import Utilit_ from "../../Utilit";

export default class Carframe extends Laya.Script3D {
    public readonly layerMask: number = 5;
    public axleInfos: AxleInfo[] = [];
    public rigidbody: Laya.Rigidbody3D = null;
    public SuspensionForce: number = 2000;
    public SuspensionLength: number = 1;
    public Damper: number = 0;
    public AntiRollForce: number = 2000;

    public get transform(): Laya.Transform3D {
        return (this.owner as Laya.Sprite3D).transform;
    }

    public onAwake(): void {
        this.rigidbody = this.owner.getComponent(Laya.Rigidbody3D);
        this.rigidbody.collisionGroup = this.layerMask & ~1;

        this.rigidbody.mass = 70;
        this.rigidbody.linearDamping = 0.9;
        this.rigidbody.angularDamping = 0.999;

        this.rigidbody.overrideGravity = true;
        this.rigidbody.gravity = new Laya.Vector3(0, -30, 0);
    }

    public AddFrontWheel(leftWheel: Laya.Sprite3D, rightWheel: Laya.Sprite3D): void {
        var axle = new AxleInfo();
        axle.IsFront = true;
        axle.LeftWheel = leftWheel;
        axle.RightWheel = rightWheel;
        this.axleInfos.push(axle);
    }

    public AddBackWheel(leftWheel: Laya.Sprite3D, rightWheel: Laya.Sprite3D): void {
        var axle = new AxleInfo();
        axle.IsBack = true;
        axle.LeftWheel = leftWheel;
        axle.RightWheel = rightWheel;
        this.axleInfos.push(axle);
    }

    public onUpdate(): void {
        this.rigidbody.wakeUp();
        for (let i = 0; i < this.axleInfos.length; i++) {
            let t = this.axleInfos[i];
            t.LastLeftWheelResult = this.HandleWheel(t.LeftWheel);
            t.LastRightWheelResult = this.HandleWheel(t.RightWheel);
        }

        for (let i = 0; i < this.axleInfos.length; i++) {
            this.HandleBalance(this.axleInfos[i]);
        }

        this.OnCarTransform();
    }

    protected OnCarTransform(): void {
    }

    protected GetGroundBasedForward(): FrontBackVectorPair {
        var front = Laya.Vector3._ZERO.clone();
        var back = Laya.Vector3._ZERO.clone();

        for (let i = 0; i < this.axleInfos.length; i++) {
            let t = this.axleInfos[i];
            if (t.LastLeftWheelResult == null || t.LastRightWheelResult == null) {
                continue;
            }

            var value = new Laya.Vector3;
            Laya.Vector3.add(t.LastLeftWheelResult.ImpactPoint, t.LastRightWheelResult.ImpactPoint, value);
            Laya.Vector3.scale(value, 0.50, value);

            t.IsFront && (front = value);
            t.IsBack && (back = value);
        }

        var result = new FrontBackVectorPair();
        result.Front = front;
        result.Back = back;

        return result;
    }

    private HandleWheel(wheel: Laya.Sprite3D): WheelRaycastResult {
        let up = this.GetTransformUp(wheel);
        let position = wheel.transform.position.clone();
        let rayDir = new Laya.Vector3();
        Laya.Vector3.scale(up, -1, rayDir);
        let ray = new Laya.Ray(position, rayDir);
        let hitResult = new Laya.HitResult;
        if (!Game.Scene.physicsSimulation.rayCast(ray, hitResult, this.SuspensionLength, 1, 1)) {
            return null;
        }
        
        var distance = Laya.Vector3.distance(ray.origin, hitResult.point);
        var amount = this.Round(1 - distance / this.SuspensionLength, 2);
        var result = new WheelRaycastResult()
        result.Hit = hitResult;
        result.CompressionRatioPre = result.CompressionRatio;
        result.CompressionRatio = amount;
        result.ImpactPoint = hitResult.point.clone();

        var totalForce = new Laya.Vector3;
        var pushBackForce = new Laya.Vector3;
        Laya.Vector3.scale(up, this.SuspensionForce * amount, pushBackForce);
        var damperForce = new Laya.Vector3();
        Laya.Vector3.scale(up, (result.CompressionRatio - result.CompressionRatioPre) * (Laya.timer.delta / 1000) * this.Damper, damperForce);
        Laya.Vector3.add(pushBackForce, damperForce, totalForce);
        
        let wheelPosition = wheel.transform.localPosition.clone();
        Laya.Vector3.subtract(wheelPosition, new Laya.Vector3(0, 5, 0), wheelPosition);
        Utilit_.TransformPoint(wheel.transform, wheelPosition, wheelPosition);

        var localOffset = wheelPosition;
        Laya.Vector3.subtract(localOffset, this.transform.position, localOffset);
        this.rigidbody.applyForce(pushBackForce, localOffset);
        return result;
    }

    private HandleBalance(axle: AxleInfo) {
        var hit : WheelRaycastResult;
        var travelL = 1.0;
        var travelR = 1.0;

        //计算两侧轮胎在不同情况下的悬挂系数
        var groundedL = axle.LastLeftWheelResult;
        if (groundedL) {
            travelL = groundedL.CompressionRatio
        }

        var groundedR = axle.LastLeftWheelResult;
        if (groundedR)
            travelR = groundedL.CompressionRatio;

        //计算平衡杆刚度系数
        var antiRollForce = (travelL - travelR) * this.AntiRollForce;

        //向两侧的轮胎分配力
        if (groundedL) {
            let force = new Laya.Vector3;
            Laya.Vector3.scale(this.GetTransformUp(axle.LeftWheel), -antiRollForce, force);
            var localOffset = axle.LeftWheel.transform.position.clone();
            Laya.Vector3.subtract(localOffset, this.transform.position, localOffset);
            this.rigidbody.applyForce(force, localOffset);  
        }
        if (groundedR) {
            let force = new Laya.Vector3;
            Laya.Vector3.scale(this.GetTransformUp(axle.RightWheel), antiRollForce, force);
            var localOffset = axle.RightWheel.transform.position.clone();
            Laya.Vector3.subtract(localOffset, this.transform.position, localOffset);
            this.rigidbody.applyForce(force, localOffset);    
        }
    }

    public GetTransformUp(gameobject: Laya.Sprite3D): Laya.Vector3 {
        let up = new Laya.Vector3;
        gameobject.transform.getUp(up);
        return up;
    }

    private Round(value: number, digits: number): number {
        var multi = Math.pow(10.0, digits);
        return Math.round(value * multi) / multi;
    }
}

export class FrontBackVectorPair {
    public Back: Laya.Vector3;
    public Front: Laya.Vector3;

    public get Heading(): Laya.Vector3 {
        var tmep = new Laya.Vector3;
        Laya.Vector3.subtract(this.Front, this.Back, tmep)
        Laya.Vector3.normalize(tmep, tmep);
        return tmep;
    }

    public get IsSet(): boolean {
        let flag1 = Laya.Vector3.equals(this.Front, Laya.Vector3._ZERO);
        let flag2 = Laya.Vector3.equals(this.Back, Laya.Vector3._ZERO);
        return !flag1 && !flag2;
    }

    public get IsOr(): boolean {
        let flag1 = Laya.Vector3.equals(this.Front, Laya.Vector3._ZERO);
        let flag2 = Laya.Vector3.equals(this.Back, Laya.Vector3._ZERO);
        return !flag1 || !flag2;
    }
}

export class WheelRaycastResult {
    public Hit: Laya.HitResult;
    public CompressionRatio: number;
    public CompressionRatioPre: number;
    public ImpactPoint: Laya.Vector3;
}

export class AxleInfo {
    public IsBack: boolean;
    public IsFront: boolean;

    public LastLeftWheelResult: WheelRaycastResult;
    public LastRightWheelResult: WheelRaycastResult;
    public LeftWheel: Laya.Sprite3D;
    public RightWheel: Laya.Sprite3D;
}