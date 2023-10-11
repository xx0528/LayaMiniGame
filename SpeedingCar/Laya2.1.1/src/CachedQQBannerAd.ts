import App_wcjtn_Switch_wcjtn_Config from "./Config/AppSwitchConfig";
import WX_SSPD_API_SSPD_ from "./WXAPI";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "./QQMiniGameAPI";

export default class Cached_wcjtn_QQ_wcjtn_BannerAd {
    protected static _cur_wcjtn_Banner: any = null;
    protected static _on_wcjtn_Load : Function = null;
    protected static _on_wcjtn_Error : Function = null;
    protected static _is_wcjtn_Hide : boolean = true;

    public static pre_wcjtn_load_wcjtn_Banner() {

    }

    public static _wcjtn_show_wcjtn_(bannerid?: string) {
        let wxWuDianBanners = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wx_wcjtn_Wu_wcjtn_Dian_wcjtn_Banners;
        let bannerTodayBannerMax = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Today_wcjtn_Banner_wcjtn_Max;
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
                Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Load = (res) => {
                    console.log("CachedQQBanner 广告 加载完成", bannerid);
                    console.log(res);
                    if(!self._is_wcjtn_Hide)
                    {
                        banner.show();
                    }
                    else
                    {
                        banner.offLoad(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Load);
                        banner.offError(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Error);
                        banner.destroy();
                    }
                }
                banner.onLoad(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Load);
                Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Error = (err) => {
                    console.log("CachedQQBanner 广告 加载失败", bannerid);
                    console.log(err);
                    banner.offLoad(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Load);
                    banner.offError(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Error);
                    banner.destroy();
                }
                banner.onError(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Error);
                Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner = banner
            }
        }
        Cached_wcjtn_QQ_wcjtn_BannerAd._is_wcjtn_Hide = false;
    }


    public static hide() {
        Cached_wcjtn_QQ_wcjtn_BannerAd._is_wcjtn_Hide = true;
        Laya.timer.clearAll(Cached_wcjtn_QQ_wcjtn_BannerAd);
        if (null != Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner)  {
            Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner.hide();
            Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner.offLoad(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Load);
            Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner.offError(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Error);
            Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner.destroy();
            Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner = null;
            console.log("CachedQQBanner 广告隐藏");
        }
    }

    public static change_wcjtn_Show() {
        if (null != Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner) {
            Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner.hide();
            Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner = null;
        }
        Cached_wcjtn_QQ_wcjtn_BannerAd._wcjtn_show_wcjtn_();
    }

    public static _wcjtn_clear_wcjtn_() {

    }
}