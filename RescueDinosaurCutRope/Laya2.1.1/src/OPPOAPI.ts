import App_SSPD_Config_SSPD_ from "./AppConfig";

export default class OPP_JJKLBB_OAPI 
{
    public static readonly adU_JJKLBB_nitId = "134292";
    public static readonly banner_JJKLBB_AdUnitId = "134291";
    public static readonly InsAd_JJKLBB_UnitId = "134294";
    public static readonly OpenScree_JJKLBB_nAdUnitId = "134293";

    public static get BannerIn_JJKLBB_stance()
    {
        return OPP_JJKLBB_OAPI._ban_JJKLBB_ner;
    }
    protected static _ban_JJKLBB_ner : any = null;

    public static Lo_JJKLBB_gin(onSuccess: Function, onFail: Function) {
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

    public static initAdS_JJKLBB_ervice(onSuccess : Function,onFail : Function,onComplete : Function)
    {
        Laya.Browser.window["qg"].initAdService(
            {
                appId: App_SSPD_Config_SSPD_.Ap_JJKLBB_pID,
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
   
    public static showRe_JJKLBB_wardedV_JJKLBB_ideoAd(onAdClose: Function, onFailed: Function) {
        if(Laya.Browser.onQGMiniGame)
        {
            var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: OPP_JJKLBB_OAPI.adU_JJKLBB_nitId,
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

    public static navigat_JJKLBB_eToMiniPr_JJKLBB_ogram(pkgName: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onQGMiniGame) {
            console.log("OPPO 跳转游戏： " + pkgName);
            Laya.Browser.window["qg"].navigateToMiniGame(
                {
                    pkgName: pkgName,
                    path: path,
                    extraData: {
                        from : App_SSPD_Config_SSPD_.Ap_JJKLBB_pID
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
                    complete(res) {
                        if (onComplate) {
                            onComplate(res)
                        }
                    }
                })

        }
    }

    public static showIn_JJKLBB_terstiti_JJKLBB_alAd(onAdClose: Function, onFailed: Function)  {
        if (Laya.Browser.onQGMiniGame) 
        {
            var insertAd = qg.createInsertAd({ 
                posId: OPP_JJKLBB_OAPI.InsAd_JJKLBB_UnitId
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

    public static showBa_JJKLBB_nnaer() : any
    {
        if(OPP_JJKLBB_OAPI._ban_JJKLBB_ner)
        {
            OPP_JJKLBB_OAPI._ban_JJKLBB_ner.show();
            return;
        }
        var bannerAd = qg.createBannerAd({
            posId: OPP_JJKLBB_OAPI.banner_JJKLBB_AdUnitId
        })
        bannerAd.show();
        OPP_JJKLBB_OAPI._ban_JJKLBB_ner = bannerAd;
    }

    public static hide_JJKLBB_Banner()
    {
        if(OPP_JJKLBB_OAPI._ban_JJKLBB_ner)
        {
            OPP_JJKLBB_OAPI._ban_JJKLBB_ner.hide();
        }
    }

    public static getLaunchOp_JJKLBB_tionsSync() {
        return {};
    }

    public static share(complate: Function, titel: string, imageUrl: string) {
        complate(false);
    }

    public static createDes_JJKLBB_ktopIcon(onSuccess : Function,onFail : Function)
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