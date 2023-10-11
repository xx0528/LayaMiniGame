import Open_JJKLBB_Msg from "./OpenMsg";
import { OpenDataMsgDef } from "./OpenDataMsgDef";
import { OpenD_JJKLBB_ataKeyD_JJKLBB_ef } from "./OpenDataKeyDef";

export default class OpenDat_JJKLBB_aBridge 
{

    public static postSel_JJKLBB_fData(key : OpenD_JJKLBB_ataKeyD_JJKLBB_ef,value : any)
    {
        var msg = new Open_JJKLBB_Msg(OpenDataMsgDef.setSelfData);
        msg.data.key = key;
        msg.data.value = value;
        OpenDat_JJKLBB_aBridge.sendMsgToO_JJKLBB_penDataCo_JJKLBB_ntext(msg);
    }

    public static openFri_JJKLBB_endRank()
    {
        var msg = new Open_JJKLBB_Msg(OpenDataMsgDef.OpenFriendRank);
        msg.data.width = Laya.stage.width;
        msg.data.height = Laya.stage.height;
        OpenDat_JJKLBB_aBridge.sendMsgToO_JJKLBB_penDataCo_JJKLBB_ntext(msg);
    }

    public static sendMsgToO_JJKLBB_penDataCo_JJKLBB_ntext(msg : Open_JJKLBB_Msg)
    {
        if (Laya.Browser.onMiniGame)
        {
            let openDataContext = Laya.Browser.window.wx.getOpenDataContext();
            openDataContext.postMessage(msg);
        }
    }
}