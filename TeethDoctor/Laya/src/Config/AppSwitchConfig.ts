import App_XYXZS_Config from "../AppConfig";
import W_XYXZS_XAPI from "../WXAPI";

export class AppSwi_XYXZS_tchData
{
    public ver_XYXZS_sion : string = "";
    public ba_XYXZS_nner : number = 0;
    public wu_XYXZS_dian: number = 0;
    public wudi_XYXZS_anAvailableTime: object = {
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
    public get wudianTi_XYXZS_meAvaliable(): boolean{
        return this.wudi_XYXZS_anAvailableTime[new Date().getHours()] == 1;
    }
    public mai_XYXZS_liang: number = 1;
    public readonly mail_XYXZS_ianglist : Array<number> = new Array<number>();
    public readonly mailia_XYXZS_ngSceneList : Array<number> = new Array<number>();

    public readonly wxWuD_XYXZS_ianBanners : Array<string> = new Array<string>();
    public btnMo_XYXZS_veTimer : number = 1;
    public banner_XYXZS_MoveTimer : number = 0.5;
    public banner_XYXZS_FreshTimer : number = 200;
    public bannerCr_XYXZS_eateFailNum : number = 3;
    public bannerTod_XYXZS_ayBannerMax : number = 10;

    public adSw_XYXZS_itch : number = 1;

    public readonly wudia_XYXZS_nSceneList : Array<number> = new Array<number>();
    public BackAndNex_XYXZS_tBtnDelayTime:number=2;//回主页，下一关按钮延迟出现多少秒
    public GoOnBtnDe_XYXZS_layTime:number=2;//继续按钮延迟出现多少秒
    public fakeBtn :number = 0;
}

export default class AppSwi_XYXZS_tchConfig
{   
    public static getIn_XYXZS_stance() : AppSwi_XYXZS_tchConfig
    {
        if(null == AppSwi_XYXZS_tchConfig._ins_XYXZS_tance)
        {
            AppSwi_XYXZS_tchConfig._ins_XYXZS_tance = AppSwi_XYXZS_tchConfig.l_XYXZS_oad();
        }
        return AppSwi_XYXZS_tchConfig._ins_XYXZS_tance
    }
    protected static _ins_XYXZS_tance: AppSwi_XYXZS_tchConfig;

    protected static l_XYXZS_oad() : AppSwi_XYXZS_tchConfig
    {
        var config = new AppSwi_XYXZS_tchConfig();
        var json: any = Laya.loader.getRes(App_XYXZS_Config.ResSe_XYXZS_rver + "/json/appswitch.json");
        if(json){
            for(var i = 0;i < json.length;++i)
            {
                var row = json[i];
                var rowData: AppSwi_XYXZS_tchData = new AppSwi_XYXZS_tchData();
                rowData.ver_XYXZS_sion = String(row["version"]);
                rowData.ba_XYXZS_nner = Number(row["banner"]);
                rowData.wu_XYXZS_dian = Number(row["wudian"]);
                rowData.wudi_XYXZS_anAvailableTime = Object(row["wudianTime"]);
                rowData.mai_XYXZS_liang =  Number(row["mailiang"]);
                var mailianglist = row["mailianglist"];
                if(null != mailianglist)
                {
                    for (var j = 0; j < mailianglist.length; ++j)  
                    {
                        var flag = Number(mailianglist[j]);
                        rowData.mail_XYXZS_ianglist.push(flag);
                    }
                }
                var mailiangScenelist = row["mailiangScenelist"];
                if(null != mailiangScenelist)
                {
                    for (var j = 0; j < mailiangScenelist.length; ++j)  
                    {
                        var sceneValue = Number(mailiangScenelist[j]);
                        rowData.mailia_XYXZS_ngSceneList.push(sceneValue);
                    }
                }

                var wxwudianbanners = row["wxwudianbanners"];
                if(null != wxwudianbanners)
                {
                    for (var j = 0; j < wxwudianbanners.length; ++j)  
                    {
                        var bannerid = String(wxwudianbanners[j]);
                        rowData.wxWuD_XYXZS_ianBanners.push(bannerid);
                    }
                }
                rowData.btnMo_XYXZS_veTimer = Number(row["btnMoveTimer"]);
                rowData.banner_XYXZS_MoveTimer = Number(row["bannerMoveTimer"]);
                rowData.bannerCr_XYXZS_eateFailNum = Number(row["createFailNum"]);
                rowData.banner_XYXZS_FreshTimer = Number(row["bannerFreshTimer"]);
                rowData.bannerTod_XYXZS_ayBannerMax = Number(row["todayBannerMax"]);
                
                rowData.adSw_XYXZS_itch = Number(row["adSwitch"]);


                var wudianSceneList = row["wudianSceneList"];
                if(null != wudianSceneList)
                {
                    for (var j = 0; j < wudianSceneList.length; ++j)  
                    {
                        var wudianSceneValue = Number(wudianSceneList[j]);
                        rowData.wudia_XYXZS_nSceneList.push(wudianSceneValue);
                    }
                }

                rowData.BackAndNex_XYXZS_tBtnDelayTime = Number(row[""]);
                rowData.GoOnBtnDe_XYXZS_layTime = Number(row[""]);
                rowData.fakeBtn  =Number(row["fakeBtn"]);
                
                config._d_XYXZS_ata.push(rowData);
            }
            return config;
        }
        else{
            config._d_XYXZS_ata.push(new AppSwi_XYXZS_tchData());
            return config;
        }
    }

    protected readonly _d_XYXZS_ata : Array<AppSwi_XYXZS_tchData> = new Array<AppSwi_XYXZS_tchData>();

    public getAppSwi_XYXZS_tchData(): AppSwi_XYXZS_tchData
    {
        return this._d_XYXZS_ata[0];
    }
}