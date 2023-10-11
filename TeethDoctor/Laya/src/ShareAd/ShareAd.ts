import { reques_XYXZS_tData } from "../Net/HttpUnit";
import App_XYXZS_Config from "../AppConfig";
import Us_XYXZS_er from "../User/User";
import Uti_XYXZS_lit from "../Utilit";
import A_XYXZS_LD from "../ALD";
import W_XYXZS_XAPI from "../WXAPI";
import Even_XYXZS_tMgr from "../Event/EventMgr";
import { Even_XYXZS_tDef } from "../Event/EventDef";
import AppSwi_XYXZS_tchConfig from "../Config/AppSwitchConfig";
import QQMini_XYXZS_GameAPI from "../QQMiniGameAPI";




export default class Shar_XYXZS_eAd 
{
    public static readonly mai_XYXZS_nUrl = "";
    public static readonly getA_XYXZS_dPostion = "";//获取广告位列表
    public static readonly get_XYXZS_Adv = "";//获取第三方广告列表
    public static readonly use_XYXZS_rClick = "";//用户点击上报

    public static readonly LoopA_XYXZS_dLocationID = 270;
    public static readonly Banner_XYXZS_AdLocationID = 272;
    public static readonly Insert_XYXZS_AdLocationID = 271;
    public static readonly AniAd_XYXZS_LocationID = -1;
    public static readonly Histo_XYXZS_ryLocationID = 273;
    
    public static UseRa_XYXZS_ndomAdPos : boolean = false;
    public static readonly AdLoca_XYXZS_tionids : Array<number> =
    [
        
    ]

    protected static _adP_XYXZS_osition : any = {}
    protected static _a_XYXZS_dv : any = {}

    public static _iphon_XYXZS_eIgnoreAppIds = 
    [
    ]

