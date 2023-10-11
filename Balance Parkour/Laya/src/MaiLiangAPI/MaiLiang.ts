import { request_tippy_Data } from "../Net/HttpUnit";
import AppConfig from "../AppConfig";
import WXAPI from "../WXAPI";
import Us_tippy_er from "../User/User";

/**
 * 用于买量上报,以及停留时间上报的的类，本质上是对wx和买量接口做一个集成化的封装方便使用
 * 
 * @export
 * @class MaiLiang
 */
export default class Mai_tippy_Liang {
    public static main_tippy_Url: string = "https://swtj.mrkzx.cn";
    public static uc_tippy_lick: string = "/v1.1/api/Activity/uclick.html";
    public static st_tippy_ay: string = "/v1.1/api/Activity/stay.html";

    public static ke_tippy_y: string = "";//推广路径中同名参数，需要调用方法WXAPi.getLaunchOptionsSync()，从返回的参数中获得。
    public static Mai_tippy_LiangOpenId: string = "";//买量系统唯一标识,执行GetMaiLiangOpenId()方法成功后自动获得。
    private static ti_tippy_me: number = 0;//买量系统唯一标识后，记录当前时间（精确到秒）。

    /**
     * 发送数据的类
     * 
     * @protected
     * @static
     * @param {request_tippy_Data} req 
     * @memberof MaiLiang
     */
    protected static req_tippy_uest(req: request_tippy_Data) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        } else {
            req.url = Mai_tippy_Liang.main_tippy_Url + req.url;
        }
        var completeFunc = (res) => {
            console.log(res, "MaiLiang http Success")
            res = JSON.parse(res);
            if (res.Status == "200") {
                if (res.Result["OpenId"] != null && res.Result["OpenId"] != "") {
                    Mai_tippy_Liang.Mai_tippy_LiangOpenId = res.Result["OpenId"];
                    Mai_tippy_Liang.ti_tippy_me = req.data.posttime;
                    console.log("获得买量系统OpenId " + Mai_tippy_Liang.Mai_tippy_LiangOpenId);

                }
                else {
                    console.log("上报买量系统停留时间成功");
                }
                if (req.onSuccess) {
                    req.onSuccess(res);
                }
            }
            else {
                if (req.onFail) {
                    req.onFail(res);
                }
            }

            req.onSuccess = null;
            req = null;
        };
        var errorFunc = (res) => {
            console.log(res, "MaiLiang http fail")
            if (req.onFail) {
                req.onFail(res);
            }
            req.onFail = null;
            req = null;
        };

        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, Mai_tippy_Liang, completeFunc);
        xhr.once(Laya.Event.ERROR, Mai_tippy_Liang, errorFunc);

        if (req.meth == "get") {
            var para = "";
            for (const key of Object.keys(req.data)) {
                var value = req.data[key];
                para += key + "=" + value + "&";
            }
            req.url = req.url + "?" + para;
            xhr.send(req.url, null, req.meth);
        }
        else {
            var para = "";
            for (const key of Object.keys(req.data)) {
                var value = req.data[key];
                para += key + "=" + value + "&";
            }
            xhr.send(req.url, para, req.meth, null, ["Content-Type", "application/x-www-form-urlencoded"]);
        }

    }
    /**
     * 获得买量系统唯一标识ID,此ID的作用是用来上报游戏时间
     * 
     * @param {Function} res 
     * @memberof MaiLiang
     */
    public static Get_tippy_MaiLiangOpenId(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            let option = WXAPI.getLaunchOptionsSync();
            if (option != null) {
                let key = option.query["key"];
                if (key != null && key != "" && Us_tippy_er.open_tippy_Id != "") {
                    Mai_tippy_Liang.ke_tippy_y = key;
                    let req = new request_tippy_Data();
                    req.url = Mai_tippy_Liang.uc_tippy_lick;
                    req.onSuccess = onSuccess;
                    req.onFail = onFail;
                    req.data.appid = AppConfig.AppID;
                    req.data.openid = "";
                    let time = new Date().getTime() / 1000;
                    req.data.posttime = time;
                    req.data.auth = 0;
                    req.data.key = key;
                    req.data.wxopenid = Us_tippy_er.open_tippy_Id;
                    req.meth = "POST";
                    console.log("发送买量数据接口")
                    Mai_tippy_Liang.req_tippy_uest(req);
                }
            }
            else {
                console.log("上报买量数据失败")
                onFail(null);
            }

        }
        else {
            console.log("不在微信模式下调用，默认上报买量数据失败")
            onFail(null);
        }
    }
    /**
     * 上报买量接口停留时间
     * 
        appid －主体小程序appid
        openid －买量系统唯一标识（不可空）
        posttime － 请求时间刻度（精确到秒）
        time － 停留时长（精确到秒）
     * @static
     * @memberof MaiLiang
     */
    public static Report_tippy_StayTime(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            if (Mai_tippy_Liang.Mai_tippy_LiangOpenId != "") {
                let req = new request_tippy_Data();
                req.url = Mai_tippy_Liang.st_tippy_ay;
                req.onSuccess = onSuccess;
                req.onFail = onFail;
                req.data.appid = AppConfig.AppID;
                req.data.openid = Mai_tippy_Liang.Mai_tippy_LiangOpenId;
                let time = new Date().getTime() / 1000;
                req.data.posttime = time;
                let staytime = Mai_tippy_Liang.ti_tippy_me != 0 ? time - Mai_tippy_Liang.ti_tippy_me : 0;
                req.data.time = staytime;
                req.meth = "POST";
                console.log("发送停留时间至买量接口")
                Mai_tippy_Liang.req_tippy_uest(req);
            }
        }
        else {
            console.log("不在微信模式下调用，默认发送停留时间至买量接口失败")
            onFail(null);
        }
    }

}