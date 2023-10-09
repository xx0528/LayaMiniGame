import App_ZMDGJ_Config from "./AppConfig";
import User_ZMDGJ_ from "./User/User";
import Http_ZMDGJ_Unit from "./Net/HttpUnit";
import Sound_ZMDGJ_Mgr from "./Mgr/SoundMgr";
import App_ZMDGJ_Switch_ZMDGJ_Config from "./Config/AppSwitchConfig";
import View_ZMDGJ_Mgr, { View_ZMDGJ_Def } from "./Mgr/ViewMgr";
import View_ZMDGJ_Base from "./View/ViewBase";

export default class VIVO_ZMDGJ_API {
    public static readonly ad_ZMDGJ_UnitId = "";                      //视频广告
    public static readonly bannerAd_ZMDGJ_UnitId = "";                //banner广告
    public static readonly native_ZMDGJ_AdId = "";                    //原生广告
    public static readonly Ins_ZMDGJ_Ad_ZMDGJ_UnitId = "";                    //插屏广告

    public static rewardedAd = null;
    public static rewardedAdNum = 0;
    public static get Banner_ZMDGJ_Instance() {
        return VIVO_ZMDGJ_API._banner_ZMDGJ_;
    }
    protected static _banner_ZMDGJ_: any = null;

    public static Login_ZMDGJ_(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.window["qg"].getSystemInfoSync().platformVersionCode >= 1053) {
            console.log("vivo 开始登陆 >= 1053");
            Laya.Browser.window["qg"].login().then((res) => {
                if (res.data.token) 
                {
                    let token = res.data.token;
                    onSuccess(token, true);
                    console.log("vivo 登陆成功,获取到 token : " + token);
                }
                else
                {
                    console.log('登录失败 res.data.token 为 null');
                    onFail();
                }
            }, (err) => {
                console.log('登录失败' + JSON.stringify(err));
                onFail();
            });
        } else {
            console.log("vivo 开始登陆 < 1053");
            Laya.Browser.window["qg"].authorize({
                type: "token",
                success: function (data) {
                    // 使用token进行服务端对接
                    Laya.Browser.window["qg"].getProfile({
                        token: data.accessToken,
                        success: function(data){
                            console.log('openid获取成功',data.openid)
                            onSuccess(data.openid, false);
                        },
                        fail: function(data, code) {
                            console.log("获取openid失败 : " + code);
                            onFail();
                        }
                    })
                },
                fail: function (data, code) {
                    console.log('登录失败' + code);
                    onFail();
                }
            })
        }
    }

    //提示弹窗
    public static show_ZMDGJ_Dialog(titel : string,message : string,buttons : Array<any>,success : Function,cancel : Function,fail : Function) {
        Laya.Browser.window["qg"].showDialog({
            title: titel,
            message: message,
            buttons: buttons,
            success: function (data) {
                console.log('handling callback')
                success();
            },
            cancel: function () {
                console.log('handling cancel')
                cancel();
            },
            fail: function (data, code) {
                console.log(`handling fail, code = ${code}`)
                fail();
            }
        })
    }

    //创建视频广告
    public static create_ZMDGJ_Rewarded_ZMDGJ_VideoAd() {
        if (Laya.Browser.onVVMiniGame) {
            VIVO_ZMDGJ_API.rewardedAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: VIVO_ZMDGJ_API.ad_ZMDGJ_UnitId,
                style: {}
            });

            VIVO_ZMDGJ_API.rewardedAd.onError(err => {
                switch (err.errCode) {
                    case -3:
                        console.log("激励广告加载失败---调用太频繁", JSON.stringify(err));
                        break;
                    case -4:
                        console.log("激励广告加载失败--- 一分钟内不能重复加载", JSON.stringify(err));
                        break;
                    case 30008:
                        // 当前启动来源不支持激励视频广告，请选择其他激励策略
                        break;
                    default:
                        // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                        console.log("激励广告展示失败")
                        console.log(JSON.stringify(err))
                        break;
                }
            })
        }
    }

    //显示视频广告
    public static show_ZMDGJ_Rewarded_ZMDGJ_VideoAd(onAdClose: Function, onFailed: Function) {
        if (Laya.Browser.onVVMiniGame) {
            Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.stop_ZMDGJ_BGM();
            console.log("---------------------------------- VIVO_ZMDGJ_API.rewardedAd:", VIVO_ZMDGJ_API.rewardedAd + ",VIVO_ZMDGJ_API.rewardedAdNum:", VIVO_ZMDGJ_API.rewardedAdNum)
            // if (VIVO_ZMDGJ_API.rewardedAd == null) {
            //     onFailed();
            //     return;
            // }

            if (VIVO_ZMDGJ_API.rewardedAdNum == 0) {
                VIVO_ZMDGJ_API.create_ZMDGJ_Rewarded_ZMDGJ_VideoAd();
            } else {
                // 第一次creat后广告可以在onload里面直接show
                // 后续的加载必须要load才能触发onload接着才能show出广告
                let adLoad = VIVO_ZMDGJ_API.rewardedAd.load();//第一次调用 可能会报-3  广告能正常展示就可以忽略
                // 捕捉load失败的错误
                adLoad && adLoad.catch(err => {
                    console.log("激励广告load失败" + JSON.stringify(err))
                    onFailed();
                })
            }

            VIVO_ZMDGJ_API.rewardedAdNum = 1;
            console.log("近来showRewardedVideoAd");

            VIVO_ZMDGJ_API.rewardedAd.onLoad(() => {
                let adshow = VIVO_ZMDGJ_API.rewardedAd.show();
                // 捕捉show失败的错误
                adshow && adshow.then(() => {
                    console.log("激励广告展示成功");
                }).catch(err => {
                    console.log("激励广告展示失败" + JSON.stringify(err))
                    onFailed();
                })
            })

            VIVO_ZMDGJ_API.rewardedAd.onClose(res => {
                if (res && res.isEnded) {
                    console.log("正常播放结束，可以下发游戏奖励");
                    onAdClose(true);
                } else {
                    console.log("播放中途退出，不下发游戏奖励");
                    onAdClose(false);
                }
            });
        }
    }

    public static m_ZMDGJ_BannerAd = null;
    public static show_ZMDGJ_BannerAd() {
        var self = VIVO_ZMDGJ_API;
        if (Laya.Browser.onVVMiniGame) {
            console.log('===========bannerAd showBanerAd');
            var systemInfo = Laya.Browser.window["qg"].getSystemInfoSync();
            var sw = systemInfo.screenWidth;
            var sh = systemInfo.screenHeight;
            VIVO_ZMDGJ_API.m_ZMDGJ_BannerAd = qg.createBannerAd({
                posId: VIVO_ZMDGJ_API.bannerAd_ZMDGJ_UnitId,
                style: {}
            });
            let adshow = VIVO_ZMDGJ_API.m_ZMDGJ_BannerAd.show();
            // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
            adshow && adshow.then(() => {
                console.log("banner广告展示成功");
            }).catch((err) => {
                switch (err.code) {
                    case 30003:
                        console.log("新用户7天内不能曝光Banner，请将手机时间调整为7天后，退出游戏重新进入")
                        break;
                    case 30009:
                        console.log("10秒内调用广告次数超过1次，10秒后再调用")
                        // setTimeout(() => {
                        //     show()
                        // }, 10000);
                        break;
                    case 30002:
                        console.log("加载广告失败，重新加载广告")
                        // setTimeout(() => {
                        //     retryShow()
                        // }, 10000);             
                        break;
                    default:
                        // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                        console.log("banner广告展示失败")
                        console.log(JSON.stringify(err))
                        break;
                }
            });

            VIVO_ZMDGJ_API.m_ZMDGJ_BannerAd.onError(function (err) {
                console.log('Banner广告加载失败111:' + JSON.stringify(err));
            })
        }
    }

    public static hide_ZMDGJ_BannerAd() {
        if (VIVO_ZMDGJ_API.m_ZMDGJ_BannerAd) {
            console.log('===========bannerAd 隐藏');
            VIVO_ZMDGJ_API.m_ZMDGJ_BannerAd.hide();
            VIVO_ZMDGJ_API.m_ZMDGJ_BannerAd.destroy();
            VIVO_ZMDGJ_API.m_ZMDGJ_BannerAd = null;
        } else {
            console.log('===========bannerAd 为空');
        }
    }

    public static navigate_ZMDGJ_To_ZMDGJ_MiniProgram(pkgName: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onVVMiniGame) {
            console.log("vivo 跳转游戏： " + pkgName);
            Laya.Browser.window["qg"].navigateToMiniGame(
                {
                    pkgName: pkgName,
                    path: path,
                    extraData: {
                        from: App_ZMDGJ_Config.App_ZMDGJ_ID
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

    public static show_ZMDGJ_Interstitial_ZMDGJ_Ad(onAdClose: Function, onFailed: Function) {
        if (Laya.Browser.onVVMiniGame) {
            var insertAd = Laya.Browser.window["qg"].createInterstitialAd({
                posId: VIVO_ZMDGJ_API.Ins_ZMDGJ_Ad_ZMDGJ_UnitId
            })
            insertAd.onLoad(() => {
                console.log("插屏广告加载完成");
            })
            insertAd.onClose(() => {
                if(onAdClose) onAdClose();
            })
            insertAd.onError((err) => {
                console.log("插屏广告拉取失败", JSON.stringify(err));
                if (onFailed) {
                    onFailed();
                }
            });
            insertAd.show().then(()=>{
                console.log("插屏广告显示成功");
            }).catch(err=>{
                if(onFailed) onFailed();
            });
        }
        else {
            if(onAdClose)onAdClose();
        }

    }

    public static get_ZMDGJ_Launch_ZMDGJ_OptionsSync() {
        return {};
    }

    public static _ZMDGJ_share_ZMDGJ_(complate: Function) {
        if (Laya.Browser.onVVMiniGame) {
            Laya.Browser.window["qg"].share({
                success() {
                    if (complate != null) {
                        complate(true);
                    }

                    Laya.Browser.window["qg"].showToast({
                        message: "分享成功"
                    })
                },

                fail(erromsg, errocode) {
                    // Laya.Browser.window["qg"].showToast({
                    //     message: "分享失败：" + errocode + ': ' + erromsg
                    // })

                    Laya.Browser.window["qg"].showToast({
                        message: "分享失败"
                    })
                },

                cancel() {
                    Laya.Browser.window["qg"].showToast({
                        message: "分享失败"
                    })
                },

                complete() {

                }
            })
        }
    }

    public static create_ZMDGJ_Desktop_ZMDGJ_Icon(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onVVMiniGame) {
            Laya.Browser.window["qg"].hasShortcutInstalled({
                success: function (res) {
                    if (res == false) {
                        Laya.Browser.window["qg"].installShortcut(
                            {
                                success: function () {
                                    if (onSuccess) {
                                        onSuccess();
                                    }
                                },
                                fail: function (err) {
                                    if (onFail) {
                                        onFail();
                                    }
                                    console.log("创建桌面图标失败！！！！", err);
                                    for (var key in err) {
                                        console.log(key, err);
                                    }
                                },
                                complete: function () {

                                }
                            })
                    }
                    else {
                        console.log("桌面图标已存在！！！！");
                        if (onFail) {
                            onFail();
                        }
                    }
                },
                fail: function (err) {
                    if (onFail) {
                        onFail();
                    }
                    console.log("判断桌面图标是否存在失败！！！", err);
                    for (var key in err) {
                        console.log(key, err);
                    }
                },
                complete: function () {

                }
            })
        }
        else {
            if (onFail) {
                onFail();
            }
        }
    }

    //显示vivo原生界面(过时接口，不要使用)
    public static show_ZMDGJ_Native_ZMDGJ_Ad(onSuccess : Function, onFail : Function, index: number)
    {
        if (1 == index)  {
            VIVO_ZMDGJ_API.tryShowNativeAd1(onSuccess, onFail);
        } else if (2 == index)  {
            VIVO_ZMDGJ_API.tryShowNativeAd2(onSuccess, onFail);
        }
    }

    //尝试打开原生广告1
    public static tryShowNativeAd1(onSuccess : Function, onFail : Function)
    {
        if(!Laya.Browser.onVVMiniGame)
        {
            if(null != onFail)
            {
                onFail();
            }
            return;
        }

        let success = () => {
            if(null != onSuccess)
            {
                onSuccess();
            }
        };

        let yuanshengSwitch = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().vivocfg.yuanshengSwitch;
        let vivoVersions = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().vivocfg.vivoversions;
        if(1 == yuanshengSwitch && vivoVersions == App_ZMDGJ_Config.Versions_ZMDGJ_)
        {
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.VVNativeView1,null,(v : View_ZMDGJ_Base)=>
            {
                success();
            });
        }
        else
        {
            if(null != onFail)
            {
                onFail();
            }
        }
    }

    //尝试打开原生广告2
    public static tryShowNativeAd2(onSuccess : Function, onFail : Function)
    {
        if(!Laya.Browser.onVVMiniGame)
        {
            if(null != onFail)
            {
                onFail();
            }
            return;
        }

        let success = () => {
            if(null != onSuccess)
            {
                onSuccess();
            }
        };

        let yuanshengSwitch = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().vivocfg.yuanshengSwitch2;
        let vivoVersions = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().vivocfg.vivoversions;
        if(1 == yuanshengSwitch && vivoVersions == App_ZMDGJ_Config.Versions_ZMDGJ_)
        {
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.VVNativeView2,null,(v : View_ZMDGJ_Base)=>
            {
                success();
            });
        }
        else
        {
            if(null != onFail)
            {
                onFail();
            }
        }
    }

    //尝试根据配置自动弹出创建图标确认框
    public static tryPopCreateDestopIcon(onSuccess: Function, onFail: Function)  {
        if (!Laya.Browser.onVVMiniGame)  {
            if (null != onFail)  {
                onFail();
            }
            return;
        }
        if (1 == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().vivocfg.addToDesktop)  {
            VIVO_ZMDGJ_API.create_ZMDGJ_Desktop_ZMDGJ_Icon(onSuccess, onFail);
        }
        else  {
            if (null != onFail)  {
                onFail();
            }
        }
    }

    //尝试根据配置显示插屏广告
    public static tryShowInsAd(onSuccess: Function, onFail: Function)
    {
        let chapingSwitch = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().vivocfg.chapingSwitch;
        if(1 == chapingSwitch)
        {
            let rate = Math.random() * 100;
            if(rate <= App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().vivocfg.chaping)
            {
                VIVO_ZMDGJ_API.show_ZMDGJ_Interstitial_ZMDGJ_Ad(()=>
                {
                    if(onSuccess)
                    {
                        onSuccess();
                    }
                },
                ()=>
                {
                    if(onFail)
                    {
                        onFail();
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
        else
        {
            if(onFail)
            {
                onFail();
            }
        }
    }
    
}