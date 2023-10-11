import { ryw_requestData } from "../Net/HttpUnit";
import ryw_AppConfig from "../AppConfig";
import ryw_User from "../User/User";
import ryw_Utilit from "../Utilit";
import ryw_ALD from "../ALD";
import ryw_WXAPI from "../WXAPI";
import ryw_EventMgr from "../Event/EventMgr";
import { ryw_EventDef } from "../Event/EventDef";
import ryw_AppSwitchConfig from "../Config/AppSwitchConfig";
import ryw_QQMiniGameAPI from "../QQMiniGameAPI";




export default class ryw_ShareAd 
{
    public static readonly ryw_mainUrl = "";
    public static readonly ryw_getAdPostion = "";//获取广告位列表
    public static readonly ryw_getAdv = "";//获取第三方广告列表
    public static readonly ryw_userClick = "";//用户点击上报

    public static readonly ryw_LoopAdLocationID = 532;
    public static readonly ryw_BannerAdLocationID = 531;
    public static readonly ryw_InsertAdLocationID = -1;
    public static readonly ryw_AniAdLocationID = -1;
    public static readonly ryw_HistoryLocationID = 534;
    public static readonly ryw_MoreGameLocationID = 533;
    
    public static ryw_UseRandomAdPos : boolean = false;
    public static readonly ryw_AdLocationids : Array<number> =
    [
        
    ]

    protected static ryw__adPosition : any = {}
    protected static ryw__adv : any = {}

    public static ryw__iphoneIgnoreAppIds = 
    [
        "",
        ""
    ]

