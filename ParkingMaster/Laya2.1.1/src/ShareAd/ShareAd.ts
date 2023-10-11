import { requestData } from "../Net/HttpUnit";
import AppConfig from "../AppConfig";
import User from "../User/User";
import Utilit from "../Utilit";
import ALD from "../ALD";
import WXAPI from "../WXAPI";
import EventMgr from "../Event/EventMgr";
import { EventDef } from "../Event/EventDef";
import AppSwitchConfig from "../Config/AppSwitchConfig";
import QQMiniGameAPI from "../QQMiniGameAPI";




export default class ShareAd 
{
    public static readonly mainUrl = "";
    public static readonly getAdPostion = "";//获取广告位列表
    public static readonly getAdv = "";//获取第三方广告列表
    public static readonly userClick = "";//用户点击上报

    public static readonly LoopAdLocationID = 281;
    public static readonly BannerAdLocationID = 279;
    public static readonly InsertAdLocationID = -1;
    public static readonly AniAdLocationID = -1;
    public static readonly HistoryLocationID = 280;
    public static readonly MoreGameLocationID = 282;
    
    public static UseRandomAdPos : boolean = false;
    public static readonly AdLocationids : Array<number> =
    [
        
    ]

    protected static _adPosition : any = {}
    protected static _adv : any = {}

    public static _iphoneIgnoreAppIds = 
    [
    ]

    public static refreshAd(complate : Function)
    {
        // ShareAd.getAdPosData((res)=>{
        //     if(1 == res.code)
        //     {
        //         console.log("获取分享广告数据成功");
        //         ShareAd._adPosition = res.result;
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

    public static getADVs(locationid,complate : Function,useRandom? : boolean,useLocalRandom? : boolean,sortDatas? : Function)
    {
        // if(!ShareAd.isNeedShowAd())
        // {
        //     complate(null);
        //     return;
        // }
        // useRandom = null == useRandom ? this.UseRandomAdPos : useRandom;
        // useLocalRandom =  null == useLocalRandom ? true : useLocalRandom;
        // if(useRandom)
        // {
        //     locationid = this.getRandomADPosID();
        // }
        // var datas = ShareAd._adv[locationid];
        // if(datas)
        // {
        //     if(useLocalRandom)
        //     {
        //         if(null == sortDatas)
        //         {
        //             datas = this.sortDatas(datas);
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
        //     var self = this;
        //     ShareAd.getADVData(locationid,(res)=>
        //     {
        //         if(1 == res.code)
        //         {
        //             ShareAd._adv[locationid] = res.result;
        //             datas = ShareAd._adv[locationid];
        //             if(datas && Utilit.isIphone())
        //             {
        //                 for(var i=0;i< datas.length;++i)
        //                 {
        //                     var data = datas[i];
        //                     for(var j=0;j < ShareAd._iphoneIgnoreAppIds.length;++j)
        //                     {
        //                         if(data.appid == ShareAd._iphoneIgnoreAppIds[j])
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
        //                     datas = self.sortDatas(datas);
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

    public static reportUserClick(advid)
    {
        // ShareAd.reqUserClick(advid,(res)=>
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

    public static getRandomADPosID() : number
    {
        return this.AdLocationids[Math.floor(Math.random() * this.AdLocationids.length)]
    }

    protected static request(req : requestData) {
        // if (req.url.indexOf("https://") > -1 ||
        //     req.url.indexOf("http://") > -1) {
        //     req.url = req.url;
        // } else {
        //     req.url = ShareAd.mainUrl + req.url;
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
        // xhr.once(Laya.Event.COMPLETE, this, completeFunc);
        // xhr.once(Laya.Event.ERROR, this, errorFunc);


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
        //     para += "ts=" + String(Date.now()) + "&";
        //     var header =
        //         [
        //             "Content-Type", "application/x-www-form-urlencoded",
        //             "versions", AppConfig.Versions,
        //         ]
        //     xhr.send(req.url,para,req.meth,null,header);
        // }
    }

    protected static getAdPosData(onSuccess : Function,onFail : Function)
    {
        // var req = new requestData();
        // req.url = ShareAd.getAdPostion;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = AppConfig.AppID;
        // req.meth = "get";
        // ShareAd.request(req);
    }

    protected static reqUserClick(advid,onSuccess : Function,onFail : Function)
    {
        // var req = new requestData();
        // req.url = ShareAd.userClick;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;

        // req.data.softid = AppConfig.AppID;
        // req.data.uid  = User.openId;
        // req.data.advid  = advid ;

        // ShareAd.request(req);
    }

    protected static getADVData(locationid,onSuccess : Function,onFail : Function)
    {
        // var req = new requestData();
        // req.url = ShareAd.getAdv;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = AppConfig.AppID;
        // req.data.locationid = locationid;
        // req.data.preview = 0;
        // ShareAd.request(req);
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
        // console.log("随机跳转,rate：" + rate);
        // if (rate > 1) {
        //     rate = rate / 100;
        // }
        // let rd = Math.random();
        // if (rd <= rate) {
        //     var adLocationID = ShareAd.LoopAdLocationID;
        //     var Locations = 
        //     [
        //         ShareAd.LoopAdLocationID, 
        //         ShareAd.InsertAdLocationID, 
        //         ShareAd.BannerAdLocationID,
        //         ShareAd.AniAdLocationID,
        //     ]
        //     if(ShareAd.UseRandomAdPos)
        //     {
        //         for(var i=0;i < ShareAd.AdLocationids.length;++i)
        //         {
        //             Locations.push(ShareAd.AdLocationids[i]);
        //         }
        //     }
        //     adLocationID = Locations[Math.floor(Math.random() * Locations.length)]
        //     var datas = ShareAd.getADVs(adLocationID, function (datas: Array<any>) {
        //         if (datas) {
        //             let rd = Math.floor(datas.length * Math.random());
        //             let data = datas[rd];
        //             console.log("跳转游戏： " + data.title);
        //             WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
        //                 console.log("跳转成功")
        //                 ShareAd.reportUserClick(data.appid);
        //                 ALD.aldSendReportAdClickSuccess(data);
        //             }, (res) => {
        //                 console.log("跳转失败")
        //                 EventMgr.instance.dispatch(EventDef.AD_OnShareAdFail);
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

    public static isNeedShowAd() : boolean
    {
        // if(0 == AppSwitchConfig.getInstance().getAppSwitchData().adSwitch)
        //     return false;
        // if(Laya.Browser.onQGMiniGame)
        // {
        //     if(AppSwitchConfig.getInstance().getAppSwitchData().oppocfg.oppoversions != AppConfig.Versions)
        //     {
        //         return false;
        //     }
        // }
        // var mailiang = AppSwitchConfig.getInstance().getAppSwitchData().mailiang;
        // var mailianglist = AppSwitchConfig.getInstance().getAppSwitchData().mailianglist;
        // var mailiangscenelist = AppSwitchConfig.getInstance().getAppSwitchData().mailiangSceneList;
        // if(1 == mailiang)
        // {
        //     var flag : number = null;
        //     var scene : number = null;
        //     if(Laya.Browser.onMiniGame)
        //     {
        //         flag = WXAPI.getLaunchOptionsSync().query['chid'];
        //         scene  = WXAPI.getLaunchOptionsSync().scene;             
        //     }
        //     else if(Laya.Browser.onQQMiniGame)
        //     {
        //         flag  = QQMiniGameAPI.getLaunchOptionsSync().query['chid'];
        //         scene  = QQMiniGameAPI.getLaunchOptionsSync().scene;
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

    public static sortDatas(datas: any): any 
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
        let res = new Array<any>();
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
        return res;
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