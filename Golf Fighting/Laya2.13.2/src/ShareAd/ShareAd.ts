import { requestData } from "../Net/HttpUnit";
import App_sdlyg_Config from "../AppConfig";
import Us_sdlyg_er from "../User/User";
import Utilit from "../Utilit";
import ALD from "../ALD";
import WXAPI from "../WXAPI";
import Event_sdlyg_Mgr from "../Event/EventMgr";
import { Event_sdlyg_Def } from "../Event/EventDef";
import AppSwitchConfig from "../Config/AppSwitchConfig";




export default class Share_sdlyg_Ad 
{
    public static readonly mainUrl = "https://swwww.mrkzx.cn";
    public static readonly getAdPostion = "/v1.1/api/getAdPosition.html";//获取广告位列表
    public static readonly getAdv = "/v1.1/api/getAdv.html";//获取第三方广告列表
    public static readonly userClick = "/v1.1/api/userclick.html";//用户点击上报

    public static readonly LoopAdLocationID = 204;
    public static readonly BannerAdLocationID = 206;
    public static readonly InsertAdLocationID = 205;      //更多好玩
    public static readonly AniAdLocationID = 207;
    
    public static UseRandomAdPos : boolean = true;
    public static readonly AdLocationids : Array<number> = 
    [
        204,205
    ]

    protected static _adPosition : any = {}
    protected static _adv : any = {}

    public static _iphoneIgnoreAppIds = 
    [
        "wx2d2acce3c45f4ddf",
        "wxeb93c1298ec7c62b",
        "wx9540f9021d5f809d",
        "wxe372a630ec9ebe44",
        "wx887a573910b69793",
        "wxd21a086ce755a4b7",
        "wx8e142a9ae9318118",
    ]

    public static refreshAd(complate : Function)
    {
        Share_sdlyg_Ad.getAdPosData((res)=>{
            if(1 == res.code)
            {
                console.log("获取分享广告数据成功");
                Share_sdlyg_Ad._adPosition = res.result;
                if(complate)
                {
                    complate(true)
                }
            }
            else
            {
                console.log("获取分享广告数据失败 ： " + res.msg);
                if(complate)
                {
                    complate(false)
                }
            }
        },(res)=>{
            console.log("获取分享广告数据失败");
            if(complate)
            {
                complate(false)
            }
        })
    }

    public static getADVs(locationid,complate : Function,useRandom? : boolean,useLocalRandom? : boolean)
    {
        if(!Share_sdlyg_Ad.isNeedShowAd())
        {
            complate(null);
            return;
        }
        useRandom = null == useRandom ? Share_sdlyg_Ad.UseRandomAdPos : useRandom;
        useLocalRandom =  null == useLocalRandom ? true : useRandom;
        if(useRandom)
        {
            locationid = Share_sdlyg_Ad.getRandomADPosID();
        }
        var datas = Share_sdlyg_Ad._adv[locationid];
        if(datas)
        {
            for (var i = datas.length - 1; i >= 0; --i)  
            {
                var randomIndex = Math.floor(Math.random() * datas.length);
                var curValue = datas[i];
                var randomValue = datas[randomIndex];
                datas[randomIndex] = curValue;
                datas[i] = randomValue;
            }
            complate(datas)
        }
        else
        {
            var self = this;
            Share_sdlyg_Ad.getADVData(locationid,(res)=>
            {
                if(1 == res.code)
                {
                    Share_sdlyg_Ad._adv[locationid] = res.result;
                    datas = Share_sdlyg_Ad._adv[locationid];
                    if(datas && Utilit.isIphone())
                    {
                        for(var i=0;i< datas.length;++i)
                        {
                            var data = datas[i];
                            for(var j=0;j < Share_sdlyg_Ad._iphoneIgnoreAppIds.length;++j)
                            {
                                if(data.appid == Share_sdlyg_Ad._iphoneIgnoreAppIds[j])
                                {
                                    datas.splice(i,1);
                                    --i;
                                    break;
                                }
                            }
                        }
                    }
                    if(datas && useLocalRandom)
                    {
                        datas = self.sortDatas(datas);
                    }
                    if(complate)
                    {
                        complate(datas);
                    }
                }
                else
                {
                    if(complate)
                    {
                        complate(null);
                    }
                }
            },(res)=>
            {
                if(complate)
                {
                    complate(null);
                }
            })
        }
    }

