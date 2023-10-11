import { OpenD_XYXZS_ataMsgDef } from "./OpenDataMsgDef";

export default class Open_XYXZS_Msg 
{
    constructor(type : OpenD_XYXZS_ataMsgDef)
    {
        this.c_XYXZS_md = type;
    }
    public readonly c_XYXZS_md : OpenD_XYXZS_ataMsgDef = OpenD_XYXZS_ataMsgDef.No_XYXZS_ne;
    public d_XYXZS_ata : any = {};
}