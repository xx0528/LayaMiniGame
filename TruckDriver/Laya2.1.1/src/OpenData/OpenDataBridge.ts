import OpenMsg from "./OpenMsg";
import { OpenDataMsg_ppxhc_Def } from "./OpenDataMsgDef";
import { OpenDataKey_ppxhc_Def } from "./OpenDataKeyDef";

export default class OpenData_ppxhc_Bridge 
{

    public static postSelfData(key : OpenDataKey_ppxhc_Def,value : any)
    {
        var msg = new OpenMsg(OpenDataMsg_ppxhc_Def.setSelfData);
        msg.data.key = key;
        msg.data.value = value;
        OpenData_ppxhc_Bridge.sendMsgToOpenDataContext(msg);
    }

    public static openFriendRank()
    {
        var msg = new OpenMsg(OpenDataMsg_ppxhc_Def.OpenFriendRank);
        msg.data.width = Laya.stage.width;
        msg.data.height = Laya.stage.height;
        OpenData_ppxhc_Bridge.sendMsgToOpenDataContext(msg);
    }

    public static sendMsgToOpenDataContext(msg : OpenMsg)
    {
        if (Laya.Browser.onMiniGame)
        {
            let openDataContext = Laya.Browser.window.wx.getOpenDataContext();
            openDataContext.postMessage(msg);
        }
    }
}