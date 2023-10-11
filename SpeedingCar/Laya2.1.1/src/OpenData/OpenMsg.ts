import { Open_wcjtn_Data_wcjtn_Msg_wcjtn_Def } from "./OpenDataMsgDef";

export default class Open_wcjtn_Msg 
{
    constructor(type : Open_wcjtn_Data_wcjtn_Msg_wcjtn_Def)
    {
        this._wcjtn_cmd_wcjtn_ = type;
    }
    public readonly _wcjtn_cmd_wcjtn_ : Open_wcjtn_Data_wcjtn_Msg_wcjtn_Def = Open_wcjtn_Data_wcjtn_Msg_wcjtn_Def.None;
    public _wcjtn_data_wcjtn_ : any = {};
}