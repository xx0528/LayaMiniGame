
import ViewMgr, { View_ppxhc_Def } from "./Mgr/ViewMgr";
import AppSwitchConfig from "./Config/AppSwitchConfig";
import WudianMgr from "./Mgr/WudianMgr";
import AppConfig from "./AppConfig";

export default class QQMiniGame_ppxhc_API {
    public static readonly adUnitId = ""         //激励视频Id
    public static readonly bannerAdUnitId = ""   //banner广告Id
    public static readonly InsAdUnitId = ""      //插屏广告Id
    public static readonly AppBoxId = ""        //盒子广告Id

    public static Login(onSuccess: Function, onFail: Function) {
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
    protected static _isRegRewardedVideoAdEvent = false;
    protected static _onRewardedVideoAdFailed: Function = null;
    protected static _onRewardedVideoAdClose: Function = null;
    protected static onRewardedVideoAdLoad_ppxhc() {
        console.log('激励视频 广告加载完成')
    }
    protected static onRewardedVideoAdError_ppxhc(err) {
        console.log('激励视频 广告加载失败' + err)
        if (QQMiniGame_ppxhc_API._onRewardedVideoAdFailed) {
            QQMiniGame_ppxhc_API._onRewardedVideoAdFailed();
        }
    }
    protected static onRewardedVideoAdClose_ppxhc(res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看')
            if (QQMiniGame_ppxhc_API._onRewardedVideoAdClose) {
                QQMiniGame_ppxhc_API._onRewardedVideoAdClose(true)
            }
        }
        else {
            console.log('激励视频 未完整观看')
            if (QQMiniGame_ppxhc_API._onRewardedVideoAdClose) {
                QQMiniGame_ppxhc_API._onRewardedVideoAdClose(false)
            }
        }
    }
    protected static regRewardedVideoAdEvent_ppxhc(rewardedVideoAd) {

        rewardedVideoAd.onLoad(QQMiniGame_ppxhc_API.onRewardedVideoAdLoad_ppxhc)
        rewardedVideoAd.onError(QQMiniGame_ppxhc_API.onRewardedVideoAdError_ppxhc)
        rewardedVideoAd.onClose(QQMiniGame_ppxhc_API.onRewardedVideoAdClose_ppxhc)

        QQMiniGame_ppxhc_API._isRegRewardedVideoAdEvent = true;
    }
    public static showRewardedVideoAd_ppxhc(onAdClose: Function, onFailed: Function) {
        if (Laya.Browser.onQQMiniGame) {
            QQMiniGame_ppxhc_API._onRewardedVideoAdClose = onAdClose;
            QQMiniGame_ppxhc_API._onRewardedVideoAdFailed = onFailed;

            var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd(
                {
                    adUnitId: QQMiniGame_ppxhc_API.adUnitId,
                }
            );

            if (!QQMiniGame_ppxhc_API._isRegRewardedVideoAdEvent) {
                QQMiniGame_ppxhc_API.regRewardedVideoAdEvent_ppxhc(rewardedVideoAd);
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
    public static navigateToMiniProgram_ppxhc(appId: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
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
    protected static _onShow: Function = null;
    protected static _lastShareTime: number = 0;
    public static share(complate: Function, titel: string, imageUrl: string) {
        if (Laya.Browser.onQQMiniGame) {
            QQMiniGame_ppxhc_API._onShow = () => {
                Laya.Browser.window["qq"].offShow(QQMiniGame_ppxhc_API._onShow)
                QQMiniGame_ppxhc_API._onShow = null;
                var c = Date.now() - this._lastShareTime;
                if (complate) {
                    if (Date.now() - this._lastShareTime > 2000) {
                        complate(true)
                    }
                    else {
                        complate(false)
                    }
                }
            }
            Laya.Browser.window["qq"].onShow(QQMiniGame_ppxhc_API._onShow)
            QQMiniGame_ppxhc_API._lastShareTime = Date.now();
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
    public static showInterstitialAd_ppxhc(onAdClose: Function, onFailed: Function)  {
        if (Laya.Browser.onQQMiniGame) {
            var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                adUnitId: QQMiniGame_ppxhc_API.InsAdUnitId,
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
        public static mAppboxAd = null;
        protected static onBoxAdClose : Function = null;
        public static LoadAppBoxAd(onAdClose: Function, onFailed: Function) {
            if (Laya.Browser.onQQMiniGame) {
                QQMiniGame_ppxhc_API.mAppboxAd = Laya.Browser.window["qq"].createAppBox({
                    adUnitId: QQMiniGame_ppxhc_API.AppBoxId,
                })
                QQMiniGame_ppxhc_API.mAppboxAd.load().then(() => {
                    console.log('盒子广告 加载完成');
                })
    
                QQMiniGame_ppxhc_API.mAppboxAd.onError((err) => {
                    console.log('盒子广告 加载失败' + err);
                    if (onFailed) {
                        onFailed();
                    }
                })
                this.onBoxAdClose = () => {
                    console.log('盒子广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                }
                this.mAppboxAd.onClose(this.onBoxAdClose);
            }
            else {
                onAdClose();
            }
        }
    

        public static showAppBoxAd(onFailed: Function,onAdClose? : Function) {
            if(this.mAppboxAd){
                console.log("显示盒子广告");
                this.mAppboxAd.offClose(this.onBoxAdClose);
                this.onBoxAdClose = () => {
                    console.log('盒子广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                }
                this.mAppboxAd.onClose(this.onBoxAdClose);
                this.mAppboxAd.show().catch((err) => {
                    console.log('盒子广告 显示失败 ：' + err);
                    if (onFailed) {
                        onFailed();
                    }
                })
            }else{
                QQMiniGame_ppxhc_API.LoadAppBoxAd(onAdClose,onFailed);
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
    public static getLaunchOptionsSync() {
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
    public static SetShareMenu(titel: string, imageUrl: string, success?: Function, fail?: Function, complate?: Function) {
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
        let launchScene = QQMiniGame_ppxhc_API.getLaunchOptionsSync().scene;
        let noEnterBySearch: boolean = true;
        let wudianSceneList = AppSwitchConfig.getInstance().getAppSwitchData().wudianSceneList;
        for (let i = 0; i < wudianSceneList.length; ++i)  
        {
            let wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipBlocked = WudianMgr.GetIp_ppxhc_Blocked();
        let wudian = AppSwitchConfig.getInstance().getAppSwitchData().wudian;
        let kuangdianBanner = AppSwitchConfig.getInstance().getAppSwitchData().qqcfg.kuangdianBanner;
        if(AppConfig.ppxhc_Versions == AppSwitchConfig.getInstance().getAppSwitchData().qqcfg.qqversions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBanner)
        {
            ViewMgr.instance.openView(View_ppxhc_Def.QQCrazyClickView,data,()=>
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
        let launchScene = QQMiniGame_ppxhc_API.getLaunchOptionsSync().scene;
        let noEnterBySearch: boolean = true;
        let wudianSceneList = AppSwitchConfig.getInstance().getAppSwitchData().wudianSceneList;
        for (let i = 0; i < wudianSceneList.length; ++i)  
        {
            let wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipBlocked = WudianMgr.GetIp_ppxhc_Blocked();
        let wudian = AppSwitchConfig.getInstance().getAppSwitchData().wudian;
        let kuangdianBox = AppSwitchConfig.getInstance().getAppSwitchData().qqcfg.kuangdianBox;
        if(AppConfig.ppxhc_Versions == AppSwitchConfig.getInstance().getAppSwitchData().qqcfg.qqversions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBox)
        {
            ViewMgr.instance.openView(View_ppxhc_Def.QQCrazyClickView2,data,()=>
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