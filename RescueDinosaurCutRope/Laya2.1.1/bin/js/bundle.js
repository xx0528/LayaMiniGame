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
var ALDEv_JJKLBB_entDef;
(function (ALDEv_JJKLBB_entDef) {
    ALDEv_JJKLBB_entDef["None"] = "";
    ALDEv_JJKLBB_entDef["ReportAdClickSuccess"] = "\u5E7F\u544A\u5BFC\u51FA\u6210\u529F";
    ALDEv_JJKLBB_entDef["ReportAdClickFail"] = "\u5E7F\u544A\u5BFC\u51FA\u5931\u8D25";
    //todo:添加你自己的阿拉丁事件
    ALDEv_JJKLBB_entDef["EnterLoading"] = "\u8FDB\u5165loading\u754C\u9762";
    ALDEv_JJKLBB_entDef["EnterMainView"] = "\u8FDB\u5165\u4E3B\u754C\u9762";
    ALDEv_JJKLBB_entDef["ClickGameStart"] = "\u70B9\u51FB\u8FDB\u5165\u6E38\u620F";
    ALDEv_JJKLBB_entDef["EnterStartClickGetPrize"] = "\u6E38\u620F\u5F00\u59CB\u8FDB\u5165\u72C2\u70B9";
    ALDEv_JJKLBB_entDef["EnterStartClickGetPrizeScene"] = "\u6E38\u620F\u5F00\u59CB\u8FDB\u5165\u72C2\u70B9\u573A\u666F\u503C";
    ALDEv_JJKLBB_entDef["StayStartClickGetPrizeTime"] = "\u6E38\u620F\u5F00\u59CB\u72C2\u70B9\u505C\u7559\u65F6\u95F4";
    ALDEv_JJKLBB_entDef["EnterBattleView"] = "\u8FDB\u5165\u6E38\u620F\u754C\u9762";
    ALDEv_JJKLBB_entDef["EnterComplateClickGetPrize"] = "\u6E38\u620F\u7ED3\u675F\u8FDB\u5165\u72C2\u70B9";
    ALDEv_JJKLBB_entDef["EnterComplateClickGetPrizeScene"] = "\u6E38\u620F\u7ED3\u675F\u8FDB\u5165\u72C2\u70B9\u573A\u666F\u503C";
    ALDEv_JJKLBB_entDef["StayComplateClickGetPrizeTime"] = "\u6E38\u620F\u7ED3\u675F\u72C2\u70B9\u505C\u7559\u65F6\u95F4";
    ALDEv_JJKLBB_entDef["EnterGameOverMoreGame"] = "\u6E38\u620F\u7ED3\u675F\u8FDB\u5165\u5BFC\u51FA\u754C\u9762";
    ALDEv_JJKLBB_entDef["EnterGameComplateView"] = "\u8FDB\u5165\u6E38\u620F\u7ED3\u675F\u754C\u9762";
    ALDEv_JJKLBB_entDef["WXBannerLoadFail"] = "banner\u52A0\u8F7D\u5931\u8D25";
})(ALDEv_JJKLBB_entDef = exports.ALDEv_JJKLBB_entDef || (exports.ALDEv_JJKLBB_entDef = {}));
//阿拉丁相关接口
var A_JJKLBB_LD = /** @class */ (function () {
    function A_JJKLBB_LD() {
    }
    A_JJKLBB_LD.aldSendOpenId = function (openid) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ", openid);
        }
        else if (Laya.Browser.onQQMiniGame) {
            Laya.Browser.window["qq"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ", openid);
        }
    };
    A_JJKLBB_LD.aldSen_JJKLBB_dEvent = function (event, data) {
        var eventName = event;
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].aldSendEvent(eventName, data);
        }
        else if (Laya.Browser.onQQMiniGame) {
            Laya.Browser.window["qq"].aldSendEvent(eventName, data);
        }
    };
    A_JJKLBB_LD.aldSendReportA_JJKLBB_dClickSuccess = function (data) {
        var type = ALDEv_JJKLBB_entDef.ReportAdClickSuccess + " " + data.title + ":" + String(data.appid);
        var ald = A_JJKLBB_LD;
        ald.aldSen_JJKLBB_dEvent(type, {
            "导出成功": data.title + ":" + String(data.appid)
        });
    };
    A_JJKLBB_LD.aldSendRepo_JJKLBB_rtAdClickFail = function (data) {
        var type = ALDEv_JJKLBB_entDef.ReportAdClickFail + " " + data.title + ":" + String(data.appid);
        var ald = A_JJKLBB_LD;
        ald.aldSen_JJKLBB_dEvent(type, {
            "导出失败": data.title + ":" + String(data.appid)
        });
    };
    A_JJKLBB_LD.aldSendOnlySingleReport = function (eventType, reportData) {
        console.log("ALD 上报 aldSendOnlySingleReport : ", eventType);
        var value = A_JJKLBB_LD._singleReportMap[eventType];
        if (null != value) {
            return;
        }
        A_JJKLBB_LD.aldSen_JJKLBB_dEvent(eventType, reportData);
        A_JJKLBB_LD._singleReportMap[eventType] = true;
    };
    A_JJKLBB_LD._singleReportMap = {};
    return A_JJKLBB_LD;
}());
exports.default = A_JJKLBB_LD;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppC_JJKLBB_onfig = /** @class */ (function () {
    function AppC_JJKLBB_onfig() {
    }
    AppC_JJKLBB_onfig.Ap_JJKLBB_pID = "";
    AppC_JJKLBB_onfig.ResSe_JJKLBB_rver = ""; //资源服务器地址
    AppC_JJKLBB_onfig.LocalTes_JJKLBB_tReServer = "subRes"; //本地测试资源服务器地址
    AppC_JJKLBB_onfig.Ver_JJKLBB_sions = "0.0.0";
    return AppC_JJKLBB_onfig;
}());
exports.default = AppC_JJKLBB_onfig;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
var ALD_1 = require("./ALD");
var CachedW_JJKLBB_XBannerAd = /** @class */ (function () {
    function CachedW_JJKLBB_XBannerAd() {
    }
    CachedW_JJKLBB_XBannerAd.preload_JJKLBB_Banner = function () {
        var wxWuDianBanners = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wxWuDianB_JJKLBB_anners;
        var bannerTodayBannerMax = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().bannerTod_JJKLBB_ayBannerMax;
        // var wxWuDianBanners = [WXAPI.bannerAdUnitId];
        var bannerTodayBannerMax = 5;
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
        Laya.timer.loop(2000, CachedW_JJKLBB_XBannerAd._preLo_JJKLBB_opObj, function () {
            if (counter >= preLoadBanners.length) {
                Laya.timer.clearAll(CachedW_JJKLBB_XBannerAd._preLo_JJKLBB_opObj);
                return;
            }
            var bannerid = preLoadBanners[counter];
            var banner = CachedW_JJKLBB_XBannerAd._banner_JJKLBB_Cache[bannerid];
            if (null == banner) {
                banner = CachedW_JJKLBB_XBannerAd.cre_JJKLBB_ate(bannerid);
                if (null != banner) {
                    CachedW_JJKLBB_XBannerAd._banner_JJKLBB_Cache[bannerid] = banner;
                    console.log("预创建微信Bannaer", bannerid, "完成");
                }
            }
            ++counter;
        });
    };
    CachedW_JJKLBB_XBannerAd.getB_JJKLBB_anner = function (bannerid) {
        if (null == bannerid || "" == bannerid)
            return null;
        var banner = CachedW_JJKLBB_XBannerAd._banner_JJKLBB_Cache[bannerid];
        if (null == banner) {
            banner = CachedW_JJKLBB_XBannerAd.cre_JJKLBB_ate(bannerid);
            if (null != banner) {
                CachedW_JJKLBB_XBannerAd._banner_JJKLBB_Cache[bannerid] = banner;
            }
        }
        return banner;
    };
    CachedW_JJKLBB_XBannerAd.cre_JJKLBB_ate = function (bannerid) {
        if (Laya.Browser.onMiniGame) {
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            var banner = Laya.Browser.window["wx"].createBannerAd({
                adUnitId: bannerid,
                adIntervals: 30,
                style: {
                    left: 0,
                    top: (Laya.stage.height - 290) / Laya.stage.height * sh,
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
                    ALD_1.default.aldSendOnlySingleReport(ALD_1.ALDEv_JJKLBB_entDef.WXBannerLoadFail, {
                        "banner加载失败原因": err
                    });
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
    CachedW_JJKLBB_XBannerAd.show = function () {
        if (null != CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner) {
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner.hide();
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner = null;
        }
        var wuDianBanners = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wxWuDianB_JJKLBB_anners;
        var bannerid = wuDianBanners[Math.floor(Math.random() * wuDianBanners.length)];
        var banner = CachedW_JJKLBB_XBannerAd.getB_JJKLBB_anner(bannerid);
        if (banner) {
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner = banner;
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner.show();
            console.log("CachedWXBanner 广告显示 bannerid ： ", bannerid);
        }
        var time = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().bannerFres_JJKLBB_hTimer;
        //Laya.timer.once(time * 1000,CachedWXBannerAd,CachedWXBannerAd.changeShow);
    };
    CachedW_JJKLBB_XBannerAd.hide = function () {
        Laya.timer.clearAll(CachedW_JJKLBB_XBannerAd);
        if (null != CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner) {
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner.hide();
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner = null;
        }
        console.log("CachedWXBanner 广告隐藏");
    };
    CachedW_JJKLBB_XBannerAd.changeShow = function () {
        if (null != CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner) {
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner.hide();
            CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner = null;
        }
        CachedW_JJKLBB_XBannerAd.show();
    };
    CachedW_JJKLBB_XBannerAd.clear = function () {
        Laya.timer.clearAll(CachedW_JJKLBB_XBannerAd);
        for (var key in CachedW_JJKLBB_XBannerAd._banner_JJKLBB_Cache) {
            var banner = CachedW_JJKLBB_XBannerAd._banner_JJKLBB_Cache[key];
            if (null != banner) {
                banner.destroy();
            }
            CachedW_JJKLBB_XBannerAd._banner_JJKLBB_Cache[key] = null;
        }
    };
    CachedW_JJKLBB_XBannerAd._banner_JJKLBB_Cache = {};
    CachedW_JJKLBB_XBannerAd._curBa_JJKLBB_nner = null;
    CachedW_JJKLBB_XBannerAd._preLo_JJKLBB_opObj = {};
    return CachedW_JJKLBB_XBannerAd;
}());
exports.default = CachedW_JJKLBB_XBannerAd;
},{"./ALD":1,"./Config/AppSwitchConfig":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("../AppConfig");
var AppSwit_JJKLBB_chData = /** @class */ (function () {
    function AppSwit_JJKLBB_chData() {
        this.ban_JJKLBB_ner = 0;
        this.adS_JJKLBB_witch = 0;
        this.wu_JJKLBB_dian = 0;
        this.wudia_JJKLBB_nTime_01 = 2000;
        this.wudian_JJKLBB_Time_01PreLoad = 500;
        this.shipint_JJKLBB_ubiao = 1;
        this.wudianAv_JJKLBB_ailableTime = {
            "0": 0, "1": 0, "2": 0, "3": 0,
            "4": 0, "5": 0, "6": 0, "7": 0,
            "8": 0, "9": 0, "10": 0, "11": 0,
            "12": 0, "13": 0, "14": 0, "15": 0,
            "16": 0, "17": 0, "18": 0, "19": 0,
            "20": 0, "21": 0, "22": 0, "23": 0
        };
        this.maili_JJKLBB_ang = 1;
        this.mailia_JJKLBB_nglist = new Array();
        this.mailiangSceneList = new Array();
        this.wxWuDianB_JJKLBB_anners = new Array();
        this.btnMov_JJKLBB_eTimer = 1;
        this.bannerMo_JJKLBB_veTimer = 0.5;
        this.bannerFres_JJKLBB_hTimer = 200;
        this.bannerCr_JJKLBB_eateFailNum = 3;
        this.bannerTod_JJKLBB_ayBannerMax = 10;
        this.skinPR = 50;
        this.wudianSceneList = new Array();
        this.btnDelayTime = 0;
        this.popAdSwitch = 1;
        this.firstWudian = 1;
        this.secondWudian = 1;
        this.commonBtnDelayTime = 0;
        this.sideAdSwitch = 0;
    }
    Object.defineProperty(AppSwit_JJKLBB_chData.prototype, "wudianTim_JJKLBB_eAvaliable", {
        /**
         * 得到当前时间开关是否打开
         *
         * @readonly
         * @type {boolean}
         * @memberof AppSwitchData
         */
        get: function () {
            return this.wudianAv_JJKLBB_ailableTime[new Date().getHours()] == 1;
        },
        enumerable: true,
        configurable: true
    });
    return AppSwit_JJKLBB_chData;
}());
exports.AppSwit_JJKLBB_chData = AppSwit_JJKLBB_chData;
var AppSwitch_JJKLBB_Config = /** @class */ (function () {
    function AppSwitch_JJKLBB_Config() {
        this._data = new Array();
    }
    AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance = function () {
        if (null == AppSwitch_JJKLBB_Config._instance) {
            AppSwitch_JJKLBB_Config._instance = AppSwitch_JJKLBB_Config.load();
        }
        return AppSwitch_JJKLBB_Config._instance;
    };
    AppSwitch_JJKLBB_Config.load = function () {
        var config = new AppSwitch_JJKLBB_Config();
        var json = Laya.loader.getRes(AppConfig_1.default.ResSe_JJKLBB_rver + "/json/appswitch.json");
        if (json) {
            for (var i = 0; i < json.length; ++i) {
                var row = json[i];
                var rowData = new AppSwit_JJKLBB_chData();
                rowData.ban_JJKLBB_ner = Number(row["banner"]);
                rowData.adS_JJKLBB_witch = Number(row["adSwitch"]);
                rowData.wu_JJKLBB_dian = Number(row["wudian"]);
                rowData.wudia_JJKLBB_nTime_01 = Number(row["wudianTime_01"]); //????这个字段是啥
                rowData.wudian_JJKLBB_Time_01PreLoad = Number(row["wudianTime_01PreLoad"]); //????这个字段是啥
                rowData.shipint_JJKLBB_ubiao = Number(row["shipintubiao"]); //????这个字段是啥
                rowData.wudianAvailableTime = Object(row["wudianTime"]);
                rowData.maili_JJKLBB_ang = Number(row["mailiang"]);
                var mailianglist = row["mailianglist"];
                if (null != mailianglist) {
                    for (var j = 0; j < mailianglist.length; ++j) {
                        var flag = Number(mailianglist[j]);
                        rowData.mailia_JJKLBB_nglist.push(flag);
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
                if (null != wudianSceneList) {
                    for (var j = 0; j < wudianSceneList.length; ++j) {
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
        else {
            config._data.push(new AppSwit_JJKLBB_chData());
            return config;
        }
    };
    AppSwitch_JJKLBB_Config.prototype.getAppS_JJKLBB_witchData = function () {
        return this._data[0];
    };
    return AppSwitch_JJKLBB_Config;
}());
exports.default = AppSwitch_JJKLBB_Config;
},{"../AppConfig":2}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("../AppConfig");
var GameCon_JJKLBB_figData = /** @class */ (function () {
    function GameCon_JJKLBB_figData() {
        this.signGetDiamond = 10;
        this.freeEnergy = 5;
        this.freeDiamond = 5;
        this.dailyEnergy = 100;
    }
    return GameCon_JJKLBB_figData;
}());
exports.GameCon_JJKLBB_figData = GameCon_JJKLBB_figData;
var GameComm_JJKLBB_onConfig = /** @class */ (function () {
    function GameComm_JJKLBB_onConfig() {
        this._data = new Array();
    }
    GameComm_JJKLBB_onConfig.getIn_JJKLBB_stance = function () {
        if (null == GameComm_JJKLBB_onConfig._instance) {
            GameComm_JJKLBB_onConfig._instance = GameComm_JJKLBB_onConfig.load();
        }
        return GameComm_JJKLBB_onConfig._instance;
    };
    GameComm_JJKLBB_onConfig.load = function () {
        var config = new GameComm_JJKLBB_onConfig();
        var json = Laya.loader.getRes(AppConfig_1.default.ResSe_JJKLBB_rver + "/json/gameConfig.json");
        if (json) {
            for (var i = 0; i < json.length; ++i) {
                var row = json[i];
                var rowData = new GameCon_JJKLBB_figData();
                rowData.signGetDiamond = Number(row["signGetDiamond"]);
                rowData.freeEnergy = Number(row["freeEnergy"]);
                rowData.freeDiamond = Number(row["freeDiamond"]);
                rowData.dailyEnergy = Number(row["dailyEnergy"]);
                config._data.push(rowData);
            }
            return config;
        }
        else {
            config._data.push(new GameCon_JJKLBB_figData());
            return config;
        }
    };
    GameComm_JJKLBB_onConfig.prototype.getGame_JJKLBB_ConfigData = function () {
        return this._data[0];
    };
    return GameComm_JJKLBB_onConfig;
}());
exports.default = GameComm_JJKLBB_onConfig;
},{"../AppConfig":2}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NativeCallback_1 = require("../NativeCallback");
var SwitchConfigData = /** @class */ (function () {
    function SwitchConfigData() {
        this.openBanner = 1;
        this.openVideo = 1;
        this.openInsert = 1;
    }
    return SwitchConfigData;
}());
exports.SwitchConfigData = SwitchConfigData;
var GameSwitchConfig = /** @class */ (function () {
    function GameSwitchConfig() {
        this.openBanner = 1;
        this.openVideo = 1;
        this.openInsert = 1;
    }
    GameSwitchConfig.getInstance = function () {
        if (null == GameSwitchConfig._instance) {
            GameSwitchConfig.load();
        }
        return GameSwitchConfig._instance;
    };
    GameSwitchConfig.load = function () {
        GameSwitchConfig._instance = new GameSwitchConfig();
        if (GameSwitchConfig.resUrl == "")
            return;
        Laya.loader.load(GameSwitchConfig.resUrl, Laya.Handler.create(this, function (res) {
            if (res) {
                for (var _i = 0, _a = Object.keys(res); _i < _a.length; _i++) {
                    var key = _a[_i];
                    GameSwitchConfig._instance[key] = res[key];
                }
                GameSwitchConfig._instance.SetBannerActive();
            }
            GameSwitchConfig._instance.SetBannerActive();
        }));
    };
    GameSwitchConfig.prototype.hideBanner = function () {
        NativeCallback_1.default.CallNativeFunc("hideBanner");
    };
    GameSwitchConfig.prototype.SetBannerActive = function () {
        if (this.openBanner == 1) {
            NativeCallback_1.default.CallNativeFunc("showBanner");
        }
        else {
            NativeCallback_1.default.CallNativeFunc("hideBanner");
        }
    };
    GameSwitchConfig.resUrl = ""; // "https://gamecfg-xxly.oss-cn-hongkong.aliyuncs.com/luckgolfcfg.json";
    return GameSwitchConfig;
}());
exports.default = GameSwitchConfig;
},{"../NativeCallback":34}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("../AppConfig");
var LevelCo_JJKLBB_nfigData = /** @class */ (function () {
    function LevelCo_JJKLBB_nfigData() {
        this.levelNum = 0;
        this.costEnergy = 0;
        this.getDiamond = 0;
        this.vedioCostNoEnergy = 0;
        this.vedioDoubleDiamond = 0;
    }
    LevelCo_JJKLBB_nfigData.prototype.clone = function () {
        var clone = new LevelCo_JJKLBB_nfigData();
        clone.levelNum = this.levelNum;
        clone.costEnergy = this.costEnergy;
        clone.getDiamond = this.getDiamond;
        clone.vedioCostNoEnergy = this.vedioCostNoEnergy;
        clone.vedioDoubleDiamond = this.vedioDoubleDiamond;
        return clone;
    };
    return LevelCo_JJKLBB_nfigData;
}());
exports.LevelCo_JJKLBB_nfigData = LevelCo_JJKLBB_nfigData;
var LevelC_JJKLBB_onfig = /** @class */ (function () {
    function LevelC_JJKLBB_onfig() {
        this._data = new Array();
    }
    LevelC_JJKLBB_onfig.getIns_JJKLBB_tance = function () {
        if (null == LevelC_JJKLBB_onfig._instance) {
            LevelC_JJKLBB_onfig._instance = LevelC_JJKLBB_onfig.load();
        }
        return LevelC_JJKLBB_onfig._instance;
    };
    LevelC_JJKLBB_onfig.load = function () {
        var config = new LevelC_JJKLBB_onfig();
        var json = Laya.loader.getRes(AppConfig_1.default.ResSe_JJKLBB_rver + "/json/levelConfig.json");
        if (json) {
            for (var i = 0; i < json.length; ++i) {
                var row = json[i];
                var rowData = new LevelCo_JJKLBB_nfigData();
                rowData.levelNum = Number(row["levelNum"]);
                rowData.costEnergy = Number(row["costEnergy"]);
                rowData.getDiamond = Number(row["getDiamond"]);
                rowData.vedioCostNoEnergy = Number(row["vedioCostNoEnergy"]);
                rowData.vedioDoubleDiamond = Number(row["vedioDoubleDiamond"]);
                config._data.push(rowData);
            }
            return config;
        }
    };
    LevelC_JJKLBB_onfig.prototype.getLevelC_JJKLBB_onfigDatas = function () {
        return this._data;
    };
    LevelC_JJKLBB_onfig.prototype.getLevelCon_JJKLBB_figDataB_JJKLBB_yLevelNum = function (levelNum) {
        for (var i = 0; i < this._data.length; ++i) {
            var d = this._data[i];
            if (d.levelNum == levelNum) {
                return d;
            }
        }
        return null;
    };
    return LevelC_JJKLBB_onfig;
}());
exports.default = LevelC_JJKLBB_onfig;
},{"../AppConfig":2}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("../AppConfig");
var SkinCon_JJKLBB_figData = /** @class */ (function () {
    function SkinCon_JJKLBB_figData() {
        this.ski_JJKLBB_nIndex = 0;
        this.costD_JJKLBB_iamond = 0;
        this.ve_JJKLBB_dio = 0;
    }
    SkinCon_JJKLBB_figData.prototype.clone = function () {
        var clone = new SkinCon_JJKLBB_figData();
        clone.ski_JJKLBB_nIndex = this.ski_JJKLBB_nIndex;
        clone.costD_JJKLBB_iamond = this.costD_JJKLBB_iamond;
        clone.ve_JJKLBB_dio = this.ve_JJKLBB_dio;
        return clone;
    };
    return SkinCon_JJKLBB_figData;
}());
exports.SkinCon_JJKLBB_figData = SkinCon_JJKLBB_figData;
var SkinC_JJKLBB_onfig = /** @class */ (function () {
    function SkinC_JJKLBB_onfig() {
        this._data = new Array();
    }
    SkinC_JJKLBB_onfig.getIns_JJKLBB_tance = function () {
        if (null == SkinC_JJKLBB_onfig._instance) {
            SkinC_JJKLBB_onfig._instance = SkinC_JJKLBB_onfig.load();
        }
        return SkinC_JJKLBB_onfig._instance;
    };
    SkinC_JJKLBB_onfig.load = function () {
        var config = new SkinC_JJKLBB_onfig();
        var json = Laya.loader.getRes(AppConfig_1.default.ResSe_JJKLBB_rver + "/json/skinConfig.json");
        if (json) {
            for (var i = 0; i < json.length; ++i) {
                var row = json[i];
                var rowData = new SkinCon_JJKLBB_figData();
                rowData.ski_JJKLBB_nIndex = Number(row["skinlNum"]);
                rowData.costD_JJKLBB_iamond = Number(row["costDiamond"]);
                rowData.ve_JJKLBB_dio = Number(row["vedio"]);
                config._data.push(rowData);
            }
            return config;
        }
    };
    SkinC_JJKLBB_onfig.prototype.getSkin_JJKLBB_ConfigDatas = function () {
        return this._data;
    };
    SkinC_JJKLBB_onfig.prototype.getSkinCo_JJKLBB_nfigData_JJKLBB_BySkinIndex = function (index) {
        for (var i = 0; i < this._data.length; ++i) {
            var d = this._data[i];
            if (d.ski_JJKLBB_nIndex == index) {
                return d;
            }
        }
        return null;
    };
    return SkinC_JJKLBB_onfig;
}());
exports.default = SkinC_JJKLBB_onfig;
},{"../AppConfig":2}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event_JJKLBB_Def;
(function (Event_JJKLBB_Def) {
    Event_JJKLBB_Def[Event_JJKLBB_Def["Non_JJKLBB_e"] = 0] = "Non_JJKLBB_e";
    Event_JJKLBB_Def[Event_JJKLBB_Def["App_CloseF_JJKLBB_irstLoadingView"] = 500] = "App_CloseF_JJKLBB_irstLoadingView";
    Event_JJKLBB_Def[Event_JJKLBB_Def["AD_OnShare_JJKLBB_AdFail"] = 501] = "AD_OnShare_JJKLBB_AdFail";
    //当界面打开
    Event_JJKLBB_Def[Event_JJKLBB_Def["Game_OnVie_JJKLBB_wOpen"] = 600] = "Game_OnVie_JJKLBB_wOpen";
    //当界面关闭
    Event_JJKLBB_Def[Event_JJKLBB_Def["Game_OnVie_JJKLBB_wClose"] = 601] = "Game_OnVie_JJKLBB_wClose";
    //当玩家金币变动
    Event_JJKLBB_Def[Event_JJKLBB_Def["Game_OnUser_JJKLBB_MoneyChange"] = 701] = "Game_OnUser_JJKLBB_MoneyChange";
    //当玩家钻石变动
    Event_JJKLBB_Def[Event_JJKLBB_Def["Game_OnUserCr_JJKLBB_ystalChange"] = 702] = "Game_OnUserCr_JJKLBB_ystalChange";
    //当关卡开始
    Event_JJKLBB_Def[Event_JJKLBB_Def["Game_OnLeve_JJKLBB_lStart"] = 1000] = "Game_OnLeve_JJKLBB_lStart";
    //当关卡结束
    Event_JJKLBB_Def[Event_JJKLBB_Def["Game_OnLeve_JJKLBB_lComplate"] = 1001] = "Game_OnLeve_JJKLBB_lComplate";
    //误点预加载完毕
    Event_JJKLBB_Def[Event_JJKLBB_Def["AD_Wudia_JJKLBB_nBanner_Load_JJKLBB_Complete"] = 2217] = "AD_Wudia_JJKLBB_nBanner_Load_JJKLBB_Complete";
    //显示误点Banner
    Event_JJKLBB_Def[Event_JJKLBB_Def["AD_Wudi_JJKLBB_anBanner_Show"] = 2218] = "AD_Wudi_JJKLBB_anBanner_Show";
    //影藏误点Banner
    Event_JJKLBB_Def[Event_JJKLBB_Def["AD_Wudi_JJKLBB_anB_JJKLBB_anner_Hide"] = 2219] = "AD_Wudi_JJKLBB_anB_JJKLBB_anner_Hide";
    //预加载Banner
    Event_JJKLBB_Def[Event_JJKLBB_Def["AD_WudianBa_JJKLBB_nner_PreLoad"] = 2220] = "AD_WudianBa_JJKLBB_nner_PreLoad";
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。
    //当玩家体力变动
    Event_JJKLBB_Def[Event_JJKLBB_Def["Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange"] = 10001] = "Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange";
    //当玩家解锁角色皮肤
    Event_JJKLBB_Def[Event_JJKLBB_Def["Game_OnUser_JJKLBB_UnlockActor_JJKLBB_Skin"] = 10002] = "Game_OnUser_JJKLBB_UnlockActor_JJKLBB_Skin";
    //当玩家当前角色皮肤发生变化
    Event_JJKLBB_Def[Event_JJKLBB_Def["Game_OnUser_JJKLBB_ActorSkin_JJKLBB_Change"] = 10003] = "Game_OnUser_JJKLBB_ActorSkin_JJKLBB_Change";
    //开始游戏
    Event_JJKLBB_Def[Event_JJKLBB_Def["Game_Start_JJKLBB_Game"] = 11001] = "Game_Start_JJKLBB_Game";
    //重新开始游戏
    Event_JJKLBB_Def[Event_JJKLBB_Def["Game_Restar_JJKLBB_tGame"] = 11002] = "Game_Restar_JJKLBB_tGame";
    //退出游戏
    Event_JJKLBB_Def[Event_JJKLBB_Def["Game_Exit_JJKLBB_Game"] = 11003] = "Game_Exit_JJKLBB_Game";
    //当游戏结束
    Event_JJKLBB_Def[Event_JJKLBB_Def["Game_onGameC_JJKLBB_omplate"] = 11004] = "Game_onGameC_JJKLBB_omplate";
    //播放Bgm
    Event_JJKLBB_Def[Event_JJKLBB_Def["Game_PlayBgm"] = 11005] = "Game_PlayBgm";
    //停止Bgm
    Event_JJKLBB_Def[Event_JJKLBB_Def["Game_StopBgm"] = 11006] = "Game_StopBgm";
    Event_JJKLBB_Def[Event_JJKLBB_Def["AD_OnShareAdFail_UseCancel"] = 502] = "AD_OnShareAdFail_UseCancel";
    //设置广告UI遮罩
    Event_JJKLBB_Def[Event_JJKLBB_Def["AD_MainAdUiMask"] = 503] = "AD_MainAdUiMask";
    Event_JJKLBB_Def[Event_JJKLBB_Def["AD_SidePopView"] = 504] = "AD_SidePopView";
    Event_JJKLBB_Def[Event_JJKLBB_Def["AD_SwitchBanner"] = 505] = "AD_SwitchBanner";
    Event_JJKLBB_Def[Event_JJKLBB_Def["RewardVideoSuccess"] = 20010] = "RewardVideoSuccess";
    Event_JJKLBB_Def[Event_JJKLBB_Def["RewardVideoFail"] = 20011] = "RewardVideoFail";
    Event_JJKLBB_Def[Event_JJKLBB_Def["InsertVideoEnd"] = 20012] = "InsertVideoEnd";
})(Event_JJKLBB_Def = exports.Event_JJKLBB_Def || (exports.Event_JJKLBB_Def = {}));
},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher = laya.events.EventDispatcher;
var Even_JJKLBB_tMgr = /** @class */ (function (_super) {
    __extends(Even_JJKLBB_tMgr, _super);
    function Even_JJKLBB_tMgr() {
        return _super.call(this) || this;
    }
    ;
    //广播事件
    Even_JJKLBB_tMgr.prototype.dispa_JJKLBB_tch = function (InName, agv) {
        Even_JJKLBB_tMgr.eventDispatcher.event(InName, agv);
    };
    //注册事件
    Even_JJKLBB_tMgr.prototype.regE_JJKLBB_vemt = function (InName, caller, listener, arg) {
        Even_JJKLBB_tMgr.eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    };
    //注册单次事件
    Even_JJKLBB_tMgr.prototype.regO_JJKLBB_nceEvent = function (InName, caller, listener, arg) {
        Even_JJKLBB_tMgr.eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    };
    //移除事件注册
    Even_JJKLBB_tMgr.prototype.remov_JJKLBB_eEvent = function (InName, caller, listener, arg) {
        Even_JJKLBB_tMgr.eventDispatcher.off(InName, caller, listener);
    };
    Even_JJKLBB_tMgr.eventDispatcher = new EventDispatcher();
    Even_JJKLBB_tMgr.insta_JJKLBB_nce = new Even_JJKLBB_tMgr();
    return Even_JJKLBB_tMgr;
}(EventDispatcher));
exports.default = Even_JJKLBB_tMgr;
},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var GameMgr_1 = require("./Mgr/GameMgr");
var ExitPoint_1 = require("./GameCore/GameObjs/ExitPoint");
var RotateObj_1 = require("./GameCore/GameObjs/RotateObj");
var Rope_1 = require("./GameCore/GameObjs/Rope");
var TideObject_1 = require("./GameCore/GameObjs/TideObject");
var PlaneBlocker_1 = require("./GameCore/GameObjs/PlaneBlocker");
var Enemy_1 = require("./GameCore/GameObjs/Enemy");
var DangerZone_1 = require("./GameCore/GameObjs/DangerZone");
var Player_1 = require("./GameCore/GameObjs/Player");
var Guider_1 = require("./GameCore/Guider");
var TwinkleSprite_1 = require("./View/TwinkleSprite");
var MoveAnchor_1 = require("./GameCore/GameObjs/MoveAnchor");
var ButtonAnim_1 = require("./View/ButtonAnim");
var ViewAutoScaleByW_1 = require("./View/Tools/ViewAutoScaleByW");
var MiddleAnchor_1 = require("./View/Tools/MiddleAnchor");
var ActorSkinBox_1 = require("./View/ActorSkin/ActorSkinBox");
var ActorSkinView_1 = require("./View/ActorSkin/ActorSkinView");
var ClickGetPrize_2_1 = require("./View/ClickGetPrize/ClickGetPrize_2");
var FreeRewardView_1 = require("./View/FreeReward/FreeRewardView");
var GameOver_1 = require("./View/GameOver/GameOver");
var GameOverSkin_1 = require("./GameCore/MyView/GameOverSkin");
var GameRewardView_1 = require("./View/GameReward/GameRewardView");
var GameView_1 = require("./View/GameView/GameView");
var LevelStateView_1 = require("./View/LevelStateView/LevelStateView");
var LevelStateBox_1 = require("./View/LevelStateView/LevelStateBox");
var LoadingView_1 = require("./View/LoadingView/LoadingView");
var MainView_1 = require("./View/MainView/MainView");
var FakePlayer_1 = require("./GameCore/FakePlayer");
var ViewAutoScale_1 = require("./View/Tools/ViewAutoScale");
var ScaleBreathingAni_1 = require("./View/ScaleBreathingAni");
var LoopAdBox_1 = require("./ShareAd/View/LoopAdBox");
var ExLoopAdView_1 = require("./ShareAd/View/ExLoopAdView");
var MoreGameView_1 = require("./View/MoreGameView/MoreGameView");
var BannerAdView_1 = require("./ShareAd/View/BannerAdView");
var SignInRewardView_1 = require("./View/SignInReward/SignInRewardView");
var TipsView_1 = require("./View/TipsView/TipsView");
var HorizontalLoopAdView_1 = require("./ShareAd/View/HorizontalLoopAdView");
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
        reg("GameCore/GameObjs/ExitPoint.ts", ExitPoint_1.default);
        reg("GameCore/GameObjs/RotateObj.ts", RotateObj_1.default);
        reg("GameCore/GameObjs/Rope.ts", Rope_1.default);
        reg("GameCore/GameObjs/TideObject.ts", TideObject_1.default);
        reg("GameCore/GameObjs/PlaneBlocker.ts", PlaneBlocker_1.default);
        reg("GameCore/GameObjs/Enemy.ts", Enemy_1.default);
        reg("GameCore/GameObjs/DangerZone.ts", DangerZone_1.default);
        reg("GameCore/GameObjs/Player.ts", Player_1.default);
        reg("GameCore/Guider.ts", Guider_1.default);
        reg("View/TwinkleSprite.ts", TwinkleSprite_1.default);
        reg("GameCore/GameObjs/MoveAnchor.ts", MoveAnchor_1.default);
        reg("View/ButtonAnim.ts", ButtonAnim_1.default);
        reg("View/Tools/ViewAutoScaleByW.ts", ViewAutoScaleByW_1.default);
        reg("View/Tools/MiddleAnchor.ts", MiddleAnchor_1.default);
        reg("View/ActorSkin/ActorSkinBox.ts", ActorSkinBox_1.default);
        reg("View/ActorSkin/ActorSkinView.ts", ActorSkinView_1.default);
        reg("View/ClickGetPrize/ClickGetPrize_2.ts", ClickGetPrize_2_1.default);
        reg("View/FreeReward/FreeRewardView.ts", FreeRewardView_1.default);
        reg("View/GameOver/GameOver.ts", GameOver_1.default);
        reg("GameCore/MyView/GameOverSkin.ts", GameOverSkin_1.default);
        reg("View/GameReward/GameRewardView.ts", GameRewardView_1.default);
        reg("View/GameView/GameView.ts", GameView_1.default);
        reg("View/LevelStateView/LevelStateView.ts", LevelStateView_1.default);
        reg("View/LevelStateView/LevelStateBox.ts", LevelStateBox_1.default);
        reg("View/LoadingView/LoadingView.ts", LoadingView_1.default);
        reg("View/MainView/MainView.ts", MainView_1.default);
        reg("GameCore/FakePlayer.ts", FakePlayer_1.default);
        reg("View/Tools/ViewAutoScale.ts", ViewAutoScale_1.default);
        reg("View/ScaleBreathingAni.ts", ScaleBreathingAni_1.default);
        reg("ShareAd/View/LoopAdBox.ts", LoopAdBox_1.default);
        reg("ShareAd/View/ExLoopAdView.ts", ExLoopAdView_1.default);
        reg("View/MoreGameView/MoreGameView.ts", MoreGameView_1.default);
        reg("ShareAd/View/BannerAdView.ts", BannerAdView_1.default);
        reg("View/SignInReward/SignInRewardView.ts", SignInRewardView_1.default);
        reg("View/TipsView/TipsView.ts", TipsView_1.default);
        reg("ShareAd/View/HorizontalLoopAdView.ts", HorizontalLoopAdView_1.default);
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
},{"./GameCore/FakePlayer":12,"./GameCore/GameObjs/DangerZone":14,"./GameCore/GameObjs/Enemy":15,"./GameCore/GameObjs/ExitPoint":16,"./GameCore/GameObjs/MoveAnchor":17,"./GameCore/GameObjs/PlaneBlocker":18,"./GameCore/GameObjs/Player":19,"./GameCore/GameObjs/Rope":20,"./GameCore/GameObjs/RotateObj":22,"./GameCore/GameObjs/TideObject":23,"./GameCore/Guider":24,"./GameCore/MyView/GameOverSkin":25,"./Mgr/GameMgr":30,"./ShareAd/View/BannerAdView":42,"./ShareAd/View/ExLoopAdView":43,"./ShareAd/View/HorizontalLoopAdView":44,"./ShareAd/View/LoopAdBox":45,"./View/ActorSkin/ActorSkinBox":48,"./View/ActorSkin/ActorSkinView":49,"./View/ButtonAnim":50,"./View/ClickGetPrize/ClickGetPrize_2":51,"./View/Common/UniversalBottomZone":52,"./View/FreeReward/FreeRewardView":53,"./View/GameOver/GameOver":54,"./View/GameReward/GameRewardView":55,"./View/GameView/GameView":56,"./View/LevelStateView/LevelStateBox":57,"./View/LevelStateView/LevelStateView":58,"./View/LoadingView/LoadingView":59,"./View/MainView/MainView":60,"./View/MoreGameView/MoreGameView":61,"./View/ScaleBreathingAni":62,"./View/SignInReward/SignInRewardView":63,"./View/TipsView/TipsView":64,"./View/Tools/MiddleAnchor":65,"./View/Tools/ViewAutoScale":66,"./View/Tools/ViewAutoScaleByW":67,"./View/TwinkleSprite":68}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FakePlayer = /** @class */ (function (_super) {
    __extends(FakePlayer, _super);
    function FakePlayer() {
        var _this = _super.call(this) || this;
        /** @prop {name:skinIndex, tips:"皮肤索引", type:int,default:1}*/
        _this.skinIndex = 1;
        /** @prop {name:autoMove,tips:"自动移动",type:Bool,default:true}*/
        _this.autoMove = true;
        return _this;
    }
    FakePlayer.prototype.onAwake = function () {
        this._ownerSp = this.owner;
        this._rig = this.owner.getComponent(Laya.RigidBody);
        if (this.autoMove) {
            Laya.timer.once(100, this, this.RdSwimming);
        }
        this._sk = this.owner.getChildByName("Sk");
        var skeleton = new Laya.Skeleton();
        skeleton.load("subRes/player/" + this.skinIndex + "/NewProject.sk");
        skeleton.scaleX = skeleton.scaleX / 4;
        skeleton.scaleY = skeleton.scaleY / 4;
        this._sk.addChild(skeleton);
    };
    FakePlayer.prototype.RdSwimming = function () {
        if (this._rig.linearVelocity[0] > 0) {
            this._rig.linearVelocity = [5, 0];
        }
        else {
            this._rig.linearVelocity = [-5, 0];
        }
        var rdtime = Math.random() * 5000 + 3000;
        Laya.timer.once(rdtime, this, this.RdSwimming);
    };
    return FakePlayer;
}(Laya.Script));
exports.default = FakePlayer;
},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhysicsUtils_1 = require("../PhysicsUtils");
var BaseObj = /** @class */ (function (_super) {
    __extends(BaseObj, _super);
    function BaseObj() {
        return _super.call(this) || this;
    }
    BaseObj.prototype.onAwake = function () {
        this._ownerSp = this.owner;
        this._rigBody = this.owner.getComponent(Laya.RigidBody);
        this._collider = this.owner.getComponent(Laya.ColliderBase);
        if (!this._collider) {
            throw ("没有挂载碰撞体，节点名为：" + this._ownerSp.name + "节点父级为：" + this.owner.parent.name);
        }
        else {
            this.SetColliderCategory();
        }
    };
    /**
     * 设置碰撞组别
     *
     * @memberof PlaneBlocker
     */
    BaseObj.prototype.SetColliderCategory = function () {
        this._rigBody.category = PhysicsUtils_1.CollisionFilterGroupEnum.Plane;
        this._rigBody.mask = PhysicsUtils_1.CollisionFilterGroupEnum.Ground;
        this._collider.refresh();
    };
    return BaseObj;
}(Laya.Script));
exports.default = BaseObj;
},{"../PhysicsUtils":26}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseObj_1 = require("./BaseObj");
var PhysicsUtils_1 = require("../PhysicsUtils");
var DangerZone = /** @class */ (function (_super) {
    __extends(DangerZone, _super);
    function DangerZone() {
        var _this = _super.call(this) || this;
        /** @prop {name:projectileDir,tips:"投射物方向",type:Option,option:"bottom,left,right,top",default:"bottom"}*/
        _this.projectileDir = "bottom";
        /** @prop {name:projectileSpd,tips:"投射物速度",type:number,default:2000}*/
        _this.projectileSpd = 2000;
        /** @prop {name:waitTime,tips:"等待时间",type:number,default:0}*/
        _this.waitTime = 0;
        /** @prop {name:hideProjectile,tips:"隐藏投射物",type:Bool,default:false}*/
        _this.hideProjectile = false;
        _this._fired = false;
        return _this;
    }
    DangerZone.prototype.onAwake = function () {
        this._projectile = this.owner.getChildByName("DangerProjectile");
        this._projectileRig = this._projectile.getComponent(Laya.RigidBody);
        if (this.hideProjectile) {
            this._projectile.visible = false;
        }
        _super.prototype.onAwake.call(this);
    };
    DangerZone.prototype.SetColliderCategory = function () {
        this._rigBody.category = PhysicsUtils_1.CollisionFilterGroupEnum.Plane;
        this._rigBody.mask = PhysicsUtils_1.CollisionFilterGroupEnum.Player | PhysicsUtils_1.CollisionFilterGroupEnum.Enemy;
        this._collider.refresh();
    };
    /**
     * 危险区触发器
     *
     * @param {Laya.ColliderBase} other
     * @param {Laya.ColliderBase} self
     * @param {*} contact
     * @memberof DangerZone
     */
    DangerZone.prototype.onTriggerEnter = function (other, self, contact) {
        if (this._fired)
            return;
        console.log(other.owner);
        this._fired = true;
        this.owner.parent.event("shoot");
        Laya.timer.once(this.waitTime, this, this.shootProjectile);
    };
    DangerZone.prototype.shootProjectile = function () {
        var _this = this;
        this._projectile.visible = true;
        Laya.timer.frameLoop(1, this, function () {
            var spd = (_this.projectileSpd * Laya.timer.delta) / 1000;
            if (_this._projectile.x < -2 * Laya.stage.height ||
                _this._projectile.x > 2 * Laya.stage.height ||
                _this._projectile.y < -2 * Laya.stage.height ||
                _this._projectile.y > 2 * Laya.stage.height) {
                Laya.timer.clearAll(_this);
                _this.owner.removeSelf();
                // this._projectile.destroy();
            }
            switch (_this.projectileDir) {
                case "bottom":
                    _this._projectile.y += spd;
                    break;
                case "left":
                    _this._projectile.x -= spd;
                    break;
                case "right":
                    _this._projectile.x += spd;
                    break;
                case "top":
                    _this._projectile.y -= spd;
                    break;
            }
        });
    };
    return DangerZone;
}(BaseObj_1.default));
exports.default = DangerZone;
},{"../PhysicsUtils":26,"./BaseObj":13}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TideObject_1 = require("./TideObject");
var PhysicsUtils_1 = require("../PhysicsUtils");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super.call(this) || this;
        // /** @prop {name:enemyDirect, tips:"敌人朝向", type:Option,option:"Left,Right",default:"Left"}*/
        // public enemyDirect: string = "Left";
        _this._skUrl = "subRes/enemy/NewProject.sk";
        _this._skLoaded = false;
        return _this;
    }
    Enemy.prototype.onAwake = function () {
        var _this = this;
        _super.prototype.onAwake.call(this);
        this._sk = this.owner.getChildByName("Sk");
        this._skeleton = new Laya.Skeleton();
        this._skeleton.scaleX = -0.25;
        this._skeleton.scaleY = 0.25;
        this._skeleton.load(this._skUrl, Laya.Handler.create(this, function () {
            _this._skLoaded = true;
            _this.SkPlay("daiji", true);
        }));
        // this.owner.addChild(this._skeleton);
        this._sk.addChild(this._skeleton);
        this.owner.on("shoot", this, this.shoot);
        // if (this.enemyDirect == "Right") {
        //     this._ownerSp.scaleX = -1;
        // }
        // else {
        //     this._ownerSp.scaleX = 1;
        // }
        // this._collider.refresh();
    };
    Enemy.prototype.SkPlay = function (nameOrIndex, loop, force, star, end, freshSkin) {
        if (this._skLoaded) {
            this._skeleton.play(nameOrIndex, loop, force, star, end, freshSkin);
        }
    };
    Enemy.prototype.SetColliderCategory = function () {
        this._rigBody.category = PhysicsUtils_1.CollisionFilterGroupEnum.Enemy;
        this._rigBody.mask = PhysicsUtils_1.CollisionFilterGroupEnum.ALL ^ PhysicsUtils_1.CollisionFilterGroupEnum.Rope ^ PhysicsUtils_1.CollisionFilterGroupEnum.Player;
        this._collider.refresh();
    };
    Enemy.prototype.onTriggerEnter = function (other, self, contact) {
        if (other.owner.name.indexOf("SensorZone") >= 0) {
            this._rigBody.linearVelocity = [this._rigBody.linearVelocity[0] / 2, this._rigBody.linearVelocity[1] / 2];
        }
        if (other.owner.name.indexOf("Danger") >= 0) {
            SoundMgr_1.default.instance.playS_JJKLBB_ound("zhuangdaowuti");
            this.owner.getChildByName("SensorZone").removeSelf();
            this.EnemyDead();
        }
    };
    Enemy.prototype.shoot = function () {
        SoundMgr_1.default.instance.playS_JJKLBB_ound("sheji");
        this.SkPlay("kaiqiang", false);
    };
    Enemy.prototype.EnemyDead = function () {
        var _this = this;
        this.SkPlay("sw", false);
        Laya.timer.once(200, this, function () {
            _this.owner.destroy();
        });
    };
    return Enemy;
}(TideObject_1.default));
exports.default = Enemy;
},{"../../Mgr/SoundMgr":31,"../PhysicsUtils":26,"./TideObject":23}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseObj_1 = require("./BaseObj");
var PhysicsUtils_1 = require("../PhysicsUtils");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var ExitPoint = /** @class */ (function (_super) {
    __extends(ExitPoint, _super);
    function ExitPoint() {
        var _this = _super.call(this) || this;
        /** @prop {name:expointTexture, tips:"退出点动画图集", type:string,accept:res,default:"GameObjs/Rope.png"}*/
        _this.expointTexture = "res/atlas/ExitPoint.atlas";
        return _this;
    }
    ExitPoint.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._animation = this.owner.getChildByName("Ani");
        this._animation.loadAtlas(this.expointTexture);
    };
    ExitPoint.prototype.PlayAni = function () {
        this._ownerSp.loadImage(null);
        this._animation.play(0, false);
        SoundMgr_1.default.instance.playS_JJKLBB_ound("kaimen");
    };
    ExitPoint.prototype.SetColliderCategory = function () {
        this._rigBody.category = PhysicsUtils_1.CollisionFilterGroupEnum.Plane;
        this._rigBody.mask = PhysicsUtils_1.CollisionFilterGroupEnum.Player;
    };
    return ExitPoint;
}(BaseObj_1.default));
exports.default = ExitPoint;
},{"../../Mgr/SoundMgr":31,"../PhysicsUtils":26,"./BaseObj":13}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rope_1 = require("./Rope");
var MoveAnchor = /** @class */ (function (_super) {
    __extends(MoveAnchor, _super);
    function MoveAnchor() {
        var _this = _super.call(this) || this;
        /** @prop {name:H_Or_V,tips:"滑动方向是水平或者垂直",type:Option,option:"Horizontal,Vertical",default:"Horizontal"}*/
        _this.H_Or_V = "Horizontal";
        /** @prop {name:moveMaxRange, tips:"铰链绳子长度", type:int,default:100}*/
        _this.moveMaxRange = 130;
        _this._currentMove = 0;
        _this._dragging = false;
        return _this;
    }
    // private _ropePiecesParent: Laya.Sprite;
    MoveAnchor.prototype.onAwake = function () {
        this._ownerSp = this.owner;
        this._ropeScript = this.owner.getComponent(Rope_1.default);
        if (this._ropeScript) {
            this._accachedObj = this._ropeScript.endNode;
            this._accachedObjRig = this._ropeScript.endNode.getComponent(Laya.RigidBody);
        }
        // this._ropePiecesParent = this.owner.getChildByName("RopePiecesParent") as Laya.Sprite
        // if (this._ropePiecesParent == null) {
        //     this._ropePiecesParent = new Laya.Sprite();
        //     this._ropePiecesParent.width = this._startNode.width;
        //     this._ropePiecesParent.height = this._startNode.height;
        //     this._ropePiecesParent.name = "RopePiecesParent";
        //     let index = Math.max(this._startNode.numChildren - 1, 0);
        //     this._startNode.addChildAt(this._ropePiecesParent, 0);
        // }
        // for
        this._originalX = this._ownerSp.x;
        this._originalY = this._ownerSp.y;
        // this._ownerSp.on(Laya.Event.DRAG_START, this, this.onDrag)
    };
    MoveAnchor.prototype.onStart = function () {
    };
    // onMouseDown(e: Laya.Event) {
    //     this._dragging = true;
    //     this._mouseX = Laya.stage.mouseX;
    //     this._mouseY = Laya.stage.mouseY;
    // }
    // onMouseUp() {
    //     this._dragging = false;
    //     this._mouseX = Laya.stage.mouseX;
    //     this._mouseY = Laya.stage.mouseY;
    //     this._accachedObjRig.linearVelocity = { x: 0, y: 0 };
    // }
    // onStageMouseUp() {
    //     this._dragging = false;
    //     this._mouseX = Laya.stage.mouseX;
    //     this._mouseY = Laya.stage.mouseY
    //     this._accachedObjRig.linearVelocity = { x: 0, y: 0 };
    // }
    MoveAnchor.prototype.onUpdate = function () {
        // if (!this._dragging) return;
        // if (this.H_Or_V == "Horizontal") {
        // let x = Laya.stage.mouseX;
        // let offset = (x - this._mouseX);
        // offset = offset >= 0 ? Math.min(this.moveMaxRange, offset) : Math.max(-1 * this.moveMaxRange, offset);
        // let xSpd = 0;
        // let ySpd = 0;
        // let tideObjX = this._accachedObj
        // if (offset >= 1) {
        //     // offset = Math.min(4, offset);
        //     // this._accachedObjRig.linearVelocity = { x: xSpd };
        //     // ySpd = 1.5;
        // }
        // else if (offset <= -1) {
        //     // offset = Math.max(-4, offset);
        //     xSpd = (offset * 1);
        //     ySpd = offset * 0.1;
        //     this._accachedObjRig.linearVelocity = { x: xSpd, y: ySpd };
        // }
        // this._ownerSp.x += offset;
        var spd = (Laya.timer.delta / 1000) * 40;
        if (this._moveForward) {
            if (this._currentMove < this.moveMaxRange) {
                this._currentMove += spd;
            }
            else {
                this._moveForward = false;
            }
        }
        else {
            if (this._currentMove > -1 * this.moveMaxRange) {
                this._currentMove -= spd;
            }
            else {
                this._moveForward = true;
            }
        }
        this._ownerSp.x = this._originalX + this._currentMove;
        // if (this._ownerSp.x > this._originalX + this.moveMaxRange) {
        //     this._ownerSp.x = this._originalX + this.moveMaxRange
        // }
        // else if (this._ownerSp.x < this._originalX - this.moveMaxRange) {
        //     this._ownerSp.x = this._originalX - this.moveMaxRange
        // }
        // }
        // else {
        //     let y = Laya.stage.mouseY;
        //     let offset = (y - this._mouseY);
        //     offset = offset >= 0 ? Math.min(this.moveMaxRange, offset) : Math.max(-1 * this.moveMaxRange, offset);
        //     this._ownerSp.y = this._originalY + offset;
        // }
        this._mouseX = Laya.stage.mouseX;
        this._mouseY = Laya.stage.mouseY;
    };
    return MoveAnchor;
}(Laya.Script));
exports.default = MoveAnchor;
},{"./Rope":20}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhysicsUtils_1 = require("../PhysicsUtils");
var BaseObj_1 = require("./BaseObj");
var PlaneBlocker = /** @class */ (function (_super) {
    __extends(PlaneBlocker, _super);
    function PlaneBlocker() {
        var _this = _super.call(this) || this;
        /** @prop {name:autoDestoryTime, tips:"自动销毁时间，为0不销毁", type:int,default:0}*/
        _this.autoDestoryTime = 0;
        return _this;
    }
    /**
     * 设置碰撞组别
     *
     * @memberof PlaneBlocker
     */
    PlaneBlocker.prototype.SetColliderCategory = function () {
        this._rigBody.category = PhysicsUtils_1.CollisionFilterGroupEnum.PlaneBlocker;
        this._rigBody.mask = PhysicsUtils_1.CollisionFilterGroupEnum.None | PhysicsUtils_1.CollisionFilterGroupEnum.Plane;
        this._collider.refresh();
    };
    PlaneBlocker.prototype.onStart = function () {
        var _this = this;
        if (this.autoDestoryTime > 0) {
            Laya.timer.once(this.autoDestoryTime, this, function () {
                _this._ownerSp.destroy();
            });
        }
    };
    return PlaneBlocker;
}(BaseObj_1.default));
exports.default = PlaneBlocker;
},{"../PhysicsUtils":26,"./BaseObj":13}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TideObject_1 = require("./TideObject");
var PhysicsUtils_1 = require("../PhysicsUtils");
var ExitPoint_1 = require("./ExitPoint");
var GameView_1 = require("../../View/GameView/GameView");
var User_1 = require("../../User/User");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this._list = [];
        _this._moveState = -99;
        _this._moveExit = false;
        _this._moveTimer = 0;
        _this._gameState = 0;
        _this._onGround = false;
        _this._waitForLand = false;
        _this._skLoaded = false;
        return _this;
    }
    Player.prototype.onAwake = function () {
        var _this = this;
        _super.prototype.onAwake.call(this);
        this._rope = this._ownerSp.getChildByName("Rope");
        this._rope.x = 25;
        this._rope.y = 20;
        this._rope.scaleY = 0.3;
        this._skeleton = new Laya.Skeleton();
        var skinIndex = User_1.default.getCurA_JJKLBB_ctorSkin();
        this._skeleton.load("subRes/player/" + skinIndex + "/NewProject.sk", Laya.Handler.create(this, function () {
            _this._skLoaded = true;
            _this.SkPlay("daiji", true);
        }));
        this.SetSpDirection(-1);
        // this._skeleton.pivotX = -150;
        // this._skeleton.pivotY = -50;
        // this._skeleton.scaleX = 0.25;
        // this._skeleton.scaleY = 0.25;
        // this._skeleton.x = Laya.stage.width / 2;
        // this._skeleton.y = Laya.stage.height / 2;
        this.owner.addChildAt(this._skeleton, 0);
        this._ownerSp.texture = null;
    };
    Player.prototype.onDisable = function () {
        Laya.timer.clearAll(this);
    };
    /**
     * 设置玩家的方向
     *
     * @private
     * @param {number} dir
     * @memberof Player
     */
    Player.prototype.SetSpDirection = function (dir) {
        if (dir == -1) {
            this._skeleton.scaleX = 0.25;
            this._skeleton.scaleY = 0.25;
            this._skeleton.pivotX = -150;
            this._skeleton.pivotY = -50;
        }
        else if (dir == 1) {
            this._skeleton.scaleX = -0.25;
            this._skeleton.scaleY = 0.25;
            this._skeleton.pivotX = 300;
            this._skeleton.pivotY = -50;
        }
    };
    /**
     * 进入触发器
     *
     * @param {Laya.ColliderBase} other
     * @param {Laya.ColliderBase} self
     * @param {*} contact
     * @memberof TideObject
     */
    Player.prototype.onTriggerEnter = function (other, self, contact) {
        _super.prototype.onTriggerEnter.call(this, other, self, contact);
        if (other == null || other.owner == null || other.owner.name == null)
            return;
        if (this._gameState < 0 && other.owner.name.indexOf("Ground") >= 0) {
            SoundMgr_1.default.instance.playS_JJKLBB_ound("siwang");
            Laya.timer.clearAll(this._ownerSp);
            Laya.Tween.clearAll(this._ownerSp);
            Laya.timer.once(1000, this, function () {
                GameView_1.default.Instance.GameOver(false);
            });
        }
        if (other.owner.name.indexOf("Sensor") >= 0) {
            this._moveTimer = -100;
            this._rigBody.linearVelocity = { x: 0, y: 0 };
        }
        if (other.owner.name.indexOf("Danger") >= 0) {
            SoundMgr_1.default.instance.playS_JJKLBB_ound("zhuangdaowuti");
            this._gameState = -1;
            this.GameOverSetCol();
            this.RopeBroken();
            this.SkPlay("siwang", false, true);
        }
        if (other.owner.name.indexOf("ExitPoint") >= 0) {
            this._waitForLand = true;
            var sp = other.owner;
            this._exitPoint = other.owner;
        }
        if (other.owner.name.indexOf("Ground") >= 0) {
            this._onGround = true;
            this._moveTimer = -50;
            this._rigBody.linearVelocity = { x: 0, y: 0 };
        }
        if (!this._tide && other.owner.name.indexOf("M_L") >= 0) {
            // if (this._list.filter(u => u == other).length == 0) {
            //     this._rigBody.linearVelocity = { x: 0, y: 0 }
            //     Laya.timer.once(500, this, () => {
            //         this._rigBody.linearVelocity = { x: -6, y: 0 };
            //     });
            //     this._list.push(other);
            // }
            // this._rigBody.linearVelocity = { x: 0, y: 0 }
            // Laya.timer.once(500, this, () => {
            //     this._rigBody.linearVelocity = { x: -6, y: 0 };
            // });
            this._moveExit = false;
            this._moveTimer = 0;
            this._moveState = -1;
        }
        if (!this._tide && other.owner.name.indexOf("M_R") >= 0) {
            // this._rigBody.linearVelocity = { x: 0, y: 0 }
            // Laya.timer.once(500, this, () => {
            //     this._rigBody.linearVelocity = { x: 6, y: 0 };
            // });
            this._moveExit = false;
            this._moveTimer = 0;
            this._moveState = 1;
        }
        if (other.owner.name.indexOf("Jump") >= 0) {
            SoundMgr_1.default.instance.playS_JJKLBB_ound("tiantiao");
            this._moveExit = false;
            this.RopeBroken();
            this._rigBody.linearVelocity = { x: 0, y: -20 };
        }
    };
    Player.prototype.onTriggerExit = function (other, self, contact) {
        // if(!other.owner || !other.owner.name) return;
        if (other.owner.name.indexOf("M_") >= 0) {
            // this._rigBody.linearVelocity = { x: 0, y: this._rigBody.linearVelocity.y };
            this._moveTimer = 50;
            this._moveExit = true;
        }
    };
    Player.prototype.onTriggerStay = function (other, self, contact) {
        // if(!other.owner || !other.owner.name) return;
        console.log(other.owner.name);
    };
    Player.prototype.GameOverSetCol = function () {
        this._rigBody.mask = PhysicsUtils_1.CollisionFilterGroupEnum.None | PhysicsUtils_1.CollisionFilterGroupEnum.Ground;
        this._collider.refresh();
    };
    Player.prototype.onUpdate = function () {
        if (this._gameState != 0)
            return;
        if (this._waitForLand) {
            if (this._onGround) {
                this._gameState = 1;
                this.GameOverMoveToDoor();
            }
        }
        if (this._moveTimer <= 200) {
            this._moveTimer += Laya.timer.delta;
            return;
        }
        if (this._moveExit) {
            this._moveState = 0;
            this._onGround = false;
            this._moveExit = false;
        }
        else if (this._moveState == -1) {
            // this._moveTimer = 0;
            this.SkPlay("zoulu", true, false);
            this._rigBody.applyForceToCenter({ x: -180, y: 0 });
            this.SetSpDirection(-1);
        }
        else if (this._moveState == 1) {
            // this._moveTimer = 0;
            this.SkPlay("zoulu", true, false);
            this._rigBody.applyForceToCenter({ x: 180, y: 0 });
            this.SetSpDirection(1);
        }
        else if (this._moveState == 0) {
            this.SkPlay("daiji", true, false);
            this._rigBody.linearVelocity = { x: 0, y: this._rigBody.linearVelocity.y };
        }
    };
    Player.prototype.SetColliderCategory = function () {
        this._rigBody.category = PhysicsUtils_1.CollisionFilterGroupEnum.Player;
        this._rigBody.mask = PhysicsUtils_1.CollisionFilterGroupEnum.ALL;
        this._collider.refresh();
    };
    Player.prototype.GameOverMoveToDoor = function () {
        var time = Math.abs(this._ownerSp.x - this._exitPoint.x) * 3;
        var res = this._ownerSp.x - this._exitPoint.x;
        if (res > 0) {
            this.SetSpDirection(-1);
        }
        else {
            this.SetSpDirection(1);
        }
        Laya.Tween.to(this._ownerSp, { x: this._exitPoint.x }, time, null, Laya.Handler.create(this, this.HidePlayer), 500, true, true);
        // let myPoint = Laya.Point.create().setTo(this._ownerSp.pivotX, this._ownerSp.pivotY);
        // if (myPoint.distance(this._exitPoint.x, this._exitPoint.y) >= 1) {
        //     this._isGameOver = true;
        // }
    };
    Player.prototype.HidePlayer = function () {
        var _this = this;
        this.GameOverSetCol();
        var exit = this._exitPoint.getComponent(ExitPoint_1.default);
        exit.PlayAni();
        this.SkPlay("qingzhu", true, true);
        SoundMgr_1.default.instance.playS_JJKLBB_ound("chenggong");
        Laya.timer.once(2000, this, function () {
            _this._ownerSp.visible = false;
            GameView_1.default.Instance.GameOver(true);
        });
    };
    Player.prototype.SkPlay = function (nameOrIndex, loop, force, star, end, freshSkin) {
        if (this._skLoaded) {
            this._skeleton.play(nameOrIndex, loop, force, star, end, freshSkin);
        }
    };
    Player.prototype.RopeBroken = function () {
        _super.prototype.RopeBroken.call(this);
        if (this._rope) {
            this._rope.visible = false;
        }
    };
    return Player;
}(TideObject_1.default));
exports.default = Player;
},{"../../Mgr/SoundMgr":31,"../../User/User":46,"../../View/GameView/GameView":56,"../PhysicsUtils":26,"./ExitPoint":16,"./TideObject":23}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RopePieces_1 = require("./RopePieces");
var PhysicsUtils_1 = require("../PhysicsUtils");
var TideObject_1 = require("./TideObject");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var Rope = /** @class */ (function (_super) {
    __extends(Rope, _super);
    function Rope() {
        var _this = _super.call(this) || this;
        /** @prop {name:endNode, tips:"铰链尾链接的组件", type:Node, default:null}*/
        _this.endNode = null;
        /** @prop {name:endNodePivot,tips:"铰链尾组件的刚体中心点",type:Vec,default:"SpritePivot"}*/
        _this.endNodePivot = null;
        /** @prop {name:ropeTexture, tips:"铰链绳子材质", type:string,accept:res,default:"GameObjs/Rope.png"}*/
        _this.ropeTexture = "GameObjs/Rope.png";
        /** @prop {name:ropeLength, tips:"铰链绳子长度", type:int,default:15}*/
        _this.ropeLength = 15;
        /** @prop {name:lengtRate, tips:"绳子实际物理长度与距离的比例，默认为1", type:number,default:1}*/
        _this.lengtRate = 1;
        /** @prop {name:ropeWidth, tips:"铰链绳子宽度", type:int,default:40}*/
        _this.ropeWidth = 100;
        /** @prop {name:ropeShowRate, tips:"铰链绳子实际宽度与显示宽度的比值", type:number,default:0.25}*/
        _this.ropeShowRate = 0.1;
        /** @prop {name:linearDamping,tips:"绳子阻力",type:Number,min:0,default:0.3}*/
        _this.linearDamping = 0.3;
        _this._ropeNodeList = [];
        _this._ropeSpriteList = [];
        _this._cutOnce = false;
        _this._ropeBroken = false;
        return _this;
    }
    Rope.prototype.onAwake = function () {
        if (!this.endNode)
            return;
        this._tideObj = this.endNode.getComponent(TideObject_1.default);
        if (!this._tideObj)
            return;
        this._startNode = this.owner;
        this._startRig = this._startNode.getComponent(Laya.RigidBody);
        // if (this.starNodePivot == null) {
        this._startPoint = this._startNode.localToGlobal(new Laya.Point(this._startNode.pivotX, this._startNode.pivotY));
        // }
        // else {
        // this._startPoint = this._startNode.localToGlobal(new Laya.Point(this.starNodePivot[0], this.starNodePivot[1]));
        // }
        // this._startPoint = new Laya.Point(this._startNode.x, this._startNode.y);
        this._endRig = this.endNode.getComponent(Laya.RigidBody);
        if (this.endNodePivot) {
            this._endPoint = this.endNode.localToGlobal(new Laya.Point(this.endNodePivot[0], this.endNodePivot[1]));
        }
        else {
            this._endPoint = this.endNode.localToGlobal(new Laya.Point(this.endNode.pivotX, this.endNode.pivotY));
        }
        /* 给绳子建立存储节点 */
        this._ropePiecesParent = this._startNode.getChildByName("RopePiecesParent");
        if (this._ropePiecesParent == null) {
            this._ropePiecesParent = new Laya.Sprite();
            this._ropePiecesParent.width = this._startNode.width;
            this._ropePiecesParent.height = this._startNode.height;
            this._ropePiecesParent.name = "RopePiecesParent";
            var index = Math.max(this._startNode.numChildren - 1, 0);
            this._startNode.addChildAt(this._ropePiecesParent, 0);
        }
        this.CreatRopePieces();
        // EventMgr.instance.regOnceEvent(EventDef.Game_RestartGame, this, this.onDisable);
    };
    // onDisable() {
    //     this._ropeNodeList.forEach(u => {
    //         u.visible = false;
    //         // let ropeJoint = u.getComponent(Laya.RopeJoint) as Laya.RopeJoint;
    //         // let rigidBody = u.getComponent(Laya.RigidBody) as Laya.RigidBody;
    //         // if(ropeJoint)ropeJoint.vis(false);
    //         // if(rigidBody)rigidBody._setActive(false);
    //     });
    // }
    // onDestroy() {
    // }
    /**
     * 创造绳子的碎片
     *
     * @memberof Rope
     */
    Rope.prototype.CreatRopePieces = function () {
        var distance = this._startPoint.distance(this._endPoint.x, this._endPoint.y);
        var direct = new Laya.Point(this._endPoint.x - this._startPoint.x, this._endPoint.y - this._startPoint.y);
        direct.normalize();
        var ropeCount = Math.ceil(distance / this.ropeLength);
        var upper = this._startNode;
        var upperRig = this._startRig;
        for (var index = 0; index < ropeCount; index++) {
            /* 下面的代码是制造绳子的坐标 */
            var ropeNode = new Laya.Sprite();
            ropeNode.name = "Rope";
            this._ropePiecesParent.addChildren(ropeNode);
            var tempPoint = Laya.Point.create();
            tempPoint.setTo(direct.x * index * this.ropeLength, direct.y * index * this.ropeLength);
            // tempPoint.setTo(tempPoint.x + this._startNode.pivotX, tempPoint.y + this._startNode.pivotY);
            // if (this.starNodePivot) {
            //     tempPoint.setTo(tempPoint.x + this.starNodePivot[0], tempPoint.y + this.starNodePivot[1]);
            // }
            // else {
            tempPoint.setTo(tempPoint.x + this._startNode.pivotX, tempPoint.y + this._startNode.pivotY);
            // }
            ropeNode.width = this.ropeWidth;
            ropeNode.height = this.ropeLength * 2;
            ropeNode.pivotX = ropeNode.width / 2;
            ropeNode.pivotY = ropeNode.pivotY / 2;
            ropeNode.x = tempPoint.x;
            ropeNode.y = tempPoint.y;
            /* 下面的代码用于制造绳子的物理效果*/
            var ropeCol = void 0;
            /* if (index < ropeCount)  */ {
                ropeCol = ropeNode.addComponent(Laya.CircleCollider);
                ;
                ropeCol.radius = 9;
                ropeCol.x = ropeNode.pivotX;
                ropeCol.y = ropeNode.pivotY;
                ropeCol.isSensor = true;
                // ropeCol._setActive(false);
                // ropeCol.refresh();
            }
            var ropeRigBody = ropeNode.addComponent(Laya.RigidBody);
            ropeRigBody.getBody().m_mass = 0.01;
            ropeRigBody.linearDamping = this.linearDamping;
            ropeRigBody.allowRotation = false;
            ropeRigBody.category = PhysicsUtils_1.CollisionFilterGroupEnum.Rope;
            ropeRigBody.mask = PhysicsUtils_1.CollisionFilterGroupEnum.None | PhysicsUtils_1.CollisionFilterGroupEnum.Ground;
            var ropeJoint = new Laya.RopeJoint();
            ropeJoint.otherBody = upperRig;
            ropeJoint.maxLength = this.ropeLength * this.lengtRate;
            /* 测试,给绳子加碰撞器 */
            /* 测试完毕 */
            if (ropeCount - 1 == index) {
                ropeJoint.selfBody = this._endRig;
                if (this.endNodePivot != null) {
                    ropeJoint.selfAnchor = [this.endNodePivot[0], this.endNodePivot[1]];
                }
                else {
                    ropeJoint.selfAnchor = [this.endNode.pivotX, this.endNode.pivotY];
                }
                this._tideObj.SetRopeAnchor(ropeJoint);
            }
            else {
                ropeJoint.selfAnchor = [this.ropeWidth / 2, this.ropeLength * 0.5];
            }
            if (index == 0) {
                // if (this.endNodePivot != null) {
                //     ropeJoint.otherAnchor = [this.endNodePivot[0], this.endNodePivot[1]];
                // }
                // else {
                // if (this.starNodePivot) {
                //     ropeJoint.otherAnchor = [this.starNodePivot[0], this.starNodePivot[1]];
                // }
                // else {
                ropeJoint.otherAnchor = [this._startNode.pivotX, this._startNode.pivotY];
                // }
                // }
            }
            else {
                ropeJoint.otherAnchor = [this.ropeWidth / 2, this.ropeLength * 0.5];
            }
            upperRig = ropeRigBody;
            this._ropeNodeList.push(ropeNode);
            ropeNode.addComponentIntance(ropeJoint);
            if (ropeCol) {
                ropeCol.refresh();
            }
            if (index >= 1) {
                ropeNode.once(Laya.Event.MOUSE_OVER, this, this.RopeBeenCut, [index]);
            }
        }
        // /* 下面的代码用于制造绳子的显示效果,绳子显示效果数量要比绳子节点数少1*/
        for (var index = 0; index < this._ropeNodeList.length - 1; index++) {
            var sp = this._ropeNodeList[index];
            var ropeSp = new Laya.Sprite();
            ropeSp.loadImage(this.ropeTexture, null);
            ropeSp.width = this.ropeWidth * this.ropeShowRate;
            ropeSp.height = this.ropeLength;
            ropeSp.pivotX = ropeSp.width / 2;
            ropeSp.pivotY = ropeSp.height / 2;
            ropeSp.x = sp.pivotX;
            ropeSp.y = sp.pivotY;
            ropeSp.mouseEnabled = false;
            sp.addChild(ropeSp);
            var ropePiece = ropeSp.addComponent(RopePieces_1.default);
            var top_1 = index > 0 ? this._ropeNodeList[index - 1] : this._ropeNodeList[0];
            var down = index < this._ropeNodeList.length - 1 ? this._ropeNodeList[index + 1] : this._ropeNodeList[this._ropeNodeList.length - 1];
            ropePiece.SetAngle(top_1, down);
            // ropePiece.SetAngle(top, down, this._ropeNodeList.length, index);
            this._ropeSpriteList.push(ropePiece);
        }
    };
    /**
     * 绳子已被切断
     *
     * @param {number} index
     * @memberof Rope
     */
    Rope.prototype.RopeBeenCut = function (index) {
        var _this = this;
        if (!this._ropeBroken) {
            this._tideObj.RopeCut();
            this._ropeBroken = true;
        }
        /* 防止短时间内多次切绳子 */
        if (this._cutOnce) {
            return;
        }
        this._cutOnce = true;
        Laya.timer.once(500, this, function () {
            _this._cutOnce = false;
        });
        SoundMgr_1.default.instance.playS_JJKLBB_ound("tiaoxia");
        /* 第一步将当前绳子物理效果切断 */
        var ropeJoint = this._ropeNodeList[index].getComponent(Laya.RopeJoint);
        var ropeRig = this._ropeNodeList[index].getComponent(Laya.RigidBody);
        ropeJoint._setActive(false);
        var _loop_1 = function (i) {
            var rope = this_1._ropeNodeList[i];
            Laya.timer.once(100, rope, function () {
                var rig = rope.getComponent(Laya.RigidBody);
                rig.linearDamping = 0.3;
                var col = rope.getComponent(Laya.CircleCollider);
                if (col) {
                    col.isSensor = false;
                }
                // col.radius = 1
                // col.x = rope.width / 2;
                // col.y = rope.height / 2;
            });
            rope.offAll(Laya.Event.MOUSE_OVER);
        };
        var this_1 = this;
        for (var i = index; i < this._ropeNodeList.length; i++) {
            _loop_1(i);
        }
        /* 第二步将当前绳子显示效果切断 */
        // if (index > 0) {
        //     this._ropeSpriteList[index - 1].RopeBeenCut(false);
        // }
        // if (index < this._ropeSpriteList.length - 1) {
        //     this._ropeSpriteList[index + 1].RopeBeenCut(true);
        // }
    };
    return Rope;
}(Laya.Script));
exports.default = Rope;
},{"../../Mgr/SoundMgr":31,"../PhysicsUtils":26,"./RopePieces":21,"./TideObject":23}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用来控制绳子显示效果核心的类
 *
 * @export
 * @class RopePieces
 * @extends {Laya.Script}
 */
