import Open_wcjtn_Msg from "./OpenMsg";
import { Open_wcjtn_Data_wcjtn_Msg_wcjtn_Def } from "./OpenDataMsgDef";
import { Open_wcjtn_DataKey_wcjtn_Def } from "./OpenDataKeyDef";

export default class Open_wcjtn_Data_wcjtn_Bridge 
{

    public static post_wcjtn_Self_wcjtn_Data(key : Open_wcjtn_DataKey_wcjtn_Def,value : any)
    {
        var msg = new Open_wcjtn_Msg(Open_wcjtn_Data_wcjtn_Msg_wcjtn_Def.set_wcjtn_Self_wcjtn_Data);
        msg._wcjtn_data_wcjtn_.key = key;
        msg._wcjtn_data_wcjtn_.value = value;
        Open_wcjtn_Data_wcjtn_Bridge.send_wcjtn_Msg_wcjtn_To_wcjtn_OpenData_wcjtn_Context(msg);
    }

    public static open_wcjtn_Friend_wcjtn_Rank()
    {
        var msg = new Open_wcjtn_Msg(Open_wcjtn_Data_wcjtn_Msg_wcjtn_Def.Open_wcjtn_Friend_wcjtn_Rank);
        msg._wcjtn_data_wcjtn_.width = Laya.stage.width;
        msg._wcjtn_data_wcjtn_.height = Laya.stage.height;
        Open_wcjtn_Data_wcjtn_Bridge.send_wcjtn_Msg_wcjtn_To_wcjtn_OpenData_wcjtn_Context(msg);
    }

    public static send_wcjtn_Msg_wcjtn_To_wcjtn_OpenData_wcjtn_Context(msg : Open_wcjtn_Msg)
    {
        if (Laya.Browser.onMiniGame)
        {
            let openDataContext = Laya.Browser.window.wx.getOpenDataContext();
            openDataContext.postMessage(msg);
        }
    }
}