import ryw_AppConfig from "./AppConfig";
import ryw_HttpUnit from "./Net/HttpUnit";
import ryw_AppSwitchConfig from "./Config/AppSwitchConfig";
import ryw_ViewMgr, { ryw_ViewDef } from "./Mgr/ViewMgr";
import ryw_OPPONativeAdViewTemplate from "./View/TemplateViews/OPPONativeAd/OPPONativeAdViewTemplate";

export default class ryw_OPPOAPI 
{
    public static readonly ryw_adUnitId = "";
    public static readonly ryw_bannerAdUnitId = "";
    public static readonly ryw_InsAdUnitId = "";
    public static readonly ryw_OpenScreenAdUnitId = "";
    public static readonly ryw_NativeAdId = ""

    public static get ryw_BannerInstance()
    {
        return ryw_OPPOAPI.ryw__banner;
    }
    protected static ryw__banner : any = null;

    public static ryw_Login(onSuccess: Function, onFail: Function) {
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

    public static ryw_initAdService(onSuccess : Function,onFail : Function,onComplete : Function)
    {
        Laya.Browser.window["qg"].initAdService(
            {
                appId: ryw_AppConfig.ryw_AppID,
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
   
    public static ryw_showRewardedVideoAd(onAdClose: Function, onFailed: Function) {
        if(Laya.Browser.onQGMiniGame)
        {
            var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: ryw_OPPOAPI.ryw_adUnitId,
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

    public static ryw_navigateToMiniProgram(pkgName: string,gameName : string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onQGMiniGame) {
            console.log("OPPO 跳转游戏： " + pkgName);
            ryw_HttpUnit.ryw_reportExport(pkgName,gameName,(result)=>
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
                        from : ryw_AppConfig.ryw_AppID
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

    public static ryw_showInterstitialAd(onAdClose: Function, onFailed: Function)  {
        if (Laya.Browser.onQGMiniGame) 
        {
            var insertAd = qg.createInsertAd({ 
                posId: ryw_OPPOAPI.ryw_InsAdUnitId
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

    public static ryw_showBannaer() : any
    {
        if(ryw_OPPOAPI.ryw__banner)
        {
            ryw_OPPOAPI.ryw__banner.show();
            return;
        }
        var bannerAd = qg.createBannerAd({
            posId: ryw_OPPOAPI.ryw_bannerAdUnitId
        })
        bannerAd.show();
        ryw_OPPOAPI.ryw__banner = bannerAd;
    }

    public static ryw_hideBanner()
    {
        if(ryw_OPPOAPI.ryw__banner)
        {
            ryw_OPPOAPI.ryw__banner.hide();
        }
    }

    public static ryw_destroyBanner()
    {
        if(ryw_OPPOAPI.ryw__banner)
        {
            ryw_OPPOAPI.ryw__banner.destroy();
        }
        ryw_OPPOAPI.ryw__banner = null;
    }

    public static ryw_getLaunchOptionsSync() {
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

    public static ryw_share(complate: Function, titel: string, imageUrl: string) {
        complate(false);
    }

    public static ryw_createDesktopIcon(onSuccess : Function,onFail : Function)
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
    public static ryw_autoPopCreateDestopIcon(onSuccess : Function,onFail : Function)
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
        if(rate <= ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_oppocfg.ryw_addToDesktop)
        {
            ryw_OPPOAPI.ryw_createDesktopIcon(onSuccess,onFail);
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
    public static ryw_showNativeAd(onSuccess : Function,onFail : Function)
    {
        if(!Laya.Browser.onQGMiniGame)
        {
            if(null != onFail)
            {
                onFail();
            }
            return;
        }
        if(1 == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_oppocfg.ryw_yuanshengSwitch)
        {
            ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_OPPONativeView,null,(v : ryw_OPPONativeAdViewTemplate)=>
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