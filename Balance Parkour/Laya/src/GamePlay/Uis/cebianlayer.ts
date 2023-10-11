import Game_tippy_Mgr from "../../Mgr/GameMgr";
import fuhuolayer from "./fuhuolayer";
import MainLayer from "./MainLayer";
import gameuiContro from "../gameuiContro";

export default class cebianlayer extends Laya.Script {
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

    protected btnback: Laya.Sprite
    protected btnopen: Laya.Sprite
    protected spr: Laya.Sprite
    public Mainscenesp
    public uicon
    public nodes: Laya.Clip
    public _List: Laya.List

    onAwake() {
        this.Mainscenesp = Game_tippy_Mgr.mainsp
        this.nodes = this.owner as Laya.Clip
        this.uicon = this.Mainscenesp.gameuicontrosp
        this.getchild()
        this.setbtn()
        this.test()
    }

    getchild() {
        this._List = this.owner.getChildAt(0).getChildAt(3).getChildAt(0) as Laya.List
        this.btnback = this.owner.getChildAt(0).getChildAt(0) as Laya.Sprite
        this.btnopen = this.owner.getChildAt(1) as Laya.Sprite
        this.spr = this.owner.getChildAt(0) as Laya.Sprite
        this.spr.alpha = 0
        this.btnback.visible = false
    }

    test() {
        if (window['nulad']) {
            this.nodes.visible = false
            // return;
        } else {
            this.nodes.visible = true
            console.log("打开侧边！！！！！！");

        }
        setTimeout(() => {
            this.test()
        }, 300);
    }


    public moveing = false
    setbtn() {
        this.btnback.on(Laya.Event.CLICK, this.btnback, () => {
            this.Mainscenesp.playsound("click.ogg")
            this.move(2)

        })
        this.btnopen.on(Laya.Event.CLICK, this.btnopen, () => {
            if (this.Mainscenesp.gamepause()) {
                this.Mainscenesp.playsound("click.ogg")
                this.move(1)
            }
        })
    }

    move(type) {//1出来 2回去
        if (window['nulad']) {
            return;
        }
        if (this.moveing) {
            return;
        }
        this.moveing = true;
        let xt
        if (!this.uicon) {
            this.uicon = this.Mainscenesp.gameuicontrosp
        }
        if (type == 1) {
            xt = 0
            if (MainLayer.onmain) {
                gameuiContro.manager.loopclib.visible = false
            }

            this._List.scrollBar.value = Math.random() * this._List.scrollBar.max

            this.btnopen.alpha = 0
            this.spr.alpha = 1
            this.btnback.visible = true

            if (fuhuolayer.isend) {//正在结束页面不管
                console.log("结束页不管");
            } else {
                console.log("不在结束页弹出");
                this.uicon.showcebianbanner()
            }
        } else {
            if (MainLayer.onmain) {
                gameuiContro.manager.loopclib.visible = true
            }
            xt = -493
            this.btnback.visible = false
            this.Mainscenesp.repause()
            if (fuhuolayer.isend) {//正在结束页面不管
                console.log("结束页不管");
            } else {
                console.log("不在结束页弹出");
                this.uicon.unshowcebianbanner()
            }
        }
        Laya.Tween.to(this.spr, { x: xt }, 500, Laya.Ease.cubicOut, Laya.Handler.create(this, () => {
            this.moveing = false;
            if (type == 2) {
                this.btnopen.alpha = 1
                this.spr.alpha = 0
            }
        }))
    }

    reflash() {
        if (window['nulad']) {
            this.nodes.visible = false
            return;
        }
        this.nodes.visible = true
        // this.nodes.alpha = 0
    }
}