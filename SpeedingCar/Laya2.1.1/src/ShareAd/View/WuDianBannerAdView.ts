import _wcjtn_ShareAd_wcjtn_ from "../ShareAd";
import WX_wcjtn_API from "../../WXAPI";
import ALD from "../../ALD";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";
import App_wcjtn_Switch_wcjtn_Config from "../../Config/AppSwitchConfig";
import OPPO_wcjtn_API from "../../OPPOAPI";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "../../QQMiniGameAPI";

export default class Wu_wcjtn_dian_wcjtn_Banner_wcjtn_AdView extends Laya.Script {
    public Ad_wcjtn_Pos_wcjtn_ID: number = _wcjtn_ShareAd_wcjtn_.Banner_wcjtn_AdLocationID;
    protected _display_wcjtn_Sp: Laya.Sprite;
    protected _data_wcjtn_: any = null;

    public WX_wcjtn_Banner_wcjtn_Width: number;
    protected _wx_wcjtn_Banner: any = null;

    onAwake() {
        this._display_wcjtn_Sp = this.owner.getChildByName("Display") as Laya.Sprite;
        this._display_wcjtn_Sp.visible = false;
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.AD_Wu_wcjtn_dian_wcjtn_Banner_Show, this, this.Show_wcjtn_Banner);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.AD_Wu_wcjtn_dian_wcjtn_Banner__wcjtn_Hide, this, this.Hide_wcjtn_Banner);
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.AD_Wu_wcjtn_dian_wcjtn_Banner_Pre_wcjtn_Load, this, this.Pre_wcjtn_load_wcjtn_Banner);
    }

    onEnable(): void {
        this.Pre_wcjtn_load_wcjtn_Banner();
    }
    public Pre_wcjtn_load_wcjtn_Banner() {
        if ((this.owner as Laya.UIComponent).visible == false) return;
        var banner = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().ba_wcjtn_nner;
        if (1 == banner && Laya.Browser.onMiniGame) {
            this.refresh_wcjtn_WXBanner();
        }
        else {
            this.refresh_wcjtn_Banner_wcjtn_Dis();
        }
    }
    public Show_wcjtn_Banner() {
        if ((this.owner as Laya.UIComponent).visible == false) return;
        console.log("showBanner");
        var banner = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().ba_wcjtn_nner;
        if (1 == banner && Laya.Browser.onMiniGame && this._wx_wcjtn_Banner) {
            console.log("WxshowBanner");
            this._wx_wcjtn_Banner.show();
        }
        else if (this._data_wcjtn_ != null) {
            this._display_wcjtn_Sp.visible = true;
            this._display_wcjtn_Sp.on(Laya.Event.CLICK, this, this.on_wcjtn_Sp_wcjtn_Click);
        }
    }
    public Hide_wcjtn_Banner() {
        this._display_wcjtn_Sp.off(Laya.Event.CLICK, this, this.on_wcjtn_Sp_wcjtn_Click);
        this._display_wcjtn_Sp.visible = false;
        this.clear_wcjtn_WXBaner();
    }
    onDestroy() {
        this.Hide_wcjtn_Banner();
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.AD_Wu_wcjtn_dian_wcjtn_Banner_Show, this, this.Show_wcjtn_Banner);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.AD_Wu_wcjtn_dian_wcjtn_Banner__wcjtn_Hide, this, this.Hide_wcjtn_Banner);
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.AD_Wu_wcjtn_dian_wcjtn_Banner_Pre_wcjtn_Load, this, this.Pre_wcjtn_load_wcjtn_Banner);
    }
    // onDisable(): void {
    //     this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
    //     this.clearWXBaner();
    // }

    protected refresh_wcjtn_Banner_wcjtn_Dis() {
        var self = this;
        _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID, (datas) => {
            if (datas && datas.length > 0) {
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._display_wcjtn_Sp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self._display_wcjtn_Sp.destroyed) {
                        self._display_wcjtn_Sp.width = 750;
                        self._display_wcjtn_Sp.height = 256;
                        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_Wu_wcjtn_dianBanner_Load_wcjtn_Complete);
                    }
                }));
                self._data_wcjtn_ = data;
            }
        }, false)
    }

    protected on_wcjtn_Sp_wcjtn_Click() {
        var data = this._data_wcjtn_;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            if(Laya.Browser.onMiniGame)
            {
                WX_wcjtn_API.navigate_wcjtn_To_wcjtn_MiniProgram(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    _wcjtn_ShareAd_wcjtn_.report_wcjtn_User_wcjtn_Click(data.appid);
                    ALD.ald_wcjtn_Send_wcjtn_ReportAdClickSuccess(data);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                    if(res.errMsg == "navigateToMiniProgram:fail cancel")
                    {
                        console.log("用户取消跳转");
                        ALD.aldSend_wcjtn_ReportAd_wcjtn_ClickFail(data);
                    }
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQGMiniGame)
            {
                OPPO_wcjtn_API.navigate_wcjtn_To_wcjtn_MiniProgram(data.appid,data.title,data.url,(res)=>
                {
                    console.log("跳转成功")
                    _wcjtn_ShareAd_wcjtn_.report_wcjtn_User_wcjtn_Click(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
            {
                QQ_wcjtn_Mini_wcjtn_GameAPI.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program(data.appid,data.url,(res)=>
                {
                    console.log("跳转成功")
                    _wcjtn_ShareAd_wcjtn_.report_wcjtn_User_wcjtn_Click(data.appid);
                },(res)=>
                {
                    console.log("跳转失败")
                    Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                },(res)=>
                {
                    console.log("跳转完成")
                });
            }
        }
    }

    protected refresh_wcjtn_WXBanner() {
        if (!Laya.Browser.onMiniGame)
            return;
        this.clear_wcjtn_WXBaner();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._display_wcjtn_Sp.localToGlobal(new Laya.Point(0, 0))

        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WX_wcjtn_Banner_wcjtn_Width ? this.WX_wcjtn_Banner_wcjtn_Width / Laya.stage.width * sw : sw;

        this._wx_wcjtn_Banner = Laya.Browser.window["wx"].createBannerAd(
            {
                adUnitId: WX_wcjtn_API.banner_wcjtn_AdUnitId,
                adIntervals: 30,
                style:
                    {
                        left: left,
                        top: top,
                        width: width,
                    }
            })
        self._wx_wcjtn_Banner.onLoad((res) => {
            console.log("误点Banner广告 加载完成");
            console.log(res);
            Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_Wu_wcjtn_dianBanner_Load_wcjtn_Complete);
        })
        this._wx_wcjtn_Banner.onError((err) => {
            console.log("误点Banner广告 加载失败");
            console.log(err);
            self.refresh_wcjtn_Banner_wcjtn_Dis();
            self.clear_wcjtn_WXBaner();
        })
        this._wx_wcjtn_Banner.onResize(res => {
            console.log(self._wx_wcjtn_Banner.style.realWidth, self._wx_wcjtn_Banner.style.realHeight)
        })
        self._wx_wcjtn_Banner.hide();
    }

    public clear_wcjtn_WXBaner() {
        if (this._wx_wcjtn_Banner) {
            this._wx_wcjtn_Banner.destroy();
        }
        this._wx_wcjtn_Banner = null;
    }
}