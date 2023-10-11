import View_wcjtn_Mgr, { View_wcjtn_Def } from "./Mgr/ViewMgr";
import App_wcjtn_Switch_wcjtn_Config from "./Config/AppSwitchConfig";
import Wu_wcjtn_dian_wcjtn_Mgr from "./Mgr/WudianMgr";
import App_wcjtn_Config from "./AppConfig";

export default class QQ_wcjtn_Mini_wcjtn_GameAPI {
    public static readonly ad_wcjtn_UnitId = ""         //激励视频Id
    public static readonly banner_wcjtn_AdUnitId = ""   //banner广告Id
    public static readonly Ins_wcjtn_AdUnitId = ""      //插屏广告Id
    public static readonly App_wcjtn_BoxId = ""        //盒子广告Id

    public static _wcjtn_Login_wcjtn_(onSuccess: Function, onFail: Function) {
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
    protected static _isReg_wcjtn_Rewarded_wcjtn_VideoAdEvent = false;
    protected static _onRewarded_wcjtn_VideoAd_wcjtn_Failed: Function = null;
    protected static _onRewarded_wcjtn_VideoAd_wcjtn_Close: Function = null;
    protected static onRewarded_wcjtn_VideoAd_wcjtn_Load() {
        console.log('激励视频 广告加载完成')
    }
    protected static onRewarded_wcjtn_VideoAd_wcjtn_Error(err) {
        console.log('激励视频 广告加载失败' + err)
        if (QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Failed) {
            QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Failed();
        }
    }
    protected static onRewarded_wcjtn_Video_wcjtn_AdClose(res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看')
            if (QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Close) {
                QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Close(true)
            }
        }
        else {
            console.log('激励视频 未完整观看')
            if (QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Close) {
                QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Close(false)
            }
        }
    }
    protected static reg_wcjtn_Rewarded_wcjtn_Video_wcjtn_AdEvent(rewardedVideoAd) {

        rewardedVideoAd.onLoad(QQ_wcjtn_Mini_wcjtn_GameAPI.onRewarded_wcjtn_VideoAd_wcjtn_Load)
        rewardedVideoAd.onError(QQ_wcjtn_Mini_wcjtn_GameAPI.onRewarded_wcjtn_VideoAd_wcjtn_Error)
        rewardedVideoAd.onClose(QQ_wcjtn_Mini_wcjtn_GameAPI.onRewarded_wcjtn_Video_wcjtn_AdClose)

        QQ_wcjtn_Mini_wcjtn_GameAPI._isReg_wcjtn_Rewarded_wcjtn_VideoAdEvent = true;
    }
    public static show_wcjtn_Rewarded_wcjtn_VideoAd(onAdClose: Function, onFailed: Function) {
        if (Laya.Browser.onQQMiniGame) {
            QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Close = onAdClose;
            QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Failed = onFailed;

            var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd(
                {
                    adUnitId: QQ_wcjtn_Mini_wcjtn_GameAPI.ad_wcjtn_UnitId,
                }
            );

            if (!QQ_wcjtn_Mini_wcjtn_GameAPI._isReg_wcjtn_Rewarded_wcjtn_VideoAdEvent) {
                QQ_wcjtn_Mini_wcjtn_GameAPI.reg_wcjtn_Rewarded_wcjtn_Video_wcjtn_AdEvent(rewardedVideoAd);
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
    public static navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program(appId: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
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
    protected static _onShow_wcjtn_: Function = null;
    protected static _last_wcjtn_Share_wcjtn_Time: number = 0;
    public static share_wcjtn_(complate: Function, titel: string, imageUrl: string) {
        if (Laya.Browser.onQQMiniGame) {
            QQ_wcjtn_Mini_wcjtn_GameAPI._onShow_wcjtn_ = () => {
                Laya.Browser.window["qq"].offShow(QQ_wcjtn_Mini_wcjtn_GameAPI._onShow_wcjtn_)
                QQ_wcjtn_Mini_wcjtn_GameAPI._onShow_wcjtn_ = null;
                var c = Date.now() - this._last_wcjtn_Share_wcjtn_Time;
                if (complate) {
                    if (Date.now() - this._last_wcjtn_Share_wcjtn_Time > 2000) {
                        complate(true)
                    }
                    else {
                        complate(false)
                    }
                }
            }
            Laya.Browser.window["qq"].onShow(QQ_wcjtn_Mini_wcjtn_GameAPI._onShow_wcjtn_)
            QQ_wcjtn_Mini_wcjtn_GameAPI._last_wcjtn_Share_wcjtn_Time = Date.now();
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
    public static show_wcjtn_Interstitial_wcjtn_Ad(onAdClose: Function, onFailed: Function)  {
        if (Laya.Browser.onQQMiniGame) {
            var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                adUnitId: QQ_wcjtn_Mini_wcjtn_GameAPI.Ins_wcjtn_AdUnitId,
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
        public static mApp_wcjtn_box_wcjtn_Ad = null;
        protected static on_wcjtn_BoxAd_wcjtn_Close : Function = null;
        
        public static Load_wcjtn_App_wcjtn_BoxAd(onAdClose: Function, onFailed: Function) {
            if (Laya.Browser.onQQMiniGame) {
                QQ_wcjtn_Mini_wcjtn_GameAPI.mApp_wcjtn_box_wcjtn_Ad = Laya.Browser.window["qq"].createAppBox({
                    adUnitId: QQ_wcjtn_Mini_wcjtn_GameAPI.App_wcjtn_BoxId,
                })
                QQ_wcjtn_Mini_wcjtn_GameAPI.mApp_wcjtn_box_wcjtn_Ad.load().then(() => {
                    console.log('盒子广告 加载完成');
                })
    
                QQ_wcjtn_Mini_wcjtn_GameAPI.mApp_wcjtn_box_wcjtn_Ad.onError((err) => {
                    console.log('盒子广告 加载失败' + err);
                    if (onFailed) {
                        onFailed();
                    }
                })
                QQ_wcjtn_Mini_wcjtn_GameAPI.on_wcjtn_BoxAd_wcjtn_Close = () => {
                    console.log('盒子广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                }
                QQ_wcjtn_Mini_wcjtn_GameAPI.mApp_wcjtn_box_wcjtn_Ad.onClose(QQ_wcjtn_Mini_wcjtn_GameAPI.on_wcjtn_BoxAd_wcjtn_Close);
            }
            else {
                onAdClose();
            }
        }
    
        public static show_wcjtn_App_wcjtn_BoxAd(onFailed: Function,onAdClose? : Function) {
            if(this.mApp_wcjtn_box_wcjtn_Ad){
                console.log("显示盒子广告");
                this.mApp_wcjtn_box_wcjtn_Ad.offClose(this.on_wcjtn_BoxAd_wcjtn_Close);
                this.on_wcjtn_BoxAd_wcjtn_Close = () => {
                    console.log('盒子广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                }
                this.mApp_wcjtn_box_wcjtn_Ad.onClose(this.on_wcjtn_BoxAd_wcjtn_Close);
                this.mApp_wcjtn_box_wcjtn_Ad.show().catch((err) => {
                    console.log('盒子广告 显示失败 ：' + err);
                    if (onFailed) {
                        onFailed();
                    }
                })
            }else{
                QQ_wcjtn_Mini_wcjtn_GameAPI.Load_wcjtn_App_wcjtn_BoxAd(onAdClose,onFailed);
            } 
        }
        
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/qq.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync.html
     * @static
     * @returns {LaunchOptions} 
     * @memberof QQ_wcjtn_Mini_wcjtn_GameAPI
     */
    public static get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync() {
        // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
        if (Laya.Browser.onQQMiniGame) {
            let obj = Laya.Browser.window["qq"].get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync()
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
     * @memberof QQ_wcjtn_Mini_wcjtn_GameAPI
     */
    public static Set_wcjtn_Share_wcjtn_Menu(titel: string, imageUrl: string, success?: Function, fail?: Function, complate?: Function) {
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
        let launchScene = QQ_wcjtn_Mini_wcjtn_GameAPI.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
        let noEnterBySearch: boolean = true;
        let wudianSceneList = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
        for (let i = 0; i < wudianSceneList.length; ++i)  
        {
            let wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipBlocked = Wu_wcjtn_dian_wcjtn_Mgr.Get_wcjtn_Ip_wcjtn_Blocked();
        let wudian =  App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian;
        let kuangdianBanner =  App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.kuang_wcjtn_dian_wcjtn_Banner;
        if(App_wcjtn_Config.Versions_wcjtn_ ==  App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.qq_wcjtn_versions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBanner)
        {
            View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.QQCrazyClickView,data,()=>
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
        let launchScene = QQ_wcjtn_Mini_wcjtn_GameAPI.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
        let noEnterBySearch: boolean = true;
        let wudianSceneList =  App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
        for (let i = 0; i < wudianSceneList.length; ++i)  
        {
            let wudianSceneValue = wudianSceneList[i];
            if(launchScene == wudianSceneValue)
            {
                noEnterBySearch = false;
            }
        }
        let ipBlocked = Wu_wcjtn_dian_wcjtn_Mgr.Get_wcjtn_Ip_wcjtn_Blocked();
        let wudian =  App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian;
        let kuangdianBox =  App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.kuangdian_wcjtn_Box;
        if(App_wcjtn_Config.Versions_wcjtn_ ==  App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.qq_wcjtn_versions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBox)
        {
            View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.QQCrazyClickView2,data,()=>
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