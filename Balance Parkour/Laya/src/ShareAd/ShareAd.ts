import { request_tippy_Data } from "../Net/HttpUnit";
import AppConfig from "../AppConfig";
import Us_tippy_er from "../User/User";
import Ut_tippy_ilit_tippy_ from "../Utilit";
import AL_tippy_D from "../ALD";
import WXAPI from "../WXAPI";
import Event_tippy_Mgr from "../Event/EventMgr";
import { Event_tippy_Def } from "../Event/EventDef";
import AppSwitch_tippy_Config from "../Config/AppSwitchConfig";




export default class Share_tippy_Ad 
{
    public static readonly mainUrl = "";
    public static readonly getAdPostion = "";//获取广告位列表
    public static readonly getAdv = "";//获取第三方广告列表
    public static readonly userClick = "";//用户点击上报

    public static readonly LoopAdLocationID = 98;
    public static readonly BannerAdLocationID = 100;
    public static readonly InsertAdLocationID = 99;
    public static readonly AniAdLocationID = 108;
    
    public static UseRandomAdPos : boolean = true;
    public static readonly AdLocationids : Array<number> = 
    [
        98,99
    ]

    protected static _adPosition : any = {}
    protected static _adv : any = {}

    public static _iphoneIgnoreAppIds = 
    [
        // "wx9540f9021d5f809d",
        "",
        "",
        ""
    ]
    
