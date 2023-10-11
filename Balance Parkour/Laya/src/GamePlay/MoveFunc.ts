export default class MoveFunc extends Laya.Script3D {
    /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
    public intType: number = 1000;
    /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
    public numType: number = 1000;
    /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
    public strType: string = "hello laya";
    /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
    public boolType: boolean = true;
    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

    constructor() { super(); }

    public static getabpos(a: Laya.MeshSprite3D, b: Laya.MeshSprite3D) {//获取两点平面差距离
        let t = a.transform
        let bt = b.transform
        let r = Math.pow(Math.pow(t.localPositionX - bt.localPositionX, 2) + Math.pow(t.localPositionZ - bt.localPositionZ, 2), 1 / 2)
        return r
    }

    public static rotateto(clear, angelneed: Laya.Vector3, tar: Laya.MeshSprite3D, time, onetime) {//旋转到你要的角度
        if (clear) {
            Laya.timer.clearAll(this)
        }
        let cha = { x: 0, y: 0, z: 0 };
        cha.x = angelneed.x - tar.transform.localRotationEulerX
        cha.y = angelneed.y - tar.transform.localRotationEulerY
        cha.z = angelneed.z - tar.transform.localRotationEulerZ
        let havetime = 0
        let alltime = time / onetime
        let roateone = { x: cha.x / alltime, y: cha.y / alltime, z: cha.z / alltime }
        let func = () => {
            havetime += 1
            tar.transform.localRotationEulerX += roateone.x
            tar.transform.localRotationEulerY += roateone.y
            tar.transform.localRotationEulerZ += roateone.z

            if (havetime >= alltime) {
                tar.transform.localRotationEulerX = angelneed.x
                tar.transform.localRotationEulerY = angelneed.y
                tar.transform.localRotationEulerZ = angelneed.z
                Laya.timer.clear(this, func)
            }
        }
        Laya.timer.loop(onetime, this, func)
    }

    public static fadeshow(type, tar: Laya.MeshSprite3D, time, call?) {//1是显示 2是隐藏
        let onetime = 30//每30毫秒执行一次
        let alltime = time / onetime//一共执行多少次
        let havetime = 0 //已经执行次数
        let addonetime  //一次增加多少
        let color: Laya.Vector4 = tar.meshRenderer.material['albedoColor']
        tar.active = true
        // let initcolor: Laya.Vector4
        if (type == 1) {
            // initcolor = new Laya.Vector4(color.x, color.y, color.z, 0.0)
            addonetime = (1 - color.w) / alltime
        } else {
            addonetime = (- color.w) / alltime
        }
        tar.meshRenderer.material['albedoColor'] = color
        // console.log(color);
        
        let func = () => {
            havetime += 1
            color.w += addonetime
            tar.meshRenderer.material['albedoColor'] = color

            if (havetime >= alltime) {
                if (call) {
                    call()
                }
                Laya.timer.clear(this, func)
            }
        }
        Laya.timer.loop(onetime, this, func)
    }

    // public static r

}