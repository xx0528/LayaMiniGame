import Game_tippy_Mgr from "../../Mgr/GameMgr";
import movefunc2d from "../movefunc2d";
import SingleAd_tippy_View from "../../ShareAd/View/SingleAdView";
import gameuiContro from "../gameuiContro";
import WXAPI from "../../WXAPI";
import BannerAd_tippy_View from "../../ShareAd/View/BannerAdView";
import fuhuolayer from "./fuhuolayer";
import QQMiniGameAPI from "../../QQMiniGameAPI";
import AppConfig from "../../AppConfig";
import AppSwitch_tippy_Config from "../../Config/AppSwitchConfig";
import CachedWXBannerAd from "../../CachedWXBannerAd";
import Wudian_tippy_Mgr from "../../Mgr/WudianMgr";
import NativeCallback from "../../NativeCallback";
import Sound_tippy_Mgr from "../../Mgr/SoundMgr";
import Event_tippy_Mgr from "../../Event/EventMgr";
import { Event_tippy_Def } from "../../Event/EventDef";

export default class endlayer extends Laya.Script {
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

    public title: Laya.Sprite
    public guan: Laya.Sprite
    public level: Laya.Sprite
    public createlayer: Laya.Sprite
    public levelNum: Laya.FontClip//第xx关
    public btndouw: Laya.Sprite//双倍钻石按钮
    public btnconti: Laya.Sprite//双倍钻石按钮
    public btnback: Laya.Sprite//双倍钻石按钮
    public allzuan: Laya.FontClip//所有钻石
    public addzuan: Laya.FontClip//增加的钻石
    public addzuanbg: Laya.Sprite
    public banner
    public nodes: Laya.Clip
    public iswin = false
    public gameUI
    public uiconr

    public clicked = false
    onAwake() {
        // console.log("借书层endlayer");
        this.gameUI = Game_tippy_Mgr.mainsp
        this.uiconr = this.gameUI.gameuicontrosp
        this.nodes = this.owner as Laya.Clip
        this.getchild()
        this.setbtn()
    }

    onStart() {
        this.btndouw.visible = true
    }
    



    btnsave(time?) {
        if (this.clicked) {
            return;
        }
        let t = 600
        if (time) {
            t = time
        }
        this.clicked = true
        setTimeout(() => {
            this.clicked = false
        }, t);
    }

