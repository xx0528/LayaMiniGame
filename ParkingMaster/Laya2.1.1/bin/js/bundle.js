var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ALDEventDef;
(function (ALDEventDef) {
    ALDEventDef["None"] = "";
    ALDEventDef["ReportAdClickSuccess"] = "\u5E7F\u544A\u5BFC\u51FA\u6210\u529F";
    ALDEventDef["ReportAdClickFail"] = "\u5E7F\u544A\u5BFC\u51FA\u5931\u8D25";
    ALDEventDef["ReportLaunchOptions"] = "\u7528\u6237\u542F\u52A8\u53C2\u6570";
    //todo:添加你自己的阿拉丁事件
})(ALDEventDef = exports.ALDEventDef || (exports.ALDEventDef = {}));
//阿拉丁相关接口
var ALD = /** @class */ (function () {
    function ALD() {
    }
    ALD.aldSendOpenId = function (openid) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ", openid);
        }
        else if (Laya.Browser.onQQMiniGame) {
            Laya.Browser.window["qq"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ", openid);
        }
    };
    ALD.aldSendEvent = function (event, data) {
        var eventName = event;
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].aldSendEvent(eventName, data);
        }
        else if (Laya.Browser.onQQMiniGame) {
            Laya.Browser.window["qq"].aldSendEvent(eventName, data);
        }
    };
    ALD.aldSendReportAdClickSuccess = function (data) {
        var type = ALDEventDef.ReportAdClickSuccess + " " + data.title + ":" + String(data.appid);
        ALD.aldSendEvent(type, {
            "导出成功": data.title + ":" + String(data.appid)
        });
    };
    ALD.aldSendReportAdClickFail = function (data) {
        var type = ALDEventDef.ReportAdClickFail + " " + data.title + ":" + String(data.appid);
        ALD.aldSendEvent(type, {
            "导出失败": data.title + ":" + String(data.appid)
        });
    };
    ALD.aldSendReportLaunchOptions = function (sceneid, ip, location) {
        var type = ALDEventDef.ReportLaunchOptions;
        ALD.aldSendEvent(type, {
            "场景值：": String(sceneid),
            "Ip：": String(ip),
            "地区：": JSON.stringify(location)
        });
    };
    return ALD;
}());
exports.default = ALD;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig = /** @class */ (function () {
    function AppConfig() {
    }
    AppConfig.AppID = "";
    AppConfig.ResServer = ""; //资源服务器地址
    AppConfig.LocalTestReServer = "subRes"; //本地测试资源服务器地址
    AppConfig.Versions = "0.0.0";
    AppConfig.onTTMiniGame = false; //是否是头条小游戏
    AppConfig.GameName = ""; //游戏名称
    AppConfig.showLoadingLogo = false; //是否再在加载界面显示公司Logo;
    return AppConfig;
}());
exports.default = AppConfig;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
var CachedQQBannerAd = /** @class */ (function () {
    function CachedQQBannerAd() {
    }
    CachedQQBannerAd.preloadBanner = function () {
    };
    CachedQQBannerAd.show = function (bannerid) {
        var wxWuDianBanners = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wxWuDianBanners;
        var bannerTodayBannerMax = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerTodayBannerMax;
        bannerid = wxWuDianBanners[Math.floor(Math.random() * wxWuDianBanners.length)];
        if (Laya.Browser.onQQMiniGame && null != bannerid) {
            var sysInfo = Laya.Browser.window["qq"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            var banner_1 = Laya.Browser.window["qq"].createBannerAd({
                adUnitId: bannerid,
                adIntervals: 30,
                style: {
                    left: 0,
                    top: (Laya.stage.height - 240) / Laya.stage.height * sh,
                    width: sw,
                }
            });
            if (banner_1) {
                var self_1 = this;
                CachedQQBannerAd._onLoad = function (res) {
                    console.log("CachedQQBanner 广告 加载完成", bannerid);
                    console.log(res);
                    if (!self_1._isHide) {
                        banner_1.show();
                    }
                    else {
                        banner_1.offLoad(CachedQQBannerAd._onLoad);
                        banner_1.offError(CachedQQBannerAd._onError);
                        banner_1.destroy();
                    }
                };
                banner_1.onLoad(CachedQQBannerAd._onLoad);
                CachedQQBannerAd._onError = function (err) {
                    console.log("CachedQQBanner 广告 加载失败", bannerid);
                    console.log(err);
                    banner_1.offLoad(CachedQQBannerAd._onLoad);
                    banner_1.offError(CachedQQBannerAd._onError);
                    banner_1.destroy();
                };
                banner_1.onError(CachedQQBannerAd._onError);
                CachedQQBannerAd._curBanner = banner_1;
            }
        }
        CachedQQBannerAd._isHide = false;
    };
    CachedQQBannerAd.hide = function () {
        CachedQQBannerAd._isHide = true;
        Laya.timer.clearAll(CachedQQBannerAd);
        if (null != CachedQQBannerAd._curBanner) {
            CachedQQBannerAd._curBanner.hide();
            CachedQQBannerAd._curBanner.offLoad(CachedQQBannerAd._onLoad);
            CachedQQBannerAd._curBanner.offError(CachedQQBannerAd._onError);
            CachedQQBannerAd._curBanner.destroy();
            CachedQQBannerAd._curBanner = null;
            console.log("CachedQQBanner 广告隐藏");
        }
    };
    CachedQQBannerAd.changeShow = function () {
        if (null != CachedQQBannerAd._curBanner) {
            CachedQQBannerAd._curBanner.hide();
            CachedQQBannerAd._curBanner = null;
        }
        CachedQQBannerAd.show();
    };
    CachedQQBannerAd.clear = function () {
    };
    CachedQQBannerAd._curBanner = null;
    CachedQQBannerAd._onLoad = null;
    CachedQQBannerAd._onError = null;
    CachedQQBannerAd._isHide = true;
    return CachedQQBannerAd;
}());
exports.default = CachedQQBannerAd;
},{"./Config/AppSwitchConfig":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("../AppConfig");
var AppSwitchData = /** @class */ (function () {
    function AppSwitchData() {
        this.version = "";
        this.banner = 0;
        this.wudian = 0;
        this.wudianAvailableTime = {
            "0": 0, "1": 0, "2": 0, "3": 0,
            "4": 0, "5": 0, "6": 0, "7": 0,
            "8": 0, "9": 0, "10": 0, "11": 0,
            "12": 0, "13": 0, "14": 0, "15": 0,
            "16": 0, "17": 0, "18": 0, "19": 0,
            "20": 0, "21": 0, "22": 0, "23": 0
        };
        this.mailiang = 1;
        this.mailianglist = new Array();
        this.mailiangSceneList = new Array();
        this.wxWuDianBanners = new Array();
        this.recreateBannerIDList = new Array();
        this.bannerRecreateTime = 5;
        this.kuangdianjiange = 0;
        this.btnMoveTimer = 1;
        this.bannerMoveTimer = 0.5;
        this.bannerFreshTimer = 200;
        this.bannerCreateFailNum = 3;
        this.bannerTodayBannerMax = 10;
        this.adSwitch = 1;
        this.wudianSceneList = new Array();
        this.continueBtnDelayTime = 2; //Exprot2ViewTemplate 中继续按钮延迟显示的时间
        this.bannerShowTime = 30;
        this.fakeBtn = 0;
        this.popAd = 0; //是否启用 Exprot3ViewTemplate,
        this.continueBanner = 0; //Exprot2ViewTemplate 是否开启Banner显示
        this.continueBannerShowTime = 2; //Exprot2ViewTemplate 中Banner延迟显示的时间 
        this.continueBannerHideTime = 2; //Exprot2ViewTemplate 中Banner显示后延迟关闭的时间 
        this.oppocfg = new OPPOCfg();
        this.qqcfg = new QQCfg();
        this.ttcfg = new TTCfg();
        this.vivocfg = new VVcfg();
        this.wxcfg = new WXCfg();
    }
    Object.defineProperty(AppSwitchData.prototype, "wudianTimeAvaliable", {
        /**
         * 得到当前时间开关是否打开
         *
         * @readonly
         * @type {boolean}
         * @memberof AppSwitchData
         */
        get: function () {
            return this.wudianAvailableTime[new Date().getHours()] == 1;
        },
        enumerable: true,
        configurable: true
    });
    return AppSwitchData;
}());
exports.AppSwitchData = AppSwitchData;
var WXCfg = /** @class */ (function () {
    function WXCfg() {
        this.kuangdianBanner = 0;
        this.kuangdianLevelSpcacing = 0;
    }
    return WXCfg;
}());
exports.WXCfg = WXCfg;
var OPPOCfg = /** @class */ (function () {
    function OPPOCfg() {
        this.yuansheng = 100;
        this.yuanshengSwitch = 1;
        this.addToDesktop = 0;
        this.oppoversions = "";
        this.btnShowTimer = 0;
        this.indexAdSwitch = 0;
        this.endAdSwitch = 0;
        this.yuansheng2 = 100;
        this.yuanshengSwitch2 = 1;
    }
    return OPPOCfg;
}());
exports.OPPOCfg = OPPOCfg;
var QQCfg = /** @class */ (function () {
    function QQCfg() {
        this.kuangdianBanner = 0;
        this.kuangdianBox = 0;
        this.box = 0;
        this.weiyi = 0;
        this.qqversions = "";
    }
    return QQCfg;
}());
exports.QQCfg = QQCfg;
var TTCfg = /** @class */ (function () {
    function TTCfg() {
        this.moreGameSwitch = 0;
        this.kuangdianBanner = 0;
        this.luping = 0;
        this.ttversions = "";
    }
    return TTCfg;
}());
exports.TTCfg = TTCfg;
var VVcfg = /** @class */ (function () {
    function VVcfg() {
        this.yuanshengSwitch = 1;
        this.yuansheng = 100;
        this.yuanshengSwitch2 = 1;
        this.yuansheng2 = 100;
        this.chapingSwitch = 1;
        this.chaping = 100;
        this.addToDesktop = 1;
        this.vivoversions = "";
        this.btnShowTimer = 1;
    }
    return VVcfg;
}());
exports.VVcfg = VVcfg;
var AppSwitchConfig = /** @class */ (function () {
    function AppSwitchConfig() {
        this._data = new Array();
    }
    AppSwitchConfig.getInstance = function () {
        if (null == AppSwitchConfig._instance) {
            AppSwitchConfig._instance = AppSwitchConfig.load();
        }
        return AppSwitchConfig._instance;
    };
    AppSwitchConfig.load = function () {
        var config = new AppSwitchConfig();
        var json = Laya.loader.getRes(AppConfig_1.default.ResServer + "/json/appswitch.json");
        if (json) {
            for (var i = 0; i < json.length; ++i) {
                var row = json[i];
                var rowData = new AppSwitchData();
                rowData.version = String(row["version"]);
                rowData.banner = Number(row["banner"]);
                rowData.wudian = Number(row["wudian"]);
                rowData.wudianAvailableTime = Object(row["wudianTime"]);
                rowData.mailiang = Number(row["mailiang"]);
                var mailianglist = row["mailianglist"];
                if (null != mailianglist) {
                    for (var j = 0; j < mailianglist.length; ++j) {
                        var flag = Number(mailianglist[j]);
                        rowData.mailianglist.push(flag);
                    }
                }
                var mailiangScenelist = row["mailiangScenelist"];
                if (null != mailiangScenelist) {
                    for (var j = 0; j < mailiangScenelist.length; ++j) {
                        var sceneValue = Number(mailiangScenelist[j]);
                        rowData.mailiangSceneList.push(sceneValue);
                    }
                }
                var wxwudianbanners = row["wxwudianbanners"];
                if (null != wxwudianbanners) {
                    for (var j = 0; j < wxwudianbanners.length; ++j) {
                        var bannerid = String(wxwudianbanners[j]);
                        rowData.wxWuDianBanners.push(bannerid);
                    }
                }
                var recreateBannerIDList = row["recreateBannerIDList"];
                if (null != recreateBannerIDList) {
                    for (var j = 0; j < recreateBannerIDList.length; ++j) {
                        var bannerid = String(recreateBannerIDList[j]);
                        rowData.recreateBannerIDList.push(bannerid);
                    }
                }
                rowData.bannerRecreateTime = null != row["bannerRecreateTime"] ? Number(row["bannerRecreateTime"]) : rowData.bannerRecreateTime;
                rowData.kuangdianjiange = null != row["kuangdianjiange"] ? Number(row["kuangdianjiange"]) : rowData.kuangdianjiange;
                rowData.btnMoveTimer = Number(row["btnMoveTimer"]);
                rowData.bannerMoveTimer = Number(row["bannerMoveTimer"]);
                rowData.bannerCreateFailNum = Number(row["createFailNum"]);
                rowData.bannerFreshTimer = Number(row["bannerFreshTimer"]);
                rowData.bannerTodayBannerMax = Number(row["todayBannerMax"]);
                rowData.adSwitch = Number(row["adSwitch"]);
                var wudianSceneList = row["wudianSceneList"];
                if (null != wudianSceneList) {
                    for (var j = 0; j < wudianSceneList.length; ++j) {
                        var wudianSceneValue = Number(wudianSceneList[j]);
                        rowData.wudianSceneList.push(wudianSceneValue);
                    }
                }
                rowData.continueBtnDelayTime = Number(row["continueBtnDelayTime"]);
                rowData.bannerShowTime = Number(row["bannerShowTime"]);
                rowData.fakeBtn = null != row["fakeBtn"] ? Number(row["fakeBtn"]) : rowData.fakeBtn;
                rowData.popAd = null != row["popAd"] ? Number(row["popAd"]) : rowData.popAd;
                rowData.continueBanner = null != row["continueBanner"] ? Number(row["continueBanner"]) : rowData.continueBanner;
                rowData.continueBannerShowTime = null != row["continueBannerShowTime"] ? Number(row["continueBannerShowTime"]) : rowData.continueBannerShowTime;
                rowData.continueBannerHideTime = null != row["continueBannerHideTime"] ? Number(row["continueBannerHideTime"]) : rowData.continueBannerHideTime;
                if (null != row["oppocfg"]) {
                    var cfg = row["oppocfg"];
                    rowData.oppocfg.yuansheng = Number(cfg["yuansheng"]);
                    rowData.oppocfg.yuanshengSwitch = Number(cfg["yuanshengSwitch"]);
                    rowData.oppocfg.addToDesktop = Number(cfg["addToDesktop"]);
                    rowData.oppocfg.oppoversions = String(cfg["oppoversions"]);
                    rowData.oppocfg.btnShowTimer = Number(cfg["btnShowTimer"]);
                    rowData.oppocfg.indexAdSwitch = Number(cfg["indexAdSwitch"]);
                    rowData.oppocfg.endAdSwitch = Number(cfg["endAdSwitch"]);
                    rowData.oppocfg.yuansheng2 = null != cfg["yuansheng2"] ? Number(cfg["yuansheng2"]) : rowData.oppocfg.yuansheng2;
                    rowData.oppocfg.yuanshengSwitch2 = null != cfg["yuanshengSwitch2"] ? Number(cfg["yuanshengSwitch2"]) : rowData.oppocfg.yuanshengSwitch2;
                }
                if (null != row["qqcfg"]) {
                    var cfg = row["qqcfg"];
                    rowData.qqcfg.kuangdianBanner = Number(cfg["kuangdianBanner"]);
                    rowData.qqcfg.kuangdianBox = Number(cfg["kuangdianBox"]);
                    rowData.qqcfg.box = Number(cfg["box"]);
                    rowData.qqcfg.weiyi = Number(cfg["weiyi"]);
                    rowData.qqcfg.qqversions = String(cfg["qqversions"]);
                }
                if (null != row["ttcfg"]) {
                    var cfg = row["ttcfg"];
                    rowData.ttcfg.moreGameSwitch = Number(cfg["moreGameSwitch"]);
                    rowData.ttcfg.kuangdianBanner = Number(cfg["kuangdianBanner"]);
                    rowData.ttcfg.luping = Number(cfg["luping"]);
                    rowData.ttcfg.ttversions = String(cfg["ttversions"]);
                }
                if (null != row["vivocfg"]) {
                    var cfg = row["vivocfg"];
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
                if (null != row["wxcfg"]) {
                    var cfg = row["wxcfg"];
                    rowData.wxcfg.kuangdianBanner = Number(cfg["kuangdianBanner"]);
                    rowData.wxcfg.kuangdianLevelSpcacing = Number(cfg["kuangdianLevelSpcacing"]);
                }
                config._data.push(rowData);
            }
            return config;
        }
        else {
            config._data.push(new AppSwitchData());
            return config;
        }
    };
    AppSwitchConfig.prototype.getAppSwitchData = function () {
        return this._data[0];
    };
    return AppSwitchConfig;
}());
exports.default = AppSwitchConfig;
},{"../AppConfig":2}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("../AppConfig");
var LevelConfigData = /** @class */ (function () {
    function LevelConfigData() {
        this.map = { "w": 0, "h": 0 };
        this.layout = [];
    }
    return LevelConfigData;
}());
exports.LevelConfigData = LevelConfigData;
var LevelConfig = /** @class */ (function () {
    function LevelConfig() {
        this._data = new Array();
    }
    LevelConfig.getInstance = function () {
        if (null == LevelConfig._instance) {
            LevelConfig._instance = LevelConfig.load();
        }
        return LevelConfig._instance;
    };
    LevelConfig.load = function () {
        var config = new LevelConfig();
        var json = Laya.loader.getRes(AppConfig_1.default.ResServer + "/json/level.json");
        if (json) {
            for (var i = 0; i < json.length; i++) {
                config._data.push(json[i]);
            }
            // console.log("configdata", config._data);
        }
        else {
            var json = Laya.loader.getRes(AppConfig_1.default.LocalTestReServer + "/json/level.json");
            if (json) {
                for (var i = 0; i < json.length; i++) {
                    config._data.push(json[i]);
                }
            }
            else
                config._data.push(new LevelConfigData());
        }
        return config;
    };
    LevelConfig.prototype.getData = function (level) {
        return this._data[level];
    };
    LevelConfig.prototype.getDataLength = function () {
        return this._data.length;
    };
    return LevelConfig;
}());
exports.LevelConfig = LevelConfig;
},{"../AppConfig":2}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("../AppConfig");
var RogueLevelData = /** @class */ (function () {
    function RogueLevelData() {
    }
    return RogueLevelData;
}());
exports.RogueLevelData = RogueLevelData;
var RogueLevelConfig = /** @class */ (function () {
    function RogueLevelConfig() {
        this._data = new Array();
    }
    RogueLevelConfig.getInstance = function () {
        if (null == RogueLevelConfig._instance) {
            RogueLevelConfig._instance = RogueLevelConfig.load();
        }
        return RogueLevelConfig._instance;
    };
    RogueLevelConfig.load = function () {
        var config = new RogueLevelConfig();
        var json = Laya.loader.getRes(AppConfig_1.default.ResServer + "/json/roguelevel.json");
        if (json) {
            for (var i = 0; i < json.length; i++) {
                config._data.push(json[i]);
            }
            // console.log("configdata", config._data);
        }
        else {
            config._data.push(new RogueLevelData());
        }
        return config;
    };
    RogueLevelConfig.prototype.getData = function (level) {
        return this._data[level];
    };
    RogueLevelConfig.prototype.getDataLength = function () {
        return this._data.length;
    };
    return RogueLevelConfig;
}());
exports.RogueLevelConfig = RogueLevelConfig;
},{"../AppConfig":2}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDef;
(function (EventDef) {
    EventDef[EventDef["None"] = 0] = "None";
    EventDef[EventDef["App_CloseFirstLoadingView"] = 500] = "App_CloseFirstLoadingView";
    EventDef[EventDef["AD_OnShareAdFail"] = 501] = "AD_OnShareAdFail";
    //当界面打开
    EventDef[EventDef["Game_OnViewOpen"] = 600] = "Game_OnViewOpen";
    //当界面关闭
    EventDef[EventDef["Game_OnViewClose"] = 601] = "Game_OnViewClose";
    //当玩家金币变动
    EventDef[EventDef["Game_OnUserMoneyChange"] = 701] = "Game_OnUserMoneyChange";
    //当玩家钻石变动
    EventDef[EventDef["Game_OnUserCrystalChange"] = 702] = "Game_OnUserCrystalChange";
    //当玩家商店解锁
    EventDef[EventDef["Game_OnUserUnlockedStore"] = 703] = "Game_OnUserUnlockedStore";
    //当关卡开始
    EventDef[EventDef["Game_OnLevelStart"] = 1000] = "Game_OnLevelStart";
    //当关卡结束
    EventDef[EventDef["Game_OnLevelComplate"] = 1001] = "Game_OnLevelComplate";
    //误点预加载完毕
    EventDef[EventDef["AD_WudianBanner_LoadComplete"] = 2217] = "AD_WudianBanner_LoadComplete";
    //显示误点Banner
    EventDef[EventDef["AD_WudianBanner_Show"] = 2218] = "AD_WudianBanner_Show";
    //影藏误点Banner
    EventDef[EventDef["AD_WudianBanner_Hide"] = 2219] = "AD_WudianBanner_Hide";
    //预加载Banner
    EventDef[EventDef["AD_WudianBanner_PreLoad"] = 2220] = "AD_WudianBanner_PreLoad";
    //当IP屏蔽状态更新
    EventDef[EventDef["App_OnUpdateIpBlockState"] = 2221] = "App_OnUpdateIpBlockState";
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。
    //刷新关卡
    EventDef[EventDef["Game_Refresh"] = 10000] = "Game_Refresh";
    //关卡提示
    EventDef[EventDef["Game_Guide"] = 10001] = "Game_Guide";
    //关卡智能提示下一步
    EventDef[EventDef["Game_Tip"] = 10002] = "Game_Tip";
    //关卡点击开始通知
    EventDef[EventDef["Game_TouchStart"] = 10003] = "Game_TouchStart";
    //使能车点击事件
    EventDef[EventDef["Game_EnableCarTouch"] = 10004] = "Game_EnableCarTouch";
    //控制显示首页横向banner
    EventDef[EventDef["AD_HoriBanner_Enable"] = 20001] = "AD_HoriBanner_Enable";
    EventDef[EventDef["RewardVideoSuccess"] = 20010] = "RewardVideoSuccess";
    EventDef[EventDef["RewardVideoFail"] = 20011] = "RewardVideoFail";
    EventDef[EventDef["InsertVideoEnd"] = 20012] = "InsertVideoEnd";
})(EventDef = exports.EventDef || (exports.EventDef = {}));
},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher = Laya.EventDispatcher;
var EventMgr = /** @class */ (function (_super) {
    __extends(EventMgr, _super);
    function EventMgr() {
        return _super.call(this) || this;
    }
    ;
    //广播事件
    EventMgr.prototype.dispatch = function (InName, agv) {
        EventMgr.eventDispatcher.event(InName, agv);
    };
    //注册事件
    EventMgr.prototype.regEvemt = function (InName, caller, listener, arg) {
        EventMgr.eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    };
    //注册单次事件
    EventMgr.prototype.regOnceEvent = function (InName, caller, listener, arg) {
        EventMgr.eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    };
    //移除事件注册
    EventMgr.prototype.removeEvent = function (InName, caller, listener, arg) {
        EventMgr.eventDispatcher.off(InName, caller, listener);
    };
    EventMgr.eventDispatcher = new EventDispatcher();
    EventMgr.instance = new EventMgr();
    return EventMgr;
}(EventDispatcher));
exports.default = EventMgr;
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var GameMgr_1 = require("./Mgr/GameMgr");
var GameView_1 = require("./View/GameView/GameView");
var ButtonAnim_1 = require("./View/ButtonAnim");
var HorizontalLayout_1 = require("./ParkingJam/Components/HorizontalLayout");
var ButtonActionTip_1 = require("./ParkingJam/Components/ButtonActionTip");
var LoadingView_1 = require("./View/LoadingView/LoadingView");
var KRQ_LoopAdBox_1 = require("./KRQ/Com/KRQ_LoopAd/KRQ_LoopAdBox");
var KRQ_VLoopAd_1 = require("./KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd");
var Exprot2ViewTemplate_1 = require("./View/TemplateViews/Export2/Exprot2ViewTemplate");
var ViewAutoScaleByW_1 = require("./View/Common/ViewAutoScaleByW");
var Exprot3ViewTemplate_1 = require("./View/TemplateViews/Export3/Exprot3ViewTemplate");
var GameWinViewTemplate_1 = require("./View/TemplateViews/GameWin/GameWinViewTemplate");
var MiniGameViewTemplate_1 = require("./View/TemplateViews/MiniGame/MiniGameViewTemplate");
var KRQ_HistoryBox_1 = require("./KRQ/Com/KRQ_History/KRQ_HistoryBox");
var KRQ_History_1 = require("./KRQ/Com/KRQ_History/KRQ_History");
var WXCrazyClick_1 = require("./View/TemplateViews/WXCrazyClick/WXCrazyClick");
/*
* 游戏初始化配置;
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        var reg = Laya.ClassUtils.regClass;
        reg("Mgr/GameMgr.ts", GameMgr_1.default);
        reg("View/GameView/GameView.ts", GameView_1.default);
        reg("View/ButtonAnim.ts", ButtonAnim_1.default);
        reg("ParkingJam/Components/HorizontalLayout.ts", HorizontalLayout_1.default);
        reg("ParkingJam/Components/ButtonActionTip.ts", ButtonActionTip_1.default);
        reg("View/LoadingView/LoadingView.ts", LoadingView_1.default);
        reg("KRQ/Com/KRQ_LoopAd/KRQ_LoopAdBox.ts", KRQ_LoopAdBox_1.default);
        reg("KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd.ts", KRQ_VLoopAd_1.default);
        reg("View/TemplateViews/Export2/Exprot2ViewTemplate.ts", Exprot2ViewTemplate_1.default);
        reg("View/Common/ViewAutoScaleByW.ts", ViewAutoScaleByW_1.default);
        reg("View/TemplateViews/Export3/Exprot3ViewTemplate.ts", Exprot3ViewTemplate_1.default);
        reg("View/TemplateViews/GameWin/GameWinViewTemplate.ts", GameWinViewTemplate_1.default);
        reg("View/TemplateViews/MiniGame/MiniGameViewTemplate.ts", MiniGameViewTemplate_1.default);
        reg("KRQ/Com/KRQ_History/KRQ_HistoryBox.ts", KRQ_HistoryBox_1.default);
        reg("KRQ/Com/KRQ_History/KRQ_History.ts", KRQ_History_1.default);
        reg("View/TemplateViews/WXCrazyClick/WXCrazyClick.ts", WXCrazyClick_1.default);
    };
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "GameMain.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./KRQ/Com/KRQ_History/KRQ_History":11,"./KRQ/Com/KRQ_History/KRQ_HistoryBox":12,"./KRQ/Com/KRQ_LoopAd/KRQ_LoopAdBox":14,"./KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd":15,"./Mgr/GameMgr":18,"./ParkingJam/Components/ButtonActionTip":30,"./ParkingJam/Components/HorizontalLayout":31,"./View/ButtonAnim":52,"./View/Common/ViewAutoScaleByW":53,"./View/GameView/GameView":54,"./View/LoadingView/LoadingView":56,"./View/TemplateViews/Export2/Exprot2ViewTemplate":57,"./View/TemplateViews/Export3/Exprot3ViewTemplate":58,"./View/TemplateViews/GameWin/GameWinViewTemplate":59,"./View/TemplateViews/MiniGame/MiniGameViewTemplate":60,"./View/TemplateViews/WXCrazyClick/WXCrazyClick":62}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WXAPI_1 = require("../../WXAPI");
var ShareAd_1 = require("../../ShareAd/ShareAd");
var ALD_1 = require("../../ALD");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var OPPOAPI_1 = require("../../OPPOAPI");
var QQMiniGameAPI_1 = require("../../QQMiniGameAPI");
var AppConfig_1 = require("../../AppConfig");
var TTAPI_1 = require("../../TTAPI");
var VIVOAPI_1 = require("../../VIVOAPI");
var KRQ_ComBase = /** @class */ (function (_super) {
    __extends(KRQ_ComBase, _super);
    function KRQ_ComBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.AdPosID = -10086;
        _this._datas = [];
        _this._data = null;
        return _this;
    }
    Object.defineProperty(KRQ_ComBase.prototype, "Sprite", {
        get: function () {
            return this.owner;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KRQ_ComBase.prototype, "Data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    KRQ_ComBase.prototype.refresh = function (onComplate) {
        var self = this;
        ShareAd_1.default.getADVs(this.AdPosID, function (datas) {
            if (null != datas) {
                self._datas = datas;
                self._data = self._datas[Math.floor(Math.random() * datas.length)];
                if (null != onComplate) {
                    onComplate();
                }
            }
        }, false);
    };
    KRQ_ComBase.prototype.navigateToMiniProgram = function (d) {
        var data = null == d ? this._data : d;
        if (data) {
            console.log("跳转游戏： " + data.title);
            if (Laya.Browser.onMiniGame) {
                WXAPI_1.default.navigateToMiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick(data.appid);
                    ALD_1.default.aldSendReportAdClickSuccess(data);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_OnShareAdFail);
                    if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                        console.log("用户取消跳转");
                        ALD_1.default.aldSendReportAdClickFail(data);
                    }
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQGMiniGame) {
                OPPOAPI_1.default.navigateToMiniProgram(data.appid, data.title, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
             {
                QQMiniGameAPI_1.default.navigateToMiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onVVMiniGame) {
                VIVOAPI_1.default.navigateToMiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (AppConfig_1.default.onTTMiniGame) {
                TTAPI_1.default.showMoreGamesModal(function () {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick(data.appid);
                }, function () {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_OnShareAdFail);
                });
            }
        }
    };
    KRQ_ComBase.prototype.show = function () {
        this.Sprite.visible = true;
    };
    KRQ_ComBase.prototype.hide = function () {
        this.Sprite.visible = false;
    };
    KRQ_ComBase.prototype.autoScrollText = function (text) {
        if (text.overflow != Laya.Text.SCROLL)
            return;
        var forward = true;
        var deltaDis = 0;
        Laya.timer.frameLoop(1, text, function () {
            var d = Laya.timer.delta / 1000 * 10;
            deltaDis += d;
            if (deltaDis >= text.textWidth / 2) {
                forward = !forward;
                deltaDis = 0;
            }
            if (forward) {
                text.scrollX += d;
            }
            else {
                text.scrollX -= d;
            }
        });
    };
    return KRQ_ComBase;
}(Laya.Script));
exports.default = KRQ_ComBase;
},{"../../ALD":1,"../../AppConfig":2,"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../OPPOAPI":29,"../../QQMiniGameAPI":46,"../../ShareAd/ShareAd":47,"../../TTAPI":48,"../../VIVOAPI":51,"../../WXAPI":64}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_HistoryBox_1 = require("./KRQ_HistoryBox");
var KRQ_ComBase_1 = require("../KRQ_ComBase");
var ShareAd_1 = require("../../../ShareAd/ShareAd");
var KRQ_History = /** @class */ (function (_super) {
    __extends(KRQ_History, _super);
    function KRQ_History() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.OnBackBtnClick = null;
        _this._topZone = null;
        _this._backBtn = null;
        _this._startList = new Array();
        return _this;
    }
    KRQ_History.prototype.onAwake = function () {
        this.AdPosID = ShareAd_1.default.HistoryLocationID;
        this._topZone = this.Sprite.getChildByName("TopZone");
        this._backBtn = this._topZone.getChildByName("BackBtn");
        this._list = this.Sprite.getChildByName("List");
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._list.vScrollBarSkin = "";
    };
    KRQ_History.prototype.onStart = function () {
        this.refresh();
    };
    KRQ_History.prototype.onEnable = function () {
        this._backBtn.on(Laya.Event.CLICK, this, this.onBackBtn);
    };
    KRQ_History.prototype.onDisable = function () {
        this._backBtn.off(Laya.Event.CLICK, this, this.onBackBtn);
    };
    KRQ_History.prototype.refresh = function (onComplate) {
        var self = this;
        ShareAd_1.default.getADVs(this.AdPosID, function (datas) {
            if (null != datas) {
                self._datas = datas;
                self._startList.splice(0);
                for (var i = 0; i < self._datas.length; ++i) {
                    self._startList.push(false);
                }
                var num = Math.floor(self._startList.length * 0.33);
                while (num > 0) {
                    var index = Math.floor(Math.random() * self._startList.length);
                    if (false == self._startList[index]) {
                        self._startList[index] = true;
                        --num;
                    }
                }
                self._list.array = self._datas;
            }
        }, false);
    };
    KRQ_History.prototype.onListRender = function (cell, index) {
        var data = this._list.array[index];
        var star = this._startList[index];
        var historyBox = cell.getComponent(KRQ_HistoryBox_1.default);
        historyBox.setData(data, star);
    };
    KRQ_History.prototype.onBackBtn = function () {
        this.hide();
        if (null != this.OnBackBtnClick) {
            this.OnBackBtnClick();
        }
    };
    KRQ_History.prototype.show = function () {
        _super.prototype.show.call(this);
        this.refresh();
    };
    return KRQ_History;
}(KRQ_ComBase_1.default));
exports.default = KRQ_History;
},{"../../../ShareAd/ShareAd":47,"../KRQ_ComBase":10,"./KRQ_HistoryBox":12}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ComBase_1 = require("../../Com/KRQ_ComBase");
var KRQ_HistoryBox = /** @class */ (function (_super) {
    __extends(KRQ_HistoryBox, _super);
    function KRQ_HistoryBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._icon = null;
        _this._text = null;
        _this._mark = null;
        return _this;
    }
    KRQ_HistoryBox.prototype.onAwake = function () {
        this._icon = this.Sprite.getChildByName("Icon");
        this._text = this.Sprite.getChildByName("Text");
        this._text.overflow = Laya.Text.SCROLL;
        this._text.text = "";
        this._mark = this.Sprite.getChildByName("Mark");
        this._mark.visible = false;
    };
    KRQ_HistoryBox.prototype.onStart = function () {
        this.autoScrollText(this._text);
    };
    KRQ_HistoryBox.prototype.onEnable = function () {
        this.Sprite.on(Laya.Event.CLICK, this, this.onClickAd);
    };
    KRQ_HistoryBox.prototype.onDisable = function () {
        this.Sprite.off(Laya.Event.CLICK, this, this.onClickAd);
    };
    KRQ_HistoryBox.prototype.onClickAd = function () {
        this.navigateToMiniProgram();
    };
    KRQ_HistoryBox.prototype.setData = function (data, star) {
        this._data = data;
        if (null != this._data) {
            var self = this;
            this._icon.loadImage(this._data.logo, Laya.Handler.create(this, function () {
                if (!self._icon.destroyed) {
                    self._icon.width = 100;
                    self._icon.height = 100;
                }
            }));
            var str = String(this._data.title);
            this._text.text = str;
            this._mark.visible = star;
        }
    };
    return KRQ_HistoryBox;
}(KRQ_ComBase_1.default));
exports.default = KRQ_HistoryBox;
},{"../../Com/KRQ_ComBase":10}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ComBase_1 = require("../KRQ_ComBase");
var KRQ_LoopAdBox_1 = require("./KRQ_LoopAdBox");
var ShareAd_1 = require("../../../ShareAd/ShareAd");
var KRQ_HLoopAd = /** @class */ (function (_super) {
    __extends(KRQ_HLoopAd, _super);
    function KRQ_HLoopAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isEnable = true;
        _this.useMovePause = true;
        _this.useLocalRandom = false;
        _this.useRandom = false;
        _this.sortDatas = null;
        _this._scrollForward = true;
        _this._cellSize = new Laya.Point();
        return _this;
    }
    Object.defineProperty(KRQ_HLoopAd.prototype, "Clip", {
        get: function () {
            return this.owner;
        },
        enumerable: true,
        configurable: true
    });
    KRQ_HLoopAd.prototype.onAwake = function () {
        this.AdPosID = ShareAd_1.default.LoopAdLocationID;
        this._list = this.owner.getChildByName("List");
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._list.hScrollBarSkin = "";
    };
    KRQ_HLoopAd.prototype.onStart = function () {
        var self = this;
        this._list.width = self.Clip.width;
        this._list.height = self.Clip.height;
        self.refresh(function () {
            if (null != self._list.cells && self._list.cells.length > 0) {
                var box = self._list.cells[0];
                self._cellSize.x = box.width;
                self._cellSize.y = box.height;
                if (self.useMovePause) {
                    setTimeout(function () {
                        if (self._list.scrollBar) {
                            self._list.scrollBar.value = 0;
                            self.move();
                        }
                    }, 2000);
                }
            }
        });
    };
    KRQ_HLoopAd.prototype.refresh = function (onComplate) {
        if (!this.isEnable) {
            if (null != onComplate) {
                onComplate();
            }
            return;
        }
        var self = this;
        ShareAd_1.default.getADVs(this.AdPosID, function (datas) {
            if (null != datas && datas.length > 0) {
                self._datas = datas;
                self._list.array = self._datas;
                if (null != self.Sprite && !self.Sprite.destroyed) {
                    self.Sprite.visible = true;
                }
                if (null != onComplate) {
                    onComplate();
                }
            }
            else {
                if (null != self.Sprite && !self.Sprite.destroyed) {
                    self.Sprite.visible = false;
                }
            }
        }, this.useRandom, this.useLocalRandom, this.sortDatas);
    };
    KRQ_HLoopAd.prototype.onListRender = function (cell, index) {
        var data = this._list.array[index];
        var loopAdBox = cell.getComponent(KRQ_LoopAdBox_1.default);
        loopAdBox.setData(data);
    };
    KRQ_HLoopAd.prototype.move = function () {
        var tonum = this._cellSize.x + this._list.spaceX;
        var left = 0;
        if (!this._scrollForward) {
            tonum *= -1;
            left = (this._list.scrollBar.max - this._list.scrollBar.value) % tonum * -1;
        }
        else {
            left = this._list.scrollBar.value % tonum;
        }
        if (this._list.scrollBar) {
            this._list.scrollBar.stopScroll();
            var scrollDelta = tonum;
            if (0 != left) {
                scrollDelta = 2 * tonum - left;
            }
            var self_1 = this;
            Laya.Tween.to(self_1._list.scrollBar, { value: self_1._list.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self_1, function () {
            }));
            Laya.timer.once(1010, self_1, function () {
                if (self_1._list.scrollBar.value >= self_1._list.scrollBar.max) {
                    self_1._scrollForward = false;
                }
                else if (self_1._list.scrollBar.value <= 0) {
                    self_1._scrollForward = true;
                }
                Laya.timer.once(3000, self_1, function () {
                    if (self_1._list.scrollBar) {
                        self_1.move();
                    }
                });
            });
        }
    };
    KRQ_HLoopAd.prototype.onUpdate = function () {
        if (this.useMovePause)
            return;
        if (this._scrollForward) {
            this._list.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this._list.scrollBar.value >= this._list.scrollBar.max) {
                this._scrollForward = false;
            }
        }
        else {
            this._list.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this._list.scrollBar.value <= 0) {
                this._scrollForward = true;
            }
        }
    };
    return KRQ_HLoopAd;
}(KRQ_ComBase_1.default));
exports.default = KRQ_HLoopAd;
},{"../../../ShareAd/ShareAd":47,"../KRQ_ComBase":10,"./KRQ_LoopAdBox":14}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ComBase_1 = require("../KRQ_ComBase");
var KRQ_LoopAdBox = /** @class */ (function (_super) {
    __extends(KRQ_LoopAdBox, _super);
    function KRQ_LoopAdBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._originW = 170;
        _this._originH = 170;
        return _this;
    }
    KRQ_LoopAdBox.prototype.onAwake = function () {
        this._displaySp = this.owner.getChildByName("Display");
        this._originW = this._displaySp.width;
        this._originH = this._displaySp.height;
        this._disText = this.owner.getChildByName("TitelText");
        this._disText.overflow = Laya.Text.SCROLL;
        this._disText.text = "";
    };
    KRQ_LoopAdBox.prototype.onStart = function () {
        this.autoScrollText(this._disText);
    };
    KRQ_LoopAdBox.prototype.onEnable = function () {
        this.Sprite.on(Laya.Event.CLICK, this, this.onClickAd);
    };
    KRQ_LoopAdBox.prototype.onDisable = function () {
        this.Sprite.off(Laya.Event.CLICK, this, this.onClickAd);
    };
    KRQ_LoopAdBox.prototype.onClickAd = function () {
        this.navigateToMiniProgram();
    };
    KRQ_LoopAdBox.prototype.setData = function (data) {
        this._data = data;
        if (null != this._data) {
            var self_1 = this;
            this._displaySp.loadImage(this._data.logo, Laya.Handler.create(this, function () {
                if (!self_1._displaySp.destroyed) {
                    self_1._displaySp.width = self_1._originW;
                    self_1._displaySp.height = self_1._originH;
                }
            }));
            var str = String(this._data.title);
            this._disText.text = str;
        }
    };
    return KRQ_LoopAdBox;
}(KRQ_ComBase_1.default));
exports.default = KRQ_LoopAdBox;
},{"../KRQ_ComBase":10}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_HLoopAd_1 = require("./KRQ_HLoopAd");
var ShareAd_1 = require("../../../ShareAd/ShareAd");
var KRQ_VLoopAd = /** @class */ (function (_super) {
    __extends(KRQ_VLoopAd, _super);
    function KRQ_VLoopAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KRQ_VLoopAd.prototype.onAwake = function () {
        this.AdPosID = ShareAd_1.default.LoopAdLocationID;
        this._list = this.owner.getChildByName("List");
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._list.vScrollBarSkin = "";
    };
    KRQ_VLoopAd.prototype.move = function () {
        var tonum = this._cellSize.y + this._list.spaceY;
        var left = 0;
        if (!this._scrollForward) {
            tonum *= -1;
            left = (this._list.scrollBar.max - this._list.scrollBar.value) % tonum * -1;
        }
        else {
            left = this._list.scrollBar.value % tonum;
        }
        if (this._list.scrollBar) {
            this._list.scrollBar.stopScroll();
            var scrollDelta = tonum;
            if (0 != left) {
                scrollDelta = 2 * tonum - left;
            }
            var self_1 = this;
            Laya.Tween.to(self_1._list.scrollBar, { value: self_1._list.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self_1, function () {
            }));
            Laya.timer.once(1010, self_1, function () {
                if (self_1._list.scrollBar.value >= self_1._list.scrollBar.max) {
                    self_1._scrollForward = false;
                }
                else if (self_1._list.scrollBar.value <= 0) {
                    self_1._scrollForward = true;
                }
                Laya.timer.once(3000, self_1, function () {
                    if (self_1._list.scrollBar) {
                        self_1.move();
                    }
                });
            });
        }
    };
    return KRQ_VLoopAd;
}(KRQ_HLoopAd_1.default));
exports.default = KRQ_VLoopAd;
},{"../../../ShareAd/ShareAd":47,"./KRQ_HLoopAd":13}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpUnit_1 = require("../Net/HttpUnit");
var AppConfig_1 = require("../AppConfig");
var WXAPI_1 = require("../WXAPI");
var User_1 = require("../User/User");
var OPPOAPI_1 = require("../OPPOAPI");
/**
 * 用于买量上报,以及停留时间上报的的类，本质上是对wx和买量接口做一个集成化的封装方便使用
 *
 * @export
 * @class MaiLiang
 */
var MaiLiang = /** @class */ (function () {
    function MaiLiang() {
    }
    /**
     * 发送数据的类
     *
     * @protected
     * @static
     * @param {requestData} req
     * @memberof MaiLiang
     */
    MaiLiang.request = function (req) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        }
        else {
            req.url = MaiLiang.mainUrl + req.url;
        }
        var completeFunc = function (res) {
            console.log(res, "MaiLiang http Success");
            res = JSON.parse(res);
            if (res.Status == "200") {
                if (res.Result["OpenId"] != null && res.Result["OpenId"] != "") {
                    MaiLiang.MaiLiangOpenId = res.Result["OpenId"];
                    MaiLiang.time = req.data.posttime;
                    console.log("获得买量系统OpenId " + MaiLiang.MaiLiangOpenId);
                }
                else {
                    console.log("上报买量系统停留时间成功");
                }
                if (req.onSuccess) {
                    req.onSuccess(res);
                }
            }
            else {
                if (req.onFail) {
                    req.onFail(res);
                }
            }
            req.onSuccess = null;
            req = null;
        };
        var errorFunc = function (res) {
            console.log(res, "MaiLiang http fail");
            if (req.onFail) {
                req.onFail(res);
            }
            req.onFail = null;
            req = null;
        };
        var xhr = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, this, completeFunc);
        xhr.once(Laya.Event.ERROR, this, errorFunc);
        if (req.meth == "get") {
            var para = "";
            for (var _i = 0, _a = Object.keys(req.data); _i < _a.length; _i++) {
                var key = _a[_i];
                var value = req.data[key];
                para += key + "=" + value + "&";
            }
            req.url = req.url + "?" + para;
            xhr.send(req.url, null, req.meth);
        }
        else {
            var para = "";
            for (var _b = 0, _c = Object.keys(req.data); _b < _c.length; _b++) {
                var key = _c[_b];
                var value = req.data[key];
                para += key + "=" + value + "&";
            }
            xhr.send(req.url, para, req.meth, null, ["Content-Type", "application/x-www-form-urlencoded"]);
        }
    };
    /**
     * 获得买量系统唯一标识ID,此ID的作用是用来上报游戏时间
     *
     * @param {Function} res
     * @memberof MaiLiang
     */
    MaiLiang.GetMaiLiangOpenId = function (onSuccess, onFail) {
        if (Laya.Browser.onMiniGame) {
            var option = WXAPI_1.default.getLaunchOptionsSync();
            if (option != null) {
                var key = option.query["key"];
                if (key != null && key != "" && User_1.default.openId != "") {
                    MaiLiang.key = key;
                    var req = new HttpUnit_1.requestData();
                    req.url = MaiLiang.uclick;
                    req.onSuccess = onSuccess;
                    req.onFail = onFail;
                    req.data.appid = AppConfig_1.default.AppID;
                    req.data.openid = "";
                    var time = new Date().getTime() / 1000;
                    req.data.posttime = time;
                    req.data.auth = 0;
                    req.data.key = key;
                    req.data.wxopenid = User_1.default.openId;
                    req.meth = "POST";
                    console.log("发送买量数据接口");
                    MaiLiang.request(req);
                }
            }
            else {
                console.log("上报买量数据失败");
                onFail(null);
            }
        }
        else if (Laya.Browser.onQGMiniGame) {
            var option = OPPOAPI_1.default.getLaunchOptionsSync();
            HttpUnit_1.default.reportImport(option.referrerInfo.package, option.referrerInfo.extraData.appid, function (result) {
                if (1 == result.code) {
                    console.log("OPPO 上报买量数据成功");
                }
                else {
                    console.log("OPPO 上报买量数据失败", result.msg);
                }
            }, function (result) {
                console.log("OPPO 上报买量数据失败");
                for (var key in result) {
                    console.log(key, result[key]);
                }
            });
        }
        else {
            console.log("不在微信模式下调用，默认上报买量数据失败");
            onFail(null);
        }
    };
    /**
     * 上报买量接口停留时间
     *
        appid －主体小程序appid
        openid －买量系统唯一标识（不可空）
        posttime － 请求时间刻度（精确到秒）
        time － 停留时长（精确到秒）
     * @static
     * @memberof MaiLiang
     */
    MaiLiang.ReportStayTime = function (onSuccess, onFail) {
        if (Laya.Browser.onMiniGame) {
            if (MaiLiang.MaiLiangOpenId != "") {
                var req = new HttpUnit_1.requestData();
                req.url = MaiLiang.stay;
                req.onSuccess = onSuccess;
                req.onFail = onFail;
                req.data.appid = AppConfig_1.default.AppID;
                req.data.openid = MaiLiang.MaiLiangOpenId;
                var time = new Date().getTime() / 1000;
                req.data.posttime = time;
                var staytime = MaiLiang.time != 0 ? time - MaiLiang.time : 0;
                req.data.time = staytime;
                req.meth = "POST";
                console.log("发送停留时间至买量接口");
                MaiLiang.request(req);
            }
        }
        else {
            console.log("不在微信模式下调用，默认发送停留时间至买量接口失败");
            onFail(null);
        }
    };
    MaiLiang.mainUrl = "https://swtj.mrkzx.cn";
    MaiLiang.uclick = "/v1.1/api/Activity/uclick.html";
    MaiLiang.stay = "/v1.1/api/Activity/stay.html";
    MaiLiang.key = ""; //推广路径中同名参数，需要调用方法WXAPi.getLaunchOptionsSync()，从返回的参数中获得。
    MaiLiang.MaiLiangOpenId = ""; //买量系统唯一标识,执行GetMaiLiangOpenId()方法成功后自动获得。
    MaiLiang.time = 0; //买量系统唯一标识后，记录当前时间（精确到秒）。
    return MaiLiang;
}());
exports.default = MaiLiang;
},{"../AppConfig":2,"../Net/HttpUnit":26,"../OPPOAPI":29,"../User/User":49,"../WXAPI":64}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var User_1 = require("./User/User");
var layaMaxUI_1 = require("./ui/layaMaxUI");
var LoadingView_1 = require("./View/LoadingView/LoadingView");
var HttpUnit_1 = require("./Net/HttpUnit");
var WXAPI_1 = require("./WXAPI");
var AppConfig_1 = require("./AppConfig");
var EventMgr_1 = require("./Event/EventMgr");
var EventDef_1 = require("./Event/EventDef");
var OPPOAPI_1 = require("./OPPOAPI");
var QQMiniGameAPI_1 = require("./QQMiniGameAPI");
var TTAPI_1 = require("./TTAPI");
var ALD_1 = require("./ALD");
var VIVOAPI_1 = require("./VIVOAPI");
var NativeCallback_1 = require("./NativeCallback");
var Main = /** @class */ (function () {
    function Main() {
        this._loadingUI = null;
        this._loadingView = null;
        //预加载列表
        this._preLoadRes = new Array();
        //根据IDE设置初始化引擎		
        if (window["Laya3D"])
            Laya3D.init(GameConfig_1.default.width, GameConfig_1.default.height);
        else
            Laya.init(GameConfig_1.default.width, GameConfig_1.default.height, Laya["WebGL"]);
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        Laya.stage.scaleMode = GameConfig_1.default.scaleMode;
        Laya.stage.screenMode = GameConfig_1.default.screenMode;
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = GameConfig_1.default.exportSceneToJson;
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (GameConfig_1.default.debug || Laya.Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (GameConfig_1.default.physicsDebug && Laya["PhysicsDebugDraw"])
            Laya["PhysicsDebugDraw"].enable();
        if (GameConfig_1.default.stat)
            Laya.Stat.show();
        Laya.alertGlobalError = true;
        if (true == AppConfig_1.default.onTTMiniGame) {
            Laya.Browser.onMiniGame = false;
        }
        if (!Laya.Browser.onMiniGame
            && !Laya.Browser.onQGMiniGame
            && !Laya.Browser.onQQMiniGame
            && !AppConfig_1.default.onTTMiniGame) //如果不是小游戏，资源服务器设置为本地测试地址
         {
            AppConfig_1.default.ResServer = AppConfig_1.default.LocalTestReServer;
        }
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }
    Main.prototype.onVersionLoaded = function () {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    };
    Main.prototype.onConfigLoaded = function () {
        Laya.loader.maxLoader = 50;
        this.initLoadingView();
        //加载重要配置，这些配置必须在游戏启动前加载完成
        var firstConfigs = [
            { url: AppConfig_1.default.ResServer + "/json/appswitch.json", type: Laya.Loader.JSON }
        ];
        var self = this;
        Laya.loader.load(firstConfigs, Laya.Handler.create(this, function () {
            self.loadRes(); //加载资源
        }));
        EventMgr_1.default.instance.regOnceEvent(EventDef_1.EventDef.App_CloseFirstLoadingView, this, this.closeloadingUI);
    };
    Main.prototype.initLoadingView = function () {
        this._loadingUI = new layaMaxUI_1.ui.View.LoadingUI();
        this._loadingUI.zOrder = 2;
        Laya.stage.addChild(this._loadingUI);
        this._loadingUI.width = Laya.stage.width;
        this._loadingUI.height = Laya.stage.height;
        this._loadingView = this._loadingUI.getComponent(LoadingView_1.default);
        this._loadingView.setProcess(0);
    };
    Main.prototype.postResToOpenDataContext = function (onComplate) {
        if (Laya.Browser.onMiniGame) {
            console.log("开始透传资源数据到开放域");
            Laya.loader.load([
                "openRes/Rank.atlas",
            ], Laya.Handler.create(null, function () {
                Laya.MiniAdpter.sendAtlasToOpenDataContext("openRes/Rank.atlas");
                console.log("透传资源数据到开放域  完毕！！！");
                if (onComplate) {
                    onComplate();
                }
            }));
        }
        else {
            if (onComplate) {
                onComplate();
            }
        }
    };
    Main.prototype.preLoad = function () {
        //这里添加你需要预加载的资源
        //this._preLoadRes.push({ url: AppConfig.ResServer + "/json/example.json", type: Laya.Loader.JSON });
        this._preLoadRes.push({ url: AppConfig_1.default.ResServer + "/json/level.json", type: Laya.Loader.JSON });
        this._preLoadRes.push({ url: AppConfig_1.default.LocalTestReServer + "/json/level.json", type: Laya.Loader.JSON });
    };
    Main.prototype.loadRes = function () {
        var _this = this;
        this.preLoad();
        var resource = this._preLoadRes;
        var self = this;
        if (Laya.Browser.onMiniGame) {
            //开始加载分包
            var loadSubResTask = Laya.Browser.window["wx"].loadSubpackage({
                name: 'subRes',
                success: function (res) {
                    // 分包加载成功,开始预加载资源
                    if (resource.length > 0) {
                        Laya.loader.load(resource, Laya.Handler.create(_this, function () {
                            self.onLoadResComplate(); //预加载完成
                        }), Laya.Handler.create(_this, function (res) {
                            //todo:跟新进度条
                            self._loadingView.setProcess(res / 2 + 0.5);
                        }));
                    }
                    else {
                        self.onLoadResComplate(); //预加载完成
                    }
                },
                fail: function (res) {
                    _this.loadRes(); //加载失败，重新加载
                }
            });
            loadSubResTask.onProgressUpdate(function (res) {
                self._loadingView.setProcess(res / 2);
            });
        }
        else if (Laya.Browser.onQGMiniGame) //oppo小游戏
         {
            //开始加载分包
            var loadSubResTask = Laya.Browser.window["qg"].loadSubpackage({
                name: 'subRes',
                success: function (res) {
                    // 分包加载成功,开始预加载资源
                    if (resource.length > 0) {
                        Laya.loader.load(resource, Laya.Handler.create(_this, function () {
                            self.onLoadResComplate(); //预加载完成
                        }), Laya.Handler.create(_this, function (res) {
                            //todo:跟新进度条
                            self._loadingView.setProcess(res / 2 + 0.5);
                        }));
                    }
                    else {
                        self.onLoadResComplate(); //预加载完成
                    }
                },
                fail: function (res) {
                    _this.loadRes(); //加载失败，重新加载
                }
            });
            loadSubResTask.onProgressUpdate(function (res) {
                // 加载进度百分比
                var progress = res["progress"];
                // 下载数据
                var totalBytesWritten = res["totalBytesWritten"];
                // 总长度
                var totalBytesExpectedToWrite = res["totalBytesExpectedToWrite"];
                self._loadingView.setProcess(progress / 2);
            });
        }
        else if (Laya.Browser.onQQMiniGame) {
            //开始加载分包
            var loadSubResTask = Laya.Browser.window["qq"].loadSubpackage({
                name: 'subRes',
                success: function (res) {
                    // 分包加载成功,开始预加载资源
                    if (resource.length > 0) {
                        Laya.loader.load(resource, Laya.Handler.create(_this, function () {
                            self.onLoadResComplate(); //预加载完成
                        }), Laya.Handler.create(_this, function (res) {
                            //todo:跟新进度条
                            self._loadingView.setProcess(res / 2 + 0.5);
                        }));
                    }
                    else {
                        self.onLoadResComplate(); //预加载完成
                    }
                },
                fail: function (res) {
                    _this.loadRes(); //加载失败，重新加载
                }
            });
            loadSubResTask.onProgressUpdate(function (res) {
                self._loadingView.setProcess(res / 2);
            });
        }
        else { //字节跳动没有分包
            if (resource.length > 0) {
                Laya.loader.load(resource, Laya.Handler.create(this, function () {
                    self.onLoadResComplate();
                }), Laya.Handler.create(this, function (res) {
                    self._loadingView.setProcess(res);
                }));
            }
            else {
                self.onLoadResComplate();
            }
        }
    };
    Main.prototype.onLoadResComplate = function () {
        var _this = this;
        var self = this;
        this._loadingView.setProcess(1);
        if (Laya.Browser.onMiniGame) {
            WXAPI_1.default.wxLogin(function (code) {
                var _this = this;
                User_1.default.code = code;
                HttpUnit_1.default.login(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default.token = res.data.token;
                        User_1.default.openId = res.data.openid;
                        ALD_1.default.aldSendOpenId(User_1.default.openId);
                        HttpUnit_1.default.getGameData(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initiUser(res.data);
                            }
                            else {
                                User_1.default.initiUser(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default.token = "";
                            User_1.default.openId = "";
                            User_1.default.initiUser(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                    else {
                        console.log("登陆失败！！！" + res);
                        User_1.default.initiUser(null);
                        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                        }));
                    }
                }, function (res) {
                    console.log("登陆失败！！！" + res);
                    User_1.default.initiUser(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            }, null);
        }
        else if (Laya.Browser.onQGMiniGame) //oppo小游戏
         {
            OPPOAPI_1.default.initAdService(function () {
            }, function () {
            }, function () {
            });
            OPPOAPI_1.default.Login(function (token) {
                var _this = this;
                User_1.default.code = token;
                HttpUnit_1.default.login(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default.token = res.data.token;
                        User_1.default.openId = res.data.openid;
                        HttpUnit_1.default.getGameData(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initiUser(res.data);
                                console.log("获取用户数据--------------------Start");
                                for (var key in res.data) {
                                    console.log(key, res.data[key]);
                                }
                                console.log("获取用户数据--------------------End");
                            }
                            else {
                                User_1.default.initiUser(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default.token = "";
                            User_1.default.openId = "";
                            User_1.default.initiUser(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                    else {
                        console.log("登陆失败！！！", res);
                        User_1.default.initiUser(null);
                        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                        }));
                    }
                }, function (res) {
                    console.log("登陆失败！！！", res);
                    User_1.default.initiUser(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            }, null);
        }
        else if (Laya.Browser.onQQMiniGame) //qq小游戏
         {
            QQMiniGameAPI_1.default.Login(function (code) {
                var _this = this;
                User_1.default.code = code;
                HttpUnit_1.default.login(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default.token = res.data.token;
                        User_1.default.openId = res.data.openid;
                        ALD_1.default.aldSendOpenId(User_1.default.openId);
                        HttpUnit_1.default.getGameData(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initiUser(res.data);
                            }
                            else {
                                User_1.default.initiUser(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default.token = "";
                            User_1.default.openId = "";
                            User_1.default.initiUser(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                    else {
                        console.log("登陆失败！！！" + res);
                        User_1.default.initiUser(null);
                        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                        }));
                    }
                }, function (res) {
                    console.log("登陆失败！！！" + res);
                    User_1.default.initiUser(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            }, null);
        }
        else if (AppConfig_1.default.onTTMiniGame) //头条，字节跳动
         {
            TTAPI_1.default.ttLogin(function (code) {
                var _this = this;
                User_1.default.code = code;
                HttpUnit_1.default.login(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default.token = res.data.token;
                        User_1.default.openId = res.data.openid;
                        HttpUnit_1.default.getGameData(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initiUser(res.data);
                            }
                            else {
                                User_1.default.initiUser(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default.token = "";
                            User_1.default.openId = "";
                            User_1.default.initiUser(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                    else {
                        console.log("登陆失败！！！" + res);
                        User_1.default.initiUser(null);
                        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                        }));
                    }
                }, function (res) {
                    console.log("登陆失败！！！" + res);
                    User_1.default.initiUser(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            }, function () {
                User_1.default.initiUser(null);
                GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                }));
            });
        }
        else if (Laya.Browser.onVVMiniGame) //VIVO 小游戏
         {
            var login_1 = function () {
                VIVOAPI_1.default.Login(function (token, type) {
                    success_1(token);
                }, function () {
                    fail_1();
                });
            };
            var success_1 = function (code) {
                User_1.default.code = code;
                HttpUnit_1.default.login(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default.token = res.data.token;
                        User_1.default.openId = res.data.openid;
                        HttpUnit_1.default.getGameData(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initiUser(res.data);
                                console.log("获取用户数据--------------------Start");
                                for (var key in res.data) {
                                    console.log(key, res.data[key]);
                                }
                                console.log("获取用户数据--------------------End");
                            }
                            else {
                                User_1.default.initiUser(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default.token = "";
                            User_1.default.openId = "";
                            User_1.default.initiUser(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                    else {
                        console.log("登陆失败！！！", res);
                        User_1.default.initiUser(null);
                        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                        }));
                    }
                }, function (res) {
                    console.log("登陆失败！！！", res);
                    User_1.default.initiUser(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            };
            var failCounter_1 = 0;
            var fail_1 = function () {
                if (failCounter_1 >= 1) {
                    console.log("vivo 登陆失败！！！重试次数已达上限");
                    User_1.default.initiUser(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                    return;
                }
                VIVOAPI_1.default.showDialog("提示", "登录失败，点击确定按钮重试", [
                    {
                        text: '确定',
                        color: '#33dd44'
                    }
                ], function () {
                    login_1();
                    ++failCounter_1;
                }, function () {
                }, function () {
                });
            };
            login_1();
        }
        else {
            User_1.default.testInitUser(); //测试
            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(this, function () {
            }));
        }
    };
    Main.prototype.closeloadingUI = function () {
        if (this._loadingUI && !this._loadingUI.destroyed) {
            this._loadingUI.destroy();
        }
    };
    return Main;
}());
//激活启动类
new Main();
if (Laya.Browser.window) {
    Laya.Browser.window.NativeCallback = NativeCallback_1.default;
}
},{"./ALD":1,"./AppConfig":2,"./Event/EventDef":7,"./Event/EventMgr":8,"./GameConfig":9,"./NativeCallback":24,"./Net/HttpUnit":26,"./OPPOAPI":29,"./QQMiniGameAPI":46,"./TTAPI":48,"./User/User":49,"./VIVOAPI":51,"./View/LoadingView/LoadingView":56,"./WXAPI":64,"./ui/layaMaxUI":65}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("./ViewMgr");
var User_1 = require("../User/User");
var HttpUnit_1 = require("../Net/HttpUnit");
var MaiLiang_1 = require("../MaiLiangAPI/MaiLiang");
var WXAPI_1 = require("../WXAPI");
var WudianMgr_1 = require("./WudianMgr");
var ALD_1 = require("../ALD");
var QQMiniGameAPI_1 = require("../QQMiniGameAPI");
var GameScene3D_1 = require("../ParkingJam/View/GameScene3D");
var AppConfig_1 = require("../AppConfig");
var WXADMgr_1 = require("./WXADMgr");
var CachedQQBannerAd_1 = require("../CachedQQBannerAd");
//游戏管理器，游戏代码的入口
var GameMgr = /** @class */ (function (_super) {
    __extends(GameMgr, _super);
    function GameMgr() {
        var _this = _super.call(this) || this;
        GameMgr._instance = _this;
        return _this;
    }
    GameMgr.getInstance = function () { return GameMgr._instance; };
    GameMgr.prototype.onAwake = function () {
        MaiLiang_1.default.GetMaiLiangOpenId(function (res) {
            console.log("GameUI 买量数据上报成功");
            Laya.Browser.window["wx"].onShow(function () {
                MaiLiang_1.default.GetMaiLiangOpenId(null, null);
            });
            Laya.Browser.window["wx"].onHide(function () {
                MaiLiang_1.default.ReportStayTime(null, null);
            });
        }, function (res) {
            console.log("GameUI 买量数据上报失败");
        });
        WXAPI_1.default.SetShareMenu("", "", function () {
        }, function () {
        }, function () {
        });
        WudianMgr_1.default.UpdateIpBlockState();
        this.reportLaunchOptions();
        if (Laya.Browser.onMiniGame) {
            //CachedWXBannerAd.preloadBanner(); 如果是老项目使用了 CachedWXBannerAd 这个类，请打开这一行注释
            WXADMgr_1.default.init(); //如果不是老项目，没有使用 WXADMgr 这个类, 请注释这一行。
        }
        else if (Laya.Browser.onQQMiniGame) {
            CachedQQBannerAd_1.default.preloadBanner();
            QQMiniGameAPI_1.default.LoadAppBoxAd(function () { }, function () { });
        }
        else if (Laya.Browser.onQGMiniGame) {
            if (null != Laya.Browser.window["qg"].reportMonitor && typeof (Laya.Browser.window["qg"].reportMonitor) == 'function') {
                Laya.Browser.window["qg"].reportMonitor('game_scene', 0);
            }
        }
    };
    GameMgr.prototype.onStart = function () {
        this.preCreateGame();
    };
    GameMgr.prototype.preCreateGame = function () {
        //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
        this.load3DGameScene();
    };
    GameMgr.prototype.load3DGameScene = function (onComplete) {
        Laya.Scene3D.load(AppConfig_1.default.LocalTestReServer + "/LayaScene_KLTCC_03/Conventional/" + "KLTCC_03.ls", Laya.Handler.create(this, function (scene) {
            Laya.stage.addChild(scene);
            scene.addComponent(GameScene3D_1.default);
            ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.GameView);
            if (null != onComplete) {
                onComplete();
            }
        }));
    };
    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    GameMgr.prototype.saveGameData = function () {
        localStorage.setItem("Game_Data", User_1.default.getSaveData());
        // HttpUnit.saveGameData(User.getSaveData(),
        //     (res) => {
        //         if (res.code == 1) {
        //             console.log("存档成功")
        //         }
        //         else {
        //             console.log("存档失败")
        //         }
        //     },
        //     (res) => {
        //         console.log("存档失败")
        //     })
    };
    GameMgr.prototype.reportLaunchOptions = function () {
        HttpUnit_1.default.Getuserip(function (res) {
            if (1 == res.code) {
                console.log("获取玩家ip,地区成功 ：", res.data.dqip, res.data.ipxq);
                var opt = null;
                if (Laya.Browser.onMiniGame) {
                    opt = WXAPI_1.default.getLaunchOptionsSync();
                }
                else if (Laya.Browser.onQQMiniGame) {
                    opt = QQMiniGameAPI_1.default.getLaunchOptionsSync();
                }
                if (null != opt) {
                    ALD_1.default.aldSendReportLaunchOptions(opt.scene, res.data.dqip, res.data.ipxq);
                }
            }
        }, function (res) {
            console.log("获取玩家ip,地区失败");
            var opt = null;
            if (Laya.Browser.onMiniGame) {
                opt = WXAPI_1.default.getLaunchOptionsSync();
            }
            else if (Laya.Browser.onQQMiniGame) {
                opt = QQMiniGameAPI_1.default.getLaunchOptionsSync();
            }
            if (null != opt) {
                ALD_1.default.aldSendReportLaunchOptions(opt.scene, "", "");
            }
        });
    };
    GameMgr._instance = null;
    return GameMgr;
}(Laya.Script));
exports.default = GameMgr;
},{"../ALD":1,"../AppConfig":2,"../CachedQQBannerAd":3,"../MaiLiangAPI/MaiLiang":16,"../Net/HttpUnit":26,"../ParkingJam/View/GameScene3D":45,"../QQMiniGameAPI":46,"../User/User":49,"../WXAPI":64,"./ViewMgr":21,"./WXADMgr":22,"./WudianMgr":23}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SoundMgr = /** @class */ (function () {
    function SoundMgr() {
        this._enabled = true;
    }
    Object.defineProperty(SoundMgr.prototype, "Enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (e) {
            if (!e) {
                this.stopBGM();
            }
            this._enabled = e;
        },
        enumerable: true,
        configurable: true
    });
    SoundMgr.prototype.getSoundUrl = function (name) {
        var url = SoundMgr.soundResPath + name + ".ogg";
        return url;
    };
    SoundMgr.prototype.playSound = function (name) {
        if (!this._enabled)
            return;
        var url = this.getSoundUrl(name);
        if (Laya.Browser.onMiniGame) {
            var sound = laya.utils.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = SoundMgr.soundResPath + name + ".ogg";
                sound.onEnded(function () {
                    laya.utils.Pool.recover(name, sound);
                    sound.offEnded();
                });
            }
            sound.play();
        }
        else {
            Laya.SoundManager.playSound(url, 1);
        }
    };
    SoundMgr.prototype.playBGM = function (name) {
        if (!this._enabled)
            return;
        var url = this.getSoundUrl(name);
        if (Laya.Browser.onMiniGame) {
            if (!this.bgm) {
                this.bgm = wx.createInnerAudioContext();
            }
            this.bgm.pause();
            this.bgm.src = url;
            this.bgm.loop = true;
            this.bgm.play();
        }
        else {
            Laya.SoundManager.playMusic(url, 0);
        }
    };
    SoundMgr.prototype.stopBGM = function () {
        if (Laya.Browser.onMiniGame) {
            if (this.bgm) {
                this.bgm.pause();
            }
        }
        else {
            Laya.SoundManager.stopMusic();
        }
    };
    SoundMgr.soundResPath = "subRes/sound/";
    SoundMgr.instance = new SoundMgr();
    return SoundMgr;
}());
exports.default = SoundMgr;
},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VibrateMgr = /** @class */ (function () {
    function VibrateMgr() {
    }
    //短震动
    VibrateMgr.vibrateShort = function () {
        if (!VibrateMgr.isEnable)
            return;
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].vibrateShort();
        }
        else if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].vibrateShort();
        }
        else if (Laya.Browser.onQQMiniGame) { //qq小游戏
            Laya.Browser.window["qq"].vibrateShort();
        }
    };
    //长震动
    VibrateMgr.ibrateLong = function () {
        if (!VibrateMgr.isEnable)
            return;
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].vibrateLong();
        }
        else if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].vibrateLong();
        }
        else if (Laya.Browser.onQQMiniGame) { //qq小游戏
            Laya.Browser.window["qq"].vibrateLong();
        }
    };
    //定时震动,毫秒
    VibrateMgr.vibrate = function (time) {
        if (!VibrateMgr.isEnable)
            return;
        if (Laya.Browser.onMiniGame) {
            var count_1 = time / 15; //微信小游戏中震动的时间是15毫秒的整数倍时间，本质是对短震动的封装
            var index_1 = 0;
            var obj_1 = { count: count_1, index: index_1 };
            Laya.timer.loop(16, obj_1, function () {
                VibrateMgr.vibrateShort();
                index_1++;
                if (index_1 > count_1) {
                    Laya.timer.clearAll(obj_1);
                }
            });
        }
        else if (Laya.Browser.onQGMiniGame) {
            var count_2 = time / 20; //OPPO小游戏中震动的时间是20毫秒的整数倍时间，本质是对短震动的封装
            var index_2 = 0;
            var obj_2 = { count: count_2, index: index_2 };
            Laya.timer.loop(21, obj_2, function () {
                VibrateMgr.vibrateShort();
                index_2++;
                if (index_2 > count_2) {
                    Laya.timer.clearAll(obj_2);
                }
            });
        }
        else if (Laya.Browser.onQQMiniGame) //qq小游戏
         {
            var count_3 = time / 20; //OPPO小游戏中震动的时间是20毫秒的整数倍时间，本质是对短震动的封装
            var index_3 = 0;
            var obj_3 = { count: count_3, index: index_3 };
            Laya.timer.loop(21, obj_3, function () {
                VibrateMgr.vibrateShort();
                index_3++;
                if (index_3 > count_3) {
                    Laya.timer.clearAll(obj_3);
                }
            });
        }
    };
    VibrateMgr.isEnable = true;
    return VibrateMgr;
}());
exports.default = VibrateMgr;
},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSwitchConfig_1 = require("../Config/AppSwitchConfig");
var WudianMgr_1 = require("./WudianMgr");
var ViewDef;
(function (ViewDef) {
    ViewDef["None"] = "";
    ViewDef["TipsView"] = "View/TipsView.json";
    ViewDef["ClickGetPrize"] = "View/ClickGetPrize.json";
    ViewDef["MainView"] = "View/Template/MainViewTemplate.json";
    ViewDef["MiniGameView"] = "View/Template/MiniGameViewTemplate.json";
    ViewDef["RewardView"] = "View/Template/RewardViewTemplate.json";
    ViewDef["InGameView"] = "View/Template/InGameViewTemplate.json";
    ViewDef["GameWinView"] = "View/Template/GameWinViewTemplate.json";
    ViewDef["GameFailView"] = "View/Template/GameFailViewTemplate.json";
    ViewDef["ExportView"] = "View/Template/ExportViewTemplate.json";
    ViewDef["Export2View"] = "View/Template/Export2ViewTemplate.json";
    ViewDef["Export3View"] = "View/Template/Export3ViewTemplate.json";
    ViewDef["WXCrazyClick"] = "View/Template/WXCrazyClick.json";
    ViewDef["OPPONativeView"] = "View/Template/OPPONativeViewTemplate.json";
    ViewDef["QQCrazyClickView"] = "View/Template/QQ/QQCrazyClick.json";
    ViewDef["QQCrazyClickView2"] = "View/Template/QQ/QQCrazyClick2.json";
    ViewDef["TTStoreView"] = "View/Template/TT/TTStore.json";
    ViewDef["TTSignInView"] = "View/Template/TT/TTSignIn.json";
    ViewDef["TTRewardView"] = "View/Template/TT/TTReward.json";
    ViewDef["VVNativeView1"] = "View/Template/VV/VVNativeView1Template.json";
    ViewDef["VVNativeView2"] = "View/Template/VV/VVNativeView2Template.json";
    //todo:添加你的界面
    ViewDef["GameView"] = "View/GameView.json";
})(ViewDef = exports.ViewDef || (exports.ViewDef = {}));
//界面管理器
var ViewMgr = /** @class */ (function () {
    function ViewMgr() {
        this._views = {};
        this._loadingList = new Array();
    }
    ViewMgr.prototype.openView = function (viewType, data, oncomplate) {
        if (this._views[viewType]) {
            var view = this._views[viewType];
            var coms = view._components;
            var viewBase = null;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        viewBase = element;
                        viewBase.openView(data);
                        break;
                    }
                }
            }
            if (oncomplate) {
                oncomplate(viewBase);
            }
            return;
        }
        for (var i = 0; i < this._loadingList.length; ++i) {
            var def = this._loadingList[i];
            if (def == viewType) {
                console.log("界面 : " + String(def) + " 正在加载中，请不要重复加载");
                return;
            }
        }
        var viewUrl = String(viewType);
        var self = this;
        this._loadingList.push(viewType);
        Laya.Scene.load(viewUrl, Laya.Handler.create(this, function (owner) {
            Laya.stage.addChild(owner);
            var view = owner;
            self._views[viewType] = view;
            var coms = owner._components;
            var viewBase = null;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        viewBase = element;
                        element._viewDef = viewType;
                        viewBase.openView(data);
                        break;
                    }
                }
            }
            for (var i = 0; i < self._loadingList.length; ++i) {
                var def = self._loadingList[i];
                if (def == viewType) {
                    self._loadingList.splice(i, 1);
                    break;
                }
            }
            if (oncomplate) {
                oncomplate(viewBase);
            }
        }));
    };
    ViewMgr.prototype.closeView = function (viewType) {
        var view = this._views[viewType];
        if (view) {
            var owner = view;
            var coms = owner._components;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        element.onClose();
                        break;
                    }
                }
            }
            view.removeSelf();
            view.destroy();
            this._views[viewType] = null;
        }
    };
    ViewMgr.prototype.ShowView = function (viewType) {
        var view = this._views[viewType];
        if (view) {
            var coms = view._components;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        element.show();
                        break;
                    }
                }
            }
        }
    };
    ViewMgr.prototype.hideView = function (viewType) {
        var view = this._views[viewType];
        if (view) {
            var coms = view._components;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        element.hide();
                        break;
                    }
                }
            }
        }
    };
    ViewMgr.prototype.getView = function (viewType) {
        return this._views[viewType];
    };
    ViewMgr.prototype.showTips = function (msg) {
        this.openView(ViewDef.TipsView, msg);
    };
    //尝试打开 导出界面3 (Exprot3ViewTemplate)
    //complate 回调用函数，如果成功打开界面 complate 接受参数 Export3View实例 否则为 null
    ViewMgr.prototype.tryShowPopAd = function (complate) {
        if (1 == AppSwitchConfig_1.default.getInstance().getAppSwitchData().popAd && WudianMgr_1.default.WudianFlag) {
            ViewMgr.instance.openView(ViewDef.Export3View, null, function (v) {
                if (null != complate)
                    complate(v);
            });
        }
        else {
            if (null != complate)
                complate(null);
        }
    };
    ViewMgr.instance = new ViewMgr();
    return ViewMgr;
}());
exports.default = ViewMgr;
},{"../Config/AppSwitchConfig":4,"./WudianMgr":23}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSwitchConfig_1 = require("../Config/AppSwitchConfig");
var WXBannderAd = /** @class */ (function () {
    function WXBannderAd(bannerid) {
        this._id = null;
        this._banner = null;
        this._createTime = 0;
        this._destroyed = false;
        this._error = null;
        this._loading = false;
        this._retryCount = 0;
        this._bannerTotalShowTime = 0;
        this._lastShowTime = 0;
        this._id = bannerid;
    }
    Object.defineProperty(WXBannderAd.prototype, "Id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannderAd.prototype, "CreateTime", {
        get: function () {
            return this._createTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannderAd.prototype, "Destroyed", {
        get: function () {
            return this._destroyed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannderAd.prototype, "isReady", {
        get: function () {
            return null != this._banner;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannderAd.prototype, "isError", {
        get: function () {
            return null != this._error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannderAd.prototype, "Error", {
        get: function () {
            return this._error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannderAd.prototype, "Loading", {
        get: function () {
            return this._loading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannderAd.prototype, "RetryCount", {
        get: function () {
            return this._retryCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannderAd.prototype, "BannerTotalShowTime", {
        get: function () {
            return this._bannerTotalShowTime;
        },
        enumerable: true,
        configurable: true
    });
    WXBannderAd.prototype.show = function () {
        if (this.isReady) {
            this._banner.hide();
            var self_1 = this;
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            var pos = new Laya.Point(0, 0);
            var width = 300;
            var left = sw / 2 - width / 2;
            var top_1 = sh - 130;
            this._banner.style.left = left;
            this._banner.style.top = top_1;
            this._lastShowTime = Laya.timer.currTimer;
            this._banner.show();
        }
    };
    WXBannderAd.prototype.hide = function () {
        if (this.isReady) {
            this._banner.hide();
            this._bannerTotalShowTime += (Laya.timer.currTimer - this._lastShowTime);
        }
    };
    WXBannderAd.prototype.destroy = function () {
        if (this._destroyed) {
            console.log("BannerAd 已经被销毁");
            return;
        }
        if (this._loading) {
            console.log("BannerAd 正在加载中，无法进行销毁");
            return;
        }
        if (null != this._banner) {
            this._banner.destroy();
        }
        this._banner = null;
        this._destroyed = true;
    };
    WXBannderAd.prototype.retry = function (callBack) {
        if (this._destroyed) {
            console.log("BannerAd 已被销毁，无法重试");
            return;
        }
        if (this.isReady) {
            console.log("BannerAd 已创建成功，无需重试");
            return;
        }
        if (this._loading) {
            console.log("BannerAd 正在创建中");
            return;
        }
        if (this._retryCount >= WXBannderAd.MAX_RETRY_COUNT) {
            console.log("此 BannerAd 重试次数已达最大");
            return;
        }
        var self = this;
        this._create(function (isOk) {
            if (null != callBack) {
                callBack(isOk);
            }
            ++self._retryCount;
        });
    };
    WXBannderAd.prototype._create = function (callBack) {
        if (!Laya.Browser.onMiniGame) {
            if (null != callBack) {
                callBack(false);
            }
            return;
        }
        var banner = null;
        if (Laya.Browser.onMiniGame) {
            banner = Laya.Browser.window["wx"].createBannerAd({
                adUnitId: this._id,
                adIntervals: 30,
                style: {
                    left: 0,
                    top: 0,
                    width: 300,
                }
            });
        }
        else if (Laya.Browser.onQQMiniGame) {
            banner = Laya.Browser.window["qq"].createBannerAd({
                adUnitId: this._id,
                adIntervals: 30,
                style: {
                    left: 0,
                    top: 0,
                    width: 300,
                }
            });
        }
        if (null != banner) {
            var self_2 = this;
            this._loading = true;
            banner.onLoad(function (res) {
                console.log("BannderAd 加载完成", self_2._id, res);
                self_2._banner = banner;
                self_2._createTime = Laya.timer.currTimer;
                self_2._loading = false;
                if (null != callBack) {
                    callBack(true);
                }
            });
            banner.onError(function (err) {
                console.log("BannderAd 加载失败", self_2._id, err);
                self_2._error = err;
                self_2._loading = false;
                banner.destroy();
                if (null != callBack) {
                    callBack(false);
                }
            });
        }
    };
    WXBannderAd.MAX_RETRY_COUNT = 3;
    return WXBannderAd;
}());
exports.WXBannderAd = WXBannderAd;
var WXGridAd = /** @class */ (function () {
    function WXGridAd(bannerid) {
        this._id = null;
        this._gridAd = null;
        this._createTime = 0;
        this._destroyed = false;
        this._error = null;
        this._loading = false;
        this._id = bannerid;
    }
    Object.defineProperty(WXGridAd.prototype, "CreateTime", {
        get: function () {
            return this._createTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXGridAd.prototype, "Destroyed", {
        get: function () {
            return this._destroyed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXGridAd.prototype, "isReady", {
        get: function () {
            return null != this._gridAd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXGridAd.prototype, "isError", {
        get: function () {
            return null != this._error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXGridAd.prototype, "Error", {
        get: function () {
            return this._error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXGridAd.prototype, "Loading", {
        get: function () {
            return this._loading;
        },
        enumerable: true,
        configurable: true
    });
    WXGridAd.prototype.show = function () {
        if (this.isReady) {
            this._gridAd.show();
        }
    };
    WXGridAd.prototype.hide = function () {
        if (this.isReady) {
            this._gridAd.hide();
        }
    };
    WXGridAd.prototype.destroy = function () {
        if (this._destroyed) {
            console.log("GridAD 已经被销毁");
            return;
        }
        if (this._loading) {
            console.log("GridAD 正在加载中，无法进行销毁");
            return;
        }
        if (null != this._gridAd) {
            this._gridAd.destroy();
        }
        this._gridAd = null;
        this._destroyed = true;
    };
    WXGridAd.prototype.retry = function (callBack) {
        if (this._destroyed) {
            console.log("GridAD 已被销毁，无法重试");
            return;
        }
        if (this.isReady) {
            console.log("GridAD 已创建成功，无需重试");
            return;
        }
        if (this._loading) {
            console.log("GridAD 正在创建中");
            return;
        }
        var self = this;
        this._create(function (isOk) {
            if (null != callBack) {
                callBack(isOk);
            }
        });
    };
    WXGridAd.prototype._create = function (callBack) {
        if (!Laya.Browser.onMiniGame) {
            if (null != callBack) {
                callBack(false);
            }
            return;
        }
        var gridAd = Laya.Browser.window["wx"].createGridAd({
            adUnitId: this._id,
            adIntervals: 30,
            style: {
                left: 0,
                top: 0,
                width: 300,
                height: 150,
            }
        });
        if (null != gridAd) {
            var self_3 = this;
            this._loading = true;
            gridAd.onLoad(function (res) {
                console.log("GridAD 加载完成", self_3._id, res);
                self_3._gridAd = gridAd;
                self_3._createTime = Laya.timer.currTimer;
                self_3._loading = false;
                if (null != callBack) {
                    callBack(true);
                }
            });
            gridAd.onError(function (err) {
                console.log("GridAD 加载失败", self_3._id, err);
                self_3._error = err;
                self_3._loading = false;
                gridAd.destroy();
                if (null != callBack) {
                    callBack(false);
                }
            });
        }
    };
    return WXGridAd;
}());
exports.WXGridAd = WXGridAd;
var WXADMgr = /** @class */ (function () {
    function WXADMgr() {
    }
    WXADMgr.init = function () {
        if (WXADMgr._inited)
            return;
        var banners = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wxWuDianBanners;
        for (var i = 0; i < banners.length; ++i) {
            WXADMgr._bannerIds.push(banners[i]);
        }
        for (var i = 0; i < WXADMgr._bannerIds.length; ++i) {
            var cur = WXADMgr._bannerIds[i];
            WXADMgr._bannerIds[i] = banners[Math.floor(Math.random() * banners.length)];
        }
        WXADMgr._createBannerAd();
        var bannerRecreateTime = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerCreateFailNum * 1000;
        Laya.timer.loop(bannerRecreateTime, WXADMgr, function () {
            WXADMgr._checkBannerAd();
            WXADMgr._createBannerAd();
        });
        //WXADMgr._createGirdAd();
        WXADMgr._inited = true;
    };
    WXADMgr.getBanner = function (callBack) {
        var readyBannerAd = [];
        var UnreadyBannerAd = [];
        for (var i = 0; i < WXADMgr._banners.length; ++i) {
            var bannerAd_1 = WXADMgr._banners[i];
            if (!bannerAd_1.Destroyed) {
                if (bannerAd_1.isReady) {
                    readyBannerAd.push(bannerAd_1);
                }
                else {
                    UnreadyBannerAd.push(bannerAd_1);
                }
            }
        }
        if (WXADMgr._curBannerGetIndex >= readyBannerAd.length) {
            WXADMgr._curBannerGetIndex = 0;
        }
        var bannerAd = readyBannerAd[WXADMgr._curBannerGetIndex];
        ++WXADMgr._curBannerGetIndex;
        if (null != bannerAd) {
            callBack(bannerAd);
        }
        else {
            bannerAd = WXADMgr._createBannerAd();
            if (null == bannerAd) {
                bannerAd = WXADMgr._banners[Math.floor(Math.random() * WXADMgr._banners.length)];
            }
            if (null == bannerAd) {
                callBack(null);
            }
            else {
                bannerAd.retry(function (ok) {
                    if (ok) {
                        callBack(bannerAd);
                    }
                    else {
                        callBack(null);
                    }
                });
            }
        }
    };
    WXADMgr._createBannerAd = function () {
        if (WXADMgr._curBannerCreateIndex >= WXADMgr._bannerIds.length)
            return null;
        var bannerAd = new WXBannderAd(WXADMgr._bannerIds[WXADMgr._curBannerCreateIndex]);
        WXADMgr._banners.push(bannerAd);
        bannerAd.retry();
        ++WXADMgr._curBannerCreateIndex;
        return bannerAd;
    };
    WXADMgr._checkBannerAd = function () {
        var readyBannerAd = [];
        var UnreadyBannerAd = [];
        for (var i = 0; i < WXADMgr._banners.length; ++i) {
            var bannerAd = WXADMgr._banners[i];
            if (!bannerAd.Destroyed) {
                if (bannerAd.isReady) {
                    readyBannerAd.push(bannerAd);
                }
                else {
                    UnreadyBannerAd.push(bannerAd);
                }
            }
        }
        for (var i = 0; i < WXADMgr._banners.length; ++i) {
            var bannerAd = WXADMgr._banners[i];
            var bannerShowTime = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerShowTime;
            if (!bannerAd.isReady) {
                if (bannerAd.RetryCount >= WXBannderAd.MAX_RETRY_COUNT) {
                    console.log("BannerAd 超过重试次数，销毁 : ", bannerAd.Id);
                    bannerAd.destroy();
                }
                else {
                    bannerAd.retry();
                }
            }
            else if (readyBannerAd.length >= 2 && bannerAd.BannerTotalShowTime >= bannerShowTime * 1000) {
                console.log("BannerAd 展示时间超过限制，销毁 : ", bannerAd.Id);
                bannerAd.destroy();
            }
        }
    };
    WXADMgr.getBoxAd = function (callBack) {
        if (this._wxGridAd.isReady) {
            callBack(this._wxGridAd);
        }
        else {
            var gridAd_1 = this._wxGridAd;
            gridAd_1.retry(function (isOk) {
                if (isOk) {
                    callBack(gridAd_1);
                }
                else {
                    callBack(null);
                }
            });
        }
    };
    WXADMgr._createGirdAd = function () {
        if (null != this._wxGridAd)
            return;
        var gridAd = new WXGridAd("");
        gridAd.retry();
        this._wxGridAd = gridAd;
    };
    WXADMgr._inited = false;
    WXADMgr._bannerIds = new Array();
    WXADMgr._banners = new Array();
    WXADMgr._curBannerCreateIndex = 0;
    WXADMgr._curBannerGetIndex = 0;
    WXADMgr._wxGridAd = null;
    return WXADMgr;
}());
exports.default = WXADMgr;
},{"../Config/AppSwitchConfig":4}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpUnit_1 = require("../Net/HttpUnit");
var AppSwitchConfig_1 = require("../Config/AppSwitchConfig");
var WXAPI_1 = require("../WXAPI");
var QQMiniGameAPI_1 = require("../QQMiniGameAPI");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var WudianMgr = /** @class */ (function () {
    function WudianMgr() {
    }
    WudianMgr.IpBlockFlag = function () {
        return this._ipBlockFlag;
    };
    /**
     * 此方法调用很慢，所以要在游戏初始化的时候调用一次此方法
     *
     * @static
     * @memberof WudianMgr
     */
    WudianMgr.UpdateIpBlockState = function () {
        HttpUnit_1.default.GetIpBlock(function (res) {
            console.log("调用IpBlock接口成功,结果为:", res);
            WudianMgr._ipBlockFlag = res.code;
            EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.App_OnUpdateIpBlockState, { ipBlockFlag: WudianMgr._ipBlockFlag });
        }, null);
    };
    /**
     * IP是否被屏蔽
     *
     * @static
     * @returns {boolean}
     * @memberof WudianMgr
     */
    WudianMgr.GetIpBlocked = function () {
        return this._ipBlockFlag == 0;
    };
    /**
     * 得到用户进入的场景值
     *
     * @static
     * @returns {number}
     * @memberof WudianMgr
     */
    WudianMgr.GetEntryScene = function () {
        return WXAPI_1.default.getLaunchOptionsSync().scene == 1006;
    };
    /**
     * 误点开关是否打开，包括了总开关和分时开关
     *
     * @static
     * @returns {boolean}
     * @memberof WudianMgr
     */
    WudianMgr.IsSwitchOpen = function () {
        var mainSwitch = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudian == 1;
        var isOpenTime = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudianTimeAvaliable;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "打开时间", isOpenTime);
        return mainSwitch && isOpenTime;
    };
    Object.defineProperty(WudianMgr, "WudianFlag", {
        /**
         * 完全封装好的误点Flag
         *
         * @readonly
         * @static
         * @type {boolean}
         * @memberof WudianMgr
         */
        get: function () {
            var mainSwitch = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudian == 1;
            var launchScene = null;
            if (Laya.Browser.onMiniGame) {
                launchScene = WXAPI_1.default.getLaunchOptionsSync().scene;
            }
            else if (Laya.Browser.onQQMiniGame) {
                launchScene = QQMiniGameAPI_1.default.getLaunchOptionsSync().scene;
            }
            var noEnterBySearch = true;
            var wudianSceneList = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudianSceneList;
            for (var i = 0; i < wudianSceneList.length; ++i) {
                var wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            var isOpenTime = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudianTimeAvaliable;
            var ipnotBlock = this._ipBlockFlag == 0;
            /* 测试功能，等删 */
            // ipnotBlock = true;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock, "打开时间", isOpenTime);
            return mainSwitch && noEnterBySearch && ipnotBlock && isOpenTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WudianMgr, "NoTimeWudianFlag", {
        /**
         * 没有涉及到定时开关的wudianFlag,自行整合按照时间开关的效果
         *
         * @static
         * @returns {boolean}
         * @memberof WudianMgr
         */
        get: function () {
            var mainSwitch = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudian == 1;
            var launchScene = null;
            if (Laya.Browser.onMiniGame) {
                launchScene = WXAPI_1.default.getLaunchOptionsSync().scene;
            }
            else if (Laya.Browser.onQQMiniGame) {
                launchScene = QQMiniGameAPI_1.default.getLaunchOptionsSync().scene;
            }
            var noEnterBySearch = true;
            var wudianSceneList = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudianSceneList;
            for (var i = 0; i < wudianSceneList.length; ++i) {
                var wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            var ipnotBlock = this._ipBlockFlag == 0;
            /* 测试功能，等删 */
            // ipnotBlock = true;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
            return mainSwitch && noEnterBySearch && ipnotBlock;
        },
        enumerable: true,
        configurable: true
    });
    WudianMgr._ipBlockFlag = -1;
    return WudianMgr;
}());
exports.default = WudianMgr;
},{"../Config/AppSwitchConfig":4,"../Event/EventDef":7,"../Event/EventMgr":8,"../Net/HttpUnit":26,"../QQMiniGameAPI":46,"../WXAPI":64}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("./Event/EventMgr");
var EventDef_1 = require("./Event/EventDef");
var NativeCallback = /** @class */ (function () {
    function NativeCallback() {
    }
    // private static bridge: Laya.IPlatformClass = null;
    NativeCallback.onVideoFail = function () {
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.RewardVideoFail);
        Laya.SoundManager.muted = false;
    };
    NativeCallback.onVideoSuccess = function (reward) {
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.RewardVideoSuccess, reward);
        Laya.SoundManager.muted = false;
    };
    NativeCallback.onInsertVideoEnd = function () {
        console.debug("onInsertVideoEnd    --------- ------------ ");
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.InsertVideoEnd);
        Laya.SoundManager.muted = false;
    };
    //进入后台
    NativeCallback.onPause = function () {
        console.debug("进入后台 静音");
        Laya.SoundManager.muted = true;
    };
    //恢复
    NativeCallback.onResume = function () {
        console.debug("恢复---------");
        Laya.SoundManager.muted = false;
    };
    //进入游戏后，执行init函数
    // public static init(){
    //     if (Laya.Browser.window.conch) {
    //         this.os = conchConfig.getOS();
    //         if (this.os == JaveCallback.conchIOS) {
    //             this.bridge = Laya.PlatformClass.createClass("JSBridge");
    //             this.bridge.call("initGame:");
    //         }
    //         else if (this.os == JaveCallback.conchAndroid) {
    //             this.bridge = Laya.PlatformClass.createClass("demo.JSBridge");
    //             this.bridge.call("initGame");
    //         }
    //     }
    // }
    NativeCallback.CallNativeFunc = function (funcName) {
        if (Laya.Browser.onAndroid) {
            var bridge = window["PlatformClass"].createClass("demo.JSBridge");
            bridge.call(funcName);
        }
        else if (Laya.Browser.onIOS) {
        }
    };
    NativeCallback.ShowLog = function (log) {
        console.log("输出native日志---" + log);
        if (Laya.Browser.onAndroid) {
            var bridge = window["PlatformClass"].createClass("demo.JSBridge");
            bridge.call("showLog", log);
        }
        else if (Laya.Browser.onIOS) {
        }
    };
    NativeCallback.NowVideoType = "";
    NativeCallback.conchIOS = "Conch-ios";
    NativeCallback.conchAndroid = "Conch-android";
    NativeCallback.os = "";
    return NativeCallback;
}());
exports.default = NativeCallback;
},{"./Event/EventDef":7,"./Event/EventMgr":8}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("./aes.js");
var AesTools = /** @class */ (function () {
    function AesTools() {
    }
    //加密
    AesTools.encrypt = function (str) {
        var key = CryptoJS.enc.Utf8.parse(AesTools.KEY); // 秘钥
        var iv = CryptoJS.enc.Utf8.parse(AesTools.IV); //向量iv
        var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    };
    //解密
    AesTools.decrypt = function (str) {
        var key = CryptoJS.enc.Utf8.parse(AesTools.KEY); // 秘钥
        var iv = CryptoJS.enc.Utf8.parse(AesTools.IV); //向量iv
        var decrypted = CryptoJS.AES.decrypt(str, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        return decrypted.toString(CryptoJS.enc.Utf8);
    };
    AesTools.KEY = 'b#63fFJ6AvkK3YT*';
    AesTools.IV = 'J$f4DU%sNL73M&Go';
    return AesTools;
}());
exports.default = AesTools;
},{"./aes.js":28}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetConfig_1 = require("./NetConfig");
var User_1 = require("../User/User");
var AesTools_1 = require("./AesTools");
var AppConfig_1 = require("../AppConfig");
var requestData = /** @class */ (function () {
    function requestData() {
        this.meth = "post";
        this.url = "";
        this.onSuccess = null;
        this.onFail = null;
        this.data = {};
    }
    return requestData;
}());
exports.requestData = requestData;
var HttpUnit = /** @class */ (function () {
    function HttpUnit() {
    }
    HttpUnit.request = function (req) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        }
        else {
            req.url = NetConfig_1.default.serverUrl + req.url;
        }
        var completeFunc = function (res) {
            console.log(res, "http Success");
            if (req.onSuccess) {
                req.onSuccess(res);
            }
            req.onSuccess = null;
            req = null;
        };
        var errorFunc = function (res) {
            console.log(res, "http fail");
            if (req.onFail) {
                req.onFail(res);
            }
            req.onFail = null;
            req = null;
        };
        var xhr = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, this, completeFunc);
        xhr.once(Laya.Event.ERROR, this, errorFunc);
        var dataStr = JSON.stringify(req.data);
        if (Laya.Browser.onMiniGame || AppConfig_1.default.onTTMiniGame) {
            req.data.code = User_1.default.code;
        }
        else if (Laya.Browser.onQGMiniGame) //OPPO小游戏
         {
            req.data.oppotoken = User_1.default.code;
        }
        else if (Laya.Browser.onQQMiniGame) //qq小游戏
         {
            req.data.code = User_1.default.code;
        }
        else {
            req.data.code = User_1.default.code;
        }
        var time = "time=" + String(Date.now());
        var header = [
            "Content-Type", "application/json",
            "state", NetConfig_1.default.state,
            "gameid", NetConfig_1.default.gameid,
            "sign", AesTools_1.default.encrypt(time),
        ];
        if (User_1.default.token) {
            header.push("token");
            header.push(User_1.default.token);
        }
        xhr.send(req.url, JSON.stringify(req.data), req.meth, "json", header);
    };
    //todo:这里添加你们和服务器相互的接口
    HttpUnit.login = function (onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.Login;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit.request(req);
    };
    HttpUnit.saveGameData = function (gameData, onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.SaveGameData;
        req.data.gameData = gameData;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit.request(req);
    };
    HttpUnit.getGameData = function (onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.GetUser;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit.request(req);
    };
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    HttpUnit.GetIpBlock = function (onSuccess, onFail) {
        if (-1 != NetConfig_1.default.gameid) {
            var req = new requestData();
            req.url = NetConfig_1.default.IpBlock;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            HttpUnit.request(req);
        }
    };
    HttpUnit.reportExport = function (appid, game_name, onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.reportExport;
        req.data.wbappid = appid;
        req.data.game_name = game_name;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit.request(req);
    };
    HttpUnit.reportImport = function (appid, channel, onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.reportImport;
        req.data.wbappid = appid;
        req.data.channel = channel;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit.request(req);
    };
    HttpUnit.Getuserip = function (onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.getuserip;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        HttpUnit.request(req);
    };
    //签到
    HttpUnit.SignIn = function (onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.signin;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        req.data.type = 1;
        HttpUnit.request(req);
    };
    //获取签到状态
    HttpUnit.GetSignIn = function (onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.signin;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        req.data.type = 0;
        HttpUnit.request(req);
    };
    return HttpUnit;
}());
exports.default = HttpUnit;
},{"../AppConfig":2,"../User/User":49,"./AesTools":25,"./NetConfig":27}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetConfig = /** @class */ (function () {
    function NetConfig() {
    }
    NetConfig.state = 0;
    NetConfig.gameid = 82;
    NetConfig.serverUrl = "";
    NetConfig.Login = "";
    NetConfig.SaveGameData = "";
    NetConfig.GetUser = "";
    /* 用来对IP地址进行屏蔽的接口地址，可以使用接口的返回值让某些广告逻辑在微信的审核地区(广州)发生变化 */
    NetConfig.IpBlock = "";
    NetConfig.reportExport = "";
    NetConfig.reportImport = "";
    NetConfig.getuserip = "";
    NetConfig.signin = ""; //签到
    return NetConfig;
}());
exports.default = NetConfig;
},{}],28:[function(require,module,exports){
var CryptoJS = CryptoJS || function (u, p) {
  var d = {}, l = d.lib = {}, s = function () { }, t = l.Base = { extend: function (a) { s.prototype = this; var c = new s; a && c.mixIn(a); c.hasOwnProperty("init") || (c.init = function () { c.$super.init.apply(this, arguments) }); c.init.prototype = c; c.$super = this; return c }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a }, init: function () { }, mixIn: function (a) { for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]); a.hasOwnProperty("toString") && (this.toString = a.toString) }, clone: function () { return this.init.prototype.extend(this) } },
  r = l.WordArray = t.extend({
    init: function (a, c) { a = this.words = a || []; this.sigBytes = c != p ? c : 4 * a.length }, toString: function (a) { return (a || v).stringify(this) }, concat: function (a) { var c = this.words, e = a.words, j = this.sigBytes; a = a.sigBytes; this.clamp(); if (j % 4) for (var k = 0; k < a; k++)c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - 8 * (k % 4) & 255) << 24 - 8 * ((j + k) % 4); else if (65535 < e.length) for (k = 0; k < a; k += 4)c[j + k >>> 2] = e[k >>> 2]; else c.push.apply(c, e); this.sigBytes += a; return this }, clamp: function () {
      var a = this.words, c = this.sigBytes; a[c >>> 2] &= 4294967295 <<
        32 - 8 * (c % 4); a.length = u.ceil(c / 4)
    }, clone: function () { var a = t.clone.call(this); a.words = this.words.slice(0); return a }, random: function (a) { for (var c = [], e = 0; e < a; e += 4)c.push(4294967296 * u.random() | 0); return new r.init(c, a) }
  }), w = d.enc = {}, v = w.Hex = {
    stringify: function (a) { var c = a.words; a = a.sigBytes; for (var e = [], j = 0; j < a; j++) { var k = c[j >>> 2] >>> 24 - 8 * (j % 4) & 255; e.push((k >>> 4).toString(16)); e.push((k & 15).toString(16)) } return e.join("") }, parse: function (a) {
      for (var c = a.length, e = [], j = 0; j < c; j += 2)e[j >>> 3] |= parseInt(a.substr(j,
        2), 16) << 24 - 4 * (j % 8); return new r.init(e, c / 2)
    }
  }, b = w.Latin1 = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var e = [], j = 0; j < a; j++)e.push(String.fromCharCode(c[j >>> 2] >>> 24 - 8 * (j % 4) & 255)); return e.join("") }, parse: function (a) { for (var c = a.length, e = [], j = 0; j < c; j++)e[j >>> 2] |= (a.charCodeAt(j) & 255) << 24 - 8 * (j % 4); return new r.init(e, c) } }, x = w.Utf8 = { stringify: function (a) { try { return decodeURIComponent(escape(b.stringify(a))) } catch (c) { throw Error("Malformed UTF-8 data"); } }, parse: function (a) { return b.parse(unescape(encodeURIComponent(a))) } },
  q = l.BufferedBlockAlgorithm = t.extend({
    reset: function () { this._data = new r.init; this._nDataBytes = 0 }, _append: function (a) { "string" == typeof a && (a = x.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes }, _process: function (a) { var c = this._data, e = c.words, j = c.sigBytes, k = this.blockSize, b = j / (4 * k), b = a ? u.ceil(b) : u.max((b | 0) - this._minBufferSize, 0); a = b * k; j = u.min(4 * a, j); if (a) { for (var q = 0; q < a; q += k)this._doProcessBlock(e, q); q = e.splice(0, a); c.sigBytes -= j } return new r.init(q, j) }, clone: function () {
      var a = t.clone.call(this);
      a._data = this._data.clone(); return a
    }, _minBufferSize: 0
  }); l.Hasher = q.extend({
    cfg: t.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset() }, reset: function () { q.reset.call(this); this._doReset() }, update: function (a) { this._append(a); this._process(); return this }, finalize: function (a) { a && this._append(a); return this._doFinalize() }, blockSize: 16, _createHelper: function (a) { return function (b, e) { return (new a.init(e)).finalize(b) } }, _createHmacHelper: function (a) {
      return function (b, e) {
        return (new n.HMAC.init(a,
          e)).finalize(b)
      }
    }
  }); var n = d.algo = {}; return d
}(Math);
(function () {
  var u = CryptoJS, p = u.lib.WordArray; u.enc.Base64 = {
    stringify: function (d) { var l = d.words, p = d.sigBytes, t = this._map; d.clamp(); d = []; for (var r = 0; r < p; r += 3)for (var w = (l[r >>> 2] >>> 24 - 8 * (r % 4) & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - 8 * ((r + 1) % 4) & 255) << 8 | l[r + 2 >>> 2] >>> 24 - 8 * ((r + 2) % 4) & 255, v = 0; 4 > v && r + 0.75 * v < p; v++)d.push(t.charAt(w >>> 6 * (3 - v) & 63)); if (l = t.charAt(64)) for (; d.length % 4;)d.push(l); return d.join("") }, parse: function (d) {
      var l = d.length, s = this._map, t = s.charAt(64); t && (t = d.indexOf(t), -1 != t && (l = t)); for (var t = [], r = 0, w = 0; w <
        l; w++)if (w % 4) { var v = s.indexOf(d.charAt(w - 1)) << 2 * (w % 4), b = s.indexOf(d.charAt(w)) >>> 6 - 2 * (w % 4); t[r >>> 2] |= (v | b) << 24 - 8 * (r % 4); r++ } return p.create(t, r)
    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  }
})();
(function (u) {
  function p(b, n, a, c, e, j, k) { b = b + (n & a | ~n & c) + e + k; return (b << j | b >>> 32 - j) + n } function d(b, n, a, c, e, j, k) { b = b + (n & c | a & ~c) + e + k; return (b << j | b >>> 32 - j) + n } function l(b, n, a, c, e, j, k) { b = b + (n ^ a ^ c) + e + k; return (b << j | b >>> 32 - j) + n } function s(b, n, a, c, e, j, k) { b = b + (a ^ (n | ~c)) + e + k; return (b << j | b >>> 32 - j) + n } for (var t = CryptoJS, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++)b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0; r = r.MD5 = v.extend({
    _doReset: function () { this._hash = new w.init([1732584193, 4023233417, 2562383102, 271733878]) },
    _doProcessBlock: function (q, n) {
      for (var a = 0; 16 > a; a++) { var c = n + a, e = q[c]; q[c] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360 } var a = this._hash.words, c = q[n + 0], e = q[n + 1], j = q[n + 2], k = q[n + 3], z = q[n + 4], r = q[n + 5], t = q[n + 6], w = q[n + 7], v = q[n + 8], A = q[n + 9], B = q[n + 10], C = q[n + 11], u = q[n + 12], D = q[n + 13], E = q[n + 14], x = q[n + 15], f = a[0], m = a[1], g = a[2], h = a[3], f = p(f, m, g, h, c, 7, b[0]), h = p(h, f, m, g, e, 12, b[1]), g = p(g, h, f, m, j, 17, b[2]), m = p(m, g, h, f, k, 22, b[3]), f = p(f, m, g, h, z, 7, b[4]), h = p(h, f, m, g, r, 12, b[5]), g = p(g, h, f, m, t, 17, b[6]), m = p(m, g, h, f, w, 22, b[7]),
        f = p(f, m, g, h, v, 7, b[8]), h = p(h, f, m, g, A, 12, b[9]), g = p(g, h, f, m, B, 17, b[10]), m = p(m, g, h, f, C, 22, b[11]), f = p(f, m, g, h, u, 7, b[12]), h = p(h, f, m, g, D, 12, b[13]), g = p(g, h, f, m, E, 17, b[14]), m = p(m, g, h, f, x, 22, b[15]), f = d(f, m, g, h, e, 5, b[16]), h = d(h, f, m, g, t, 9, b[17]), g = d(g, h, f, m, C, 14, b[18]), m = d(m, g, h, f, c, 20, b[19]), f = d(f, m, g, h, r, 5, b[20]), h = d(h, f, m, g, B, 9, b[21]), g = d(g, h, f, m, x, 14, b[22]), m = d(m, g, h, f, z, 20, b[23]), f = d(f, m, g, h, A, 5, b[24]), h = d(h, f, m, g, E, 9, b[25]), g = d(g, h, f, m, k, 14, b[26]), m = d(m, g, h, f, v, 20, b[27]), f = d(f, m, g, h, D, 5, b[28]), h = d(h, f,
          m, g, j, 9, b[29]), g = d(g, h, f, m, w, 14, b[30]), m = d(m, g, h, f, u, 20, b[31]), f = l(f, m, g, h, r, 4, b[32]), h = l(h, f, m, g, v, 11, b[33]), g = l(g, h, f, m, C, 16, b[34]), m = l(m, g, h, f, E, 23, b[35]), f = l(f, m, g, h, e, 4, b[36]), h = l(h, f, m, g, z, 11, b[37]), g = l(g, h, f, m, w, 16, b[38]), m = l(m, g, h, f, B, 23, b[39]), f = l(f, m, g, h, D, 4, b[40]), h = l(h, f, m, g, c, 11, b[41]), g = l(g, h, f, m, k, 16, b[42]), m = l(m, g, h, f, t, 23, b[43]), f = l(f, m, g, h, A, 4, b[44]), h = l(h, f, m, g, u, 11, b[45]), g = l(g, h, f, m, x, 16, b[46]), m = l(m, g, h, f, j, 23, b[47]), f = s(f, m, g, h, c, 6, b[48]), h = s(h, f, m, g, w, 10, b[49]), g = s(g, h, f, m,
            E, 15, b[50]), m = s(m, g, h, f, r, 21, b[51]), f = s(f, m, g, h, u, 6, b[52]), h = s(h, f, m, g, k, 10, b[53]), g = s(g, h, f, m, B, 15, b[54]), m = s(m, g, h, f, e, 21, b[55]), f = s(f, m, g, h, v, 6, b[56]), h = s(h, f, m, g, x, 10, b[57]), g = s(g, h, f, m, t, 15, b[58]), m = s(m, g, h, f, D, 21, b[59]), f = s(f, m, g, h, z, 6, b[60]), h = s(h, f, m, g, C, 10, b[61]), g = s(g, h, f, m, j, 15, b[62]), m = s(m, g, h, f, A, 21, b[63]); a[0] = a[0] + f | 0; a[1] = a[1] + m | 0; a[2] = a[2] + g | 0; a[3] = a[3] + h | 0
    }, _doFinalize: function () {
      var b = this._data, n = b.words, a = 8 * this._nDataBytes, c = 8 * b.sigBytes; n[c >>> 5] |= 128 << 24 - c % 32; var e = u.floor(a /
        4294967296); n[(c + 64 >>> 9 << 4) + 15] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360; n[(c + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360; b.sigBytes = 4 * (n.length + 1); this._process(); b = this._hash; n = b.words; for (a = 0; 4 > a; a++)c = n[a], n[a] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360; return b
    }, clone: function () { var b = v.clone.call(this); b._hash = this._hash.clone(); return b }
  }); t.MD5 = v._createHelper(r); t.HmacMD5 = v._createHmacHelper(r)
})(Math);
(function () {
  var u = CryptoJS, p = u.lib, d = p.Base, l = p.WordArray, p = u.algo, s = p.EvpKDF = d.extend({ cfg: d.extend({ keySize: 4, hasher: p.MD5, iterations: 1 }), init: function (d) { this.cfg = this.cfg.extend(d) }, compute: function (d, r) { for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q;) { n && s.update(n); var n = s.update(d).finalize(r); s.reset(); for (var a = 1; a < p; a++)n = s.finalize(n), s.reset(); b.concat(n) } b.sigBytes = 4 * q; return b } }); u.EvpKDF = function (d, l, p) {
    return s.create(p).compute(d,
      l)
  }
})();
CryptoJS.lib.Cipher || function (u) {
  var p = CryptoJS, d = p.lib, l = d.Base, s = d.WordArray, t = d.BufferedBlockAlgorithm, r = p.enc.Base64, w = p.algo.EvpKDF, v = d.Cipher = t.extend({
    cfg: l.extend(), createEncryptor: function (e, a) { return this.create(this._ENC_XFORM_MODE, e, a) }, createDecryptor: function (e, a) { return this.create(this._DEC_XFORM_MODE, e, a) }, init: function (e, a, b) { this.cfg = this.cfg.extend(b); this._xformMode = e; this._key = a; this.reset() }, reset: function () { t.reset.call(this); this._doReset() }, process: function (e) { this._append(e); return this._process() },
    finalize: function (e) { e && this._append(e); return this._doFinalize() }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function (e) { return { encrypt: function (b, k, d) { return ("string" == typeof k ? c : a).encrypt(e, b, k, d) }, decrypt: function (b, k, d) { return ("string" == typeof k ? c : a).decrypt(e, b, k, d) } } }
  }); d.StreamCipher = v.extend({ _doFinalize: function () { return this._process(!0) }, blockSize: 1 }); var b = p.mode = {}, x = function (e, a, b) {
    var c = this._iv; c ? this._iv = u : c = this._prevBlock; for (var d = 0; d < b; d++)e[a + d] ^=
      c[d]
  }, q = (d.BlockCipherMode = l.extend({ createEncryptor: function (e, a) { return this.Encryptor.create(e, a) }, createDecryptor: function (e, a) { return this.Decryptor.create(e, a) }, init: function (e, a) { this._cipher = e; this._iv = a } })).extend(); q.Encryptor = q.extend({ processBlock: function (e, a) { var b = this._cipher, c = b.blockSize; x.call(this, e, a, c); b.encryptBlock(e, a); this._prevBlock = e.slice(a, a + c) } }); q.Decryptor = q.extend({
    processBlock: function (e, a) {
      var b = this._cipher, c = b.blockSize, d = e.slice(a, a + c); b.decryptBlock(e, a); x.call(this,
        e, a, c); this._prevBlock = d
    }
  }); b = b.CBC = q; q = (p.pad = {}).Pkcs7 = { pad: function (a, b) { for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4)l.push(d); c = s.create(l, c); a.concat(c) }, unpad: function (a) { a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255 } }; d.BlockCipher = v.extend({
    cfg: v.cfg.extend({ mode: b, padding: q }), reset: function () {
      v.reset.call(this); var a = this.cfg, b = a.iv, a = a.mode; if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor; else c = a.createDecryptor, this._minBufferSize = 1; this._mode = c.call(a,
        this, b && b.words)
    }, _doProcessBlock: function (a, b) { this._mode.processBlock(a, b) }, _doFinalize: function () { var a = this.cfg.padding; if (this._xformMode == this._ENC_XFORM_MODE) { a.pad(this._data, this.blockSize); var b = this._process(!0) } else b = this._process(!0), a.unpad(b); return b }, blockSize: 4
  }); var n = d.CipherParams = l.extend({ init: function (a) { this.mixIn(a) }, toString: function (a) { return (a || this.formatter).stringify(this) } }), b = (p.format = {}).OpenSSL = {
    stringify: function (a) {
      var b = a.ciphertext; a = a.salt; return (a ? s.create([1398893684,
        1701076831]).concat(a).concat(b) : b).toString(r)
    }, parse: function (a) { a = r.parse(a); var b = a.words; if (1398893684 == b[0] && 1701076831 == b[1]) { var c = s.create(b.slice(2, 4)); b.splice(0, 4); a.sigBytes -= 16 } return n.create({ ciphertext: a, salt: c }) }
  }, a = d.SerializableCipher = l.extend({
    cfg: l.extend({ format: b }), encrypt: function (a, b, c, d) { d = this.cfg.extend(d); var l = a.createEncryptor(c, d); b = l.finalize(b); l = l.cfg; return n.create({ ciphertext: b, key: c, iv: l.iv, algorithm: a, mode: l.mode, padding: l.padding, blockSize: a.blockSize, formatter: d.format }) },
    decrypt: function (a, b, c, d) { d = this.cfg.extend(d); b = this._parse(b, d.format); return a.createDecryptor(c, d).finalize(b.ciphertext) }, _parse: function (a, b) { return "string" == typeof a ? b.parse(a, this) : a }
  }), p = (p.kdf = {}).OpenSSL = { execute: function (a, b, c, d) { d || (d = s.random(8)); a = w.create({ keySize: b + c }).compute(a, d); c = s.create(a.words.slice(b), 4 * c); a.sigBytes = 4 * b; return n.create({ key: a, iv: c, salt: d }) } }, c = d.PasswordBasedCipher = a.extend({
    cfg: a.cfg.extend({ kdf: p }), encrypt: function (b, c, d, l) {
      l = this.cfg.extend(l); d = l.kdf.execute(d,
        b.keySize, b.ivSize); l.iv = d.iv; b = a.encrypt.call(this, b, c, d.key, l); b.mixIn(d); return b
    }, decrypt: function (b, c, d, l) { l = this.cfg.extend(l); c = this._parse(c, l.format); d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt); l.iv = d.iv; return a.decrypt.call(this, b, c, d.key, l) }
  })
}();
(function () {
  for (var u = CryptoJS, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++)a[c] = 128 > c ? c << 1 : c << 1 ^ 283; for (var e = 0, j = 0, c = 0; 256 > c; c++) { var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4, k = k >>> 8 ^ k & 255 ^ 99; l[e] = k; s[k] = e; var z = a[e], F = a[z], G = a[F], y = 257 * a[k] ^ 16843008 * k; t[e] = y << 24 | y >>> 8; r[e] = y << 16 | y >>> 16; w[e] = y << 8 | y >>> 24; v[e] = y; y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e; b[k] = y << 24 | y >>> 8; x[k] = y << 16 | y >>> 16; q[k] = y << 8 | y >>> 24; n[k] = y; e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1 } var H = [0, 1, 2, 4, 8,
    16, 32, 64, 128, 27, 54], d = d.AES = p.extend({
      _doReset: function () {
        for (var a = this._key, c = a.words, d = a.sigBytes / 4, a = 4 * ((this._nRounds = d + 6) + 1), e = this._keySchedule = [], j = 0; j < a; j++)if (j < d) e[j] = c[j]; else { var k = e[j - 1]; j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255]) : (k = k << 8 | k >>> 24, k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255], k ^= H[j / d | 0] << 24); e[j] = e[j - d] ^ k } c = this._invKeySchedule = []; for (d = 0; d < a; d++)j = a - d, k = d % 4 ? e[j] : e[j - 4], c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>>
          8 & 255]] ^ n[l[k & 255]]
      }, encryptBlock: function (a, b) { this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l) }, decryptBlock: function (a, c) { var d = a[c + 1]; a[c + 1] = a[c + 3]; a[c + 3] = d; this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s); d = a[c + 1]; a[c + 1] = a[c + 3]; a[c + 3] = d }, _doCryptBlock: function (a, b, c, d, e, j, l, f) {
        for (var m = this._nRounds, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++)var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[n & 255] ^ c[p++], s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[g & 255] ^ c[p++], t =
          d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[h & 255] ^ c[p++], n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[k & 255] ^ c[p++], g = q, h = s, k = t; q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[n & 255]) ^ c[p++]; s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[g & 255]) ^ c[p++]; t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[h & 255]) ^ c[p++]; n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[k & 255]) ^ c[p++]; a[b] = q; a[b + 1] = s; a[b + 2] = t; a[b + 3] = n
      }, keySize: 8
    }); u.AES = p._createHelper(d)
})();

module.exports = CryptoJS;
},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("./AppConfig");
var HttpUnit_1 = require("./Net/HttpUnit");
var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
var ViewMgr_1 = require("./Mgr/ViewMgr");
var OPPOAPI = /** @class */ (function () {
    function OPPOAPI() {
    }
    Object.defineProperty(OPPOAPI, "BannerInstance", {
        get: function () {
            return this._banner;
        },
        enumerable: true,
        configurable: true
    });
    OPPOAPI.Login = function (onSuccess, onFail) {
        if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].login({
                success: function (res) {
                    var token = res.data.token;
                    onSuccess(token);
                    console.log("OPPO 登陆成功,获取到 token : " + token);
                    for (var key in res) {
                        console.log(key, res[key]);
                    }
                },
                fail: function (res) {
                    console.log("OPPO 登陆失败", res);
                    for (var key in res) {
                        console.log(key, res[key]);
                    }
                }
            });
        }
    };
    OPPOAPI.initAdService = function (onSuccess, onFail, onComplete) {
        Laya.Browser.window["qg"].initAdService({
            appId: AppConfig_1.default.AppID,
            isDebug: false,
            success: function (res) {
                console.log("oppo initAdService success");
                if (onSuccess) {
                    onSuccess(res);
                }
            },
            fail: function (res) {
                console.log("oppo initAdService fail: ", res.code, res.msg);
                if (onFail) {
                    onFail(res);
                }
            },
            complete: function (res) {
                console.log("oppo initAdService complete");
                if (onComplete) {
                    onComplete(res);
                }
            }
        });
    };
    OPPOAPI.showRewardedVideoAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQGMiniGame) {
            var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: OPPOAPI.adUnitId,
            });
            videoAd.onLoad(function () {
                console.log("oppo 视频广告加载完成");
                videoAd.show();
            });
            videoAd.onVideoStart(function () {
                console.log("oppo 视频广告开始播放");
            });
            videoAd.onClose(function (res) {
                if (res.isEnded) {
                    console.log("oppo 视频广告观看 完成");
                    onAdClose(true);
                }
                else {
                    console.log("oppo 视频广告观看 未完成");
                    onAdClose(false);
                }
                videoAd.destroy();
            });
            videoAd.onError(function (err) {
                console.log("oppo 视频广告获取失败", err);
                videoAd.destroy();
                onFailed();
            });
            videoAd.load();
        }
        else {
            onAdClose(true);
        }
    };
    OPPOAPI.navigateToMiniProgram = function (pkgName, gameName, path, onSuccess, onFail, onComplate) {
        if (Laya.Browser.onQGMiniGame) {
            console.log("OPPO 跳转游戏： " + pkgName);
            HttpUnit_1.default.reportExport(pkgName, gameName, function (result) {
                if (1 == result.code) {
                    console.log("OPPO 导出上报成功");
                }
                else {
                    console.log("OPPO 导出上报失败", result.msg);
                }
            }, function (result) {
                console.log("OPPO 导出上报失败");
                for (var key in result) {
                    console.log(key, result[key]);
                }
            });
            var time = Date.now();
            while (Date.now() - time <= 500) {
            }
            Laya.Browser.window["qg"].navigateToMiniGame({
                pkgName: pkgName,
                path: path,
                extraData: {
                    from: AppConfig_1.default.AppID
                },
                envVersion: 'release',
                success: function (res) {
                    if (onSuccess) {
                        onSuccess(res);
                    }
                },
                fail: function (res) {
                    if (onFail) {
                        onFail(res);
                    }
                },
            });
        }
    };
    OPPOAPI.showInterstitialAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQGMiniGame) {
            var insertAd = qg.createInsertAd({
                posId: OPPOAPI.InsAdUnitId
            });
            insertAd.load();
            insertAd.onLoad(function () {
                console.log("插屏广告加载完成");
                insertAd.show();
            });
            insertAd.onShow(function () {
                console.log("插屏广告显示成功");
            });
            insertAd.onError(function (err) {
                console.log("插屏广告拉取失败", err);
                insertAd.destroy();
                if (onFailed) {
                    onFailed();
                }
            });
        }
        else {
            onAdClose();
        }
    };
    OPPOAPI.showBannaer = function () {
        if (OPPOAPI._banner) {
            OPPOAPI._banner.show();
            return;
        }
        var bannerAd = qg.createBannerAd({
            posId: OPPOAPI.bannerAdUnitId
        });
        bannerAd.show();
        OPPOAPI._banner = bannerAd;
    };
    OPPOAPI.hideBanner = function () {
        if (OPPOAPI._banner) {
            OPPOAPI._banner.hide();
        }
    };
    OPPOAPI.destroyBanner = function () {
        if (OPPOAPI._banner) {
            OPPOAPI._banner.destroy();
        }
        OPPOAPI._banner = null;
    };
    OPPOAPI.getLaunchOptionsSync = function () {
        var obj = { query: "", referrerInfo: { package: "", extraData: { appid: "" } } };
        if (Laya.Browser.onQGMiniGame) {
            var options = Laya.Browser.window["qg"].getLaunchOptionsSync();
            if (null != options && options != "") {
                obj = options;
            }
            else {
                console.log("没有启动设置！！！");
            }
            return obj;
        }
        return obj;
    };
    OPPOAPI.share = function (complate, titel, imageUrl) {
        complate(false);
    };
    OPPOAPI.createDesktopIcon = function (onSuccess, onFail) {
        if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].hasShortcutInstalled({
                success: function (res) {
                    if (res == false) {
                        Laya.Browser.window["qg"].installShortcut({
                            success: function () {
                                if (onSuccess) {
                                    onSuccess();
                                }
                            },
                            fail: function (err) {
                                if (onFail) {
                                    onFail();
                                }
                                console.log("创建桌面图标失败！！！！", err);
                                for (var key in err) {
                                    console.log(key, err);
                                }
                            },
                            complete: function () {
                            }
                        });
                    }
                    else {
                        console.log("桌面图标已存在！！！！");
                        if (onFail) {
                            onFail();
                        }
                    }
                },
                fail: function (err) {
                    if (onFail) {
                        onFail();
                    }
                    console.log("判断桌面图标是否存在失败！！！", err);
                    for (var key in err) {
                        console.log(key, err);
                    }
                },
                complete: function () {
                }
            });
        }
        else {
            if (onFail) {
                onFail();
            }
        }
    };
    //根据配置的概率自动弹出创建图标确认框
    OPPOAPI.autoPopCreateDestopIcon = function (onSuccess, onFail) {
        if (!Laya.Browser.onQGMiniGame) {
            if (null != onFail) {
                onFail();
            }
            return;
        }
        var rate = Math.floor(Math.random() * 100);
        if (rate <= AppSwitchConfig_1.default.getInstance().getAppSwitchData().oppocfg.addToDesktop) {
            OPPOAPI.createDesktopIcon(onSuccess, onFail);
        }
        else {
            if (null != onFail) {
                onFail();
            }
        }
    };
    //显示OPPO原生界面
    OPPOAPI.showNativeAd = function (onSuccess, onFail) {
        if (!Laya.Browser.onQGMiniGame) {
            if (null != onFail) {
                onFail();
            }
            return;
        }
        if (1 == AppSwitchConfig_1.default.getInstance().getAppSwitchData().oppocfg.yuanshengSwitch) {
            ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.OPPONativeView, null, function (v) {
                if (null != onSuccess) {
                    onSuccess(v);
                }
            });
        }
        else {
            if (null != onFail) {
                onFail();
            }
        }
    };
    OPPOAPI.adUnitId = "";
    OPPOAPI.bannerAdUnitId = "";
    OPPOAPI.InsAdUnitId = "";
    OPPOAPI.OpenScreenAdUnitId = "";
    OPPOAPI.NativeAdId = "";
    OPPOAPI._banner = null;
    return OPPOAPI;
}());
exports.default = OPPOAPI;
},{"./AppConfig":2,"./Config/AppSwitchConfig":4,"./Mgr/ViewMgr":21,"./Net/HttpUnit":26}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Util/Utils");
var ActionState;
(function (ActionState) {
    ActionState[ActionState["None"] = 0] = "None";
    ActionState[ActionState["Acting"] = 1] = "Acting";
})(ActionState || (ActionState = {}));
;
var ButtonActionTip = /** @class */ (function (_super) {
    __extends(ButtonActionTip, _super);
    function ButtonActionTip() {
        var _this = _super.call(this) || this;
        _this.srcScale = new Laya.Vector2();
        _this.actionTime = 100;
        _this.state = ActionState.None;
        return _this;
    }
    ButtonActionTip.prototype.onAwake = function () {
        this.sp = this.owner;
        this.srcScale.x = this.sp.scaleX;
        this.srcScale.y = this.sp.scaleY;
        // console.log("onAwake ButtonActionTIp", this.sp);
    };
    ButtonActionTip.prototype.onUpdate = function () {
        var _this = this;
        if (this.sp.visible) {
            if (this.state == ActionState.None) {
                this.state = ActionState.Acting;
                Laya.timer.clearAll(this);
                Laya.timer.loop(Utils_1.default.getInstance().randomRange(2, 4) * 1000, this, function () {
                    _this._tweenAction(4);
                });
            }
        }
        else {
            if (this.state == ActionState.Acting) {
                Laya.timer.clearAll(this);
            }
            this.state = ActionState.None;
        }
    };
    ButtonActionTip.prototype._tweenAction = function (times) {
        var _this = this;
        times--;
        if (times < 0) {
            Laya.Tween.to(this.sp, { scaleX: this.srcScale.x, scaleY: this.srcScale.y }, this.actionTime);
            return;
        }
        var action = function () {
            _this._tweenAction(times);
        };
        Laya.Tween.to(this.sp, {
            scaleX: Utils_1.default.getInstance().floatRandomRange(0.9, 1.2),
            scaleY: Utils_1.default.getInstance().floatRandomRange(0.9, 1.2),
        }, this.actionTime, null, Laya.Handler.create(this, action));
    };
    return ButtonActionTip;
}(Laya.Script));
exports.default = ButtonActionTip;
},{"../Util/Utils":44}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HorizontalLayout = /** @class */ (function (_super) {
    __extends(HorizontalLayout, _super);
    function HorizontalLayout() {
        var _this = _super.call(this) || this;
        /** @prop {name:space,tips:"内部子控件间距",type:number}*/
        _this.space = 0;
        _this.lastWidth = 0;
        return _this;
    }
    HorizontalLayout.prototype.onAwake = function () {
        this.compo = this.owner;
        //FontClip和Label有且只能有一个
        this.font = this.owner.getChildByName("FontClip");
        this.label = this.owner.getChildByName("Text");
    };
    HorizontalLayout.prototype.onUpdate = function () {
        var fontWidth = 0;
        if (this.font)
            fontWidth = this.font.width;
        if (this.label)
            fontWidth = this.label.width;
        if (this.lastWidth != fontWidth) {
            var total = 0;
            for (var _i = 0, _a = this.compo._children; _i < _a.length; _i++) {
                var v = _a[_i];
                var t = v;
                total += t.width;
            }
            total += (this.compo.numChildren - 1) * this.space;
            var x = (this.compo.width - total) * 0.5;
            for (var i = 0; i < this.compo.numChildren; i++) {
                var t = this.compo._children[i];
                t.x = x;
                x += t.width + this.space;
            }
            this.lastWidth = fontWidth;
        }
    };
    HorizontalLayout.prototype.setNum = function (num) {
        if (this.font)
            this.font.value = String(num);
        if (this.label)
            this.label.text = String(num);
    };
    return HorizontalLayout;
}(Laya.Script));
exports.default = HorizontalLayout;
},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectState;
(function (ObjectState) {
    ObjectState[ObjectState["None"] = 0] = "None";
    ObjectState[ObjectState["Normal"] = 1] = "Normal";
    ObjectState[ObjectState["PlayingCartoon"] = 2] = "PlayingCartoon";
})(ObjectState = exports.ObjectState || (exports.ObjectState = {}));
var CarState;
(function (CarState) {
    CarState[CarState["None"] = 0] = "None";
    CarState[CarState["Idle"] = 1] = "Idle";
    CarState[CarState["Move"] = 2] = "Move";
    CarState[CarState["MoveAction"] = 3] = "MoveAction";
    CarState[CarState["Collide"] = 4] = "Collide";
    CarState[CarState["CollideAction"] = 5] = "CollideAction";
})(CarState = exports.CarState || (exports.CarState = {}));
},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LevelConfig_1 = require("../../Config/LevelConfig");
var Car_1 = require("./Model/Car");
var GameObject_1 = require("./Model/GameObject");
var RogueLevelConfig_1 = require("../../Config/RogueLevelConfig");
var Plane_1 = require("./Model/Plane");
var Street_1 = require("./Model/Street");
var Constants_1 = require("../Constants");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var RoundTableRandom_1 = require("../Util/RoundTableRandom");
var Position = /** @class */ (function () {
    function Position(start) {
        this.cur = start.clone();
        this.start = start.clone();
    }
    Position.prototype.setY = function (y) {
        this.cur.y = y;
    };
    Position.prototype.setXZ = function (x, z) {
        this.cur.x = x;
        this.cur.z = z;
    };
    Position.prototype.addXZ = function (offsetX, offsetZ) {
        this.cur.x += offsetX;
        this.cur.z += offsetZ;
    };
    Position.prototype.addSrcXZ = function (offsetX, offsetZ) {
        this.start.x += offsetX;
        this.start.z += offsetZ;
    };
    Position.prototype.setXY = function (x, z) {
        this.cur.x = x;
        this.cur.y = z;
    };
    Position.prototype.addXY = function (offsetX, offsetZ) {
        this.cur.x += offsetX;
        this.cur.y += offsetZ;
    };
    Position.prototype.addSrcXY = function (offsetX, offsetZ) {
        this.start.x += offsetX;
        this.start.y += offsetZ;
    };
    return Position;
}());
//关卡逻辑类 负责关卡配置文件解析、关卡提示逻辑等
var LevelLogic = /** @class */ (function () {
    function LevelLogic(ctrl) {
        this.carNum = 0;
        this.cars = [];
        this.rand = new RoundTableRandom_1.default();
        this.defaultSize = new Laya.Size(5, 5);
        this.objs = [];
        this.levelLayouts = [];
        this.ctrl = ctrl;
    }
    LevelLogic.prototype.createLevel = function (level) {
        var isRogue = false;
        var rogueConfig = RogueLevelConfig_1.RogueLevelConfig.getInstance();
        var levelConfig = LevelConfig_1.LevelConfig.getInstance();
        var data = null;
        if (level == 1)
            this.ctrl.isGuide = true;
        else
            this.ctrl.isGuide = false;
        // this.cars = [];
        // for (var i = 0; i < rogueConfig.getDataLength(); i++) {
        //     data = rogueConfig.getData(i);
        //     if (level >= data.level.min && level <= data.level.max) {
        //         isRogue = true;
        //         break;
        //     }
        // }
        var minLevel = levelConfig.getDataLength();
        if (level > minLevel) {
            level = this.randomRange(2, LevelConfig_1.LevelConfig.getInstance().getDataLength());
        }
        this.clearCars();
        this.clearObjs();
        console.log("第", level, "关");
        if (isRogue)
            this.createRogueLevel(data);
        else
            this.createLevelWithConfig(LevelConfig_1.LevelConfig.getInstance().getData(level - 1));
    };
    //创建随机关卡
    LevelLogic.prototype.createRogueLevel = function (config) {
        var ctrl = this.ctrl;
        var rand = this.rand;
        var w = this.randomRange(config.map.w, config.map.max_w);
        var h = this.randomRange(config.map.h, config.map.max_h);
        var length = w * h;
        var levelStartPos = new Laya.Vector3(w * 0.5, 0, h * 0.5);
        rand.set("car", config.car);
        // ctrl.camera.addHeight(0);
        if (w > 12)
            ctrl.camera.addHeight(8);
        else
            ctrl.camera.resetPos();
        var planePos = new Position(levelStartPos);
        planePos.addXZ(-0.5, -0.5);
        var carPos = new Position(levelStartPos);
        carPos.setY(1);
        // console.log("random map size:", w, h);
        var layouts = [];
        var cnt = 0;
        for (var i = 0; i < length; i++) {
            layouts.push(1);
        }
        for (var i = 0; i < h; i++) {
            for (var j = 0; j < w; j++) {
                carPos.setXZ(carPos.start.x - j * 1, carPos.start.z - i * 1);
                if (rand.randomCheck(config.carAppear)) {
                    var carType = rand.getRandomIndex("car");
                    var direction = Math.round(Math.random());
                    var prop = new Car_1.default().getCarProp(carType);
                    if (this.canCreateCar(layouts, cnt, w, prop, direction)) {
                        var car = this.createCar(carType, direction, carPos);
                        this.resetLayouts(car, layouts, cnt, w, h, car.val);
                    }
                }
                planePos.setXZ(planePos.start.x - j * 1, planePos.start.z - i * 1);
                this.createUnit("plane", planePos.cur);
                cnt++;
            }
        }
    };
    //根据配置数据创建关卡
    LevelLogic.prototype.createLevelWithConfig = function (config) {
        var ctrl = this.ctrl;
        var w = config.map.w;
        var h = config.map.h;
        var levelStartPos = new Laya.Vector3(0, 0, 0);
        var space = 0;
        var plane = this.ctrl.getStreet("plane").getComponent(Plane_1.default);
        var carStartPos = plane.getAnchor().clone();
        carStartPos.z += h;
        var carPos = new Position(carStartPos);
        // carPos.addSrcXZ(0, -0.5);
        plane.setScale(w, h);
        plane.setPosWithAnchor(w, h);
        this.mapSize = new Laya.Size(w, h);
        var street1 = this.ctrl.getStreet("street0").getComponent(Street_1.default);
        var street2 = this.ctrl.getStreet("street1").getComponent(Street_1.default);
        var street3 = this.ctrl.getStreet("street2").getComponent(Street_1.default);
        var street4 = this.ctrl.getStreet("street3").getComponent(Street_1.default);
        var street5 = this.ctrl.getStreet("street4").getComponent(Street_1.default);
        street1.setScale(w);
        street1.setPosByAnchor(plane.getAnchor(), -w * 0.5, h);
        street2.setPosByAnchor(plane.getAnchor(), -w - street2.defaultSize.width * 0.5, h + street2.defaultSize.height * 0.5 + 0.06);
        street3.setScale(h);
        street3.setPosByAnchor(plane.getAnchor(), -w + 0.05, h * 0.5);
        street4.setPosByAnchor(plane.getAnchor(), -w - street4.defaultSize.width * 0.5, -street4.defaultSize.height * 0.5 + 0.06);
        street5.setScale(w);
        street5.setPosByAnchor(plane.getAnchor(), -w * 0.5, -street5.defaultSize.height);
        // console.log("street1", street1.sprite.transform.position);
        this.createLine(plane.getAnchor(), street1, w, h, 90);
        this.createLine(plane.getAnchor(), street3, w, h, 0);
        this.createLine(plane.getAnchor(), street5, w, h, 90);
        // this.createMapLine(plane.getAnchor(), w, h);
        var layouts = config.layout.slice(0);
        this.levelLayouts = config.layout.slice(0);
        for (var i = 0; i < layouts.length; i++) {
            var value = layouts[i];
            var line = i % w;
            var row = Math.floor(i / w);
            if (value === 1) {
                continue;
            }
            carPos.setXZ(carPos.start.x - line * (1 + space), carPos.start.z - row * (1 + space));
            if (this.isCar(value)) {
                var carType = this.getCarType(value);
                var direction = value % 10;
                var car = this.createCar(carType, direction, carPos);
                car.startInLayout = i;
                this.resetLayouts(car, layouts, i, w, h);
            }
            else if (this.isWall(value)) {
                this.createWallRepeat(layouts, carPos.cur, i, line, row, w, h);
            }
            else if (this.isBarrier(value)) {
                carPos.addXZ(-0.5, -0.5);
                this.createRandomBarrier(carPos.cur);
            }
        }
        this.carNum = this.cars.length;
        console.log("createMap", w, h);
        this.adjustScenePosition(w, h);
        // this.adjustScenePosition(w, h);
        // this.gameTip();
    };
    LevelLogic.prototype.createMapLine = function (anchor, w, h) {
        var num = Math.floor((w + 1) / 3);
        var inter = Math.floor(w / num);
        var x = anchor.x - inter + 0.4;
        var length = h;
        for (var i = 0; i < num; i++) {
            var line = this.ctrl.createLine();
            line.transform.localRotationEulerY = 90;
            line.transform.localScaleX = length;
            line.transform.localPositionY += 0.1;
            line.transform.localPositionX = x - i * inter;
            line.transform.localPositionZ = anchor.z + length * 0.5;
            this.objs.push(line);
        }
    };
    LevelLogic.prototype.createLine = function (anchor, street, w, h, angle) {
        var num = Math.round(w / 2);
        for (var i = 0; i < num; i++) {
            var line = this.ctrl.createLine();
            if (angle == 90) {
                line.transform.localPositionX = anchor.x - i * 2 - 0.5;
                line.transform.localPositionZ = street.sprite.transform.localPositionZ + street.h + 0.5;
            }
            else {
                line.transform.localRotationEulerY = 90;
                line.transform.localPositionX = street.sprite.transform.localPositionX - street.w - 0.5;
                line.transform.localPositionZ = anchor.z + i * 2 + 0.5;
            }
            this.objs.push(line);
        }
    };
    //检测连续创建墙
    LevelLogic.prototype.createWallRepeat = function (layouts, pos, index, line, row, w, h) {
        var repeatDirection = 0;
        var firstPos = pos.clone();
        var isRepeat = false;
        pos.z -= 0.5;
        pos.x -= 0.5;
        if (line != w - 1) { //下标在横向末尾的时候不进行连续读取
            for (var i = 0; i < w - line; i++) {
                if (i > 0) {
                    var j = i + index;
                    if (this.isWall(layouts[j])) {
                        pos.x -= 1;
                        this.createUnit("wall", pos, 0);
                        layouts[j] = 1;
                        isRepeat = true;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        if (!isRepeat) {
            for (var i = 0; i < h - row; i++) {
                if (i > 0) {
                    var j = w * i + index;
                    if (this.isWall(layouts[j])) {
                        pos.z -= 1;
                        this.createUnit("wall", pos, 1);
                        layouts[j] = 1;
                        repeatDirection = 1;
                        isRepeat = true;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        layouts[index] = 1;
        firstPos.x -= 0.5;
        firstPos.z -= 0.5;
        if (!isRepeat) {
            var l = index % w;
            if (l == 0 || l == w - 1)
                repeatDirection = 1;
        }
        this.createUnit("wall", firstPos, repeatDirection);
    };
    LevelLogic.prototype.createRandomBarrier = function (pos) {
        var obj = this.ctrl.createRandomBarrier();
        var s = obj.getComponent(GameObject_1.default);
        s.setLevelCtrl(this, this.ctrl);
        pos.y = obj.transform.localPositionY + 0.1;
        obj.transform.localPosition = pos;
        this.objs.push(obj);
        return s;
    };
    LevelLogic.prototype.createUnit = function (name, pos, direction) {
        if (direction === void 0) { direction = null; }
        var obj = this.ctrl.createBarrier(name);
        var s = obj.getComponent(GameObject_1.default);
        s.setLevelCtrl(this, this.ctrl);
        pos.y = obj.transform.localPositionY + 0.1;
        obj.transform.localPosition = pos;
        this.objs.push(obj);
        if (direction != null) {
            if (direction == 1) {
                obj.transform.rotationEuler = new Laya.Vector3(0, 90, 0);
            }
            else {
                obj.transform.rotationEuler = new Laya.Vector3(0, 0, 0);
            }
        }
        return s;
    };
    LevelLogic.prototype.createCar = function (carType, direction, pos) {
        var car = this.ctrl.createCar("car0", carType);
        var s = car.getComponent(Car_1.default);
        s.setLevelCtrl(this, this.ctrl);
        s.init(carType, direction, this.cars.length);
        // var material = (s.sprite as Laya.MeshSprite3D).meshRenderer.material as (Laya.BlinnPhongMaterial);
        // var offset = this.cars.length + 1;
        // material.albedoColorB *= Math.pow(0.8, offset);
        // material.albedoColorG *= Math.pow(0.8, offset);
        // material.albedoColorR *= Math.pow(0.8, offset);
        if (direction == 1) {
            pos.addXZ(-s.w * 0.5, -s.h * 0.5);
        }
        else {
            pos.addXZ(-s.h * 0.5, -s.w * 0.5);
        }
        pos.cur.y = car.transform.localPositionY + 0.2;
        car.transform.localPosition = pos.cur;
        s.setLastPos(pos.cur);
        s.setLastIdlePos(pos.cur);
        this.cars.push(s);
        // console.log("car", this.cars.length, pos.cur);
        return s;
    };
    //创建汽车后将汽车在数组中的值重置，防止重复检测
    LevelLogic.prototype.resetLayouts = function (car, layouts, index, w, h, specifyVal) {
        if (specifyVal === void 0) { specifyVal = null; }
        var offset = 0;
        var val = specifyVal == null ? 1 : specifyVal;
        if (car.getDirection() == 1) {
            for (var k = 0; k < car.h; k++) {
                for (var n = 0; n < car.w; n++) {
                    layouts[n + index + offset] = val;
                }
                offset += w;
            }
        }
        else {
            for (var k = 0; k < car.w; k++) {
                for (var n = 0; n < car.h; n++) {
                    layouts[n + index + offset] = val;
                }
                offset += w;
            }
        }
    };
    //判断是否是车
    LevelLogic.prototype.isCar = function (value) {
        value = Math.floor(value / 10);
        return (value === 2 || value === 3 || value === 4);
    };
    //判断是否是外墙
    LevelLogic.prototype.isWall = function (value) {
        return (value === 5);
    };
    //判断是否是障碍物
    LevelLogic.prototype.isBarrier = function (value) {
        return (value === 6);
    };
    //获取汽车类型
    LevelLogic.prototype.getCarType = function (value) {
        value = Math.floor(value / 10);
        if (value === 2)
            return 0;
        else if (value === 3)
            return 1;
        else if (value === 4)
            return 2;
        return 0;
    };
    LevelLogic.prototype.randomRange = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    LevelLogic.prototype.canCreateCar = function (layouts, index, w, prop, direction) {
        var offsetRow = prop.w;
        var offsetLine = prop.h;
        if (direction === 0) {
            offsetRow = prop.h;
            offsetLine = prop.w;
        }
        if ((index + offsetRow) % w > index % w
            && index < layouts.length - w * 2
            && layouts[index] == 1
            && layouts[index + offsetRow] == 1
            && layouts[index + w * offsetLine] == 1
            && layouts[index + offsetRow + w * offsetLine] == 1)
            return true;
        return false;
    };
    LevelLogic.prototype.getCarNum = function () {
        return this.carNum;
    };
    LevelLogic.prototype.subCarNum = function () {
        this.carNum -= 1;
    };
    LevelLogic.prototype.isOver = function () {
        return (this.carNum === 0);
    };
    LevelLogic.prototype.clearObjs = function () {
        for (var k in this.objs) {
            this.objs[k].destroy();
        }
        this.objs = [];
    };
    LevelLogic.prototype.clearCars = function () {
        for (var k in this.cars) {
            var car = this.cars[k];
            Laya.Tween.clearAll(car.sprite);
            this.cars[k].setState(Constants_1.CarState.None);
            this.cars[k].sprite.destroy();
        }
        this.cars = [];
    };
    LevelLogic.prototype.deleteCar = function (index) {
        for (var i = 0; i < this.cars.length; i++) {
            var car = this.cars[i];
            if (car.index == index) {
                this.cars.splice(i, 1);
                break;
            }
        }
    };
    LevelLogic.prototype.adjustScenePosition = function (w, h) {
        var offsetW = w - this.defaultSize.width;
        var offsetH = h - this.defaultSize.height;
        var x = 0;
        var z = 0;
        if (w >= 8) {
            x = -offsetW - 1;
        }
        if (h >= 3) {
            z = -offsetH;
        }
        console.log("offsetW", offsetW, offsetH);
        var plane = this.ctrl.getStreet("plane").getComponent(Plane_1.default);
        // plane.setAnchorOffset(0, z);
        this.ctrl.setParkSceneOffset(0, z);
        var longer = w;
        // if (h > w)
        //     longer = h;
        var field = longer + 10;
        var maxY = -5;
        var maxZ = 15;
        var offsetX = 0;
        var offsetZ = maxZ / 11 * offsetW;
        var offsetY = 0;
        var _abs = w - h;
        if (Math.abs(_abs) > 1) {
            offsetX = _abs * 0.4;
        }
        if (h > 10) {
            offsetY = -5 / 5 * (h - 11);
        }
        // if (h > w)
        //     offsetY += h - w + 3;
        console.log("setCameraProps", offsetX, offsetY, offsetZ);
        this.ctrl.setCameraProps(field, offsetX, offsetY, offsetZ);
        // var spPlane = this.ctrl.getStreet("plane") as Laya.Sprite3D;
        // var out = new Laya.Vector3(0, 180, 0);
        // var position = spPlane.transform.localPosition.clone();
        // this.ctrl.camera.camera.transform.getUp(out);
        // position.x += 0.5;
        // this.ctrl.camera.camera.transform.lookAt(position, out, true);
    };
    LevelLogic.prototype.checkCarOnRoad = function () {
        for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
            var car = _a[_i];
            if (car.getState() == Constants_1.CarState.MoveAction)
                return true;
        }
        return false;
    };
    LevelLogic.prototype.gameTip = function () {
        var canTip = true;
        for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
            var car = _a[_i];
            if (car.getState() != Constants_1.CarState.Idle) {
                canTip = false;
                break;
            }
        }
        if (this.cars.length == 0)
            canTip = false;
        if (canTip)
            EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_Tip);
    };
    LevelLogic.prototype.setLevelLayouts = function (car, lastStart) {
        this.resetLayouts(car, this.levelLayouts, lastStart, this.mapSize.width, this.mapSize.height);
        this.resetLayouts(car, this.levelLayouts, car.startInLayout, this.mapSize.width, this.mapSize.height, car.val);
    };
    LevelLogic.prototype.clearCarInLayouts = function (car, start) {
        this.resetLayouts(car, this.levelLayouts, start, this.mapSize.width, this.mapSize.height);
    };
    LevelLogic.prototype.getLevelLayouts = function () {
        return this.levelLayouts;
    };
    LevelLogic.prototype.getCars = function () {
        return this.cars;
    };
    LevelLogic.prototype.getMapSize = function () {
        return this.mapSize;
    };
    return LevelLogic;
}());
exports.default = LevelLogic;
},{"../../Config/LevelConfig":5,"../../Config/RogueLevelConfig":6,"../../Event/EventDef":7,"../../Event/EventMgr":8,"../Constants":32,"../Util/RoundTableRandom":43,"./Model/Car":35,"./Model/GameObject":36,"./Model/Plane":37,"./Model/Street":38}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Camera = /** @class */ (function (_super) {
    __extends(Camera, _super);
    function Camera() {
        return _super.call(this) || this;
    }
    Camera.prototype.onAwake = function () {
        this.camera = this.owner;
        this.srcPos = this.camera.transform.position.clone();
    };
    Camera.prototype.onEnable = function () {
    };
    Camera.prototype.onDisable = function () {
    };
    Camera.prototype.resetPos = function () {
        this.camera.transform.position = this.srcPos.clone();
    };
    //设置高度偏移量
    Camera.prototype.addHeight = function (value) {
        var pos = new Laya.Vector3(0, value, 0);
        this.camera.transform.translate(pos, false);
    };
    //设置高度
    Camera.prototype.setHeight = function (value) {
        this.camera.transform.position.y = value;
    };
    return Camera;
}(Laya.Script3D));
exports.default = Camera;
},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = require("./GameObject");
var Constants_1 = require("../../Constants");
var EventMgr_1 = require("../../../Event/EventMgr");
var EventDef_1 = require("../../../Event/EventDef");
var SoundMgr_1 = require("../../../Mgr/SoundMgr");
var Animator_1 = require("../../Util/Animator");
var VibrateMgr_1 = require("../../../Mgr/VibrateMgr");
var CarType = /** @class */ (function () {
    function CarType() {
    }
    return CarType;
}());
exports.CarType = CarType;
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this) || this;
        _this.tipDirection = -1;
        _this.carTypes = [
            { "w": 2, "h": 3, val: 20 },
            { "w": 2, "h": 4, val: 30 },
            { "w": 2, "h": 5, val: 40 },
        ];
        _this._touchPoint = new Laya.Point(0, 0);
        _this._direction = 0;
        _this.vector = new Laya.Vector3(0, 0, 0);
        _this.speed = 0.2;
        //标记是否是当前触摸选中的车辆
        _this._curSelected = false;
        _this.streetsVect = [];
        _this.inCol = false;
        _this.timerIsOn = false;
        _this.dt = 0;
        _this.scaleFactor = 0.9;
        _this.lastIdlePos = new Laya.Vector3(0, 0, 0);
        _this.startRotation = false;
        // private isTweenAct: boolean = false;
        _this.colliding = false;
        _this.collideStay = false;
        _this.turnAngleDelta = 10;
        _this.isFan = false;
        return _this;
    }
    Car.prototype.onAwake = function () {
        this.sprite = this.owner;
        this.sprite.transform.localScaleX = this.scaleFactor;
        this.sprite.transform.localScaleY = this.scaleFactor;
        this.sprite.transform.localScaleZ = this.scaleFactor;
        this.animCtrl = this.owner.addComponent(Animator_1.default);
    };
    Car.prototype.onEnable = function () {
        this.setState(Constants_1.CarState.Idle);
    };
    Car.prototype.onDisable = function () {
    };
    Car.prototype.onUpdate = function () {
        this.dt += 1;
        if (this.getState() == Constants_1.CarState.Move || this.getState() == Constants_1.CarState.MoveAction) {
            var lastState = this.getState();
            if (lastState == Constants_1.CarState.MoveAction && this.dt > 10) {
                SoundMgr_1.default.instance.playSound("car_run");
                this.dt = 0;
            }
            this.move();
        }
        else if (this.getState() == Constants_1.CarState.Collide) {
            //TODO 播放动画
            this.setState(Constants_1.CarState.CollideAction);
            if (!this.timerIsOn) {
                this.timerIsOn = true;
                Laya.timer.once(500, this, function () {
                    this.setState(Constants_1.CarState.Idle);
                    this.timerIsOn = false;
                    this.colliding = false;
                });
            }
        }
    };
    Car.prototype.onMouseDown = function () {
        // if (this.isTweenAct) return;
        if (!this.getGameCtrl().game3dStartFlag)
            return;
        if (this.getState() != Constants_1.CarState.Idle)
            return;
        this._touchPoint.setTo(Laya.stage.mouseX, Laya.stage.mouseY);
        this._curSelected = true;
    };
    Car.prototype.onMouseUp = function () {
        if (!this.getGameCtrl().game3dStartFlag)
            return;
        // console.log("car state", this.getState());
        // if (this.isTweenAct) return;
        if (this.getState() != Constants_1.CarState.Idle)
            return;
        var cur = new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY);
        var vect = new Laya.Vector2(this._touchPoint.x - cur.x, this._touchPoint.y - cur.y);
        var unit = new Laya.Vector2(0, 0);
        if (vect.y == 0 && vect.x == 0)
            return;
        if (this._direction == 1) {
            if (vect.y == 0)
                this.vector.z = 0;
            else
                this.vector.z = vect.y / Math.abs(vect.y);
            if (this.sprite.transform.rotationEuler.y == 180)
                this.vector.z = -this.vector.z;
            // console.log(this.sprite.transform.rotationEuler.y);
        }
        else {
            if (vect.x == 0)
                this.vector.z = 0;
            else
                this.vector.z = vect.x / Math.abs(vect.x);
            if (this.sprite.transform.rotationEuler.y == -90)
                this.vector.z = -this.vector.z;
            // console.log(this.sprite.transform.rotationEuler.y);
        }
        this.setState(Constants_1.CarState.Move);
        // SoundMgr.instance.playBGM("car_run");
        SoundMgr_1.default.instance.playSound("car_shache");
        // this.sprite.transform.localPositionX
        // Laya.Tween.to(this.sprite.transform, {localPositionX: 100}, 500);  
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_HoriBanner_Enable, false);
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_Guide, { visible: false });
        this.colliding = false;
        VibrateMgr_1.default.vibrateShort();
    };
    Car.prototype.onTriggerEnter = function (other) {
        // if (this.isTweenAct) return;
        if (this.colliding)
            return;
        this.colliding = true;
        this.collision(other);
    };
    Car.prototype.onTriggerStay = function (other) {
        if (this.colliding)
            return;
        if (this.collideStay)
            return;
        this.colliding = true;
        this.collision(other);
    };
    Car.prototype.collision = function (other) {
        var _this = this;
        if (this.owner.destroyed)
            return;
        if (this.getState() == Constants_1.CarState.Idle) {
            this.colliding = false;
            this.shakeAct(3);
        }
        if (this.getState() != Constants_1.CarState.Move) {
            if (other.owner.name == "destinaion2") {
                this.getGameCtrl().playEndAction(true);
                Laya.timer.clear(this.getGameCtrl(), this.getGameCtrl().playEndOffCaller);
                Laya.timer.once(1500, this.getGameCtrl(), this.getGameCtrl().playEndOffCaller);
            }
            if (other.owner.name == "destinaion") {
                var ctrl = this.getLevelCtrl();
                //延迟移除，防止再次触发trigger报错
                Laya.timer.once(1500, this, function () {
                    _this.sprite.destroy();
                    _this.destroy();
                });
                ctrl.deleteCar(this.index);
                if (this.startInLayout >= 0)
                    this.getLevelCtrl().clearCarInLayouts(this, this.startInLayout);
                // if (!this.getLevelCtrl().checkCarOnRoad())
                //     SoundMgr.instance.stopBGM();
                VibrateMgr_1.default.vibrateShort();
                SoundMgr_1.default.instance.playSound("car_out");
                ctrl.subCarNum();
                this.getGameCtrl().createParticle();
                if (ctrl.isOver()) {
                    Laya.timer.once(500, this, function () {
                        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_HoriBanner_Enable, true);
                        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnLevelComplate);
                    });
                }
                else {
                    if (this.getGameCtrl().isGuide)
                        this.getLevelCtrl().gameTip();
                }
            }
            return;
        }
        if (this.getState() != Constants_1.CarState.Idle) {
            if (this.sprite.getChildByName("biaoqing_1"))
                this.sprite.removeChildByName("biaoqing_1");
            this.sprite.addChild(this.getGameCtrl().getEmotionSp(this));
            if (other.owner.name.indexOf("car") >= 0) {
                if (other.owner.getChildByName("biaoqing_1"))
                    other.owner.removeChildByName("biaoqing_1");
                other.owner.addChild(this.getGameCtrl().getEmotionSp(other.owner.getComponent(Car)));
            }
        }
        if (this.startRotation)
            return;
        var otherCar = other.owner.getComponent(Car);
        if (otherCar && (otherCar.getState() == Constants_1.CarState.MoveAction || otherCar.getState() == Constants_1.CarState.Move)) {
            SoundMgr_1.default.instance.playSound("laba");
            Laya.timer.once(1000, this, function () {
                _this.colliding = false;
                _this.setState(Constants_1.CarState.Move);
                EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_Guide, { visible: false });
            });
        }
        else {
            VibrateMgr_1.default.vibrateShort();
            SoundMgr_1.default.instance.playSound("collide");
        }
        if (otherCar && otherCar.getState() == Constants_1.CarState.MoveAction) { }
        else if (this.startInLayout >= 0) {
            var mapSize = this.getLevelCtrl().getMapSize();
            var line = this.startInLayout % mapSize.width;
            var row = Math.floor(this.startInLayout / mapSize.width);
            var anchor = this.getGameCtrl().getPlaneAnchor();
            var moveX = anchor.x - line;
            var moveZ = anchor.z - row + mapSize.height;
            if (this._direction == 1) {
                moveX -= this.w * 0.5;
                moveZ -= this.h * 0.5;
            }
            else {
                moveX -= this.h * 0.5;
                moveZ -= this.w * 0.5;
            }
            this.sprite.transform.localPositionX = moveX;
            this.sprite.transform.localPositionZ = moveZ;
        }
        this.setState(Constants_1.CarState.Collide);
    };
    Car.prototype.updateLevelLayout = function () {
        var xDis = Math.round(this.sprite.transform.localPositionX - this.lastIdlePos.x);
        var zDis = Math.round(this.sprite.transform.localPositionZ - this.lastIdlePos.z);
        var lastStart = this.startInLayout;
        var layouts = this.getLevelCtrl().getLevelLayouts();
        var mapSize = this.getLevelCtrl().getMapSize();
        if (Math.abs(xDis) >= 1) {
            this.lastIdlePos.x = this.sprite.transform.localPositionX;
            this.startInLayout -= xDis;
            if (xDis > 0) {
                if (layouts[this.startInLayout] != 1 || layouts[this.startInLayout + mapSize.width] != 1) {
                    this.startInLayout = lastStart;
                }
            }
            else {
                if (layouts[this.startInLayout + (this.h - 1)] != 1 || layouts[this.startInLayout + mapSize.width + (this.h - 1)] != 1) {
                    this.startInLayout = lastStart;
                }
            }
        }
        if (Math.abs(zDis) >= 1) {
            this.lastIdlePos.z = this.sprite.transform.localPositionZ;
            this.startInLayout -= zDis * mapSize.width;
            if (zDis > 0) {
                if (layouts[this.startInLayout] != 1 || layouts[this.startInLayout + 1] != 1) {
                    this.startInLayout = lastStart;
                }
            }
            else {
                if (layouts[this.startInLayout + (this.h - 1) * mapSize.width] != 1 || layouts[this.startInLayout + (this.h - 1) * mapSize.width + 1] != 1) {
                    this.startInLayout = lastStart;
                }
            }
        }
        if (lastStart != this.startInLayout)
            this.getLevelCtrl().setLevelLayouts(this, lastStart);
    };
    Car.prototype.shakeAct = function (time) {
        var _this = this;
        if (!this.inCol) {
            this.inCol = true;
            time -= 1;
            var z = Math.random() * 0.1 + 0.9;
            var x = Math.random() * 0.1 + 0.9;
            var y = Math.random() * 0.1 + 0.9;
            if (time == 0) {
                this.inCol = false;
                z = this.scaleFactor;
                x = this.scaleFactor;
                y = this.scaleFactor;
            }
            // console.log("shakeAct", z);
            var transform = this.sprite.transform;
            if (this.sprite.destroyed)
                return;
            Laya.Tween.to(transform, { localScaleX: x, localScaleY: y, localScaleZ: z }, 50, null, Laya.Handler.create(this, function () {
                if (time > 0) {
                    _this.inCol = false;
                    _this.shakeAct(time);
                }
            }));
        }
    };
    Car.prototype.init = function (_type, direction, index) {
        var cfg = this.carTypes[_type];
        this.w = cfg.w;
        this.h = cfg.h;
        this.val = cfg.val + direction;
        this._type = _type;
        this.index = index;
        this.setDirection(direction);
        var spUp = this.getGameCtrl().getStreet("street0");
        var spDown = this.getGameCtrl().getStreet("street4");
        var spRight = this.getGameCtrl().getStreet("street2");
        var spLeft = this.getGameCtrl().getStreet("street5");
        var posUp = spUp.transform.localPosition.clone();
        var posDown = spDown.transform.localPosition.clone();
        // console.log("car init", posUp);
        this.streetsVect.push(posUp);
        this.streetsVect.push(spRight.transform.localPosition.clone());
        this.streetsVect.push(posDown);
        this.streetsVect.push(spLeft.transform.localPosition.clone());
        this.streetsVect[3].x += 1;
        this.streetsVect[1].x -= 1.5;
        this.streetsVect[0].z += 1.5;
        this.streetsVect[2].z += 1.5;
        console.log("streetsVect z", this.streetsVect[0].z);
        // this.streetsVect[2].x += 1;
        var compo = this.owner.getComponent(Laya.PhysicsComponent);
        compo.ccdMotionThreshold = 0.01;
    };
    Car.prototype.setDirection = function (val) {
        //车方向只分竖向和横向，朝向上的角度随机
        var angles = [];
        if (val == 1) {
            angles = [0, 180];
        }
        else {
            angles = [90, -90];
        }
        this._direction = val;
        this._angle = angles[Math.round(Math.random())];
        this.sprite.transform.rotationEuler = new Laya.Vector3(0, this._angle, 0);
    };
    Car.prototype.getDirection = function () {
        return this._direction;
    };
    Car.prototype.getAngle = function () {
        return this._angle;
    };
    Car.prototype.getCarProp = function (_type) {
        return this.carTypes[_type];
    };
    Car.prototype.getCarType = function () {
        return this._type;
    };
    Car.prototype.move = function () {
        var _this = this;
        this.setLastPos(this.sprite.transform.localPosition);
        var vect = this.vector.clone();
        var pos = this.sprite.transform.localPosition;
        if (pos.x >= this.streetsVect[3].x - 1) {
            this.setState(Constants_1.CarState.MoveAction);
            vect.z *= this.speed;
            if (pos.x > this.streetsVect[3].x)
                pos.x = this.streetsVect[3].x;
            else
                this.sprite.transform.translate(vect, true);
            if (this.sprite.transform.rotationEuler.y <= -90 && this.sprite.transform.rotationEuler.y > -180) {
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y - this.turnAngleDelta, 0);
            }
            else if (this.sprite.transform.rotationEuler.y <= 270 && this.sprite.transform.rotationEuler.y > 180) {
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y - this.turnAngleDelta, 0);
            }
            else if (this.sprite.transform.rotationEuler.y >= 90 && this.sprite.transform.rotationEuler.y < 180) {
                this.isFan = true;
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y + this.turnAngleDelta, 0);
            }
            else {
                if (this.isFan) {
                    Laya.timer.once(50, this, function () {
                        _this.vector.z = -1;
                    });
                }
                else {
                    this.vector.z = -1;
                }
            }
        }
        else if (pos.z <= this.streetsVect[2].z + 1) {
            this.setState(Constants_1.CarState.MoveAction);
            vect.z *= this.speed;
            if (pos.z < this.streetsVect[2].z)
                pos.z = this.streetsVect[2].z;
            else
                this.sprite.transform.translate(vect, true);
            if (this.sprite.transform.rotationEuler.y <= 0 && this.sprite.transform.rotationEuler.y > -90) {
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y - this.turnAngleDelta, 0);
            }
            else if (this.sprite.transform.rotationEuler.y >= 180 && this.sprite.transform.rotationEuler.y < 270) {
                this.isFan = true;
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y + this.turnAngleDelta, 0);
            }
            else {
                if (this.isFan) {
                    Laya.timer.once(50, this, function () {
                        _this.vector.z = -1;
                    });
                }
                else {
                    this.vector.z = -1;
                }
            }
        }
        else if (pos.x <= this.streetsVect[1].x + 1) {
            this.setState(Constants_1.CarState.MoveAction);
            vect.z *= this.speed;
            if (pos.x < this.streetsVect[1].x)
                pos.x = this.streetsVect[1].x;
            else
                this.sprite.transform.translate(vect, true);
            if (this.sprite.transform.rotationEuler.y <= 90 && this.sprite.transform.rotationEuler.y > 0) {
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y - this.turnAngleDelta, 0);
            }
            else if (this.sprite.transform.rotationEuler.y >= -90 && this.sprite.transform.rotationEuler.y < 0) {
                this.isFan = true;
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y + this.turnAngleDelta, 0);
            }
            else {
                if (this.isFan) {
                    Laya.timer.once(50, this, function () {
                        _this.vector.z = -1;
                    });
                }
                else {
                    this.vector.z = -1;
                }
            }
        }
        else if (pos.z >= this.streetsVect[0].z - 1) {
            this.setState(Constants_1.CarState.MoveAction);
            vect.z *= this.speed;
            if (pos.z > this.streetsVect[0].z)
                pos.z = this.streetsVect[0].z;
            else
                this.sprite.transform.translate(vect, true);
            if (this.sprite.transform.rotationEuler.y > 90) {
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y - this.turnAngleDelta, 0);
            }
            else if (this.sprite.transform.rotationEuler.y < 90) {
                this.isFan = true;
                this.sprite.transform.rotationEuler = new Laya.Vector3(0, this.sprite.transform.rotationEuler.y + this.turnAngleDelta, 0);
            }
            else {
                if (this.isFan) {
                    Laya.timer.once(50, this, function () {
                        _this.vector.z = -1;
                    });
                }
                else {
                    this.vector.z = -1;
                }
            }
        }
        else {
            vect.z *= this.speed;
            if (vect.z == 0)
                this.setState(Constants_1.CarState.Idle);
            this.sprite.transform.translate(vect, true);
        }
        if (this.startInLayout >= 0) {
            if (this.getState() == Constants_1.CarState.MoveAction) {
                this.getLevelCtrl().clearCarInLayouts(this, this.startInLayout);
                this.startInLayout = -1;
            }
            else {
                this.updateLevelLayout();
            }
        }
        if (Constants_1.CarState.MoveAction) {
            this.colliding = false;
            this.collideStay = true;
        }
    };
    Car.prototype.setLastIdlePos = function (pos) {
        this.lastIdlePos = pos.clone();
    };
    return Car;
}(GameObject_1.default));
exports.default = Car;
},{"../../../Event/EventDef":7,"../../../Event/EventMgr":8,"../../../Mgr/SoundMgr":19,"../../../Mgr/VibrateMgr":20,"../../Constants":32,"../../Util/Animator":42,"./GameObject":36}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("../../Constants");
var GameObjcet = /** @class */ (function (_super) {
    __extends(GameObjcet, _super);
    function GameObjcet() {
        var _this = _super.call(this) || this;
        _this.w = 1;
        _this.h = 1;
        _this.unitScale = new Laya.Vector3(0, 0, 0);
        _this.lastPos = new Laya.Vector3(0, 0, 0);
        _this.state = Constants_1.CarState.None;
        return _this;
    }
    GameObjcet.prototype.onAwake = function () {
        this.sprite = this.owner;
    };
    GameObjcet.prototype.onPostRender = function () {
    };
    GameObjcet.prototype.setState = function (val) {
        this.state = val;
    };
    GameObjcet.prototype.getState = function () {
        return this.state;
    };
    GameObjcet.prototype.setLastPos = function (pos) {
        this.lastPos.x = pos.x;
        this.lastPos.y = pos.y;
        this.lastPos.z = pos.z;
    };
    GameObjcet.prototype.setLevelCtrl = function (ctrl, gameCtrl) {
        this.levelCtrl = ctrl;
        this.gameCtrl = gameCtrl;
    };
    GameObjcet.prototype.getLevelCtrl = function () {
        return this.levelCtrl;
    };
    GameObjcet.prototype.getGameCtrl = function () {
        return this.gameCtrl;
    };
    GameObjcet.prototype.setScale = function (x, z) {
        if (x === void 0) { x = null; }
        if (z === void 0) { z = null; }
        var t = this.sprite.transform.scale;
        t.x = (x == null ? t.x : x * this.unitScale.x);
        t.z = (z == null ? t.z : z * this.unitScale.z);
        this.sprite.transform.scale = t;
    };
    return GameObjcet;
}(Laya.Script3D));
exports.default = GameObjcet;
},{"../../Constants":32}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = require("./GameObject");
var Plane = /** @class */ (function (_super) {
    __extends(Plane, _super);
    function Plane() {
        var _this = _super.call(this) || this;
        _this.defaultSize = new Laya.Size(5, 5);
        _this.anchor = new Laya.Vector3(0, 0, 0);
        return _this;
    }
    Plane.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.unitScale.setValue(1, 1, 1);
        var pos = this.sprite.transform.localPosition;
        // pos.y += 0.09;
        this.anchor.x = -14.5;
        this.anchor.y = -2.6;
        this.anchor.z = -0.95;
        this.srcAnchor = this.anchor.clone();
        this.setLastPos(pos);
    };
    Plane.prototype.onEnable = function () {
    };
    Plane.prototype.onDisable = function () {
    };
    //以设置的锚点来设置坐标位置
    Plane.prototype.setPosWithAnchor = function (w, h) {
        var pos = this.anchor.clone();
        pos.x -= w * 0.5;
        pos.z += h * 0.5;
        this.sprite.transform.localPosition = pos;
    };
    Plane.prototype.getAnchor = function () {
        return this.anchor;
    };
    Plane.prototype.setAnchorOffset = function (x, z) {
        if (x === void 0) { x = 0; }
        if (z === void 0) { z = 0; }
        var vect = this.srcAnchor.clone();
        vect.x += x;
        vect.z += z;
        this.anchor = vect;
    };
    return Plane;
}(GameObject_1.default));
exports.default = Plane;
},{"./GameObject":36}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = require("./GameObject");
var Street = /** @class */ (function (_super) {
    __extends(Street, _super);
    function Street() {
        var _this = _super.call(this) || this;
        _this.defaultSize = new Laya.Size(1, 1);
        return _this;
    }
    Street.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.unitScale.setValue(1, 1, 1);
        this.setLastPos(this.sprite.transform.localPosition);
    };
    Street.prototype.onEnable = function () {
    };
    Street.prototype.onDisable = function () {
    };
    Street.prototype.setDefaultSize = function (w, h) {
        this.defaultSize = new Laya.Size(w, h);
    };
    Street.prototype.setPosByAnchor = function (anchor, offsetX, offsetZ) {
        var pos = anchor.clone();
        pos.x += offsetX;
        pos.z += offsetZ;
        pos.y = this.sprite.transform.localPositionY;
        this.sprite.transform.localPosition = pos;
    };
    Street.prototype.onTriggerEnter = function () {
        console.log("street collision");
    };
    return Street;
}(GameObject_1.default));
exports.default = Street;
},{"./GameObject":36}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameObject_1 = require("./GameObject");
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall() {
        return _super.call(this) || this;
    }
    Wall.prototype.onEnable = function () {
    };
    Wall.prototype.onDisable = function () {
    };
    return Wall;
}(GameObject_1.default));
exports.default = Wall;
},{"./GameObject":36}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SmartTip = /** @class */ (function () {
    function SmartTip() {
    }
    //思路 先遍历车辆检测1步是否可以移出 能移出则标记车辆移动方向并返回该辆车
    //否则 进入深度检测 检测车辆前进道路上有几辆阻挡，尝试挪动阻挡车辆，有解则记录步数塞进解集，继续检测第2俩车
    //检测完所有车辆后从解集中择优解
    SmartTip.prototype.check = function (layouts, cars, mapSize) {
        var cnt = 1;
        var str = "";
        //打印关卡数组
        // for (var i = 0; i < layouts.length; i++) {
        //     if (layouts[i] < 10)
        //         str += layouts[i] + " ,"
        //     else
        //         str += layouts[i] + ","
        //     if (cnt % mapSize.width == 0) {
        //         console.log(str);
        //         str = ""
        //     }
        //     cnt++;
        // }
        var tipCar = null;
        var tipDirection = -1;
        for (var _i = 0, cars_1 = cars; _i < cars_1.length; _i++) {
            var car = cars_1[_i];
            if (tipCar != null)
                break;
            if (car.getDirection() == 1) {
                // 竖向检测
                i = car.startInLayout;
                while (tipCar == null) {
                    var j = i + car.h * mapSize.width;
                    if (j >= layouts.length) {
                        tipCar = car;
                        console.log("竖向向下");
                        tipDirection = 1;
                        break;
                    }
                    var val1 = layouts[j];
                    var val2 = layouts[j + 1];
                    if (val1 != 1 || val2 != 1)
                        break;
                    i += mapSize.width;
                }
                var i = car.startInLayout;
                while (tipCar == null) {
                    i -= mapSize.width;
                    if (i < 0) {
                        tipCar = car;
                        console.log("竖向向上");
                        tipDirection = 0;
                        break;
                    }
                    var val1 = layouts[i];
                    var val2 = layouts[i + 1];
                    if (val1 != 1 || val2 != 1)
                        break;
                }
            }
            else {
                //横向检测
                var i = car.startInLayout;
                var row = Math.floor(i / mapSize.width);
                // console.log("row", row, i);
                while (tipCar == null) {
                    i--;
                    if (i < 0 || (i + 1) % mapSize.width == 0) {
                        tipCar = car;
                        console.log("横向向左");
                        tipDirection = 2;
                        break;
                    }
                    var val1 = layouts[i];
                    var val2 = layouts[i + mapSize.width];
                    if (val1 != 1 || val2 != 1) {
                        break;
                    }
                }
                i = car.startInLayout;
                while (tipCar == null) {
                    var j = i + car.h;
                    if (j >= layouts.length || j % mapSize.width == 0) {
                        tipCar = car;
                        console.log("横向向右");
                        tipDirection = 3;
                        break;
                    }
                    var val1 = layouts[j];
                    var val2 = layouts[j + mapSize.width];
                    if (val1 != 1 || val2 != 1)
                        break;
                    i++;
                }
            }
        }
        if (tipCar != null) {
            // console.log("tipCar", tipCar, tipCar.startInLayout);
            tipCar.tipDirection = tipDirection;
            return tipCar;
        }
        else
            return this.deepCheck();
    };
    SmartTip.prototype.deepCheck = function () {
        //TODO
        return null;
    };
    return SmartTip;
}());
exports.default = SmartTip;
},{}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameScene3D_1 = require("./View/GameScene3D");
var LevelLogic_1 = require("./Core/LevelLogic");
var Camera_1 = require("./Core/Model/Camera");
var User_1 = require("../User/User");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var GameMgr_1 = require("../Mgr/GameMgr");
var Utils_1 = require("./Util/Utils");
var SmartTip_1 = require("./Core/SmartTip");
var Plane_1 = require("./Core/Model/Plane");
var AppConfig_1 = require("../AppConfig");
var GameCtrl = /** @class */ (function (_super) {
    __extends(GameCtrl, _super);
    function GameCtrl() {
        var _this = _super.call(this) || this;
        _this.isGuide = false;
        _this.ray = new Laya.Ray(Laya.Vector3._ZERO, Laya.Vector3._ZERO);
        _this.hitRet = new Laya.HitResult();
        _this.levelLogic = new LevelLogic_1.default(_this);
        _this.smart = new SmartTip_1.default();
        _this.game3dStartFlag = false;
        _this.gameNotStart = false;
        return _this;
    }
    GameCtrl.prototype.onAwake = function () {
        var scene3D = this.owner.getComponent(GameScene3D_1.default);
        this.camera = scene3D.camera.getComponent(Camera_1.default);
        this.scene = this.owner;
        this.ground = scene3D.ground;
        this.parkSceneSrcPos = scene3D._parkscene.transform.localPosition.clone();
        this.srcFieldView = this.camera.camera.fieldOfView;
        // this.camera.camera.transform.localPositionZ -= 3;
        this.cameraSrcPos = this.camera.camera.transform.localPosition.clone();
        this.dstRotation = this.camera.camera.transform.localRotationEuler.clone();
        // this.camera.camera.transform
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_OnLevelComplate, this, this.gameOver);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_OnLevelStart, this, this.gameStart);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_Refresh, this, this.gameRefresh);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_Tip, this, this.gameTip);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_TouchStart, this, this.gameTouchStart);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_EnableCarTouch, this, this.enableCarTouch);
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnLevelStart);
    };
    GameCtrl.prototype.onDestroy = function () {
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_OnLevelComplate, this, this.gameOver);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_OnLevelStart, this, this.gameStart);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_Refresh, this, this.gameRefresh);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_Tip, this, this.gameTip);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_TouchStart, this, this.gameTouchStart);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_EnableCarTouch, this, this.enableCarTouch);
    };
    GameCtrl.prototype.enableCarTouch = function (enable) {
        if (!this.gameNotStart)
            this.game3dStartFlag = enable;
    };
    GameCtrl.prototype.gameTouchStart = function () {
        this.switchCamera(1);
    };
    GameCtrl.prototype.gameTip = function () {
        var layouts = this.levelLogic.getLevelLayouts().slice(0);
        var cars = this.levelLogic.getCars();
        var car = this.smart.check(layouts, cars, this.levelLogic.getMapSize());
        if (car && car != null) {
            this.showGameGuard(car);
        }
    };
    GameCtrl.prototype.showGameGuard = function (car) {
        var t = new Laya.Vector3();
        var camera = this.camera.camera;
        var p = car.sprite.transform.localPosition.clone();
        car.sprite.transform.localPosition = p;
        camera.viewport.project(car.sprite.transform.position, camera.projectionViewMatrix, t);
        // camera.transform.getForward
        // console.log(t);
        t.x += 10;
        t.y += 10;
        var x = null;
        var y = null;
        var offsets = [-80, 80, -150, 150];
        if (car.getDirection() == 1)
            y = offsets[car.tipDirection];
        else
            x = offsets[car.tipDirection];
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_Guide, { pos: t, visible: true, offsetX: x, offsetY: y });
    };
    GameCtrl.prototype.gameRefresh = function () {
        if (!this.game3dStartFlag)
            return;
        this.switchCamera(1);
        this.levelLogic.createLevel(User_1.default.getLeveNum());
    };
    GameCtrl.prototype.gameStart = function () {
        this.game3dStartFlag = false;
        this.levelLogic.createLevel(User_1.default.getLeveNum());
        GameMgr_1.default.getInstance().saveGameData();
        this.switchCamera(2);
        // this.levelLogic.createLevel(8);
    };
    GameCtrl.prototype.gameOver = function () {
        // this.createParticleCamera();
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_Guide, { visible: false });
        this.getGoldReward();
    };
    GameCtrl.prototype.getStreet = function (key) {
        var scene = this.owner.getComponent(GameScene3D_1.default);
        var cfg = scene.streets[key];
        return cfg.obj;
    };
    GameCtrl.prototype.getGoldReward = function () {
        var gold = this.levelLogic.randomRange(16, 25);
        User_1.default.addMoney(gold);
    };
    GameCtrl.prototype.createRandomBarrier = function () {
        var t = ["flowerPot", "newsBox"];
        var index = Math.round(Math.random() * (t.length - 1));
        return this.createBarrier(t[index]);
    };
    GameCtrl.prototype.createBarrier = function (key) {
        // console.log("key", key);
        var scene = this.owner.getComponent(GameScene3D_1.default);
        var cfg = scene.barriers[key];
        var obj = cfg.obj.clone();
        scene._parkscene.addChild(obj);
        obj.addComponent(cfg.component);
        return obj;
    };
    GameCtrl.prototype.createCar = function (key, carType) {
        var scene = this.owner.getComponent(GameScene3D_1.default);
        var cfg = scene.cars[key];
        var obj = cfg.objs[carType].clone();
        scene._parkscene.addChild(obj);
        obj.addComponent(cfg.component);
        return obj;
    };
    GameCtrl.prototype.getEmotionSp = function (car) {
        var rects = [new Laya.Vector3(0.12, 3.63, -0.78), new Laya.Vector3(0.26, 3.63, -1.07), new Laya.Vector3(0.28, 5.1, -1.7)];
        var scene = this.owner.getComponent(GameScene3D_1.default);
        var emotion = scene.emotion.clone();
        emotion.transform.localPosition = rects[car.getCarType()];
        emotion.transform.localScale = new Laya.Vector3(5, 5, 5);
        emotion.active = true;
        var ma = emotion._render.material;
        // let texture = Laya.loader.load("Emotions/biaoqing_1.png") as Laya.BaseTexture;
        // console.log(texture);
        var index = Utils_1.default.getInstance().randomRange(1, 4);
        Laya.loader.load(AppConfig_1.default.LocalTestReServer + "/Emotions/biaoqing_" + index + ".png", Laya.Handler.create(this, function (texture) {
            // ma.texture = texture;
        }));
        Laya.timer.once(1000, this, function () {
            emotion.removeSelf();
        });
        return emotion;
    };
    GameCtrl.prototype.createParticle = function () {
        var scene = this.owner.getComponent(GameScene3D_1.default);
        var particleOver = scene.particle;
        particleOver.active = true;
        Laya.timer.once(500, this, function () {
            particleOver.active = false;
        });
        return particleOver;
    };
    GameCtrl.prototype.createParticleCamera = function () {
        var scene = this.owner.getComponent(GameScene3D_1.default);
        var particleOver = scene.particleCamera;
        particleOver.active = true;
        Laya.timer.once(1000, this, function () {
            particleOver.active = false;
        });
        return particleOver;
    };
    GameCtrl.prototype.createLine = function () {
        var scene = this.owner.getComponent(GameScene3D_1.default);
        var obj = scene.line.clone();
        scene._parkscene.addChild(obj);
        return obj;
    };
    GameCtrl.prototype.setParkSceneOffset = function (offsetX, offsetZ) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetZ === void 0) { offsetZ = 0; }
        var scene = this.owner.getComponent(GameScene3D_1.default);
        var pos = this.parkSceneSrcPos.clone();
        pos.x += offsetX;
        pos.z += offsetZ;
        scene._parkscene.transform.localPosition = pos;
    };
    GameCtrl.prototype.setCameraProps = function (fieldOffset, offsetX, offsetY, offsetZ) {
        var camera = this.camera.camera;
        var src = this.cameraSrcPos.clone();
        camera.transform.localPosition = this.cameraSrcPos;
        camera.transform.translate(new Laya.Vector3(offsetX, offsetY, offsetZ));
        this.dstPos = camera.transform.localPosition.clone();
    };
    GameCtrl.prototype.getPlaneAnchor = function () {
        var plane = this.getStreet("plane").getComponent(Plane_1.default);
        return plane.getAnchor().clone();
    };
    GameCtrl.prototype.playEndAction = function (isOn) {
        var endPoint = this.owner.getComponent(GameScene3D_1.default).endPoint;
        endPoint.speed = 1;
        if (isOn)
            endPoint.play("deng");
        else
            endPoint.play("deng2");
        // anim.on(Laya.Event.);
        this.turnEndLightOn(isOn);
    };
    GameCtrl.prototype.playEndOffCaller = function () {
        this.playEndAction(false);
    };
    GameCtrl.prototype.turnEndLightOn = function (isOn) {
        var endRedLights = this.owner.getComponent(GameScene3D_1.default).endRedLights;
        var endGreenLights = this.owner.getComponent(GameScene3D_1.default).endGreenLights;
        for (var _i = 0, endRedLights_1 = endRedLights; _i < endRedLights_1.length; _i++) {
            var l = endRedLights_1[_i];
            l.active = !isOn;
        }
        for (var _a = 0, endGreenLights_1 = endGreenLights; _a < endGreenLights_1.length; _a++) {
            var l = endGreenLights_1[_a];
            l.active = isOn;
        }
    };
    GameCtrl.prototype.switchCamera = function (_id) {
        var _this = this;
        var scene = this.owner.getComponent(GameScene3D_1.default);
        if (_id == 1) {
            Laya.Tween.to(scene.camera.transform, {
                localPositionX: this.dstPos.x, localPositionY: this.dstPos.y, localPositionZ: this.dstPos.z,
                localRotationEulerX: this.dstRotation.x, localRotationEulerY: this.dstRotation.y, localRotationEulerZ: this.dstRotation.z
            }, 1000, null, Laya.Handler.create(this, function () {
                _this.levelLogic.gameTip();
                _this.game3dStartFlag = true;
                _this.gameNotStart = false;
            }));
        }
        else if (_id == 2) {
            this.gameNotStart = true;
            var spPlane = this.getStreet("plane");
            var out = new Laya.Vector3(0, 180, 0);
            var position = spPlane.transform.localPosition.clone();
            position.x += 1;
            scene.camera2.transform.lookAt(position, out, true);
            scene.camera.transform.position = scene.camera2.transform.position;
            scene.camera.transform.localRotationEuler = scene.camera2.transform.localRotationEuler;
        }
    };
    return GameCtrl;
}(Laya.Script3D));
exports.default = GameCtrl;
},{"../AppConfig":2,"../Event/EventDef":7,"../Event/EventMgr":8,"../Mgr/GameMgr":18,"../User/User":49,"./Core/LevelLogic":33,"./Core/Model/Camera":34,"./Core/Model/Plane":37,"./Core/SmartTip":40,"./Util/Utils":44,"./View/GameScene3D":45}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimatorCtrl = /** @class */ (function (_super) {
    __extends(AnimatorCtrl, _super);
    function AnimatorCtrl() {
        var _this = _super.call(this) || this;
        _this._animator = null;
        return _this;
    }
    AnimatorCtrl.prototype.onAwake = function () {
        this._animator = this.owner.getComponent(Laya.Animator);
        // console.log("_animator", this._animator);
    };
    AnimatorCtrl.prototype.onDisable = function () {
    };
    AnimatorCtrl.prototype.pause = function () {
        this._animator.speed = 0;
    };
    AnimatorCtrl.prototype.resume = function () {
        this._animator.speed = 1;
    };
    AnimatorCtrl.prototype.play = function (animName, layerIndex, normalizeTime) {
        if (layerIndex === void 0) { layerIndex = 0; }
        if (normalizeTime === void 0) { normalizeTime = 0; }
        this._animator.play(animName, layerIndex, normalizeTime);
    };
    return AnimatorCtrl;
}(Laya.Script3D));
exports.default = AnimatorCtrl;
},{}],43:[function(require,module,exports){
"use strict";
//圆桌随机算法
Object.defineProperty(exports, "__esModule", { value: true });
var RoundTableRandom = /** @class */ (function () {
    function RoundTableRandom() {
        this.ratios = {};
    }
    RoundTableRandom.prototype.set = function (key, ratios) {
        var t = ratios.slice();
        for (var i = 0; i < t.length; i++) {
            if (i > 0)
                t[i] = t[i - 1] + t[i];
        }
        this.ratios[key] = t;
        console.log(this.ratios[key]);
    };
    RoundTableRandom.prototype.getRandomIndex = function (key) {
        var val = Math.random();
        var ratios = this.ratios[key];
        for (var i = 0; i < ratios.length; i++) {
            if (val <= ratios[i]) {
                return i;
            }
        }
        return 0;
    };
    RoundTableRandom.prototype.randomCheck = function (ratio) {
        if (Math.random() <= ratio)
            return true;
        return false;
    };
    RoundTableRandom.prototype.clear = function (key) {
        if (key == null)
            this.ratios = {};
        else
            this.ratios[key] = null;
    };
    return RoundTableRandom;
}());
exports.default = RoundTableRandom;
},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.getInstance = function () {
        if (null == Utils._instance) {
            Utils._instance = new Utils();
        }
        return Utils._instance;
    };
    Utils.prototype.randomRange = function (min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    };
    Utils.prototype.randomMax = function (max) {
        return Math.round(Math.random() * max);
    };
    Utils.prototype.floatRandomRange = function (min, max) {
        return (Math.random() * (max - min)) + min;
    };
    return Utils;
}());
exports.default = Utils;
},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameCtrl_1 = require("../GameCtrl");
var Camera_1 = require("../Core/Model/Camera");
var Plane_1 = require("../Core/Model/Plane");
var Car_1 = require("../Core/Model/Car");
var Wall_1 = require("../Core/Model/Wall");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var Street_1 = require("../Core/Model/Street");
var GameObject_1 = require("../Core/Model/GameObject");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var GameScene3D = /** @class */ (function (_super) {
    __extends(GameScene3D, _super);
    function GameScene3D() {
        var _this = _super.call(this) || this;
        _this._once = true;
        _this.streets = {
            plane: { name: "plane", component: Plane_1.default },
            street0: { name: "lu_001", component: Street_1.default, w: 5, h: 3 },
            street1: { name: "lu_002", component: Street_1.default, w: 3, h: 3 },
            street2: { name: "lu_003", component: Street_1.default, w: 5.2, h: 3 },
            street3: { name: "lu_004", component: Street_1.default, w: 3, h: 3 },
            street4: { name: "lu_005", component: Street_1.default, w: 5, h: 3 },
            street5: { name: "lu_006", component: Street_1.default },
        };
        _this.cars = {
            car0: { name: "car_default", component: Car_1.default, objs: [] },
        };
        _this.barriers = {
            wall: { name: "Road_End_Sign", component: Wall_1.default },
            flowerPot: { name: "Decoration_Tree", component: GameObject_1.default },
            newsBox: { name: "hydrant_mesh", component: GameObject_1.default },
        };
        _this.endRedLights = [];
        _this.endGreenLights = [];
        return _this;
    }
    GameScene3D.prototype.onAwake = function () {
        laya.events.MouseManager.multiTouchEnabled = false;
        this._parkscene = this.owner.getChildByName("scene");
        this.particle = this.owner.getChildByName("caidai_01");
        this.camera = this.owner.getChildByName("Main Camera");
        this.camera.addComponent(Camera_1.default);
        this.camera2 = this._parkscene.getChildByName("Main Camera2");
        this.endPoint = this.owner.getChildByName("dong").getChildByName("end").getComponent(Laya.Animator);
        this.endPoint.speed = 0;
        var light = this.endPoint.owner.getChildByName("Sign").getChildByName("Light_Red.L");
        this.endRedLights.push(light);
        light = this.endPoint.owner.getChildByName("Sign").getChildByName("Light_Red.R");
        this.endRedLights.push(light);
        light = this.endPoint.owner.getChildByName("Sign").getChildByName("Light_Green.L");
        this.endGreenLights.push(light);
        light = this.endPoint.owner.getChildByName("Sign").getChildByName("Light_Green.R");
        this.endGreenLights.push(light);
        this.line = this._parkscene.getChildByName("barriers").getChildByName("line");
        // this.camera.clearFlag(1);
        // this.light = this.owner.getChildByName("Directional Light") as Laya.DirectionLight;
        // this.light.shadow = true;
        // this.light.shadowDistance = 130;
        // this.light.shadowResolution = 2048;
        // this.light.shadowPSSMCount = 1;
        // this.light.shadowPCFType = 0;
        // this.light.lightmapBakedType = 1;
        // this.light.intensity = 0.5;
        // console.log("intensity",this.light.lightmapBakedType);
        // this.particleCamera = this.owner.getChildByName("Main Camera").getChildByName("caidai") as Laya.Sprite3D;
        // this.particleCamera.active = true;
        this.emotion = this.owner.getChildByName("biaoqing_1");
        for (var k in this.streets) {
            var v = this.streets[k];
            v.obj = this.owner.getChildByName("scene").getChildByName(v.name);
            var compo = v.obj.addComponent(v.component);
            if (v.w && compo.setDefaultSize) {
                compo.setDefaultSize(v.w, v.h);
            }
            // Utilit.forEachChild(v.obj, (node)=>{
            //     var mesh = node as Laya.MeshSprite3D;
            //     if (mesh && mesh.meshRenderer) {
            //         mesh.meshRenderer.receiveShadow = true;
            //     }
            // });
        }
        for (var k in this.cars) {
            var v = this.cars[k];
            for (var i = 0; i < 3; i++) {
                var obj = this._parkscene.getChildByName("car").getChildByName(v.name + "_" + i);
                // Utilit.forEachChild(obj, (node)=>{
                //     var mesh = node as Laya.MeshSprite3D;
                //     if (mesh && mesh.meshRenderer) {
                //         mesh.meshRenderer.castShadow = true;
                //     }
                // });
                v.objs.push(obj);
            }
        }
        for (var k in this.barriers) {
            var v = this.barriers[k];
            v.obj = this._parkscene.getChildByName("barriers").getChildByName(v.name);
            // Utilit.forEachChild(v.obj, (node)=>{
            //     var mesh = node as Laya.MeshSprite3D;
            //     if (mesh && mesh.meshRenderer) {
            //         mesh.meshRenderer.castShadow = true;
            //     }
            // });
        }
        // var tree = this._parkscene.getChildByName("tree");
        // Utilit.forEachChild(tree, (node)=>{
        //     var mesh = node as Laya.MeshSprite3D;
        //     if (mesh && mesh.meshRenderer) {
        //         mesh.meshRenderer.castShadow = true;
        //     }
        // });
        // var plane = this.owner.getChildByName("Plane").getChildByName("Plane_0") as Laya.MeshSprite3D;
        // plane.meshRenderer.receiveShadow = true;
        // var objects = this.owner.getChildByName("budong");
        // Utilit.forEachChild(objects, (node)=>{
        //     var mesh = node as Laya.MeshSprite3D;
        //     if (mesh && mesh.meshRenderer)
        //         mesh.meshRenderer.castShadow = true;
        // });
        // (this.owner.getChildByName("Cube") as Laya.MeshSprite3D).meshRenderer.castShadow = true;
        this.owner.addComponent(GameCtrl_1.default);
    };
    GameScene3D.prototype.onEnable = function () {
    };
    GameScene3D.prototype.onDisable = function () {
    };
    GameScene3D.prototype.onPostRender = function () {
        if (this._once) {
            EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.App_CloseFirstLoadingView);
            SoundMgr_1.default.instance.playBGM('bg');
            this._once = false;
        }
    };
    GameScene3D.prototype.onMouseClick = function () {
    };
    return GameScene3D;
}(Laya.Script3D));
exports.default = GameScene3D;
},{"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../Mgr/SoundMgr":19,"../Core/Model/Camera":34,"../Core/Model/Car":35,"../Core/Model/GameObject":36,"../Core/Model/Plane":37,"../Core/Model/Street":38,"../Core/Model/Wall":39,"../GameCtrl":41}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("./Mgr/ViewMgr");
var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
var WudianMgr_1 = require("./Mgr/WudianMgr");
var AppConfig_1 = require("./AppConfig");
var QQMiniGameAPI = /** @class */ (function () {
    function QQMiniGameAPI() {
    }
    QQMiniGameAPI.Login = function (onSuccess, onFail) {
        if (Laya.Browser.onQQMiniGame) {
            Laya.Browser.window["qq"].login({
                success: function (res) {
                    if (res.code) {
                        var code = res.code;
                        onSuccess(code);
                        console.log("登陆成功,获取到code : " + code);
                    }
                }
            });
        }
    };
    QQMiniGameAPI.onRewardedVideoAdLoad = function () {
        console.log('激励视频 广告加载完成');
    };
    QQMiniGameAPI.onRewardedVideoAdError = function (err) {
        console.log('激励视频 广告加载失败' + err);
        if (QQMiniGameAPI._onRewardedVideoAdFailed) {
            QQMiniGameAPI._onRewardedVideoAdFailed();
        }
    };
    QQMiniGameAPI.onRewardedVideoAdClose = function (res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看');
            if (QQMiniGameAPI._onRewardedVideoAdClose) {
                QQMiniGameAPI._onRewardedVideoAdClose(true);
            }
        }
        else {
            console.log('激励视频 未完整观看');
            if (QQMiniGameAPI._onRewardedVideoAdClose) {
                QQMiniGameAPI._onRewardedVideoAdClose(false);
            }
        }
    };
    QQMiniGameAPI.regRewardedVideoAdEvent = function (rewardedVideoAd) {
        rewardedVideoAd.onLoad(QQMiniGameAPI.onRewardedVideoAdLoad);
        rewardedVideoAd.onError(QQMiniGameAPI.onRewardedVideoAdError);
        rewardedVideoAd.onClose(QQMiniGameAPI.onRewardedVideoAdClose);
        QQMiniGameAPI._isRegRewardedVideoAdEvent = true;
    };
    QQMiniGameAPI.showRewardedVideoAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQQMiniGame) {
            QQMiniGameAPI._onRewardedVideoAdClose = onAdClose;
            QQMiniGameAPI._onRewardedVideoAdFailed = onFailed;
            var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd({
                adUnitId: QQMiniGameAPI.adUnitId,
            });
            if (!QQMiniGameAPI._isRegRewardedVideoAdEvent) {
                QQMiniGameAPI.regRewardedVideoAdEvent(rewardedVideoAd);
            }
            rewardedVideoAd.load().then(function () {
                var promise = rewardedVideoAd.show();
                promise.then(function () { return console.log('激励视频 广告显示成功'); });
                promise.catch(function (err) {
                    rewardedVideoAd.load()
                        .then(function () { return rewardedVideoAd.show(); })
                        .catch(function (err) {
                        console.log('激励视频 广告显示失败');
                        if (onFailed) {
                            onFailed();
                        }
                    });
                });
            }).catch(function (err) {
                console.log('激励视频 广告加载失败');
                if (onFailed) {
                    onFailed();
                }
            });
        }
        else {
            onAdClose(true);
        }
    };
    //----------------------------------------------------------------
    //-------------------------小游戏跳转---------------------------
    QQMiniGameAPI.navigateToMiniProgram = function (appId, path, onSuccess, onFail, onComplate) {
        if (Laya.Browser.onQQMiniGame) {
            console.log("跳转游戏： " + appId);
            Laya.Browser.window["qq"].navigateToMiniProgram({
                appId: appId,
                path: path,
                extraData: {
                    foo: 'bar'
                },
                envVersion: 'release',
                success: function (res) {
                    if (onSuccess) {
                        onSuccess(res);
                    }
                },
                fail: function (res) {
                    if (onFail) {
                        onFail(res);
                    }
                },
                complete: function (res) {
                    if (onComplate) {
                        onComplate(res);
                    }
                }
            });
        }
    };
    QQMiniGameAPI.share = function (complate, titel, imageUrl) {
        var _this = this;
        if (Laya.Browser.onQQMiniGame) {
            QQMiniGameAPI._onShow = function () {
                Laya.Browser.window["qq"].offShow(QQMiniGameAPI._onShow);
                QQMiniGameAPI._onShow = null;
                var c = Date.now() - _this._lastShareTime;
                if (complate) {
                    if (Date.now() - _this._lastShareTime > 2000) {
                        complate(true);
                    }
                    else {
                        complate(false);
                    }
                }
            };
            Laya.Browser.window["qq"].onShow(QQMiniGameAPI._onShow);
            this._lastShareTime = Date.now();
            Laya.Browser.window["qq"].shareAppMessage({
                title: titel,
                imageUrl: imageUrl
            });
        }
    };
    //----------------------------------------------------------------------
    //--------------------插屏幕广告---------------------------------------
    QQMiniGameAPI.showInterstitialAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQQMiniGame) {
            var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                adUnitId: QQMiniGameAPI.InsAdUnitId,
            });
            var _onLoad_1 = function () {
                console.log('插屏广告 加载完成');
                interstitialAd.show().catch(function (err) {
                    console.log('插屏广告 显示失败 ：' + err);
                    interstitialAd.offLoad(_onLoad_1);
                    interstitialAd.offError(_onError_1);
                    interstitialAd.offClose(_onClose_1);
                    interstitialAd.destroy();
                    if (onFailed) {
                        onFailed();
                    }
                });
            };
            interstitialAd.onLoad(_onLoad_1);
            var _onError_1 = function (err) {
                console.log('插屏广告 加载失败' + err);
                interstitialAd.offLoad(_onLoad_1);
                interstitialAd.offError(_onError_1);
                interstitialAd.offClose(_onClose_1);
                interstitialAd.destroy();
                if (onFailed) {
                    onFailed();
                }
            };
            interstitialAd.onError(_onError_1);
            var _onClose_1 = function () {
                console.log('插屏广告 关闭');
                interstitialAd.offLoad(_onLoad_1);
                interstitialAd.offError(_onError_1);
                interstitialAd.offClose(_onClose_1);
                interstitialAd.destroy();
                if (onAdClose) {
                    onAdClose();
                }
            };
            interstitialAd.onClose(_onClose_1);
        }
        else {
            onAdClose();
        }
    };
    QQMiniGameAPI.LoadAppBoxAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQQMiniGame) {
            this.mAppboxAd = Laya.Browser.window["qq"].createAppBox({
                adUnitId: QQMiniGameAPI.AppBoxId,
            });
            this.mAppboxAd.load().then(function () {
                console.log('盒子广告 加载完成');
            });
            this.mAppboxAd.onError(function (err) {
                console.log('盒子广告 加载失败' + err);
                if (onFailed) {
                    onFailed();
                }
            });
            this.onBoxAdClose = function () {
                console.log('盒子广告 关闭');
                if (onAdClose) {
                    onAdClose();
                }
            };
            this.mAppboxAd.onClose(this.onBoxAdClose);
        }
        else {
            onAdClose();
        }
    };
    QQMiniGameAPI.showAppBoxAd = function (onFailed, onAdClose) {
        if (this.mAppboxAd) {
            console.log("显示盒子广告");
            this.mAppboxAd.offClose(this.onBoxAdClose);
            this.onBoxAdClose = function () {
                console.log('盒子广告 关闭');
                if (onAdClose) {
                    onAdClose();
                }
            };
            this.mAppboxAd.onClose(this.onBoxAdClose);
            this.mAppboxAd.show().catch(function (err) {
                console.log('盒子广告 显示失败 ：' + err);
                if (onFailed) {
                    onFailed();
                }
            });
        }
        else {
            QQMiniGameAPI.LoadAppBoxAd(onAdClose, onFailed);
        }
    };
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/qq.getLaunchOptionsSync.html
     * @static
     * @returns {LaunchOptions}
     * @memberof QQMiniGameAPI
     */
    QQMiniGameAPI.getLaunchOptionsSync = function () {
        // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
        if (Laya.Browser.onQQMiniGame) {
            var obj_1 = Laya.Browser.window["qq"].getLaunchOptionsSync();
            console.log("场景值 " + obj_1.scene);
            var str = JSON.stringify(obj_1.query);
            console.log("Query参数 " + str);
            var key = obj_1.query["key"];
            console.log("Query参数：key " + key);
            console.log("ShareTicket " + obj_1.shareTicket);
            console.log("ReferrerInfo.appId " + obj_1.referrerInfo.appId);
            console.log("ReferrerInfo.extraData " + obj_1.referrerInfo.extraData);
            return obj_1;
        }
        var obj = { scene: 1001, query: "", shareTicket: "", appId: "", extraData: "" };
        return obj;
    };
    //----------------------------------------------------------------------
    /**
     * 打开微信左上角分享转发点击事件,在游戏逻辑中调用一次即可
     * 注意此方法只会在真机上执行，在微信模拟器环境下点击转发按钮什么都不会发生
     *
     * @static
     * @param {string} titel 分享标题
     * @param {string} imageUrl 分享图片地址
     * @param {Function} [success] 成功回调函数(可不填)
     * @param {Function} [fail] 失败回调函数(可不填)
     * @param {Function} [complate] 完成回调函数，成功失败都会执行(可不填)
     * @memberof QQMiniGameAPI
     */
    QQMiniGameAPI.SetShareMenu = function (titel, imageUrl, success, fail, complate) {
        if (Laya.Browser.onQQMiniGame) {
            console.log("小游戏设置转发按钮");
            Laya.Browser.window["qq"].showShareMenu({
                withShareTicket: false,
                success: success,
                fail: fail,
                complete: complate
            });
            Laya.Browser.window["qq"].onShareAppMessage(function () {
                return {
                    title: titel,
                    imageUrl: imageUrl
                };
            });
        }
    };
    //显示QQ狂点界面1，此接口添加了对场景值，IP地区的判断
    //data 传入界面的参数 格式 ：{ Complete : Function , PrizeCount : String | Number}
    //onSuccess 界面成功打开回调
    //onFail 界面打开失败回调
    QQMiniGameAPI.showQQCreazyClick = function (data, onSuccess, onFail) {
        var launchScene = QQMiniGameAPI.getLaunchOptionsSync().scene;
        var noEnterBySearch = true;
        var wudianSceneList = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudianSceneList;
        for (var i = 0; i < wudianSceneList.length; ++i) {
            var wudianSceneValue = wudianSceneList[i];
            if (launchScene == wudianSceneValue) {
                noEnterBySearch = false;
            }
        }
        var ipBlocked = WudianMgr_1.default.GetIpBlocked();
        var wudian = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudian;
        var kuangdianBanner = AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.kuangdianBanner;
        if (AppConfig_1.default.Versions == AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.qqversions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBanner) {
            ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.QQCrazyClickView, data, function () {
                if (null != onSuccess) {
                    onSuccess();
                }
            });
        }
        else {
            if (null != onFail) {
                onFail();
            }
        }
    };
    //显示QQ狂点界面2，此接口添加了对场景值，IP地区的判断
    //data 传入界面的参数 格式 ：{ Complete : Function , PrizeCount : String | Number}
    //onSuccess 界面成功打开回调
    //onFail 界面打开失败回调
    QQMiniGameAPI.showQQCreazyClick2 = function (data, onSuccess, onFail) {
        var launchScene = QQMiniGameAPI.getLaunchOptionsSync().scene;
        var noEnterBySearch = true;
        var wudianSceneList = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudianSceneList;
        for (var i = 0; i < wudianSceneList.length; ++i) {
            var wudianSceneValue = wudianSceneList[i];
            if (launchScene == wudianSceneValue) {
                noEnterBySearch = false;
            }
        }
        var ipBlocked = WudianMgr_1.default.GetIpBlocked();
        var wudian = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudian;
        var kuangdianBox = AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.kuangdianBox;
        if (AppConfig_1.default.Versions == AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.qqversions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBox) {
            ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.QQCrazyClickView2, data, function () {
                if (null != onSuccess) {
                    onSuccess();
                }
            });
        }
        else {
            if (null != onFail) {
                onFail();
            }
        }
    };
    /**
     *
     * @param onFail 错误回调
     * @param centerX centerX 单位为px
     * @param top top px值
     * @param orientation landscape | vertical
     */
    QQMiniGameAPI.showAppBlockAd = function (onFail, top, orientation) {
        if (top === void 0) { top = 150; }
        if (orientation === void 0) { orientation = "landscape"; }
        if (!Laya.Browser.onQQMiniGame)
            return;
        if (!Laya.Browser.window["qq"].createBlockAd)
            return;
        if (QQMiniGameAPI.isAppBlockAdLoading)
            return;
        QQMiniGameAPI.isAppBlockAdLoading = true;
        if (isNaN(QQMiniGameAPI.screenWidth)) {
            try {
                var res = Laya.Browser.window["qq"].getSystemInfoSync();
                QQMiniGameAPI.screenWidth = res.windowWidth;
                QQMiniGameAPI.screenHeight = res.windowHeight;
                QQMiniGameAPI.pixelRatio = res.pixelRatio;
                QQMiniGameAPI.isIos = res.platform == "ios";
                QQMiniGameAPI.skdVersion = res.SDKVersion;
                //IOS下使用DP单位,left,top均为DP，android使用PX
                QQMiniGameAPI.screenWidth *= (QQMiniGameAPI.isIos ? 1 : QQMiniGameAPI.pixelRatio);
                QQMiniGameAPI.screenHeight *= (QQMiniGameAPI.isIos ? 1 : QQMiniGameAPI.pixelRatio);
                console.log("getSystemInfoSync ==> ", res.SDKVersion);
            }
            catch (e) {
                if (onFail)
                    onFail();
                return;
            }
        }
        var arr1 = QQMiniGameAPI.skdVersion.split(".").map(function (v) { return parseInt(v); });
        var arr2 = QQMiniGameAPI.supportSDKVersion.split(".").map(function (v) { return parseInt(v); });
        var isSupport = true;
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] < arr2[i]) {
                isSupport = false;
                break;
            }
        }
        if (!isSupport)
            return;
        console.log("QQMiniGameAPI.showAppBlockAd ", top);
        QQMiniGameAPI.destroyAppBlockAd();
        QQMiniGameAPI.onFail = onFail;
        var min = QQMiniGameAPI.isIos ? 32 / QQMiniGameAPI.pixelRatio : 32;
        var mTop = Math.max(min, top / (QQMiniGameAPI.isIos ? QQMiniGameAPI.pixelRatio : 1));
        var mLeft = QQMiniGameAPI.screenWidth / 2;
        mLeft = min;
        QQMiniGameAPI.mAppBlockAd = Laya.Browser.window["qq"].createBlockAd({
            adUnitId: QQMiniGameAPI.blockAdArray[Math.floor(Math.random() * QQMiniGameAPI.blockAdArray.length)],
            style: { left: mLeft, top: mTop },
            size: QQMiniGameAPI.AppBlockSize,
            orientation: orientation,
        });
        // QQMiniGameAPI.mAppBlockAd.onResize(QQMiniGameAPI.appBlockADResize);
        QQMiniGameAPI.mAppBlockAd.onError(QQMiniGameAPI.appBlockADError);
        QQMiniGameAPI.mAppBlockAd.show().catch(function (err) {
            console.log('积木广告 显示失败 ：' + JSON.stringify(err));
            if (onFail) {
                onFail();
            }
        });
        QQMiniGameAPI.isAppBlockAdLoading = false;
    };
    QQMiniGameAPI.appBlockADResize = function (obj) {
        if (!QQMiniGameAPI.mAppBlockAd["style"])
            return;
        var realWidth = obj.width;
        var realHeight = obj.height;
        // console.log("onResize ==> qq ", screenWidth, "=", realWidth, "=", screenHeight, "=", realHeight);
        // if (!isNaN(centerX)) {
        //     mLeft = ((screenWidth - realWidth) / 2) + (centerX / (isIos ? pixelRatio : 1));
        // } else if (!isNaN(left)) {
        //     left /= (isIos ? pixelRatio : 1);
        //     mLeft = Math.max(33, left);
        // } else if (!isNaN(right)) {
        //     right /= (isIos ? pixelRatio : 1);
        //     mLeft = Math.max(screenWidth - realWidth, right);
        // }
        // console.log("onResize ==> 3 ", mLeft, "=", mTop);
        // QQMiniGameAPI.mAppBlockAd.style.left = mLeft;
        var mLeft = (QQMiniGameAPI.screenWidth - realWidth) / 2;
        QQMiniGameAPI.mAppBlockAd.style.left = mLeft;
    };
    QQMiniGameAPI.appBlockADError = function (err) {
        console.log("积木广告  加载失败 ", JSON.stringify(err));
        if (QQMiniGameAPI.onFail)
            QQMiniGameAPI.onFail();
    };
    QQMiniGameAPI.destroyAppBlockAd = function () {
        if (!Laya.Browser.onQQMiniGame)
            return;
        if (!QQMiniGameAPI.mAppBlockAd)
            return;
        console.log("QQMiniGameAPI.destroyAppBlockAd");
        QQMiniGameAPI.mAppBlockAd.offResize(QQMiniGameAPI.appBlockADResize);
        QQMiniGameAPI.mAppBlockAd.offError(QQMiniGameAPI.appBlockADError);
        QQMiniGameAPI.mAppBlockAd.hide();
        QQMiniGameAPI.mAppBlockAd.destroy();
        QQMiniGameAPI.mAppBlockAd = null;
    };
    QQMiniGameAPI.adUnitId = ""; //激励视频Id
    QQMiniGameAPI.bannerAdUnitId = ""; //banner广告Id
    QQMiniGameAPI.InsAdUnitId = ""; //插屏广告Id
    QQMiniGameAPI.AppBoxId = ""; //盒子广告Id
    QQMiniGameAPI.blockAdArray = [];
    QQMiniGameAPI.AppBlockStyle = { left: 120, top: 200 }; //样式，积木广告左上角横纵坐标， mmp 最小值32
    QQMiniGameAPI.AppBlockSize = 5; //范围是1~5，积木广告的个数（展示以实际拉取广告数量为准）
    QQMiniGameAPI.AppBlockOrientation = "landscape"; //landscape 或者 vertical，积木广告横向展示或者竖向展示
    //-------------------------激励视频---------------------------------
    QQMiniGameAPI._isRegRewardedVideoAdEvent = false;
    QQMiniGameAPI._onRewardedVideoAdFailed = null;
    QQMiniGameAPI._onRewardedVideoAdClose = null;
    //----------------------------------------------------------------------
    //---------------------分享----------------------------------------
    QQMiniGameAPI._onShow = null;
    QQMiniGameAPI._lastShareTime = 0;
    //--------------------盒子广告---------------------------------------
    QQMiniGameAPI.mAppboxAd = null;
    QQMiniGameAPI.onBoxAdClose = null;
    //----------------------   积木广告   ------------------------------------- /
    /**
     *  1000	后端错误调用失败	 该项错误不是开发者的异常情况	一般情况下忽略一段时间即可恢复。
     *  1001	参数错误	        使用方法错误	可以前往 q.qq.com 确认具体教程（小程序和小游戏分别有各自的教程，可以在顶部选项中，“设计”一栏的右侧进行切换。
     *  1002	广告单元无效	    可能是拼写错误、或者误用了其他 APP 的广告 ID	请重新前往 q.qq.com 确认广告位 ID。
     *  1003	内部错误	        该项错误不是开发者的异常情况	一般情况下忽略一段时间即可恢复。
     *  1004	无适合的广告	    广告不是每一次都会出现，这次没有出现可能是由于该用户不适合浏览广告	属于正常情况，且开发者需要针对这种情况做形态上的兼容。
     *  1005	广告组件审核中	    你的广告正在被审核，无法展现广告	请前往 q.qq.com 确认审核状态，且开发者需要针对这种情况做形态上的兼容。
     *  1006	广告组件被驳回	    你的广告审核失败，无法展现广告	请前往 q.qq.com 确认审核状态，且开发者需要针对这种情况做形态上的兼容
     *  1007	广告组件被驳回	    你的广告能力已经被封禁，封禁期间无法展现广告	请前往 q.qq.com 确认小程序广告封禁状态。
     *  1008	广告单元已关闭	    该广告位的广告能力已经被关闭	请前往 q.qq.com 重新打开对应广告位的展现。
     *  1009	广告位置设置错误	该广告的位置设置导致展示不全	请重新调整广告的位置
     */
    QQMiniGameAPI.mAppBlockAd = null;
    QQMiniGameAPI.screenWidth = NaN;
    QQMiniGameAPI.isAppBlockAdLoading = false;
    QQMiniGameAPI.supportSDKVersion = "1.15.0";
    return QQMiniGameAPI;
}());
exports.default = QQMiniGameAPI;
},{"./AppConfig":2,"./Config/AppSwitchConfig":4,"./Mgr/ViewMgr":21,"./Mgr/WudianMgr":23}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShareAd = /** @class */ (function () {
    function ShareAd() {
    }
    ShareAd.refreshAd = function (complate) {
        // ShareAd.getAdPosData((res)=>{
        //     if(1 == res.code)
        //     {
        //         console.log("获取分享广告数据成功");
        //         ShareAd._adPosition = res.result;
        //         if(complate)
        //         {
        //             complate(true)
        //         }
        //     }
        //     else
        //     {
        //         console.log("获取分享广告数据失败 ： " + res.msg);
        //         if(complate)
        //         {
        //             complate(false)
        //         }
        //     }
        // },(res)=>{
        //     console.log("获取分享广告数据失败");
        //     if(complate)
        //     {
        //         complate(false)
        //     }
        // })
    };
    ShareAd.getADVs = function (locationid, complate, useRandom, useLocalRandom, sortDatas) {
        // if(!ShareAd.isNeedShowAd())
        // {
        //     complate(null);
        //     return;
        // }
        // useRandom = null == useRandom ? this.UseRandomAdPos : useRandom;
        // useLocalRandom =  null == useLocalRandom ? true : useLocalRandom;
        // if(useRandom)
        // {
        //     locationid = this.getRandomADPosID();
        // }
        // var datas = ShareAd._adv[locationid];
        // if(datas)
        // {
        //     if(useLocalRandom)
        //     {
        //         if(null == sortDatas)
        //         {
        //             datas = this.sortDatas(datas);
        //         }
        //         else
        //         {
        //             datas = sortDatas(datas);
        //         }
        //     }
        //     complate(datas)
        // }
        // else
        // {
        //     var self = this;
        //     ShareAd.getADVData(locationid,(res)=>
        //     {
        //         if(1 == res.code)
        //         {
        //             ShareAd._adv[locationid] = res.result;
        //             datas = ShareAd._adv[locationid];
        //             if(datas && Utilit.isIphone())
        //             {
        //                 for(var i=0;i< datas.length;++i)
        //                 {
        //                     var data = datas[i];
        //                     for(var j=0;j < ShareAd._iphoneIgnoreAppIds.length;++j)
        //                     {
        //                         if(data.appid == ShareAd._iphoneIgnoreAppIds[j])
        //                         {
        //                             datas.splice(i,1);
        //                             --i;
        //                             break;
        //                         }
        //                     }
        //                 }
        //             }
        //             if(datas && useLocalRandom)
        //             {
        //                 if(null == sortDatas)
        //                 {
        //                     datas = self.sortDatas(datas);
        //                 }
        //                 else
        //                 {
        //                     datas = sortDatas(datas);
        //                 }
        //             }
        //             if(complate)
        //             {
        //                 complate(datas);
        //             }
        //         }
        //         else
        //         {
        //             if(complate)
        //             {
        //                 complate(null);
        //             }
        //         }
        //     },(res)=>
        //     {
        //         if(complate)
        //         {
        //             complate(null);
        //         }
        //     })
        // }
    };
    ShareAd.reportUserClick = function (advid) {
        // ShareAd.reqUserClick(advid,(res)=>
        // {
        //     if(1 == res.code)
        //     {
        //         console.log("点击广告上报成功");
        //     }
        //     else
        //     {
        //         console.log("点击广告上报失败");
        //     }
        // },(res)=>
        // {
        //     console.log("点击广告上报失败");
        // });
    };
    ShareAd.getRandomADPosID = function () {
        return this.AdLocationids[Math.floor(Math.random() * this.AdLocationids.length)];
    };
    ShareAd.request = function (req) {
        // if (req.url.indexOf("https://") > -1 ||
        //     req.url.indexOf("http://") > -1) {
        //     req.url = req.url;
        // } else {
        //     req.url = ShareAd.mainUrl + req.url;
        // }
        // var completeFunc = (res) => {
        //     console.log(res,"http Success")
        //     res = JSON.parse(res);
        //     if (req.onSuccess) {
        //         req.onSuccess(res);
        //     }
        //     req.onSuccess = null;
        //     req = null;
        // };
        // var errorFunc = (res) => {
        //     console.log(res,"http fail")
        //     if (req.onFail)  {
        //         req.onFail(res);
        //     }
        //     req.onFail = null;
        //     req = null;
        // };
        // var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        // xhr.once(Laya.Event.COMPLETE, this, completeFunc);
        // xhr.once(Laya.Event.ERROR, this, errorFunc);
        // if(req.meth == "get")
        // {
        //     var para = "";
        //     for(const key of Object.keys(req.data)) 
        //     {
        //         var value = req.data[key];
        //         para +=  key + "=" + value + "&";
        //     }
        //     req.url = req.url + "?" + para;
        //     var header =
        //         [
        //             "versions", AppConfig.Versions,
        //         ]
        //     xhr.send(req.url,null,req.meth,null,header);
        // }
        // else
        // {
        //     var para = "";
        //     for(const key of Object.keys(req.data)) 
        //     {
        //         var value = req.data[key];
        //         para +=  key + "=" + value + "&";
        //     }
        //     para += "ts=" + String(Date.now()) + "&";
        //     var header =
        //         [
        //             "Content-Type", "application/x-www-form-urlencoded",
        //             "versions", AppConfig.Versions,
        //         ]
        //     xhr.send(req.url,para,req.meth,null,header);
        // }
    };
    ShareAd.getAdPosData = function (onSuccess, onFail) {
        // var req = new requestData();
        // req.url = ShareAd.getAdPostion;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = AppConfig.AppID;
        // req.meth = "get";
        // ShareAd.request(req);
    };
    ShareAd.reqUserClick = function (advid, onSuccess, onFail) {
        // var req = new requestData();
        // req.url = ShareAd.userClick;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = AppConfig.AppID;
        // req.data.uid  = User.openId;
        // req.data.advid  = advid ;
        // ShareAd.request(req);
    };
    ShareAd.getADVData = function (locationid, onSuccess, onFail) {
        // var req = new requestData();
        // req.url = ShareAd.getAdv;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = AppConfig.AppID;
        // req.data.locationid = locationid;
        // req.data.preview = 0;
        // ShareAd.request(req);
    };
    /**
         * 随机跳转的方法，会从广告列表中随机得到一个AppId并且跳转,输入的参数为概率，大小在0-1之间
         * 如果概率大于1，则自动将其除以100，所以千万注意！
         *
         * @static
         * @param {number} [rate=1]
         * @memberof ShareAd
         */
    ShareAd.RandomJump = function (rate) {
        if (rate === void 0) { rate = 1; }
        // console.log("随机跳转,rate：" + rate);
        // if (rate > 1) {
        //     rate = rate / 100;
        // }
        // let rd = Math.random();
        // if (rd <= rate) {
        //     var adLocationID = ShareAd.LoopAdLocationID;
        //     var Locations = 
        //     [
        //         ShareAd.LoopAdLocationID, 
        //         ShareAd.InsertAdLocationID, 
        //         ShareAd.BannerAdLocationID,
        //         ShareAd.AniAdLocationID,
        //     ]
        //     if(ShareAd.UseRandomAdPos)
        //     {
        //         for(var i=0;i < ShareAd.AdLocationids.length;++i)
        //         {
        //             Locations.push(ShareAd.AdLocationids[i]);
        //         }
        //     }
        //     adLocationID = Locations[Math.floor(Math.random() * Locations.length)]
        //     var datas = ShareAd.getADVs(adLocationID, function (datas: Array<any>) {
        //         if (datas) {
        //             let rd = Math.floor(datas.length * Math.random());
        //             let data = datas[rd];
        //             console.log("跳转游戏： " + data.title);
        //             WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
        //                 console.log("跳转成功")
        //                 ShareAd.reportUserClick(data.appid);
        //                 ALD.aldSendReportAdClickSuccess(data);
        //             }, (res) => {
        //                 console.log("跳转失败")
        //                 EventMgr.instance.dispatch(EventDef.AD_OnShareAdFail);
        //                 if (res.errMsg == "navigateToMiniProgram:fail cancel") {
        //                     console.log("用户取消跳转");
        //                     ALD.aldSendReportAdClickFail(data);
        //                 }
        //             }, (res) => {
        //                 console.log("跳转完成")
        //             });
        //         }
        //     }, true);
        // }
    };
    ShareAd.isNeedShowAd = function () {
        // if(0 == AppSwitchConfig.getInstance().getAppSwitchData().adSwitch)
        //     return false;
        // if(Laya.Browser.onQGMiniGame)
        // {
        //     if(AppSwitchConfig.getInstance().getAppSwitchData().oppocfg.oppoversions != AppConfig.Versions)
        //     {
        //         return false;
        //     }
        // }
        // var mailiang = AppSwitchConfig.getInstance().getAppSwitchData().mailiang;
        // var mailianglist = AppSwitchConfig.getInstance().getAppSwitchData().mailianglist;
        // var mailiangscenelist = AppSwitchConfig.getInstance().getAppSwitchData().mailiangSceneList;
        // if(1 == mailiang)
        // {
        //     var flag : number = null;
        //     var scene : number = null;
        //     if(Laya.Browser.onMiniGame)
        //     {
        //         flag = WXAPI.getLaunchOptionsSync().query['chid'];
        //         scene  = WXAPI.getLaunchOptionsSync().scene;             
        //     }
        //     else if(Laya.Browser.onQQMiniGame)
        //     {
        //         flag  = QQMiniGameAPI.getLaunchOptionsSync().query['chid'];
        //         scene  = QQMiniGameAPI.getLaunchOptionsSync().scene;
        //     }
        //     if(null != flag && null != mailianglist && mailianglist.length > 0)
        //     {
        //         for(var i=0;i < mailianglist.length;++i)
        //         {
        //             if(flag == mailianglist[i])
        //             {
        //                 return false;
        //             }
        //         }
        //     }
        //     if(null != scene && null != mailiangscenelist && mailiangscenelist.length > 0)
        //     {
        //         for(var i=0;i < mailiangscenelist.length;++i)
        //         {
        //             if(scene == mailiangscenelist[i])
        //             {
        //                 return false;
        //             }
        //         }
        //     }   
        // }
        return true;
    };
    ShareAd.sortDatas = function (datas) {
        // if (null == datas || 0 == datas.length)
        //     return [];
        // let dataDic: { [appid: string]: any[] } = {};
        // let keys = new Array<string>();
        // for (let i = 0; i < datas.length; ++i) {
        //     let data = datas[i];
        //     if (dataDic[data.appid] == null) {
        //         dataDic[data.appid] = new Array();
        //         dataDic[data.appid].push(data);
        //         keys.push(data.appid);
        //     } else {
        //         dataDic[data.appid].push(data);
        //     }
        // }
        // for (let i = 0; i < keys.length; ++i)  {
        //     let key = keys[i];
        //     let randomIndex = Math.floor(Math.random() * keys.length);
        //     let temp = keys[randomIndex];
        //     keys[randomIndex] = key;
        //     keys[i] = temp;
        // }
        // for (let i = 0; i < keys.length; ++i)  {
        //     let key = keys[i];
        //     let dataArray = dataDic[key];
        //     for (let j = 0; j < dataArray.length; ++j)  {
        //         let data = dataArray[j];
        //         let randomIndex = Math.floor(Math.random() * dataArray.length);
        //         let temp = dataArray[randomIndex];
        //         dataArray[randomIndex] = data;
        //         dataArray[j] = temp;
        //     }
        // }
        var res = new Array();
        // let ignores = [];
        // while(keys.length > 0)
        // {
        //     let isComplate = true;
        //     for(let i=0;i < keys.length;++i)
        //     {
        //         let key = keys[i];
        //         let isOk = true;
        //         for(let j=0;j < ignores.length;++j)
        //         {
        //             let ignore = ignores[j];
        //             if(ignore == key)
        //             {
        //                 isOk = false;
        //                 break;
        //             }
        //         }
        //         if(isOk)
        //         {
        //             isComplate = false;
        //             let data = dataDic[key].shift();
        //             res.push(data);
        //             ignores.push(key);
        //             if(ignores.length > 3)
        //             {
        //                 ignores.shift();
        //             }
        //             if(dataDic[key].length <= 0)
        //             {
        //                 keys.splice(i,1);
        //                 --i;
        //                 continue;
        //             }
        //         }
        //         else
        //         {
        //             continue;
        //         }
        //     }
        //     if(isComplate)
        //     {
        //         for (let j = 0; j < keys.length; ++j)  
        //         {
        //             let key = keys[j];
        //             let isOk = true;
        //             let dataArray = dataDic[key];
        //             ignores.splice(0);
        //             for(let h=0;h < dataArray.length;++h)
        //             {
        //                 let data = dataArray[h];
        //                 for (let i = 0; i < res.length; ++i) 
        //                 {
        //                     ignores.push(null == res[i - 2] ? null : res[i - 2].appid);
        //                     ignores.push(null == res[i - 1] ? null : res[i - 1].appid);
        //                     ignores.push(null == res[i] ? null : res[i].appid);
        //                     ignores.push(null == res[i + 1] ? null : res[i + 1].appid);
        //                     ignores.push(null == res[i + 2] ? null : res[i + 2].appid);
        //                     for(let k=0;k < ignores.length;++k)
        //                     {
        //                         let ignore = ignores[k];
        //                         if(null != ignore && ignore == key)
        //                         {
        //                             isOk = false;
        //                             break;
        //                         }
        //                     }
        //                     if(isOk)
        //                     {
        //                         if (null != data) {
        //                             let f = res.slice(0, i + 1);
        //                             let b = res.slice(i + 1, res.length);
        //                             res = f;
        //                             res.push(data);
        //                             for (let a = 0; a < b.length; ++a) {
        //                                 res.push(b[a]);
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //         break;
        //     }
        //     for (let i = 0; i < keys.length; ++i)  {
        //         let key = keys[i];
        //         let randomIndex = Math.floor(Math.random() * keys.length);
        //         let temp = keys[randomIndex];
        //         keys[randomIndex] = key;
        //         keys[i] = temp;
        //     }
        // }
        return res;
    };
    ShareAd.mainUrl = "";
    ShareAd.getAdPostion = ""; //获取广告位列表
    ShareAd.getAdv = ""; //获取第三方广告列表
    ShareAd.userClick = ""; //用户点击上报
    ShareAd.LoopAdLocationID = 281;
    ShareAd.BannerAdLocationID = 279;
    ShareAd.InsertAdLocationID = -1;
    ShareAd.AniAdLocationID = -1;
    ShareAd.HistoryLocationID = 280;
    ShareAd.MoreGameLocationID = 282;
    ShareAd.UseRandomAdPos = false;
    ShareAd.AdLocationids = [];
    ShareAd._adPosition = {};
    ShareAd._adv = {};
    ShareAd._iphoneIgnoreAppIds = [];
    return ShareAd;
}());
exports.default = ShareAd;
},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("./AppConfig");
var ViewMgr_1 = require("./Mgr/ViewMgr");
var HttpUnit_1 = require("./Net/HttpUnit");
var TTAPI = /** @class */ (function () {
    function TTAPI() {
    }
    TTAPI.ttLogin = function (onSuccess, onFail) {
        if (AppConfig_1.default.onTTMiniGame) {
            Laya.Browser.window["tt"].login({
                force: false,
                success: function (res) {
                    console.log("登陆成功1");
                    var code = res.code;
                    if (code) {
                        onSuccess(code);
                    }
                    else {
                        console.log("用户没有登陆，采用临时code");
                        onFail();
                    }
                },
                fail: function () {
                    console.log("登陆失败1");
                    onFail();
                },
            });
            TTAPI.initRecord();
        }
    };
    TTAPI.onRewardedVideoAdLoad = function () {
        console.log('激励视频 广告加载完成');
    };
    TTAPI.onRewardedVideoAdError = function (err) {
        console.log('激励视频 广告加载失败' + err);
        if (TTAPI._onRewardedVideoAdFailed) {
            TTAPI._onRewardedVideoAdFailed();
        }
    };
    TTAPI.onRewardedVideoAdClose = function (res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看');
            if (TTAPI._onRewardedVideoAdClose) {
                TTAPI._onRewardedVideoAdClose(true);
            }
        }
        else {
            console.log('激励视频 未完整观看');
            if (TTAPI._onRewardedVideoAdClose) {
                TTAPI._onRewardedVideoAdClose(false);
            }
        }
    };
    TTAPI.regRewardedVideoAdEvent = function (rewardedVideoAd) {
        rewardedVideoAd.onLoad(TTAPI.onRewardedVideoAdLoad);
        rewardedVideoAd.onError(TTAPI.onRewardedVideoAdError);
        rewardedVideoAd.onClose(TTAPI.onRewardedVideoAdClose);
        TTAPI._isRegRewardedVideoAdEvent = true;
    };
    TTAPI.showRewardedVideoAd = function (onAdClose, onFailed) {
        if (AppConfig_1.default.onTTMiniGame) {
            TTAPI._onRewardedVideoAdClose = onAdClose;
            TTAPI._onRewardedVideoAdFailed = onFailed;
            var rewardedVideoAd = Laya.Browser.window["tt"].createRewardedVideoAd({
                adUnitId: TTAPI.adUnitId,
            });
            if (!TTAPI._isRegRewardedVideoAdEvent) {
                TTAPI.regRewardedVideoAdEvent(rewardedVideoAd);
            }
            rewardedVideoAd.load().then(function () {
                var promise = rewardedVideoAd.show();
                promise.then(function () { return console.log('激励视频 广告显示成功'); });
                promise.catch(function (err) {
                    rewardedVideoAd.load()
                        .then(function () { return rewardedVideoAd.show(); })
                        .catch(function (err) {
                        console.log('激励视频 广告显示失败');
                        if (onFailed) {
                            onFailed();
                        }
                    });
                });
            }).catch(function (err) {
                console.log('激励视频 广告加载失败');
                if (onFailed) {
                    onFailed();
                }
            });
        }
        else {
            onAdClose(true);
        }
    };
    //----------------------------------------------------------------
    //-------------------------小游戏跳转---------------------------TODO
    // public static navigateToMiniProgram(appId: string, path: string, onSuccess: Function, onFail: Function, onComplate: Function) {
    //     if (Laya.Browser.onMiniGame) {
    //         console.log("跳转游戏： " + appId);
    //         Laya.Browser.window["tt"].navigateToMiniProgram(
    //             {
    //                 appId: appId,
    //                 path: path,
    //                 extraData: {
    //                     foo: 'bar'
    //                 },
    //                 envVersion: 'release',
    //                 success(res) {
    //                     if (onSuccess) {
    //                         onSuccess(res)
    //                     }
    //                 },
    //                 fail(res) {
    //                     if (onFail) {
    //                         onFail(res)
    //                     }
    //                 },
    //                 complete(res) {
    //                     if (onComplate) {
    //                         onComplate(res)
    //                     }
    //                 }
    //             })
    //     }
    // }
    //-------------------------------------------------------------
    //-------------------录屏-------------------------------------------
    /**
     * 配置录屏
     */
    TTAPI.initRecord = function () {
        TTAPI.record = Laya.Browser.window["tt"].getGameRecorderManager();
        if (TTAPI.record != null) {
            TTAPI.record.onStart(function (res) {
                console.log("录屏开始");
                TTAPI.recordRes = "";
            });
            TTAPI.record.onStop(function (res) {
                console.log("录屏结束");
                TTAPI.recordRes = res.videoPath;
            });
        }
    };
    /**
     * 开始录屏
     */
    TTAPI.startRecord = function (duration) {
        if (duration === void 0) { duration = 300; }
        if (!AppConfig_1.default.onTTMiniGame)
            return;
        TTAPI.record.start({
            duration: duration
        });
    };
    /**
    * 停止录屏
    */
    TTAPI.stopRecord = function () {
        if (!AppConfig_1.default.onTTMiniGame)
            return;
        TTAPI.record.stop();
    };
    //----------------------------------------------------------------------
    //---------------------分享录屏----------------------------------------
    TTAPI.shareRecord = function (callback, Failcallback) {
        if (callback === void 0) { callback = null; }
        if (Failcallback === void 0) { Failcallback = null; }
        if (!AppConfig_1.default.onTTMiniGame)
            return;
        if (TTAPI.recordRes != "") {
            window["tt"].shareAppMessage({
                channel: "video",
                extra: {
                    videoPath: TTAPI.recordRes,
                    videoTopics: [AppConfig_1.default.GameName]
                },
                success: function () {
                    if (callback != null) {
                        callback();
                    }
                    console.log("分享视频成功");
                },
                fail: function (e) {
                    console.log("分享视频失败");
                    if (Failcallback != null) {
                        Failcallback();
                    }
                }
            });
        }
        else {
            if (Failcallback != null) {
                Failcallback();
            }
            console.log("分享视频为空");
        }
    };
    //----------------------------------------------------------------------
    //----------------------------------------------------------------------
    //---------------------分享好友----------------------------------------
    TTAPI.share = function (complate) {
        if (complate === void 0) { complate = null; }
        if (!AppConfig_1.default.onTTMiniGame)
            return;
        window["tt"].shareAppMessage({
            templateId: this._templateId,
            success: function () {
                if (complate != null) {
                    complate();
                }
            },
            fail: function () {
                console.log("分享失败");
            }
        });
    };
    //------------------------------------------------------------------
    //-------------------------banner-------------------------------------------
    TTAPI.showBanner = function () {
        if (!AppConfig_1.default.onTTMiniGame || this.bannerAdUnitId.length <= 0)
            return;
        if (!TTAPI._banner) {
            var _a = Laya.Browser.window["tt"].getSystemInfoSync(), windowWidth_1 = _a.windowWidth, windowHeight_1 = _a.windowHeight;
            var targetBannerAdWidth = 150;
            // 创建一个居于屏幕底部正中的广告
            TTAPI._banner = Laya.Browser.window["tt"].createBannerAd({
                adUnitId: TTAPI.bannerAdUnitId,
                adIntervals: 30,
                style: {
                    width: targetBannerAdWidth,
                    top: windowHeight_1 - (targetBannerAdWidth / 16) * 9,
                }
            });
            TTAPI._banner.onResize(function (size) {
                console.log(size.width, size.height);
                TTAPI._banner.style.top = windowHeight_1 - size.height;
                TTAPI._banner.style.left = (windowWidth_1 - size.width) / 2;
            });
        }
        TTAPI._banner.show();
    };
    TTAPI.hideBanner = function () {
        if (null != TTAPI._banner) {
            TTAPI._banner.hide();
        }
    };
    TTAPI.showMoreGamesModal = function (onSuccess, onFail) {
        var systemInfo = Laya.Browser.window["tt"].getSystemInfoSync();
        // iOS 不支持，建议先检测再使用
        if (systemInfo.platform !== "ios") {
            // 打开互跳弹窗
            Laya.Browser.window["tt"].showMoreGamesModal({
                appLaunchOptions: [
                    {
                        appId: AppConfig_1.default.AppID,
                        query: "foo=bar&baz=qux",
                        extraData: {}
                    }
                    // {...}
                ],
                success: function (res) {
                    console.log("success", res.errMsg);
                    if (onSuccess) {
                        onSuccess();
                    }
                },
                fail: function (res) {
                    console.log("fail", res.errMsg);
                    if (onFail) {
                        onFail();
                    }
                }
            });
        }
        else {
            if (onFail) {
                onFail();
            }
        }
    };
    //自动弹出签到界面，如果可以签到则弹出签到界面并回调参数 true，如果不可以签到则不弹出签到界面并回调参数 false
    TTAPI.autoOpenSignInView = function (complate) {
        HttpUnit_1.default.GetSignIn(function (res) {
            var isSign = res.data.is_sign;
            var signDays = res.data.sign_day_num;
            if (isSign == 0) {
                ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.TTSignInView, null, function () {
                    complate(true);
                });
            }
            else {
                complate(false);
            }
        }, function () {
            complate(false);
        });
    };
    TTAPI.adUnitId = "";
    TTAPI.bannerAdUnitId = "";
    TTAPI.InsAdUnitId = "";
    TTAPI._templateId = ""; //分享素材id
    TTAPI.recordRes = "";
    TTAPI._banner = null;
    //-------------------------激励视频---------------------------------
    TTAPI._isRegRewardedVideoAdEvent = false;
    TTAPI._onRewardedVideoAdFailed = null;
    TTAPI._onRewardedVideoAdClose = null;
    return TTAPI;
}());
exports.default = TTAPI;
},{"./AppConfig":2,"./Mgr/ViewMgr":21,"./Net/HttpUnit":26}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
//游戏数据,为保持版本兼容，建议不要删除和修改字段名
var UserGameData = /** @class */ (function () {
    function UserGameData() {
        this.levelNum = 1; //当前关卡
        this.moneyNum = 0; //金币数量
        this.crystalNum = 0; //钻石数量
        this.unlockedItem = []; //道具当前解锁的索引
        this.usedItem = -1; //当前使用的道具索引
    }
    return UserGameData;
}());
exports.UserGameData = UserGameData;
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(User, "isLogin", {
        get: function () {
            return (User.code != "") || (User.token != "");
        },
        enumerable: true,
        configurable: true
    });
    User.getSaveData = function () {
        return JSON.stringify(User._gameData);
    };
    User.testInitUser = function () {
        var storageStr = localStorage.getItem("Game_Data");
        console.log("读取存储数据 str----" + storageStr);
        var data = JSON.parse(storageStr);
        if (data == null) {
            User._gameData.levelNum = 1;
            User._gameData.moneyNum = 100;
            User._gameData.crystalNum = 100;
            return;
        }
        User._gameData.levelNum = data.levelNum;
        User._gameData.moneyNum = data.moneyNum;
        User._gameData.crystalNum = data.crystalNum;
        if (null != data.unlockedItem) {
            var unlockedItem = data.unlockedItem;
            for (var i = 0; i < unlockedItem.length; ++i) {
                User._gameData.unlockedItem.push(unlockedItem[i]);
            }
        }
        if (null != data.usedItem) {
            User._gameData.usedItem = data.usedItem;
        }
    };
    User.initiUser = function (data) {
        if (data && 0 != data) {
            User._gameData.levelNum = data.levelNum;
            User._gameData.moneyNum = data.moneyNum;
            User._gameData.crystalNum = data.crystalNum;
            if (null != data.unlockedItem) {
                var unlockedItem = data.unlockedItem;
                for (var i = 0; i < unlockedItem.length; ++i) {
                    User._gameData.unlockedItem.push(unlockedItem[i]);
                }
            }
            if (null != data.usedItem) {
                User._gameData.usedItem = data.usedItem;
            }
        }
        else {
            //todo：处理没有获取到玩家数据的情况
        }
    };
    User.setLeveNum = function (levelNum) {
        User._gameData.levelNum = levelNum;
    };
    User.getLeveNum = function () {
        return User._gameData.levelNum;
    };
    User.addMoney = function (add) {
        add = Math.ceil(add);
        var last = User._gameData.moneyNum;
        User._gameData.moneyNum += add;
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnUserMoneyChange, {
            curr: User._gameData.moneyNum,
            last: last
        });
    };
    User.subMoney = function (sub) {
        sub = Math.ceil(sub);
        var last = User._gameData.moneyNum;
        User._gameData.moneyNum -= sub;
        if (User._gameData.moneyNum < 0) {
            User._gameData.moneyNum = 0;
        }
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnUserMoneyChange, {
            curr: User._gameData.moneyNum,
            last: last
        });
    };
    User.getMoney = function () {
        return User._gameData.moneyNum;
    };
    User.addCrystal = function (add) {
        add = Math.ceil(add);
        var last = User._gameData.crystalNum;
        User._gameData.crystalNum += add;
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnUserCrystalChange, {
            curr: User._gameData.crystalNum,
            last: last
        });
    };
    User.subCrystal = function (sub) {
        sub = Math.ceil(sub);
        var last = User._gameData.crystalNum;
        User._gameData.crystalNum -= sub;
        if (User._gameData.crystalNum < 0) {
            User._gameData.crystalNum = 0;
        }
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnUserCrystalChange, {
            curr: User._gameData.crystalNum,
            last: last
        });
    };
    User.getCrystal = function () {
        return User._gameData.crystalNum;
    };
    //获取当前商店解锁的道具
    User.getItemUnlocked = function () {
        var unlocked = new Array();
        for (var i = 0; i < User._gameData.unlockedItem.length; ++i) {
            unlocked.push(User._gameData.unlockedItem[i]);
        }
        return unlocked;
    };
    //商店道具是否解锁
    User.itemIsUnlocked = function (id) {
        for (var i = 0; i < User._gameData.unlockedItem.length; ++i) {
            if (User._gameData.unlockedItem[i] == id) {
                return true;
            }
        }
        return false;
    };
    //解锁商店道具
    User.unlockItem = function (id) {
        if (User.itemIsUnlocked(id)) {
            console.log("商店重复解锁 id : ", id);
            return;
        }
        User._gameData.unlockedItem.push(id);
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnUserUnlockedStore, { unlocked: id });
    };
    Object.defineProperty(User, "curUsedItem", {
        //当前正在使用的道具
        get: function () {
            return User._gameData.usedItem;
        },
        //当前正在使用的道具
        set: function (value) {
            User._gameData.usedItem = value;
        },
        enumerable: true,
        configurable: true
    });
    User.code = "";
    User.openId = "";
    User.token = null;
    User.nickName = "";
    User.gender = 0;
    User._gameData = new UserGameData();
    return User;
}(Laya.Script));
exports.default = User;
},{"../Event/EventDef":7,"../Event/EventMgr":8}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utilit = /** @class */ (function () {
    function Utilit() {
    }
    Utilit.Lerp = function (form, to, delta) {
        if (form == to)
            return to;
        if (form > to) {
            var next = form - delta;
            if (next <= to)
                return to;
            return next;
        }
        else if (form < to) {
            var next = form + delta;
            if (next >= to)
                return to;
            return next;
        }
    };
    Utilit.lerpEulerAngle = function (form, to, delta) {
        var form = form % 360;
        form = form >= 0 ? form : (360 + form);
        var to = to % 360;
        to = to >= 0 ? to : (360 + to);
        var dis = Math.abs(to - form);
        if (dis > 180) {
            if (form < to)
                to = to - 360;
            else if (form > to)
                to = to + 360;
        }
        var next = Utilit.Lerp(form, to, delta);
        return next;
    };
    Utilit.getRotationByDir = function (v) {
        var dotValue = (v.x * Utilit.poinDown.x) + (v.y * Utilit.poinDown.y);
        var cos = dotValue / (v.distance(0, 0) * Utilit.poinDown.distance(0, 0));
        var radian = Math.acos(cos);
        var rotation = radian / (2 * Math.PI) * 360;
        if (v.x < 0) {
            rotation = -rotation;
        }
        return rotation;
    };
    Utilit.getRotationByDirOn3DSpace = function (v) {
        var dotValue = (v.x * Utilit.poinUp.x) + (v.y * Utilit.poinUp.y);
        var cos = dotValue / (v.distance(0, 0) * Utilit.poinUp.distance(0, 0));
        var radian = Math.acos(cos);
        var rotation = radian / (2 * Math.PI) * 360;
        if (v.x < 0) {
            rotation = rotation + (180 - rotation) * 2;
        }
        return rotation;
    };
    Utilit.getDirByRotation = function (rotation) {
        var radian = (rotation - 90) * Math.PI / 180; // -90 是转换到场景坐标系
        var x = Math.cos(radian);
        var y = Math.sin(radian);
        var point = new Laya.Point(x, y);
        point.normalize();
        return point;
    };
    Utilit.getDirDirAngle = function (dir1, dir2) {
        var dotValue = (dir1.x * dir2.x) + (dir1.y * dir2.y);
        var cos = dotValue / (dir1.distance(0, 0) * dir2.distance(0, 0));
        var radian = Math.acos(cos);
        var angle = radian / (2 * Math.PI) * 360;
        return angle;
    };
    Utilit.getDirScalarLength = function (dir) {
        var sl = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        return sl;
    };
    Utilit.setSpOnParentCenter = function (sp) {
        if (null == sp.parent)
            return;
        var psp = sp.parent;
        var x = 0;
        var y = 0;
        var x = x - sp.width / 2 * sp.scaleX + psp.width / 2;
        var y = y - sp.height / 2 * sp.scaleY + psp.height / 2;
        sp.x = x;
        sp.y = y;
    };
    Utilit.getPointToLineDistance = function (x, y, LineStart, LineEnd) {
        var toStartDir = new Laya.Point(x - LineStart.x, y - LineStart.y);
        var toEndDir = new Laya.Point(x - LineEnd.x, y - LineEnd.y);
        var lineDir = new Laya.Point(LineEnd.x - LineStart.y, LineEnd.y - LineStart.y);
        var dotToStartDir = (lineDir.x * toStartDir.x) + (lineDir.y * toStartDir.y);
        if (dotToStartDir <= 0) {
            return toStartDir.distance(0, 0);
        }
        var dotToEndDir = (lineDir.x * toEndDir.x) + (lineDir.y * toEndDir.y);
        if (dotToEndDir <= 0) {
            return toEndDir.distance(0, 0);
        }
        var toStartDis = toStartDir.distance(0, 0);
        var lineDirDis = lineDir.distance(0, 0);
        var cos = dotToStartDir / (toStartDis * lineDirDis);
        var radians = Math.acos(cos);
        var dis = Math.sin(radians) * toStartDis;
        return dis;
    };
    Utilit.isIphoneX = function () {
        if (!Laya.Browser.onIPhone)
            return false;
        if ((Laya.Browser.width == 2436 && Laya.Browser.height == 1125)
            || (Laya.Browser.height == 2436 && Laya.Browser.width == 1125)) {
            return true;
        }
        return false;
    };
    Utilit.isIphone = function () {
        return Laya.Browser.onIPhone;
    };
    Utilit.getChild = function (node, name) {
        for (var i = 0; i < node.numChildren; ++i) {
            var child = node.getChildAt(i);
            if (child.name == name) {
                return child;
            }
            else {
                var target = Utilit.getChild(child, name);
                if (target)
                    return target;
            }
        }
        return null;
    };
    Utilit.forEachChild = function (node, each) {
        for (var i = 0; i < node.numChildren; ++i) {
            var child = node.getChildAt(i);
            each(child);
            Utilit.forEachChild(child, each);
        }
    };
    Utilit.OriginStageWidth = 1334;
    Utilit.OriginStageHeight = 750;
    Utilit.grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0, 0, 0, 1, 0];
    Utilit.grayscaleFilter = new Laya.ColorFilter(Utilit.grayscaleMat);
    Utilit.poinDown = new Laya.Point(0, -1);
    Utilit.poinUp = new Laya.Point(0, 1);
    return Utilit;
}());
exports.default = Utilit;
},{}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("./AppConfig");
var SoundMgr_1 = require("./Mgr/SoundMgr");
var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
var AppConfig_2 = require("./AppConfig");
var ViewMgr_1 = require("./Mgr/ViewMgr");
var VIVOAPI = /** @class */ (function () {
    function VIVOAPI() {
    }
    Object.defineProperty(VIVOAPI, "BannerInstance", {
        get: function () {
            return this._banner;
        },
        enumerable: true,
        configurable: true
    });
    VIVOAPI.Login = function (onSuccess, onFail) {
        if (Laya.Browser.window["qg"].getSystemInfoSync().platformVersionCode >= 1053) {
            console.log("vivo 开始登陆 >= 1053");
            Laya.Browser.window["qg"].login().then(function (res) {
                if (res.data.token) {
                    var token = res.data.token;
                    onSuccess(token, true);
                    console.log("vivo 登陆成功,获取到 token : " + token);
                }
                else {
                    console.log('登录失败 res.data.token 为 null');
                    onFail();
                }
            }, function (err) {
                console.log('登录失败' + JSON.stringify(err));
                onFail();
            });
        }
        else {
            console.log("vivo 开始登陆 < 1053");
            Laya.Browser.window["qg"].authorize({
                type: "token",
                success: function (data) {
                    // 使用token进行服务端对接
                    Laya.Browser.window["qg"].getProfile({
                        token: data.accessToken,
                        success: function (data) {
                            console.log('openid获取成功', data.openid);
                            onSuccess(data.openid, false);
                        },
                        fail: function (data, code) {
                            console.log("获取openid失败 : " + code);
                            onFail();
                        }
                    });
                },
                fail: function (data, code) {
                    console.log('登录失败' + code);
                    onFail();
                }
            });
        }
    };
    //提示弹窗
    VIVOAPI.showDialog = function (titel, message, buttons, success, cancel, fail) {
        Laya.Browser.window["qg"].showDialog({
            title: titel,
            message: message,
            buttons: buttons,
            success: function (data) {
                console.log('handling callback');
                success();
            },
            cancel: function () {
                console.log('handling cancel');
                cancel();
            },
            fail: function (data, code) {
                console.log("handling fail, code = " + code);
                fail();
            }
        });
    };
    //创建视频广告
    VIVOAPI.createRewardedVideoAd = function () {
        if (Laya.Browser.onVVMiniGame) {
            VIVOAPI.rewardedAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: VIVOAPI.adUnitId,
                style: {}
            });
            VIVOAPI.rewardedAd.onError(function (err) {
                switch (err.errCode) {
                    case -3:
                        console.log("激励广告加载失败---调用太频繁", JSON.stringify(err));
                        break;
                    case -4:
                        console.log("激励广告加载失败--- 一分钟内不能重复加载", JSON.stringify(err));
                        break;
                    case 30008:
                        // 当前启动来源不支持激励视频广告，请选择其他激励策略
                        break;
                    default:
                        // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                        console.log("激励广告展示失败");
                        console.log(JSON.stringify(err));
                        break;
                }
            });
        }
    };
    //显示视频广告
    VIVOAPI.showRewardedVideoAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onVVMiniGame) {
            SoundMgr_1.default.instance.stopBGM();
            console.log("---------------------------------- VIVOAPI.rewardedAd:", VIVOAPI.rewardedAd + ",VIVOAPI.rewardedAdNum:", VIVOAPI.rewardedAdNum);
            // if (VIVOAPI.rewardedAd == null) {
            //     onFailed();
            //     return;
            // }
            if (VIVOAPI.rewardedAdNum == 0) {
                VIVOAPI.createRewardedVideoAd();
            }
            else {
                // 第一次creat后广告可以在onload里面直接show
                // 后续的加载必须要load才能触发onload接着才能show出广告
                var adLoad = VIVOAPI.rewardedAd.load(); //第一次调用 可能会报-3  广告能正常展示就可以忽略
                // 捕捉load失败的错误
                adLoad && adLoad.catch(function (err) {
                    console.log("激励广告load失败" + JSON.stringify(err));
                    onFailed();
                });
            }
            VIVOAPI.rewardedAdNum = 1;
            console.log("近来showRewardedVideoAd");
            VIVOAPI.rewardedAd.onLoad(function () {
                var adshow = VIVOAPI.rewardedAd.show();
                // 捕捉show失败的错误
                adshow && adshow.then(function () {
                    console.log("激励广告展示成功");
                }).catch(function (err) {
                    console.log("激励广告展示失败" + JSON.stringify(err));
                    onFailed();
                });
            });
            VIVOAPI.rewardedAd.onClose(function (res) {
                if (res && res.isEnded) {
                    console.log("正常播放结束，可以下发游戏奖励");
                    onAdClose(true);
                }
                else {
                    console.log("播放中途退出，不下发游戏奖励");
                    onAdClose(false);
                }
            });
        }
    };
    VIVOAPI.showBannerAd = function () {
        var self = this;
        if (Laya.Browser.onVVMiniGame) {
            console.log('===========bannerAd showBanerAd');
            var systemInfo = Laya.Browser.window["qg"].getSystemInfoSync();
            var sw = systemInfo.screenWidth;
            var sh = systemInfo.screenHeight;
            this.mBannerAd = qg.createBannerAd({
                posId: VIVOAPI.bannerAdUnitId,
                style: {}
            });
            var adshow = this.mBannerAd.show();
            // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
            adshow && adshow.then(function () {
                console.log("banner广告展示成功");
            }).catch(function (err) {
                switch (err.code) {
                    case 30003:
                        console.log("新用户7天内不能曝光Banner，请将手机时间调整为7天后，退出游戏重新进入");
                        break;
                    case 30009:
                        console.log("10秒内调用广告次数超过1次，10秒后再调用");
                        // setTimeout(() => {
                        //     show()
                        // }, 10000);
                        break;
                    case 30002:
                        console.log("加载广告失败，重新加载广告");
                        // setTimeout(() => {
                        //     retryShow()
                        // }, 10000);             
                        break;
                    default:
                        // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                        console.log("banner广告展示失败");
                        console.log(JSON.stringify(err));
                        break;
                }
            });
            this.mBannerAd.onError(function (err) {
                console.log('Banner广告加载失败111:' + JSON.stringify(err));
            });
        }
    };
    VIVOAPI.hideBannerAd = function () {
        if (this.mBannerAd) {
            console.log('===========bannerAd 隐藏');
            this.mBannerAd.hide();
            this.mBannerAd.destroy();
            this.mBannerAd = null;
        }
        else {
            console.log('===========bannerAd 为空');
        }
    };
    VIVOAPI.navigateToMiniProgram = function (pkgName, path, onSuccess, onFail, onComplate) {
        if (Laya.Browser.onVVMiniGame) {
            console.log("vivo 跳转游戏： " + pkgName);
            Laya.Browser.window["qg"].navigateToMiniGame({
                pkgName: pkgName,
                path: path,
                extraData: {
                    from: AppConfig_1.default.AppID
                },
                envVersion: 'release',
                success: function (res) {
                    if (onSuccess) {
                        onSuccess(res);
                    }
                },
                fail: function (res) {
                    if (onFail) {
                        onFail(res);
                    }
                },
                complete: function (res) {
                    if (onComplate) {
                        onComplate(res);
                    }
                }
            });
        }
    };
    VIVOAPI.showInterstitialAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onVVMiniGame) {
            var insertAd = Laya.Browser.window["qg"].createInterstitialAd({
                posId: VIVOAPI.InsAdUnitId
            });
            insertAd.onLoad(function () {
                console.log("插屏广告加载完成");
            });
            insertAd.onClose(function () {
                if (onAdClose)
                    onAdClose();
            });
            insertAd.onError(function (err) {
                console.log("插屏广告拉取失败", JSON.stringify(err));
                if (onFailed) {
                    onFailed();
                }
            });
            insertAd.show().then(function () {
                console.log("插屏广告显示成功");
            }).catch(function (err) {
                if (onFailed)
                    onFailed();
            });
        }
        else {
            if (onAdClose)
                onAdClose();
        }
    };
    VIVOAPI.getLaunchOptionsSync = function () {
        return {};
    };
    VIVOAPI.share = function (complate) {
        if (Laya.Browser.onVVMiniGame) {
            Laya.Browser.window["qg"].share({
                success: function () {
                    if (complate != null) {
                        complate(true);
                    }
                    Laya.Browser.window["qg"].showToast({
                        message: "分享成功"
                    });
                },
                fail: function (erromsg, errocode) {
                    // Laya.Browser.window["qg"].showToast({
                    //     message: "分享失败：" + errocode + ': ' + erromsg
                    // })
                    Laya.Browser.window["qg"].showToast({
                        message: "分享失败"
                    });
                },
                cancel: function () {
                    Laya.Browser.window["qg"].showToast({
                        message: "分享失败"
                    });
                },
                complete: function () {
                }
            });
        }
    };
    VIVOAPI.createDesktopIcon = function (onSuccess, onFail) {
        if (Laya.Browser.onVVMiniGame) {
            Laya.Browser.window["qg"].hasShortcutInstalled({
                success: function (res) {
                    if (res == false) {
                        Laya.Browser.window["qg"].installShortcut({
                            success: function () {
                                if (onSuccess) {
                                    onSuccess();
                                }
                            },
                            fail: function (err) {
                                if (onFail) {
                                    onFail();
                                }
                                console.log("创建桌面图标失败！！！！", err);
                                for (var key in err) {
                                    console.log(key, err);
                                }
                            },
                            complete: function () {
                            }
                        });
                    }
                    else {
                        console.log("桌面图标已存在！！！！");
                        if (onFail) {
                            onFail();
                        }
                    }
                },
                fail: function (err) {
                    if (onFail) {
                        onFail();
                    }
                    console.log("判断桌面图标是否存在失败！！！", err);
                    for (var key in err) {
                        console.log(key, err);
                    }
                },
                complete: function () {
                }
            });
        }
        else {
            if (onFail) {
                onFail();
            }
        }
    };
    //显示vivo原生界面(过时接口，不要使用)
    VIVOAPI.showNativeAd = function (onSuccess, onFail, index) {
        if (1 == index) {
            VIVOAPI.tryShowNativeAd1(onSuccess, onFail);
        }
        else if (2 == index) {
            VIVOAPI.tryShowNativeAd2(onSuccess, onFail);
        }
    };
    //尝试打开原生广告1
    VIVOAPI.tryShowNativeAd1 = function (onSuccess, onFail) {
        if (!Laya.Browser.onVVMiniGame) {
            if (null != onFail) {
                onFail();
            }
            return;
        }
        var success = function () {
            if (null != onSuccess) {
                onSuccess();
            }
        };
        var yuanshengSwitch = AppSwitchConfig_1.default.getInstance().getAppSwitchData().vivocfg.yuanshengSwitch;
        var vivoVersions = AppSwitchConfig_1.default.getInstance().getAppSwitchData().vivocfg.vivoversions;
        if (1 == yuanshengSwitch && vivoVersions == AppConfig_2.default.Versions) {
            ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.VVNativeView1, null, function (v) {
                success();
            });
        }
        else {
            if (null != onFail) {
                onFail();
            }
        }
    };
    //尝试打开原生广告2
    VIVOAPI.tryShowNativeAd2 = function (onSuccess, onFail) {
        if (!Laya.Browser.onVVMiniGame) {
            if (null != onFail) {
                onFail();
            }
            return;
        }
        var success = function () {
            if (null != onSuccess) {
                onSuccess();
            }
        };
        var yuanshengSwitch = AppSwitchConfig_1.default.getInstance().getAppSwitchData().vivocfg.yuanshengSwitch2;
        var vivoVersions = AppSwitchConfig_1.default.getInstance().getAppSwitchData().vivocfg.vivoversions;
        if (1 == yuanshengSwitch && vivoVersions == AppConfig_2.default.Versions) {
            ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.VVNativeView2, null, function (v) {
                success();
            });
        }
        else {
            if (null != onFail) {
                onFail();
            }
        }
    };
    //尝试根据配置自动弹出创建图标确认框
    VIVOAPI.tryPopCreateDestopIcon = function (onSuccess, onFail) {
        if (!Laya.Browser.onVVMiniGame) {
            if (null != onFail) {
                onFail();
            }
            return;
        }
        if (1 == AppSwitchConfig_1.default.getInstance().getAppSwitchData().vivocfg.addToDesktop) {
            VIVOAPI.createDesktopIcon(onSuccess, onFail);
        }
        else {
            if (null != onFail) {
                onFail();
            }
        }
    };
    //尝试根据配置显示插屏广告
    VIVOAPI.tryShowInsAd = function (onSuccess, onFail) {
        var chapingSwitch = AppSwitchConfig_1.default.getInstance().getAppSwitchData().vivocfg.chapingSwitch;
        if (1 == chapingSwitch) {
            var rate = Math.random() * 100;
            if (rate <= AppSwitchConfig_1.default.getInstance().getAppSwitchData().vivocfg.chaping) {
                VIVOAPI.showInterstitialAd(function () {
                    if (onSuccess) {
                        onSuccess();
                    }
                }, function () {
                    if (onFail) {
                        onFail();
                    }
                });
            }
            else {
                if (onFail) {
                    onFail();
                }
            }
        }
        else {
            if (onFail) {
                onFail();
            }
        }
    };
    VIVOAPI.adUnitId = ""; //视频广告
    VIVOAPI.bannerAdUnitId = ""; //banner广告
    VIVOAPI.nativeAdId = ""; //原生广告
    VIVOAPI.InsAdUnitId = ""; //插屏广告
    VIVOAPI.rewardedAd = null;
    VIVOAPI.rewardedAdNum = 0;
    VIVOAPI._banner = null;
    VIVOAPI.mBannerAd = null;
    return VIVOAPI;
}());
exports.default = VIVOAPI;
},{"./AppConfig":2,"./Config/AppSwitchConfig":4,"./Mgr/SoundMgr":19,"./Mgr/ViewMgr":21}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SoundMgr_1 = require("../Mgr/SoundMgr");
var ButtonAnim = /** @class */ (function (_super) {
    __extends(ButtonAnim, _super);
    function ButtonAnim() {
        var _this = _super.call(this) || this;
        _this.useSound = true;
        return _this;
    }
    ButtonAnim.prototype.onAwake = function () {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.onDown);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.onUp);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.onUp);
    };
    ButtonAnim.prototype.onDisable = function () {
        this.owner.offAll();
        Laya.Tween.clearAll(this);
    };
    ButtonAnim.prototype.onDown = function () {
        Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
        if (this.useSound) {
            SoundMgr_1.default.instance.playSound("anniu");
        }
    };
    ButtonAnim.prototype.onUp = function () {
        Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
    };
    return ButtonAnim;
}(Laya.Script));
exports.default = ButtonAnim;
},{"../Mgr/SoundMgr":19}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewAutoScaleByW = /** @class */ (function (_super) {
    __extends(ViewAutoScaleByW, _super);
    function ViewAutoScaleByW() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewAutoScaleByW.prototype.onAwake = function () {
        var realW = Laya.stage.width;
        var scale = realW / ViewAutoScaleByW.baseWidth;
        var ps = this.owner;
        ps.scale(scale, scale);
    };
    ViewAutoScaleByW.baseWidth = 750;
    ViewAutoScaleByW.baseHeight = 1334;
    return ViewAutoScaleByW;
}(Laya.Script));
exports.default = ViewAutoScaleByW;
},{}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var User_1 = require("../../User/User");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var HorizontalLayout_1 = require("../../ParkingJam/Components/HorizontalLayout");
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.popAdFlag = false;
        return _this;
    }
    GameView.prototype.onAwake = function () {
        this.overLayer = this.owner.getChildByName("overLayer");
        var btnRefresh = this.owner.getChildByName("layerTop").getChildByName("btnRefresh");
        this.levelLayout = this.owner.getChildByName("layerTop").getChildByName("levelLayer").getComponent(HorizontalLayout_1.default);
        this.levelLayoutOver = this.overLayer.getChildByName("levelFontLayer").getComponent(HorizontalLayout_1.default);
        this.rewardLayout = this.overLayer.getChildByName("rewardLayer").getComponent(HorizontalLayout_1.default);
        this.guideHand = this.owner.getChildByName("guideHand");
        this.gold = this.owner.getChildByName("layerTop").getChildByName("rewardLayer").getChildByName("Text");
        this.gold.text = String(User_1.default.getMoney());
        btnRefresh.on(Laya.Event.MOUSE_UP, this, this._onClickRefresh);
        // this.horiLoopAd = this.owner.getChildByName("KRQ_HLoopAd") as Laya.UIComponent;
        // this.horiSrcTop = this.horiLoopAd.top;
        this.goldLayout = this.owner.getChildByName("layerTop").getChildByName("rewardLayer");
        // this.banner = this.owner.getChildByName("layerBottom").getChildByName("KRQ_Banner").getComponent(KRQ_Banner) as KRQ_Banner;
        this.btnStart = this.owner.getChildByName("btnStart");
        this.btnStart.on(Laya.Event.MOUSE_UP, this, this._onClickTouchStart);
    };
    GameView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_OnLevelComplate, this, this.gameOver);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_OnLevelStart, this, this.gameStart);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_OnUserMoneyChange, this, this.moneyChange);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_Guide, this, this.gameGuide);
        // EventMgr.instance.regEvemt(EventDef.AD_HoriBanner_Enable, this, this.horiBannerListener);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_OnViewOpen, this, this._viewOpenListner);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_OnViewClose, this, this._viewCloseListner);
    };
    GameView.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        this.levelLayout.setNum(User_1.default.getLeveNum());
    };
    GameView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_OnLevelComplate, this, this.gameOver);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_OnLevelStart, this, this.gameStart);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_OnUserMoneyChange, this, this.moneyChange);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_Guide, this, this.gameGuide);
        // EventMgr.instance.removeEvent(EventDef.AD_HoriBanner_Enable, this, this.horiBannerListener);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_OnViewOpen, this, this._viewOpenListner);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_OnViewClose, this, this._viewCloseListner);
    };
    GameView.prototype._onClickTouchStart = function () {
        this.btnStart.visible = false;
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_TouchStart);
        // let self = this;
        // let randomGold = Utils.getInstance().randomRange(50, 100);
        // let str = "恭喜获得" + randomGold + "金币";
        // WXAPI.tryShowWXCrazyClick(str, ()=>{
        //     User.addMoney(randomGold);
        //     EventMgr.instance.dispatch(EventDef.Game_TouchStart);
        // }, ()=>{
        // }, ()=>{
        //     EventMgr.instance.dispatch(EventDef.Game_TouchStart);
        // });
    };
    GameView.prototype._viewOpenListner = function (para) {
        //    if (para.view == ViewDef.Export2View) {
        //        EventMgr.instance.dispatch(EventDef.Game_EnableCarTouch, false);
        //    }
    };
    GameView.prototype._viewCloseListner = function (para) {
        if (para.view == ViewMgr_1.ViewDef.GameWinView) {
            // ViewMgr.instance.openView(ViewDef.Export2View);
            this.show();
        }
        // else if (para.view == ViewDef.Export2View) {
        //     this.show();
        //     EventMgr.instance.dispatch(EventDef.Game_EnableCarTouch, true);
        // }
    };
    GameView.prototype.horiBannerListener = function (enable) {
        // this.goldLayout.visible = enable;
        // if (enable) {
        //     this.banner.show();
        //     this.horiLoopAd.top = this.horiSrcTop;
        // } else {
        //     this.horiLoopAd.top = Laya.stage.height * 0.85;
        //     this.banner.hide();
        // }
    };
    GameView.prototype.gameGuide = function (data) {
        this.guideHand.visible = data.visible;
        if (data.visible) {
            console.log("stage", Laya.stage.width, Laya.stage.height, data.pos);
            this.guideHand.pos(data.pos.x / Laya.stage.clientScaleX, data.pos.y / Laya.stage.clientScaleY);
            // this.guideHand.pos(0,0);
            console.log(this.guideHand.x, this.guideHand.y);
            var srcPos = new Laya.Vector2(data.pos.x, data.pos.y);
            Laya.Tween.clearAll(this.guideHand);
            this.guideMoveAct(srcPos, data.offsetX, data.offsetY);
        }
    };
    GameView.prototype.guideMoveAct = function (src, x, y) {
        var _this = this;
        var dst = 0;
        var t = null;
        if (x) {
            dst = src.x + x;
            t = { x: dst };
        }
        else if (y) {
            dst = src.y + y;
            t = { y: dst };
        }
        Laya.Tween.to(this.guideHand, t, 1000, null, Laya.Handler.create(this, function () {
            _this.guideHand.pos(src.x, src.y);
            _this.guideMoveAct(src, x, y);
        }));
    };
    GameView.prototype.moneyChange = function (value) {
        this.rewardLayout.setNum(value.curr - value.last);
        this.gold.text = String(User_1.default.getMoney());
    };
    GameView.prototype.gameStart = function () {
        this.btnStart.visible = true;
        this.popAdFlag = true;
        this.levelLayout.setNum(User_1.default.getLeveNum());
    };
    GameView.prototype.gameOver = function () {
        this.levelLayoutOver.setNum(User_1.default.getLeveNum());
        this.overLayer.visible = true;
        var img = this.overLayer.getChildByName("img");
        img.scaleX = 0.5;
        img.scaleY = 0.5;
        img.alpha = 0;
        Laya.Tween.to(img, { alpha: 1, scaleX: 1, scaleY: 1 }, 500, Laya.Ease.backInOut, Laya.Handler.create(this, function () {
            SoundMgr_1.default.instance.playSound("victory");
        }));
        Laya.timer.once(2000, this, this.showGameOverView);
    };
    GameView.prototype.showGameOverView = function () {
        var _this = this;
        this.overLayer.visible = false;
        ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.GameWinView, null, function (view) {
            view.owner.zOrder = 1;
            _this.hide();
        });
    };
    GameView.prototype._onClickRefresh = function () {
        // if (this.popAdFlag) {
        //     ViewMgr.instance.openView(ViewDef.Export2View, {refresh: true}, (view: ViewBase)=>{
        //         // (view.owner as Laya.View).zOrder = 1;
        //         this.hide();
        //     });
        //     this.popAdFlag = false;
        // } else {
        //     this.popAdFlag = true;
        //     EventMgr.instance.dispatch(EventDef.Game_Refresh);
        // }
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_Refresh);
    };
    return GameView;
}(ViewBase_1.default));
exports.default = GameView;
},{"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../Mgr/SoundMgr":19,"../../Mgr/ViewMgr":21,"../../ParkingJam/Components/HorizontalLayout":31,"../../User/User":49,"../ViewBase":63}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isIViewStateListener(element) {
    if ((null != element.onViewShow && typeof (element.onViewShow) == "function")
        && (null != element.onViewHide && typeof (element.onViewHide) == "function")) {
        return true;
    }
    return false;
}
exports.isIViewStateListener = isIViewStateListener;
},{}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var LoadingView = /** @class */ (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._processWidth = 0;
        _this._logoAni = null;
        return _this;
    }
    LoadingView.prototype.onAwake = function () {
        this._bg = this.owner.getChildByName("Bg");
        this._bottomZone = this._bg.getChildByName("BottomZone");
        this._processBarBg = this._bottomZone.getChildByName("processBarBg");
        this._processBar = this._processBarBg.getChildByName("processBar");
        this._processWidth = this._processBar.width;
        // this._logoAni = this._bottomZone.getChildByName("LogoAni").getComponent(LogoAni);
    };
    LoadingView.prototype.onStart = function () {
        // Laya.timer.once(250,this,()=>
        // {
        //     this._logoAni.playAni();
        // })
    };
    LoadingView.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
    };
    LoadingView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    LoadingView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    LoadingView.prototype.onUpdate = function () {
        this._bg.width = Laya.stage.width;
        this._bg.height = Laya.stage.height;
    };
    LoadingView.prototype.setProcess = function (process) {
        if (process < 0)
            process = 0;
        if (process > 1)
            process = 1;
        var width = this._processWidth * process;
        if (width < 1)
            width = 1;
        this._processBar.width = width;
    };
    return LoadingView;
}(ViewBase_1.default));
exports.default = LoadingView;
},{"../ViewBase":63}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var KRQ_VLoopAd_1 = require("../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var Utilit_1 = require("../../../Utilit");
var ShareAd_1 = require("../../../ShareAd/ShareAd");
var ViewMgr_1 = require("../../../Mgr/ViewMgr");
var WXADMgr_1 = require("../../../Mgr/WXADMgr");
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var Exprot2ViewTemplate = /** @class */ (function (_super) {
    __extends(Exprot2ViewTemplate, _super);
    function Exprot2ViewTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._continueBtn = null;
        _this._krqVLoopAd = null;
        _this._KRQ_VLoopAd = null;
        _this._isCanClose = false;
        _this._banner = null;
        _this.wudianEnable = false;
        return _this;
    }
    Exprot2ViewTemplate.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._krqVLoopAd = this.View.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd_1.default);
        this._krqVLoopAd.useLocalRandom = true;
        this._krqVLoopAd.useRandom = false;
        this._krqVLoopAd.useMovePause = false;
        this._krqVLoopAd.sortDatas = this.sortDatas;
        this._continueBtn = this.View.getChildByName("ContinueBtn");
        this._continueBtn.visible = false;
        var self = this;
        if (WudianMgr_1.default.WudianFlag && 1 == AppSwitchConfig_1.default.getInstance().getAppSwitchData().continueBanner) {
            this.wudianEnable = true;
            Laya.timer.once(AppSwitchConfig_1.default.getInstance().getAppSwitchData().continueBtnDelayTime * 1000, self, function () {
                self._continueBtn.visible = true;
            });
        }
        else {
            Laya.timer.once(AppSwitchConfig_1.default.getInstance().getAppSwitchData().continueBtnDelayTime * 1000, self, function () {
                self._continueBtn.visible = true;
                self._isCanClose = true;
            });
        }
        this._KRQ_VLoopAd = this.View.getChildByName("KRQ_VLoopAd");
        if (Utilit_1.default.isIphoneX()) {
            this._KRQ_VLoopAd.top = this._KRQ_VLoopAd.top + 75;
        }
    };
    Exprot2ViewTemplate.prototype.onStart = function () {
        this._krqVLoopAd.AdPosID = ShareAd_1.default.MoreGameLocationID;
        _super.prototype.onStart.call(this);
    };
    Exprot2ViewTemplate.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._continueBtn.on(Laya.Event.CLICK, this, this.onContinueBtn);
    };
    Exprot2ViewTemplate.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._continueBtn.off(Laya.Event.CLICK, this, this.onContinueBtn);
    };
    Exprot2ViewTemplate.prototype.ShowBanner = function () {
        var _this = this;
        var self = this;
        WXADMgr_1.default.getBanner(function (banner) {
            if (null != self._banner) {
                self._banner.hide();
            }
            self._banner = banner;
            if (null != self._banner) {
                self._banner.show();
            }
            else {
                _this._isCanClose = true;
            }
            if (_this.isShowHistoryBtn) {
                self.HistoryBtn.visible = true;
            }
        });
    };
    Exprot2ViewTemplate.prototype.onDestroy = function () {
        if (null != this._banner) {
            this._banner.hide();
        }
        this._banner = null;
    };
    Exprot2ViewTemplate.prototype.onContinueBtn = function () {
        var _this = this;
        if (this.wudianEnable) {
            this.wudianEnable = false;
            Laya.timer.once(AppSwitchConfig_1.default.getInstance().getAppSwitchData().continueBannerShowTime * 1000, this, function () {
                _this.ShowBanner();
                Laya.timer.once(AppSwitchConfig_1.default.getInstance().getAppSwitchData().continueBannerHideTime * 1000, _this, function () {
                    _this._isCanClose = true;
                    if (null != _this._banner) {
                        _this._banner.hide();
                    }
                    _this._banner = null;
                });
            });
        }
        if (!this._isCanClose)
            return;
        var self = this;
        var excute = function () {
            self.closeView(); //关闭此界面
            //todo:你关闭此界面之后你的逻辑
        };
        ViewMgr_1.default.instance.tryShowPopAd(function (v) {
            if (null != v) //成功打开 ViewDef.Export3View 界面
             {
                v.onCloseEvent = function () {
                    excute();
                };
            }
            else {
                excute(); //当 ViewDef.Export3View 界面不能打开 后执行你的逻辑
            }
        });
    };
    Exprot2ViewTemplate.prototype.sortDatas = function (datas) {
        if (null == datas || 0 == datas.length)
            return [];
        var dataDic = {};
        var keys = new Array();
        for (var i = 0; i < datas.length; ++i) {
            var data = datas[i];
            if (dataDic[data.appid] == null) {
                dataDic[data.appid] = new Array();
                dataDic[data.appid].push(data);
                keys.push(data.appid);
            }
            else {
                dataDic[data.appid].push(data);
            }
        }
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            var randomIndex = Math.floor(Math.random() * keys.length);
            var temp = keys[randomIndex];
            keys[randomIndex] = key;
            keys[i] = temp;
        }
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            var dataArray = dataDic[key];
            for (var j = 0; j < dataArray.length; ++j) {
                var data = dataArray[j];
                var randomIndex = Math.floor(Math.random() * dataArray.length);
                var temp = dataArray[randomIndex];
                dataArray[randomIndex] = data;
                dataArray[j] = temp;
            }
        }
        var res = new Array();
        var ignores = [];
        while (keys.length > 0) {
            var isComplate = true;
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                var isOk = true;
                for (var j = 0; j < ignores.length; ++j) {
                    var ignore = ignores[j];
                    if (ignore == key) {
                        isOk = false;
                        break;
                    }
                }
                if (isOk) {
                    isComplate = false;
                    var data = dataDic[key].shift();
                    res.push(data);
                    ignores.push(key);
                    if (ignores.length > 3) {
                        ignores.shift();
                    }
                    if (dataDic[key].length <= 0) {
                        keys.splice(i, 1);
                        --i;
                        continue;
                    }
                }
                else {
                    continue;
                }
            }
            if (isComplate) {
                for (var j = 0; j < keys.length; ++j) {
                    var key = keys[j];
                    var isOk = true;
                    var dataArray = dataDic[key];
                    ignores.splice(0);
                    for (var h = 0; h < dataArray.length; ++h) {
                        var data = dataArray[h];
                        for (var i = 0; i < res.length; ++i) {
                            ignores.push(null == res[i - 2] ? null : res[i - 2].appid);
                            ignores.push(null == res[i - 1] ? null : res[i - 1].appid);
                            ignores.push(null == res[i] ? null : res[i].appid);
                            ignores.push(null == res[i + 1] ? null : res[i + 1].appid);
                            ignores.push(null == res[i + 2] ? null : res[i + 2].appid);
                            for (var k = 0; k < ignores.length; ++k) {
                                var ignore = ignores[k];
                                if (null != ignore && ignore == key) {
                                    isOk = false;
                                    break;
                                }
                            }
                            if (isOk) {
                                if (null != data) {
                                    var f = res.slice(0, i + 1);
                                    var b = res.slice(i + 1, res.length);
                                    res = f;
                                    res.push(data);
                                    for (var a = 0; a < b.length; ++a) {
                                        res.push(b[a]);
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            }
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                var randomIndex = Math.floor(Math.random() * keys.length);
                var temp = keys[randomIndex];
                keys[randomIndex] = key;
                keys[i] = temp;
            }
        }
        return res;
    };
    return Exprot2ViewTemplate;
}(TemplateViewBase_1.default));
exports.default = Exprot2ViewTemplate;
},{"../../../Config/AppSwitchConfig":4,"../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd":15,"../../../Mgr/ViewMgr":21,"../../../Mgr/WXADMgr":22,"../../../Mgr/WudianMgr":23,"../../../ShareAd/ShareAd":47,"../../../Utilit":50,"../TemplateViewBase":61}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var KRQ_VLoopAd_1 = require("../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var Utilit_1 = require("../../../Utilit");
var WXADMgr_1 = require("../../../Mgr/WXADMgr");
var ViewMgr_1 = require("../../../Mgr/ViewMgr");
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var ShareAd_1 = require("../../../ShareAd/ShareAd");
var Exprot3ViewTemplate = /** @class */ (function (_super) {
    __extends(Exprot3ViewTemplate, _super);
    function Exprot3ViewTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._closeBtn = null;
        _this._krqVLoopAd = null;
        _this._KRQ_VLoopAd = null;
        _this._clickTag = false;
        _this._clickTimingTag = false;
        _this._banner = null;
        return _this;
    }
    Exprot3ViewTemplate.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._krqVLoopAd = this.View.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd_1.default);
        this._closeBtn = this.View.getChildByName("CloseBtn");
        this._KRQ_VLoopAd = this.View.getChildByName("KRQ_VLoopAd");
        if (Utilit_1.default.isIphoneX()) {
            this._KRQ_VLoopAd.top = this._KRQ_VLoopAd.top + 75;
        }
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            this._KRQ_VLoopAd.height = 900;
        }
        else {
            this._KRQ_VLoopAd.height = 750;
        }
    };
    Exprot3ViewTemplate.prototype.onStart = function () {
        this._krqVLoopAd.AdPosID = ShareAd_1.default.MoreGameLocationID;
        _super.prototype.onStart.call(this);
        if (WudianMgr_1.default.WudianFlag) {
            var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
            var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
            Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
            Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
        }
    };
    Exprot3ViewTemplate.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._closeBtn.on(Laya.Event.CLICK, this, this.onCloseBtn);
    };
    Exprot3ViewTemplate.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._closeBtn.off(Laya.Event.CLICK, this, this.onCloseBtn);
    };
    Exprot3ViewTemplate.prototype.BannerUp = function () {
        var _this = this;
        var self = this;
        WXADMgr_1.default.getBanner(function (banner) {
            if (null != self._banner) {
                self._banner.hide();
            }
            self._banner = banner;
            if (null != self._banner) {
                self._banner.show();
            }
            if (_this.isShowHistoryBtn) {
                self.HistoryBtn.visible = true;
            }
        });
    };
    Exprot3ViewTemplate.prototype.BtnUp = function () {
        this._clickTag = true;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            this._closeBtn.bottom = 270;
        }
        else {
            this._closeBtn.bottom = 370;
        }
    };
    Exprot3ViewTemplate.prototype.onCloseBtn = function () {
        if (!this._clickTag && WudianMgr_1.default.WudianFlag) {
            var self = this;
            if (!this._clickTimingTag) {
                this._clickTimingTag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        this.closeView();
    };
    Exprot3ViewTemplate.prototype.onDestroy = function () {
        if (null != this._banner) {
            this._banner.hide();
        }
        this._banner = null;
    };
    Exprot3ViewTemplate.prototype.onHistoryBtn = function () {
        var self = this;
        ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.MiniGameView, null, function (v) {
            self.hide();
            if (null != self._banner) {
                self._banner.hide();
            }
            v.onCloseEvent = function () {
                if (null != self.View && !self.View.destroyed) {
                    self.show();
                    if (null != self._banner) {
                        self._banner.show();
                    }
                }
            };
        });
    };
    return Exprot3ViewTemplate;
}(TemplateViewBase_1.default));
exports.default = Exprot3ViewTemplate;
},{"../../../Config/AppSwitchConfig":4,"../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd":15,"../../../Mgr/ViewMgr":21,"../../../Mgr/WXADMgr":22,"../../../Mgr/WudianMgr":23,"../../../ShareAd/ShareAd":47,"../../../Utilit":50,"../TemplateViewBase":61}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var Utilit_1 = require("../../../Utilit");
var ViewMgr_1 = require("../../../Mgr/ViewMgr");
var User_1 = require("../../../User/User");
var EventMgr_1 = require("../../../Event/EventMgr");
var EventDef_1 = require("../../../Event/EventDef");
var NativeCallback_1 = require("../../../NativeCallback");
var GameWinViewTemplate = /** @class */ (function (_super) {
    __extends(GameWinViewTemplate, _super);
    function GameWinViewTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone = null;
        _this._backBtn = null;
        _this._nextBtn = null;
        // protected _rollSingleAds : Array<KRQ_RollSingleAd> = new Array<KRQ_RollSingleAd>();
        _this._clickTag = false;
        _this._clickTimingTag = false;
        _this._banner = null;
        return _this;
    }
    GameWinViewTemplate.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._centerZone = this.View.getChildByName("CenterZone");
        if (Utilit_1.default.isIphoneX()) {
            this._centerZone.top = this._centerZone.top + 75;
        }
        this._backBtn = this._centerZone.getChildByName("BackBtn");
        this._nextBtn = this._centerZone.getChildByName("NextBtn");
        this._backBtn.visible = false;
        // for (let i = 0; i < this._centerZone.numChildren; ++i) 
        // {
        //     let ad = this._centerZone.getChildAt(i).getComponent(KRQ_RollSingleAd) as KRQ_RollSingleAd;
        //     if (null == ad)
        //         continue;
        //     this._rollSingleAds.push(ad);
        // }
        if (WudianMgr_1.default.WudianFlag) {
            this.HistoryBtn.visible = false;
        }
    };
    GameWinViewTemplate.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        // if(WudianMgr.WudianFlag)
        // {
        //     let yPos = this._centerZone.height - 150;
        //     this._backBtn.y = yPos;
        //     this._nextBtn.y = yPos;
        // }
        // for (let i = 0; i < this._rollSingleAds.length; ++i)  
        // {
        //     let ad = this._rollSingleAds[i];
        //     Laya.timer.once(150,this,()=>
        //     {
        //         ad.playAni();
        //     })
        // }
        // var btnMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer;
        // var bannerMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer;
        // Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
        // Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
    };
    GameWinViewTemplate.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.InsertVideoEnd, this, this.onInsertVideoEnd);
    };
    GameWinViewTemplate.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._backBtn.on(Laya.Event.CLICK, this, this.onBackBtn);
        this._nextBtn.on(Laya.Event.CLICK, this, this.onNextBtn);
    };
    GameWinViewTemplate.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._backBtn.off(Laya.Event.CLICK, this, this.onBackBtn);
        this._nextBtn.off(Laya.Event.CLICK, this, this.onNextBtn);
    };
    GameWinViewTemplate.prototype.onBackBtn = function () {
        if (!this._clickTag && WudianMgr_1.default.WudianFlag) {
            var self = this;
            if (!this._clickTimingTag) {
                this._clickTimingTag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        //todo:你的代码
    };
    GameWinViewTemplate.prototype.onInsertVideoEnd = function () {
        User_1.default.setLeveNum(User_1.default.getLeveNum() + 1);
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnLevelStart);
        this.closeView();
    };
    GameWinViewTemplate.prototype.onNextBtn = function () {
        // if(!this._clickTag && WudianMgr.WudianFlag)
        // {
        //     var self = this
        //     if(!this._clickTimingTag)
        //     {
        //         this._clickTimingTag = true
        //         var btnMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer;
        //         var bannerMoveTimer = AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer;
        //         Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
        //         Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
        //     }
        //     return;
        // }
        //todo:你的代码
        if (User_1.default.getLeveNum() > 3) {
            var randNum = Math.random();
            if (Laya.Browser.onAndroid || Laya.Browser.onIOS && randNum > 0.1) {
                NativeCallback_1.default.CallNativeFunc("showInsertVideo");
                Laya.SoundManager.muted = true;
                return;
            }
        }
        User_1.default.setLeveNum(User_1.default.getLeveNum() + 1);
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnLevelStart);
        this.closeView();
    };
    GameWinViewTemplate.prototype.BannerUp = function () {
        // let self = this;
        // WXADMgr.getBanner((banner : WXBannderAd)=>
        // {
        //     if(null != self._banner)
        //     {
        //         self._banner.hide();
        //     }
        //     self._banner = banner
        //     if (null != self._banner) 
        //     {
        //         self._banner.show();
        //     }
        //     if(this.isShowHistoryBtn)
        //     {
        //         self.HistoryBtn.visible = true;
        //     }
        // });
    };
    GameWinViewTemplate.prototype.BtnUp = function () {
        this._clickTag = true;
        this._backBtn.y = 720;
        this._nextBtn.y = 720;
    };
    GameWinViewTemplate.prototype.onDestroy = function () {
        if (null != this._banner) {
            this._banner.hide();
        }
        this._banner = null;
    };
    GameWinViewTemplate.prototype.onHistoryBtn = function () {
        var self = this;
        ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.MiniGameView, null, function (v) {
            self.hide();
            if (null != self._banner) {
                self._banner.hide();
            }
            v.onCloseEvent = function () {
                if (null != self.View && !self.View.destroyed) {
                    self.show();
                    if (null != self._banner) {
                        self._banner.show();
                    }
                }
            };
        });
    };
    return GameWinViewTemplate;
}(TemplateViewBase_1.default));
exports.default = GameWinViewTemplate;
},{"../../../Config/AppSwitchConfig":4,"../../../Event/EventDef":7,"../../../Event/EventMgr":8,"../../../Mgr/ViewMgr":21,"../../../Mgr/WudianMgr":23,"../../../NativeCallback":24,"../../../User/User":49,"../../../Utilit":50,"../TemplateViewBase":61}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../ViewBase");
var KRQ_History_1 = require("../../../KRQ/Com/KRQ_History/KRQ_History");
var MiniGameViewTemplate = /** @class */ (function (_super) {
    __extends(MiniGameViewTemplate, _super);
    function MiniGameViewTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._krqhistory = null;
        return _this;
    }
    MiniGameViewTemplate.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._krqhistory = this.View.getChildByName("KRQ_History").getComponent(KRQ_History_1.default);
        var self = this;
        this._krqhistory.OnBackBtnClick = function () {
            self.closeView();
        };
    };
    MiniGameViewTemplate.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
    };
    MiniGameViewTemplate.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    MiniGameViewTemplate.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    return MiniGameViewTemplate;
}(ViewBase_1.default));
exports.default = MiniGameViewTemplate;
},{"../../../KRQ/Com/KRQ_History/KRQ_History":11,"../../ViewBase":63}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var Utilit_1 = require("../../Utilit");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var TemplateViewBase = /** @class */ (function (_super) {
    __extends(TemplateViewBase, _super);
    function TemplateViewBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._historyBtn = null;
        _this._topZone = null;
        return _this;
    }
    Object.defineProperty(TemplateViewBase.prototype, "HistoryBtn", {
        get: function () {
            // if(null == this._historyBtn)
            // {
            //     this._historyBtn = this.TopZone.getChildByName("HistoryBtn") as Laya.Sprite;
            // }
            return this._historyBtn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateViewBase.prototype, "TopZone", {
        get: function () {
            if (null == this._topZone) {
                this._topZone = this.View.getChildByName("TopZone");
            }
            return this._topZone;
        },
        enumerable: true,
        configurable: true
    });
    TemplateViewBase.prototype.onAwake = function () {
        this._topZone = this.View.getChildByName("TopZone");
        if (Utilit_1.default.isIphoneX()) {
            this._topZone.top = this._topZone.top + 75;
        }
        // this._historyBtn = this._topZone.getChildByName("HistoryBtn") as Laya.Sprite;
        // if(-1 == WudianMgr.IpBlockFlag())
        // {
        //     this._historyBtn.visible = false;
        // }
        // else
        // {
        //     this._historyBtn.visible = this.isShowHistoryBtn;
        // }
    };
    TemplateViewBase.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        // this.HistoryBtn.on(Laya.Event.CLICK,this,this.onHistoryBtn);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.App_OnUpdateIpBlockState, this, this.onUpdateIpBlockState);
    };
    TemplateViewBase.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        // this.HistoryBtn.off(Laya.Event.CLICK,this,this.onHistoryBtn);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.App_OnUpdateIpBlockState, this, this.onUpdateIpBlockState);
    };
    TemplateViewBase.prototype.onHistoryBtn = function () {
        // let self = this;
        // ViewMgr.instance.openView(ViewDef.MiniGameView,null,(v : MiniGameViewTemplate)=>
        // {
        //     self.hide();
        //     v.onCloseEvent = ()=>
        //     {
        //         if(null != self.View && !self.View.destroyed)
        //         {
        //             self.show();
        //         }
        //     }
        // })
    };
    Object.defineProperty(TemplateViewBase.prototype, "isShowHistoryBtn", {
        get: function () {
            // let launchScene = 0;
            // if(Laya.Browser.onMiniGame)
            // {
            //     launchScene = WXAPI.getLaunchOptionsSync().scene;
            // }
            // else if(Laya.Browser.onQQMiniGame)
            // {
            //     launchScene = QQMiniGameAPI.getLaunchOptionsSync().scene;
            // }
            // let noEnterBySearch: boolean = true;
            // let wudianSceneList = AppSwitchConfig.getInstance().getAppSwitchData().wudianSceneList;
            // for (let i = 0; i < wudianSceneList.length; ++i)  
            // {
            //     let wudianSceneValue = wudianSceneList[i];
            //     if(launchScene == wudianSceneValue)
            //     {
            //         noEnterBySearch = false;
            //     }
            // }
            // if(Laya.Browser.onQGMiniGame || !noEnterBySearch || !WudianMgr.GetIpBlocked() 
            //     || 0 ==  AppSwitchConfig.getInstance().getAppSwitchData().fakeBtn)
            // {
            //     return false;
            // }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    TemplateViewBase.prototype.onUpdateIpBlockState = function (para) {
        // this._historyBtn.visible = this.isShowHistoryBtn;
    };
    return TemplateViewBase;
}(ViewBase_1.default));
exports.default = TemplateViewBase;
},{"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../Utilit":50,"../ViewBase":63}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDef_1 = require("../../../Event/EventDef");
var EventMgr_1 = require("../../../Event/EventMgr");
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var WXADMgr_1 = require("../../../Mgr/WXADMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var ViewBase_1 = require("../../ViewBase");
var WXCrazyClick = /** @class */ (function (_super) {
    __extends(WXCrazyClick, _super);
    function WXCrazyClick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._clickBar = null;
        _this._totalClickTimer = 15; //用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
        _this._needClickTime = 10; //一共点多少次能够获得奖励，用于显示进度条
        _this._bannerClickTime = Math.floor(Math.random() * 5) + 2; //点多少次开始显示bannerr套路用户
        _this._banner = null;
        return _this;
    }
    WXCrazyClick.prototype.onAwake = function () {
        var _this = this;
        this._click_Btn = this.owner.getChildByName("Click_Btn");
        this._click_Btn.on(Laya.Event.CLICK, this, this.ButtonClicked);
        this._arrow_Img = this._click_Btn.getChildByName("Arrow_Img");
        this._getPrize_View = this.owner.getChildByName("GetPrize_View");
        this._prizeCount_Text = this._getPrize_View.getChildByName("PrizeCount_Text");
        this._confirm_Btn = this._getPrize_View.getChildByName("Confirm_Btn");
        this._getPrize_View.visible = false;
        this._clickBar = this.owner.getChildByName("ClickBar").getChildByName("ClickBar");
        this._clickBarOriginalWidth = this._clickBar.width;
        this._clickBar.width = 0;
        this._clickTime = 0;
        this._totalClickTime = 0;
        var self = this;
        Laya.loader.load("ClickGetPrize/quanji.png", Laya.Handler.create(this, function (texture) {
            texture.bitmap.lock = true;
            Laya.loader.load("ClickGetPrize/quanji.sk", Laya.Handler.create(_this, function (bytes) {
                console.log("texture", texture);
                console.log("bytes", bytes);
                var template = new Laya.Templet();
                template.parseData(texture, bytes);
                self.drgon = template.buildArmature();
                self.owner.addChild(self.drgon);
                self.drgon.x = 375;
                self.drgon.y = 610;
                self.drgon.scaleX = 2;
                self.drgon.scaleY = 2;
                self.drgon.parent.setChildIndex(self.drgon, 1);
                self.drgon.play(0, true);
                console.log("quanji 加载完成!!!!", template);
            }), Laya.Handler.create(_this, function () { }), "", 0, false, "", true);
        }), Laya.Handler.create(this, function () { }), "", 0, false, "", true);
    };
    WXCrazyClick.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Laya.stage.on(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
    };
    WXCrazyClick.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Laya.stage.off(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
    };
    WXCrazyClick.prototype.onUpdate = function () {
        if (this._arrowUp) {
            this._arrow_Img.top += Laya.timer.delta / 5;
            if (this._arrow_Img.top > -140) {
                this._arrowUp = false;
            }
        }
        else {
            this._arrow_Img.top -= Laya.timer.delta / 5;
            if (this._arrow_Img.top < -180) {
                this._arrowUp = true;
            }
        }
        if (!this._bannerClicked) {
            var spd = 2 + (this._clickBar.width / this._clickBarOriginalWidth) * 4;
            if (this._clickBar.width >= spd) {
                this._clickBar.width -= spd;
            }
            if ((this._clickBar.width / this._clickBarOriginalWidth) + 0.1 < (this._clickTime / this._needClickTime)) {
                this._clickTime--;
            }
        }
    };
    WXCrazyClick.prototype.openView = function (data) {
        this._compeletFunction = data.Complete;
        this._titel = data.titel;
        _super.prototype.openView.call(this, data);
    };
    WXCrazyClick.prototype.OpenPrizeWindow = function () {
        var self = this;
        this._prizeCount_Text.text = this._titel;
        this._getPrize_View.visible = true;
        this._confirm_Btn.once(Laya.Event.CLICK, this, function () {
            if (null != self._banner) {
                self._banner.hide();
            }
            if (self._compeletFunction) {
                self._compeletFunction();
            }
            self.closeView();
        });
    };
    WXCrazyClick.prototype.ShowBanner = function () {
        var self = this;
        WXADMgr_1.default.getBanner(function (banner) {
            if (null != self._banner) {
                self._banner.hide();
            }
            self._banner = banner;
            if (null != self._banner) {
                self._banner.show();
            }
        });
    };
    WXCrazyClick.prototype.ButtonClicked = function () {
        var _this = this;
        this._clickTime++;
        this._totalClickTime++;
        if (null != this.drgon) {
            this.drgon.play(1, false);
            this.drgon.once(Laya.Event.STOPPED, this, function () {
                _this.drgon.play(0, true);
            });
        }
        if (this._clickTime > this._needClickTime) {
            this._clickTime = this._needClickTime;
        }
        if (this._clickTime >= this._bannerClickTime) {
            if (this._clickTime >= this._needClickTime) {
                this._clickTime = this._needClickTime - 1;
            }
            if (this._bannerClicked) {
                return;
            }
            this._bannerClicked = true;
            if (WudianMgr_1.default.WudianFlag && 1 == AppSwitchConfig_1.default.getInstance().getAppSwitchData().wxcfg.kuangdianBanner) {
                this.ShowBanner();
            }
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        else if (this._totalClickTime > this._totalClickTimer) {
            if (WudianMgr_1.default.WudianFlag && 1 == AppSwitchConfig_1.default.getInstance().getAppSwitchData().wxcfg.kuangdianBanner) {
                this.ShowBanner();
            }
            this.BannerClicked();
        }
        var progress = (this._clickTime / this._needClickTime) * this._clickBarOriginalWidth;
        this._clickBar.width = progress;
    };
    WXCrazyClick.prototype.BannerClicked = function () {
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.AD_WudianBanner_Hide);
        this._bannerClicked = true;
        this._clickTime = this._needClickTime;
        this._clickBar.width = this._clickBarOriginalWidth;
        this._click_Btn.visible = false;
        this.OpenPrizeWindow();
    };
    WXCrazyClick.prototype.onDestroy = function () {
        if (null != this._banner) {
            this._banner.hide();
        }
    };
    WXCrazyClick.prototype.onFocusChange = function () {
        if (null != this.drgon) {
            this.drgon.play(0, true);
        }
    };
    return WXCrazyClick;
}(ViewBase_1.default));
exports.default = WXCrazyClick;
},{"../../../Config/AppSwitchConfig":4,"../../../Event/EventDef":7,"../../../Event/EventMgr":8,"../../../Mgr/WXADMgr":22,"../../../Mgr/WudianMgr":23,"../../ViewBase":63}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("../Mgr/ViewMgr");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var Utilit_1 = require("../Utilit");
var IViewStateListener_1 = require("./IViewStateListener");
//界面基类，所有功能模块界面继承于这个类。这种类型的界面不能嵌套。
var ViewBase = /** @class */ (function (_super) {
    __extends(ViewBase, _super);
    function ViewBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onCloseEvent = null;
        _this.onOpenEvent = null;
        _this._viewBase = true;
        _this._viewDef = ViewMgr_1.ViewDef.None;
        _this._data = {};
        return _this;
    }
    Object.defineProperty(ViewBase.prototype, "View", {
        get: function () {
            return this.owner;
        },
        enumerable: true,
        configurable: true
    });
    ViewBase.prototype.onAwake = function () {
        this.View.autoDestroyAtClosed = true;
    };
    ViewBase.prototype.onEnable = function () {
        this.addEvent();
    };
    ViewBase.prototype.onDisable = function () {
        this.removeEvent();
    };
    ViewBase.prototype.onDestroy = function () {
        this.removeEvent();
    };
    ViewBase.prototype.openView = function (data) {
        this._data = data;
        this.show();
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnViewOpen, { view: this._viewDef });
        if (this.onOpenEvent) {
            this.onOpenEvent();
        }
    };
    ViewBase.prototype.addEvent = function () {
    };
    ViewBase.prototype.removeEvent = function () {
        Laya.timer.clearAll(this);
    };
    ViewBase.prototype.closeView = function () {
        ViewMgr_1.default.instance.closeView(this._viewDef);
    };
    ViewBase.prototype.hide = function () {
        var _this = this;
        this.View.visible = false;
        this.onHide();
        Utilit_1.default.forEachChild(this.owner, function (child) {
            var coms = child._components;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (IViewStateListener_1.isIViewStateListener(element)) {
                        element.onViewHide(_this);
                    }
                }
            }
        });
    };
    ViewBase.prototype.show = function () {
        var _this = this;
        this.View.visible = true;
        this.onShow();
        Utilit_1.default.forEachChild(this.owner, function (child) {
            var coms = child._components;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (IViewStateListener_1.isIViewStateListener(element)) {
                        element.onViewShow(_this);
                    }
                }
            }
        });
    };
    ViewBase.prototype.viewIsHide = function () {
        return this.View.visible;
    };
    ViewBase.prototype.onHide = function () { };
    ViewBase.prototype.onShow = function () { };
    ViewBase.prototype.onClose = function () {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnViewClose, { view: this._viewDef });
        if (this.onCloseEvent) {
            this.onCloseEvent();
        }
    };
    return ViewBase;
}(Laya.Script));
exports.default = ViewBase;
},{"../Event/EventDef":7,"../Event/EventMgr":8,"../Mgr/ViewMgr":21,"../Utilit":50,"./IViewStateListener":55}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
var ViewMgr_1 = require("./Mgr/ViewMgr");
var WudianMgr_1 = require("./Mgr/WudianMgr");
var GameRecorder = /** @class */ (function () {
    function GameRecorder() {
        this._recorder = null;
    }
    Object.defineProperty(GameRecorder.prototype, "recorder", {
        get: function () {
            // if(null == this._recorder)
            // {
            //     if(Laya.Browser.onMiniGame)
            //     {
            //         if (null != Laya.Browser.window["wx"].getGameRecorder
            //             && "function" == typeof (Laya.Browser.window["wx"].getGameRecorder))  
            //         {
            //             this._recorder = Laya.Browser.window["wx"].getGameRecorder();
            //             if(null != this._recorder)
            //             {
            //                 this._recorder.on('start', () => { console.log("开始录屏") });
            //                 this._recorder.on('stop', (res) => { console.log("停止录屏 录屏长度：", res.duration) });
            //                 this._recorder.on('pause', () => { console.log("暂停录屏") });
            //                 this._recorder.on('resume', () => { console.log("继续录屏") });
            //                 this._recorder.on('abort', () => { console.log("丢弃录屏") });
            //             }
            //         }
            //         else
            //         {
            //             console.log("不支持微信录屏！");
            //         }
            //     }
            // }
            return this._recorder;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 开始录屏
    */
    GameRecorder.prototype.start = function () {
        if (null != this.recorder) {
            this.recorder.start();
        }
    };
    /**
    * 停止录屏
    */
    GameRecorder.prototype.stop = function () {
        if (null != this.recorder) {
            this.recorder.stop();
        }
    };
    /**
    * 暂停录屏
    */
    GameRecorder.prototype.pause = function () {
        if (null != this.recorder) {
            this.recorder.pause();
        }
    };
    /**
    * 从暂停状态恢复到录制状态
    */
    GameRecorder.prototype.resume = function () {
        if (null != this.recorder) {
            this.recorder.resume();
        }
    };
    /**
    * 舍弃录屏
    */
    GameRecorder.prototype.abort = function () {
        if (null != this.recorder) {
            this.recorder.abort();
        }
    };
    /**
    * 显示分享按钮
    */
    GameRecorder.prototype.showShareBtn = function () {
        if (null != this.recorder) {
            var button = Laya.Browser.window["wx"].createGameRecorderShareButton({
                // 样式参数
                style: {
                    left: 10,
                    top: 150,
                    height: 50,
                    color: '#ffffff',
                    textAlign: 'center',
                    fontSize: 16,
                    borderRadius: 4,
                    iconMarginRight: 16,
                    paddingLeft: 1,
                    paddingRight: 30,
                },
                // 按钮的背景图片
                image: 'button.jpg',
                text: '自定义文案',
                icon: 'icon.jpg',
                // 分享参数
                share: {
                    query: 'a=1&b=2',
                    // 背景音乐的路径
                    bgm: 'walkin.mp3',
                    timeRange: [[0, 1000], [2000, 3000]],
                    title: {
                        template: 'default.score',
                        data: {
                            score: 6500
                        }
                    },
                    button: {
                        template: 'default.enter',
                    }
                }
            });
        }
    };
    return GameRecorder;
}());
exports.GameRecorder = GameRecorder;
var WXAPI = /** @class */ (function () {
    function WXAPI() {
    }
    WXAPI.wxLogin = function (onSuccess, onFail) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window.wx.login({
                success: function (res) {
                    if (res.code) {
                        var code = res.code;
                        onSuccess(code);
                        console.log("登陆成功,获取到code : " + code);
                    }
                }
            });
        }
    };
    WXAPI.onRewardedVideoAdLoad = function () {
        console.log('激励视频 广告加载完成');
    };
    WXAPI.onRewardedVideoAdError = function (err) {
        console.log('激励视频 广告加载失败' + err);
        if (WXAPI._onRewardedVideoAdFailed) {
            WXAPI._onRewardedVideoAdFailed();
        }
    };
    WXAPI.onRewardedVideoAdClose = function (res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看');
            if (WXAPI._onRewardedVideoAdClose) {
                WXAPI._onRewardedVideoAdClose(true);
            }
        }
        else {
            console.log('激励视频 未完整观看');
            if (WXAPI._onRewardedVideoAdClose) {
                WXAPI._onRewardedVideoAdClose(false);
            }
        }
    };
    WXAPI.regRewardedVideoAdEvent = function (rewardedVideoAd) {
        rewardedVideoAd.onLoad(WXAPI.onRewardedVideoAdLoad);
        rewardedVideoAd.onError(WXAPI.onRewardedVideoAdError);
        rewardedVideoAd.onClose(WXAPI.onRewardedVideoAdClose);
        WXAPI._isRegRewardedVideoAdEvent = true;
    };
    WXAPI.showRewardedVideoAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onMiniGame) {
            WXAPI._onRewardedVideoAdClose = onAdClose;
            WXAPI._onRewardedVideoAdFailed = onFailed;
            var rewardedVideoAd = Laya.Browser.window["wx"].createRewardedVideoAd({
                adUnitId: WXAPI.adUnitId,
            });
            if (!WXAPI._isRegRewardedVideoAdEvent) {
                WXAPI.regRewardedVideoAdEvent(rewardedVideoAd);
            }
            rewardedVideoAd.load().then(function () {
                var promise = rewardedVideoAd.show();
                promise.then(function () { return console.log('激励视频 广告显示成功'); });
                promise.catch(function (err) {
                    rewardedVideoAd.load()
                        .then(function () { return rewardedVideoAd.show(); })
                        .catch(function (err) {
                        console.log('激励视频 广告显示失败');
                        if (onFailed) {
                            onFailed();
                        }
                    });
                });
            }).catch(function (err) {
                console.log('激励视频 广告加载失败');
                if (onFailed) {
                    onFailed();
                }
            });
        }
        else {
            onAdClose(true);
        }
    };
    //----------------------------------------------------------------
    //-------------------------小游戏跳转---------------------------
    WXAPI.navigateToMiniProgram = function (appId, path, onSuccess, onFail, onComplate) {
        if (Laya.Browser.onMiniGame) {
            console.log("跳转游戏： " + appId);
            Laya.Browser.window["wx"].navigateToMiniProgram({
                appId: appId,
                path: path,
                extraData: {
                    foo: 'bar'
                },
                envVersion: 'release',
                success: function (res) {
                    if (onSuccess) {
                        onSuccess(res);
                    }
                },
                fail: function (res) {
                    if (onFail) {
                        onFail(res);
                    }
                },
                complete: function (res) {
                    if (onComplate) {
                        onComplate(res);
                    }
                }
            });
        }
    };
    WXAPI.share = function (complate, titel, imageUrl) {
        var _this = this;
        if (Laya.Browser.onMiniGame) {
            WXAPI._onShow = function () {
                Laya.Browser.window["wx"].offShow(WXAPI._onShow);
                WXAPI._onShow = null;
                var c = Date.now() - _this._lastShareTime;
                if (complate) {
                    if (Date.now() - _this._lastShareTime > 2000) {
                        complate(true);
                    }
                    else {
                        complate(false);
                    }
                }
            };
            Laya.Browser.window["wx"].onShow(WXAPI._onShow);
            this._lastShareTime = Date.now();
            Laya.Browser.window["wx"].shareAppMessage({
                title: titel,
                imageUrl: imageUrl
            });
        }
    };
    //----------------------------------------------------------------------
    //--------------------插屏幕广告---------------------------------------
    WXAPI.showInterstitialAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onMiniGame) {
            var interstitialAd = Laya.Browser.window["wx"].createInterstitialAd({
                adUnitId: WXAPI.InsAdUnitId,
            });
            interstitialAd.onLoad(function () {
                console.log('插屏广告 加载完成');
                interstitialAd.show().catch(function (err) {
                    console.log('插屏广告 显示失败 ：' + err);
                    if (onFailed) {
                        onFailed();
                    }
                });
            });
            interstitialAd.onError(function (err) {
                console.log('插屏广告 加载失败' + err);
                if (onFailed) {
                    onFailed();
                }
            });
            interstitialAd.onClose(function () {
                console.log('插屏广告 关闭');
                if (onAdClose) {
                    onAdClose();
                }
            });
        }
        else {
            onAdClose();
        }
    };
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html
     * @static
     * @returns {LaunchOptions}
     * @memberof WXAPI
     */
    WXAPI.getLaunchOptionsSync = function () {
        // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
        if (Laya.Browser.onMiniGame) {
            var obj_1 = Laya.Browser.window["wx"].getLaunchOptionsSync();
            console.log("场景值 " + obj_1.scene);
            var str = JSON.stringify(obj_1.query);
            console.log("Query参数 " + str);
            var key = obj_1.query["key"];
            console.log("Query参数：key " + key);
            console.log("ShareTicket " + obj_1.shareTicket);
            console.log("ReferrerInfo.appId " + obj_1.referrerInfo.appId);
            console.log("ReferrerInfo.extraData " + obj_1.referrerInfo.extraData);
            return obj_1;
        }
        var obj = { scene: 1001, query: "", shareTicket: "", appId: "", extraData: "" };
        return obj;
    };
    //----------------------------------------------------------------------
    /**
     * 打开微信左上角分享转发点击事件,在游戏逻辑中调用一次即可
     * 注意此方法只会在真机上执行，在微信模拟器环境下点击转发按钮什么都不会发生
     *
     * @static
     * @param {string} titel 分享标题
     * @param {string} imageUrl 分享图片地址
     * @param {Function} [success] 成功回调函数(可不填)
     * @param {Function} [fail] 失败回调函数(可不填)
     * @param {Function} [complate] 完成回调函数，成功失败都会执行(可不填)
     * @memberof WXAPI
     */
    WXAPI.SetShareMenu = function (titel, imageUrl, success, fail, complate) {
        if (Laya.Browser.onMiniGame) {
            console.log("小游戏设置转发按钮");
            Laya.Browser.window["wx"].showShareMenu({
                withShareTicket: false,
                success: success,
                fail: fail,
                complete: complate
            });
            Laya.Browser.window["wx"].onShareAppMessage(function () {
                return {
                    title: titel,
                    imageUrl: imageUrl
                };
            });
        }
    };
    //检测更新
    WXAPI.checkUpdate = function () {
        if (Laya.Browser.onMiniGame) {
            var updateManager = Laya.Browser.window["wx"].getUpdateManager();
            updateManager.onCheckForUpdate(function (res) {
                console.log("是否需要更新 : ", res.hasUpdate);
            });
            updateManager.onUpdateReady(function () {
                Laya.Browser.window["wx"].showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启小游戏？',
                    success: function (res) {
                        if (res.confirm) {
                            updateManager.applyUpdate();
                        }
                    }
                });
            });
            updateManager.onUpdateFailed(function () {
                console.log("新版本下载失败!!!");
            });
        }
    };
    //尝试打开微信狂点界面
    //titel 界面中显示的文本
    //onComplete 当狂点完成时
    //onSuccess 当狂点界面打开成功
    //onFail 当狂点界面打开失败
    WXAPI.tryShowWXCrazyClick = function (titel, onComplete, onSuccess, onFail) {
        if (!WudianMgr_1.default.WudianFlag || 1 != AppSwitchConfig_1.default.getInstance().getAppSwitchData().wxcfg.kuangdianBanner) {
            if (onFail) {
                onFail();
            }
            return;
        }
        var kuangdianLevelSpcacing = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wxcfg.kuangdianLevelSpcacing;
        if (0 != kuangdianLevelSpcacing) {
            var left = WXAPI._crazyClickShowCounter % kuangdianLevelSpcacing;
            if (0 == left) {
                ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.WXCrazyClick, {
                    Complete: onComplete,
                    titel: titel
                }, function (v) {
                    if (onSuccess) {
                        onSuccess();
                    }
                });
            }
            else {
                if (onFail) {
                    onFail();
                }
            }
            ++WXAPI._crazyClickShowCounter;
        }
        else {
            ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.WXCrazyClick, {
                Complete: onComplete,
                titel: titel
            }, function (v) {
                if (onSuccess) {
                    onSuccess();
                }
            });
        }
    };
    WXAPI.adUnitId = "adunit-8b95c9adf1c8c4dd";
    WXAPI.bannerAdUnitId = "adunit-bc8ea70dc06cfba9";
    WXAPI.InsAdUnitId = "adunit-440e21cc02c0d282";
    WXAPI.GameRecorder = new GameRecorder();
    //-------------------------激励视频---------------------------------
    WXAPI._isRegRewardedVideoAdEvent = false;
    WXAPI._onRewardedVideoAdFailed = null;
    WXAPI._onRewardedVideoAdClose = null;
    //----------------------------------------------------------------------
    //---------------------分享----------------------------------------
    WXAPI._onShow = null;
    WXAPI._lastShareTime = 0;
    WXAPI._crazyClickShowCounter = 0;
    return WXAPI;
}());
exports.default = WXAPI;
},{"./Config/AppSwitchConfig":4,"./Mgr/ViewMgr":21,"./Mgr/WudianMgr":23}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene = Laya.Scene;
var REG = Laya.ClassUtils.regClass;
var ui;
(function (ui) {
    var View;
    (function (View) {
        var LoadingUI = /** @class */ (function (_super) {
            __extends(LoadingUI, _super);
            function LoadingUI() {
                return _super.call(this) || this;
            }
            LoadingUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(LoadingUI.uiView);
            };
            LoadingUI.uiView = { "type": "Scene", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Image", "props": { "top": -100, "skin": "GameView/轮播ad.png", "right": 0, "name": "bg", "left": 0, "bottom": -100 }, "compId": 26 }, { "type": "Clip", "props": { "y": 0, "x": 1, "width": 750, "name": "Bg", "height": 1334 }, "compId": 6, "child": [{ "type": "Clip", "props": { "right": 0, "name": "BottomZone", "left": 0, "height": 570, "bottom": 100 }, "compId": 23, "child": [{ "type": "Clip", "props": { "y": 326, "x": 376, "width": 615, "skin": "Loading/loadingxiatiao.png", "pivotY": 22, "pivotX": 308, "name": "processBarBg", "height": 44 }, "compId": 8, "child": [{ "type": "Clip", "props": { "y": 22, "x": 10, "width": 594, "skin": "Loading/loadingshangtiao.png", "pivotY": 13, "name": "processBar", "left": 11, "height": 26, "bottom": 9 }, "compId": 5 }, { "type": "Text", "props": { "y": -63, "x": 190, "text": "Loading ...", "fontSize": 50, "color": "#ffffff", "runtime": "laya.display.Text" }, "compId": 27 }] }] }, { "type": "Sprite", "props": { "y": 291, "x": 22.5, "texture": "Loading/logo.png" }, "compId": 24 }] }, { "type": "Script", "props": { "y": 0, "x": 0, "runtime": "View/LoadingView/LoadingView.ts" }, "compId": 7 }], "loadList": ["GameView/轮播ad.png", "Loading/loadingxiatiao.png", "Loading/loadingshangtiao.png", "Loading/logo.png"], "loadList3D": [] };
            return LoadingUI;
        }(Scene));
        View.LoadingUI = LoadingUI;
        REG("ui.View.LoadingUI", LoadingUI);
    })(View = ui.View || (ui.View = {}));
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[17])