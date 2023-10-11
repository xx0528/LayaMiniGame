import Share_myqq_Ad from "../ShareAd";
import WXAPI from "../../WXAPI";
import ALD from "../../ALD";
import Event_myqq_Mgr from "../../Event/EventMgr";
import { EventDef } from "../../Event/EventDef";
import AppSwitchConfig from "../../Config/AppSwitchConfig";

export default class Banner_myqq_AdView extends Laya.Script 
{
    public AdPosID : number = Share_myqq_Ad.BannerAdLocationID;
    protected _displaySp : Laya.Sprite;
    protected _data : any = null;

    public WXBannerWidth : number;
    protected _wxBanner : any = null;

    onAwake()
    {
        this._displaySp = this.owner.getChildByName("Display") as Laya.Sprite;
        if(null == this._displaySp)
        {
            this._displaySp = this.owner as Laya.Sprite;
        }
    }
    
    onEnable(): void 
    {
        this._displaySp.on(Laya.Event.CLICK,this,this.onSpClick);
        var banner = AppSwitchConfig.getInstance().getAppSwitchData().banner;
        if(0 == banner)
        {
            this.refreshBannerDis();
        }
        else if (1 == banner)
        {
            this.refreshWXBanner();
        }
    }

    onDisable(): void 
    {
        this._displaySp.off(Laya.Event.CLICK,this,this.onSpClick);
        this.clearWXBaner();
    }

    protected refreshBannerDis()
    {
        var self = this;
        Share_myqq_Ad.get_myqq_ADVs(this.AdPosID,(datas)=>
        {
            if(datas && datas.length > 0)
            {
                var data = datas[Math.floor(Math.random() * datas.length)];

                self._displaySp.loadImage(data.logo,Laya.Handler.create(self,function()
                {
                    if(!self._displaySp.destroyed)
                    {
                        self._displaySp.width = 750;
                        self._displaySp.height = 350;
                    }
                }));
                self._data = data;
            }
        },false)
    }

    protected onSpClick()
    {
        var data = this._data;
        if(data)
        {
            console.log("跳转游戏： " + data.title);
            WXAPI.navigateToMiniProgram(data.appid,data.url,(res)=>
            {
                console.log("跳转成功")
                Share_myqq_Ad.reportUserClick(data.appid);
                ALD.aldSendReportAdClickSuccess(data);
            },(res)=>
            {
                console.log("跳转失败")
                Event_myqq_Mgr.instance.dispatch(EventDef.AD_OnShareAdFail);
                if(res.errMsg == "navigateToMiniProgram:fail cancel")
                {
                    console.log("用户取消跳转");
                    ALD.aldSendReportAdClickFail(data);
                }
            },(res)=>
            {
                console.log("跳转完成")
            });
        }
    }

    protected refreshWXBanner()
    {
        if(!Laya.Browser.onMiniGame || !(this.owner as Laya.Sprite).visible)
            return;
        this.clearWXBaner();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._displaySp.localToGlobal(new Laya.Point(0,0))

        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WXBannerWidth ? this.WXBannerWidth / Laya.stage.width * sw : sw;

        this._wxBanner = Laya.Browser.window["wx"].createBannerAd(
            {
                adUnitId : WXAPI.bannerAdUnitId,
                adIntervals : 30,
                style : 
                {
                    left:left,
                    top:top,
                    width: width,
                }
            })
            self._wxBanner.onLoad((res) =>  {
            console.log("WXBanner广告 加载完成");
            console.log(res);
        })
        this._wxBanner.onError((err) =>  {
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
}