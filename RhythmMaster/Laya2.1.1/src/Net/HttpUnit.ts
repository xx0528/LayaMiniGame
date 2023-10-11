import Net_myqq_Config from "./NetConfig";
import User_yy from "../User/User";
import Aes_myqq_Tools from "./AesTools";

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

export default class Http_myqq_Unit 
{
    public static request(req : requestData) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        } else {
            req.url = Net_myqq_Config.serverUrl + req.url;
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
        xhr.once(Laya.Event.COMPLETE, Http_myqq_Unit, completeFunc);
        xhr.once(Laya.Event.ERROR, Http_myqq_Unit, errorFunc);
        let dataStr:string = JSON.stringify(req.data);

        req.data.code = User_yy.code;
        var time = "time=" + String(Date.now());
        var header = 
        [
            "Content-Type", "application/json",
            "state" , 0,
            "gameid" ,Net_myqq_Config.gameid,
            "sign" ,Aes_myqq_Tools.encrypt(time),
        ]
        if(User_yy.token)
        {
            header.push("token");
            header.push(User_yy.token);
        }

        xhr.send(req.url, JSON.stringify(req.data), req.meth, "json",header);
    }

    //todo:这里添加你们和服务器相互的接口

    public static login(onSuccess : Function,onFail : Function)
    {
        var req = new requestData();
        req.url = Net_myqq_Config.Login;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_myqq_Unit.request(req);
    }
    
    public static saveGameData(gameData : any,onSuccess : Function,onFail : Function)
    {
        var req = new requestData();
        req.url = Net_myqq_Config.SaveGameData;
        req.data.gameData = gameData;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_myqq_Unit.request(req);
    }
    
    public static getGameData(onSuccess : Function,onFail : Function)
    {
        var req = new requestData();
        req.url = Net_myqq_Config.GetUser;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_myqq_Unit.request(req);
    }
    
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    public static GetIpBlock(onSuccess : Function,onFail : Function){
        var req = new requestData();
        req.url = Net_myqq_Config.IpBlock;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_myqq_Unit.request(req);
    }
}
