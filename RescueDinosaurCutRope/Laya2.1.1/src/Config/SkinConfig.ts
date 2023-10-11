import AppC_JJKLBB_onfig from "../AppConfig";
import WXAPI from "../WXAPI";

export class SkinCon_JJKLBB_figData
{
    public ski_JJKLBB_nIndex : number = 0;
    public costD_JJKLBB_iamond : number = 0;
    public ve_JJKLBB_dio : number = 0;

    public clone() : SkinCon_JJKLBB_figData
    {
        var clone = new SkinCon_JJKLBB_figData();
        clone.ski_JJKLBB_nIndex = this.ski_JJKLBB_nIndex;
        clone.costD_JJKLBB_iamond = this.costD_JJKLBB_iamond;
        clone.ve_JJKLBB_dio = this.ve_JJKLBB_dio;
        return clone;
    }
}

export default class SkinC_JJKLBB_onfig
{   
    public static getIns_JJKLBB_tance() : SkinC_JJKLBB_onfig
    {
        if(null == SkinC_JJKLBB_onfig._instance)
        {
            SkinC_JJKLBB_onfig._instance = SkinC_JJKLBB_onfig.load();
        }
        return SkinC_JJKLBB_onfig._instance
    }
    protected static _instance: SkinC_JJKLBB_onfig;

    protected static load() : SkinC_JJKLBB_onfig
    {
        var config = new SkinC_JJKLBB_onfig();
        var json: any = Laya.loader.getRes(AppC_JJKLBB_onfig.ResSe_JJKLBB_rver + "/json/skinConfig.json");
        if(json){
            for(var i = 0;i < json.length;++i)
            {
                var row = json[i];
                var rowData: SkinCon_JJKLBB_figData = new SkinCon_JJKLBB_figData();
              
                rowData.ski_JJKLBB_nIndex = Number(row["skinlNum"]);
                rowData.costD_JJKLBB_iamond = Number(row["costDiamond"]);
                rowData.ve_JJKLBB_dio = Number(row["vedio"]);

                config._data.push(rowData);
            }
            return config;
        }
    }

    protected readonly _data : Array<SkinCon_JJKLBB_figData> = new Array<SkinCon_JJKLBB_figData>();

    public getSkin_JJKLBB_ConfigDatas(): Array<SkinCon_JJKLBB_figData>
    {
        return this._data;
    }

    public getSkinCo_JJKLBB_nfigData_JJKLBB_BySkinIndex(index : number): SkinCon_JJKLBB_figData
    {
        for (var i = 0; i < this._data.length; ++i)  
        {
            var d = this._data[i];
            if(d.ski_JJKLBB_nIndex == index)
            {
                return d;
            }
        }
        return null;
    }
}