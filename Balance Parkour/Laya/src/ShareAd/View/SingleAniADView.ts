import Share_tippy_Ad from "../ShareAd";
import Ut_tippy_ilit_tippy_ from "../../Utilit";
import WXAPI from "../../WXAPI";
import AL_tippy_D from "../../ALD";
import Event_tippy_Mgr from "../../Event/EventMgr";
import { Event_tippy_Def } from "../../Event/EventDef";
import gameuiContro from "../../GamePlay/gameuiContro";
import movefunc2d from "../../GamePlay/movefunc2d";
import OPPOAPI from "../../OPPOAPI";
import QQMiniGameAPI from "../../QQMiniGameAPI";

export default class SingleAniAD_tippy_View extends Laya.Script {
    public AdPosID: number = Share_tippy_Ad.AniAdLocationID;
    protected _owner_tippy_Sprite: Laya.Sprite;
    protected _anima_tippy_tion: Laya.Animation;
    protected _data: any = null;
    public btn
    onAwake() {
        this._owner_tippy_Sprite = this.owner as Laya.Sprite;
        this._anima_tippy_tion = this.owner.getChildByName("Animation") as Laya.Animation;
        this.btn = this.owner.getChildByName("btngo1") as Laya.Sprite;
        if (this.btn) {
            movefunc2d.btnmove(this.btn, 100, (e) => {
                // console.log("执行");

                // this.onSpClick(e)
            })
        }
    }

    onEnable(): void {
        this.refreshADVD_tippy_is();
        this._owner_tippy_Sprite.on(Laya.Event.CLICK, this, this.onSp_tippy_Click);
    }

    onDisable(): void {
        Laya.timer.clearAll(this);
        this._owner_tippy_Sprite.off(Laya.Event.CLICK, this, this.onSp_tippy_Click);
    }

    protected refreshADVD_tippy_is() {
        var self = this;
        Share_tippy_Ad.getADV_tippy_s(this.AdPosID, (datas) => {
            // console.log(datas,"singeraniadview",datas.length);

            if (datas && datas.length > 0) {
                self._owner_tippy_Sprite.visible = true;
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._anima_tippy_tion.loadAtlas(data.atlas, Laya.Handler.create(self, function () {
                    self._anima_tippy_tion.play(0, true);
                }));
                self._data = data;
                window['nulad'] = false
            }
            else {
                console.log("序列帧错误！！！！！！！！！！");
                window['nulad'] = true
                self._owner_tippy_Sprite.visible = false;
            }
        }, false)
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
    protected onSp_tippy_Click(e: Laya.Event) {
        e.stopPropagation();
        this.playsound("click.ogg")
        var data = this._data;
        if (data) {
            console.log("跳转游戏： " + data.title);
            if (Laya.Browser.onMiniGame)  {
                WXAPI.navigateToMiniProgram(data.appid, data.url, (res) =>  {
                    console.log("跳转成功")
                    Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                    AL_tippy_D.aldSendReport_tippy_AdClickSuccess(data);
                }, (res) =>  {
                        console.log("跳转失败")
                        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel")  {
                            gameuiContro.cebian.move(1)
                            console.log("用户取消跳转");
                            AL_tippy_D.aldSendReportAd_tippy_ClickFail(data);
                        }
                    }, (res) =>  {
                        console.log("跳转完成")
                    });
            }
            else if (Laya.Browser.onQGMiniGame)  {
                OPPOAPI.navigateToMiniProgram(data.appid, data.url, (res) =>  {
                    console.log("跳转成功")
                    Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                }, (res) =>  {
                        console.log("跳转失败")
                        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                    }, (res) =>  {
                        console.log("跳转完成")
                    });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
            {
                QQMiniGameAPI.navigateToMiniProgram(data.appid, data.url, (res) =>  {
                    console.log("跳转成功")
                    Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                }, (res) =>  {
                        gameuiContro.cebian.move(1)
                        console.log("跳转失败")
                        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                    }, (res) =>  {
                        console.log("跳转完成")
                    });
            }
        }
    }
}