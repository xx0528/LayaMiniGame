import * as Adv_manager from "./adv_manager.js"
import Utilit from "../Utilit";

export default class Hy_myqq_ShareAd 
{
    public static readonly LoopAdAdv_key : string = "";
    public static readonly BannerAdAdv_key : string = "";
    public static readonly InsertAdLAdv_key  : string = "";
    
    public static UseRandomAdvKey : boolean = true;
    public static readonly Adv_keys : Array<string> = 
    [

    ]

    public static _iphoneIgnoreAppIds =
        [
        ]

    public static get_myqq_ADVs(adv_key: string, complate: Function,useRandom? : boolean) {
        useRandom = null == useRandom ? Hy_myqq_ShareAd.UseRandomAdvKey : useRandom
        if(useRandom)
        {
            adv_key = Hy_myqq_ShareAd.getRandomAdv_key();
        }
        Adv_manager.getIconButtons([adv_key], (res) => {
            var alldata = Adv_manager.getAllAdvData();
            let datas = alldata[adv_key];
            if (datas && Utilit.isIphone()) {
                console.log(datas);
                for (var i = 0; i < datas.length; ++i) {
                    var data = datas[i];
                    for (var j = 0; j < Hy_myqq_ShareAd._iphoneIgnoreAppIds.length; ++j) {
                        if (data.appid == Hy_myqq_ShareAd._iphoneIgnoreAppIds[j]) {
                            datas.splice(i, 1);
                            --i;
                            break;
                        }
                    }
                }
            }
            complate(datas)
        })
    }
    public static navigateToMiniProgram(adv_id: string, appId: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
        if (Laya.Browser.onMiniGame) {
            console.log("跳转游戏： " + appId);
            let toMin = {
                adv_id: adv_id,// 用于统计广告点击数据
                appId: appId,
                path: path,
                success: res => {
                    if (onSuccess) {
                        onSuccess(res)
                    }
                    // do something
                },
                fail: res => {
                    // do something
                    if (onFail) {
                        onFail(res)
                    }
                },
                complete: () => {
                    if (onComplate) {
                        onComplate()
                    }
                    // do something
                }
            }
            let wx2 = Laya.Browser.window["wx"];
            wx2 && wx2.h_ToMinProgram && wx2.h_ToMinProgram(toMin);
        }
    }

    public static getRandomAdv_key() : string
    {
        return Hy_myqq_ShareAd.Adv_keys[Math.floor(Math.random() * Hy_myqq_ShareAd.Adv_keys.length)]
    }
}