    public static reportUserClick(advid)
    {
        Share_sdlyg_Ad.reqUserClick(advid,(res)=>
        {
            if(1 == res.code)
            {
                console.log("点击广告上报成功");
            }
            else
            {
                console.log("点击广告上报失败");
            }
        },(res)=>
        {
            console.log("点击广告上报失败");
        });
    }

    public static getRandomADPosID() : number
    {
        return Share_sdlyg_Ad.AdLocationids[Math.floor(Math.random() * Share_sdlyg_Ad.AdLocationids.length)]
    }

    protected static request(req : requestData) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        } else {
            req.url = Share_sdlyg_Ad.mainUrl + req.url;
        }
        var completeFunc = (res) => {
            console.log(res,"http Success")
            res = JSON.parse(res);
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
        xhr.once(Laya.Event.COMPLETE, Share_sdlyg_Ad, completeFunc);
        xhr.once(Laya.Event.ERROR, Share_sdlyg_Ad, errorFunc);


        if(req.meth == "get")
        {
            var para = "";
            for(const key of Object.keys(req.data)) 
            {
                var value = req.data[key];
                para +=  key + "=" + value + "&";
            }
            req.url = req.url + "?" + para;
            var header =
                [
                    "versions", App_sdlyg_Config.Versions,
                ]
            xhr.send(req.url,null,req.meth,null,header);
        }
        else
        {
            var para = "";
            for(const key of Object.keys(req.data)) 
            {
                var value = req.data[key];
                para +=  key + "=" + value + "&";
            }
            var header =
                [
                    "Content-Type", "application/x-www-form-urlencoded",
                    "versions", App_sdlyg_Config.Versions,
                ]
            xhr.send(req.url,para,req.meth,null,header);
        }
    }

    protected static getAdPosData(onSuccess : Function,onFail : Function)
    {
        var req = new requestData();
        req.url = Share_sdlyg_Ad.getAdPostion;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        req.data.softid = App_sdlyg_Config.AppID;
        req.meth = "get";
        Share_sdlyg_Ad.request(req);
    }

    protected static reqUserClick(advid,onSuccess : Function,onFail : Function)
    {
        var req = new requestData();
        req.url = Share_sdlyg_Ad.userClick;
        req.onSuccess = onSuccess;
        req.onFail = onFail;

        req.data.softid = App_sdlyg_Config.AppID;
        req.data.uid  = Us_sdlyg_er.openId;
        req.data.advid  = advid ;

        Share_sdlyg_Ad.request(req);
    }

    protected static getADVData(locationid,onSuccess : Function,onFail : Function)
    {
        var req = new requestData();
        req.url = Share_sdlyg_Ad.getAdv;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        req.data.softid = App_sdlyg_Config.AppID;
        req.data.locationid = locationid;
        req.data.preview = 0;
        Share_sdlyg_Ad.request(req);
    }


