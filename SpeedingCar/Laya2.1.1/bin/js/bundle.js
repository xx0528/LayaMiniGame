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
var ALD_wcjtn_Event_wcjtn_Def;
(function (ALD_wcjtn_Event_wcjtn_Def) {
    ALD_wcjtn_Event_wcjtn_Def["None"] = "";
    ALD_wcjtn_Event_wcjtn_Def["Report_wcjtn_AdClickSuccess"] = "\u5E7F\u544A\u5BFC\u51FA\u6210\u529F";
    ALD_wcjtn_Event_wcjtn_Def["Report_wcjtn_AdClickFail"] = "\u5E7F\u544A\u5BFC\u51FA\u5931\u8D25";
    ALD_wcjtn_Event_wcjtn_Def["Report_wcjtn_LaunchOptions"] = "\u7528\u6237\u542F\u52A8\u53C2\u6570";
    //todo:添加你自己的阿拉丁事件
})(ALD_wcjtn_Event_wcjtn_Def = exports.ALD_wcjtn_Event_wcjtn_Def || (exports.ALD_wcjtn_Event_wcjtn_Def = {}));
//阿拉丁相关接口
var ALD = /** @class */ (function () {
    function ALD() {
    }
    ALD.ald_wcjtn_Send_wcjtn_OpenId = function (openid) {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ", openid);
        }
        else if (Laya.Browser.onQQMiniGame) {
            Laya.Browser.window["qq"].aldSendOpenid(openid);
            console.log("ALD 上报 openid : ", openid);
        }
    };
    ALD.ald_wcjtn_Send_wcjtn_Event = function (event, data) {
        var eventName = event;
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].aldSendEvent(eventName, data);
        }
        else if (Laya.Browser.onQQMiniGame) {
            Laya.Browser.window["qq"].aldSendEvent(eventName, data);
        }
    };
    ALD.ald_wcjtn_Send_wcjtn_ReportAdClickSuccess = function (data) {
        var type = ALD_wcjtn_Event_wcjtn_Def.Report_wcjtn_AdClickSuccess + " " + data.title + ":" + String(data.appid);
        ALD.ald_wcjtn_Send_wcjtn_Event(type, {
            "导出成功": data.title + ":" + String(data.appid)
        });
    };
    ALD.aldSend_wcjtn_ReportAd_wcjtn_ClickFail = function (data) {
        var type = ALD_wcjtn_Event_wcjtn_Def.Report_wcjtn_AdClickFail + " " + data.title + ":" + String(data.appid);
        ALD.ald_wcjtn_Send_wcjtn_Event(type, {
            "导出失败": data.title + ":" + String(data.appid)
        });
    };
    ALD.ald_wcjtn_Send_wcjtn_Report_wcjtn_LaunchOptions = function (sceneid, ip, location) {
        var type = ALD_wcjtn_Event_wcjtn_Def.Report_wcjtn_LaunchOptions;
        ALD.ald_wcjtn_Send_wcjtn_Event(type, {
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
var App_wcjtn_Config = /** @class */ (function () {
    function App_wcjtn_Config() {
    }
    App_wcjtn_Config.App_wcjtn_ID = "";
    App_wcjtn_Config.Res_wcjtn_Server = ""; //资源服务器地址
    App_wcjtn_Config.Local_wcjtn_Test_wcjtn_ReServer = "subRes"; //本地测试资源服务器地址
    App_wcjtn_Config.Versions_wcjtn_ = "0.0.0";
    App_wcjtn_Config.onTTMiniGame = false; //是否是头条小游戏
    App_wcjtn_Config.Game_wcjtn_Name = ""; //游戏名称
    App_wcjtn_Config.showLoadingLogo = false; //是否再在加载界面显示公司Logo;
    return App_wcjtn_Config;
}());
exports.default = App_wcjtn_Config;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
var Cached_wcjtn_QQ_wcjtn_BannerAd = /** @class */ (function () {
    function Cached_wcjtn_QQ_wcjtn_BannerAd() {
    }
    Cached_wcjtn_QQ_wcjtn_BannerAd.pre_wcjtn_load_wcjtn_Banner = function () {
    };
    Cached_wcjtn_QQ_wcjtn_BannerAd._wcjtn_show_wcjtn_ = function (bannerid) {
        var wxWuDianBanners = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wx_wcjtn_Wu_wcjtn_Dian_wcjtn_Banners;
        var bannerTodayBannerMax = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Today_wcjtn_Banner_wcjtn_Max;
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
                Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Load = function (res) {
                    console.log("CachedQQBanner 广告 加载完成", bannerid);
                    console.log(res);
                    if (!self_1._is_wcjtn_Hide) {
                        banner_1.show();
                    }
                    else {
                        banner_1.offLoad(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Load);
                        banner_1.offError(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Error);
                        banner_1.destroy();
                    }
                };
                banner_1.onLoad(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Load);
                Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Error = function (err) {
                    console.log("CachedQQBanner 广告 加载失败", bannerid);
                    console.log(err);
                    banner_1.offLoad(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Load);
                    banner_1.offError(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Error);
                    banner_1.destroy();
                };
                banner_1.onError(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Error);
                Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner = banner_1;
            }
        }
        Cached_wcjtn_QQ_wcjtn_BannerAd._is_wcjtn_Hide = false;
    };
    Cached_wcjtn_QQ_wcjtn_BannerAd.hide = function () {
        Cached_wcjtn_QQ_wcjtn_BannerAd._is_wcjtn_Hide = true;
        Laya.timer.clearAll(Cached_wcjtn_QQ_wcjtn_BannerAd);
        if (null != Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner) {
            Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner.hide();
            Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner.offLoad(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Load);
            Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner.offError(Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Error);
            Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner.destroy();
            Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner = null;
            console.log("CachedQQBanner 广告隐藏");
        }
    };
    Cached_wcjtn_QQ_wcjtn_BannerAd.change_wcjtn_Show = function () {
        if (null != Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner) {
            Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner.hide();
            Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner = null;
        }
        Cached_wcjtn_QQ_wcjtn_BannerAd._wcjtn_show_wcjtn_();
    };
    Cached_wcjtn_QQ_wcjtn_BannerAd._wcjtn_clear_wcjtn_ = function () {
    };
    Cached_wcjtn_QQ_wcjtn_BannerAd._cur_wcjtn_Banner = null;
    Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Load = null;
    Cached_wcjtn_QQ_wcjtn_BannerAd._on_wcjtn_Error = null;
    Cached_wcjtn_QQ_wcjtn_BannerAd._is_wcjtn_Hide = true;
    return Cached_wcjtn_QQ_wcjtn_BannerAd;
}());
exports.default = Cached_wcjtn_QQ_wcjtn_BannerAd;
},{"./Config/AppSwitchConfig":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
var Cached_wcjtn_WX_wcjtn_BannerAd = /** @class */ (function () {
    function Cached_wcjtn_WX_wcjtn_BannerAd() {
    }
    Cached_wcjtn_WX_wcjtn_BannerAd.pre_wcjtn_load_wcjtn_Banner = function () {
        var wxWuDianBanners = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wx_wcjtn_Wu_wcjtn_Dian_wcjtn_Banners;
        var bannerTodayBannerMax = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Today_wcjtn_Banner_wcjtn_Max;
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
        Laya.timer.loop(2000, Cached_wcjtn_WX_wcjtn_BannerAd._pre_wcjtn_Loop_wcjtn_Obj, function () {
            if (counter >= preLoadBanners.length) {
                Laya.timer.clearAll(Cached_wcjtn_WX_wcjtn_BannerAd._pre_wcjtn_Loop_wcjtn_Obj);
                return;
            }
            var bannerid = preLoadBanners[counter];
            var banner = Cached_wcjtn_WX_wcjtn_BannerAd._banner_wcjtn_Cache[bannerid];
            if (null == banner) {
                banner = Cached_wcjtn_WX_wcjtn_BannerAd._wcjtn_create_wcjtn_(bannerid);
                if (null != banner) {
                    Cached_wcjtn_WX_wcjtn_BannerAd._banner_wcjtn_Cache[bannerid] = banner;
                    console.log("预创建微信Bannaer", bannerid, "完成");
                }
            }
            ++counter;
        });
    };
    Cached_wcjtn_WX_wcjtn_BannerAd.get_wcjtn_Banner = function (bannerid) {
        if (null == bannerid || "" == bannerid)
            return null;
        var banner = Cached_wcjtn_WX_wcjtn_BannerAd._banner_wcjtn_Cache[bannerid];
        if (null == banner) {
            banner = Cached_wcjtn_WX_wcjtn_BannerAd._wcjtn_create_wcjtn_(bannerid);
            if (null != banner) {
                Cached_wcjtn_WX_wcjtn_BannerAd._banner_wcjtn_Cache[bannerid] = banner;
            }
        }
        return banner;
    };
    Cached_wcjtn_WX_wcjtn_BannerAd._wcjtn_create_wcjtn_ = function (bannerid) {
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
    Cached_wcjtn_WX_wcjtn_BannerAd._wcjtn_show_wcjtn_ = function () {
        if (null != Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner) {
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner.hide();
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner = null;
        }
        var wuDianBanners = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wx_wcjtn_Wu_wcjtn_Dian_wcjtn_Banners;
        var bannerid = wuDianBanners[Math.floor(Math.random() * wuDianBanners.length)];
        var banner = Cached_wcjtn_WX_wcjtn_BannerAd.get_wcjtn_Banner(bannerid);
        if (banner) {
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner = banner;
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner.style.top = (Laya.stage.height - 240) / Laya.stage.height * sh;
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner.show();
            console.log("CachedWXBanner 广告显示 bannerid ： ", bannerid);
        }
        var time = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Fresh_wcjtn_Timer;
        //Laya.timer.once(time * 1000,CachedWXBannerAd,CachedWXBannerAd.changeShow);
    };
    Cached_wcjtn_WX_wcjtn_BannerAd._wcjtn_hide_wcjtn_ = function () {
        Laya.timer.clearAll(Cached_wcjtn_WX_wcjtn_BannerAd);
        if (null != Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner) {
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner.hide();
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner = null;
        }
        console.log("CachedWXBanner 广告隐藏");
    };
    Cached_wcjtn_WX_wcjtn_BannerAd.change_wcjtn_Show = function () {
        if (null != Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner) {
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner.hide();
            Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner = null;
        }
        Cached_wcjtn_WX_wcjtn_BannerAd._wcjtn_show_wcjtn_();
    };
    Cached_wcjtn_WX_wcjtn_BannerAd._wcjtn_clear_wcjtn_ = function () {
        Laya.timer.clearAll(Cached_wcjtn_WX_wcjtn_BannerAd);
        for (var key in Cached_wcjtn_WX_wcjtn_BannerAd._banner_wcjtn_Cache) {
            var banner = Cached_wcjtn_WX_wcjtn_BannerAd._banner_wcjtn_Cache[key];
            if (null != banner) {
                banner.destroy();
            }
            Cached_wcjtn_WX_wcjtn_BannerAd._banner_wcjtn_Cache[key] = null;
        }
    };
    Cached_wcjtn_WX_wcjtn_BannerAd._banner_wcjtn_Cache = {};
    Cached_wcjtn_WX_wcjtn_BannerAd._cur_wcjtn_Banner = null;
    Cached_wcjtn_WX_wcjtn_BannerAd._pre_wcjtn_Loop_wcjtn_Obj = {};
    return Cached_wcjtn_WX_wcjtn_BannerAd;
}());
exports.default = Cached_wcjtn_WX_wcjtn_BannerAd;
},{"./Config/AppSwitchConfig":6}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utilit_1 = require("./Utilit");
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
        var elapsedTime = Utilit_1.default.safeDelta();
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
},{"./Utilit":81}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("../AppConfig");
var App_wcjtn_Switch_wcjtn_Data = /** @class */ (function () {
    function App_wcjtn_Switch_wcjtn_Data() {
        this.ver_wcjtn_sion = "";
        this.ba_wcjtn_nner = 0;
        this.wu_wcjtn_dian = 0;
        this.wudianAvailableTime = {
            "0": 0, "1": 0, "2": 0, "3": 0,
            "4": 0, "5": 0, "6": 0, "7": 0,
            "8": 0, "9": 0, "10": 0, "11": 0,
            "12": 0, "13": 0, "14": 0, "15": 0,
            "16": 0, "17": 0, "18": 0, "19": 0,
            "20": 0, "21": 0, "22": 0, "23": 0
        };
        this.mai_wcjtn_liang = 1;
        this.mailiang_wcjtn_list = new Array();
        this.mailiang_wcjtn_Scene_wcjtn_List = new Array();
        this.wx_wcjtn_Wu_wcjtn_Dian_wcjtn_Banners = new Array();
        this.recreate_wcjtn_Banner_wcjtn_IDList = new Array();
        this.banner_wcjtn_Recreate_wcjtn_Time = 5;
        this.kuang_wcjtn_dian_wcjtn_jiange = 0;
        this.btn_wcjtn_Move_wcjtn_Timer = 1;
        this.banner_wcjtn_Move_wcjtn_Timer = 0.5;
        this.banner_wcjtn_Fresh_wcjtn_Timer = 200;
        this.banner_wcjtn_Create_wcjtn_FailNum = 3;
        this.banner_wcjtn_Today_wcjtn_Banner_wcjtn_Max = 10;
        this.ad_wcjtn_Switch = 1;
        this.fakeBtn = 1;
        this.wu_wcjtn_dian_wcjtn_Scene_wcjtn_List = new Array();
        this.continue_wcjtn_Btn_wcjtn_DelayTime = 2;
        this.banner_wcjtn_Show_wcjtn_Time = 30;
        this.oppo_wcjtn_cfg = new OPPO_wcjtn_Cfg();
        this.qq_wcjtn_cfg = new QQ_wcjtn_Cfg();
        this.tt_wcjtn_cfg = new TT_wcjtn_Cfg();
        this.pop_wcjtn_Ad = 0; //是否启用 Exprot3ViewTemplate,
        this.continue_wcjtn_Banner = 0; //Exprot2ViewTemplate 是否开启Banner显示
        this.continue_wcjtn_Banner_wcjtn_ShowTime = 2; //Exprot2ViewTemplate 中Banner延迟显示的时间 
        this.continue_wcjtn_Banner_wcjtn_HideTime = 2; //Exprot2ViewTemplate 中Banner显示后延迟关闭的时间 
        this.vivocfg = new VVcfg();
        this.wxcfg = new WXCfg();
    }
    Object.defineProperty(App_wcjtn_Switch_wcjtn_Data.prototype, "wudianTimeAvaliable", {
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
    return App_wcjtn_Switch_wcjtn_Data;
}());
exports.App_wcjtn_Switch_wcjtn_Data = App_wcjtn_Switch_wcjtn_Data;
var WXCfg = /** @class */ (function () {
    function WXCfg() {
        this.kuang_wcjtn_dian_wcjtn_Banner = 0;
        this.kuang_wcjtn_dian_wcjtn_LevelSpcacing = 0;
    }
    return WXCfg;
}());
exports.WXCfg = WXCfg;
var OPPO_wcjtn_Cfg = /** @class */ (function () {
    function OPPO_wcjtn_Cfg() {
        this.yuan_wcjtn_sheng = 100;
        this.yuan_wcjtn_sheng_wcjtn_Switch = 1;
        this.add_wcjtn_To_wcjtn_Desktop = 0;
        this.oppo_wcjtn_versions = "";
        this.btn_wcjtn_Show_wcjtn_Timer = 0;
        this.index_wcjtn_Ad_wcjtn_Switch = 0;
        this.end_wcjtn_Ad_wcjtn_Switch = 0;
        this.yuan_wcjtn_sheng2 = 100;
        this.yuan_wcjtn_sheng_wcjtn_Switch2 = 1;
    }
    return OPPO_wcjtn_Cfg;
}());
exports.OPPO_wcjtn_Cfg = OPPO_wcjtn_Cfg;
var QQ_wcjtn_Cfg = /** @class */ (function () {
    function QQ_wcjtn_Cfg() {
        this.kuang_wcjtn_dian_wcjtn_Banner = 0;
        this.kuangdian_wcjtn_Box = 0;
        this.box = 0;
        this.wei_wcjtn_yi = 0;
        this.qq_wcjtn_versions = "";
    }
    return QQ_wcjtn_Cfg;
}());
exports.QQ_wcjtn_Cfg = QQ_wcjtn_Cfg;
var TT_wcjtn_Cfg = /** @class */ (function () {
    function TT_wcjtn_Cfg() {
        this.more_wcjtn_Game_wcjtn_Switch = 0;
        this.kuang_wcjtn_dian_wcjtn_Banner = 0;
        this.lu_wcjtn_ping = 0;
        this.tt_wcjtn_versions = "";
    }
    return TT_wcjtn_Cfg;
}());
exports.TT_wcjtn_Cfg = TT_wcjtn_Cfg;
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
var App_wcjtn_Switch_wcjtn_Config = /** @class */ (function () {
    function App_wcjtn_Switch_wcjtn_Config() {
        this._data = new Array();
    }
    App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance = function () {
        if (null == App_wcjtn_Switch_wcjtn_Config._instance) {
            App_wcjtn_Switch_wcjtn_Config._instance = App_wcjtn_Switch_wcjtn_Config.lo_wcjtn_ad();
        }
        return App_wcjtn_Switch_wcjtn_Config._instance;
    };
    App_wcjtn_Switch_wcjtn_Config.lo_wcjtn_ad = function () {
        var config = new App_wcjtn_Switch_wcjtn_Config();
        var json = Laya.loader.getRes(AppConfig_1.default.Res_wcjtn_Server + "/json/appswitch.json");
        if (json) {
            for (var i = 0; i < json.length; ++i) {
                var row = json[i];
                var rowData = new App_wcjtn_Switch_wcjtn_Data();
                rowData.ver_wcjtn_sion = String(row["version"]);
                rowData.ba_wcjtn_nner = Number(row["banner"]);
                rowData.wu_wcjtn_dian = Number(row["wudian"]);
                rowData.wudianAvailableTime = Object(row["wudianTime"]);
                rowData.mai_wcjtn_liang = Number(row["mailiang"]);
                var mailianglist = row["mailianglist"];
                if (null != mailianglist) {
                    for (var j = 0; j < mailianglist.length; ++j) {
                        var flag = Number(mailianglist[j]);
                        rowData.mailiang_wcjtn_list.push(flag);
                    }
                }
                var mailiangScenelist = row["mailiangScenelist"];
                if (null != mailiangScenelist) {
                    for (var j = 0; j < mailiangScenelist.length; ++j) {
                        var sceneValue = Number(mailiangScenelist[j]);
                        rowData.mailiang_wcjtn_Scene_wcjtn_List.push(sceneValue);
                    }
                }
                var wxwudianbanners = row["wxwudianbanners"];
                if (null != wxwudianbanners) {
                    for (var j = 0; j < wxwudianbanners.length; ++j) {
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
                if (null != recreateBannerIDList) {
                    for (var j = 0; j < recreateBannerIDList.length; ++j) {
                        var bannerid_1 = String(recreateBannerIDList[j]);
                        rowData.recreate_wcjtn_Banner_wcjtn_IDList.push(bannerid_1);
                    }
                }
                var recreateBannerIDList = row["recreateBannerIDList"];
                if (null != recreateBannerIDList) {
                    for (var j = 0; j < recreateBannerIDList.length; ++j) {
                        var bannerid_2 = String(recreateBannerIDList[j]);
                        rowData.recreate_wcjtn_Banner_wcjtn_IDList.push(bannerid_2);
                    }
                }
                rowData.banner_wcjtn_Recreate_wcjtn_Time = null != row["bannerRecreateTime"] ? Number(row["bannerRecreateTime"]) : rowData.banner_wcjtn_Recreate_wcjtn_Time;
                rowData.kuang_wcjtn_dian_wcjtn_jiange = null != row["kuangdianjiange"] ? Number(row["kuangdianjiange"]) : rowData.kuang_wcjtn_dian_wcjtn_jiange;
                rowData.btn_wcjtn_Move_wcjtn_Timer = Number(row["btnMoveTimer"]);
                rowData.banner_wcjtn_Move_wcjtn_Timer = Number(row["bannerMoveTimer"]);
                rowData.banner_wcjtn_Create_wcjtn_FailNum = Number(row["createFailNum"]);
                rowData.banner_wcjtn_Fresh_wcjtn_Timer = Number(row["bannerFreshTimer"]);
                rowData.banner_wcjtn_Today_wcjtn_Banner_wcjtn_Max = Number(row["todayBannerMax"]);
                rowData.ad_wcjtn_Switch = Number(row["adSwitch"]);
                rowData.fakeBtn = Number(row["fakeBtn"]);
                var wudianSceneList = row["wudianSceneList"];
                if (null != wudianSceneList) {
                    for (var j = 0; j < wudianSceneList.length; ++j) {
                        var wudianSceneValue = Number(wudianSceneList[j]);
                        rowData.wu_wcjtn_dian_wcjtn_Scene_wcjtn_List.push(wudianSceneValue);
                    }
                }
                rowData.continue_wcjtn_Btn_wcjtn_DelayTime = Number(row["continueBtnDelayTime"]);
                rowData.banner_wcjtn_Show_wcjtn_Time = Number(row["bannerShowTime"]);
                rowData.fakeBtn = null != row["fakeBtn"] ? Number(row["fakeBtn"]) : rowData.fakeBtn;
                rowData.pop_wcjtn_Ad = null != row["popAd"] ? Number(row["popAd"]) : rowData.pop_wcjtn_Ad;
                rowData.continue_wcjtn_Banner = null != row["continueBanner"] ? Number(row["continueBanner"]) : rowData.continue_wcjtn_Banner;
                rowData.continue_wcjtn_Banner_wcjtn_ShowTime = null != row["continueBannerShowTime"] ? Number(row["continueBannerShowTime"]) : rowData.continue_wcjtn_Banner_wcjtn_ShowTime;
                rowData.continue_wcjtn_Banner_wcjtn_HideTime = null != row["continueBannerHideTime"] ? Number(row["continueBannerHideTime"]) : rowData.continue_wcjtn_Banner_wcjtn_HideTime;
                if (null != row["oppocfg"]) {
                    var cfg = row["oppocfg"];
                    rowData.oppo_wcjtn_cfg.yuan_wcjtn_sheng = Number(cfg["yuansheng"]);
                    rowData.oppo_wcjtn_cfg.yuan_wcjtn_sheng_wcjtn_Switch = Number(cfg["yuanshengSwitch"]);
                    rowData.oppo_wcjtn_cfg.add_wcjtn_To_wcjtn_Desktop = Number(cfg["addToDesktop"]);
                    rowData.oppo_wcjtn_cfg.oppo_wcjtn_versions = String(cfg["oppoversions"]);
                    rowData.oppo_wcjtn_cfg.btn_wcjtn_Show_wcjtn_Timer = Number(cfg["btnShowTimer"]);
                    rowData.oppo_wcjtn_cfg.index_wcjtn_Ad_wcjtn_Switch = Number(cfg["indexAdSwitch"]);
                    rowData.oppo_wcjtn_cfg.end_wcjtn_Ad_wcjtn_Switch = Number(cfg["endAdSwitch"]);
                    rowData.oppo_wcjtn_cfg.yuan_wcjtn_sheng2 = null != cfg["yuansheng2"] ? Number(cfg["yuansheng2"]) : rowData.oppo_wcjtn_cfg.yuan_wcjtn_sheng2;
                    rowData.oppo_wcjtn_cfg.yuan_wcjtn_sheng_wcjtn_Switch2 = null != cfg["yuanshengSwitch2"] ? Number(cfg["yuanshengSwitch2"]) : rowData.oppo_wcjtn_cfg.yuan_wcjtn_sheng_wcjtn_Switch2;
                }
                if (null != row["qqcfg"]) {
                    var cfg = row["qqcfg"];
                    rowData.qq_wcjtn_cfg.kuang_wcjtn_dian_wcjtn_Banner = Number(cfg["kuangdianBanner"]);
                    rowData.qq_wcjtn_cfg.kuangdian_wcjtn_Box = Number(cfg["kuangdianBox"]);
                    rowData.qq_wcjtn_cfg.box = Number(cfg["box"]);
                    rowData.qq_wcjtn_cfg.wei_wcjtn_yi = Number(cfg["weiyi"]);
                    rowData.qq_wcjtn_cfg.qq_wcjtn_versions = String(cfg["qqversions"]);
                }
                if (null != row["ttcfg"]) {
                    var cfg = row["ttcfg"];
                    rowData.tt_wcjtn_cfg.more_wcjtn_Game_wcjtn_Switch = Number(cfg["moreGameSwitch"]);
                    rowData.tt_wcjtn_cfg.kuang_wcjtn_dian_wcjtn_Banner = Number(cfg["kuangdianBanner"]);
                    rowData.tt_wcjtn_cfg.lu_wcjtn_ping = Number(cfg["luping"]);
                    rowData.tt_wcjtn_cfg.tt_wcjtn_versions = String(cfg["ttversions"]);
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
                    rowData.wxcfg.kuang_wcjtn_dian_wcjtn_Banner = Number(cfg["kuangdianBanner"]);
                    rowData.wxcfg.kuang_wcjtn_dian_wcjtn_LevelSpcacing = Number(cfg["kuangdianLevelSpcacing"]);
                }
                config._data.push(rowData);
            }
            return config;
        }
        else {
            config._data.push(new App_wcjtn_Switch_wcjtn_Data());
            return config;
        }
    };
    App_wcjtn_Switch_wcjtn_Config.prototype.get_wcjtn_App_wcjtn_Switch_wcjtn_Data = function () {
        return this._data[0];
    };
    return App_wcjtn_Switch_wcjtn_Config;
}());
exports.default = App_wcjtn_Switch_wcjtn_Config;
},{"../AppConfig":2}],7:[function(require,module,exports){
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
},{"../NativeCallback":68}],8:[function(require,module,exports){
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
        var json = Laya.loader.getRes(AppConfig_1.default.Res_wcjtn_Server + "/json/storeconfig.json");
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
},{"../AppConfig":2}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event_wcjtn_Def;
(function (Event_wcjtn_Def) {
    Event_wcjtn_Def[Event_wcjtn_Def["None"] = 0] = "None";
    Event_wcjtn_Def[Event_wcjtn_Def["App_Close_wcjtn_First_wcjtn_Loading_wcjtn_View"] = 500] = "App_Close_wcjtn_First_wcjtn_Loading_wcjtn_View";
    Event_wcjtn_Def[Event_wcjtn_Def["AD_On_wcjtn_ShareAd_wcjtn_Fail"] = 501] = "AD_On_wcjtn_ShareAd_wcjtn_Fail";
    //当界面打开
    Event_wcjtn_Def[Event_wcjtn_Def["Game_On_wcjtn_View_wcjtn_Open"] = 600] = "Game_On_wcjtn_View_wcjtn_Open";
    //当界面关闭
    Event_wcjtn_Def[Event_wcjtn_Def["Game_On_wcjtn_View_wcjtn_Close"] = 601] = "Game_On_wcjtn_View_wcjtn_Close";
    //当玩家金币变动
    Event_wcjtn_Def[Event_wcjtn_Def["Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change"] = 701] = "Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change";
    //当玩家钻石变动
    Event_wcjtn_Def[Event_wcjtn_Def["Game_On_wcjtn_User_wcjtn_Crystal_wcjtn_Change"] = 702] = "Game_On_wcjtn_User_wcjtn_Crystal_wcjtn_Change";
    //当玩家商店解锁
    Event_wcjtn_Def[Event_wcjtn_Def["Game_OnUserUnlockedStore"] = 703] = "Game_OnUserUnlockedStore";
    //当关卡开始
    Event_wcjtn_Def[Event_wcjtn_Def["Game_On_wcjtn_Level_wcjtn_Start"] = 1000] = "Game_On_wcjtn_Level_wcjtn_Start";
    //当关卡结束
    Event_wcjtn_Def[Event_wcjtn_Def["Game_On_wcjtn_Level_wcjtn_Complate"] = 1001] = "Game_On_wcjtn_Level_wcjtn_Complate";
    //误点预加载完毕
    Event_wcjtn_Def[Event_wcjtn_Def["AD_Wu_wcjtn_dianBanner_Load_wcjtn_Complete"] = 2217] = "AD_Wu_wcjtn_dianBanner_Load_wcjtn_Complete";
    //显示误点Banner
    Event_wcjtn_Def[Event_wcjtn_Def["AD_Wu_wcjtn_dian_wcjtn_Banner_Show"] = 2218] = "AD_Wu_wcjtn_dian_wcjtn_Banner_Show";
    //影藏误点Banner
    Event_wcjtn_Def[Event_wcjtn_Def["AD_Wu_wcjtn_dian_wcjtn_Banner__wcjtn_Hide"] = 2219] = "AD_Wu_wcjtn_dian_wcjtn_Banner__wcjtn_Hide";
    //预加载Banner
    Event_wcjtn_Def[Event_wcjtn_Def["AD_Wu_wcjtn_dian_wcjtn_Banner_Pre_wcjtn_Load"] = 2220] = "AD_Wu_wcjtn_dian_wcjtn_Banner_Pre_wcjtn_Load";
    //当IP屏蔽状态更新
    Event_wcjtn_Def[Event_wcjtn_Def["App_On_wcjtn_Update_wcjtn_IpBlockState"] = 2221] = "App_On_wcjtn_Update_wcjtn_IpBlockState";
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。
    Event_wcjtn_Def[Event_wcjtn_Def["OnGameMenu"] = 10001] = "OnGameMenu";
    Event_wcjtn_Def[Event_wcjtn_Def["OnGameStart"] = 10002] = "OnGameStart";
    Event_wcjtn_Def[Event_wcjtn_Def["OnGameOver"] = 10003] = "OnGameOver";
    Event_wcjtn_Def[Event_wcjtn_Def["OnGameRelive"] = 10004] = "OnGameRelive";
    Event_wcjtn_Def[Event_wcjtn_Def["ToOverLane"] = 20001] = "ToOverLane";
    Event_wcjtn_Def[Event_wcjtn_Def["ToSlowLane"] = 20002] = "ToSlowLane";
    Event_wcjtn_Def[Event_wcjtn_Def["RecoverCoin"] = 20003] = "RecoverCoin";
    Event_wcjtn_Def[Event_wcjtn_Def["ShowResults"] = 20004] = "ShowResults";
    Event_wcjtn_Def[Event_wcjtn_Def["OverCar"] = 20005] = "OverCar";
    Event_wcjtn_Def[Event_wcjtn_Def["ChangeEnv"] = 20006] = "ChangeEnv";
    Event_wcjtn_Def[Event_wcjtn_Def["ChangeRoadLevel"] = 20007] = "ChangeRoadLevel";
    Event_wcjtn_Def[Event_wcjtn_Def["RewardVideoSuccess"] = 20010] = "RewardVideoSuccess";
    Event_wcjtn_Def[Event_wcjtn_Def["RewardVideoFail"] = 20011] = "RewardVideoFail";
    Event_wcjtn_Def[Event_wcjtn_Def["InsertVideoEnd"] = 20012] = "InsertVideoEnd";
})(Event_wcjtn_Def = exports.Event_wcjtn_Def || (exports.Event_wcjtn_Def = {}));
},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher = Laya.EventDispatcher;
var Event_wcjtn_Mgr = /** @class */ (function (_super) {
    __extends(Event_wcjtn_Mgr, _super);
    function Event_wcjtn_Mgr() {
        return _super.call(this) || this;
    }
    ;
    //广播事件
    Event_wcjtn_Mgr.prototype.dis_wcjtn_patch = function (InName, agv) {
        Event_wcjtn_Mgr.eventDispatcher.event(InName, agv);
    };
    //注册事件
    Event_wcjtn_Mgr.prototype.reg_wcjtn_Evemt = function (InName, caller, listener, arg) {
        Event_wcjtn_Mgr.eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    };
    //注册单次事件
    Event_wcjtn_Mgr.prototype.reg_wcjtn_OnceEvent = function (InName, caller, listener, arg) {
        Event_wcjtn_Mgr.eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    };
    //移除事件注册
    Event_wcjtn_Mgr.prototype.remove_wcjtn_Event = function (InName, caller, listener, arg) {
        Event_wcjtn_Mgr.eventDispatcher.off(InName, caller, listener);
    };
    Event_wcjtn_Mgr.eventDispatcher = new EventDispatcher();
    Event_wcjtn_Mgr.ins_wcjtn_tance = new Event_wcjtn_Mgr();
    return Event_wcjtn_Mgr;
}(EventDispatcher));
exports.default = Event_wcjtn_Mgr;
},{}],11:[function(require,module,exports){
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
var TwinkleSprite_1 = require("./View/TwinkleSprite");
var ClickGetPrize_1 = require("./View/ClickGetPrize/ClickGetPrize");
var LoadingView_1 = require("./View/LoadingView/LoadingView");
var UiFuelBar_1 = require("./MyScripts/MyView/uiOBJ/UiFuelBar");
var CircularProcessBar_1 = require("./View/CircularProcessBar");
var ReliveBtn_1 = require("./View/MyViews/UIobject/ReliveBtn");
var GameView_1 = require("./MyScripts/MyView/GameView");
var SwitchBtn_1 = require("./MyScripts/MyView/uiOBJ/SwitchBtn");
var RecordBorad_1 = require("./MyScripts/MyView/uiOBJ/RecordBorad");
var ButtonAnim_1 = require("./View/ButtonAnim");
var MyMainView_1 = require("./View/MyViews/MyMainView");
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
        reg("View/TwinkleSprite.ts", TwinkleSprite_1.default);
        reg("View/ClickGetPrize/ClickGetPrize.ts", ClickGetPrize_1.default);
        reg("View/LoadingView/LoadingView.ts", LoadingView_1.default);
        reg("MyScripts/MyView/uiOBJ/UiFuelBar.ts", UiFuelBar_1.default);
        reg("View/CircularProcessBar.ts", CircularProcessBar_1.default);
        reg("View/MyViews/UIobject/ReliveBtn.ts", ReliveBtn_1.default);
        reg("MyScripts/MyView/GameView.ts", GameView_1.default);
        reg("MyScripts/MyView/uiOBJ/SwitchBtn.ts", SwitchBtn_1.default);
        reg("MyScripts/MyView/uiOBJ/RecordBorad.ts", RecordBorad_1.default);
        reg("View/ButtonAnim.ts", ButtonAnim_1.default);
        reg("View/MyViews/MyMainView.ts", MyMainView_1.default);
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
},{"./KRQ/Com/KRQ_Banner":12,"./KRQ/Com/KRQ_GamingBanner":14,"./KRQ/Com/KRQ_History/KRQ_History":15,"./KRQ/Com/KRQ_History/KRQ_HistoryBox":16,"./KRQ/Com/KRQ_LoopAd/KRQ_HLoopAd":17,"./KRQ/Com/KRQ_LoopAd/KRQ_LoopAdBox":18,"./KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd":19,"./KRQ/Com/KRQ_RockSingleAd":20,"./KRQ/Com/KRQ_RollSingleAd":21,"./KRQ/Com/KRQ_SingleAd":22,"./KRQ/ViewCom/KRQ_Export":23,"./KRQ/ViewCom/KRQ_Floating":24,"./KRQ/ViewCom/KRQ_GameOver":25,"./KRQ/ViewCom/KRQ_Main":26,"./KRQ/ViewCom/KRQ_SidePull":27,"./Mgr/GameMgr":31,"./MyScripts/MyView/GameView":46,"./MyScripts/MyView/uiOBJ/RecordBorad":47,"./MyScripts/MyView/uiOBJ/SwitchBtn":48,"./MyScripts/MyView/uiOBJ/UiFuelBar":49,"./ShareAd/View/BannerAdView":76,"./ShareAd/View/HorizontalLoopAdView":77,"./ShareAd/View/LoopAdBox":78,"./View/ButtonAnim":83,"./View/CircularProcessBar":84,"./View/ClickGetPrize/ClickGetPrize":85,"./View/Common/UniversalBottomZone":86,"./View/Common/ViewAutoScaleByW":87,"./View/LoadingView/LoadingView":89,"./View/MyViews/MyMainView":90,"./View/MyViews/UIobject/ReliveBtn":91,"./View/QQTemplate/GameFail/QQGameFailViewTemplate":92,"./View/QQTemplate/GameWin/QQGameWinViewTemplate":93,"./View/QQTemplate/InGame/QQInGameViewTemplate":94,"./View/QQTemplate/Main/QQMainViewTemplate":95,"./View/QQTemplate/QQCrazyClick/QQCrazyClick":96,"./View/QQTemplate/QQCrazyClick/QQCrazyClick2":97,"./View/TTTemplate/GameFail/TTGameFailViewTemplate":99,"./View/TTTemplate/GameWin/TTGameWinViewTemplate":100,"./View/TTTemplate/Main/TTMainViewTemplate":101,"./View/TTTemplate/MoreReward/TTMoreReward":102,"./View/TTTemplate/Resurrection/TTResurrection":103,"./View/TTTemplate/Reward/RewardBox":104,"./View/TTTemplate/Reward/TTReward":105,"./View/TTTemplate/SignIn/TTSignIn":106,"./View/TTTemplate/SkinTips/TTSkinTips":107,"./View/TTTemplate/Store/PageList":108,"./View/TTTemplate/Store/StoreBox":109,"./View/TTTemplate/Store/TTStore":110,"./View/TTTemplate/TTCrazyClick/TTCrazyClick":111,"./View/TemplateViews/Export/ExportViewTemplate":115,"./View/TemplateViews/Export2/Exprot2ViewTemplate":113,"./View/TemplateViews/Export3/Exprot3ViewTemplate":114,"./View/TemplateViews/GameFail/GameFailViewTemplate":116,"./View/TemplateViews/GameWin/GameWinViewTemplate":117,"./View/TemplateViews/InGame/InGameViewTemplate":118,"./View/TemplateViews/Main/MainViewTemplate":119,"./View/TemplateViews/MiniGame/MiniGameViewTemplate":120,"./View/TemplateViews/OPPONativeAd/OPPONativeAdViewTemplate":121,"./View/TemplateViews/Reward/RewardViewTemplate":122,"./View/TemplateViews/WXCrazyClick/WXCrazyClick":124,"./View/TipsView/TipsView":125,"./View/TwinkleSprite":126,"./View/VVTemplate/NativeAd/VVNativeAd1View":127,"./View/VVTemplate/NativeAd/VVNativeAd2View":128}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ComBase_1 = require("./KRQ_ComBase");
var WXAPI_1 = require("../../WXAPI");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var ShareAd_1 = require("../../ShareAd/ShareAd");
var QQMiniGameAPI_1 = require("../../QQMiniGameAPI");
var WudianMgr_1 = require("../../Mgr/WudianMgr");
var KRQ_wcjtn__Banner_wcjtn_ = /** @class */ (function (_super) {
    __extends(KRQ_wcjtn__Banner_wcjtn_, _super);
    function KRQ_wcjtn__Banner_wcjtn_() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._wx_wcjtn_Banner = null;
        _this._on_wcjtn_Load = null;
        _this._on_wcjtn_Error = null;
        _this._on_wcjtn_Resize = null;
        _this._is_wcjtn_Creating = false;
        _this._is_wcjtn_Destroyed = false;
        _this._is_wcjtn_Hide = false;
        return _this;
    }
    Object.defineProperty(KRQ_wcjtn__Banner_wcjtn_.prototype, "_wcjtn_Clip_wcjtn_", {
        get: function () {
            return this.owner;
        },
        enumerable: true,
        configurable: true
    });
    KRQ_wcjtn__Banner_wcjtn_.prototype.onAwake = function () {
        this.Ad_wcjtn_Pos_wcjtn_ID = ShareAd_1.default.Banner_wcjtn_AdLocationID;
    };
    KRQ_wcjtn__Banner_wcjtn_.prototype.onStart = function () {
        this.ref_wcjtn_resh();
    };
    KRQ_wcjtn__Banner_wcjtn_.prototype.onEnable = function () {
        this._wcjtn_Sprite_wcjtn_.on(Laya.Event.CLICK, this, this.on_wcjtn_Click_wcjtn_Ad);
    };
    KRQ_wcjtn__Banner_wcjtn_.prototype.onDisable = function () {
        this._wcjtn_Sprite_wcjtn_.off(Laya.Event.CLICK, this, this.on_wcjtn_Click_wcjtn_Ad);
    };
    KRQ_wcjtn__Banner_wcjtn_.prototype.on_wcjtn_Click_wcjtn_Ad = function () {
        this.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program();
    };
    KRQ_wcjtn__Banner_wcjtn_.prototype.ref_wcjtn_resh = function (onComplate) {
        if (this._is_wcjtn_Destroyed)
            return;
        var banner = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().ba_wcjtn_nner;
        if (1 == banner) {
            this.refresh_wcjtn_WXBanner();
            if (Laya.Browser.onQQMiniGame && WudianMgr_1.default.Get_wcjtn_Ip_wcjtn_Blocked()) {
                var launchScene = QQMiniGameAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
                var noEnterBySearch = true;
                var wudianSceneList = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
                for (var i = 0; i < wudianSceneList.length; ++i) {
                    var wudianSceneValue = wudianSceneList[i];
                    if (launchScene == wudianSceneValue) {
                        noEnterBySearch = false;
                    }
                }
                if (noEnterBySearch) {
                    var banner_wcjtn_Recreate_wcjtn_Time = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
                    Laya.timer.loop(banner_wcjtn_Recreate_wcjtn_Time * 1000, this, this.refresh_wcjtn_WXBanner);
                }
            }
        }
        else {
            this.refresh_wcjtn_Banner();
            if (Laya.Browser.onQQMiniGame && WudianMgr_1.default.Get_wcjtn_Ip_wcjtn_Blocked()) {
                var launchScene = QQMiniGameAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
                var noEnterBySearch = true;
                var wudianSceneList = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
                for (var i = 0; i < wudianSceneList.length; ++i) {
                    var wudianSceneValue = wudianSceneList[i];
                    if (launchScene == wudianSceneValue) {
                        noEnterBySearch = false;
                    }
                }
                if (noEnterBySearch) {
                    var banner_wcjtn_Recreate_wcjtn_Time = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
                    Laya.timer.loop(banner_wcjtn_Recreate_wcjtn_Time * 1000, this, this.refresh_wcjtn_WXBanner);
                }
            }
        }
    };
    KRQ_wcjtn__Banner_wcjtn_.prototype.refresh_wcjtn_Banner = function () {
        var _this = this;
        if (null == this._wcjtn_Sprite_wcjtn_ || !this._wcjtn_Sprite_wcjtn_.visible)
            return;
        if (this._is_wcjtn_Creating || this._is_wcjtn_Destroyed)
            return;
        this._is_wcjtn_Creating = true;
        _super.prototype.ref_wcjtn_resh.call(this, function () {
            if (null != _this._data) {
                var self_1 = _this;
                _this._wcjtn_Sprite_wcjtn_.loadImage(_this._data.logo, Laya.Handler.create(_this, function () {
                    if (null != self_1._wcjtn_Sprite_wcjtn_ && !self_1._wcjtn_Sprite_wcjtn_.destroyed) {
                        self_1._wcjtn_Sprite_wcjtn_.width = 600;
                        self_1._wcjtn_Sprite_wcjtn_.height = 205;
                    }
                }));
            }
            _this._is_wcjtn_Creating = false;
        });
    };
    KRQ_wcjtn__Banner_wcjtn_.prototype.refresh_wcjtn_WXBanner = function () {
        if ((!Laya.Browser.onMiniGame && !Laya.Browser.onQQMiniGame) || null == this._wcjtn_Sprite_wcjtn_ || this._wcjtn_Sprite_wcjtn_.destroyed || !this._wcjtn_Sprite_wcjtn_.visible) {
            Laya.timer.clearAll(this);
            this.clear_wcjtn_WXBaner();
            return;
        }
        if (this._is_wcjtn_Creating || this._is_wcjtn_Destroyed || this._is_wcjtn_Hide)
            return;
        this.clear_wcjtn_WXBaner();
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
        var pos = this._wcjtn_Sprite_wcjtn_.localToGlobal(new Laya.Point(0, 0));
        var width = 300;
        var scale = self._wcjtn_Sprite_wcjtn_.width / Laya.stage.width;
        var realWidth = sw * scale;
        var offset = (realWidth - width) / 2;
        var left = pos.x / Laya.stage.width * sw + offset;
        var top = pos.y / Laya.stage.height * sh;
        if (Laya.Browser.onMiniGame) {
            self._is_wcjtn_Creating = true;
            var recreateBannerIDList = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().recreate_wcjtn_Banner_wcjtn_IDList;
            var bannerAdUnitId_1 = recreateBannerIDList[Math.floor(Math.random() * recreateBannerIDList.length)];
            if (null == bannerAdUnitId_1) {
                bannerAdUnitId_1 = WXAPI_1.default.banner_wcjtn_AdUnitId;
            }
            this._wx_wcjtn_Banner = Laya.Browser.window["wx"].createBannerAd({
                adUnitId: bannerAdUnitId_1,
                adIntervals: 30,
                style: {
                    left: left,
                    top: top,
                    width: width,
                }
            });
            if (null != self._wx_wcjtn_Banner) {
                self._wx_wcjtn_Banner.onLoad(function (res) {
                    console.log("KRQ  WXBanner广告 加载完成 : ", bannerAdUnitId_1);
                    console.log(res);
                    self._is_wcjtn_Creating = false;
                    if (self._is_wcjtn_Destroyed || null == self._wx_wcjtn_Banner || self._is_wcjtn_Hide) {
                        self.clear_wcjtn_WXBaner();
                        return;
                    }
                    self._wx_wcjtn_Banner.show();
                });
                self._wx_wcjtn_Banner.onError(function (err) {
                    console.log("KRQ WXBanner广告 加载失败 : ", bannerAdUnitId_1);
                    console.log(err);
                    self._is_wcjtn_Creating = false;
                    self.clear_wcjtn_WXBaner();
                    if (self._is_wcjtn_Destroyed || self._is_wcjtn_Hide) {
                        return;
                    }
                    self.refresh_wcjtn_Banner();
                });
                self._wx_wcjtn_Banner.onResize(function (res) {
                });
            }
            else {
                self.refresh_wcjtn_Banner();
            }
        }
        else if (Laya.Browser.onQQMiniGame) {
            self._is_wcjtn_Creating = true;
            var recreateBannerIDList = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().recreate_wcjtn_Banner_wcjtn_IDList;
            var bannerAdUnitId_2 = recreateBannerIDList[Math.floor(Math.random() * recreateBannerIDList.length)];
            if (null == bannerAdUnitId_2) {
                bannerAdUnitId_2 = QQMiniGameAPI_1.default.banner_wcjtn_AdUnitId;
            }
            self._wx_wcjtn_Banner = Laya.Browser.window["qq"].createBannerAd({
                adUnitId: bannerAdUnitId_2,
                adIntervals: 30,
                style: {
                    left: left,
                    top: top,
                    width: width,
                }
            });
            if (null != self._wx_wcjtn_Banner) {
                self._on_wcjtn_Load = function (res) {
                    console.log("KRQ QQBanner广告 加载完成 : ", bannerAdUnitId_2);
                    console.log(res);
                    self._is_wcjtn_Creating = false;
                    if (self._is_wcjtn_Destroyed || null == self._wx_wcjtn_Banner || self._is_wcjtn_Hide) {
                        self.clear_wcjtn_WXBaner();
                        return;
                    }
                    self._wx_wcjtn_Banner.show();
                };
                self._wx_wcjtn_Banner.onLoad(self._on_wcjtn_Load);
                self._on_wcjtn_Error = function (err) {
                    console.log("KRQ QQBanner广告 加载失败 : ", bannerAdUnitId_2);
                    console.log(err);
                    self._is_wcjtn_Creating = false;
                    self.clear_wcjtn_WXBaner();
                    if (self._is_wcjtn_Destroyed || null == self._wx_wcjtn_Banner || self._is_wcjtn_Hide) {
                        return;
                    }
                    self.refresh_wcjtn_Banner();
                };
                self._wx_wcjtn_Banner.onError(self._on_wcjtn_Error);
                self._on_wcjtn_Resize = function (res) {
                };
                self._wx_wcjtn_Banner.onResize(self._on_wcjtn_Resize);
            }
            else {
                self.refresh_wcjtn_Banner();
            }
        }
    };
    KRQ_wcjtn__Banner_wcjtn_.prototype.clear_wcjtn_WXBaner = function () {
        if (this._wx_wcjtn_Banner) {
            this._wx_wcjtn_Banner.hide();
            this._wx_wcjtn_Banner.offLoad(this._on_wcjtn_Load);
            this._wx_wcjtn_Banner.offError(this._on_wcjtn_Error);
            this._wx_wcjtn_Banner.offResize(this._on_wcjtn_Resize);
            this._wx_wcjtn_Banner.destroy();
        }
        this._wx_wcjtn_Banner = null;
    };
    KRQ_wcjtn__Banner_wcjtn_.prototype.onViewShow = function () {
        this._is_wcjtn_Hide = false;
        var banner = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().ba_wcjtn_nner;
        if (1 == banner) {
            if (null == this._wx_wcjtn_Banner) {
                this.refresh_wcjtn_WXBanner();
                if (Laya.Browser.onQQMiniGame && WudianMgr_1.default.Get_wcjtn_Ip_wcjtn_Blocked()) {
                    var launchScene = QQMiniGameAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
                    var noEnterBySearch = true;
                    var wudianSceneList = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
                    for (var i = 0; i < wudianSceneList.length; ++i) {
                        var wudianSceneValue = wudianSceneList[i];
                        if (launchScene == wudianSceneValue) {
                            noEnterBySearch = false;
                        }
                    }
                    if (noEnterBySearch) {
                        var banner_wcjtn_Recreate_wcjtn_Time = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
                        Laya.timer.loop(banner_wcjtn_Recreate_wcjtn_Time * 1000, this, this.refresh_wcjtn_WXBanner);
                    }
                }
            }
        }
        else {
            this.refresh_wcjtn_Banner();
            if (Laya.Browser.onQQMiniGame && WudianMgr_1.default.Get_wcjtn_Ip_wcjtn_Blocked()) {
                var launchScene = QQMiniGameAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
                var noEnterBySearch = true;
                var wudianSceneList = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
                for (var i = 0; i < wudianSceneList.length; ++i) {
                    var wudianSceneValue = wudianSceneList[i];
                    if (launchScene == wudianSceneValue) {
                        noEnterBySearch = false;
                    }
                }
                if (noEnterBySearch) {
                    var banner_wcjtn_Recreate_wcjtn_Time = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
                    Laya.timer.loop(banner_wcjtn_Recreate_wcjtn_Time * 1000, this, this.refresh_wcjtn_WXBanner);
                }
            }
        }
    };
    KRQ_wcjtn__Banner_wcjtn_.prototype.onViewHide = function () {
        this.clear_wcjtn_WXBaner();
        Laya.timer.clearAll(this);
        this._is_wcjtn_Hide = true;
    };
    KRQ_wcjtn__Banner_wcjtn_.prototype.onDestroy = function () {
        this.clear_wcjtn_WXBaner();
        Laya.timer.clearAll(this);
        this._is_wcjtn_Destroyed = true;
    };
    KRQ_wcjtn__Banner_wcjtn_.prototype._wcjtn_show_wcjtn_ = function () {
        _super.prototype._wcjtn_show_wcjtn_.call(this);
        this.onViewShow();
    };
    KRQ_wcjtn__Banner_wcjtn_.prototype._wcjtn_hide_wcjtn_ = function () {
        _super.prototype._wcjtn_hide_wcjtn_.call(this);
        this.onViewHide();
    };
    return KRQ_wcjtn__Banner_wcjtn_;
}(KRQ_ComBase_1.default));
exports.default = KRQ_wcjtn__Banner_wcjtn_;
},{"../../Config/AppSwitchConfig":6,"../../Mgr/WudianMgr":36,"../../QQMiniGameAPI":74,"../../ShareAd/ShareAd":75,"../../WXAPI":131,"./KRQ_ComBase":13}],13:[function(require,module,exports){
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
var KRQ__wcjtn_Com_wcjtn_Base = /** @class */ (function (_super) {
    __extends(KRQ__wcjtn_Com_wcjtn_Base, _super);
    function KRQ__wcjtn_Com_wcjtn_Base() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Ad_wcjtn_Pos_wcjtn_ID = -10086;
        _this._datas = [];
        _this._data = null;
        return _this;
    }
    Object.defineProperty(KRQ__wcjtn_Com_wcjtn_Base.prototype, "_wcjtn_Sprite_wcjtn_", {
        get: function () {
            return this.owner;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KRQ__wcjtn_Com_wcjtn_Base.prototype, "_wcjtn_Data_wcjtn_", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    KRQ__wcjtn_Com_wcjtn_Base.prototype.ref_wcjtn_resh = function (onComplate) {
        var self = this;
        ShareAd_1.default.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID, function (datas) {
            if (null != datas) {
                self._datas = datas;
                self._data = self._datas[Math.floor(Math.random() * datas.length)];
                if (null != onComplate) {
                    onComplate();
                }
            }
        }, false);
    };
    KRQ__wcjtn_Com_wcjtn_Base.prototype.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program = function (d) {
        var data = null == d ? this._data : d;
        if (data) {
            console.log("跳转游戏： " + data.title);
            if (Laya.Browser.onMiniGame) {
                WXAPI_1.default.navigate_wcjtn_To_wcjtn_MiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.report_wcjtn_User_wcjtn_Click(data.appid);
                    ALD_1.default.ald_wcjtn_Send_wcjtn_ReportAdClickSuccess(data);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                    if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                        console.log("用户取消跳转");
                        ALD_1.default.aldSend_wcjtn_ReportAd_wcjtn_ClickFail(data);
                    }
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQGMiniGame) {
                OPPOAPI_1.default.navigate_wcjtn_To_wcjtn_MiniProgram(data.appid, data.title, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.report_wcjtn_User_wcjtn_Click(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
             {
                QQMiniGameAPI_1.default.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.report_wcjtn_User_wcjtn_Click(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onVVMiniGame) {
                VIVOAPI_1.default.navigate_wcjtn_To_wcjtn_MiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.report_wcjtn_User_wcjtn_Click(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (AppConfig_1.default.onTTMiniGame) {
                TTAPI_1.default.showMoreGamesModal(function () {
                    console.log("跳转成功");
                    ShareAd_1.default.report_wcjtn_User_wcjtn_Click(data.appid);
                }, function () {
                    console.log("跳转失败");
                    EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                });
            }
        }
    };
    KRQ__wcjtn_Com_wcjtn_Base.prototype._wcjtn_show_wcjtn_ = function () {
        this._wcjtn_Sprite_wcjtn_.visible = true;
    };
    KRQ__wcjtn_Com_wcjtn_Base.prototype._wcjtn_hide_wcjtn_ = function () {
        this._wcjtn_Sprite_wcjtn_.visible = false;
    };
    KRQ__wcjtn_Com_wcjtn_Base.prototype.auto_wcjtn_Scroll_wcjtn_Text = function (text) {
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
    return KRQ__wcjtn_Com_wcjtn_Base;
}(Laya.Script));
exports.default = KRQ__wcjtn_Com_wcjtn_Base;
},{"../../ALD":1,"../../AppConfig":2,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../OPPOAPI":73,"../../QQMiniGameAPI":74,"../../ShareAd/ShareAd":75,"../../TTAPI":79,"../../VIVOAPI":82,"../../WXAPI":131}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_Banner_1 = require("./KRQ_Banner");
var WXAPI_1 = require("../../WXAPI");
var QQMiniGameAPI_1 = require("../../QQMiniGameAPI");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var WudianMgr_1 = require("../../Mgr/WudianMgr");
var KRQ_Gaming_wcjtn_Banner = /** @class */ (function (_super) {
    __extends(KRQ_Gaming_wcjtn_Banner, _super);
    function KRQ_Gaming_wcjtn_Banner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KRQ_Gaming_wcjtn_Banner.prototype.ref_wcjtn_resh = function (onComplate) {
        var _this = this;
        var launchScene = null;
        if (Laya.Browser.onMiniGame) {
            launchScene = WXAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
        }
        else if (Laya.Browser.onQQMiniGame) {
            launchScene = QQMiniGameAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
        }
        var noEnterBySearch = true;
        var wudianSceneList = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
        for (var i = 0; i < wudianSceneList.length; ++i) {
            var wudianSceneValue = wudianSceneList[i];
            if (launchScene == wudianSceneValue) {
                noEnterBySearch = false;
            }
        }
        var ipBlocked = WudianMgr_1.default.Get_wcjtn_Ip_wcjtn_Blocked();
        if (!ipBlocked || !noEnterBySearch) {
            this._wcjtn_Sprite_wcjtn_.visible = false;
            if (null != onComplate) {
                onComplate();
            }
            return;
        }
        var banner = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().ba_wcjtn_nner;
        if (1 == banner) {
            this.refresh_wcjtn_WXBanner();
        }
        else {
            _super.prototype.ref_wcjtn_resh.call(this, function () {
                _this.refresh_wcjtn_Banner();
                if (null != onComplate) {
                    onComplate();
                }
            });
        }
    };
    return KRQ_Gaming_wcjtn_Banner;
}(KRQ_Banner_1.default));
exports.default = KRQ_Gaming_wcjtn_Banner;
},{"../../Config/AppSwitchConfig":6,"../../Mgr/WudianMgr":36,"../../QQMiniGameAPI":74,"../../WXAPI":131,"./KRQ_Banner":12}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_HistoryBox_1 = require("./KRQ_HistoryBox");
var KRQ_ComBase_1 = require("../KRQ_ComBase");
var ShareAd_1 = require("../../../ShareAd/ShareAd");
var KRQ_wcjtn__His_wcjtn_tory = /** @class */ (function (_super) {
    __extends(KRQ_wcjtn__His_wcjtn_tory, _super);
    function KRQ_wcjtn__His_wcjtn_tory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.On_wcjtn_Back_wcjtn_Btn_wcjtn_Click = null;
        _this._top_wcjtn_Zone = null;
        _this._back_wcjtn_Btn = null;
        _this._start_wcjtn_List = new Array();
        return _this;
    }
    KRQ_wcjtn__His_wcjtn_tory.prototype.onAwake = function () {
        this.Ad_wcjtn_Pos_wcjtn_ID = ShareAd_1.default.History_wcjtn_LocationID;
        this._top_wcjtn_Zone = this._wcjtn_Sprite_wcjtn_.getChildByName("TopZone");
        this._back_wcjtn_Btn = this._top_wcjtn_Zone.getChildByName("BackBtn");
        this._list = this._wcjtn_Sprite_wcjtn_.getChildByName("List");
        this._list.renderHandler = Laya.Handler.create(this, this.on_wcjtn_List_wcjtn_Render, null, false);
        this._list.vScrollBarSkin = "";
    };
    KRQ_wcjtn__His_wcjtn_tory.prototype.onStart = function () {
        this.ref_wcjtn_resh();
    };
    KRQ_wcjtn__His_wcjtn_tory.prototype.onEnable = function () {
        this._back_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Back_wcjtn_Btn);
    };
    KRQ_wcjtn__His_wcjtn_tory.prototype.onDisable = function () {
        this._back_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Back_wcjtn_Btn);
    };
    KRQ_wcjtn__His_wcjtn_tory.prototype.ref_wcjtn_resh = function (onComplate) {
        var self = this;
        ShareAd_1.default.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID, function (datas) {
            if (null != datas) {
                self._datas = datas;
                self._start_wcjtn_List.splice(0);
                for (var i = 0; i < self._datas.length; ++i) {
                    self._start_wcjtn_List.push(false);
                }
                var num = Math.floor(self._start_wcjtn_List.length * 0.33);
                while (num > 0) {
                    var index = Math.floor(Math.random() * self._start_wcjtn_List.length);
                    if (false == self._start_wcjtn_List[index]) {
                        self._start_wcjtn_List[index] = true;
                        --num;
                    }
                }
                self._list.array = self._datas;
            }
        }, false);
    };
    KRQ_wcjtn__His_wcjtn_tory.prototype.on_wcjtn_List_wcjtn_Render = function (cell, index) {
        var data = this._list.array[index];
        var star = this._start_wcjtn_List[index];
        var historyBox = cell.getComponent(KRQ_HistoryBox_1.default);
        historyBox.setData(data, star);
    };
    KRQ_wcjtn__His_wcjtn_tory.prototype.on_wcjtn_Back_wcjtn_Btn = function () {
        this._wcjtn_hide_wcjtn_();
        if (null != this.On_wcjtn_Back_wcjtn_Btn_wcjtn_Click) {
            this.On_wcjtn_Back_wcjtn_Btn_wcjtn_Click();
        }
    };
    KRQ_wcjtn__His_wcjtn_tory.prototype._wcjtn_show_wcjtn_ = function () {
        _super.prototype._wcjtn_show_wcjtn_.call(this);
        this.ref_wcjtn_resh();
    };
    return KRQ_wcjtn__His_wcjtn_tory;
}(KRQ_ComBase_1.default));
exports.default = KRQ_wcjtn__His_wcjtn_tory;
},{"../../../ShareAd/ShareAd":75,"../KRQ_ComBase":13,"./KRQ_HistoryBox":16}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ComBase_1 = require("../../Com/KRQ_ComBase");
var KRQ__wcjtn_History_wcjtn_Box = /** @class */ (function (_super) {
    __extends(KRQ__wcjtn_History_wcjtn_Box, _super);
    function KRQ__wcjtn_History_wcjtn_Box() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__wcjtn_icon = null;
        _this.__wcjtn_text = null;
        _this.__wcjtn_mark = null;
        return _this;
    }
    KRQ__wcjtn_History_wcjtn_Box.prototype.onAwake = function () {
        this.__wcjtn_icon = this._wcjtn_Sprite_wcjtn_.getChildByName("Icon");
        this.__wcjtn_text = this._wcjtn_Sprite_wcjtn_.getChildByName("Text");
        this.__wcjtn_text.overflow = Laya.Text.SCROLL;
        this.__wcjtn_text.text = "";
        this.__wcjtn_mark = this._wcjtn_Sprite_wcjtn_.getChildByName("Mark");
        this.__wcjtn_mark.visible = false;
    };
    KRQ__wcjtn_History_wcjtn_Box.prototype.onStart = function () {
        this.auto_wcjtn_Scroll_wcjtn_Text(this.__wcjtn_text);
    };
    KRQ__wcjtn_History_wcjtn_Box.prototype.onEnable = function () {
        this._wcjtn_Sprite_wcjtn_.on(Laya.Event.CLICK, this, this.onClic_wcjtn_kAd);
    };
    KRQ__wcjtn_History_wcjtn_Box.prototype.onDisable = function () {
        this._wcjtn_Sprite_wcjtn_.off(Laya.Event.CLICK, this, this.onClic_wcjtn_kAd);
    };
    KRQ__wcjtn_History_wcjtn_Box.prototype.onClic_wcjtn_kAd = function () {
        this.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program();
    };
    KRQ__wcjtn_History_wcjtn_Box.prototype.setData = function (data, star) {
        this._data = data;
        if (null != this._data) {
            var self = this;
            this.__wcjtn_icon.loadImage(this._data.logo, Laya.Handler.create(this, function () {
                if (!self.__wcjtn_icon.destroyed) {
                    self.__wcjtn_icon.width = 100;
                    self.__wcjtn_icon.height = 100;
                }
            }));
            var str = String(this._data.title);
            this.__wcjtn_text.text = str;
            this.__wcjtn_mark.visible = star;
        }
    };
    return KRQ__wcjtn_History_wcjtn_Box;
}(KRQ_ComBase_1.default));
exports.default = KRQ__wcjtn_History_wcjtn_Box;
},{"../../Com/KRQ_ComBase":13}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ComBase_1 = require("../KRQ_ComBase");
var KRQ_LoopAdBox_1 = require("./KRQ_LoopAdBox");
var ShareAd_1 = require("../../../ShareAd/ShareAd");
var KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad = /** @class */ (function (_super) {
    __extends(KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad, _super);
    function KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._scroll_wcjtn_Forward = true;
        _this._cell_wcjtn_Size = new Laya.Point();
        _this.isEnable = true;
        _this.useMovePause = true;
        _this.use_wcjtn_Local_wcjtn_Random = true;
        _this.use_wcjtn_Random = true;
        _this.sort_wcjtn_Datas = null;
        return _this;
    }
    Object.defineProperty(KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad.prototype, "_wcjtn_Clip_wcjtn_", {
        get: function () {
            return this.owner;
        },
        enumerable: true,
        configurable: true
    });
    KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad.prototype.onAwake = function () {
        this.Ad_wcjtn_Pos_wcjtn_ID = ShareAd_1.default.LoopAd_wcjtn_LocationID;
        this._wcjtn__list_wcjtn_ = this.owner.getChildByName("List");
        this._wcjtn__list_wcjtn_.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._wcjtn__list_wcjtn_.hScrollBarSkin = "";
    };
    KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad.prototype.onStart = function () {
        var self = this;
        this._wcjtn__list_wcjtn_.width = self._wcjtn_Clip_wcjtn_.width;
        this._wcjtn__list_wcjtn_.height = self._wcjtn_Clip_wcjtn_.height;
        self.ref_wcjtn_resh(function () {
            if (null != self._wcjtn__list_wcjtn_.cells && self._wcjtn__list_wcjtn_.cells.length > 0) {
                var box = self._wcjtn__list_wcjtn_.cells[0];
                self._cell_wcjtn_Size.x = box.width;
                self._cell_wcjtn_Size.y = box.height;
                if (self.useMovePause) {
                    setTimeout(function () {
                        if (self._wcjtn__list_wcjtn_.scrollBar) {
                            self._wcjtn__list_wcjtn_.scrollBar.value = 0;
                            self.move();
                        }
                    }, 2000);
                }
            }
        });
    };
    KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad.prototype.ref_wcjtn_resh = function (onComplate) {
        if (!this.isEnable) {
            if (null != onComplate) {
                onComplate();
            }
            return;
        }
        var self = this;
        ShareAd_1.default.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID, function (datas) {
            if (null != datas && datas.length > 0) {
                self._datas = datas;
                self._wcjtn__list_wcjtn_.array = self._datas;
                if (null != self._wcjtn_Sprite_wcjtn_ && !self._wcjtn_Sprite_wcjtn_.destroyed) {
                    self._wcjtn_Sprite_wcjtn_.visible = true;
                }
                if (null != onComplate) {
                    onComplate();
                }
            }
            else {
                if (null != self._wcjtn_Sprite_wcjtn_ && !self._wcjtn_Sprite_wcjtn_.destroyed) {
                    self._wcjtn_Sprite_wcjtn_.visible = false;
                }
            }
        }, this.use_wcjtn_Random, this.use_wcjtn_Local_wcjtn_Random, this.sort_wcjtn_Datas);
    };
    KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad.prototype.onListRender = function (cell, index) {
        var data = this._wcjtn__list_wcjtn_.array[index];
        var loopAdBox = cell.getComponent(KRQ_LoopAdBox_1.default);
        loopAdBox.set_wcjtn_Data(data);
    };
    KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad.prototype.move = function () {
        var tonum = this._cell_wcjtn_Size.x + this._wcjtn__list_wcjtn_.spaceX;
        var left = 0;
        if (!this._scroll_wcjtn_Forward) {
            tonum *= -1;
            left = (this._wcjtn__list_wcjtn_.scrollBar.max - this._wcjtn__list_wcjtn_.scrollBar.value) % tonum * -1;
        }
        else {
            left = this._wcjtn__list_wcjtn_.scrollBar.value % tonum;
        }
        if (this._wcjtn__list_wcjtn_.scrollBar) {
            this._wcjtn__list_wcjtn_.scrollBar.stopScroll();
            var scrollDelta = tonum;
            if (0 != left) {
                scrollDelta = 2 * tonum - left;
            }
            var self_1 = this;
            Laya.Tween.to(self_1._wcjtn__list_wcjtn_.scrollBar, { value: self_1._wcjtn__list_wcjtn_.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self_1, function () {
            }));
            Laya.timer.once(1010, self_1, function () {
                if (self_1._wcjtn__list_wcjtn_.scrollBar.value >= self_1._wcjtn__list_wcjtn_.scrollBar.max) {
                    self_1._scroll_wcjtn_Forward = false;
                }
                else if (self_1._wcjtn__list_wcjtn_.scrollBar.value <= 0) {
                    self_1._scroll_wcjtn_Forward = true;
                }
                Laya.timer.once(3000, self_1, function () {
                    if (self_1._wcjtn__list_wcjtn_.scrollBar) {
                        self_1.move();
                    }
                });
            });
        }
    };
    KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad.prototype.onUpdate = function () {
        if (this.useMovePause)
            return;
        if (this._scroll_wcjtn_Forward) {
            this._wcjtn__list_wcjtn_.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this._wcjtn__list_wcjtn_.scrollBar.value >= this._wcjtn__list_wcjtn_.scrollBar.max) {
                this._scroll_wcjtn_Forward = false;
            }
        }
        else {
            this._wcjtn__list_wcjtn_.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this._wcjtn__list_wcjtn_.scrollBar.value <= 0) {
                this._scroll_wcjtn_Forward = true;
            }
        }
    };
    return KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad;
}(KRQ_ComBase_1.default));
exports.default = KRQ_wcjtn__H_wcjtn_Loop_wcjtn_Ad;
},{"../../../ShareAd/ShareAd":75,"../KRQ_ComBase":13,"./KRQ_LoopAdBox":18}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ComBase_1 = require("../KRQ_ComBase");
var KRQ_wcjtn__Loop_wcjtn_Ad_wcjtn_Box = /** @class */ (function (_super) {
    __extends(KRQ_wcjtn__Loop_wcjtn_Ad_wcjtn_Box, _super);
    function KRQ_wcjtn__Loop_wcjtn_Ad_wcjtn_Box() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._wcjtn__originW_wcjtn_ = 170;
        _this._wcjtn__originH_wcjtn_ = 170;
        return _this;
    }
    KRQ_wcjtn__Loop_wcjtn_Ad_wcjtn_Box.prototype.onAwake = function () {
        this._display_wcjtn_Sp = this.owner.getChildByName("Display");
        this._wcjtn__originW_wcjtn_ = this._display_wcjtn_Sp.width;
        this._wcjtn__originH_wcjtn_ = this._display_wcjtn_Sp.height;
        this._wcjtn__disText_wcjtn_ = this.owner.getChildByName("TitelText");
        this._wcjtn__disText_wcjtn_.overflow = Laya.Text.SCROLL;
        this._wcjtn__disText_wcjtn_.text = "";
    };
    KRQ_wcjtn__Loop_wcjtn_Ad_wcjtn_Box.prototype.onStart = function () {
        this.auto_wcjtn_Scroll_wcjtn_Text(this._wcjtn__disText_wcjtn_);
    };
    KRQ_wcjtn__Loop_wcjtn_Ad_wcjtn_Box.prototype.onEnable = function () {
        this._wcjtn_Sprite_wcjtn_.on(Laya.Event.CLICK, this, this.on_wcjtn_Click_wcjtn_Ad);
    };
    KRQ_wcjtn__Loop_wcjtn_Ad_wcjtn_Box.prototype.onDisable = function () {
        this._wcjtn_Sprite_wcjtn_.off(Laya.Event.CLICK, this, this.on_wcjtn_Click_wcjtn_Ad);
    };
    KRQ_wcjtn__Loop_wcjtn_Ad_wcjtn_Box.prototype.on_wcjtn_Click_wcjtn_Ad = function () {
        this.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program();
    };
    KRQ_wcjtn__Loop_wcjtn_Ad_wcjtn_Box.prototype.set_wcjtn_Data = function (data) {
        this._data = data;
        if (null != this._data) {
            var self_1 = this;
            this._display_wcjtn_Sp.loadImage(this._data.logo, Laya.Handler.create(this, function () {
                if (!self_1._display_wcjtn_Sp.destroyed) {
                    self_1._display_wcjtn_Sp.width = self_1._wcjtn__originW_wcjtn_;
                    self_1._display_wcjtn_Sp.height = self_1._wcjtn__originH_wcjtn_;
                }
            }));
            var str = String(this._data.title);
            this._wcjtn__disText_wcjtn_.text = str;
        }
    };
    return KRQ_wcjtn__Loop_wcjtn_Ad_wcjtn_Box;
}(KRQ_ComBase_1.default));
exports.default = KRQ_wcjtn__Loop_wcjtn_Ad_wcjtn_Box;
},{"../KRQ_ComBase":13}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_HLoopAd_1 = require("./KRQ_HLoopAd");
var ShareAd_1 = require("../../../ShareAd/ShareAd");
var KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad = /** @class */ (function (_super) {
    __extends(KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad, _super);
    function KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad.prototype.onAwake = function () {
        this.Ad_wcjtn_Pos_wcjtn_ID = ShareAd_1.default.MoreGame_wcjtn_LocationID;
        this._wcjtn__list_wcjtn_ = this.owner.getChildByName("List");
        this._wcjtn__list_wcjtn_.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
        this._wcjtn__list_wcjtn_.vScrollBarSkin = "";
    };
    KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad.prototype.move = function () {
        var tonum = this._cell_wcjtn_Size.y + this._wcjtn__list_wcjtn_.spaceY;
        var left = 0;
        if (!this._scroll_wcjtn_Forward) {
            tonum *= -1;
            left = (this._wcjtn__list_wcjtn_.scrollBar.max - this._wcjtn__list_wcjtn_.scrollBar.value) % tonum * -1;
        }
        else {
            left = this._wcjtn__list_wcjtn_.scrollBar.value % tonum;
        }
        if (this._wcjtn__list_wcjtn_.scrollBar) {
            this._wcjtn__list_wcjtn_.scrollBar.stopScroll();
            var scrollDelta = tonum;
            if (0 != left) {
                scrollDelta = 2 * tonum - left;
            }
            var self_1 = this;
            Laya.Tween.to(self_1._wcjtn__list_wcjtn_.scrollBar, { value: self_1._wcjtn__list_wcjtn_.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self_1, function () {
            }));
            Laya.timer.once(1010, self_1, function () {
                if (self_1._wcjtn__list_wcjtn_.scrollBar.value >= self_1._wcjtn__list_wcjtn_.scrollBar.max) {
                    self_1._scroll_wcjtn_Forward = false;
                }
                else if (self_1._wcjtn__list_wcjtn_.scrollBar.value <= 0) {
                    self_1._scroll_wcjtn_Forward = true;
                }
                Laya.timer.once(3000, self_1, function () {
                    if (self_1._wcjtn__list_wcjtn_.scrollBar) {
                        self_1.move();
                    }
                });
            });
        }
    };
    return KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad;
}(KRQ_HLoopAd_1.default));
exports.default = KRQ_wcjtn__V_wcjtn_Loop_wcjtn_Ad;
},{"../../../ShareAd/ShareAd":75,"./KRQ_HLoopAd":17}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_SingleAd_1 = require("./KRQ_SingleAd");
var KRQ_wcjtn__Rock_wcjtn_Single_wcjtn_Ad = /** @class */ (function (_super) {
    __extends(KRQ_wcjtn__Rock_wcjtn_Single_wcjtn_Ad, _super);
    function KRQ_wcjtn__Rock_wcjtn_Single_wcjtn_Ad() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KRQ_wcjtn__Rock_wcjtn_Single_wcjtn_Ad.prototype.play_wcjtn_Ani = function (onComplate) {
        var self = this;
        self._wcjtn_Sprite_wcjtn_.rotation = 0;
        Laya.Tween.to(self._wcjtn_Sprite_wcjtn_, {
            rotation: 20,
        }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, function () {
            Laya.Tween.to(self._wcjtn_Sprite_wcjtn_, {
                rotation: 0,
            }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, function () {
                self._wcjtn_Sprite_wcjtn_.rotation = 0;
                if (null != onComplate) {
                    onComplate();
                }
            }));
        }));
    };
    return KRQ_wcjtn__Rock_wcjtn_Single_wcjtn_Ad;
}(KRQ_SingleAd_1.default));
exports.default = KRQ_wcjtn__Rock_wcjtn_Single_wcjtn_Ad;
},{"./KRQ_SingleAd":22}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_SingleAd_1 = require("./KRQ_SingleAd");
var KRQ_Roll_wcjtn_Single_wcjtn_Ad = /** @class */ (function (_super) {
    __extends(KRQ_Roll_wcjtn_Single_wcjtn_Ad, _super);
    function KRQ_Roll_wcjtn_Single_wcjtn_Ad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._originX = null;
        return _this;
    }
    KRQ_Roll_wcjtn_Single_wcjtn_Ad.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._originX = this._wcjtn_Sprite_wcjtn_.x;
        this._wcjtn_Sprite_wcjtn_.x -= Laya.stage.width;
    };
    KRQ_Roll_wcjtn_Single_wcjtn_Ad.prototype.play_wcjtn_Ani = function (onComplate) {
        var _this = this;
        var cur = this._originX;
        var next = cur - Laya.stage.width;
        this._wcjtn_Sprite_wcjtn_.x = next;
        Laya.Tween.to(this._wcjtn_Sprite_wcjtn_, {
            rotation: 360,
        }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            _this._wcjtn_Sprite_wcjtn_.rotation = 0;
        }));
        Laya.Tween.to(this._wcjtn_Sprite_wcjtn_, {
            x: cur,
        }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            _this._wcjtn_Sprite_wcjtn_.x = cur;
            if (null != onComplate) {
                onComplate();
            }
        }));
    };
    return KRQ_Roll_wcjtn_Single_wcjtn_Ad;
}(KRQ_SingleAd_1.default));
exports.default = KRQ_Roll_wcjtn_Single_wcjtn_Ad;
},{"./KRQ_SingleAd":22}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ComBase_1 = require("./KRQ_ComBase");
var ShareAd_1 = require("../../ShareAd/ShareAd");
var KRQ_wcjtn__Single_wcjtn_Ad = /** @class */ (function (_super) {
    __extends(KRQ_wcjtn__Single_wcjtn_Ad, _super);
    function KRQ_wcjtn__Single_wcjtn_Ad() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._wcjtn__originW_wcjtn_ = 300;
        _this._wcjtn__originH_wcjtn_ = 300;
        return _this;
    }
    KRQ_wcjtn__Single_wcjtn_Ad.prototype.onAwake = function () {
        this.Ad_wcjtn_Pos_wcjtn_ID = ShareAd_1.default.LoopAd_wcjtn_LocationID;
        this._wcjtn__display_wcjtn_ = this._wcjtn_Sprite_wcjtn_.getChildByName("Display");
        this._wcjtn__text_wcjtn_ = this._wcjtn_Sprite_wcjtn_.getChildByName("Text");
        this._wcjtn__text_wcjtn_.overflow = Laya.Text.SCROLL;
        this._wcjtn__text_wcjtn_.text = "";
    };
    KRQ_wcjtn__Single_wcjtn_Ad.prototype.onEnable = function () {
        this._wcjtn_Sprite_wcjtn_.on(Laya.Event.CLICK, this, this.on_wcjtn_Click_wcjtn_Ad);
    };
    KRQ_wcjtn__Single_wcjtn_Ad.prototype.onDisable = function () {
        this._wcjtn_Sprite_wcjtn_.off(Laya.Event.CLICK, this, this.on_wcjtn_Click_wcjtn_Ad);
    };
    KRQ_wcjtn__Single_wcjtn_Ad.prototype.onStart = function () {
        this.auto_wcjtn_Scroll_wcjtn_Text(this._wcjtn__text_wcjtn_);
        this.ref_wcjtn_resh();
    };
    KRQ_wcjtn__Single_wcjtn_Ad.prototype.ref_wcjtn_resh = function (onComplate) {
        var self = this;
        ShareAd_1.default.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID, function (datas) {
            if (null != datas) {
                self._datas = datas;
                if (self._wcjtn_Sprite_wcjtn_ && !self._wcjtn_Sprite_wcjtn_.destroyed) {
                    for (var i = 0; i < self._datas.length; ++i) {
                        var find = false;
                        var data = self._datas[i];
                        for (var j = 0; j < KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList.length; ++j) {
                            var appid = KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList[j];
                            if (appid == data.appid) {
                                find = true;
                                break;
                            }
                        }
                        if (!find) {
                            self.clear_wcjtn_Repeat();
                            self._data = data;
                            break;
                        }
                    }
                    if (null == self._data) {
                        self._data = self._datas[Math.floor(Math.random() * datas.length)];
                    }
                    if (null != self._data) {
                        self._wcjtn__display_wcjtn_.loadImage(self._data.logo, Laya.Handler.create(self, function () {
                            if (null != self._wcjtn_Sprite_wcjtn_ && !self._wcjtn_Sprite_wcjtn_.destroy) {
                                self._wcjtn_Sprite_wcjtn_.visible = true;
                                if (onComplate) {
                                    onComplate();
                                }
                            }
                        }));
                        var str = self._data.title;
                        self._wcjtn__text_wcjtn_.text = str;
                        var isHas = false;
                        for (var j = 0; j < KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList.length; ++j) {
                            var appid = KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList[j];
                            if (appid == self._data.appid) {
                                isHas = true;
                                break;
                            }
                        }
                        if (!isHas) {
                            KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList.push(self._data.appid);
                        }
                    }
                    else {
                        if (null != self._wcjtn_Sprite_wcjtn_ && !self._wcjtn_Sprite_wcjtn_.destroy) {
                            self._wcjtn_Sprite_wcjtn_.visible = false;
                        }
                        if (onComplate) {
                            onComplate();
                        }
                    }
                }
            }
            else {
                self._wcjtn_Sprite_wcjtn_.visible = false;
                if (onComplate) {
                    onComplate();
                }
            }
        });
    };
    KRQ_wcjtn__Single_wcjtn_Ad.prototype._wcjtn_hide_wcjtn_ = function () {
        this._wcjtn_Sprite_wcjtn_.visible = false;
        this.clear_wcjtn_Repeat();
    };
    KRQ_wcjtn__Single_wcjtn_Ad.prototype.clear_wcjtn_Repeat = function () {
        if (null != this._data) {
            for (var i = 0; i < KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList.length; ++i) {
                var appid = KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList[i];
                if (appid == this._data.appid) {
                    KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList.splice(i, 1);
                    break;
                }
            }
        }
    };
    KRQ_wcjtn__Single_wcjtn_Ad.prototype.on_wcjtn_Click_wcjtn_Ad = function () {
        this.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program();
        this.ref_wcjtn_resh();
    };
    KRQ_wcjtn__Single_wcjtn_Ad.prototype.onDestroy = function () {
        this.clear_wcjtn_Repeat();
    };
    KRQ_wcjtn__Single_wcjtn_Ad._repeatCheckList = new Array();
    return KRQ_wcjtn__Single_wcjtn_Ad;
}(KRQ_ComBase_1.default));
exports.default = KRQ_wcjtn__Single_wcjtn_Ad;
},{"../../ShareAd/ShareAd":75,"./KRQ_ComBase":13}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ViewComBase_1 = require("./KRQ_ViewComBase");
var Utilit_1 = require("../../Utilit");
var KRQ_wcjtn__Export_wcjtn_ = /** @class */ (function (_super) {
    __extends(KRQ_wcjtn__Export_wcjtn_, _super);
    function KRQ_wcjtn__Export_wcjtn_() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.on_wcjtn_Continue_wcjtn_Btn_wcjtn_Click = null;
        _this._top_wcjtn_Zone_wcjtn_ = null;
        _this._back_wcjtn_Btn = null;
        _this._center_wcjtn_Zone = null;
        _this._continue_wcjtn_Btn = null;
        return _this;
    }
    Object.defineProperty(KRQ_wcjtn__Export_wcjtn_.prototype, "Back_wcjtn_Btn", {
        get: function () {
            if (null == this._back_wcjtn_Btn) {
                this._back_wcjtn_Btn = this._wcjtn_Sprite_wcjtn_.getChildByName("TopZone").getChildByName("BackBtn");
            }
            return this._back_wcjtn_Btn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KRQ_wcjtn__Export_wcjtn_.prototype, "Continue_wcjtn_Btn", {
        get: function () {
            if (null == this._continue_wcjtn_Btn) {
                this._continue_wcjtn_Btn = this._wcjtn_Sprite_wcjtn_.getChildByName("CenterZone").getChildByName("ContinueBtn");
            }
            return this._continue_wcjtn_Btn;
        },
        enumerable: true,
        configurable: true
    });
    KRQ_wcjtn__Export_wcjtn_.prototype.onAwake = function () {
        this._top_wcjtn_Zone_wcjtn_ = this._wcjtn_Sprite_wcjtn_.getChildByName("TopZone");
        if (Utilit_1.default.is_wcjtn_IphoneX()) {
            this._top_wcjtn_Zone_wcjtn_.top = this._top_wcjtn_Zone_wcjtn_.top + 75;
        }
        this._back_wcjtn_Btn = this._top_wcjtn_Zone_wcjtn_.getChildByName("BackBtn");
        this._center_wcjtn_Zone = this._wcjtn_Sprite_wcjtn_.getChildByName("CenterZone");
        if (Utilit_1.default.is_wcjtn_IphoneX()) {
            this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
        }
        this._continue_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("ContinueBtn");
    };
    KRQ_wcjtn__Export_wcjtn_.prototype.onEnable = function () {
        this._back_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Back_wcjtn_Btn);
        this._continue_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Continue_wcjtn_Btn);
    };
    KRQ_wcjtn__Export_wcjtn_.prototype.onDisable = function () {
        this._back_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Back_wcjtn_Btn);
        this._continue_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Continue_wcjtn_Btn);
    };
    KRQ_wcjtn__Export_wcjtn_.prototype.on_wcjtn_Back_wcjtn_Btn = function () {
        this._wcjtn_hide_wcjtn_();
    };
    KRQ_wcjtn__Export_wcjtn_.prototype.on_wcjtn_Continue_wcjtn_Btn = function () {
        if (null != this.on_wcjtn_Continue_wcjtn_Btn_wcjtn_Click) {
            this.on_wcjtn_Continue_wcjtn_Btn_wcjtn_Click();
        }
    };
    return KRQ_wcjtn__Export_wcjtn_;
}(KRQ_ViewComBase_1.default));
exports.default = KRQ_wcjtn__Export_wcjtn_;
},{"../../Utilit":81,"./KRQ_ViewComBase":28}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ViewComBase_1 = require("./KRQ_ViewComBase");
var KRQ_RockSingleAd_1 = require("../Com/KRQ_RockSingleAd");
var KRQ_wcjtn__Floating_wcjtn_ = /** @class */ (function (_super) {
    __extends(KRQ_wcjtn__Floating_wcjtn_, _super);
    function KRQ_wcjtn__Floating_wcjtn_() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._rock_wcjtn_Single_wcjtn_Ads = new Array();
        _this._ani_wcjtn_Spaceing = 3000;
        return _this;
    }
    KRQ_wcjtn__Floating_wcjtn_.prototype.onAwake = function () {
        this._center_wcjtn_Zone = this._wcjtn_Sprite_wcjtn_.getChildByName("CenterZone");
        for (var i = 0; i < this._center_wcjtn_Zone.numChildren; ++i) {
            var child = this._center_wcjtn_Zone.getChildAt(i);
            if (child.visible) {
                var rockAd = child.getComponent(KRQ_RockSingleAd_1.default);
                this._rock_wcjtn_Single_wcjtn_Ads.push(rockAd);
            }
        }
    };
    KRQ_wcjtn__Floating_wcjtn_.prototype.onStart = function () {
        var self = this;
        self.play_wcjtn_Ani();
        Laya.timer.loop(this._rock_wcjtn_Single_wcjtn_Ads.length * (this._ani_wcjtn_Spaceing + 500), this, function () {
            self.play_wcjtn_Ani(function () {
                self.refresh_wcjtn_Ad();
            });
        });
    };
    KRQ_wcjtn__Floating_wcjtn_.prototype.refresh_wcjtn_Ad = function () {
        for (var i = 0; i < this._rock_wcjtn_Single_wcjtn_Ads.length; ++i) {
            var ad = this._rock_wcjtn_Single_wcjtn_Ads[i];
            if (null == ad._wcjtn_Data_wcjtn_) {
                ad._wcjtn_Sprite_wcjtn_.visible = false;
            }
            ad.ref_wcjtn_resh();
        }
    };
    KRQ_wcjtn__Floating_wcjtn_.prototype.play_wcjtn_Ani = function (onComplate) {
        var len = this._rock_wcjtn_Single_wcjtn_Ads.length;
        var _loop_1 = function (i) {
            var index = i;
            var ad = this_1._rock_wcjtn_Single_wcjtn_Ads[index];
            Laya.timer.once(this_1._ani_wcjtn_Spaceing * i, ad, function () {
                if (index == len - 1) {
                    ad.play_wcjtn_Ani(onComplate);
                }
                else {
                    ad.play_wcjtn_Ani();
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < this._rock_wcjtn_Single_wcjtn_Ads.length; ++i) {
            _loop_1(i);
        }
    };
    return KRQ_wcjtn__Floating_wcjtn_;
}(KRQ_ViewComBase_1.default));
exports.default = KRQ_wcjtn__Floating_wcjtn_;
},{"../Com/KRQ_RockSingleAd":20,"./KRQ_ViewComBase":28}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ViewComBase_1 = require("./KRQ_ViewComBase");
var KRQ_RollSingleAd_1 = require("../Com/KRQ_RollSingleAd");
var KRQ_wcjtn__Game_wcjtn_Over = /** @class */ (function (_super) {
    __extends(KRQ_wcjtn__Game_wcjtn_Over, _super);
    function KRQ_wcjtn__Game_wcjtn_Over() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._roll_wcjtn_SingleAd_wcjtn_s = new Array();
        return _this;
    }
    KRQ_wcjtn__Game_wcjtn_Over.prototype.onAwake = function () {
        this._center_wcjtn_Zone = this._wcjtn_Sprite_wcjtn_.getChildByName("CenterZone");
        for (var i = 0; i < this._center_wcjtn_Zone.numChildren; ++i) {
            var ad = this._center_wcjtn_Zone.getChildAt(i).getComponent(KRQ_RollSingleAd_1.default);
            this._roll_wcjtn_SingleAd_wcjtn_s.push(ad);
        }
    };
    KRQ_wcjtn__Game_wcjtn_Over.prototype.onStart = function () {
        var _loop_1 = function (i) {
            var ad = this_1._roll_wcjtn_SingleAd_wcjtn_s[i];
            Laya.timer.once((this_1._roll_wcjtn_SingleAd_wcjtn_s.length - i) * 150, this_1, function () {
                ad.play_wcjtn_Ani();
            });
        };
        var this_1 = this;
        for (var i = 0; i < this._roll_wcjtn_SingleAd_wcjtn_s.length; ++i) {
            _loop_1(i);
        }
    };
    return KRQ_wcjtn__Game_wcjtn_Over;
}(KRQ_ViewComBase_1.default));
exports.default = KRQ_wcjtn__Game_wcjtn_Over;
},{"../Com/KRQ_RollSingleAd":21,"./KRQ_ViewComBase":28}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_Banner_1 = require("../Com/KRQ_Banner");
var KRQ_ViewComBase_1 = require("./KRQ_ViewComBase");
var KRQ_History_1 = require("../Com/KRQ_History/KRQ_History");
var KRQ_HLoopAd_1 = require("../Com/KRQ_LoopAd/KRQ_HLoopAd");
var Utilit_1 = require("../../Utilit");
var KRQ_Main_wcjtn_State;
(function (KRQ_Main_wcjtn_State) {
    KRQ_Main_wcjtn_State[KRQ_Main_wcjtn_State["_wcjtn_Normal_wcjtn_"] = 0] = "_wcjtn_Normal_wcjtn_";
    KRQ_Main_wcjtn_State[KRQ_Main_wcjtn_State["_wcjtn_NoLoopAd_wcjtn_"] = 1] = "_wcjtn_NoLoopAd_wcjtn_";
    KRQ_Main_wcjtn_State[KRQ_Main_wcjtn_State["_wcjtn_NoBannerAd_wcjtn_"] = 2] = "_wcjtn_NoBannerAd_wcjtn_";
})(KRQ_Main_wcjtn_State = exports.KRQ_Main_wcjtn_State || (exports.KRQ_Main_wcjtn_State = {}));
var KRQ_wcjtn__Main_wcjtn_ = /** @class */ (function (_super) {
    __extends(KRQ_wcjtn__Main_wcjtn_, _super);
    function KRQ_wcjtn__Main_wcjtn_() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._top_wcjtn_Zone = null;
        _this._history_wcjtn_Btn = null;
        _this._krq_wcjtn_Loop_wcjtn_Ad = null;
        _this._bottom_wcjtn_Zone = null;
        _this._krq_wcjtn_Banner = null;
        _this._krq_wcjtn_History = null;
        return _this;
    }
    KRQ_wcjtn__Main_wcjtn_.prototype.onAwake = function () {
        this._top_wcjtn_Zone = this._wcjtn_Sprite_wcjtn_.getChildByName("TopZone");
        this._history_wcjtn_Btn = this._top_wcjtn_Zone.getChildByName("HistoryBtn");
        this._history_wcjtn_Btn.visible = false;
        if (Utilit_1.default.is_wcjtn_IphoneX()) {
            this._top_wcjtn_Zone.top = this._top_wcjtn_Zone.top + 75;
        }
        this._krq_wcjtn_Loop_wcjtn_Ad = this._wcjtn_Sprite_wcjtn_.getChildByName("KRQ_HLoopAd").getComponent(KRQ_HLoopAd_1.default);
        this._krq_wcjtn_Banner = this._wcjtn_Sprite_wcjtn_.getChildByName("KRQ_Banner").getComponent(KRQ_Banner_1.default);
        this._krq_wcjtn_History = this._wcjtn_Sprite_wcjtn_.getChildByName("KRQ_History").getComponent(KRQ_History_1.default);
        var self = this;
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        this._krq_wcjtn_History.On_wcjtn_Back_wcjtn_Btn_wcjtn_Click = function () {
            if (aspectRatio < 0.5) {
                self._krq_wcjtn_Banner._wcjtn_show_wcjtn_();
            }
        };
        this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Sprite_wcjtn_.visible = false;
        if (aspectRatio < 0.5) {
            this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top = 100;
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top = this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top + 75;
            }
            this._krq_wcjtn_Banner._wcjtn_Sprite_wcjtn_.visible = true;
        }
        else {
            this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top = Laya.stage.height - 280;
            this._krq_wcjtn_Banner._wcjtn_Sprite_wcjtn_.visible = false;
        }
    };
    KRQ_wcjtn__Main_wcjtn_.prototype.switchState = function (state) {
        if (state == KRQ_Main_wcjtn_State._wcjtn_Normal_wcjtn_) {
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top = 100;
                if (Utilit_1.default.is_wcjtn_IphoneX()) {
                    this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top = this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top + 75;
                }
                this._krq_wcjtn_Banner._wcjtn_Sprite_wcjtn_.visible = true;
            }
            else {
                this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top = Laya.stage.height - 280;
                this._krq_wcjtn_Banner._wcjtn_Sprite_wcjtn_.visible = false;
            }
        }
        else if (state == KRQ_Main_wcjtn_State._wcjtn_NoLoopAd_wcjtn_) {
            this._krq_wcjtn_Loop_wcjtn_Ad.isEnable = false;
            this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Sprite_wcjtn_.visible = false;
            this._krq_wcjtn_Banner._wcjtn_Sprite_wcjtn_.visible = true;
        }
        else if (state == KRQ_Main_wcjtn_State._wcjtn_NoBannerAd_wcjtn_) {
            this._krq_wcjtn_Loop_wcjtn_Ad._wcjtn_Clip_wcjtn_.top = Laya.stage.height - 280;
            this._krq_wcjtn_Banner.Ad_wcjtn_Pos_wcjtn_ID = -1;
            this._krq_wcjtn_Banner._wcjtn_Sprite_wcjtn_.visible = false;
        }
    };
    KRQ_wcjtn__Main_wcjtn_.prototype.onEnable = function () {
        this._history_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_History_wcjtn_Btn);
    };
    KRQ_wcjtn__Main_wcjtn_.prototype.onDisable = function () {
        this._history_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_History_wcjtn_Btn);
    };
    KRQ_wcjtn__Main_wcjtn_.prototype.on_wcjtn_History_wcjtn_Btn = function () {
        this._krq_wcjtn_History._wcjtn_show_wcjtn_();
        this._krq_wcjtn_Banner._wcjtn_hide_wcjtn_();
    };
    return KRQ_wcjtn__Main_wcjtn_;
}(KRQ_ViewComBase_1.default));
exports.default = KRQ_wcjtn__Main_wcjtn_;
},{"../../Utilit":81,"../Com/KRQ_Banner":12,"../Com/KRQ_History/KRQ_History":15,"../Com/KRQ_LoopAd/KRQ_HLoopAd":17,"./KRQ_ViewComBase":28}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ_ViewComBase_1 = require("./KRQ_ViewComBase");
var KRQ_VLoopAd_1 = require("../Com/KRQ_LoopAd/KRQ_VLoopAd");
var KRQ_wcjtn__Side_wcjtn_Pull = /** @class */ (function (_super) {
    __extends(KRQ_wcjtn__Side_wcjtn_Pull, _super);
    function KRQ_wcjtn__Side_wcjtn_Pull() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._krq_wcjtn_VLoopAd = null;
        _this._pull_wcjtn_Btn = null;
        return _this;
    }
    KRQ_wcjtn__Side_wcjtn_Pull.prototype.onAwake = function () {
        this._krq_wcjtn_VLoopAd = this._wcjtn_Sprite_wcjtn_.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd_1.default);
        this._pull_wcjtn_Btn = this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_.getChildByName("PullBtn");
        this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_.x = -this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_.width;
    };
    KRQ_wcjtn__Side_wcjtn_Pull.prototype.onEnable = function () {
        this._pull_wcjtn_Btn.on(Laya.Event.CLICK, this, this.onPull_wcjtn_Btn);
    };
    KRQ_wcjtn__Side_wcjtn_Pull.prototype.onDisable = function () {
        this._pull_wcjtn_Btn.off(Laya.Event.CLICK, this, this.onPull_wcjtn_Btn);
    };
    KRQ_wcjtn__Side_wcjtn_Pull.prototype.onPull_wcjtn_Btn = function () {
        if (this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_.x < 0) {
            this._wcjtn_pull_wcjtn_();
        }
        else {
            this._wcjtn_push_wcjtn_();
        }
    };
    KRQ_wcjtn__Side_wcjtn_Pull.prototype._wcjtn_pull_wcjtn_ = function () {
        Laya.Tween.to(this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_, {
            x: 0
        }, 200, Laya.Ease.linearNone, null, 0, true);
    };
    KRQ_wcjtn__Side_wcjtn_Pull.prototype._wcjtn_push_wcjtn_ = function () {
        Laya.Tween.to(this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_, {
            x: -this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_.width
        }, 200, Laya.Ease.linearNone, null, 0, true);
    };
    KRQ_wcjtn__Side_wcjtn_Pull.prototype.on_wcjtn_ShareAd_wcjtn_Fail = function () {
        this._wcjtn_pull_wcjtn_();
    };
    return KRQ_wcjtn__Side_wcjtn_Pull;
}(KRQ_ViewComBase_1.default));
exports.default = KRQ_wcjtn__Side_wcjtn_Pull;
},{"../Com/KRQ_LoopAd/KRQ_VLoopAd":19,"./KRQ_ViewComBase":28}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base = /** @class */ (function (_super) {
    __extends(KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base, _super);
    function KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.on_wcjtn_Show = null;
        _this.on_wcjtn_Hide = null;
        return _this;
    }
    Object.defineProperty(KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base.prototype, "_wcjtn_Sprite_wcjtn_", {
        get: function () {
            return this.owner;
        },
        enumerable: true,
        configurable: true
    });
    KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base.prototype._wcjtn_show_wcjtn_ = function () {
        this._wcjtn_Sprite_wcjtn_.visible = true;
        if (null != this.on_wcjtn_Show) {
            this.on_wcjtn_Show();
        }
    };
    KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base.prototype._wcjtn_hide_wcjtn_ = function () {
        this._wcjtn_Sprite_wcjtn_.visible = false;
        if (null != this.on_wcjtn_Hide) {
            this.on_wcjtn_Hide();
        }
    };
    return KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base;
}(Laya.Script));
exports.default = KRQ__wcjtn_View_wcjtn_Com_wcjtn_Base;
},{}],29:[function(require,module,exports){
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
var Mai_wcjtn_Liang = /** @class */ (function () {
    function Mai_wcjtn_Liang() {
    }
    /**
     * 发送数据的类
     *
     * @protected
     * @static
     * @param {request_wcjtn_Data} req
     * @memberof MaiLiang
     */
    Mai_wcjtn_Liang.req_wcjtn_uest = function (req) {
        if (req.url_wcjtn_.indexOf("https://") > -1 ||
            req.url_wcjtn_.indexOf("http://") > -1) {
            req.url_wcjtn_ = req.url_wcjtn_;
        }
        else {
            req.url_wcjtn_ = Mai_wcjtn_Liang._wcjtn_mainUr_wcjtn_l + req.url_wcjtn_;
        }
        var completeFunc = function (res) {
            console.log(res, "MaiLiang http Success");
            res = JSON.parse(res);
            if (res.Status == "200") {
                if (res.Result["OpenId"] != null && res.Result["OpenId"] != "") {
                    Mai_wcjtn_Liang.Mai_wcjtn_Liang_wcjtn_OpenId = res.Result["OpenId"];
                    Mai_wcjtn_Liang._wcjtn_time_wcjtn_ = req._wcjtn_data_wcjtn_.posttime;
                    console.log("获得买量系统OpenId " + Mai_wcjtn_Liang.Mai_wcjtn_Liang_wcjtn_OpenId);
                }
                else {
                    console.log("上报买量系统停留时间成功");
                }
                if (req.on_wcjtn_Success) {
                    req.on_wcjtn_Success(res);
                }
            }
            else {
                if (req.on_wcjtn_Fail) {
                    req.on_wcjtn_Fail(res);
                }
            }
            req.on_wcjtn_Success = null;
            req = null;
        };
        var errorFunc = function (res) {
            console.log(res, "MaiLiang http fail");
            if (req.on_wcjtn_Fail) {
                req.on_wcjtn_Fail(res);
            }
            req.on_wcjtn_Fail = null;
            req = null;
        };
        var xhr = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, Mai_wcjtn_Liang, completeFunc);
        xhr.once(Laya.Event.ERROR, Mai_wcjtn_Liang, errorFunc);
        if (req.meth_wcjtn_ == "get") {
            var para = "";
            for (var _i = 0, _a = Object.keys(req._wcjtn_data_wcjtn_); _i < _a.length; _i++) {
                var key = _a[_i];
                var value = req._wcjtn_data_wcjtn_[key];
                para += key + "=" + value + "&";
            }
            req.url_wcjtn_ = req.url_wcjtn_ + "?" + para;
            xhr.send(req.url_wcjtn_, null, req.meth_wcjtn_);
        }
        else {
            var para = "";
            for (var _b = 0, _c = Object.keys(req._wcjtn_data_wcjtn_); _b < _c.length; _b++) {
                var key = _c[_b];
                var value = req._wcjtn_data_wcjtn_[key];
                para += key + "=" + value + "&";
            }
            xhr.send(req.url_wcjtn_, para, req.meth_wcjtn_, null, ["Content-Type", "application/x-www-form-urlencoded"]);
        }
    };
    /**
     * 获得买量系统唯一标识ID,此ID的作用是用来上报游戏时间
     *
     * @param {Function} res
     * @memberof MaiLiang
     */
    Mai_wcjtn_Liang.Get_wcjtn_Mai_wcjtn_Liang_wcjtn_OpenId = function (onSuccess, onFail) {
        if (Laya.Browser.onMiniGame) {
            var option = WXAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync();
            if (option != null) {
                var key = option.query["key"];
                if (key != null && key != "" && User_1.default.openId_wcjtn_ != "") {
                    Mai_wcjtn_Liang._wcjtn_key_wcjtn_ = key;
                    var req = new HttpUnit_1.request_wcjtn_Data();
                    req.url_wcjtn_ = Mai_wcjtn_Liang.u_wcjtn_click;
                    req.on_wcjtn_Success = onSuccess;
                    req.on_wcjtn_Fail = onFail;
                    req._wcjtn_data_wcjtn_.appid = AppConfig_1.default.App_wcjtn_ID;
                    req._wcjtn_data_wcjtn_.openid = "";
                    var time = new Date().getTime() / 1000;
                    req._wcjtn_data_wcjtn_.posttime = time;
                    req._wcjtn_data_wcjtn_.auth = 0;
                    req._wcjtn_data_wcjtn_.key = key;
                    req._wcjtn_data_wcjtn_.wxopenid = User_1.default.openId_wcjtn_;
                    req.meth_wcjtn_ = "POST";
                    console.log("发送买量数据接口");
                    Mai_wcjtn_Liang.req_wcjtn_uest(req);
                }
            }
            else {
                console.log("上报买量数据失败");
                onFail(null);
            }
        }
        else if (Laya.Browser.onQGMiniGame) {
            var option = OPPOAPI_1.default.get_wcjtn_LaunchOpt_wcjtn_ionsSync();
            HttpUnit_1.default.report_wcjtn_Import(option.referrerInfo.package, option.referrerInfo.extraData.appid, function (result) {
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
    Mai_wcjtn_Liang.Report_wcjtn_Stay_wcjtn_Time = function (onSuccess, onFail) {
        if (Laya.Browser.onMiniGame) {
            if (Mai_wcjtn_Liang.Mai_wcjtn_Liang_wcjtn_OpenId != "") {
                var req = new HttpUnit_1.request_wcjtn_Data();
                req.url_wcjtn_ = Mai_wcjtn_Liang._wcjtn_stay_wcjtn_;
                req.on_wcjtn_Success = onSuccess;
                req.on_wcjtn_Fail = onFail;
                req._wcjtn_data_wcjtn_.appid = AppConfig_1.default.App_wcjtn_ID;
                req._wcjtn_data_wcjtn_.openid = Mai_wcjtn_Liang.Mai_wcjtn_Liang_wcjtn_OpenId;
                var time = new Date().getTime() / 1000;
                req._wcjtn_data_wcjtn_.posttime = time;
                var staytime = Mai_wcjtn_Liang._wcjtn_time_wcjtn_ != 0 ? time - Mai_wcjtn_Liang._wcjtn_time_wcjtn_ : 0;
                req._wcjtn_data_wcjtn_.time = staytime;
                req.meth_wcjtn_ = "POST";
                console.log("发送停留时间至买量接口");
                Mai_wcjtn_Liang.req_wcjtn_uest(req);
            }
        }
        else {
            console.log("不在微信模式下调用，默认发送停留时间至买量接口失败");
            onFail(null);
        }
    };
    Mai_wcjtn_Liang._wcjtn_mainUr_wcjtn_l = "";
    Mai_wcjtn_Liang.u_wcjtn_click = "/v1.1/api/Activity/uclick.html";
    Mai_wcjtn_Liang._wcjtn_stay_wcjtn_ = "/v1.1/api/Activity/stay.html";
    Mai_wcjtn_Liang._wcjtn_key_wcjtn_ = ""; //推广路径中同名参数，需要调用方法WXAPi.getLaunchOptionsSync()，从返回的参数中获得。
    Mai_wcjtn_Liang.Mai_wcjtn_Liang_wcjtn_OpenId = ""; //买量系统唯一标识,执行GetMaiLiangOpenId()方法成功后自动获得。
    Mai_wcjtn_Liang._wcjtn_time_wcjtn_ = 0; //买量系统唯一标识后，记录当前时间（精确到秒）。
    return Mai_wcjtn_Liang;
}());
exports.default = Mai_wcjtn_Liang;
},{"../AppConfig":2,"../Net/HttpUnit":70,"../OPPOAPI":73,"../User/User":80,"../WXAPI":131}],30:[function(require,module,exports){
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
            AppConfig_1.default.Res_wcjtn_Server = AppConfig_1.default.Local_wcjtn_Test_wcjtn_ReServer;
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
            { url: AppConfig_1.default.Res_wcjtn_Server + "/json/appswitch.json", type: Laya.Loader.JSON }
        ];
        var self = this;
        Laya.loader.load(firstConfigs, Laya.Handler.create(this, function () {
            self.loadRes(); //加载资源
        }));
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_OnceEvent(EventDef_1.Event_wcjtn_Def.App_Close_wcjtn_First_wcjtn_Loading_wcjtn_View, this, this.closeloadingUI);
    };
    Main.prototype.initLoadingView = function () {
        this._loadingUI = new layaMaxUI_1.ui.View.LoadingUI();
        Laya.stage.addChild(this._loadingUI);
        this._loadingUI.width = Laya.stage.width;
        this._loadingUI.height = Laya.stage.height;
        this._loadingView = this._loadingUI.getComponent(LoadingView_1.default);
        this._loadingView.set_wcjtn_Process(0);
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
        this._preLoadRes.push({ url: "subRes/json/carData.json", type: Laya.Loader.JSON });
        this._preLoadRes.push({ url: "subRes/json/levelData.json", type: Laya.Loader.JSON });
        this._preLoadRes.push({ url: AppConfig_1.default.Res_wcjtn_Server + "/json/storeconfig.json", type: Laya.Loader.JSON }); //商店配置表
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
                            self._loadingView.set_wcjtn_Process(res / 2 + 0.5);
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
                self._loadingView.set_wcjtn_Process(res / 2);
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
                            self._loadingView.set_wcjtn_Process(res / 2 + 0.5);
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
                self._loadingView.set_wcjtn_Process(progress / 2);
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
                            self._loadingView.set_wcjtn_Process(res / 2 + 0.5);
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
                self._loadingView.set_wcjtn_Process(res / 2);
            });
        }
        else { //字节跳动没有分包
            if (resource.length > 0) {
                Laya.loader.load(resource, Laya.Handler.create(this, function () {
                    self.onLoadResComplate();
                }), Laya.Handler.create(this, function (res) {
                    self._loadingView.set_wcjtn_Process(res);
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
        this._loadingView.set_wcjtn_Process(1);
        if (Laya.Browser.onMiniGame) {
            WXAPI_1.default._wcjtn_wxLogin_wcjtn_(function (code) {
                var _this = this;
                User_1.default.code_wcjtn_ = code;
                HttpUnit_1.default.login_wcjtn_(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default._wcjtn_token = res.data.token;
                        User_1.default.openId_wcjtn_ = res.data.openid;
                        ALD_1.default.ald_wcjtn_Send_wcjtn_OpenId(User_1.default.openId_wcjtn_);
                        HttpUnit_1.default.get_wcjtn_Game_wcjtn_Data(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initi_wcjtn_User(res.data);
                            }
                            else {
                                User_1.default.initi_wcjtn_User(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default._wcjtn_token = "";
                            User_1.default.openId_wcjtn_ = "";
                            User_1.default.initi_wcjtn_User(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                    else {
                        console.log("登陆失败！！！" + res);
                        User_1.default.initi_wcjtn_User(null);
                        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                        }));
                    }
                }, function (res) {
                    console.log("登陆失败！！！" + res);
                    User_1.default.initi_wcjtn_User(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            }, null);
        }
        else if (Laya.Browser.onQGMiniGame) //oppo小游戏
         {
            OPPOAPI_1.default.init_wcjtn_AdService(function () {
            }, function () {
            }, function () {
            });
            OPPOAPI_1.default._wcjtn_Login_wcjtn_(function (token) {
                var _this = this;
                User_1.default.code_wcjtn_ = token;
                HttpUnit_1.default.login_wcjtn_(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default._wcjtn_token = res.data.token;
                        User_1.default.openId_wcjtn_ = res.data.openid;
                        HttpUnit_1.default.get_wcjtn_Game_wcjtn_Data(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initi_wcjtn_User(res.data);
                                console.log("获取用户数据--------------------Start");
                                for (var key in res.data) {
                                    console.log(key, res.data[key]);
                                }
                                console.log("获取用户数据--------------------End");
                            }
                            else {
                                User_1.default.initi_wcjtn_User(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default._wcjtn_token = "";
                            User_1.default.openId_wcjtn_ = "";
                            User_1.default.initi_wcjtn_User(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                    else {
                        console.log("登陆失败！！！", res);
                        User_1.default.initi_wcjtn_User(null);
                        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                        }));
                    }
                }, function (res) {
                    console.log("登陆失败！！！", res);
                    User_1.default.initi_wcjtn_User(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            }, null);
        }
        else if (Laya.Browser.onQQMiniGame) //qq小游戏
         {
            QQMiniGameAPI_1.default._wcjtn_Login_wcjtn_(function (code) {
                var _this = this;
                User_1.default.code_wcjtn_ = code;
                HttpUnit_1.default.login_wcjtn_(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default._wcjtn_token = res.data.token;
                        User_1.default.openId_wcjtn_ = res.data.openid;
                        ALD_1.default.ald_wcjtn_Send_wcjtn_OpenId(User_1.default.openId_wcjtn_);
                        HttpUnit_1.default.get_wcjtn_Game_wcjtn_Data(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initi_wcjtn_User(res.data);
                            }
                            else {
                                User_1.default.initi_wcjtn_User(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default._wcjtn_token = "";
                            User_1.default.openId_wcjtn_ = "";
                            User_1.default.initi_wcjtn_User(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                    else {
                        console.log("登陆失败！！！" + res);
                        User_1.default.initi_wcjtn_User(null);
                        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                        }));
                    }
                }, function (res) {
                    console.log("登陆失败！！！" + res);
                    User_1.default.initi_wcjtn_User(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            }, null);
        }
        else if (AppConfig_1.default.onTTMiniGame) //头条，字节跳动
         {
            TTAPI_1.default._wcjtn_ttLogin_wcjtn_(function (code) {
                var _this = this;
                User_1.default.code_wcjtn_ = code;
                HttpUnit_1.default.login_wcjtn_(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default._wcjtn_token = res.data.token;
                        User_1.default.openId_wcjtn_ = res.data.openid;
                        HttpUnit_1.default.get_wcjtn_Game_wcjtn_Data(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initi_wcjtn_User(res.data);
                            }
                            else {
                                User_1.default.initi_wcjtn_User(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default._wcjtn_token = "";
                            User_1.default.openId_wcjtn_ = "";
                            User_1.default.initi_wcjtn_User(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                    else {
                        console.log("登陆失败！！！" + res);
                        User_1.default.initi_wcjtn_User(null);
                        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                        }));
                    }
                }, function (res) {
                    console.log("登陆失败！！！" + res);
                    User_1.default.initi_wcjtn_User(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            }, function () {
                User_1.default.initi_wcjtn_User(null);
                GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                }));
            });
        }
        else if (Laya.Browser.onVVMiniGame) //VIVO 小游戏
         {
            var login_1 = function () {
                VIVOAPI_1.default.Login_wcjtn_(function (token, type) {
                    success_1(token);
                }, function () {
                    fail_1();
                });
            };
            var success_1 = function (code) {
                User_1.default.code_wcjtn_ = code;
                HttpUnit_1.default.login_wcjtn_(function (res) {
                    if (res.code == 1) {
                        console.log("登陆成功！！！");
                        User_1.default._wcjtn_token = res.data.token;
                        User_1.default.openId_wcjtn_ = res.data.openid;
                        HttpUnit_1.default.get_wcjtn_Game_wcjtn_Data(function (res) {
                            console.log("获取用户数据成功！！！");
                            if (1 == res.code) {
                                User_1.default.initi_wcjtn_User(res.data);
                                console.log("获取用户数据--------------------Start");
                                for (var key in res.data) {
                                    console.log(key, res.data[key]);
                                }
                                console.log("获取用户数据--------------------End");
                            }
                            else {
                                User_1.default.initi_wcjtn_User(null);
                            }
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        }, function (res) {
                            console.log("获取用户数据失败！！！");
                            User_1.default._wcjtn_token = "";
                            User_1.default.openId_wcjtn_ = "";
                            User_1.default.initi_wcjtn_User(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                    else {
                        console.log("登陆失败！！！", res);
                        User_1.default.initi_wcjtn_User(null);
                        GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                        }));
                    }
                }, function (res) {
                    console.log("登陆失败！！！", res);
                    User_1.default.initi_wcjtn_User(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            };
            var failCounter_1 = 0;
            var fail_1 = function () {
                if (failCounter_1 >= 1) {
                    console.log("vivo 登陆失败！！！重试次数已达上限");
                    User_1.default.initi_wcjtn_User(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                    return;
                }
                VIVOAPI_1.default.show_wcjtn_Dialog("提示", "登录失败，点击确定按钮重试", [
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
            User_1.default.test_wcjtn_InitUser(); //测试
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
},{"./ALD":1,"./AppConfig":2,"./Event/EventDef":9,"./Event/EventMgr":10,"./GameConfig":11,"./NativeCallback":68,"./Net/HttpUnit":70,"./OPPOAPI":73,"./QQMiniGameAPI":74,"./TTAPI":79,"./User/User":80,"./VIVOAPI":82,"./View/LoadingView/LoadingView":89,"./WXAPI":131,"./ui/layaMaxUI":132}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var SceneManager_1 = require("../MyScripts/Manager/SceneManager");
var GameSwitchConfig_1 = require("../Config/GameSwitchConfig");
//游戏管理器，游戏代码的入口
var Game_wcjtn_Mgr = /** @class */ (function (_super) {
    __extends(Game_wcjtn_Mgr, _super);
    function Game_wcjtn_Mgr() {
        var _this = _super.call(this) || this;
        Game_wcjtn_Mgr._instance = _this;
        return _this;
    }
    Game_wcjtn_Mgr.get_wcjtn_Instance = function () { return Game_wcjtn_Mgr._instance; };
    Game_wcjtn_Mgr.prototype.onAwake = function () {
        MaiLiang_1.default.Get_wcjtn_Mai_wcjtn_Liang_wcjtn_OpenId(function (res) {
            console.log("GameUI 买量数据上报成功");
            Laya.Browser.window["wx"].onShow(function () {
                MaiLiang_1.default.Get_wcjtn_Mai_wcjtn_Liang_wcjtn_OpenId(null, null);
            });
            Laya.Browser.window["wx"].onHide(function () {
                MaiLiang_1.default.Report_wcjtn_Stay_wcjtn_Time(null, null);
            });
        }, function (res) {
            console.log("GameUI 买量数据上报失败");
        });
        WXAPI_1.default.Set_wcjtn_Share_wcjtn_Menu("", "", function () {
        }, function () {
        }, function () {
        });
        WudianMgr_1.default.Update_wcjtn_IpBlock_wcjtn_State();
        this.report_wcjtn_Launch_wcjtn_Options();
        if (Laya.Browser.onMiniGame) {
            //Cached_wcjtn_WX_wcjtn_BannerAd.pre_wcjtn_load_wcjtn_Banner(); 如果是老项目使用了 CachedWXBannerAd 这个类，请打开这一行注释
            WXADMgr_1.default._wcjtn_init_wcjtn_(); //如果不是老项目，没有使用 WXADMgr 这个类, 请注释这一行。
        }
        else if (Laya.Browser.onQQMiniGame) {
            CachedQQBannerAd_1.default.pre_wcjtn_load_wcjtn_Banner();
            QQMiniGameAPI_1.default.Load_wcjtn_App_wcjtn_BoxAd(function () { }, function () { });
        }
        else if (Laya.Browser.onQGMiniGame) {
            if (null != Laya.Browser.window["qg"].reportMonitor && typeof (Laya.Browser.window["qg"].reportMonitor) == 'function') {
                Laya.Browser.window["qg"].reportMonitor('game_scene', 0);
            }
        }
    };
    Game_wcjtn_Mgr.prototype.onStart = function () {
        this.pre_wcjtn_Create_wcjtn_Game();
    };
    Game_wcjtn_Mgr.prototype.pre_wcjtn_Create_wcjtn_Game = function () {
        //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
        console.log("加载场景");
        var self = this;
        GameSwitchConfig_1.default.getInstance().hideBanner();
        //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
        Laya.Scene3D.load("subRes/LayaScene_scenes_01/Conventional/scenes_01.ls", Laya.Handler.create(self, function (scene) {
            Laya.stage.addChild(scene);
            scene.addComponent(SceneManager_1.default);
            EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.App_Close_wcjtn_First_wcjtn_Loading_wcjtn_View);
            GameSwitchConfig_1.default.getInstance().SetBannerActive();
        }));
    };
    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    Game_wcjtn_Mgr.prototype.save_wcjtn_Game_wcjtn_Data = function () {
        localStorage.setItem("Game_wcjtn_Data", User_1.default.get_wcjtn_Save_wcjtn_Data());
        // Http_wcjtn_Unit.save_wcjtn_Game_wcjtn_Data(User_wcjtn_.get_wcjtn_Save_wcjtn_Data(),
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
    Game_wcjtn_Mgr.prototype.report_wcjtn_Launch_wcjtn_Options = function () {
        HttpUnit_1.default.Get_wcjtn_user_wcjtn_ip(function (res) {
            if (1 == res.code) {
                console.log("获取玩家ip,地区成功 ：", res.data.dqip, res.data.ipxq);
                var opt = null;
                if (Laya.Browser.onMiniGame) {
                    opt = WXAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync();
                }
                else if (Laya.Browser.onQQMiniGame) {
                    opt = QQMiniGameAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync();
                }
                if (null != opt) {
                    ALD_1.default.ald_wcjtn_Send_wcjtn_Report_wcjtn_LaunchOptions(opt.scene, res.data.dqip, res.data.ipxq);
                }
            }
        }, function (res) {
            console.log("获取玩家ip,地区失败");
            var opt = null;
            if (Laya.Browser.onMiniGame) {
                opt = WXAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync();
            }
            else if (Laya.Browser.onQQMiniGame) {
                opt = QQMiniGameAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync();
            }
            if (null != opt) {
                ALD_1.default.ald_wcjtn_Send_wcjtn_Report_wcjtn_LaunchOptions(opt.scene, "", "");
            }
        });
    };
    Game_wcjtn_Mgr._instance = null;
    return Game_wcjtn_Mgr;
}(Laya.Script));
exports.default = Game_wcjtn_Mgr;
},{"../ALD":1,"../CachedQQBannerAd":3,"../Config/GameSwitchConfig":7,"../Event/EventDef":9,"../Event/EventMgr":10,"../MaiLiangAPI/MaiLiang":29,"../MyScripts/Manager/SceneManager":42,"../Net/HttpUnit":70,"../QQMiniGameAPI":74,"../User/User":80,"../WXAPI":131,"./WXADMgr":35,"./WudianMgr":36}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sound_wcjtn_Mgr = /** @class */ (function () {
    function Sound_wcjtn_Mgr() {
        this._enabled_wcjtn_ = true;
    }
    Object.defineProperty(Sound_wcjtn_Mgr.prototype, "_wcjtn_Enabled_wcjtn_", {
        get: function () {
            return this._enabled_wcjtn_;
        },
        set: function (e) {
            if (!e) {
                this.stop_wcjtn_BGM();
            }
            this._enabled_wcjtn_ = e;
        },
        enumerable: true,
        configurable: true
    });
    Sound_wcjtn_Mgr.prototype.get_wcjtn_Sound_wcjtn_Url = function (name) {
        var url = Sound_wcjtn_Mgr.sound_wcjtn_Res_wcjtn_Path + name + ".wav";
        return url;
    };
    Sound_wcjtn_Mgr.prototype.play_wcjtn_Sound = function (name) {
        if (!this._enabled_wcjtn_)
            return;
        var url = this.get_wcjtn_Sound_wcjtn_Url(name);
        if (Laya.Browser.onMiniGame) {
            var sound = laya.utils.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = Sound_wcjtn_Mgr.sound_wcjtn_Res_wcjtn_Path + name + ".wav";
                sound.onEnded(function () {
                    laya.utils.Pool.recover(name, sound);
                    sound.offEnded();
                });
            }
            sound.play();
            if (name == Sound_wcjtn_Type.SpeedUp) {
                this._speedSound = sound;
            }
        }
        else {
            Laya.SoundManager.playSound(url, 1);
        }
    };
    Sound_wcjtn_Mgr.prototype.stopSound = function (name) {
        if (!this._enabled_wcjtn_)
            return;
        var url = this.get_wcjtn_Sound_wcjtn_Url(name);
        if (Laya.Browser.onMiniGame) {
            if (name == Sound_wcjtn_Type.SpeedUp) {
                if (this._speedSound) {
                    this._speedSound.stop();
                }
            }
            else {
                var sound = laya.utils.Pool.getItem(name);
                if (sound == null) {
                    sound = wx.createInnerAudioContext();
                    sound.src = Sound_wcjtn_Mgr.sound_wcjtn_Res_wcjtn_Path + name + ".wav";
                    sound.onEnded(function () {
                        laya.utils.Pool.recover(name, sound);
                        sound.offEnded();
                    });
                }
                sound.stop();
            }
        }
        else {
            Laya.SoundManager.stopSound(url);
        }
    };
    Sound_wcjtn_Mgr.prototype.play_wcjtn_BGM = function (name) {
        if (!this._enabled_wcjtn_)
            return;
        // let url = this.get_wcjtn_Sound_wcjtn_Url(name);
        var url = Sound_wcjtn_Mgr.sound_wcjtn_Res_wcjtn_Path + name + ".ogg";
        if (Laya.Browser.onMiniGame) {
            if (!this._wcjtn_bgm_wcjtn_) {
                this._wcjtn_bgm_wcjtn_ = wx.createInnerAudioContext();
            }
            this._wcjtn_bgm_wcjtn_.pause();
            this._wcjtn_bgm_wcjtn_.src = url;
            this._wcjtn_bgm_wcjtn_.loop = true;
            this._wcjtn_bgm_wcjtn_.play();
        }
        else {
            Laya.SoundManager.playMusic(url, 0);
        }
    };
    Sound_wcjtn_Mgr.prototype.stop_wcjtn_BGM = function () {
        if (Laya.Browser.onMiniGame) {
            if (this._wcjtn_bgm_wcjtn_) {
                this._wcjtn_bgm_wcjtn_.pause();
            }
        }
        else {
            Laya.SoundManager.stopMusic();
        }
    };
    Sound_wcjtn_Mgr.sound_wcjtn_Res_wcjtn_Path = "subRes/sound/";
    Sound_wcjtn_Mgr.ins_wcjtn_tance = new Sound_wcjtn_Mgr();
    return Sound_wcjtn_Mgr;
}());
exports.default = Sound_wcjtn_Mgr;
var Sound_wcjtn_Type;
(function (Sound_wcjtn_Type) {
    Sound_wcjtn_Type["ClickBtn"] = "ClickBtn";
    Sound_wcjtn_Type["Crush"] = "Crush";
    Sound_wcjtn_Type["Driving"] = "Driving";
    Sound_wcjtn_Type["GetCoin"] = "GetCoin";
    Sound_wcjtn_Type["SpeedUp"] = "\u8DD1\u8F66\u52A0\u901F\u58F0\u97F3_C32kbps";
    Sound_wcjtn_Type["Whistle"] = "Whistle";
    Sound_wcjtn_Type["Bgm"] = "Bgm";
    Sound_wcjtn_Type["StopSpeedUp"] = "\u5F15\u64CE\u6536\u5C3E";
})(Sound_wcjtn_Type = exports.Sound_wcjtn_Type || (exports.Sound_wcjtn_Type = {}));
},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NativeCallback_1 = require("../NativeCallback");
var Vibrate_wcjtn_Mgr = /** @class */ (function () {
    function Vibrate_wcjtn_Mgr() {
    }
    //短震动
    Vibrate_wcjtn_Mgr.vibrate_wcjtn_Short = function () {
        if (!Vibrate_wcjtn_Mgr.is_wcjtn_Enable)
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
    Vibrate_wcjtn_Mgr.vibrate_wcjtn_Long = function () {
        if (!Vibrate_wcjtn_Mgr.is_wcjtn_Enable)
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
    Vibrate_wcjtn_Mgr.vibrate_wcjtn_ = function (time) {
        if (!Vibrate_wcjtn_Mgr.is_wcjtn_Enable)
            return;
        if (Laya.Browser.onMiniGame) {
            var count_1 = time / 15; //微信小游戏中震动的时间是15毫秒的整数倍时间，本质是对短震动的封装
            var index_1 = 0;
            var obj_1 = { count: count_1, index: index_1 };
            Laya.timer.loop(16, obj_1, function () {
                Vibrate_wcjtn_Mgr.vibrate_wcjtn_Short();
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
                Vibrate_wcjtn_Mgr.vibrate_wcjtn_Short();
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
                Vibrate_wcjtn_Mgr.vibrate_wcjtn_Short();
                index_3++;
                if (index_3 > count_3) {
                    Laya.timer.clearAll(obj_3);
                }
            });
        }
    };
    Vibrate_wcjtn_Mgr.is_wcjtn_Enable = true;
    return Vibrate_wcjtn_Mgr;
}());
exports.default = Vibrate_wcjtn_Mgr;
},{"../NativeCallback":68}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSwitchConfig_1 = require("../Config/AppSwitchConfig");
var WudianMgr_1 = require("./WudianMgr");
var View_wcjtn_Def;
(function (View_wcjtn_Def) {
    View_wcjtn_Def["None"] = "";
    View_wcjtn_Def["TipsView"] = "View/TipsView.json";
    View_wcjtn_Def["ClickGetPrize"] = "View/ClickGetPrize.json";
    View_wcjtn_Def["MainView"] = "View/Template/MainViewTemplate.json";
    View_wcjtn_Def["MiniGameView"] = "View/Template/MiniGameViewTemplate.json";
    View_wcjtn_Def["RewardView"] = "View/Template/RewardViewTemplate.json";
    View_wcjtn_Def["InGameView"] = "View/Template/InGameViewTemplate.json";
    View_wcjtn_Def["GameWinView"] = "View/Template/GameWinViewTemplate.json";
    View_wcjtn_Def["GameFailView"] = "View/Template/GameFailViewTemplate.json";
    View_wcjtn_Def["ExportView"] = "View/Template/ExportViewTemplate.json";
    View_wcjtn_Def["Export2View"] = "View/Template/Export2ViewTemplate.json";
    View_wcjtn_Def["Export3View"] = "View/Template/Export3ViewTemplate.json";
    View_wcjtn_Def["WXCrazyClick"] = "View/Template/WXCrazyClick.json";
    View_wcjtn_Def["OPPONativeView"] = "View/Template/OPPONativeViewTemplate.json";
    View_wcjtn_Def["QQCrazyClickView"] = "View/Template/QQ/QQCrazyClick.json";
    View_wcjtn_Def["QQCrazyClickView2"] = "View/Template/QQ/QQCrazyClick2.json";
    View_wcjtn_Def["TTStoreView"] = "View/Template/TT/TTStore.json";
    View_wcjtn_Def["TTSignInView"] = "View/Template/TT/TTSignIn.json";
    View_wcjtn_Def["TTRewardView"] = "View/Template/TT/TTReward.json";
    View_wcjtn_Def["VVNativeView1"] = "View/Template/VV/VVNativeView1Template.json";
    View_wcjtn_Def["VVNativeView2"] = "View/Template/VV/VVNativeView2Template.json";
    //todo:添加你的界面
    View_wcjtn_Def["MyMainView"] = "View/MyViews/MainView.json";
    View_wcjtn_Def["GameView"] = "View/MyViews/GameView.json";
})(View_wcjtn_Def = exports.View_wcjtn_Def || (exports.View_wcjtn_Def = {}));
//界面管理器
var View_wcjtn_Mgr = /** @class */ (function () {
    function View_wcjtn_Mgr() {
        this._wcjtn__views_wcjtn_ = {};
        this._loading_wcjtn_List = new Array();
    }
    View_wcjtn_Mgr.prototype.open_wcjtn_View = function (viewType, data, oncomplate) {
        if (this._wcjtn__views_wcjtn_[viewType]) {
            var view = this._wcjtn__views_wcjtn_[viewType];
            var coms = view._components;
            var viewBase = null;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        viewBase = element;
                        viewBase.open_wcjtn_View(data);
                        break;
                    }
                }
            }
            if (oncomplate) {
                oncomplate(viewBase);
            }
            return;
        }
        for (var i = 0; i < this._loading_wcjtn_List.length; ++i) {
            var def = this._loading_wcjtn_List[i];
            if (def == viewType) {
                console.log("界面 : " + String(def) + " 正在加载中，请不要重复加载");
                return;
            }
        }
        var viewUrl = String(viewType);
        var self = this;
        this._loading_wcjtn_List.push(viewType);
        Laya.Scene.load(viewUrl, Laya.Handler.create(this, function (owner) {
            Laya.stage.addChild(owner);
            var view = owner;
            self._wcjtn__views_wcjtn_[viewType] = view;
            var coms = owner._components;
            var viewBase = null;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        viewBase = element;
                        element._viewDef = viewType;
                        viewBase.open_wcjtn_View(data);
                        break;
                    }
                }
            }
            for (var i = 0; i < self._loading_wcjtn_List.length; ++i) {
                var def = self._loading_wcjtn_List[i];
                if (def == viewType) {
                    self._loading_wcjtn_List.splice(i, 1);
                    break;
                }
            }
            if (oncomplate) {
                oncomplate(viewBase);
            }
        }));
    };
    View_wcjtn_Mgr.prototype.close_wcjtn_View = function (viewType) {
        var view = this._wcjtn__views_wcjtn_[viewType];
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
            this._wcjtn__views_wcjtn_[viewType] = null;
        }
    };
    View_wcjtn_Mgr.prototype.Show_wcjtn_View = function (viewType) {
        var view = this._wcjtn__views_wcjtn_[viewType];
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
    View_wcjtn_Mgr.prototype.hide_wcjtn_View = function (viewType) {
        var view = this._wcjtn__views_wcjtn_[viewType];
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
    View_wcjtn_Mgr.prototype.get_wcjtn_View = function (viewType) {
        return this._wcjtn__views_wcjtn_[viewType];
    };
    View_wcjtn_Mgr.prototype.show_wcjtn_Tips = function (msg) {
        this.open_wcjtn_View(View_wcjtn_Def.TipsView, msg);
    };
    //尝试打开 导出界面3 (Exprot3ViewTemplate)
    //complate 回调用函数，如果成功打开界面 complate 接受参数 Export3View实例 否则为 null
    View_wcjtn_Mgr.prototype.tryShowPopAd = function (complate) {
        if (1 == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().pop_wcjtn_Ad && WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.Export3View, null, function (v) {
                if (null != complate)
                    complate(v);
            });
        }
        else {
            if (null != complate)
                complate(null);
        }
    };
    View_wcjtn_Mgr.ins_wcjtn_tance = new View_wcjtn_Mgr();
    return View_wcjtn_Mgr;
}());
exports.default = View_wcjtn_Mgr;
},{"../Config/AppSwitchConfig":6,"./WudianMgr":36}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSwitchConfig_1 = require("../Config/AppSwitchConfig");
var WX_wcjtn_BannderAd = /** @class */ (function () {
    function WX_wcjtn_BannderAd(bannerid) {
        this._id_wcjtn_ = null;
        this._banner_wcjtn_ = null;
        this._create_wcjtn_Time = 0;
        this._destroyed_wcjtn_ = false;
        this._wcjtn__error_wcjtn_ = null;
        this._loading_wcjtn_ = false;
        this._retry_wcjtn_Count = 0;
        this._banner_wcjtn_Total_wcjtn_ShowTime = 0;
        this._last_wcjtn_Show_wcjtn_Time = 0;
        this._id_wcjtn_ = bannerid;
    }
    Object.defineProperty(WX_wcjtn_BannderAd.prototype, "_wcjtn_Id_wcjtn_", {
        get: function () {
            return this._id_wcjtn_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX_wcjtn_BannderAd.prototype, "Create_wcjtn_Time", {
        get: function () {
            return this._create_wcjtn_Time;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX_wcjtn_BannderAd.prototype, "Destroyed_wcjtn_", {
        get: function () {
            return this._destroyed_wcjtn_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX_wcjtn_BannderAd.prototype, "is_wcjtn_Ready", {
        get: function () {
            return null != this._banner_wcjtn_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX_wcjtn_BannderAd.prototype, "is_wcjtn_Error", {
        get: function () {
            return null != this._wcjtn__error_wcjtn_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX_wcjtn_BannderAd.prototype, "_wcjtn_Error_wcjtn_", {
        get: function () {
            return this._wcjtn__error_wcjtn_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX_wcjtn_BannderAd.prototype, "Load_wcjtn_ing", {
        get: function () {
            return this._loading_wcjtn_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX_wcjtn_BannderAd.prototype, "Retry_wcjtn_Count", {
        get: function () {
            return this._retry_wcjtn_Count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX_wcjtn_BannderAd.prototype, "Banner_wcjtn_Total_wcjtn_ShowTime", {
        get: function () {
            return this._banner_wcjtn_Total_wcjtn_ShowTime;
        },
        enumerable: true,
        configurable: true
    });
    WX_wcjtn_BannderAd.prototype._wcjtn_show_wcjtn_ = function () {
        if (this.is_wcjtn_Ready) {
            this._banner_wcjtn_.hide();
            var self_1 = this;
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            var pos = new Laya.Point(0, 0);
            var width = 300;
            var left = sw / 2 - width / 2;
            var top_1 = sh - 130;
            this._banner_wcjtn_.style.left = left;
            this._banner_wcjtn_.style.top = top_1;
            this._last_wcjtn_Show_wcjtn_Time = Laya.timer.currTimer;
            this._banner_wcjtn_.show();
        }
    };
    WX_wcjtn_BannderAd.prototype._wcjtn_hide_wcjtn_ = function () {
        if (this.is_wcjtn_Ready) {
            this._banner_wcjtn_.hide();
            this._banner_wcjtn_Total_wcjtn_ShowTime += (Laya.timer.currTimer - this._last_wcjtn_Show_wcjtn_Time);
        }
    };
    WX_wcjtn_BannderAd.prototype.des_wcjtn_troy = function () {
        if (this._destroyed_wcjtn_) {
            console.log("BannerAd 已经被销毁");
            return;
        }
        if (this._loading_wcjtn_) {
            console.log("BannerAd 正在加载中，无法进行销毁");
            return;
        }
        if (null != this._banner_wcjtn_) {
            this._banner_wcjtn_.destroy();
        }
        this._banner_wcjtn_ = null;
        this._destroyed_wcjtn_ = true;
    };
    WX_wcjtn_BannderAd.prototype._wcjtn_retry_wcjtn_ = function (callBack) {
        if (this._destroyed_wcjtn_) {
            console.log("BannerAd 已被销毁，无法重试");
            return;
        }
        if (this.is_wcjtn_Ready) {
            console.log("BannerAd 已创建成功，无需重试");
            return;
        }
        if (this._loading_wcjtn_) {
            console.log("BannerAd 正在创建中");
            return;
        }
        if (this._retry_wcjtn_Count >= WX_wcjtn_BannderAd.MAX__wcjtn_RETRY_COUNT_wcjtn_) {
            console.log("此 BannerAd 重试次数已达最大");
            return;
        }
        var self = this;
        this._create_wcjtn_(function (isOk) {
            if (null != callBack) {
                callBack(isOk);
            }
            ++self._retry_wcjtn_Count;
        });
    };
    WX_wcjtn_BannderAd.prototype._create_wcjtn_ = function (callBack) {
        if (!Laya.Browser.onMiniGame) {
            if (null != callBack) {
                callBack(false);
            }
            return;
        }
        var banner = null;
        if (Laya.Browser.onMiniGame) {
            banner = Laya.Browser.window["wx"].createBannerAd({
                adUnitId: this._id_wcjtn_,
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
                adUnitId: this._id_wcjtn_,
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
            this._loading_wcjtn_ = true;
            banner.onLoad(function (res) {
                console.log("BannderAd 加载完成", self_2._id_wcjtn_, res);
                self_2._banner_wcjtn_ = banner;
                self_2._create_wcjtn_Time = Laya.timer.currTimer;
                self_2._loading_wcjtn_ = false;
                if (null != callBack) {
                    callBack(true);
                }
            });
            banner.onError(function (err) {
                console.log("BannderAd 加载失败", self_2._id_wcjtn_, err);
                self_2._wcjtn__error_wcjtn_ = err;
                self_2._loading_wcjtn_ = false;
                banner.destroy();
                if (null != callBack) {
                    callBack(false);
                }
            });
        }
    };
    WX_wcjtn_BannderAd.MAX__wcjtn_RETRY_COUNT_wcjtn_ = 3;
    return WX_wcjtn_BannderAd;
}());
exports.WX_wcjtn_BannderAd = WX_wcjtn_BannderAd;
var WX_wcjtn_GridAd = /** @class */ (function () {
    function WX_wcjtn_GridAd(bannerid) {
        this._id_wcjtn_ = null;
        this._grid_wcjtn_Ad = null;
        this._create_wcjtn_Time = 0;
        this._des_wcjtn_troyed = false;
        this._wcjtn__error_wcjtn_ = null;
        this._load_wcjtn_ing = false;
        this._id_wcjtn_ = bannerid;
    }
    Object.defineProperty(WX_wcjtn_GridAd.prototype, "Create_wcjtn_Time", {
        get: function () {
            return this._create_wcjtn_Time;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX_wcjtn_GridAd.prototype, "Des_wcjtn_troyed", {
        get: function () {
            return this._des_wcjtn_troyed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX_wcjtn_GridAd.prototype, "is_wcjtn_Ready", {
        get: function () {
            return null != this._grid_wcjtn_Ad;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX_wcjtn_GridAd.prototype, "is_wcjtn_Error", {
        get: function () {
            return null != this._wcjtn__error_wcjtn_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX_wcjtn_GridAd.prototype, "_wcjtn_Error_wcjtn_", {
        get: function () {
            return this._wcjtn__error_wcjtn_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WX_wcjtn_GridAd.prototype, "Load_wcjtn_ing", {
        get: function () {
            return this._load_wcjtn_ing;
        },
        enumerable: true,
        configurable: true
    });
    WX_wcjtn_GridAd.prototype._wcjtn_show_wcjtn_ = function () {
        if (this.is_wcjtn_Ready) {
            this._grid_wcjtn_Ad.show();
        }
    };
    WX_wcjtn_GridAd.prototype._wcjtn_hide_wcjtn_ = function () {
        if (this.is_wcjtn_Ready) {
            this._grid_wcjtn_Ad.hide();
        }
    };
    WX_wcjtn_GridAd.prototype.des_wcjtn_troy = function () {
        if (this._des_wcjtn_troyed) {
            console.log("GridAD 已经被销毁");
            return;
        }
        if (this._load_wcjtn_ing) {
            console.log("GridAD 正在加载中，无法进行销毁");
            return;
        }
        if (null != this._grid_wcjtn_Ad) {
            this._grid_wcjtn_Ad.destroy();
        }
        this._grid_wcjtn_Ad = null;
        this._des_wcjtn_troyed = true;
    };
    WX_wcjtn_GridAd.prototype._wcjtn_retry_wcjtn_ = function (callBack) {
        if (this._des_wcjtn_troyed) {
            console.log("GridAD 已被销毁，无法重试");
            return;
        }
        if (this.is_wcjtn_Ready) {
            console.log("GridAD 已创建成功，无需重试");
            return;
        }
        if (this._load_wcjtn_ing) {
            console.log("GridAD 正在创建中");
            return;
        }
        var self = this;
        this._wcjtn__create_wcjtn_(function (isOk) {
            if (null != callBack) {
                callBack(isOk);
            }
        });
    };
    WX_wcjtn_GridAd.prototype._wcjtn__create_wcjtn_ = function (callBack) {
        if (!Laya.Browser.onMiniGame) {
            if (null != callBack) {
                callBack(false);
            }
            return;
        }
        var gridAd = Laya.Browser.window["wx"].createGridAd({
            adUnitId: this._id_wcjtn_,
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
            this._load_wcjtn_ing = true;
            gridAd.onLoad(function (res) {
                console.log("GridAD 加载完成", self_3._id_wcjtn_, res);
                self_3._grid_wcjtn_Ad = gridAd;
                self_3._create_wcjtn_Time = Laya.timer.currTimer;
                self_3._load_wcjtn_ing = false;
                if (null != callBack) {
                    callBack(true);
                }
            });
            gridAd.onError(function (err) {
                console.log("GridAD 加载失败", self_3._id_wcjtn_, err);
                self_3._wcjtn__error_wcjtn_ = err;
                self_3._load_wcjtn_ing = false;
                gridAd.destroy();
                if (null != callBack) {
                    callBack(false);
                }
            });
        }
    };
    return WX_wcjtn_GridAd;
}());
exports.WX_wcjtn_GridAd = WX_wcjtn_GridAd;
var WX_wcjtn_ADMgr = /** @class */ (function () {
    function WX_wcjtn_ADMgr() {
    }
    WX_wcjtn_ADMgr._wcjtn_init_wcjtn_ = function () {
        if (WX_wcjtn_ADMgr._inited_wcjtn_)
            return;
        var banners = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wx_wcjtn_Wu_wcjtn_Dian_wcjtn_Banners;
        for (var i = 0; i < banners.length; ++i) {
            WX_wcjtn_ADMgr._banner_wcjtn_Ids.push(banners[i]);
        }
        for (var i = 0; i < WX_wcjtn_ADMgr._banner_wcjtn_Ids.length; ++i) {
            var cur = WX_wcjtn_ADMgr._banner_wcjtn_Ids[i];
            WX_wcjtn_ADMgr._banner_wcjtn_Ids[i] = banners[Math.floor(Math.random() * banners.length)];
        }
        WX_wcjtn_ADMgr._create_wcjtn_BannerAd_wcjtn_();
        var bannerRecreateTime = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Create_wcjtn_FailNum * 1000;
        Laya.timer.loop(bannerRecreateTime, WX_wcjtn_ADMgr, function () {
            WX_wcjtn_ADMgr._check_wcjtn_BannerAd_wcjtn_();
            WX_wcjtn_ADMgr._create_wcjtn_BannerAd_wcjtn_();
        });
        //WX_wcjtn_ADMgr._create_wcjtn_GirdAd();
        WX_wcjtn_ADMgr._inited_wcjtn_ = true;
    };
    WX_wcjtn_ADMgr.get_wcjtn_Banner = function (callBack) {
        var readyBannerAd = [];
        var UnreadyBannerAd = [];
        for (var i = 0; i < WX_wcjtn_ADMgr._banners_wcjtn_.length; ++i) {
            var bannerAd_1 = WX_wcjtn_ADMgr._banners_wcjtn_[i];
            if (!bannerAd_1.Destroyed_wcjtn_) {
                if (bannerAd_1.is_wcjtn_Ready) {
                    readyBannerAd.push(bannerAd_1);
                }
                else {
                    UnreadyBannerAd.push(bannerAd_1);
                }
            }
        }
        if (WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_GetIndex >= readyBannerAd.length) {
            WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_GetIndex = 0;
        }
        var bannerAd = readyBannerAd[WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_GetIndex];
        ++WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_GetIndex;
        if (null != bannerAd) {
            callBack(bannerAd);
        }
        else {
            bannerAd = WX_wcjtn_ADMgr._create_wcjtn_BannerAd_wcjtn_();
            if (null == bannerAd) {
                bannerAd = WX_wcjtn_ADMgr._banners_wcjtn_[Math.floor(Math.random() * WX_wcjtn_ADMgr._banners_wcjtn_.length)];
            }
            if (null == bannerAd) {
                callBack(null);
            }
            else {
                bannerAd._wcjtn_retry_wcjtn_(function (ok) {
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
    WX_wcjtn_ADMgr._create_wcjtn_BannerAd_wcjtn_ = function () {
        if (WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_CreateIndex >= WX_wcjtn_ADMgr._banner_wcjtn_Ids.length)
            return null;
        var bannerAd = new WX_wcjtn_BannderAd(WX_wcjtn_ADMgr._banner_wcjtn_Ids[WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_CreateIndex]);
        WX_wcjtn_ADMgr._banners_wcjtn_.push(bannerAd);
        bannerAd._wcjtn_retry_wcjtn_();
        ++WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_CreateIndex;
        return bannerAd;
    };
    WX_wcjtn_ADMgr._check_wcjtn_BannerAd_wcjtn_ = function () {
        var readyBannerAd = [];
        var UnreadyBannerAd = [];
        for (var i = 0; i < WX_wcjtn_ADMgr._banners_wcjtn_.length; ++i) {
            var bannerAd = WX_wcjtn_ADMgr._banners_wcjtn_[i];
            if (!bannerAd.Destroyed_wcjtn_) {
                if (bannerAd.is_wcjtn_Ready) {
                    readyBannerAd.push(bannerAd);
                }
                else {
                    UnreadyBannerAd.push(bannerAd);
                }
            }
        }
        for (var i = 0; i < WX_wcjtn_ADMgr._banners_wcjtn_.length; ++i) {
            var bannerAd = WX_wcjtn_ADMgr._banners_wcjtn_[i];
            var bannerShowTime = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Show_wcjtn_Time;
            if (!bannerAd.is_wcjtn_Ready) {
                if (bannerAd.Retry_wcjtn_Count >= WX_wcjtn_BannderAd.MAX__wcjtn_RETRY_COUNT_wcjtn_) {
                    console.log("BannerAd 超过重试次数，销毁 : ", bannerAd._wcjtn_Id_wcjtn_);
                    bannerAd.des_wcjtn_troy();
                }
                else {
                    bannerAd._wcjtn_retry_wcjtn_();
                }
            }
            else if (readyBannerAd.length >= 2 && bannerAd.Banner_wcjtn_Total_wcjtn_ShowTime >= bannerShowTime * 1000) {
                console.log("BannerAd 展示时间超过限制，销毁 : ", bannerAd._wcjtn_Id_wcjtn_);
                bannerAd.des_wcjtn_troy();
            }
        }
    };
    WX_wcjtn_ADMgr.get_wcjtn_Box_wcjtn_Ad = function (callBack) {
        if (WX_wcjtn_ADMgr._wx_wcjtn_GridAd.is_wcjtn_Ready) {
            callBack(WX_wcjtn_ADMgr._wx_wcjtn_GridAd);
        }
        else {
            var gridAd_1 = WX_wcjtn_ADMgr._wx_wcjtn_GridAd;
            gridAd_1._wcjtn_retry_wcjtn_(function (isOk) {
                if (isOk) {
                    callBack(gridAd_1);
                }
                else {
                    callBack(null);
                }
            });
        }
    };
    WX_wcjtn_ADMgr._create_wcjtn_GirdAd = function () {
        if (null != WX_wcjtn_ADMgr._wx_wcjtn_GridAd)
            return;
        var gridAd = new WX_wcjtn_GridAd("");
        gridAd._wcjtn_retry_wcjtn_();
        WX_wcjtn_ADMgr._wx_wcjtn_GridAd = gridAd;
    };
    WX_wcjtn_ADMgr._inited_wcjtn_ = false;
    WX_wcjtn_ADMgr._banner_wcjtn_Ids = new Array();
    WX_wcjtn_ADMgr._banners_wcjtn_ = new Array();
    WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_CreateIndex = 0;
    WX_wcjtn_ADMgr._cur_wcjtn_Banner_wcjtn_GetIndex = 0;
    WX_wcjtn_ADMgr._wx_wcjtn_GridAd = null;
    return WX_wcjtn_ADMgr;
}());
exports.default = WX_wcjtn_ADMgr;
},{"../Config/AppSwitchConfig":6}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpUnit_1 = require("../Net/HttpUnit");
var AppSwitchConfig_1 = require("../Config/AppSwitchConfig");
var WXAPI_1 = require("../WXAPI");
var QQMiniGameAPI_1 = require("../QQMiniGameAPI");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var Wu_wcjtn_dian_wcjtn_Mgr = /** @class */ (function () {
    function Wu_wcjtn_dian_wcjtn_Mgr() {
    }
    Wu_wcjtn_dian_wcjtn_Mgr.Ip_wcjtn_Block_wcjtn_Flag = function () {
        return Wu_wcjtn_dian_wcjtn_Mgr._ipBlockFlag;
    };
    /**
     * 此方法调用很慢，所以要在游戏初始化的时候调用一次此方法
     *
     * @static
     * @memberof WudianMgr
     */
    Wu_wcjtn_dian_wcjtn_Mgr.Update_wcjtn_IpBlock_wcjtn_State = function () {
        HttpUnit_1.default.Get_wcjtn_Ip_wcjtn_Block(function (res) {
            console.log("调用IpBlock接口成功,结果为:", res);
            Wu_wcjtn_dian_wcjtn_Mgr._ipBlockFlag = res.code;
            EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.App_On_wcjtn_Update_wcjtn_IpBlockState, { ipBlockFlag: Wu_wcjtn_dian_wcjtn_Mgr._ipBlockFlag });
        }, null);
    };
    /**
     * IP是否被屏蔽
     *
     * @static
     * @returns {boolean}
     * @memberof WudianMgr
     */
    Wu_wcjtn_dian_wcjtn_Mgr.Get_wcjtn_Ip_wcjtn_Blocked = function () {
        return Wu_wcjtn_dian_wcjtn_Mgr._ipBlockFlag == 0;
    };
    /**
     * 得到用户进入的场景值
     *
     * @static
     * @returns {number}
     * @memberof WudianMgr
     */
    Wu_wcjtn_dian_wcjtn_Mgr.Get_wcjtn_Entry_wcjtn_Scene = function () {
        return WXAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene == 1006;
    };
    /**
     * 误点开关是否打开，包括了总开关和分时开关
     *
     * @static
     * @returns {boolean}
     * @memberof WudianMgr
     */
    Wu_wcjtn_dian_wcjtn_Mgr.Is_wcjtn_Switch_wcjtn_Open = function () {
        var mainSwitch = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian == 1;
        var isOpenTime = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wudianTimeAvaliable;
        console.log("误点Flag状态: ", "总开关:", mainSwitch, "打开时间", isOpenTime);
        return mainSwitch && isOpenTime;
    };
    Object.defineProperty(Wu_wcjtn_dian_wcjtn_Mgr, "Wu_wcjtn_dian_wcjtn_Flag", {
        /**
         * 完全封装好的误点Flag
         *
         * @readonly
         * @static
         * @type {boolean}
         * @memberof WudianMgr
         */
        get: function () {
            var mainSwitch = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian == 1;
            var launchScene = null;
            if (Laya.Browser.onMiniGame) {
                launchScene = WXAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
            }
            else if (Laya.Browser.onQQMiniGame) {
                launchScene = QQMiniGameAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
            }
            var noEnterBySearch = true;
            var wudianSceneList = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
            for (var i = 0; i < wudianSceneList.length; ++i) {
                var wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            var isOpenTime = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wudianTimeAvaliable;
            var ipnotBlock = Wu_wcjtn_dian_wcjtn_Mgr._ipBlockFlag == 0;
            /* 测试功能，等删 */
            // ipnotBlock = true;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock, "打开时间", isOpenTime);
            return mainSwitch && noEnterBySearch && ipnotBlock && isOpenTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Wu_wcjtn_dian_wcjtn_Mgr, "No_wcjtn_Time_wcjtn_Wudian_wcjtn_Flag", {
        /**
         * 没有涉及到定时开关的wudianFlag,自行整合按照时间开关的效果
         *
         * @static
         * @returns {boolean}
         * @memberof WudianMgr
         */
        get: function () {
            var mainSwitch = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian == 1;
            var launchScene = null;
            if (Laya.Browser.onMiniGame) {
                launchScene = WXAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
            }
            else if (Laya.Browser.onQQMiniGame) {
                launchScene = QQMiniGameAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
            }
            var noEnterBySearch = true;
            var wudianSceneList = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
            for (var i = 0; i < wudianSceneList.length; ++i) {
                var wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            var ipnotBlock = Wu_wcjtn_dian_wcjtn_Mgr._ipBlockFlag == 0;
            /* 测试功能，等删 */
            // ipnotBlock = true;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
            return mainSwitch && noEnterBySearch && ipnotBlock;
        },
        enumerable: true,
        configurable: true
    });
    Wu_wcjtn_dian_wcjtn_Mgr._ipBlockFlag = -1;
    return Wu_wcjtn_dian_wcjtn_Mgr;
}());
exports.default = Wu_wcjtn_dian_wcjtn_Mgr;
},{"../Config/AppSwitchConfig":6,"../Event/EventDef":9,"../Event/EventMgr":10,"../Net/HttpUnit":70,"../QQMiniGameAPI":74,"../WXAPI":131}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utilit_1 = require("../../Utilit");
var Rock_1 = require("../OBJ/Rock");
var Tree_1 = require("../OBJ/Tree");
var Cloud_1 = require("../OBJ/Cloud");
var SceneManager_1 = require("./SceneManager");
var PlayerManager_1 = require("./PlayerManager");
var EnvirManager = /** @class */ (function (_super) {
    __extends(EnvirManager, _super);
    function EnvirManager() {
        var _this = _super.call(this) || this;
        _this.mRockList = new Array();
        _this.mTreeList = new Array();
        _this.mCloudList = new Array();
        _this.cityEnvList = new Array();
        _this._currentCityID = 0;
        _this._cityDis = 164; //城市环境相互间隔
        _this._currentCityPosID = 2;
        return _this;
    }
    EnvirManager.Instance = function () {
        return this._instance;
    };
    EnvirManager.prototype.onAwake = function () {
        EnvirManager._instance = this;
        this.Init();
    };
    EnvirManager.prototype.onUpdate = function () {
        if (this._envirCity.active)
            this.CityEnvRecover();
    };
    EnvirManager.prototype.Init = function () {
        var _this = this;
        this.mTrees = this.owner.getChildByName("trees");
        this.mTrees._children.forEach(function (child) {
            var tree = child.addComponent(Tree_1.default);
            _this.mTreeList.push(tree);
            tree.Hide();
        });
        this.mRocks = this.owner.getChildByName("rocks");
        this.mRocks._children.forEach(function (child) {
            var rock = child.addComponent(Rock_1.default);
            _this.mRockList.push(rock);
            rock.Hide();
        });
        this.mClouds = this.owner.getChildByName("clouds");
        this.mClouds._children.forEach(function (child) {
            var cloud = child.addComponent(Cloud_1.default);
            _this.mCloudList.push(cloud);
            cloud.Hide();
        });
        this.mLight = SceneManager_1.default.Instance().GetChildByName("Directional Light");
        this._envirCity = this.owner.getChildByName("cityEnv");
        //=============
        this._envirCity.active = false;
        // Laya.timer.once(2000, this, () => {
        //     this._envirCity.active = true;
        //     this.mRocks.active = false;
        //     this.mTrees.active = false;
        // })
        //======================
        this._envirCity._children.forEach(function (child) {
            _this.cityEnvList.push(child);
        });
        // this.randomSky();
        Utilit_1.default.for_wcjtn_Each_wcjtn_Child(this._envirCity, function (child) {
            if (child.name == "model") {
                child.meshRenderer.castShadow = true;
            }
        });
    };
    EnvirManager.prototype.ShowEnvir = function (dis) {
        this.ConfigCloud(dis);
        if (this._envirCity.active)
            return;
        var randomAmount = Math.floor(Math.random() * 3) + 1;
        var randomDis = dis + Math.random() * 20 - 20;
        for (var i = 0; i < randomAmount; i++) {
            this.ConfigTree(randomDis + 3 * i);
            this.ConfigRock(dis);
        }
    };
    /**
     * 城市环境的循环生成
     */
    EnvirManager.prototype.CityEnvRecover = function () {
        var pos = this.cityEnvList[this._currentCityID].transform.position;
        if (pos.z - PlayerManager_1.default.Instance().GetPlayerCar().GetCarPos().z < -100) {
            this.cityEnvList[this._currentCityID].transform.position = new Laya.Vector3(pos.x, pos.y, this._cityDis * this._currentCityPosID);
            this._currentCityID++;
            this._currentCityPosID++;
            if (this._currentCityID >= this.cityEnvList.length)
                this._currentCityID = 0;
        }
    };
    EnvirManager.prototype.ConfigRock = function (dis) {
        //显示岩石
        var rock = null;
        for (var i = 0; i < this.mRockList.length; i++) {
            if (!this.mRockList[i].InShow()) {
                rock = this.mRockList[i];
                break;
            }
        }
        if (rock == null) {
            var index = Math.floor(Math.random() * this.mRockList.length);
            var sp = Laya.Sprite3D.instantiate(this.mRockList[index].owner, this.mRocks);
            rock = sp.getComponent(Rock_1.default);
            this.mRockList.push(rock);
        }
        rock.Show(dis + 25);
    };
    EnvirManager.prototype.ConfigTree = function (dis) {
        //显示树
        var tree = null;
        for (var i = 0; i < this.mTreeList.length; i++) {
            if (!this.mTreeList[i].InShow()) {
                tree = this.mTreeList[i];
                break;
            }
        }
        if (tree == null) {
            var index = Math.floor(Math.random() * this.mTreeList.length);
            var sp = Laya.Sprite3D.instantiate(this.mTreeList[index].owner, this.mRocks);
            tree = sp.getComponent(Tree_1.default);
            this.mTreeList.push(tree);
        }
        tree.Show(dis + 20);
    };
    EnvirManager.prototype.ConfigCloud = function (dis) {
        if (Math.random() > 0.42)
            return;
        var cloud = null;
        for (var i = 0; i < this.mCloudList.length; i++) {
            if (!this.mCloudList[i].InShow()) {
                cloud = this.mCloudList[i];
                break;
            }
        }
        if (cloud == null) {
            var index = Math.floor(Math.random() * this.mCloudList.length);
            var sp = Laya.Sprite3D.instantiate(this.mCloudList[index].owner, this.mClouds);
            cloud = sp.getComponent(Cloud_1.default);
            this.mCloudList.push(cloud);
        }
        cloud.Show(dis + 200);
    };
    EnvirManager.prototype.SetEnvir = function (type) {
        switch (type) {
            case EnvirType.CityDayTime:
                this.mRocks.active = false;
                this.mTrees.active = false;
                this.ResetCity();
                this._envirCity.active = true;
                break;
            case EnvirType.CityNight:
                this.mRocks.active = false;
                this.mTrees.active = false;
                this.ResetCity();
                this._envirCity.active = true;
                break;
            case EnvirType.DesertDayTime:
                this._envirCity.active = false;
                this.mRocks.active = true;
                this.mTrees.active = true;
                break;
            case EnvirType.DesertNight:
                this._envirCity.active = false;
                this.mRocks.active = true;
                this.mTrees.active = true;
                break;
        }
    };
    EnvirManager.prototype.ResetCity = function () {
        for (var i = 0; i < this.cityEnvList.length; i++) {
            this._currentCityPosID = i;
            this.cityEnvList[i].transform.position = new Laya.Vector3(this.cityEnvList[i].transform.position.x, this.cityEnvList[i].transform.position.y, this._cityDis * this._currentCityPosID);
        }
        this._currentCityID = 0;
        this._currentCityPosID = 2;
    };
    return EnvirManager;
}(Laya.Script));
exports.default = EnvirManager;
var EnvirType;
(function (EnvirType) {
    EnvirType[EnvirType["DesertDayTime"] = 0] = "DesertDayTime";
    EnvirType[EnvirType["DesertNight"] = 1] = "DesertNight";
    EnvirType[EnvirType["CityDayTime"] = 2] = "CityDayTime";
    EnvirType[EnvirType["CityNight"] = 3] = "CityNight";
})(EnvirType = exports.EnvirType || (exports.EnvirType = {}));
},{"../../Utilit":81,"../OBJ/Cloud":53,"../OBJ/Rock":60,"../OBJ/Tree":65,"./PlayerManager":40,"./SceneManager":42}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var LevelConfig_1 = require("../Model/LevelConfig");
var User_1 = require("../../User/User");
var GameMgr_1 = require("../../Mgr/GameMgr");
var VibrateMgr_1 = require("../../Mgr/VibrateMgr");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var SceneManager_1 = require("./SceneManager");
var EnvirManager_1 = require("./EnvirManager");
var RoadManager_1 = require("./RoadManager");
var GameManager = /** @class */ (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super.call(this) || this;
        _this.getCoinAmountByGame = 0;
        _this._gameResults = false;
        _this.offMatLists = new Array();
        _this.mOffSet = 1;
        return _this;
    }
    GameManager.Instance = function () {
        return this._instance;
    };
    Object.defineProperty(GameManager.prototype, "GameResults", {
        get: function () {
            return this._gameResults;
        },
        enumerable: true,
        configurable: true
    });
    GameManager.prototype.onAwake = function () {
        GameManager._instance = this;
    };
    GameManager.prototype.onStart = function () {
        ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.MyMainView);
        // Laya.timer.once(500,this,this.GameMenu);
        console.log(LevelConfig_1.default.Instance().getLevelAmount());
        SoundMgr_1.default.ins_wcjtn_tance.play_wcjtn_BGM(SoundMgr_1.Sound_wcjtn_Type.Bgm);
    };
    GameManager.prototype.GameMenu = function () {
        //随机改变轨道偏移方向
        // // this.ChangeOffDir();
        // this.mOffSet = (Math.random()*2-1);
        // this.ChangeOffDir();
        //随机环境状态
        SceneManager_1.default.Instance().ConfigEnv(EnvirManager_1.EnvirType.DesertDayTime);
        //首页状态
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.OnGameMenu);
        //摄像机，玩家车辆，道路在最开始的位置
        //所有车子正常往前面开
    };
    GameManager.prototype.GameStart = function () {
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.OnGameStart);
        this.getCoinAmountByGame = 0;
        this._gameResults = false;
        ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.GameView);
        GameManager.FirstGame = false;
    };
    /**
     * 游戏结束
     * @param res 游戏结果
     */
    GameManager.prototype.GameOver = function (res) {
        //游戏结果
        this._gameResults = res;
        //增加金币
        if (res)
            this.getCoinAmountByGame += LevelConfig_1.default.Instance().getDataByLevel(RoadManager_1.default.Instance().GetRoadLevel()).levelcoin;
        //短震动
        VibrateMgr_1.default.vibrate_wcjtn_Short();
        User_1.default.add_wcjtn_Money(this.getCoinAmountByGame);
        //存档
        GameMgr_1.default.get_wcjtn_Instance().save_wcjtn_Game_wcjtn_Data();
        //游戏结束
        //摄像机拉远，停止玩家操作，
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.OnGameOver);
        GameManager.mCarID = User_1.default.getCarID();
    };
    GameManager.prototype.GameRestart = function () {
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.OnGameMenu);
    };
    GameManager.prototype.GameRelive = function () {
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.OnGameRelive);
    };
    GameManager.prototype.SetOffMaterial = function (mesh) {
        // return;
        // var customMaterial = new MultiplePassOutlineMaterial();
        // customMaterial.albedoTexture = (mesh.meshRenderer.material['albedoTexture']);
        // mesh.meshRenderer.sharedMaterial = customMaterial;
        // // this.offMatLists.push(customMaterial);
        // mesh.meshRenderer.receiveShadow = true;
        // mesh.meshRenderer.castShadow = true;
    };
    GameManager.prototype.ChangeOffDir = function () {
        var _this = this;
        this.offMatLists.forEach(function (mat) {
            mat.offsetDir(_this.mOffSet);
        });
    };
    GameManager.prototype.ToExportView = function () {
        ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.Export2View);
    };
    GameManager.prototype.AddGetCoin = function (num) {
        this.getCoinAmountByGame += num;
        SoundMgr_1.default.ins_wcjtn_tance.play_wcjtn_Sound(SoundMgr_1.Sound_wcjtn_Type.GetCoin);
    };
    /**
     * 得到当前关卡获得金币的总量
     */
    GameManager.prototype.GetCoinAmount = function () {
        return this.getCoinAmountByGame;
    };
    /**
     * 打开结束导出界面
     */
    GameManager.prototype.OpenOverView = function () {
        if (this._gameResults) {
            //游戏胜利
            console.log("游戏胜利");
            User_1.default.set_wcjtn_LeveNum(User_1.default.get_wcjtn_LeveNum() + 1);
            GameMgr_1.default.get_wcjtn_Instance().save_wcjtn_Game_wcjtn_Data();
            ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.GameWinView);
        }
        else {
            //游戏失败
            console.log("游戏失败");
            ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.GameFailView);
        }
        // let onSucess = ()=>{
        //     User_wcjtn_.add_wcjtn_Money(100);
        // }
        // let complete = ()=>{
        //     Game_wcjtn_Mgr.get_wcjtn_Instance().save_wcjtn_Game_wcjtn_Data();            
        //     View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.GameWinView);
        // }
        // WX_wcjtn_API.tryShowWXCrazyClick("100",complete,onSucess,complete);
        // Game_wcjtn_Mgr.get_wcjtn_Instance().save_wcjtn_Game_wcjtn_Data();            
        // View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.GameWinView);
    };
    GameManager.SoundSwitch = true;
    GameManager.CarAmount = 6; //车的总数量
    GameManager.FirstGame = true;
    GameManager.mCarID = 0;
    return GameManager;
}(Laya.Script));
exports.default = GameManager;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Mgr/GameMgr":31,"../../Mgr/SoundMgr":32,"../../Mgr/VibrateMgr":33,"../../Mgr/ViewMgr":34,"../../User/User":80,"../Model/LevelConfig":45,"./EnvirManager":37,"./RoadManager":41,"./SceneManager":42}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Carport_1 = require("../OBJ/Carport");
var OverLaneCar_1 = require("../OBJ/OverLaneCar");
var PlayerManager_1 = require("./PlayerManager");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var GameManager_1 = require("./GameManager");
var LevelConfig_1 = require("../Model/LevelConfig");
var Utilit_1 = require("../../Utilit");
var RoadManager_1 = require("./RoadManager");
var OverLaneCarManager = /** @class */ (function (_super) {
    __extends(OverLaneCarManager, _super);
    function OverLaneCarManager() {
        var _this = _super.call(this) || this;
        _this.mCarAmount = 6;
        _this.disZ = 0;
        _this.mInMove = false;
        _this.mMoveSpeed = 20;
        _this.mCarPool = new Array();
        _this.mLvehiclegenerateintervalMin = 100;
        _this.mLvehiclegenerateintervalMax = 150;
        _this._roadLevel = 0;
        _this._envirID = 0;
        return _this;
    }
    OverLaneCarManager.Instance = function () {
        return this._instance;
    };
    OverLaneCarManager.prototype.onAwake = function () {
        OverLaneCarManager._instance = this;
        this.mLane = this.owner;
        for (var i = 0; i < GameManager_1.default.CarAmount; i++) {
            var array = new Array();
            this.mCarPool.push(array);
        }
    };
    OverLaneCarManager.prototype.onEnable = function () {
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameMenu, this, this.OnGameMenu);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameOver, this, this.OnGameOver);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ChangeRoadLevel, this, this.ChangeRoadLevel);
    };
    OverLaneCarManager.prototype.onDestroy = function () {
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameMenu, this, this.OnGameMenu);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameOver, this, this.OnGameOver);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ChangeRoadLevel, this, this.ChangeRoadLevel);
    };
    OverLaneCarManager.prototype.onUpdate = function () {
        if (this.mInMove)
            this.JudgeOver();
    };
    /**
    * 判断当前车辆是否离开了玩家车辆
    */
    OverLaneCarManager.prototype.JudgeOver = function () {
        //闪车灯
        if (Math.abs(this.mCurrentCar.GetTailstock().x - PlayerManager_1.default.Instance().GetPlayerCar().GetHeadstock().x) < 1
            && (Math.abs(this.mCurrentCar.GetTailstock().z - PlayerManager_1.default.Instance().GetPlayerCar().GetHeadstock().z) < 40)) {
            this.mCurrentCar.FlashLight();
        }
        if (this.mCurrentCar.GetTailstock().z - PlayerManager_1.default.Instance().GetPlayerCar().GetHeadstock().z < -1) {
            this.RecoverCar();
        }
    };
    OverLaneCarManager.prototype.RecoverCar = function () {
        // if (index != this.mCurrentCar.mCarID) {
        //     //换一辆车
        // }
        if (this.mCurrentCar)
            this.mCurrentCar.Hide();
        // this.mCurrentCar = this.GetCarInPool(index).getComponent(OverLaneCar);
        // this.mCurrentCar.Show();
        // this.mCurrentCar.GetCar().transform.localPositionZ = this.disZ;
        // this.mCurrentCar.ResetLight();     
        this.ShowCar();
        this.SetSpeed();
        // if (this.mCurrentCarIndex >= this.mCarAmount) this.mCurrentCarIndex = 0;
    };
    OverLaneCarManager.prototype.SetSpeed = function () {
        var index = Math.floor(Math.random() * LevelConfig_1.default.Instance().getDataByLevel(this._roadLevel).randomSpeedLists.length);
        // this.mMoveSpeed = LevelDataConfig.Instance().getDataByLevel(this._roadLevel).randomSpeedLists[index];
        // this.mMoveSpeed = 15 + Math.random() * 10;
        this.mMoveSpeed = 15 + Math.random() * 45 + 5 * this._roadLevel;
    };
    OverLaneCarManager.prototype.OnGameRelive = function () {
        this.RecoverCar();
        this.mInMove = true;
    };
    /**
    * 从车池中拿到没有在用的车模型
    * @param index 车子ID
    */
    OverLaneCarManager.prototype.GetCarInPool = function (index) {
        var car = null;
        for (var i = 0; i < this.mCarPool[index].length; i++) {
            var sp = this.mCarPool[index][i].owner;
            if (!sp.active) {
                car = sp;
                break;
            }
        }
        if (car == null) {
            car = this.CreateCar(index);
        }
        return car;
    };
    OverLaneCarManager.prototype.ChangeRoadLevel = function () {
        this._roadLevel = RoadManager_1.default.Instance().GetRoadLevel();
        this.RecoverCar();
        // this.InitOverLaneCar();
    };
    OverLaneCarManager.prototype.OnGameMenu = function () {
        this.mLane.transform.position = new Laya.Vector3(0, 0, 0);
        this.disZ = 0;
        this._roadLevel = 1;
        // if(LevelDataConfig.Instance().getDataByLevel(this._roadLevel).leveltype==0){
        //     this.mLane.active =true;
        //     this.InitSlowLaneCar();
        //     this.mInMove = true;
        // }else{
        //     this.mLane.active =false;
        // }
        this.mLane.active = true;
        this.mInMove = true;
        this.SetInterval();
        this.RecoverCar();
    };
    OverLaneCarManager.prototype.SetInterval = function () {
        this.mLvehiclegenerateintervalMin = LevelConfig_1.default.Instance().getDataByLevel(this._roadLevel).lvehiclegenerateintervalMin;
        this.mLvehiclegenerateintervalMax = LevelConfig_1.default.Instance().getDataByLevel(this._roadLevel).lvehiclegenerateintervalMax;
    };
    OverLaneCarManager.prototype.OnGameOver = function () {
        this.mInMove = false;
    };
    OverLaneCarManager.prototype.ShowCar = function () {
        this.UpdateDis();
        var index = Math.floor(Math.random() * GameManager_1.default.CarAmount);
        this.mCurrentCar = this.GetCarInPool(index).getComponent(OverLaneCar_1.default);
        this.mCurrentCar.GetCar().transform.localPositionZ = this.disZ;
        this.mCurrentCar.Show();
    };
    OverLaneCarManager.prototype.CreateCar = function (id) {
        var sp = Laya.Sprite3D.instantiate(Carport_1.default.Instance().GetCarByID(id), this.owner);
        sp.transform.localPositionZ = this.disZ;
        sp.transform.localPositionX = 1.1;
        var car = sp.addComponent(OverLaneCar_1.default);
        car.mCarID = id;
        //放入池中
        this.mCarPool[id].push(car);
        return sp;
    };
    OverLaneCarManager.prototype.UpdateDis = function () {
        this.disZ += Utilit_1.default.getRandomByRange(this.mLvehiclegenerateintervalMin, this.mLvehiclegenerateintervalMax);
    };
    OverLaneCarManager.prototype.Move = function () {
        var time = Utilit_1.default.safeDelta() / 1000;
        var speed = this.mMoveSpeed + Math.random() * 10;
        this.mLane.transform.translate(new Laya.Vector3(0, 0, -this.mMoveSpeed * time));
    };
    OverLaneCarManager.prototype.GetHeadstock = function () {
        return this.mCurrentCar.GetHeadstock();
    };
    OverLaneCarManager.prototype.OnCrush = function () {
        this.mCurrentCar.OnCrush();
    };
    return OverLaneCarManager;
}(Laya.Script));
exports.default = OverLaneCarManager;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Utilit":81,"../Model/LevelConfig":45,"../OBJ/Carport":52,"../OBJ/OverLaneCar":57,"./GameManager":38,"./PlayerManager":40,"./RoadManager":41}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SceneManager_1 = require("./SceneManager");
var Carport_1 = require("../OBJ/Carport");
var Camera_1 = require("../OBJ/Camera");
var SlowLaneCarManager_1 = require("./SlowLaneCarManager");
var PlayerCar_1 = require("../OBJ/PlayerCar");
var OverLaneCarManager_1 = require("./OverLaneCarManager");
var GameManager_1 = require("./GameManager");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var User_1 = require("../../User/User");
var CarConfig_1 = require("../Model/CarConfig");
var OverCarEffect_1 = require("../OBJ/OverCarEffect");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var VibrateMgr_1 = require("../../Mgr/VibrateMgr");
var PlayerManager = /** @class */ (function (_super) {
    __extends(PlayerManager, _super);
    function PlayerManager() {
        var _this = _super.call(this) || this;
        _this.mCarLists = new Array();
        _this.mStartPos = new Laya.Vector3(-1.2, 0.052, -4.829);
        _this.mStartRot = new Laya.Vector3(0, 0, 0);
        _this.mInMove = false;
        _this.mInGame = false;
        _this.mOverPosZ = 0;
        _this.byCrush = false;
        _this._hasFuel = true;
        _this._onRookie = false;
        _this._onMagnet = false;
        return _this;
    }
    PlayerManager.Instance = function () {
        return this._instance;
    };
    PlayerManager.prototype.onAwake = function () {
        PlayerManager._instance = this;
        this.mCrashEffect = this.owner.getChildByName("CrashEffect");
        this.mCrashEffect.active = false;
        this.mLeftTrail = this.owner.getChildByName("leftTrail");
        this.mRightTrail = this.owner.getChildByName("rightTrail");
        this._rookieEff = this.owner.getChildByName("rookie");
        this.mRookieCrashEff = this.owner.getChildByName("rookieCrashEff");
        this.mRookieCrashEff.transform.scale = new Laya.Vector3(1.2, 1.2, 1.2);
        this.mRookieCrashEff.active = false;
        // this._rookieEff.active = false;
        // this.mOverCarEff.active = false;
    };
    PlayerManager.prototype.onEnable = function () {
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameMenu, this, this.OnGameMenu);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameOver, this, this.OnGameOver);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameStart, this, this.OnGameStart);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);
    };
    PlayerManager.prototype.onDestroy = function () {
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameMenu, this, this.OnGameMenu);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameOver, this, this.OnGameOver);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameStart, this, this.OnGameStart);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);
    };
    PlayerManager.prototype.onStageMouseDown = function () {
        if (this.mInGame && !this._onRookie) {
            SoundMgr_1.default.ins_wcjtn_tance.play_wcjtn_Sound(SoundMgr_1.Sound_wcjtn_Type.SpeedUp);
            EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.ToOverLane);
        }
    };
    PlayerManager.prototype.onStageMouseUp = function () {
        if (this.mInGame && !this._onRookie) {
            EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.ToSlowLane);
        }
    };
    PlayerManager.prototype.onUpdate = function () {
        if (this.mInMove) {
            this.mCar.Move();
            SlowLaneCarManager_1.default.Instance().Move();
            OverLaneCarManager_1.default.Instance().Move();
            Camera_1.default.Instance().SetCameraPos();
            if (this.mInGame) {
                if (this.JudgeCol()) {
                    OverLaneCarManager_1.default.Instance().OnCrush();
                    console.log("撞到车了");
                    //TODO撞车动画
                    if (!this._onRookie) {
                        GameManager_1.default.Instance().GameOver(false);
                        this.mCar.OnCrush();
                        this.byCrush = true;
                        this.ShowCrashEff();
                        VibrateMgr_1.default.vibrate_wcjtn_Long();
                        //this.ShowRookieCrashEff();                        
                    }
                    else {
                        this.ShowRookieCrashEff();
                        VibrateMgr_1.default.vibrate_wcjtn_Short();
                    }
                }
            }
        }
        if (this._onRookie) {
            this._rookieEff.transform.position = this.mCar.GetCarPos();
        }
    };
    Object.defineProperty(PlayerManager.prototype, "GetOnRookie", {
        /**
         * 获取是否正在加速火箭
         */
        get: function () {
            return this._onRookie;
        },
        enumerable: true,
        configurable: true
    });
    PlayerManager.prototype.NoFuel = function () {
        this._hasFuel = false;
    };
    PlayerManager.prototype.OnGameOver = function () {
        this.mInMove = false;
        this.mInGame = false;
        SoundMgr_1.default.ins_wcjtn_tance.stopSound(SoundMgr_1.Sound_wcjtn_Type.SpeedUp);
        if (!this._hasFuel)
            return;
        if (!this.byCrush)
            this.mCar.CompleteGame();
    };
    PlayerManager.prototype.OnGameRelive = function () {
        this.mInMove = true;
        this.mInGame = true;
        this.byCrush = false;
        this.mCar.Show();
    };
    PlayerManager.prototype.OnGameStart = function () {
        OverCarEffect_1.default.Instance().SetFollowPos(this.mCar.GetHeadstock());
        this.mCar.SetTrail(this.mLeftTrail, this.mRightTrail);
        this.mInGame = true;
        this.byCrush = false;
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.ToSlowLane);
    };
    PlayerManager.prototype.OnGameMenu = function () {
        this._hasFuel = true;
        this.mInGame = false;
        //从车库提车
        if (this.mCar == null) {
            this.mCar = this.GetCarInPort(User_1.default.getCarID());
        }
        else {
            this.ChooseCarByID(GameManager_1.default.mCarID);
        }
        this.mCar.ToSlowLane();
        this.mCar.SetCarTrans(this.mStartPos, this.mStartRot);
        this.mCar.HideTrail();
        //摄像机跟随
        Camera_1.default.Instance().SetFollowCar(this.mCar.owner);
        this.StartMove();
        this.mCrashEffect.active = false;
    };
    PlayerManager.prototype.OnRookieTime = function () {
        var _this = this;
        this._onRookie = true;
        this._rookieEff.active = true;
        this.mCar.ToRookie();
        Camera_1.default.Instance().ToOverTakeLane();
        Laya.timer.once(4000, this, function () {
            _this._onRookie = false;
            _this._rookieEff.active = false;
        });
        Laya.timer.once(3800, this, function () {
            _this.mCar.ToSlowLane();
            Camera_1.default.Instance().ToSlowLane();
        });
    };
    PlayerManager.prototype.GetCarInPort = function (id) {
        var sp = Laya.Sprite3D.instantiate(Carport_1.default.Instance().GetCarByID(id));
        SceneManager_1.default.Instance().owner.addChild(sp);
        var car = sp.addComponent(PlayerCar_1.default);
        this.mCarLists[id] = car;
        car.SetAccle(CarConfig_1.default.Instance().getCarDataByID(id).accel);
        return car;
    };
    PlayerManager.prototype.ChooseCarByID = function (id) {
        if (this.mCarLists[id] == null) {
            this.GetCarInPort(id);
        }
        var pos = this.mCar.GetCarPos();
        this.mCar.Hide();
        this.mCar = this.mCarLists[id];
        this.mCar.SetCarTrans(pos, this.mStartRot);
        Camera_1.default.Instance().SetFollowCar(this.mCar.owner);
    };
    /**
     * 开始驾驶
    */
    PlayerManager.prototype.StartMove = function () {
        this.mInMove = true;
    };
    /**
     * 停止驾驶
     */
    PlayerManager.prototype.StopMove = function () {
        this.mInMove = false;
    };
    PlayerManager.prototype.GetPlayerCar = function () {
        return this.mCar;
    };
    /**
     * 判断是否发生了碰撞
     */
    PlayerManager.prototype.JudgeCol = function () {
        // if(LevelDataConfig.Instance().getDataByLevel().leveltype==1)return;
        var res = (Math.abs(this.mCar.GetHeadstock().x - OverLaneCarManager_1.default.Instance().GetHeadstock().x) < 1.25
            && Math.abs(this.mCar.GetHeadstock().z - OverLaneCarManager_1.default.Instance().GetHeadstock().z) < 1.25);
        return res;
    };
    PlayerManager.prototype.ShowCrashEff = function () {
        this.mRookieCrashEff.active = false;
        this.mRookieCrashEff.transform.position = this.mCar.GetHeadstock();
        this.mRookieCrashEff.active = true;
        SoundMgr_1.default.ins_wcjtn_tance.play_wcjtn_Sound(SoundMgr_1.Sound_wcjtn_Type.Crush);
    };
    PlayerManager.prototype.ShowRookieCrashEff = function () {
        // this.mRookieCrashEff.active = false;
        // this.mRookieCrashEff.transform.position = new Laya.Vector3(this.mCar.GetHeadstock().x,
        //     this.mCar.GetHeadstock().y,this.mCar.GetHeadstock().z+30);
        // this.mRookieCrashEff.active = true;
        Camera_1.default.Instance().ShowCrushEff();
        SoundMgr_1.default.ins_wcjtn_tance.play_wcjtn_Sound(SoundMgr_1.Sound_wcjtn_Type.Crush);
    };
    PlayerManager.prototype.onKeyDown = function (e) {
        if (e.keyCode == 51) {
            Camera_1.default.Instance().ShowCrushEff();
        }
    };
    return PlayerManager;
}(Laya.Script));
exports.default = PlayerManager;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Mgr/SoundMgr":32,"../../Mgr/VibrateMgr":33,"../../User/User":80,"../Model/CarConfig":44,"../OBJ/Camera":50,"../OBJ/Carport":52,"../OBJ/OverCarEffect":56,"../OBJ/PlayerCar":58,"./GameManager":38,"./OverLaneCarManager":39,"./SceneManager":42,"./SlowLaneCarManager":43}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SceneManager_1 = require("./SceneManager");
var Road_1 = require("../OBJ/Road");
var EnvirManager_1 = require("./EnvirManager");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var PlayerManager_1 = require("./PlayerManager");
var LevelConfig_1 = require("../Model/LevelConfig");
var RoadManager = /** @class */ (function (_super) {
    __extends(RoadManager, _super);
    function RoadManager() {
        var _this = _super.call(this) || this;
        _this.mRoadInterval = 49.15; //道路间隔
        _this.mRoadPool = new Array(); //道路对象池
        _this.mRoadPosIndex = 0;
        _this.mRoadIndex = 0;
        _this.mCoinLists = new Array(); //金币池
        _this.mOverPosZ = 17;
        _this.mStartPosZ = 0;
        _this.mInGame = false;
        _this.mRoadLevel = 0; //循环关卡道路等级
        return _this;
    }
    RoadManager.Instance = function () {
        return this._instance;
    };
    RoadManager.prototype.onAwake = function () {
        RoadManager._instance = this;
        this.mRoadPre = this.owner.getChildByName("Road");
        this.mRoadPre.addComponent(Road_1.default);
        this.mCameraPos = SceneManager_1.default.Instance().GetChildByName("Camera").transform.position;
        this.mStartPole = this.owner.getChildByName("StartPole");
        this.mStartPole.active = false;
        this.mOverPole = this.owner.getChildByName("OverPole");
        this.mOverPole.active = false;
        this._tunnel = this.owner.getChildByName("tunnel");
        this._tunnel.active = false;
    };
    RoadManager.prototype.onEnable = function () {
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameMenu, this, this.OnGameMenu);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameStart, this, this.OnGameStart);
    };
    RoadManager.prototype.onDestroy = function () {
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameStart, this, this.OnGameStart);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameMenu, this, this.OnGameMenu);
    };
    RoadManager.prototype.onStart = function () {
        this.mRoadPool.push(this.mRoadPre);
        this.InitRoad(3);
        this.mCurrentRoad = this.mRoadPool[this.mRoadIndex];
    };
    RoadManager.prototype.onUpdate = function () {
        if (this.mCurrentRoad) {
            if (this.mCameraPos.z - this.mCurrentRoad.transform.position.z > 50) {
                this.ResetRoad();
            }
        }
        if (this.mInGame) {
            if (this.mOverPosZ <= PlayerManager_1.default.Instance().GetPlayerCar().GetTailstock().z) {
                // this.mInGame = false;
                // GameManager.Instance().GameOver(true);
                this.SetChangeEnvPoint();
            }
        }
    };
    RoadManager.prototype.GetCompleteValue = function () {
        var value = Math.max(0, 1 - (this.mOverPosZ - PlayerManager_1.default.Instance().GetPlayerCar().GetTailstock().z) / (this.mOverPosZ - this.mStartPole.transform.position.z));
        return value;
    };
    RoadManager.prototype.OnGameMenu = function () {
        this.mStartPole.active = false;
        this.mOverPole.active = false;
        this.mRoadPosIndex = -1;
        this.mRoadIndex = 0;
        for (var i = 0; i < this.mRoadPool.length; i++) {
            this.SetRoadPos(this.mRoadPool[i]);
        }
        this.mRoadLevel = 0;
        this.mCurrentRoad = this.mRoadPool[this.mRoadIndex];
        this.mInGame = false;
    };
    RoadManager.prototype.OnGameStart = function () {
        this.mStartPole.active = true;
        var pos = PlayerManager_1.default.Instance().GetPlayerCar().GetCarPos();
        this.mStartPole.transform.position = new Laya.Vector3(this.mStartPole.transform.position.x, this.mStartPole.transform.position.y, pos.z + 40);
        this._tunnel.active = true;
        this.mOverPosZ = 20 + PlayerManager_1.default.Instance().GetPlayerCar().GetTailstock().z + LevelConfig_1.default.Instance().getDataByLevel(this.mRoadLevel).missiondistance;
        this._tunnel.transform.position = new Laya.Vector3(this._tunnel.transform.position.x, this._tunnel.transform.position.y, this.mOverPosZ);
        this.mInGame = true;
    };
    RoadManager.prototype.SetChangeEnvPoint = function () {
        var _this = this;
        this.mRoadLevel++;
        if (this.mRoadLevel >= 36)
            this.mRoadLevel = 36;
        this.mOverPosZ = 20 + PlayerManager_1.default.Instance().GetPlayerCar().GetTailstock().z + LevelConfig_1.default.Instance().getDataByLevel(this.mRoadLevel).missiondistance;
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.ChangeRoadLevel);
        Laya.timer.once(2000, this, function () {
            _this._tunnel.transform.position = new Laya.Vector3(_this._tunnel.transform.position.x, _this._tunnel.transform.position.y, _this.mOverPosZ);
        });
    };
    RoadManager.prototype.GetRoadLevel = function () {
        return this.mRoadLevel;
    };
    RoadManager.prototype.GetOverPosZ = function () {
        return this.mOverPosZ;
    };
    /**
     * 初始道路
     */
    RoadManager.prototype.InitRoad = function (value) {
        for (var i = 0; i < value; i++) {
            var road = Laya.Sprite3D.instantiate(this.mRoadPre, this.owner);
            this.SetRoadPos(road);
            this.mRoadPool.push(road);
        }
    };
    /**
     * 设置道路位置
     */
    RoadManager.prototype.SetRoadPos = function (road) {
        this.mRoadPosIndex++;
        road.transform.position = new Laya.Vector3(0, 0, this.mRoadInterval * this.mRoadPosIndex);
        EnvirManager_1.default.Instance().ShowEnvir(this.mRoadInterval * this.mRoadPosIndex);
    };
    /**
     * 超出摄像机的道路重新设置位置
     */
    RoadManager.prototype.ResetRoad = function () {
        this.SetRoadPos(this.mCurrentRoad);
        this.mRoadIndex++;
        if (this.mRoadIndex >= this.mRoadPool.length)
            this.mRoadIndex = 0;
        this.mCurrentRoad = this.mRoadPool[this.mRoadIndex];
    };
    return RoadManager;
}(Laya.Script));
exports.default = RoadManager;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../Model/LevelConfig":45,"../OBJ/Road":59,"./EnvirManager":37,"./PlayerManager":40,"./SceneManager":42}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Camera_1 = require("../OBJ/Camera");
var RoadManager_1 = require("./RoadManager");
var PlayerManager_1 = require("./PlayerManager");
var HorizonPlane_1 = require("../OBJ/HorizonPlane");
var Carport_1 = require("../OBJ/Carport");
var GameManager_1 = require("./GameManager");
var SlowLaneCarManager_1 = require("./SlowLaneCarManager");
var OverLaneCarManager_1 = require("./OverLaneCarManager");
var MultiplePassOutlineMaterial_1 = require("../Shader/MultiplePassOutlineMaterial");
var EnvirManager_1 = require("./EnvirManager");
var OverCarEffect_1 = require("../OBJ/OverCarEffect");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var SplashScreen_1 = require("../OBJ/SplashScreen");
var LevelConfig_1 = require("../Model/LevelConfig");
var ScoreCard_1 = require("../OBJ/ScoreCard");
var SceneManager = /** @class */ (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager() {
        var _this = _super.call(this) || this;
        _this._envirType = EnvirManager_1.EnvirType.DesertDayTime;
        _this._envirID = 0;
        return _this;
    }
    SceneManager.Instance = function () {
        return this._instance;
    };
    SceneManager.prototype.onAwake = function () {
        SceneManager._instance = this;
        this.mScene = this.owner;
        MultiplePassOutlineMaterial_1.default.initShader();
    };
    SceneManager.prototype.onEnable = function () {
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ChangeRoadLevel, this, this.OnChangeRoadLevel);
    };
    SceneManager.prototype.onDestroy = function () {
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ChangeRoadLevel, this, this.OnChangeRoadLevel);
    };
    SceneManager.prototype.onStart = function () {
        this.GetChildByName("GameManager").addComponent(GameManager_1.default);
        this.GetChildByName("Camera").addComponent(Camera_1.default);
        this.GetChildByName("RoadManager").addComponent(RoadManager_1.default);
        this.GetChildByName("PlayerManager").addComponent(PlayerManager_1.default);
        // this.GetChildByName("aicar").addComponent(AiCar);
        this.GetChildByName("HorizonPlane").addComponent(HorizonPlane_1.default);
        this.GetChildByName("Carport").addComponent(Carport_1.default);
        this.GetChildByName("SlowLaneCarManager").addComponent(SlowLaneCarManager_1.default);
        this.GetChildByName("OverLaneCarManager").addComponent(OverLaneCarManager_1.default);
        this.GetChildByName("EnvirManager").addComponent(EnvirManager_1.default);
        this.GetChildByName("OverCarEffect").addComponent(OverCarEffect_1.default);
        this.GetChildByName("splashScreen").addComponent(SplashScreen_1.default);
        this.GetChildByName("scoreCard").addComponent(ScoreCard_1.default);
        this._directionLight = this.mScene.getChildByName("Directional Light");
        this._directionLight.shadow = true;
        this._directionLight.shadowDistance = 100;
        this._directionLight.shadowResolution = 2048;
        this._directionLight.shadowPSSMCount = 1;
        this._directionLight.shadowPCFType = 3;
        // Laya.timer.loop(1000*5,this,()=>{
        //     // MultiplePassOutlineMaterial.OffSetDir()
        // })
    };
    SceneManager.prototype.onUpdate = function () {
        // this._directionLight.transform.localRotationEulerY+=0.2;
        // console.log(this._directionLight.transform.localRotationEulerY)
    };
    SceneManager.prototype.GetChildByName = function (name) {
        var sp = this.mScene.getChildByName(name);
        return sp;
    };
    /**
     * 随机环境
     */
    SceneManager.prototype.ConfigEnv = function (res) {
        // if(res==this._envirID)return;
        this._envirID = res;
        this._directionLight.transform.localRotationEulerY -= 180;
        switch (res) {
            case 0:
                this._envirType = EnvirManager_1.EnvirType.DesertDayTime;
                //沙漠白天
                this._directionLight.color = new Laya.Vector3(1, 1, 1);
                this.mScene.skyRenderer.material["tintColor"] = new Laya.Vector4(0.5, 0.5, 0.5, 0.5);
                break;
            case 1:
                this._envirType = EnvirManager_1.EnvirType.DesertNight;
                //沙漠夜晚
                this._directionLight.color = new Laya.Vector3(188 / 255, 199 / 255, 255 / 255);
                this.mScene.skyRenderer.material["tintColor"] = new Laya.Vector4(150 / 255, 45 / 255, 45 / 255, 0.5);
                break;
            case 2:
                this._envirType = EnvirManager_1.EnvirType.CityDayTime;
                //都市白天
                this._directionLight.color = new Laya.Vector3(1, 1, 1);
                this.mScene.skyRenderer.material["tintColor"] = new Laya.Vector4(0.5, 0.5, 0.5, 0.5);
                break;
            case 3:
                this._envirType = EnvirManager_1.EnvirType.CityNight;
                //都市夜晚
                this._directionLight.color = new Laya.Vector3(188 / 255, 199 / 255, 255 / 255);
                this.mScene.skyRenderer.material["tintColor"] = new Laya.Vector4(150 / 255, 45 / 255, 45 / 255, 0.5);
                break;
        }
        EnvirManager_1.default.Instance().SetEnvir(this._envirType);
        HorizonPlane_1.default.Instance().SetPlaneMat(this._envirType);
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.ChangeEnv, this._envirType);
    };
    Object.defineProperty(SceneManager.prototype, "GetEnvType", {
        get: function () {
            return this._envirType;
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.prototype.OnChangeRoadLevel = function () {
        Laya.timer.once(500, this, function () {
            SceneManager.Instance().ConfigEnv(LevelConfig_1.default.Instance().getDataByLevel(RoadManager_1.default.Instance().GetRoadLevel()).envType);
        });
    };
    return SceneManager;
}(Laya.Script));
exports.default = SceneManager;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../Model/LevelConfig":45,"../OBJ/Camera":50,"../OBJ/Carport":52,"../OBJ/HorizonPlane":55,"../OBJ/OverCarEffect":56,"../OBJ/ScoreCard":62,"../OBJ/SplashScreen":64,"../Shader/MultiplePassOutlineMaterial":67,"./EnvirManager":37,"./GameManager":38,"./OverLaneCarManager":39,"./PlayerManager":40,"./RoadManager":41,"./SlowLaneCarManager":43}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Carport_1 = require("../OBJ/Carport");
var SlowLaneCar_1 = require("../OBJ/SlowLaneCar");
var PlayerManager_1 = require("./PlayerManager");
var SceneManager_1 = require("./SceneManager");
var Coin_1 = require("../OBJ/Coin");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var GameManager_1 = require("./GameManager");
var CarConfig_1 = require("../Model/CarConfig");
var LevelConfig_1 = require("../Model/LevelConfig");
var Utilit_1 = require("../../Utilit");
var RoadManager_1 = require("./RoadManager");
var User_1 = require("../../User/User");
var ScoreCard_1 = require("../OBJ/ScoreCard");
var Camera_1 = require("../OBJ/Camera");
var SlowLaneCarManager = /** @class */ (function (_super) {
    __extends(SlowLaneCarManager, _super);
    function SlowLaneCarManager() {
        var _this = _super.call(this) || this;
        _this.disZ = 0;
        _this.mInMove = false;
        _this.mMoveSpeed = 15;
        _this.mCarLists = new Array();
        _this.mCurrentCarIndex = 0;
        _this.mCarAmount = 6;
        _this.mCarID = 0;
        _this.mCarPool = new Array();
        _this.mCoinLists = new Array();
        _this.mAccel = 0;
        _this.mAccelTimer = 0;
        _this.mRvehiclespeed = 0.4; //当前关卡车辆加速度缩放比例
        _this.mRvehiclegenerateintervalMin = 20; //当前关卡慢速道车辆间隔最小值
        _this.mRvehiclegenerateintervalMax = 30; //当前关卡慢速道车辆间隔最大值
        _this.mOverGetCoin = 0; //当前关卡超过一部车获得金币
        _this._roadLevel = 0;
        _this._overCarAmount = 0;
        _this._hadRookie = false;
        _this._inAwardLevel = false;
        return _this;
    }
    SlowLaneCarManager.Instance = function () {
        return this._instance;
    };
    SlowLaneCarManager.prototype.onAwake = function () {
        SlowLaneCarManager._instance = this;
        this.mLane = this.owner;
        for (var i = 0; i < GameManager_1.default.CarAmount; i++) {
            var array = new Array();
            this.mCarPool.push(array);
        }
        this.mCoinPre = SceneManager_1.default.Instance().GetChildByName("Coin");
        this.owner.addChild(this.mCoinPre);
        this.mCoinPanel = SceneManager_1.default.Instance().GetChildByName("CoinPanel");
    };
    SlowLaneCarManager.prototype.onEnable = function () {
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameMenu, this, this.OnGameMenu);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ToOverLane, this, this.ToOverLane);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ToSlowLane, this, this.ToSlowLane);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameOver, this, this.OnGameOver);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ChangeRoadLevel, this, this.ChangeRoadLevel);
    };
    SlowLaneCarManager.prototype.onDestroy = function () {
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameMenu, this, this.OnGameMenu);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ToOverLane, this, this.ToOverLane);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ToSlowLane, this, this.ToSlowLane);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameOver, this, this.OnGameOver);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ChangeRoadLevel, this, this.ChangeRoadLevel);
    };
    SlowLaneCarManager.prototype.onUpdate = function () {
        if (this.mInMove)
            this.JudgeOver();
    };
    SlowLaneCarManager.prototype.ToOverLane = function () {
        this.mAccelTimer = 0;
        this.mAccel = CarConfig_1.default.Instance().getCarDataByID(this.mCarID).accel * this.mRvehiclespeed;
    };
    SlowLaneCarManager.prototype.ToSlowLane = function () {
        this.mAccel = 0;
        this.mAccelTimer = 0;
    };
    SlowLaneCarManager.prototype.ChangeRoadLevel = function () {
        this._roadLevel = RoadManager_1.default.Instance().GetRoadLevel();
        this._inAwardLevel = LevelConfig_1.default.Instance().getDataByLevel(this._roadLevel).leveltype == 1;
        this.mRvehiclespeed = LevelConfig_1.default.Instance().getDataByLevel(this._roadLevel).rvehiclespeed;
        this.mOverGetCoin = LevelConfig_1.default.Instance().getDataByLevel(this._roadLevel).overtakecoin;
    };
    /**
     * 初始化几台车辆
     */
    SlowLaneCarManager.prototype.InitSlowLaneCar = function () {
        this.SetIntervalDis();
        if (this.mCarLists.length > 0) {
            for (var i = 0; i < this.mCarAmount; i++) {
                this.UpdateDis();
                this.mCarLists[i].GetCar().transform.localPositionZ = this.disZ;
            }
        }
        else {
            for (var i = 0; i < this.mCarAmount; i++) {
                this.UpdateDis();
                var index = Math.floor(Math.random() * GameManager_1.default.CarAmount);
                this.CreateCar(index);
                if (i == this.mCarAmount - 1) {
                    this.mCarID = index;
                }
            }
        }
        this.mCurrentCarIndex = 0;
        this.SetSpeed();
    };
    SlowLaneCarManager.prototype.UpdateDis = function () {
        this.disZ += Utilit_1.default.getRandomByRange(this.mRvehiclegenerateintervalMin, this.mRvehiclegenerateintervalMax);
    };
    SlowLaneCarManager.prototype.CreateCar = function (id) {
        var sp = Laya.Sprite3D.instantiate(Carport_1.default.Instance().GetCarByID(id), this.owner);
        sp.transform.localPositionZ = this.disZ;
        sp.transform.localPositionX = -1.2;
        var car = sp.addComponent(SlowLaneCar_1.default);
        car.mCarID = id;
        //放入池中
        this.mCarLists.push(car);
        this.mCarPool[id].push(car);
        return sp;
    };
    /**
     * 判断最后那辆车是否被超了
     */
    SlowLaneCarManager.prototype.JudgeOver = function () {
        if (this.mCarLists[this.mCurrentCarIndex].GetHeadstock().z - PlayerManager_1.default.Instance().GetPlayerCar().GetTailstock().z < 2.75) {
            if (this._hadRookie) {
                PlayerManager_1.default.Instance().OnRookieTime();
            }
            EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.OverCar);
            this._overCarAmount++;
            //更新距离
            this.UpdateDis();
            GameManager_1.default.Instance().AddGetCoin(this.mOverGetCoin);
            var index = Math.floor(Math.random() * GameManager_1.default.CarAmount);
            if (index != this.mCarLists[this.mCurrentCarIndex].mCarID) {
                //换一辆车
                this.mCarLists[this.mCurrentCarIndex].Hide();
                var sp = this.GetCarInPool(index);
                this.mCarLists[this.mCurrentCarIndex] = sp.getComponent(SlowLaneCar_1.default);
                this.mCarLists[this.mCurrentCarIndex].Show();
            }
            this.mCarLists[this.mCurrentCarIndex].GetCar().transform.localPositionZ = this.disZ;
            this.mCurrentCarIndex++;
            if (this._overCarAmount == (User_1.default.getOverRecord() - 1)) {
                ScoreCard_1.default.getInstance().show(this.mCarLists[this.mCurrentCarIndex].GetCar());
            }
            else if (this._overCarAmount == User_1.default.getOverRecord()) {
                ScoreCard_1.default.getInstance().hide();
                Camera_1.default.Instance().ShowOverScoreEff();
            }
            if (this.mCurrentCarIndex >= this.mCarAmount)
                this.mCurrentCarIndex = 0;
            //奖励关卡
            if (this._inAwardLevel)
                this.ShowCoin();
            //重置加速时间
            this.mAccelTimer = 0;
            this.mCarID = index;
            this.configRookie();
        }
    };
    /**
     * 从车池中拿到没有在用的车模型
     * @param index 车子ID
     */
    SlowLaneCarManager.prototype.GetCarInPool = function (index) {
        var car = null;
        for (var i = 0; i < this.mCarPool[index].length; i++) {
            var sp = this.mCarPool[index][i].owner;
            if (!sp.active) {
                car = sp;
                break;
            }
        }
        if (car == null) {
            car = this.CreateCar(index);
        }
        return car;
    };
    SlowLaneCarManager.prototype.configRookie = function () {
        this._hadRookie = false;
        if (Math.random() > 0.8 && !PlayerManager_1.default.Instance().GetOnRookie && !this._inAwardLevel) {
            this.mCarLists[this.mCurrentCarIndex].GetRookie().show();
            this._hadRookie = true;
        }
    };
    SlowLaneCarManager.prototype.SetSpeed = function () {
        this.mMoveSpeed = 15 + Math.random() * 5;
    };
    SlowLaneCarManager.prototype.OnGameMenu = function () {
        this.mLane.transform.position = new Laya.Vector3(0, 0, 0);
        this.disZ = 0;
        this.mAccel = 0;
        this.mAccelTimer = 0;
        this.SetIntervalDis();
        this.InitSlowLaneCar();
        this.mInMove = true;
        this._roadLevel = RoadManager_1.default.Instance().GetRoadLevel();
        this._overCarAmount = 0;
        this.mRvehiclespeed = LevelConfig_1.default.Instance().getDataByLevel(this._roadLevel).rvehiclespeed;
        this.mOverGetCoin = LevelConfig_1.default.Instance().getDataByLevel(this._roadLevel).overtakecoin;
        this._inAwardLevel = LevelConfig_1.default.Instance().getDataByLevel(this._roadLevel).leveltype == 1;
        console.log(this._inAwardLevel, "this._inAwardLevel");
    };
    SlowLaneCarManager.prototype.OnGameRelive = function () {
        this.mInMove = true;
    };
    SlowLaneCarManager.prototype.SetIntervalDis = function () {
        console.log(this._roadLevel);
        this.mRvehiclegenerateintervalMax = LevelConfig_1.default.Instance().getDataByLevel(this._roadLevel).rvehiclegenerateintervalMax;
        this.mRvehiclegenerateintervalMin = LevelConfig_1.default.Instance().getDataByLevel(this._roadLevel).rvehiclegenerateintervalMin;
    };
    SlowLaneCarManager.prototype.Move = function () {
        var time = Utilit_1.default.safeDelta() / 1000;
        this.mAccelTimer += time;
        var speed = this.mMoveSpeed + this.mAccelTimer * this.mAccel;
        var speedMax = 1.3 * this.mMoveSpeed;
        speed = Math.min(speedMax, speed);
        this.mLane.transform.translate(new Laya.Vector3(0, 0, speed * time));
    };
    SlowLaneCarManager.prototype.GetSlowLaneSpeed = function () {
        return this.mMoveSpeed;
    };
    SlowLaneCarManager.prototype.GetSafePos = function () {
        return new Laya.Vector3(this.mCarLists[this.mCurrentCarIndex].GetTailstock().x, this.mCarLists[this.mCurrentCarIndex].GetTailstock().y, this.mCarLists[this.mCurrentCarIndex].GetTailstock().z - 1);
    };
    SlowLaneCarManager.prototype.GetCarTail = function () {
        return this.mCarLists[this.mCurrentCarIndex].GetTailstock();
    };
    SlowLaneCarManager.prototype.ShowCoin = function () {
        var dis = this.GetCarTail().z + 3 - PlayerManager_1.default.Instance().GetPlayerCar().GetHeadstock().z;
        var amount = Math.floor(dis / 2.5); //1.5是每个金币的间隔
        for (var i = 0; i < amount; i++) {
            var coin = this.mCoinLists[i];
            if (coin == null) {
                coin = Laya.Sprite3D.instantiate(this.mCoinPre, this.mCoinPanel).addComponent(Coin_1.default);
                this.mCoinLists.push(coin);
            }
            var pos = new Laya.Vector3(this.mLane.transform.position.x - 1.2, this.mLane.transform.position.y + 0.25, PlayerManager_1.default.Instance().GetPlayerCar().GetHeadstock().z + dis / amount * i);
            coin.Show(pos);
        }
    };
    SlowLaneCarManager.prototype.OnGameOver = function () {
        this.mInMove = false;
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.RecoverCoin);
    };
    SlowLaneCarManager.prototype.GetOverCarAmount = function () {
        return this._overCarAmount;
    };
    return SlowLaneCarManager;
}(Laya.Script));
exports.default = SlowLaneCarManager;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../User/User":80,"../../Utilit":81,"../Model/CarConfig":44,"../Model/LevelConfig":45,"../OBJ/Camera":50,"../OBJ/Carport":52,"../OBJ/Coin":54,"../OBJ/ScoreCard":62,"../OBJ/SlowLaneCar":63,"./GameManager":38,"./PlayerManager":40,"./RoadManager":41,"./SceneManager":42}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CarData = /** @class */ (function () {
    function CarData() {
        this.id = 0;
        this.accel = 0;
        this.price = 0;
    }
    return CarData;
}());
exports.CarData = CarData;
var CarDataConfig = /** @class */ (function () {
    function CarDataConfig() {
        this._data = new Array();
    }
    CarDataConfig.Instance = function () {
        if (null == CarDataConfig._instance) {
            CarDataConfig._instance = CarDataConfig.load();
        }
        return CarDataConfig._instance;
    };
    CarDataConfig.load = function () {
        var config = new CarDataConfig();
        var json = Laya.loader.getRes("subRes/json/carData.json");
        if (json) {
            for (var i = 0; i < json.length; ++i) {
                var row = json[i];
                var rowData = new CarData();
                rowData.id = Number(row["id"]);
                rowData.accel = Number(row["accel"]);
                rowData.price = Number(row["price"]);
                config._data.push(rowData);
            }
            return config;
        }
    };
    CarDataConfig.prototype.getCarDataByID = function (id) {
        return this._data[id];
    };
    return CarDataConfig;
}());
exports.default = CarDataConfig;
},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoadManager_1 = require("../Manager/RoadManager");
var LevelData = /** @class */ (function () {
    function LevelData() {
        this.levelid = 0;
        this.leveltype = 0;
        this.missiondistance = 0;
        this.overtakecoin = 0;
        this.rvehiclespeed = 0;
        this.lvehiclegenerateintervalMin = 0;
        this.lvehiclegenerateintervalMax = 0;
        this.rvehiclegenerateintervalMin = 0;
        this.rvehiclegenerateintervalMax = 0;
        this.levelcoin = 0;
        this.randomSpeedLists = new Array();
        this.envType = 0;
    }
    return LevelData;
}());
exports.LevelData = LevelData;
var LevelDataConfig = /** @class */ (function () {
    function LevelDataConfig() {
        this._data = new Array();
    }
    LevelDataConfig.Instance = function () {
        if (null == LevelDataConfig._instance) {
            LevelDataConfig._instance = LevelDataConfig.load();
        }
        return LevelDataConfig._instance;
    };
    LevelDataConfig.load = function () {
        var config = new LevelDataConfig();
        var json = Laya.loader.getRes("subRes/json/levelData.json");
        if (json) {
            for (var i = 0; i < json.length; ++i) {
                var row = json[i];
                var rowData = new LevelData();
                rowData.levelid = Number(row["levelid"]);
                rowData.leveltype = Number(row["leveltype"]);
                rowData.missiondistance = Number(row["missiondistance"]);
                rowData.overtakecoin = Number(row["overtakecoin"]);
                rowData.lvehiclegenerateintervalMin = Number(row["lvehiclegenerateintervalMin"]);
                rowData.lvehiclegenerateintervalMax = Number(row["lvehiclegenerateintervalMax"]);
                rowData.rvehiclegenerateintervalMin = Number(row["rvehiclegenerateintervalMin"]);
                rowData.rvehiclegenerateintervalMax = Number(row["rvehiclegenerateintervalMax"]);
                rowData.rvehiclespeed = Number(row["rvehiclespeed"]);
                rowData.levelcoin = Number(row["levelcoin"]);
                rowData.lvehiclespeed = String(row["lvehiclespeed"]);
                rowData.envType = Number(row["envType"]);
                var list = rowData.lvehiclespeed.split(",");
                list.forEach(function (temp) {
                    var speed = parseInt(temp);
                    rowData.randomSpeedLists.push(speed);
                });
                config._data.push(rowData);
            }
            return config;
        }
    };
    LevelDataConfig.prototype.getDataByLevel = function (level) {
        return this._data[level];
    };
    LevelDataConfig.prototype.getLevelAmount = function () {
        return this._data.length;
    };
    LevelDataConfig.prototype.getRealLevel = function () {
        var level = RoadManager_1.default.Instance().GetRoadLevel() - 1;
        if (level >= this._data.length) {
            level = this._data.length - level % (this._data.length - 4);
        }
        return level;
    };
    return LevelDataConfig;
}());
exports.default = LevelDataConfig;
},{"../Manager/RoadManager":41}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../View/ViewBase");
var GameManager_1 = require("../Manager/GameManager");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var User_1 = require("../../User/User");
var RoadManager_1 = require("../Manager/RoadManager");
var PlayerManager_1 = require("../Manager/PlayerManager");
var ReliveBtn_1 = require("../../View/MyViews/UIobject/ReliveBtn");
var GameMgr_1 = require("../../Mgr/GameMgr");
var RecordBorad_1 = require("./uiOBJ/RecordBorad");
var NativeCallback_1 = require("../../NativeCallback");
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.fuelHeight = 0;
        _this.fuelTimer = 32000;
        _this.mGetCoinAmountByGame = 0;
        _this.mCoinAmount = 0;
        _this.mReliveTimeAmount = 0;
        _this._overCarAmount = 0;
        return _this;
    }
    GameView.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.Init();
    };
    GameView.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        this.fuelHeight = this.mFuelTank.height;
        // let fuelRatio = 600;
        // // if (LevelDataConfig.Instance().getDataByLevel().leveltype == 1) fuelRatio = 1500;
        this.RefreshFuelTank();
        this.mReliveTimeAmount = this.mReliveBtn.GetTimerAmount();
        this.overNum.value = this._overCarAmount.toString();
        this.giveUpBtn.visible = false;
    };
    GameView.prototype.onUpdate = function () {
        this.RefreshCoinAmount();
        // this.UpdateCar();
    };
    GameView.prototype.add_wcjtn_Event = function () {
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ShowResults, this, this.OnGameOver);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OverCar, this, this.RefreshFuelTank);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OverCar, this, this.OverCar);
        this.reliveBtn.on(Laya.Event.CLICK, this, this.ClickReliveBtn);
        this.giveUpBtn.on(Laya.Event.CLICK, this, this.ClickGiveUpBtn);
    };
    GameView.prototype.remove_wcjtn_Event = function () {
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ShowResults, this, this.OnGameOver);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OverCar, this, this.RefreshFuelTank);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameRelive, this, this.OnGameRelive);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OverCar, this, this.OverCar);
        this.reliveBtn.off(Laya.Event.CLICK, this, this.ClickReliveBtn);
        this.giveUpBtn.off(Laya.Event.CLICK, this, this.ClickGiveUpBtn);
    };
    GameView.prototype.Init = function () {
        this.mCoinAmount = User_1.default.get_wcjtn_Money();
        this.moneyNum.value = this.mCoinAmount.toString();
        this.remark.visible = false;
        this.winRemark.visible = false;
        this.loseByFuel.visible = false;
        this.loseRemark.visible = false;
        this.getCoin.scale(0, 0);
        this.mReliveBtn = this.reliveBtn.getComponent(ReliveBtn_1.default);
        this._recordBorad = this.owner.getChildByName("newRecord").getComponent(RecordBorad_1.default);
    };
    GameView.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    GameView.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    GameView.prototype.onRewardVidewoFail = function () {
        if (NativeCallback_1.default.NowVideoType == "relive") {
            GameManager_1.default.Instance().OpenOverView();
            this.close_wcjtn_View();
            NativeCallback_1.default.NowVideoType = "";
        }
    };
    GameView.prototype.onRewardVidewoSuccess = function () {
        if (NativeCallback_1.default.NowVideoType == "relive") {
            GameManager_1.default.Instance().GameRelive();
            this.mReliveBtn.Hide();
            NativeCallback_1.default.NowVideoType = "";
        }
    };
    GameView.prototype.OnGameOver = function () {
        var _this = this;
        Laya.Tween.clearAll(this.mFuelTank);
        this.remark.scale(0, 0);
        this.remark.visible = true;
        this.getCoin.value = "+" + GameManager_1.default.Instance().GetCoinAmount();
        if (this._overCarAmount > User_1.default.getOverRecord() || User_1.default.getOverRecord() == null) {
            //刷新了记录
            this.RefreshRecord();
            this._recordBorad.Show(this._overCarAmount, GameManager_1.default.Instance().GetCoinAmount());
        }
        else {
            if (!this.loseByFuel.visible) {
                this.winRemark.visible = GameManager_1.default.Instance().GameResults;
                this.loseRemark.visible = !GameManager_1.default.Instance().GameResults;
            }
            Laya.Tween.to(this.remark, { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.backOut, Laya.Handler.create(this, function () {
                _this.OverAwardShow();
            }));
        }
    };
    /**
 * 刷新纪录
 */
    GameView.prototype.RefreshRecord = function () {
        User_1.default.setOverRecord(this._overCarAmount);
        GameMgr_1.default.get_wcjtn_Instance().save_wcjtn_Game_wcjtn_Data();
    };
    GameView.prototype.ClickGiveUpBtn = function () {
        Laya.timer.clearAll(this);
        GameManager_1.default.Instance().OpenOverView();
        this.close_wcjtn_View();
    };
    GameView.prototype.OnGameRelive = function () {
        Laya.timer.clearAll(this);
        this.RefreshFuelTank();
        this.remark.visible = false;
        this.winRemark.visible = false;
        this.loseByFuel.visible = false;
        this.loseRemark.visible = false;
        this.getCoin.scale(0, 0);
    };
    GameView.prototype.RefreshCoinAmount = function () {
        if (this.mGetCoinAmountByGame < GameManager_1.default.Instance().GetCoinAmount()) {
            this.mGetCoinAmountByGame++;
            this.mCoinAmount++;
            this.moneyNum.value = this.mCoinAmount.toString();
        }
    };
    GameView.prototype.OverAwardShow = function () {
        var _this = this;
        //TODO金币获取动画效果   总时间在500ms完成   完成后关闭界面，打开导出界面
        if (GameManager_1.default.Instance().GameResults) {
            this.getCoin.scale(1, 1);
        }
        Laya.timer.once(2000, this, function () {
            _this.giveUpBtn.visible = true;
        });
        Laya.timer.once(500, this, function () {
            if (GameManager_1.default.Instance().GameResults) {
                //游戏胜利
                GameManager_1.default.Instance().OpenOverView();
                _this.close_wcjtn_View();
            }
            else {
                //游戏失败
                _this.mReliveBtn.Show();
                Laya.timer.once((_this.mReliveTimeAmount + 2) * 1000, _this, function () {
                    GameManager_1.default.Instance().OpenOverView();
                    _this.close_wcjtn_View();
                });
                Laya.Tween.to(_this.getCoin, { scaleX: 1, scaleY: 1 }, 1000, Laya.Ease.backOut);
                // Laya.timer.once(this.mReliveTimeAmount * 1000, this, () => {
                //     Laya.Tween.to(this.getCoin, { scaleX: 1, scaleY: 1 }, 1000, Laya.Ease.backOut);
                // })
            }
        });
    };
    GameView.prototype.UpdateCar = function () {
        var value = Math.min(266, (266 - this.completeCar.width / 2) * (RoadManager_1.default.Instance().GetCompleteValue()));
        this.completeCar.x = value;
    };
    GameView.prototype.close_wcjtn_View = function () {
        _super.prototype.close_wcjtn_View.call(this);
        Laya.Tween.clearAll(this.mFuelTank);
    };
    GameView.prototype.RefreshFuelTank = function () {
        var _this = this;
        Laya.Tween.clearAll(this.mFuelTank);
        Laya.Tween.to(this.mFuelTank, { height: this.fuelHeight }, 300, Laya.Ease.quadOut, Laya.Handler.create(this, function () {
            Laya.Tween.to(_this.mFuelTank, { height: 0 }, _this.fuelTimer, null, Laya.Handler.create(_this, function () {
                PlayerManager_1.default.Instance().NoFuel();
                _this.loseByFuel.visible = true;
                GameManager_1.default.Instance().GameOver(false);
            }));
        }));
    };
    GameView.prototype.OverCar = function () {
        this._overCarAmount++;
        this.overNum.value = this._overCarAmount.toString();
        this.fuelTimer -= 150;
        this.fuelTimer = Math.max(8000, this.fuelTimer);
        // console.log(this.fuelTimer);
    };
    GameView.prototype.ClickReliveBtn = function () {
        Laya.timer.clearAll(this);
        this.mReliveBtn.Hide();
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback_1.default.CallNativeFunc("showRewardVideo");
            NativeCallback_1.default.NowVideoType = "relive";
            Laya.SoundManager.muted = true;
        }
        else {
            GameManager_1.default.Instance().GameRelive();
            this.mReliveBtn.Hide();
        }
    };
    return GameView;
}(ViewBase_1.default));
exports.default = GameView;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Mgr/GameMgr":31,"../../NativeCallback":68,"../../User/User":80,"../../View/MyViews/UIobject/ReliveBtn":91,"../../View/ViewBase":130,"../Manager/GameManager":38,"../Manager/PlayerManager":40,"../Manager/RoadManager":41,"./uiOBJ/RecordBorad":47}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameManager_1 = require("../../Manager/GameManager");
var User_1 = require("../../../User/User");
var ViewMgr_1 = require("../../../Mgr/ViewMgr");
var CircularProcessBar_1 = require("../../../View/CircularProcessBar");
var Utilit_1 = require("../../../Utilit");
var EventMgr_1 = require("../../../Event/EventMgr");
var EventDef_1 = require("../../../Event/EventDef");
var NativeCallback_1 = require("../../../NativeCallback");
var RecordBorad = /** @class */ (function (_super) {
    __extends(RecordBorad, _super);
    function RecordBorad() {
        var _this = _super.call(this) || this;
        _this._getCoinAmount = 0;
        _this._recordVal = 0;
        _this._fixRecordVal = 0;
        _this._mTimeAmount = 3; //8S倒计时
        _this._mTimer = 0;
        return _this;
    }
    RecordBorad.prototype.onAwake = function () {
        this._mOwner = this.owner;
        this._mOwner.visible = false;
        this._mCircularBar = this.circularBar.getComponent(CircularProcessBar_1.default);
        this.giveUpBtn.visible = false;
    };
    RecordBorad.prototype.addEvent = function () {
        this.tribleBtn.on(Laya.Event.CLICK, this, this.clickTribleBtn);
        this.giveUpBtn.on(Laya.Event.CLICK, this, this.clickGiveUpBtn);
    };
    RecordBorad.prototype.removeEvent = function () {
        this.tribleBtn.off(Laya.Event.CLICK, this, this.clickTribleBtn);
        this.giveUpBtn.off(Laya.Event.CLICK, this, this.clickGiveUpBtn);
    };
    RecordBorad.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    RecordBorad.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    RecordBorad.prototype.onRewardVidewoFail = function () {
        if (NativeCallback_1.default.NowVideoType == "trible") {
            //存档
            GameManager_1.default.Instance().OpenOverView();
            ViewMgr_1.default.ins_wcjtn_tance.close_wcjtn_View(ViewMgr_1.View_wcjtn_Def.GameView);
            NativeCallback_1.default.NowVideoType = "";
        }
    };
    RecordBorad.prototype.onRewardVidewoSuccess = function () {
        if (NativeCallback_1.default.NowVideoType == "trible") {
            User_1.default.add_wcjtn_Money(this._getCoinAmount * 2);
            //存档
            GameManager_1.default.Instance().OpenOverView();
            ViewMgr_1.default.ins_wcjtn_tance.close_wcjtn_View(ViewMgr_1.View_wcjtn_Def.GameView);
            NativeCallback_1.default.NowVideoType = "";
        }
    };
    RecordBorad.prototype.onUpdate = function () {
        if (this._mOwner.visible) {
            //更新记录数字的展示
            if (this._recordVal < this._fixRecordVal) {
                this._recordVal++;
                this.record.value = this._recordVal.toString();
            }
            this.TimeGo();
        }
    };
    RecordBorad.prototype.TimeGo = function () {
        if (!this.timerClip.visible)
            return;
        this._mTimer += Utilit_1.default.safeDelta();
        var time = this._mTimeAmount - Math.floor(this._mTimer / 1000);
        this.timerClip.value = time.toString();
        var val = this._mTimer / (this._mTimeAmount * 1000);
        this._mCircularBar.set_wcjtn_Value(val);
        if (time <= 0) {
            this._mCircularBar.hide();
            this.timerClip.visible = false;
        }
    };
    RecordBorad.prototype.Show = function (record, getCoin) {
        var _this = this;
        this._getCoinAmount = getCoin;
        this._fixRecordVal = record;
        this.getCoin.value = this._getCoinAmount.toString();
        this.record.value = this._recordVal.toString();
        this.FontMove(this.xin, 0);
        this.FontMove(this.ji, 500);
        this.FontMove(this.lu, 1000);
        this._mOwner.visible = true;
        // this.ToFixScale(this.tribleBtn,1000,1,0,null);
        // this.ToFixScale(this.giveUpBtn,500,1,2000,null);
        // this.ToFixScale(this.getCoin,1000,1,0,null);
        this.tribleBtn.visible = true;
        this.getCoin.visible = true;
        Laya.timer.once(this._mTimeAmount * 1000, this, function () {
            _this.giveUpBtn.visible = true;
        });
        this.addEvent();
    };
    RecordBorad.prototype.ToFixScale = function (sp, timer, fixScale, delay, ease) {
        sp.scale(0, 0);
        Laya.timer.once(delay, this, function () {
            Laya.Tween.to(sp, { scaleX: fixScale, scaleY: fixScale }, timer, ease);
        });
    };
    RecordBorad.prototype.FontMove = function (sp, delay) {
        sp.pos(sp.x, sp.y - 500);
        Laya.timer.once(delay, this, function () {
            Laya.Tween.to(sp, { y: sp.y + 500 }, 300, Laya.Ease.elasticOut);
        });
    };
    RecordBorad.prototype.clickTribleBtn = function () {
        this.removeEvent();
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback_1.default.CallNativeFunc("showRewardVideo");
            NativeCallback_1.default.NowVideoType = "trible";
            Laya.SoundManager.muted = true;
        }
        else {
            User_1.default.add_wcjtn_Money(this._getCoinAmount * 2);
            GameManager_1.default.Instance().OpenOverView();
            ViewMgr_1.default.ins_wcjtn_tance.close_wcjtn_View(ViewMgr_1.View_wcjtn_Def.GameView);
        }
    };
    RecordBorad.prototype.clickGiveUpBtn = function () {
        GameManager_1.default.Instance().OpenOverView();
        ViewMgr_1.default.ins_wcjtn_tance.close_wcjtn_View(ViewMgr_1.View_wcjtn_Def.GameView);
    };
    return RecordBorad;
}(Laya.Script));
exports.default = RecordBorad;
},{"../../../Event/EventDef":9,"../../../Event/EventMgr":10,"../../../Mgr/ViewMgr":34,"../../../NativeCallback":68,"../../../User/User":80,"../../../Utilit":81,"../../../View/CircularProcessBar":84,"../../Manager/GameManager":38}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../../Event/EventMgr");
var EventDef_1 = require("../../../Event/EventDef");
var SwitchBtn = /** @class */ (function (_super) {
    __extends(SwitchBtn, _super);
    function SwitchBtn() {
        var _this = _super.call(this) || this;
        _this._inOverLane = false;
        return _this;
    }
    SwitchBtn.prototype.onAwake = function () {
        this._mBtn = this.owner;
    };
    SwitchBtn.prototype.onEnable = function () {
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ToSlowLane, this, this.ToSlowLane);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ToOverLane, this, this.ToOverLane);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameOver, this, this.ToSlowLane);
    };
    SwitchBtn.prototype.onDestroy = function () {
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ToSlowLane, this, this.ToSlowLane);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ToOverLane, this, this.ToOverLane);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameOver, this, this.ToSlowLane);
    };
    SwitchBtn.prototype.onStart = function () {
        this.speedBarMask.graphics.drawPie(0, 0, 150, -180, -180 + this.speedPointer.rotation, "#30c50b");
    };
    SwitchBtn.prototype.onUpdate = function () {
        if (this._inOverLane && this._mBtn.visible) {
            if (this.speedPointer.rotation < 180)
                this.speedPointer.rotation++;
            this.speedBarMask.graphics.drawPie(0, 0, 150, -180, -180 + this.speedPointer.rotation, "#30c50b");
        }
    };
    SwitchBtn.prototype.ToSlowLane = function () {
        this._inOverLane = false;
        this._mBtn.visible = false;
    };
    SwitchBtn.prototype.ToOverLane = function () {
        this._inOverLane = true;
    };
    return SwitchBtn;
}(Laya.Script));
exports.default = SwitchBtn;
},{"../../../Event/EventDef":9,"../../../Event/EventMgr":10}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UiFuelBar = /** @class */ (function (_super) {
    __extends(UiFuelBar, _super);
    function UiFuelBar() {
        var _this = _super.call(this) || this;
        _this._enoughPic = "res/油条2.png";
        _this._lowFuelPic = "res/油条1.png";
        _this._startHeight = 0;
        _this._inWanning = false;
        return _this;
    }
    UiFuelBar.prototype.onAwake = function () {
        this.mBar = this.owner;
        this.mBar.skin = this._enoughPic;
        this._startHeight = this.mBar.height;
    };
    UiFuelBar.prototype.onUpdate = function () {
        if (this.mBar.height <= this._startHeight / 2 && !this._inWanning) {
            this.Wanning();
        }
        else if (this.mBar.height > this._startHeight / 2 && this._inWanning) {
            Laya.timer.clearAll(this);
            this._inWanning = false;
            this.mBar.skin = this._enoughPic;
        }
    };
    UiFuelBar.prototype.Wanning = function () {
        var _this = this;
        this._inWanning = true;
        this.mBar.skin = this._enoughPic;
        Laya.timer.once(200, this, function () {
            _this.mBar.skin = _this._lowFuelPic;
            Laya.timer.once(200, _this, function () {
                _this.Wanning();
            });
        });
    };
    return UiFuelBar;
}(Laya.Script));
exports.default = UiFuelBar;
},{}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CameraMoveScript_1 = require("../../CameraMoveScript");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var User_1 = require("../../User/User");
var Camera = /** @class */ (function (_super) {
    __extends(Camera, _super);
    function Camera() {
        var _this = _super.call(this) || this;
        _this.mStartPos = new Laya.Vector3(0, 1.29, -3.68);
        _this.mMenuPos = new Laya.Vector3(-1.037, 0.8065599060058591, -5.2834547424316405);
        _this.mMenuRot = new Laya.Vector3(-9.844753429733803, 180, -1.1997108123651298e-15);
        _this.mDrivingLocalPos = new Laya.Vector3(-1.037, 0.15, -1.6);
        _this.mDrivingRot = new Laya.Vector3(-6.327983014211964, 180, -7.73379915245168e-16);
        _this.mOverTakeLocalPos = new Laya.Vector3(-1.1857875429273104, 1.3483932496702797, -6.897052740230979);
        _this.mOverTakeRot = new Laya.Vector3(-18.810397007940924, -179.312450645843, -6.703097649785998e-9);
        _this.mGameOverLocalPos = new Laya.Vector3(-1.0366785786747938, 5.274029811322687, -16.520498341321968);
        _this.mSkinLocalPos = new Laya.Vector3(2.776828130783511, 0.9670544925895491, 1.3143668467550922);
        _this.mSkinLocalRot = new Laya.Vector3(-27.397888441361758, 58.90880774587121, 0.0000017969461739164333);
        _this.mDisByCarZ = 0;
        _this.mDisByCarX = 0;
        _this.mTempVector3 = new Laya.Vector3();
        _this.mMaxDisZ = -5;
        _this.mMinDisZ = -1;
        _this.mCarID = 0;
        return _this;
    }
    Camera.Instance = function () {
        return this._instance;
    };
    Camera.prototype.onAwake = function () {
        Camera._instance = this;
        this.Init();
    };
    Camera.prototype.onEnable = function () {
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameMenu, this, this.OnGameMenu);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameOver, this, this.OnGameOver);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ToSlowLane, this, this.ToSlowLane);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ToOverLane, this, this.ToOverTakeLane);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OnGameRelive, this, this.ToSlowLane);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ChangeRoadLevel, this, this.OnChangeRoalLevel);
        this.mCamera.addComponent(CameraMoveScript_1.default);
    };
    Camera.prototype.onDestroy = function () {
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameMenu, this, this.OnGameMenu);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameOver, this, this.OnGameOver);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ToSlowLane, this, this.ToSlowLane);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ToOverLane, this, this.ToOverTakeLane);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OnGameRelive, this, this.ToSlowLane);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ChangeRoadLevel, this, this.OnChangeRoalLevel);
    };
    Camera.prototype.Init = function () {
        this.mOwner = this.owner;
        this.mCamera = this.mOwner.getChildByName("Main Camera");
        this.mSpeedUpEff = this.mOwner.getChildByName("SpeedUpEffect");
        this.mSpeedUpEff.active = false;
        this.mOverScoreEff = this.mOwner.getChildByName("Fx_posui");
        this.mOverScoreEff.active = false;
        this.mCrushEff = this.mOwner.getChildByName("Fx_crush");
        this.mCrushEff.active = false;
        this.mColorBarEff = this.mOwner.getChildByName("shenli");
        this.mColorBarEff.active = false;
        // this.mChangeEnvEff.play("anim_basi",0,0);
    };
    Camera.prototype.SetCameraPos = function () {
        this.mOwner.transform.position = new Laya.Vector3(this.mCar.transform.position.x - this.mDisByCarX, this.mOwner.transform.position.y, this.mCar.transform.position.z - this.mDisByCarZ);
    };
    Camera.prototype.SetFollowCar = function (car) {
        this.mCar = car;
        this.mDisByCarZ = this.mCar.transform.position.z - this.mOwner.transform.position.z;
        this.mDisByCarX = this.mCar.transform.position.x - this.mOwner.transform.position.x;
    };
    Camera.prototype.GetCameraPos = function () {
        return this.mOwner.transform.position;
    };
    Camera.prototype.onKeyDown = function (e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case 101:
                console.log(this.mCamera.transform.position, this.mCamera.transform.rotationEuler);
                break;
            case 102:
                console.log(this.mCamera.transform.localPosition, this.mCamera.transform.localRotationEuler);
                break;
        }
    };
    Camera.prototype.OnGameMenu = function () {
        this.mOwner.transform.position = this.mStartPos;
        this.mCarID = User_1.default.getCarID();
        this.ToMenu();
    };
    Camera.prototype.ShowOverScoreEff = function () {
        var _this = this;
        this.mColorBarEff.active = false;
        this.mColorBarEff.active = true;
        Laya.timer.once(2000, this, function () {
            _this.mColorBarEff.active = false;
        });
        this.mOverScoreEff.active = false;
        this.mOverScoreEff.active = true;
    };
    Camera.prototype.ShowCrushEff = function () {
        this.mCrushEff.active = false;
        this.mCrushEff.active = true;
    };
    Camera.prototype.OnGameOver = function () {
        if (this.mCurrentTween)
            Laya.Tween.clear(this.mCurrentTween);
        this.mSpeedUpEff.active = false;
        this.mCurrentTween = Laya.Tween.to(this.mCamera.transform, { localPositionX: this.mGameOverLocalPos.x, localPositionY: this.mGameOverLocalPos.y, localPositionZ: this.mGameOverLocalPos.z }, 800, Laya.Ease.quintOut, Laya.Handler.create(this, function () {
            EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.ShowResults);
        }));
    };
    Camera.prototype.ToOverTakeLane = function (speed) {
        var _this = this;
        if (speed === void 0) { speed = 1; }
        if (this.mCurrentTween)
            Laya.Tween.clear(this.mCurrentTween);
        Laya.Tween.clearTween(this.mCamera.transform);
        Laya.timer.clearAll(this);
        this.mSpeedUpEff.active = true;
        Laya.timer.once(150 - this.mCarID * 10, this, function () {
            _this.mCurrentTween = Laya.Tween.to(_this.mCamera.transform, { localPositionX: _this.mOverTakeLocalPos.x,
                localPositionY: _this.mOverTakeLocalPos.y,
                localPositionZ: _this.mOverTakeLocalPos.z,
            }, 1000 * 4 * speed, Laya.Ease.quintOut);
        });
        Laya.timer.once(100, this, function () {
            Laya.Tween.to(_this.mCamera.transform, {
                localRotationEulerX: _this.mOverTakeRot.x,
                localRotationEulerZ: _this.mOverTakeRot.z
            }, 1000 * 12 * speed);
        });
    };
    Camera.prototype.ToSlowLane = function (speed) {
        if (speed === void 0) { speed = 1; }
        this.mSpeedUpEff.active = false;
        if (this.mCurrentTween)
            Laya.Tween.clear(this.mCurrentTween);
        Laya.Tween.clearTween(this.mCamera.transform);
        Laya.timer.clearAll(this);
        this.mCurrentTween = Laya.Tween.to(this.mCamera.transform, { localPositionX: this.mDrivingLocalPos.x,
            localPositionY: this.mDrivingLocalPos.y,
            localPositionZ: this.mDrivingLocalPos.z,
            localRotationEulerX: this.mDrivingRot.x,
            localRotationEulerZ: this.mDrivingRot.z }, 1500 * speed, Laya.Ease.backOut);
    };
    Camera.prototype.ToSkin = function () {
        Laya.timer.clearAll(this);
        if (this.mCurrentTween)
            Laya.Tween.clear(this.mCurrentTween);
        this.mCurrentTween = Laya.Tween.to(this.mCamera.transform, { localPositionX: this.mSkinLocalPos.x,
            localPositionY: this.mSkinLocalPos.y,
            localPositionZ: this.mSkinLocalPos.z,
            localRotationEulerX: this.mSkinLocalRot.x,
            localRotationEulerY: this.mSkinLocalRot.y,
            localRotationEulerZ: this.mSkinLocalRot.z }, 500, Laya.Ease.quadOut);
    };
    Camera.prototype.ToMenu = function () {
        Laya.timer.clearAll(this);
        if (this.mCurrentTween)
            Laya.Tween.clear(this.mCurrentTween);
        this.mCurrentTween = Laya.Tween.to(this.mCamera.transform, { localPositionX: this.mMenuPos.x,
            localPositionY: this.mMenuPos.y,
            localPositionZ: this.mMenuPos.z,
            localRotationEulerX: this.mMenuRot.x,
            localRotationEulerY: this.mMenuRot.y,
            localRotationEulerZ: this.mMenuRot.z }, 300);
    };
    Camera.prototype.OnChangeRoalLevel = function () {
        // this.mChangeEnvEff.active = false;
        // this.mChangeEnvEff.active = true;
    };
    return Camera;
}(Laya.Script));
exports.default = Camera;
},{"../../CameraMoveScript":5,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../User/User":80}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Wheel_1 = require("./Wheel");
var Rookie_1 = require("./Rookie");
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this) || this;
        _this.mLanePosX = 0;
        _this.mCarID = 0;
        _this.mWheelLists = new Array();
        return _this;
    }
    Car.prototype.onAwake = function () {
        var _this = this;
        this.mCar = this.owner;
        this.mRig = this.mCar.getComponent(Laya.Rigidbody3D);
        this.mHeadstock = this.mCar.getChildByName("Headstock");
        this.mTailstock = this.mCar.getChildByName("Tailstock");
        this.mCarModel = this.mCar.getChildByName("CarModel");
        this.mHeadLight0 = this.mCar.getChildByName("HeadLight0");
        this.mHeadLight0.active = false;
        this.mHeadLight1 = this.mCar.getChildByName("HeadLight1");
        this.mHeadLight1.active = false;
        this.mRookie = this.mCar.getChildByName("rookie").addComponent(Rookie_1.default);
        this.mRookie.hide();
        this.modelStartLocalPos = this.mCarModel.transform.localPosition.clone();
        this.modelStartLocalRot = this.mCarModel.transform.localRotationEuler.clone();
        this.mCarAni = this.mCar.getComponent(Laya.Animator);
        this.mCarAni.enabled = false;
        var lunzi = this.mCarModel.getChildByName("lunzi");
        lunzi._children.forEach(function (child) {
            var wheel = child.addComponent(Wheel_1.default);
            _this.mWheelLists.push(wheel);
        });
        var mesh = this.mCarModel;
        mesh.meshRenderer.castShadow = true;
    };
    Car.prototype.SetCarTrans = function (pos, rot) {
        this.mCar.transform.position = new Laya.Vector3(pos.x, this.mCar.transform.position.y, pos.z);
        this.mCar.transform.rotationEuler = rot;
        this.mLanePosX = this.mCar.transform.position.x;
        this.Show();
    };
    Car.prototype.GetRookie = function () {
        return this.mRookie;
    };
    Car.prototype.GetCarPos = function () {
        return this.mCar.transform.position;
    };
    Car.prototype.GetHeadstock = function () {
        return this.mHeadstock.transform.position;
    };
    Car.prototype.GetTailstock = function () {
        return this.mTailstock.transform.position;
    };
    Car.prototype.GetCar = function () {
        return this.mCar;
    };
    Car.prototype.Hide = function () {
        this.mCar.active = false;
        this.mRookie.hide();
    };
    Car.prototype.Show = function () {
        this.mCarModel.transform.localPosition = this.modelStartLocalPos;
        this.mCarModel.transform.localRotationEuler = this.modelStartLocalRot;
        this.mCar.active = true;
        this.mCarAni.enabled = false;
        this.ResetWheel();
    };
    Car.prototype.ResetWheel = function () {
        this.mWheelLists.forEach(function (wheel) {
            wheel.Reset();
        });
    };
    Car.mLength = 0;
    return Car;
}(Laya.Script3D));
exports.default = Car;
},{"./Rookie":61,"./Wheel":66}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameManager_1 = require("../Manager/GameManager");
/**
 * 车库
 */
var Carport = /** @class */ (function (_super) {
    __extends(Carport, _super);
    function Carport() {
        var _this = _super.call(this) || this;
        _this.mCarLists = new Array();
        return _this;
    }
    Carport.Instance = function () {
        return this._instance;
    };
    Carport.prototype.onAwake = function () {
        Carport._instance = this;
        for (var i = 0; i < GameManager_1.default.CarAmount; i++) {
            var car = this.owner.getChildByName("Car" + i);
            var ani = car.getComponent(Laya.Animator);
            ani.enabled = false;
            this.mCarLists.push(car);
        }
    };
    /**
     * 通过id获得对应汽车的对象
     * @param id 汽车对应的id
     */
    Carport.prototype.GetCarByID = function (id) {
        return this.mCarLists[id];
    };
    return Carport;
}(Laya.Script));
exports.default = Carport;
},{"../Manager/GameManager":38}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerManager_1 = require("../Manager/PlayerManager");
var Utilit_1 = require("../../Utilit");
var SceneManager_1 = require("../Manager/SceneManager");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var EnvirManager_1 = require("../Manager/EnvirManager");
var Cloud = /** @class */ (function (_super) {
    __extends(Cloud, _super);
    function Cloud() {
        var _this = _super.call(this) || this;
        _this.MaxY = 30;
        _this.MinY = 10;
        _this.MinX = -30;
        _this.MaxX = 30;
        return _this;
    }
    Cloud.prototype.onAwake = function () {
        this.mCloud = this.owner;
    };
    Cloud.prototype.onEnable = function () {
        // this.SetMat();
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ChangeRoadLevel, this, this.SetMat);
    };
    Cloud.prototype.onDestroy = function () {
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ChangeRoadLevel, this, this.SetMat);
    };
    Cloud.prototype.onStart = function () {
        this.mCloud.meshRenderer.material["albedoColor"] = new Laya.Vector4(1, 1, 1, 0.8);
    };
    Cloud.prototype.onUpdate = function () {
        if (PlayerManager_1.default.Instance().GetPlayerCar() && this.InShow()) {
            if (this.mCloud.transform.position.z - PlayerManager_1.default.Instance().GetPlayerCar().GetTailstock().z < -15) {
                this.Hide();
            }
        }
    };
    Cloud.prototype.Show = function (dis) {
        var x = Utilit_1.default.getRandomByRange(this.MinX, this.MaxX);
        var y = Utilit_1.default.getRandomByRange(this.MinY, this.MaxY);
        this.mCloud.transform.position = new Laya.Vector3(x, y, dis);
        this.mCloud.active = true;
    };
    Cloud.prototype.Hide = function () {
        this.mCloud.active = false;
    };
    Cloud.prototype.InShow = function () {
        return this.mCloud.active;
    };
    Cloud.prototype.SetMat = function () {
        var _this = this;
        return;
        Laya.timer.once(100, this, function () {
            var type = SceneManager_1.default.Instance().GetEnvType;
            switch (type) {
                case EnvirManager_1.EnvirType.CityDayTime:
                    _this.mCloud.meshRenderer.material["albedoColor"] = new Laya.Vector4(1, 1, 1, 1);
                    break;
                case EnvirManager_1.EnvirType.DesertDayTime:
                    _this.mCloud.meshRenderer.material["albedoColor"] = new Laya.Vector4(1, 1, 1, 1);
                    break;
                case EnvirManager_1.EnvirType.CityNight:
                    _this.mCloud.meshRenderer.material["albedoColor"] = new Laya.Vector4(141 / 255, 139 / 255, 124 / 255, 255 / 255);
                    break;
                case EnvirManager_1.EnvirType.DesertNight:
                    _this.mCloud.meshRenderer.material["albedoColor"] = new Laya.Vector4(141 / 255, 139 / 255, 124 / 255, 255 / 255);
                    break;
            }
        });
    };
    return Cloud;
}(Laya.Script));
exports.default = Cloud;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Utilit":81,"../Manager/EnvirManager":37,"../Manager/PlayerManager":40,"../Manager/SceneManager":42}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerManager_1 = require("../Manager/PlayerManager");
var SceneManager_1 = require("../Manager/SceneManager");
var GameManager_1 = require("../Manager/GameManager");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var Coin = /** @class */ (function (_super) {
    __extends(Coin, _super);
    function Coin() {
        return _super.call(this) || this;
    }
    Coin.prototype.onAwake = function () {
        this.mCoin = this.owner;
        this.mCoin.transform.scale.setValue(0.6, 0.6, 0.6);
        this.mGetEffect = this.mCoin.getChildByName("GetEffect");
        this.mGetEffect.active = false;
        this.mCoinModel = this.mCoin.getChildByName("CoinModel");
        this.mCamera = SceneManager_1.default.Instance().GetChildByName("Camera").getChildByName("Main Camera");
        this.mCoinModel.meshRenderer.castShadow = true;
    };
    Coin.prototype.onEnable = function () {
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.RecoverCoin, this, this.Hide);
    };
    Coin.prototype.onDestroy = function () {
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.RecoverCoin, this, this.Hide);
    };
    Coin.prototype.onUpdate = function () {
        if (this.mCoinModel.active) {
            this.mCoin.transform.localRotationEulerY -= 6;
            this.JudgeGet();
        }
        if (this.mGetEffect.active) {
            //跟随摄像机
            this.mGetEffect.transform.position = this.mCamera.transform.position;
        }
    };
    Coin.prototype.JudgeGet = function () {
        if ((Math.abs(this.mCoin.transform.position.x - PlayerManager_1.default.Instance().GetPlayerCar().GetHeadstock().x) < 0.5)
            && (Math.abs(this.mCoin.transform.position.z - PlayerManager_1.default.Instance().GetPlayerCar().GetHeadstock().z) < 0.5)) {
            this.GetCoin();
            this.mCoinModel.active = false;
        }
    };
    Coin.prototype.Show = function (pos) {
        this.mCoin.active = true;
        this.mCoinModel.active = true;
        this.mGetEffect.active = false;
        this.mCoin.transform.localRotationEulerY = 0;
        this.mCoin.transform.position = pos;
    };
    Coin.prototype.Hide = function () {
        this.mCoin.active = false;
    };
    Coin.prototype.GetCoin = function () {
        var _this = this;
        GameManager_1.default.Instance().AddGetCoin(1);
        //展示获得金币的特效
        return;
        this.mGetEffect.active = true;
        Laya.timer.once(2000, this, function () {
            // this.mGetEffect.active = false;
            _this.Hide();
        });
        //记录金币TODO
    };
    return Coin;
}(Laya.Script));
exports.default = Coin;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../Manager/GameManager":38,"../Manager/PlayerManager":40,"../Manager/SceneManager":42}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SceneManager_1 = require("../Manager/SceneManager");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var EnvirManager_1 = require("../Manager/EnvirManager");
var HorizonPlane = /** @class */ (function (_super) {
    __extends(HorizonPlane, _super);
    function HorizonPlane() {
        return _super.call(this) || this;
    }
    HorizonPlane.Instance = function () {
        return this._instance;
    };
    HorizonPlane.prototype.onAwake = function () {
        HorizonPlane._instance = this;
        this.mCamera = SceneManager_1.default.Instance().GetChildByName("Camera");
        this.mPlane = this.owner;
        this._mesh = this.owner.getChildByName("HorizonPlane").getChildByName("Plane_0");
        this._mesh.meshRenderer.receiveShadow = true;
    };
    HorizonPlane.prototype.onEnable = function () {
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ChangeEnv, this, this.SetPlaneMat);
    };
    HorizonPlane.prototype.onDestroy = function () {
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ChangeEnv, this, this.SetPlaneMat);
    };
    HorizonPlane.prototype.onUpdate = function () {
        this.mPlane.transform.position = this.mCamera.transform.position;
    };
    HorizonPlane.prototype.SetPlaneMat = function (type) {
        switch (type) {
            case EnvirManager_1.EnvirType.CityDayTime:
                this._mesh.meshRenderer.material = this._mesh.meshRenderer.materials[2];
                break;
            case EnvirManager_1.EnvirType.CityNight:
                this._mesh.meshRenderer.material = this._mesh.meshRenderer.materials[2];
                break;
            case EnvirManager_1.EnvirType.DesertDayTime:
                this._mesh.meshRenderer.material = this._mesh.meshRenderer.materials[3];
                break;
            case EnvirManager_1.EnvirType.DesertNight:
                this._mesh.meshRenderer.material = this._mesh.meshRenderer.materials[1];
                break;
        }
    };
    return HorizonPlane;
}(Laya.Script));
exports.default = HorizonPlane;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../Manager/EnvirManager":37,"../Manager/SceneManager":42}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VibrateMgr_1 = require("../../Mgr/VibrateMgr");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var OverCarEffect = /** @class */ (function (_super) {
    __extends(OverCarEffect, _super);
    function OverCarEffect() {
        return _super.call(this) || this;
    }
    OverCarEffect.Instance = function () {
        return this._instance;
    };
    OverCarEffect.prototype.onAwake = function () {
        OverCarEffect._instance = this;
        this.mOverEff = this.owner;
        this.mOverEff.transform.scale = new Laya.Vector3(0.6, 0.6, 0.6);
        this.mOverEff.active = false;
    };
    OverCarEffect.prototype.onEnable = function () {
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.OverCar, this, this.Show);
    };
    OverCarEffect.prototype.onDestroy = function () {
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.OverCar, this, this.Show);
    };
    OverCarEffect.prototype.SetFollowPos = function (pos) {
        this.mFollowPos = pos;
    };
    OverCarEffect.prototype.onUpdate = function () {
        if (this.mOverEff.active) {
            this.mOverEff.transform.position = this.mFollowPos;
        }
    };
    OverCarEffect.prototype.Show = function () {
        var _this = this;
        Laya.timer.clearAll(this);
        this.mOverEff.active = false;
        this.mOverEff.active = true;
        VibrateMgr_1.default.vibrate_wcjtn_Short();
        Laya.timer.once(1000, this, function () {
            _this.mOverEff.active = false;
        });
    };
    return OverCarEffect;
}(Laya.Script));
exports.default = OverCarEffect;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Mgr/VibrateMgr":33}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Car_1 = require("./Car");
var OverLaneCar = /** @class */ (function (_super) {
    __extends(OverLaneCar, _super);
    function OverLaneCar() {
        var _this = _super.call(this) || this;
        _this.mShakeSpeed = 1 + Math.random();
        _this.mShakeRot = 0.7;
        _this.mInFlashLight = false;
        return _this;
    }
    OverLaneCar.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this.mCar.transform.rotationEuler = new Laya.Vector3(0, 180, 0);
    };
    OverLaneCar.prototype.onUpdate = function () {
        this.Shake();
    };
    OverLaneCar.prototype.Shake = function () {
        if (Math.abs(this.mCarModel.transform.localRotationEulerX) >= this.mShakeRot)
            this.mShakeSpeed = -this.mShakeSpeed;
        this.mCarModel.transform.localRotationEulerX += this.mShakeSpeed * 0.1;
    };
    OverLaneCar.prototype.GetLightPos = function (name) {
        if (name == "HeadLight0") {
            return this.mHeadLight0;
        }
        else {
            return this.mHeadLight1;
        }
    };
    OverLaneCar.prototype.FlashLight = function () {
        if (!this.mInFlashLight) {
            // Sound_wcjtn_Mgr.ins_wcjtn_tance.play_wcjtn_Sound(Sound_wcjtn_Type.Whistle);
            this.mInFlashLight = true;
            this.mHeadLight0.active = false;
            this.mHeadLight1.active = false;
            this.mHeadLight0.active = true;
            this.mHeadLight1.active = true;
        }
    };
    OverLaneCar.prototype.ResetLight = function () {
        this.mHeadLight0.active = false;
        this.mHeadLight1.active = false;
        this.mInFlashLight = false;
    };
    OverLaneCar.prototype.OnCrush = function () {
        this.mCarAni.enabled = true;
        this.mCarAni.play("BeHit", 0, 0);
    };
    return OverLaneCar;
}(Car_1.default));
exports.default = OverLaneCar;
},{"./Car":51}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Car_1 = require("./Car");
var SlowLaneCarManager_1 = require("../Manager/SlowLaneCarManager");
var Wheel_1 = require("./Wheel");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var Utilit_1 = require("../../Utilit");
var GameManager_1 = require("../Manager/GameManager");
var Rookie_1 = require("./Rookie");
var PlayerCar = /** @class */ (function (_super) {
    __extends(PlayerCar, _super);
    function PlayerCar() {
        var _this = _super.call(this) || this;
        _this.mAccel = 3;
        _this.mSpeed = 0;
        _this.mSlowAccel = 0;
        _this.mMoveType = CarMoveType.InSlowLane;
        _this.mTrailDis = new Laya.Vector3(0, 0, 0);
        return _this;
    }
    PlayerCar.prototype.onAwake = function () {
        var _this = this;
        this.mCar = this.owner;
        this.mRig = this.mCar.getComponent(Laya.Rigidbody3D);
        this.mHeadstock = this.mCar.getChildByName("Headstock");
        this.mTailstock = this.mCar.getChildByName("Tailstock");
        this.mCarModel = this.mCar.getChildByName("CarModel");
        this.mHeadLight0 = this.mCar.getChildByName("HeadLight0");
        this.mHeadLight0.active = false;
        this.mHeadLight1 = this.mCar.getChildByName("HeadLight1");
        this.mHeadLight1.active = false;
        this.mRookie = this.mCar.getChildByName("rookie").addComponent(Rookie_1.default);
        this.mRookie.hide();
        this.modelStartLocalPos = this.mCarModel.transform.localPosition.clone();
        this.modelStartLocalRot = this.mCarModel.transform.localRotationEuler.clone();
        this.mCarAni = this.mCar.getComponent(Laya.Animator);
        this.mCarAni.enabled = false;
        var lunzi = this.mCarModel.getChildByName("lunzi");
        lunzi._children.forEach(function (child) {
            var wheel = child.addComponent(Wheel_1.default);
            _this.mWheelLists.push(wheel);
        });
        this.mCarModel.meshRenderer.castShadow = true;
        this.mLeftTrail = this.mCar.getChildByName("leftTrail");
        this.mRightTrail = this.mCar.getChildByName("rightTrail");
    };
    PlayerCar.prototype.onEnable = function () {
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ToSlowLane, this, this.ToSlowLane);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ToOverLane, this, this.ToOverTakeLane);
    };
    PlayerCar.prototype.onDestroy = function () {
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ToSlowLane, this, this.ToSlowLane);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ToOverLane, this, this.ToOverTakeLane);
    };
    PlayerCar.prototype.SetAccle = function (accel) {
        this.mAccel = accel;
    };
    PlayerCar.prototype.Move = function () {
        switch (this.mMoveType) {
            case CarMoveType.InSlowLane:
                this.SlowLaneMove();
                break;
            case CarMoveType.InOverLane:
                this.OverLaneMove();
                break;
            case CarMoveType.InRookie:
                this.RookieMove();
                break;
        }
    };
    PlayerCar.prototype.SlowLaneMove = function () {
        //回正运动
        // let speed = Math.max(SlowLaneCarManager.Instance().GetSlowLaneSpeed(), this.mSpeed);
        // Sound_wcjtn_Mgr.ins_wcjtn_tance.play_wcjtn_Sound(Sound_wcjtn_Type.Driving);
        // let speed = SlowLaneCarManager.Instance().GetSlowLaneSpeed();
        // let speedMax = 1.5 * speed;
        var dis = SlowLaneCarManager_1.default.Instance().GetSafePos().z - this.mHeadstock.transform.position.z;
        if (this.mHeadstock.transform.position.z - SlowLaneCarManager_1.default.Instance().GetCarTail().z < -0.5) {
            //横向运动                
            this.mCar.transform.localPositionX += Math.min(0, this.mLanePosX - this.mCar.transform.localPositionX) * (8 + 2 * this.mCarID) * Utilit_1.default.safeDelta() / 1000;
            //前进方向
            this.mSpeed = SlowLaneCarManager_1.default.Instance().GetSlowLaneSpeed() + dis * (0.8 + 0.3 * this.mCarID);
            this.mCar.transform.translate(new Laya.Vector3(0, 0, this.mSpeed * Utilit_1.default.safeDelta() / 1000));
        }
        else {
            this.mSpeed = SlowLaneCarManager_1.default.Instance().GetSlowLaneSpeed() + dis * 10;
            this.mCar.transform.translate(new Laya.Vector3(0, 0, this.mSpeed * Utilit_1.default.safeDelta() / 1000));
        }
    };
    PlayerCar.prototype.RookieMove = function () {
        //横向运动
        this.mCar.transform.localPositionX += Math.max(0, this.mLanePosX + 2.3 - this.mCar.transform.localPositionX) * (8 + 2 * this.mCarID) * Utilit_1.default.safeDelta() / 1000;
        //超车运动
        var speed = Math.max(SlowLaneCarManager_1.default.Instance().GetSlowLaneSpeed(), this.mSpeed);
        var speedMax = (50 + 5 * this.mCarID);
        speed += Utilit_1.default.safeDelta() / 1000 * this.mAccel;
        speed = Math.min(speedMax, speed) * 2.5;
        this.mSpeed = speed;
        this.mCar.transform.translate(new Laya.Vector3(0, 0, this.mSpeed * Utilit_1.default.safeDelta() / 1000));
    };
    PlayerCar.prototype.OverLaneMove = function () {
        //横向运动
        this.mCar.transform.localPositionX += Math.max(0, this.mLanePosX + 2.3 - this.mCar.transform.localPositionX) * (8 + 2 * this.mCarID) * Utilit_1.default.safeDelta() / 1000;
        //超车运动
        var speed = Math.max(SlowLaneCarManager_1.default.Instance().GetSlowLaneSpeed(), this.mSpeed);
        var speedMax = 50 + 5 * this.mCarID;
        speed += Utilit_1.default.safeDelta() / 1000 * this.mAccel;
        speed = Math.min(speedMax, speed);
        this.mSpeed = speed;
        this.mCar.transform.translate(new Laya.Vector3(0, 0, this.mSpeed * Utilit_1.default.safeDelta() / 1000));
    };
    /**
     * 变超车道
     */
    PlayerCar.prototype.ToOverTakeLane = function () {
        this.mMoveType = CarMoveType.InOverLane;
        this.mSpeed = SlowLaneCarManager_1.default.Instance().GetSlowLaneSpeed() * 1.2;
    };
    /**
     * 回慢速道
     */
    PlayerCar.prototype.ToSlowLane = function () {
        this.mMoveType = CarMoveType.InSlowLane;
        this.mSpeed = SlowLaneCarManager_1.default.Instance().GetSlowLaneSpeed();
        SoundMgr_1.default.ins_wcjtn_tance.stopSound(SoundMgr_1.Sound_wcjtn_Type.SpeedUp);
    };
    /**
     * 进入无敌星时间
     */
    PlayerCar.prototype.ToRookie = function () {
        this.mMoveType = CarMoveType.InRookie;
        this.mSpeed = SlowLaneCarManager_1.default.Instance().GetSlowLaneSpeed() * 1.2;
    };
    PlayerCar.prototype.Show = function () {
        _super.prototype.Show.call(this);
        this.mCarID = GameManager_1.default.mCarID;
        this.mMoveType = CarMoveType.InSlowLane;
    };
    PlayerCar.prototype.CompleteGame = function () {
        var _this = this;
        this.mMoveType = CarMoveType.InSlowLane;
        Laya.Tween.to(this.mCar.transform, { localPositionX: this.mLanePosX + 2.3 }, 100, Laya.Ease.quadOut, Laya.Handler.create(this, function () {
            Laya.Tween.to(_this.mCar.transform, { localPositionZ: _this.mCar.transform.localPositionZ + 20 }, 800, Laya.Ease.quadOut);
        }));
        Laya.timer.once(1800, this, function () {
            _this.mCar.transform.localPositionZ -= 20;
            _this.mCar.transform.localPositionX = _this.mLanePosX;
        });
    };
    PlayerCar.prototype.HideTrail = function () {
        this.mLeftTrail.active = false;
        this.mRightTrail.active = false;
    };
    PlayerCar.prototype.SetTrail = function (leftTrail, rightTrail) {
        this.mLeftTrail.active = true;
        this.mRightTrail.active = true;
        // return;
        this.mLeftTrail.addChild(leftTrail);
        this.mRightTrail.addChild(rightTrail);
        leftTrail.transform.position = this.mLeftTrail.transform.position;
        leftTrail.transform.translate(this.mTrailDis);
        rightTrail.transform.position = this.mRightTrail.transform.position;
        rightTrail.transform.translate(this.mTrailDis);
    };
    PlayerCar.prototype.SetOverEff = function (overEff) {
        this.mCar.addChild(overEff);
        overEff.transform.position = this.GetHeadstock();
    };
    PlayerCar.prototype.OnCrush = function () {
        this.mCarAni.enabled = true;
        this.mCarAni.play("Crush", 0, 0);
    };
    return PlayerCar;
}(Car_1.default));
exports.default = PlayerCar;
var CarMoveType;
(function (CarMoveType) {
    CarMoveType[CarMoveType["InOverLane"] = 0] = "InOverLane";
    CarMoveType[CarMoveType["InSlowLane"] = 1] = "InSlowLane";
    CarMoveType[CarMoveType["InCrash"] = 2] = "InCrash";
    CarMoveType[CarMoveType["InRookie"] = 3] = "InRookie";
})(CarMoveType = exports.CarMoveType || (exports.CarMoveType = {}));
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Mgr/SoundMgr":32,"../../Utilit":81,"../Manager/GameManager":38,"../Manager/SlowLaneCarManager":43,"./Car":51,"./Rookie":61,"./Wheel":66}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Road = /** @class */ (function (_super) {
    __extends(Road, _super);
    function Road() {
        return _super.call(this) || this;
    }
    Road.prototype.onAwake = function () {
        this.mRoad = this.owner;
        this.mShader = this.mRoad.getChildByName("Plane026");
        this.mShader.meshRenderer.receiveShadow = true;
    };
    return Road;
}(Laya.Script));
exports.default = Road;
},{}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerManager_1 = require("../Manager/PlayerManager");
var Rock = /** @class */ (function (_super) {
    __extends(Rock, _super);
    function Rock() {
        return _super.call(this) || this;
    }
    Rock.prototype.onAwake = function () {
        this.mRock = this.owner;
        this.mModel = this.mRock.getChildByName("model");
        this.mModel.meshRenderer.castShadow = true;
    };
    Rock.prototype.onUpdate = function () {
        if (PlayerManager_1.default.Instance().GetPlayerCar() && this.InShow()) {
            if (this.mRock.transform.position.z - PlayerManager_1.default.Instance().GetPlayerCar().GetTailstock().z < -15) {
                this.Hide();
            }
        }
    };
    Rock.prototype.Show = function (dis) {
        this.mRock.transform.position = new Laya.Vector3(this.mRock.transform.position.x, this.mRock.transform.position.y, dis);
        this.mModel.transform.localRotationEulerY += Math.random() * 360;
        this.mRock.active = true;
    };
    Rock.prototype.Hide = function () {
        this.mRock.active = false;
    };
    Rock.prototype.InShow = function () {
        return this.mRock.active;
    };
    return Rock;
}(Laya.Script));
exports.default = Rock;
},{"../Manager/PlayerManager":40}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerManager_1 = require("../Manager/PlayerManager");
var Rookie = /** @class */ (function (_super) {
    __extends(Rookie, _super);
    function Rookie() {
        var _this = _super.call(this) || this;
        _this._getOff = 4;
        _this._inOver = false;
        _this._inOff = false;
        _this._startX = 0;
        _this._rot = new Laya.Vector3(0, 0.05, 0);
        return _this;
    }
    Rookie.getInstance = function () {
        return this._instance;
    };
    Rookie.prototype.onAwake = function () {
        Rookie._instance = this;
        this._rookie = this.owner;
        this._model = this._rookie.getChildByName("model");
        this._startX = this._model.transform.position.x;
        this._outPosition = new Laya.Vector3(this._startX, this._model.transform.position.y, this._model.transform.position.z);
        this.hide();
    };
    Rookie.prototype.onUpdate = function () {
        if (this._rookie.active) {
            this._model.transform.rotate(this._rot);
            if (this._model.transform.position.z - PlayerManager_1.default.Instance().GetPlayerCar().GetHeadstock().z < 0.5) {
                var pos = new Laya.Vector3(PlayerManager_1.default.Instance().GetPlayerCar().GetHeadstock().x, this._model.transform.position.y, this._model.transform.position.z);
                Laya.Vector3.lerp(this._model.transform.position, pos, 0.1, this._outPosition);
            }
            else {
                var pos = new Laya.Vector3(this._startX, this._model.transform.position.y, this._model.transform.position.z);
                Laya.Vector3.lerp(this._model.transform.position, pos, 0.1, this._outPosition);
            }
            this._model.transform.position = this._outPosition;
        }
    };
    Rookie.prototype.show = function () {
        this._inOff = false;
        this._model.transform.localPositionX = -0.8;
        this._rookie.active = true;
    };
    Rookie.prototype.hide = function () {
        this._rookie.active = false;
    };
    return Rookie;
}(Laya.Script));
exports.default = Rookie;
},{"../Manager/PlayerManager":40}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScoreCard = /** @class */ (function (_super) {
    __extends(ScoreCard, _super);
    function ScoreCard() {
        return _super.call(this) || this;
    }
    ScoreCard.getInstance = function () {
        return this._instance;
    };
    ScoreCard.prototype.onAwake = function () {
        ScoreCard._instance = this;
        this._card = this.owner;
        this.hide();
    };
    ScoreCard.prototype.onUpdate = function () {
        if (this._card.active) {
            this._card.transform.position = this._followCar.transform.position;
        }
    };
    ScoreCard.prototype.show = function (car) {
        this._card.active = true;
        this._followCar = car;
    };
    ScoreCard.prototype.hide = function () {
        this._followCar = null;
        this._card.active = false;
    };
    return ScoreCard;
}(Laya.Script));
exports.default = ScoreCard;
},{}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Car_1 = require("./Car");
var SlowLaneCar = /** @class */ (function (_super) {
    __extends(SlowLaneCar, _super);
    function SlowLaneCar() {
        var _this = _super.call(this) || this;
        _this.mShakeSpeed = 1 + Math.random();
        _this.mShakeRot = 0.7;
        return _this;
    }
    SlowLaneCar.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
    };
    SlowLaneCar.prototype.onUpdate = function () {
        this.Shake();
    };
    SlowLaneCar.prototype.Shake = function () {
        if (Math.abs(this.mCarModel.transform.localRotationEulerX) >= this.mShakeRot)
            this.mShakeSpeed = -this.mShakeSpeed;
        this.mCarModel.transform.localRotationEulerX += this.mShakeSpeed * 0.1;
    };
    return SlowLaneCar;
}(Car_1.default));
exports.default = SlowLaneCar;
},{"./Car":51}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SceneManager_1 = require("../Manager/SceneManager");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var RoadManager_1 = require("../Manager/RoadManager");
var LevelConfig_1 = require("../Model/LevelConfig");
var SplashScreen = /** @class */ (function (_super) {
    __extends(SplashScreen, _super);
    function SplashScreen() {
        var _this = _super.call(this) || this;
        _this._envirID = 0;
        return _this;
    }
    SplashScreen.prototype.onAwake = function () {
        this._mOwner = this.owner;
        this._followSp = SceneManager_1.default.Instance().GetChildByName("Camera").getChildByName("Main Camera");
        this._mOwner.active = false;
    };
    SplashScreen.prototype.onEnable = function () {
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.ChangeRoadLevel, this, this.OnChangeRoadLevel);
    };
    SplashScreen.prototype.onUpdate = function () {
        if (this._mOwner.active) {
            this._mOwner.transform.position = this._followSp.transform.position;
        }
    };
    SplashScreen.prototype.onDestroy = function () {
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.ChangeRoadLevel, this, this.OnChangeRoadLevel);
    };
    SplashScreen.prototype.OnChangeRoadLevel = function () {
        var _this = this;
        // if(this._envirID == LevelDataConfig.Instance().getDataByLevel(RoadManager.Instance().GetRoadLevel()).envType)return;
        this._envirID = LevelConfig_1.default.Instance().getDataByLevel(RoadManager_1.default.Instance().GetRoadLevel()).envType;
        this._mOwner.active = false;
        this._mOwner.active = true;
        Laya.timer.once(1000, this, function () {
            _this._mOwner.active = false;
        });
    };
    return SplashScreen;
}(Laya.Script));
exports.default = SplashScreen;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../Manager/RoadManager":41,"../Manager/SceneManager":42,"../Model/LevelConfig":45}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerManager_1 = require("../Manager/PlayerManager");
var Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree() {
        return _super.call(this) || this;
    }
    Tree.prototype.onAwake = function () {
        this.mTree = this.owner;
        this.mTree._children.forEach(function (child) {
            child.meshRenderer.castShadow = true;
        });
    };
    Tree.prototype.onUpdate = function () {
        if (PlayerManager_1.default.Instance().GetPlayerCar() && this.InShow()) {
            if (this.mTree.transform.position.z - PlayerManager_1.default.Instance().GetPlayerCar().GetTailstock().z < -50) {
                this.Hide();
            }
        }
    };
    Tree.prototype.Show = function (dis) {
        if (Math.random() > 0.5) {
            this.mTree.transform.position = new Laya.Vector3(this.mTree.transform.position.x, this.mTree.transform.position.y, dis);
        }
        else {
            this.mTree.transform.position = new Laya.Vector3(-this.mTree.transform.position.x, this.mTree.transform.position.y, dis);
        }
        this.mTree.active = true;
    };
    Tree.prototype.Hide = function () {
        this.mTree.active = false;
    };
    Tree.prototype.InShow = function () {
        return this.mTree.active;
    };
    return Tree;
}(Laya.Script));
exports.default = Tree;
},{"../Manager/PlayerManager":40}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Wheel = /** @class */ (function (_super) {
    __extends(Wheel, _super);
    function Wheel() {
        return _super.call(this) || this;
    }
    Wheel.prototype.onAwake = function () {
        this.mWheel = this.owner;
        var mesh = this.mWheel.getChildByName("BackRight_0");
        mesh.meshRenderer.castShadow = true;
    };
    Wheel.prototype.onUpdate = function () {
        this.mWheel.transform.localRotationEulerX -= 12;
    };
    Wheel.prototype.Reset = function () {
        // this.mWheel.transform.localRotationEulerX = 0;
    };
    return Wheel;
}(Laya.Script));
exports.default = Wheel;
},{}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MultiplePassOutlineMaterial = /** @class */ (function (_super) {
    __extends(MultiplePassOutlineMaterial, _super);
    function MultiplePassOutlineMaterial() {
        var _this = _super.call(this) || this;
        _this.setShaderName("MultiplePassOutlineShader");
        _this._shaderValues.setNumber(MultiplePassOutlineMaterial.OUTLINEWIDTH, 0);
        _this._shaderValues.setNumber(MultiplePassOutlineMaterial.OUTLINELIGHTNESS, 1);
        _this._shaderValues.setVector(MultiplePassOutlineMaterial.OUTLINECOLOR, new Laya.Vector4(0.0, 0.0, 0.0, 0.0));
        _this._shaderValues.setNumber(MultiplePassOutlineMaterial.OffSetDir, 1);
        return _this;
    }
    /**
     * @private
     */
    MultiplePassOutlineMaterial.__init__ = function () {
    };
    Object.defineProperty(MultiplePassOutlineMaterial.prototype, "albedoTexture", {
        /**
         * 获取漫反射贴图。
         * @return 漫反射贴图。
         */
        get: function () {
            return this._shaderValues.getTexture(MultiplePassOutlineMaterial.ALBEDOTEXTURE);
        },
        /**
         * 设置漫反射贴图。
         * @param value 漫反射贴图。
         */
        set: function (value) {
            this._shaderValues.setTexture(MultiplePassOutlineMaterial.ALBEDOTEXTURE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiplePassOutlineMaterial.prototype, "outlineColor", {
        /**
         * 获取线条颜色
         * @return 线条颜色
         */
        get: function () {
            return this._shaderValues.getVector(MultiplePassOutlineMaterial.OUTLINECOLOR);
        },
        set: function (value) {
            this._shaderValues.setVector(MultiplePassOutlineMaterial.OUTLINECOLOR, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 设置偏移方向。
    * @param value 偏移方向 -1,1
    */
    MultiplePassOutlineMaterial.prototype.offsetDir = function (value) {
        value = value / Math.abs(value);
        // Laya.Tween.to(MultiplePassOutlineMaterial,{OffSetDir:value},1000);
        this._shaderValues.setNumber(MultiplePassOutlineMaterial.OffSetDir, value);
    };
    Object.defineProperty(MultiplePassOutlineMaterial.prototype, "outlineWidth", {
        /**
         * 获取轮廓宽度。
         * @return 轮廓宽度,范围为0到0.05。
         */
        get: function () {
            return this._shaderValues.getNumber(MultiplePassOutlineMaterial.OUTLINEWIDTH);
        },
        /**
         * 设置轮廓宽度。
         * @param value 轮廓宽度,范围为0到0.05。
         */
        set: function (value) {
            value = Math.max(0.0, Math.min(0.05, value));
            this._shaderValues.setNumber(MultiplePassOutlineMaterial.OUTLINEWIDTH, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiplePassOutlineMaterial.prototype, "outlineLightness", {
        /**
         * 获取轮廓亮度。
         * @return 轮廓亮度,范围为0到1。
         */
        get: function () {
            return this._shaderValues.getNumber(MultiplePassOutlineMaterial.OUTLINELIGHTNESS);
        },
        /**
         * 设置轮廓亮度。
         * @param value 轮廓亮度,范围为0到1。
         */
        set: function (value) {
            value = Math.max(0.0, Math.min(1.0, value));
            this._shaderValues.setNumber(MultiplePassOutlineMaterial.OUTLINELIGHTNESS, value);
        },
        enumerable: true,
        configurable: true
    });
    MultiplePassOutlineMaterial.initShader = function () {
        MultiplePassOutlineMaterial.__init__();
        var attributeMap = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0,
            'a_Normal': Laya.VertexMesh.MESH_NORMAL0,
            'a_Texcoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0
        };
        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
            'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE,
            'u_OutlineWidth': Laya.Shader3D.PERIOD_MATERIAL,
            'u_OutlineColor': Laya.Shader3D.PERIOD_MATERIAL,
            'u_OutlineLightness': Laya.Shader3D.PERIOD_MATERIAL,
            'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
            'u_OffSetDir': Laya.Shader3D.PERIOD_MATERIAL,
        };
        var customShader = Laya.Shader3D.add("MultiplePassOutlineShader");
        var subShader = new Laya.SubShader(attributeMap, uniformMap);
        customShader.addSubShader(subShader);
        var vs1 = "\n        attribute vec4 a_Position;\n        attribute vec3 a_Normal;\n        \n        uniform mat4 u_MvpMatrix; \n        uniform float u_OutlineWidth;\n        uniform float u_OffSetDir;\n\n        \n        void main() \n        {\n           vec4 position = vec4(a_Position.xyz + a_Normal * u_OutlineWidth, 1.0);\n           gl_Position = u_MvpMatrix * position;\n           if(gl_Position.z>=30.0){\n            gl_Position.x +=(gl_Position.z)*(gl_Position.z)/600.0;\n        }\n           \n        }";
        var ps1 = "\n        #ifdef FSHIGHPRECISION\n            precision highp float;\n        #else\n           precision mediump float;\n        #endif\n        uniform vec4 u_OutlineColor; \n        uniform float u_OutlineLightness;\n    \n        void main()\n        {\n           vec3 finalColor = u_OutlineColor.rgb * u_OutlineLightness;\n           gl_FragColor = vec4(finalColor,0.0); \n        }";
        var pass1 = subShader.addShaderPass(vs1, ps1);
        pass1.renderState.cull = Laya.RenderState.CULL_FRONT;
        var vs2 = "\n        #include \"Lighting.glsl\"\n\n        attribute vec4 a_Position; \n        attribute vec2 a_Texcoord0;\n        \n        uniform mat4 u_MvpMatrix;\n        uniform mat4 u_WorldMat;\n        uniform float u_OffSetDir;        \n        \n        attribute vec3 a_Normal; \n        varying vec3 v_Normal; \n        varying vec2 v_Texcoord0; \n        \n        void main() \n        {\n           gl_Position = u_MvpMatrix * a_Position;\n           mat3 worldMat=mat3(u_WorldMat); \n           v_Normal=worldMat*a_Normal; \n           v_Texcoord0 = a_Texcoord0;\n           if(gl_Position.z>=30.0){\n                gl_Position.x +=(gl_Position.z)*(gl_Position.z)/600.0*u_OffSetDir;\n           }\n           gl_Position=remapGLPositionZ(gl_Position); \n        }";
        var ps2 = "\n        #ifdef FSHIGHPRECISION\n            precision highp float;\n        #else\n            precision mediump float;\n        #endif\n        varying vec2 v_Texcoord0;\n        varying vec3 v_Normal;\n        \n        uniform sampler2D u_AlbedoTexture;\n        \n        \n        void main()\n        {\n           vec4 albedoTextureColor = vec4(1.0);\n           \n           albedoTextureColor = texture2D(u_AlbedoTexture, v_Texcoord0);\n           gl_FragColor=albedoTextureColor;\n        }";
        subShader.addShaderPass(vs2, ps2);
    };
    MultiplePassOutlineMaterial.ALBEDOTEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    MultiplePassOutlineMaterial.OUTLINECOLOR = Laya.Shader3D.propertyNameToID("u_OutlineColor");
    MultiplePassOutlineMaterial.OUTLINEWIDTH = Laya.Shader3D.propertyNameToID("u_OutlineWidth");
    MultiplePassOutlineMaterial.OUTLINELIGHTNESS = Laya.Shader3D.propertyNameToID("u_OutlineLightness");
    MultiplePassOutlineMaterial.OffSetDir = Laya.Shader3D.propertyNameToID("u_OffSetDir");
    return MultiplePassOutlineMaterial;
}(Laya.BaseMaterial));
exports.default = MultiplePassOutlineMaterial;
},{}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("./Event/EventMgr");
var EventDef_1 = require("./Event/EventDef");
var NativeCallback = /** @class */ (function () {
    function NativeCallback() {
    }
    // private static bridge: Laya.IPlatformClass = null;
    NativeCallback.onVideoFail = function () {
        NativeCallback.ShowLog("onVideoFail --------- ------------ ");
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.RewardVideoFail);
        Laya.SoundManager.muted = false;
    };
    NativeCallback.onVideoSuccess = function (reward) {
        NativeCallback.ShowLog("onVideoSuccess    --------- ------------ ");
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.RewardVideoSuccess, reward);
        Laya.SoundManager.muted = false;
    };
    NativeCallback.onInsertVideoEnd = function () {
        NativeCallback.ShowLog("onInsertVideoEnd    --------- ------------ ");
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.InsertVideoEnd);
        Laya.SoundManager.muted = false;
    };
    //进入后台
    NativeCallback.onPause = function () {
        Laya.SoundManager.muted = true;
        NativeCallback.ShowLog("进入后台 静音");
    };
    //恢复
    NativeCallback.onResume = function () {
        Laya.SoundManager.muted = false;
        NativeCallback.ShowLog("恢复---------");
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
        if (window['conch']) {
            if (Laya.Browser.onAndroid) {
                var bridge = window["PlatformClass"].createClass("demo.JSBridge");
                bridge.call(funcName);
            }
            else if (Laya.Browser.onIOS) {
            }
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
},{"./Event/EventDef":9,"./Event/EventMgr":10}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("./aes.js");
var Aes_wcjtn_Tools = /** @class */ (function () {
    function Aes_wcjtn_Tools() {
    }
    //加密
    Aes_wcjtn_Tools.en_wcjtn_crypt = function (str) {
        var key = CryptoJS.enc.Utf8.parse(Aes_wcjtn_Tools._wcjtn_KEY_wcjtn_); // 秘钥
        var iv = CryptoJS.enc.Utf8.parse(Aes_wcjtn_Tools._wcjtn_IV_wcjtn_); //向量iv
        var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    };
    //解密
    Aes_wcjtn_Tools.de_wcjtn_crypt = function (str) {
        var key = CryptoJS.enc.Utf8.parse(Aes_wcjtn_Tools._wcjtn_KEY_wcjtn_); // 秘钥
        var iv = CryptoJS.enc.Utf8.parse(Aes_wcjtn_Tools._wcjtn_IV_wcjtn_); //向量iv
        var decrypted = CryptoJS.AES.decrypt(str, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        return decrypted.toString(CryptoJS.enc.Utf8);
    };
    Aes_wcjtn_Tools._wcjtn_KEY_wcjtn_ = 'b#63fFJ6AvkK3YT*';
    Aes_wcjtn_Tools._wcjtn_IV_wcjtn_ = 'J$f4DU%sNL73M&Go';
    return Aes_wcjtn_Tools;
}());
exports.default = Aes_wcjtn_Tools;
},{"./aes.js":72}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetConfig_1 = require("./NetConfig");
var User_1 = require("../User/User");
var AesTools_1 = require("./AesTools");
var AppConfig_1 = require("../AppConfig");
var request_wcjtn_Data = /** @class */ (function () {
    function request_wcjtn_Data() {
        this.meth_wcjtn_ = "post";
        this.url_wcjtn_ = "";
        this.on_wcjtn_Success = null;
        this.on_wcjtn_Fail = null;
        this._wcjtn_data_wcjtn_ = {};
    }
    return request_wcjtn_Data;
}());
exports.request_wcjtn_Data = request_wcjtn_Data;
var Http_wcjtn_Unit = /** @class */ (function () {
    function Http_wcjtn_Unit() {
    }
    Http_wcjtn_Unit.request_wcjtn_ = function (req) {
        if (req.url_wcjtn_.indexOf("https://") > -1 ||
            req.url_wcjtn_.indexOf("http://") > -1) {
            req.url_wcjtn_ = req.url_wcjtn_;
        }
        else {
            req.url_wcjtn_ = NetConfig_1.default.server_wcjtn_Url + req.url_wcjtn_;
        }
        var completeFunc = function (res) {
            console.log(res, "http Success");
            if (req.on_wcjtn_Success) {
                req.on_wcjtn_Success(res);
            }
            req.on_wcjtn_Success = null;
            req = null;
        };
        var errorFunc = function (res) {
            console.log(res, "http fail");
            if (req.on_wcjtn_Fail) {
                req.on_wcjtn_Fail(res);
            }
            req.on_wcjtn_Fail = null;
            req = null;
        };
        var xhr = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, Http_wcjtn_Unit, completeFunc);
        xhr.once(Laya.Event.ERROR, Http_wcjtn_Unit, errorFunc);
        var dataStr = JSON.stringify(req._wcjtn_data_wcjtn_);
        if (Laya.Browser.onMiniGame || AppConfig_1.default.onTTMiniGame) {
            req._wcjtn_data_wcjtn_.code = User_1.default.code_wcjtn_;
        }
        else if (Laya.Browser.onQGMiniGame) //OPPO小游戏
         {
            req._wcjtn_data_wcjtn_.oppotoken = User_1.default.code_wcjtn_;
        }
        else if (Laya.Browser.onQQMiniGame) //qq小游戏
         {
            req._wcjtn_data_wcjtn_.code = User_1.default.code_wcjtn_;
        }
        else {
            req._wcjtn_data_wcjtn_.code = User_1.default.code_wcjtn_;
        }
        var time = "time=" + String(Date.now());
        var header = [
            "Content-Type", "application/json",
            "state", NetConfig_1.default.state_wcjtn_,
            "gameid", NetConfig_1.default.game_wcjtn_id,
            "sign", AesTools_1.default.en_wcjtn_crypt(time),
        ];
        if (User_1.default._wcjtn_token) {
            header.push("token");
            header.push(User_1.default._wcjtn_token);
        }
        xhr.send(req.url_wcjtn_, JSON.stringify(req._wcjtn_data_wcjtn_), req.meth_wcjtn_, "json", header);
    };
    //todo:这里添加你们和服务器相互的接口
    Http_wcjtn_Unit.login_wcjtn_ = function (onSuccess, onFail) {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = NetConfig_1.default.Login_wcjtn_;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        Http_wcjtn_Unit.request_wcjtn_(req);
    };
    Http_wcjtn_Unit.save_wcjtn_Game_wcjtn_Data = function (gameData, onSuccess, onFail) {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = NetConfig_1.default.Save_wcjtn_Game_wcjtn_Data;
        req._wcjtn_data_wcjtn_.gameData = gameData;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        Http_wcjtn_Unit.request_wcjtn_(req);
    };
    Http_wcjtn_Unit.get_wcjtn_Game_wcjtn_Data = function (onSuccess, onFail) {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = NetConfig_1.default.Get_wcjtn_User;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        Http_wcjtn_Unit.request_wcjtn_(req);
    };
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    Http_wcjtn_Unit.Get_wcjtn_Ip_wcjtn_Block = function (onSuccess, onFail) {
        if (-1 != NetConfig_1.default.game_wcjtn_id) {
            var req = new request_wcjtn_Data();
            req.url_wcjtn_ = NetConfig_1.default.Ip_wcjtn_Block;
            req.on_wcjtn_Success = onSuccess;
            req.on_wcjtn_Fail = onFail;
            Http_wcjtn_Unit.request_wcjtn_(req);
        }
    };
    Http_wcjtn_Unit.report_wcjtn_Export = function (appid, game_name, onSuccess, onFail) {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = NetConfig_1.default.report_wcjtn_Export;
        req._wcjtn_data_wcjtn_.wbappid = appid;
        req._wcjtn_data_wcjtn_.game_name = game_name;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        Http_wcjtn_Unit.request_wcjtn_(req);
    };
    Http_wcjtn_Unit.report_wcjtn_Import = function (appid, channel, onSuccess, onFail) {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = NetConfig_1.default.report_wcjtn_Import;
        req._wcjtn_data_wcjtn_.wbappid = appid;
        req._wcjtn_data_wcjtn_.channel = channel;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        Http_wcjtn_Unit.request_wcjtn_(req);
    };
    Http_wcjtn_Unit.Get_wcjtn_user_wcjtn_ip = function (onSuccess, onFail) {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = NetConfig_1.default.get_wcjtn_user_wcjtn_ip;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        Http_wcjtn_Unit.request_wcjtn_(req);
    };
    //签到
    Http_wcjtn_Unit.SignIn = function (onSuccess, onFail) {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = NetConfig_1.default.signin;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        req._wcjtn_data_wcjtn_.type = 1;
        Http_wcjtn_Unit.request_wcjtn_(req);
    };
    //获取签到状态
    Http_wcjtn_Unit.GetSignIn = function (onSuccess, onFail) {
        var req = new request_wcjtn_Data();
        req.url_wcjtn_ = NetConfig_1.default.signin;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        req._wcjtn_data_wcjtn_.type = 0;
        Http_wcjtn_Unit.request_wcjtn_(req);
    };
    return Http_wcjtn_Unit;
}());
exports.default = Http_wcjtn_Unit;
},{"../AppConfig":2,"../User/User":80,"./AesTools":69,"./NetConfig":71}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Net_wcjtn_Config = /** @class */ (function () {
    function Net_wcjtn_Config() {
    }
    Net_wcjtn_Config.state_wcjtn_ = 0;
    Net_wcjtn_Config.game_wcjtn_id = 105;
    Net_wcjtn_Config.server_wcjtn_Url = "";
    Net_wcjtn_Config.Login_wcjtn_ = "";
    Net_wcjtn_Config.Save_wcjtn_Game_wcjtn_Data = "";
    Net_wcjtn_Config.Get_wcjtn_User = "";
    /* 用来对IP地址进行屏蔽的接口地址，可以使用接口的返回值让某些广告逻辑在微信的审核地区(广州)发生变化 */
    Net_wcjtn_Config.Ip_wcjtn_Block = "";
    Net_wcjtn_Config.report_wcjtn_Export = "";
    Net_wcjtn_Config.report_wcjtn_Import = "";
    Net_wcjtn_Config.get_wcjtn_user_wcjtn_ip = "";
    Net_wcjtn_Config.signin = "";
    return Net_wcjtn_Config;
}());
exports.default = Net_wcjtn_Config;
},{}],72:[function(require,module,exports){
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
},{}],73:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("./AppConfig");
var HttpUnit_1 = require("./Net/HttpUnit");
var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
var ViewMgr_1 = require("./Mgr/ViewMgr");
var OPPO_wcjtn_API = /** @class */ (function () {
    function OPPO_wcjtn_API() {
    }
    Object.defineProperty(OPPO_wcjtn_API, "Banner_wcjtn_Instance", {
        get: function () {
            return OPPO_wcjtn_API._banner_wcjtn_;
        },
        enumerable: true,
        configurable: true
    });
    OPPO_wcjtn_API._wcjtn_Login_wcjtn_ = function (onSuccess, onFail) {
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
    OPPO_wcjtn_API.init_wcjtn_AdService = function (onSuccess, onFail, onComplete) {
        Laya.Browser.window["qg"].initAdService({
            appId: AppConfig_1.default.App_wcjtn_ID,
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
    OPPO_wcjtn_API.show_wcjtn_Reward_wcjtn_edVideoAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQGMiniGame) {
            var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: OPPO_wcjtn_API.ad_wcjtn_UnitId,
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
    OPPO_wcjtn_API.navigate_wcjtn_To_wcjtn_MiniProgram = function (pkgName, gameName, path, onSuccess, onFail, onComplate) {
        if (Laya.Browser.onQGMiniGame) {
            console.log("OPPO 跳转游戏： " + pkgName);
            HttpUnit_1.default.report_wcjtn_Export(pkgName, gameName, function (result) {
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
                    from: AppConfig_1.default.App_wcjtn_ID
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
    OPPO_wcjtn_API.show_wcjtn_Interstitial_wcjtn_Ad = function (onAdClose, onFailed) {
        if (Laya.Browser.onQGMiniGame) {
            var insertAd = qg.createInsertAd({
                posId: OPPO_wcjtn_API.Ins_wcjtn_AdUnitId
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
    OPPO_wcjtn_API.show_wcjtn_Bannaer = function () {
        if (OPPO_wcjtn_API._banner_wcjtn_) {
            OPPO_wcjtn_API._banner_wcjtn_.show();
            return;
        }
        var bannerAd = qg.createBannerAd({
            posId: OPPO_wcjtn_API.banner_wcjtn_AdUnitId
        });
        bannerAd.show();
        OPPO_wcjtn_API._banner_wcjtn_ = bannerAd;
    };
    OPPO_wcjtn_API.hide_wcjtn_Banner = function () {
        if (OPPO_wcjtn_API._banner_wcjtn_) {
            OPPO_wcjtn_API._banner_wcjtn_.hide();
        }
    };
    OPPO_wcjtn_API.destroyBanner = function () {
        if (OPPO_wcjtn_API._banner_wcjtn_) {
            OPPO_wcjtn_API._banner_wcjtn_.destroy();
        }
        OPPO_wcjtn_API._banner_wcjtn_ = null;
    };
    OPPO_wcjtn_API.get_wcjtn_LaunchOpt_wcjtn_ionsSync = function () {
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
    OPPO_wcjtn_API._wcjtn_share_wcjtn_ = function (complate, titel, imageUrl) {
        complate(false);
    };
    OPPO_wcjtn_API.create_wcjtn_DesktopIcon = function (onSuccess, onFail) {
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
    OPPO_wcjtn_API.auto_wcjtn_Pop_wcjtn_Create_wcjtn_DestopIcon = function (onSuccess, onFail) {
        if (!Laya.Browser.onQGMiniGame) {
            if (null != onFail) {
                onFail();
            }
            return;
        }
        var rate = Math.floor(Math.random() * 100);
        if (rate <= AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().oppo_wcjtn_cfg.add_wcjtn_To_wcjtn_Desktop) {
            OPPO_wcjtn_API.create_wcjtn_DesktopIcon(onSuccess, onFail);
        }
        else {
            if (null != onFail) {
                onFail();
            }
        }
    };
    //显示OPPO原生界面
    OPPO_wcjtn_API.show_wcjtn_NativeAd = function (onSuccess, onFail) {
        if (!Laya.Browser.onQGMiniGame) {
            if (null != onFail) {
                onFail();
            }
            return;
        }
        if (1 == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().oppo_wcjtn_cfg.yuan_wcjtn_sheng_wcjtn_Switch) {
            ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.OPPONativeView, null, function (v) {
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
    OPPO_wcjtn_API.ad_wcjtn_UnitId = "";
    OPPO_wcjtn_API.banner_wcjtn_AdUnitId = "";
    OPPO_wcjtn_API.Ins_wcjtn_AdUnitId = "";
    OPPO_wcjtn_API.Open_wcjtn_Screen_wcjtn_AdUnitId = "";
    OPPO_wcjtn_API.Native_wcjtn_AdId = "";
    OPPO_wcjtn_API._banner_wcjtn_ = null;
    return OPPO_wcjtn_API;
}());
exports.default = OPPO_wcjtn_API;
},{"./AppConfig":2,"./Config/AppSwitchConfig":6,"./Mgr/ViewMgr":34,"./Net/HttpUnit":70}],74:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("./Mgr/ViewMgr");
var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
var WudianMgr_1 = require("./Mgr/WudianMgr");
var AppConfig_1 = require("./AppConfig");
var QQ_wcjtn_Mini_wcjtn_GameAPI = /** @class */ (function () {
    function QQ_wcjtn_Mini_wcjtn_GameAPI() {
    }
    QQ_wcjtn_Mini_wcjtn_GameAPI._wcjtn_Login_wcjtn_ = function (onSuccess, onFail) {
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
    QQ_wcjtn_Mini_wcjtn_GameAPI.onRewarded_wcjtn_VideoAd_wcjtn_Load = function () {
        console.log('激励视频 广告加载完成');
    };
    QQ_wcjtn_Mini_wcjtn_GameAPI.onRewarded_wcjtn_VideoAd_wcjtn_Error = function (err) {
        console.log('激励视频 广告加载失败' + err);
        if (QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Failed) {
            QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Failed();
        }
    };
    QQ_wcjtn_Mini_wcjtn_GameAPI.onRewarded_wcjtn_Video_wcjtn_AdClose = function (res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看');
            if (QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Close) {
                QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Close(true);
            }
        }
        else {
            console.log('激励视频 未完整观看');
            if (QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Close) {
                QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Close(false);
            }
        }
    };
    QQ_wcjtn_Mini_wcjtn_GameAPI.reg_wcjtn_Rewarded_wcjtn_Video_wcjtn_AdEvent = function (rewardedVideoAd) {
        rewardedVideoAd.onLoad(QQ_wcjtn_Mini_wcjtn_GameAPI.onRewarded_wcjtn_VideoAd_wcjtn_Load);
        rewardedVideoAd.onError(QQ_wcjtn_Mini_wcjtn_GameAPI.onRewarded_wcjtn_VideoAd_wcjtn_Error);
        rewardedVideoAd.onClose(QQ_wcjtn_Mini_wcjtn_GameAPI.onRewarded_wcjtn_Video_wcjtn_AdClose);
        QQ_wcjtn_Mini_wcjtn_GameAPI._isReg_wcjtn_Rewarded_wcjtn_VideoAdEvent = true;
    };
    QQ_wcjtn_Mini_wcjtn_GameAPI.show_wcjtn_Rewarded_wcjtn_VideoAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQQMiniGame) {
            QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Close = onAdClose;
            QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Failed = onFailed;
            var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd({
                adUnitId: QQ_wcjtn_Mini_wcjtn_GameAPI.ad_wcjtn_UnitId,
            });
            if (!QQ_wcjtn_Mini_wcjtn_GameAPI._isReg_wcjtn_Rewarded_wcjtn_VideoAdEvent) {
                QQ_wcjtn_Mini_wcjtn_GameAPI.reg_wcjtn_Rewarded_wcjtn_Video_wcjtn_AdEvent(rewardedVideoAd);
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
    QQ_wcjtn_Mini_wcjtn_GameAPI.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program = function (appId, path, onSuccess, onFail, onComplate) {
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
    QQ_wcjtn_Mini_wcjtn_GameAPI.share_wcjtn_ = function (complate, titel, imageUrl) {
        var _this = this;
        if (Laya.Browser.onQQMiniGame) {
            QQ_wcjtn_Mini_wcjtn_GameAPI._onShow_wcjtn_ = function () {
                Laya.Browser.window["qq"].offShow(QQ_wcjtn_Mini_wcjtn_GameAPI._onShow_wcjtn_);
                QQ_wcjtn_Mini_wcjtn_GameAPI._onShow_wcjtn_ = null;
                var c = Date.now() - _this._last_wcjtn_Share_wcjtn_Time;
                if (complate) {
                    if (Date.now() - _this._last_wcjtn_Share_wcjtn_Time > 2000) {
                        complate(true);
                    }
                    else {
                        complate(false);
                    }
                }
            };
            Laya.Browser.window["qq"].onShow(QQ_wcjtn_Mini_wcjtn_GameAPI._onShow_wcjtn_);
            QQ_wcjtn_Mini_wcjtn_GameAPI._last_wcjtn_Share_wcjtn_Time = Date.now();
            Laya.Browser.window["qq"].shareAppMessage({
                title: titel,
                imageUrl: imageUrl
            });
        }
    };
    //----------------------------------------------------------------------
    //--------------------插屏幕广告---------------------------------------
    QQ_wcjtn_Mini_wcjtn_GameAPI.show_wcjtn_Interstitial_wcjtn_Ad = function (onAdClose, onFailed) {
        if (Laya.Browser.onQQMiniGame) {
            var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                adUnitId: QQ_wcjtn_Mini_wcjtn_GameAPI.Ins_wcjtn_AdUnitId,
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
    QQ_wcjtn_Mini_wcjtn_GameAPI.Load_wcjtn_App_wcjtn_BoxAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onQQMiniGame) {
            QQ_wcjtn_Mini_wcjtn_GameAPI.mApp_wcjtn_box_wcjtn_Ad = Laya.Browser.window["qq"].createAppBox({
                adUnitId: QQ_wcjtn_Mini_wcjtn_GameAPI.App_wcjtn_BoxId,
            });
            QQ_wcjtn_Mini_wcjtn_GameAPI.mApp_wcjtn_box_wcjtn_Ad.load().then(function () {
                console.log('盒子广告 加载完成');
            });
            QQ_wcjtn_Mini_wcjtn_GameAPI.mApp_wcjtn_box_wcjtn_Ad.onError(function (err) {
                console.log('盒子广告 加载失败' + err);
                if (onFailed) {
                    onFailed();
                }
            });
            QQ_wcjtn_Mini_wcjtn_GameAPI.on_wcjtn_BoxAd_wcjtn_Close = function () {
                console.log('盒子广告 关闭');
                if (onAdClose) {
                    onAdClose();
                }
            };
            QQ_wcjtn_Mini_wcjtn_GameAPI.mApp_wcjtn_box_wcjtn_Ad.onClose(QQ_wcjtn_Mini_wcjtn_GameAPI.on_wcjtn_BoxAd_wcjtn_Close);
        }
        else {
            onAdClose();
        }
    };
    QQ_wcjtn_Mini_wcjtn_GameAPI.show_wcjtn_App_wcjtn_BoxAd = function (onFailed, onAdClose) {
        if (this.mApp_wcjtn_box_wcjtn_Ad) {
            console.log("显示盒子广告");
            this.mApp_wcjtn_box_wcjtn_Ad.offClose(this.on_wcjtn_BoxAd_wcjtn_Close);
            this.on_wcjtn_BoxAd_wcjtn_Close = function () {
                console.log('盒子广告 关闭');
                if (onAdClose) {
                    onAdClose();
                }
            };
            this.mApp_wcjtn_box_wcjtn_Ad.onClose(this.on_wcjtn_BoxAd_wcjtn_Close);
            this.mApp_wcjtn_box_wcjtn_Ad.show().catch(function (err) {
                console.log('盒子广告 显示失败 ：' + err);
                if (onFailed) {
                    onFailed();
                }
            });
        }
        else {
            QQ_wcjtn_Mini_wcjtn_GameAPI.Load_wcjtn_App_wcjtn_BoxAd(onAdClose, onFailed);
        }
    };
    /**
     * 得到小程序启动参数的同步方法，可得到一个Object返回值，返回值具体的数据结构在下面的列表中
     * scene	number	启动小游戏的场景值
     * query	Object	启动小游戏的 query 参数
     * shareTicket	string	shareTicket，详见获取更多转发信息
     * referrerInfo	object	来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}
     * https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/qq.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync.html
     * @static
     * @returns {LaunchOptions}
     * @memberof QQ_wcjtn_Mini_wcjtn_GameAPI
     */
    QQ_wcjtn_Mini_wcjtn_GameAPI.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync = function () {
        // let result = { scene: 0, query: null, shareTicket: "", referrerInfo: null };
        if (Laya.Browser.onQQMiniGame) {
            var obj_1 = Laya.Browser.window["qq"].get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync();
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
     * @memberof QQ_wcjtn_Mini_wcjtn_GameAPI
     */
    QQ_wcjtn_Mini_wcjtn_GameAPI.Set_wcjtn_Share_wcjtn_Menu = function (titel, imageUrl, success, fail, complate) {
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
    QQ_wcjtn_Mini_wcjtn_GameAPI.showQQCreazyClick = function (data, onSuccess, onFail) {
        var launchScene = QQ_wcjtn_Mini_wcjtn_GameAPI.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
        var noEnterBySearch = true;
        var wudianSceneList = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
        for (var i = 0; i < wudianSceneList.length; ++i) {
            var wudianSceneValue = wudianSceneList[i];
            if (launchScene == wudianSceneValue) {
                noEnterBySearch = false;
            }
        }
        var ipBlocked = WudianMgr_1.default.Get_wcjtn_Ip_wcjtn_Blocked();
        var wudian = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian;
        var kuangdianBanner = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.kuang_wcjtn_dian_wcjtn_Banner;
        if (AppConfig_1.default.Versions_wcjtn_ == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.qq_wcjtn_versions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBanner) {
            ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.QQCrazyClickView, data, function () {
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
    QQ_wcjtn_Mini_wcjtn_GameAPI.showQQCreazyClick2 = function (data, onSuccess, onFail) {
        var launchScene = QQ_wcjtn_Mini_wcjtn_GameAPI.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
        var noEnterBySearch = true;
        var wudianSceneList = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
        for (var i = 0; i < wudianSceneList.length; ++i) {
            var wudianSceneValue = wudianSceneList[i];
            if (launchScene == wudianSceneValue) {
                noEnterBySearch = false;
            }
        }
        var ipBlocked = WudianMgr_1.default.Get_wcjtn_Ip_wcjtn_Blocked();
        var wudian = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian;
        var kuangdianBox = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.kuangdian_wcjtn_Box;
        if (AppConfig_1.default.Versions_wcjtn_ == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.qq_wcjtn_versions
            && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBox) {
            ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.QQCrazyClickView2, data, function () {
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
    QQ_wcjtn_Mini_wcjtn_GameAPI.ad_wcjtn_UnitId = ""; //激励视频Id
    QQ_wcjtn_Mini_wcjtn_GameAPI.banner_wcjtn_AdUnitId = ""; //banner广告Id
    QQ_wcjtn_Mini_wcjtn_GameAPI.Ins_wcjtn_AdUnitId = ""; //插屏广告Id
    QQ_wcjtn_Mini_wcjtn_GameAPI.App_wcjtn_BoxId = ""; //盒子广告Id
    //-------------------------激励视频---------------------------------
    QQ_wcjtn_Mini_wcjtn_GameAPI._isReg_wcjtn_Rewarded_wcjtn_VideoAdEvent = false;
    QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Failed = null;
    QQ_wcjtn_Mini_wcjtn_GameAPI._onRewarded_wcjtn_VideoAd_wcjtn_Close = null;
    //----------------------------------------------------------------------
    //---------------------分享----------------------------------------
    QQ_wcjtn_Mini_wcjtn_GameAPI._onShow_wcjtn_ = null;
    QQ_wcjtn_Mini_wcjtn_GameAPI._last_wcjtn_Share_wcjtn_Time = 0;
    //--------------------盒子广告---------------------------------------
    QQ_wcjtn_Mini_wcjtn_GameAPI.mApp_wcjtn_box_wcjtn_Ad = null;
    QQ_wcjtn_Mini_wcjtn_GameAPI.on_wcjtn_BoxAd_wcjtn_Close = null;
    return QQ_wcjtn_Mini_wcjtn_GameAPI;
}());
exports.default = QQ_wcjtn_Mini_wcjtn_GameAPI;
},{"./AppConfig":2,"./Config/AppSwitchConfig":6,"./Mgr/ViewMgr":34,"./Mgr/WudianMgr":36}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpUnit_1 = require("../Net/HttpUnit");
var AppConfig_1 = require("../AppConfig");
var User_1 = require("../User/User");
var Utilit_1 = require("../Utilit");
var ALD_1 = require("../ALD");
var WXAPI_1 = require("../WXAPI");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var AppSwitchConfig_1 = require("../Config/AppSwitchConfig");
var QQMiniGameAPI_1 = require("../QQMiniGameAPI");
var _wcjtn_ShareAd_wcjtn_ = /** @class */ (function () {
    function _wcjtn_ShareAd_wcjtn_() {
    }
    _wcjtn_ShareAd_wcjtn_.refresh_wcjtn_Ad = function (complate) {
        _wcjtn_ShareAd_wcjtn_.get_wcjtn_Ad_wcjtn_PosData(function (res) {
            if (1 == res.code) {
                console.log("获取分享广告数据成功");
                _wcjtn_ShareAd_wcjtn_._ad_wcjtn_Position = res.result;
                if (complate) {
                    complate(true);
                }
            }
            else {
                console.log("获取分享广告数据失败 ： " + res.msg);
                if (complate) {
                    complate(false);
                }
            }
        }, function (res) {
            console.log("获取分享广告数据失败");
            if (complate) {
                complate(false);
            }
        });
    };
    _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADVs = function (locationid, complate, useRandom, useLocalRandom, sortDatas) {
        if (!_wcjtn_ShareAd_wcjtn_.isNeed_wcjtn_ShowAd()) {
            complate(null);
            return;
        }
        useRandom = null == useRandom ? _wcjtn_ShareAd_wcjtn_.Use_wcjtn_Random_wcjtn_AdPos : useRandom;
        useLocalRandom = null == useLocalRandom ? true : useLocalRandom;
        if (useRandom) {
            locationid = _wcjtn_ShareAd_wcjtn_.get_wcjtn_Random_wcjtn_ADPosID();
        }
        var datas = _wcjtn_ShareAd_wcjtn_._adv_wcjtn_[locationid];
        if (datas) {
            if (useLocalRandom) {
                if (null == sortDatas) {
                    datas = this.sort_wcjtn_Datas(datas);
                }
                else {
                    datas = sortDatas(datas);
                }
            }
            complate(datas);
        }
        else {
            var self = _wcjtn_ShareAd_wcjtn_;
            _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADV_wcjtn_Data(locationid, function (res) {
                if (1 == res.code) {
                    _wcjtn_ShareAd_wcjtn_._adv_wcjtn_[locationid] = res.result;
                    datas = _wcjtn_ShareAd_wcjtn_._adv_wcjtn_[locationid];
                    if (datas && Utilit_1.default.is_wcjtn_Iphone()) {
                        for (var i = 0; i < datas.length; ++i) {
                            var data = datas[i];
                            for (var j = 0; j < _wcjtn_ShareAd_wcjtn_._iphone_wcjtn_Ignore_wcjtn_AppIds.length; ++j) {
                                if (data.appid == _wcjtn_ShareAd_wcjtn_._iphone_wcjtn_Ignore_wcjtn_AppIds[j]) {
                                    datas.splice(i, 1);
                                    --i;
                                    break;
                                }
                            }
                        }
                    }
                    if (datas && useLocalRandom) {
                        if (null == sortDatas) {
                            datas = self.sort_wcjtn_Datas(datas);
                        }
                        else {
                            datas = sortDatas(datas);
                        }
                    }
                    if (complate) {
                        complate(datas);
                    }
                }
                else {
                    if (complate) {
                        complate(null);
                    }
                }
            }, function (res) {
                if (complate) {
                    complate(null);
                }
            });
        }
    };
    _wcjtn_ShareAd_wcjtn_.report_wcjtn_User_wcjtn_Click = function (advid) {
        _wcjtn_ShareAd_wcjtn_.req_wcjtn_User_wcjtn_Click(advid, function (res) {
            if (1 == res.code) {
                console.log("点击广告上报成功");
            }
            else {
                console.log("点击广告上报失败");
            }
        }, function (res) {
            console.log("点击广告上报失败");
        });
    };
    _wcjtn_ShareAd_wcjtn_.get_wcjtn_Random_wcjtn_ADPosID = function () {
        return _wcjtn_ShareAd_wcjtn_.Ad_wcjtn_Locationids[Math.floor(Math.random() * _wcjtn_ShareAd_wcjtn_.Ad_wcjtn_Locationids.length)];
    };
    _wcjtn_ShareAd_wcjtn_.request_wcjtn_ = function (req) {
        if (req.url_wcjtn_.indexOf("https://") > -1 ||
            req.url_wcjtn_.indexOf("http://") > -1) {
            req.url_wcjtn_ = req.url_wcjtn_;
        }
        else {
            req.url_wcjtn_ = _wcjtn_ShareAd_wcjtn_.main_wcjtn_Url + req.url_wcjtn_;
        }
        var completeFunc = function (res) {
            console.log(res, "http Success");
            res = JSON.parse(res);
            if (req.on_wcjtn_Success) {
                req.on_wcjtn_Success(res);
            }
            req.on_wcjtn_Success = null;
            req = null;
        };
        var errorFunc = function (res) {
            console.log(res, "http fail");
            if (req.on_wcjtn_Fail) {
                req.on_wcjtn_Fail(res);
            }
            req.on_wcjtn_Fail = null;
            req = null;
        };
        var xhr = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, _wcjtn_ShareAd_wcjtn_, completeFunc);
        xhr.once(Laya.Event.ERROR, _wcjtn_ShareAd_wcjtn_, errorFunc);
        if (req.meth_wcjtn_ == "get") {
            var para = "";
            for (var _i = 0, _a = Object.keys(req._wcjtn_data_wcjtn_); _i < _a.length; _i++) {
                var key = _a[_i];
                var value = req._wcjtn_data_wcjtn_[key];
                para += key + "=" + value + "&";
            }
            req.url_wcjtn_ = req.url_wcjtn_ + "?" + para;
            var header = [
                "versions", AppConfig_1.default.Versions_wcjtn_,
            ];
            xhr.send(req.url_wcjtn_, null, req.meth_wcjtn_, null, header);
        }
        else {
            var para = "";
            for (var _b = 0, _c = Object.keys(req._wcjtn_data_wcjtn_); _b < _c.length; _b++) {
                var key = _c[_b];
                var value = req._wcjtn_data_wcjtn_[key];
                para += key + "=" + value + "&";
            }
            para += "ts=" + String(Date.now()) + "&";
            var header = [
                "Content-Type", "application/x-www-form-urlencoded",
                "versions", AppConfig_1.default.Versions_wcjtn_,
            ];
            xhr.send(req.url_wcjtn_, para, req.meth_wcjtn_, null, header);
        }
    };
    _wcjtn_ShareAd_wcjtn_.get_wcjtn_Ad_wcjtn_PosData = function (onSuccess, onFail) {
        var req = new HttpUnit_1.request_wcjtn_Data();
        req.url_wcjtn_ = _wcjtn_ShareAd_wcjtn_.get_wcjtn_AdPostion;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        req._wcjtn_data_wcjtn_.softid = AppConfig_1.default.App_wcjtn_ID;
        req.meth_wcjtn_ = "get";
        _wcjtn_ShareAd_wcjtn_.request_wcjtn_(req);
    };
    _wcjtn_ShareAd_wcjtn_.req_wcjtn_User_wcjtn_Click = function (advid, onSuccess, onFail) {
        var req = new HttpUnit_1.request_wcjtn_Data();
        req.url_wcjtn_ = _wcjtn_ShareAd_wcjtn_.user_wcjtn_Click;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        req._wcjtn_data_wcjtn_.softid = AppConfig_1.default.App_wcjtn_ID;
        req._wcjtn_data_wcjtn_.uid = User_1.default.openId_wcjtn_;
        req._wcjtn_data_wcjtn_.advid = advid;
        _wcjtn_ShareAd_wcjtn_.request_wcjtn_(req);
    };
    _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADV_wcjtn_Data = function (locationid, onSuccess, onFail) {
        var req = new HttpUnit_1.request_wcjtn_Data();
        req.url_wcjtn_ = _wcjtn_ShareAd_wcjtn_.get_wcjtn_Adv;
        req.on_wcjtn_Success = onSuccess;
        req.on_wcjtn_Fail = onFail;
        req._wcjtn_data_wcjtn_.softid = AppConfig_1.default.App_wcjtn_ID;
        req._wcjtn_data_wcjtn_.locationid = locationid;
        req._wcjtn_data_wcjtn_.preview = 0;
        _wcjtn_ShareAd_wcjtn_.request_wcjtn_(req);
    };
    /**
         * 随机跳转的方法，会从广告列表中随机得到一个AppId并且跳转,输入的参数为概率，大小在0-1之间
         * 如果概率大于1，则自动将其除以100，所以千万注意！
         *
         * @static
         * @param {number} [rate=1]
         * @memberof ShareAd
         */
    _wcjtn_ShareAd_wcjtn_.Random_wcjtn_Jump = function (rate) {
        if (rate === void 0) { rate = 1; }
        console.log("随机跳转,rate：" + rate);
        if (rate > 1) {
            rate = rate / 100;
        }
        var rd = Math.random();
        if (rd <= rate) {
            var adLocationID = _wcjtn_ShareAd_wcjtn_.LoopAd_wcjtn_LocationID;
            var Locations = [
                _wcjtn_ShareAd_wcjtn_.LoopAd_wcjtn_LocationID,
                _wcjtn_ShareAd_wcjtn_.Insert_wcjtn_AdLocationID,
                _wcjtn_ShareAd_wcjtn_.Banner_wcjtn_AdLocationID,
                _wcjtn_ShareAd_wcjtn_.AniAd_wcjtn_LocationID,
            ];
            if (_wcjtn_ShareAd_wcjtn_.Use_wcjtn_Random_wcjtn_AdPos) {
                for (var i = 0; i < _wcjtn_ShareAd_wcjtn_.Ad_wcjtn_Locationids.length; ++i) {
                    Locations.push(_wcjtn_ShareAd_wcjtn_.Ad_wcjtn_Locationids[i]);
                }
            }
            adLocationID = Locations[Math.floor(Math.random() * Locations.length)];
            var datas = _wcjtn_ShareAd_wcjtn_.get_wcjtn_ADVs(adLocationID, function (datas) {
                if (datas) {
                    var rd_1 = Math.floor(datas.length * Math.random());
                    var data_1 = datas[rd_1];
                    console.log("跳转游戏： " + data_1.title);
                    WXAPI_1.default.navigate_wcjtn_To_wcjtn_MiniProgram(data_1.appid, data_1.url, function (res) {
                        console.log("跳转成功");
                        _wcjtn_ShareAd_wcjtn_.report_wcjtn_User_wcjtn_Click(data_1.appid);
                        ALD_1.default.ald_wcjtn_Send_wcjtn_ReportAdClickSuccess(data_1);
                    }, function (res) {
                        console.log("跳转失败");
                        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            ALD_1.default.aldSend_wcjtn_ReportAd_wcjtn_ClickFail(data_1);
                        }
                    }, function (res) {
                        console.log("跳转完成");
                    });
                }
            }, true);
        }
    };
    _wcjtn_ShareAd_wcjtn_.isNeed_wcjtn_ShowAd = function () {
        if (0 == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().ad_wcjtn_Switch)
            return false;
        if (Laya.Browser.onQGMiniGame) {
            if (AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().oppo_wcjtn_cfg.oppo_wcjtn_versions != AppConfig_1.default.Versions_wcjtn_) {
                return false;
            }
        }
        var mailiang = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().mai_wcjtn_liang;
        var mailianglist = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().mailiang_wcjtn_list;
        var mailiangscenelist = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().mailiang_wcjtn_Scene_wcjtn_List;
        if (1 == mailiang) {
            var flag = null;
            var scene = null;
            if (Laya.Browser.onMiniGame) {
                flag = WXAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().query['chid'];
                scene = WXAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
            }
            else if (Laya.Browser.onQQMiniGame) {
                flag = QQMiniGameAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().query['chid'];
                scene = QQMiniGameAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
            }
            if (null != flag && null != mailianglist && mailianglist.length > 0) {
                for (var i = 0; i < mailianglist.length; ++i) {
                    if (flag == mailianglist[i]) {
                        return false;
                    }
                }
            }
            if (null != scene && null != mailiangscenelist && mailiangscenelist.length > 0) {
                for (var i = 0; i < mailiangscenelist.length; ++i) {
                    if (scene == mailiangscenelist[i]) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    _wcjtn_ShareAd_wcjtn_.sort_wcjtn_Datas = function (datas) {
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
    _wcjtn_ShareAd_wcjtn_.main_wcjtn_Url = "https://swwww.mrkzx.cn";
    _wcjtn_ShareAd_wcjtn_.get_wcjtn_AdPostion = "/v1.1/api/getAdPosition.html"; //获取广告位列表
    _wcjtn_ShareAd_wcjtn_.get_wcjtn_Adv = "/v1.1/api/getAdv.html"; //获取第三方广告列表
    _wcjtn_ShareAd_wcjtn_.user_wcjtn_Click = "/v1.1/api/userclick.html"; //用户点击上报
    _wcjtn_ShareAd_wcjtn_.LoopAd_wcjtn_LocationID = 324;
    _wcjtn_ShareAd_wcjtn_.Banner_wcjtn_AdLocationID = 327;
    _wcjtn_ShareAd_wcjtn_.Insert_wcjtn_AdLocationID = -1;
    _wcjtn_ShareAd_wcjtn_.AniAd_wcjtn_LocationID = -1;
    _wcjtn_ShareAd_wcjtn_.History_wcjtn_LocationID = 325;
    _wcjtn_ShareAd_wcjtn_.MoreGame_wcjtn_LocationID = 326;
    _wcjtn_ShareAd_wcjtn_.Use_wcjtn_Random_wcjtn_AdPos = true;
    _wcjtn_ShareAd_wcjtn_.Ad_wcjtn_Locationids = [
        326, 324
    ];
    _wcjtn_ShareAd_wcjtn_._ad_wcjtn_Position = {};
    _wcjtn_ShareAd_wcjtn_._adv_wcjtn_ = {};
    _wcjtn_ShareAd_wcjtn_._iphone_wcjtn_Ignore_wcjtn_AppIds = [
        "",
        ""
    ];
    return _wcjtn_ShareAd_wcjtn_;
}());
exports.default = _wcjtn_ShareAd_wcjtn_;
},{"../ALD":1,"../AppConfig":2,"../Config/AppSwitchConfig":6,"../Event/EventDef":9,"../Event/EventMgr":10,"../Net/HttpUnit":70,"../QQMiniGameAPI":74,"../User/User":80,"../Utilit":81,"../WXAPI":131}],76:[function(require,module,exports){
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
var Banner_wcjtn_Ad_wcjtn_View = /** @class */ (function (_super) {
    __extends(Banner_wcjtn_Ad_wcjtn_View, _super);
    function Banner_wcjtn_Ad_wcjtn_View() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Ad_wcjtn_Pos_wcjtn_ID = ShareAd_1.default.Banner_wcjtn_AdLocationID;
        _this._data_wcjtn_ = null;
        _this._wx_wcjtn_Banner = null;
        _this._onLoad = null;
        _this._onError = null;
        _this._onResize = null;
        return _this;
    }
    Banner_wcjtn_Ad_wcjtn_View.prototype.onAwake = function () {
        this._display_wcjtn_Sp = this.owner.getChildByName("Display");
        if (null == this._display_wcjtn_Sp) {
            this._display_wcjtn_Sp = this.owner;
        }
    };
    Banner_wcjtn_Ad_wcjtn_View.prototype.onEnable = function () {
        this._display_wcjtn_Sp.on(Laya.Event.CLICK, this, this.on_wcjtn_Sp_wcjtn_Click);
        var banner = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().ba_wcjtn_nner;
        if (0 == banner) {
            this.refresh_wcjtn_Banner_wcjtn_Dis();
            var bannerRecreateTime = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
            Laya.timer.loop(bannerRecreateTime * 1000, this, this.refresh_wcjtn_Banner_wcjtn_Dis);
        }
        else if (1 == banner) {
            this.refresh_wcjtn_Banner_wcjtn_Dis();
            var bannerRecreateTime = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
            Laya.timer.loop(bannerRecreateTime * 1000, this, this.refresh_wcjtn_Banner_wcjtn_Dis);
        }
    };
    Banner_wcjtn_Ad_wcjtn_View.prototype.onDisable = function () {
        this._display_wcjtn_Sp.off(Laya.Event.CLICK, this, this.on_wcjtn_Sp_wcjtn_Click);
        this.clear_wcjtn_WXBaner();
    };
    Banner_wcjtn_Ad_wcjtn_View.prototype.refresh_wcjtn_Banner_wcjtn_Dis = function () {
        var self = this;
        ShareAd_1.default.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID, function (datas) {
            if (datas && datas.length > 0) {
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._display_wcjtn_Sp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self._display_wcjtn_Sp.destroyed) {
                        self._display_wcjtn_Sp.width = 750;
                        self._display_wcjtn_Sp.height = 256;
                    }
                }));
                self._data_wcjtn_ = data;
            }
        }, false);
    };
    Banner_wcjtn_Ad_wcjtn_View.prototype.on_wcjtn_Sp_wcjtn_Click = function () {
        var data = this._data_wcjtn_;
        if (data) {
            console.log("跳转游戏： " + data.title);
            if (Laya.Browser.onMiniGame) {
                WXAPI_1.default.navigate_wcjtn_To_wcjtn_MiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.report_wcjtn_User_wcjtn_Click(data.appid);
                    ALD_1.default.ald_wcjtn_Send_wcjtn_ReportAdClickSuccess(data);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                    if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                        console.log("用户取消跳转");
                        ALD_1.default.aldSend_wcjtn_ReportAd_wcjtn_ClickFail(data);
                    }
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQGMiniGame) {
                OPPOAPI_1.default.navigate_wcjtn_To_wcjtn_MiniProgram(data.appid, data.title, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.report_wcjtn_User_wcjtn_Click(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
             {
                QQMiniGameAPI_1.default.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.report_wcjtn_User_wcjtn_Click(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
        }
    };
    Banner_wcjtn_Ad_wcjtn_View.prototype.refresh_wcjtn_WXBanner = function () {
        if ((!Laya.Browser.onMiniGame && !Laya.Browser.onQQMiniGame)
            || !this.owner.visible)
            return;
        this.clear_wcjtn_WXBaner();
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
        var pos = this._display_wcjtn_Sp.localToGlobal(new Laya.Point(0, 0));
        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WX_wcjtn_Banner_wcjtn_Width ? this.WX_wcjtn_Banner_wcjtn_Width / Laya.stage.width * sw : sw;
        if (Laya.Browser.onMiniGame) {
            var recreateBannerIDList = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().recreate_wcjtn_Banner_wcjtn_IDList;
            var bannerAdUnitId = recreateBannerIDList[Math.floor(Math.random() * recreateBannerIDList.length)];
            if (null == bannerAdUnitId) {
                bannerAdUnitId = WXAPI_1.default.banner_wcjtn_AdUnitId;
            }
            self._wx_wcjtn_Banner = Laya.Browser.window["wx"].createBannerAd({
                adUnitId: bannerAdUnitId,
                adIntervals: 30,
                style: {
                    left: left,
                    top: top,
                    width: width,
                }
            });
            self._wx_wcjtn_Banner.onLoad(function (res) {
                console.log("WXBanner广告 加载完成");
                console.log(res);
            });
            self._wx_wcjtn_Banner.onError(function (err) {
                console.log("WXBanner广告 加载失败");
                console.log(err);
                self.refresh_wcjtn_Banner_wcjtn_Dis();
                self.clear_wcjtn_WXBaner();
            });
            self._wx_wcjtn_Banner.onResize(function (res) {
            });
            self._wx_wcjtn_Banner.show();
        }
        else if (Laya.Browser.onQQMiniGame) {
            var recreateBannerIDList = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().recreate_wcjtn_Banner_wcjtn_IDList;
            var bannerAdUnitId_1 = recreateBannerIDList[Math.floor(Math.random() * recreateBannerIDList.length)];
            if (null == bannerAdUnitId_1) {
                bannerAdUnitId_1 = QQMiniGameAPI_1.default.banner_wcjtn_AdUnitId;
            }
            self._wx_wcjtn_Banner = Laya.Browser.window["qq"].createBannerAd({
                adUnitId: bannerAdUnitId_1,
                adIntervals: 30,
                style: {
                    left: left,
                    top: top,
                    width: width,
                }
            });
            if (null != self._wx_wcjtn_Banner) {
                self._onLoad = function (res) {
                    console.log("QQBanner广告 加载完成 : ", bannerAdUnitId_1);
                    console.log(res);
                    self._wx_wcjtn_Banner.show();
                };
                self._wx_wcjtn_Banner.onLoad(self._onLoad);
                self._onError = function (err) {
                    console.log("QQBanner广告 加载失败 : ", bannerAdUnitId_1);
                    console.log(err);
                    self.refresh_wcjtn_Banner_wcjtn_Dis();
                    self.clear_wcjtn_WXBaner();
                };
                self._wx_wcjtn_Banner.onError(self._onError);
                self._onResize = function (res) {
                };
                self._wx_wcjtn_Banner.onResize(self._onResize);
            }
            else {
                self.refresh_wcjtn_Banner_wcjtn_Dis();
            }
        }
    };
    Banner_wcjtn_Ad_wcjtn_View.prototype.clear_wcjtn_WXBaner = function () {
        if (this._wx_wcjtn_Banner) {
            this._wx_wcjtn_Banner.offLoad(this._onLoad);
            this._wx_wcjtn_Banner.offError(this._onError);
            this._wx_wcjtn_Banner.offResize(this._onResize);
            this._wx_wcjtn_Banner.destroy();
        }
        this._wx_wcjtn_Banner = null;
    };
    Banner_wcjtn_Ad_wcjtn_View.prototype.onViewShow = function () {
        var banner = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().ba_wcjtn_nner;
        if (1 == banner && null == this._wx_wcjtn_Banner) {
            this.refresh_wcjtn_Banner_wcjtn_Dis();
            var bannerRecreateTime = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
            Laya.timer.loop(bannerRecreateTime * 1000, this, this.refresh_wcjtn_Banner_wcjtn_Dis);
        }
        else {
            this.refresh_wcjtn_Banner_wcjtn_Dis();
            var bannerRecreateTime = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Recreate_wcjtn_Time;
            Laya.timer.loop(bannerRecreateTime * 1000, this, this.refresh_wcjtn_Banner_wcjtn_Dis);
        }
    };
    Banner_wcjtn_Ad_wcjtn_View.prototype.onViewHide = function () {
        this.clear_wcjtn_WXBaner();
        Laya.timer.clearAll(this);
    };
    Banner_wcjtn_Ad_wcjtn_View.prototype.onDestroy = function () {
        this.clear_wcjtn_WXBaner();
        Laya.timer.clearAll(this);
    };
    return Banner_wcjtn_Ad_wcjtn_View;
}(Laya.Script));
exports.default = Banner_wcjtn_Ad_wcjtn_View;
},{"../../ALD":1,"../../Config/AppSwitchConfig":6,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../OPPOAPI":73,"../../QQMiniGameAPI":74,"../../WXAPI":131,"../ShareAd":75}],77:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShareAd_1 = require("../ShareAd");
var LoopAdBox_1 = require("./LoopAdBox");
var Horizontal_wcjtn_LoopAd_wcjtn_View = /** @class */ (function (_super) {
    __extends(Horizontal_wcjtn_LoopAd_wcjtn_View, _super);
    function Horizontal_wcjtn_LoopAd_wcjtn_View() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Ad_wcjtn_Pos_wcjtn_ID = ShareAd_1.default.LoopAd_wcjtn_LocationID;
        _this._scroll_wcjtn_Forward = true;
        return _this;
    }
    Horizontal_wcjtn_LoopAd_wcjtn_View.prototype.onAwake = function () {
        this._list_wcjtn_ = this.owner.getChildByName("List");
        this._list_wcjtn_.renderHandler = Laya.Handler.create(this, this.on_wcjtn_List_wcjtn_Render, null, false);
        this._list_wcjtn_.hScrollBarSkin = "";
    };
    Horizontal_wcjtn_LoopAd_wcjtn_View.prototype.onEnable = function () {
        var _this = this;
        var self = this;
        ShareAd_1.default.get_wcjtn_ADVs(this.Ad_wcjtn_Pos_wcjtn_ID, function (datas) {
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
                    _this._list_wcjtn_.array = temp;
                }
                else {
                    _this._list_wcjtn_.array = datas;
                }
            }
        });
    };
    Horizontal_wcjtn_LoopAd_wcjtn_View.prototype.onDisable = function () {
    };
    Horizontal_wcjtn_LoopAd_wcjtn_View.prototype.onUpdate = function () {
        if (this._scroll_wcjtn_Forward) {
            this._list_wcjtn_.scrollBar.value += 100 * Laya.timer.delta / 1000;
            if (this._list_wcjtn_.scrollBar.value >= this._list_wcjtn_.scrollBar.max) {
                this._scroll_wcjtn_Forward = false;
            }
        }
        else {
            this._list_wcjtn_.scrollBar.value -= 100 * Laya.timer.delta / 1000;
            if (this._list_wcjtn_.scrollBar.value <= 0) {
                this._scroll_wcjtn_Forward = true;
            }
        }
    };
    Horizontal_wcjtn_LoopAd_wcjtn_View.prototype.on_wcjtn_List_wcjtn_Render = function (cell, index) {
        var data = this._list_wcjtn_.array[index];
        var loopAdBox = cell.getComponent(LoopAdBox_1.default);
        loopAdBox.set_wcjtn_Data(data);
    };
    return Horizontal_wcjtn_LoopAd_wcjtn_View;
}(Laya.Script));
exports.default = Horizontal_wcjtn_LoopAd_wcjtn_View;
},{"../ShareAd":75,"./LoopAdBox":78}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WXAPI_1 = require("../../WXAPI");
var ShareAd_1 = require("../ShareAd");
var ALD_1 = require("../../ALD");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var OPPOAPI_1 = require("../../OPPOAPI");
var QQMiniGameAPI_1 = require("../../QQMiniGameAPI");
var LoopAd_wcjtn_Box = /** @class */ (function (_super) {
    __extends(LoopAd_wcjtn_Box, _super);
    function LoopAd_wcjtn_Box() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data_wcjtn_ = null;
        _this._origin_wcjtn_W = 150;
        _this._origin_wcjtn_H = 150;
        _this._font_wcjtn_Size = 25;
        return _this;
    }
    LoopAd_wcjtn_Box.prototype.onAwake = function () {
        this._display_wcjtn_Sp = this.owner.getChildByName("Display");
        this._origin_wcjtn_W = this._display_wcjtn_Sp.width;
        this._origin_wcjtn_H = this._display_wcjtn_Sp.height;
        this._dis_wcjtn_Text = this.owner.getChildByName("TitelText");
        this._dis_wcjtn_Text.text = "";
        this._font_wcjtn_Size = this._dis_wcjtn_Text.fontSize;
    };
    LoopAd_wcjtn_Box.prototype.onEnable = function () {
        this._display_wcjtn_Sp.on(Laya.Event.CLICK, this, this.on_wcjtn_Sp_wcjtn_Click);
    };
    LoopAd_wcjtn_Box.prototype.onDisable = function () {
        this._display_wcjtn_Sp.off(Laya.Event.CLICK, this, this.on_wcjtn_Sp_wcjtn_Click);
    };
    LoopAd_wcjtn_Box.prototype.set_wcjtn_Data = function (data) {
        if (data) {
            var self = this;
            this._display_wcjtn_Sp.loadImage(data.logo, Laya.Handler.create(this, function () {
                if (!self._display_wcjtn_Sp.destroyed) {
                    self._display_wcjtn_Sp.width = self._origin_wcjtn_W;
                    self._display_wcjtn_Sp.height = self._origin_wcjtn_H;
                }
            }));
            var str = String(data.title);
            var num = str.length;
            num = Math.max(5, num);
            var fontSize = Math.floor((5 / num) * this._font_wcjtn_Size);
            this._dis_wcjtn_Text.fontSize = fontSize;
            this._dis_wcjtn_Text.text = str;
            this._data_wcjtn_ = data;
        }
    };
    LoopAd_wcjtn_Box.prototype.on_wcjtn_Sp_wcjtn_Click = function () {
        var data = this._data_wcjtn_;
        if (data) {
            console.log("跳转游戏： " + data.title);
            if (Laya.Browser.onMiniGame) {
                WXAPI_1.default.navigate_wcjtn_To_wcjtn_MiniProgram(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.report_wcjtn_User_wcjtn_Click(data.appid);
                    ALD_1.default.ald_wcjtn_Send_wcjtn_ReportAdClickSuccess(data);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                    if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                        console.log("用户取消跳转");
                        ALD_1.default.aldSend_wcjtn_ReportAd_wcjtn_ClickFail(data);
                    }
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQGMiniGame) {
                OPPOAPI_1.default.navigate_wcjtn_To_wcjtn_MiniProgram(data.appid, data.title, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.report_wcjtn_User_wcjtn_Click(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
            else if (Laya.Browser.onQQMiniGame) //qq小游戏
             {
                QQMiniGameAPI_1.default.navigate_wcjtn_To_wcjtn_Mini_wcjtn_Program(data.appid, data.url, function (res) {
                    console.log("跳转成功");
                    ShareAd_1.default.report_wcjtn_User_wcjtn_Click(data.appid);
                }, function (res) {
                    console.log("跳转失败");
                    EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_On_wcjtn_ShareAd_wcjtn_Fail);
                }, function (res) {
                    console.log("跳转完成");
                });
            }
        }
    };
    return LoopAd_wcjtn_Box;
}(Laya.Script));
exports.default = LoopAd_wcjtn_Box;
},{"../../ALD":1,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../OPPOAPI":73,"../../QQMiniGameAPI":74,"../../WXAPI":131,"../ShareAd":75}],79:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("./AppConfig");
var ViewMgr_1 = require("./Mgr/ViewMgr");
var HttpUnit_1 = require("./Net/HttpUnit");
var TT_wcjtn_API = /** @class */ (function () {
    function TT_wcjtn_API() {
    }
    TT_wcjtn_API._wcjtn_ttLogin_wcjtn_ = function (onSuccess, onFail) {
        if (AppConfig_1.default.onTTMiniGame && null != Laya.Browser.window["tt"]) {
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
            TT_wcjtn_API.init_wcjtn_Record();
        }
    };
    TT_wcjtn_API.on_wcjtn_Rewarded_wcjtn_Video_wcjtn_AdLoad = function () {
        console.log('激励视频 广告加载完成');
    };
    TT_wcjtn_API.on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Error = function (err) {
        console.log('激励视频 广告加载失败' + err);
        if (TT_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Failed) {
            TT_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Failed();
        }
    };
    TT_wcjtn_API.on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close = function (res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看');
            if (TT_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close) {
                TT_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close(true);
            }
        }
        else {
            console.log('激励视频 未完整观看');
            if (TT_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close) {
                TT_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close(false);
            }
        }
    };
    TT_wcjtn_API.reg_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Event = function (rewardedVideoAd) {
        rewardedVideoAd.onLoad(TT_wcjtn_API.on_wcjtn_Rewarded_wcjtn_Video_wcjtn_AdLoad);
        rewardedVideoAd.onError(TT_wcjtn_API.on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Error);
        rewardedVideoAd.onClose(TT_wcjtn_API.on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close);
        TT_wcjtn_API._isReg_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Event = true;
    };
    TT_wcjtn_API.show_wcjtn_Rewarded_wcjtn_VideoAd = function (onAdClose, onFailed) {
        if (AppConfig_1.default.onTTMiniGame && null != Laya.Browser.window["tt"]) {
            TT_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close = onAdClose;
            TT_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Failed = onFailed;
            var rewardedVideoAd = Laya.Browser.window["tt"].createRewardedVideoAd({
                adUnitId: TT_wcjtn_API.ad_wcjtn_UnitId,
            });
            if (!TT_wcjtn_API._isReg_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Event) {
                TT_wcjtn_API.reg_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Event(rewardedVideoAd);
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
    TT_wcjtn_API.init_wcjtn_Record = function () {
        TT_wcjtn_API.record_wcjtn_ = Laya.Browser.window["tt"].getGameRecorderManager();
        if (TT_wcjtn_API.record_wcjtn_ != null) {
            TT_wcjtn_API.record_wcjtn_.onStart(function (res) {
                console.log("录屏开始");
                TT_wcjtn_API.record_wcjtn_Res = "";
            });
            TT_wcjtn_API.record_wcjtn_.onStop(function (res) {
                console.log("录屏结束");
                TT_wcjtn_API.record_wcjtn_Res = res.videoPath;
            });
        }
    };
    /**
     * 开始录屏
     */
    TT_wcjtn_API.start_wcjtn_Record = function (duration) {
        if (duration === void 0) { duration = 300; }
        if (!AppConfig_1.default.onTTMiniGame)
            return;
        TT_wcjtn_API.record_wcjtn_.start({
            duration: duration
        });
    };
    /**
    * 停止录屏
    */
    TT_wcjtn_API.stop_wcjtn_Record = function () {
        if (!AppConfig_1.default.onTTMiniGame)
            return;
        TT_wcjtn_API.record_wcjtn_.stop();
    };
    //----------------------------------------------------------------------
    //---------------------分享录屏----------------------------------------
    TT_wcjtn_API.share_wcjtn_Record = function (callback, Failcallback) {
        if (callback === void 0) { callback = null; }
        if (Failcallback === void 0) { Failcallback = null; }
        if (!AppConfig_1.default.onTTMiniGame)
            return;
        if (TT_wcjtn_API.record_wcjtn_Res != "") {
            window["tt"].shareAppMessage({
                channel: "video",
                extra: {
                    videoPath: TT_wcjtn_API.record_wcjtn_Res,
                    videoTopics: [AppConfig_1.default.Game_wcjtn_Name]
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
    TT_wcjtn_API.share_wcjtn_ = function (complate) {
        if (complate === void 0) { complate = null; }
        if (!AppConfig_1.default.onTTMiniGame && null == Laya.Browser.window["tt"])
            return;
        window["tt"].shareAppMessage({
            templateId: TT_wcjtn_API._templateId_wcjtn_,
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
    TT_wcjtn_API.show_wcjtn_Banner = function () {
        if (!AppConfig_1.default.onTTMiniGame || null == Laya.Browser.window["tt"] || TT_wcjtn_API.banner_wcjtn_AdUnitId.length <= 0)
            return;
        if (!TT_wcjtn_API._banner_wcjtn_) {
            var _a = Laya.Browser.window["tt"].getSystemInfoSync(), windowWidth_1 = _a.windowWidth, windowHeight_1 = _a.windowHeight;
            var targetBannerAdWidth = 150;
            // 创建一个居于屏幕底部正中的广告
            TT_wcjtn_API._banner_wcjtn_ = Laya.Browser.window["tt"].createBannerAd({
                adUnitId: TT_wcjtn_API.banner_wcjtn_AdUnitId,
                adIntervals: 30,
                style: {
                    width: targetBannerAdWidth,
                    top: windowHeight_1 - (targetBannerAdWidth / 16) * 9,
                }
            });
            TT_wcjtn_API._banner_wcjtn_.onResize(function (size) {
                console.log(size.width, size.height);
                TT_wcjtn_API._banner_wcjtn_.style.top = windowHeight_1 - size.height;
                TT_wcjtn_API._banner_wcjtn_.style.left = (windowWidth_1 - size.width) / 2;
            });
            TT_wcjtn_API._banner_wcjtn_.show();
        }
    };
    TT_wcjtn_API.hideBanner = function () {
        if (null != TT_wcjtn_API._banner_wcjtn_) {
            TT_wcjtn_API._banner_wcjtn_.hide();
        }
    };
    TT_wcjtn_API.showMoreGamesModal = function (onSuccess, onFail) {
        var systemInfo = Laya.Browser.window["tt"].getSystemInfoSync();
        // iOS 不支持，建议先检测再使用
        if (systemInfo.platform !== "ios") {
            // 打开互跳弹窗
            Laya.Browser.window["tt"].showMoreGamesModal({
                appLaunchOptions: [
                    {
                        appId: AppConfig_1.default.App_wcjtn_ID,
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
    TT_wcjtn_API.autoOpenSignInView = function (complate) {
        HttpUnit_1.default.GetSignIn(function (res) {
            var isSign = res.data.is_sign;
            var signDays = res.data.sign_day_num;
            if (isSign == 0) {
                ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.TTSignInView, null, function () {
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
    TT_wcjtn_API.ad_wcjtn_UnitId = "";
    TT_wcjtn_API.banner_wcjtn_AdUnitId = "";
    TT_wcjtn_API.Ins_wcjtn_AdUnitId = "";
    TT_wcjtn_API._templateId_wcjtn_ = ""; //分享素材id
    TT_wcjtn_API.record_wcjtn_Res = "";
    TT_wcjtn_API._banner_wcjtn_ = null;
    //-------------------------激励视频---------------------------------
    TT_wcjtn_API._isReg_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Event = false;
    TT_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Failed = null;
    TT_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close = null;
    return TT_wcjtn_API;
}());
exports.default = TT_wcjtn_API;
},{"./AppConfig":2,"./Mgr/ViewMgr":34,"./Net/HttpUnit":70}],80:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var CarConfig_1 = require("../MyScripts/Model/CarConfig");
var GameManager_1 = require("../MyScripts/Manager/GameManager");
//游戏数据,为保持版本兼容，建议不要删除和修改字段名
var User_wcjtn_Game_wcjtn_Data = /** @class */ (function () {
    function User_wcjtn_Game_wcjtn_Data() {
        this.levelNum = 1; //当前关卡
        this.moneyNum = 0; //金币数量
        this.crystalNum = 0; //钻石数量  
        this.carID = 0; //玩家车辆ID
        this.carLists = [0]; //玩家拥有车辆ID  
        this.overRecord = 1; //玩家超车记录
        this.unlockedItem = []; //道具当前解锁的索引
        this.usedItem = -1; //当前使用的道具索引
    }
    return User_wcjtn_Game_wcjtn_Data;
}());
exports.User_wcjtn_Game_wcjtn_Data = User_wcjtn_Game_wcjtn_Data;
var User_wcjtn_ = /** @class */ (function (_super) {
    __extends(User_wcjtn_, _super);
    function User_wcjtn_() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(User_wcjtn_, "is_wcjtn_Login", {
        get: function () {
            return (User_wcjtn_.code_wcjtn_ != "") || (User_wcjtn_._wcjtn_token != "");
        },
        enumerable: true,
        configurable: true
    });
    User_wcjtn_.get_wcjtn_Save_wcjtn_Data = function () {
        return JSON.stringify(User_wcjtn_._game_wcjtn_Data);
    };
    User_wcjtn_.test_wcjtn_InitUser = function () {
        // User_wcjtn_._game_wcjtn_Data.levelNum = 1;
        // User_wcjtn_._game_wcjtn_Data.moneyNum = 0;
        // User_wcjtn_._game_wcjtn_Data.crystalNum = 0;
        // User_wcjtn_._game_wcjtn_Data.carID = 0;
        // User_wcjtn_._game_wcjtn_Data.carLists = [0];
        // User_wcjtn_._game_wcjtn_Data.overRecord = 1;
        var storageStr = localStorage.getItem("Game_wcjtn_Data");
        console.log("读取存储数据 str----" + storageStr);
        var data = JSON.parse(storageStr);
        if (data == null) {
            User_wcjtn_._game_wcjtn_Data.levelNum = 1;
            User_wcjtn_._game_wcjtn_Data.moneyNum = 0;
            User_wcjtn_._game_wcjtn_Data.crystalNum = 0;
            User_wcjtn_._game_wcjtn_Data.carID = 0;
            User_wcjtn_._game_wcjtn_Data.carLists = [0];
            User_wcjtn_._game_wcjtn_Data.overRecord = 1;
            User_wcjtn_._game_wcjtn_Data.usedItem = -1;
            return;
        }
        User_wcjtn_._game_wcjtn_Data.levelNum = data.levelNum;
        User_wcjtn_._game_wcjtn_Data.moneyNum = data.moneyNum;
        User_wcjtn_._game_wcjtn_Data.crystalNum = data.crystalNum;
        User_wcjtn_._game_wcjtn_Data.carID = data.carID;
        User_wcjtn_._game_wcjtn_Data.carLists = data.carLists;
        User_wcjtn_._game_wcjtn_Data.overRecord = data.overRecord;
        User_wcjtn_._game_wcjtn_Data.usedItem = data.usedItem;
        if (User_wcjtn_._game_wcjtn_Data.overRecord == null) {
            User_wcjtn_._game_wcjtn_Data.overRecord = 0;
        }
        else {
            var unlockedItem = data.unlockedItem;
            if (null != unlockedItem) {
                for (var i = 0; i < unlockedItem.length; ++i) {
                    User_wcjtn_._game_wcjtn_Data.unlockedItem.push(unlockedItem[i]);
                }
            }
        }
    };
    User_wcjtn_.initi_wcjtn_User = function (data) {
        if (data && 0 != data) {
            User_wcjtn_._game_wcjtn_Data.levelNum = data.levelNum;
            User_wcjtn_._game_wcjtn_Data.moneyNum = data.moneyNum;
            User_wcjtn_._game_wcjtn_Data.crystalNum = data.crystalNum;
            User_wcjtn_._game_wcjtn_Data.carID = data.carID;
            User_wcjtn_._game_wcjtn_Data.carLists = data.carLists;
            if (User_wcjtn_._game_wcjtn_Data.overRecord == null) {
                User_wcjtn_._game_wcjtn_Data.overRecord = 0;
            }
            else {
                User_wcjtn_._game_wcjtn_Data.overRecord = data.overRecord;
                if (null != data.unlockedItem) {
                    var unlockedItem = data.unlockedItem;
                    for (var i = 0; i < unlockedItem.length; ++i) {
                        User_wcjtn_._game_wcjtn_Data.unlockedItem.push(unlockedItem[i]);
                    }
                }
                if (null != data.usedItem) {
                    User_wcjtn_._game_wcjtn_Data.usedItem = data.usedItem;
                }
            }
        }
    };
    User_wcjtn_.set_wcjtn_LeveNum = function (levelNum) {
        User_wcjtn_._game_wcjtn_Data.levelNum = levelNum;
    };
    User_wcjtn_.get_wcjtn_LeveNum = function () {
        return User_wcjtn_._game_wcjtn_Data.levelNum;
    };
    User_wcjtn_.add_wcjtn_Money = function (add) {
        add = Math.ceil(add);
        var last = User_wcjtn_._game_wcjtn_Data.moneyNum;
        User_wcjtn_._game_wcjtn_Data.moneyNum += add;
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change, {
            curr: User_wcjtn_._game_wcjtn_Data.moneyNum,
            last: last
        });
    };
    User_wcjtn_.sub_wcjtn_Money = function (sub) {
        sub = Math.ceil(sub);
        var last = User_wcjtn_._game_wcjtn_Data.moneyNum;
        User_wcjtn_._game_wcjtn_Data.moneyNum -= sub;
        if (User_wcjtn_._game_wcjtn_Data.moneyNum < 0) {
            User_wcjtn_._game_wcjtn_Data.moneyNum = 0;
        }
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change, {
            curr: User_wcjtn_._game_wcjtn_Data.moneyNum,
            last: last
        });
    };
    User_wcjtn_.get_wcjtn_Money = function () {
        return User_wcjtn_._game_wcjtn_Data.moneyNum;
    };
    User_wcjtn_.add_wcjtn_Crystal = function (add) {
        add = Math.ceil(add);
        var last = User_wcjtn_._game_wcjtn_Data.crystalNum;
        User_wcjtn_._game_wcjtn_Data.crystalNum += add;
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Crystal_wcjtn_Change, {
            curr: User_wcjtn_._game_wcjtn_Data.crystalNum,
            last: last
        });
    };
    User_wcjtn_.sub_wcjtn_Crystal = function (sub) {
        sub = Math.ceil(sub);
        var last = User_wcjtn_._game_wcjtn_Data.crystalNum;
        User_wcjtn_._game_wcjtn_Data.crystalNum -= sub;
        if (User_wcjtn_._game_wcjtn_Data.crystalNum < 0) {
            User_wcjtn_._game_wcjtn_Data.crystalNum = 0;
        }
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Crystal_wcjtn_Change, {
            curr: User_wcjtn_._game_wcjtn_Data.crystalNum,
            last: last
        });
    };
    User_wcjtn_.get_wcjtn_Crystal = function () {
        return User_wcjtn_._game_wcjtn_Data.crystalNum;
    };
    User_wcjtn_.getCarID = function () {
        return User_wcjtn_._game_wcjtn_Data.carID;
    };
    User_wcjtn_.setCarID = function (id) {
        User_wcjtn_._game_wcjtn_Data.carID = id;
    };
    User_wcjtn_.hadCarByID = function (id) {
        var had = false;
        for (var i = 0; i < User_wcjtn_._game_wcjtn_Data.carLists.length; i++) {
            if (id == User_wcjtn_._game_wcjtn_Data.carLists[i]) {
                had = true;
                break;
            }
        }
        had = had || (GameManager_1.default.mCarID == id);
        return had;
    };
    User_wcjtn_.unlockSkin = function (id) {
        User_wcjtn_.sub_wcjtn_Money(CarConfig_1.default.Instance().getCarDataByID(id).price);
        User_wcjtn_._game_wcjtn_Data.carLists.push(id);
        User_wcjtn_._game_wcjtn_Data.carID = id;
    };
    User_wcjtn_.getEnoughCoinCarID = function () {
        var id = -1;
        if (User_wcjtn_._game_wcjtn_Data.carLists.length < GameManager_1.default.CarAmount) {
            for (var i = 0; i < GameManager_1.default.CarAmount; i++) {
                if (!this.hadCarByID(i) && User_wcjtn_.get_wcjtn_Money() >= CarConfig_1.default.Instance().getCarDataByID(i).price) {
                    id = i;
                    break;
                }
            }
        }
        return id;
    };
    User_wcjtn_.getOverRecord = function () {
        return User_wcjtn_._game_wcjtn_Data.overRecord;
    };
    User_wcjtn_.setOverRecord = function (record) {
        User_wcjtn_._game_wcjtn_Data.overRecord = record;
    };
    //获取当前商店解锁的道具
    User_wcjtn_.getItemUnlocked = function () {
        var unlocked = new Array();
        for (var i = 0; i < User_wcjtn_._game_wcjtn_Data.unlockedItem.length; ++i) {
            unlocked.push(User_wcjtn_._game_wcjtn_Data.unlockedItem[i]);
        }
        return unlocked;
    };
    //商店道具是否解锁
    User_wcjtn_.itemIsUnlocked = function (id) {
        for (var i = 0; i < User_wcjtn_._game_wcjtn_Data.unlockedItem.length; ++i) {
            if (User_wcjtn_._game_wcjtn_Data.unlockedItem[i] == id) {
                return true;
            }
        }
        return false;
    };
    //解锁商店道具
    User_wcjtn_.unlockItem = function (id) {
        if (User_wcjtn_.itemIsUnlocked(id)) {
            console.log("商店重复解锁 id : ", id);
            return;
        }
        User_wcjtn_._game_wcjtn_Data.unlockedItem.push(id);
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.Game_OnUserUnlockedStore, { unlocked: id });
    };
    Object.defineProperty(User_wcjtn_, "curUsedItem", {
        //当前正在使用的道具
        get: function () {
            return User_wcjtn_._game_wcjtn_Data.usedItem;
        },
        //当前正在使用的道具
        set: function (value) {
            User_wcjtn_._game_wcjtn_Data.usedItem = value;
        },
        enumerable: true,
        configurable: true
    });
    User_wcjtn_.code_wcjtn_ = "";
    User_wcjtn_.openId_wcjtn_ = "";
    User_wcjtn_._wcjtn_token = null;
    User_wcjtn_.nick_wcjtn_Name = "";
    User_wcjtn_.gender_wcjtn_ = 0;
    User_wcjtn_._game_wcjtn_Data = new User_wcjtn_Game_wcjtn_Data();
    return User_wcjtn_;
}(Laya.Script));
exports.default = User_wcjtn_;
},{"../Event/EventDef":9,"../Event/EventMgr":10,"../MyScripts/Manager/GameManager":38,"../MyScripts/Model/CarConfig":44}],81:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utilit_wcjtn_ = /** @class */ (function () {
    function Utilit_wcjtn_() {
    }
    Utilit_wcjtn_.Lerp_wcjtn_ = function (form, to, delta) {
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
    Utilit_wcjtn_.lerp_wcjtn_Euler_wcjtn_Angle = function (form, to, delta) {
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
        var next = Utilit_wcjtn_.Lerp_wcjtn_(form, to, delta);
        return next;
    };
    Utilit_wcjtn_.get_wcjtn_RotationBy_wcjtn_Dir = function (v) {
        var dotValue = (v.x * Utilit_wcjtn_.poin_wcjtn_Down.x) + (v.y * Utilit_wcjtn_.poin_wcjtn_Down.y);
        var cos = dotValue / (v.distance(0, 0) * Utilit_wcjtn_.poin_wcjtn_Down.distance(0, 0));
        var radian = Math.acos(cos);
        var rotation = radian / (2 * Math.PI) * 360;
        if (v.x < 0) {
            rotation = -rotation;
        }
        return rotation;
    };
    Utilit_wcjtn_.get_wcjtn_Rotation_wcjtn_ByDirOn3DSpace = function (v) {
        var dotValue = (v.x * Utilit_wcjtn_.poin_wcjtn_Up.x) + (v.y * Utilit_wcjtn_.poin_wcjtn_Up.y);
        var cos = dotValue / (v.distance(0, 0) * Utilit_wcjtn_.poin_wcjtn_Up.distance(0, 0));
        var radian = Math.acos(cos);
        var rotation = radian / (2 * Math.PI) * 360;
        if (v.x < 0) {
            rotation = rotation + (180 - rotation) * 2;
        }
        return rotation;
    };
    Utilit_wcjtn_.get_wcjtn_DirBy_wcjtn_Rotation = function (rotation) {
        var radian = (rotation - 90) * Math.PI / 180; // -90 是转换到场景坐标系
        var x = Math.cos(radian);
        var y = Math.sin(radian);
        var point = new Laya.Point(x, y);
        point.normalize();
        return point;
    };
    Utilit_wcjtn_.get_wcjtn_DirDir_wcjtn_Angle = function (dir1, dir2) {
        var dotValue = (dir1.x * dir2.x) + (dir1.y * dir2.y);
        var cos = dotValue / (dir1.distance(0, 0) * dir2.distance(0, 0));
        var radian = Math.acos(cos);
        var angle = radian / (2 * Math.PI) * 360;
        return angle;
    };
    Utilit_wcjtn_.get_wcjtn_Dir_wcjtn_ScalarLength = function (dir) {
        var sl = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        return sl;
    };
    Utilit_wcjtn_.set_wcjtn_SpOn_wcjtn_ParentCenter = function (sp) {
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
    Utilit_wcjtn_.get_wcjtn_Point_wcjtn_To_wcjtn_Line_wcjtn_Distance = function (x, y, LineStart, LineEnd) {
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
    Utilit_wcjtn_.is_wcjtn_IphoneX = function () {
        if (!Laya.Browser.onIPhone)
            return false;
        if ((Laya.Browser.width == 2436 && Laya.Browser.height == 1125)
            || (Laya.Browser.height == 2436 && Laya.Browser.width == 1125)) {
            return true;
        }
        return false;
    };
    Utilit_wcjtn_.is_wcjtn_Iphone = function () {
        return Laya.Browser.onIPhone;
    };
    Utilit_wcjtn_.get_wcjtn_Child = function (node, name) {
        for (var i = 0; i < node.numChildren; ++i) {
            var child = node.getChildAt(i);
            if (child.name == name) {
                return child;
            }
            else {
                var target = Utilit_wcjtn_.get_wcjtn_Child(child, name);
                if (target)
                    return target;
            }
        }
        return null;
    };
    Utilit_wcjtn_.for_wcjtn_Each_wcjtn_Child = function (node, each) {
        for (var i = 0; i < node.numChildren; ++i) {
            var child = node.getChildAt(i);
            each(child);
            Utilit_wcjtn_.for_wcjtn_Each_wcjtn_Child(child, each);
        }
    };
    Utilit_wcjtn_.getRandomByRange = function (min, max) {
        var random = Math.random() * (max - min) + min;
        return random;
    };
    Utilit_wcjtn_.safeDelta = function () {
        return Math.min(50, Laya.timer.delta);
    };
    Utilit_wcjtn_.Origin_wcjtn_StageWidth = 1334;
    Utilit_wcjtn_.Origin_wcjtn_StageHeight = 750;
    Utilit_wcjtn_.grayscale_wcjtn_Mat = [0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0, 0, 0, 1, 0];
    Utilit_wcjtn_.grayscale_wcjtn_Filter = new Laya.ColorFilter(Utilit_wcjtn_.grayscale_wcjtn_Mat);
    Utilit_wcjtn_.poin_wcjtn_Down = new Laya.Point(0, -1);
    Utilit_wcjtn_.poin_wcjtn_Up = new Laya.Point(0, 1);
    return Utilit_wcjtn_;
}());
exports.default = Utilit_wcjtn_;
},{}],82:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("./AppConfig");
var SoundMgr_1 = require("./Mgr/SoundMgr");
var AppSwitchConfig_1 = require("./Config/AppSwitchConfig");
var ViewMgr_1 = require("./Mgr/ViewMgr");
var VIVO_wcjtn_API = /** @class */ (function () {
    function VIVO_wcjtn_API() {
    }
    Object.defineProperty(VIVO_wcjtn_API, "Banner_wcjtn_Instance", {
        get: function () {
            return VIVO_wcjtn_API._banner_wcjtn_;
        },
        enumerable: true,
        configurable: true
    });
    VIVO_wcjtn_API.Login_wcjtn_ = function (onSuccess, onFail) {
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
    VIVO_wcjtn_API.show_wcjtn_Dialog = function (titel, message, buttons, success, cancel, fail) {
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
    VIVO_wcjtn_API.create_wcjtn_Rewarded_wcjtn_VideoAd = function () {
        if (Laya.Browser.onVVMiniGame) {
            VIVO_wcjtn_API.rewardedAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                posId: VIVO_wcjtn_API.ad_wcjtn_UnitId,
                style: {}
            });
            VIVO_wcjtn_API.rewardedAd.onError(function (err) {
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
    VIVO_wcjtn_API.show_wcjtn_Rewarded_wcjtn_VideoAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onVVMiniGame) {
            SoundMgr_1.default.ins_wcjtn_tance.stop_wcjtn_BGM();
            console.log("---------------------------------- VIVO_wcjtn_API.rewardedAd:", VIVO_wcjtn_API.rewardedAd + ",VIVO_wcjtn_API.rewardedAdNum:", VIVO_wcjtn_API.rewardedAdNum);
            // if (VIVO_wcjtn_API.rewardedAd == null) {
            //     onFailed();
            //     return;
            // }
            if (VIVO_wcjtn_API.rewardedAdNum == 0) {
                VIVO_wcjtn_API.create_wcjtn_Rewarded_wcjtn_VideoAd();
            }
            else {
                // 第一次creat后广告可以在onload里面直接show
                // 后续的加载必须要load才能触发onload接着才能show出广告
                var adLoad = VIVO_wcjtn_API.rewardedAd.load(); //第一次调用 可能会报-3  广告能正常展示就可以忽略
                // 捕捉load失败的错误
                adLoad && adLoad.catch(function (err) {
                    console.log("激励广告load失败" + JSON.stringify(err));
                    onFailed();
                });
            }
            VIVO_wcjtn_API.rewardedAdNum = 1;
            console.log("近来showRewardedVideoAd");
            VIVO_wcjtn_API.rewardedAd.onLoad(function () {
                var adshow = VIVO_wcjtn_API.rewardedAd.show();
                // 捕捉show失败的错误
                adshow && adshow.then(function () {
                    console.log("激励广告展示成功");
                }).catch(function (err) {
                    console.log("激励广告展示失败" + JSON.stringify(err));
                    onFailed();
                });
            });
            VIVO_wcjtn_API.rewardedAd.onClose(function (res) {
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
    VIVO_wcjtn_API.show_wcjtn_BannerAd = function () {
        var self = VIVO_wcjtn_API;
        if (Laya.Browser.onVVMiniGame) {
            console.log('===========bannerAd showBanerAd');
            var systemInfo = Laya.Browser.window["qg"].getSystemInfoSync();
            var sw = systemInfo.screenWidth;
            var sh = systemInfo.screenHeight;
            VIVO_wcjtn_API.m_wcjtn_BannerAd = qg.createBannerAd({
                posId: VIVO_wcjtn_API.bannerAd_wcjtn_UnitId,
                style: {}
            });
            var adshow = VIVO_wcjtn_API.m_wcjtn_BannerAd.show();
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
            VIVO_wcjtn_API.m_wcjtn_BannerAd.onError(function (err) {
                console.log('Banner广告加载失败111:' + JSON.stringify(err));
            });
        }
    };
    VIVO_wcjtn_API.hide_wcjtn_BannerAd = function () {
        if (VIVO_wcjtn_API.m_wcjtn_BannerAd) {
            console.log('===========bannerAd 隐藏');
            VIVO_wcjtn_API.m_wcjtn_BannerAd.hide();
            VIVO_wcjtn_API.m_wcjtn_BannerAd.destroy();
            VIVO_wcjtn_API.m_wcjtn_BannerAd = null;
        }
        else {
            console.log('===========bannerAd 为空');
        }
    };
    VIVO_wcjtn_API.navigate_wcjtn_To_wcjtn_MiniProgram = function (pkgName, path, onSuccess, onFail, onComplate) {
        if (Laya.Browser.onVVMiniGame) {
            console.log("vivo 跳转游戏： " + pkgName);
            Laya.Browser.window["qg"].navigateToMiniGame({
                pkgName: pkgName,
                path: path,
                extraData: {
                    from: AppConfig_1.default.App_wcjtn_ID
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
    VIVO_wcjtn_API.show_wcjtn_Interstitial_wcjtn_Ad = function (onAdClose, onFailed) {
        if (Laya.Browser.onVVMiniGame) {
            var insertAd = Laya.Browser.window["qg"].createInterstitialAd({
                posId: VIVO_wcjtn_API.Ins_wcjtn_Ad_wcjtn_UnitId
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
    VIVO_wcjtn_API.get_wcjtn_Launch_wcjtn_OptionsSync = function () {
        return {};
    };
    VIVO_wcjtn_API._wcjtn_share_wcjtn_ = function (complate) {
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
    VIVO_wcjtn_API.create_wcjtn_Desktop_wcjtn_Icon = function (onSuccess, onFail) {
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
    VIVO_wcjtn_API.show_wcjtn_Native_wcjtn_Ad = function (onSuccess, onFail, index) {
        if (1 == index) {
            VIVO_wcjtn_API.tryShowNativeAd1(onSuccess, onFail);
        }
        else if (2 == index) {
            VIVO_wcjtn_API.tryShowNativeAd2(onSuccess, onFail);
        }
    };
    //尝试打开原生广告1
    VIVO_wcjtn_API.tryShowNativeAd1 = function (onSuccess, onFail) {
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
        var yuanshengSwitch = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().vivocfg.yuanshengSwitch;
        var vivoVersions = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().vivocfg.vivoversions;
        if (1 == yuanshengSwitch && vivoVersions == AppConfig_1.default.Versions_wcjtn_) {
            ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.VVNativeView1, null, function (v) {
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
    VIVO_wcjtn_API.tryShowNativeAd2 = function (onSuccess, onFail) {
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
        var yuanshengSwitch = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().vivocfg.yuanshengSwitch2;
        var vivoVersions = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().vivocfg.vivoversions;
        if (1 == yuanshengSwitch && vivoVersions == AppConfig_1.default.Versions_wcjtn_) {
            ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.VVNativeView2, null, function (v) {
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
    VIVO_wcjtn_API.tryPopCreateDestopIcon = function (onSuccess, onFail) {
        if (!Laya.Browser.onVVMiniGame) {
            if (null != onFail) {
                onFail();
            }
            return;
        }
        if (1 == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().vivocfg.addToDesktop) {
            VIVO_wcjtn_API.create_wcjtn_Desktop_wcjtn_Icon(onSuccess, onFail);
        }
        else {
            if (null != onFail) {
                onFail();
            }
        }
    };
    //尝试根据配置显示插屏广告
    VIVO_wcjtn_API.tryShowInsAd = function (onSuccess, onFail) {
        var chapingSwitch = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().vivocfg.chapingSwitch;
        if (1 == chapingSwitch) {
            var rate = Math.random() * 100;
            if (rate <= AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().vivocfg.chaping) {
                VIVO_wcjtn_API.show_wcjtn_Interstitial_wcjtn_Ad(function () {
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
    VIVO_wcjtn_API.ad_wcjtn_UnitId = ""; //视频广告
    VIVO_wcjtn_API.bannerAd_wcjtn_UnitId = ""; //banner广告
    VIVO_wcjtn_API.native_wcjtn_AdId = ""; //原生广告
    VIVO_wcjtn_API.Ins_wcjtn_Ad_wcjtn_UnitId = ""; //插屏广告
    VIVO_wcjtn_API.rewardedAd = null;
    VIVO_wcjtn_API.rewardedAdNum = 0;
    VIVO_wcjtn_API._banner_wcjtn_ = null;
    VIVO_wcjtn_API.m_wcjtn_BannerAd = null;
    return VIVO_wcjtn_API;
}());
exports.default = VIVO_wcjtn_API;
},{"./AppConfig":2,"./Config/AppSwitchConfig":6,"./Mgr/SoundMgr":32,"./Mgr/ViewMgr":34}],83:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SoundMgr_1 = require("../Mgr/SoundMgr");
var Button_wcjtn_Anim = /** @class */ (function (_super) {
    __extends(Button_wcjtn_Anim, _super);
    function Button_wcjtn_Anim() {
        var _this = _super.call(this) || this;
        _this.use_wcjtn_Sound = true;
        return _this;
    }
    Button_wcjtn_Anim.prototype.onAwake = function () {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.on_wcjtn_Down);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.on_wcjtn_Up);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.on_wcjtn_Up);
    };
    Button_wcjtn_Anim.prototype.onDisable = function () {
        this.owner.offAll();
        Laya.Tween.clearAll(this);
    };
    Button_wcjtn_Anim.prototype.on_wcjtn_Down = function () {
        Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
        if (this.use_wcjtn_Sound) {
            SoundMgr_1.default.ins_wcjtn_tance.play_wcjtn_Sound(SoundMgr_1.Sound_wcjtn_Type.ClickBtn);
        }
    };
    Button_wcjtn_Anim.prototype.on_wcjtn_Up = function () {
        Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
    };
    return Button_wcjtn_Anim;
}(Laya.Script));
exports.default = Button_wcjtn_Anim;
},{"../Mgr/SoundMgr":32}],84:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//环形进度条，只支持纯色
var Circular_wcjtn_ProcessBar = /** @class */ (function (_super) {
    __extends(Circular_wcjtn_ProcessBar, _super);
    function Circular_wcjtn_ProcessBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.color_wcjtn_ = "#7CFC00";
        _this.line_wcjtn_Color = "#ffffff";
        _this.line_wcjtn_Width = 6;
        _this._owner_wcjtn_Sprite = null;
        _this._value_wcjtn_ = 0;
        return _this;
    }
    Circular_wcjtn_ProcessBar.prototype.onAwake = function () {
        this._owner_wcjtn_Sprite = this.owner;
        this._mask = this.owner.getChildByName("circleMask");
        var x = this.line_wcjtn_Width * 1.9;
        this._mask.graphics.drawCircle(x, x, this._owner_wcjtn_Sprite.width / 2 - this.line_wcjtn_Width * 1.5, this.bgColor);
    };
    Circular_wcjtn_ProcessBar.prototype.hide = function () {
        this._owner_wcjtn_Sprite.visible = false;
    };
    Circular_wcjtn_ProcessBar.prototype.set_wcjtn_Value = function (value) {
        if (value > 1)
            value = 1;
        if (value < 0)
            value = 0;
        var angle = 360 * (1 - value) + 90;
        if (null == this._owner_wcjtn_Sprite)
            this._owner_wcjtn_Sprite = this.owner;
        this._owner_wcjtn_Sprite.graphics.clear();
        this._owner_wcjtn_Sprite.graphics.drawPie(this._owner_wcjtn_Sprite.width / 2, this._owner_wcjtn_Sprite.height / 2, this._owner_wcjtn_Sprite.width / 2, 360 - angle, 270, null, this.line_wcjtn_Color, this.line_wcjtn_Width);
    };
    return Circular_wcjtn_ProcessBar;
}(Laya.Script));
exports.default = Circular_wcjtn_ProcessBar;
},{}],85:[function(require,module,exports){
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
    View_wcjtn_Mgr.instance.openView(View_wcjtn_Def.ClickGetPrize,data);
 *
 * @export
 * @class ClickGetPrize
 * @extends {View_wcjtn_Base}
 */
var Click_wcjtn_Get_wcjtn_Prize = /** @class */ (function (_super) {
    __extends(Click_wcjtn_Get_wcjtn_Prize, _super);
    function Click_wcjtn_Get_wcjtn_Prize() {
        var _this = _super.call(this) || this;
        _this._total_wcjtn_Click_wcjtn_Timer = 22; //用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
        _this._need_wcjtn_Click_wcjtn_Time = 10; //一共点多少次能够获得奖励，用于显示进度条
        _this._banner_wcjtn_ClickTime = 7; //点多少次开始显示bannerr套路用户，可微调    
        return _this;
    }
    // private _wudianLoadFlag: boolean;
    Click_wcjtn_Get_wcjtn_Prize.prototype.onAwake = function () {
        this._click_wcjtn__Btn = this.owner.getChildByName("Click_Btn");
        this._click_wcjtn__Btn.on(Laya.Event.CLICK, this, this.Button_wcjtn_Clicked);
        this._arrow_wcjtn__Img = this._click_wcjtn__Btn.getChildByName("Arrow_Img");
        this._bg_wcjtn_ = this.owner.getChildByName("BG");
        this._open_wcjtn__Btn = this._bg_wcjtn_.getChildByName("Open_Btn");
        this._getPrize_wcjtn__View = this.owner.getChildByName("GetPrize_View");
        this._prizeCount_wcjtn__Text = this._getPrize_wcjtn__View.getChildByName("PrizeCount_Text");
        this._confirm_wcjtn__Btn = this._getPrize_wcjtn__View.getChildByName("Confirm_Btn");
        this._getPrize_wcjtn__View.visible = false;
        this._clickTime_wcjtn__PBar = this._bg_wcjtn_.getChildByName("ClickTime_PBar");
        this._clickTime_wcjtn__PBar$Bar = this._clickTime_wcjtn__PBar.getChildByName("ClickTime_PBar$Bar");
        this._click_wcjtn_Bar_wcjtn_OriginalWidth = this._clickTime_wcjtn__PBar$Bar.width;
        this._bannerAd_wcjtn__View = this.owner.getChildByName("BannerAd_View");
        this._clickTime_wcjtn__PBar$Bar.width = 0;
        this._click_wcjtn_Time = 0;
        this._total_wcjtn_Click_wcjtn_Time = 0;
        //EventMgr.instance.regOnceEvent(EventDef.AD_WudianBanner_LoadComplete, this, this.WudianLoadComplete);
    };
    Click_wcjtn_Get_wcjtn_Prize.prototype.onUpdate = function () {
        /* 箭头上下移动 */
        if (this._arrowUp_wcjtn_) {
            this._arrow_wcjtn__Img.top += Laya.timer.delta / 5;
            if (this._arrow_wcjtn__Img.top > -140) {
                this._arrowUp_wcjtn_ = false;
            }
        }
        else {
            this._arrow_wcjtn__Img.top -= Laya.timer.delta / 5;
            if (this._arrow_wcjtn__Img.top < -180) {
                this._arrowUp_wcjtn_ = true;
            }
        }
        /* 按钮不按，进度条自动退回 */
        if (!this._banner_wcjtn_Clicked) {
            var spd = 2 + (this._clickTime_wcjtn__PBar$Bar.width / this._click_wcjtn_Bar_wcjtn_OriginalWidth) * 6;
            if (this._clickTime_wcjtn__PBar$Bar.width >= spd) {
                this._clickTime_wcjtn__PBar$Bar.width -= spd;
            }
            if ((this._clickTime_wcjtn__PBar$Bar.width / this._click_wcjtn_Bar_wcjtn_OriginalWidth) + 0.1 < (this._click_wcjtn_Time / this._need_wcjtn_Click_wcjtn_Time)) {
                this._click_wcjtn_Time--;
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
    Click_wcjtn_Get_wcjtn_Prize.prototype.open_wcjtn_View = function (data) {
        this._compelet_wcjtn_Function = data.Complete;
        this._prize_wcjtn_Count = data.PrizeCount;
        _super.prototype.open_wcjtn_View.call(this, data);
    };
    /**
     * 用户成功获得奖励
     *
     * @memberof ClickGetPrize
     */
    Click_wcjtn_Get_wcjtn_Prize.prototype.Open_wcjtn_PrizeWindow = function () {
        this._bg_wcjtn_.visible = false;
        var self = this;
        this._prizeCount_wcjtn__Text.text = this._prize_wcjtn_Count.toString();
        this._getPrize_wcjtn__View.visible = true;
        /* 确认按钮 */
        this._confirm_wcjtn__Btn.once(Laya.Event.CLICK, this, function () {
            if (self._compelet_wcjtn_Function) {
                self._compelet_wcjtn_Function();
            }
            self.close_wcjtn_View();
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
    Click_wcjtn_Get_wcjtn_Prize.prototype.Show_wcjtn_Banner = function () {
        console.log("AD_WudianBanner_Show");
        CachedWXBannerAd_1.default._wcjtn_show_wcjtn_();
    };
    /**
     * 狂点按钮逻辑
     *
     *
     * @memberof ClickGetPrize
     */
    Click_wcjtn_Get_wcjtn_Prize.prototype.Button_wcjtn_Clicked = function () {
        this._click_wcjtn_Time++;
        this._total_wcjtn_Click_wcjtn_Time++;
        //nanner一直没加载成功,保持进度条
        if (this._click_wcjtn_Time > this._need_wcjtn_Click_wcjtn_Time) {
            this._click_wcjtn_Time = this._need_wcjtn_Click_wcjtn_Time;
        }
        if (this._click_wcjtn_Time >= this._banner_wcjtn_ClickTime /*&& this._wudianLoadFlag*/) {
            if (this._click_wcjtn_Time >= this._need_wcjtn_Click_wcjtn_Time) {
                this._click_wcjtn_Time = this._need_wcjtn_Click_wcjtn_Time - 1;
            }
            this._banner_wcjtn_Clicked = true;
            console.log("误点Banner套路启动");
            //用户连点，出banner
            this.Show_wcjtn_Banner();
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        //用户一直没被套路到，让他继续玩
        else if (this._total_wcjtn_Click_wcjtn_Time > this._total_wcjtn_Click_wcjtn_Timer) {
            console.log("用户一直没点到，放他一马", this._total_wcjtn_Click_wcjtn_Time);
            this.Banner_wcjtn_Clicked();
        }
        var progress = (this._click_wcjtn_Time / this._need_wcjtn_Click_wcjtn_Time) * this._click_wcjtn_Bar_wcjtn_OriginalWidth;
        this._clickTime_wcjtn__PBar$Bar.width = progress;
    };
    /**
     * Banner已经点击之后，让用户获得奖励
     *
     * @memberof ClickGetPrize
     */
    Click_wcjtn_Get_wcjtn_Prize.prototype.Banner_wcjtn_Clicked = function () {
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_Wu_wcjtn_dian_wcjtn_Banner__wcjtn_Hide);
        this._banner_wcjtn_Clicked = true;
        this._click_wcjtn_Time = this._need_wcjtn_Click_wcjtn_Time;
        this._clickTime_wcjtn__PBar$Bar.width = this._click_wcjtn_Bar_wcjtn_OriginalWidth;
        this._click_wcjtn__Btn.visible = false;
        this._open_wcjtn__Btn.visible = true;
        // this._bannerAd_View.visible = false;
        // this._bannerAd_View.active = false;
        this.Open_wcjtn_PrizeWindow();
    };
    Click_wcjtn_Get_wcjtn_Prize.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        CachedWXBannerAd_1.default._wcjtn_hide_wcjtn_();
    };
    return Click_wcjtn_Get_wcjtn_Prize;
}(ViewBase_1.default));
exports.default = Click_wcjtn_Get_wcjtn_Prize;
},{"../../CachedWXBannerAd":4,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../View/ViewBase":130}],86:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BannerAdView_1 = require("../../ShareAd/View/BannerAdView");
var Universal_wcjtn_BottomZone = /** @class */ (function (_super) {
    __extends(Universal_wcjtn_BottomZone, _super);
    function Universal_wcjtn_BottomZone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Universal_wcjtn_BottomZone.prototype.onAwake = function () {
        this._owner_wcjtn_Sprite = this.owner;
        this._auto_wcjtn_Zone = this._owner_wcjtn_Sprite.getChildByName("AutoZone");
        this._loop_wcjtn_ADZone = this._owner_wcjtn_Sprite.getChildByName("LoopAD");
        this._banner_wcjtn_ADZone = this._owner_wcjtn_Sprite.getChildByName("BannerAD");
        this._banner_wcjtn_Ad = this._banner_wcjtn_ADZone.getComponent(BannerAdView_1.default);
    };
    Universal_wcjtn_BottomZone.prototype.onEnable = function () {
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            this._auto_wcjtn_Zone.bottom = this._loop_wcjtn_ADZone.height + this._banner_wcjtn_ADZone.height;
            this._loop_wcjtn_ADZone.bottom = this._banner_wcjtn_ADZone.height;
            this._banner_wcjtn_ADZone.visible = true;
        }
        else {
            this._auto_wcjtn_Zone.bottom = this._loop_wcjtn_ADZone.height;
            this._loop_wcjtn_ADZone.bottom = 0;
            this._banner_wcjtn_ADZone.visible = false;
        }
    };
    Universal_wcjtn_BottomZone.prototype.onDisable = function () {
    };
    Universal_wcjtn_BottomZone.prototype.onUpdate = function () {
        if (!this._banner_wcjtn_ADZone.visible) {
            this._banner_wcjtn_Ad.clear_wcjtn_WXBaner();
        }
    };
    return Universal_wcjtn_BottomZone;
}(Laya.Script));
exports.default = Universal_wcjtn_BottomZone;
},{"../../ShareAd/View/BannerAdView":76}],87:[function(require,module,exports){
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
},{}],88:[function(require,module,exports){
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
},{}],89:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var Loading_wcjtn_View = /** @class */ (function (_super) {
    __extends(Loading_wcjtn_View, _super);
    function Loading_wcjtn_View() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._process_wcjtn_Width = 0;
        return _this;
    }
    // protected _logo_wcjtn_Ani : Logo_wcjtn_Ani = null;
    Loading_wcjtn_View.prototype.onAwake = function () {
        this._bg_wcjtn_ = this.owner.getChildByName("Bg");
        this._bottom_wcjtn_Zone = this._bg_wcjtn_.getChildByName("BottomZone");
        this._process_wcjtn_BarBg = this._bottom_wcjtn_Zone.getChildByName("processBarBg");
        this._process_wcjtn_Bar = this._process_wcjtn_BarBg.getChildByName("processBar");
        this._process_wcjtn_Width = this._process_wcjtn_Bar.width;
        // this._logo_wcjtn_Ani = this._bottom_wcjtn_Zone.getChildByName("LogoAni").getComponent(Logo_wcjtn_Ani);
    };
    Loading_wcjtn_View.prototype.onStart = function () {
        // Laya.timer.once(250,this,()=>
        // {
        //     this._logo_wcjtn_Ani.play_wcjtn_Ani();
        // })
    };
    Loading_wcjtn_View.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
    };
    Loading_wcjtn_View.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
    };
    Loading_wcjtn_View.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
    };
    Loading_wcjtn_View.prototype.onUpdate = function () {
        this._bg_wcjtn_.width = Laya.stage.width;
        this._bg_wcjtn_.height = Laya.stage.height;
    };
    Loading_wcjtn_View.prototype.set_wcjtn_Process = function (process) {
        if (process < 0)
            process = 0;
        if (process > 1)
            process = 1;
        var width = this._process_wcjtn_Width * process;
        if (width < 1)
            width = 1;
        this._process_wcjtn_Bar.width = width;
    };
    return Loading_wcjtn_View;
}(ViewBase_1.default));
exports.default = Loading_wcjtn_View;
},{"../ViewBase":130}],90:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MainViewTemplate_1 = require("../TemplateViews/Main/MainViewTemplate");
var GameManager_1 = require("../../MyScripts/Manager/GameManager");
var Camera_1 = require("../../MyScripts/OBJ/Camera");
var Utilit_1 = require("../../Utilit");
var User_1 = require("../../User/User");
var PlayerManager_1 = require("../../MyScripts/Manager/PlayerManager");
var CarConfig_1 = require("../../MyScripts/Model/CarConfig");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var WXAPI_1 = require("../../WXAPI");
var NativeCallback_1 = require("../../NativeCallback");
var SoundMgr_1 = require("../../Mgr/SoundMgr");
var MyMainView = /** @class */ (function (_super) {
    __extends(MyMainView, _super);
    function MyMainView() {
        var _this = _super.call(this) || this;
        _this.carID = 0;
        _this.maxAccel = 0;
        _this.maxBarWidth = 0;
        return _this;
    }
    MyMainView.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        this.maxAccel = CarConfig_1.default.Instance().getCarDataByID(GameManager_1.default.CarAmount - 1).accel;
        this.maxBarWidth = this.carAccelBar.width;
        this.carID = User_1.default.getCarID();
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this.skinZone.top = this.skinZone.top + 75;
            }
        }
        else {
            this.skinZone.top = this.skinZone.top - 200;
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this.skinZone.top = this.skinZone.top + 75;
            }
        }
        //配置声音开关
        this.btnSound.gray = !GameManager_1.default.SoundSwitch;
        this.skinZone.visible = false;
        this.setCoinNum();
        GameManager_1.default.Instance().GameMenu();
        if (!GameManager_1.default.FirstGame)
            Camera_1.default.Instance().ToSlowLane();
        this.guide.visible = false;
        var record = User_1.default.getOverRecord();
        console.log("最高纪录应该是", record);
        if (record) {
            this.overCarRecord.value = record.toString();
        }
        if (GameManager_1.default.FirstGame) {
            this.guide.visible = true;
            this.Top_wcjtn_Zone.visible = false;
            this._center_wcjtn_Zone.visible = false;
            this._krq_wcjtn_Main._wcjtn_hide_wcjtn_();
        }
        else {
            //金币足够主动展示皮肤界面
            var id = User_1.default.getEnoughCoinCarID();
            if (id >= 0) {
                this.carID = id;
                this.onSkinBtn();
            }
        }
    };
    MyMainView.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    MyMainView.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    MyMainView.prototype.onRewardVidewoFail = function () {
        if (NativeCallback_1.default.NowVideoType == "tryskin") {
            this.add_wcjtn_Event();
            NativeCallback_1.default.NowVideoType = "";
        }
    };
    MyMainView.prototype.onRewardVidewoSuccess = function () {
        if (NativeCallback_1.default.NowVideoType == "tryskin") {
            this.add_wcjtn_Event();
            GameManager_1.default.mCarID = this.carID;
            this.showChooseBtn();
            NativeCallback_1.default.NowVideoType = "";
        }
    };
    MyMainView.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this.btnSound.on(Laya.Event.CLICK, this, this.onSoundBtn);
        this.btnSkin.on(Laya.Event.CLICK, this, this.onSkinBtn);
        this.btnBackInSkin.on(Laya.Event.CLICK, this, this.onBackMenuInSkinBtn);
        this.btnLeftSkin.on(Laya.Event.CLICK, this, this.onLeftSkinBtn);
        this.btnRightSkin.on(Laya.Event.CLICK, this, this.onRightSkinBtn);
        this.btnChooseSkin.on(Laya.Event.CLICK, this, this.onChooseSkinBtn);
        this.btnUnlockSkin.on(Laya.Event.CLICK, this, this.onUnlockSkinBtn);
        this.btnTry.on(Laya.Event.CLICK, this, this.onTrySkinBtn);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change, this, this.setCoinNum);
    };
    MyMainView.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this.btnSound.off(Laya.Event.CLICK, this, this.onSoundBtn);
        this.btnSkin.off(Laya.Event.CLICK, this, this.onSkinBtn);
        this.btnBackInSkin.off(Laya.Event.CLICK, this, this.onBackMenuInSkinBtn);
        this.btnLeftSkin.off(Laya.Event.CLICK, this, this.onLeftSkinBtn);
        this.btnRightSkin.off(Laya.Event.CLICK, this, this.onRightSkinBtn);
        this.btnChooseSkin.off(Laya.Event.CLICK, this, this.onChooseSkinBtn);
        this.btnUnlockSkin.off(Laya.Event.CLICK, this, this.onUnlockSkinBtn);
        this.btnTry.off(Laya.Event.CLICK, this, this.onTrySkinBtn);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change, this, this.setCoinNum);
    };
    MyMainView.prototype.showChooseBtn = function () {
        var price = CarConfig_1.default.Instance().getCarDataByID(this.carID).price;
        this.carAccelBar.width = this.maxBarWidth * CarConfig_1.default.Instance().getCarDataByID(this.carID).accel / this.maxAccel;
        this.skinUnlockNum.value = price.toString();
        if (User_1.default.hadCarByID(this.carID)) {
            this.btnChooseSkin.visible = true;
            this.btnUnlockSkin.visible = false;
            this.btnTry.visible = false;
        }
        else {
            this.btnChooseSkin.visible = false;
            this.btnUnlockSkin.visible = true;
            if (User_1.default.get_wcjtn_Money() >= CarConfig_1.default.Instance().getCarDataByID(this.carID).price) {
                this.btnUnlockSkin.visible = true;
                this.btnTry.visible = false;
            }
            else {
                this.btnUnlockSkin.visible = false;
                this.btnTry.visible = true;
            }
        }
    };
    MyMainView.prototype.setCoinNum = function () {
        this._money_wcjtn_Num.value = String(User_1.default.get_wcjtn_Money());
        this.skinCoinNum.value = String(User_1.default.get_wcjtn_Money());
    };
    MyMainView.prototype.onSoundBtn = function () {
        GameManager_1.default.SoundSwitch = !GameManager_1.default.SoundSwitch;
        this.btnSound.gray = !GameManager_1.default.SoundSwitch;
        SoundMgr_1.default.ins_wcjtn_tance._wcjtn_Enabled_wcjtn_ = GameManager_1.default.SoundSwitch;
        if (GameManager_1.default.SoundSwitch)
            SoundMgr_1.default.ins_wcjtn_tance.play_wcjtn_BGM(SoundMgr_1.Sound_wcjtn_Type.Bgm);
    };
    MyMainView.prototype.onSkinBtn = function () {
        PlayerManager_1.default.Instance().ChooseCarByID(this.carID);
        Camera_1.default.Instance().ToSkin();
        this._center_wcjtn_Zone.visible = false;
        this.skinZone.visible = true;
        this.showChooseBtn();
    };
    MyMainView.prototype.onTrySkinBtn = function () {
        Laya.timer.clearAll(this);
        this.remove_wcjtn_Event();
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback_1.default.CallNativeFunc("showRewardVideo");
            NativeCallback_1.default.NowVideoType = "tryskin";
            Laya.SoundManager.muted = true;
        }
        else {
            this.add_wcjtn_Event();
            GameManager_1.default.mCarID = this.carID;
            this.showChooseBtn();
        }
    };
    MyMainView.prototype.onBackMenuInSkinBtn = function () {
        var _this = this;
        this.carID = GameManager_1.default.mCarID;
        this.skinZone.visible = false;
        Laya.timer.once(500, this, function () {
            _this._center_wcjtn_Zone.visible = true;
        });
        Camera_1.default.Instance().ToMenu();
        PlayerManager_1.default.Instance().ChooseCarByID(GameManager_1.default.mCarID);
    };
    MyMainView.prototype.onRightSkinBtn = function () {
        this.carID++;
        if (this.carID >= GameManager_1.default.CarAmount)
            this.carID = 0;
        PlayerManager_1.default.Instance().ChooseCarByID(this.carID);
        this.showChooseBtn();
    };
    MyMainView.prototype.onLeftSkinBtn = function () {
        this.carID--;
        if (this.carID < 0)
            this.carID = GameManager_1.default.CarAmount - 1;
        PlayerManager_1.default.Instance().ChooseCarByID(this.carID);
        this.showChooseBtn();
    };
    MyMainView.prototype.onStageClick = function () {
        if (GameManager_1.default.FirstGame) {
            this.on_wcjtn_Start_wcjtn_Btn();
        }
    };
    MyMainView.prototype.onChooseSkinBtn = function () {
        GameManager_1.default.mCarID = this.carID;
        User_1.default.setCarID(this.carID);
        this.onBackMenuInSkinBtn();
    };
    MyMainView.prototype.onUnlockSkinBtn = function () {
        User_1.default.unlockSkin(this.carID);
        this.showChooseBtn();
    };
    /**
     * 开始按钮
     */
    MyMainView.prototype.on_wcjtn_Start_wcjtn_Btn = function () {
        this.close_wcjtn_View();
        var success = function () {
            User_1.default.add_wcjtn_Money(100);
        };
        var complete = function () {
            GameManager_1.default.Instance().GameStart();
        };
        WXAPI_1.default.tryShowWXCrazyClick("100", complete, success, complete);
    };
    return MyMainView;
}(MainViewTemplate_1.default));
exports.default = MyMainView;
},{"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Mgr/SoundMgr":32,"../../MyScripts/Manager/GameManager":38,"../../MyScripts/Manager/PlayerManager":40,"../../MyScripts/Model/CarConfig":44,"../../MyScripts/OBJ/Camera":50,"../../NativeCallback":68,"../../User/User":80,"../../Utilit":81,"../../WXAPI":131,"../TemplateViews/Main/MainViewTemplate":119}],91:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CircularProcessBar_1 = require("../../CircularProcessBar");
var Utilit_1 = require("../../../Utilit");
var ReliveBtn = /** @class */ (function (_super) {
    __extends(ReliveBtn, _super);
    function ReliveBtn() {
        var _this = _super.call(this) || this;
        _this._mTimeAmount = 5; //8S倒计时
        _this._mTimer = 0;
        return _this;
    }
    ReliveBtn.prototype.onAwake = function () {
        this._mOwner = this.owner;
        this._mCircularBar = this.circularBar.getComponent(CircularProcessBar_1.default);
        this.Hide();
    };
    ReliveBtn.prototype.onUpdate = function () {
        if (this._mOwner.visible) {
            this.TimeGo();
        }
    };
    ReliveBtn.prototype.Show = function () {
        this._mOwner.visible = true;
        this._mTimer = 0;
    };
    ReliveBtn.prototype.TimeGo = function () {
        this._mTimer += Utilit_1.default.safeDelta();
        var time = this._mTimeAmount - Math.floor(this._mTimer / 1000);
        this.timerClip.value = time.toString();
        var val = this._mTimer / (this._mTimeAmount * 1000);
        this._mCircularBar.set_wcjtn_Value(val);
        if (time <= 0) {
            console.log("复活按钮关闭");
            this._mOwner.visible = false;
        }
    };
    ReliveBtn.prototype.GetTimerAmount = function () {
        return this._mTimeAmount;
    };
    ReliveBtn.prototype.Hide = function () {
        this._mOwner.visible = false;
    };
    return ReliveBtn;
}(Laya.Script));
exports.default = ReliveBtn;
},{"../../../Utilit":81,"../../CircularProcessBar":84}],92:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var Utilit_1 = require("../../../Utilit");
var QQTemplateViewBase_1 = require("../QQTemplateViewBase");
var QQMiniGameAPI_1 = require("../../../QQMiniGameAPI");
var AppConfig_1 = require("../../../AppConfig");
var QQ_wcjtn_Game_wcjtn_FailViewTemplate = /** @class */ (function (_super) {
    __extends(QQ_wcjtn_Game_wcjtn_FailViewTemplate, _super);
    function QQ_wcjtn_Game_wcjtn_FailViewTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._back_wcjtn_Btn = null;
        _this._continue_wcjtn_Btn = null;
        _this._click_wcjtn_Tag = false;
        _this._click_wcjtn_TimingTag = false;
        return _this;
    }
    QQ_wcjtn_Game_wcjtn_FailViewTemplate.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        if (Utilit_1.default.is_wcjtn_IphoneX()) {
            this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
        }
        this._back_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("BackBtn");
        this._continue_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("ContinueBtn");
    };
    QQ_wcjtn_Game_wcjtn_FailViewTemplate.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        var self = this;
        if (WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag && AppConfig_1.default.Versions_wcjtn_ == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.qq_wcjtn_versions) {
            if (1 == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.wei_wcjtn_yi) {
                var yPos = this._center_wcjtn_Zone.height - 150;
                this._back_wcjtn_Btn.y = yPos;
                this._continue_wcjtn_Btn.y = yPos;
            }
            var excute_1 = function () {
                var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, self, self.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000, self, self.Btn_wcjtn_Up);
            };
            if (1 == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.box) {
                QQMiniGameAPI_1.default.show_wcjtn_App_wcjtn_BoxAd(function () {
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
    QQ_wcjtn_Game_wcjtn_FailViewTemplate.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._back_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Back_wcjtn_Btn);
        this._continue_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Continue_wcjtn_Btn);
    };
    QQ_wcjtn_Game_wcjtn_FailViewTemplate.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._back_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Back_wcjtn_Btn);
        this._continue_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Continue_wcjtn_Btn);
    };
    QQ_wcjtn_Game_wcjtn_FailViewTemplate.prototype.on_wcjtn_Back_wcjtn_Btn = function () {
        if (!this._click_wcjtn_Tag && WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var self = this;
            if (!this._click_wcjtn_TimingTag) {
                this._click_wcjtn_TimingTag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000, this, this.Btn_wcjtn_Up);
            }
            return;
        }
        //todo:你的代码
    };
    QQ_wcjtn_Game_wcjtn_FailViewTemplate.prototype.on_wcjtn_Continue_wcjtn_Btn = function () {
        if (!this._click_wcjtn_Tag && WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var self = this;
            if (!this._click_wcjtn_TimingTag) {
                this._click_wcjtn_TimingTag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000, this, this.Btn_wcjtn_Up);
            }
            return;
        }
        //todo:你的代码
    };
    QQ_wcjtn_Game_wcjtn_FailViewTemplate.prototype.Banner_wcjtn_Up = function () {
        //todo：显示Banner
    };
    QQ_wcjtn_Game_wcjtn_FailViewTemplate.prototype.Btn_wcjtn_Up = function () {
        this._click_wcjtn_Tag = true;
        this._back_wcjtn_Btn.y = 720;
        this._continue_wcjtn_Btn.y = 720;
    };
    QQ_wcjtn_Game_wcjtn_FailViewTemplate.prototype.onDestroy = function () {
        //todo：隐藏Banner
    };
    return QQ_wcjtn_Game_wcjtn_FailViewTemplate;
}(QQTemplateViewBase_1.default));
exports.default = QQ_wcjtn_Game_wcjtn_FailViewTemplate;
},{"../../../AppConfig":2,"../../../Config/AppSwitchConfig":6,"../../../Mgr/WudianMgr":36,"../../../QQMiniGameAPI":74,"../../../Utilit":81,"../QQTemplateViewBase":98}],93:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var Utilit_1 = require("../../../Utilit");
var QQTemplateViewBase_1 = require("../QQTemplateViewBase");
var QQMiniGameAPI_1 = require("../../../QQMiniGameAPI");
var AppConfig_1 = require("../../../AppConfig");
var QQ_wcjtn_GameWinView_wcjtn_Template = /** @class */ (function (_super) {
    __extends(QQ_wcjtn_GameWinView_wcjtn_Template, _super);
    function QQ_wcjtn_GameWinView_wcjtn_Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._back_wcjtn_Btn = null;
        _this._next_wcjtn_Btn = null;
        _this._click_wcjtn_Tag = false;
        _this._click_wcjtn_TimingTag = false;
        return _this;
    }
    QQ_wcjtn_GameWinView_wcjtn_Template.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        if (Utilit_1.default.is_wcjtn_IphoneX()) {
            this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
        }
        this._back_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("BackBtn");
        this._next_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("NextBtn");
    };
    QQ_wcjtn_GameWinView_wcjtn_Template.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        var self = this;
        if (WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag && AppConfig_1.default.Versions_wcjtn_ == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.qq_wcjtn_versions) {
            if (1 == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.wei_wcjtn_yi) {
                var yPos = this._center_wcjtn_Zone.height - 150;
                this._back_wcjtn_Btn.y = yPos;
                this._next_wcjtn_Btn.y = yPos;
            }
            var excute_1 = function () {
                var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, self, self.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000, self, self.Btn_wcjtn_Up);
            };
            if (AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.box == 1) {
                QQMiniGameAPI_1.default.show_wcjtn_App_wcjtn_BoxAd(function () {
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
    QQ_wcjtn_GameWinView_wcjtn_Template.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._back_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Back_wcjtn_Btn);
        this._next_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Next_wcjtn_Btn);
    };
    QQ_wcjtn_GameWinView_wcjtn_Template.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._back_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Back_wcjtn_Btn);
        this._next_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Next_wcjtn_Btn);
    };
    QQ_wcjtn_GameWinView_wcjtn_Template.prototype.on_wcjtn_Back_wcjtn_Btn = function () {
        if (!this._click_wcjtn_Tag && WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var self = this;
            if (!this._click_wcjtn_TimingTag) {
                this._click_wcjtn_TimingTag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000, this, this.Btn_wcjtn_Up);
            }
            return;
        }
        //todo:你的代码
    };
    QQ_wcjtn_GameWinView_wcjtn_Template.prototype.on_wcjtn_Next_wcjtn_Btn = function () {
        if (!this._click_wcjtn_Tag && WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var self = this;
            if (!this._click_wcjtn_TimingTag) {
                this._click_wcjtn_TimingTag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000, this, this.Btn_wcjtn_Up);
            }
            return;
        }
        //todo:你的代码
    };
    QQ_wcjtn_GameWinView_wcjtn_Template.prototype.Banner_wcjtn_Up = function () {
        //todo：显示Banner
    };
    QQ_wcjtn_GameWinView_wcjtn_Template.prototype.Btn_wcjtn_Up = function () {
        this._click_wcjtn_Tag = true;
        this._back_wcjtn_Btn.y = 720;
        this._next_wcjtn_Btn.y = 720;
    };
    QQ_wcjtn_GameWinView_wcjtn_Template.prototype.onDestroy = function () {
        //todo：隐藏Banner
    };
    return QQ_wcjtn_GameWinView_wcjtn_Template;
}(QQTemplateViewBase_1.default));
exports.default = QQ_wcjtn_GameWinView_wcjtn_Template;
},{"../../../AppConfig":2,"../../../Config/AppSwitchConfig":6,"../../../Mgr/WudianMgr":36,"../../../QQMiniGameAPI":74,"../../../Utilit":81,"../QQTemplateViewBase":98}],94:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utilit_1 = require("../../../Utilit");
var QQTemplateViewBase_1 = require("../QQTemplateViewBase");
var QQ_wcjtn_InGame_wcjtn_ViewTemplate = /** @class */ (function (_super) {
    __extends(QQ_wcjtn_InGame_wcjtn_ViewTemplate, _super);
    function QQ_wcjtn_InGame_wcjtn_ViewTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        return _this;
    }
    QQ_wcjtn_InGame_wcjtn_ViewTemplate.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
        else {
            this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top - 200;
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
    };
    QQ_wcjtn_InGame_wcjtn_ViewTemplate.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
    };
    QQ_wcjtn_InGame_wcjtn_ViewTemplate.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
    };
    QQ_wcjtn_InGame_wcjtn_ViewTemplate.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
    };
    return QQ_wcjtn_InGame_wcjtn_ViewTemplate;
}(QQTemplateViewBase_1.default));
exports.default = QQ_wcjtn_InGame_wcjtn_ViewTemplate;
},{"../../../Utilit":81,"../QQTemplateViewBase":98}],95:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../../Event/EventMgr");
var EventDef_1 = require("../../../Event/EventDef");
var User_1 = require("../../../User/User");
var Utilit_1 = require("../../../Utilit");
var QQTemplateViewBase_1 = require("../QQTemplateViewBase");
var QQMiniGameAPI_1 = require("../../../QQMiniGameAPI");
var QQ_wcjtn_Main_wcjtn_View_wcjtn_Template = /** @class */ (function (_super) {
    __extends(QQ_wcjtn_Main_wcjtn_View_wcjtn_Template, _super);
    function QQ_wcjtn_Main_wcjtn_View_wcjtn_Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._start_wcjtn_Btn = null;
        _this._level_wcjtn_Num = null;
        _this._money_wcjtn_Num = null;
        _this._more_wcjtn_Game_wcjtn_Btn = null;
        return _this;
    }
    QQ_wcjtn_Main_wcjtn_View_wcjtn_Template.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        this._more_wcjtn_Game_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("MoreGameBtn");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
        else {
            //this._center_wcjtn_Zone.top =  this._center_wcjtn_Zone.top - 200;
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
        this._start_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("StartBtn");
        this._level_wcjtn_Num = this._center_wcjtn_Zone.getChildByName("LevelInfo").getChildByName("LevelNum");
        this._money_wcjtn_Num = this._center_wcjtn_Zone.getChildByName("MoneyInfo").getChildByName("MoneyNum");
    };
    QQ_wcjtn_Main_wcjtn_View_wcjtn_Template.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        this._money_wcjtn_Num.value = String(User_1.default.get_wcjtn_Money());
        this._level_wcjtn_Num.value = String(User_1.default.get_wcjtn_LeveNum());
    };
    QQ_wcjtn_Main_wcjtn_View_wcjtn_Template.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._start_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Start_wcjtn_Btn);
        this._more_wcjtn_Game_wcjtn_Btn.on(Laya.Event.CLICK, this, this.onMore_wcjtn_Game_wcjtn_Btn);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change, this, this.on_wcjtn_User_wcjtn_MoneyChange);
    };
    QQ_wcjtn_Main_wcjtn_View_wcjtn_Template.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._start_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Start_wcjtn_Btn);
        this._more_wcjtn_Game_wcjtn_Btn.off(Laya.Event.CLICK, this, this.onMore_wcjtn_Game_wcjtn_Btn);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change, this, this.on_wcjtn_User_wcjtn_MoneyChange);
    };
    QQ_wcjtn_Main_wcjtn_View_wcjtn_Template.prototype.on_wcjtn_Start_wcjtn_Btn = function () {
    };
    QQ_wcjtn_Main_wcjtn_View_wcjtn_Template.prototype.onMore_wcjtn_Game_wcjtn_Btn = function () {
        QQMiniGameAPI_1.default.show_wcjtn_App_wcjtn_BoxAd(function () {
        });
    };
    QQ_wcjtn_Main_wcjtn_View_wcjtn_Template.prototype.on_wcjtn_User_wcjtn_MoneyChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._money_wcjtn_Num.value = String(curr);
    };
    return QQ_wcjtn_Main_wcjtn_View_wcjtn_Template;
}(QQTemplateViewBase_1.default));
exports.default = QQ_wcjtn_Main_wcjtn_View_wcjtn_Template;
},{"../../../Event/EventDef":9,"../../../Event/EventMgr":10,"../../../QQMiniGameAPI":74,"../../../User/User":80,"../../../Utilit":81,"../QQTemplateViewBase":98}],96:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../../View/ViewBase");
var EventDef_1 = require("../../../Event/EventDef");
var EventMgr_1 = require("../../../Event/EventMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var CachedQQBannerAd_1 = require("../../../CachedQQBannerAd");
var AppConfig_1 = require("../../../AppConfig");
var QQ_wcjtn_Crazy_wcjtn_Click = /** @class */ (function (_super) {
    __extends(QQ_wcjtn_Crazy_wcjtn_Click, _super);
    function QQ_wcjtn_Crazy_wcjtn_Click() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._click_wcjtn_Bar = null;
        _this._total_wcjtn_Click_wcjtn_Timer = 15; //用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
        _this._need_wcjtn_Click_wcjtn_Time = 10; //一共点多少次能够获得奖励，用于显示进度条
        _this._banner_wcjtn_ClickTime = Math.floor(Math.random() * 5) + 2; //点多少次开始显示bannerr套路用户 
        return _this;
    }
    QQ_wcjtn_Crazy_wcjtn_Click.prototype.onAwake = function () {
        var _this = this;
        this._click_wcjtn__Btn = this.owner.getChildByName("Click_Btn");
        this._click_wcjtn__Btn.on(Laya.Event.CLICK, this, this.ButtonClicked);
        this._arrow_wcjtn__Img = this._click_wcjtn__Btn.getChildByName("Arrow_Img");
        this._getPrize_wcjtn__View = this.owner.getChildByName("GetPrize_View");
        this._prizeCount_wcjtn__Text = this._getPrize_wcjtn__View.getChildByName("PrizeCount_Text");
        this._confirm__wcjtn_Btn = this._getPrize_wcjtn__View.getChildByName("Confirm_Btn");
        this._getPrize_wcjtn__View.visible = false;
        this._click_wcjtn_Bar = this.owner.getChildByName("ClickBar").getChildByName("ClickBar");
        this._click_wcjtn_BarOriginal_wcjtn_Width = this._click_wcjtn_Bar.width;
        this._click_wcjtn_Bar.width = 0;
        this._click_wcjtn_Time = 0;
        this._total_wcjtn_Click_wcjtn_Time = 0;
        var self = this;
        Laya.loader.load("ClickGetPrize/quanji.png", Laya.Handler.create(this, function (texture) {
            texture.bitmap.lock = true;
            Laya.loader.load("ClickGetPrize/quanji.sk", Laya.Handler.create(_this, function (bytes) {
                console.log("texture", texture);
                console.log("bytes", bytes);
                var template = new Laya.Templet();
                template.parseData(texture, bytes);
                self.drgon_wcjtn_ = template.buildArmature();
                self.owner.addChild(self.drgon_wcjtn_);
                self.drgon_wcjtn_.x = 375;
                self.drgon_wcjtn_.y = 610;
                self.drgon_wcjtn_.scaleX = 2;
                self.drgon_wcjtn_.scaleY = 2;
                self.drgon_wcjtn_.parent.setChildIndex(self.drgon_wcjtn_, 1);
                self.drgon_wcjtn_.play(0, true);
                console.log("quanji 加载完成!!!!", template);
            }), Laya.Handler.create(_this, function () { }), "", 0, false, "", true);
        }), Laya.Handler.create(this, function () { }), "", 0, false, "", true);
    };
    QQ_wcjtn_Crazy_wcjtn_Click.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        Laya.stage.on(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
    };
    QQ_wcjtn_Crazy_wcjtn_Click.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        Laya.stage.off(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
    };
    QQ_wcjtn_Crazy_wcjtn_Click.prototype.onUpdate = function () {
        if (this._arrow_wcjtn_Up) {
            this._arrow_wcjtn__Img.top += Laya.timer.delta / 5;
            if (this._arrow_wcjtn__Img.top > -140) {
                this._arrow_wcjtn_Up = false;
            }
        }
        else {
            this._arrow_wcjtn__Img.top -= Laya.timer.delta / 5;
            if (this._arrow_wcjtn__Img.top < -180) {
                this._arrow_wcjtn_Up = true;
            }
        }
        if (!this._banner_wcjtn_Clicked) {
            var spd = 2 + (this._click_wcjtn_Bar.width / this._click_wcjtn_BarOriginal_wcjtn_Width) * 4;
            if (this._click_wcjtn_Bar.width >= spd) {
                this._click_wcjtn_Bar.width -= spd;
            }
            if ((this._click_wcjtn_Bar.width / this._click_wcjtn_BarOriginal_wcjtn_Width) + 0.1 < (this._click_wcjtn_Time / this._need_wcjtn_Click_wcjtn_Time)) {
                this._click_wcjtn_Time--;
            }
        }
    };
    QQ_wcjtn_Crazy_wcjtn_Click.prototype.open_wcjtn_View = function (data) {
        this._compelet_wcjtn_Function = data.Complete;
        this._prize_wcjtn_Count = data.PrizeCount;
        _super.prototype.open_wcjtn_View.call(this, data);
    };
    QQ_wcjtn_Crazy_wcjtn_Click.prototype.Open_wcjtn_PrizeWindow = function () {
        var self = this;
        this._prizeCount_wcjtn__Text.text = this._prize_wcjtn_Count.toString();
        this._getPrize_wcjtn__View.visible = true;
        this._confirm__wcjtn_Btn.once(Laya.Event.CLICK, this, function () {
            CachedQQBannerAd_1.default.hide();
            if (self._compelet_wcjtn_Function) {
                self._compelet_wcjtn_Function();
            }
            self.close_wcjtn_View();
        });
    };
    QQ_wcjtn_Crazy_wcjtn_Click.prototype.Show_wcjtn_Banner = function () {
        if (AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.kuang_wcjtn_dian_wcjtn_Banner == 1
            && AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.qq_wcjtn_versions) {
            CachedQQBannerAd_1.default._wcjtn_show_wcjtn_();
        }
    };
    QQ_wcjtn_Crazy_wcjtn_Click.prototype.ButtonClicked = function () {
        var _this = this;
        this._click_wcjtn_Time++;
        this._total_wcjtn_Click_wcjtn_Time++;
        if (null != this.drgon_wcjtn_) {
            this.drgon_wcjtn_.play(1, false);
            this.drgon_wcjtn_.once(Laya.Event.STOPPED, this, function () {
                _this.drgon_wcjtn_.play(0, true);
            });
        }
        if (this._click_wcjtn_Time > this._need_wcjtn_Click_wcjtn_Time) {
            this._click_wcjtn_Time = this._need_wcjtn_Click_wcjtn_Time;
        }
        if (this._click_wcjtn_Time >= this._banner_wcjtn_ClickTime) {
            if (this._click_wcjtn_Time >= this._need_wcjtn_Click_wcjtn_Time) {
                this._click_wcjtn_Time = this._need_wcjtn_Click_wcjtn_Time - 1;
            }
            if (this._banner_wcjtn_Clicked) {
                return;
            }
            this._banner_wcjtn_Clicked = true;
            this.Show_wcjtn_Banner();
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        else if (this._total_wcjtn_Click_wcjtn_Time > this._total_wcjtn_Click_wcjtn_Timer) {
            this.Show_wcjtn_Banner();
            this.Banner_wcjtn_Clicked();
        }
        var progress = (this._click_wcjtn_Time / this._need_wcjtn_Click_wcjtn_Time) * this._click_wcjtn_BarOriginal_wcjtn_Width;
        this._click_wcjtn_Bar.width = progress;
    };
    QQ_wcjtn_Crazy_wcjtn_Click.prototype.Banner_wcjtn_Clicked = function () {
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_Wu_wcjtn_dian_wcjtn_Banner__wcjtn_Hide);
        this._banner_wcjtn_Clicked = true;
        this._click_wcjtn_Time = this._need_wcjtn_Click_wcjtn_Time;
        this._click_wcjtn_Bar.width = this._click_wcjtn_BarOriginal_wcjtn_Width;
        this._click_wcjtn__Btn.visible = false;
        this.Open_wcjtn_PrizeWindow();
    };
    QQ_wcjtn_Crazy_wcjtn_Click.prototype.onDestroy = function () {
        if (AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.kuang_wcjtn_dian_wcjtn_Banner == 1
            && AppConfig_1.default.Versions_wcjtn_ == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.qq_wcjtn_versions) {
            CachedQQBannerAd_1.default.hide();
        }
    };
    QQ_wcjtn_Crazy_wcjtn_Click.prototype.onFocusChange = function () {
        if (null != this.drgon_wcjtn_) {
            this.drgon_wcjtn_.play(0, true);
        }
    };
    return QQ_wcjtn_Crazy_wcjtn_Click;
}(ViewBase_1.default));
exports.default = QQ_wcjtn_Crazy_wcjtn_Click;
},{"../../../AppConfig":2,"../../../CachedQQBannerAd":3,"../../../Config/AppSwitchConfig":6,"../../../Event/EventDef":9,"../../../Event/EventMgr":10,"../../../View/ViewBase":130}],97:[function(require,module,exports){
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
        _this._click_wcjtn_Bar = null;
        _this._total_wcjtn_ClickTimer = 15; //用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
        _this._need_wcjtn_ClickTime = 10; //一共点多少次能够获得奖励，用于显示进度条
        _this._banner_wcjtn_ClickTime = Math.floor(Math.random() * 5) + 2; //点多少次开始显示bannerr套路用户   
        _this._click_wcjtn_Btn = null;
        return _this;
    }
    QQCrazyClick2.prototype.onAwake = function () {
        this._getPrize_wcjtn__View = this.owner.getChildByName("GetPrize_View");
        this._prize_wcjtn_Count_Text = this._getPrize_wcjtn__View.getChildByName("PrizeCount_Text");
        this._confirm_wcjtn__Btn = this._getPrize_wcjtn__View.getChildByName("Confirm_Btn");
        this._getPrize_wcjtn__View.visible = false;
        this._click_wcjtn_Bar = this.owner.getChildByName("ClickBar").getChildByName("ClickBar");
        this._click_wcjtn_BarOriginalWidth = this._click_wcjtn_Bar.width;
        this._click_wcjtn_Bar.width = 0;
        this._click_wcjtn_Time = 0;
        this._total_wcjtn_ClickTime = 0;
        var self = this;
        Laya.loader.load("ClickGetPrize/quanji.png", Laya.Handler.create(self, function (texture) {
            texture.bitmap.lock = true;
            Laya.loader.load("ClickGetPrize/quanji.sk", Laya.Handler.create(self, function (bytes) {
                var template = new Laya.Templet();
                template.parseData(texture, bytes);
                self.drgon_wcjtn_ = template.buildArmature();
                self.owner.addChild(self.drgon_wcjtn_);
                self.drgon_wcjtn_.x = 375;
                self.drgon_wcjtn_.y = 610;
                self.drgon_wcjtn_.scaleX = 2;
                self.drgon_wcjtn_.scaleY = 2;
                self.drgon_wcjtn_.parent.setChildIndex(self.drgon_wcjtn_, 1);
                self.drgon_wcjtn_.play(0, true);
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
                self._click_wcjtn_Btn = new Laya.Clip();
                self.owner.addChild(self._click_wcjtn_Btn);
                self._click_wcjtn_Btn.x = 360 - 100,
                    self._click_wcjtn_Btn.y = 617 - 100,
                    self._click_wcjtn_Btn.width = 200,
                    self._click_wcjtn_Btn.height = 200,
                    self._click_wcjtn_Btn.parent.setChildIndex(self._click_wcjtn_Btn, 3);
                self._click_wcjtn_Btn.on(Laya.Event.CLICK, self, self.ButtonClicked);
                console.log("手指动画 加载完成!!!!", template);
            }), Laya.Handler.create(self, function () { }), "", 0, false, "", true);
        }), Laya.Handler.create(self, function () { }), "", 0, false, "", true);
    };
    QQCrazyClick2.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        Laya.stage.on(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
    };
    QQCrazyClick2.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        Laya.stage.off(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
    };
    QQCrazyClick2.prototype.onUpdate = function () {
        if (!this._banner_wcjtn_Clicked) {
            var spd = 2 + (this._click_wcjtn_Bar.width / this._click_wcjtn_BarOriginalWidth) * 4;
            if (this._click_wcjtn_Bar.width >= spd) {
                this._click_wcjtn_Bar.width -= spd;
            }
            if ((this._click_wcjtn_Bar.width / this._click_wcjtn_BarOriginalWidth) + 0.1 < (this._click_wcjtn_Time / this._need_wcjtn_ClickTime)) {
                this._click_wcjtn_Time--;
            }
        }
    };
    QQCrazyClick2.prototype.open_wcjtn_View = function (data) {
        this._compelet_wcjtn_Function = data.Complete;
        this._prize_wcjtn_Count = data.PrizeCount;
        _super.prototype.open_wcjtn_View.call(this, data);
    };
    QQCrazyClick2.prototype.Open_wcjtn_Prize_wcjtn_Window = function () {
        var self = this;
        this._prize_wcjtn_Count_Text.text = this._prize_wcjtn_Count.toString();
        this._getPrize_wcjtn__View.visible = true;
        this._confirm_wcjtn__Btn.once(Laya.Event.CLICK, this, function () {
            if (self._compelet_wcjtn_Function) {
                self._compelet_wcjtn_Function();
            }
            self.close_wcjtn_View();
        });
    };
    QQCrazyClick2.prototype.Show_wcjtn_Banner = function () {
        if (AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.kuangdian_wcjtn_Box == 1
            && AppConfig_1.default.Versions_wcjtn_ == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().qq_wcjtn_cfg.qq_wcjtn_versions) {
            QQMiniGameAPI_1.default.show_wcjtn_App_wcjtn_BoxAd(function () {
            });
        }
    };
    QQCrazyClick2.prototype.ButtonClicked = function () {
        var _this = this;
        this._click_wcjtn_Time++;
        this._total_wcjtn_ClickTime++;
        if (null != this.drgon_wcjtn_) {
            this.drgon_wcjtn_.play(1, false);
            this.drgon_wcjtn_.once(Laya.Event.STOPPED, this, function () {
                _this.drgon_wcjtn_.play(0, true);
            });
        }
        if (this._click_wcjtn_Time > this._need_wcjtn_ClickTime) {
            this._click_wcjtn_Time = this._need_wcjtn_ClickTime;
        }
        if (this._click_wcjtn_Time >= this._banner_wcjtn_ClickTime) {
            if (this._click_wcjtn_Time >= this._need_wcjtn_ClickTime) {
                this._click_wcjtn_Time = this._need_wcjtn_ClickTime - 1;
            }
            if (this._banner_wcjtn_Clicked) {
                return;
            }
            this._banner_wcjtn_Clicked = true;
            this.Show_wcjtn_Banner();
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        else if (this._total_wcjtn_ClickTime > this._total_wcjtn_ClickTimer) {
            this.Show_wcjtn_Banner();
            this.Banner_wcjtn_Clicked();
        }
        var progress = (this._click_wcjtn_Time / this._need_wcjtn_ClickTime) * this._click_wcjtn_BarOriginalWidth;
        this._click_wcjtn_Bar.width = progress;
    };
    QQCrazyClick2.prototype.Banner_wcjtn_Clicked = function () {
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_Wu_wcjtn_dian_wcjtn_Banner__wcjtn_Hide);
        this._banner_wcjtn_Clicked = true;
        this._click_wcjtn_Time = this._need_wcjtn_ClickTime;
        this._click_wcjtn_Bar.width = this._click_wcjtn_BarOriginalWidth;
        this._click_wcjtn_Btn.visible = false;
        this.Open_wcjtn_Prize_wcjtn_Window();
    };
    QQCrazyClick2.prototype.onDestroy = function () {
    };
    QQCrazyClick2.prototype.onFocusChange = function () {
        if (null != this.drgon_wcjtn_) {
            this.drgon_wcjtn_.play(0, true);
        }
    };
    return QQCrazyClick2;
}(ViewBase_1.default));
exports.default = QQCrazyClick2;
},{"../../../AppConfig":2,"../../../Config/AppSwitchConfig":6,"../../../Event/EventDef":9,"../../../Event/EventMgr":10,"../../../QQMiniGameAPI":74,"../../../View/ViewBase":130}],98:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var QQ_wcjtn_Template_wcjtn_ViewBase = /** @class */ (function (_super) {
    __extends(QQ_wcjtn_Template_wcjtn_ViewBase, _super);
    function QQ_wcjtn_Template_wcjtn_ViewBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QQ_wcjtn_Template_wcjtn_ViewBase.prototype.onAwake = function () {
    };
    QQ_wcjtn_Template_wcjtn_ViewBase.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
    };
    QQ_wcjtn_Template_wcjtn_ViewBase.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
    };
    return QQ_wcjtn_Template_wcjtn_ViewBase;
}(ViewBase_1.default));
exports.default = QQ_wcjtn_Template_wcjtn_ViewBase;
},{"../ViewBase":130}],99:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var Utilit_1 = require("../../../Utilit");
var TTTemplateViewBase_1 = require("../TTTemplateViewBase");
var TTAPI_1 = require("../../../TTAPI");
var TTGameFailViewTemplate = /** @class */ (function (_super) {
    __extends(TTGameFailViewTemplate, _super);
    function TTGameFailViewTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._clickTag = false;
        _this._clickTimingTag = false;
        _this._moreGameBtn = null;
        _this._shareBtn = null;
        _this._backBtn = null;
        _this._okBtn = null;
        _this._videoBtn = null;
        return _this;
    }
    TTGameFailViewTemplate.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        if (Utilit_1.default.is_wcjtn_IphoneX()) {
            this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
        }
        this._moreGameBtn = this._center_wcjtn_Zone.getChildByName("MoreGameBtn");
        this._shareBtn = this._center_wcjtn_Zone.getChildByName("ShareBtn");
        this._backBtn = this._center_wcjtn_Zone.getChildByName("BackBtn");
        this._okBtn = this._center_wcjtn_Zone.getChildByName("OkBtn");
        this._videoBtn = this._center_wcjtn_Zone.getChildByName("VideoBtn");
        this._moreGameBtn.visible = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().tt_wcjtn_cfg.more_wcjtn_Game_wcjtn_Switch == 1;
    };
    TTGameFailViewTemplate.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        if (WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var yPos = this._center_wcjtn_Zone.height - 150;
            this._backBtn.y = yPos;
            this._okBtn.y = yPos;
            this._videoBtn.y = yPos;
        }
        var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
        var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
        Laya.timer.once(bannerMoveTimer * 1000, this, this.Banner_wcjtn_Up);
        Laya.timer.once(btnMoveTimer * 1000, this, this.Btn_wcjtn_Up);
        if (AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().tt_wcjtn_cfg.lu_wcjtn_ping == 1) {
            TTAPI_1.default.share_wcjtn_Record(function () {
            }, function () {
            });
        }
    };
    TTGameFailViewTemplate.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._backBtn.on(Laya.Event.CLICK, this, this.on_wcjtn_Back_wcjtn_Btn);
        this._okBtn.on(Laya.Event.CLICK, this, this.on_wcjtn_Ok_wcjtn_Btn);
        this._videoBtn.on(Laya.Event.CLICK, this, this.on_wcjtn_Ok_wcjtn_Btn);
        this._moreGameBtn.on(Laya.Event.CLICK, this, this.on_wcjtn_More_wcjtn_GameBtn);
        this._shareBtn.on(Laya.Event.CLICK, this, this.on_wcjtn_Share_wcjtn_Btn);
    };
    TTGameFailViewTemplate.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._backBtn.off(Laya.Event.CLICK, this, this.on_wcjtn_Back_wcjtn_Btn);
        this._okBtn.off(Laya.Event.CLICK, this, this.on_wcjtn_Ok_wcjtn_Btn);
        this._videoBtn.off(Laya.Event.CLICK, this, this.on_wcjtn_Ok_wcjtn_Btn);
        this._moreGameBtn.off(Laya.Event.CLICK, this, this.on_wcjtn_More_wcjtn_GameBtn);
        this._shareBtn.off(Laya.Event.CLICK, this, this.on_wcjtn_Share_wcjtn_Btn);
    };
    TTGameFailViewTemplate.prototype.on_wcjtn_Back_wcjtn_Btn = function () {
        if (!this._clickTag && WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var self = this;
            if (!this._clickTimingTag) {
                this._clickTimingTag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000, this, this.Btn_wcjtn_Up);
            }
            return;
        }
        //todo:你的代码
    };
    TTGameFailViewTemplate.prototype.on_wcjtn_Ok_wcjtn_Btn = function () {
        if (!this._clickTag && WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var self = this;
            if (!this._clickTimingTag) {
                this._clickTimingTag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000, this, this.Btn_wcjtn_Up);
            }
            return;
        }
        //todo:你的代码
    };
    TTGameFailViewTemplate.prototype.on_wcjtn_Video_wcjtn_Btn = function () {
        if (!this._clickTag && WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var self = this;
            if (!this._clickTimingTag) {
                this._clickTimingTag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000, this, this.Btn_wcjtn_Up);
            }
            return;
        }
        TTAPI_1.default.share_wcjtn_Record(function () {
        }, function () {
        });
    };
    TTGameFailViewTemplate.prototype.Banner_wcjtn_Up = function () {
        TTAPI_1.default.show_wcjtn_Banner();
    };
    TTGameFailViewTemplate.prototype.Btn_wcjtn_Up = function () {
        this._clickTag = true;
        this._backBtn.y = 720;
        this._okBtn.y = 720;
        this._videoBtn.y = 720;
    };
    TTGameFailViewTemplate.prototype.on_wcjtn_More_wcjtn_GameBtn = function () {
        TTAPI_1.default.showMoreGamesModal(function () {
        }, function () {
        });
    };
    TTGameFailViewTemplate.prototype.on_wcjtn_Share_wcjtn_Btn = function () {
        TTAPI_1.default.share_wcjtn_(function () {
        });
    };
    TTGameFailViewTemplate.prototype.onDestroy = function () {
        TTAPI_1.default.hideBanner();
    };
    return TTGameFailViewTemplate;
}(TTTemplateViewBase_1.default));
exports.default = TTGameFailViewTemplate;
},{"../../../Config/AppSwitchConfig":6,"../../../Mgr/WudianMgr":36,"../../../TTAPI":79,"../../../Utilit":81,"../TTTemplateViewBase":112}],100:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TTGameFailViewTemplate_1 = require("../GameFail/TTGameFailViewTemplate");
var TTGame_wcjtn_Win_wcjtn_ViewTemplate = /** @class */ (function (_super) {
    __extends(TTGame_wcjtn_Win_wcjtn_ViewTemplate, _super);
    function TTGame_wcjtn_Win_wcjtn_ViewTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TTGame_wcjtn_Win_wcjtn_ViewTemplate;
}(TTGameFailViewTemplate_1.default));
exports.default = TTGame_wcjtn_Win_wcjtn_ViewTemplate;
},{"../GameFail/TTGameFailViewTemplate":99}],101:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../../Event/EventMgr");
var EventDef_1 = require("../../../Event/EventDef");
var User_1 = require("../../../User/User");
var Utilit_1 = require("../../../Utilit");
var TTTemplateViewBase_1 = require("../TTTemplateViewBase");
var TTAPI_1 = require("../../../TTAPI");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var TT_wcjtn_Main_wcjtn_ViewTemplate = /** @class */ (function (_super) {
    __extends(TT_wcjtn_Main_wcjtn_ViewTemplate, _super);
    function TT_wcjtn_Main_wcjtn_ViewTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._start_wcjtn_Btn = null;
        _this._level_wcjtn_Num = null;
        _this._money_wcjtn_Num = null;
        _this._more_wcjtn_GameBtn = null;
        _this._share_wcjtn_Btn = null;
        return _this;
    }
    TT_wcjtn_Main_wcjtn_ViewTemplate.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        this._more_wcjtn_GameBtn = this._center_wcjtn_Zone.getChildByName("MoreGameBtn");
        this._share_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("ShareBtn");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
        else {
            this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top - 200;
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
        this._start_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("StartBtn");
        this._level_wcjtn_Num = this._center_wcjtn_Zone.getChildByName("LevelInfo").getChildByName("LevelNum");
        this._money_wcjtn_Num = this._center_wcjtn_Zone.getChildByName("MoneyInfo").getChildByName("MoneyNum");
        this._more_wcjtn_GameBtn.visible = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().tt_wcjtn_cfg.more_wcjtn_Game_wcjtn_Switch == 1;
    };
    TT_wcjtn_Main_wcjtn_ViewTemplate.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        this._money_wcjtn_Num.value = String(User_1.default.get_wcjtn_Money());
        this._level_wcjtn_Num.value = String(User_1.default.get_wcjtn_LeveNum());
    };
    TT_wcjtn_Main_wcjtn_ViewTemplate.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._start_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Start_wcjtn_Btn);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change, this, this.on_wcjtn_User_wcjtn_MoneyChange);
        this._more_wcjtn_GameBtn.on(Laya.Event.CLICK, this, this.on_wcjtn_More_wcjtn_GameBtn);
        this._share_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Share_wcjtn_Btn);
    };
    TT_wcjtn_Main_wcjtn_ViewTemplate.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._start_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Start_wcjtn_Btn);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change, this, this.on_wcjtn_User_wcjtn_MoneyChange);
        this._more_wcjtn_GameBtn.off(Laya.Event.CLICK, this, this.on_wcjtn_More_wcjtn_GameBtn);
        this._share_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Share_wcjtn_Btn);
    };
    TT_wcjtn_Main_wcjtn_ViewTemplate.prototype.on_wcjtn_Start_wcjtn_Btn = function () {
    };
    TT_wcjtn_Main_wcjtn_ViewTemplate.prototype.on_wcjtn_More_wcjtn_GameBtn = function () {
        TTAPI_1.default.showMoreGamesModal(function () {
        }, function () {
        });
    };
    TT_wcjtn_Main_wcjtn_ViewTemplate.prototype.on_wcjtn_Share_wcjtn_Btn = function () {
        TTAPI_1.default.share_wcjtn_(function () {
        });
    };
    TT_wcjtn_Main_wcjtn_ViewTemplate.prototype.on_wcjtn_User_wcjtn_MoneyChange = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._money_wcjtn_Num.value = String(curr);
    };
    return TT_wcjtn_Main_wcjtn_ViewTemplate;
}(TTTemplateViewBase_1.default));
exports.default = TT_wcjtn_Main_wcjtn_ViewTemplate;
},{"../../../Config/AppSwitchConfig":6,"../../../Event/EventDef":9,"../../../Event/EventMgr":10,"../../../TTAPI":79,"../../../User/User":80,"../../../Utilit":81,"../TTTemplateViewBase":112}],102:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TTTemplateViewBase_1 = require("../TTTemplateViewBase");
var TTAPI_1 = require("../../../TTAPI");
var Utilit_1 = require("../../../Utilit");
var TT_wcjtn_More_wcjtn_Reward = /** @class */ (function (_super) {
    __extends(TT_wcjtn_More_wcjtn_Reward, _super);
    function TT_wcjtn_More_wcjtn_Reward() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._ad_wcjtn_Toggle = null;
        _this._ad_wcjtn_ToggleTag = null;
        _this._reward_wcjtn_Btn = null;
        _this._share_wcjtn_Btn = null;
        _this._ad_wcjtn_ing = false; //是否正在看视频中
        return _this;
    }
    TT_wcjtn_More_wcjtn_Reward.prototype.onAwake = function () {
        this._topZone = this.View_wcjtn_.getChildByName("TopZone");
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
        this._ad_wcjtn_Toggle = this._center_wcjtn_Zone.getChildByName("AdToggle");
        this._ad_wcjtn_ToggleTag = this._ad_wcjtn_Toggle.getChildByName("Tag");
        this._ad_wcjtn_ToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this._reward_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("RewardBtn");
        this._share_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("ShareBtn");
    };
    TT_wcjtn_More_wcjtn_Reward.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._reward_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Resurrection_wcjtn_Btn);
        this._ad_wcjtn_Toggle.on(Laya.Event.CLICK, this, this.on_wcjtn_Ad_wcjtn_Toggle);
        this._share_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Share_wcjtn_Btn);
    };
    TT_wcjtn_More_wcjtn_Reward.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._reward_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Resurrection_wcjtn_Btn);
        this._ad_wcjtn_Toggle.off(Laya.Event.CLICK, this, this.on_wcjtn_Ad_wcjtn_Toggle);
        this._share_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Share_wcjtn_Btn);
    };
    TT_wcjtn_More_wcjtn_Reward.prototype.on_wcjtn_Resurrection_wcjtn_Btn = function () {
        if (this._ad_wcjtn_ing)
            return; //看视频中点击无效
        this._ad_wcjtn_ing = true;
        var self = this;
        if (this._ad_wcjtn_ToggleTag.visible) {
            TTAPI_1.default.show_wcjtn_Rewarded_wcjtn_VideoAd(function (ok) {
                if (ok) {
                    //todo:看视频成功
                    //todo:多倍奖励
                }
                else {
                    //todo:未完整观看视频
                    self._ad_wcjtn_ing = false;
                }
            }, function () {
                //todo:看视屏失败
                self._ad_wcjtn_ing = false;
            });
        }
        else {
            //todo:正常奖励
        }
    };
    TT_wcjtn_More_wcjtn_Reward.prototype.on_wcjtn_Ad_wcjtn_Toggle = function () {
        if (this._ad_wcjtn_ing)
            return; //看视频中点击无效
        this._ad_wcjtn_ToggleTag.visible = !this._ad_wcjtn_ToggleTag.visible;
    };
    TT_wcjtn_More_wcjtn_Reward.prototype.on_wcjtn_Share_wcjtn_Btn = function () {
        TTAPI_1.default.share_wcjtn_Record(function () {
            //todo:分享成功
        }, function () {
            //todo:分享失败
        });
    };
    return TT_wcjtn_More_wcjtn_Reward;
}(TTTemplateViewBase_1.default));
exports.default = TT_wcjtn_More_wcjtn_Reward;
},{"../../../TTAPI":79,"../../../Utilit":81,"../TTTemplateViewBase":112}],103:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TTTemplateViewBase_1 = require("../TTTemplateViewBase");
var TTAPI_1 = require("../../../TTAPI");
var Utilit_1 = require("../../../Utilit");
//抖音复活界面
var TT_wcjtn_Resurrection = /** @class */ (function (_super) {
    __extends(TT_wcjtn_Resurrection, _super);
    function TT_wcjtn_Resurrection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._ad_wcjtn_Toggle = null;
        _this._ad_wcjtn_ToggleTag = null;
        _this._resurrection_wcjtn_Btn = null;
        _this._skip_wcjtn_Btn = null;
        _this._skip_wcjtn_OkTag = null;
        _this._skip_wcjtn_NoTag = null;
        _this._ad_wcjtn_ing = false; //是否正在看视频中
        return _this;
    }
    TT_wcjtn_Resurrection.prototype.onAwake = function () {
        this._topZone = this.View_wcjtn_.getChildByName("TopZone");
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
        this._ad_wcjtn_Toggle = this._center_wcjtn_Zone.getChildByName("AdToggle");
        this._ad_wcjtn_ToggleTag = this._ad_wcjtn_Toggle.getChildByName("Tag");
        this._resurrection_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("ResurrectionBtn");
        this._skip_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("SkipBtn");
        this._skip_wcjtn_OkTag = this._skip_wcjtn_Btn.getChildByName("Ok");
        this._skip_wcjtn_NoTag = this._skip_wcjtn_Btn.getChildByName("No");
        this._ad_wcjtn_ToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.on_wcjtn_AdToggle_wcjtn_StateChange(this._ad_wcjtn_ToggleTag.visible);
    };
    TT_wcjtn_Resurrection.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._resurrection_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Resurrection_wcjtn_Btn);
        this._ad_wcjtn_Toggle.on(Laya.Event.CLICK, this, this.on_wcjtn_Ad_wcjtn_Toggle);
        this._skip_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_SkipBtn);
    };
    TT_wcjtn_Resurrection.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._resurrection_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Resurrection_wcjtn_Btn);
        this._ad_wcjtn_Toggle.off(Laya.Event.CLICK, this, this.on_wcjtn_Ad_wcjtn_Toggle);
        this._skip_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_SkipBtn);
    };
    TT_wcjtn_Resurrection.prototype.on_wcjtn_Resurrection_wcjtn_Btn = function () {
        if (this._ad_wcjtn_ing)
            return; //看视频中点击无效
        this._ad_wcjtn_ing = true;
        var self = this;
        TTAPI_1.default.show_wcjtn_Rewarded_wcjtn_VideoAd(function (ok) {
            if (ok) {
                //todo:看视频成功
                //todo:复活
            }
            else {
                //todo:未完整观看视频
                self._ad_wcjtn_ing = false;
            }
        }, function () {
            //todo:看视屏失败
            self._ad_wcjtn_ing = false;
        });
    };
    TT_wcjtn_Resurrection.prototype.on_wcjtn_Ad_wcjtn_Toggle = function () {
        if (this._ad_wcjtn_ing)
            return; //看视频中点击无效
        this._ad_wcjtn_ToggleTag.visible = !this._ad_wcjtn_ToggleTag.visible;
        this.on_wcjtn_AdToggle_wcjtn_StateChange(this._ad_wcjtn_ToggleTag.visible);
    };
    TT_wcjtn_Resurrection.prototype.on_wcjtn_SkipBtn = function () {
        if (this._ad_wcjtn_ing)
            return; //看视频中点击无效
        this._ad_wcjtn_ing = true;
        var self = this;
        if (this._ad_wcjtn_ToggleTag.visible) {
            TTAPI_1.default.show_wcjtn_Rewarded_wcjtn_VideoAd(function (ok) {
                if (ok) {
                    //todo:看视频成功
                    //todo:复活
                }
                else {
                    //todo:未完整观看视频
                    self._ad_wcjtn_ing = false;
                }
            }, function () {
                //todo:看视屏失败
                self._ad_wcjtn_ing = false;
            });
        }
        else {
            //todo:跳过
        }
    };
    TT_wcjtn_Resurrection.prototype.on_wcjtn_AdToggle_wcjtn_StateChange = function (visible) {
        if (visible) {
            this._skip_wcjtn_OkTag.visible = true;
            this._skip_wcjtn_NoTag.visible = false;
        }
        else {
            this._skip_wcjtn_OkTag.visible = false;
            this._skip_wcjtn_NoTag.visible = true;
        }
    };
    return TT_wcjtn_Resurrection;
}(TTTemplateViewBase_1.default));
exports.default = TT_wcjtn_Resurrection;
},{"../../../TTAPI":79,"../../../Utilit":81,"../TTTemplateViewBase":112}],104:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RewardBox = /** @class */ (function (_super) {
    __extends(RewardBox, _super);
    function RewardBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._view_wcjtn_ = null;
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
        this._view_wcjtn_ = view;
        this._adTag = this.owner.getChildByName("AdTag");
    };
    RewardBox.prototype.onEnable = function () {
        this.owner.on(Laya.Event.CLICK, this, this.on_wcjtn_SelfClick);
    };
    RewardBox.prototype.onDisable = function () {
        this.owner.off(Laya.Event.CLICK, this, this.on_wcjtn_SelfClick);
    };
    RewardBox.prototype.on_wcjtn_SelfClick = function () {
        if (null != this._view_wcjtn_) {
            this._view_wcjtn_.onRewardBoxClick(this);
        }
    };
    return RewardBox;
}(Laya.Script));
exports.default = RewardBox;
},{}],105:[function(require,module,exports){
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
        _this._center_wcjtn_Zone = null;
        _this._reward_wcjtn_Boxs = [];
        _this._keys_wcjtn_Root = null;
        _this._keys_wcjtn_ = [];
        _this._key_wcjtn_Count = 3; //钥匙数量
        _this._get_wcjtn_KeyZone = null;
        _this._ad_wcjtn_Toggle = null;
        _this._ad_wcjtn_ToggleTag = null;
        _this._getKey_wcjtn_Btn = null;
        _this._skip_wcjtn_Btn = null;
        _this._skip_wcjtn_OkTag = null;
        _this._skip_wcjtn_NoTag = null;
        _this._getKey_wcjtn_Times = 1; //获取钥匙机会
        _this._ad_wcjtn_ing = false; //是否正在看视频中
        return _this;
    }
    TTReward.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._topZone = this.View_wcjtn_.getChildByName("TopZone");
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
        this._get_wcjtn_KeyZone = this._center_wcjtn_Zone.getChildByName("GetKeyZone");
        this._ad_wcjtn_Toggle = this._get_wcjtn_KeyZone.getChildByName("AdToggle");
        this._ad_wcjtn_ToggleTag = this._ad_wcjtn_Toggle.getChildByName("Tag");
        this._getKey_wcjtn_Btn = this._get_wcjtn_KeyZone.getChildByName("GetKeyBtn");
        this._skip_wcjtn_Btn = this._get_wcjtn_KeyZone.getChildByName("SkipBtn");
        this._skip_wcjtn_OkTag = this._skip_wcjtn_Btn.getChildByName("Ok");
        this._skip_wcjtn_NoTag = this._skip_wcjtn_Btn.getChildByName("No");
        this._ad_wcjtn_ToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.on_wcjtn_AdToggle_wcjtn_StateChange(this._ad_wcjtn_ToggleTag.visible);
        var boxsRoot = this._center_wcjtn_Zone.getChildByName("BoxsRoot");
        var indexs = [];
        for (var i = 0; i < boxsRoot.numChildren; ++i) {
            var boxObj = boxsRoot.getChildAt(i);
            var rewardBox = boxObj.getComponent(RewardBox_1.default);
            rewardBox.init(this);
            rewardBox.AdTag.visible = false;
            this._reward_wcjtn_Boxs.push(rewardBox);
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
            this._reward_wcjtn_Boxs[indexs.shift()].AdTag.visible = true;
        }
        this._keys_wcjtn_Root = this._center_wcjtn_Zone.getChildByName("KeysRoot");
        for (var i = 0; i < this._keys_wcjtn_Root.numChildren; ++i) {
            var key = this._keys_wcjtn_Root.getChildAt(i);
            this._keys_wcjtn_.push(key);
        }
        this.refreshKeyState();
    };
    TTReward.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._getKey_wcjtn_Btn.on(Laya.Event.CLICK, this, this.onGetKeyBtn);
        this._ad_wcjtn_Toggle.on(Laya.Event.CLICK, this, this.onAdToggle);
        this._skip_wcjtn_Btn.on(Laya.Event.CLICK, this, this.onSkipText);
    };
    TTReward.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._getKey_wcjtn_Btn.off(Laya.Event.CLICK, this, this.onGetKeyBtn);
        this._ad_wcjtn_Toggle.off(Laya.Event.CLICK, this, this.onAdToggle);
        this._skip_wcjtn_Btn.off(Laya.Event.CLICK, this, this.onSkipText);
    };
    TTReward.prototype.onRewardBoxClick = function (box) {
        if (this._ad_wcjtn_ing) {
            return; //看视频中点击无效
        }
        if (box.AdTag.visible) //视频标记是打开的，走看视频拿奖励逻辑
         {
            this._ad_wcjtn_ing = true;
            var self_1 = this;
            TTAPI_1.default.show_wcjtn_Rewarded_wcjtn_VideoAd(function (ok) {
                if (ok) {
                    //todo:看视频成功
                    //todo:处理开箱之后的逻辑
                }
                else {
                    //todo:未完整观看视频
                    self_1._ad_wcjtn_ing = false;
                    box.AdTag.visible = false;
                }
            }, function () {
                //todo:看视屏失败
                self_1._ad_wcjtn_ing = false;
            });
            return;
        }
        else //使用钥匙获取奖励逻辑
         {
            if (this._key_wcjtn_Count <= 0)
                return;
            --this._key_wcjtn_Count;
            this.refreshKeyState();
            //todo:处理开箱之后的逻辑
        }
    };
    TTReward.prototype.refreshKeyState = function () {
        for (var i = 0; i < this._keys_wcjtn_.length; ++i) {
            var key = this._keys_wcjtn_[i];
            key.visible = ((i + 1) <= this._key_wcjtn_Count);
        }
        this._get_wcjtn_KeyZone.visible = this._key_wcjtn_Count <= 0 && this._getKey_wcjtn_Times > 0;
        this._keys_wcjtn_Root.visible = this._key_wcjtn_Count > 0 || this._getKey_wcjtn_Times <= 0;
    };
    TTReward.prototype.onGetKeyBtn = function () {
        if (this._ad_wcjtn_ing)
            return; //看视频中点击无效
        if (this._getKey_wcjtn_Times <= 0)
            return; //获取钥匙机会用完
        this._ad_wcjtn_ing = true;
        var self = this;
        TTAPI_1.default.show_wcjtn_Rewarded_wcjtn_VideoAd(function (ok) {
            if (ok) {
                //todo:看视频成功
                --self._getKey_wcjtn_Times;
                self._key_wcjtn_Count = 3;
                self.refreshKeyState();
                self._ad_wcjtn_ing = false;
            }
            else {
                //todo:未完整观看视频
                self._ad_wcjtn_ing = false;
            }
        }, function () {
            //todo:看视屏失败
            self._ad_wcjtn_ing = false;
        });
    };
    TTReward.prototype.onAdToggle = function () {
        if (this._ad_wcjtn_ing)
            return; //看视频中点击无效
        this._ad_wcjtn_ToggleTag.visible = !this._ad_wcjtn_ToggleTag.visible;
        this.on_wcjtn_AdToggle_wcjtn_StateChange(this._ad_wcjtn_ToggleTag.visible);
    };
    TTReward.prototype.onSkipText = function () {
        if (this._ad_wcjtn_ing)
            return; //看视频中点击无效
        this._ad_wcjtn_ing = true;
        var self = this;
        if (this._ad_wcjtn_ToggleTag.visible && this._getKey_wcjtn_Times > 0) {
            TTAPI_1.default.show_wcjtn_Rewarded_wcjtn_VideoAd(function (ok) {
                if (ok) {
                    //todo:看视频成功
                    --self._getKey_wcjtn_Times;
                    self._key_wcjtn_Count = 3;
                    self.refreshKeyState();
                    self._ad_wcjtn_ing = false;
                }
                else {
                    //todo:未完整观看视频
                    self._ad_wcjtn_ing = false;
                }
            }, function () {
                //todo:看视屏失败
                self._ad_wcjtn_ing = false;
            });
        }
        else {
            //todo:跳过
        }
    };
    TTReward.prototype.on_wcjtn_AdToggle_wcjtn_StateChange = function (visible) {
        if (visible) {
            this._skip_wcjtn_OkTag.visible = true;
            this._skip_wcjtn_NoTag.visible = false;
        }
        else {
            this._skip_wcjtn_OkTag.visible = false;
            this._skip_wcjtn_NoTag.visible = true;
        }
    };
    return TTReward;
}(TTTemplateViewBase_1.default));
exports.default = TTReward;
},{"../../../TTAPI":79,"../../../Utilit":81,"../TTTemplateViewBase":112,"./RewardBox":104}],106:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TTTemplateViewBase_1 = require("../TTTemplateViewBase");
var HttpUnit_1 = require("../../../Net/HttpUnit");
var TTAPI_1 = require("../../../TTAPI");
var Utilit_1 = require("../../../Utilit");
//抖音签到界面
var TT_wcjtn_SignIn = /** @class */ (function (_super) {
    __extends(TT_wcjtn_SignIn, _super);
    function TT_wcjtn_SignIn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._signIconRoot = null;
        _this._signIcons = [];
        _this._signMasks = [];
        _this._ad_wcjtn_Toggle = null;
        _this._ad_wcjtn_ToggleTag = null;
        _this._signInBtn = null;
        _this._skip_wcjtn_Btn = null;
        _this._skip_wcjtn_OkTag = null;
        _this._skip_wcjtn_NoTag = null;
        _this._signedTag = null;
        _this._signIning = false; //是否正在签到中
        return _this;
    }
    TT_wcjtn_SignIn.prototype.onAwake = function () {
        this._topZone = this.View_wcjtn_.getChildByName("TopZone");
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
        this._signIconRoot = this._center_wcjtn_Zone.getChildByName("SignIconRoot");
        for (var i = 0; i < this._signIconRoot.numChildren; ++i) {
            var s = this._signIconRoot.getChildByName(String(i + 1));
            var OkTag = s.getChildByName("Ok");
            OkTag.visible = false;
            var Mask = s.getChildByName("Mask");
            Mask.visible = true;
            this._signIcons.push(OkTag);
            this._signMasks.push(Mask);
        }
        this._ad_wcjtn_Toggle = this._center_wcjtn_Zone.getChildByName("AdToggle");
        this._ad_wcjtn_ToggleTag = this._ad_wcjtn_Toggle.getChildByName("Tag");
        this._signInBtn = this._center_wcjtn_Zone.getChildByName("SignInBtn");
        this._skip_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("SkipBtn");
        this._skip_wcjtn_OkTag = this._skip_wcjtn_Btn.getChildByName("Ok");
        this._skip_wcjtn_NoTag = this._skip_wcjtn_Btn.getChildByName("No");
        this._ad_wcjtn_Toggle.visible = (0 == Math.floor(Math.random() * 2));
        this.on_wcjtn_AdToggle_wcjtn_StateChange(this._ad_wcjtn_Toggle.visible);
        this._signedTag = this._center_wcjtn_Zone.getChildByName("SignedTag");
        this._signedTag.visible = false;
    };
    TT_wcjtn_SignIn.prototype.onStart = function () {
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
    TT_wcjtn_SignIn.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._signInBtn.on(Laya.Event.CLICK, this, this.onSignInBtn);
        this._ad_wcjtn_Toggle.on(Laya.Event.CLICK, this, this.onAdToggle);
        this._skip_wcjtn_Btn.on(Laya.Event.CLICK, this, this.onSkipBtn);
    };
    TT_wcjtn_SignIn.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._signInBtn.off(Laya.Event.CLICK, this, this.onSignInBtn);
        this._ad_wcjtn_Toggle.off(Laya.Event.CLICK, this, this.onAdToggle);
        this._skip_wcjtn_Btn.off(Laya.Event.CLICK, this, this.onSkipBtn);
    };
    //刷新签到状态
    TT_wcjtn_SignIn.prototype.refreshSignInState = function (days) {
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
    TT_wcjtn_SignIn.prototype.onSignInBtn = function () {
        if (this._signIning)
            return; //请在签到中点击无效
        this._signIning = true;
        var self = this;
        TTAPI_1.default.show_wcjtn_Rewarded_wcjtn_VideoAd(function (ok) {
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
    TT_wcjtn_SignIn.prototype.onAdToggle = function () {
        if (this._signIning)
            return; //请在签到中点击无效
        this._ad_wcjtn_ToggleTag.visible = !this._ad_wcjtn_ToggleTag.visible;
        this.on_wcjtn_AdToggle_wcjtn_StateChange(this._ad_wcjtn_ToggleTag.visible);
    };
    TT_wcjtn_SignIn.prototype.onSkipBtn = function () {
        if (this._signIning)
            return; //请在签到中点击无效
        this._signIning = true;
        var self = this;
        if (this._ad_wcjtn_ToggleTag.visible) {
            TTAPI_1.default.show_wcjtn_Rewarded_wcjtn_VideoAd(function (ok) {
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
    TT_wcjtn_SignIn.prototype.on_wcjtn_AdToggle_wcjtn_StateChange = function (visible) {
        if (visible) {
            this._skip_wcjtn_OkTag.visible = true;
            this._skip_wcjtn_NoTag.visible = false;
        }
        else {
            this._skip_wcjtn_OkTag.visible = false;
            this._skip_wcjtn_NoTag.visible = true;
        }
    };
    return TT_wcjtn_SignIn;
}(TTTemplateViewBase_1.default));
exports.default = TT_wcjtn_SignIn;
},{"../../../Net/HttpUnit":70,"../../../TTAPI":79,"../../../Utilit":81,"../TTTemplateViewBase":112}],107:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TTTemplateViewBase_1 = require("../TTTemplateViewBase");
var TTAPI_1 = require("../../../TTAPI");
var Utilit_1 = require("../../../Utilit");
var TT_wcjtn_SkinTips = /** @class */ (function (_super) {
    __extends(TT_wcjtn_SkinTips, _super);
    function TT_wcjtn_SkinTips() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._ad_wcjtn_Toggle = null;
        _this._ad_wcjtn_ToggleTag = null;
        _this._okBtn = null;
        _this._skip_wcjtn_Btn = null;
        _this._skip_wcjtn_OkTag = null;
        _this._skip_wcjtn_NoTag = null;
        _this._skinAnchor = null;
        _this._ad_wcjtn_ing = false; //是否正在看视频中
        return _this;
    }
    TT_wcjtn_SkinTips.prototype.onAwake = function () {
        this._topZone = this.View_wcjtn_.getChildByName("TopZone");
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
        this._ad_wcjtn_Toggle = this._center_wcjtn_Zone.getChildByName("AdToggle");
        this._ad_wcjtn_ToggleTag = this._ad_wcjtn_Toggle.getChildByName("Tag");
        this._okBtn = this._center_wcjtn_Zone.getChildByName("OkBtn");
        this._skip_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("SkipBtn");
        this._skip_wcjtn_OkTag = this._skip_wcjtn_Btn.getChildByName("Ok");
        this._skip_wcjtn_NoTag = this._skip_wcjtn_Btn.getChildByName("No");
        this._ad_wcjtn_ToggleTag.visible = (0 == Math.floor(Math.random() * 2));
        this.on_wcjtn_AdToggle_wcjtn_StateChange(this._ad_wcjtn_ToggleTag.visible);
        this._skinAnchor = this._center_wcjtn_Zone.getChildByName("SkinAnchor");
    };
    TT_wcjtn_SkinTips.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._okBtn.on(Laya.Event.CLICK, this, this.onOkBtn);
        this._ad_wcjtn_Toggle.on(Laya.Event.CLICK, this, this.onAdToggle);
        this._skip_wcjtn_Btn.on(Laya.Event.CLICK, this, this.onSkipText);
    };
    TT_wcjtn_SkinTips.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._okBtn.off(Laya.Event.CLICK, this, this.onOkBtn);
        this._ad_wcjtn_Toggle.off(Laya.Event.CLICK, this, this.onAdToggle);
        this._skip_wcjtn_Btn.off(Laya.Event.CLICK, this, this.onSkipText);
    };
    TT_wcjtn_SkinTips.prototype.onOkBtn = function () {
        if (this._ad_wcjtn_ing)
            return; //看视频中点击无效
        this._ad_wcjtn_ing = true;
        var self = this;
        TTAPI_1.default.show_wcjtn_Rewarded_wcjtn_VideoAd(function (ok) {
            if (ok) {
                //todo:看视频成功
                //todo:试用皮肤
            }
            else {
                //todo:未完整观看视频
                self._ad_wcjtn_ing = false;
            }
        }, function () {
            //todo:看视屏失败
            self._ad_wcjtn_ing = false;
        });
    };
    TT_wcjtn_SkinTips.prototype.onAdToggle = function () {
        if (this._ad_wcjtn_ing)
            return; //看视频中点击无效
        this._ad_wcjtn_ToggleTag.visible = !this._ad_wcjtn_ToggleTag.visible;
        this.on_wcjtn_AdToggle_wcjtn_StateChange(this._ad_wcjtn_ToggleTag.visible);
    };
    TT_wcjtn_SkinTips.prototype.onSkipText = function () {
        if (this._ad_wcjtn_ing)
            return; //看视频中点击无效
        this._ad_wcjtn_ing = true;
        var self = this;
        if (this._ad_wcjtn_ToggleTag.visible) {
            TTAPI_1.default.show_wcjtn_Rewarded_wcjtn_VideoAd(function (ok) {
                if (ok) {
                    //todo:看视频成功
                    //todo:试用皮肤
                }
                else {
                    //todo:未完整观看视频
                    self._ad_wcjtn_ing = false;
                }
            }, function () {
                //todo:看视屏失败
                self._ad_wcjtn_ing = false;
            });
        }
        else {
            //todo:正常进入游戏，不试用皮肤
        }
    };
    TT_wcjtn_SkinTips.prototype.on_wcjtn_AdToggle_wcjtn_StateChange = function (visible) {
        if (visible) {
            this._skip_wcjtn_OkTag.visible = true;
            this._skip_wcjtn_NoTag.visible = false;
        }
        else {
            this._skip_wcjtn_OkTag.visible = false;
            this._skip_wcjtn_NoTag.visible = true;
        }
    };
    return TT_wcjtn_SkinTips;
}(TTTemplateViewBase_1.default));
exports.default = TT_wcjtn_SkinTips;
},{"../../../TTAPI":79,"../../../Utilit":81,"../TTTemplateViewBase":112}],108:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Page_wcjtn_List = /** @class */ (function (_super) {
    __extends(Page_wcjtn_List, _super);
    function Page_wcjtn_List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._list = null;
        _this._page_wcjtn_Icon = new Array();
        _this._page_wcjtn_Info = null;
        _this._last_wcjtn_Scroll_wcjtn_Value = 0;
        _this._tween_wcjtn_ing = false;
        _this._cur_wcjtn_Page = 0;
        return _this;
    }
    Object.defineProperty(Page_wcjtn_List.prototype, "List", {
        get: function () {
            if (null == this._list) {
                this._list = this.owner.getChildByName("List");
            }
            return this._list;
        },
        enumerable: true,
        configurable: true
    });
    Page_wcjtn_List.prototype.onAwake = function () {
        this._list = this.owner.getChildByName("List");
        this._page_wcjtn_Info = this.owner.getChildByName("PageInfo");
        for (var i = 0; i < this._page_wcjtn_Info.numChildren; ++i) {
            var child = this._page_wcjtn_Info.getChildAt(i);
            var icon = child.getChildByName("icon");
            this._page_wcjtn_Icon.push(icon);
        }
    };
    Page_wcjtn_List.prototype.onUpdate = function () {
        if (!this._tween_wcjtn_ing && this._last_wcjtn_Scroll_wcjtn_Value != this._list.scrollBar.value) {
            var totalPage = this._list.array.length / 6 - 1;
            if (this._last_wcjtn_Scroll_wcjtn_Value < this._list.scrollBar.value) {
                ++this._cur_wcjtn_Page;
                if (this._cur_wcjtn_Page >= totalPage) {
                    this._cur_wcjtn_Page = totalPage;
                }
            }
            else {
                --this._cur_wcjtn_Page;
                if (this._cur_wcjtn_Page <= 0) {
                    this._cur_wcjtn_Page = 0;
                }
            }
            this._tween_wcjtn_ing = true;
            var self_1 = this;
            this._list.tweenTo(this._cur_wcjtn_Page * 6, 500, Laya.Handler.create(this, function () {
            }));
            Laya.timer.once(500, this, function () {
                self_1._tween_wcjtn_ing = false;
                self_1._last_wcjtn_Scroll_wcjtn_Value = self_1._list.scrollBar.value;
            });
        }
    };
    return Page_wcjtn_List;
}(Laya.Script));
exports.default = Page_wcjtn_List;
},{}],109:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../../../User/User");
var Store_wcjtn_Box = /** @class */ (function (_super) {
    __extends(Store_wcjtn_Box, _super);
    function Store_wcjtn_Box() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._root_wcjtn_ = null;
        _this._unlocked_wcjtn_Tag = null;
        _this._used_wcjtn_Tag = null;
        _this._index_wcjtn_ = -1;
        _this._view_wcjtn_ = null;
        return _this;
    }
    Store_wcjtn_Box.prototype.onAwake = function () {
        this._root_wcjtn_ = this.owner.getChildByName("Root");
        this._unlocked_wcjtn_Tag = this._root_wcjtn_.getChildByName("Unlock");
        this._used_wcjtn_Tag = this._root_wcjtn_.getChildByName("Used");
    };
    Store_wcjtn_Box.prototype.onEnable = function () {
        this.owner.on(Laya.Event.CLICK, this, this.on_wcjtn_Box_wcjtn_Click);
    };
    Store_wcjtn_Box.prototype.onDisable = function () {
        this.owner.on(Laya.Event.CLICK, this, this.on_wcjtn_Box_wcjtn_Click);
    };
    Store_wcjtn_Box.prototype.set_wcjtn_Data = function (index, view, data, selected) {
        this._index_wcjtn_ = index;
        this._view_wcjtn_ = view;
        this._unlocked_wcjtn_Tag.visible = User_1.default.itemIsUnlocked(data.id);
        this._used_wcjtn_Tag.visible = User_1.default.curUsedItem == data.id;
        this._root_wcjtn_.visible = (-10086 != data.id);
    };
    Store_wcjtn_Box.prototype.on_wcjtn_Box_wcjtn_Click = function () {
        if (null != this._view_wcjtn_ && -1 != this._index_wcjtn_) {
            this._view_wcjtn_.on_wcjtn_Box_wcjtn_Click(this._index_wcjtn_);
        }
    };
    return Store_wcjtn_Box;
}(Laya.Script));
exports.default = Store_wcjtn_Box;
},{"../../../User/User":80}],110:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TTTemplateViewBase_1 = require("../TTTemplateViewBase");
var PageList_1 = require("./PageList");
var StoreBox_1 = require("./StoreBox");
var User_1 = require("../../../User/User");
var StoreConfig_1 = require("../../../Config/StoreConfig");
var Utilit_1 = require("../../../Utilit");
var TT_wcjtn_Store = /** @class */ (function (_super) {
    __extends(TT_wcjtn_Store, _super);
    function TT_wcjtn_Store() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._is3d = false; //当前页面展示模式是否是3D，如果是3D则会隐藏2D展示界面
        _this._closeBtn = null;
        _this._displayZone = null;
        _this._displayIcon = null;
        _this._store_wcjtn_ListZone = null;
        _this._store_wcjtn_List = null;
        _this._price_wcjtn_UnlockBtn = null;
        _this._video_wcjtn_UnlockBtn = null;
        _this._use_wcjtn_Btn = null;
        _this._used_wcjtn_Tag = null;
        _this._cur_wcjtn_Selected = 0;
        return _this;
    }
    TT_wcjtn_Store.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._topZone = this.View_wcjtn_.getChildByName("TopZone");
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
        this._closeBtn = this._center_wcjtn_Zone.getChildByName("CloseBtn");
        this._displayZone = this._center_wcjtn_Zone.getChildByName("DisplayZone");
        this._displayIcon = this._displayZone.getChildByName("DisplayIcon");
        this._store_wcjtn_ListZone = this._center_wcjtn_Zone.getChildByName("StoreListZone");
        this._store_wcjtn_List = this._store_wcjtn_ListZone.getComponent(PageList_1.default);
        this._store_wcjtn_List.List.renderHandler = Laya.Handler.create(this, this.on_wcjtn_ListRender, null, false);
        this._store_wcjtn_List.List.hScrollBarSkin = "";
        this._video_wcjtn_UnlockBtn = this._store_wcjtn_ListZone.getChildByName("VideoUnlockBtn");
        this._price_wcjtn_UnlockBtn = this._store_wcjtn_ListZone.getChildByName("PriceUnlockBtn");
        this._use_wcjtn_Btn = this._store_wcjtn_ListZone.getChildByName("UseBtn");
        this._used_wcjtn_Tag = this._use_wcjtn_Btn.getChildByName("Used");
    };
    TT_wcjtn_Store.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        if (this._is3d) {
            this._displayZone.visible = false;
        }
        this.refresh_wcjtn_Store_wcjtn_List();
        this._store_wcjtn_List.List.selectedIndex = 0;
        this.on_wcjtn_Box_wcjtn_Click(0);
    };
    TT_wcjtn_Store.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._closeBtn.on(Laya.Event.CLICK, this, this.on_wcjtn_CloseBtn);
        this._price_wcjtn_UnlockBtn.on(Laya.Event.CLICK, this, this.onPrice_wcjtn_UnlockBtn);
        this._video_wcjtn_UnlockBtn.on(Laya.Event.CLICK, this, this.onVideo_wcjtn_UnlockBtn);
    };
    TT_wcjtn_Store.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._closeBtn.off(Laya.Event.CLICK, this, this.on_wcjtn_CloseBtn);
        this._price_wcjtn_UnlockBtn.off(Laya.Event.CLICK, this, this.onPrice_wcjtn_UnlockBtn);
        this._video_wcjtn_UnlockBtn.off(Laya.Event.CLICK, this, this.onVideo_wcjtn_UnlockBtn);
    };
    TT_wcjtn_Store.prototype.on_wcjtn_CloseBtn = function () {
        this.close_wcjtn_View();
    };
    TT_wcjtn_Store.prototype.onPrice_wcjtn_UnlockBtn = function () {
        var data = this._store_wcjtn_List.List.array[this._cur_wcjtn_Selected];
    };
    TT_wcjtn_Store.prototype.onVideo_wcjtn_UnlockBtn = function () {
        var data = this._store_wcjtn_List.List.array[this._cur_wcjtn_Selected];
    };
    TT_wcjtn_Store.prototype.refresh_wcjtn_Store_wcjtn_List = function () {
        var storeDatas = StoreConfig_1.default.getInstance().getStoreDatas();
        var add = 6 - (storeDatas.length % 6);
        for (var i = 0; i < add; ++i) {
            var d = new StoreConfig_1.StoreData();
            d.id = -10086;
            storeDatas.push(d); //占位
        }
        this._store_wcjtn_List.List.array = storeDatas;
    };
    TT_wcjtn_Store.prototype.on_wcjtn_ListRender = function (cell, index) {
        var data = this._store_wcjtn_List.List.array[index];
        var storeBox = cell.getComponent(StoreBox_1.default);
        storeBox.set_wcjtn_Data(index, this, data, this._cur_wcjtn_Selected == index);
    };
    TT_wcjtn_Store.prototype.on_wcjtn_Box_wcjtn_Click = function (index) {
        this._cur_wcjtn_Selected = index;
        var data = this._store_wcjtn_List.List.array[this._cur_wcjtn_Selected];
        //todo：这里处理选中后的逻辑
        User_1.default.curUsedItem = data.id;
        var unlocked = User_1.default.itemIsUnlocked(data.id);
        this._price_wcjtn_UnlockBtn.visible = 0 == data.priceType && !unlocked;
        this._video_wcjtn_UnlockBtn.visible = 1 == data.priceType && !unlocked;
        this._use_wcjtn_Btn.visible = unlocked;
        this._used_wcjtn_Tag.visible = data.id == User_1.default.curUsedItem;
        this._store_wcjtn_List.List.refresh();
    };
    return TT_wcjtn_Store;
}(TTTemplateViewBase_1.default));
exports.default = TT_wcjtn_Store;
},{"../../../Config/StoreConfig":8,"../../../User/User":80,"../../../Utilit":81,"../TTTemplateViewBase":112,"./PageList":108,"./StoreBox":109}],111:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../../View/ViewBase");
var EventDef_1 = require("../../../Event/EventDef");
var EventMgr_1 = require("../../../Event/EventMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var TTAPI_1 = require("../../../TTAPI");
var TTCrazyClick = /** @class */ (function (_super) {
    __extends(TTCrazyClick, _super);
    function TTCrazyClick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._click_wcjtn_Bar = null;
        _this._total_wcjtn_Click_wcjtn_Timer = 15; //用户一直没中套路，那么点击了这么多次都还是让他继续玩下去，不要卡死程序
        _this._need_wcjtn_Click_wcjtn_Time = 10; //一共点多少次能够获得奖励，用于显示进度条
        _this._banner_wcjtn_ClickTime = Math.floor(Math.random() * 5) + 2; //点多少次开始显示bannerr套路用户  
        return _this;
    }
    TTCrazyClick.prototype.onAwake = function () {
        var _this = this;
        this._click_wcjtn__Btn = this.owner.getChildByName("Click_Btn");
        this._click_wcjtn__Btn.on(Laya.Event.CLICK, this, this.ButtonClicked);
        this._arrow_wcjtn__Img = this._click_wcjtn__Btn.getChildByName("Arrow_Img");
        this._getPrize_wcjtn__View = this.owner.getChildByName("GetPrize_View");
        this._prize_wcjtn_Count_Text = this._getPrize_wcjtn__View.getChildByName("PrizeCount_Text");
        this._confirm_wcjtn__Btn = this._getPrize_wcjtn__View.getChildByName("Confirm_Btn");
        this._getPrize_wcjtn__View.visible = false;
        this._click_wcjtn_Bar = this.owner.getChildByName("ClickBar").getChildByName("ClickBar");
        this._click_wcjtn_BarOriginal_wcjtn_Width = this._click_wcjtn_Bar.width;
        this._click_wcjtn_Bar.width = 0;
        this._click_wcjtn_Time = 0;
        this._total_wcjtn_Click_wcjtn_Time = 0;
        var self = this;
        Laya.loader.load("ClickGetPrize/quanji.png", Laya.Handler.create(this, function (texture) {
            texture.bitmap.lock = true;
            Laya.loader.load("ClickGetPrize/quanji.sk", Laya.Handler.create(_this, function (bytes) {
                console.log("texture", texture);
                console.log("bytes", bytes);
                var template = new Laya.Templet();
                template.parseData(texture, bytes);
                self.drgon_wcjtn_ = template.buildArmature();
                self.owner.addChild(self.drgon_wcjtn_);
                self.drgon_wcjtn_.x = 375;
                self.drgon_wcjtn_.y = 610;
                self.drgon_wcjtn_.scaleX = 2;
                self.drgon_wcjtn_.scaleY = 2;
                self.drgon_wcjtn_.parent.setChildIndex(self.drgon_wcjtn_, 1);
                self.drgon_wcjtn_.play(0, true);
                console.log("quanji 加载完成!!!!", template);
            }), Laya.Handler.create(_this, function () { }), "", 0, false, "", true);
        }), Laya.Handler.create(this, function () { }), "", 0, false, "", true);
    };
    TTCrazyClick.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        Laya.stage.on(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
    };
    TTCrazyClick.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        Laya.stage.off(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
    };
    TTCrazyClick.prototype.onUpdate = function () {
        if (this._arrow_wcjtn_Up) {
            this._arrow_wcjtn__Img.top += Laya.timer.delta / 5;
            if (this._arrow_wcjtn__Img.top > -140) {
                this._arrow_wcjtn_Up = false;
            }
        }
        else {
            this._arrow_wcjtn__Img.top -= Laya.timer.delta / 5;
            if (this._arrow_wcjtn__Img.top < -180) {
                this._arrow_wcjtn_Up = true;
            }
        }
        if (!this._banner_wcjtn_Clicked) {
            var spd = 2 + (this._click_wcjtn_Bar.width / this._click_wcjtn_BarOriginal_wcjtn_Width) * 4;
            if (this._click_wcjtn_Bar.width >= spd) {
                this._click_wcjtn_Bar.width -= spd;
            }
            if ((this._click_wcjtn_Bar.width / this._click_wcjtn_BarOriginal_wcjtn_Width) + 0.1 < (this._click_wcjtn_Time / this._need_wcjtn_Click_wcjtn_Time)) {
                this._click_wcjtn_Time--;
            }
        }
    };
    TTCrazyClick.prototype.open_wcjtn_View = function (data) {
        this._compelet_wcjtn_Function = data.Complete;
        this._prize_wcjtn_Count = data.PrizeCount;
        _super.prototype.open_wcjtn_View.call(this, data);
    };
    TTCrazyClick.prototype.Open_wcjtn_Prize_wcjtn_Window = function () {
        var self = this;
        this._prize_wcjtn_Count_Text.text = this._prize_wcjtn_Count.toString();
        this._getPrize_wcjtn__View.visible = true;
        this._confirm_wcjtn__Btn.once(Laya.Event.CLICK, this, function () {
            TTAPI_1.default.hideBanner();
            if (self._compelet_wcjtn_Function) {
                self._compelet_wcjtn_Function();
            }
            self.close_wcjtn_View();
        });
    };
    TTCrazyClick.prototype.Show_wcjtn_Banner = function () {
        if (AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().tt_wcjtn_cfg.kuang_wcjtn_dian_wcjtn_Banner == 1) {
            TTAPI_1.default.show_wcjtn_Banner();
        }
    };
    TTCrazyClick.prototype.ButtonClicked = function () {
        var _this = this;
        this._click_wcjtn_Time++;
        this._total_wcjtn_Click_wcjtn_Time++;
        if (null != this.drgon_wcjtn_) {
            this.drgon_wcjtn_.play(1, false);
            this.drgon_wcjtn_.once(Laya.Event.STOPPED, this, function () {
                _this.drgon_wcjtn_.play(0, true);
            });
        }
        if (this._click_wcjtn_Time > this._need_wcjtn_Click_wcjtn_Time) {
            this._click_wcjtn_Time = this._need_wcjtn_Click_wcjtn_Time;
        }
        if (this._click_wcjtn_Time >= this._banner_wcjtn_ClickTime) {
            if (this._click_wcjtn_Time >= this._need_wcjtn_Click_wcjtn_Time) {
                this._click_wcjtn_Time = this._need_wcjtn_Click_wcjtn_Time - 1;
            }
            if (this._banner_wcjtn_Clicked) {
                return;
            }
            this._banner_wcjtn_Clicked = true;
            this.Show_wcjtn_Banner();
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        else if (this._total_wcjtn_Click_wcjtn_Time > this._total_wcjtn_Click_wcjtn_Timer) {
            this.Show_wcjtn_Banner();
            this.Banner_wcjtn_Clicked();
        }
        var progress = (this._click_wcjtn_Time / this._need_wcjtn_Click_wcjtn_Time) * this._click_wcjtn_BarOriginal_wcjtn_Width;
        this._click_wcjtn_Bar.width = progress;
    };
    TTCrazyClick.prototype.Banner_wcjtn_Clicked = function () {
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_Wu_wcjtn_dian_wcjtn_Banner__wcjtn_Hide);
        this._banner_wcjtn_Clicked = true;
        this._click_wcjtn_Time = this._need_wcjtn_Click_wcjtn_Time;
        this._click_wcjtn_Bar.width = this._click_wcjtn_BarOriginal_wcjtn_Width;
        this._click_wcjtn__Btn.visible = false;
        this.Open_wcjtn_Prize_wcjtn_Window();
    };
    TTCrazyClick.prototype.onDestroy = function () {
        TTAPI_1.default.hideBanner();
    };
    TTCrazyClick.prototype.onFocusChange = function () {
        if (null != this.drgon_wcjtn_) {
            this.drgon_wcjtn_.play(0, true);
        }
    };
    return TTCrazyClick;
}(ViewBase_1.default));
exports.default = TTCrazyClick;
},{"../../../Config/AppSwitchConfig":6,"../../../Event/EventDef":9,"../../../Event/EventMgr":10,"../../../TTAPI":79,"../../../View/ViewBase":130}],112:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var Utilit_1 = require("../../Utilit");
var TT_wcjtn_Template_wcjtn_View_wcjtn_Base = /** @class */ (function (_super) {
    __extends(TT_wcjtn_Template_wcjtn_View_wcjtn_Base, _super);
    function TT_wcjtn_Template_wcjtn_View_wcjtn_Base() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._topZone = null;
        return _this;
    }
    Object.defineProperty(TT_wcjtn_Template_wcjtn_View_wcjtn_Base.prototype, "TopZone", {
        get: function () {
            if (null == this._topZone) {
                this._topZone = this.View_wcjtn_.getChildByName("TopZone");
            }
            return this._topZone;
        },
        enumerable: true,
        configurable: true
    });
    TT_wcjtn_Template_wcjtn_View_wcjtn_Base.prototype.onAwake = function () {
        this._topZone = this.View_wcjtn_.getChildByName("TopZone");
        if (null != this._topZone && Utilit_1.default.is_wcjtn_IphoneX()) {
            this._topZone.top = this._topZone.top + 75;
        }
    };
    TT_wcjtn_Template_wcjtn_View_wcjtn_Base.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
    };
    TT_wcjtn_Template_wcjtn_View_wcjtn_Base.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
    };
    return TT_wcjtn_Template_wcjtn_View_wcjtn_Base;
}(ViewBase_1.default));
exports.default = TT_wcjtn_Template_wcjtn_View_wcjtn_Base;
},{"../../Utilit":81,"../ViewBase":130}],113:[function(require,module,exports){
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
var Exprot2_wcjtn_View_wcjtn_Template = /** @class */ (function (_super) {
    __extends(Exprot2_wcjtn_View_wcjtn_Template, _super);
    function Exprot2_wcjtn_View_wcjtn_Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._continue_wcjtn_Btn = null;
        _this._krq_wcjtn_VLoopAd = null;
        _this._KRQ_V_wcjtn_LoopAd = null;
        _this._isCanClose = false;
        _this._banner = null;
        _this._clickFlag = false;
        return _this;
    }
    Exprot2_wcjtn_View_wcjtn_Template.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._krq_wcjtn_VLoopAd = this.View_wcjtn_.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd_1.default);
        this._krq_wcjtn_VLoopAd.use_wcjtn_Local_wcjtn_Random = true;
        this._krq_wcjtn_VLoopAd.use_wcjtn_Random = false;
        this._krq_wcjtn_VLoopAd.useMovePause = false;
        this._krq_wcjtn_VLoopAd.sort_wcjtn_Datas = this.sort_wcjtn_Datas;
        this._continue_wcjtn_Btn = this.View_wcjtn_.getChildByName("ContinueBtn");
        this._continue_wcjtn_Btn.visible = false;
        var self = this;
        // if(Wu_wcjtn_dian_wcjtn_Mgr.Wu_wcjtn_dian_wcjtn_Flag && 1 == App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Banner)
        // {
        //     Laya.timer.once(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Btn_wcjtn_DelayTime * 1000,self,()=>
        //     {
        //         self._continue_wcjtn_Btn.visible = true;
        //         Laya.timer.once(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Banner_wcjtn_ShowTime * 1000,self,()=>
        //         {
        //             self.ShowBanner();
        //             Laya.timer.once(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Banner_wcjtn_HideTime * 1000,self,()=>
        //             {
        //                 self._isCanClose = true;
        //                 if(null != self._banner)
        //                 {
        //                     self._banner._wcjtn_hide_wcjtn_();
        //                 }
        //                 self._banner = null;
        //             })
        //         })
        //     })
        // }
        // else
        // {
        //     Laya.timer.once(App_wcjtn_Switch_wcjtn_Config.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Btn_wcjtn_DelayTime * 1000,self,()=>
        //     {
        //         self._continue_wcjtn_Btn.visible = true;
        //         self._isCanClose = true;
        //     })
        // }
        Laya.timer.once(AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Btn_wcjtn_DelayTime * 1000, self, function () {
            self._continue_wcjtn_Btn.visible = true;
        });
        this._KRQ_V_wcjtn_LoopAd = this.View_wcjtn_.getChildByName("KRQ_VLoopAd");
        if (Utilit_1.default.is_wcjtn_IphoneX()) {
            this._KRQ_V_wcjtn_LoopAd.top = this._KRQ_V_wcjtn_LoopAd.top + 75;
        }
    };
    Exprot2_wcjtn_View_wcjtn_Template.prototype.onStart = function () {
        this._krq_wcjtn_VLoopAd.Ad_wcjtn_Pos_wcjtn_ID = ShareAd_1.default.MoreGame_wcjtn_LocationID;
        _super.prototype.onStart.call(this);
    };
    Exprot2_wcjtn_View_wcjtn_Template.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._continue_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Continue_wcjtn_Btn);
    };
    Exprot2_wcjtn_View_wcjtn_Template.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._continue_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Continue_wcjtn_Btn);
    };
    Exprot2_wcjtn_View_wcjtn_Template.prototype.ShowBanner = function () {
        var _this = this;
        var self = this;
        WXADMgr_1.default.get_wcjtn_Banner(function (banner) {
            if (null != self._banner) {
                self._banner._wcjtn_hide_wcjtn_();
            }
            self._banner = banner;
            if (null != self._banner) {
                self._banner._wcjtn_show_wcjtn_();
            }
            else {
                _this._isCanClose = true;
            }
            if (_this.is_wcjtn_Show_wcjtn_HistoryBtn) {
                self.History_wcjtn_Btn.visible = true;
            }
        });
    };
    Exprot2_wcjtn_View_wcjtn_Template.prototype.onDestroy = function () {
        if (null != this._banner) {
            this._banner._wcjtn_hide_wcjtn_();
        }
        this._banner = null;
    };
    Exprot2_wcjtn_View_wcjtn_Template.prototype.on_wcjtn_Continue_wcjtn_Btn = function () {
        var self = this;
        if (!this._clickFlag) {
            this._clickFlag = true;
            if (WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag && 1 == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Banner) {
                Laya.timer.once(AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Btn_wcjtn_DelayTime * 1000, self, function () {
                    self._continue_wcjtn_Btn.visible = true;
                    Laya.timer.once(AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Banner_wcjtn_ShowTime * 1000, self, function () {
                        self.ShowBanner();
                        Laya.timer.once(AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Banner_wcjtn_HideTime * 1000, self, function () {
                            self._isCanClose = true;
                            if (null != self._banner) {
                                self._banner._wcjtn_hide_wcjtn_();
                            }
                            self._banner = null;
                        });
                    });
                });
            }
            else {
                Laya.timer.once(AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Btn_wcjtn_DelayTime * 1000, self, function () {
                    self._continue_wcjtn_Btn.visible = true;
                    self._isCanClose = true;
                });
            }
        }
        if (!this._isCanClose)
            return;
        var excute = function () {
            self.close_wcjtn_View(); //关闭此界面
            //todo:你关闭此界面之后你的逻辑
            ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.MyMainView);
        };
        ViewMgr_1.default.ins_wcjtn_tance.tryShowPopAd(function (v) {
            if (null != v) //成功打开 ViewDef.Export3View 界面
             {
                v.on_wcjtn_CloseEvent = function () {
                    excute();
                };
            }
            else {
                excute(); //当 ViewDef.Export3View 界面不能打开 后执行你的逻辑
            }
        });
    };
    Exprot2_wcjtn_View_wcjtn_Template.prototype.sort_wcjtn_Datas = function (datas) {
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
    return Exprot2_wcjtn_View_wcjtn_Template;
}(TemplateViewBase_1.default));
exports.default = Exprot2_wcjtn_View_wcjtn_Template;
},{"../../../Config/AppSwitchConfig":6,"../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd":19,"../../../Mgr/ViewMgr":34,"../../../Mgr/WXADMgr":35,"../../../Mgr/WudianMgr":36,"../../../ShareAd/ShareAd":75,"../../../Utilit":81,"../TemplateViewBase":123}],114:[function(require,module,exports){
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
        _this._close_wcjtn_Btn = null;
        _this._krq_wcjtn_VLoopAd = null;
        _this._KRQ__wcjtn_VLoopAd = null;
        _this._click_wcjtn_Tag = false;
        _this._click_wcjtn_TimingTag = false;
        _this._banner_wcjtn_ = null;
        return _this;
    }
    Exprot3ViewTemplate.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._krq_wcjtn_VLoopAd = this.View_wcjtn_.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd_1.default);
        this._close_wcjtn_Btn = this.View_wcjtn_.getChildByName("CloseBtn");
        this._KRQ__wcjtn_VLoopAd = this.View_wcjtn_.getChildByName("KRQ_VLoopAd");
        if (Utilit_1.default.is_wcjtn_IphoneX()) {
            this._KRQ__wcjtn_VLoopAd.top = this._KRQ__wcjtn_VLoopAd.top + 75;
        }
    };
    Exprot3ViewTemplate.prototype.onStart = function () {
        this._krq_wcjtn_VLoopAd.Ad_wcjtn_Pos_wcjtn_ID = ShareAd_1.default.MoreGame_wcjtn_LocationID;
        _super.prototype.onStart.call(this);
        if (WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
            var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
            Laya.timer.once(bannerMoveTimer * 1000, this, this.Banner_wcjtn_Up);
            Laya.timer.once(btnMoveTimer * 1000, this, this.Btn_wcjtn_Up);
        }
    };
    Exprot3ViewTemplate.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._close_wcjtn_Btn.on(Laya.Event.CLICK, this, this.onClose_wcjtn_Btn);
    };
    Exprot3ViewTemplate.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._close_wcjtn_Btn.off(Laya.Event.CLICK, this, this.onClose_wcjtn_Btn);
    };
    Exprot3ViewTemplate.prototype.Banner_wcjtn_Up = function () {
        var _this = this;
        var self = this;
        WXADMgr_1.default.get_wcjtn_Banner(function (banner) {
            if (null != self._banner_wcjtn_) {
                self._banner_wcjtn_._wcjtn_hide_wcjtn_();
            }
            self._banner_wcjtn_ = banner;
            if (null != self._banner_wcjtn_) {
                self._banner_wcjtn_._wcjtn_show_wcjtn_();
            }
            if (_this.is_wcjtn_Show_wcjtn_HistoryBtn) {
                self.History_wcjtn_Btn.visible = true;
            }
        });
    };
    Exprot3ViewTemplate.prototype.Btn_wcjtn_Up = function () {
        this._click_wcjtn_Tag = true;
        this._close_wcjtn_Btn.bottom = 270;
    };
    Exprot3ViewTemplate.prototype.onClose_wcjtn_Btn = function () {
        if (!this._click_wcjtn_Tag && WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var self = this;
            if (!this._click_wcjtn_TimingTag) {
                this._click_wcjtn_TimingTag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.Banner_wcjtn_Up);
                Laya.timer.once(btnMoveTimer * 1000, this, this.Btn_wcjtn_Up);
            }
            return;
        }
        this.close_wcjtn_View();
    };
    Exprot3ViewTemplate.prototype.onDestroy = function () {
        if (null != this._banner_wcjtn_) {
            this._banner_wcjtn_._wcjtn_hide_wcjtn_();
        }
        this._banner_wcjtn_ = null;
    };
    Exprot3ViewTemplate.prototype.on_wcjtn_History_wcjtn_Btn = function () {
        var self = this;
        ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.MiniGameView, null, function (v) {
            self.hide_wcjtn_();
            if (null != self._banner_wcjtn_) {
                self._banner_wcjtn_._wcjtn_hide_wcjtn_();
            }
            v.on_wcjtn_CloseEvent = function () {
                if (null != self.View_wcjtn_ && !self.View_wcjtn_.destroyed) {
                    self.show_wcjtn_();
                    if (null != self._banner_wcjtn_) {
                        self._banner_wcjtn_._wcjtn_show_wcjtn_();
                    }
                }
            };
        });
    };
    return Exprot3ViewTemplate;
}(TemplateViewBase_1.default));
exports.default = Exprot3ViewTemplate;
},{"../../../Config/AppSwitchConfig":6,"../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd":19,"../../../Mgr/ViewMgr":34,"../../../Mgr/WXADMgr":35,"../../../Mgr/WudianMgr":36,"../../../ShareAd/ShareAd":75,"../../../Utilit":81,"../TemplateViewBase":123}],115:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var KRQ_VLoopAd_1 = require("../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var ExportViewTemplate = /** @class */ (function (_super) {
    __extends(ExportViewTemplate, _super);
    function ExportViewTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._continue_wcjtn_Btn = null;
        _this._krq_wcjtn_VLoopAd = null;
        return _this;
    }
    ExportViewTemplate.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._krq_wcjtn_VLoopAd = this.View_wcjtn_.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VLoopAd_1.default);
        this._krq_wcjtn_VLoopAd.useMovePause = false;
        this._continue_wcjtn_Btn = this._krq_wcjtn_VLoopAd._wcjtn_Sprite_wcjtn_.getChildByName("ContinueBtn");
        this._continue_wcjtn_Btn.visible = false;
        var self = this;
        Laya.timer.once(AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().continue_wcjtn_Btn_wcjtn_DelayTime * 1000, this, function () {
            self._continue_wcjtn_Btn.visible = true;
        });
    };
    ExportViewTemplate.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
    };
    ExportViewTemplate.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._continue_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Continue_wcjtn_Btn);
    };
    ExportViewTemplate.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._continue_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Continue_wcjtn_Btn);
    };
    ExportViewTemplate.prototype.on_wcjtn_Continue_wcjtn_Btn = function () {
    };
    return ExportViewTemplate;
}(TemplateViewBase_1.default));
exports.default = ExportViewTemplate;
},{"../../../Config/AppSwitchConfig":6,"../../../KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd":19,"../TemplateViewBase":123}],116:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var WXADMgr_1 = require("../../../Mgr/WXADMgr");
var KRQ_RollSingleAd_1 = require("../../../KRQ/Com/KRQ_RollSingleAd");
var Utilit_1 = require("../../../Utilit");
var ViewMgr_1 = require("../../../Mgr/ViewMgr");
var Game_wcjtn_Fail_wcjtn_View_wcjtn_Template = /** @class */ (function (_super) {
    __extends(Game_wcjtn_Fail_wcjtn_View_wcjtn_Template, _super);
    function Game_wcjtn_Fail_wcjtn_View_wcjtn_Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._back_wcjtn_Btn = null;
        _this._continue_wcjtn_Btn = null;
        _this._roll_wcjtn_SingleAds = new Array();
        _this._click_wcjtn_Tag = false;
        _this._click_wcjtn_TimingTag = false;
        _this._banner = null;
        return _this;
    }
    Game_wcjtn_Fail_wcjtn_View_wcjtn_Template.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        if (Utilit_1.default.is_wcjtn_IphoneX()) {
            this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
        }
        this._back_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("BackBtn");
        this._continue_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("ContinueBtn");
        for (var i = 0; i < this._center_wcjtn_Zone.numChildren; ++i) {
            var ad = this._center_wcjtn_Zone.getChildAt(i).getComponent(KRQ_RollSingleAd_1.default);
            if (null == ad)
                continue;
            this._roll_wcjtn_SingleAds.push(ad);
        }
        if (WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            this.History_wcjtn_Btn.visible = false;
        }
    };
    Game_wcjtn_Fail_wcjtn_View_wcjtn_Template.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        if (WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var yPos = this._center_wcjtn_Zone.height - 150;
            this._back_wcjtn_Btn.y = yPos;
            this._continue_wcjtn_Btn.y = yPos;
        }
        var _loop_1 = function (i) {
            var ad = this_1._roll_wcjtn_SingleAds[i];
            Laya.timer.once(150, this_1, function () {
                ad.play_wcjtn_Ani();
            });
        };
        var this_1 = this;
        for (var i = 0; i < this._roll_wcjtn_SingleAds.length; ++i) {
            _loop_1(i);
        }
        var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
        var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
        Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
        Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
    };
    Game_wcjtn_Fail_wcjtn_View_wcjtn_Template.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._back_wcjtn_Btn.on(Laya.Event.CLICK, this, this.onBack_wcjtn_Btn);
        this._continue_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Continue_wcjtn_Btn);
    };
    Game_wcjtn_Fail_wcjtn_View_wcjtn_Template.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._back_wcjtn_Btn.off(Laya.Event.CLICK, this, this.onBack_wcjtn_Btn);
        this._continue_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Continue_wcjtn_Btn);
    };
    Game_wcjtn_Fail_wcjtn_View_wcjtn_Template.prototype.onBack_wcjtn_Btn = function () {
        if (!this._click_wcjtn_Tag && WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var self = this;
            if (!this._click_wcjtn_TimingTag) {
                this._click_wcjtn_TimingTag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        //todo:你的代码
        this.close_wcjtn_View();
        ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.Export2View);
    };
    Game_wcjtn_Fail_wcjtn_View_wcjtn_Template.prototype.on_wcjtn_Continue_wcjtn_Btn = function () {
        if (!this._click_wcjtn_Tag && WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var self = this;
            if (!this._click_wcjtn_TimingTag) {
                this._click_wcjtn_TimingTag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        //todo:你的代码
        this.close_wcjtn_View();
        // View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.Export2View);        
        ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.MyMainView);
    };
    Game_wcjtn_Fail_wcjtn_View_wcjtn_Template.prototype.BannerUp = function () {
        var _this = this;
        var self = this;
        WXADMgr_1.default.get_wcjtn_Banner(function (banner) {
            if (null != self._banner) {
                _this._banner._wcjtn_hide_wcjtn_();
            }
            self._banner = banner;
            if (null != self._banner) {
                _this._banner._wcjtn_show_wcjtn_();
            }
            if (_this.is_wcjtn_Show_wcjtn_HistoryBtn) {
                self.History_wcjtn_Btn.visible = true;
            }
        });
    };
    Game_wcjtn_Fail_wcjtn_View_wcjtn_Template.prototype.BtnUp = function () {
        this._click_wcjtn_Tag = true;
        this._back_wcjtn_Btn.y = 720;
        this._continue_wcjtn_Btn.y = 720;
    };
    Game_wcjtn_Fail_wcjtn_View_wcjtn_Template.prototype.onDestroy = function () {
        if (null != this._banner) {
            this._banner._wcjtn_hide_wcjtn_();
        }
        this._banner = null;
    };
    Game_wcjtn_Fail_wcjtn_View_wcjtn_Template.prototype.on_wcjtn_History_wcjtn_Btn = function () {
        var self = this;
        ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.MiniGameView, null, function (v) {
            self.hide_wcjtn_();
            if (null != self._banner) {
                self._banner._wcjtn_hide_wcjtn_();
            }
            v.on_wcjtn_CloseEvent = function () {
                if (null != self.View_wcjtn_ && !self.View_wcjtn_.destroyed) {
                    self.show_wcjtn_();
                    if (null != self._banner) {
                        self._banner._wcjtn_show_wcjtn_();
                    }
                }
            };
        });
    };
    return Game_wcjtn_Fail_wcjtn_View_wcjtn_Template;
}(TemplateViewBase_1.default));
exports.default = Game_wcjtn_Fail_wcjtn_View_wcjtn_Template;
},{"../../../Config/AppSwitchConfig":6,"../../../KRQ/Com/KRQ_RollSingleAd":21,"../../../Mgr/ViewMgr":34,"../../../Mgr/WXADMgr":35,"../../../Mgr/WudianMgr":36,"../../../Utilit":81,"../TemplateViewBase":123}],117:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var WXADMgr_1 = require("../../../Mgr/WXADMgr");
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var KRQ_RollSingleAd_1 = require("../../../KRQ/Com/KRQ_RollSingleAd");
var Utilit_1 = require("../../../Utilit");
var ViewMgr_1 = require("../../../Mgr/ViewMgr");
var Game_wcjtn_Win_wcjtn_ViewTemplate = /** @class */ (function (_super) {
    __extends(Game_wcjtn_Win_wcjtn_ViewTemplate, _super);
    function Game_wcjtn_Win_wcjtn_ViewTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._back_wcjtn_Btn = null;
        _this._next_wcjtn_Btn = null;
        _this._roll_wcjtn_SingleAds = new Array();
        _this._click_wcjtn_Tag = false;
        _this._click_wcjtn_TimingTag = false;
        _this._banner = null;
        return _this;
    }
    Game_wcjtn_Win_wcjtn_ViewTemplate.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        if (Utilit_1.default.is_wcjtn_IphoneX()) {
            this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
        }
        this._back_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("BackBtn");
        this._next_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("NextBtn");
        for (var i = 0; i < this._center_wcjtn_Zone.numChildren; ++i) {
            var ad = this._center_wcjtn_Zone.getChildAt(i).getComponent(KRQ_RollSingleAd_1.default);
            if (null == ad)
                continue;
            this._roll_wcjtn_SingleAds.push(ad);
        }
        if (WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            this.History_wcjtn_Btn.visible = false;
        }
    };
    Game_wcjtn_Win_wcjtn_ViewTemplate.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        if (WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var yPos = this._center_wcjtn_Zone.height - 150;
            this._back_wcjtn_Btn.y = yPos;
            this._next_wcjtn_Btn.y = yPos;
        }
        var _loop_1 = function (i) {
            var ad = this_1._roll_wcjtn_SingleAds[i];
            Laya.timer.once(150, this_1, function () {
                ad.play_wcjtn_Ani();
            });
        };
        var this_1 = this;
        for (var i = 0; i < this._roll_wcjtn_SingleAds.length; ++i) {
            _loop_1(i);
        }
        var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
        var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
        Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
        Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
    };
    Game_wcjtn_Win_wcjtn_ViewTemplate.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._back_wcjtn_Btn.on(Laya.Event.CLICK, this, this.onBack_wcjtn_Btn);
        this._next_wcjtn_Btn.on(Laya.Event.CLICK, this, this.onNext_wcjtn_Btn);
    };
    Game_wcjtn_Win_wcjtn_ViewTemplate.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._back_wcjtn_Btn.off(Laya.Event.CLICK, this, this.onBack_wcjtn_Btn);
        this._next_wcjtn_Btn.off(Laya.Event.CLICK, this, this.onNext_wcjtn_Btn);
    };
    Game_wcjtn_Win_wcjtn_ViewTemplate.prototype.onBack_wcjtn_Btn = function () {
        if (!this._click_wcjtn_Tag && WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var self = this;
            if (!this._click_wcjtn_TimingTag) {
                this._click_wcjtn_TimingTag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        //todo:你的代码
        this.close_wcjtn_View();
        ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.Export2View);
    };
    Game_wcjtn_Win_wcjtn_ViewTemplate.prototype.onNext_wcjtn_Btn = function () {
        if (!this._click_wcjtn_Tag && WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag) {
            var self = this;
            if (!this._click_wcjtn_TimingTag) {
                this._click_wcjtn_TimingTag = true;
                var btnMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().btn_wcjtn_Move_wcjtn_Timer;
                var bannerMoveTimer = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().banner_wcjtn_Move_wcjtn_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
            return;
        }
        //todo:你的代码
        this.close_wcjtn_View();
        // View_wcjtn_Mgr.ins_wcjtn_tance.open_wcjtn_View(View_wcjtn_Def.Export2View);        
        ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.MyMainView);
    };
    Game_wcjtn_Win_wcjtn_ViewTemplate.prototype.BannerUp = function () {
        var _this = this;
        var self = this;
        WXADMgr_1.default.get_wcjtn_Banner(function (banner) {
            if (null != self._banner) {
                _this._banner._wcjtn_hide_wcjtn_();
            }
            self._banner = banner;
            if (null != self._banner) {
                _this._banner._wcjtn_show_wcjtn_();
            }
            if (_this.is_wcjtn_Show_wcjtn_HistoryBtn) {
                self.History_wcjtn_Btn.visible = true;
            }
        });
    };
    Game_wcjtn_Win_wcjtn_ViewTemplate.prototype.BtnUp = function () {
        this._click_wcjtn_Tag = true;
        this._back_wcjtn_Btn.y = 720;
        this._next_wcjtn_Btn.y = 720;
    };
    Game_wcjtn_Win_wcjtn_ViewTemplate.prototype.onDestroy = function () {
        if (null != this._banner) {
            this._banner._wcjtn_hide_wcjtn_();
        }
        this._banner = null;
    };
    Game_wcjtn_Win_wcjtn_ViewTemplate.prototype.on_wcjtn_History_wcjtn_Btn = function () {
        var self = this;
        ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.MiniGameView, null, function (v) {
            self.hide_wcjtn_();
            if (null != self._banner) {
                self._banner._wcjtn_hide_wcjtn_();
            }
            v.on_wcjtn_CloseEvent = function () {
                if (null != self.View_wcjtn_ && !self.View_wcjtn_.destroyed) {
                    self.show_wcjtn_();
                    if (null != self._banner) {
                        self._banner._wcjtn_show_wcjtn_();
                    }
                }
            };
        });
    };
    return Game_wcjtn_Win_wcjtn_ViewTemplate;
}(TemplateViewBase_1.default));
exports.default = Game_wcjtn_Win_wcjtn_ViewTemplate;
},{"../../../Config/AppSwitchConfig":6,"../../../KRQ/Com/KRQ_RollSingleAd":21,"../../../Mgr/ViewMgr":34,"../../../Mgr/WXADMgr":35,"../../../Mgr/WudianMgr":36,"../../../Utilit":81,"../TemplateViewBase":123}],118:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var KRQ_Main_1 = require("../../../KRQ/ViewCom/KRQ_Main");
var Utilit_1 = require("../../../Utilit");
var In_wcjtn_Game_wcjtn_ShowType;
(function (In_wcjtn_Game_wcjtn_ShowType) {
    In_wcjtn_Game_wcjtn_ShowType[In_wcjtn_Game_wcjtn_ShowType["_wcjtn_Normal_wcjtn_"] = 0] = "_wcjtn_Normal_wcjtn_";
    In_wcjtn_Game_wcjtn_ShowType[In_wcjtn_Game_wcjtn_ShowType["_wcjtn_NoLoopAd_wcjtn_"] = 1] = "_wcjtn_NoLoopAd_wcjtn_";
    In_wcjtn_Game_wcjtn_ShowType[In_wcjtn_Game_wcjtn_ShowType["_wcjtn_NoBannerAd_wcjtn_"] = 2] = "_wcjtn_NoBannerAd_wcjtn_";
})(In_wcjtn_Game_wcjtn_ShowType = exports.In_wcjtn_Game_wcjtn_ShowType || (exports.In_wcjtn_Game_wcjtn_ShowType = {}));
var In_wcjtn_Game_wcjtn_View_wcjtn_Template = /** @class */ (function (_super) {
    __extends(In_wcjtn_Game_wcjtn_View_wcjtn_Template, _super);
    function In_wcjtn_Game_wcjtn_View_wcjtn_Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._krq_wcjtn_Main = null;
        return _this;
    }
    In_wcjtn_Game_wcjtn_View_wcjtn_Template.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        this._krq_wcjtn_Main = this.View_wcjtn_.getChildByName("KRQ_Main").getComponent(KRQ_Main_1.default);
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
        else {
            this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top - 200;
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
    };
    In_wcjtn_Game_wcjtn_View_wcjtn_Template.prototype.open_wcjtn_View = function (data) {
        _super.prototype.open_wcjtn_View.call(this, data);
        if (null != data && null != data.showType) {
            var showType = data.showType;
            switch (showType) {
                case In_wcjtn_Game_wcjtn_ShowType._wcjtn_Normal_wcjtn_:
                    this._krq_wcjtn_Main.switchState(KRQ_Main_1.KRQ_Main_wcjtn_State._wcjtn_Normal_wcjtn_);
                    break;
                case In_wcjtn_Game_wcjtn_ShowType._wcjtn_NoLoopAd_wcjtn_:
                    this._krq_wcjtn_Main.switchState(KRQ_Main_1.KRQ_Main_wcjtn_State._wcjtn_NoLoopAd_wcjtn_);
                    break;
                case In_wcjtn_Game_wcjtn_ShowType._wcjtn_NoBannerAd_wcjtn_:
                    this._krq_wcjtn_Main.switchState(KRQ_Main_1.KRQ_Main_wcjtn_State._wcjtn_NoBannerAd_wcjtn_);
                    break;
            }
        }
    };
    In_wcjtn_Game_wcjtn_View_wcjtn_Template.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
    };
    In_wcjtn_Game_wcjtn_View_wcjtn_Template.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
    };
    In_wcjtn_Game_wcjtn_View_wcjtn_Template.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
    };
    return In_wcjtn_Game_wcjtn_View_wcjtn_Template;
}(TemplateViewBase_1.default));
exports.default = In_wcjtn_Game_wcjtn_View_wcjtn_Template;
},{"../../../KRQ/ViewCom/KRQ_Main":26,"../../../Utilit":81,"../TemplateViewBase":123}],119:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var KRQ_Main_1 = require("../../../KRQ/ViewCom/KRQ_Main");
var EventMgr_1 = require("../../../Event/EventMgr");
var EventDef_1 = require("../../../Event/EventDef");
var User_1 = require("../../../User/User");
var Utilit_1 = require("../../../Utilit");
var Main_wcjtn_View_wcjtn_Template = /** @class */ (function (_super) {
    __extends(Main_wcjtn_View_wcjtn_Template, _super);
    function Main_wcjtn_View_wcjtn_Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._krq_wcjtn_Main = null;
        _this._center_wcjtn_Zone = null;
        _this._start_wcjtn_Btn = null;
        _this._level_wcjtn_Num = null;
        _this._money_wcjtn_Num = null;
        return _this;
    }
    Main_wcjtn_View_wcjtn_Template.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._krq_wcjtn_Main = this.View_wcjtn_.getChildByName("KRQ_Main").getComponent(KRQ_Main_1.default);
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        var aspectRatio = Laya.stage.width / Laya.stage.height;
        if (aspectRatio < 0.5) {
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
        else {
            this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top - 200;
            if (Utilit_1.default.is_wcjtn_IphoneX()) {
                this._center_wcjtn_Zone.top = this._center_wcjtn_Zone.top + 75;
            }
        }
        this._start_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("StartBtn");
        this._level_wcjtn_Num = this._center_wcjtn_Zone.getChildByName("LevelInfo").getChildByName("LevelNum");
        this._money_wcjtn_Num = this._center_wcjtn_Zone.getChildByName("MoneyInfo").getChildByName("MoneyNum");
    };
    Main_wcjtn_View_wcjtn_Template.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
        this._money_wcjtn_Num.value = String(User_1.default.get_wcjtn_Money());
        this._level_wcjtn_Num.value = String(User_1.default.get_wcjtn_LeveNum());
    };
    Main_wcjtn_View_wcjtn_Template.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._start_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Start_wcjtn_Btn);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change, this, this.on_wcjtn_UserMoney_wcjtn_Change);
    };
    Main_wcjtn_View_wcjtn_Template.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._start_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Start_wcjtn_Btn);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.Game_On_wcjtn_User_wcjtn_Money_wcjtn_Change, this, this.on_wcjtn_UserMoney_wcjtn_Change);
    };
    Main_wcjtn_View_wcjtn_Template.prototype.on_wcjtn_Start_wcjtn_Btn = function () {
    };
    Main_wcjtn_View_wcjtn_Template.prototype.on_wcjtn_UserMoney_wcjtn_Change = function (para) {
        var curr = para.curr;
        var last = para.last;
        this._money_wcjtn_Num.value = String(curr);
    };
    return Main_wcjtn_View_wcjtn_Template;
}(TemplateViewBase_1.default));
exports.default = Main_wcjtn_View_wcjtn_Template;
},{"../../../Event/EventDef":9,"../../../Event/EventMgr":10,"../../../KRQ/ViewCom/KRQ_Main":26,"../../../User/User":80,"../../../Utilit":81,"../TemplateViewBase":123}],120:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../ViewBase");
var KRQ_History_1 = require("../../../KRQ/Com/KRQ_History/KRQ_History");
var Mini_wcjtn_Game_wcjtn_View_wcjtn_Template = /** @class */ (function (_super) {
    __extends(Mini_wcjtn_Game_wcjtn_View_wcjtn_Template, _super);
    function Mini_wcjtn_Game_wcjtn_View_wcjtn_Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._krq_wcjtn_history = null;
        return _this;
    }
    Mini_wcjtn_Game_wcjtn_View_wcjtn_Template.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._krq_wcjtn_history = this.View_wcjtn_.getChildByName("KRQ_History").getComponent(KRQ_History_1.default);
        var self = this;
        this._krq_wcjtn_history.On_wcjtn_Back_wcjtn_Btn_wcjtn_Click = function () {
            self.close_wcjtn_View();
        };
    };
    Mini_wcjtn_Game_wcjtn_View_wcjtn_Template.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
    };
    Mini_wcjtn_Game_wcjtn_View_wcjtn_Template.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
    };
    Mini_wcjtn_Game_wcjtn_View_wcjtn_Template.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
    };
    return Mini_wcjtn_Game_wcjtn_View_wcjtn_Template;
}(ViewBase_1.default));
exports.default = Mini_wcjtn_Game_wcjtn_View_wcjtn_Template;
},{"../../../KRQ/Com/KRQ_History/KRQ_History":15,"../../ViewBase":130}],121:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../ViewBase");
var AppSwitchConfig_1 = require("../../../Config/AppSwitchConfig");
var OPPOAPI_1 = require("../../../OPPOAPI");
var WudianMgr_1 = require("../../../Mgr/WudianMgr");
var OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate = /** @class */ (function (_super) {
    __extends(OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate, _super);
    function OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._native_wcjtn_Ad = null;
        _this._cur_wcjtn_AdItem = null;
        return _this;
    }
    OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate.prototype.onAwake = function () {
        this._center_wcjtn_Zone = this.owner.getChildByName("CenterZone");
        this._dis_wcjtn_play = this._center_wcjtn_Zone.getChildByName("Display");
        this._ok_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("OkBtn");
        this._close_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("CloseBtn");
        this._bg_wcjtn_ = this.owner.getChildByName("BG");
    };
    OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate.prototype.onEnable = function () {
        var _this = this;
        _super.prototype.onEnable.call(this);
        this.load_wcjtn_Ad();
        this._bg_wcjtn_.height = Laya.stage.height;
        this._close_wcjtn_Btn.visible = false;
        Laya.timer.once(AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().oppo_wcjtn_cfg.btn_wcjtn_Show_wcjtn_Timer, this, function () {
            _this._close_wcjtn_Btn.visible = true;
        });
    };
    OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._ok_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Ok_wcjtn_Btn);
        this._close_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_Close_wcjtn_Btn);
        this._dis_wcjtn_play.on(Laya.Event.CLICK, this, this.on_wcjtn_Display_wcjtn_Click);
    };
    OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._ok_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Ok_wcjtn_Btn);
        this._close_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_Close_wcjtn_Btn);
        this._dis_wcjtn_play.off(Laya.Event.CLICK, this, this.on_wcjtn_Display_wcjtn_Click);
    };
    OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate.prototype.load_wcjtn_Ad = function () {
        var self = this;
        var ipBlocked = WudianMgr_1.default.Get_wcjtn_Ip_wcjtn_Blocked();
        if (!ipBlocked) {
            self.close_wcjtn_View();
            return;
        }
        if (Laya.Browser.onQGMiniGame) {
            if (this._native_wcjtn_Ad) {
                this._native_wcjtn_Ad.destroy();
                this._native_wcjtn_Ad = null;
            }
            this._cur_wcjtn_AdItem = null;
            this._native_wcjtn_Ad = qg.createNativeAd({
                posId: OPPOAPI_1.default.Native_wcjtn_AdId
            });
            this._native_wcjtn_Ad.load();
            this._native_wcjtn_Ad.onLoad(function (res) {
                console.log("原生广告加载成功：", res);
                var adlist = res.adList;
                for (var i = 0; i < adlist.length; ++i) {
                    var ad = adlist[i];
                    console.log("原生广告数据：", i);
                    for (var key in ad) {
                        console.log(key, ad[key]);
                    }
                }
                self._cur_wcjtn_AdItem = adlist[Math.floor(Math.random() * adlist.length)];
                if (null != self._cur_wcjtn_AdItem) {
                    for (var i = 0; i < self._cur_wcjtn_AdItem.imgUrlList.length; ++i) {
                        console.log("imgUrlList : ", i + " ", self._cur_wcjtn_AdItem.imgUrlList[i]);
                    }
                    var imgulr = self._cur_wcjtn_AdItem.imgUrlList[Math.floor(Math.random() * self._cur_wcjtn_AdItem.imgUrlList.length)];
                    self._dis_wcjtn_play.loadImage(imgulr);
                    self._native_wcjtn_Ad.reportAdShow({
                        adId: self._cur_wcjtn_AdItem.adId
                    });
                    console.log("加载图片", imgulr);
                    console.log("点击上报！！！");
                }
                self._center_wcjtn_Zone.visible = true;
            });
            this._native_wcjtn_Ad.onError(function (res) {
                console.log("原生广告加载失败：", res);
                for (var key in res) {
                    console.log(key, res[key]);
                }
                self.close_wcjtn_View();
            });
            this._center_wcjtn_Zone.visible = false;
        }
    };
    OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate.prototype.on_wcjtn_Close_wcjtn_Btn = function () {
        this.close_wcjtn_View();
    };
    OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate.prototype.on_wcjtn_Ok_wcjtn_Btn = function () {
        if (Math.random() * 100 <= AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().oppo_wcjtn_cfg.yuan_wcjtn_sheng) {
            console.log("进入变态广告");
            this.on_wcjtn_Display_wcjtn_Click();
        }
        this.close_wcjtn_View();
    };
    OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate.prototype.on_wcjtn_Display_wcjtn_Click = function () {
        if (null != this._native_wcjtn_Ad && null != this._cur_wcjtn_AdItem) {
            console.log("点击上报！！！");
            this._native_wcjtn_Ad.reportAdClick({
                adId: this._cur_wcjtn_AdItem.adId
            });
        }
    };
    OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        if (Laya.Browser.onQGMiniGame) {
            if (this._native_wcjtn_Ad) {
                this._native_wcjtn_Ad.destroy();
            }
            this._native_wcjtn_Ad = null;
            this._cur_wcjtn_AdItem = null;
        }
    };
    return OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate;
}(ViewBase_1.default));
exports.default = OPPO_wcjtn_NativeAd_wcjtn_ViewTemplate;
},{"../../../Config/AppSwitchConfig":6,"../../../Mgr/WudianMgr":36,"../../../OPPOAPI":73,"../../ViewBase":130}],122:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateViewBase_1 = require("../TemplateViewBase");
var Reward_wcjtn_View_wcjtn_Template = /** @class */ (function (_super) {
    __extends(Reward_wcjtn_View_wcjtn_Template, _super);
    function Reward_wcjtn_View_wcjtn_Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._center_wcjtn_Zone = null;
        _this._reward_wcjtn_Btn = null;
        _this._skip_wcjtn_Btn = null;
        return _this;
    }
    Reward_wcjtn_View_wcjtn_Template.prototype.onAwake = function () {
        _super.prototype.onAwake.call(this);
        this._center_wcjtn_Zone = this.View_wcjtn_.getChildByName("CenterZone");
        this._reward_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("RewradBtn");
        this._skip_wcjtn_Btn = this._center_wcjtn_Zone.getChildByName("SkipBtn");
    };
    Reward_wcjtn_View_wcjtn_Template.prototype.onStart = function () {
        _super.prototype.onStart.call(this);
    };
    Reward_wcjtn_View_wcjtn_Template.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._reward_wcjtn_Btn.on(Laya.Event.CLICK, this, this.onRewardBtn);
        this._skip_wcjtn_Btn.on(Laya.Event.CLICK, this, this.onSkipBtn);
    };
    Reward_wcjtn_View_wcjtn_Template.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._reward_wcjtn_Btn.off(Laya.Event.CLICK, this, this.onRewardBtn);
        this._skip_wcjtn_Btn.off(Laya.Event.CLICK, this, this.onSkipBtn);
    };
    Reward_wcjtn_View_wcjtn_Template.prototype.onRewardBtn = function () {
    };
    Reward_wcjtn_View_wcjtn_Template.prototype.onSkipBtn = function () {
    };
    return Reward_wcjtn_View_wcjtn_Template;
}(TemplateViewBase_1.default));
exports.default = Reward_wcjtn_View_wcjtn_Template;
},{"../TemplateViewBase":123}],123:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var Utilit_1 = require("../../Utilit");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var WudianMgr_1 = require("../../Mgr/WudianMgr");
var WXAPI_1 = require("../../WXAPI");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var QQMiniGameAPI_1 = require("../../QQMiniGameAPI");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var Template_wcjtn_View_wcjtn_Base = /** @class */ (function (_super) {
    __extends(Template_wcjtn_View_wcjtn_Base, _super);
    function Template_wcjtn_View_wcjtn_Base() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._history_wcjtn_Btn = null;
        _this._top_wcjtn_Zone = null;
        return _this;
    }
    Object.defineProperty(Template_wcjtn_View_wcjtn_Base.prototype, "History_wcjtn_Btn", {
        get: function () {
            if (null == this._history_wcjtn_Btn) {
                this._history_wcjtn_Btn = this.Top_wcjtn_Zone.getChildByName("HistoryBtn");
            }
            return this._history_wcjtn_Btn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Template_wcjtn_View_wcjtn_Base.prototype, "Top_wcjtn_Zone", {
        get: function () {
            if (null == this._top_wcjtn_Zone) {
                this._top_wcjtn_Zone = this.View_wcjtn_.getChildByName("TopZone");
            }
            return this._top_wcjtn_Zone;
        },
        enumerable: true,
        configurable: true
    });
    Template_wcjtn_View_wcjtn_Base.prototype.onAwake = function () {
        this._top_wcjtn_Zone = this.View_wcjtn_.getChildByName("TopZone");
        if (Utilit_1.default.is_wcjtn_IphoneX()) {
            this._top_wcjtn_Zone.top = this._top_wcjtn_Zone.top + 75;
        }
        this._history_wcjtn_Btn = this._top_wcjtn_Zone.getChildByName("HistoryBtn");
        if (-1 == WudianMgr_1.default.Ip_wcjtn_Block_wcjtn_Flag()) {
            this._history_wcjtn_Btn.visible = false;
        }
        else {
            this._history_wcjtn_Btn.visible = this.is_wcjtn_Show_wcjtn_HistoryBtn;
        }
    };
    Template_wcjtn_View_wcjtn_Base.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this.History_wcjtn_Btn.on(Laya.Event.CLICK, this, this.on_wcjtn_History_wcjtn_Btn);
        EventMgr_1.default.ins_wcjtn_tance.reg_wcjtn_Evemt(EventDef_1.Event_wcjtn_Def.App_On_wcjtn_Update_wcjtn_IpBlockState, this, this.on_wcjtn_UpdateIp_wcjtn_BlockState);
    };
    Template_wcjtn_View_wcjtn_Base.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this.History_wcjtn_Btn.off(Laya.Event.CLICK, this, this.on_wcjtn_History_wcjtn_Btn);
        EventMgr_1.default.ins_wcjtn_tance.remove_wcjtn_Event(EventDef_1.Event_wcjtn_Def.App_On_wcjtn_Update_wcjtn_IpBlockState, this, this.on_wcjtn_UpdateIp_wcjtn_BlockState);
    };
    Template_wcjtn_View_wcjtn_Base.prototype.on_wcjtn_History_wcjtn_Btn = function () {
        var self = this;
        ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.MiniGameView, null, function (v) {
            self.hide_wcjtn_();
            v.on_wcjtn_CloseEvent = function () {
                if (null != self.View_wcjtn_ && !self.View_wcjtn_.destroyed) {
                    self.show_wcjtn_();
                }
            };
        });
    };
    Object.defineProperty(Template_wcjtn_View_wcjtn_Base.prototype, "is_wcjtn_Show_wcjtn_HistoryBtn", {
        get: function () {
            var launchScene = 0;
            if (Laya.Browser.onMiniGame) {
                launchScene = WXAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
            }
            else if (Laya.Browser.onQQMiniGame) {
                launchScene = QQMiniGameAPI_1.default.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync().scene;
            }
            var noEnterBySearch = true;
            var wudianSceneList = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wu_wcjtn_dian_wcjtn_Scene_wcjtn_List;
            for (var i = 0; i < wudianSceneList.length; ++i) {
                var wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            if (Laya.Browser.onQGMiniGame || !noEnterBySearch || !WudianMgr_1.default.Get_wcjtn_Ip_wcjtn_Blocked()
                || 0 == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().fakeBtn) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Template_wcjtn_View_wcjtn_Base.prototype.on_wcjtn_UpdateIp_wcjtn_BlockState = function (para) {
        this._history_wcjtn_Btn.visible = this.is_wcjtn_Show_wcjtn_HistoryBtn;
    };
    return Template_wcjtn_View_wcjtn_Base;
}(ViewBase_1.default));
exports.default = Template_wcjtn_View_wcjtn_Base;
},{"../../Config/AppSwitchConfig":6,"../../Event/EventDef":9,"../../Event/EventMgr":10,"../../Mgr/ViewMgr":34,"../../Mgr/WudianMgr":36,"../../QQMiniGameAPI":74,"../../Utilit":81,"../../WXAPI":131,"../ViewBase":130}],124:[function(require,module,exports){
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
    WXCrazyClick.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        Laya.stage.on(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
    };
    WXCrazyClick.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
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
    WXCrazyClick.prototype.open_wcjtn_View = function (data) {
        this._compeletFunction = data.Complete;
        this._titel = data.titel;
        _super.prototype.open_wcjtn_View.call(this, data);
    };
    WXCrazyClick.prototype.OpenPrizeWindow = function () {
        var self = this;
        this._prizeCount_Text.text = this._titel;
        this._getPrize_View.visible = true;
        this._confirm_Btn.once(Laya.Event.CLICK, this, function () {
            if (null != self._banner) {
                self._banner._wcjtn_hide_wcjtn_();
            }
            if (self._compeletFunction) {
                self._compeletFunction();
            }
            self.close_wcjtn_View();
        });
    };
    WXCrazyClick.prototype.ShowBanner = function () {
        var self = this;
        WXADMgr_1.default.get_wcjtn_Banner(function (banner) {
            if (null != self._banner) {
                self._banner._wcjtn_hide_wcjtn_();
            }
            self._banner = banner;
            if (null != self._banner) {
                self._banner._wcjtn_show_wcjtn_();
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
            if (WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag && 1 == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wxcfg.kuang_wcjtn_dian_wcjtn_Banner) {
                this.ShowBanner();
            }
            Laya.timer.once(2000, this, function () {
                this.BannerClicked();
            });
        }
        else if (this._totalClickTime > this._totalClickTimer) {
            if (WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag && 1 == AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wxcfg.kuang_wcjtn_dian_wcjtn_Banner) {
                this.ShowBanner();
            }
            this.BannerClicked();
        }
        var progress = (this._clickTime / this._needClickTime) * this._clickBarOriginalWidth;
        this._clickBar.width = progress;
    };
    WXCrazyClick.prototype.BannerClicked = function () {
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.AD_Wu_wcjtn_dian_wcjtn_Banner__wcjtn_Hide);
        this._bannerClicked = true;
        this._clickTime = this._needClickTime;
        this._clickBar.width = this._clickBarOriginalWidth;
        this._click_Btn.visible = false;
        this.OpenPrizeWindow();
    };
    WXCrazyClick.prototype.onDestroy = function () {
        if (null != this._banner) {
            this._banner._wcjtn_hide_wcjtn_();
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
},{"../../../Config/AppSwitchConfig":6,"../../../Event/EventDef":9,"../../../Event/EventMgr":10,"../../../Mgr/WXADMgr":35,"../../../Mgr/WudianMgr":36,"../../ViewBase":130}],125:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var Tips_wcjtn_View = /** @class */ (function (_super) {
    __extends(Tips_wcjtn_View, _super);
    function Tips_wcjtn_View() {
        return _super.call(this) || this;
    }
    Tips_wcjtn_View.prototype.onAwake = function () {
        this._wcjtn__bg_wcjtn_ = this.owner.getChildByName("Bg");
        this._wcjtn__bg_wcjtn_.x = Laya.stage.width / 2 - this._wcjtn__bg_wcjtn_.width / 2;
        this._tips_wcjtn_Text = this._wcjtn__bg_wcjtn_.getChildByName("Text");
    };
    Tips_wcjtn_View.prototype.open_wcjtn_View = function (data) {
        _super.prototype.open_wcjtn_View.call(this, data);
        this.set_wcjtn_Tips_wcjtn_Msg(data);
        Laya.timer.clearAll(this);
        var self = this;
        Laya.timer.once(3000, this, function () {
            self.close_wcjtn_View();
        });
    };
    Tips_wcjtn_View.prototype.set_wcjtn_Tips_wcjtn_Msg = function (msg) {
        this._tips_wcjtn_Text.text = msg;
    };
    return Tips_wcjtn_View;
}(ViewBase_1.default));
exports.default = Tips_wcjtn_View;
},{"../ViewBase":130}],126:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Twinkle_wcjtn_Sprite = /** @class */ (function (_super) {
    __extends(Twinkle_wcjtn_Sprite, _super);
    function Twinkle_wcjtn_Sprite() {
        var _this = _super.call(this) || this;
        /** @prop {name:TwinkleSpeed, tips:"闪动速度", type:Number, default:1000}*/
        _this.TwinkleSpeed = 1000;
        /** @prop {name:TwinkleMinSize, tips:"最小缩放", type:Number, default:0.95}*/
        _this.TwinkleMinSize = 0.95;
        /** @prop {name:TwinkleMaxSize, tips:"最大缩放", type:Number, default:1.05}*/
        _this.TwinkleMaxSize = 1.05;
        _this._ani_wcjtn_Forward = false;
        _this._font_wcjtn_Size = 25;
        _this._origin_wcjtn_Size = 1;
        return _this;
    }
    Twinkle_wcjtn_Sprite.prototype.onAwake = function () {
        this._display_wcjtn_Sp = this.owner;
        this._dis_wcjtn_Text = this.owner.getChildByName("TitelText");
        this._origin_wcjtn_Size = this._display_wcjtn_Sp.scaleX;
        if (this._dis_wcjtn_Text != null) {
            this._dis_wcjtn_Text.text = "";
            this._font_wcjtn_Size = this._dis_wcjtn_Text.fontSize;
        }
    };
    Twinkle_wcjtn_Sprite.prototype.onEnable = function () {
        this._display_wcjtn_Sp.scale(this._origin_wcjtn_Size, this._origin_wcjtn_Size);
    };
    Twinkle_wcjtn_Sprite.prototype.onDisable = function () {
    };
    Twinkle_wcjtn_Sprite.prototype.onUpdate = function () {
        this.display_wcjtn_Ani();
    };
    Twinkle_wcjtn_Sprite.prototype.display_wcjtn_Ani = function () {
        if (!this._ani_wcjtn_Forward) {
            var scale = this._display_wcjtn_Sp.scaleX - Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.max(scale, this.TwinkleMinSize * this._origin_wcjtn_Size);
            this._display_wcjtn_Sp.scale(scale, scale);
            if (this._display_wcjtn_Sp.scaleX <= this.TwinkleMinSize * this._origin_wcjtn_Size) {
                this._ani_wcjtn_Forward = true;
            }
        }
        else {
            var scale = this._display_wcjtn_Sp.scaleX + Laya.timer.delta / this.TwinkleSpeed;
            scale = Math.min(scale, this.TwinkleMaxSize * this._origin_wcjtn_Size);
            this._display_wcjtn_Sp.scale(scale, scale);
            if (this._display_wcjtn_Sp.scaleX >= this.TwinkleMaxSize * this._origin_wcjtn_Size) {
                this._ani_wcjtn_Forward = false;
            }
        }
    };
    return Twinkle_wcjtn_Sprite;
}(Laya.Script));
exports.default = Twinkle_wcjtn_Sprite;
},{}],127:[function(require,module,exports){
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
        Laya.timer.once(AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().vivocfg.btnShowTimer, this, function () {
            _this._closeBtn.visible = true;
        });
    };
    VVNativeAd1View.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
        this._okBtn.on(Laya.Event.CLICK, this, this.onOkBtn);
        this._closeBtn.on(Laya.Event.CLICK, this, this.onCloseBtn);
        this._display.on(Laya.Event.CLICK, this, this.onDisplayClick);
    };
    VVNativeAd1View.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
        this._okBtn.off(Laya.Event.CLICK, this, this.onOkBtn);
        this._closeBtn.off(Laya.Event.CLICK, this, this.onCloseBtn);
        this._display.off(Laya.Event.CLICK, this, this.onDisplayClick);
    };
    VVNativeAd1View.prototype.loadAd = function () {
        var self = this;
        var ipBlocked = WudianMgr_1.default.Get_wcjtn_Ip_wcjtn_Blocked();
        if (!ipBlocked) {
            self.close_wcjtn_View();
            return;
        }
        if (Laya.Browser.onVVMiniGame) {
            if (this._nativeAd) {
                this._nativeAd.destroy();
                this._nativeAd = null;
            }
            this._curAdItem = null;
            this._nativeAd = qg.createNativeAd({
                posId: VIVOAPI_1.default.native_wcjtn_AdId
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
                self.close_wcjtn_View();
            });
            this._centerZone.visible = false;
        }
    };
    VVNativeAd1View.prototype.onCloseBtn = function () {
        this.close_wcjtn_View();
    };
    VVNativeAd1View.prototype.onOkBtn = function () {
        if (Math.random() * 100 <= AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().vivocfg.yuansheng) {
            console.log("进入变态广告");
            this.onDisplayClick();
        }
        this.close_wcjtn_View();
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
},{"../../../Config/AppSwitchConfig":6,"../../../Mgr/WudianMgr":36,"../../../VIVOAPI":82,"../VVTemplateViewBase":129}],128:[function(require,module,exports){
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
        if (Math.random() * 100 <= AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().vivocfg.yuansheng2) {
            console.log("进入变态广告");
            this.onDisplayClick();
        }
        this.close_wcjtn_View();
    };
    return VVNativeAd2View;
}(VVNativeAd1View_1.default));
exports.default = VVNativeAd2View;
},{"../../../Config/AppSwitchConfig":6,"./VVNativeAd1View":127}],129:[function(require,module,exports){
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
    VVTemplateViewBase.prototype.add_wcjtn_Event = function () {
        _super.prototype.add_wcjtn_Event.call(this);
    };
    VVTemplateViewBase.prototype.remove_wcjtn_Event = function () {
        _super.prototype.remove_wcjtn_Event.call(this);
    };
    return VVTemplateViewBase;
}(ViewBase_1.default));
exports.default = VVTemplateViewBase;
},{"../ViewBase":130}],130:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("../Mgr/ViewMgr");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var Utilit_1 = require("../Utilit");
var IViewStateListener_1 = require("./IViewStateListener");
//界面基类，所有功能模块界面继承于这个类。这种类型的界面不能嵌套。
var View_wcjtn_Base = /** @class */ (function (_super) {
    __extends(View_wcjtn_Base, _super);
    function View_wcjtn_Base() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.on_wcjtn_CloseEvent = null;
        _this.on_wcjtn_OpenEvent = null;
        _this._viewBase = true;
        _this._viewDef = ViewMgr_1.View_wcjtn_Def.None;
        _this._data = {};
        return _this;
    }
    Object.defineProperty(View_wcjtn_Base.prototype, "View_wcjtn_", {
        get: function () {
            return this.owner;
        },
        enumerable: true,
        configurable: true
    });
    View_wcjtn_Base.prototype.onAwake = function () {
        this.View_wcjtn_.autoDestroyAtClosed = true;
    };
    View_wcjtn_Base.prototype.onEnable = function () {
        this.add_wcjtn_Event();
    };
    View_wcjtn_Base.prototype.onDisable = function () {
        this.remove_wcjtn_Event();
    };
    View_wcjtn_Base.prototype.onDestroy = function () {
        this.remove_wcjtn_Event();
    };
    View_wcjtn_Base.prototype.open_wcjtn_View = function (data) {
        this._data = data;
        this.show_wcjtn_();
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.Game_On_wcjtn_View_wcjtn_Open, { view: this._viewDef });
        if (this.on_wcjtn_OpenEvent) {
            this.on_wcjtn_OpenEvent();
        }
    };
    View_wcjtn_Base.prototype.add_wcjtn_Event = function () {
    };
    View_wcjtn_Base.prototype.remove_wcjtn_Event = function () {
        Laya.timer.clearAll(this);
    };
    View_wcjtn_Base.prototype.close_wcjtn_View = function () {
        ViewMgr_1.default.ins_wcjtn_tance.close_wcjtn_View(this._viewDef);
    };
    View_wcjtn_Base.prototype.hide_wcjtn_ = function () {
        var _this = this;
        this.View_wcjtn_.visible = false;
        this.onHide();
        Utilit_1.default.for_wcjtn_Each_wcjtn_Child(this.owner, function (child) {
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
    View_wcjtn_Base.prototype.show_wcjtn_ = function () {
        var _this = this;
        this.View_wcjtn_.visible = true;
        this.onShow();
        Utilit_1.default.for_wcjtn_Each_wcjtn_Child(this.owner, function (child) {
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
    View_wcjtn_Base.prototype.view_wcjtn_IsHide = function () {
        return this.View_wcjtn_.visible;
    };
    View_wcjtn_Base.prototype.onHide = function () { };
    View_wcjtn_Base.prototype.onShow = function () { };
    View_wcjtn_Base.prototype.onClose = function () {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        EventMgr_1.default.ins_wcjtn_tance.dis_wcjtn_patch(EventDef_1.Event_wcjtn_Def.Game_On_wcjtn_View_wcjtn_Close, { view: this._viewDef });
        if (this.on_wcjtn_CloseEvent) {
            this.on_wcjtn_CloseEvent();
        }
    };
    return View_wcjtn_Base;
}(Laya.Script));
exports.default = View_wcjtn_Base;
},{"../Event/EventDef":9,"../Event/EventMgr":10,"../Mgr/ViewMgr":34,"../Utilit":81,"./IViewStateListener":88}],131:[function(require,module,exports){
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
var WX_wcjtn_API = /** @class */ (function () {
    function WX_wcjtn_API() {
    }
    WX_wcjtn_API._wcjtn_wxLogin_wcjtn_ = function (onSuccess, onFail) {
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
    WX_wcjtn_API.on_wcjtn_Rewarded_wcjtn_VideoAdLoad = function () {
        console.log('激励视频 广告加载完成');
    };
    WX_wcjtn_API.onRewarded_wcjtn_Video_wcjtn_AdError = function (err) {
        console.log('激励视频 广告加载失败' + err);
        if (WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Failed) {
            WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Failed();
        }
    };
    WX_wcjtn_API.on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close = function (res) {
        if ((res && res.isEnded) || res == null) {
            console.log('激励视频 已完整观看');
            if (WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close) {
                WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close(true);
            }
        }
        else {
            console.log('激励视频 未完整观看');
            if (WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close) {
                WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close(false);
            }
        }
    };
    WX_wcjtn_API.reg_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Event = function (rewardedVideoAd) {
        rewardedVideoAd.onLoad(WX_wcjtn_API.on_wcjtn_Rewarded_wcjtn_VideoAdLoad);
        rewardedVideoAd.onError(WX_wcjtn_API.onRewarded_wcjtn_Video_wcjtn_AdError);
        rewardedVideoAd.onClose(WX_wcjtn_API.on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close);
        WX_wcjtn_API._isReg_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Event = true;
    };
    WX_wcjtn_API.show_wcjtn_Rewarded_wcjtn_VideoAd = function (onAdClose, onFailed) {
        if (Laya.Browser.onMiniGame) {
            WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close = onAdClose;
            WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Failed = onFailed;
            var rewardedVideoAd = Laya.Browser.window["wx"].createRewardedVideoAd({
                adUnitId: WX_wcjtn_API.ad_wcjtn_UnitId,
            });
            if (!WX_wcjtn_API._isReg_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Event) {
                WX_wcjtn_API.reg_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Event(rewardedVideoAd);
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
    WX_wcjtn_API.navigate_wcjtn_To_wcjtn_MiniProgram = function (appId, path, onSuccess, onFail, onComplate) {
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
    WX_wcjtn_API.share_wcjtn_ = function (complate, titel, imageUrl) {
        var _this = this;
        if (Laya.Browser.onMiniGame) {
            WX_wcjtn_API._onShow = function () {
                Laya.Browser.window["wx"].offShow(WX_wcjtn_API._onShow);
                WX_wcjtn_API._onShow = null;
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
            Laya.Browser.window["wx"].onShow(WX_wcjtn_API._onShow);
            WX_wcjtn_API._lastShareTime = Date.now();
            Laya.Browser.window["wx"].shareAppMessage({
                title: titel,
                imageUrl: imageUrl
            });
        }
    };
    //----------------------------------------------------------------------
    //--------------------插屏幕广告---------------------------------------
    WX_wcjtn_API.show_wcjtn_Interstitial_wcjtn_Ad = function (onAdClose, onFailed) {
        if (Laya.Browser.onMiniGame) {
            var interstitialAd = Laya.Browser.window["wx"].createInterstitialAd({
                adUnitId: WX_wcjtn_API.Ins_wcjtn_AdUnitId,
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
    WX_wcjtn_API.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync = function () {
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
    WX_wcjtn_API.Set_wcjtn_Share_wcjtn_Menu = function (titel, imageUrl, success, fail, complate) {
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
    WX_wcjtn_API.check_wcjtn_Update = function () {
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
    WX_wcjtn_API.tryShowWXCrazyClick = function (titel, onComplete, onSuccess, onFail) {
        if (!WudianMgr_1.default.Wu_wcjtn_dian_wcjtn_Flag || 1 != AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wxcfg.kuang_wcjtn_dian_wcjtn_Banner) {
            if (onFail) {
                onFail();
            }
            return;
        }
        var kuangdianLevelSpcacing = AppSwitchConfig_1.default.get_wcjtn_Instance().get_wcjtn_App_wcjtn_Switch_wcjtn_Data().wxcfg.kuang_wcjtn_dian_wcjtn_LevelSpcacing;
        if (0 != kuangdianLevelSpcacing) {
            var left = WX_wcjtn_API._crazyClickShowCounter % kuangdianLevelSpcacing;
            if (0 == left) {
                ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.WXCrazyClick, {
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
            ++WX_wcjtn_API._crazyClickShowCounter;
        }
        else {
            ViewMgr_1.default.ins_wcjtn_tance.open_wcjtn_View(ViewMgr_1.View_wcjtn_Def.WXCrazyClick, {
                Complete: onComplete,
                titel: titel
            }, function (v) {
                if (onSuccess) {
                    onSuccess();
                }
            });
        }
    };
    WX_wcjtn_API.ad_wcjtn_UnitId = "adunit-227abbd25ba28da5";
    WX_wcjtn_API.banner_wcjtn_AdUnitId = "adunit-c3e631056309a4de";
    WX_wcjtn_API.Ins_wcjtn_AdUnitId = "adunit-440e21cc02c0d282";
    WX_wcjtn_API.GameRecorder = new GameRecorder();
    //-------------------------激励视频---------------------------------
    WX_wcjtn_API._isReg_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Event = false;
    WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Failed = null;
    WX_wcjtn_API._on_wcjtn_Rewarded_wcjtn_VideoAd_wcjtn_Close = null;
    //----------------------------------------------------------------------
    //---------------------分享----------------------------------------
    WX_wcjtn_API._onShow = null;
    WX_wcjtn_API._lastShareTime = 0;
    WX_wcjtn_API._crazyClickShowCounter = 0;
    return WX_wcjtn_API;
}());
exports.default = WX_wcjtn_API;
},{"./Config/AppSwitchConfig":6,"./Mgr/ViewMgr":34,"./Mgr/WudianMgr":36}],132:[function(require,module,exports){
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
            LoadingUI.uiView = { "type": "Scene", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Clip", "props": { "y": 0, "x": 1, "width": 750, "name": "Bg", "height": 1334 }, "compId": 6, "child": [{ "type": "Clip", "props": { "right": 0, "name": "BottomZone", "left": 0, "height": 570, "bottom": 100 }, "compId": 23, "child": [{ "type": "Clip", "props": { "y": 326, "x": 376, "width": 615, "skin": "Loading/loadingxiatiao.png", "pivotY": 22, "pivotX": 308, "name": "processBarBg", "height": 44, "sizeGrid": "0,25,0,25" }, "compId": 8, "child": [{ "type": "Clip", "props": { "y": 22, "x": 10, "width": 594, "skin": "Loading/loadingshangtiao.png", "pivotY": 13, "name": "processBar", "left": 11, "height": 26, "bottom": 9, "sizeGrid": "0,12,0,12" }, "compId": 5 }, { "type": "Sprite", "props": { "y": -24, "x": 292, "width": 143, "texture": "Loading/ziyuanjiazaizhong.png", "pivotY": 12, "pivotX": 72, "height": 23 }, "compId": 10, "child": [{ "type": "Sprite", "props": { "y": 15, "x": 149, "width": 6, "texture": "Loading/jiazaidunhao.png", "height": 5 }, "compId": 11 }, { "type": "Sprite", "props": { "y": 15, "x": 159, "width": 6, "texture": "Loading/jiazaidunhao.png", "height": 5 }, "compId": 12 }, { "type": "Sprite", "props": { "y": 15, "x": 168, "width": 6, "texture": "Loading/jiazaidunhao.png", "height": 5 }, "compId": 13 }] }] }] }] }, { "type": "Script", "props": { "y": 0, "x": 0, "runtime": "View/LoadingView/LoadingView.ts" }, "compId": 7 }, { "type": "Image", "props": { "x": 117, "width": 516, "top": 100, "skin": "Loading/我的车技特牛logo2.min.png", "name": "logo", "height": 357 }, "compId": 25 }], "loadList": ["Loading/loadingxiatiao.png", "Loading/loadingshangtiao.png", "Loading/ziyuanjiazaizhong.png", "Loading/jiazaidunhao.png", "Loading/我的车技特牛logo2.min.png"], "loadList3D": [] };
            return LoadingUI;
        }(Scene));
        View.LoadingUI = LoadingUI;
        REG("ui.View.LoadingUI", LoadingUI);
    })(View = ui.View || (ui.View = {}));
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[30])