import ryw_OpenMsg from "./OpenMsg";
import { ryw_OpenDataMsgDef } from "./OpenDataMsgDef";
import { ryw_OpenDataKeyDef } from "./OpenDataKeyDef";

export default class ryw_OpenDataBridge 
{

    public static ryw_postSelfData(key : ryw_OpenDataKeyDef,value : any)
    {
        var msg = new ryw_OpenMsg(ryw_OpenDataMsgDef.ryw_setSelfData);
        msg.ryw_data.key = key;
        msg.ryw_data.value = value;
        ryw_OpenDataBridge.ryw_sendMsgToOpenDataContext(msg);
    }

    public static ryw_openFriendRank()
    {
        var msg = new ryw_OpenMsg(ryw_OpenDataMsgDef.ryw_OpenFriendRank);
        msg.ryw_data.width = Laya.stage.width;
        msg.ryw_data.height = Laya.stage.height;
        ryw_OpenDataBridge.ryw_sendMsgToOpenDataContext(msg);
    }

    public static ryw_sendMsgToOpenDataContext(msg : ryw_OpenMsg)
    {
        if (Laya.Browser.onMiniGame)
        {
            let openDataContext = Laya.Browser.window.wx.getOpenDataContext();
            openDataContext.postMessage(msg);
        }
    }
}