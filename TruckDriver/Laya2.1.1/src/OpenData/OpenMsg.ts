import { OpenDataMsg_ppxhc_Def } from "./OpenDataMsgDef";

export default class OpenMsg 
{
    constructor(type : OpenDataMsg_ppxhc_Def)
    {
        this.cmd = type;
    }
    public readonly cmd : OpenDataMsg_ppxhc_Def = OpenDataMsg_ppxhc_Def.None;
    public data : any = {};
}