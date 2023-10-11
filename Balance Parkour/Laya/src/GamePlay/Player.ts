import Game_tippy_Mgr from "../Mgr/GameMgr";
import MoveFunc from "./MoveFunc";
import Vibrate_tippy_Mgr from "../Mgr/VibrateMgr";

export default class Player extends Laya.Script3D {
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
    public Mainscenesp
    public nodes: Laya.MeshSprite3D
    public isrotate = false
    public anmantor: Laya.Animator
    public rigid: Laya.Rigidbody3D
    public hitcotime = 0//踩得第几个方块
    public playerinfo = {
        x: 0,
        y: 0.75,
        z: 0,
        rx: 0,
        ry: -90,
        rz: 0.
    } //玩家信息用于复活时返回位置
    onAwake() {
        this.Mainscenesp = Game_tippy_Mgr.mainsp
        let a: Laya.Rigidbody3D = this.owner.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D
        a.isTrigger = false
        this.nodes = this.owner as Laya.MeshSprite3D
        a.isKinematic = true
        a.gravity = new Laya.Vector3(0, -10, 0)
        a.angularFactor = new Laya.Vector3(0, 0, 0)
        this.rigid = a
        // this.testtime()
        console.log(this.nodes.transform.localPositionY, "a啊啊啊");
        console.log(this.nodes.transform.localRotationEulerY);
        this.Mainscenesp.playerinitinfo = {
            posx: 0,
            posy: 0.75,
            posz: 0,
            rotx: 0,
            roty: -90,
            rotz: 0,
        }
        console.log(this.owner.getChildAt(0), "动画信息");
        this.anmantor = this.owner.getChildAt(0).getChildAt(0).getComponent(Laya.Animator)
        this.anmantor.play("ANIM_Char_Idlewalk")

        // this.anmantor.speed = 0
        // 
        // console.log(this.nodes.getChildAt(0));

        let cu = this.nodes.getChildAt(0).getChildAt(0).getChildAt(0) as Laya.SkinnedMeshSprite3D
        cu.skinnedMeshRenderer.castShadow = true
        // let cus = this.nodes.getChildAt(0).getChildAt(1) as Laya.MeshSprite3D
        // cus.meshRenderer.castShadow = true
    }

    initplace(isfuhuoback?) {//回到最初的位置和角度  是否是复活到上一个位置
        let cu = this.nodes.getChildAt(0).getChildAt(0).getChildAt(0) as Laya.SkinnedMeshSprite3D
        cu.skinnedMeshRenderer.castShadow = true
        this.rigid.isKinematic = false
        this.loopstant()
        // console.log("进来", this.Mainscenesp.playerinitinfo);
        if (isfuhuoback) {
            this.nodes.transform.localPositionX = this.playerinfo.x
            this.nodes.transform.localPositionY = this.playerinfo.y
            this.nodes.transform.localPositionZ = this.playerinfo.z
            this.nodes.transform.localRotationEulerX = this.playerinfo.rx
            this.nodes.transform.localRotationEulerY = this.playerinfo.ry
            this.nodes.transform.localRotationEulerZ = this.playerinfo.rz
        } else {
            this.nodes.transform.localPositionX = this.Mainscenesp.playerinitinfo.posx
            this.nodes.transform.localPositionY = this.Mainscenesp.playerinitinfo.posy
            this.nodes.transform.localPositionZ = this.Mainscenesp.playerinitinfo.posz
            this.nodes.transform.localRotationEulerX = this.Mainscenesp.playerinitinfo.rotx
            this.nodes.transform.localRotationEulerY = this.Mainscenesp.playerinitinfo.roty
            this.nodes.transform.localRotationEulerZ = this.Mainscenesp.playerinitinfo.rotz
        }

        // this.rigid.isKinematic = true
    }

