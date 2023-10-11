import { request_wcjtn_Data } from "../Net/HttpUnit";
import App_wcjtn_Config from "../AppConfig";
import User_wcjtn_ from "../User/User";
import Utilit_wcjtn_ from "../Utilit";
import ALD from "../ALD";
import WX_wcjtn_API from "../WXAPI";
import Event_wcjtn_Mgr from "../Event/EventMgr";
import { Event_wcjtn_Def } from "../Event/EventDef";
import App_wcjtn_Switch_wcjtn_Config from "../Config/AppSwitchConfig";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "../QQMiniGameAPI";




export default class _wcjtn_ShareAd_wcjtn_ 
{
    public static readonly main_wcjtn_Url = "https://swwww.mrkzx.cn";
    public static readonly get_wcjtn_AdPostion = "/v1.1/api/getAdPosition.html";//获取广告位列表
    public static readonly get_wcjtn_Adv = "/v1.1/api/getAdv.html";//获取第三方广告列表
    public static readonly user_wcjtn_Click = "/v1.1/api/userclick.html";//用户点击上报

    public static readonly LoopAd_wcjtn_LocationID = 324;
    public static readonly Banner_wcjtn_AdLocationID = 327;
    public static readonly Insert_wcjtn_AdLocationID = -1;
    public static readonly AniAd_wcjtn_LocationID = -1;
    public static readonly History_wcjtn_LocationID = 325;
    public static readonly MoreGame_wcjtn_LocationID = 326;    

    
    public static Use_wcjtn_Random_wcjtn_AdPos : boolean = true;
    public static readonly Ad_wcjtn_Locationids : Array<number> =
    [
        326,324
    ]

    protected static _ad_wcjtn_Position : any = {}
    protected static _adv_wcjtn_ : any = {}

    public static _iphone_wcjtn_Ignore_wcjtn_AppIds = 
    [
        "",
        ""
    ]

