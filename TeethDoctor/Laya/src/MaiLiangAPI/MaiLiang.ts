import Http_XYXZS_Unit, { reques_XYXZS_tData } from "../Net/HttpUnit";
import App_XYXZS_Config from "../AppConfig";
import W_XYXZS_XAPI from "../WXAPI";
import Us_XYXZS_er from "../User/User";
import OPP_XYXZS_OAPI from "../OPPOAPI";

/**
 * 用于买量上报,以及停留时间上报的的类，本质上是对wx和买量接口做一个集成化的封装方便使用
 * 
 * @export
 * @class MaiLiang
 */
export default class Mai_XYXZS_Liang {
    public static ma_XYXZS_inUrl: string = "https://swtj.mrkzx.cn";
    public static ucl_XYXZS_ick: string = "/v1.1/api/Activity/uclick.html";
    public static st_XYXZS_ay: string = "/v1.1/api/Activity/stay.html";

    public static k_XYXZS_ey: string = "";//推广路径中同名参数，需要调用方法WXAPi.getLaunchOptionsSync()，从返回的参数中获得。
    public static MaiL_XYXZS_iangOpenId: string = "";//买量系统唯一标识,执行GetMaiLiangOpenId()方法成功后自动获得。
    private static t_XYXZS_ime: number = 0;//买量系统唯一标识后，记录当前时间（精确到秒）。

    /**
     * 发送数据的类
     * 
     * @protected
     * @static
     * @param {reques_XYXZS_tData} req 
     * @memberof MaiLiang
     */
    protected static re_XYXZS_quest(req: reques_XYXZS_tData) {
        if (req.u_XYXZS_rl.indexOf("https://") > -1 ||
            req.u_XYXZS_rl.indexOf("http://") > -1) {
            req.u_XYXZS_rl = req.u_XYXZS_rl;
        } else {
            req.u_XYXZS_rl = Mai_XYXZS_Liang.ma_XYXZS_inUrl + req.u_XYXZS_rl;
        }
        var completeFunc = (res) => {
            console.log(res, "MaiLiang http Success")
            res = JSON.parse(res);
            if (res.Status == "200") {
                if (res.Result["OpenId"] != null && res.Result["OpenId"] != "") {
                    Mai_XYXZS_Liang.MaiL_XYXZS_iangOpenId = res.Result["OpenId"];
                    Mai_XYXZS_Liang.t_XYXZS_ime = req.da_XYXZS_ta.posttime;
                    console.log("获得买量系统OpenId " + Mai_XYXZS_Liang.MaiL_XYXZS_iangOpenId);

                }
                else {
                    console.log("上报买量系统停留时间成功");
                }
                if (req.on_XYXZS_Success) {
                    req.on_XYXZS_Success(res);
                }
            }
            else {
                if (req.onF_XYXZS_ail) {
                    req.onF_XYXZS_ail(res);
                }
            }

            req.on_XYXZS_Success = null;
            req = null;
        };
        var errorFunc = (res) => {
            console.log(res, "MaiLiang http fail")
            if (req.onF_XYXZS_ail) {
                req.onF_XYXZS_ail(res);
            }
            req.onF_XYXZS_ail = null;
            req = null;
        };

        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, Mai_XYXZS_Liang, completeFunc);
        xhr.once(Laya.Event.ERROR, Mai_XYXZS_Liang, errorFunc);

        if (req.m_XYXZS_eth == "get") {
            var para = "";
            for (const key of Object.keys(req.da_XYXZS_ta)) {
                var value = req.da_XYXZS_ta[key];
                para += key + "=" + value + "&";
            }
            req.u_XYXZS_rl = req.u_XYXZS_rl + "?" + para;
            xhr.send(req.u_XYXZS_rl, null, req.m_XYXZS_eth);
        }
        else {
            var para = "";
            for (const key of Object.keys(req.da_XYXZS_ta)) {
                var value = req.da_XYXZS_ta[key];
                para += key + "=" + value + "&";
            }
            xhr.send(req.u_XYXZS_rl, para, req.m_XYXZS_eth, null, ["Content-Type", "application/x-www-form-urlencoded"]);
        }

    }
    /**
     * 获得买量系统唯一标识ID,此ID的作用是用来上报游戏时间
     * 
     * @param {Function} res 
     * @memberof MaiLiang
     */
    public static GetMai_XYXZS_LiangOpenId(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            let option = W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync();
            if (option != null) {
                let key = option.query["key"];
                if (key != null && key != "" && Us_XYXZS_er.o_XYXZS_penId != "") {
                    Mai_XYXZS_Liang.k_XYXZS_ey = key;
                    let req = new reques_XYXZS_tData();
                    req.u_XYXZS_rl = Mai_XYXZS_Liang.ucl_XYXZS_ick;
                    req.on_XYXZS_Success = onSuccess;
                    req.onF_XYXZS_ail = onFail;
                    req.da_XYXZS_ta.appid = App_XYXZS_Config.Ap_XYXZS_pID;
                    req.da_XYXZS_ta.openid = "";
                    let time = new Date().getTime() / 1000;
                    req.da_XYXZS_ta.posttime = time;
                    req.da_XYXZS_ta.auth = 0;
                    req.da_XYXZS_ta.key = key;
                    req.da_XYXZS_ta.wxopenid = Us_XYXZS_er.o_XYXZS_penId;
                    req.m_XYXZS_eth = "POST";
                    console.log("发送买量数据接口")
                    Mai_XYXZS_Liang.re_XYXZS_quest(req);
                }
            }
            else {
                console.log("上报买量数据失败")
                onFail(null);
            }
        }
        else if(Laya.Browser.onQGMiniGame)
        {
            let option = OPP_XYXZS_OAPI.getLaunch_XYXZS_OptionsSync();
            Http_XYXZS_Unit.reportI_XYXZS_mport(option.referrerInfo.package,option.referrerInfo.extraData.appid,(result)=>
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
    public static ReportS_XYXZS_tayTime(onSuccess: Function, onFail: Function) {
        if (Laya.Browser.onMiniGame) {
            if (Mai_XYXZS_Liang.MaiL_XYXZS_iangOpenId != "") {
                let req = new reques_XYXZS_tData();
                req.u_XYXZS_rl = Mai_XYXZS_Liang.st_XYXZS_ay;
                req.on_XYXZS_Success = onSuccess;
                req.onF_XYXZS_ail = onFail;
                req.da_XYXZS_ta.appid = App_XYXZS_Config.Ap_XYXZS_pID;
                req.da_XYXZS_ta.openid = Mai_XYXZS_Liang.MaiL_XYXZS_iangOpenId;
                let time = new Date().getTime() / 1000;
                req.da_XYXZS_ta.posttime = time;
                let staytime = Mai_XYXZS_Liang.t_XYXZS_ime != 0 ? time - Mai_XYXZS_Liang.t_XYXZS_ime : 0;
                req.da_XYXZS_ta.time = staytime;
                req.m_XYXZS_eth = "POST";
                console.log("发送停留时间至买量接口")
                Mai_XYXZS_Liang.re_XYXZS_quest(req);
            }
        }
        else {
            console.log("不在微信模式下调用，默认发送停留时间至买量接口失败")
            onFail(null);
        }
    }

}