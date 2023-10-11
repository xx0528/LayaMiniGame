import Game_tippy_Mgr from "../Mgr/GameMgr";

export default class Camaermove extends Laya.Script3D {
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
    public cam: Laya.MeshSprite3D
    public plight: Laya.MeshSprite3D
    public Mainscenesp
    public player: Laya.MeshSprite3D
    onAwake() {
        console.log("设置相机移动");
        this.cam = this.owner as Laya.MeshSprite3D
        // this.setcamaermove()
        // this.cam.transform.rotate(new Laya.Vector3(0, 0, 0), false)
        // console.log(Laya.stage.getChildAt(1));
        // this.plight = Laya.stage.getChildAt(1).getChildByName("Spotlight") as Laya.MeshSprite3D
        this.initcam()
    }

    initcam() {//初始化相机和玩家的距离
        this.Mainscenesp = Game_tippy_Mgr.mainsp
        this.player = this.Mainscenesp.player
        let a = this.player.transform.localPosition
        this.cam.transform.localPosition = new Laya.Vector3(a.x - 11, a.y + 7, a.z)
        // console.log(this.cam.transform.localRotationEuler);

        // this.cam.transform.localRotationEulerX = -50
    }

    onEnable(): void {
    }

    onDisable(): void {
    }


    public swichss = false
    setcamaermove() {
        Laya.stage.on(Laya.Event.KEY_DOWN, this, (e: Laya.Event) => {
            // console.log(e.keyCode);
            let speed = 0.2
            if (e.keyCode == 65) {//a
                // console.log("move");
                // this.owner['transform'].rotate(new Laya.Vector3(0,0.5,0),false,false);
                this.cam.transform.translate(new Laya.Vector3(-speed, 0, 0), true)
            } else if (e.keyCode == 68) {//d
                this.cam.transform.translate(new Laya.Vector3(speed, 0, 0), true)
            } else if (e.keyCode == 87) {//w
                this.cam.transform.translate(new Laya.Vector3(0, 0, -speed), true)
            } else if (e.keyCode == 83) {//s
                this.cam.transform.translate(new Laya.Vector3(0, 0, speed), true)
            } else if (e.keyCode == 66) {
                this.swichss = !this.swichss
            }
        })
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, (e: Laya.Event) => {
            this.moverotate = true
        })
        Laya.stage.on(Laya.Event.MOUSE_UP, this, () => {
            this.moverotate = false
            this.lastpos.x = null
            this.lastpos.y = null
        })
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, (e: Laya.Event) => {
            // console.log(e.delta);
            // console.log(e.stageX);
            // console.log(e.stageY);
            if (!this.moverotate) {
                return;
            }
            if (this.lastpos.x == null) {
                this.lastpos.x = e.stageX
                this.lastpos.y = e.stageY
                return;
            }
            this.countrota(e.stageX, e.stageY)

        })
    }
    public moverotate = false
    public lastpos = { x: null, y: null }

    countrota(x, y) {
        if (!this.swichss) {
            return
        }
        let dex = (x - this.lastpos.x) / 5
        let dey = (y - this.lastpos.y) / 5
        // console.log(dex, dey);
        // var angle: number = Math.atan2((dey), (dex)) //弧度  
        // var theta: number = angle * (180 / Math.PI); //角度  
        this.cam.transform.rotate(new Laya.Vector3(-dey, 0, 0), true, false)
        this.cam.transform.rotate(new Laya.Vector3(0, -dex, 0), false, false)
        this.lastpos.x = x
        this.lastpos.y = y
        // console.log(this.cam.transform.rotation);
    }

    onLateUpdate() {
        // if (this.plight) {
        //     this.plight.transform.position = this.cam.transform.position
        //     this.plight.transform.rotation = this.cam.transform.rotation
        // }
        if (!this.Mainscenesp.iswin) {
            let a = this.player.transform.localPosition
            this.cam.transform.localPosition = new Laya.Vector3(a.x - 11, a.y + 7, a.z)
        } else {
            this.movetoplayer()
        }



    }

    movetoplayer() {
        let a = this.player.transform.localPosition
        
        if (this.cam.transform.localPosition.x >= a.x - 5) {
            // this.cam.transform.localPositionX = this.cam.transform.localPositionX
        } else {
            this.cam.transform.localPositionX += 0.1
        }
        if (this.cam.transform.localPosition.y <= a.y + 4) {
            // this.cam.transform.localPositionY = this.cam.transform.localPositionY
        } else {
            this.cam.transform.localPositionY -= 0.1/2
        }

    }

    onUpdate(): void {
        // this.owner._tran
        // this.owner['transform'].rotate(new Laya.Vector3(0,0.5,0),false,false);
        // console.log("每帧");
    }
}