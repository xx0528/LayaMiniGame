import App_wcjtn_Config from "./AppConfig";
import Http_wcjtn_Unit from "./Net/HttpUnit";
import App_wcjtn_Switch_wcjtn_Config from "./Config/AppSwitchConfig";
import View_wcjtn_Mgr, { View_wcjtn_Def } from "./Mgr/ViewMgr";
import OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate from "./View/TemplateViews/OPPONativeAd/OPPONativeAdViewTemplate";

export default class OPPO_wcjtn_API 
{
    public static readonly ad_wcjtn_UnitId = "";
    public static readonly banner_wcjtn_AdUnitId = "";
    public static readonly Ins_wcjtn_AdUnitId = "";
    public static readonly Open_wcjtn_Screen_wcjtn_AdUnitId = "";
    public static readonly Native_wcjtn_AdId = ""

    public static get Banner_wcjtn_Instance()
    {
        return OPPO_wcjtn_API._banner_wcjtn_;
    }
    protected static _banner_wcjtn_ : any = null;

    public static _wcjtn_Login_wcjtn_(onSuccess: Function, onFail: Function) {
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

    public static init_wcjtn_AdService(onSuccess : Function,onFail : Function,onComplete : Function)
    {
        Laya.Browser.window["qg"].initAdService(
            {
                appId: App_wcjtn_Config.App_wcjtn_ID,
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
   
    public static show_wcjtn_Reward_wcjtn_edVideoAd(onAdClose: Function, onFailed: Function) {
        if(Laya.Browser.onQGMiniGame)
        {
            var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: OPPO_wcjtn_API.ad_wcjtn_UnitId,
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

    public static navigate_wcjtn_To_wcjtn_MiniProgram(pkgName: string,gameName : string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onQGMiniGame) {
            console.log("OPPO 跳转游戏： " + pkgName);
            Http_wcjtn_Unit.report_wcjtn_Export(pkgName,gameName,(result)=>
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
                        from : App_wcjtn_Config.App_wcjtn_ID
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

    public static show_wcjtn_Interstitial_wcjtn_Ad(onAdClose: Function, onFailed: Function)  {
        if (Laya.Browser.onQGMiniGame) 
        {
            var insertAd = qg.createInsertAd({ 
                posId: OPPO_wcjtn_API.Ins_wcjtn_AdUnitId
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

    public static show_wcjtn_Bannaer() : any
    {
        if(OPPO_wcjtn_API._banner_wcjtn_)
        {
            OPPO_wcjtn_API._banner_wcjtn_.show();
            return;
        }
        var bannerAd = qg.createBannerAd({
            posId: OPPO_wcjtn_API.banner_wcjtn_AdUnitId
        })
        bannerAd.show();
        OPPO_wcjtn_API._banner_wcjtn_ = bannerAd;
    }

    public static hide_wcjtn_Banner()
    {
        if(OPPO_wcjtn_API._banner_wcjtn_)
        {
            OPPO_wcjtn_API._banner_wcjtn_.hide();
        }
    }

    public static destroyBanner()
    {
        if(OPPO_wcjtn_API._banner_wcjtn_)
        {
            OPPO_wcjtn_API._banner_wcjtn_.destroy();
        }
        OPPO_wcjtn_API._banner_wcjtn_ = null;
    }

    public static get_wcjtn_LaunchOpt_wcjtn_ionsSync() {
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

    public static _wcjtn_share_wcjtn_(complate: Function, titel: string, imageUrl: string) {
        complate(false);
    }

    public static create_wcjtn_DesktopIcon(onSuccess : Function,onFail : Function)
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
    public static auto_wcjtn_Pop_wcjtn_Create_wcjtn_DestopIcon(onSuccess : Function,onFail : Function)
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
        if(rate <= App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().oppo_wcjtn_cfg.add_wcjtn_To_wcjtn_Desktop)
        {
            OPPO_wcjtn_API.create_wcjtn_DesktopIcon(onSuccess,onFail);
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
    public static show_wcjtn_NativeAd(onSuccess : Function,onFail : Function)
    {
        if(!Laya.Browser.onQGMiniGame)
        {
            if(null != onFail)
            {
                onFail();
            }
            return;
        }
        if(1 == App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().oppo_wcjtn_cfg.yuan_wcjtn_sheng_wcjtn_Switch)
        {
            View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.OPPONativeView,null,(v : OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate)=>
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