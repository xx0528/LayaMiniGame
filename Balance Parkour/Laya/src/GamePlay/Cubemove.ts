import Game_tippy_Mgr from "../Mgr/GameMgr";

export default class Cubemove extends Laya.Script {
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
    public mainsp
    onAwake() {
        this.mainsp = Game_tippy_Mgr.mainsp
    }

    onEnable(): void {
    }

    onDisable(): void {
    }

    move(type, tar: Laya.Sprite3D) {//1是左右移动 2上下移动 3圆周
        if (type == 1) {
            this.moveby(tar, type)
        } else if (type == 2) {
            this.moveby(tar, type)
        } else {
            this.rotateby(tar)
        }
    }

    moveby(tar: Laya.Sprite3D, type) {//1左右 2上下
        let onetime = 30
        let moveonetime = 1000 / onetime//一秒钟执行多少次
        let moveoner = 0.5//一秒移动
        let rotateonetime = moveoner / moveonetime  //1次移动这么多
        let func
        let max = 0.45
        let min = -0.45
        if (type == 1) {
            func = () => {
                if (!this.mainsp.havestart) {
                    return
                }
                tar.transform.localPositionZ += rotateonetime
                if (tar.transform.localPositionZ > max) {
                    tar.transform.localPositionZ = max
                    rotateonetime = -rotateonetime
                } else if (tar.transform.localPositionZ < min) {
                    tar.transform.localPositionZ = min
                    rotateonetime = -rotateonetime
                }
            }
        } else {
            func = () => {
                if (!this.mainsp.havestart) {
                    return
                }
                tar.transform.localPositionX += rotateonetime
                if (tar.transform.localPositionX > max) {
                    tar.transform.localPositionX = max
                    rotateonetime = -rotateonetime
                } else if (tar.transform.localPositionX < min) {
                    tar.transform.localPositionX = min
                    rotateonetime = -rotateonetime
                }
            }
        }
        Laya.timer.loop(onetime, this, func)
    }

    rotateby(tar: Laya.Sprite3D) {//圆周运动
        let onetime = 30//30毫秒执行一次
        let moveonetime = 1000 / onetime//一秒钟执行多少次
        let moveoner = 120//一秒旋转角度
        let rotateonetime = moveoner / moveonetime //1次旋转这么多
        // console.log('1asd', this.nodes.transform.localRotationEulerY);
        let func = () => {
            if (!this.mainsp.havestart) {
                return
            }
            tar.transform.localRotationEulerY -= rotateonetime
        }
        Laya.timer.loop(onetime, this, func)
    }

    onDestroy() {
        Laya.timer.clearAll(this)
    }
}