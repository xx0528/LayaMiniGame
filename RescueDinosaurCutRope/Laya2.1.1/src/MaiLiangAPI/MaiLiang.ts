import { reques_JJKLBB_tData } from "../Net/HttpUnit";
import AppC_JJKLBB_onfig from "../AppConfig";
import WXAPI from "../WXAPI";
import Us_JJKLBB_er from "../User/User";

/**
 * 用于买量上报,以及停留时间上报的的类，本质上是对wx和买量接口做一个集成化的封装方便使用
 * 
 * @export
 * @class MaiLiang
 */
export default class Mai_JJKLBB_Liang {
    public static mai_JJKLBB_nUrl: string = "https://swtj.mrkzx.cn";
    public static ucl_JJKLBB_ick: string = "/v1.1/api/Activity/uclick.html";
    public static sta_JJKLBB_y: string = "/v1.1/api/Activity/stay.html";

    public static ke_JJKLBB_y: string = "";//推广路径中同名参数，需要调用方法WXAPi.getLaunchOptionsSync()，从返回的参数中获得。
    public static MaiLia_JJKLBB_ngOpenId: string = "";//买量系统唯一标识,执行GetMaiLiangOpenId()方法成功后自动获得。
    private static tim_JJKLBB_e: number = 0;//买量系统唯一标识后，记录当前时间（精确到秒）。

    /**
     * 发送数据的类
     * 
     * @protected
     * @static
     * @param {reques_JJKLBB_tData} req 
     * @memberof MaiLiang
     */
    protected static req_JJKLBB_uest(req: reques_JJKLBB_tData) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        } else {
            req.url = Mai_JJKLBB_Liang.mai_JJKLBB_nUrl + req.url;
        }
        var completeFunc = (res) => {
            console.log(res, "MaiLiang http Success")
            res = JSON.parse(res);
            if (res.Status == "200") {
                if (res.Result["OpenId"] != null && res.Result["OpenId"] != "") {
                    Mai_JJKLBB_Liang.MaiLia_JJKLBB_ngOpenId = res.Result["OpenId"];
                    Mai_JJKLBB_Liang.tim_JJKLBB_e = req.data.posttime;
                    console.log("获得买量系统OpenId " + Mai_JJKLBB_Liang.MaiLia_JJKLBB_ngOpenId);

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
        xhr.once(Laya.Event.COMPLETE, Mai_JJKLBB_Liang, completeFunc);
        xhr.once(Laya.Event.ERROR, Mai_JJKLBB_Liang, errorFunc);

        if (req.me_JJKLBB_th == "get") {
            var para = "";
            for (const key of Object.keys(req.data)) {
                var value = req.data[key];
                para += key + "=" + value + "&";
            }
            req.url = req.url + "?" + para;
            xhr.send(req.url, null, req.me_JJKLBB_th);
        }
        else {
            var para = "";
            for (const key of Object.keys(req.data)) {
                var value = req.data[key];
                para += key + "=" + value + "&";
            }
            xhr.send(req.url, para, req.me_JJKLBB_th, null, ["Content-Type", "application/x-www-form-urlencoded"]);
        }

    }
    /**
     * 获得买量系统唯一标识ID,此ID的作用是用来上报游戏时间
     * 
     * @param {Function} res 
     * @memberof MaiLiang
     */
    public static GetMaiL_JJKLBB_iangOp_JJKLBB_enId(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            let option = WXAPI.getLaunchOptionsSync();
            if (option != null) {
                let key = option.query["key"];
                if (key != null && key != "" && Us_JJKLBB_er.open_JJKLBB_Id != "") {
                    Mai_JJKLBB_Liang.ke_JJKLBB_y = key;
                    let req = new reques_JJKLBB_tData();
                    req.url = Mai_JJKLBB_Liang.ucl_JJKLBB_ick;
                    req.onSuccess = onSuccess;
                    req.onFail = onFail;
                    req.data.appid = AppC_JJKLBB_onfig.Ap_JJKLBB_pID;
                    req.data.openid = "";
                    let time = new Date().getTime() / 1000;
                    req.data.posttime = time;
                    req.data.auth = 0;
                    req.data.key = key;
                    req.data.wxopenid = Us_JJKLBB_er.open_JJKLBB_Id;
                    req.me_JJKLBB_th = "POST";
                    console.log("发送买量数据接口")
                    Mai_JJKLBB_Liang.req_JJKLBB_uest(req);
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
    public static Repo_JJKLBB_rtStayTim_JJKLBB_e(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            if (Mai_JJKLBB_Liang.MaiLia_JJKLBB_ngOpenId != "") {
                let req = new reques_JJKLBB_tData();
                req.url = Mai_JJKLBB_Liang.sta_JJKLBB_y;
                req.onSuccess = onSuccess;
                req.onFail = onFail;
                req.data.appid = AppC_JJKLBB_onfig.Ap_JJKLBB_pID;
                req.data.openid = Mai_JJKLBB_Liang.MaiLia_JJKLBB_ngOpenId;
                let time = new Date().getTime() / 1000;
                req.data.posttime = time;
                let staytime = Mai_JJKLBB_Liang.tim_JJKLBB_e != 0 ? time - Mai_JJKLBB_Liang.tim_JJKLBB_e : 0;
                req.data.time = staytime;
                req.me_JJKLBB_th = "POST";
                console.log("发送停留时间至买量接口")
                Mai_JJKLBB_Liang.req_JJKLBB_uest(req);
            }
        }
        else {
            console.log("不在微信模式下调用，默认发送停留时间至买量接口失败")
            onFail(null);
        }
    }

}