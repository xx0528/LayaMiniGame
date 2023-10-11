import ryw_ViewMgr, { ryw_ViewDef } from "./Mgr/ViewMgr";
import ryw_AppSwitchConfig from "./Config/AppSwitchConfig";
import ryw_WudianMgr from "./Mgr/WudianMgr";
import ryw_AppConfig from "./AppConfig";

export default class ryw_QQMiniGameAPI {
    public static readonly ryw_adUnitId = ""         //激励视频Id
    public static readonly ryw_bannerAdUnitId = ""   //banner广告Id
    public static readonly ryw_InsAdUnitId = ""      //插屏广告Id
    public static readonly ryw_AppBoxId = ""        //盒子广告Id

    public static ryw_Login(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onQQMiniGame) {    
            Laya.Browser.window["qq"].login(
                {
                    success: (res) => {
                        if (res.code) {
                            let code = res.code;
                            onSuccess(code);
                            console.log("登陆成功,获取到code : " + code)
                        }
                    }
                })
        }
    }


    //-------------------------激励视频---------------------------------
    protected static ryw__isRegRewardedVideoAdEvent = false;
    protected static ryw__onRewardedVideoAdFailed: Function = null;
    protected static ryw__onRewardedVideoAdClose: Function = null;
    protected static ryw_onRewardedVideoAdLoad() {
        console.log('激励视频 广告加载完成')
    }
    protected static ryw_onRewardedVideoAdError(err) {
        console.log('激励视频 广告加载失败' + err)
        if (ryw_QQMiniGameAPI.ryw__onRewardedVideoAdFailed) {
            ryw_QQMiniGameAPI.ryw__onRewardedVideoAdFailed();
        }
    }
    protected static ryw_onRewardedVideoAdClose(res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看')
            if (ryw_QQMiniGameAPI.ryw__onRewardedVideoAdClose) {
                ryw_QQMiniGameAPI.ryw__onRewardedVideoAdClose(true)
            }
        }
        else {
            console.log('激励视频 未完整观看')
            if (ryw_QQMiniGameAPI.ryw__onRewardedVideoAdClose) {
                ryw_QQMiniGameAPI.ryw__onRewardedVideoAdClose(false)
            }
        }
    }
    protected static ryw_regRewardedVideoAdEvent(rewardedVideoAd) {

        rewardedVideoAd.onLoad(ryw_QQMiniGameAPI.ryw_onRewardedVideoAdLoad)
        rewardedVideoAd.onError(ryw_QQMiniGameAPI.ryw_onRewardedVideoAdError)
        rewardedVideoAd.onClose(ryw_QQMiniGameAPI.ryw_onRewardedVideoAdClose)

        ryw_QQMiniGameAPI.ryw__isRegRewardedVideoAdEvent = true;
    }
    public static ryw_showRewardedVideoAd(onAdClose: Function, onFailed: Function) {
        if (Laya.Browser.onQQMiniGame) {
            ryw_QQMiniGameAPI.ryw__onRewardedVideoAdClose = onAdClose;
            ryw_QQMiniGameAPI.ryw__onRewardedVideoAdFailed = onFailed;

            var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd(
                {
                    adUnitId: ryw_QQMiniGameAPI.ryw_adUnitId,
                }
            );

            if (!ryw_QQMiniGameAPI.ryw__isRegRewardedVideoAdEvent) {
                ryw_QQMiniGameAPI.ryw_regRewardedVideoAdEvent(rewardedVideoAd);
            }

            rewardedVideoAd.load().then(() => {
                var promise = rewardedVideoAd.show();
                promise.then(() => console.log('激励视频 广告显示成功'));
                promise.catch((err) => {
                    rewardedVideoAd.load()
                        .then(() => rewardedVideoAd.show())
                        .catch(err => {
                            console.log('激励视频 广告显示失败')
                            if (onFailed) {
                                onFailed();
                            }
                        })
                });
            }).catch(err => {
                console.log('激励视频 广告加载失败')
                if (onFailed) {
                    onFailed();
                }
            })
        }
        else {
            onAdClose(true);
        }
    }
    //----------------------------------------------------------------


    //-------------------------小游戏跳转---------------------------
    public static ryw_navigateToMiniProgram(appId: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onQQMiniGame) {
            console.log("跳转游戏： " + appId);
            Laya.Browser.window["qq"].navigateToMiniProgram(
                {
                    appId: appId,
                    path: path,
                    extraData: {
                        foo: 'bar'
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
    //----------------------------------------------------------------------

    //---------------------分享----------------------------------------
    protected static ryw__onShow: Function = null;
    protected static ryw__lastShareTime: number = 0;
    public static ryw_share(complate: Function, titel: string, imageUrl: string) {
        if (Laya.Browser.onQQMiniGame) {
            ryw_QQMiniGameAPI.ryw__onShow = () => {
                Laya.Browser.window["qq"].offShow(ryw_QQMiniGameAPI.ryw__onShow)
                ryw_QQMiniGameAPI.ryw__onShow = null;
                var c = Date.now() - this.ryw__lastShareTime;
                if (complate) {
                    if (Date.now() - this.ryw__lastShareTime > 2000) {
                        complate(true)
                    }
                    else {
                        complate(false)
                    }
                }
            }
            Laya.Browser.window["qq"].onShow(ryw_QQMiniGameAPI.ryw__onShow)
            ryw_QQMiniGameAPI.ryw__lastShareTime = Date.now();
            Laya.Browser.window["qq"].shareAppMessage(
                {
                    title: titel,
                    imageUrl: imageUrl
                }
            );
        }
    }
    //----------------------------------------------------------------------


    //--------------------插屏幕广告---------------------------------------
    public static ryw_showInterstitialAd(onAdClose: Function, onFailed: Function)  {
        if (Laya.Browser.onQQMiniGame) {
            var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                adUnitId: ryw_QQMiniGameAPI.ryw_InsAdUnitId,
            })

            let _onLoad = () => {
                console.log('插屏广告 加载完成');
                interstitialAd.show().catch((err) => {
                    console.log('插屏广告 显示失败 ：' + err)
                    interstitialAd.offLoad(_onLoad);
                    interstitialAd.offError(_onError);
                    interstitialAd.offClose(_onClose);
                    interstitialAd.destroy();
                    if (onFailed) {
                        onFailed();
                    }
                })
            }
            interstitialAd.onLoad(_onLoad)

            let _onError = (err) => {
                console.log('插屏广告 加载失败' + err);
                interstitialAd.offLoad(_onLoad);
                interstitialAd.offError(_onError);
                interstitialAd.offClose(_onClose);
                interstitialAd.destroy();
                if (onFailed) {
                    onFailed();
                }
            }
            interstitialAd.onError(_onError)

            let _onClose = () => {
                console.log('插屏广告 关闭');
                interstitialAd.offLoad(_onLoad);
                interstitialAd.offError(_onError);
                interstitialAd.offClose(_onClose);
                interstitialAd.destroy();
                if (onAdClose) {
                    onAdClose();
                }
            }
            interstitialAd.onClose(_onClose)
        }
        else {
            onAdClose();
        }
    }

        //--------------------盒子广告---------------------------------------
        public static ryw_mAppboxAd = null;
        protected static ryw_onBoxAdClose : Function = null;
        
        public static ryw_LoadAppBoxAd(onAdClose: Function, onFailed: Function) {
            if (Laya.Browser.onQQMiniGame) {
                ryw_QQMiniGameAPI.ryw_mAppboxAd = Laya.Browser.window["qq"].createAppBox({
                    adUnitId: ryw_QQMiniGameAPI.ryw_AppBoxId,
                })
                ryw_QQMiniGameAPI.ryw_mAppboxAd.load().then(() => {
                    console.log('盒子广告 加载完成');
                })
    
                ryw_QQMiniGameAPI.ryw_mAppboxAd.onError((err) => {
                    console.log('盒子广告 加载失败' + err);
                    if (onFailed) {
                        onFailed();
                    }
                })
                ryw_QQMiniGameAPI.ryw_onBoxAdClose = () => {
                    console.log('盒子广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                }
                ryw_QQMiniGameAPI.ryw_mAppboxAd.onClose(ryw_QQMiniGameAPI.ryw_onBoxAdClose);
            }
            else {
                onAdClose();
            }
        }
    
        public static ryw_showAppBoxAd(onFailed: Function,onAdClose? : Function) {
            if(ryw_QQMiniGameAPI.ryw_mAppboxAd){
                console.log("显示盒子广告");
                ryw_QQMiniGameAPI.ryw_mAppboxAd.offClose(ryw_QQMiniGameAPI.ryw_onBoxAdClose);
                ryw_QQMiniGameAPI.ryw_onBoxAdClose = () => {
                    console.log('盒子广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                }
                ryw_QQMiniGameAPI.ryw_mAppboxAd.onClose(ryw_QQMiniGameAPI.ryw_onBoxAdClose);
                ryw_QQMiniGameAPI.ryw_mAppboxAd.show().catch((err) => {
                    console.log('盒子广告 显示失败 ：' + err);
                    if (onFailed) {
                        onFailed();
                    }
                })
            }else{
                ryw_QQMiniGameAPI.ryw_LoadAppBoxAd(onAdClose,onFailed);
            } 
        }
        
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/qq.getLaunchOptionsSync.html
     * @static
     * @returns {LaunchOptions} 
     * @memberof QQMiniGameAPI
     */
    public static ryw_getLaunchOptionsSync() {
        // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
        if (Laya.Browser.onQQMiniGame) {
            let obj = Laya.Browser.window["qq"].getLaunchOptionsSync()
            console.log("场景值 " + obj.scene);
            let str = JSON.stringify(obj.query);
            console.log("Query参数 " + str);
            let key = obj.query["key"];
            console.log("Query参数：key " + key);
            console.log("ShareTicket " + obj.shareTicket);
            console.log("ReferrerInfo.appId " + obj.referrerInfo.appId);
            console.log("ReferrerInfo.extraData " + obj.referrerInfo.extraData);
            return obj;
        }
        let obj = { scene: 1001, query: "", shareTicket: "", appId: "", extraData: "" }
        return obj;
    }

    //----------------------------------------------------------------------
    /**
     * 打开微信左上角分享转发点击事件,在游戏逻辑中调用一次即可
     * 注意此方法只会在真机上执行，在微信模拟器环境下点击转发按钮什么都不会发生
     * 
     * @static
     * @param {string} titel 分享标题
     * @param {string} imageUrl 分享图片地址
     * @param {Function} [success] 成功回调函数(可不填)
     * @param {Function} [fail] 失败回调函数(可不填)
     * @param {Function} [complate] 完成回调函数，成功失败都会执行(可不填)
     * @memberof QQMiniGameAPI
     */
    public static ryw_SetShareMenu(titel: string, imageUrl: string, success?: Function, fail?: Function, complate?: Function) {
        if (Laya.Browser.onQQMiniGame) {
            console.log("小游戏设置转发按钮");
            Laya.Browser.window["qq"].showShareMenu({
                withShareTicket: false,
                success: success,
                fail: fail,
                complete: complate
            });
            Laya.Browser.window["qq"].onShareAppMessage(function () {
                return {
                    title: titel,
                    imageUrl: imageUrl
                }
            });
        }
    }


    //显示QQ狂点界面1，此接口添加了对场景值，IP地区的判断
    //data 传入界面的参数 格式 ：{ Complete : Function , PrizeCount : String | Number}
    //onSuccess 界面成功打开回调
    //onFail 界面打开失败回调
    public static showQQCreazyClick(data : any,onSuccess : Function,onFail : Function)
    {
        let launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
        let noEnterBySearch: boolean = true;
        let wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
        for (let i = 0; i < wudianSceneList.length; ++i)  
        {
            let wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipBlocked = ryw_WudianMgr.ryw_GetIpBlocked();
        let wudian = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudian;
        let kuangdianBanner = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_kuangdianBanner;
        if(ryw_AppConfig.ryw_Versions == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_qqversions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBanner)
        {
            ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_QQCrazyClickView,data,()=>
            {
                if(null != onSuccess)
                {
                    onSuccess();
                }
            })
        }
        else
        {
            if(null != onFail)
            {
                onFail();
            }
        }
    }

    //显示QQ狂点界面2，此接口添加了对场景值，IP地区的判断
    //data 传入界面的参数 格式 ：{ Complete : Function , PrizeCount : String | Number}
    //onSuccess 界面成功打开回调
    //onFail 界面打开失败回调
    public static showQQCreazyClick2(data : any,onSuccess : Function,onFail : Function)
    {
        let launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
        let noEnterBySearch: boolean = true;
        let wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
        for (let i = 0; i < wudianSceneList.length; ++i)  
        {
            let wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipBlocked = ryw_WudianMgr.ryw_GetIpBlocked();
        let wudian = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudian;
        let kuangdianBox = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_kuangdianBox;
        if(ryw_AppConfig.ryw_Versions == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_qqversions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBox)
        {
            ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_QQCrazyClickView2,data,()=>
            {
                if(null != onSuccess)
                {
                    onSuccess();
                }
            })
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