    public looptime = 0
    public havein = false
    loopstant() {//重复站姿
        if (this.Mainscenesp.havestart) {
            return;
        }
        if (this.havein) {
            return;
        }
        this.havein = true
        this.anmantor.speed = 0.7
        this.looptime++
        let t
        if (this.looptime <= 5) {
            this.anmantor.crossFade("ANIM_Char_Stant", 0.3, 0)
            t = this.anmantor.getCurrentAnimatorPlayState()
            setTimeout(() => {
                this.loopstant()
            }, (0.6 * 1000) / this.anmantor.speed);
            // console.log("普通",this.looptime);

        } else {
            this.looptime = 0
            this.anmantor.crossFade("ANIM_Char_Stant2", 0.3, 0)
            t = this.anmantor.getCurrentAnimatorPlayState()
            setTimeout(() => {
                this.loopstant()
            }, (0.7 * 1000) / this.anmantor.speed);
            // console.log("特殊",this.looptime);
        }
    }

    saveinfo(pos, rot) {//保存刚刚落到方块的玩家位置用于复活
        this.playerinfo.x = pos.x
        this.playerinfo.y = pos.y
        this.playerinfo.z = pos.z
        this.playerinfo.rx = rot.x
        this.playerinfo.ry = rot.y
        this.playerinfo.rz = rot.z
    }

    onCollisionEnter(collision: Laya.Collision): void {
        if (collision.other['haveuse']) {
            return;
        }
        // console.log("开始", collision);
        collision.other['haveuse'] = true
        if (collision.other.owner.name == 'ci') {
            console.log("踩到刺了");
            this.anmantor.crossFade('ANIM_Char_Idlewalk', 0.4, 0);
            if (this.Mainscenesp.fuhuochance >= 1) {
                this.Mainscenesp.pausegame()
            } else {
                this.Mainscenesp.losegame()
            }

        }

    }

    onCollisionExit(collision: Laya.Collision): void {
        // console.log("结束", collision);
    }

    onTriggerEnter(collider: Laya.PhysicsComponent): void {
        console.log("触发开始");
        let colpar = collider.owner.parent
        if (colpar['haveactive']) {
            return;
        }
        this.Mainscenesp.playsound("getd.ogg")
        colpar['haveactive'] = true;
        let pri = collider.owner.parent.getChildAt(1)
        pri.active = true
        Vibrate_tippy_Mgr.vibrate_tippy_Short()//短震动
        // MoveFunc.fadeshow(2, collider.owner as Laya.MeshSprite3D, 400, () => {
        collider.owner.active = false
        setTimeout(() => {
            pri.active = false
        }, 1600);
        // })
        this.Mainscenesp.gameuicontrosp.addzuanshi()

    }

    onEnable(): void {
        // 
    }

    onDisable(): void {
    }

    onUpdate() {
        this.move()
        this.raycast()
    }

    onLateUpdate() {
        // this.Mainscenesp.Maincam.
    }

    onStart() {
        // setTimeout(() => {
        // this.rotateface()
        this.nodes.transform.localPositionY = 0.75

        // }, 100);
    }

    public movespeed = 0.03
    public basespeed = 0.015
    public nowstay = 1//1向后 2左 3右边 4前进 0默认
    public laststay = 'up'
    public readtorota = false//还没踩在旋转范围，等下
    move() {
        if (!this.Mainscenesp.havestart) {
            return;
        }
        if (this.readtorota) {
            this.nodes.transform.translate(new Laya.Vector3(0, 0, this.basespeed * 1.5))
            let r = MoveFunc.getabpos(this.nodes, this.Mainscenesp.conbox.parent)
            if (r <= 2 + 0.1) {//还没到圆中
                this.readtorota = false
                this.rotate(this.isleft)
                return
            }
            return;
        }
        if (this.isrotate) {
            return;
        }
        this.getstay()
        let movescal = 1

        if (this.nowstay == 0) {
            if (this.laststay != 'up') {
                this.laststay = 'up'
                this.animachange()
            }
            this.nodes.transform.translate(new Laya.Vector3(0, 0, this.basespeed))
        } else if (this.nowstay == this.facedata.left) {
            if (this.laststay != 'left') {
                this.laststay = 'left'
                this.animachange()
            }
        } else if (this.nowstay == this.facedata.right) {
            if (this.laststay != 'right') {
                this.laststay = 'right'
                this.animachange()
            }
        } else if (this.nowstay == this.facedata.down) {
            if (this.laststay != 'down') {
                this.laststay = 'down'
                this.animachange()
            }
            movescal = 0.4
        } else if (this.nowstay == this.facedata.up) {
            if (this.laststay != 'upg') {
                this.laststay = 'upg'
                this.animachange()
            }
            this.nodes.transform.translate(new Laya.Vector3(0, 0, this.basespeed / 2))
        }
        this.nodes.transform.localPositionX += this.movespeed * -this.Mainscenesp.bili.y * movescal
        this.nodes.transform.localPositionZ += this.movespeed * this.Mainscenesp.bili.x * movescal
        this.changespeed()
        // console.log(this.nodes.transform.localPosition)
    }

