import AppC_JJKLBB_onfig from "../AppConfig";
import WXAPI from "../WXAPI";

export class AppSwit_JJKLBB_chData
{
    public ban_JJKLBB_ner : number = 0;
    public adS_JJKLBB_witch : number = 0;
    public wu_JJKLBB_dian: number = 0;
    public wudia_JJKLBB_nTime_01: number = 2000;
    public wudian_JJKLBB_Time_01PreLoad: number = 500;
    public shipint_JJKLBB_ubiao: number = 1;
    private wudianAv_JJKLBB_ailableTime: object = {
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
    public get wudianTim_JJKLBB_eAvaliable(): boolean{
        return this.wudianAv_JJKLBB_ailableTime[new Date().getHours()] == 1;
    }
    public maili_JJKLBB_ang: number = 1;
    public readonly mailia_JJKLBB_nglist : Array<number> = new Array<number>();
    public readonly mailiangSceneList : Array<number> = new Array<number>();

    public readonly wxWuDianB_JJKLBB_anners : Array<string> = new Array<string>();
    public btnMov_JJKLBB_eTimer : number = 1;
    public bannerMo_JJKLBB_veTimer : number = 0.5;
    public bannerFres_JJKLBB_hTimer : number = 200;
    public bannerCr_JJKLBB_eateFailNum : number = 3;
    public bannerTod_JJKLBB_ayBannerMax : number = 10;
    public skinPR : number = 50;
    public readonly wudianSceneList : Array<number> = new Array<number>();
    public btnDelayTime : number = 0;
    public popAdSwitch : number = 1;

    public firstWudian : number = 1;
    public secondWudian : number = 1;
    public commonBtnDelayTime : number = 0;
    public sideAdSwitch : number = 0;
}

export default class AppSwitch_JJKLBB_Config
{   
    public static getInst_JJKLBB_ance() : AppSwitch_JJKLBB_Config
    {
        if(null == AppSwitch_JJKLBB_Config._instance)
        {
            AppSwitch_JJKLBB_Config._instance = AppSwitch_JJKLBB_Config.load();
        }
        return AppSwitch_JJKLBB_Config._instance
    }
    protected static _instance: AppSwitch_JJKLBB_Config;

    protected static load() : AppSwitch_JJKLBB_Config
    {
        var config = new AppSwitch_JJKLBB_Config();
        var json: any = Laya.loader.getRes(AppC_JJKLBB_onfig.ResSe_JJKLBB_rver + "/json/appswitch.json");
        if(json){
            for(var i = 0;i < json.length;++i)
            {
                var row = json[i];
                var rowData: AppSwit_JJKLBB_chData = new AppSwit_JJKLBB_chData();
                rowData.ban_JJKLBB_ner = Number(row["banner"]);
                rowData.adS_JJKLBB_witch = Number(row["adSwitch"]);
                rowData.wu_JJKLBB_dian = Number(row["wudian"]);
                rowData.wudia_JJKLBB_nTime_01 = Number(row["wudianTime_01"]);//????这个字段是啥
                rowData.wudian_JJKLBB_Time_01PreLoad = Number(row["wudianTime_01PreLoad"]);//????这个字段是啥
                rowData.shipint_JJKLBB_ubiao = Number(row["shipintubiao"]);//????这个字段是啥
                (rowData as any).wudianAvailableTime = Object(row["wudianTime"]);
                rowData.maili_JJKLBB_ang =  Number(row["mailiang"]);
                var mailianglist = row["mailianglist"];
                if(null != mailianglist)
                {
                    for (var j = 0; j < mailianglist.length; ++j)  
                    {
                        var flag = Number(mailianglist[j]);
                        rowData.mailia_JJKLBB_nglist.push(flag);
                    }
                }
                var mailiangScenelist = row["mailiangScenelist"];
                if(null != mailiangScenelist)
                {
                    for (var j = 0; j < mailiangScenelist.length; ++j)  
                    {
                        var sceneValue = Number(mailiangScenelist[j]);
                        rowData.mailiangSceneList.push(sceneValue);
                    }
                }
                
                var wxwudianbanners = row["wxwudianbanners"];
                if(null != wxwudianbanners)
                {
                    for (var j = 0; j < wxwudianbanners.length; ++j)  
                    {
                        var bannerid = String(wxwudianbanners[j]);
                        rowData.wxWuDianB_JJKLBB_anners.push(bannerid);
                    }
                }
                rowData.btnMov_JJKLBB_eTimer = Number(row["btnMoveTimer"]);
                rowData.bannerMo_JJKLBB_veTimer = Number(row["bannerMoveTimer"]);
                rowData.bannerFres_JJKLBB_hTimer = Number(row["bannerFreshTimer"]);
                rowData.bannerCr_JJKLBB_eateFailNum = Number(row["createFailNum"]);
                rowData.bannerTod_JJKLBB_ayBannerMax = Number(row["todayBannerMax"]);
                rowData.skinPR = Number(row["skinPR"]);
                rowData.popAdSwitch = Number(row["popAdSwitch"]);

                var wudianSceneList = row["wudianSceneList"];
                if(null != wudianSceneList)
                {
                    for (var j = 0; j < wudianSceneList.length; ++j)  
                    {
                        var wudianSceneValue = Number(wudianSceneList[j]);
                        rowData.wudianSceneList.push(wudianSceneValue);
                    }
                }
                
                rowData.firstWudian = Number(row["firstWudian"]);
                rowData.secondWudian = Number(row["secondWudian"]);
                rowData.btnDelayTime = Number(row["btnDelayTime"]);
                rowData.commonBtnDelayTime = Number(row["commonBtnDelayTime"]);
                rowData.sideAdSwitch = Number(row["sideAdSwitch"]);
                config._data.push(rowData);
            }
            return config;
        }
        else{
            config._data.push(new AppSwit_JJKLBB_chData());
            return config;
        }
    }

    protected readonly _data : Array<AppSwit_JJKLBB_chData> = new Array<AppSwit_JJKLBB_chData>();

    public getAppS_JJKLBB_witchData(): AppSwit_JJKLBB_chData
    {
        return this._data[0];
    }
}