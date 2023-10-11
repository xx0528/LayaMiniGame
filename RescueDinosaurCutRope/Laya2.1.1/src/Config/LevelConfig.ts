import AppC_JJKLBB_onfig from "../AppConfig";
import WXAPI from "../WXAPI";

export class LevelCo_JJKLBB_nfigData
{
    public levelNum : number = 0;
    public costEnergy : number = 0;
    public getDiamond : number = 0;
    public vedioCostNoEnergy : number = 0;
    public vedioDoubleDiamond : number = 0;

    public clone() : LevelCo_JJKLBB_nfigData
    {
        var clone = new LevelCo_JJKLBB_nfigData();
        clone.levelNum = this.levelNum;
        clone.costEnergy = this.costEnergy;
        clone.getDiamond = this.getDiamond;
        clone.vedioCostNoEnergy = this.vedioCostNoEnergy;
        clone.vedioDoubleDiamond = this.vedioDoubleDiamond;
        return clone;
    }
}

export default class LevelC_JJKLBB_onfig
{   
    public static getIns_JJKLBB_tance() : LevelC_JJKLBB_onfig
    {
        if(null == LevelC_JJKLBB_onfig._instance)
        {
            LevelC_JJKLBB_onfig._instance = LevelC_JJKLBB_onfig.load();
        }
        return LevelC_JJKLBB_onfig._instance
    }
    protected static _instance: LevelC_JJKLBB_onfig;

    protected static load() : LevelC_JJKLBB_onfig
    {
        var config = new LevelC_JJKLBB_onfig();
        var json: any = Laya.loader.getRes(AppC_JJKLBB_onfig.ResSe_JJKLBB_rver + "/json/levelConfig.json");
        if(json){
            for(var i = 0;i < json.length;++i)
            {
                var row = json[i];
                var rowData: LevelCo_JJKLBB_nfigData = new LevelCo_JJKLBB_nfigData();
              
                rowData.levelNum = Number(row["levelNum"]);
                rowData.costEnergy = Number(row["costEnergy"]);
                rowData.getDiamond = Number(row["getDiamond"]);
                rowData.vedioCostNoEnergy = Number(row["vedioCostNoEnergy"]);
                rowData.vedioDoubleDiamond = Number(row["vedioDoubleDiamond"]);

                config._data.push(rowData);
            }
            return config;
        }
    }

    protected readonly _data : Array<LevelCo_JJKLBB_nfigData> = new Array<LevelCo_JJKLBB_nfigData>();

    public getLevelC_JJKLBB_onfigDatas(): Array<LevelCo_JJKLBB_nfigData>
    {
        return this._data;
    }

    public getLevelCon_JJKLBB_figDataB_JJKLBB_yLevelNum(levelNum : number): LevelCo_JJKLBB_nfigData
    {
        for (var i = 0; i < this._data.length; ++i)  
        {
            var d = this._data[i];
            if(d.levelNum == levelNum)
            {
                return d;
            }
        }
        return null;
    }
}