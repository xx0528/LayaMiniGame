import Http_wcjtn_Unit, { request_wcjtn_Data } from "../Net/HttpUnit";
import App_wcjtn_Config from "../AppConfig";
import WX_wcjtn_API from "../WXAPI";
import User_wcjtn_ from "../User/User";
import OPPO_wcjtn_API from "../OPPOAPI";

/**
 * 用于买量上报,以及停留时间上报的的类，本质上是对wx和买量接口做一个集成化的封装方便使用
 * 
 * @export
 * @class MaiLiang
 */
export default class Mai_wcjtn_Liang {
    public static _wcjtn_mainUr_wcjtn_l: string = "";
    public static u_wcjtn_click: string = "/v1.1/api/Activity/uclick.html";
    public static _wcjtn_stay_wcjtn_: string = "/v1.1/api/Activity/stay.html";

    public static _wcjtn_key_wcjtn_: string = "";//推广路径中同名参数，需要调用方法WXAPi.getLaunchOptionsSync()，从返回的参数中获得。
    public static Mai_wcjtn_Liang_wcjtn_OpenId: string = "";//买量系统唯一标识,执行GetMaiLiangOpenId()方法成功后自动获得。
    private static _wcjtn_time_wcjtn_: number = 0;//买量系统唯一标识后，记录当前时间（精确到秒）。

    /**
     * 发送数据的类
     * 
     * @protected
     * @static
     * @param {request_wcjtn_Data} req 
     * @memberof MaiLiang
     */
    protected static req_wcjtn_uest(req: request_wcjtn_Data) {
        if (req.url_wcjtn_.indexOf("https://") > -1 ||
            req.url_wcjtn_.indexOf("http://") > -1) {
            req.url_wcjtn_ = req.url_wcjtn_;
        } else {
            req.url_wcjtn_ = Mai_wcjtn_Liang._wcjtn_mainUr_wcjtn_l + req.url_wcjtn_;
        }
        var completeFunc = (res) => {
            console.log(res, "MaiLiang http Success")
            res = JSON.parse(res);
            if (res.Status == "200") {
                if (res.Result["OpenId"] != null && res.Result["OpenId"] != "") {
                    Mai_wcjtn_Liang.Mai_wcjtn_Liang_wcjtn_OpenId = res.Result["OpenId"];
                    Mai_wcjtn_Liang._wcjtn_time_wcjtn_ = req._wcjtn_data_wcjtn_.posttime;
                    console.log("获得买量系统OpenId " + Mai_wcjtn_Liang.Mai_wcjtn_Liang_wcjtn_OpenId);

                }
                else {
                    console.log("上报买量系统停留时间成功");
                }
                if (req.on_wcjtn_Success) {
                    req.on_wcjtn_Success(res);
                }
            }
            else {
                if (req.on_wcjtn_Fail) {
                    req.on_wcjtn_Fail(res);
                }
            }

            req.on_wcjtn_Success = null;
            req = null;
        };
        var errorFunc = (res) => {
            console.log(res, "MaiLiang http fail")
            if (req.on_wcjtn_Fail) {
                req.on_wcjtn_Fail(res);
            }
            req.on_wcjtn_Fail = null;
            req = null;
        };

        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, Mai_wcjtn_Liang, completeFunc);
        xhr.once(Laya.Event.ERROR, Mai_wcjtn_Liang, errorFunc);

        if (req.meth_wcjtn_ == "get") {
            var para = "";
            for (const key of Object.keys(req._wcjtn_data_wcjtn_)) {
                var value = req._wcjtn_data_wcjtn_[key];
                para += key + "=" + value + "&";
            }
            req.url_wcjtn_ = req.url_wcjtn_ + "?" + para;
            xhr.send(req.url_wcjtn_, null, req.meth_wcjtn_);
        }
        else {
            var para = "";
            for (const key of Object.keys(req._wcjtn_data_wcjtn_)) {
                var value = req._wcjtn_data_wcjtn_[key];
                para += key + "=" + value + "&";
            }
            xhr.send(req.url_wcjtn_, para, req.meth_wcjtn_, null, ["Content-Type", "application/x-www-form-urlencoded"]);
        }

    }
    /**
     * 获得买量系统唯一标识ID,此ID的作用是用来上报游戏时间
     * 
     * @param {Function} res 
     * @memberof MaiLiang
     */
    public static Get_wcjtn_Mai_wcjtn_Liang_wcjtn_OpenId(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            let option = WX_wcjtn_API.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync();
            if (option != null) {
                let key = option.query["key"];
                if (key != null && key != "" && User_wcjtn_.openId_wcjtn_ != "") {
                    Mai_wcjtn_Liang._wcjtn_key_wcjtn_ = key;
                    let req = new request_wcjtn_Data();
                    req.url_wcjtn_ = Mai_wcjtn_Liang.u_wcjtn_click;
                    req.on_wcjtn_Success = onSuccess;
                    req.on_wcjtn_Fail = onFail;
                    req._wcjtn_data_wcjtn_.appid = App_wcjtn_Config.App_wcjtn_ID;
                    req._wcjtn_data_wcjtn_.openid = "";
                    let time = new Date().getTime() / 1000;
                    req._wcjtn_data_wcjtn_.posttime = time;
                    req._wcjtn_data_wcjtn_.auth = 0;
                    req._wcjtn_data_wcjtn_.key = key;
                    req._wcjtn_data_wcjtn_.wxopenid = User_wcjtn_.openId_wcjtn_;
                    req.meth_wcjtn_ = "POST";
                    console.log("发送买量数据接口")
                    Mai_wcjtn_Liang.req_wcjtn_uest(req);
                }
            }
            else {
                console.log("上报买量数据失败")
                onFail(null);
            }
        }
        else if(Laya.Browser.onQGMiniGame)
        {
            let option = OPPO_wcjtn_API.get_wcjtn_LaunchOpt_wcjtn_ionsSync();
            Http_wcjtn_Unit.report_wcjtn_Import(option.referrerInfo.package,option.referrerInfo.extraData.appid,(result)=>
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
    public static Report_wcjtn_Stay_wcjtn_Time(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            if (Mai_wcjtn_Liang.Mai_wcjtn_Liang_wcjtn_OpenId != "") {
                let req = new request_wcjtn_Data();
                req.url_wcjtn_ = Mai_wcjtn_Liang._wcjtn_stay_wcjtn_;
                req.on_wcjtn_Success = onSuccess;
                req.on_wcjtn_Fail = onFail;
                req._wcjtn_data_wcjtn_.appid = App_wcjtn_Config.App_wcjtn_ID;
                req._wcjtn_data_wcjtn_.openid = Mai_wcjtn_Liang.Mai_wcjtn_Liang_wcjtn_OpenId;
                let time = new Date().getTime() / 1000;
                req._wcjtn_data_wcjtn_.posttime = time;
                let staytime = Mai_wcjtn_Liang._wcjtn_time_wcjtn_ != 0 ? time - Mai_wcjtn_Liang._wcjtn_time_wcjtn_ : 0;
                req._wcjtn_data_wcjtn_.time = staytime;
                req.meth_wcjtn_ = "POST";
                console.log("发送停留时间至买量接口")
                Mai_wcjtn_Liang.req_wcjtn_uest(req);
            }
        }
        else {
            console.log("不在微信模式下调用，默认发送停留时间至买量接口失败")
            onFail(null);
        }
    }

}