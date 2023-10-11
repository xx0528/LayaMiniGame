import NetConfig from "./NetConfig";
import Us_sdlyg_er from "../User/User";
import AesTools from "./AesTools";
import App_sdlyg_Config from "../AppConfig";

export class requestData
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

export default class HttpUnit 
{
    public static request(req : requestData) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        } else {
            req.url = NetConfig.serverUrl + req.url;
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
        xhr.once(Laya.Event.COMPLETE, this, completeFunc);
        xhr.once(Laya.Event.ERROR, this, errorFunc);
        let dataStr:string = JSON.stringify(req.data);

        if(Laya.Browser.onMiniGame || App_sdlyg_Config.onTTMiniGame)
        {
            req.data.code = Us_sdlyg_er.code;
        }
        else if(Laya.Browser.onQGMiniGame) //OPPO小游戏
        {
            req.data.oppotoken = Us_sdlyg_er.code;
        }
        else if(Laya.Browser.onQQMiniGame) //qq小游戏
        {
            req.data.code = Us_sdlyg_er.code;
        }
        else
        {
            req.data.code = Us_sdlyg_er.code;
        }

        var time = "time=" + String(Date.now());
        var header = 
        [
            "Content-Type", "application/json",
            "state" , NetConfig.state,
            "gameid" ,NetConfig.gameid,
            "sign" ,AesTools.encrypt(time),
        ]
        if(Us_sdlyg_er.token)
        {
            header.push("token");
            header.push(Us_sdlyg_er.token);
        }

        xhr.send(req.url, JSON.stringify(req.data), req.meth, "json",header);
    }

    //todo:这里添加你们和服务器相互的接口

    public static login(onSuccess : Function,onFail : Function)
    {
        var req = new requestData();
        req.url = NetConfig.Login;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit.request(req);
    }
    
    public static saveGameData(gameData : any,onSuccess : Function,onFail : Function)
    {
        var req = new requestData();
        req.url = NetConfig.SaveGameData;
        req.data.gameData = gameData;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit.request(req);
    }
    
    public static getGameData(onSuccess : Function,onFail : Function)
    {
        var req = new requestData();
        req.url = NetConfig.GetUser;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit.request(req);
    }
    
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    public static GetIpBlock(onSuccess : Function,onFail : Function){
        if(-1 != NetConfig.gameid)
        {
            var req = new requestData();
            req.url = NetConfig.IpBlock;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            HttpUnit.request(req);
        }
    }

    public static reportExport(appid : string,game_name : string,onSuccess : Function,onFail : Function)
    {
        var req = new requestData();
        req.url = NetConfig.reportExport;
        req.data.wbappid = appid;
        req.data.game_name = game_name;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit.request(req);
    }

    public static reportImport(appid : string,channel : string,onSuccess : Function,onFail : Function)
    {
        var req = new requestData();
        req.url = NetConfig.reportImport;
        req.data.wbappid = appid;
        req.data.channel = channel;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit.request(req);
    }
}