    public static refresh_tippy_Ad(complate : Function)
    {
        // Share_tippy_Ad.getAdPos_tippy_Data((res)=>{
        //     if(1 == res.code)
        //     {
        //         console.log("获取分享广告数据成功");
        //         Share_tippy_Ad._adPosition = res.result;
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

    public static getADV_tippy_s(locationid,complate : Function,useRandom? : boolean,useLocalRandom? : boolean)
    {
        // if(!Share_tippy_Ad.isNeed_tippy_ShowAd())
        // {
        //     complate(null);
        //     return;
        // }
        // useRandom = null == useRandom ? Share_tippy_Ad.UseRandomAdPos : useRandom;
        // useLocalRandom =  null == useLocalRandom ? true : useRandom;
        // if(useRandom)
        // {
        //     locationid = Share_tippy_Ad.getRandomAD_tippy_PosID();
        // }
        // var datas = Share_tippy_Ad._adv[locationid];
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
        //     Share_tippy_Ad.getADV_tippy_Data(locationid,(res)=>
        //     {
        //         if(1 == res.code)
        //         {
        //             Share_tippy_Ad._adv[locationid] = res.result;
        //             datas = Share_tippy_Ad._adv[locationid];
        //             if(datas && Ut_tippy_ilit_tippy_.is_tippy_Iphone())
        //             {
        //                 for(var i=0;i< datas.length;++i)
        //                 {
        //                     var data = datas[i];
        //                     for(var j=0;j < Share_tippy_Ad._iphoneIgnoreAppIds.length;++j)
        //                     {
        //                         if(data.appid == Share_tippy_Ad._iphoneIgnoreAppIds[j])
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

    public static reportUser_tippy_Click(advid)
    {
        // Share_tippy_Ad.reqUser_tippy_Click(advid,(res)=>
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

    public static getRandomAD_tippy_PosID() : number
    {
        return Share_tippy_Ad.AdLocationids[Math.floor(Math.random() * Share_tippy_Ad.AdLocationids.length)]
    }

    protected static re_tippy_quest(req : request_tippy_Data) {
        // if (req.url.indexOf("https://") > -1 ||
        //     req.url.indexOf("http://") > -1) {
        //     req.url = req.url;
        // } else {
        //     req.url = Share_tippy_Ad.mainUrl + req.url;
        // }
        // var completeFunc = (res) => {
        //     console.log("http Success")
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
        // xhr.once(Laya.Event.COMPLETE, Share_tippy_Ad, completeFunc);
        // xhr.once(Laya.Event.ERROR, Share_tippy_Ad, errorFunc);


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
        //             "versions", AppConfig.Versions,
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
        //             "versions", AppConfig.Versions,
        //         ]
        //     xhr.send(req.url,para,req.meth,null,header);
        // }
    }

    protected static getAdPos_tippy_Data(onSuccess : Function,onFail : Function)
    {
        // var req = new request_tippy_Data();
        // req.url = Share_tippy_Ad.getAdPostion;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = AppConfig.AppID;
        // req.meth = "get";
        // Share_tippy_Ad.re_tippy_quest(req);
    }

    protected static reqUser_tippy_Click(advid,onSuccess : Function,onFail : Function)
    {
        // var req = new request_tippy_Data();
        // req.url = Share_tippy_Ad.userClick;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;

        // req.data.softid = AppConfig.AppID;
        // req.data.uid  = Us_tippy_er.open_tippy_Id;
        // req.data.advid  = advid ;

        // Share_tippy_Ad.re_tippy_quest(req);
    }

    protected static getADV_tippy_Data(locationid,onSuccess : Function,onFail : Function)
    {
        // var req = new request_tippy_Data();
        // req.url = Share_tippy_Ad.getAdv;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = AppConfig.AppID;
        // req.data.locationid = locationid;
        // req.data.preview = 0;
        // Share_tippy_Ad.re_tippy_quest(req);
    }


/**
     * 随机跳转的方法，会从广告列表中随机得到一个AppId并且跳转,输入的参数为概率，大小在0-1之间
     * 如果概率大于1，则自动将其除以100，所以千万注意！
     * 
     * @static
     * @param {number} [rate=1] 
     * @memberof ShareAd
     */
    public static Random_tippy_Jump(rate: number = 1) 
    {
        // console.log("随机跳转,rate：" + rate);
        // if (rate > 1) {
        //     rate = rate / 100;
        // }
        // let rd = Math.random();
        // if (rd <= rate) {
        //     var adLocationID = Share_tippy_Ad.LoopAdLocationID;
        //     var Locations = 
        //     [
        //         Share_tippy_Ad.LoopAdLocationID, 
        //         Share_tippy_Ad.InsertAdLocationID, 
        //         Share_tippy_Ad.BannerAdLocationID,
        //         Share_tippy_Ad.AniAdLocationID,
        //     ]
        //     if(Share_tippy_Ad.UseRandomAdPos)
        //     {
        //         for(var i=0;i < Share_tippy_Ad.AdLocationids.length;++i)
        //         {
        //             Locations.push(Share_tippy_Ad.AdLocationids[i]);
        //         }
        //     }
        //     adLocationID = Locations[Math.floor(Math.random() * Locations.length)]
        //     var datas = Share_tippy_Ad.getADV_tippy_s(adLocationID, function (datas: Array<any>) {
        //         if (datas) {
        //             let rd = Math.floor(datas.length * Math.random());
        //             let data = datas[rd];
        //             console.log("跳转游戏： " + data.title);
        //             WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
        //                 console.log("跳转成功")
        //                 Share_tippy_Ad.reportUser_tippy_Click(data.appid);
        //                 AL_tippy_D.aldSendReport_tippy_AdClickSuccess(data);
        //             }, (res) => {
        //                 console.log("跳转失败")
        //                 Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
        //                 if (res.errMsg == "navigateToMiniProgram:fail cancel") {
        //                     console.log("用户取消跳转");
        //                     AL_tippy_D.aldSendReportAd_tippy_ClickFail(data);
        //                 }
        //             }, (res) => {
        //                 console.log("跳转完成")
        //             });
        //         }
        //     }, true);
        // }
    }

    public static isNeed_tippy_ShowAd() : boolean
    {
        // var mailiang = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().mailiang;
        // var mailianglist = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().mailianglist;
        // if(1 == mailiang)
        // {
        //     if(Laya.Browser.onMiniGame)
        //     {
        //         var flag : number = WXAPI.getLaunchOptionsSync().query['chid'];
        //         if(null != flag && null != mailianglist && mailianglist.length > 0)
        //         {
        //             for(var i=0;i < mailianglist.length;++i)
        //             {
        //                 if(flag == mailianglist[i])
        //                 {
        //                     return false;
        //                 }
        //             }
        //         }
        //     }
        //     else if(Laya.Browser.onQGMiniGame)
        //     {
        //         return false;
        //     }
        //     else if(Laya.Browser.onQQBrowser)
        //     {
        //         return false;
        //     }
        // }
        return true;
    }
}