    getstay() {
        if (this.Mainscenesp.bili.y > 0) {//后退
            if (this.Mainscenesp.bili.y + 0.2 > Math.abs(this.Mainscenesp.bili.x)) {
                this.nowstay = 1
            } else if (this.Mainscenesp.bili.x > 0) {
                this.nowstay = 3
            } else if (this.Mainscenesp.bili.x < 0) {
                this.nowstay = 2
            }
        } else if (this.Mainscenesp.bili.y < 0) {//前进
            if (Math.abs(this.Mainscenesp.bili.y) + 0.2 > Math.abs(this.Mainscenesp.bili.x)) {
                this.nowstay = 4
            } else if (this.Mainscenesp.bili.x > 0) {
                this.nowstay = 3
            } else if (this.Mainscenesp.bili.x < 0) {
                this.nowstay = 2
            }
        } else if (this.Mainscenesp.bili.y == 0) {
            if (this.Mainscenesp.bili.x == 0) {
                this.nowstay = 0
            } else if (this.Mainscenesp.bili.x > 0) {
                this.nowstay = 3
            } else if (this.Mainscenesp.bili.x < 0) {
                this.nowstay = 2
            }
        }

    }

    public facedata
    rotateface() {//看当前玩家面向的方向
        let data = {
            up: 4,
            down: 1,
            left: 2,
            right: 3,
            movez: 3,
        }
        console.log(this.nodes.transform.localRotationEulerY);
        this.saveinfo(this.nodes.transform.localPosition, this.nodes.transform.localRotationEuler)
        let st = this.nodes.transform.localRotationEulerY / 90
        st = Number(st.toFixed(0))
        // console.log(this.nodes.transform, st, "这呵呵呵");
        if (st == 1 || st == -3) {//朝前方 -90
            data = {
                up: 4,
                down: 1,
                left: 2,
                right: 3,
                movez: 3,
            }//Z轴左右 X周前后

        } else if (st == 2 || st == -2) {//朝左边 180
            data = {
                up: 2,
                down: 3,
                left: 1,
                right: 4,
                movez: 2,
            }
        } else if (st == 3 || st == -1) {//面对 90
            data = {
                up: 1,
                down: 4,
                left: 3,
                right: 2,
                movez: 1,
            }
        } else if (st == 4 || st == 0) {//面朝右边 0 
            data = {
                up: 3,
                down: 2,
                left: 4,
                right: 1,
                movez: 4,
            }
        }

        this.facedata = data
        // console.log(data);

    }

