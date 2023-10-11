import NetC_XYXZS_onfig from "./NetConfig";
import Us_XYXZS_er from "../User/User";
import Aes_XYXZS_Tools from "./AesTools";
import App_XYXZS_Config from "../AppConfig";

export class reques_XYXZS_tData
{
    public m_XYXZS_eth : string = "post";
    public readonly da_XYXZS_ta : any;
    public u_XYXZS_rl : string = "";
    public on_XYXZS_Success : Function = null;
    public onF_XYXZS_ail : Function = null;

    constructor()
    {
        this.da_XYXZS_ta = {};
    }
}

export default class Http_XYXZS_Unit 
{
    public static req_XYXZS_uest(req : reques_XYXZS_tData) {
        if (req.u_XYXZS_rl.indexOf("https://") > -1 ||
            req.u_XYXZS_rl.indexOf("http://") > -1) {
            req.u_XYXZS_rl = req.u_XYXZS_rl;
        } else {
            req.u_XYXZS_rl = NetC_XYXZS_onfig.ser_XYXZS_verUrl + req.u_XYXZS_rl;
        }

        var completeFunc = (res) => {
            console.log(res,"http Success")
            if (req.on_XYXZS_Success) {
                req.on_XYXZS_Success(res);
            }
            req.on_XYXZS_Success = null;
            req = null;
        };

        var errorFunc = (res) => {
            console.log(res,"http fail")
            if (req.onF_XYXZS_ail)  {
                req.onF_XYXZS_ail(res);
            }
            req.onF_XYXZS_ail = null;
            req = null;
        };

        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, Http_XYXZS_Unit, completeFunc);
        xhr.once(Laya.Event.ERROR, Http_XYXZS_Unit, errorFunc);
        let dataStr:string = JSON.stringify(req.da_XYXZS_ta);

        if(Laya.Browser.onMiniGame || App_XYXZS_Config.onTTMi_XYXZS_niGame)
        {
            req.da_XYXZS_ta.code = Us_XYXZS_er.c_XYXZS_ode;
        }
        else if(Laya.Browser.onQGMiniGame) //OPPO小游戏
        {
            req.da_XYXZS_ta.oppotoken = Us_XYXZS_er.c_XYXZS_ode;
        }
        else if(Laya.Browser.onQQMiniGame) //qq小游戏
        {
            req.da_XYXZS_ta.code = Us_XYXZS_er.c_XYXZS_ode;
        }
        else
        {
            req.da_XYXZS_ta.code = Us_XYXZS_er.c_XYXZS_ode;
        }

        var time = "time=" + String(Date.now());
        var header = 
        [
            "Content-Type", "application/json",
            "state" , NetC_XYXZS_onfig.st_XYXZS_ate,
            "gameid" ,NetC_XYXZS_onfig.gam_XYXZS_eid,
            "sign" ,Aes_XYXZS_Tools.en_XYXZS_crypt(time),
        ]
        if(Us_XYXZS_er.to_XYXZS_ken)
        {
            header.push("token");
            header.push(Us_XYXZS_er.to_XYXZS_ken);
        }

        xhr.send(req.u_XYXZS_rl, JSON.stringify(req.da_XYXZS_ta), req.m_XYXZS_eth, "json",header);
    }

    //todo:这里添加你们和服务器相互的接口

    public static log_XYXZS_in(onSuccess : Function,onFail : Function)
    {
        var req = new reques_XYXZS_tData();
        req.u_XYXZS_rl = NetC_XYXZS_onfig.Lo_XYXZS_gin;
        req.on_XYXZS_Success = onSuccess;
        req.onF_XYXZS_ail = onFail;
        Http_XYXZS_Unit.req_XYXZS_uest(req);
    }
    
    public static saveGa_XYXZS_meData(gameData : any,onSuccess : Function,onFail : Function)
    {
        var req = new reques_XYXZS_tData();
        req.u_XYXZS_rl = NetC_XYXZS_onfig.Sa_XYXZS_veGameData;
        req.da_XYXZS_ta.gameData = gameData;
        req.on_XYXZS_Success = onSuccess;
        req.onF_XYXZS_ail = onFail;
        Http_XYXZS_Unit.req_XYXZS_uest(req);
    }
    
    public static getGa_XYXZS_meData(onSuccess : Function,onFail : Function)
    {
        var req = new reques_XYXZS_tData();
        req.u_XYXZS_rl = NetC_XYXZS_onfig.Ge_XYXZS_tUser;
        req.on_XYXZS_Success = onSuccess;
        req.onF_XYXZS_ail = onFail;
        Http_XYXZS_Unit.req_XYXZS_uest(req);
    }
    
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    public static GetI_XYXZS_pBlock(onSuccess : Function,onFail : Function){
        if(-1 != NetC_XYXZS_onfig.gam_XYXZS_eid)
        {
            var req = new reques_XYXZS_tData();
            req.u_XYXZS_rl = NetC_XYXZS_onfig.Ip_XYXZS_Block;
            req.on_XYXZS_Success = onSuccess;
            req.onF_XYXZS_ail = onFail;
            Http_XYXZS_Unit.req_XYXZS_uest(req);
        }
    }

    public static repo_XYXZS_rtExport(appid : string,game_name : string,onSuccess : Function,onFail : Function)
    {
        var req = new reques_XYXZS_tData();
        req.u_XYXZS_rl = NetC_XYXZS_onfig.repo_XYXZS_rtExport;
        req.da_XYXZS_ta.wbappid = appid;
        req.da_XYXZS_ta.game_name = game_name;
        req.on_XYXZS_Success = onSuccess;
        req.onF_XYXZS_ail = onFail;
        Http_XYXZS_Unit.req_XYXZS_uest(req);
    }

    public static reportI_XYXZS_mport(appid : string,channel : string,onSuccess : Function,onFail : Function)
    {
        var req = new reques_XYXZS_tData();
        req.u_XYXZS_rl = NetC_XYXZS_onfig.repo_XYXZS_rtImport;
        req.da_XYXZS_ta.wbappid = appid;
        req.da_XYXZS_ta.channel = channel;
        req.on_XYXZS_Success = onSuccess;
        req.onF_XYXZS_ail = onFail;
        Http_XYXZS_Unit.req_XYXZS_uest(req);
    }

    public static Getu_XYXZS_serip(onSuccess : Function,onFail : Function)
    {
        var req = new reques_XYXZS_tData();
        req.u_XYXZS_rl = NetC_XYXZS_onfig.getu_XYXZS_serip;
        req.on_XYXZS_Success = onSuccess;
        req.onF_XYXZS_ail = onFail;
        Http_XYXZS_Unit.req_XYXZS_uest(req);
    }
}