/**
     * 随机跳转的方法，会从广告列表中随机得到一个AppId并且跳转,输入的参数为概率，大小在0-1之间
     * 如果概率大于1，则自动将其除以100，所以千万注意！
     * 
     * @static
     * @param {number} [rate=1] 
     * @memberof ShareAd
     */
    public static RandomJump(rate: number = 1) 
    {
        console.log("随机跳转,rate：" + rate);
        if (rate > 1) {
            rate = rate / 100;
        }
        let rd = Math.random();
        if (rd <= rate) {
            var adLocationID = Share_sdlyg_Ad.LoopAdLocationID;
            var Locations = 
            [
                Share_sdlyg_Ad.LoopAdLocationID, 
                Share_sdlyg_Ad.InsertAdLocationID, 
                Share_sdlyg_Ad.BannerAdLocationID,
                Share_sdlyg_Ad.AniAdLocationID,
            ]
            if(Share_sdlyg_Ad.UseRandomAdPos)
            {
                for(var i=0;i < Share_sdlyg_Ad.AdLocationids.length;++i)
                {
                    Locations.push(Share_sdlyg_Ad.AdLocationids[i]);
                }
            }
            adLocationID = Locations[Math.floor(Math.random() * Locations.length)]
            var datas = Share_sdlyg_Ad.getADVs(adLocationID, function (datas: Array<any>) {
                if (datas) {
                    let rd = Math.floor(datas.length * Math.random());
                    let data = datas[rd];
                    console.log("跳转游戏： " + data.title);
                    WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功")
                        Share_sdlyg_Ad.reportUserClick(data.appid);
                        ALD.aldSendReportAdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败")
                        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            ALD.aldSendReportAdClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成")
                    });
                }
            }, true);
        }
    }

    public static isNeedShowAd() : boolean
    {
        if(0 == AppSwitchConfig.getInstance().getAppSwitchData().adSwitch)
            return false;
        var mailiang = AppSwitchConfig.getInstance().getAppSwitchData().mailiang;
        var mailianglist = AppSwitchConfig.getInstance().getAppSwitchData().mailianglist;
        var mailiangscenelist = AppSwitchConfig.getInstance().getAppSwitchData().mailiangSceneList;
        if(1 == mailiang)
        {
            if(Laya.Browser.onMiniGame)
            {
                var flag : number = WXAPI.getLaunchOptionsSync().query['chid'];
                if(null != flag && null != mailianglist && mailianglist.length > 0)
                {
                    for(var i=0;i < mailianglist.length;++i)
                    {
                        if(flag == mailianglist[i])
                        {
                            return false;
                        }
                    }
                }
                var scene : number = WXAPI.getLaunchOptionsSync().scene
                if(null != scene && null != mailiangscenelist && mailiangscenelist.length > 0)
                {
                    for(var i=0;i < mailiangscenelist.length;++i)
                    {
                        if(scene == mailiangscenelist[i])
                        {
                            return false;
                        }
                    }
                }                
            }
            else if(Laya.Browser.onQGMiniGame)
            {
                return false;
            }
            else if(Laya.Browser.onQQBrowser)
            {
                return false;
            }
        }
        return true;
    }

    public static sortDatas(datas: any): any 
    {
        if(null == datas || 0 == datas.length)
            return [];
        var dataDic: { [appid: string]: any[] } = {};
        var dataArray: any[] = new Array();
        for (var i = 0; i < datas.length; ++i)  {
            var data = datas[i];
            if (dataDic[data.appid] == null) {
                dataDic[data.appid] = new Array();
                dataDic[data.appid].push(data);
                dataArray.push(dataDic[data.appid]);
            } else {
                dataDic[data.appid].push(data);
            }
        }
        //从大到小排序
        for (let i = 0; i < dataArray.length; i++) {
            for (let j = i + 1; j < dataArray.length; j++) {
                if (dataArray[i].length < dataArray[j].length) {
                    let d = dataArray[j];
                    dataArray[j] = dataArray[i];
                    dataArray[i] = d;
                }
            }
        }
        //重新分组
        var groupArray: any[] = new Array();
        for (let i = 0; i < dataArray[0].length; i++) {
            groupArray[i] = new Array();
            for (let j = 0; j < dataArray.length; j++) {
                if (dataArray[j].length > i) {
                    groupArray[i].push(dataArray[j][i]);
                }
            }
            // //组内打乱            
            // groupArray[i].sort(() => { return 0.5 - Math.random() })
        }
        //打乱分组
        // groupArray.sort(() => { return 0.5 - Math.random() });
        var res: any[] = new Array();
        for (let i = 0; i < groupArray.length; i++) {
            for (let j = 0; j < groupArray[i].length; j++) {
                res.push(groupArray[i][j])
            }
        }
        return res;
    }
}