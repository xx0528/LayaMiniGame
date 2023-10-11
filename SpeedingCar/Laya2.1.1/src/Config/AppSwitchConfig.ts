import App_wcjtn_Config from "../AppConfig";
import WX_wcjtn_API from "../WXAPI";

export class App_wcjtn_Switch_wcjtn_Data
{
    public ver_wcjtn_sion : string = "";
    public ba_wcjtn_nner : number = 0;
    public wu_wcjtn_dian: number = 0;
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
    public mai_wcjtn_liang: number = 1;
    public readonly mailiang_wcjtn_list : Array<number> = new Array<number>();
    public readonly mailiang_wcjtn_Scene_wcjtn_List : Array<number> = new Array<number>();

    public readonly wx_wcjtn_Wu_wcjtn_Dian_wcjtn_Banners : Array<string> = new Array<string>();
    public readonly recreate_wcjtn_Banner_wcjtn_IDList : Array<string> = new Array<string>();
    public banner_wcjtn_Recreate_wcjtn_Time : number = 5;
    public kuang_wcjtn_dian_wcjtn_jiange : number = 0;

    public btn_wcjtn_Move_wcjtn_Timer : number = 1;
    public banner_wcjtn_Move_wcjtn_Timer : number = 0.5;
    public banner_wcjtn_Fresh_wcjtn_Timer : number = 200;
    public banner_wcjtn_Create_wcjtn_FailNum : number = 3;
    public banner_wcjtn_Today_wcjtn_Banner_wcjtn_Max : number = 10;


    public ad_wcjtn_Switch : number = 1;
    public fakeBtn : number = 1;

    public readonly wu_wcjtn_dian_wcjtn_Scene_wcjtn_List : Array<number> = new Array<number>();

    public continue_wcjtn_Btn_wcjtn_DelayTime : number = 2;
    public banner_wcjtn_Show_wcjtn_Time : number = 30;

    public readonly oppo_wcjtn_cfg = new OPPO_wcjtn_Cfg();
    public readonly qq_wcjtn_cfg = new QQ_wcjtn_Cfg();
    public readonly tt_wcjtn_cfg = new TT_wcjtn_Cfg();

    public pop_wcjtn_Ad : number = 0;//是否启用 Exprot3ViewTemplate,
    public continue_wcjtn_Banner : number = 0;//Exprot2ViewTemplate 是否开启Banner显示
    public continue_wcjtn_Banner_wcjtn_ShowTime : number = 2;//Exprot2ViewTemplate 中Banner延迟显示的时间 
    public continue_wcjtn_Banner_wcjtn_HideTime : number = 2;//Exprot2ViewTemplate 中Banner显示后延迟关闭的时间 

    public readonly vivocfg = new VVcfg();
    public readonly wxcfg = new WXCfg();
}


export class WXCfg
{
    kuang_wcjtn_dian_wcjtn_Banner : number = 0;
    kuang_wcjtn_dian_wcjtn_LevelSpcacing : number = 0;
}

export class OPPO_wcjtn_Cfg
{
    public yuan_wcjtn_sheng : number = 100;
    public yuan_wcjtn_sheng_wcjtn_Switch : number = 1;
    public add_wcjtn_To_wcjtn_Desktop : number = 0;
    public oppo_wcjtn_versions : string = "";
    public btn_wcjtn_Show_wcjtn_Timer : number = 0;
    public index_wcjtn_Ad_wcjtn_Switch : number = 0;
    public end_wcjtn_Ad_wcjtn_Switch : number = 0;
    public yuan_wcjtn_sheng2 : number = 100;
    public yuan_wcjtn_sheng_wcjtn_Switch2 : number = 1;
}

export class QQ_wcjtn_Cfg
{
    public kuang_wcjtn_dian_wcjtn_Banner : number = 0;
    public kuangdian_wcjtn_Box : number = 0;
    public box : number = 0;
    public wei_wcjtn_yi : number = 0;
    public qq_wcjtn_versions : string = "";
}