    public static nexttime = 0
    public haveopen = false//是否打开了banner
    public waking = false
    wake() {//唤醒banner
        // if (this.waking) {
        //     return;
        // }
        // this.waking = true
        // setTimeout(() => {
        //     CachedWXBannerAd.show()
        //     setTimeout(() => {
        //         this.haveopen = true
        //         this.waking = false
        //         this.btndown.bottom = 300
        //     }, 500);
        // }, 500);
    }
    setbtn() {
        movefunc2d.btnmove(this.btnconti, 100, () => {
            this.gameUI.playsound("click.ogg")
            this.btnsave()
            // if (Wudian_tippy_Mgr.WudianFlag) {
            //     if (!this.haveopen) {
            //         this.wake()
            //         return ;
            //     }
            // }
            // let s = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData()
            // if (s.share_next == 1) {
            //     if (endlayer.nexttime >= s.share_level) {
            //         console.log("分享！");
            //         QQMiniGameAPI.share(() => {
            //             console.log("分享");
            //         }, "好友@你，是时候来一场真正的决斗了！", "subRes/share.jpg")
            //         endlayer.nexttime = 0
            //         return;
            //     }
            //     endlayer.nexttime++
            // }

            // try {
            //     gameuiContro.cebian.move(2)
            //     this.banner.offbanner()
            // } catch (error) {

            // }
            fuhuolayer.isend = false
            this.gameUI.box.once(Laya.Event.MOUSE_DOWN, this, (e: Laya.Event) => {
                this.gameUI.startgame()
            })
            if (!this.uiconr) {
                this.uiconr = this.gameUI.gameuicontrosp
            }
            try {
                // if (!window['nulad']) {
                //     this.uiconr.cebianlayer.nodes.visible = true
                // } else {
                //     this.uiconr.cebianlayer.nodes.visible = false
                // }
                // this.uiconr.loopclib.alpha = 1
                // this.uiconr.loopclib.visible = true
                // this.uiconr.guanggao1.alpha = 1
            } catch (error) {

            }

            let c = this.gameUI.box.getChildAt(0) as Laya.Label
            c.visible = true
            this.gameUI.box.alpha = 1
            Game_tippy_Mgr.mainsp.addlayer()
            Laya.Tween.to(this.nodes, { alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
                this.nodes.visible = false
            }))

        }, false, true)
        movefunc2d.btnmove(this.btnback, 100, () => {
            this.gameUI.playsound("click.ogg")
            this.btnsave()
            // if (Wudian_tippy_Mgr.WudianFlag) {
            //     if (!this.haveopen) {
            //         this.wake()
            //         return ;
            //     }
            // }
            // this.banner.offbanner()
            fuhuolayer.isend = false
            // gameuiContro.cebian.move(2)
            this.gameUI.boxmove(1, () => {
                this.nodes.visible = false
                // console.log(this.uiconr, "这里", this.gameUI);
                if (!this.uiconr) {
                    this.uiconr = this.gameUI.gameuicontrosp
                }

                if (window['nulad']) {
                    this.uiconr.mainlayersp.reflash()
                    return;
                }

                // this.gameUI.gameuicontrosp.cebianlayer.nodes.visible = true
                // this.uiconr.adlayersp.reflash()
                // console.log("不是");
                setTimeout(() => {
                    this.gameUI.boxmove(2, () => {
                        let c = this.gameUI.box.getChildAt(0) as Laya.Label
                        c.visible = true
                        this.gameUI.box.alpha = 1
                    })
                }, 100);

            })
        }, false, true)
        movefunc2d.btnmove(this.btndouw, 100, () => {
            console.log("双倍");
            this.gameUI.playsound("click.ogg")
            this.btnsave(3000)
            // if (Wudian_tippy_Mgr.WudianFlag) {
            //     if (!this.haveopen) {
            //         this.wake()
            //         return ;
            //     }
            // }
            var self = this

            if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                NativeCallback.CallNativeFunc("showRewardVideo");
                Sound_tippy_Mgr.instance.stop_tippy_BGM();
            }
            else {
                endlayer.nexttime++
                Game_tippy_Mgr.mainsp.addlayer()
                self.zuanshifly()
                let add = Number(self.addzuan.value)
                if (!self.uiconr) {
                    self.uiconr = self.gameUI.gameuicontrosp
                }
                let save = Number(Laya.LocalStorage.getItem("allzuan")) + add
                self.addzuan.value = add * 2 + ''
                self.allzuan.value = save + ''
                Laya.LocalStorage.setItem("allzuan", save + '')
                self.btndouw.visible = false
            }

            // QQMiniGameAPI.showRewardedVideoAd((isguo) => {
            //     if (isguo) {
            //         endlayer.nexttime++
            //         Game_tippy_Mgr.mainsp.addlayer()
            //         self.zuanshifly()
            //         let add = Number(self.addzuan.value)
            //         if (!self.uiconr) {
            //             self.uiconr = self.gameUI.gameuicontrosp
            //         }
            //         let save = Number(Laya.LocalStorage.getItem("allzuan")) + add
            //         self.addzuan.value = add * 2 + ''
            //         self.allzuan.value = save + ''
            //         Laya.LocalStorage.setItem("allzuan", save + '')
            //         self.btndouw.visible = false
            //     }

            // }, null)

        }, false, true)
    }

    zuanshifly() {
        let rangex = 40
        let rangey = 40
        for (let index = 0; index < 10; index++) {
            let endx = 180 + (Math.random() * rangex - rangex / 2)
            let createx = this.btndouw.x + (Math.random() * rangex - rangex / 2)
            let createy = this.btndouw.y + (Math.random() * rangey - rangey / 2)
            var ape: Laya.Sprite = new Laya.Sprite();
            ape.pos(createx, createy);
            ape.scale(0.5, 0.5)
            this.createlayer.addChild(ape);
            ape.loadImage("subRes/gamezuanshi.png");
            ape.alpha = 0
            movefunc2d.fadeto(1, ape, 200)
            Laya.Tween.to(ape, { x: endx, y: 65 }, 1000, Laya.Ease.circOut, Laya.Handler.create(this, (res) => {
                // console.log(res);

                movefunc2d.fadeto(0, res, 200, () => {
                    res.destroy()
                })
            }, [ape]))
        }
    }

    public btndown: Laya.Clip

    getchild() {
        // this.btnback
        // console.log("结束开始加载");

        this.title = this.nodes.getChildByName("title") as Laya.Sprite
        this.level = this.nodes.getChildByName("level") as Laya.Sprite
        this.levelNum = this.level.getChildByName("levelText") as Laya.FontClip

        this.btndown = this.nodes.getChildByName("down") as Laya.Clip

        this.btndouw = this.btndown.getChildByName("btndouzuan") as Laya.Sprite
        this.btnconti = this.btndown.getChildByName("btncontinue") as Laya.Sprite
        this.btnback = this.btndown.getChildByName("btnbacktomain") as Laya.Sprite

        this.allzuan = this.nodes.getChildByName("allzuan").getChildAt(0) as Laya.FontClip
        this.addzuanbg = this.nodes.getChildByName("addzuan") as Laya.Sprite
        this.addzuan = this.addzuanbg.getChildAt(1) as Laya.FontClip
        // console.log("结束加载哇");
        this.createlayer = this.nodes.getChildByName("createlayer") as Laya.Sprite
        // this.banner = this.nodes.getChildByName("BannerAD").getComponent(BannerAd_tippy_View)
        this.movepos()
    }


    public vloopclip: Laya.Clip
    movepos() {//全面屏加宽
        // this.vloopclip = this.nodes.getChildByName("vloopAD") as Laya.Clip
        // let addrange = Laya.stage.height - 1334
        // if (addrange > 0) {
        //     console.log("大于就拉伸");
        //     this.vloopclip.height += addrange
        //     this.vloopclip.getChildAt(0)['height'] += addrange
        //     // this.btnconti.y += addrange
        //     // this.btnback.y += addrange
        //     // this.btndouw.y += addrange
        // }
    }

    onEnable(): void {
        Event_tippy_Mgr.ins_tippy_tance.regEvemt(Event_tippy_Def.RewardVideoSuccess, this, this.onRewardVideoSuccess);
        Event_tippy_Mgr.ins_tippy_tance.regEvemt(Event_tippy_Def.RewardVideoFail, this, this.onRewardVideoFail);
    }

    onDisable(): void {
        Event_tippy_Mgr.ins_tippy_tance.removeEvent(Event_tippy_Def.RewardVideoSuccess, this, this.onRewardVideoSuccess);
        Event_tippy_Mgr.ins_tippy_tance.removeEvent(Event_tippy_Def.RewardVideoFail, this, this.onRewardVideoFail);
    }
    
    onRewardVideoFail() {

    }

    onRewardVideoSuccess() {
        endlayer.nexttime++
        Game_tippy_Mgr.mainsp.addlayer()
        this.zuanshifly()
        let add = Number(this.addzuan.value)
        if (!this.uiconr) {
            this.uiconr = this.gameUI.gameuicontrosp
        }
        let save = Number(Laya.LocalStorage.getItem("allzuan")) + add
        this.addzuan.value = add * 2 + ''
        this.allzuan.value = save + ''
        Laya.LocalStorage.setItem("allzuan", save + '')
        this.btndouw.visible = false
    }

    reflash(iswin, leave, addzuan?, justre?, b?) {//刷新页面 justre从更多好玩过来的刷新
        // this.zuanshifly()
        // try {
        //     this.gameUI.gameuicontrosp.cebianlayer.nodes.visible = false
        // } catch (error) {

        // }
        if (window['nulad']) {
            justre = true
        }
        this.gameUI.fuhuochance = 1
        this.iswin = iswin

        this.levelNum.value = leave
        if (!this.uiconr) {
            this.uiconr = this.gameUI.gameuicontrosp
        }
        try {
            // this.uiconr.loopclib.alpha = 0
            // this.uiconr.loopclib.visible = false
            // this.uiconr.guanggao1.alpha = 0
        } catch (error) {

        }
        if (Wudian_tippy_Mgr.WudianFlag) {
            this.btndown.bottom = 0
            this.haveopen = false
            // CachedWXBannerAd.hide()
        }else{
            this.btndown.bottom = 300
        }
        

        if (iswin) {
            this.gameUI.addboxlayer()
            // this.getsrcchangepic("subRes/GameScene/gameui/congra.png", this.title)
            // this.getsrcchangepic("subRes/GameScene/gameui/dig.png", this.level)
            // this.getsrcchangepic("subRes/GameScene/gameui/guang.png", this.guan)
            // this.getsrcchangepic("subRes/GameScene/numguannum.png", this.levelNum, true)
            this.levelNum.value = Laya.LocalStorage.getItem("leave")
            this.addzuanbg.visible = true
            this.addzuan.value = addzuan + ''
            // console.log(this.uiconr,"这里", this.gameUI);
            if (!this.uiconr) {
                this.uiconr = this.gameUI.gameuicontrosp
            }
            let savezuan = Number(addzuan) + Number(Laya.LocalStorage.getItem("allzuan"))
            this.allzuan.value = savezuan + ''
            Laya.LocalStorage.setItem("allzuan", savezuan + '')
            // 
            fuhuolayer.isend = false
            this.btndouw.visible = true
        } else {
            this.gameUI.addboxlayer()
            // this.getsrcchangepic("subRes/GameScene/gameui/lose.png", this.title)
            // this.getsrcchangepic("subRes/GameScene/gameui/di.png", this.level)
            // this.getsrcchangepic("subRes/GameScene/gameui/guan.png", this.guan)
            // this.getsrcchangepic("subRes/GameScene/numguannumg.png", this.levelNum, true)
            this.levelNum.value = Laya.LocalStorage.getItem("leave")
            // this.btndouw.active = false
            fuhuolayer.isend = true
            this.btndouw.visible = false
            this.addzuanbg.visible = false
            this.allzuan.value = Laya.LocalStorage.getItem("allzuan")
            let fin = 0
            let r = Math.random() * 100
            if (r <= fin) {
                // console.log("概率到，弹出");
                SingleAd_tippy_View.onSpClick(() => {
                    // gameuiContro.cebian.move(1)
                })
            }
            // this.banner.createbanner()
            console.log("失败打开！！！！");

        }
        if (!justre) {
            // if (iswin) {
            if (b) {
                fuhuolayer.isend = true
            }

            if (this.uiconr) {
                this.uiconr = this.gameUI.gameuicontrosp
            }
            
            return;
            // }
        }

        this.nodes.alpha = 1
        this.nodes.visible = true;
    }

    show() {
        console.log("从更多过来打开!!!");
        try {
            // this.banner.createbanner()

        } catch (error) {

        }
    }

    getsrcchangepic(src, tar, font?) {//传入src和目标更换图片

        if (font) {
            this.levelNum.graphics.clear()
            this.levelNum.skin = src
        } else {
            var textureUrl: string = src;
            var texture: Laya.Texture = Laya.loader.getRes(textureUrl);
            tar.graphics.clear();
            tar.loadImage(textureUrl);
        }

    }
}