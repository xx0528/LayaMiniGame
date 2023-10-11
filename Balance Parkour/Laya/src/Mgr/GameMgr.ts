import Ut_tippy_ilit_tippy_ from "../Utilit";
import Us_tippy_er from "../User/User";
import Http_tippy_Unit from "../Net/HttpUnit";
import Mai_tippy_Liang from "../MaiLiangAPI/MaiLiang";
import Camaermove from "../GamePlay/Camaermove";
import Player from "../GamePlay/Player";
import MoveFunc from "../GamePlay/MoveFunc";
import createcube from "../GamePlay/createcube";
import gameuiContro from "../GamePlay/gameuiContro";
import Sound_tippy_Mgr from "./SoundMgr";
import movefunc2d from "../GamePlay/movefunc2d";
import WXAPI from "../WXAPI";
import AppSwitchConfig from "../Config/AppSwitchConfig";
import WudianMgr from "./WudianMgr";
import CachedWXBannerAd from "../CachedWXBannerAd";
import View_tippy_Mgr, { ViewDef } from "./ViewMgr";
import Wudian_tippy_Mgr from "./WudianMgr";
import QQMiniGameAPI from "../QQMiniGameAPI";
import AppConfig from "../AppConfig";
import GameSwitchConfig from "../Config/GameSwitchConfig";

//游戏管理器，游戏代码的入口
export default class Game_tippy_Mgr extends Laya.Script {

    private static _ins_tippy_tance: Game_tippy_Mgr = null;
    public static getI_tippy_nstance(): Game_tippy_Mgr { return Game_tippy_Mgr._ins_tippy_tance; }
    public fuhuochance = 1//复活机会

    public static mainsp
    constructor() {
        super();
        Game_tippy_Mgr._ins_tippy_tance = this;
    }

    onAwake() {
        Game_tippy_Mgr.mainsp = this
        // Mai_tippy_Liang.Get_tippy_MaiLiangOpenId(function (res) {
        //     console.log("GameUI 买量数据上报成功");
        //     Laya.Browser.window["wx"].onShow(function () {
        //         Mai_tippy_Liang.Get_tippy_MaiLiangOpenId(null, null);
        //     })
        //     Laya.Browser.window["wx"].onHide(function () {
        //         Mai_tippy_Liang.Report_tippy_StayTime(null, null);
        //     })
        // },
        //     function (res) {
        //         console.log("GameUI 买量数据上报失败");
        //     }
        // );

        // QQMiniGameAPI.SetShareMenu("好友@你，是时候来一场真正的决斗了！", "subRes/share.jpg",
        //     () => {

        //     },
        //     () => {

        //     },
        //     () => {

        //     })


        // WudianMgr.UpdateIpBlockState();
        // CachedWXBannerAd.preloadBanner();
        // QQMiniGameAPI.LoadAppBoxAd(() => {
        //     console.log("盒子加载成功");
        // }, () => {
        //     console.log("盒子加载失败");
        // })
    }

    onStart() {
        // Laya.stage.frameRate = "slow"
        this.preCreate_tippy_Game();
    }

    public Maincam: Laya.Camera
    // public contro: Laya.Sprite
    public UIlayer: Laya.Node
    public conbox: Laya.MeshSprite3D
    public player: Laya.MeshSprite3D
    public cebianbtn: Laya.Sprite
    public touchplace: Laya.Image
    public box: Laya.Box
    public blackbox: Laya.Box
    public gamescene: Laya.Scene3D
    public playersp
    public havestart = false//开始了么
    public playerinitinfo//玩家初始化信息

    public createsp//创建方块的sp
    public gameuicontrosp//控制界面UI的

    public static adinfo = [
        {
            "banner": 1,
            "endpagepopup": 0,
            "morefunpopup": 0,
            "indexpopup": 0,
            "sanbeizuanshi": 1,
        }
    ]

