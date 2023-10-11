import AppSwi_XYXZS_tchConfig from "./Config/AppSwitchConfig";
import WX_SSPD_API_SSPD_ from "./WXAPI";

export default class Cached_XYXZS_WXBannerAd
{
    protected static _bann_XYXZS_erCache : any = {};
    protected static _curB_XYXZS_anner : any = null;

    protected static readonly _preL_XYXZS_oopObj = {}

    public static preloa_XYXZS_dBanner() 
    {
        var wxWuDianBanners = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wxWuD_XYXZS_ianBanners;
        var bannerTodayBannerMax = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().bannerTod_XYXZS_ayBannerMax;
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
        Laya.timer.loop(2000,Cached_XYXZS_WXBannerAd._preL_XYXZS_oopObj,()=>
        {
            if(counter >= preLoadBanners.length)
            {
                Laya.timer.clearAll(Cached_XYXZS_WXBannerAd._preL_XYXZS_oopObj);
                return;
            }
            var bannerid = preLoadBanners[counter];
            var banner = Cached_XYXZS_WXBannerAd._bann_XYXZS_erCache[bannerid];
            if(null == banner)
            {
                banner = Cached_XYXZS_WXBannerAd.cr_XYXZS_eate(bannerid);
                if(null != banner)
                {
                    Cached_XYXZS_WXBannerAd._bann_XYXZS_erCache[bannerid] = banner;
                    console.log("预创建微信Bannaer",bannerid,"完成");
                }
            }
            ++counter;
        });
    }

    protected static get_XYXZS_Banner(bannerid : string) : any
    {
        if(null == bannerid || "" == bannerid)
            return null;
        var banner = Cached_XYXZS_WXBannerAd._bann_XYXZS_erCache[bannerid];
        if(null == banner)
        {
            banner = Cached_XYXZS_WXBannerAd.cr_XYXZS_eate(bannerid);
            if(null != banner)
            {
                Cached_XYXZS_WXBannerAd._bann_XYXZS_erCache[bannerid] = banner;
            }
        }
        return banner
    }

    protected static cr_XYXZS_eate(bannerid : string)
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
                        top : (Laya.stage.height - 300) / Laya.stage.height * sh,
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
        if(null != Cached_XYXZS_WXBannerAd._curB_XYXZS_anner)
        {
            Cached_XYXZS_WXBannerAd._curB_XYXZS_anner.hide();
            Cached_XYXZS_WXBannerAd._curB_XYXZS_anner = null;
        }
        var wuDianBanners = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wxWuD_XYXZS_ianBanners;
        var bannerid = wuDianBanners[Math.floor(Math.random() * wuDianBanners.length)];
        var banner = Cached_XYXZS_WXBannerAd.get_XYXZS_Banner(bannerid);
        if(banner)
        {
            Cached_XYXZS_WXBannerAd._curB_XYXZS_anner = banner;
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            Cached_XYXZS_WXBannerAd._curB_XYXZS_anner.style.top = (Laya.stage.height - 300) / Laya.stage.height * sh;
            Cached_XYXZS_WXBannerAd._curB_XYXZS_anner.show();
            console.log("CachedWXBanner 广告显示 bannerid ： ",bannerid);
        }
        var time = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().banner_XYXZS_FreshTimer;
        //Laya.timer.once(time * 1000,CachedWXBannerAd,CachedWXBannerAd.changeShow);
    }


    public static hide()
    {
        Laya.timer.clearAll(Cached_XYXZS_WXBannerAd);
        if(null != Cached_XYXZS_WXBannerAd._curB_XYXZS_anner)
        {
            Cached_XYXZS_WXBannerAd._curB_XYXZS_anner.hide();
            Cached_XYXZS_WXBannerAd._curB_XYXZS_anner = null;
        }
        console.log("CachedWXBanner 广告隐藏");
    }

    public static chan_XYXZS_geShow()
    {
        if(null != Cached_XYXZS_WXBannerAd._curB_XYXZS_anner)
        {
            Cached_XYXZS_WXBannerAd._curB_XYXZS_anner.hide();
            Cached_XYXZS_WXBannerAd._curB_XYXZS_anner = null;
        }
        Cached_XYXZS_WXBannerAd.show();
    }

    public static clear()
    {
        Laya.timer.clearAll(Cached_XYXZS_WXBannerAd);
        for(var key in Cached_XYXZS_WXBannerAd._bann_XYXZS_erCache)
        {
            var banner = Cached_XYXZS_WXBannerAd._bann_XYXZS_erCache[key];
            if(null != banner)
            {
                banner.destroy();
            }
            Cached_XYXZS_WXBannerAd._bann_XYXZS_erCache[key] = null;
        }
    }
}