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
var ALDEvent_ppxhc_Def;
(function (ALDEvent_ppxhc_Def) {
    ALDEvent_ppxhc_Def["None"] = "";
    ALDEvent_ppxhc_Def["ReportAdClickSuccess"] = "\u5E7F\u544A\u5BFC\u51FA\u6210\u529F";
    ALDEvent_ppxhc_Def["ReportAdClickFail"] = "\u5E7F\u544A\u5BFC\u51FA\u5931\u8D25";
    ALDEvent_ppxhc_Def["ReportLaunchOptions"] = "\u7528\u6237\u542F\u52A8\u53C2\u6570";
    //todo:添加你自己的阿拉丁事件
})(ALDEvent_ppxhc_Def = exports.ALDEvent_ppxhc_Def || (exports.ALDEvent_ppxhc_Def = {}));
//阿拉丁相关接口
var ALD_ppxhc = /** @class */ (function () {
    function ALD_ppxhc() {
    }
    ALD_ppxhc.aldSendOpenId = function (openid) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ", openid);
        }
        else if (Laya.Browser.onQQMiniGame) {
            Laya.Browser.window["qq"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ", openid);
        }
    };
    ALD_ppxhc.aldSendEvent = function (event, data) {
        var eventName = event;
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].aldSendEvent(eventName, data);
        }
        else if (Laya.Browser.onQQMiniGame) {
            Laya.Browser.window["qq"].aldSendEvent(eventName, data);
        }
    };
    ALD_ppxhc.aldSendReportAdClickSuccess = function (data) {
        var type = ALDEvent_ppxhc_Def.ReportAdClickSuccess + " " + data.title + ":" + String(data.appid);
        ALD_ppxhc.aldSendEvent(type, {
            "导出成功": data.title + ":" + String(data.appid)
        });
    };
    ALD_ppxhc.aldSendReportAdClickFail = function (data) {
        var type = ALDEvent_ppxhc_Def.ReportAdClickFail + " " + data.title + ":" + String(data.appid);
        ALD_ppxhc.aldSendEvent(type, {
            "导出失败": data.title + ":" + String(data.appid)
        });
    };
    ALD_ppxhc.aldSendReportLaunchOptions = function (sceneid, ip, location) {
        var type = ALDEvent_ppxhc_Def.ReportLaunchOptions;
        ALD_ppxhc.aldSendEvent(type, {
            "场景值：": String(sceneid),
            "Ip：": String(ip),
            "地区：": JSON.stringify(location)
        });
    };
    return ALD_ppxhc;
}());
exports.default = ALD_ppxhc;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_ppxhc_Config = /** @class */ (function () {
    function App_ppxhc_Config() {
    }
    App_ppxhc_Config.App_ppxhc_ID = "";
    App_ppxhc_Config.Res_ppxhc_Server = "subRes"; //资源服务器地址
    App_ppxhc_Config.Local_ppxhc_TestReServer = App_ppxhc_Config.Res_ppxhc_Server; //本地测试资源服务器地址
    App_ppxhc_Config.ppxhc_Versions = "0.0.0";
    App_ppxhc_Config.onTTMiniGame_ppxhc_ = false; //是否是头条小游戏
    App_ppxhc_Config.GameName = ""; //游戏名称
    App_ppxhc_Config.showLoadingLogo = false; //是否再在加载界面显示公司Logo;
    return App_ppxhc_Config;
}());
exports.default = App_ppxhc_Config;
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
},{"./Config/AppSwitchConfig":5}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
var CachedWXBanner_ppxhc_Ad = /** @class */ (function () {
    function CachedWXBanner_ppxhc_Ad() {
    }
    CachedWXBanner_ppxhc_Ad.preloadBanner = function () {
        var wxWuDianBanners = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wxWuDianBanners;
        var bannerTodayBannerMax = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerTodayBannerMax;
        var preLoadBanners = new Array();
        for (var i = 0; i < wxWuDianBanners.length; ++i) {
            preLoadBanners.push(wxWuDianBanners[i]);
        }
        if (preLoadBanners.length > bannerTodayBannerMax) {
            var delNum = preLoadBanners.length - bannerTodayBannerMax;
            for (var i = 0; i < delNum; ++i) {
                preLoadBanners.splice(Math.floor(Math.random() * preLoadBanners.length), 1);
            }
        }
        console.log("开始预创建微信Bannaer", preLoadBanners);
        console.log("Bannaer 最大数限制 ：", bannerTodayBannerMax);
        var counter = 0;
        Laya.timer.loop(2000, CachedWXBanner_ppxhc_Ad._preLoopObj, function () {
            if (counter >= preLoadBanners.length) {
                Laya.timer.clearAll(CachedWXBanner_ppxhc_Ad._preLoopObj);
                return;
            }
            var bannerid = preLoadBanners[counter];
            var banner = CachedWXBanner_ppxhc_Ad._bannerCache[bannerid];
            if (null == banner) {
                banner = CachedWXBanner_ppxhc_Ad.create(bannerid);
                if (null != banner) {
                    CachedWXBanner_ppxhc_Ad._bannerCache[bannerid] = banner;
                    console.log("预创建微信Bannaer", bannerid, "完成");
                }
            }
            ++counter;
        });
    };
    CachedWXBanner_ppxhc_Ad.getBanner = function (bannerid) {
        if (null == bannerid || "" == bannerid)
            return null;
        var banner = CachedWXBanner_ppxhc_Ad._bannerCache[bannerid];
        if (null == banner) {
            banner = CachedWXBanner_ppxhc_Ad.create(bannerid);
            if (null != banner) {
                CachedWXBanner_ppxhc_Ad._bannerCache[bannerid] = banner;
            }
        }
        return banner;
    };
    CachedWXBanner_ppxhc_Ad.create = function (bannerid) {
        if (Laya.Browser.onMiniGame) {
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            var banner = Laya.Browser.window["wx"].createBannerAd({
                adUnitId: bannerid,
                adIntervals: 30,
                style: {
                    left: 0,
                    top: (Laya.stage.height - 240) / Laya.stage.height * sh,
                    width: sw,
                }
            });
            if (banner) {
                banner.onLoad(function (res) {
                    console.log("CachedWXBanner 广告 加载完成", bannerid);
                    console.log(res);
                });
                banner.onError(function (err) {
                    console.log("CachedWXBanner 广告 加载失败", bannerid);
                    console.log(err);
                });
                banner.onResize(function (res) {
                    console.log(banner.style.realWidth, banner.style.realHeight);
                });
            }
            return banner;
        }
        else {
            return null;
        }
    };
    CachedWXBanner_ppxhc_Ad.show = function () {
        if (null != CachedWXBanner_ppxhc_Ad._curBanner) {
            CachedWXBanner_ppxhc_Ad._curBanner.hide();
            CachedWXBanner_ppxhc_Ad._curBanner = null;
        }
        var wuDianBanners = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wxWuDianBanners;
        var bannerid = wuDianBanners[Math.floor(Math.random() * wuDianBanners.length)];
        var banner = CachedWXBanner_ppxhc_Ad.getBanner(bannerid);
        if (banner) {
            CachedWXBanner_ppxhc_Ad._curBanner = banner;
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            CachedWXBanner_ppxhc_Ad._curBanner.style.top = (Laya.stage.height - 240) / Laya.stage.height * sh;
            CachedWXBanner_ppxhc_Ad._curBanner.show();
            console.log("CachedWXBanner 广告显示 bannerid ： ", bannerid);
        }
        var time = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerFreshTimer;
        //Laya.timer.once(time * 1000,CachedWXBannerAd,CachedWXBannerAd.changeShow);
    };
    CachedWXBanner_ppxhc_Ad.hide = function () {
        Laya.timer.clearAll(CachedWXBanner_ppxhc_Ad);
        if (null != CachedWXBanner_ppxhc_Ad._curBanner) {
            CachedWXBanner_ppxhc_Ad._curBanner.hide();
            CachedWXBanner_ppxhc_Ad._curBanner = null;
        }
        console.log("CachedWXBanner 广告隐藏");
    };
    CachedWXBanner_ppxhc_Ad.changeShow = function () {
        if (null != CachedWXBanner_ppxhc_Ad._curBanner) {
            CachedWXBanner_ppxhc_Ad._curBanner.hide();
            CachedWXBanner_ppxhc_Ad._curBanner = null;
        }
        CachedWXBanner_ppxhc_Ad.show();
    };
    CachedWXBanner_ppxhc_Ad.clear = function () {
        Laya.timer.clearAll(CachedWXBanner_ppxhc_Ad);
        for (var key in CachedWXBanner_ppxhc_Ad._bannerCache) {
            var banner = CachedWXBanner_ppxhc_Ad._bannerCache[key];
            if (null != banner) {
                banner.destroy();
            }
            CachedWXBanner_ppxhc_Ad._bannerCache[key] = null;
        }
    };
    CachedWXBanner_ppxhc_Ad._bannerCache = {};
    CachedWXBanner_ppxhc_Ad._curBanner = null;
    CachedWXBanner_ppxhc_Ad._preLoopObj = {};
    return CachedWXBanner_ppxhc_Ad;
}());
exports.default = CachedWXBanner_ppxhc_Ad;
},{"./Config/AppSwitchConfig":5}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("../AppConfig");
var AppSwitch_ppxhc_Data = /** @class */ (function () {
    function AppSwitch_ppxhc_Data() {
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
        this.btnDelayTime = 1.5;
        this.wudianSceneList = new Array();
        this.continueBtnDelayTime = 2; //Exprot2ViewTemplate 中继续按钮延迟显示的时间
        this.bannerShowTime = 30;
        this.fakeBtn = 0;
        this.popAd = 0; //是否启用 Exprot3ViewTemplate,
        this.continueBanner = 0; //Exprot2ViewTemplate 是否开启Banner显示
        this.continueBannerShowTime = 2; //Exprot2ViewTemplate 中Banner延迟显示的时间 
        this.continueBannerHideTime = 2; //Exprot2ViewTemplate 中Banner显示后延迟关闭的时间 
        this.oppocfg = new OPPO_ppxhc_Cfg();
        this.qqcfg = new QQCfg();
        this.ttcfg = new TTCfg();
        this.vivocfg = new VVcfg();
        this.skinWudian = 0;
        this.wxcfg = new WXCfg();
    }
    Object.defineProperty(AppSwitch_ppxhc_Data.prototype, "wudianTimeAvaliable", {
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
    return AppSwitch_ppxhc_Data;
}());
exports.AppSwitch_ppxhc_Data = AppSwitch_ppxhc_Data;
var WXCfg = /** @class */ (function () {
    function WXCfg() {
        this.kuangdianBanner = 0;
        this.kuangdianLevelSpcacing = 0;
        this.startKuangdianLevel = 0;
    }
    return WXCfg;
}());
exports.WXCfg = WXCfg;
var OPPO_ppxhc_Cfg = /** @class */ (function () {
    function OPPO_ppxhc_Cfg() {
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
    return OPPO_ppxhc_Cfg;
}());
exports.OPPO_ppxhc_Cfg = OPPO_ppxhc_Cfg;
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
            AppSwitchConfig._instance = AppSwitchConfig.load_ppxhc_();
        }
        return AppSwitchConfig._instance;
    };
    AppSwitchConfig.load_ppxhc_ = function () {
        var config = new AppSwitchConfig();
        var json = Laya.loader.getRes(AppConfig_1.default.Res_ppxhc_Server + "/json/appswitch.json");
        if (json) {
            for (var i = 0; i < json.length; ++i) {
                var row = json[i];
                var rowData = new AppSwitch_ppxhc_Data();
                rowData.version = String(row["version"]);
                rowData.banner = Number(row["banner"]);
                rowData.wudian = Number(row["wudian"]);
                rowData.btnDelayTime = Number(row["btnDelayTime"]);
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
                    rowData.wxcfg.startKuangdianLevel = Number(cfg["startKuangdianLevel"]);
                }
                rowData.skinWudian = row["skinWudian"];
                config._data.push(rowData);
            }
            return config;
        }
        else {
            config._data.push(new AppSwitch_ppxhc_Data());
            return config;
        }
    };
    AppSwitchConfig.prototype.getAppSwitchData = function () {
        return this._data[0];
    };
    return AppSwitchConfig;
}());
exports.default = AppSwitchConfig;
},{"../AppConfig":2}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("../AppConfig");
var StoreData = /** @class */ (function () {
    function StoreData() {
        this.id = 0;
        this.icon = "";
        this.priceType = 0; //0:金币解锁，1:激励视频解锁
        this.price = 0;
    }
    StoreData.prototype.clone = function () {
        var t = new StoreData();
        t.id = this.id;
        t.icon = this.icon;
        t.priceType = this.priceType;
        t.price = this.price;
        return t;
    };
    return StoreData;
}());
exports.StoreData = StoreData;
var StoreConfig = /** @class */ (function () {
    function StoreConfig() {
        this._data = new Array();
    }
    StoreConfig.getInstance = function () {
        if (null == StoreConfig._instance) {
            StoreConfig._instance = StoreConfig.load();
        }
        return StoreConfig._instance;
    };
    StoreConfig.load = function () {
        var config = new StoreConfig();
        var json = Laya.loader.getRes(AppConfig_1.default.Res_ppxhc_Server + "/json/storeconfig.json");
        if (json) {
            for (var i = 0; i < json.length; ++i) {
                var row = json[i];
                var rowData = new StoreData();
                rowData.id = Number(row["id"]);
                rowData.icon = String(row["icon"]);
                rowData.priceType = Number(row["priceType"]);
                rowData.price = Number(row["price"]);
                config._data.push(rowData);
            }
            return config;
        }
    };
    StoreConfig.prototype.getStoreDatas = function () {
        var datas = new Array();
        for (var i = 0; i < this._data.length; ++i) {
            datas.push(this._data[i].clone());
        }
        return datas;
    };
    return StoreConfig;
}());
exports.default = StoreConfig;
},{"../AppConfig":2}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event_ppxhc_Def;
(function (Event_ppxhc_Def) {
    Event_ppxhc_Def[Event_ppxhc_Def["None"] = 0] = "None";
    Event_ppxhc_Def[Event_ppxhc_Def["App_CloseFirstLoadingView"] = 500] = "App_CloseFirstLoadingView";
    Event_ppxhc_Def[Event_ppxhc_Def["AD_OnShareAdFail"] = 501] = "AD_OnShareAdFail";
    //当界面打开
    Event_ppxhc_Def[Event_ppxhc_Def["Game_OnViewOpen"] = 600] = "Game_OnViewOpen";
    //当界面关闭
    Event_ppxhc_Def[Event_ppxhc_Def["Game_OnViewClose"] = 601] = "Game_OnViewClose";
    //当玩家金币变动
    Event_ppxhc_Def[Event_ppxhc_Def["Game_OnUserMoneyChange"] = 701] = "Game_OnUserMoneyChange";
    //当玩家钻石变动
    Event_ppxhc_Def[Event_ppxhc_Def["Game_OnUserCrystalChange"] = 702] = "Game_OnUserCrystalChange";
    //当玩家商店解锁
    Event_ppxhc_Def[Event_ppxhc_Def["Game_OnUserUnlockedStore"] = 703] = "Game_OnUserUnlockedStore";
    //当关卡开始
    Event_ppxhc_Def[Event_ppxhc_Def["Game_OnLevelStart"] = 1000] = "Game_OnLevelStart";
    //当关卡结束
    Event_ppxhc_Def[Event_ppxhc_Def["Game_OnLevelComplate"] = 1001] = "Game_OnLevelComplate";
    //误点预加载完毕
    Event_ppxhc_Def[Event_ppxhc_Def["AD_WudianBanner_LoadComplete"] = 2217] = "AD_WudianBanner_LoadComplete";
    //显示误点Banner
    Event_ppxhc_Def[Event_ppxhc_Def["AD_WudianBanner_Show"] = 2218] = "AD_WudianBanner_Show";
    //影藏误点Banner
    Event_ppxhc_Def[Event_ppxhc_Def["AD_WudianBanner_Hide"] = 2219] = "AD_WudianBanner_Hide";
    //预加载Banner
    Event_ppxhc_Def[Event_ppxhc_Def["AD_WudianBanner_PreLoad"] = 2220] = "AD_WudianBanner_PreLoad";
    //当IP屏蔽状态更新
    Event_ppxhc_Def[Event_ppxhc_Def["App_OnUpdateIpBlockState"] = 2221] = "App_OnUpdateIpBlockState";
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。
    //小车移动
    Event_ppxhc_Def[Event_ppxhc_Def["Car_Moving"] = 10001] = "Car_Moving";
    //游戏场景准备完成
    Event_ppxhc_Def[Event_ppxhc_Def["Game_ReadyCompleted"] = 10002] = "Game_ReadyCompleted";
    //游戏结算
    Event_ppxhc_Def[Event_ppxhc_Def["Game_Settle"] = 10003] = "Game_Settle";
    //小车皮肤
    Event_ppxhc_Def[Event_ppxhc_Def["Car_Skin"] = 10004] = "Car_Skin";
    //小车死亡事件
    Event_ppxhc_Def[Event_ppxhc_Def["Car_Dead"] = 10005] = "Car_Dead";
    //小车跳关事件
    Event_ppxhc_Def[Event_ppxhc_Def["Car_LevelUp"] = 10006] = "Car_LevelUp";
    //小车死亡
    Event_ppxhc_Def[Event_ppxhc_Def["Car_Death"] = 10007] = "Car_Death";
    //货物转载
    Event_ppxhc_Def[Event_ppxhc_Def["Car_LoadUp"] = 10008] = "Car_LoadUp";
    //卸货
    Event_ppxhc_Def[Event_ppxhc_Def["Car_Unload"] = 10009] = "Car_Unload";
    //抢钱触发
    Event_ppxhc_Def[Event_ppxhc_Def["Game_RobmoneyStart"] = 10010] = "Game_RobmoneyStart";
    //抢钱结算
    Event_ppxhc_Def[Event_ppxhc_Def["Game_RobmoneyEnd"] = 10011] = "Game_RobmoneyEnd";
    //游戏开始
    Event_ppxhc_Def[Event_ppxhc_Def["Game_GameStarted"] = 10012] = "Game_GameStarted";
    //换车了
    Event_ppxhc_Def[Event_ppxhc_Def["Car_Change"] = 10013] = "Car_Change";
    //提示换车开始
    Event_ppxhc_Def[Event_ppxhc_Def["Car_ChangeTipStart"] = 10014] = "Car_ChangeTipStart";
    //提示换车结束
    Event_ppxhc_Def[Event_ppxhc_Def["Car_ChangeTipEnd"] = 10015] = "Car_ChangeTipEnd";
    Event_ppxhc_Def[Event_ppxhc_Def["RewardVideoSuccess"] = 20010] = "RewardVideoSuccess";
    Event_ppxhc_Def[Event_ppxhc_Def["RewardVideoFail"] = 20011] = "RewardVideoFail";
    Event_ppxhc_Def[Event_ppxhc_Def["InsertVideoEnd"] = 20012] = "InsertVideoEnd";
})(Event_ppxhc_Def = exports.Event_ppxhc_Def || (exports.Event_ppxhc_Def = {}));
},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher = Laya.EventDispatcher;
var Event_ppxhc_Mgr = /** @class */ (function (_super) {
    __extends(Event_ppxhc_Mgr, _super);
    function Event_ppxhc_Mgr() {
        return _super.call(this) || this;
    }
    ;
    //广播事件
    Event_ppxhc_Mgr.prototype.dispatch_ = function (InName, agv) {
        Event_ppxhc_Mgr.eventDispatcher.event(InName, agv);
    };
    //注册事件
    Event_ppxhc_Mgr.prototype.regEvemt_ = function (InName, caller, listener, arg) {
        Event_ppxhc_Mgr.eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    };
    //注册单次事件
    Event_ppxhc_Mgr.prototype.regOnceEvent_ = function (InName, caller, listener, arg) {
        Event_ppxhc_Mgr.eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    };
    //移除事件注册
    Event_ppxhc_Mgr.prototype.removeEvent_ = function (InName, caller, listener, arg) {
        Event_ppxhc_Mgr.eventDispatcher.off(InName, caller, listener);
    };
    Event_ppxhc_Mgr.eventDispatcher = new EventDispatcher();
    Event_ppxhc_Mgr.instance = new Event_ppxhc_Mgr();
    return Event_ppxhc_Mgr;
}(EventDispatcher));
exports.default = Event_ppxhc_Mgr;
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var GameMgr_1 = require("./Mgr/GameMgr");
var KRQ_LoopAdBox_1 = require("./KRQ/Com/KRQ_LoopAd/KRQ_LoopAdBox");
var KRQ_VLoopAd_1 = require("./KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd");
var KRQ_Banner_1 = require("./KRQ/Com/KRQ_Banner");
var KRQ_Export_1 = require("./KRQ/ViewCom/KRQ_Export");
var KRQ_HistoryBox_1 = require("./KRQ/Com/KRQ_History/KRQ_HistoryBox");
var KRQ_History_1 = require("./KRQ/Com/KRQ_History/KRQ_History");
var KRQ_RockSingleAd_1 = require("./KRQ/Com/KRQ_RockSingleAd");
var KRQ_Floating_1 = require("./KRQ/ViewCom/KRQ_Floating");
var KRQ_RollSingleAd_1 = require("./KRQ/Com/KRQ_RollSingleAd");
var KRQ_GameOver_1 = require("./KRQ/ViewCom/KRQ_GameOver");
var KRQ_SidePull_1 = require("./KRQ/ViewCom/KRQ_SidePull");
var KRQ_HLoopAd_1 = require("./KRQ/Com/KRQ_LoopAd/KRQ_HLoopAd");
var KRQ_Main_1 = require("./KRQ/ViewCom/KRQ_Main");
var KRQ_SingleAd_1 = require("./KRQ/Com/KRQ_SingleAd");
var KRQ_GamingBanner_1 = require("./KRQ/Com/KRQ_GamingBanner");
var ButtonAnim_1 = require("./View/ButtonAnim");
var GameContinue_1 = require("./Game/GameUI/GameContinue");
var GameHistory_1 = require("./Game/GameUI/GameHistory");
var UIStart_1 = require("./Game/GameUI/UIStart");
var GameOver_1 = require("./Game/GameUI/GameOver");
var GameSkin_1 = require("./Game/GameUI/GameSkin");
var GameView_1 = require("./Game/GameUI/GameView");
var TestGame_1 = require("./View/Game/TestGame");
var TrialSkin_1 = require("./Game/GameUI/TrialSkin");
var TwinkleSprite_1 = require("./View/TwinkleSprite");
var ClickGetPrize_1 = require("./View/ClickGetPrize/ClickGetPrize");
var LoadingView_1 = require("./View/LoadingView/LoadingView");
var Exprot2ViewTemplate_1 = require("./View/TemplateViews/Export2/Exprot2ViewTemplate");
var ViewAutoScaleByW_1 = require("./View/Common/ViewAutoScaleByW");
var Exprot3ViewTemplate_1 = require("./View/TemplateViews/Export3/Exprot3ViewTemplate");
var ExportViewTemplate_1 = require("./View/TemplateViews/Export/ExportViewTemplate");
var GameFailViewTemplate_1 = require("./View/TemplateViews/GameFail/GameFailViewTemplate");
var GameWinViewTemplate_1 = require("./View/TemplateViews/GameWin/GameWinViewTemplate");
var InGameViewTemplate_1 = require("./View/TemplateViews/InGame/InGameViewTemplate");
var MainViewTemplate_1 = require("./View/TemplateViews/Main/MainViewTemplate");
var MiniGameViewTemplate_1 = require("./View/TemplateViews/MiniGame/MiniGameViewTemplate");
var OPPONativeAdViewTemplate_1 = require("./View/TemplateViews/OPPONativeAd/OPPONativeAdViewTemplate");
var QQCrazyClick_1 = require("./View/QQTemplate/QQCrazyClick/QQCrazyClick");
var QQCrazyClick2_1 = require("./View/QQTemplate/QQCrazyClick/QQCrazyClick2");
var QQGameFailViewTemplate_1 = require("./View/QQTemplate/GameFail/QQGameFailViewTemplate");
var QQGameWinViewTemplate_1 = require("./View/QQTemplate/GameWin/QQGameWinViewTemplate");
var QQInGameViewTemplate_1 = require("./View/QQTemplate/InGame/QQInGameViewTemplate");
var QQMainViewTemplate_1 = require("./View/QQTemplate/Main/QQMainViewTemplate");
var RewardViewTemplate_1 = require("./View/TemplateViews/Reward/RewardViewTemplate");
var TTCrazyClick_1 = require("./View/TTTemplate/TTCrazyClick/TTCrazyClick");
var TTGameFailViewTemplate_1 = require("./View/TTTemplate/GameFail/TTGameFailViewTemplate");
var TTGameWinViewTemplate_1 = require("./View/TTTemplate/GameWin/TTGameWinViewTemplate");
var TTMainViewTemplate_1 = require("./View/TTTemplate/Main/TTMainViewTemplate");
var TTMoreReward_1 = require("./View/TTTemplate/MoreReward/TTMoreReward");
var TTResurrection_1 = require("./View/TTTemplate/Resurrection/TTResurrection");
var TTReward_1 = require("./View/TTTemplate/Reward/TTReward");
var RewardBox_1 = require("./View/TTTemplate/Reward/RewardBox");
var TTSignIn_1 = require("./View/TTTemplate/SignIn/TTSignIn");
var TTSkinTips_1 = require("./View/TTTemplate/SkinTips/TTSkinTips");
var TTStore_1 = require("./View/TTTemplate/Store/TTStore");
var StoreBox_1 = require("./View/TTTemplate/Store/StoreBox");
var PageList_1 = require("./View/TTTemplate/Store/PageList");
var VVNativeAd1View_1 = require("./View/VVTemplate/NativeAd/VVNativeAd1View");
var VVNativeAd2View_1 = require("./View/VVTemplate/NativeAd/VVNativeAd2View");
var WXCrazyClick_1 = require("./View/TemplateViews/WXCrazyClick/WXCrazyClick");
var TipsView_1 = require("./View/TipsView/TipsView");
var LoopAdBox_1 = require("./ShareAd/View/LoopAdBox");
var HorizontalLoopAdView_1 = require("./ShareAd/View/HorizontalLoopAdView");
var BannerAdView_1 = require("./ShareAd/View/BannerAdView");
var UniversalBottomZone_1 = require("./View/Common/UniversalBottomZone");
/*
* 游戏初始化配置;
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        var reg = Laya.ClassUtils.regClass;
        reg("Mgr/GameMgr.ts", GameMgr_1.default);
        reg("KRQ/Com/KRQ_LoopAd/KRQ_LoopAdBox.ts", KRQ_LoopAdBox_1.default);
        reg("KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd.ts", KRQ_VLoopAd_1.default);
        reg("KRQ/Com/KRQ_Banner.ts", KRQ_Banner_1.default);
        reg("KRQ/ViewCom/KRQ_Export.ts", KRQ_Export_1.default);
        reg("KRQ/Com/KRQ_History/KRQ_HistoryBox.ts", KRQ_HistoryBox_1.default);
        reg("KRQ/Com/KRQ_History/KRQ_History.ts", KRQ_History_1.default);
        reg("KRQ/Com/KRQ_RockSingleAd.ts", KRQ_RockSingleAd_1.default);
        reg("KRQ/ViewCom/KRQ_Floating.ts", KRQ_Floating_1.default);
        reg("KRQ/Com/KRQ_RollSingleAd.ts", KRQ_RollSingleAd_1.default);
        reg("KRQ/ViewCom/KRQ_GameOver.ts", KRQ_GameOver_1.default);
        reg("KRQ/ViewCom/KRQ_SidePull.ts", KRQ_SidePull_1.default);
        reg("KRQ/Com/KRQ_LoopAd/KRQ_HLoopAd.ts", KRQ_HLoopAd_1.default);
        reg("KRQ/ViewCom/KRQ_Main.ts", KRQ_Main_1.default);
        reg("KRQ/Com/KRQ_SingleAd.ts", KRQ_SingleAd_1.default);
        reg("KRQ/Com/KRQ_GamingBanner.ts", KRQ_GamingBanner_1.default);
        reg("View/ButtonAnim.ts", ButtonAnim_1.default);
        reg("Game/GameUI/GameContinue.ts", GameContinue_1.default);
        reg("Game/GameUI/GameHistory.ts", GameHistory_1.default);
        reg("Game/GameUI/UIStart.ts", UIStart_1.default);
        reg("Game/GameUI/GameOver.ts", GameOver_1.default);
        reg("Game/GameUI/GameSkin.ts", GameSkin_1.default);
        reg("Game/GameUI/GameView.ts", GameView_1.default);
        reg("View/Game/TestGame.ts", TestGame_1.default);
        reg("Game/GameUI/TrialSkin.ts", TrialSkin_1.default);
        reg("View/TwinkleSprite.ts", TwinkleSprite_1.default);
        reg("View/ClickGetPrize/ClickGetPrize.ts", ClickGetPrize_1.default);
        reg("View/LoadingView/LoadingView.ts", LoadingView_1.default);
        reg("View/TemplateViews/Export2/Exprot2ViewTemplate.ts", Exprot2ViewTemplate_1.default);
        reg("View/Common/ViewAutoScaleByW.ts", ViewAutoScaleByW_1.default);
        reg("View/TemplateViews/Export3/Exprot3ViewTemplate.ts", Exprot3ViewTemplate_1.default);
        reg("View/TemplateViews/Export/ExportViewTemplate.ts", ExportViewTemplate_1.default);
        reg("View/TemplateViews/GameFail/GameFailViewTemplate.ts", GameFailViewTemplate_1.default);
        reg("View/TemplateViews/GameWin/GameWinViewTemplate.ts", GameWinViewTemplate_1.default);
        reg("View/TemplateViews/InGame/InGameViewTemplate.ts", InGameViewTemplate_1.default);
        reg("View/TemplateViews/Main/MainViewTemplate.ts", MainViewTemplate_1.default);
        reg("View/TemplateViews/MiniGame/MiniGameViewTemplate.ts", MiniGameViewTemplate_1.default);
        reg("View/TemplateViews/OPPONativeAd/OPPONativeAdViewTemplate.ts", OPPONativeAdViewTemplate_1.default);
        reg("View/QQTemplate/QQCrazyClick/QQCrazyClick.ts", QQCrazyClick_1.default);
        reg("View/QQTemplate/QQCrazyClick/QQCrazyClick2.ts", QQCrazyClick2_1.default);
        reg("View/QQTemplate/GameFail/QQGameFailViewTemplate.ts", QQGameFailViewTemplate_1.default);
        reg("View/QQTemplate/GameWin/QQGameWinViewTemplate.ts", QQGameWinViewTemplate_1.default);
        reg("View/QQTemplate/InGame/QQInGameViewTemplate.ts", QQInGameViewTemplate_1.default);
        reg("View/QQTemplate/Main/QQMainViewTemplate.ts", QQMainViewTemplate_1.default);
        reg("View/TemplateViews/Reward/RewardViewTemplate.ts", RewardViewTemplate_1.default);
        reg("View/TTTemplate/TTCrazyClick/TTCrazyClick.ts", TTCrazyClick_1.default);
        reg("View/TTTemplate/GameFail/TTGameFailViewTemplate.ts", TTGameFailViewTemplate_1.default);
        reg("View/TTTemplate/GameWin/TTGameWinViewTemplate.ts", TTGameWinViewTemplate_1.default);
        reg("View/TTTemplate/Main/TTMainViewTemplate.ts", TTMainViewTemplate_1.default);
        reg("View/TTTemplate/MoreReward/TTMoreReward.ts", TTMoreReward_1.default);
        reg("View/TTTemplate/Resurrection/TTResurrection.ts", TTResurrection_1.default);
        reg("View/TTTemplate/Reward/TTReward.ts", TTReward_1.default);
        reg("View/TTTemplate/Reward/RewardBox.ts", RewardBox_1.default);
        reg("View/TTTemplate/SignIn/TTSignIn.ts", TTSignIn_1.default);
        reg("View/TTTemplate/SkinTips/TTSkinTips.ts", TTSkinTips_1.default);
        reg("View/TTTemplate/Store/TTStore.ts", TTStore_1.default);
        reg("View/TTTemplate/Store/StoreBox.ts", StoreBox_1.default);
        reg("View/TTTemplate/Store/PageList.ts", PageList_1.default);
        reg("View/VVTemplate/NativeAd/VVNativeAd1View.ts", VVNativeAd1View_1.default);
        reg("View/VVTemplate/NativeAd/VVNativeAd2View.ts", VVNativeAd2View_1.default);
        reg("View/TemplateViews/WXCrazyClick/WXCrazyClick.ts", WXCrazyClick_1.default);
        reg("View/TipsView/TipsView.ts", TipsView_1.default);
        reg("ShareAd/View/LoopAdBox.ts", LoopAdBox_1.default);
        reg("ShareAd/View/HorizontalLoopAdView.ts", HorizontalLoopAdView_1.default);
        reg("ShareAd/View/BannerAdView.ts", BannerAdView_1.default);
        reg("View/Common/UniversalBottomZone.ts", UniversalBottomZone_1.default);
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
},{"./Game/GameUI/GameContinue":20,"./Game/GameUI/GameHistory":21,"./Game/GameUI/GameOver":22,"./Game/GameUI/GameSkin":23,"./Game/GameUI/GameView":24,"./Game/GameUI/TrialSkin":25,"./Game/GameUI/UIStart":26,"./KRQ/Com/KRQ_Banner":47,"./KRQ/Com/KRQ_GamingBanner":49,"./KRQ/Com/KRQ_History/KRQ_History":50,"./KRQ/Com/KRQ_History/KRQ_HistoryBox":51,"./KRQ/Com/KRQ_LoopAd/KRQ_HLoopAd":52,"./KRQ/Com/KRQ_LoopAd/KRQ_LoopAdBox":53,"./KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd":54,"./KRQ/Com/KRQ_RockSingleAd":55,"./KRQ/Com/KRQ_RollSingleAd":56,"./KRQ/Com/KRQ_SingleAd":57,"./KRQ/ViewCom/KRQ_Export":58,"./KRQ/ViewCom/KRQ_Floating":59,"./KRQ/ViewCom/KRQ_GameOver":60,"./KRQ/ViewCom/KRQ_Main":61,"./KRQ/ViewCom/KRQ_SidePull":62,"./Mgr/GameMgr":66,"./ShareAd/View/BannerAdView":80,"./ShareAd/View/HorizontalLoopAdView":81,"./ShareAd/View/LoopAdBox":82,"./View/ButtonAnim":87,"./View/ClickGetPrize/ClickGetPrize":88,"./View/Common/UniversalBottomZone":89,"./View/Common/ViewAutoScaleByW":90,"./View/Game/TestGame":91,"./View/LoadingView/LoadingView":93,"./View/QQTemplate/GameFail/QQGameFailViewTemplate":94,"./View/QQTemplate/GameWin/QQGameWinViewTemplate":95,"./View/QQTemplate/InGame/QQInGameViewTemplate":96,"./View/QQTemplate/Main/QQMainViewTemplate":97,"./View/QQTemplate/QQCrazyClick/QQCrazyClick":98,"./View/QQTemplate/QQCrazyClick/QQCrazyClick2":99,"./View/TTTemplate/GameFail/TTGameFailViewTemplate":101,"./View/TTTemplate/GameWin/TTGameWinViewTemplate":102,"./View/TTTemplate/Main/TTMainViewTemplate":103,"./View/TTTemplate/MoreReward/TTMoreReward":104,"./View/TTTemplate/Resurrection/TTResurrection":105,"./View/TTTemplate/Reward/RewardBox":106,"./View/TTTemplate/Reward/TTReward":107,"./View/TTTemplate/SignIn/TTSignIn":108,"./View/TTTemplate/SkinTips/TTSkinTips":109,"./View/TTTemplate/Store/PageList":110,"./View/TTTemplate/Store/StoreBox":111,"./View/TTTemplate/Store/TTStore":112,"./View/TTTemplate/TTCrazyClick/TTCrazyClick":113,"./View/TemplateViews/Export/ExportViewTemplate":117,"./View/TemplateViews/Export2/Exprot2ViewTemplate":115,"./View/TemplateViews/Export3/Exprot3ViewTemplate":116,"./View/TemplateViews/GameFail/GameFailViewTemplate":118,"./View/TemplateViews/GameWin/GameWinViewTemplate":119,"./View/TemplateViews/InGame/InGameViewTemplate":120,"./View/TemplateViews/Main/MainViewTemplate":121,"./View/TemplateViews/MiniGame/MiniGameViewTemplate":122,"./View/TemplateViews/OPPONativeAd/OPPONativeAdViewTemplate":123,"./View/TemplateViews/Reward/RewardViewTemplate":124,"./View/TemplateViews/WXCrazyClick/WXCrazyClick":126,"./View/TipsView/TipsView":127,"./View/TwinkleSprite":128,"./View/VVTemplate/NativeAd/VVNativeAd1View":129,"./View/VVTemplate/NativeAd/VVNativeAd2View":130}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FSMStateMachine_1 = require("../StateMachine/FSMStateMachine");
var Game_1 = require("../Game");
var getHandler = Laya.Handler.create;
var CameraFollow = /** @class */ (function (_super) {
    __extends(CameraFollow, _super);
    function CameraFollow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.followSpeed = 10;
        _this.offsetPosition = new Laya.Vector3;
        _this.animator = null;
        _this.stateMachine = null;
        return _this;
    }
    Object.defineProperty(CameraFollow.prototype, "transform", {
        get: function () {
            return this.owner.transform;
        },
        enumerable: true,
        configurable: true
    });
    CameraFollow.prototype.onAwake = function () {
        this.camera = this.owner.getChildByName("Main Camera");
        this.animator = this.camera.getComponent(Laya.Animator);
        this.animator.play("Default");
        this.stateMachine = new FSMStateMachine_1.default;
        this.stateMachine.AddAction("Default", this, this.OnDefaultEnter);
        this.stateMachine.AddAction("Driving", this, this.OnDrivingEnter);
        this.stateMachine.AddAction("Win", this, this.OnWinEnter);
        this.stateMachine.AddAction("Cave", this, this.OnCaveEnter, this.OnCaveExit);
        this.stateMachine.Switch("Default");
    };
    CameraFollow.prototype.Switch = function (key) {
        this.stateMachine.Switch(key);
    };
    CameraFollow.prototype.TweenOffset = function (x, y, z, duration) {
        Laya.Tween.clearTween(this.offsetPosition);
        Laya.Tween.to(this.offsetPosition, { x: x, y: y, z: z }, duration * 1000);
    };
    CameraFollow.prototype.OnDefaultEnter = function () {
        this.animator.play("Default");
    };
    CameraFollow.prototype.OnDrivingEnter = function () {
        var _this = this;
        var state = this.animator.getCurrentAnimatorPlayState(0);
        if (state._finish) {
            this.animator.crossFade("Driving", 0.1);
        }
        else {
            Laya.timer.once(state._lastElapsedTime * 1000, this, function () {
                _this.animator.crossFade("Driving", 1);
            });
        }
    };
    CameraFollow.prototype.OnWinEnter = function () {
        Laya.timer.clearAll(this);
        this.animator.crossFade("Win", 0.2);
    };
    CameraFollow.prototype.OnCaveEnter = function () {
        this.animator.play("EnterCave");
    };
    CameraFollow.prototype.OnCaveExit = function () {
        this.animator.play("ExitCave");
    };
    CameraFollow.prototype.SetTarget = function (target) {
        if (target == null)
            return;
        var position = target.transform.position;
        target.transform.position.cloneTo(position);
        this.transform.position = position;
        this.target = target;
        //this.target.transform.on(Laya.Event.TRANSFORM_CHANGED, this, this.OnTransformUpdate);
    };
    CameraFollow.prototype.onLateUpdate = function () {
        if (this.target == null || !Game_1.default.Control.InGameing) {
            return;
        }
        var dt = Laya.timer.delta / 1000;
        var newPosition = this.target.transform.position.clone();
        Laya.Vector3.add(newPosition, this.offsetPosition, newPosition);
        var oldPosition = this.transform.position.clone();
        Laya.Vector3.lerp(oldPosition, newPosition, /*dt * this.followSpeed*/ 1, newPosition);
        this.transform.position = newPosition;
    };
    CameraFollow.prototype.OnTransformUpdate = function (flag) {
    };
    return CameraFollow;
}(Laya.Script3D));
exports.default = CameraFollow;
},{"../Game":17,"../StateMachine/FSMStateMachine":44}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseBuffer = /** @class */ (function () {
    function BaseBuffer(name, duration) {
        this._name = name;
        this.duration = duration;
    }
    BaseBuffer.prototype.Start = function (car) {
        this._startTime = Laya.timer.currTimer;
        this.OnEnable(car);
    };
    BaseBuffer.prototype.TryUpdateBuffer = function (car) {
        this.OnUpdate(car);
        return (Laya.timer.currTimer - this._startTime) <= this.duration;
    };
    BaseBuffer.prototype.Stop = function (car) {
        this.OnDisable(car);
    };
    return BaseBuffer;
}());
exports.default = BaseBuffer;
},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseBuffer_1 = require("./BaseBuffer");
var SpeedUpBuffer = /** @class */ (function (_super) {
    __extends(SpeedUpBuffer, _super);
    function SpeedUpBuffer(duration) {
        return _super.call(this, "SpeedUp", duration) || this;
    }
    SpeedUpBuffer.prototype.OnUpdate = function (car) {
        if (!car.m_groundForward.IsOr) {
            return;
        }
        if (car.carMachine.curState.key == "SpeedUp") {
            var force = new Laya.Vector3;
            Laya.Vector3.scale(car.m_forward, 2000, force);
            var localOffset = new Laya.Vector3;
            car.rigidbody.applyForce(force);
            car.SetSpeedUpEffect(true);
        }
        else {
            car.SetSpeedUpEffect(false);
        }
    };
    SpeedUpBuffer.prototype.OnEnable = function (car) {
    };
    SpeedUpBuffer.prototype.OnDisable = function (car) {
        car.SetSpeedUpEffect(false);
    };
    return SpeedUpBuffer;
}(BaseBuffer_1.default));
exports.default = SpeedUpBuffer;
},{"./BaseBuffer":11}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("../Game");
var HillCar_1 = require("./HillCar");
var Utilit_1 = require("../../Utilit");
var CarMgr = /** @class */ (function () {
    function CarMgr() {
        this.carPrefabs = {};
        this.carTrialPrefabs = [];
        this.currentCar = null;
    }
    Object.defineProperty(CarMgr, "Instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new CarMgr;
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    CarMgr.prototype.Init = function () {
        var prefab = Game_1.default.Prefabs["Cars"];
        var cars = prefab;
        for (var i = 0; i < cars._children.length; i++) {
            var node = cars._children[i];
            this.carPrefabs[node.name] = node;
        }
        prefab = Game_1.default.Prefabs["Prefab"];
        var trails = prefab.getChildByName("Trails");
        for (var i = 0; i < trails._children.length; i++) {
            var node = trails._children[i];
            this.carTrialPrefabs.push(node);
        }
    };
    CarMgr.prototype.CreateCar = function (level, position) {
        var prefab = this.carPrefabs[level];
        if (prefab == null) {
            return;
        }
        var node = Laya.Sprite3D.instantiate(prefab, Game_1.default.Scene, false, position);
        node.transform.localRotationEulerY = 0;
        this.currentCar = node.addComponent(HillCar_1.default);
    };
    CarMgr.prototype.CreateShowCar = function (level, parent, position, euler) {
        var prefab = this.carPrefabs[level];
        if (prefab == null) {
            return;
        }
        var rotation = new Laya.Quaternion;
        Utilit_1.default.QuaternionEuler(euler.x, euler.x, euler.x, rotation);
        var node = Laya.Sprite3D.instantiate(prefab, parent);
        node.transform.localPosition = position;
        node.transform.localRotationEuler = euler;
        node.getComponent(Laya.Rigidbody3D).isKinematic = true;
    };
    CarMgr.prototype.CreateTrail = function (parent, index) {
        index = Utilit_1.default.Clamp(index, 0, this.carTrialPrefabs.length);
        var tempTrail = Laya.TrailSprite3D.instantiate(this.carTrialPrefabs[index]);
        tempTrail.active = true;
        tempTrail.trailFilter.time = 2;
        //(tempTrail.trailRenderer.material as Laya.TrailMaterial).color = new Laya.Vector4(1, 1, 1);
        tempTrail.trailFilter.alignment = Laya.TrailFilter.ALIGNMENT_TRANSFORM_Z;
        parent.addChild(tempTrail);
        tempTrail.transform.localPosition = new Laya.Vector3;
    };
    CarMgr.prototype.Clear = function () {
        this.currentCar.owner.removeSelf();
        this.currentCar.owner.destroy();
        this.currentCar = null;
    };
    return CarMgr;
}());
exports.default = CarMgr;
},{"../../Utilit":85,"../Game":17,"./HillCar":15}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("../Game");
var Utilit_1 = require("../../Utilit");
var Carframe = /** @class */ (function (_super) {
    __extends(Carframe, _super);
    function Carframe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layerMask = 5;
        _this.axleInfos = [];
        _this.rigidbody = null;
        _this.SuspensionForce = 2000;
        _this.SuspensionLength = 1;
        _this.Damper = 0;
        _this.AntiRollForce = 2000;
        return _this;
    }
    Object.defineProperty(Carframe.prototype, "transform", {
        get: function () {
            return this.owner.transform;
        },
        enumerable: true,
        configurable: true
    });
    Carframe.prototype.onAwake = function () {
        this.rigidbody = this.owner.getComponent(Laya.Rigidbody3D);
        this.rigidbody.collisionGroup = this.layerMask & ~1;
        this.rigidbody.mass = 70;
        this.rigidbody.linearDamping = 0.9;
        this.rigidbody.angularDamping = 0.999;
        this.rigidbody.overrideGravity = true;
        this.rigidbody.gravity = new Laya.Vector3(0, -30, 0);
    };
    Carframe.prototype.AddFrontWheel = function (leftWheel, rightWheel) {
        var axle = new AxleInfo();
        axle.IsFront = true;
        axle.LeftWheel = leftWheel;
        axle.RightWheel = rightWheel;
        this.axleInfos.push(axle);
    };
    Carframe.prototype.AddBackWheel = function (leftWheel, rightWheel) {
        var axle = new AxleInfo();
        axle.IsBack = true;
        axle.LeftWheel = leftWheel;
        axle.RightWheel = rightWheel;
        this.axleInfos.push(axle);
    };
    Carframe.prototype.onUpdate = function () {
        this.rigidbody.wakeUp();
        for (var i = 0; i < this.axleInfos.length; i++) {
            var t = this.axleInfos[i];
            t.LastLeftWheelResult = this.HandleWheel(t.LeftWheel);
            t.LastRightWheelResult = this.HandleWheel(t.RightWheel);
        }
        for (var i = 0; i < this.axleInfos.length; i++) {
            this.HandleBalance(this.axleInfos[i]);
        }
        this.OnCarTransform();
    };
    Carframe.prototype.OnCarTransform = function () {
    };
    Carframe.prototype.GetGroundBasedForward = function () {
        var front = Laya.Vector3._ZERO.clone();
        var back = Laya.Vector3._ZERO.clone();
        for (var i = 0; i < this.axleInfos.length; i++) {
            var t = this.axleInfos[i];
            if (t.LastLeftWheelResult == null || t.LastRightWheelResult == null) {
                continue;
            }
            var value = new Laya.Vector3;
            Laya.Vector3.add(t.LastLeftWheelResult.ImpactPoint, t.LastRightWheelResult.ImpactPoint, value);
            Laya.Vector3.scale(value, 0.50, value);
            t.IsFront && (front = value);
            t.IsBack && (back = value);
        }
        var result = new FrontBackVectorPair();
        result.Front = front;
        result.Back = back;
        return result;
    };
    Carframe.prototype.HandleWheel = function (wheel) {
        var up = this.GetTransformUp(wheel);
        var position = wheel.transform.position.clone();
        var rayDir = new Laya.Vector3();
        Laya.Vector3.scale(up, -1, rayDir);
        var ray = new Laya.Ray(position, rayDir);
        var hitResult = new Laya.HitResult;
        if (!Game_1.default.Scene.physicsSimulation.rayCast(ray, hitResult, this.SuspensionLength, 1, 1)) {
            return null;
        }
        var distance = Laya.Vector3.distance(ray.origin, hitResult.point);
        var amount = this.Round(1 - distance / this.SuspensionLength, 2);
        var result = new WheelRaycastResult();
        result.Hit = hitResult;
        result.CompressionRatioPre = result.CompressionRatio;
        result.CompressionRatio = amount;
        result.ImpactPoint = hitResult.point.clone();
        var totalForce = new Laya.Vector3;
        var pushBackForce = new Laya.Vector3;
        Laya.Vector3.scale(up, this.SuspensionForce * amount, pushBackForce);
        var damperForce = new Laya.Vector3();
        Laya.Vector3.scale(up, (result.CompressionRatio - result.CompressionRatioPre) * (Laya.timer.delta / 1000) * this.Damper, damperForce);
        Laya.Vector3.add(pushBackForce, damperForce, totalForce);
        var wheelPosition = wheel.transform.localPosition.clone();
        Laya.Vector3.subtract(wheelPosition, new Laya.Vector3(0, 5, 0), wheelPosition);
        Utilit_1.default.TransformPoint(wheel.transform, wheelPosition, wheelPosition);
        var localOffset = wheelPosition;
        Laya.Vector3.subtract(localOffset, this.transform.position, localOffset);
        this.rigidbody.applyForce(pushBackForce, localOffset);
        return result;
    };
    Carframe.prototype.HandleBalance = function (axle) {
        var hit;
        var travelL = 1.0;
        var travelR = 1.0;
        //计算两侧轮胎在不同情况下的悬挂系数
        var groundedL = axle.LastLeftWheelResult;
        if (groundedL) {
            travelL = groundedL.CompressionRatio;
        }
        var groundedR = axle.LastLeftWheelResult;
        if (groundedR)
            travelR = groundedL.CompressionRatio;
        //计算平衡杆刚度系数
        var antiRollForce = (travelL - travelR) * this.AntiRollForce;
        //向两侧的轮胎分配力
        if (groundedL) {
            var force = new Laya.Vector3;
            Laya.Vector3.scale(this.GetTransformUp(axle.LeftWheel), -antiRollForce, force);
            var localOffset = axle.LeftWheel.transform.position.clone();
            Laya.Vector3.subtract(localOffset, this.transform.position, localOffset);
            this.rigidbody.applyForce(force, localOffset);
        }
        if (groundedR) {
            var force = new Laya.Vector3;
            Laya.Vector3.scale(this.GetTransformUp(axle.RightWheel), antiRollForce, force);
            var localOffset = axle.RightWheel.transform.position.clone();
            Laya.Vector3.subtract(localOffset, this.transform.position, localOffset);
            this.rigidbody.applyForce(force, localOffset);
        }
    };
    Carframe.prototype.GetTransformUp = function (gameobject) {
        var up = new Laya.Vector3;
        gameobject.transform.getUp(up);
        return up;
    };
    Carframe.prototype.Round = function (value, digits) {
        var multi = Math.pow(10.0, digits);
        return Math.round(value * multi) / multi;
    };
    return Carframe;
}(Laya.Script3D));
exports.default = Carframe;
var FrontBackVectorPair = /** @class */ (function () {
    function FrontBackVectorPair() {
    }
    Object.defineProperty(FrontBackVectorPair.prototype, "Heading", {
        get: function () {
            var tmep = new Laya.Vector3;
            Laya.Vector3.subtract(this.Front, this.Back, tmep);
            Laya.Vector3.normalize(tmep, tmep);
            return tmep;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrontBackVectorPair.prototype, "IsSet", {
        get: function () {
            var flag1 = Laya.Vector3.equals(this.Front, Laya.Vector3._ZERO);
            var flag2 = Laya.Vector3.equals(this.Back, Laya.Vector3._ZERO);
            return !flag1 && !flag2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrontBackVectorPair.prototype, "IsOr", {
        get: function () {
            var flag1 = Laya.Vector3.equals(this.Front, Laya.Vector3._ZERO);
            var flag2 = Laya.Vector3.equals(this.Back, Laya.Vector3._ZERO);
            return !flag1 || !flag2;
        },
        enumerable: true,
        configurable: true
    });
    return FrontBackVectorPair;
}());
exports.FrontBackVectorPair = FrontBackVectorPair;
var WheelRaycastResult = /** @class */ (function () {
    function WheelRaycastResult() {
    }
    return WheelRaycastResult;
}());
exports.WheelRaycastResult = WheelRaycastResult;
var AxleInfo = /** @class */ (function () {
    function AxleInfo() {
    }
    return AxleInfo;
}());
exports.AxleInfo = AxleInfo;
},{"../../Utilit":85,"../Game":17}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Carframe_1 = require("./Carframe");
var FSMStateMachine_1 = require("../StateMachine/FSMStateMachine");
var Utilit_1 = require("../../Utilit");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var PhysicTrigger3d_1 = require("../Tools/PhysicTrigger3d");
var CarMgr_1 = require("./CarMgr");
var Game_1 = require("../Game");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var VibrateMgr_1 = require("../../Mgr/VibrateMgr");
var getHandler = Laya.Handler.create;
var HillCar = /** @class */ (function (_super) {
    __extends(HillCar, _super);
    function HillCar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.radius = 0.5;
        _this.TurnStrength = 5000;
        _this.ForwardAcceleration = 5000;
        _this.ForwardDeceleration = 2500;
        _this.loadedCargos = [];
        _this.carMachine = null;
        _this.m_forward = new Laya.Vector3;
        _this.m_groundForward = null;
        _this.defRotateSpeed = 50;
        _this.rotateSpeed = _this.defRotateSpeed;
        _this.head = null;
        _this.buffers = {};
        _this.frontWheels = [];
        _this.backWheels = [];
        _this.backTrails = [];
        _this.speedUpdaPosition = null;
        _this.danqiEffect = null;
        _this.targetPosition = new Laya.Vector3;
        _this.cargoTrigger = null;
        _this.findTargetComplete = null;
        return _this;
    }
    HillCar.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.SuspensionLength = 1;
        this.SuspensionForce = 2000;
        this.AntiRollForce = 1000;
        this.CargoTransferPoints = this.owner.getChildByName("CargoPosition");
        this.frontWheels[0] = Utilit_1.default.FindChild(this.owner, "Wheels/FL");
        this.frontWheels[1] = Utilit_1.default.FindChild(this.owner, "Wheels/FR");
        this.backWheels[0] = Utilit_1.default.FindChild(this.owner, "Wheels/BL");
        this.backWheels[1] = Utilit_1.default.FindChild(this.owner, "Wheels/BR");
        this.backTrails[0] = this.backWheels[0].getChildByName("Trail");
        this.backTrails[1] = this.backWheels[1].getChildByName("Trail");
        this.head = this.owner.getChildByName("Head").transform;
        var raycasts = this.owner.getChildByName("Raycasts");
        this.SuspensionLength = raycasts.transform.localPositionY + this.radius;
        var frontLeft = raycasts.getChildByName("FL");
        var frontRight = raycasts.getChildByName("FR");
        var backLeft = raycasts.getChildByName("BL");
        var backRight = raycasts.getChildByName("BR");
        this.AddFrontWheel(frontLeft, frontRight);
        this.AddBackWheel(backLeft, backRight);
        this.speedUpdaPosition = this.owner.getChildByName("SpeedUpPosition");
        this.danqiEffect = this.owner.getChildByName("Fx_danqi");
        this.cargoTrigger = this.owner.getChildByName("CargoTrigger");
        var trigger = PhysicTrigger3d_1.default.GetTrigger(this.cargoTrigger);
        trigger.OnTriggerEnter(this, this.OnCargoTriggerEnter);
        trigger.OnTriggerExit(this, this.OnCargoTriggerExit);
        this.carMachine = new FSMStateMachine_1.default;
        this.carMachine.AddAction("Stand", this, null, null, this.OnStandUpdate);
        this.carMachine.AddAction("SpeedUp", this, null, this.OnSpeedUpExit, this.OnSpeedUpUpdate);
        this.carMachine.AddAction("SpeedDown", this, this.OnSpeedDownEnter, this.OnSpeedDownExit, this.OnSpeedDownUpdate);
        this.carMachine.AddAction("ShutDown", this, this.OnShutDownEnter, this.OnShutDownExit, this.OnShutDownUpdate);
        this.carMachine.AddAction("FindTarget", this, this.OnFindTargetEnter, this.OnFindTargetExit, this.OnFindTargetUpdate);
        this.carMachine.AddAction("Death", this, this.OnDeathEnter);
    };
    HillCar.prototype.SetTarget = function (position) {
        position.cloneTo(this.targetPosition);
    };
    HillCar.prototype.SetShutDown = function () {
        this.carMachine.Switch("ShutDown");
    };
    HillCar.prototype.SetSpeedUp = function () {
        this.carMachine.Switch("SpeedUp");
        //Sound_ppxhc_Mgr.instance.playSound("normalDriving");
    };
    HillCar.prototype.SetSpeedUpOver = function () {
        this.carMachine.Switch("SpeedDown");
        //Sound_ppxhc_Mgr.instance.playSound("刹车");
    };
    HillCar.prototype.SetUnload = function (position, complete) {
        this.carMachine.Switch("FindTarget", [position, complete]);
    };
    HillCar.prototype.OnShutDownEnter = function () {
        this.rigidbody.linearFactor = new Laya.Vector3(0, 1, 0);
    };
    HillCar.prototype.OnShutDownExit = function () {
        this.rigidbody.linearFactor = new Laya.Vector3(1, 1, 1);
    };
    HillCar.prototype.OnShutDownUpdate = function () {
        var velocity = this.rigidbody.linearVelocity;
        velocity.setValue(0, velocity.y, 0);
        this.rigidbody.linearVelocity = velocity;
    };
    HillCar.prototype.OnStandUpdate = function () {
    };
    HillCar.prototype.OnSpeedUpUpdate = function () {
        if (!this.m_groundForward.IsOr) {
            return;
        }
        var force = new Laya.Vector3;
        Laya.Vector3.scale(this.m_forward, this.ForwardAcceleration, force);
        var localOffset = new Laya.Vector3;
        Laya.Vector3.subtract(this.speedUpdaPosition.transform.position, this.transform.position, localOffset);
        this.rigidbody.applyForce(force, localOffset);
    };
    HillCar.prototype.OnSpeedUpExit = function () {
    };
    HillCar.prototype.OnSpeedDownEnter = function () {
        this.rotateSpeed = 0;
        for (var i = 0; i < this.backWheels.length; i++) {
            this.backWheels[i].transform.localRotationEulerX = 0;
        }
    };
    HillCar.prototype.OnSpeedDownUpdate = function () {
        var axle = this.axleInfos[1];
        var forwardNormal = new Laya.Vector3;
        Laya.Vector3.normalize(this.m_forward, forwardNormal);
        var velocityNormal = new Laya.Vector3;
        Laya.Vector3.normalize(this.rigidbody.linearVelocity, velocityNormal);
        var length = Laya.Vector3.scalarLength(this.rigidbody.linearVelocity);
        var dot = Laya.Vector3.dot(velocityNormal, forwardNormal);
        if (dot < 0.2 || ((dot * length)) < 4) {
            this.carMachine.Switch("Stand");
        }
        else {
            if (this.axleInfos[1].LastLeftWheelResult == null) {
                this.ClearTrail(0);
            }
            else {
                this.CreateTrail(0);
            }
            if (this.axleInfos[1].LastRightWheelResult == null) {
                this.ClearTrail(1);
            }
            else {
                this.CreateTrail(1);
            }
        }
    };
    HillCar.prototype.OnSpeedDownExit = function () {
        this.rotateSpeed = this.defRotateSpeed;
        this.ClearTrail(0);
        this.ClearTrail(1);
    };
    HillCar.prototype.OnFindTargetEnter = function (position, complete) {
        position.cloneTo(this.targetPosition);
        this.findTargetComplete = complete;
        this.rigidbody.linearVelocity = new Laya.Vector3();
    };
    HillCar.prototype.OnFindTargetExit = function () {
        this.rigidbody.linearVelocity = new Laya.Vector3();
    };
    HillCar.prototype.OnFindTargetUpdate = function () {
        var normal = new Laya.Vector3;
        Laya.Vector3.subtract(this.targetPosition, this.transform.position, normal);
        Laya.Vector3.normalize(normal, normal);
        Laya.Vector3.scale(normal, 7, normal);
        this.rigidbody.linearVelocity = normal;
        var distanceSqr = Laya.Vector3.distanceSquared(this.transform.position, this.targetPosition);
        if (distanceSqr <= 0.1) {
            this.findTargetComplete != null && this.findTargetComplete.run();
            this.SetShutDown();
        }
    };
    HillCar.prototype.OnDeathEnter = function () {
        VibrateMgr_1.default.vibrate_ppxhc_Long();
        SoundMgr_1.default.instance_.play_ppxhc_Sound("death");
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Car_Death);
    };
    HillCar.prototype.OnCargoTriggerEnter = function (self, other) {
        var cargo = other.owner;
        if (cargo.name.search("Cargoe") < 0) {
            return;
        }
        var index = this.loadedCargos.indexOf(cargo);
        if (index == -1) {
            this.loadedCargos.push(cargo);
        }
    };
    HillCar.prototype.OnCargoTriggerExit = function (self, other) {
        var cargo = other.owner;
        if (cargo.name.search("Cargoe") < 0) {
            return;
        }
        var index = this.loadedCargos.indexOf(cargo);
        if (index != -1) {
            this.loadedCargos.splice(index, 1);
        }
    };
    HillCar.prototype.OnCarTransform = function () {
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Car_Moving, [this, this.head.position]);
        this.UpdateBuffers();
        this.UpdateCurrentGroundForward();
        this.carMachine.Update();
        this.OrientationTarget(this.targetPosition);
        this.CheckCarState();
        this.CorrectionWheelRotation(this.frontWheels, true);
        this.CorrectionWheelRotation(this.backWheels, false);
        this.CorrectionWheelPosition(this.frontWheels, this.axleInfos[0]);
        this.CorrectionWheelPosition(this.backWheels, this.axleInfos[1]);
    };
    HillCar.prototype.UpdateCurrentGroundForward = function () {
        var groundForward = this.GetGroundBasedForward();
        if (groundForward.IsSet) {
            groundForward.Heading.cloneTo(this.m_forward);
        }
        else {
            var forward = new Laya.Vector3;
            this.transform.getForward(forward);
            Laya.Vector3.normalize(forward, forward);
            Laya.Vector3.scale(forward, -1, forward);
            forward.cloneTo(this.m_forward);
        }
        this.m_groundForward = groundForward;
    };
    HillCar.prototype.AddTurnForce = function (force) {
        var localOffset = new Laya.Vector3;
        Laya.Vector3.subtract(this.head.position, this.transform.position, localOffset);
        this.rigidbody.applyForce(force, localOffset);
    };
    HillCar.prototype.OrientationTarget = function (target, scale) {
        if (scale === void 0) { scale = 1; }
        var forwardNormal = new Laya.Vector3;
        Laya.Vector3.normalize(this.m_forward, forwardNormal);
        var velocityNormal = new Laya.Vector3;
        Laya.Vector3.normalize(this.rigidbody.linearVelocity, velocityNormal);
        var length = Laya.Vector3.scalarLength(this.rigidbody.linearVelocity);
        var dot = Laya.Vector3.dot(velocityNormal, forwardNormal);
        if (length > 2 && dot > 0.1) {
            var relativeWaypointPosition = new Laya.Vector3;
            Utilit_1.default.InverseTransformPoint(this.transform, new Laya.Vector3(target.x, this.transform.position.y, target.z), relativeWaypointPosition);
            relativeWaypointPosition.y = 0;
            var value = relativeWaypointPosition.x / Laya.Vector3.scalarLength(relativeWaypointPosition);
            var turnforce = new Laya.Vector3(1, 0, 0);
            Utilit_1.default.QuaternionVector3(this.transform.rotation, turnforce, turnforce);
            Laya.Vector3.scale(turnforce, value * this.TurnStrength * scale, turnforce);
            this.AddTurnForce(turnforce);
        }
        if (this.m_groundForward.IsSet && dot > 0.1) {
            var rotation = new Laya.Quaternion;
            Utilit_1.default.FromToRotation(velocityNormal, forwardNormal, rotation);
            Utilit_1.default.QuaternionVector3(rotation, velocityNormal, velocityNormal);
            Laya.Vector3.scale(velocityNormal, length, velocityNormal);
            this.rigidbody.linearVelocity = velocityNormal;
            // var originV = new Laya.Vector3;
            // Laya.Vector3.scale(forwardNormal, dot * length, originV);
            // let velocity = this.rigidbody.linearVelocity.clone();
            // Laya.Vector3.subtract(velocity, originV, velocity);
            // var rotation = new Laya.Quaternion;
            // Laya.Vector3.normalize(originV, velocityNormal);
            // Utilit.FromToRotation(forwardNormal, velocityNormal, rotation);
            // Utilit.QuaternionVector3(rotation, velocityNormal, velocityNormal);
            // Laya.Vector3.scale(velocityNormal, dot * length, velocityNormal);
            // Laya.Vector3.add(velocity, velocityNormal, velocity);
            // this.rigidbody.linearVelocity = velocity;
        }
    };
    HillCar.prototype.CorrectionWheelPosition = function (wheels, axis) {
        for (var i = 0; i < wheels.length; i++) {
            var wheel = wheels[i];
            var wheelResult = null;
            var position = new Laya.Vector3;
            (i == 0) && (wheelResult = axis.LastLeftWheelResult);
            (i == 1) && (wheelResult = axis.LastRightWheelResult);
            if (wheelResult != null) {
                wheelResult.ImpactPoint.cloneTo(position);
                Utilit_1.default.InverseTransformPoint(wheel.transform._parent, position, position);
                Laya.Vector3.add(position, new Laya.Vector3(0, this.radius, 0), position);
            }
            else {
                wheel.transform.localPosition.cloneTo(position);
            }
            // let threshold = this.radius;
            // position.y = Math.max(-threshold, Math.min(position.y, threshold));
            var newPostion = wheel.transform.localPosition;
            Laya.Vector3.lerp(newPostion, position, 0.5, newPostion);
            wheel.transform.localPosition = newPostion;
        }
    };
    HillCar.prototype.CorrectionWheelRotation = function (wheels, IsFront) {
        var velocityNormal = new Laya.Vector3;
        var length = Laya.Vector3.scalarLength(this.rigidbody.linearVelocity);
        if (length == 0) {
            return;
        }
        Laya.Vector3.scale(this.rigidbody.linearVelocity, 1 / length, velocityNormal);
        var dot = Laya.Vector3.dot(velocityNormal, this.m_forward);
        var speed = length * dot;
        var rotateSpeed = speed * (Laya.timer.delta / 1000) * this.rotateSpeed;
        for (var i = 0; i < wheels.length; i++) {
            wheels[i].transform.localRotationEulerX += rotateSpeed;
        }
        if (IsFront) {
            var maxWheelAngle = 45;
            var relativePosition = new Laya.Vector3;
            Utilit_1.default.InverseTransformPoint(this.transform, new Laya.Vector3(this.targetPosition.x, this.transform.position.y, this.targetPosition.z), relativePosition);
            relativePosition.y = 0;
            Laya.Vector3.normalize(relativePosition, relativePosition);
            var wheelAngle = Utilit_1.default.Vector3Angle(new Laya.Vector3(0, 0, 1), relativePosition, 1);
            wheelAngle = Math.max(-maxWheelAngle, Math.min(maxWheelAngle, wheelAngle));
            var curWheelAngle = wheels[0].transform.localRotationEulerY;
            curWheelAngle = Utilit_1.default.LerpNumber(curWheelAngle, wheelAngle, 0.2);
            for (var i = 0; i < wheels.length; i++) {
                wheels[i].transform.localRotationEulerY = curWheelAngle;
            }
        }
    };
    HillCar.prototype.CheckCarState = function () {
        for (var i = 0; i < this.axleInfos.length; i++) {
            var axle = this.axleInfos[i];
            if ((axle.LastLeftWheelResult != null && axle.LastLeftWheelResult.Hit.collider.owner.name == "Plane") ||
                (axle.LastRightWheelResult != null && axle.LastRightWheelResult.Hit.collider.owner.name == "Plane")) {
                this.carMachine.Switch("Death");
            }
        }
    };
    HillCar.prototype.UpdateBuffers = function () {
        for (var key in this.buffers) {
            var buffer = this.buffers[key];
            if (!buffer.TryUpdateBuffer(this)) {
                this.buffers[key].Stop(this);
                delete this.buffers[key];
            }
        }
    };
    HillCar.prototype.onCollisionEnter = function (collision) {
        var name = collision.other.owner.name.toLocaleLowerCase();
        if (name == "plane") {
            this.carMachine.Switch("Death");
        }
        else if (name.search("cargoe") >= 0) {
            var rigidbody = collision.other.owner.getComponent(Laya.Rigidbody3D);
            var velocity = new Laya.Vector3;
            Laya.Vector3.subtract(this.rigidbody.linearVelocity, rigidbody.linearVelocity, velocity);
            var length_1 = Laya.Vector3.scalarLength(velocity);
            if (length_1 > 4) {
                VibrateMgr_1.default.vibrate_ppxhc_Short();
            }
        }
    };
    HillCar.prototype.AddBuffer = function (buffer, isCover) {
        if (this.buffers[buffer._name] != null && !isCover) {
            return;
        }
        this.buffers[buffer._name] = buffer;
        buffer.Start(this);
    };
    HillCar.prototype.SetSpeedUpEffect = function (active) {
        var activeSelf = this.danqiEffect.active;
        if (activeSelf == active) {
            return;
        }
        this.danqiEffect.active = active;
        if (active) {
            Game_1.default.CameraFollow.TweenOffset(0, 0, -3, 1);
            SoundMgr_1.default.instance_.play_ppxhc_Sound("speedUp");
        }
        else {
            Game_1.default.CameraFollow.TweenOffset(0, 0, 0, 2);
            SoundMgr_1.default.instance_.play_ppxhc_Sound("speedUpOver");
        }
    };
    HillCar.prototype.CreateTrail = function (index) {
        if (this.backTrails[index]._children.length != 0)
            return;
        CarMgr_1.default.Instance.CreateTrail(this.backTrails[index], 0);
    };
    HillCar.prototype.ClearTrail = function (index) {
        var _loop_1 = function (i) {
            var trail = this_1.backTrails[index]._children[i];
            trail.removeSelf();
            Game_1.default.Scene.addChild(trail);
            Laya.timer.once(2 * 1000, this_1, function () {
                trail.removeSelf();
                trail.destroy(true);
            });
        };
        var this_1 = this;
        for (var i = 0; this.backTrails[index]._children.length; i++) {
            _loop_1(i);
        }
    };
    return HillCar;
}(Carframe_1.default));
exports.default = HillCar;
var WheelAxis = /** @class */ (function () {
    function WheelAxis() {
        this.wheels = [];
        this.wheelMesh = [];
    }
    return WheelAxis;
}());
exports.WheelAxis = WheelAxis;
},{"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../Mgr/SoundMgr":67,"../../Mgr/VibrateMgr":68,"../../Utilit":85,"../Game":17,"../StateMachine/FSMStateMachine":44,"../Tools/PhysicTrigger3d":46,"./CarMgr":13,"./Carframe":14}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("../Game");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var VibrateMgr_1 = require("../../Mgr/VibrateMgr");
var Utilit_1 = require("../../Utilit");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var CargoMgr = /** @class */ (function () {
    function CargoMgr() {
        this.cargoPrefabs = {};
        this.loadedCargos = [];
        this.totalLoadCargos = 0;
    }
    Object.defineProperty(CargoMgr, "Instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new CargoMgr;
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    CargoMgr.prototype.Init = function () {
        var prefab = Game_1.default.Prefabs["Prefab"];
        var cargos = prefab.getChildByName("Cargoes");
        for (var i = 0; i < cargos._children.length; i++) {
            var node = cargos._children[i];
            this.cargoPrefabs[node.name] = node;
        }
    };
    CargoMgr.prototype.TransferCargoes = function (car, type, isAward, completed) {
        if (completed === void 0) { completed = null; }
        var name = "Cargoe" + Utilit_1.default.Clamp(type, 1, 5);
        var delay = 0;
        var cargoPosition = car.CargoTransferPoints;
        for (var i = 0; i < cargoPosition._children.length; i++) {
            var node = cargoPosition._children[i];
            var position = node.transform.position.clone();
            position.y = car.transform.position.y + 5;
            delay += 0.2;
            Laya.timer.once(delay * 1000, this, this.CreateCargo, [name, position], false);
        }
        if (isAward == false)
            this.totalLoadCargos = cargoPosition._children.length;
        delay += 0.7;
        Laya.timer.once(delay * 1000, this, function () {
            if (completed != null) {
                completed.run();
            }
        });
    };
    CargoMgr.prototype.UnloadCargoes = function (car, position, completed) {
        var _this = this;
        if (completed === void 0) { completed = null; }
        var totalCount = this.totalLoadCargos;
        var currentCount = car.loadedCargos.length;
        var level = Math.round(totalCount / 3);
        var delay = 0, index = 0;
        var _loop_1 = function () {
            index++;
            var cargo = car.loadedCargos.pop();
            delay += 0.2;
            Laya.timer.once(delay * 1000, this_1, function (progress, level) {
                VibrateMgr_1.default.vibrate_ppxhc_Short();
                _this.RetrieveCargo(cargo, position);
                EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Car_Unload, [progress, level]);
            }, [(index / currentCount), Utilit_1.default.Clamp(Math.round(index / level), 1, 3)]);
        };
        var this_1 = this;
        while (car.loadedCargos.length != 0) {
            _loop_1();
        }
        delay += 0.5;
        Laya.timer.once(delay * 1000, this, function () {
            if (completed != null) {
                completed.run();
            }
        });
    };
    CargoMgr.prototype.CreateCargo = function (name, position) {
        var prefab = this.cargoPrefabs[name];
        if (prefab == null) {
            return;
        }
        var node = Laya.Sprite3D.instantiate(prefab, Game_1.default.Scene, false, position);
        node.active = true;
        var rigidbody = node.getComponent(Laya.Rigidbody3D);
        rigidbody.linearDamping = 0.1;
        rigidbody.friction = 3;
        rigidbody.overrideGravity = true;
        rigidbody.gravity = new Laya.Vector3(0, -15, 0);
        rigidbody.linearVelocity = new Laya.Vector3;
        rigidbody.applyImpulse(new Laya.Vector3(0, -5, 0));
        this.loadedCargos.push(node);
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Car_LoadUp);
        SoundMgr_1.default.instance_.play_ppxhc_Sound("fallingobject");
    };
    CargoMgr.prototype.RetrieveCargo = function (sprite, points) {
        var _this = this;
        var transform = sprite.transform;
        var rigidbody = sprite.getComponent(Laya.Rigidbody3D);
        rigidbody.isKinematic = true;
        var delay = 0;
        var _loop_2 = function (i) {
            var position = points[i];
            Laya.timer.once(delay * 1000, this_2, function () {
                Laya.Tween.to(transform, { localPositionX: position.x, localPositionY: position.y, localPositionZ: position.z }, 500, null, Laya.Handler.create(_this, function () {
                    SoundMgr_1.default.instance_.play_ppxhc_Sound("suction");
                }));
            });
            delay += 0.1;
        };
        var this_2 = this;
        for (var i = 0; i < points.length; i++) {
            _loop_2(i);
        }
    };
    CargoMgr.prototype.Clear = function () {
        while (this.loadedCargos.length != 0) {
            var node = this.loadedCargos.pop();
            node.active = false;
            node.removeSelf();
            node.destroy(true);
        }
    };
    CargoMgr._instance = null;
    return CargoMgr;
}());
exports.default = CargoMgr;
},{"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../Mgr/SoundMgr":67,"../../Mgr/VibrateMgr":68,"../../Utilit":85,"../Game":17}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoadMgr_1 = require("./Road/RoadMgr");
var CarMgr_1 = require("./Car/CarMgr");
var Utilit_1 = require("../Utilit");
var CameraMoveScript_1 = require("./Tools/CameraMoveScript");
var GameControl_1 = require("./GameControl");
var CameraFollow_1 = require("./Camera/CameraFollow");
var CargoMgr_1 = require("./Cargoes/CargoMgr");
var User_1 = require("../User/User");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var SoundMgr_1 = require("../Mgr/SoundMgr");
var GameMgr_1 = require("../Mgr/GameMgr");
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.LoadGame = function (caller, complete) {
        var _this = this;
        var scenePath = this.basePath + "Game.ls";
        Laya.Scene3D.load(scenePath, Laya.Handler.create(this, function (scene) {
            _this.Scene = scene;
            _this.Camera = Utilit_1.default.FindChild(scene, "Camera/Main Camera");
            Laya.stage.addChild(scene);
            Laya.stage.setChildIndex(scene, 0);
        }));
        var urls = [
            "subRes/Game/LayaScene_Game/Conventional/" + "Prefab.lh",
            "subRes2/Game/LayaScene_Game/Conventional/" + "Cars.lh",
        ];
        this.LoadGamePrefab(urls, this, function () {
            _this.InitTools();
            _this.InitManager();
            _this.LoadGameScene(caller, complete);
            //ViewMgr.instance.openView(ViewDef.TestGame);
        });
    };
    Game.LoadGamePrefab = function (urls, caller, complete) {
        var _this = this;
        var loadFinishCount = 0;
        function CheckLoadSucceed() {
            loadFinishCount++;
            if (urls.length == loadFinishCount) {
                complete.call(caller);
            }
        }
        var _loop_1 = function (i) {
            var url = urls[i];
            Laya.Sprite3D.load(url, Laya.Handler.create(this_1, function (prefab) {
                var name = Laya.URL.getFileName(url);
                _this.Prefabs[name.split(".")[0]] = prefab;
                CheckLoadSucceed();
            }));
        };
        var this_1 = this;
        for (var i = 0; i < urls.length; i++) {
            _loop_1(i);
        }
    };
    Game.InitTools = function () {
        this.Camera.addComponent(CameraMoveScript_1.default);
        Laya.timer.frameLoop(1, this, this.OnUpdate);
        //User_ppxhc.set_ppxhc_LeveNum(12);
    };
    Game.InitManager = function () {
        Laya.Physics3DUtils.gravity = new Laya.Vector3(0, -15, 0);
        CarMgr_1.default.Instance.Init();
        RoadMgr_1.default.Instance.Init();
        CargoMgr_1.default.Instance.Init();
        this.Control = this.Scene.addComponent(GameControl_1.default);
        this.CameraFollow = this.Scene.getChildByName("Camera").addComponent(CameraFollow_1.default);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Car_Dead, this, this.ResetGame);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Car_LevelUp, this, this.PlayNextGame);
        SoundMgr_1.default.instance_.play_ppxhc_BGM("background");
    };
    Game.LoadGameScene = function (caller, complete) {
        var _this = this;
        if (caller === void 0) { caller = null; }
        if (complete === void 0) { complete = null; }
        var self = this;
        var handler = function () {
            self.Control.GameReady();
            GameMgr_1.default.getInstance().save_ppxhc_GameData();
        };
        RoadMgr_1.default.Instance.LoadRoadLh(this.Control.GetNextRoundName(User_1.default.get_ppxhc_LeveNum()), this, function () {
            handler.call(_this);
            EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Game_OnLevelStart, User_1.default.get_ppxhc_LeveNum());
            (complete != null) && (complete.call(caller));
        });
        Laya.Sprite3D.load(this.Control.GetNextRoundName(User_1.default.get_ppxhc_LeveNum() + 1), null);
    };
    Game.PlayGame = function () {
        this.Control.GameStart();
    };
    Game.ClearGame = function () {
        this.Control.GameClear();
        CarMgr_1.default.Instance.Clear();
        RoadMgr_1.default.Instance.Clear();
        CargoMgr_1.default.Instance.Clear();
        Laya.timer.once(400, this, function () {
            Laya.Resource.destroyUnusedResources();
        });
    };
    Game.ResetGame = function () {
        this.ClearGame();
        this.LoadGameScene();
    };
    Game.PlayNextGame = function () {
        this.ClearGame();
        this.LoadGameScene();
    };
    Game.OnUpdate = function () {
    };
    Game.basePath = "subRes/Game/LayaScene_Game/Conventional/";
    Game.Scene = null;
    Game.Camera = null;
    Game.Prefabs = {};
    Game.Control = null;
    Game.CameraFollow = null;
    return Game;
}());
exports.default = Game;
},{"../Event/EventDef":7,"../Event/EventMgr":8,"../Mgr/GameMgr":66,"../Mgr/SoundMgr":67,"../User/User":84,"../Utilit":85,"./Camera/CameraFollow":10,"./Car/CarMgr":13,"./Cargoes/CargoMgr":16,"./GameControl":19,"./Road/RoadMgr":36,"./Tools/CameraMoveScript":45}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConst = /** @class */ (function () {
    function GameConst() {
    }
    GameConst.AwardRound = 4;
    GameConst.ChangeCarRound = 2;
    GameConst.Skins = [
        0, 1, 2, 3, 4, 5
    ];
    return GameConst;
}());
exports.default = GameConst;
},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoadMgr_1 = require("./Road/RoadMgr");
var Game_1 = require("./Game");
var FSMStateMachine_1 = require("./StateMachine/FSMStateMachine");
var CarMgr_1 = require("./Car/CarMgr");
var CargoMgr_1 = require("./Cargoes/CargoMgr");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var ViewMgr_1 = require("../Mgr/ViewMgr");
var User_1 = require("../User/User");
var SoundMgr_1 = require("../Mgr/SoundMgr");
var Utilit_1 = require("../Utilit");
var GameConst_1 = require("./GameConst");
var GameMgr_1 = require("../Mgr/GameMgr");
var getHandler = Laya.Handler.create;
var GameControl = /** @class */ (function (_super) {
    __extends(GameControl, _super);
    function GameControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentCar = null;
        _this.InGameing = false;
        _this.autoPlay = false;
        _this.currentAwardRound = 0;
        _this.currentChangeCarRound = 0;
        _this.CurrentChangeCarIndex = 0;
        _this._frameRate = 60;
        _this._frameLength = 0;
        _this._fAccumilatedTime = 0;
        _this._physicsNextFrame = 0;
        _this.stateMachine = null;
        return _this;
    }
    Object.defineProperty(GameControl.prototype, "frameRate", {
        set: function (value) {
            this._frameRate = value;
            this._frameLength = 1000 / value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameControl.prototype, "IsAwardRound", {
        get: function () {
            return this.currentAwardRound * GameConst_1.default.AwardRound < User_1.default.get_ppxhc_LeveNum();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameControl.prototype, "IsChangeCarRound", {
        get: function () {
            return this.currentChangeCarRound * GameConst_1.default.ChangeCarRound < User_1.default.get_ppxhc_LeveNum();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameControl.prototype, "IsReadyCompleted", {
        get: function () {
            return this.stateMachine.curState.key == "CanPlay";
        },
        enumerable: true,
        configurable: true
    });
    GameControl.prototype.onAwake = function () {
        this.frameRate = 60;
        this._fAccumilatedTime = Laya.timer.currTimer;
        this._physicsNextFrame = Laya.timer.currTimer + this._frameRate;
        this.stateMachine = new FSMStateMachine_1.default;
        this.stateMachine.AddAction("CanPlay", this, this.OnCanPlayEnter);
        this.stateMachine.AddAction("Ready", this, this.OnReadyEnter, this.OnReadyExit);
        this.stateMachine.AddAction("Gaming", this, this.OnGamingEnter, this.OnGamingExit, this.OnGamingUpdate);
        this.stateMachine.AddAction("Robmoney", this, this.OnRobMoneyEnter, this.OnRobMoneyExit);
        this.stateMachine.AddAction("ChangeCar", this, this.OnChangeCarEnter, this.OnChangeCarEnd);
        this.stateMachine.AddAction("GameOver");
        this.stateMachine.AddAction("Settle", this, this.OnSettleEnter);
        this.currentAwardRound = Math.ceil(User_1.default.get_ppxhc_LeveNum() / GameConst_1.default.AwardRound);
        this.currentChangeCarRound = Math.ceil(User_1.default.get_ppxhc_LeveNum() / GameConst_1.default.ChangeCarRound);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Car_Death, this, this.OnCarDeath);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Car_Change, this, this.OnCarChange);
    };
    GameControl.prototype.GameReady = function () {
        this.stateMachine.Switch("Ready");
    };
    GameControl.prototype.GameStart = function () {
        if (this.stateMachine.curState.key != "CanPlay" || this.InGameing == true) {
            return;
        }
        this.InGameing = true;
        this.stateMachine.Switch("Gaming");
    };
    GameControl.prototype.GameOver = function () {
        this.stateMachine.Switch("GameOver");
    };
    GameControl.prototype.GameSettle = function (type) {
        this.stateMachine.Switch("Settle", type);
    };
    GameControl.prototype.GameClear = function () {
        this.currentCar = null;
        this.InGameing = false;
    };
    GameControl.prototype.StartRobmoney = function () {
        this.stateMachine.Switch("Robmoney");
    };
    GameControl.prototype.EndRobmoney = function (completed) {
        var _this = this;
        if (completed == false) {
            this.stateMachine.Switch("Gaming");
            return;
        }
        User_1.default.add_ppxhc_Money(100);
        GameMgr_1.default.getInstance().save_ppxhc_GameData();
        this.currentCar.SetShutDown();
        CargoMgr_1.default.Instance.TransferCargoes(this.currentCar, 5, true, Laya.Handler.create(this, function () {
            _this.stateMachine.Switch("Gaming");
        }));
    };
    GameControl.prototype.StartChangeCar = function () {
        this.stateMachine.Switch("ChangeCar");
    };
    GameControl.prototype.EndChangeCar = function (completed) {
        this.currentChangeCarRound++;
        if (completed == true) {
            User_1.default.add_ppxhc_Skin(this.CurrentChangeCarIndex);
            User_1.default.SetSelectiveSkin(this.CurrentChangeCarIndex, false);
        }
        this.stateMachine.Switch("Settle", 1);
    };
    GameControl.prototype.GetNextRoundName = function (level) {
        var maxRound = 25;
        level--;
        if (level >= maxRound) {
            level = level % maxRound;
        }
        level++;
        var round = "Round" + level;
        var url = Game_1.default.basePath + round + ".lh";
        if (this.IsAwardRound == true)
            url = Game_1.default.basePath + "RoundAward" + ".lh";
        else if (level > 3)
            url = "https://oss.renyouwangluo.cn/ppxhc/Conventional/" + round + ".lh";
        return url;
    };
    GameControl.prototype.TryGenerateNotUnlockCars = function () {
        var notunlockCars = Utilit_1.default.GetArrDifference(GameConst_1.default.Skins, User_1.default.GetOwnedSkin());
        this.CurrentChangeCarIndex = notunlockCars[Utilit_1.default.getRandomInt(0, notunlockCars.length - 1)];
        return notunlockCars.length > 0;
    };
    GameControl.prototype.OnReadyEnter = function () {
        var _this = this;
        var position = new Laya.Vector3;
        RoadMgr_1.default.Instance.GetCarPosition(position);
        CarMgr_1.default.Instance.CreateCar("Car" + User_1.default.GetSelectiveSkin(), position);
        Game_1.default.CameraFollow.SetTarget(CarMgr_1.default.Instance.currentCar.owner);
        this.currentCar = CarMgr_1.default.Instance.currentCar;
        this.currentCar.SetShutDown();
        Game_1.default.CameraFollow.Switch("Default");
        CargoMgr_1.default.Instance.TransferCargoes(this.currentCar, Utilit_1.default.getRandomInt(1, 5), false, Laya.Handler.create(this, function () {
            _this.stateMachine.Switch("CanPlay");
        }));
    };
    GameControl.prototype.OnReadyExit = function () {
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Game_ReadyCompleted);
    };
    GameControl.prototype.OnCanPlayEnter = function () {
        if (this.autoPlay == false) {
            return;
        }
        this.autoPlay = false;
        this.GameStart();
    };
    GameControl.prototype.OnGamingEnter = function () {
        SoundMgr_1.default.instance_.play_ppxhc_Sound("startoff");
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Game_GameStarted);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onGameOperation, [1]);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onGameOperation, [2]);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onGameOperation, [3]);
    };
    GameControl.prototype.OnGamingExit = function () {
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onGameOperation);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onGameOperation);
        Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.onGameOperation);
    };
    GameControl.prototype.OnGamingUpdate = function () {
    };
    GameControl.prototype.OnChangeCarEnter = function () {
        var notunlockCars = Utilit_1.default.GetArrDifference(GameConst_1.default.Skins, User_1.default.GetOwnedSkin());
        if (Game_1.default.Control.IsChangeCarRound && notunlockCars.length > 0) {
            EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Car_ChangeTipStart);
        }
        else {
        }
    };
    GameControl.prototype.OnChangeCarEnd = function () {
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Car_ChangeTipEnd);
    };
    GameControl.prototype.OnSettleEnter = function (type) {
        Laya.timer.once(1000, this, function () {
            EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Game_Settle, type);
            ViewMgr_1.default.instance.closeView(ViewMgr_1.View_ppxhc_Def.GameView);
            ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.GameOver, { Result: type });
        });
        if (type != 1)
            return;
        User_1.default.set_ppxhc_LeveNum(User_1.default.get_ppxhc_LeveNum() + 1);
        if (this.IsAwardRound != true) {
            //User_ppxhc.set_ppxhc_LeveNum(User_ppxhc.get_ppxhc_LeveNum() + 1);
        }
        else {
            this.currentAwardRound++;
        }
    };
    GameControl.prototype.OnCarDeath = function () {
        this.GameSettle(2);
    };
    GameControl.prototype.onGameOperation = function (type) {
        if (this.InGameing == false)
            return;
        switch (type) {
            case 1:
                this.MouseDown();
                return;
            case 2:
                this.MouseUp();
                return;
            case 3:
                this.MouseUp();
                return;
        }
    };
    GameControl.prototype.OnRobMoneyEnter = function () {
        this.currentCar.SetSpeedUpOver();
    };
    GameControl.prototype.OnRobMoneyExit = function () {
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Game_RobmoneyEnd);
    };
    GameControl.prototype.OnCarChange = function () {
        CarMgr_1.default.Instance.Clear();
        CargoMgr_1.default.Instance.Clear();
        this.stateMachine.Switch("Ready");
    };
    GameControl.prototype.MouseDown = function () {
        this.currentCar.SetSpeedUp();
    };
    GameControl.prototype.MouseUp = function () {
        this.currentCar.SetSpeedUpOver();
    };
    GameControl.prototype.GameLogicLoop = function () {
    };
    GameControl.prototype.onUpdate = function () {
        if (Laya.timer.delta == 0 || Laya.timer.delta > 1000)
            return;
        this._fAccumilatedTime += Laya.timer.delta;
        while (this._fAccumilatedTime > this._physicsNextFrame) {
            this._physicsNextFrame += this._frameLength;
        }
        this.onGameOperation(4);
        this.stateMachine.Update();
    };
    return GameControl;
}(Laya.Script3D));
exports.default = GameControl;
},{"../Event/EventDef":7,"../Event/EventMgr":8,"../Mgr/GameMgr":66,"../Mgr/SoundMgr":67,"../Mgr/ViewMgr":69,"../User/User":84,"../Utilit":85,"./Car/CarMgr":13,"./Cargoes/CargoMgr":16,"./Game":17,"./GameConst":18,"./Road/RoadMgr":36,"./StateMachine/FSMStateMachine":44}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var EventDef_1 = require("../../Event/EventDef");
var EventMgr_1 = require("../../Event/EventMgr");
var Exprot2ViewTemplate_1 = require("../../View/TemplateViews/Export2/Exprot2ViewTemplate");
var ViewMgr_2 = require("../../Mgr/ViewMgr");
var GameContinue = /** @class */ (function (_super) {
    __extends(GameContinue, _super);
    function GameContinue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameContinue.prototype.onContinueBtn = function () {
        var _this = this;
        if (!this._isCanClose)
            return;
        var self = this;
        var excute = function () {
            self.closeView(); //关闭此界面
            //todo:你关闭此界面之后你的逻辑
            console.log("-----------------下一关");
            EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Car_LevelUp);
            _this.closeView();
            ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.GameHome, { view: 0 });
        };
        ViewMgr_2.default.instance.tryShowPopAd(function (v) {
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
    return GameContinue;
}(Exprot2ViewTemplate_1.default));
exports.default = GameContinue;
},{"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../Mgr/ViewMgr":69,"../../View/TemplateViews/Export2/Exprot2ViewTemplate":115}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../View/ViewBase");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var GameHistory = /** @class */ (function (_super) {
    __extends(GameHistory, _super);
    function GameHistory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._backBtn = null;
        return _this;
    }
    GameHistory.prototype.onAwake = function () {
        this._backBtn = this.owner.getChildByName("KRQ_History").getChildByName("TopZone").getChildByName("BackBtn");
        this._backBtn.on(Laya.Event.CLICK, this, this.onBackBtn);
    };
    GameHistory.prototype.onBackBtn = function () {
        ViewMgr_1.default.instance.closeView(ViewMgr_1.View_ppxhc_Def.GameHistory);
    };
    return GameHistory;
}(ViewBase_1.default));
exports.default = GameHistory;
},{"../../Mgr/ViewMgr":69,"../../View/ViewBase":132}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var Game_1 = require("../Game");
var GameWinViewTemplate_1 = require("../../View/TemplateViews/GameWin/GameWinViewTemplate");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var WudianMgr_1 = require("../../Mgr/WudianMgr");
var NativeCallback_1 = require("../../NativeCallback");
var GameOver = /** @class */ (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Result = 0;
        _this.Tag = null;
        return _this;
    }
    GameOver.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.Tag = this.TopZone.getChildByName("Tag");
    };
    GameOver.prototype.onBackBtn = function () {
        if (!this._click_ppxhc_Tag && WudianMgr_1.default.Wudian_ppxhc_Flag) {
            var self = this;
            if (!this._clickTiming_ppxhc_Tag) {
                this._clickTiming_ppxhc_Tag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        //todo:你的代码
        this.closeView();
        Game_1.default.ResetGame();
        ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.GameHome, { view: 0 });
    };
    GameOver.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.InsertVideoEnd, this, this.onInsertVideoEnd);
    };
    GameOver.prototype.onInsertVideoEnd = function () {
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Car_LevelUp);
        this.closeView();
        ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.GameHome, { view: 0 });
    };
    GameOver.prototype.onNextBtn = function () {
        if (!this._click_ppxhc_Tag && WudianMgr_1.default.Wudian_ppxhc_Flag) {
            var self = this;
            if (!this._clickTiming_ppxhc_Tag) {
                this._clickTiming_ppxhc_Tag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        //todo:你的代码
        // this.closeView();
        // View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameContinue, {NextLevel:true});
        var randNum = Math.random();
        console.log("随机数值 ===========" + randNum);
        // randNum = 0.46;
        if ((Laya.Browser.onAndroid || Laya.Browser.onIOS) && randNum > 0.2) {
            NativeCallback_1.default.CallNativeFunc("showInsertVideo");
            NativeCallback_1.default.NowVideoType = "insertAd";
            Laya.SoundManager.muted = true;
        }
        else {
            EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Car_LevelUp);
            this.closeView();
            ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.GameHome, { view: 0 });
        }
    };
    GameOver.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        this.Result = this._data.Result;
        ViewMgr_1.default.instance.closeView(ViewMgr_1.View_ppxhc_Def.GameHome);
        if (this.Result == 2) {
            this.Tag.loadImage("Template/shibai.png");
            this._next_ppxhc_Btn.loadImage("Template/zaicitiaozhananniu.png");
        }
    };
    GameOver.prototype.onClose = function () {
        _super.prototype.onClose.call(this);
        if (this._banner != null) {
            this._banner.hide();
        }
    };
    return GameOver;
}(GameWinViewTemplate_1.default));
exports.default = GameOver;
},{"../../Config/AppSwitchConfig":5,"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../Mgr/ViewMgr":69,"../../Mgr/WudianMgr":71,"../../NativeCallback":72,"../../View/TemplateViews/GameWin/GameWinViewTemplate":119,"../Game":17}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../View/ViewBase");
var GameConst_1 = require("../GameConst");
var User_1 = require("../../User/User");
var Utilit_1 = require("../../Utilit");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var NativeCallback_1 = require("../../NativeCallback");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var GameSkin = /** @class */ (function (_super) {
    __extends(GameSkin, _super);
    function GameSkin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.skinsList = null;
        _this.carImage = null;
        return _this;
    }
    GameSkin.prototype.onAwake = function () {
        var clip = this.owner.getChildByName("Clip");
        this.clip = clip;
        this.closeBtn = clip.getChildByName("CloseBtn");
        this.useBtn = clip.getChildByName("UseBtn");
        this.inUseBtn = clip.getChildByName("InUseBtn");
        this.skinsList = clip.getChildByName("List");
        this.carImage = this.owner.getChildByName("Image");
        this.closeBtn.on(Laya.Event.CLICK, this, this.OnClickClose);
        this.useBtn.on(Laya.Event.CLICK, this, this.OnClickUse);
        this.inUseBtn.on(Laya.Event.CLICK, this, this.OnClickInUse);
        this.skinsList.mouseHandler = Laya.Handler.create(this, this.OnListMouse, null, false);
        this.skinsList.renderHandler = Laya.Handler.create(this, this.RefreshItem, null, false);
    };
    GameSkin.prototype.onShow = function () {
        this.PlayAnimation(true, 0.1 * 1000, null);
    };
    GameSkin.prototype.onEnable = function () {
        this.skinsList.selectedIndex = User_1.default.GetSelectiveSkin();
        this.skinsList.updateArray(GameConst_1.default.Skins);
        this.RefreshBtn();
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    GameSkin.prototype.onDisable = function () {
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    GameSkin.prototype.onDestroy = function () {
    };
    GameSkin.prototype.OnListMouse = function (event, index) {
        if (event.type != Laya.Event.CLICK) {
            return;
        }
        this.skinsList.selectedIndex = index;
        this.RefreshBtn();
        this.RefreshItem(event.target, index);
    };
    GameSkin.prototype.RefreshItem = function (cell, index) {
        var isHave = User_1.default.Check_ppxhc_OwnedSkin(index);
        var isSelective = User_1.default.GetSelectiveSkin() == index;
        Utilit_1.default.FindChild(cell, "State/UnLock").visible = isHave;
        Utilit_1.default.FindChild(cell, "State/Selective").visible = isSelective;
        Utilit_1.default.FindChild(cell, "Outline").loadImage("Cars/" + (isHave ? (index + 1) : "0" + (index + 1)) + ".png");
        if (this.skinsList.selectedIndex == index) {
            Utilit_1.default.FindChild(cell, "State/Selective").visible = true;
        }
        else {
            Utilit_1.default.FindChild(cell, "State/Selective").visible = false;
        }
    };
    GameSkin.prototype.RefreshBtn = function () {
        var isHave = User_1.default.Check_ppxhc_OwnedSkin(this.skinsList.selectedIndex);
        var isSelective = User_1.default.GetSelectiveSkin() == this.skinsList.selectedIndex;
        this.useBtn.visible = !isSelective;
        this.inUseBtn.visible = isSelective;
        var imagePath = "Cars/0" + (isHave ? (this.skinsList.selectedIndex + 1) : +(this.skinsList.selectedIndex + 1)) + ".png";
        console.log(imagePath, (this.skinsList.selectedIndex).toString());
        this.carImage.graphics.clear();
        this.carImage.loadImage(imagePath);
    };
    GameSkin.prototype.OnClickClose = function () {
        this.closeView();
        ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.GameHome, { view: 0 });
    };
    GameSkin.prototype.onRewardVidewoFail = function () {
        ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.TipsView, "Video playback failed. can't get new car");
    };
    GameSkin.prototype.onRewardVidewoSuccess = function () {
        User_1.default.add_ppxhc_Skin(this.skinsList.selectedIndex);
        User_1.default.SetSelectiveSkin(1, true);
        this.RefreshBtn();
        this.skinsList.refresh();
        return;
    };
    GameSkin.prototype.OnClickUse = function () {
        var self = this;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback_1.default.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
            return;
        }
        else {
            User_1.default.add_ppxhc_Skin(self.skinsList.selectedIndex);
            User_1.default.SetSelectiveSkin(1, true);
            self.RefreshBtn();
            self.skinsList.refresh();
        }
        // WXAPI_.showRewardedVideoAd_((completed) => {
        //     if (completed == false) {
        //         return;
        //     }
        //     User_ppxhc.add_ppxhc_Skin(self.skinsList.selectedIndex);
        //     User_ppxhc.SetSelectiveSkin(1, true);
        //     self.RefreshBtn();
        //     self.skinsList.refresh();
        // }, () => {
        // })
    };
    GameSkin.prototype.OnClickInUse = function () {
    };
    GameSkin.prototype.PlayAnimation = function (isShow, duration, hander) {
        var expectTop = Laya.stage.height;
        if (isShow) {
            expectTop = (Laya.stage.height - this.clip.height);
            this.clip.top = Laya.stage.height;
        }
        else {
            expectTop = Laya.stage.height;
            this.clip.top = (Laya.stage.height - this.clip.height);
        }
        Laya.Tween.clearAll(this.clip);
        this.clip.left = this.clip.right = 0;
        Laya.Tween.to(this.clip, { top: expectTop }, duration, null, hander);
    };
    GameSkin.prototype.closeView = function () {
        var _this = this;
        this.PlayAnimation(false, 0.1 * 1000, Laya.Handler.create(this, function () {
            Laya.Tween.clearAll(_this.clip);
            _super.prototype.closeView.call(_this);
        }));
    };
    return GameSkin;
}(ViewBase_1.default));
exports.default = GameSkin;
},{"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../Mgr/ViewMgr":69,"../../NativeCallback":72,"../../User/User":84,"../../Utilit":85,"../../View/ViewBase":132,"../GameConst":18}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InGameViewTemplate_1 = require("../../View/TemplateViews/InGame/InGameViewTemplate");
var Game_1 = require("../Game");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var User_1 = require("../../User/User");
var Utilit_1 = require("../../Utilit");
var NativeCallback_1 = require("../../NativeCallback");
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameView.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.levelNum = Utilit_1.default.FindChild(this.owner, "CenterZone/LevelInfo/LevelNum");
        this.robmoneyBox = this.owner.getChildByName("Robmoney");
        this.robmoneyBtn = this.robmoneyBox.getChildByName("btn_robmoney");
        this.robmoneyBtn.on(Laya.Event.CLICK, this, this.ClickRobMoney, [true]);
        this.noRobmoneyBtn = this.robmoneyBox.getChildByName("btn_refuse");
        this.noRobmoneyBtn.on(Laya.Event.CLICK, this, this.ClickRobMoney, [false]);
        this.changeCarBox = this.owner.getChildByName("ChangeCarBox");
        this.changeCarRtBtn = this.changeCarBox.getChildByName("btn_changecarRt");
        this.noChangeCarBtn = this.changeCarBox.getChildByName("btn_refuse");
        this.changeCarRtBtn.on(Laya.Event.CLICK, this, this.OnClickChangeCar, [true]);
        this.noChangeCarBtn.on(Laya.Event.CLICK, this, this.OnClickChangeCar, [false]);
    };
    GameView.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        this.robmoneyBox.visible = false;
        this.changeCarBox.visible = false;
        this.levelNum.value = User_1.default.get_ppxhc_LeveNum().toString();
    };
    GameView.prototype.onEnable = function () {
        _super.prototype.addEvent.call(this);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Game_RobmoneyStart, this, this.OnGameRobmoney);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Game_RobmoneyEnd, this, this.OnRobmoneyEnd);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Car_ChangeTipStart, this, this.OnChangeCarStart);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Car_ChangeTipEnd, this, this.OnChangeCarEnd);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    GameView.prototype.onDisable = function () {
        _super.prototype.removeEvent.call(this);
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.Game_RobmoneyStart, this, this.OnGameRobmoney);
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.Game_RobmoneyEnd, this, this.OnRobmoneyEnd);
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.Car_ChangeTipStart, this, this.OnChangeCarStart);
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.Car_ChangeTipEnd, this, this.OnChangeCarEnd);
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    GameView.prototype.OnGameRobmoney = function () {
        this.robmoneyBox.visible = true;
        this.robmoneyBtn.mouseEnabled = true;
        this.noRobmoneyBtn.mouseEnabled = true;
        Game_1.default.Control.StartRobmoney();
    };
    GameView.prototype.ClickRobMoney = function (flag) {
        if (flag == false) {
            Game_1.default.Control.EndRobmoney(false);
            return;
        }
        this.robmoneyBtn.mouseEnabled = false;
        var self = this;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback_1.default.CallNativeFunc("showRewardVideo");
            NativeCallback_1.default.NowVideoType = "RobMoney";
            Laya.SoundManager.muted = true;
            return;
        }
        else {
            this.robmoneyBtn.mouseEnabled = true;
            this.robmoneyBox.visible = false;
            Game_1.default.Control.EndRobmoney(true);
        }
        // WXAPI_.showRewardedVideoAd_((completed) => {
        //     this.robmoneyBtn.mouseEnabled = true;
        //     this.robmoneyBox.visible = false;
        //     Game.Control.EndRobmoney(completed);
        //     if (completed == false) {
        //         return;
        //     }
        // }, () => {
        //     this.robmoneyBtn.mouseEnabled = true;
        //     this.robmoneyBox.visible = false;
        //     Game.Control.EndRobmoney(false);
        // })
    };
    GameView.prototype.OnRobmoneyEnd = function () {
        this.robmoneyBox.visible = false;
    };
    GameView.prototype.OnChangeCarStart = function () {
        this.changeCarBox.visible = true;
    };
    GameView.prototype.OnChangeCarEnd = function () {
        this.changeCarBox.visible = false;
        this.changeCarRtBtn.mouseEnabled = true;
        this.noChangeCarBtn.mouseEnabled = true;
    };
    GameView.prototype.onRewardVidewoFail = function () {
        if (NativeCallback_1.default.NowVideoType == "ChangeCar") {
            this.changeCarRtBtn.mouseEnabled = true;
            this.changeCarBox.visible = false;
            Game_1.default.Control.EndChangeCar(false);
        }
        else {
            this.robmoneyBtn.mouseEnabled = true;
            this.robmoneyBox.visible = false;
            Game_1.default.Control.EndRobmoney(false);
        }
    };
    GameView.prototype.onRewardVidewoSuccess = function () {
        if (NativeCallback_1.default.NowVideoType == "ChangeCar") {
            this.changeCarRtBtn.mouseEnabled = true;
            this.changeCarBox.visible = false;
            Game_1.default.Control.EndChangeCar(true);
        }
        else {
            this.robmoneyBtn.mouseEnabled = true;
            this.robmoneyBox.visible = false;
            Game_1.default.Control.EndRobmoney(true);
        }
        return;
    };
    GameView.prototype.OnClickChangeCar = function (flag) {
        if (flag == false) {
            Game_1.default.Control.EndChangeCar(false);
            return;
        }
        this.changeCarRtBtn.mouseEnabled = false;
        var self = this;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback_1.default.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
            NativeCallback_1.default.NowVideoType = "ChangeCar";
            return;
        }
        else {
            this.changeCarRtBtn.mouseEnabled = true;
            this.changeCarBox.visible = false;
            Game_1.default.Control.EndChangeCar(true);
        }
        // WXAPI_.showRewardedVideoAd_((completed) => {
        //     this.changeCarRtBtn.mouseEnabled = true;
        //     this.changeCarBox.visible = false;
        //     Game.Control.EndChangeCar(completed);
        //     if (completed == false) {
        //         return;
        //     }
        // }, () => {
        //     this.changeCarRtBtn.mouseEnabled = true;
        //     this.changeCarBox.visible = false;
        //     Game.Control.EndChangeCar(false);
        // })
    };
    return GameView;
}(InGameViewTemplate_1.default));
exports.default = GameView;
},{"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../NativeCallback":72,"../../User/User":84,"../../Utilit":85,"../../View/TemplateViews/InGame/InGameViewTemplate":120,"../Game":17}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameWinViewTemplate_1 = require("../../View/TemplateViews/GameWin/GameWinViewTemplate");
var WudianMgr_1 = require("../../Mgr/WudianMgr");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var Utilit_1 = require("../../Utilit");
var GameConst_1 = require("../GameConst");
var User_1 = require("../../User/User");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var Game_1 = require("../Game");
var EventDef_1 = require("../../Event/EventDef");
var NativeCallback_1 = require("../../NativeCallback");
var EventMgr_1 = require("../../Event/EventMgr");
var TrialSkin = /** @class */ (function (_super) {
    __extends(TrialSkin, _super);
    function TrialSkin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.skipBtn = null;
        _this.videoBtn = null;
        _this.carImage = null;
        _this.currentSkin = null;
        return _this;
    }
    TrialSkin.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.skipBtn = this.owner.getChildByName("SkipBtn");
        this.videoBtn = this.owner.getChildByName("VideoBtn");
        this.carImage = Utilit_1.default.FindChild(this.owner, "CarBox/Car");
        this.skipBtn.on(Laya.Event.CLICK, this, this.OnClickSkip);
        this.videoBtn.on(Laya.Event.CLICK, this, this.OnClickVideo);
    };
    TrialSkin.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        if (WudianMgr_1.default.Wudian_ppxhc_Flag /*&& AppSwitchConfig.getInstance().getAppSwitchData().skinWudian == 1*/) {
            this.skipBtn.bottom = 50;
        }
        this.currentSkin = GameConst_1.default.Skins[Utilit_1.default.getRandomInt(1, GameConst_1.default.Skins.length - 1)];
        this.carImage.skin = "Cars/" + (this.currentSkin - 1) + ".png";
    };
    TrialSkin.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    TrialSkin.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    TrialSkin.prototype.OnClickSkip = function () {
        if (!this._click_ppxhc_Tag && WudianMgr_1.default.Wudian_ppxhc_Flag /*&& AppSwitchConfig.getInstance().getAppSwitchData().skinWudian == 1*/) {
            var self = this;
            if (!this._clickTiming_ppxhc_Tag) {
                this._clickTiming_ppxhc_Tag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        this.closeView();
        Game_1.default.PlayGame();
        ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.GameView);
    };
    TrialSkin.prototype.onRewardVidewoFail = function () {
        this.videoBtn.mouseEnabled = true;
        ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.TipsView, "Video playback failed. can't get new skin");
    };
    TrialSkin.prototype.onRewardVidewoSuccess = function () {
        if (User_1.default.GetSelectiveSkin() != this.currentSkin) {
            User_1.default.add_ppxhc_Skin(this.currentSkin);
            User_1.default.SetSelectiveSkin(this.currentSkin, true);
            Game_1.default.Control.autoPlay = true;
        }
        else {
            Game_1.default.PlayGame();
        }
        this.closeView();
        ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.GameView);
        this.videoBtn.mouseEnabled = true;
        return;
    };
    TrialSkin.prototype.OnClickVideo = function () {
        var self = this;
        this.videoBtn.mouseEnabled = false;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback_1.default.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
            return;
        }
        else {
            if (User_1.default.GetSelectiveSkin() != self.currentSkin) {
                User_1.default.add_ppxhc_Skin(self.currentSkin);
                User_1.default.SetSelectiveSkin(self.currentSkin, true);
                Game_1.default.Control.autoPlay = true;
            }
            else {
                Game_1.default.PlayGame();
            }
            this.closeView();
            ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.GameView);
        }
        // WXAPI_.showRewardedVideoAd_((completed) => {
        //     this.videoBtn.mouseEnabled = true;
        //     if (completed) {
        //         if (User_ppxhc.GetSelectiveSkin() != self.currentSkin) {
        //             User_ppxhc.add_ppxhc_Skin(self.currentSkin);
        //             User_ppxhc.SetSelectiveSkin(self.currentSkin, true);
        //             Game.Control.autoPlay = true;
        //         } 
        //         else {
        //             Game.PlayGame();
        //         }
        //         this.closeView();
        //         View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameView);
        //     }
        // }, () => {
        //     this.videoBtn.mouseEnabled = true;
        // });
    };
    TrialSkin.prototype.BtnUp = function () {
        _super.prototype.BtnUp.call(this);
        this.skipBtn.bottom = null;
        this.skipBtn.y = 920;
    };
    return TrialSkin;
}(GameWinViewTemplate_1.default));
exports.default = TrialSkin;
},{"../../Config/AppSwitchConfig":5,"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../Mgr/ViewMgr":69,"../../Mgr/WudianMgr":71,"../../NativeCallback":72,"../../User/User":84,"../../Utilit":85,"../../View/TemplateViews/GameWin/GameWinViewTemplate":119,"../Game":17,"../GameConst":18}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("../../Game/Game");
var User_1 = require("../../User/User");
var EventDef_1 = require("../../Event/EventDef");
var EventMgr_1 = require("../../Event/EventMgr");
var WXAPI_1 = require("../../WXAPI");
var Utilit_1 = require("../../Utilit");
var KRQ_Banner_1 = require("../../KRQ/Com/KRQ_Banner");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var MainViewTemplate_1 = require("../../View/TemplateViews/Main/MainViewTemplate");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var UIStart = /** @class */ (function (_super) {
    __extends(UIStart, _super);
    function UIStart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mousebg = null;
        _this.playMask = null;
        _this.banner = null;
        return _this;
    }
    UIStart.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.playMask = Utilit_1.default.FindChild(this.owner, "CenterZone/PlayMask");
        this.playMask.on(Laya.Event.MOUSE_DOWN, this, this.OnPlayButton);
        this.moneyNum = this.owner.getChildByName("sp_money").getChildByName("moneynum");
        this.levelNum = Utilit_1.default.FindChild(this.owner, "CenterZone/LevelInfo/LevelNum");
        this.mousebg = this.owner.getChildByName("mousebg");
        this.changeCarBtn = this.owner.getChildByName("btn_changecar");
        this.changeCarBtn.on(Laya.Event.CLICK, this, this.ButtonChangeCar);
    };
    UIStart.prototype.onShow = function () {
        this.playMask.mouseEnabled = false;
        this.levelNum.value = User_1.default.get_ppxhc_LeveNum().toString();
        this.moneyNum.text = User_1.default.get_ppxhc_Money().toString();
        if (Game_1.default.Control.IsReadyCompleted) {
            this.OnReadyCompleted();
        }
    };
    UIStart.prototype.onEnable = function () {
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Game_ReadyCompleted, this, this.OnReadyCompleted);
    };
    UIStart.prototype.onDisable = function () {
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.Game_ReadyCompleted, this, this.OnReadyCompleted);
    };
    UIStart.prototype.OnPlayButton = function () {
        this.closeView();
        var logic = function () {
            if (AppSwitchConfig_1.default.getInstance().getAppSwitchData().skinWudian) {
                ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.TrialSkin);
            }
            else {
                Game_1.default.PlayGame();
                ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.GameView);
            }
        };
        WXAPI_1.default.tryShowWXCrazyClick("疯狂点击", logic, function () { }, logic);
    };
    UIStart.prototype.ButtonChangeCar = function () {
        this.closeView();
        ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.GameSkin);
    };
    UIStart.prototype.HandMove = function () {
        var _this = this;
        Laya.Tween.to(this.mousebg.getChildByName("hand"), { scaleX: 1.3, scaleY: 1.3 }, 500, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {
            Laya.Tween.to(_this.mousebg.getChildByName("hand"), { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.cubicInOut, Laya.Handler.create(_this, function () {
                _this.HandMove();
            }));
        }));
    };
    UIStart.prototype.OnReadyCompleted = function () {
        this.HandMove();
        this.mousebg.visible = true;
        this.mousebg.alpha = 0;
        this.playMask.mouseEnabled = true;
        Laya.Tween.to(this.mousebg, { alpha: 1 }, 300);
        this.changeCarBtn.visible = true;
        Laya.Tween.to(this.changeCarBtn, { right: 0 }, 300, Laya.Ease.backInOut);
    };
    UIStart.prototype.OnGameStarted = function () {
        this.mousebg.visible = false;
        this.changeCarBtn.visible = false;
        var banner = this._krq_ppxhc_Main.Sprite.getChildByName("KRQ_Banner").getComponent(KRQ_Banner_1.default);
        banner.hide();
    };
    return UIStart;
}(MainViewTemplate_1.default));
exports.default = UIStart;
},{"../../Config/AppSwitchConfig":5,"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../Game/Game":17,"../../KRQ/Com/KRQ_Banner":47,"../../Mgr/ViewMgr":69,"../../User/User":84,"../../Utilit":85,"../../View/TemplateViews/Main/MainViewTemplate":121,"../../WXAPI":133}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用于使用路径点计算Catmull_Rom曲线的工具类，若无必要不需要修改
 *
 * @export
 * @class PathGenerator
 */
var PathGenerator = /** @class */ (function () {
    function PathGenerator() {
    }
    /**
     * 最正统的Catmull_Rom曲线计算函数
     * 给这个函数输入n(n>=4)个点，会生成n-3条线段
     * 每条线段中按照距离生成对应的路径点
     *
     * @param {Array<Laya.Vector3>} path
     * @param {boolean} isClose
     * @param {number} [byDistance=0]
     * @returns {Array<Laya.Vector3>}
     * @memberof TrackManager
     */
    PathGenerator.savePathCatmullRom = function (path, byDistance) {
        if (byDistance === void 0) { byDistance = 0; }
        var length = path.length;
        var temp = new Array();
        if (path == null || length < 4) {
            return temp;
        }
        for (var i = 1; i < length - 2; i++) {
            var step = 0.01;
            if (byDistance > 0) {
                var distance = Laya.Vector3.distance(path[i], path[i + 1]);
                step = byDistance / distance;
            }
            for (var u = 0; u < 1.0; u += step) {
                var p0 = i - 1 < 0 ? path[length - 1] : path[i - 1];
                var p1 = path[i];
                var p2 = path[i + 1];
                var p3 = path[i + 2];
                var vec = this.interpolatedPosition //call to Catmull-Rom
                (p0, p1, p2, p3, u);
                temp.push(vec); //store each value
            }
        }
        temp.push(path[length - 2]);
        return temp;
    };
    /**
     * 输入4点按照u计算Catmull点的方法
     *
     * @param {Laya.Vector3} p0
     * @param {Laya.Vector3} p1
     * @param {Laya.Vector3} p2
     * @param {Laya.Vector3} p3
     * @param {number} u
     * @returns
     * @memberof TrackManager
     */
    PathGenerator.interpolatedPosition = function (p0, p1, p2, p3, u) {
        var u3 = u * u * u;
        var u2 = u * u;
        var f1 = -0.5 * u3 + u2 - 0.5 * u;
        var f2 = 1.5 * u3 - 2.5 * u2 + 1.0;
        var f3 = -1.5 * u3 + 2.0 * u2 + 0.5 * u;
        var f4 = 0.5 * u3 - 0.5 * u2;
        var result = new Laya.Vector3();
        result.x = p0.x * f1 + p1.x * f2 + p2.x * f3 + p3.x * f4;
        result.y = p0.y * f1 + p1.y * f2 + p2.y * f3 + p3.y * f4;
        result.z = p0.z * f1 + p1.z * f2 + p2.z * f3 + p3.z * f4;
        return result;
    };
    return PathGenerator;
}());
exports.default = PathGenerator;
},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PathGenerator_1 = require("./PathGenerator");
/**
 * 赛道管理器，负责管理赛道，以及玩家与赛道交互的逻辑
 *
 * @export
 * @class TrackManager
 */
var TrackWay = /** @class */ (function () {
    function TrackWay() {
    }
    Object.defineProperty(TrackWay.prototype, "WayPoints", {
        /**
         * 对路径点数组_wayPoints的对外get属性封装
         *
         * @readonly
         * @type {Array<Laya.Vector3>}
         * @memberof TrackManager
         */
        get: function () {
            return this._wayPoints;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TrackWay.prototype, "TotalLength", {
        /* 跑道的总长度的对外get属性封装 */
        get: function () {
            return this._tootalLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TrackWay.prototype, "LastPoint", {
        get: function () {
            return this._wayPoints[this._wayPoints.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    // onDestroy() {
    //     TrackManager._instance = null;
    // }
    /**
     * 计算路径的方法，参数为3个
     *
     * @param {Laya.Sprite3D} road 路径父物体，其下面挂载的子物体的transform.position为计算曲线的节点
     * @param {number} generateOption 生成选项，1是经典模式(输入n点输出n-3条曲线)，2是自动添加头尾(输入n点输出n-1条曲线)，3是自动添加头尾(输入n点输出n条曲线)且生成的曲线闭合
     * @param {number} byDistance 是否按照距离生成曲线点
     * @returns
     * @memberof TrackManager
     */
    TrackWay.prototype.CalculatePath = function (road, generateOption, byDistance) {
        var wayPoints = [];
        for (var index = 0; index < road.numChildren; index++) {
            var vector3 = road._children[index].transform.position;
            wayPoints.push(vector3);
        }
        var length = wayPoints.length;
        switch (generateOption) {
            case 0:
                break;
            case 1:
                if (length >= 2) {
                    var v0 = wayPoints[0];
                    var v3 = wayPoints[length - 1];
                    wayPoints.unshift(v0);
                    wayPoints.push(v3);
                }
                break;
            case 2:
                if (length >= 2) {
                    var v0 = wayPoints[length - 1];
                    var v2 = wayPoints[0];
                    var v3 = wayPoints[1];
                    wayPoints.unshift(v0);
                    wayPoints.push(v2);
                    wayPoints.push(v3);
                }
                break;
        }
        this._wayPoints = PathGenerator_1.default.savePathCatmullRom(wayPoints, byDistance);
        var totalLenght = 0;
        for (var index = 0; index < this._wayPoints.length - 1; index++) {
            var current = this._wayPoints[index];
            var next = this._wayPoints[index + 1];
            totalLenght += Laya.Vector3.distance(current, next);
        }
        this._tootalLength = Math.floor(totalLenght);
    };
    // /**
    //  * 按照路径点得到当前路径点应该的朝向
    //  * 
    //  * @param {number} point 
    //  * @returns {Laya.Vector3} 
    //  * @memberof TrackManager
    //  */
    // public GetForwardDirection(pointIndex: number): Laya.Vector3 {
    //     let dir = Laya.Vector3._ZERO;
    //     /* 如果路径点小于2个,返回 (0,0,0)*/
    //     if (this._wayPoints.length < 2) {
    //         return dir;
    //     }
    //     let next: Laya.Vector3;
    //     let current: Laya.Vector3;
    //     /* 如果输入的路径点超出了路径边界,返回最后一个线段的方向 */
    //     if (pointIndex >= this._wayPoints.length - 1) {
    //         next = this._wayPoints[this._wayPoints.length - 1];
    //         current = this._wayPoints[this._wayPoints.length - 2];
    //     }
    //     /* 如果输入的路径点没有超出边界，返回下个点到这个点的线段*/
    //     else {
    //         next = this._wayPoints[pointIndex + 1];
    //         current = this._wayPoints[pointIndex];
    //     }
    //     /* 将方向归一化  */
    //     Laya.Vector3.subtract(next, current, dir);
    //     Laya.Vector3.normalize(dir, dir);
    //     return dir;
    // }
    /**
     * 得到两点之间归一化后的方向
     *
     * @param {Laya.Vector3} current
     * @param {Laya.Vector3} next
     * @returns {Laya.Vector3}
     * @memberof TrackManager
     */
    TrackWay.prototype.GetNormalizeDirection = function (current, next) {
        var dir = new Laya.Vector3();
        Laya.Vector3.subtract(next, current, dir);
        Laya.Vector3.normalize(dir, dir);
        return dir;
    };
    /**
     * 按照当前的位置、路径点和速度，计算出下一个点的位置和玩家朝向的角度;
     *
     * @param {Laya.Vector3} currentPos
     * @param {number} pointIndex
     * @param {number} distance
     * @returns
     * @memberof TrackManager
     */
    TrackWay.prototype.GetPointByDistance = function (currentPos, pointIndex, distance) {
        var dis = 0;
        var tempPos = currentPos.clone();
        var result = { CurrentPos: null, PointIndex: null, Direction: null };
        while (true) {
            if (pointIndex >= this._wayPoints.length - 1) {
                result.CurrentPos = this._wayPoints[this._wayPoints.length - 1];
                result.PointIndex = this._wayPoints.length - 1;
                result.Direction = Laya.Vector3._ZERO;
                // result.Direction=this.GerDir()
                return result;
            }
            var nextPoint = this._wayPoints[pointIndex + 1];
            var fooDis = Laya.Vector3.distance(tempPos, nextPoint);
            dis += fooDis;
            if (dis >= distance) {
                var t = (dis - distance) / fooDis;
                Laya.Vector3.lerp(nextPoint, tempPos, t, tempPos);
                result.CurrentPos = tempPos;
                result.PointIndex = pointIndex;
                // result.NextPos = nextPoint;
                /* 下面的函数用于计算玩家朝向 */
                var currentDirect = this.GetNormalizeDirection(this._wayPoints[pointIndex], nextPoint);
                var lastDirect = pointIndex == 0 ? currentDirect : this.GetNormalizeDirection(this._wayPoints[pointIndex - 1], this._wayPoints[pointIndex]);
                var dir = new Laya.Vector3();
                var foo = Laya.Vector3.distance(this._wayPoints[pointIndex], this._wayPoints[pointIndex + 1]);
                var foo2 = Laya.Vector3.distance(this._wayPoints[pointIndex], tempPos);
                var lerp_t = foo2 / foo;
                Laya.Vector3.lerp(lastDirect, currentDirect, lerp_t, dir);
                // let dir0 = this.GetNormalizeDirection(this._wayPoints[Math.max(0, pointIndex - 2)], this._wayPoints[Math.max(0, pointIndex - 1)]);
                // let dir1 = this.GetNormalizeDirection(this._wayPoints[Math.max(0, pointIndex - 1)], this._wayPoints[pointIndex]);
                // let dir2 = this.GetNormalizeDirection(this._wayPoints[pointIndex], this._wayPoints[Math.min(pointIndex + 1, this._wayPoints.length - 1)]);
                // let dir3 = this.GetNormalizeDirection(this._wayPoints[Math.min(pointIndex + 1, this._wayPoints.length - 1)], this._wayPoints[Math.min(pointIndex + 2, this._wayPoints.length - 1)]);
                // dir = PathGenerator.interpolatedPosition(dir0, dir1, dir2, dir3, lerp_t);
                result.Direction = dir;
                /* 返回值 */
                return result;
            }
            else {
                pointIndex++;
                tempPos = this._wayPoints[pointIndex].clone();
            }
            //     Vector3 nextPoint = _roadPointIndex + 2 <= _wayPoints.Count
            //         ? _wayPoints[_roadPointIndex + 1]
            //         : _wayPoints[0];
            //     float fooDis = Vector3.Distance(_lastPoint, nextPoint);
            //     dis += fooDis;
            //     if (dis > distance) {
            //         float t = (dis - distance) / fooDis;
            //         _lastPoint = Vector3.Lerp(nextPoint, _lastPoint, t);
            //         break;
            //     }
            //     else {
            //         if (_roadPointIndex + 1 < _wayPoints.Count) {
            //             _roadPointIndex++;
            //         }
            //         else {
            //             _roadPointIndex = 0;
            //         }
            //         _lastPoint = _wayPoints[_roadPointIndex];
            //     }
            // }
        }
    };
    /**
     * 得到路径数组点中输入参数currentPos最近的点
     *
     * @param {Laya.Vector3} currentPos
     * @memberof TrackManager
     */
    TrackWay.prototype.GetClosetPoint = function (currentPos) {
        var res = new PosOnRoad();
        var distance = -1;
        var pointIndex = -1;
        /* 第一步：得到wayPoint路径数组中离落点最近的点 */
        for (var i = 0; i < this._wayPoints.length; i++) {
            var point = this._wayPoints[i];
            var tempdis = Laya.Vector3.distance(point, currentPos);
            if (distance == -1 || tempdis < distance) {
                distance = tempdis;
                pointIndex = i;
            }
        }
        // if (pointIndex > 1) {
        // }
        // else if (pointIndex + 1 <= this._wayPoints.length) {
        // }
        res.CurrentPos = this._wayPoints[pointIndex];
        res.PointIndex = pointIndex;
        if (pointIndex > 0) {
            res.Direction = this.GetNormalizeDirection(this._wayPoints[pointIndex - 1], this._wayPoints[pointIndex]);
        }
        else {
            res.Direction = Laya.Vector3._ZERO;
        }
        // if (pointIndex >= this._wayPoints.length - 1) {
        //     res.Direction = this.GetNormalizeDirection(this._wayPoints[pointIndex - 1], this._wayPoints[pointIndex]);
        // }
        // else {
        //     let currentDirect = this.GetNormalizeDirection(this._wayPoints[pointIndex], this._wayPoints[pointIndex + 1]);
        //     let lastDirect = pointIndex == 0 ? currentDirect : this.GetNormalizeDirection(this._wayPoints[pointIndex - 1], this._wayPoints[pointIndex]);
        // }
        return res;
    };
    /**
     * 得到路径点
     *
     * @returns {number}
     * @memberof TrackManager
     */
    TrackWay.prototype.GetProgress = function (pointIndex) {
        pointIndex = pointIndex < 0 ? 0 : pointIndex;
        pointIndex = pointIndex > this._wayPoints.length - 1 ? this._wayPoints.length - 1 : pointIndex;
        return pointIndex / (this._wayPoints.length - 1);
    };
    return TrackWay;
}());
exports.default = TrackWay;
/**
 * 用来保存角色在赛道路径点上的参数，包括
 * 1：当前位置
 * 2：当前路径点索引
 * 3：当前方向
 *
 * @class PosOnRoad
 */
var PosOnRoad = /** @class */ (function () {
    function PosOnRoad() {
    }
    return PosOnRoad;
}());
},{"./PathGenerator":27}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoadBase_1 = require("./RoadBase");
var PhysicTrigger3d_1 = require("../Tools/PhysicTrigger3d");
var HillCar_1 = require("../Car/HillCar");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var BoomRoad = /** @class */ (function (_super) {
    __extends(BoomRoad, _super);
    function BoomRoad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.barrels = null;
        _this.effects = null;
        _this.triggerBox = null;
        return _this;
    }
    BoomRoad.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.barrels = this.owner.getChildByName("Barrels");
        this.effects = this.owner.getChildByName("Effects");
        this.triggerBox = this.owner.getChildByName("Trigger");
        var trigger = PhysicTrigger3d_1.default.GetTrigger(this.triggerBox);
        trigger.OnTriggerEnter(this, this.OnTriggerEnter);
        var physicsComponent = this.triggerBox.getComponent(Laya.PhysicsComponent);
        physicsComponent.collisionGroup = 1000000 & ~1;
    };
    BoomRoad.prototype.onEnable = function () {
        this.effects.active = false;
    };
    BoomRoad.prototype.OnTriggerEnter = function (self, other) {
        var car = other.owner.getComponent(HillCar_1.default);
        if (car == null) {
            return;
        }
        this.PlayAnimation();
    };
    BoomRoad.prototype.PlayAnimation = function () {
        var _this = this;
        if (this.barrels.active == false)
            return;
        this.effects.active = false;
        this.effects.active = true;
        this.barrels.active = false;
        SoundMgr_1.default.instance_.play_ppxhc_Sound("oildrumsbang");
        Laya.timer.once(800, this, function () {
            _this.effects.active = false;
        });
    };
    return BoomRoad;
}(RoadBase_1.default));
exports.default = BoomRoad;
},{"../../Mgr/SoundMgr":67,"../Car/HillCar":15,"../Tools/PhysicTrigger3d":46,"./RoadBase":35}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoadBase_1 = require("./RoadBase");
var PhysicTrigger3d_1 = require("../Tools/PhysicTrigger3d");
var Game_1 = require("../Game");
var HillCar_1 = require("../Car/HillCar");
var CaveRoad = /** @class */ (function (_super) {
    __extends(CaveRoad, _super);
    function CaveRoad() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CaveRoad.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.enterTrigger = this.owner.getChildByName("EnterTrigger");
        this.exitTrigger = this.owner.getChildByName("ExitTrigger");
        var trigger = PhysicTrigger3d_1.default.GetTrigger(this.enterTrigger);
        trigger.OnTriggerEnter(this, this.OnCarEnter);
        trigger = PhysicTrigger3d_1.default.GetTrigger(this.exitTrigger);
        trigger.OnTriggerEnter(this, this.OnCarExit);
    };
    CaveRoad.prototype.OnCarEnter = function (self, other) {
        var car = other.owner.getComponent(HillCar_1.default);
        if (car == null) {
            return;
        }
        Game_1.default.CameraFollow.Switch("Cave");
    };
    CaveRoad.prototype.OnCarExit = function (self, other) {
        var car = other.owner.getComponent(HillCar_1.default);
        if (car == null) {
            return;
        }
        Game_1.default.CameraFollow.Switch("Driving");
    };
    return CaveRoad;
}(RoadBase_1.default));
exports.default = CaveRoad;
},{"../Car/HillCar":15,"../Game":17,"../Tools/PhysicTrigger3d":46,"./RoadBase":35}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoadBase_1 = require("./RoadBase");
var HillCar_1 = require("../Car/HillCar");
var Utilit_1 = require("../../Utilit");
var DollerRoad = /** @class */ (function (_super) {
    __extends(DollerRoad, _super);
    function DollerRoad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.time = 0;
        _this.animator = null;
        _this.physicsComponent = null;
        return _this;
    }
    DollerRoad.prototype.onAwake = function () {
        this.animator = this.owner.getComponent(Laya.Animator);
        this.animator.play("Def");
        this.physicsComponent = this.owner.getComponent(Laya.PhysicsComponent);
        this.physicsComponent.collisionGroup = 100000 & ~1;
    };
    DollerRoad.prototype.onTriggerEnter = function (other) {
        var _this = this;
        var car = other.owner.getComponent(HillCar_1.default);
        if (car == null) {
            return;
        }
        this.physicsComponent.enabled = false;
        this.physicsComponent.destroy();
        var position = this.transform.position;
        Utilit_1.default.InverseTransformPoint(car.transform, position, position);
        this.owner.removeSelf();
        car.owner.addChild(this.owner);
        this.transform.localPosition = position.clone();
        this.animator.play("dollar_02");
        var clip = Utilit_1.default.getAnimationClip(this.animator, 0, "dollar_02");
        Laya.timer.once(clip.duration() * 1000, this, function () {
            _this.owner.removeSelf();
            _this.owner.destroy();
        });
    };
    return DollerRoad;
}(RoadBase_1.default));
exports.default = DollerRoad;
},{"../../Utilit":85,"../Car/HillCar":15,"./RoadBase":35}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoadBase_1 = require("./RoadBase");
var PhysicTrigger3d_1 = require("../Tools/PhysicTrigger3d");
var HillCar_1 = require("../Car/HillCar");
var DrawbridgeRoad = /** @class */ (function (_super) {
    __extends(DrawbridgeRoad, _super);
    function DrawbridgeRoad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.drawbridges = [];
        return _this;
    }
    DrawbridgeRoad.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        var node = this.owner.getChildByName("road_qiaoqiaoban");
        for (var i = 0; i < node._children.length; i++) {
            if (node._children[i].name == "road_drawbridge_0") {
                this.drawbridges.push(node._children[i]);
            }
        }
        this.triggerBox = this.owner.getChildByName("Trigger");
        var trigger = PhysicTrigger3d_1.default.GetTrigger(this.triggerBox);
        trigger.OnTriggerEnter(this, this.OnTriggerEnter);
    };
    DrawbridgeRoad.prototype.OnTriggerEnter = function (self, other) {
        var car = other.owner.getComponent(HillCar_1.default);
        if (car == null) {
            return;
        }
        this.PlayAnimation();
    };
    DrawbridgeRoad.prototype.PlayAnimation = function () {
        for (var i = 0; i < this.drawbridges.length; i++) {
            var sprite = this.drawbridges[i];
            Laya.Tween.to(sprite.transform, { localRotationEulerX: 0 }, 1.5 * 1000);
        }
    };
    return DrawbridgeRoad;
}(RoadBase_1.default));
exports.default = DrawbridgeRoad;
},{"../Car/HillCar":15,"../Tools/PhysicTrigger3d":46,"./RoadBase":35}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoadBase_1 = require("./RoadBase");
var PhysicTrigger3d_1 = require("../Tools/PhysicTrigger3d");
var Game_1 = require("../Game");
var CargoMgr_1 = require("../Cargoes/CargoMgr");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var CarMgr_1 = require("../Car/CarMgr");
var EndRoad = /** @class */ (function (_super) {
    __extends(EndRoad, _super);
    function EndRoad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.finishBox = null;
        _this.garage_tube_throat = null;
        _this.xishouEffect = null;
        _this.celebrateEffect = null;
        _this.stars = [];
        _this.carPosition = new Laya.Vector3(0, 0, -26);
        return _this;
    }
    EndRoad.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        var starNode = this.owner.getChildByName("Starts");
        for (var i = 0; i < starNode._children.length; i++) {
            this.stars.push(starNode._children[i]);
        }
        this.celebrateEffect = this.owner.getChildByName("CelebrateEffect");
        this.garage_tube_throat = this.owner.getChildByName("garage_tube_throat");
        this.xishouEffect = this.garage_tube_throat.getChildByName("FX_xishou");
        this.finishBox = this.owner.getChildByName("FinishTrigger");
        var physicsComponent = this.finishBox.getComponent(Laya.PhysicsComponent);
        physicsComponent.collisionGroup = 1000000 & ~1;
        var trigger = PhysicTrigger3d_1.default.GetTrigger(this.finishBox);
        trigger.OnTriggerEnter(this, this.OnFinishTriggerEnter);
    };
    EndRoad.prototype.onEnable = function () {
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Car_Unload, this, this.OnCarUnload);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Car_ChangeTipEnd, this, this.OnChangeCarEnd);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Car_ChangeTipStart, this, this.OnChangeCarStart);
    };
    EndRoad.prototype.onDisable = function () {
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.Car_Unload, this, this.OnCarUnload);
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.Car_ChangeTipEnd, this, this.OnChangeCarEnd);
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.Car_ChangeTipStart, this, this.OnChangeCarStart);
    };
    EndRoad.prototype.OnFinishTriggerEnter = function (self, other) {
        SoundMgr_1.default.instance_.play_ppxhc_Sound("arrivalterminal");
        this.celebrateEffect.active = true;
        Game_1.default.CameraFollow.Switch("Win");
        Game_1.default.Control.GameOver();
        Game_1.default.Control.currentCar.SetSpeedUpOver();
        Game_1.default.Control.currentCar.SetUnload(this.exit.position.clone(), Laya.Handler.create(this, this.OnArriveUnloadPoint));
    };
    EndRoad.prototype.OnArriveUnloadPoint = function () {
        var points = [];
        points.push(this.garage_tube_throat.transform.position.clone());
        this.xishouEffect.active = true;
        CargoMgr_1.default.Instance.UnloadCargoes(Game_1.default.Control.currentCar, points, Laya.Handler.create(this, this.OnUnLoadCompleted));
    };
    EndRoad.prototype.OnUnLoadCompleted = function () {
        if (Game_1.default.Control.IsChangeCarRound && Game_1.default.Control.TryGenerateNotUnlockCars() == true) {
            Game_1.default.Control.StartChangeCar();
            return;
        }
        Game_1.default.Control.GameSettle(1);
    };
    EndRoad.prototype.OnChangeCarStart = function () {
        CarMgr_1.default.Instance.CreateShowCar("Car" + Game_1.default.Control.CurrentChangeCarIndex, this.owner, this.carPosition, new Laya.Vector3(0, -90, 0));
    };
    EndRoad.prototype.OnChangeCarEnd = function () {
    };
    EndRoad.prototype.OnCarUnload = function (progress, level) {
        var _this = this;
        level = Math.min(3, level);
        var star = this.stars[level - 1];
        if (star.active != true) {
            star.active = true;
            var scale = star.transform.localScale.clone();
            star.transform.localScale = new Laya.Vector3(0, 0, 0);
            Laya.Tween.to(star.transform, { localScaleX: scale.x, localScaleY: scale.y, localScaleZ: scale.z }, 400, Laya.Ease.backInOut);
        }
        if (progress == 1) {
            Laya.timer.once(400, this, function () {
                _this.xishouEffect.active = false;
            });
        }
    };
    return EndRoad;
}(RoadBase_1.default));
exports.default = EndRoad;
},{"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../Mgr/SoundMgr":67,"../Car/CarMgr":13,"../Cargoes/CargoMgr":16,"../Game":17,"../Tools/PhysicTrigger3d":46,"./RoadBase":35}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoadBase_1 = require("./RoadBase");
var PhysicTrigger3d_1 = require("../Tools/PhysicTrigger3d");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var HillCar_1 = require("../Car/HillCar");
var Game_1 = require("../Game");
var GoodRoad = /** @class */ (function (_super) {
    __extends(GoodRoad, _super);
    function GoodRoad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isActive = false;
        _this.triggerBox = null;
        return _this;
    }
    GoodRoad.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.triggerBox = this.owner.getChildByName("Trigger");
        var trigger = PhysicTrigger3d_1.default.GetTrigger(this.triggerBox);
        trigger.OnTriggerEnter(this, this.OnTriggerEnter);
        var physicsComponent = this.triggerBox.getComponent(Laya.PhysicsComponent);
        physicsComponent.collisionGroup = 100000 & ~1;
    };
    GoodRoad.prototype.onEnable = function () {
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Game_RobmoneyEnd, this, this.OnRobmoneyEnd);
    };
    GoodRoad.prototype.OnTriggerEnter = function (self, other) {
        var car = other.owner.getComponent(HillCar_1.default);
        if (car == null) {
            return;
        }
        this.isActive = true;
        this.triggerBox.offAll(Laya.Event.TRIGGER_ENTER);
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Game_RobmoneyStart);
    };
    GoodRoad.prototype.OnRobmoneyEnd = function () {
        this.isActive = false;
    };
    GoodRoad.prototype.onUpdate = function () {
        if (this.isActive == false)
            return;
        var distance = Laya.Vector3.distance(this.triggerBox.transform.position, Game_1.default.Control.currentCar.transform.position);
        if (distance > 20) {
            this.isActive = false;
            Game_1.default.Control.EndRobmoney(false);
            EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Game_RobmoneyEnd);
        }
    };
    return GoodRoad;
}(RoadBase_1.default));
exports.default = GoodRoad;
},{"../../Event/EventDef":7,"../../Event/EventMgr":8,"../Car/HillCar":15,"../Game":17,"../Tools/PhysicTrigger3d":46,"./RoadBase":35}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoadBase = /** @class */ (function (_super) {
    __extends(RoadBase, _super);
    function RoadBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RoadBase.prototype, "transform", {
        get: function () {
            return this.owner.transform;
        },
        enumerable: true,
        configurable: true
    });
    RoadBase.prototype.onAwake = function () {
        this.enter = this.owner.getChildByName("EnterPosition").transform;
        this.exit = this.owner.getChildByName("ExitPosition").transform;
    };
    RoadBase.prototype.Init = function () {
    };
    RoadBase.prototype.onEnableWay = function () {
    };
    RoadBase.prototype.onDisableWay = function () {
    };
    RoadBase.prototype.UpdateCarBehaiovr = function (car) {
        car.SetTarget(this.GetTargetPoint());
    };
    RoadBase.prototype.SetEnterPosition = function (position) {
        var offset = new Laya.Vector3;
        Laya.Vector3.subtract(this.transform.position, this.enter.position, offset);
        var newPosition = new Laya.Vector3();
        Laya.Vector3.add(position, offset, newPosition);
        this.transform.position = newPosition.clone();
    };
    RoadBase.prototype.GetEnterPosition = function () {
        return this.enter.position;
    };
    RoadBase.prototype.GetExitPosition = function () {
        return this.exit.position;
    };
    RoadBase.prototype.TryMoveWay = function (currentPosition, car) {
        var distance = Laya.Vector3.distance(currentPosition, this.exit.position);
        if (distance < 0.2 || currentPosition.z >= this.exit.position.z) {
            return false;
        }
        return true;
    };
    RoadBase.prototype.GetTargetPoint = function () {
        return this.exit.position.clone();
    };
    return RoadBase;
}(Laya.Script3D));
exports.default = RoadBase;
},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = require("../Game");
var RoadBase_1 = require("./RoadBase");
var SplineRoad_1 = require("./SplineRoad");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var EndRoad_1 = require("./EndRoad");
var StartRoad_1 = require("./StartRoad");
var SnowfieldRoad_1 = require("./SnowfieldRoad");
var SludgeRoad_1 = require("./SludgeRoad");
var CaveRoad_1 = require("./CaveRoad");
var SpeedUpRoad_1 = require("./SpeedUpRoad");
var Utilit_1 = require("../../Utilit");
var DrawbridgeRoad_1 = require("./DrawbridgeRoad");
var ZhuanluRoad_1 = require("./ZhuanluRoad");
var TiaoqiaoRoad_1 = require("./TiaoqiaoRoad");
var BoomRoad_1 = require("./BoomRoad");
var GoodRoad_1 = require("./GoodRoad");
var DollerRoad_1 = require("./DollerRoad");
var RoadMgr = /** @class */ (function () {
    function RoadMgr() {
        this.wayClassTypes = {};
        this.colourMatching = [
            {
                planeColor: new Laya.Vector4(0.3795415, 0.7941176, 0.3824006, 1),
                roadColor: new Laya.Vector4(0.5382891, 0.245026, 0.7573529, 1)
            },
            {
                planeColor: new Laya.Vector4(0.3633218, 0.5783081, 0.7058823, 1),
                roadColor: new Laya.Vector4(0.7867647, 0.2661116, 0.7508579, 1)
            },
            {
                planeColor: new Laya.Vector4(0.6524901, 0.3986267, 0.7426471, 1),
                roadColor: new Laya.Vector4(0.8970588, 0.4606297, 0.1253244, 1)
            },
        ];
        this.startWay = null;
        this.endWay = null;
        this.activeWays = [];
        this.wayContainer = null;
        this.currentSegmentIndex = 0;
    }
    Object.defineProperty(RoadMgr, "Instance", {
        get: function () {
            if (RoadMgr._instance == null)
                RoadMgr._instance = new RoadMgr;
            return RoadMgr._instance;
        },
        enumerable: true,
        configurable: true
    });
    RoadMgr.prototype.Init = function () {
        var prefab = Game_1.default.Prefabs["Prefab"];
        this.plane = prefab.getChildByName("Plane");
        this.wayClassTypes["Start"] = StartRoad_1.default;
        this.wayClassTypes["Left-RingRoad"] = SplineRoad_1.default;
        this.wayClassTypes["Left-RingRoad-Up"] = SplineRoad_1.default;
        this.wayClassTypes["Left-RingRoad-Down"] = SplineRoad_1.default;
        this.wayClassTypes["Snowfield"] = SnowfieldRoad_1.default;
        this.wayClassTypes["Sludge"] = SludgeRoad_1.default;
        this.wayClassTypes["Centrifuge_L"] = SplineRoad_1.default;
        this.wayClassTypes["Centrifuge_R"] = SplineRoad_1.default;
        this.wayClassTypes["Cave"] = CaveRoad_1.default;
        this.wayClassTypes["Road_boost_No"] = SpeedUpRoad_1.default;
        this.wayClassTypes["Serpentine_begin_r_R"] = SplineRoad_1.default;
        this.wayClassTypes["Drawbridge"] = DrawbridgeRoad_1.default;
        this.wayClassTypes["Zhuanlu"] = ZhuanluRoad_1.default;
        this.wayClassTypes["Tiaoqiao"] = TiaoqiaoRoad_1.default;
        this.wayClassTypes["Boom_No"] = BoomRoad_1.default;
        this.wayClassTypes["Good"] = GoodRoad_1.default;
        this.wayClassTypes["dollar_No"] = DollerRoad_1.default;
        this.wayClassTypes["End"] = EndRoad_1.default;
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Car_Moving, this, this.OnCarMoving);
    };
    RoadMgr.prototype.CreateEnvironment = function (colorType) {
        this.CreateWayContainer();
        var plane = Laya.Sprite3D.instantiate(this.plane, this.wayContainer);
        plane.transform.localPositionY = -1.5;
        // plane.transform.localPositionZ = 77;
        var colorMath = this.colourMatching[colorType];
        var color = colorMath.planeColor.clone();
        plane.meshRenderer.sharedMaterial.albedoColor = color;
        Game_1.default.Camera.clearColor = color.clone();
        Game_1.default.Scene.fogColor = color.clone();
    };
    RoadMgr.prototype.LoadRoadLh = function (name, caller, complete) {
        var _this = this;
        var colorType = Utilit_1.default.Clamp(Utilit_1.default.getRandomInt(1, 4), 1, 3) - 1;
        Laya.Sprite3D.load(name, Laya.Handler.create(this, function (prefab) {
            _this.CreateWayByNode(prefab.clone(), colorType);
            _this.CreateEnvironment(colorType);
            if (complete != null) {
                complete.call(caller);
            }
            Laya.loader.clearRes(name);
        }));
    };
    RoadMgr.prototype.GetCarPosition = function (out) {
        this.startWay.GetEnterPosition().cloneTo(out);
    };
    RoadMgr.prototype.OpenWays = function () {
        this.currentSegmentIndex = 0;
        this.GetRunway(this.currentSegmentIndex).onEnable();
    };
    RoadMgr.prototype.OnCarMoving = function (car, position) {
        if (Game_1.default.Control.InGameing == false)
            return;
        var way = RoadMgr.Instance.GetRunway(this.currentSegmentIndex);
        if (!way.TryMoveWay(position, car)) {
            way.onDisableWay();
            this.currentSegmentIndex++;
            this.GetRunway(this.currentSegmentIndex).onEnable;
            return;
        }
        way.UpdateCarBehaiovr(car);
    };
    RoadMgr.prototype.GetRunway = function (index) {
        if (index == 0) {
            return this.startWay;
        }
        else if ((index - 1) <= (this.activeWays.length - 1)) {
            return this.activeWays[index - 1];
        }
        else {
            return this.endWay;
        }
    };
    RoadMgr.prototype.CreateWayContainer = function () {
        var constName = "WayContainer";
        if (this.wayContainer != null)
            return;
        this.wayContainer = new Laya.Sprite3D(constName);
        Game_1.default.Scene.addChild(this.wayContainer);
    };
    RoadMgr.prototype.CreateWayByNode = function (round, colorType) {
        this.CreateWayContainer();
        this.wayContainer.addChild(round);
        !round.active && (round.active = true);
        round.transform.position = new Laya.Vector3;
        var roads = round.getChildByName("Roads");
        for (var i = 0; i < roads._children.length; i++) {
            var node_1 = roads._children[i];
            var nodeName = node_1.name.split(" ")[0];
            var classType = this.wayClassTypes[nodeName];
            (classType == null) && (classType = RoadBase_1.default);
            var road = node_1.addComponent(classType);
            road.Init();
            if (nodeName == "Start") {
                this.startWay = road;
            }
            else if (nodeName == "End") {
                this.endWay = road;
            }
            else if (nodeName.search("No") < 0) {
                this.activeWays.push(road);
            }
        }
        var node = Utilit_1.default.FindChild(this.startWay.owner, "monster_road_road_finish/monster_road_road_finish_0");
        var meshSprite = node;
        var blinnPhongMaterial = meshSprite.meshRenderer.sharedMaterial;
        var colorMath = this.colourMatching[colorType];
        var color = colorMath.roadColor.clone();
        blinnPhongMaterial.albedoColor = color;
    };
    RoadMgr.prototype.Clear = function () {
        this.startWay = null;
        this.endWay = null;
        this.activeWays = [];
        this.currentSegmentIndex = 0;
        this.wayContainer.removeSelf();
        this.wayContainer.destroy(true);
        this.wayContainer = null;
    };
    return RoadMgr;
}());
exports.default = RoadMgr;
},{"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../Utilit":85,"../Game":17,"./BoomRoad":29,"./CaveRoad":30,"./DollerRoad":31,"./DrawbridgeRoad":32,"./EndRoad":33,"./GoodRoad":34,"./RoadBase":35,"./SludgeRoad":37,"./SnowfieldRoad":38,"./SpeedUpRoad":39,"./SplineRoad":40,"./StartRoad":41,"./TiaoqiaoRoad":42,"./ZhuanluRoad":43}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SnowfieldRoad_1 = require("./SnowfieldRoad");
var Utilit_1 = require("../../Utilit");
var SludgeRoad = /** @class */ (function (_super) {
    __extends(SludgeRoad, _super);
    function SludgeRoad() {
        var _this = _super.call(this) || this;
        _this.resistance = 1000;
        _this.maxSpeed = 20;
        _this.sliptorque = 1000;
        return _this;
    }
    SludgeRoad.prototype.UpdateCarBehaiovr = function (car) {
        if (car.m_groundForward.IsSet == false)
            return;
        car.SetTarget(this.GetTargetPoint());
        var length = Laya.Vector3.scalarLength(car.rigidbody.linearVelocity);
        var velocityNormal = car.rigidbody.linearVelocity.clone();
        Laya.Vector3.scale(velocityNormal, 1 / length, velocityNormal);
        var dot = Laya.Vector3.dot(velocityNormal, car.m_forward);
        length = dot * length;
        var value = Math.sin(Laya.timer.currFrame / 5);
        var torque = new Laya.Vector3(0, 1, 0);
        Laya.Vector3.scale(torque, value * this.sliptorque * Math.min(1, length / this.maxSpeed), torque);
        Utilit_1.default.QuaternionVector3(car.transform.rotation, torque, torque);
        car.rigidbody.applyTorque(torque);
        var force = new Laya.Vector3;
        Laya.Vector3.scale(car.m_forward, this.resistance * -1, force);
        car.rigidbody.applyForce(force);
    };
    return SludgeRoad;
}(SnowfieldRoad_1.default));
exports.default = SludgeRoad;
},{"../../Utilit":85,"./SnowfieldRoad":38}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoadBase_1 = require("./RoadBase");
var Utilit_1 = require("../../Utilit");
var SnowfieldRoad = /** @class */ (function (_super) {
    __extends(SnowfieldRoad, _super);
    function SnowfieldRoad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sliptorque = 2000;
        _this.maxSpeed = 20;
        return _this;
    }
    SnowfieldRoad.prototype.UpdateCarBehaiovr = function (car) {
        if (car.m_groundForward.IsSet == false)
            return;
        _super.prototype.UpdateCarBehaiovr.call(this, car);
        var length = Laya.Vector3.scalarLength(car.rigidbody.linearVelocity);
        var velocityNormal = car.rigidbody.linearVelocity.clone();
        Laya.Vector3.scale(velocityNormal, 1 / length, velocityNormal);
        var dot = Laya.Vector3.dot(velocityNormal, car.m_forward);
        length = dot * length;
        var turnforce = new Laya.Vector3(1, 0, 0);
        var value = Math.sin(Laya.timer.currFrame / 5);
        Utilit_1.default.QuaternionVector3(this.transform.rotation, turnforce, turnforce);
        Laya.Vector3.scale(turnforce, value * this.sliptorque * (dot * length / this.maxSpeed), turnforce);
        car.AddTurnForce(turnforce);
    };
    return SnowfieldRoad;
}(RoadBase_1.default));
exports.default = SnowfieldRoad;
},{"../../Utilit":85,"./RoadBase":35}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoadBase_1 = require("./RoadBase");
var PhysicTrigger3d_1 = require("../Tools/PhysicTrigger3d");
var Game_1 = require("../Game");
var SpeedUpBuffer_1 = require("../Car/CarBuffer/SpeedUpBuffer");
var HillCar_1 = require("../Car/HillCar");
var SpeedUpRoad = /** @class */ (function (_super) {
    __extends(SpeedUpRoad, _super);
    function SpeedUpRoad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speedUpTrigger = null;
        return _this;
    }
    SpeedUpRoad.prototype.onAwake = function () {
        this.speedUpTrigger = this.owner.getChildByName("Trigger");
        var trigger = PhysicTrigger3d_1.default.GetTrigger(this.speedUpTrigger);
        trigger.OnTriggerStay(this, this.OnSpeedUpStay);
        var physicsCompleted = this.speedUpTrigger.getComponent(Laya.PhysicsComponent);
        physicsCompleted.collisionGroup = 5 & ~1;
    };
    SpeedUpRoad.prototype.OnSpeedUpStay = function (self, other) {
        var car = other.owner.getComponent(HillCar_1.default);
        if (car == null) {
            return;
        }
        Game_1.default.Control.currentCar.AddBuffer(new SpeedUpBuffer_1.default(1), true);
    };
    return SpeedUpRoad;
}(RoadBase_1.default));
exports.default = SpeedUpRoad;
},{"../Car/CarBuffer/SpeedUpBuffer":12,"../Car/HillCar":15,"../Game":17,"../Tools/PhysicTrigger3d":46,"./RoadBase":35}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TrackWay_1 = require("../Path/TrackWay");
var Utilit_1 = require("../../Utilit");
var RoadBase_1 = require("./RoadBase");
var SplineRoad = /** @class */ (function (_super) {
    __extends(SplineRoad, _super);
    function SplineRoad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.trackWay = null;
        _this.currentWaypointIndex = 0;
        _this.pickNextWaypointDist = 3;
        _this.endReachedDistance = 5;
        _this.currentTargetPoint = new Laya.Vector3;
        return _this;
    }
    SplineRoad.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.spline = this.owner.getChildByName("Spline");
    };
    SplineRoad.prototype.Init = function () {
        _super.prototype.Init.call(this);
        this.trackWay = new TrackWay_1.default();
        this.trackWay.CalculatePath(this.spline, 1, 1);
    };
    SplineRoad.prototype.TryMoveWay = function (currentPosition, car) {
        var flag = this.CalculateTarget(currentPosition, car, this.currentTargetPoint);
        return flag;
    };
    SplineRoad.prototype.GetTargetPoint = function () {
        return this.currentTargetPoint;
    };
    SplineRoad.prototype.CalculateTarget = function (currentPosition, car, outTarget) {
        if (this.trackWay.WayPoints == null || this.trackWay.WayPoints.length == 0)
            return false;
        var vPath = this.trackWay.WayPoints;
        if (vPath.length == 1)
            vPath.splice(0, 0, currentPosition.clone());
        if (this.currentWaypointIndex >= vPath.length)
            this.currentWaypointIndex = vPath.length - 1;
        if (this.currentWaypointIndex <= 1)
            this.currentWaypointIndex = 1;
        var target = currentPosition.clone();
        while (true) {
            if (this.currentWaypointIndex >= vPath.length - 1)
                break;
            var position = new Laya.Vector3;
            Utilit_1.default.InverseTransformPoint(car.transform, vPath[this.currentWaypointIndex], position);
            target.y = vPath[this.currentWaypointIndex].y;
            var distance = Laya.Vector3.distance(vPath[this.currentWaypointIndex], target);
            if (distance > this.pickNextWaypointDist && position.z > 0)
                break;
            this.currentWaypointIndex++;
        }
        var targetDistance = Laya.Vector3.distance(currentPosition, vPath[this.currentWaypointIndex]);
        if (this.currentWaypointIndex == (vPath.length - 1) && targetDistance <= this.endReachedDistance) {
            vPath[this.currentWaypointIndex].cloneTo(outTarget);
            return false;
        }
        vPath[this.currentWaypointIndex].cloneTo(outTarget);
        return true;
    };
    return SplineRoad;
}(RoadBase_1.default));
exports.default = SplineRoad;
},{"../../Utilit":85,"../Path/TrackWay":28,"./RoadBase":35}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoadBase_1 = require("./RoadBase");
var Game_1 = require("../Game");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var StartRoad = /** @class */ (function (_super) {
    __extends(StartRoad, _super);
    function StartRoad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.switchCameraDistance = 7;
        return _this;
    }
    StartRoad.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.animationSprite = this.owner.getChildByName("factory_tube");
    };
    StartRoad.prototype.TryMoveWay = function (currentPosition, car) {
        var distance = Laya.Vector3.distance(currentPosition, this.enter.position);
        if (distance > this.switchCameraDistance) {
            Game_1.default.CameraFollow.Switch("Driving");
        }
        return _super.prototype.TryMoveWay.call(this, currentPosition, car);
    };
    StartRoad.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Car_LoadUp, this, this.OnCarLoadUp);
    };
    StartRoad.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.Car_LoadUp, this, this.OnCarLoadUp);
    };
    StartRoad.prototype.OnCarLoadUp = function () {
        if (this.animationSprite == null)
            return;
        var scale = 1.01;
        var duration = 0.1 * 1000;
        var transform = this.animationSprite.transform;
        Laya.Tween.to(transform, { localScaleX: scale, localScaleY: scale, localScaleZ: scale }, duration, Laya.Ease.backInOut, Laya.Handler.create(this, function () {
            Laya.Tween.to(transform, { localScaleX: 1, localScaleY: 1, localScaleZ: 1 }, duration, Laya.Ease.backInOut);
        }), 0, true);
    };
    return StartRoad;
}(RoadBase_1.default));
exports.default = StartRoad;
},{"../../Event/EventDef":7,"../../Event/EventMgr":8,"../Game":17,"./RoadBase":35}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoadBase_1 = require("./RoadBase");
var PhysicTrigger3d_1 = require("../Tools/PhysicTrigger3d");
var Utilit_1 = require("../../Utilit");
var HillCar_1 = require("../Car/HillCar");
var TiaoqiaoRoad = /** @class */ (function (_super) {
    __extends(TiaoqiaoRoad, _super);
    function TiaoqiaoRoad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.plane = null;
        _this.triggerBox = null;
        return _this;
    }
    TiaoqiaoRoad.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.plane = this.owner.getChildByName("PlaneTrigger");
        this.triggerBox = this.owner.getChildByName("Trigger");
        var trigger = PhysicTrigger3d_1.default.GetTrigger(this.triggerBox);
        trigger.OnTriggerEnter(this, this.OnTriggerEnter);
    };
    TiaoqiaoRoad.prototype.OnTriggerEnter = function (self, other) {
        var car = other.owner.getComponent(HillCar_1.default);
        if (car == null) {
            return;
        }
        Laya.timer.once(200, this, this.PlayAnimation);
    };
    TiaoqiaoRoad.prototype.PlayAnimation = function () {
        var fallingblocks = Utilit_1.default.FindChild(this.owner, "road_tiaoqiao/road");
        for (var i = 0; i < fallingblocks._children.length; i++) {
            var transform = fallingblocks._children[i].transform;
            Laya.Tween.to(transform, { localPositionY: -20 }, 1000, null, null, i * 50);
        }
        Laya.Tween.to(this.plane.transform, { localScaleZ: 0 }, 1700);
    };
    return TiaoqiaoRoad;
}(RoadBase_1.default));
exports.default = TiaoqiaoRoad;
},{"../../Utilit":85,"../Car/HillCar":15,"../Tools/PhysicTrigger3d":46,"./RoadBase":35}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoadBase_1 = require("./RoadBase");
var Utilit_1 = require("../../Utilit");
var HillCar_1 = require("../Car/HillCar");
var PhysicTrigger3d_1 = require("../Tools/PhysicTrigger3d");
var Game_1 = require("../Game");
var ZhuanluRoad = /** @class */ (function (_super) {
    __extends(ZhuanluRoad, _super);
    function ZhuanluRoad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.triggerBox = null;
        _this.luExitPosition = null;
        _this.CarEnter = false;
        return _this;
    }
    ZhuanluRoad.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.triggerBox = Utilit_1.default.FindChild(this.owner, "road_zhuanlu/road2");
        this.luExitPosition = this.owner.getChildByName("LuExitPosition").transform;
        var trigger = PhysicTrigger3d_1.default.GetTrigger(this.triggerBox);
        trigger.OnTriggerEnter(this, this.OnTriggerEnter);
        trigger.OnTriggerStay(this, this.OnTriggerStay);
    };
    ZhuanluRoad.prototype.onStart = function () {
        this.PlayAnimation();
    };
    ZhuanluRoad.prototype.UpdateCarBehaiovr = function (car) {
        if (this.CarEnter == false) {
            _super.prototype.UpdateCarBehaiovr.call(this, car);
        }
        else {
            var forward = car.m_forward.clone();
            Utilit_1.default.QuaternionVector3(this.triggerBox.transform.rotation, forward, forward);
            Laya.Vector3.scale(forward, 5, forward);
            car.SetTarget(forward);
        }
    };
    ZhuanluRoad.prototype.OnTriggerEnter = function (self, other) {
        var car = other.owner.getComponent(HillCar_1.default);
        if (car == null) {
            return;
        }
        this.CarEnter = true;
    };
    ZhuanluRoad.prototype.OnTriggerStay = function (self, other) {
        var car = other.owner.getComponent(HillCar_1.default);
        if ((car == null) || (this.CarEnter == false)) {
            return;
        }
        var distance = Laya.Vector3.distance(Game_1.default.Control.currentCar.head.position, this.luExitPosition.position);
        if (distance < 4) {
            this.CarEnter = false;
        }
    };
    ZhuanluRoad.prototype.PlayAnimation = function () {
        var _this = this;
        Laya.Tween.to(this.triggerBox.transform, { localRotationEulerY: this.triggerBox.transform.localRotationEulerY + 90 }, 3000, null, Laya.Handler.create(this, function () {
            Laya.timer.once(2000, _this, _this.PlayAnimation);
        }));
    };
    return ZhuanluRoad;
}(RoadBase_1.default));
exports.default = ZhuanluRoad;
},{"../../Utilit":85,"../Car/HillCar":15,"../Game":17,"../Tools/PhysicTrigger3d":46,"./RoadBase":35}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FSMStateMachine = /** @class */ (function () {
    function FSMStateMachine() {
        this.curState = new FsmState("", null, null, null, null);
        this.stateHashTabel = {};
    }
    FSMStateMachine.prototype.AddState = function (state) {
        if (state == null)
            return;
        this.stateHashTabel[state.key] = state;
    };
    FSMStateMachine.prototype.AddAction = function (key, caller, enter, exit, update) {
        if (caller === void 0) { caller = null; }
        if (enter === void 0) { enter = null; }
        if (exit === void 0) { exit = null; }
        if (update === void 0) { update = null; }
        this.AddState(new FsmState(key, caller, enter, exit, update));
    };
    FSMStateMachine.prototype.Switch = function (key, args) {
        if (args === void 0) { args = null; }
        var oldState = this.curState;
        var newState = this.stateHashTabel[key];
        if (newState == null || newState.key == oldState.key)
            return;
        this.curState = newState;
        if (oldState != null)
            oldState.OnExit();
        newState.OnEnter(args);
    };
    FSMStateMachine.prototype.MachineExit = function () {
        if (this.curState == null) {
            return;
        }
        this.curState.OnExit();
        this.curState = null;
    };
    FSMStateMachine.prototype.Update = function () {
        if (this.curState == null)
            return;
        this.curState.OnUpdate();
    };
    return FSMStateMachine;
}());
exports.default = FSMStateMachine;
var FsmState = /** @class */ (function () {
    function FsmState(key, caller, enter, exit, update) {
        this.key = key;
        this.caller = caller;
        this.enter = enter;
        this.exit = exit;
        this.update = update;
    }
    FsmState.prototype.OnEnter = function (args) {
        if (this.enter != null) {
            if (args != null) {
                if (!args.unshift) {
                    this.enter.call(this.caller, args);
                }
                else {
                    this.enter.apply(this.caller, args);
                }
            }
            else {
                this.enter.call(this.caller, args);
            }
        }
    };
    FsmState.prototype.OnExit = function () {
        if (this.exit != null)
            this.exit.call(this.caller);
    };
    FsmState.prototype.OnUpdate = function () {
        if (this.update != null)
            this.update.call(this.caller);
    };
    return FsmState;
}());
exports.FsmState = FsmState;
},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CameraMoveScript = /** @class */ (function (_super) {
    __extends(CameraMoveScript, _super);
    function CameraMoveScript() {
        var _this = _super.call(this) || this;
        _this._tempVector3 = new Laya.Vector3();
        _this.yawPitchRoll = new Laya.Vector3();
        _this.resultRotation = new Laya.Quaternion();
        _this.tempRotationZ = new Laya.Quaternion();
        _this.tempRotationX = new Laya.Quaternion();
        _this.tempRotationY = new Laya.Quaternion();
        _this.rotaionSpeed = 0.00006;
        return _this;
    }
    CameraMoveScript.prototype.onAwake = function () {
        Laya.stage.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.RIGHT_MOUSE_UP, this, this.mouseUp);
        this.camera = this.owner;
    };
    CameraMoveScript.prototype._onDestroy = function () {
        //关闭监听函数
        Laya.stage.off(Laya.Event.RIGHT_MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.off(Laya.Event.RIGHT_MOUSE_UP, this, this.mouseUp);
    };
    CameraMoveScript.prototype.onUpdate = function () {
        var elapsedTime = Laya.timer.delta;
        if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY) && this.isMouseDown) {
            var scene = this.owner.scene;
            Laya.KeyBoardManager.hasKeyDown(87) && this.moveForward(-0.01 * elapsedTime); //W
            Laya.KeyBoardManager.hasKeyDown(83) && this.moveForward(0.01 * elapsedTime); //S
            Laya.KeyBoardManager.hasKeyDown(65) && this.moveRight(-0.01 * elapsedTime); //A
            Laya.KeyBoardManager.hasKeyDown(68) && this.moveRight(0.01 * elapsedTime); //D
            Laya.KeyBoardManager.hasKeyDown(81) && this.moveVertical(0.01 * elapsedTime); //Q
            Laya.KeyBoardManager.hasKeyDown(69) && this.moveVertical(-0.01 * elapsedTime); //E
            var offsetX = Laya.stage.mouseX - this.lastMouseX;
            var offsetY = Laya.stage.mouseY - this.lastMouseY;
            var yprElem = this.yawPitchRoll;
            yprElem.x -= offsetX * this.rotaionSpeed * elapsedTime;
            yprElem.y -= offsetY * this.rotaionSpeed * elapsedTime;
            this.updateRotation();
            // if (Laya.timer.currFrame % 30 == 0) {
            //     console.log("Camera Transform: ", this.camera.transform.position, this.camera.transform.localRotation);
            // }
        }
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
    };
    CameraMoveScript.prototype.mouseDown = function (e) {
        //获得鼠标的旋转值
        this.camera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll);
        //获得鼠标的xy值
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
        //设置bool值
        this.isMouseDown = true;
    };
    CameraMoveScript.prototype.mouseUp = function (e) {
        //设置bool值
        this.isMouseDown = false;
    };
    /**
     * 向前移动。
     */
    CameraMoveScript.prototype.moveForward = function (distance) {
        this._tempVector3.x = 0;
        this._tempVector3.y = 0;
        this._tempVector3.z = distance;
        this.camera.transform.translate(this._tempVector3);
    };
    /**
     * 向右移动。
     */
    CameraMoveScript.prototype.moveRight = function (distance) {
        this._tempVector3.y = 0;
        this._tempVector3.z = 0;
        this._tempVector3.x = distance;
        this.camera.transform.translate(this._tempVector3);
    };
    /**
     * 向上移动。
     */
    CameraMoveScript.prototype.moveVertical = function (distance) {
        this._tempVector3.x = this._tempVector3.z = 0;
        this._tempVector3.y = distance;
        this.camera.transform.translate(this._tempVector3, false);
    };
    CameraMoveScript.prototype.updateRotation = function () {
        if (Math.abs(this.yawPitchRoll.y) < 1.50) {
            Laya.Quaternion.createFromYawPitchRoll(this.yawPitchRoll.x, this.yawPitchRoll.y, this.yawPitchRoll.z, this.tempRotationZ);
            this.tempRotationZ.cloneTo(this.camera.transform.localRotation);
            this.camera.transform.localRotation = this.camera.transform.localRotation;
        }
    };
    return CameraMoveScript;
}(Laya.Script3D));
exports.default = CameraMoveScript;
},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhysicTrigger3d = /** @class */ (function (_super) {
    __extends(PhysicTrigger3d, _super);
    function PhysicTrigger3d() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhysicTrigger3d.GetTrigger = function (node) {
        var trigger = node.getComponent(PhysicTrigger3d);
        if (trigger == null) {
            trigger = node.addComponent(PhysicTrigger3d);
        }
        return trigger;
    };
    PhysicTrigger3d.prototype.OnTriggerEnter = function (caller, callBack) {
        if (callBack) {
            this.owner.on(PhysicTrigger3d.triggerenter, caller, callBack);
        }
    };
    PhysicTrigger3d.prototype.OnTriggerExit = function (caller, callBack) {
        if (callBack) {
            this.owner.on(PhysicTrigger3d.triggerexit, caller, callBack);
        }
    };
    PhysicTrigger3d.prototype.OnTriggerStay = function (caller, callBack) {
        if (callBack) {
            this.owner.on(PhysicTrigger3d.triggerstay, caller, callBack);
        }
    };
    PhysicTrigger3d.prototype.OnCollisionStay = function (caller, callBack) {
        if (callBack) {
            this.owner.on(PhysicTrigger3d.collisionStay, caller, callBack);
        }
    };
    PhysicTrigger3d.prototype.onEnable = function () {
    };
    PhysicTrigger3d.prototype.onDisable = function () {
        this.owner.offAll(PhysicTrigger3d.triggerenter);
        this.owner.offAll(PhysicTrigger3d.triggerstay);
        this.owner.offAll(PhysicTrigger3d.triggerexit);
    };
    PhysicTrigger3d.prototype.onTriggerEnter = function (other) {
        this.owner.event(PhysicTrigger3d.triggerenter, [this.owner, other]);
    };
    PhysicTrigger3d.prototype.onTriggerExit = function (other) {
        this.owner.event(PhysicTrigger3d.triggerexit, [this.owner, other]);
    };
    PhysicTrigger3d.prototype.onTriggerStay = function (other) {
        this.owner.event(PhysicTrigger3d.triggerstay, [this.owner, other]);
    };
    PhysicTrigger3d.prototype.onCollisionStay = function (collision) {
        this.owner.event(PhysicTrigger3d.collisionStay, [this.owner, collision]);
    };
    PhysicTrigger3d.triggerenter = "triggerenter3d";
    PhysicTrigger3d.triggerstay = "triggerstay3d";
    PhysicTrigger3d.triggerexit = "triggerexit3d";
    PhysicTrigger3d.collisionStay = "CollisionStay";
    return PhysicTrigger3d;
}(Laya.Script3D));
exports.default = PhysicTrigger3d;
},{}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ComBase_1 = require("./KRQ_ComBase");
var WXAPI_1 = require("../../WXAPI");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var ShareAd_1 = require("../../ShareAd/ShareAd");
var QQMiniGameAPI_1 = require("../../QQMiniGameAPI");
var WudianMgr_1 = require("../../Mgr/WudianMgr");
var KRQ_ppxhc_Banner = /** @class */ (function (_super) {
    __extends(KRQ_ppxhc_Banner, _super);
    function KRQ_ppxhc_Banner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._wxBanner_ppxhc_ = null;
        _this._onLoad_ppxhc_ = null;
        _this._onError_ppxhc_ = null;
        _this._onResize_ppxhc_ = null;
        _this._isCreating_ppxhc_ = false;
        _this._isDestroyed_ppxhc_ = false;
        _this._isHide_ppxhc_ = false;
        return _this;
    }
    Object.defineProperty(KRQ_ppxhc_Banner.prototype, "Clip", {
        get: function () {
            return this.owner;
        },
        enumerable: true,
        configurable: true
    });
    KRQ_ppxhc_Banner.prototype.onAwake = function () {
        this.AdPos_ppxhc_ID = ShareAd_1.default.BannerAdLocationID_;
    };
    KRQ_ppxhc_Banner.prototype.onStart = function () {
        this.refresh();
    };
    KRQ_ppxhc_Banner.prototype.onEnable = function () {
        this.Sprite.on(Laya.Event.CLICK, this, this.onClickAd);
    };
    KRQ_ppxhc_Banner.prototype.onDisable = function () {
        this.Sprite.off(Laya.Event.CLICK, this, this.onClickAd);
    };
    KRQ_ppxhc_Banner.prototype.onClickAd = function () {
        this.navigateToMiniProgram_ppxhc();
    };
    KRQ_ppxhc_Banner.prototype.refresh = function (onComplate) {
        if (this._isDestroyed_ppxhc_)
            return;
        var banner = AppSwitchConfig_1.default.getInstance().getAppSwitchData().banner;
        if (1 == banner) {
            this.refreshWXBanner();
            if (Laya.Browser.onQQMiniGame && WudianMgr_1.default.GetIp_ppxhc_Blocked()) {
                var launchScene = QQMiniGameAPI_1.default.getLaunchOptionsSync().scene;
                var noEnterBySearch = true;
                var wudianSceneList = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudianSceneList;
                for (var i = 0; i < wudianSceneList.length; ++i) {
                    var wudianSceneValue = wudianSceneList[i];
                    if (launchScene == wudianSceneValue) {
                        noEnterBySearch = false;
                    }
                }
                if (noEnterBySearch) {
                    var bannerRecreateTime = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerRecreateTime;
                    Laya.timer.loop(bannerRecreateTime * 1000, this, this.refreshWXBanner);
                }
            }
        }
        else {
            this.refreshBanner();
            if (Laya.Browser.onQQMiniGame && WudianMgr_1.default.GetIp_ppxhc_Blocked()) {
                var launchScene = QQMiniGameAPI_1.default.getLaunchOptionsSync().scene;
                var noEnterBySearch = true;
                var wudianSceneList = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudianSceneList;
                for (var i = 0; i < wudianSceneList.length; ++i) {
                    var wudianSceneValue = wudianSceneList[i];
                    if (launchScene == wudianSceneValue) {
                        noEnterBySearch = false;
                    }
                }
                if (noEnterBySearch) {
                    var bannerRecreateTime = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerRecreateTime;
                    Laya.timer.loop(bannerRecreateTime * 1000, this, this.refreshWXBanner);
                }
            }
        }
    };
    KRQ_ppxhc_Banner.prototype.refreshBanner = function () {
        var _this = this;
        if (null == this.Sprite || !this.Sprite.visible)
            return;
        if (this._isCreating_ppxhc_ || this._isDestroyed_ppxhc_)
            return;
        this._isCreating_ppxhc_ = true;
        _super.prototype.refresh_ppxhc.call(this, function () {
            if (null != _this._data) {
                var self_1 = _this;
                _this.Sprite.loadImage(_this._data.logo, Laya.Handler.create(_this, function () {
                    if (null != self_1.Sprite && !self_1.Sprite.destroyed) {
                        self_1.Sprite.width = 600;
                        self_1.Sprite.height = 205;
                    }
                }));
            }
            _this._isCreating_ppxhc_ = false;
        });
    };
    KRQ_ppxhc_Banner.prototype.refreshWXBanner = function () {
        if ((!Laya.Browser.onMiniGame && !Laya.Browser.onQQMiniGame) || null == this.Sprite || this.Sprite.destroyed || !this.Sprite.visible) {
            Laya.timer.clearAll(this);
            this.clearWXBaner();
            return;
        }
        if (this._isCreating_ppxhc_ || this._isDestroyed_ppxhc_ || this._isHide_ppxhc_)
            return;
        this.clearWXBaner();
        var self = this;
        var sysInfo = null;
        if (Laya.Browser.onMiniGame) {
            sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        }
        else if (Laya.Browser.onQQMiniGame) {
            sysInfo = Laya.Browser.window["qq"].getSystemInfoSync();
        }
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this.Sprite.localToGlobal(new Laya.Point(0, 0));
        var width = 300;
        var scale = self.Sprite.width / Laya.stage.width;
        var realWidth = sw * scale;
        var offset = (realWidth - width) / 2;
        var left = pos.x / Laya.stage.width * sw + offset;
        var top = pos.y / Laya.stage.height * sh;
        if (Laya.Browser.onMiniGame) {
            self._isCreating_ppxhc_ = true;
            var recreateBannerIDList = AppSwitchConfig_1.default.getInstance().getAppSwitchData().recreateBannerIDList;
            var bannerAdUnitId_1 = recreateBannerIDList[Math.floor(Math.random() * recreateBannerIDList.length)];
            if (null == bannerAdUnitId_1) {
                bannerAdUnitId_1 = WXAPI_1.default.bannerAdUnitId;
            }
            this._wxBanner_ppxhc_ = Laya.Browser.window["wx"].createBannerAd({
                adUnitId: bannerAdUnitId_1,
                adIntervals: 30,
                style: {
                    left: left,
                    top: top,
                    width: width,
                }
            });
            if (null != self._wxBanner_ppxhc_) {
                self._wxBanner_ppxhc_.onLoad(function (res) {
                    console.log("KRQ  WXBanner广告 加载完成 : ", bannerAdUnitId_1);
                    console.log(res);
                    self._isCreating_ppxhc_ = false;
                    if (self._isDestroyed_ppxhc_ || null == self._wxBanner_ppxhc_ || self._isHide_ppxhc_) {
                        self.clearWXBaner();
                        return;
                    }
                    self._wxBanner_ppxhc_.show();
                });
                self._wxBanner_ppxhc_.onError(function (err) {
                    console.log("KRQ WXBanner广告 加载失败 : ", bannerAdUnitId_1);
                    console.log(err);
                    self._isCreating_ppxhc_ = false;
                    self.clearWXBaner();
                    if (self._isDestroyed_ppxhc_ || self._isHide_ppxhc_) {
                        return;
                    }
                    self.refreshBanner();
                });
                self._wxBanner_ppxhc_.onResize(function (res) {
                });
            }
            else {
                self.refreshBanner();
            }
        }
        else if (Laya.Browser.onQQMiniGame) {
            self._isCreating_ppxhc_ = true;
            var recreateBannerIDList = AppSwitchConfig_1.default.getInstance().getAppSwitchData().recreateBannerIDList;
            var bannerAdUnitId_2 = recreateBannerIDList[Math.floor(Math.random() * recreateBannerIDList.length)];
            if (null == bannerAdUnitId_2) {
                bannerAdUnitId_2 = QQMiniGameAPI_1.default.bannerAdUnitId;
            }
            self._wxBanner_ppxhc_ = Laya.Browser.window["qq"].createBannerAd({
                adUnitId: bannerAdUnitId_2,
                adIntervals: 30,
                style: {
                    left: left,
                    top: top,
                    width: width,
                }
            });
            if (null != self._wxBanner_ppxhc_) {
                self._onLoad_ppxhc_ = function (res) {
                    console.log("KRQ QQBanner广告 加载完成 : ", bannerAdUnitId_2);
                    console.log(res);
                    self._isCreating_ppxhc_ = false;
                    if (self._isDestroyed_ppxhc_ || null == self._wxBanner_ppxhc_ || self._isHide_ppxhc_) {
                        self.clearWXBaner();
                        return;
                    }
                    self._wxBanner_ppxhc_.show();
                };
                self._wxBanner_ppxhc_.onLoad(self._onLoad_ppxhc_);
                self._onError_ppxhc_ = function (err) {
                    console.log("KRQ QQBanner广告 加载失败 : ", bannerAdUnitId_2);
                    console.log(err);
                    self._isCreating_ppxhc_ = false;
                    self.clearWXBaner();
                    if (self._isDestroyed_ppxhc_ || null == self._wxBanner_ppxhc_ || self._isHide_ppxhc_) {
                        return;
                    }
                    self.refreshBanner();
                };
                self._wxBanner_ppxhc_.onError(self._onError_ppxhc_);
                self._onResize_ppxhc_ = function (res) {
                };
                self._wxBanner_ppxhc_.onResize(self._onResize_ppxhc_);
            }
            else {
                self.refreshBanner();
            }
        }
    };
    KRQ_ppxhc_Banner.prototype.clearWXBaner = function () {
        if (this._wxBanner_ppxhc_) {
            this._wxBanner_ppxhc_.hide();
            this._wxBanner_ppxhc_.offLoad(this._onLoad_ppxhc_);
            this._wxBanner_ppxhc_.offError(this._onError_ppxhc_);
            this._wxBanner_ppxhc_.offResize(this._onResize_ppxhc_);
            this._wxBanner_ppxhc_.destroy();
        }
        this._wxBanner_ppxhc_ = null;
    };
    KRQ_ppxhc_Banner.prototype.onViewShow = function () {
        this._isHide_ppxhc_ = false;
        var banner = AppSwitchConfig_1.default.getInstance().getAppSwitchData().banner;
        if (1 == banner) {
            if (null == this._wxBanner_ppxhc_) {
                this.refreshWXBanner();
                if (Laya.Browser.onQQMiniGame && WudianMgr_1.default.GetIp_ppxhc_Blocked()) {
                    var launchScene = QQMiniGameAPI_1.default.getLaunchOptionsSync().scene;
                    var noEnterBySearch = true;
                    var wudianSceneList = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudianSceneList;
                    for (var i = 0; i < wudianSceneList.length; ++i) {
                        var wudianSceneValue = wudianSceneList[i];
                        if (launchScene == wudianSceneValue) {
                            noEnterBySearch = false;
                        }
                    }
                    if (noEnterBySearch) {
                        var bannerRecreateTime = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerRecreateTime;
                        Laya.timer.loop(bannerRecreateTime * 1000, this, this.refreshWXBanner);
                    }
                }
            }
        }
        else {
            this.refreshBanner();
            if (Laya.Browser.onQQMiniGame && WudianMgr_1.default.GetIp_ppxhc_Blocked()) {
                var launchScene = QQMiniGameAPI_1.default.getLaunchOptionsSync().scene;
                var noEnterBySearch = true;
                var wudianSceneList = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudianSceneList;
                for (var i = 0; i < wudianSceneList.length; ++i) {
                    var wudianSceneValue = wudianSceneList[i];
                    if (launchScene == wudianSceneValue) {
                        noEnterBySearch = false;
                    }
                }
                if (noEnterBySearch) {
                    var bannerRecreateTime = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerRecreateTime;
                    Laya.timer.loop(bannerRecreateTime * 1000, this, this.refreshWXBanner);
                }
            }
        }
    };
    KRQ_ppxhc_Banner.prototype.onViewHide = function () {
        this.clearWXBaner();
        Laya.timer.clearAll(this);
        this._isHide_ppxhc_ = true;
    };
    KRQ_ppxhc_Banner.prototype.onDestroy = function () {
        this.clearWXBaner();
        Laya.timer.clearAll(this);
        this._isDestroyed_ppxhc_ = true;
    };
    KRQ_ppxhc_Banner.prototype.show = function () {
        _super.prototype.show.call(this);
        this.onViewShow();
    };
    KRQ_ppxhc_Banner.prototype.hide = function () {
        _super.prototype.hide.call(this);
        this.onViewHide();
    };
    return KRQ_ppxhc_Banner;
}(KRQ_ComBase_1.default));
exports.default = KRQ_ppxhc_Banner;
},{"../../Config/AppSwitchConfig":5,"../../Mgr/WudianMgr":71,"../../QQMiniGameAPI":78,"../../ShareAd/ShareAd":79,"../../WXAPI":133,"./KRQ_ComBase":48}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WXAPI_1 = require("../../WXAPI");
var ShareAd_1 = require("../../ShareAd/ShareAd");
var ALD_1 = require("../../ALD");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var OPPOAPI_1 = require("../../OPPOAPI");
var QQMiniGameAPI_1 = require("../../QQMiniGameAPI");
var TTAPI_1 = require("../../TTAPI");
var AppConfig_1 = require("../../AppConfig");
var ShareAd_2 = require("../../ShareAd/ShareAd");
var VIVOAPI_1 = require("../../VIVOAPI");
var KRQ_ppxhc_ComBase = /** @class */ (function (_super) {
    __extends(KRQ_ppxhc_ComBase, _super);
    function KRQ_ppxhc_ComBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.AdPos_ppxhc_ID = 315;
        _this._datas = [];
        _this._data = null;
        return _this;
    }
    Object.defineProperty(KRQ_ppxhc_ComBase.prototype, "Sprite", {
        get: function () {
            return this.owner;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KRQ_ppxhc_ComBase.prototype, "Data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    KRQ_ppxhc_ComBase.prototype.refresh_ppxhc = function (onComplate) {
        var self = this;
        ShareAd_1.default.getADVs_(this.AdPos_ppxhc_ID, function (datas) {
            if (null != datas) {
                self._datas = datas;
                self._data = self._datas[Math.floor(Math.random() * datas.length)];
                if (null != onComplate) {
                    onComplate();
                }
            }
        }, false);
    };
    KRQ_ppxhc_ComBase.prototype.navigateToMiniProgram_ppxhc = function (d) {
        var data = null == d ? this._data : d;
        if (data) {
            console.log("跳转游戏： " + data.title);
            if (Laya.Browser.onMiniGame) {
                WXAPI_1.default.navigateToMiniProgram_(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick_(data.appid);
                    ALD_1.default.aldSendReportAdClickSuccess(data);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_OnShareAdFail);
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
                    ShareAd_1.default.reportUserClick_(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
             {
                QQMiniGameAPI_1.default.navigateToMiniProgram_ppxhc(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick_(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onVVMiniGame) {
                VIVOAPI_1.default.navigateToMiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_2.default.reportUserClick_(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (AppConfig_1.default.onTTMiniGame_ppxhc_) {
                TTAPI_1.default.showMoreGamesModal(function () {
                    console.log("跳转成功");
                    ShareAd_2.default.reportUserClick_(data.appid);
                }, function () {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_OnShareAdFail);
                });
            }
        }
    };
    KRQ_ppxhc_ComBase.prototype.show = function () {
        this.Sprite.visible = true;
    };
    KRQ_ppxhc_ComBase.prototype.hide = function () {
        this.Sprite.visible = false;
    };
    KRQ_ppxhc_ComBase.prototype.autoScroll_ppxhc_Text = function (text) {
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
    return KRQ_ppxhc_ComBase;
}(Laya.Script));
exports.default = KRQ_ppxhc_ComBase;
},{"../../ALD":1,"../../AppConfig":2,"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../OPPOAPI":77,"../../QQMiniGameAPI":78,"../../ShareAd/ShareAd":79,"../../TTAPI":83,"../../VIVOAPI":86,"../../WXAPI":133}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_Banner_1 = require("./KRQ_Banner");
var WXAPI_1 = require("../../WXAPI");
var QQMiniGameAPI_1 = require("../../QQMiniGameAPI");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var WudianMgr_1 = require("../../Mgr/WudianMgr");
var KRQ_GamingBanner = /** @class */ (function (_super) {
    __extends(KRQ_GamingBanner, _super);
    function KRQ_GamingBanner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KRQ_GamingBanner.prototype.refresh = function (onComplate) {
        var _this = this;
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
        var ipBlocked = WudianMgr_1.default.GetIp_ppxhc_Blocked();
        if (!ipBlocked || !noEnterBySearch) {
            this.Sprite.visible = false;
            if (null != onComplate) {
                onComplate();
            }
            return;
        }
        var banner = AppSwitchConfig_1.default.getInstance().getAppSwitchData().banner;
        if (1 == banner) {
            this.refreshWXBanner();
        }
        else {
            _super.prototype.refresh_ppxhc.call(this, function () {
                _this.refreshBanner();
                if (null != onComplate) {
                    onComplate();
                }
            });
        }
    };
    return KRQ_GamingBanner;
}(KRQ_Banner_1.default));
exports.default = KRQ_GamingBanner;
},{"../../Config/AppSwitchConfig":5,"../../Mgr/WudianMgr":71,"../../QQMiniGameAPI":78,"../../WXAPI":133,"./KRQ_Banner":47}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_HistoryBox_1 = require("./KRQ_HistoryBox");
var KRQ_ComBase_1 = require("../KRQ_ComBase");
var ShareAd_1 = require("../../../ShareAd/ShareAd");
var KRQ_ppxhc_History = /** @class */ (function (_super) {
    __extends(KRQ_ppxhc_History, _super);
    function KRQ_ppxhc_History() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.OnBackBtn_ppxhc_Click = null;
        _this._top_ppxhc_Zone = null;
        _this._back_ppxhc_Btn = null;
        _this._start_ppxhc_List = new Array();
        return _this;
    }
    KRQ_ppxhc_History.prototype.onAwake = function () {
        this.AdPos_ppxhc_ID = ShareAd_1.default.HistoryLocationID_;
        this._top_ppxhc_Zone = this.Sprite.getChildByName("TopZone");
        this._back_ppxhc_Btn = this._top_ppxhc_Zone.getChildByName("BackBtn");
        this._list = this.Sprite.getChildByName("List");
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._list.vScrollBarSkin = "";
    };
    KRQ_ppxhc_History.prototype.onStart = function () {
        this.refresh_ppxhc();
    };
    KRQ_ppxhc_History.prototype.onEnable = function () {
        this._back_ppxhc_Btn.on(Laya.Event.CLICK, this, this.onBackBtn);
    };
    KRQ_ppxhc_History.prototype.onDisable = function () {
        this._back_ppxhc_Btn.off(Laya.Event.CLICK, this, this.onBackBtn);
    };
    KRQ_ppxhc_History.prototype.refresh_ppxhc = function (onComplate) {
        var self = this;
        ShareAd_1.default.getADVs_(this.AdPos_ppxhc_ID, function (datas) {
            if (null != datas) {
                self._datas = datas;
                self._start_ppxhc_List.splice(0);
                for (var i = 0; i < self._datas.length; ++i) {
                    self._start_ppxhc_List.push(false);
                }
                var num = Math.floor(self._start_ppxhc_List.length * 0.33);
                while (num > 0) {
                    var index = Math.floor(Math.random() * self._start_ppxhc_List.length);
                    if (false == self._start_ppxhc_List[index]) {
                        self._start_ppxhc_List[index] = true;
                        --num;
                    }
                }
                self._list.array = self._datas;
            }
        }, false);
    };
    KRQ_ppxhc_History.prototype.onListRender = function (cell, index) {
        var data = this._list.array[index];
        var star = this._start_ppxhc_List[index];
        var historyBox = cell.getComponent(KRQ_HistoryBox_1.default);
        historyBox.setData(data, star);
    };
    KRQ_ppxhc_History.prototype.onBackBtn = function () {
        this.hide();
        if (null != this.OnBackBtn_ppxhc_Click) {
            this.OnBackBtn_ppxhc_Click();
        }
    };
    KRQ_ppxhc_History.prototype.show = function () {
        _super.prototype.show.call(this);
        this.refresh_ppxhc();
    };
    return KRQ_ppxhc_History;
}(KRQ_ComBase_1.default));
exports.default = KRQ_ppxhc_History;
},{"../../../ShareAd/ShareAd":79,"../KRQ_ComBase":48,"./KRQ_HistoryBox":51}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ComBase_1 = require("../../Com/KRQ_ComBase");
var KRQ_ppxhc__HistoryBox = /** @class */ (function (_super) {
    __extends(KRQ_ppxhc__HistoryBox, _super);
    function KRQ_ppxhc__HistoryBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ppxhc_icon = null;
        _this._ppxhc_text = null;
        _this._ppxhc_mark = null;
        return _this;
    }
    KRQ_ppxhc__HistoryBox.prototype.onAwake = function () {
        this._ppxhc_icon = this.Sprite.getChildByName("Icon");
        this._ppxhc_text = this.Sprite.getChildByName("Text");
        this._ppxhc_text.overflow = Laya.Text.SCROLL;
        this._ppxhc_text.text = "";
        this._ppxhc_mark = this.Sprite.getChildByName("Mark");
        this._ppxhc_mark.visible = false;
    };
    KRQ_ppxhc__HistoryBox.prototype.onStart = function () {
        this.autoScroll_ppxhc_Text(this._ppxhc_text);
    };
    KRQ_ppxhc__HistoryBox.prototype.onEnable = function () {
        this.Sprite.on(Laya.Event.CLICK, this, this.onClickAd);
    };
    KRQ_ppxhc__HistoryBox.prototype.onDisable = function () {
        this.Sprite.off(Laya.Event.CLICK, this, this.onClickAd);
    };
    KRQ_ppxhc__HistoryBox.prototype.onClickAd = function () {
        this.navigateToMiniProgram_ppxhc();
    };
    KRQ_ppxhc__HistoryBox.prototype.setData = function (data, star) {
        this._data = data;
        if (null != this._data) {
            var self = this;
            this._ppxhc_icon.loadImage(this._data.logo, Laya.Handler.create(this, function () {
                if (!self._ppxhc_icon.destroyed) {
                    self._ppxhc_icon.width = 100;
                    self._ppxhc_icon.height = 100;
                }
            }));
            var str = String(this._data.title);
            this._ppxhc_text.text = str;
            this._ppxhc_mark.visible = star;
        }
    };
    return KRQ_ppxhc__HistoryBox;
}(KRQ_ComBase_1.default));
exports.default = KRQ_ppxhc__HistoryBox;
},{"../../Com/KRQ_ComBase":48}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ComBase_1 = require("../KRQ_ComBase");
var KRQ_LoopAdBox_1 = require("./KRQ_LoopAdBox");
var ShareAd_1 = require("../../../ShareAd/ShareAd");
var KRQ_ppxhc_HLoopAd = /** @class */ (function (_super) {
    __extends(KRQ_ppxhc_HLoopAd, _super);
    function KRQ_ppxhc_HLoopAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isEnable = true;
        _this.useMovePause = true;
        _this.useLocalRandom = true;
        _this.useRandom = true;
        _this.sortDatas = null;
        _this._scroll_ppxhc_Forward = true;
        _this._cell_ppxhc_Size = new Laya.Point();
        return _this;
    }
    Object.defineProperty(KRQ_ppxhc_HLoopAd.prototype, "Clip", {
        get: function () {
            return this.owner;
        },
        enumerable: true,
        configurable: true
    });
    KRQ_ppxhc_HLoopAd.prototype.onAwake = function () {
        this.AdPos_ppxhc_ID = ShareAd_1.default.LoopAdLocationID_;
        this._ppxhc_list = this.owner.getChildByName("List");
        this._ppxhc_list.renderHandler = Laya.Handler.create(this, this.onList_ppxhc_Render, null, false);
        this._ppxhc_list.hScrollBarSkin = "";
    };
    KRQ_ppxhc_HLoopAd.prototype.onStart = function () {
        var self = this;
        this._ppxhc_list.width = self.Clip.width;
        this._ppxhc_list.height = self.Clip.height;
        self.refresh_ppxhc(function () {
            if (null != self._ppxhc_list.cells && self._ppxhc_list.cells.length > 0) {
                var box = self._ppxhc_list.cells[0];
                self._cell_ppxhc_Size.x = box.width;
                self._cell_ppxhc_Size.y = box.height;
                if (self.useMovePause) {
                    setTimeout(function () {
                        if (self._ppxhc_list.scrollBar) {
                            self._ppxhc_list.scrollBar.value = 0;
                            self.move();
                        }
                    }, 2000);
                }
            }
        });
    };
    KRQ_ppxhc_HLoopAd.prototype.refresh_ppxhc = function (onComplate) {
        if (!this.isEnable) {
            if (null != onComplate) {
                onComplate();
            }
            return;
        }
        var self = this;
        console.log("-------------------- this.AdPosID:", this.AdPos_ppxhc_ID);
        ShareAd_1.default.getADVs_(this.AdPos_ppxhc_ID, function (datas) {
            if (null != datas && datas.length > 0) {
                console.log("-------------------- datas:", datas);
                self._datas = datas;
                self._ppxhc_list.array = self._datas;
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
    KRQ_ppxhc_HLoopAd.prototype.onList_ppxhc_Render = function (cell, index) {
        var data = this._ppxhc_list.array[index];
        var loopAdBox = cell.getComponent(KRQ_LoopAdBox_1.default);
        loopAdBox.set_ppxhc_Data(data);
    };
    KRQ_ppxhc_HLoopAd.prototype.move = function () {
        var tonum = this._cell_ppxhc_Size.x + this._ppxhc_list.spaceX;
        var left = 0;
        if (!this._scroll_ppxhc_Forward) {
            tonum *= -1;
            left = (this._ppxhc_list.scrollBar.max - this._ppxhc_list.scrollBar.value) % tonum * -1;
        }
        else {
            left = this._ppxhc_list.scrollBar.value % tonum;
        }
        if (this._ppxhc_list.scrollBar) {
            this._ppxhc_list.scrollBar.stopScroll();
            var scrollDelta = tonum;
            if (0 != left) {
                scrollDelta = 2 * tonum - left;
            }
            var self_1 = this;
            Laya.Tween.to(self_1._ppxhc_list.scrollBar, { value: self_1._ppxhc_list.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self_1, function () {
            }));
            Laya.timer.once(1010, self_1, function () {
                if (self_1._ppxhc_list.scrollBar.value >= self_1._ppxhc_list.scrollBar.max) {
                    self_1._scroll_ppxhc_Forward = false;
                }
                else if (self_1._ppxhc_list.scrollBar.value <= 0) {
                    self_1._scroll_ppxhc_Forward = true;
                }
                Laya.timer.once(3000, self_1, function () {
                    if (self_1._ppxhc_list.scrollBar) {
                        self_1.move();
                    }
                });
            });
        }
    };
    KRQ_ppxhc_HLoopAd.prototype.onUpdate = function () {
        if (this.useMovePause)
            return;
        if (this._scroll_ppxhc_Forward) {
            this._ppxhc_list.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this._ppxhc_list.scrollBar.value >= this._ppxhc_list.scrollBar.max) {
                this._scroll_ppxhc_Forward = false;
            }
        }
        else {
            this._ppxhc_list.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this._ppxhc_list.scrollBar.value <= 0) {
                this._scroll_ppxhc_Forward = true;
            }
        }
    };
    return KRQ_ppxhc_HLoopAd;
}(KRQ_ComBase_1.default));
exports.default = KRQ_ppxhc_HLoopAd;
},{"../../../ShareAd/ShareAd":79,"../KRQ_ComBase":48,"./KRQ_LoopAdBox":53}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ComBase_1 = require("../KRQ_ComBase");
var KRQ_ppxhc_LoopAdBox = /** @class */ (function (_super) {
    __extends(KRQ_ppxhc_LoopAdBox, _super);
    function KRQ_ppxhc_LoopAdBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._origin_ppxhc_W = 170;
        _this._origin_ppxhc_H = 170;
        return _this;
    }
    KRQ_ppxhc_LoopAdBox.prototype.onAwake = function () {
        this._display_ppxhc_Sp = this.owner.getChildByName("Display");
        this._origin_ppxhc_W = this._display_ppxhc_Sp.width;
        this._origin_ppxhc_H = this._display_ppxhc_Sp.height;
        this._dis_ppxhc_Text = this.owner.getChildByName("TitelText");
        this._dis_ppxhc_Text.overflow = Laya.Text.SCROLL;
        this._dis_ppxhc_Text.text = "";
    };
    KRQ_ppxhc_LoopAdBox.prototype.onStart = function () {
        this.autoScroll_ppxhc_Text(this._dis_ppxhc_Text);
    };
    KRQ_ppxhc_LoopAdBox.prototype.onEnable = function () {
        this.Sprite.on(Laya.Event.CLICK, this, this.onClick_ppxhc_Ad);
    };
    KRQ_ppxhc_LoopAdBox.prototype.onDisable = function () {
        this.Sprite.off(Laya.Event.CLICK, this, this.onClick_ppxhc_Ad);
    };
    KRQ_ppxhc_LoopAdBox.prototype.onClick_ppxhc_Ad = function () {
        this.navigateToMiniProgram_ppxhc();
    };
    KRQ_ppxhc_LoopAdBox.prototype.set_ppxhc_Data = function (data) {
        this._data = data;
        if (null != this._data) {
            var self_1 = this;
            this._display_ppxhc_Sp.loadImage(this._data.logo, Laya.Handler.create(this, function () {
                if (!self_1._display_ppxhc_Sp.destroyed) {
                    self_1._display_ppxhc_Sp.width = self_1._origin_ppxhc_W;
                    self_1._display_ppxhc_Sp.height = self_1._origin_ppxhc_H;
                }
            }));
            var str = String(this._data.title);
            this._dis_ppxhc_Text.text = str;
        }
    };
    return KRQ_ppxhc_LoopAdBox;
}(KRQ_ComBase_1.default));
exports.default = KRQ_ppxhc_LoopAdBox;
},{"../KRQ_ComBase":48}],54:[function(require,module,exports){
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
        this.AdPos_ppxhc_ID = ShareAd_1.default.LoopAdLocationID_;
        this._ppxhc_list = this.owner.getChildByName("List");
        this._ppxhc_list.renderHandler = Laya.Handler.create(this, this.onList_ppxhc_Render, null, false);
        this._ppxhc_list.vScrollBarSkin = "";
    };
    KRQ_VLoopAd.prototype.move = function () {
        var tonum = this._cell_ppxhc_Size.y + this._ppxhc_list.spaceY;
        var left = 0;
        if (!this._scroll_ppxhc_Forward) {
            tonum *= -1;
            left = (this._ppxhc_list.scrollBar.max - this._ppxhc_list.scrollBar.value) % tonum * -1;
        }
        else {
            left = this._ppxhc_list.scrollBar.value % tonum;
        }
        if (this._ppxhc_list.scrollBar) {
            this._ppxhc_list.scrollBar.stopScroll();
            var scrollDelta = tonum;
            if (0 != left) {
                scrollDelta = 2 * tonum - left;
            }
            var self_1 = this;
            Laya.Tween.to(self_1._ppxhc_list.scrollBar, { value: self_1._ppxhc_list.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self_1, function () {
            }));
            Laya.timer.once(1010, self_1, function () {
                if (self_1._ppxhc_list.scrollBar.value >= self_1._ppxhc_list.scrollBar.max) {
                    self_1._scroll_ppxhc_Forward = false;
                }
                else if (self_1._ppxhc_list.scrollBar.value <= 0) {
                    self_1._scroll_ppxhc_Forward = true;
                }
                Laya.timer.once(3000, self_1, function () {
                    if (self_1._ppxhc_list.scrollBar) {
                        self_1.move();
                    }
                });
            });
        }
    };
    return KRQ_VLoopAd;
}(KRQ_HLoopAd_1.default));
exports.default = KRQ_VLoopAd;
},{"../../../ShareAd/ShareAd":79,"./KRQ_HLoopAd":52}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_SingleAd_1 = require("./KRQ_SingleAd");
var KRQ_ppxhc_RockSingleAd = /** @class */ (function (_super) {
    __extends(KRQ_ppxhc_RockSingleAd, _super);
    function KRQ_ppxhc_RockSingleAd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KRQ_ppxhc_RockSingleAd.prototype.play_ppxhc_Ani = function (onComplate) {
        var self = this;
        self.Sprite.rotation = 0;
        Laya.Tween.to(self.Sprite, {
            rotation: 20,
        }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, function () {
            Laya.Tween.to(self.Sprite, {
                rotation: 0,
            }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, function () {
                self.Sprite.rotation = 0;
                if (null != onComplate) {
                    onComplate();
                }
            }));
        }));
    };
    return KRQ_ppxhc_RockSingleAd;
}(KRQ_SingleAd_1.default));
exports.default = KRQ_ppxhc_RockSingleAd;
},{"./KRQ_SingleAd":57}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_SingleAd_1 = require("./KRQ_SingleAd");
var KRQ_ppxhc_RollSingleAd = /** @class */ (function (_super) {
    __extends(KRQ_ppxhc_RollSingleAd, _super);
    function KRQ_ppxhc_RollSingleAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._origin_ppxhc_X = null;
        return _this;
    }
    KRQ_ppxhc_RollSingleAd.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._origin_ppxhc_X = this.Sprite.x;
        this.Sprite.x -= Laya.stage.width;
    };
    KRQ_ppxhc_RollSingleAd.prototype.play_ppxhc_Ani = function (onComplate) {
        var _this = this;
        var cur = this._origin_ppxhc_X;
        var next = cur - Laya.stage.width;
        this.Sprite.x = next;
        Laya.Tween.to(this.Sprite, {
            rotation: 360,
        }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            _this.Sprite.rotation = 0;
        }));
        Laya.Tween.to(this.Sprite, {
            x: cur,
        }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            _this.Sprite.x = cur;
            if (null != onComplate) {
                onComplate();
            }
        }));
    };
    return KRQ_ppxhc_RollSingleAd;
}(KRQ_SingleAd_1.default));
exports.default = KRQ_ppxhc_RollSingleAd;
},{"./KRQ_SingleAd":57}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ComBase_1 = require("./KRQ_ComBase");
var ShareAd_1 = require("../../ShareAd/ShareAd");
var KRQ_SingleAd = /** @class */ (function (_super) {
    __extends(KRQ_SingleAd, _super);
    function KRQ_SingleAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._originW = 300;
        _this._originH = 300;
        return _this;
    }
    KRQ_SingleAd.prototype.onAwake = function () {
        this.AdPos_ppxhc_ID = ShareAd_1.default.LoopAdLocationID_;
        this._display = this.Sprite.getChildByName("Display");
        this._text = this.Sprite.getChildByName("Text");
        this._text.overflow = Laya.Text.SCROLL;
        this._text.text = "";
    };
    KRQ_SingleAd.prototype.onEnable = function () {
        this.Sprite.on(Laya.Event.CLICK, this, this.onClickAd);
    };
    KRQ_SingleAd.prototype.onDisable = function () {
        this.Sprite.off(Laya.Event.CLICK, this, this.onClickAd);
    };
    KRQ_SingleAd.prototype.onStart = function () {
        this.autoScroll_ppxhc_Text(this._text);
        this.refresh_ppxhc();
    };
    KRQ_SingleAd.prototype.refresh_ppxhc = function (onComplate) {
        var self = this;
        ShareAd_1.default.getADVs_(this.AdPos_ppxhc_ID, function (datas) {
            if (null != datas) {
                self._datas = datas;
                if (self.Sprite && !self.Sprite.destroyed) {
                    for (var i = 0; i < self._datas.length; ++i) {
                        var find = false;
                        var data = self._datas[i];
                        for (var j = 0; j < KRQ_SingleAd._repeatCheckList.length; ++j) {
                            var appid = KRQ_SingleAd._repeatCheckList[j];
                            if (appid == data.appid) {
                                find = true;
                                break;
                            }
                        }
                        if (!find) {
                            self.clearRepeat();
                            self._data = data;
                            break;
                        }
                    }
                    if (null == self._data) {
                        self._data = self._datas[Math.floor(Math.random() * datas.length)];
                    }
                    if (null != self._data) {
                        self._display.loadImage(self._data.logo, Laya.Handler.create(self, function () {
                            if (null != self.Sprite && !self.Sprite.destroy) {
                                self.Sprite.visible = true;
                                if (onComplate) {
                                    onComplate();
                                }
                            }
                        }));
                        var str = self._data.title;
                        self._text.text = str;
                        var isHas = false;
                        for (var j = 0; j < KRQ_SingleAd._repeatCheckList.length; ++j) {
                            var appid = KRQ_SingleAd._repeatCheckList[j];
                            if (appid == self._data.appid) {
                                isHas = true;
                                break;
                            }
                        }
                        if (!isHas) {
                            KRQ_SingleAd._repeatCheckList.push(self._data.appid);
                        }
                    }
                    else {
                        if (null != self.Sprite && !self.Sprite.destroy) {
                            self.Sprite.visible = false;
                        }
                        if (onComplate) {
                            onComplate();
                        }
                    }
                }
            }
            else {
                self.Sprite.visible = false;
                if (onComplate) {
                    onComplate();
                }
            }
        });
    };
    KRQ_SingleAd.prototype.hide = function () {
        this.Sprite.visible = false;
        this.clearRepeat();
    };
    KRQ_SingleAd.prototype.clearRepeat = function () {
        if (null != this._data) {
            for (var i = 0; i < KRQ_SingleAd._repeatCheckList.length; ++i) {
                var appid = KRQ_SingleAd._repeatCheckList[i];
                if (appid == this._data.appid) {
                    KRQ_SingleAd._repeatCheckList.splice(i, 1);
                    break;
                }
            }
        }
    };
    KRQ_SingleAd.prototype.onClickAd = function () {
        this.navigateToMiniProgram_ppxhc();
        this.refresh_ppxhc();
    };
    KRQ_SingleAd.prototype.onDestroy = function () {
        this.clearRepeat();
    };
    KRQ_SingleAd._repeatCheckList = new Array();
    return KRQ_SingleAd;
}(KRQ_ComBase_1.default));
exports.default = KRQ_SingleAd;
},{"../../ShareAd/ShareAd":79,"./KRQ_ComBase":48}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ViewComBase_1 = require("./KRQ_ViewComBase");
var Utilit_1 = require("../../Utilit");
var KRQ_History_1 = require("../Com/KRQ_History/KRQ_History");
var KRQ_Banner_1 = require("../Com/KRQ_Banner");
var KRQ_Export = /** @class */ (function (_super) {
    __extends(KRQ_Export, _super);
    function KRQ_Export() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onContinueBtnClick = null;
        _this._topZone = null;
        _this._backBtn = null;
        _this._centerZone = null;
        _this._continueBtn = null;
        _this._krqHistory = null;
        _this._krqBanner = null;
        return _this;
    }
    Object.defineProperty(KRQ_Export.prototype, "BackBtn", {
        get: function () {
            if (null == this._backBtn) {
                this._backBtn = this.Sprite.getChildByName("TopZone").getChildByName("BackBtn");
            }
            return this._backBtn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KRQ_Export.prototype, "ContinueBtn", {
        get: function () {
            if (null == this._continueBtn) {
                this._continueBtn = this.Sprite.getChildByName("CenterZone").getChildByName("ContinueBtn");
            }
            return this._continueBtn;
        },
        enumerable: true,
        configurable: true
    });
    KRQ_Export.prototype.onAwake = function () {
        this._topZone = this.Sprite.getChildByName("TopZone");
        if (Utilit_1.default.isIphoneX_()) {
            this._topZone.top = this._topZone.top + 75;
        }
        this._backBtn = this._topZone.getChildByName("BackBtn");
        this._centerZone = this.Sprite.getChildByName("CenterZone");
        if (Utilit_1.default.isIphoneX_()) {
            this._centerZone.top = this._centerZone.top + 75;
        }
        this._continueBtn = this._centerZone.getChildByName("ContinueBtn");
        this._krqHistory = this.owner.getChildByName("KRQ_History").getComponent(KRQ_History_1.default);
        this._krqBanner = this.owner.getChildByName("KRQ_Banner").getComponent(KRQ_Banner_1.default);
        var self = this;
        this._krqHistory.OnBackBtn_ppxhc_Click = function () {
            self._krqBanner.show();
        };
    };
    KRQ_Export.prototype.onEnable = function () {
        this._backBtn.on(Laya.Event.CLICK, this, this.onBackBtn);
        this._continueBtn.on(Laya.Event.CLICK, this, this.onContinueBtn);
    };
    KRQ_Export.prototype.onDisable = function () {
        this._backBtn.off(Laya.Event.CLICK, this, this.onBackBtn);
        this._continueBtn.off(Laya.Event.CLICK, this, this.onContinueBtn);
    };
    KRQ_Export.prototype.onBackBtn = function () {
        this._krqHistory.show();
        this._krqBanner.hide();
    };
    KRQ_Export.prototype.onContinueBtn = function () {
        if (null != this.onContinueBtnClick) {
            this.onContinueBtnClick();
        }
    };
    return KRQ_Export;
}(KRQ_ViewComBase_1.default));
exports.default = KRQ_Export;
},{"../../Utilit":85,"../Com/KRQ_Banner":47,"../Com/KRQ_History/KRQ_History":50,"./KRQ_ViewComBase":63}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ViewComBase_1 = require("./KRQ_ViewComBase");
var KRQ_RockSingleAd_1 = require("../Com/KRQ_RockSingleAd");
var KRQ_Floating = /** @class */ (function (_super) {
    __extends(KRQ_Floating, _super);
    function KRQ_Floating() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone = null;
        _this._rockSingleAds = new Array();
        _this._aniSpaceing = 3000;
        return _this;
    }
    KRQ_Floating.prototype.onAwake = function () {
        this._centerZone = this.Sprite.getChildByName("CenterZone");
        for (var i = 0; i < this._centerZone.numChildren; ++i) {
            var child = this._centerZone.getChildAt(i);
            if (child.visible) {
                var rockAd = child.getComponent(KRQ_RockSingleAd_1.default);
                this._rockSingleAds.push(rockAd);
            }
        }
    };
    KRQ_Floating.prototype.onStart = function () {
        var self = this;
        self.playAni();
        Laya.timer.loop(this._rockSingleAds.length * (this._aniSpaceing + 500), this, function () {
            self.playAni(function () {
                self.refreshAd();
            });
        });
    };
    KRQ_Floating.prototype.refreshAd = function () {
        for (var i = 0; i < this._rockSingleAds.length; ++i) {
            var ad = this._rockSingleAds[i];
            if (null == ad.Data) {
                ad.Sprite.visible = false;
            }
            ad.refresh_ppxhc();
        }
    };
    KRQ_Floating.prototype.playAni = function (onComplate) {
        var len = this._rockSingleAds.length;
        var _loop_1 = function (i) {
            var index = i;
            var ad = this_1._rockSingleAds[index];
            Laya.timer.once(this_1._aniSpaceing * i, ad, function () {
                if (index == len - 1) {
                    ad.play_ppxhc_Ani(onComplate);
                }
                else {
                    ad.play_ppxhc_Ani();
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < this._rockSingleAds.length; ++i) {
            _loop_1(i);
        }
    };
    return KRQ_Floating;
}(KRQ_ViewComBase_1.default));
exports.default = KRQ_Floating;
},{"../Com/KRQ_RockSingleAd":55,"./KRQ_ViewComBase":63}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ViewComBase_1 = require("./KRQ_ViewComBase");
var KRQ_RollSingleAd_1 = require("../Com/KRQ_RollSingleAd");
var KRQ_GameOver = /** @class */ (function (_super) {
    __extends(KRQ_GameOver, _super);
    function KRQ_GameOver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone = null;
        _this._rollSingleAds = new Array();
        return _this;
    }
    KRQ_GameOver.prototype.onAwake = function () {
        this._centerZone = this.Sprite.getChildByName("CenterZone");
        for (var i = 0; i < this._centerZone.numChildren; ++i) {
            var ad = this._centerZone.getChildAt(i).getComponent(KRQ_RollSingleAd_1.default);
            this._rollSingleAds.push(ad);
        }
    };
    KRQ_GameOver.prototype.onStart = function () {
        var _loop_1 = function (i) {
            var ad = this_1._rollSingleAds[i];
            Laya.timer.once((this_1._rollSingleAds.length - i) * 150, this_1, function () {
                ad.play_ppxhc_Ani();
            });
        };
        var this_1 = this;
        for (var i = 0; i < this._rollSingleAds.length; ++i) {
            _loop_1(i);
        }
    };
    return KRQ_GameOver;
}(KRQ_ViewComBase_1.default));
exports.default = KRQ_GameOver;
},{"../Com/KRQ_RollSingleAd":56,"./KRQ_ViewComBase":63}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_Banner_1 = require("../Com/KRQ_Banner");
var KRQ_ViewComBase_1 = require("./KRQ_ViewComBase");
var KRQ_History_1 = require("../Com/KRQ_History/KRQ_History");
var KRQ_HLoopAd_1 = require("../Com/KRQ_LoopAd/KRQ_HLoopAd");
var Utilit_1 = require("../../Utilit");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var Utilit_2 = require("../../Utilit");
var KRQ_MainState;
(function (KRQ_MainState) {
    KRQ_MainState[KRQ_MainState["Normal"] = 0] = "Normal";
    KRQ_MainState[KRQ_MainState["NoLoopAd"] = 1] = "NoLoopAd";
    KRQ_MainState[KRQ_MainState["NoBannerAd"] = 2] = "NoBannerAd";
})(KRQ_MainState = exports.KRQ_MainState || (exports.KRQ_MainState = {}));
var KRQ_Main = /** @class */ (function (_super) {
    __extends(KRQ_Main, _super);
    function KRQ_Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._topZone = null;
        _this._historyBtn = null;
        _this._krqLoopAd = null;
        _this._bottomZone = null;
        _this._krqBanner = null;
        _this._krqHistory = null;
        return _this;
    }
    KRQ_Main.prototype.onAwake = function () {
        this._topZone = this.Sprite.getChildByName("TopZone");
        this._historyBtn = this._topZone.getChildByName("HistoryBtn");
        this._historyBtn.visible = false;
        if (Utilit_2.default.isIphoneX_()) {
            this._topZone.top = this._topZone.top + 75;
        }
        this._krqLoopAd = this.Sprite.getChildByName("KRQ_HLoopAd").getComponent(KRQ_HLoopAd_1.default);
        this._krqBanner = this.Sprite.getChildByName("KRQ_Banner").getComponent(KRQ_Banner_1.default);
        this._krqHistory = this.Sprite.getChildByName("KRQ_History").getComponent(KRQ_History_1.default);
        var self = this;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        this._krqHistory.OnBackBtn_ppxhc_Click = function () {
            if (aspectRatio < 0.5) {
                self._krqBanner.show();
            }
        };
        this._krqLoopAd.Sprite.visible = false;
        if (aspectRatio < 0.5) {
            this._krqLoopAd.Clip.top = 100;
            if (Utilit_1.default.isIphoneX_()) {
                this._krqLoopAd.Clip.top = this._krqLoopAd.Clip.top + 75;
            }
            this._krqBanner.Sprite.visible = true;
        }
        else {
            this._krqLoopAd.Clip.top = Laya.stage.height - 280;
            this._krqBanner.Sprite.visible = false;
        }
        //         this._krqLoopAd.Clip.top = 100;
        // if(Utilit.isIphoneX())
        // {
        //     this._krqLoopAd.Clip.top =  this._krqLoopAd.Clip.top + 75;
        // }
        // this._krqBanner.Sprite.visible = true;
    };
    KRQ_Main.prototype.switchState = function (state) {
        if (state == KRQ_MainState.Normal) {
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                this._krqLoopAd.Clip.top = 100;
                if (Utilit_1.default.isIphoneX_()) {
                    this._krqLoopAd.Clip.top = this._krqLoopAd.Clip.top + 75;
                }
                this._krqBanner.Sprite.visible = true;
            }
            else {
                this._krqLoopAd.Clip.top = Laya.stage.height - 280;
                this._krqBanner.Sprite.visible = false;
            }
        }
        else if (state == KRQ_MainState.NoLoopAd) {
            this._krqLoopAd.isEnable = false;
            this._krqLoopAd.Sprite.visible = false;
            this._krqBanner.Sprite.visible = true;
        }
        else if (state == KRQ_MainState.NoBannerAd) {
            this._krqLoopAd.Clip.top = Laya.stage.height - 280;
            this._krqBanner.AdPos_ppxhc_ID = -1;
            this._krqBanner.Sprite.visible = false;
        }
    };
    KRQ_Main.prototype.onEnable = function () {
        this._historyBtn.on(Laya.Event.CLICK, this, this.onHistoryBtn);
    };
    KRQ_Main.prototype.onDisable = function () {
        this._historyBtn.off(Laya.Event.CLICK, this, this.onHistoryBtn);
    };
    KRQ_Main.prototype.onHistoryBtn = function () {
        // this._krqHistory.show();
        // this._krqBanner.hide();
        ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.GameHistory);
    };
    return KRQ_Main;
}(KRQ_ViewComBase_1.default));
exports.default = KRQ_Main;
},{"../../Mgr/ViewMgr":69,"../../Utilit":85,"../Com/KRQ_Banner":47,"../Com/KRQ_History/KRQ_History":50,"../Com/KRQ_LoopAd/KRQ_HLoopAd":52,"./KRQ_ViewComBase":63}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ViewComBase_1 = require("./KRQ_ViewComBase");
var KRQ_VLoopAd_1 = require("../Com/KRQ_LoopAd/KRQ_VLoopAd");
var KRQ_SidePull = /** @class */ (function (_super) {
    __extends(KRQ_SidePull, _super);
    function KRQ_SidePull() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._krqVLoopAd = null;
        _this._pullBtn = null;
        return _this;
    }
    KRQ_SidePull.prototype.onAwake = function () {
        this._krqVLoopAd = this.Sprite.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd_1.default);
        this._pullBtn = this._krqVLoopAd.Sprite.getChildByName("PullBtn");
        this._krqVLoopAd.Sprite.x = -this._krqVLoopAd.Sprite.width;
    };
    KRQ_SidePull.prototype.onEnable = function () {
        this._pullBtn.on(Laya.Event.CLICK, this, this.onPullBtn);
    };
    KRQ_SidePull.prototype.onDisable = function () {
        this._pullBtn.off(Laya.Event.CLICK, this, this.onPullBtn);
    };
    KRQ_SidePull.prototype.onPullBtn = function () {
        if (this._krqVLoopAd.Sprite.x < 0) {
            this.pull();
        }
        else {
            this.push();
        }
    };
    KRQ_SidePull.prototype.pull = function () {
        Laya.Tween.to(this._krqVLoopAd.Sprite, {
            x: 0
        }, 200, Laya.Ease.linearNone, null, 0, true);
    };
    KRQ_SidePull.prototype.push = function () {
        Laya.Tween.to(this._krqVLoopAd.Sprite, {
            x: -this._krqVLoopAd.Sprite.width
        }, 200, Laya.Ease.linearNone, null, 0, true);
    };
    KRQ_SidePull.prototype.onShareAdFail = function () {
        this.pull();
    };
    return KRQ_SidePull;
}(KRQ_ViewComBase_1.default));
exports.default = KRQ_SidePull;
},{"../Com/KRQ_LoopAd/KRQ_VLoopAd":54,"./KRQ_ViewComBase":63}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ViewComBase = /** @class */ (function (_super) {
    __extends(KRQ_ViewComBase, _super);
    function KRQ_ViewComBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onShow = null;
        _this.onHide = null;
        return _this;
    }
    Object.defineProperty(KRQ_ViewComBase.prototype, "Sprite", {
        get: function () {
            return this.owner;
        },
        enumerable: true,
        configurable: true
    });
    KRQ_ViewComBase.prototype.show = function () {
        this.Sprite.visible = true;
        if (null != this.onShow) {
            this.onShow();
        }
    };
    KRQ_ViewComBase.prototype.hide = function () {
        this.Sprite.visible = false;
        if (null != this.onHide) {
            this.onHide();
        }
    };
    return KRQ_ViewComBase;
}(Laya.Script));
exports.default = KRQ_ViewComBase;
},{}],64:[function(require,module,exports){
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
     * @param {request_ppxhc_Data} req
     * @memberof MaiLiang
     */
    MaiLiang.request_ppxhc_ = function (req) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        }
        else {
            req.url = MaiLiang.main_ppxhc_Url + req.url;
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
    MaiLiang.GetMaiLiangOpen_ppxhc_Id = function (onSuccess, onFail) {
        if (Laya.Browser.onMiniGame) {
            var option = WXAPI_1.default.getLaunchOptionsSync();
            if (option != null) {
                var key = option.query["key"];
                if (key != null && key != "" && User_1.default.openId != "") {
                    MaiLiang.key = key;
                    var req = new HttpUnit_1.request_ppxhc_Data();
                    req.url = MaiLiang.uclick;
                    req.onSuccess = onSuccess;
                    req.onFail = onFail;
                    req.data.appid = AppConfig_1.default.App_ppxhc_ID;
                    req.data.openid = "";
                    var time = new Date().getTime() / 1000;
                    req.data.posttime = time;
                    req.data.auth = 0;
                    req.data.key = key;
                    req.data.wxopenid = User_1.default.openId;
                    req.meth = "POST";
                    console.log("发送买量数据接口");
                    MaiLiang.request_ppxhc_(req);
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
    MaiLiang.ReportStay_ppxhc_Time = function (onSuccess, onFail) {
        if (Laya.Browser.onMiniGame) {
            if (MaiLiang.MaiLiangOpenId != "") {
                var req = new HttpUnit_1.request_ppxhc_Data();
                req.url = MaiLiang.stay;
                req.onSuccess = onSuccess;
                req.onFail = onFail;
                req.data.appid = AppConfig_1.default.App_ppxhc_ID;
                req.data.openid = MaiLiang.MaiLiangOpenId;
                var time = new Date().getTime() / 1000;
                req.data.posttime = time;
                var staytime = MaiLiang.time != 0 ? time - MaiLiang.time : 0;
                req.data.time = staytime;
                req.meth = "POST";
                console.log("发送停留时间至买量接口");
                MaiLiang.request_ppxhc_(req);
            }
        }
        else {
            console.log("不在微信模式下调用，默认发送停留时间至买量接口失败");
            onFail(null);
        }
    };
    MaiLiang.main_ppxhc_Url = "https://swtj.mrkzx.cn";
    MaiLiang.uclick = "/v1.1/api/Activity/uclick.html";
    MaiLiang.stay = "/v1.1/api/Activity/stay.html";
    MaiLiang.key = ""; //推广路径中同名参数，需要调用方法WXAPi.getLaunchOptionsSync()，从返回的参数中获得。
    MaiLiang.MaiLiangOpenId = ""; //买量系统唯一标识,执行GetMaiLiangOpenId()方法成功后自动获得。
    MaiLiang.time = 0; //买量系统唯一标识后，记录当前时间（精确到秒）。
    return MaiLiang;
}());
exports.default = MaiLiang;
},{"../AppConfig":2,"../Net/HttpUnit":74,"../OPPOAPI":77,"../User/User":84,"../WXAPI":133}],65:[function(require,module,exports){
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
        //分包加载列表
        this._subResPackages = new Array();
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
        if (true == AppConfig_1.default.onTTMiniGame_ppxhc_) {
            Laya.Browser.onMiniGame = false;
        }
        if (!Laya.Browser.onMiniGame
            && !Laya.Browser.onQGMiniGame
            && !Laya.Browser.onQQMiniGame
            && !AppConfig_1.default.onTTMiniGame_ppxhc_) //如果不是小游戏，资源服务器设置为本地测试地址
         {
            AppConfig_1.default.Res_ppxhc_Server = AppConfig_1.default.Local_ppxhc_TestReServer;
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
            { url: AppConfig_1.default.Res_ppxhc_Server + "/json/appswitch.json", type: Laya.Loader.JSON }
        ];
        var self = this;
        Laya.loader.load(firstConfigs, Laya.Handler.create(this, function () {
            self.loadRes(); //加载资源
        }));
        EventMgr_1.default.instance.regOnceEvent_(EventDef_1.Event_ppxhc_Def.App_CloseFirstLoadingView, this, this.closeloadingUI);
    };
    Main.prototype.initLoadingView = function () {
        this._loadingUI = new layaMaxUI_1.ui.View.LoadingUI();
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
        this._preLoadRes.push({ url: AppConfig_1.default.Res_ppxhc_Server + "/json/storeconfig.json", type: Laya.Loader.JSON }); //商店配置表
        //这里是加载分包
        this._subResPackages.push({ name: "subRes" }, { name: "subRes2" });
    };
    Main.prototype.loadRes = function () {
        this.preLoad();
        var resource = this._preLoadRes;
        var subResPackages = [].concat(this._subResPackages);
        var self = this;
        function LoadPreLoadRes() {
            if (resource.length > 0) {
                Laya.loader.load(resource, Laya.Handler.create(this, function () {
                    self.onLoadResComplate(); //预加载完成
                }), Laya.Handler.create(this, function (res) {
                    self._loadingView.setProcess(res / 2 + 0.5);
                }));
            }
            else {
                self.onLoadResComplate(); //预加载完成
            }
        }
        if (!Laya.Browser.onMiniGame && !Laya.Browser.onQGMiniGame && !Laya.Browser.onQQMiniGame) {
            LoadPreLoadRes();
            return;
        }
        var loadFailSubPackages = [];
        var loadSuccessSubPackageCount = 0;
        function LoadSubpackageWork(subData, success, fail) {
            var data = {};
            data.name = subData.name;
            data.success = function () { success(); (subData.success && subData.success()); };
            data.fail = function () { fail(); (subData.fail && subData.fail()); };
            if (Laya.Browser.onMiniGame) {
                return Laya.Browser.window["wx"].loadSubpackage(data);
            }
            else if (Laya.Browser.onQGMiniGame) {
                return Laya.Browser.window["qg"].loadSubpackage(data);
            }
            else if (Laya.Browser.onQQMiniGame) {
                return Laya.Browser.window["qq"].loadSubpackage(data);
            }
        }
        var currentProgress = 0;
        var totaolProgress = subResPackages.length;
        function LoadSubpackages() {
            if (subResPackages.length == 0) {
                LoadPreLoadRes();
                return;
            }
            var subData = subResPackages.shift();
            var subTask = LoadSubpackageWork(subData, function () {
                console.log("分包加载成功：", subData.name);
                currentProgress++;
                LoadSubpackages();
            }, function () {
                console.log("分包加载失败重新加载：", subData.name);
                subResPackages.unshift(subData);
                LoadSubpackages();
            });
            subTask.onProgressUpdate(function (res) {
                var progress = Number(res["progress"]) / 100 + currentProgress;
                self._loadingView.setProcess((progress / totaolProgress) / 2);
            });
        }
        LoadSubpackages();
    };
    Main.prototype.onLoadResComplate = function () {
        var _this = this;
        var self = this;
        this._loadingView.setProcess(1);
        if (Laya.Browser.onMiniGame) {
            WXAPI_1.default.wxLogin_(function (code) {
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
        else if (AppConfig_1.default.onTTMiniGame_ppxhc_) //头条，字节跳动
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
},{"./ALD":1,"./AppConfig":2,"./Event/EventDef":7,"./Event/EventMgr":8,"./GameConfig":9,"./NativeCallback":72,"./Net/HttpUnit":74,"./OPPOAPI":77,"./QQMiniGameAPI":78,"./TTAPI":83,"./User/User":84,"./VIVOAPI":86,"./View/LoadingView/LoadingView":93,"./WXAPI":133,"./ui/layaMaxUI":134}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("./ViewMgr");
var User_1 = require("../User/User");
var HttpUnit_1 = require("../Net/HttpUnit");
var MaiLiang_1 = require("../MaiLiangAPI/MaiLiang");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var WXAPI_1 = require("../WXAPI");
var WudianMgr_1 = require("./WudianMgr");
var ALD_1 = require("../ALD");
var QQMiniGameAPI_1 = require("../QQMiniGameAPI");
var WXADMgr_1 = require("./WXADMgr");
var CachedQQBannerAd_1 = require("../CachedQQBannerAd");
var Game_1 = require("../Game/Game");
//游戏管理器，游戏代码的入口
var Game_ppxhc_Mgr = /** @class */ (function (_super) {
    __extends(Game_ppxhc_Mgr, _super);
    function Game_ppxhc_Mgr() {
        var _this = _super.call(this) || this;
        Game_ppxhc_Mgr._instance_ = _this;
        return _this;
    }
    Game_ppxhc_Mgr.getInstance = function () { return Game_ppxhc_Mgr._instance_; };
    Game_ppxhc_Mgr.prototype.onAwake = function () {
        MaiLiang_1.default.GetMaiLiangOpen_ppxhc_Id(function (res) {
            console.log("GameUI 买量数据上报成功");
            Laya.Browser.window["wx"].onShow(function () {
                MaiLiang_1.default.GetMaiLiangOpen_ppxhc_Id(null, null);
            });
            Laya.Browser.window["wx"].onHide(function () {
                MaiLiang_1.default.ReportStay_ppxhc_Time(null, null);
            });
        }, function (res) {
            console.log("GameUI 买量数据上报失败");
        });
        WXAPI_1.default.SetShareMenu("", "", function () {
        }, function () {
        }, function () {
        });
        WudianMgr_1.default.UpdateIpBlock_ppxhc_State();
        this.report_ppxhc_LaunchOptions();
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
    Game_ppxhc_Mgr.prototype.onStart = function () {
        this.pre_ppxhc_CreateGame();
    };
    Game_ppxhc_Mgr.prototype.pre_ppxhc_CreateGame = function () {
        //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
        var basePath = "https://oss.renyouwangluo.cn/ppxhc/Conventional";
        Laya.URL.customFormat = function (url) {
            if (url.indexOf(".lh") == -1 && url.indexOf(basePath) > -1) {
                url = url.replace(basePath, "subRes/Game/LayaScene_Game/Conventional");
                return url;
            }
            return url;
        };
        Game_1.default.LoadGame(this, function () {
            EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.App_CloseFirstLoadingView);
            ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.GameHome, { view: 0 });
            //ViewMgr.instance.openView(ViewDef.GameOver,{Result:1});
            //ViewMgr.instance.openView(ViewDef.GameContinue);
        });
    };
    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    Game_ppxhc_Mgr.prototype.save_ppxhc_GameData = function () {
        localStorage.setItem("Game_Data", User_1.default.getSaveData());
        // Http_ppxhc_Unit.saveGameData(User_ppxhc.getSaveData(),
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
    Game_ppxhc_Mgr.prototype.report_ppxhc_LaunchOptions = function () {
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
    Game_ppxhc_Mgr._instance_ = null;
    return Game_ppxhc_Mgr;
}(Laya.Script));
exports.default = Game_ppxhc_Mgr;
},{"../ALD":1,"../CachedQQBannerAd":3,"../Event/EventDef":7,"../Event/EventMgr":8,"../Game/Game":17,"../MaiLiangAPI/MaiLiang":64,"../Net/HttpUnit":74,"../QQMiniGameAPI":78,"../User/User":84,"../WXAPI":133,"./ViewMgr":69,"./WXADMgr":70,"./WudianMgr":71}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sound_ppxhc_Mgr = /** @class */ (function () {
    function Sound_ppxhc_Mgr() {
        this._enabled = true;
    }
    Object.defineProperty(Sound_ppxhc_Mgr.prototype, "Enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (e) {
            if (!e) {
                this.stop_ppxhc_BGM();
            }
            this._enabled = e;
        },
        enumerable: true,
        configurable: true
    });
    Sound_ppxhc_Mgr.prototype.getSoundUrl = function (name) {
        var url = Sound_ppxhc_Mgr.sound_ppxhc_ResPath + name + ".ogg";
        return url;
    };
    Sound_ppxhc_Mgr.prototype.play_ppxhc_Sound = function (name) {
        if (!this._enabled)
            return;
        var url = this.getSoundUrl(name);
        if (Laya.Browser.onMiniGame) {
            var sound = laya.utils.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = Sound_ppxhc_Mgr.sound_ppxhc_ResPath + name + ".ogg";
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
    Sound_ppxhc_Mgr.prototype.play_ppxhc_BGM = function (name) {
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
    Sound_ppxhc_Mgr.prototype.stop_ppxhc_BGM = function () {
        if (Laya.Browser.onMiniGame) {
            if (this.bgm) {
                this.bgm.pause();
            }
        }
        else {
            Laya.SoundManager.stopMusic();
        }
    };
    Sound_ppxhc_Mgr.sound_ppxhc_ResPath = "subRes2/sounds/";
    Sound_ppxhc_Mgr.instance_ = new Sound_ppxhc_Mgr();
    return Sound_ppxhc_Mgr;
}());
exports.default = Sound_ppxhc_Mgr;
},{}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NativeCallback_1 = require("../NativeCallback");
var Vibrate_ppxhc_Mgr = /** @class */ (function () {
    function Vibrate_ppxhc_Mgr() {
    }
    //短震动
    Vibrate_ppxhc_Mgr.vibrate_ppxhc_Short = function () {
        if (!Vibrate_ppxhc_Mgr.isEnable_)
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
        else {
            NativeCallback_1.default.CallNativeFunc("vibrateShort");
        }
    };
    //长震动
    Vibrate_ppxhc_Mgr.vibrate_ppxhc_Long = function () {
        if (!Vibrate_ppxhc_Mgr.isEnable_)
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
        else {
            NativeCallback_1.default.CallNativeFunc("vibrateLong");
        }
    };
    //定时震动,毫秒
    Vibrate_ppxhc_Mgr.vibrate_ppxhc = function (time) {
        if (!Vibrate_ppxhc_Mgr.isEnable_)
            return;
        if (Laya.Browser.onMiniGame) {
            var count_1 = time / 15; //微信小游戏中震动的时间是15毫秒的整数倍时间，本质是对短震动的封装
            var index_1 = 0;
            var obj_1 = { count: count_1, index: index_1 };
            Laya.timer.loop(16, obj_1, function () {
                Vibrate_ppxhc_Mgr.vibrate_ppxhc_Short();
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
                Vibrate_ppxhc_Mgr.vibrate_ppxhc_Short();
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
                Vibrate_ppxhc_Mgr.vibrate_ppxhc_Short();
                index_3++;
                if (index_3 > count_3) {
                    Laya.timer.clearAll(obj_3);
                }
            });
        }
    };
    Vibrate_ppxhc_Mgr.isEnable_ = true;
    return Vibrate_ppxhc_Mgr;
}());
exports.default = Vibrate_ppxhc_Mgr;
},{"../NativeCallback":72}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSwitchConfig_1 = require("../Config/AppSwitchConfig");
var WudianMgr_1 = require("./WudianMgr");
var View_ppxhc_Def;
(function (View_ppxhc_Def) {
    View_ppxhc_Def["None"] = "";
    View_ppxhc_Def["TipsView"] = "View/TipsView.json";
    View_ppxhc_Def["ClickGetPrize"] = "View/ClickGetPrize.json";
    View_ppxhc_Def["MainView"] = "View/Template/MainViewTemplate.json";
    View_ppxhc_Def["MiniGameView"] = "View/Template/MiniGameViewTemplate.json";
    View_ppxhc_Def["RewardView"] = "View/Template/RewardViewTemplate.json";
    View_ppxhc_Def["InGameView"] = "View/Template/InGameViewTemplate.json";
    View_ppxhc_Def["GameWinView"] = "View/Template/GameWinViewTemplate.json";
    View_ppxhc_Def["GameFailView"] = "View/Template/GameFailViewTemplate.json";
    View_ppxhc_Def["ExportView"] = "View/Template/ExportViewTemplate.json";
    View_ppxhc_Def["Export2View"] = "View/Template/Export2ViewTemplate.json";
    View_ppxhc_Def["Export3View"] = "View/Template/Export3ViewTemplate.json";
    View_ppxhc_Def["WXCrazyClick"] = "View/Template/WXCrazyClick.json";
    View_ppxhc_Def["OPPONativeView"] = "View/Template/OPPONativeViewTemplate.json";
    View_ppxhc_Def["QQCrazyClickView"] = "View/Template/QQ/QQCrazyClick.json";
    View_ppxhc_Def["QQCrazyClickView2"] = "View/Template/QQ/QQCrazyClick2.json";
    View_ppxhc_Def["TTStoreView"] = "View/Template/TT/TTStore.json";
    View_ppxhc_Def["TTSignInView"] = "View/Template/TT/TTSignIn.json";
    View_ppxhc_Def["TTRewardView"] = "View/Template/TT/TTReward.json";
    View_ppxhc_Def["VVNativeView1"] = "View/Template/VV/VVNativeView1Template.json";
    View_ppxhc_Def["VVNativeView2"] = "View/Template/VV/VVNativeView2Template.json";
    //todo:添加你的界面
    View_ppxhc_Def["TestGame"] = "subRes/Views/TestGame.json";
    View_ppxhc_Def["GameHome"] = "subRes/Views/GameHome.json";
    View_ppxhc_Def["GameView"] = "subRes/Views/GameView.json";
    View_ppxhc_Def["GameOver"] = "subRes/Views/GameOver.json";
    View_ppxhc_Def["GameContinue"] = "subRes/Views/GameContinue.json";
    View_ppxhc_Def["GameHistory"] = "subRes/Views/GameHistory.json";
    View_ppxhc_Def["GameSkin"] = "subRes/Views/GameSkin.json";
    View_ppxhc_Def["TrialSkin"] = "subRes/Views/TrialSkin.json";
})(View_ppxhc_Def = exports.View_ppxhc_Def || (exports.View_ppxhc_Def = {}));
//界面管理器
var View_ppxhc_Mgr = /** @class */ (function () {
    function View_ppxhc_Mgr() {
        this._views = {};
        this._loadingList = new Array();
    }
    View_ppxhc_Mgr.prototype.openView = function (viewType, data, oncomplate) {
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
    View_ppxhc_Mgr.prototype.closeView = function (viewType) {
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
    View_ppxhc_Mgr.prototype.ShowView = function (viewType) {
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
    View_ppxhc_Mgr.prototype.hideView = function (viewType) {
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
    View_ppxhc_Mgr.prototype.getView = function (viewType) {
        return this._views[viewType];
    };
    View_ppxhc_Mgr.prototype.showTips = function (msg) {
        this.openView(View_ppxhc_Def.TipsView, msg);
    };
    //尝试打开 导出界面3 (Exprot3ViewTemplate)
    //complate 回调用函数，如果成功打开界面 complate 接受参数 Export3View实例 否则为 null
    View_ppxhc_Mgr.prototype.tryShowPopAd = function (complate) {
        if (1 == AppSwitchConfig_1.default.getInstance().getAppSwitchData().popAd && WudianMgr_1.default.Wudian_ppxhc_Flag) {
            View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.Export3View, null, function (v) {
                if (null != complate)
                    complate(v);
            });
        }
        else {
            if (null != complate)
                complate(null);
        }
    };
    View_ppxhc_Mgr.instance = new View_ppxhc_Mgr();
    return View_ppxhc_Mgr;
}());
exports.default = View_ppxhc_Mgr;
},{"../Config/AppSwitchConfig":5,"./WudianMgr":71}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSwitchConfig_1 = require("../Config/AppSwitchConfig");
var WXBannder_ppxhc_Ad = /** @class */ (function () {
    function WXBannder_ppxhc_Ad(bannerid) {
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
    Object.defineProperty(WXBannder_ppxhc_Ad.prototype, "Id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannder_ppxhc_Ad.prototype, "Create_ppxhc_Time", {
        get: function () {
            return this._createTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannder_ppxhc_Ad.prototype, "Destroyed", {
        get: function () {
            return this._destroyed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannder_ppxhc_Ad.prototype, "isReady", {
        get: function () {
            return null != this._banner;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannder_ppxhc_Ad.prototype, "isError", {
        get: function () {
            return null != this._error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannder_ppxhc_Ad.prototype, "Error", {
        get: function () {
            return this._error;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannder_ppxhc_Ad.prototype, "Loading", {
        get: function () {
            return this._loading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannder_ppxhc_Ad.prototype, "RetryCount", {
        get: function () {
            return this._retryCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXBannder_ppxhc_Ad.prototype, "BannerTotalShowTime", {
        get: function () {
            return this._bannerTotalShowTime;
        },
        enumerable: true,
        configurable: true
    });
    WXBannder_ppxhc_Ad.prototype.show = function () {
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
    WXBannder_ppxhc_Ad.prototype.hide = function () {
        if (this.isReady) {
            this._banner.hide();
            this._bannerTotalShowTime += (Laya.timer.currTimer - this._lastShowTime);
        }
    };
    WXBannder_ppxhc_Ad.prototype.destroy = function () {
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
    WXBannder_ppxhc_Ad.prototype.retry = function (callBack) {
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
        if (this._retryCount >= WXBannder_ppxhc_Ad.MAX_RETRY_COUNT) {
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
    WXBannder_ppxhc_Ad.prototype._create = function (callBack) {
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
    WXBannder_ppxhc_Ad.MAX_RETRY_COUNT = 3;
    return WXBannder_ppxhc_Ad;
}());
exports.WXBannder_ppxhc_Ad = WXBannder_ppxhc_Ad;
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
        var bannerAd = new WXBannder_ppxhc_Ad(WXADMgr._bannerIds[WXADMgr._curBannerCreateIndex]);
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
                if (bannerAd.RetryCount >= WXBannder_ppxhc_Ad.MAX_RETRY_COUNT) {
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
},{"../Config/AppSwitchConfig":5}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpUnit_1 = require("../Net/HttpUnit");
var AppSwitchConfig_1 = require("../Config/AppSwitchConfig");
var WXAPI_1 = require("../WXAPI");
var QQMiniGameAPI_1 = require("../QQMiniGameAPI");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var Wudian_ppxhc_Mgr = /** @class */ (function () {
    function Wudian_ppxhc_Mgr() {
    }
    Wudian_ppxhc_Mgr.IpBlock_ppxhc_Flag = function () {
        return Wudian_ppxhc_Mgr._ipBlock_ppxhc_Flag;
    };
    /**
     * 此方法调用很慢，所以要在游戏初始化的时候调用一次此方法
     *
     * @static
     * @memberof WudianMgr
     */
    Wudian_ppxhc_Mgr.UpdateIpBlock_ppxhc_State = function () {
        HttpUnit_1.default.GetIpBlock(function (res) {
            console.log("调用IpBlock接口成功,结果为:", res);
            Wudian_ppxhc_Mgr._ipBlock_ppxhc_Flag = res.code;
            EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.App_OnUpdateIpBlockState, { ipBlockFlag: Wudian_ppxhc_Mgr._ipBlock_ppxhc_Flag });
        }, null);
    };
    /**
     * IP是否被屏蔽
     *
     * @static
     * @returns {boolean}
     * @memberof WudianMgr
     */
    Wudian_ppxhc_Mgr.GetIp_ppxhc_Blocked = function () {
        return Wudian_ppxhc_Mgr._ipBlock_ppxhc_Flag == 0;
    };
    /**
     * 得到用户进入的场景值
     *
     * @static
     * @returns {number}
     * @memberof WudianMgr
     */
    Wudian_ppxhc_Mgr.GetEntry_ppxhc_Scene = function () {
        return WXAPI_1.default.getLaunchOptionsSync().scene == 1006;
    };
    /**
     * 误点开关是否打开，包括了总开关和分时开关
     *
     * @static
     * @returns {boolean}
     * @memberof WudianMgr
     */
    Wudian_ppxhc_Mgr.IsSwitch_ppxhc_Open = function () {
        var mainSwitch = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudian == 1;
        var isOpenTime = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudianTimeAvaliable;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "打开时间", isOpenTime);
        return mainSwitch && isOpenTime;
    };
    Object.defineProperty(Wudian_ppxhc_Mgr, "Wudian_ppxhc_Flag", {
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
            var ipnotBlock = Wudian_ppxhc_Mgr._ipBlock_ppxhc_Flag == 0;
            /* 测试功能，等删 */
            // ipnotBlock = true;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock, "打开时间", isOpenTime);
            return mainSwitch && noEnterBySearch && ipnotBlock; //&& isOpenTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wudian_ppxhc_Mgr, "NoTimeWudian_ppxhc_Flag", {
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
            var ipnotBlock = Wudian_ppxhc_Mgr._ipBlock_ppxhc_Flag == 0;
            /* 测试功能，等删 */
            // ipnotBlock = true;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
            return mainSwitch && noEnterBySearch && ipnotBlock;
        },
        enumerable: true,
        configurable: true
    });
    Wudian_ppxhc_Mgr._ipBlock_ppxhc_Flag = -1;
    return Wudian_ppxhc_Mgr;
}());
exports.default = Wudian_ppxhc_Mgr;
},{"../Config/AppSwitchConfig":5,"../Event/EventDef":7,"../Event/EventMgr":8,"../Net/HttpUnit":74,"../QQMiniGameAPI":78,"../WXAPI":133}],72:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("./Event/EventMgr");
var EventDef_1 = require("./Event/EventDef");
var NativeCallback = /** @class */ (function () {
    function NativeCallback() {
    }
    // private static bridge: Laya.IPlatformClass = null;
    NativeCallback.onVideoFail = function () {
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.RewardVideoFail);
        Laya.SoundManager.muted = false;
    };
    NativeCallback.onVideoSuccess = function (reward) {
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.RewardVideoSuccess, reward);
        Laya.SoundManager.muted = false;
    };
    NativeCallback.onInsertVideoEnd = function () {
        console.debug("onInsertVideoEnd    --------- ------------ ");
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.InsertVideoEnd);
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
},{"./Event/EventDef":7,"./Event/EventMgr":8}],73:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("./aes.js");
var AesTools_ = /** @class */ (function () {
    function AesTools_() {
    }
    //加密
    AesTools_.encrypt_ = function (str) {
        var key = CryptoJS.enc.Utf8.parse(AesTools_.KEY); // 秘钥
        var iv = CryptoJS.enc.Utf8.parse(AesTools_.IV); //向量iv
        var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    };
    //解密
    AesTools_.decrypt_ = function (str) {
        var key = CryptoJS.enc.Utf8.parse(AesTools_.KEY); // 秘钥
        var iv = CryptoJS.enc.Utf8.parse(AesTools_.IV); //向量iv
        var decrypted = CryptoJS.AES.decrypt(str, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        return decrypted.toString(CryptoJS.enc.Utf8);
    };
    AesTools_.KEY = 'b#63fFJ6AvkK3YT*';
    AesTools_.IV = 'J$f4DU%sNL73M&Go';
    return AesTools_;
}());
exports.default = AesTools_;
},{"./aes.js":76}],74:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetConfig_1 = require("./NetConfig");
var User_1 = require("../User/User");
var AesTools_1 = require("./AesTools");
var AppConfig_1 = require("../AppConfig");
var request_ppxhc_Data = /** @class */ (function () {
    function request_ppxhc_Data() {
        this.meth = "post";
        this.url = "";
        this.onSuccess = null;
        this.onFail = null;
        this.data = {};
    }
    return request_ppxhc_Data;
}());
exports.request_ppxhc_Data = request_ppxhc_Data;
var Http_ppxhc_Unit = /** @class */ (function () {
    function Http_ppxhc_Unit() {
    }
    Http_ppxhc_Unit.request = function (req) {
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
        xhr.once(Laya.Event.COMPLETE, Http_ppxhc_Unit, completeFunc);
        xhr.once(Laya.Event.ERROR, Http_ppxhc_Unit, errorFunc);
        var dataStr = JSON.stringify(req.data);
        if (Laya.Browser.onMiniGame || AppConfig_1.default.onTTMiniGame_ppxhc_) {
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
            "sign", AesTools_1.default.encrypt_(time),
        ];
        if (User_1.default.token) {
            header.push("token");
            header.push(User_1.default.token);
        }
        xhr.send(req.url, JSON.stringify(req.data), req.meth, "json", header);
    };
    //todo:这里添加你们和服务器相互的接口
    Http_ppxhc_Unit.login = function (onSuccess, onFail) {
        var req = new request_ppxhc_Data();
        req.url = NetConfig_1.default.Login;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_ppxhc_Unit.request(req);
    };
    Http_ppxhc_Unit.saveGameData = function (gameData, onSuccess, onFail) {
        var req = new request_ppxhc_Data();
        req.url = NetConfig_1.default.SaveGameData;
        req.data.gameData = gameData;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_ppxhc_Unit.request(req);
    };
    Http_ppxhc_Unit.getGameData = function (onSuccess, onFail) {
        var req = new request_ppxhc_Data();
        req.url = NetConfig_1.default.GetUser;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_ppxhc_Unit.request(req);
    };
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    Http_ppxhc_Unit.GetIpBlock = function (onSuccess, onFail) {
        if (-1 != NetConfig_1.default.gameid) {
            var req = new request_ppxhc_Data();
            req.url = NetConfig_1.default.IpBlock;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            Http_ppxhc_Unit.request(req);
        }
    };
    Http_ppxhc_Unit.reportExport = function (appid, game_name, onSuccess, onFail) {
        var req = new request_ppxhc_Data();
        req.url = NetConfig_1.default.reportExport;
        req.data.wbappid = appid;
        req.data.game_name = game_name;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_ppxhc_Unit.request(req);
    };
    Http_ppxhc_Unit.reportImport = function (appid, channel, onSuccess, onFail) {
        var req = new request_ppxhc_Data();
        req.url = NetConfig_1.default.reportImport;
        req.data.wbappid = appid;
        req.data.channel = channel;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_ppxhc_Unit.request(req);
    };
    Http_ppxhc_Unit.Getuserip = function (onSuccess, onFail) {
        var req = new request_ppxhc_Data();
        req.url = NetConfig_1.default.getuserip;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_ppxhc_Unit.request(req);
    };
    //签到
    Http_ppxhc_Unit.SignIn = function (onSuccess, onFail) {
        var req = new request_ppxhc_Data();
        req.url = NetConfig_1.default.signin;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        req.data.type = 1;
        Http_ppxhc_Unit.request(req);
    };
    //获取签到状态
    Http_ppxhc_Unit.GetSignIn = function (onSuccess, onFail) {
        var req = new request_ppxhc_Data();
        req.url = NetConfig_1.default.signin;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        req.data.type = 0;
        Http_ppxhc_Unit.request(req);
    };
    return Http_ppxhc_Unit;
}());
exports.default = Http_ppxhc_Unit;
},{"../AppConfig":2,"../User/User":84,"./AesTools":73,"./NetConfig":75}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Net_ppxhc_Config = /** @class */ (function () {
    function Net_ppxhc_Config() {
    }
    Net_ppxhc_Config.state = 0;
    Net_ppxhc_Config.gameid = 96;
    Net_ppxhc_Config.serverUrl = "";
    Net_ppxhc_Config.Login = "";
    Net_ppxhc_Config.SaveGameData = "";
    Net_ppxhc_Config.GetUser = "";
    /* 用来对IP地址进行屏蔽的接口地址，可以使用接口的返回值让某些广告逻辑在微信的审核地区(广州)发生变化 */
    Net_ppxhc_Config.IpBlock = "";
    Net_ppxhc_Config.reportExport = "";
    Net_ppxhc_Config.reportImport = "";
    Net_ppxhc_Config.getuserip = "";
    Net_ppxhc_Config.signin = ""; //签到
    return Net_ppxhc_Config;
}());
exports.default = Net_ppxhc_Config;
},{}],76:[function(require,module,exports){
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
},{}],77:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("./AppConfig");
var HttpUnit_1 = require("./Net/HttpUnit");
var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
var ViewMgr_1 = require("./Mgr/ViewMgr");
var OPPO_ppxhc_API = /** @class */ (function () {
    function OPPO_ppxhc_API() {
    }
    Object.defineProperty(OPPO_ppxhc_API, "BannerInstance", {
        get: function () {
            return OPPO_ppxhc_API._banner;
        },
        enumerable: true,
        configurable: true
    });
    OPPO_ppxhc_API.Login = function (onSuccess, onFail) {
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
    OPPO_ppxhc_API.initAdService = function (onSuccess, onFail, onComplete) {
        Laya.Browser.window["qg"].initAdService({
            appId: AppConfig_1.default.App_ppxhc_ID,
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
    OPPO_ppxhc_API.showRewardedVideoAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQGMiniGame) {
            var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: OPPO_ppxhc_API.adUnitId,
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
    OPPO_ppxhc_API.navigateToMiniProgram = function (pkgName, gameName, path, onSuccess, onFail, onComplate) {
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
                    from: AppConfig_1.default.App_ppxhc_ID
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
    OPPO_ppxhc_API.showInterstitialAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQGMiniGame) {
            var insertAd = qg.createInsertAd({
                posId: OPPO_ppxhc_API.InsAdUnitId
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
    OPPO_ppxhc_API.showBannaer = function () {
        if (OPPO_ppxhc_API._banner) {
            OPPO_ppxhc_API._banner.show();
            return;
        }
        var bannerAd = qg.createBannerAd({
            posId: OPPO_ppxhc_API.bannerAdUnitId
        });
        bannerAd.show();
        OPPO_ppxhc_API._banner = bannerAd;
    };
    OPPO_ppxhc_API.hideBanner = function () {
        if (OPPO_ppxhc_API._banner) {
            OPPO_ppxhc_API._banner.hide();
        }
    };
    OPPO_ppxhc_API.destroyBanner = function () {
        if (OPPO_ppxhc_API._banner) {
            OPPO_ppxhc_API._banner.destroy();
        }
        OPPO_ppxhc_API._banner = null;
    };
    OPPO_ppxhc_API.getLaunchOptionsSync = function () {
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
    OPPO_ppxhc_API.share = function (complate, titel, imageUrl) {
        complate(false);
    };
    OPPO_ppxhc_API.createDesktopIcon = function (onSuccess, onFail) {
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
    OPPO_ppxhc_API.autoPopCreateDestopIcon = function (onSuccess, onFail) {
        if (!Laya.Browser.onQGMiniGame) {
            if (null != onFail) {
                onFail();
            }
            return;
        }
        var rate = Math.floor(Math.random() * 100);
        if (rate <= AppSwitchConfig_1.default.getInstance().getAppSwitchData().oppocfg.addToDesktop) {
            OPPO_ppxhc_API.createDesktopIcon(onSuccess, onFail);
        }
        else {
            if (null != onFail) {
                onFail();
            }
        }
    };
    //显示OPPO原生界面
    OPPO_ppxhc_API.showNativeAd = function (onSuccess, onFail) {
        if (!Laya.Browser.onQGMiniGame) {
            if (null != onFail) {
                onFail();
            }
            return;
        }
        if (1 == AppSwitchConfig_1.default.getInstance().getAppSwitchData().oppocfg.yuanshengSwitch) {
            ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.OPPONativeView, null, function (v) {
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
    OPPO_ppxhc_API.adUnitId = "";
    OPPO_ppxhc_API.bannerAdUnitId = "";
    OPPO_ppxhc_API.InsAdUnitId = "";
    OPPO_ppxhc_API.OpenScreenAdUnitId = "";
    OPPO_ppxhc_API.NativeAdId = "";
    OPPO_ppxhc_API._banner = null;
    return OPPO_ppxhc_API;
}());
exports.default = OPPO_ppxhc_API;
},{"./AppConfig":2,"./Config/AppSwitchConfig":5,"./Mgr/ViewMgr":69,"./Net/HttpUnit":74}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("./Mgr/ViewMgr");
var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
var WudianMgr_1 = require("./Mgr/WudianMgr");
var AppConfig_1 = require("./AppConfig");
var QQMiniGame_ppxhc_API = /** @class */ (function () {
    function QQMiniGame_ppxhc_API() {
    }
    QQMiniGame_ppxhc_API.Login = function (onSuccess, onFail) {
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
    QQMiniGame_ppxhc_API.onRewardedVideoAdLoad_ppxhc = function () {
        console.log('激励视频 广告加载完成');
    };
    QQMiniGame_ppxhc_API.onRewardedVideoAdError_ppxhc = function (err) {
        console.log('激励视频 广告加载失败' + err);
        if (QQMiniGame_ppxhc_API._onRewardedVideoAdFailed) {
            QQMiniGame_ppxhc_API._onRewardedVideoAdFailed();
        }
    };
    QQMiniGame_ppxhc_API.onRewardedVideoAdClose_ppxhc = function (res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看');
            if (QQMiniGame_ppxhc_API._onRewardedVideoAdClose) {
                QQMiniGame_ppxhc_API._onRewardedVideoAdClose(true);
            }
        }
        else {
            console.log('激励视频 未完整观看');
            if (QQMiniGame_ppxhc_API._onRewardedVideoAdClose) {
                QQMiniGame_ppxhc_API._onRewardedVideoAdClose(false);
            }
        }
    };
    QQMiniGame_ppxhc_API.regRewardedVideoAdEvent_ppxhc = function (rewardedVideoAd) {
        rewardedVideoAd.onLoad(QQMiniGame_ppxhc_API.onRewardedVideoAdLoad_ppxhc);
        rewardedVideoAd.onError(QQMiniGame_ppxhc_API.onRewardedVideoAdError_ppxhc);
        rewardedVideoAd.onClose(QQMiniGame_ppxhc_API.onRewardedVideoAdClose_ppxhc);
        QQMiniGame_ppxhc_API._isRegRewardedVideoAdEvent = true;
    };
    QQMiniGame_ppxhc_API.showRewardedVideoAd_ppxhc = function (onAdClose, onFailed) {
        if (Laya.Browser.onQQMiniGame) {
            QQMiniGame_ppxhc_API._onRewardedVideoAdClose = onAdClose;
            QQMiniGame_ppxhc_API._onRewardedVideoAdFailed = onFailed;
            var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd({
                adUnitId: QQMiniGame_ppxhc_API.adUnitId,
            });
            if (!QQMiniGame_ppxhc_API._isRegRewardedVideoAdEvent) {
                QQMiniGame_ppxhc_API.regRewardedVideoAdEvent_ppxhc(rewardedVideoAd);
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
    QQMiniGame_ppxhc_API.navigateToMiniProgram_ppxhc = function (appId, path, onSuccess, onFail, onComplate) {
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
    QQMiniGame_ppxhc_API.share = function (complate, titel, imageUrl) {
        var _this = this;
        if (Laya.Browser.onQQMiniGame) {
            QQMiniGame_ppxhc_API._onShow = function () {
                Laya.Browser.window["qq"].offShow(QQMiniGame_ppxhc_API._onShow);
                QQMiniGame_ppxhc_API._onShow = null;
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
            Laya.Browser.window["qq"].onShow(QQMiniGame_ppxhc_API._onShow);
            QQMiniGame_ppxhc_API._lastShareTime = Date.now();
            Laya.Browser.window["qq"].shareAppMessage({
                title: titel,
                imageUrl: imageUrl
            });
        }
    };
    //----------------------------------------------------------------------
    //--------------------插屏幕广告---------------------------------------
    QQMiniGame_ppxhc_API.showInterstitialAd_ppxhc = function (onAdClose, onFailed) {
        if (Laya.Browser.onQQMiniGame) {
            var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                adUnitId: QQMiniGame_ppxhc_API.InsAdUnitId,
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
    QQMiniGame_ppxhc_API.LoadAppBoxAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQQMiniGame) {
            QQMiniGame_ppxhc_API.mAppboxAd = Laya.Browser.window["qq"].createAppBox({
                adUnitId: QQMiniGame_ppxhc_API.AppBoxId,
            });
            QQMiniGame_ppxhc_API.mAppboxAd.load().then(function () {
                console.log('盒子广告 加载完成');
            });
            QQMiniGame_ppxhc_API.mAppboxAd.onError(function (err) {
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
    QQMiniGame_ppxhc_API.showAppBoxAd = function (onFailed, onAdClose) {
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
            QQMiniGame_ppxhc_API.LoadAppBoxAd(onAdClose, onFailed);
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
    QQMiniGame_ppxhc_API.getLaunchOptionsSync = function () {
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
    QQMiniGame_ppxhc_API.SetShareMenu = function (titel, imageUrl, success, fail, complate) {
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
    QQMiniGame_ppxhc_API.showQQCreazyClick = function (data, onSuccess, onFail) {
        var launchScene = QQMiniGame_ppxhc_API.getLaunchOptionsSync().scene;
        var noEnterBySearch = true;
        var wudianSceneList = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudianSceneList;
        for (var i = 0; i < wudianSceneList.length; ++i) {
            var wudianSceneValue = wudianSceneList[i];
            if (launchScene == wudianSceneValue) {
                noEnterBySearch = false;
            }
        }
        var ipBlocked = WudianMgr_1.default.GetIp_ppxhc_Blocked();
        var wudian = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudian;
        var kuangdianBanner = AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.kuangdianBanner;
        if (AppConfig_1.default.ppxhc_Versions == AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.qqversions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBanner) {
            ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.QQCrazyClickView, data, function () {
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
    QQMiniGame_ppxhc_API.showQQCreazyClick2 = function (data, onSuccess, onFail) {
        var launchScene = QQMiniGame_ppxhc_API.getLaunchOptionsSync().scene;
        var noEnterBySearch = true;
        var wudianSceneList = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudianSceneList;
        for (var i = 0; i < wudianSceneList.length; ++i) {
            var wudianSceneValue = wudianSceneList[i];
            if (launchScene == wudianSceneValue) {
                noEnterBySearch = false;
            }
        }
        var ipBlocked = WudianMgr_1.default.GetIp_ppxhc_Blocked();
        var wudian = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wudian;
        var kuangdianBox = AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.kuangdianBox;
        if (AppConfig_1.default.ppxhc_Versions == AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.qqversions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBox) {
            ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.QQCrazyClickView2, data, function () {
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
    QQMiniGame_ppxhc_API.adUnitId = ""; //激励视频Id
    QQMiniGame_ppxhc_API.bannerAdUnitId = ""; //banner广告Id
    QQMiniGame_ppxhc_API.InsAdUnitId = ""; //插屏广告Id
    QQMiniGame_ppxhc_API.AppBoxId = ""; //盒子广告Id
    //-------------------------激励视频---------------------------------
    QQMiniGame_ppxhc_API._isRegRewardedVideoAdEvent = false;
    QQMiniGame_ppxhc_API._onRewardedVideoAdFailed = null;
    QQMiniGame_ppxhc_API._onRewardedVideoAdClose = null;
    //----------------------------------------------------------------------
    //---------------------分享----------------------------------------
    QQMiniGame_ppxhc_API._onShow = null;
    QQMiniGame_ppxhc_API._lastShareTime = 0;
    //--------------------盒子广告---------------------------------------
    QQMiniGame_ppxhc_API.mAppboxAd = null;
    QQMiniGame_ppxhc_API.onBoxAdClose = null;
    return QQMiniGame_ppxhc_API;
}());
exports.default = QQMiniGame_ppxhc_API;
},{"./AppConfig":2,"./Config/AppSwitchConfig":5,"./Mgr/ViewMgr":69,"./Mgr/WudianMgr":71}],79:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Share_ppxhc_Ad = /** @class */ (function () {
    function Share_ppxhc_Ad() {
    }
    Share_ppxhc_Ad.refreshAd_ = function (complate) {
        // Share_ppxhc_Ad.getAdPosData_((res)=>{
        //     if(1 == res.code)
        //     {
        //         console.log("获取分享广告数据成功");
        //         Share_ppxhc_Ad._adPosition = res.result;
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
    Share_ppxhc_Ad.getADVs_ = function (locationid, complate, useRandom, useLocalRandom, sortDatas) {
        // if(!Share_ppxhc_Ad.isNeedShowAd())
        // {
        //     complate(null);
        //     return;
        // }
        // useRandom = null == useRandom ? this.UseRandomAdPos_ : useRandom;
        // useLocalRandom =  null == useLocalRandom ? true : useLocalRandom;
        // if(useRandom)
        // {
        //     locationid = Share_ppxhc_Ad.getRandomADPosID_();
        // }
        // var datas = Share_ppxhc_Ad._adv[locationid];
        // if(datas)
        // {
        //     if(useLocalRandom)
        //     {
        //         if(null == sortDatas)
        //         {
        //             datas = this.sortDatas_(datas);
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
        //     var self = Share_ppxhc_Ad;
        //     Share_ppxhc_Ad.getADVData_(locationid,(res)=>
        //     {
        //         if(1 == res.code)
        //         {
        //             Share_ppxhc_Ad._adv[locationid] = res.result;
        //             datas = Share_ppxhc_Ad._adv[locationid];
        //             if(datas && Utilit_.isIphone_())
        //             {
        //                 for(var i=0;i< datas.length;++i)
        //                 {
        //                     var data = datas[i];
        //                     for(var j=0;j < Share_ppxhc_Ad._iphoneIgnoreAppIds.length;++j)
        //                     {
        //                         if(data.appid == Share_ppxhc_Ad._iphoneIgnoreAppIds[j])
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
        //                     datas = self.sortDatas_(datas);
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
    Share_ppxhc_Ad.reportUserClick_ = function (advid) {
        // Share_ppxhc_Ad.reqUserClick_(advid,(res)=>
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
    Share_ppxhc_Ad.getRandomADPosID_ = function () {
        return Share_ppxhc_Ad.AdLocationids[Math.floor(Math.random() * Share_ppxhc_Ad.AdLocationids.length)];
    };
    Share_ppxhc_Ad.request_ = function (req) {
        // if (req.url.indexOf("https://") > -1 ||
        //     req.url.indexOf("http://") > -1) {
        //     req.url = req.url;
        // } else {
        //     req.url = Share_ppxhc_Ad.mainUrl_ + req.url;
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
        // xhr.once(Laya.Event.COMPLETE, Share_ppxhc_Ad, completeFunc);
        // xhr.once(Laya.Event.ERROR, Share_ppxhc_Ad, errorFunc);
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
        //             "versions", App_ppxhc_Config.ppxhc_Versions,
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
        //             "versions", App_ppxhc_Config.ppxhc_Versions,
        //         ]
        //     xhr.send(req.url,para,req.meth,null,header);
        // }
    };
    Share_ppxhc_Ad.getAdPosData_ = function (onSuccess, onFail) {
        // var req = new request_ppxhc_Data();
        // req.url = Share_ppxhc_Ad.getAdPostion_;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = App_ppxhc_Config.App_ppxhc_ID;
        // req.meth = "get";
        // Share_ppxhc_Ad.request_(req);
    };
    Share_ppxhc_Ad.reqUserClick_ = function (advid, onSuccess, onFail) {
        // var req = new request_ppxhc_Data();
        // req.url = Share_ppxhc_Ad.userClick;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = App_ppxhc_Config.App_ppxhc_ID;
        // req.data.uid  = User_ppxhc.openId;
        // req.data.advid  = advid ;
        // Share_ppxhc_Ad.request_(req);
    };
    Share_ppxhc_Ad.getADVData_ = function (locationid, onSuccess, onFail) {
        // var req = new request_ppxhc_Data();
        // req.url = Share_ppxhc_Ad.getAdv;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = App_ppxhc_Config.App_ppxhc_ID;
        // req.data.locationid = locationid;
        // req.data.preview = 0;
        // Share_ppxhc_Ad.request_(req);
    };
    /**
         * 随机跳转的方法，会从广告列表中随机得到一个AppId并且跳转,输入的参数为概率，大小在0-1之间
         * 如果概率大于1，则自动将其除以100，所以千万注意！
         *
         * @static
         * @param {number} [rate=1]
         * @memberof ShareAd
         */
    Share_ppxhc_Ad.RandomJump_ = function (rate) {
        if (rate === void 0) { rate = 1; }
        // console.log("随机跳转,rate：" + rate);
        // if (rate > 1) {
        //     rate = rate / 100;
        // }
        // let rd = Math.random();
        // if (rd <= rate) {
        //     var adLocationID = Share_ppxhc_Ad.LoopAdLocationID_;
        //     var Locations = 
        //     [
        //         Share_ppxhc_Ad.LoopAdLocationID_, 
        //         Share_ppxhc_Ad.InsertAdLocationID_, 
        //         Share_ppxhc_Ad.BannerAdLocationID_,
        //         Share_ppxhc_Ad.AniAdLocationID,
        //     ]
        //     if(Share_ppxhc_Ad.UseRandomAdPos_)
        //     {
        //         for(var i=0;i < Share_ppxhc_Ad.AdLocationids.length;++i)
        //         {
        //             Locations.push(Share_ppxhc_Ad.AdLocationids[i]);
        //         }
        //     }
        //     adLocationID = Locations[Math.floor(Math.random() * Locations.length)]
        //     var datas = Share_ppxhc_Ad.getADVs_(adLocationID, function (datas: Array<any>) {
        //         if (datas) {
        //             let rd = Math.floor(datas.length * Math.random());
        //             let data = datas[rd];
        //             console.log("跳转游戏： " + data.title);
        //             WXAPI_.navigateToMiniProgram_(data.appid, data.url, (res) => {
        //                 console.log("跳转成功")
        //                 Share_ppxhc_Ad.reportUserClick_(data.appid);
        //                 ALD_ppxhc.aldSendReportAdClickSuccess(data);
        //             }, (res) => {
        //                 console.log("跳转失败")
        //                 Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.AD_OnShareAdFail);
        //                 if (res.errMsg == "navigateToMiniProgram:fail cancel") {
        //                     console.log("用户取消跳转");
        //                     ALD_ppxhc.aldSendReportAdClickFail(data);
        //                 }
        //             }, (res) => {
        //                 console.log("跳转完成")
        //             });
        //         }
        //     }, true);
        // }
    };
    Share_ppxhc_Ad.isNeedShowAd = function () {
        // if(0 == AppSwitchConfig.getInstance().getAppSwitchData().adSwitch)
        //     return false;
        // if(Laya.Browser.onQGMiniGame)
        // {
        //     if(AppSwitchConfig.getInstance().getAppSwitchData().oppocfg.oppoversions != App_ppxhc_Config.ppxhc_Versions)
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
        //         flag = WXAPI_.getLaunchOptionsSync().query['chid'];
        //         scene  = WXAPI_.getLaunchOptionsSync().scene;             
        //     }
        //     else if(Laya.Browser.onQQMiniGame)
        //     {
        //         flag  = QQMiniGame_ppxhc_API.getLaunchOptionsSync().query['chid'];
        //         scene  = QQMiniGame_ppxhc_API.getLaunchOptionsSync().scene;
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
    Share_ppxhc_Ad.sortDatas_ = function (datas) {
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
    Share_ppxhc_Ad.mainUrl_ = "";
    Share_ppxhc_Ad.getAdPostion_ = ""; //获取广告位列表
    Share_ppxhc_Ad.getAdv = ""; //获取第三方广告列表
    Share_ppxhc_Ad.userClick = ""; //用户点击上报
    Share_ppxhc_Ad.LoopAdLocationID_ = 315; //广告轮播
    Share_ppxhc_Ad.BannerAdLocationID_ = 312;
    Share_ppxhc_Ad.InsertAdLocationID_ = 314; //更多好玩
    Share_ppxhc_Ad.AniAdLocationID = -1; //序列帧
    Share_ppxhc_Ad.HistoryLocationID_ = 313;
    Share_ppxhc_Ad.MoreGameLocationID = 314;
    Share_ppxhc_Ad.UseRandomAdPos_ = true;
    Share_ppxhc_Ad.AdLocationids = [
        315
    ];
    Share_ppxhc_Ad._adPosition = {};
    Share_ppxhc_Ad._adv = {};
    Share_ppxhc_Ad._iphoneIgnoreAppIds = [];
    return Share_ppxhc_Ad;
}());
exports.default = Share_ppxhc_Ad;
},{}],80:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShareAd_1 = require("../ShareAd");
var WXAPI_1 = require("../../WXAPI");
var ALD_1 = require("../../ALD");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var OPPOAPI_1 = require("../../OPPOAPI");
var QQMiniGameAPI_1 = require("../../QQMiniGameAPI");
var WXAPI_2 = require("../../WXAPI");
var QQMiniGameAPI_2 = require("../../QQMiniGameAPI");
var Banner_ppxhc_AdView = /** @class */ (function (_super) {
    __extends(Banner_ppxhc_AdView, _super);
    function Banner_ppxhc_AdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.AdPosID = ShareAd_1.default.BannerAdLocationID_;
        _this._data = null;
        _this._wxBanner = null;
        _this._onLoad = null;
        _this._onError = null;
        _this._onResize = null;
        return _this;
    }
    Banner_ppxhc_AdView.prototype.onAwake = function () {
        this._displaySp = this.owner.getChildByName("Display");
        if (null == this._displaySp) {
            this._displaySp = this.owner;
        }
    };
    Banner_ppxhc_AdView.prototype.onEnable = function () {
        this._displaySp.on(Laya.Event.CLICK, this, this.onSpClick);
        var banner = AppSwitchConfig_1.default.getInstance().getAppSwitchData().banner;
        if (0 == banner) {
            this.refreshBannerDis();
            var bannerRecreateTime = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerRecreateTime;
            Laya.timer.loop(bannerRecreateTime * 1000, this, this.refreshBannerDis);
        }
        else if (1 == banner) {
            this.refreshWXBanner();
            var bannerRecreateTime = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerRecreateTime;
            Laya.timer.loop(bannerRecreateTime * 1000, this, this.refreshWXBanner);
        }
    };
    Banner_ppxhc_AdView.prototype.onDisable = function () {
        this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
        this.clearWXBaner();
    };
    Banner_ppxhc_AdView.prototype.refreshBannerDis = function () {
        var self = this;
        ShareAd_1.default.getADVs_(this.AdPosID, function (datas) {
            if (datas && datas.length > 0) {
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._displaySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self._displaySp.destroyed) {
                        self._displaySp.width = 750;
                        self._displaySp.height = 256;
                    }
                }));
                self._data = data;
            }
        }, false);
    };
    Banner_ppxhc_AdView.prototype.onSpClick = function () {
        var data = this._data;
        if (data) {
            console.log("跳转游戏： " + data.title);
            if (Laya.Browser.onMiniGame) {
                WXAPI_1.default.navigateToMiniProgram_(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick_(data.appid);
                    ALD_1.default.aldSendReportAdClickSuccess(data);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_OnShareAdFail);
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
                    ShareAd_1.default.reportUserClick_(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
             {
                QQMiniGameAPI_1.default.navigateToMiniProgram_ppxhc(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick_(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
        }
    };
    Banner_ppxhc_AdView.prototype.refreshWXBanner = function () {
        if ((!Laya.Browser.onMiniGame && !Laya.Browser.onQQMiniGame)
            || !this.owner.visible)
            return;
        this.clearWXBaner();
        var self = this;
        var sysInfo = null;
        if (Laya.Browser.onMiniGame) {
            sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        }
        else if (Laya.Browser.onQQMiniGame) {
            sysInfo = Laya.Browser.window["qq"].getSystemInfoSync();
        }
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._displaySp.localToGlobal(new Laya.Point(0, 0));
        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WXBannerWidth ? this.WXBannerWidth / Laya.stage.width * sw : sw;
        if (Laya.Browser.onMiniGame) {
            var recreateBannerIDList = AppSwitchConfig_1.default.getInstance().getAppSwitchData().recreateBannerIDList;
            var bannerAdUnitId = recreateBannerIDList[Math.floor(Math.random() * recreateBannerIDList.length)];
            if (null == bannerAdUnitId) {
                bannerAdUnitId = WXAPI_2.default.bannerAdUnitId;
            }
            self._wxBanner = Laya.Browser.window["wx"].createBannerAd({
                adUnitId: bannerAdUnitId,
                adIntervals: 30,
                style: {
                    left: left,
                    top: top,
                    width: width,
                }
            });
            self._wxBanner.onLoad(function (res) {
                console.log("WXBanner广告 加载完成");
                console.log(res);
            });
            self._wxBanner.onError(function (err) {
                console.log("WXBanner广告 加载失败");
                console.log(err);
                self.refreshBannerDis();
                self.clearWXBaner();
            });
            self._wxBanner.onResize(function (res) {
            });
            self._wxBanner.show();
        }
        else if (Laya.Browser.onQQMiniGame) {
            var recreateBannerIDList = AppSwitchConfig_1.default.getInstance().getAppSwitchData().recreateBannerIDList;
            var bannerAdUnitId_1 = recreateBannerIDList[Math.floor(Math.random() * recreateBannerIDList.length)];
            if (null == bannerAdUnitId_1) {
                bannerAdUnitId_1 = QQMiniGameAPI_2.default.bannerAdUnitId;
            }
            self._wxBanner = Laya.Browser.window["qq"].createBannerAd({
                adUnitId: bannerAdUnitId_1,
                adIntervals: 30,
                style: {
                    left: left,
                    top: top,
                    width: width,
                }
            });
            if (null != self._wxBanner) {
                self._onLoad = function (res) {
                    console.log("QQBanner广告 加载完成 : ", bannerAdUnitId_1);
                    console.log(res);
                    self._wxBanner.show();
                };
                self._wxBanner.onLoad(self._onLoad);
                self._onError = function (err) {
                    console.log("QQBanner广告 加载失败 : ", bannerAdUnitId_1);
                    console.log(err);
                    self.refreshBannerDis();
                    self.clearWXBaner();
                };
                self._wxBanner.onError(self._onError);
                self._onResize = function (res) {
                };
                self._wxBanner.onResize(self._onResize);
            }
            else {
                self.refreshBannerDis();
            }
        }
    };
    Banner_ppxhc_AdView.prototype.clearWXBaner = function () {
        if (this._wxBanner) {
            this._wxBanner.offLoad(this._onLoad);
            this._wxBanner.offError(this._onError);
            this._wxBanner.offResize(this._onResize);
            this._wxBanner.destroy();
        }
        this._wxBanner = null;
    };
    Banner_ppxhc_AdView.prototype.onViewShow = function () {
        var banner = AppSwitchConfig_1.default.getInstance().getAppSwitchData().banner;
        if (1 == banner && null == this._wxBanner) {
            this.refreshWXBanner();
            var bannerRecreateTime = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerRecreateTime;
            Laya.timer.loop(bannerRecreateTime * 1000, this, this.refreshWXBanner);
        }
        else {
            this.refreshBannerDis();
            var bannerRecreateTime = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerRecreateTime;
            Laya.timer.loop(bannerRecreateTime * 1000, this, this.refreshBannerDis);
        }
    };
    Banner_ppxhc_AdView.prototype.onViewHide = function () {
        this.clearWXBaner();
        Laya.timer.clearAll(this);
    };
    Banner_ppxhc_AdView.prototype.onDestroy = function () {
        this.clearWXBaner();
        Laya.timer.clearAll(this);
    };
    return Banner_ppxhc_AdView;
}(Laya.Script));
exports.default = Banner_ppxhc_AdView;
},{"../../ALD":1,"../../Config/AppSwitchConfig":5,"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../OPPOAPI":77,"../../QQMiniGameAPI":78,"../../WXAPI":133,"../ShareAd":79}],81:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShareAd_1 = require("../ShareAd");
var LoopAdBox_1 = require("./LoopAdBox");
var Horizontal_ppxhc_LoopAdView = /** @class */ (function (_super) {
    __extends(Horizontal_ppxhc_LoopAdView, _super);
    function Horizontal_ppxhc_LoopAdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.AdPosID = ShareAd_1.default.LoopAdLocationID_;
        _this._scrollForward = true;
        return _this;
    }
    Horizontal_ppxhc_LoopAdView.prototype.onAwake = function () {
        this._list = this.owner.getChildByName("List");
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._list.hScrollBarSkin = "";
    };
    Horizontal_ppxhc_LoopAdView.prototype.onEnable = function () {
        var _this = this;
        var self = this;
        ShareAd_1.default.getADVs_(this.AdPosID, function (datas) {
            if (self.owner && !self.owner.destroyed) {
                if (datas && datas.length > 0 && datas.length < 50) {
                    var temp = [];
                    var counter = 0;
                    for (var i = 0; i < 50; ++i) {
                        if (counter >= datas.length) {
                            counter = 0;
                        }
                        temp.push(datas[counter]);
                        ++counter;
                    }
                    var groupLen = datas.length;
                    for (var i = 0; i < temp.length; ++i) {
                        var group = Math.floor(i / groupLen);
                        var startIndex = group * groupLen;
                        var randomIndex = Math.floor(Math.random() * groupLen) + startIndex;
                        var curValue = temp[i];
                        var randomValue = temp[randomIndex];
                        temp[randomIndex] = curValue;
                        temp[i] = randomValue;
                    }
                    _this._list.array = temp;
                }
                else {
                    _this._list.array = datas;
                }
            }
        });
    };
    Horizontal_ppxhc_LoopAdView.prototype.onDisable = function () {
    };
    Horizontal_ppxhc_LoopAdView.prototype.onUpdate = function () {
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
    Horizontal_ppxhc_LoopAdView.prototype.onListRender = function (cell, index) {
        var data = this._list.array[index];
        var loopAdBox = cell.getComponent(LoopAdBox_1.default);
        loopAdBox.setData(data);
    };
    return Horizontal_ppxhc_LoopAdView;
}(Laya.Script));
exports.default = Horizontal_ppxhc_LoopAdView;
},{"../ShareAd":79,"./LoopAdBox":82}],82:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WXAPI_1 = require("../../WXAPI");
var ShareAd_1 = require("../ShareAd");
var ALD_1 = require("../../ALD");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var OPPOAPI_1 = require("../../OPPOAPI");
var QQMiniGameAPI_1 = require("../../QQMiniGameAPI");
var Loop_ppxhc_AdBox = /** @class */ (function (_super) {
    __extends(Loop_ppxhc_AdBox, _super);
    function Loop_ppxhc_AdBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = null;
        _this._originW = 150;
        _this._originH = 150;
        _this._fontSize = 25;
        return _this;
    }
    Loop_ppxhc_AdBox.prototype.onAwake = function () {
        this._displaySp = this.owner.getChildByName("Display");
        this._originW = this._displaySp.width;
        this._originH = this._displaySp.height;
        this._disText = this.owner.getChildByName("TitelText");
        this._disText.text = "";
        this._fontSize = this._disText.fontSize;
    };
    Loop_ppxhc_AdBox.prototype.onEnable = function () {
        this._displaySp.on(Laya.Event.CLICK, this, this.onSpClick);
    };
    Loop_ppxhc_AdBox.prototype.onDisable = function () {
        this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
    };
    Loop_ppxhc_AdBox.prototype.setData = function (data) {
        if (data) {
            var self = this;
            this._displaySp.loadImage(data.logo, Laya.Handler.create(this, function () {
                if (!self._displaySp.destroyed) {
                    self._displaySp.width = self._originW;
                    self._displaySp.height = self._originH;
                }
            }));
            var str = String(data.title);
            var num = str.length;
            num = Math.max(5, num);
            var fontSize = Math.floor((5 / num) * this._fontSize);
            this._disText.fontSize = fontSize;
            this._disText.text = str;
            this._data = data;
        }
    };
    Loop_ppxhc_AdBox.prototype.onSpClick = function () {
        var data = this._data;
        if (data) {
            console.log("跳转游戏： " + data.title);
            if (Laya.Browser.onMiniGame) {
                WXAPI_1.default.navigateToMiniProgram_(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick_(data.appid);
                    ALD_1.default.aldSendReportAdClickSuccess(data);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_OnShareAdFail);
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
                    ShareAd_1.default.reportUserClick_(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
             {
                QQMiniGameAPI_1.default.navigateToMiniProgram_ppxhc(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUserClick_(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_OnShareAdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
        }
    };
    return Loop_ppxhc_AdBox;
}(Laya.Script));
exports.default = Loop_ppxhc_AdBox;
},{"../../ALD":1,"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../OPPOAPI":77,"../../QQMiniGameAPI":78,"../../WXAPI":133,"../ShareAd":79}],83:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("./AppConfig");
var AppConfig_2 = require("./AppConfig");
var ViewMgr_1 = require("./Mgr/ViewMgr");
var HttpUnit_1 = require("./Net/HttpUnit");
var TT_ppxhc_API = /** @class */ (function () {
    function TT_ppxhc_API() {
    }
    TT_ppxhc_API.ttLogin = function (onSuccess, onFail) {
        if (AppConfig_1.default.onTTMiniGame_ppxhc_) {
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
            TT_ppxhc_API.initRecord();
        }
    };
    TT_ppxhc_API.onRewardedVideoAdLoad_ppxhc = function () {
        console.log('激励视频 广告加载完成');
    };
    TT_ppxhc_API.onRewardedVideoAdError_ppxhc = function (err) {
        console.log('激励视频 广告加载失败' + err);
        if (TT_ppxhc_API._onRewardedVideoAdFailed) {
            TT_ppxhc_API._onRewardedVideoAdFailed();
        }
    };
    TT_ppxhc_API.onRewardedVideoAdClose_ppxhc = function (res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看');
            if (TT_ppxhc_API._onRewardedVideoAdClose) {
                TT_ppxhc_API._onRewardedVideoAdClose(true);
            }
        }
        else {
            console.log('激励视频 未完整观看');
            if (TT_ppxhc_API._onRewardedVideoAdClose) {
                TT_ppxhc_API._onRewardedVideoAdClose(false);
            }
        }
    };
    TT_ppxhc_API.regRewardedVideoAdEvent_ppxhc = function (rewardedVideoAd) {
        rewardedVideoAd.onLoad(TT_ppxhc_API.onRewardedVideoAdLoad_ppxhc);
        rewardedVideoAd.onError(TT_ppxhc_API.onRewardedVideoAdError_ppxhc);
        rewardedVideoAd.onClose(TT_ppxhc_API.onRewardedVideoAdClose_ppxhc);
        TT_ppxhc_API._isRegRewardedVideoAdEvent = true;
    };
    TT_ppxhc_API.showRewardedVideoAd_ppxhc = function (onAdClose, onFailed) {
        if (AppConfig_1.default.onTTMiniGame_ppxhc_) {
            TT_ppxhc_API._onRewardedVideoAdClose = onAdClose;
            TT_ppxhc_API._onRewardedVideoAdFailed = onFailed;
            var rewardedVideoAd = Laya.Browser.window["tt"].createRewardedVideoAd({
                adUnitId: TT_ppxhc_API.adUnitId,
            });
            if (!TT_ppxhc_API._isRegRewardedVideoAdEvent) {
                TT_ppxhc_API.regRewardedVideoAdEvent_ppxhc(rewardedVideoAd);
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
    TT_ppxhc_API.initRecord = function () {
        TT_ppxhc_API.record = Laya.Browser.window["tt"].getGameRecorderManager();
        if (TT_ppxhc_API.record != null) {
            TT_ppxhc_API.record.onStart(function (res) {
                console.log("录屏开始");
                TT_ppxhc_API.recordRes = "";
            });
            TT_ppxhc_API.record.onStop(function (res) {
                console.log("录屏结束");
                TT_ppxhc_API.recordRes = res.videoPath;
            });
        }
    };
    /**
     * 开始录屏
     */
    TT_ppxhc_API.startRecord = function (duration) {
        if (duration === void 0) { duration = 300; }
        if (!AppConfig_1.default.onTTMiniGame_ppxhc_)
            return;
        TT_ppxhc_API.record.start({
            duration: duration
        });
    };
    /**
    * 停止录屏
    */
    TT_ppxhc_API.stopRecord = function () {
        if (!AppConfig_1.default.onTTMiniGame_ppxhc_)
            return;
        TT_ppxhc_API.record.stop();
    };
    //----------------------------------------------------------------------
    //---------------------分享录屏----------------------------------------
    TT_ppxhc_API.shareRecord = function (callback, Failcallback) {
        if (callback === void 0) { callback = null; }
        if (Failcallback === void 0) { Failcallback = null; }
        if (!AppConfig_1.default.onTTMiniGame_ppxhc_)
            return;
        if (TT_ppxhc_API.recordRes != "") {
            window["tt"].shareAppMessage({
                channel: "video",
                extra: {
                    videoPath: TT_ppxhc_API.recordRes,
                    videoTopics: [AppConfig_2.default.GameName]
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
    TT_ppxhc_API.share = function (complate) {
        if (complate === void 0) { complate = null; }
        if (!AppConfig_1.default.onTTMiniGame_ppxhc_)
            return;
        window["tt"].shareAppMessage({
            templateId: TT_ppxhc_API._templateId,
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
    TT_ppxhc_API.showBanner = function () {
        if (!AppConfig_1.default.onTTMiniGame_ppxhc_ || TT_ppxhc_API.bannerAdUnitId.length <= 0)
            return;
        if (!TT_ppxhc_API._banner) {
            var _a = Laya.Browser.window["tt"].getSystemInfoSync(), windowWidth_1 = _a.windowWidth, windowHeight_1 = _a.windowHeight;
            var targetBannerAdWidth = 150;
            // 创建一个居于屏幕底部正中的广告
            TT_ppxhc_API._banner = Laya.Browser.window["tt"].createBannerAd({
                adUnitId: TT_ppxhc_API.bannerAdUnitId,
                adIntervals: 30,
                style: {
                    width: targetBannerAdWidth,
                    top: windowHeight_1 - (targetBannerAdWidth / 16) * 9,
                }
            });
            TT_ppxhc_API._banner.onResize(function (size) {
                console.log(size.width, size.height);
                TT_ppxhc_API._banner.style.top = windowHeight_1 - size.height;
                TT_ppxhc_API._banner.style.left = (windowWidth_1 - size.width) / 2;
            });
        }
        TT_ppxhc_API._banner.show();
    };
    TT_ppxhc_API.hideBanner = function () {
        if (null != TT_ppxhc_API._banner) {
            TT_ppxhc_API._banner.hide();
        }
    };
    TT_ppxhc_API.showMoreGamesModal = function (onSuccess, onFail) {
        var systemInfo = Laya.Browser.window["tt"].getSystemInfoSync();
        // iOS 不支持，建议先检测再使用
        if (systemInfo.platform !== "ios") {
            // 打开互跳弹窗
            Laya.Browser.window["tt"].showMoreGamesModal({
                appLaunchOptions: [
                    {
                        appId: AppConfig_2.default.App_ppxhc_ID,
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
    TT_ppxhc_API.autoOpenSignInView = function (complate) {
        HttpUnit_1.default.GetSignIn(function (res) {
            var isSign = res.data.is_sign;
            var signDays = res.data.sign_day_num;
            if (isSign == 0) {
                ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.TTSignInView, null, function () {
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
    TT_ppxhc_API.adUnitId = "";
    TT_ppxhc_API.bannerAdUnitId = "";
    TT_ppxhc_API.InsAdUnitId = "";
    TT_ppxhc_API._templateId = ""; //分享素材id
    TT_ppxhc_API.recordRes = "";
    TT_ppxhc_API._banner = null;
    //-------------------------激励视频---------------------------------
    TT_ppxhc_API._isRegRewardedVideoAdEvent = false;
    TT_ppxhc_API._onRewardedVideoAdFailed = null;
    TT_ppxhc_API._onRewardedVideoAdClose = null;
    return TT_ppxhc_API;
}());
exports.default = TT_ppxhc_API;
},{"./AppConfig":2,"./Mgr/ViewMgr":69,"./Net/HttpUnit":74}],84:[function(require,module,exports){
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
        this.selectiveSkin = 0;
        this.ownedSkins = [0]; //已解锁的皮肤
    }
    return UserGameData;
}());
exports.UserGameData = UserGameData;
var User_ppxhc = /** @class */ (function (_super) {
    __extends(User_ppxhc, _super);
    function User_ppxhc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(User_ppxhc, "isLogin", {
        get: function () {
            return (User_ppxhc.code != "") || (User_ppxhc.token != "");
        },
        enumerable: true,
        configurable: true
    });
    User_ppxhc.getSaveData = function () {
        return JSON.stringify(User_ppxhc._gameData);
    };
    User_ppxhc.testInitUser = function () {
        var storageStr = localStorage.getItem("Game_Data");
        console.log("读取存储数据 str----" + storageStr);
        var data = JSON.parse(storageStr);
        if (data == null) {
            User_ppxhc._gameData.levelNum = 1;
            User_ppxhc._gameData.moneyNum = 100;
            User_ppxhc._gameData.crystalNum = 100;
            User_ppxhc._gameData.selectiveSkin = 0;
            User_ppxhc._gameData.ownedSkins = [0];
            return;
        }
        User_ppxhc._gameData.levelNum = data.levelNum;
        User_ppxhc._gameData.moneyNum = data.moneyNum;
        User_ppxhc._gameData.crystalNum = data.crystalNum;
        if (null != data.unlockedItem) {
            var unlockedItem = data.unlockedItem;
            for (var i = 0; i < unlockedItem.length; ++i) {
                User_ppxhc._gameData.unlockedItem.push(unlockedItem[i]);
            }
        }
        if (null != data.usedItem) {
            User_ppxhc._gameData.usedItem = data.usedItem;
        }
        User_ppxhc._gameData.selectiveSkin = data.selectiveSkin == null ? 0 : data.selectiveSkin;
        User_ppxhc._gameData.ownedSkins = data.ownedSkins == null ? [0] : data.ownedSkins;
        if (typeof (User_ppxhc._gameData.selectiveSkin) != "number") {
            User_ppxhc._gameData.selectiveSkin = 0;
        }
        if (typeof (User_ppxhc._gameData.ownedSkins.unshift) == null) {
            User_ppxhc._gameData.ownedSkins = [0];
        }
    };
    User_ppxhc.initiUser = function (data) {
        if (data && 0 != data) {
            User_ppxhc._gameData.levelNum = data.levelNum;
            User_ppxhc._gameData.moneyNum = data.moneyNum;
            User_ppxhc._gameData.crystalNum = data.crystalNum;
            if (null != data.unlockedItem) {
                var unlockedItem = data.unlockedItem;
                for (var i = 0; i < unlockedItem.length; ++i) {
                    User_ppxhc._gameData.unlockedItem.push(unlockedItem[i]);
                }
            }
            if (null != data.usedItem) {
                User_ppxhc._gameData.usedItem = data.usedItem;
            }
            User_ppxhc._gameData.selectiveSkin = data.selectiveSkin == null ? 0 : data.selectiveSkin;
            User_ppxhc._gameData.ownedSkins = data.ownedSkins == null ? [0] : data.ownedSkins;
            if (typeof (User_ppxhc._gameData.selectiveSkin) != "number") {
                User_ppxhc._gameData.selectiveSkin = 0;
            }
            if (typeof (User_ppxhc._gameData.ownedSkins.unshift) == null) {
                User_ppxhc._gameData.ownedSkins = [0];
            }
        }
        else {
            //todo：处理没有获取到玩家数据的情况
            User_ppxhc._gameData.levelNum = 1;
            User_ppxhc._gameData.moneyNum = 0;
            User_ppxhc._gameData.crystalNum = 0;
            User_ppxhc._gameData.selectiveSkin = 0;
            User_ppxhc._gameData.ownedSkins = [0];
        }
        console.log(User_ppxhc._gameData);
    };
    User_ppxhc.set_ppxhc_LeveNum = function (levelNum) {
        User_ppxhc._gameData.levelNum = levelNum;
    };
    User_ppxhc.get_ppxhc_LeveNum = function () {
        return User_ppxhc._gameData.levelNum;
    };
    User_ppxhc.add_ppxhc_Money = function (add) {
        add = Math.ceil(add);
        var last = User_ppxhc._gameData.moneyNum;
        User_ppxhc._gameData.moneyNum += add;
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Game_OnUserMoneyChange, {
            curr: User_ppxhc._gameData.moneyNum,
            last: last
        });
    };
    User_ppxhc.sub_ppxhc_Money = function (sub) {
        sub = Math.ceil(sub);
        var last = User_ppxhc._gameData.moneyNum;
        User_ppxhc._gameData.moneyNum -= sub;
        if (User_ppxhc._gameData.moneyNum < 0) {
            User_ppxhc._gameData.moneyNum = 0;
        }
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Game_OnUserMoneyChange, {
            curr: User_ppxhc._gameData.moneyNum,
            last: last
        });
    };
    User_ppxhc.get_ppxhc_Money = function () {
        return User_ppxhc._gameData.moneyNum;
    };
    User_ppxhc.add_ppxhc_Crystal = function (add) {
        add = Math.ceil(add);
        var last = User_ppxhc._gameData.crystalNum;
        User_ppxhc._gameData.crystalNum += add;
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Game_OnUserCrystalChange, {
            curr: User_ppxhc._gameData.crystalNum,
            last: last
        });
    };
    User_ppxhc.sub_ppxhc_Crystal = function (sub) {
        sub = Math.ceil(sub);
        var last = User_ppxhc._gameData.crystalNum;
        User_ppxhc._gameData.crystalNum -= sub;
        if (User_ppxhc._gameData.crystalNum < 0) {
            User_ppxhc._gameData.crystalNum = 0;
        }
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Game_OnUserCrystalChange, {
            curr: User_ppxhc._gameData.crystalNum,
            last: last
        });
    };
    User_ppxhc.get_ppxhc_Crystal = function () {
        return User_ppxhc._gameData.crystalNum;
    };
    User_ppxhc.add_ppxhc_Skin = function (skinType) {
        var index = User_ppxhc._gameData.ownedSkins.indexOf(skinType);
        if (index != -1) {
            return;
        }
        User_ppxhc._gameData.ownedSkins.push(skinType);
    };
    User_ppxhc.Check_ppxhc_OwnedSkin = function (skinType) {
        var index = User_ppxhc._gameData.ownedSkins.indexOf(skinType);
        return index != -1;
    };
    User_ppxhc.GetOwnedSkin = function () {
        return User_ppxhc._gameData.ownedSkins;
    };
    User_ppxhc.GetSelectiveSkin = function () {
        return User_ppxhc._gameData.selectiveSkin;
    };
    User_ppxhc.SetSelectiveSkin = function (skinType, needDispatch) {
        var oldSkin = User_ppxhc._gameData.selectiveSkin;
        User_ppxhc._gameData.selectiveSkin = skinType;
        if (oldSkin != skinType && needDispatch) {
            EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Car_Change, skinType);
        }
    };
    //获取当前商店解锁的道具
    User_ppxhc.getItemUnlocked = function () {
        var unlocked = new Array();
        for (var i = 0; i < User_ppxhc._gameData.unlockedItem.length; ++i) {
            unlocked.push(User_ppxhc._gameData.unlockedItem[i]);
        }
        return unlocked;
    };
    //商店道具是否解锁
    User_ppxhc.itemIsUnlocked = function (id) {
        for (var i = 0; i < User_ppxhc._gameData.unlockedItem.length; ++i) {
            if (User_ppxhc._gameData.unlockedItem[i] == id) {
                return true;
            }
        }
        return false;
    };
    //解锁商店道具
    User_ppxhc.unlockItem = function (id) {
        if (User_ppxhc.itemIsUnlocked(id)) {
            console.log("商店重复解锁 id : ", id);
            return;
        }
        User_ppxhc._gameData.unlockedItem.push(id);
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Game_OnUserUnlockedStore, { unlocked: id });
    };
    Object.defineProperty(User_ppxhc, "curUsedItem", {
        //当前正在使用的道具
        get: function () {
            return User_ppxhc._gameData.usedItem;
        },
        //当前正在使用的道具
        set: function (value) {
            User_ppxhc._gameData.usedItem = value;
        },
        enumerable: true,
        configurable: true
    });
    User_ppxhc.code = "";
    User_ppxhc.openId = "";
    User_ppxhc.token = null;
    User_ppxhc.nickName = "";
    User_ppxhc.gender = 0;
    User_ppxhc._gameData = new UserGameData();
    return User_ppxhc;
}(Laya.Script));
exports.default = User_ppxhc;
},{"../Event/EventDef":7,"../Event/EventMgr":8}],85:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utilit_ = /** @class */ (function () {
    function Utilit_() {
    }
    Utilit_.Lerp_ = function (form, to, delta) {
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
    Utilit_.lerpEulerAngle_ = function (form, to, delta) {
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
        var next = Utilit_.Lerp_(form, to, delta);
        return next;
    };
    Utilit_.getRotationByDir_ = function (v) {
        var dotValue = (v.x * Utilit_.poinDown.x) + (v.y * Utilit_.poinDown.y);
        var cos = dotValue / (v.distance(0, 0) * Utilit_.poinDown.distance(0, 0));
        var radian = Math.acos(cos);
        var rotation = radian / (2 * Math.PI) * 360;
        if (v.x < 0) {
            rotation = -rotation;
        }
        return rotation;
    };
    Utilit_.getRotationByDirOn3DSpace_ = function (v) {
        var dotValue = (v.x * Utilit_.poinUp.x) + (v.y * Utilit_.poinUp.y);
        var cos = dotValue / (v.distance(0, 0) * Utilit_.poinUp.distance(0, 0));
        var radian = Math.acos(cos);
        var rotation = radian / (2 * Math.PI) * 360;
        if (v.x < 0) {
            rotation = rotation + (180 - rotation) * 2;
        }
        return rotation;
    };
    Utilit_.getDirByRotation_ = function (rotation) {
        var radian = (rotation - 90) * Math.PI / 180; // -90 是转换到场景坐标系
        var x = Math.cos(radian);
        var y = Math.sin(radian);
        var point = new Laya.Point(x, y);
        point.normalize();
        return point;
    };
    Utilit_.getDirDirAngle_ = function (dir1, dir2) {
        var dotValue = (dir1.x * dir2.x) + (dir1.y * dir2.y);
        var cos = dotValue / (dir1.distance(0, 0) * dir2.distance(0, 0));
        var radian = Math.acos(cos);
        var angle = radian / (2 * Math.PI) * 360;
        return angle;
    };
    Utilit_.getDirScalarLength_ = function (dir) {
        var sl = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        return sl;
    };
    Utilit_.setSpOnParentCenter_ = function (sp) {
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
    Utilit_.getPointToLineDistance_ = function (x, y, LineStart, LineEnd) {
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
    Utilit_.isIphoneX_ = function () {
        if (!Laya.Browser.onIPhone)
            return false;
        if ((Laya.Browser.width == 2436 && Laya.Browser.height == 1125)
            || (Laya.Browser.height == 2436 && Laya.Browser.width == 1125)) {
            return true;
        }
        return false;
    };
    Utilit_.isIphone_ = function () {
        return Laya.Browser.onIPhone;
    };
    Utilit_.getChild_ = function (node, name) {
        for (var i = 0; i < node.numChildren; ++i) {
            var child = node.getChildAt(i);
            if (child.name == name) {
                return child;
            }
            else {
                var target = Utilit_.getChild_(child, name);
                if (target)
                    return target;
            }
        }
        return null;
    };
    Utilit_.forEachChild = function (node, each) {
        for (var i = 0; i < node.numChildren; ++i) {
            var child = node.getChildAt(i);
            each(child);
            Utilit_.forEachChild(child, each);
        }
    };
    Utilit_.LerpNumber = function (num1, num2, t) {
        return num1 + t * (num2 - num1);
    };
    Utilit_.Vector3Angle = function (to, form, axis) {
        if (axis === void 0) { axis = 1; }
        to = to.clone();
        Laya.Vector3.normalize(to, to);
        form = form.clone();
        Laya.Vector3.normalize(form, form);
        var dot = Laya.Vector3.dot(to, form);
        dot = Math.max(-1, Math.min(1, dot));
        Utilit_.isZero(dot) && (dot = 0);
        var angle = Math.acos(dot) * (180 / Math.PI);
        var cross = new Laya.Vector3;
        Laya.Vector3.cross(to, form, cross);
        switch (axis) {
            case 0:
                cross.x < 0 && (angle *= -1);
                break;
            case 1:
                cross.y < 0 && (angle *= -1);
                break;
            case 2:
                cross.z < 0 && (angle *= -1);
                break;
            default:
                cross.y < 0 && (angle *= -1);
                break;
        }
        return Utilit_.isZeroByValue(angle, 0.1) ? 0 : angle;
    };
    Utilit_.TransformPoint = function (transform, position, out) {
        var mat = transform.worldMatrix;
        Laya.Vector3.transformV3ToV3(position, mat, out);
    };
    Utilit_.InverseTransformPoint = function (transform, position, out) {
        var mat = new Laya.Matrix4x4;
        transform.worldMatrix.invert(mat);
        Laya.Vector3.transformV3ToV3(position, mat, out);
    };
    Utilit_.QuaternionEuler = function (x, y, z, rotation) {
        var angleToRadian = 180 / Math.PI;
        Laya.Quaternion.createFromYawPitchRoll(y / angleToRadian, x / angleToRadian, z / angleToRadian, rotation);
    };
    Utilit_.QuaternionVector3 = function (rotation, point, res) {
        // let x = rotation.x * 2.0;
        // let y = rotation.y * 2.0;
        // let z = rotation.z * 2.0;
        // let xx = rotation.x * x;
        // let yy = rotation.y * y;
        // let zz = rotation.z * z;
        // let xy = rotation.x * y;
        // let xz = rotation.x * z;
        // let yz = rotation.y * z;
        // let wx = rotation.w * x;
        // let wy = rotation.w * y;
        // let wz = rotation.w * z;
        // res.x = (1 - (yy + zz)) * point.x + (xy - wz) * point.y + (xz + wy) * point.z;
        // res.y = (xy + wz) * point.x + (1 - (xx + zz)) * point.y + (yz - wx) * point.z;
        // res.z = (xz - wy) * point.x + (yz + wx) * point.y + (1 - (xx + yy)) * point.z;
        // res.x = this.isZero(res.x) ? 0 : res.x;
        // res.y = this.isZero(res.y) ? 0 : res.y;
        // res.z = this.isZero(res.z) ? 0 : res.z;
        var mat = new Laya.Matrix4x4;
        Laya.Matrix4x4.createFromQuaternion(rotation, mat);
        Laya.Vector3.transformV3ToV3(point, mat, res);
        return res;
    };
    Utilit_.FromToRotation = function (from, to, out) {
        Laya.Vector3.normalize(from, from);
        Laya.Vector3.normalize(to, to);
        ;
        var d = Laya.Vector3.dot(from, to);
        if (d >= 1.0) {
            return new Laya.Quaternion;
        }
        if (d < (1e-6 - 1.0)) {
            var axis = new Laya.Vector3;
            Laya.Vector3.cross(new Laya.Vector3(1, 0, 0), from, axis);
            if (Utilit_.isVectorZeroLength(axis)) { }
            Laya.Vector3.cross(new Laya.Vector3(0, 1, 0), from, axis);
            Laya.Vector3.normalize(axis, axis);
            Laya.Quaternion.createFromAxisAngle(axis, 180, out);
        }
        else {
            var s = Math.sqrt((1 + d) * 2);
            var invs = 1 / s;
            var c = new Laya.Vector3;
            Laya.Vector3.cross(from, to, c);
            out.x = c.x * invs;
            out.y = c.y * invs;
            out.z = c.z * invs;
            out.w = s * 0.5;
            out.normalize(out);
        }
        return out;
    };
    Utilit_.isVectorZeroLength = function (v) {
        var sqlen = (v.x * v.x) + (v.y * v.y) + (v.z * v.z);
        return (sqlen < (1e-06 * 1e-06));
    };
    Utilit_.isZero = function (v) {
        return Math.abs(v) < 1e-6;
    };
    Utilit_.isZeroByValue = function (v, c) {
        return Math.abs(v) < c;
    };
    Utilit_.VectorZere = function (res) {
        res.x = Utilit_.isZero(res.x) ? 0 : res.x;
        res.y = Utilit_.isZero(res.y) ? 0 : res.y;
        res.z = Utilit_.isZero(res.z) ? 0 : res.z;
    };
    Utilit_.QuaternionNorm = function (q, out) {
        var len = q.w * q.w + q.x * q.x + q.y * q.y + q.z * q.z;
        var factor = 1.0 / Math.sqrt(len);
        out.x = q.x * factor;
        out.y = q.y * factor;
        out.z = q.z * factor;
        out.w = q.w * factor;
    };
    Utilit_.Sign = function (f) {
        return f >= 0 ? 1 : -1;
    };
    Utilit_.Clamp01 = function (value) {
        if (value < 0)
            return 0;
        else if (value > 1)
            return 1;
        else
            return value;
    };
    Utilit_.Clamp = function (value, min, max) {
        if (value < min)
            return min;
        else if (value > max)
            return max;
        else
            return value;
    };
    Utilit_.FindChild = function (node, name) {
        var strArg = name.split("/");
        for (var i = 0; i < strArg.length; i++) {
            name = strArg[i];
            node = node.getChildByName(name);
            if (node == null) {
                return null;
            }
        }
        return node;
    };
    Utilit_.getAnimationClip = function (animator, layerIndex, clipName) {
        var layerControler = animator.getControllerLayer(layerIndex);
        var animatorState = layerControler._statesMap[clipName];
        return animatorState.clip;
    };
    Utilit_.getRandomInt = function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    };
    Utilit_.GetArrDifference = function (arr1, arr2) {
        return arr1.concat(arr2).filter(function (v, i, arr) {
            return arr.indexOf(v) === arr.lastIndexOf(v);
        });
    };
    Utilit_.OriginStageWidth = 1334;
    Utilit_.OriginStageHeight = 750;
    Utilit_.grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0, 0, 0, 1, 0];
    Utilit_.grayscaleFilter = new Laya.ColorFilter(Utilit_.grayscaleMat);
    Utilit_.poinDown = new Laya.Point(0, -1);
    Utilit_.poinUp = new Laya.Point(0, 1);
    return Utilit_;
}());
exports.default = Utilit_;
},{}],86:[function(require,module,exports){
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
            SoundMgr_1.default.instance_.stop_ppxhc_BGM();
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
                    from: AppConfig_1.default.App_ppxhc_ID
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
        if (1 == yuanshengSwitch && vivoVersions == AppConfig_2.default.ppxhc_Versions) {
            ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.VVNativeView1, null, function (v) {
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
        if (1 == yuanshengSwitch && vivoVersions == AppConfig_2.default.ppxhc_Versions) {
            ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.VVNativeView2, null, function (v) {
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
},{"./AppConfig":2,"./Config/AppSwitchConfig":5,"./Mgr/SoundMgr":67,"./Mgr/ViewMgr":69}],87:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SoundMgr_1 = require("../Mgr/SoundMgr");
var Button_ppxhc_Anim = /** @class */ (function (_super) {
    __extends(Button_ppxhc_Anim, _super);
    function Button_ppxhc_Anim() {
        var _this = _super.call(this) || this;
        _this.useSound = true;
        return _this;
    }
    Button_ppxhc_Anim.prototype.onAwake = function () {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.onDown);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.onUp);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.onUp);
    };
    Button_ppxhc_Anim.prototype.onDisable = function () {
        this.owner.offAll();
        Laya.Tween.clearAll(this);
    };
    Button_ppxhc_Anim.prototype.onDown = function () {
        Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
        if (this.useSound) {
            SoundMgr_1.default.instance_.play_ppxhc_Sound("anniu");
        }
    };
    Button_ppxhc_Anim.prototype.onUp = function () {
        Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
    };
    return Button_ppxhc_Anim;
}(Laya.Script));
exports.default = Button_ppxhc_Anim;
},{"../Mgr/SoundMgr":67}],88:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../View/ViewBase");
var EventDef_1 = require("../../Event/EventDef");
var EventMgr_1 = require("../../Event/EventMgr");
var CachedWXBannerAd_1 = require("../../CachedWXBannerAd");
/**
 * 狂点窗口使用范例如下
    //首先判断狂点功能开关WudianMgr.WudianFlag是否打开，如果没打开就直接跳过整个逻辑
    WudianMgr.GetIpBlockState();//在游戏里初始化的时候调用这个方法初始化Ip屏蔽flag
    //将这段代码插入需要调用狂点窗口的地方
    let data : any = {};
    //狂点逻辑完成后的回调方法
    data.Complete = function(){
        console.log("狂点按钮结束");//在这里写入狂点窗口结束后需要调用的逻辑，例如弹出结算页面
    }
    // 完成点击之后获得的奖励数量，依照各项目不同自行实现
    data.PrizeCount = 30;
    // 在调用窗口前必须关闭当前正在显示的官方Banner广告，这个窗口才能正常运行，具体的逻辑各人需自行实现
    // 而且关闭官方Banner可以稍微提早一些，避免频繁调用出错或者不稳定
    Event_PK_Mgr.instance.dispatch(Event_PK_Def.AD_CloseBanner, true);//这句代码是我用来关闭官方Banner，各项目自行实现
    ViewMgr.instance.openView(ViewDef.ClickGetPrize,data);
 *
 * @export
 * @class ClickGetPrize
 * @extends {ViewBase}
 */
var Click_ppxhc_GetPrize = /** @class */ (function (_super) {
    __extends(Click_ppxhc_GetPrize, _super);
    function Click_ppxhc_GetPrize() {
        var _this = _super.call(this) || this;
        _this._totalClickTimer = 22; //用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
        _this._needClickTime = 10; //一共点多少次能够获得奖励，用于显示进度条
        _this._bannerClickTime = 7; //点多少次开始显示bannerr套路用户，可微调    
        return _this;
    }
    // private _wudianLoadFlag: boolean;
    Click_ppxhc_GetPrize.prototype.onAwake = function () {
        this._click_Btn = this.owner.getChildByName("Click_Btn");
        this._click_Btn.on(Laya.Event.CLICK, this, this.ButtonClicked);
        this._arrow_Img = this._click_Btn.getChildByName("Arrow_Img");
        this._bg = this.owner.getChildByName("BG");
        this._open_Btn = this._bg.getChildByName("Open_Btn");
        this._getPrize_View = this.owner.getChildByName("GetPrize_View");
        this._prizeCount_Text = this._getPrize_View.getChildByName("PrizeCount_Text");
        this._confirm_Btn = this._getPrize_View.getChildByName("Confirm_Btn");
        this._getPrize_View.visible = false;
        this._clickTime_PBar = this._bg.getChildByName("ClickTime_PBar");
        this._clickTime_PBar$Bar = this._clickTime_PBar.getChildByName("ClickTime_PBar$Bar");
        this._clickBarOriginalWidth = this._clickTime_PBar$Bar.width;
        this._bannerAd_View = this.owner.getChildByName("BannerAd_View");
        this._clickTime_PBar$Bar.width = 0;
        this._clickTime = 0;
        this._totalClickTime = 0;
        //EventMgr.instance.regOnceEvent(EventDef.AD_WudianBanner_LoadComplete, this, this.WudianLoadComplete);
    };
    Click_ppxhc_GetPrize.prototype.onUpdate = function () {
        /* 箭头上下移动 */
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
        /* 按钮不按，进度条自动退回 */
        if (!this._bannerClicked) {
            var spd = 2 + (this._clickTime_PBar$Bar.width / this._clickBarOriginalWidth) * 6;
            if (this._clickTime_PBar$Bar.width >= spd) {
                this._clickTime_PBar$Bar.width -= spd;
            }
            if ((this._clickTime_PBar$Bar.width / this._clickBarOriginalWidth) + 0.1 < (this._clickTime / this._needClickTime)) {
                this._clickTime--;
            }
        }
        // else {
        //     if (this._clickTime_PBar$Bar.width <= this._clickBarOriginalWidth) {
        //         this._clickTime_PBar$Bar.width += 2;
        //         if (this._clickTime_PBar$Bar.width > this._clickBarOriginalWidth) {
        //             this._clickTime_PBar$Bar.width = this._clickBarOriginalWidth
        //         }
        //     }
        // }
    };
    /**
     * 打开Banner
     *
     * @param {*} [data]
     * @memberof ClickGetPrize
     */
    Click_ppxhc_GetPrize.prototype.openView = function (data) {
        this._compeletFunction = data.Complete;
        this._prizeCount = data.PrizeCount;
        _super.prototype.openView.call(this, data);
    };
    /**
     * 用户成功获得奖励
     *
     * @memberof ClickGetPrize
     */
    Click_ppxhc_GetPrize.prototype.OpenPrizeWindow = function () {
        this._bg.visible = false;
        var self = this;
        this._prizeCount_Text.text = this._prizeCount.toString();
        this._getPrize_View.visible = true;
        /* 确认按钮 */
        this._confirm_Btn.once(Laya.Event.CLICK, this, function () {
            if (self._compeletFunction) {
                self._compeletFunction();
            }
            self.closeView();
        });
    };
    /**
     * 误点预加载完成
     *
     * @memberof ClickGetPrize
     */
    // WudianLoadComplete() {
    //     console.log("WudianBanner预加载完毕");
    //     this._wudianLoadFlag = true;
    // }
    /**
     * 将Banner显示
     *
     * @memberof ClickGetPrize
     */
    Click_ppxhc_GetPrize.prototype.ShowBanner = function () {
        console.log("AD_WudianBanner_Show");
        CachedWXBannerAd_1.default.show();
    };
    /**
     * 狂点按钮逻辑
     *
     *
     * @memberof ClickGetPrize
     */
    Click_ppxhc_GetPrize.prototype.ButtonClicked = function () {
        this._clickTime++;
        this._totalClickTime++;
        //nanner一直没加载成功,保持进度条
        if (this._clickTime > this._needClickTime) {
            this._clickTime = this._needClickTime;
        }
        if (this._clickTime >= this._bannerClickTime /*&& this._wudianLoadFlag*/) {
            if (this._clickTime >= this._needClickTime) {
                this._clickTime = this._needClickTime - 1;
            }
            this._bannerClicked = true;
            console.log("误点Banner套路启动");
            //用户连点，出banner
            this.ShowBanner();
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        //用户一直没被套路到，让他继续玩
        else if (this._totalClickTime > this._totalClickTimer) {
            console.log("用户一直没点到，放他一马", this._totalClickTime);
            this.BannerClicked();
        }
        var progress = (this._clickTime / this._needClickTime) * this._clickBarOriginalWidth;
        this._clickTime_PBar$Bar.width = progress;
    };
    /**
     * Banner已经点击之后，让用户获得奖励
     *
     * @memberof ClickGetPrize
     */
    Click_ppxhc_GetPrize.prototype.BannerClicked = function () {
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_WudianBanner_Hide);
        this._bannerClicked = true;
        this._clickTime = this._needClickTime;
        this._clickTime_PBar$Bar.width = this._clickBarOriginalWidth;
        this._click_Btn.visible = false;
        this._open_Btn.visible = true;
        // this._bannerAd_View.visible = false;
        // this._bannerAd_View.active = false;
        this.OpenPrizeWindow();
    };
    Click_ppxhc_GetPrize.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        CachedWXBannerAd_1.default.hide();
    };
    return Click_ppxhc_GetPrize;
}(ViewBase_1.default));
exports.default = Click_ppxhc_GetPrize;
},{"../../CachedWXBannerAd":4,"../../Event/EventDef":7,"../../Event/EventMgr":8,"../../View/ViewBase":132}],89:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BannerAdView_1 = require("../../ShareAd/View/BannerAdView");
var Universal_ppxhc_BottomZone = /** @class */ (function (_super) {
    __extends(Universal_ppxhc_BottomZone, _super);
    function Universal_ppxhc_BottomZone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Universal_ppxhc_BottomZone.prototype.onAwake = function () {
        this._owner_ppxhc_Sprite = this.owner;
        this._auto_ppxhc_Zone = this._owner_ppxhc_Sprite.getChildByName("AutoZone");
        this._loop_ppxhc_ADZone = this._owner_ppxhc_Sprite.getChildByName("LoopAD");
        this._banner_ppxhc_ADZone = this._owner_ppxhc_Sprite.getChildByName("BannerAD");
        this._banner_ppxhc_Ad = this._banner_ppxhc_ADZone.getComponent(BannerAdView_1.default);
    };
    Universal_ppxhc_BottomZone.prototype.onEnable = function () {
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            this._auto_ppxhc_Zone.bottom = this._loop_ppxhc_ADZone.height + this._banner_ppxhc_ADZone.height;
            this._loop_ppxhc_ADZone.bottom = this._banner_ppxhc_ADZone.height;
            this._banner_ppxhc_ADZone.visible = true;
        }
        else {
            this._auto_ppxhc_Zone.bottom = this._loop_ppxhc_ADZone.height;
            this._loop_ppxhc_ADZone.bottom = 0;
            this._banner_ppxhc_ADZone.visible = false;
        }
    };
    Universal_ppxhc_BottomZone.prototype.onDisable = function () {
    };
    Universal_ppxhc_BottomZone.prototype.onUpdate = function () {
        if (!this._banner_ppxhc_ADZone.visible) {
            this._banner_ppxhc_Ad.clearWXBaner();
        }
    };
    return Universal_ppxhc_BottomZone;
}(Laya.Script));
exports.default = Universal_ppxhc_BottomZone;
},{"../../ShareAd/View/BannerAdView":80}],90:[function(require,module,exports){
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
},{}],91:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var Game_1 = require("../../Game/Game");
var TestGame = /** @class */ (function (_super) {
    __extends(TestGame, _super);
    function TestGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestGame.prototype.onAwake = function () {
        this.playButton = this.owner.getChildByName("PlayButton");
        this.resetButton = this.owner.getChildByName("ResetButton");
        this.playButton.on(Laya.Event.CLICK, this, this.OnPlayButton);
        this.resetButton.on(Laya.Event.CLICK, this, this.OnResetButton);
    };
    TestGame.prototype.OnPlayButton = function () {
        Game_1.default.PlayGame();
    };
    TestGame.prototype.OnResetButton = function () {
        Game_1.default.ResetGame();
    };
    return TestGame;
}(ViewBase_1.default));
exports.default = TestGame;
},{"../../Game/Game":17,"../ViewBase":132}],92:[function(require,module,exports){
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
},{}],93:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var Loading_ppxhc_View = /** @class */ (function (_super) {
    __extends(Loading_ppxhc_View, _super);
    function Loading_ppxhc_View() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._processWidth = 0;
        _this._logo_ppxhc_Ani = null;
        return _this;
    }
    Loading_ppxhc_View.prototype.onAwake = function () {
        this._ppxhc_bg = this.owner.getChildByName("Bg");
        this._bottom_ppxhc_Zone = this._ppxhc_bg.getChildByName("BottomZone");
        this._process_ppxhc_BarBg = this._bottom_ppxhc_Zone.getChildByName("processBarBg");
        this._process_ppxhc_Bar = this._process_ppxhc_BarBg.getChildByName("processBar");
        this._processWidth = this._process_ppxhc_Bar.width;
    };
    Loading_ppxhc_View.prototype.onStart = function () {
    };
    Loading_ppxhc_View.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
    };
    Loading_ppxhc_View.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    Loading_ppxhc_View.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    Loading_ppxhc_View.prototype.onUpdate = function () {
        this._ppxhc_bg.width = Laya.stage.width;
        this._ppxhc_bg.height = Laya.stage.height;
    };
    Loading_ppxhc_View.prototype.setProcess = function (process) {
        if (process < 0)
            process = 0;
        if (process > 1)
            process = 1;
        var width = this._processWidth * process;
        if (width < 1)
            width = 1;
        this._process_ppxhc_Bar.width = width;
    };
    return Loading_ppxhc_View;
}(ViewBase_1.default));
exports.default = Loading_ppxhc_View;
},{"../ViewBase":132}],94:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var Utilit_1 = require("../../../Utilit");
var QQTemplateViewBase_1 = require("../QQTemplateViewBase");
var QQMiniGameAPI_1 = require("../../../QQMiniGameAPI");
var AppConfig_1 = require("../../../AppConfig");
var QQGameFailViewTemplate_ppxhc = /** @class */ (function (_super) {
    __extends(QQGameFailViewTemplate_ppxhc, _super);
    function QQGameFailViewTemplate_ppxhc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone_ppxhc = null;
        _this._backBtn_ppxhc = null;
        _this._continueBtn_ppxhc = null;
        _this._clickTag_ppxhc = false;
        _this._clickTimingTag_ppxhc = false;
        return _this;
    }
    QQGameFailViewTemplate_ppxhc.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._centerZone_ppxhc = this.View.getChildByName("CenterZone");
        if (Utilit_1.default.isIphoneX_()) {
            this._centerZone_ppxhc.top = this._centerZone_ppxhc.top + 75;
        }
        this._backBtn_ppxhc = this._centerZone_ppxhc.getChildByName("BackBtn");
        this._continueBtn_ppxhc = this._centerZone_ppxhc.getChildByName("ContinueBtn");
    };
    QQGameFailViewTemplate_ppxhc.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        var self = this;
        if (WudianMgr_1.default.Wudian_ppxhc_Flag && AppConfig_1.default.ppxhc_Versions == AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.qqversions) {
            if (1 == AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.weiyi) {
                var yPos = this._centerZone_ppxhc.height - 150;
                this._backBtn_ppxhc.y = yPos;
                this._continueBtn_ppxhc.y = yPos;
            }
            var excute_1 = function () {
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, self, self.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, self, self.BtnUp);
            };
            if (1 == AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.box) {
                QQMiniGameAPI_1.default.showAppBoxAd(function () {
                    excute_1();
                }, function () {
                    excute_1();
                });
            }
            else {
                excute_1();
            }
        }
    };
    QQGameFailViewTemplate_ppxhc.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._backBtn_ppxhc.on(Laya.Event.CLICK, this, this.onBackBtn);
        this._continueBtn_ppxhc.on(Laya.Event.CLICK, this, this.onContinueBtn);
    };
    QQGameFailViewTemplate_ppxhc.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._backBtn_ppxhc.off(Laya.Event.CLICK, this, this.onBackBtn);
        this._continueBtn_ppxhc.off(Laya.Event.CLICK, this, this.onContinueBtn);
    };
    QQGameFailViewTemplate_ppxhc.prototype.onBackBtn = function () {
        if (!this._clickTag_ppxhc && WudianMgr_1.default.Wudian_ppxhc_Flag) {
            var self = this;
            if (!this._clickTimingTag_ppxhc) {
                this._clickTimingTag_ppxhc = true;
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        //todo:你的代码
    };
    QQGameFailViewTemplate_ppxhc.prototype.onContinueBtn = function () {
        if (!this._clickTag_ppxhc && WudianMgr_1.default.Wudian_ppxhc_Flag) {
            var self = this;
            if (!this._clickTimingTag_ppxhc) {
                this._clickTimingTag_ppxhc = true;
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        //todo:你的代码
    };
    QQGameFailViewTemplate_ppxhc.prototype.BannerUp = function () {
        //todo：显示Banner
    };
    QQGameFailViewTemplate_ppxhc.prototype.BtnUp = function () {
        this._clickTag_ppxhc = true;
        this._backBtn_ppxhc.y = 720;
        this._continueBtn_ppxhc.y = 720;
    };
    QQGameFailViewTemplate_ppxhc.prototype.onDestroy = function () {
        //todo：隐藏Banner
    };
    return QQGameFailViewTemplate_ppxhc;
}(QQTemplateViewBase_1.default));
exports.default = QQGameFailViewTemplate_ppxhc;
},{"../../../AppConfig":2,"../../../Config/AppSwitchConfig":5,"../../../Mgr/WudianMgr":71,"../../../QQMiniGameAPI":78,"../../../Utilit":85,"../QQTemplateViewBase":100}],95:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var Utilit_1 = require("../../../Utilit");
var QQTemplateViewBase_1 = require("../QQTemplateViewBase");
var QQMiniGameAPI_1 = require("../../../QQMiniGameAPI");
var AppConfig_1 = require("../../../AppConfig");
var QQGameWinViewTemplate_ppxhc = /** @class */ (function (_super) {
    __extends(QQGameWinViewTemplate_ppxhc, _super);
    function QQGameWinViewTemplate_ppxhc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone_ppxhc = null;
        _this._backBtn_ppxhc = null;
        _this._nextBtn_ppxhc = null;
        _this._clickTag_ppxhc = false;
        _this._clickTimingTag_ppxhc = false;
        return _this;
    }
    QQGameWinViewTemplate_ppxhc.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._centerZone_ppxhc = this.View.getChildByName("CenterZone");
        if (Utilit_1.default.isIphoneX_()) {
            this._centerZone_ppxhc.top = this._centerZone_ppxhc.top + 75;
        }
        this._backBtn_ppxhc = this._centerZone_ppxhc.getChildByName("BackBtn");
        this._nextBtn_ppxhc = this._centerZone_ppxhc.getChildByName("NextBtn");
    };
    QQGameWinViewTemplate_ppxhc.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        var self = this;
        if (WudianMgr_1.default.Wudian_ppxhc_Flag && AppConfig_1.default.ppxhc_Versions == AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.qqversions) {
            if (1 == AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.weiyi) {
                var yPos = this._centerZone_ppxhc.height - 150;
                this._backBtn_ppxhc.y = yPos;
                this._nextBtn_ppxhc.y = yPos;
            }
            var excute_1 = function () {
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, self, self.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, self, self.BtnUp);
            };
            if (AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.box == 1) {
                QQMiniGameAPI_1.default.showAppBoxAd(function () {
                    excute_1();
                }, function () {
                    excute_1();
                });
            }
            else {
                excute_1();
            }
        }
    };
    QQGameWinViewTemplate_ppxhc.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._backBtn_ppxhc.on(Laya.Event.CLICK, this, this.onBackBtn);
        this._nextBtn_ppxhc.on(Laya.Event.CLICK, this, this.onNextBtn);
    };
    QQGameWinViewTemplate_ppxhc.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._backBtn_ppxhc.off(Laya.Event.CLICK, this, this.onBackBtn);
        this._nextBtn_ppxhc.off(Laya.Event.CLICK, this, this.onNextBtn);
    };
    QQGameWinViewTemplate_ppxhc.prototype.onBackBtn = function () {
        if (!this._clickTag_ppxhc && WudianMgr_1.default.Wudian_ppxhc_Flag) {
            var self = this;
            if (!this._clickTimingTag_ppxhc) {
                this._clickTimingTag_ppxhc = true;
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        //todo:你的代码
    };
    QQGameWinViewTemplate_ppxhc.prototype.onNextBtn = function () {
        if (!this._clickTag_ppxhc && WudianMgr_1.default.Wudian_ppxhc_Flag) {
            var self = this;
            if (!this._clickTimingTag_ppxhc) {
                this._clickTimingTag_ppxhc = true;
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        //todo:你的代码
    };
    QQGameWinViewTemplate_ppxhc.prototype.BannerUp = function () {
        //todo：显示Banner
    };
    QQGameWinViewTemplate_ppxhc.prototype.BtnUp = function () {
        this._clickTag_ppxhc = true;
        this._backBtn_ppxhc.y = 720;
        this._nextBtn_ppxhc.y = 720;
    };
    QQGameWinViewTemplate_ppxhc.prototype.onDestroy = function () {
        //todo：隐藏Banner
    };
    return QQGameWinViewTemplate_ppxhc;
}(QQTemplateViewBase_1.default));
exports.default = QQGameWinViewTemplate_ppxhc;
},{"../../../AppConfig":2,"../../../Config/AppSwitchConfig":5,"../../../Mgr/WudianMgr":71,"../../../QQMiniGameAPI":78,"../../../Utilit":85,"../QQTemplateViewBase":100}],96:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utilit_1 = require("../../../Utilit");
var QQTemplateViewBase_1 = require("../QQTemplateViewBase");
var QQInGameViewTemplate_ppxhc = /** @class */ (function (_super) {
    __extends(QQInGameViewTemplate_ppxhc, _super);
    function QQInGameViewTemplate_ppxhc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone_ppxhc = null;
        return _this;
    }
    QQInGameViewTemplate_ppxhc.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._centerZone_ppxhc = this.View.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.isIphoneX_()) {
                this._centerZone_ppxhc.top = this._centerZone_ppxhc.top + 75;
            }
        }
        else {
            this._centerZone_ppxhc.top = this._centerZone_ppxhc.top - 200;
            if (Utilit_1.default.isIphoneX_()) {
                this._centerZone_ppxhc.top = this._centerZone_ppxhc.top + 75;
            }
        }
    };
    QQInGameViewTemplate_ppxhc.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
    };
    QQInGameViewTemplate_ppxhc.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    QQInGameViewTemplate_ppxhc.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    return QQInGameViewTemplate_ppxhc;
}(QQTemplateViewBase_1.default));
exports.default = QQInGameViewTemplate_ppxhc;
},{"../../../Utilit":85,"../QQTemplateViewBase":100}],97:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../../Event/EventMgr");
var EventDef_1 = require("../../../Event/EventDef");
var User_1 = require("../../../User/User");
var Utilit_1 = require("../../../Utilit");
var QQTemplateViewBase_1 = require("../QQTemplateViewBase");
var QQMiniGameAPI_1 = require("../../../QQMiniGameAPI");
var QQMainViewTemplate_ppxhc = /** @class */ (function (_super) {
    __extends(QQMainViewTemplate_ppxhc, _super);
    function QQMainViewTemplate_ppxhc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone_ppxhc = null;
        _this._startBtn_ppxhc = null;
        _this._levelNum_ppxhc = null;
        _this._moneyNum_ppxhc = null;
        _this._moreGameBtn_ppxhc = null;
        return _this;
    }
    QQMainViewTemplate_ppxhc.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._centerZone_ppxhc = this.View.getChildByName("CenterZone");
        this._moreGameBtn_ppxhc = this._centerZone_ppxhc.getChildByName("MoreGameBtn");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.isIphoneX_()) {
                this._centerZone_ppxhc.top = this._centerZone_ppxhc.top + 75;
            }
        }
        else {
            //this._centerZone.top =  this._centerZone.top - 100;
            if (Utilit_1.default.isIphoneX_()) {
                this._centerZone_ppxhc.top = this._centerZone_ppxhc.top + 75;
            }
        }
        this._startBtn_ppxhc = this._centerZone_ppxhc.getChildByName("StartBtn");
        this._levelNum_ppxhc = this._centerZone_ppxhc.getChildByName("LevelInfo").getChildByName("LevelNum");
        this._moneyNum_ppxhc = this._centerZone_ppxhc.getChildByName("MoneyInfo").getChildByName("MoneyNum");
    };
    QQMainViewTemplate_ppxhc.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        this._moneyNum_ppxhc.value = String(User_1.default.get_ppxhc_Money());
        this._levelNum_ppxhc.value = String(User_1.default.get_ppxhc_LeveNum());
    };
    QQMainViewTemplate_ppxhc.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._startBtn_ppxhc.on(Laya.Event.CLICK, this, this.onStartBtn);
        this._moreGameBtn_ppxhc.on(Laya.Event.CLICK, this, this.onMoreGameBtn);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Game_OnUserMoneyChange, this, this.onUserMoneyChange);
    };
    QQMainViewTemplate_ppxhc.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._startBtn_ppxhc.off(Laya.Event.CLICK, this, this.onStartBtn);
        this._moreGameBtn_ppxhc.off(Laya.Event.CLICK, this, this.onMoreGameBtn);
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.Game_OnUserMoneyChange, this, this.onUserMoneyChange);
    };
    QQMainViewTemplate_ppxhc.prototype.onStartBtn = function () {
    };
    QQMainViewTemplate_ppxhc.prototype.onMoreGameBtn = function () {
        QQMiniGameAPI_1.default.showAppBoxAd(function () {
        });
    };
    QQMainViewTemplate_ppxhc.prototype.onUserMoneyChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._moneyNum_ppxhc.value = String(curr);
    };
    return QQMainViewTemplate_ppxhc;
}(QQTemplateViewBase_1.default));
exports.default = QQMainViewTemplate_ppxhc;
},{"../../../Event/EventDef":7,"../../../Event/EventMgr":8,"../../../QQMiniGameAPI":78,"../../../User/User":84,"../../../Utilit":85,"../QQTemplateViewBase":100}],98:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../../View/ViewBase");
var EventDef_1 = require("../../../Event/EventDef");
var EventMgr_1 = require("../../../Event/EventMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var CachedQQBannerAd_1 = require("../../../CachedQQBannerAd");
var AppConfig_1 = require("../../../AppConfig");
var QQCrazyClick_ppxhc = /** @class */ (function (_super) {
    __extends(QQCrazyClick_ppxhc, _super);
    function QQCrazyClick_ppxhc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._clickBar_ppxhc = null;
        _this._totalClickTimer_ppxhc = 15; //用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
        _this._needClickTime_ppxhc = 10; //一共点多少次能够获得奖励，用于显示进度条
        _this._bannerClickTime_ppxhc = Math.floor(Math.random() * 5) + 2; //点多少次开始显示bannerr套路用户
        return _this;
    }
    QQCrazyClick_ppxhc.prototype.onAwake = function () {
        var _this = this;
        this.drgon = this.owner.getChildByName("panch");
        this._click_Btn_ppxhc = this.owner.getChildByName("Click_Btn");
        this._click_Btn_ppxhc.on(Laya.Event.CLICK, this, this.ButtonClicked);
        this._arrow_Img_ppxhc = this._click_Btn_ppxhc.getChildByName("Arrow_Img");
        this._getPrize_View_ppxhc = this.owner.getChildByName("GetPrize_View");
        this._prizeCount_Text_ppxhc = this._getPrize_View_ppxhc.getChildByName("PrizeCount_Text");
        this._confirm_Btn_ppxhc = this._getPrize_View_ppxhc.getChildByName("Confirm_Btn");
        this._getPrize_View_ppxhc.visible = false;
        this._clickBar_ppxhc = this.owner.getChildByName("ClickBar").getChildByName("ClickBar");
        this._clickBarOriginalWidth_ppxhc = this._clickBar_ppxhc.width;
        this._clickBar_ppxhc.width = 0;
        this._clickTime_ppxhc = 0;
        this._totalClickTime_ppxhc = 0;
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
    QQCrazyClick_ppxhc.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Laya.stage.on(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
    };
    QQCrazyClick_ppxhc.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Laya.stage.off(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
    };
    QQCrazyClick_ppxhc.prototype.onUpdate = function () {
        if (this._arrowUp_ppxhc) {
            this._arrow_Img_ppxhc.top += Laya.timer.delta / 5;
            if (this._arrow_Img_ppxhc.top > -140) {
                this._arrowUp_ppxhc = false;
            }
        }
        else {
            this._arrow_Img_ppxhc.top -= Laya.timer.delta / 5;
            if (this._arrow_Img_ppxhc.top < -180) {
                this._arrowUp_ppxhc = true;
            }
        }
        if (!this._bannerClicked_ppxhc) {
            var spd = 2 + (this._clickBar_ppxhc.width / this._clickBarOriginalWidth_ppxhc) * 4;
            if (this._clickBar_ppxhc.width >= spd) {
                this._clickBar_ppxhc.width -= spd;
            }
            if ((this._clickBar_ppxhc.width / this._clickBarOriginalWidth_ppxhc) + 0.1 < (this._clickTime_ppxhc / this._needClickTime_ppxhc)) {
                this._clickTime_ppxhc--;
            }
        }
    };
    QQCrazyClick_ppxhc.prototype.openView = function (data) {
        this._compeletFunction_ppxhc = data.Complete;
        this._prizeCount_ppxhc = data.PrizeCount;
        _super.prototype.openView.call(this, data);
    };
    QQCrazyClick_ppxhc.prototype.OpenPrizeWindow = function () {
        var self = this;
        this._prizeCount_Text_ppxhc.text = this._prizeCount_ppxhc.toString();
        this._getPrize_View_ppxhc.visible = true;
        this._confirm_Btn_ppxhc.once(Laya.Event.CLICK, this, function () {
            CachedQQBannerAd_1.default.hide();
            if (self._compeletFunction_ppxhc) {
                self._compeletFunction_ppxhc();
            }
            self.closeView();
        });
    };
    QQCrazyClick_ppxhc.prototype.ShowBanner = function () {
        if (AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.kuangdianBanner == 1
            && AppConfig_1.default.ppxhc_Versions == AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.qqversions) {
            CachedQQBannerAd_1.default.show();
        }
    };
    QQCrazyClick_ppxhc.prototype.ButtonClicked = function () {
        var _this = this;
        this._clickTime_ppxhc++;
        this._totalClickTime_ppxhc++;
        this.drgon.play(1, false);
        this.drgon.once(Laya.Event.STOPPED, this, function () {
            _this.drgon.play(0, true);
        });
        if (this._clickTime_ppxhc > this._needClickTime_ppxhc) {
            this._clickTime_ppxhc = this._needClickTime_ppxhc;
        }
        if (this._clickTime_ppxhc >= this._bannerClickTime_ppxhc) {
            if (this._clickTime_ppxhc >= this._needClickTime_ppxhc) {
                this._clickTime_ppxhc = this._needClickTime_ppxhc - 1;
            }
            if (this._bannerClicked_ppxhc) {
                return;
            }
            this._bannerClicked_ppxhc = true;
            this.ShowBanner();
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        else if (this._totalClickTime_ppxhc > this._totalClickTimer_ppxhc) {
            this.ShowBanner();
            this.BannerClicked();
        }
        var progress = (this._clickTime_ppxhc / this._needClickTime_ppxhc) * this._clickBarOriginalWidth_ppxhc;
        this._clickBar_ppxhc.width = progress;
    };
    QQCrazyClick_ppxhc.prototype.BannerClicked = function () {
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_WudianBanner_Hide);
        this._bannerClicked_ppxhc = true;
        this._clickTime_ppxhc = this._needClickTime_ppxhc;
        this._clickBar_ppxhc.width = this._clickBarOriginalWidth_ppxhc;
        this._click_Btn_ppxhc.visible = false;
        this.OpenPrizeWindow();
    };
    QQCrazyClick_ppxhc.prototype.onDestroy = function () {
        if (AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.kuangdianBanner == 1
            && AppConfig_1.default.ppxhc_Versions == AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.qqversions) {
            CachedQQBannerAd_1.default.hide();
        }
    };
    QQCrazyClick_ppxhc.prototype.onFocusChange = function () {
        if (null != this.drgon) {
            this.drgon.play(0, true);
        }
    };
    return QQCrazyClick_ppxhc;
}(ViewBase_1.default));
exports.default = QQCrazyClick_ppxhc;
},{"../../../AppConfig":2,"../../../CachedQQBannerAd":3,"../../../Config/AppSwitchConfig":5,"../../../Event/EventDef":7,"../../../Event/EventMgr":8,"../../../View/ViewBase":132}],99:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../../View/ViewBase");
var EventDef_1 = require("../../../Event/EventDef");
var EventMgr_1 = require("../../../Event/EventMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var QQMiniGameAPI_1 = require("../../../QQMiniGameAPI");
var AppConfig_1 = require("../../../AppConfig");
var QQCrazyClick2 = /** @class */ (function (_super) {
    __extends(QQCrazyClick2, _super);
    function QQCrazyClick2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._clickBar = null;
        _this._totalClickTimer = 15; //用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
        _this._needClickTime = 10; //一共点多少次能够获得奖励，用于显示进度条
        _this._bannerClickTime = Math.floor(Math.random() * 5) + 2; //点多少次开始显示bannerr套路用户
        _this._clickBtn = null;
        return _this;
    }
    QQCrazyClick2.prototype.onAwake = function () {
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
        Laya.loader.load("ClickGetPrize/quanji.png", Laya.Handler.create(self, function (texture) {
            texture.bitmap.lock = true;
            Laya.loader.load("ClickGetPrize/quanji.sk", Laya.Handler.create(self, function (bytes) {
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
            }), Laya.Handler.create(self, function () { }), "", 0, false, "", true);
        }), Laya.Handler.create(self, function () { }), "", 0, false, "", true);
        Laya.loader.load("ClickGetPrize/NewProject.png", Laya.Handler.create(self, function (texture) {
            texture.bitmap.lock = true;
            Laya.loader.load("ClickGetPrize/NewProject.sk", Laya.Handler.create(self, function (bytes) {
                var template = new Laya.Templet();
                template.parseData(texture, bytes);
                var finger = template.buildArmature();
                self.owner.addChild(finger);
                finger.x = 360;
                finger.y = 617;
                finger.parent.setChildIndex(finger, 2);
                finger.play(0, true);
                self._clickBtn = new Laya.Clip();
                self.owner.addChild(self._clickBtn);
                self._clickBtn.x = 360 - 100,
                    self._clickBtn.y = 617 - 100,
                    self._clickBtn.width = 200,
                    self._clickBtn.height = 200,
                    self._clickBtn.parent.setChildIndex(self._clickBtn, 3);
                self._clickBtn.on(Laya.Event.CLICK, self, self.ButtonClicked);
                console.log("手指动画 加载完成!!!!", template);
            }), Laya.Handler.create(self, function () { }), "", 0, false, "", true);
        }), Laya.Handler.create(self, function () { }), "", 0, false, "", true);
    };
    QQCrazyClick2.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Laya.stage.on(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
    };
    QQCrazyClick2.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Laya.stage.off(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
    };
    QQCrazyClick2.prototype.onUpdate = function () {
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
    QQCrazyClick2.prototype.openView = function (data) {
        this._compeletFunction = data.Complete;
        this._prizeCount = data.PrizeCount;
        _super.prototype.openView.call(this, data);
    };
    QQCrazyClick2.prototype.OpenPrizeWindow = function () {
        var self = this;
        this._prizeCount_Text.text = this._prizeCount.toString();
        this._getPrize_View.visible = true;
        this._confirm_Btn.once(Laya.Event.CLICK, this, function () {
            if (self._compeletFunction) {
                self._compeletFunction();
            }
            self.closeView();
        });
    };
    QQCrazyClick2.prototype.ShowBanner = function () {
        if (AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.kuangdianBox == 1
            && AppConfig_1.default.ppxhc_Versions == AppSwitchConfig_1.default.getInstance().getAppSwitchData().qqcfg.qqversions) {
            QQMiniGameAPI_1.default.showAppBoxAd(function () {
            });
        }
    };
    QQCrazyClick2.prototype.ButtonClicked = function () {
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
            this.ShowBanner();
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        else if (this._totalClickTime > this._totalClickTimer) {
            this.ShowBanner();
            this.BannerClicked();
        }
        var progress = (this._clickTime / this._needClickTime) * this._clickBarOriginalWidth;
        this._clickBar.width = progress;
    };
    QQCrazyClick2.prototype.BannerClicked = function () {
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_WudianBanner_Hide);
        this._bannerClicked = true;
        this._clickTime = this._needClickTime;
        this._clickBar.width = this._clickBarOriginalWidth;
        this._clickBtn.visible = false;
        this.OpenPrizeWindow();
    };
    QQCrazyClick2.prototype.onDestroy = function () {
    };
    QQCrazyClick2.prototype.onFocusChange = function () {
        if (null != this.drgon) {
            this.drgon.play(0, true);
        }
    };
    return QQCrazyClick2;
}(ViewBase_1.default));
exports.default = QQCrazyClick2;
},{"../../../AppConfig":2,"../../../Config/AppSwitchConfig":5,"../../../Event/EventDef":7,"../../../Event/EventMgr":8,"../../../QQMiniGameAPI":78,"../../../View/ViewBase":132}],100:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var QQTemplateViewBase_ppxhc = /** @class */ (function (_super) {
    __extends(QQTemplateViewBase_ppxhc, _super);
    function QQTemplateViewBase_ppxhc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QQTemplateViewBase_ppxhc.prototype.onAwake = function () {
    };
    QQTemplateViewBase_ppxhc.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    QQTemplateViewBase_ppxhc.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    return QQTemplateViewBase_ppxhc;
}(ViewBase_1.default));
exports.default = QQTemplateViewBase_ppxhc;
},{"../ViewBase":132}],101:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var Utilit_1 = require("../../../Utilit");
var TTTemplateViewBase_1 = require("../TTTemplateViewBase");
var TTAPI_1 = require("../../../TTAPI");
var TTGameFailViewTemplate_ppxhc = /** @class */ (function (_super) {
    __extends(TTGameFailViewTemplate_ppxhc, _super);
    function TTGameFailViewTemplate_ppxhc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone_ppxhc = null;
        _this._clickTag_ppxhc = false;
        _this._clickTimingTag_ppxhc = false;
        _this._moreGameBtn_ppxhc = null;
        _this._shareBtn_ppxhc = null;
        _this._backBtn_ppxhc = null;
        _this._okBtn_ppxhc = null;
        _this._videoBtn_ppxhc = null;
        return _this;
    }
    TTGameFailViewTemplate_ppxhc.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._centerZone_ppxhc = this.View.getChildByName("CenterZone");
        if (Utilit_1.default.isIphoneX_()) {
            this._centerZone_ppxhc.top = this._centerZone_ppxhc.top + 75;
        }
        this._moreGameBtn_ppxhc = this._centerZone_ppxhc.getChildByName("MoreGameBtn");
        this._shareBtn_ppxhc = this._centerZone_ppxhc.getChildByName("ShareBtn");
        this._backBtn_ppxhc = this._centerZone_ppxhc.getChildByName("BackBtn");
        this._okBtn_ppxhc = this._centerZone_ppxhc.getChildByName("OkBtn");
        this._videoBtn_ppxhc = this._centerZone_ppxhc.getChildByName("VideoBtn");
        this._moreGameBtn_ppxhc.visible = AppSwitchConfig_1.default.getInstance().getAppSwitchData().ttcfg.moreGameSwitch == 1;
    };
    TTGameFailViewTemplate_ppxhc.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        if (WudianMgr_1.default.Wudian_ppxhc_Flag) {
            var yPos = this._centerZone_ppxhc.height - 150;
            this._backBtn_ppxhc.y = yPos;
            this._okBtn_ppxhc.y = yPos;
            this._videoBtn_ppxhc.y = yPos;
        }
        var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
        var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
        Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
        Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
        if (AppSwitchConfig_1.default.getInstance().getAppSwitchData().ttcfg.luping == 1) {
            TTAPI_1.default.shareRecord(function () {
            }, function () {
            });
        }
    };
    TTGameFailViewTemplate_ppxhc.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._backBtn_ppxhc.on(Laya.Event.CLICK, this, this.onBackBtn);
        this._okBtn_ppxhc.on(Laya.Event.CLICK, this, this.onOkBtn);
        this._videoBtn_ppxhc.on(Laya.Event.CLICK, this, this.onOkBtn);
        this._moreGameBtn_ppxhc.on(Laya.Event.CLICK, this, this.onMoreGameBtn);
        this._shareBtn_ppxhc.on(Laya.Event.CLICK, this, this.onShareBtn);
    };
    TTGameFailViewTemplate_ppxhc.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._backBtn_ppxhc.off(Laya.Event.CLICK, this, this.onBackBtn);
        this._okBtn_ppxhc.off(Laya.Event.CLICK, this, this.onOkBtn);
        this._videoBtn_ppxhc.off(Laya.Event.CLICK, this, this.onOkBtn);
        this._moreGameBtn_ppxhc.off(Laya.Event.CLICK, this, this.onMoreGameBtn);
        this._shareBtn_ppxhc.off(Laya.Event.CLICK, this, this.onShareBtn);
    };
    TTGameFailViewTemplate_ppxhc.prototype.onBackBtn = function () {
        if (!this._clickTag_ppxhc && WudianMgr_1.default.Wudian_ppxhc_Flag) {
            var self = this;
            if (!this._clickTimingTag_ppxhc) {
                this._clickTimingTag_ppxhc = true;
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        //todo:你的代码
    };
    TTGameFailViewTemplate_ppxhc.prototype.onOkBtn = function () {
        if (!this._clickTag_ppxhc && WudianMgr_1.default.Wudian_ppxhc_Flag) {
            var self = this;
            if (!this._clickTimingTag_ppxhc) {
                this._clickTimingTag_ppxhc = true;
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        //todo:你的代码
    };
    TTGameFailViewTemplate_ppxhc.prototype.onVideoBtn = function () {
        if (!this._clickTag_ppxhc && WudianMgr_1.default.Wudian_ppxhc_Flag) {
            var self = this;
            if (!this._clickTimingTag_ppxhc) {
                this._clickTimingTag_ppxhc = true;
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        TTAPI_1.default.shareRecord(function () {
        }, function () {
        });
    };
    TTGameFailViewTemplate_ppxhc.prototype.BannerUp = function () {
        TTAPI_1.default.showBanner();
    };
    TTGameFailViewTemplate_ppxhc.prototype.BtnUp = function () {
        this._clickTag_ppxhc = true;
        this._backBtn_ppxhc.y = 720;
        this._okBtn_ppxhc.y = 720;
        this._videoBtn_ppxhc.y = 720;
    };
    TTGameFailViewTemplate_ppxhc.prototype.onMoreGameBtn = function () {
        TTAPI_1.default.showMoreGamesModal(function () {
        }, function () {
        });
    };
    TTGameFailViewTemplate_ppxhc.prototype.onShareBtn = function () {
        TTAPI_1.default.share(function () {
        });
    };
    TTGameFailViewTemplate_ppxhc.prototype.onDestroy = function () {
        TTAPI_1.default.hideBanner();
    };
    return TTGameFailViewTemplate_ppxhc;
}(TTTemplateViewBase_1.default));
exports.default = TTGameFailViewTemplate_ppxhc;
},{"../../../Config/AppSwitchConfig":5,"../../../Mgr/WudianMgr":71,"../../../TTAPI":83,"../../../Utilit":85,"../TTTemplateViewBase":114}],102:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TTGameFailViewTemplate_1 = require("../GameFail/TTGameFailViewTemplate");
var TTGameWinViewTemplate_ppxhc = /** @class */ (function (_super) {
    __extends(TTGameWinViewTemplate_ppxhc, _super);
    function TTGameWinViewTemplate_ppxhc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TTGameWinViewTemplate_ppxhc;
}(TTGameFailViewTemplate_1.default));
exports.default = TTGameWinViewTemplate_ppxhc;
},{"../GameFail/TTGameFailViewTemplate":101}],103:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../../Event/EventMgr");
var EventDef_1 = require("../../../Event/EventDef");
var User_1 = require("../../../User/User");
var Utilit_1 = require("../../../Utilit");
var TTTemplateViewBase_1 = require("../TTTemplateViewBase");
var TTAPI_1 = require("../../../TTAPI");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var TTMainViewTemplate_ppxhc = /** @class */ (function (_super) {
    __extends(TTMainViewTemplate_ppxhc, _super);
    function TTMainViewTemplate_ppxhc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone_ppxhc = null;
        _this._startBtn_ppxhc = null;
        _this._levelNum_ppxhc = null;
        _this._moneyNum_ppxhc = null;
        _this._moreGameBtn_ppxhc = null;
        _this._shareBtn_ppxhc = null;
        return _this;
    }
    TTMainViewTemplate_ppxhc.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._centerZone_ppxhc = this.View.getChildByName("CenterZone");
        this._moreGameBtn_ppxhc = this._centerZone_ppxhc.getChildByName("MoreGameBtn");
        this._shareBtn_ppxhc = this._centerZone_ppxhc.getChildByName("ShareBtn");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.isIphoneX_()) {
                this._centerZone_ppxhc.top = this._centerZone_ppxhc.top + 75;
            }
        }
        else {
            this._centerZone_ppxhc.top = this._centerZone_ppxhc.top - 200;
            if (Utilit_1.default.isIphoneX_()) {
                this._centerZone_ppxhc.top = this._centerZone_ppxhc.top + 75;
            }
        }
        this._startBtn_ppxhc = this._centerZone_ppxhc.getChildByName("StartBtn");
        this._levelNum_ppxhc = this._centerZone_ppxhc.getChildByName("LevelInfo").getChildByName("LevelNum");
        this._moneyNum_ppxhc = this._centerZone_ppxhc.getChildByName("MoneyInfo").getChildByName("MoneyNum");
        this._moreGameBtn_ppxhc.visible = AppSwitchConfig_1.default.getInstance().getAppSwitchData().ttcfg.moreGameSwitch == 1;
    };
    TTMainViewTemplate_ppxhc.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        this._moneyNum_ppxhc.value = String(User_1.default.get_ppxhc_Money());
        this._levelNum_ppxhc.value = String(User_1.default.get_ppxhc_LeveNum());
    };
    TTMainViewTemplate_ppxhc.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._startBtn_ppxhc.on(Laya.Event.CLICK, this, this.onStartBtn);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Game_OnUserMoneyChange, this, this.onUserMoneyChange);
        this._moreGameBtn_ppxhc.on(Laya.Event.CLICK, this, this.onMoreGameBtn);
        this._shareBtn_ppxhc.on(Laya.Event.CLICK, this, this.onShareBtn);
    };
    TTMainViewTemplate_ppxhc.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._startBtn_ppxhc.off(Laya.Event.CLICK, this, this.onStartBtn);
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.Game_OnUserMoneyChange, this, this.onUserMoneyChange);
        this._moreGameBtn_ppxhc.off(Laya.Event.CLICK, this, this.onMoreGameBtn);
        this._shareBtn_ppxhc.off(Laya.Event.CLICK, this, this.onShareBtn);
    };
    TTMainViewTemplate_ppxhc.prototype.onStartBtn = function () {
    };
    TTMainViewTemplate_ppxhc.prototype.onMoreGameBtn = function () {
        TTAPI_1.default.showMoreGamesModal(function () {
        }, function () {
        });
    };
    TTMainViewTemplate_ppxhc.prototype.onShareBtn = function () {
        TTAPI_1.default.share(function () {
        });
    };
    TTMainViewTemplate_ppxhc.prototype.onUserMoneyChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._moneyNum_ppxhc.value = String(curr);
    };
    return TTMainViewTemplate_ppxhc;
}(TTTemplateViewBase_1.default));
exports.default = TTMainViewTemplate_ppxhc;
},{"../../../Config/AppSwitchConfig":5,"../../../Event/EventDef":7,"../../../Event/EventMgr":8,"../../../TTAPI":83,"../../../User/User":84,"../../../Utilit":85,"../TTTemplateViewBase":114}],104:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TTTemplateViewBase_1 = require("../TTTemplateViewBase");
var TTAPI_1 = require("../../../TTAPI");
var Utilit_1 = require("../../../Utilit");
var TTMoreReward = /** @class */ (function (_super) {
    __extends(TTMoreReward, _super);
    function TTMoreReward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone = null;
        _this._adToggle = null;
        _this._adToggleTag = null;
        _this._rewardBtn = null;
        _this._shareBtn = null;
        _this._ading = false; //是否正在看视频中
        return _this;
    }
    TTMoreReward.prototype.onAwake = function () {
        this._topZone = this.View.getChildByName("TopZone");
        this._centerZone = this.View.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.isIphoneX_()) {
                this._centerZone.top = this._centerZone.top + 75;
            }
        }
        this._adToggle = this._centerZone.getChildByName("AdToggle");
        this._adToggleTag = this._adToggle.getChildByName("Tag");
        this._adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this._rewardBtn = this._centerZone.getChildByName("RewardBtn");
        this._shareBtn = this._centerZone.getChildByName("ShareBtn");
    };
    TTMoreReward.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._rewardBtn.on(Laya.Event.CLICK, this, this.onResurrectionBtn);
        this._adToggle.on(Laya.Event.CLICK, this, this.onAdToggle);
        this._shareBtn.on(Laya.Event.CLICK, this, this.onShareBtn);
    };
    TTMoreReward.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._rewardBtn.off(Laya.Event.CLICK, this, this.onResurrectionBtn);
        this._adToggle.off(Laya.Event.CLICK, this, this.onAdToggle);
        this._shareBtn.off(Laya.Event.CLICK, this, this.onShareBtn);
    };
    TTMoreReward.prototype.onResurrectionBtn = function () {
        if (this._ading)
            return; //看视频中点击无效
        this._ading = true;
        var self = this;
        if (this._adToggleTag.visible) {
            TTAPI_1.default.showRewardedVideoAd_ppxhc(function (ok) {
                if (ok) {
                    //todo:看视频成功
                    //todo:多倍奖励
                }
                else {
                    //todo:未完整观看视频
                    self._ading = false;
                }
            }, function () {
                //todo:看视屏失败
                self._ading = false;
            });
        }
        else {
            //todo:正常奖励
        }
    };
    TTMoreReward.prototype.onAdToggle = function () {
        if (this._ading)
            return; //看视频中点击无效
        this._adToggleTag.visible = !this._adToggleTag.visible;
    };
    TTMoreReward.prototype.onShareBtn = function () {
        TTAPI_1.default.shareRecord(function () {
            //todo:分享成功
        }, function () {
            //todo:分享失败
        });
    };
    return TTMoreReward;
}(TTTemplateViewBase_1.default));
exports.default = TTMoreReward;
},{"../../../TTAPI":83,"../../../Utilit":85,"../TTTemplateViewBase":114}],105:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TTTemplateViewBase_1 = require("../TTTemplateViewBase");
var TTAPI_1 = require("../../../TTAPI");
var Utilit_1 = require("../../../Utilit");
//抖音复活界面
var TTResurrection = /** @class */ (function (_super) {
    __extends(TTResurrection, _super);
    function TTResurrection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone = null;
        _this._adToggle = null;
        _this._adToggleTag = null;
        _this._resurrectionBtn = null;
        _this._skipBtn = null;
        _this._skipOkTag = null;
        _this._skipNoTag = null;
        _this._ading = false; //是否正在看视频中
        return _this;
    }
    TTResurrection.prototype.onAwake = function () {
        this._topZone = this.View.getChildByName("TopZone");
        this._centerZone = this.View.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.isIphoneX_()) {
                this._centerZone.top = this._centerZone.top + 75;
            }
        }
        this._adToggle = this._centerZone.getChildByName("AdToggle");
        this._adToggleTag = this._adToggle.getChildByName("Tag");
        this._resurrectionBtn = this._centerZone.getChildByName("ResurrectionBtn");
        this._skipBtn = this._centerZone.getChildByName("SkipBtn");
        this._skipOkTag = this._skipBtn.getChildByName("Ok");
        this._skipNoTag = this._skipBtn.getChildByName("No");
        this._adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.onAdToggleStateChange(this._adToggleTag.visible);
    };
    TTResurrection.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._resurrectionBtn.on(Laya.Event.CLICK, this, this.onResurrectionBtn);
        this._adToggle.on(Laya.Event.CLICK, this, this.onAdToggle);
        this._skipBtn.on(Laya.Event.CLICK, this, this.onSkipBtn);
    };
    TTResurrection.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._resurrectionBtn.off(Laya.Event.CLICK, this, this.onResurrectionBtn);
        this._adToggle.off(Laya.Event.CLICK, this, this.onAdToggle);
        this._skipBtn.off(Laya.Event.CLICK, this, this.onSkipBtn);
    };
    TTResurrection.prototype.onResurrectionBtn = function () {
        if (this._ading)
            return; //看视频中点击无效
        this._ading = true;
        var self = this;
        TTAPI_1.default.showRewardedVideoAd_ppxhc(function (ok) {
            if (ok) {
                //todo:看视频成功
                //todo:复活
            }
            else {
                //todo:未完整观看视频
                self._ading = false;
            }
        }, function () {
            //todo:看视屏失败
            self._ading = false;
        });
    };
    TTResurrection.prototype.onAdToggle = function () {
        if (this._ading)
            return; //看视频中点击无效
        this._adToggleTag.visible = !this._adToggleTag.visible;
        this.onAdToggleStateChange(this._adToggleTag.visible);
    };
    TTResurrection.prototype.onSkipBtn = function () {
        if (this._ading)
            return; //看视频中点击无效
        this._ading = true;
        var self = this;
        if (this._adToggleTag.visible) {
            TTAPI_1.default.showRewardedVideoAd_ppxhc(function (ok) {
                if (ok) {
                    //todo:看视频成功
                    //todo:复活
                }
                else {
                    //todo:未完整观看视频
                    self._ading = false;
                }
            }, function () {
                //todo:看视屏失败
                self._ading = false;
            });
        }
        else {
            //todo:跳过
        }
    };
    TTResurrection.prototype.onAdToggleStateChange = function (visible) {
        if (visible) {
            this._skipOkTag.visible = true;
            this._skipNoTag.visible = false;
        }
        else {
            this._skipOkTag.visible = false;
            this._skipNoTag.visible = true;
        }
    };
    return TTResurrection;
}(TTTemplateViewBase_1.default));
exports.default = TTResurrection;
},{"../../../TTAPI":83,"../../../Utilit":85,"../TTTemplateViewBase":114}],106:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RewardBox = /** @class */ (function (_super) {
    __extends(RewardBox, _super);
    function RewardBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._view = null;
        _this._adTag = null;
        return _this;
    }
    Object.defineProperty(RewardBox.prototype, "AdTag", {
        get: function () {
            return this._adTag;
        },
        enumerable: true,
        configurable: true
    });
    RewardBox.prototype.init = function (view) {
        this._view = view;
        this._adTag = this.owner.getChildByName("AdTag");
    };
    RewardBox.prototype.onEnable = function () {
        this.owner.on(Laya.Event.CLICK, this, this.onSelfClick);
    };
    RewardBox.prototype.onDisable = function () {
        this.owner.off(Laya.Event.CLICK, this, this.onSelfClick);
    };
    RewardBox.prototype.onSelfClick = function () {
        if (null != this._view) {
            this._view.onRewardBoxClick(this);
        }
    };
    return RewardBox;
}(Laya.Script));
exports.default = RewardBox;
},{}],107:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TTTemplateViewBase_1 = require("../TTTemplateViewBase");
var RewardBox_1 = require("./RewardBox");
var TTAPI_1 = require("../../../TTAPI");
var Utilit_1 = require("../../../Utilit");
//抖音开宝箱界面
var TTReward = /** @class */ (function (_super) {
    __extends(TTReward, _super);
    function TTReward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone = null;
        _this._rewardBoxs = [];
        _this._keysRoot = null;
        _this._keys = [];
        _this._keyCount = 3; //钥匙数量
        _this._getKeyZone = null;
        _this._adToggle = null;
        _this._adToggleTag = null;
        _this._getKeyBtn = null;
        _this._skipBtn = null;
        _this._skipOkTag = null;
        _this._skipNoTag = null;
        _this._getKeyTimes = 1; //获取钥匙机会
        _this._ading = false; //是否正在看视频中
        return _this;
    }
    TTReward.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._topZone = this.View.getChildByName("TopZone");
        this._centerZone = this.View.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.isIphoneX_()) {
                this._centerZone.top = this._centerZone.top + 75;
            }
        }
        this._getKeyZone = this._centerZone.getChildByName("GetKeyZone");
        this._adToggle = this._getKeyZone.getChildByName("AdToggle");
        this._adToggleTag = this._adToggle.getChildByName("Tag");
        this._getKeyBtn = this._getKeyZone.getChildByName("GetKeyBtn");
        this._skipBtn = this._getKeyZone.getChildByName("SkipBtn");
        this._skipOkTag = this._skipBtn.getChildByName("Ok");
        this._skipNoTag = this._skipBtn.getChildByName("No");
        this._adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.onAdToggleStateChange(this._adToggleTag.visible);
        var boxsRoot = this._centerZone.getChildByName("BoxsRoot");
        var indexs = [];
        for (var i = 0; i < boxsRoot.numChildren; ++i) {
            var boxObj = boxsRoot.getChildAt(i);
            var rewardBox = boxObj.getComponent(RewardBox_1.default);
            rewardBox.init(this);
            rewardBox.AdTag.visible = false;
            this._rewardBoxs.push(rewardBox);
            indexs.push(i);
        }
        for (var i = 0; i < indexs.length; ++i) {
            var index = indexs[i];
            var randomIndex = Math.floor(Math.random() * indexs.length);
            var temp = indexs[randomIndex];
            indexs[randomIndex] = index;
            indexs[i] = temp;
        }
        for (var i = 0; i < 3; ++i) {
            this._rewardBoxs[indexs.shift()].AdTag.visible = true;
        }
        this._keysRoot = this._centerZone.getChildByName("KeysRoot");
        for (var i = 0; i < this._keysRoot.numChildren; ++i) {
            var key = this._keysRoot.getChildAt(i);
            this._keys.push(key);
        }
        this.refreshKeyState();
    };
    TTReward.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._getKeyBtn.on(Laya.Event.CLICK, this, this.onGetKeyBtn);
        this._adToggle.on(Laya.Event.CLICK, this, this.onAdToggle);
        this._skipBtn.on(Laya.Event.CLICK, this, this.onSkipText);
    };
    TTReward.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._getKeyBtn.off(Laya.Event.CLICK, this, this.onGetKeyBtn);
        this._adToggle.off(Laya.Event.CLICK, this, this.onAdToggle);
        this._skipBtn.off(Laya.Event.CLICK, this, this.onSkipText);
    };
    TTReward.prototype.onRewardBoxClick = function (box) {
        if (this._ading) {
            return; //看视频中点击无效
        }
        if (box.AdTag.visible) //视频标记是打开的，走看视频拿奖励逻辑
         {
            this._ading = true;
            var self_1 = this;
            TTAPI_1.default.showRewardedVideoAd_ppxhc(function (ok) {
                if (ok) {
                    //todo:看视频成功
                    //todo:处理开箱之后的逻辑
                }
                else {
                    //todo:未完整观看视频
                    self_1._ading = false;
                    box.AdTag.visible = false;
                }
            }, function () {
                //todo:看视屏失败
                self_1._ading = false;
            });
            return;
        }
        else //使用钥匙获取奖励逻辑
         {
            if (this._keyCount <= 0)
                return;
            --this._keyCount;
            this.refreshKeyState();
            //todo:处理开箱之后的逻辑
        }
    };
    TTReward.prototype.refreshKeyState = function () {
        for (var i = 0; i < this._keys.length; ++i) {
            var key = this._keys[i];
            key.visible = ((i + 1) <= this._keyCount);
        }
        this._getKeyZone.visible = this._keyCount <= 0 && this._getKeyTimes > 0;
        this._keysRoot.visible = this._keyCount > 0 || this._getKeyTimes <= 0;
    };
    TTReward.prototype.onGetKeyBtn = function () {
        if (this._ading)
            return; //看视频中点击无效
        if (this._getKeyTimes <= 0)
            return; //获取钥匙机会用完
        this._ading = true;
        var self = this;
        TTAPI_1.default.showRewardedVideoAd_ppxhc(function (ok) {
            if (ok) {
                //todo:看视频成功
                --self._getKeyTimes;
                self._keyCount = 3;
                self.refreshKeyState();
                self._ading = false;
            }
            else {
                //todo:未完整观看视频
                self._ading = false;
            }
        }, function () {
            //todo:看视屏失败
            self._ading = false;
        });
    };
    TTReward.prototype.onAdToggle = function () {
        if (this._ading)
            return; //看视频中点击无效
        this._adToggleTag.visible = !this._adToggleTag.visible;
        this.onAdToggleStateChange(this._adToggleTag.visible);
    };
    TTReward.prototype.onSkipText = function () {
        if (this._ading)
            return; //看视频中点击无效
        this._ading = true;
        var self = this;
        if (this._adToggleTag.visible && this._getKeyTimes > 0) {
            TTAPI_1.default.showRewardedVideoAd_ppxhc(function (ok) {
                if (ok) {
                    //todo:看视频成功
                    --self._getKeyTimes;
                    self._keyCount = 3;
                    self.refreshKeyState();
                    self._ading = false;
                }
                else {
                    //todo:未完整观看视频
                    self._ading = false;
                }
            }, function () {
                //todo:看视屏失败
                self._ading = false;
            });
        }
        else {
            //todo:跳过
        }
    };
    TTReward.prototype.onAdToggleStateChange = function (visible) {
        if (visible) {
            this._skipOkTag.visible = true;
            this._skipNoTag.visible = false;
        }
        else {
            this._skipOkTag.visible = false;
            this._skipNoTag.visible = true;
        }
    };
    return TTReward;
}(TTTemplateViewBase_1.default));
exports.default = TTReward;
},{"../../../TTAPI":83,"../../../Utilit":85,"../TTTemplateViewBase":114,"./RewardBox":106}],108:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TTTemplateViewBase_1 = require("../TTTemplateViewBase");
var HttpUnit_1 = require("../../../Net/HttpUnit");
var TTAPI_1 = require("../../../TTAPI");
var Utilit_1 = require("../../../Utilit");
//抖音签到界面
var TTSignIn = /** @class */ (function (_super) {
    __extends(TTSignIn, _super);
    function TTSignIn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone = null;
        _this._signIconRoot = null;
        _this._signIcons = [];
        _this._signMasks = [];
        _this._adToggle = null;
        _this._adToggleTag = null;
        _this._signInBtn = null;
        _this._skipBtn = null;
        _this._skipOkTag = null;
        _this._skipNoTag = null;
        _this._signedTag = null;
        _this._signIning = false; //是否正在签到中
        return _this;
    }
    TTSignIn.prototype.onAwake = function () {
        this._topZone = this.View.getChildByName("TopZone");
        this._centerZone = this.View.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.isIphoneX_()) {
                this._centerZone.top = this._centerZone.top + 75;
            }
        }
        this._signIconRoot = this._centerZone.getChildByName("SignIconRoot");
        for (var i = 0; i < this._signIconRoot.numChildren; ++i) {
            var s = this._signIconRoot.getChildByName(String(i + 1));
            var OkTag = s.getChildByName("Ok");
            OkTag.visible = false;
            var Mask = s.getChildByName("Mask");
            Mask.visible = true;
            this._signIcons.push(OkTag);
            this._signMasks.push(Mask);
        }
        this._adToggle = this._centerZone.getChildByName("AdToggle");
        this._adToggleTag = this._adToggle.getChildByName("Tag");
        this._signInBtn = this._centerZone.getChildByName("SignInBtn");
        this._skipBtn = this._centerZone.getChildByName("SkipBtn");
        this._skipOkTag = this._skipBtn.getChildByName("Ok");
        this._skipNoTag = this._skipBtn.getChildByName("No");
        this._adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.onAdToggleStateChange(this._adToggleTag.visible);
        this._signedTag = this._centerZone.getChildByName("SignedTag");
        this._signedTag.visible = false;
    };
    TTSignIn.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        var self = this;
        HttpUnit_1.default.GetSignIn(function (res) {
            var isSign = res.data.is_sign;
            var signDays = res.data.sign_day_num;
            self.refreshSignInState(signDays);
        }, function (res) {
            //todo:获取签到状态失败
        });
    };
    TTSignIn.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._signInBtn.on(Laya.Event.CLICK, this, this.onSignInBtn);
        this._adToggle.on(Laya.Event.CLICK, this, this.onAdToggle);
        this._skipBtn.on(Laya.Event.CLICK, this, this.onSkipBtn);
    };
    TTSignIn.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._signInBtn.off(Laya.Event.CLICK, this, this.onSignInBtn);
        this._adToggle.off(Laya.Event.CLICK, this, this.onAdToggle);
        this._skipBtn.off(Laya.Event.CLICK, this, this.onSkipBtn);
    };
    //刷新签到状态
    TTSignIn.prototype.refreshSignInState = function (days) {
        var left = days % 7;
        if (0 == days) {
            for (var i = 0; i < this._signIcons.length; ++i) {
                this._signIcons[i].visible = false;
                this._signMasks[i].visible = false;
            }
        }
        else {
            if (0 == left) {
                for (var i = 0; i < this._signIcons.length; ++i) {
                    this._signIcons[i].visible = true;
                    this._signMasks[i].visible = false;
                }
            }
            else {
                for (var i = 0; i < this._signIcons.length; ++i) {
                    this._signIcons[i].visible = i < left;
                    this._signMasks[i].visible = i > left;
                }
            }
        }
    };
    TTSignIn.prototype.onSignInBtn = function () {
        if (this._signIning)
            return; //请在签到中点击无效
        this._signIning = true;
        var self = this;
        TTAPI_1.default.showRewardedVideoAd_ppxhc(function (ok) {
            if (ok) {
                //todo：看视频成功
                HttpUnit_1.default.SignIn(function (res) {
                    var code = res.code;
                    if (1 == code) {
                        //todo:签到成功,多倍奖励
                        HttpUnit_1.default.GetSignIn(function (res) {
                            var isSign = res.data.is_sign;
                            var signDays = res.data.sign_day_num;
                            self.refreshSignInState(signDays);
                            self._signIning = false;
                        }, function (res) {
                            self._signIning = false;
                        });
                    }
                    else {
                        console.log("签到失败 ： code", code);
                        self._signIning = false;
                        //todo:签到失败
                    }
                }, function () {
                    //todo:签到失败
                    self._signIning = false;
                });
            }
            else {
                //todo:未完整观看视频
                self._signIning = false;
            }
        }, function () {
            //todo:看视屏失败
            self._signIning = false;
        });
    };
    TTSignIn.prototype.onAdToggle = function () {
        if (this._signIning)
            return; //请在签到中点击无效
        this._adToggleTag.visible = !this._adToggleTag.visible;
        this.onAdToggleStateChange(this._adToggleTag.visible);
    };
    TTSignIn.prototype.onSkipBtn = function () {
        if (this._signIning)
            return; //请在签到中点击无效
        this._signIning = true;
        var self = this;
        if (this._adToggleTag.visible) {
            TTAPI_1.default.showRewardedVideoAd_ppxhc(function (ok) {
                if (ok) {
                    //todo：看视频成功
                    HttpUnit_1.default.SignIn(function (res) {
                        var code = res.code;
                        if (1 == code) {
                            //todo:签到成功,多倍奖励
                            HttpUnit_1.default.GetSignIn(function (res) {
                                var isSign = res.data.is_sign;
                                var signDays = res.data.sign_day_num;
                                self.refreshSignInState(signDays);
                                self._signIning = false;
                            }, function (res) {
                                self._signIning = false;
                                //todo:获取签到状态失败
                            });
                        }
                        else {
                            console.log("签到失败 ： code", code);
                            self._signIning = false;
                            //todo:签到失败
                        }
                    }, function () {
                        //todo:签到失败
                        self._signIning = false;
                    });
                }
                else {
                    //todo:未完整观看视频
                    self._signIning = false;
                }
            }, function () {
                //todo:看视屏失败
                self._signIning = false;
            });
        }
        else {
            HttpUnit_1.default.SignIn(function (res) {
                var code = res.code;
                if (1 == code) {
                    //todo:签到成功,正常奖励
                    self._signIning = false;
                    HttpUnit_1.default.GetSignIn(function (res) {
                        var isSign = res.data.is_sign;
                        var signDays = res.data.sign_day_num;
                        self.refreshSignInState(signDays);
                    }, function (res) {
                    });
                }
                else {
                    console.log("签到失败 ： code", code);
                    self._signIning = false;
                    //todo:签到失败
                }
            }, function () {
                //todo:签到失败
                self._signIning = false;
            });
        }
    };
    TTSignIn.prototype.onAdToggleStateChange = function (visible) {
        if (visible) {
            this._skipOkTag.visible = true;
            this._skipNoTag.visible = false;
        }
        else {
            this._skipOkTag.visible = false;
            this._skipNoTag.visible = true;
        }
    };
    return TTSignIn;
}(TTTemplateViewBase_1.default));
exports.default = TTSignIn;
},{"../../../Net/HttpUnit":74,"../../../TTAPI":83,"../../../Utilit":85,"../TTTemplateViewBase":114}],109:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TTTemplateViewBase_1 = require("../TTTemplateViewBase");
var TTAPI_1 = require("../../../TTAPI");
var Utilit_1 = require("../../../Utilit");
var TTSkinTips = /** @class */ (function (_super) {
    __extends(TTSkinTips, _super);
    function TTSkinTips() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone = null;
        _this._adToggle = null;
        _this._adToggleTag = null;
        _this._okBtn = null;
        _this._skipBtn = null;
        _this._skipOkTag = null;
        _this._skipNoTag = null;
        _this._skinAnchor = null;
        _this._ading = false; //是否正在看视频中
        return _this;
    }
    TTSkinTips.prototype.onAwake = function () {
        this._topZone = this.View.getChildByName("TopZone");
        this._centerZone = this.View.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.isIphoneX_()) {
                this._centerZone.top = this._centerZone.top + 75;
            }
        }
        this._adToggle = this._centerZone.getChildByName("AdToggle");
        this._adToggleTag = this._adToggle.getChildByName("Tag");
        this._okBtn = this._centerZone.getChildByName("OkBtn");
        this._skipBtn = this._centerZone.getChildByName("SkipBtn");
        this._skipOkTag = this._skipBtn.getChildByName("Ok");
        this._skipNoTag = this._skipBtn.getChildByName("No");
        this._adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.onAdToggleStateChange(this._adToggleTag.visible);
        this._skinAnchor = this._centerZone.getChildByName("SkinAnchor");
    };
    TTSkinTips.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._okBtn.on(Laya.Event.CLICK, this, this.onOkBtn);
        this._adToggle.on(Laya.Event.CLICK, this, this.onAdToggle);
        this._skipBtn.on(Laya.Event.CLICK, this, this.onSkipText);
    };
    TTSkinTips.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._okBtn.off(Laya.Event.CLICK, this, this.onOkBtn);
        this._adToggle.off(Laya.Event.CLICK, this, this.onAdToggle);
        this._skipBtn.off(Laya.Event.CLICK, this, this.onSkipText);
    };
    TTSkinTips.prototype.onOkBtn = function () {
        if (this._ading)
            return; //看视频中点击无效
        this._ading = true;
        var self = this;
        TTAPI_1.default.showRewardedVideoAd_ppxhc(function (ok) {
            if (ok) {
                //todo:看视频成功
                //todo:试用皮肤
            }
            else {
                //todo:未完整观看视频
                self._ading = false;
            }
        }, function () {
            //todo:看视屏失败
            self._ading = false;
        });
    };
    TTSkinTips.prototype.onAdToggle = function () {
        if (this._ading)
            return; //看视频中点击无效
        this._adToggleTag.visible = !this._adToggleTag.visible;
        this.onAdToggleStateChange(this._adToggleTag.visible);
    };
    TTSkinTips.prototype.onSkipText = function () {
        if (this._ading)
            return; //看视频中点击无效
        this._ading = true;
        var self = this;
        if (this._adToggleTag.visible) {
            TTAPI_1.default.showRewardedVideoAd_ppxhc(function (ok) {
                if (ok) {
                    //todo:看视频成功
                    //todo:试用皮肤
                }
                else {
                    //todo:未完整观看视频
                    self._ading = false;
                }
            }, function () {
                //todo:看视屏失败
                self._ading = false;
            });
        }
        else {
            //todo:正常进入游戏，不试用皮肤
        }
    };
    TTSkinTips.prototype.onAdToggleStateChange = function (visible) {
        if (visible) {
            this._skipOkTag.visible = true;
            this._skipNoTag.visible = false;
        }
        else {
            this._skipOkTag.visible = false;
            this._skipNoTag.visible = true;
        }
    };
    return TTSkinTips;
}(TTTemplateViewBase_1.default));
exports.default = TTSkinTips;
},{"../../../TTAPI":83,"../../../Utilit":85,"../TTTemplateViewBase":114}],110:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageList = /** @class */ (function (_super) {
    __extends(PageList, _super);
    function PageList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._list = null;
        _this._pageIcon = new Array();
        _this._pageInfo = null;
        _this._lastScrollValue = 0;
        _this._tweening = false;
        _this._curPage = 0;
        return _this;
    }
    Object.defineProperty(PageList.prototype, "List", {
        get: function () {
            if (null == this._list) {
                this._list = this.owner.getChildByName("List");
            }
            return this._list;
        },
        enumerable: true,
        configurable: true
    });
    PageList.prototype.onAwake = function () {
        this._list = this.owner.getChildByName("List");
        this._pageInfo = this.owner.getChildByName("PageInfo");
        for (var i = 0; i < this._pageInfo.numChildren; ++i) {
            var child = this._pageInfo.getChildAt(i);
            var icon = child.getChildByName("icon");
            this._pageIcon.push(icon);
        }
    };
    PageList.prototype.onUpdate = function () {
        if (!this._tweening && this._lastScrollValue != this._list.scrollBar.value) {
            var totalPage = this._list.array.length / 6 - 1;
            if (this._lastScrollValue < this._list.scrollBar.value) {
                ++this._curPage;
                if (this._curPage >= totalPage) {
                    this._curPage = totalPage;
                }
            }
            else {
                --this._curPage;
                if (this._curPage <= 0) {
                    this._curPage = 0;
                }
            }
            this._tweening = true;
            var self_1 = this;
            this._list.tweenTo(this._curPage * 6, 500, Laya.Handler.create(this, function () {
            }));
            Laya.timer.once(500, this, function () {
                self_1._tweening = false;
                self_1._lastScrollValue = self_1._list.scrollBar.value;
            });
        }
    };
    return PageList;
}(Laya.Script));
exports.default = PageList;
},{}],111:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../../../User/User");
var StoreBox = /** @class */ (function (_super) {
    __extends(StoreBox, _super);
    function StoreBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._root = null;
        _this._unlockedTag = null;
        _this._usedTag = null;
        _this._index = -1;
        _this._view = null;
        return _this;
    }
    StoreBox.prototype.onAwake = function () {
        this._root = this.owner.getChildByName("Root");
        this._unlockedTag = this._root.getChildByName("Unlock");
        this._usedTag = this._root.getChildByName("Used");
    };
    StoreBox.prototype.onEnable = function () {
        this.owner.on(Laya.Event.CLICK, this, this.onBoxClick);
    };
    StoreBox.prototype.onDisable = function () {
        this.owner.on(Laya.Event.CLICK, this, this.onBoxClick);
    };
    StoreBox.prototype.setData = function (index, view, data, selected) {
        this._index = index;
        this._view = view;
        this._unlockedTag.visible = User_1.default.itemIsUnlocked(data.id);
        this._usedTag.visible = User_1.default.curUsedItem == data.id;
        this._root.visible = (-10086 != data.id);
    };
    StoreBox.prototype.onBoxClick = function () {
        if (null != this._view && -1 != this._index) {
            this._view.onBoxClick(this._index);
        }
    };
    return StoreBox;
}(Laya.Script));
exports.default = StoreBox;
},{"../../../User/User":84}],112:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TTTemplateViewBase_1 = require("../TTTemplateViewBase");
var PageList_1 = require("./PageList");
var StoreBox_1 = require("./StoreBox");
var User_1 = require("../../../User/User");
var StoreConfig_1 = require("../../../Config/StoreConfig");
var Utilit_1 = require("../../../Utilit");
var TTStore = /** @class */ (function (_super) {
    __extends(TTStore, _super);
    function TTStore() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone = null;
        _this._is3d = false; //当前页面展示模式是否是3D，如果是3D则会隐藏2D展示界面
        _this._closeBtn = null;
        _this._displayZone = null;
        _this._displayIcon = null;
        _this._storeListZone = null;
        _this._storeList = null;
        _this._priceUnlockBtn = null;
        _this._videoUnlockBtn = null;
        _this._useBtn = null;
        _this._usedTag = null;
        _this._curSelected = 0;
        return _this;
    }
    TTStore.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._topZone = this.View.getChildByName("TopZone");
        this._centerZone = this.View.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.isIphoneX_()) {
                this._centerZone.top = this._centerZone.top + 75;
            }
        }
        this._closeBtn = this._centerZone.getChildByName("CloseBtn");
        this._displayZone = this._centerZone.getChildByName("DisplayZone");
        this._displayIcon = this._displayZone.getChildByName("DisplayIcon");
        this._storeListZone = this._centerZone.getChildByName("StoreListZone");
        this._storeList = this._storeListZone.getComponent(PageList_1.default);
        this._storeList.List.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._storeList.List.hScrollBarSkin = "";
        this._videoUnlockBtn = this._storeListZone.getChildByName("VideoUnlockBtn");
        this._priceUnlockBtn = this._storeListZone.getChildByName("PriceUnlockBtn");
        this._useBtn = this._storeListZone.getChildByName("UseBtn");
        this._usedTag = this._useBtn.getChildByName("Used");
    };
    TTStore.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        if (this._is3d) {
            this._displayZone.visible = false;
        }
        this.refreshStoreList();
        this._storeList.List.selectedIndex = 0;
        this.onBoxClick(0);
    };
    TTStore.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._closeBtn.on(Laya.Event.CLICK, this, this.onCloseBtn);
        this._priceUnlockBtn.on(Laya.Event.CLICK, this, this.onPriceUnlockBtn);
        this._videoUnlockBtn.on(Laya.Event.CLICK, this, this.onVideoUnlockBtn);
    };
    TTStore.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._closeBtn.off(Laya.Event.CLICK, this, this.onCloseBtn);
        this._priceUnlockBtn.off(Laya.Event.CLICK, this, this.onPriceUnlockBtn);
        this._videoUnlockBtn.off(Laya.Event.CLICK, this, this.onVideoUnlockBtn);
    };
    TTStore.prototype.onCloseBtn = function () {
        this.closeView();
    };
    TTStore.prototype.onPriceUnlockBtn = function () {
        var data = this._storeList.List.array[this._curSelected];
    };
    TTStore.prototype.onVideoUnlockBtn = function () {
        var data = this._storeList.List.array[this._curSelected];
    };
    TTStore.prototype.refreshStoreList = function () {
        var storeDatas = StoreConfig_1.default.getInstance().getStoreDatas();
        var add = 6 - (storeDatas.length % 6);
        for (var i = 0; i < add; ++i) {
            var d = new StoreConfig_1.StoreData();
            d.id = -10086;
            storeDatas.push(d); //占位
        }
        this._storeList.List.array = storeDatas;
    };
    TTStore.prototype.onListRender = function (cell, index) {
        var data = this._storeList.List.array[index];
        var storeBox = cell.getComponent(StoreBox_1.default);
        storeBox.setData(index, this, data, this._curSelected == index);
    };
    TTStore.prototype.onBoxClick = function (index) {
        this._curSelected = index;
        var data = this._storeList.List.array[this._curSelected];
        //todo：这里处理选中后的逻辑
        User_1.default.curUsedItem = data.id;
        var unlocked = User_1.default.itemIsUnlocked(data.id);
        this._priceUnlockBtn.visible = 0 == data.priceType && !unlocked;
        this._videoUnlockBtn.visible = 1 == data.priceType && !unlocked;
        this._useBtn.visible = unlocked;
        this._usedTag.visible = data.id == User_1.default.curUsedItem;
        this._storeList.List.refresh();
    };
    return TTStore;
}(TTTemplateViewBase_1.default));
exports.default = TTStore;
},{"../../../Config/StoreConfig":6,"../../../User/User":84,"../../../Utilit":85,"../TTTemplateViewBase":114,"./PageList":110,"./StoreBox":111}],113:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../../View/ViewBase");
var EventDef_1 = require("../../../Event/EventDef");
var EventMgr_1 = require("../../../Event/EventMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var TTAPI_1 = require("../../../TTAPI");
var TTCrazyClick_ppxhc = /** @class */ (function (_super) {
    __extends(TTCrazyClick_ppxhc, _super);
    function TTCrazyClick_ppxhc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._clickBar_ppxhc = null;
        _this._totalClickTimer_ppxhc = 15; //用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
        _this._needClickTime_ppxhc = 10; //一共点多少次能够获得奖励，用于显示进度条
        _this._bannerClickTime_ppxhc = Math.floor(Math.random() * 5) + 2; //点多少次开始显示bannerr套路用户   
        return _this;
    }
    TTCrazyClick_ppxhc.prototype.onAwake = function () {
        var _this = this;
        this.drgon = this.owner.getChildByName("panch");
        this._click_Btn_ppxhc = this.owner.getChildByName("Click_Btn");
        this._click_Btn_ppxhc.on(Laya.Event.CLICK, this, this.ButtonClicked);
        this._arrow_Img_ppxhc = this._click_Btn_ppxhc.getChildByName("Arrow_Img");
        this._getPrize_View_ppxhc = this.owner.getChildByName("GetPrize_View");
        this._prizeCount_Text_ppxhc = this._getPrize_View_ppxhc.getChildByName("PrizeCount_Text");
        this._confirm_Btn_ppxhc = this._getPrize_View_ppxhc.getChildByName("Confirm_Btn");
        this._getPrize_View_ppxhc.visible = false;
        this._clickBar_ppxhc = this.owner.getChildByName("ClickBar").getChildByName("ClickBar");
        this._clickBarOriginalWidth_ppxhc = this._clickBar_ppxhc.width;
        this._clickBar_ppxhc.width = 0;
        this._clickTime_ppxhc = 0;
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
    TTCrazyClick_ppxhc.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        Laya.stage.on(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
    };
    TTCrazyClick_ppxhc.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        Laya.stage.off(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
    };
    TTCrazyClick_ppxhc.prototype.onUpdate = function () {
        if (this._arrowUp_ppxhc) {
            this._arrow_Img_ppxhc.top += Laya.timer.delta / 5;
            if (this._arrow_Img_ppxhc.top > -140) {
                this._arrowUp_ppxhc = false;
            }
        }
        else {
            this._arrow_Img_ppxhc.top -= Laya.timer.delta / 5;
            if (this._arrow_Img_ppxhc.top < -180) {
                this._arrowUp_ppxhc = true;
            }
        }
        if (!this._bannerClicked_ppxhc) {
            var spd = 2 + (this._clickBar_ppxhc.width / this._clickBarOriginalWidth_ppxhc) * 4;
            if (this._clickBar_ppxhc.width >= spd) {
                this._clickBar_ppxhc.width -= spd;
            }
            if ((this._clickBar_ppxhc.width / this._clickBarOriginalWidth_ppxhc) + 0.1 < (this._clickTime_ppxhc / this._needClickTime_ppxhc)) {
                this._clickTime_ppxhc--;
            }
        }
    };
    TTCrazyClick_ppxhc.prototype.openView = function (data) {
        this._compeletFunction_ppxhc = data.Complete;
        this._prizeCount_ppxhc = data.PrizeCount;
        _super.prototype.openView.call(this, data);
    };
    TTCrazyClick_ppxhc.prototype.OpenPrizeWindow = function () {
        var self = this;
        this._prizeCount_Text_ppxhc.text = this._prizeCount_ppxhc.toString();
        this._getPrize_View_ppxhc.visible = true;
        this._confirm_Btn_ppxhc.once(Laya.Event.CLICK, this, function () {
            TTAPI_1.default.hideBanner();
            if (self._compeletFunction_ppxhc) {
                self._compeletFunction_ppxhc();
            }
            self.closeView();
        });
    };
    TTCrazyClick_ppxhc.prototype.ShowBanner = function () {
        if (AppSwitchConfig_1.default.getInstance().getAppSwitchData().ttcfg.kuangdianBanner == 1) {
            TTAPI_1.default.showBanner();
        }
    };
    TTCrazyClick_ppxhc.prototype.ButtonClicked = function () {
        var _this = this;
        this._clickTime_ppxhc++;
        this._totalClickTime++;
        if (null != this.drgon) {
            this.drgon.play(1, false);
            this.drgon.once(Laya.Event.STOPPED, this, function () {
                _this.drgon.play(0, true);
            });
        }
        if (this._clickTime_ppxhc > this._needClickTime_ppxhc) {
            this._clickTime_ppxhc = this._needClickTime_ppxhc;
        }
        if (this._clickTime_ppxhc >= this._bannerClickTime_ppxhc) {
            if (this._clickTime_ppxhc >= this._needClickTime_ppxhc) {
                this._clickTime_ppxhc = this._needClickTime_ppxhc - 1;
            }
            if (this._bannerClicked_ppxhc) {
                return;
            }
            this._bannerClicked_ppxhc = true;
            this.ShowBanner();
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        else if (this._totalClickTime > this._totalClickTimer_ppxhc) {
            this.ShowBanner();
            this.BannerClicked();
        }
        var progress = (this._clickTime_ppxhc / this._needClickTime_ppxhc) * this._clickBarOriginalWidth_ppxhc;
        this._clickBar_ppxhc.width = progress;
    };
    TTCrazyClick_ppxhc.prototype.BannerClicked = function () {
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_WudianBanner_Hide);
        this._bannerClicked_ppxhc = true;
        this._clickTime_ppxhc = this._needClickTime_ppxhc;
        this._clickBar_ppxhc.width = this._clickBarOriginalWidth_ppxhc;
        this._click_Btn_ppxhc.visible = false;
        this.OpenPrizeWindow();
    };
    TTCrazyClick_ppxhc.prototype.onDestroy = function () {
        TTAPI_1.default.hideBanner();
    };
    TTCrazyClick_ppxhc.prototype.onFocusChange = function () {
        if (null != this.drgon) {
            this.drgon.play(0, true);
        }
    };
    return TTCrazyClick_ppxhc;
}(ViewBase_1.default));
exports.default = TTCrazyClick_ppxhc;
},{"../../../Config/AppSwitchConfig":5,"../../../Event/EventDef":7,"../../../Event/EventMgr":8,"../../../TTAPI":83,"../../../View/ViewBase":132}],114:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var Utilit_1 = require("../../Utilit");
var TTTemplateViewBase = /** @class */ (function (_super) {
    __extends(TTTemplateViewBase, _super);
    function TTTemplateViewBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._topZone = null;
        return _this;
    }
    Object.defineProperty(TTTemplateViewBase.prototype, "TopZone", {
        get: function () {
            if (null == this._topZone) {
                this._topZone = this.View.getChildByName("TopZone");
            }
            return this._topZone;
        },
        enumerable: true,
        configurable: true
    });
    TTTemplateViewBase.prototype.onAwake = function () {
        this._topZone = this.View.getChildByName("TopZone");
        if (null != this._topZone && Utilit_1.default.isIphoneX_()) {
            this._topZone.top = this._topZone.top + 75;
        }
    };
    TTTemplateViewBase.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    TTTemplateViewBase.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    return TTTemplateViewBase;
}(ViewBase_1.default));
exports.default = TTTemplateViewBase;
},{"../../Utilit":85,"../ViewBase":132}],115:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var KRQ_VLoopAd_1 = require("../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var Utilit_1 = require("../../../Utilit");
var ViewMgr_1 = require("../../../Mgr/ViewMgr");
var WXADMgr_1 = require("../../../Mgr/WXADMgr");
var ShareAd_1 = require("../../../ShareAd/ShareAd");
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var Exprot2View_ppxhc_Template = /** @class */ (function (_super) {
    __extends(Exprot2View_ppxhc_Template, _super);
    function Exprot2View_ppxhc_Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._continue_ppxhc_Btn = null;
        _this._krqVLoop_ppxhc_Ad = null;
        _this._KRQ_VLoopAd = null;
        _this._isCanClose = false;
        _this._banner = null;
        return _this;
    }
    Exprot2View_ppxhc_Template.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._krqVLoop_ppxhc_Ad = this.View.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd_1.default);
        this._krqVLoop_ppxhc_Ad.useLocalRandom = true;
        this._krqVLoop_ppxhc_Ad.useRandom = false;
        this._krqVLoop_ppxhc_Ad.useMovePause = false;
        this._krqVLoop_ppxhc_Ad.sortDatas = this.sortDatas;
        this._continue_ppxhc_Btn = this.View.getChildByName("ContinueBtn");
        this._continue_ppxhc_Btn.visible = false;
        var self = this;
        if (WudianMgr_1.default.Wudian_ppxhc_Flag && 1 == AppSwitchConfig_1.default.getInstance().getAppSwitchData().continueBanner) {
            Laya.timer.once(AppSwitchConfig_1.default.getInstance().getAppSwitchData().continueBtnDelayTime * 1000, self, function () {
                self._continue_ppxhc_Btn.visible = true;
                Laya.timer.once(AppSwitchConfig_1.default.getInstance().getAppSwitchData().continueBannerShowTime * 1000, self, function () {
                    self.ShowBanner();
                    Laya.timer.once(AppSwitchConfig_1.default.getInstance().getAppSwitchData().continueBannerHideTime * 1000, self, function () {
                        self._isCanClose = true;
                        if (null != self._banner) {
                            self._banner.hide();
                        }
                        self._banner = null;
                    });
                });
            });
        }
        else {
            Laya.timer.once(AppSwitchConfig_1.default.getInstance().getAppSwitchData().continueBtnDelayTime * 1000, self, function () {
                self._continue_ppxhc_Btn.visible = true;
                self._isCanClose = true;
            });
        }
        this._KRQ_VLoopAd = this.View.getChildByName("KRQ_VLoopAd");
        if (Utilit_1.default.isIphoneX_()) {
            this._KRQ_VLoopAd.top = this._KRQ_VLoopAd.top + 75;
        }
    };
    Exprot2View_ppxhc_Template.prototype.onStart = function () {
        this._krqVLoop_ppxhc_Ad.AdPos_ppxhc_ID = ShareAd_1.default.MoreGameLocationID;
        _super.prototype.onStart.call(this);
    };
    Exprot2View_ppxhc_Template.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._continue_ppxhc_Btn.on(Laya.Event.CLICK, this, this.onContinueBtn);
    };
    Exprot2View_ppxhc_Template.prototype.remove_ppxhc_Event = function () {
        _super.prototype.remove_ppxhc_Event.call(this);
        this._continue_ppxhc_Btn.off(Laya.Event.CLICK, this, this.onContinueBtn);
    };
    Exprot2View_ppxhc_Template.prototype.ShowBanner = function () {
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
                self.History_ppxhc_Btn.visible = true;
            }
        });
    };
    Exprot2View_ppxhc_Template.prototype.onDestroy = function () {
        if (null != this._banner) {
            this._banner.hide();
        }
        this._banner = null;
    };
    Exprot2View_ppxhc_Template.prototype.onContinueBtn = function () {
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
    Exprot2View_ppxhc_Template.prototype.sortDatas = function (datas) {
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
    return Exprot2View_ppxhc_Template;
}(TemplateViewBase_1.default));
exports.default = Exprot2View_ppxhc_Template;
},{"../../../Config/AppSwitchConfig":5,"../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd":54,"../../../Mgr/ViewMgr":69,"../../../Mgr/WXADMgr":70,"../../../Mgr/WudianMgr":71,"../../../ShareAd/ShareAd":79,"../../../Utilit":85,"../TemplateViewBase":125}],116:[function(require,module,exports){
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
        if (Utilit_1.default.isIphoneX_()) {
            this._KRQ_VLoopAd.top = this._KRQ_VLoopAd.top + 75;
        }
    };
    Exprot3ViewTemplate.prototype.onStart = function () {
        this._krqVLoopAd.AdPos_ppxhc_ID = ShareAd_1.default.MoreGameLocationID;
        _super.prototype.onStart.call(this);
        if (WudianMgr_1.default.Wudian_ppxhc_Flag) {
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
                self.History_ppxhc_Btn.visible = true;
            }
        });
    };
    Exprot3ViewTemplate.prototype.BtnUp = function () {
        this._clickTag = true;
        this._closeBtn.bottom = 270;
    };
    Exprot3ViewTemplate.prototype.onCloseBtn = function () {
        if (!this._clickTag && WudianMgr_1.default.Wudian_ppxhc_Flag) {
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
        ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.MiniGameView, null, function (v) {
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
},{"../../../Config/AppSwitchConfig":5,"../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd":54,"../../../Mgr/ViewMgr":69,"../../../Mgr/WXADMgr":70,"../../../Mgr/WudianMgr":71,"../../../ShareAd/ShareAd":79,"../../../Utilit":85,"../TemplateViewBase":125}],117:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var KRQ_VLoopAd_1 = require("../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var ExportView_ppxhc_Template = /** @class */ (function (_super) {
    __extends(ExportView_ppxhc_Template, _super);
    function ExportView_ppxhc_Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._continue_ppxhc_Btn = null;
        _this._krqVLoop_ppxhc_Ad = null;
        return _this;
    }
    ExportView_ppxhc_Template.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._krqVLoop_ppxhc_Ad = this.View.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd_1.default);
        this._krqVLoop_ppxhc_Ad = this.View.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd_1.default);
        this._continue_ppxhc_Btn = this._krqVLoop_ppxhc_Ad.Sprite.getChildByName("ContinueBtn");
        this._continue_ppxhc_Btn.visible = false;
        var self = this;
        Laya.timer.once(AppSwitchConfig_1.default.getInstance().getAppSwitchData().continueBtnDelayTime * 1000, this, function () {
            self._continue_ppxhc_Btn.visible = true;
        });
    };
    ExportView_ppxhc_Template.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
    };
    ExportView_ppxhc_Template.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._continue_ppxhc_Btn.on(Laya.Event.CLICK, this, this.onContinueBtn);
    };
    ExportView_ppxhc_Template.prototype.remove_ppxhc_Event = function () {
        _super.prototype.remove_ppxhc_Event.call(this);
        this._continue_ppxhc_Btn.off(Laya.Event.CLICK, this, this.onContinueBtn);
    };
    ExportView_ppxhc_Template.prototype.onContinueBtn = function () {
    };
    return ExportView_ppxhc_Template;
}(TemplateViewBase_1.default));
exports.default = ExportView_ppxhc_Template;
},{"../../../Config/AppSwitchConfig":5,"../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd":54,"../TemplateViewBase":125}],118:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var WXADMgr_1 = require("../../../Mgr/WXADMgr");
var KRQ_RollSingleAd_1 = require("../../../KRQ/Com/KRQ_RollSingleAd");
var Utilit_1 = require("../../../Utilit");
var ViewMgr_1 = require("../../../Mgr/ViewMgr");
var GameFailViewTemplate = /** @class */ (function (_super) {
    __extends(GameFailViewTemplate, _super);
    function GameFailViewTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone = null;
        _this._backBtn = null;
        _this._continueBtn = null;
        _this._rollSingleAds = new Array();
        _this._clickTag = false;
        _this._clickTimingTag = false;
        _this._banner = null;
        return _this;
    }
    GameFailViewTemplate.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._centerZone = this.View.getChildByName("CenterZone");
        if (Utilit_1.default.isIphoneX_()) {
            this._centerZone.top = this._centerZone.top + 75;
        }
        this._backBtn = this._centerZone.getChildByName("BackBtn");
        this._continueBtn = this._centerZone.getChildByName("ContinueBtn");
        for (var i = 0; i < this._centerZone.numChildren; ++i) {
            var ad = this._centerZone.getChildAt(i).getComponent(KRQ_RollSingleAd_1.default);
            if (null == ad)
                continue;
            this._rollSingleAds.push(ad);
        }
        if (WudianMgr_1.default.Wudian_ppxhc_Flag) {
            this.History_ppxhc_Btn.visible = false;
        }
    };
    GameFailViewTemplate.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        if (WudianMgr_1.default.Wudian_ppxhc_Flag) {
            var yPos = this._centerZone.height - 150;
            this._backBtn.y = yPos;
            this._continueBtn.y = yPos;
        }
        var _loop_1 = function (i) {
            var ad = this_1._rollSingleAds[i];
            Laya.timer.once(150, this_1, function () {
                ad.play_ppxhc_Ani();
            });
        };
        var this_1 = this;
        for (var i = 0; i < this._rollSingleAds.length; ++i) {
            _loop_1(i);
        }
        var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
        var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
        Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
        Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
    };
    GameFailViewTemplate.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._backBtn.on(Laya.Event.CLICK, this, this.onBackBtn);
        this._continueBtn.on(Laya.Event.CLICK, this, this.onContinueBtn);
    };
    GameFailViewTemplate.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._backBtn.off(Laya.Event.CLICK, this, this.onBackBtn);
        this._continueBtn.off(Laya.Event.CLICK, this, this.onContinueBtn);
    };
    GameFailViewTemplate.prototype.onBackBtn = function () {
        if (!this._clickTag && WudianMgr_1.default.Wudian_ppxhc_Flag) {
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
    GameFailViewTemplate.prototype.onContinueBtn = function () {
        if (!this._clickTag && WudianMgr_1.default.Wudian_ppxhc_Flag) {
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
    GameFailViewTemplate.prototype.BannerUp = function () {
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
                self.History_ppxhc_Btn.visible = true;
            }
        });
    };
    GameFailViewTemplate.prototype.BtnUp = function () {
        this._clickTag = true;
        this._backBtn.y = 720;
        this._continueBtn.y = 720;
    };
    GameFailViewTemplate.prototype.onDestroy = function () {
        if (null != this._banner) {
            this._banner.hide();
        }
        this._banner = null;
    };
    GameFailViewTemplate.prototype.onHistoryBtn = function () {
        var self = this;
        ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.MiniGameView, null, function (v) {
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
    return GameFailViewTemplate;
}(TemplateViewBase_1.default));
exports.default = GameFailViewTemplate;
},{"../../../Config/AppSwitchConfig":5,"../../../KRQ/Com/KRQ_RollSingleAd":56,"../../../Mgr/ViewMgr":69,"../../../Mgr/WXADMgr":70,"../../../Mgr/WudianMgr":71,"../../../Utilit":85,"../TemplateViewBase":125}],119:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var WXADMgr_1 = require("../../../Mgr/WXADMgr");
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var KRQ_RollSingleAd_1 = require("../../../KRQ/Com/KRQ_RollSingleAd");
var Utilit_1 = require("../../../Utilit");
var ViewMgr_1 = require("../../../Mgr/ViewMgr");
var GameWinViewTemplate = /** @class */ (function (_super) {
    __extends(GameWinViewTemplate, _super);
    function GameWinViewTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._centerZone = null;
        _this._back_ppxhc_Btn = null;
        _this._next_ppxhc_Btn = null;
        _this._rollSingleAds = new Array();
        _this._click_ppxhc_Tag = false;
        _this._clickTiming_ppxhc_Tag = false;
        _this._banner = null;
        return _this;
    }
    GameWinViewTemplate.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._centerZone = this.View.getChildByName("CenterZone");
        if (Utilit_1.default.isIphoneX_()) {
            this._centerZone.top = this._centerZone.top + 75;
        }
        this._back_ppxhc_Btn = this._centerZone.getChildByName("BackBtn");
        this._next_ppxhc_Btn = this._centerZone.getChildByName("NextBtn");
        for (var i = 0; i < this._centerZone.numChildren; ++i) {
            var ad = this._centerZone.getChildAt(i).getComponent(KRQ_RollSingleAd_1.default);
            if (null == ad)
                continue;
            this._rollSingleAds.push(ad);
        }
        if (WudianMgr_1.default.Wudian_ppxhc_Flag) {
            this.History_ppxhc_Btn.visible = false;
        }
    };
    GameWinViewTemplate.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        if (WudianMgr_1.default.Wudian_ppxhc_Flag) {
            var yPos = this._centerZone.height - 150;
            this._back_ppxhc_Btn.y = yPos;
            this._next_ppxhc_Btn.y = yPos;
        }
        var _loop_1 = function (i) {
            var ad = this_1._rollSingleAds[i];
            Laya.timer.once(150, this_1, function () {
                ad.play_ppxhc_Ani();
            });
        };
        var this_1 = this;
        for (var i = 0; i < this._rollSingleAds.length; ++i) {
            _loop_1(i);
        }
        var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
        var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
        // Laya.timer.once(bannerMoveTimer * 1000,this,this.BannerUp);
        // Laya.timer.once(btnMoveTimer * 1000,this,this.BtnUp);
    };
    GameWinViewTemplate.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._back_ppxhc_Btn.on(Laya.Event.CLICK, this, this.onBackBtn);
        this._next_ppxhc_Btn.on(Laya.Event.CLICK, this, this.onNextBtn);
    };
    GameWinViewTemplate.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._back_ppxhc_Btn.off(Laya.Event.CLICK, this, this.onBackBtn);
        this._next_ppxhc_Btn.off(Laya.Event.CLICK, this, this.onNextBtn);
    };
    GameWinViewTemplate.prototype.onBackBtn = function () {
        if (!this._click_ppxhc_Tag && WudianMgr_1.default.Wudian_ppxhc_Flag) {
            var self = this;
            if (!this._clickTiming_ppxhc_Tag) {
                this._clickTiming_ppxhc_Tag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        //todo:你的代码
    };
    GameWinViewTemplate.prototype.onNextBtn = function () {
        if (!this._click_ppxhc_Tag && WudianMgr_1.default.Wudian_ppxhc_Flag) {
            var self = this;
            if (!this._clickTiming_ppxhc_Tag) {
                this._clickTiming_ppxhc_Tag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().btnMoveTimer;
                var bannerMoveTimer = AppSwitchConfig_1.default.getInstance().getAppSwitchData().bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        //todo:你的代码
    };
    GameWinViewTemplate.prototype.BannerUp = function () {
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
                self.History_ppxhc_Btn.visible = true;
            }
        });
    };
    GameWinViewTemplate.prototype.BtnUp = function () {
        this._click_ppxhc_Tag = true;
        this._back_ppxhc_Btn.y = 720;
        this._next_ppxhc_Btn.y = 720;
    };
    GameWinViewTemplate.prototype.onDestroy = function () {
        if (null != this._banner) {
            this._banner.hide();
        }
        this._banner = null;
    };
    GameWinViewTemplate.prototype.onHistory_ppxhc_Btn = function () {
        var self = this;
        ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.MiniGameView, null, function (v) {
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
},{"../../../Config/AppSwitchConfig":5,"../../../KRQ/Com/KRQ_RollSingleAd":56,"../../../Mgr/ViewMgr":69,"../../../Mgr/WXADMgr":70,"../../../Mgr/WudianMgr":71,"../../../Utilit":85,"../TemplateViewBase":125}],120:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var Utilit_1 = require("../../../Utilit");
var InGameShowType;
(function (InGameShowType) {
    InGameShowType[InGameShowType["Normal"] = 0] = "Normal";
    InGameShowType[InGameShowType["NoLoopAd"] = 1] = "NoLoopAd";
    InGameShowType[InGameShowType["NoBannerAd"] = 2] = "NoBannerAd";
})(InGameShowType = exports.InGameShowType || (exports.InGameShowType = {}));
var InGameViewTemplate = /** @class */ (function (_super) {
    __extends(InGameViewTemplate, _super);
    function InGameViewTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_ppxhc_Zone = null;
        _this._krq_ppxhc_Main = null;
        return _this;
    }
    InGameViewTemplate.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._center_ppxhc_Zone = this.View.getChildByName("CenterZone");
        // this._krq_ppxhc_Main = this.View.getChildByName("KRQ_Main").getComponent(KRQ_Main);
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.isIphoneX_()) {
                this._center_ppxhc_Zone.top = this._center_ppxhc_Zone.top + 75;
            }
        }
        else {
            this._center_ppxhc_Zone.top = this._center_ppxhc_Zone.top - 200;
            if (Utilit_1.default.isIphoneX_()) {
                this._center_ppxhc_Zone.top = this._center_ppxhc_Zone.top + 75;
            }
        }
    };
    InGameViewTemplate.prototype.openView = function (data) {
        _super.prototype.openView.call(this, data);
        // if(null != data &&  null != data.showType)
        // {
        //     let showType = data.showType as InGameShowType;
        //     switch(showType)
        //     {
        //         case InGameShowType.Normal:
        //             this._krq_ppxhc_Main.switchState(KRQ_MainState.Normal);
        //             break;
        //         case InGameShowType.NoLoopAd:
        //             this._krq_ppxhc_Main.switchState(KRQ_MainState.NoLoopAd);
        //             break;
        //         case InGameShowType.NoBannerAd:
        //             this._krq_ppxhc_Main.switchState(KRQ_MainState.NoBannerAd);
        //             break;
        //     }
        // }
    };
    InGameViewTemplate.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
    };
    InGameViewTemplate.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    InGameViewTemplate.prototype.remove_ppxhc_Event = function () {
        _super.prototype.remove_ppxhc_Event.call(this);
    };
    return InGameViewTemplate;
}(TemplateViewBase_1.default));
exports.default = InGameViewTemplate;
},{"../../../Utilit":85,"../TemplateViewBase":125}],121:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var EventMgr_1 = require("../../../Event/EventMgr");
var EventDef_1 = require("../../../Event/EventDef");
var User_1 = require("../../../User/User");
var Utilit_1 = require("../../../Utilit");
var MainView_ppxhc_Template = /** @class */ (function (_super) {
    __extends(MainView_ppxhc_Template, _super);
    function MainView_ppxhc_Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._krq_ppxhc_Main = null;
        _this._center_ppxhc_Zone = null;
        _this._start_ppxhc_Btn = null;
        _this._level_ppxhc_Num = null;
        _this._money_ppxhc_Num = null;
        return _this;
    }
    MainView_ppxhc_Template.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        // this._krq_ppxhc_Main = this.View.getChildByName("KRQ_Main").getComponent(KRQ_Main);
        this._center_ppxhc_Zone = this.View.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.isIphoneX_()) {
                this._center_ppxhc_Zone.top = this._center_ppxhc_Zone.top + 75;
            }
        }
        else {
            this._center_ppxhc_Zone.top = this._center_ppxhc_Zone.top - 200;
            if (Utilit_1.default.isIphoneX_()) {
                this._center_ppxhc_Zone.top = this._center_ppxhc_Zone.top + 75;
            }
        }
        this._start_ppxhc_Btn = this._center_ppxhc_Zone.getChildByName("StartBtn");
        this._level_ppxhc_Num = this._center_ppxhc_Zone.getChildByName("LevelInfo").getChildByName("LevelNum");
        this._money_ppxhc_Num = this._center_ppxhc_Zone.getChildByName("MoneyInfo").getChildByName("MoneyNum");
    };
    MainView_ppxhc_Template.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        this._money_ppxhc_Num.value = String(User_1.default.get_ppxhc_Money());
        this._level_ppxhc_Num.value = String(User_1.default.get_ppxhc_LeveNum());
    };
    MainView_ppxhc_Template.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._start_ppxhc_Btn.on(Laya.Event.CLICK, this, this.onStartBtn);
        EventMgr_1.default.instance.regEvemt_(EventDef_1.Event_ppxhc_Def.Game_OnUserMoneyChange, this, this.onUserMoneyChange);
    };
    MainView_ppxhc_Template.prototype.remove_ppxhc_Event = function () {
        _super.prototype.remove_ppxhc_Event.call(this);
        this._start_ppxhc_Btn.off(Laya.Event.CLICK, this, this.onStartBtn);
        EventMgr_1.default.instance.removeEvent_(EventDef_1.Event_ppxhc_Def.Game_OnUserMoneyChange, this, this.onUserMoneyChange);
    };
    MainView_ppxhc_Template.prototype.onStartBtn = function () {
    };
    MainView_ppxhc_Template.prototype.onUserMoneyChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._money_ppxhc_Num.value = String(curr);
    };
    return MainView_ppxhc_Template;
}(TemplateViewBase_1.default));
exports.default = MainView_ppxhc_Template;
},{"../../../Event/EventDef":7,"../../../Event/EventMgr":8,"../../../User/User":84,"../../../Utilit":85,"../TemplateViewBase":125}],122:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../ViewBase");
var KRQ_History_1 = require("../../../KRQ/Com/KRQ_History/KRQ_History");
var MiniGameView_ppxhc_Template = /** @class */ (function (_super) {
    __extends(MiniGameView_ppxhc_Template, _super);
    function MiniGameView_ppxhc_Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._krq_ppxhc_history = null;
        return _this;
    }
    MiniGameView_ppxhc_Template.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._krq_ppxhc_history = this.View.getChildByName("KRQ_History").getComponent(KRQ_History_1.default);
        var self = this;
        this._krq_ppxhc_history.OnBackBtn_ppxhc_Click = function () {
            self.closeView();
        };
    };
    MiniGameView_ppxhc_Template.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
    };
    MiniGameView_ppxhc_Template.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    MiniGameView_ppxhc_Template.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    return MiniGameView_ppxhc_Template;
}(ViewBase_1.default));
exports.default = MiniGameView_ppxhc_Template;
},{"../../../KRQ/Com/KRQ_History/KRQ_History":50,"../../ViewBase":132}],123:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../ViewBase");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var OPPOAPI_1 = require("../../../OPPOAPI");
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var OPPONativeAdView_ppxhc_Template = /** @class */ (function (_super) {
    __extends(OPPONativeAdView_ppxhc_Template, _super);
    function OPPONativeAdView_ppxhc_Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._native_ppxhc_Ad = null;
        _this._cur_ppxhc_AdItem = null;
        return _this;
    }
    OPPONativeAdView_ppxhc_Template.prototype.onAwake = function () {
        this._center_ppxhc_Zone = this.owner.getChildByName("CenterZone");
        this._display = this._center_ppxhc_Zone.getChildByName("Display");
        this._ok_ppxhc_Btn = this._center_ppxhc_Zone.getChildByName("OkBtn");
        this._close_ppxhc_Btn = this._center_ppxhc_Zone.getChildByName("CloseBtn");
        this._ppxhc_bg = this.owner.getChildByName("BG");
    };
    OPPONativeAdView_ppxhc_Template.prototype.onEnable = function () {
        var _this = this;
        _super.prototype.onEnable.call(this);
        this.loadAd();
        this._ppxhc_bg.height = Laya.stage.height;
        this._close_ppxhc_Btn.visible = false;
        Laya.timer.once(AppSwitchConfig_1.default.getInstance().getAppSwitchData().oppocfg.btnShowTimer, this, function () {
            _this._close_ppxhc_Btn.visible = true;
        });
    };
    OPPONativeAdView_ppxhc_Template.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._ok_ppxhc_Btn.on(Laya.Event.CLICK, this, this.onOkBtn);
        this._close_ppxhc_Btn.on(Laya.Event.CLICK, this, this.onCloseBtn);
        this._display.on(Laya.Event.CLICK, this, this.onDisplayClick);
    };
    OPPONativeAdView_ppxhc_Template.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._ok_ppxhc_Btn.off(Laya.Event.CLICK, this, this.onOkBtn);
        this._close_ppxhc_Btn.off(Laya.Event.CLICK, this, this.onCloseBtn);
        this._display.off(Laya.Event.CLICK, this, this.onDisplayClick);
    };
    OPPONativeAdView_ppxhc_Template.prototype.loadAd = function () {
        var self = this;
        var ipBlocked = WudianMgr_1.default.GetIp_ppxhc_Blocked();
        if (!ipBlocked) {
            self.closeView();
            return;
        }
        if (Laya.Browser.onQGMiniGame) {
            if (this._native_ppxhc_Ad) {
                this._native_ppxhc_Ad.destroy();
                this._native_ppxhc_Ad = null;
            }
            this._cur_ppxhc_AdItem = null;
            this._native_ppxhc_Ad = qg.createNativeAd({
                posId: OPPOAPI_1.default.NativeAdId
            });
            this._native_ppxhc_Ad.load();
            this._native_ppxhc_Ad.onLoad(function (res) {
                console.log("原生广告加载成功：", res);
                var adlist = res.adList;
                for (var i = 0; i < adlist.length; ++i) {
                    var ad = adlist[i];
                    console.log("原生广告数据：", i);
                    for (var key in ad) {
                        console.log(key, ad[key]);
                    }
                }
                self._cur_ppxhc_AdItem = adlist[Math.floor(Math.random() * adlist.length)];
                if (null != self._cur_ppxhc_AdItem) {
                    for (var i = 0; i < self._cur_ppxhc_AdItem.imgUrlList.length; ++i) {
                        console.log("imgUrlList : ", i + " ", self._cur_ppxhc_AdItem.imgUrlList[i]);
                    }
                    var imgulr = self._cur_ppxhc_AdItem.imgUrlList[Math.floor(Math.random() * self._cur_ppxhc_AdItem.imgUrlList.length)];
                    self._display.loadImage(imgulr);
                    self._native_ppxhc_Ad.reportAdShow({
                        adId: self._cur_ppxhc_AdItem.adId
                    });
                    console.log("加载图片", imgulr);
                    console.log("点击上报！！！");
                }
                self._center_ppxhc_Zone.visible = true;
            });
            this._native_ppxhc_Ad.onError(function (res) {
                console.log("原生广告加载失败：", res);
                for (var key in res) {
                    console.log(key, res[key]);
                }
                self.closeView();
            });
            this._center_ppxhc_Zone.visible = false;
        }
    };
    OPPONativeAdView_ppxhc_Template.prototype.onCloseBtn = function () {
        this.closeView();
    };
    OPPONativeAdView_ppxhc_Template.prototype.onOkBtn = function () {
        if (Math.random() * 100 <= AppSwitchConfig_1.default.getInstance().getAppSwitchData().oppocfg.yuansheng) {
            console.log("进入变态广告");
            this.onDisplayClick();
        }
        this.closeView();
    };
    OPPONativeAdView_ppxhc_Template.prototype.onDisplayClick = function () {
        if (null != this._native_ppxhc_Ad && null != this._cur_ppxhc_AdItem) {
            console.log("点击上报！！！");
            this._native_ppxhc_Ad.reportAdClick({
                adId: this._cur_ppxhc_AdItem.adId
            });
        }
    };
    OPPONativeAdView_ppxhc_Template.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        if (Laya.Browser.onQGMiniGame) {
            if (this._native_ppxhc_Ad) {
                this._native_ppxhc_Ad.destroy();
            }
            this._native_ppxhc_Ad = null;
            this._cur_ppxhc_AdItem = null;
        }
    };
    return OPPONativeAdView_ppxhc_Template;
}(ViewBase_1.default));
exports.default = OPPONativeAdView_ppxhc_Template;
},{"../../../Config/AppSwitchConfig":5,"../../../Mgr/WudianMgr":71,"../../../OPPOAPI":77,"../../ViewBase":132}],124:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var RewardView_ppxhc_Template = /** @class */ (function (_super) {
    __extends(RewardView_ppxhc_Template, _super);
    function RewardView_ppxhc_Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_ppxhc_Zone = null;
        _this._reward_ppxhc_Btn = null;
        _this._skip_ppxhc_Btn = null;
        return _this;
    }
    RewardView_ppxhc_Template.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._center_ppxhc_Zone = this.View.getChildByName("CenterZone");
        this._reward_ppxhc_Btn = this._center_ppxhc_Zone.getChildByName("RewradBtn");
        this._skip_ppxhc_Btn = this._center_ppxhc_Zone.getChildByName("SkipBtn");
    };
    RewardView_ppxhc_Template.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
    };
    RewardView_ppxhc_Template.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._reward_ppxhc_Btn.on(Laya.Event.CLICK, this, this.onRewardBtn);
        this._skip_ppxhc_Btn.on(Laya.Event.CLICK, this, this.onSkipBtn);
    };
    RewardView_ppxhc_Template.prototype.remove_ppxhc_Event = function () {
        _super.prototype.remove_ppxhc_Event.call(this);
        this._reward_ppxhc_Btn.off(Laya.Event.CLICK, this, this.onRewardBtn);
        this._skip_ppxhc_Btn.off(Laya.Event.CLICK, this, this.onSkipBtn);
    };
    RewardView_ppxhc_Template.prototype.onRewardBtn = function () {
    };
    RewardView_ppxhc_Template.prototype.onSkipBtn = function () {
    };
    return RewardView_ppxhc_Template;
}(TemplateViewBase_1.default));
exports.default = RewardView_ppxhc_Template;
},{"../TemplateViewBase":125}],125:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var TemplateViewBase = /** @class */ (function (_super) {
    __extends(TemplateViewBase, _super);
    function TemplateViewBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._historyBtn = null;
        _this._topZone = null;
        return _this;
    }
    Object.defineProperty(TemplateViewBase.prototype, "History_ppxhc_Btn", {
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
        // this._topZone = this.View.getChildByName("TopZone") as Laya.Clip;
        // if(Utilit_.isIphoneX_())
        // {
        //     this._topZone.top =  this._topZone.top + 75;
        // }
        // this._historyBtn = this._topZone.getChildByName("HistoryBtn") as Laya.Sprite;
        // if(-1 == Wudian_ppxhc_Mgr.IpBlock_ppxhc_Flag())
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
        // this.History_ppxhc_Btn.on(Laya.Event.CLICK,this,this.onHistory_ppxhc_Btn)
        // EventMgr.instance.regEvemt_(Event_ppxhc_Def.App_OnUpdateIpBlockState,this,this.onUpdateIpBlockState);
    };
    TemplateViewBase.prototype.remove_ppxhc_Event = function () {
        _super.prototype.removeEvent.call(this);
        // this.History_ppxhc_Btn.off(Laya.Event.CLICK,this,this.onHistory_ppxhc_Btn);
        // EventMgr.instance.removeEvent_(Event_ppxhc_Def.App_OnUpdateIpBlockState,this,this.onUpdateIpBlockState);
    };
    TemplateViewBase.prototype.onHistory_ppxhc_Btn = function () {
        // let self = this;
        // ViewMgr.instance.openView(View_ppxhc_Def.MiniGameView,null,(v : MiniGameView_ppxhc_Template)=>
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
            // if(Laya.Browser.onQGMiniGame || !noEnterBySearch || !Wudian_ppxhc_Mgr.GetIp_ppxhc_Blocked() 
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
},{"../ViewBase":132}],126:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDef_1 = require("../../../Event/EventDef");
var EventMgr_1 = require("../../../Event/EventMgr");
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var WXADMgr_1 = require("../../../Mgr/WXADMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var ViewBase_1 = require("../../ViewBase");
var Utilit_1 = require("../../../Utilit");
var WXCrazyClick = /** @class */ (function (_super) {
    __extends(WXCrazyClick, _super);
    function WXCrazyClick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._clickBar = null;
        _this._totalClickTimer = 15; //用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
        _this._needClickTime = 10; //一共点多少次能够获得奖励，用于显示进度条
        _this._bannerClickTime = Math.floor(Math.random() * 5) + 2; //点多少次开始显示bannerr套路用户
        _this._banner = null;
        _this.cariTaillgas = null;
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
                self.drgon.visible = false;
                console.log("quanji 加载完成!!!!", template);
            }), Laya.Handler.create(_this, function () { }), "", 0, false, "", true);
        }), Laya.Handler.create(this, function () { }), "", 0, false, "", true);
        this.cariTaillgas = Utilit_1.default.FindChild(this.owner, "Car/Tailgas");
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
            if (WudianMgr_1.default.Wudian_ppxhc_Flag && 1 == AppSwitchConfig_1.default.getInstance().getAppSwitchData().wxcfg.kuangdianBanner) {
                this.ShowBanner();
            }
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        else if (this._totalClickTime > this._totalClickTimer) {
            if (WudianMgr_1.default.Wudian_ppxhc_Flag && 1 == AppSwitchConfig_1.default.getInstance().getAppSwitchData().wxcfg.kuangdianBanner) {
                this.ShowBanner();
            }
            this.BannerClicked();
        }
        var progress = (this._clickTime / this._needClickTime) * this._clickBarOriginalWidth;
        this._clickBar.width = progress;
        Laya.timer.once(1000, this, this.StopAnimation);
        Laya.timer.frameLoop(1, this, this.CarAnimation);
    };
    WXCrazyClick.prototype.StopAnimation = function () {
        Laya.timer.clear(this, this.CarAnimation);
    };
    WXCrazyClick.prototype.CarAnimation = function () {
        if (Laya.timer.currFrame % 3 != 0) {
            return;
        }
        this.cariTaillgas.visible = !this.cariTaillgas.visible;
    };
    WXCrazyClick.prototype.BannerClicked = function () {
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.AD_WudianBanner_Hide);
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
},{"../../../Config/AppSwitchConfig":5,"../../../Event/EventDef":7,"../../../Event/EventMgr":8,"../../../Mgr/WXADMgr":70,"../../../Mgr/WudianMgr":71,"../../../Utilit":85,"../../ViewBase":132}],127:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var TipsView = /** @class */ (function (_super) {
    __extends(TipsView, _super);
    function TipsView() {
        return _super.call(this) || this;
    }
    TipsView.prototype.onAwake = function () {
        this._bg = this.owner.getChildByName("Bg");
        this._bg.x = Laya.stage.width / 2 - this._bg.width / 2;
        this._tipsText = this._bg.getChildByName("Text");
    };
    TipsView.prototype.openView = function (data) {
        _super.prototype.openView.call(this, data);
        this.setTipsMsg(data);
        Laya.timer.clearAll(this);
        var self = this;
        Laya.timer.once(3000, this, function () {
            self.closeView();
        });
    };
    TipsView.prototype.setTipsMsg = function (msg) {
        this._tipsText.text = msg;
    };
    return TipsView;
}(ViewBase_1.default));
exports.default = TipsView;
},{"../ViewBase":132}],128:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TwinkleSprite = /** @class */ (function (_super) {
    __extends(TwinkleSprite, _super);
    function TwinkleSprite() {
        var _this = _super.call(this) || this;
        /** @prop {name:TwinkleSpeed, tips:"闪动速度", type:Number, default:1000}*/
        _this.TwinkleSpeed = 1000;
        /** @prop {name:TwinkleMinSize, tips:"最小缩放", type:Number, default:0.95}*/
        _this.TwinkleMinSize = 0.95;
        /** @prop {name:TwinkleMaxSize, tips:"最大缩放", type:Number, default:1.05}*/
        _this.TwinkleMaxSize = 1.05;
        _this._aniForward = false;
        _this._fontSize = 25;
        _this._originSize = 1;
        return _this;
    }
    TwinkleSprite.prototype.onAwake = function () {
        this._displaySp = this.owner;
        this._disText = this.owner.getChildByName("TitelText");
        this._originSize = this._displaySp.scaleX;
        if (this._disText != null) {
            this._disText.text = "";
            this._fontSize = this._disText.fontSize;
        }
    };
    TwinkleSprite.prototype.onEnable = function () {
        this._displaySp.scale(this._originSize, this._originSize);
    };
    TwinkleSprite.prototype.onDisable = function () {
    };
    TwinkleSprite.prototype.onUpdate = function () {
        this.displayAni();
    };
    TwinkleSprite.prototype.displayAni = function () {
        if (!this._aniForward) {
            var scale = this._displaySp.scaleX - Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.max(scale, this.TwinkleMinSize * this._originSize);
            this._displaySp.scale(scale, scale);
            if (this._displaySp.scaleX <= this.TwinkleMinSize * this._originSize) {
                this._aniForward = true;
            }
        }
        else {
            var scale = this._displaySp.scaleX + Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.min(scale, this.TwinkleMaxSize * this._originSize);
            this._displaySp.scale(scale, scale);
            if (this._displaySp.scaleX >= this.TwinkleMaxSize * this._originSize) {
                this._aniForward = false;
            }
        }
    };
    return TwinkleSprite;
}(Laya.Script));
exports.default = TwinkleSprite;
},{}],129:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VVTemplateViewBase_1 = require("../VVTemplateViewBase");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var VIVOAPI_1 = require("../../../VIVOAPI");
var VVNativeAd1View = /** @class */ (function (_super) {
    __extends(VVNativeAd1View, _super);
    function VVNativeAd1View() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._nativeAd = null;
        _this._curAdItem = null;
        return _this;
    }
    VVNativeAd1View.prototype.onAwake = function () {
        this._centerZone = this.owner.getChildByName("CenterZone");
        this._display = this._centerZone.getChildByName("Display");
        this._okBtn = this._centerZone.getChildByName("OkBtn");
        this._closeBtn = this._centerZone.getChildByName("CloseBtn");
        this._bg = this.owner.getChildByName("BG");
    };
    VVNativeAd1View.prototype.onEnable = function () {
        var _this = this;
        _super.prototype.onEnable.call(this);
        this.loadAd();
        this._bg.height = Laya.stage.height;
        this._closeBtn.visible = false;
        Laya.timer.once(AppSwitchConfig_1.default.getInstance().getAppSwitchData().vivocfg.btnShowTimer, this, function () {
            _this._closeBtn.visible = true;
        });
    };
    VVNativeAd1View.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._okBtn.on(Laya.Event.CLICK, this, this.onOkBtn);
        this._closeBtn.on(Laya.Event.CLICK, this, this.onCloseBtn);
        this._display.on(Laya.Event.CLICK, this, this.onDisplayClick);
    };
    VVNativeAd1View.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._okBtn.off(Laya.Event.CLICK, this, this.onOkBtn);
        this._closeBtn.off(Laya.Event.CLICK, this, this.onCloseBtn);
        this._display.off(Laya.Event.CLICK, this, this.onDisplayClick);
    };
    VVNativeAd1View.prototype.loadAd = function () {
        var self = this;
        var ipBlocked = WudianMgr_1.default.GetIp_ppxhc_Blocked();
        if (!ipBlocked) {
            self.closeView();
            return;
        }
        if (Laya.Browser.onVVMiniGame) {
            if (this._nativeAd) {
                this._nativeAd.destroy();
                this._nativeAd = null;
            }
            this._curAdItem = null;
            this._nativeAd = qg.createNativeAd({
                posId: VIVOAPI_1.default.nativeAdId
            });
            this._nativeAd.load();
            this._nativeAd.onLoad(function (res) {
                console.log("原生广告加载成功：", res);
                var adlist = res.adList;
                for (var i = 0; i < adlist.length; ++i) {
                    var ad = adlist[i];
                    console.log("原生广告数据：", i);
                    for (var key in ad) {
                        console.log(key, ad[key]);
                    }
                }
                self._curAdItem = adlist[Math.floor(Math.random() * adlist.length)];
                if (null != self._curAdItem) {
                    for (var i = 0; i < self._curAdItem.imgUrlList.length; ++i) {
                        console.log("imgUrlList : ", i + " ", self._curAdItem.imgUrlList[i]);
                    }
                    var imgulr = self._curAdItem.imgUrlList[Math.floor(Math.random() * self._curAdItem.imgUrlList.length)];
                    self._display.loadImage(imgulr);
                    self._nativeAd.reportAdShow({
                        adId: self._curAdItem.adId
                    });
                    console.log("加载图片", imgulr);
                    console.log("点击上报！！！");
                }
                self._centerZone.visible = true;
            });
            this._nativeAd.onError(function (res) {
                console.log("原生广告加载失败：", res);
                for (var key in res) {
                    console.log(key, res[key]);
                }
                self.closeView();
            });
            this._centerZone.visible = false;
        }
    };
    VVNativeAd1View.prototype.onCloseBtn = function () {
        this.closeView();
    };
    VVNativeAd1View.prototype.onOkBtn = function () {
        if (Math.random() * 100 <= AppSwitchConfig_1.default.getInstance().getAppSwitchData().vivocfg.yuansheng) {
            console.log("进入变态广告");
            this.onDisplayClick();
        }
        this.closeView();
    };
    VVNativeAd1View.prototype.onDisplayClick = function () {
        if (null != this._nativeAd && null != this._curAdItem) {
            console.log("点击上报！！！");
            this._nativeAd.reportAdClick({
                adId: this._curAdItem.adId
            });
        }
    };
    VVNativeAd1View.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        if (Laya.Browser.onVVMiniGame) {
            if (this._nativeAd) {
                this._nativeAd.destroy();
            }
            this._nativeAd = null;
            this._curAdItem = null;
        }
    };
    return VVNativeAd1View;
}(VVTemplateViewBase_1.default));
exports.default = VVNativeAd1View;
},{"../../../Config/AppSwitchConfig":5,"../../../Mgr/WudianMgr":71,"../../../VIVOAPI":86,"../VVTemplateViewBase":131}],130:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VVNativeAd1View_1 = require("./VVNativeAd1View");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var VVNativeAd2View = /** @class */ (function (_super) {
    __extends(VVNativeAd2View, _super);
    function VVNativeAd2View() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VVNativeAd2View.prototype.onOkBtn = function () {
        if (Math.random() * 100 <= AppSwitchConfig_1.default.getInstance().getAppSwitchData().vivocfg.yuansheng2) {
            console.log("进入变态广告");
            this.onDisplayClick();
        }
        this.closeView();
    };
    return VVNativeAd2View;
}(VVNativeAd1View_1.default));
exports.default = VVNativeAd2View;
},{"../../../Config/AppSwitchConfig":5,"./VVNativeAd1View":129}],131:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var VVTemplateViewBase = /** @class */ (function (_super) {
    __extends(VVTemplateViewBase, _super);
    function VVTemplateViewBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VVTemplateViewBase.prototype.onAwake = function () {
    };
    VVTemplateViewBase.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    VVTemplateViewBase.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    return VVTemplateViewBase;
}(ViewBase_1.default));
exports.default = VVTemplateViewBase;
},{"../ViewBase":132}],132:[function(require,module,exports){
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
        _this._viewDef = ViewMgr_1.View_ppxhc_Def.None;
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
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Game_OnViewOpen, { view: this._viewDef });
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
        EventMgr_1.default.instance.dispatch_(EventDef_1.Event_ppxhc_Def.Game_OnViewClose, { view: this._viewDef });
        if (this.onCloseEvent) {
            this.onCloseEvent();
        }
    };
    return ViewBase;
}(Laya.Script));
exports.default = ViewBase;
},{"../Event/EventDef":7,"../Event/EventMgr":8,"../Mgr/ViewMgr":69,"../Utilit":85,"./IViewStateListener":92}],133:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
var ViewMgr_1 = require("./Mgr/ViewMgr");
var WudianMgr_1 = require("./Mgr/WudianMgr");
var User_1 = require("./User/User");
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
var WXAPI_ = /** @class */ (function () {
    function WXAPI_() {
    }
    WXAPI_.wxLogin_ = function (onSuccess, onFail) {
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
    WXAPI_.onRewardedVideoAdLoad = function () {
        console.log('激励视频 广告加载完成');
    };
    WXAPI_.onRewardedVideoAdError = function (err) {
        console.log('激励视频 广告加载失败' + err);
        if (WXAPI_._onRewardedVideoAdFailed) {
            WXAPI_._onRewardedVideoAdFailed();
        }
    };
    WXAPI_.onRewardedVideoAdClose = function (res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看');
            if (WXAPI_._onRewardedVideoAdClose) {
                WXAPI_._onRewardedVideoAdClose(true);
            }
        }
        else {
            console.log('激励视频 未完整观看');
            if (WXAPI_._onRewardedVideoAdClose) {
                WXAPI_._onRewardedVideoAdClose(false);
            }
        }
    };
    WXAPI_.regRewardedVideoAdEvent = function (rewardedVideoAd) {
        rewardedVideoAd.onLoad(WXAPI_.onRewardedVideoAdLoad);
        rewardedVideoAd.onError(WXAPI_.onRewardedVideoAdError);
        rewardedVideoAd.onClose(WXAPI_.onRewardedVideoAdClose);
        WXAPI_._isRegRewardedVideoAdEvent = true;
    };
    WXAPI_.showRewardedVideoAd_ = function (onAdClose, onFailed) {
        if (Laya.Browser.onMiniGame) {
            WXAPI_._onRewardedVideoAdClose = onAdClose;
            WXAPI_._onRewardedVideoAdFailed = onFailed;
            var rewardedVideoAd = Laya.Browser.window["wx"].createRewardedVideoAd({
                adUnitId: WXAPI_.adUnitId_,
            });
            if (!WXAPI_._isRegRewardedVideoAdEvent) {
                WXAPI_.regRewardedVideoAdEvent(rewardedVideoAd);
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
    WXAPI_.navigateToMiniProgram_ = function (appId, path, onSuccess, onFail, onComplate) {
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
    WXAPI_.share = function (complate, titel, imageUrl) {
        var _this = this;
        if (Laya.Browser.onMiniGame) {
            WXAPI_._onShow = function () {
                Laya.Browser.window["wx"].offShow(WXAPI_._onShow);
                WXAPI_._onShow = null;
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
            Laya.Browser.window["wx"].onShow(WXAPI_._onShow);
            WXAPI_._lastShareTime = Date.now();
            Laya.Browser.window["wx"].shareAppMessage({
                title: titel,
                imageUrl: imageUrl
            });
        }
    };
    //----------------------------------------------------------------------
    //--------------------插屏幕广告---------------------------------------
    WXAPI_.showInterstitialAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onMiniGame) {
            var interstitialAd = Laya.Browser.window["wx"].createInterstitialAd({
                adUnitId: WXAPI_.InsAdUnitId,
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
    WXAPI_.getLaunchOptionsSync = function () {
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
    WXAPI_.SetShareMenu = function (titel, imageUrl, success, fail, complate) {
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
    WXAPI_.checkUpdate = function () {
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
    WXAPI_.tryShowWXCrazyClick = function (titel, onComplete, onSuccess, onFail) {
        if (User_1.default.get_ppxhc_LeveNum() <= AppSwitchConfig_1.default.getInstance().getAppSwitchData().wxcfg.startKuangdianLevel) {
            if (onFail) {
                onFail();
            }
            return;
        }
        if (!WudianMgr_1.default.Wudian_ppxhc_Flag || 1 != AppSwitchConfig_1.default.getInstance().getAppSwitchData().wxcfg.kuangdianBanner) {
            if (onFail) {
                onFail();
            }
            return;
        }
        var kuangdianLevelSpcacing = AppSwitchConfig_1.default.getInstance().getAppSwitchData().wxcfg.kuangdianLevelSpcacing;
        if (0 != kuangdianLevelSpcacing) {
            var left = WXAPI_._crazyClickShowCounter % kuangdianLevelSpcacing;
            if (0 == left) {
                ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.WXCrazyClick, {
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
            ++WXAPI_._crazyClickShowCounter;
        }
        else {
            ViewMgr_1.default.instance.openView(ViewMgr_1.View_ppxhc_Def.WXCrazyClick, {
                Complete: onComplete,
                titel: titel
            }, function (v) {
                if (onSuccess) {
                    onSuccess();
                }
            });
        }
    };
    WXAPI_.adUnitId_ = "adunit-2b8464e79b780a23";
    WXAPI_.bannerAdUnitId = "adunit-c83fc9bb634048f2";
    WXAPI_.InsAdUnitId = "adunit-93c0c3df0866601b";
    WXAPI_.GameRecorder = new GameRecorder();
    //-------------------------激励视频---------------------------------
    WXAPI_._isRegRewardedVideoAdEvent = false;
    WXAPI_._onRewardedVideoAdFailed = null;
    WXAPI_._onRewardedVideoAdClose = null;
    //----------------------------------------------------------------------
    //---------------------分享----------------------------------------
    WXAPI_._onShow = null;
    WXAPI_._lastShareTime = 0;
    WXAPI_._crazyClickShowCounter = 0;
    return WXAPI_;
}());
exports.default = WXAPI_;
},{"./Config/AppSwitchConfig":5,"./Mgr/ViewMgr":69,"./Mgr/WudianMgr":71,"./User/User":84}],134:[function(require,module,exports){
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
            LoadingUI.uiView = { "type": "Scene", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Script", "props": { "y": 0, "x": 0, "runtime": "View/LoadingView/LoadingView.ts" }, "compId": 7 }, { "type": "Image", "props": { "y": -208, "x": 0, "width": 750, "skin": "subRes/image/bg.jpg", "name": "Background", "height": 3149 }, "compId": 35 }, { "type": "Clip", "props": { "top": 0, "right": 0, "name": "Bg", "left": 0, "bottom": 0 }, "compId": 17, "child": [{ "type": "Sprite", "props": { "y": 121, "x": 95, "texture": "Loading/logo.png", "name": "logo" }, "compId": 9 }, { "type": "Sprite", "props": { "y": 348, "x": 161, "texture": "Loading/sp_carlogo.png", "name": "mainlogo" }, "compId": 10 }, { "type": "Clip", "props": { "skin": "comp/clip_num.png", "right": 0, "name": "BottomZone", "left": 0, "height": 570, "bottom": 100 }, "compId": 18, "child": [{ "type": "Clip", "props": { "y": 326, "x": 376, "width": 615, "skin": "Loading/loadingxiatiao.png", "pivotY": 22, "pivotX": 308, "name": "processBarBg", "height": 44, "sizeGrid": "0,25,0,25" }, "compId": 19, "child": [{ "type": "Clip", "props": { "y": 22, "x": 10, "width": 594, "skin": "Loading/loadingshangtiao.png", "pivotY": 13, "name": "processBar", "left": 11, "height": 26, "bottom": 9, "sizeGrid": "0,12,0,12" }, "compId": 20, "child": [{ "type": "Text", "props": { "y": -54, "x": 186, "text": "Loading... ...", "fontSize": 40, "color": "#ffffff", "runtime": "laya.display.Text" }, "compId": 37 }] }] }] }] }], "loadList": ["subRes/image/bg.jpg", "Loading/logo.png", "Loading/sp_carlogo.png", "comp/clip_num.png", "Loading/loadingxiatiao.png", "Loading/loadingshangtiao.png"], "loadList3D": [] };
            return LoadingUI;
        }(Scene));
        View.LoadingUI = LoadingUI;
        REG("ui.View.LoadingUI", LoadingUI);
    })(View = ui.View || (ui.View = {}));
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[65])