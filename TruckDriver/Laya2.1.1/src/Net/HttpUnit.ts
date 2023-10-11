import Net_ppxhc_Config from "./NetConfig";
import User_ppxhc from "../User/User";
import AesTools_ from "./AesTools";
import App_ppxhc_Config from "../AppConfig";

export class request_ppxhc_Data
{
    public meth : string = "post";
    public readonly data : any;
    public url : string = "";
    public onSuccess : Function = null;
    public onFail : Function = null;

    constructor()
    {
        this.data = {};
    }
}

export default class Http_ppxhc_Unit 
{
    public static request(req : request_ppxhc_Data) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        } else {
            req.url = Net_ppxhc_Config.serverUrl + req.url;
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
        xhr.once(Laya.Event.COMPLETE, Http_ppxhc_Unit, completeFunc);
        xhr.once(Laya.Event.ERROR, Http_ppxhc_Unit, errorFunc);
        let dataStr:string = JSON.stringify(req.data);

        if(Laya.Browser.onMiniGame || App_ppxhc_Config.onTTMiniGame_ppxhc_)
        {
            req.data.code = User_ppxhc.code;
        }
        else if(Laya.Browser.onQGMiniGame) //OPPO小游戏
        {
            req.data.oppotoken = User_ppxhc.code;
        }
        else if(Laya.Browser.onQQMiniGame) //qq小游戏
        {
            req.data.code = User_ppxhc.code;
        }
        else
        {
            req.data.code = User_ppxhc.code;
        }

        var time = "time=" + String(Date.now());
        var header = 
        [
            "Content-Type", "application/json",
            "state" , Net_ppxhc_Config.state,
            "gameid" ,Net_ppxhc_Config.gameid,
            "sign" ,AesTools_.encrypt_(time),
        ]
        if(User_ppxhc.token)
        {
            header.push("token");
            header.push(User_ppxhc.token);
        }

        xhr.send(req.url, JSON.stringify(req.data), req.meth, "json",header);
    }

    //todo:这里添加你们和服务器相互的接口

    public static login(onSuccess : Function,onFail : Function)
    {
        var req = new request_ppxhc_Data();
        req.url = Net_ppxhc_Config.Login;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_ppxhc_Unit.request(req);
    }
    
    public static saveGameData(gameData : any,onSuccess : Function,onFail : Function)
    {
        var req = new request_ppxhc_Data();
        req.url = Net_ppxhc_Config.SaveGameData;
        req.data.gameData = gameData;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_ppxhc_Unit.request(req);
    }
    
    public static getGameData(onSuccess : Function,onFail : Function)
    {
        var req = new request_ppxhc_Data();
        req.url = Net_ppxhc_Config.GetUser;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_ppxhc_Unit.request(req);
    }
    
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    public static GetIpBlock(onSuccess : Function,onFail : Function){
        if(-1 != Net_ppxhc_Config.gameid)
        {
            var req = new request_ppxhc_Data();
            req.url = Net_ppxhc_Config.IpBlock;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            Http_ppxhc_Unit.request(req);
        }
    }

    public static reportExport(appid : string,game_name : string,onSuccess : Function,onFail : Function)
    {
        var req = new request_ppxhc_Data();
        req.url = Net_ppxhc_Config.reportExport;
        req.data.wbappid = appid;
        req.data.game_name = game_name;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_ppxhc_Unit.request(req);
    }

    public static reportImport(appid : string,channel : string,onSuccess : Function,onFail : Function)
    {
        var req = new request_ppxhc_Data();
        req.url = Net_ppxhc_Config.reportImport;
        req.data.wbappid = appid;
        req.data.channel = channel;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_ppxhc_Unit.request(req);
    }

    public static Getuserip(onSuccess : Function,onFail : Function)
    {
        var req = new request_ppxhc_Data();
        req.url = Net_ppxhc_Config.getuserip;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_ppxhc_Unit.request(req);
    }

    //签到
    public static SignIn(onSuccess : Function,onFail : Function)
    {
        var req = new request_ppxhc_Data();
        req.url = Net_ppxhc_Config.signin;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        req.data.type = 1;
        Http_ppxhc_Unit.request(req);
    }

    //获取签到状态
    public static GetSignIn(onSuccess : Function,onFail : Function)
    {
        var req = new request_ppxhc_Data();
        req.url = Net_ppxhc_Config.signin;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        req.data.type = 0;
        Http_ppxhc_Unit.request(req);
    }
}
