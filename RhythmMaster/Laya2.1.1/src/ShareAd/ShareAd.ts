import { requestData } from "../Net/HttpUnit";
import App_myqq_Config from "../AppConfig";
import User_yy from "../User/User";
import Utilit from "../Utilit";
import ALD from "../ALD";
import WXAPI from "../WXAPI";
import Event_myqq_Mgr from "../Event/EventMgr";
import { EventDef } from "../Event/EventDef";




export default class Share_myqq_Ad 
{
    public static readonly mainUrl = "";
    public static readonly getAdPostion = "";//获取广告位列表
    public static readonly getAdv = "";//获取第三方广告列表
    public static readonly userClick = "";//用户点击上报

    public static readonly LoopAdLocationID = 125;
    public static readonly BannerAdLocationID = 127;
    public static readonly InsertAdLocationID = 126;
    public static readonly AniAdLocationID = 128;
    
    public static UseRandomAdPos : boolean = true;
    public static readonly AdLocationids : Array<number> = 
    [
        125, 126
    ]

    protected static _adPosition : any = {}
    protected static _adv : any = {}

    public static _iphoneIgnoreAppIds = 
    [
    ]

    public static refresh_myqq_Ad(complate : Function)
    {
        // Share_myqq_Ad.getAdPosData((res)=>{
        //     if(1 == res.code)
        //     {
        //         console.log("获取分享广告数据成功");
        //         Share_myqq_Ad._adPosition = res.result;
        //         if(complate)
        //         {
        //             complate(true)
        //         }
        //     }
        //     else
        //     {
        //         console.log("获取分享广告数据失败 ： " + res.msg);
        //         if(complate)
        //         {
        //             complate(false)
        //         }
        //     }
        // },(res)=>{
        //     console.log("获取分享广告数据失败");
        //     if(complate)
        //     {
        //         complate(false)
        //     }
        // })
    }

    public static get_myqq_ADVs(locationid,complate : Function,useRandom? : boolean,useLocalRandom? : boolean)
    {
        // useRandom = null == useRandom ? Share_myqq_Ad.UseRandomAdPos : useRandom;
        // useLocalRandom =  null == useLocalRandom ? true : useRandom;
        // if(useRandom)
        // {
        //     locationid = Share_myqq_Ad.get_myqq_RandomADPosID();
        // }
        // var datas = Share_myqq_Ad._adv[locationid];
        // if(datas)
        // {
        //     for (var i = datas.length - 1; i >= 0; --i)  
        //     {
        //         var randomIndex = Math.floor(Math.random() * datas.length);
        //         var curValue = datas[i];
        //         var randomValue = datas[randomIndex];
        //         datas[randomIndex] = curValue;
        //         datas[i] = randomValue;
        //     }
        //     complate(datas)
        // }
        // else
        // {
        //     Share_myqq_Ad.getADVData(locationid,(res)=>
        //     {
        //         if(1 == res.code)
        //         {
        //             Share_myqq_Ad._adv[locationid] = res.result;
        //             datas = Share_myqq_Ad._adv[locationid];
        //             if(datas && Utilit.isIphone())
        //             {
        //                 for(var i=0;i< datas.length;++i)
        //                 {
        //                     var data = datas[i];
        //                     for(var j=0;j < Share_myqq_Ad._iphoneIgnoreAppIds.length;++j)
        //                     {
        //                         if(data.appid == Share_myqq_Ad._iphoneIgnoreAppIds[j])
        //                         {
        //                             datas.splice(i,1);
        //                             --i;
        //                             break;
        //                         }
        //                     }
        //                 }
        //             }
        //             if(datas && useLocalRandom)
        //             {
        //                 for (var i = datas.length - 1; i >= 0; --i)  
        //                 {
        //                     var randomIndex = Math.floor(Math.random() * datas.length);
        //                     var curValue = datas[i];
        //                     var randomValue = datas[randomIndex];
        //                     datas[randomIndex] = curValue;
        //                     datas[i] = randomValue;
        //                 }
        //             }
        //             if(complate)
        //             {
        //                 complate(datas);
        //             }
        //         }
        //         else
        //         {
        //             if(complate)
        //             {
        //                 complate(null);
        //             }
        //         }
        //     },(res)=>
        //     {
        //         if(complate)
        //         {
        //             complate(null);
        //         }
        //     })
        // }
    }

    public static reportUserClick(advid)
    {
        // Share_myqq_Ad.reqUserClick(advid,(res)=>
        // {
        //     if(1 == res.code)
        //     {
        //         console.log("点击广告上报成功");
        //     }
        //     else
        //     {
        //         console.log("点击广告上报失败");
        //     }
        // },(res)=>
        // {
        //     console.log("点击广告上报失败");
        // });
    }

    public static get_myqq_RandomADPosID() : number
    {
        return Share_myqq_Ad.AdLocationids[Math.floor(Math.random() * Share_myqq_Ad.AdLocationids.length)]
    }

