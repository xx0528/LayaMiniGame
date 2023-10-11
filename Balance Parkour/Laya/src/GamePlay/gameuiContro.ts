import endlayer from "./Uis/endlayer";
import fuhuolayer from "./Uis/fuhuolayer";
import MainLayer from "./Uis/MainLayer";
import Adlayer from "./Uis/Adlayer";
import cebianlayer from "./Uis/cebianlayer";
import BannerAd_tippy_View from "../ShareAd/View/BannerAdView";

export default class gameuiContro extends Laya.Script {
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
    public zuanshinum = 0
    public allcube
    // public nowcube
    onEnable(): void {
    }

    onDisable(): void {
    }

    onAwake() {
        this.getgameuichild()
    }
    public gameUI
    public fuhuolayersp
    public endlayersp
    public mainlayersp
    public adlayersp
    public cebianlayer

    public leavelab: Laya.FontClip
    public jindutiao: Laya.Sprite
    public zuanshilab: Laya.FontClip
    public guanggao1: Laya.Sprite
    public loopclib: Laya.Clip
    public loadinglayer: Laya.Clip

    public static cebian
    public static manager
    // public touchcontao: Laya.Sprite
    getgameuichild() {//获取游戏层的所有UI
        gameuiContro.manager = this
        console.log("场景控制", this.owner);
        // let a = this.owner as Laya.Sprite
        // a.height = Laya.Browser.height
        this.gameUI = this.owner.getChildAt(0).getChildByName("GameUI");
        console.log("gameUI");
        
        // this.touchcontao = this.gameUI.getChildAt(1)
        // this.leavelab = this.gameUI.getChildAt(0).getChildAt(0).getChildAt(1);
        this.zuanshilab = this.gameUI.getChildAt(0).getChildAt(1).getChildAt(1);
        this.jindutiao = this.gameUI.getChildAt(0).getChildAt(2).getChildAt(0);
        // this.guanggao1 = this.owner.getChildAt(0).getChildByName("guanggao1") as Laya.Sprite;
        // this.loopclib = this.owner.getChildAt(0).getChildByName("LoopAD") as Laya.Clip;
        // this.loopclib.y = Laya.stage.height - this.loopclib.height
        // this.gameUI.y = Laya.stage.height - this.gameUI.height
        this.setduiqi(this.gameUI, true)
        // this.setduiqi(this.loopclib)
        this.setduiqi(this.owner.getChildAt(0).getChildByName("Mainscene"), true)
        this.setduiqi(this.owner.getChildAt(0).getChildByName("fuhuolayer"), true)
        this.setduiqi(this.owner.getChildAt(0).getChildByName("endlayer"), true)
        this.loadinglayer = this.owner.getChildAt(0).getChildByName("loadinglayer") as Laya.Clip
        this.setduiqi(this.loadinglayer, true)
        // console.log(this.gameUI.y, this.loopclib.y);

        // console.log(this.loopclib);
        // this.loopclib['_widget']["_bottom"] = 0
        // setTimeout(() => {
        //     console.log(this.loopclib);
        // }, 2000);
        // console.log(this.owner.getChildAt(0));
        this.mainlayersp = this.owner.getChildAt(0).getChildByName("Mainscene").addComponent(MainLayer);
        this.fuhuolayersp = this.owner.getChildAt(0).getChildByName("fuhuolayer").addComponent(fuhuolayer);
        // console.log("结束开始");

        this.endlayersp = this.owner.getChildAt(0).getChildByName("endlayer").addComponent(endlayer);
        // this.adlayersp = this.owner.getChildAt(0).getChildByName("guanggaolayer").getComponent(Adlayer);
        // this.cebianlayer = this.owner.getChildAt(0).getChildByName("cebianadlayer").getComponent(cebianlayer);
        // gameuiContro.cebian = this.cebianlayer
        // console.log("拿到了");
        // this.cebianbanner = this.owner.getChildAt(0).getChildByName("BannerAD").getComponent(BannerAd_tippy_View);
        // let a = this.cebianbanner.owner as Laya.Clip

        // this.setduiqi(a, false, true)
    }
    public cebianbanner

    showcebianbanner() {
        console.log("展示");
        if (window['nulad']) {
            return;
        }
        // this.cebianbanner.owner.visible = true
        // this.cebianbanner.createbanner()
    }

    unshowcebianbanner() {
        console.log("影藏");
        if (window['nulad']) {
            return;
        }
        // this.cebianbanner.owner.visible = false
        // this.cebianbanner.offbanner()
    }

    setduiqi(tar, height?, banner?) {
        if (!tar) {
            return;
        }
        if (height) {
            tar.height = Laya.stage.height
        } else {
            tar.y = Laya.stage.height - tar.height
            console.log(tar.y);
            if (banner) {
                tar.y = Laya.stage.height - tar.height - 60
            }
        }

    }
    nextleave(leave, allcube) {//换关卡重置数据
        // console.log("重置钻石数量");
        // this.leavelab.value = leave + ''
        this.allcube = allcube
        this.zuanshinum = 0
        this.zuanshilab.value = this.zuanshinum + ''
        this.setjindu(0)
    }

    addzuanshi() {//增加钻石数量
        this.zuanshinum += 1
        this.zuanshilab.value = this.zuanshinum + ''
        console.log("钻石数量", this.zuanshinum);
    }

    setjindu(now) {//设置进度
        // this.nowcube = now
        let bili = now / this.allcube;
        this.jindutiao.scaleX = bili
        // console.log("完成比例",bili);
    }

    backtoMainscene() {//回到主页

    }
}