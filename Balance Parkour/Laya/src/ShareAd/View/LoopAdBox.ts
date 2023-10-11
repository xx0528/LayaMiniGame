import WXAPI from "../../WXAPI";
import Share_tippy_Ad from "../ShareAd";
import AL_tippy_D from "../../ALD";
import Event_tippy_Mgr from "../../Event/EventMgr";
import { Event_tippy_Def } from "../../Event/EventDef";
import OPPOAPI from "../../OPPOAPI";
import gameuiContro from "../../GamePlay/gameuiContro";
import QQMiniGameAPI from "../../QQMiniGameAPI";

export default class LoopAd_tippy_Box extends Laya.Script {
    protected _displaySp: Laya.Sprite;
    protected _disText: Laya.Text;
    protected _data: any = null;
    protected _originW: number = 150;
    protected _originH: number = 150;
    protected _fontSize = 25;


    onAwake()  {
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._originW = this._displaySp.width;
        this._originH = this._displaySp.height;
        this._disText = this.owner.getChildByName("TitelText") as Laya.Text;
        this._disText.text = "";
        this._fontSize = this._disText.fontSize;
    }

    onEnable(): void {
        this._displaySp.on(Laya.Event.CLICK, this, this.onSp_tippy_Click);
    }

    onDisable(): void {
        this._displaySp.off(Laya.Event.CLICK, this, this.onSp_tippy_Click);
    }

    public set_tippy_Data(data)  {
        // console.log("设置属性");
        if (data)  {
            var self = this;
            this._displaySp.loadImage(data.logo, Laya.Handler.create(this, function ()  {
                if (!self._displaySp.destroyed)  {
                    self._displaySp.width = self._originW;
                    self._displaySp.height = self._originH;
                }
            }));
            var str = String(data.title);
            var num = str.length;
            num = Math.max(5, num);
            var fontSize = Math.floor((5 / num) * this._fontSize);
            this._disText.fontSize = fontSize;
            this._disText.text = str;
            this._data = data;
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
    protected onSp_tippy_Click(e: Laya.Event)  {
        e.stopPropagation();
        this.playsound("click.ogg")
        var data = this._data;
        if (data)  {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                WXAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                    AL_tippy_D.aldSendReport_tippy_AdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        gameuiContro.cebian.move(1)
                        console.log("用户取消跳转");
                        AL_tippy_D.aldSendReportAd_tippy_ClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPPOAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
            {
                QQMiniGameAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    gameuiContro.cebian.move(1)
                    Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }
}