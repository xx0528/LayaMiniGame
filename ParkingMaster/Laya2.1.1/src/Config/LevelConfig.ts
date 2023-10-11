import AppConfig from "../AppConfig";

export class LevelConfigData {
    public level: number;
    public map: {"w": number, "h": number} =  {"w": 0, "h":0};
    public layout: Array<number> = [];
}

export class LevelConfig {

    public static getInstance() : LevelConfig
    {
        if (null == LevelConfig._instance)
        {
            LevelConfig._instance = LevelConfig.load();
        }
        return LevelConfig._instance;
    }

    protected static _instance: LevelConfig;

    protected static load(): LevelConfig
    {
        var config = new LevelConfig();
        var json: any = Laya.loader.getRes(AppConfig.ResServer + "/json/level.json");
        if (json) {
            for (var i = 0; i < json.length; i++) {
                config._data.push(json[i] as LevelConfigData);
            }
            // console.log("configdata", config._data);
        } else {
            var json: any = Laya.loader.getRes(AppConfig.LocalTestReServer + "/json/level.json");
            if (json) {
                for (var i = 0; i < json.length; i++) {
                    config._data.push(json[i] as LevelConfigData);
                }
            }
            else
                config._data.push(new LevelConfigData());
        }
        return config;
    }

    protected readonly _data : Array<LevelConfigData> = new Array<LevelConfigData>();

    public getData(level: number): LevelConfigData
    {
        return this._data[level];
    }

    public getDataLength(): number {
        return this._data.length;
    }

}
