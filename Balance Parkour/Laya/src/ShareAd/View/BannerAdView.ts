import Share_tippy_Ad from "../ShareAd";
import WXAPI from "../../WXAPI";
import AL_tippy_D from "../../ALD";
import Event_tippy_Mgr from "../../Event/EventMgr";
import { Event_tippy_Def } from "../../Event/EventDef";
import AppSwitch_tippy_Config from "../../Config/AppSwitchConfig";
import OPPOAPI from "../../OPPOAPI";
import gameuiContro from "../../GamePlay/gameuiContro";
import QQMiniGameAPI from "../../QQMiniGameAPI";

export default class BannerAd_tippy_View extends Laya.Script 
{
    public AdPosID : number = Share_tippy_Ad.BannerAdLocationID;
    protected _displaySp : Laya.Sprite;
    protected _data : any = null;

    public WXBannerWidth : number;
    protected _wxBanner : any = null;

    onAwake()
    {
        window["testbanner"] = false
        console.log("nanner");
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        if (null == this._displaySp) {
            this._displaySp = this.owner as Laya.Sprite;
        }

        console.log(this._displaySp.localToGlobal(new Laya.Point(0, 0)), "这是啥");

    }



    onEnable(): void {
        // console.log("广告enable!!!");

    }

    createbanner() {
        if (window['nulad']) {
            return ;
        }
        this._displaySp.on(Laya.Event.CLICK, this, this.onSpClick);
        var banner = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().banner;
        if (0 == banner) {
            if (window["testbanner"]) {
                this.refreshWXBanner();
            } else {
                this.refreshBannerDis();
                Laya.timer.loop(3000, this, this.refreshBannerDis);
            }

            // 
        }
        else if (1 == banner) {
            if (window["testbanner"]) {
                this.refreshBannerDis();
                Laya.timer.loop(3000, this, this.refreshBannerDis);
            } else {
                this.refreshWXBanner();
            }

        }

    }

    offbanner() {
        this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
        this.clearWXBaner();
        Laya.timer.clear(this, this.refreshBannerDis)
    }

    onDisable(): void {
        // console.log("广告Disable!!!");

    }

    protected refreshBannerDis() {
        var self = this;
        Share_tippy_Ad.getADV_tippy_s(this.AdPosID, (datas) => {
            // console.log("bannner", datas);
            if (datas && datas.length > 0) {
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._displaySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self._displaySp.destroyed) {
                        self._displaySp.width = 750;
                        self._displaySp.height = 256;
                    }
                }));
                self._data = data;
                window['nulad'] = false
            } else {
                console.log("banner错误！！！！！！！！！！！！！");
                
                window['nulad'] = true
                this.owner['visble'] = false
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
    protected onSpClick() {
        var data = this._data;
        this.playsound("click.ogg")
        if (data) {
            // gameuiContro.cebian.move(1)
            let self = this
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
            else if (Laya.Browser.onQQMiniGame)  //qq小游戏
            {
                QQMiniGameAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
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
        }
    }

    protected refreshWXBanner()
    {
        if(!Laya.Browser.onMiniGame || !(this.owner as Laya.Sprite).visible)
            return;
        this.clearWXBaner();
        if (window['nulad']) {
            return ;
        }
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._displaySp.localToGlobal(new Laya.Point(0, 0))

        var left = pos.x / Laya.stage.width * sw;
        var top = (pos.y - 28) / Laya.stage.height * sh;
        var width = this.WXBannerWidth ? this.WXBannerWidth / Laya.stage.width * sw : sw;
        console.log(top, "数值是");

        this._wxBanner = Laya.Browser.window["wx"].createBannerAd(
            {
                adUnitId: WXAPI.bannerAdUnitId,
                adIntervals: 30,
                style:
                    {
                        left: left,
                        top: top,
                        width: width,
                    }
            })
        self._wxBanner.onLoad((res) => {
            console.log("WXBanner广告 加载完成");
            console.log(res);
        })
        this._wxBanner.onError((err) => {
            console.log("WXBanner广告 加载失败");
            console.log(err);
            self.refreshBannerDis();
            self.clearWXBaner();
        })
        this._wxBanner.onResize(res => {
            console.log(self._wxBanner.style.realWidth, self._wxBanner.style.realHeight)
        })
        self._wxBanner.show();
    }
    
    public clearWXBaner()
    {
        if(this._wxBanner)
        {
            this._wxBanner.destroy();
        }
        this._wxBanner = null;
    }

    onUpdate() {

    }
}