import ryw_NetConfig from "./NetConfig";
import ryw_User from "../User/User";
import ryw_AesTools from "./AesTools";
import ryw_AppConfig from "../AppConfig";

export class ryw_requestData
{
    public ryw_meth : string = "post";
    public readonly ryw_data : any;
    public ryw_url : string = "";
    public ryw_onSuccess : Function = null;
    public ryw_onFail : Function = null;

    constructor()
    {
        this.ryw_data = {};
    }
}

export default class ryw_HttpUnit 
{
    public static request(req : ryw_requestData) {
        if (req.ryw_url.indexOf("https://") > -1 ||
            req.ryw_url.indexOf("http://") > -1) {
            req.ryw_url = req.ryw_url;
        } else {
            req.ryw_url = ryw_NetConfig.ryw_serverUrl + req.ryw_url;
        }

        var completeFunc = (res) => {
            console.log(res,"http Success")
            if (req.ryw_onSuccess) {
                req.ryw_onSuccess(res);
            }
            req.ryw_onSuccess = null;
            req = null;
        };

        var errorFunc = (res) => {
            console.log(res,"http fail")
            if (req.ryw_onFail)  {
                req.ryw_onFail(res);
            }
            req.ryw_onFail = null;
            req = null;
        };

        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, ryw_HttpUnit, completeFunc);
        xhr.once(Laya.Event.ERROR, ryw_HttpUnit, errorFunc);
        let dataStr:string = JSON.stringify(req.ryw_data);

        if(Laya.Browser.onMiniGame || ryw_AppConfig.onTTMiniGame)
        {
            req.ryw_data.code = ryw_User.ryw_code;
        }
        else if(Laya.Browser.onQGMiniGame) //OPPO小游戏
        {
            req.ryw_data.oppotoken = ryw_User.ryw_code;
        }
        else if(Laya.Browser.onQQMiniGame) //qq小游戏
        {
            req.ryw_data.code = ryw_User.ryw_code;
        }
        else
        {
            req.ryw_data.code = ryw_User.ryw_code;
        }

        var time = "time=" + String(Date.now());
        var header = 
        [
            "Content-Type", "application/json",
            "state" , ryw_NetConfig.ryw_state,
            "gameid" ,ryw_NetConfig.ryw_gameid,
            "sign" ,ryw_AesTools.ryw_encrypt(time),
        ]
        if(ryw_User.ryw_token)
        {
            header.push("token");
            header.push(ryw_User.ryw_token);
        }

        xhr.send(req.ryw_url, JSON.stringify(req.ryw_data), req.ryw_meth, "json",header);
    }

    //todo:这里添加你们和服务器相互的接口

    public static ryw_login(onSuccess : Function,onFail : Function)
    {
        var req = new ryw_requestData();
        req.ryw_url = ryw_NetConfig.ryw_Login;
        req.ryw_onSuccess = onSuccess;
        req.ryw_onFail = onFail;
        ryw_HttpUnit.request(req);
    }
    
    public static ryw_saveGameData(gameData : any,onSuccess : Function,onFail : Function)
    {
        var req = new ryw_requestData();
        req.ryw_url = ryw_NetConfig.ryw_SaveGameData;
        req.ryw_data.gameData = gameData;
        req.ryw_onSuccess = onSuccess;
        req.ryw_onFail = onFail;
        ryw_HttpUnit.request(req);
    }
    
    public static ryw_getGameData(onSuccess : Function,onFail : Function)
    {
        var req = new ryw_requestData();
        req.ryw_url = ryw_NetConfig.ryw_GetUser;
        req.ryw_onSuccess = onSuccess;
        req.ryw_onFail = onFail;
        ryw_HttpUnit.request(req);
    }
    
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    public static ryw_GetIpBlock(onSuccess : Function,onFail : Function){
        if(-1 != ryw_NetConfig.ryw_gameid)
        {
            var req = new ryw_requestData();
            req.ryw_url = ryw_NetConfig.ryw_IpBlock;
            req.ryw_onSuccess = onSuccess;
            req.ryw_onFail = onFail;
            ryw_HttpUnit.request(req);
        }
    }

    public static ryw_reportExport(appid : string,game_name : string,onSuccess : Function,onFail : Function)
    {
        var req = new ryw_requestData();
        req.ryw_url = ryw_NetConfig.ryw_reportExport;
        req.ryw_data.wbappid = appid;
        req.ryw_data.game_name = game_name;
        req.ryw_onSuccess = onSuccess;
        req.ryw_onFail = onFail;
        ryw_HttpUnit.request(req);
    }

    public static ryw_reportImport(appid : string,channel : string,onSuccess : Function,onFail : Function)
    {
        var req = new ryw_requestData();
        req.ryw_url = ryw_NetConfig.ryw_reportImport;
        req.ryw_data.wbappid = appid;
        req.ryw_data.channel = channel;
        req.ryw_onSuccess = onSuccess;
        req.ryw_onFail = onFail;
        ryw_HttpUnit.request(req);
    }

    public static ryw_Getuserip(onSuccess : Function,onFail : Function)
    {
        var req = new ryw_requestData();
        req.ryw_url = ryw_NetConfig.ryw_getuserip;
        req.ryw_onSuccess = onSuccess;
        req.ryw_onFail = onFail;
        ryw_HttpUnit.request(req);
    }

    //签到
    public static SignIn(onSuccess : Function,onFail : Function)
    {
        var req = new ryw_requestData();
        req.ryw_url = ryw_NetConfig.ryw_signin;
        req.ryw_onSuccess = onSuccess;
        req.ryw_onFail = onFail;
        req.ryw_data.type = 1;
        ryw_HttpUnit.request(req);
    }

    //获取签到状态
    public static GetSignIn(onSuccess : Function,onFail : Function)
    {
        var req = new ryw_requestData();
        req.ryw_url = ryw_NetConfig.ryw_signin;
        req.ryw_onSuccess = onSuccess;
        req.ryw_onFail = onFail;
        req.ryw_data.type = 0;
        ryw_HttpUnit.request(req);
    }
}
