import NetCo_JJKLBB_nfig from "./NetConfig";
import Us_JJKLBB_er from "../User/User";
import AesTools from "./AesTools";

export class reques_JJKLBB_tData
{
    public me_JJKLBB_th : string = "post";
    public readonly data : any;
    public url : string = "";
    public onSuccess : Function = null;
    public onFail : Function = null;

    constructor()
    {
        this.data = {};
    }
}

export default class Http_JJKLBB_Unit 
{
    public static requ_JJKLBB_est(req : reques_JJKLBB_tData) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        } else {
            req.url = NetCo_JJKLBB_nfig.serve_JJKLBB_rUrl + req.url;
        }

        var completeFunc = (res) => {
            console.log(res,"http Success")
            if (req.onSuccess) {
                req.onSuccess(res);
            }
            req.onSuccess = null;
            req = null;
        };

        var errorFunc = (res) => {
            console.log(res,"http fail")
            if (req.onFail)  {
                req.onFail(res);
            }
            req.onFail = null;
            req = null;
        };

        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, Http_JJKLBB_Unit, completeFunc);
        xhr.once(Laya.Event.ERROR, Http_JJKLBB_Unit, errorFunc);
        let dataStr:string = JSON.stringify(req.data);

        if(Laya.Browser.onMiniGame)
        {
            req.data.code = Us_JJKLBB_er.co_JJKLBB_de;
        }
        else if(Laya.Browser.onQGMiniGame)
        {
            req.data.oppotoken = Us_JJKLBB_er.co_JJKLBB_de;
        }
        else if(Laya.Browser.onQQMiniGame) //qq小游戏
        {
            req.data.code = Us_JJKLBB_er.co_JJKLBB_de;
        }

        var time = "time=" + String(Date.now());
        var header = 
        [
            "Content-Type", "application/json",
            "state" , NetCo_JJKLBB_nfig.sta_JJKLBB_te,
            "gameid" ,NetCo_JJKLBB_nfig.gam_JJKLBB_eid,
            "sign" ,AesTools.encrypt(time),
        ]
        if(Us_JJKLBB_er.tok_JJKLBB_en)
        {
            header.push("token");
            header.push(Us_JJKLBB_er.tok_JJKLBB_en);
        }

        xhr.send(req.url, JSON.stringify(req.data), req.me_JJKLBB_th, "json",header);
    }

    //todo:这里添加你们和服务器相互的接口

    public static log_JJKLBB_in(onSuccess : Function,onFail : Function)
    {
        var req = new reques_JJKLBB_tData();
        req.url = NetCo_JJKLBB_nfig.Logi_JJKLBB_n;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_JJKLBB_Unit.requ_JJKLBB_est(req);
    }
    
    public static saveGa_JJKLBB_meData(gameData : any,onSuccess : Function,onFail : Function)
    {
        var req = new reques_JJKLBB_tData();
        req.url = NetCo_JJKLBB_nfig.SaveG_JJKLBB_ameData;
        req.data.gameData = gameData;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_JJKLBB_Unit.requ_JJKLBB_est(req);
    }
    
    public static getGam_JJKLBB_eData(onSuccess : Function,onFail : Function)
    {
        var req = new reques_JJKLBB_tData();
        req.url = NetCo_JJKLBB_nfig.GetU_JJKLBB_ser;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_JJKLBB_Unit.requ_JJKLBB_est(req);
    }
    
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    public static GetIp_JJKLBB_Block(onSuccess : Function,onFail : Function){
        var req = new reques_JJKLBB_tData();
        req.url = NetCo_JJKLBB_nfig.IpBl_JJKLBB_ock;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_JJKLBB_Unit.requ_JJKLBB_est(req);
    }
}
