import AppSwitchConfig from "./Config/AppSwitchConfig";
import WX_SSPD_API_SSPD_ from "./WXAPI";
import QQMiniGameAPI from "./QQMiniGameAPI";

export default class CachedQQBannerAd {
    protected static _curBanner: any = null;
    protected static _onLoad : Function = null;
    protected static _onError : Function = null;
    protected static _isHide : boolean = true;

    public static preloadBanner() {

    }

    public static show(bannerid?: string) {
        let wxWuDianBanners = AppSwitchConfig.getInstance().getAppSwitchData().wxWuDianBanners;
        let bannerTodayBannerMax = AppSwitchConfig.getInstance().getAppSwitchData().bannerTodayBannerMax;
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
                CachedQQBannerAd._onLoad = (res) => {
                    console.log("CachedQQBanner 广告 加载完成", bannerid);
                    console.log(res);
                    if(!self._isHide)
                    {
                        banner.show();
                    }
                    else
                    {
                        banner.offLoad(CachedQQBannerAd._onLoad);
                        banner.offError(CachedQQBannerAd._onError);
                        banner.destroy();
                    }
                }
                banner.onLoad(CachedQQBannerAd._onLoad);
                CachedQQBannerAd._onError = (err) => {
                    console.log("CachedQQBanner 广告 加载失败", bannerid);
                    console.log(err);
                    banner.offLoad(CachedQQBannerAd._onLoad);
                    banner.offError(CachedQQBannerAd._onError);
                    banner.destroy();
                }
                banner.onError(CachedQQBannerAd._onError);
                CachedQQBannerAd._curBanner = banner
            }
        }
        CachedQQBannerAd._isHide = false;
    }


    public static hide() {
        CachedQQBannerAd._isHide = true;
        Laya.timer.clearAll(CachedQQBannerAd);
        if (null != CachedQQBannerAd._curBanner)  {
            CachedQQBannerAd._curBanner.hide();
            CachedQQBannerAd._curBanner.offLoad(CachedQQBannerAd._onLoad);
            CachedQQBannerAd._curBanner.offError(CachedQQBannerAd._onError);
            CachedQQBannerAd._curBanner.destroy();
            CachedQQBannerAd._curBanner = null;
            console.log("CachedQQBanner 广告隐藏");
        }
    }

    public static changeShow() {
        if (null != CachedQQBannerAd._curBanner) {
            CachedQQBannerAd._curBanner.hide();
            CachedQQBannerAd._curBanner = null;
        }
        CachedQQBannerAd.show();
    }

    public static clear() {

    }
}