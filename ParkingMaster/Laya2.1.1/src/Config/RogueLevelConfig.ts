import AppConfig from "../AppConfig";

export class RogueLevelData {
    public level: {"min": number, "max": number};
    public map: {"w": number, "h": number, "max_w": number, "max_h": number};
    public car: Array<number>;
    public carAppear: number;
    public barrierAppear: number;
    public wallAppear: number;
}

export class RogueLevelConfig {

    public static getInstance() : RogueLevelConfig
    {
        if (null == RogueLevelConfig._instance)
        {
            RogueLevelConfig._instance = RogueLevelConfig.load();
        }
        return RogueLevelConfig._instance;
    }

    protected static _instance: RogueLevelConfig;

    protected static load(): RogueLevelConfig
    {
        var config = new RogueLevelConfig();
        var json: any = Laya.loader.getRes(AppConfig.ResServer + "/json/roguelevel.json");
        if (json) {
            for (var i = 0; i < json.length; i++) {
                config._data.push(json[i] as RogueLevelData);
            }
            // console.log("configdata", config._data);
        } else {
            config._data.push(new RogueLevelData());
        }
        return config;
    }

    protected readonly _data : Array<RogueLevelData> = new Array<RogueLevelData>();

    public getData(level: number): RogueLevelData
    {
        return this._data[level];
    }

    public getDataLength(): number {
        return this._data.length;
    }

}
