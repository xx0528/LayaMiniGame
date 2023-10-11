export enum ALDEv_JJKLBB_entDef
{
    None = "",
    ReportAdClickSuccess = "广告导出成功",
    ReportAdClickFail = "广告导出失败",
    //todo:添加你自己的阿拉丁事件

    EnterLoading = "进入loading界面",
    EnterMainView = "进入主界面",
    ClickGameStart = "点击进入游戏",
    
    EnterStartClickGetPrize = "游戏开始进入狂点",
    EnterStartClickGetPrizeScene = "游戏开始进入狂点场景值",
    StayStartClickGetPrizeTime = "游戏开始狂点停留时间",

    EnterBattleView = "进入游戏界面",

    EnterComplateClickGetPrize = "游戏结束进入狂点",
    EnterComplateClickGetPrizeScene = "游戏结束进入狂点场景值",
    StayComplateClickGetPrizeTime = "游戏结束狂点停留时间",

    EnterGameOverMoreGame = "游戏结束进入导出界面",
    EnterGameComplateView = "进入游戏结束界面",

    WXBannerLoadFail = "banner加载失败",
}

//阿拉丁相关接口
export default class A_JJKLBB_LD 
{
    
    protected static _singleReportMap = {}


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

    public static aldSen_JJKLBB_dEvent(event : ALDEv_JJKLBB_entDef,data : any)
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

    public static aldSendReportA_JJKLBB_dClickSuccess(data : any)
    {
        var type = ALDEv_JJKLBB_entDef.ReportAdClickSuccess  + " " +  data.title + ":" + String(data.appid)
        var ald = A_JJKLBB_LD as any;
        ald.aldSen_JJKLBB_dEvent(type,
            {
                "导出成功" : data.title + ":" + String(data.appid)
            })
    }

    public static aldSendRepo_JJKLBB_rtAdClickFail(data : any)
    {
        var type = ALDEv_JJKLBB_entDef.ReportAdClickFail  + " " +  data.title + ":" + String(data.appid)
        var ald = A_JJKLBB_LD as any;
        ald.aldSen_JJKLBB_dEvent(type,
            {
                "导出失败"  :  data.title + ":" + String(data.appid)
            })
    }

    public static aldSendOnlySingleReport(eventType : ALDEv_JJKLBB_entDef,reportData? : any)
    {
        console.log("ALD 上报 aldSendOnlySingleReport : ",eventType);
        var value = A_JJKLBB_LD._singleReportMap[eventType];
        if(null != value)
        {
            return;
        }
        A_JJKLBB_LD.aldSen_JJKLBB_dEvent(eventType,reportData);
        A_JJKLBB_LD._singleReportMap[eventType] = true;
    }
}