var RopePieces = /** @class */ (function (_super) {
    __extends(RopePieces, _super);
    function RopePieces() {
        var _this = _super.call(this) || this;
        _this._rotate = false;
        return _this;
    }
    RopePieces.prototype.onAwake = function () {
        var _this = this;
        this._ownerSp = this.owner;
        this._ownerSp.on("StopRote", this, function () {
            _this._rotate = false;
        });
    };
    RopePieces.prototype.SetAngle = function (topSprite, bottomSprite) {
        this._topSprite = topSprite;
        this._bottomSprite = bottomSprite;
        this._rotate = true;
        // this._ropeCount = ropeCount;
        // this._ropeIndex = ropeIndex;
        // let radio = 1 - (Math.abs(this._ropeIndex - (this._ropeCount / 2)) / (this._ropeCount / 2));
        this._ownerSp.scaleY = 1.5;
    };
    RopePieces.prototype.RopeBeenCut = function (isUp) {
        if (isUp) {
            this._topSprite = this._ownerSp;
        }
        else {
            this._bottomSprite = this._ownerSp;
        }
    };
    RopePieces.prototype.onUpdate = function () {
        if (this._rotate) {
            var direct = Laya.Point.create();
            direct.setTo(this._topSprite.x - this._bottomSprite.x, this._topSprite.y - this._bottomSprite.y);
            var angel = Math.atan2(direct.x, direct.y) * 180 / Math.PI * -1;
            this._ownerSp.rotation = angel;
            direct.recover();
        }
    };
    return RopePieces;
}(Laya.Script));
exports.default = RopePieces;
},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RotateObj = /** @class */ (function (_super) {
    __extends(RotateObj, _super);
    function RotateObj() {
        var _this = _super.call(this) || this;
        /** @prop {name:rotateDir, tips:"旋转方向", type:Option,option:"Add,Dec",default:"Add"}*/
        _this.rotateDir = "Add";
        _this.OneLoopTime = 7000;
        return _this;
    }
    RotateObj.prototype.onAwake = function () {
        this._ownerSp = this.owner;
        this._timeScale = 360 / this.OneLoopTime;
    };
    RotateObj.prototype.onUpdate = function () {
        if (this.rotateDir == "Add") {
            this._ownerSp.rotation += Laya.timer.delta * this._timeScale;
        }
        else {
            this._ownerSp.rotation -= Laya.timer.delta * this._timeScale;
        }
    };
    return RotateObj;
}(Laya.Script));
exports.default = RotateObj;
},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhysicsUtils_1 = require("../PhysicsUtils");
var BaseObj_1 = require("./BaseObj");
var TideObject = /** @class */ (function (_super) {
    __extends(TideObject, _super);
    function TideObject() {
        var _this = _super.call(this) || this;
        /* 绳子组件 */
        _this._ropeAnchorList = [];
        /* 捆绑状态 */
        _this._tide = false;
        /* 绑住的绳子数量 */
        _this._ropeCount = 0;
        return _this;
    }
    TideObject.prototype.onStart = function () {
        if (this._ropeAnchorList.length > 0) {
            this._tide = true;
        }
    };
    /**
     * 设置绳子碰撞组别
     *
     * @protected
     * @memberof TideObject
     */
    TideObject.prototype.SetColliderCategory = function () {
        this._rigBody.category = PhysicsUtils_1.CollisionFilterGroupEnum.Plane;
        this._rigBody.mask = PhysicsUtils_1.CollisionFilterGroupEnum.ALL ^ PhysicsUtils_1.CollisionFilterGroupEnum.Rope;
        this._collider.refresh();
    };
    /**
     * 设置绳子锚点
     *
     * @param {Laya.RopeJoint} rope
     * @memberof TideObject
     */
    TideObject.prototype.SetRopeAnchor = function (rope) {
        this._ropeAnchorList.push(rope);
        this._ropeCount++;
    };
    /**
     * 进入触发器
     *
     * @param {Laya.ColliderBase} other
     * @param {Laya.ColliderBase} self
     * @param {*} contact
     * @memberof TideObject
     */
    TideObject.prototype.onTriggerEnter = function (other, self, contact) {
        // if(!other.owner || !other.owner.name) return;
        if (!other.isSensor && !this._tide) {
            this.RopeBroken();
        }
        if (other.owner.name.indexOf("Ground") >= 0) {
            this.RopeBroken();
        }
    };
    /**
     * 在落地的时候,打断绳子
     *
     * @param {Laya.RopeJoint} rope
     * @memberof TideObject
     */
    TideObject.prototype.RopeBroken = function () {
        this._ropeAnchorList.forEach(function (u) {
            u._setActive(false);
        });
        this._tide = false;
    };
    /**
     * 切断一根绳子
     *
     * @memberof TideObject
     */
    TideObject.prototype.RopeCut = function () {
        this._ropeCount--;
        if (this._ropeCount <= 0) {
            this._tide = false;
        }
    };
    return TideObject;
}(BaseObj_1.default));
exports.default = TideObject;
},{"../PhysicsUtils":26,"./BaseObj":13}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Guider = /** @class */ (function (_super) {
    __extends(Guider, _super);
    function Guider() {
        return _super.call(this) || this;
    }
    Guider.prototype.onAwake = function () {
        this._ownerSp = this.owner;
        this._sk = this.owner.getChildByName("Sk");
        var skeleton = new Laya.Skeleton();
        skeleton.load("subRes/guider/NewProject.sk");
        skeleton.scaleX = skeleton.scaleX / 2;
        skeleton.scaleY = skeleton.scaleY / 2;
        this._sk.addChild(skeleton);
    };
    Guider.prototype.onMouseOver = function () {
        this._ownerSp.visible = false;
    };
    return Guider;
}(Laya.Script));
exports.default = Guider;
},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../View/ViewBase");
var CachedWXBannerAd_1 = require("../../CachedWXBannerAd");
var WXAPI_1 = require("../../WXAPI");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var SkinConfig_1 = require("../../Config/SkinConfig");
var User_1 = require("../../User/User");
var WudianMgr_1 = require("../../Mgr/WudianMgr");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var GameOverSkin = /** @class */ (function (_super) {
    __extends(GameOverSkin, _super);
    function GameOverSkin() {
        var _this = _super.call(this) || this;
        _this._skinIndex = 0;
        return _this;
    }
    GameOverSkin.prototype.onAwake = function () {
        this._skin_Img = this.owner.getChildByName("SkinBg").getChildByName("Skin_Img");
        this._unlockSkin_Btn = this.owner.getChildByName("UnlockSkin_Btn");
        this._continue_Btn = this.owner.getChildByName("Continue_Btn");
    };
    GameOverSkin.prototype.addEvent = function () {
        this._unlockSkin_Btn.on(Laya.Event.CLICK, this, this.UnlockSkin);
        this._continue_Btn.on(Laya.Event.CLICK, this, this.CloseView);
    };
    GameOverSkin.prototype.removeEvent = function () {
        this._unlockSkin_Btn.off(Laya.Event.CLICK, this, this.UnlockSkin);
        this._continue_Btn.off(Laya.Event.CLICK, this, this.CloseView);
    };
    GameOverSkin.prototype.onShow = function () {
        var notOwned = [];
        var skinDatas = SkinConfig_1.default.getIns_JJKLBB_tance().getSkin_JJKLBB_ConfigDatas();
        for (var i = 0; i < skinDatas.length; i++) {
            var owned = User_1.default.actorSkin_JJKLBB_IsUnlock(i);
            if (!owned) {
                if (Math.random() > 0.5) {
                    notOwned.push(i);
                }
            }
        }
        if (notOwned.length > 0) {
            i = notOwned[Math.floor(Math.random() * notOwned.length)];
        }
        else {
            i = skinDatas.length - 1;
        }
        this._skinIndex = i;
        this._skin_Img.skin = "subRes/player/" + (this._skinIndex + 1) + ".png";
        if (WudianMgr_1.default.WudianFlag) {
            this._continue_Btn.bottom = 100;
            this._continue_Btn.mouseEnabled = false;
            var btnMoveTimer = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().btnMov_JJKLBB_eTimer;
            var bannerMoveTimer = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().bannerMo_JJKLBB_veTimer;
            Laya.timer.once(bannerMoveTimer * 1000, this, this.ryw_BannerUp);
            Laya.timer.once(btnMoveTimer * 1000, this, this.ryw_BtnUp);
        }
        else {
            CachedWXBannerAd_1.default.changeShow();
        }
        _super.prototype.onShow.call(this);
    };
    GameOverSkin.prototype.ryw_BannerUp = function () {
        CachedWXBannerAd_1.default.changeShow();
    };
    GameOverSkin.prototype.ryw_BtnUp = function () {
        this._continue_Btn.mouseEnabled = true;
        this._continue_Btn.bottom = 400;
        // this.ryw_HistoryBtn.visible = true;
    };
    GameOverSkin.prototype.onClose = function () {
        CachedWXBannerAd_1.default.hide();
        _super.prototype.onClose.call(this);
    };
    GameOverSkin.prototype.CloseView = function () {
        // WXAPI.tryShowWXCrazyClick("加速", () => {
        //     ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.MyInGameView, true);
        // }, () => { }, () => {
        //     ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.MyInGameView, false);
        // })
        ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.LevelStateView);
        this.closeView();
    };
    /**
     * 解锁皮肤
     *
     * @memberof GameOverSkin
     */
    GameOverSkin.prototype.UnlockSkin = function () {
        var _this = this;
        WXAPI_1.default.showRewardedVideoAd(function (res) {
            if (res) {
                User_1.default.unlock_JJKLBB_ActorSkin(_this._skinIndex);
                User_1.default.setCurA_JJKLBB_ctorSkin(_this._skinIndex);
                EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_OnUser_JJKLBB_ActorSkin_JJKLBB_Change, _this._skinIndex);
                ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.LevelStateView);
                _this.closeView();
            }
            else {
                ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.TipsView, "要看完激励视屏才能解锁哦");
            }
        }, function () {
            ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.TipsView, "激励视屏拉取失败");
        });
    };
    return GameOverSkin;
}(ViewBase_1.default));
exports.default = GameOverSkin;
},{"../../CachedWXBannerAd":3,"../../Config/AppSwitchConfig":4,"../../Config/SkinConfig":8,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Mgr/ViewMgr":32,"../../Mgr/WudianMgr":33,"../../User/User":46,"../../View/ViewBase":69,"../../WXAPI":70}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CollisionFilterGroupEnum = /** @class */ (function () {
    function CollisionFilterGroupEnum() {
    }
    CollisionFilterGroupEnum.None = 0;
    CollisionFilterGroupEnum.ALL = -1;
    CollisionFilterGroupEnum.Plane = Math.pow(2, 0);
    CollisionFilterGroupEnum.Ground = Math.pow(2, 1);
    CollisionFilterGroupEnum.Rope = Math.pow(2, 2);
    CollisionFilterGroupEnum.Player = Math.pow(2, 3);
    CollisionFilterGroupEnum.Enemy = Math.pow(2, 4);
    CollisionFilterGroupEnum.PlaneBlocker = Math.pow(2, 5);
    return CollisionFilterGroupEnum;
}());
exports.CollisionFilterGroupEnum = CollisionFilterGroupEnum;
},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TouchCtr = /** @class */ (function (_super) {
    __extends(TouchCtr, _super);
    // private _touchTime: number = -1;
    // private _touchCollider: Laya.ChainCollider;
    // private _touchRigbody: Laya.RigidBody;
    // private _mouseX: number;
    // private _mouseY: number;
    function TouchCtr() {
        var _this = _super.call(this) || this;
        /** @prop {name:touchTexture, tips:"显示效果材质", type:string,accept:res,default:"GameObjs/TouchEffect.png"}*/
        _this.touchTexture = "GameObjs/TouchEffect.png";
        /** @prop {name:effectSize, tips:"显示效果材质大小", type:int,default:20}*/
        _this.effectSize = 20;
        /** @prop {name:effecTime, tips:"显示效果消失次数,单位毫秒", type:int,default:1000}*/
        _this.effecTime = 1000;
        return _this;
    }
    TouchCtr.prototype.onAwake = function () {
        this._touchEffectParent = Laya.stage.getChildByName("TouchEffectParent");
        if (this._touchEffectParent == null) {
            this._touchEffectParent = new Laya.Sprite();
            this._touchEffectParent.mouseEnabled = false;
            Laya.stage.addChild(this._touchEffectParent);
        }
        if (Laya.stage.getChildIndex(this._touchEffectParent) != Laya.stage.numChildren - 1) {
            Laya.stage.setChildIndex(this._touchEffectParent, Laya.stage.numChildren - 1);
        }
        // this._touchCollider = this.owner.addComponent(Laya.ChainCollider);
        // this._touchCollider.points = "0,0,0,0";
        // this._touchCollider.loop = false;
        // this._touchRigbody = this.owner.addComponent(Laya.RigidBody);
        // this._touchRigbody.type = "kinematic";
        // this._touchRigbody.allowRotation = false;
        // this._touchRigbody.category = CollisionFilterGroupEnum.RopeCut;
        // this._touchRigbody.mask = CollisionFilterGroupEnum.Rope;
        // this._touchCollider.refresh();
    };
    TouchCtr.prototype.onStageMouseDown = function () {
        this._mouseDown = true;
    };
    TouchCtr.prototype.onStageMouseUp = function () {
        this._mouseDown = false;
    };
    TouchCtr.prototype.onUpdate = function () {
        var _this = this;
        if (!this._mouseDown) {
            // this._mouseX = -1;
            // this._mouseY = -1;
            // this._touchTime = 0;
            return;
        }
        /* 划痕显示效果 */
        var effect = Laya.Pool.getItemByCreateFun("touchEffect", function (res) {
            var eff = new Laya.Sprite();
            eff.mouseEnabled = false;
            eff.loadImage(_this.touchTexture);
            eff.width = _this.effectSize;
            eff.height = _this.effectSize;
            var effScript = eff.addComponent(TouchEffect);
            effScript.effecTime = _this.effecTime;
            return eff;
        }, this);
        effect.x = Laya.stage.mouseX;
        effect.y = Laya.stage.mouseY;
        effect.pivotX = this.effectSize / 2;
        effect.pivotY = this.effectSize / 2;
        this._touchEffectParent.addChild(effect);
        /* 真正切绳子 */
        // if (this._touchTime <= 50) {
        //     this._touchTime += Laya.timer.delta;
        //     return;
        // }
        // if (this._mouseX <= 0 || this._mouseY <= 0) {
        //     this._mouseX = Laya.stage.mouseX;
        //     this._mouseY = Laya.stage.mouseY;
        //     return;
        // }
        // this._touchCollider.points = this._mouseX.toString() + "," + this._mouseY.toString() + "," +
        //     Laya.stage.mouseX.toString() + "," + Laya.stage.mouseY.toString();
        // this._touchCollider.refresh();
        // this._mouseX = Laya.stage.mouseX;
        // this._mouseY = Laya.stage.mouseY;
        // this._touchTime = 0;
    };
    return TouchCtr;
}(Laya.Script));
exports.default = TouchCtr;
var TouchEffect = /** @class */ (function (_super) {
    __extends(TouchEffect, _super);
    function TouchEffect() {
        var _this = _super.call(this) || this;
        _this.effecTime = 1000;
        return _this;
    }
    TouchEffect.prototype.onAwake = function () {
        this._isScare = false;
        this._ownerSp = this.owner;
    };
    TouchEffect.prototype.onEnable = function () {
        this._scare = 1;
        this._isScare = true;
        // Laya.timer.once(500, this, () => {
        //     this.owner.removeSelf();
        // })
    };
    TouchEffect.prototype.onUpdate = function () {
        if (this._isScare && this._scare > 0) {
            this._scare -= Laya.timer.delta / this.effecTime;
            this._ownerSp.scaleX = this._scare;
            this._ownerSp.scaleY = this._scare;
            this._ownerSp.alpha = this._scare;
        }
        else {
            this.owner.removeSelf();
        }
    };
    TouchEffect.prototype.onDisable = function () {
        //效果，回收效果对象池，方便下次复用，减少对象创建开销
        this._isScare = false;
        Laya.Pool.recover("touchEffect", this.owner);
    };
    return TouchEffect;
}(Laya.Script));
exports.TouchEffect = TouchEffect;
},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpUnit_1 = require("../Net/HttpUnit");
var AppConfig_1 = require("../AppConfig");
var WXAPI_1 = require("../WXAPI");
var User_1 = require("../User/User");
/**
 * 用于买量上报,以及停留时间上报的的类，本质上是对wx和买量接口做一个集成化的封装方便使用
 *
 * @export
 * @class MaiLiang
 */