    public static ryw_refreshAd(complate : Function)
    {
        // ryw_ShareAd.ryw_getAdPosData((res)=>{
        //     if(1 == res.code)
        //     {
        //         console.log("获取分享广告数据成功");
        //         ryw_ShareAd.ryw__adPosition = res.result;
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

    public static ryw_getADVs(locationid,complate : Function,useRandom? : boolean,useLocalRandom? : boolean,sortDatas? : Function)
    {
        // if(!ryw_ShareAd.ryw_isNeedShowAd())
        // {
        //     complate(null);
        //     return;
        // }
        // useRandom = null == useRandom ? ryw_ShareAd.ryw_UseRandomAdPos : useRandom;
        // useLocalRandom =  null == useLocalRandom ? true : useLocalRandom;
        // if(useRandom)
        // {
        //     locationid = ryw_ShareAd.ryw_getRandomADPosID();
        // }
        // var datas = ryw_ShareAd.ryw__adv[locationid];
        // if(datas)
        // {
        //     if(useLocalRandom)
        //     {
        //         if(null == sortDatas)
        //         {
        //             datas = this.ryw_sortDatas(datas);
        //         }
        //         else
        //         {
        //             datas = sortDatas(datas);
        //         }
        //     }
        //     complate(datas)
        // }
        // else
        // {
        //     var self = ryw_ShareAd;
        //     ryw_ShareAd.ryw_getADVData(locationid,(res)=>
        //     {
        //         if(1 == res.code)
        //         {
        //             ryw_ShareAd.ryw__adv[locationid] = res.result;
        //             datas = ryw_ShareAd.ryw__adv[locationid];
        //             if(datas && ryw_Utilit.ryw_isIphone())
        //             {
        //                 for(var i=0;i< datas.length;++i)
        //                 {
        //                     var data = datas[i];
        //                     for(var j=0;j < ryw_ShareAd.ryw__iphoneIgnoreAppIds.length;++j)
        //                     {
        //                         if(data.appid == ryw_ShareAd.ryw__iphoneIgnoreAppIds[j])
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
        //                 if(null == sortDatas)
        //                 {
        //                     datas = self.ryw_sortDatas(datas);
        //                 }
        //                 else
        //                 {
        //                     datas = sortDatas(datas);
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

    public static ryw_reportUserClick(advid)
    {
        // ryw_ShareAd.ryw_reqUserClick(advid,(res)=>
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

    public static ryw_getRandomADPosID() : number
    {
        return ryw_ShareAd.ryw_AdLocationids[Math.floor(Math.random() * ryw_ShareAd.ryw_AdLocationids.length)]
    }

    protected static ryw_request(req : ryw_requestData) {
        // if (req.ryw_url.indexOf("https://") > -1 ||
        //     req.ryw_url.indexOf("http://") > -1) {
        //     req.ryw_url = req.ryw_url;
        // } else {
        //     req.ryw_url = ryw_ShareAd.ryw_mainUrl + req.ryw_url;
        // }
        // var completeFunc = (res) => {
        //     console.log(res,"http Success")
        //     res = JSON.parse(res);
        //     if (req.ryw_onSuccess) {
        //         req.ryw_onSuccess(res);
        //     }
        //     req.ryw_onSuccess = null;
        //     req = null;
        // };
        // var errorFunc = (res) => {
        //     console.log(res,"http fail")
        //     if (req.ryw_onFail)  {
        //         req.ryw_onFail(res);
        //     }
        //     req.ryw_onFail = null;
        //     req = null;
        // };

        // var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        // xhr.once(Laya.Event.COMPLETE, ryw_ShareAd, completeFunc);
        // xhr.once(Laya.Event.ERROR, ryw_ShareAd, errorFunc);


        // if(req.ryw_meth == "get")
        // {
        //     var para = "";
        //     for(const key of Object.keys(req.ryw_data)) 
        //     {
        //         var value = req.ryw_data[key];
        //         para +=  key + "=" + value + "&";
        //     }
        //     req.ryw_url = req.ryw_url + "?" + para;
        //     var header =
        //         [
        //             "versions", ryw_AppConfig.ryw_Versions,
        //         ]
        //     xhr.send(req.ryw_url,null,req.ryw_meth,null,header);
        // }
        // else
        // {
        //     var para = "";
        //     for(const key of Object.keys(req.ryw_data)) 
        //     {
        //         var value = req.ryw_data[key];
        //         para +=  key + "=" + value + "&";
        //     }
        //     para += "ts=" + String(Date.now()) + "&";
        //     var header =
        //         [
        //             "Content-Type", "application/x-www-form-urlencoded",
        //             "versions", ryw_AppConfig.ryw_Versions,
        //         ]
        //     xhr.send(req.ryw_url,para,req.ryw_meth,null,header);
        // }
    }

    protected static ryw_getAdPosData(onSuccess : Function,onFail : Function)
    {
        // var req = new ryw_requestData();
        // req.ryw_url = ryw_ShareAd.ryw_getAdPostion;
        // req.ryw_onSuccess = onSuccess;
        // req.ryw_onFail = onFail;
        // req.ryw_data.softid = ryw_AppConfig.ryw_AppID;
        // req.ryw_meth = "get";
        // ryw_ShareAd.ryw_request(req);
    }

    protected static ryw_reqUserClick(advid,onSuccess : Function,onFail : Function)
    {
        // var req = new ryw_requestData();
        // req.ryw_url = ryw_ShareAd.ryw_userClick;
        // req.ryw_onSuccess = onSuccess;
        // req.ryw_onFail = onFail;

        // req.ryw_data.softid = ryw_AppConfig.ryw_AppID;
        // req.ryw_data.uid  = ryw_User.ryw_openId;
        // req.ryw_data.advid  = advid ;

        // ryw_ShareAd.ryw_request(req);
    }

    protected static ryw_getADVData(locationid,onSuccess : Function,onFail : Function)
    {
        // var req = new ryw_requestData();
        // req.ryw_url = ryw_ShareAd.ryw_getAdv;
        // req.ryw_onSuccess = onSuccess;
        // req.ryw_onFail = onFail;
        // req.ryw_data.softid = ryw_AppConfig.ryw_AppID;
        // req.ryw_data.locationid = locationid;
        // req.ryw_data.preview = 0;
        // ryw_ShareAd.ryw_request(req);
    }


/**
     * 随机跳转的方法，会从广告列表中随机得到一个AppId并且跳转,输入的参数为概率，大小在0-1之间
     * 如果概率大于1，则自动将其除以100，所以千万注意！
     * 
     * @static
     * @param {number} [rate=1] 
     * @memberof ShareAd
     */
    public static ryw_RandomJump(rate: number = 1) 
    {
        // console.log("随机跳转,rate：" + rate);
        // if (rate > 1) {
        //     rate = rate / 100;
        // }
        // let rd = Math.random();
        // if (rd <= rate) {
        //     var adLocationID = ryw_ShareAd.ryw_LoopAdLocationID;
        //     var Locations = 
        //     [
        //         ryw_ShareAd.ryw_LoopAdLocationID, 
        //         ryw_ShareAd.ryw_InsertAdLocationID, 
        //         ryw_ShareAd.ryw_BannerAdLocationID,
        //         ryw_ShareAd.ryw_AniAdLocationID,
        //     ]
        //     if(ryw_ShareAd.ryw_UseRandomAdPos)
        //     {
        //         for(var i=0;i < ryw_ShareAd.ryw_AdLocationids.length;++i)
        //         {
        //             Locations.push(ryw_ShareAd.ryw_AdLocationids[i]);
        //         }
        //     }
        //     adLocationID = Locations[Math.floor(Math.random() * Locations.length)]
        //     var datas = ryw_ShareAd.ryw_getADVs(adLocationID, function (datas: Array<any>) {
        //         if (datas) {
        //             let rd = Math.floor(datas.length * Math.random());
        //             let data = datas[rd];
        //             console.log("跳转游戏： " + data.title);
        //             ryw_WXAPI.ryw_navigateToMiniProgram(data.appid, data.url, (res) => {
        //                 console.log("跳转成功")
        //                 ryw_ShareAd.ryw_reportUserClick(data.appid);
        //                 ryw_ALD.ryw_aldSendReportAdClickSuccess(data);
        //             }, (res) => {
        //                 console.log("跳转失败")
        //                 ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
        //                 if (res.errMsg == "navigateToMiniProgram:fail cancel") {
        //                     console.log("用户取消跳转");
        //                     ryw_ALD.ryw_aldSendReportAdClickFail(data);
        //                 }
        //             }, (res) => {
        //                 console.log("跳转完成")
        //             });
        //         }
        //     }, true);
        // }
    }

    public static ryw_isNeedShowAd() : boolean
    {
        // if(0 == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_adSwitch)
        //     return false;
        // if(Laya.Browser.onQGMiniGame)
        // {
        //     if(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_oppocfg.ryw_oppoversions != ryw_AppConfig.ryw_Versions)
        //     {
        //         return false;
        //     }
        // }
        // var mailiang = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_mailiang;
        // var mailianglist = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_mailianglist;
        // var mailiangscenelist = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_mailiangSceneList;
        // if(1 == mailiang)
        // {
        //     var flag : number = null;
        //     var scene : number = null;
        //     if(Laya.Browser.onMiniGame)
        //     {
        //         flag = ryw_WXAPI.ryw_getLaunchOptionsSync().query['chid'];
        //         scene  = ryw_WXAPI.ryw_getLaunchOptionsSync().scene;             
        //     }
        //     else if(Laya.Browser.onQQMiniGame)
        //     {
        //         flag  = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().query['chid'];
        //         scene  = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
        //     }
        //     if(null != flag && null != mailianglist && mailianglist.length > 0)
        //     {
        //         for(var i=0;i < mailianglist.length;++i)
        //         {
        //             if(flag == mailianglist[i])
        //             {
        //                 return false;
        //             }
        //         }
        //     }
        //     if(null != scene && null != mailiangscenelist && mailiangscenelist.length > 0)
        //     {
        //         for(var i=0;i < mailiangscenelist.length;++i)
        //         {
        //             if(scene == mailiangscenelist[i])
        //             {
        //                 return false;
        //             }
        //         }
        //     }   
        // }
        return true;
    }

    public static ryw_sortDatas(datas: any): any 
    {
        // if (null == datas || 0 == datas.length)
        //     return [];
        // let dataDic: { [appid: string]: any[] } = {};
        // let keys = new Array<string>();
        // for (let i = 0; i < datas.length; ++i) {
        //     let data = datas[i];
        //     if (dataDic[data.appid] == null) {
        //         dataDic[data.appid] = new Array();
        //         dataDic[data.appid].push(data);
        //         keys.push(data.appid);
        //     } else {
        //         dataDic[data.appid].push(data);
        //     }
        // }
        // for (let i = 0; i < keys.length; ++i)  {
        //     let key = keys[i];
        //     let randomIndex = Math.floor(Math.random() * keys.length);
        //     let temp = keys[randomIndex];
        //     keys[randomIndex] = key;
        //     keys[i] = temp;
        // }
        // for (let i = 0; i < keys.length; ++i)  {
        //     let key = keys[i];
        //     let dataArray = dataDic[key];
        //     for (let j = 0; j < dataArray.length; ++j)  {
        //         let data = dataArray[j];
        //         let randomIndex = Math.floor(Math.random() * dataArray.length);
        //         let temp = dataArray[randomIndex];
        //         dataArray[randomIndex] = data;
        //         dataArray[j] = temp;
        //     }
        // }
        // let res = new Array<any>();
        // let ignores = [];
        // while(keys.length > 0)
        // {
        //     let isComplate = true;
        //     for(let i=0;i < keys.length;++i)
        //     {
        //         let key = keys[i];
        //         let isOk = true;
        //         for(let j=0;j < ignores.length;++j)
        //         {
        //             let ignore = ignores[j];
        //             if(ignore == key)
        //             {
        //                 isOk = false;
        //                 break;
        //             }
        //         }
        //         if(isOk)
        //         {
        //             isComplate = false;
        //             let data = dataDic[key].shift();
        //             res.push(data);
        //             ignores.push(key);
        //             if(ignores.length > 3)
        //             {
        //                 ignores.shift();
        //             }
        //             if(dataDic[key].length <= 0)
        //             {
        //                 keys.splice(i,1);
        //                 --i;
        //                 continue;
        //             }
        //         }
        //         else
        //         {
        //             continue;
        //         }
        //     }
        //     if(isComplate)
        //     {
        //         for (let j = 0; j < keys.length; ++j)  
        //         {
        //             let key = keys[j];
        //             let isOk = true;
        //             let dataArray = dataDic[key];
        //             ignores.splice(0);
        //             for(let h=0;h < dataArray.length;++h)
        //             {
        //                 let data = dataArray[h];
        //                 for (let i = 0; i < res.length; ++i) 
        //                 {
        //                     ignores.push(null == res[i - 2] ? null : res[i - 2].appid);
        //                     ignores.push(null == res[i - 1] ? null : res[i - 1].appid);
        //                     ignores.push(null == res[i] ? null : res[i].appid);
        //                     ignores.push(null == res[i + 1] ? null : res[i + 1].appid);
        //                     ignores.push(null == res[i + 2] ? null : res[i + 2].appid);
        //                     for(let k=0;k < ignores.length;++k)
        //                     {
        //                         let ignore = ignores[k];
        //                         if(null != ignore && ignore == key)
        //                         {
        //                             isOk = false;
        //                             break;
        //                         }
        //                     }
        //                     if(isOk)
        //                     {
        //                         if (null != data) {
        //                             let f = res.slice(0, i + 1);
        //                             let b = res.slice(i + 1, res.length);
        //                             res = f;
        //                             res.push(data);
        //                             for (let a = 0; a < b.length; ++a) {
        //                                 res.push(b[a]);
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
 
        //         }
        //         break;
        //     }
        //     for (let i = 0; i < keys.length; ++i)  {
        //         let key = keys[i];
        //         let randomIndex = Math.floor(Math.random() * keys.length);
        //         let temp = keys[randomIndex];
        //         keys[randomIndex] = key;
        //         keys[i] = temp;
        //     }
        // }
        // return res;
        return 
    }

    // public static sortDatas(datas: any): any 
    // {
    //     if(null == datas || 0 == datas.length)
    //         return [];
    //     let dataDic: { [appid: string]: any[] } = {};
    //     let keys = new Array<string>();
    //     for (let i = 0; i < datas.length; ++i)  {
    //         let data = datas[i];
    //         if (dataDic[data.appid] == null) {
    //             dataDic[data.appid] = new Array();
    //             dataDic[data.appid].push(data);
    //             keys.push(data.appid);
    //         } else {
    //             dataDic[data.appid].push(data);
    //         }
    //     }
    //     for (let i = 0; i < keys.length; ++i)
    //     {
    //         let key = keys[i];
    //         let randomIndex = Math.floor(Math.random() * keys.length);
    //         let temp = keys[randomIndex];
    //         keys[randomIndex] = key;
    //         keys[i] = temp;
    //     }
    //     for (let i = 0; i < keys.length; ++i)
    //     {
    //         let key = keys[i];
    //         let dataArray = dataDic[key];
    //         for (let j = 0; j < dataArray.length; ++j)
    //         {
    //             let data = dataArray[j];
    //             let randomIndex = Math.floor(Math.random() * dataArray.length);
    //             let temp = dataArray[randomIndex];
    //             dataArray[randomIndex] = data;
    //             dataArray[j] = temp;
    //         }
    //     }
    //     let res = new Array<any>();
    //     while(keys.length > 0)
    //     {
    //         if(keys.length == 1)
    //         {
    //             let key = keys[0];
    //             let isOk = false;
    //             let dataArray = dataDic[key];
    //             for (let i = 0; i < res.length; ++i)
    //             {
    //                 let curData = res[i];
    //                 let nextData = res[i + 1];
    //                 if(null != nextData)
    //                 {
    //                     if(curData.appid != key && nextData.appid != key)
    //                     {
    //                         let data = dataArray.shift();
    //                         if (null != data)  
    //                         {
    //                             let f = res.slice(0, i + 1);
    //                             let b = res.slice(i + 1, res.length);
    //                             res = f;
    //                             res.push(data);
    //                             for (let k = 0; k < b.length; ++k)  {
    //                                 res.push(b[k]);
    //                             }
    //                         }
    //                         isOk = true;
    //                         break;
    //                     }
    //                 }
    //                 else
    //                 {
    //                     if(curData.appid != key)
    //                     {
    //                         let data = dataArray.shift();
    //                         if(null != data)
    //                         {
    //                             let f = res.slice(0, i + 1);
    //                             let b = res.slice(i + 1, res.length);
    //                             res = f;
    //                             res.push(data);
    //                             for (let k = 0; k < b.length; ++k)  {
    //                                 res.push(b[k]);
    //                             }
    //                         }
    //                         isOk = true;
    //                         break;
    //                     }
    //                 }
    //             }
    //             if(!isOk || dataArray.length <= 0)
    //             {
    //                 keys.splice(0,1);
    //             }
    //         }
    //         else
    //         {
    //             for (let i = 0; i < keys.length; ++i)
    //             {
    //                 let key = keys[i];
    //                 let dataArray = dataDic[key];
    //                 let data = dataArray.shift();
    //                 res.push(data);
    //                 if(dataArray.length <= 0)
    //                 {
    //                     keys.splice(i,1);
    //                     --i;
    //                 }
    //             }
    //         }
    //     }
    //     return res;
    // }
}