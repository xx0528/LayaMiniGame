export enum ALDEvent_ppxhc_Def
{
    None = "",
    ReportAdClickSuccess = "广告导出成功",
    ReportAdClickFail = "广告导出失败",
    ReportLaunchOptions = "用户启动参数"
    //todo:添加你自己的阿拉丁事件
}

//阿拉丁相关接口
export default class ALD_ppxhc 
{
    public static aldSendOpenId(openid : string)
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

    public static aldSendEvent(event : ALDEvent_ppxhc_Def | string,data : any)
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

    public static aldSendReportAdClickSuccess(data : any)
    {
        var type = ALDEvent_ppxhc_Def.ReportAdClickSuccess  + " " +  data.title + ":" + String(data.appid)
        ALD_ppxhc.aldSendEvent(type,
            {
                "导出成功" : data.title + ":" + String(data.appid)
            })
    }

    public static aldSendReportAdClickFail(data : any)
    {
        var type = ALDEvent_ppxhc_Def.ReportAdClickFail  + " " +  data.title + ":" + String(data.appid)
        ALD_ppxhc.aldSendEvent(type,
            {
                "导出失败"  :  data.title + ":" + String(data.appid)
            })
    }

    public static aldSendReportLaunchOptions(sceneid : string,ip : string,location : Object)
    {
        var type = ALDEvent_ppxhc_Def.ReportLaunchOptions;
        ALD_ppxhc.aldSendEvent(type,
            {
                "场景值："  : String(sceneid),
                "Ip："  : String(ip),
                "地区：" : JSON.stringify(location)
            })
    }
}