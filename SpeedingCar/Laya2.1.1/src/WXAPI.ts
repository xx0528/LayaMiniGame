import App_wcjtn_Switch_wcjtn_Config from "./Config/AppSwitchConfig";
import View_wcjtn_Mgr, { View_wcjtn_Def } from "./Mgr/ViewMgr";
import View_wcjtn_Base from "./View/ViewBase";
import Wu_wcjtn_dian_wcjtn_Mgr from "./Mgr/WudianMgr";

export class GameRecorder
{
    protected get recorder()
    {
        // if(null == this._recorder)
        // {
        //     if(Laya.Browser.onMiniGame)
        //     {
        //         if (null != Laya.Browser.window["wx"].getGameRecorder
        //             && "function" == typeof (Laya.Browser.window["wx"].getGameRecorder))  
        //         {
        //             this._recorder = Laya.Browser.window["wx"].getGameRecorder();
        //             if(null != this._recorder)
        //             {
        //                 this._recorder.on('start', () => { console.log("开始录屏") });
        //                 this._recorder.on('stop', (res) => { console.log("停止录屏 录屏长度：", res.duration) });
        //                 this._recorder.on('pause', () => { console.log("暂停录屏") });
        //                 this._recorder.on('resume', () => { console.log("继续录屏") });
        //                 this._recorder.on('abort', () => { console.log("丢弃录屏") });
        //             }
        //         }
        //         else
        //         {
        //             console.log("不支持微信录屏！");
        //         }
        //     }
        // }
        return this._recorder;
    }
    protected _recorder : any = null;

    /**
    * 开始录屏
    */
    public start()  {
        if (null != this.recorder)  {
            this.recorder.start();
        }
    }
    /**
    * 停止录屏
    */
    public stop()  {
        if (null != this.recorder)  {
            this.recorder.stop();
        }
    }
    /**
    * 暂停录屏
    */
    public pause()  {
        if (null != this.recorder)  {
            this.recorder.pause();
        }
    }
    /**
    * 从暂停状态恢复到录制状态
    */
    public resume()  {
        if (null != this.recorder)  {
            this.recorder.resume();
        }
    }
    /**
    * 舍弃录屏
    */
    public abort() {
        if (null != this.recorder) {
            this.recorder.abort();
        }
    }
    /**
    * 显示分享按钮
    */
    public showShareBtn()
    {
        if(null != this.recorder)
        {
            let button = Laya.Browser.window["wx"].createGameRecorderShareButton({
                // 样式参数
                style: {
                    left: 10,
                    top: 150,
                    height: 50,
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 16,
                    borderRadius: 4,
                    iconMarginRight: 16,
                    paddingLeft: 1,
                    paddingRight: 30,
                },
                // 按钮的背景图片
                image: 'button.jpg',
                text: '自定义文案',
                icon: 'icon.jpg',
                // 分享参数
                share: {
                    query: 'a=1&b=2',
                    // 背景音乐的路径
                    bgm: 'walkin.mp3',
                    timeRange: [[0, 1000], [2000, 3000]],
                    title: {
                        template: 'default.score',
                        data: {
                            score: 6500
                        }
                    },
                    button: {
                        template: 'default.enter',
                    }
                }
            })
        }
    }
}

export default class WX_wcjtn_API {
    public static readonly ad_wcjtn_UnitId = "adunit-227abbd25ba28da5"
    public static readonly banner_wcjtn_AdUnitId = "adunit-c3e631056309a4de"
    public static readonly Ins_wcjtn_AdUnitId = "adunit-440e21cc02c0d282"
    

    public static readonly GameRecorder = new GameRecorder();