    changespeed() {
        let r = Math.pow(Math.pow(this.Mainscenesp.bili.x, 2) + Math.pow(this.Mainscenesp.bili.y, 2), 1 / 2)
        let sp = 1.8 * r
        if (sp < 1.3) {
            sp = 1.3
        }
        this.anmantor.speed = sp
    }
    animachange() {//换动画
        // console.log(this.laststay);
        let time = 0.5
        let guitime = 0

        if (this.laststay == "down") {
            this.anmantor.crossFade('ANIM_Char_FallBack', time, guitime);
            // this.anmantor.speed = sp 
            // this.anmantor.play('ANIM_Char_FallBack')
        } else if (this.laststay == "right") {
            this.anmantor.crossFade('ANIM_Char_StrafeRight', time, guitime);
            // this.anmantor.speed = sp
            // this.anmantor.play("ANIM_Char_StrafeRight")
        } else if (this.laststay == "left") {
            this.anmantor.crossFade('ANIM_Char_StrafeLeft', time, guitime);
            // this.anmantor.speed = sp
            // this.anmantor.play("ANIM_Char_StrafeLeft")
        } else if (this.laststay == "up") {
            this.anmantor.crossFade('ANIM_Char_Idlewalk', time, guitime);
            // this.anmantor.speed = sp
            // this.anmantor.play("ANIM_Char_Idlewalk")
        } else if (this.laststay == "upg") {
            this.anmantor.crossFade('ANIM_Char_MoveForward', time, guitime);
            // this.anmantor.speed = sp
            // this.anmantor.play("ANIM_Char_MoveForward")
        }
    }
    public isleft = false
    rotate(isleft?) {//计算距离被控制的方块的距离 是否是左转
        let rotabox = this.Mainscenesp.conbox.parent
        console.log(" this.conbox Y " + rotabox.transform.localRotationEulerY);
        this.isrotate = true
        isleft = true
        let a
        let b
        let c
        let d
        if (this.facedata.movez == 1) {
            a = rotabox.transform.localPositionZ
            b = this.nodes.transform.localPositionZ
            if (isleft) {
                a = a + b
                b = a - b
                a = a - b
            }
            c = 2
            d = 2 + this.nodes.transform.localPositionX - rotabox.transform.localPositionX
        } else if (this.facedata.movez == 2) {
            a = this.nodes.transform.localPositionX
            b = rotabox.transform.localPositionX
            if (isleft) {
                a = a + b
                b = a - b
                a = a - b
            }
            c = 2
            d = 2 + this.nodes.transform.localPositionZ - rotabox.transform.localPositionZ
        } else if (this.facedata.movez == 3) {
            a = this.nodes.transform.localPositionZ
            b = rotabox.transform.localPositionZ
            if (isleft) {
                a = a + b
                b = a - b
                a = a - b
            }
            c = 2
            d = 2 + rotabox.transform.localPositionX - this.nodes.transform.localPositionX
        } else if (this.facedata.movez == 4) {
            a = rotabox.transform.localPositionX
            b = this.nodes.transform.localPositionX
            if (isleft) {
                a = a + b
                b = a - b
                a = a - b
            }
            c = 2
            d = 2 + rotabox.transform.localPositionZ - this.nodes.transform.localPositionZ
        }


        let cha = a - b
        let duo = 4 - d
        let tarpos = c - cha - duo//距离右边的 也是移动的弧的半径
        if (tarpos < 0) {
            tarpos = 0
        }
        let tosmll = false
        let r = MoveFunc.getabpos(this.nodes, rotabox)//获取两点xz的直线距离
        console.log(this.facedata.movez, a, b, c, duo, r, tarpos);
        if (r > 2 + 0.1) {//还没到圆中
            console.log("没到");

            this.readtorota = true
            return
        }
        if (this.laststay != 'up') {
            this.laststay = 'up'
            this.animachange()
        }
        if (tarpos >= d) {
            tarpos = d - 0.3
            console.log("超了");
        }
        let long = 2 * Math.PI * tarpos * 0.25
        // console.log(this.facedata.movez, cha, tarpos, long, "旋转啊啊啊");
        // console.log(isleft, "左还是右");

        if (isleft) {//！！！！反过来因为原本的程序和这个反了
            if (tosmll) {
                // console.log("太小");
                this.rotateby(2000, 20, 90, long, isleft, true)
            } else {
                // console.log("正常");
                this.rotateby(2000, 20, 90, long, isleft)
            }

        } else {
            // console.log("失去右臂啊啊啊？");

            if (tosmll) {
                this.rotateby(2000, 20, 90, long, false, true)
            } else {
                this.rotateby(2000, 20, 90, long)
            }

        }

    }