    public havedid = false//已经做过了基础的设置，防止回到主页重开游戏后出现重复操作
    private preCreate_tippy_Game(): void {
        // Laya.Stat.show(0, 100);//打开性能条
        // console.log(Laya.stage._children);

        if (Laya.Browser.onQQMiniGame) {
            this.UIlayer = Laya.stage.getChildByName("root");//laya的场景层
        } else {
            this.UIlayer = Laya.stage.getChildAt(0);//laya的场景层
        }
        console.log(Laya.Browser.width, Laya.Browser.height, "物理");
        console.log(Laya.Browser.clientWidth, Laya.Browser.clientHeight, "像素");
        console.log(Laya.stage.height, Laya.stage.width);
        // this.playmusic("bgmusic.ogg")
        this.playmusic("bgmusic.ogg")
        
        // this.owner['height'] = Laya.Browser.height

        // console.log("什么鬼");
        // console.log(this.owner, "场景是没到");
        window['nulad'] = true//没有广告
        this.stratgame()
        GameSwitchConfig.getInstance().SetBannerActive();
        //todo：这里添加初始化主场景的代码
    }

    public bgm
    playmusic(name) {
        var url = "subRes/music/" + name
        if (Laya.Browser.onMiniGame) {
            if (!this.bgm) {
                this.bgm = wx.createInnerAudioContext();
            }
            this.bgm.stop();
            this.bgm.src = url;
            this.bgm.loop = true;
            this.bgm.play();
        } else {
            Laya.SoundManager.playMusic(url, 0);
        }
    }
    playsound(name) {
        var url = "subRes/music/" + name
        if (Laya.Browser.onMiniGame) {
            var sound = Laya.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = url
                sound.onEnded(() => {
                    Laya.Pool.recover(name, sound);
                    sound.offEnded();
                })
            }
            sound.play();
        } else {
            Laya.SoundManager.playSound(url, 1);
        }
    }


    public ligh: Laya.DirectionLight
    stratgame() {//点击开始游戏
        if (this.havedid) {
            // this.createsp.leave = 1
            this.initgame(false, 1)
            return;
        }
        this.havedid = true
        console.log("开始场景加载");


        // Laya.Loader.

        Laya.Scene3D.load("subRes/LayaScene_MainScene/Conventional/MainScene.ls", Laya.Handler.create(this, (scene: Laya.Scene3D) => {
            console.log("场景ok");
            this.gamescene = scene
            this.ligh = this.gamescene.getChildAt(2) as Laya.DirectionLight
            // this.ligh.color = new Laya.Vector3(1.0, 1.0, 1.0)
            // this.ligh.intensity = 1
            this.ligh.shadowMode = Laya.ShadowMode.Hard;
            this.ligh.shadowDistance = 20
            this.ligh.shadowResolution = 2400;
            //生成阴影贴图数量
            // this.ligh.shadowPSSMCount = 1;
            // //模糊等级,越大越高,更耗性能
            // this.ligh.shadowPCFType = 3;
            // console.log(this.ligh,this.ligh.shadow,this.ligh.shadowDistance);
            // let t = this.gamescene.getChildAt(6) as Laya.MeshSprite3D
            // t.meshRenderer.receiveShadow = true
            // t.meshRenderer.castShadow = true
            this.createsp = this.gamescene.addComponent(createcube)
            console.log("加载完成");
            Laya.stage.addChildAt(scene, 0)
            this.getchilds()
            this.setcontro()
            this.initgame(false, 1)
            this.loadread = true
            movefunc2d.fadeto(0, this.gameuicontrosp.loadinglayer, 500, () => {
                this.gameuicontrosp.loadinglayer.visible = false
            })
            // let cubebig = scene.getChildByName("Cube") as Laya.MeshSprite3D
            // let cube = cubebig.getChildByName("Cube") as Laya.MeshSprite3D
            // cubebig.meshRenderer.receiveShadow = true
            // cube.meshRenderer.castShadow = true
            // let b = Laya.Sprite3D.instantiate(cube, scene, false, new Laya.Vector3(2, 0.31, -6.56)) as Laya.MeshSprite3D;
            // b.meshRenderer.castShadow = true
            // setTimeout(() => {
            //     let a = Laya.Sprite3D.instantiate(cubebig, scene, false, new Laya.Vector3(2, -0.9, -6.56)) as Laya.MeshSprite3D;
            // a.meshRenderer.receiveShadow = true
            // }, 3000);
        }));
    }

    public loadread = false

    onLateUpdate() {
        // if (this.ligh) {
        //     this.ligh.transform.localRotationEulerX += 1
        //     // this.ligh.transform.localRotationEulerY += 1
        //     // this.ligh.transform.localRotationEulerZ += 1
        //     // console.log(this.ligh.transform.localRotationEuler);

        // }
    }

    getchilds() {
        console.log("开始加载");

        this.gameuicontrosp = this.UIlayer.addComponent(gameuiContro)
        this.player = this.gamescene.getChildByName("Player") as Laya.MeshSprite3D
        this.playersp = this.player.addComponent(Player)
        this.Maincam = this.gamescene.getChildByName("Main Camera") as Laya.Camera
        this.Maincam.addComponent(Camaermove);
        this.touchplace = this.UIlayer.getChildAt(0).getChildByName("ctron") as Laya.Image//控制遥感
        this.cir = this.touchplace.getChildAt(0) as Laya.Sprite//控制遥感里的圆
        this.bian = this.touchplace.getChildAt(1) as Laya.Sprite//控制遥感里面的圆边
        this.box = this.UIlayer.getChildAt(0).getChildByName("box") as Laya.Box//灰色半透明，点击开始游戏页
        this.blackbox = this.UIlayer.getChildAt(0).getChildByName("blackbox") as Laya.Box//纯黑色 动画过渡页
        // this.cebianbtn = this.UIlayer.getChildAt(0).getChildByName("cebianbtn") as Laya.Sprite
        console.log("gamemgr加载完");
        this.box.alpha = 0
        // this.Maincam.
    }

    addlayer() {
        if (Wudian_tippy_Mgr.WudianFlag) {
            CachedWXBannerAd.hide();
            console.log("打开狂点");
            let data: any = {};
            //狂点逻辑完成后的回调方法
            data.Complete = function () {
                console.log("狂点按钮结束");//在这里写入狂点窗口结束后需要调用的逻辑，例如弹出结算页面
            }
            // 完成点击之后获得的奖励数量，依照各项目不同自行实现
            data.PrizeCount = 30;
            setTimeout(() => {
                View_tippy_Mgr.insta_tippy_nce.open_tippy_View(ViewDef.ClickGetPrize, data)
            }, 100);

        }
    }

    addboxlayer() {
        if (Wudian_tippy_Mgr.WudianFlag) {
            let data: any = {};
            //狂点逻辑完成后的回调方法
            data.Complete = function () {
                console.log("狂点盒子结束");//在这里写入狂点窗口结束后需要调用的逻辑，例如弹出结算页面
            }
            // 完成点击之后获得的奖励数量，依照各项目不同自行实现
            data.PrizeCount = 30;
            View_tippy_Mgr.insta_tippy_nce.open_tippy_View(ViewDef.wudian, data)
        }
    }

    public readtomove: boolean
    public cir: Laya.Sprite
    public bian: Laya.Sprite
    public bili = { x: 0, y: 0 }
    setcontro() {//设置操作板
        // this.cebianbtn.on(Laya.Event.CLICK, this, () => {
        //     QQMiniGameAPI.showAppBoxAd(()=>{
        //         console.log("打开失败");
                
        //     })
        // })
        this.UIlayer.getChildAt(0).on(Laya.Event.MOUSE_DOWN, this, (e: Laya.Event) => {
            if (!this.havestart) {
                return;
            }
            this.touchplace.x = e.stageX
            this.touchplace.y = e.stageY
            this.readtomove = true
            // Laya.timer.clear(this, this.backfunc)
        })
        this.UIlayer.getChildAt(0).on(Laya.Event.MOUSE_MOVE, this, (e: Laya.Event) => {
            if (!this.havestart) {
                return;
            }
            if (!this.readtomove) {
                return;
            }
            this.countrota(e.stageX, e.stageY, this.touchplace.x, this.touchplace.y)
        })
        this.UIlayer.getChildAt(0).on(Laya.Event.MOUSE_UP, this, () => {
            this.mouseup()
            this.touchplace.x = 375
            this.touchplace.y = 1000
        })
    }
    mouseup(not?) {
        this.readtomove = false
        this.move = false
        this.cir.x = this.touchplace.width / 2
        this.cir.y = this.touchplace.height / 2
        if (!not) {
            this.cubeback()
        }
        this.bian.rotation = 0
        this.bili = { x: 0, y: 0 }
    }
    public stop = false
    countrota(x, y, cx, cy, usebili?) {
        // console.log("进来");
        let conxxx = this.conbox.parent as Laya.Sprite3D
        // console.log(x, y);
        let dey = y - cy
        let dex = x - cx
        let lo = Math.pow(Math.pow(dey, 2) + Math.pow(dex, 2), 1 / 2)
        // console.log(lo, dey, dex);

        let readx = dex
        let ready = dey
        let maxb = 128
        if (lo > maxb) {
            let bili = dey / dex
            dey == dex * bili
            let x = Math.pow(Math.pow(maxb, 2) / (1 + Math.pow(bili, 2)), 1 / 2)
            if (dex < 0) {
                x = - Math.abs(x)
            } else {
                x = Math.abs(x)
            }
            let y = x * bili
            if (x == 0) {
                if (dey > 0) {
                    y = maxb
                } else {
                    y = -maxb
                }
            }
            // console.log("新的", x, y);
            readx = x
            ready = y
        }
        var angle: number = Math.atan2((dey), (dex)) //弧度  
        var theta: number = angle * (180 / Math.PI); //角度 
        if (!usebili) {
            this.cir.x = maxb + readx
            this.cir.y = maxb + ready
            this.bian.rotation = theta + 90
        }

        let max = 10
        let bilix = readx / maxb
        let biliy = ready / maxb
        if (bilix > 1) {
            bilix = 1
        } else if (bilix < -1) {
            bilix = -1
        }
        if (biliy > 1) {
            biliy = 1
        } else if (biliy < -1) {
            biliy = -1
        }

        // if (!this.readtomove) {
        //     return;
        // }

        if (usebili) {
            if (this.playersp.isrotate) {
                return;
            }
            MoveFunc.rotateto(false, new Laya.Vector3(-this.bili.y * max, conxxx.transform.localRotationEulerY, this.bili.x * max), this.conbox.parent as Laya.MeshSprite3D, 200, 20)
            this.stop = true
            setTimeout(() => {
                this.stop = false
            }, 200);
            // this.conbox.transform.localRotationEulerZ = this.bili.x * max
            // this.conbox.transform.localRotationEulerX = -this.bili.y * max
        } else {
            this.bili.x = bilix
            this.bili.y = biliy
            if (this.playersp.isrotate) {
                return;
            }
            if (this.stop) {
                return;
            }
            let chaz = Math.abs(conxxx.transform.localRotationEulerZ - bilix * max)
            let chax = Math.abs(conxxx.transform.localRotationEulerX - -biliy * max)
            let speed = 0.2

            let time
            if (chaz > chax) {
                time = chaz / speed
            } else {
                time = chax / speed
            }
            if (time != 0) {

                // console.log(chaz,chax,time);
                Laya.Tween.clearAll(conxxx.transform);
                // Laya.Tween.to(conxxx.transform, { localRotationEulerZ: bilix * max, localRotationEulerX: -biliy * max }, time)
            }
            this.move = true
            // conxxx.transform.localRotationEulerZ = bilix * max
            // conxxx.transform.localRotationEulerX = -biliy * max
            // console.log("修改");

        }

        // console.log(this.conbox.transform);

        if (Math.abs(conxxx.transform.localRotationEulerX) > max) {
            if (conxxx.transform.localRotationEulerX < 0) {
                conxxx.transform.localRotationEulerX = -max
            } else {
                conxxx.transform.localRotationEulerX = max
            }
        }
        if (Math.abs(conxxx.transform.localRotationEulerZ) > max) {
            if (conxxx.transform.localRotationEulerZ < 0) {
                conxxx.transform.localRotationEulerZ = -max
            } else {
                conxxx.transform.localRotationEulerZ = max
            }
        }
    }
    public move = false
    movecube() {
        if (!this.havestart) {
            return;
        }
        if (!this.readtomove) {
            return;
        }
        if (this.stop) {
            return;
        }
        if (this.playersp.isrotate) {
            return;
        }
        if (this.move) {
            // console.log(Laya.timer.delta);


            let max = 10
            let conxxx = this.conbox.parent as Laya.Sprite3D
            let chaz = conxxx.transform.localRotationEulerZ - this.bili.x * max
            let chax = conxxx.transform.localRotationEulerX - -this.bili.y * max
            let speed = 10
            let addz = speed / Laya.timer.delta
            let addx = speed / Laya.timer.delta
            let cha = 0.2
            if (chaz > cha) {
                addz = -speed / Laya.timer.delta
            } else if (chaz < -cha) {
                addz = speed / Laya.timer.delta
            } else {
                addz = 0
            }
            if (chax > cha) {
                addx = -speed / Laya.timer.delta
            } else if (chax < -cha) {
                addx = speed / Laya.timer.delta
            } else {
                addx = 0
            }
            if (conxxx.transform.localRotationEulerZ + addz > max) {
                conxxx.transform.localRotationEulerZ = max
            } else {
                conxxx.transform.localRotationEulerZ += addz
            }
            if (conxxx.transform.localRotationEulerX + addx > max) {
                conxxx.transform.localRotationEulerX = max
            } else {
                conxxx.transform.localRotationEulerX += addx
            }
            // conxxx.transform.localRotationEulerX += addx
        }
    }

    onUpdate() {
        this.movecube()
    }

    cubeback(backbox?) {
        // this.playersp.test()
        let conxxx = this.conbox.parent as Laya.Sprite3D
        if (!this.conbox) {

            return;
        }
        let dirx
        let diry
        if (conxxx.transform.localRotationEulerX < 0) {
            dirx = 1
        } else {
            dirx = -1
        }
        if (conxxx.transform.localRotationEulerZ < 0) {
            diry = 1
        } else {
            diry = -1
        }
        if (backbox) {
            let func = (dirx, diry) => {
                backbox.transform.localRotationEulerX += dirx * 0.5
                backbox.transform.localRotationEulerZ += diry * 0.5
                let ok = false
                if (dirx > 0) {
                    if (backbox.transform.localRotationEulerX > 0) {
                        backbox.transform.localRotationEulerX = 0
                        if (ok) {
                            Laya.timer.clear(this, func)
                        } else {
                            ok = true
                        }
                    }
                } else {
                    if (backbox.transform.localRotationEulerX < 0) {
                        backbox.transform.localRotationEulerX = 0
                        if (ok) {
                            Laya.timer.clear(this, func)
                        } else {
                            ok = true
                        }
                    }
                }
                if (diry > 0) {
                    if (backbox.transform.localRotationEulerZ > 0) {
                        backbox.transform.localRotationEulerZ = 0
                        if (ok) {
                            Laya.timer.clear(this, func)
                        } else {
                            ok = true
                        }
                    }
                } else {
                    if (backbox.transform.localRotationEulerZ < 0) {
                        backbox.transform.localRotationEulerZ = 0
                        if (ok) {
                            Laya.timer.clear(this, func)
                        } else {
                            ok = true
                        }
                    }
                }
            }
            Laya.timer.frameLoop(1, this, func, [dirx, diry])
        } else {
            Laya.timer.frameLoop(1, this, this.backfunc, [dirx, diry])
        }


        // this.owner.on(Laya.Event.FRAME, this, this.backfunc, [dirx, diry])
    }
    backfunc(dirx, diry) {
        let conxxx = this.conbox.parent as Laya.Sprite3D
        conxxx.transform.localRotationEulerX += dirx * 0.5
        conxxx.transform.localRotationEulerZ += diry * 0.5
        let ok = false
        if (dirx > 0) {
            if (conxxx.transform.localRotationEulerX > 0) {
                conxxx.transform.localRotationEulerX = 0
                if (ok) {
                    Laya.timer.clear(this, this.backfunc)
                } else {
                    ok = true
                }
            }
        } else {
            if (conxxx.transform.localRotationEulerX < 0) {
                conxxx.transform.localRotationEulerX = 0
                if (ok) {
                    Laya.timer.clear(this, this.backfunc)
                } else {
                    ok = true
                }
            }
        }
        if (diry > 0) {
            if (conxxx.transform.localRotationEulerZ > 0) {
                conxxx.transform.localRotationEulerZ = 0
                if (ok) {
                    Laya.timer.clear(this, this.backfunc)
                } else {
                    ok = true
                }
            }
        } else {
            if (conxxx.transform.localRotationEulerZ < 0) {
                conxxx.transform.localRotationEulerZ = 0
                if (ok) {
                    Laya.timer.clear(this, this.backfunc)
                } else {
                    ok = true
                }
            }
        }
    }

    boxmove(type, call, time?) {//黑色方块移动 1从下到中（结束） 2从中到上（开始）
        let t = 400
        if (time) {
            t = time
        }
        if (type == 1) {
            this.blackbox.y = 1700
            Laya.Tween.to(this.blackbox, { y: 0 }, t, Laya.Ease.circIn, Laya.Handler.create(this, () => {
                if (call) {
                    call()
                }
            }))
        } else {
            this.blackbox.y = 0
            Laya.Tween.to(this.blackbox, { y: -1700 }, t, Laya.Ease.circOut, Laya.Handler.create(this, () => {
                // console.log("完毕");

                if (call) {
                    call()
                }
            }))
        }

        // this.box.

    }

    startgame() {//开始游戏
        // if (!window['nulad']) {
        //     this.gameuicontrosp.cebianlayer.nodes.visible = true
        // } else {
        //     this.gameuicontrosp.cebianlayer.nodes.visible = false
        // }
        this.playersp.rigid.isKinematic = false
        this.playersp.rotateface()
        this.havestart = true
        this.playersp.havein = false
        this.playersp.anmantor.play("ANIM_Char_Idlewalk")
        this.playersp.anmantor.speed = 1
        this.touchplace.visible = true
        this.touchplace.alpha = 1
        this.box.alpha = 0
        this.gameuicontrosp.gameUI.alpha = 1
        this.gameuicontrosp.nextleave(Number(Laya.LocalStorage.getItem("leave")), 11)//初始化关卡信息
        try {
            // this.gameuicontrosp.loopclib.alpha = 1
            // this.gameuicontrosp.loopclib.visible = true
            // this.gameuicontrosp.guanggao1.alpha = 1
        } catch (error) {

        }

    }

    public needre = false//是否需要复原
    gamepause() {//点击商店的暂停
        if (this.playersp.isrotate) {
            return false;
        }
        if (window['nulad']) {
            return;
        }
        if (this.havestart) {//在玩的过程中
            this.havestart = false
            this.needre = true
            this.touchplace.alpha = 0
        }
        return true;
    }
    repause() {//点击商店的解除暂停
        if (this.needre) {
            this.needre = false
            this.havestart = true
            this.touchplace.alpha = 1
        }
    }

    public boxalpha = 1
    initgame(re?, juststart?, justflash?, notshow?) {//初始化游戏 是否只初始化当前关卡 是否直接开始不弹出结束页面
        if (this.playerinitinfo) {
            this.playersp.initplace()
        } else {
            // console.log("怎么回事");
        }
        this.iswin = false
        // this.playersp.rigid.isKinematic = true
        // this.playersp.anmantor.speed = 0.01
        this.playersp.hitcotime = 0

        this.havestart = false

        // this.box.alpha = this.boxalpha//灰色点击开始的盒子
        this.touchplace.alpha = 0//控制游戏操作的层

        this.readtomove = false
        this.cir.x = this.touchplace.width / 2
        this.cir.y = this.touchplace.height / 2
        this.touchplace.visible = false
        this.touchplace.x = 375
        this.touchplace.y = 1000
        this.bian.rotation = 0
        this.bili = { x: 0, y: 0 }

        if (re) {
            let l = this.createsp.leave
            let z = this.gameuicontrosp.zuanshinum
            this.createsp.initcube(false, () => {
                setTimeout(() => {
                    this.boxmove(2, null)
                }, 200);
                if (juststart == 1) {//直接生成
                    // this.box.once(Laya.Event.MOUSE_DOWN, this, (e: Laya.Event) => {
                    //     this.startgame()
                    // })
                    let c = this.box.getChildAt(0) as Laya.Label
                    c.visible = true
                } else {
                    let c = this.box.getChildAt(0) as Laya.Label
                    c.visible = false
                    if (juststart == 2) {//胜利
                        this.gameuicontrosp.endlayersp.reflash(true, l, z)
                    } else if (juststart == 3) {//失败
                        this.gameuicontrosp.endlayersp.reflash(false, l)
                    }
                }

            })
        } else {
            this.fuhuochance = 1
            let l = this.createsp.leave
            let z = this.gameuicontrosp.zuanshinum
            this.createsp.createcube(() => {
                setTimeout(() => {
                    this.boxmove(2, null)
                }, 200);
                if (juststart == 1) {
                    this.box.once(Laya.Event.MOUSE_DOWN, this, (e: Laya.Event) => {
                        this.startgame()
                    })
                    let c = this.box.getChildAt(0) as Laya.Label
                    c.visible = true
                } else {
                    let c = this.box.getChildAt(0) as Laya.Label
                    c.visible = false
                    if (juststart == 2) {//胜利
                        this.gameuicontrosp.endlayersp.reflash(true, l, z)
                    } else if (juststart == 3) {//失败
                        this.gameuicontrosp.endlayersp.reflash(false, l, z)
                    }
                }
            })
        }



    }

    losegame() {//

        // this.addboxlayer()
        // setTimeout(() => {
        this.playsound("lose.ogg")
        this.fuhuochance = 1
        this.boxmove(1, () => {
            this.initgame(true, 3)
        })
        // }, 1000);

        this.cubeback()
        this.havestart = false
        this.touchplace.alpha = 0
        this.readtomove = false
        this.cir.x = this.touchplace.width / 2
        this.cir.y = this.touchplace.height / 2
        this.touchplace.visible = false
        this.bian.rotation = 0
        this.bili = { x: 0, y: 0 }
    }

    pausegame(nofuhuo?) {//暂停等待复活
        this.fuhuochance -= 1
        this.cubeback()
        this.havestart = false
        this.touchplace.alpha = 0
        this.touchplace.visible = false
        this.readtomove = false
        this.cir.x = this.touchplace.width / 2
        this.cir.y = this.touchplace.height / 2
        this.bian.rotation = 0
        this.bili = { x: 0, y: 0 }
        this.boxmove(1, () => {//这里打开复活页面
            if (!nofuhuo) {
                this.gameuicontrosp.fuhuolayersp.reflash()
            }
            // this.playersp.anmantor.speed = 0.01
            this.playersp.initplace(true)
            if (this.conbox.name != "zhuanpan") {
                this.conbox.meshRenderer.material['albedoColor'] = new Laya.Vector4(0.0, 165 / 255, 223 / 255, 1.0);
                // this.conbox.parent['haveactive'] = false
            }
            // this.box.alpha = this.boxalpha
            let c = this.box.getChildAt(0) as Laya.Label
            c.visible = false
            // this.fuhuo()
            setTimeout(() => {
                this.boxmove(2, null);
            }, 200);
        })
    }

    fuhuo() {
        this.box.alpha = this.boxalpha//灰色点击开始的盒子
        this.touchplace.visible = false
        this.touchplace.x = 375
        this.touchplace.y = 1000
        this.box.once(Laya.Event.MOUSE_DOWN, this, (e: Laya.Event) => {
            this.startgame()
        })
        let c = this.box.getChildAt(0) as Laya.Label
        c.visible = true
    }

    public iswin = false

    win() {
        this.addboxlayer()
        setTimeout(() => {
            this.boxmove(1, () => {
                this.initgame(false, 2)//会打开结束页面
            })
        }, 2000);
        this.playsound("win.ogg")
        this.iswin = true
        this.createsp.leave += 1
        Laya.LocalStorage.setItem("leave", this.createsp.leave)
        this.cubeback()
        this.havestart = false
        this.touchplace.alpha = 0
        this.readtomove = false
        this.cir.x = this.touchplace.width / 2
        this.cir.y = this.touchplace.height / 2
        this.bian.rotation = 0
        this.bili = { x: 0, y: 0 }
    }

    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    public saveGameData() {
        Laya.LocalStorage.setItem("Game_Data", Us_tippy_er.getSave_tippy_Data());
        // Http_tippy_Unit.saveGame_tippy_Data(Us_tippy_er.getSave_tippy_Data(),
        //     (res) => {
        //         if (res.code == 1) {
        //             console.log("存档成功")
        //         }
        //         else {
        //             console.log("存档失败")
        //         }
        //     },
        //     (res) => {
        //         console.log("存档失败")
        //     })
    }
}