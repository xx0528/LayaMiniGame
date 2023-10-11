import ryw_AppConfig from "../AppConfig";
import ryw_WXAPI from "../WXAPI";

export class ryw_AppSwitchData
{
    public ryw_version : string = "";
    public ryw_banner : number = 0;
    public ryw_wudian: number = 0;
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
    public ryw_mailiang: number = 1;
    public readonly ryw_mailianglist : Array<number> = new Array<number>();
    public readonly ryw_mailiangSceneList : Array<number> = new Array<number>();

    public readonly ryw_wxWuDianBanners : Array<string> = new Array<string>();
    public readonly ryw_recreateBannerIDList : Array<string> = new Array<string>();
    public ryw_bannerRecreateTime : number = 5;
    public ryw_kuangdianjiange : number = 0;

    public ryw_btnMoveTimer : number = 1;
    public ryw_bannerMoveTimer : number = 0.5;
    public ryw_bannerFreshTimer : number = 200;
    public ryw_bannerCreateFailNum : number = 3;
    public ryw_bannerTodayBannerMax : number = 10;

    public ryw_adSwitch : number = 1;

    public readonly ryw_wudianSceneList : Array<number> = new Array<number>();

    public ryw_continueBtnDelayTime : number = 2;//Exprot2ViewTemplate 中继续按钮延迟显示的时间
    public ryw_bannerShowTime : number = 30;

    public fakeBtn : number = 0;
    
    public ryw_popAd : number = 0;//是否启用 Exprot3ViewTemplate,
    public ryw_continueBanner : number = 0;//Exprot3ViewTemplate 是否开启Banner显示
    public ryw_continueBannerShowTime : number = 2;//Exprot3ViewTemplate 中Banner延迟显示的时间 
    public ryw_continueBannerHideTime : number = 2;//Exprot3ViewTemplate 中Banner显示后延迟关闭的时间 

    public readonly ryw_oppocfg = new ryw_OPPOCfg(); 
    public readonly ryw_qqcfg = new ryw_QQCfg();
    public readonly ryw_ttcfg = new ryw_TTCfg();
    public readonly ryw_vivocfg = new ryw_VVcfg();
    public readonly ryw_wxcfg = new WXCfg();
}


export class WXCfg
{
    ryw_kuangdianBanner : number = 0;
    ryw_kuangdianLevelSpcacing : number = 0;
}

export class ryw_OPPOCfg
{
    public ryw_yuansheng : number = 100;
    public ryw_yuanshengSwitch : number = 1;
    public ryw_addToDesktop : number = 0;
    public ryw_oppoversions : string = "";
    public ryw_btnShowTimer : number = 0;
    public ryw_indexAdSwitch : number = 0;
    public ryw_endAdSwitch : number = 0;
    public ryw_yuansheng2 : number = 100;
    public ryw_yuanshengSwitch2 : number = 1;
}

export class ryw_QQCfg
{
    public ryw_kuangdianBanner : number = 0;
    public ryw_kuangdianBox : number = 0;
    public ryw_box : number = 0;
    public ryw_weiyi : number = 0;
    public ryw_qqversions : string = "";
}

export class ryw_TTCfg
{
    public ryw_moreGameSwitch : number = 0;
    public ryw_kuangdianBanner : number = 0;
    public ryw_luping : number = 0;
    public ryw_ttversions : string = "";
}

export class ryw_VVcfg
{
    ryw_yuanshengSwitch: number = 1;
    ryw_yuansheng: number = 100;
    ryw_yuanshengSwitch2: number = 1;
    ryw_yuansheng2: number = 100;
    ryw_chapingSwitch: number = 1;
    ryw_chaping: number = 100;
    ryw_addToDesktop: number = 1;
    ryw_vivoversions: string = "";
    btnShowTimer: number = 1;
}

export default class ryw_AppSwitchConfig
{   
    public static ryw_getInstance() : ryw_AppSwitchConfig
    {
        if(null == ryw_AppSwitchConfig.ryw__instance)
        {
            ryw_AppSwitchConfig.ryw__instance = ryw_AppSwitchConfig.ryw_load();
        }
        return ryw_AppSwitchConfig.ryw__instance
    }
    protected static ryw__instance: ryw_AppSwitchConfig;

