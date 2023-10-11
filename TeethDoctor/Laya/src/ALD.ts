export enum ALDEv_XYXZS_entDef
{
    N_XYXZS_one = "",
    ReportA_XYXZS_dClickSuccess = "广告导出成功",
    ReportAd_XYXZS_ClickFail = "广告导出失败",
    ReportLau_XYXZS_nchOptions = "用户启动参数"
    //todo:添加你自己的阿拉丁事件
}

//阿拉丁相关接口
export default class A_XYXZS_LD 
{
    public static aldSe_XYXZS_ndOpenId(openid : string)
    {   
        if(Laya.Browser.onMiniGame)
        {
            Laya.Browser.window["wx"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ",openid);
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            Laya.Browser.window["qq"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ",openid);
        }
    }

    public static aldSen_XYXZS_dEvent(event : ALDEv_XYXZS_entDef | string,data : any)
    {
        var eventName : string = event;
        if(Laya.Browser.onMiniGame)
        {
            Laya.Browser.window["wx"].aldSendEvent(eventName,data);
        }
        else if(Laya.Browser.onQQMiniGame)
        {
            Laya.Browser.window["qq"].aldSendEvent(eventName,data);
        }
    }

    public static aldSend_XYXZS_ReportAdClickSuccess(data : any)
    {
        var type = ALDEv_XYXZS_entDef.ReportA_XYXZS_dClickSuccess  + " " +  data.title + ":" + String(data.appid)
        A_XYXZS_LD.aldSen_XYXZS_dEvent(type,
            {
                "导出成功" : data.title + ":" + String(data.appid)
            })
    }

    public static aldSend_XYXZS_ReportAdClickFail(data : any)
    {
        var type = ALDEv_XYXZS_entDef.ReportAd_XYXZS_ClickFail  + " " +  data.title + ":" + String(data.appid)
        A_XYXZS_LD.aldSen_XYXZS_dEvent(type,
            {
                "导出失败"  :  data.title + ":" + String(data.appid)
            })
    }

    public static aldSendRe_XYXZS_portLaunchOptions(sceneid : string,ip : string,location : Object)
    {
        var type = ALDEv_XYXZS_entDef.ReportLau_XYXZS_nchOptions;
        A_XYXZS_LD.aldSen_XYXZS_dEvent(type,
            {
                "场景值："  : String(sceneid),
                "Ip："  : String(ip),
                "地区：" : JSON.stringify(location)
            })
    }
}