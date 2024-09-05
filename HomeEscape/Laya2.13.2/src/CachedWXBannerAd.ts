import ryw_AppSwitchConfig from "./Config/AppSwitchConfig";
import WX_SSPD_API_SSPD_ from "./WXAPI";

export default class ryw_CachedWXBannerAd
{
    protected static ryw__bannerCache : any = {};
    protected static ryw__curBanner : any = null;

    protected static readonly ryw__preLoopObj = {}

    public static ryw_preloadBanner() 
    {
        var wxWuDianBanners = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wxWuDianBanners;
        var bannerTodayBannerMax = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerTodayBannerMax;
        var preLoadBanners : Array<string> = new Array<string>();
        for (var i = 0; i < wxWuDianBanners.length; ++i)
        {
            preLoadBanners.push(wxWuDianBanners[i]);
        }
        if(preLoadBanners.length > bannerTodayBannerMax)
        {
            var delNum = preLoadBanners.length - bannerTodayBannerMax;
            for (var i = 0; i < delNum; ++i)  
            {
                preLoadBanners.splice(Math.floor(Math.random() * preLoadBanners.length),1);
            }
        }
        console.log("开始预创建微信Bannaer",preLoadBanners);
        console.log("Bannaer 最大数限制 ：",bannerTodayBannerMax);
        var counter = 0;
        Laya.timer.loop(2000,ryw_CachedWXBannerAd.ryw__preLoopObj,()=>
        {
            if(counter >= preLoadBanners.length)
            {
                Laya.timer.clearAll(ryw_CachedWXBannerAd.ryw__preLoopObj);
                return;
            }
            var bannerid = preLoadBanners[counter];
            var banner = ryw_CachedWXBannerAd.ryw__bannerCache[bannerid];
            if(null == banner)
            {
                banner = ryw_CachedWXBannerAd.ryw_create(bannerid);
                if(null != banner)
                {
                    ryw_CachedWXBannerAd.ryw__bannerCache[bannerid] = banner;
                    console.log("预创建微信Bannaer",bannerid,"完成");
                }
            }
            ++counter;
        });
    }

    protected static ryw_getBanner(bannerid : string) : any
    {
        if(null == bannerid || "" == bannerid)
            return null;
        var banner = ryw_CachedWXBannerAd.ryw__bannerCache[bannerid];
        if(null == banner)
        {
            banner = ryw_CachedWXBannerAd.ryw_create(bannerid);
            if(null != banner)
            {
                ryw_CachedWXBannerAd.ryw__bannerCache[bannerid] = banner;
            }
        }
        return banner
    }

    protected static ryw_create(bannerid : string)
    {
        if(Laya.Browser.onMiniGame)
        {
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            var banner = Laya.Browser.window["wx"].createBannerAd(
                {
                    adUnitId : bannerid,
                    adIntervals : 30,
                    style : 
                    {
                        left : 0,
                        top : (Laya.stage.height - 240) / Laya.stage.height * sh,
                        width : sw,
                    }
                })
            if(banner)
            {
                banner.onLoad((res) =>  {
                    console.log("CachedWXBanner 广告 加载完成",bannerid);
                    console.log(res);
                })
                banner.onError((err) =>  {
                    console.log("CachedWXBanner 广告 加载失败",bannerid);
                    console.log(err);
                })
                banner.onResize(res => {
                    console.log(banner.style.realWidth, banner.style.realHeight)
                  })
            }
            return banner;
        }
        else
        {
            return null;
        }
    }

    public static ryw_show()
    {
        if(null != ryw_CachedWXBannerAd.ryw__curBanner)
        {
            ryw_CachedWXBannerAd.ryw__curBanner.hide();
            ryw_CachedWXBannerAd.ryw__curBanner = null;
        }
        var wuDianBanners = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wxWuDianBanners;
        var bannerid = wuDianBanners[Math.floor(Math.random() * wuDianBanners.length)];
        var banner = ryw_CachedWXBannerAd.ryw_getBanner(bannerid);
        if(banner)
        {
            ryw_CachedWXBannerAd.ryw__curBanner = banner;
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            ryw_CachedWXBannerAd.ryw__curBanner.style.top = (Laya.stage.height - 240) / Laya.stage.height * sh;
            ryw_CachedWXBannerAd.ryw__curBanner.show();
            console.log("CachedWXBanner 广告显示 bannerid ： ",bannerid);
        }
        var time = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerFreshTimer;
        //Laya.timer.once(time * 1000,CachedWXBannerAd,CachedWXBannerAd.changeShow);
    }


    public static ryw_hide()
    {
        Laya.timer.clearAll(ryw_CachedWXBannerAd);
        if(null != ryw_CachedWXBannerAd.ryw__curBanner)
        {
            ryw_CachedWXBannerAd.ryw__curBanner.hide();
            ryw_CachedWXBannerAd.ryw__curBanner = null;
        }
        console.log("CachedWXBanner 广告隐藏");
    }

    public static ryw_changeShow()
    {
        if(null != ryw_CachedWXBannerAd.ryw__curBanner)
        {
            ryw_CachedWXBannerAd.ryw__curBanner.hide();
            ryw_CachedWXBannerAd.ryw__curBanner = null;
        }
        ryw_CachedWXBannerAd.ryw_show();
    }

    public static ryw_clear()
    {
        Laya.timer.clearAll(ryw_CachedWXBannerAd);
        for(var key in ryw_CachedWXBannerAd.ryw__bannerCache)
        {
            var banner = ryw_CachedWXBannerAd.ryw__bannerCache[key];
            if(null != banner)
            {
                banner.destroy();
            }
            ryw_CachedWXBannerAd.ryw__bannerCache[key] = null;
        }
    }
}