    rotateby(time, onetime, rotationy, movepo, isleft?, tosmll?) {//总时间 一次的时间  旋转量
        let havetime = 0
        let alltime = time / onetime
        let rotateonetime = rotationy / alltime//1次旋转这么多
        // console.log("isleft????", isleft);
        this.Mainscenesp.playsound("rotate.ogg")
        if (isleft) {
            // console.log("左转");
            rotateonetime = -rotateonetime
        }
        let moveonetime = movepo / alltime
        let tars = this.Mainscenesp.conbox.getChildAt(0) as Laya.Sprite3D
        let tar = tars.transform
        // console.log(tar);

        // console.log('1asd', this.nodes.transform.localRotationEulerY);
        let func = () => {
            havetime += 1
            this.nodes.transform.localRotationEulerY -= rotateonetime
            // if (this.facedata.movez == 1 || this.facedata.movez == 3) {
            this.nodes.transform.translate(new Laya.Vector3(0, 0, moveonetime))


            // } else {
            //     this.nodes.transform.translate(new Laya.Vector3(moveonetime, 0, 0))
            // }
            tar.localRotationEulerY -= rotateonetime
            // console.log(this.nodes.transform.localRotationEulerY);

            if (havetime >= alltime) {
                Laya.timer.clear(this, func)
                this.isrotate = false
                let a = Number((this.nodes.transform.localRotationEulerY / 90).toFixed(0))
                this.nodes.transform.localRotationEulerY = 90 * a
                tar.localRotationEulerY = Number(tar.localRotationEulerY.toFixed(0))
                tar.localRotationEulerY = 90
                // console.log(this.nodes.transform);
                this.rotateface()
                if (this.Mainscenesp.readtomove) {
                    this.Mainscenesp.countrota(1, 23, 3, 4, true)
                }
            }
        }
        Laya.timer.loop(onetime, this, func)
    }

