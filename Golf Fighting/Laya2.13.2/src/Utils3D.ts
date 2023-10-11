export class Utils3D {

    private static mDefalutVec3: Laya.Vector3;
    private static get defalutVec3(): Laya.Vector3 {//用处于频繁使用vec3
        var vect: Laya.Vector3 = this.mDefalutVec3 || (this.mDefalutVec3 = new Laya.Vector3);
        vect.toDefault();
        return vect;
    }

    public static setToVec3(vec3: Laya.Vector3, x: number, y: number, z: number): Laya.Vector3 {
        vec3.x = x; vec3.y = y; vec3.z = z;
        return vec3;
    }


    public static position(target: Laya.Sprite3D, x: number, y: number, z: number): void {
        var vec3: Laya.Vector3 = target.transform.position;
        vec3.x = x; vec3.y = y; vec3.z = z;
        target.transform.position = target.transform.position;
    }

    public static rotationEuler(target: Laya.Sprite3D, x: number, y: number, z: number): void {
        var vec3: Laya.Vector3 = target.transform.rotationEuler;
        vec3.x = x; vec3.y = y; vec3.z = z;
        target.transform.rotationEuler = target.transform.rotationEuler;
    }


    public static localPosition(target: Laya.Sprite3D, x: number, y: number, z: number): void {
        var vec3: Laya.Vector3 = target.transform.localPosition;
        vec3.x = x; vec3.y = y; vec3.z = z;
        target.transform.localPosition = target.transform.localPosition;
    }

    public static localPositionByVec3(target: Laya.Sprite3D, vec3: Laya.Vector3): void {
        var vec3_1: Laya.Vector3 = target.transform.localPosition;
        vec3_1.x = vec3.x; vec3_1.y = vec3.y; vec3_1.z = vec3.z;
        target.transform.localPosition = target.transform.localPosition;
    }


    public static rotation(target: Laya.Sprite3D, x: number, y: number, z: number): void {
        var vec3: Laya.Vector3 = this.setToVec3(this.defalutVec3, x, y, z);
        var a = 180 / Math.PI;
        Laya.Quaternion.createFromYawPitchRoll(vec3.y / a, vec3.x / a, vec3.z / a, target.transform.localRotation);
        target.transform.localRotation = target.transform.localRotation;
    }


    public static rotationByVec3(target: Laya.Sprite3D, vec3: Laya.Vector3): void {
        var a = 180 / Math.PI;
        Laya.Quaternion.createFromYawPitchRoll(vec3.y / a, vec3.x / a, vec3.z / a, target.transform.localRotation);
        target.transform.localRotation = target.transform.localRotation;
    }

    public static positionX(target: Laya.Sprite3D, x: number): void {
        var vec3: Laya.Vector3 = target.transform.position;
        vec3.x = x;
        target.transform.position = target.transform.position;
    }

    public static positionY(target: Laya.Sprite3D, y: number): void {
        var vec3: Laya.Vector3 = target.transform.position;
        vec3.y = y;
        target.transform.position = target.transform.position;
    }

    public static positionZ(target: Laya.Sprite3D, z: number): number {
        var vec3: Laya.Vector3 = target.transform.position;
        vec3.z = z;
        target.transform.position = target.transform.position;
        return vec3.z;
    }


    public static localPositionX(target: Laya.Sprite3D, x: number): void {
        var vec3: Laya.Vector3 = target.transform.localPosition;
        vec3.x = x;
        target.transform.localPosition = target.transform.localPosition;
    }

    public static localPositionY(target: Laya.Sprite3D, y: number): void {
        var vec3: Laya.Vector3 = target.transform.localPosition;
        vec3.y = y;
        target.transform.localPosition = target.transform.localPosition;
    }

    public static localPositionZ(target: Laya.Sprite3D, z: number): number {
        var vec3: Laya.Vector3 = target.transform.localPosition;
        vec3.z = z;
        target.transform.localPosition = target.transform.localPosition;
        return vec3.z;
    }

    public static rotationX(target: Laya.Sprite3D, x: number): void {
        var vec3: Laya.Vector3 = this.setToVec3(this.defalutVec3, x, 0, 0);
        var a = 180 / Math.PI;
        Laya.Quaternion.createFromYawPitchRoll(vec3.y / a, vec3.x / a, vec3.z / a, target.transform.localRotation);
        target.transform.localRotation = target.transform.localRotation;
    }


    public static rotationY(target: Laya.Sprite3D, y: number): void {
        var transform: Laya.Transform3D = target.transform || target['_transform']
        var vec3: Laya.Vector3 = this.setToVec3(this.defalutVec3, 0, y, 0);
        var a = 180 / Math.PI;
        Laya.Quaternion.createFromYawPitchRoll(vec3.y / a, vec3.x / a, vec3.z / a, transform.localRotation);
        transform.localRotation = transform.localRotation;
    }


    public static rotationZ(target: Laya.Sprite3D, z: number): void {
        var vec3: Laya.Vector3 = this.setToVec3(this.defalutVec3, 0, 0, z);
        var a = 180 / Math.PI;
        Laya.Quaternion.createFromYawPitchRoll(vec3.y / a, vec3.x / a, vec3.z / a, target.transform.localRotation);
        target.transform.localRotation = target.transform.localRotation;
    }

    public static tweenScale(callBack,target: Laya.Sprite3D, timer: number, x: number, y: number, z: number, tx: number, ty: number, tz: number, ease: any = null) {
            // Laya.Tween.clearAll(target);
            var vect: Laya.Vector3 = Laya.Pool.getItemByClass("Vector3", Laya.Vector3);
            this.setToVec3(vect, x, y, z);
            var tween: Laya.Tween = Laya.Tween.to(vect, { x: tx, y: ty, z: tz }, timer, Laya.Ease.bounceOut, Laya.Handler.create(this, () => {
                callBack();
            }), 0, false, true);
            tween.update = Laya.Handler.create(this, () => {
                if (!target.transform) {
                    callBack();
                    return;
                }
                this.scale(target, vect.x, vect.y, vect.z);
            }, null, false);
    }

    public static scale(target: Laya.Sprite3D, x: number, y: number, z: number): void {
        var scale: Laya.Vector3 = target.transform.scale;
        scale.x = x; scale.y = y; scale.z = z;
        target.transform.scale = target.transform.scale;
    }


    public static scaleByVec3(target: Laya.Sprite3D, vec3: Laya.Vector3): void {
        target.transform.scale = vec3;
    }

    public static scaleX(target: Laya.Sprite3D, x: number): void {
        target.transform.scale.x = x;
        target.transform.scale = target.transform.scale;
    }

    public static scaleY(target: Laya.Sprite3D, y: number): void {
        target.transform.scale.y = y;
        target.transform.scale = target.transform.scale;
    }

    public static scaleZ(target: Laya.Sprite3D, z: number): void {
        target.transform.scale.z = z;
        target.transform.scale = target.transform.scale;
    }


    public static tweenRotate(target: Laya.Sprite3D, timer: number, x: number, y: number, z: number, tx: number, ty: number, tz: number, ease: any = null, update: Laya.Handler = null,callback = null) {
        // var vect: Laya.Vector3 = Laya.Pool.getItemByClass("Vector3", Laya.Vector3);
        // this.setToVec3(vect, x, y, z);
        // TweenMax.to(vect, timer, {
        //     x: tx, y: ty, z: tz, onUpdate: () => {
        //         if (!target.transform) return;
        //         this.rotation(target, vect.x, vect.y, vect.z);
        //     }, onComplete: () => {
        //         Laya.Pool.recover("Vector3", vect);
        //     }
        // });
    }

    public static tweenRotationEuler(target: Laya.Sprite3D, timer: number, x: number, y: number, z: number, tx: number, ty: number, tz: number, ease: any = null, update: Laya.Handler = null,callback = null):Laya.Tween {
            var vect: Laya.Vector3 = Laya.Pool.getItemByClass("Vector3", Laya.Vector3);
            this.setToVec3(vect, x, y, z);
            let tween:Laya.Tween = Laya.Tween.to(vect, { x: tx, y: ty, z: tz }, timer, ease, Laya.Handler.create(this, () => {
                if(callback!=null){
                    callback();
                }     
            }), 0, false, true)
            tween.update = Laya.Handler.create(this, () => {
                if (!target.transform) {
                    if(callback!=null){
                        callback();
                    }    
                    return;
                }
                this.rotationEuler(target, vect.x, vect.y, vect.z);
                update && update.runWith(vect);
            }, null, false);
            return tween;
    }


    public static tweenRotateByLayTween(target: Laya.Sprite3D, timer: number, x: number, y: number, z: number, tx: number, ty: number, tz: number): void {
        var vect: Laya.Vector3 = Laya.Pool.getItemByClass("Vector3", Laya.Vector3);
        this.setToVec3(vect, x, y, z);
        Laya.Tween.to(vect, { x: tx, y: ty, z: tz }, timer).update = new Laya.Handler(this, () => {
            if (!target.transform) return;

            this.rotationByVec3(target, vect);

        }, null, false);
    }



    public static tweenLocalRotate(target: Laya.Sprite3D, timer: number, x: number, y: number, z: number, tx: number, ty: number, tz: number): void {
        // TweenMax.killTweensOf(target);
        // var vect: Laya.Vector3 = Laya.Pool.getItemByClass("Vector3", Laya.Vector3);
        // this.setToVec3(vect, x, y, z);
        // TweenMax.to(vect, timer, {
        //     x: tx, y: ty, z: tz, onUpdate: () => {
        //         if (!target.transform) return;
        //         this.rotationByVec3(target, vect);
        //     }, onComplete: () => {
        //         Laya.Pool.recover("Vector3", vect);
        //     }
        // });
    }

    public static tweenLocalPosition(target: Laya.Sprite3D, timer: number, x: number, y: number, z: number, tx: number, ty: number, tz: number, ease: any = null): void {
        // Laya.Tween.clearAll(target);
        var vect: Laya.Vector3 = Laya.Pool.getItemByClass("Vector3", Laya.Vector3);
        this.setToVec3(vect, x, y, z);
        var tween: Laya.Tween = Laya.Tween.to(vect, { x: tx, y: ty, z: tz }, timer, ease)
        tween.update = Laya.Handler.create(this, () => {
            if (!target.transform) return;
            this.localPosition(target, vect.x, vect.y, vect.z);
        }, null, false);
    }

    public static tweenLocalPositionPromise(callback, target: Laya.Sprite3D, timer: number, x: number, y: number, z: number, tx: number, ty: number, tz: number, ease: any = null) {
        var vect: Laya.Vector3 = Laya.Pool.getItemByClass("Vector3", Laya.Vector3);
        this.setToVec3(vect, x, y, z);
        var tween: Laya.Tween = Laya.Tween.to(vect, { x: tx, y: ty, z: tz }, timer, ease, Laya.Handler.create(this, () => {
        callback();
        }), 0, false, true)
        tween.update = Laya.Handler.create(this, () => {
        if (!target.transform) {
        callback();
        return;
        }
        this.localPosition(target, vect.x, vect.y, vect.z);
        }, null, false);
        }

    

    public static tweenPosition(target: Laya.Sprite3D, timer: number, x: number, y: number, z: number, tx: number, ty: number, tz: number, ease: any = null, update: Laya.Handler = null,callback = null):Laya.Tween {

            var vect: Laya.Vector3 = Laya.Pool.getItemByClass("Vector3", Laya.Vector3);
            this.setToVec3(vect, x, y, z);
            let tween:Laya.Tween = Laya.Tween.to(vect, { x: tx, y: ty, z: tz }, timer, ease, Laya.Handler.create(this, () => {
                if(callback!=null){
                    callback();
                }     
            }), 0, false, true)
            tween.update = Laya.Handler.create(this, () => {
                if (!target.transform) {
                    if(callback!=null){
                        callback();
                    }    
                    return;
                }
                this.position(target, vect.x, vect.y, vect.z);
                update && update.runWith(vect);
            }, null, false);
            return tween;
    }
}