    protected static request(req : requestData) {
        // if (req.url.indexOf("https://") > -1 ||
        //     req.url.indexOf("http://") > -1) {
        //     req.url = req.url;
        // } else {
        //     req.url = Share_myqq_Ad.mainUrl + req.url;
        // }
        // var completeFunc = (res) => {
        //     console.log(res,"http Success")
        //     res = JSON.parse(res);
        //     if (req.onSuccess) {
        //         req.onSuccess(res);
        //     }
        //     req.onSuccess = null;
        //     req = null;
        // };
        // var errorFunc = (res) => {
        //     console.log(res,"http fail")
        //     if (req.onFail)  {
        //         req.onFail(res);
        //     }
        //     req.onFail = null;
        //     req = null;
        // };

        // var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        // xhr.once(Laya.Event.COMPLETE, Share_myqq_Ad, completeFunc);
        // xhr.once(Laya.Event.ERROR, Share_myqq_Ad, errorFunc);


        // if(req.meth == "get")
        // {
        //     var para = "";
        //     for(const key of Object.keys(req.data)) 
        //     {
        //         var value = req.data[key];
        //         para +=  key + "=" + value + "&";
        //     }
        //     req.url = req.url + "?" + para;
        //     var header =
        //         [
        //             "versions", App_myqq_Config.Versions,
        //         ]
        //     xhr.send(req.url,null,req.meth,null,header);
        // }
        // else
        // {
        //     var para = "";
        //     for(const key of Object.keys(req.data)) 
        //     {
        //         var value = req.data[key];
        //         para +=  key + "=" + value + "&";
        //     }
        //     var header =
        //         [
        //             "Content-Type", "application/x-www-form-urlencoded",
        //             "versions", App_myqq_Config.Versions,
        //         ]
        //     xhr.send(req.url,para,req.meth,null,header);
        // }
    }

    protected static getAdPosData(onSuccess : Function,onFail : Function)
    {
        // var req = new requestData();
        // req.url = Share_myqq_Ad.getAdPostion;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = App_myqq_Config.AppID;
        // req.meth = "get";
        // Share_myqq_Ad.request(req);
    }

    protected static reqUserClick(advid,onSuccess : Function,onFail : Function)
    {
        // var req = new requestData();
        // req.url = Share_myqq_Ad.userClick;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;

        // req.data.softid = App_myqq_Config.AppID;
        // req.data.uid  = User_yy.openId;
        // req.data.advid  = advid ;

        // Share_myqq_Ad.request(req);
    }

    protected static getADVData(locationid,onSuccess : Function,onFail : Function)
    {
        // var req = new requestData();
        // req.url = Share_myqq_Ad.getAdv;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = App_myqq_Config.AppID;
        // req.data.locationid = locationid;
        // req.data.preview = 0;
        // Share_myqq_Ad.request(req);
    }


/**
     * 随机跳转的方法，会从广告列表中随机得到一个AppId并且跳转,输入的参数为概率，大小在0-1之间
     * 如果概率大于1，则自动将其除以100，所以千万注意！
     * 
     * @static
     * @param {number} [rate=1] 
     * @memberof ShareAd
     */
    public static Random_myqq_Jump(rate: number = 1) 
    {
        // console.log("随机跳转,rate：" + rate);
        // if (rate > 1) {
        //     rate = rate / 100;
        // }
        // let rd = Math.random();
        // if (rd <= rate) {
        //     var adLocationID = Share_myqq_Ad.LoopAdLocationID;
        //     var Locations = 
        //     [
        //         Share_myqq_Ad.LoopAdLocationID, 
        //         Share_myqq_Ad.InsertAdLocationID, 
        //         Share_myqq_Ad.BannerAdLocationID,
        //         Share_myqq_Ad.AniAdLocationID,
        //     ]
        //     if(Share_myqq_Ad.UseRandomAdPos)
        //     {
        //         for(var i=0;i < Share_myqq_Ad.AdLocationids.length;++i)
        //         {
        //             Locations.push(Share_myqq_Ad.AdLocationids[i]);
        //         }
        //     }
        //     adLocationID = Locations[Math.floor(Math.random() * Locations.length)]
        //     var datas = Share_myqq_Ad.get_myqq_ADVs(adLocationID, function (datas: Array<any>) {
        //         if (datas) {
        //             let rd = Math.floor(datas.length * Math.random());
        //             let data = datas[rd];
        //             console.log("跳转游戏： " + data.title);
        //             WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
        //                 console.log("跳转成功")
        //                 Share_myqq_Ad.reportUserClick(data.appid);
        //                 ALD.aldSendReportAdClickSuccess(data);
        //             }, (res) => {
        //                 console.log("跳转失败")
        //                 Event_myqq_Mgr.instance.dispatch(EventDef.AD_OnShareAdFail);
        //                 if (res.errMsg == "navigateToMiniProgram:fail cancel") {
        //                     console.log("用户取消跳转");
        //                     ALD.aldSendReportAdClickFail(data);
        //                 }
        //             }, (res) => {
        //                 console.log("跳转完成")
        //             });
        //         }
        //     }, true);
        // }
    }
}