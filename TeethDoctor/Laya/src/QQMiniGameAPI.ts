export default class QQMini_XYXZS_GameAPI {
    public static readonly adU_XYXZS_nitId = ""         //激励视频Id
    public static readonly bann_XYXZS_erAdUnitId = ""   //banner广告Id
    public static readonly InsAd_XYXZS_UnitId = ""      //插屏广告Id
    public static readonly AppBo_XYXZS_xId = ""        //盒子广告Id

    public static Lo_XYXZS_gin(onSuccess: Function, onFail: Function) {
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
    protected static _isRegRewar_XYXZS_dedVideoAdEvent = false;
    protected static _onRewarded_XYXZS_VideoAdFailed: Function = null;
    protected static _onRewardedV_XYXZS_ideoAdClose: Function = null;
    protected static onRewarde_XYXZS_dVideoAdLoad() {
        console.log('激励视频 广告加载完成')
    }
    protected static onRewarded_XYXZS_VideoAdError(err) {
        console.log('激励视频 广告加载失败' + err)
        if (QQMini_XYXZS_GameAPI._onRewarded_XYXZS_VideoAdFailed) {
            QQMini_XYXZS_GameAPI._onRewarded_XYXZS_VideoAdFailed();
        }
    }
    protected static onRewarde_XYXZS_dVideoAdClose(res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看')
            if (QQMini_XYXZS_GameAPI._onRewardedV_XYXZS_ideoAdClose) {
                QQMini_XYXZS_GameAPI._onRewardedV_XYXZS_ideoAdClose(true)
            }
        }
        else {
            console.log('激励视频 未完整观看')
            if (QQMini_XYXZS_GameAPI._onRewardedV_XYXZS_ideoAdClose) {
                QQMini_XYXZS_GameAPI._onRewardedV_XYXZS_ideoAdClose(false)
            }
        }
    }
    protected static regReward_XYXZS_edVideoAdEvent(rewardedVideoAd) {

        rewardedVideoAd.onLoad(QQMini_XYXZS_GameAPI.onRewarde_XYXZS_dVideoAdLoad)
        rewardedVideoAd.onError(QQMini_XYXZS_GameAPI.onRewarded_XYXZS_VideoAdError)
        rewardedVideoAd.onClose(QQMini_XYXZS_GameAPI.onRewarde_XYXZS_dVideoAdClose)

        QQMini_XYXZS_GameAPI._isRegRewar_XYXZS_dedVideoAdEvent = true;
    }
    public static showReward_XYXZS_edVideoAd(onAdClose: Function, onFailed: Function) {
        if (Laya.Browser.onQQMiniGame) {
            QQMini_XYXZS_GameAPI._onRewardedV_XYXZS_ideoAdClose = onAdClose;
            QQMini_XYXZS_GameAPI._onRewarded_XYXZS_VideoAdFailed = onFailed;

            var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd(
                {
                    adUnitId: QQMini_XYXZS_GameAPI.adU_XYXZS_nitId,
                }
            );

            if (!QQMini_XYXZS_GameAPI._isRegRewar_XYXZS_dedVideoAdEvent) {
                QQMini_XYXZS_GameAPI.regReward_XYXZS_edVideoAdEvent(rewardedVideoAd);
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
    public static navigateToMi_XYXZS_niProgram(appId: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
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
    protected static _on_XYXZS_Show: Function = null;
    protected static _lastS_XYXZS_hareTime: number = 0;
    public static sh_XYXZS_are(complate: Function, titel: string, imageUrl: string) {
        if (Laya.Browser.onQQMiniGame) {
            QQMini_XYXZS_GameAPI._on_XYXZS_Show = () => {
                Laya.Browser.window["qq"].offShow(QQMini_XYXZS_GameAPI._on_XYXZS_Show)
                QQMini_XYXZS_GameAPI._on_XYXZS_Show = null;
                var c = Date.now() - this._lastS_XYXZS_hareTime;
                if (complate) {
                    if (Date.now() - this._lastS_XYXZS_hareTime > 2000) {
                        complate(true)
                    }
                    else {
                        complate(false)
                    }
                }
            }
            Laya.Browser.window["qq"].onShow(QQMini_XYXZS_GameAPI._on_XYXZS_Show)
            QQMini_XYXZS_GameAPI._lastS_XYXZS_hareTime = Date.now();
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
    public static showInt_XYXZS_erstitialAd(onAdClose: Function, onFailed: Function)  {
        if (Laya.Browser.onQQMiniGame) {
            var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                adUnitId: QQMini_XYXZS_GameAPI.InsAd_XYXZS_UnitId,
            })

            interstitialAd.onLoad(() => {
                console.log('插屏广告 加载完成');
                interstitialAd.show().catch((err) => {
                    console.log('插屏广告 显示失败 ：' + err)
                    if (onFailed) {
                        onFailed();
                    }
                })
            })

            interstitialAd.onError((err) => {
                console.log('插屏广告 加载失败' + err);
                if (onFailed) {
                    onFailed();
                }
            })

            interstitialAd.onClose(() => {
                console.log('插屏广告 关闭');
                if (onAdClose) {
                    onAdClose();
                }
            })
        }
        else {
            onAdClose();
        }
    }

        //--------------------盒子广告---------------------------------------
        public static mAp_XYXZS_pboxAd = null;
        public static Loa_XYXZS_dAppBoxAd(onAdClose: Function, onFailed: Function) {
            if (Laya.Browser.onQQMiniGame) {
                QQMini_XYXZS_GameAPI.mAp_XYXZS_pboxAd = Laya.Browser.window["qq"].createAppBox({
                    adUnitId: QQMini_XYXZS_GameAPI.AppBo_XYXZS_xId,
                })
                QQMini_XYXZS_GameAPI.mAp_XYXZS_pboxAd.load().then(() => {
                    console.log('盒子广告 加载完成');
                })
    
                QQMini_XYXZS_GameAPI.mAp_XYXZS_pboxAd.onError((err) => {
                    console.log('盒子广告 加载失败' + err);
                    if (onFailed) {
                        onFailed();
                    }
                })
    
                QQMini_XYXZS_GameAPI.mAp_XYXZS_pboxAd.onClose(() => {
                    console.log('盒子广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                })
            }
            else {
                onAdClose();
            }
        }
    
        public static show_XYXZS_AppBoxAd(onFailed: Function) {
            if(QQMini_XYXZS_GameAPI.mAp_XYXZS_pboxAd){
                console.log("显示盒子广告");
                QQMini_XYXZS_GameAPI.mAp_XYXZS_pboxAd.show().catch((err) => {
                    console.log('盒子广告 显示失败 ：' + err);
                    if (onFailed) {
                        onFailed();
                    }
                })
            }else{
                QQMini_XYXZS_GameAPI.Loa_XYXZS_dAppBoxAd((onAdClose) => {
                }, (onFailed) => {
                })
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
    public static getLaunc_XYXZS_hOptionsSync() {
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
    public static SetShar_XYXZS_eMenu(titel: string, imageUrl: string, success?: Function, fail?: Function, complate?: Function) {
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
}