var Mai_JJKLBB_Liang = /** @class */ (function () {
    function Mai_JJKLBB_Liang() {
    }
    /**
     * 发送数据的类
     *
     * @protected
     * @static
     * @param {reques_JJKLBB_tData} req
     * @memberof MaiLiang
     */
    Mai_JJKLBB_Liang.req_JJKLBB_uest = function (req) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        }
        else {
            req.url = Mai_JJKLBB_Liang.mai_JJKLBB_nUrl + req.url;
        }
        var completeFunc = function (res) {
            console.log(res, "MaiLiang http Success");
            res = JSON.parse(res);
            if (res.Status == "200") {
                if (res.Result["OpenId"] != null && res.Result["OpenId"] != "") {
                    Mai_JJKLBB_Liang.MaiLia_JJKLBB_ngOpenId = res.Result["OpenId"];
                    Mai_JJKLBB_Liang.tim_JJKLBB_e = req.data.posttime;
                    console.log("获得买量系统OpenId " + Mai_JJKLBB_Liang.MaiLia_JJKLBB_ngOpenId);
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
        xhr.once(Laya.Event.COMPLETE, Mai_JJKLBB_Liang, completeFunc);
        xhr.once(Laya.Event.ERROR, Mai_JJKLBB_Liang, errorFunc);
        if (req.me_JJKLBB_th == "get") {
            var para = "";
            for (var _i = 0, _a = Object.keys(req.data); _i < _a.length; _i++) {
                var key = _a[_i];
                var value = req.data[key];
                para += key + "=" + value + "&";
            }
            req.url = req.url + "?" + para;
            xhr.send(req.url, null, req.me_JJKLBB_th);
        }
        else {
            var para = "";
            for (var _b = 0, _c = Object.keys(req.data); _b < _c.length; _b++) {
                var key = _c[_b];
                var value = req.data[key];
                para += key + "=" + value + "&";
            }
            xhr.send(req.url, para, req.me_JJKLBB_th, null, ["Content-Type", "application/x-www-form-urlencoded"]);
        }
    };
    /**
     * 获得买量系统唯一标识ID,此ID的作用是用来上报游戏时间
     *
     * @param {Function} res
     * @memberof MaiLiang
     */
    Mai_JJKLBB_Liang.GetMaiL_JJKLBB_iangOp_JJKLBB_enId = function (onSuccess, onFail) {
        if (Laya.Browser.onMiniGame) {
            var option = WXAPI_1.default.getLaunchOptionsSync();
            if (option != null) {
                var key = option.query["key"];
                if (key != null && key != "" && User_1.default.open_JJKLBB_Id != "") {
                    Mai_JJKLBB_Liang.ke_JJKLBB_y = key;
                    var req = new HttpUnit_1.reques_JJKLBB_tData();
                    req.url = Mai_JJKLBB_Liang.ucl_JJKLBB_ick;
                    req.onSuccess = onSuccess;
                    req.onFail = onFail;
                    req.data.appid = AppConfig_1.default.Ap_JJKLBB_pID;
                    req.data.openid = "";
                    var time = new Date().getTime() / 1000;
                    req.data.posttime = time;
                    req.data.auth = 0;
                    req.data.key = key;
                    req.data.wxopenid = User_1.default.open_JJKLBB_Id;
                    req.me_JJKLBB_th = "POST";
                    console.log("发送买量数据接口");
                    Mai_JJKLBB_Liang.req_JJKLBB_uest(req);
                }
            }
            else {
                console.log("上报买量数据失败");
                onFail(null);
            }
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
    Mai_JJKLBB_Liang.Repo_JJKLBB_rtStayTim_JJKLBB_e = function (onSuccess, onFail) {
        if (Laya.Browser.onMiniGame) {
            if (Mai_JJKLBB_Liang.MaiLia_JJKLBB_ngOpenId != "") {
                var req = new HttpUnit_1.reques_JJKLBB_tData();
                req.url = Mai_JJKLBB_Liang.sta_JJKLBB_y;
                req.onSuccess = onSuccess;
                req.onFail = onFail;
                req.data.appid = AppConfig_1.default.Ap_JJKLBB_pID;
                req.data.openid = Mai_JJKLBB_Liang.MaiLia_JJKLBB_ngOpenId;
                var time = new Date().getTime() / 1000;
                req.data.posttime = time;
                var staytime = Mai_JJKLBB_Liang.tim_JJKLBB_e != 0 ? time - Mai_JJKLBB_Liang.tim_JJKLBB_e : 0;
                req.data.time = staytime;
                req.me_JJKLBB_th = "POST";
                console.log("发送停留时间至买量接口");
                Mai_JJKLBB_Liang.req_JJKLBB_uest(req);
            }
        }
        else {
            console.log("不在微信模式下调用，默认发送停留时间至买量接口失败");
            onFail(null);
        }
    };
    Mai_JJKLBB_Liang.mai_JJKLBB_nUrl = "https://swtj.mrkzx.cn";
    Mai_JJKLBB_Liang.ucl_JJKLBB_ick = "/v1.1/api/Activity/uclick.html";
    Mai_JJKLBB_Liang.sta_JJKLBB_y = "/v1.1/api/Activity/stay.html";
    Mai_JJKLBB_Liang.ke_JJKLBB_y = ""; //推广路径中同名参数，需要调用方法WXAPi.getLaunchOptionsSync()，从返回的参数中获得。
    Mai_JJKLBB_Liang.MaiLia_JJKLBB_ngOpenId = ""; //买量系统唯一标识,执行GetMaiLiangOpenId()方法成功后自动获得。
    Mai_JJKLBB_Liang.tim_JJKLBB_e = 0; //买量系统唯一标识后，记录当前时间（精确到秒）。
    return Mai_JJKLBB_Liang;
}());
exports.default = Mai_JJKLBB_Liang;
},{"../AppConfig":2,"../Net/HttpUnit":36,"../User/User":46,"../WXAPI":70}],29:[function(require,module,exports){
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
var ALD_1 = require("./ALD");
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
        if (!Laya.Browser.onMiniGame && !Laya.Browser.onQGMiniGame && !Laya.Browser.onQQMiniGame) //如果不是小游戏，资源服务器设置为本地测试地址
         {
            AppConfig_1.default.ResSe_JJKLBB_rver = AppConfig_1.default.LocalTes_JJKLBB_tReServer;
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
            { url: AppConfig_1.default.ResSe_JJKLBB_rver + "/json/appswitch.json", type: Laya.Loader.JSON }
        ];
        var self = this;
        Laya.loader.load(firstConfigs, Laya.Handler.create(this, function () {
            self.loadRes(); //加载资源
        }));
        EventMgr_1.default.insta_JJKLBB_nce.regO_JJKLBB_nceEvent(EventDef_1.Event_JJKLBB_Def.App_CloseF_JJKLBB_irstLoadingView, this, this.closeloadingUI);
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
        this._preLoadRes.push({ url: AppConfig_1.default.ResSe_JJKLBB_rver + "/json/levelConfig.json", type: Laya.Loader.JSON });
        this._preLoadRes.push({ url: AppConfig_1.default.ResSe_JJKLBB_rver + "/json/skinConfig.json", type: Laya.Loader.JSON });
        this._preLoadRes.push({ url: AppConfig_1.default.ResSe_JJKLBB_rver + "/json/gameConfig.json", type: Laya.Loader.JSON });
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
        else {
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
        var self = this;
        this._loadingView.setProcess(1);
        if (Laya.Browser.onMiniGame) {
            WXAPI_1.default.wxLogin(function (code) {
                var _this = this;
                User_1.default.co_JJKLBB_de = code;
                HttpUnit_1.default.log_JJKLBB_in(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default.tok_JJKLBB_en = res.data.token;
                        User_1.default.open_JJKLBB_Id = res.data.openid;
                        ALD_1.default.aldSendOpenId(User_1.default.open_JJKLBB_Id);
                        HttpUnit_1.default.getGam_JJKLBB_eData(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initi_JJKLBB_User(res.data);
                            }
                            else {
                                User_1.default.initi_JJKLBB_User(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default.tok_JJKLBB_en = null;
                            User_1.default.open_JJKLBB_Id = null;
                            User_1.default.initi_JJKLBB_User(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                }, function (res) {
                    console.log("登陆失败！！！" + res);
                    User_1.default.initi_JJKLBB_User(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            }, null);
        }
        else if (Laya.Browser.onQGMiniGame) //oppo小游戏
         {
            OPPOAPI_1.default.initAdS_JJKLBB_ervice(function () {
            }, function () {
            }, function () {
            });
            OPPOAPI_1.default.Lo_JJKLBB_gin(function (token) {
                var _this = this;
                User_1.default.co_JJKLBB_de = token;
                HttpUnit_1.default.log_JJKLBB_in(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default.tok_JJKLBB_en = res.data.token;
                        User_1.default.open_JJKLBB_Id = res.data.openid;
                        HttpUnit_1.default.getGam_JJKLBB_eData(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initi_JJKLBB_User(res.data);
                                console.log("获取用户数据--------------------Start");
                                for (var key in res.data) {
                                    console.log(key, res.data[key]);
                                }
                                console.log("获取用户数据--------------------End");
                            }
                            else {
                                User_1.default.initi_JJKLBB_User(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default.initi_JJKLBB_User(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                }, function (res) {
                    console.log("登陆失败！！！", res);
                    User_1.default.initi_JJKLBB_User(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            }, null);
        }
        else if (Laya.Browser.onQQMiniGame) //qq小游戏
         {
            QQMiniGameAPI_1.default.Lo_JJKLBB_gin(function (code) {
                var _this = this;
                User_1.default.co_JJKLBB_de = code;
                HttpUnit_1.default.log_JJKLBB_in(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default.tok_JJKLBB_en = res.data.token;
                        User_1.default.open_JJKLBB_Id = res.data.openid;
                        HttpUnit_1.default.getGam_JJKLBB_eData(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initi_JJKLBB_User(res.data);
                            }
                            else {
                                User_1.default.initi_JJKLBB_User(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default.initi_JJKLBB_User(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                }, function (res) {
                    console.log("登陆失败！！！" + res);
                    User_1.default.initi_JJKLBB_User(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            }, null);
        }
        else {
            User_1.default.testIn_JJKLBB_itUser(); //测试
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
},{"./ALD":1,"./AppConfig":2,"./Event/EventDef":9,"./Event/EventMgr":10,"./GameConfig":11,"./NativeCallback":34,"./Net/HttpUnit":36,"./OPPOAPI":39,"./QQMiniGameAPI":40,"./User/User":46,"./View/LoadingView/LoadingView":59,"./WXAPI":70,"./ui/layaMaxUI":71}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("./ViewMgr");
var User_1 = require("../User/User");
var MaiLiang_1 = require("../MaiLiangAPI/MaiLiang");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var WXAPI_1 = require("../WXAPI");
var WudianMgr_1 = require("./WudianMgr");
var SoundMgr_1 = require("./SoundMgr");
var CachedWXBannerAd_1 = require("../CachedWXBannerAd");
var ShareAd_1 = require("../ShareAd/ShareAd");
var ALD_1 = require("../ALD");
var FreeRewardView_1 = require("../View/FreeReward/FreeRewardView");
var GameSwitchConfig_1 = require("../Config/GameSwitchConfig");
//游戏管理器，游戏代码的入口
var Game_JJKLBB_Mgr = /** @class */ (function (_super) {
    __extends(Game_JJKLBB_Mgr, _super);
    function Game_JJKLBB_Mgr() {
        var _this = _super.call(this) || this;
        Game_JJKLBB_Mgr._instance = _this;
        return _this;
    }
    Game_JJKLBB_Mgr.getI_JJKLBB_nstan_JJKLBB_ce = function () { return Game_JJKLBB_Mgr._instance; };
    Game_JJKLBB_Mgr.prototype.onAwake = function () {
        ALD_1.default.aldSendOnlySingleReport(ALD_1.ALDEv_JJKLBB_entDef.EnterLoading);
        WudianMgr_1.default.Update_JJKLBB_IpBlock_JJKLBB_State();
        Laya.loader.maxLoader = 50;
        MaiLiang_1.default.GetMaiL_JJKLBB_iangOp_JJKLBB_enId(function (res) {
            console.log("GameUI 买量数据上报成功");
            Laya.Browser.window["wx"].onShow(function () {
                MaiLiang_1.default.GetMaiL_JJKLBB_iangOp_JJKLBB_enId(null, null);
            });
            Laya.Browser.window["wx"].onHide(function () {
                MaiLiang_1.default.Repo_JJKLBB_rtStayTim_JJKLBB_e(null, null);
            });
        }, function (res) {
            console.log("GameUI 买量数据上报失败");
        });
        WXAPI_1.default.SetShareMenu("恐龙宝宝被人绑架了，快来救救它吧！", "subRes/image/fenxiang.png", function () {
        }, function () {
        }, function () {
        });
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_onGameC_JJKLBB_omplate, this, this.onGame_JJKLBB_Complate);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_Start_JJKLBB_Game, this, this.LoadG_JJKLBB_ame);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_PlayBgm, this, this.playBgm);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_StopBgm, this, this.stopBgm);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.AD_OnShareAdFail_UseCancel, this, this.switchBanner);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.saveGa_JJKLBB_meData);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.saveGa_JJKLBB_meData);
        this.saveGa_JJKLBB_meData();
        CachedWXBannerAd_1.default.preload_JJKLBB_Banner();
        Laya.timer.once(2000, this, function () {
            ShareAd_1.default.get_JJKLBB_ADVs(ShareAd_1.default.Insert_JJKLBB_AdLocationID, function (res) {
                console.log("预加载广告InsertAdLocationID");
            }, false, false);
            ShareAd_1.default.get_JJKLBB_ADVs(ShareAd_1.default.LoopAd_JJKLBB_LocationID, function (res) {
                console.log("预加载广告LoopAdLocationID");
            }, false, false);
            ShareAd_1.default.get_JJKLBB_ADVs(ShareAd_1.default.BannerAdL_JJKLBB_ocationID, function (res) {
                console.log("预加载广告BannerAdLocationID");
            }, false, false);
        });
    };
    Game_JJKLBB_Mgr.prototype.onStart = function () {
        this.preCr_JJKLBB_eateGame();
    };
    Game_JJKLBB_Mgr.prototype.preCr_JJKLBB_eateGame = function () {
        if (User_1.default.getLev_JJKLBB_eNum() <= 1) {
            EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.App_CloseF_JJKLBB_irstLoadingView);
            var data = { levelNum: 1, costEnergy: 0, crystalReward: 5 };
            this.LoadG_JJKLBB_ame(data);
        }
        else {
            //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
            ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.MainView, null, function (v) {
                EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.App_CloseF_JJKLBB_irstLoadingView);
            });
        }
        SoundMgr_1.default.instance.pla_JJKLBB_yBGM("bgm");
        GameSwitchConfig_1.default.getInstance().SetBannerActive();
    };
    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    Game_JJKLBB_Mgr.prototype.saveGa_JJKLBB_meData = function () {
        localStorage.setItem("Game_Data", User_1.default.getS_JJKLBB_aveData());
        // Http_JJKLBB_Unit.saveGa_JJKLBB_meData(Us_JJKLBB_er.getS_JJKLBB_aveData(),
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
    Game_JJKLBB_Mgr.prototype.onGame_JJKLBB_Complate = function (para) {
        var isWin = para.isWin;
        var levelNum = para.levelNum;
        var crystalReward = para.crystalReward;
        // let func: Function = () => {
        //     if (isWin) {
        //         Us_JJKLBB_er.unLockMax_JJKLBB_LevelNum(levelNum + 1);//解锁下一个关卡
        //         View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.GameRewardView,
        //             {
        //                 isWin: true,
        //                 levelNum: levelNum,
        //                 rewardNum: crystalReward
        //             });
        //     }
        //     else {
        //         View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.GameOverView,
        //             {
        //                 isWin: false,
        //                 levelNum: levelNum,
        //             });
        //     }
        // }
        // /* 游戏结束后直接打开更多好玩 */
        // View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.MoreGameView, { ContinueGame: true, closeFunction: func });
        if (isWin) {
            User_1.default.unLockMax_JJKLBB_LevelNum(levelNum + 1); //解锁下一个关卡
            ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.GameRewardView, {
                isWin: true,
                levelNum: levelNum,
                rewardNum: crystalReward
            });
        }
        else {
            ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.GameOverView, {
                isWin: false,
                levelNum: levelNum,
            });
        }
    };
    Game_JJKLBB_Mgr.prototype.LoadG_JJKLBB_ame = function (date) {
        if (WudianMgr_1.default.FirstWudianFlag && date.levelNum != 1) {
            var currTime_1 = Laya.timer.currTimer;
            var data = {};
            data.PrizeCount = "恭喜获得皮肤";
            data.ClickType = 1;
            data.CompleteHander = Laya.Handler.create(this, function (d) {
                {
                    console.log("游戏开始狂点停留时间", (Laya.timer.currTimer - currTime_1) / 1000);
                    ALD_1.default.aldSendOnlySingleReport(ALD_1.ALDEv_JJKLBB_entDef.StayStartClickGetPrizeTime, {
                        "时间": (Laya.timer.currTimer - currTime_1) / 1000
                    });
                    ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.GameView, d);
                }
            }, [date]);
            ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.ClickGetPrize_2, data, function () {
                ALD_1.default.aldSendOnlySingleReport(ALD_1.ALDEv_JJKLBB_entDef.EnterStartClickGetPrize);
                ALD_1.default.aldSendOnlySingleReport(ALD_1.ALDEv_JJKLBB_entDef.EnterStartClickGetPrizeScene, {
                    "场景值": WXAPI_1.default.getLaunchOptionsSync().scene
                });
            });
        }
        else {
            if (User_1.default.getEn_JJKLBB_ergy < date.costEnergy) {
                ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.FreeRewardView, {
                    rewardType: FreeRewardView_1.FreeRewardType.Energy
                });
                ViewMgr_1.default.insta_JJKLBB_nce.showTips("You have no energy left");
            }
            else {
                console.log("能量充足,开始游戏");
                ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.GameView, date);
            }
        }
        SoundMgr_1.default.instance.sto_JJKLBB_pBGM();
        // View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.GameView, date);
    };
    Game_JJKLBB_Mgr.prototype.playBgm = function () {
        SoundMgr_1.default.instance.pla_JJKLBB_yBGM("bgm");
    };
    Game_JJKLBB_Mgr.prototype.stopBgm = function () {
        SoundMgr_1.default.instance.sto_JJKLBB_pBGM();
    };
    Game_JJKLBB_Mgr.prototype.switchBanner = function () {
        console.log("触发取消打开更多好玩");
        var moreGame = ViewMgr_1.default.insta_JJKLBB_nce.getView(ViewMgr_1.View_JJKLBB_Def.MoreGameView);
        var gamePlaying = ViewMgr_1.default.insta_JJKLBB_nce.getView(ViewMgr_1.View_JJKLBB_Def.GameView);
        if (moreGame == null && gamePlaying == null) {
            console.log("没有更多好玩界面或者游戏进行中界面，打开");
            ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.MoreGameView, { ContinueGame: true, closeFunction: null });
        }
    };
    Game_JJKLBB_Mgr._instance = null;
    return Game_JJKLBB_Mgr;
}(Laya.Script));
exports.default = Game_JJKLBB_Mgr;
},{"../ALD":1,"../CachedWXBannerAd":3,"../Config/GameSwitchConfig":6,"../Event/EventDef":9,"../Event/EventMgr":10,"../MaiLiangAPI/MaiLiang":28,"../ShareAd/ShareAd":41,"../User/User":46,"../View/FreeReward/FreeRewardView":53,"../WXAPI":70,"./SoundMgr":31,"./ViewMgr":32,"./WudianMgr":33}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SoundM_JJKLBB_gr = /** @class */ (function () {
    function SoundM_JJKLBB_gr() {
        this._enabled = true;
    }
    Object.defineProperty(SoundM_JJKLBB_gr.prototype, "Enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (e) {
            if (!e) {
                this.sto_JJKLBB_pBGM();
            }
            this._enabled = e;
        },
        enumerable: true,
        configurable: true
    });
    SoundM_JJKLBB_gr.prototype.getSo_JJKLBB_undUrl = function (name) {
        var url = SoundM_JJKLBB_gr.soundRe_JJKLBB_sPath + name + ".ogg";
        return url;
    };
    SoundM_JJKLBB_gr.prototype.playS_JJKLBB_ound = function (name) {
        if (!this._enabled)
            return;
        var url = this.getSo_JJKLBB_undUrl(name);
        if (Laya.Browser.onMiniGame) {
            var sound = laya.utils.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = SoundM_JJKLBB_gr.soundRe_JJKLBB_sPath + name + ".ogg";
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
    SoundM_JJKLBB_gr.prototype.pla_JJKLBB_yBGM = function (name) {
        if (!this._enabled)
            return;
        var url = this.getSo_JJKLBB_undUrl(name);
        if (Laya.Browser.onMiniGame) {
            if (!this.bgm) {
                this.bgm = wx.createInnerAudioContext();
            }
            this.bgm.stop();
            this.bgm.src = url;
            this.bgm.loop = true;
            this.bgm.play();
        }
        else {
            Laya.SoundManager.playMusic(url, 0);
        }
    };
    SoundM_JJKLBB_gr.prototype.sto_JJKLBB_pBGM = function () {
        if (Laya.Browser.onMiniGame) {
            if (this.bgm) {
                this.bgm.stop();
            }
        }
        else {
            Laya.SoundManager.stopMusic();
        }
    };
    SoundM_JJKLBB_gr.soundRe_JJKLBB_sPath = "subRes/sound/";
    SoundM_JJKLBB_gr.instance = new SoundM_JJKLBB_gr();
    return SoundM_JJKLBB_gr;
}());
exports.default = SoundM_JJKLBB_gr;
},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var View_JJKLBB_Def;
(function (View_JJKLBB_Def) {
    View_JJKLBB_Def["None"] = "";
    View_JJKLBB_Def["TipsView"] = "View/TipsView.json";
    View_JJKLBB_Def["ClickGetPrize"] = "View/ClickGetPrize.json";
    View_JJKLBB_Def["ClickGetPrize_2"] = "View/ClickGetPrize_2.json";
    //todo:添加你的界面
    View_JJKLBB_Def["MainView"] = "View/MainView.json";
    View_JJKLBB_Def["LevelStateView"] = "View/LevelStateView.json";
    View_JJKLBB_Def["MoreGameView"] = "View/MoreGame.json";
    View_JJKLBB_Def["GameRewardView"] = "View/GameReward.json";
    View_JJKLBB_Def["GameOverView"] = "View/GameOver.json";
    View_JJKLBB_Def["SignInRewardView"] = "View/SignInReward.json";
    View_JJKLBB_Def["ActorSkinView"] = "View/ActorSkinView.json";
    View_JJKLBB_Def["FreeRewardView"] = "View/FreeReward.json";
    View_JJKLBB_Def["GameView"] = "View/GameView.json";
    View_JJKLBB_Def["GameOverSkin"] = "View/GameOverSkin.json";
})(View_JJKLBB_Def = exports.View_JJKLBB_Def || (exports.View_JJKLBB_Def = {}));
//界面管理器
var View_JJKLBB_Mgr = /** @class */ (function () {
    function View_JJKLBB_Mgr() {
        this._views = {};
    }
    View_JJKLBB_Mgr.prototype.openView = function (viewType, data, oncomplate) {
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
        var viewUrl = String(viewType);
        var self = this;
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
            if (oncomplate) {
                oncomplate(viewBase);
            }
        }));
    };
    View_JJKLBB_Mgr.prototype.closeView = function (viewType) {
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
    View_JJKLBB_Mgr.prototype.ShowView = function (viewType) {
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
    View_JJKLBB_Mgr.prototype.hideView = function (viewType) {
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
    View_JJKLBB_Mgr.prototype.getView = function (viewType) {
        return this._views[viewType];
    };
    View_JJKLBB_Mgr.prototype.showTips = function (msg) {
        this.openView(View_JJKLBB_Def.TipsView, msg);
    };
    View_JJKLBB_Mgr.insta_JJKLBB_nce = new View_JJKLBB_Mgr();
    return View_JJKLBB_Mgr;
}());
exports.default = View_JJKLBB_Mgr;
},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpUnit_1 = require("../Net/HttpUnit");
var AppSwitchConfig_1 = require("../Config/AppSwitchConfig");
var WXAPI_1 = require("../WXAPI");
var Wudi_JJKLBB_anMgr = /** @class */ (function () {
    function Wudi_JJKLBB_anMgr() {
    }
    Wudi_JJKLBB_anMgr.IpBloc_JJKLBB_kFlag = function () {
        return Wudi_JJKLBB_anMgr._ipBloc_JJKLBB_kFlag;
    };
    /**
     * 此方法调用很慢，所以要在游戏初始化的时候调用一次此方法
     *
     * @static
     * @memberof WudianMgr
     */
    Wudi_JJKLBB_anMgr.Update_JJKLBB_IpBlock_JJKLBB_State = function () {
        HttpUnit_1.default.GetIp_JJKLBB_Block(function (res) {
            console.log("调用IpBlock接口成功,结果为:", res);
            Wudi_JJKLBB_anMgr._ipBloc_JJKLBB_kFlag = res.code;
        }, null);
    };
    /**
     * IP是否被屏蔽
     *
     * @static
     * @returns {boolean}
     * @memberof WudianMgr
     */
    Wudi_JJKLBB_anMgr.GetIp_JJKLBB_Block_JJKLBB_ed = function () {
        return Wudi_JJKLBB_anMgr._ipBloc_JJKLBB_kFlag == 0;
    };
    /**
     * 得到用户进入的场景值
     *
     * @static
     * @returns {number}
     * @memberof WudianMgr
     */
    Wudi_JJKLBB_anMgr.GetE_JJKLBB_ntrySc_JJKLBB_ene = function () {
        return WXAPI_1.default.getLaunchOptionsSync().scene == 1006;
    };
    /**
     * 误点开关是否打开，包括了总开关和分时开关
     *
     * @static
     * @returns {boolean}
     * @memberof WudianMgr
     */
    Wudi_JJKLBB_anMgr.IsS_JJKLBB_witchOpe_JJKLBB_n = function () {
        var mainSwitch = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wu_JJKLBB_dian == 1;
        var isOpenTime = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wudianTim_JJKLBB_eAvaliable;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "打开时间", isOpenTime);
        return mainSwitch && isOpenTime;
    };
    Object.defineProperty(Wudi_JJKLBB_anMgr, "NoTimeWu_JJKLBB_dianFlag", {
        // /**
        //  * 完全封装好的误点Flag
        //  * 
        //  * @readonly
        //  * @static
        //  * @type {boolean}
        //  * @memberof WudianMgr
        //  */
        // public static get Wudia_JJKLBB_nFlag(): boolean {
        //     let mainSwitch = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wu_JJKLBB_dian == 1;
        //     let noEnterBySearch: boolean = WXAPI.getLaunchOptionsSync().scene != 1006;
        //     let isOpenTime = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wudianTim_JJKLBB_eAvaliable;
        //     let ipnotBlock = Wudi_JJKLBB_anMgr._ipBloc_JJKLBB_kFlag == 0;
        //     /* 测试功能，等删 */
        //     // ipnotBlock = true;
        //     console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock, "打开时间",
        //         isOpenTime);
        //     return mainSwitch && noEnterBySearch && ipnotBlock && isOpenTime;
        // }
        /**
         * 没有涉及到定时开关的wudianFlag,自行整合按照时间开关的效果
         *
         * @static
         * @returns {boolean}
         * @memberof WudianMgr
         */
        get: function () {
            var mainSwitch = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wu_JJKLBB_dian == 1;
            var noEnterBySearch = WXAPI_1.default.getLaunchOptionsSync().scene != 1006;
            var ipnotBlock = Wudi_JJKLBB_anMgr._ipBloc_JJKLBB_kFlag == 0;
            /* 测试功能，等删 */
            // ipnotBlock = true;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
            return mainSwitch && noEnterBySearch && ipnotBlock;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wudi_JJKLBB_anMgr, "WudianFlag", {
        get: function () {
            var mainSwitch = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wu_JJKLBB_dian == 1;
            var entryScene = WXAPI_1.default.getLaunchOptionsSync().scene;
            var noEnterBySearch = true;
            var sceneList = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().wudianSceneList;
            for (var index = 0; index < sceneList.length; index++) {
                var element = sceneList[index];
                if (element == entryScene) {
                    noEnterBySearch = false;
                    break;
                }
            }
            var ipnotBlock = this._ipBloc_JJKLBB_kFlag == 0;
            /* 测试功能，等删 */
            // ipnotBlock = true;
            var final = mainSwitch && noEnterBySearch && ipnotBlock;
            console.log("误点Flag状态:", final, ",AppSwitch.wudian开关:", mainSwitch, ",场景进入:", noEnterBySearch, ",IP未被屏蔽:", ipnotBlock);
            return mainSwitch && noEnterBySearch && ipnotBlock;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wudi_JJKLBB_anMgr, "FirstWudianFlag", {
        get: function () {
            var mainSwitch = Wudi_JJKLBB_anMgr.WudianFlag;
            var secondSwitch = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().firstWudian == 1;
            console.log("FirstWudianFlag状态:", mainSwitch && secondSwitch, ",WudianFlag开关:", mainSwitch, ",分开关:", secondSwitch);
            return mainSwitch && secondSwitch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wudi_JJKLBB_anMgr, "SecondWudianFlag", {
        get: function () {
            var mainSwitch = Wudi_JJKLBB_anMgr.WudianFlag;
            var secondSwitch = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().secondWudian == 1;
            console.log("SecondWudianFlag状态:", mainSwitch && secondSwitch, ",WudianFlag开关:", mainSwitch, ",分开关:", secondSwitch);
            return mainSwitch && secondSwitch;
        },
        enumerable: true,
        configurable: true
    });
    Wudi_JJKLBB_anMgr._ipBloc_JJKLBB_kFlag = -1;
    return Wudi_JJKLBB_anMgr;
}());
exports.default = Wudi_JJKLBB_anMgr;
},{"../Config/AppSwitchConfig":4,"../Net/HttpUnit":36,"../WXAPI":70}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDef_1 = require("./Event/EventDef");
var EventMgr_1 = require("./Event/EventMgr");
var SoundMgr_1 = require("./Mgr/SoundMgr");
var NativeCallback = /** @class */ (function () {
    function NativeCallback() {
    }
    // private static bridge: Laya.IPlatformClass = null;
    NativeCallback.onVideoFail = function () {
        console.debug("onVideoFail --------- ------------ ");
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.RewardVideoFail);
        Laya.SoundManager.muted = false;
    };
    NativeCallback.onVideoSuccess = function (reward) {
        console.debug("onVideoSuccess    --------- ------------ ");
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.RewardVideoSuccess, reward);
        SoundMgr_1.default.instance.pla_JJKLBB_yBGM('bgm');
        Laya.SoundManager.muted = false;
    };
    NativeCallback.onInsertVideoEnd = function () {
        console.debug("onInsertVideoEnd    --------- ------------ ");
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.InsertVideoEnd);
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
    NativeCallback.NowVideoType = "";
    NativeCallback.conchIOS = "Conch-ios";
    NativeCallback.conchAndroid = "Conch-android";
    NativeCallback.os = "";
    return NativeCallback;
}());
exports.default = NativeCallback;
},{"./Event/EventDef":9,"./Event/EventMgr":10,"./Mgr/SoundMgr":31}],35:[function(require,module,exports){
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
},{"./aes.js":38}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetConfig_1 = require("./NetConfig");
var User_1 = require("../User/User");
var AesTools_1 = require("./AesTools");
var reques_JJKLBB_tData = /** @class */ (function () {
    function reques_JJKLBB_tData() {
        this.me_JJKLBB_th = "post";
        this.url = "";
        this.onSuccess = null;
        this.onFail = null;
        this.data = {};
    }
    return reques_JJKLBB_tData;
}());
exports.reques_JJKLBB_tData = reques_JJKLBB_tData;
var Http_JJKLBB_Unit = /** @class */ (function () {
    function Http_JJKLBB_Unit() {
    }
    Http_JJKLBB_Unit.requ_JJKLBB_est = function (req) {
        if (req.url.indexOf("https://") > -1 ||
            req.url.indexOf("http://") > -1) {
            req.url = req.url;
        }
        else {
            req.url = NetConfig_1.default.serve_JJKLBB_rUrl + req.url;
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
        xhr.once(Laya.Event.COMPLETE, Http_JJKLBB_Unit, completeFunc);
        xhr.once(Laya.Event.ERROR, Http_JJKLBB_Unit, errorFunc);
        var dataStr = JSON.stringify(req.data);
        if (Laya.Browser.onMiniGame) {
            req.data.code = User_1.default.co_JJKLBB_de;
        }
        else if (Laya.Browser.onQGMiniGame) {
            req.data.oppotoken = User_1.default.co_JJKLBB_de;
        }
        else if (Laya.Browser.onQQMiniGame) //qq小游戏
         {
            req.data.code = User_1.default.co_JJKLBB_de;
        }
        var time = "time=" + String(Date.now());
        var header = [
            "Content-Type", "application/json",
            "state", NetConfig_1.default.sta_JJKLBB_te,
            "gameid", NetConfig_1.default.gam_JJKLBB_eid,
            "sign", AesTools_1.default.encrypt(time),
        ];
        if (User_1.default.tok_JJKLBB_en) {
            header.push("token");
            header.push(User_1.default.tok_JJKLBB_en);
        }
        xhr.send(req.url, JSON.stringify(req.data), req.me_JJKLBB_th, "json", header);
    };
    //todo:这里添加你们和服务器相互的接口
    Http_JJKLBB_Unit.log_JJKLBB_in = function (onSuccess, onFail) {
        var req = new reques_JJKLBB_tData();
        req.url = NetConfig_1.default.Logi_JJKLBB_n;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_JJKLBB_Unit.requ_JJKLBB_est(req);
    };
    Http_JJKLBB_Unit.saveGa_JJKLBB_meData = function (gameData, onSuccess, onFail) {
        var req = new reques_JJKLBB_tData();
        req.url = NetConfig_1.default.SaveG_JJKLBB_ameData;
        req.data.gameData = gameData;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_JJKLBB_Unit.requ_JJKLBB_est(req);
    };
    Http_JJKLBB_Unit.getGam_JJKLBB_eData = function (onSuccess, onFail) {
        var req = new reques_JJKLBB_tData();
        req.url = NetConfig_1.default.GetU_JJKLBB_ser;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_JJKLBB_Unit.requ_JJKLBB_est(req);
    };
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    Http_JJKLBB_Unit.GetIp_JJKLBB_Block = function (onSuccess, onFail) {
        var req = new reques_JJKLBB_tData();
        req.url = NetConfig_1.default.IpBl_JJKLBB_ock;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_JJKLBB_Unit.requ_JJKLBB_est(req);
    };
    return Http_JJKLBB_Unit;
}());
exports.default = Http_JJKLBB_Unit;
},{"../User/User":46,"./AesTools":35,"./NetConfig":37}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetCo_JJKLBB_nfig = /** @class */ (function () {
    function NetCo_JJKLBB_nfig() {
    }
    NetCo_JJKLBB_nfig.sta_JJKLBB_te = 0;
    NetCo_JJKLBB_nfig.gam_JJKLBB_eid = 31;
    NetCo_JJKLBB_nfig.serve_JJKLBB_rUrl = "";
    NetCo_JJKLBB_nfig.Logi_JJKLBB_n = "";
    NetCo_JJKLBB_nfig.SaveG_JJKLBB_ameData = "";
    NetCo_JJKLBB_nfig.GetU_JJKLBB_ser = "";
    /* 用来对IP地址进行屏蔽的接口地址，可以使用接口的返回值让某些广告逻辑在微信的审核地区(广州)发生变化 */
    NetCo_JJKLBB_nfig.IpBl_JJKLBB_ock = "";
    return NetCo_JJKLBB_nfig;
}());
exports.default = NetCo_JJKLBB_nfig;
},{}],38:[function(require,module,exports){
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
},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("./AppConfig");
var OPP_JJKLBB_OAPI = /** @class */ (function () {
    function OPP_JJKLBB_OAPI() {
    }
    Object.defineProperty(OPP_JJKLBB_OAPI, "BannerIn_JJKLBB_stance", {
        get: function () {
            return OPP_JJKLBB_OAPI._ban_JJKLBB_ner;
        },
        enumerable: true,
        configurable: true
    });
    OPP_JJKLBB_OAPI.Lo_JJKLBB_gin = function (onSuccess, onFail) {
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
    OPP_JJKLBB_OAPI.initAdS_JJKLBB_ervice = function (onSuccess, onFail, onComplete) {
        Laya.Browser.window["qg"].initAdService({
            appId: AppConfig_1.default.Ap_JJKLBB_pID,
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
    OPP_JJKLBB_OAPI.showRe_JJKLBB_wardedV_JJKLBB_ideoAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQGMiniGame) {
            var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: OPP_JJKLBB_OAPI.adU_JJKLBB_nitId,
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
    OPP_JJKLBB_OAPI.navigat_JJKLBB_eToMiniPr_JJKLBB_ogram = function (pkgName, path, onSuccess, onFail, onComplate) {
        if (Laya.Browser.onQGMiniGame) {
            console.log("OPPO 跳转游戏： " + pkgName);
            Laya.Browser.window["qg"].navigateToMiniGame({
                pkgName: pkgName,
                path: path,
                extraData: {
                    from: AppConfig_1.default.Ap_JJKLBB_pID
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
    OPP_JJKLBB_OAPI.showIn_JJKLBB_terstiti_JJKLBB_alAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQGMiniGame) {
            var insertAd = qg.createInsertAd({
                posId: OPP_JJKLBB_OAPI.InsAd_JJKLBB_UnitId
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
    OPP_JJKLBB_OAPI.showBa_JJKLBB_nnaer = function () {
        if (OPP_JJKLBB_OAPI._ban_JJKLBB_ner) {
            OPP_JJKLBB_OAPI._ban_JJKLBB_ner.show();
            return;
        }
        var bannerAd = qg.createBannerAd({
            posId: OPP_JJKLBB_OAPI.banner_JJKLBB_AdUnitId
        });
        bannerAd.show();
        OPP_JJKLBB_OAPI._ban_JJKLBB_ner = bannerAd;
    };
    OPP_JJKLBB_OAPI.hide_JJKLBB_Banner = function () {
        if (OPP_JJKLBB_OAPI._ban_JJKLBB_ner) {
            OPP_JJKLBB_OAPI._ban_JJKLBB_ner.hide();
        }
    };
    OPP_JJKLBB_OAPI.getLaunchOp_JJKLBB_tionsSync = function () {
        return {};
    };
    OPP_JJKLBB_OAPI.share = function (complate, titel, imageUrl) {
        complate(false);
    };
    OPP_JJKLBB_OAPI.createDes_JJKLBB_ktopIcon = function (onSuccess, onFail) {
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
    OPP_JJKLBB_OAPI.adU_JJKLBB_nitId = "134292";
    OPP_JJKLBB_OAPI.banner_JJKLBB_AdUnitId = "134291";
    OPP_JJKLBB_OAPI.InsAd_JJKLBB_UnitId = "134294";
    OPP_JJKLBB_OAPI.OpenScree_JJKLBB_nAdUnitId = "134293";
    OPP_JJKLBB_OAPI._ban_JJKLBB_ner = null;
    return OPP_JJKLBB_OAPI;
}());
exports.default = OPP_JJKLBB_OAPI;
},{"./AppConfig":2}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QQMini_JJKLBB_GameAPI = /** @class */ (function () {
    function QQMini_JJKLBB_GameAPI() {
    }
    QQMini_JJKLBB_GameAPI.Lo_JJKLBB_gin = function (onSuccess, onFail) {
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
    QQMini_JJKLBB_GameAPI.onRewardedV_JJKLBB_ideoAdLoad = function () {
        console.log('激励视频 广告加载完成');
    };
    QQMini_JJKLBB_GameAPI.onRewarded_JJKLBB_VideoAdError = function (err) {
        console.log('激励视频 广告加载失败' + err);
        if (QQMini_JJKLBB_GameAPI._onRewardedVi_JJKLBB_deoAdFailed) {
            QQMini_JJKLBB_GameAPI._onRewardedVi_JJKLBB_deoAdFailed();
        }
    };
    QQMini_JJKLBB_GameAPI.onReward_JJKLBB_edVideoAdClose = function (res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看');
            if (QQMini_JJKLBB_GameAPI._onRewardedVid_JJKLBB_eoAdClose) {
                QQMini_JJKLBB_GameAPI._onRewardedVid_JJKLBB_eoAdClose(true);
            }
        }
        else {
            console.log('激励视频 未完整观看');
            if (QQMini_JJKLBB_GameAPI._onRewardedVid_JJKLBB_eoAdClose) {
                QQMini_JJKLBB_GameAPI._onRewardedVid_JJKLBB_eoAdClose(false);
            }
        }
    };
    QQMini_JJKLBB_GameAPI.regRewarded_JJKLBB_VideoAdEvent = function (rewardedVideoAd) {
        rewardedVideoAd.onLoad(QQMini_JJKLBB_GameAPI.onRewardedV_JJKLBB_ideoAdLoad);
        rewardedVideoAd.onError(QQMini_JJKLBB_GameAPI.onRewarded_JJKLBB_VideoAdError);
        rewardedVideoAd.onClose(QQMini_JJKLBB_GameAPI.onReward_JJKLBB_edVideoAdClose);
        QQMini_JJKLBB_GameAPI._isRegRew_JJKLBB_ardedVideoAdEvent = true;
    };
    QQMini_JJKLBB_GameAPI.show_JJKLBB_Rewarded_JJKLBB_VideoAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQQMiniGame) {
            QQMini_JJKLBB_GameAPI._onRewardedVid_JJKLBB_eoAdClose = onAdClose;
            QQMini_JJKLBB_GameAPI._onRewardedVi_JJKLBB_deoAdFailed = onFailed;
            var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd({
                adUnitId: QQMini_JJKLBB_GameAPI.adUn_JJKLBB_itId,
            });
            if (!QQMini_JJKLBB_GameAPI._isRegRew_JJKLBB_ardedVideoAdEvent) {
                QQMini_JJKLBB_GameAPI.regRewarded_JJKLBB_VideoAdEvent(rewardedVideoAd);
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
    QQMini_JJKLBB_GameAPI.navig_JJKLBB_ateToMiniP_JJKLBB_rogram = function (appId, path, onSuccess, onFail, onComplate) {
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
    QQMini_JJKLBB_GameAPI.shar_JJKLBB_e = function (complate, titel, imageUrl) {
        var _this = this;
        if (Laya.Browser.onQQMiniGame) {
            QQMini_JJKLBB_GameAPI._onS_JJKLBB_how = function () {
                Laya.Browser.window["qq"].offShow(QQMini_JJKLBB_GameAPI._onS_JJKLBB_how);
                QQMini_JJKLBB_GameAPI._onS_JJKLBB_how = null;
                var c = Date.now() - _this._lastS_JJKLBB_hareTime;
                if (complate) {
                    if (Date.now() - _this._lastS_JJKLBB_hareTime > 2000) {
                        complate(true);
                    }
                    else {
                        complate(false);
                    }
                }
            };
            Laya.Browser.window["qq"].onShow(QQMini_JJKLBB_GameAPI._onS_JJKLBB_how);
            QQMini_JJKLBB_GameAPI._lastS_JJKLBB_hareTime = Date.now();
            Laya.Browser.window["qq"].shareAppMessage({
                title: titel,
                imageUrl: imageUrl
            });
        }
    };
    //----------------------------------------------------------------------
    //--------------------插屏幕广告---------------------------------------
    QQMini_JJKLBB_GameAPI.show_JJKLBB_Interst_JJKLBB_itialAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQQMiniGame) {
            var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                adUnitId: QQMini_JJKLBB_GameAPI.InsAd_JJKLBB_UnitId,
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
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/qq.getLaunchOptionsSync.html
     * @static
     * @returns {LaunchOptions}
     * @memberof QQMiniGameAPI
     */
    QQMini_JJKLBB_GameAPI.getLaun_JJKLBB_chOpti_JJKLBB_onsSync = function () {
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
    QQMini_JJKLBB_GameAPI.Set_JJKLBB_Share_JJKLBB_Menu = function (titel, imageUrl, success, fail, complate) {
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
    QQMini_JJKLBB_GameAPI.adUn_JJKLBB_itId = ""; //激励视频Id
    QQMini_JJKLBB_GameAPI.bann_JJKLBB_erAdUnitId = ""; //banner广告Id
    QQMini_JJKLBB_GameAPI.InsAd_JJKLBB_UnitId = ""; //插屏广告Id
    //-------------------------激励视频---------------------------------
    QQMini_JJKLBB_GameAPI._isRegRew_JJKLBB_ardedVideoAdEvent = false;
    QQMini_JJKLBB_GameAPI._onRewardedVi_JJKLBB_deoAdFailed = null;
    QQMini_JJKLBB_GameAPI._onRewardedVid_JJKLBB_eoAdClose = null;
    //----------------------------------------------------------------------
    //---------------------分享----------------------------------------
    QQMini_JJKLBB_GameAPI._onS_JJKLBB_how = null;
    QQMini_JJKLBB_GameAPI._lastS_JJKLBB_hareTime = 0;
    return QQMini_JJKLBB_GameAPI;
}());
exports.default = QQMini_JJKLBB_GameAPI;
},{}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Shar_JJKLBB_eAd = /** @class */ (function () {
    function Shar_JJKLBB_eAd() {
    }
    Shar_JJKLBB_eAd.refres_JJKLBB_hAd = function (complate) {
        // Shar_JJKLBB_eAd.getAdP_JJKLBB_osData((res)=>{
        //     if(1 == res.code)
        //     {
        //         console.log("获取分享广告数据成功");
        //         Shar_JJKLBB_eAd._adPo_JJKLBB_sition = res.result;
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
    Shar_JJKLBB_eAd.get_JJKLBB_ADVs = function (locationid, complate, useRandom, useLocalRandom, sortDatas) {
        // if(!Shar_JJKLBB_eAd.isNeed_JJKLBB_ShowAd())
        // {
        //     complate(null);
        //     return;
        // }
        // useRandom = null == useRandom ? Shar_JJKLBB_eAd.UseRando_JJKLBB_mAdPos : useRandom;
        // useLocalRandom =  null != useLocalRandom ? useLocalRandom : true;
        // if(useRandom)
        // {
        //     locationid = Shar_JJKLBB_eAd.getRand_JJKLBB_omADPosID();
        // }
        // var datas = Shar_JJKLBB_eAd._adv[locationid];
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
        //     Shar_JJKLBB_eAd.getADV_JJKLBB_Data(locationid,(res)=>
        //     {
        //         if(locationid==187){
        //             console.log(1)
        //         }
        //         if(1 == res.code)
        //         {
        //             Shar_JJKLBB_eAd._adv[locationid] = res.result;
        //             datas = Shar_JJKLBB_eAd._adv[locationid];
        //             if(datas && Util_JJKLBB_it.isIp_JJKLBB_hone())
        //             {
        //                 for(var i=0;i< datas.length;++i)
        //                 {
        //                     var data = datas[i];
        //                     for(var j=0;j < Shar_JJKLBB_eAd._iphoneIgn_JJKLBB_oreAppIds.length;++j)
        //                     {
        //                         if(data.appid == Shar_JJKLBB_eAd._iphoneIgn_JJKLBB_oreAppIds[j])
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
    Shar_JJKLBB_eAd.reportUs_JJKLBB_erClick = function (advid) {
        // Shar_JJKLBB_eAd.reqUse_JJKLBB_rClick(advid,(res)=>
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
    Shar_JJKLBB_eAd.getRand_JJKLBB_omADPosID = function () {
        return Shar_JJKLBB_eAd.AdLoc_JJKLBB_ationids[Math.floor(Math.random() * Shar_JJKLBB_eAd.AdLoc_JJKLBB_ationids.length)];
    };
    Shar_JJKLBB_eAd.req_JJKLBB_uest = function (req) {
        // if (req.url.indexOf("https://") > -1 ||
        //     req.url.indexOf("http://") > -1) {
        //     req.url = req.url;
        // } else {
        //     req.url = Shar_JJKLBB_eAd.mai_JJKLBB_nUrl + req.url;
        // }
        // var completeFunc = (res) => {
        //     // console.log(res,"http Success")
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
        // xhr.once(Laya.Event.COMPLETE, Shar_JJKLBB_eAd, completeFunc);
        // xhr.once(Laya.Event.ERROR, Shar_JJKLBB_eAd, errorFunc);
        // if(req.me_JJKLBB_th == "get")
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
        //             "versions", AppC_JJKLBB_onfig.Ver_JJKLBB_sions,
        //         ]
        //     xhr.send(req.url,null,req.me_JJKLBB_th,null,header);
        // }
        // else
        // {
        //     var para = "";
        //     for(const key of Object.keys(req.data)) 
        //     {
        //         var value = req.data[key];
        //         para +=  key + "=" + value + "&";
        //     }
        //     var header =
        //         [
        //             "Content-Type", "application/x-www-form-urlencoded",
        //             "versions", AppC_JJKLBB_onfig.Ver_JJKLBB_sions,
        //         ]
        //     xhr.send(req.url,para,req.me_JJKLBB_th,null,header);
        // }
    };
    Shar_JJKLBB_eAd.getAdP_JJKLBB_osData = function (onSuccess, onFail) {
        // var req = new reques_JJKLBB_tData();
        // req.url = Shar_JJKLBB_eAd.getAdP_JJKLBB_ostion;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = AppC_JJKLBB_onfig.Ap_JJKLBB_pID;
        // req.me_JJKLBB_th = "get";
        // Shar_JJKLBB_eAd.req_JJKLBB_uest(req);
    };
    Shar_JJKLBB_eAd.reqUse_JJKLBB_rClick = function (advid, onSuccess, onFail) {
        // var req = new reques_JJKLBB_tData();
        // req.url = Shar_JJKLBB_eAd.userC_JJKLBB_lick;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = AppC_JJKLBB_onfig.Ap_JJKLBB_pID;
        // req.data.uid  = Us_JJKLBB_er.open_JJKLBB_Id;
        // req.data.advid  = advid ;
        // Shar_JJKLBB_eAd.req_JJKLBB_uest(req);
    };
    Shar_JJKLBB_eAd.getADV_JJKLBB_Data = function (locationid, onSuccess, onFail) {
        // var req = new reques_JJKLBB_tData();
        // req.url = Shar_JJKLBB_eAd.getA_JJKLBB_dv;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = AppC_JJKLBB_onfig.Ap_JJKLBB_pID;
        // req.data.locationid = locationid;
        // req.data.preview = 0;
        // Shar_JJKLBB_eAd.req_JJKLBB_uest(req);
    };
    /**
         * 随机跳转的方法，会从广告列表中随机得到一个AppId并且跳转,输入的参数为概率，大小在0-1之间
         * 如果概率大于1，则自动将其除以100，所以千万注意！
         *
         * @static
         * @param {number} [rate=1]
         * @memberof ShareAd
         */
    Shar_JJKLBB_eAd.Rando_JJKLBB_mJump = function (rate) {
        if (rate === void 0) { rate = 1; }
        // console.log("随机跳转,rate：" + rate);
        // if (rate > 1) {
        //     rate = rate / 100;
        // }
        // let rd = Math.random();
        // if (rd <= rate) {
        //     var adLocationID = Shar_JJKLBB_eAd.LoopAd_JJKLBB_LocationID;
        //     var Locations = 
        //     [
        //         Shar_JJKLBB_eAd.LoopAd_JJKLBB_LocationID, 
        //         Shar_JJKLBB_eAd.Insert_JJKLBB_AdLocationID, 
        //         Shar_JJKLBB_eAd.BannerAdL_JJKLBB_ocationID,
        //         Shar_JJKLBB_eAd.AniAdLoca_JJKLBB_tionID,
        //     ]
        //     if(Shar_JJKLBB_eAd.UseRando_JJKLBB_mAdPos)
        //     {
        //         for(var i=0;i < Shar_JJKLBB_eAd.AdLoc_JJKLBB_ationids.length;++i)
        //         {
        //             Locations.push(Shar_JJKLBB_eAd.AdLoc_JJKLBB_ationids[i]);
        //         }
        //     }
        //     adLocationID = Locations[Math.floor(Math.random() * Locations.length)]
        //     var datas = Shar_JJKLBB_eAd.get_JJKLBB_ADVs(adLocationID, function (datas: Array<any>) {
        //         if (datas) {
        //             let rd = Math.floor(datas.length * Math.random());
        //             let data = datas[rd];
        //             console.log("跳转游戏： " + data.title);
        //             WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
        //                 console.log("跳转成功")
        //                 Shar_JJKLBB_eAd.reportUs_JJKLBB_erClick(data.appid);
        //                 A_JJKLBB_LD.aldSendReportA_JJKLBB_dClickSuccess(data);
        //             }, (res) => {
        //                 console.log("跳转失败")
        //                 Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
        //                 if (res.errMsg == "navigateToMiniProgram:fail cancel") {
        //                     console.log("用户取消跳转");
        //                     A_JJKLBB_LD.aldSendRepo_JJKLBB_rtAdClickFail(data);
        //                 }
        //             }, (res) => {
        //                 console.log("跳转完成")
        //             });
        //         }
        //     }, true);
        // }
    };
    Shar_JJKLBB_eAd.isNeed_JJKLBB_ShowAd = function () {
        // var adSwitch = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().adS_JJKLBB_witch;
        // if(adSwitch == 0) return false;
        // var mailiang = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().maili_JJKLBB_ang;
        // var mailianglist = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().mailia_JJKLBB_nglist;
        // var mailiangscenelist = AppSwitch_JJKLBB_Config.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().mailiangSceneList;
        // if(1 == mailiang)
        // {
        //     if(Laya.Browser.onMiniGame)
        //     {
        //         var flag : number = WXAPI.getLaunchOptionsSync().query['chid'];
        //         if(null != flag && null != mailianglist && mailianglist.length > 0)
        //         {
        //             for(var i=0;i < mailianglist.length;++i)
        //             {
        //                 if(flag == mailianglist[i])
        //                 {
        //                     return false;
        //                 }
        //             }
        //         }
        //         var scene : number = WXAPI.getLaunchOptionsSync().scene
        //         if(null != scene && null != mailiangscenelist && mailiangscenelist.length > 0)
        //         {
        //             for(var i=0;i < mailiangscenelist.length;++i)
        //             {
        //                 if(scene == mailiangscenelist[i])
        //                 {
        //                     return false;
        //                 }
        //             }
        //         }                
        //     }
        //     else if(Laya.Browser.onQGMiniGame)
        //     {
        //         return false;
        //     }
        //     else if(Laya.Browser.onQQBrowser)
        //     {
        //         return false;
        //     }
        // }
        return true;
    };
    Shar_JJKLBB_eAd.sortDatas = function (datas) {
        // var dataDic: { [appid: string]: any[] } = {};
        // var dataArray: any[] = new Array();
        // for (var i = 0; i < datas.length; ++i)  {
        //     var data = datas[i];
        //     if (dataDic[data.appid] == null) {
        //         dataDic[data.appid] = new Array();
        //         dataDic[data.appid].push(data);
        //         dataArray.push(dataDic[data.appid]);
        //     } else {
        //         dataDic[data.appid].push(data);
        //     }
        // }
        // //从大到小排序
        // for (let i = 0; i < dataArray.length; i++) {
        //     for (let j = i + 1; j < dataArray.length; j++) {
        //         if (dataArray[i].length < dataArray[j].length) {
        //             let d = dataArray[j];
        //             dataArray[j] = dataArray[i];
        //             dataArray[i] = d;
        //         }
        //     }
        // }
        // //重新分组
        // var groupArray: any[] = new Array();
        // for (let i = 0; i < dataArray[0].length; i++) {
        //     groupArray[i] = new Array();
        //     for (let j = 0; j < dataArray.length; j++) {
        //         if (dataArray[j].length > i) {
        //             groupArray[i].push(dataArray[j][i]);
        //         }
        //     }
        //     // //组内打乱            
        //     // groupArray[i].sort(() => { return 0.5 - Math.random() })
        // }
        // //打乱分组
        // // groupArray.sort(() => { return 0.5 - Math.random() });
        // var res: any[] = new Array();
        // for (let i = 0; i < groupArray.length; i++) {
        //     for (let j = 0; j < groupArray[i].length; j++) {
        //         res.push(groupArray[i][j])
        //     }
        // }
        // return res;
    };
    Shar_JJKLBB_eAd.mai_JJKLBB_nUrl = "";
    Shar_JJKLBB_eAd.getAdP_JJKLBB_ostion = ""; //获取广告位列表
    Shar_JJKLBB_eAd.getA_JJKLBB_dv = ""; //获取第三方广告列表
    Shar_JJKLBB_eAd.userC_JJKLBB_lick = ""; //用户点击上报
    Shar_JJKLBB_eAd.LoopAd_JJKLBB_LocationID = 184;
    Shar_JJKLBB_eAd.BannerAdL_JJKLBB_ocationID = 186;
    Shar_JJKLBB_eAd.Insert_JJKLBB_AdLocationID = 185;
    Shar_JJKLBB_eAd.AniAdLoca_JJKLBB_tionID = 187;
    Shar_JJKLBB_eAd.UseRando_JJKLBB_mAdPos = false;
    Shar_JJKLBB_eAd.AdLoc_JJKLBB_ationids = [];
    Shar_JJKLBB_eAd._adPo_JJKLBB_sition = {};
    Shar_JJKLBB_eAd._adv = {};
    Shar_JJKLBB_eAd._iphoneIgn_JJKLBB_oreAppIds = [
        ""
    ];
    return Shar_JJKLBB_eAd;
}());
exports.default = Shar_JJKLBB_eAd;
},{}],42:[function(require,module,exports){
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
var Banne_JJKLBB_rAdView = /** @class */ (function (_super) {
    __extends(Banne_JJKLBB_rAdView, _super);
    function Banne_JJKLBB_rAdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.AdPo_JJKLBB_sID = ShareAd_1.default.BannerAdL_JJKLBB_ocationID;
        _this._dat_JJKLBB_a = null;
        _this._wxBan_JJKLBB_ner = null;
        return _this;
    }
    Banne_JJKLBB_rAdView.prototype.onAwake = function () {
        this._disp_JJKLBB_laySp = this.owner.getChildByName("Display");
        if (null == this._disp_JJKLBB_laySp) {
            this._disp_JJKLBB_laySp = this.owner;
        }
    };
    Banne_JJKLBB_rAdView.prototype.onEnable = function () {
        this._disp_JJKLBB_laySp.on(Laya.Event.CLICK, this, this.onSpC_JJKLBB_lick);
        var banner = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().ban_JJKLBB_ner;
        if (0 == banner) {
            this.refreshB_JJKLBB_annerDis();
        }
        else if (1 == banner) {
            this.refresh_JJKLBB_WXBann_JJKLBB_er();
        }
    };
    Banne_JJKLBB_rAdView.prototype.onDisable = function () {
        this._disp_JJKLBB_laySp.off(Laya.Event.CLICK, this, this.onSpC_JJKLBB_lick);
        this.clear_JJKLBB_WXBaner();
    };
    Banne_JJKLBB_rAdView.prototype.refreshB_JJKLBB_annerDis = function () {
        var self = this;
        ShareAd_1.default.get_JJKLBB_ADVs(this.AdPo_JJKLBB_sID, function (datas) {
            if (datas && datas.length > 0) {
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._disp_JJKLBB_laySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self._disp_JJKLBB_laySp.destroyed) {
                        self._disp_JJKLBB_laySp.width = 750;
                        self._disp_JJKLBB_laySp.height = 256;
                    }
                }));
                self._dat_JJKLBB_a = data;
            }
        }, false);
    };
    Banne_JJKLBB_rAdView.prototype.onSpC_JJKLBB_lick = function () {
        var data = this._dat_JJKLBB_a;
        if (data) {
            console.log("跳转游戏： " + data.title);
            if (Laya.Browser.onMiniGame) {
                WXAPI_1.default.navigateToMiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUs_JJKLBB_erClick(data.appid);
                    ALD_1.default.aldSendReportA_JJKLBB_dClickSuccess(data);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
                    if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                        console.log("用户取消跳转");
                        ALD_1.default.aldSendRepo_JJKLBB_rtAdClickFail(data);
                    }
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQGMiniGame) {
                OPPOAPI_1.default.navigat_JJKLBB_eToMiniPr_JJKLBB_ogram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUs_JJKLBB_erClick(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
             {
                QQMiniGameAPI_1.default.navig_JJKLBB_ateToMiniP_JJKLBB_rogram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUs_JJKLBB_erClick(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
        }
    };
    Banne_JJKLBB_rAdView.prototype.refresh_JJKLBB_WXBann_JJKLBB_er = function () {
        if (!Laya.Browser.onMiniGame)
            return;
        this.clear_JJKLBB_WXBaner();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._disp_JJKLBB_laySp.localToGlobal(new Laya.Point(0, 0));
        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WXBanne_JJKLBB_rWidth ? this.WXBanne_JJKLBB_rWidth / Laya.stage.width * sw : sw;
        this._wxBan_JJKLBB_ner = Laya.Browser.window["wx"].createBannerAd({
            adUnitId: WXAPI_1.default.bannerAdUnitId,
            adIntervals: 30,
            style: {
                left: left,
                top: top,
                width: width,
            }
        });
        self._wxBan_JJKLBB_ner.onLoad(function (res) {
            console.log("WXBanner广告 加载完成");
            console.log(res);
        });
        this._wxBan_JJKLBB_ner.onError(function (err) {
            console.log("WXBanner广告 加载失败");
            console.log(err);
            self.refreshB_JJKLBB_annerDis();
            self.clear_JJKLBB_WXBaner();
        });
        this._wxBan_JJKLBB_ner.onResize(function (res) {
            console.log(self._wxBan_JJKLBB_ner.style.realWidth, self._wxBan_JJKLBB_ner.style.realHeight);
        });
        self._wxBan_JJKLBB_ner.show();
    };
    Banne_JJKLBB_rAdView.prototype.clear_JJKLBB_WXBaner = function () {
        if (this._wxBan_JJKLBB_ner) {
            this._wxBan_JJKLBB_ner.destroy();
        }
        this._wxBan_JJKLBB_ner = null;
    };
    return Banne_JJKLBB_rAdView;
}(Laya.Script));
exports.default = Banne_JJKLBB_rAdView;
},{"../../ALD":1,"../../Config/AppSwitchConfig":4,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../OPPOAPI":39,"../../QQMiniGameAPI":40,"../../WXAPI":70,"../ShareAd":41}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShareAd_1 = require("../ShareAd");
var LoopAdBox_1 = require("./LoopAdBox");
var ExLoopAdView = /** @class */ (function (_super) {
    __extends(ExLoopAdView, _super);
    function ExLoopAdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name:LoopDirection,tips:"轮播广告方向",default:"Vertical",type:Option,option:"Vertical,Horizontal"}*/
        // 返回字符串
        _this.LoopDirection = "Vertical";
        /** @prop {name:AdPosID,tips:"广告Id",default:"InsertAdLocationID",type:Int} */
        _this.AdPosID = ShareAd_1.default.Insert_JJKLBB_AdLocationID;
        _this._scrollForward = true;
        return _this;
    }
    ExLoopAdView.prototype.onAwake = function () {
        this._list = this.owner.getChildByName("List");
        this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._ownerSp = this.owner;
        if (this.LoopDirection == "Horizontal") {
            this._list.hScrollBarSkin = "";
        }
        else {
            this._list.vScrollBarSkin = "";
        }
    };
    ExLoopAdView.prototype.onEnable = function () {
        var _this = this;
        var self = this;
        ShareAd_1.default.get_JJKLBB_ADVs(this.AdPosID, function (datas) {
            if (self.owner && !self.owner.destroyed) {
                if (datas) {
                    _this._list.array = datas;
                }
                else {
                    _this._ownerSp.visible = false;
                }
            }
        }, false, true, this.sortDatas);
    };
    ExLoopAdView.prototype.onDisable = function () {
    };
    ExLoopAdView.prototype.onUpdate = function () {
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
    ExLoopAdView.prototype.sortDatas = function (datas) {
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
                            ignores.push(null == res[i + 2] ? null : res[i + 1].appid);
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
    ExLoopAdView.prototype.onListRender = function (cell, index) {
        var data = this._list.array[index];
        var loopAdBox = cell.getComponent(LoopAdBox_1.default);
        loopAdBox.setData(data);
    };
    return ExLoopAdView;
}(Laya.Script));
exports.default = ExLoopAdView;
},{"../ShareAd":41,"./LoopAdBox":45}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShareAd_1 = require("../ShareAd");
var LoopAdBox_1 = require("./LoopAdBox");
var Horizon_JJKLBB_talLoopAdView_JJKLBB_ = /** @class */ (function (_super) {
    __extends(Horizon_JJKLBB_talLoopAdView_JJKLBB_, _super);
    function Horizon_JJKLBB_talLoopAdView_JJKLBB_() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.AdPos_JJKLBB_ID = ShareAd_1.default.LoopAd_JJKLBB_LocationID;
        _this._scrollFo_JJKLBB_rward = true;
        return _this;
    }
    Horizon_JJKLBB_talLoopAdView_JJKLBB_.prototype.onAwake = function () {
        this._li_JJKLBB_st = this.owner.getChildByName("List");
        this._li_JJKLBB_st.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._li_JJKLBB_st.hScrollBarSkin = "";
    };
    Horizon_JJKLBB_talLoopAdView_JJKLBB_.prototype.onEnable = function () {
        var _this = this;
        var self = this;
        ShareAd_1.default.get_JJKLBB_ADVs(this.AdPos_JJKLBB_ID, function (datas) {
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
                    _this._li_JJKLBB_st.array = temp;
                }
                else if (datas && datas.length > 50) {
                    _this._li_JJKLBB_st.array = datas;
                }
                else {
                    _this._li_JJKLBB_st.array = datas;
                    _this.owner.visible = false;
                }
            }
        });
    };
    Horizon_JJKLBB_talLoopAdView_JJKLBB_.prototype.onDisable = function () {
    };
    Horizon_JJKLBB_talLoopAdView_JJKLBB_.prototype.onUpdate = function () {
        if (this._scrollFo_JJKLBB_rward) {
            this._li_JJKLBB_st.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this._li_JJKLBB_st.scrollBar.value >= this._li_JJKLBB_st.scrollBar.max) {
                this._scrollFo_JJKLBB_rward = false;
            }
        }
        else {
            this._li_JJKLBB_st.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this._li_JJKLBB_st.scrollBar.value <= 0) {
                this._scrollFo_JJKLBB_rward = true;
            }
        }
    };
    Horizon_JJKLBB_talLoopAdView_JJKLBB_.prototype.onListRender = function (cell, index) {
        var data = this._li_JJKLBB_st.array[index];
        var loopAdBox = cell.getComponent(LoopAdBox_1.default);
        loopAdBox.setData(data);
    };
    return Horizon_JJKLBB_talLoopAdView_JJKLBB_;
}(Laya.Script));
exports.default = Horizon_JJKLBB_talLoopAdView_JJKLBB_;
},{"../ShareAd":41,"./LoopAdBox":45}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WXAPI_1 = require("../../WXAPI");
var ShareAd_1 = require("../ShareAd");
var ALD_1 = require("../../ALD");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var OPPOAPI_1 = require("../../OPPOAPI");
var QQMiniGameAPI_1 = require("../../QQMiniGameAPI");
var LoopA_JJKLBB_dBox = /** @class */ (function (_super) {
    __extends(LoopA_JJKLBB_dBox, _super);
    function LoopA_JJKLBB_dBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = null;
        _this._originW = 150;
        _this._originH = 150;
        _this._fontSize = 25;
        return _this;
    }
    LoopA_JJKLBB_dBox.prototype.onAwake = function () {
        this._displaySp = this.owner.getChildByName("Display");
        this._originW = this._displaySp.width;
        this._originH = this._displaySp.height;
        this._disText = this.owner.getChildByName("TitelText");
        this._disText.text = "";
        this._fontSize = this._disText.fontSize;
    };
    LoopA_JJKLBB_dBox.prototype.onEnable = function () {
        this._displaySp.on(Laya.Event.CLICK, this, this.onSpC_JJKLBB_lick);
    };
    LoopA_JJKLBB_dBox.prototype.onDisable = function () {
        this._displaySp.off(Laya.Event.CLICK, this, this.onSpC_JJKLBB_lick);
    };
    LoopA_JJKLBB_dBox.prototype.setData = function (data) {
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
            // this._disText.fontSize = fontSize;
            this._disText.text = str;
            this._data = data;
        }
    };
    LoopA_JJKLBB_dBox.prototype.onSpC_JJKLBB_lick = function () {
        var data = this._data;
        if (data) {
            console.log("跳转游戏： " + data.title);
            if (Laya.Browser.onMiniGame) {
                WXAPI_1.default.navigateToMiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUs_JJKLBB_erClick(data.appid);
                    ALD_1.default.aldSendReportA_JJKLBB_dClickSuccess(data);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
                    if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                        console.log("用户取消跳转");
                        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.AD_OnShareAdFail_UseCancel);
                        ALD_1.default.aldSendRepo_JJKLBB_rtAdClickFail(data);
                    }
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQGMiniGame) {
                OPPOAPI_1.default.navigat_JJKLBB_eToMiniPr_JJKLBB_ogram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUs_JJKLBB_erClick(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
             {
                QQMiniGameAPI_1.default.navig_JJKLBB_ateToMiniP_JJKLBB_rogram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.reportUs_JJKLBB_erClick(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.AD_OnShare_JJKLBB_AdFail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
        }
    };
    return LoopA_JJKLBB_dBox;
}(Laya.Script));
exports.default = LoopA_JJKLBB_dBox;
},{"../../ALD":1,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../OPPOAPI":39,"../../QQMiniGameAPI":40,"../../WXAPI":70,"../ShareAd":41}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var GameCommonConfig_1 = require("../Config/GameCommonConfig");
//游戏数据,为保持版本兼容，建议不要删除和修改字段名
var UserG_JJKLBB_ameData = /** @class */ (function () {
    function UserG_JJKLBB_ameData() {
        this.levelNum = 1; //当前关卡
        this.moneyNum = 0; //金币数量
        this.crystalNum = 0; //钻石数量
        this.energyNum = 0; //体力数量
        this.actorSkins = [1]; //已解锁的皮肤
        this.curActorSkin = 1; //当前皮肤
        this.lastSignInTime = 0; //上次签到时间
    }
    return UserG_JJKLBB_ameData;
}());
exports.UserG_JJKLBB_ameData = UserG_JJKLBB_ameData;
var Us_JJKLBB_er = /** @class */ (function (_super) {
    __extends(Us_JJKLBB_er, _super);
    function Us_JJKLBB_er() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Us_JJKLBB_er.getS_JJKLBB_aveData = function () {
        return JSON.stringify(Us_JJKLBB_er._gameData);
    };
    Us_JJKLBB_er.testIn_JJKLBB_itUser = function () {
        var storageStr = localStorage.getItem("Game_Data");
        console.log("读取存储数据 str----" + storageStr);
        var data = JSON.parse(storageStr);
        if (data == null) {
            Us_JJKLBB_er._gameData.levelNum = 1;
            Us_JJKLBB_er._gameData.moneyNum = 0;
            Us_JJKLBB_er._gameData.crystalNum = 0;
            Us_JJKLBB_er._gameData.energyNum = 80;
            return;
        }
        Us_JJKLBB_er._gameData.levelNum = data.levelNum;
        Us_JJKLBB_er._gameData.moneyNum = data.moneyNum;
        Us_JJKLBB_er._gameData.crystalNum = data.crystalNum;
        Us_JJKLBB_er._gameData.energyNum = data.energyNum;
        var actorSkins = data.actorSkins;
        if (null != actorSkins) {
            for (var i = 0; i < actorSkins.length; ++i) {
                if (1 != actorSkins[i]) {
                    Us_JJKLBB_er._gameData.actorSkins.push(actorSkins[i]);
                }
            }
        }
        Us_JJKLBB_er._gameData.curActorSkin = data.curActorSkin || 1;
        if (null == data.lastSignInTime) {
            Us_JJKLBB_er._gameData.energyNum = 80;
            console.log("初始化 恢复体力----------");
        }
        else {
            if (Us_JJKLBB_er.canSignIn(data.lastSignInTime)) {
                console.log("恢复体力----------");
                Us_JJKLBB_er._gameData.energyNum = GameCommonConfig_1.default.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().dailyEnergy;
            }
        }
        Us_JJKLBB_er._gameData.lastSignInTime = Date.now();
    };
    Us_JJKLBB_er.initi_JJKLBB_User = function (data) {
        if (data && data.cddata && 0 != data.cddata) {
            Us_JJKLBB_er._gameData.levelNum = data.cddata.levelNum;
            Us_JJKLBB_er._gameData.moneyNum = data.cddata.moneyNum;
            Us_JJKLBB_er._gameData.crystalNum = data.cddata.crystalNum;
            Us_JJKLBB_er._gameData.energyNum = data.cddata.energyNum;
            var actorSkins = data.cddata.actorSkins;
            if (null != actorSkins) {
                for (var i = 0; i < actorSkins.length; ++i) {
                    if (1 != actorSkins[i]) {
                        Us_JJKLBB_er._gameData.actorSkins.push(actorSkins[i]);
                    }
                }
            }
            Us_JJKLBB_er._gameData.curActorSkin = data.cddata.curActorSkin;
            Us_JJKLBB_er._gameData.lastSignInTime = data.cddata.lastSignInTime;
            if (0 == data.is_day) {
                Us_JJKLBB_er._gameData.energyNum = GameCommonConfig_1.default.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().dailyEnergy;
            }
        }
        else if (null != data) {
            if (0 == data.is_day) {
                Us_JJKLBB_er._gameData.energyNum = GameCommonConfig_1.default.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().dailyEnergy;
            }
        }
        else {
            Us_JJKLBB_er._gameData.energyNum = 100;
        }
    };
    Us_JJKLBB_er.unLockMax_JJKLBB_LevelNum = function (levelNum) {
        if (Us_JJKLBB_er._gameData.levelNum < levelNum) {
            Us_JJKLBB_er._gameData.levelNum = levelNum;
        }
    };
    Us_JJKLBB_er.setLev_JJKLBB_eNum = function (levelNum) {
        Us_JJKLBB_er._gameData.levelNum = levelNum;
    };
    Us_JJKLBB_er.getLev_JJKLBB_eNum = function () {
        return Us_JJKLBB_er._gameData.levelNum;
    };
    Us_JJKLBB_er.addMo_JJKLBB_ney = function (add) {
        add = Math.ceil(add);
        var last = Us_JJKLBB_er._gameData.moneyNum;
        Us_JJKLBB_er._gameData.moneyNum += add;
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_OnUser_JJKLBB_MoneyChange, {
            curr: Us_JJKLBB_er._gameData.moneyNum,
            last: last
        });
    };
    Us_JJKLBB_er.subM_JJKLBB_oney = function (sub) {
        sub = Math.ceil(sub);
        var last = Us_JJKLBB_er._gameData.moneyNum;
        Us_JJKLBB_er._gameData.moneyNum -= sub;
        if (Us_JJKLBB_er._gameData.moneyNum < 0) {
            Us_JJKLBB_er._gameData.moneyNum = 0;
        }
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_OnUser_JJKLBB_MoneyChange, {
            curr: Us_JJKLBB_er._gameData.moneyNum,
            last: last
        });
    };
    Us_JJKLBB_er.get_JJKLBB_Money = function () {
        return Us_JJKLBB_er._gameData.moneyNum;
    };
    Us_JJKLBB_er.addCrys_JJKLBB_tal = function (add) {
        add = Math.ceil(add);
        var last = Us_JJKLBB_er._gameData.crystalNum;
        Us_JJKLBB_er._gameData.crystalNum += add;
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, {
            curr: Us_JJKLBB_er._gameData.crystalNum,
            last: last
        });
    };
    Us_JJKLBB_er.subC_JJKLBB_rystal = function (sub) {
        sub = Math.ceil(sub);
        var last = Us_JJKLBB_er._gameData.crystalNum;
        Us_JJKLBB_er._gameData.crystalNum -= sub;
        if (Us_JJKLBB_er._gameData.crystalNum < 0) {
            Us_JJKLBB_er._gameData.crystalNum = 0;
        }
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, {
            curr: Us_JJKLBB_er._gameData.crystalNum,
            last: last
        });
    };
    Us_JJKLBB_er.getCr_JJKLBB_ystal = function () {
        return Us_JJKLBB_er._gameData.crystalNum;
    };
    Us_JJKLBB_er.addEne_JJKLBB_rgy = function (add) {
        add = Math.ceil(add);
        var last = Us_JJKLBB_er._gameData.energyNum;
        Us_JJKLBB_er._gameData.energyNum += add;
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, {
            curr: Us_JJKLBB_er._gameData.energyNum,
            last: last
        });
    };
    Us_JJKLBB_er.subE_JJKLBB_nergy = function (sub) {
        sub = Math.ceil(sub);
        var last = Us_JJKLBB_er._gameData.energyNum;
        Us_JJKLBB_er._gameData.energyNum -= sub;
        if (Us_JJKLBB_er._gameData.energyNum < 0) {
            Us_JJKLBB_er._gameData.energyNum = 0;
        }
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, {
            curr: Us_JJKLBB_er._gameData.energyNum,
            last: last
        });
    };
    Us_JJKLBB_er.getEn_JJKLBB_ergy = function () {
        return Us_JJKLBB_er._gameData.energyNum;
    };
    Us_JJKLBB_er.setCurA_JJKLBB_ctorSkin = function (skin) {
        if (!Us_JJKLBB_er.actorSkin_JJKLBB_IsUnlock(skin))
            return;
        var last = Us_JJKLBB_er._gameData.curActorSkin;
        Us_JJKLBB_er._gameData.curActorSkin = skin;
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_OnUser_JJKLBB_ActorSkin_JJKLBB_Change, {
            curSkin: skin,
            lastSkin: last
        });
    };
    Us_JJKLBB_er.getCurA_JJKLBB_ctorSkin = function () {
        return Us_JJKLBB_er._gameData.curActorSkin;
    };
    Us_JJKLBB_er.unlock_JJKLBB_ActorSkin = function (skin) {
        if (Us_JJKLBB_er.actorSkin_JJKLBB_IsUnlock(skin))
            return false;
        Us_JJKLBB_er._gameData.actorSkins.push(skin);
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_OnUser_JJKLBB_UnlockActor_JJKLBB_Skin, { skin: skin });
        return true;
    };
    Us_JJKLBB_er.actorSkin_JJKLBB_IsUnlock = function (skin) {
        for (var i = 0; i < Us_JJKLBB_er._gameData.actorSkins.length; ++i) {
            if (skin == Us_JJKLBB_er._gameData.actorSkins[i])
                return true;
        }
        return false;
    };
    Us_JJKLBB_er.getAct_JJKLBB_orSkins = function () {
        var arry = new Array();
        for (var i = 0; i < Us_JJKLBB_er._gameData.actorSkins.length; ++i) {
            arry.push(Us_JJKLBB_er._gameData.actorSkins[i]);
        }
        return arry;
    };
    Us_JJKLBB_er.setlast_JJKLBB_SignInTime = function (time) {
        Us_JJKLBB_er._gameData.lastSignInTime = time;
    };
    Us_JJKLBB_er.getlast_JJKLBB_SignInTime = function () {
        return Us_JJKLBB_er._gameData.lastSignInTime;
    };
    Us_JJKLBB_er.canSignIn = function (lastTime) {
        var lastDate = new Date(lastTime);
        var curDate = new Date(Date.now());
        // if(Date.now() - Us_JJKLBB_er.getlast_JJKLBB_SignInTime() >= 86400000 || lastDate.getUTCDay() != curDate.getUTCDay())
        // {
        //     return true;
        // }
        // return false;
        console.log("lastTime = " + lastTime + " curTime = " + Date.now());
        console.log("lastDate = " + lastDate + " curDate = " + curDate);
        console.log("上次签到日期：" + lastDate.getDay() + "这次签到日期：" + curDate.getDay());
        return lastDate.getDay() != curDate.getDay();
    };
    Us_JJKLBB_er.co_JJKLBB_de = "";
    Us_JJKLBB_er.open_JJKLBB_Id = "";
    Us_JJKLBB_er.tok_JJKLBB_en = null;
    Us_JJKLBB_er.nic_JJKLBB_kName = "";
    Us_JJKLBB_er.gen_JJKLBB_der = 0;
    Us_JJKLBB_er.is_JJKLBB_Login = false;
    Us_JJKLBB_er._gameData = new UserG_JJKLBB_ameData();
    return Us_JJKLBB_er;
}(Laya.Script));
exports.default = Us_JJKLBB_er;
},{"../Config/GameCommonConfig":5,"../Event/EventDef":9,"../Event/EventMgr":10}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_JJKLBB_it = /** @class */ (function () {
    function Util_JJKLBB_it() {
    }
    Util_JJKLBB_it.Le_JJKLBB_rp = function (form, to, delta) {
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
    Util_JJKLBB_it.lerpEu_JJKLBB_lerAngle = function (form, to, delta) {
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
        var next = Util_JJKLBB_it.Le_JJKLBB_rp(form, to, delta);
        return next;
    };
    Util_JJKLBB_it.getRo_JJKLBB_tatio_JJKLBB_nByDir = function (v) {
        var dotValue = (v.x * Util_JJKLBB_it.poi_JJKLBB_nDown.x) + (v.y * Util_JJKLBB_it.poi_JJKLBB_nDown.y);
        var cos = dotValue / (v.distance(0, 0) * Util_JJKLBB_it.poi_JJKLBB_nDown.distance(0, 0));
        var radian = Math.acos(cos);
        var rotation = radian / (2 * Math.PI) * 360;
        if (v.x < 0) {
            rotation = -rotation;
        }
        return rotation;
    };
    Util_JJKLBB_it.getR_JJKLBB_otationByDi_JJKLBB_rOn3DSpace = function (v) {
        var dotValue = (v.x * Util_JJKLBB_it.poi_JJKLBB_nUp.x) + (v.y * Util_JJKLBB_it.poi_JJKLBB_nUp.y);
        var cos = dotValue / (v.distance(0, 0) * Util_JJKLBB_it.poi_JJKLBB_nUp.distance(0, 0));
        var radian = Math.acos(cos);
        var rotation = radian / (2 * Math.PI) * 360;
        if (v.x < 0) {
            rotation = rotation + (180 - rotation) * 2;
        }
        return rotation;
    };
    Util_JJKLBB_it.getD_JJKLBB_irByRotat_JJKLBB_ion = function (rotation) {
        var radian = (rotation - 90) * Math.PI / 180; // -90 是转换到场景坐标系
        var x = Math.cos(radian);
        var y = Math.sin(radian);
        var point = new Laya.Point(x, y);
        point.normalize();
        return point;
    };
    Util_JJKLBB_it.getD_JJKLBB_irDirAn_JJKLBB_gle = function (dir1, dir2) {
        var dotValue = (dir1.x * dir2.x) + (dir1.y * dir2.y);
        var cos = dotValue / (dir1.distance(0, 0) * dir2.distance(0, 0));
        var radian = Math.acos(cos);
        var angle = radian / (2 * Math.PI) * 360;
        return angle;
    };
    Util_JJKLBB_it.get_JJKLBB_DirSca_JJKLBB_larLength = function (dir) {
        var sl = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        return sl;
    };
    Util_JJKLBB_it.setSp_JJKLBB_OnPare_JJKLBB_ntCenter = function (sp) {
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
    Util_JJKLBB_it.getP_JJKLBB_ointToLineDi_JJKLBB_stance = function (x, y, LineStart, LineEnd) {
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
    Util_JJKLBB_it.isIp_JJKLBB_honeX = function () {
        if (!Laya.Browser.onIPhone)
            return false;
        var rate = 828 / 1792;
        if ((Laya.Browser.width / Laya.Browser.height <= rate) || (Laya.Browser.height / Laya.Browser.width <= rate)) {
            return true;
        }
        // if((Laya.Browser.width == 2436 && Laya.Browser.height == 1125) 
        //     || (Laya.Browser.height == 2436 && Laya.Browser.width == 1125))
        // {
        //     return true
        // }
        return false;
    };
    Util_JJKLBB_it.isIp_JJKLBB_hone = function () {
        return Laya.Browser.onIPhone;
    };
    Util_JJKLBB_it.getC_JJKLBB_hild = function (node, name) {
        for (var i = 0; i < node.numChildren; ++i) {
            var child = node.getChildAt(i);
            if (child.name == name) {
                return child;
            }
            else {
                var target = Util_JJKLBB_it.getC_JJKLBB_hild(child, name);
                if (target)
                    return target;
            }
        }
        return null;
    };
    Util_JJKLBB_it.OriginSt_JJKLBB_ageWidth = 1334;
    Util_JJKLBB_it.OriginSt_JJKLBB_ageHeight = 750;
    Util_JJKLBB_it.graysc_JJKLBB_aleMat = [0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0, 0, 0, 1, 0];
    Util_JJKLBB_it.graysc_JJKLBB_aleFilter = new Laya.ColorFilter(Util_JJKLBB_it.graysc_JJKLBB_aleMat);
    Util_JJKLBB_it.poi_JJKLBB_nDown = new Laya.Point(0, -1);
    Util_JJKLBB_it.poi_JJKLBB_nUp = new Laya.Point(0, 1);
    return Util_JJKLBB_it;
}());
exports.default = Util_JJKLBB_it;
},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../../User/User");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var NativeCallback_1 = require("../../NativeCallback");
var EventDef_1 = require("../../Event/EventDef");
var EventMgr_1 = require("../../Event/EventMgr");
var ActorSkinBox = /** @class */ (function (_super) {
    __extends(ActorSkinBox, _super);
    function ActorSkinBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = null;
        return _this;
    }
    ActorSkinBox.prototype.onAwake = function () {
        this._selectBg = this.owner.getChildByName("Select");
        this._unlockBg = this.owner.getChildByName("Unlock");
        this._luckBg = this.owner.getChildByName("Lock");
        this._showSkin = this.owner.getChildByName("ShowSkin");
        this._crystalUnlockBtn = this.owner.getChildByName("CrystalUnlockBtn");
        this._crystalCostText = this._crystalUnlockBtn.getChildByName("Text");
        this._vedioUnlockBtn = this.owner.getChildByName("VedioUnlockBtn");
        this._vedioCostText = this._vedioUnlockBtn.getChildByName("Text");
    };
    ActorSkinBox.prototype.onEnable = function () {
        this._unlockBg.on(Laya.Event.CLICK, this, this.onSpClick);
        this._crystalUnlockBtn.on(Laya.Event.CLICK, this, this.onCrystalUnlockBtn);
        this._vedioUnlockBtn.on(Laya.Event.CLICK, this, this.onVedioUnlockBtn);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    ActorSkinBox.prototype.onDisable = function () {
        this._unlockBg.off(Laya.Event.CLICK, this, this.onSpClick);
        this._crystalUnlockBtn.off(Laya.Event.CLICK, this, this.onCrystalUnlockBtn);
        this._vedioUnlockBtn.off(Laya.Event.CLICK, this, this.onVedioUnlockBtn);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    ActorSkinBox.prototype.setData = function (data) {
        this._data = data;
        this._showSkin.loadImage("subRes/player/" + data.ski_JJKLBB_nIndex + ".png");
        this._selectBg.visible = false;
        this._unlockBg.visible = false;
        this._luckBg.visible = false;
        this._crystalUnlockBtn.visible = false;
        this._vedioUnlockBtn.visible = false;
        if (null != this._data) {
            if (User_1.default.actorSkin_JJKLBB_IsUnlock(this._data.ski_JJKLBB_nIndex)) {
                if (User_1.default.getCurA_JJKLBB_ctorSkin() == this._data.ski_JJKLBB_nIndex) {
                    this._selectBg.visible = true;
                }
                else {
                    this._unlockBg.visible = true;
                }
            }
            else {
                this._luckBg.visible = true;
                if (this._data.costD_JJKLBB_iamond > 0) {
                    this._crystalUnlockBtn.visible = true;
                    this._crystalCostText.text = String(this._data.costD_JJKLBB_iamond);
                }
                else if (this._data.ve_JJKLBB_dio > 0) {
                    this._vedioUnlockBtn.visible = true;
                    this._vedioCostText.text = "0/" + String(this._data.ve_JJKLBB_dio);
                }
            }
        }
    };
    ActorSkinBox.prototype.onSpClick = function () {
        if (null != this._data && User_1.default.actorSkin_JJKLBB_IsUnlock(this._data.ski_JJKLBB_nIndex)) {
            User_1.default.setCurA_JJKLBB_ctorSkin(this._data.ski_JJKLBB_nIndex);
        }
    };
    ActorSkinBox.prototype.onCrystalUnlockBtn = function () {
        if (null != this._data
            && this._data.costD_JJKLBB_iamond > 0
            && User_1.default.getCr_JJKLBB_ystal() >= this._data.costD_JJKLBB_iamond) {
            User_1.default.subC_JJKLBB_rystal(this._data.costD_JJKLBB_iamond);
            var skinIndex = this._data.ski_JJKLBB_nIndex;
            if (User_1.default.unlock_JJKLBB_ActorSkin(skinIndex)) {
                User_1.default.setCurA_JJKLBB_ctorSkin(skinIndex);
            }
        }
        else {
            ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.TipsView, "No diamonds");
        }
    };
    ActorSkinBox.prototype.onRewardVidewoFail = function () {
    };
    ActorSkinBox.prototype.onRewardVidewoSuccess = function () {
        if (User_1.default.unlock_JJKLBB_ActorSkin(this._data.ski_JJKLBB_nIndex)) {
            User_1.default.setCurA_JJKLBB_ctorSkin(this._data.ski_JJKLBB_nIndex);
        }
    };
    ActorSkinBox.prototype.onVedioUnlockBtn = function () {
        if (null != this._data && this._data.ve_JJKLBB_dio > 0) {
            var skinIndex = this._data.ski_JJKLBB_nIndex;
            if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                NativeCallback_1.default.CallNativeFunc("showRewardVideo");
                Laya.SoundManager.muted = true;
            }
            else {
                if (User_1.default.unlock_JJKLBB_ActorSkin(skinIndex)) {
                    User_1.default.setCurA_JJKLBB_ctorSkin(skinIndex);
                }
            }
            // WXAPI.showRewardedVideoAd((ok)=>
            // {
            //     if(ok)
            //     {
            //         if(Us_JJKLBB_er.unlock_JJKLBB_ActorSkin(skinIndex))
            //         {
            //             Us_JJKLBB_er.setCurA_JJKLBB_ctorSkin(skinIndex);
            //         }
            //     }
            // },()=>
            // {
            // })
        }
    };
    return ActorSkinBox;
}(Laya.Script));
exports.default = ActorSkinBox;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Mgr/ViewMgr":32,"../../NativeCallback":34,"../../User/User":46}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var Utilit_1 = require("../../Utilit");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var ActorSkinBox_1 = require("./ActorSkinBox");
var SkinConfig_1 = require("../../Config/SkinConfig");
var User_1 = require("../../User/User");
var ActorSkinView = /** @class */ (function (_super) {
    __extends(ActorSkinView, _super);
    function ActorSkinView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActorSkinView.prototype.onAwake = function () {
        this._topZone = this.owner.getChildByName("TopZone");
        if (Utilit_1.default.isIp_JJKLBB_honeX()) {
            this._topZone.top = 70;
        }
        this._crystalText = this._topZone.getChildByName("Crystal").getChildByName("Text");
        this._energyText = this._topZone.getChildByName("Energy").getChildByName("Text");
        this._closeBtn = this._topZone.getChildByName("CloseBtn");
        this._centerZone = this.owner.getChildByName("CenterZone");
        this._skinStateList = this._centerZone.getChildByName("List");
        this._skinStateList.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._skinStateList.hScrollBarSkin = "";
    };
    ActorSkinView.prototype.addEvent = function () {
        this._closeBtn.on(Laya.Event.CLICK, this, this.closeView);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.onCrystalChange);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.onEnergyChange);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUser_JJKLBB_UnlockActor_JJKLBB_Skin, this, this.refreshActorSkinStateList);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUser_JJKLBB_ActorSkin_JJKLBB_Change, this, this.refreshActorSkinStateList);
    };
    ActorSkinView.prototype.removeEvent = function () {
        this._closeBtn.on(Laya.Event.CLICK, this, this.closeView);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.onCrystalChange);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.onEnergyChange);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.Game_OnUser_JJKLBB_UnlockActor_JJKLBB_Skin, this, this.refreshActorSkinStateList);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.Game_OnUser_JJKLBB_ActorSkin_JJKLBB_Change, this, this.refreshActorSkinStateList);
    };
    ActorSkinView.prototype.openView = function (data) {
        _super.prototype.openView.call(this, data);
        this.refreshActorSkinStateList();
        var currentSkinIndex = User_1.default.getCurA_JJKLBB_ctorSkin();
        for (var i = 0; i < this._skinStateList.array.length; ++i) {
            if (this._skinStateList.array[i].skinIndex == currentSkinIndex) {
                this._skinStateList.scrollTo(i);
                break;
            }
        }
        this._crystalText.text = String(User_1.default.getCr_JJKLBB_ystal());
        this._energyText.text = String(User_1.default.getEn_JJKLBB_ergy());
    };
    ActorSkinView.prototype.onCrystalChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._crystalText.text = String(curr);
    };
    ActorSkinView.prototype.onEnergyChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._energyText.text = String(curr);
    };
    ActorSkinView.prototype.onListRender = function (cell, index) {
        var data = this._skinStateList.array[index];
        var box = cell.getComponent(ActorSkinBox_1.default);
        box.setData(data);
    };
    ActorSkinView.prototype.refreshActorSkinStateList = function () {
        var skinDatas = SkinConfig_1.default.getIns_JJKLBB_tance().getSkin_JJKLBB_ConfigDatas();
        var dataArray = new Array();
        for (var i = 0; i < skinDatas.length; ++i) {
            var data = skinDatas[i].clone();
            dataArray.push(data);
        }
        this._skinStateList.array = dataArray;
    };
    return ActorSkinView;
}(ViewBase_1.default));
exports.default = ActorSkinView;
},{"../../Config/SkinConfig":8,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../User/User":46,"../../Utilit":47,"../ViewBase":69,"./ActorSkinBox":48}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SoundMgr_1 = require("../Mgr/SoundMgr");
var Button_JJKLBB_Anim = /** @class */ (function (_super) {
    __extends(Button_JJKLBB_Anim, _super);
    function Button_JJKLBB_Anim() {
        var _this = _super.call(this) || this;
        _this.useSo_JJKLBB_und = true;
        return _this;
    }
    Button_JJKLBB_Anim.prototype.onAwake = function () {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.onD_JJKLBB_own);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.on_JJKLBB_Up);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.on_JJKLBB_Up);
    };
    Button_JJKLBB_Anim.prototype.onDisable = function () {
        this.owner.offAll();
        Laya.Tween.clearAll(this);
    };
    Button_JJKLBB_Anim.prototype.onD_JJKLBB_own = function () {
        Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
        if (this.useSo_JJKLBB_und) {
            SoundMgr_1.default.instance.playS_JJKLBB_ound("anniu");
        }
    };
    Button_JJKLBB_Anim.prototype.on_JJKLBB_Up = function () {
        Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
    };
    return Button_JJKLBB_Anim;
}(Laya.Script));
exports.default = Button_JJKLBB_Anim;
},{"../Mgr/SoundMgr":31}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../View/ViewBase");
var CachedWXBannerAd_1 = require("../../CachedWXBannerAd");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
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
    EventMgr.instance.dispatch(EventDef.AD_CloseBanner, true);//这句代码是我用来关闭官方Banner，各项目自行实现
    ViewMgr.instance.openView(ViewDef.ClickGetPrize,data);
 *
 * @export
 * @class ClickGetPrize
 * @extends {ViewBase}
 */
