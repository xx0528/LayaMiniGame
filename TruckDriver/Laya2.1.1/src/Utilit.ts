export default class Utilit_ {
    public static readonly OriginStageWidth = 1334;
    public static readonly OriginStageHeight = 750;


    public static readonly grayscaleMat: Array<number> =
        [0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0];

    public static readonly grayscaleFilter: Laya.ColorFilter = new Laya.ColorFilter(Utilit_.grayscaleMat);


    protected static poinDown: Laya.Point = new Laya.Point(0, -1);
    protected static poinUp: Laya.Point = new Laya.Point(0, 1);


    public static Lerp_(form: number, to: number, delta: number): number {
        if (form == to)
            return to;
        if (form > to) {
            var next = form - delta;
            if (next <= to)
                return to;
            return next;
        }
        else if (form < to) {
            var next = form + delta;
            if (next >= to)
                return to;
            return next;
        }
    }

    public static lerpEulerAngle_(form: number, to: number, delta): number {
        var form = form % 360;
        form = form >= 0 ? form : (360 + form);
        var to = to % 360;
        to = to >= 0 ? to : (360 + to);
        var dis = Math.abs(to - form);
        if (dis > 180) {
            if (form < to)
                to = to - 360
            else if (form > to)
                to = to + 360
        }
        var next = Utilit_.Lerp_(form, to, delta);
        return next;
    }

    public static getRotationByDir_(v: Laya.Point): number {
        var dotValue = (v.x * Utilit_.poinDown.x) + (v.y * Utilit_.poinDown.y);
        var cos = dotValue / (v.distance(0, 0) * Utilit_.poinDown.distance(0, 0));
        var radian = Math.acos(cos)
        var rotation = radian / (2 * Math.PI) * 360;
        if (v.x < 0) {
            rotation = -rotation;
        }
        return rotation;
    }

    public static getRotationByDirOn3DSpace_(v: Laya.Point) {
        var dotValue = (v.x * Utilit_.poinUp.x) + (v.y * Utilit_.poinUp.y);
        var cos = dotValue / (v.distance(0, 0) * Utilit_.poinUp.distance(0, 0));
        var radian = Math.acos(cos)
        var rotation = radian / (2 * Math.PI) * 360;
        if (v.x < 0) {
            rotation = rotation + (180 - rotation) * 2;
        }
        return rotation;
    }

    public static getDirByRotation_(rotation: number): Laya.Point {
        var radian = (rotation - 90) * Math.PI / 180;// -90 是转换到场景坐标系
        var x = Math.cos(radian);
        var y = Math.sin(radian);
        var point = new Laya.Point(x, y);
        point.normalize();
        return point;
    }

    public static getDirDirAngle_(dir1: Laya.Point, dir2: Laya.Point): number {
        var dotValue = (dir1.x * dir2.x) + (dir1.y * dir2.y);
        var cos = dotValue / (dir1.distance(0, 0) * dir2.distance(0, 0));
        var radian = Math.acos(cos)
        var angle = radian / (2 * Math.PI) * 360;
        return angle;
    }

    public static getDirScalarLength_(dir: Laya.Point): number {
        var sl = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        return sl;
    }

    public static setSpOnParentCenter_(sp: Laya.Sprite) {
        if (null == sp.parent)
            return;
        var psp = sp.parent as Laya.Sprite;
        var x = 0;
        var y = 0;
        var x = x - sp.width / 2 * sp.scaleX + psp.width / 2;
        var y = y - sp.height / 2 * sp.scaleY + psp.height / 2;
        sp.x = x;
        sp.y = y;
    }

    public static getPointToLineDistance_(x: number, y: number, LineStart: Laya.Point, LineEnd: Laya.Point): number {
        var toStartDir = new Laya.Point(x - LineStart.x, y - LineStart.y);
        var toEndDir = new Laya.Point(x - LineEnd.x, y - LineEnd.y);
        var lineDir = new Laya.Point(LineEnd.x - LineStart.y, LineEnd.y - LineStart.y)
        var dotToStartDir = (lineDir.x * toStartDir.x) + (lineDir.y * toStartDir.y)
        if (dotToStartDir <= 0) {
            return toStartDir.distance(0, 0);
        }
        var dotToEndDir = (lineDir.x * toEndDir.x) + (lineDir.y * toEndDir.y)
        if (dotToEndDir <= 0) {
            return toEndDir.distance(0, 0);
        }
        var toStartDis = toStartDir.distance(0, 0);
        var lineDirDis = lineDir.distance(0, 0);
        var cos = dotToStartDir / (toStartDis * lineDirDis);
        var radians = Math.acos(cos)
        var dis = Math.sin(radians) * toStartDis
        return dis;
    }


    public static isIphoneX_() {
        if (!Laya.Browser.onIPhone)
            return false;
        if ((Laya.Browser.width == 2436 && Laya.Browser.height == 1125)
            || (Laya.Browser.height == 2436 && Laya.Browser.width == 1125)) {
            return true
        }
        return false
    }

    public static isIphone_() {
        return Laya.Browser.onIPhone
    }


    public static getChild_(node: Laya.Node, name: string): Laya.Node {
        for (var i = 0; i < node.numChildren; ++i) {
            var child = node.getChildAt(i);
            if (child.name == name) {
                return child;
            }
            else {
                var target = Utilit_.getChild_(child, name);
                if (target)
                    return target;
            }
        }
        return null;
    }

    public static forEachChild(node: Laya.Node, each: Function) {
        for (let i = 0; i < node.numChildren; ++i) {
            let child = node.getChildAt(i);
            each(child);
            Utilit_.forEachChild(child, each);
        }
    }

    public static LerpNumber(num1, num2, t): number {
        return num1 + t * (num2 - num1);
    }

    public static Vector3Angle(to: Laya.Vector3, form: Laya.Vector3, axis: number = 1): number {
        to = to.clone();
        Laya.Vector3.normalize(to, to);
        form = form.clone();
        Laya.Vector3.normalize(form, form);
        var dot = Laya.Vector3.dot(to, form);
        dot = Math.max(-1, Math.min(1, dot));
        Utilit_.isZero(dot) && (dot = 0);
        let angle = Math.acos(dot) * (180 / Math.PI);
        var cross = new Laya.Vector3;
        Laya.Vector3.cross(to, form, cross);

        switch (axis) {
            case 0: cross.x < 0 && (angle *= -1); break;
            case 1: cross.y < 0 && (angle *= -1); break;
            case 2: cross.z < 0 && (angle *= -1); break;
            default: cross.y < 0 && (angle *= -1); break;
        }
        return Utilit_.isZeroByValue(angle, 0.1) ? 0 : angle;
    }

    public static TransformPoint(transform: Laya.Transform3D, position: Laya.Vector3, out: Laya.Vector3) {
        let mat: Laya.Matrix4x4 = transform.worldMatrix;
        Laya.Vector3.transformV3ToV3(position, mat, out);
    }

    public static InverseTransformPoint(transform: Laya.Transform3D, position: Laya.Vector3, out: Laya.Vector3) {
        let mat: Laya.Matrix4x4 = new Laya.Matrix4x4;
        transform.worldMatrix.invert(mat);
        Laya.Vector3.transformV3ToV3(position, mat, out);
    }

    public static QuaternionEuler(x: number, y: number, z: number, rotation: Laya.Quaternion) {
        let angleToRadian = 180 / Math.PI;
        Laya.Quaternion.createFromYawPitchRoll(y / angleToRadian, x / angleToRadian, z / angleToRadian, rotation);
    }

    public static QuaternionVector3(rotation: Laya.Quaternion, point: Laya.Vector3, res: Laya.Vector3) {
        // let x = rotation.x * 2.0;
        // let y = rotation.y * 2.0;
        // let z = rotation.z * 2.0;
        // let xx = rotation.x * x;
        // let yy = rotation.y * y;
        // let zz = rotation.z * z;
        // let xy = rotation.x * y;
        // let xz = rotation.x * z;
        // let yz = rotation.y * z;
        // let wx = rotation.w * x;
        // let wy = rotation.w * y;
        // let wz = rotation.w * z;

        // res.x = (1 - (yy + zz)) * point.x + (xy - wz) * point.y + (xz + wy) * point.z;
        // res.y = (xy + wz) * point.x + (1 - (xx + zz)) * point.y + (yz - wx) * point.z;
        // res.z = (xz - wy) * point.x + (yz + wx) * point.y + (1 - (xx + yy)) * point.z;
        // res.x = this.isZero(res.x) ? 0 : res.x;
        // res.y = this.isZero(res.y) ? 0 : res.y;
        // res.z = this.isZero(res.z) ? 0 : res.z;

        var mat = new Laya.Matrix4x4;
        Laya.Matrix4x4.createFromQuaternion(rotation, mat);
        Laya.Vector3.transformV3ToV3(point, mat, res);
        return res;
    }

    public static FromToRotation(from: Laya.Vector3, to: Laya.Vector3, out: Laya.Quaternion) {
        Laya.Vector3.normalize(from, from);
        Laya.Vector3.normalize(to, to);;
        var d = Laya.Vector3.dot(from, to);
        if (d >= 1.0) {
            return new Laya.Quaternion;
        }
        if (d < (1e-6 - 1.0)) {
            var axis = new Laya.Vector3;
            Laya.Vector3.cross(new Laya.Vector3(1, 0, 0), from, axis);
            if (Utilit_.isVectorZeroLength(axis)) { }
            Laya.Vector3.cross(new Laya.Vector3(0, 1, 0), from, axis);
            Laya.Vector3.normalize(axis, axis);
            Laya.Quaternion.createFromAxisAngle(axis, 180, out);
        }
        else {
            var s = Math.sqrt((1 + d) * 2);
            var invs = 1 / s;
            var c = new Laya.Vector3;
            Laya.Vector3.cross(from, to, c);
            out.x = c.x * invs;
            out.y = c.y * invs;
            out.z = c.z * invs;
            out.w = s * 0.5;
            out.normalize(out);
        }
        return out;
    }

    public static isVectorZeroLength(v: Laya.Vector3): boolean {
        var sqlen = (v.x * v.x) + (v.y * v.y) + (v.z * v.z);
        return (sqlen < (1e-06 * 1e-06));
    }

    public static isZero(v: number): boolean {
        return Math.abs(v) < 1e-6;
    }

    public static isZeroByValue(v: number, c: number): boolean {
        return Math.abs(v) < c;
    }

    public static VectorZere(res: Laya.Vector3): void {
        res.x = Utilit_.isZero(res.x) ? 0 : res.x;
        res.y = Utilit_.isZero(res.y) ? 0 : res.y;
        res.z = Utilit_.isZero(res.z) ? 0 : res.z;
    }

    public static QuaternionNorm(q: Laya.Quaternion, out: Laya.Quaternion) {
        var len = q.w * q.w + q.x * q.x + q.y * q.y + q.z * q.z;
        var factor = 1.0 / Math.sqrt(len);
        out.x = q.x * factor;
        out.y = q.y * factor;
        out.z = q.z * factor;
        out.w = q.w * factor;
    }

    public static Sign(f): number {
        return f >= 0 ? 1 : -1;
    }

    public static Clamp01(value: number): number {
        if (value < 0)
            return 0;
        else if (value > 1)
            return 1;
        else
            return value;
    }

    public static Clamp(value: number, min: number, max: number): number {
        if (value < min)
            return min;
        else if (value > max)
            return max;
        else
            return value;
    }

    public static FindChild(node: Laya.Node, name: string): Laya.Node {
        let strArg = name.split("/");
        for (let i = 0; i < strArg.length; i++) {
            name = strArg[i];
            node = node.getChildByName(name);
            if (node == null) {
                return null;
            }
        }
        return node;
    }

    public static getAnimationClip(animator: Laya.Animator, layerIndex: number, clipName: string): Laya.AnimationClip {
        let layerControler = animator.getControllerLayer(layerIndex);
        let animatorState: Laya.AnimatorState = layerControler._statesMap[clipName]
        return animatorState.clip;
    }

    public static getRandomInt(min: number, max: number): number {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    }

    public static GetArrDifference(arr1, arr2) {
        return arr1.concat(arr2).filter(function(v, i, arr) {
            return arr.indexOf(v) === arr.lastIndexOf(v);
        });
    }
}