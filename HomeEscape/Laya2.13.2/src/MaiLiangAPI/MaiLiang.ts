import ryw_HttpUnit, { ryw_requestData } from "../Net/HttpUnit";
import ryw_AppConfig from "../AppConfig";
import ryw_WXAPI from "../WXAPI";
import ryw_User from "../User/User";
import ryw_OPPOAPI from "../OPPOAPI";

/**
 * 用于买量上报,以及停留时间上报的的类，本质上是对wx和买量接口做一个集成化的封装方便使用
 * 
 * @export
 * @class MaiLiang
 */
export default class ryw_MaiLiang {
    public static ryw_mainUrl: string = "https://swtj.mrkzx.cn";
    public static ryw_uclick: string = "/v1.1/api/Activity/uclick.html";
    public static ryw_stay: string = "/v1.1/api/Activity/stay.html";

    public static ryw_key: string = "";//推广路径中同名参数，需要调用方法WXAPi.getLaunchOptionsSync()，从返回的参数中获得。
    public static ryw_MaiLiangOpenId: string = "";//买量系统唯一标识,执行GetMaiLiangOpenId()方法成功后自动获得。
    private static ryw_time: number = 0;//买量系统唯一标识后，记录当前时间（精确到秒）。

    /**
     * 发送数据的类
     * 
     * @protected
     * @static
     * @param {ryw_requestData} req 
     * @memberof MaiLiang
     */
    protected static ryw_request(req: ryw_requestData) {
        if (req.ryw_url.indexOf("https://") > -1 ||
            req.ryw_url.indexOf("http://") > -1) {
            req.ryw_url = req.ryw_url;
        } else {
            req.ryw_url = ryw_MaiLiang.ryw_mainUrl + req.ryw_url;
        }
        var completeFunc = (res) => {
            console.log(res, "MaiLiang http Success")
            res = JSON.parse(res);
            if (res.Status == "200") {
                if (res.Result["OpenId"] != null && res.Result["OpenId"] != "") {
                    ryw_MaiLiang.ryw_MaiLiangOpenId = res.Result["OpenId"];
                    ryw_MaiLiang.ryw_time = req.ryw_data.posttime;
                    console.log("获得买量系统OpenId " + ryw_MaiLiang.ryw_MaiLiangOpenId);

                }
                else {
                    console.log("上报买量系统停留时间成功");
                }
                if (req.ryw_onSuccess) {
                    req.ryw_onSuccess(res);
                }
            }
            else {
                if (req.ryw_onFail) {
                    req.ryw_onFail(res);
                }
            }

            req.ryw_onSuccess = null;
            req = null;
        };
        var errorFunc = (res) => {
            console.log(res, "MaiLiang http fail")
            if (req.ryw_onFail) {
                req.ryw_onFail(res);
            }
            req.ryw_onFail = null;
            req = null;
        };

        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, ryw_MaiLiang, completeFunc);
        xhr.once(Laya.Event.ERROR, ryw_MaiLiang, errorFunc);

        if (req.ryw_meth == "get") {
            var para = "";
            for (const key of Object.keys(req.ryw_data)) {
                var value = req.ryw_data[key];
                para += key + "=" + value + "&";
            }
            req.ryw_url = req.ryw_url + "?" + para;
            xhr.send(req.ryw_url, null, req.ryw_meth);
        }
        else {
            var para = "";
            for (const key of Object.keys(req.ryw_data)) {
                var value = req.ryw_data[key];
                para += key + "=" + value + "&";
            }
            xhr.send(req.ryw_url, para, req.ryw_meth, null, ["Content-Type", "application/x-www-form-urlencoded"]);
        }

    }
    /**
     * 获得买量系统唯一标识ID,此ID的作用是用来上报游戏时间
     * 
     * @param {Function} res 
     * @memberof MaiLiang
     */
    public static ryw_GetMaiLiangOpenId(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            let option = ryw_WXAPI.ryw_getLaunchOptionsSync();
            if (option != null) {
                let key = option.query["key"];
                if (key != null && key != "" && ryw_User.ryw_openId != "") {
                    ryw_MaiLiang.ryw_key = key;
                    let req = new ryw_requestData();
                    req.ryw_url = ryw_MaiLiang.ryw_uclick;
                    req.ryw_onSuccess = onSuccess;
                    req.ryw_onFail = onFail;
                    req.ryw_data.appid = ryw_AppConfig.ryw_AppID;
                    req.ryw_data.openid = "";
                    let time = new Date().getTime() / 1000;
                    req.ryw_data.posttime = time;
                    req.ryw_data.auth = 0;
                    req.ryw_data.key = key;
                    req.ryw_data.wxopenid = ryw_User.ryw_openId;
                    req.ryw_meth = "POST";
                    console.log("发送买量数据接口")
                    ryw_MaiLiang.ryw_request(req);
                }
            }
            else {
                console.log("上报买量数据失败")
                onFail(null);
            }
        }
        else if(Laya.Browser.onQGMiniGame)
        {
            let option = ryw_OPPOAPI.ryw_getLaunchOptionsSync();
            ryw_HttpUnit.ryw_reportImport(option.referrerInfo.package,option.referrerInfo.extraData.appid,(result)=>
            {
                if(1 == result.code)
                {
                    console.log("OPPO 上报买量数据成功");
                }
                else
                {
                    console.log("OPPO 上报买量数据失败",result.msg);
                }
            },(result)=>
            {
                console.log("OPPO 上报买量数据失败");
                for(var key in result)
                {
                    console.log(key, result[key]);
                }
            });
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
    public static ryw_ReportStayTime(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            if (ryw_MaiLiang.ryw_MaiLiangOpenId != "") {
                let req = new ryw_requestData();
                req.ryw_url = ryw_MaiLiang.ryw_stay;
                req.ryw_onSuccess = onSuccess;
                req.ryw_onFail = onFail;
                req.ryw_data.appid = ryw_AppConfig.ryw_AppID;
                req.ryw_data.openid = ryw_MaiLiang.ryw_MaiLiangOpenId;
                let time = new Date().getTime() / 1000;
                req.ryw_data.posttime = time;
                let staytime = ryw_MaiLiang.ryw_time != 0 ? time - ryw_MaiLiang.ryw_time : 0;
                req.ryw_data.time = staytime;
                req.ryw_meth = "POST";
                console.log("发送停留时间至买量接口")
                ryw_MaiLiang.ryw_request(req);
            }
        }
        else {
            console.log("不在微信模式下调用，默认发送停留时间至买量接口失败")
            onFail(null);
        }
    }

}