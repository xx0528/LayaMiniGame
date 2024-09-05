import ryw_AppSwitchConfig from "./Config/AppSwitchConfig";
import WX_SSPD_API_SSPD_ from "./WXAPI";
import ryw_QQMiniGameAPI from "./QQMiniGameAPI";

export default class ryw_CachedQQBannerAd {
    protected static ryw__curBanner: any = null;
    protected static ryw__onLoad : Function = null;
    protected static ryw__onError : Function = null;
    protected static ryw__isHide : boolean = true;

    public static preloadBanner() {

    }

    public static show(bannerid?: string) {
        let wxWuDianBanners = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wxWuDianBanners;
        let bannerTodayBannerMax = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerTodayBannerMax;
        bannerid = wxWuDianBanners[Math.floor(Math.random() * wxWuDianBanners.length)];
        if (Laya.Browser.onQQMiniGame && null != bannerid) {
            let sysInfo = Laya.Browser.window["qq"].getSystemInfoSync();
            let sw = sysInfo.screenWidth;
            let sh = sysInfo.screenHeight;
            let banner = Laya.Browser.window["qq"].createBannerAd(
                {
                    adUnitId: bannerid,
                    adIntervals: 30,
                    style:
                        {
                            left: 0,
                            top: (Laya.stage.height - 240) / Laya.stage.height * sh,
                            width: sw,
                        }
                })
            if (banner) {
                let self = this;
                ryw_CachedQQBannerAd.ryw__onLoad = (res) => {
                    console.log("CachedQQBanner 广告 加载完成", bannerid);
                    console.log(res);
                    if(!self.ryw__isHide)
                    {
                        banner.show();
                    }
                    else
                    {
                        banner.offLoad(ryw_CachedQQBannerAd.ryw__onLoad);
                        banner.offError(ryw_CachedQQBannerAd.ryw__onError);
                        banner.destroy();
                    }
                }
                banner.onLoad(ryw_CachedQQBannerAd.ryw__onLoad);
                ryw_CachedQQBannerAd.ryw__onError = (err) => {
                    console.log("CachedQQBanner 广告 加载失败", bannerid);
                    console.log(err);
                    banner.offLoad(ryw_CachedQQBannerAd.ryw__onLoad);
                    banner.offError(ryw_CachedQQBannerAd.ryw__onError);
                    banner.destroy();
                }
                banner.onError(ryw_CachedQQBannerAd.ryw__onError);
                ryw_CachedQQBannerAd.ryw__curBanner = banner
            }
        }
        ryw_CachedQQBannerAd.ryw__isHide = false;
    }


    public static hide() {
        ryw_CachedQQBannerAd.ryw__isHide = true;
        Laya.timer.clearAll(ryw_CachedQQBannerAd);
        if (null != ryw_CachedQQBannerAd.ryw__curBanner)  {
            ryw_CachedQQBannerAd.ryw__curBanner.hide();
            ryw_CachedQQBannerAd.ryw__curBanner.offLoad(ryw_CachedQQBannerAd.ryw__onLoad);
            ryw_CachedQQBannerAd.ryw__curBanner.offError(ryw_CachedQQBannerAd.ryw__onError);
            ryw_CachedQQBannerAd.ryw__curBanner.destroy();
            ryw_CachedQQBannerAd.ryw__curBanner = null;
            console.log("CachedQQBanner 广告隐藏");
        }
    }

    public static changeShow() {
        if (null != ryw_CachedQQBannerAd.ryw__curBanner) {
            ryw_CachedQQBannerAd.ryw__curBanner.hide();
            ryw_CachedQQBannerAd.ryw__curBanner = null;
        }
        ryw_CachedQQBannerAd.show();
    }

    public static clear() {

    }
}