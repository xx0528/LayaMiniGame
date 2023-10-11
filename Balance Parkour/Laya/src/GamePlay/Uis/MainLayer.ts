
import Game_tippy_Mgr from "../../Mgr/GameMgr";
import movefunc2d from "../movefunc2d";
import WXAPI from "../../WXAPI";
import SingleAd_tippy_View from "../../ShareAd/View/SingleAdView";
import gameuiContro from "../gameuiContro";
import Wudian_tippy_Mgr from "../../Mgr/WudianMgr";
import View_tippy_Base from "../../View/ViewBase";
import QQMiniGameAPI from "../../QQMiniGameAPI";
import CachedWXBannerAd from "../../CachedWXBannerAd";

export default class MainLayer extends View_tippy_Base {
    
    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

    constructor() { super(); }

    public nodes: Laya.Clip
    public gameUI
    public uiconr

    public clicked = false

    public btnplay: Laya.Sprite//
    public btnmorefun: Laya.Sprite//
    public btnshare: Laya.Sprite//
    public allzuan: Laya.FontClip//所有钻石
    public guan: Laya.FontClip//关卡
    public allzuann = 0
    public box: Laya.Box

    public static onmain = false//在主页
    onAwake() {
        console.log("这里");
        this.gameUI = Game_tippy_Mgr.mainsp


        this.uiconr = this.gameUI.gameuicontrosp
        console.log("不是");

        this.nodes = this.owner as Laya.Clip
        this.getchild()
        this.reflash()
        this.setbtn()
        this.setkongbai()
        // this.gameUI.box.alpha = 0
        this.settalpha()
        this.test()
    }

    onStart(){
        
    }

    test(){
        if (window['nulad']) {
            this.btnmorefun.visible = false
            // return;
        }else{
            this.btnmorefun.visible = true
        }
        setTimeout(() => {
            this.test()
        }, 300);
    }

