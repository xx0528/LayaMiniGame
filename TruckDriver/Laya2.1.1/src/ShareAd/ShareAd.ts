import { request_ppxhc_Data } from "../Net/HttpUnit";
import App_ppxhc_Config from "../AppConfig";
import User_ppxhc from "../User/User";
import Utilit_ from "../Utilit";
import ALD_ppxhc from "../ALD";
import WXAPI_ from "../WXAPI";
import Event_ppxhc_Mgr from "../Event/EventMgr";
import { Event_ppxhc_Def } from "../Event/EventDef";
import AppSwitchConfig from "../Config/AppSwitchConfig";
import QQMiniGame_ppxhc_API from "../QQMiniGameAPI";




export default class Share_ppxhc_Ad 
{
    public static readonly mainUrl_ = "";
    public static readonly getAdPostion_ = "";//获取广告位列表
    public static readonly getAdv = "";//获取第三方广告列表
    public static readonly userClick = "";//用户点击上报

    public static readonly LoopAdLocationID_ = 315;//广告轮播
    public static readonly BannerAdLocationID_ = 312;
    public static readonly InsertAdLocationID_ = 314;//更多好玩
    public static readonly AniAdLocationID = -1;//序列帧
    public static readonly HistoryLocationID_ = 313;
    public static readonly MoreGameLocationID = 314;
    
    public static UseRandomAdPos_ : boolean = true;
    public static readonly AdLocationids : Array<number> =
    [
        315
    ]

    protected static _adPosition : any = {}
    protected static _adv : any = {}

    public static _iphoneIgnoreAppIds = 
    [
    ]

