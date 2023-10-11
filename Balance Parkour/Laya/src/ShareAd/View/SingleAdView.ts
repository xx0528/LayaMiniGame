import Share_tippy_Ad from "../ShareAd";
import Ut_tippy_ilit_tippy_ from "../../Utilit";
import WXAPI from "../../WXAPI";
import AL_tippy_D from "../../ALD";
import Event_tippy_Mgr from "../../Event/EventMgr";
import { Event_tippy_Def } from "../../Event/EventDef";
import OPPOAPI from "../../OPPOAPI";
import movefunc2d from "../../GamePlay/movefunc2d";
import gameuiContro from "../../GamePlay/gameuiContro";
import Sound_tippy_Mgr from "../../Mgr/SoundMgr";
import QQMiniGameAPI from "../../QQMiniGameAPI";

export default class SingleAd_tippy_View extends Laya.Script 
{
    public AdPosID : number = Share_tippy_Ad.LoopAdLocationID;
    protected _ownerSprite :Laya.Sprite;
    protected _displaySp : Laya.Sprite;
    protected _disText : Laya.Text;
    protected _aniForward : boolean = false;
    protected _data : any = null;
    protected _fontSize = 25;
    protected _originSize = 1;
    protected _originW: number = 150;
    protected _originH: number = 150;

    public btn

    public static datas
    onAwake() {
        // console.log("应该结束");

        this._ownerSprite = this.owner as Laya.Sprite;
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._originW = this._displaySp.width;
        this._originH = this._displaySp.height;
        this._disText = this.owner.getChildByName("TitelText") as Laya.Text;
        this._disText.text = "";
        this._fontSize = this._disText.fontSize;
        this._originSize = this._displaySp.scaleX;
        this.btn = this.owner.getChildByName("btngo1") as Laya.Sprite;
        if (this.btn) {
            movefunc2d.btnmove(this.btn, 100, (e) => {
                // console.log("执行");

                // this.onSpClick(e)
            })
        }
    }

    onEnable(): void {
        this.refresh_tippy_ADVDis();
        Laya.timer.loop(3000, this, this.refresh_tippy_ADVDis);

        this._ownerSprite.on(Laya.Event.CLICK, this, this.onSp_tippy_Click);
    }

    onDisable(): void {
        Laya.timer.clearAll(this);
        this._ownerSprite.off(Laya.Event.CLICK, this, this.onSp_tippy_Click);
    }

    protected refresh_tippy_ADVDis() {
        var self = this;
        Share_tippy_Ad.getADV_tippy_s(this.AdPosID,(datas)=>
        {
            if(self.owner && !self.owner.destroyed)
            {
                if(datas && datas.length > 0)
                {
                    (self.owner as Laya.Sprite).visible = true;
                    var data = datas[Math.floor(Math.random() * datas.length)];
    
                    self._displaySp.loadImage(data.logo,Laya.Handler.create(self,function()
                    {
                        if(!self._displaySp.destroyed)
                        {
                            self._displaySp.width = self._originW;
                            self._displaySp.height = self._originH;
                            self._displaySp.scale(self._originSize,self._originSize);
                        }
                    }));
                    var str = String(data.title);
                    var num = str.length;
                    var fontSize = Math.floor((5 / num) * this._fontSize);
                    self._disText.fontSize = fontSize;
                    self._disText.text = str;
                    self._data = data;
                    window['nulad'] = false
                }
                else
                {
                    console.log("单个错误！！！！！！！！！！");
                    window['nulad'] = true
                    Laya.timer.clearAll(this);
                    (self.owner as Laya.Sprite).visible = false;
                }
            }
        })
    }

    onUpdate() {
        this.display_tippy_Ani();
    }

    protected display_tippy_Ani() {
        if (!this._aniForward) {
            var scale = this._displaySp.scaleX - Laya.timer.delta / 3000 * 1;
            scale = Math.max(scale, 0);
            this._displaySp.scale(scale, scale);
            if (this._displaySp.scaleX <= 0.95 * this._originSize) {
                this._aniForward = true;
            }
        }
        else {
            var scale = this._displaySp.scaleX + Laya.timer.delta / 3000 * 1;
            scale = Math.min(scale, 1 * this._originSize);
            this._displaySp.scale(scale, scale);
            if (this._displaySp.scaleX >= this._originSize) {
                this._aniForward = false;
            }
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
    protected onSp_tippy_Click(e: Laya.Event) {
        e.stopPropagation();
        this.playsound("click.ogg")
        var data = this._data;
        if (data) {
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
                        console.log("用户取消跳转");
                        gameuiContro.cebian.move(1)
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

    public static onSpClick(call) {
        if (!SingleAd_tippy_View.datas) {
            return;
        } else if (SingleAd_tippy_View.datas == 1) {
            setTimeout(() => {
                SingleAd_tippy_View.onSpClick(call)
            }, 500);
             return;
        }
        // data = 
        var data = SingleAd_tippy_View.datas[Math.floor(Math.random() * SingleAd_tippy_View.datas.length)];
        // console.log(data);
        
        if (data) {
            console.log("跳转游戏： " + data.title);
            // call()
            WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
            console.log("跳转成功")
            Share_tippy_Ad.reportUser_tippy_Click(data.appid);
            AL_tippy_D.aldSendReport_tippy_AdClickSuccess(data);
            }, (res) => {
            console.log("跳转失败")
        
            Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                    call()
                    console.log("用户取消跳转");
                    AL_tippy_D.aldSendReportAd_tippy_ClickFail(data);
                }
                }, (res) => {
                console.log("跳转完成")
            });
        }
    }
    
}