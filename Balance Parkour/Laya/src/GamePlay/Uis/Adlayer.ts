import movefunc2d from "../movefunc2d";
import Game_tippy_Mgr from "../../Mgr/GameMgr";
import SingleAd_tippy_View from "../../ShareAd/View/SingleAdView";

export default class Adlayer extends Laya.Script {

    // 更多参数说明请访问: https://ldc2.layabox.com/doc/?nav=zh-as-2-4-0

    constructor() { super(); }

    protected btnback: Laya.Sprite
    protected btnconti: Laya.Sprite

    public vlist: Laya.List
    public hlist: Laya.List
    public Mainscenesp
    public uicon
    public nodes: Laya.Clip
    onAwake() {
        this.Mainscenesp = Game_tippy_Mgr.mainsp
        this.nodes = this.owner as Laya.Clip
        this.uicon = this.Mainscenesp.gameuicontrosp
        this.getchild()
        this.setbtn()
    }

    getchild() {
        this.vlist = this.owner.getChildByName("vloopAD").getChildAt(0) as Laya.List
        this.hlist = this.owner.getChildByName("LoopAD").getChildAt(0) as Laya.List
        this.btnback = this.owner.getChildByName("btnback") as Laya.Sprite
        this.btnconti = this.owner.getChildByName("btnconti") as Laya.Sprite
    }

    setbtn() {

        movefunc2d.btnmove(this.btnback, 100, () => {
            this.Mainscenesp.playsound("click.ogg")
            movefunc2d.fadeto(0, this.nodes, 300, () => {
                this.nodes.visible = false
            })
            if (!this.uicon) {
                this.uicon = this.Mainscenesp.gameuicontrosp
            }
            this.uicon.mainlayersp.reflash()
        }, false, true)
        movefunc2d.btnmove(this.btnconti, 100, () => {
            this.Mainscenesp.playsound("click.ogg")
            movefunc2d.fadeto(0, this.nodes, 300, () => {
                this.nodes.visible = false
            })
            if (!this.uicon) {
                this.uicon = this.Mainscenesp.gameuicontrosp
            }
            // setTimeout(() => {

            this.uicon.endlayersp.show()
            // }, 2000);
            this.uicon.cebianlayer.nodes.visible = false
            this.uicon.endlayersp.reflash(this.datas[0], this.datas[1], this.datas[2], true, true)
        }, false, true)
    }

    public datas
    reflash(isend?) {
        if (window['nulad']) {
            return;
        }
        if (isend) {
            this.datas = isend
            this.btnconti.visible = true
            this.btnback.visible = false
            if (!this.uicon) {
                this.uicon = this.Mainscenesp.gameuicontrosp
            }
            this.uicon.cebianlayer.nodes.visible = true
            this.uicon.cebianlayer.nodes.alpha = 1
        } else {
            this.btnback.visible = true
            this.btnconti.visible = false
        }
        this.nodes.visible = true
        this.nodes.alpha = 0

        movefunc2d.fadeto(1, this.nodes, 300, () => {
            let fin = 0
            let r = Math.random() * 100
            if (r <= fin) {
                console.log("概率到，弹出");
                SingleAd_tippy_View.onSpClick(() => {
                    if (!this.uicon) {
                        this.uicon = this.Mainscenesp.gameuicontrosp
                    }
                    // this.uicon.cebianlayer.nodes.visible = true
                    // this.uicon.cebianlayer.nodes.alpha = 1
                    // this.uicon.cebianlayer.btnopen.alpha = 0
                    // this.uicon.cebianlayer.spr.alpha = 1
                    // this.uicon.cebianlayer.btnback.visible = true
                    this.uicon.cebianlayer.move(1)
                    this.uicon.guanggao1.alpha = 0

                })
            }
            if (!this.uicon) {
                this.uicon = this.Mainscenesp.gameuicontrosp
            }
            this.uicon.loopclib.alpha = 0
            this.uicon.loopclib.visible = false
        })
        try {
            this.vlist.scrollBar.value = Math.random() * this.vlist.scrollBar.max
            this.hlist.scrollBar.value = Math.random() * this.hlist.scrollBar.max
        } catch (error) {
            
        }
        
    }
}