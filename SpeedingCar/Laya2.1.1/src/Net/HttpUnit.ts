import Net_wcjtn_Config from "./NetConfig";
import User_wcjtn_ from "../User/User";
import Aes_wcjtn_Tools from "./AesTools";
import App_wcjtn_Config from "../AppConfig";

export class request_wcjtn_Data
{
    public meth_wcjtn_ : string = "post";
    public readonly _wcjtn_data_wcjtn_ : any;
    public url_wcjtn_ : string = "";
    public on_wcjtn_Success : Function = null;
    public on_wcjtn_Fail : Function = null;

    constructor()
    {
        this._wcjtn_data_wcjtn_ = {};
    }
}

export default class Http_wcjtn_Unit 
{
    public static request_wcjtn_(req : request_wcjtn_Data) {
        if (req.url_wcjtn_.indexOf("https://") > -1 ||
            req.url_wcjtn_.indexOf("http://") > -1) {
            req.url_wcjtn_ = req.url_wcjtn_;
        } else {
            req.url_wcjtn_ = Net_wcjtn_Config.server_wcjtn_Url + req.url_wcjtn_;
        }

        var completeFunc = (res) => {
            console.log(res,"http Success")
            if (req.on_wcjtn_Success) {
                req.on_wcjtn_Success(res);
            }
            req.on_wcjtn_Success = null;
            req = null;
        };

        var errorFunc = (res) => {
            console.log(res,"http fail")
            if (req.on_wcjtn_Fail)  {
                req.on_wcjtn_Fail(res);
            }
            req.on_wcjtn_Fail = null;
            req = null;
        };

        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, Http_wcjtn_Unit, completeFunc);
        xhr.once(Laya.Event.ERROR, Http_wcjtn_Unit, errorFunc);
        let dataStr:string = JSON.stringify(req._wcjtn_data_wcjtn_);

        if(Laya.Browser.onMiniGame || App_wcjtn_Config.onTTMiniGame)
        {
            req._wcjtn_data_wcjtn_.code = User_wcjtn_.code_wcjtn_;
        }
        else if(Laya.Browser.onQGMiniGame) //OPPO小游戏
        {
            req._wcjtn_data_wcjtn_.oppotoken = User_wcjtn_.code_wcjtn_;
        }
        else if(Laya.Browser.onQQMiniGame) //qq小游戏
        {
            req._wcjtn_data_wcjtn_.code = User_wcjtn_.code_wcjtn_;
        }
        else
        {
            req._wcjtn_data_wcjtn_.code = User_wcjtn_.code_wcjtn_;
        }

        var time = "time=" + String(Date.now());
        var header = 
        [
            "Content-Type", "application/json",
            "state" , Net_wcjtn_Config.state_wcjtn_,
            "gameid" ,Net_wcjtn_Config.game_wcjtn_id,
            "sign" ,Aes_wcjtn_Tools.en_wcjtn_crypt(time),
        ]
        if(User_wcjtn_._wcjtn_token)
        {
            header.push("token");
            header.push(User_wcjtn_._wcjtn_token);
        }

        xhr.send(req.url_wcjtn_, JSON.stringify(req._wcjtn_data_wcjtn_), req.meth_wcjtn_, "json",header);
    }

    //todo:这里添加你们和服务器相互的接口

    public static login_wcjtn_(onSuccess : Function,onFail : Function)
    {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = Net_wcjtn_Config.Login_wcjtn_;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        Http_wcjtn_Unit.request_wcjtn_(req);
    }
    
    public static save_wcjtn_Game_wcjtn_Data(gameData : any,onSuccess : Function,onFail : Function)
    {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = Net_wcjtn_Config.Save_wcjtn_Game_wcjtn_Data;
        req._wcjtn_data_wcjtn_.gameData = gameData;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        Http_wcjtn_Unit.request_wcjtn_(req);
    }
    
    public static get_wcjtn_Game_wcjtn_Data(onSuccess : Function,onFail : Function)
    {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = Net_wcjtn_Config.Get_wcjtn_User;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        Http_wcjtn_Unit.request_wcjtn_(req);
    }
    
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    public static Get_wcjtn_Ip_wcjtn_Block(onSuccess : Function,onFail : Function){
        if(-1 != Net_wcjtn_Config.game_wcjtn_id)
        {
            var req = new request_wcjtn_Data();
            req.url_wcjtn_ = Net_wcjtn_Config.Ip_wcjtn_Block;
            req.on_wcjtn_Success = onSuccess;
            req.on_wcjtn_Fail = onFail;
            Http_wcjtn_Unit.request_wcjtn_(req);
        }
    }

    public static report_wcjtn_Export(appid : string,game_name : string,onSuccess : Function,onFail : Function)
    {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = Net_wcjtn_Config.report_wcjtn_Export;
        req._wcjtn_data_wcjtn_.wbappid = appid;
        req._wcjtn_data_wcjtn_.game_name = game_name;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        Http_wcjtn_Unit.request_wcjtn_(req);
    }

    public static report_wcjtn_Import(appid : string,channel : string,onSuccess : Function,onFail : Function)
    {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = Net_wcjtn_Config.report_wcjtn_Import;
        req._wcjtn_data_wcjtn_.wbappid = appid;
        req._wcjtn_data_wcjtn_.channel = channel;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        Http_wcjtn_Unit.request_wcjtn_(req);
    }

    public static Get_wcjtn_user_wcjtn_ip(onSuccess : Function,onFail : Function)
    {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = Net_wcjtn_Config.get_wcjtn_user_wcjtn_ip;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        Http_wcjtn_Unit.request_wcjtn_(req);
    }

    //签到
    public static SignIn(onSuccess : Function,onFail : Function)
    {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = Net_wcjtn_Config.signin;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        req._wcjtn_data_wcjtn_.type = 1;
        Http_wcjtn_Unit.request_wcjtn_(req);
    }

    //获取签到状态
    public static GetSignIn(onSuccess : Function,onFail : Function)
    {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = Net_wcjtn_Config.signin;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        req._wcjtn_data_wcjtn_.type = 0;
        Http_wcjtn_Unit.request_wcjtn_(req);
    }
}
