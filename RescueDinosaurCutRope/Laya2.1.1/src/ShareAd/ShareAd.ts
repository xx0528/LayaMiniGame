import { reques_JJKLBB_tData } from "../Net/HttpUnit";
import AppC_JJKLBB_onfig from "../AppConfig";
import Us_JJKLBB_er from "../User/User";
import Util_JJKLBB_it from "../Utilit";
import A_JJKLBB_LD from "../ALD";
import WXAPI from "../WXAPI";
import Even_JJKLBB_tMgr from "../Event/EventMgr";
import { Event_JJKLBB_Def } from "../Event/EventDef";
import AppSwitch_JJKLBB_Config from "../Config/AppSwitchConfig";




export default class Shar_JJKLBB_eAd 
{
    public static readonly mai_JJKLBB_nUrl = "";
    public static readonly getAdP_JJKLBB_ostion = "";//获取广告位列表
    public static readonly getA_JJKLBB_dv = "";//获取第三方广告列表
    public static readonly userC_JJKLBB_lick = "";//用户点击上报

    public static readonly LoopAd_JJKLBB_LocationID = 184;
    public static readonly BannerAdL_JJKLBB_ocationID = 186;
    public static readonly Insert_JJKLBB_AdLocationID = 185;
    public static readonly AniAdLoca_JJKLBB_tionID = 187;
    
    public static UseRando_JJKLBB_mAdPos : boolean = false;
    public static readonly AdLoc_JJKLBB_ationids : Array<number> = 
    [

    ]

    protected static _adPo_JJKLBB_sition : any = {}
    protected static _adv : any = {}

    public static _iphoneIgn_JJKLBB_oreAppIds = 
    [
        ""
    ]