    public hitResult: Laya.HitResult = new Laya.HitResult();
    public hitResult2: Laya.HitResult = new Laya.HitResult();
    public hitResult3: Laya.HitResult = new Laya.HitResult();
    public hitResult4: Laya.HitResult = new Laya.HitResult();
    public checkresult: Laya.HitResult = new Laya.HitResult();
    public checkresult2: Laya.HitResult = new Laya.HitResult();
    raycast() {//射线检测
        let d = 0.53
        let bian = 0.15
        let posstart = new Laya.Vector3(this.nodes.transform.position.x - bian, this.nodes.transform.position.y, this.nodes.transform.position.z - bian)
        this.Mainscenesp.gamescene.physicsSimulation.raycastFromTo(this.nodes.transform.position, new Laya.Vector3(this.nodes.transform.position.x - bian, this.nodes.transform.position.y - d, this.nodes.transform.position.z + bian), this.hitResult)
        this.Mainscenesp.gamescene.physicsSimulation.raycastFromTo(posstart, new Laya.Vector3(this.nodes.transform.position.x - bian, this.nodes.transform.position.y - 3.5, this.nodes.transform.position.z - bian), this.checkresult)
        // console.log(this.hitResult);
        let time = 1
        // this.hitResult.collider.owner.parent
        let chek = (ty) => {
            if (ty.succeeded) {
                let haveactipos = ty.collider.owner.parent
                // console.log(ty.collider.owner.parent,"是这个！");
                if (this.cultname(ty.collider.owner.name) == 'MESH') {
                    if (haveactipos['haveactive']) {
                    } else {//
                        // console.log("新的");
                        this.rotateface()
                        haveactipos['haveactive'] = true;
                        this.hitcube()
                        this.newbolk(ty.collider, true)
                    }
                } else if (this.cultname(ty.collider.owner.name, '02') == 'Cube' || this.cultname(ty.collider.owner.name, '0') == 'fangkuai') {
                    if (haveactipos['haveactive']) {
                    } else {//
                        // console.log("新的");
                        this.rotateface()
                        haveactipos['haveactive'] = true;
                        this.hitcube()
                        this.newbolk(ty.collider)
                    }
                } else if (this.cultname(ty.collider.owner.name) == 'zhuanpan') {
                    if (haveactipos['haveactive']) {
                    } else {//
                        haveactipos['haveactive'] = true;
                        this.hitcube()
                        this.Mainscenesp.cubeback(this.Mainscenesp.conbox.parent)
                        // this.Mainscenesp.mouseup(true)
                        // console.log(this.Mainscenesp.conbox.transform.localPosition, this.nodes.transform.localPosition);
                        this.changecolroand(ty.collider)
                        // console.log("去右边啊啊啊");
                        this.isleft = false
                        // this.Mainscenesp.conbox = ty.collider.owner as Laya.MeshSprite3D
                        this.rotate()
                    }
                } else if (this.cultname(ty.collider.owner.name) == 'rotatecubeleft') {
                    if (haveactipos['haveactive']) {
                        // console.log("踩在地上");
                    } else {//
                        // console.log("旋转");
                        haveactipos['haveactive'] = true;
                        this.Mainscenesp.cubeback(this.Mainscenesp.conbox.parent)
                        // this.Mainscenesp.mouseup(true)
                        // console.log(this.Mainscenesp.conbox.transform.localPosition, this.nodes.transform.localPosition);
                        this.changecolroand(ty.collider)
                        console.log("左边的");
                        this.isleft = true
                        // this.Mainscenesp.conbox = ty.collider.owner as Laya.MeshSprite3D
                        this.rotate(true)
                    }
                } else if (this.cultname(ty.collider.owner.name) == 'zhongdian') {
                    if (haveactipos['haveactive']) {
                        // console.log("踩在地上");
                    } else {//
                        this.hitcube()
                        // console.log("旋转");
                        ty.collider.owner.getChildAt(0).active = true
                        haveactipos['haveactive'] = true;
                        this.newbolk(ty.collider, false, true)
                        this.anmantor.crossFade('ANIM_Char_Win', 0.4, 0);
                        this.Mainscenesp.win()

                    }
                }
                //  else if (this.cultname(ty.collider.owner._parent.name, '0') == 'Cube') {
                //     // console.log(ty.collider,ty.collider.owner._parent.name);

                //     if (ty.collider.owner._parent._parent['haveactive']) {
                //     } else {//
                //         // console.log("新的");
                //         this.rotateface()
                //         ty.collider.owner._parent._parent['haveactive'] = true;
                //         this.hitcube()
                //         let a
                //         a['owner'] = ty.collider.owner._parent
                //         this.newbolk(a)
                //     }
                // }
                return true
            } else {
                time += 1
                if (time == 2) {
                    this.Mainscenesp.gamescene.physicsSimulation.raycastFromTo(this.nodes.transform.position, new Laya.Vector3(this.nodes.transform.position.x - bian, this.nodes.transform.position.y - d, this.nodes.transform.position.z - bian), this.hitResult2)
                } else if (time == 3) {
                    this.Mainscenesp.gamescene.physicsSimulation.raycastFromTo(this.nodes.transform.position, new Laya.Vector3(this.nodes.transform.position.x + bian, this.nodes.transform.position.y - d, this.nodes.transform.position.z - bian), this.hitResult3)
                } else if (time == 4) {
                    this.Mainscenesp.gamescene.physicsSimulation.raycastFromTo(this.nodes.transform.position, new Laya.Vector3(this.nodes.transform.position.x + bian, this.nodes.transform.position.y - d, this.nodes.transform.position.z + bian), this.hitResult4)
                }
                if (time <= 4) {
                    chek(this['hitResult' + time])
                } else {
                    return false
                }
            }

        }
        let chekresu = (ry) => {
            if (this.cultname(ry.collider.owner.name, '02') == 'Cube' || this.cultname(ry.collider.owner.name) == 'MESH' || this.cultname(ry.collider.owner.name, '0') == 'fangkuai') {
                if (ry.collider.owner['haveactive']) {
                    // console.log(this.checkresult.point.y + this.nodes.transform.localScaleY/2, "回到地面", Math.abs(this.nodes.transform.position.y - this.checkresult.point.y - this.nodes.transform.localScaleY));
                    if (Math.abs(this.nodes.transform.position.y - ry.point.y - this.nodes.transform.localScaleY / 2) > 0.15) {
                        this.nodes.transform.position.y = ry.point.y + this.nodes.transform.localScaleY / 2 + 0.1
                    }
                }
            }
        }
        if (chek(this.hitResult)) {

        } else if (this.checkresult.succeeded) {
            chekresu(this.checkresult)
        } else {
            posstart.x += bian * 2
            posstart.z += bian * 2
            this.Mainscenesp.gamescene.physicsSimulation.raycastFromTo(posstart, new Laya.Vector3(this.nodes.transform.position.x + bian, this.nodes.transform.position.y - 3.5, this.nodes.transform.position.z + bian), this.checkresult2)
            if (this.checkresult2.succeeded) {
                chekresu(this.checkresult2)
            } else {
                if (!this.Mainscenesp.havestart) {
                    return;
                }
                this.Mainscenesp.havestart = false
                this.Mainscenesp.conbox.meshRenderer.material.albedoColor = this.lastcolor;
                this.Mainscenesp.playsound("fall.ogg")
                console.log("输了");
                this.anmantor.crossFade('ANIM_Char_Idlewalk', 0.4, 0);
                if (this.Mainscenesp.fuhuochance >= 1) {
                    this.Mainscenesp.pausegame()
                } else {
                    this.Mainscenesp.losegame()
                }
            }
        }
    }

