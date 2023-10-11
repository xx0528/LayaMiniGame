import { OpenDataMsgDef } from "./OpenDataMsgDef";

export default class Open_JJKLBB_Msg 
{
    constructor(type : OpenDataMsgDef)
    {
        this.cmd = type;
    }
    public readonly cmd : OpenDataMsgDef = OpenDataMsgDef.None;
    public data : any = {};
}