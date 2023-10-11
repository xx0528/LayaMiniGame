export enum ALDEventDef
{
    None = "fea3123d149edac85b1c2a96bbf338f2",
    ReportAdClickSuccess = "广告导出成功",
    ReportAdClickFail = "广告导出失败",
    //todo:添加你自己的阿拉丁事件
}

//阿拉丁相关接口
export default class AL_tippy_D 
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

    public static aldSend_tippy_Event(event : ALDEventDef,data : any)
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

    public static aldSendReport_tippy_AdClickSuccess(data : any)
    {
        var type = ALDEventDef.ReportAdClickSuccess  + " " +  data.title + ":" + String(data.appid)
        var ald = AL_tippy_D as any;
        ald.aldSend_tippy_Event(type,
            {
                "导出成功" : data.title + ":" + String(data.appid)
            })
    }

    public static aldSendReportAd_tippy_ClickFail(data : any)
    {
        var type = ALDEventDef.ReportAdClickFail  + " " +  data.title + ":" + String(data.appid)
        var ald = AL_tippy_D as any;
        ald.aldSend_tippy_Event(type,
            {
                "导出失败"  :  data.title + ":" + String(data.appid)
            })
    }
}