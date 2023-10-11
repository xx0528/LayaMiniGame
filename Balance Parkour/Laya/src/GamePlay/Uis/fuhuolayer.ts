import Game_tippy_Mgr from "../../Mgr/GameMgr";
import MoveFunc from "../MoveFunc";
import movefunc2d from "../movefunc2d";
import gameuiContro from "../gameuiContro";
import WXAPI from "../../WXAPI";
import BannerAd_tippy_View from "../../ShareAd/View/BannerAdView";
import QQMiniGameAPI from "../../QQMiniGameAPI";
import CachedWXBannerAd from "../../CachedWXBannerAd";
import Wudian_tippy_Mgr from "../../Mgr/WudianMgr";
import NativeCallback from "../../NativeCallback";
import Sound_tippy_Mgr from "../../Mgr/SoundMgr";
import Event_tippy_Mgr from "../../Event/EventMgr";
import { Event_tippy_Def } from "../../Event/EventDef";

export default class fuhuolayer extends Laya.Script {
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
    public btnfuhuo: Laya.Sprite//复活按钮
    public btngiveup: Laya.Sprite//放弃按钮
    public Mainscenesp
    public nodes: Laya.Clip
    public vloopclip: Laya.Clip
    public uiconr
    public banner
    public static isend = false
    onAwake() {
        this.nodes = this.owner as Laya.Clip
        console.log("复活layer");
        this.getchild()

        this.Mainscenesp = Game_tippy_Mgr.mainsp
        this.uiconr = this.Mainscenesp.gameuicontrosp
        // console.log("结束完成");

    }
    public down:Laya.Clip
    public haveopen = false//是否打开了banner
    public waking = false
    wake() {//唤醒banner
        if (this.waking) {
            return;
        }
        this.waking = true
        setTimeout(() => {
            // CachedWXBannerAd.show()
            setTimeout(() => {
                this.haveopen = true
                this.waking = false
                this.down.bottom = 350
            }, 500);
        }, 500);
    }
    getchild() {
        // console.log(this.owner);
        // this.vloopclip = this.nodes.getChildByName("vloopAD") as Laya.Clip
        // this.banner = this.nodes.getChildByName("BannerAD").getComponent(BannerAd_tippy_View)
        this.down = this.owner.getChildByName("down") as Laya.Clip
        this.btnfuhuo = this.down.getChildByName("btnfuhuo") as Laya.Sprite
        this.btngiveup = this.down.getChildByName("btngiveup") as Laya.Sprite
        console.log("复活加载完");
        this.movepos()

    }

    movepos() {//全面屏加宽
        let addrange = Laya.stage.height - 1334
        // if (addrange > 0) {
        //     console.log("大于就拉伸");
        //     this.vloopclip.height += addrange
        //     this.vloopclip.getChildAt(0)['height'] += addrange
        //     // this.btnfuhuo.y += addrange
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
        fuhuolayer.isend = false
        var self = this
        Laya.Tween.to(self.nodes, { alpha: 0 }, 500, null, Laya.Handler.create(self, () => {
            self.nodes.visible = false
            self.Mainscenesp.fuhuo()
        }))
    }

    reflash() {//刷新页面
        if (Wudian_tippy_Mgr.WudianFlag) {
            this.down.bottom = 0
            this.haveopen = false
            // CachedWXBannerAd.hide()
        }else{
            this.down.bottom = 350
        }
        fuhuolayer.isend = true
        this.nodes.visible = true;
        this.nodes.alpha = 1
        // this.Mainscenesp.gameuicontrosp.cebianlayer.nodes.visible = false
        // this.owner
        this.setbtn()
        if (!this.uiconr) {
            this.uiconr = this.Mainscenesp.gameuicontrosp
        }

        try {
            // this.banner.createbanner()
            // this.uiconr.loopclib.alpha = 0
            // this.uiconr.loopclib.visible = false
            // this.uiconr.guanggao1.alpha = 0
        } catch (error) {
            
        }
    }

    setbtn() {
        if (!this.btnfuhuo) {
            this.getchild()
        }
        // console.log("设置好");
        movefunc2d.btnmove(this.btnfuhuo, 100, () => {
            this.Mainscenesp.playsound("click.ogg")
            movefunc2d.btnsave(this.btnfuhuo, 3000)
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
                fuhuolayer.isend = false
                Laya.Tween.to(self.nodes, { alpha: 0 }, 500, null, Laya.Handler.create(self, () => {
                    self.nodes.visible = false
                    self.Mainscenesp.fuhuo()
                }))
            }
            // QQMiniGameAPI.showRewardedVideoAd
            // QQMiniGameAPI.showRewardedVideoAd((isguo) => {
            //     if (isguo) {
            //         if (!self.uiconr) {
            //             self.uiconr = self.Mainscenesp.gameuicontrosp
            //         }
                    
            //         fuhuolayer.isend = false
            //         try {
            //             // self.banner.offbanner()
            //             // if (!window['nulad']) {
            //             //     self.uiconr.cebianlayer.nodes.visible = true
            //             // }else{
            //             //     self.uiconr.cebianlayer.nodes.visible = false
            //             // }
            //             // self.uiconr.loopclib.alpha = 1
            //             // self.uiconr.loopclib.visible = true
            //             // self.uiconr.guanggao1.alpha = 1
            //             // gameuiContro.cebian.move(2)
            //         } catch (error) {
                        
            //         }
                    
            //         Laya.Tween.to(self.nodes, { alpha: 0 }, 500, null, Laya.Handler.create(self, () => {
            //             self.nodes.visible = false
            //             self.Mainscenesp.fuhuo()
            //         }))
            //     }

            // }, null)

        }, false)

        movefunc2d.btnmove(this.btngiveup, 100, () => {
            this.Mainscenesp.playsound("click.ogg")
            movefunc2d.btnsave(this.btngiveup)
            if (Wudian_tippy_Mgr.WudianFlag) {
                if (!this.haveopen) {
                    this.wake()
                    return ;
                }
            }
            try {
                // gameuiContro.cebian.move(2)
                // this.banner.offbanner() 
            } catch (error) {
                
            }
            
            this.Mainscenesp.boxmove(1, () => {
                // let c = this.Mainscenesp.box.getChildAt(0) as Laya.Label
                // c.visible = true
                this.Mainscenesp.initgame(false, 3)
                this.nodes.visible = false
                // this.Mainscenesp.gameuicontrosp.endlayersp.reflash(false, Number(this.Mainscenesp.gameuicontrosp.leavelab.value))
                // this.Mainscenesp.boxmove(2, () => {

                // })
            })
        }, false)
    }
}