    public static _wcjtn_wxLogin_wcjtn_(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window.wx.login(
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
    protected static _isReg_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Event = false;
    protected static _on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Failed: Function = null;
    protected static _on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close: Function = null;
    protected static on_wcjtn_Rewarded_wcjtn_VideoAdLoad() {
        console.log('激励视频 广告加载完成')
    }
    protected static onRewarded_wcjtn_Video_wcjtn_AdError(err) {
        console.log('激励视频 广告加载失败' + err)
        if (WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Failed) {
            WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Failed();
        }
    }
    protected static on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close(res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看')
            if (WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close) {
                WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close(true)
            }
        }
        else {
            console.log('激励视频 未完整观看')
            if (WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close) {
                WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close(false)
            }
        }
    }
    protected static reg_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Event(rewardedVideoAd) {

        rewardedVideoAd.onLoad(WX_wcjtn_API.on_wcjtn_Rewarded_wcjtn_VideoAdLoad)
        rewardedVideoAd.onError(WX_wcjtn_API.onRewarded_wcjtn_Video_wcjtn_AdError)
        rewardedVideoAd.onClose(WX_wcjtn_API.on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close)

        WX_wcjtn_API._isReg_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Event = true;
    }
    public static show_wcjtn_Rewarded_wcjtn_VideoAd(onAdClose: Function, onFailed: Function) {
        if (Laya.Browser.onMiniGame) {
            WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close = onAdClose;
            WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Failed = onFailed;

            var rewardedVideoAd = Laya.Browser.window["wx"].createRewardedVideoAd(
                {
                    adUnitId: WX_wcjtn_API.ad_wcjtn_UnitId,
                }
            );

            if (!WX_wcjtn_API._isReg_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Event) {
                WX_wcjtn_API.reg_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Event(rewardedVideoAd);
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
    public static navigate_wcjtn_To_wcjtn_MiniProgram(appId: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onMiniGame) {
            console.log("跳转游戏： " + appId);
            Laya.Browser.window["wx"].navigateToMiniProgram(
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
    public static share_wcjtn_(complate: Function, titel: string, imageUrl: string) {
        if (Laya.Browser.onMiniGame) {
            WX_wcjtn_API._onShow = () => {
                Laya.Browser.window["wx"].offShow(WX_wcjtn_API._onShow)
                WX_wcjtn_API._onShow = null;
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
            Laya.Browser.window["wx"].onShow(WX_wcjtn_API._onShow)
            WX_wcjtn_API._lastShareTime = Date.now();
            Laya.Browser.window["wx"].shareAppMessage(
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
        if (Laya.Browser.onMiniGame) {
            var interstitialAd = Laya.Browser.window["wx"].createInterstitialAd({
                adUnitId: WX_wcjtn_API.Ins_wcjtn_AdUnitId,
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
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html
     * @static
     * @returns {LaunchOptions} 
     * @memberof WXAPI
     */
    public static get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync() {
        // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
        if (Laya.Browser.onMiniGame) {
            let obj = Laya.Browser.window["wx"].getLaunchOptionsSync()
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
     * @memberof WXAPI
     */
    public static Set_wcjtn_Share_wcjtn_Menu(titel: string, imageUrl: string, success?: Function, fail?: Function, complate?: Function) {
        if (Laya.Browser.onMiniGame) {
            console.log("小游戏设置转发按钮");
            Laya.Browser.window["wx"].showShareMenu({
                withShareTicket: false,
                success: success,
                fail: fail,
                complete: complate
            });
            Laya.Browser.window["wx"].onShareAppMessage(function () {
                return {
                    title: titel,
                    imageUrl: imageUrl
                }
            });
        }
    }

    //检测更新
    public static check_wcjtn_Update()
    {
        if (Laya.Browser.onMiniGame) 
        {
            var updateManager = Laya.Browser.window["wx"].getUpdateManager()
            updateManager.onCheckForUpdate(function (res) 
            {
                console.log("是否需要更新 : ",res.hasUpdate)
            })
            updateManager.onUpdateReady(function () {
                Laya.Browser.window["wx"].showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启小游戏？',
                    success: function (res) 
                    {
                        if (res.confirm) 
                        {
                            updateManager.applyUpdate()
                        }
                    }
                })
            })
            updateManager.onUpdateFailed(function () {
                console.log("新版本下载失败!!!")
            })
        }
    }

    protected static _crazyClickShowCounter : number = 0;
    //尝试打开微信狂点界面
    //titel 界面中显示的文本
    //onComplete 当狂点完成时
    //onSuccess 当狂点界面打开成功
    //onFail 当狂点界面打开失败
    public static tryShowWXCrazyClick(titel : string,onComplete : Function,onSuccess: Function, onFail: Function)
    {
        if(!Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag || 1 != App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wxcfg.kuang_wcjtn_dian_wcjtn_Banner)
        {
            if(onFail)
            {
                onFail();
            }
            return;
        }
        let kuangdianLevelSpcacing = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wxcfg.kuang_wcjtn_dian_wcjtn_LevelSpcacing;
        if(0 != kuangdianLevelSpcacing)
        {
            let left = WX_wcjtn_API._crazyClickShowCounter % kuangdianLevelSpcacing;
            if(0 == left)
            {
                View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.WXCrazyClick,{
                    Complete : onComplete ,
                    titel :titel
                },(v : View_wcjtn_Base)=>
                {
                    if(onSuccess)
                    {
                        onSuccess();
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
            ++WX_wcjtn_API._crazyClickShowCounter;
        }
        else
        {
            View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.WXCrazyClick,
                {
                    Complete : onComplete ,
                    titel :titel
                },(v : View_wcjtn_Base)=>
            {
                if(onSuccess)
                {
                    onSuccess();
                }
            })
        }
    }

}

