import ViewBase from "../../ViewBase";
import AppSwitchConfig from "../../../Config/AppSwitchConfig";
import OPPOAPI from "../../../OPPOAPI";
import WudianMgr from "../../../Mgr/WudianMgr";

export default class OPPONativeAdViewTemplate extends ViewBase 
{

    protected _centerZone : Laya.Sprite;
    protected _display : Laya.Sprite;
    protected _okBtn : Laya.Sprite;
    protected _closeBtn : Laya.Sprite;

    protected _nativeAd : any = null;
    protected _curAdItem : any = null;

    protected _bg:Laya.Sprite;

    onAwake()
    {
        this._centerZone = this.owner.getChildByName("CenterZone") as Laya.Sprite;
        this._display = this._centerZone.getChildByName("Display") as Laya.Sprite;
        this._okBtn = this._centerZone.getChildByName("OkBtn") as Laya.Sprite;
        this._closeBtn = this._centerZone.getChildByName("CloseBtn") as Laya.Sprite;
        this._bg = this.owner.getChildByName("BG") as Laya.Sprite;
    }

    onEnable()
    {
        super.onEnable();
        this.loadAd();
        this._bg.height = Laya.stage.height;
        this._closeBtn.visible = false;
        Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().oppocfg.btnShowTimer,this,()=>{
            this._closeBtn.visible = true;
        })
    }

    addEvent()
    {
        super.addEvent();
        this._okBtn.on(Laya.Event.CLICK,this,this.onOkBtn);
        this._closeBtn.on(Laya.Event.CLICK,this,this.onCloseBtn);
        this._display.on(Laya.Event.CLICK,this,this.onDisplayClick);
        
    }

    removeEvent()
    {
        super.removeEvent();
        this._okBtn.off(Laya.Event.CLICK,this,this.onOkBtn);
        this._closeBtn.off(Laya.Event.CLICK,this,this.onCloseBtn);
        this._display.off(Laya.Event.CLICK,this,this.onDisplayClick);
    }

    protected loadAd()
    {
        var self = this;
        let ipBlocked = WudianMgr.GetIpBlocked();
        if(!ipBlocked)
        {
            self.closeView();
            return;
        }
        if(Laya.Browser.onQGMiniGame)
        {
            if(this._nativeAd)
            {
                this._nativeAd.destroy();
                this._nativeAd = null;
            }
            this._curAdItem = null;
            
            this._nativeAd = qg.createNativeAd({ 
                posId: OPPOAPI.NativeAdId 
            })
            this._nativeAd.load();
            this._nativeAd.onLoad((res)=>
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
                self._curAdItem = adlist[Math.floor(Math.random() * adlist.length)];
                if(null != self._curAdItem)
                {
                    for (var i = 0; i < self._curAdItem.imgUrlList.length; ++i)
                    {
                        console.log("imgUrlList : ",i + " ",self._curAdItem.imgUrlList[i])
                    }
                    var imgulr = self._curAdItem.imgUrlList[Math.floor(Math.random() * self._curAdItem.imgUrlList.length)];
                    self._display.loadImage(imgulr);
                    self._nativeAd.reportAdShow({
                        adId: self._curAdItem.adId
                    })
                    console.log("加载图片",imgulr);
                    console.log("点击上报！！！")
                }
                self._centerZone.visible = true;
            })
            this._nativeAd.onError((res)=>
            {
                console.log("原生广告加载失败：",res);
                for(var key in res)
                {
                    console.log(key,res[key]);
                }
                self.closeView();
            })

            this._centerZone.visible = false;
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
        if(null != this._nativeAd && null != this._curAdItem)
        {
            console.log("点击上报！！！")
            this._nativeAd.reportAdClick({
                adId: this._curAdItem.adId
            })
        }
    }

    onDestroy()
    {
        super.onDestroy();
        if(Laya.Browser.onQGMiniGame)
        {
            if(this._nativeAd)
            {
                this._nativeAd.destroy();
            }
            this._nativeAd = null;
            this._curAdItem = null;
        }
    }
}