var ClickGetPrize_2 = /** @class */ (function (_super) {
    __extends(ClickGetPrize_2, _super);
    function ClickGetPrize_2() {
        var _this = _super.call(this) || this;
        _this._totalClickTimer = 22; //用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
        _this._needClickTime = 10; //一共点多少次能够获得奖励，用于显示进度条
        _this._bannerClickTime = 6; //点多少次开始显示bannerr套路用户，可微调    
        _this._arrowUp = false;
        _this._bannerClicked = false;
        _this._punchTimer = 0;
        return _this;
    }
    ClickGetPrize_2.prototype.onAwake = function () {
        var _this = this;
        this._bannerClickTime = 3 + Math.floor(Math.random() * 4);
        // localStorage.clear();
        this._click1_Btn = this.owner.getChildByName("Click1_Btn");
        this._click1_Btn.on(Laya.Event.CLICK, this, this.ButtonClicked);
        this._click2_Btn = this.owner.getChildByName("Click2_Btn");
        this._click2_Btn.on(Laya.Event.CLICK, this, this.ButtonClicked);
        this._arrow_Img = this._click2_Btn.getChildByName("Arrow_Img");
        this._bg = this.owner.getChildByName("BG");
        // this._open_Btn = this._bg.getChildByName("Open_Btn") as Laya.Sprite;
        this._getPrize_View = this.owner.getChildByName("GetPrize_View");
        this._prizeCount_Text = this._getPrize_View.getChildByName("PrizeCount_Text");
        this._confirm_Btn = this._getPrize_View.getChildByName("Confirm_Btn");
        this._confirm_Btn.on(Laya.Event.CLICK, this, this.closeView);
        this._getPrize_View.visible = false;
        this._clickTime_PBar = this._bg.getChildByName("ClickTime_PBar");
        this._clickTime_PBar$Bar = this._clickTime_PBar.getChildByName("ClickTime_PBar$Bar");
        this._clickBarOriginalWidth = this._clickTime_PBar$Bar.width;
        this._bannerAd_View = this.owner.getChildByName("BannerAd_View");
        this._clickTime_PBar$Bar.width = 0;
        this._clickTime = 0;
        this._totalClickTime = 0;
        this._blockMask = this.owner.getChildByName("Block");
        //EventMgr.instance.regOnceEvent(EventDef.AD_WudianBanner_LoadComplete, this, this.WudianLoadComplete);
        this._punchSkeleton_Par = this.owner.getChildByName("Punck_Skeleton");
        this._punchSkeleton = new Laya.Skeleton();
        this._punchSkeleton.load("subRes/spine/Character/NewProject.sk", Laya.Handler.create(this, function () {
            _this._punchSkeleton_Par.addChild(_this._punchSkeleton);
            _this._punchSkeleton.play(0, true);
        }));
        this._clickSkeleton_Par = this._click1_Btn.getChildByName("ClickSkeleton_Par");
        this._clickSkeleton = new Laya.Skeleton();
        this._clickSkeleton.load("subRes/spine/Tip/NewProject.sk", Laya.Handler.create(this, function () {
            _this._clickSkeleton_Par.addChild(_this._clickSkeleton);
            _this._clickSkeleton.play(0, true);
        }));
        this._prize_Img = this._getPrize_View.getChildByName("Prize_Img");
        this._noPrize_Text = this._getPrize_View.getChildByName("NoPrize_Text");
    };
    ClickGetPrize_2.prototype.onUpdate = function () {
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
        if (this._punchTimer > 0) {
            this._punchTimer -= Laya.timer.delta;
            if (this._punchTimer <= 0) {
                this._punchSkeleton.play(0, true);
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
    ClickGetPrize_2.prototype.punchPlay = function () {
        if (this._punchTimer > 0) {
            this._punchSkeleton.play(1, false);
        }
        else {
            this._punchSkeleton.play(0, true);
        }
    };
    ClickGetPrize_2.prototype.onShow = function () {
        this._compeletHander = this._data.CompleteHander;
        this._prizeCount = this._data.PrizeCount;
        this._clickType = this._data.ClickType;
        if (this._clickType == 2) {
            this._click1_Btn.visible = true;
            this._click2_Btn.visible = false;
        }
        else if (this._clickType == 1) {
            this._click1_Btn.visible = false;
            this._click2_Btn.visible = true;
        }
        CachedWXBannerAd_1.default.hide();
    };
    /**
     * 用户成功获得奖励
     *
     * @memberof ClickGetPrize
     */
    ClickGetPrize_2.prototype.OpenPrizeWindow = function () {
        var rate = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().skinPR;
        var bg = this._getPrize_View.getChildByName("bg");
        bg.visible = false;
        this._noPrize_Text.visible = false;
        this._bg.visible = false;
        // let rdRate = Math.random() * 100;
        // if (rdRate > rate) {
        //     this._prizeCount_Text.text = this._prizeCount.toString();
        //     // let owned = SkinMgr.Instance.CurrentSkinDate.Owned;
        //     Us_JJKLBB_er.getAct_JJKLBB_orSkins()
        //     let skinIndex = 0;
        //     for (skinIndex = 0; skinIndex < owned.length; skinIndex++) {
        //         let o = owned[skinIndex];
        //         if (!o) {
        //             break;
        //         }
        //     }
        //     skinIndex = Math.min(skinIndex, owned.length - 1);
        //     // SkinMgr.Instance.UnLockSkin(skinIndex);
        //     // SkinMgr.Instance.SetCurrentSkin(skinIndex);
        //     // EventMgr.instance.dispatch(EventDef.Game_ChangeSkin, [skinIndex]);
        //     this._prize_Img.loadImage("subRes/player/" + skinIndex + ".png", Laya.Handler.create(this, () => {
        //         bg.visible = true;
        //         this._getPrize_View.visible = true;
        //     }));
        // }
        /* else */ {
            bg.visible = false;
            this._getPrize_View.getChildByName("Title").visible = false;
            this._prizeCount_Text.visible = false;
            this._noPrize_Text.visible = true;
            this._getPrize_View.visible = true;
        }
        /* 确认按钮 */
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
    ClickGetPrize_2.prototype.ShowBanner = function () {
        console.log("AD_WudianBanner_Show");
        // CachedWXBannerAd.show();
        if (this._clickType == 2) {
            // QQMiniGameAPI.showAppBoxAd(null);
        }
        else if (this._clickType == 1) {
            CachedWXBannerAd_1.default.show();
        }
    };
    ClickGetPrize_2.prototype.onClose = function () {
        if (this._compeletHander) {
            this._compeletHander.run();
        }
        if (this._clickType == 2) {
        }
        else if (this._clickType == 1) {
            CachedWXBannerAd_1.default.hide();
        }
    };
    /**
     * 狂点按钮逻辑
     *
     *
     * @memberof ClickGetPrize
     */
    ClickGetPrize_2.prototype.ButtonClicked = function () {
        this._blockMask.visible = false;
        this._punchTimer = 320;
        this._punchSkeleton.play(1, true);
        this._clickTime++;
        this._totalClickTime++;
        //nanner一直没加载成功,保持进度条
        if (this._clickTime > this._needClickTime) {
            this._clickTime = this._needClickTime;
        }
        if (this._clickTime >= this._bannerClickTime /*&& this._wudianLoadFlag*/ && !this._bannerClicked) {
            if (this._clickTime >= this._needClickTime) {
                this._clickTime = this._needClickTime - 1;
            }
            this._bannerClicked = true;
            console.log("误点Banner套路启动");
            //用户连点，出banner
            this.ShowBanner();
            Laya.timer.once(2000, this, this.BannerClicked);
        }
        //用户一直没被套路到，让他继续玩
        else if (this._totalClickTime > this._totalClickTimer && !this._bannerClicked) {
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
    ClickGetPrize_2.prototype.BannerClicked = function () {
        this._bannerClicked = true;
        this._clickTime = this._needClickTime;
        this._clickTime_PBar$Bar.width = this._clickBarOriginalWidth;
        this._click1_Btn.visible = false;
        this._click2_Btn.visible = false;
        // this._open_Btn.visible = true;
        // this._bannerAd_View.visible = false;
        // this._bannerAd_View.active = false;
        this.OpenPrizeWindow();
    };
    return ClickGetPrize_2;
}(ViewBase_1.default));
exports.default = ClickGetPrize_2;
},{"../../CachedWXBannerAd":3,"../../Config/AppSwitchConfig":4,"../../View/ViewBase":69}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BannerAdView_1 = require("../../ShareAd/View/BannerAdView");
var UniversalBottomZone = /** @class */ (function (_super) {
    __extends(UniversalBottomZone, _super);
    function UniversalBottomZone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UniversalBottomZone.prototype.onAwake = function () {
        this._ownerSprite = this.owner;
        this._autoZone = this._ownerSprite.getChildByName("AutoZone");
        this._loopADZone = this._ownerSprite.getChildByName("LoopAD");
        this._bannerADZone = this._ownerSprite.getChildByName("BannerAD");
        this._bannerAd = this._bannerADZone.getComponent(BannerAdView_1.default);
    };
    UniversalBottomZone.prototype.onEnable = function () {
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            this._autoZone.bottom = this._loopADZone.height + this._bannerADZone.height;
            this._loopADZone.bottom = this._bannerADZone.height;
            this._bannerADZone.visible = true;
        }
        else {
            this._autoZone.bottom = this._loopADZone.height;
            this._loopADZone.bottom = 0;
            this._bannerADZone.visible = false;
        }
    };
    UniversalBottomZone.prototype.onDisable = function () {
    };
    UniversalBottomZone.prototype.onUpdate = function () {
        if (!this._bannerADZone.visible) {
            this._bannerAd.clear_JJKLBB_WXBaner();
        }
    };
    return UniversalBottomZone;
}(Laya.Script));
exports.default = UniversalBottomZone;
},{"../../ShareAd/View/BannerAdView":42}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var User_1 = require("../../User/User");
var GameCommonConfig_1 = require("../../Config/GameCommonConfig");
var Utilit_1 = require("../../Utilit");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var CachedWXBannerAd_1 = require("../../CachedWXBannerAd");
var NativeCallback_1 = require("../../NativeCallback");
var FreeRewardType;
(function (FreeRewardType) {
    FreeRewardType["None"] = "0";
    FreeRewardType["Crystal"] = "1";
    FreeRewardType["Energy"] = "2";
})(FreeRewardType = exports.FreeRewardType || (exports.FreeRewardType = {}));
var FreeRewardView = /** @class */ (function (_super) {
    __extends(FreeRewardView, _super);
    function FreeRewardView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._rewardTags = {};
        _this._curRewardType = FreeRewardType.None;
        _this._bannerClosed = false;
        return _this;
    }
    FreeRewardView.prototype.onAwake = function () {
        this._topZone = this.owner.getChildByName("TopZone");
        if (Utilit_1.default.isIp_JJKLBB_honeX()) {
            this._topZone.top = 70;
        }
        this._crystalText = this._topZone.getChildByName("Crystal").getChildByName("Text");
        this._energyText = this._topZone.getChildByName("Energy").getChildByName("Text");
        this._centerZone = this.owner.getChildByName("CenterZone");
        this._rewardBtn = this._centerZone.getChildByName("RewardBtn");
        this._rewardText = this._centerZone.getChildByName("RewardText");
        this._closeBtn = this._centerZone.getChildByName("CloseBtn");
        this._rewardTags[FreeRewardType.Crystal] = this._centerZone.getChildByName("CrystalTag");
        this._rewardTags[FreeRewardType.Energy] = this._centerZone.getChildByName("EnergyTag");
        this.showTag(FreeRewardType.None);
        CachedWXBannerAd_1.default.hide();
        if (ViewMgr_1.default.insta_JJKLBB_nce.getView(ViewMgr_1.View_JJKLBB_Def.MainView) != null) {
            EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.AD_SwitchBanner, [false]);
            this._bannerClosed = true;
        }
        if (ViewMgr_1.default.insta_JJKLBB_nce.getView(ViewMgr_1.View_JJKLBB_Def.GameOverView) != null) {
            EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.AD_SwitchBanner, [false]);
            this._bannerClosed = true;
        }
    };
    FreeRewardView.prototype.addEvent = function () {
        this._rewardBtn.on(Laya.Event.CLICK, this, this.onRewardBtn);
        this._closeBtn.on(Laya.Event.CLICK, this, this.closeView);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.onCrystalChange);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.onEnergyChange);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    FreeRewardView.prototype.removeEvent = function () {
        this._rewardBtn.off(Laya.Event.CLICK, this, this.onRewardBtn);
        this._closeBtn.off(Laya.Event.CLICK, this, this.closeView);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.onCrystalChange);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.onEnergyChange);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    FreeRewardView.prototype.openView = function (data) {
        _super.prototype.openView.call(this, data);
        this._curRewardType = null == data.rewardType ? FreeRewardType.None : data.rewardType;
        switch (this._curRewardType) {
            case FreeRewardType.Crystal:
                this._rewardText.text = "x" + GameCommonConfig_1.default.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().freeDiamond;
                break;
            case FreeRewardType.Energy:
                this._rewardText.text = "x" + GameCommonConfig_1.default.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().freeEnergy;
                break;
        }
        this.showTag(this._curRewardType);
        this._crystalText.text = String(User_1.default.getCr_JJKLBB_ystal());
        this._energyText.text = String(User_1.default.getEn_JJKLBB_ergy());
    };
    FreeRewardView.prototype.onCrystalChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._crystalText.text = String(curr);
    };
    FreeRewardView.prototype.onEnergyChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._energyText.text = String(curr);
    };
    FreeRewardView.prototype.onRewardVidewoFail = function () {
        console.log("观看视频失败 没用奖励");
        this._rewardBtn.visible = true;
    };
    FreeRewardView.prototype.onRewardVidewoSuccess = function () {
        var rewardNum = 0;
        switch (this._curRewardType) {
            case FreeRewardType.Crystal:
                rewardNum = GameCommonConfig_1.default.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().freeDiamond;
                break;
            case FreeRewardType.Energy:
                rewardNum = GameCommonConfig_1.default.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().freeEnergy;
                break;
        }
        switch (this._curRewardType) {
            case FreeRewardType.Crystal:
                User_1.default.addCrys_JJKLBB_tal(rewardNum);
                break;
            case FreeRewardType.Energy:
                User_1.default.addEne_JJKLBB_rgy(rewardNum);
                break;
        }
        this._rewardBtn.visible = true;
    };
    FreeRewardView.prototype.onRewardBtn = function () {
        var rewardType = this._curRewardType;
        var rewardNum = 0;
        switch (this._curRewardType) {
            case FreeRewardType.Crystal:
                rewardNum = GameCommonConfig_1.default.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().freeDiamond;
                break;
            case FreeRewardType.Energy:
                rewardNum = GameCommonConfig_1.default.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().freeEnergy;
                break;
        }
        var self = this;
        this._rewardBtn.visible = false;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback_1.default.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
        }
        else {
            switch (rewardType) {
                case FreeRewardType.Crystal:
                    User_1.default.addCrys_JJKLBB_tal(rewardNum);
                    break;
                case FreeRewardType.Energy:
                    User_1.default.addEne_JJKLBB_rgy(rewardNum);
                    break;
            }
        }
        // WXAPI.showRewardedVideoAd((ok)=>
        // {   
        //     if(ok)
        //     {
        //         switch (rewardType)  {
        //             case FreeRewardType.Crystal:
        //                 Us_JJKLBB_er.addCrys_JJKLBB_tal(rewardNum);
        //                 break;
        //             case FreeRewardType.Energy:
        //                 Us_JJKLBB_er.addEne_JJKLBB_rgy(rewardNum);
        //                 break;
        //         }
        //     }
        //     else
        //     {
        //     }
        //     self._rewardBtn.visible = true;
        // },()=>
        // {
        //     self._rewardBtn.visible = true;
        // })
    };
    FreeRewardView.prototype.showTag = function (type) {
        for (var key in this._rewardTags) {
            var tag = this._rewardTags[key];
            tag.visible = (type == key);
        }
    };
    FreeRewardView.prototype.onClose = function () {
        _super.prototype.onClose.call(this);
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.AD_SwitchBanner, [true]);
    };
    return FreeRewardView;
}(ViewBase_1.default));
exports.default = FreeRewardView;
},{"../../CachedWXBannerAd":3,"../../Config/GameCommonConfig":5,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Mgr/ViewMgr":32,"../../NativeCallback":34,"../../User/User":46,"../../Utilit":47,"../ViewBase":69}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var Utilit_1 = require("../../Utilit");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var WXAPI_1 = require("../../WXAPI");
var LevelConfig_1 = require("../../Config/LevelConfig");
var User_1 = require("../../User/User");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var GameMgr_1 = require("../../Mgr/GameMgr");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
;
var WudianMgr_1 = require("../../Mgr/WudianMgr");
var ShareAd_1 = require("../../ShareAd/ShareAd");
var FreeRewardView_1 = require("../FreeReward/FreeRewardView");
var GameOver = /** @class */ (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameOver.prototype.onAwake = function () {
        this._topZone = this.owner.getChildByName("TopZone");
        if (Utilit_1.default.isIp_JJKLBB_honeX()) {
            this._topZone.top = 70;
        }
        this._crystalText = this._topZone.getChildByName("Crystal").getChildByName("Text");
        this._energyText = this._topZone.getChildByName("Energy").getChildByName("Text");
        this._buttons = this.owner.getChildByName("Buttons");
        this._centerZone = this.owner.getChildByName("CenterZone");
        this._backBtn = this._buttons.getChildByName("BackBtn");
        this._nextBtn = this._buttons.getChildByName("NextBtn");
        this._shareBtn = this._buttons.getChildByName("ShareBtn");
        this._shareBtn.visible = false;
        // this._backBtn.visible = false;
        this._winTag = this._centerZone.getChildByName("LoopAD").getChildByName("WinTag");
        this._loseTag = this._centerZone.getChildByName("LoopAD").getChildByName("LoseTag");
        this._nextBtnWinTag = this._nextBtn.getChildByName("win");
        this._nextBtnLoseTag = this._nextBtn.getChildByName("lose");
        // this._banner = this.owner.getChildByName("BannerAD") as Laya.UIComponent;
        // A_JJKLBB_LD.aldSendOnlySingleReport(ALDEv_JJKLBB_entDef.EnterGameComplateView);
    };
    GameOver.prototype.addEvent = function () {
        this._backBtn.on(Laya.Event.CLICK, this, this.onBackBtn);
        this._nextBtn.on(Laya.Event.CLICK, this, this.onNextBtn);
        // this._shareBtn.on(Laya.Event.CLICK,this,this.onShareBtn);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.onCrystalChange);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.onEnergyChange);
    };
    GameOver.prototype.removeEvent = function () {
        this._backBtn.off(Laya.Event.CLICK, this, this.onBackBtn);
        this._nextBtn.off(Laya.Event.CLICK, this, this.onNextBtn);
        // this._shareBtn.off(Laya.Event.CLICK,this,this.onShareBtn);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.onCrystalChange);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.onEnergyChange);
    };
    GameOver.prototype.openView = function (data) {
        _super.prototype.openView.call(this, data);
        this._winTag.visible = this._data.isWin;
        this._loseTag.visible = !this._data.isWin;
        this._nextBtnWinTag.visible = this._data.isWin;
        this._nextBtnLoseTag.visible = !this._data.isWin;
        this._crystalText.text = String(User_1.default.getCr_JJKLBB_ystal());
        this._energyText.text = String(User_1.default.getEn_JJKLBB_ergy());
        if (WudianMgr_1.default.WudianFlag) {
            this.InduceClick();
        }
        else {
            if (AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().popAdSwitch == 1) {
                ShareAd_1.default.Rando_JJKLBB_mJump(1);
            }
            // this._banner.addComponent(MyBannerAdView);
        }
    };
    GameOver.prototype.InduceClick = function () {
        this._buttons.bottom = 0;
        this._buttons.mouseEnabled = false;
        var btnMoveTimer = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().btnMov_JJKLBB_eTimer * 1000;
        var bannerMoveTimer = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().bannerMo_JJKLBB_veTimer * 1000;
        Laya.timer.once(bannerMoveTimer, this, this.InduceMethod);
        Laya.timer.once(btnMoveTimer, this, this.MoveUp);
    };
    GameOver.prototype.InduceMethod = function () {
        // CachedW_JJKLBB_XBannerAd.show();
    };
    GameOver.prototype.MoveUp = function () {
        this._buttons.mouseEnabled = true;
        /* if (AdvertisementView.ShowBothAd) {
            this._buttons.bottom = 500;
        }
        else */ {
            this._buttons.bottom = 320;
        }
    };
    GameOver.prototype.onCrystalChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._crystalText.text = String(curr);
    };
    GameOver.prototype.onEnergyChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._energyText.text = String(curr);
    };
    GameOver.prototype.onBackBtn = function () {
        var self = this;
        ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.MainView);
        self.closeView();
        // View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.MoreGameView,{closeFunction:()=>{
        // }},()=>
        // {
        // })
        //todo:销毁游戏
    };
    GameOver.prototype.onNextBtn = function () {
        var _this = this;
        var levelNum = this._data.levelNum;
        if (this._data.isWin) {
            var levelNum = this._data.levelNum + 1;
        }
        var data = LevelConfig_1.default.getIns_JJKLBB_tance().getLevelCon_JJKLBB_figDataB_JJKLBB_yLevelNum(levelNum);
        if (null != data) {
            if (1 == data.vedioCostNoEnergy) {
                WXAPI_1.default.showRewardedVideoAd(function (ok) {
                    if (ok) {
                        //不消耗体力开局
                        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_Start_JJKLBB_Game, {
                            levelNum: data.levelNum,
                            costEnergy: data.costEnergy * 0,
                            crystalReward: data.getDiamond,
                        });
                        _this.closeView();
                    }
                    else {
                        if (User_1.default.getEn_JJKLBB_ergy() < data.costEnergy) {
                            ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.FreeRewardView, {
                                rewardType: FreeRewardView_1.FreeRewardType.Energy
                            });
                            ViewMgr_1.default.insta_JJKLBB_nce.showTips("You have no energy left");
                            return;
                        }
                        //正常开局
                        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_Start_JJKLBB_Game, {
                            levelNum: data.levelNum,
                            costEnergy: data.costEnergy,
                            crystalReward: data.getDiamond,
                        });
                        _this.closeView();
                    }
                }, function () {
                    if (User_1.default.getEn_JJKLBB_ergy() < data.costEnergy) {
                        ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.FreeRewardView, {
                            rewardType: FreeRewardView_1.FreeRewardType.Energy
                        });
                        ViewMgr_1.default.insta_JJKLBB_nce.showTips("You have no energy left");
                        return;
                    }
                    //正常开局
                    EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_Start_JJKLBB_Game, {
                        levelNum: data.levelNum,
                        costEnergy: data.costEnergy,
                        crystalReward: data.getDiamond,
                    });
                    _this.closeView();
                });
            }
            else if (1 == data.vedioDoubleDiamond) {
                if (User_1.default.getEn_JJKLBB_ergy() < data.costEnergy) {
                    ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.FreeRewardView, {
                        rewardType: FreeRewardView_1.FreeRewardType.Energy
                    });
                    ViewMgr_1.default.insta_JJKLBB_nce.showTips("You have no energy left");
                    return;
                }
                WXAPI_1.default.showRewardedVideoAd(function (ok) {
                    if (ok) {
                        //双倍奖励开局
                        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_Start_JJKLBB_Game, {
                            levelNum: data.levelNum,
                            costEnergy: data.costEnergy,
                            crystalReward: data.getDiamond * 2,
                        });
                        _this.closeView();
                    }
                    else {
                        //正常开局
                        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_Start_JJKLBB_Game, {
                            levelNum: data.levelNum,
                            costEnergy: data.costEnergy,
                            crystalReward: data.getDiamond,
                        });
                    }
                    _this.closeView();
                }, function () {
                    //正常开局
                    EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_Start_JJKLBB_Game, {
                        levelNum: data.levelNum,
                        costEnergy: data.costEnergy,
                        crystalReward: data.getDiamond,
                    });
                    _this.closeView();
                });
            }
            else {
                if (User_1.default.getEn_JJKLBB_ergy() < data.costEnergy) {
                    ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.FreeRewardView, {
                        rewardType: FreeRewardView_1.FreeRewardType.Energy
                    });
                    ViewMgr_1.default.insta_JJKLBB_nce.showTips("You have no energy left");
                    return;
                }
                //正常开局
                EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_Start_JJKLBB_Game, {
                    levelNum: data.levelNum,
                    costEnergy: data.costEnergy,
                    crystalReward: data.getDiamond,
                });
                this.closeView();
            }
        }
    };
    GameOver.prototype.onShareBtn = function () {
        // WXAPI.share((ok)=>
        // {
        // },"","");
    };
    GameOver.prototype.onClose = function () {
        _super.prototype.onClose.call(this);
        GameMgr_1.default.getI_JJKLBB_nstan_JJKLBB_ce().saveGa_JJKLBB_meData();
        // CachedW_JJKLBB_XBannerAd.hide();
    };
    return GameOver;
}(ViewBase_1.default));
exports.default = GameOver;
},{"../../Config/AppSwitchConfig":4,"../../Config/LevelConfig":7,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Mgr/GameMgr":30,"../../Mgr/ViewMgr":32,"../../Mgr/WudianMgr":33,"../../ShareAd/ShareAd":41,"../../User/User":46,"../../Utilit":47,"../../WXAPI":70,"../FreeReward/FreeRewardView":53,"../ViewBase":69}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var Utilit_1 = require("../../Utilit");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var WXAPI_1 = require("../../WXAPI");
var User_1 = require("../../User/User");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var WudianMgr_1 = require("../../Mgr/WudianMgr");
var NativeCallback_1 = require("../../NativeCallback");
var GameRewardView = /** @class */ (function (_super) {
    __extends(GameRewardView, _super);
    function GameRewardView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameRewardView.prototype.onAwake = function () {
        this._topZone = this.owner.getChildByName("TopZone");
        if (Utilit_1.default.isIp_JJKLBB_honeX()) {
            this._topZone.top = 70;
        }
        this._crystalText = this._topZone.getChildByName("Crystal").getChildByName("Text");
        this._energyText = this._topZone.getChildByName("Energy").getChildByName("Text");
        this._centerZone = this.owner.getChildByName("CenterZone");
        this._rewardBtn = this._centerZone.getChildByName("RewardBtn");
        this._moreRewardBtn = this._centerZone.getChildByName("MoreRewardBtn");
        this._rewardText = this._centerZone.getChildByName("RewardText");
    };
    GameRewardView.prototype.onStart = function () {
        var _this = this;
        if (WudianMgr_1.default.GetIp_JJKLBB_Block_JJKLBB_ed()) {
            var time = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().commonBtnDelayTime;
            if (time > 0) {
                if (time < 100) {
                    time *= 1000;
                }
                this._rewardBtn.visible = false;
                Laya.timer.once(time, this, function () {
                    _this._rewardBtn.visible = true;
                });
            }
        }
    };
    GameRewardView.prototype.addEvent = function () {
        this._rewardBtn.on(Laya.Event.CLICK, this, this.onRewardBtn);
        this._moreRewardBtn.on(Laya.Event.CLICK, this, this.onMoreRewardBtn);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.onCrystalChange);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.onEnergyChange);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    GameRewardView.prototype.removeEvent = function () {
        this._rewardBtn.off(Laya.Event.CLICK, this, this.onRewardBtn);
        this._moreRewardBtn.off(Laya.Event.CLICK, this, this.onMoreRewardBtn);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.onCrystalChange);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.onEnergyChange);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    GameRewardView.prototype.openView = function (data) {
        _super.prototype.openView.call(this, data);
        this._rewardText.text = "X" + data.rewardNum;
        this._crystalText.text = String(User_1.default.getCr_JJKLBB_ystal());
        this._energyText.text = String(User_1.default.getEn_JJKLBB_ergy());
        WXAPI_1.default.showInterstitialAd(function () { }, function () { });
    };
    GameRewardView.prototype.onCrystalChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._crystalText.text = String(curr);
    };
    GameRewardView.prototype.onEnergyChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._energyText.text = String(curr);
    };
    GameRewardView.prototype.onRewardBtn = function () {
        User_1.default.addCrys_JJKLBB_tal(this._data.rewardNum);
        this.closeView();
    };
    GameRewardView.prototype.onRewardVidewoFail = function () {
        console.log("观看视频失败 没用奖励");
        this._rewardBtn.visible = true;
    };
    GameRewardView.prototype.onRewardVidewoSuccess = function () {
        User_1.default.addCrys_JJKLBB_tal(this._data.rewardNum * 3);
        this._rewardBtn.visible = true;
        this.closeView();
    };
    GameRewardView.prototype.onMoreRewardBtn = function () {
        var self = this;
        this._moreRewardBtn.visible = false;
        this._rewardBtn.visible = false;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback_1.default.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
        }
        else {
            User_1.default.addCrys_JJKLBB_tal(self._data.rewardNum);
            self.closeView();
        }
        // WXAPI.showRewardedVideoAd((ok)=>
        // {
        //     if(ok)
        //     {
        //         Us_JJKLBB_er.addCrys_JJKLBB_tal(self._data.rewardNum * 3)
        //     }
        //     else
        //     {
        //         Us_JJKLBB_er.addCrys_JJKLBB_tal(self._data.rewardNum)
        //     }
        //     self.closeView();
        // },()=>
        // {
        //     Us_JJKLBB_er.addCrys_JJKLBB_tal(self._data.rewardNum)
        //     self.closeView();
        // });
    };
    GameRewardView.prototype.onClose = function () {
        ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.GameOverView, {
            isWin: true,
            levelNum: this._data.levelNum
        });
        _super.prototype.onClose.call(this);
    };
    return GameRewardView;
}(ViewBase_1.default));
exports.default = GameRewardView;
},{"../../Config/AppSwitchConfig":4,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Mgr/ViewMgr":32,"../../Mgr/WudianMgr":33,"../../NativeCallback":34,"../../User/User":46,"../../Utilit":47,"../../WXAPI":70,"../ViewBase":69}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var Utilit_1 = require("../../Utilit");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var WXAPI_1 = require("../../WXAPI");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var TouchCtr_1 = require("../../GameCore/TouchCtr");
var User_1 = require("../../User/User");
var WudianMgr_1 = require("../../Mgr/WudianMgr");
var ALD_1 = require("../../ALD");
var NativeCallback_1 = require("../../NativeCallback");
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GameView, "Instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameView.prototype, "CurrentScene", {
        get: function () {
            return this._currentScene;
        },
        enumerable: true,
        configurable: true
    });
    GameView.prototype.onAwake = function () {
        GameView._instance = this;
        this._topZone = this.owner.getChildByName("TopZone");
        if (Utilit_1.default.isIp_JJKLBB_honeX()) {
            this._topZone.top = 70;
        }
        this._exitBtn = this._topZone.getChildByName("ExitBtn");
        this._restartBtn = this._topZone.getChildByName("RestartBtn");
        this._skipBtn = this._topZone.getChildByName("SkipBtn");
        ALD_1.default.aldSendOnlySingleReport(ALD_1.ALDEv_JJKLBB_entDef.EnterBattleView);
    };
    GameView.prototype.addEvent = function () {
        this._exitBtn.on(Laya.Event.CLICK, this, this.onExitBtn);
        this._restartBtn.on(Laya.Event.CLICK, this, this.onRestarBtn);
        this._skipBtn.on(Laya.Event.CLICK, this, this.onSkipBtn);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    GameView.prototype.removeEvent = function () {
        this._exitBtn.off(Laya.Event.CLICK, this, this.onExitBtn);
        this._restartBtn.off(Laya.Event.CLICK, this, this.onRestarBtn);
        this._skipBtn.off(Laya.Event.CLICK, this, this.onSkipBtn);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    GameView.prototype.onExitBtn = function () {
        this.CloseOldScene();
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_Exit_JJKLBB_Game);
        ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.MainView);
        this.closeView();
    };
    GameView.prototype.onRewardVidewoFail = function () {
        ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.TipsView, "Show Reward Video Faild");
        this._skipBtn.visible = true;
        this._restartBtn.visible = true;
    };
    GameView.prototype.onRewardVidewoSuccess = function () {
        if (NativeCallback_1.default.NowVideoType == "Reset") {
            this.LoadGame();
            this._restartBtn.visible = true;
        }
        else if (NativeCallback_1.default.NowVideoType == "Skip") {
            this.GameOver(true);
            this._skipBtn.visible = true;
        }
    };
    GameView.prototype.onRestarBtn = function () {
        this._restartBtn.visible = false;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback_1.default.NowVideoType = "Reset";
            NativeCallback_1.default.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
        }
        else {
            this._restartBtn.visible = true;
        }
        // WXAPI.showRewardedVideoAd((ok) => {
        //     if (ok) {
        //         this.LoadGame();
        //     }
        //     this._skipBtn.visible = true;
        // }, () => {
        //     this._skipBtn.visible = true;
        // })
    };
    GameView.prototype.onSkipBtn = function () {
        this._skipBtn.visible = false;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback_1.default.NowVideoType = "Skip";
            NativeCallback_1.default.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
        }
        else {
            this._skipBtn.visible = true;
        }
        // WXAPI.showRewardedVideoAd((ok) => {
        //     if (ok) {
        //         //todo:开始下一关游戏，设置当前关卡进度
        //         this.GameOver(true);
        //     }
        //     this._skipBtn.visible = true;
        // }, () => {
        //     this._skipBtn.visible = true;
        // })
    };
    GameView.prototype.LoadGame = function () {
        this.CloseOldScene();
        // Laya.timer.frameOnce(2, this, () => {
        this.LoadStep1();
        // });
    };
    GameView.prototype.LoadStep1 = function () {
        var _this = this;
        var level = this._data.levelNum;
        if (level > 50) {
            console.log("关卡超出边界,虚假关卡为:" + level);
            level = Math.ceil(this.GetRdSeed(level + 12345) * 48) + 2;
            console.log("关卡超出边界,真实关卡为:" + level);
        }
        // Laya.Scene.load("GameScene/CutRope - 副本.json", Laya.Handler.create(this, (scene: Laya.Scene) => {
        Laya.Scene.load("GameScene/level_" + level + ".json", Laya.Handler.create(this, function (scene) {
            _this.owner.addChildAt(scene, 0);
            _this._currentScene = scene;
            _this._currentScene.addComponent(TouchCtr_1.default);
        }, null));
    };
    GameView.prototype.GetRdSeed = function (seed) {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / (233280.0);
    };
    GameView.prototype.CloseOldScene = function () {
        if (this._currentScene != null) {
            Laya.Physics.I.stop();
            // this._currentScene.removeSelf();
            this._currentScene.visible = false;
            this._currentScene.active = false;
            var self_1 = this;
            // Laya.timer.frameOnce(1, self, () => {
            this._currentScene.destroy();
            this._currentScene = null;
            // });
        }
        Laya.Physics.I._enabled = false;
        Laya.Physics.I.start();
    };
    GameView.prototype.onShow = function () {
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_StopBgm);
        ViewMgr_1.default.insta_JJKLBB_nce.closeView(ViewMgr_1.View_JJKLBB_Def.MainView);
        User_1.default.subE_JJKLBB_nergy(this._data.costEnergy);
        this.LoadGame();
    };
    GameView.prototype.GameOver = function (win) {
        var _this = this;
        console.log("Game Over, Result :", win);
        Laya.timer.frameOnce(1, this, function () {
            _this.CloseOldScene();
            _this.closeView();
        });
        if (WudianMgr_1.default.SecondWudianFlag) {
            var currTime_1 = Laya.timer.currTimer;
            var data = {};
            data.PrizeCount = "恭喜获得皮肤";
            data.ClickType = 1;
            data.CompleteHander = Laya.Handler.create(this, function (data, win) {
                {
                    EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_onGameC_JJKLBB_omplate, { isWin: win, levelNum: data.levelNum, crystalReward: data.crystalReward });
                }
                console.log("游戏开始狂点停留时间", (Laya.timer.currTimer - currTime_1) / 1000);
                ALD_1.default.aldSendOnlySingleReport(ALD_1.ALDEv_JJKLBB_entDef.StayComplateClickGetPrizeTime, {
                    "时间": (Laya.timer.currTimer - currTime_1) / 1000
                });
            }, [this._data, win]);
            ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.ClickGetPrize_2, data, function () {
                ALD_1.default.aldSendOnlySingleReport(ALD_1.ALDEv_JJKLBB_entDef.EnterComplateClickGetPrize);
                ALD_1.default.aldSendOnlySingleReport(ALD_1.ALDEv_JJKLBB_entDef.EnterComplateClickGetPrizeScene, {
                    "场景值": WXAPI_1.default.getLaunchOptionsSync().scene
                });
            });
        }
        else {
            EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_onGameC_JJKLBB_omplate, { isWin: win, levelNum: this._data.levelNum, crystalReward: this._data.crystalReward });
        }
        // View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.GameView, date);
    };
    return GameView;
}(ViewBase_1.default));
exports.default = GameView;
},{"../../ALD":1,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../GameCore/TouchCtr":27,"../../Mgr/ViewMgr":32,"../../Mgr/WudianMgr":33,"../../NativeCallback":34,"../../User/User":46,"../../Utilit":47,"../../WXAPI":70,"../ViewBase":69}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../../User/User");
var WXAPI_1 = require("../../WXAPI");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var FreeRewardView_1 = require("../FreeReward/FreeRewardView");
var LevelStateBox = /** @class */ (function (_super) {
    __extends(LevelStateBox, _super);
    function LevelStateBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LevelStateBox.prototype.onAwake = function () {
        this._currentTag = this.owner.getChildByName("Current");
        this._complateTag = this.owner.getChildByName("Complate");
        this._lockTag = this.owner.getChildByName("Lock");
        this._noEnergyCost = this.owner.getChildByName("NoEnergyCost");
        this._moreCrystalReward = this.owner.getChildByName("MoreCrystalReward");
        this._levelNumText = this.owner.getChildByName("LevelNumText");
    };
    LevelStateBox.prototype.setData = function (data) {
        this._currentTag.visible = false;
        this._complateTag.visible = false;
        this._lockTag.visible = false;
        this._data = data;
        if (null != this._data) {
            var currentLevelNum = User_1.default.getLev_JJKLBB_eNum();
            this._levelNumText.value = String(this._data.levelNum);
            this._levelNumText.y = 69;
            if (currentLevelNum == this._data.levelNum) {
                this._currentTag.visible = true;
            }
            else if (currentLevelNum > this._data.levelNum) {
                this._complateTag.visible = true;
                this._levelNumText.y = 54;
            }
            else if (currentLevelNum < this._data.levelNum) {
                this._lockTag.visible = true;
            }
            this._noEnergyCost.visible = this._data.vedioCostNoEnergy == 1;
            this._moreCrystalReward.visible = this._data.vedioDoubleDiamond == 1;
        }
    };
    LevelStateBox.prototype.onClick = function () {
        var data = this._data;
        if (null != data) {
            var currentLevelNum = User_1.default.getLev_JJKLBB_eNum();
            if (currentLevelNum >= data.levelNum) {
                if (1 == data.vedioCostNoEnergy) {
                    LevelStateBox.LockClick = true;
                    WXAPI_1.default.showRewardedVideoAd(function (ok) {
                        if (ok) {
                            //不消耗体力开局
                            EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_Start_JJKLBB_Game, {
                                levelNum: data.levelNum,
                                costEnergy: data.costEnergy * 0,
                                crystalReward: data.getDiamond,
                            });
                            ViewMgr_1.default.insta_JJKLBB_nce.closeView(ViewMgr_1.View_JJKLBB_Def.LevelStateView);
                        }
                        else {
                            if (User_1.default.getEn_JJKLBB_ergy() < data.costEnergy) {
                                ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.FreeRewardView, {
                                    rewardType: FreeRewardView_1.FreeRewardType.Energy
                                });
                                ViewMgr_1.default.insta_JJKLBB_nce.showTips("You have no energy left");
                                return;
                            }
                            EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_Start_JJKLBB_Game, {
                                levelNum: data.levelNum,
                                costEnergy: data.costEnergy,
                                crystalReward: data.getDiamond,
                            });
                            ViewMgr_1.default.insta_JJKLBB_nce.closeView(ViewMgr_1.View_JJKLBB_Def.LevelStateView);
                        }
                        LevelStateBox.LockClick = false;
                    }, function () {
                        if (User_1.default.getEn_JJKLBB_ergy() < data.costEnergy) {
                            ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.FreeRewardView, {
                                rewardType: FreeRewardView_1.FreeRewardType.Energy
                            });
                            ViewMgr_1.default.insta_JJKLBB_nce.showTips("You have no energy left");
                            return;
                        }
                        //正常开局
                        LevelStateBox.LockClick = false;
                        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_Start_JJKLBB_Game, {
                            levelNum: data.levelNum,
                            costEnergy: data.costEnergy,
                            crystalReward: data.getDiamond,
                        });
                        ViewMgr_1.default.insta_JJKLBB_nce.closeView(ViewMgr_1.View_JJKLBB_Def.LevelStateView);
                    });
                }
                else if (1 == data.vedioDoubleDiamond) {
                    if (User_1.default.getEn_JJKLBB_ergy() < data.costEnergy) {
                        ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.FreeRewardView, {
                            rewardType: FreeRewardView_1.FreeRewardType.Energy
                        });
                        ViewMgr_1.default.insta_JJKLBB_nce.showTips("You have no energy left");
                        return;
                    }
                    WXAPI_1.default.showRewardedVideoAd(function (ok) {
                        if (ok) {
                            //双倍奖励开局
                            EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_Start_JJKLBB_Game, {
                                levelNum: data.levelNum,
                                costEnergy: data.costEnergy,
                                crystalReward: data.getDiamond * 2,
                            });
                            ViewMgr_1.default.insta_JJKLBB_nce.closeView(ViewMgr_1.View_JJKLBB_Def.LevelStateView);
                        }
                        else {
                            //正常开局
                            EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_Start_JJKLBB_Game, {
                                levelNum: data.levelNum,
                                costEnergy: data.costEnergy,
                                crystalReward: data.getDiamond,
                            });
                            ViewMgr_1.default.insta_JJKLBB_nce.closeView(ViewMgr_1.View_JJKLBB_Def.LevelStateView);
                        }
                        LevelStateBox.LockClick = false;
                    }, function () {
                        //正常开局
                        LevelStateBox.LockClick = false;
                        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_Start_JJKLBB_Game, {
                            levelNum: data.levelNum,
                            costEnergy: data.costEnergy,
                            crystalReward: data.getDiamond,
                        });
                        ViewMgr_1.default.insta_JJKLBB_nce.closeView(ViewMgr_1.View_JJKLBB_Def.LevelStateView);
                    });
                }
                else {
                    if (User_1.default.getEn_JJKLBB_ergy() < data.costEnergy) {
                        ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.FreeRewardView, {
                            rewardType: FreeRewardView_1.FreeRewardType.Energy
                        });
                        ViewMgr_1.default.insta_JJKLBB_nce.showTips("You have no energy left");
                        return;
                    }
                    //正常开局
                    EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_Start_JJKLBB_Game, {
                        levelNum: data.levelNum,
                        costEnergy: data.costEnergy,
                        crystalReward: data.getDiamond,
                    });
                    ViewMgr_1.default.insta_JJKLBB_nce.closeView(ViewMgr_1.View_JJKLBB_Def.LevelStateView);
                }
            }
        }
    };
    LevelStateBox.LockClick = false;
    return LevelStateBox;
}(Laya.Script));
exports.default = LevelStateBox;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Mgr/ViewMgr":32,"../../User/User":46,"../../WXAPI":70,"../FreeReward/FreeRewardView":53}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var User_1 = require("../../User/User");
var Utilit_1 = require("../../Utilit");
var LevelStateBox_1 = require("./LevelStateBox");
var LevelConfig_1 = require("../../Config/LevelConfig");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var WXAPI_1 = require("../../WXAPI");
var LevelStateView = /** @class */ (function (_super) {
    __extends(LevelStateView, _super);
    function LevelStateView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LevelStateView.prototype.onAwake = function () {
        this._topZone = this.owner.getChildByName("TopZone");
        if (Utilit_1.default.isIp_JJKLBB_honeX()) {
            this._topZone.top = 70;
        }
        this._crystalText = this._topZone.getChildByName("Crystal").getChildByName("Text");
        this._energyText = this._topZone.getChildByName("Energy").getChildByName("Text");
        this._closeBtn = this._topZone.getChildByName("CloseBtn");
        this._centerZone = this.owner.getChildByName("CenterZone");
        this._levelNumText = this._centerZone.getChildByName("LevelNumText");
        this._levelStateList = this._centerZone.getChildByName("List");
        this._levelStateList.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._levelStateList.vScrollBarSkin = "";
    };
    LevelStateView.prototype.addEvent = function () {
        var _this = this;
        this._closeBtn.on(Laya.Event.CLICK, this, function () {
            ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.MainView);
            _this.closeView();
        });
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.onCrystalChange);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.onEnergyChange);
    };
    LevelStateView.prototype.removeEvent = function () {
        this._closeBtn.on(Laya.Event.CLICK, this, this.closeView);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.onCrystalChange);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.onEnergyChange);
    };
    LevelStateView.prototype.openView = function (data) {
        _super.prototype.openView.call(this, data);
        WXAPI_1.default.showInterstitialAd(function () { }, function () { });
        this._crystalText.text = String(User_1.default.getCr_JJKLBB_ystal());
        this._energyText.text = String(User_1.default.getEn_JJKLBB_ergy());
        this._levelNumText.text = String(User_1.default.getLev_JJKLBB_eNum());
        this.refreshLevelStateList();
        for (var i = 0; i < this._levelStateList.array.length; ++i) {
            var d = this._levelStateList.array[i];
            if (d.levelNum == User_1.default.getLev_JJKLBB_eNum()) {
                this._levelStateList.scrollTo(i);
                break;
            }
        }
        LevelStateBox_1.default.LockClick = false;
    };
    LevelStateView.prototype.onCrystalChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._crystalText.text = String(curr);
    };
    LevelStateView.prototype.onEnergyChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._energyText.text = String(curr);
    };
    LevelStateView.prototype.onListRender = function (cell, index) {
        var data = this._levelStateList.array[index];
        var box = cell.getComponent(LevelStateBox_1.default);
        box.setData(data);
    };
    LevelStateView.prototype.refreshLevelStateList = function () {
        var levelDatas = LevelConfig_1.default.getIns_JJKLBB_tance().getLevelC_JJKLBB_onfigDatas();
        var dataArray = new Array();
        for (var i = 0; i < levelDatas.length; ++i) {
            var data = levelDatas[i].clone();
            dataArray.push(data);
        }
        this._levelStateList.array = dataArray;
    };
    return LevelStateView;
}(ViewBase_1.default));
exports.default = LevelStateView;
},{"../../Config/LevelConfig":7,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Mgr/ViewMgr":32,"../../User/User":46,"../../Utilit":47,"../../WXAPI":70,"../ViewBase":69,"./LevelStateBox":57}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var ShareAd_1 = require("../../ShareAd/ShareAd");
var LoadingView = /** @class */ (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._processWidth = 0;
        return _this;
    }
    LoadingView.prototype.onAwake = function () {
        this._bg = this.owner.getChildByName("Bg");
        this._processBarBg = this._bg.getChildByName("processBarBg");
        if (this._processBarBg) {
            this._processBar = this._processBarBg.getChildByName("processBar");
            this._processWidth = this._processBar.width;
            this._processBar.width = 20;
        }
        else {
            this._processBar = this._bg.getChildByName("processBar");
            this._processWidth = Laya.stage.width;
        }
        Laya.timer.once(6000, this, this.loadingJump);
    };
    LoadingView.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
    };
    LoadingView.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
        this._bg.on(Laya.Event.CLICK, this, this.loadingJump);
    };
    LoadingView.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
        this._bg.off(Laya.Event.CLICK, this, this.loadingJump);
    };
    LoadingView.prototype.onUpdate = function () {
        this._bg.width = Laya.stage.width;
        this._bg.height = Laya.stage.height;
        if (!this._processBarBg) {
            this._processWidth = Laya.stage.width;
        }
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
    LoadingView.prototype.loadingJump = function () {
        if (AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().popAdSwitch == 1) {
            ShareAd_1.default.Rando_JJKLBB_mJump(1);
        }
    };
    return LoadingView;
}(ViewBase_1.default));
exports.default = LoadingView;
},{"../../Config/AppSwitchConfig":4,"../../ShareAd/ShareAd":41,"../ViewBase":69}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var User_1 = require("../../User/User");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var WXAPI_1 = require("../../WXAPI");
var Utilit_1 = require("../../Utilit");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var FreeRewardView_1 = require("../FreeReward/FreeRewardView");
var WudianMgr_1 = require("../../Mgr/WudianMgr");
var MainView = /** @class */ (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainView.prototype.onAwake = function () {
        this._topZone = this.owner.getChildByName("TopZone");
        if (Utilit_1.default.isIp_JJKLBB_honeX()) {
            // this._topZone.top = 70;
            // (this.owner.getChildByName("SideAd_View") as Laya.UIComponent).top += 70;
            // (this.owner.getChildByName("ShakeLoopAd") as Laya.UIComponent).top += 70;
            // (this.owner.getChildByName("AniAd") as Laya.UIComponent).top += 70;
        }
        this._crystalText = this._topZone.getChildByName("FreeCrystalBtn").getChildByName("Text");
        this._energyText = this._topZone.getChildByName("FreeEnergyBtn").getChildByName("Text");
        this._centerZone = this.owner.getChildByName("CenterZone");
        this._autoZone = this.owner.getChildByName("BottomZone").getChildByName("AutoZone");
        this._startGameBtn = this._autoZone.getChildByName("StartGameBtn");
        // this._moreGameBtn = this._autoZone.getChildByName("MoreGameBtn") as Laya.Sprite;
        this._freeCryStalBtn = this._topZone.getChildByName("FreeCrystalBtn");
        this._freeEnergyBtn = this._topZone.getChildByName("FreeEnergyBtn");
        this._skinBtn = this._topZone.getChildByName("SkinBtn");
        // this._shareBtn = this._autoZone.getChildByName("ShareBtn") as Laya.Sprite;
    };
    MainView.prototype.addEvent = function () {
        this._startGameBtn.on(Laya.Event.CLICK, this, this.onStartGameBtn);
        // this._moreGameBtn.on(Laya.Event.CLICK, this, this.onMoreGameBtn);
        this._freeCryStalBtn.on(Laya.Event.CLICK, this, this.onFreeCrystalBtn);
        this._freeEnergyBtn.on(Laya.Event.CLICK, this, this.onFreeEnergyBtn);
        this._skinBtn.on(Laya.Event.CLICK, this, this.onSkinBtn);
        // this._shareBtn.on(Laya.Event.CLICK, this, this.onShareBtn);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.onCrystalChange);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.onEnergyChange);
        // Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.AD_OnShareAdFail_UseCancel,this,this.onMoreGameBtn);
        EventMgr_1.default.insta_JJKLBB_nce.regE_JJKLBB_vemt(EventDef_1.Event_JJKLBB_Def.AD_MainAdUiMask, this, this.changeAdMask);
    };
    MainView.prototype.removeEvent = function () {
        this._startGameBtn.off(Laya.Event.CLICK, this, this.onStartGameBtn);
        // this._moreGameBtn.off(Laya.Event.CLICK, this, this.onMoreGameBtn);
        this._freeCryStalBtn.off(Laya.Event.CLICK, this, this.onFreeCrystalBtn);
        this._freeEnergyBtn.off(Laya.Event.CLICK, this, this.onFreeEnergyBtn);
        this._skinBtn.off(Laya.Event.CLICK, this, this.onSkinBtn);
        // this._shareBtn.off(Laya.Event.CLICK, this, this.onShareBtn);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.onCrystalChange);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.onEnergyChange);
        // Even_JJKLBB_tMgr.insta_JJKLBB_nce.remov_JJKLBB_eEvent(Event_JJKLBB_Def.AD_OnShareAdFail_UseCancel,this,this.onMoreGameBtn);
        EventMgr_1.default.insta_JJKLBB_nce.remov_JJKLBB_eEvent(EventDef_1.Event_JJKLBB_Def.AD_MainAdUiMask, this, this.changeAdMask);
    };
    MainView.prototype.openView = function (data) {
        _super.prototype.openView.call(this, data);
        this._crystalText.text = String(User_1.default.getCr_JJKLBB_ystal());
        this._energyText.text = String(User_1.default.getEn_JJKLBB_ergy());
    };
    MainView.prototype.onCrystalChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._crystalText.text = String(curr);
    };
    MainView.prototype.onEnergyChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._energyText.text = String(curr);
    };
    MainView.prototype.onFreeEnergyBtn = function () {
        ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.FreeRewardView, {
            rewardType: FreeRewardView_1.FreeRewardType.Energy
        });
    };
    MainView.prototype.onFreeCrystalBtn = function () {
        ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.FreeRewardView, {
            rewardType: FreeRewardView_1.FreeRewardType.Crystal
        });
    };
    MainView.prototype.onSkinBtn = function () {
        ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.ActorSkinView);
    };
    MainView.prototype.onShareBtn = function () {
        WXAPI_1.default.share(function (ok) {
        }, "恐龙宝宝被人绑架了，快来救救它吧！", "subRes/image/fenxiang.png");
    };
    MainView.prototype.onMoreGameBtn = function () {
        ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.MoreGameView);
    };
    MainView.prototype.onStartGameBtn = function () {
        this.closeView();
        if (WudianMgr_1.default.WudianFlag) {
            ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.GameOverSkin);
        }
        else {
            ViewMgr_1.default.insta_JJKLBB_nce.openView(ViewMgr_1.View_JJKLBB_Def.LevelStateView);
        }
    };
    MainView.prototype.onShow = function () {
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_PlayBgm);
    };
    MainView.prototype.changeAdMask = function (visible) {
        this._adUIMask.visible = visible;
    };
    return MainView;
}(ViewBase_1.default));
exports.default = MainView;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Mgr/ViewMgr":32,"../../Mgr/WudianMgr":33,"../../User/User":46,"../../Utilit":47,"../../WXAPI":70,"../FreeReward/FreeRewardView":53,"../ViewBase":69}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var Utilit_1 = require("../../Utilit");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var ALD_1 = require("../../ALD");
var ShareAd_1 = require("../../ShareAd/ShareAd");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var CachedWXBannerAd_1 = require("../../CachedWXBannerAd");
var MoreGameView = /** @class */ (function (_super) {
    __extends(MoreGameView, _super);
    function MoreGameView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoreGameView.prototype.onAwake = function () {
        this._topZone = this.owner.getChildByName("TopZone");
        if (Utilit_1.default.isIp_JJKLBB_honeX()) {
            this._topZone.top = 70;
        }
        this._closeBtn = this._topZone.getChildByName("CloseBtn");
        this._closeBtn2 = this._topZone.getChildByName("CloseBtn2");
    };
    MoreGameView.prototype.onShow = function () {
        var _this = this;
        CachedWXBannerAd_1.default.hide();
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.AD_SwitchBanner, [false]);
        ShareAd_1.default.Rando_JJKLBB_mJump(AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().popAdSwitch);
        if (this._data && this._data.closeFunction) {
            this.onCloseEvent = this._data.closeFunction;
        }
        if (this._data && this._data.ContinueGame) {
            ALD_1.default.aldSendOnlySingleReport(ALD_1.ALDEv_JJKLBB_entDef.EnterGameOverMoreGame);
            this._closeBtn.visible = false;
            var time = AppSwitchConfig_1.default.getInst_JJKLBB_ance().getAppS_JJKLBB_witchData().btnDelayTime * 1000;
            Laya.timer.once(time, this, function () {
                _this._closeBtn2.visible = true;
            });
        }
        else {
            this._closeBtn2.visible = false;
            this._closeBtn.visible = true;
            // this.onCloseEvent = () => {
            //     if(View_JJKLBB_Mgr.insta_JJKLBB_nce.getView(View_JJKLBB_Def.MainView) == null){
            //         View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.MainView);
            //     }
            // }
        }
    };
    MoreGameView.prototype.onClose = function () {
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.AD_SwitchBanner, [true]);
        _super.prototype.onClose.call(this);
    };
    MoreGameView.prototype.addEvent = function () {
        this._closeBtn.on(Laya.Event.CLICK, this, this.closeView);
        this._closeBtn2.on(Laya.Event.CLICK, this, this.closeView);
    };
    MoreGameView.prototype.removeEvent = function () {
        this._closeBtn.off(Laya.Event.CLICK, this, this.closeView);
        this._closeBtn2.off(Laya.Event.CLICK, this, this.closeView);
    };
    return MoreGameView;
}(ViewBase_1.default));
exports.default = MoreGameView;
},{"../../ALD":1,"../../CachedWXBannerAd":3,"../../Config/AppSwitchConfig":4,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../ShareAd/ShareAd":41,"../../Utilit":47,"../ViewBase":69}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scale_JJKLBB_Breathing_JJKLBB_Ani = /** @class */ (function (_super) {
    __extends(Scale_JJKLBB_Breathing_JJKLBB_Ani, _super);
    function Scale_JJKLBB_Breathing_JJKLBB_Ani() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.breat_JJKLBB_hingSpeed = 2000;
        _this.maxS_JJKLBB_cale = 1;
        _this.minS_JJKLBB_cale = 0.9;
        _this._a_JJKLBB_dd = false;
        return _this;
    }
    Scale_JJKLBB_Breathing_JJKLBB_Ani.prototype.onAwake = function () {
        this._own_JJKLBB_erSprite = this.owner;
    };
    Scale_JJKLBB_Breathing_JJKLBB_Ani.prototype.onStart = function () {
        this._own_JJKLBB_erSprite.scale(this.maxS_JJKLBB_cale, this.maxS_JJKLBB_cale);
    };
    Scale_JJKLBB_Breathing_JJKLBB_Ani.prototype.onEnable = function () {
        this._own_JJKLBB_erSprite.on(Laya.Event.FOCUS_CHANGE, this, this.onFoc_JJKLBB_usChange);
    };
    Scale_JJKLBB_Breathing_JJKLBB_Ani.prototype.onDisable = function () {
        this._own_JJKLBB_erSprite.off(Laya.Event.FOCUS_CHANGE, this, this.onFoc_JJKLBB_usChange);
    };
    Scale_JJKLBB_Breathing_JJKLBB_Ani.prototype.onUpdate = function () {
        if (this._own_JJKLBB_erSprite.visible) {
            this.bg_JJKLBB_Ani();
        }
    };
    Scale_JJKLBB_Breathing_JJKLBB_Ani.prototype.bg_JJKLBB_Ani = function () {
        var delta = Math.min(50, Laya.timer.delta);
        if (!this._a_JJKLBB_dd) {
            var value = this._own_JJKLBB_erSprite.scaleX - delta / this.breat_JJKLBB_hingSpeed * 1;
            value = Math.max(this.minS_JJKLBB_cale, value);
            this._own_JJKLBB_erSprite.scale(value, value);
            if (this._own_JJKLBB_erSprite.scaleX <= this.minS_JJKLBB_cale) {
                this._a_JJKLBB_dd = true;
            }
        }
        else {
            var value = this._own_JJKLBB_erSprite.scaleX + delta / this.breat_JJKLBB_hingSpeed * 1;
            value = Math.min(this.maxS_JJKLBB_cale, value);
            this._own_JJKLBB_erSprite.scale(value, value);
            if (this._own_JJKLBB_erSprite.scaleX >= this.maxS_JJKLBB_cale) {
                this._a_JJKLBB_dd = false;
            }
        }
    };
    Scale_JJKLBB_Breathing_JJKLBB_Ani.prototype.onFoc_JJKLBB_usChange = function () {
        this._own_JJKLBB_erSprite.scale(this.maxS_JJKLBB_cale, this.maxS_JJKLBB_cale);
        this._a_JJKLBB_dd = false;
    };
    return Scale_JJKLBB_Breathing_JJKLBB_Ani;
}(Laya.Script));
exports.default = Scale_JJKLBB_Breathing_JJKLBB_Ani;
},{}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var User_1 = require("../../User/User");
var WXAPI_1 = require("../../WXAPI");
var GameCommonConfig_1 = require("../../Config/GameCommonConfig");
var SignInRewardView = /** @class */ (function (_super) {
    __extends(SignInRewardView, _super);
    function SignInRewardView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignInRewardView.prototype.onAwake = function () {
        this._centerZone = this.owner.getChildByName("CenterZone");
        this._signInBtn = this._centerZone.getChildByName("SignInBtn");
        this._normalSignInBtn = this._centerZone.getChildByName("NormalSignInBtn");
        this._rewardText = this._centerZone.getChildByName("RewardText");
        this._closeBtn = this._centerZone.getChildByName("CloseBtn");
    };
    SignInRewardView.prototype.addEvent = function () {
        this._signInBtn.on(Laya.Event.CLICK, this, this.onSignInBtn);
        this._normalSignInBtn.on(Laya.Event.CLICK, this, this.onNormalSignInBtn);
        this._closeBtn.on(Laya.Event.CLICK, this, this.closeView);
    };
    SignInRewardView.prototype.removeEvent = function () {
        this._signInBtn.off(Laya.Event.CLICK, this, this.onSignInBtn);
        this._normalSignInBtn.off(Laya.Event.CLICK, this, this.onNormalSignInBtn);
        this._closeBtn.off(Laya.Event.CLICK, this, this.closeView);
    };
    SignInRewardView.prototype.openView = function (data) {
        _super.prototype.openView.call(this, data);
        this._rewardText.text = "x" + GameCommonConfig_1.default.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().signGetDiamond;
    };
    SignInRewardView.prototype.onSignInBtn = function () {
        if (this.canSignIn()) {
            var self = this;
            this._signInBtn.visible = false;
            WXAPI_1.default.showRewardedVideoAd(function (ok) {
                if (ok) {
                    User_1.default.setlast_JJKLBB_SignInTime(Date.now());
                    var reward = GameCommonConfig_1.default.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().signGetDiamond;
                    User_1.default.addCrys_JJKLBB_tal(reward * 3);
                }
                else {
                }
                self.refreshSignInBtnState();
            }, function () {
                self.refreshSignInBtnState();
            });
        }
    };
    SignInRewardView.prototype.onNormalSignInBtn = function () {
        if (this.canSignIn()) {
            User_1.default.setlast_JJKLBB_SignInTime(Date.now());
            var reward = GameCommonConfig_1.default.getIn_JJKLBB_stance().getGame_JJKLBB_ConfigData().signGetDiamond;
            User_1.default.addCrys_JJKLBB_tal(reward);
            this.refreshSignInBtnState();
        }
    };
    SignInRewardView.prototype.canSignIn = function () {
        var lastDate = new Date(User_1.default.getlast_JJKLBB_SignInTime());
        var curDate = new Date(Date.now());
        if (Date.now() - User_1.default.getlast_JJKLBB_SignInTime() >= 86400000 || lastDate.getUTCDay() != curDate.getUTCDay()) {
            return true;
        }
        return false;
    };
    SignInRewardView.prototype.refreshSignInBtnState = function () {
        this._signInBtn.visible = this.canSignIn();
    };
    return SignInRewardView;
}(ViewBase_1.default));
exports.default = SignInRewardView;
},{"../../Config/GameCommonConfig":5,"../../User/User":46,"../../WXAPI":70,"../ViewBase":69}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var TipsV_JJKLBB_iew = /** @class */ (function (_super) {
    __extends(TipsV_JJKLBB_iew, _super);
    function TipsV_JJKLBB_iew() {
        return _super.call(this) || this;
    }
    TipsV_JJKLBB_iew.prototype.onAwake = function () {
        this._b_JJKLBB_g = this.owner.getChildByName("Bg");
        this._b_JJKLBB_g.x = Laya.stage.width / 2 - this._b_JJKLBB_g.width / 2;
        this._tipsT_JJKLBB_ext = this._b_JJKLBB_g.getChildByName("Text");
    };
    TipsV_JJKLBB_iew.prototype.addEvent = function () {
        _super.prototype.addEvent.call(this);
    };
    TipsV_JJKLBB_iew.prototype.removeEvent = function () {
        _super.prototype.removeEvent.call(this);
    };
    TipsV_JJKLBB_iew.prototype.openView = function (data) {
        _super.prototype.openView.call(this, data);
        this.setTi_JJKLBB_psMsg(data);
        this._b_JJKLBB_g.alpha = 1;
        Laya.timer.clearAll(this);
        Laya.timer.once(2000, this, this.closeView);
        var self = this;
        Laya.Tween.to(this._b_JJKLBB_g, {
            alpha: 0
        }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            self.closeView();
        }), 1500, true);
    };
    TipsV_JJKLBB_iew.prototype.setTi_JJKLBB_psMsg = function (msg) {
        this._tipsT_JJKLBB_ext.text = msg;
    };
    return TipsV_JJKLBB_iew;
}(ViewBase_1.default));
exports.default = TipsV_JJKLBB_iew;
},{"../ViewBase":69}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Middle_JJKLBB_Anchor = /** @class */ (function (_super) {
    __extends(Middle_JJKLBB_Anchor, _super);
    function Middle_JJKLBB_Anchor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Middle_JJKLBB_Anchor.prototype.onAwake = function () {
        var sp = this.owner;
        var parentSp = this.owner.parent;
        if (parentSp) {
            var pw = parentSp.width;
            var x = pw / 2;
            sp.x = x;
        }
    };
    return Middle_JJKLBB_Anchor;
}(Laya.Script));
exports.default = Middle_JJKLBB_Anchor;
},{}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var View_JJKLBB_Auto_JJKLBB_Scale = /** @class */ (function (_super) {
    __extends(View_JJKLBB_Auto_JJKLBB_Scale, _super);
    function View_JJKLBB_Auto_JJKLBB_Scale() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    View_JJKLBB_Auto_JJKLBB_Scale.prototype.onAwake = function () {
        var realH = Laya.stage.height;
        var scale = realH / View_JJKLBB_Auto_JJKLBB_Scale.baseHeight;
        var ps = this.owner;
        ps.scale(scale, scale);
    };
    View_JJKLBB_Auto_JJKLBB_Scale.baseWidth = 750;
    View_JJKLBB_Auto_JJKLBB_Scale.baseHeight = 1334;
    return View_JJKLBB_Auto_JJKLBB_Scale;
}(Laya.Script));
exports.default = View_JJKLBB_Auto_JJKLBB_Scale;
},{}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var View_JJKLBB_Auto_JJKLBB_ScaleByW = /** @class */ (function (_super) {
    __extends(View_JJKLBB_Auto_JJKLBB_ScaleByW, _super);
    function View_JJKLBB_Auto_JJKLBB_ScaleByW() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    View_JJKLBB_Auto_JJKLBB_ScaleByW.prototype.onAwake = function () {
        var realW = Laya.stage.width;
        var scale = realW / View_JJKLBB_Auto_JJKLBB_ScaleByW.baseWidth;
        var ps = this.owner;
        ps.scale(scale, scale);
    };
    View_JJKLBB_Auto_JJKLBB_ScaleByW.baseWidth = 750;
    View_JJKLBB_Auto_JJKLBB_ScaleByW.baseHeight = 1334;
    return View_JJKLBB_Auto_JJKLBB_ScaleByW;
}(Laya.Script));
exports.default = View_JJKLBB_Auto_JJKLBB_ScaleByW;
},{}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Twinkl_JJKLBB_eSprite = /** @class */ (function (_super) {
    __extends(Twinkl_JJKLBB_eSprite, _super);
    function Twinkl_JJKLBB_eSprite() {
        var _this = _super.call(this) || this;
        /** @prop {name:TwinkleSpeed, tips:"闪动速度", type:Number, default:1000}*/
        _this.TwinkleSpeed = 1000;
        /** @prop {name:TwinkleMinSize, tips:"最小缩放", type:Number, default:0.95}*/
        _this.TwinkleMinSize = 0.95;
        /** @prop {name:TwinkleMaxSize, tips:"最大缩放", type:Number, default:1.05}*/
        _this.TwinkleMaxSize = 1.05;
        _this._aniF_JJKLBB_orward = false;
        _this._font_JJKLBB_Size = 25;
        _this._ori_JJKLBB_ginSize = 1;
        return _this;
    }
    Twinkl_JJKLBB_eSprite.prototype.onAwake = function () {
        this._displ_JJKLBB_aySp = this.owner;
        this._dis_JJKLBB_Text = this.owner.getChildByName("TitelText");
        this._ori_JJKLBB_ginSize = this._displ_JJKLBB_aySp.scaleX;
        if (this._dis_JJKLBB_Text != null) {
            this._dis_JJKLBB_Text.text = "";
            this._font_JJKLBB_Size = this._dis_JJKLBB_Text.fontSize;
        }
    };
    Twinkl_JJKLBB_eSprite.prototype.onEnable = function () {
        this._displ_JJKLBB_aySp.scale(this._ori_JJKLBB_ginSize, this._ori_JJKLBB_ginSize);
    };
    Twinkl_JJKLBB_eSprite.prototype.onDisable = function () {
    };
    Twinkl_JJKLBB_eSprite.prototype.onUpdate = function () {
        this.displ_JJKLBB_ayAni();
    };
    Twinkl_JJKLBB_eSprite.prototype.displ_JJKLBB_ayAni = function () {
        if (!this._aniF_JJKLBB_orward) {
            var scale = this._displ_JJKLBB_aySp.scaleX - Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.max(scale, this.TwinkleMinSize * this._ori_JJKLBB_ginSize);
            this._displ_JJKLBB_aySp.scale(scale, scale);
            if (this._displ_JJKLBB_aySp.scaleX <= this.TwinkleMinSize * this._ori_JJKLBB_ginSize) {
                this._aniF_JJKLBB_orward = true;
            }
        }
        else {
            var scale = this._displ_JJKLBB_aySp.scaleX + Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.min(scale, this.TwinkleMaxSize * this._ori_JJKLBB_ginSize);
            this._displ_JJKLBB_aySp.scale(scale, scale);
            if (this._displ_JJKLBB_aySp.scaleX >= this.TwinkleMaxSize * this._ori_JJKLBB_ginSize) {
                this._aniF_JJKLBB_orward = false;
            }
        }
    };
    return Twinkl_JJKLBB_eSprite;
}(Laya.Script));
exports.default = Twinkl_JJKLBB_eSprite;
},{}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("../Mgr/ViewMgr");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
//界面基类，所有功能模块界面继承于这个类。这种类型的界面不能嵌套。
var ViewBase = /** @class */ (function (_super) {
    __extends(ViewBase, _super);
    function ViewBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onCloseEvent = null;
        _this.onOpenEvent = null;
        _this._viewBase = true;
        _this._viewDef = ViewMgr_1.View_JJKLBB_Def.None;
        _this._data = {};
        return _this;
    }
    ViewBase.prototype.onAwake = function () {
        //删除时自动释放
        this.owner.autoDestroyAtClosed = true;
        this.owner.height = Laya.stage.height;
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
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_OnVie_JJKLBB_wOpen, { view: this._viewDef });
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
        ViewMgr_1.default.insta_JJKLBB_nce.closeView(this._viewDef);
    };
    ViewBase.prototype.hide = function () {
        this.owner.visible = false;
        this.onHide();
    };
    ViewBase.prototype.show = function () {
        this.owner.visible = true;
        this.onShow();
    };
    ViewBase.prototype.viewIsHide = function () {
        return this.owner.alpha == 0;
    };
    ViewBase.prototype.onHide = function () { };
    ViewBase.prototype.onShow = function () { };
    ViewBase.prototype.onClose = function () {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        EventMgr_1.default.insta_JJKLBB_nce.dispa_JJKLBB_tch(EventDef_1.Event_JJKLBB_Def.Game_OnVie_JJKLBB_wClose, { view: this._viewDef });
        if (this.onCloseEvent) {
            this.onCloseEvent();
        }
    };
    return ViewBase;
}(Laya.Script));
exports.default = ViewBase;
},{"../Event/EventDef":9,"../Event/EventMgr":10,"../Mgr/ViewMgr":32}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        // View_JJKLBB_Mgr.insta_JJKLBB_nce.showTips("今日视频已经看完");
        // if(onFailed)
        // {
        //     onAdClose(false);
        // }
        // return;
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
            // console.log("场景值 " + obj.scene);
            var str = JSON.stringify(obj_1.query);
            // console.log("Query参数 " + str);
            var key = obj_1.query["key"];
            // console.log("Query参数：key " + key);
            // console.log("ShareTicket " + obj.shareTicket);
            // console.log("ReferrerInfo.appId " + obj.referrerInfo.appId);
            // console.log("ReferrerInfo.extraData " + obj.referrerInfo.extraData);
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
    WXAPI.adUnitId = "adunit-96082578ce9bf9b0";
    WXAPI.bannerAdUnitId = "adunit-863dbccf65dbf276";
    WXAPI.InsAdUnitId = "adunit-08ebd0a4fe9d0680";
    //-------------------------激励视频---------------------------------
    WXAPI._isRegRewardedVideoAdEvent = false;
    WXAPI._onRewardedVideoAdFailed = null;
    WXAPI._onRewardedVideoAdClose = null;
    //----------------------------------------------------------------------
    //---------------------分享----------------------------------------
    WXAPI._onShow = null;
    WXAPI._lastShareTime = 0;
    return WXAPI;
}());
exports.default = WXAPI;
},{}],71:[function(require,module,exports){
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
            LoadingUI.uiView = { "type": "Scene", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Image", "props": { "x": 0, "width": 750, "top": 0, "skin": "GameCommon/bgbg.png", "height": 2000 }, "compId": 12 }, { "type": "Image", "props": { "top": 0, "right": 0, "name": "Bg", "left": 0, "hitTestPrior": true, "bottom": 0 }, "compId": 6, "child": [{ "type": "Sprite", "props": { "y": 1083, "x": 64, "width": 620, "texture": "GameCommon/bg12.png", "name": "processBarBg", "height": 65 }, "compId": 9, "child": [{ "type": "Clip", "props": { "y": 11, "x": 12, "width": 597, "skin": "GameCommon/bg11.png", "name": "processBar", "height": 40, "sizeGrid": "0,10,0,10" }, "compId": 11 }] }, { "type": "Sprite", "props": { "y": 1005, "x": 241, "texture": "GameCommon/jiazaizhong.png", "scaleY": 1.5, "scaleX": 1.5 }, "compId": 13 }, { "type": "Sprite", "props": { "y": 467, "x": 175, "texture": "GameCommon/41_0016_logo.png" }, "compId": 14 }] }, { "type": "Script", "props": { "y": 0, "x": 0, "runtime": "View/LoadingView/LoadingView.ts" }, "compId": 7 }], "loadList": ["GameCommon/bgbg.png", "GameCommon/bg12.png", "GameCommon/bg11.png", "GameCommon/jiazaizhong.png", "GameCommon/41_0016_logo.png"], "loadList3D": [] };
            return LoadingUI;
        }(Scene));
        View.LoadingUI = LoadingUI;
        REG("ui.View.LoadingUI", LoadingUI);
    })(View = ui.View || (ui.View = {}));
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[29])