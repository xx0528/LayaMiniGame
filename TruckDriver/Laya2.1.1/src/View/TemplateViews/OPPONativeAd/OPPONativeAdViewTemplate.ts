import ViewBase from "../../ViewBase";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";
import OPPO_ppxhc_API from "../../../OPPOAPI";
import OPPOAPI from "../../../OPPOAPI";
import WudianMgr from "../../../Mgr/WudianMgr";

export default class OPPONativeAdView_ppxhc_Template extends ViewBase 
{

    protected _center_ppxhc_Zone : Laya.Sprite;
    protected _display : Laya.Sprite;
    protected _ok_ppxhc_Btn : Laya.Sprite;
    protected _close_ppxhc_Btn : Laya.Sprite;

    protected _native_ppxhc_Ad : any = null;
    protected _cur_ppxhc_AdItem : any = null;

    protected _ppxhc_bg:Laya.Sprite;

    onAwake()
    {
        this._center_ppxhc_Zone = this.owner.getChildByName("CenterZone") as Laya.Sprite;
        this._display = this._center_ppxhc_Zone.getChildByName("Display") as Laya.Sprite;
        this._ok_ppxhc_Btn = this._center_ppxhc_Zone.getChildByName("OkBtn") as Laya.Sprite;
        this._close_ppxhc_Btn = this._center_ppxhc_Zone.getChildByName("CloseBtn") as Laya.Sprite;
        this._ppxhc_bg = this.owner.getChildByName("BG") as Laya.Sprite;
    }

    onEnable()
    {
        super.onEnable();
        this.loadAd();
        this._ppxhc_bg.height = Laya.stage.height;
        this._close_ppxhc_Btn.visible = false;
        Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().oppocfg.btnShowTimer,this,()=>{
            this._close_ppxhc_Btn.visible = true;
        })
    }

    addEvent()
    {
        super.addEvent();
        this._ok_ppxhc_Btn.on(Laya.Event.CLICK,this,this.onOkBtn);
        this._close_ppxhc_Btn.on(Laya.Event.CLICK,this,this.onCloseBtn);
        this._display.on(Laya.Event.CLICK,this,this.onDisplayClick);
        
    }

    removeEvent()
    {
        super.removeEvent();
        this._ok_ppxhc_Btn.off(Laya.Event.CLICK,this,this.onOkBtn);
        this._close_ppxhc_Btn.off(Laya.Event.CLICK,this,this.onCloseBtn);
        this._display.off(Laya.Event.CLICK,this,this.onDisplayClick);
    }

    protected loadAd()
    {
        var self = this;
        let ipBlocked = WudianMgr.GetIp_ppxhc_Blocked();
        if(!ipBlocked)
        {
            self.closeView();
            return;
        }
        if(Laya.Browser.onQGMiniGame)
        {
            if(this._native_ppxhc_Ad)
            {
                this._native_ppxhc_Ad.destroy();
                this._native_ppxhc_Ad = null;
            }
            this._cur_ppxhc_AdItem = null;
            
            this._native_ppxhc_Ad = qg.createNativeAd({ 
                posId: OPPO_ppxhc_API.NativeAdId 
            })
            this._native_ppxhc_Ad.load();
            this._native_ppxhc_Ad.onLoad((res)=>
            {
                console.log("原生广告加载成功：",res);
                var adlist = res.adList;
                for (var i = 0; i < adlist.length; ++i)  
                {
                    var ad = adlist[i];
                    console.log("原生广告数据：",i);
                    for(var key in ad)
                    {
                        console.log(key,ad[key]);
                    }
                }
                self._cur_ppxhc_AdItem = adlist[Math.floor(Math.random() * adlist.length)];
                if(null != self._cur_ppxhc_AdItem)
                {
                    for (var i = 0; i < self._cur_ppxhc_AdItem.imgUrlList.length; ++i)
                    {
                        console.log("imgUrlList : ",i + " ",self._cur_ppxhc_AdItem.imgUrlList[i])
                    }
                    var imgulr = self._cur_ppxhc_AdItem.imgUrlList[Math.floor(Math.random() * self._cur_ppxhc_AdItem.imgUrlList.length)];
                    self._display.loadImage(imgulr);
                    self._native_ppxhc_Ad.reportAdShow({
                        adId: self._cur_ppxhc_AdItem.adId
                    })
                    console.log("加载图片",imgulr);
                    console.log("点击上报！！！")
                }
                self._center_ppxhc_Zone.visible = true;
            })
            this._native_ppxhc_Ad.onError((res)=>
            {
                console.log("原生广告加载失败：",res);
                for(var key in res)
                {
                    console.log(key,res[key]);
                }
                self.closeView();
            })

            this._center_ppxhc_Zone.visible = false;
        }
    }

    protected onCloseBtn()
    {
        this.closeView();
    }

    protected onOkBtn()
    {
        if (Math.random() * 100 <= AppSwitchConfig.getInstance().getAppSwitchData().oppocfg.yuansheng) {
            console.log("进入变态广告");
            this.onDisplayClick();
        }   
        this.closeView();
    }

    protected onDisplayClick()
    {
        if(null != this._native_ppxhc_Ad && null != this._cur_ppxhc_AdItem)
        {
            console.log("点击上报！！！")
            this._native_ppxhc_Ad.reportAdClick({
                adId: this._cur_ppxhc_AdItem.adId
            })
        }
    }

    onDestroy()
    {
        super.onDestroy();
        if(Laya.Browser.onQGMiniGame)
        {
            if(this._native_ppxhc_Ad)
            {
                this._native_ppxhc_Ad.destroy();
            }
            this._native_ppxhc_Ad = null;
            this._cur_ppxhc_AdItem = null;
        }
    }
}