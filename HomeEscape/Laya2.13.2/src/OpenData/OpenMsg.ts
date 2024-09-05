import { ryw_OpenDataMsgDef } from "./OpenDataMsgDef";

export default class ryw_OpenMsg 
{
    constructor(type : ryw_OpenDataMsgDef)
    {
        this.ryw_cmd = type;
    }
    public readonly ryw_cmd : ryw_OpenDataMsgDef = ryw_OpenDataMsgDef.ryw_None;
    public ryw_data : any = {};
}