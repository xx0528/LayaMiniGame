import AppConfig from "./AppConfig";
import HttpUnit from "./Net/HttpUnit";
import AppSwitchConfig from "./Config/AppSwitchConfig";
import ViewMgr, { ViewDef } from "./Mgr/ViewMgr";
import OPPONativeAdViewTemplate from "./View/TemplateViews/OPPONativeAd/OPPONativeAdViewTemplate";

export default class OPPOAPI 
{
    public static readonly adUnitId = "";
    public static readonly bannerAdUnitId = "";
    public static readonly InsAdUnitId = "";
    public static readonly OpenScreenAdUnitId = "";
    public static readonly NativeAdId = ""

    public static get BannerInstance()
    {
        return this._banner;
    }
    protected static _banner : any = null;

    public static Login(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].login(
                {
                    success: (res) => {
                        let token = res.data.token;
                        onSuccess(token);
                        console.log("OPPO 登陆成功,获取到 token : " + token);
                        for (var key in res)  {
                            console.log(key, res[key]);
                        }
                    },
                    fail: (res) => {
                        console.log("OPPO 登陆失败", res);
                        for(var key in res)
                        {
                            console.log(key, res[key]);
                        }
                    }
                })
        }
    }

    public static initAdService(onSuccess : Function,onFail : Function,onComplete : Function)
    {
        Laya.Browser.window["qg"].initAdService(
            {
                appId: AppConfig.AppID,
                isDebug: false,
                success: function (res) {
                    console.log("oppo initAdService success");
                    if (onSuccess) {
                        onSuccess(res)
                    }
                },
                fail: function (res) {
                    console.log("oppo initAdService fail: ", res.code, res.msg);
                    if (onFail) {
                        onFail(res)
                    }
                },
                complete: function (res) {
                    console.log("oppo initAdService complete");
                    if (onComplete) {
                        onComplete(res)
                    }
                }
            })
    }
   
    public static showRewardedVideoAd(onAdClose: Function, onFailed: Function) {
        if(Laya.Browser.onQGMiniGame)
        {
            var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: OPPOAPI.adUnitId,
            })
            videoAd.onLoad(()=>
            {
                console.log("oppo 视频广告加载完成");
                videoAd.show();
            })
            videoAd.onVideoStart(()=>
            {
                console.log("oppo 视频广告开始播放");
            })
            videoAd.onClose((res) =>{
                if(res.isEnded){
                    console.log("oppo 视频广告观看 完成");
                    onAdClose(true);
                }else{
                    console.log("oppo 视频广告观看 未完成");
                    onAdClose(false);
                }
                videoAd.destroy();
            })
            videoAd.onError((err)=>
            {
                console.log("oppo 视频广告获取失败",err);
                videoAd.destroy();
                onFailed();
            })
            videoAd.load();
        }
        else
        {
            onAdClose(true);
        }
    }

    public static navigateToMiniProgram(pkgName: string,gameName : string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onQGMiniGame) {
            console.log("OPPO 跳转游戏： " + pkgName);
            HttpUnit.reportExport(pkgName,gameName,(result)=>
            {
                if(1 == result.code)
                {
                    console.log("OPPO 导出上报成功");
                }
                else
                {
                    console.log("OPPO 导出上报失败",result.msg);
                }
            },(result)=>
            {
                console.log("OPPO 导出上报失败");
                for(var key in result)
                {
                    console.log(key, result[key]);
                }
            });
            let time = Date.now();
            while(Date.now() - time <= 500)
            {

            }
            Laya.Browser.window["qg"].navigateToMiniGame(
                {
                    pkgName: pkgName,
                    path: path,
                    extraData: {
                        from : AppConfig.AppID
                    },
                    envVersion: 'release',
                    success(res) {
                        if (onSuccess) {
                            onSuccess(res)
                        }
                    },
                    fail(res) {
                        if (onFail) {
                            onFail(res)
                        }
                    },
                    // complete(res) {
                    //     if (onComplate) {
                    //         onComplate(res)
                    //     }
                    // }
                })


        }
    }

    public static showInterstitialAd(onAdClose: Function, onFailed: Function)  {
        if (Laya.Browser.onQGMiniGame) 
        {
            var insertAd = qg.createInsertAd({ 
                posId: OPPOAPI.InsAdUnitId
            })
            insertAd.load();
            insertAd.onLoad(()=>
            {
                console.log("插屏广告加载完成");
                insertAd.show();
            })
            insertAd.onShow(()=>
            {
                console.log("插屏广告显示成功");
            })
            insertAd.onError((err)=> {
                console.log("插屏广告拉取失败",err);
                insertAd.destroy();
                if(onFailed)
                {
                    onFailed();
                }
            })
        }
        else
        {
            onAdClose();
        }
    }

    public static showBannaer() : any
    {
        if(OPPOAPI._banner)
        {
            OPPOAPI._banner.show();
            return;
        }
        var bannerAd = qg.createBannerAd({
            posId: OPPOAPI.bannerAdUnitId
        })
        bannerAd.show();
        OPPOAPI._banner = bannerAd;
    }

    public static hideBanner()
    {
        if(OPPOAPI._banner)
        {
            OPPOAPI._banner.hide();
        }
    }

    public static destroyBanner()
    {
        if(OPPOAPI._banner)
        {
            OPPOAPI._banner.destroy();
        }
        OPPOAPI._banner = null;
    }

    public static getLaunchOptionsSync() {
        let obj : any = { query: "", referrerInfo: { package: "", extraData: { appid : ""} } }
        if (Laya.Browser.onQGMiniGame) {
            var options = Laya.Browser.window["qg"].getLaunchOptionsSync();
            if(null != options && options != "")
            {
                obj = options;
            }
            else
            {
                console.log("没有启动设置！！！")
            }
            return obj;
        }
        return obj;
    }

    public static share(complate: Function, titel: string, imageUrl: string) {
        complate(false);
    }

    public static createDesktopIcon(onSuccess : Function,onFail : Function)
    {
        if (Laya.Browser.onQGMiniGame) 
        {
            Laya.Browser.window["qg"].hasShortcutInstalled({
                success: function (res) 
                {
                    if (res == false) 
                    {
                        Laya.Browser.window["qg"].installShortcut(
                        {
                            success: function () {
                                if (onSuccess)  {
                                    onSuccess();
                                }
                            },
                            fail: function (err) {
                                if (onFail)  {
                                    onFail();
                                }
                                console.log("创建桌面图标失败！！！！",err);
                                for(var key in err)
                                {
                                    console.log(key,err);
                                }
                            },
                            complete: function () {

                            }
                        })
                    }
                    else  
                    {
                        console.log("桌面图标已存在！！！！");
                        if (onFail)  {
                            onFail();
                        }
                    }
                },
                fail: function(err) 
                {
                    if (onFail)  {
                        onFail();
                    }
                    console.log("判断桌面图标是否存在失败！！！",err);
                    for(var key in err)
                    {
                        console.log(key,err);
                    }
                },
                complete: function() 
                {

                }
            })
        }
        else
        {
            if(onFail)
            {
                onFail();
            }
        }
    }

    //根据配置的概率自动弹出创建图标确认框
    public static autoPopCreateDestopIcon(onSuccess : Function,onFail : Function)
    {
        if(!Laya.Browser.onQGMiniGame)
        {
            if(null != onFail)
            {
                onFail();
            }
            return;
        }
        let rate = Math.floor(Math.random() * 100);
        if(rate <= AppSwitchConfig.getInstance().getAppSwitchData().oppocfg.addToDesktop)
        {
            OPPOAPI.createDesktopIcon(onSuccess,onFail);
        }
        else
        {
            if(null != onFail)
            {
                onFail();
            }
        }
    }

    //显示OPPO原生界面
    public static showNativeAd(onSuccess : Function,onFail : Function)
    {
        if(!Laya.Browser.onQGMiniGame)
        {
            if(null != onFail)
            {
                onFail();
            }
            return;
        }
        if(1 == AppSwitchConfig.getInstance().getAppSwitchData().oppocfg.yuanshengSwitch)
        {
            ViewMgr.instance.openView(ViewDef.OPPONativeView,null,(v : OPPONativeAdViewTemplate)=>
            {
                if(null != onSuccess)
                {
                    onSuccess(v);
                }
            });
        }
        else
        {
            if(null != onFail)
            {
                onFail();
            }
        }
    }
}