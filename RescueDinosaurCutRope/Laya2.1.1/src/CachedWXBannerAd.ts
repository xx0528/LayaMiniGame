import AppSwitch_JJKLBB_Config from "./Config/AppSwitchConfig";
import WX_SSPD_API_SSPD_ from "./WXAPI";
import WXAPI from "./WXAPI";
import A_JJKLBB_LD, { ALDEv_JJKLBB_entDef } from "./ALD";

export default class CachedW_JJKLBB_XBannerAd
{
    protected static _banner_JJKLBB_Cache : any = {};
    protected static _curBa_JJKLBB_nner : any = null;

    protected static readonly _preLo_JJKLBB_opObj = {}

    public static preload_JJKLBB_Banner() 
    {
        var wxWuDianBanners = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wxWuDianB_JJKLBB_anners;
        var bannerTodayBannerMax = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().bannerTod_JJKLBB_ayBannerMax;
        // var wxWuDianBanners = [WXAPI.bannerAdUnitId];
        var bannerTodayBannerMax = 5;
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
        Laya.timer.loop(2000,CachedW_JJKLBB_XBannerAd._preLo_JJKLBB_opObj,()=>
        {
            if(counter >= preLoadBanners.length)
            {
                Laya.timer.clearAll(CachedW_JJKLBB_XBannerAd._preLo_JJKLBB_opObj);
                return;
            }
            var bannerid = preLoadBanners[counter];
            var banner = CachedW_JJKLBB_XBannerAd._banner_JJKLBB_Cache[bannerid];
            if(null == banner)
            {
                banner = CachedW_JJKLBB_XBannerAd.cre_JJKLBB_ate(bannerid);
                if(null != banner)
                {
                    CachedW_JJKLBB_XBannerAd._banner_JJKLBB_Cache[bannerid] = banner;
                    console.log("预创建微信Bannaer",bannerid,"完成");
                }
            }
            ++counter;
        });
    }

    protected static getB_JJKLBB_anner(bannerid : string) : any
    {
        if(null == bannerid || "" == bannerid)
            return null;
        var banner = CachedW_JJKLBB_XBannerAd._banner_JJKLBB_Cache[bannerid];
        if(null == banner)
        {
            banner = CachedW_JJKLBB_XBannerAd.cre_JJKLBB_ate(bannerid);
            if(null != banner)
            {
                CachedW_JJKLBB_XBannerAd._banner_JJKLBB_Cache[bannerid] = banner;
            }
        }
        return banner
    }

    protected static cre_JJKLBB_ate(bannerid : string)
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
                        top : (Laya.stage.height - 290) / Laya.stage.height * sh,
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
                    A_JJKLBB_LD.aldSendOnlySingleReport(ALDEv_JJKLBB_entDef.WXBannerLoadFail,{
                        "banner加载失败原因":err 
                    });
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
        if(null != CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner)
        {
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner.hide();
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner = null;
        }
        var wuDianBanners = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wxWuDianB_JJKLBB_anners;
        var bannerid = wuDianBanners[Math.floor(Math.random() * wuDianBanners.length)];
        var banner = CachedW_JJKLBB_XBannerAd.getB_JJKLBB_anner(bannerid);
        if(banner)
        {
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner = banner;
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner.show();
            console.log("CachedWXBanner 广告显示 bannerid ： ",bannerid);
        }
        var time = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().bannerFres_JJKLBB_hTimer;
        //Laya.timer.once(time * 1000,CachedWXBannerAd,CachedWXBannerAd.changeShow);
    }


    public static hide()
    {
        Laya.timer.clearAll(CachedW_JJKLBB_XBannerAd);
        if(null != CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner)
        {
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner.hide();
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner = null;
        }
        console.log("CachedWXBanner 广告隐藏");
    }

    public static changeShow()
    {
        if(null != CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner)
        {
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner.hide();
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner = null;
        }
        CachedW_JJKLBB_XBannerAd.show();
    }

    public static clear()
    {
        Laya.timer.clearAll(CachedW_JJKLBB_XBannerAd);
        for(var key in CachedW_JJKLBB_XBannerAd._banner_JJKLBB_Cache)
        {
            var banner = CachedW_JJKLBB_XBannerAd._banner_JJKLBB_Cache[key];
            if(null != banner)
            {
                banner.destroy();
            }
            CachedW_JJKLBB_XBannerAd._banner_JJKLBB_Cache[key] = null;
        }
    }
}