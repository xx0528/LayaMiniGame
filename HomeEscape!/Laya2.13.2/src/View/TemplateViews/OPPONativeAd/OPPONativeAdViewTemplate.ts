import ryw_ViewBase from "../../ViewBase";
import ryw_AppSwitchConfig from "../../../Config/AppSwitchConfig";
import ryw_OPPOAPI from "../../../OPPOAPI";
import ryw_WudianMgr from "../../../Mgr/WudianMgr";

export default class ryw_OPPONativeAdViewTemplate extends ryw_ViewBase 
{

    protected ryw__centerZone : Laya.Sprite;
    protected ryw__display : Laya.Sprite;
    protected ryw__okBtn : Laya.Sprite;
    protected ryw__closeBtn : Laya.Sprite;

    protected ryw__nativeAd : any = null;
    protected ryw__curAdItem : any = null;

    protected ryw__bg:Laya.Sprite;

    onAwake()
    {
        this.ryw__centerZone = this.owner.getChildByName("CenterZone") as Laya.Sprite;
        this.ryw__display = this.ryw__centerZone.getChildByName("Display") as Laya.Sprite;
        this.ryw__okBtn = this.ryw__centerZone.getChildByName("OkBtn") as Laya.Sprite;
        this.ryw__closeBtn = this.ryw__centerZone.getChildByName("CloseBtn") as Laya.Sprite;
        this.ryw__bg = this.owner.getChildByName("BG") as Laya.Sprite;
    }

    onEnable()
    {
        super.onEnable();
        this.ryw_loadAd();
        this.ryw__bg.height = Laya.stage.height;
        this.ryw__closeBtn.visible = false;
        Laya.timer.once(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_oppocfg.ryw_btnShowTimer,this,()=>{
            this.ryw__closeBtn.visible = true;
        })
    }

    ryw_addEvent()
    {
        super.ryw_addEvent();
        this.ryw__okBtn.on(Laya.Event.CLICK,this,this.ryw_onOkBtn);
        this.ryw__closeBtn.on(Laya.Event.CLICK,this,this.ryw_onCloseBtn);
        this.ryw__display.on(Laya.Event.CLICK,this,this.ryw_onDisplayClick);
        
    }

    ryw_removeEvent()
    {
        super.ryw_removeEvent();
        this.ryw__okBtn.off(Laya.Event.CLICK,this,this.ryw_onOkBtn);
        this.ryw__closeBtn.off(Laya.Event.CLICK,this,this.ryw_onCloseBtn);
        this.ryw__display.off(Laya.Event.CLICK,this,this.ryw_onDisplayClick);
    }

    protected ryw_loadAd()
    {
        var self = this;
        let ipBlocked = ryw_WudianMgr.ryw_GetIpBlocked();
        if(!ipBlocked)
        {
            self.ryw_closeView();
            return;
        }
        if(Laya.Browser.onQGMiniGame)
        {
            if(this.ryw__nativeAd)
            {
                this.ryw__nativeAd.destroy();
                this.ryw__nativeAd = null;
            }
            this.ryw__curAdItem = null;
            
            this.ryw__nativeAd = qg.createNativeAd({ 
                posId: ryw_OPPOAPI.ryw_NativeAdId 
            })
            this.ryw__nativeAd.load();
            this.ryw__nativeAd.onLoad((res)=>
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
                self.ryw__curAdItem = adlist[Math.floor(Math.random() * adlist.length)];
                if(null != self.ryw__curAdItem)
                {
                    for (var i = 0; i < self.ryw__curAdItem.imgUrlList.length; ++i)
                    {
                        console.log("imgUrlList : ",i + " ",self.ryw__curAdItem.imgUrlList[i])
                    }
                    var imgulr = self.ryw__curAdItem.imgUrlList[Math.floor(Math.random() * self.ryw__curAdItem.imgUrlList.length)];
                    self.ryw__display.loadImage(imgulr);
                    self.ryw__nativeAd.reportAdShow({
                        adId: self.ryw__curAdItem.adId
                    })
                    console.log("加载图片",imgulr);
                    console.log("点击上报！！！")
                }
                self.ryw__centerZone.visible = true;
            })
            this.ryw__nativeAd.onError((res)=>
            {
                console.log("原生广告加载失败：",res);
                for(var key in res)
                {
                    console.log(key,res[key]);
                }
                self.ryw_closeView();
            })

            this.ryw__centerZone.visible = false;
        }
    }

    protected ryw_onCloseBtn()
    {
        this.ryw_closeView();
    }

    protected ryw_onOkBtn()
    {
        if (Math.random() * 100 <= ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_oppocfg.ryw_yuansheng) {
            console.log("进入变态广告");
            this.ryw_onDisplayClick();
        }   
        this.ryw_closeView();
    }

    protected ryw_onDisplayClick()
    {
        if(null != this.ryw__nativeAd && null != this.ryw__curAdItem)
        {
            console.log("点击上报！！！")
            this.ryw__nativeAd.reportAdClick({
                adId: this.ryw__curAdItem.adId
            })
        }
    }

    onDestroy()
    {
        super.onDestroy();
        if(Laya.Browser.onQGMiniGame)
        {
            if(this.ryw__nativeAd)
            {
                this.ryw__nativeAd.destroy();
            }
            this.ryw__nativeAd = null;
            this.ryw__curAdItem = null;
        }
    }
}