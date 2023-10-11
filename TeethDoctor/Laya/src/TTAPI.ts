import App_XYXZS_Config from "./AppConfig";

export default class TT_XYXZS_API
{
    public static readonly adUn_XYXZS_itId = ""   
    public static readonly bann_XYXZS_erAdUnitId = ""   
    public static readonly Ins_XYXZS_AdUnitId = ""
    public static readonly _tem_XYXZS_plateId = ""       //分享素材id
    
    private static rec_XYXZS_ordRes:string = ""
    private static re_XYXZS_cord:any;

    protected static _b_XYXZS_anner : any = null;    

    public static tt_XYXZS_Login(onSuccess: Function, onFail: Function) {
        if (App_XYXZS_Config.onTTMi_XYXZS_niGame) {
            Laya.Browser.window.tt.login(
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
        TT_XYXZS_API.init_XYXZS_Record();
    }

    //-------------------------激励视频---------------------------------
    protected static _isRegReward_XYXZS_edVideoAdEvent = false;
    protected static _onRewarded_XYXZS_VideoAdFailed: Function = null;
    protected static _onRewarded_XYXZS_VideoAdClose: Function = null;
    protected static onRewarde_XYXZS_dVideoAdLoad() {
        console.log('激励视频 广告加载完成')
    }
    protected static onRewar_XYXZS_dedVideoAdError(err) {
        console.log('激励视频 广告加载失败' + err)
        if (TT_XYXZS_API._onRewarded_XYXZS_VideoAdFailed) {
            TT_XYXZS_API._onRewarded_XYXZS_VideoAdFailed();
        }
    }
    protected static onRewar_XYXZS_dedVideoAdClose(res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看')
            if (TT_XYXZS_API._onRewarded_XYXZS_VideoAdClose) {
                TT_XYXZS_API._onRewarded_XYXZS_VideoAdClose(true)
            }
        }
        else {
            console.log('激励视频 未完整观看')
            if (TT_XYXZS_API._onRewarded_XYXZS_VideoAdClose) {
                TT_XYXZS_API._onRewarded_XYXZS_VideoAdClose(false)
            }
        }
    }
    protected static regRewar_XYXZS_dedVideoAdEvent(rewardedVideoAd) {

        rewardedVideoAd.onLoad(TT_XYXZS_API.onRewarde_XYXZS_dVideoAdLoad)
        rewardedVideoAd.onError(TT_XYXZS_API.onRewar_XYXZS_dedVideoAdError)
        rewardedVideoAd.onClose(TT_XYXZS_API.onRewar_XYXZS_dedVideoAdClose)
        TT_XYXZS_API._isRegReward_XYXZS_edVideoAdEvent = true;
    }
    public static showRewar_XYXZS_dedVideoAd(onAdClose: Function, onFailed: Function) {
        if (App_XYXZS_Config.onTTMi_XYXZS_niGame) {
            TT_XYXZS_API._onRewarded_XYXZS_VideoAdClose = onAdClose;
            TT_XYXZS_API._onRewarded_XYXZS_VideoAdFailed = onFailed;

            var rewardedVideoAd = Laya.Browser.window["tt"].createRewardedVideoAd(
                {
                    adUnitId: TT_XYXZS_API.adUn_XYXZS_itId,
                }
            );

            if (!TT_XYXZS_API._isRegReward_XYXZS_edVideoAdEvent) {
                TT_XYXZS_API.regRewar_XYXZS_dedVideoAdEvent(rewardedVideoAd);
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
    
    private static init_XYXZS_Record(){
        TT_XYXZS_API.re_XYXZS_cord = Laya.Browser.window["tt"].getGameRecorderManager();  
        if(TT_XYXZS_API.re_XYXZS_cord!=null){
            TT_XYXZS_API.re_XYXZS_cord.onStart(res =>{
                console.log("录屏开始");
                TT_XYXZS_API.rec_XYXZS_ordRes="";        
            })

            TT_XYXZS_API.re_XYXZS_cord.onStop(res =>{
                console.log("录屏结束");
                TT_XYXZS_API.rec_XYXZS_ordRes = res.videoPath;
            })
        }
    }

    /**
     * 开始录屏
     */
    public static start_XYXZS_Record(duration = 300){
        if(!App_XYXZS_Config.onTTMi_XYXZS_niGame)return;
        TT_XYXZS_API.re_XYXZS_cord.start({
            duration
        })
    }

     /**
     * 停止录屏
     */
    public static stop_XYXZS_Record() {
        if(!App_XYXZS_Config.onTTMi_XYXZS_niGame)return;                     
        TT_XYXZS_API.re_XYXZS_cord.stop();
    }

    //----------------------------------------------------------------------

    //---------------------分享录屏----------------------------------------
    public static sha_XYXZS_reRecord(callback:Function=null){
        if(!App_XYXZS_Config.onTTMi_XYXZS_niGame)return;   
        if(TT_XYXZS_API.rec_XYXZS_ordRes!=""){
            window["tt"].shareAppMessage({
                channel:"video",
                extra: {
                    videoPath: TT_XYXZS_API.rec_XYXZS_ordRes, // 可替换成录屏得到的视频地址
                    videoTopics: ["快来和我一起玩吧！"]
                },
                success() {
                    if(callback!=null){
                        callback();
                    }
                    console.log("分享视频成功");
                },
                fail(e) {
                    console.log("分享视频失败");
                }
              });
        }else{
            console.log("分享视频为空");
        }
    }
    //----------------------------------------------------------------------


    //----------------------------------------------------------------------

    //---------------------分享好友----------------------------------------
    public static s_XYXZS_hare(complate:Function=null){
        if(!App_XYXZS_Config.onTTMi_XYXZS_niGame)return;   
        window["tt"].shareAppMessage({
            templateId:TT_XYXZS_API._tem_XYXZS_plateId,
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

    public static show_XYXZS_Banner():any
    {
        // if(!App_XYXZS_Config.onTTMi_XYXZS_niGame)return;
        // if(!TT_XYXZS_API._b_XYXZS_anner){
        //     const { windowWidth, windowHeight } = Laya.Browser.window["tt"].getSystemInfoSync();
        //     var targetBannerAdWidth = 150;
        //     // 创建一个居于屏幕底部正中的广告
        //     TT_XYXZS_API._b_XYXZS_anner = Laya.Browser.window["tt"].createBannerAd({
        //         adUnitId: TT_XYXZS_API.bann_XYXZS_erAdUnitId,
        //         adIntervals:30,                
        //         style: {
        //             width: targetBannerAdWidth,
        //             top: windowHeight - (targetBannerAdWidth / 16) * 9, // 根据系统约定尺寸计算出广告高度
        //         }
        //         });
        //     TT_XYXZS_API._b_XYXZS_anner.onResize(size => {
        //         console.log(size.width, size.height);
        //         TT_XYXZS_API._b_XYXZS_anner.style.top = windowHeight - size.height;
        //         TT_XYXZS_API._b_XYXZS_anner.style.left = (windowWidth - size.width) / 2;
        //     });
        //     TT_XYXZS_API._b_XYXZS_anner.show();
        // }
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