    protected static ryw_load() : ryw_AppSwitchConfig
    {
        var config = new ryw_AppSwitchConfig();
        var json: any = Laya.loader.getRes(ryw_AppConfig.ryw_ResServer + "/json/appswitch.json");
        console.log("********************************  AppSwitchConfig load   json ",json);
        if(json){
            for(var i = 0;i < json.length;++i)
            {
                var row = json[i];
                var rowData: ryw_AppSwitchData = new ryw_AppSwitchData();
                rowData.ryw_version = String(row["version"]);
                rowData.ryw_banner = Number(row["banner"]);
                rowData.ryw_wudian = Number(row["wudian"]);
                (rowData as any).wudianAvailableTime = Object(row["wudianTime"]);
                rowData.ryw_mailiang =  Number(row["mailiang"]);
                var mailianglist = row["mailianglist"];
                if(null != mailianglist)
                {
                    for (var j = 0; j < mailianglist.length; ++j)  
                    {
                        var flag = Number(mailianglist[j]);
                        rowData.ryw_mailianglist.push(flag);
                    }
                }
                var mailiangScenelist = row["mailiangScenelist"];
                if(null != mailiangScenelist)
                {
                    for (var j = 0; j < mailiangScenelist.length; ++j)  
                    {
                        var sceneValue = Number(mailiangScenelist[j]);
                        rowData.ryw_mailiangSceneList.push(sceneValue);
                    }
                }

                var wxwudianbanners = row["wxwudianbanners"];
                if(null != wxwudianbanners)
                {
                    for (var j = 0; j < wxwudianbanners.length; ++j)  
                    {
                        let bannerid = String(wxwudianbanners[j]);
                        rowData.ryw_wxWuDianBanners.push(bannerid);
                    }
                }

                var recreateBannerIDList = row["recreateBannerIDList"];
                if(null != recreateBannerIDList)
                {
                    for (var j = 0; j < recreateBannerIDList.length; ++j)  
                    {
                        let bannerid = String(recreateBannerIDList[j]);
                        rowData.ryw_recreateBannerIDList.push(bannerid);
                    }
                }

                rowData.ryw_bannerRecreateTime = null != row["bannerRecreateTime"] ?  Number(row["bannerRecreateTime"]) : rowData.ryw_bannerRecreateTime;
                rowData.ryw_kuangdianjiange = null != row["kuangdianjiange"] ?  Number(row["kuangdianjiange"]) : rowData.ryw_kuangdianjiange;
                rowData.ryw_btnMoveTimer = Number(row["btnMoveTimer"]);
                rowData.ryw_bannerMoveTimer = Number(row["bannerMoveTimer"]);
                rowData.ryw_bannerCreateFailNum = Number(row["createFailNum"]);
                rowData.ryw_bannerFreshTimer = Number(row["bannerFreshTimer"]);
                rowData.ryw_bannerTodayBannerMax = Number(row["todayBannerMax"]);
                
                rowData.ryw_adSwitch = Number(row["adSwitch"]);

                var wudianSceneList = row["wudianSceneList"];
                if(null != wudianSceneList)
                {
                    for (var j = 0; j < wudianSceneList.length; ++j)  
                    {
                        var wudianSceneValue = Number(wudianSceneList[j]);
                        rowData.ryw_wudianSceneList.push(wudianSceneValue);
                    }
                }

                rowData.ryw_continueBtnDelayTime =  Number(row["continueBtnDelayTime"]);
                rowData.ryw_bannerShowTime =  Number(row["bannerShowTime"]);

                rowData.fakeBtn = null != row["fakeBtn"] ? Number(row["fakeBtn"]) : rowData.fakeBtn;

                rowData.ryw_popAd = null != row["popAd"] ? Number(row["popAd"]) : rowData.ryw_popAd;
                rowData.ryw_continueBanner = null != row["continueBanner"] ? Number(row["continueBanner"]) : rowData.ryw_continueBanner;
                rowData.ryw_continueBannerShowTime = null != row["continueBannerShowTime"] ? Number(row["continueBannerShowTime"]) : rowData.ryw_continueBannerShowTime;
                rowData.ryw_continueBannerHideTime = null != row["continueBannerHideTime"] ? Number(row["continueBannerHideTime"]) : rowData.ryw_continueBannerHideTime;

                if(null != row["oppocfg"])
                {
                    let cfg = row["oppocfg"];
                    rowData.ryw_oppocfg.ryw_yuansheng = Number(cfg["yuansheng"]);
                    rowData.ryw_oppocfg.ryw_yuanshengSwitch = Number(cfg["yuanshengSwitch"]);
                    rowData.ryw_oppocfg.ryw_addToDesktop = Number(cfg["addToDesktop"]);
                    rowData.ryw_oppocfg.ryw_oppoversions = String(cfg["oppoversions"]);
                    rowData.ryw_oppocfg.ryw_btnShowTimer = Number(cfg["btnShowTimer"]);
                    rowData.ryw_oppocfg.ryw_indexAdSwitch = Number(cfg["indexAdSwitch"]);
                    rowData.ryw_oppocfg.ryw_endAdSwitch = Number(cfg["endAdSwitch"]);
                    rowData.ryw_oppocfg.ryw_yuansheng2 = null != cfg["yuansheng2"] ?  Number(cfg["yuansheng2"]) : rowData.ryw_oppocfg.ryw_yuansheng2;
                    rowData.ryw_oppocfg.ryw_yuanshengSwitch2 =null != cfg["yuanshengSwitch2"] ?  Number(cfg["yuanshengSwitch2"]) : rowData.ryw_oppocfg.ryw_yuanshengSwitch2;
                }

                if(null != row["qqcfg"])
                {
                    let cfg = row["qqcfg"];
                    rowData.ryw_qqcfg.ryw_kuangdianBanner = Number(cfg["kuangdianBanner"]);
                    rowData.ryw_qqcfg.ryw_kuangdianBox = Number(cfg["kuangdianBox"]);
                    rowData.ryw_qqcfg.ryw_box = Number(cfg["box"]);
                    rowData.ryw_qqcfg.ryw_weiyi = Number(cfg["weiyi"]);
                    rowData.ryw_qqcfg.ryw_qqversions = String(cfg["qqversions"]);
                }

                if(null != row["ttcfg"])
                {
                    let cfg = row["ttcfg"];
                    rowData.ryw_ttcfg.ryw_moreGameSwitch = Number(cfg["moreGameSwitch"]);
                    rowData.ryw_ttcfg.ryw_kuangdianBanner = Number(cfg["kuangdianBanner"]);
                    rowData.ryw_ttcfg.ryw_luping = Number(cfg["luping"]);
                    rowData.ryw_ttcfg.ryw_ttversions = String(cfg["ttversions"]);
                }

                if(null != row["vivocfg"])
                {
                    let cfg = row["vivocfg"];
                    rowData.ryw_vivocfg.ryw_yuanshengSwitch = Number(cfg["yuanshengSwitch"]);
                    rowData.ryw_vivocfg.ryw_yuansheng = Number(cfg["yuansheng"]);
                    rowData.ryw_vivocfg.ryw_yuanshengSwitch2 = Number(cfg["yuanshengSwitch2"]);
                    rowData.ryw_vivocfg.ryw_yuansheng2 = Number(cfg["yuansheng2"]);
                    rowData.ryw_vivocfg.ryw_chapingSwitch = Number(cfg["chapingSwitch"]);
                    rowData.ryw_vivocfg.ryw_chaping = Number(cfg["chaping"]);
                    rowData.ryw_vivocfg.ryw_addToDesktop = Number(cfg["addToDesktop"]);
                    rowData.ryw_vivocfg.ryw_vivoversions = String(cfg["vivoversions"]);
                    rowData.ryw_vivocfg.btnShowTimer = Number(cfg["btnShowTimer"]);
                }

                if(null != row["wxcfg"])
                {
                    let cfg = row["wxcfg"];
                    rowData.ryw_wxcfg.ryw_kuangdianBanner = Number(cfg["kuangdianBanner"]);
                    rowData.ryw_wxcfg.ryw_kuangdianLevelSpcacing = Number(cfg["kuangdianLevelSpcacing"]);
                }

                config.ryw__data.push(rowData);
            }
            return config;
        }
        else{
            config.ryw__data.push(new ryw_AppSwitchData());
            return config;
        }
    }

    protected readonly ryw__data : Array<ryw_AppSwitchData> = new Array<ryw_AppSwitchData>();

    public ryw_getAppSwitchData(): ryw_AppSwitchData
    {
        return this.ryw__data[0];
    }
}