import AppC_JJKLBB_onfig from "../AppConfig";
import WXAPI from "../WXAPI";

export class GameCon_JJKLBB_figData
{
    public signGetDiamond : number = 10;
    public freeEnergy : number = 5;
    public freeDiamond : number = 5;
    public dailyEnergy : number = 100;
}

export default class GameComm_JJKLBB_onConfig
{   
    public static getIn_JJKLBB_stance() : GameComm_JJKLBB_onConfig
    {
        if(null == GameComm_JJKLBB_onConfig._instance)
        {
            GameComm_JJKLBB_onConfig._instance = GameComm_JJKLBB_onConfig.load();
        }
        return GameComm_JJKLBB_onConfig._instance
    }
    protected static _instance: GameComm_JJKLBB_onConfig;

    protected static load() : GameComm_JJKLBB_onConfig
    {
        var config = new GameComm_JJKLBB_onConfig();
        var json: any = Laya.loader.getRes(AppC_JJKLBB_onfig.ResSe_JJKLBB_rver + "/json/gameConfig.json");
        if(json){
            for(var i = 0;i < json.length;++i)
            {
                var row = json[i];
                var rowData: GameCon_JJKLBB_figData = new GameCon_JJKLBB_figData();

                rowData.signGetDiamond = Number(row["signGetDiamond"]);
                rowData.freeEnergy = Number(row["freeEnergy"]);
                rowData.freeDiamond = Number(row["freeDiamond"]);
                rowData.dailyEnergy = Number(row["dailyEnergy"]);

                config._data.push(rowData);
            }
            return config;
        }
        else{
            config._data.push(new GameCon_JJKLBB_figData());
            return config;
        }
    }

    protected readonly _data : Array<GameCon_JJKLBB_figData> = new Array<GameCon_JJKLBB_figData>();

    public getGame_JJKLBB_ConfigData(): GameCon_JJKLBB_figData
    {
        return this._data[0];
    }
}