import App_wcjtn_Switch_wcjtn_Config from "./Config/AppSwitchConfig";
import WX_SSPD_API_SSPD_ from "./WXAPI";

export default class Cached_wcjtn_WX_wcjtn_BannerAd
{
    protected static _banner_wcjtn_Cache : any = {};
    protected static _cur_wcjtn_Banner : any = null;

    protected static readonly _pre_wcjtn_Loop_wcjtn_Obj = {}

    public static pre_wcjtn_load_wcjtn_Banner() 
    {
        var wxWuDianBanners = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wx_wcjtn_Wu_wcjtn_Dian_wcjtn_Banners;
        var bannerTodayBannerMax = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Today_wcjtn_Banner_wcjtn_Max;
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
        Laya.timer.loop(2000,Cached_wcjtn_WX_wcjtn_BannerAd._pre_wcjtn_Loop_wcjtn_Obj,()=>
        {
            if(counter >= preLoadBanners.length)
            {
                Laya.timer.clearAll(Cached_wcjtn_WX_wcjtn_BannerAd._pre_wcjtn_Loop_wcjtn_Obj);
                return;
            }
            var bannerid = preLoadBanners[counter];
            var banner = Cached_wcjtn_WX_wcjtn_BannerAd._banner_wcjtn_Cache[bannerid];
            if(null == banner)
            {
                banner = Cached_wcjtn_WX_wcjtn_BannerAd._wcjtn_create_wcjtn_(bannerid);
                if(null != banner)
                {
                    Cached_wcjtn_WX_wcjtn_BannerAd._banner_wcjtn_Cache[bannerid] = banner;
                    console.log("预创建微信Bannaer",bannerid,"完成");
                }
            }
            ++counter;
        });
    }

    protected static get_wcjtn_Banner(bannerid : string) : any
    {
        if(null == bannerid || "" == bannerid)
            return null;
        var banner = Cached_wcjtn_WX_wcjtn_BannerAd._banner_wcjtn_Cache[bannerid];
        if(null == banner)
        {
            banner = Cached_wcjtn_WX_wcjtn_BannerAd._wcjtn_create_wcjtn_(bannerid);
            if(null != banner)
            {
                Cached_wcjtn_WX_wcjtn_BannerAd._banner_wcjtn_Cache[bannerid] = banner;
            }
        }
        return banner
    }

    protected static _wcjtn_create_wcjtn_(bannerid : string)
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

    public static _wcjtn_show_wcjtn_()
    {
        if(null != Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner)
        {
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner.hide();
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner = null;
        }
        var wuDianBanners = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wx_wcjtn_Wu_wcjtn_Dian_wcjtn_Banners;
        var bannerid = wuDianBanners[Math.floor(Math.random() * wuDianBanners.length)];
        var banner = Cached_wcjtn_WX_wcjtn_BannerAd.get_wcjtn_Banner(bannerid);
        if(banner)
        {
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner = banner;
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner.style.top = (Laya.stage.height - 240) / Laya.stage.height * sh;
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner.show();
            console.log("CachedWXBanner 广告显示 bannerid ： ",bannerid);
        }
        var time = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Fresh_wcjtn_Timer;
        //Laya.timer.once(time * 1000,CachedWXBannerAd,CachedWXBannerAd.changeShow);
    }


    public static _wcjtn_hide_wcjtn_()
    {
        Laya.timer.clearAll(Cached_wcjtn_WX_wcjtn_BannerAd);
        if(null != Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner)
        {
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner.hide();
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner = null;
        }
        console.log("CachedWXBanner 广告隐藏");
    }

    public static change_wcjtn_Show()
    {
        if(null != Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner)
        {
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner.hide();
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner = null;
        }
        Cached_wcjtn_WX_wcjtn_BannerAd._wcjtn_show_wcjtn_();
    }

    public static _wcjtn_clear_wcjtn_()
    {
        Laya.timer.clearAll(Cached_wcjtn_WX_wcjtn_BannerAd);
        for(var key in Cached_wcjtn_WX_wcjtn_BannerAd._banner_wcjtn_Cache)
        {
            var banner = Cached_wcjtn_WX_wcjtn_BannerAd._banner_wcjtn_Cache[key];
            if(null != banner)
            {
                banner.destroy();
            }
            Cached_wcjtn_WX_wcjtn_BannerAd._banner_wcjtn_Cache[key] = null;
        }
    }
}