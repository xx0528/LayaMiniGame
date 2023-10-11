export default class movefunc2d extends Laya.Script {
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

    // public static clicked = false
    public static btnsave(tar, time?) {
        if (tar['btnsaveclicked']) {
            return false;
        }
        let t = 600
        if (time) {
            t = time
        }
        tar['btnsaveclicked'] = true
        setTimeout(() => {
            tar['btnsaveclicked'] = false
        }, t);
        return true
    }

    public static btnmove(btn: Laya.Sprite, time, call, once?, safe?, safetime?,tar?) {//按钮的动作
        if (btn.pivotX != btn.width / 2) {
            btn.pivotX = btn.width / 2
            btn.pivotY = btn.height / 2
            btn.x += btn.width / 2
            btn.y += btn.height / 2
        }

        let type = 'on'
        if (once) {
            type = 'once'
        }
        // let tars  = this
        // if (tar) {
        //     tars = this
        // }
        btn[type](Laya.Event.MOUSE_DOWN, btn, (e: Laya.Event) => {
            e.stopPropagation()
            if (btn['havescale']) {
                return;
            }
            btn['havescale'] = true
            Laya.Tween.clearTween(btn)
            Laya.Tween.to(btn, { scaleX: 1.15, scaleY: 1.15 }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, () => {

            }))
        })
        btn[type](Laya.Event.MOUSE_UP, btn, (e: Laya.Event) => {
            e.stopPropagation()
            if (btn['havescale']) {
                btn['havescale'] = false
                Laya.Tween.clearTween(btn)
                Laya.Tween.to(btn, { scaleX: 1, scaleY: 1 }, time, Laya.Ease.cubicIn, Laya.Handler.create(this, () => {

                }))
                if (safe) {
                    if (safetime) {
                        if (this.btnsave(btn, safetime)) {
                            call(e)
                        }
                    } else {
                        if (this.btnsave(btn)) {
                            call(e)
                        }
                    }
                } else {
                    call(e)
                }
            }
        })
        btn[type](Laya.Event.MOUSE_OUT, btn, (e: Laya.Event) => {
            e.stopPropagation()
            if (btn['havescale']) {
                btn['havescale'] = false
                Laya.Tween.clearTween(btn)
                Laya.Tween.to(btn, { scaleX: 1, scaleY: 1 }, time, Laya.Ease.cubicIn, Laya.Handler.create(this, () => {

                }))
            }
        })
    }

    public static moveby(v2: Laya.Vector2, tar, time, call?) {//相对移动
        let x = tar.x + v2.x
        let y = tar.y + v2.y
        Laya.Tween.to(tar, { x: x, y: y }, time, Laya.Ease.circIn, Laya.Handler.create(this, () => {
            if (call) {
                call()
            }
        }))
    }

    public static fadeto(alp, tar, time, call?) {
        Laya.Tween.to(tar, { alpha: alp }, time, Laya.Ease.circIn, Laya.Handler.create(this, () => {
            if (call) {
                call()
            }
        }))
    }

    public static getsrcchangepic(src, tar) {//传入src和目标更换图片
        var textureUrl: string = src;
        tar.graphics.clear();
        var texture: Laya.Texture = Laya.loader.getRes(textureUrl);
        tar.loadImage(textureUrl);
    }

}