    settalpha(){
        if (this.gameUI) {
            if (this.gameUI.blackbox) {
                if (this.gameUI.loadread) {
                    console.log("准备释放");
                    setTimeout(() => {
                        // movefunc2d.fadeto(1,this.gameUI.blackbox,500)
                        // this.gameUI.blackbox.alpha = 1
                    }, 1500);
                }else{
                    setTimeout(() => {
                        this.settalpha()
                    }, 100);
                }
            } else {
                setTimeout(() => {
                    this.settalpha()
                }, 100);
            }
        }else{
            this.gameUI = Game_tippy_Mgr.mainsp
            setTimeout(() => {
                this.settalpha()
            }, 100);
        }
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

    reflash() {
        this.nodes.visible = true
        MainLayer.onmain = true
        let a = Laya.LocalStorage.getItem("allzuan")
        if (a) {
            console.log("之前有钻石记录");
            this.allzuann = Number(a)
            this.allzuan.value = a + ''
        } else {
            console.log("没有钻石记录？？？");
            this.allzuan.value = 0 + ''
        }
        // Laya.LocalStorage.setItem("leave",'2')
        let b = Laya.LocalStorage.getItem("leave")
        if (b) {
            console.log("有关卡记录");
            this.guan.value = b + ''
        } else {
            this.guan.value = 1 + ''
        }
        // if (!this.gameUI) {
        setTimeout(() => {
            this.gameUI.box.alpha = 0
            if (!this.uiconr) {
                this.uiconr = this.gameUI.gameuicontrosp
            }
            
            this.uiconr.gameUI.alpha = 0  
            try {
                // if (!window['nulad']) {
                //     this.uiconr.cebianlayer.nodes.visible = true
                // }else{
                //     this.uiconr.cebianlayer.nodes.visible = false
                // }
                
                // this.uiconr.loopclib.alpha = 1
                // this.uiconr.loopclib.visible = true
                // this.uiconr.guanggao1.alpha = 0
            } catch (error) {
                
            }
            
            let fin = 0
            let r = Math.random() * 100
            console.log(r, fin, "概率！！");

            if (r <= fin) {
                console.log("概率到，弹出");
                SingleAd_tippy_View.onSpClick(() => {
                    this.uiconr.cebianlayer.btnopen.alpha = 0
                    this.uiconr.cebianlayer.spr.alpha = 1
                    this.uiconr.cebianlayer.btnback.visible = true
                    this.uiconr.cebianlayer.move(1)
                })
            }


        }, 200);
        // this.gameUI = Laya.stage.getChildAt(1).getChildAt(0).getComponent(Game_tippy_Mgr)

        // }

    }

    setkongbai() {
        console.log(this.nodes.hitArea, "趋势与vvv");

        // this.nodes.hitTestPrior = true
        this.nodes.on(Laya.Event.CLICK, this, (e: Laya.Event) => {

            e.stopPropagation()
            let fin = 0
            let r = Math.random() * 100
            console.log(r, fin, "空白概率！！");
            if (r <= fin) {
                console.log("概率到，弹出");
                SingleAd_tippy_View.onSpClick(() => {
                    this.uiconr.cebianlayer.btnopen.alpha = 0
                    this.uiconr.cebianlayer.spr.alpha = 1
                    this.uiconr.cebianlayer.btnback.visible = true
                    this.uiconr.cebianlayer.move(1)
                })
            }
        })
    }


    btnmove(){
        // let time = 300
        // let scalbig = 1.05
        // let scalsmall = 1
        // Laya.Tween.to(this.btnplay,{scaleX:scalbig,scaleY:scalbig},time,null,Laya.Handler.create(this,()=>{
        //     Laya.Tween.to(this.btnplay,{scaleX:scalsmall,scaleY:scalsmall},time,null,Laya.Handler.create(this,()=>{
        //         this.btnmove()
        //     }))
        // }))
    }

    setbtn() {
        
        this.btnplay.hitTestPrior = true
        this.btnmorefun.hitTestPrior = true
        this.btnmove()
        // movefunc2d.btnmove(this.btnplay, 100, (e: Laya.Event) => {
        //     e.stopPropagation();
        // },false,false,false,true)
        this.btnplay.on(Laya.Event.CLICK,this.btnplay,(e:Laya.Event)=>{
            this.gameUI.playsound("click.ogg")
            e.stopPropagation();
            this.btnsave()
            
            
            this.gameUI.boxmove(1, () => {
                
                this.nodes.visible = false
                this.gameUI.box.alpha = this.gameUI.boxalpha
                // this.uiconr.guanggao1.alpha = 1
                
                Game_tippy_Mgr.mainsp.addlayer()
                this.gameUI.startgame()
                // setTimeout(() => {
                //     this.gameUI.boxmove(2, () => {
                //         this.gameUI.box.once(Laya.Event.MOUSE_DOWN, this, (e: Laya.Event) => {
                //             this.gameUI.startgame()
                //         })
                //         gameuiContro.cebian.move(1)
                //         setTimeout(() => {
                //             gameuiContro.cebian.move(2)
                //         }, 2000);
                //     })
                // }, 100);
            }, 400)
        })
        // movefunc2d.btnmove(this.btnmorefun, 100, (e: Laya.Event) => {
        //     e.stopPropagation();
        // },false,false,false,true)
        this.btnmorefun.on(Laya.Event.CLICK,this.btnmorefun,(e:Laya.Event)=>{
            e.stopPropagation();
            this.gameUI.playsound("click.ogg")
            this.btnsave()
            if (!this.uiconr) {
                this.uiconr = this.gameUI.gameuicontrosp
            }
            this.uiconr.adlayersp.reflash()
        })

        // movefunc2d.btnmove(this.btnshare, 100, (e) => {
        //     e.stopPropagation();
        // },false,false,false,true)
        // this.btnshare.on(Laya.Event.CLICK,this.btnshare,(e:Laya.Event)=>{
        //     e.stopPropagation();
        //     this.gameUI.playsound("click.ogg")
        //     this.btnsave()
        //     // if (!this.uiconr) {
        //         QQMiniGameAPI.share(() => {
        //             console.log("分享");
        //         }, "好友@你，是时候来一场真正的决斗了！", "subRes/share.jpg")
        //     // }
        // })
        // this.btnplay.on(Laya.Event.MOUSE_DOWN, this, )
    }

    getchild() {
        this.allzuan = this.nodes.getChildByName("labbg").getChildAt(0) as Laya.FontClip
        this.btnmorefun = this.nodes.getChildAt(2).getChildByName("btnmoregame") as Laya.Sprite
        this.btnplay = this.nodes.getChildAt(2).getChildByName("btngamestart") as Laya.Sprite
        this.guan = this.nodes.getChildByName("level").getChildByName("levelText") as Laya.FontClip
        // this.btnshare = this.nodes.getChildByName("btnshare") as Laya.Sprite
        this.box = this.nodes.getChildAt(0) as Laya.Box
        console.log("主页加载完");

    }

    onEnable(): void {
    }

    onDisable(): void {
    }
}