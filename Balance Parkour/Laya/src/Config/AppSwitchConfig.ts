import AppConfig from "../AppConfig";
import WXAPI from "../WXAPI";

export class AppSwitch_tippy_Data {
    public version: string = "1.0.0";
    public share_next = 1//分享开关
    public share_level = 3
    public banner: number = 0;
    public wudian: number = 0;
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
    public get wudianTimeAvaliable(): boolean {
        return this.wudianAvailableTime[new Date().getHours()] == 1;
    }
    public mailiang: number = 1;
    public readonly mailianglist: Array<number> = new Array<number>();

    public readonly wxWuDianBanners: Array<string> = new Array<string>();
    public btnMoveTimer: number = 1;
    public bannerMoveTimer: number = 0.5;
    public bannerFreshTimer: number = 200;
    public bannerCreateFailNum: number = 3;
    public bannerTodayBannerMax: number = 10;

    public adSwitch : number = 1;

    public readonly wudianSceneList : Array<number> = new Array<number>();
}

export default class AppSwitch_tippy_Config {
    public static get_tippy_Instance(): AppSwitch_tippy_Config {
        if (null == AppSwitch_tippy_Config._ins_tippy_tance) {
            AppSwitch_tippy_Config._ins_tippy_tance = AppSwitch_tippy_Config.lo_tippy_ad();
        }
        return AppSwitch_tippy_Config._ins_tippy_tance
    }
    protected static _ins_tippy_tance: AppSwitch_tippy_Config;

    protected static lo_tippy_ad(): AppSwitch_tippy_Config {
        var config = new AppSwitch_tippy_Config();
        var json: any = Laya.loader.getRes(AppConfig.ResServer + "/json/appswitch.json");
        if (json) {
            for (var i = 0; i < json.length; ++i) {
                var row = json[i];
                var rowData: AppSwitch_tippy_Data = new AppSwitch_tippy_Data();
                rowData.version = String(row["version"]);
                rowData.share_next = Number(row["share_next"]);
                rowData.share_level = Number(row["share_level"]);
                rowData.banner = Number(row["banner"]);
                rowData.wudian = Number(row["wudian"]);
                (rowData as any).wudianAvailableTime = Object(row["wudianTime"]);
                rowData.mailiang = Number(row["mailiang"]);
                var mailianglist = row["mailianglist"];
                if (null != mailianglist) {
                    for (var j = 0; j < mailianglist.length; ++j) {
                        var flag = Number(mailianglist[j]);
                        rowData.mailianglist.push(flag);
                    }
                }

                var wxwudianbanners = row["wxwudianbanners"];
                if (null != wxwudianbanners) {
                    for (var j = 0; j < wxwudianbanners.length; ++j) {
                        var bannerid = String(wxwudianbanners[j]);
                        rowData.wxWuDianBanners.push(bannerid);
                    }
                }
                rowData.btnMoveTimer = Number(row["btnMoveTimer"]);
                rowData.bannerMoveTimer = Number(row["bannerMoveTimer"]);
                rowData.bannerCreateFailNum = Number(row["createFailNum"]);
                rowData.bannerFreshTimer = Number(row["bannerFreshTimer"]);
                rowData.bannerTodayBannerMax = Number(row["todayBannerMax"]);
                
                rowData.adSwitch = Number(row["adSwitch"]);
                var wudianSceneList = row["wudianSceneList"];
                if(null != wudianSceneList)
                {
                    for (var j = 0; j < wudianSceneList.length; ++j)  
                    {
                        var wudianSceneValue = Number(wudianSceneList[j]);
                        rowData.wudianSceneList.push(wudianSceneValue);
                    }
                }
                config._da_tippy_ta.push(rowData);
            }
            return config;
        }
        else {
            config._da_tippy_ta.push(new AppSwitch_tippy_Data());
            return config;
        }
    }

    protected readonly _da_tippy_ta: Array<AppSwitch_tippy_Data> = new Array<AppSwitch_tippy_Data>();

    public getAppSwitchData(): AppSwitch_tippy_Data {
        return this._da_tippy_ta[0];
    }
}