export enum ryw_ALDEventDef
{
    None = "",
    ReportAdClickSuccess = "广告导出成功",
    ReportAdClickFail = "广告导出失败",
    ReportLaunchOptions = "用户启动参数",
    //todo:添加你自己的阿拉丁事件

    EnterLevelGame = "进入游戏关卡",
    CompleteLevelGame = "胜利游戏关卡",
    FailLevelGame = "失败游戏关卡",
    AgainLevelGame = "重来游戏关卡",
    TipLevelGame = "提示游戏关卡",
}

//阿拉丁相关接口
export default class ryw_ALD 
{
    public static ryw_aldSendOpenId(openid : string)
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

    public static ryw_aldSendEvent(event : ryw_ALDEventDef | string,data : any)
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

    public static ryw_aldSendReportAdClickSuccess(data : any)
    {
        var type = ryw_ALDEventDef.ReportAdClickSuccess  + " " +  data.title + ":" + String(data.appid)
        ryw_ALD.ryw_aldSendEvent(type,
            {
                "导出成功" : data.title + ":" + String(data.appid)
            })
    }

    public static ryw_aldSendReportAdClickFail(data : any)
    {
        var type = ryw_ALDEventDef.ReportAdClickFail  + " " +  data.title + ":" + String(data.appid)
        ryw_ALD.ryw_aldSendEvent(type,
            {
                "导出失败"  :  data.title + ":" + String(data.appid)
            })
    }

    public static ryw_aldSendReportLaunchOptions(sceneid : string,ip : string,location : Object)
    {
        var type = ryw_ALDEventDef.ReportLaunchOptions;
        ryw_ALD.ryw_aldSendEvent(type,
            {
                "场景值："  : String(sceneid),
                "Ip："  : String(ip),
                "地区：" : JSON.stringify(location)
            })
    }
}