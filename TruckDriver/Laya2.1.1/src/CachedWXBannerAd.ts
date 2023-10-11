import AppSwitchConfig from "./Config/AppSwitchConfig";
import WX_SSPD_API_SSPD_ from "./WXAPI";

export default class CachedWXBanner_ppxhc_Ad
{
    protected static _bannerCache : any = {};
    protected static _curBanner : any = null;

    protected static readonly _preLoopObj = {}

    public static preloadBanner() 
    {
        var wxWuDianBanners = AppSwitchConfig.getInstance().getAppSwitchData().wxWuDianBanners;
        var bannerTodayBannerMax = AppSwitchConfig.getInstance().getAppSwitchData().bannerTodayBannerMax;
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
        Laya.timer.loop(2000,CachedWXBanner_ppxhc_Ad._preLoopObj,()=>
        {
            if(counter >= preLoadBanners.length)
            {
                Laya.timer.clearAll(CachedWXBanner_ppxhc_Ad._preLoopObj);
                return;
            }
            var bannerid = preLoadBanners[counter];
            var banner = CachedWXBanner_ppxhc_Ad._bannerCache[bannerid];
            if(null == banner)
            {
                banner = CachedWXBanner_ppxhc_Ad.create(bannerid);
                if(null != banner)
                {
                    CachedWXBanner_ppxhc_Ad._bannerCache[bannerid] = banner;
                    console.log("预创建微信Bannaer",bannerid,"完成");
                }
            }
            ++counter;
        });
    }

    protected static getBanner(bannerid : string) : any
    {
        if(null == bannerid || "" == bannerid)
            return null;
        var banner = CachedWXBanner_ppxhc_Ad._bannerCache[bannerid];
        if(null == banner)
        {
            banner = CachedWXBanner_ppxhc_Ad.create(bannerid);
            if(null != banner)
            {
                CachedWXBanner_ppxhc_Ad._bannerCache[bannerid] = banner;
            }
        }
        return banner
    }

    protected static create(bannerid : string)
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

    public static show()
    {
        if(null != CachedWXBanner_ppxhc_Ad._curBanner)
        {
            CachedWXBanner_ppxhc_Ad._curBanner.hide();
            CachedWXBanner_ppxhc_Ad._curBanner = null;
        }
        var wuDianBanners = AppSwitchConfig.getInstance().getAppSwitchData().wxWuDianBanners;
        var bannerid = wuDianBanners[Math.floor(Math.random() * wuDianBanners.length)];
        var banner = CachedWXBanner_ppxhc_Ad.getBanner(bannerid);
        if(banner)
        {
            CachedWXBanner_ppxhc_Ad._curBanner = banner;
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            CachedWXBanner_ppxhc_Ad._curBanner.style.top = (Laya.stage.height - 240) / Laya.stage.height * sh;
            CachedWXBanner_ppxhc_Ad._curBanner.show();
            console.log("CachedWXBanner 广告显示 bannerid ： ",bannerid);
        }
        var time = AppSwitchConfig.getInstance().getAppSwitchData().bannerFreshTimer;
        //Laya.timer.once(time * 1000,CachedWXBannerAd,CachedWXBannerAd.changeShow);
    }


    public static hide()
    {
        Laya.timer.clearAll(CachedWXBanner_ppxhc_Ad);
        if(null != CachedWXBanner_ppxhc_Ad._curBanner)
        {
            CachedWXBanner_ppxhc_Ad._curBanner.hide();
            CachedWXBanner_ppxhc_Ad._curBanner = null;
        }
        console.log("CachedWXBanner 广告隐藏");
    }

    public static changeShow()
    {
        if(null != CachedWXBanner_ppxhc_Ad._curBanner)
        {
            CachedWXBanner_ppxhc_Ad._curBanner.hide();
            CachedWXBanner_ppxhc_Ad._curBanner = null;
        }
        CachedWXBanner_ppxhc_Ad.show();
    }

    public static clear()
    {
        Laya.timer.clearAll(CachedWXBanner_ppxhc_Ad);
        for(var key in CachedWXBanner_ppxhc_Ad._bannerCache)
        {
            var banner = CachedWXBanner_ppxhc_Ad._bannerCache[key];
            if(null != banner)
            {
                banner.destroy();
            }
            CachedWXBanner_ppxhc_Ad._bannerCache[key] = null;
        }
    }
}