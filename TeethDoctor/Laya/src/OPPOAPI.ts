import App_SSPD_Config_SSPD_ from "./AppConfig";
import Http_XYXZS_Unit from "./Net/HttpUnit";

export default class OPP_XYXZS_OAPI 
{
    public static readonly ad_XYXZS_UnitId = "134292";
    public static readonly ban_XYXZS_nerAdUnitId = "134291";
    public static readonly Ins_XYXZS_AdUnitId = "134294";
    public static readonly OpenS_XYXZS_creenAdUnitId = "134293";

    public static get BannerI_XYXZS_nstance()
    {
        return OPP_XYXZS_OAPI._ban_XYXZS_ner;
    }
    protected static _ban_XYXZS_ner : any = null;

    public static Lo_XYXZS_gin(onSuccess: Function, onFail: Function) {
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

    public static initA_XYXZS_dService(onSuccess : Function,onFail : Function,onComplete : Function)
    {
        Laya.Browser.window["qg"].initAdService(
            {
                appId: App_SSPD_Config_SSPD_.Ap_XYXZS_pID,
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
   
    public static showRewa_XYXZS_rdedVideoAd(onAdClose: Function, onFailed: Function) {
        if(Laya.Browser.onQGMiniGame)
        {
            var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: OPP_XYXZS_OAPI.ad_XYXZS_UnitId,
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

    public static navigat_XYXZS_eToMiniProgram(pkgName: string,gameName : string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onQGMiniGame) {
            console.log("OPPO 跳转游戏： " + pkgName);
            Http_XYXZS_Unit.repo_XYXZS_rtExport(pkgName,gameName,(result)=>
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
                        from : App_SSPD_Config_SSPD_.Ap_XYXZS_pID
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

    public static showInte_XYXZS_rstitialAd(onAdClose: Function, onFailed: Function)  {
        if (Laya.Browser.onQGMiniGame) 
        {
            var insertAd = qg.createInsertAd({ 
                posId: OPP_XYXZS_OAPI.Ins_XYXZS_AdUnitId
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

    public static showB_XYXZS_annaer() : any
    {
        if(OPP_XYXZS_OAPI._ban_XYXZS_ner)
        {
            OPP_XYXZS_OAPI._ban_XYXZS_ner.show();
            return;
        }
        var bannerAd = qg.createBannerAd({
            posId: OPP_XYXZS_OAPI.ban_XYXZS_nerAdUnitId
        })
        bannerAd.show();
        OPP_XYXZS_OAPI._ban_XYXZS_ner = bannerAd;
    }

    public static hide_XYXZS_Banner()
    {
        if(OPP_XYXZS_OAPI._ban_XYXZS_ner)
        {
            OPP_XYXZS_OAPI._ban_XYXZS_ner.hide();
        }
    }

    public static getLaunch_XYXZS_OptionsSync() {
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

    public static s_XYXZS_hare(complate: Function, titel: string, imageUrl: string) {
        complate(false);
    }

    public static createDes_XYXZS_ktopIcon(onSuccess : Function,onFail : Function)
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
}