export class TT_wcjtn_Cfg
{
    public more_wcjtn_Game_wcjtn_Switch : number = 0;
    public kuang_wcjtn_dian_wcjtn_Banner : number = 0;
    public lu_wcjtn_ping : number = 0;
    public tt_wcjtn_versions : string = "";
}

export class VVcfg
{
    yuanshengSwitch: number = 1;
    yuansheng: number = 100;
    yuanshengSwitch2: number = 1;
    yuansheng2: number = 100;
    chapingSwitch: number = 1;
    chaping: number = 100;
    addToDesktop: number = 1;
    vivoversions: string = "";
    btnShowTimer: number = 1;
}

export default class App_wcjtn_Switch_wcjtn_Config
{   
    public static get_wcjtn_Instance() : App_wcjtn_Switch_wcjtn_Config
    {
        if(null == App_wcjtn_Switch_wcjtn_Config._instance)
        {
            App_wcjtn_Switch_wcjtn_Config._instance = App_wcjtn_Switch_wcjtn_Config.lo_wcjtn_ad();
        }
        return App_wcjtn_Switch_wcjtn_Config._instance
    }
    protected static _instance: App_wcjtn_Switch_wcjtn_Config;

    protected static lo_wcjtn_ad() : App_wcjtn_Switch_wcjtn_Config
    {
        var config = new App_wcjtn_Switch_wcjtn_Config();
        var json: any = Laya.loader.getRes(App_wcjtn_Config.Res_wcjtn_Server + "/json/appswitch.json");
        if(json){
            for(var i = 0;i < json.length;++i)
            {
                var row = json[i];
                var rowData: App_wcjtn_Switch_wcjtn_Data = new App_wcjtn_Switch_wcjtn_Data();
                rowData.ver_wcjtn_sion = String(row["version"]);
                rowData.ba_wcjtn_nner = Number(row["banner"]);
                rowData.wu_wcjtn_dian = Number(row["wudian"]);
                (rowData as any).wudianAvailableTime = Object(row["wudianTime"]);
                rowData.mai_wcjtn_liang =  Number(row["mailiang"]);
                var mailianglist = row["mailianglist"];
                if(null != mailianglist)
                {
                    for (var j = 0; j < mailianglist.length; ++j)  
                    {
                        var flag = Number(mailianglist[j]);
                        rowData.mailiang_wcjtn_list.push(flag);
                    }
                }
                var mailiangScenelist = row["mailiangScenelist"];
                if(null != mailiangScenelist)
                {
                    for (var j = 0; j < mailiangScenelist.length; ++j)  
                    {
                        var sceneValue = Number(mailiangScenelist[j]);
                        rowData.mailiang_wcjtn_Scene_wcjtn_List.push(sceneValue);
                    }
                }

                var wxwudianbanners = row["wxwudianbanners"];
                if(null != wxwudianbanners)
                {
                    for (var j = 0; j < wxwudianbanners.length; ++j)  
                    {
                        var bannerid = String(wxwudianbanners[j]);
                        rowData.wx_wcjtn_Wu_wcjtn_Dian_wcjtn_Banners.push(bannerid);
                    }
                }
                rowData.btn_wcjtn_Move_wcjtn_Timer = Number(row["btnMoveTimer"]);
                rowData.banner_wcjtn_Move_wcjtn_Timer = Number(row["bannerMoveTimer"]);
                rowData.banner_wcjtn_Create_wcjtn_FailNum = Number(row["createFailNum"]);
                rowData.banner_wcjtn_Fresh_wcjtn_Timer = Number(row["bannerFreshTimer"]);
                rowData.banner_wcjtn_Today_wcjtn_Banner_wcjtn_Max = Number(row["todayBannerMax"]);

                var recreateBannerIDList = row["recreateBannerIDList"];
                if(null != recreateBannerIDList)
                {
                    for (var j = 0; j < recreateBannerIDList.length; ++j)  
                    {
                        let bannerid = String(recreateBannerIDList[j]);
                        rowData.recreate_wcjtn_Banner_wcjtn_IDList.push(bannerid);
                    }
                }

                var recreateBannerIDList = row["recreateBannerIDList"];
                if(null != recreateBannerIDList)
                {
                    for (var j = 0; j < recreateBannerIDList.length; ++j)  
                    {
                        let bannerid = String(recreateBannerIDList[j]);
                        rowData.recreate_wcjtn_Banner_wcjtn_IDList.push(bannerid);
                    }
                }

                rowData.banner_wcjtn_Recreate_wcjtn_Time = null != row["bannerRecreateTime"] ?  Number(row["bannerRecreateTime"]) : rowData.banner_wcjtn_Recreate_wcjtn_Time;
                rowData.kuang_wcjtn_dian_wcjtn_jiange = null != row["kuangdianjiange"] ?  Number(row["kuangdianjiange"]) : rowData.kuang_wcjtn_dian_wcjtn_jiange;
                rowData.btn_wcjtn_Move_wcjtn_Timer = Number(row["btnMoveTimer"]);
                rowData.banner_wcjtn_Move_wcjtn_Timer = Number(row["bannerMoveTimer"]);
                rowData.banner_wcjtn_Create_wcjtn_FailNum = Number(row["createFailNum"]);
                rowData.banner_wcjtn_Fresh_wcjtn_Timer = Number(row["bannerFreshTimer"]);
                rowData.banner_wcjtn_Today_wcjtn_Banner_wcjtn_Max = Number(row["todayBannerMax"]);
                
                rowData.ad_wcjtn_Switch = Number(row["adSwitch"]);
                rowData.fakeBtn = Number(row["fakeBtn"]);

                var wudianSceneList = row["wudianSceneList"];
                if(null != wudianSceneList)
                {
                    for (var j = 0; j < wudianSceneList.length; ++j)  
                    {
                        var wudianSceneValue = Number(wudianSceneList[j]);
                        rowData.wu_wcjtn_dian_wcjtn_Scene_wcjtn_List.push(wudianSceneValue);
                    }
                }

                rowData.continue_wcjtn_Btn_wcjtn_DelayTime =  Number(row["continueBtnDelayTime"]);
                rowData.banner_wcjtn_Show_wcjtn_Time =  Number(row["bannerShowTime"]);

                rowData.fakeBtn = null != row["fakeBtn"] ? Number(row["fakeBtn"]) : rowData.fakeBtn;

                rowData.pop_wcjtn_Ad = null != row["popAd"] ? Number(row["popAd"]) : rowData.pop_wcjtn_Ad;
                rowData.continue_wcjtn_Banner = null != row["continueBanner"] ? Number(row["continueBanner"]) : rowData.continue_wcjtn_Banner;
                rowData.continue_wcjtn_Banner_wcjtn_ShowTime = null != row["continueBannerShowTime"] ? Number(row["continueBannerShowTime"]) : rowData.continue_wcjtn_Banner_wcjtn_ShowTime;
                rowData.continue_wcjtn_Banner_wcjtn_HideTime = null != row["continueBannerHideTime"] ? Number(row["continueBannerHideTime"]) : rowData.continue_wcjtn_Banner_wcjtn_HideTime;

                if(null != row["oppocfg"])
                {
                    let cfg = row["oppocfg"];
                    rowData.oppo_wcjtn_cfg.yuan_wcjtn_sheng = Number(cfg["yuansheng"]);
                    rowData.oppo_wcjtn_cfg.yuan_wcjtn_sheng_wcjtn_Switch = Number(cfg["yuanshengSwitch"]);
                    rowData.oppo_wcjtn_cfg.add_wcjtn_To_wcjtn_Desktop = Number(cfg["addToDesktop"]);
                    rowData.oppo_wcjtn_cfg.oppo_wcjtn_versions = String(cfg["oppoversions"]);
                    rowData.oppo_wcjtn_cfg.btn_wcjtn_Show_wcjtn_Timer = Number(cfg["btnShowTimer"]);
                    rowData.oppo_wcjtn_cfg.index_wcjtn_Ad_wcjtn_Switch = Number(cfg["indexAdSwitch"]);
                    rowData.oppo_wcjtn_cfg.end_wcjtn_Ad_wcjtn_Switch = Number(cfg["endAdSwitch"]);
                    rowData.oppo_wcjtn_cfg.yuan_wcjtn_sheng2 = null != cfg["yuansheng2"] ?  Number(cfg["yuansheng2"]) : rowData.oppo_wcjtn_cfg.yuan_wcjtn_sheng2;
                    rowData.oppo_wcjtn_cfg.yuan_wcjtn_sheng_wcjtn_Switch2 =null != cfg["yuanshengSwitch2"] ?  Number(cfg["yuanshengSwitch2"]) : rowData.oppo_wcjtn_cfg.yuan_wcjtn_sheng_wcjtn_Switch2;
                }

                if(null != row["qqcfg"])
                {
                    let cfg = row["qqcfg"];
                    rowData.qq_wcjtn_cfg.kuang_wcjtn_dian_wcjtn_Banner = Number(cfg["kuangdianBanner"]);
                    rowData.qq_wcjtn_cfg.kuangdian_wcjtn_Box = Number(cfg["kuangdianBox"]);
                    rowData.qq_wcjtn_cfg.box = Number(cfg["box"]);
                    rowData.qq_wcjtn_cfg.wei_wcjtn_yi = Number(cfg["weiyi"]);
                    rowData.qq_wcjtn_cfg.qq_wcjtn_versions = String(cfg["qqversions"]);
                }

                if(null != row["ttcfg"])
                {
                    let cfg = row["ttcfg"];
                    rowData.tt_wcjtn_cfg.more_wcjtn_Game_wcjtn_Switch = Number(cfg["moreGameSwitch"]);
                    rowData.tt_wcjtn_cfg.kuang_wcjtn_dian_wcjtn_Banner = Number(cfg["kuangdianBanner"]);
                    rowData.tt_wcjtn_cfg.lu_wcjtn_ping = Number(cfg["luping"]);
                    rowData.tt_wcjtn_cfg.tt_wcjtn_versions = String(cfg["ttversions"]);
                }

                if(null != row["vivocfg"])
                {
                    let cfg = row["vivocfg"];
                    rowData.vivocfg.yuanshengSwitch = Number(cfg["yuanshengSwitch"]);
                    rowData.vivocfg.yuansheng = Number(cfg["yuansheng"]);
                    rowData.vivocfg.yuanshengSwitch2 = Number(cfg["yuanshengSwitch2"]);
                    rowData.vivocfg.yuansheng2 = Number(cfg["yuansheng2"]);
                    rowData.vivocfg.chapingSwitch = Number(cfg["chapingSwitch"]);
                    rowData.vivocfg.chaping = Number(cfg["chaping"]);
                    rowData.vivocfg.addToDesktop = Number(cfg["addToDesktop"]);
                    rowData.vivocfg.vivoversions = String(cfg["vivoversions"]);
                    rowData.vivocfg.btnShowTimer = Number(cfg["btnShowTimer"]);
                }

                if(null != row["wxcfg"])
                {
                    let cfg = row["wxcfg"];
                    rowData.wxcfg.kuang_wcjtn_dian_wcjtn_Banner = Number(cfg["kuangdianBanner"]);
                    rowData.wxcfg.kuang_wcjtn_dian_wcjtn_LevelSpcacing = Number(cfg["kuangdianLevelSpcacing"]);
                }

                config._data.push(rowData);
            }
            return config;
        }
        else{
            config._data.push(new App_wcjtn_Switch_wcjtn_Data());
            return config;
        }
    }

    protected readonly _data : Array<App_wcjtn_Switch_wcjtn_Data> = new Array<App_wcjtn_Switch_wcjtn_Data>();

    public get_wcjtn_App_wcjtn_Switch_wcjtn_Data(): App_wcjtn_Switch_wcjtn_Data
    {
        return this._data[0];
    }
}