    public static refr_XYXZS_eshAd(complate : Function)
    {
        // Shar_XYXZS_eAd.getAd_XYXZS_PosData((res)=>{
        //     if(1 == res.code)
        //     {
        //         console.log("获取分享广告数据成功");
        //         Shar_XYXZS_eAd._adP_XYXZS_osition = res.result;
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

    public static ge_XYXZS_tADVs(locationid,complate : Function,useRandom? : boolean,useLocalRandom? : boolean,randomEveryTime : boolean=true)
    {
        // if(!Shar_XYXZS_eAd.isNee_XYXZS_dShowAd())
        // {
        //     complate(null);
        //     return;
        // }
        // useRandom = null == useRandom ? Shar_XYXZS_eAd.UseRa_XYXZS_ndomAdPos : useRandom;
        // useLocalRandom =  null == useLocalRandom ? true : useRandom;
        // if(useRandom)
        // {
        //     locationid = Shar_XYXZS_eAd.getRand_XYXZS_omADPosID();
        // }
        // var datas = Shar_XYXZS_eAd._a_XYXZS_dv[locationid];
        // if(datas)
        // {
        //     if(randomEveryTime){
        //         for (var i = datas.length - 1; i >= 0; --i)  
        //         {
        //             let dataRandom = datas.concat();
        //             var randomIndex = Math.floor(Math.random() * dataRandom.length);
        //             var curValue = dataRandom[i];
        //             var randomValue = dataRandom[randomIndex];
        //             dataRandom[randomIndex] = curValue;
        //             dataRandom[i] = randomValue;
        //             complate(dataRandom);
        //         }
        //     }
        //     else{
        //         complate(datas);
        //     }
        // }
        // else
        // {
        //     var self = Shar_XYXZS_eAd;
        //     Shar_XYXZS_eAd.getA_XYXZS_DVData(locationid,(res)=>
        //     {
        //         if(1 == res.code)
        //         {
        //             Shar_XYXZS_eAd._a_XYXZS_dv[locationid] = res.result;
        //             datas = Shar_XYXZS_eAd._a_XYXZS_dv[locationid];
        //             if(datas && Uti_XYXZS_lit.isI_XYXZS_phone())
        //             {
        //                 for(var i=0;i< datas.length;++i)
        //                 {
        //                     var data = datas[i];
        //                     for(var j=0;j < Shar_XYXZS_eAd._iphon_XYXZS_eIgnoreAppIds.length;++j)
        //                     {
        //                         if(data.appid == Shar_XYXZS_eAd._iphon_XYXZS_eIgnoreAppIds[j])
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
        //                 datas = self.sort_XYXZS_Datas(datas);
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

    public static reportUs_XYXZS_erClick(advid)
    {
        // Shar_XYXZS_eAd.reqUs_XYXZS_erClick(advid,(res)=>
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

    public static getRand_XYXZS_omADPosID() : number
    {
        return Shar_XYXZS_eAd.AdLoca_XYXZS_tionids[Math.floor(Math.random() * Shar_XYXZS_eAd.AdLoca_XYXZS_tionids.length)]
    }

    protected static req_XYXZS_uest(req : reques_XYXZS_tData) {
        // if (req.u_XYXZS_rl.indexOf("https://") > -1 ||
        //     req.u_XYXZS_rl.indexOf("http://") > -1) {
        //     req.u_XYXZS_rl = req.u_XYXZS_rl;
        // } else {
        //     req.u_XYXZS_rl = Shar_XYXZS_eAd.mai_XYXZS_nUrl + req.u_XYXZS_rl;
        // }
        // var completeFunc = (res) => {
        //     console.log(res,"http Success")
        //     res = JSON.parse(res);
        //     if (req.on_XYXZS_Success) {
        //         req.on_XYXZS_Success(res);
        //     }
        //     req.on_XYXZS_Success = null;
        //     req = null;
        // };
        // var errorFunc = (res) => {
        //     console.log(res,"http fail")
        //     if (req.onF_XYXZS_ail)  {
        //         req.onF_XYXZS_ail(res);
        //     }
        //     req.onF_XYXZS_ail = null;
        //     req = null;
        // };

        // var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        // xhr.once(Laya.Event.COMPLETE, Shar_XYXZS_eAd, completeFunc);
        // xhr.once(Laya.Event.ERROR, Shar_XYXZS_eAd, errorFunc);


        // if(req.m_XYXZS_eth == "get")
        // {
        //     var para = "";
        //     for(const key of Object.keys(req.da_XYXZS_ta)) 
        //     {
        //         var value = req.da_XYXZS_ta[key];
        //         para +=  key + "=" + value + "&";
        //     }
        //     req.u_XYXZS_rl = req.u_XYXZS_rl + "?" + para;
        //     var header =
        //         [
        //             "versions", App_XYXZS_Config.Ver_XYXZS_sions,
        //         ]
        //     xhr.send(req.u_XYXZS_rl,null,req.m_XYXZS_eth,null,header);
        // }
        // else
        // {
        //     var para = "";
        //     for(const key of Object.keys(req.da_XYXZS_ta)) 
        //     {
        //         var value = req.da_XYXZS_ta[key];
        //         para +=  key + "=" + value + "&";
        //     }
        //     var header =
        //         [
        //             "Content-Type", "application/x-www-form-urlencoded",
        //             "versions", App_XYXZS_Config.Ver_XYXZS_sions,
        //         ]
        //     xhr.send(req.u_XYXZS_rl,para,req.m_XYXZS_eth,null,header);
        // }
    }

    protected static getAd_XYXZS_PosData(onSuccess : Function,onFail : Function)
    {
        // var req = new reques_XYXZS_tData();
        // req.u_XYXZS_rl = Shar_XYXZS_eAd.getA_XYXZS_dPostion;
        // req.on_XYXZS_Success = onSuccess;
        // req.onF_XYXZS_ail = onFail;
        // req.da_XYXZS_ta.softid = App_XYXZS_Config.Ap_XYXZS_pID;
        // req.m_XYXZS_eth = "get";
        // Shar_XYXZS_eAd.req_XYXZS_uest(req);
    }

    protected static reqUs_XYXZS_erClick(advid,onSuccess : Function,onFail : Function)
    {
        // var req = new reques_XYXZS_tData();
        // req.u_XYXZS_rl = Shar_XYXZS_eAd.use_XYXZS_rClick;
        // req.on_XYXZS_Success = onSuccess;
        // req.onF_XYXZS_ail = onFail;

        // req.da_XYXZS_ta.softid = App_XYXZS_Config.Ap_XYXZS_pID;
        // req.da_XYXZS_ta.uid  = Us_XYXZS_er.o_XYXZS_penId;
        // req.da_XYXZS_ta.advid  = advid ;

        // Shar_XYXZS_eAd.req_XYXZS_uest(req);
    }

    protected static getA_XYXZS_DVData(locationid,onSuccess : Function,onFail : Function)
    {
        // var req = new reques_XYXZS_tData();
        // req.u_XYXZS_rl = Shar_XYXZS_eAd.get_XYXZS_Adv;
        // req.on_XYXZS_Success = onSuccess;
        // req.onF_XYXZS_ail = onFail;
        // req.da_XYXZS_ta.softid = App_XYXZS_Config.Ap_XYXZS_pID;
        // req.da_XYXZS_ta.locationid = locationid;
        // req.da_XYXZS_ta.preview = 0;
        // Shar_XYXZS_eAd.req_XYXZS_uest(req);
    }


/**
     * 随机跳转的方法，会从广告列表中随机得到一个AppId并且跳转,输入的参数为概率，大小在0-1之间
     * 如果概率大于1，则自动将其除以100，所以千万注意！
     * 
     * @static
     * @param {number} [rate=1] 
     * @memberof ShareAd
     */
    public static Rando_XYXZS_mJump(rate: number = 1) 
    {
        // console.log("随机跳转,rate：" + rate);
        // if (rate > 1) {
        //     rate = rate / 100;
        // }
        // let rd = Math.random();
        // if (rd <= rate) {
        //     var adLocationID = Shar_XYXZS_eAd.LoopA_XYXZS_dLocationID;
        //     var Locations = 
        //     [
        //         Shar_XYXZS_eAd.LoopA_XYXZS_dLocationID, 
        //         Shar_XYXZS_eAd.Insert_XYXZS_AdLocationID, 
        //         Shar_XYXZS_eAd.Banner_XYXZS_AdLocationID,
        //         Shar_XYXZS_eAd.AniAd_XYXZS_LocationID,
        //     ]
        //     if(Shar_XYXZS_eAd.UseRa_XYXZS_ndomAdPos)
        //     {
        //         for(var i=0;i < Shar_XYXZS_eAd.AdLoca_XYXZS_tionids.length;++i)
        //         {
        //             Locations.push(Shar_XYXZS_eAd.AdLoca_XYXZS_tionids[i]);
        //         }
        //     }
        //     adLocationID = Locations[Math.floor(Math.random() * Locations.length)]
        //     var datas = Shar_XYXZS_eAd.ge_XYXZS_tADVs(adLocationID, function (datas: Array<any>) {
        //         if (datas) {
        //             let rd = Math.floor(datas.length * Math.random());
        //             let data = datas[rd];
        //             console.log("跳转游戏： " + data.title);
        //             W_XYXZS_XAPI.navigateT_XYXZS_oMiniProgram(data.appid, data.url, (res) => {
        //                 console.log("跳转成功")
        //                 Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
        //                 A_XYXZS_LD.aldSend_XYXZS_ReportAdClickSuccess(data);
        //             }, (res) => {
        //                 console.log("跳转失败")
        //                 Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
        //                 if (res.errMsg == "navigateToMiniProgram:fail cancel") {
        //                     console.log("用户取消跳转");
        //                     A_XYXZS_LD.aldSend_XYXZS_ReportAdClickFail(data);
        //                 }
        //             }, (res) => {
        //                 console.log("跳转完成")
        //             });
        //         }
        //     }, true);
        // }
    }

    public static isNee_XYXZS_dShowAd() : boolean
    {
        // if(0 == AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().adSw_XYXZS_itch)
        //     return false;
        // var mailiang = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().mai_XYXZS_liang;
        // var mailianglist = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().mail_XYXZS_ianglist;
        // var mailiangscenelist = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().mailia_XYXZS_ngSceneList;
        // if(1 == mailiang)
        // {
        //     var flag : number = null;
        //     var scene : number = null;
        //     if(Laya.Browser.onMiniGame)
        //     {
        //         flag = W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync().query['chid'];
        //         scene  = W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync().scene;             
        //     }
        //     else if(Laya.Browser.onQQMiniGame)
        //     {
        //         flag  = QQMini_XYXZS_GameAPI.getLaunc_XYXZS_hOptionsSync().query['chid'];
        //         scene  = QQMini_XYXZS_GameAPI.getLaunc_XYXZS_hOptionsSync().scene;
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
        return false;
    }

    public static sort_XYXZS_Datas(datas: any): any 
    {
        // if(null == datas || 0 == datas.length)
        //     return [];
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
        return [];
    }
}