    public static refres_JJKLBB_hAd(complate : Function)
    {
        // Shar_JJKLBB_eAd.getAdP_JJKLBB_osData((res)=>{
        //     if(1 == res.code)
        //     {
        //         console.log("获取分享广告数据成功");
        //         Shar_JJKLBB_eAd._adPo_JJKLBB_sition = res.result;
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

    public static get_JJKLBB_ADVs(locationid,complate : Function,useRandom? : boolean,useLocalRandom? : boolean,sortDatas? : Function)
    {
        // if(!Shar_JJKLBB_eAd.isNeed_JJKLBB_ShowAd())
        // {
        //     complate(null);
        //     return;
        // }
        // useRandom = null == useRandom ? Shar_JJKLBB_eAd.UseRando_JJKLBB_mAdPos : useRandom;
        // useLocalRandom =  null != useLocalRandom ? useLocalRandom : true;
        // if(useRandom)
        // {
        //     locationid = Shar_JJKLBB_eAd.getRand_JJKLBB_omADPosID();
        // }
        // var datas = Shar_JJKLBB_eAd._adv[locationid];
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
        //     Shar_JJKLBB_eAd.getADV_JJKLBB_Data(locationid,(res)=>
        //     {
        //         if(locationid==187){
        //             console.log(1)
        //         }
        //         if(1 == res.code)
        //         {
        //             Shar_JJKLBB_eAd._adv[locationid] = res.result;
        //             datas = Shar_JJKLBB_eAd._adv[locationid];
        //             if(datas && Util_JJKLBB_it.isIp_JJKLBB_hone())
        //             {
        //                 for(var i=0;i< datas.length;++i)
        //                 {
        //                     var data = datas[i];
        //                     for(var j=0;j < Shar_JJKLBB_eAd._iphoneIgn_JJKLBB_oreAppIds.length;++j)
        //                     {
        //                         if(data.appid == Shar_JJKLBB_eAd._iphoneIgn_JJKLBB_oreAppIds[j])
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

    public static reportUs_JJKLBB_erClick(advid)
    {
        // Shar_JJKLBB_eAd.reqUse_JJKLBB_rClick(advid,(res)=>
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

    public static getRand_JJKLBB_omADPosID() : number
    {
        return Shar_JJKLBB_eAd.AdLoc_JJKLBB_ationids[Math.floor(Math.random() * Shar_JJKLBB_eAd.AdLoc_JJKLBB_ationids.length)]
    }

    protected static req_JJKLBB_uest(req : reques_JJKLBB_tData) {
        // if (req.url.indexOf("https://") > -1 ||
        //     req.url.indexOf("http://") > -1) {
        //     req.url = req.url;
        // } else {
        //     req.url = Shar_JJKLBB_eAd.mai_JJKLBB_nUrl + req.url;
        // }
        // var completeFunc = (res) => {
        //     // console.log(res,"http Success")
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
        // xhr.once(Laya.Event.COMPLETE, Shar_JJKLBB_eAd, completeFunc);
        // xhr.once(Laya.Event.ERROR, Shar_JJKLBB_eAd, errorFunc);


        // if(req.me_JJKLBB_th == "get")
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
        //             "versions", AppC_JJKLBB_onfig.Ver_JJKLBB_sions,
        //         ]
        //     xhr.send(req.url,null,req.me_JJKLBB_th,null,header);
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
        //             "versions", AppC_JJKLBB_onfig.Ver_JJKLBB_sions,
        //         ]
        //     xhr.send(req.url,para,req.me_JJKLBB_th,null,header);
        // }
    }

    protected static getAdP_JJKLBB_osData(onSuccess : Function,onFail : Function)
    {
        // var req = new reques_JJKLBB_tData();
        // req.url = Shar_JJKLBB_eAd.getAdP_JJKLBB_ostion;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = AppC_JJKLBB_onfig.Ap_JJKLBB_pID;
        // req.me_JJKLBB_th = "get";
        // Shar_JJKLBB_eAd.req_JJKLBB_uest(req);
    }

    protected static reqUse_JJKLBB_rClick(advid,onSuccess : Function,onFail : Function)
    {
        // var req = new reques_JJKLBB_tData();
        // req.url = Shar_JJKLBB_eAd.userC_JJKLBB_lick;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;

        // req.data.softid = AppC_JJKLBB_onfig.Ap_JJKLBB_pID;
        // req.data.uid  = Us_JJKLBB_er.open_JJKLBB_Id;
        // req.data.advid  = advid ;

        // Shar_JJKLBB_eAd.req_JJKLBB_uest(req);
    }

    protected static getADV_JJKLBB_Data(locationid,onSuccess : Function,onFail : Function)
    {
        // var req = new reques_JJKLBB_tData();
        // req.url = Shar_JJKLBB_eAd.getA_JJKLBB_dv;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = AppC_JJKLBB_onfig.Ap_JJKLBB_pID;
        // req.data.locationid = locationid;
        // req.data.preview = 0;
        // Shar_JJKLBB_eAd.req_JJKLBB_uest(req);
    }


/**
     * 随机跳转的方法，会从广告列表中随机得到一个AppId并且跳转,输入的参数为概率，大小在0-1之间
     * 如果概率大于1，则自动将其除以100，所以千万注意！
     * 
     * @static
     * @param {number} [rate=1] 
     * @memberof ShareAd
     */
    public static Rando_JJKLBB_mJump(rate: number = 1) 
    {
        // console.log("随机跳转,rate：" + rate);
        // if (rate > 1) {
        //     rate = rate / 100;
        // }
        // let rd = Math.random();
        // if (rd <= rate) {
        //     var adLocationID = Shar_JJKLBB_eAd.LoopAd_JJKLBB_LocationID;
        //     var Locations = 
        //     [
        //         Shar_JJKLBB_eAd.LoopAd_JJKLBB_LocationID, 
        //         Shar_JJKLBB_eAd.Insert_JJKLBB_AdLocationID, 
        //         Shar_JJKLBB_eAd.BannerAdL_JJKLBB_ocationID,
        //         Shar_JJKLBB_eAd.AniAdLoca_JJKLBB_tionID,
        //     ]
        //     if(Shar_JJKLBB_eAd.UseRando_JJKLBB_mAdPos)
        //     {
        //         for(var i=0;i < Shar_JJKLBB_eAd.AdLoc_JJKLBB_ationids.length;++i)
        //         {
        //             Locations.push(Shar_JJKLBB_eAd.AdLoc_JJKLBB_ationids[i]);
        //         }
        //     }
        //     adLocationID = Locations[Math.floor(Math.random() * Locations.length)]
        //     var datas = Shar_JJKLBB_eAd.get_JJKLBB_ADVs(adLocationID, function (datas: Array<any>) {
        //         if (datas) {
        //             let rd = Math.floor(datas.length * Math.random());
        //             let data = datas[rd];
        //             console.log("跳转游戏： " + data.title);
        //             WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
        //                 console.log("跳转成功")
        //                 Shar_JJKLBB_eAd.reportUs_JJKLBB_erClick(data.appid);
        //                 A_JJKLBB_LD.aldSendReportA_JJKLBB_dClickSuccess(data);
        //             }, (res) => {
        //                 console.log("跳转失败")
        //                 Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
        //                 if (res.errMsg == "navigateToMiniProgram:fail cancel") {
        //                     console.log("用户取消跳转");
        //                     A_JJKLBB_LD.aldSendRepo_JJKLBB_rtAdClickFail(data);
        //                 }
        //             }, (res) => {
        //                 console.log("跳转完成")
        //             });
        //         }
        //     }, true);
        // }
    }

    public static isNeed_JJKLBB_ShowAd() : boolean
    {
        // var adSwitch = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().adS_JJKLBB_witch;
        // if(adSwitch == 0) return false;
        // var mailiang = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().maili_JJKLBB_ang;
        // var mailianglist = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().mailia_JJKLBB_nglist;
        // var mailiangscenelist = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().mailiangSceneList;
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
        //         var scene : number = WXAPI.getLaunchOptionsSync().scene
        //         if(null != scene && null != mailiangscenelist && mailiangscenelist.length > 0)
        //         {
        //             for(var i=0;i < mailiangscenelist.length;++i)
        //             {
        //                 if(scene == mailiangscenelist[i])
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

    public static sortDatas(datas: any): any 
    {
        // var dataDic: { [appid: string]: any[] } = {};
        // var dataArray: any[] = new Array();
        // for (var i = 0; i < datas.length; ++i)  {
        //     var data = datas[i];
        //     if (dataDic[data.appid] == null) {
        //         dataDic[data.appid] = new Array();
        //         dataDic[data.appid].push(data);
        //         dataArray.push(dataDic[data.appid]);
        //     } else {
        //         dataDic[data.appid].push(data);
        //     }
        // }
        // //从大到小排序
        // for (let i = 0; i < dataArray.length; i++) {
        //     for (let j = i + 1; j < dataArray.length; j++) {
        //         if (dataArray[i].length < dataArray[j].length) {
        //             let d = dataArray[j];
        //             dataArray[j] = dataArray[i];
        //             dataArray[i] = d;
        //         }
        //     }
        // }
        // //重新分组
        // var groupArray: any[] = new Array();
        // for (let i = 0; i < dataArray[0].length; i++) {
        //     groupArray[i] = new Array();
        //     for (let j = 0; j < dataArray.length; j++) {
        //         if (dataArray[j].length > i) {
        //             groupArray[i].push(dataArray[j][i]);
        //         }
        //     }
        //     // //组内打乱            
        //     // groupArray[i].sort(() => { return 0.5 - Math.random() })
        // }
        // //打乱分组
        // // groupArray.sort(() => { return 0.5 - Math.random() });
        // var res: any[] = new Array();
        // for (let i = 0; i < groupArray.length; i++) {
        //     for (let j = 0; j < groupArray[i].length; j++) {
        //         res.push(groupArray[i][j])
        //     }
        // }
        // return res;
    }
}