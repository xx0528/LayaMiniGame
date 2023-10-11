import User_wcjtn_ from "../../User/User";
import Utilit_wcjtn_ from "../../Utilit";
import RoadManager from "../Manager/RoadManager";

export class LevelData {
    public levelid: number = 0;
    public leveltype: number = 0;
    public missiondistance: number = 0;
    public overtakecoin: number = 0;
    public rvehiclespeed:number = 0;
    public lvehiclegenerateintervalMin:number = 0;
    public lvehiclegenerateintervalMax:number = 0;
    public rvehiclegenerateintervalMin:number = 0;
    public rvehiclegenerateintervalMax:number = 0;
    public levelcoin:number = 0;
    public lvehiclespeed:string;
    public randomSpeedLists:number[] = new Array();
    public envType:number = 0;
}

export default class LevelDataConfig {
    public static Instance(): LevelDataConfig  {
        if (null == LevelDataConfig._instance)  {
            LevelDataConfig._instance = LevelDataConfig.load();
        }
        return LevelDataConfig._instance
    }
    protected static _instance: LevelDataConfig;

    protected static load(): LevelDataConfig  {
        var config = new LevelDataConfig();
        var json: any = Laya.loader.getRes("subRes/json/levelData.json");
        if (json) {
            for (var i = 0; i < json.length; ++i)  {
                var row = json[i];
                var rowData: LevelData = new LevelData();
                rowData.levelid = Number(row["levelid"]);
                rowData.leveltype = Number(row["leveltype"]);
                rowData.missiondistance = Number(row["missiondistance"]);
                rowData.overtakecoin = Number(row["overtakecoin"]);
                rowData.lvehiclegenerateintervalMin = Number(row["lvehiclegenerateintervalMin"]);
                rowData.lvehiclegenerateintervalMax = Number(row["lvehiclegenerateintervalMax"]);
                rowData.rvehiclegenerateintervalMin = Number(row["rvehiclegenerateintervalMin"]);
                rowData.rvehiclegenerateintervalMax = Number(row["rvehiclegenerateintervalMax"]);
                rowData.rvehiclespeed = Number(row["rvehiclespeed"]);
                rowData.levelcoin = Number(row["levelcoin"]);
                rowData.lvehiclespeed = String(row["lvehiclespeed"]);
                rowData.envType = Number(row["envType"]);

                let list = rowData.lvehiclespeed.split(",");
                list.forEach(temp => {
                    let speed = parseInt(temp);
                    rowData.randomSpeedLists.push(speed);
                });

                config._data.push(rowData);
            }
            return config;
        }
    }

    protected readonly _data: Array<LevelData> = new Array<LevelData>();

    public getDataByLevel(level:number): LevelData  {
        return this._data[level];
        
    }

    public getLevelAmount():number{
        return this._data.length;
    }


    private getRealLevel():number{
        let level =RoadManager.Instance().GetRoadLevel()-1;
        if(level>=this._data.length){
            level = this._data.length-level%(this._data.length-4);
        }
        return level;
    }
}