    public static refresh_wcjtn_Ad(complate : Function)
    {
        _wcjtn_ShareAd_wcjtn_.get_wcjtn_Ad_wcjtn_PosData((res)=>{
            if(1 == res.code)
            {
                console.log("获取分享广告数据成功");
                _wcjtn_ShareAd_wcjtn_._ad_wcjtn_Position = res.result;
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

    public static get_wcjtn_ADVs(locationid,complate : Function,useRandom? : boolean,useLocalRandom? : boolean,sortDatas? : Function)
    {
        if(!_wcjtn_ShareAd_wcjtn_.isNeed_wcjtn_ShowAd())
        {
            complate(null);
            return;
        }
        useRandom = null == useRandom ? _wcjtn_ShareAd_wcjtn_.Use_wcjtn_Random_wcjtn_AdPos : useRandom;
        useLocalRandom =  null == useLocalRandom ? true : useLocalRandom;
        if(useRandom)
        {
            locationid = _wcjtn_ShareAd_wcjtn_.get_wcjtn_Random_wcjtn_ADPosID();
        }
        var datas = _wcjtn_ShareAd_wcjtn_._adv_wcjtn_[locationid];
        if(datas)
        {
            if(useLocalRandom)
            {
                if(null == sortDatas)
                {
                    datas = this.sort_wcjtn_Datas(datas);
                }
                else
                {
                    datas = sortDatas(datas);
                }
            }
            complate(datas)
        }
        else
        {
            var self = _wcjtn_ShareAd_wcjtn_;
            _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADV_wcjtn_Data(locationid,(res)=>
            {
                if(1 == res.code)
                {
                    _wcjtn_ShareAd_wcjtn_._adv_wcjtn_[locationid] = res.result;
                    datas = _wcjtn_ShareAd_wcjtn_._adv_wcjtn_[locationid];
                    if(datas && Utilit_wcjtn_.is_wcjtn_Iphone())
                    {
                        for(var i=0;i< datas.length;++i)
                        {
                            var data = datas[i];
                            for(var j=0;j < _wcjtn_ShareAd_wcjtn_._iphone_wcjtn_Ignore_wcjtn_AppIds.length;++j)
                            {
                                if(data.appid == _wcjtn_ShareAd_wcjtn_._iphone_wcjtn_Ignore_wcjtn_AppIds[j])
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
                        if(null == sortDatas)
                        {
                            datas = self.sort_wcjtn_Datas(datas);
                        }
                        else
                        {
                            datas = sortDatas(datas);
                        }
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

    public static report_wcjtn_User_wcjtn_Click(advid)
    {
        _wcjtn_ShareAd_wcjtn_.req_wcjtn_User_wcjtn_Click(advid,(res)=>
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

    public static get_wcjtn_Random_wcjtn_ADPosID() : number
    {
        return _wcjtn_ShareAd_wcjtn_.Ad_wcjtn_Locationids[Math.floor(Math.random() * _wcjtn_ShareAd_wcjtn_.Ad_wcjtn_Locationids.length)]
    }

    protected static request_wcjtn_(req : request_wcjtn_Data) {
        if (req.url_wcjtn_.indexOf("https://") > -1 ||
            req.url_wcjtn_.indexOf("http://") > -1) {
            req.url_wcjtn_ = req.url_wcjtn_;
        } else {
            req.url_wcjtn_ = _wcjtn_ShareAd_wcjtn_.main_wcjtn_Url + req.url_wcjtn_;
        }
        var completeFunc = (res) => {
            console.log(res,"http Success")
            res = JSON.parse(res);
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
        xhr.once(Laya.Event.COMPLETE, _wcjtn_ShareAd_wcjtn_, completeFunc);
        xhr.once(Laya.Event.ERROR, _wcjtn_ShareAd_wcjtn_, errorFunc);


        if(req.meth_wcjtn_ == "get")
        {
            var para = "";
            for(const key of Object.keys(req._wcjtn_data_wcjtn_)) 
            {
                var value = req._wcjtn_data_wcjtn_[key];
                para +=  key + "=" + value + "&";
            }
            req.url_wcjtn_ = req.url_wcjtn_ + "?" + para;
            var header =
                [
                    "versions", App_wcjtn_Config.Versions_wcjtn_,
                ]
            xhr.send(req.url_wcjtn_,null,req.meth_wcjtn_,null,header);
        }
        else
        {
            var para = "";
            for(const key of Object.keys(req._wcjtn_data_wcjtn_)) 
            {
                var value = req._wcjtn_data_wcjtn_[key];
                para +=  key + "=" + value + "&";
            }
            para += "ts=" + String(Date.now()) + "&";
            var header =
                [
                    "Content-Type", "application/x-www-form-urlencoded",
                    "versions", App_wcjtn_Config.Versions_wcjtn_,
                ]
            xhr.send(req.url_wcjtn_,para,req.meth_wcjtn_,null,header);
        }
    }

    protected static get_wcjtn_Ad_wcjtn_PosData(onSuccess : Function,onFail : Function)
    {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = _wcjtn_ShareAd_wcjtn_.get_wcjtn_AdPostion;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        req._wcjtn_data_wcjtn_.softid = App_wcjtn_Config.App_wcjtn_ID;
        req.meth_wcjtn_ = "get";
        _wcjtn_ShareAd_wcjtn_.request_wcjtn_(req);
    }

    protected static req_wcjtn_User_wcjtn_Click(advid,onSuccess : Function,onFail : Function)
    {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = _wcjtn_ShareAd_wcjtn_.user_wcjtn_Click;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;

        req._wcjtn_data_wcjtn_.softid = App_wcjtn_Config.App_wcjtn_ID;
        req._wcjtn_data_wcjtn_.uid  = User_wcjtn_.openId_wcjtn_;
        req._wcjtn_data_wcjtn_.advid  = advid ;

        _wcjtn_ShareAd_wcjtn_.request_wcjtn_(req);
    }

    protected static get_wcjtn_ADV_wcjtn_Data(locationid,onSuccess : Function,onFail : Function)
    {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = _wcjtn_ShareAd_wcjtn_.get_wcjtn_Adv;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        req._wcjtn_data_wcjtn_.softid = App_wcjtn_Config.App_wcjtn_ID;
        req._wcjtn_data_wcjtn_.locationid = locationid;
        req._wcjtn_data_wcjtn_.preview = 0;
        _wcjtn_ShareAd_wcjtn_.request_wcjtn_(req);
    }


/**
     * 随机跳转的方法，会从广告列表中随机得到一个AppId并且跳转,输入的参数为概率，大小在0-1之间
     * 如果概率大于1，则自动将其除以100，所以千万注意！
     * 
     * @static
     * @param {number} [rate=1] 
     * @memberof ShareAd
     */
    public static Random_wcjtn_Jump(rate: number = 1) 
    {
        console.log("随机跳转,rate：" + rate);
        if (rate > 1) {
            rate = rate / 100;
        }
        let rd = Math.random();
        if (rd <= rate) {
            var adLocationID = _wcjtn_ShareAd_wcjtn_.LoopAd_wcjtn_LocationID;
            var Locations = 
            [
                _wcjtn_ShareAd_wcjtn_.LoopAd_wcjtn_LocationID, 
                _wcjtn_ShareAd_wcjtn_.Insert_wcjtn_AdLocationID, 
                _wcjtn_ShareAd_wcjtn_.Banner_wcjtn_AdLocationID,
                _wcjtn_ShareAd_wcjtn_.AniAd_wcjtn_LocationID,
            ]
            if(_wcjtn_ShareAd_wcjtn_.Use_wcjtn_Random_wcjtn_AdPos)
            {
                for(var i=0;i < _wcjtn_ShareAd_wcjtn_.Ad_wcjtn_Locationids.length;++i)
                {
                    Locations.push(_wcjtn_ShareAd_wcjtn_.Ad_wcjtn_Locationids[i]);
                }
            }
            adLocationID = Locations[Math.floor(Math.random() * Locations.length)]
            var datas = _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADVs(adLocationID, function (datas: Array<any>) {
                if (datas) {
                    let rd = Math.floor(datas.length * Math.random());
                    let data = datas[rd];
                    console.log("跳转游戏： " + data.title);
                    WX_wcjtn_API.navigate_wcjtn_To_wcjtn_MiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功")
                        _wcjtn_ShareAd_wcjtn_.report_wcjtn_User_wcjtn_Click(data.appid);
                        ALD.ald_wcjtn_Send_wcjtn_ReportAdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败")
                        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            ALD.aldSend_wcjtn_ReportAd_wcjtn_ClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成")
                    });
                }
            }, true);
        }
    }

    public static isNeed_wcjtn_ShowAd() : boolean
    {
        if(0 == App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().ad_wcjtn_Switch)
            return false;
        if(Laya.Browser.onQGMiniGame)
        {
            if(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().oppo_wcjtn_cfg.oppo_wcjtn_versions != App_wcjtn_Config.Versions_wcjtn_)
            {
                return false;
            }
        }
        var mailiang = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().mai_wcjtn_liang;
        var mailianglist = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().mailiang_wcjtn_list;
        var mailiangscenelist = App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().mailiang_wcjtn_Scene_wcjtn_List;
        if(1 == mailiang)
        {
            var flag : number = null;
            var scene : number = null;
            if(Laya.Browser.onMiniGame)
            {
                flag = WX_wcjtn_API.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().query['chid'];
                scene  = WX_wcjtn_API.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;             
            }
            else if(Laya.Browser.onQQMiniGame)
            {
                flag  = QQ_wcjtn_Mini_wcjtn_GameAPI.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().query['chid'];
                scene  = QQ_wcjtn_Mini_wcjtn_GameAPI.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
            }
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
        return true;
    }

    public static sort_wcjtn_Datas(datas: any): any 
    {
        if (null == datas || 0 == datas.length)
            return [];
        let dataDic: { [appid: string]: any[] } = {};
        let keys = new Array<string>();
        for (let i = 0; i < datas.length; ++i) {
            let data = datas[i];
            if (dataDic[data.appid] == null) {
                dataDic[data.appid] = new Array();
                dataDic[data.appid].push(data);
                keys.push(data.appid);
            } else {
                dataDic[data.appid].push(data);
            }
        }
        for (let i = 0; i < keys.length; ++i)  {
            let key = keys[i];
            let randomIndex = Math.floor(Math.random() * keys.length);
            let temp = keys[randomIndex];
            keys[randomIndex] = key;
            keys[i] = temp;
        }
        for (let i = 0; i < keys.length; ++i)  {
            let key = keys[i];
            let dataArray = dataDic[key];
            for (let j = 0; j < dataArray.length; ++j)  {
                let data = dataArray[j];
                let randomIndex = Math.floor(Math.random() * dataArray.length);
                let temp = dataArray[randomIndex];
                dataArray[randomIndex] = data;
                dataArray[j] = temp;
            }
        }
        let res = new Array<any>();
        let ignores = [];
        while(keys.length > 0)
        {
            let isComplate = true;
            for(let i=0;i < keys.length;++i)
            {
                let key = keys[i];
                let isOk = true;
                for(let j=0;j < ignores.length;++j)
                {
                    let ignore = ignores[j];
                    if(ignore == key)
                    {
                        isOk = false;
                        break;
                    }
                }
                if(isOk)
                {
                    isComplate = false;
                    let data = dataDic[key].shift();
                    res.push(data);
                    ignores.push(key);
                    if(ignores.length > 3)
                    {
                        ignores.shift();
                    }
                    if(dataDic[key].length <= 0)
                    {
                        keys.splice(i,1);
                        --i;
                        continue;
                    }
                }
                else
                {
                    continue;
                }
            }
            if(isComplate)
            {
                for (let j = 0; j < keys.length; ++j)  
                {
                    let key = keys[j];
                    let isOk = true;
                    let dataArray = dataDic[key];
                    ignores.splice(0);
                    for(let h=0;h < dataArray.length;++h)
                    {
                        let data = dataArray[h];
                        for (let i = 0; i < res.length; ++i) 
                        {
                            ignores.push(null == res[i - 2] ? null : res[i - 2].appid);
                            ignores.push(null == res[i - 1] ? null : res[i - 1].appid);
                            ignores.push(null == res[i] ? null : res[i].appid);
                            ignores.push(null == res[i + 1] ? null : res[i + 1].appid);
                            ignores.push(null == res[i + 2] ? null : res[i + 2].appid);
                            for(let k=0;k < ignores.length;++k)
                            {
                                let ignore = ignores[k];
                                if(null != ignore && ignore == key)
                                {
                                    isOk = false;
                                    break;
                                }
                            }
                            if(isOk)
                            {
                                if (null != data) {
                                    let f = res.slice(0, i + 1);
                                    let b = res.slice(i + 1, res.length);
                                    res = f;
                                    res.push(data);
                                    for (let a = 0; a < b.length; ++a) {
                                        res.push(b[a]);
                                    }
                                }
                            }
                        }
                    }
 
                }
                break;
            }
            for (let i = 0; i < keys.length; ++i)  {
                let key = keys[i];
                let randomIndex = Math.floor(Math.random() * keys.length);
                let temp = keys[randomIndex];
                keys[randomIndex] = key;
                keys[i] = temp;
            }
        }
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