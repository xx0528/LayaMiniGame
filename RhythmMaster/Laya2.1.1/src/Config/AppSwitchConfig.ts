import App_myqq_Config from "../AppConfig";
import WXAPI from "../WXAPI";

export class AppSwitchData
{
    public banner : number = 0;
    public wudian: number = 0;
    public wudianTime_01: number = 2000;
    public wudianTime_01PreLoad: number = 500;
    public shipintubiao: number = 1;
    private wudianAvailableTime: object = {
        "0": 0, "1": 0, "2": 0, "3": 0,
        "4": 0, "5": 0, "6": 0, "7": 0,
        "8": 0, "9": 0, "10": 0, "11": 0,
        "12": 0, "13": 0, "14": 0, "15": 0,
        "16": 0, "17": 0, "18": 0, "19": 0,
        "20": 0, "21": 0, "22": 0, "23": 0
    }
    /**
     * 得到当前时间开关是否打开
     * 
     * @readonly
     * @type {boolean}
     * @memberof AppSwitchData
     */
    public get wudianTimeAvaliable(): boolean{
        return this.wudianAvailableTime[new Date().getHours()] == 1;
    }
}

export default class AppSwitchConfig
{   
    public static getInstance() : AppSwitchConfig
    {
        if(null == AppSwitchConfig._instance)
        {
            AppSwitchConfig._instance = AppSwitchConfig.load();
        }
        return AppSwitchConfig._instance
    }
    protected static _instance: AppSwitchConfig;

    protected static load() : AppSwitchConfig
    {
        var config = new AppSwitchConfig();
        var json: any = Laya.loader.getRes(App_myqq_Config.ResServer + "/json/appswitch.json");
        if(json){
            for(var i = 0;i < json.length;++i)
            {
                var row = json[i];
                var rowData: AppSwitchData = new AppSwitchData();
                rowData.banner = Number(row["banner"]);
                rowData.wudian = Number(row["wudian"]);
                rowData.wudianTime_01 = Number(row["wudianTime_01"]);
                rowData.wudianTime_01PreLoad = Number(row["wudianTime_01PreLoad"]);
                rowData.shipintubiao = Number(row["shipintubiao"]);
                (rowData as any).wudianAvailableTime = Object(row["wudianTime"]);
                config._data.push(rowData);
            }
            return config;
        }
        else{
            config._data.push(new AppSwitchData());
            return config;
        }
    }

    protected readonly _data : Array<AppSwitchData> = new Array<AppSwitchData>();

    public getAppSwitchData(): AppSwitchData
    {
        return this._data[0];
    }
}