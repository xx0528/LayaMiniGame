import App_whnp_Config from "./AppConfig";
import AppConfig from "./AppConfig";
import ViewMgr, { View_ppxhc_Def } from "./Mgr/ViewMgr";
import HttpUnit from "./Net/HttpUnit";

export default class TT_ppxhc_API
{
    public static readonly adUnitId = ""   
    public static readonly bannerAdUnitId = ""   
    public static readonly InsAdUnitId = ""
    public static readonly _templateId = ""       //分享素材id
    
    private static recordRes:string = ""
    private static record:any;

    protected static _banner : any = null;    

    public static ttLogin(onSuccess: Function, onFail: Function) {
        if (App_whnp_Config.onTTMiniGame_ppxhc_) {
            Laya.Browser.window["tt"].login(
                {
                    force : false,                    
                    success: (res) => {
                        console.log("登陆成功1");
                        let code = res.code;
                        if(code){
                            onSuccess(code);
                        }else{
                            console.log("用户没有登陆，采用临时code")
                            onFail();
                        }
                    },
                    fail:()=>{
                        console.log("登陆失败1");
                        onFail();
                    },
                })
            TT_ppxhc_API.initRecord();       
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
        if (TT_ppxhc_API._onRewardedVideoAdFailed) {
            TT_ppxhc_API._onRewardedVideoAdFailed();
        }
    }
    protected static onRewardedVideoAdClose_ppxhc(res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看')
            if (TT_ppxhc_API._onRewardedVideoAdClose) {
                TT_ppxhc_API._onRewardedVideoAdClose(true)
            }
        }
        else {
            console.log('激励视频 未完整观看')
            if (TT_ppxhc_API._onRewardedVideoAdClose) {
                TT_ppxhc_API._onRewardedVideoAdClose(false)
            }
        }
    }
    protected static regRewardedVideoAdEvent_ppxhc(rewardedVideoAd) {

        rewardedVideoAd.onLoad(TT_ppxhc_API.onRewardedVideoAdLoad_ppxhc)
        rewardedVideoAd.onError(TT_ppxhc_API.onRewardedVideoAdError_ppxhc)
        rewardedVideoAd.onClose(TT_ppxhc_API.onRewardedVideoAdClose_ppxhc)
        TT_ppxhc_API._isRegRewardedVideoAdEvent = true;
    }
    public static showRewardedVideoAd_ppxhc(onAdClose: Function, onFailed: Function) {
        if (App_whnp_Config.onTTMiniGame_ppxhc_) {
            TT_ppxhc_API._onRewardedVideoAdClose = onAdClose;
            TT_ppxhc_API._onRewardedVideoAdFailed = onFailed;

            var rewardedVideoAd = Laya.Browser.window["tt"].createRewardedVideoAd(
                {
                    adUnitId: TT_ppxhc_API.adUnitId,
                }
            );

            if (!TT_ppxhc_API._isRegRewardedVideoAdEvent) {
                TT_ppxhc_API.regRewardedVideoAdEvent_ppxhc(rewardedVideoAd);
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


    //-------------------------小游戏跳转---------------------------TODO
    // public static navigateToMiniProgram(appId: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
    //     if (Laya.Browser.onMiniGame) {
    //         console.log("跳转游戏： " + appId);
    //         Laya.Browser.window["tt"].navigateToMiniProgram(
    //             {
    //                 appId: appId,
    //                 path: path,
    //                 extraData: {
    //                     foo: 'bar'
    //                 },
    //                 envVersion: 'release',
    //                 success(res) {
    //                     if (onSuccess) {
    //                         onSuccess(res)
    //                     }
    //                 },
    //                 fail(res) {
    //                     if (onFail) {
    //                         onFail(res)
    //                     }
    //                 },
    //                 complete(res) {
    //                     if (onComplate) {
    //                         onComplate(res)
    //                     }
    //                 }
    //             })

    //     }
    // }
    //-------------------------------------------------------------

    //-------------------录屏-------------------------------------------
    /**
     * 配置录屏
     */
    
    private static initRecord(){
        TT_ppxhc_API.record = Laya.Browser.window["tt"].getGameRecorderManager();  
        if(TT_ppxhc_API.record!=null){
            TT_ppxhc_API.record.onStart(res =>{
                console.log("录屏开始");
                TT_ppxhc_API.recordRes="";        
            })

            TT_ppxhc_API.record.onStop(res =>{
                console.log("录屏结束");
                TT_ppxhc_API.recordRes = res.videoPath;
            })
        }
    }

    /**
     * 开始录屏
     */
    public static startRecord(duration = 300){
        if(!App_whnp_Config.onTTMiniGame_ppxhc_)return;
        TT_ppxhc_API.record.start({
            duration
        })
    }

     /**
     * 停止录屏
     */
    public static stopRecord() {
        if(!App_whnp_Config.onTTMiniGame_ppxhc_)return;                     
        TT_ppxhc_API.record.stop();
    }

    //----------------------------------------------------------------------

    //---------------------分享录屏----------------------------------------
    public static shareRecord(callback: Function = null, Failcallback: Function = null) {
        if (!App_whnp_Config.onTTMiniGame_ppxhc_) return;
        if (TT_ppxhc_API.recordRes != "") {
            window["tt"].shareAppMessage({
                channel: "video",
                extra: {
                    videoPath: TT_ppxhc_API.recordRes, // 可替换成录屏得到的视频地址
                    videoTopics: [AppConfig.GameName]
                },
                success() {
                    if (callback != null) {
                        callback();
                    }
                    console.log("分享视频成功");
                },
                fail(e) {
                    console.log("分享视频失败");
                    if (Failcallback != null) {
                        Failcallback();
                    }
                }
            });
        } else {
            if (Failcallback != null) {
                Failcallback();
            }
            console.log("分享视频为空");
        }
    }
    //----------------------------------------------------------------------


    //----------------------------------------------------------------------

    //---------------------分享好友----------------------------------------
    public static share(complate:Function=null){
        if(!App_whnp_Config.onTTMiniGame_ppxhc_)return;   
        window["tt"].shareAppMessage({
            templateId:TT_ppxhc_API._templateId,
            success() {
                if(complate!=null){
                    complate();
                }
            },
            fail() {
                console.log("分享失败");
            }
            });

    }

    //------------------------------------------------------------------

    //-------------------------banner-------------------------------------------

    public static showBanner():any
    {
        if(!App_whnp_Config.onTTMiniGame_ppxhc_ || TT_ppxhc_API.bannerAdUnitId.length<=0)return;
        if(!TT_ppxhc_API._banner){
            const { windowWidth, windowHeight } = Laya.Browser.window["tt"].getSystemInfoSync();
            var targetBannerAdWidth = 150;
            // 创建一个居于屏幕底部正中的广告
            TT_ppxhc_API._banner = Laya.Browser.window["tt"].createBannerAd({
                adUnitId: TT_ppxhc_API.bannerAdUnitId,
                adIntervals:30,                
                style: {
                    width: targetBannerAdWidth,
                    top: windowHeight - (targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度
                }
                });
            TT_ppxhc_API._banner.onResize(size => {
                console.log(size.width, size.height);
                TT_ppxhc_API._banner.style.top = windowHeight - size.height;
                TT_ppxhc_API._banner.style.left = (windowWidth - size.width) / 2;
            });
        }
        TT_ppxhc_API._banner.show();
    }

    public static hideBanner()
    {
        if(null != TT_ppxhc_API._banner)
        {
            TT_ppxhc_API._banner.hide();
        }
    }

    public static showMoreGamesModal(onSuccess : Function,onFail : Function)
    {
        const systemInfo = Laya.Browser.window["tt"].getSystemInfoSync();
        // iOS 不支持，建议先检测再使用
        if (systemInfo.platform !== "ios") {
            // 打开互跳弹窗
            Laya.Browser.window["tt"].showMoreGamesModal({
                appLaunchOptions: [
                    {
                        appId: AppConfig.App_ppxhc_ID,
                        query: "foo=bar&baz=qux",
                        extraData: {}
                    }
                    // {...}
                ],
                success(res) {
                    console.log("success", res.errMsg);
                    if(onSuccess)
                    {
                        onSuccess();
                    }
                },
                fail(res) {
                    console.log("fail", res.errMsg);
                    if(onFail)
                    {
                        onFail();
                    }
                }
            });
        }
        else
        {
            if(onFail)
            {
                onFail();
            }
        }
    }

    //自动弹出签到界面，如果可以签到则弹出签到界面并回调参数 true，如果不可以签到则不弹出签到界面并回调参数 false
    public static autoOpenSignInView(complate : Function)
    {
        HttpUnit.GetSignIn((res)=>
        {
            let isSign : number = res.data.is_sign;
            let signDays : number = res.data.sign_day_num;
            if(isSign == 0)
            {
                ViewMgr.instance.openView(View_ppxhc_Def.TTSignInView,null,()=>
                {
                    complate(true);
                })
            }
            else
            {
                complate(false);
            }
        },()=>
        {
            complate(false);
        })
    }

    //----------------------------------------------------------------------

    // //--------------------插屏幕广告---------------------------------------  
    // public static showInterstitialAd(onAdClose: Function, onFailed: Function)  {
    //     if (Laya.Browser.onMiniGame) {
    //         var interstitialAd = Laya.Browser.window["wx"].createInterstitialAd({
    //             adUnitId: TTAPI.InsAdUnitId,
    //         })

    //         interstitialAd.onLoad(() => {
    //             console.log('插屏广告 加载完成');
    //             interstitialAd.show().catch((err) => {
    //                 console.log('插屏广告 显示失败 ：' + err)
    //                 if (onFailed) {
    //                     onFailed();
    //                 }
    //             })
    //         })

    //         interstitialAd.onError((err) => {
    //             console.log('插屏广告 加载失败' + err);
    //             if (onFailed) {
    //                 onFailed();
    //             }
    //         })

    //         interstitialAd.onClose(() => {
    //             console.log('插屏广告 关闭');
    //             if (onAdClose) {
    //                 onAdClose();
    //             }
    //         })
    //     }
    //     else {
    //         onAdClose();
    //     }
    // }
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html
     * @static
     * @returns {LaunchOptions} 
     * @memberof TTAPI
     */
    // public static getLaunchOptionsSync() {
    //     // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
    //     if (Laya.Browser.onMiniGame) {
    //         let obj = Laya.Browser.window["wx"].getLaunchOptionsSync()
    //         console.log("场景值 " + obj.scene);
    //         let str = JSON.stringify(obj.query);
    //         console.log("Query参数 " + str);
    //         let key = obj.query["key"];
    //         console.log("Query参数：key " + key);
    //         console.log("ShareTicket " + obj.shareTicket);
    //         console.log("ReferrerInfo.appId " + obj.referrerInfo.appId);
    //         console.log("ReferrerInfo.extraData " + obj.referrerInfo.extraData);
    //         return obj;
    //     }
    //     let obj = { scene: 1001, query: "", shareTicket: "", appId: "", extraData: "" }
    //     return obj;
    // }

    //----------------------------------------------------------------------
    // /**
    //  * 打开微信左上角分享转发点击事件,在游戏逻辑中调用一次即可
    //  * 注意此方法只会在真机上执行，在微信模拟器环境下点击转发按钮什么都不会发生
    //  * 
    //  * @static
    //  * @param {string} titel 分享标题
    //  * @param {string} imageUrl 分享图片地址
    //  * @param {Function} [success] 成功回调函数(可不填)
    //  * @param {Function} [fail] 失败回调函数(可不填)
    //  * @param {Function} [complate] 完成回调函数，成功失败都会执行(可不填)
    //  * @memberof TTAPI
    //  */
    // public static SetShareMenu(titel: string, imageUrl: string, success?: Function, fail?: Function, complate?: Function) {
    //     if (Laya.Browser.onMiniGame) {
    //         console.log("小游戏设置转发按钮");
    //         Laya.Browser.window["wx"].showShareMenu({
    //             withShareTicket: false,
    //             success: success,
    //             fail: fail,
    //             complete: complate
    //         });
    //         Laya.Browser.window["wx"].onShareAppMessage(function () {
    //             return {
    //                 title: titel,
    //                 imageUrl: imageUrl
    //             }
    //         });
    //     }
    // }


}