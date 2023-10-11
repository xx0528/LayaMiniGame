import App_wcjtn_Config from "../../AppConfig";


export class CarData
{
    public id:number = 0;
    public accel : number = 0;
    public price : number = 0;
}

export default class CarDataConfig
{   
    public static Instance() : CarDataConfig
    {
        if(null == CarDataConfig._instance)
        {
            CarDataConfig._instance = CarDataConfig.load();
        }
        return CarDataConfig._instance
    }
    protected static _instance: CarDataConfig;

    protected static load() : CarDataConfig
    {
        var config = new CarDataConfig();
        var json: any = Laya.loader.getRes("subRes/json/carData.json");
        if(json){
            for(var i = 0;i < json.length;++i)
            {
                var row = json[i];
                var rowData: CarData = new CarData();
                rowData.id = Number(row["id"]);
                rowData.accel = Number(row["accel"]);
                rowData.price = Number(row["price"]);
                config._data.push(rowData);
            }
            return config;
        }
    }

    protected readonly _data : Array<CarData> = new Array<CarData>();

    public getCarDataByID(id:number): CarData
    {
        return this._data[id];
    }
}