    public static refreshAd_(complate : Function)
    {
        // Share_ppxhc_Ad.getAdPosData_((res)=>{
        //     if(1 == res.code)
        //     {
        //         console.log("获取分享广告数据成功");
        //         Share_ppxhc_Ad._adPosition = res.result;
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

    public static getADVs_(locationid,complate : Function,useRandom? : boolean,useLocalRandom? : boolean,sortDatas? : Function)
    {
        // if(!Share_ppxhc_Ad.isNeedShowAd())
        // {
        //     complate(null);
        //     return;
        // }

        // useRandom = null == useRandom ? this.UseRandomAdPos_ : useRandom;
        // useLocalRandom =  null == useLocalRandom ? true : useLocalRandom;
        // if(useRandom)
        // {
        //     locationid = Share_ppxhc_Ad.getRandomADPosID_();
        // }
        // var datas = Share_ppxhc_Ad._adv[locationid];
        // if(datas)
        // {
        //     if(useLocalRandom)
        //     {
        //         if(null == sortDatas)
        //         {
        //             datas = this.sortDatas_(datas);
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
        //     var self = Share_ppxhc_Ad;
        //     Share_ppxhc_Ad.getADVData_(locationid,(res)=>
        //     {
        //         if(1 == res.code)
        //         {
        //             Share_ppxhc_Ad._adv[locationid] = res.result;
        //             datas = Share_ppxhc_Ad._adv[locationid];
        //             if(datas && Utilit_.isIphone_())
        //             {
        //                 for(var i=0;i< datas.length;++i)
        //                 {
        //                     var data = datas[i];
        //                     for(var j=0;j < Share_ppxhc_Ad._iphoneIgnoreAppIds.length;++j)
        //                     {
        //                         if(data.appid == Share_ppxhc_Ad._iphoneIgnoreAppIds[j])
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
        //                     datas = self.sortDatas_(datas);
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

    public static reportUserClick_(advid)
    {
        // Share_ppxhc_Ad.reqUserClick_(advid,(res)=>
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

    public static getRandomADPosID_() : number
    {
        return Share_ppxhc_Ad.AdLocationids[Math.floor(Math.random() * Share_ppxhc_Ad.AdLocationids.length)]
    }

    protected static request_(req : request_ppxhc_Data) {
        // if (req.url.indexOf("https://") > -1 ||
        //     req.url.indexOf("http://") > -1) {
        //     req.url = req.url;
        // } else {
        //     req.url = Share_ppxhc_Ad.mainUrl_ + req.url;
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
        // xhr.once(Laya.Event.COMPLETE, Share_ppxhc_Ad, completeFunc);
        // xhr.once(Laya.Event.ERROR, Share_ppxhc_Ad, errorFunc);


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
        //             "versions", App_ppxhc_Config.ppxhc_Versions,
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
        //             "versions", App_ppxhc_Config.ppxhc_Versions,
        //         ]
        //     xhr.send(req.url,para,req.meth,null,header);
        // }
    }

    protected static getAdPosData_(onSuccess : Function,onFail : Function)
    {
        // var req = new request_ppxhc_Data();
        // req.url = Share_ppxhc_Ad.getAdPostion_;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = App_ppxhc_Config.App_ppxhc_ID;
        // req.meth = "get";
        // Share_ppxhc_Ad.request_(req);
    }

    protected static reqUserClick_(advid,onSuccess : Function,onFail : Function)
    {
        // var req = new request_ppxhc_Data();
        // req.url = Share_ppxhc_Ad.userClick;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;

        // req.data.softid = App_ppxhc_Config.App_ppxhc_ID;
        // req.data.uid  = User_ppxhc.openId;
        // req.data.advid  = advid ;

        // Share_ppxhc_Ad.request_(req);
    }

    protected static getADVData_(locationid,onSuccess : Function,onFail : Function)
    {
        // var req = new request_ppxhc_Data();
        // req.url = Share_ppxhc_Ad.getAdv;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = App_ppxhc_Config.App_ppxhc_ID;
        // req.data.locationid = locationid;
        // req.data.preview = 0;
        // Share_ppxhc_Ad.request_(req);
    }


/**
     * 随机跳转的方法，会从广告列表中随机得到一个AppId并且跳转,输入的参数为概率，大小在0-1之间
     * 如果概率大于1，则自动将其除以100，所以千万注意！
     * 
     * @static
     * @param {number} [rate=1] 
     * @memberof ShareAd
     */
    public static RandomJump_(rate: number = 1) 
    {
        // console.log("随机跳转,rate：" + rate);
        // if (rate > 1) {
        //     rate = rate / 100;
        // }
        // let rd = Math.random();
        // if (rd <= rate) {
        //     var adLocationID = Share_ppxhc_Ad.LoopAdLocationID_;
        //     var Locations = 
        //     [
        //         Share_ppxhc_Ad.LoopAdLocationID_, 
        //         Share_ppxhc_Ad.InsertAdLocationID_, 
        //         Share_ppxhc_Ad.BannerAdLocationID_,
        //         Share_ppxhc_Ad.AniAdLocationID,
        //     ]
        //     if(Share_ppxhc_Ad.UseRandomAdPos_)
        //     {
        //         for(var i=0;i < Share_ppxhc_Ad.AdLocationids.length;++i)
        //         {
        //             Locations.push(Share_ppxhc_Ad.AdLocationids[i]);
        //         }
        //     }
        //     adLocationID = Locations[Math.floor(Math.random() * Locations.length)]
        //     var datas = Share_ppxhc_Ad.getADVs_(adLocationID, function (datas: Array<any>) {
        //         if (datas) {
        //             let rd = Math.floor(datas.length * Math.random());
        //             let data = datas[rd];
        //             console.log("跳转游戏： " + data.title);
        //             WXAPI_.navigateToMiniProgram_(data.appid, data.url, (res) => {
        //                 console.log("跳转成功")
        //                 Share_ppxhc_Ad.reportUserClick_(data.appid);
        //                 ALD_ppxhc.aldSendReportAdClickSuccess(data);
        //             }, (res) => {
        //                 console.log("跳转失败")
        //                 Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.AD_OnShareAdFail);
        //                 if (res.errMsg == "navigateToMiniProgram:fail cancel") {
        //                     console.log("用户取消跳转");
        //                     ALD_ppxhc.aldSendReportAdClickFail(data);
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
        //     if(AppSwitchConfig.getInstance().getAppSwitchData().oppocfg.oppoversions != App_ppxhc_Config.ppxhc_Versions)
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
        //         flag = WXAPI_.getLaunchOptionsSync().query['chid'];
        //         scene  = WXAPI_.getLaunchOptionsSync().scene;             
        //     }
        //     else if(Laya.Browser.onQQMiniGame)
        //     {
        //         flag  = QQMiniGame_ppxhc_API.getLaunchOptionsSync().query['chid'];
        //         scene  = QQMiniGame_ppxhc_API.getLaunchOptionsSync().scene;
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

    public static sortDatas_(datas: any): any 
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