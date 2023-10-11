import ViewMgr, { ViewDef } from "./Mgr/ViewMgr";
import AppSwitchConfig from "./Config/AppSwitchConfig";
import WudianMgr from "./Mgr/WudianMgr";
import AppConfig from "./AppConfig";

export default class QQMiniGameAPI {
    public static readonly adUnitId = ""         //激励视频Id
    public static readonly bannerAdUnitId = ""   //banner广告Id
    public static readonly InsAdUnitId = ""      //插屏广告Id
    public static readonly AppBoxId = ""        //盒子广告Id

    public static readonly blockAdArray = [

    ];
    public static readonly AppBlockStyle = { left: 120, top: 200 } //样式，积木广告左上角横纵坐标， mmp 最小值32
    public static readonly AppBlockSize = 5 //范围是1~5，积木广告的个数（展示以实际拉取广告数量为准）
    public static readonly AppBlockOrientation = "landscape"  //landscape 或者 vertical，积木广告横向展示或者竖向展示

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
    protected static onRewardedVideoAdLoad() {
        console.log('激励视频 广告加载完成')
    }
    protected static onRewardedVideoAdError(err) {
        console.log('激励视频 广告加载失败' + err)
        if (QQMiniGameAPI._onRewardedVideoAdFailed) {
            QQMiniGameAPI._onRewardedVideoAdFailed();
        }
    }
    protected static onRewardedVideoAdClose(res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看')
            if (QQMiniGameAPI._onRewardedVideoAdClose) {
                QQMiniGameAPI._onRewardedVideoAdClose(true)
            }
        }
        else {
            console.log('激励视频 未完整观看')
            if (QQMiniGameAPI._onRewardedVideoAdClose) {
                QQMiniGameAPI._onRewardedVideoAdClose(false)
            }
        }
    }
    protected static regRewardedVideoAdEvent(rewardedVideoAd) {

        rewardedVideoAd.onLoad(QQMiniGameAPI.onRewardedVideoAdLoad)
        rewardedVideoAd.onError(QQMiniGameAPI.onRewardedVideoAdError)
        rewardedVideoAd.onClose(QQMiniGameAPI.onRewardedVideoAdClose)

        QQMiniGameAPI._isRegRewardedVideoAdEvent = true;
    }
    public static showRewardedVideoAd(onAdClose: Function, onFailed: Function) {
        if (Laya.Browser.onQQMiniGame) {
            QQMiniGameAPI._onRewardedVideoAdClose = onAdClose;
            QQMiniGameAPI._onRewardedVideoAdFailed = onFailed;

            var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd(
                {
                    adUnitId: QQMiniGameAPI.adUnitId,
                }
            );

            if (!QQMiniGameAPI._isRegRewardedVideoAdEvent) {
                QQMiniGameAPI.regRewardedVideoAdEvent(rewardedVideoAd);
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
    public static navigateToMiniProgram(appId: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
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
            QQMiniGameAPI._onShow = () => {
                Laya.Browser.window["qq"].offShow(QQMiniGameAPI._onShow)
                QQMiniGameAPI._onShow = null;
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
            Laya.Browser.window["qq"].onShow(QQMiniGameAPI._onShow)
            this._lastShareTime = Date.now();
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
    public static showInterstitialAd(onAdClose: Function, onFailed: Function)  {
        if (Laya.Browser.onQQMiniGame) {
            var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                adUnitId: QQMiniGameAPI.InsAdUnitId,
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
                this.mAppboxAd = Laya.Browser.window["qq"].createAppBox({
                    adUnitId: QQMiniGameAPI.AppBoxId,
                })
                this.mAppboxAd.load().then(() => {
                    console.log('盒子广告 加载完成');
                })
    
                this.mAppboxAd.onError((err) => {
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
                QQMiniGameAPI.LoadAppBoxAd(onAdClose,onFailed);
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
        let launchScene = QQMiniGameAPI.getLaunchOptionsSync().scene;
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
        let ipBlocked = WudianMgr.GetIpBlocked();
        let wudian = AppSwitchConfig.getInstance().getAppSwitchData().wudian;
        let kuangdianBanner = AppSwitchConfig.getInstance().getAppSwitchData().qqcfg.kuangdianBanner;
        if(AppConfig.Versions == AppSwitchConfig.getInstance().getAppSwitchData().qqcfg.qqversions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBanner)
        {
            ViewMgr.instance.openView(ViewDef.QQCrazyClickView,data,()=>
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
        let launchScene = QQMiniGameAPI.getLaunchOptionsSync().scene;
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
        let ipBlocked = WudianMgr.GetIpBlocked();
        let wudian = AppSwitchConfig.getInstance().getAppSwitchData().wudian;
        let kuangdianBox = AppSwitchConfig.getInstance().getAppSwitchData().qqcfg.kuangdianBox;
        if(AppConfig.Versions == AppSwitchConfig.getInstance().getAppSwitchData().qqcfg.qqversions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBox)
        {
            ViewMgr.instance.openView(ViewDef.QQCrazyClickView2,data,()=>
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

    
    //----------------------   积木广告   ------------------------------------- /
    /**
     *  1000	后端错误调用失败	 该项错误不是开发者的异常情况	一般情况下忽略一段时间即可恢复。
     *  1001	参数错误	        使用方法错误	可以前往 q.qq.com 确认具体教程（小程序和小游戏分别有各自的教程，可以在顶部选项中，“设计”一栏的右侧进行切换。
     *  1002	广告单元无效	    可能是拼写错误、或者误用了其他 APP 的广告 ID	请重新前往 q.qq.com 确认广告位 ID。
     *  1003	内部错误	        该项错误不是开发者的异常情况	一般情况下忽略一段时间即可恢复。
     *  1004	无适合的广告	    广告不是每一次都会出现，这次没有出现可能是由于该用户不适合浏览广告	属于正常情况，且开发者需要针对这种情况做形态上的兼容。
     *  1005	广告组件审核中	    你的广告正在被审核，无法展现广告	请前往 q.qq.com 确认审核状态，且开发者需要针对这种情况做形态上的兼容。
     *  1006	广告组件被驳回	    你的广告审核失败，无法展现广告	请前往 q.qq.com 确认审核状态，且开发者需要针对这种情况做形态上的兼容
     *  1007	广告组件被驳回	    你的广告能力已经被封禁，封禁期间无法展现广告	请前往 q.qq.com 确认小程序广告封禁状态。
     *  1008	广告单元已关闭	    该广告位的广告能力已经被关闭	请前往 q.qq.com 重新打开对应广告位的展现。
     *  1009	广告位置设置错误	该广告的位置设置导致展示不全	请重新调整广告的位置
     */
    private static mAppBlockAd = null;
    private static onFail: Function;

    private static screenWidth: number = NaN;
    private static screenHeight: number;
    private static pixelRatio: number;
    private static isIos: boolean;
    private static isAppBlockAdLoading: boolean = false;
    private static skdVersion: string;
    private static supportSDKVersion = "1.15.0";
    /**
     * 
     * @param onFail 错误回调
     * @param centerX centerX 单位为px
     * @param top top px值
     * @param orientation landscape | vertical
     */
    public static showAppBlockAd(onFail?: Function, top: number = 150, orientation: string = "landscape") {
        if (!Laya.Browser.onQQMiniGame) return;
        if (!Laya.Browser.window["qq"].createBlockAd) return;
        if (QQMiniGameAPI.isAppBlockAdLoading) return;

        QQMiniGameAPI.isAppBlockAdLoading = true;
        if (isNaN(QQMiniGameAPI.screenWidth)) {
            try {
                let res = Laya.Browser.window["qq"].getSystemInfoSync();

                QQMiniGameAPI.screenWidth = res.windowWidth;
                QQMiniGameAPI.screenHeight = res.windowHeight;
                QQMiniGameAPI.pixelRatio = res.pixelRatio;
                QQMiniGameAPI.isIos = res.platform == "ios";
                QQMiniGameAPI.skdVersion = res.SDKVersion;

                //IOS下使用DP单位,left,top均为DP，android使用PX
                QQMiniGameAPI.screenWidth *= (QQMiniGameAPI.isIos ? 1 : QQMiniGameAPI.pixelRatio);
                QQMiniGameAPI.screenHeight *= (QQMiniGameAPI.isIos ? 1 : QQMiniGameAPI.pixelRatio);

                console.log("getSystemInfoSync ==> ",res.SDKVersion);
            } catch (e) {
                if (onFail) onFail();
                return;
            }
        }

        let arr1: Array<number> = QQMiniGameAPI.skdVersion.split(".").map(v => parseInt(v));
        let arr2: Array<number> = QQMiniGameAPI.supportSDKVersion.split(".").map(v => parseInt(v));
        let isSupport: boolean = true;
        for (let i: number = 0; i < arr1.length; i++) {
            if (arr1[i] < arr2[i]) {
                isSupport = false;
                break;
            }
        }
        if (!isSupport) return;

        console.log("QQMiniGameAPI.showAppBlockAd ", top);

        QQMiniGameAPI.destroyAppBlockAd();
        QQMiniGameAPI.onFail = onFail;

        
        let min: number = QQMiniGameAPI.isIos ? 32 / QQMiniGameAPI.pixelRatio : 32;
        let mTop: number = Math.max(min, top / (QQMiniGameAPI.isIos ? QQMiniGameAPI.pixelRatio : 1));
        let mLeft: number = QQMiniGameAPI.screenWidth / 2;
        mLeft = min;

        QQMiniGameAPI.mAppBlockAd = Laya.Browser.window["qq"].createBlockAd({
            adUnitId: QQMiniGameAPI.blockAdArray[Math.floor(Math.random() * QQMiniGameAPI.blockAdArray.length)],
            style: { left: mLeft, top: mTop },
            size: QQMiniGameAPI.AppBlockSize,
            orientation: orientation,
        });
        // QQMiniGameAPI.mAppBlockAd.onResize(QQMiniGameAPI.appBlockADResize);
        QQMiniGameAPI.mAppBlockAd.onError(QQMiniGameAPI.appBlockADError);
        QQMiniGameAPI.mAppBlockAd.show().catch((err) => {
            console.log('积木广告 显示失败 ：' + JSON.stringify(err));
            if (onFail) {
                onFail();
            }
        });
        QQMiniGameAPI.isAppBlockAdLoading = false;
    }

    private static appBlockADResize(obj: any): void {
        if(!QQMiniGameAPI.mAppBlockAd["style"]) return;

        let realWidth = obj.width;
        let realHeight = obj.height;

        // console.log("onResize ==> qq ", screenWidth, "=", realWidth, "=", screenHeight, "=", realHeight);

        // if (!isNaN(centerX)) {
        //     mLeft = ((screenWidth - realWidth) / 2) + (centerX / (isIos ? pixelRatio : 1));
        // } else if (!isNaN(left)) {
        //     left /= (isIos ? pixelRatio : 1);
        //     mLeft = Math.max(33, left);
        // } else if (!isNaN(right)) {
        //     right /= (isIos ? pixelRatio : 1);
        //     mLeft = Math.max(screenWidth - realWidth, right);
        // }

        // console.log("onResize ==> 3 ", mLeft, "=", mTop);
        // QQMiniGameAPI.mAppBlockAd.style.left = mLeft;
        let mLeft = (QQMiniGameAPI.screenWidth - realWidth) / 2;
        QQMiniGameAPI.mAppBlockAd.style.left = mLeft;
    }

    private static appBlockADError(err: any): void {
        console.log("积木广告  加载失败 ", JSON.stringify(err));
        if (QQMiniGameAPI.onFail) QQMiniGameAPI.onFail();
    }

    public static destroyAppBlockAd() {
        if (!Laya.Browser.onQQMiniGame) return;
        if (!QQMiniGameAPI.mAppBlockAd) return;
        console.log("QQMiniGameAPI.destroyAppBlockAd");
        QQMiniGameAPI.mAppBlockAd.offResize(QQMiniGameAPI.appBlockADResize);
        QQMiniGameAPI.mAppBlockAd.offError(QQMiniGameAPI.appBlockADError);
        QQMiniGameAPI.mAppBlockAd.hide();
        QQMiniGameAPI.mAppBlockAd.destroy();
        QQMiniGameAPI.mAppBlockAd = null;


    }
    //----------------------   积木广告   ------------------------------------- /
}