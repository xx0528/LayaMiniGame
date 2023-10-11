import Open_XYXZS_Msg from "./OpenMsg";
import { OpenD_XYXZS_ataMsgDef } from "./OpenDataMsgDef";
import { OpenDa_XYXZS_taKeyDef } from "./OpenDataKeyDef";

export default class OpenD_XYXZS_ataBridge 
{

    public static postSe_XYXZS_lfData(key : OpenDa_XYXZS_taKeyDef,value : any)
    {
        var msg = new Open_XYXZS_Msg(OpenD_XYXZS_ataMsgDef.setS_XYXZS_elfData);
        msg.d_XYXZS_ata.key = key;
        msg.d_XYXZS_ata.value = value;
        OpenD_XYXZS_ataBridge.sendMs_XYXZS_gToOpenDataContext(msg);
    }

    public static openF_XYXZS_riendRank()
    {
        var msg = new Open_XYXZS_Msg(OpenD_XYXZS_ataMsgDef.Open_XYXZS_FriendRank);
        msg.d_XYXZS_ata.width = Laya.stage.width;
        msg.d_XYXZS_ata.height = Laya.stage.height;
        OpenD_XYXZS_ataBridge.sendMs_XYXZS_gToOpenDataContext(msg);
    }

    public static sendMs_XYXZS_gToOpenDataContext(msg : Open_XYXZS_Msg)
    {
        if (Laya.Browser.onMiniGame)
        {
            let openDataContext = Laya.Browser.window.wx.getOpenDataContext();
            openDataContext.postMessage(msg);
        }
    }
}