    hitcube() {//每当来到新的方块时+1
        this.hitcotime += 1
        // console.log("现在是", this.hitcotime);
        this.Mainscenesp.gameuicontrosp.setjindu(this.hitcotime)
    }



    cultname(str: string, lab?) {
        let a = str.split("_")
        if (lab) {
            a = str.split(lab)
        }
        // console.log(a[0]);

        return a[0];
    }

    public lastcolor

    changecolroand(backbolk, parent?) {//之前的颜色还回去 给新的设置颜色
        this.rigid.gravity = new Laya.Vector3(0, -10, 0)
        if (this.cultname(this.Mainscenesp.conbox.name, '02') == 'Cube' || this.cultname(this.Mainscenesp.conbox.name) == 'MESH') {
            // console.log("设回去");
            // if (this.cultname(this.Mainscenesp.conbox.name) == 'MESH') {
            // let a: Laya.MeshSprite3D = this.Mainscenesp.conbox.getChildAt(0) as Laya.MeshSprite3D
            // a.meshRenderer.material['albedoColor'] = this.lastcolor;
            // } else {
            this.Mainscenesp.conbox.meshRenderer.material.albedoColor = this.lastcolor;
            // }

        }
        // console.log(this.Mainscenesp.conbox);
        // if (this.cultname(this.Mainscenesp.conbox.name) == 'MESH') {
        // this.Mainscenesp.conbox = backbolk.owner.parent as Laya.MeshSprite3D
        // } else {
        this.Mainscenesp.conbox = backbolk.owner as Laya.MeshSprite3D
        // }

        // console.log(" this.conbox Y " + this.Mainscenesp.conbox.parent.transform.localRotationEulerY);
        this.lastcolor = backbolk.owner.meshRenderer.material.albedoColor
        if (this.cultname(this.Mainscenesp.conbox.name, '02') == 'Cube' || this.cultname(this.Mainscenesp.conbox.name) == 'MESH') {
            backbolk.owner.meshRenderer.material.albedoColor = new Laya.Vector4(5 / 255, 226 / 255, 255 / 255, 1.0);

        }

    }

    newbolk(backbolk, parent?, isend?) {
        if (!this.Mainscenesp.conbox) {
            return;
        }
        this.Mainscenesp.cubeback(this.Mainscenesp.conbox.parent)
        if (!this.lastcolor) {
            console.log("初次赋值");
            this.lastcolor = this.Mainscenesp.conbox.meshRenderer.material.albedoColor
        }
        if (parent) {
            this.changecolroand(backbolk, parent)
        } else {
            this.changecolroand(backbolk)
        }

        if (this.Mainscenesp.readtomove) {
            if (!isend) {
                this.Mainscenesp.countrota(1, 23, 3, 4, true)
            }
        }


    }
}