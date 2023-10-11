export enum ALD_wcjtn_Event_wcjtn_Def
{
    None = "",
    Report_wcjtn_AdClickSuccess = "广告导出成功",
    Report_wcjtn_AdClickFail = "广告导出失败",
    Report_wcjtn_LaunchOptions = "用户启动参数"
    //todo:添加你自己的阿拉丁事件
}

//阿拉丁相关接口
export default class ALD 
{
    public static ald_wcjtn_Send_wcjtn_OpenId(openid : string)
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

    public static ald_wcjtn_Send_wcjtn_Event(event : ALD_wcjtn_Event_wcjtn_Def | string,data : any)
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

    public static ald_wcjtn_Send_wcjtn_ReportAdClickSuccess(data : any)
    {
        var type = ALD_wcjtn_Event_wcjtn_Def.Report_wcjtn_AdClickSuccess  + " " +  data.title + ":" + String(data.appid)
        ALD.ald_wcjtn_Send_wcjtn_Event(type,
            {
                "导出成功" : data.title + ":" + String(data.appid)
            })
    }

    public static aldSend_wcjtn_ReportAd_wcjtn_ClickFail(data : any)
    {
        var type = ALD_wcjtn_Event_wcjtn_Def.Report_wcjtn_AdClickFail  + " " +  data.title + ":" + String(data.appid)
        ALD.ald_wcjtn_Send_wcjtn_Event(type,
            {
                "导出失败"  :  data.title + ":" + String(data.appid)
            })
    }

    public static ald_wcjtn_Send_wcjtn_Report_wcjtn_LaunchOptions(sceneid : string,ip : string,location : Object)
    {
        var type = ALD_wcjtn_Event_wcjtn_Def.Report_wcjtn_LaunchOptions;
        ALD.ald_wcjtn_Send_wcjtn_Event(type,
            {
                "场景值："  : String(sceneid),
                "Ip："  : String(ip),
                "地区：" : JSON.stringify(location)
            })
    }
}