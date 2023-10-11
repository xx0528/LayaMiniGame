import AppConfig from "../AppConfig";
import WXAPI from "../WXAPI";

export class AppSwitchData
{
    public version : string = "";
    public banner : number = 0;
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
    public get wudianTimeAvaliable(): boolean{
        return this.wudianAvailableTime[new Date().getHours()] == 1;
    }
    public mailiang: number = 1;
    public readonly mailianglist : Array<number> = new Array<number>();
    public readonly mailiangSceneList : Array<number> = new Array<number>();

    public readonly wxWuDianBanners : Array<string> = new Array<string>();
    public readonly recreateBannerIDList : Array<string> = new Array<string>();
    public bannerRecreateTime : number = 5;
    public kuangdianjiange : number = 0;
    
    public btnMoveTimer : number = 1;
    public bannerMoveTimer : number = 0.5;
    public bannerFreshTimer : number = 200;
    public bannerCreateFailNum : number = 3;
    public bannerTodayBannerMax : number = 10;

    public adSwitch : number = 1;

    public readonly wudianSceneList : Array<number> = new Array<number>();

    public continueBtnDelayTime : number = 2;//Exprot2ViewTemplate 中继续按钮延迟显示的时间
    public bannerShowTime : number = 30;

    public fakeBtn : number = 0;

    public popAd : number = 0;//是否启用 Exprot3ViewTemplate,
    public continueBanner : number = 0;//Exprot2ViewTemplate 是否开启Banner显示
    public continueBannerShowTime : number = 2;//Exprot2ViewTemplate 中Banner延迟显示的时间 
    public continueBannerHideTime : number = 2;//Exprot2ViewTemplate 中Banner显示后延迟关闭的时间 

    public readonly oppocfg = new OPPOCfg(); 
    public readonly qqcfg = new QQCfg();
    public readonly ttcfg = new TTCfg();
    public readonly vivocfg = new VVcfg();
    public readonly wxcfg = new WXCfg();
}


export class WXCfg
{
    kuangdianBanner : number = 0;
    kuangdianLevelSpcacing : number = 0;
}

export class OPPOCfg
{
    public yuansheng : number = 100;
    public yuanshengSwitch : number = 1;
    public addToDesktop : number = 0;
    public oppoversions : string = "";
    public btnShowTimer : number = 0;
    public indexAdSwitch : number = 0;
    public endAdSwitch : number = 0;
    public yuansheng2 : number = 100;
    public yuanshengSwitch2 : number = 1;
}

export class QQCfg
{
    public kuangdianBanner : number = 0;
    public kuangdianBox : number = 0;
    public box : number = 0;
    public weiyi : number = 0;
    public qqversions : string = "";
}

export class TTCfg
{
    public moreGameSwitch : number = 0;
    public kuangdianBanner : number = 0;
    public luping : number = 0;
    public ttversions : string = "";
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
        var json: any = Laya.loader.getRes(AppConfig.ResServer + "/json/appswitch.json");
        if(json){
            for(var i = 0;i < json.length;++i)
            {
                var row = json[i];
                var rowData: AppSwitchData = new AppSwitchData();
                rowData.version = String(row["version"]);
                rowData.banner = Number(row["banner"]);
                rowData.wudian = Number(row["wudian"]);
                (rowData as any).wudianAvailableTime = Object(row["wudianTime"]);
                rowData.mailiang =  Number(row["mailiang"]);
                var mailianglist = row["mailianglist"];
                if(null != mailianglist)
                {
                    for (var j = 0; j < mailianglist.length; ++j)  
                    {
                        var flag = Number(mailianglist[j]);
                        rowData.mailianglist.push(flag);
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
                        let bannerid = String(wxwudianbanners[j]);
                        rowData.wxWuDianBanners.push(bannerid);
                    }
                }

                var recreateBannerIDList = row["recreateBannerIDList"];
                if(null != recreateBannerIDList)
                {
                    for (var j = 0; j < recreateBannerIDList.length; ++j)  
                    {
                        let bannerid = String(recreateBannerIDList[j]);
                        rowData.recreateBannerIDList.push(bannerid);
                    }
                }

                rowData.bannerRecreateTime = null != row["bannerRecreateTime"] ?  Number(row["bannerRecreateTime"]) : rowData.bannerRecreateTime;
                rowData.kuangdianjiange = null != row["kuangdianjiange"] ?  Number(row["kuangdianjiange"]) : rowData.kuangdianjiange;
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

                rowData.continueBtnDelayTime =  Number(row["continueBtnDelayTime"]);
                rowData.bannerShowTime =  Number(row["bannerShowTime"]);

                rowData.fakeBtn = null != row["fakeBtn"] ? Number(row["fakeBtn"]) : rowData.fakeBtn;

                rowData.popAd = null != row["popAd"] ? Number(row["popAd"]) : rowData.popAd;
                rowData.continueBanner = null != row["continueBanner"] ? Number(row["continueBanner"]) : rowData.continueBanner;
                rowData.continueBannerShowTime = null != row["continueBannerShowTime"] ? Number(row["continueBannerShowTime"]) : rowData.continueBannerShowTime;
                rowData.continueBannerHideTime = null != row["continueBannerHideTime"] ? Number(row["continueBannerHideTime"]) : rowData.continueBannerHideTime;

                if(null != row["oppocfg"])
                {
                    let cfg = row["oppocfg"];
                    rowData.oppocfg.yuansheng = Number(cfg["yuansheng"]);
                    rowData.oppocfg.yuanshengSwitch = Number(cfg["yuanshengSwitch"]);
                    rowData.oppocfg.addToDesktop = Number(cfg["addToDesktop"]);
                    rowData.oppocfg.oppoversions = String(cfg["oppoversions"]);
                    rowData.oppocfg.btnShowTimer = Number(cfg["btnShowTimer"]);
                    rowData.oppocfg.indexAdSwitch = Number(cfg["indexAdSwitch"]);
                    rowData.oppocfg.endAdSwitch = Number(cfg["endAdSwitch"]);
                    rowData.oppocfg.yuansheng2 = null != cfg["yuansheng2"] ?  Number(cfg["yuansheng2"]) : rowData.oppocfg.yuansheng2;
                    rowData.oppocfg.yuanshengSwitch2 =null != cfg["yuanshengSwitch2"] ?  Number(cfg["yuanshengSwitch2"]) : rowData.oppocfg.yuanshengSwitch2;
                }

                if(null != row["qqcfg"])
                {
                    let cfg = row["qqcfg"];
                    rowData.qqcfg.kuangdianBanner = Number(cfg["kuangdianBanner"]);
                    rowData.qqcfg.kuangdianBox = Number(cfg["kuangdianBox"]);
                    rowData.qqcfg.box = Number(cfg["box"]);
                    rowData.qqcfg.weiyi = Number(cfg["weiyi"]);
                    rowData.qqcfg.qqversions = String(cfg["qqversions"]);
                }

                if(null != row["ttcfg"])
                {
                    let cfg = row["ttcfg"];
                    rowData.ttcfg.moreGameSwitch = Number(cfg["moreGameSwitch"]);
                    rowData.ttcfg.kuangdianBanner = Number(cfg["kuangdianBanner"]);
                    rowData.ttcfg.luping = Number(cfg["luping"]);
                    rowData.ttcfg.ttversions = String(cfg["ttversions"]);
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
                    rowData.wxcfg.kuangdianBanner = Number(cfg["kuangdianBanner"]);
                    rowData.wxcfg.kuangdianLevelSpcacing = Number(cfg["kuangdianLevelSpcacing"]);
                }

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