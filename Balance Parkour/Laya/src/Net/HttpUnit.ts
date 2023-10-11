import Net_tippy_Config from "./NetConfig";
import Us_tippy_er from "../User/User";
import Aes_tippy_Tools from "./AesTools";
import AppConfig from "../AppConfig";

export class request_tippy_Data {
    public meth: string = "post";
    public readonly data: any;
    public url: string = "";
    public onSuccess: Function = null;
    public onFail: Function = null;

    constructor()  {
        this.data = {};
    }
}

export default class Http_tippy_Unit {
    public static re_tippy_quest(req: request_tippy_Data) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        } else {
            req.url = Net_tippy_Config.server_tippy_Url + req.url;
        }

        var completeFunc = (res) => {
            console.log(res, "http Success")
            if (req.onSuccess) {
                req.onSuccess(res);
            }
            req.onSuccess = null;
            req = null;
        };

        var errorFunc = (res) => {
            console.log(res, "http fail")
            if (req.onFail) {
                req.onFail(res);
            }
            req.onFail = null;
            req = null;
        };

        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, Http_tippy_Unit, completeFunc);
        xhr.once(Laya.Event.ERROR, Http_tippy_Unit, errorFunc);
        let dataStr: string = JSON.stringify(req.data);

        if (Laya.Browser.onMiniGame || AppConfig.onTTMiniGame)  {
            req.data.code = Us_tippy_er.co_tippy_de;
        }
        else if (Laya.Browser.onQGMiniGame) //OPPO小游戏
        {
            req.data.code = Us_tippy_er.co_tippy_de;
        }
        else if (Laya.Browser.onQQMiniGame) //qq小游戏
        {
            req.data.code = Us_tippy_er.co_tippy_de;
        }
        else  {
            req.data.code = Us_tippy_er.co_tippy_de;
        }

        var time = "time=" + String(Date.now());
        var header =
            [
                "Content-Type", "application/json",
                "state", Net_tippy_Config.st_tippy_ate,
                "gameid", Net_tippy_Config.game_tippy_id,
                "sign", Aes_tippy_Tools._tippy_encrypt(time),
            ]
        if (Us_tippy_er.tok_tippy_en)  {
            header.push("token");
            header.push(Us_tippy_er.tok_tippy_en);
        }

        xhr.send(req.url, JSON.stringify(req.data), req.meth, "json", header);
    }

    //todo:这里添加你们和服务器相互的接口

    public static lo_tippy_gin(onSuccess: Function, onFail: Function)  {
        var req = new request_tippy_Data();
        req.url = Net_tippy_Config.Lo_tippy_gin;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_tippy_Unit.re_tippy_quest(req);
    }

    public static saveGame_tippy_Data(gameData: any, onSuccess: Function, onFail: Function)  {
        var req = new request_tippy_Data();
        req.url = Net_tippy_Config.Save_tippy_GameData;
        req.data.gameData = gameData;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_tippy_Unit.re_tippy_quest(req);
    }

    public static get_tippy_GameData(onSuccess: Function, onFail: Function)  {
        var req = new request_tippy_Data();
        req.url = Net_tippy_Config.Get_tippy_User;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_tippy_Unit.re_tippy_quest(req);
    }

    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    public static GetIp_tippy_Block(onSuccess: Function, onFail: Function) {
        if (-1 != Net_tippy_Config.game_tippy_id) {
            var req = new request_tippy_Data();
            req.url = Net_tippy_Config.Ip_tippy_Block;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            Http_tippy_Unit.re_tippy_quest(req);
        }
    }
}
