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
    //todo:添加你自己的阿拉丁事件
})(ALDEventDef = exports.ALDEventDef || (exports.ALDEventDef = {}));
//阿拉丁相关接口
var ALD = /** @class */ (function () {
    function ALD() {
    }
    ALD.aldSendEvent = function (event, data) {
        var eventName = event;
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].aldSendEvent(eventName, data);
        }
    };
    ALD.aldSendReportAdClickSuccess = function (data) {
        var type = ALDEventDef.ReportAdClickSuccess + " " + data.title + ":" + String(data.appid);
        var ald = ALD;
        ald.aldSendEvent(type, {
            "导出成功": data.title + ":" + String(data.appid)
        });
    };
    ALD.aldSendReportAdClickFail = function (data) {
        var type = ALDEventDef.ReportAdClickFail + " " + data.title + ":" + String(data.appid);
        var ald = ALD;
        ald.aldSendEvent(type, {
            "导出失败": data.title + ":" + String(data.appid)
        });
    };
    return ALD;
}());
exports.default = ALD;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_myqq_Config = /** @class */ (function () {
    function App_myqq_Config() {
    }
    App_myqq_Config.AppID = "";
    App_myqq_Config.ResServer = ""; //资源服务器地址
    App_myqq_Config.LocalTestReServer = "subRes"; //本地测试资源服务器地址
    App_myqq_Config.Versions = "0.0.0";
    return App_myqq_Config;
}());
exports.default = App_myqq_Config;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("../AppConfig");
var AppSwitchData = /** @class */ (function () {
    function AppSwitchData() {
        this.banner = 0;
        this.wudian = 0;
        this.wudianTime_01 = 2000;
        this.wudianTime_01PreLoad = 500;
        this.shipintubiao = 1;
        this.wudianAvailableTime = {
            "0": 0, "1": 0, "2": 0, "3": 0,
            "4": 0, "5": 0, "6": 0, "7": 0,
            "8": 0, "9": 0, "10": 0, "11": 0,
            "12": 0, "13": 0, "14": 0, "15": 0,
            "16": 0, "17": 0, "18": 0, "19": 0,
            "20": 0, "21": 0, "22": 0, "23": 0
        };
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
                rowData.banner = Number(row["banner"]);
                rowData.wudian = Number(row["wudian"]);
                rowData.wudianTime_01 = Number(row["wudianTime_01"]);
                rowData.wudianTime_01PreLoad = Number(row["wudianTime_01PreLoad"]);
                rowData.shipintubiao = Number(row["shipintubiao"]);
                rowData.wudianAvailableTime = Object(row["wudianTime"]);
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
},{"../AppConfig":2}],4:[function(require,module,exports){
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
    //当关卡开始
    EventDef[EventDef["Game_OnLevelStart"] = 1000] = "Game_OnLevelStart";
    //当关卡结束
    EventDef[EventDef["Game_OnLevelComplate"] = 1001] = "Game_OnLevelComplate";
    EventDef[EventDef["Game_Resurgence"] = 10005] = "Game_Resurgence";
    //误点预加载完毕
    EventDef[EventDef["AD_WudianBanner_LoadComplete"] = 2217] = "AD_WudianBanner_LoadComplete";
    //显示误点Banner
    EventDef[EventDef["AD_WudianBanner_Show"] = 2218] = "AD_WudianBanner_Show";
    //影藏误点Banner
    EventDef[EventDef["AD_WudianBanner_Hide"] = 2219] = "AD_WudianBanner_Hide";
    //预加载Banner
    EventDef[EventDef["AD_WudianBanner_PreLoad"] = 2220] = "AD_WudianBanner_PreLoad";
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。
    EventDef[EventDef["Game_FOCUS"] = 2001] = "Game_FOCUS";
    EventDef[EventDef["Game_BLUR"] = 2002] = "Game_BLUR";
    //Tips:在这条添加定义你自己需要的事件，从10000号开始。记得分段分类管理不同类型事件。如果事件有传递参数 "必须" 在事件后面用注释写明事件参数结构。
    EventDef[EventDef["Game_SongSourceChange"] = 10001] = "Game_SongSourceChange";
    EventDef[EventDef["Game_StateChange"] = 10002] = "Game_StateChange";
    EventDef[EventDef["Game_Failure"] = 10003] = "Game_Failure";
    EventDef[EventDef["Game_Settle"] = 10004] = "Game_Settle";
    EventDef[EventDef["RewardVideoSuccess"] = 20010] = "RewardVideoSuccess";
    EventDef[EventDef["RewardVideoFail"] = 20011] = "RewardVideoFail";
    EventDef[EventDef["InsertVideoEnd"] = 20012] = "InsertVideoEnd";
})(EventDef = exports.EventDef || (exports.EventDef = {}));
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher = laya.events.EventDispatcher;
var Event_myqq_Mgr = /** @class */ (function (_super) {
    __extends(Event_myqq_Mgr, _super);
    function Event_myqq_Mgr() {
        return _super.call(this) || this;
    }
    ;
    //广播事件
    Event_myqq_Mgr.prototype.dispatch = function (InName, agv) {
        Event_myqq_Mgr.eventDispatcher.event(InName, agv);
    };
    //注册事件
    Event_myqq_Mgr.prototype.regEvemt = function (InName, caller, listener, arg) {
        Event_myqq_Mgr.eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
    };
    //注册单次事件
    Event_myqq_Mgr.prototype.regOnceEvent = function (InName, caller, listener, arg) {
        Event_myqq_Mgr.eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
    };
    //移除事件注册
    Event_myqq_Mgr.prototype.removeEvent = function (InName, caller, listener, arg) {
        Event_myqq_Mgr.eventDispatcher.off(InName, caller, listener);
    };
    Event_myqq_Mgr.eventDispatcher = new EventDispatcher();
    Event_myqq_Mgr.instance = new Event_myqq_Mgr();
    return Event_myqq_Mgr;
}(EventDispatcher));
exports.default = Event_myqq_Mgr;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var GameMgr_1 = require("./Mgr/GameMgr");
var ButtonAnim_1 = require("./View/ButtonAnim");
var LoopAdBox_1 = require("./ShareAd/View/LoopAdBox");
var LoopAdView_1 = require("./ShareAd/View/LoopAdView");
var ExportView_1 = require("./View/Game/ExportView");
var GameFailureView_1 = require("./View/Game/GameFailureView");
var TextureProcessBar_1 = require("./View/TextureProcessBar");
var GameLoadingView_1 = require("./View/Game/GameLoadingView");
var SongDisCell_1 = require("./View/Game/CellView/SongDisCell");
var CenterList_1 = require("./View/Game/CenterList");
var GameMainView_1 = require("./View/Game/GameMainView");
var GameSettleView_1 = require("./View/Game/GameSettleView");
var GameWorkView_1 = require("./View/Game/GameWorkView");
var LoadingView_1 = require("./View/LoadingView/LoadingView");
var SongStoreCell_1 = require("./View/Game/CellView/SongStoreCell");
var SongStoreView_1 = require("./View/Game/SongStoreView");
var TipsView_1 = require("./View/TipsView/TipsView");
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
        reg("View/ButtonAnim.ts", ButtonAnim_1.default);
        reg("ShareAd/View/LoopAdBox.ts", LoopAdBox_1.default);
        reg("ShareAd/View/LoopAdView.ts", LoopAdView_1.default);
        reg("View/Game/ExportView.ts", ExportView_1.default);
        reg("View/Game/GameFailureView.ts", GameFailureView_1.default);
        reg("View/TextureProcessBar.ts", TextureProcessBar_1.default);
        reg("View/Game/GameLoadingView.ts", GameLoadingView_1.default);
        reg("View/Game/CellView/SongDisCell.ts", SongDisCell_1.default);
        reg("View/Game/CenterList.ts", CenterList_1.default);
        reg("View/Game/GameMainView.ts", GameMainView_1.default);
        reg("View/Game/GameSettleView.ts", GameSettleView_1.default);
        reg("View/Game/GameWorkView.ts", GameWorkView_1.default);
        reg("View/LoadingView/LoadingView.ts", LoadingView_1.default);
        reg("View/Game/CellView/SongStoreCell.ts", SongStoreCell_1.default);
        reg("View/Game/SongStoreView.ts", SongStoreView_1.default);
        reg("View/TipsView/TipsView.ts", TipsView_1.default);
        reg("ShareAd/View/HorizontalLoopAdView.ts", HorizontalLoopAdView_1.default);
        reg("ShareAd/View/BannerAdView.ts", BannerAdView_1.default);
        reg("View/Common/UniversalBottomZone.ts", UniversalBottomZone_1.default);
    };
    GameConfig.width = 1080;
    GameConfig.height = 1920;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "GameMain.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = false;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./Mgr/GameMgr":26,"./ShareAd/View/BannerAdView":36,"./ShareAd/View/HorizontalLoopAdView":37,"./ShareAd/View/LoopAdBox":38,"./ShareAd/View/LoopAdView":39,"./View/ButtonAnim":42,"./View/Common/UniversalBottomZone":43,"./View/Game/CellView/SongDisCell":44,"./View/Game/CellView/SongStoreCell":45,"./View/Game/CenterList":46,"./View/Game/ExportView":47,"./View/Game/GameFailureView":48,"./View/Game/GameLoadingView":49,"./View/Game/GameMainView":50,"./View/Game/GameSettleView":51,"./View/Game/GameWorkView":52,"./View/Game/SongStoreView":53,"./View/LoadingView/LoadingView":54,"./View/TextureProcessBar":55,"./View/TipsView/TipsView":56}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AudioBand = /** @class */ (function () {
    function AudioBand() {
        this.bands = new Array;
        this.bandHighestBuffer = new Array;
    }
    Object.defineProperty(AudioBand, "Instance", {
        get: function () {
            return this._instance ? this._instance : this._instance = new AudioBand;
        },
        enumerable: true,
        configurable: true
    });
    AudioBand.prototype.Load = function (url, completed, errer) {
        this.bands = new Array;
        function onLoad() {
            var json = Laya.loader.getRes(url);
            if (json == null) {
                onErrer();
                return;
            }
            off();
            this.LoadJson(json);
            if (completed != null) {
                completed.run();
            }
        }
        function onErrer() {
            off();
            if (errer != null) {
                errer.runWith("音频读取失败");
            }
        }
        function off() { Laya.loader.off(Laya.Event.ERROR, this, onErrer); }
        Laya.loader.load(url, Laya.Handler.create(this, onLoad), null, Laya.Loader.JSON);
        Laya.loader.on(Laya.Event.ERROR, this, onErrer);
    };
    AudioBand.prototype.LoadJson = function (json) {
        var bands = json["bands"];
        for (var i = 0; i < bands.length - 1; i++) {
            var band = new Band();
            var data_1 = bands[i];
            var strAry_1 = data_1.split("|");
            band.timeAppear = parseFloat(strAry_1[0]);
            strAry_1 = strAry_1[1].split(",");
            for (var j = 0; j < strAry_1.length; j++) {
                var num = parseFloat(strAry_1[j]) / 10000;
                band.buffer.push(num);
            }
            this.bands.push(band);
        }
        var data = bands[bands.length - 1];
        var strAry = data.split("|");
        strAry = strAry[1].split(",");
        for (var i = 0; i < strAry.length; i++) {
            this.bandHighestBuffer.push(parseFloat(strAry[i]) / 10000);
        }
    };
    AudioBand.prototype.getBandChange = function (bandIndex, index) {
        var band = this.bands[index];
        var p = band.buffer[bandIndex] / this.bandHighestBuffer[bandIndex];
        return p;
    };
    return AudioBand;
}());
exports.default = AudioBand;
var Band = /** @class */ (function () {
    function Band() {
        this.timeAppear = 0;
        this.buffer = new Array;
    }
    return Band;
}());
},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AudioWraper = /** @class */ (function () {
    function AudioWraper() {
        this.loadHander = null;
        this.errorHander = null;
        this._sound = null;
        this._soundChannel = null;
        this._playPosition = 0;
        this._startPlayTime = 0;
    }
    Object.defineProperty(AudioWraper, "Instance", {
        get: function () {
            if (AudioWraper._instance == null)
                AudioWraper._instance = new AudioWraper();
            return AudioWraper._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioWraper.prototype, "SoundChannel", {
        get: function () { return this._soundChannel; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioWraper.prototype, "IsStoped", {
        get: function () { return this._soundChannel.isStopped; },
        enumerable: true,
        configurable: true
    });
    AudioWraper.prototype.Load = function (url, completed, errer) {
        if (this._soundChannel != null && this._soundChannel.url == url) {
            if (completed != null) {
                completed.run();
            }
            return;
        }
        this.url = url;
        this.ClearHander();
        this.loadHander = completed;
        this.errorHander = errer;
        var sound = null;
        var soundClass = Laya.SoundManager._soundClass;
        if (!Laya.Browser.onMiniGame) {
            sound = Laya.loader.getRes(url);
        }
        function onErrer() { off(); if (errer != null) {
            errer.runWith("音乐加载失败");
        } }
        function onLoad() { off(); if (completed != null) {
            completed.run();
            this.ClearHander();
        } }
        function off() {
            sound.off(Laya.Event.COMPLETE, this, onLoad);
            sound.off(Laya.Event.ERROR, this, onErrer);
        }
        if (sound != null) {
            this._sound = sound;
            onLoad.call(this);
        }
        else if (soundClass != null) {
            sound = new soundClass();
            this._sound = sound;
            sound.on(Laya.Event.COMPLETE, this, onLoad);
            sound.on(Laya.Event.ERROR, this, onErrer);
            sound.load(url);
        }
    };
    AudioWraper.prototype.LoadPlay = function (url, startTime, loop) {
        var _this = this;
        if (startTime === void 0) { startTime = 0; }
        if (loop === void 0) { loop = 1; }
        this.SoomthStop(0.5);
        // this.loadHander = Laya.Handler.create(this, () => {
        //     this.Play(0);
        //     this.ClearHander();
        // });
        this.Load(url, Laya.Handler.create(this, function () {
            _this.Play(0);
            _this.ClearHander();
        }));
    };
    AudioWraper.prototype.Play = function (loop) {
        if (loop === void 0) { loop = 1; }
        if (!this.CheckState()) {
            return;
        }
        if (this._soundChannel != null) {
            if (!this._soundChannel.isStopped) {
                this._soundChannel.pause();
            }
            Laya.Tween.clearAll(this.SoundChannel);
        }
        if (this._soundChannel == null || this._soundChannel.url != this.url) {
            this._soundChannel = this._sound.play(0, loop);
        }
        else {
            if (!this._soundChannel.isStopped) {
                this._soundChannel.pause();
            }
            this._soundChannel.volume = 1;
            this._soundChannel.startTime = 0;
            this._soundChannel.loops = loop;
            this._soundChannel.play();
        }
        this._playPosition = 0;
        this._startPlayTime = (new Date).getTime();
        Laya.SoundManager._bgMusic = this._soundChannel.url;
    };
    AudioWraper.prototype.PlayFromTime = function (startTime, loop) {
        if (loop === void 0) { loop = 1; }
        if (!this.CheckState()) {
            return;
        }
        if (this._soundChannel != null) {
            if (!this._soundChannel.isStopped) {
                this._soundChannel.pause();
            }
            Laya.Tween.clearAll(this.SoundChannel);
        }
        if (this._soundChannel == null || this._soundChannel.url != this.url) {
            this._soundChannel = this._sound.play(startTime, loop);
        }
        else {
            if (!this._soundChannel.isStopped) {
                this._soundChannel.pause();
            }
            this._soundChannel.volume = 1;
            this._soundChannel.startTime = startTime;
            this._soundChannel.loops = loop;
            this._soundChannel.play();
        }
        this._playPosition = startTime;
        this._startPlayTime = (new Date).getTime();
        Laya.SoundManager._bgMusic = this._soundChannel.url;
    };
    AudioWraper.prototype.Stop = function () {
        if (this.SoundChannel == null || this.IsStoped)
            return;
        if (!this._soundChannel.isStopped) {
            this._soundChannel.pause();
        }
        Laya.SoundManager._bgMusic = "";
    };
    AudioWraper.prototype.SoomthStop = function (duration) {
        var _this = this;
        if (this.SoundChannel == null || this.IsStoped)
            return;
        Laya.Tween.clearAll(this.SoundChannel);
        Laya.Tween.to(this.SoundChannel, { volume: 0.1 }, duration * 1000, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            if (!_this.IsStoped) {
                _this._soundChannel.pause();
            }
            Laya.SoundManager._bgMusic = "";
        }));
    };
    AudioWraper.prototype.Pause = function () {
        if (this.SoundChannel == null)
            return;
        this._playPosition = this.PlayPosition;
        if (!this._soundChannel.isStopped) {
            this._soundChannel.pause();
        }
    };
    AudioWraper.prototype.Resume = function () {
        if (this.SoundChannel == null)
            return;
        this.SoundChannel.resume();
        // this._soundChannel.startTime = this._playPosition;
        // this._soundChannel.play();
        this._startPlayTime = (new Date).getTime();
        //this._playPosition = this.SoundChannel.position;
    };
    Object.defineProperty(AudioWraper.prototype, "PlayPosition", {
        get: function () {
            if (this.IsStoped) {
                return this._playPosition;
            }
            if (Laya.Browser.onMiniGame) {
                var time_1 = ((new Date).getTime() - this._startPlayTime);
                return this._playPosition + time_1 * .001;
            }
            // return this.SoundChannel.position;
            var time = ((new Date).getTime() - this._startPlayTime);
            return this._playPosition + time * .001;
            // let time = ((new Date).getTime() - this._startPlayTime);
            //     return this._playPosition + time * .001;
        },
        enumerable: true,
        configurable: true
    });
    AudioWraper.prototype.Clear = function () {
        this.Stop();
        if (this._sound != null) {
            this._sound.dispose();
            this._sound = null;
        }
        if (this._soundChannel != null) {
            this._soundChannel.stop();
            this._soundChannel = null;
        }
        Laya.SoundManager._bgMusic = "";
        Laya.loader.clearRes(this.url);
    };
    AudioWraper.prototype.ClearHander = function () {
        if (this.loadHander != null || this.loadHander) {
            this.loadHander.clear();
            this.loadHander.recover();
            this.loadHander = null;
        }
        if (this.errorHander != null || this.errorHander) {
            this.errorHander.clear();
            this.errorHander.recover();
            this.errorHander = null;
        }
    };
    AudioWraper.prototype.CheckState = function () {
        if (this._sound == null) {
            console.log("请先调用Load完成completed后 调用Play 进行播放");
            return false;
        }
        return true;
    };
    return AudioWraper;
}());
exports.default = AudioWraper;
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AudioBand_1 = require("./AudioBand");
var AudioWraper_1 = require("./AudioWraper");
var BandBehavior = /** @class */ (function (_super) {
    __extends(BandBehavior, _super);
    function BandBehavior() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currIndex = 0;
        _this.endIndex = 0;
        return _this;
    }
    BandBehavior.prototype.Start = function () {
        if (AudioBand_1.default.Instance.bands.length < 50) {
            return;
        }
        this.currIndex = 0;
        this.endIndex = AudioBand_1.default.Instance.bands.length - 1;
        var curBand = AudioBand_1.default.Instance.bands[this.currIndex];
        var nextBand = AudioBand_1.default.Instance.bands[this.currIndex + 1];
        Laya.timer.frameLoop(1, this, this.Update);
        this.onBandChange(curBand.timeAppear, nextBand.timeAppear, nextBand.buffer[this.bandIndex]);
    };
    BandBehavior.prototype.Stop = function () {
        this.onBandEnd();
        Laya.timer.clearAll(this);
    };
    BandBehavior.prototype.Update = function () {
        if (AudioWraper_1.default.Instance.SoundChannel == null || AudioWraper_1.default.Instance.IsStoped) {
            return;
        }
        var currenTime = AudioWraper_1.default.Instance.PlayPosition;
        var curBand = AudioBand_1.default.Instance.bands[this.currIndex];
        var nextBand = AudioBand_1.default.Instance.bands[this.currIndex + 1];
        if (currenTime > nextBand.timeAppear) {
            this.currIndex += 2;
            if (this.currIndex >= this.endIndex) {
                this.Stop();
                return;
            }
            curBand = AudioBand_1.default.Instance.bands[this.currIndex];
            nextBand = AudioBand_1.default.Instance.bands[this.currIndex + 1];
            //console.log("audioPosition:" + currenTime + "timeAppear:" + nextBand.timeAppear);
            this.onBandChange(curBand.timeAppear, nextBand.timeAppear, AudioBand_1.default.Instance.getBandChange(this.bandIndex, this.currIndex));
        }
    };
    BandBehavior.prototype.onBandChange = function (curTime, nextTime, num) {
    };
    BandBehavior.prototype.onBandEnd = function () {
    };
    BandBehavior.prototype.Lerp = function (num1, num2, t) {
        return num1 + t * (num2 - num1);
    };
    return BandBehavior;
}(Laya.Script3D));
exports.default = BandBehavior;
},{"./AudioBand":7,"./AudioWraper":8}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BandBehavior_1 = require("./BandBehavior");
var ParamCube = /** @class */ (function (_super) {
    __extends(ParamCube, _super);
    function ParamCube() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.startScaleY = 0;
        _this.maxScaleY = 7;
        return _this;
    }
    Object.defineProperty(ParamCube.prototype, "gameObject", {
        get: function () {
            return this.owner;
        },
        enumerable: true,
        configurable: true
    });
    ParamCube.prototype.onBandChange = function (curTime, nextTime, num) {
        Laya.Tween.clearAll(this);
        var scale = this.gameObject.transform.localScale;
        var newScaleY = num * this.maxScaleY + this.startScaleY;
        var changeTime = (nextTime - curTime) * 1000;
        //console.log("scaleY:" + newScaleY + "Time:" + changeTime + "num:" + num);
        Laya.Tween.to(this.gameObject.transform, { localScaleY: newScaleY }, changeTime);
    };
    ParamCube.prototype.onBandEnd = function () {
        Laya.Tween.clearAll(this);
        Laya.Tween.to(this.gameObject.transform, { localScaleY: this.startScaleY }, 1 * 1000);
    };
    return ParamCube;
}(BandBehavior_1.default));
exports.default = ParamCube;
},{"./BandBehavior":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NoteBoard_1 = require("./NoteBoard");
var GameController_1 = require("./GameController");
var PhysicTrigger3d_1 = require("./Tools/PhysicTrigger3d");
var FSMStateMachine_1 = require("./Tools/FSMStateMachine");
var MouseMgr_1 = require("./MouseMgr");
var NoteManager_1 = require("./NoteManager");
var GameConst_1 = require("./GameConst");
var AudioWraper_1 = require("./Audio/AudioWraper");
//import BallControllerTmep from "./Audio/BallController";
var Stand = "Stand";
var Run = "Run";
var RunEnd = "RunEnd";
var Die = "Die";
var BallColor;
(function (BallColor) {
    BallColor[BallColor["Red"] = 0] = "Red";
    BallColor[BallColor["Yellow"] = 1] = "Yellow";
    BallColor[BallColor["Blue"] = 2] = "Blue";
})(BallColor = exports.BallColor || (exports.BallColor = {}));
var BallController = /** @class */ (function (_super) {
    __extends(BallController, _super);
    function BallController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curColor = BallColor.Red;
        _this.mouseDownPosition = new Laya.Vector3();
        _this.songDelay = 0;
        _this.currentTime = 0;
        _this.curNodeIndex = 0;
        _this.endNodeIndex = 0;
        _this.dieNodeIndex = 0;
        _this.waySpace = 0;
        _this.wayTotal = 0;
        _this.wayTotalTime = 0;
        _this.stateMachine = null;
        // 跳跃表现相关
        _this.upV = 0; //向上的初速
        _this.downG = 0; // 向下的g加速度
        _this.jumpHeight = 4.5;
        _this.lowerHeightFactor = 0.4;
        _this.higherHeightFactor = 0.7;
        _this.jumpSpeed = 4;
        _this.beatDuration = 1;
        _this.ballWillBounce = false;
        _this.jumpFixedHeight = true;
        return _this;
    }
    Object.defineProperty(BallController.prototype, "gameObject", {
        get: function () { return this.owner; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BallController.prototype, "isRun", {
        get: function () { return this.stateMachine.curState.key == Run; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BallController.prototype, "RunBeatIndex", {
        get: function () { return this.curNodeIndex; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BallController.prototype, "finishProgress", {
        get: function () { return Math.min(1, this.curNodeIndex / this.endNodeIndex); },
        enumerable: true,
        configurable: true
    });
    BallController.prototype.onAwake = function () {
        this.ball = this.gameObject.getChildByName("Ball");
        this.originalPos = this.gameObject.transform.position.clone();
        this.originalScale = this.ball.transform.localScale.clone();
        PhysicTrigger3d_1.default.GetTrigger(this.ball).OnTriggerEnter(this, this.onBallTriggerEnter);
        var meshSprite3d = this.ball;
        this.meshRenderer = meshSprite3d._render;
        this.stateMachine = new FSMStateMachine_1.default();
        this.stateMachine.AddAction(Stand);
        this.stateMachine.AddAction(Run, Laya.Handler.create(this, this.OnSongRun), Laya.Handler.create(this, this.OnSongRunExit));
        this.stateMachine.AddAction(RunEnd, Laya.Handler.create(this, this.OnRunEndBoard));
        this.stateMachine.AddAction(Die, Laya.Handler.create(this, this.OnDeath));
        var ballRigidbody = this.ball.getComponent(Laya.Rigidbody3D);
        ballRigidbody.ccdSweptSphereRadius = 3;
        ballRigidbody.ccdMotionThreshold = 0.001;
        var trailSprite = this.ball.getChildByName("TUOWEI");
        this.trailMaterial = trailSprite.trailRenderer.material;
    };
    BallController.prototype.Start = function (songDelay, runNodeIndex, color) {
        if (songDelay === void 0) { songDelay = 0; }
        if (runNodeIndex === void 0) { runNodeIndex = 0; }
        if (color === void 0) { color = BallColor.Red; }
        if (this.stateMachine.curState.key == Run) {
            return;
        }
        // console.log("开始游戏--- 音乐延迟时间 = " + songDelay + " runNodeIndex = " + runNodeIndex + " color == " + color);
        this.RestPosition();
        this.ClearSyncAudioTime();
        this.ballWillBounce = false;
        this.songDelay = songDelay;
        this.ChangeColor(color);
        this.SetRunPosition(runNodeIndex);
        this.Run();
    };
    BallController.prototype.Run = function () { this.stateMachine.Switch(Run); };
    BallController.prototype.OnSongRun = function () {
        //MouseMgr.Instance.ResetMouseOffset();
        this.mouseDownPosition = this.ball.transform.localPosition.clone();
        // console.log("鼠标按下位置 = 小球本地位置 == x:" + this.mouseDownPosition.x + " y:" + this.mouseDownPosition.y + " z:" + this.mouseDownPosition.z);
        Laya.timer.frameLoop(1, this, this.TimeDelayLogic);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.OnMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.OnMouseDown);
    };
    BallController.prototype.OnSongRunExit = function () {
        Laya.timer.clear(this, this.TimeDelayLogic);
        Laya.timer.clear(this, this.SongPlayLogic);
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.OnMouseDown);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.OnMouseUp);
    };
    BallController.prototype.TimeDelayLogic = function () {
        if (this.currentTime < this.songDelay) {
            this.currentTime += (Laya.timer.delta / 1000);
            // NativeCallback.ShowLog("Refresh currFrame " + Laya.timer.currFrame + "----Laya.timer.delta----" + Laya.timer.delta + " --- " + this.currentTime);
            this.Refresh(this.currentTime);
            return;
        }
        //音乐延迟时间到了 该播放音乐;
        Laya.timer.clear(this, this.TimeDelayLogic);
        this.lAudioTime = AudioWraper_1.default.Instance.PlayPosition + this.songDelay;
        this.rTime = this.currentTime, this.pTime = this.currentTime;
        Laya.timer.frameLoop(1, this, this.SongPlayLogic, [this.rTime, this.pTime, this.lAudioTime]);
    };
    BallController.prototype.SongPlayLogic = function () {
        if (this.curNodeIndex < this.endNodeIndex) {
            this.Refresh(this.currentTime);
            if (this.stateMachine.curState.key == Run) {
                this.SyncAudioTime(0.2);
            }
        }
        //this.Refresh(AudioManager.Instance.SoundChannel.position/*GameController.Instance.CurrentRunTime*/);
    };
    BallController.prototype.SyncAudioTime = function (p) {
        if (p === void 0) { p = 0.2; }
        var deltaTime = (Laya.timer.delta / 1000);
        this.rTime += deltaTime;
        if (this.syncCounter > 0) {
            this.syncCounter--;
            this.pTime += deltaTime;
        }
        else if (GameController_1.default.Instance.SoundInPause) {
            this.pTime = GameController_1.default.Instance.soundPauseTime;
            this.rTime = this.pTime;
            this.currentTime = this.rTime;
            return;
        }
        else if (AudioWraper_1.default.Instance.IsStoped) {
            this.pTime = this.rTime;
        }
        else {
            var time = AudioWraper_1.default.Instance.PlayPosition;
            if (Math.abs(this.lAudioTime - time) < 0.01) {
                this.pTime += deltaTime;
            }
            else {
                var sysncEventFrame = 1;
                this.syncCounter = sysncEventFrame;
                this.pTime = time + this.songDelay;
            }
            // console.log("currentTime:" + this.currentTime + "  AudioTime:" + time + "  c:" + Math.abs(this.lAudioTime - time));
        }
        this.currentTime = this.Lerp(this.rTime, this.pTime, p);
        this.rTime = this.currentTime;
        this.lAudioTime = this.pTime;
    };
    BallController.prototype.ClearSyncAudioTime = function () {
        this.syncCounter = 0;
        this.currentTime = 0;
        this.lAudioTime = this.rTime = this.pTime = 0;
    };
    BallController.prototype.Refresh = function (realTime) {
        var curBeat = NoteManager_1.default.Instance.GetBeat(this.curNodeIndex);
        var nextBeat = NoteManager_1.default.Instance.GetBeat(this.curNodeIndex + 1);
        if (realTime > nextBeat.timeAppear) {
            if (this.ballWillBounce == true) {
                this.curNodeIndex++;
                this.ballWillBounce = false;
                if (this.curNodeIndex >= this.endNodeIndex) {
                    this.stateMachine.Switch(RunEnd);
                    return;
                }
                realTime = nextBeat.timeAppear;
                var beats = NoteManager_1.default.Instance.songNote.beats;
                curBeat = NoteManager_1.default.Instance.GetBeat(this.curNodeIndex);
                nextBeat = NoteManager_1.default.Instance.GetBeat(this.curNodeIndex + 1);
                this.SetBallMovement(curBeat, nextBeat);
                return;
            }
        }
        this.UpdatePosition(curBeat.timeAppear, realTime);
    };
    BallController.prototype.SetJumpForce = function (curNodeTime, nextNodeTime) {
        var leadTime = (nextNodeTime - curNodeTime) / 2.0;
        if (this.jumpFixedHeight) {
            var TargetHeight = 0;
            var leadTimeHalf = leadTime / this.beatDuration;
            if (leadTimeHalf < 1) {
                TargetHeight = this.jumpHeight * (1 - (1 - leadTimeHalf) * this.lowerHeightFactor);
            }
            else {
                TargetHeight = this.jumpHeight * (1 + (leadTimeHalf - 1) * this.higherHeightFactor);
            }
            this.downG = -2 * TargetHeight / (leadTime * leadTime);
            this.upV = -this.downG * leadTime;
        }
        else {
            this.upV = this.jumpSpeed;
            this.downG = -this.upV / leadTime;
        }
    };
    BallController.prototype.SetMoveSpace = function (curNode, nextNode) {
        try {
            var curBoard = GameController_1.default.Instance.boardManager.GetNoteBoardbyBeat(curNode);
            var nextBoard = GameController_1.default.Instance.boardManager.GetNoteBoardbyBeat(nextNode);
            this.wayTotalTime = nextNode.timeAppear - curNode.timeAppear;
            var oldWay = this.waySpace;
            // console.log("waySpace == " + this.waySpace);
            var newWay = nextBoard.gameObject.transform.position.z - curBoard.gameObject.transform.position.z;
            this.waySpace = newWay;
            // console.log("newWay = " + newWay);
            this.wayTotal += oldWay;
            // console.log("wayTotal = " + this.wayTotal);
        }
        catch (error) { }
        //this.ball.transform.localPositionY = 0;
        var position = this.gameObject.transform.position.clone();
        position.setValue(position.x, position.y, this.wayTotal);
        this.gameObject.transform.position = position;
        // NativeCallback.ShowLog("gameobject pos = "+ JSON.stringify(this.gameObject.transform.position));
    };
    BallController.prototype.SetBallMovement = function (curBeat, nextBeat) {
        this.SetMoveSpace(curBeat, nextBeat);
        this.SetJumpForce(curBeat.timeAppear, nextBeat.timeAppear);
    };
    BallController.prototype.UpdatePosition = function (curTime, realTime) {
        var time = realTime - curTime;
        if (time < 0.0) {
            console.log(("something wrong: " + realTime + " < " + curTime + " : audioTime=" + AudioWraper_1.default.Instance.PlayPosition + " : cNoteTime=" + NoteManager_1.default.Instance.songNote.beats[this.curNodeIndex].timeAppear));
        }
        else {
            if (MouseMgr_1.default.Instance.isDown) {
                var MaxX = GameConst_1.default.BoardInterval;
                var offset = this.mouseDownPosition.x + -MouseMgr_1.default.Instance.GetMouseOffsetBySize(0.03, false, true, true).x;
                this.ball.transform.localPositionX = this.Lerp(this.ball.transform.localPositionX - this.originalPos.x, Math.max(-MaxX, Math.min(MaxX, offset)), 1 / 60 * 20);
                // console.log("设置小球 x = " + this.ball.transform.localPositionX);
            }
            var process = 0.7;
            var y = (this.upV + (this.downG * time / 2)) * time;
            var curWay = this.waySpace * (time / this.wayTotalTime);
            this.ball.transform.localPositionY = this.Lerp(this.ball.transform.localPositionY, y, process);
            this.gameObject.transform.localPositionZ = this.Lerp(this.gameObject.transform.localPositionZ, this.wayTotal + curWay, process); //worldScale * this.worldLength;
            if (this.ball.transform.position.y < -3) {
                this.Death(true);
                return;
            }
        }
    };
    BallController.prototype.Lerp = function (num1, num2, t) {
        return num1 + t * (num2 - num1);
    };
    BallController.prototype.OnRunEndBoard = function () {
        this.PlayBombEffect();
        GameController_1.default.Instance.GameEnd();
        // let position: Laya.Vector3 = this.ball.transform.localPosition.clone();
        // position.setValue(position.x, this.originalPos.y, position.z);
        // this.ball.transform.localPosition = position;
    };
    BallController.prototype.ActiveStand = function (isActive) {
        this.stateMachine.Switch(isActive ? Stand : Run);
    };
    BallController.prototype.Death = function (isDropout) {
        if (this.stateMachine.curState.key == Die) {
            return;
        }
        this.stateMachine.Switch(Die, isDropout);
    };
    BallController.prototype.OnDeath = function (isDropout) {
        this.dieNodeIndex = this.curNodeIndex;
        if (isDropout) {
            this.ball.transform.localPositionY = -100;
        }
        else {
            this.PlayBombEffect();
        }
        GameController_1.default.Instance.GameFailure();
    };
    BallController.prototype.Resurrection = function () {
        var resurrectionIndex = this.dieNodeIndex;
        resurrectionIndex += 1;
        if (resurrectionIndex >= this.endNodeIndex) {
            this.stateMachine.Switch(RunEnd);
            return;
        }
        this.SetRunPosition(resurrectionIndex);
    };
    BallController.prototype.SetRunPosition = function (nodeIndex) {
        // NativeCallback.ShowLog("设置起始点---------------" + nodeIndex);
        var songBeats = NoteManager_1.default.Instance.songNote.beats;
        this.curNodeIndex = nodeIndex;
        this.endNodeIndex = songBeats.length - 1;
        var curBeat = songBeats[nodeIndex];
        var nextBeat = songBeats[nodeIndex + 1];
        // console.log("endNodeIndex = " + this.endNodeIndex  + "  curBeat = " + JSON.stringify(curBeat) + "  nextBeat = " + JSON.stringify(nextBeat));
        this.currentTime = curBeat.timeAppear;
        // NativeCallback.ShowLog("SetRunPosition this.currentTime = " + this.currentTime);
        this.SetBallMovement(curBeat, nextBeat);
        this.UpdatePosition(curBeat.timeAppear, curBeat.timeAppear);
        var board = GameController_1.default.Instance.boardManager.GetNoteBoardbyBeat(curBeat);
        var position = board.GetNoteColorPosition(curBeat, this.curColor);
        position.setValue(position.x, this.originalPos.y, position.z);
        this.ball.transform.localPosition = position.clone();
        // console.log("设置小球起始点localPosition x:" + position.x + "   y:  " + this.originalPos.y + "  z : " +  position.z)
        this.ball.transform.localScale = this.originalScale.clone();
    };
    BallController.prototype.ChangeColor = function (color) {
        var color4 = new Laya.Vector4();
        var material = GameController_1.default.Instance.GetColorMaterial(color, color4);
        if (material == null) {
            return;
        }
        this.meshRenderer.material = GameController_1.default.Instance.GetColorMaterial(color, color4);
        this.curColor = color;
        this.trailMaterial.color = color4;
    };
    BallController.prototype.Reset = function () {
        this.RestPosition();
        this.ClearSyncAudioTime();
    };
    BallController.prototype.RestPosition = function () {
        this.waySpace = 0;
        this.wayTotal = 0;
        this.wayTotalTime = 0;
        this.ball.transform.localScale = this.originalScale.clone();
        this.ball.transform.localPosition = this.originalPos.clone();
        this.gameObject.transform.position = new Laya.Vector3(this.originalPos.x, 0, this.originalPos.z);
        // console.log("重置 waySpace 为 0 wayTotal 为 0 wayTotalTime 为 0  小球控制器位置 == x:" + this.gameObject.transform.position.x + " y:" + this.gameObject.transform.position.y+ " z:" + this.gameObject.transform.position.z);
        // console.log("小球本地坐标设为最初 == x:" + this.ball.transform.localPosition.x + " y:" + this.ball.transform.localPosition.y + " z:" + this.ball.transform.localPosition.z)
    };
    BallController.prototype.onBallTriggerEnter = function (otherA, otherB) {
        this.KnockNote(otherB.owner);
    };
    BallController.prototype.CheckBallTrigger = function () {
        // return;
        // let ray = new Laya.Ray(this.gameObject.transform.position.clone(), new Laya.Vector3(0, -1, 0))
        // let rayHit = new Laya.HitResult();
        // GameController.Instance.RayCast(ray, rayHit, 0.5);
        // if (rayHit.collider == null) {
        //     return;
        // }
        // console.log("ddd" + rayHit.collider.owner.name);
        // this.KnockNote(rayHit.collider.owner as Laya.Sprite3D);
    };
    BallController.prototype.KnockNote = function (node) {
        //if (!this.isRun) return;
        if (node.name == "DieBox") {
            this.Death(true);
            return;
        }
        var board = node.parent.parent.getComponent(NoteBoard_1.default);
        if (board) {
            // console.log("敲击Board -- " + board.beat.timeAppear)        
            board.CheckTirgger(this, node);
            this.ballWillBounce = true;
        }
        GameController_1.default.Instance.boardManager.KnockNote();
    };
    BallController.prototype.PlayBombEffect = function () {
        var deathEffect = this.gameObject.getChildByName("DeathEffect");
        deathEffect.active = true;
        deathEffect.transform.localPosition = this.ball.transform.localPosition.clone();
        this.ball.transform.localScale = new Laya.Vector3(0.001, 0.001, 0.001);
        Laya.timer.once(1.5 * 1000, this, function () { deathEffect.active = false; });
    };
    BallController.prototype.onUpdate = function () { this.stateMachine.Update(); };
    BallController.prototype.OffsetPercent = function () { return this.ball.transform.localPositionX / GameConst_1.default.BoardInterval; };
    BallController.prototype.OnMouseDown = function () { this.mouseDownPosition = this.ball.transform.localPosition.clone(); };
    BallController.prototype.OnMouseUp = function () { this.mouseDownPosition = new Laya.Vector3(); };
    return BallController;
}(Laya.Script3D));
exports.default = BallController;
},{"./Audio/AudioWraper":8,"./GameConst":13,"./GameController":14,"./MouseMgr":15,"./NoteBoard":16,"./NoteManager":18,"./Tools/FSMStateMachine":21,"./Tools/PhysicTrigger3d":22}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CameraFollow = /** @class */ (function (_super) {
    __extends(CameraFollow, _super);
    function CameraFollow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maxOffset = 1.0;
        return _this;
    }
    Object.defineProperty(CameraFollow.prototype, "gameObject", {
        get: function () {
            return this.owner;
        },
        enumerable: true,
        configurable: true
    });
    CameraFollow.prototype.onAwake = function () {
        this.camera = this.owner.getChildByName("Camera");
    };
    CameraFollow.prototype.SetTaget = function (ballController) {
        this.targetBall = ballController;
        this.offsetPosition = new Laya.Vector3();
        ;
        Laya.Vector3.subtract(this.gameObject.transform.position, this.targetBall.gameObject.transform.position, this.offsetPosition);
    };
    CameraFollow.prototype.onLateUpdate = function () {
        if (this.targetBall == null)
            return;
        var position = new Laya.Vector3;
        Laya.Vector3.add(this.targetBall.gameObject.transform.position, this.offsetPosition, position);
        var x = this.maxOffset * this.targetBall.OffsetPercent();
        position.setValue(x, position.y, position.z);
        this.gameObject.transform.position = position.clone();
    };
    return CameraFollow;
}(Laya.Script3D));
exports.default = CameraFollow;
},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig_1 = require("../AppConfig");
var GameConst = /** @class */ (function () {
    function GameConst() {
    }
    Object.defineProperty(GameConst, "RemoteRes", {
        get: function () { return AppConfig_1.default.ResServer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConst, "GetLocalSubResVersionPath", {
        get: function () {
            return "subRes" + GameConst.VersionFile + "Version.json";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConst, "GetRemoteVersionPath", {
        get: function () {
            return GameConst.RemoteRes + GameConst.VersionFile + "Version.json";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameConst, "GetRandomSongPreviewPng", {
        get: function () {
            return "Resource/SongDisc/" + 0 + ".png";
        },
        enumerable: true,
        configurable: true
    });
    GameConst.SoundFile = "/Sound/";
    GameConst.SoundPreviewImages = "/PreviewImage/";
    GameConst.VersionFile = "/Music/";
    GameConst.GameScenePath = "subRes/Scenes/LayaScene_Game/Conventional/Game.ls";
    GameConst.BoardInterval = 3.75; //横向间隔
    GameConst.BoardIntervalTime = 0.2; //最小间隔时间
    GameConst.BoardIntervalSpace = 3; //最小跳板间隔
    return GameConst;
}());
exports.default = GameConst;
},{"../AppConfig":2}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConst_1 = require("./GameConst");
var CameraMoveScript_1 = require("./Tools/CameraMoveScript");
var BallController_1 = require("./BallController");
var MouseMgr_1 = require("./MouseMgr");
var ViewMgr_1 = require("../Mgr/ViewMgr");
var NoteBoardManager_1 = require("./NoteBoardManager");
var NoteManager_1 = require("./NoteManager");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var WXAPI_1 = require("../WXAPI");
var CameraFollow_1 = require("./CameraFollow");
var SoundManager_1 = require("./SoundManager");
var VibrateMgr_1 = require("../Mgr/VibrateMgr");
var User_1 = require("../User/User");
var AudioBand_1 = require("./Audio/AudioBand");
var AudioWraper_1 = require("./Audio/AudioWraper");
var NativeCallback_1 = require("../NativeCallback");
var GameController = /** @class */ (function () {
    function GameController() {
        this._inited = false;
        this.currentSong = null;
        this.scene = null;
        this.boardManager = null;
        this.ballController = null;
        this.cameraFollow = null;
        this.isRun = false;
        this.isReady = false;
        this.isGameing = false;
        this.isLoading = false;
        this.realStartTime = 0;
        this.soundPauseTime = 0;
        this.SoundInPause = false;
        this.currentSource = 0; //游戏分数
        this.continuousPerfect = 0; // 最大连续的完美次数
        this.currentPerfectCount = 0; //游戏完美总次数
    }
    Object.defineProperty(GameController, "Instance", {
        get: function () {
            if (GameController._instance == null)
                GameController._instance = new GameController();
            return GameController._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameController.prototype.Init = function (caller, completed) {
        var _this = this;
        if (caller === void 0) { caller = null; }
        if (completed === void 0) { completed = null; }
        if (this._inited) {
            if (completed != null) {
                completed.call(caller);
            }
            return;
        }
        MouseMgr_1.default.Instance;
        this.LoadGameScene(GameConst_1.default.GameScenePath, this, function (scene) {
            _this.scene = scene;
            var platformManager = scene.getChildByName("PlatformManager");
            _this.boardManager = platformManager.addComponent(NoteBoardManager_1.default);
            var camera = scene.getChildByName("Main Camera");
            _this.cameraFollow = camera.addComponent(CameraFollow_1.default);
            camera.getChildByName("Camera").addComponent(CameraMoveScript_1.default);
            var ball = scene.getChildByName("BallController");
            _this.ballController = ball.addComponent(BallController_1.default);
            _this.cameraFollow.SetTaget(_this.ballController);
            if (completed != null)
                completed.call(_this);
        });
        Laya.stage.on("visibilitychange", this, this.VisibilityChange);
    };
    GameController.prototype.LoadGameScene = function (scenePath, caller, completed) {
        Laya.Scene3D.load(scenePath, Laya.Handler.create(this, function (scene) {
            Laya.stage.addChild(scene);
            Laya.stage.setChildIndex(scene, 0);
            if (completed == null || scene == null)
                return;
            completed.call(this, scene);
        }));
    };
    GameController.prototype.RayCast = function (ray, rayHit, dis) {
        this.scene.physicsSimulation.rayCast(ray, rayHit, dis);
    };
    GameController.prototype.LoadWaitingTime = function (callBack) {
        callBack.run();
    };
    GameController.prototype.Load = function (song, completed, progress) {
        var _this = this;
        this.isLoading = true;
        var self = this;
        var inError = false;
        function error(errerStr) {
            console.error(errerStr);
            inError = true;
            self.isLoading = false;
            this.ClearGameRes();
            Laya.loader.off(Laya.Event.ERROR, this, error);
            Laya.timer.clear(this, this.LoadWaitingTime);
            if (progress != null) {
                progress.recover();
            }
            if (completed != null) {
                completed.runWith(false);
                completed.recover();
            }
        }
        var updateProgress = Laya.Handler.create(this, function (num) {
            if (inError) {
                return;
            }
            if (num != 1 && progress != null) {
                progress.runWith(num);
            }
            else {
                self.isLoading = false;
                updateProgress.recover();
                Laya.loader.off(Laya.Event.ERROR, _this, error);
                Laya.timer.clear(_this, _this.LoadWaitingTime);
                if (progress != null) {
                    progress.runWith(1);
                    progress.recover();
                }
                if (completed != null) {
                    completed.runWith(true);
                    completed.recover();
                }
            }
        }, null, false);
        var loadConfigCompleted = function () {
            if (inError) {
                return;
            }
            updateProgress.runWith(0.7);
            AudioBand_1.default.Instance.LoadJson(Laya.loader.getRes(song.songBandPath));
            NoteManager_1.default.Instance.LoadJson(Laya.loader.getRes(song.songJosnPath));
            _this.boardManager.InitNoteBoard(NoteManager_1.default.Instance.songNote.clone());
            AudioWraper_1.default.Instance.Load(song.songPath, Laya.Handler.create(_this, function () {
                if (inError) {
                    return;
                }
                updateProgress.runWith(1);
            }), Laya.Handler.create(_this, error));
        };
        var res = [
            { url: song.songJosnPath, type: Laya.Loader.JSON },
            { url: song.songBandPath, type: Laya.Loader.JSON }
        ];
        var loader = Laya.loader.load(res, Laya.Handler.create(this, function () { Laya.timer.callLater(_this, loadConfigCompleted); }), Laya.Handler.create(this, function (num) { updateProgress.runWith(num * 0.7); }, null, false));
        loader.on(Laya.Event.ERROR, this, error);
        Laya.timer.once(7 * 1000, this, this.LoadWaitingTime, [Laya.Handler.create(this, error, ["加载超时"])]);
    };
    GameController.prototype.GameReady = function (song, completed, progress) {
        var _this = this;
        if (this.isLoading == true)
            return;
        if (progress) {
            progress.once = false;
        }
        this.GameRest();
        this.currentSong = song;
        this.Load(song, Laya.Handler.create(this, function (succeed) {
            if (!succeed) {
                ViewMgr_1.default.instance.closeView(ViewMgr_1.ViewDef.GameLoadingView);
                ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.GameMainView, null, function () {
                    ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.TipsView, "加载音乐失败！");
                });
                return;
            }
            _this.isReady = true;
            _this.realStartTime = Laya.timer.currTimer;
            MouseMgr_1.default.Instance.enable = true;
            if (completed != null) {
                completed.runWith(succeed);
            }
        }), progress);
    };
    GameController.prototype.GamePlay = function () {
        if (!this.isReady) {
            console.error("未完成游戏音乐加载！");
            return;
        }
        this.isGameing = true;
        this.isRun = true;
        this.isReady = false;
        var songBeats = NoteManager_1.default.Instance.songNote.beats;
        var firstBeat = songBeats[0];
        var color = (firstBeat.notes[0].columnIndex % 3);
        this.ballController.Start(0, 0, color);
        AudioWraper_1.default.Instance.Play();
        this.boardManager.BandCubesStart();
        this.OnStageStateChange();
    };
    GameController.prototype.GameFailure = function () {
        var time = 1;
        this.isRun = false;
        AudioWraper_1.default.Instance.Stop();
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_Failure);
        this.OffStageStateChange();
    };
    GameController.prototype.OpenRewardedVideo = function (completed) {
        var self = this;
        if (Laya.Browser.onMiniGame) {
            WXAPI_1.default.showRewardedVideoAd(function (islookEnd) {
                if (completed != null) {
                    completed.runWith(islookEnd);
                }
            }, function () {
                if (completed != null) {
                    completed.runWith(false);
                }
            });
        }
        else {
            if (completed != null) {
                completed.runWith(true);
            }
        }
    };
    GameController.prototype.ResurrectionGame = function () {
        this.ballController.Resurrection();
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_Resurgence);
    };
    GameController.prototype.BallRun = function () {
        this.isRun = true;
        this.OnStageStateChange();
        this.ballController.Run();
        var timeAppear = NoteManager_1.default.Instance.GetBeatTimeAppear(this.ballController.RunBeatIndex);
        AudioWraper_1.default.Instance.PlayFromTime(timeAppear);
    };
    GameController.prototype.GameEnd = function () {
        var time = 1;
        this.SettleSongRecord(true);
        AudioWraper_1.default.Instance.SoomthStop(1);
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_Settle, true);
    };
    Object.defineProperty(GameController.prototype, "currStartLevel", {
        get: function () {
            var num = Math.floor(NoteManager_1.default.Instance.songNote.beats.length / 3);
            var starLevel = Math.min(1, Math.floor((this.currentPerfectCount / num)));
            return starLevel;
        },
        enumerable: true,
        configurable: true
    });
    GameController.prototype.GameOver = function () {
        this.SettleSongRecord(false);
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_Settle, false);
    };
    GameController.prototype.SettleSongRecord = function (completed) {
        this.isRun = false;
        this.isGameing = false;
        var name = this.currentSong.name;
        var starLevel = this.currStartLevel;
        SoundManager_1.default.Instance.SubPlayOneMoney(this.currentSong);
        SoundManager_1.default.Instance.SaveSongRecord(name, starLevel, this.currentSource, completed);
    };
    GameController.prototype.GetCurrentSongRecord = function () {
        var song = this.currentSong;
        var passSong = new User_1.PassSong();
        passSong.name = song.name;
        passSong.source = this.currentSource;
        passSong.starLevel = this.currStartLevel;
        return passSong;
    };
    GameController.prototype.GameRest = function () {
        this.isReady = false;
        this.RestSongSorce();
        this.ClearGameRes();
        this.OffStageStateChange();
        this.ballController.Reset();
        this.boardManager.BandCubesStop();
        MouseMgr_1.default.Instance.enable = false;
    };
    GameController.prototype.ClearGameRes = function () {
        this.boardManager.Clear();
        AudioWraper_1.default.Instance.Clear();
        Laya.loader.clearUnLoaded();
        Laya.Resource.destroyUnusedResources();
        Laya.SoundManager.stopMusic();
        Laya.SoundManager.stopAllSound();
        if (this.currentSong) {
            Laya.loader.clearRes(this.currentSong.songPath);
            Laya.loader.clearRes(this.currentSong.songBandPath);
            Laya.loader.clearRes(this.currentSong.songJosnPath);
        }
    };
    Object.defineProperty(GameController.prototype, "CurrentRunTime", {
        get: function () {
            return (Laya.timer.currTimer - this.realStartTime) / 1000;
        },
        enumerable: true,
        configurable: true
    });
    GameController.prototype.PauseGame = function () {
        if (this.SoundInPause) {
            return;
        }
        this.SoundInPause = true;
        this.soundPauseTime = AudioWraper_1.default.Instance.PlayPosition;
        AudioWraper_1.default.Instance.Pause();
        this.ballController.ActiveStand(true);
    };
    GameController.prototype.ResumeGame = function () {
        if (!this.SoundInPause) {
            return;
        }
        this.SoundInPause = false;
        AudioWraper_1.default.Instance.Resume();
        this.soundPauseTime = 0;
        this.ballController.ActiveStand(false);
    };
    GameController.prototype.AddSongSource = function (perfect, progress) {
        var defSource = 58;
        var perfectSource = 100;
        if (!this.ballController.isRun) {
            return;
        }
        if (perfect) {
            this.continuousPerfect++;
            this.currentPerfectCount++;
            this.currentSource += perfectSource;
            VibrateMgr_1.default.vibrateShort();
        }
        else {
            this.continuousPerfect = 0;
            this.currentSource += defSource;
            VibrateMgr_1.default.ibrateLong();
        }
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_SongSourceChange, [this.currentSource, progress, this.continuousPerfect]);
    };
    GameController.prototype.RestSongSorce = function () {
        this.currentSource = 0;
        this.continuousPerfect = 0;
        this.currentPerfectCount = 0;
    };
    GameController.prototype.GetColorMaterial = function (color, outColor) {
        var colorString = "";
        outColor = outColor ? outColor : new Laya.Vector4();
        switch (color) {
            case BallController_1.BallColor.Red:
                colorString = "Red.lmat";
                outColor.setValue(255 / 255, 24 / 255, 24 / 255, 0.5);
                break;
            case BallController_1.BallColor.Blue:
                colorString = "Blue.lmat";
                outColor.setValue(28 / 255, 95 / 255, 255 / 255, 0.5);
                break;
            case BallController_1.BallColor.Yellow:
                colorString = "Yellow.lmat";
                outColor.setValue(255 / 255, 239 / 255, 28 / 255, 0.5);
                break;
        }
        var material = Laya.loader.getRes("subRes/Scenes/LayaScene_Game/Conventional/Assets/Material/" + colorString);
        if (material == null) {
            return null;
        }
        return material;
    };
    GameController.prototype.OnStageStateChange = function () {
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_BLUR, this, this.StageOnBlur);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_FOCUS, this, this.StageOnFocus);
    };
    GameController.prototype.OffStageStateChange = function () {
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_BLUR, this, this.StageOnBlur);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_FOCUS, this, this.StageOnFocus);
    };
    GameController.prototype.VisibilityChange = function () {
        NativeCallback_1.default.ShowLog("VisibilityChange ------ " + Laya.stage.isVisibility);
        if (Laya.stage.isVisibility) {
            this.StageOnFocus();
        }
        else {
            this.StageOnBlur();
        }
    };
    GameController.prototype.StageOnBlur = function () {
        NativeCallback_1.default.ShowLog("StageOnBlur========");
        if (!this.SoundInPause) {
            EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_StateChange, false);
        }
    };
    GameController.prototype.StageOnFocus = function () {
        NativeCallback_1.default.ShowLog("StageOnFocus=======");
        if (this.SoundInPause) {
            EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_StateChange, true);
        }
    };
    return GameController;
}());
exports.default = GameController;
},{"../Event/EventDef":4,"../Event/EventMgr":5,"../Mgr/VibrateMgr":28,"../Mgr/ViewMgr":29,"../NativeCallback":30,"../User/User":40,"../WXAPI":58,"./Audio/AudioBand":7,"./Audio/AudioWraper":8,"./BallController":11,"./CameraFollow":12,"./GameConst":13,"./MouseMgr":15,"./NoteBoardManager":17,"./NoteManager":18,"./SoundManager":19,"./Tools/CameraMoveScript":20}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MouseMgr = /** @class */ (function () {
    function MouseMgr() {
        this.enable = false;
        this.isDown = false;
        this.isMoving = false;
        this.mouseDownPoint = new Laya.Vector3(0, 0, 0);
        this.mouseMoveOffset = new Laya.Vector3(0, 0, 0);
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.OnMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.OnMoseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.OnMoseUp);
    }
    Object.defineProperty(MouseMgr, "Instance", {
        get: function () {
            if (MouseMgr._instance == null)
                MouseMgr._instance = new MouseMgr();
            return MouseMgr._instance;
        },
        enumerable: true,
        configurable: true
    });
    MouseMgr.prototype.OnMouseDown = function (e) {
        if (!this.enable) {
            return;
        }
        this.isDown = true;
        this.mouseMoveOffset = new Laya.Vector3(0, 0, 0);
        this.mouseDownPoint = new Laya.Vector3(e.stageX, e.stageY, 0);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.OnMouseMove);
    };
    MouseMgr.prototype.OnMouseMove = function (e) {
        this.isMoving = true;
        this.mouseMoveOffset = new Laya.Vector3(0, 0, 0);
        Laya.Vector3.subtract(new Laya.Vector3(e.stageX, e.stageY, 0), this.mouseDownPoint, this.mouseMoveOffset);
    };
    MouseMgr.prototype.OnMoseUp = function () {
        this.isDown = false;
        this.isMoving = false;
        this.ResetMouseOffset();
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.OnMouseMove);
    };
    MouseMgr.prototype.ResetMouseOffset = function () {
        this.isDown = false;
        this.isMoving = false;
        this.mouseDownPoint = new Laya.Vector3(Laya.stage.mouseX, Laya.stage.mouseY, 0);
        this.mouseMoveOffset = new Laya.Vector3(0, 0, 0);
    };
    MouseMgr.prototype.GetMouseOffsetBySize = function (size, ignoreX, ignoreY, ignoreZ) {
        if (ignoreX === void 0) { ignoreX = false; }
        if (ignoreY === void 0) { ignoreY = false; }
        if (ignoreZ === void 0) { ignoreZ = false; }
        var offset = new Laya.Vector3(0, 0, 0);
        Laya.Vector3.scale(this.mouseMoveOffset, size, offset);
        if (ignoreX)
            offset.x = 0;
        if (ignoreY)
            offset.y = 0;
        if (ignoreZ)
            offset.z = 0;
        return offset;
    };
    return MouseMgr;
}());
exports.default = MouseMgr;
},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BallController_1 = require("./BallController");
var GameConst_1 = require("./GameConst");
var Utilit_1 = require("../Utilit");
var GameController_1 = require("./GameController");
var NoteBoard = /** @class */ (function (_super) {
    __extends(NoteBoard, _super);
    function NoteBoard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NoteBoard.prototype, "gameObject", {
        get: function () { return this.owner; },
        enumerable: true,
        configurable: true
    });
    NoteBoard.prototype.onAwake = function () {
        this.IsBigBoard = this.owner.name == "BigNoteBoard";
        this.boards = Utilit_1.default.FindChild(this.owner, "Boards");
        this.animator = this.boards.getComponent(Laya.Animator);
        this.crashEffect = Utilit_1.default.FindChild(this.owner, "Effect/crashEffect");
        if (this.IsBigBoard) {
            var box = Utilit_1.default.FindChild(this.boards, "Box/Box002_0");
            this.meshRenderer = box._render;
        }
        else {
            this.perfectEffect = Utilit_1.default.FindChild(this.owner, "Effect/perfectCrashEffect");
        }
    };
    NoteBoard.prototype.TweenAnimtion = function (tweenDelay) {
        this.gameObject.transform.localScaleX = 0.0001;
        this.gameObject.transform.localPositionY = 0;
        Laya.Tween.to(this.gameObject.transform, { localScaleX: 1 }, 0.3 * 1000, Laya.Ease.backOut, null, tweenDelay * 1000);
        Laya.Tween.to(this.gameObject.transform, { localPositionY: 0 }, 0.3 * 1000, Laya.Ease.backOut, null, tweenDelay * 1000);
    };
    NoteBoard.prototype.ResetBoard = function (beat, position, showColor) {
        if (this.IsBigBoard) {
            this.color = (beat.notes[0].columnIndex % 3);
            var material = GameController_1.default.Instance.GetColorMaterial(this.color, null);
            this.meshRenderer.material = material;
        }
        else {
            var redIndex = beat.notes[0].columnIndex % 3;
            var redBox = this.boards.getChildByName("Red");
            var yellowBox = this.boards.getChildByName("Yellow");
            var blueBox = this.boards.getChildByName("Blue");
            this.boards.setChildIndex(redBox, redIndex++);
            this.boards.setChildIndex(yellowBox, ((redIndex++) % 3));
            this.boards.setChildIndex(blueBox, ((redIndex++) % 3));
            var position_1 = new Laya.Vector3(GameConst_1.default.BoardInterval, 0, 0);
            for (var i = 0; i < this.boards._children.length; i++) {
                var board = this.boards.getChildAt(i);
                board.transform.localPosition = position_1;
                position_1.setValue(position_1.x - GameConst_1.default.BoardInterval, 0, 0);
                if (showColor != null) {
                    board.active = this.GetColorByString(board.name) == showColor;
                }
                else {
                    board.active = true;
                }
            }
        }
        this.beat = beat;
        this.owner.transform.position = position;
    };
    NoteBoard.prototype.GetNoteColorPosition = function (beat, color) {
        var position = new Laya.Vector3;
        if (!this.IsBigBoard) {
            var redIndex = (beat.notes[0].columnIndex % 3);
            var colorIndex = (color + redIndex) % 3;
            position = new Laya.Vector3(GameConst_1.default.BoardInterval - colorIndex * GameConst_1.default.BoardInterval, 0, 0);
            // console.log("color = " + color + "  beat.notes[0].columnIndex = " + beat.notes[0].columnIndex + " redIndex = " + redIndex + "  colorIndex = " + colorIndex) ;
        }
        // console.log(" position = " + JSON.stringify(position))
        return position;
    };
    NoteBoard.prototype.CheckTirgger = function (ball, board) {
        if (this.IsBigBoard) {
            this.TirggerBigBoard(ball, board);
        }
        else {
            this.TirggerSmallBoard(ball, board);
        }
    };
    NoteBoard.prototype.TirggerBigBoard = function (ball, board) {
        var color = this.color;
        ball.ChangeColor(color);
        this.ActiveCrashEffect(this.gameObject.transform.position.clone());
        GameController_1.default.Instance.AddSongSource(true, ball.finishProgress);
    };
    NoteBoard.prototype.TirggerSmallBoard = function (ball, board) {
        if (ball == null || board == null) {
            return;
        }
        var ballColor = ball.curColor;
        var boardColor = this.GetColorByString(board.name);
        if (ballColor != boardColor) {
            ball.Death(false);
            return;
        }
        var perfectDis = 0.5;
        var isPrefect = Math.abs(board.transform.position.x - ball.ball.transform.position.x) < perfectDis;
        GameController_1.default.Instance.AddSongSource(isPrefect, ball.finishProgress);
        this.ActiveCrashEffect(board.transform.position.clone());
        if (isPrefect) {
            this.ActivePerfectEffect(board.transform.position.clone());
        }
    };
    NoteBoard.prototype.ActiveCrashEffect = function (position) {
        var _this = this;
        this.crashEffect.active = true;
        position.setValue(position.x, position.y + 0.1, position.z);
        this.crashEffect.transform.position = position;
        this.animator.play("Shank");
        Laya.timer.once(1 * 1000, this, function () {
            _this.animator.play("Def");
            _this.crashEffect.active = false;
        });
    };
    NoteBoard.prototype.ActivePerfectEffect = function (position) {
        var _this = this;
        this.perfectEffect.active = true;
        position.setValue(position.x, position.y + 0.1, position.z);
        this.perfectEffect.transform.position = position;
        Laya.timer.once(1 * 1000, this, function () {
            _this.perfectEffect.active = false;
        });
    };
    NoteBoard.prototype.GetColorByString = function (str) {
        var color = BallController_1.BallColor.Red;
        switch (str) {
            case "Red":
                color = BallController_1.BallColor.Red;
                break;
            case "Blue":
                color = BallController_1.BallColor.Blue;
                break;
            case "Yellow":
                color = BallController_1.BallColor.Yellow;
                break;
        }
        return color;
    };
    NoteBoard.GetBigBoardColor = function (beat) {
        return (beat.notes[0].columnIndex % 3);
    };
    return NoteBoard;
}(Laya.Script3D));
exports.default = NoteBoard;
},{"../Utilit":41,"./BallController":11,"./GameConst":13,"./GameController":14}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameController_1 = require("./GameController");
var NoteBoard_1 = require("./NoteBoard");
var GameConst_1 = require("./GameConst");
var BallController_1 = require("./BallController");
var ParamCubeCube_1 = require("./Audio/ParamCubeCube");
var AudioWraper_1 = require("./Audio/AudioWraper");
var CrashEffect = "CrashEffect";
var PerfectCrashEffect = "CrashEffect";
var SmallNoteBoard = "SmallNoteBoard";
var BigNoteBoard = "BigNoteBoard";
var NoteBoardManager = /** @class */ (function (_super) {
    __extends(NoteBoardManager, _super);
    function NoteBoardManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._songNote = null;
        _this._lastAppearBeat = null;
        _this._noteBoards = null;
        _this._pastNoteBoards = null;
        _this.PreLoadNoteTime = 20;
        _this._bandCubes = new Array;
        _this._correctColor = BallController_1.BallColor.Red;
        _this._crashPrefab = null;
        _this._perfectCrashPrefab = null;
        _this._bigNoteBoardPrefab = null;
        _this._smallNoteBoardPrefab = null;
        return _this;
    }
    Object.defineProperty(NoteBoardManager.prototype, "gameObject", {
        get: function () {
            return this.owner;
        },
        enumerable: true,
        configurable: true
    });
    NoteBoardManager.prototype.onAwake = function () {
        var prefabs = GameController_1.default.Instance.scene.getChildByName("Prefabs");
        this._crashPrefab = prefabs.getChildByName("crashEffect");
        this._perfectCrashPrefab = prefabs.getChildByName("perfectCrashEffect");
        this._bigNoteBoardPrefab = prefabs.getChildByName("BigNoteBoard");
        this._smallNoteBoardPrefab = prefabs.getChildByName("SmallNoteBoard");
        this.InitBandEffect();
    };
    NoteBoardManager.prototype.InitBandEffect = function () {
        var effectNode = this.gameObject.getChildByName("Effect");
        for (var i = 0; i < 2; i++) {
            var bandCubes = effectNode.getChildByName("BandCubes" + i);
            for (var j = 0; j < 8; j++) {
                var cube = bandCubes.getChildByName("BandCube" + j);
                if (cube.active == false)
                    continue;
                var paramCubeCube = cube.addComponent(ParamCubeCube_1.default);
                paramCubeCube.bandIndex = j;
                this._bandCubes.push(paramCubeCube);
            }
        }
        // effectNode = this.gameObject.getChildByName("Synthesis");
        // for (let i = 0; i < 3; i++) {
        //     let bandCubes  = effectNode.getChildByName("BandCubes" + i);
        //     for (let j = 0; j < 8; j++) {
        //         let cube = bandCubes.getChildByName("BandCube" + j);
        //         let paramCubeCube = cube.addComponent(ParamCube) as ParamCube;
        //         paramCubeCube.startScaleY = 0.55;
        //         paramCubeCube.maxScaleY = 0.7
        //         paramCubeCube.bandIndex = j;
        //         this._bandCubes.push(paramCubeCube);
        //     }
        // }
    };
    NoteBoardManager.prototype.InitNoteBoard = function (songNote) {
        this.Clear();
        this._songNote = songNote;
        this.AutoSpawnNewNoteBoard(0);
    };
    NoteBoardManager.prototype.AutoSpawnNewNoteBoard = function (curTime) {
        var inde = 0;
        var timeDelay = 0.1;
        var willShow = (curTime + this.PreLoadNoteTime);
        var beats = this._songNote.beats;
        for (var i = 0; i < beats.length; i++) {
            var beat = beats[i];
            var timeAppear = beat.timeAppear;
            if (timeAppear > willShow || this._noteBoards.length > 7) {
                break;
            }
            if (this._lastAppearBeat != null && this._lastAppearBeat.timeAppear >= beat.timeAppear) {
                continue;
            }
            //console.log("加载音符：" + beat.guid);
            var noteBoard = this.SpawnNewNoteBoard(beat, (inde++ * timeDelay));
            this._noteBoards.push(noteBoard);
            this._lastAppearBeat = beat;
        }
    };
    NoteBoardManager.prototype.SpawnNewNoteBoard = function (beat, tweenDelay) {
        var position = new Laya.Vector3(0, 0, 0);
        if (this._lastAppearBeat != null) {
            var lastBoard = this._noteBoards[this._noteBoards.length - 1];
            var timeIncrement = beat.timeAppear - this._lastAppearBeat.timeAppear;
            if (timeIncrement >= GameConst_1.default.BoardIntervalTime) {
                var z = timeIncrement * (GameConst_1.default.BoardIntervalSpace / GameConst_1.default.BoardIntervalTime);
                position.setValue(0, 0, lastBoard.gameObject.transform.position.z + z);
            }
            else {
                position.setValue(0, 0, lastBoard.gameObject.transform.position.z + GameConst_1.default.BoardIntervalSpace);
            }
        }
        var isBigBoard = beat.notes.length >= 2;
        if (isBigBoard) {
            this._correctColor = NoteBoard_1.default.GetBigBoardColor(beat);
        }
        var prefabString = isBigBoard ? BigNoteBoard : SmallNoteBoard;
        var boardObj = this.AutoSpawnPrefab(prefabString);
        var noteBoard = boardObj.getComponent(NoteBoard_1.default);
        if (noteBoard == null) {
            noteBoard = boardObj.addComponent(NoteBoard_1.default);
        }
        var showOneColor = GameController_1.default.Instance.currentSong.showOneColor;
        noteBoard.ResetBoard(beat, position, showOneColor ? this._correctColor : null);
        noteBoard.TweenAnimtion(tweenDelay);
        return noteBoard;
    };
    NoteBoardManager.prototype.AutoRecycleNoteBoard = function () {
        var RemovalDistance = 10;
        for (var i = 0; i < this._noteBoards.length;) {
            var noteBoard = this._noteBoards[i];
            var distance = GameController_1.default.Instance.ballController.gameObject.transform.position.z - noteBoard.gameObject.transform.position.z;
            if (distance < RemovalDistance / 2) {
                i++;
                continue;
            }
            this._noteBoards.splice(i, 1);
            this._pastNoteBoards.push(noteBoard);
        }
        for (var i = 0; i < this._pastNoteBoards.length;) {
            var noteBoard = this._pastNoteBoards[i];
            var distance = GameController_1.default.Instance.ballController.gameObject.transform.position.z - noteBoard.gameObject.transform.position.z;
            if (distance < RemovalDistance) {
                i++;
                continue;
            }
            this._pastNoteBoards.splice(i, 1);
            this.RecycleNoteBoard(noteBoard);
        }
    };
    NoteBoardManager.prototype.RecycleNoteBoard = function (noteBoard) {
        noteBoard.gameObject.transform.localPositionY = -100;
        var boardString = noteBoard.IsBigBoard ? BigNoteBoard : SmallNoteBoard;
        this.RecyclePrefab(boardString, noteBoard.gameObject);
    };
    NoteBoardManager.prototype.Clear = function () {
        if (this._noteBoards != null) {
            for (var i = 0; i < this._noteBoards.length;) {
                var noteBoard = this._noteBoards[i];
                this._noteBoards.splice(0, 1);
                this.RecycleNoteBoard(noteBoard);
            }
        }
        if (this._pastNoteBoards != null) {
            for (var i = 0; i < this._pastNoteBoards.length;) {
                var noteBoard = this._pastNoteBoards[i];
                this._pastNoteBoards.splice(0, 1);
                this.RecycleNoteBoard(noteBoard);
            }
        }
        this._correctColor = null;
        this._lastAppearBeat = null;
        this._noteBoards = new Array;
        this._pastNoteBoards = new Array;
        this.gameObject.transform.position = new Laya.Vector3();
    };
    NoteBoardManager.prototype.GetNoteBoardbyBeat = function (beat) {
        for (var i = 0; i < this._noteBoards.length; i++) {
            var noteBoard = this._noteBoards[i];
            if (beat.guid == noteBoard.beat.guid) {
                return noteBoard;
            }
        }
        return null;
    };
    NoteBoardManager.prototype.KnockNote = function () {
        var effectNode = this.owner.getChildByName("Effect");
        var note1 = effectNode.getChildByName("yingbo");
        var tweenTime = 0.07 * 1000;
        var tweenScale = 1.03;
        Laya.Tween.clearAll(note1.transform);
        var change = { localScaleX: tweenScale, localScaleY: tweenScale, localScaleZ: tweenScale };
        var def = { localScaleX: 1, localScaleY: 1, localScaleZ: 1 };
        Laya.Tween.to(note1.transform, change, tweenTime, Laya.Ease.quadOut, Laya.Handler.create(this, function () {
            Laya.Tween.to(note1.transform, def, tweenTime, Laya.Ease.quadIn);
        }));
    };
    NoteBoardManager.prototype.AutoSpawnPrefab = function (key) {
        var obj = Laya.Pool.getItem(key);
        if (obj != null) {
            return obj;
        }
        var scene = GameController_1.default.Instance.scene;
        switch (key) {
            case CrashEffect: {
                obj = Laya.Sprite3D.instantiate(this._crashPrefab, scene);
                break;
            }
            case PerfectCrashEffect: {
                obj = Laya.Sprite3D.instantiate(this._perfectCrashPrefab, scene);
                break;
            }
            case BigNoteBoard: {
                console.log("create big");
                obj = Laya.Sprite3D.instantiate(this._bigNoteBoardPrefab, scene);
                break;
            }
            case SmallNoteBoard: {
                console.log("create small");
                obj = Laya.Sprite3D.instantiate(this._smallNoteBoardPrefab, scene);
                break;
            }
            default: throw "没有这个预制体：" + key;
        }
        return obj;
    };
    NoteBoardManager.prototype.RecyclePrefab = function (key, obj) {
        obj.transform.localPositionX = -10;
        Laya.Pool.recover(key, obj);
    };
    NoteBoardManager.prototype.BandCubesStart = function () {
        for (var i = 0; i < this._bandCubes.length; i++) {
            this._bandCubes[i].Start();
        }
    };
    NoteBoardManager.prototype.BandCubesStop = function () {
        for (var i = 0; i < this._bandCubes.length; i++) {
            this._bandCubes[i].Stop();
        }
    };
    NoteBoardManager.prototype.onLateUpdate = function () {
        if (!GameController_1.default.Instance.isRun) {
            return;
        }
        this.AutoRecycleNoteBoard();
        if (AudioWraper_1.default.Instance.SoundChannel) {
            this.AutoSpawnNewNoteBoard(AudioWraper_1.default.Instance.PlayPosition);
        }
        var transform = this.owner.transform;
        transform.position = GameController_1.default.Instance.ballController.gameObject.transform.position.clone();
    };
    return NoteBoardManager;
}(Laya.Script3D));
exports.default = NoteBoardManager;
},{"./Audio/AudioWraper":8,"./Audio/ParamCubeCube":10,"./BallController":11,"./GameConst":13,"./GameController":14,"./NoteBoard":16}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NoteManager = /** @class */ (function () {
    function NoteManager() {
        this._songNote = null;
    }
    Object.defineProperty(NoteManager, "Instance", {
        get: function () {
            return this._instance ? this._instance : this._instance = new NoteManager();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoteManager.prototype, "songNote", {
        get: function () {
            return this._songNote;
        },
        enumerable: true,
        configurable: true
    });
    NoteManager.prototype.Load = function (url, caller, completed) {
        var _this = this;
        Laya.loader.load(url, Laya.Handler.create(this, function () {
            var json = Laya.loader.getRes(url);
            if (json == null) {
                console.log("访问Song节奏文件资源失败！" + url);
                return;
            }
            _this.LoadJson(Laya.loader.getRes(url));
            if (completed != null) {
                completed.call(caller);
            }
        }), null, Laya.Loader.JSON);
    };
    NoteManager.prototype.LoadJson = function (json) {
        if (json == null) {
            return;
        }
        var time = json["time"];
        var notes = json["note"];
        if (notes.length == 0) {
            return;
        }
        var bpm = time[0].bpm;
        var partBeat = notes[0].beat[2];
        var beatTime = 60 / (time[0].bpm * partBeat);
        var beatDelay = notes[notes.length - 1].offset / 1000;
        var songNote = new SongNote(time[0].bpm, this.AnalyzeTransformNoteTest(notes, bpm), beatDelay);
        songNote.songName = notes[notes.length - 1].sound;
        this._songNote = songNote;
    };
    NoteManager.prototype.AnalyzeTransformNote = function (notes, partBeat, beatTime) {
        var oldBeatIndex = null;
        var beatAllNotes = null;
        var AllBeats = new Array;
        for (var i = 0; i < notes.length - 1; i++) {
            var note = notes[i];
            var noteIndex = note.beat[0];
            var beatIndex = (noteIndex * partBeat + note.beat[1]);
            var columnIndex = note.column;
            var timeAppear = beatIndex * beatTime;
            if (oldBeatIndex != beatIndex) {
                beatAllNotes = new Array;
                oldBeatIndex = beatIndex;
                AllBeats.push(new Beat(beatAllNotes, NoteManager.guidIndex++));
            }
            beatAllNotes.push(new Note(columnIndex, timeAppear));
        }
        return AllBeats;
    };
    NoteManager.prototype.AnalyzeTransformNoteTest = function (notes, bpm) {
        var oldBeatIndex = null;
        var beatAllNotes = null;
        var AllBeats = new Array;
        for (var i = 0; i < notes.length - 1; i++) {
            var note = notes[i];
            var beat = note.beat;
            var columnIndex = note.column;
            var beatIndex = (note.beat[0] * note.beat[2] + note.beat[1]);
            var timeAppear = beatIndex * (60 / (bpm * note.beat[2]));
            if (oldBeatIndex != timeAppear) {
                beatAllNotes = new Array;
                oldBeatIndex = timeAppear;
                AllBeats.push(new Beat(beatAllNotes, NoteManager.guidIndex++));
            }
            beatAllNotes.push(new Note(columnIndex, timeAppear));
        }
        return AllBeats;
    };
    NoteManager.prototype.GetBeat = function (index) {
        return this.songNote.beats[index];
    };
    NoteManager.prototype.GetBeatTimeAppear = function (index) {
        return this.songNote.beats[index].timeAppear;
    };
    NoteManager.guidIndex = 0;
    return NoteManager;
}());
exports.default = NoteManager;
var SongNote = /** @class */ (function () {
    function SongNote(bpm, beats, beatDelay) {
        if (beatDelay === void 0) { beatDelay = 0; }
        this.bpm = 0;
        this.beatDelay = 0;
        this.beats = null;
        this.songName = "";
        this.beats = beats;
        this.bpm = bpm;
        this.beatDelay = beatDelay == null ? 0 : beatDelay;
    }
    SongNote.prototype.clone = function () {
        var bpm = this.bpm;
        var beatDelay = this.beatDelay;
        var notes = new Array;
        for (var i = 0; i < this.beats.length; i++) {
            notes.push(this.beats[i]);
        }
        return new SongNote(bpm, notes, beatDelay);
    };
    return SongNote;
}());
exports.SongNote = SongNote;
var Beat = /** @class */ (function () {
    function Beat(notes, guid) {
        if (guid === void 0) { guid = 0; }
        this.guid = 0;
        this.notes = null;
        this.notes = notes;
        this.guid = guid;
    }
    Object.defineProperty(Beat.prototype, "timeAppear", {
        get: function () {
            return this.notes[0].timeAppear;
        },
        enumerable: true,
        configurable: true
    });
    Beat.prototype.GetColumnGroup = function (column) {
        for (var i = 0; i < this.notes.length; i++) {
            if (this.notes[i].columnIndex == column)
                return this.notes[i];
        }
        return null;
    };
    return Beat;
}());
exports.Beat = Beat;
var Note = /** @class */ (function () {
    function Note(columnIndex, timeAppear) {
        this.noteIndex = 0;
        this.columnIndex = 0;
        this.timeAppear = 0;
        this.columnIndex = columnIndex;
        this.timeAppear = timeAppear;
    }
    return Note;
}());
exports.Note = Note;
},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Version_1 = require("./Version");
var User_1 = require("../User/User");
var ViewMgr_1 = require("../Mgr/ViewMgr");
var WXAPI_1 = require("../WXAPI");
var GameMgr_1 = require("../Mgr/GameMgr");
var AudioWraper_1 = require("./Audio/AudioWraper");
exports.castPlayOneMoney = 10;
var lastSongKey = "LastPlaySong";
var SoundManager = /** @class */ (function () {
    function SoundManager() {
    }
    Object.defineProperty(SoundManager, "Instance", {
        get: function () {
            return SoundManager._instance ? SoundManager._instance : SoundManager._instance = new SoundManager;
        },
        enumerable: true,
        configurable: true
    });
    SoundManager.prototype.IsFirstEnterGame = function () {
        var FirstEnter = "FirstEnter";
        var value = Laya.LocalStorage.getItem(FirstEnter);
        Laya.LocalStorage.setItem(FirstEnter, "succeed");
        return value == null || value == "";
    };
    SoundManager.prototype.IsFirstTime = function () {
        var count = 0;
        var passSongs = User_1.default.getPassSong();
        for (var i = 0; i < passSongs.length; i++) {
            if (passSongs[i].completed) {
                count += 1;
            }
        }
        return count < 1;
    };
    SoundManager.prototype.CheckSongUnlocked = function (name) {
        return User_1.default.IncludetSong(name);
    };
    SoundManager.prototype.CanPlayOne = function () {
        if (User_1.default.getMoney() < exports.castPlayOneMoney) {
            return false;
        }
        return true;
    };
    SoundManager.prototype.GetSongRecord = function (name) {
        var passSongs = User_1.default.getPassSong();
        for (var i = 0; i < passSongs.length; i++) {
            var song = passSongs[i];
            if (song.name == name) {
                return song;
            }
        }
        return null;
    };
    SoundManager.prototype.SaveSongRecord = function (name, starLevel, source, completed, saveCompleted) {
        console.log("saveSongRecord:" + name + "|starLevel:" + starLevel + "|source:" + source);
        var passSong = this.GetSongRecord(name);
        if (source > passSong.source) {
            passSong.source = source;
        }
        if (starLevel > passSong.starLevel) {
            passSong.starLevel = starLevel;
        }
        if (!passSong.completed) {
            passSong.completed = completed;
        }
        if (!saveCompleted) {
            GameMgr_1.default.getInstance().save_myqq_GameData();
        }
        else {
            GameMgr_1.default.getInstance().save_myqq_GameData(saveCompleted.caller, saveCompleted.method);
        }
    };
    SoundManager.prototype.GetSongbyName = function (name) {
        var songs = Version_1.default.songs;
        for (var i = 0; i < songs.length; i++) {
            if (songs[i].name == name) {
                return songs[i];
            }
        }
        return null;
    };
    SoundManager.prototype.PlaySongbyName = function (name) {
        var song = this.GetSongbyName(name);
        this.PlaySong(song);
    };
    SoundManager.prototype.CheckSongIsFree = function (song) {
        var isFree = Version_1.default.enableCharge ? song.chargeType == 0 : true;
        return isFree;
    };
    SoundManager.prototype.AuditionSong = function (song) {
        Laya.LocalStorage.setItem(lastSongKey, song.name);
        AudioWraper_1.default.Instance.LoadPlay(song.songPath);
    };
    SoundManager.prototype.PlaySong = function (song, caller, completed) {
        // if (User.getMoney() < 10) {
        //     View_myqq_Mgr.instance.openView(ViewDef.TipsView, "你当前体力不足");
        //     return;
        // }
        if (song == null) {
            return;
        }
        function playSong(succeed) {
            if (!succeed) {
                return;
            }
            AudioWraper_1.default.Instance.Stop();
            Laya.LocalStorage.setItem(lastSongKey, song.name);
            ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.GameLoadingView, song, function () {
                if (completed != null) {
                    completed.call(caller);
                }
            });
        }
        var powerEnough = this.CanPlayOne();
        this.PlayAndUnlockSong(powerEnough, song, Laya.Handler.create(this, playSong));
    };
    SoundManager.prototype.GetSongCastMoney = function (song) {
        return song.chargeType == Version_1.ChargeType.Power ? song.costPower : exports.castPlayOneMoney;
    };
    SoundManager.prototype.SubPlayOneMoney = function (song, saveNow) {
        if (saveNow === void 0) { saveNow = false; }
        var castMoney = this.GetSongCastMoney(song);
        User_1.default.subMoney(castMoney);
        if (saveNow == true) {
            GameMgr_1.default.getInstance().save_myqq_GameData();
        }
    };
    SoundManager.prototype.PlayAndUnlockSong = function (powerEnough, song, completed) {
        var _this = this;
        var lookAdSucceed = function (succeed) {
            if (completed)
                completed.runWith(succeed);
            if (!succeed) {
                ViewMgr_1.default.instance.showTips("观看完整视频才可解锁游戏！");
                return;
            }
            if (!User_1.default.IncludetSong(song.name)) {
                User_1.default.AddUnlockSong(song.name);
                GameMgr_1.default.getInstance().save_myqq_GameData(_this);
            }
        };
        if (!Version_1.default.enableCharge) {
            if (!powerEnough) {
                this.PlayCastByChargeType(2, 0, this, lookAdSucceed);
                //View_myqq_Mgr.instance.showTips("当前体力不足");
            }
            else {
                lookAdSucceed.call(this, true);
            }
        }
        else {
            if (User_1.default.IncludetSong(song.name)) {
                if (completed != null)
                    completed.runWith(true);
                return;
            }
            this.PlayCastByChargeType(song.chargeType, song.costPower, this, lookAdSucceed);
        }
    };
    SoundManager.prototype.LookRewardedVideo = function (completed) {
        this.PlayCastByChargeType(3, 0, completed.caller, completed.method);
    };
    // 0 免费 1 金币 2 广告
    SoundManager.prototype.PlayCastByChargeType = function (chargeType, castMoney, caller, handler) {
        switch (chargeType) {
            case Version_1.ChargeType.Free: {
                console.log("免费解锁");
                handler.call(caller, true);
                break;
            }
            case Version_1.ChargeType.Power: {
                console.log("消耗体力解锁");
                if (User_1.default.getMoney() < castMoney) {
                    handler.call(caller, false);
                    return;
                }
                User_1.default.subMoney(10);
                handler.call(caller, true);
                break;
            }
            case Version_1.ChargeType.Video: {
                console.log("广告解锁");
                var self_1 = this;
                WXAPI_1.default.showRewardedVideoAd(function (isCompleted) {
                    handler.call(caller, isCompleted);
                }, function () {
                    handler.call(caller, false);
                });
                break;
            }
        }
    };
    SoundManager.prototype.GetLastPlaySongIndex = function () {
        var index = 0;
        var name = Laya.LocalStorage.getItem(lastSongKey);
        for (var i = 0; i < Version_1.default.songs.length; i++) {
            var song = Version_1.default.songs[i];
            if (song.name == name) {
                index = i;
            }
        }
        return index;
    };
    SoundManager.prototype.GetSongAwards = function (win, starLevel) {
        var awards = 2;
        return (win) ? awards * starLevel : 5;
    };
    SoundManager.prototype.SetAdSongAwards = function (starLevel) {
        var count = this.GetSongAwards(true, starLevel) * 5;
        User_1.default.addMoney(count);
        GameMgr_1.default.getInstance().save_myqq_GameData();
        return User_1.default.getMoney();
    };
    SoundManager.prototype.SetFreeSongAwards = function () {
        var count = this.GetSongAwards(false, 0);
        User_1.default.addMoney(count);
        GameMgr_1.default.getInstance().save_myqq_GameData();
        return User_1.default.getMoney();
    };
    return SoundManager;
}());
exports.default = SoundManager;
},{"../Mgr/GameMgr":26,"../Mgr/ViewMgr":29,"../User/User":40,"../WXAPI":58,"./Audio/AudioWraper":8,"./Version":23}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FSMStateMachine = /** @class */ (function () {
    function FSMStateMachine() {
        this.curState = new FsmState("", null, null, null);
        this.stateHashTabel = {};
    }
    FSMStateMachine.prototype.AddState = function (state) {
        if (state == null)
            return;
        this.stateHashTabel[state.key] = state;
    };
    FSMStateMachine.prototype.AddAction = function (key, enter, exit, update) {
        if (enter === void 0) { enter = null; }
        if (exit === void 0) { exit = null; }
        if (update === void 0) { update = null; }
        this.AddState(new FsmState(key, enter, exit, update));
    };
    FSMStateMachine.prototype.Switch = function (key, args) {
        if (args === void 0) { args = null; }
        var oldState = this.curState;
        var newState = this.stateHashTabel[key];
        if (newState == null || newState.key == oldState.key)
            return;
        if (oldState != null)
            oldState.OnExit();
        this.curState = newState;
        newState.OnEnter(args);
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
    function FsmState(key, enter, exit, update) {
        this.key = key;
        this.enter = enter;
        this.exit = exit;
        this.update = update;
        if (this.enter != null)
            this.enter.once = false;
        if (this.exit != null)
            this.exit.once = false;
        if (this.update != null)
            this.update.once = false;
    }
    FsmState.prototype.OnEnter = function (args) {
        if (this.enter != null)
            this.enter.runWith(args);
    };
    FsmState.prototype.OnExit = function () {
        if (this.exit != null)
            this.exit.run();
    };
    FsmState.prototype.OnUpdate = function () {
        if (this.update != null)
            this.update.run();
    };
    return FsmState;
}());
exports.FsmState = FsmState;
},{}],22:[function(require,module,exports){
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
    PhysicTrigger3d.triggerenter = "triggerenter3d";
    PhysicTrigger3d.triggerstay = "triggerstay3d";
    PhysicTrigger3d.triggerexit = "triggerexit3d";
    return PhysicTrigger3d;
}(Laya.Script3D));
exports.default = PhysicTrigger3d;
},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConst_1 = require("./GameConst");
var Version = /** @class */ (function () {
    function Version() {
    }
    Version.Load = function (url, caller, completed) {
        console.log(url);
        Laya.loader.load(url, Laya.Handler.create(this, function () {
            var json = Laya.loader.getRes(url);
            if (json == null) {
                console.log("访问Version文件资源失败！" + url);
                return;
            }
            url = url.replace("/Version.json", "");
            Version.LoadJons(url, json);
            if (completed != null) {
                completed.call(caller);
            }
        }), null, Laya.Loader.JSON);
    };
    Version.LoadJons = function (url, json) {
        var songs = json["songs"];
        if (songs == null) {
            console.log("当前版本无歌曲!" + url);
            return;
        }
        for (var i = 0; i < songs.length; i++) {
            var node = songs[i];
            var rootPath = url + GameConst_1.default.SoundFile;
            var rootPreviewImage = url + GameConst_1.default.SoundPreviewImages;
            var song = Version.objToSong(node, rootPath, rootPreviewImage);
            Version.songs.push(song);
        }
        var enableCharge = json["enableCharge"];
        this.enableCharge = enableCharge == true;
    };
    Version.objToSong = function (obj, rootPath, rootPreviewImage) {
        var name = obj.name;
        var songName = obj.songName;
        var song = new Song(name, songName);
        var previewImages = obj.pngs;
        song.rootPath = rootPath;
        song.rootPreviewImage = rootPreviewImage;
        song.SetPreviewImages(previewImages);
        song.chargeType = obj.enableCharge ? obj.enableCharge : 0;
        song.costPower = obj.costPower;
        song.showOneColor = obj.showOneColor == true;
        return song;
    };
    Version.Clear = function () {
        this.songs = new Array;
    };
    Version.songs = new Array;
    Version.enableCharge = true;
    return Version;
}());
exports.default = Version;
var ChargeType;
(function (ChargeType) {
    ChargeType[ChargeType["Free"] = 0] = "Free";
    ChargeType[ChargeType["Power"] = 1] = "Power";
    ChargeType[ChargeType["Video"] = 2] = "Video";
})(ChargeType = exports.ChargeType || (exports.ChargeType = {}));
var Song = /** @class */ (function () {
    function Song(name, songName) {
        this.name = "";
        this.songName = "";
        this.rootPath = "";
        this.rootPreviewImage = "";
        this.chargeType = 0;
        this.costPower = 0;
        this.showOneColor = false;
        this.enableBand = true;
        this.previewPngs = null;
        this.name = name;
        this.songName = songName;
        this.previewPngs = new Array;
    }
    Song.prototype.SetPreviewImages = function (names) {
        if (names == null) {
            return;
        }
        for (var i = 0; i < names.length; i++) {
            var path = this.rootPreviewImage + names[i];
            this.previewPngs.push(path);
        }
    };
    Song.prototype.getSoundPath = function (suffix) {
        return this.rootPath + this.name + "/" + this.name + suffix;
    };
    Object.defineProperty(Song.prototype, "songPath", {
        get: function () {
            return this.getSoundPath(".ogg");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Song.prototype, "songJosnPath", {
        get: function () {
            return this.getSoundPath(".mc");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Song.prototype, "songBandPath", {
        get: function () {
            return this.getSoundPath(".band");
        },
        enumerable: true,
        configurable: true
    });
    Song.prototype.clone = function () {
        var song = new Song(this.name, this.songName);
        song.rootPath = this.rootPath;
        song.rootPreviewImage = this.rootPreviewImage;
        song.chargeType = this.chargeType;
        song.costPower = this.costPower;
        song.showOneColor = this.showOneColor;
        this.enableBand = this.enableBand;
        this.previewPngs = this.previewPngs;
        return song;
    };
    return Song;
}());
exports.Song = Song;
Song.prototype.toString = function () {
    return "Name:" + this.Name + "Path:" + this.Path + "SongName:" + this.SongName;
};
/*
{
    "songs": [
        {
            "name": 1570679056,
            "songName": "这是第一首歌",
            "showOneColor": false,
            "//":"使用体力解锁时消耗",
            "costPower": 10,
            "//":"0 免费 1 体力 2 广告",
            "enableCharge": 0,
            "//":"预览图",
            "pngs": [

            ]
        }
    ],
    "//":"每次游戏消耗体力",
    "playSongPower": 10,
    "//":"游戏中复活次数",
    "resurgenceCount": 1,
    "//":"是否开启收费 全局控制",
    "enableCharge": false
}
*/ 
},{"./GameConst":13}],24:[function(require,module,exports){
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
    MaiLiang.mainUrl = "";
    MaiLiang.uclick = "";
    MaiLiang.stay = "";
    MaiLiang.key = ""; //推广路径中同名参数，需要调用方法WXAPi.getLaunchOptionsSync()，从返回的参数中获得。
    MaiLiang.MaiLiangOpenId = ""; //买量系统唯一标识,执行GetMaiLiangOpenId()方法成功后自动获得。
    MaiLiang.time = 0; //买量系统唯一标识后，记录当前时间（精确到秒）。
    return MaiLiang;
}());
exports.default = MaiLiang;
},{"../AppConfig":2,"../Net/HttpUnit":32,"../User/User":40,"../WXAPI":58}],25:[function(require,module,exports){
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
var GameConst_1 = require("./Game/GameConst");
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
        // Laya.stage.frameRate = laya.display.Stage.FRAME_SLOW;
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
        if (!Laya.Browser.onMiniGame) //如果不是微信小游戏，资源服务器设置为本地测试地址
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
        this._preLoadRes.push({ url: GameConst_1.default.GetRemoteVersionPath, type: Laya.Loader.JSON });
        this._preLoadRes.push({ url: GameConst_1.default.GetLocalSubResVersionPath, type: Laya.Loader.JSON });
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
                self._loadingView.setProcess(res * 2);
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
                            User_1.default.initiUser(null);
                            GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                            }));
                        });
                    }
                }, function (res) {
                    console.log("登陆失败！！！" + res);
                    User_1.default.initiUser(null);
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene, false, Laya.Handler.create(_this, function () {
                    }));
                });
            }, null);
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
},{"./AppConfig":2,"./Event/EventDef":4,"./Event/EventMgr":5,"./Game/GameConst":13,"./GameConfig":6,"./NativeCallback":30,"./Net/HttpUnit":32,"./User/User":40,"./View/LoadingView/LoadingView":54,"./WXAPI":58,"./ui/layaMaxUI":59}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("./ViewMgr");
var User_1 = require("../User/User");
var MaiLiang_1 = require("../MaiLiangAPI/MaiLiang");
var EventMgr_1 = require("../Event/EventMgr");
var EventDef_1 = require("../Event/EventDef");
var WXAPI_1 = require("../WXAPI");
var GameController_1 = require("../Game/GameController");
var Version_1 = require("../Game/Version");
var GameConst_1 = require("../Game/GameConst");
var SoundManager_1 = require("../Game/SoundManager");
//游戏管理器，游戏代码的入口
var Game_myqq_Mgr = /** @class */ (function (_super) {
    __extends(Game_myqq_Mgr, _super);
    function Game_myqq_Mgr() {
        var _this = _super.call(this) || this;
        Game_myqq_Mgr._instance = _this;
        return _this;
    }
    Game_myqq_Mgr.getInstance = function () { return Game_myqq_Mgr._instance; };
    Game_myqq_Mgr.prototype.onAwake = function () {
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
    };
    Game_myqq_Mgr.prototype.onStart = function () {
        this.Test();
        this.preCreateGame();
    };
    Game_myqq_Mgr.prototype.Test = function () {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].onShow(function () {
                EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_FOCUS);
            });
            Laya.Browser.window["wx"].onHide(function () {
                EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_BLUR);
            });
        }
        else {
            Laya.stage.on(Laya.Event.BLUR, this, function () {
                EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_BLUR);
            });
            Laya.stage.on(Laya.Event.FOCUS, this, function () {
                EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_FOCUS);
            });
        }
    };
    Game_myqq_Mgr.prototype.preCreateGame = function () {
        if (Laya.Browser.onMiniGame) {
            Laya.MiniAdpter.autoCacheFile = true;
        }
        Laya.SoundManager.autoStopMusic = false;
        Version_1.default.Load(GameConst_1.default.GetLocalSubResVersionPath);
        // Version.Load(GameConst.GetRemoteVersionPath, this, () => {
        // });
        this.LoadGame();
        this.save_myqq_GameData();
    };
    Game_myqq_Mgr.prototype.LoadGame = function () {
        var _this = this;
        //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
        GameController_1.default.Instance.Init(this, function () {
            if (SoundManager_1.default.Instance.IsFirstEnterGame()) {
                var song = Version_1.default.songs[0].clone();
                song.showOneColor = true;
                song.chargeType = Version_1.ChargeType.Free;
                User_1.default.addMoney(10);
                SoundManager_1.default.Instance.PlaySong(song, _this, function () {
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.App_CloseFirstLoadingView);
                });
            }
            else {
                ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.GameMainView, null, function () {
                    EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.App_CloseFirstLoadingView);
                });
            }
        });
    };
    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    Game_myqq_Mgr.prototype.save_myqq_GameData = function (caller, completed) {
        var callBack = function (succeed) { if (completed)
            completed.call(caller, succeed); };
        localStorage.setItem("Game_Data", User_1.default.getSaveData());
        callBack(true);
        // Http_myqq_Unit.saveGameData(User_yy.getSaveData(),
        //     (res) => {
        //         if (res.code != 1) {
        //             callBack(false);
        //             console.log("存档失败")
        //             return;
        //         }
        //         callBack(true);
        //         console.log("存档成功")
        //     },
        //     (res) => {
        //         callBack(false);
        //         console.log("存档失败")
        //     })
    };
    Game_myqq_Mgr._instance = null;
    return Game_myqq_Mgr;
}(Laya.Script));
exports.default = Game_myqq_Mgr;
},{"../Event/EventDef":4,"../Event/EventMgr":5,"../Game/GameConst":13,"../Game/GameController":14,"../Game/SoundManager":19,"../Game/Version":23,"../MaiLiangAPI/MaiLiang":24,"../User/User":40,"../WXAPI":58,"./ViewMgr":29}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sound_myqq_Mgr = /** @class */ (function () {
    function Sound_myqq_Mgr() {
        this._enabled = true;
    }
    Object.defineProperty(Sound_myqq_Mgr.prototype, "Enabled", {
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
    Sound_myqq_Mgr.prototype.getSoundUrl = function (name) {
        var url = Sound_myqq_Mgr.soundResPath + name + ".ogg";
        return url;
    };
    Sound_myqq_Mgr.prototype.playSound = function (name) {
        if (!this._enabled)
            return;
        var url = this.getSoundUrl(name);
        if (Laya.Browser.onMiniGame) {
            var sound = laya.utils.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = Sound_myqq_Mgr.soundResPath + name + ".ogg";
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
    Sound_myqq_Mgr.prototype.playBGM = function (name) {
        if (!this._enabled)
            return;
        var url = this.getSoundUrl(name);
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
    Sound_myqq_Mgr.prototype.stopBGM = function () {
        if (Laya.Browser.onMiniGame) {
            if (this.bgm) {
                this.bgm.stop();
            }
        }
        else {
            Laya.SoundManager.stopMusic();
        }
    };
    Sound_myqq_Mgr.soundResPath = "subRes/sound/";
    Sound_myqq_Mgr.instance = new Sound_myqq_Mgr();
    return Sound_myqq_Mgr;
}());
exports.default = Sound_myqq_Mgr;
},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NativeCallback_1 = require("../NativeCallback");
var Vibrate_myqq_Mgr = /** @class */ (function () {
    function Vibrate_myqq_Mgr() {
    }
    //短震动
    Vibrate_myqq_Mgr.vibrateShort = function () {
        if (!Vibrate_myqq_Mgr.isEnable)
            return;
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].vibrateShort();
        }
        else {
            NativeCallback_1.default.CallNativeFunc("vibrateShort");
        }
    };
    //长震动
    Vibrate_myqq_Mgr.ibrateLong = function () {
        if (!Vibrate_myqq_Mgr.isEnable)
            return;
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].vibrateLong();
        }
        else {
            NativeCallback_1.default.CallNativeFunc("vibrateLong");
        }
    };
    //定时震动,毫秒
    Vibrate_myqq_Mgr.vibrate = function (time) {
        if (!Vibrate_myqq_Mgr.isEnable)
            return;
        if (Laya.Browser.onMiniGame) {
            var count_1 = time / 15; //微信小游戏中震动的时间是15毫秒的整数倍时间，本质是对短震动的封装
            var index_1 = 0;
            var obj_1 = { count: count_1, index: index_1 };
            Laya.timer.loop(16, obj_1, function () {
                Vibrate_myqq_Mgr.vibrateShort();
                index_1++;
                if (index_1 > count_1) {
                    Laya.timer.clearAll(obj_1);
                }
            });
        }
    };
    Vibrate_myqq_Mgr.isEnable = false;
    return Vibrate_myqq_Mgr;
}());
exports.default = Vibrate_myqq_Mgr;
},{"../NativeCallback":30}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewDef;
(function (ViewDef) {
    ViewDef["None"] = "";
    ViewDef["TipsView"] = "View/TipsView.scene";
    ViewDef["GameMainView"] = "View/GameMain.scene";
    ViewDef["GameLoadingView"] = "View/GameLoading.scene";
    ViewDef["GameSettleView"] = "View/GameSettleView.scene";
    ViewDef["GameFailureView"] = "View/GameFailure.scene";
    ViewDef["GameWorkView"] = "View/GameWork.scene";
    ViewDef["SongStoreView"] = "View/SongStore.scene";
    ViewDef["ExportView"] = "View/ExportView.scene";
    //todo:添加你的界面
})(ViewDef = exports.ViewDef || (exports.ViewDef = {}));
//界面管理器
var View_myqq_Mgr = /** @class */ (function () {
    function View_myqq_Mgr() {
        this._views = {};
    }
    View_myqq_Mgr.prototype.openView = function (viewType, data, oncomplate) {
        if (this._views[viewType]) {
            var view = this._views[viewType];
            var coms = view._components;
            var viewBase = null;
            if (coms) {
                for (var index = 0; index < coms.length; index++) {
                    var element = coms[index];
                    if (element._viewBase) {
                        element.openView(data);
                        if (oncomplate) {
                            oncomplate(element);
                        }
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
    View_myqq_Mgr.prototype.closeView = function (viewType) {
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
    View_myqq_Mgr.prototype.ShowView = function (viewType) {
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
    View_myqq_Mgr.prototype.hideView = function (viewType) {
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
    View_myqq_Mgr.prototype.getView = function (viewType) {
        return this._views[viewType];
    };
    View_myqq_Mgr.prototype.showTips = function (msg) {
        this.openView(ViewDef.TipsView, msg);
    };
    View_myqq_Mgr.instance = new View_myqq_Mgr();
    return View_myqq_Mgr;
}());
exports.default = View_myqq_Mgr;
},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDef_1 = require("./Event/EventDef");
var EventMgr_1 = require("./Event/EventMgr");
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
    };
    //进入后台
    NativeCallback.onPause = function () {
        console.debug("进入后台 静音");
        Laya.SoundManager.muted = true;
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_BLUR);
    };
    //恢复
    NativeCallback.onResume = function () {
        console.debug("恢复---------");
        Laya.SoundManager.muted = false;
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_FOCUS);
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
},{"./Event/EventDef":4,"./Event/EventMgr":5}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("./aes.js");
var Aes_myqq_Tools = /** @class */ (function () {
    function Aes_myqq_Tools() {
    }
    //加密
    Aes_myqq_Tools.encrypt = function (str) {
        var key = CryptoJS.enc.Utf8.parse(Aes_myqq_Tools.KEY); // 秘钥
        var iv = CryptoJS.enc.Utf8.parse(Aes_myqq_Tools.IV); //向量iv
        var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    };
    //解密
    Aes_myqq_Tools.decrypt = function (str) {
        var key = CryptoJS.enc.Utf8.parse(Aes_myqq_Tools.KEY); // 秘钥
        var iv = CryptoJS.enc.Utf8.parse(Aes_myqq_Tools.IV); //向量iv
        var decrypted = CryptoJS.AES.decrypt(str, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        return decrypted.toString(CryptoJS.enc.Utf8);
    };
    Aes_myqq_Tools.KEY = 'b#63fFJ6AvkK3YT*';
    Aes_myqq_Tools.IV = 'J$f4DU%sNL73M&Go';
    return Aes_myqq_Tools;
}());
exports.default = Aes_myqq_Tools;
},{"./aes.js":34}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NetConfig_1 = require("./NetConfig");
var User_1 = require("../User/User");
var AesTools_1 = require("./AesTools");
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
var Http_myqq_Unit = /** @class */ (function () {
    function Http_myqq_Unit() {
    }
    Http_myqq_Unit.request = function (req) {
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
        xhr.once(Laya.Event.COMPLETE, Http_myqq_Unit, completeFunc);
        xhr.once(Laya.Event.ERROR, Http_myqq_Unit, errorFunc);
        var dataStr = JSON.stringify(req.data);
        req.data.code = User_1.default.code;
        var time = "time=" + String(Date.now());
        var header = [
            "Content-Type", "application/json",
            "state", 0,
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
    Http_myqq_Unit.login = function (onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.Login;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_myqq_Unit.request(req);
    };
    Http_myqq_Unit.saveGameData = function (gameData, onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.SaveGameData;
        req.data.gameData = gameData;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_myqq_Unit.request(req);
    };
    Http_myqq_Unit.getGameData = function (onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.GetUser;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_myqq_Unit.request(req);
    };
    /**
     * IP屏蔽方法，需要在NetConfig类中设置IpBlock的接口地址
     * onSuccess方法返回参数的范例为 Object {code: 0, msg: "准一线", time: "1571034447", data: null}
     * @static
     * @memberof HttpUnit
     */
    Http_myqq_Unit.GetIpBlock = function (onSuccess, onFail) {
        var req = new requestData();
        req.url = NetConfig_1.default.IpBlock;
        req.onSuccess = onSuccess;
        req.onFail = onFail;
        Http_myqq_Unit.request(req);
    };
    return Http_myqq_Unit;
}());
exports.default = Http_myqq_Unit;
},{"../User/User":40,"./AesTools":31,"./NetConfig":33}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Net_myqq_Config = /** @class */ (function () {
    function Net_myqq_Config() {
    }
    Net_myqq_Config.gameid = 16;
    Net_myqq_Config.serverUrl = "";
    Net_myqq_Config.Login = "";
    Net_myqq_Config.SaveGameData = "";
    Net_myqq_Config.GetUser = "r";
    /* 用来对IP地址进行屏蔽的接口地址，可以使用接口的返回值让某些广告逻辑在微信的审核地区(广州)发生变化 */
    Net_myqq_Config.IpBlock = "";
    return Net_myqq_Config;
}());
exports.default = Net_myqq_Config;
},{}],34:[function(require,module,exports){
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
},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Share_myqq_Ad = /** @class */ (function () {
    function Share_myqq_Ad() {
    }
    Share_myqq_Ad.refresh_myqq_Ad = function (complate) {
        // Share_myqq_Ad.getAdPosData((res)=>{
        //     if(1 == res.code)
        //     {
        //         console.log("获取分享广告数据成功");
        //         Share_myqq_Ad._adPosition = res.result;
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
    Share_myqq_Ad.get_myqq_ADVs = function (locationid, complate, useRandom, useLocalRandom) {
        // useRandom = null == useRandom ? Share_myqq_Ad.UseRandomAdPos : useRandom;
        // useLocalRandom =  null == useLocalRandom ? true : useRandom;
        // if(useRandom)
        // {
        //     locationid = Share_myqq_Ad.get_myqq_RandomADPosID();
        // }
        // var datas = Share_myqq_Ad._adv[locationid];
        // if(datas)
        // {
        //     for (var i = datas.length - 1; i >= 0; --i)  
        //     {
        //         var randomIndex = Math.floor(Math.random() * datas.length);
        //         var curValue = datas[i];
        //         var randomValue = datas[randomIndex];
        //         datas[randomIndex] = curValue;
        //         datas[i] = randomValue;
        //     }
        //     complate(datas)
        // }
        // else
        // {
        //     Share_myqq_Ad.getADVData(locationid,(res)=>
        //     {
        //         if(1 == res.code)
        //         {
        //             Share_myqq_Ad._adv[locationid] = res.result;
        //             datas = Share_myqq_Ad._adv[locationid];
        //             if(datas && Utilit.isIphone())
        //             {
        //                 for(var i=0;i< datas.length;++i)
        //                 {
        //                     var data = datas[i];
        //                     for(var j=0;j < Share_myqq_Ad._iphoneIgnoreAppIds.length;++j)
        //                     {
        //                         if(data.appid == Share_myqq_Ad._iphoneIgnoreAppIds[j])
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
        //                 for (var i = datas.length - 1; i >= 0; --i)  
        //                 {
        //                     var randomIndex = Math.floor(Math.random() * datas.length);
        //                     var curValue = datas[i];
        //                     var randomValue = datas[randomIndex];
        //                     datas[randomIndex] = curValue;
        //                     datas[i] = randomValue;
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
    Share_myqq_Ad.reportUserClick = function (advid) {
        // Share_myqq_Ad.reqUserClick(advid,(res)=>
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
    Share_myqq_Ad.get_myqq_RandomADPosID = function () {
        return Share_myqq_Ad.AdLocationids[Math.floor(Math.random() * Share_myqq_Ad.AdLocationids.length)];
    };
    Share_myqq_Ad.request = function (req) {
        // if (req.url.indexOf("https://") > -1 ||
        //     req.url.indexOf("http://") > -1) {
        //     req.url = req.url;
        // } else {
        //     req.url = Share_myqq_Ad.mainUrl + req.url;
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
        // xhr.once(Laya.Event.COMPLETE, Share_myqq_Ad, completeFunc);
        // xhr.once(Laya.Event.ERROR, Share_myqq_Ad, errorFunc);
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
        //             "versions", App_myqq_Config.Versions,
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
        //     var header =
        //         [
        //             "Content-Type", "application/x-www-form-urlencoded",
        //             "versions", App_myqq_Config.Versions,
        //         ]
        //     xhr.send(req.url,para,req.meth,null,header);
        // }
    };
    Share_myqq_Ad.getAdPosData = function (onSuccess, onFail) {
        // var req = new requestData();
        // req.url = Share_myqq_Ad.getAdPostion;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = App_myqq_Config.AppID;
        // req.meth = "get";
        // Share_myqq_Ad.request(req);
    };
    Share_myqq_Ad.reqUserClick = function (advid, onSuccess, onFail) {
        // var req = new requestData();
        // req.url = Share_myqq_Ad.userClick;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = App_myqq_Config.AppID;
        // req.data.uid  = User_yy.openId;
        // req.data.advid  = advid ;
        // Share_myqq_Ad.request(req);
    };
    Share_myqq_Ad.getADVData = function (locationid, onSuccess, onFail) {
        // var req = new requestData();
        // req.url = Share_myqq_Ad.getAdv;
        // req.onSuccess = onSuccess;
        // req.onFail = onFail;
        // req.data.softid = App_myqq_Config.AppID;
        // req.data.locationid = locationid;
        // req.data.preview = 0;
        // Share_myqq_Ad.request(req);
    };
    /**
         * 随机跳转的方法，会从广告列表中随机得到一个AppId并且跳转,输入的参数为概率，大小在0-1之间
         * 如果概率大于1，则自动将其除以100，所以千万注意！
         *
         * @static
         * @param {number} [rate=1]
         * @memberof ShareAd
         */
    Share_myqq_Ad.Random_myqq_Jump = function (rate) {
        if (rate === void 0) { rate = 1; }
        // console.log("随机跳转,rate：" + rate);
        // if (rate > 1) {
        //     rate = rate / 100;
        // }
        // let rd = Math.random();
        // if (rd <= rate) {
        //     var adLocationID = Share_myqq_Ad.LoopAdLocationID;
        //     var Locations = 
        //     [
        //         Share_myqq_Ad.LoopAdLocationID, 
        //         Share_myqq_Ad.InsertAdLocationID, 
        //         Share_myqq_Ad.BannerAdLocationID,
        //         Share_myqq_Ad.AniAdLocationID,
        //     ]
        //     if(Share_myqq_Ad.UseRandomAdPos)
        //     {
        //         for(var i=0;i < Share_myqq_Ad.AdLocationids.length;++i)
        //         {
        //             Locations.push(Share_myqq_Ad.AdLocationids[i]);
        //         }
        //     }
        //     adLocationID = Locations[Math.floor(Math.random() * Locations.length)]
        //     var datas = Share_myqq_Ad.get_myqq_ADVs(adLocationID, function (datas: Array<any>) {
        //         if (datas) {
        //             let rd = Math.floor(datas.length * Math.random());
        //             let data = datas[rd];
        //             console.log("跳转游戏： " + data.title);
        //             WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
        //                 console.log("跳转成功")
        //                 Share_myqq_Ad.reportUserClick(data.appid);
        //                 ALD.aldSendReportAdClickSuccess(data);
        //             }, (res) => {
        //                 console.log("跳转失败")
        //                 Event_myqq_Mgr.instance.dispatch(EventDef.AD_OnShareAdFail);
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
    Share_myqq_Ad.mainUrl = "";
    Share_myqq_Ad.getAdPostion = ""; //获取广告位列表
    Share_myqq_Ad.getAdv = ""; //获取第三方广告列表
    Share_myqq_Ad.userClick = ""; //用户点击上报
    Share_myqq_Ad.LoopAdLocationID = 125;
    Share_myqq_Ad.BannerAdLocationID = 127;
    Share_myqq_Ad.InsertAdLocationID = 126;
    Share_myqq_Ad.AniAdLocationID = 128;
    Share_myqq_Ad.UseRandomAdPos = true;
    Share_myqq_Ad.AdLocationids = [
        125, 126
    ];
    Share_myqq_Ad._adPosition = {};
    Share_myqq_Ad._adv = {};
    Share_myqq_Ad._iphoneIgnoreAppIds = [];
    return Share_myqq_Ad;
}());
exports.default = Share_myqq_Ad;
},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShareAd_1 = require("../ShareAd");
var WXAPI_1 = require("../../WXAPI");
var ALD_1 = require("../../ALD");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var AppSwitchConfig_1 = require("../../Config/AppSwitchConfig");
var Banner_myqq_AdView = /** @class */ (function (_super) {
    __extends(Banner_myqq_AdView, _super);
    function Banner_myqq_AdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.AdPosID = ShareAd_1.default.BannerAdLocationID;
        _this._data = null;
        _this._wxBanner = null;
        return _this;
    }
    Banner_myqq_AdView.prototype.onAwake = function () {
        this._displaySp = this.owner.getChildByName("Display");
        if (null == this._displaySp) {
            this._displaySp = this.owner;
        }
    };
    Banner_myqq_AdView.prototype.onEnable = function () {
        this._displaySp.on(Laya.Event.CLICK, this, this.onSpClick);
        var banner = AppSwitchConfig_1.default.getInstance().getAppSwitchData().banner;
        if (0 == banner) {
            this.refreshBannerDis();
        }
        else if (1 == banner) {
            this.refreshWXBanner();
        }
    };
    Banner_myqq_AdView.prototype.onDisable = function () {
        this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
        this.clearWXBaner();
    };
    Banner_myqq_AdView.prototype.refreshBannerDis = function () {
        var self = this;
        ShareAd_1.default.get_myqq_ADVs(this.AdPosID, function (datas) {
            if (datas && datas.length > 0) {
                var data = datas[Math.floor(Math.random() * datas.length)];
                self._displaySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                    if (!self._displaySp.destroyed) {
                        self._displaySp.width = 750;
                        self._displaySp.height = 350;
                    }
                }));
                self._data = data;
            }
        }, false);
    };
    Banner_myqq_AdView.prototype.onSpClick = function () {
        var data = this._data;
        if (data) {
            console.log("跳转游戏： " + data.title);
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
    };
    Banner_myqq_AdView.prototype.refreshWXBanner = function () {
        if (!Laya.Browser.onMiniGame || !this.owner.visible)
            return;
        this.clearWXBaner();
        var self = this;
        var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
        var sw = sysInfo.screenWidth;
        var sh = sysInfo.screenHeight;
        var pos = this._displaySp.localToGlobal(new Laya.Point(0, 0));
        var left = pos.x / Laya.stage.width * sw;
        var top = pos.y / Laya.stage.height * sh;
        var width = this.WXBannerWidth ? this.WXBannerWidth / Laya.stage.width * sw : sw;
        this._wxBanner = Laya.Browser.window["wx"].createBannerAd({
            adUnitId: WXAPI_1.default.bannerAdUnitId,
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
        this._wxBanner.onError(function (err) {
            console.log("WXBanner广告 加载失败");
            console.log(err);
            self.refreshBannerDis();
            self.clearWXBaner();
        });
        this._wxBanner.onResize(function (res) {
            console.log(self._wxBanner.style.realWidth, self._wxBanner.style.realHeight);
        });
        self._wxBanner.show();
    };
    Banner_myqq_AdView.prototype.clearWXBaner = function () {
        if (this._wxBanner) {
            this._wxBanner.destroy();
        }
        this._wxBanner = null;
    };
    return Banner_myqq_AdView;
}(Laya.Script));
exports.default = Banner_myqq_AdView;
},{"../../ALD":1,"../../Config/AppSwitchConfig":3,"../../Event/EventDef":4,"../../Event/EventMgr":5,"../../WXAPI":58,"../ShareAd":35}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShareAd_1 = require("../ShareAd");
var LoopAdBox_1 = require("./LoopAdBox");
var HorizontalLoopAdView = /** @class */ (function (_super) {
    __extends(HorizontalLoopAdView, _super);
    function HorizontalLoopAdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.AdPosID = ShareAd_1.default.LoopAdLocationID;
        _this._scrollForward = true;
        return _this;
    }
    HorizontalLoopAdView.prototype.onAwake = function () {
        this._list = this.owner.getChildByName("List");
        this._list.renderHandler = Laya.Handler.create(this, this.on_myqq_ListRender, null, false);
        this._list.hScrollBarSkin = "";
    };
    HorizontalLoopAdView.prototype.onEnable = function () {
        var _this = this;
        var self = this;
        ShareAd_1.default.get_myqq_ADVs(this.AdPosID, function (datas) {
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
    HorizontalLoopAdView.prototype.onDisable = function () {
    };
    HorizontalLoopAdView.prototype.onUpdate = function () {
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
    HorizontalLoopAdView.prototype.on_myqq_ListRender = function (cell, index) {
        var data = this._list.array[index];
        var loopAdBox = cell.getComponent(LoopAdBox_1.default);
        loopAdBox.set_myqq_Data(data);
    };
    return HorizontalLoopAdView;
}(Laya.Script));
exports.default = HorizontalLoopAdView;
},{"../ShareAd":35,"./LoopAdBox":38}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WXAPI_1 = require("../../WXAPI");
var ShareAd_1 = require("../ShareAd");
var ALD_1 = require("../../ALD");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var Loop_myqq_AdBox = /** @class */ (function (_super) {
    __extends(Loop_myqq_AdBox, _super);
    function Loop_myqq_AdBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = null;
        _this._originW = 150;
        _this._originH = 150;
        _this._fontSize = 25;
        return _this;
    }
    Loop_myqq_AdBox.prototype.onAwake = function () {
        this._displaySp = this.owner.getChildByName("Display");
        this._originW = this._displaySp.width;
        this._originH = this._displaySp.height;
        this._disText = this.owner.getChildByName("TitelText");
        this._disText.text = "";
        this._fontSize = this._disText.fontSize;
    };
    Loop_myqq_AdBox.prototype.onEnable = function () {
        this._displaySp.on(Laya.Event.CLICK, this, this.on_myqq_SpClick);
    };
    Loop_myqq_AdBox.prototype.onDisable = function () {
        this._displaySp.off(Laya.Event.CLICK, this, this.on_myqq_SpClick);
    };
    Loop_myqq_AdBox.prototype.set_myqq_Data = function (data) {
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
            //var fontSize = Math.floor((5 / num) * this._fontSize);
            //this._disText.fontSize = fontSize;
            this._disText.text = str;
            this._data = data;
        }
    };
    Loop_myqq_AdBox.prototype.on_myqq_SpClick = function () {
        var data = this._data;
        if (data) {
            console.log("跳转游戏： " + data.title);
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
    };
    return Loop_myqq_AdBox;
}(Laya.Script));
exports.default = Loop_myqq_AdBox;
},{"../../ALD":1,"../../Event/EventDef":4,"../../Event/EventMgr":5,"../../WXAPI":58,"../ShareAd":35}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShareAd_1 = require("../ShareAd");
var LoopAdBox_1 = require("./LoopAdBox");
var Loop_myqq_AdView = /** @class */ (function (_super) {
    __extends(Loop_myqq_AdView, _super);
    function Loop_myqq_AdView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.AdPosID = ShareAd_1.default.LoopAdLocationID;
        _this._scrollForward = true;
        return _this;
    }
    Loop_myqq_AdView.prototype.onAwake = function () {
        this._list = this.owner.getChildByName("List");
        this._list.renderHandler = Laya.Handler.create(this, this.on_myqq_ListRender, null, false);
        this._list.vScrollBarSkin = "";
    };
    Loop_myqq_AdView.prototype.onEnable = function () {
        var _this = this;
        var self = this;
        ShareAd_1.default.get_myqq_ADVs(this.AdPosID, function (datas) {
            if (self.owner && !_this.owner.destroyed) {
                if (datas && datas.length > 0 && datas.length < 50) {
                    _this.owner.visible = true;
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
                    _this.owner.visible = false;
                }
            }
        });
    };
    Loop_myqq_AdView.prototype.onDisable = function () {
    };
    Loop_myqq_AdView.prototype.onUpdate = function () {
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
    Loop_myqq_AdView.prototype.on_myqq_ListRender = function (cell, index) {
        var data = this._list.array[index];
        var loopAdBox = cell.getComponent(LoopAdBox_1.default);
        loopAdBox.set_myqq_Data(data);
    };
    return Loop_myqq_AdView;
}(Laya.Script));
exports.default = Loop_myqq_AdView;
},{"../ShareAd":35,"./LoopAdBox":38}],40:[function(require,module,exports){
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
        this.unlockSongs = new Array;
    }
    return UserGameData;
}());
exports.UserGameData = UserGameData;
var PassSong = /** @class */ (function () {
    function PassSong() {
        this.name = "";
        this.starLevel = 0;
        this.source = 0;
        this.completed = false;
    }
    return PassSong;
}());
exports.PassSong = PassSong;
var User_yy = /** @class */ (function (_super) {
    __extends(User_yy, _super);
    function User_yy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User_yy.getSaveData = function () {
        return JSON.stringify(User_yy._gameData);
    };
    User_yy.testInitUser = function () {
        var storageStr = localStorage.getItem("Game_Data");
        console.log("读取存储数据 str----" + storageStr);
        var data = JSON.parse(storageStr);
        if (data == null) {
            User_yy._gameData.levelNum = 1;
            User_yy._gameData.moneyNum = 60;
            User_yy._gameData.crystalNum = 0;
            User_yy._gameData.unlockSongs = new Array;
            return;
        }
        var userData = data;
        User_yy._gameData.levelNum = userData.levelNum ? userData.levelNum : 0;
        User_yy._gameData.moneyNum = userData.moneyNum ? userData.moneyNum : 0;
        User_yy._gameData.crystalNum = userData.crystalNum ? userData.crystalNum : 0;
        User_yy._gameData.unlockSongs = new Array;
        if (userData.unlockSongs != null) {
            for (var i = 0; i < userData.unlockSongs.length; i++) {
                var tmep = userData.unlockSongs[i];
                var passSong = new PassSong();
                passSong.name = tmep.name;
                passSong.source = tmep.source;
                passSong.starLevel = tmep.starLevel;
                passSong.completed = tmep.completed ? tmep.completed : false;
                User_yy._gameData.unlockSongs.push(passSong);
            }
        }
    };
    User_yy.initiUser = function (data) {
        if (data && 0 != data) {
            var userData = data.gamedata;
            //let frequency = data.frequency;
            User_yy._gameData.levelNum = userData.levelNum ? userData.levelNum : 0;
            User_yy._gameData.moneyNum = userData.moneyNum ? userData.moneyNum : 0;
            User_yy._gameData.crystalNum = userData.crystalNum ? userData.crystalNum : 0;
            User_yy._gameData.unlockSongs = new Array;
            if (userData.unlockSongs != null) {
                for (var i = 0; i < userData.unlockSongs.length; i++) {
                    var tmep = userData.unlockSongs[i];
                    var passSong = new PassSong();
                    passSong.name = tmep.name;
                    passSong.source = tmep.source;
                    passSong.starLevel = tmep.starLevel;
                    passSong.completed = tmep.completed ? tmep.completed : false;
                    User_yy._gameData.unlockSongs.push(passSong);
                }
            }
            // if (frequency != null && frequency != 0) {
            //     User_yy._gameData.moneyNum = frequency;
            // }
        }
        else {
            //todo：处理没有获取到玩家数据的情况
            User_yy._gameData.moneyNum = 60;
            User_yy._gameData.levelNum = 0;
            User_yy._gameData.crystalNum = 0;
            User_yy._gameData.unlockSongs = new Array;
        }
    };
    User_yy.setLeveNum = function (levelNum) {
        User_yy._gameData.levelNum = levelNum;
    };
    User_yy.getLeveNum = function () {
        return User_yy._gameData.levelNum;
    };
    User_yy.addMoney = function (add) {
        add = Math.ceil(add);
        var last = User_yy._gameData.moneyNum;
        User_yy._gameData.moneyNum += add;
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnUserMoneyChange, {
            curr: User_yy._gameData.moneyNum,
            last: last
        });
    };
    User_yy.subMoney = function (sub) {
        sub = Math.ceil(sub);
        var last = User_yy._gameData.moneyNum;
        User_yy._gameData.moneyNum -= sub;
        if (User_yy._gameData.moneyNum < 0) {
            User_yy._gameData.moneyNum = 0;
        }
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnUserMoneyChange, {
            curr: User_yy._gameData.moneyNum,
            last: last
        });
    };
    User_yy.getMoney = function () {
        return User_yy._gameData.moneyNum;
    };
    User_yy.addCrystal = function (add) {
        add = Math.ceil(add);
        var last = User_yy._gameData.crystalNum;
        User_yy._gameData.crystalNum += add;
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnUserCrystalChange, {
            curr: User_yy._gameData.crystalNum,
            last: last
        });
    };
    User_yy.subCrystal = function (sub) {
        sub = Math.ceil(sub);
        var last = User_yy._gameData.crystalNum;
        User_yy._gameData.crystalNum -= sub;
        if (User_yy._gameData.crystalNum < 0) {
            User_yy._gameData.crystalNum = 0;
        }
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnUserCrystalChange, {
            curr: User_yy._gameData.crystalNum,
            last: last
        });
    };
    User_yy.getCrystal = function () {
        return User_yy._gameData.crystalNum;
    };
    // --------------------------------------------- //
    User_yy.getPassSong = function () {
        return User_yy._gameData.unlockSongs;
    };
    User_yy.AddUnlockSong = function (name, starLevel, source) {
        if (starLevel === void 0) { starLevel = 0; }
        if (source === void 0) { source = 0; }
        for (var i = 0; i < User_yy._gameData.unlockSongs.length; i++) {
            var song = User_yy._gameData.unlockSongs[i];
            if (song.name == name) {
                return;
            }
        }
        var curSong = new PassSong();
        curSong.name = name;
        User_yy._gameData.unlockSongs.push(curSong);
    };
    User_yy.IncludetSong = function (name) {
        for (var i = 0; i < User_yy._gameData.unlockSongs.length; i++) {
            var song = User_yy._gameData.unlockSongs[i];
            if (song.name == name) {
                return true;
            }
        }
        return false;
    };
    User_yy.code = "";
    User_yy.openId = "";
    User_yy.token = null;
    User_yy.nickName = "";
    User_yy.gender = 0;
    User_yy.isLogin = false;
    User_yy._gameData = new UserGameData();
    return User_yy;
}(Laya.Script));
exports.default = User_yy;
},{"../Event/EventDef":4,"../Event/EventMgr":5}],41:[function(require,module,exports){
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
    Utilit.FindChild = function (node, name) {
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
    Utilit.GetRandomNumber = function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
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
},{}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SoundMgr_1 = require("../Mgr/SoundMgr");
var Button_myqq_Anim = /** @class */ (function (_super) {
    __extends(Button_myqq_Anim, _super);
    function Button_myqq_Anim() {
        var _this = _super.call(this) || this;
        _this.use_myqq_Sound = true;
        return _this;
    }
    Button_myqq_Anim.prototype.onAwake = function () {
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.on_myqq_Down);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.on_myqq_Up);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.on_myqq_Up);
    };
    Button_myqq_Anim.prototype.onDisable = function () {
        this.owner.offAll();
        Laya.Tween.clearAll(this);
    };
    Button_myqq_Anim.prototype.on_myqq_Down = function () {
        Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
        if (this.use_myqq_Sound) {
            SoundMgr_1.default.instance.playSound("anniu");
        }
    };
    Button_myqq_Anim.prototype.on_myqq_Up = function () {
        Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
    };
    return Button_myqq_Anim;
}(Laya.Script));
exports.default = Button_myqq_Anim;
},{"../Mgr/SoundMgr":27}],43:[function(require,module,exports){
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
            this._bannerAd.clearWXBaner();
        }
    };
    return UniversalBottomZone;
}(Laya.Script));
exports.default = UniversalBottomZone;
},{"../../ShareAd/View/BannerAdView":36}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utilit_1 = require("../../../Utilit");
var GameConst_1 = require("../../../Game/GameConst");
var SoundManager_1 = require("../../../Game/SoundManager");
var SongDisCell = /** @class */ (function (_super) {
    __extends(SongDisCell, _super);
    function SongDisCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.newFlag = null;
        _this.hotFlag = null;
        _this.songName = null;
        _this.selectFlag = null;
        _this.background = null;
        _this.starLevels = null;
        _this.songData = null;
        _this.clickHandler = null;
        _this.timer = 0;
        return _this;
    }
    SongDisCell.prototype.onAwake = function () {
        this.newFlag = this.owner.getChildByName("NewFlag");
        this.hotFlag = this.owner.getChildByName("HotFlag");
        this.songName = Utilit_1.default.FindChild(this.owner, "SongName/Label");
        this.selectFlag = this.owner.getChildByName("SelectFlag");
        this.background = this.owner.getChildByName("Background");
        this.starLevels = this.owner.getChildByName("StarLevels");
        this.background.on(Laya.Event.CLICK, this, this.OnClickSong);
    };
    SongDisCell.prototype.Reset = function () {
        if (this.clickHandler)
            this.clickHandler.recover();
    };
    SongDisCell.prototype.UpdateView = function (index, song) {
        this.Reset();
        if (song == null) {
            return;
        }
        this.songData = song;
        this.songName.text = "No." + (index + 1) + " " + song.songName;
        this.hotFlag.visible = false;
        this.newFlag.visible = false;
        this.background.loadImage(GameConst_1.default.GetRandomSongPreviewPng);
        var previewPngs = song.previewPngs;
        if (previewPngs.length != 0) {
            var imagePath = previewPngs[Utilit_1.default.GetRandomNumber(0, previewPngs.length - 1)];
            this.background.loadImage(imagePath);
        }
        var passSong = SoundManager_1.default.Instance.GetSongRecord(song.name);
        var level = passSong ? passSong.starLevel : 0;
        this.SetStarLevel(level);
    };
    SongDisCell.prototype.ActiveSong = function (isActive) {
        if (this.songData == null) {
            return;
        }
        this.selectFlag.visible = isActive;
        Laya.Tween.clearAll(this.selectFlag);
        Laya.Tween.clearAll(this.background);
        if (isActive) {
            this.selectFlag.alpha = 0;
            Laya.Tween.to(this.selectFlag, { alpha: 1 }, 0.3 * 1000);
            Laya.Tween.to(this.background, { rotation: this.background.rotation + 360 * 10 }, 120 * 1000);
        }
        this.AutoTextScroll(this.songName.textField, isActive);
    };
    SongDisCell.prototype.SetStarLevel = function (level) {
        for (var i = 1; i <= 3; i++) {
            var star = this.starLevels.getChildByName("Star" + i);
            var active = star.getChildByName("Active");
            active.visible = i <= level;
        }
    };
    SongDisCell.prototype.AutoTextScroll = function (text, isEnable, speed) {
        if (speed === void 0) { speed = 5; }
        var width = text.width;
        var TestWidth = text.textWidth;
        var offset = TestWidth - width;
        if (isEnable) {
            this.timer = 0;
            Laya.timer.frameLoop(1, this, this.TextScroll, [text, width, offset, speed]);
        }
        else {
            text.scrollX = 0;
            Laya.timer.clear(this, this.TextScroll);
        }
    };
    SongDisCell.prototype.TextScroll = function (text, width, offset, speed) {
        text.scrollX = Math.sin(this.timer) * offset;
        this.timer += speed * (Laya.timer.delta / 10000);
    };
    SongDisCell.prototype.OnClickSong = function () {
        if (this.clickHandler) {
            this.clickHandler.runWith(this.songData);
        }
    };
    return SongDisCell;
}(Laya.Script));
exports.default = SongDisCell;
},{"../../../Game/GameConst":13,"../../../Game/SoundManager":19,"../../../Utilit":41}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utilit_1 = require("../../../Utilit");
var SoundManager_1 = require("../../../Game/SoundManager");
var SongStoreCell = /** @class */ (function (_super) {
    __extends(SongStoreCell, _super);
    function SongStoreCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playHander = null;
        _this.unlockHander = null;
        return _this;
    }
    SongStoreCell.prototype.onAwake = function () {
        this.songName = this.owner.getChildByName("SongName");
        this.playButton = this.owner.getChildByName("PlayButton");
        this.unlockAdButton = Utilit_1.default.FindChild(this.owner, "Operation/AdType");
        this.unlocakPowerButton = Utilit_1.default.FindChild(this.owner, "Operation/PowerType");
        this.record = Utilit_1.default.FindChild(this.owner, "Operation/Played");
        this.selectFlag = Utilit_1.default.FindChild(this.owner, "Background/Selected");
        this.starLevels = this.owner.getChildByName("StarLevels");
        this.freeUnlockButton = Utilit_1.default.FindChild(this.owner, "Operation/Free");
    };
    SongStoreCell.prototype.UpdateView = function (song) {
        this.songData = song;
        this.songName.text = song.name;
        var chargeType = song.chargeType;
        var isFreee = SoundManager_1.default.Instance.CheckSongIsFree(song);
        var isUnlock = SoundManager_1.default.Instance.CheckSongUnlocked(song.name);
        this.record.visible = isUnlock;
        this.freeUnlockButton.visible = isFreee && !isUnlock;
        this.unlockAdButton.visible = !isFreee && !isUnlock && chargeType == 2;
        this.unlocakPowerButton.visible = !isFreee && !isUnlock && chargeType == 1;
        if (isUnlock) {
            var passSong = SoundManager_1.default.Instance.GetSongRecord(song.name);
            this.SetStarLevel(passSong.starLevel);
        }
        else {
            this.SetStarLevel(0);
        }
        if (this.playHander) {
            this.playHander.recover();
        }
        if (this.unlockHander) {
            this.unlockHander.recover();
        }
    };
    SongStoreCell.prototype.SetStarLevel = function (level) {
        for (var i = 1; i <= 3; i++) {
            var star = this.starLevels.getChildByName("Star" + i);
            var active = star.getChildByName("Active");
            active.visible = i <= level;
        }
    };
    SongStoreCell.prototype.ActiveSong = function (isActive) {
        this.selectFlag.visible = isActive;
    };
    return SongStoreCell;
}(Laya.Script));
exports.default = SongStoreCell;
},{"../../../Game/SoundManager":19,"../../../Utilit":41}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CenterList = /** @class */ (function (_super) {
    __extends(CenterList, _super);
    function CenterList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._list = null;
        _this._cellWidth = 20;
        _this._inDrag = false;
        _this._startOffset = 0;
        _this._hasChange = false;
        _this._centerIndex = -1;
        _this._targetCenterIndex = 0;
        /** @prop {name:sensitivity,tips:"切换页面的灵敏度",type:sNumber,min:0,max:1,default=0.5,} */
        _this.sensitivity = 0.5;
        /** @prop {name:rollRatio,tips:"滑动衰变 越小衰变越快",type:sNumber,min:0.3,max:0.96,default=0.96,}*/
        _this.rollRatio = 0.95;
        /** @prop {name:moveSpeed,tips:"回正中心时的移动速度",type:Number,default=10,} */
        _this.moveSpeed = 10;
        /** @prop {name:enabledMove,tips:"是否可以连续滑动",type:Bool,default=false}*/
        _this.enabledMove = false;
        _this.cellStateChange = null;
        _this.centerCellChange = null;
        return _this;
    }
    Object.defineProperty(CenterList.prototype, "isVertical", {
        get: function () { return this.listBar.isVertical; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CenterList.prototype, "listBar", {
        get: function () { return this._list.scrollBar; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CenterList.prototype, "CenterIndex", {
        get: function () { return this._centerIndex; },
        enumerable: true,
        configurable: true
    });
    CenterList.prototype.onAwake = function () {
        this._list = this.owner;
        this._list.on(Laya.Event.RENDER, this, this.onListRenderHandler);
        this._list.on(Laya.Event.MOUSE_DOWN, this, this.onListMouseDown);
        this._list.on(Laya.Event.MOUSE_UP, this, this.onListMouseUp);
        this._list.on(Laya.Event.MOUSE_OUT, this, this.onListMouseUp);
        this.changeCells();
    };
    CenterList.prototype.onEnable = function () {
        var _this = this;
        Laya.timer.callLater(this, function () {
            _this.UpdateCenterCell(_this.AuteGetCenterIndex());
        });
    };
    CenterList.prototype.onListRenderHandler = function (cell, index) {
        this.changeCells();
        this.UpdateChildState(cell);
    };
    CenterList.prototype.changeCells = function () {
        var cell = this._list.cells[0];
        var cellWidth = (cell.width + this._list.spaceX) || 1;
        var cellHeight = (cell.height + this._list.spaceY) || 1;
        this._cellWidth = this.isVertical ? cellHeight : cellWidth;
        //this.listBar.rollRatio = this.rollRatio;
        this._targetCenterIndex = this.GetCenterTargetIndex(this.listBar.value);
    };
    CenterList.prototype.onListMouseDown = function () {
        this._inDrag = true;
        this._startOffset = this.listBar.value;
        this._targetCenterIndex = this.GetCenterTargetIndex(this._startOffset);
        Laya.timer.frameLoop(1, this, this.onListCenterLoop, null, true);
    };
    CenterList.prototype.onListMouseUp = function () {
        this._inDrag = false;
        var offset = this.listBar.value;
        offset += (offset - this._startOffset) * this.sensitivity;
        this._targetCenterIndex = this.GetCenterTargetIndex(offset);
        if (Math.abs(offset) > 1) {
            this._hasChange = true;
        }
        if (!this.enabledMove) {
            this.StopListMove();
        }
    };
    CenterList.prototype.UpdateChildState = function (cell) {
        cell.scale(1, 1); //归零矩阵
        var orgPoint = new Laya.Point(0, 0);
        var globalPoint = cell.localToGlobal(orgPoint, false, this._list);
        var distance = 0;
        if (this.isVertical) {
            distance = globalPoint.distance(globalPoint.x, 0);
        }
        else {
            distance = globalPoint.distance(0, globalPoint.y);
        }
        var scale = 1 - Math.min(1, (Math.abs(distance) / this._list.width));
        if (this.cellStateChange) {
            this.cellStateChange.runWith([cell, scale]);
        }
    };
    CenterList.prototype.GetCenterTargetIndex = function (offset) {
        var index = Math.floor(offset / this._cellWidth);
        if (index >= this._list.length) {
            return index;
        }
        var curOffset = Math.abs(offset - index * this._cellWidth);
        var nextOffset = Math.abs(offset - (index + 1) * this._cellWidth);
        if (curOffset > nextOffset) {
            index++;
        }
        return index;
    };
    CenterList.prototype.AuteGetCenterIndex = function () {
        if (!this.enabledMove) {
            return this._targetCenterIndex;
        }
        return this.GetCenterTargetIndex(this.listBar.value);
    };
    CenterList.prototype.StopListMove = function () {
        this._list.stopDrag();
        this.listBar.stopScroll();
        this.listBar.startTweenMoveForce(0);
    };
    CenterList.prototype.onListCenterLoop = function () {
        var cells = this._list.cells;
        for (var i = 0; i < cells.length; i++) {
            this.UpdateChildState(cells[i]);
        }
        var lastOffest = this.listBar.lastOffset;
        var targetIndex = this.AuteGetCenterIndex();
        var targetOffset = targetIndex * this._cellWidth;
        if (!this._inDrag && this._hasChange == true && Math.abs(lastOffest) < Math.sqrt(this.moveSpeed)) {
            var value = this.listBar.value;
            value = this.Lerp(value, targetOffset, this.moveSpeed * 1 / 60);
            if (Math.abs(targetOffset - value) < 2) {
                this._hasChange = false;
                this.StopListMove();
                this.listBar.value = targetOffset;
                this.UpdateCenterCell(targetIndex);
                this._targetCenterIndex = targetIndex;
                Laya.timer.clear(this, this.onListCenterLoop);
                return;
            }
            this.listBar.value = value;
        }
    };
    CenterList.prototype.UpdateCenterCell = function (centerIndex) {
        if (this._centerIndex == centerIndex) {
            return;
        }
        this._centerIndex = centerIndex;
        var cell = this._list.getCell(this._centerIndex);
        if (this.centerCellChange) {
            this.centerCellChange.runWith([cell, this._centerIndex]);
        }
    };
    CenterList.prototype.MoveTo = function (index) {
        var _this = this;
        if (index > this._list.array.length - 1) {
            return;
        }
        this._targetCenterIndex = index;
        this._list.scrollTo(index);
        Laya.timer.frameOnce(5, this, function () {
            _this.UpdateCenterCell(index);
            for (var i = 0; i < _this._list.cells.length; i++) {
                _this.UpdateChildState(_this._list.cells[i]);
            }
        });
    };
    CenterList.prototype.Lerp = function (num1, num2, t) { return num1 + t * (num2 - num1); };
    return CenterList;
}(Laya.Script));
exports.default = CenterList;
},{}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var ExportView = /** @class */ (function (_super) {
    __extends(ExportView, _super);
    function ExportView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExportView.prototype.onAwake = function () {
        this.backButton = this.owner.getChildByName("BackButton");
        this.backButton.on(Laya.Event.CLICK, this, this.OnClickBack);
    };
    ExportView.prototype.OnClickBack = function () {
        var self = this;
        ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.GameMainView, null, function () {
            self.closeView();
        });
    };
    return ExportView;
}(ViewBase_1.default));
exports.default = ExportView;
},{"../../Mgr/ViewMgr":29,"../ViewBase":57}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var GameController_1 = require("../../Game/GameController");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var NativeCallback_1 = require("../../NativeCallback");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var GameFailureView = /** @class */ (function (_super) {
    __extends(GameFailureView, _super);
    function GameFailureView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameFailureView.prototype.onAwake = function () {
        this.skipBtn = this.owner.getChildByName("SkipBtn");
        this.resurgenceBtn = this.owner.getChildByName("ResurgenceBtn");
        this.skipBtn.on(Laya.Event.CLICK, this, this.onClickSkip);
        this.resurgenceBtn.on(Laya.Event.CLICK, this, this.onClickResurgence);
    };
    GameFailureView.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    GameFailureView.prototype.onClickSkip = function () {
        console.log("跳过激励视频复活");
        this.closeView();
        GameController_1.default.Instance.GameOver();
    };
    GameFailureView.prototype.onRewardVidewoFail = function () {
        ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.TipsView, "Video playback failed. Resurrection failed");
        this.closeView();
        GameController_1.default.Instance.GameOver();
    };
    GameFailureView.prototype.onRewardVidewoSuccess = function () {
        this.closeView();
        GameController_1.default.Instance.ResurrectionGame();
    };
    GameFailureView.prototype.onClickResurgence = function () {
        console.log("激励视频复活准备");
        // if (true) {
        //     View_myqq_Mgr.instance.openView(ViewDef.TipsView, "抱歉当前暂时无法复活。。。");
        //     return;
        // }
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback_1.default.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
        }
        else {
            this.closeView();
            GameController_1.default.Instance.ResurrectionGame();
        }
        // GameController.Instance.OpenRewardedVideo(Laya.Handler.create(this, (completed) => {
        //     if (!completed) {
        //         View_myqq_Mgr.instance.showTips("观看完整视频才能复活");
        //         return;
        //     }
        //     this.closeView();
        //     GameController.Instance.ResurrectionGame();
        // }));
    };
    GameFailureView.prototype.onDisable = function () {
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    return GameFailureView;
}(ViewBase_1.default));
exports.default = GameFailureView;
},{"../../Event/EventDef":4,"../../Event/EventMgr":5,"../../Game/GameController":14,"../../Mgr/ViewMgr":29,"../../NativeCallback":30,"../ViewBase":57}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextureProcessBar_1 = require("../TextureProcessBar");
var ViewBase_1 = require("../ViewBase");
var GameController_1 = require("../../Game/GameController");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var GameLoadingView = /** @class */ (function (_super) {
    __extends(GameLoadingView, _super);
    function GameLoadingView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curLoadSongName = null;
        _this.completed = null;
        _this.processBar = null;
        return _this;
    }
    GameLoadingView.prototype.onAwake = function () {
        this.processBar = this.owner.getChildByName("ProcessBar").getComponent(TextureProcessBar_1.default);
    };
    GameLoadingView.prototype.show = function () {
        this.processBar.setValue(0, 0);
        this.curLoadSongName = this._data;
        this.LoadSong();
    };
    GameLoadingView.prototype.LoadSong = function () {
        var _this = this;
        Laya.timer.clearAll(this);
        GameController_1.default.Instance.GameReady(this.curLoadSongName, Laya.Handler.create(this, function (succeed) {
            console.log("Song Load Succeed");
        }), Laya.Handler.create(this, function (process) {
            console.log("Process:" + process);
            _this.processBar.setValue(process);
        }));
        this.completed = Laya.Handler.create(this, function () {
            ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.GameWorkView, null, function () {
                _this.closeView();
            });
        });
        Laya.timer.frameLoop(20, this, function () {
            if (_this.processBar.CurrentValue != 1)
                return;
            //记载完成
            if (_this.completed != null) {
                _this.completed.run();
                _this.ClearHander();
            }
        });
    };
    GameLoadingView.prototype.ClearHander = function () {
        Laya.timer.clearAll(this);
        if (this.completed != null) {
            this.completed.recover();
            this.completed = null;
        }
    };
    GameLoadingView.prototype.onDisable = function () {
        this.ClearHander();
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);
    };
    return GameLoadingView;
}(ViewBase_1.default));
exports.default = GameLoadingView;
},{"../../Game/GameController":14,"../../Mgr/ViewMgr":29,"../TextureProcessBar":55,"../ViewBase":57}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var ViewBase_1 = require("../ViewBase");
var Version_1 = require("../../Game/Version");
var CenterList_1 = require("./CenterList");
var Utilit_1 = require("../../Utilit");
var User_1 = require("../../User/User");
var WXAPI_1 = require("../../WXAPI");
var SoundManager_1 = require("../../Game/SoundManager");
var SongDisCell_1 = require("./CellView/SongDisCell");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var NativeCallback_1 = require("../../NativeCallback");
var GameMainView = /** @class */ (function (_super) {
    __extends(GameMainView, _super);
    function GameMainView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameMainView.prototype.onAwake = function () {
        this.songList = this.owner.getChildByName("SongList");
        this.centerList = this.songList.getComponent(CenterList_1.default);
        this.playButton = this.owner.getChildByName("PlayButton");
        this.shardButton = this.owner.getChildByName("ShareButton");
        this.rankButton = this.owner.getChildByName("RankButton");
        this.storeButton = this.owner.getChildByName("SongStore");
        this.NewSongFlag = this.storeButton.getChildByName("NewSong");
        this.shardButton.visible = false;
        this.rankButton.visible = false;
        this.physicalValues = Utilit_1.default.FindChild(this.owner, "PhysicalValue/Label");
        this.physicals = this.playButton.getChildByName("Box");
        this.powerFlag = this.playButton.getChildByName("Power");
        this.videoFlag = this.playButton.getChildByName("Video");
        this.noPhysical = this.playButton.getChildByName("NoPhysical");
        this.castLabel = this.powerFlag.getChildByName("Label");
        this.songList.hScrollBarSkin = "";
        this.songList.selectEnable = false;
        this.songList.elasticEnabled = true;
        this.songList.renderHandler = Laya.Handler.create(this, this.OnRenderSongList, null, false);
        this.centerList.cellStateChange = Laya.Handler.create(this, this.OnCellStateChange, null, false);
        this.centerList.centerCellChange = Laya.Handler.create(this, this.OnCenterChange, null, false);
        this.playButton.on(Laya.Event.CLICK, this, this.OnClickPlayButton);
        this.shardButton.on(Laya.Event.CLICK, this, this.OnClickShareButton);
        this.storeButton.on(Laya.Event.CLICK, this, this.OnClickStoreButton);
        this.rankButton.on(Laya.Event.CLICK, this, this.OnClickRankButton);
    };
    GameMainView.prototype.onEnable = function () {
        console.log(Version_1.default.songs.length);
        this.songList.array = Version_1.default.songs;
        this.physicalValues.text = User_1.default.getMoney().toString();
        var index = SoundManager_1.default.Instance.GetLastPlaySongIndex();
        this.centerList.MoveTo(index);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_OnUserMoneyChange, this, this.OnMoneyChange);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
        var song = Version_1.default.songs[index];
        var chargeType = song.chargeType;
        var moneyEnough = SoundManager_1.default.Instance.CanPlayOne();
        if (!moneyEnough) {
            this.noPhysical.visible = true;
            this.videoFlag.visible = true;
            this.powerFlag.visible = false;
        }
        else {
            this.noPhysical.visible = false;
            this.videoFlag.visible = chargeType == Version_1.ChargeType.Video;
            this.powerFlag.visible = (chargeType == Version_1.ChargeType.Power) || (chargeType == Version_1.ChargeType.Free);
        }
    };
    GameMainView.prototype.onDisable = function () {
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_OnUserMoneyChange, this, this.OnMoneyChange);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    GameMainView.prototype.onRewardVidewoFail = function () {
        if (NativeCallback_1.default.NowVideoType == "ClickPlay") {
            this.playButton.mouseEnabled = true;
        }
        ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.TipsView, "Video playback failed. can't enter game");
    };
    GameMainView.prototype.onRewardVidewoSuccess = function () {
        var songs = Version_1.default.songs;
        if (songs == null || songs.length == 0) {
            ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.TipsView, "The library is empty and is being expedited ... ...");
            return;
        }
        var playSong = songs[this.centerList.CenterIndex];
        if (NativeCallback_1.default.NowVideoType == "ClickSong" && this.clickSong != null) {
            playSong = this.clickSong;
        }
        this.PlaySong(playSong);
        Laya.timer.clearAll(this);
        this.playButton.mouseEnabled = true;
        return;
    };
    GameMainView.prototype.OnClickPlayButton = function () {
        var _this = this;
        var songs = Version_1.default.songs;
        if (songs == null || songs.length == 0) {
            ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.TipsView, "The library is empty and is being expedited ... ...");
            return;
        }
        //手机平台钱不足 看广告
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            if (!SoundManager_1.default.Instance.CanPlayOne()) {
                NativeCallback_1.default.NowVideoType = "ClickPlay";
                NativeCallback_1.default.CallNativeFunc("showRewardVideo");
                Laya.SoundManager.muted = true;
                this.playButton.mouseEnabled = false;
                return;
            }
        }
        var playSong = songs[this.centerList.CenterIndex];
        if (!SoundManager_1.default.Instance.CanPlayOne()) {
            this.PlaySong(playSong);
            Laya.timer.clearAll(this);
            this.playButton.mouseEnabled = false;
            Laya.timer.once(1000, this, function () { _this.playButton.mouseEnabled = true; });
            return;
        }
        this.playButton.mouseEnabled = false;
        Laya.timer.clearAll(this);
        Laya.timer.once(1000, this, function () {
            _this.playButton.mouseEnabled = true;
            _this.PlaySong(playSong);
        });
        this.physicalValues.text = (User_1.default.getMoney() - SoundManager_1.default.Instance.GetSongCastMoney(playSong)).toString();
        var logo = Utilit_1.default.FindChild(this.playButton, "Power/Logo"); //this.playButton.getChildByName("Logo") as Laya.UIComponent;
        var startPos = this.physicalValues.parent.localToGlobal(new Laya.Point());
        var endPos = logo.localToGlobal(new Laya.Point());
        this.ShowPhysicalAnim(this.physicals, logo, startPos, endPos, 300);
    };
    GameMainView.prototype.ShowPhysicalAnim = function (physicals, logo, startPos, endPos, offset) {
        var _this = this;
        startPos = physicals.globalToLocal(startPos);
        endPos = physicals.globalToLocal(endPos);
        var scaleChange = function () {
            Laya.Tween.clearAll(logo);
            logo.scale(1, 1);
            Laya.Tween.from(logo, { scaleX: 1.4, scaleY: 1.4 }, 0.2 * 1000, Laya.Ease.backOut);
        };
        var _loop_1 = function (i) {
            var item = physicals._children[i];
            item.x = startPos.x;
            item.y = startPos.y;
            item.visible = true;
            Laya.Tween.clearAll(this_1);
            Laya.Tween.to(item, { x: startPos.x + Utilit_1.default.GetRandomNumber(0, offset), y: startPos.y + Utilit_1.default.GetRandomNumber(0, offset) }, 0.15 * 1000, null, Laya.Handler.create(this_1, function () {
                Laya.Tween.to(item, { x: endPos.x, y: endPos.y }, (0.2 + Math.random() * 0.3) * 1000, null, Laya.Handler.create(_this, function () {
                    item.visible = false;
                    scaleChange.call(_this);
                }));
            }));
        };
        var this_1 = this;
        for (var i = 0; i < physicals._children.length; i++) {
            _loop_1(i);
        }
    };
    GameMainView.prototype.OnClickShareButton = function () {
        var self = this;
        WXAPI_1.default.share(function (isCompleted) {
            console.log(isCompleted ? "分享成功" : "用户取消");
        }, "魔音球球， 快一起来玩呀！", "");
    };
    GameMainView.prototype.OnClickRankButton = function () {
        ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.TipsView, "功能正在完善中。。。");
    };
    GameMainView.prototype.OnClickStoreButton = function () {
        var self = this;
        ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.SongStoreView, this.centerList.CenterIndex, function () {
            self.closeView();
        });
    };
    GameMainView.prototype.OnRenderSongList = function (cell, index) {
        var song = this.songList.array[index];
        var songCell = cell.getComponent(SongDisCell_1.default);
        songCell.UpdateView(index, song);
        songCell.clickHandler = Laya.Handler.create(this, this.OnClickSong, null, false);
    };
    GameMainView.prototype.OnCenterChange = function (centerCell, centerIndex) {
        var cells = this.songList.cells;
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            var songCell = cells[i].getComponent(SongDisCell_1.default);
            var active = cell == centerCell;
            songCell.ActiveSong(active);
        }
        var song = this.songList.array[centerIndex];
        SoundManager_1.default.Instance.AuditionSong(song);
        this.castLabel.text = "×" + SoundManager_1.default.Instance.GetSongCastMoney(song);
    };
    GameMainView.prototype.OnClickSong = function (song) {
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            if (!SoundManager_1.default.Instance.CanPlayOne()) {
                NativeCallback_1.default.NowVideoType = "ClickSong";
                NativeCallback_1.default.CallNativeFunc("showRewardVideo");
                Laya.SoundManager.muted = true;
                this.clickSong = song;
                return;
            }
        }
        this.PlaySong(song);
    };
    GameMainView.prototype.PlaySong = function (song) {
        var _this = this;
        SoundManager_1.default.Instance.PlaySong(song, this, function () {
            _this.closeView();
        });
    };
    GameMainView.prototype.OnCellStateChange = function (cell, scale) {
        var startScele = 0.6;
        var maxScale = 1;
        var boxScale = Math.min(maxScale, (0.6 + 0.4 * scale));
        cell.scale(boxScale, boxScale);
    };
    GameMainView.prototype.OnMoneyChange = function (data) {
        var currMoney = data.curr;
        this.physicalValues.text = currMoney.toString();
    };
    return GameMainView;
}(ViewBase_1.default));
exports.default = GameMainView;
},{"../../Event/EventDef":4,"../../Event/EventMgr":5,"../../Game/SoundManager":19,"../../Game/Version":23,"../../Mgr/ViewMgr":29,"../../NativeCallback":30,"../../User/User":40,"../../Utilit":41,"../../WXAPI":58,"../ViewBase":57,"./CellView/SongDisCell":44,"./CenterList":46}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var GameController_1 = require("../../Game/GameController");
var Utilit_1 = require("../../Utilit");
var SoundManager_1 = require("../../Game/SoundManager");
var User_1 = require("../../User/User");
var EventDef_1 = require("../../Event/EventDef");
var NativeCallback_1 = require("../../NativeCallback");
var EventMgr_1 = require("../../Event/EventMgr");
var GameSettleView = /** @class */ (function (_super) {
    __extends(GameSettleView, _super);
    function GameSettleView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._songName = null;
        _this._songSource = null;
        _this._energy = null;
        _this._energyLabel = null;
        _this._physicalBox = null;
        _this._physicalValue = null;
        _this._skipButton = null;
        _this._adMultipleNum = null;
        _this._adReceiveButton = null;
        _this._freeReceiveButton = null;
        _this._currentPassSong = null;
        return _this;
    }
    GameSettleView.prototype.onAwake = function () {
        this._energy = this.owner.getChildByName("Energy");
        this._energyLabel = this._energy.getChildByName("Label");
        this._stars = Utilit_1.default.FindChild(this.owner, "StartBox/Stars");
        this._songName = Utilit_1.default.FindChild(this.owner, "SongName/Label");
        this._songSource = Utilit_1.default.FindChild(this.owner, "Source/Label");
        this._skipButton = this.owner.getChildByName("SkipBtn");
        this._adReceiveButton = this.owner.getChildByName("AdResurgenceBtn");
        this._adMultipleNum = this.owner.getChildByName("Label");
        this._freeReceiveButton = this.owner.getChildByName("FreeResurgenceBtn");
        this._physicalBox = Utilit_1.default.FindChild(this.owner, "PhysicalValue/Box");
        this._physicalValue = Utilit_1.default.FindChild(this.owner, "PhysicalValue/Label");
        this._skipButton.on(Laya.Event.CLICK, this, this.onClickFreeReceive);
        this._freeReceiveButton.on(Laya.Event.CLICK, this, this.onClickFreeReceive);
        this._adReceiveButton.on(Laya.Event.CLICK, this, this.onClickAdReceive);
    };
    GameSettleView.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.InsertVideoEnd, this, this.onInsertVideoEnd);
    };
    GameSettleView.prototype.onShow = function () {
        var win = this._data;
        var passSong = GameController_1.default.Instance.GetCurrentSongRecord();
        var songName = passSong.name;
        var starLevel = passSong.starLevel; //GameController.Instance.startLevel;
        var source = passSong.source;
        this._currentPassSong = passSong;
        this._songName.text = songName;
        this._songSource.text = source.toString();
        this._physicalValue.text = User_1.default.getMoney().toString();
        this.SetStar(starLevel);
        this._energyLabel.value = SoundManager_1.default.Instance.GetSongAwards(win, starLevel).toString();
        ;
        this._adReceiveButton.visible = win;
        this._freeReceiveButton.visible = !win;
        //this._skipButton.visible = false;
    };
    GameSettleView.prototype.SetStar = function (level) {
        var _this = this;
        this._stars._children.forEach(function (star) {
            star.visible = false;
        });
        Laya.timer.once(0.3 * 1000, this, function () {
            var _loop_1 = function (i) {
                var star = _this._stars.getChildByName("Star" + i);
                if (i <= level) {
                    var delayTime = (i - 1) * 0.2 * 1000;
                    Laya.timer.once(delayTime, _this, function () {
                        star.visible = true;
                        star.scale(1, 1);
                        Laya.Tween.from(star.alpha, { alpha: 0.01 }, 0.1 * 1000);
                        Laya.Tween.from(star, { scaleX: 4, scaleY: 4 }, 0.3 * 1000, Laya.Ease.backOut);
                    });
                }
            };
            for (var i = 1; i <= 3; i++) {
                _loop_1(i);
            }
        });
    };
    GameSettleView.prototype.onRewardVidewoFail = function () {
        ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.TipsView, "Get reward after watch the video");
    };
    GameSettleView.prototype.onRewardVidewoSuccess = function () {
        var num = SoundManager_1.default.Instance.SetAdSongAwards(this._currentPassSong.starLevel);
        this._physicalValue.text = num.toString();
        this.ShowGetPowerEffect(this._adReceiveButton);
    };
    GameSettleView.prototype.onClickAdReceive = function (e) {
        console.log("倍数领取奖励");
        // let self = this;
        // let loockBack = (completed) => {
        //     if (!completed) { 
        //         View_myqq_Mgr.instance.openView(ViewDef.TipsView, "看完视频才能领取翻倍奖励哦。。。");
        //         return;
        //     }
        //     let num = SoundManager.Instance.SetAdSongAwards(this._currentPassSong.starLevel);
        //     this._physicalValue.text = num.toString();
        //     self.ShowGetPowerEffect(e.target as Laya.UIComponent);
        // }
        // WXAPI.showRewardedVideoAd((isClose) => {
        //     loockBack.call(self, isClose);
        // }, () => {
        //     View_myqq_Mgr.instance.openView(ViewDef.TipsView, "视频加载失败。。。");
        // });
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            NativeCallback_1.default.CallNativeFunc("showRewardVideo");
            Laya.SoundManager.muted = true;
        }
        else {
            var num = SoundManager_1.default.Instance.SetAdSongAwards(this._currentPassSong.starLevel);
            this._physicalValue.text = num.toString();
            this.ShowGetPowerEffect(e.target);
        }
        //loockBack.call(self, true);
    };
    GameSettleView.prototype.onClickFreeReceive = function (e) {
        console.log("免费领取");
        this._physicalValue.text = SoundManager_1.default.Instance.SetFreeSongAwards().toString();
        this.ShowGetPowerEffect(e.target);
    };
    GameSettleView.prototype.ShowGetPowerEffect = function (button) {
        var self = this;
        button.mouseEnabled = false;
        Laya.timer.once(1 * 1000, this, function () {
            //button.mouseEnabled = true;
            // View_myqq_Mgr.instance.openView(ViewDef.ExportView, null, () => {
            //     self.closeView();
            // });
            // var randNum = Math.random();
            // console.log("随机数值 ===========" + randNum);
            // // randNum = 0.46;
            // if ((Laya.Browser.onAndroid || Laya.Browser.onIOS) && randNum > 0.2) {
            //     NativeCallback.CallNativeFunc("showInsertVideo");
            //     NativeCallback.NowVideoType = "insertAd";
            //     Laya.SoundManager.muted = false;
            // }
            // else {
            //     View_myqq_Mgr.instance.openView(ViewDef.GameMainView, null, () => {
            //         self.closeView();
            //     })
            // }
            ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.GameMainView, null, function () {
                self.closeView();
            });
        });
        var startPos = this._energy.localToGlobal(new Laya.Point(this._energy.width / 2, this._energy.height / 2));
        var endPos = this._physicalBox.localToGlobal(new Laya.Point(0, 0));
        var logo = this._physicalValue.parent.getChildByName("Logo");
        this.ShowPhysicalAnim(this._physicalBox, logo, startPos, endPos, 300);
    };
    GameSettleView.prototype.onInsertVideoEnd = function () {
        var self = this;
        ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.GameMainView, null, function () {
            self.closeView();
        });
        Laya.SoundManager.muted = true;
        NativeCallback_1.default.CallNativeFunc("loadNextAd");
    };
    GameSettleView.prototype.ShowPhysicalAnim = function (physicals, logo, startPos, endPos, offset) {
        var _this = this;
        startPos = physicals.globalToLocal(startPos);
        endPos = physicals.globalToLocal(endPos);
        var scaleChange = function () {
            Laya.Tween.clearAll(logo);
            logo.scale(1, 1);
            Laya.Tween.from(logo, { scaleX: 1.4, scaleY: 1.4 }, 0.2 * 1000, Laya.Ease.backOut);
        };
        var _loop_2 = function (i) {
            var item = physicals._children[i];
            item.x = startPos.x;
            item.y = startPos.y;
            item.visible = true;
            Laya.Tween.clearAll(this_1);
            Laya.Tween.to(item, { x: startPos.x + Utilit_1.default.GetRandomNumber(-offset, offset), y: startPos.y + Utilit_1.default.GetRandomNumber(-offset, offset) }, 0.15 * 1000, null, Laya.Handler.create(this_1, function () {
                Laya.Tween.to(item, { x: endPos.x, y: endPos.y }, (0.2 + Math.random() * 0.3) * 1000, null, Laya.Handler.create(_this, function () {
                    item.visible = false;
                    scaleChange.call(_this);
                }));
            }));
        };
        var this_1 = this;
        for (var i = 0; i < physicals._children.length; i++) {
            _loop_2(i);
        }
    };
    GameSettleView.prototype.onDisable = function () {
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    return GameSettleView;
}(ViewBase_1.default));
exports.default = GameSettleView;
},{"../../Event/EventDef":4,"../../Event/EventMgr":5,"../../Game/GameController":14,"../../Game/SoundManager":19,"../../Mgr/ViewMgr":29,"../../NativeCallback":30,"../../User/User":40,"../../Utilit":41,"../ViewBase":57}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var GameController_1 = require("../../Game/GameController");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var Utilit_1 = require("../../Utilit");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var GameWorkView = /** @class */ (function (_super) {
    __extends(GameWorkView, _super);
    function GameWorkView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.progressBar = null;
        return _this;
    }
    GameWorkView.prototype.onAwake = function () {
        this.touchTip = this.owner.getChildByName("Touch");
        this.playTip = this.owner.getChildByName("ContinuePlay");
        var node = this.owner.getChildByName("ProgressBar");
        this.progressBar = new ProgressBar(node);
        this.playStateFlags = this.owner.getChildByName("PlayStateFlags");
        this.songName = Utilit_1.default.FindChild(this.owner, "SongName/Label");
        this.songSource = this.owner.getChildByName("SongSource");
        this.perfectCount = this.owner.getChildByName("PerfectCount");
    };
    GameWorkView.prototype.onShow = function () {
        this.Reset();
        this.ShowGamePlay();
        this.songName.text = GameController_1.default.Instance.currentSong.songName;
    };
    GameWorkView.prototype.Reset = function () {
        this.songName.text = "";
        this.songSource.value = "0";
        this.progressBar.Reset();
        this.playTip.visible = false;
        this.touchTip.visible = false;
        this.playStateFlags.visible = false;
    };
    GameWorkView.prototype.onEnable = function () {
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_Failure, this, this.OnGameFailure);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_Resurgence, this, this.onPlayResurgence);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_Settle, this, this.onGamePlayState);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_StateChange, this, this.OnGameStateChange);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.Game_SongSourceChange, this, this.onSourceChange);
    };
    GameWorkView.prototype.onDisable = function () {
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_Failure, this, this.OnGameFailure);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_Settle, this, this.onGamePlayState);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_Resurgence, this, this.onPlayResurgence);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_StateChange, this, this.OnGameStateChange);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.Game_SongSourceChange, this, this.onSourceChange);
    };
    GameWorkView.prototype.ShowPerfectCount = function (count) {
        var label = this.perfectCount.getChildByName("Label");
        label.value = count;
        this.perfectCount.visible = true;
        Laya.timer.once(1 * 1000, this, this.closePerfectCount);
        Laya.Tween.clearAll(this.perfectCount);
        Laya.Tween.from(this.perfectCount, { scaleX: 1, scaleY: 1 }, 0.2 * 1000, Laya.Ease.backOut);
    };
    GameWorkView.prototype.closePerfectCount = function () {
        this.perfectCount.visible = false;
    };
    GameWorkView.prototype.onSourceChange = function (source, progress, continuousPerfect) {
        this.songSource.value = source;
        this.progressBar.UpdateValue(Math.min(1, progress));
        if (continuousPerfect < 3) {
            return;
        }
        this.ShowPerfectCount(continuousPerfect);
    };
    GameWorkView.prototype.onGamePlayState = function (succeed) {
        var _this = this;
        var self = this;
        this.playStateFlags.visible = true;
        var winFlag = this.playStateFlags.getChildByName("Win");
        var defeatedFlag = this.playStateFlags.getChildByName("Defeated");
        winFlag.visible = succeed;
        defeatedFlag.visible = !succeed;
        Laya.Tween.clearAll(this.playStateFlags);
        Laya.Tween.from(this.playStateFlags, { y: 0 }, 0.7 * 1000, Laya.Ease.backOut, Laya.Handler.create(this, function () {
            Laya.timer.once(500, _this, function () {
                ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.GameSettleView, succeed, function () {
                    self.closeView();
                });
            });
        }));
        this.touchTip.visible = false;
        this.playTip.visible = false;
    };
    GameWorkView.prototype.OnGameFailure = function () {
        Laya.timer.once(1000, this, function () {
            ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.GameFailureView);
        });
    };
    GameWorkView.prototype.onPlayResurgence = function () {
        this.playStateFlags.visible = false;
        this.ShowGamePlay();
    };
    GameWorkView.prototype.ShowGamePlay = function () {
        this.touchTip.visible = true;
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.OnClickGamePlay);
    };
    GameWorkView.prototype.OnClickGamePlay = function () {
        console.log("onGamePlay");
        this.touchTip.visible = false;
        if (!GameController_1.default.Instance.isGameing) {
            GameController_1.default.Instance.GamePlay();
        }
        else {
            GameController_1.default.Instance.BallRun();
        }
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.OnClickGamePlay);
    };
    GameWorkView.prototype.OnGameStateChange = function (notPause) {
        if (notPause) {
            return;
        }
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.OnClickResumeGame);
        this.ShowGamePause();
    };
    GameWorkView.prototype.ShowGamePause = function () {
        this.playTip.visible = true;
        this.touchTip.visible = true;
        GameController_1.default.Instance.PauseGame();
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.OnClickResumeGame);
    };
    GameWorkView.prototype.OnClickResumeGame = function () {
        console.log("onGameResume");
        this.playTip.visible = false;
        this.touchTip.visible = false;
        GameController_1.default.Instance.ResumeGame();
        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.OnClickResumeGame);
    };
    GameWorkView.prototype.onKeyDown = function (e) {
        if (e.keyCode == Laya.Keyboard.Q) {
            GameController_1.default.Instance.PauseGame();
        }
        else {
            GameController_1.default.Instance.ResumeGame();
        }
    };
    return GameWorkView;
}(ViewBase_1.default));
exports.default = GameWorkView;
var ProgressBar = /** @class */ (function () {
    function ProgressBar(progressBar) {
        this.progress = progressBar.getChildByName("Progress");
        this.minLeft = this.progress.left;
        this.minRight = this.progress.right;
        this.length = progressBar.width - this.progress.left;
    }
    ProgressBar.prototype.UpdateValue = function (value) {
        this.progress.right = this.length - this.length * value;
        if (this.progress.right < this.minRight)
            this.progress.right = this.minRight;
        if (this.progress.left < this.minLeft)
            this.progress.left = this.minLeft;
    };
    ProgressBar.prototype.Reset = function () {
        this.progress.left = this.minLeft;
        this.progress.right = this.length;
    };
    return ProgressBar;
}());
},{"../../Event/EventDef":4,"../../Event/EventMgr":5,"../../Game/GameController":14,"../../Mgr/ViewMgr":29,"../../Utilit":41,"../ViewBase":57}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var Version_1 = require("../../Game/Version");
var Utilit_1 = require("../../Utilit");
var ViewMgr_1 = require("../../Mgr/ViewMgr");
var SoundManager_1 = require("../../Game/SoundManager");
var SongStoreCell_1 = require("./CellView/SongStoreCell");
var NativeCallback_1 = require("../../NativeCallback");
var EventMgr_1 = require("../../Event/EventMgr");
var EventDef_1 = require("../../Event/EventDef");
var SongStoreView = /** @class */ (function (_super) {
    __extends(SongStoreView, _super);
    function SongStoreView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SongStoreView.prototype.onAwake = function () {
        this.songList = this.owner.getChildByName("SongList");
        this.currSongBox = this.owner.getChildByName("CurrSongData");
        this.backButton = this.owner.getChildByName("BackButton");
        this.songList.vScrollBarSkin = "";
        this.songList.selectEnable = true;
        this.songList.elasticEnabled = true;
        this.songList.selectHandler = Laya.Handler.create(this, this.OnSelectSong, null, false);
        this.songList.renderHandler = Laya.Handler.create(this, this.OnRenderSongList, null, false);
        this.backButton.on(Laya.Event.CLICK, this, this.OnClickBackButton);
    };
    SongStoreView.prototype.onEnable = function () {
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.instance.regEvemt(EventDef_1.EventDef.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    SongStoreView.prototype.onShow = function () {
        var selectIndex = SoundManager_1.default.Instance.GetLastPlaySongIndex();
        this.selectIndex = selectIndex;
        var song = Version_1.default.songs[selectIndex];
        this.SetCurrSongData(song);
        this.songList.array = Version_1.default.songs;
    };
    SongStoreView.prototype.SetCurrSongData = function (song) {
        var name = Utilit_1.default.FindChild(this.currSongBox, "Name/Label");
        var stars = this.currSongBox.getChildByName("StarLevels");
        name.text = song.name;
        var songRecord = SoundManager_1.default.Instance.GetSongRecord(song.name);
        var starLevel = (songRecord == null) ? 0 : songRecord.starLevel;
        for (var i = 1; i <= 3; i++) {
            var star = stars.getChildByName("Star" + i);
            var activeFlag = star.getChildByName("Active");
            activeFlag.visible = i <= starLevel;
        }
    };
    SongStoreView.prototype.OnRenderSongList = function (cell, index) {
        var song = this.songList.array[index];
        var songCell = cell.getComponent(SongStoreCell_1.default);
        songCell.UpdateView(song);
        songCell.ActiveSong(index == this.selectIndex);
        cell.off(Laya.Event.CLICK, this, this.OnClickPlay);
        cell.on(Laya.Event.CLICK, this, this.OnClickPlay);
    };
    SongStoreView.prototype.OnSelectSong = function (index) {
        var cells = this.songList.cells;
        var song = this.songList.array[index];
        var activeCell = this.songList.getCell(index);
        SoundManager_1.default.Instance.AuditionSong(song);
        for (var i = 0; i < cells.length; i++) {
            var cell = cells[i];
            var songCell = cells[i].getComponent(SongStoreCell_1.default);
            songCell.ActiveSong(cell == activeCell);
        }
    };
    SongStoreView.prototype.OnClickPlay = function () {
        var _this = this;
        if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            if (!SoundManager_1.default.Instance.CanPlayOne()) {
                NativeCallback_1.default.NowVideoType = "StoreSong";
                NativeCallback_1.default.CallNativeFunc("showRewardVideo");
                Laya.SoundManager.muted = true;
                return;
            }
        }
        if (this.selectIndex != this.songList.selectedIndex) {
            this.selectIndex = this.songList.selectedIndex;
            this.SetCurrSongData(this.songList.array[this.selectIndex]);
            return;
        }
        var song = this.songList.array[this.selectIndex];
        SoundManager_1.default.Instance.PlaySong(song, this, function () {
            _this.closeView();
        });
    };
    SongStoreView.prototype.onRewardVidewoFail = function () {
        if (NativeCallback_1.default.NowVideoType == "StoreSong") {
            ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.TipsView, "Video playback failed. can't enter game");
        }
    };
    SongStoreView.prototype.onRewardVidewoSuccess = function () {
        var _this = this;
        if (this.selectIndex != this.songList.selectedIndex) {
            this.selectIndex = this.songList.selectedIndex;
            this.SetCurrSongData(this.songList.array[this.selectIndex]);
            return;
        }
        var song = this.songList.array[this.selectIndex];
        SoundManager_1.default.Instance.PlaySong(song, this, function () {
            _this.closeView();
        });
    };
    SongStoreView.prototype.OnClickUnlock = function () {
        this.songList.refresh();
    };
    SongStoreView.prototype.OnClickBackButton = function () {
        var self = this;
        ViewMgr_1.default.instance.openView(ViewMgr_1.ViewDef.GameMainView, null, function () {
            self.closeView();
        });
    };
    SongStoreView.prototype.onDisable = function () {
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.RewardVideoFail, this, this.onRewardVidewoFail);
        EventMgr_1.default.instance.removeEvent(EventDef_1.EventDef.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
    };
    return SongStoreView;
}(ViewBase_1.default));
exports.default = SongStoreView;
},{"../../Event/EventDef":4,"../../Event/EventMgr":5,"../../Game/SoundManager":19,"../../Game/Version":23,"../../Mgr/ViewMgr":29,"../../NativeCallback":30,"../../Utilit":41,"../ViewBase":57,"./CellView/SongStoreCell":45}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
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
            this._value = this._processBarBg.getChildByName("Value");
            this._processBar = this._processBarBg.getChildByName("processBar");
            this._processWidth = this._processBar.width;
        }
        else {
            this._processBar = this._bg.getChildByName("processBar");
            this._processWidth = Laya.stage.width;
        }
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
        var tmep = Math.min(Math.max(0, process), 1);
        if (tmep < 0)
            tmep = 0;
        this._value.text = tmep * 100 + "%";
    };
    return LoadingView;
}(ViewBase_1.default));
exports.default = LoadingView;
},{"../ViewBase":57}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextureProcessBar = /** @class */ (function (_super) {
    __extends(TextureProcessBar, _super);
    function TextureProcessBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name: resType, tips:"图片地址",type:string,accept:res} */
        _this.resType = "";
        /** @prop {name: speed, tips:"进度条缓动速度",type:int,default=5} */
        _this.soomthSpeed = 5;
        _this._value = 0;
        _this._curValue = 0;
        return _this;
    }
    Object.defineProperty(TextureProcessBar.prototype, "CurrentValue", {
        get: function () {
            return this._curValue;
        },
        enumerable: true,
        configurable: true
    });
    TextureProcessBar.prototype.onAwake = function () {
        this._image = this.owner;
    };
    TextureProcessBar.prototype.onEnable = function () {
        var _this = this;
        this._texture = Laya.loader.getRes(this.resType);
        if (this._texture == null) {
            Laya.loader.load(this.resType, Laya.Handler.create(this, function () {
                _this._texture = Laya.loader.getRes(_this.resType);
            }), null, Laya.Loader.IMAGE, 1);
        }
    };
    TextureProcessBar.prototype.onUpdate = function () {
        this._curValue = this.Lerp(this._curValue, this._value, 1 / 60 * this.soomthSpeed);
        if (1 - this._curValue <= 0.01)
            this._curValue = 1;
        this.draw(this._curValue);
    };
    TextureProcessBar.prototype.Lerp = function (num1, num2, t) {
        return num1 + t * (num2 - num1);
    };
    TextureProcessBar.prototype.setValue = function (value, curValue) {
        if (curValue === void 0) { curValue = null; }
        this._value = value;
        if (this._value > 1)
            this._value = 1;
        if (curValue != null)
            this._curValue = curValue;
    };
    TextureProcessBar.prototype.draw = function (value) {
        if (this._texture == null)
            return;
        var x = 0, y = 0;
        var height = this._image.height;
        var width = this._image.width * value;
        this._image.graphics.clear();
        //this.getTexture(this._texture, 0, 0, this._image.width, this._image.height)
        this._image.graphics.fillTexture(this._texture, x, y, width, height, "no-repeat");
    };
    TextureProcessBar.prototype.getTexture = function (tex, x, y, width, height) {
        if (width <= 0)
            width = 1;
        if (height <= 0)
            height = 1;
        tex.$_GID || (tex.$_GID = Laya.Utils.getGID());
        var texture;
        if (!texture || !texture._getSource()) {
            texture = Laya.Texture.create(tex.bitmap, x, y, width, height, 0, 0, tex.width, tex.height);
            texture.width = width;
            texture.height = height;
        }
        return texture;
    };
    return TextureProcessBar;
}(Laya.Script));
exports.default = TextureProcessBar;
},{}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ViewBase");
var Tips_myqq_View = /** @class */ (function (_super) {
    __extends(Tips_myqq_View, _super);
    function Tips_myqq_View() {
        return _super.call(this) || this;
    }
    Tips_myqq_View.prototype.onAwake = function () {
        this._bg = this.owner.getChildByName("Bg");
        this._bg.x = Laya.stage.width / 2 - this._bg.width / 2;
        this._tipsText = this._bg.getChildByName("Text");
    };
    Tips_myqq_View.prototype.openView = function (data) {
        _super.prototype.openView.call(this, data);
        this.set_myqq_TipsMsg(data);
        Laya.timer.clearAll(this);
        var self = this;
        Laya.timer.once(3000, this, function () {
            self.closeView();
        });
        //弹出后设置节点为最高节点
        Laya.stage.setChildIndex(this.owner, Laya.stage._children.length - 1);
    };
    Tips_myqq_View.prototype.set_myqq_TipsMsg = function (msg) {
        this._tipsText.text = msg;
    };
    return Tips_myqq_View;
}(ViewBase_1.default));
exports.default = Tips_myqq_View;
},{"../ViewBase":57}],57:[function(require,module,exports){
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
        _this._viewDef = ViewMgr_1.ViewDef.None;
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
        EventMgr_1.default.instance.dispatch(EventDef_1.EventDef.Game_OnViewClose, { view: this._viewDef });
        if (this.onCloseEvent) {
            this.onCloseEvent();
        }
    };
    return ViewBase;
}(Laya.Script));
exports.default = ViewBase;
},{"../Event/EventDef":4,"../Event/EventMgr":5,"../Mgr/ViewMgr":29}],58:[function(require,module,exports){
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
    WXAPI.adUnitId = "";
    WXAPI.bannerAdUnitId = "";
    WXAPI.InsAdUnitId = "";
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
},{}],59:[function(require,module,exports){
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
            LoadingUI.uiView = { "type": "Scene", "props": { "width": 1080, "top": 0, "right": 0, "left": 0, "height": 1920, "bottom": 0 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": -172, "x": 0, "width": 1080, "skin": "Loading/bg.png", "height": 2880 }, "compId": 9 }, { "type": "Clip", "props": { "top": 0, "right": 0, "name": "Bg", "left": 0, "bottom": 0 }, "compId": 6, "child": [{ "type": "Image", "props": { "y": 1273, "x": 258, "skin": "Loading/微信图片_201910231521391.png", "name": "processBarBg" }, "compId": 8, "child": [{ "type": "Clip", "props": { "y": 24, "x": 2, "width": 560, "skin": "Loading/微信图片_20191023152139.png", "pivotY": 22, "name": "processBar" }, "compId": 5 }, { "type": "Label", "props": { "y": -64, "x": 185, "width": 194, "valign": "middle", "text": "0.00%", "name": "Value", "height": 52, "fontSize": 50, "color": "#ffffff", "align": "center" }, "compId": 10 }] }] }, { "type": "Script", "props": { "y": 0, "x": 0, "runtime": "View/LoadingView/LoadingView.ts" }, "compId": 7 }], "loadList": ["Loading/bg.png", "Loading/微信图片_201910231521391.png", "Loading/微信图片_20191023152139.png"], "loadList3D": [] };
            return LoadingUI;
        }(Scene));
        View.LoadingUI = LoadingUI;
        REG("ui.View.LoadingUI", LoadingUI);
    })(View = ui.View || (ui.View = {}));
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[25])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkc6L1Byb2dyYW0gRmlsZXMvTGF5YUFpcklERTIuMS4xL3Jlc291cmNlcy9hcHAvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9BTEQudHMiLCJzcmMvQXBwQ29uZmlnLnRzIiwic3JjL0NvbmZpZy9BcHBTd2l0Y2hDb25maWcudHMiLCJzcmMvRXZlbnQvRXZlbnREZWYudHMiLCJzcmMvRXZlbnQvRXZlbnRNZ3IudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lL0F1ZGlvL0F1ZGlvQmFuZC50cyIsInNyYy9HYW1lL0F1ZGlvL0F1ZGlvV3JhcGVyLnRzIiwic3JjL0dhbWUvQXVkaW8vQmFuZEJlaGF2aW9yLnRzIiwic3JjL0dhbWUvQXVkaW8vUGFyYW1DdWJlQ3ViZS50cyIsInNyYy9HYW1lL0JhbGxDb250cm9sbGVyLnRzIiwic3JjL0dhbWUvQ2FtZXJhRm9sbG93LnRzIiwic3JjL0dhbWUvR2FtZUNvbnN0LnRzIiwic3JjL0dhbWUvR2FtZUNvbnRyb2xsZXIudHMiLCJzcmMvR2FtZS9Nb3VzZU1nci50cyIsInNyYy9HYW1lL05vdGVCb2FyZC50cyIsInNyYy9HYW1lL05vdGVCb2FyZE1hbmFnZXIudHMiLCJzcmMvR2FtZS9Ob3RlTWFuYWdlci50cyIsInNyYy9HYW1lL1NvdW5kTWFuYWdlci50cyIsInNyYy9HYW1lL1Rvb2xzL0NhbWVyYU1vdmVTY3JpcHQudHMiLCJzcmMvR2FtZS9Ub29scy9GU01TdGF0ZU1hY2hpbmUudHMiLCJzcmMvR2FtZS9Ub29scy9QaHlzaWNUcmlnZ2VyM2QudHMiLCJzcmMvR2FtZS9WZXJzaW9uLnRzIiwic3JjL01haUxpYW5nQVBJL01haUxpYW5nLnRzIiwic3JjL01haW4udHMiLCJzcmMvTWdyL0dhbWVNZ3IudHMiLCJzcmMvTWdyL1NvdW5kTWdyLnRzIiwic3JjL01nci9WaWJyYXRlTWdyLnRzIiwic3JjL01nci9WaWV3TWdyLnRzIiwic3JjL05hdGl2ZUNhbGxiYWNrLnRzIiwic3JjL05ldC9BZXNUb29scy50cyIsInNyYy9OZXQvSHR0cFVuaXQudHMiLCJzcmMvTmV0L05ldENvbmZpZy50cyIsInNyYy9OZXQvYWVzLmpzIiwic3JjL1NoYXJlQWQvU2hhcmVBZC50cyIsInNyYy9TaGFyZUFkL1ZpZXcvQmFubmVyQWRWaWV3LnRzIiwic3JjL1NoYXJlQWQvVmlldy9Ib3Jpem9udGFsTG9vcEFkVmlldy50cyIsInNyYy9TaGFyZUFkL1ZpZXcvTG9vcEFkQm94LnRzIiwic3JjL1NoYXJlQWQvVmlldy9Mb29wQWRWaWV3LnRzIiwic3JjL1VzZXIvVXNlci50cyIsInNyYy9VdGlsaXQudHMiLCJzcmMvVmlldy9CdXR0b25BbmltLnRzIiwic3JjL1ZpZXcvQ29tbW9uL1VuaXZlcnNhbEJvdHRvbVpvbmUudHMiLCJzcmMvVmlldy9HYW1lL0NlbGxWaWV3L1NvbmdEaXNDZWxsLnRzIiwic3JjL1ZpZXcvR2FtZS9DZWxsVmlldy9Tb25nU3RvcmVDZWxsLnRzIiwic3JjL1ZpZXcvR2FtZS9DZW50ZXJMaXN0LnRzIiwic3JjL1ZpZXcvR2FtZS9FeHBvcnRWaWV3LnRzIiwic3JjL1ZpZXcvR2FtZS9HYW1lRmFpbHVyZVZpZXcudHMiLCJzcmMvVmlldy9HYW1lL0dhbWVMb2FkaW5nVmlldy50cyIsInNyYy9WaWV3L0dhbWUvR2FtZU1haW5WaWV3LnRzIiwic3JjL1ZpZXcvR2FtZS9HYW1lU2V0dGxlVmlldy50cyIsInNyYy9WaWV3L0dhbWUvR2FtZVdvcmtWaWV3LnRzIiwic3JjL1ZpZXcvR2FtZS9Tb25nU3RvcmVWaWV3LnRzIiwic3JjL1ZpZXcvTG9hZGluZ1ZpZXcvTG9hZGluZ1ZpZXcudHMiLCJzcmMvVmlldy9UZXh0dXJlUHJvY2Vzc0Jhci50cyIsInNyYy9WaWV3L1RpcHNWaWV3L1RpcHNWaWV3LnRzIiwic3JjL1ZpZXcvVmlld0Jhc2UudHMiLCJzcmMvV1hBUEkudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNB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LE9BQU8sRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsZ0JBQWdCLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxrQ0FBa0MsRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLGlDQUFpQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxTQUFTLEVBQUMsaUNBQWlDLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxnQkFBZ0IsRUFBQyxrQ0FBa0MsRUFBQyxpQ0FBaUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQztZQU1uK0IsZ0JBQUM7U0FQRCxBQU9DLENBUDhCLEtBQUssR0FPbkM7UUFQWSxjQUFTLFlBT3JCLENBQUE7UUFDRCxHQUFHLENBQUMsbUJBQW1CLEVBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkMsQ0FBQyxFQVZnQixJQUFJLEdBQUosT0FBSSxLQUFKLE9BQUksUUFVcEI7QUFBRCxDQUFDLEVBVmEsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBVWYiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGVudW0gQUxERXZlbnREZWZcclxue1xyXG4gICAgTm9uZSA9IFwiXCIsXHJcbiAgICBSZXBvcnRBZENsaWNrU3VjY2VzcyA9IFwi5bm/5ZGK5a+85Ye65oiQ5YqfXCIsXHJcbiAgICBSZXBvcnRBZENsaWNrRmFpbCA9IFwi5bm/5ZGK5a+85Ye65aSx6LSlXCIsXHJcbiAgICAvL3RvZG865re75Yqg5L2g6Ieq5bex55qE6Zi/5ouJ5LiB5LqL5Lu2XHJcbn1cclxuXHJcbi8v6Zi/5ouJ5LiB55u45YWz5o6l5Y+jXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFMRCBcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBhbGRTZW5kRXZlbnQoZXZlbnQgOiBBTERFdmVudERlZixkYXRhIDogYW55KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBldmVudE5hbWUgOiBzdHJpbmcgPSBldmVudDtcclxuICAgICAgICBpZihMYXlhLkJyb3dzZXIub25NaW5pR2FtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5hbGRTZW5kRXZlbnQoZXZlbnROYW1lLGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFsZFNlbmRSZXBvcnRBZENsaWNrU3VjY2VzcyhkYXRhIDogYW55KVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0eXBlID0gQUxERXZlbnREZWYuUmVwb3J0QWRDbGlja1N1Y2Nlc3MgICsgXCIgXCIgKyAgZGF0YS50aXRsZSArIFwiOlwiICsgU3RyaW5nKGRhdGEuYXBwaWQpXHJcbiAgICAgICAgdmFyIGFsZCA9IEFMRCBhcyBhbnk7XHJcbiAgICAgICAgYWxkLmFsZFNlbmRFdmVudCh0eXBlLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIuWvvOWHuuaIkOWKn1wiIDogZGF0YS50aXRsZSArIFwiOlwiICsgU3RyaW5nKGRhdGEuYXBwaWQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhbGRTZW5kUmVwb3J0QWRDbGlja0ZhaWwoZGF0YSA6IGFueSlcclxuICAgIHtcclxuICAgICAgICB2YXIgdHlwZSA9IEFMREV2ZW50RGVmLlJlcG9ydEFkQ2xpY2tGYWlsICArIFwiIFwiICsgIGRhdGEudGl0bGUgKyBcIjpcIiArIFN0cmluZyhkYXRhLmFwcGlkKVxyXG4gICAgICAgIHZhciBhbGQgPSBBTEQgYXMgYW55O1xyXG4gICAgICAgIGFsZC5hbGRTZW5kRXZlbnQodHlwZSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCLlr7zlh7rlpLHotKVcIiAgOiAgZGF0YS50aXRsZSArIFwiOlwiICsgU3RyaW5nKGRhdGEuYXBwaWQpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBfbXlxcV9Db25maWdcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBBcHBJRCA6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFJlc1NlcnZlciA6IHN0cmluZyA9IFwiXCI7Ly/otYTmupDmnI3liqHlmajlnLDlnYBcclxuICAgIHB1YmxpYyBzdGF0aWMgTG9jYWxUZXN0UmVTZXJ2ZXIgOiBzdHJpbmcgPSBcInN1YlJlc1wiOy8v5pys5Zyw5rWL6K+V6LWE5rqQ5pyN5Yqh5Zmo5Zyw5Z2AXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFZlcnNpb25zIDogc3RyaW5nID0gXCIwLjAuMFwiO1xyXG59IiwiaW1wb3J0IEFwcF9teXFxX0NvbmZpZyBmcm9tIFwiLi4vQXBwQ29uZmlnXCI7XHJcbmltcG9ydCBXWEFQSSBmcm9tIFwiLi4vV1hBUElcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHBTd2l0Y2hEYXRhXHJcbntcclxuICAgIHB1YmxpYyBiYW5uZXIgOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHd1ZGlhbjogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyB3dWRpYW5UaW1lXzAxOiBudW1iZXIgPSAyMDAwO1xyXG4gICAgcHVibGljIHd1ZGlhblRpbWVfMDFQcmVMb2FkOiBudW1iZXIgPSA1MDA7XHJcbiAgICBwdWJsaWMgc2hpcGludHViaWFvOiBudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSB3dWRpYW5BdmFpbGFibGVUaW1lOiBvYmplY3QgPSB7XHJcbiAgICAgICAgXCIwXCI6IDAsIFwiMVwiOiAwLCBcIjJcIjogMCwgXCIzXCI6IDAsXHJcbiAgICAgICAgXCI0XCI6IDAsIFwiNVwiOiAwLCBcIjZcIjogMCwgXCI3XCI6IDAsXHJcbiAgICAgICAgXCI4XCI6IDAsIFwiOVwiOiAwLCBcIjEwXCI6IDAsIFwiMTFcIjogMCxcclxuICAgICAgICBcIjEyXCI6IDAsIFwiMTNcIjogMCwgXCIxNFwiOiAwLCBcIjE1XCI6IDAsXHJcbiAgICAgICAgXCIxNlwiOiAwLCBcIjE3XCI6IDAsIFwiMThcIjogMCwgXCIxOVwiOiAwLFxyXG4gICAgICAgIFwiMjBcIjogMCwgXCIyMVwiOiAwLCBcIjIyXCI6IDAsIFwiMjNcIjogMFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlvpfliLDlvZPliY3ml7bpl7TlvIDlhbPmmK/lkKbmiZPlvIBcclxuICAgICAqIFxyXG4gICAgICogQHJlYWRvbmx5XHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBBcHBTd2l0Y2hEYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgd3VkaWFuVGltZUF2YWxpYWJsZSgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLnd1ZGlhbkF2YWlsYWJsZVRpbWVbbmV3IERhdGUoKS5nZXRIb3VycygpXSA9PSAxO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBTd2l0Y2hDb25maWdcclxueyAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpIDogQXBwU3dpdGNoQ29uZmlnXHJcbiAgICB7XHJcbiAgICAgICAgaWYobnVsbCA9PSBBcHBTd2l0Y2hDb25maWcuX2luc3RhbmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQXBwU3dpdGNoQ29uZmlnLl9pbnN0YW5jZSA9IEFwcFN3aXRjaENvbmZpZy5sb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBcHBTd2l0Y2hDb25maWcuX2luc3RhbmNlXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9pbnN0YW5jZTogQXBwU3dpdGNoQ29uZmlnO1xyXG5cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgbG9hZCgpIDogQXBwU3dpdGNoQ29uZmlnXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IG5ldyBBcHBTd2l0Y2hDb25maWcoKTtcclxuICAgICAgICB2YXIganNvbjogYW55ID0gTGF5YS5sb2FkZXIuZ2V0UmVzKEFwcF9teXFxX0NvbmZpZy5SZXNTZXJ2ZXIgKyBcIi9qc29uL2FwcHN3aXRjaC5qc29uXCIpO1xyXG4gICAgICAgIGlmKGpzb24pe1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBqc29uLmxlbmd0aDsrK2kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciByb3cgPSBqc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvd0RhdGE6IEFwcFN3aXRjaERhdGEgPSBuZXcgQXBwU3dpdGNoRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgcm93RGF0YS5iYW5uZXIgPSBOdW1iZXIocm93W1wiYmFubmVyXCJdKTtcclxuICAgICAgICAgICAgICAgIHJvd0RhdGEud3VkaWFuID0gTnVtYmVyKHJvd1tcInd1ZGlhblwiXSk7XHJcbiAgICAgICAgICAgICAgICByb3dEYXRhLnd1ZGlhblRpbWVfMDEgPSBOdW1iZXIocm93W1wid3VkaWFuVGltZV8wMVwiXSk7XHJcbiAgICAgICAgICAgICAgICByb3dEYXRhLnd1ZGlhblRpbWVfMDFQcmVMb2FkID0gTnVtYmVyKHJvd1tcInd1ZGlhblRpbWVfMDFQcmVMb2FkXCJdKTtcclxuICAgICAgICAgICAgICAgIHJvd0RhdGEuc2hpcGludHViaWFvID0gTnVtYmVyKHJvd1tcInNoaXBpbnR1Ymlhb1wiXSk7XHJcbiAgICAgICAgICAgICAgICAocm93RGF0YSBhcyBhbnkpLnd1ZGlhbkF2YWlsYWJsZVRpbWUgPSBPYmplY3Qocm93W1wid3VkaWFuVGltZVwiXSk7XHJcbiAgICAgICAgICAgICAgICBjb25maWcuX2RhdGEucHVzaChyb3dEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25maWcuX2RhdGEucHVzaChuZXcgQXBwU3dpdGNoRGF0YSgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kYXRhIDogQXJyYXk8QXBwU3dpdGNoRGF0YT4gPSBuZXcgQXJyYXk8QXBwU3dpdGNoRGF0YT4oKTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0QXBwU3dpdGNoRGF0YSgpOiBBcHBTd2l0Y2hEYXRhXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbMF07XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZW51bSBFdmVudERlZiBcclxue1xyXG4gICAgTm9uZSA9IDAsXHJcbiAgICBBcHBfQ2xvc2VGaXJzdExvYWRpbmdWaWV3ID0gNTAwLFxyXG4gICAgQURfT25TaGFyZUFkRmFpbCA9IDUwMSxcclxuXHJcbiAgICAvL+W9k+eVjOmdouaJk+W8gFxyXG4gICAgR2FtZV9PblZpZXdPcGVuID0gNjAwLC8ve3ZpZXcgOiBWaWV3RGVmfVxyXG4gICAgLy/lvZPnlYzpnaLlhbPpl61cclxuICAgIEdhbWVfT25WaWV3Q2xvc2UgPSA2MDEsLy97dmlldyA6IFZpZXdEZWZ9XHJcbiAgICAvL+W9k+eOqeWutumHkeW4geWPmOWKqFxyXG4gICAgR2FtZV9PblVzZXJNb25leUNoYW5nZSA9IDcwMSwvL3tjdXJyOm51bWJlcixsYXN0Om51bWJlcn1cclxuICAgIC8v5b2T546p5a626ZK755+z5Y+Y5YqoXHJcbiAgICBHYW1lX09uVXNlckNyeXN0YWxDaGFuZ2UgPSA3MDIsLy97Y3VycjpudW1iZXIsbGFzdDpudW1iZXJ9XHJcbiAgICAvL+W9k+WFs+WNoeW8gOWni1xyXG4gICAgR2FtZV9PbkxldmVsU3RhcnQgPSAxMDAwLFxyXG4gICAgLy/lvZPlhbPljaHnu5PmnZ9cclxuICAgIEdhbWVfT25MZXZlbENvbXBsYXRlID0gMTAwMSxcclxuXHJcbiAgICBHYW1lX1Jlc3VyZ2VuY2UgPSAxMDAwNSwgLy/lpI3mtLtcclxuICAgIC8v6K+v54K56aKE5Yqg6L295a6M5q+VXHJcbiAgICBBRF9XdWRpYW5CYW5uZXJfTG9hZENvbXBsZXRlID0gMjIxNyxcclxuICAgIC8v5pi+56S66K+v54K5QmFubmVyXHJcbiAgICBBRF9XdWRpYW5CYW5uZXJfU2hvdyA9IDIyMTgsXHJcbiAgICAvL+W9seiXj+ivr+eCuUJhbm5lclxyXG4gICAgQURfV3VkaWFuQmFubmVyX0hpZGUgPSAyMjE5LFxyXG4gICAgLy/pooTliqDovb1CYW5uZXJcclxuICAgIEFEX1d1ZGlhbkJhbm5lcl9QcmVMb2FkID0yMjIwLCAgICBcclxuICAgIC8vVGlwczrlnKjov5nmnaHmt7vliqDlrprkuYnkvaDoh6rlt7HpnIDopoHnmoTkuovku7bvvIzku44xMDAwMOWPt+W8gOWni+OAguiusOW+l+WIhuauteWIhuexu+euoeeQhuS4jeWQjOexu+Wei+S6i+S7tuOAguWmguaenOS6i+S7tuacieS8oOmAkuWPguaVsCBcIuW/hemhu1wiIOWcqOS6i+S7tuWQjumdoueUqOazqOmHiuWGmeaYjuS6i+S7tuWPguaVsOe7k+aehOOAglxyXG5cclxuICAgIEdhbWVfRk9DVVMgPSAyMDAxLFxyXG4gICAgR2FtZV9CTFVSID0gMjAwMixcclxuICAgIFxyXG4gICAgLy9UaXBzOuWcqOi/meadoea3u+WKoOWumuS5ieS9oOiHquW3semcgOimgeeahOS6i+S7tu+8jOS7jjEwMDAw5Y+35byA5aeL44CC6K6w5b6X5YiG5q615YiG57G7566h55CG5LiN5ZCM57G75Z6L5LqL5Lu244CC5aaC5p6c5LqL5Lu25pyJ5Lyg6YCS5Y+C5pWwIFwi5b+F6aG7XCIg5Zyo5LqL5Lu25ZCO6Z2i55So5rOo6YeK5YaZ5piO5LqL5Lu25Y+C5pWw57uT5p6E44CCXHJcbiAgICBHYW1lX1NvbmdTb3VyY2VDaGFuZ2UgPSAxMDAwMSwgLy8g5YiG5pWw5pS55Y+YOyB7Y3VycjpudW1iZXIsIHByb2dyZXNzOiBudW1iZXJ9XHJcblxyXG4gICAgR2FtZV9TdGF0ZUNoYW5nZSA9IDEwMDAyLCAvLyDmmoLlgZzmiJbogIXmgaLlpI0gLy8gW2Jvb2xdIHRydWUg5oGi5aSN5ri45oiPICBmYWxzZSDov5vlhaXmmoLlgZznirbmgIFcclxuXHJcbiAgICBHYW1lX0ZhaWx1cmUgPSAxMDAwMyxcclxuICAgIEdhbWVfU2V0dGxlID0gMTAwMDQsXHJcbiAgICBcclxuICAgIFJld2FyZFZpZGVvU3VjY2VzcyA9IDIwMDEwLFxyXG4gICAgUmV3YXJkVmlkZW9GYWlsID0gMjAwMTEsXHJcbiAgICBJbnNlcnRWaWRlb0VuZCA9ICAyMDAxMlxyXG59IiwiaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciA9IGxheWEuZXZlbnRzLkV2ZW50RGlzcGF0Y2hlcjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRfbXlxcV9NZ3IgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXIge1xyXG4gICAgc3RhdGljIGV2ZW50RGlzcGF0Y2hlcjogRXZlbnREaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcigpO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBpbnN0YW5jZTogRXZlbnRfbXlxcV9NZ3IgPSBuZXcgRXZlbnRfbXlxcV9NZ3IoKTs7XHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lub/mkq3kuovku7ZcclxuICAgIHB1YmxpYyBkaXNwYXRjaChJbk5hbWUsIGFndj86IGFueSkge1xyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmV2ZW50RGlzcGF0Y2hlci5ldmVudChJbk5hbWUsIGFndik7XHJcbiAgICB9XHJcbiAgICAvL+azqOWGjOS6i+S7tlxyXG4gICAgcHVibGljIHJlZ0V2ZW10KEluTmFtZSwgY2FsbGVyLCBsaXN0ZW5lcjogRnVuY3Rpb24sIGFyZz86IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuZXZlbnREaXNwYXRjaGVyLm9uKEluTmFtZSwgY2FsbGVyLCBsaXN0ZW5lciwgKGFyZyA9PSBudWxsKSA/IG51bGwgOiAoW2FyZ10pKTtcclxuICAgIH1cclxuICAgIC8v5rOo5YaM5Y2V5qyh5LqL5Lu2XHJcbiAgICBwdWJsaWMgcmVnT25jZUV2ZW50KEluTmFtZSwgY2FsbGVyLCBsaXN0ZW5lcjogRnVuY3Rpb24sIGFyZz86IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuZXZlbnREaXNwYXRjaGVyLm9uY2UoSW5OYW1lLCBjYWxsZXIsIGxpc3RlbmVyLCAoYXJnID09IG51bGwpID8gbnVsbCA6IChbYXJnXSkpO1xyXG4gICAgfVxyXG4gICAgLy/np7vpmaTkuovku7bms6jlhoxcclxuICAgIHB1YmxpYyByZW1vdmVFdmVudChJbk5hbWUsIGNhbGxlciwgbGlzdGVuZXI6IEZ1bmN0aW9uLCBhcmc/OiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmV2ZW50RGlzcGF0Y2hlci5vZmYoSW5OYW1lLCBjYWxsZXIsIGxpc3RlbmVyKTtcclxuICAgIH1cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xyXG5pbXBvcnQgR2FtZU1nciBmcm9tIFwiLi9NZ3IvR2FtZU1nclwiXG5pbXBvcnQgQnV0dG9uQW5pbSBmcm9tIFwiLi9WaWV3L0J1dHRvbkFuaW1cIlxuaW1wb3J0IExvb3BBZEJveCBmcm9tIFwiLi9TaGFyZUFkL1ZpZXcvTG9vcEFkQm94XCJcbmltcG9ydCBMb29wQWRWaWV3IGZyb20gXCIuL1NoYXJlQWQvVmlldy9Mb29wQWRWaWV3XCJcbmltcG9ydCBFeHBvcnRWaWV3IGZyb20gXCIuL1ZpZXcvR2FtZS9FeHBvcnRWaWV3XCJcbmltcG9ydCBHYW1lRmFpbHVyZVZpZXcgZnJvbSBcIi4vVmlldy9HYW1lL0dhbWVGYWlsdXJlVmlld1wiXG5pbXBvcnQgVGV4dHVyZVByb2Nlc3NCYXIgZnJvbSBcIi4vVmlldy9UZXh0dXJlUHJvY2Vzc0JhclwiXG5pbXBvcnQgR2FtZUxvYWRpbmdWaWV3IGZyb20gXCIuL1ZpZXcvR2FtZS9HYW1lTG9hZGluZ1ZpZXdcIlxuaW1wb3J0IFNvbmdEaXNDZWxsIGZyb20gXCIuL1ZpZXcvR2FtZS9DZWxsVmlldy9Tb25nRGlzQ2VsbFwiXG5pbXBvcnQgQ2VudGVyTGlzdCBmcm9tIFwiLi9WaWV3L0dhbWUvQ2VudGVyTGlzdFwiXG5pbXBvcnQgR2FtZU1haW5WaWV3IGZyb20gXCIuL1ZpZXcvR2FtZS9HYW1lTWFpblZpZXdcIlxuaW1wb3J0IEdhbWVTZXR0bGVWaWV3IGZyb20gXCIuL1ZpZXcvR2FtZS9HYW1lU2V0dGxlVmlld1wiXG5pbXBvcnQgR2FtZVdvcmtWaWV3IGZyb20gXCIuL1ZpZXcvR2FtZS9HYW1lV29ya1ZpZXdcIlxuaW1wb3J0IExvYWRpbmdWaWV3IGZyb20gXCIuL1ZpZXcvTG9hZGluZ1ZpZXcvTG9hZGluZ1ZpZXdcIlxuaW1wb3J0IFNvbmdTdG9yZUNlbGwgZnJvbSBcIi4vVmlldy9HYW1lL0NlbGxWaWV3L1NvbmdTdG9yZUNlbGxcIlxuaW1wb3J0IFNvbmdTdG9yZVZpZXcgZnJvbSBcIi4vVmlldy9HYW1lL1NvbmdTdG9yZVZpZXdcIlxuaW1wb3J0IFRpcHNWaWV3IGZyb20gXCIuL1ZpZXcvVGlwc1ZpZXcvVGlwc1ZpZXdcIlxuaW1wb3J0IEhvcml6b250YWxMb29wQWRWaWV3IGZyb20gXCIuL1NoYXJlQWQvVmlldy9Ib3Jpem9udGFsTG9vcEFkVmlld1wiXG5pbXBvcnQgQmFubmVyQWRWaWV3IGZyb20gXCIuL1NoYXJlQWQvVmlldy9CYW5uZXJBZFZpZXdcIlxuaW1wb3J0IFVuaXZlcnNhbEJvdHRvbVpvbmUgZnJvbSBcIi4vVmlldy9Db21tb24vVW5pdmVyc2FsQm90dG9tWm9uZVwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj0xMDgwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9MTkyMDtcclxuICAgIHN0YXRpYyBzY2FsZU1vZGU6c3RyaW5nPVwiZml4ZWR3aWR0aFwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwidmVydGljYWxcIjtcclxuICAgIHN0YXRpYyBhbGlnblY6c3RyaW5nPVwibWlkZGxlXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25IOnN0cmluZz1cImNlbnRlclwiO1xyXG4gICAgc3RhdGljIHN0YXJ0U2NlbmU6YW55PVwiR2FtZU1haW4uc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgcGh5c2ljc0RlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgZXhwb3J0U2NlbmVUb0pzb246Ym9vbGVhbj1mYWxzZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJNZ3IvR2FtZU1nci50c1wiLEdhbWVNZ3IpO1xuICAgICAgICByZWcoXCJWaWV3L0J1dHRvbkFuaW0udHNcIixCdXR0b25BbmltKTtcbiAgICAgICAgcmVnKFwiU2hhcmVBZC9WaWV3L0xvb3BBZEJveC50c1wiLExvb3BBZEJveCk7XG4gICAgICAgIHJlZyhcIlNoYXJlQWQvVmlldy9Mb29wQWRWaWV3LnRzXCIsTG9vcEFkVmlldyk7XG4gICAgICAgIHJlZyhcIlZpZXcvR2FtZS9FeHBvcnRWaWV3LnRzXCIsRXhwb3J0Vmlldyk7XG4gICAgICAgIHJlZyhcIlZpZXcvR2FtZS9HYW1lRmFpbHVyZVZpZXcudHNcIixHYW1lRmFpbHVyZVZpZXcpO1xuICAgICAgICByZWcoXCJWaWV3L1RleHR1cmVQcm9jZXNzQmFyLnRzXCIsVGV4dHVyZVByb2Nlc3NCYXIpO1xuICAgICAgICByZWcoXCJWaWV3L0dhbWUvR2FtZUxvYWRpbmdWaWV3LnRzXCIsR2FtZUxvYWRpbmdWaWV3KTtcbiAgICAgICAgcmVnKFwiVmlldy9HYW1lL0NlbGxWaWV3L1NvbmdEaXNDZWxsLnRzXCIsU29uZ0Rpc0NlbGwpO1xuICAgICAgICByZWcoXCJWaWV3L0dhbWUvQ2VudGVyTGlzdC50c1wiLENlbnRlckxpc3QpO1xuICAgICAgICByZWcoXCJWaWV3L0dhbWUvR2FtZU1haW5WaWV3LnRzXCIsR2FtZU1haW5WaWV3KTtcbiAgICAgICAgcmVnKFwiVmlldy9HYW1lL0dhbWVTZXR0bGVWaWV3LnRzXCIsR2FtZVNldHRsZVZpZXcpO1xuICAgICAgICByZWcoXCJWaWV3L0dhbWUvR2FtZVdvcmtWaWV3LnRzXCIsR2FtZVdvcmtWaWV3KTtcbiAgICAgICAgcmVnKFwiVmlldy9Mb2FkaW5nVmlldy9Mb2FkaW5nVmlldy50c1wiLExvYWRpbmdWaWV3KTtcbiAgICAgICAgcmVnKFwiVmlldy9HYW1lL0NlbGxWaWV3L1NvbmdTdG9yZUNlbGwudHNcIixTb25nU3RvcmVDZWxsKTtcbiAgICAgICAgcmVnKFwiVmlldy9HYW1lL1NvbmdTdG9yZVZpZXcudHNcIixTb25nU3RvcmVWaWV3KTtcbiAgICAgICAgcmVnKFwiVmlldy9UaXBzVmlldy9UaXBzVmlldy50c1wiLFRpcHNWaWV3KTtcbiAgICAgICAgcmVnKFwiU2hhcmVBZC9WaWV3L0hvcml6b250YWxMb29wQWRWaWV3LnRzXCIsSG9yaXpvbnRhbExvb3BBZFZpZXcpO1xuICAgICAgICByZWcoXCJTaGFyZUFkL1ZpZXcvQmFubmVyQWRWaWV3LnRzXCIsQmFubmVyQWRWaWV3KTtcbiAgICAgICAgcmVnKFwiVmlldy9Db21tb24vVW5pdmVyc2FsQm90dG9tWm9uZS50c1wiLFVuaXZlcnNhbEJvdHRvbVpvbmUpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvQmFuZCB7XHJcbiAgICBwdWJsaWMgYmFuZHM6IEJhbmRbXSA9IG5ldyBBcnJheTtcclxuICAgIHB1YmxpYyBiYW5kSGlnaGVzdEJ1ZmZlcjogbnVtYmVyW10gPSBuZXcgQXJyYXk7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBBdWRpb0JhbmQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpOiBBdWRpb0JhbmQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSA/IHRoaXMuX2luc3RhbmNlIDogdGhpcy5faW5zdGFuY2UgPSBuZXcgQXVkaW9CYW5kOyBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgTG9hZCh1cmwsIGNvbXBsZXRlZD86IExheWEuSGFuZGxlciwgZXJyZXI/OiBMYXlhLkhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLmJhbmRzID0gbmV3IEFycmF5O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIG9uTG9hZCgpIHtcclxuICAgICAgICAgICAgbGV0IGpzb24gPSBMYXlhLmxvYWRlci5nZXRSZXModXJsKTtcclxuICAgICAgICAgICAgaWYgKGpzb24gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgb25FcnJlcigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvZmYoKTtcclxuICAgICAgICAgICAgdGhpcy5Mb2FkSnNvbihqc29uKTtcclxuICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCAhPSBudWxsKSB7IGNvbXBsZXRlZC5ydW4oKTsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBvbkVycmVyKCkge1xyXG4gICAgICAgICAgICBvZmYoKTtcclxuICAgICAgICAgICAgaWYgKGVycmVyICE9IG51bGwpIHsgZXJyZXIucnVuV2l0aChcIumfs+mikeivu+WPluWksei0pVwiKTsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBvZmYoKSB7IExheWEubG9hZGVyLm9mZihMYXlhLkV2ZW50LkVSUk9SLCB0aGlzLCBvbkVycmVyKTsgfVxyXG5cclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHVybCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBvbkxvYWQpLCBudWxsLCBMYXlhLkxvYWRlci5KU09OKTtcclxuICAgICAgICBMYXlhLmxvYWRlci5vbihMYXlhLkV2ZW50LkVSUk9SLCB0aGlzLCBvbkVycmVyKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBMb2FkSnNvbihqc29uKSB7XHJcbiAgICAgICAgbGV0IGJhbmRzID0ganNvbltcImJhbmRzXCJdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmFuZHMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBiYW5kOiBCYW5kID0gbmV3IEJhbmQoKTtcclxuICAgICAgICAgICAgbGV0IGRhdGE6IHN0cmluZyA9IGJhbmRzW2ldO1xyXG4gICAgICAgICAgICBsZXQgc3RyQXJ5ID0gZGF0YS5zcGxpdChcInxcIik7XHJcbiAgICAgICAgICAgIGJhbmQudGltZUFwcGVhciA9IHBhcnNlRmxvYXQoc3RyQXJ5WzBdKTtcclxuICAgICAgICAgICAgc3RyQXJ5ID0gc3RyQXJ5WzFdLnNwbGl0KFwiLFwiKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzdHJBcnkubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBudW0gPSBwYXJzZUZsb2F0KHN0ckFyeVtqXSkgLyAxMDAwMDtcclxuICAgICAgICAgICAgICAgIGJhbmQuYnVmZmVyLnB1c2gobnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJhbmRzLnB1c2goYmFuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkYXRhID0gYmFuZHNbYmFuZHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgbGV0IHN0ckFyeSA9IGRhdGEuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgIHN0ckFyeSA9IHN0ckFyeVsxXS5zcGxpdChcIixcIik7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN0ckFyeS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmJhbmRIaWdoZXN0QnVmZmVyLnB1c2gocGFyc2VGbG9hdChzdHJBcnlbaV0pIC8gMTAwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QmFuZENoYW5nZShiYW5kSW5kZXgsIGluZGV4KTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgYmFuZCA9IHRoaXMuYmFuZHNbaW5kZXhdO1xyXG4gICAgICAgIGxldCBwID0gYmFuZC5idWZmZXJbYmFuZEluZGV4XSAvIHRoaXMuYmFuZEhpZ2hlc3RCdWZmZXJbYmFuZEluZGV4XTtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQmFuZCB7XHJcbiAgICBwdWJsaWMgdGltZUFwcGVhcjogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBidWZmZXI6IG51bWJlcltdID0gbmV3IEFycmF5O1xyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXVkaW9XcmFwZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBBdWRpb1dyYXBlcjtcclxuXHJcbiAgICBwcml2YXRlIHVybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBsb2FkSGFuZGVyOiBMYXlhLkhhbmRsZXIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBlcnJvckhhbmRlcjogTGF5YS5IYW5kbGVyID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpOiBBdWRpb1dyYXBlciB7XHJcbiAgICAgICAgaWYgKEF1ZGlvV3JhcGVyLl9pbnN0YW5jZSA9PSBudWxsKVxyXG4gICAgICAgICAgICBBdWRpb1dyYXBlci5faW5zdGFuY2UgPSBuZXcgQXVkaW9XcmFwZXIoKTtcclxuICAgICAgICByZXR1cm4gQXVkaW9XcmFwZXIuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfc291bmQ6IExheWEuU291bmQgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfc291bmRDaGFubmVsOiBMYXlhLlNvdW5kQ2hhbm5lbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9wbGF5UG9zaXRpb246IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9zdGFydFBsYXlUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGdldCBTb3VuZENoYW5uZWwoKTogTGF5YS5Tb3VuZENoYW5uZWwgeyByZXR1cm4gdGhpcy5fc291bmRDaGFubmVsOyB9XHJcbiAgICBwdWJsaWMgZ2V0IElzU3RvcGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc291bmRDaGFubmVsLmlzU3RvcHBlZDsgfVxyXG5cclxuICAgIHB1YmxpYyBMb2FkKHVybCwgY29tcGxldGVkPzogTGF5YS5IYW5kbGVyLCBlcnJlcj86IExheWEuSGFuZGxlcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9zb3VuZENoYW5uZWwgIT0gbnVsbCAmJiB0aGlzLl9zb3VuZENoYW5uZWwudXJsID09IHVybCkge1xyXG4gICAgICAgICAgICBpZiAoY29tcGxldGVkICE9IG51bGwpIHsgY29tcGxldGVkLnJ1bigpOyB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICAgICAgdGhpcy5DbGVhckhhbmRlcigpO1xyXG4gICAgICAgIHRoaXMubG9hZEhhbmRlciA9IGNvbXBsZXRlZDtcclxuICAgICAgICB0aGlzLmVycm9ySGFuZGVyID0gZXJyZXI7XHJcbiAgICAgICAgbGV0IHNvdW5kOiBMYXlhLlNvdW5kID0gbnVsbDtcclxuICAgICAgICBsZXQgc291bmRDbGFzcyA9IExheWEuU291bmRNYW5hZ2VyLl9zb3VuZENsYXNzO1xyXG5cclxuICAgICAgICBpZiAoIUxheWEuQnJvd3Nlci5vbk1pbmlHYW1lKSB7c291bmQgPSBMYXlhLmxvYWRlci5nZXRSZXModXJsKTt9XHJcbiAgICAgICAgZnVuY3Rpb24gb25FcnJlcigpIHsgb2ZmKCk7IGlmIChlcnJlciAhPSBudWxsKSB7IGVycmVyLnJ1bldpdGgoXCLpn7PkuZDliqDovb3lpLHotKVcIik7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIG9uTG9hZCgpIHsgb2ZmKCk7IGlmIChjb21wbGV0ZWQgIT0gbnVsbCkgeyBjb21wbGV0ZWQucnVuKCk7IHRoaXMuQ2xlYXJIYW5kZXIoKTt9IH1cclxuICAgICAgICBmdW5jdGlvbiBvZmYoKSB7XHJcbiAgICAgICAgICAgIHNvdW5kLm9mZihMYXlhLkV2ZW50LkNPTVBMRVRFLCB0aGlzLCBvbkxvYWQpO1xyXG4gICAgICAgICAgICBzb3VuZC5vZmYoTGF5YS5FdmVudC5FUlJPUiwgdGhpcywgb25FcnJlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc291bmQgIT0gbnVsbCkgeyBcclxuICAgICAgICAgICAgdGhpcy5fc291bmQgPSBzb3VuZDsgb25Mb2FkLmNhbGwodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNvdW5kQ2xhc3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzb3VuZCA9IG5ldyBzb3VuZENsYXNzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvdW5kID0gc291bmQ7XHJcbiAgICAgICAgICAgIHNvdW5kLm9uKExheWEuRXZlbnQuQ09NUExFVEUsIHRoaXMsIG9uTG9hZCk7XHJcbiAgICAgICAgICAgIHNvdW5kLm9uKExheWEuRXZlbnQuRVJST1IsIHRoaXMsIG9uRXJyZXIpO1xyXG4gICAgICAgICAgICBzb3VuZC5sb2FkKHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBMb2FkUGxheSh1cmw6IHN0cmluZywgc3RhcnRUaW1lOiBudW1iZXIgPSAwLCBsb29wOiBudW1iZXIgPSAxKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5Tb29tdGhTdG9wKDAuNSk7XHJcbiAgICAgICAgLy8gdGhpcy5sb2FkSGFuZGVyID0gTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuUGxheSgwKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5DbGVhckhhbmRlcigpO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIHRoaXMuTG9hZCh1cmwsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXkoMCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xlYXJIYW5kZXIoKTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBsYXkobG9vcDogbnVtYmVyID0gMSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5DaGVja1N0YXRlKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5fc291bmRDaGFubmVsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9zb3VuZENoYW5uZWwuaXNTdG9wcGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZENoYW5uZWwucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBMYXlhLlR3ZWVuLmNsZWFyQWxsKHRoaXMuU291bmRDaGFubmVsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zb3VuZENoYW5uZWwgPT0gbnVsbCB8fCB0aGlzLl9zb3VuZENoYW5uZWwudXJsICE9IHRoaXMudXJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvdW5kQ2hhbm5lbCA9IHRoaXMuX3NvdW5kLnBsYXkoMCwgbG9vcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3NvdW5kQ2hhbm5lbC5pc1N0b3BwZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kQ2hhbm5lbC5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX3NvdW5kQ2hhbm5lbC52b2x1bWUgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VuZENoYW5uZWwuc3RhcnRUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fc291bmRDaGFubmVsLmxvb3BzID0gbG9vcDtcclxuICAgICAgICAgICAgdGhpcy5fc291bmRDaGFubmVsLnBsYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3BsYXlQb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRQbGF5VGltZSA9IChuZXcgRGF0ZSkuZ2V0VGltZSgpO1xyXG4gICAgICAgIExheWEuU291bmRNYW5hZ2VyLl9iZ011c2ljID0gdGhpcy5fc291bmRDaGFubmVsLnVybDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUGxheUZyb21UaW1lKHN0YXJ0VGltZTogbnVtYmVyLCBsb29wOiBudW1iZXIgPSAxKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLkNoZWNrU3RhdGUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fc291bmRDaGFubmVsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9zb3VuZENoYW5uZWwuaXNTdG9wcGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZENoYW5uZWwucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBMYXlhLlR3ZWVuLmNsZWFyQWxsKHRoaXMuU291bmRDaGFubmVsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zb3VuZENoYW5uZWwgPT0gbnVsbCB8fCB0aGlzLl9zb3VuZENoYW5uZWwudXJsICE9IHRoaXMudXJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvdW5kQ2hhbm5lbCA9IHRoaXMuX3NvdW5kLnBsYXkoc3RhcnRUaW1lLCBsb29wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fc291bmRDaGFubmVsLmlzU3RvcHBlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc291bmRDaGFubmVsLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fc291bmRDaGFubmVsLnZvbHVtZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvdW5kQ2hhbm5lbC5zdGFydFRpbWUgPSBzdGFydFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvdW5kQ2hhbm5lbC5sb29wcyA9IGxvb3A7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvdW5kQ2hhbm5lbC5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9wbGF5UG9zaXRpb24gPSBzdGFydFRpbWU7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRQbGF5VGltZSA9IChuZXcgRGF0ZSkuZ2V0VGltZSgpO1xyXG4gICAgICAgIExheWEuU291bmRNYW5hZ2VyLl9iZ011c2ljID0gdGhpcy5fc291bmRDaGFubmVsLnVybDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU3RvcCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5Tb3VuZENoYW5uZWwgPT0gbnVsbCB8fCB0aGlzLklzU3RvcGVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fc291bmRDaGFubmVsLmlzU3RvcHBlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VuZENoYW5uZWwucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIuX2JnTXVzaWMgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTb29tdGhTdG9wKGR1cmF0aW9uOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5Tb3VuZENoYW5uZWwgPT0gbnVsbCB8fCB0aGlzLklzU3RvcGVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIExheWEuVHdlZW4uY2xlYXJBbGwodGhpcy5Tb3VuZENoYW5uZWwpO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5Tb3VuZENoYW5uZWwsIHsgdm9sdW1lOiAwLjEgfSwgZHVyYXRpb24gKiAxMDAwLCBMYXlhLkVhc2UubGluZWFyTm9uZSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5Jc1N0b3BlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc291bmRDaGFubmVsLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIuX2JnTXVzaWMgPSBcIlwiO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUGF1c2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuU291bmRDaGFubmVsID09IG51bGwgKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX3BsYXlQb3NpdGlvbiA9IHRoaXMuUGxheVBvc2l0aW9uO1xyXG4gICAgICAgIGlmICghdGhpcy5fc291bmRDaGFubmVsLmlzU3RvcHBlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VuZENoYW5uZWwucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlc3VtZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5Tb3VuZENoYW5uZWwgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLlNvdW5kQ2hhbm5lbC5yZXN1bWUoKTtcclxuICAgICAgICAvLyB0aGlzLl9zb3VuZENoYW5uZWwuc3RhcnRUaW1lID0gdGhpcy5fcGxheVBvc2l0aW9uO1xyXG4gICAgICAgIC8vIHRoaXMuX3NvdW5kQ2hhbm5lbC5wbGF5KCk7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRQbGF5VGltZSA9IChuZXcgRGF0ZSkuZ2V0VGltZSgpO1xyXG4gICAgICAgIC8vdGhpcy5fcGxheVBvc2l0aW9uID0gdGhpcy5Tb3VuZENoYW5uZWwucG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBQbGF5UG9zaXRpb24oKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5Jc1N0b3BlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGxheVBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpIHtcclxuICAgICAgICAgICAgbGV0IHRpbWUgPSAoKG5ldyBEYXRlKS5nZXRUaW1lKCkgLSB0aGlzLl9zdGFydFBsYXlUaW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BsYXlQb3NpdGlvbiArIHRpbWUgKiAuMDAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXR1cm4gdGhpcy5Tb3VuZENoYW5uZWwucG9zaXRpb247XHJcblxyXG4gICAgICAgIGxldCB0aW1lID0gKChuZXcgRGF0ZSkuZ2V0VGltZSgpIC0gdGhpcy5fc3RhcnRQbGF5VGltZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYXlQb3NpdGlvbiArIHRpbWUgKiAuMDAxO1xyXG4gICAgICAgIC8vIGxldCB0aW1lID0gKChuZXcgRGF0ZSkuZ2V0VGltZSgpIC0gdGhpcy5fc3RhcnRQbGF5VGltZSk7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiB0aGlzLl9wbGF5UG9zaXRpb24gKyB0aW1lICogLjAwMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5TdG9wKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NvdW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc291bmQuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VuZCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9zb3VuZENoYW5uZWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VuZENoYW5uZWwuc3RvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VuZENoYW5uZWwgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5fYmdNdXNpYyA9IFwiXCI7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIuY2xlYXJSZXModGhpcy51cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2xlYXJIYW5kZXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9hZEhhbmRlciAhPSBudWxsIHx8IHRoaXMubG9hZEhhbmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRIYW5kZXIuY2xlYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSGFuZGVyLnJlY292ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSGFuZGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVycm9ySGFuZGVyICE9IG51bGwgfHwgdGhpcy5lcnJvckhhbmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9ySGFuZGVyLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kZXIucmVjb3ZlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmVycm9ySGFuZGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDaGVja1N0YXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9zb3VuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K+35YWI6LCD55SoTG9hZOWujOaIkGNvbXBsZXRlZOWQjiDosIPnlKhQbGF5IOi/m+ihjOaSreaUvlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufSIsImltcG9ydCBBdWRpb0JhbmQgZnJvbSBcIi4vQXVkaW9CYW5kXCI7XHJcbmltcG9ydCBBdWRpb1dyYXBlciBmcm9tIFwiLi9BdWRpb1dyYXBlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFuZEJlaGF2aW9yIGV4dGVuZHMgTGF5YS5TY3JpcHQzRCB7XHJcblxyXG4gICAgcHVibGljIGJhbmRJbmRleDtcclxuXHJcbiAgICBwcml2YXRlIGN1cnJJbmRleCA9IDA7XHJcbiAgICBwcml2YXRlIGVuZEluZGV4ID0gMDtcclxuXHJcbiAgICBwdWJsaWMgU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEF1ZGlvQmFuZC5JbnN0YW5jZS5iYW5kcy5sZW5ndGggPCA1MCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY3VyckluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmVuZEluZGV4ID0gQXVkaW9CYW5kLkluc3RhbmNlLmJhbmRzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgbGV0IGN1ckJhbmQgPSBBdWRpb0JhbmQuSW5zdGFuY2UuYmFuZHNbdGhpcy5jdXJySW5kZXhdO1xyXG4gICAgICAgIGxldCBuZXh0QmFuZCA9IEF1ZGlvQmFuZC5JbnN0YW5jZS5iYW5kc1t0aGlzLmN1cnJJbmRleCArIDFdO1xyXG4gICAgICAgIExheWEudGltZXIuZnJhbWVMb29wKDEsIHRoaXMsIHRoaXMuVXBkYXRlKTtcclxuICAgICAgICB0aGlzLm9uQmFuZENoYW5nZShjdXJCYW5kLnRpbWVBcHBlYXIsIG5leHRCYW5kLnRpbWVBcHBlYXIsIG5leHRCYW5kLmJ1ZmZlclt0aGlzLmJhbmRJbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTdG9wKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25CYW5kRW5kKCk7XHJcbiAgICAgICAgTGF5YS50aW1lci5jbGVhckFsbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoQXVkaW9XcmFwZXIuSW5zdGFuY2UuU291bmRDaGFubmVsID09IG51bGwgfHwgQXVkaW9XcmFwZXIuSW5zdGFuY2UuSXNTdG9wZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cnJlblRpbWUgPSBBdWRpb1dyYXBlci5JbnN0YW5jZS5QbGF5UG9zaXRpb247XHJcbiAgICAgICAgbGV0IGN1ckJhbmQgPSBBdWRpb0JhbmQuSW5zdGFuY2UuYmFuZHNbdGhpcy5jdXJySW5kZXhdO1xyXG4gICAgICAgIGxldCBuZXh0QmFuZCA9IEF1ZGlvQmFuZC5JbnN0YW5jZS5iYW5kc1t0aGlzLmN1cnJJbmRleCArIDFdO1xyXG4gICAgICAgIGlmIChjdXJyZW5UaW1lID4gbmV4dEJhbmQudGltZUFwcGVhcikge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJJbmRleCArPSAyO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJySW5kZXggPj0gdGhpcy5lbmRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdG9wKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VyQmFuZCA9IEF1ZGlvQmFuZC5JbnN0YW5jZS5iYW5kc1t0aGlzLmN1cnJJbmRleF07XHJcbiAgICAgICAgICAgIG5leHRCYW5kID0gQXVkaW9CYW5kLkluc3RhbmNlLmJhbmRzW3RoaXMuY3VyckluZGV4ICsgMV07XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhdWRpb1Bvc2l0aW9uOlwiICsgY3VycmVuVGltZSArIFwidGltZUFwcGVhcjpcIiArIG5leHRCYW5kLnRpbWVBcHBlYXIpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQmFuZENoYW5nZShjdXJCYW5kLnRpbWVBcHBlYXIsIG5leHRCYW5kLnRpbWVBcHBlYXIsIEF1ZGlvQmFuZC5JbnN0YW5jZS5nZXRCYW5kQ2hhbmdlKHRoaXMuYmFuZEluZGV4LCB0aGlzLmN1cnJJbmRleCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25CYW5kQ2hhbmdlKGN1clRpbWUsIG5leHRUaW1lLCBudW0pOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQmFuZEVuZCgpOiB2b2lkIHtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIExlcnAobnVtMSwgbnVtMiwgdCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIG51bTEgKyB0ICogKG51bTIgLSBudW0xKTtcclxuICAgIH1cclxufSIsImltcG9ydCBCYW5kQmVoYXZpb3IgZnJvbSBcIi4vQmFuZEJlaGF2aW9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhbUN1YmUgZXh0ZW5kcyBCYW5kQmVoYXZpb3Ige1xyXG5cclxuICAgIHB1YmxpYyBzdGFydFNjYWxlWTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBtYXhTY2FsZVk6bnVtYmVyID0gNztcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGdhbWVPYmplY3QoKTogTGF5YS5TcHJpdGUzRCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3duZXIgYXMgTGF5YS5TcHJpdGUzRDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25CYW5kQ2hhbmdlKGN1clRpbWUsIG5leHRUaW1lLCBudW0pOiB2b2lkIHtcclxuICAgICAgICBMYXlhLlR3ZWVuLmNsZWFyQWxsKHRoaXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzY2FsZSA9IHRoaXMuZ2FtZU9iamVjdC50cmFuc2Zvcm0ubG9jYWxTY2FsZTtcclxuICAgICAgICBsZXQgbmV3U2NhbGVZID0gbnVtICogdGhpcy5tYXhTY2FsZVkgKyB0aGlzLnN0YXJ0U2NhbGVZO1xyXG4gICAgICAgIGxldCBjaGFuZ2VUaW1lID0gKG5leHRUaW1lIC0gY3VyVGltZSkgKiAxMDAwO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJzY2FsZVk6XCIgKyBuZXdTY2FsZVkgKyBcIlRpbWU6XCIgKyBjaGFuZ2VUaW1lICsgXCJudW06XCIgKyBudW0pO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5nYW1lT2JqZWN0LnRyYW5zZm9ybSwge2xvY2FsU2NhbGVZOiBuZXdTY2FsZVl9LCBjaGFuZ2VUaW1lKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIG9uQmFuZEVuZCgpOiB2b2lkIHtcclxuICAgICAgICBMYXlhLlR3ZWVuLmNsZWFyQWxsKHRoaXMpO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5nYW1lT2JqZWN0LnRyYW5zZm9ybSwge2xvY2FsU2NhbGVZOiB0aGlzLnN0YXJ0U2NhbGVZfSwgMSAqIDEwMDApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEV2ZW50X215cXFfTWdyIGZyb20gXCIuLi9FdmVudC9FdmVudE1nclwiO1xyXG5pbXBvcnQgTm90ZUJvYXJkIGZyb20gXCIuL05vdGVCb2FyZFwiO1xyXG5pbXBvcnQgR2FtZUNvbnRyb2xsZXIgZnJvbSBcIi4vR2FtZUNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFBoeXNpY1RyaWdnZXIzZCBmcm9tIFwiLi9Ub29scy9QaHlzaWNUcmlnZ2VyM2RcIjtcclxuaW1wb3J0IEZTTVN0YXRlTWFjaGluZSBmcm9tIFwiLi9Ub29scy9GU01TdGF0ZU1hY2hpbmVcIjtcclxuaW1wb3J0IE1vdXNlTWdyIGZyb20gXCIuL01vdXNlTWdyXCI7XHJcbmltcG9ydCBOb3RlTWFuYWdlciwgeyBCZWF0IH0gZnJvbSBcIi4vTm90ZU1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi9HYW1lQ29uc3RcIjtcclxuaW1wb3J0IEF1ZGlvV3JhcGVyIGZyb20gXCIuL0F1ZGlvL0F1ZGlvV3JhcGVyXCI7XHJcbmltcG9ydCBOYXRpdmVDYWxsYmFjayBmcm9tIFwiLi4vTmF0aXZlQ2FsbGJhY2tcIjtcclxuLy9pbXBvcnQgQmFsbENvbnRyb2xsZXJUbWVwIGZyb20gXCIuL0F1ZGlvL0JhbGxDb250cm9sbGVyXCI7XHJcblxyXG5jb25zdCBTdGFuZDogc3RyaW5nID0gXCJTdGFuZFwiO1xyXG5jb25zdCBSdW46IHN0cmluZyA9IFwiUnVuXCI7XHJcbmNvbnN0IFJ1bkVuZDogc3RyaW5nID0gXCJSdW5FbmRcIjtcclxuY29uc3QgRGllOiBzdHJpbmcgPSBcIkRpZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gQmFsbENvbG9yIHtcclxuICAgIFJlZCwgWWVsbG93LCBCbHVlLFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWxsQ29udHJvbGxlciBleHRlbmRzIExheWEuU2NyaXB0M0Qge1xyXG4gICAgcHVibGljIGJhbGw6IExheWEuU3ByaXRlM0Q7XHJcbiAgICBwcml2YXRlIG9yaWdpbmFsUG9zOiBMYXlhLlZlY3RvcjM7XHJcbiAgICBwcml2YXRlIG9yaWdpbmFsU2NhbGU6IExheWEuVmVjdG9yMztcclxuICAgIHB1YmxpYyBjdXJDb2xvcjogQmFsbENvbG9yID0gQmFsbENvbG9yLlJlZDtcclxuICAgIHByaXZhdGUgbWVzaFJlbmRlcmVyOiBMYXlhLk1lc2hSZW5kZXJlcjtcclxuICAgIHByaXZhdGUgdHJhaWxNYXRlcmlhbDogTGF5YS5UcmFpbE1hdGVyaWFsO1xyXG4gICAgcHJpdmF0ZSBtb3VzZURvd25Qb3NpdGlvbjogTGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG5cclxuICAgIHByaXZhdGUgc29uZ0RlbGF5OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50VGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIGN1ck5vZGVJbmRleDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgZW5kTm9kZUluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBkaWVOb2RlSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHdheVNwYWNlOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSB3YXlUb3RhbDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgd2F5VG90YWxUaW1lOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGVNYWNoaW5lOiBGU01TdGF0ZU1hY2hpbmUgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgZ2FtZU9iamVjdCgpOiBMYXlhLlNwcml0ZTNEIHsgcmV0dXJuIHRoaXMub3duZXIgYXMgTGF5YS5TcHJpdGUzRDsgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNSdW4oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnN0YXRlTWFjaGluZS5jdXJTdGF0ZS5rZXkgPT0gUnVuOyB9XHJcbiAgICBwdWJsaWMgZ2V0IFJ1bkJlYXRJbmRleCgpOiBudW1iZXIge3JldHVybiB0aGlzLmN1ck5vZGVJbmRleDsgfVxyXG4gICAgcHVibGljIGdldCBmaW5pc2hQcm9ncmVzcygpOiBudW1iZXIgeyByZXR1cm4gTWF0aC5taW4oMSwgdGhpcy5jdXJOb2RlSW5kZXggLyB0aGlzLmVuZE5vZGVJbmRleCk7IH1cclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYmFsbCA9IHRoaXMuZ2FtZU9iamVjdC5nZXRDaGlsZEJ5TmFtZShcIkJhbGxcIikgYXMgTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICB0aGlzLm9yaWdpbmFsUG9zID0gdGhpcy5nYW1lT2JqZWN0LnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMub3JpZ2luYWxTY2FsZSA9IHRoaXMuYmFsbC50cmFuc2Zvcm0ubG9jYWxTY2FsZS5jbG9uZSgpO1xyXG4gICAgICAgIFBoeXNpY1RyaWdnZXIzZC5HZXRUcmlnZ2VyKHRoaXMuYmFsbCkuT25UcmlnZ2VyRW50ZXIodGhpcywgdGhpcy5vbkJhbGxUcmlnZ2VyRW50ZXIpO1xyXG4gICAgICAgIGxldCBtZXNoU3ByaXRlM2Q6IExheWEuTWVzaFNwcml0ZTNEID0gdGhpcy5iYWxsIGFzIExheWEuTWVzaFNwcml0ZTNEO1xyXG4gICAgICAgIHRoaXMubWVzaFJlbmRlcmVyID0gbWVzaFNwcml0ZTNkLl9yZW5kZXIgYXMgTGF5YS5NZXNoUmVuZGVyZXI7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGVNYWNoaW5lID0gbmV3IEZTTVN0YXRlTWFjaGluZSgpO1xyXG4gICAgICAgIHRoaXMuc3RhdGVNYWNoaW5lLkFkZEFjdGlvbihTdGFuZCk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1hY2hpbmUuQWRkQWN0aW9uKFJ1biwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLk9uU29uZ1J1biksIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5PblNvbmdSdW5FeGl0KSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1hY2hpbmUuQWRkQWN0aW9uKFJ1bkVuZCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLk9uUnVuRW5kQm9hcmQpKTtcclxuICAgICAgICB0aGlzLnN0YXRlTWFjaGluZS5BZGRBY3Rpb24oRGllLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMuT25EZWF0aCkpO1xyXG5cclxuICAgICAgICBsZXQgYmFsbFJpZ2lkYm9keSA9IHRoaXMuYmFsbC5nZXRDb21wb25lbnQoTGF5YS5SaWdpZGJvZHkzRCkgYXMgTGF5YS5SaWdpZGJvZHkzRDtcclxuICAgICAgICBiYWxsUmlnaWRib2R5LmNjZFN3ZXB0U3BoZXJlUmFkaXVzID0gMztcclxuICAgICAgICBiYWxsUmlnaWRib2R5LmNjZE1vdGlvblRocmVzaG9sZCA9IDAuMDAxO1xyXG5cclxuICAgICAgICBsZXQgdHJhaWxTcHJpdGUgPSB0aGlzLmJhbGwuZ2V0Q2hpbGRCeU5hbWUoXCJUVU9XRUlcIikgYXMgTGF5YS5UcmFpbFNwcml0ZTNEO1xyXG4gICAgICAgIHRoaXMudHJhaWxNYXRlcmlhbCA9IHRyYWlsU3ByaXRlLnRyYWlsUmVuZGVyZXIubWF0ZXJpYWwgYXMgTGF5YS5UcmFpbE1hdGVyaWFsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTdGFydChzb25nRGVsYXk6IG51bWJlciA9IDAsIHJ1bk5vZGVJbmRleDogbnVtYmVyID0gMCwgY29sb3I6IEJhbGxDb2xvciA9IEJhbGxDb2xvci5SZWQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZU1hY2hpbmUuY3VyU3RhdGUua2V5ID09IFJ1bikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5byA5aeL5ri45oiPLS0tIOmfs+S5kOW7tui/n+aXtumXtCA9IFwiICsgc29uZ0RlbGF5ICsgXCIgcnVuTm9kZUluZGV4ID0gXCIgKyBydW5Ob2RlSW5kZXggKyBcIiBjb2xvciA9PSBcIiArIGNvbG9yKTtcclxuICAgICAgICB0aGlzLlJlc3RQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMuQ2xlYXJTeW5jQXVkaW9UaW1lKCk7XHJcbiAgICAgICAgdGhpcy5iYWxsV2lsbEJvdW5jZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc29uZ0RlbGF5ID0gc29uZ0RlbGF5O1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlQ29sb3IoY29sb3IpO1xyXG4gICAgICAgIHRoaXMuU2V0UnVuUG9zaXRpb24ocnVuTm9kZUluZGV4KTtcclxuICAgICAgICB0aGlzLlJ1bigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgUnVuKCk6IHZvaWQgeyB0aGlzLnN0YXRlTWFjaGluZS5Td2l0Y2goUnVuKTsgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIE9uU29uZ1J1bigpIHtcclxuICAgICAgICAvL01vdXNlTWdyLkluc3RhbmNlLlJlc2V0TW91c2VPZmZzZXQoKTtcclxuICAgICAgICB0aGlzLm1vdXNlRG93blBvc2l0aW9uID0gdGhpcy5iYWxsLnRyYW5zZm9ybS5sb2NhbFBvc2l0aW9uLmNsb25lKClcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIum8oOagh+aMieS4i+S9jee9riA9IOWwj+eQg+acrOWcsOS9jee9riA9PSB4OlwiICsgdGhpcy5tb3VzZURvd25Qb3NpdGlvbi54ICsgXCIgeTpcIiArIHRoaXMubW91c2VEb3duUG9zaXRpb24ueSArIFwiIHo6XCIgKyB0aGlzLm1vdXNlRG93blBvc2l0aW9uLnopO1xyXG4gICAgICAgIExheWEudGltZXIuZnJhbWVMb29wKDEsIHRoaXMsIHRoaXMuVGltZURlbGF5TG9naWMpO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5NT1VTRV9VUCwgdGhpcywgdGhpcy5Pbk1vdXNlVXApO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLCB0aGlzLCB0aGlzLk9uTW91c2VEb3duKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uU29uZ1J1bkV4aXQoKSB7XHJcbiAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLCB0aGlzLlRpbWVEZWxheUxvZ2ljKTtcclxuICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsIHRoaXMuU29uZ1BsYXlMb2dpYyk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vZmYoTGF5YS5FdmVudC5NT1VTRV9ET1dOLCB0aGlzLCB0aGlzLk9uTW91c2VEb3duKTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9mZihMYXlhLkV2ZW50Lk1PVVNFX1VQLCB0aGlzLCB0aGlzLk9uTW91c2VVcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBUaW1lRGVsYXlMb2dpYygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50VGltZSA8IHRoaXMuc29uZ0RlbGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRpbWUgKz0gKExheWEudGltZXIuZGVsdGEgLyAxMDAwKTtcclxuICAgICAgICAgICAgLy8gTmF0aXZlQ2FsbGJhY2suU2hvd0xvZyhcIlJlZnJlc2ggY3VyckZyYW1lIFwiICsgTGF5YS50aW1lci5jdXJyRnJhbWUgKyBcIi0tLS1MYXlhLnRpbWVyLmRlbHRhLS0tLVwiICsgTGF5YS50aW1lci5kZWx0YSArIFwiIC0tLSBcIiArIHRoaXMuY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLlJlZnJlc2godGhpcy5jdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/pn7PkuZDlu7bov5/ml7bpl7TliLDkuoYg6K+l5pKt5pS+6Z+z5LmQO1xyXG4gICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcywgdGhpcy5UaW1lRGVsYXlMb2dpYyk7XHJcbiAgICAgICAgdGhpcy5sQXVkaW9UaW1lID0gQXVkaW9XcmFwZXIuSW5zdGFuY2UuUGxheVBvc2l0aW9uICsgdGhpcy5zb25nRGVsYXk7XHJcbiAgICAgICAgdGhpcy5yVGltZSA9IHRoaXMuY3VycmVudFRpbWUsIHRoaXMucFRpbWUgPSB0aGlzLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIExheWEudGltZXIuZnJhbWVMb29wKDEsIHRoaXMsIHRoaXMuU29uZ1BsYXlMb2dpYywgW3RoaXMuclRpbWUsIHRoaXMucFRpbWUsIHRoaXMubEF1ZGlvVGltZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgclRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcFRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbEF1ZGlvVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzeW5jQ291bnRlcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBTb25nUGxheUxvZ2ljKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmN1ck5vZGVJbmRleCA8IHRoaXMuZW5kTm9kZUluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaCh0aGlzLmN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVNYWNoaW5lLmN1clN0YXRlLmtleSA9PSBSdW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3luY0F1ZGlvVGltZSgwLjIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5SZWZyZXNoKEF1ZGlvTWFuYWdlci5JbnN0YW5jZS5Tb3VuZENoYW5uZWwucG9zaXRpb24vKkdhbWVDb250cm9sbGVyLkluc3RhbmNlLkN1cnJlbnRSdW5UaW1lKi8pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU3luY0F1ZGlvVGltZShwOiBudW1iZXIgPSAwLjIpIHtcclxuICAgICAgICBsZXQgZGVsdGFUaW1lID0gKExheWEudGltZXIuZGVsdGEgLyAxMDAwKTtcclxuICAgICAgICB0aGlzLnJUaW1lICs9IGRlbHRhVGltZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3luY0NvdW50ZXIgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3luY0NvdW50ZXItLTtcclxuICAgICAgICAgICAgdGhpcy5wVGltZSArPSBkZWx0YVRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKEdhbWVDb250cm9sbGVyLkluc3RhbmNlLlNvdW5kSW5QYXVzZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBUaW1lID0gR2FtZUNvbnRyb2xsZXIuSW5zdGFuY2Uuc291bmRQYXVzZVRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuclRpbWUgPSB0aGlzLnBUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gdGhpcy5yVGltZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChBdWRpb1dyYXBlci5JbnN0YW5jZS5Jc1N0b3BlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBUaW1lID0gdGhpcy5yVGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB0aW1lID0gQXVkaW9XcmFwZXIuSW5zdGFuY2UuUGxheVBvc2l0aW9uO1xyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5sQXVkaW9UaW1lIC0gdGltZSkgPCAwLjAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBUaW1lICs9IGRlbHRhVGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN5c25jRXZlbnRGcmFtZTogbnVtYmVyID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3luY0NvdW50ZXIgPSBzeXNuY0V2ZW50RnJhbWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBUaW1lID0gdGltZSArIHRoaXMuc29uZ0RlbGF5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY3VycmVudFRpbWU6XCIgKyB0aGlzLmN1cnJlbnRUaW1lICsgXCIgIEF1ZGlvVGltZTpcIiArIHRpbWUgKyBcIiAgYzpcIiArIE1hdGguYWJzKHRoaXMubEF1ZGlvVGltZSAtIHRpbWUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IHRoaXMuTGVycCh0aGlzLnJUaW1lLCB0aGlzLnBUaW1lLCBwKTtcclxuICAgICAgICB0aGlzLnJUaW1lID0gdGhpcy5jdXJyZW50VGltZTtcclxuICAgICAgICB0aGlzLmxBdWRpb1RpbWUgPSB0aGlzLnBUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2xlYXJTeW5jQXVkaW9UaW1lKCkge1xyXG4gICAgICAgIHRoaXMuc3luY0NvdW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMubEF1ZGlvVGltZSA9IHRoaXMuclRpbWUgPSB0aGlzLnBUaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDot7Pot4PooajnjrDnm7jlhbNcclxuICAgIHByaXZhdGUgdXBWID0gMDsgLy/lkJHkuIrnmoTliJ3pgJ9cclxuICAgIHByaXZhdGUgZG93bkcgPSAwOyAvLyDlkJHkuIvnmoRn5Yqg6YCf5bqmXHJcbiAgICBwcml2YXRlIGp1bXBIZWlnaHQgPSA0LjU7XHJcbiAgICBwcml2YXRlIGxvd2VySGVpZ2h0RmFjdG9yID0gMC40O1xyXG4gICAgcHJpdmF0ZSBoaWdoZXJIZWlnaHRGYWN0b3IgPSAwLjc7XHJcbiAgICBwcml2YXRlIGp1bXBTcGVlZCA9IDQ7XHJcbiAgICBwcml2YXRlIGJlYXREdXJhdGlvbiA9IDE7XHJcbiAgICBwcml2YXRlIGJhbGxXaWxsQm91bmNlID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGp1bXBGaXhlZEhlaWdodCA9IHRydWU7XHJcbiAgICBwcml2YXRlIFJlZnJlc2gocmVhbFRpbWUpIHtcclxuICAgICAgICBsZXQgY3VyQmVhdCA9IE5vdGVNYW5hZ2VyLkluc3RhbmNlLkdldEJlYXQodGhpcy5jdXJOb2RlSW5kZXgpO1xyXG4gICAgICAgIGxldCBuZXh0QmVhdCA9IE5vdGVNYW5hZ2VyLkluc3RhbmNlLkdldEJlYXQodGhpcy5jdXJOb2RlSW5kZXggKyAxKTtcclxuICAgICAgICBpZiAocmVhbFRpbWUgPiBuZXh0QmVhdC50aW1lQXBwZWFyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJhbGxXaWxsQm91bmNlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyTm9kZUluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGxXaWxsQm91bmNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJOb2RlSW5kZXggPj0gdGhpcy5lbmROb2RlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlTWFjaGluZS5Td2l0Y2goUnVuRW5kKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZWFsVGltZSA9IG5leHRCZWF0LnRpbWVBcHBlYXI7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmVhdHMgPSBOb3RlTWFuYWdlci5JbnN0YW5jZS5zb25nTm90ZS5iZWF0cztcclxuICAgICAgICAgICAgICAgIGN1ckJlYXQgPSBOb3RlTWFuYWdlci5JbnN0YW5jZS5HZXRCZWF0KHRoaXMuY3VyTm9kZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIG5leHRCZWF0ID0gTm90ZU1hbmFnZXIuSW5zdGFuY2UuR2V0QmVhdCh0aGlzLmN1ck5vZGVJbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TZXRCYWxsTW92ZW1lbnQoY3VyQmVhdCwgbmV4dEJlYXQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLlVwZGF0ZVBvc2l0aW9uKGN1ckJlYXQudGltZUFwcGVhciwgcmVhbFRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2V0SnVtcEZvcmNlKGN1ck5vZGVUaW1lLCBuZXh0Tm9kZVRpbWUpIHtcclxuICAgICAgICBsZXQgbGVhZFRpbWUgPSAobmV4dE5vZGVUaW1lIC0gY3VyTm9kZVRpbWUpIC8gMi4wO1xyXG4gICAgICAgIGlmICh0aGlzLmp1bXBGaXhlZEhlaWdodCkge1xyXG4gICAgICAgICAgICBsZXQgVGFyZ2V0SGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgbGV0IGxlYWRUaW1lSGFsZiA9IGxlYWRUaW1lIC8gdGhpcy5iZWF0RHVyYXRpb247XHJcbiAgICAgICAgICAgIGlmIChsZWFkVGltZUhhbGYgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICBUYXJnZXRIZWlnaHQgPSB0aGlzLmp1bXBIZWlnaHQgKiAoMSAtICgxIC0gbGVhZFRpbWVIYWxmKSAqIHRoaXMubG93ZXJIZWlnaHRGYWN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVGFyZ2V0SGVpZ2h0ID0gdGhpcy5qdW1wSGVpZ2h0ICogKDEgKyAobGVhZFRpbWVIYWxmIC0gMSkgKiB0aGlzLmhpZ2hlckhlaWdodEZhY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5kb3duRyA9IC0yICogVGFyZ2V0SGVpZ2h0IC8gKGxlYWRUaW1lICogbGVhZFRpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLnVwViA9IC10aGlzLmRvd25HICogbGVhZFRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnVwViA9IHRoaXMuanVtcFNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLmRvd25HID0gLXRoaXMudXBWIC8gbGVhZFRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2V0TW92ZVNwYWNlKGN1ck5vZGU6IEJlYXQsIG5leHROb2RlOiBCZWF0KTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGN1ckJvYXJkID0gR2FtZUNvbnRyb2xsZXIuSW5zdGFuY2UuYm9hcmRNYW5hZ2VyLkdldE5vdGVCb2FyZGJ5QmVhdChjdXJOb2RlKTtcclxuICAgICAgICAgICAgbGV0IG5leHRCb2FyZCA9IEdhbWVDb250cm9sbGVyLkluc3RhbmNlLmJvYXJkTWFuYWdlci5HZXROb3RlQm9hcmRieUJlYXQobmV4dE5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLndheVRvdGFsVGltZSA9IG5leHROb2RlLnRpbWVBcHBlYXIgLSBjdXJOb2RlLnRpbWVBcHBlYXI7XHJcbiAgICAgICAgICAgIGxldCBvbGRXYXkgPSB0aGlzLndheVNwYWNlO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIndheVNwYWNlID09IFwiICsgdGhpcy53YXlTcGFjZSk7XHJcbiAgICAgICAgICAgIGxldCBuZXdXYXkgPSBuZXh0Qm9hcmQuZ2FtZU9iamVjdC50cmFuc2Zvcm0ucG9zaXRpb24ueiAtIGN1ckJvYXJkLmdhbWVPYmplY3QudHJhbnNmb3JtLnBvc2l0aW9uLno7XHJcbiAgICAgICAgICAgIHRoaXMud2F5U3BhY2UgPSBuZXdXYXk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwibmV3V2F5ID0gXCIgKyBuZXdXYXkpO1xyXG4gICAgICAgICAgICB0aGlzLndheVRvdGFsICs9IG9sZFdheTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ3YXlUb3RhbCA9IFwiICsgdGhpcy53YXlUb3RhbCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XHJcbiAgICAgICAgLy90aGlzLmJhbGwudHJhbnNmb3JtLmxvY2FsUG9zaXRpb25ZID0gMDtcclxuICAgICAgICBsZXQgcG9zaXRpb246IExheWEuVmVjdG9yMyA9IHRoaXMuZ2FtZU9iamVjdC50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBwb3NpdGlvbi5zZXRWYWx1ZShwb3NpdGlvbi54LCBwb3NpdGlvbi55LCB0aGlzLndheVRvdGFsKTtcclxuICAgICAgICB0aGlzLmdhbWVPYmplY3QudHJhbnNmb3JtLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgLy8gTmF0aXZlQ2FsbGJhY2suU2hvd0xvZyhcImdhbWVvYmplY3QgcG9zID0gXCIrIEpTT04uc3RyaW5naWZ5KHRoaXMuZ2FtZU9iamVjdC50cmFuc2Zvcm0ucG9zaXRpb24pKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNldEJhbGxNb3ZlbWVudChjdXJCZWF0OiBCZWF0LCBuZXh0QmVhdDogQmVhdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuU2V0TW92ZVNwYWNlKGN1ckJlYXQsIG5leHRCZWF0KTtcclxuICAgICAgICB0aGlzLlNldEp1bXBGb3JjZShjdXJCZWF0LnRpbWVBcHBlYXIsIG5leHRCZWF0LnRpbWVBcHBlYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgVXBkYXRlUG9zaXRpb24oY3VyVGltZSwgcmVhbFRpbWUpIHtcclxuICAgICAgICBsZXQgdGltZSA9IHJlYWxUaW1lIC0gY3VyVGltZTtcclxuICAgICAgICBpZiAodGltZSA8IDAuMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygoXCJzb21ldGhpbmcgd3Jvbmc6IFwiICsgcmVhbFRpbWUgKyBcIiA8IFwiICsgY3VyVGltZSArIFwiIDogYXVkaW9UaW1lPVwiICsgQXVkaW9XcmFwZXIuSW5zdGFuY2UuUGxheVBvc2l0aW9uICsgXCIgOiBjTm90ZVRpbWU9XCIgKyBOb3RlTWFuYWdlci5JbnN0YW5jZS5zb25nTm90ZS5iZWF0c1t0aGlzLmN1ck5vZGVJbmRleF0udGltZUFwcGVhcikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKE1vdXNlTWdyLkluc3RhbmNlLmlzRG93bikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgTWF4WCA9IEdhbWVDb25zdC5Cb2FyZEludGVydmFsO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMubW91c2VEb3duUG9zaXRpb24ueCArIC1Nb3VzZU1nci5JbnN0YW5jZS5HZXRNb3VzZU9mZnNldEJ5U2l6ZSgwLjAzLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSkueDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFsbC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvblggPSB0aGlzLkxlcnAodGhpcy5iYWxsLnRyYW5zZm9ybS5sb2NhbFBvc2l0aW9uWCAtIHRoaXMub3JpZ2luYWxQb3MueCwgTWF0aC5tYXgoLU1heFgsIE1hdGgubWluKE1heFgsIG9mZnNldCkpLCAxIC8gNjAgKiAyMCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuiuvue9ruWwj+eQgyB4ID0gXCIgKyB0aGlzLmJhbGwudHJhbnNmb3JtLmxvY2FsUG9zaXRpb25YKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBwcm9jZXNzID0gMC43O1xyXG4gICAgICAgICAgICBsZXQgeSA9ICh0aGlzLnVwViArICh0aGlzLmRvd25HICogdGltZSAvIDIpKSAqIHRpbWU7XHJcbiAgICAgICAgICAgIGxldCBjdXJXYXkgPSB0aGlzLndheVNwYWNlICogKHRpbWUgLyB0aGlzLndheVRvdGFsVGltZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmFsbC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvblkgPSB0aGlzLkxlcnAodGhpcy5iYWxsLnRyYW5zZm9ybS5sb2NhbFBvc2l0aW9uWSwgeSwgcHJvY2Vzcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZU9iamVjdC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvblogPSB0aGlzLkxlcnAodGhpcy5nYW1lT2JqZWN0LnRyYW5zZm9ybS5sb2NhbFBvc2l0aW9uWiwgdGhpcy53YXlUb3RhbCArIGN1cldheSwgcHJvY2Vzcyk7Ly93b3JsZFNjYWxlICogdGhpcy53b3JsZExlbmd0aDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYmFsbC50cmFuc2Zvcm0ucG9zaXRpb24ueSA8IC0zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRlYXRoKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgTGVycChudW0xLCBudW0yLCB0KTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gbnVtMSArIHQgKiAobnVtMiAtIG51bTEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25SdW5FbmRCb2FyZCgpIHtcclxuICAgICAgICB0aGlzLlBsYXlCb21iRWZmZWN0KCk7XHJcbiAgICAgICAgR2FtZUNvbnRyb2xsZXIuSW5zdGFuY2UuR2FtZUVuZCgpO1xyXG4gICAgICAgIC8vIGxldCBwb3NpdGlvbjogTGF5YS5WZWN0b3IzID0gdGhpcy5iYWxsLnRyYW5zZm9ybS5sb2NhbFBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgLy8gcG9zaXRpb24uc2V0VmFsdWUocG9zaXRpb24ueCwgdGhpcy5vcmlnaW5hbFBvcy55LCBwb3NpdGlvbi56KTtcclxuICAgICAgICAvLyB0aGlzLmJhbGwudHJhbnNmb3JtLmxvY2FsUG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQWN0aXZlU3RhbmQoaXNBY3RpdmU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWFjaGluZS5Td2l0Y2goaXNBY3RpdmUgPyBTdGFuZCA6IFJ1bik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIERlYXRoKGlzRHJvcG91dCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlTWFjaGluZS5jdXJTdGF0ZS5rZXkgPT0gRGllKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1hY2hpbmUuU3dpdGNoKERpZSwgaXNEcm9wb3V0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uRGVhdGgoaXNEcm9wb3V0OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5kaWVOb2RlSW5kZXggPSB0aGlzLmN1ck5vZGVJbmRleDtcclxuICAgICAgICBpZiAoaXNEcm9wb3V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFsbC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvblkgPSAtMTAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheUJvbWJFZmZlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZUNvbnRyb2xsZXIuSW5zdGFuY2UuR2FtZUZhaWx1cmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVzdXJyZWN0aW9uKCkge1xyXG4gICAgICAgIGxldCByZXN1cnJlY3Rpb25JbmRleCA9IHRoaXMuZGllTm9kZUluZGV4O1xyXG4gICAgICAgIHJlc3VycmVjdGlvbkluZGV4ICs9IDE7XHJcbiAgICAgICAgaWYgKHJlc3VycmVjdGlvbkluZGV4ID49IHRoaXMuZW5kTm9kZUluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVNYWNoaW5lLlN3aXRjaChSdW5FbmQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU2V0UnVuUG9zaXRpb24ocmVzdXJyZWN0aW9uSW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXRSdW5Qb3NpdGlvbihub2RlSW5kZXgpOiB2b2lkIHtcclxuICAgICAgICAvLyBOYXRpdmVDYWxsYmFjay5TaG93TG9nKFwi6K6+572u6LW35aeL54K5LS0tLS0tLS0tLS0tLS0tXCIgKyBub2RlSW5kZXgpO1xyXG4gICAgICAgIGxldCBzb25nQmVhdHMgPSBOb3RlTWFuYWdlci5JbnN0YW5jZS5zb25nTm90ZS5iZWF0cztcclxuICAgICAgICB0aGlzLmN1ck5vZGVJbmRleCA9IG5vZGVJbmRleDtcclxuICAgICAgICB0aGlzLmVuZE5vZGVJbmRleCA9IHNvbmdCZWF0cy5sZW5ndGggLSAxO1xyXG4gICAgICAgIGxldCBjdXJCZWF0ID0gc29uZ0JlYXRzW25vZGVJbmRleF07XHJcbiAgICAgICAgbGV0IG5leHRCZWF0ID0gc29uZ0JlYXRzW25vZGVJbmRleCArIDFdO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZW5kTm9kZUluZGV4ID0gXCIgKyB0aGlzLmVuZE5vZGVJbmRleCAgKyBcIiAgY3VyQmVhdCA9IFwiICsgSlNPTi5zdHJpbmdpZnkoY3VyQmVhdCkgKyBcIiAgbmV4dEJlYXQgPSBcIiArIEpTT04uc3RyaW5naWZ5KG5leHRCZWF0KSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IGN1ckJlYXQudGltZUFwcGVhcjtcclxuICAgICAgICAvLyBOYXRpdmVDYWxsYmFjay5TaG93TG9nKFwiU2V0UnVuUG9zaXRpb24gdGhpcy5jdXJyZW50VGltZSA9IFwiICsgdGhpcy5jdXJyZW50VGltZSk7XHJcbiAgICAgICAgdGhpcy5TZXRCYWxsTW92ZW1lbnQoY3VyQmVhdCwgbmV4dEJlYXQpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlUG9zaXRpb24oY3VyQmVhdC50aW1lQXBwZWFyLCBjdXJCZWF0LnRpbWVBcHBlYXIpO1xyXG4gICAgICAgIGxldCBib2FyZCA9IEdhbWVDb250cm9sbGVyLkluc3RhbmNlLmJvYXJkTWFuYWdlci5HZXROb3RlQm9hcmRieUJlYXQoY3VyQmVhdCk7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gYm9hcmQuR2V0Tm90ZUNvbG9yUG9zaXRpb24oY3VyQmVhdCwgdGhpcy5jdXJDb2xvcik7XHJcbiAgICAgICAgcG9zaXRpb24uc2V0VmFsdWUocG9zaXRpb24ueCwgdGhpcy5vcmlnaW5hbFBvcy55LCBwb3NpdGlvbi56KTtcclxuICAgICAgICB0aGlzLmJhbGwudHJhbnNmb3JtLmxvY2FsUG9zaXRpb24gPSBwb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi6K6+572u5bCP55CD6LW35aeL54K5bG9jYWxQb3NpdGlvbiB4OlwiICsgcG9zaXRpb24ueCArIFwiICAgeTogIFwiICsgdGhpcy5vcmlnaW5hbFBvcy55ICsgXCIgIHogOiBcIiArICBwb3NpdGlvbi56KVxyXG4gICAgICAgIHRoaXMuYmFsbC50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IHRoaXMub3JpZ2luYWxTY2FsZS5jbG9uZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDaGFuZ2VDb2xvcihjb2xvcjogQmFsbENvbG9yKSB7XHJcbiAgICAgICAgbGV0IGNvbG9yNCA9IG5ldyBMYXlhLlZlY3RvcjQoKTtcclxuICAgICAgICBsZXQgbWF0ZXJpYWwgPSBHYW1lQ29udHJvbGxlci5JbnN0YW5jZS5HZXRDb2xvck1hdGVyaWFsKGNvbG9yLCBjb2xvcjQpO1xyXG4gICAgICAgIGlmIChtYXRlcmlhbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tZXNoUmVuZGVyZXIubWF0ZXJpYWwgPSBHYW1lQ29udHJvbGxlci5JbnN0YW5jZS5HZXRDb2xvck1hdGVyaWFsKGNvbG9yLCBjb2xvcjQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY3VyQ29sb3IgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLnRyYWlsTWF0ZXJpYWwuY29sb3IgPSBjb2xvcjQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuUmVzdFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5DbGVhclN5bmNBdWRpb1RpbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFJlc3RQb3NpdGlvbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLndheVNwYWNlID0gMDtcclxuICAgICAgICB0aGlzLndheVRvdGFsID0gMDtcclxuICAgICAgICB0aGlzLndheVRvdGFsVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5iYWxsLnRyYW5zZm9ybS5sb2NhbFNjYWxlID0gdGhpcy5vcmlnaW5hbFNjYWxlLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5iYWxsLnRyYW5zZm9ybS5sb2NhbFBvc2l0aW9uID0gdGhpcy5vcmlnaW5hbFBvcy5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdC50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKHRoaXMub3JpZ2luYWxQb3MueCwgMCwgdGhpcy5vcmlnaW5hbFBvcy56KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIumHjee9riB3YXlTcGFjZSDkuLogMCB3YXlUb3RhbCDkuLogMCB3YXlUb3RhbFRpbWUg5Li6IDAgIOWwj+eQg+aOp+WItuWZqOS9jee9riA9PSB4OlwiICsgdGhpcy5nYW1lT2JqZWN0LnRyYW5zZm9ybS5wb3NpdGlvbi54ICsgXCIgeTpcIiArIHRoaXMuZ2FtZU9iamVjdC50cmFuc2Zvcm0ucG9zaXRpb24ueSsgXCIgejpcIiArIHRoaXMuZ2FtZU9iamVjdC50cmFuc2Zvcm0ucG9zaXRpb24ueik7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLlsI/nkIPmnKzlnLDlnZDmoIforr7kuLrmnIDliJ0gPT0geDpcIiArIHRoaXMuYmFsbC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbi54ICsgXCIgeTpcIiArIHRoaXMuYmFsbC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbi55ICsgXCIgejpcIiArIHRoaXMuYmFsbC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbi56KVxyXG4gICAgfVxyXG5cclxuICAgIG9uQmFsbFRyaWdnZXJFbnRlcihvdGhlckE6IExheWEuU3ByaXRlM0QsIG90aGVyQjogTGF5YS5QaHlzaWNzQ29tcG9uZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5Lbm9ja05vdGUob3RoZXJCLm93bmVyIGFzIExheWEuU3ByaXRlM0QpO1xyXG4gICAgfVxyXG5cclxuICAgIENoZWNrQmFsbFRyaWdnZXIoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gcmV0dXJuO1xyXG4gICAgICAgIC8vIGxldCByYXkgPSBuZXcgTGF5YS5SYXkodGhpcy5nYW1lT2JqZWN0LnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpLCBuZXcgTGF5YS5WZWN0b3IzKDAsIC0xLCAwKSlcclxuICAgICAgICAvLyBsZXQgcmF5SGl0ID0gbmV3IExheWEuSGl0UmVzdWx0KCk7XHJcbiAgICAgICAgLy8gR2FtZUNvbnRyb2xsZXIuSW5zdGFuY2UuUmF5Q2FzdChyYXksIHJheUhpdCwgMC41KTtcclxuICAgICAgICAvLyBpZiAocmF5SGl0LmNvbGxpZGVyID09IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJkZGRcIiArIHJheUhpdC5jb2xsaWRlci5vd25lci5uYW1lKTtcclxuICAgICAgICAvLyB0aGlzLktub2NrTm90ZShyYXlIaXQuY29sbGlkZXIub3duZXIgYXMgTGF5YS5TcHJpdGUzRCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBLbm9ja05vdGUobm9kZTogTGF5YS5TcHJpdGUzRCk6IHZvaWQge1xyXG4gICAgICAgIC8vaWYgKCF0aGlzLmlzUnVuKSByZXR1cm47XHJcbiAgICAgICAgaWYgKG5vZGUubmFtZSA9PSBcIkRpZUJveFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVhdGgodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJvYXJkOiBOb3RlQm9hcmQgPSBub2RlLnBhcmVudC5wYXJlbnQuZ2V0Q29tcG9uZW50KE5vdGVCb2FyZCk7XHJcbiAgICAgICAgaWYgKGJvYXJkKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5pWy5Ye7Qm9hcmQgLS0gXCIgKyBib2FyZC5iZWF0LnRpbWVBcHBlYXIpICAgICAgICBcclxuICAgICAgICAgICAgYm9hcmQuQ2hlY2tUaXJnZ2VyKHRoaXMsIG5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLmJhbGxXaWxsQm91bmNlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZUNvbnRyb2xsZXIuSW5zdGFuY2UuYm9hcmRNYW5hZ2VyLktub2NrTm90ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgUGxheUJvbWJFZmZlY3QoKTogdm9pZHtcclxuICAgICAgICBsZXQgZGVhdGhFZmZlY3Q6IExheWEuU3ByaXRlM0QgPSB0aGlzLmdhbWVPYmplY3QuZ2V0Q2hpbGRCeU5hbWUoXCJEZWF0aEVmZmVjdFwiKSBhcyBMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgIGRlYXRoRWZmZWN0LmFjdGl2ZSA9IHRydWVcclxuICAgICAgICBkZWF0aEVmZmVjdC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbiA9IHRoaXMuYmFsbC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuYmFsbC50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjMoMC4wMDEsIDAuMDAxLCAwLjAwMSk7XHJcbiAgICAgICAgTGF5YS50aW1lci5vbmNlKDEuNSAqIDEwMDAsIHRoaXMsICgpID0+IHsgZGVhdGhFZmZlY3QuYWN0aXZlID0gZmFsc2UgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKTogdm9pZCB7IHRoaXMuc3RhdGVNYWNoaW5lLlVwZGF0ZSgpOyB9XHJcblxyXG4gICAgcHVibGljIE9mZnNldFBlcmNlbnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuYmFsbC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvblggLyBHYW1lQ29uc3QuQm9hcmRJbnRlcnZhbDsgfVxyXG4gICAgXHJcbiAgICBPbk1vdXNlRG93bigpOiB2b2lkIHsgdGhpcy5tb3VzZURvd25Qb3NpdGlvbiA9IHRoaXMuYmFsbC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbi5jbG9uZSgpOyB9XHJcbiAgICBPbk1vdXNlVXAoKTogdm9pZCB7IHRoaXMubW91c2VEb3duUG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7IH1cclxufSIsImltcG9ydCBCYWxsQ29udHJvbGxlciBmcm9tIFwiLi9CYWxsQ29udHJvbGxlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FtZXJhRm9sbG93IGV4dGVuZHMgTGF5YS5TY3JpcHQzRCB7XHJcbiAgICBwcml2YXRlIGNhbWVyYTogTGF5YS5DYW1lcmE7XHJcbiAgICBwcml2YXRlIHRhcmdldEJhbGw6IEJhbGxDb250cm9sbGVyO1xyXG4gICAgcHJpdmF0ZSBvZmZzZXRQb3NpdGlvbjogTGF5YS5WZWN0b3IzO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgbWF4T2Zmc2V0OiBudW1iZXIgPSAxLjBcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGdhbWVPYmplY3QoKTogTGF5YS5TcHJpdGUzRCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3duZXIgYXMgTGF5YS5TcHJpdGUzRDtcclxuICAgIH1cclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2FtZXJhID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIkNhbWVyYVwiKSBhcyBMYXlhLkNhbWVyYTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0VGFnZXQoYmFsbENvbnRyb2xsZXI6IEJhbGxDb250cm9sbGVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50YXJnZXRCYWxsID0gYmFsbENvbnRyb2xsZXI7XHJcbiAgICAgICAgdGhpcy5vZmZzZXRQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTs7XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRoaXMuZ2FtZU9iamVjdC50cmFuc2Zvcm0ucG9zaXRpb24sIHRoaXMudGFyZ2V0QmFsbC5nYW1lT2JqZWN0LnRyYW5zZm9ybS5wb3NpdGlvbiwgdGhpcy5vZmZzZXRQb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgb25MYXRlVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnRhcmdldEJhbGwgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzO1xyXG4gICAgICAgIExheWEuVmVjdG9yMy5hZGQodGhpcy50YXJnZXRCYWxsLmdhbWVPYmplY3QudHJhbnNmb3JtLnBvc2l0aW9uLCB0aGlzLm9mZnNldFBvc2l0aW9uLCBwb3NpdGlvbik7XHJcbiAgICAgICAgbGV0IHggPSB0aGlzLm1heE9mZnNldCAqIHRoaXMudGFyZ2V0QmFsbC5PZmZzZXRQZXJjZW50KCk7XHJcbiAgICAgICAgcG9zaXRpb24uc2V0VmFsdWUoeCwgcG9zaXRpb24ueSwgcG9zaXRpb24ueik7XHJcbiAgICAgICAgdGhpcy5nYW1lT2JqZWN0LnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQXBwX215cXFfQ29uZmlnIGZyb20gXCIuLi9BcHBDb25maWdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25zdCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFNvdW5kRmlsZSA9IFwiL1NvdW5kL1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBTb3VuZFByZXZpZXdJbWFnZXMgPSBcIi9QcmV2aWV3SW1hZ2UvXCJcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVmVyc2lvbkZpbGUgPSBcIi9NdXNpYy9cIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR2FtZVNjZW5lUGF0aCA9IFwic3ViUmVzL1NjZW5lcy9MYXlhU2NlbmVfR2FtZS9Db252ZW50aW9uYWwvR2FtZS5sc1wiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgQm9hcmRJbnRlcnZhbCA9IDMuNzU7ICAvL+aoquWQkemXtOmalFxyXG4gICAgcHVibGljIHN0YXRpYyBCb2FyZEludGVydmFsVGltZSA9IDAuMjsgLy/mnIDlsI/pl7TpmpTml7bpl7RcclxuICAgIHB1YmxpYyBzdGF0aWMgQm9hcmRJbnRlcnZhbFNwYWNlID0gMzsgLy/mnIDlsI/ot7Pmnb/pl7TpmpRcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBSZW1vdGVSZXMoKTogc3RyaW5nIHsgcmV0dXJuIEFwcF9teXFxX0NvbmZpZy5SZXNTZXJ2ZXI7IH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBHZXRMb2NhbFN1YlJlc1ZlcnNpb25QYXRoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwic3ViUmVzXCIgKyBHYW1lQ29uc3QuVmVyc2lvbkZpbGUgKyBcIlZlcnNpb24uanNvblwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEdldFJlbW90ZVZlcnNpb25QYXRoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIEdhbWVDb25zdC5SZW1vdGVSZXMgKyBHYW1lQ29uc3QuVmVyc2lvbkZpbGUgKyBcIlZlcnNpb24uanNvblwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEdldFJhbmRvbVNvbmdQcmV2aWV3UG5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiUmVzb3VyY2UvU29uZ0Rpc2MvXCIgKyAwICsgXCIucG5nXCI7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZUNvbnN0IGZyb20gXCIuL0dhbWVDb25zdFwiO1xyXG5pbXBvcnQgQ2FtZXJhTW92ZVNjcmlwdCBmcm9tIFwiLi9Ub29scy9DYW1lcmFNb3ZlU2NyaXB0XCI7XHJcbmltcG9ydCBCYWxsQ29udHJvbGxlciwgeyBCYWxsQ29sb3IgfSBmcm9tIFwiLi9CYWxsQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgTW91c2VNZ3IgZnJvbSBcIi4vTW91c2VNZ3JcIjtcclxuaW1wb3J0IFZpZXdfbXlxcV9NZ3IsIHsgVmlld0RlZiB9IGZyb20gXCIuLi9NZ3IvVmlld01nclwiO1xyXG5pbXBvcnQgTm90ZUJvYXJkTWFuYWdlciBmcm9tIFwiLi9Ob3RlQm9hcmRNYW5hZ2VyXCI7XHJcbmltcG9ydCBOb3RlTWFuYWdlciBmcm9tIFwiLi9Ob3RlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb25nIH0gZnJvbSBcIi4vVmVyc2lvblwiO1xyXG5pbXBvcnQgRXZlbnRfbXlxcV9NZ3IgZnJvbSBcIi4uL0V2ZW50L0V2ZW50TWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50RGVmIH0gZnJvbSBcIi4uL0V2ZW50L0V2ZW50RGVmXCI7XHJcbmltcG9ydCBXWEFQSSBmcm9tIFwiLi4vV1hBUElcIjtcclxuaW1wb3J0IENhbWVyYUZvbGxvdyBmcm9tIFwiLi9DYW1lcmFGb2xsb3dcIjtcclxuaW1wb3J0IFNvdW5kTWFuYWdlciBmcm9tIFwiLi9Tb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IFZpYnJhdGVfbXlxcV9NZ3IgZnJvbSBcIi4uL01nci9WaWJyYXRlTWdyXCI7XHJcbmltcG9ydCB7IFBhc3NTb25nIH0gZnJvbSBcIi4uL1VzZXIvVXNlclwiO1xyXG5pbXBvcnQgQXVkaW9CYW5kIGZyb20gXCIuL0F1ZGlvL0F1ZGlvQmFuZFwiO1xyXG5pbXBvcnQgQXVkaW9XcmFwZXIgZnJvbSBcIi4vQXVkaW8vQXVkaW9XcmFwZXJcIjtcclxuaW1wb3J0IE5hdGl2ZUNhbGxiYWNrIGZyb20gXCIuLi9OYXRpdmVDYWxsYmFja1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBHYW1lQ29udHJvbGxlcjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpOiBHYW1lQ29udHJvbGxlciB7XHJcbiAgICAgICAgaWYgKEdhbWVDb250cm9sbGVyLl9pbnN0YW5jZSA9PSBudWxsKVxyXG4gICAgICAgICAgICBHYW1lQ29udHJvbGxlci5faW5zdGFuY2UgPSBuZXcgR2FtZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICByZXR1cm4gR2FtZUNvbnRyb2xsZXIuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2luaXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBjdXJyZW50U29uZzogU29uZyA9IG51bGw7XHJcbiAgICBwdWJsaWMgc2NlbmU6IExheWEuU2NlbmUzRCA9IG51bGw7XHJcbiAgICBwdWJsaWMgYm9hcmRNYW5hZ2VyOiBOb3RlQm9hcmRNYW5hZ2VyID0gbnVsbDtcclxuICAgIHB1YmxpYyBiYWxsQ29udHJvbGxlcjogQmFsbENvbnRyb2xsZXIgPSBudWxsO1xyXG4gICAgcHVibGljIGNhbWVyYUZvbGxvdzogQ2FtZXJhRm9sbG93ID0gbnVsbDtcclxuICAgIHB1YmxpYyBpc1J1bjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpc0dhbWVpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBpc0xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyByZWFsU3RhcnRUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNvdW5kUGF1c2VUaW1lOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIFNvdW5kSW5QYXVzZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBjdXJyZW50U291cmNlOiBudW1iZXIgPSAwOyAvL+a4uOaIj+WIhuaVsFxyXG4gICAgcHVibGljIGNvbnRpbnVvdXNQZXJmZWN0OiBudW1iZXIgPSAwOyAvLyDmnIDlpKfov57nu63nmoTlroznvo7mrKHmlbBcclxuICAgIHB1YmxpYyBjdXJyZW50UGVyZmVjdENvdW50OiBudW1iZXIgPSAwOyAvL+a4uOaIj+WujOe+juaAu+asoeaVsFxyXG5cclxuICAgIHB1YmxpYyBJbml0KGNhbGxlciA9IG51bGwsIGNvbXBsZXRlZCA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faW5pdGVkKSB7XHJcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZWQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGVkLmNhbGwoY2FsbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBNb3VzZU1nci5JbnN0YW5jZTtcclxuICAgICAgICB0aGlzLkxvYWRHYW1lU2NlbmUoR2FtZUNvbnN0LkdhbWVTY2VuZVBhdGgsIHRoaXMsIChzY2VuZTogTGF5YS5TY2VuZTNEKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICAgICAgbGV0IHBsYXRmb3JtTWFuYWdlciA9IHNjZW5lLmdldENoaWxkQnlOYW1lKFwiUGxhdGZvcm1NYW5hZ2VyXCIpXHJcbiAgICAgICAgICAgIHRoaXMuYm9hcmRNYW5hZ2VyID0gcGxhdGZvcm1NYW5hZ2VyLmFkZENvbXBvbmVudChOb3RlQm9hcmRNYW5hZ2VyKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjYW1lcmEgPSBzY2VuZS5nZXRDaGlsZEJ5TmFtZShcIk1haW4gQ2FtZXJhXCIpIGFzIExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhRm9sbG93ID0gY2FtZXJhLmFkZENvbXBvbmVudChDYW1lcmFGb2xsb3cpO1xyXG4gICAgICAgICAgICBjYW1lcmEuZ2V0Q2hpbGRCeU5hbWUoXCJDYW1lcmFcIikuYWRkQ29tcG9uZW50KENhbWVyYU1vdmVTY3JpcHQpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGJhbGwgPSBzY2VuZS5nZXRDaGlsZEJ5TmFtZShcIkJhbGxDb250cm9sbGVyXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmJhbGxDb250cm9sbGVyID0gYmFsbC5hZGRDb21wb25lbnQoQmFsbENvbnRyb2xsZXIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYW1lcmFGb2xsb3cuU2V0VGFnZXQodGhpcy5iYWxsQ29udHJvbGxlcik7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29tcGxldGVkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQuY2FsbCh0aGlzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihcInZpc2liaWxpdHljaGFuZ2VcIiwgdGhpcywgdGhpcy5WaXNpYmlsaXR5Q2hhbmdlKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgTG9hZEdhbWVTY2VuZShzY2VuZVBhdGgsIGNhbGxlciwgY29tcGxldGVkKTogdm9pZCB7XHJcbiAgICAgICAgTGF5YS5TY2VuZTNELmxvYWQoc2NlbmVQYXRoLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIGZ1bmN0aW9uIChzY2VuZTogTGF5YS5TY2VuZTNEKTogdm9pZCB7XHJcbiAgICAgICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQoc2NlbmUpO1xyXG4gICAgICAgICAgICBMYXlhLnN0YWdlLnNldENoaWxkSW5kZXgoc2NlbmUsIDApO1xyXG4gICAgICAgICAgICBpZiAoY29tcGxldGVkID09IG51bGwgfHwgc2NlbmUgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY29tcGxldGVkLmNhbGwodGhpcywgc2NlbmUpO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmF5Q2FzdChyYXk6IExheWEuUmF5LCByYXlIaXQ6IExheWEuSGl0UmVzdWx0LCBkaXMpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNjZW5lLnBoeXNpY3NTaW11bGF0aW9uLnJheUNhc3QocmF5LCByYXlIaXQsIGRpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBMb2FkV2FpdGluZ1RpbWUoY2FsbEJhY2s6IExheWEuSGFuZGxlcikge1xyXG4gICAgICAgIGNhbGxCYWNrLnJ1bigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgTG9hZChzb25nOiBTb25nLCBjb21wbGV0ZWQ6IExheWEuSGFuZGxlciwgcHJvZ3Jlc3M/OiBMYXlhLkhhbmRsZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBpbkVycm9yID0gZmFsc2U7XHJcbiAgICAgICAgZnVuY3Rpb24gZXJyb3IoZXJyZXJTdHIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJlclN0cik7XHJcbiAgICAgICAgICAgIGluRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkNsZWFyR2FtZVJlcygpO1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5vZmYoTGF5YS5FdmVudC5FUlJPUiwgdGhpcywgZXJyb3IpO1xyXG4gICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsIHRoaXMuTG9hZFdhaXRpbmdUaW1lKTtcclxuICAgICAgICAgICAgaWYgKHByb2dyZXNzICE9IG51bGwpIHsgcHJvZ3Jlc3MucmVjb3ZlcigpOyB9XHJcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZWQgIT0gbnVsbCkgeyBjb21wbGV0ZWQucnVuV2l0aChmYWxzZSk7IGNvbXBsZXRlZC5yZWNvdmVyKCk7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHVwZGF0ZVByb2dyZXNzID0gTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAobnVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbkVycm9yKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBpZiAobnVtICE9IDEgJiYgcHJvZ3Jlc3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MucnVuV2l0aChudW0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVByb2dyZXNzLnJlY292ZXIoKTtcclxuICAgICAgICAgICAgICAgIExheWEubG9hZGVyLm9mZihMYXlhLkV2ZW50LkVSUk9SLCB0aGlzLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsIHRoaXMuTG9hZFdhaXRpbmdUaW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzcyAhPSBudWxsKSB7IHByb2dyZXNzLnJ1bldpdGgoMSk7IHByb2dyZXNzLnJlY292ZXIoKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCAhPSBudWxsKSB7IGNvbXBsZXRlZC5ydW5XaXRoKHRydWUpOyBjb21wbGV0ZWQucmVjb3ZlcigpOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgbGV0IGxvYWRDb25maWdDb21wbGV0ZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbkVycm9yKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICB1cGRhdGVQcm9ncmVzcy5ydW5XaXRoKDAuNyk7XHJcbiAgICAgICAgICAgIEF1ZGlvQmFuZC5JbnN0YW5jZS5Mb2FkSnNvbihMYXlhLmxvYWRlci5nZXRSZXMoc29uZy5zb25nQmFuZFBhdGgpKTtcclxuICAgICAgICAgICAgTm90ZU1hbmFnZXIuSW5zdGFuY2UuTG9hZEpzb24oTGF5YS5sb2FkZXIuZ2V0UmVzKHNvbmcuc29uZ0pvc25QYXRoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYm9hcmRNYW5hZ2VyLkluaXROb3RlQm9hcmQoTm90ZU1hbmFnZXIuSW5zdGFuY2Uuc29uZ05vdGUuY2xvbmUoKSk7XHJcbiAgICAgICAgICAgIEF1ZGlvV3JhcGVyLkluc3RhbmNlLkxvYWQoc29uZy5zb25nUGF0aCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAoKSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgaWYgKGluRXJyb3IpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVQcm9ncmVzcy5ydW5XaXRoKDEpO1xyXG4gICAgICAgICAgICAgfSksTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBlcnJvcikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzID0gW1xyXG4gICAgICAgICAgICB7dXJsOiBzb25nLnNvbmdKb3NuUGF0aCwgdHlwZTogTGF5YS5Mb2FkZXIuSlNPTn0sIFxyXG4gICAgICAgICAgICB7dXJsOiBzb25nLnNvbmdCYW5kUGF0aCwgdHlwZTogTGF5YS5Mb2FkZXIuSlNPTn1cclxuICAgICAgICBdO1xyXG4gICAgICAgIGxldCBsb2FkZXIgPSBMYXlhLmxvYWRlci5sb2FkKHJlcywgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAoKSA9PiB7IExheWEudGltZXIuY2FsbExhdGVyKHRoaXMsIGxvYWRDb25maWdDb21wbGV0ZWQpIH0pLFxyXG4gICAgICAgICAgICBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIChudW0pID0+IHsgdXBkYXRlUHJvZ3Jlc3MucnVuV2l0aChudW0gKiAwLjcpOyB9LCBudWxsLCBmYWxzZSkpO1xyXG4gICAgICAgIGxvYWRlci5vbihMYXlhLkV2ZW50LkVSUk9SLCB0aGlzLCBlcnJvcik7XHJcbiAgICAgICAgTGF5YS50aW1lci5vbmNlKDcgKiAxMDAwLCB0aGlzLCB0aGlzLkxvYWRXYWl0aW5nVGltZSwgW0xheWEuSGFuZGxlci5jcmVhdGUodGhpcywgZXJyb3IsIFtcIuWKoOi9vei2heaXtlwiXSldKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2FtZVJlYWR5KHNvbmc6IFNvbmcsIGNvbXBsZXRlZDogTGF5YS5IYW5kbGVyLCBwcm9ncmVzcz86IExheWEuSGFuZGxlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzTG9hZGluZyA9PSB0cnVlKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHByb2dyZXNzKSB7IHByb2dyZXNzLm9uY2UgPSBmYWxzZTsgfVxyXG4gICAgICAgIHRoaXMuR2FtZVJlc3QoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTb25nID0gc29uZztcclxuICAgICAgICB0aGlzLkxvYWQoc29uZywgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAoc3VjY2VlZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXN1Y2NlZWQpIHtcclxuICAgICAgICAgICAgICAgIFZpZXdfbXlxcV9NZ3IuaW5zdGFuY2UuY2xvc2VWaWV3KFZpZXdEZWYuR2FtZUxvYWRpbmdWaWV3KTtcclxuICAgICAgICAgICAgICAgIFZpZXdfbXlxcV9NZ3IuaW5zdGFuY2Uub3BlblZpZXcoVmlld0RlZi5HYW1lTWFpblZpZXcsIG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBWaWV3X215cXFfTWdyLmluc3RhbmNlLm9wZW5WaWV3KFZpZXdEZWYuVGlwc1ZpZXcsIFwi5Yqg6L296Z+z5LmQ5aSx6LSl77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yZWFsU3RhcnRUaW1lID0gTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICAgICAgICAgIE1vdXNlTWdyLkluc3RhbmNlLmVuYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZWQgIT0gbnVsbCkgeyBjb21wbGV0ZWQucnVuV2l0aChzdWNjZWVkKTsgfVxyXG4gICAgICAgIH0pLCBwcm9ncmVzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdhbWVQbGF5KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1JlYWR5KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmnKrlrozmiJDmuLjmiI/pn7PkuZDliqDovb3vvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0dhbWVpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNSdW4gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBzb25nQmVhdHMgPSBOb3RlTWFuYWdlci5JbnN0YW5jZS5zb25nTm90ZS5iZWF0cztcclxuICAgICAgICBsZXQgZmlyc3RCZWF0ID0gc29uZ0JlYXRzWzBdO1xyXG4gICAgICAgIGxldCBjb2xvciA9IChmaXJzdEJlYXQubm90ZXNbMF0uY29sdW1uSW5kZXggJSAzKSBhcyBCYWxsQ29sb3I7XHJcbiAgICAgICAgdGhpcy5iYWxsQ29udHJvbGxlci5TdGFydCgwLCAwLCBjb2xvcik7XHJcbiAgICAgICAgQXVkaW9XcmFwZXIuSW5zdGFuY2UuUGxheSgpO1xyXG4gICAgICAgIHRoaXMuYm9hcmRNYW5hZ2VyLkJhbmRDdWJlc1N0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5PblN0YWdlU3RhdGVDaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2FtZUZhaWx1cmUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IDE7XHJcbiAgICAgICAgdGhpcy5pc1J1biA9IGZhbHNlO1xyXG4gICAgICAgIEF1ZGlvV3JhcGVyLkluc3RhbmNlLlN0b3AoKTtcclxuICAgICAgICBFdmVudF9teXFxX01nci5pbnN0YW5jZS5kaXNwYXRjaChFdmVudERlZi5HYW1lX0ZhaWx1cmUpO1xyXG4gICAgICAgIHRoaXMuT2ZmU3RhZ2VTdGF0ZUNoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBPcGVuUmV3YXJkZWRWaWRlbyhjb21wbGV0ZWQ6IExheWEuSGFuZGxlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpIHtcclxuICAgICAgICAgICAgV1hBUEkuc2hvd1Jld2FyZGVkVmlkZW9BZCgoaXNsb29rRW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkICE9IG51bGwpIHsgY29tcGxldGVkLnJ1bldpdGgoaXNsb29rRW5kKTsgfVxyXG4gICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkICE9IG51bGwpIHsgY29tcGxldGVkLnJ1bldpdGgoZmFsc2UpOyB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGNvbXBsZXRlZCAhPSBudWxsKSB7IGNvbXBsZXRlZC5ydW5XaXRoKHRydWUpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZXN1cnJlY3Rpb25HYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYmFsbENvbnRyb2xsZXIuUmVzdXJyZWN0aW9uKCk7XHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnREZWYuR2FtZV9SZXN1cmdlbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQmFsbFJ1bigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzUnVuID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLk9uU3RhZ2VTdGF0ZUNoYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuYmFsbENvbnRyb2xsZXIuUnVuKCk7XHJcbiAgICAgICAgbGV0IHRpbWVBcHBlYXIgPSBOb3RlTWFuYWdlci5JbnN0YW5jZS5HZXRCZWF0VGltZUFwcGVhcih0aGlzLmJhbGxDb250cm9sbGVyLlJ1bkJlYXRJbmRleCk7XHJcbiAgICAgICAgQXVkaW9XcmFwZXIuSW5zdGFuY2UuUGxheUZyb21UaW1lKHRpbWVBcHBlYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHYW1lRW5kKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRpbWUgPSAxO1xyXG4gICAgICAgIHRoaXMuU2V0dGxlU29uZ1JlY29yZCh0cnVlKTtcclxuICAgICAgICBBdWRpb1dyYXBlci5JbnN0YW5jZS5Tb29tdGhTdG9wKDEpO1xyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkdhbWVfU2V0dGxlLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGN1cnJTdGFydExldmVsKCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG51bSA9IE1hdGguZmxvb3IoTm90ZU1hbmFnZXIuSW5zdGFuY2Uuc29uZ05vdGUuYmVhdHMubGVuZ3RoIC8gMyk7XHJcbiAgICAgICAgbGV0IHN0YXJMZXZlbCA9IE1hdGgubWluKDEsIE1hdGguZmxvb3IoKHRoaXMuY3VycmVudFBlcmZlY3RDb3VudCAvIG51bSkpKTtcclxuICAgICAgICByZXR1cm4gc3RhckxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHYW1lT3ZlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLlNldHRsZVNvbmdSZWNvcmQoZmFsc2UpO1xyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkdhbWVfU2V0dGxlLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTZXR0bGVTb25nUmVjb3JkKGNvbXBsZXRlZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNSdW4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzR2FtZWluZyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBuYW1lID0gdGhpcy5jdXJyZW50U29uZy5uYW1lO1xyXG4gICAgICAgIGxldCBzdGFyTGV2ZWwgPSB0aGlzLmN1cnJTdGFydExldmVsO1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci5JbnN0YW5jZS5TdWJQbGF5T25lTW9uZXkodGhpcy5jdXJyZW50U29uZyk7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLkluc3RhbmNlLlNhdmVTb25nUmVjb3JkKG5hbWUsIHN0YXJMZXZlbCwgdGhpcy5jdXJyZW50U291cmNlLCBjb21wbGV0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRDdXJyZW50U29uZ1JlY29yZCgpOiBQYXNzU29uZyB7XHJcbiAgICAgICAgbGV0IHNvbmcgPSB0aGlzLmN1cnJlbnRTb25nO1xyXG4gICAgICAgIGxldCBwYXNzU29uZyA9IG5ldyBQYXNzU29uZygpO1xyXG4gICAgICAgIHBhc3NTb25nLm5hbWUgPSBzb25nLm5hbWU7XHJcbiAgICAgICAgcGFzc1Nvbmcuc291cmNlID0gdGhpcy5jdXJyZW50U291cmNlO1xyXG4gICAgICAgIHBhc3NTb25nLnN0YXJMZXZlbCA9IHRoaXMuY3VyclN0YXJ0TGV2ZWw7XHJcbiAgICAgICAgcmV0dXJuIHBhc3NTb25nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHYW1lUmVzdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlJlc3RTb25nU29yY2UoKTtcclxuICAgICAgICB0aGlzLkNsZWFyR2FtZVJlcygpO1xyXG4gICAgICAgIHRoaXMuT2ZmU3RhZ2VTdGF0ZUNoYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuYmFsbENvbnRyb2xsZXIuUmVzZXQoKTtcclxuICAgICAgICB0aGlzLmJvYXJkTWFuYWdlci5CYW5kQ3ViZXNTdG9wKCk7XHJcbiAgICAgICAgTW91c2VNZ3IuSW5zdGFuY2UuZW5hYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDbGVhckdhbWVSZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ib2FyZE1hbmFnZXIuQ2xlYXIoKTtcclxuICAgICAgICBBdWRpb1dyYXBlci5JbnN0YW5jZS5DbGVhcigpO1xyXG4gICAgICAgIExheWEubG9hZGVyLmNsZWFyVW5Mb2FkZWQoKTtcclxuICAgICAgICBMYXlhLlJlc291cmNlLmRlc3Ryb3lVbnVzZWRSZXNvdXJjZXMoKTtcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5zdG9wTXVzaWMoKTtcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5zdG9wQWxsU291bmQoKTtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U29uZykge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5jbGVhclJlcyh0aGlzLmN1cnJlbnRTb25nLnNvbmdQYXRoKTtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIuY2xlYXJSZXModGhpcy5jdXJyZW50U29uZy5zb25nQmFuZFBhdGgpO1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5jbGVhclJlcyh0aGlzLmN1cnJlbnRTb25nLnNvbmdKb3NuUGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgQ3VycmVudFJ1blRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKExheWEudGltZXIuY3VyclRpbWVyIC0gdGhpcy5yZWFsU3RhcnRUaW1lKSAvIDEwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhdXNlR2FtZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5Tb3VuZEluUGF1c2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlNvdW5kSW5QYXVzZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zb3VuZFBhdXNlVGltZSA9IEF1ZGlvV3JhcGVyLkluc3RhbmNlLlBsYXlQb3NpdGlvbjtcclxuICAgICAgICBBdWRpb1dyYXBlci5JbnN0YW5jZS5QYXVzZSgpO1xyXG4gICAgICAgIHRoaXMuYmFsbENvbnRyb2xsZXIuQWN0aXZlU3RhbmQodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlc3VtZUdhbWUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNvdW5kSW5QYXVzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU291bmRJblBhdXNlID0gZmFsc2U7XHJcbiAgICAgICAgQXVkaW9XcmFwZXIuSW5zdGFuY2UuUmVzdW1lKCk7XHJcbiAgICAgICAgdGhpcy5zb3VuZFBhdXNlVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5iYWxsQ29udHJvbGxlci5BY3RpdmVTdGFuZChmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFkZFNvbmdTb3VyY2UocGVyZmVjdDogYm9vbGVhbiwgcHJvZ3Jlc3M6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGRlZlNvdXJjZTogbnVtYmVyID0gNTg7XHJcbiAgICAgICAgY29uc3QgcGVyZmVjdFNvdXJjZTogbnVtYmVyID0gMTAwO1xyXG4gICAgICAgIGlmICghdGhpcy5iYWxsQ29udHJvbGxlci5pc1J1bikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGVyZmVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRpbnVvdXNQZXJmZWN0Kys7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBlcmZlY3RDb3VudCsrO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTb3VyY2UgKz0gcGVyZmVjdFNvdXJjZTtcclxuICAgICAgICAgICAgVmlicmF0ZV9teXFxX01nci52aWJyYXRlU2hvcnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRpbnVvdXNQZXJmZWN0ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U291cmNlICs9IGRlZlNvdXJjZTtcclxuICAgICAgICAgICAgVmlicmF0ZV9teXFxX01nci5pYnJhdGVMb25nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkdhbWVfU29uZ1NvdXJjZUNoYW5nZSwgW3RoaXMuY3VycmVudFNvdXJjZSwgcHJvZ3Jlc3MsIHRoaXMuY29udGludW91c1BlcmZlY3RdKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVzdFNvbmdTb3JjZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTb3VyY2UgPSAwO1xyXG4gICAgICAgIHRoaXMuY29udGludW91c1BlcmZlY3QgPSAwO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBlcmZlY3RDb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldENvbG9yTWF0ZXJpYWwoY29sb3I6IEJhbGxDb2xvciwgb3V0Q29sb3I6IExheWEuVmVjdG9yNCk6IExheWEuQmFzZU1hdGVyaWFsIHtcclxuICAgICAgICBsZXQgY29sb3JTdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIG91dENvbG9yID0gb3V0Q29sb3IgPyBvdXRDb2xvciA6IG5ldyBMYXlhLlZlY3RvcjQoKTtcclxuICAgICAgICBzd2l0Y2ggKGNvbG9yKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQmFsbENvbG9yLlJlZDpcclxuICAgICAgICAgICAgICAgIGNvbG9yU3RyaW5nID0gXCJSZWQubG1hdFwiO1xyXG4gICAgICAgICAgICAgICAgb3V0Q29sb3Iuc2V0VmFsdWUoMjU1IC8gMjU1LCAyNCAvIDI1NSwgMjQgLyAyNTUsIDAuNSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCYWxsQ29sb3IuQmx1ZTpcclxuICAgICAgICAgICAgICAgIGNvbG9yU3RyaW5nID0gXCJCbHVlLmxtYXRcIjtcclxuICAgICAgICAgICAgICAgIG91dENvbG9yLnNldFZhbHVlKDI4IC8gMjU1LCA5NSAvIDI1NSwgMjU1IC8gMjU1LCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQmFsbENvbG9yLlllbGxvdzpcclxuICAgICAgICAgICAgICAgIGNvbG9yU3RyaW5nID0gXCJZZWxsb3cubG1hdFwiO1xyXG4gICAgICAgICAgICAgICAgb3V0Q29sb3Iuc2V0VmFsdWUoMjU1IC8gMjU1LCAyMzkgLyAyNTUsIDI4IC8gMjU1LCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtYXRlcmlhbCA9IExheWEubG9hZGVyLmdldFJlcyhcInN1YlJlcy9TY2VuZXMvTGF5YVNjZW5lX0dhbWUvQ29udmVudGlvbmFsL0Fzc2V0cy9NYXRlcmlhbC9cIiArIGNvbG9yU3RyaW5nKTtcclxuICAgICAgICBpZiAobWF0ZXJpYWwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hdGVyaWFsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25TdGFnZVN0YXRlQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLnJlZ0V2ZW10KEV2ZW50RGVmLkdhbWVfQkxVUiwgdGhpcywgdGhpcy5TdGFnZU9uQmx1cik7XHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UucmVnRXZlbXQoRXZlbnREZWYuR2FtZV9GT0NVUywgdGhpcywgdGhpcy5TdGFnZU9uRm9jdXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT2ZmU3RhZ2VTdGF0ZUNoYW5nZSgpOiB2b2lkIHtcclxuICAgICAgICBFdmVudF9teXFxX01nci5pbnN0YW5jZS5yZW1vdmVFdmVudChFdmVudERlZi5HYW1lX0JMVVIsIHRoaXMsIHRoaXMuU3RhZ2VPbkJsdXIpO1xyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLnJlbW92ZUV2ZW50KEV2ZW50RGVmLkdhbWVfRk9DVVMsIHRoaXMsIHRoaXMuU3RhZ2VPbkZvY3VzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFZpc2liaWxpdHlDaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgTmF0aXZlQ2FsbGJhY2suU2hvd0xvZyhcIlZpc2liaWxpdHlDaGFuZ2UgLS0tLS0tIFwiICsgTGF5YS5zdGFnZS5pc1Zpc2liaWxpdHkpO1xyXG4gICAgICAgIGlmIChMYXlhLnN0YWdlLmlzVmlzaWJpbGl0eSkge1xyXG4gICAgICAgICAgICB0aGlzLlN0YWdlT25Gb2N1cygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuU3RhZ2VPbkJsdXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTdGFnZU9uQmx1cigpOiB2b2lkIHtcclxuICAgICAgICBOYXRpdmVDYWxsYmFjay5TaG93TG9nKFwiU3RhZ2VPbkJsdXI9PT09PT09PVwiKTtcclxuICAgICAgICBpZiAoIXRoaXMuU291bmRJblBhdXNlKSB7XHJcbiAgICAgICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkdhbWVfU3RhdGVDaGFuZ2UsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTdGFnZU9uRm9jdXMoKTogdm9pZCB7XHJcbiAgICAgICAgTmF0aXZlQ2FsbGJhY2suU2hvd0xvZyhcIlN0YWdlT25Gb2N1cz09PT09PT1cIik7XHJcbiAgICAgICAgaWYgKHRoaXMuU291bmRJblBhdXNlKSB7XHJcbiAgICAgICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkdhbWVfU3RhdGVDaGFuZ2UsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBFdmVudF9teXFxX01nciBmcm9tIFwiLi4vRXZlbnQvRXZlbnRNZ3JcIjtcclxuaW1wb3J0IHsgRXZlbnREZWYgfSBmcm9tIFwiLi4vRXZlbnQvRXZlbnREZWZcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdXNlTWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTW91c2VNZ3I7XHJcblxyXG4gICAgcHVibGljIGVuYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCk6IE1vdXNlTWdyIHtcclxuICAgICAgICBpZiAoTW91c2VNZ3IuX2luc3RhbmNlID09IG51bGwpXHJcbiAgICAgICAgICAgIE1vdXNlTWdyLl9pbnN0YW5jZSA9IG5ldyBNb3VzZU1ncigpO1xyXG4gICAgICAgIHJldHVybiBNb3VzZU1nci5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sIHRoaXMsIHRoaXMuT25Nb3VzZURvd24pO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5NT1VTRV9VUCwgdGhpcywgdGhpcy5Pbk1vc2VVcCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX09VVCwgdGhpcywgdGhpcy5Pbk1vc2VVcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzRG93biA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzTW92aW5nID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIG1vdXNlRG93blBvaW50OiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIDApO1xyXG4gICAgcHJpdmF0ZSBPbk1vdXNlRG93bihlOiBMYXlhLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlzRG93biA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tb3VzZU1vdmVPZmZzZXQgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMubW91c2VEb3duUG9pbnQgPSBuZXcgTGF5YS5WZWN0b3IzKGUuc3RhZ2VYLCBlLnN0YWdlWSwgMCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50Lk1PVVNFX01PVkUsIHRoaXMsIHRoaXMuT25Nb3VzZU1vdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbW91c2VNb3ZlT2Zmc2V0OiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIDApO1xyXG4gICAgcHJpdmF0ZSBPbk1vdXNlTW92ZShlOiBMYXlhLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tb3VzZU1vdmVPZmZzZXQgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIDApO1xyXG4gICAgICAgIExheWEuVmVjdG9yMy5zdWJ0cmFjdChuZXcgTGF5YS5WZWN0b3IzKGUuc3RhZ2VYLCBlLnN0YWdlWSwgMCksIHRoaXMubW91c2VEb3duUG9pbnQsIHRoaXMubW91c2VNb3ZlT2Zmc2V0KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25Nb3NlVXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc0Rvd24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzTW92aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5SZXNldE1vdXNlT2Zmc2V0KCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vZmYoTGF5YS5FdmVudC5NT1VTRV9NT1ZFLCB0aGlzLCB0aGlzLk9uTW91c2VNb3ZlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVzZXRNb3VzZU9mZnNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzRG93biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1vdXNlRG93blBvaW50ID0gbmV3IExheWEuVmVjdG9yMyhMYXlhLnN0YWdlLm1vdXNlWCwgTGF5YS5zdGFnZS5tb3VzZVksIDApO1xyXG4gICAgICAgIHRoaXMubW91c2VNb3ZlT2Zmc2V0ID0gbmV3IExheWEuVmVjdG9yMygwLCAwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0TW91c2VPZmZzZXRCeVNpemUoc2l6ZTogbnVtYmVyLCBpZ25vcmVYOiBib29sZWFuID0gZmFsc2UsIGlnbm9yZVk6IGJvb2xlYW4gPSBmYWxzZSwgaWdub3JlWjogYm9vbGVhbiA9IGZhbHNlKTogTGF5YS5WZWN0b3IzIHtcclxuXHJcbiAgICAgICAgbGV0IG9mZnNldDogTGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygwLCAwLCAwKTtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuc2NhbGUodGhpcy5tb3VzZU1vdmVPZmZzZXQsIHNpemUsIG9mZnNldCk7XHJcblxyXG4gICAgICAgIGlmIChpZ25vcmVYKSBvZmZzZXQueCA9IDA7XHJcbiAgICAgICAgaWYgKGlnbm9yZVkpIG9mZnNldC55ID0gMDtcclxuICAgICAgICBpZiAoaWdub3JlWikgb2Zmc2V0LnogPSAwO1xyXG5cclxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBoeXNpY1RyaWdnZXIzZCBmcm9tIFwiLi9Ub29scy9QaHlzaWNUcmlnZ2VyM2RcIjtcclxuaW1wb3J0IEJhbGxDb250cm9sbGVyLCB7IEJhbGxDb2xvciB9IGZyb20gXCIuL0JhbGxDb250cm9sbGVyXCI7XHJcbmltcG9ydCB7IEJlYXQgfSBmcm9tIFwiLi9Ob3RlTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZUNvbnN0IGZyb20gXCIuL0dhbWVDb25zdFwiO1xyXG5pbXBvcnQgVXRpbGl0IGZyb20gXCIuLi9VdGlsaXRcIjtcclxuaW1wb3J0IEdhbWVDb250cm9sbGVyIGZyb20gXCIuL0dhbWVDb250cm9sbGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RlQm9hcmQgZXh0ZW5kcyBMYXlhLlNjcmlwdDNEIHtcclxuICAgIHB1YmxpYyBJc0JpZ0JvYXJkOiBib29sZWFuO1xyXG5cclxuICAgIC8vIOWkp+i3s+adv+WxnuaAp1xyXG4gICAgcHJpdmF0ZSBjb2xvcjogQmFsbENvbG9yO1xyXG4gICAgcHJpdmF0ZSBtZXNoUmVuZGVyZXI6IExheWEuTWVzaFJlbmRlcmVyO1xyXG5cclxuICAgIC8v5bCP6Lez5p2/5bGe5oCnXHJcbiAgICBwcml2YXRlIHBlcmZlY3RFZmZlY3Q6IExheWEuU3ByaXRlM0Q7XHJcblxyXG4gICAgcHJpdmF0ZSBhbmltYXRvcjogTGF5YS5BbmltYXRvcjtcclxuICAgIHByaXZhdGUgY3Jhc2hFZmZlY3Q6IExheWEuU3ByaXRlM0Q7XHJcblxyXG4gICAgcHVibGljIGJlYXQ6IEJlYXQ7XHJcbiAgICBwcml2YXRlIGJvYXJkczogTGF5YS5TcHJpdGUzRDtcclxuICAgIHB1YmxpYyBnZXQgZ2FtZU9iamVjdCgpOiBMYXlhLlNwcml0ZTNEIHsgcmV0dXJuIHRoaXMub3duZXIgYXMgTGF5YS5TcHJpdGUzRCB9XHJcblxyXG4gICAgb25Bd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLklzQmlnQm9hcmQgPSB0aGlzLm93bmVyLm5hbWUgPT0gXCJCaWdOb3RlQm9hcmRcIjtcclxuICAgICAgICB0aGlzLmJvYXJkcyA9IFV0aWxpdC5GaW5kQ2hpbGQodGhpcy5vd25lciwgXCJCb2FyZHNcIikgYXMgTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICB0aGlzLmFuaW1hdG9yID0gdGhpcy5ib2FyZHMuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgIHRoaXMuY3Jhc2hFZmZlY3QgPSBVdGlsaXQuRmluZENoaWxkKHRoaXMub3duZXIsIFwiRWZmZWN0L2NyYXNoRWZmZWN0XCIpIGFzIExheWEuU3ByaXRlM0Q7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLklzQmlnQm9hcmQpIHtcclxuICAgICAgICAgICAgbGV0IGJveCA9IFV0aWxpdC5GaW5kQ2hpbGQodGhpcy5ib2FyZHMsIFwiQm94L0JveDAwMl8wXCIpIGFzIExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgICAgIHRoaXMubWVzaFJlbmRlcmVyID0gKGJveCBhcyBMYXlhLk1lc2hTcHJpdGUzRCkuX3JlbmRlciBhcyBMYXlhLk1lc2hSZW5kZXJlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGVyZmVjdEVmZmVjdCA9IFV0aWxpdC5GaW5kQ2hpbGQodGhpcy5vd25lciwgXCJFZmZlY3QvcGVyZmVjdENyYXNoRWZmZWN0XCIpIGFzIExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBUd2VlbkFuaW10aW9uKHR3ZWVuRGVsYXkpIHtcclxuICAgICAgICB0aGlzLmdhbWVPYmplY3QudHJhbnNmb3JtLmxvY2FsU2NhbGVYID0gMC4wMDAxO1xyXG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvblkgPSAwO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5nYW1lT2JqZWN0LnRyYW5zZm9ybSwge2xvY2FsU2NhbGVYOiAxfSwgMC4zICogMTAwMCwgTGF5YS5FYXNlLmJhY2tPdXQsIG51bGwsIHR3ZWVuRGVsYXkgKiAxMDAwKTtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuZ2FtZU9iamVjdC50cmFuc2Zvcm0sIHtsb2NhbFBvc2l0aW9uWTogMH0sIDAuMyAqIDEwMDAsIExheWEuRWFzZS5iYWNrT3V0LCBudWxsLCB0d2VlbkRlbGF5ICogMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlc2V0Qm9hcmQoYmVhdDogQmVhdCwgcG9zaXRpb246IExheWEuVmVjdG9yMywgc2hvd0NvbG9yPzogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuSXNCaWdCb2FyZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gKGJlYXQubm90ZXNbMF0uY29sdW1uSW5kZXggJSAzKSBhcyBCYWxsQ29sb3I7XHJcbiAgICAgICAgICAgIGxldCBtYXRlcmlhbCA9IEdhbWVDb250cm9sbGVyLkluc3RhbmNlLkdldENvbG9yTWF0ZXJpYWwodGhpcy5jb2xvciwgbnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzaFJlbmRlcmVyLm1hdGVyaWFsID0gbWF0ZXJpYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmVkSW5kZXggPSBiZWF0Lm5vdGVzWzBdLmNvbHVtbkluZGV4ICUgMztcclxuICAgICAgICAgICAgbGV0IHJlZEJveCA9IHRoaXMuYm9hcmRzLmdldENoaWxkQnlOYW1lKFwiUmVkXCIpO1xyXG4gICAgICAgICAgICBsZXQgeWVsbG93Qm94ID0gdGhpcy5ib2FyZHMuZ2V0Q2hpbGRCeU5hbWUoXCJZZWxsb3dcIik7XHJcbiAgICAgICAgICAgIGxldCBibHVlQm94ID0gdGhpcy5ib2FyZHMuZ2V0Q2hpbGRCeU5hbWUoXCJCbHVlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmJvYXJkcy5zZXRDaGlsZEluZGV4KHJlZEJveCwgcmVkSW5kZXgrKyk7XHJcbiAgICAgICAgICAgIHRoaXMuYm9hcmRzLnNldENoaWxkSW5kZXgoeWVsbG93Qm94LCAoKHJlZEluZGV4KyspICUgMykpO1xyXG4gICAgICAgICAgICB0aGlzLmJvYXJkcy5zZXRDaGlsZEluZGV4KGJsdWVCb3gsICgocmVkSW5kZXgrKykgJSAzKSk7XHJcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoR2FtZUNvbnN0LkJvYXJkSW50ZXJ2YWwsIDAsIDApO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYm9hcmRzLl9jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJvYXJkID0gdGhpcy5ib2FyZHMuZ2V0Q2hpbGRBdChpKSBhcyBMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgICAgICAgICAgYm9hcmQudHJhbnNmb3JtLmxvY2FsUG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnNldFZhbHVlKHBvc2l0aW9uLnggLSBHYW1lQ29uc3QuQm9hcmRJbnRlcnZhbCwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvd0NvbG9yICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBib2FyZC5hY3RpdmUgPSB0aGlzLkdldENvbG9yQnlTdHJpbmcoYm9hcmQubmFtZSkgPT0gc2hvd0NvbG9yO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBib2FyZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJlYXQgPSBiZWF0O1xyXG4gICAgICAgICh0aGlzLm93bmVyIGFzIExheWEuU3ByaXRlM0QpLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXROb3RlQ29sb3JQb3NpdGlvbihiZWF0OiBCZWF0LCBjb2xvcjogQmFsbENvbG9yKTogTGF5YS5WZWN0b3IzIHtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuSXNCaWdCb2FyZCkge1xyXG4gICAgICAgICAgICBsZXQgcmVkSW5kZXggPSAoYmVhdC5ub3Rlc1swXS5jb2x1bW5JbmRleCAlIDMpO1xyXG4gICAgICAgICAgICBsZXQgY29sb3JJbmRleCA9ICgoY29sb3IgYXMgbnVtYmVyKSArIHJlZEluZGV4KSAlIDM7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMyhHYW1lQ29uc3QuQm9hcmRJbnRlcnZhbCAtIGNvbG9ySW5kZXggKiBHYW1lQ29uc3QuQm9hcmRJbnRlcnZhbCwgMCwgMCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY29sb3IgPSBcIiArIGNvbG9yICsgXCIgIGJlYXQubm90ZXNbMF0uY29sdW1uSW5kZXggPSBcIiArIGJlYXQubm90ZXNbMF0uY29sdW1uSW5kZXggKyBcIiByZWRJbmRleCA9IFwiICsgcmVkSW5kZXggKyBcIiAgY29sb3JJbmRleCA9IFwiICsgY29sb3JJbmRleCkgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBwb3NpdGlvbiA9IFwiICsgSlNPTi5zdHJpbmdpZnkocG9zaXRpb24pKVxyXG5cclxuICAgICAgICByZXR1cm4gcG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENoZWNrVGlyZ2dlcihiYWxsOiBCYWxsQ29udHJvbGxlciwgYm9hcmQ6IExheWEuU3ByaXRlM0QpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5Jc0JpZ0JvYXJkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVGlyZ2dlckJpZ0JvYXJkKGJhbGwsIGJvYXJkKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLlRpcmdnZXJTbWFsbEJvYXJkKGJhbGwsIGJvYXJkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBUaXJnZ2VyQmlnQm9hcmQoYmFsbDogQmFsbENvbnRyb2xsZXIsIGJvYXJkOiBMYXlhLlNwcml0ZTNEKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNvbG9yID0gdGhpcy5jb2xvcjtcclxuICAgICAgICBiYWxsLkNoYW5nZUNvbG9yKGNvbG9yKTtcclxuICAgICAgICB0aGlzLkFjdGl2ZUNyYXNoRWZmZWN0KHRoaXMuZ2FtZU9iamVjdC50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKSk7XHJcbiAgICAgICAgR2FtZUNvbnRyb2xsZXIuSW5zdGFuY2UuQWRkU29uZ1NvdXJjZSh0cnVlLCBiYWxsLmZpbmlzaFByb2dyZXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFRpcmdnZXJTbWFsbEJvYXJkKGJhbGw6IEJhbGxDb250cm9sbGVyLCBib2FyZDogTGF5YS5TcHJpdGUzRCkge1xyXG4gICAgICAgIGlmIChiYWxsID09IG51bGwgfHwgYm9hcmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYmFsbENvbG9yID0gYmFsbC5jdXJDb2xvcjtcclxuICAgICAgICBsZXQgYm9hcmRDb2xvciA9IHRoaXMuR2V0Q29sb3JCeVN0cmluZyhib2FyZC5uYW1lKTtcclxuICAgICAgICBpZiAoYmFsbENvbG9yICE9IGJvYXJkQ29sb3IpIHtcclxuICAgICAgICAgICAgYmFsbC5EZWF0aChmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBlcmZlY3REaXMgPSAwLjU7XHJcbiAgICAgICAgbGV0IGlzUHJlZmVjdCA9IE1hdGguYWJzKGJvYXJkLnRyYW5zZm9ybS5wb3NpdGlvbi54IC0gYmFsbC5iYWxsLnRyYW5zZm9ybS5wb3NpdGlvbi54KSA8IHBlcmZlY3REaXM7XHJcblxyXG4gICAgICAgIEdhbWVDb250cm9sbGVyLkluc3RhbmNlLkFkZFNvbmdTb3VyY2UoaXNQcmVmZWN0LCBiYWxsLmZpbmlzaFByb2dyZXNzKTtcclxuXHJcbiAgICAgICAgdGhpcy5BY3RpdmVDcmFzaEVmZmVjdChib2FyZC50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKSk7XHJcbiAgICAgICAgaWYgKGlzUHJlZmVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLkFjdGl2ZVBlcmZlY3RFZmZlY3QoYm9hcmQudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEFjdGl2ZUNyYXNoRWZmZWN0KHBvc2l0aW9uOiBMYXlhLlZlY3RvcjMpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyYXNoRWZmZWN0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgcG9zaXRpb24uc2V0VmFsdWUocG9zaXRpb24ueCwgcG9zaXRpb24ueSArIDAuMSwgcG9zaXRpb24ueik7XHJcbiAgICAgICAgdGhpcy5jcmFzaEVmZmVjdC50cmFuc2Zvcm0ucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICB0aGlzLmFuaW1hdG9yLnBsYXkoXCJTaGFua1wiKTtcclxuICAgICAgICBMYXlhLnRpbWVyLm9uY2UoMSAqIDEwMDAsIHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRvci5wbGF5KFwiRGVmXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNyYXNoRWZmZWN0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBBY3RpdmVQZXJmZWN0RWZmZWN0KHBvc2l0aW9uOiBMYXlhLlZlY3RvcjMpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBlcmZlY3RFZmZlY3QuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBwb3NpdGlvbi5zZXRWYWx1ZShwb3NpdGlvbi54LCBwb3NpdGlvbi55ICsgMC4xLCBwb3NpdGlvbi56KTtcclxuICAgICAgICB0aGlzLnBlcmZlY3RFZmZlY3QudHJhbnNmb3JtLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgTGF5YS50aW1lci5vbmNlKDEgKiAxMDAwLCB0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGVyZmVjdEVmZmVjdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgR2V0Q29sb3JCeVN0cmluZyhzdHI6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBjb2xvciA9IEJhbGxDb2xvci5SZWQ7XHJcbiAgICAgICAgc3dpdGNoIChzdHIpIHtcclxuICAgICAgICAgICAgY2FzZSBcIlJlZFwiOiBjb2xvciA9IEJhbGxDb2xvci5SZWQ7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiQmx1ZVwiOiBjb2xvciA9IEJhbGxDb2xvci5CbHVlOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIlllbGxvd1wiOiBjb2xvciA9IEJhbGxDb2xvci5ZZWxsb3c7IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBHZXRCaWdCb2FyZENvbG9yKGJlYXQ6IEJlYXQpOiBCYWxsQ29sb3Ige1xyXG4gICAgICAgIHJldHVybiAoYmVhdC5ub3Rlc1swXS5jb2x1bW5JbmRleCAlIDMpIGFzIEJhbGxDb2xvcjtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNvbmdOb3RlLCBCZWF0IH0gZnJvbSBcIi4vTm90ZU1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVDb250cm9sbGVyIGZyb20gXCIuL0dhbWVDb250cm9sbGVyXCI7XHJcbmltcG9ydCBOb3RlQm9hcmQgZnJvbSBcIi4vTm90ZUJvYXJkXCI7XHJcbmltcG9ydCBHYW1lQ29uc3QgZnJvbSBcIi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCB7IEJhbGxDb2xvciB9IGZyb20gXCIuL0JhbGxDb250cm9sbGVyXCI7XHJcbmltcG9ydCBTb3VuZE1hbmFnZXIgZnJvbSBcIi4vU291bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCBCYW5kQmVoYXZpb3IgZnJvbSBcIi4vQXVkaW8vQmFuZEJlaGF2aW9yXCI7XHJcbmltcG9ydCBQYXJhbUN1YmUgZnJvbSBcIi4vQXVkaW8vUGFyYW1DdWJlQ3ViZVwiO1xyXG5pbXBvcnQgQXVkaW9XcmFwZXIgZnJvbSBcIi4vQXVkaW8vQXVkaW9XcmFwZXJcIjtcclxuXHJcbmNvbnN0IENyYXNoRWZmZWN0OiBzdHJpbmcgPSBcIkNyYXNoRWZmZWN0XCI7XHJcbmNvbnN0IFBlcmZlY3RDcmFzaEVmZmVjdDogc3RyaW5nID0gXCJDcmFzaEVmZmVjdFwiO1xyXG5jb25zdCBTbWFsbE5vdGVCb2FyZDogc3RyaW5nID0gXCJTbWFsbE5vdGVCb2FyZFwiO1xyXG5jb25zdCBCaWdOb3RlQm9hcmQ6IHN0cmluZyA9IFwiQmlnTm90ZUJvYXJkXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RlQm9hcmRNYW5hZ2VyIGV4dGVuZHMgTGF5YS5TY3JpcHQzRCB7XHJcbiAgICBwcml2YXRlIF9zb25nTm90ZTogU29uZ05vdGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfbGFzdEFwcGVhckJlYXQ6IEJlYXQgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2JvYXJkUHJlZmFiOiBMYXlhLlNwcml0ZTNEO1xyXG4gICAgcHJpdmF0ZSBfbm90ZUJvYXJkczogQXJyYXk8Tm90ZUJvYXJkPiA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9wYXN0Tm90ZUJvYXJkczogQXJyYXk8Tm90ZUJvYXJkPiA9IG51bGw7XHJcbiAgICBwdWJsaWMgUHJlTG9hZE5vdGVUaW1lOiBudW1iZXIgPSAyMDtcclxuXHJcbiAgICBwcml2YXRlIF9iYW5kQ3ViZXM6IEJhbmRCZWhhdmlvcltdID0gbmV3IEFycmF5O1xyXG5cclxuICAgIHByaXZhdGUgX2NvcnJlY3RDb2xvcjogQmFsbENvbG9yID0gQmFsbENvbG9yLlJlZDtcclxuICAgIHByaXZhdGUgX2NyYXNoUHJlZmFiOiBMYXlhLlNwcml0ZTNEID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3BlcmZlY3RDcmFzaFByZWZhYjogTGF5YS5TcHJpdGUzRCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9iaWdOb3RlQm9hcmRQcmVmYWI6IExheWEuU3ByaXRlM0QgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfc21hbGxOb3RlQm9hcmRQcmVmYWI6IExheWEuU3ByaXRlM0QgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgZ2FtZU9iamVjdCgpOiBMYXlhLlNwcml0ZTNEIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vd25lciBhcyBMYXlhLlNwcml0ZTNEO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHByZWZhYnMgPSBHYW1lQ29udHJvbGxlci5JbnN0YW5jZS5zY2VuZS5nZXRDaGlsZEJ5TmFtZShcIlByZWZhYnNcIik7XHJcbiAgICAgICAgdGhpcy5fY3Jhc2hQcmVmYWIgPSBwcmVmYWJzLmdldENoaWxkQnlOYW1lKFwiY3Jhc2hFZmZlY3RcIikgYXMgTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICB0aGlzLl9wZXJmZWN0Q3Jhc2hQcmVmYWIgPSBwcmVmYWJzLmdldENoaWxkQnlOYW1lKFwicGVyZmVjdENyYXNoRWZmZWN0XCIpIGFzIExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgdGhpcy5fYmlnTm90ZUJvYXJkUHJlZmFiID0gcHJlZmFicy5nZXRDaGlsZEJ5TmFtZShcIkJpZ05vdGVCb2FyZFwiKSBhcyBMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgIHRoaXMuX3NtYWxsTm90ZUJvYXJkUHJlZmFiID0gcHJlZmFicy5nZXRDaGlsZEJ5TmFtZShcIlNtYWxsTm90ZUJvYXJkXCIpIGFzIExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgdGhpcy5Jbml0QmFuZEVmZmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgSW5pdEJhbmRFZmZlY3QoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGVmZmVjdE5vZGUgPSB0aGlzLmdhbWVPYmplY3QuZ2V0Q2hpbGRCeU5hbWUoXCJFZmZlY3RcIik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGJhbmRDdWJlcyAgPSBlZmZlY3ROb2RlLmdldENoaWxkQnlOYW1lKFwiQmFuZEN1YmVzXCIgKyBpKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdWJlID0gYmFuZEN1YmVzLmdldENoaWxkQnlOYW1lKFwiQmFuZEN1YmVcIiArIGopO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1YmUuYWN0aXZlID09IGZhbHNlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJhbUN1YmVDdWJlID0gY3ViZS5hZGRDb21wb25lbnQoUGFyYW1DdWJlKSBhcyBQYXJhbUN1YmU7XHJcbiAgICAgICAgICAgICAgICBwYXJhbUN1YmVDdWJlLmJhbmRJbmRleCA9IGo7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYW5kQ3ViZXMucHVzaChwYXJhbUN1YmVDdWJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZWZmZWN0Tm9kZSA9IHRoaXMuZ2FtZU9iamVjdC5nZXRDaGlsZEJ5TmFtZShcIlN5bnRoZXNpc1wiKTtcclxuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgIC8vICAgICBsZXQgYmFuZEN1YmVzICA9IGVmZmVjdE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJCYW5kQ3ViZXNcIiArIGkpO1xyXG4gICAgICAgIC8vICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IGN1YmUgPSBiYW5kQ3ViZXMuZ2V0Q2hpbGRCeU5hbWUoXCJCYW5kQ3ViZVwiICsgaik7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgcGFyYW1DdWJlQ3ViZSA9IGN1YmUuYWRkQ29tcG9uZW50KFBhcmFtQ3ViZSkgYXMgUGFyYW1DdWJlO1xyXG4gICAgICAgIC8vICAgICAgICAgcGFyYW1DdWJlQ3ViZS5zdGFydFNjYWxlWSA9IDAuNTU7XHJcbiAgICAgICAgLy8gICAgICAgICBwYXJhbUN1YmVDdWJlLm1heFNjYWxlWSA9IDAuN1xyXG4gICAgICAgIC8vICAgICAgICAgcGFyYW1DdWJlQ3ViZS5iYW5kSW5kZXggPSBqO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5fYmFuZEN1YmVzLnB1c2gocGFyYW1DdWJlQ3ViZSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEluaXROb3RlQm9hcmQoc29uZ05vdGU6IFNvbmdOb3RlKSB7XHJcbiAgICAgICAgdGhpcy5DbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX3NvbmdOb3RlID0gc29uZ05vdGU7XHJcbiAgICAgICAgdGhpcy5BdXRvU3Bhd25OZXdOb3RlQm9hcmQoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBBdXRvU3Bhd25OZXdOb3RlQm9hcmQoY3VyVGltZSkge1xyXG4gICAgICAgIGxldCBpbmRlID0gMDtcclxuICAgICAgICBjb25zdCB0aW1lRGVsYXkgPSAwLjE7XHJcbiAgICAgICAgbGV0IHdpbGxTaG93ID0gKGN1clRpbWUgKyB0aGlzLlByZUxvYWROb3RlVGltZSk7XHJcbiAgICAgICAgbGV0IGJlYXRzID0gdGhpcy5fc29uZ05vdGUuYmVhdHM7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiZWF0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYmVhdCA9IGJlYXRzW2ldO1xyXG4gICAgICAgICAgICBsZXQgdGltZUFwcGVhciA9IGJlYXQudGltZUFwcGVhcjtcclxuICAgICAgICAgICAgaWYgKHRpbWVBcHBlYXIgPiB3aWxsU2hvdyB8fCB0aGlzLl9ub3RlQm9hcmRzLmxlbmd0aCA+IDcpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sYXN0QXBwZWFyQmVhdCAhPSBudWxsICYmIHRoaXMuX2xhc3RBcHBlYXJCZWF0LnRpbWVBcHBlYXIgPj0gYmVhdC50aW1lQXBwZWFyKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIuWKoOi9vemfs+espu+8mlwiICsgYmVhdC5ndWlkKTtcclxuICAgICAgICAgICAgbGV0IG5vdGVCb2FyZCA9IHRoaXMuU3Bhd25OZXdOb3RlQm9hcmQoYmVhdCwgKGluZGUrKyAqIHRpbWVEZWxheSkpO1xyXG4gICAgICAgICAgICB0aGlzLl9ub3RlQm9hcmRzLnB1c2gobm90ZUJvYXJkKTtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdEFwcGVhckJlYXQgPSBiZWF0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNwYXduTmV3Tm90ZUJvYXJkKGJlYXQsIHR3ZWVuRGVsYXkpOiBOb3RlQm9hcmQge1xyXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoMCwgMCwgMCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xhc3RBcHBlYXJCZWF0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IGxhc3RCb2FyZCA9IHRoaXMuX25vdGVCb2FyZHNbdGhpcy5fbm90ZUJvYXJkcy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgbGV0IHRpbWVJbmNyZW1lbnQgPSBiZWF0LnRpbWVBcHBlYXIgLSB0aGlzLl9sYXN0QXBwZWFyQmVhdC50aW1lQXBwZWFyXHJcbiAgICAgICAgICAgIGlmICh0aW1lSW5jcmVtZW50ID49IEdhbWVDb25zdC5Cb2FyZEludGVydmFsVGltZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHogPSB0aW1lSW5jcmVtZW50ICogKEdhbWVDb25zdC5Cb2FyZEludGVydmFsU3BhY2UgLyBHYW1lQ29uc3QuQm9hcmRJbnRlcnZhbFRpbWUpXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi5zZXRWYWx1ZSgwLCAwLCBsYXN0Qm9hcmQuZ2FtZU9iamVjdC50cmFuc2Zvcm0ucG9zaXRpb24ueiArIHopO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24uc2V0VmFsdWUoMCwgMCwgbGFzdEJvYXJkLmdhbWVPYmplY3QudHJhbnNmb3JtLnBvc2l0aW9uLnogKyBHYW1lQ29uc3QuQm9hcmRJbnRlcnZhbFNwYWNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlzQmlnQm9hcmQ6IGJvb2xlYW4gPSBiZWF0Lm5vdGVzLmxlbmd0aCA+PSAyO1xyXG4gICAgICAgIGlmIChpc0JpZ0JvYXJkKSB7IFxyXG4gICAgICAgICAgICB0aGlzLl9jb3JyZWN0Q29sb3IgPSBOb3RlQm9hcmQuR2V0QmlnQm9hcmRDb2xvcihiZWF0KTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwcmVmYWJTdHJpbmc6IHN0cmluZyA9IGlzQmlnQm9hcmQgPyBCaWdOb3RlQm9hcmQgOiBTbWFsbE5vdGVCb2FyZDtcclxuICAgICAgICBsZXQgYm9hcmRPYmogPSB0aGlzLkF1dG9TcGF3blByZWZhYihwcmVmYWJTdHJpbmcpO1xyXG4gICAgICAgIGxldCBub3RlQm9hcmQ6IE5vdGVCb2FyZCA9IGJvYXJkT2JqLmdldENvbXBvbmVudChOb3RlQm9hcmQpO1xyXG4gICAgICAgIGlmIChub3RlQm9hcmQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBub3RlQm9hcmQgPSBib2FyZE9iai5hZGRDb21wb25lbnQoTm90ZUJvYXJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNob3dPbmVDb2xvciA9IEdhbWVDb250cm9sbGVyLkluc3RhbmNlLmN1cnJlbnRTb25nLnNob3dPbmVDb2xvcjtcclxuICAgICAgICBub3RlQm9hcmQuUmVzZXRCb2FyZChiZWF0LCBwb3NpdGlvbiwgc2hvd09uZUNvbG9yID8gdGhpcy5fY29ycmVjdENvbG9yIDogbnVsbCk7XHJcbiAgICAgICAgbm90ZUJvYXJkLlR3ZWVuQW5pbXRpb24odHdlZW5EZWxheSk7XHJcbiAgICAgICAgcmV0dXJuIG5vdGVCb2FyZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEF1dG9SZWN5Y2xlTm90ZUJvYXJkKCkge1xyXG4gICAgICAgIGNvbnN0IFJlbW92YWxEaXN0YW5jZSA9IDEwXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9ub3RlQm9hcmRzLmxlbmd0aDspIHtcclxuICAgICAgICAgICAgbGV0IG5vdGVCb2FyZCA9IHRoaXMuX25vdGVCb2FyZHNbaV07XHJcblxyXG4gICAgICAgICAgICBsZXQgZGlzdGFuY2UgPSBHYW1lQ29udHJvbGxlci5JbnN0YW5jZS5iYWxsQ29udHJvbGxlci5nYW1lT2JqZWN0LnRyYW5zZm9ybS5wb3NpdGlvbi56IC0gbm90ZUJvYXJkLmdhbWVPYmplY3QudHJhbnNmb3JtLnBvc2l0aW9uLno7XHJcbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IFJlbW92YWxEaXN0YW5jZSAvIDIpIHsgaSsrOyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fbm90ZUJvYXJkcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Bhc3ROb3RlQm9hcmRzLnB1c2gobm90ZUJvYXJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9wYXN0Tm90ZUJvYXJkcy5sZW5ndGg7KSB7XHJcbiAgICAgICAgICAgIGxldCBub3RlQm9hcmQgPSB0aGlzLl9wYXN0Tm90ZUJvYXJkc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IEdhbWVDb250cm9sbGVyLkluc3RhbmNlLmJhbGxDb250cm9sbGVyLmdhbWVPYmplY3QudHJhbnNmb3JtLnBvc2l0aW9uLnogLSBub3RlQm9hcmQuZ2FtZU9iamVjdC50cmFuc2Zvcm0ucG9zaXRpb24uejtcclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgUmVtb3ZhbERpc3RhbmNlKSB7IGkrKzsgY29udGludWU7IH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3Bhc3ROb3RlQm9hcmRzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgdGhpcy5SZWN5Y2xlTm90ZUJvYXJkKG5vdGVCb2FyZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgUmVjeWNsZU5vdGVCb2FyZChub3RlQm9hcmQpIHtcclxuICAgICAgICBub3RlQm9hcmQuZ2FtZU9iamVjdC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvblkgPSAtMTAwO1xyXG4gICAgICAgIGxldCBib2FyZFN0cmluZyA9IG5vdGVCb2FyZC5Jc0JpZ0JvYXJkID8gQmlnTm90ZUJvYXJkIDogU21hbGxOb3RlQm9hcmQ7XHJcbiAgICAgICAgdGhpcy5SZWN5Y2xlUHJlZmFiKGJvYXJkU3RyaW5nLCBub3RlQm9hcmQuZ2FtZU9iamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9ub3RlQm9hcmRzICE9IG51bGwgKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbm90ZUJvYXJkcy5sZW5ndGg7KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm90ZUJvYXJkID0gdGhpcy5fbm90ZUJvYXJkc1tpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25vdGVCb2FyZHMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZWN5Y2xlTm90ZUJvYXJkKG5vdGVCb2FyZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9wYXN0Tm90ZUJvYXJkcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcGFzdE5vdGVCb2FyZHMubGVuZ3RoOykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vdGVCb2FyZCA9IHRoaXMuX3Bhc3ROb3RlQm9hcmRzW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFzdE5vdGVCb2FyZHMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZWN5Y2xlTm90ZUJvYXJkKG5vdGVCb2FyZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NvcnJlY3RDb2xvciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbGFzdEFwcGVhckJlYXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX25vdGVCb2FyZHMgPSBuZXcgQXJyYXk7XHJcbiAgICAgICAgdGhpcy5fcGFzdE5vdGVCb2FyZHMgPSBuZXcgQXJyYXk7XHJcbiAgICAgICAgdGhpcy5nYW1lT2JqZWN0LnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0Tm90ZUJvYXJkYnlCZWF0KGJlYXQ6IEJlYXQpOiBOb3RlQm9hcmQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbm90ZUJvYXJkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm90ZUJvYXJkID0gdGhpcy5fbm90ZUJvYXJkc1tpXTtcclxuICAgICAgICAgICAgaWYgKGJlYXQuZ3VpZCA9PSBub3RlQm9hcmQuYmVhdC5ndWlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm90ZUJvYXJkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBLbm9ja05vdGUoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGVmZmVjdE5vZGUgPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiRWZmZWN0XCIpO1xyXG4gICAgICAgIGxldCBub3RlMSA9IGVmZmVjdE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ5aW5nYm9cIikgYXMgTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCB0d2VlblRpbWUgPSAwLjA3ICogMTAwMDtcclxuICAgICAgICBjb25zdCB0d2VlblNjYWxlID0gMS4wMztcclxuICAgICAgICBMYXlhLlR3ZWVuLmNsZWFyQWxsKG5vdGUxLnRyYW5zZm9ybSk7XHJcbiAgICAgICAgbGV0IGNoYW5nZTogYW55ID0ge2xvY2FsU2NhbGVYOiB0d2VlblNjYWxlLCBsb2NhbFNjYWxlWTogdHdlZW5TY2FsZSwgbG9jYWxTY2FsZVo6IHR3ZWVuU2NhbGV9O1xyXG4gICAgICAgIGxldCBkZWY6YW55ID0ge2xvY2FsU2NhbGVYOiAxLCBsb2NhbFNjYWxlWTogMSwgbG9jYWxTY2FsZVo6IDF9O1xyXG4gICAgICAgIExheWEuVHdlZW4udG8obm90ZTEudHJhbnNmb3JtLCBjaGFuZ2UsIHR3ZWVuVGltZSwgTGF5YS5FYXNlLnF1YWRPdXQsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICBMYXlhLlR3ZWVuLnRvKG5vdGUxLnRyYW5zZm9ybSwgZGVmLCB0d2VlblRpbWUsIExheWEuRWFzZS5xdWFkSW4pO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQXV0b1NwYXduUHJlZmFiKGtleTogc3RyaW5nKTogTGF5YS5TcHJpdGUzRCB7XHJcbiAgICAgICAgbGV0IG9iaiA9IExheWEuUG9vbC5nZXRJdGVtKGtleSkgYXMgTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBpZiAob2JqICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNjZW5lID0gR2FtZUNvbnRyb2xsZXIuSW5zdGFuY2Uuc2NlbmU7XHJcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICAgICAgY2FzZSBDcmFzaEVmZmVjdDoge1xyXG4gICAgICAgICAgICAgICAgb2JqID0gTGF5YS5TcHJpdGUzRC5pbnN0YW50aWF0ZSh0aGlzLl9jcmFzaFByZWZhYiwgc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBQZXJmZWN0Q3Jhc2hFZmZlY3Q6IHtcclxuICAgICAgICAgICAgICAgIG9iaiA9IExheWEuU3ByaXRlM0QuaW5zdGFudGlhdGUodGhpcy5fcGVyZmVjdENyYXNoUHJlZmFiLCBzY2VuZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEJpZ05vdGVCb2FyZDoge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGUgYmlnXCIpO1xyXG4gICAgICAgICAgICAgICAgb2JqID0gTGF5YS5TcHJpdGUzRC5pbnN0YW50aWF0ZSh0aGlzLl9iaWdOb3RlQm9hcmRQcmVmYWIsIHNjZW5lKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBTbWFsbE5vdGVCb2FyZDoge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGUgc21hbGxcIik7XHJcbiAgICAgICAgICAgICAgICBvYmogPSBMYXlhLlNwcml0ZTNELmluc3RhbnRpYXRlKHRoaXMuX3NtYWxsTm90ZUJvYXJkUHJlZmFiLCBzY2VuZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OiB0aHJvdyBcIuayoeaciei/meS4qumihOWItuS9k++8mlwiICsga2V5O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWN5Y2xlUHJlZmFiKGtleTogc3RyaW5nLCBvYmo6IExheWEuU3ByaXRlM0QpOiB2b2lkIHtcclxuICAgICAgICBvYmoudHJhbnNmb3JtLmxvY2FsUG9zaXRpb25YID0gLTEwO1xyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKGtleSwgb2JqKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQmFuZEN1YmVzU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9iYW5kQ3ViZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFuZEN1YmVzW2ldLlN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCYW5kQ3ViZXNTdG9wKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYmFuZEN1YmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JhbmRDdWJlc1tpXS5TdG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTGF0ZVVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIUdhbWVDb250cm9sbGVyLkluc3RhbmNlLmlzUnVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQXV0b1JlY3ljbGVOb3RlQm9hcmQoKTtcclxuICAgICAgICBpZiAoQXVkaW9XcmFwZXIuSW5zdGFuY2UuU291bmRDaGFubmVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQXV0b1NwYXduTmV3Tm90ZUJvYXJkKEF1ZGlvV3JhcGVyLkluc3RhbmNlLlBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB0cmFuc2Zvcm0gPSAodGhpcy5vd25lciBhcyBMYXlhLlNwcml0ZTNEKS50cmFuc2Zvcm07XHJcbiAgICAgICAgdHJhbnNmb3JtLnBvc2l0aW9uID0gR2FtZUNvbnRyb2xsZXIuSW5zdGFuY2UuYmFsbENvbnRyb2xsZXIuZ2FtZU9iamVjdC50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGVNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTm90ZU1hbmFnZXI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogTm90ZU1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZSA/IHRoaXMuX2luc3RhbmNlIDogdGhpcy5faW5zdGFuY2UgPSBuZXcgTm90ZU1hbmFnZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zb25nTm90ZTogU29uZ05vdGUgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgc29uZ05vdGUoKTogU29uZ05vdGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zb25nTm90ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgTG9hZCh1cmwsIGNhbGxlciwgY29tcGxldGVkKTogdm9pZCB7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZCh1cmwsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQganNvbiA9IExheWEubG9hZGVyLmdldFJlcyh1cmwpO1xyXG4gICAgICAgICAgICBpZiAoanNvbiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiuv+mXrlNvbmfoioLlpY/mlofku7botYTmupDlpLHotKXvvIFcIiArIHVybCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Mb2FkSnNvbihMYXlhLmxvYWRlci5nZXRSZXModXJsKSk7XHJcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZWQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29tcGxldGVkLmNhbGwoY2FsbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLCBudWxsLCBMYXlhLkxvYWRlci5KU09OKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBMb2FkSnNvbihqc29uKSB7XHJcbiAgICAgICAgaWYgKGpzb24gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB0aW1lID0ganNvbltcInRpbWVcIl07XHJcbiAgICAgICAgbGV0IG5vdGVzID0ganNvbltcIm5vdGVcIl07XHJcbiAgICAgICAgaWYgKG5vdGVzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJwbSA9IHRpbWVbMF0uYnBtO1xyXG4gICAgICAgIGxldCBwYXJ0QmVhdCA9IG5vdGVzWzBdLmJlYXRbMl07XHJcbiAgICAgICAgbGV0IGJlYXRUaW1lID0gNjAgLyAodGltZVswXS5icG0gKiBwYXJ0QmVhdCk7XHJcbiAgICAgICAgbGV0IGJlYXREZWxheSA9IG5vdGVzW25vdGVzLmxlbmd0aCAtIDFdLm9mZnNldCAvIDEwMDA7XHJcblxyXG4gICAgICAgIGxldCBzb25nTm90ZSA9IG5ldyBTb25nTm90ZSh0aW1lWzBdLmJwbSwgdGhpcy5BbmFseXplVHJhbnNmb3JtTm90ZVRlc3Qobm90ZXMsIGJwbSksIGJlYXREZWxheSk7XHJcbiAgICAgICAgc29uZ05vdGUuc29uZ05hbWUgPSBub3Rlc1tub3Rlcy5sZW5ndGggLSAxXS5zb3VuZDtcclxuICAgICAgICB0aGlzLl9zb25nTm90ZSA9IHNvbmdOb3RlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQW5hbHl6ZVRyYW5zZm9ybU5vdGUobm90ZXMsIHBhcnRCZWF0LCBiZWF0VGltZSk6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIGxldCBvbGRCZWF0SW5kZXggPSBudWxsO1xyXG4gICAgICAgIGxldCBiZWF0QWxsTm90ZXM6IEFycmF5PGFueT4gPSBudWxsO1xyXG4gICAgICAgIGxldCBBbGxCZWF0czogQXJyYXk8QmVhdD4gPSBuZXcgQXJyYXk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub3Rlcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vdGUgPSBub3Rlc1tpXTtcclxuICAgICAgICAgICAgbGV0IG5vdGVJbmRleCA9IG5vdGUuYmVhdFswXVxyXG4gICAgICAgICAgICBsZXQgYmVhdEluZGV4ID0gKG5vdGVJbmRleCAqIHBhcnRCZWF0ICsgbm90ZS5iZWF0WzFdKTtcclxuICAgICAgICAgICAgbGV0IGNvbHVtbkluZGV4ID0gbm90ZS5jb2x1bW47XHJcbiAgICAgICAgICAgIGxldCB0aW1lQXBwZWFyID0gYmVhdEluZGV4ICogYmVhdFRpbWU7XHJcblxyXG4gICAgICAgICAgICBpZiAob2xkQmVhdEluZGV4ICE9IGJlYXRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgYmVhdEFsbE5vdGVzID0gbmV3IEFycmF5O1xyXG4gICAgICAgICAgICAgICAgb2xkQmVhdEluZGV4ID0gYmVhdEluZGV4O1xyXG4gICAgICAgICAgICAgICAgQWxsQmVhdHMucHVzaChuZXcgQmVhdChiZWF0QWxsTm90ZXMsIE5vdGVNYW5hZ2VyLmd1aWRJbmRleCsrKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmVhdEFsbE5vdGVzLnB1c2gobmV3IE5vdGUoY29sdW1uSW5kZXgsIHRpbWVBcHBlYXIpKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQWxsQmVhdHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ3VpZEluZGV4ID0gMDtcclxuICAgIHByaXZhdGUgQW5hbHl6ZVRyYW5zZm9ybU5vdGVUZXN0KG5vdGVzLCBicG0pOiBBcnJheTxhbnk+IHtcclxuICAgICAgICBsZXQgb2xkQmVhdEluZGV4ID0gbnVsbDtcclxuICAgICAgICBsZXQgYmVhdEFsbE5vdGVzOiBBcnJheTxhbnk+ID0gbnVsbDtcclxuICAgICAgICBsZXQgQWxsQmVhdHM6IEFycmF5PEJlYXQ+ID0gbmV3IEFycmF5O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm90ZXMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBub3RlID0gbm90ZXNbaV07XHJcbiAgICAgICAgICAgIGxldCBiZWF0ID0gbm90ZS5iZWF0O1xyXG4gICAgICAgICAgICBsZXQgY29sdW1uSW5kZXggPSBub3RlLmNvbHVtbjtcclxuICAgICAgICAgICAgbGV0IGJlYXRJbmRleCA9IChub3RlLmJlYXRbMF0gKiBub3RlLmJlYXRbMl0gKyBub3RlLmJlYXRbMV0pO1xyXG4gICAgICAgICAgICBsZXQgdGltZUFwcGVhciA9IGJlYXRJbmRleCAqICg2MCAvIChicG0gKiBub3RlLmJlYXRbMl0pICk7XHJcblxyXG4gICAgICAgICAgICBpZiAob2xkQmVhdEluZGV4ICE9IHRpbWVBcHBlYXIpIHtcclxuICAgICAgICAgICAgICAgIGJlYXRBbGxOb3RlcyA9IG5ldyBBcnJheTtcclxuICAgICAgICAgICAgICAgIG9sZEJlYXRJbmRleCA9IHRpbWVBcHBlYXI7XHJcbiAgICAgICAgICAgICAgICBBbGxCZWF0cy5wdXNoKG5ldyBCZWF0KGJlYXRBbGxOb3RlcywgTm90ZU1hbmFnZXIuZ3VpZEluZGV4KyspKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiZWF0QWxsTm90ZXMucHVzaChuZXcgTm90ZShjb2x1bW5JbmRleCwgdGltZUFwcGVhcikpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBbGxCZWF0cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0QmVhdChpbmRleDogbnVtYmVyKTogQmVhdCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc29uZ05vdGUuYmVhdHNbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRCZWF0VGltZUFwcGVhcihpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zb25nTm90ZS5iZWF0c1tpbmRleF0udGltZUFwcGVhcjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNvbmdOb3RlIHtcclxuICAgIHB1YmxpYyBicG06IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgYmVhdERlbGF5OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGJlYXRzOiBBcnJheTxCZWF0PiA9IG51bGw7XHJcbiAgICBwdWJsaWMgc29uZ05hbWU6IHN0cmluZyA9IFwiXCJcclxuICAgIGNvbnN0cnVjdG9yKGJwbSwgYmVhdHMsIGJlYXREZWxheSA9IDApIHtcclxuICAgICAgICB0aGlzLmJlYXRzID0gYmVhdHM7XHJcbiAgICAgICAgdGhpcy5icG0gPSBicG07XHJcbiAgICAgICAgdGhpcy5iZWF0RGVsYXkgPSBiZWF0RGVsYXkgPT0gbnVsbCA/IDAgOiBiZWF0RGVsYXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb25lKCk6IFNvbmdOb3RlIHtcclxuICAgICAgICBsZXQgYnBtID0gdGhpcy5icG07XHJcbiAgICAgICAgbGV0IGJlYXREZWxheSA9IHRoaXMuYmVhdERlbGF5O1xyXG4gICAgICAgIGxldCBub3RlczogQXJyYXk8QmVhdD4gPSBuZXcgQXJyYXk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJlYXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5vdGVzLnB1c2godGhpcy5iZWF0c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgU29uZ05vdGUoYnBtLCBub3RlcywgYmVhdERlbGF5KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJlYXQge1xyXG4gICAgcHVibGljIGd1aWQ6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgbm90ZXM6IEFycmF5PE5vdGU+ID0gbnVsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub3RlcywgZ3VpZDogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHRoaXMubm90ZXMgPSBub3RlcztcclxuICAgICAgICB0aGlzLmd1aWQgPSBndWlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdGltZUFwcGVhcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vdGVzWzBdLnRpbWVBcHBlYXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldENvbHVtbkdyb3VwKGNvbHVtbik6IE5vdGUge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub3Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ub3Rlc1tpXS5jb2x1bW5JbmRleCA9PSBjb2x1bW4pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ub3Rlc1tpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOb3RlIHtcclxuICAgIHB1YmxpYyBub3RlSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgY29sdW1uSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgdGltZUFwcGVhcjogbnVtYmVyID0gMDtcclxuICAgIGNvbnN0cnVjdG9yKGNvbHVtbkluZGV4LCB0aW1lQXBwZWFyKSB7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5JbmRleCA9IGNvbHVtbkluZGV4O1xyXG4gICAgICAgIHRoaXMudGltZUFwcGVhciA9IHRpbWVBcHBlYXI7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmVyc2lvbiwgeyBTb25nLCBDaGFyZ2VUeXBlIH0gZnJvbSBcIi4vVmVyc2lvblwiO1xyXG5pbXBvcnQgVXNlcl95eSwgeyBQYXNzU29uZyB9IGZyb20gXCIuLi9Vc2VyL1VzZXJcIjtcclxuaW1wb3J0IFZpZXdfbXlxcV9NZ3IsIHsgVmlld0RlZiB9IGZyb20gXCIuLi9NZ3IvVmlld01nclwiO1xyXG5pbXBvcnQgV1hBUEkgZnJvbSBcIi4uL1dYQVBJXCI7XHJcbmltcG9ydCBHYW1lX215cXFfTWdyIGZyb20gXCIuLi9NZ3IvR2FtZU1nclwiO1xyXG5pbXBvcnQgQXVkaW9XcmFwZXIgZnJvbSBcIi4vQXVkaW8vQXVkaW9XcmFwZXJcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBjYXN0UGxheU9uZU1vbmV5ID0gMTA7XHJcbmNvbnN0IGxhc3RTb25nS2V5ID0gXCJMYXN0UGxheVNvbmdcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb3VuZE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBTb3VuZE1hbmFnZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpOiBTb3VuZE1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiBTb3VuZE1hbmFnZXIuX2luc3RhbmNlID8gU291bmRNYW5hZ2VyLl9pbnN0YW5jZSA6IFNvdW5kTWFuYWdlci5faW5zdGFuY2UgPSBuZXcgU291bmRNYW5hZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBJc0ZpcnN0RW50ZXJHYW1lKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IEZpcnN0RW50ZXIgPSBcIkZpcnN0RW50ZXJcIlxyXG4gICAgICAgIGxldCB2YWx1ZSA9IExheWEuTG9jYWxTdG9yYWdlLmdldEl0ZW0oRmlyc3RFbnRlcik7XHJcbiAgICAgICAgTGF5YS5Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShGaXJzdEVudGVyLCBcInN1Y2NlZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgSXNGaXJzdFRpbWUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBsZXQgcGFzc1NvbmdzID0gVXNlcl95eS5nZXRQYXNzU29uZygpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFzc1NvbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXNzU29uZ3NbaV0uY29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb3VudCA8IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENoZWNrU29uZ1VubG9ja2VkKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBVc2VyX3l5LkluY2x1ZGV0U29uZyhuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2FuUGxheU9uZSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoVXNlcl95eS5nZXRNb25leSgpIDwgY2FzdFBsYXlPbmVNb25leSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldFNvbmdSZWNvcmQobmFtZTogc3RyaW5nKTogUGFzc1Nvbmcge1xyXG4gICAgICAgIGxldCBwYXNzU29uZ3MgPSBVc2VyX3l5LmdldFBhc3NTb25nKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXNzU29uZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNvbmcgPSBwYXNzU29uZ3NbaV07XHJcbiAgICAgICAgICAgIGlmIChzb25nLm5hbWUgPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNvbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNhdmVTb25nUmVjb3JkKG5hbWU6IHN0cmluZywgc3RhckxldmVsOiBudW1iZXIsIHNvdXJjZTogbnVtYmVyLCBjb21wbGV0ZWQ6IGJvb2xlYW4sIHNhdmVDb21wbGV0ZWQ/OiBMYXlhLkhhbmRsZXIgKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzYXZlU29uZ1JlY29yZDpcIiArIG5hbWUgKyBcInxzdGFyTGV2ZWw6XCIgKyBzdGFyTGV2ZWwgKyBcInxzb3VyY2U6XCIgKyBzb3VyY2UpO1xyXG4gICAgICAgIGxldCBwYXNzU29uZyA9IHRoaXMuR2V0U29uZ1JlY29yZChuYW1lKTtcclxuICAgICAgICBpZiAoc291cmNlID4gcGFzc1Nvbmcuc291cmNlKSB7XHJcbiAgICAgICAgcGFzc1Nvbmcuc291cmNlID0gc291cmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhckxldmVsID4gcGFzc1Nvbmcuc3RhckxldmVsKSB7XHJcbiAgICAgICAgICAgIHBhc3NTb25nLnN0YXJMZXZlbCA9IHN0YXJMZXZlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFwYXNzU29uZy5jb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgcGFzc1NvbmcuY29tcGxldGVkID0gY29tcGxldGVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXNhdmVDb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgR2FtZV9teXFxX01nci5nZXRJbnN0YW5jZSgpLnNhdmVfbXlxcV9HYW1lRGF0YSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVfbXlxcV9NZ3IuZ2V0SW5zdGFuY2UoKS5zYXZlX215cXFfR2FtZURhdGEoc2F2ZUNvbXBsZXRlZC5jYWxsZXIsIHNhdmVDb21wbGV0ZWQubWV0aG9kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldFNvbmdieU5hbWUobmFtZTogc3RyaW5nKTogU29uZyB7XHJcbiAgICAgICAgbGV0IHNvbmdzID0gVmVyc2lvbi5zb25ncztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChzb25nc1tpXS5uYW1lID09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzb25nc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQbGF5U29uZ2J5TmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgc29uZyA9IHRoaXMuR2V0U29uZ2J5TmFtZShuYW1lKTtcclxuICAgICAgICB0aGlzLlBsYXlTb25nKHNvbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDaGVja1NvbmdJc0ZyZWUoc29uZzogU29uZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBpc0ZyZWUgPSBWZXJzaW9uLmVuYWJsZUNoYXJnZSA/IHNvbmcuY2hhcmdlVHlwZSA9PSAwIDogdHJ1ZTtcclxuICAgICAgICByZXR1cm4gaXNGcmVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBdWRpdGlvblNvbmcoc29uZzogU29uZyk6IHZvaWQge1xyXG4gICAgICAgIExheWEuTG9jYWxTdG9yYWdlLnNldEl0ZW0obGFzdFNvbmdLZXksIHNvbmcubmFtZSk7XHJcbiAgICAgICAgQXVkaW9XcmFwZXIuSW5zdGFuY2UuTG9hZFBsYXkoc29uZy5zb25nUGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBsYXlTb25nKHNvbmc6IFNvbmcsIGNhbGxlcj86IGFueSwgY29tcGxldGVkPzogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICAvLyBpZiAoVXNlci5nZXRNb25leSgpIDwgMTApIHtcclxuICAgICAgICAvLyAgICAgVmlld19teXFxX01nci5pbnN0YW5jZS5vcGVuVmlldyhWaWV3RGVmLlRpcHNWaWV3LCBcIuS9oOW9k+WJjeS9k+WKm+S4jei2s1wiKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgaWYgKHNvbmcgPT0gbnVsbCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcGxheVNvbmcoc3VjY2VlZCkge1xyXG4gICAgICAgICAgICBpZiAoIXN1Y2NlZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBBdWRpb1dyYXBlci5JbnN0YW5jZS5TdG9wKCk7XHJcbiAgICAgICAgICAgIExheWEuTG9jYWxTdG9yYWdlLnNldEl0ZW0obGFzdFNvbmdLZXksIHNvbmcubmFtZSk7XHJcbiAgICAgICAgICAgIFZpZXdfbXlxcV9NZ3IuaW5zdGFuY2Uub3BlblZpZXcoVmlld0RlZi5HYW1lTG9hZGluZ1ZpZXcsIHNvbmcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5jYWxsKGNhbGxlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBvd2VyRW5vdWdoID0gdGhpcy5DYW5QbGF5T25lKCk7XHJcbiAgICAgICAgdGhpcy5QbGF5QW5kVW5sb2NrU29uZyhwb3dlckVub3VnaCwgc29uZywgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBwbGF5U29uZykpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRTb25nQ2FzdE1vbmV5KHNvbmc6IFNvbmcpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBzb25nLmNoYXJnZVR5cGUgPT0gQ2hhcmdlVHlwZS5Qb3dlciA/IHNvbmcuY29zdFBvd2VyIDogY2FzdFBsYXlPbmVNb25leTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU3ViUGxheU9uZU1vbmV5KHNvbmc6IFNvbmcsIHNhdmVOb3c6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjYXN0TW9uZXkgPSB0aGlzLkdldFNvbmdDYXN0TW9uZXkoc29uZyk7XHJcbiAgICAgICAgVXNlcl95eS5zdWJNb25leShjYXN0TW9uZXkpO1xyXG4gICAgICAgIGlmIChzYXZlTm93ID09IHRydWUpIHtcclxuICAgICAgICAgICAgR2FtZV9teXFxX01nci5nZXRJbnN0YW5jZSgpLnNhdmVfbXlxcV9HYW1lRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFBsYXlBbmRVbmxvY2tTb25nKHBvd2VyRW5vdWdoOiBib29sZWFuLCBzb25nOiBTb25nLCBjb21wbGV0ZWQ/OiBMYXlhLkhhbmRsZXIpIHtcclxuICAgICAgICBsZXQgbG9va0FkU3VjY2VlZCA9IChzdWNjZWVkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZWQpIGNvbXBsZXRlZC5ydW5XaXRoKHN1Y2NlZWQpO1xyXG4gICAgICAgICAgICBpZiAoIXN1Y2NlZWQpIHtcclxuICAgICAgICAgICAgICAgIFZpZXdfbXlxcV9NZ3IuaW5zdGFuY2Uuc2hvd1RpcHMoXCLop4LnnIvlrozmlbTop4bpopHmiY3lj6/op6PplIHmuLjmiI/vvIFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFVc2VyX3l5LkluY2x1ZGV0U29uZyhzb25nLm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBVc2VyX3l5LkFkZFVubG9ja1Nvbmcoc29uZy5uYW1lKTtcclxuICAgICAgICAgICAgICAgIEdhbWVfbXlxcV9NZ3IuZ2V0SW5zdGFuY2UoKS5zYXZlX215cXFfR2FtZURhdGEodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghVmVyc2lvbi5lbmFibGVDaGFyZ2UpIHtcclxuICAgICAgICAgICAgaWYgKCFwb3dlckVub3VnaCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5Q2FzdEJ5Q2hhcmdlVHlwZSgyLCAwLCB0aGlzLCBsb29rQWRTdWNjZWVkKTtcclxuICAgICAgICAgICAgICAgIC8vVmlld19teXFxX01nci5pbnN0YW5jZS5zaG93VGlwcyhcIuW9k+WJjeS9k+WKm+S4jei2s1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxvb2tBZFN1Y2NlZWQuY2FsbCh0aGlzLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChVc2VyX3l5LkluY2x1ZGV0U29uZyhzb25nLm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkICE9IG51bGwpIGNvbXBsZXRlZC5ydW5XaXRoKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuUGxheUNhc3RCeUNoYXJnZVR5cGUoc29uZy5jaGFyZ2VUeXBlLCBzb25nLmNvc3RQb3dlciwgdGhpcywgbG9va0FkU3VjY2VlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgTG9va1Jld2FyZGVkVmlkZW8oY29tcGxldGVkPzogTGF5YS5IYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5Q2FzdEJ5Q2hhcmdlVHlwZSgzLCAwLCBjb21wbGV0ZWQuY2FsbGVyLCBjb21wbGV0ZWQubWV0aG9kKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAwIOWFjei0uSAxIOmHkeW4gSAyIOW5v+WRilxyXG4gICAgcHJpdmF0ZSBQbGF5Q2FzdEJ5Q2hhcmdlVHlwZShjaGFyZ2VUeXBlOiBDaGFyZ2VUeXBlLCBjYXN0TW9uZXk6IG51bWJlciwgY2FsbGVyOiBhbnksIGhhbmRsZXI6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgc3dpdGNoKGNoYXJnZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBDaGFyZ2VUeXBlLkZyZWU6IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YWN6LS56Kej6ZSBXCIpO1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlci5jYWxsKGNhbGxlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIENoYXJnZVR5cGUuUG93ZXI6IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5raI6ICX5L2T5Yqb6Kej6ZSBXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKFVzZXJfeXkuZ2V0TW9uZXkoKSA8IGNhc3RNb25leSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbChjYWxsZXIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBVc2VyX3l5LnN1Yk1vbmV5KDEwKTtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbChjYWxsZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBDaGFyZ2VUeXBlLlZpZGVvOiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW5v+WRiuino+mUgVwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgICAgIFdYQVBJLnNob3dSZXdhcmRlZFZpZGVvQWQoKGlzQ29tcGxldGVkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5jYWxsKGNhbGxlciwgaXNDb21wbGV0ZWQpO1xyXG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbChjYWxsZXIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldExhc3RQbGF5U29uZ0luZGV4KCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBsZXQgbmFtZSA9IExheWEuTG9jYWxTdG9yYWdlLmdldEl0ZW0obGFzdFNvbmdLZXkpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBWZXJzaW9uLnNvbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzb25nID0gVmVyc2lvbi5zb25nc1tpXTtcclxuICAgICAgICAgICAgaWYgKHNvbmcubmFtZSA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRTb25nQXdhcmRzKHdpbiwgc3RhckxldmVsKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCBhd2FyZHMgPSAyO1xyXG4gICAgICAgIHJldHVybiAod2luKSA/IGF3YXJkcyAqIHN0YXJMZXZlbCA6IDU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldEFkU29uZ0F3YXJkcyhzdGFyTGV2ZWwpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMuR2V0U29uZ0F3YXJkcyh0cnVlLCBzdGFyTGV2ZWwpICogNTtcclxuICAgICAgICBVc2VyX3l5LmFkZE1vbmV5KGNvdW50KTtcclxuICAgICAgICBHYW1lX215cXFfTWdyLmdldEluc3RhbmNlKCkuc2F2ZV9teXFxX0dhbWVEYXRhKCk7IFxyXG4gICAgICAgIHJldHVybiBVc2VyX3l5LmdldE1vbmV5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldEZyZWVTb25nQXdhcmRzKCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5HZXRTb25nQXdhcmRzKGZhbHNlLCAwKTtcclxuICAgICAgICBVc2VyX3l5LmFkZE1vbmV5KGNvdW50KTtcclxuICAgICAgICBHYW1lX215cXFfTWdyLmdldEluc3RhbmNlKCkuc2F2ZV9teXFxX0dhbWVEYXRhKCk7IFxyXG4gICAgICAgIHJldHVybiBVc2VyX3l5LmdldE1vbmV5KCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDYW1lcmFNb3ZlU2NyaXB0IGV4dGVuZHMgTGF5YS5TY3JpcHQzRHtcclxuICAgIHByaXZhdGUgY2FtZXJhO1xyXG4gICAgcHJpdmF0ZSBfdGVtcFZlY3RvcjM6IExheWEuVmVjdG9yMztcclxuICAgIHByaXZhdGUgeWF3UGl0Y2hSb2xsOiBMYXlhLlZlY3RvcjM7XHJcbiAgICBwcml2YXRlIHJlc3VsdFJvdGF0aW9uOiBMYXlhLlF1YXRlcm5pb247XHJcbiAgICBwcml2YXRlIHRlbXBSb3RhdGlvblo6IExheWEuUXVhdGVybmlvbjtcclxuICAgIHByaXZhdGUgdGVtcFJvdGF0aW9uWDogTGF5YS5RdWF0ZXJuaW9uO1xyXG4gICAgcHJpdmF0ZSB0ZW1wUm90YXRpb25ZOiBMYXlhLlF1YXRlcm5pb247XHJcbiAgICBwcml2YXRlIHJvdGFpb25TcGVlZDogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX3RlbXBWZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMueWF3UGl0Y2hSb2xsID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMucmVzdWx0Um90YXRpb24gPSBuZXcgTGF5YS5RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgdGhpcy50ZW1wUm90YXRpb25aID0gbmV3IExheWEuUXVhdGVybmlvbigpO1xyXG4gICAgICAgIHRoaXMudGVtcFJvdGF0aW9uWCA9IG5ldyBMYXlhLlF1YXRlcm5pb24oKTtcclxuICAgICAgICB0aGlzLnRlbXBSb3RhdGlvblkgPSBuZXcgTGF5YS5RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgdGhpcy5yb3RhaW9uU3BlZWQgPSAwLjAwMDA2O1xyXG4gICAgfVxyXG5cdG9uQXdha2UoKXtcclxuXHRcdExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5SSUdIVF9NT1VTRV9ET1dOLCB0aGlzLCB0aGlzLm1vdXNlRG93bik7XHJcblx0XHRMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuUklHSFRfTU9VU0VfVVAsIHRoaXMsIHRoaXMubW91c2VVcCk7XHJcblx0XHR0aGlzLmNhbWVyYSA9IHRoaXMub3duZXI7XHJcblx0fVxyXG4gICAgX29uRGVzdHJveSgpIHtcclxuICAgICAgICAvL+WFs+mXreebkeWQrOWHveaVsFxyXG4gICAgICAgIExheWEuc3RhZ2Uub2ZmKExheWEuRXZlbnQuUklHSFRfTU9VU0VfRE9XTiwgdGhpcywgdGhpcy5tb3VzZURvd24pO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub2ZmKExheWEuRXZlbnQuUklHSFRfTU9VU0VfVVAsIHRoaXMsIHRoaXMubW91c2VVcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsYXN0TW91c2VYO1xyXG4gICAgcHJpdmF0ZSBsYXN0TW91c2VZO1xyXG4gICAgcHJpdmF0ZSBpc01vdXNlRG93bjtcclxuICAgIG9uVXBkYXRlKCkge1xyXG5cdFx0dmFyIGVsYXBzZWRUaW1lID0gTGF5YS50aW1lci5kZWx0YTtcclxuXHRcdGlmICghaXNOYU4odGhpcy5sYXN0TW91c2VYKSAmJiAhaXNOYU4odGhpcy5sYXN0TW91c2VZKSAmJiB0aGlzLmlzTW91c2VEb3duKSB7XHJcblx0XHRcdHZhciBzY2VuZSA9IHRoaXMub3duZXIuc2NlbmU7XHJcblx0XHRcdExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oODcpICYmIHRoaXMubW92ZUZvcndhcmQoLTAuMDEgKiBlbGFwc2VkVGltZSk7Ly9XXHJcblx0XHRcdExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oODMpICYmIHRoaXMubW92ZUZvcndhcmQoMC4wMSAqIGVsYXBzZWRUaW1lKTsvL1NcclxuXHRcdFx0TGF5YS5LZXlCb2FyZE1hbmFnZXIuaGFzS2V5RG93big2NSkgJiYgdGhpcy5tb3ZlUmlnaHQoLTAuMDEgKiBlbGFwc2VkVGltZSk7Ly9BXHJcblx0XHRcdExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oNjgpICYmIHRoaXMubW92ZVJpZ2h0KDAuMDEgKiBlbGFwc2VkVGltZSk7Ly9EXHJcblx0XHRcdExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oODEpICYmIHRoaXMubW92ZVZlcnRpY2FsKDAuMDEgKiBlbGFwc2VkVGltZSk7Ly9RXHJcblx0XHRcdExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oNjkpICYmIHRoaXMubW92ZVZlcnRpY2FsKC0wLjAxICogZWxhcHNlZFRpbWUpOy8vRVxyXG5cdFx0XHRcdFxyXG5cdFx0XHR2YXIgb2Zmc2V0WCA9IExheWEuc3RhZ2UubW91c2VYIC0gdGhpcy5sYXN0TW91c2VYO1xyXG5cdFx0XHR2YXIgb2Zmc2V0WSA9IExheWEuc3RhZ2UubW91c2VZIC0gdGhpcy5sYXN0TW91c2VZO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR2YXIgeXByRWxlbSA9IHRoaXMueWF3UGl0Y2hSb2xsO1xyXG5cdFx0XHR5cHJFbGVtLnggLT0gb2Zmc2V0WCAqIHRoaXMucm90YWlvblNwZWVkICogZWxhcHNlZFRpbWU7XHJcblx0XHRcdHlwckVsZW0ueSAtPSBvZmZzZXRZICogdGhpcy5yb3RhaW9uU3BlZWQgKiBlbGFwc2VkVGltZTtcclxuXHRcdFx0dGhpcy51cGRhdGVSb3RhdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5sYXN0TW91c2VYID0gTGF5YS5zdGFnZS5tb3VzZVg7XHJcblx0XHR0aGlzLmxhc3RNb3VzZVkgPSBMYXlhLnN0YWdlLm1vdXNlWTtcclxuXHRcdFxyXG4gICAgIFxyXG4gICAgfVxyXG4gICAgbW91c2VEb3duKGUpIHtcclxuICAgICAgICAvL+iOt+W+l+m8oOagh+eahOaXi+i9rOWAvFxyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uLmdldFlhd1BpdGNoUm9sbCh0aGlzLnlhd1BpdGNoUm9sbCk7XHJcbiAgICAgICAgLy/ojrflvpfpvKDmoIfnmoR4eeWAvFxyXG4gICAgICAgIHRoaXMubGFzdE1vdXNlWCA9IExheWEuc3RhZ2UubW91c2VYO1xyXG4gICAgICAgIHRoaXMubGFzdE1vdXNlWSA9IExheWEuc3RhZ2UubW91c2VZO1xyXG4gICAgICAgIC8v6K6+572uYm9vbOWAvFxyXG4gICAgICAgIHRoaXMuaXNNb3VzZURvd24gPSB0cnVlO1xyXG4gICAgIFxyXG4gICAgfVxyXG4gICAgbW91c2VVcChlKSB7XHJcbiAgICAgICAgLy/orr7nva5ib29s5YC8XHJcbiAgICAgICAgdGhpcy5pc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlkJHliY3np7vliqjjgIJcclxuICAgICAqL1xyXG4gICAgbW92ZUZvcndhcmQoZGlzdGFuY2UpIHtcclxuICAgICAgICB0aGlzLl90ZW1wVmVjdG9yMy54ID0gMDtcclxuICAgICAgICB0aGlzLl90ZW1wVmVjdG9yMy55ID0gMDtcclxuICAgICAgICB0aGlzLl90ZW1wVmVjdG9yMy56ID0gZGlzdGFuY2U7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLnRyYW5zbGF0ZSh0aGlzLl90ZW1wVmVjdG9yMyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWQkeWPs+enu+WKqOOAglxyXG4gICAgICovXHJcbiAgICBtb3ZlUmlnaHQoZGlzdGFuY2UpIHtcclxuICAgICAgICB0aGlzLl90ZW1wVmVjdG9yMy55ID0gMDtcclxuICAgICAgICB0aGlzLl90ZW1wVmVjdG9yMy56ID0gMDtcclxuICAgICAgICB0aGlzLl90ZW1wVmVjdG9yMy54ID0gZGlzdGFuY2U7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLnRyYW5zbGF0ZSh0aGlzLl90ZW1wVmVjdG9yMyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWQkeS4iuenu+WKqOOAglxyXG4gICAgICovXHJcbiAgICBtb3ZlVmVydGljYWwoZGlzdGFuY2UpIHtcclxuICAgICAgICB0aGlzLl90ZW1wVmVjdG9yMy54ID0gdGhpcy5fdGVtcFZlY3RvcjMueiA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGVtcFZlY3RvcjMueSA9IGRpc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS50cmFuc2xhdGUodGhpcy5fdGVtcFZlY3RvcjMsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVSb3RhdGlvbigpIHtcclxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy55YXdQaXRjaFJvbGwueSkgPCAxLjUwKSB7XHJcbiAgICAgICAgICAgIExheWEuUXVhdGVybmlvbi5jcmVhdGVGcm9tWWF3UGl0Y2hSb2xsKHRoaXMueWF3UGl0Y2hSb2xsLngsIHRoaXMueWF3UGl0Y2hSb2xsLnksIHRoaXMueWF3UGl0Y2hSb2xsLnosIHRoaXMudGVtcFJvdGF0aW9uWik7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcFJvdGF0aW9uWi5jbG9uZVRvKHRoaXMuY2FtZXJhLnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLmxvY2FsUm90YXRpb24gPSB0aGlzLmNhbWVyYS50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGU01TdGF0ZU1hY2hpbmUge1xyXG4gICAgcHVibGljIGN1clN0YXRlOiBGc21TdGF0ZSA9IG5ldyBGc21TdGF0ZShcIlwiLCBudWxsLCBudWxsLCBudWxsKTtcclxuICAgIHByaXZhdGUgc3RhdGVIYXNoVGFiZWw6IHsgW2luZGV4OiBzdHJpbmddOiBGc21TdGF0ZSB9ID0ge31cclxuXHJcbiAgICBwdWJsaWMgQWRkU3RhdGUoc3RhdGU6IEZzbVN0YXRlKSB7XHJcbiAgICAgICAgaWYgKHN0YXRlID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnN0YXRlSGFzaFRhYmVsW3N0YXRlLmtleV0gPSBzdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQWRkQWN0aW9uKGtleTogYW55LCBlbnRlcjogTGF5YS5IYW5kbGVyID0gbnVsbCwgZXhpdDogTGF5YS5IYW5kbGVyID0gbnVsbCwgdXBkYXRlOiBMYXlhLkhhbmRsZXIgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5BZGRTdGF0ZShuZXcgRnNtU3RhdGUoa2V5LCBlbnRlciwgZXhpdCwgdXBkYXRlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFN3aXRjaChrZXk6IHN0cmluZywgYXJnczogYW55ID0gbnVsbCkge1xyXG4gICAgICAgIGxldCBvbGRTdGF0ZSA9IHRoaXMuY3VyU3RhdGU7XHJcblxyXG4gICAgICAgIGxldCBuZXdTdGF0ZSA9IHRoaXMuc3RhdGVIYXNoVGFiZWxba2V5XTtcclxuICAgICAgICBpZiAobmV3U3RhdGUgPT0gbnVsbCB8fCBuZXdTdGF0ZS5rZXkgPT0gb2xkU3RhdGUua2V5KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChvbGRTdGF0ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICBvbGRTdGF0ZS5PbkV4aXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJTdGF0ZSA9IG5ld1N0YXRlO1xyXG4gICAgICAgIG5ld1N0YXRlLk9uRW50ZXIoYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJTdGF0ZSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuY3VyU3RhdGUuT25VcGRhdGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZzbVN0YXRlIHtcclxuICAgIHB1YmxpYyBrZXk6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIGVudGVyOiBMYXlhLkhhbmRsZXI7XHJcbiAgICBwcml2YXRlIHVwZGF0ZTogTGF5YS5IYW5kbGVyO1xyXG4gICAgcHJpdmF0ZSBleGl0OiBMYXlhLkhhbmRsZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihrZXk6YW55LCBlbnRlcjogTGF5YS5IYW5kbGVyLCBleGl0OiBMYXlhLkhhbmRsZXIsIHVwZGF0ZTogTGF5YS5IYW5kbGVyKSB7XHJcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XHJcbiAgICAgICAgdGhpcy5lbnRlciA9IGVudGVyO1xyXG4gICAgICAgIHRoaXMuZXhpdCA9IGV4aXQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGUgPSB1cGRhdGU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVudGVyICE9IG51bGwpIHRoaXMuZW50ZXIub25jZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmV4aXQgIT0gbnVsbCkgdGhpcy5leGl0Lm9uY2UgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy51cGRhdGUgIT0gbnVsbCkgdGhpcy51cGRhdGUub25jZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBPbkVudGVyKGFyZ3MpIHtcclxuICAgICAgICBpZiAodGhpcy5lbnRlciAhPSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLmVudGVyLnJ1bldpdGgoYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIE9uRXhpdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5leGl0ICE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuZXhpdC5ydW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgT25VcGRhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlICE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlLnJ1bigpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGh5c2ljVHJpZ2dlcjNkIGV4dGVuZHMgTGF5YS5TY3JpcHQzRCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgdHJpZ2dlcmVudGVyID0gXCJ0cmlnZ2VyZW50ZXIzZFwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgdHJpZ2dlcnN0YXkgPSBcInRyaWdnZXJzdGF5M2RcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHRyaWdnZXJleGl0ID0gXCJ0cmlnZ2VyZXhpdDNkXCJcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFRyaWdnZXIobm9kZTogTGF5YS5TcHJpdGUzRCk6IFBoeXNpY1RyaWdnZXIzZCB7XHJcbiAgICAgICAgbGV0IHRyaWdnZXIgPSBub2RlLmdldENvbXBvbmVudChQaHlzaWNUcmlnZ2VyM2QpO1xyXG4gICAgICAgIGlmICh0cmlnZ2VyID09IG51bGwpIHtcclxuICAgICAgICAgICAgdHJpZ2dlciA9IG5vZGUuYWRkQ29tcG9uZW50KFBoeXNpY1RyaWdnZXIzZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cmlnZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBPblRyaWdnZXJFbnRlcihjYWxsZXIsIGNhbGxCYWNrKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3duZXIub24oUGh5c2ljVHJpZ2dlcjNkLnRyaWdnZXJlbnRlciwgY2FsbGVyLCBjYWxsQmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBPblRyaWdnZXJFeGl0KGNhbGxlciwgY2FsbEJhY2spOiB2b2lkIHtcclxuICAgICAgICBpZiAoY2FsbEJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5vd25lci5vbihQaHlzaWNUcmlnZ2VyM2QudHJpZ2dlcmV4aXQsIGNhbGxlciwgY2FsbEJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgT25UcmlnZ2VyU3RheShjYWxsZXIsIGNhbGxCYWNrKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3duZXIub24oUGh5c2ljVHJpZ2dlcjNkLnRyaWdnZXJzdGF5LCBjYWxsZXIsIGNhbGxCYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm93bmVyLm9mZkFsbChQaHlzaWNUcmlnZ2VyM2QudHJpZ2dlcmVudGVyKTtcclxuICAgICAgICB0aGlzLm93bmVyLm9mZkFsbChQaHlzaWNUcmlnZ2VyM2QudHJpZ2dlcnN0YXkpO1xyXG4gICAgICAgIHRoaXMub3duZXIub2ZmQWxsKFBoeXNpY1RyaWdnZXIzZC50cmlnZ2VyZXhpdCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25UcmlnZ2VyRW50ZXIob3RoZXI6IExheWEuUGh5c2ljc0NvbXBvbmVudCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub3duZXIuZXZlbnQoUGh5c2ljVHJpZ2dlcjNkLnRyaWdnZXJlbnRlciwgW3RoaXMub3duZXIsIG90aGVyXSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25UcmlnZ2VyRXhpdChvdGhlcjogTGF5YS5QaHlzaWNzQ29tcG9uZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vd25lci5ldmVudChQaHlzaWNUcmlnZ2VyM2QudHJpZ2dlcmV4aXQsIFt0aGlzLm93bmVyLCBvdGhlcl0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVHJpZ2dlclN0YXkob3RoZXI6IExheWEuUGh5c2ljc0NvbXBvbmVudCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub3duZXIuZXZlbnQoUGh5c2ljVHJpZ2dlcjNkLnRyaWdnZXJzdGF5LCBbdGhpcy5vd25lciwgb3RoZXJdKTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lQ29uc3QgZnJvbSBcIi4vR2FtZUNvbnN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJzaW9uIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgc29uZ3M6IFNvbmdbXSA9IG5ldyBBcnJheTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZW5hYmxlQ2hhcmdlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBMb2FkKHVybDogc3RyaW5nLCBjYWxsZXI/OiBhbnksIGNvbXBsZXRlZD86IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2codXJsKTtcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHVybCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBqc29uID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHVybCk7XHJcbiAgICAgICAgICAgIGlmIChqc29uID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6K6/6ZeuVmVyc2lvbuaWh+S7tui1hOa6kOWksei0pe+8gVwiICsgdXJsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKFwiL1ZlcnNpb24uanNvblwiLCBcIlwiKTtcclxuICAgICAgICAgICAgVmVyc2lvbi5Mb2FkSm9ucyh1cmwsIGpzb24pO1xyXG4gICAgICAgICAgICBpZiAoY29tcGxldGVkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5jYWxsKGNhbGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSwgbnVsbCwgTGF5YS5Mb2FkZXIuSlNPTik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBMb2FkSm9ucyh1cmwsIGpzb24pOiB2b2lkIHtcclxuICAgICAgICBsZXQgc29uZ3MgPSBqc29uW1wic29uZ3NcIl07XHJcblxyXG4gICAgICAgIGlmIChzb25ncyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5b2T5YmN54mI5pys5peg5q2M5puyIVwiICsgdXJsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29uZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBzb25nc1tpXTtcclxuICAgICAgICAgICAgbGV0IHJvb3RQYXRoID0gdXJsICsgR2FtZUNvbnN0LlNvdW5kRmlsZTtcclxuICAgICAgICAgICAgbGV0IHJvb3RQcmV2aWV3SW1hZ2UgPSB1cmwgKyBHYW1lQ29uc3QuU291bmRQcmV2aWV3SW1hZ2VzO1xyXG4gICAgICAgICAgICBsZXQgc29uZyA9IFZlcnNpb24ub2JqVG9Tb25nKG5vZGUsIHJvb3RQYXRoLCByb290UHJldmlld0ltYWdlKTtcclxuICAgICAgICAgICAgVmVyc2lvbi5zb25ncy5wdXNoKHNvbmcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVuYWJsZUNoYXJnZSA9IGpzb25bXCJlbmFibGVDaGFyZ2VcIl07XHJcbiAgICAgICAgdGhpcy5lbmFibGVDaGFyZ2UgPSBlbmFibGVDaGFyZ2UgPT0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBvYmpUb1Nvbmcob2JqLCByb290UGF0aCwgcm9vdFByZXZpZXdJbWFnZSk6IFNvbmcge1xyXG4gICAgICAgIGxldCBuYW1lID0gb2JqLm5hbWU7XHJcbiAgICAgICAgbGV0IHNvbmdOYW1lID0gb2JqLnNvbmdOYW1lO1xyXG4gICAgICAgIGxldCBzb25nID0gbmV3IFNvbmcobmFtZSwgc29uZ05hbWUpO1xyXG4gICAgICAgIGxldCBwcmV2aWV3SW1hZ2VzID0gb2JqLnBuZ3M7XHJcbiAgICAgICAgc29uZy5yb290UGF0aCA9IHJvb3RQYXRoO1xyXG4gICAgICAgIHNvbmcucm9vdFByZXZpZXdJbWFnZSA9IHJvb3RQcmV2aWV3SW1hZ2U7XHJcbiAgICAgICAgc29uZy5TZXRQcmV2aWV3SW1hZ2VzKHByZXZpZXdJbWFnZXMpO1xyXG4gICAgICAgIHNvbmcuY2hhcmdlVHlwZSA9IG9iai5lbmFibGVDaGFyZ2UgPyBvYmouZW5hYmxlQ2hhcmdlIDogMDtcclxuICAgICAgICBzb25nLmNvc3RQb3dlciA9IG9iai5jb3N0UG93ZXI7XHJcbiAgICAgICAgc29uZy5zaG93T25lQ29sb3IgPSBvYmouc2hvd09uZUNvbG9yID09IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHNvbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBDbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvbmdzID0gbmV3IEFycmF5O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBDaGFyZ2VUeXBlIHtcclxuICAgIEZyZWUgPSAwLCBQb3dlciA9IDEsIFZpZGVvID0gMixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNvbmcge1xyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgc29uZ05hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgcm9vdFBhdGg6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgcm9vdFByZXZpZXdJbWFnZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBjaGFyZ2VUeXBlOiBDaGFyZ2VUeXBlID0gMDtcclxuICAgIHB1YmxpYyBjb3N0UG93ZXI6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc2hvd09uZUNvbG9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgZW5hYmxlQmFuZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgcHJldmlld1BuZ3M6IHN0cmluZ1tdID0gbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yIChuYW1lLCBzb25nTmFtZSkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5zb25nTmFtZSA9IHNvbmdOYW1lO1xyXG4gICAgICAgIHRoaXMucHJldmlld1BuZ3MgPSBuZXcgQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldFByZXZpZXdJbWFnZXMobmFtZXM6IEFycmF5PHN0cmluZz4pOiB2b2lkIHtcclxuICAgICAgICBpZiAobmFtZXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHBhdGggPSB0aGlzLnJvb3RQcmV2aWV3SW1hZ2UgKyBuYW1lc1tpXTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3UG5ncy5wdXNoKHBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFNvdW5kUGF0aChzdWZmaXgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvb3RQYXRoICsgIHRoaXMubmFtZSArIFwiL1wiICsgdGhpcy5uYW1lICsgc3VmZml4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc29uZ1BhdGgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTb3VuZFBhdGgoXCIub2dnXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc29uZ0pvc25QYXRoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U291bmRQYXRoKFwiLm1jXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc29uZ0JhbmRQYXRoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U291bmRQYXRoKFwiLmJhbmRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb25lKCk6IFNvbmcge1xyXG4gICAgICAgIGxldCBzb25nID0gbmV3IFNvbmcodGhpcy5uYW1lLCB0aGlzLnNvbmdOYW1lKTtcclxuICAgICAgICBzb25nLnJvb3RQYXRoID0gdGhpcy5yb290UGF0aDtcclxuICAgICAgICBzb25nLnJvb3RQcmV2aWV3SW1hZ2UgPSB0aGlzLnJvb3RQcmV2aWV3SW1hZ2U7XHJcbiAgICAgICAgc29uZy5jaGFyZ2VUeXBlID0gdGhpcy5jaGFyZ2VUeXBlO1xyXG4gICAgICAgIHNvbmcuY29zdFBvd2VyID0gdGhpcy5jb3N0UG93ZXI7XHJcbiAgICAgICAgc29uZy5zaG93T25lQ29sb3IgPSB0aGlzLnNob3dPbmVDb2xvcjtcclxuICAgICAgICB0aGlzLmVuYWJsZUJhbmQgPSB0aGlzLmVuYWJsZUJhbmQ7XHJcbiAgICAgICAgdGhpcy5wcmV2aWV3UG5ncyA9IHRoaXMucHJldmlld1BuZ3M7XHJcbiAgICAgICAgcmV0dXJuIHNvbmc7XHJcbiAgICB9XHJcbiB9XHJcblxyXG5Tb25nLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBcIk5hbWU6XCIgKyB0aGlzLk5hbWUgKyBcIlBhdGg6XCIgKyB0aGlzLlBhdGggKyBcIlNvbmdOYW1lOlwiICsgdGhpcy5Tb25nTmFtZTtcclxufVxyXG5cclxuLypcclxue1xyXG4gICAgXCJzb25nc1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcIm5hbWVcIjogMTU3MDY3OTA1NixcclxuICAgICAgICAgICAgXCJzb25nTmFtZVwiOiBcIui/meaYr+esrOS4gOmmluatjFwiLFxyXG4gICAgICAgICAgICBcInNob3dPbmVDb2xvclwiOiBmYWxzZSxcclxuICAgICAgICAgICAgXCIvL1wiOlwi5L2/55So5L2T5Yqb6Kej6ZSB5pe25raI6ICXXCIsXHJcbiAgICAgICAgICAgIFwiY29zdFBvd2VyXCI6IDEwLFxyXG4gICAgICAgICAgICBcIi8vXCI6XCIwIOWFjei0uSAxIOS9k+WKmyAyIOW5v+WRilwiLFxyXG4gICAgICAgICAgICBcImVuYWJsZUNoYXJnZVwiOiAwLFxyXG4gICAgICAgICAgICBcIi8vXCI6XCLpooTop4jlm75cIixcclxuICAgICAgICAgICAgXCJwbmdzXCI6IFtcclxuXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICBdLFxyXG4gICAgXCIvL1wiOlwi5q+P5qyh5ri45oiP5raI6ICX5L2T5YqbXCIsXHJcbiAgICBcInBsYXlTb25nUG93ZXJcIjogMTAsXHJcbiAgICBcIi8vXCI6XCLmuLjmiI/kuK3lpI3mtLvmrKHmlbBcIixcclxuICAgIFwicmVzdXJnZW5jZUNvdW50XCI6IDEsXHJcbiAgICBcIi8vXCI6XCLmmK/lkKblvIDlkK/mlLbotLkg5YWo5bGA5o6n5Yi2XCIsXHJcbiAgICBcImVuYWJsZUNoYXJnZVwiOiBmYWxzZVxyXG59XHJcbiovIiwiaW1wb3J0IHsgcmVxdWVzdERhdGEgfSBmcm9tIFwiLi4vTmV0L0h0dHBVbml0XCI7XHJcbmltcG9ydCBBcHBfbXlxcV9Db25maWcgZnJvbSBcIi4uL0FwcENvbmZpZ1wiO1xyXG5pbXBvcnQgV1hBUEkgZnJvbSBcIi4uL1dYQVBJXCI7XHJcbmltcG9ydCBVc2VyX3l5IGZyb20gXCIuLi9Vc2VyL1VzZXJcIjtcclxuXHJcbi8qKlxyXG4gKiDnlKjkuo7kubDph4/kuIrmiqUs5Lul5Y+K5YGc55WZ5pe26Ze05LiK5oql55qE55qE57G777yM5pys6LSo5LiK5piv5a+5d3jlkozkubDph4/mjqXlj6PlgZrkuIDkuKrpm4bmiJDljJbnmoTlsIHoo4Xmlrnkvr/kvb/nlKhcclxuICogXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIE1haUxpYW5nXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWlMaWFuZyB7XHJcbiAgICBwdWJsaWMgc3RhdGljIG1haW5Vcmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHVjbGljazogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgc3RheTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGtleTogc3RyaW5nID0gXCJcIjsvL+aOqOW5v+i3r+W+hOS4reWQjOWQjeWPguaVsO+8jOmcgOimgeiwg+eUqOaWueazlVdYQVBpLmdldExhdW5jaE9wdGlvbnNTeW5jKCnvvIzku47ov5Tlm57nmoTlj4LmlbDkuK3ojrflvpfjgIJcclxuICAgIHB1YmxpYyBzdGF0aWMgTWFpTGlhbmdPcGVuSWQ6IHN0cmluZyA9IFwiXCI7Ly/kubDph4/ns7vnu5/llK/kuIDmoIfor4Ys5omn6KGMR2V0TWFpTGlhbmdPcGVuSWQoKeaWueazleaIkOWKn+WQjuiHquWKqOiOt+W+l+OAglxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdGltZTogbnVtYmVyID0gMDsvL+S5sOmHj+ezu+e7n+WUr+S4gOagh+ivhuWQju+8jOiusOW9leW9k+WJjeaXtumXtO+8iOeyvuehruWIsOenku+8ieOAglxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R6YCB5pWw5o2u55qE57G7XHJcbiAgICAgKiBcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7cmVxdWVzdERhdGF9IHJlcSBcclxuICAgICAqIEBtZW1iZXJvZiBNYWlMaWFuZ1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHJlcXVlc3QocmVxOiByZXF1ZXN0RGF0YSkge1xyXG4gICAgICAgIGlmIChyZXEudXJsLmluZGV4T2YoXCJodHRwczovL1wiKSA+IC0xIHx8XHJcbiAgICAgICAgICAgIHJlcS51cmwuaW5kZXhPZihcImh0dHA6Ly9cIikgPiAtMSkge1xyXG4gICAgICAgICAgICByZXEudXJsID0gcmVxLnVybDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXEudXJsID0gTWFpTGlhbmcubWFpblVybCArIHJlcS51cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb21wbGV0ZUZ1bmMgPSAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcywgXCJNYWlMaWFuZyBodHRwIFN1Y2Nlc3NcIilcclxuICAgICAgICAgICAgcmVzID0gSlNPTi5wYXJzZShyZXMpO1xyXG4gICAgICAgICAgICBpZiAocmVzLlN0YXR1cyA9PSBcIjIwMFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLlJlc3VsdFtcIk9wZW5JZFwiXSAhPSBudWxsICYmIHJlcy5SZXN1bHRbXCJPcGVuSWRcIl0gIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIE1haUxpYW5nLk1haUxpYW5nT3BlbklkID0gcmVzLlJlc3VsdFtcIk9wZW5JZFwiXTtcclxuICAgICAgICAgICAgICAgICAgICBNYWlMaWFuZy50aW1lID0gcmVxLmRhdGEucG9zdHRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLojrflvpfkubDph4/ns7vnu59PcGVuSWQgXCIgKyBNYWlMaWFuZy5NYWlMaWFuZ09wZW5JZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuIrmiqXkubDph4/ns7vnu5/lgZznlZnml7bpl7TmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmVxLm9uU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5vblN1Y2Nlc3MocmVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXEub25GYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uRmFpbChyZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXEub25TdWNjZXNzID0gbnVsbDtcclxuICAgICAgICAgICAgcmVxID0gbnVsbDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBlcnJvckZ1bmMgPSAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcywgXCJNYWlMaWFuZyBodHRwIGZhaWxcIilcclxuICAgICAgICAgICAgaWYgKHJlcS5vbkZhaWwpIHtcclxuICAgICAgICAgICAgICAgIHJlcS5vbkZhaWwocmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXEub25GYWlsID0gbnVsbDtcclxuICAgICAgICAgICAgcmVxID0gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgeGhyOiBMYXlhLkh0dHBSZXF1ZXN0ID0gbmV3IExheWEuSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLCB0aGlzLCBjb21wbGV0ZUZ1bmMpO1xyXG4gICAgICAgIHhoci5vbmNlKExheWEuRXZlbnQuRVJST1IsIHRoaXMsIGVycm9yRnVuYyk7XHJcblxyXG4gICAgICAgIGlmIChyZXEubWV0aCA9PSBcImdldFwiKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmVxLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSByZXEuZGF0YVtrZXldO1xyXG4gICAgICAgICAgICAgICAgcGFyYSArPSBrZXkgKyBcIj1cIiArIHZhbHVlICsgXCImXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVxLnVybCA9IHJlcS51cmwgKyBcIj9cIiArIHBhcmE7XHJcbiAgICAgICAgICAgIHhoci5zZW5kKHJlcS51cmwsIG51bGwsIHJlcS5tZXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmVxLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSByZXEuZGF0YVtrZXldO1xyXG4gICAgICAgICAgICAgICAgcGFyYSArPSBrZXkgKyBcIj1cIiArIHZhbHVlICsgXCImXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgeGhyLnNlbmQocmVxLnVybCwgcGFyYSwgcmVxLm1ldGgsIG51bGwsIFtcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635b6X5Lmw6YeP57O757uf5ZSv5LiA5qCH6K+GSUQs5q2kSUTnmoTkvZznlKjmmK/nlKjmnaXkuIrmiqXmuLjmiI/ml7bpl7RcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzIFxyXG4gICAgICogQG1lbWJlcm9mIE1haUxpYW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0TWFpTGlhbmdPcGVuSWQob25TdWNjZXNzOiBGdW5jdGlvbiwgb25GYWlsOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChMYXlhLkJyb3dzZXIub25NaW5pR2FtZSkge1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9uID0gV1hBUEkuZ2V0TGF1bmNoT3B0aW9uc1N5bmMoKTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gb3B0aW9uLnF1ZXJ5W1wia2V5XCJdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPSBudWxsICYmIGtleSAhPSBcIlwiICYmIFVzZXJfeXkub3BlbklkICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBNYWlMaWFuZy5rZXkgPSBrZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcSA9IG5ldyByZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS51cmwgPSBNYWlMaWFuZy51Y2xpY2s7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxLm9uU3VjY2VzcyA9IG9uU3VjY2VzcztcclxuICAgICAgICAgICAgICAgICAgICByZXEub25GYWlsID0gb25GYWlsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5kYXRhLmFwcGlkID0gQXBwX215cXFfQ29uZmlnLkFwcElEO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5kYXRhLm9wZW5pZCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxLmRhdGEucG9zdHRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5kYXRhLmF1dGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5kYXRhLmtleSA9IGtleTtcclxuICAgICAgICAgICAgICAgICAgICByZXEuZGF0YS53eG9wZW5pZCA9IFVzZXJfeXkub3BlbklkO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5tZXRoID0gXCJQT1NUXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlj5HpgIHkubDph4/mlbDmja7mjqXlj6NcIilcclxuICAgICAgICAgICAgICAgICAgICBNYWlMaWFuZy5yZXF1ZXN0KHJlcSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4iuaKpeS5sOmHj+aVsOaNruWksei0pVwiKVxyXG4gICAgICAgICAgICAgICAgb25GYWlsKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuI3lnKjlvq7kv6HmqKHlvI/kuIvosIPnlKjvvIzpu5jorqTkuIrmiqXkubDph4/mlbDmja7lpLHotKVcIilcclxuICAgICAgICAgICAgb25GYWlsKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5Lmw6YeP5o6l5Y+j5YGc55WZ5pe26Ze0XHJcbiAgICAgKiBcclxuICAgICAgICBhcHBpZCDvvI3kuLvkvZPlsI/nqIvluo9hcHBpZFxyXG4gICAgICAgIG9wZW5pZCDvvI3kubDph4/ns7vnu5/llK/kuIDmoIfor4bvvIjkuI3lj6/nqbrvvIlcclxuICAgICAgICBwb3N0dGltZSDvvI0g6K+35rGC5pe26Ze05Yi75bqm77yI57K+56Gu5Yiw56eS77yJXHJcbiAgICAgICAgdGltZSDvvI0g5YGc55WZ5pe26ZW/77yI57K+56Gu5Yiw56eS77yJXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAbWVtYmVyb2YgTWFpTGlhbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBSZXBvcnRTdGF5VGltZShvblN1Y2Nlc3M6IEZ1bmN0aW9uLCBvbkZhaWw6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKExheWEuQnJvd3Nlci5vbk1pbmlHYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChNYWlMaWFuZy5NYWlMaWFuZ09wZW5JZCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVxID0gbmV3IHJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICByZXEudXJsID0gTWFpTGlhbmcuc3RheTtcclxuICAgICAgICAgICAgICAgIHJlcS5vblN1Y2Nlc3MgPSBvblN1Y2Nlc3M7XHJcbiAgICAgICAgICAgICAgICByZXEub25GYWlsID0gb25GYWlsO1xyXG4gICAgICAgICAgICAgICAgcmVxLmRhdGEuYXBwaWQgPSBBcHBfbXlxcV9Db25maWcuQXBwSUQ7XHJcbiAgICAgICAgICAgICAgICByZXEuZGF0YS5vcGVuaWQgPSBNYWlMaWFuZy5NYWlMaWFuZ09wZW5JZDtcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwO1xyXG4gICAgICAgICAgICAgICAgcmVxLmRhdGEucG9zdHRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YXl0aW1lID0gTWFpTGlhbmcudGltZSAhPSAwID8gdGltZSAtIE1haUxpYW5nLnRpbWUgOiAwO1xyXG4gICAgICAgICAgICAgICAgcmVxLmRhdGEudGltZSA9IHN0YXl0aW1lO1xyXG4gICAgICAgICAgICAgICAgcmVxLm1ldGggPSBcIlBPU1RcIjtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R6YCB5YGc55WZ5pe26Ze06Iez5Lmw6YeP5o6l5Y+jXCIpXHJcbiAgICAgICAgICAgICAgICBNYWlMaWFuZy5yZXF1ZXN0KHJlcSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5LiN5Zyo5b6u5L+h5qih5byP5LiL6LCD55So77yM6buY6K6k5Y+R6YCB5YGc55WZ5pe26Ze06Iez5Lmw6YeP5o6l5Y+j5aSx6LSlXCIpXHJcbiAgICAgICAgICAgIG9uRmFpbChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgVXNlcl95eSBmcm9tIFwiLi9Vc2VyL1VzZXJcIjtcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IExvYWRpbmdWaWV3IGZyb20gXCIuL1ZpZXcvTG9hZGluZ1ZpZXcvTG9hZGluZ1ZpZXdcIjtcclxuaW1wb3J0IEFlc19teXFxX1Rvb2xzIGZyb20gXCIuL05ldC9BZXNUb29sc1wiO1xyXG5pbXBvcnQgSHR0cF9teXFxX1VuaXQgZnJvbSBcIi4vTmV0L0h0dHBVbml0XCI7XHJcbmltcG9ydCBOZXRfbXlxcV9Db25maWcgZnJvbSBcIi4vTmV0L05ldENvbmZpZ1wiO1xyXG5pbXBvcnQgV1hBUEkgZnJvbSBcIi4vV1hBUElcIjtcclxuaW1wb3J0IEFwcF9teXFxX0NvbmZpZyBmcm9tIFwiLi9BcHBDb25maWdcIjtcclxuaW1wb3J0IEV2ZW50X215cXFfTWdyIGZyb20gXCIuL0V2ZW50L0V2ZW50TWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50RGVmIH0gZnJvbSBcIi4vRXZlbnQvRXZlbnREZWZcIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi9HYW1lL0dhbWVDb25zdFwiO1xyXG5pbXBvcnQgTmF0aXZlQ2FsbGJhY2sgZnJvbSBcIi4vTmF0aXZlQ2FsbGJhY2tcIjtcclxuXHJcbmNsYXNzIE1haW4ge1xyXG5cclxuXHRwcm90ZWN0ZWQgX2xvYWRpbmdVSSA6IHVpLlZpZXcuTG9hZGluZ1VJID0gbnVsbDtcclxuXHRwcm90ZWN0ZWQgX2xvYWRpbmdWaWV3IDogTG9hZGluZ1ZpZXcgPSBudWxsO1xyXG5cdC8v6aKE5Yqg6L295YiX6KGoXHJcblx0cHJpdmF0ZSByZWFkb25seSBfcHJlTG9hZFJlcyA6IEFycmF5PGFueT4gPSBuZXcgQXJyYXk8YW55PiAoKTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHQvL+agueaNrklEReiuvue9ruWIneWni+WMluW8leaTjlx0XHRcclxuXHRcdGlmICh3aW5kb3dbXCJMYXlhM0RcIl0pIExheWEzRC5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0KTtcclxuXHRcdGVsc2UgTGF5YS5pbml0KEdhbWVDb25maWcud2lkdGgsIEdhbWVDb25maWcuaGVpZ2h0LCBMYXlhW1wiV2ViR0xcIl0pO1xyXG5cdFx0TGF5YVtcIlBoeXNpY3NcIl0gJiYgTGF5YVtcIlBoeXNpY3NcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhW1wiRGVidWdQYW5lbFwiXSAmJiBMYXlhW1wiRGVidWdQYW5lbFwiXS5lbmFibGUoKTtcclxuXHRcdExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gR2FtZUNvbmZpZy5zY2FsZU1vZGU7XHJcblx0XHRMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBHYW1lQ29uZmlnLnNjcmVlbk1vZGU7XHJcblx0XHQvLyBMYXlhLnN0YWdlLmZyYW1lUmF0ZSA9IGxheWEuZGlzcGxheS5TdGFnZS5GUkFNRV9TTE9XO1xyXG5cdFx0Ly/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG5cdFx0TGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuXHRcdC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcblx0XHRpZighTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpLy/lpoLmnpzkuI3mmK/lvq7kv6HlsI/muLjmiI/vvIzotYTmupDmnI3liqHlmajorr7nva7kuLrmnKzlnLDmtYvor5XlnLDlnYBcclxuXHRcdHtcclxuXHRcdFx0QXBwX215cXFfQ29uZmlnLlJlc1NlcnZlciA9IEFwcF9teXFxX0NvbmZpZy5Mb2NhbFRlc3RSZVNlcnZlcjtcclxuXHRcdH1cclxuXHJcblx0XHQvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG5cdFx0TGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHR9XHJcblxyXG5cdG9uVmVyc2lvbkxvYWRlZCgpOiB2b2lkIHtcclxuXHRcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0XHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdH1cclxuXHJcblx0b25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblx0XHR0aGlzLmluaXRMb2FkaW5nVmlldygpXHJcblx0XHQvL+WKoOi9vemHjeimgemFjee9ru+8jOi/meS6m+mFjee9ruW/hemhu+WcqOa4uOaIj+WQr+WKqOWJjeWKoOi9veWujOaIkFxyXG5cdFx0dmFyIGZpcnN0Q29uZmlncyA9IFxyXG5cdFx0W1xyXG5cdFx0XHR7IHVybDogQXBwX215cXFfQ29uZmlnLlJlc1NlcnZlciArIFwiL2pzb24vYXBwc3dpdGNoLmpzb25cIiwgdHlwZTogTGF5YS5Mb2FkZXIuSlNPTiB9XHJcblx0XHRdXHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRMYXlhLmxvYWRlci5sb2FkKGZpcnN0Q29uZmlncyxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsKCk9PlxyXG5cdFx0e1xyXG5cdFx0XHRzZWxmLmxvYWRSZXMoKTsvL+WKoOi9vei1hOa6kFxyXG5cdFx0fSkpXHJcblx0XHRFdmVudF9teXFxX01nci5pbnN0YW5jZS5yZWdPbmNlRXZlbnQoRXZlbnREZWYuQXBwX0Nsb3NlRmlyc3RMb2FkaW5nVmlldyx0aGlzLHRoaXMuY2xvc2Vsb2FkaW5nVUkpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpbml0TG9hZGluZ1ZpZXcoKVxyXG5cdHtcclxuXHRcdHRoaXMuX2xvYWRpbmdVSSA9IG5ldyB1aS5WaWV3LkxvYWRpbmdVSSgpO1xyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLl9sb2FkaW5nVUkpO1xyXG5cdFx0dGhpcy5fbG9hZGluZ1VJLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuXHRcdHRoaXMuX2xvYWRpbmdVSS5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuXHRcdHRoaXMuX2xvYWRpbmdWaWV3ID0gdGhpcy5fbG9hZGluZ1VJLmdldENvbXBvbmVudChMb2FkaW5nVmlldylcclxuXHRcdHRoaXMuX2xvYWRpbmdWaWV3LnNldFByb2Nlc3MoMCk7XHJcblx0fVxyXG5cclxuXHJcblx0cHJpdmF0ZSBwb3N0UmVzVG9PcGVuRGF0YUNvbnRleHQob25Db21wbGF0ZSA6IEZ1bmN0aW9uKVxyXG5cdHtcclxuXHRcdGlmKExheWEuQnJvd3Nlci5vbk1pbmlHYW1lKVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIuW8gOWni+mAj+S8oOi1hOa6kOaVsOaNruWIsOW8gOaUvuWfn1wiKTtcclxuXHRcdFx0TGF5YS5sb2FkZXIubG9hZChcclxuXHRcdFx0XHRbXHJcblx0XHRcdFx0XHRcIm9wZW5SZXMvUmFuay5hdGxhc1wiLFxyXG5cdFx0XHRcdF1cclxuXHRcdFx0XHQsTGF5YS5IYW5kbGVyLmNyZWF0ZShudWxsLGZ1bmN0aW9uKClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdExheWEuTWluaUFkcHRlci5zZW5kQXRsYXNUb09wZW5EYXRhQ29udGV4dChcIm9wZW5SZXMvUmFuay5hdGxhc1wiKTsgICAgXHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCLpgI/kvKDotYTmupDmlbDmja7liLDlvIDmlL7ln58gIOWujOavle+8ge+8ge+8gVwiKTtcclxuXHRcdFx0XHRpZihvbkNvbXBsYXRlKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG9uQ29tcGxhdGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pKTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdHtcclxuXHRcdFx0aWYob25Db21wbGF0ZSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdG9uQ29tcGxhdGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBwcmVMb2FkKClcclxuXHR7XHJcblx0XHQvL+i/memHjOa3u+WKoOS9oOmcgOimgemihOWKoOi9veeahOi1hOa6kFxyXG5cdFx0Ly90aGlzLl9wcmVMb2FkUmVzLnB1c2goeyB1cmw6IEFwcENvbmZpZy5SZXNTZXJ2ZXIgKyBcIi9qc29uL2V4YW1wbGUuanNvblwiLCB0eXBlOiBMYXlhLkxvYWRlci5KU09OIH0pO1xyXG5cdFx0dGhpcy5fcHJlTG9hZFJlcy5wdXNoKHsgdXJsOiBHYW1lQ29uc3QuR2V0UmVtb3RlVmVyc2lvblBhdGgsIHR5cGU6IExheWEuTG9hZGVyLkpTT04gfSlcclxuXHRcdHRoaXMuX3ByZUxvYWRSZXMucHVzaCh7IHVybDogR2FtZUNvbnN0LkdldExvY2FsU3ViUmVzVmVyc2lvblBhdGgsIHR5cGU6IExheWEuTG9hZGVyLkpTT04gfSlcclxuXHR9XHJcblxyXG5cdGxvYWRSZXMoKTogdm9pZCB7XHJcblx0XHR0aGlzLnByZUxvYWQoKTtcclxuXHRcdHZhciByZXNvdXJjZTogQXJyYXk8YW55PiA9IHRoaXMuX3ByZUxvYWRSZXM7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRpZiAoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpIHtcclxuXHRcdFx0Ly/lvIDlp4vliqDovb3liIbljIVcclxuXHRcdFx0dmFyIGxvYWRTdWJSZXNUYXNrOiBhbnkgPSBMYXlhLkJyb3dzZXIud2luZG93W1wid3hcIl0ubG9hZFN1YnBhY2thZ2Uoe1xyXG5cdFx0XHRcdG5hbWU6ICdzdWJSZXMnLFxyXG5cdFx0XHRcdHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuXHJcblx0XHRcdFx0XHQvLyDliIbljIXliqDovb3miJDlip8s5byA5aeL6aKE5Yqg6L296LWE5rqQXHJcblx0XHRcdFx0XHRpZihyZXNvdXJjZS5sZW5ndGggPiAwKVxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRMYXlhLmxvYWRlci5sb2FkKHJlc291cmNlLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsICgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRzZWxmLm9uTG9hZFJlc0NvbXBsYXRlKCk7Ly/pooTliqDovb3lrozmiJBcclxuXHRcdFx0XHRcdFx0fSksIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgKHJlcykgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdC8vdG9kbzrot5/mlrDov5vluqbmnaFcclxuXHRcdFx0XHRcdFx0XHRzZWxmLl9sb2FkaW5nVmlldy5zZXRQcm9jZXNzKHJlcyAvIDIgKyAwLjUpO1xyXG5cdFx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHNlbGYub25Mb2FkUmVzQ29tcGxhdGUoKTsvL+mihOWKoOi9veWujOaIkFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZmFpbDogKHJlcykgPT4gXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGhpcy5sb2FkUmVzKCk7Ly/liqDovb3lpLHotKXvvIzph43mlrDliqDovb1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRsb2FkU3ViUmVzVGFzay5vblByb2dyZXNzVXBkYXRlKHJlcyA9PiBcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHNlbGYuX2xvYWRpbmdWaWV3LnNldFByb2Nlc3MocmVzICogMik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYocmVzb3VyY2UubGVuZ3RoID4gMClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdExheWEubG9hZGVyLmxvYWQocmVzb3VyY2UsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgKCkgPT4ge1xyXG5cdFx0XHRcdFx0c2VsZi5vbkxvYWRSZXNDb21wbGF0ZSgpO1xyXG5cdFx0XHRcdH0pLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIChyZXMpID0+IFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHNlbGYuX2xvYWRpbmdWaWV3LnNldFByb2Nlc3MocmVzKTtcclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0c2VsZi5vbkxvYWRSZXNDb21wbGF0ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvbkxvYWRSZXNDb21wbGF0ZSgpIHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHRoaXMuX2xvYWRpbmdWaWV3LnNldFByb2Nlc3MoMSk7XHJcblx0XHRpZihMYXlhLkJyb3dzZXIub25NaW5pR2FtZSlcclxuXHRcdHtcclxuXHRcdFx0V1hBUEkud3hMb2dpbihmdW5jdGlvbiAoY29kZSkge1xyXG5cdFx0XHRcdFVzZXJfeXkuY29kZSA9IGNvZGVcclxuXHRcdFx0XHRIdHRwX215cXFfVW5pdC5sb2dpbihcclxuXHRcdFx0XHQocmVzKT0+IFxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGlmKHJlcy5jb2RlID09IDEpXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi55m76ZmG5oiQ5Yqf77yB77yB77yBXCIpO1xyXG5cdFx0XHRcdFx0XHRVc2VyX3l5LnRva2VuID0gcmVzLmRhdGEudG9rZW47XHJcblx0XHRcdFx0XHRcdFVzZXJfeXkub3BlbklkID0gcmVzLmRhdGEub3BlbmlkO1xyXG5cdFx0XHRcdFx0XHRIdHRwX215cXFfVW5pdC5nZXRHYW1lRGF0YSgocmVzKT0+e1xyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwi6I635Y+W55So5oi35pWw5o2u5oiQ5Yqf77yB77yB77yBXCIpO1xyXG5cdFx0XHRcdFx0XHRcdGlmKDEgPT0gcmVzLmNvZGUpXHJcblx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0VXNlcl95eS5pbml0aVVzZXIocmVzLmRhdGEpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0VXNlcl95eS5pbml0aVVzZXIobnVsbCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdEdhbWVDb25maWcuc3RhcnRTY2VuZSAmJiBMYXlhLlNjZW5lLm9wZW4oR2FtZUNvbmZpZy5zdGFydFNjZW5lLCBmYWxzZSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0XHRcdH0sKHJlcyk9PntcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIuiOt+WPlueUqOaIt+aVsOaNruWksei0pe+8ge+8ge+8gVwiKTtcclxuXHRcdFx0XHRcdFx0XHRVc2VyX3l5LmluaXRpVXNlcihudWxsKTtcclxuXHRcdFx0XHRcdFx0XHRHYW1lQ29uZmlnLnN0YXJ0U2NlbmUgJiYgTGF5YS5TY2VuZS5vcGVuKEdhbWVDb25maWcuc3RhcnRTY2VuZSwgZmFsc2UsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0KHJlcykgPT4gXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCLnmbvpmYblpLHotKXvvIHvvIHvvIFcIiArIHJlcyk7XHJcblx0XHRcdFx0XHRVc2VyX3l5LmluaXRpVXNlcihudWxsKTtcclxuXHRcdFx0XHRcdEdhbWVDb25maWcuc3RhcnRTY2VuZSAmJiBMYXlhLlNjZW5lLm9wZW4oR2FtZUNvbmZpZy5zdGFydFNjZW5lLCBmYWxzZSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0sIG51bGwpXHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7XHJcblx0XHRcdFVzZXJfeXkudGVzdEluaXRVc2VyKCk7Ly/mtYvor5VcclxuXHRcdFx0R2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUsIGZhbHNlLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcclxuXHRcdFx0fSkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNsb3NlbG9hZGluZ1VJKClcclxuXHR7XHJcblx0XHRpZih0aGlzLl9sb2FkaW5nVUkgJiYgIXRoaXMuX2xvYWRpbmdVSS5kZXN0cm95ZWQpXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuX2xvYWRpbmdVSS5kZXN0cm95KCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBNYWluKCk7XHJcbmlmIChMYXlhLkJyb3dzZXIud2luZG93KSB7XHJcbiAgICBMYXlhLkJyb3dzZXIud2luZG93Lk5hdGl2ZUNhbGxiYWNrID0gTmF0aXZlQ2FsbGJhY2s7XHJcbn1cclxuIiwiaW1wb3J0IFV0aWxpdCBmcm9tIFwiLi4vVXRpbGl0XCI7XHJcbmltcG9ydCBWaWV3X215cXFfTWdyLCB7IFZpZXdEZWYgfSBmcm9tIFwiLi9WaWV3TWdyXCI7XHJcbmltcG9ydCBVc2VyX3l5IGZyb20gXCIuLi9Vc2VyL1VzZXJcIjtcclxuaW1wb3J0IEh0dHBfbXlxcV9Vbml0IGZyb20gXCIuLi9OZXQvSHR0cFVuaXRcIjtcclxuaW1wb3J0IE1haUxpYW5nIGZyb20gXCIuLi9NYWlMaWFuZ0FQSS9NYWlMaWFuZ1wiO1xyXG5pbXBvcnQgRXZlbnRfbXlxcV9NZ3IgZnJvbSBcIi4uL0V2ZW50L0V2ZW50TWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50RGVmIH0gZnJvbSBcIi4uL0V2ZW50L0V2ZW50RGVmXCI7XHJcbmltcG9ydCBXWEFQSSBmcm9tIFwiLi4vV1hBUElcIjtcclxuaW1wb3J0IEdhbWVDb250cm9sbGVyIGZyb20gXCIuLi9HYW1lL0dhbWVDb250cm9sbGVyXCI7XHJcbmltcG9ydCBWZXJzaW9uLCB7IFNvbmcsIENoYXJnZVR5cGUgfSBmcm9tIFwiLi4vR2FtZS9WZXJzaW9uXCI7XHJcbmltcG9ydCBHYW1lQ29uc3QgZnJvbSBcIi4uL0dhbWUvR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBBcHBTd2l0Y2hDb25maWcgZnJvbSBcIi4uL0NvbmZpZy9BcHBTd2l0Y2hDb25maWdcIjtcclxuaW1wb3J0IFNvdW5kTWFuYWdlciBmcm9tIFwiLi4vR2FtZS9Tb3VuZE1hbmFnZXJcIjtcclxuXHJcbi8v5ri45oiP566h55CG5Zmo77yM5ri45oiP5Luj56CB55qE5YWl5Y+jXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVfbXlxcV9NZ3IgZXh0ZW5kcyBMYXlhLlNjcmlwdCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlIDogR2FtZV9teXFxX01nciA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCkgOiBHYW1lX215cXFfTWdyIHsgcmV0dXJuIEdhbWVfbXlxcV9NZ3IuX2luc3RhbmNlO31cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG4gICAge1xyXG4gICAgICAgICBzdXBlcigpOyBcclxuICAgICAgICAgR2FtZV9teXFxX01nci5faW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQXdha2UoKVxyXG4gICAge1xyXG4gICAgICAgIE1haUxpYW5nLkdldE1haUxpYW5nT3BlbklkKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lVUkg5Lmw6YeP5pWw5o2u5LiK5oql5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICBMYXlhLkJyb3dzZXIud2luZG93W1wid3hcIl0ub25TaG93KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIE1haUxpYW5nLkdldE1haUxpYW5nT3BlbklkKG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBMYXlhLkJyb3dzZXIud2luZG93W1wid3hcIl0ub25IaWRlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIE1haUxpYW5nLlJlcG9ydFN0YXlUaW1lKG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZVVJIOS5sOmHj+aVsOaNruS4iuaKpeWksei0pVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIFdYQVBJLlNldFNoYXJlTWVudShcIlwiLFwiXCIsXHJcbiAgICAgICAgKCk9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICAoKT0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpPT5cclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25TdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5UZXN0KCk7XHJcbiAgICAgICAgdGhpcy5wcmVDcmVhdGVHYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVGVzdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpIHtcclxuICAgICAgICAgICAgTGF5YS5Ccm93c2VyLndpbmRvd1tcInd4XCJdLm9uU2hvdygoKSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnREZWYuR2FtZV9GT0NVUyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBMYXlhLkJyb3dzZXIud2luZG93W1wid3hcIl0ub25IaWRlKCgpID0+IHsgXHJcbiAgICAgICAgICAgICAgICBFdmVudF9teXFxX01nci5pbnN0YW5jZS5kaXNwYXRjaChFdmVudERlZi5HYW1lX0JMVVIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuQkxVUiwgdGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnREZWYuR2FtZV9CTFVSKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5GT0NVUywgdGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnREZWYuR2FtZV9GT0NVUyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHByZUNyZWF0ZUdhbWUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKExheWEuQnJvd3Nlci5vbk1pbmlHYW1lKSB7XHJcbiAgICAgICAgICAgIExheWEuTWluaUFkcHRlci5hdXRvQ2FjaGVGaWxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIuYXV0b1N0b3BNdXNpYyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBWZXJzaW9uLkxvYWQoR2FtZUNvbnN0LkdldExvY2FsU3ViUmVzVmVyc2lvblBhdGgpXHJcbiAgICAgICAgLy8gVmVyc2lvbi5Mb2FkKEdhbWVDb25zdC5HZXRSZW1vdGVWZXJzaW9uUGF0aCwgdGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5Mb2FkR2FtZSgpO1xyXG4gICAgICAgIHRoaXMuc2F2ZV9teXFxX0dhbWVEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBMb2FkR2FtZSgpOiB2b2lkIHtcclxuICAgICAgICAvL3RvZG/vvJrov5nph4zmt7vliqDliJ3lp4vljJbkuLvlnLrmma/nmoTku6PnoIHjgIJFdmVudE1nci5pbnN0YW5jZS5kaXNwYXRjaChFdmVudERlZi5BcHBfQ2xvc2VGaXJzdExvYWRpbmdWaWV3KTsg5re75Yqg5Yiw5L2g55qE5YWz5Y2h5Yqg6L295a6M5oiQ55qE5Zue6LCD5Lit77yM5YWz6Zet5Yqg6L2955WM6Z2iXHJcbiAgICAgICAgR2FtZUNvbnRyb2xsZXIuSW5zdGFuY2UuSW5pdCh0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChTb3VuZE1hbmFnZXIuSW5zdGFuY2UuSXNGaXJzdEVudGVyR2FtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc29uZyA9IFZlcnNpb24uc29uZ3NbMF0uY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgIHNvbmcuc2hvd09uZUNvbG9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNvbmcuY2hhcmdlVHlwZSA9IENoYXJnZVR5cGUuRnJlZTtcclxuICAgICAgICAgICAgICAgIFVzZXJfeXkuYWRkTW9uZXkoMTApO1xyXG4gICAgICAgICAgICAgICAgU291bmRNYW5hZ2VyLkluc3RhbmNlLlBsYXlTb25nKHNvbmcsIHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBFdmVudF9teXFxX01nci5pbnN0YW5jZS5kaXNwYXRjaChFdmVudERlZi5BcHBfQ2xvc2VGaXJzdExvYWRpbmdWaWV3KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVmlld19teXFxX01nci5pbnN0YW5jZS5vcGVuVmlldyhWaWV3RGVmLkdhbWVNYWluVmlldywgbnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkFwcF9DbG9zZUZpcnN0TG9hZGluZ1ZpZXcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+a4uOaIj+WtmOahoyzku4XlvZPkvZznpLrkvovvvIzlrp7pmYXlrZjmoaPmoLnmja7lrp7pmYXpobnnm67lkIToh6rlrp7njrBcclxuICAgIHB1YmxpYyBzYXZlX215cXFfR2FtZURhdGEoY2FsbGVyPzogYW55LCBjb21wbGV0ZWQ/OiBGdW5jdGlvbikgIHtcclxuICAgICAgICBsZXQgY2FsbEJhY2sgPSAoc3VjY2VlZCkgPT4geyBpZiAoY29tcGxldGVkKSBjb21wbGV0ZWQuY2FsbChjYWxsZXIsIHN1Y2NlZWQpIH1cclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJHYW1lX0RhdGFcIiwgVXNlcl95eS5nZXRTYXZlRGF0YSgpKTtcclxuICAgICAgICBjYWxsQmFjayh0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gSHR0cF9teXFxX1VuaXQuc2F2ZUdhbWVEYXRhKFVzZXJfeXkuZ2V0U2F2ZURhdGEoKSxcclxuICAgICAgICAvLyAgICAgKHJlcykgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgaWYgKHJlcy5jb2RlICE9IDEpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICBjYWxsQmFjayhmYWxzZSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCLlrZjmoaPlpLHotKVcIilcclxuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgY2FsbEJhY2sodHJ1ZSk7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuWtmOaho+aIkOWKn1wiKVxyXG4gICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgIC8vICAgICAocmVzKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICBjYWxsQmFjayhmYWxzZSk7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuWtmOaho+Wksei0pVwiKVxyXG4gICAgICAgIC8vICAgICB9KVxyXG4gICAgfVxyXG59IiwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvdW5kX215cXFfTWdyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgc291bmRSZXNQYXRoID0gXCJzdWJSZXMvc291bmQvXCJcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaW5zdGFuY2U6IFNvdW5kX215cXFfTWdyID0gbmV3IFNvdW5kX215cXFfTWdyKCk7XHJcbiAgICBcclxuICAgIHByaXZhdGUgYmdtOmFueTtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgRW5hYmxlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBFbmFibGVkKGUgOiBib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wQkdNKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSBlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfZW5hYmxlZCA6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHB1YmxpYyBnZXRTb3VuZFVybChuYW1lOiBzdHJpbmcpIDogc3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHVybCA9IFNvdW5kX215cXFfTWdyLnNvdW5kUmVzUGF0aCArIG5hbWUgKyBcIi5vZ2dcIjtcclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGF5U291bmQobmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYoIXRoaXMuX2VuYWJsZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB2YXIgdXJsID0gdGhpcy5nZXRTb3VuZFVybChuYW1lKTtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpIHtcclxuICAgICAgICAgICAgdmFyIHNvdW5kID0gbGF5YS51dGlscy5Qb29sLmdldEl0ZW0obmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChzb3VuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VuZCA9IHd4LmNyZWF0ZUlubmVyQXVkaW9Db250ZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBzb3VuZC5zcmMgPSBTb3VuZF9teXFxX01nci5zb3VuZFJlc1BhdGggKyBuYW1lICsgXCIub2dnXCI7XHJcbiAgICAgICAgICAgICAgICBzb3VuZC5vbkVuZGVkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsYXlhLnV0aWxzLlBvb2wucmVjb3ZlcihuYW1lLCBzb3VuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc291bmQub2ZmRW5kZWQoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc291bmQucGxheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZCh1cmwsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheUJHTShuYW1lKXtcclxuICAgICAgICBpZighdGhpcy5fZW5hYmxlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmdldFNvdW5kVXJsKG5hbWUpO1xyXG4gICAgICAgIGlmIChMYXlhLkJyb3dzZXIub25NaW5pR2FtZSkge1xyXG4gICAgICAgICAgICBpZighdGhpcy5iZ20pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmdtID0gd3guY3JlYXRlSW5uZXJBdWRpb0NvbnRleHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJnbS5zdG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmdtLnNyYyA9IHVybDtcclxuICAgICAgICAgICAgdGhpcy5iZ20ubG9vcCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYmdtLnBsYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5wbGF5TXVzaWModXJsLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3BCR00oKXtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5iZ20pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZ20uc3RvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIExheWEuU291bmRNYW5hZ2VyLnN0b3BNdXNpYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgTmF0aXZlQ2FsbGJhY2sgZnJvbSBcIi4uL05hdGl2ZUNhbGxiYWNrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWJyYXRlX215cXFfTWdyIFxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGlzRW5hYmxlID0gZmFsc2U7XHJcblxyXG4gICAgLy/nn63pnIfliqhcclxuICAgIHB1YmxpYyBzdGF0aWMgdmlicmF0ZVNob3J0KCk6IHZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIVZpYnJhdGVfbXlxcV9NZ3IuaXNFbmFibGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpICB7XHJcbiAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS52aWJyYXRlU2hvcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIE5hdGl2ZUNhbGxiYWNrLkNhbGxOYXRpdmVGdW5jKFwidmlicmF0ZVNob3J0XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+mVv+mch+WKqFxyXG4gICAgcHVibGljIHN0YXRpYyBpYnJhdGVMb25nKCk6IHZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIVZpYnJhdGVfbXlxcV9NZ3IuaXNFbmFibGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpIHtcclxuICAgICAgICAgICAgTGF5YS5Ccm93c2VyLndpbmRvd1tcInd4XCJdLnZpYnJhdGVMb25nKCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBOYXRpdmVDYWxsYmFjay5DYWxsTmF0aXZlRnVuYyhcInZpYnJhdGVMb25nXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WumuaXtumch+WKqCzmr6vnp5JcclxuICAgIHB1YmxpYyBzdGF0aWMgdmlicmF0ZSh0aW1lOiBudW1iZXIpIFxyXG4gICAge1xyXG4gICAgICAgIGlmKCFWaWJyYXRlX215cXFfTWdyLmlzRW5hYmxlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKExheWEuQnJvd3Nlci5vbk1pbmlHYW1lKSAgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSB0aW1lIC8gMTU7IC8v5b6u5L+h5bCP5ri45oiP5Lit6ZyH5Yqo55qE5pe26Ze05pivMTXmr6vnp5LnmoTmlbTmlbDlgI3ml7bpl7TvvIzmnKzotKjmmK/lr7nnn63pnIfliqjnmoTlsIHoo4VcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgbGV0IG9iaiA9IHsgY291bnQ6IGNvdW50LCBpbmRleDogaW5kZXggfTtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5sb29wKDE2LCBvYmosIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIFZpYnJhdGVfbXlxcV9NZ3IudmlicmF0ZVNob3J0KCk7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gY291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhckFsbChvYmopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vVmlldy9WaWV3QmFzZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gVmlld0RlZlxyXG57XHJcbiAgICBOb25lID0gXCJcIixcclxuICAgIFRpcHNWaWV3ID0gXCJWaWV3L1RpcHNWaWV3LnNjZW5lXCIsXHJcbiAgICBHYW1lTWFpblZpZXcgPSBcIlZpZXcvR2FtZU1haW4uc2NlbmVcIixcclxuICAgIEdhbWVMb2FkaW5nVmlldyA9IFwiVmlldy9HYW1lTG9hZGluZy5zY2VuZVwiLCAvL1tzb25nTmFtZV1cclxuICAgIEdhbWVTZXR0bGVWaWV3ID0gXCJWaWV3L0dhbWVTZXR0bGVWaWV3LnNjZW5lXCIsXHJcbiAgICBHYW1lRmFpbHVyZVZpZXcgPSBcIlZpZXcvR2FtZUZhaWx1cmUuc2NlbmVcIixcclxuICAgIEdhbWVXb3JrVmlldyA9IFwiVmlldy9HYW1lV29yay5zY2VuZVwiLFxyXG4gICAgU29uZ1N0b3JlVmlldyA9IFwiVmlldy9Tb25nU3RvcmUuc2NlbmVcIixcclxuICAgIEV4cG9ydFZpZXcgPSBcIlZpZXcvRXhwb3J0Vmlldy5zY2VuZVwiXHJcbiAgICAvL3RvZG865re75Yqg5L2g55qE55WM6Z2iXHJcbn1cclxuXHJcbi8v55WM6Z2i566h55CG5ZmoXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdfbXlxcV9NZ3IgXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaW5zdGFuY2U6IFZpZXdfbXlxcV9NZ3IgPSBuZXcgVmlld19teXFxX01ncigpO1xyXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IF92aWV3cyA6IGFueSA9IHt9O1xyXG5cclxuICAgIHB1YmxpYyBvcGVuVmlldyh2aWV3VHlwZSA6Vmlld0RlZixkYXRhPyA6IGFueSxvbmNvbXBsYXRlPyA6IEZ1bmN0aW9uKTogdm9pZCBcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl92aWV3c1t2aWV3VHlwZV0pXHJcbiAgICAgICAgeyAgXHJcbiAgICAgICAgICAgIHZhciB2aWV3ID0gdGhpcy5fdmlld3Nbdmlld1R5cGVdO1xyXG4gICAgICAgICAgICBsZXQgY29tcyA9IHZpZXcuX2NvbXBvbmVudHM7XHJcbiAgICAgICAgICAgIGxldCB2aWV3QmFzZSA6IFZpZXdCYXNlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYoY29tcyl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY29tcy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gY29tc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC5fdmlld0Jhc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Lm9wZW5WaWV3KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25jb21wbGF0ZSkgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY29tcGxhdGUoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG9uY29tcGxhdGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9uY29tcGxhdGUodmlld0Jhc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHZpZXdVcmwgPSBTdHJpbmcodmlld1R5cGUpXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIExheWEuU2NlbmUubG9hZCh2aWV3VXJsLExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgZnVuY3Rpb24gKG93bmVyOiBhbnkpIHtcclxuICAgICAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChvd25lcik7XHJcbiAgICAgICAgICAgIHZhciB2aWV3ID0gb3duZXIgYXMgTGF5YS5WaWV3O1xyXG4gICAgICAgICAgICBzZWxmLl92aWV3c1t2aWV3VHlwZV0gPSB2aWV3O1xyXG4gICAgICAgICAgICBsZXQgY29tcyA9IG93bmVyLl9jb21wb25lbnRzO1xyXG4gICAgICAgICAgICBsZXQgdmlld0Jhc2UgOiBWaWV3QmFzZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmKGNvbXMpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvbXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGNvbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuX3ZpZXdCYXNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0Jhc2UgPSBlbGVtZW50IGFzIFZpZXdCYXNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50Ll92aWV3RGVmID0gdmlld1R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdCYXNlLm9wZW5WaWV3KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYob25jb21wbGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb25jb21wbGF0ZSh2aWV3QmFzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlVmlldyh2aWV3VHlwZSA6Vmlld0RlZikgXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHZpZXcgOiBMYXlhLlZpZXcgPSB0aGlzLl92aWV3c1t2aWV3VHlwZV07XHJcbiAgICAgICAgaWYodmlldylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBvd25lciA9IHZpZXcgYXMgYW55O1xyXG4gICAgICAgICAgICBsZXQgY29tcyA9IG93bmVyLl9jb21wb25lbnRzO1xyXG4gICAgICAgICAgICBpZihjb21zKXtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjb21zLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBjb21zW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50Ll92aWV3QmFzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQub25DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmlldy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHZpZXcuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl92aWV3c1t2aWV3VHlwZV0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2hvd1ZpZXcodmlld1R5cGUgOlZpZXdEZWYpIFxyXG4gICAge1xyXG4gICAgICAgIHZhciB2aWV3ICA9IHRoaXMuX3ZpZXdzW3ZpZXdUeXBlXTtcclxuICAgICAgICBpZih2aWV3KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGNvbXMgPSB2aWV3Ll9jb21wb25lbnRzO1xyXG4gICAgICAgICAgICBpZihjb21zKXtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjb21zLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBjb21zW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50Ll92aWV3QmFzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGVWaWV3KHZpZXdUeXBlIDpWaWV3RGVmKSBcclxuICAgIHtcclxuICAgICAgICB2YXIgdmlldyA9IHRoaXMuX3ZpZXdzW3ZpZXdUeXBlXTtcclxuICAgICAgICBpZih2aWV3KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGNvbXMgPSB2aWV3Ll9jb21wb25lbnRzO1xyXG4gICAgICAgICAgICBpZihjb21zKXtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjb21zLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBjb21zW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50Ll92aWV3QmFzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFZpZXcodmlld1R5cGUgOlZpZXdEZWYpIDogTGF5YS5WaWV3XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZpZXdzW3ZpZXdUeXBlXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd1RpcHMobXNnIDogc3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub3BlblZpZXcoVmlld0RlZi5UaXBzVmlldyxtc2cpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRXZlbnREZWYgfSBmcm9tIFwiLi9FdmVudC9FdmVudERlZlwiO1xyXG5pbXBvcnQgRXZlbnRfbXlxcV9NZ3IgZnJvbSBcIi4vRXZlbnQvRXZlbnRNZ3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdGl2ZUNhbGxiYWNrIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgTm93VmlkZW9UeXBlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgY29uY2hJT1M6IHN0cmluZyA9IFwiQ29uY2gtaW9zXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBjb25jaEFuZHJvaWQ6IHN0cmluZyA9IFwiQ29uY2gtYW5kcm9pZFwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgb3M6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvLyBwcml2YXRlIHN0YXRpYyBicmlkZ2U6IExheWEuSVBsYXRmb3JtQ2xhc3MgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgb25WaWRlb0ZhaWwoKSB7XHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnREZWYuUmV3YXJkVmlkZW9GYWlsKTtcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5tdXRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgb25WaWRlb1N1Y2Nlc3MocmV3YXJkOnN0cmluZykge1xyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLlJld2FyZFZpZGVvU3VjY2VzcywgcmV3YXJkKTtcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5tdXRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgb25JbnNlcnRWaWRlb0VuZCgpIHtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwib25JbnNlcnRWaWRlb0VuZCAgICAtLS0tLS0tLS0gLS0tLS0tLS0tLS0tIFwiKTtcclxuICAgICAgICBFdmVudF9teXFxX01nci5pbnN0YW5jZS5kaXNwYXRjaChFdmVudERlZi5JbnNlcnRWaWRlb0VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ov5vlhaXlkI7lj7BcclxuICAgIHB1YmxpYyBzdGF0aWMgb25QYXVzZSgpIHtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwi6L+b5YWl5ZCO5Y+wIOmdmemfs1wiKTtcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnREZWYuR2FtZV9CTFVSKTtcclxuICAgIH1cclxuICAgIC8v5oGi5aSNXHJcbiAgICBwdWJsaWMgc3RhdGljIG9uUmVzdW1lKCkge1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCLmgaLlpI0tLS0tLS0tLS1cIik7XHJcbiAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIubXV0ZWQgPSBmYWxzZTtcclxuICAgICAgICBFdmVudF9teXFxX01nci5pbnN0YW5jZS5kaXNwYXRjaChFdmVudERlZi5HYW1lX0ZPQ1VTKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/ov5vlhaXmuLjmiI/lkI7vvIzmiafooYxpbml05Ye95pWwXHJcbiAgICAvLyBwdWJsaWMgc3RhdGljIGluaXQoKXtcclxuICAgIC8vICAgICBpZiAoTGF5YS5Ccm93c2VyLndpbmRvdy5jb25jaCkge1xyXG4gICAgLy8gICAgICAgICB0aGlzLm9zID0gY29uY2hDb25maWcuZ2V0T1MoKTtcclxuICAgIC8vICAgICAgICAgaWYgKHRoaXMub3MgPT0gSmF2ZUNhbGxiYWNrLmNvbmNoSU9TKSB7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmJyaWRnZSA9IExheWEuUGxhdGZvcm1DbGFzcy5jcmVhdGVDbGFzcyhcIkpTQnJpZGdlXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5icmlkZ2UuY2FsbChcImluaXRHYW1lOlwiKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBlbHNlIGlmICh0aGlzLm9zID09IEphdmVDYWxsYmFjay5jb25jaEFuZHJvaWQpIHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuYnJpZGdlID0gTGF5YS5QbGF0Zm9ybUNsYXNzLmNyZWF0ZUNsYXNzKFwiZGVtby5KU0JyaWRnZVwiKTtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuYnJpZGdlLmNhbGwoXCJpbml0R2FtZVwiKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgQ2FsbE5hdGl2ZUZ1bmMoZnVuY05hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgaWYgKExheWEuQnJvd3Nlci5vbkFuZHJvaWQpIHtcclxuICAgICAgICAgICAgdmFyIGJyaWRnZSA9IHdpbmRvd1tcIlBsYXRmb3JtQ2xhc3NcIl0uY3JlYXRlQ2xhc3MoXCJkZW1vLkpTQnJpZGdlXCIpO1xyXG4gICAgICAgICAgICBicmlkZ2UuY2FsbChmdW5jTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKExheWEuQnJvd3Nlci5vbklPUykge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBTaG93TG9nKGxvZzogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLovpPlh7puYXRpdmXml6Xlv5ctLS1cIiArIGxvZyk7XHJcbiAgICAgICAgaWYgKExheWEuQnJvd3Nlci5vbkFuZHJvaWQpIHtcclxuICAgICAgICAgICAgdmFyIGJyaWRnZSA9IHdpbmRvd1tcIlBsYXRmb3JtQ2xhc3NcIl0uY3JlYXRlQ2xhc3MoXCJkZW1vLkpTQnJpZGdlXCIpO1xyXG4gICAgICAgICAgICBicmlkZ2UuY2FsbChcInNob3dMb2dcIiwgbG9nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoTGF5YS5Ccm93c2VyLm9uSU9TKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCAqIGFzIENyeXB0b0pTIGZyb20gXCIuL2Flcy5qc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZXNfbXlxcV9Ub29sc1xyXG57XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBLRVkgPSAnYiM2M2ZGSjZBdmtLM1lUKic7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJViA9ICdKJGY0RFUlc05MNzNNJkdvJztcclxuXHJcbiAgICAvL+WKoOWvhlxyXG4gICAgcHVibGljIHN0YXRpYyBlbmNyeXB0KHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKEFlc19teXFxX1Rvb2xzLktFWSk7Ly8g56eY6ZKlXHJcbiAgICAgICAgdmFyIGl2ID0gQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2UoQWVzX215cXFfVG9vbHMuSVYpOy8v5ZCR6YePaXZcclxuICAgICAgICB2YXIgZW5jcnlwdGVkID0gQ3J5cHRvSlMuQUVTLmVuY3J5cHQoc3RyLCBrZXksIHsgaXY6IGl2LCBtb2RlOiBDcnlwdG9KUy5tb2RlLkNCQywgcGFkZGluZzogQ3J5cHRvSlMucGFkLlBrY3M3IH0pO1xyXG4gICAgICAgIHJldHVybiBlbmNyeXB0ZWQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+ino+WvhlxyXG4gICAgcHVibGljIHN0YXRpYyBkZWNyeXB0KHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKEFlc19teXFxX1Rvb2xzLktFWSk7Ly8g56eY6ZKlXHJcbiAgICAgICAgdmFyIGl2ID0gQ3J5cHRvSlMuZW5jLlV0ZjgucGFyc2UoQWVzX215cXFfVG9vbHMuSVYpOy8v5ZCR6YePaXZcclxuICAgICAgICB2YXIgZGVjcnlwdGVkID0gQ3J5cHRvSlMuQUVTLmRlY3J5cHQoc3RyLCBrZXksIHsgaXY6IGl2LCBwYWRkaW5nOiBDcnlwdG9KUy5wYWQuUGtjczcgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlY3J5cHRlZC50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG59IiwiaW1wb3J0IE5ldF9teXFxX0NvbmZpZyBmcm9tIFwiLi9OZXRDb25maWdcIjtcclxuaW1wb3J0IFVzZXJfeXkgZnJvbSBcIi4uL1VzZXIvVXNlclwiO1xyXG5pbXBvcnQgQWVzX215cXFfVG9vbHMgZnJvbSBcIi4vQWVzVG9vbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyByZXF1ZXN0RGF0YVxyXG57XHJcbiAgICBwdWJsaWMgbWV0aCA6IHN0cmluZyA9IFwicG9zdFwiO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGRhdGEgOiBhbnk7XHJcbiAgICBwdWJsaWMgdXJsIDogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBvblN1Y2Nlc3MgOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICBwdWJsaWMgb25GYWlsIDogRnVuY3Rpb24gPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSB7fTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHR0cF9teXFxX1VuaXQgXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVxdWVzdChyZXEgOiByZXF1ZXN0RGF0YSkge1xyXG4gICAgICAgIGlmIChyZXEudXJsLmluZGV4T2YoXCJodHRwczovL1wiKSA+IC0xIHx8XHJcbiAgICAgICAgICAgIHJlcS51cmwuaW5kZXhPZihcImh0dHA6Ly9cIikgPiAtMSkge1xyXG4gICAgICAgICAgICByZXEudXJsID0gcmVxLnVybDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXEudXJsID0gTmV0X215cXFfQ29uZmlnLnNlcnZlclVybCArIHJlcS51cmw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY29tcGxldGVGdW5jID0gKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMsXCJodHRwIFN1Y2Nlc3NcIilcclxuICAgICAgICAgICAgaWYgKHJlcS5vblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIHJlcS5vblN1Y2Nlc3MocmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXEub25TdWNjZXNzID0gbnVsbDtcclxuICAgICAgICAgICAgcmVxID0gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgZXJyb3JGdW5jID0gKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMsXCJodHRwIGZhaWxcIilcclxuICAgICAgICAgICAgaWYgKHJlcS5vbkZhaWwpICB7XHJcbiAgICAgICAgICAgICAgICByZXEub25GYWlsKHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVxLm9uRmFpbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHJlcSA9IG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIHhocjogTGF5YS5IdHRwUmVxdWVzdCA9IG5ldyBMYXlhLkh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9uY2UoTGF5YS5FdmVudC5DT01QTEVURSwgSHR0cF9teXFxX1VuaXQsIGNvbXBsZXRlRnVuYyk7XHJcbiAgICAgICAgeGhyLm9uY2UoTGF5YS5FdmVudC5FUlJPUiwgSHR0cF9teXFxX1VuaXQsIGVycm9yRnVuYyk7XHJcbiAgICAgICAgbGV0IGRhdGFTdHI6c3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocmVxLmRhdGEpO1xyXG5cclxuICAgICAgICByZXEuZGF0YS5jb2RlID0gVXNlcl95eS5jb2RlO1xyXG4gICAgICAgIHZhciB0aW1lID0gXCJ0aW1lPVwiICsgU3RyaW5nKERhdGUubm93KCkpO1xyXG4gICAgICAgIHZhciBoZWFkZXIgPSBcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICBcInN0YXRlXCIgLCAwLFxyXG4gICAgICAgICAgICBcImdhbWVpZFwiICxOZXRfbXlxcV9Db25maWcuZ2FtZWlkLFxyXG4gICAgICAgICAgICBcInNpZ25cIiAsQWVzX215cXFfVG9vbHMuZW5jcnlwdCh0aW1lKSxcclxuICAgICAgICBdXHJcbiAgICAgICAgaWYoVXNlcl95eS50b2tlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGhlYWRlci5wdXNoKFwidG9rZW5cIik7XHJcbiAgICAgICAgICAgIGhlYWRlci5wdXNoKFVzZXJfeXkudG9rZW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgeGhyLnNlbmQocmVxLnVybCwgSlNPTi5zdHJpbmdpZnkocmVxLmRhdGEpLCByZXEubWV0aCwgXCJqc29uXCIsaGVhZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3RvZG866L+Z6YeM5re75Yqg5L2g5Lus5ZKM5pyN5Yqh5Zmo55u45LqS55qE5o6l5Y+jXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsb2dpbihvblN1Y2Nlc3MgOiBGdW5jdGlvbixvbkZhaWwgOiBGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVxID0gbmV3IHJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgcmVxLnVybCA9IE5ldF9teXFxX0NvbmZpZy5Mb2dpbjtcclxuICAgICAgICByZXEub25TdWNjZXNzID0gb25TdWNjZXNzO1xyXG4gICAgICAgIHJlcS5vbkZhaWwgPSBvbkZhaWw7XHJcbiAgICAgICAgSHR0cF9teXFxX1VuaXQucmVxdWVzdChyZXEpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIHNhdmVHYW1lRGF0YShnYW1lRGF0YSA6IGFueSxvblN1Y2Nlc3MgOiBGdW5jdGlvbixvbkZhaWwgOiBGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVxID0gbmV3IHJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgcmVxLnVybCA9IE5ldF9teXFxX0NvbmZpZy5TYXZlR2FtZURhdGE7XHJcbiAgICAgICAgcmVxLmRhdGEuZ2FtZURhdGEgPSBnYW1lRGF0YTtcclxuICAgICAgICByZXEub25TdWNjZXNzID0gb25TdWNjZXNzO1xyXG4gICAgICAgIHJlcS5vbkZhaWwgPSBvbkZhaWw7XHJcbiAgICAgICAgSHR0cF9teXFxX1VuaXQucmVxdWVzdChyZXEpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEdhbWVEYXRhKG9uU3VjY2VzcyA6IEZ1bmN0aW9uLG9uRmFpbCA6IEZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByZXEgPSBuZXcgcmVxdWVzdERhdGEoKTtcclxuICAgICAgICByZXEudXJsID0gTmV0X215cXFfQ29uZmlnLkdldFVzZXI7XHJcbiAgICAgICAgcmVxLm9uU3VjY2VzcyA9IG9uU3VjY2VzcztcclxuICAgICAgICByZXEub25GYWlsID0gb25GYWlsO1xyXG4gICAgICAgIEh0dHBfbXlxcV9Vbml0LnJlcXVlc3QocmVxKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBJUOWxj+iUveaWueazle+8jOmcgOimgeWcqE5ldENvbmZpZ+exu+S4reiuvue9rklwQmxvY2vnmoTmjqXlj6PlnLDlnYBcclxuICAgICAqIG9uU3VjY2Vzc+aWueazlei/lOWbnuWPguaVsOeahOiMg+S+i+S4uiBPYmplY3Qge2NvZGU6IDAsIG1zZzogXCLlh4bkuIDnur9cIiwgdGltZTogXCIxNTcxMDM0NDQ3XCIsIGRhdGE6IG51bGx9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAbWVtYmVyb2YgSHR0cFVuaXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBHZXRJcEJsb2NrKG9uU3VjY2VzcyA6IEZ1bmN0aW9uLG9uRmFpbCA6IEZ1bmN0aW9uKXtcclxuICAgICAgICB2YXIgcmVxID0gbmV3IHJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgcmVxLnVybCA9IE5ldF9teXFxX0NvbmZpZy5JcEJsb2NrO1xyXG4gICAgICAgIHJlcS5vblN1Y2Nlc3MgPSBvblN1Y2Nlc3M7XHJcbiAgICAgICAgcmVxLm9uRmFpbCA9IG9uRmFpbDtcclxuICAgICAgICBIdHRwX215cXFfVW5pdC5yZXF1ZXN0KHJlcSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV0X215cXFfQ29uZmlnXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZ2FtZWlkIDogbnVtYmVyID0gMTY7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IHNlcnZlclVybCA6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IExvZ2luIDogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU2F2ZUdhbWVEYXRhIDogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR2V0VXNlciA9IFwiclwiO1xyXG4gICAgXHJcbiAgICAvKiDnlKjmnaXlr7lJUOWcsOWdgOi/m+ihjOWxj+iUveeahOaOpeWPo+WcsOWdgO+8jOWPr+S7peS9v+eUqOaOpeWPo+eahOi/lOWbnuWAvOiuqeafkOS6m+W5v+WRiumAu+i+keWcqOW+ruS/oeeahOWuoeaguOWcsOWMuijlub/lt54p5Y+R55Sf5Y+Y5YyWICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IElwQmxvY2sgPSBcIlwiO1xyXG59IiwidmFyIENyeXB0b0pTID0gQ3J5cHRvSlMgfHwgZnVuY3Rpb24gKHUsIHApIHtcclxuICB2YXIgZCA9IHt9LCBsID0gZC5saWIgPSB7fSwgcyA9IGZ1bmN0aW9uICgpIHsgfSwgdCA9IGwuQmFzZSA9IHsgZXh0ZW5kOiBmdW5jdGlvbiAoYSkgeyBzLnByb3RvdHlwZSA9IHRoaXM7IHZhciBjID0gbmV3IHM7IGEgJiYgYy5taXhJbihhKTsgYy5oYXNPd25Qcm9wZXJ0eShcImluaXRcIikgfHwgKGMuaW5pdCA9IGZ1bmN0aW9uICgpIHsgYy4kc3VwZXIuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIH0pOyBjLmluaXQucHJvdG90eXBlID0gYzsgYy4kc3VwZXIgPSB0aGlzOyByZXR1cm4gYyB9LCBjcmVhdGU6IGZ1bmN0aW9uICgpIHsgdmFyIGEgPSB0aGlzLmV4dGVuZCgpOyBhLmluaXQuYXBwbHkoYSwgYXJndW1lbnRzKTsgcmV0dXJuIGEgfSwgaW5pdDogZnVuY3Rpb24gKCkgeyB9LCBtaXhJbjogZnVuY3Rpb24gKGEpIHsgZm9yICh2YXIgYyBpbiBhKSBhLmhhc093blByb3BlcnR5KGMpICYmICh0aGlzW2NdID0gYVtjXSk7IGEuaGFzT3duUHJvcGVydHkoXCJ0b1N0cmluZ1wiKSAmJiAodGhpcy50b1N0cmluZyA9IGEudG9TdHJpbmcpIH0sIGNsb25lOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmluaXQucHJvdG90eXBlLmV4dGVuZCh0aGlzKSB9IH0sXHJcbiAgciA9IGwuV29yZEFycmF5ID0gdC5leHRlbmQoe1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKGEsIGMpIHsgYSA9IHRoaXMud29yZHMgPSBhIHx8IFtdOyB0aGlzLnNpZ0J5dGVzID0gYyAhPSBwID8gYyA6IDQgKiBhLmxlbmd0aCB9LCB0b1N0cmluZzogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIChhIHx8IHYpLnN0cmluZ2lmeSh0aGlzKSB9LCBjb25jYXQ6IGZ1bmN0aW9uIChhKSB7IHZhciBjID0gdGhpcy53b3JkcywgZSA9IGEud29yZHMsIGogPSB0aGlzLnNpZ0J5dGVzOyBhID0gYS5zaWdCeXRlczsgdGhpcy5jbGFtcCgpOyBpZiAoaiAlIDQpIGZvciAodmFyIGsgPSAwOyBrIDwgYTsgaysrKWNbaiArIGsgPj4+IDJdIHw9IChlW2sgPj4+IDJdID4+PiAyNCAtIDggKiAoayAlIDQpICYgMjU1KSA8PCAyNCAtIDggKiAoKGogKyBrKSAlIDQpOyBlbHNlIGlmICg2NTUzNSA8IGUubGVuZ3RoKSBmb3IgKGsgPSAwOyBrIDwgYTsgayArPSA0KWNbaiArIGsgPj4+IDJdID0gZVtrID4+PiAyXTsgZWxzZSBjLnB1c2guYXBwbHkoYywgZSk7IHRoaXMuc2lnQnl0ZXMgKz0gYTsgcmV0dXJuIHRoaXMgfSwgY2xhbXA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGEgPSB0aGlzLndvcmRzLCBjID0gdGhpcy5zaWdCeXRlczsgYVtjID4+PiAyXSAmPSA0Mjk0OTY3Mjk1IDw8XHJcbiAgICAgICAgMzIgLSA4ICogKGMgJSA0KTsgYS5sZW5ndGggPSB1LmNlaWwoYyAvIDQpXHJcbiAgICB9LCBjbG9uZTogZnVuY3Rpb24gKCkgeyB2YXIgYSA9IHQuY2xvbmUuY2FsbCh0aGlzKTsgYS53b3JkcyA9IHRoaXMud29yZHMuc2xpY2UoMCk7IHJldHVybiBhIH0sIHJhbmRvbTogZnVuY3Rpb24gKGEpIHsgZm9yICh2YXIgYyA9IFtdLCBlID0gMDsgZSA8IGE7IGUgKz0gNCljLnB1c2goNDI5NDk2NzI5NiAqIHUucmFuZG9tKCkgfCAwKTsgcmV0dXJuIG5ldyByLmluaXQoYywgYSkgfVxyXG4gIH0pLCB3ID0gZC5lbmMgPSB7fSwgdiA9IHcuSGV4ID0ge1xyXG4gICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAoYSkgeyB2YXIgYyA9IGEud29yZHM7IGEgPSBhLnNpZ0J5dGVzOyBmb3IgKHZhciBlID0gW10sIGogPSAwOyBqIDwgYTsgaisrKSB7IHZhciBrID0gY1tqID4+PiAyXSA+Pj4gMjQgLSA4ICogKGogJSA0KSAmIDI1NTsgZS5wdXNoKChrID4+PiA0KS50b1N0cmluZygxNikpOyBlLnB1c2goKGsgJiAxNSkudG9TdHJpbmcoMTYpKSB9IHJldHVybiBlLmpvaW4oXCJcIikgfSwgcGFyc2U6IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgIGZvciAodmFyIGMgPSBhLmxlbmd0aCwgZSA9IFtdLCBqID0gMDsgaiA8IGM7IGogKz0gMillW2ogPj4+IDNdIHw9IHBhcnNlSW50KGEuc3Vic3RyKGosXHJcbiAgICAgICAgMiksIDE2KSA8PCAyNCAtIDQgKiAoaiAlIDgpOyByZXR1cm4gbmV3IHIuaW5pdChlLCBjIC8gMilcclxuICAgIH1cclxuICB9LCBiID0gdy5MYXRpbjEgPSB7IHN0cmluZ2lmeTogZnVuY3Rpb24gKGEpIHsgdmFyIGMgPSBhLndvcmRzOyBhID0gYS5zaWdCeXRlczsgZm9yICh2YXIgZSA9IFtdLCBqID0gMDsgaiA8IGE7IGorKyllLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShjW2ogPj4+IDJdID4+PiAyNCAtIDggKiAoaiAlIDQpICYgMjU1KSk7IHJldHVybiBlLmpvaW4oXCJcIikgfSwgcGFyc2U6IGZ1bmN0aW9uIChhKSB7IGZvciAodmFyIGMgPSBhLmxlbmd0aCwgZSA9IFtdLCBqID0gMDsgaiA8IGM7IGorKyllW2ogPj4+IDJdIHw9IChhLmNoYXJDb2RlQXQoaikgJiAyNTUpIDw8IDI0IC0gOCAqIChqICUgNCk7IHJldHVybiBuZXcgci5pbml0KGUsIGMpIH0gfSwgeCA9IHcuVXRmOCA9IHsgc3RyaW5naWZ5OiBmdW5jdGlvbiAoYSkgeyB0cnkgeyByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShiLnN0cmluZ2lmeShhKSkpIH0gY2F0Y2ggKGMpIHsgdGhyb3cgRXJyb3IoXCJNYWxmb3JtZWQgVVRGLTggZGF0YVwiKTsgfSB9LCBwYXJzZTogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGIucGFyc2UodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGEpKSkgfSB9LFxyXG4gIHEgPSBsLkJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSB0LmV4dGVuZCh7XHJcbiAgICByZXNldDogZnVuY3Rpb24gKCkgeyB0aGlzLl9kYXRhID0gbmV3IHIuaW5pdDsgdGhpcy5fbkRhdGFCeXRlcyA9IDAgfSwgX2FwcGVuZDogZnVuY3Rpb24gKGEpIHsgXCJzdHJpbmdcIiA9PSB0eXBlb2YgYSAmJiAoYSA9IHgucGFyc2UoYSkpOyB0aGlzLl9kYXRhLmNvbmNhdChhKTsgdGhpcy5fbkRhdGFCeXRlcyArPSBhLnNpZ0J5dGVzIH0sIF9wcm9jZXNzOiBmdW5jdGlvbiAoYSkgeyB2YXIgYyA9IHRoaXMuX2RhdGEsIGUgPSBjLndvcmRzLCBqID0gYy5zaWdCeXRlcywgayA9IHRoaXMuYmxvY2tTaXplLCBiID0gaiAvICg0ICogayksIGIgPSBhID8gdS5jZWlsKGIpIDogdS5tYXgoKGIgfCAwKSAtIHRoaXMuX21pbkJ1ZmZlclNpemUsIDApOyBhID0gYiAqIGs7IGogPSB1Lm1pbig0ICogYSwgaik7IGlmIChhKSB7IGZvciAodmFyIHEgPSAwOyBxIDwgYTsgcSArPSBrKXRoaXMuX2RvUHJvY2Vzc0Jsb2NrKGUsIHEpOyBxID0gZS5zcGxpY2UoMCwgYSk7IGMuc2lnQnl0ZXMgLT0gaiB9IHJldHVybiBuZXcgci5pbml0KHEsIGopIH0sIGNsb25lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBhID0gdC5jbG9uZS5jYWxsKHRoaXMpO1xyXG4gICAgICBhLl9kYXRhID0gdGhpcy5fZGF0YS5jbG9uZSgpOyByZXR1cm4gYVxyXG4gICAgfSwgX21pbkJ1ZmZlclNpemU6IDBcclxuICB9KTsgbC5IYXNoZXIgPSBxLmV4dGVuZCh7XHJcbiAgICBjZmc6IHQuZXh0ZW5kKCksIGluaXQ6IGZ1bmN0aW9uIChhKSB7IHRoaXMuY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGEpOyB0aGlzLnJlc2V0KCkgfSwgcmVzZXQ6IGZ1bmN0aW9uICgpIHsgcS5yZXNldC5jYWxsKHRoaXMpOyB0aGlzLl9kb1Jlc2V0KCkgfSwgdXBkYXRlOiBmdW5jdGlvbiAoYSkgeyB0aGlzLl9hcHBlbmQoYSk7IHRoaXMuX3Byb2Nlc3MoKTsgcmV0dXJuIHRoaXMgfSwgZmluYWxpemU6IGZ1bmN0aW9uIChhKSB7IGEgJiYgdGhpcy5fYXBwZW5kKGEpOyByZXR1cm4gdGhpcy5fZG9GaW5hbGl6ZSgpIH0sIGJsb2NrU2l6ZTogMTYsIF9jcmVhdGVIZWxwZXI6IGZ1bmN0aW9uIChhKSB7IHJldHVybiBmdW5jdGlvbiAoYiwgZSkgeyByZXR1cm4gKG5ldyBhLmluaXQoZSkpLmZpbmFsaXplKGIpIH0gfSwgX2NyZWF0ZUhtYWNIZWxwZXI6IGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYiwgZSkge1xyXG4gICAgICAgIHJldHVybiAobmV3IG4uSE1BQy5pbml0KGEsXHJcbiAgICAgICAgICBlKSkuZmluYWxpemUoYilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pOyB2YXIgbiA9IGQuYWxnbyA9IHt9OyByZXR1cm4gZFxyXG59KE1hdGgpO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gIHZhciB1ID0gQ3J5cHRvSlMsIHAgPSB1LmxpYi5Xb3JkQXJyYXk7IHUuZW5jLkJhc2U2NCA9IHtcclxuICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKGQpIHsgdmFyIGwgPSBkLndvcmRzLCBwID0gZC5zaWdCeXRlcywgdCA9IHRoaXMuX21hcDsgZC5jbGFtcCgpOyBkID0gW107IGZvciAodmFyIHIgPSAwOyByIDwgcDsgciArPSAzKWZvciAodmFyIHcgPSAobFtyID4+PiAyXSA+Pj4gMjQgLSA4ICogKHIgJSA0KSAmIDI1NSkgPDwgMTYgfCAobFtyICsgMSA+Pj4gMl0gPj4+IDI0IC0gOCAqICgociArIDEpICUgNCkgJiAyNTUpIDw8IDggfCBsW3IgKyAyID4+PiAyXSA+Pj4gMjQgLSA4ICogKChyICsgMikgJSA0KSAmIDI1NSwgdiA9IDA7IDQgPiB2ICYmIHIgKyAwLjc1ICogdiA8IHA7IHYrKylkLnB1c2godC5jaGFyQXQodyA+Pj4gNiAqICgzIC0gdikgJiA2MykpOyBpZiAobCA9IHQuY2hhckF0KDY0KSkgZm9yICg7IGQubGVuZ3RoICUgNDspZC5wdXNoKGwpOyByZXR1cm4gZC5qb2luKFwiXCIpIH0sIHBhcnNlOiBmdW5jdGlvbiAoZCkge1xyXG4gICAgICB2YXIgbCA9IGQubGVuZ3RoLCBzID0gdGhpcy5fbWFwLCB0ID0gcy5jaGFyQXQoNjQpOyB0ICYmICh0ID0gZC5pbmRleE9mKHQpLCAtMSAhPSB0ICYmIChsID0gdCkpOyBmb3IgKHZhciB0ID0gW10sIHIgPSAwLCB3ID0gMDsgdyA8XHJcbiAgICAgICAgbDsgdysrKWlmICh3ICUgNCkgeyB2YXIgdiA9IHMuaW5kZXhPZihkLmNoYXJBdCh3IC0gMSkpIDw8IDIgKiAodyAlIDQpLCBiID0gcy5pbmRleE9mKGQuY2hhckF0KHcpKSA+Pj4gNiAtIDIgKiAodyAlIDQpOyB0W3IgPj4+IDJdIHw9ICh2IHwgYikgPDwgMjQgLSA4ICogKHIgJSA0KTsgcisrIH0gcmV0dXJuIHAuY3JlYXRlKHQsIHIpXHJcbiAgICB9LCBfbWFwOiBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XCJcclxuICB9XHJcbn0pKCk7XHJcbihmdW5jdGlvbiAodSkge1xyXG4gIGZ1bmN0aW9uIHAoYiwgbiwgYSwgYywgZSwgaiwgaykgeyBiID0gYiArIChuICYgYSB8IH5uICYgYykgKyBlICsgazsgcmV0dXJuIChiIDw8IGogfCBiID4+PiAzMiAtIGopICsgbiB9IGZ1bmN0aW9uIGQoYiwgbiwgYSwgYywgZSwgaiwgaykgeyBiID0gYiArIChuICYgYyB8IGEgJiB+YykgKyBlICsgazsgcmV0dXJuIChiIDw8IGogfCBiID4+PiAzMiAtIGopICsgbiB9IGZ1bmN0aW9uIGwoYiwgbiwgYSwgYywgZSwgaiwgaykgeyBiID0gYiArIChuIF4gYSBeIGMpICsgZSArIGs7IHJldHVybiAoYiA8PCBqIHwgYiA+Pj4gMzIgLSBqKSArIG4gfSBmdW5jdGlvbiBzKGIsIG4sIGEsIGMsIGUsIGosIGspIHsgYiA9IGIgKyAoYSBeIChuIHwgfmMpKSArIGUgKyBrOyByZXR1cm4gKGIgPDwgaiB8IGIgPj4+IDMyIC0gaikgKyBuIH0gZm9yICh2YXIgdCA9IENyeXB0b0pTLCByID0gdC5saWIsIHcgPSByLldvcmRBcnJheSwgdiA9IHIuSGFzaGVyLCByID0gdC5hbGdvLCBiID0gW10sIHggPSAwOyA2NCA+IHg7IHgrKyliW3hdID0gNDI5NDk2NzI5NiAqIHUuYWJzKHUuc2luKHggKyAxKSkgfCAwOyByID0gci5NRDUgPSB2LmV4dGVuZCh7XHJcbiAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkgeyB0aGlzLl9oYXNoID0gbmV3IHcuaW5pdChbMTczMjU4NDE5MywgNDAyMzIzMzQxNywgMjU2MjM4MzEwMiwgMjcxNzMzODc4XSkgfSxcclxuICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKHEsIG4pIHtcclxuICAgICAgZm9yICh2YXIgYSA9IDA7IDE2ID4gYTsgYSsrKSB7IHZhciBjID0gbiArIGEsIGUgPSBxW2NdOyBxW2NdID0gKGUgPDwgOCB8IGUgPj4+IDI0KSAmIDE2NzExOTM1IHwgKGUgPDwgMjQgfCBlID4+PiA4KSAmIDQyNzgyNTUzNjAgfSB2YXIgYSA9IHRoaXMuX2hhc2gud29yZHMsIGMgPSBxW24gKyAwXSwgZSA9IHFbbiArIDFdLCBqID0gcVtuICsgMl0sIGsgPSBxW24gKyAzXSwgeiA9IHFbbiArIDRdLCByID0gcVtuICsgNV0sIHQgPSBxW24gKyA2XSwgdyA9IHFbbiArIDddLCB2ID0gcVtuICsgOF0sIEEgPSBxW24gKyA5XSwgQiA9IHFbbiArIDEwXSwgQyA9IHFbbiArIDExXSwgdSA9IHFbbiArIDEyXSwgRCA9IHFbbiArIDEzXSwgRSA9IHFbbiArIDE0XSwgeCA9IHFbbiArIDE1XSwgZiA9IGFbMF0sIG0gPSBhWzFdLCBnID0gYVsyXSwgaCA9IGFbM10sIGYgPSBwKGYsIG0sIGcsIGgsIGMsIDcsIGJbMF0pLCBoID0gcChoLCBmLCBtLCBnLCBlLCAxMiwgYlsxXSksIGcgPSBwKGcsIGgsIGYsIG0sIGosIDE3LCBiWzJdKSwgbSA9IHAobSwgZywgaCwgZiwgaywgMjIsIGJbM10pLCBmID0gcChmLCBtLCBnLCBoLCB6LCA3LCBiWzRdKSwgaCA9IHAoaCwgZiwgbSwgZywgciwgMTIsIGJbNV0pLCBnID0gcChnLCBoLCBmLCBtLCB0LCAxNywgYls2XSksIG0gPSBwKG0sIGcsIGgsIGYsIHcsIDIyLCBiWzddKSxcclxuICAgICAgICBmID0gcChmLCBtLCBnLCBoLCB2LCA3LCBiWzhdKSwgaCA9IHAoaCwgZiwgbSwgZywgQSwgMTIsIGJbOV0pLCBnID0gcChnLCBoLCBmLCBtLCBCLCAxNywgYlsxMF0pLCBtID0gcChtLCBnLCBoLCBmLCBDLCAyMiwgYlsxMV0pLCBmID0gcChmLCBtLCBnLCBoLCB1LCA3LCBiWzEyXSksIGggPSBwKGgsIGYsIG0sIGcsIEQsIDEyLCBiWzEzXSksIGcgPSBwKGcsIGgsIGYsIG0sIEUsIDE3LCBiWzE0XSksIG0gPSBwKG0sIGcsIGgsIGYsIHgsIDIyLCBiWzE1XSksIGYgPSBkKGYsIG0sIGcsIGgsIGUsIDUsIGJbMTZdKSwgaCA9IGQoaCwgZiwgbSwgZywgdCwgOSwgYlsxN10pLCBnID0gZChnLCBoLCBmLCBtLCBDLCAxNCwgYlsxOF0pLCBtID0gZChtLCBnLCBoLCBmLCBjLCAyMCwgYlsxOV0pLCBmID0gZChmLCBtLCBnLCBoLCByLCA1LCBiWzIwXSksIGggPSBkKGgsIGYsIG0sIGcsIEIsIDksIGJbMjFdKSwgZyA9IGQoZywgaCwgZiwgbSwgeCwgMTQsIGJbMjJdKSwgbSA9IGQobSwgZywgaCwgZiwgeiwgMjAsIGJbMjNdKSwgZiA9IGQoZiwgbSwgZywgaCwgQSwgNSwgYlsyNF0pLCBoID0gZChoLCBmLCBtLCBnLCBFLCA5LCBiWzI1XSksIGcgPSBkKGcsIGgsIGYsIG0sIGssIDE0LCBiWzI2XSksIG0gPSBkKG0sIGcsIGgsIGYsIHYsIDIwLCBiWzI3XSksIGYgPSBkKGYsIG0sIGcsIGgsIEQsIDUsIGJbMjhdKSwgaCA9IGQoaCwgZixcclxuICAgICAgICAgIG0sIGcsIGosIDksIGJbMjldKSwgZyA9IGQoZywgaCwgZiwgbSwgdywgMTQsIGJbMzBdKSwgbSA9IGQobSwgZywgaCwgZiwgdSwgMjAsIGJbMzFdKSwgZiA9IGwoZiwgbSwgZywgaCwgciwgNCwgYlszMl0pLCBoID0gbChoLCBmLCBtLCBnLCB2LCAxMSwgYlszM10pLCBnID0gbChnLCBoLCBmLCBtLCBDLCAxNiwgYlszNF0pLCBtID0gbChtLCBnLCBoLCBmLCBFLCAyMywgYlszNV0pLCBmID0gbChmLCBtLCBnLCBoLCBlLCA0LCBiWzM2XSksIGggPSBsKGgsIGYsIG0sIGcsIHosIDExLCBiWzM3XSksIGcgPSBsKGcsIGgsIGYsIG0sIHcsIDE2LCBiWzM4XSksIG0gPSBsKG0sIGcsIGgsIGYsIEIsIDIzLCBiWzM5XSksIGYgPSBsKGYsIG0sIGcsIGgsIEQsIDQsIGJbNDBdKSwgaCA9IGwoaCwgZiwgbSwgZywgYywgMTEsIGJbNDFdKSwgZyA9IGwoZywgaCwgZiwgbSwgaywgMTYsIGJbNDJdKSwgbSA9IGwobSwgZywgaCwgZiwgdCwgMjMsIGJbNDNdKSwgZiA9IGwoZiwgbSwgZywgaCwgQSwgNCwgYls0NF0pLCBoID0gbChoLCBmLCBtLCBnLCB1LCAxMSwgYls0NV0pLCBnID0gbChnLCBoLCBmLCBtLCB4LCAxNiwgYls0Nl0pLCBtID0gbChtLCBnLCBoLCBmLCBqLCAyMywgYls0N10pLCBmID0gcyhmLCBtLCBnLCBoLCBjLCA2LCBiWzQ4XSksIGggPSBzKGgsIGYsIG0sIGcsIHcsIDEwLCBiWzQ5XSksIGcgPSBzKGcsIGgsIGYsIG0sXHJcbiAgICAgICAgICAgIEUsIDE1LCBiWzUwXSksIG0gPSBzKG0sIGcsIGgsIGYsIHIsIDIxLCBiWzUxXSksIGYgPSBzKGYsIG0sIGcsIGgsIHUsIDYsIGJbNTJdKSwgaCA9IHMoaCwgZiwgbSwgZywgaywgMTAsIGJbNTNdKSwgZyA9IHMoZywgaCwgZiwgbSwgQiwgMTUsIGJbNTRdKSwgbSA9IHMobSwgZywgaCwgZiwgZSwgMjEsIGJbNTVdKSwgZiA9IHMoZiwgbSwgZywgaCwgdiwgNiwgYls1Nl0pLCBoID0gcyhoLCBmLCBtLCBnLCB4LCAxMCwgYls1N10pLCBnID0gcyhnLCBoLCBmLCBtLCB0LCAxNSwgYls1OF0pLCBtID0gcyhtLCBnLCBoLCBmLCBELCAyMSwgYls1OV0pLCBmID0gcyhmLCBtLCBnLCBoLCB6LCA2LCBiWzYwXSksIGggPSBzKGgsIGYsIG0sIGcsIEMsIDEwLCBiWzYxXSksIGcgPSBzKGcsIGgsIGYsIG0sIGosIDE1LCBiWzYyXSksIG0gPSBzKG0sIGcsIGgsIGYsIEEsIDIxLCBiWzYzXSk7IGFbMF0gPSBhWzBdICsgZiB8IDA7IGFbMV0gPSBhWzFdICsgbSB8IDA7IGFbMl0gPSBhWzJdICsgZyB8IDA7IGFbM10gPSBhWzNdICsgaCB8IDBcclxuICAgIH0sIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBiID0gdGhpcy5fZGF0YSwgbiA9IGIud29yZHMsIGEgPSA4ICogdGhpcy5fbkRhdGFCeXRlcywgYyA9IDggKiBiLnNpZ0J5dGVzOyBuW2MgPj4+IDVdIHw9IDEyOCA8PCAyNCAtIGMgJSAzMjsgdmFyIGUgPSB1LmZsb29yKGEgL1xyXG4gICAgICAgIDQyOTQ5NjcyOTYpOyBuWyhjICsgNjQgPj4+IDkgPDwgNCkgKyAxNV0gPSAoZSA8PCA4IHwgZSA+Pj4gMjQpICYgMTY3MTE5MzUgfCAoZSA8PCAyNCB8IGUgPj4+IDgpICYgNDI3ODI1NTM2MDsgblsoYyArIDY0ID4+PiA5IDw8IDQpICsgMTRdID0gKGEgPDwgOCB8IGEgPj4+IDI0KSAmIDE2NzExOTM1IHwgKGEgPDwgMjQgfCBhID4+PiA4KSAmIDQyNzgyNTUzNjA7IGIuc2lnQnl0ZXMgPSA0ICogKG4ubGVuZ3RoICsgMSk7IHRoaXMuX3Byb2Nlc3MoKTsgYiA9IHRoaXMuX2hhc2g7IG4gPSBiLndvcmRzOyBmb3IgKGEgPSAwOyA0ID4gYTsgYSsrKWMgPSBuW2FdLCBuW2FdID0gKGMgPDwgOCB8IGMgPj4+IDI0KSAmIDE2NzExOTM1IHwgKGMgPDwgMjQgfCBjID4+PiA4KSAmIDQyNzgyNTUzNjA7IHJldHVybiBiXHJcbiAgICB9LCBjbG9uZTogZnVuY3Rpb24gKCkgeyB2YXIgYiA9IHYuY2xvbmUuY2FsbCh0aGlzKTsgYi5faGFzaCA9IHRoaXMuX2hhc2guY2xvbmUoKTsgcmV0dXJuIGIgfVxyXG4gIH0pOyB0Lk1ENSA9IHYuX2NyZWF0ZUhlbHBlcihyKTsgdC5IbWFjTUQ1ID0gdi5fY3JlYXRlSG1hY0hlbHBlcihyKVxyXG59KShNYXRoKTtcclxuKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgdSA9IENyeXB0b0pTLCBwID0gdS5saWIsIGQgPSBwLkJhc2UsIGwgPSBwLldvcmRBcnJheSwgcCA9IHUuYWxnbywgcyA9IHAuRXZwS0RGID0gZC5leHRlbmQoeyBjZmc6IGQuZXh0ZW5kKHsga2V5U2l6ZTogNCwgaGFzaGVyOiBwLk1ENSwgaXRlcmF0aW9uczogMSB9KSwgaW5pdDogZnVuY3Rpb24gKGQpIHsgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoZCkgfSwgY29tcHV0ZTogZnVuY3Rpb24gKGQsIHIpIHsgZm9yICh2YXIgcCA9IHRoaXMuY2ZnLCBzID0gcC5oYXNoZXIuY3JlYXRlKCksIGIgPSBsLmNyZWF0ZSgpLCB1ID0gYi53b3JkcywgcSA9IHAua2V5U2l6ZSwgcCA9IHAuaXRlcmF0aW9uczsgdS5sZW5ndGggPCBxOykgeyBuICYmIHMudXBkYXRlKG4pOyB2YXIgbiA9IHMudXBkYXRlKGQpLmZpbmFsaXplKHIpOyBzLnJlc2V0KCk7IGZvciAodmFyIGEgPSAxOyBhIDwgcDsgYSsrKW4gPSBzLmZpbmFsaXplKG4pLCBzLnJlc2V0KCk7IGIuY29uY2F0KG4pIH0gYi5zaWdCeXRlcyA9IDQgKiBxOyByZXR1cm4gYiB9IH0pOyB1LkV2cEtERiA9IGZ1bmN0aW9uIChkLCBsLCBwKSB7XHJcbiAgICByZXR1cm4gcy5jcmVhdGUocCkuY29tcHV0ZShkLFxyXG4gICAgICBsKVxyXG4gIH1cclxufSkoKTtcclxuQ3J5cHRvSlMubGliLkNpcGhlciB8fCBmdW5jdGlvbiAodSkge1xyXG4gIHZhciBwID0gQ3J5cHRvSlMsIGQgPSBwLmxpYiwgbCA9IGQuQmFzZSwgcyA9IGQuV29yZEFycmF5LCB0ID0gZC5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtLCByID0gcC5lbmMuQmFzZTY0LCB3ID0gcC5hbGdvLkV2cEtERiwgdiA9IGQuQ2lwaGVyID0gdC5leHRlbmQoe1xyXG4gICAgY2ZnOiBsLmV4dGVuZCgpLCBjcmVhdGVFbmNyeXB0b3I6IGZ1bmN0aW9uIChlLCBhKSB7IHJldHVybiB0aGlzLmNyZWF0ZSh0aGlzLl9FTkNfWEZPUk1fTU9ERSwgZSwgYSkgfSwgY3JlYXRlRGVjcnlwdG9yOiBmdW5jdGlvbiAoZSwgYSkgeyByZXR1cm4gdGhpcy5jcmVhdGUodGhpcy5fREVDX1hGT1JNX01PREUsIGUsIGEpIH0sIGluaXQ6IGZ1bmN0aW9uIChlLCBhLCBiKSB7IHRoaXMuY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGIpOyB0aGlzLl94Zm9ybU1vZGUgPSBlOyB0aGlzLl9rZXkgPSBhOyB0aGlzLnJlc2V0KCkgfSwgcmVzZXQ6IGZ1bmN0aW9uICgpIHsgdC5yZXNldC5jYWxsKHRoaXMpOyB0aGlzLl9kb1Jlc2V0KCkgfSwgcHJvY2VzczogZnVuY3Rpb24gKGUpIHsgdGhpcy5fYXBwZW5kKGUpOyByZXR1cm4gdGhpcy5fcHJvY2VzcygpIH0sXHJcbiAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKGUpIHsgZSAmJiB0aGlzLl9hcHBlbmQoZSk7IHJldHVybiB0aGlzLl9kb0ZpbmFsaXplKCkgfSwga2V5U2l6ZTogNCwgaXZTaXplOiA0LCBfRU5DX1hGT1JNX01PREU6IDEsIF9ERUNfWEZPUk1fTU9ERTogMiwgX2NyZWF0ZUhlbHBlcjogZnVuY3Rpb24gKGUpIHsgcmV0dXJuIHsgZW5jcnlwdDogZnVuY3Rpb24gKGIsIGssIGQpIHsgcmV0dXJuIChcInN0cmluZ1wiID09IHR5cGVvZiBrID8gYyA6IGEpLmVuY3J5cHQoZSwgYiwgaywgZCkgfSwgZGVjcnlwdDogZnVuY3Rpb24gKGIsIGssIGQpIHsgcmV0dXJuIChcInN0cmluZ1wiID09IHR5cGVvZiBrID8gYyA6IGEpLmRlY3J5cHQoZSwgYiwgaywgZCkgfSB9IH1cclxuICB9KTsgZC5TdHJlYW1DaXBoZXIgPSB2LmV4dGVuZCh7IF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9wcm9jZXNzKCEwKSB9LCBibG9ja1NpemU6IDEgfSk7IHZhciBiID0gcC5tb2RlID0ge30sIHggPSBmdW5jdGlvbiAoZSwgYSwgYikge1xyXG4gICAgdmFyIGMgPSB0aGlzLl9pdjsgYyA/IHRoaXMuX2l2ID0gdSA6IGMgPSB0aGlzLl9wcmV2QmxvY2s7IGZvciAodmFyIGQgPSAwOyBkIDwgYjsgZCsrKWVbYSArIGRdIF49XHJcbiAgICAgIGNbZF1cclxuICB9LCBxID0gKGQuQmxvY2tDaXBoZXJNb2RlID0gbC5leHRlbmQoeyBjcmVhdGVFbmNyeXB0b3I6IGZ1bmN0aW9uIChlLCBhKSB7IHJldHVybiB0aGlzLkVuY3J5cHRvci5jcmVhdGUoZSwgYSkgfSwgY3JlYXRlRGVjcnlwdG9yOiBmdW5jdGlvbiAoZSwgYSkgeyByZXR1cm4gdGhpcy5EZWNyeXB0b3IuY3JlYXRlKGUsIGEpIH0sIGluaXQ6IGZ1bmN0aW9uIChlLCBhKSB7IHRoaXMuX2NpcGhlciA9IGU7IHRoaXMuX2l2ID0gYSB9IH0pKS5leHRlbmQoKTsgcS5FbmNyeXB0b3IgPSBxLmV4dGVuZCh7IHByb2Nlc3NCbG9jazogZnVuY3Rpb24gKGUsIGEpIHsgdmFyIGIgPSB0aGlzLl9jaXBoZXIsIGMgPSBiLmJsb2NrU2l6ZTsgeC5jYWxsKHRoaXMsIGUsIGEsIGMpOyBiLmVuY3J5cHRCbG9jayhlLCBhKTsgdGhpcy5fcHJldkJsb2NrID0gZS5zbGljZShhLCBhICsgYykgfSB9KTsgcS5EZWNyeXB0b3IgPSBxLmV4dGVuZCh7XHJcbiAgICBwcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChlLCBhKSB7XHJcbiAgICAgIHZhciBiID0gdGhpcy5fY2lwaGVyLCBjID0gYi5ibG9ja1NpemUsIGQgPSBlLnNsaWNlKGEsIGEgKyBjKTsgYi5kZWNyeXB0QmxvY2soZSwgYSk7IHguY2FsbCh0aGlzLFxyXG4gICAgICAgIGUsIGEsIGMpOyB0aGlzLl9wcmV2QmxvY2sgPSBkXHJcbiAgICB9XHJcbiAgfSk7IGIgPSBiLkNCQyA9IHE7IHEgPSAocC5wYWQgPSB7fSkuUGtjczcgPSB7IHBhZDogZnVuY3Rpb24gKGEsIGIpIHsgZm9yICh2YXIgYyA9IDQgKiBiLCBjID0gYyAtIGEuc2lnQnl0ZXMgJSBjLCBkID0gYyA8PCAyNCB8IGMgPDwgMTYgfCBjIDw8IDggfCBjLCBsID0gW10sIG4gPSAwOyBuIDwgYzsgbiArPSA0KWwucHVzaChkKTsgYyA9IHMuY3JlYXRlKGwsIGMpOyBhLmNvbmNhdChjKSB9LCB1bnBhZDogZnVuY3Rpb24gKGEpIHsgYS5zaWdCeXRlcyAtPSBhLndvcmRzW2Euc2lnQnl0ZXMgLSAxID4+PiAyXSAmIDI1NSB9IH07IGQuQmxvY2tDaXBoZXIgPSB2LmV4dGVuZCh7XHJcbiAgICBjZmc6IHYuY2ZnLmV4dGVuZCh7IG1vZGU6IGIsIHBhZGRpbmc6IHEgfSksIHJlc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHYucmVzZXQuY2FsbCh0aGlzKTsgdmFyIGEgPSB0aGlzLmNmZywgYiA9IGEuaXYsIGEgPSBhLm1vZGU7IGlmICh0aGlzLl94Zm9ybU1vZGUgPT0gdGhpcy5fRU5DX1hGT1JNX01PREUpIHZhciBjID0gYS5jcmVhdGVFbmNyeXB0b3I7IGVsc2UgYyA9IGEuY3JlYXRlRGVjcnlwdG9yLCB0aGlzLl9taW5CdWZmZXJTaXplID0gMTsgdGhpcy5fbW9kZSA9IGMuY2FsbChhLFxyXG4gICAgICAgIHRoaXMsIGIgJiYgYi53b3JkcylcclxuICAgIH0sIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKGEsIGIpIHsgdGhpcy5fbW9kZS5wcm9jZXNzQmxvY2soYSwgYikgfSwgX2RvRmluYWxpemU6IGZ1bmN0aW9uICgpIHsgdmFyIGEgPSB0aGlzLmNmZy5wYWRkaW5nOyBpZiAodGhpcy5feGZvcm1Nb2RlID09IHRoaXMuX0VOQ19YRk9STV9NT0RFKSB7IGEucGFkKHRoaXMuX2RhdGEsIHRoaXMuYmxvY2tTaXplKTsgdmFyIGIgPSB0aGlzLl9wcm9jZXNzKCEwKSB9IGVsc2UgYiA9IHRoaXMuX3Byb2Nlc3MoITApLCBhLnVucGFkKGIpOyByZXR1cm4gYiB9LCBibG9ja1NpemU6IDRcclxuICB9KTsgdmFyIG4gPSBkLkNpcGhlclBhcmFtcyA9IGwuZXh0ZW5kKHsgaW5pdDogZnVuY3Rpb24gKGEpIHsgdGhpcy5taXhJbihhKSB9LCB0b1N0cmluZzogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIChhIHx8IHRoaXMuZm9ybWF0dGVyKS5zdHJpbmdpZnkodGhpcykgfSB9KSwgYiA9IChwLmZvcm1hdCA9IHt9KS5PcGVuU1NMID0ge1xyXG4gICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAoYSkge1xyXG4gICAgICB2YXIgYiA9IGEuY2lwaGVydGV4dDsgYSA9IGEuc2FsdDsgcmV0dXJuIChhID8gcy5jcmVhdGUoWzEzOTg4OTM2ODQsXHJcbiAgICAgICAgMTcwMTA3NjgzMV0pLmNvbmNhdChhKS5jb25jYXQoYikgOiBiKS50b1N0cmluZyhyKVxyXG4gICAgfSwgcGFyc2U6IGZ1bmN0aW9uIChhKSB7IGEgPSByLnBhcnNlKGEpOyB2YXIgYiA9IGEud29yZHM7IGlmICgxMzk4ODkzNjg0ID09IGJbMF0gJiYgMTcwMTA3NjgzMSA9PSBiWzFdKSB7IHZhciBjID0gcy5jcmVhdGUoYi5zbGljZSgyLCA0KSk7IGIuc3BsaWNlKDAsIDQpOyBhLnNpZ0J5dGVzIC09IDE2IH0gcmV0dXJuIG4uY3JlYXRlKHsgY2lwaGVydGV4dDogYSwgc2FsdDogYyB9KSB9XHJcbiAgfSwgYSA9IGQuU2VyaWFsaXphYmxlQ2lwaGVyID0gbC5leHRlbmQoe1xyXG4gICAgY2ZnOiBsLmV4dGVuZCh7IGZvcm1hdDogYiB9KSwgZW5jcnlwdDogZnVuY3Rpb24gKGEsIGIsIGMsIGQpIHsgZCA9IHRoaXMuY2ZnLmV4dGVuZChkKTsgdmFyIGwgPSBhLmNyZWF0ZUVuY3J5cHRvcihjLCBkKTsgYiA9IGwuZmluYWxpemUoYik7IGwgPSBsLmNmZzsgcmV0dXJuIG4uY3JlYXRlKHsgY2lwaGVydGV4dDogYiwga2V5OiBjLCBpdjogbC5pdiwgYWxnb3JpdGhtOiBhLCBtb2RlOiBsLm1vZGUsIHBhZGRpbmc6IGwucGFkZGluZywgYmxvY2tTaXplOiBhLmJsb2NrU2l6ZSwgZm9ybWF0dGVyOiBkLmZvcm1hdCB9KSB9LFxyXG4gICAgZGVjcnlwdDogZnVuY3Rpb24gKGEsIGIsIGMsIGQpIHsgZCA9IHRoaXMuY2ZnLmV4dGVuZChkKTsgYiA9IHRoaXMuX3BhcnNlKGIsIGQuZm9ybWF0KTsgcmV0dXJuIGEuY3JlYXRlRGVjcnlwdG9yKGMsIGQpLmZpbmFsaXplKGIuY2lwaGVydGV4dCkgfSwgX3BhcnNlOiBmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gXCJzdHJpbmdcIiA9PSB0eXBlb2YgYSA/IGIucGFyc2UoYSwgdGhpcykgOiBhIH1cclxuICB9KSwgcCA9IChwLmtkZiA9IHt9KS5PcGVuU1NMID0geyBleGVjdXRlOiBmdW5jdGlvbiAoYSwgYiwgYywgZCkgeyBkIHx8IChkID0gcy5yYW5kb20oOCkpOyBhID0gdy5jcmVhdGUoeyBrZXlTaXplOiBiICsgYyB9KS5jb21wdXRlKGEsIGQpOyBjID0gcy5jcmVhdGUoYS53b3Jkcy5zbGljZShiKSwgNCAqIGMpOyBhLnNpZ0J5dGVzID0gNCAqIGI7IHJldHVybiBuLmNyZWF0ZSh7IGtleTogYSwgaXY6IGMsIHNhbHQ6IGQgfSkgfSB9LCBjID0gZC5QYXNzd29yZEJhc2VkQ2lwaGVyID0gYS5leHRlbmQoe1xyXG4gICAgY2ZnOiBhLmNmZy5leHRlbmQoeyBrZGY6IHAgfSksIGVuY3J5cHQ6IGZ1bmN0aW9uIChiLCBjLCBkLCBsKSB7XHJcbiAgICAgIGwgPSB0aGlzLmNmZy5leHRlbmQobCk7IGQgPSBsLmtkZi5leGVjdXRlKGQsXHJcbiAgICAgICAgYi5rZXlTaXplLCBiLml2U2l6ZSk7IGwuaXYgPSBkLml2OyBiID0gYS5lbmNyeXB0LmNhbGwodGhpcywgYiwgYywgZC5rZXksIGwpOyBiLm1peEluKGQpOyByZXR1cm4gYlxyXG4gICAgfSwgZGVjcnlwdDogZnVuY3Rpb24gKGIsIGMsIGQsIGwpIHsgbCA9IHRoaXMuY2ZnLmV4dGVuZChsKTsgYyA9IHRoaXMuX3BhcnNlKGMsIGwuZm9ybWF0KTsgZCA9IGwua2RmLmV4ZWN1dGUoZCwgYi5rZXlTaXplLCBiLml2U2l6ZSwgYy5zYWx0KTsgbC5pdiA9IGQuaXY7IHJldHVybiBhLmRlY3J5cHQuY2FsbCh0aGlzLCBiLCBjLCBkLmtleSwgbCkgfVxyXG4gIH0pXHJcbn0oKTtcclxuKGZ1bmN0aW9uICgpIHtcclxuICBmb3IgKHZhciB1ID0gQ3J5cHRvSlMsIHAgPSB1LmxpYi5CbG9ja0NpcGhlciwgZCA9IHUuYWxnbywgbCA9IFtdLCBzID0gW10sIHQgPSBbXSwgciA9IFtdLCB3ID0gW10sIHYgPSBbXSwgYiA9IFtdLCB4ID0gW10sIHEgPSBbXSwgbiA9IFtdLCBhID0gW10sIGMgPSAwOyAyNTYgPiBjOyBjKyspYVtjXSA9IDEyOCA+IGMgPyBjIDw8IDEgOiBjIDw8IDEgXiAyODM7IGZvciAodmFyIGUgPSAwLCBqID0gMCwgYyA9IDA7IDI1NiA+IGM7IGMrKykgeyB2YXIgayA9IGogXiBqIDw8IDEgXiBqIDw8IDIgXiBqIDw8IDMgXiBqIDw8IDQsIGsgPSBrID4+PiA4IF4gayAmIDI1NSBeIDk5OyBsW2VdID0gazsgc1trXSA9IGU7IHZhciB6ID0gYVtlXSwgRiA9IGFbel0sIEcgPSBhW0ZdLCB5ID0gMjU3ICogYVtrXSBeIDE2ODQzMDA4ICogazsgdFtlXSA9IHkgPDwgMjQgfCB5ID4+PiA4OyByW2VdID0geSA8PCAxNiB8IHkgPj4+IDE2OyB3W2VdID0geSA8PCA4IHwgeSA+Pj4gMjQ7IHZbZV0gPSB5OyB5ID0gMTY4NDMwMDkgKiBHIF4gNjU1MzcgKiBGIF4gMjU3ICogeiBeIDE2ODQzMDA4ICogZTsgYltrXSA9IHkgPDwgMjQgfCB5ID4+PiA4OyB4W2tdID0geSA8PCAxNiB8IHkgPj4+IDE2OyBxW2tdID0geSA8PCA4IHwgeSA+Pj4gMjQ7IG5ba10gPSB5OyBlID8gKGUgPSB6IF4gYVthW2FbRyBeIHpdXV0sIGogXj0gYVthW2pdXSkgOiBlID0gaiA9IDEgfSB2YXIgSCA9IFswLCAxLCAyLCA0LCA4LFxyXG4gICAgMTYsIDMyLCA2NCwgMTI4LCAyNywgNTRdLCBkID0gZC5BRVMgPSBwLmV4dGVuZCh7XHJcbiAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgYSA9IHRoaXMuX2tleSwgYyA9IGEud29yZHMsIGQgPSBhLnNpZ0J5dGVzIC8gNCwgYSA9IDQgKiAoKHRoaXMuX25Sb3VuZHMgPSBkICsgNikgKyAxKSwgZSA9IHRoaXMuX2tleVNjaGVkdWxlID0gW10sIGogPSAwOyBqIDwgYTsgaisrKWlmIChqIDwgZCkgZVtqXSA9IGNbal07IGVsc2UgeyB2YXIgayA9IGVbaiAtIDFdOyBqICUgZCA/IDYgPCBkICYmIDQgPT0gaiAlIGQgJiYgKGsgPSBsW2sgPj4+IDI0XSA8PCAyNCB8IGxbayA+Pj4gMTYgJiAyNTVdIDw8IDE2IHwgbFtrID4+PiA4ICYgMjU1XSA8PCA4IHwgbFtrICYgMjU1XSkgOiAoayA9IGsgPDwgOCB8IGsgPj4+IDI0LCBrID0gbFtrID4+PiAyNF0gPDwgMjQgfCBsW2sgPj4+IDE2ICYgMjU1XSA8PCAxNiB8IGxbayA+Pj4gOCAmIDI1NV0gPDwgOCB8IGxbayAmIDI1NV0sIGsgXj0gSFtqIC8gZCB8IDBdIDw8IDI0KTsgZVtqXSA9IGVbaiAtIGRdIF4gayB9IGMgPSB0aGlzLl9pbnZLZXlTY2hlZHVsZSA9IFtdOyBmb3IgKGQgPSAwOyBkIDwgYTsgZCsrKWogPSBhIC0gZCwgayA9IGQgJSA0ID8gZVtqXSA6IGVbaiAtIDRdLCBjW2RdID0gNCA+IGQgfHwgNCA+PSBqID8gayA6IGJbbFtrID4+PiAyNF1dIF4geFtsW2sgPj4+IDE2ICYgMjU1XV0gXiBxW2xbayA+Pj5cclxuICAgICAgICAgIDggJiAyNTVdXSBeIG5bbFtrICYgMjU1XV1cclxuICAgICAgfSwgZW5jcnlwdEJsb2NrOiBmdW5jdGlvbiAoYSwgYikgeyB0aGlzLl9kb0NyeXB0QmxvY2soYSwgYiwgdGhpcy5fa2V5U2NoZWR1bGUsIHQsIHIsIHcsIHYsIGwpIH0sIGRlY3J5cHRCbG9jazogZnVuY3Rpb24gKGEsIGMpIHsgdmFyIGQgPSBhW2MgKyAxXTsgYVtjICsgMV0gPSBhW2MgKyAzXTsgYVtjICsgM10gPSBkOyB0aGlzLl9kb0NyeXB0QmxvY2soYSwgYywgdGhpcy5faW52S2V5U2NoZWR1bGUsIGIsIHgsIHEsIG4sIHMpOyBkID0gYVtjICsgMV07IGFbYyArIDFdID0gYVtjICsgM107IGFbYyArIDNdID0gZCB9LCBfZG9DcnlwdEJsb2NrOiBmdW5jdGlvbiAoYSwgYiwgYywgZCwgZSwgaiwgbCwgZikge1xyXG4gICAgICAgIGZvciAodmFyIG0gPSB0aGlzLl9uUm91bmRzLCBnID0gYVtiXSBeIGNbMF0sIGggPSBhW2IgKyAxXSBeIGNbMV0sIGsgPSBhW2IgKyAyXSBeIGNbMl0sIG4gPSBhW2IgKyAzXSBeIGNbM10sIHAgPSA0LCByID0gMTsgciA8IG07IHIrKyl2YXIgcSA9IGRbZyA+Pj4gMjRdIF4gZVtoID4+PiAxNiAmIDI1NV0gXiBqW2sgPj4+IDggJiAyNTVdIF4gbFtuICYgMjU1XSBeIGNbcCsrXSwgcyA9IGRbaCA+Pj4gMjRdIF4gZVtrID4+PiAxNiAmIDI1NV0gXiBqW24gPj4+IDggJiAyNTVdIF4gbFtnICYgMjU1XSBeIGNbcCsrXSwgdCA9XHJcbiAgICAgICAgICBkW2sgPj4+IDI0XSBeIGVbbiA+Pj4gMTYgJiAyNTVdIF4galtnID4+PiA4ICYgMjU1XSBeIGxbaCAmIDI1NV0gXiBjW3ArK10sIG4gPSBkW24gPj4+IDI0XSBeIGVbZyA+Pj4gMTYgJiAyNTVdIF4galtoID4+PiA4ICYgMjU1XSBeIGxbayAmIDI1NV0gXiBjW3ArK10sIGcgPSBxLCBoID0gcywgayA9IHQ7IHEgPSAoZltnID4+PiAyNF0gPDwgMjQgfCBmW2ggPj4+IDE2ICYgMjU1XSA8PCAxNiB8IGZbayA+Pj4gOCAmIDI1NV0gPDwgOCB8IGZbbiAmIDI1NV0pIF4gY1twKytdOyBzID0gKGZbaCA+Pj4gMjRdIDw8IDI0IHwgZltrID4+PiAxNiAmIDI1NV0gPDwgMTYgfCBmW24gPj4+IDggJiAyNTVdIDw8IDggfCBmW2cgJiAyNTVdKSBeIGNbcCsrXTsgdCA9IChmW2sgPj4+IDI0XSA8PCAyNCB8IGZbbiA+Pj4gMTYgJiAyNTVdIDw8IDE2IHwgZltnID4+PiA4ICYgMjU1XSA8PCA4IHwgZltoICYgMjU1XSkgXiBjW3ArK107IG4gPSAoZltuID4+PiAyNF0gPDwgMjQgfCBmW2cgPj4+IDE2ICYgMjU1XSA8PCAxNiB8IGZbaCA+Pj4gOCAmIDI1NV0gPDwgOCB8IGZbayAmIDI1NV0pIF4gY1twKytdOyBhW2JdID0gcTsgYVtiICsgMV0gPSBzOyBhW2IgKyAyXSA9IHQ7IGFbYiArIDNdID0gblxyXG4gICAgICB9LCBrZXlTaXplOiA4XHJcbiAgICB9KTsgdS5BRVMgPSBwLl9jcmVhdGVIZWxwZXIoZClcclxufSkoKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ3J5cHRvSlM7IiwiaW1wb3J0IHsgcmVxdWVzdERhdGEgfSBmcm9tIFwiLi4vTmV0L0h0dHBVbml0XCI7XHJcbmltcG9ydCBBcHBfbXlxcV9Db25maWcgZnJvbSBcIi4uL0FwcENvbmZpZ1wiO1xyXG5pbXBvcnQgVXNlcl95eSBmcm9tIFwiLi4vVXNlci9Vc2VyXCI7XHJcbmltcG9ydCBVdGlsaXQgZnJvbSBcIi4uL1V0aWxpdFwiO1xyXG5pbXBvcnQgQUxEIGZyb20gXCIuLi9BTERcIjtcclxuaW1wb3J0IFdYQVBJIGZyb20gXCIuLi9XWEFQSVwiO1xyXG5pbXBvcnQgRXZlbnRfbXlxcV9NZ3IgZnJvbSBcIi4uL0V2ZW50L0V2ZW50TWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50RGVmIH0gZnJvbSBcIi4uL0V2ZW50L0V2ZW50RGVmXCI7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFyZV9teXFxX0FkIFxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG1haW5VcmwgPSBcIlwiO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBnZXRBZFBvc3Rpb24gPSBcIlwiOy8v6I635Y+W5bm/5ZGK5L2N5YiX6KGoXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdldEFkdiA9IFwiXCI7Ly/ojrflj5bnrKzkuInmlrnlub/lkYrliJfooahcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgdXNlckNsaWNrID0gXCJcIjsvL+eUqOaIt+eCueWHu+S4iuaKpVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTG9vcEFkTG9jYXRpb25JRCA9IDEyNTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQmFubmVyQWRMb2NhdGlvbklEID0gMTI3O1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBJbnNlcnRBZExvY2F0aW9uSUQgPSAxMjY7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEFuaUFkTG9jYXRpb25JRCA9IDEyODtcclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBVc2VSYW5kb21BZFBvcyA6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBBZExvY2F0aW9uaWRzIDogQXJyYXk8bnVtYmVyPiA9IFxyXG4gICAgW1xyXG4gICAgICAgIDEyNSwgMTI2XHJcbiAgICBdXHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBfYWRQb3NpdGlvbiA6IGFueSA9IHt9XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9hZHYgOiBhbnkgPSB7fVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgX2lwaG9uZUlnbm9yZUFwcElkcyA9IFxyXG4gICAgW1xyXG4gICAgXVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVmcmVzaF9teXFxX0FkKGNvbXBsYXRlIDogRnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU2hhcmVfbXlxcV9BZC5nZXRBZFBvc0RhdGEoKHJlcyk9PntcclxuICAgICAgICAvLyAgICAgaWYoMSA9PSByZXMuY29kZSlcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCLojrflj5bliIbkuqvlub/lkYrmlbDmja7miJDlip9cIik7XHJcbiAgICAgICAgLy8gICAgICAgICBTaGFyZV9teXFxX0FkLl9hZFBvc2l0aW9uID0gcmVzLnJlc3VsdDtcclxuICAgICAgICAvLyAgICAgICAgIGlmKGNvbXBsYXRlKVxyXG4gICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbXBsYXRlKHRydWUpXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgZWxzZVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluWIhuS6q+W5v+WRiuaVsOaNruWksei0pSDvvJogXCIgKyByZXMubXNnKTtcclxuICAgICAgICAvLyAgICAgICAgIGlmKGNvbXBsYXRlKVxyXG4gICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbXBsYXRlKGZhbHNlKVxyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSwocmVzKT0+e1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluWIhuS6q+W5v+WRiuaVsOaNruWksei0pVwiKTtcclxuICAgICAgICAvLyAgICAgaWYoY29tcGxhdGUpXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIGNvbXBsYXRlKGZhbHNlKVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldF9teXFxX0FEVnMobG9jYXRpb25pZCxjb21wbGF0ZSA6IEZ1bmN0aW9uLHVzZVJhbmRvbT8gOiBib29sZWFuLHVzZUxvY2FsUmFuZG9tPyA6IGJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgLy8gdXNlUmFuZG9tID0gbnVsbCA9PSB1c2VSYW5kb20gPyBTaGFyZV9teXFxX0FkLlVzZVJhbmRvbUFkUG9zIDogdXNlUmFuZG9tO1xyXG4gICAgICAgIC8vIHVzZUxvY2FsUmFuZG9tID0gIG51bGwgPT0gdXNlTG9jYWxSYW5kb20gPyB0cnVlIDogdXNlUmFuZG9tO1xyXG4gICAgICAgIC8vIGlmKHVzZVJhbmRvbSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGxvY2F0aW9uaWQgPSBTaGFyZV9teXFxX0FkLmdldF9teXFxX1JhbmRvbUFEUG9zSUQoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdmFyIGRhdGFzID0gU2hhcmVfbXlxcV9BZC5fYWR2W2xvY2F0aW9uaWRdO1xyXG4gICAgICAgIC8vIGlmKGRhdGFzKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgZm9yICh2YXIgaSA9IGRhdGFzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSAgXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIHZhciByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGRhdGFzLmxlbmd0aCk7XHJcbiAgICAgICAgLy8gICAgICAgICB2YXIgY3VyVmFsdWUgPSBkYXRhc1tpXTtcclxuICAgICAgICAvLyAgICAgICAgIHZhciByYW5kb21WYWx1ZSA9IGRhdGFzW3JhbmRvbUluZGV4XTtcclxuICAgICAgICAvLyAgICAgICAgIGRhdGFzW3JhbmRvbUluZGV4XSA9IGN1clZhbHVlO1xyXG4gICAgICAgIC8vICAgICAgICAgZGF0YXNbaV0gPSByYW5kb21WYWx1ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBjb21wbGF0ZShkYXRhcylcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgU2hhcmVfbXlxcV9BZC5nZXRBRFZEYXRhKGxvY2F0aW9uaWQsKHJlcyk9PlxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBpZigxID09IHJlcy5jb2RlKVxyXG4gICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIFNoYXJlX215cXFfQWQuX2Fkdltsb2NhdGlvbmlkXSA9IHJlcy5yZXN1bHQ7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgZGF0YXMgPSBTaGFyZV9teXFxX0FkLl9hZHZbbG9jYXRpb25pZF07XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYoZGF0YXMgJiYgVXRpbGl0LmlzSXBob25lKCkpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBmb3IodmFyIGk9MDtpPCBkYXRhcy5sZW5ndGg7KytpKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGRhdGFzW2ldO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBqPTA7aiA8IFNoYXJlX215cXFfQWQuX2lwaG9uZUlnbm9yZUFwcElkcy5sZW5ndGg7KytqKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuYXBwaWQgPT0gU2hhcmVfbXlxcV9BZC5faXBob25lSWdub3JlQXBwSWRzW2pdKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YXMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0taTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGlmKGRhdGFzICYmIHVzZUxvY2FsUmFuZG9tKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IGRhdGFzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSAgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHZhciByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGRhdGFzLmxlbmd0aCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB2YXIgY3VyVmFsdWUgPSBkYXRhc1tpXTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHZhciByYW5kb21WYWx1ZSA9IGRhdGFzW3JhbmRvbUluZGV4XTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGRhdGFzW3JhbmRvbUluZGV4XSA9IGN1clZhbHVlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgZGF0YXNbaV0gPSByYW5kb21WYWx1ZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICBpZihjb21wbGF0ZSlcclxuICAgICAgICAvLyAgICAgICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbXBsYXRlKGRhdGFzKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICBlbHNlXHJcbiAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYoY29tcGxhdGUpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb21wbGF0ZShudWxsKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0sKHJlcyk9PlxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBpZihjb21wbGF0ZSlcclxuICAgICAgICAvLyAgICAgICAgIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICBjb21wbGF0ZShudWxsKTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZXBvcnRVc2VyQ2xpY2soYWR2aWQpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gU2hhcmVfbXlxcV9BZC5yZXFVc2VyQ2xpY2soYWR2aWQsKHJlcyk9PlxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgaWYoMSA9PSByZXMuY29kZSlcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCLngrnlh7vlub/lkYrkuIrmiqXmiJDlip9cIik7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgZWxzZVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIueCueWHu+W5v+WRiuS4iuaKpeWksei0pVwiKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0sKHJlcyk9PlxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCLngrnlh7vlub/lkYrkuIrmiqXlpLHotKVcIik7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRfbXlxcV9SYW5kb21BRFBvc0lEKCkgOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gU2hhcmVfbXlxcV9BZC5BZExvY2F0aW9uaWRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIFNoYXJlX215cXFfQWQuQWRMb2NhdGlvbmlkcy5sZW5ndGgpXVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgcmVxdWVzdChyZXEgOiByZXF1ZXN0RGF0YSkge1xyXG4gICAgICAgIC8vIGlmIChyZXEudXJsLmluZGV4T2YoXCJodHRwczovL1wiKSA+IC0xIHx8XHJcbiAgICAgICAgLy8gICAgIHJlcS51cmwuaW5kZXhPZihcImh0dHA6Ly9cIikgPiAtMSkge1xyXG4gICAgICAgIC8vICAgICByZXEudXJsID0gcmVxLnVybDtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICByZXEudXJsID0gU2hhcmVfbXlxcV9BZC5tYWluVXJsICsgcmVxLnVybDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdmFyIGNvbXBsZXRlRnVuYyA9IChyZXMpID0+IHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2cocmVzLFwiaHR0cCBTdWNjZXNzXCIpXHJcbiAgICAgICAgLy8gICAgIHJlcyA9IEpTT04ucGFyc2UocmVzKTtcclxuICAgICAgICAvLyAgICAgaWYgKHJlcS5vblN1Y2Nlc3MpIHtcclxuICAgICAgICAvLyAgICAgICAgIHJlcS5vblN1Y2Nlc3MocmVzKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICByZXEub25TdWNjZXNzID0gbnVsbDtcclxuICAgICAgICAvLyAgICAgcmVxID0gbnVsbDtcclxuICAgICAgICAvLyB9O1xyXG4gICAgICAgIC8vIHZhciBlcnJvckZ1bmMgPSAocmVzKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHJlcyxcImh0dHAgZmFpbFwiKVxyXG4gICAgICAgIC8vICAgICBpZiAocmVxLm9uRmFpbCkgIHtcclxuICAgICAgICAvLyAgICAgICAgIHJlcS5vbkZhaWwocmVzKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICByZXEub25GYWlsID0gbnVsbDtcclxuICAgICAgICAvLyAgICAgcmVxID0gbnVsbDtcclxuICAgICAgICAvLyB9O1xyXG5cclxuICAgICAgICAvLyB2YXIgeGhyOiBMYXlhLkh0dHBSZXF1ZXN0ID0gbmV3IExheWEuSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAvLyB4aHIub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLCBTaGFyZV9teXFxX0FkLCBjb21wbGV0ZUZ1bmMpO1xyXG4gICAgICAgIC8vIHhoci5vbmNlKExheWEuRXZlbnQuRVJST1IsIFNoYXJlX215cXFfQWQsIGVycm9yRnVuYyk7XHJcblxyXG5cclxuICAgICAgICAvLyBpZihyZXEubWV0aCA9PSBcImdldFwiKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdmFyIHBhcmEgPSBcIlwiO1xyXG4gICAgICAgIC8vICAgICBmb3IoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHJlcS5kYXRhKSkgXHJcbiAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAvLyAgICAgICAgIHZhciB2YWx1ZSA9IHJlcS5kYXRhW2tleV07XHJcbiAgICAgICAgLy8gICAgICAgICBwYXJhICs9ICBrZXkgKyBcIj1cIiArIHZhbHVlICsgXCImXCI7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgcmVxLnVybCA9IHJlcS51cmwgKyBcIj9cIiArIHBhcmE7XHJcbiAgICAgICAgLy8gICAgIHZhciBoZWFkZXIgPVxyXG4gICAgICAgIC8vICAgICAgICAgW1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIFwidmVyc2lvbnNcIiwgQXBwX215cXFfQ29uZmlnLlZlcnNpb25zLFxyXG4gICAgICAgIC8vICAgICAgICAgXVxyXG4gICAgICAgIC8vICAgICB4aHIuc2VuZChyZXEudXJsLG51bGwscmVxLm1ldGgsbnVsbCxoZWFkZXIpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB2YXIgcGFyYSA9IFwiXCI7XHJcbiAgICAgICAgLy8gICAgIGZvcihjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocmVxLmRhdGEpKSBcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgdmFyIHZhbHVlID0gcmVxLmRhdGFba2V5XTtcclxuICAgICAgICAvLyAgICAgICAgIHBhcmEgKz0gIGtleSArIFwiPVwiICsgdmFsdWUgKyBcIiZcIjtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICB2YXIgaGVhZGVyID1cclxuICAgICAgICAvLyAgICAgICAgIFtcclxuICAgICAgICAvLyAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIFwidmVyc2lvbnNcIiwgQXBwX215cXFfQ29uZmlnLlZlcnNpb25zLFxyXG4gICAgICAgIC8vICAgICAgICAgXVxyXG4gICAgICAgIC8vICAgICB4aHIuc2VuZChyZXEudXJsLHBhcmEscmVxLm1ldGgsbnVsbCxoZWFkZXIpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGdldEFkUG9zRGF0YShvblN1Y2Nlc3MgOiBGdW5jdGlvbixvbkZhaWwgOiBGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICAvLyB2YXIgcmVxID0gbmV3IHJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgLy8gcmVxLnVybCA9IFNoYXJlX215cXFfQWQuZ2V0QWRQb3N0aW9uO1xyXG4gICAgICAgIC8vIHJlcS5vblN1Y2Nlc3MgPSBvblN1Y2Nlc3M7XHJcbiAgICAgICAgLy8gcmVxLm9uRmFpbCA9IG9uRmFpbDtcclxuICAgICAgICAvLyByZXEuZGF0YS5zb2Z0aWQgPSBBcHBfbXlxcV9Db25maWcuQXBwSUQ7XHJcbiAgICAgICAgLy8gcmVxLm1ldGggPSBcImdldFwiO1xyXG4gICAgICAgIC8vIFNoYXJlX215cXFfQWQucmVxdWVzdChyZXEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgcmVxVXNlckNsaWNrKGFkdmlkLG9uU3VjY2VzcyA6IEZ1bmN0aW9uLG9uRmFpbCA6IEZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIC8vIHZhciByZXEgPSBuZXcgcmVxdWVzdERhdGEoKTtcclxuICAgICAgICAvLyByZXEudXJsID0gU2hhcmVfbXlxcV9BZC51c2VyQ2xpY2s7XHJcbiAgICAgICAgLy8gcmVxLm9uU3VjY2VzcyA9IG9uU3VjY2VzcztcclxuICAgICAgICAvLyByZXEub25GYWlsID0gb25GYWlsO1xyXG5cclxuICAgICAgICAvLyByZXEuZGF0YS5zb2Z0aWQgPSBBcHBfbXlxcV9Db25maWcuQXBwSUQ7XHJcbiAgICAgICAgLy8gcmVxLmRhdGEudWlkICA9IFVzZXJfeXkub3BlbklkO1xyXG4gICAgICAgIC8vIHJlcS5kYXRhLmFkdmlkICA9IGFkdmlkIDtcclxuXHJcbiAgICAgICAgLy8gU2hhcmVfbXlxcV9BZC5yZXF1ZXN0KHJlcSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBnZXRBRFZEYXRhKGxvY2F0aW9uaWQsb25TdWNjZXNzIDogRnVuY3Rpb24sb25GYWlsIDogRnVuY3Rpb24pXHJcbiAgICB7XHJcbiAgICAgICAgLy8gdmFyIHJlcSA9IG5ldyByZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgIC8vIHJlcS51cmwgPSBTaGFyZV9teXFxX0FkLmdldEFkdjtcclxuICAgICAgICAvLyByZXEub25TdWNjZXNzID0gb25TdWNjZXNzO1xyXG4gICAgICAgIC8vIHJlcS5vbkZhaWwgPSBvbkZhaWw7XHJcbiAgICAgICAgLy8gcmVxLmRhdGEuc29mdGlkID0gQXBwX215cXFfQ29uZmlnLkFwcElEO1xyXG4gICAgICAgIC8vIHJlcS5kYXRhLmxvY2F0aW9uaWQgPSBsb2NhdGlvbmlkO1xyXG4gICAgICAgIC8vIHJlcS5kYXRhLnByZXZpZXcgPSAwO1xyXG4gICAgICAgIC8vIFNoYXJlX215cXFfQWQucmVxdWVzdChyZXEpO1xyXG4gICAgfVxyXG5cclxuXHJcbi8qKlxyXG4gICAgICog6ZqP5py66Lez6L2s55qE5pa55rOV77yM5Lya5LuO5bm/5ZGK5YiX6KGo5Lit6ZqP5py65b6X5Yiw5LiA5LiqQXBwSWTlubbkuJTot7Povaws6L6T5YWl55qE5Y+C5pWw5Li65qaC546H77yM5aSn5bCP5ZyoMC0x5LmL6Ze0XHJcbiAgICAgKiDlpoLmnpzmpoLnjoflpKfkuo4x77yM5YiZ6Ieq5Yqo5bCG5YW26Zmk5LulMTAw77yM5omA5Lul5Y2D5LiH5rOo5oSP77yBXHJcbiAgICAgKiBcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbcmF0ZT0xXSBcclxuICAgICAqIEBtZW1iZXJvZiBTaGFyZUFkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgUmFuZG9tX215cXFfSnVtcChyYXRlOiBudW1iZXIgPSAxKSBcclxuICAgIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIumaj+acuui3s+i9rCxyYXRl77yaXCIgKyByYXRlKTtcclxuICAgICAgICAvLyBpZiAocmF0ZSA+IDEpIHtcclxuICAgICAgICAvLyAgICAgcmF0ZSA9IHJhdGUgLyAxMDA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGxldCByZCA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgLy8gaWYgKHJkIDw9IHJhdGUpIHtcclxuICAgICAgICAvLyAgICAgdmFyIGFkTG9jYXRpb25JRCA9IFNoYXJlX215cXFfQWQuTG9vcEFkTG9jYXRpb25JRDtcclxuICAgICAgICAvLyAgICAgdmFyIExvY2F0aW9ucyA9IFxyXG4gICAgICAgIC8vICAgICBbXHJcbiAgICAgICAgLy8gICAgICAgICBTaGFyZV9teXFxX0FkLkxvb3BBZExvY2F0aW9uSUQsIFxyXG4gICAgICAgIC8vICAgICAgICAgU2hhcmVfbXlxcV9BZC5JbnNlcnRBZExvY2F0aW9uSUQsIFxyXG4gICAgICAgIC8vICAgICAgICAgU2hhcmVfbXlxcV9BZC5CYW5uZXJBZExvY2F0aW9uSUQsXHJcbiAgICAgICAgLy8gICAgICAgICBTaGFyZV9teXFxX0FkLkFuaUFkTG9jYXRpb25JRCxcclxuICAgICAgICAvLyAgICAgXVxyXG4gICAgICAgIC8vICAgICBpZihTaGFyZV9teXFxX0FkLlVzZVJhbmRvbUFkUG9zKVxyXG4gICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICBmb3IodmFyIGk9MDtpIDwgU2hhcmVfbXlxcV9BZC5BZExvY2F0aW9uaWRzLmxlbmd0aDsrK2kpXHJcbiAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgTG9jYXRpb25zLnB1c2goU2hhcmVfbXlxcV9BZC5BZExvY2F0aW9uaWRzW2ldKTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBhZExvY2F0aW9uSUQgPSBMb2NhdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTG9jYXRpb25zLmxlbmd0aCldXHJcbiAgICAgICAgLy8gICAgIHZhciBkYXRhcyA9IFNoYXJlX215cXFfQWQuZ2V0X215cXFfQURWcyhhZExvY2F0aW9uSUQsIGZ1bmN0aW9uIChkYXRhczogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIC8vICAgICAgICAgaWYgKGRhdGFzKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IHJkID0gTWF0aC5mbG9vcihkYXRhcy5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgZGF0YSA9IGRhdGFzW3JkXTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOa4uOaIj++8miBcIiArIGRhdGEudGl0bGUpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIFdYQVBJLm5hdmlnYXRlVG9NaW5pUHJvZ3JhbShkYXRhLmFwcGlkLCBkYXRhLnVybCwgKHJlcykgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOaIkOWKn1wiKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBTaGFyZV9teXFxX0FkLnJlcG9ydFVzZXJDbGljayhkYXRhLmFwcGlkKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgQUxELmFsZFNlbmRSZXBvcnRBZENsaWNrU3VjY2VzcyhkYXRhKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9LCAocmVzKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L2s5aSx6LSlXCIpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkFEX09uU2hhcmVBZEZhaWwpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZiAocmVzLmVyck1zZyA9PSBcIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbTpmYWlsIGNhbmNlbFwiKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueUqOaIt+WPlua2iOi3s+i9rFwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIEFMRC5hbGRTZW5kUmVwb3J0QWRDbGlja0ZhaWwoZGF0YSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICB9LCAocmVzKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L2s5a6M5oiQXCIpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0sIHRydWUpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxufSIsImltcG9ydCBTaGFyZV9teXFxX0FkIGZyb20gXCIuLi9TaGFyZUFkXCI7XHJcbmltcG9ydCBXWEFQSSBmcm9tIFwiLi4vLi4vV1hBUElcIjtcclxuaW1wb3J0IEFMRCBmcm9tIFwiLi4vLi4vQUxEXCI7XHJcbmltcG9ydCBFdmVudF9teXFxX01nciBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnRNZ3JcIjtcclxuaW1wb3J0IHsgRXZlbnREZWYgfSBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnREZWZcIjtcclxuaW1wb3J0IEFwcFN3aXRjaENvbmZpZyBmcm9tIFwiLi4vLi4vQ29uZmlnL0FwcFN3aXRjaENvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFubmVyX215cXFfQWRWaWV3IGV4dGVuZHMgTGF5YS5TY3JpcHQgXHJcbntcclxuICAgIHB1YmxpYyBBZFBvc0lEIDogbnVtYmVyID0gU2hhcmVfbXlxcV9BZC5CYW5uZXJBZExvY2F0aW9uSUQ7XHJcbiAgICBwcm90ZWN0ZWQgX2Rpc3BsYXlTcCA6IExheWEuU3ByaXRlO1xyXG4gICAgcHJvdGVjdGVkIF9kYXRhIDogYW55ID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgV1hCYW5uZXJXaWR0aCA6IG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBfd3hCYW5uZXIgOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIG9uQXdha2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlTcCA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJEaXNwbGF5XCIpIGFzIExheWEuU3ByaXRlO1xyXG4gICAgICAgIGlmKG51bGwgPT0gdGhpcy5fZGlzcGxheVNwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fZGlzcGxheVNwID0gdGhpcy5vd25lciBhcyBMYXlhLlNwcml0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uRW5hYmxlKCk6IHZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fZGlzcGxheVNwLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcyx0aGlzLm9uU3BDbGljayk7XHJcbiAgICAgICAgdmFyIGJhbm5lciA9IEFwcFN3aXRjaENvbmZpZy5nZXRJbnN0YW5jZSgpLmdldEFwcFN3aXRjaERhdGEoKS5iYW5uZXI7XHJcbiAgICAgICAgaWYoMCA9PSBiYW5uZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hCYW5uZXJEaXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoMSA9PSBiYW5uZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hXWEJhbm5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCBcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5U3Aub2ZmKExheWEuRXZlbnQuQ0xJQ0ssdGhpcyx0aGlzLm9uU3BDbGljayk7XHJcbiAgICAgICAgdGhpcy5jbGVhcldYQmFuZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVmcmVzaEJhbm5lckRpcygpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIFNoYXJlX215cXFfQWQuZ2V0X215cXFfQURWcyh0aGlzLkFkUG9zSUQsKGRhdGFzKT0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihkYXRhcyAmJiBkYXRhcy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGRhdGFzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGRhdGFzLmxlbmd0aCldO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuX2Rpc3BsYXlTcC5sb2FkSW1hZ2UoZGF0YS5sb2dvLExheWEuSGFuZGxlci5jcmVhdGUoc2VsZixmdW5jdGlvbigpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNlbGYuX2Rpc3BsYXlTcC5kZXN0cm95ZWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9kaXNwbGF5U3Aud2lkdGggPSA3NTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2Rpc3BsYXlTcC5oZWlnaHQgPSAzNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LGZhbHNlKVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblNwQ2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcclxuICAgICAgICBpZihkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazmuLjmiI/vvJogXCIgKyBkYXRhLnRpdGxlKTtcclxuICAgICAgICAgICAgV1hBUEkubmF2aWdhdGVUb01pbmlQcm9ncmFtKGRhdGEuYXBwaWQsZGF0YS51cmwsKHJlcyk9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOaIkOWKn1wiKVxyXG4gICAgICAgICAgICAgICAgU2hhcmVfbXlxcV9BZC5yZXBvcnRVc2VyQ2xpY2soZGF0YS5hcHBpZCk7XHJcbiAgICAgICAgICAgICAgICBBTEQuYWxkU2VuZFJlcG9ydEFkQ2xpY2tTdWNjZXNzKGRhdGEpO1xyXG4gICAgICAgICAgICB9LChyZXMpPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazlpLHotKVcIilcclxuICAgICAgICAgICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkFEX09uU2hhcmVBZEZhaWwpO1xyXG4gICAgICAgICAgICAgICAgaWYocmVzLmVyck1zZyA9PSBcIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbTpmYWlsIGNhbmNlbFwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55So5oi35Y+W5raI6Lez6L2sXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEFMRC5hbGRTZW5kUmVwb3J0QWRDbGlja0ZhaWwoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sKHJlcyk9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOWujOaIkFwiKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hXWEJhbm5lcigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUxheWEuQnJvd3Nlci5vbk1pbmlHYW1lIHx8ICEodGhpcy5vd25lciBhcyBMYXlhLlNwcml0ZSkudmlzaWJsZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY2xlYXJXWEJhbmVyKCk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciBzeXNJbmZvID0gTGF5YS5Ccm93c2VyLndpbmRvd1tcInd4XCJdLmdldFN5c3RlbUluZm9TeW5jKCk7XHJcbiAgICAgICAgdmFyIHN3ID0gc3lzSW5mby5zY3JlZW5XaWR0aDtcclxuICAgICAgICB2YXIgc2ggPSBzeXNJbmZvLnNjcmVlbkhlaWdodDtcclxuICAgICAgICB2YXIgcG9zID0gdGhpcy5fZGlzcGxheVNwLmxvY2FsVG9HbG9iYWwobmV3IExheWEuUG9pbnQoMCwwKSlcclxuXHJcbiAgICAgICAgdmFyIGxlZnQgPSBwb3MueCAvIExheWEuc3RhZ2Uud2lkdGggKiBzdztcclxuICAgICAgICB2YXIgdG9wID0gcG9zLnkgLyBMYXlhLnN0YWdlLmhlaWdodCAqIHNoO1xyXG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuV1hCYW5uZXJXaWR0aCA/IHRoaXMuV1hCYW5uZXJXaWR0aCAvIExheWEuc3RhZ2Uud2lkdGggKiBzdyA6IHN3O1xyXG5cclxuICAgICAgICB0aGlzLl93eEJhbm5lciA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5jcmVhdGVCYW5uZXJBZChcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYWRVbml0SWQgOiBXWEFQSS5iYW5uZXJBZFVuaXRJZCxcclxuICAgICAgICAgICAgICAgIGFkSW50ZXJ2YWxzIDogMzAsXHJcbiAgICAgICAgICAgICAgICBzdHlsZSA6IFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6bGVmdCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6dG9wLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgc2VsZi5fd3hCYW5uZXIub25Mb2FkKChyZXMpID0+ICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV1hCYW5uZXLlub/lkYog5Yqg6L295a6M5oiQXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5fd3hCYW5uZXIub25FcnJvcigoZXJyKSA9PiAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldYQmFubmVy5bm/5ZGKIOWKoOi9veWksei0pVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgc2VsZi5yZWZyZXNoQmFubmVyRGlzKCk7XHJcbiAgICAgICAgICAgIHNlbGYuY2xlYXJXWEJhbmVyKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLl93eEJhbm5lci5vblJlc2l6ZShyZXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLl93eEJhbm5lci5zdHlsZS5yZWFsV2lkdGgsIHNlbGYuX3d4QmFubmVyLnN0eWxlLnJlYWxIZWlnaHQpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgc2VsZi5fd3hCYW5uZXIuc2hvdygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgY2xlYXJXWEJhbmVyKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl93eEJhbm5lcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3d4QmFubmVyLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fd3hCYW5uZXIgPSBudWxsO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFNoYXJlX215cXFfQWQgZnJvbSBcIi4uL1NoYXJlQWRcIjtcclxuaW1wb3J0IExvb3BfbXlxcV9BZEJveCBmcm9tIFwiLi9Mb29wQWRCb3hcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvcml6b250YWxMb29wQWRWaWV3IGV4dGVuZHMgTGF5YS5TY3JpcHQge1xyXG4gICAgcHVibGljIEFkUG9zSUQ6IG51bWJlciA9IFNoYXJlX215cXFfQWQuTG9vcEFkTG9jYXRpb25JRDtcclxuICAgIHByb3RlY3RlZCBfbGlzdDogTGF5YS5MaXN0O1xyXG4gICAgcHJvdGVjdGVkIF9zY3JvbGxGb3J3YXJkID0gdHJ1ZTtcclxuXHJcbiAgICBvbkF3YWtlKCkgIHtcclxuICAgICAgICB0aGlzLl9saXN0ID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIkxpc3RcIikgYXMgTGF5YS5MaXN0O1xyXG4gICAgICAgIHRoaXMuX2xpc3QucmVuZGVySGFuZGxlciA9IExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbl9teXFxX0xpc3RSZW5kZXIsIG51bGwsIGZhbHNlKVxyXG4gICAgICAgIHRoaXMuX2xpc3QuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBTaGFyZV9teXFxX0FkLmdldF9teXFxX0FEVnModGhpcy5BZFBvc0lELCAoZGF0YXMpID0+ICB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLm93bmVyICYmICFzZWxmLm93bmVyLmRlc3Ryb3llZCkgIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhcyAmJiBkYXRhcy5sZW5ndGggPiAwICYmIGRhdGFzLmxlbmd0aCA8IDUwKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gW11cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1MDsgKytpKSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlciA+PSBkYXRhcy5sZW5ndGgpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wLnB1c2goZGF0YXNbY291bnRlcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK2NvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBMZW4gPSBkYXRhcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wLmxlbmd0aDsgKytpKSBcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncm91cCA9IE1hdGguZmxvb3IoaSAvIGdyb3VwTGVuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0SW5kZXggPSBncm91cCAqIGdyb3VwTGVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBncm91cExlbikgKyBzdGFydEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VyVmFsdWUgPSB0ZW1wW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZG9tVmFsdWUgPSB0ZW1wW3JhbmRvbUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFtyYW5kb21JbmRleF0gPSBjdXJWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFtpXSA9IHJhbmRvbVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9saXN0LmFycmF5ID0gdGVtcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3QuYXJyYXkgPSBkYXRhcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpICB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Njcm9sbEZvcndhcmQpICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3Quc2Nyb2xsQmFyLnZhbHVlICs9IDEwMCAqIExheWEudGltZXIuZGVsdGEgLyAxMDAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGlzdC5zY3JvbGxCYXIudmFsdWUgPj0gdGhpcy5fbGlzdC5zY3JvbGxCYXIubWF4KSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRm9yd2FyZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgIHtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdC5zY3JvbGxCYXIudmFsdWUgLT0gMTAwICogTGF5YS50aW1lci5kZWx0YSAvIDEwMDA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9saXN0LnNjcm9sbEJhci52YWx1ZSA8PSAwKSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRm9yd2FyZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uX215cXFfTGlzdFJlbmRlcihjZWxsOiBMYXlhLkJveCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5fbGlzdC5hcnJheVtpbmRleF07XHJcbiAgICAgICAgdmFyIGxvb3BBZEJveDogTG9vcF9teXFxX0FkQm94ID0gY2VsbC5nZXRDb21wb25lbnQoTG9vcF9teXFxX0FkQm94KTtcclxuICAgICAgICBsb29wQWRCb3guc2V0X215cXFfRGF0YShkYXRhKTtcclxuICAgIH1cclxufSIsImltcG9ydCBXWEFQSSBmcm9tIFwiLi4vLi4vV1hBUElcIjtcclxuaW1wb3J0IFNoYXJlX215cXFfQWQgZnJvbSBcIi4uL1NoYXJlQWRcIjtcclxuaW1wb3J0IEFMRCBmcm9tIFwiLi4vLi4vQUxEXCI7XHJcbmltcG9ydCBFdmVudF9teXFxX01nciBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnRNZ3JcIjtcclxuaW1wb3J0IHsgRXZlbnREZWYgfSBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnREZWZcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvb3BfbXlxcV9BZEJveCBleHRlbmRzIExheWEuU2NyaXB0IFxyXG57XHJcbiAgICBwcm90ZWN0ZWQgX2Rpc3BsYXlTcCA6IExheWEuU3ByaXRlO1xyXG4gICAgcHJvdGVjdGVkIF9kaXNUZXh0IDogTGF5YS5UZXh0O1xyXG4gICAgcHJvdGVjdGVkIF9kYXRhIDogYW55ID0gbnVsbDtcclxuICAgIHByb3RlY3RlZCBfb3JpZ2luVyA6IG51bWJlciA9IDE1MDtcclxuICAgIHByb3RlY3RlZCBfb3JpZ2luSCA6IG51bWJlciA9IDE1MDtcclxuICAgIHByb3RlY3RlZCBfZm9udFNpemUgPSAyNTtcclxuICAgIFxyXG5cclxuICAgIG9uQXdha2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2Rpc3BsYXlTcCA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJEaXNwbGF5XCIpIGFzIExheWEuU3ByaXRlO1xyXG4gICAgICAgIHRoaXMuX29yaWdpblcgPSB0aGlzLl9kaXNwbGF5U3Aud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fb3JpZ2luSCA9IHRoaXMuX2Rpc3BsYXlTcC5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fZGlzVGV4dCA9ICB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiVGl0ZWxUZXh0XCIpIGFzIExheWEuVGV4dDtcclxuICAgICAgICB0aGlzLl9kaXNUZXh0LnRleHQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX2ZvbnRTaXplID0gdGhpcy5fZGlzVGV4dC5mb250U2l6ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25FbmFibGUoKTogdm9pZCBcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5U3Aub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLHRoaXMub25fbXlxcV9TcENsaWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCBcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5U3Aub2ZmKExheWEuRXZlbnQuQ0xJQ0ssdGhpcyx0aGlzLm9uX215cXFfU3BDbGljayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldF9teXFxX0RhdGEoZGF0YSlcclxuICAgIHtcclxuICAgICAgICBpZihkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5U3AubG9hZEltYWdlKGRhdGEubG9nbyxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZighc2VsZi5fZGlzcGxheVNwLmRlc3Ryb3llZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9kaXNwbGF5U3Aud2lkdGggPSBzZWxmLl9vcmlnaW5XO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2Rpc3BsYXlTcC5oZWlnaHQgPSBzZWxmLl9vcmlnaW5IO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHZhciBzdHIgPSBTdHJpbmcoZGF0YS50aXRsZSk7XHJcbiAgICAgICAgICAgIHZhciBudW0gPSBzdHIubGVuZ3RoO1xyXG4gICAgICAgICAgICBudW0gPSBNYXRoLm1heCg1LG51bSk7XHJcbiAgICAgICAgICAgIC8vdmFyIGZvbnRTaXplID0gTWF0aC5mbG9vcigoNSAvIG51bSkgKiB0aGlzLl9mb250U2l6ZSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5fZGlzVGV4dC5mb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNUZXh0LnRleHQgPSBzdHI7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25fbXlxcV9TcENsaWNrKClcclxuICAgIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XHJcbiAgICAgICAgaWYoZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L2s5ri45oiP77yaIFwiICsgZGF0YS50aXRsZSk7XHJcbiAgICAgICAgICAgIFdYQVBJLm5hdmlnYXRlVG9NaW5pUHJvZ3JhbShkYXRhLmFwcGlkLGRhdGEudXJsLChyZXMpPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLot7PovazmiJDlip9cIilcclxuICAgICAgICAgICAgICAgIFNoYXJlX215cXFfQWQucmVwb3J0VXNlckNsaWNrKGRhdGEuYXBwaWQpO1xyXG4gICAgICAgICAgICAgICAgQUxELmFsZFNlbmRSZXBvcnRBZENsaWNrU3VjY2VzcyhkYXRhKTtcclxuICAgICAgICAgICAgfSwocmVzKT0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L2s5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnREZWYuQURfT25TaGFyZUFkRmFpbCk7XHJcbiAgICAgICAgICAgICAgICBpZihyZXMuZXJyTXNnID09IFwibmF2aWdhdGVUb01pbmlQcm9ncmFtOmZhaWwgY2FuY2VsXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLnlKjmiLflj5bmtojot7PovaxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgQUxELmFsZFNlbmRSZXBvcnRBZENsaWNrRmFpbChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwocmVzKT0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L2s5a6M5oiQXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgU2hhcmVfbXlxcV9BZCBmcm9tIFwiLi4vU2hhcmVBZFwiO1xyXG5pbXBvcnQgTG9vcF9teXFxX0FkQm94IGZyb20gXCIuL0xvb3BBZEJveFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9vcF9teXFxX0FkVmlldyBleHRlbmRzIExheWEuU2NyaXB0IHtcclxuICAgIHB1YmxpYyBBZFBvc0lEOiBudW1iZXIgPSBTaGFyZV9teXFxX0FkLkxvb3BBZExvY2F0aW9uSUQ7XHJcbiAgICBwcm90ZWN0ZWQgX2xpc3Q6IExheWEuTGlzdDtcclxuICAgIHByb3RlY3RlZCBfc2Nyb2xsRm9yd2FyZCA9IHRydWU7XHJcblxyXG4gICAgb25Bd2FrZSgpICB7XHJcbiAgICAgICAgdGhpcy5fbGlzdCA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJMaXN0XCIpIGFzIExheWEuTGlzdDtcclxuICAgICAgICB0aGlzLl9saXN0LnJlbmRlckhhbmRsZXIgPSBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25fbXlxcV9MaXN0UmVuZGVyLCBudWxsLCBmYWxzZSlcclxuICAgICAgICB0aGlzLl9saXN0LnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgU2hhcmVfbXlxcV9BZC5nZXRfbXlxcV9BRFZzKHRoaXMuQWRQb3NJRCwgKGRhdGFzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLm93bmVyICYmICF0aGlzLm93bmVyLmRlc3Ryb3llZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFzICYmIGRhdGFzLmxlbmd0aCA+IDAgJiYgZGF0YXMubGVuZ3RoIDwgNTApIHtcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5vd25lciBhcyBMYXlhLlNwcml0ZSkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDUwOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgPj0gZGF0YXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wLnB1c2goZGF0YXNbY291bnRlcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK2NvdW50ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBMZW4gPSBkYXRhcy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wLmxlbmd0aDsgKytpKSBcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBncm91cCA9IE1hdGguZmxvb3IoaSAvIGdyb3VwTGVuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0SW5kZXggPSBncm91cCAqIGdyb3VwTGVuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBncm91cExlbikgKyBzdGFydEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VyVmFsdWUgPSB0ZW1wW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZG9tVmFsdWUgPSB0ZW1wW3JhbmRvbUluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFtyYW5kb21JbmRleF0gPSBjdXJWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFtpXSA9IHJhbmRvbVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5hcnJheSA9IHRlbXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdC5hcnJheSA9IGRhdGFzO1xyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLm93bmVyIGFzIExheWEuU3ByaXRlKS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKSAge1xyXG4gICAgICAgIGlmICh0aGlzLl9zY3JvbGxGb3J3YXJkKSAge1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0LnNjcm9sbEJhci52YWx1ZSArPSAxMDAgKiBMYXlhLnRpbWVyLmRlbHRhIC8gMTAwMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3Quc2Nyb2xsQmFyLnZhbHVlID49IHRoaXMuX2xpc3Quc2Nyb2xsQmFyLm1heCkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Njcm9sbEZvcndhcmQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xpc3Quc2Nyb2xsQmFyLnZhbHVlIC09IDEwMCAqIExheWEudGltZXIuZGVsdGEgLyAxMDAwO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbGlzdC5zY3JvbGxCYXIudmFsdWUgPD0gMCkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Njcm9sbEZvcndhcmQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbl9teXFxX0xpc3RSZW5kZXIoY2VsbDogTGF5YS5Cb3gsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2xpc3QuYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgIHZhciBsb29wQWRCb3g6IExvb3BfbXlxcV9BZEJveCA9IGNlbGwuZ2V0Q29tcG9uZW50KExvb3BfbXlxcV9BZEJveCk7XHJcbiAgICAgICAgbG9vcEFkQm94LnNldF9teXFxX0RhdGEoZGF0YSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgRXZlbnRfbXlxcV9NZ3IgZnJvbSBcIi4uL0V2ZW50L0V2ZW50TWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50RGVmIH0gZnJvbSBcIi4uL0V2ZW50L0V2ZW50RGVmXCI7XHJcblxyXG4vL+a4uOaIj+aVsOaNrizkuLrkv53mjIHniYjmnKzlhbzlrrnvvIzlu7rorq7kuI3opoHliKDpmaTlkozkv67mlLnlrZfmrrXlkI1cclxuZXhwb3J0IGNsYXNzIFVzZXJHYW1lRGF0YVxyXG57XHJcbiAgICBwdWJsaWMgIGxldmVsTnVtOiBudW1iZXIgPSAxOy8v5b2T5YmN5YWz5Y2hXHJcbiAgICBwdWJsaWMgIG1vbmV5TnVtOiBudW1iZXIgPSAwOy8v6YeR5biB5pWw6YePXHJcbiAgICBwdWJsaWMgIGNyeXN0YWxOdW06IG51bWJlciA9IDA7Ly/pkrvnn7PmlbDph49cclxuICAgIHB1YmxpYyAgdW5sb2NrU29uZ3M6IFBhc3NTb25nW10gPSBuZXcgQXJyYXk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXNzU29uZyB7XHJcbiAgICBuYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgc3RhckxldmVsOiBudW1iZXIgPSAwO1xyXG4gICAgc291cmNlOiBudW1iZXIgPSAwO1xyXG4gICAgY29tcGxldGVkOmJvb2xlYW4gPSBmYWxzZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlcl95eSBleHRlbmRzIExheWEuU2NyaXB0IFxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNvZGU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIG9wZW5JZDogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgdG9rZW46IHN0cmluZyA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIG5pY2tOYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZW5kZXI6bnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzTG9naW46IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBfZ2FtZURhdGEgOiBVc2VyR2FtZURhdGEgPSBuZXcgVXNlckdhbWVEYXRhKCk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRTYXZlRGF0YSgpIDogc3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KFVzZXJfeXkuX2dhbWVEYXRhKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB0ZXN0SW5pdFVzZXIoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBzdG9yYWdlU3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJHYW1lX0RhdGFcIilcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuivu+WPluWtmOWCqOaVsOaNriBzdHItLS0tXCIgKyBzdG9yYWdlU3RyKTtcclxuICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2Uoc3RvcmFnZVN0cik7XHJcbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBVc2VyX3l5Ll9nYW1lRGF0YS5sZXZlbE51bSA9IDE7XHJcbiAgICAgICAgICAgIFVzZXJfeXkuX2dhbWVEYXRhLm1vbmV5TnVtID0gNjA7XHJcbiAgICAgICAgICAgIFVzZXJfeXkuX2dhbWVEYXRhLmNyeXN0YWxOdW0gPSAwO1xyXG4gICAgICAgICAgICBVc2VyX3l5Ll9nYW1lRGF0YS51bmxvY2tTb25ncyA9IG5ldyBBcnJheTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgdXNlckRhdGEgPSBkYXRhO1xyXG4gICAgICAgIFVzZXJfeXkuX2dhbWVEYXRhLmxldmVsTnVtID0gdXNlckRhdGEubGV2ZWxOdW0gPyB1c2VyRGF0YS5sZXZlbE51bSA6IDA7XHJcbiAgICAgICAgVXNlcl95eS5fZ2FtZURhdGEubW9uZXlOdW0gPSB1c2VyRGF0YS5tb25leU51bSA/IHVzZXJEYXRhLm1vbmV5TnVtIDogMDtcclxuICAgICAgICBVc2VyX3l5Ll9nYW1lRGF0YS5jcnlzdGFsTnVtID0gdXNlckRhdGEuY3J5c3RhbE51bSA/IHVzZXJEYXRhLmNyeXN0YWxOdW0gOiAwO1xyXG4gICAgICAgIFVzZXJfeXkuX2dhbWVEYXRhLnVubG9ja1NvbmdzID0gbmV3IEFycmF5O1xyXG4gICAgICAgIGlmICh1c2VyRGF0YS51bmxvY2tTb25ncyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB1c2VyRGF0YS51bmxvY2tTb25ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtZXAgPSB1c2VyRGF0YS51bmxvY2tTb25nc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBwYXNzU29uZyA9IG5ldyBQYXNzU29uZygpO1xyXG4gICAgICAgICAgICAgICAgcGFzc1NvbmcubmFtZSA9IHRtZXAubmFtZTtcclxuICAgICAgICAgICAgICAgIHBhc3NTb25nLnNvdXJjZSA9IHRtZXAuc291cmNlO1xyXG4gICAgICAgICAgICAgICAgcGFzc1Nvbmcuc3RhckxldmVsID0gdG1lcC5zdGFyTGV2ZWw7XHJcbiAgICAgICAgICAgICAgICBwYXNzU29uZy5jb21wbGV0ZWQgPSB0bWVwLmNvbXBsZXRlZCA/IHRtZXAuY29tcGxldGVkIDogZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBVc2VyX3l5Ll9nYW1lRGF0YS51bmxvY2tTb25ncy5wdXNoKHBhc3NTb25nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXRpVXNlcihkYXRhKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGRhdGEgJiYgMCAhPSBkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHVzZXJEYXRhID0gZGF0YS5nYW1lZGF0YTtcclxuICAgICAgICAgICAgLy9sZXQgZnJlcXVlbmN5ID0gZGF0YS5mcmVxdWVuY3k7XHJcbiAgICAgICAgICAgIFVzZXJfeXkuX2dhbWVEYXRhLmxldmVsTnVtID0gdXNlckRhdGEubGV2ZWxOdW0gPyB1c2VyRGF0YS5sZXZlbE51bSA6IDA7XHJcbiAgICAgICAgICAgIFVzZXJfeXkuX2dhbWVEYXRhLm1vbmV5TnVtID0gdXNlckRhdGEubW9uZXlOdW0gPyB1c2VyRGF0YS5tb25leU51bSA6IDA7XHJcbiAgICAgICAgICAgIFVzZXJfeXkuX2dhbWVEYXRhLmNyeXN0YWxOdW0gPSB1c2VyRGF0YS5jcnlzdGFsTnVtID8gdXNlckRhdGEuY3J5c3RhbE51bSA6IDA7XHJcbiAgICAgICAgICAgIFVzZXJfeXkuX2dhbWVEYXRhLnVubG9ja1NvbmdzID0gbmV3IEFycmF5O1xyXG4gICAgICAgICAgICBpZiAodXNlckRhdGEudW5sb2NrU29uZ3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHVzZXJEYXRhLnVubG9ja1NvbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRtZXAgPSB1c2VyRGF0YS51bmxvY2tTb25nc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFzc1NvbmcgPSBuZXcgUGFzc1NvbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXNzU29uZy5uYW1lID0gdG1lcC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhc3NTb25nLnNvdXJjZSA9IHRtZXAuc291cmNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhc3NTb25nLnN0YXJMZXZlbCA9IHRtZXAuc3RhckxldmVsO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhc3NTb25nLmNvbXBsZXRlZCA9IHRtZXAuY29tcGxldGVkID8gdG1lcC5jb21wbGV0ZWQgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBVc2VyX3l5Ll9nYW1lRGF0YS51bmxvY2tTb25ncy5wdXNoKHBhc3NTb25nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpZiAoZnJlcXVlbmN5ICE9IG51bGwgJiYgZnJlcXVlbmN5ICE9IDApIHtcclxuICAgICAgICAgICAgLy8gICAgIFVzZXJfeXkuX2dhbWVEYXRhLm1vbmV5TnVtID0gZnJlcXVlbmN5O1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vdG9kb++8muWkhOeQhuayoeacieiOt+WPluWIsOeOqeWutuaVsOaNrueahOaDheWGtVxyXG4gICAgICAgICAgICBVc2VyX3l5Ll9nYW1lRGF0YS5tb25leU51bSA9IDYwO1xyXG4gICAgICAgICAgICBVc2VyX3l5Ll9nYW1lRGF0YS5sZXZlbE51bSA9IDA7XHJcbiAgICAgICAgICAgIFVzZXJfeXkuX2dhbWVEYXRhLmNyeXN0YWxOdW0gPSAwO1xyXG4gICAgICAgICAgICBVc2VyX3l5Ll9nYW1lRGF0YS51bmxvY2tTb25ncyA9IG5ldyBBcnJheTtcclxuICAgICAgICB9ICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldExldmVOdW0obGV2ZWxOdW0gOiBudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgVXNlcl95eS5fZ2FtZURhdGEubGV2ZWxOdW0gPSBsZXZlbE51bTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldExldmVOdW0oKSA6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBVc2VyX3l5Ll9nYW1lRGF0YS5sZXZlbE51bTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGFkZE1vbmV5KGFkZCA6IG51bWJlcilcclxuICAgIHtcclxuICAgICAgICBhZGQgPSBNYXRoLmNlaWwoYWRkKVxyXG4gICAgICAgIHZhciBsYXN0ID0gVXNlcl95eS5fZ2FtZURhdGEubW9uZXlOdW1cclxuICAgICAgICBVc2VyX3l5Ll9nYW1lRGF0YS5tb25leU51bSArPSBhZGQ7XHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnREZWYuR2FtZV9PblVzZXJNb25leUNoYW5nZSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyciA6IFVzZXJfeXkuX2dhbWVEYXRhLm1vbmV5TnVtLFxyXG4gICAgICAgICAgICAgICAgbGFzdCA6IGxhc3RcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgc3ViTW9uZXkoc3ViIDogbnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHN1YiA9IE1hdGguY2VpbChzdWIpXHJcbiAgICAgICAgdmFyIGxhc3QgPSBVc2VyX3l5Ll9nYW1lRGF0YS5tb25leU51bVxyXG4gICAgICAgIFVzZXJfeXkuX2dhbWVEYXRhLm1vbmV5TnVtIC09IHN1YjtcclxuICAgICAgICBpZihVc2VyX3l5Ll9nYW1lRGF0YS5tb25leU51bSA8IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBVc2VyX3l5Ll9nYW1lRGF0YS5tb25leU51bSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkdhbWVfT25Vc2VyTW9uZXlDaGFuZ2UsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1cnIgOiBVc2VyX3l5Ll9nYW1lRGF0YS5tb25leU51bSxcclxuICAgICAgICAgICAgICAgIGxhc3QgOiBsYXN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1vbmV5KClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVXNlcl95eS5fZ2FtZURhdGEubW9uZXlOdW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhZGRDcnlzdGFsKGFkZCA6IG51bWJlcilcclxuICAgIHtcclxuICAgICAgICBhZGQgPSBNYXRoLmNlaWwoYWRkKVxyXG4gICAgICAgIHZhciBsYXN0ID0gVXNlcl95eS5fZ2FtZURhdGEuY3J5c3RhbE51bVxyXG4gICAgICAgIFVzZXJfeXkuX2dhbWVEYXRhLmNyeXN0YWxOdW0gKz0gYWRkO1xyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkdhbWVfT25Vc2VyQ3J5c3RhbENoYW5nZSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyciA6IFVzZXJfeXkuX2dhbWVEYXRhLmNyeXN0YWxOdW0sXHJcbiAgICAgICAgICAgICAgICBsYXN0IDogbGFzdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBzdWJDcnlzdGFsKHN1YiA6IG51bWJlcilcclxuICAgIHtcclxuICAgICAgICBzdWIgPSBNYXRoLmNlaWwoc3ViKVxyXG4gICAgICAgIHZhciBsYXN0ID0gVXNlcl95eS5fZ2FtZURhdGEuY3J5c3RhbE51bVxyXG4gICAgICAgIFVzZXJfeXkuX2dhbWVEYXRhLmNyeXN0YWxOdW0gLT0gc3ViO1xyXG4gICAgICAgIGlmKFVzZXJfeXkuX2dhbWVEYXRhLmNyeXN0YWxOdW0gPCAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVXNlcl95eS5fZ2FtZURhdGEuY3J5c3RhbE51bSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLmRpc3BhdGNoKEV2ZW50RGVmLkdhbWVfT25Vc2VyQ3J5c3RhbENoYW5nZSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyciA6IFVzZXJfeXkuX2dhbWVEYXRhLmNyeXN0YWxOdW0sXHJcbiAgICAgICAgICAgICAgICBsYXN0IDogbGFzdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRDcnlzdGFsKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVXNlcl95eS5fZ2FtZURhdGEuY3J5c3RhbE51bTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFBhc3NTb25nKCk6IFBhc3NTb25nW10ge1xyXG4gICAgICAgIHJldHVybiBVc2VyX3l5Ll9nYW1lRGF0YS51bmxvY2tTb25ncztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEFkZFVubG9ja1NvbmcobmFtZTogc3RyaW5nLCBzdGFyTGV2ZWw6IG51bWJlciA9IDAsIHNvdXJjZTogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVXNlcl95eS5fZ2FtZURhdGEudW5sb2NrU29uZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNvbmcgPSBVc2VyX3l5Ll9nYW1lRGF0YS51bmxvY2tTb25nc1tpXTtcclxuICAgICAgICAgICAgaWYgKHNvbmcubmFtZSA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXJTb25nID0gbmV3IFBhc3NTb25nKCk7XHJcbiAgICAgICAgY3VyU29uZy5uYW1lID0gbmFtZTtcclxuICAgICAgICBVc2VyX3l5Ll9nYW1lRGF0YS51bmxvY2tTb25ncy5wdXNoKGN1clNvbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSW5jbHVkZXRTb25nKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgVXNlcl95eS5fZ2FtZURhdGEudW5sb2NrU29uZ3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNvbmcgPSBVc2VyX3l5Ll9nYW1lRGF0YS51bmxvY2tTb25nc1tpXTtcclxuICAgICAgICAgICAgaWYgKHNvbmcubmFtZSA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxufVxyXG5cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbGl0XHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgT3JpZ2luU3RhZ2VXaWR0aCA9IDEzMzQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE9yaWdpblN0YWdlSGVpZ2h0ID0gNzUwO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdyYXlzY2FsZU1hdDogQXJyYXk8bnVtYmVyPiA9XHJcbiAgICAgICAgWzAuMzA4NiwgMC42MDk0LCAwLjA4MjAsIDAsIDAsXHJcbiAgICAgICAgICAgIDAuMzA4NiwgMC42MDk0LCAwLjA4MjAsIDAsIDAsXHJcbiAgICAgICAgICAgIDAuMzA4NiwgMC42MDk0LCAwLjA4MjAsIDAsIDAsXHJcbiAgICAgICAgICAgIDAsIDAsIDAsIDEsIDBdO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGdyYXlzY2FsZUZpbHRlcjogTGF5YS5Db2xvckZpbHRlciA9IG5ldyBMYXlhLkNvbG9yRmlsdGVyKFV0aWxpdC5ncmF5c2NhbGVNYXQpO1xyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIHBvaW5Eb3duIDogTGF5YS5Qb2ludCA9IG5ldyBMYXlhLlBvaW50KDAsLTEpO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBwb2luVXAgOiBMYXlhLlBvaW50ID0gbmV3IExheWEuUG9pbnQoMCwxKTtcclxuXHJcbiAgICBcclxuICAgIHB1YmxpYyBzdGF0aWMgTGVycChmb3JtIDogbnVtYmVyLHRvIDogbnVtYmVyLGRlbHRhIDogbnVtYmVyKSA6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKGZvcm0gPT0gdG8pXHJcbiAgICAgICAgICAgIHJldHVybiB0bztcclxuICAgICAgICBpZihmb3JtID4gdG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV4dCA9IGZvcm0gLSBkZWx0YTtcclxuICAgICAgICAgICAgaWYobmV4dCA8PSB0bylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0bztcclxuICAgICAgICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZm9ybSA8IHRvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5leHQgPSBmb3JtICsgZGVsdGE7XHJcbiAgICAgICAgICAgIGlmKG5leHQgPj0gdG8pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG87XHJcbiAgICAgICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxlcnBFdWxlckFuZ2xlKGZvcm0gOiBudW1iZXIsdG8gOiBudW1iZXIsZGVsdGEpIDogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGZvcm0gPSBmb3JtICUgMzYwO1xyXG4gICAgICAgIGZvcm0gPSBmb3JtID49IDAgPyBmb3JtIDogKDM2MCArIGZvcm0pO1xyXG4gICAgICAgIHZhciB0byA9IHRvICUgMzYwO1xyXG4gICAgICAgIHRvID0gdG8gPj0gMCA/IHRvIDogKDM2MCArIHRvKTtcclxuICAgICAgICB2YXIgZGlzID0gTWF0aC5hYnModG8gLSBmb3JtKTtcclxuICAgICAgICBpZihkaXMgPiAxODApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihmb3JtIDwgdG8pXHJcbiAgICAgICAgICAgICAgICB0byA9IHRvIC0gMzYwXHJcbiAgICAgICAgICAgIGVsc2UgaWYoZm9ybSA+IHRvKVxyXG4gICAgICAgICAgICAgICAgdG8gPSB0byArIDM2MFxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV4dCA9IFV0aWxpdC5MZXJwKGZvcm0sdG8sZGVsdGEpO1xyXG4gICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Um90YXRpb25CeURpcih2IDogTGF5YS5Qb2ludCkgOiBudW1iZXJcclxuICAgIHsgICBcclxuICAgICAgICB2YXIgZG90VmFsdWUgPSAodi54ICogVXRpbGl0LnBvaW5Eb3duLngpICsgKHYueSAqICBVdGlsaXQucG9pbkRvd24ueSk7XHJcbiAgICAgICAgdmFyIGNvcyA9IGRvdFZhbHVlIC8gKHYuZGlzdGFuY2UoMCwwKSAgKiBVdGlsaXQucG9pbkRvd24uZGlzdGFuY2UoMCwwKSk7XHJcbiAgICAgICAgdmFyIHJhZGlhbiA9IE1hdGguYWNvcyhjb3MpXHJcbiAgICAgICAgdmFyIHJvdGF0aW9uID0gcmFkaWFuIC8gKDIgKiBNYXRoLlBJKSAgKiAzNjA7XHJcbiAgICAgICAgaWYodi54IDwgMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvdGF0aW9uID0gLXJvdGF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcm90YXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRSb3RhdGlvbkJ5RGlyT24zRFNwYWNlKHYgOiBMYXlhLlBvaW50KVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkb3RWYWx1ZSA9ICh2LnggKiBVdGlsaXQucG9pblVwLngpICsgKHYueSAqICBVdGlsaXQucG9pblVwLnkpO1xyXG4gICAgICAgIHZhciBjb3MgPSBkb3RWYWx1ZSAvICh2LmRpc3RhbmNlKDAsMCkgICogVXRpbGl0LnBvaW5VcC5kaXN0YW5jZSgwLDApKTtcclxuICAgICAgICB2YXIgcmFkaWFuID0gTWF0aC5hY29zKGNvcylcclxuICAgICAgICB2YXIgcm90YXRpb24gPSByYWRpYW4gLyAoMiAqIE1hdGguUEkpICAqIDM2MDtcclxuICAgICAgICBpZih2LnggPCAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm90YXRpb24gPSByb3RhdGlvbiArICgxODAgLSByb3RhdGlvbikgKiAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcm90YXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXREaXJCeVJvdGF0aW9uKHJvdGF0aW9uIDogbnVtYmVyKSA6IExheWEuUG9pbnRcclxuICAgIHsgICBcclxuICAgICAgICB2YXIgcmFkaWFuID0gKHJvdGF0aW9uIC0gOTApICogTWF0aC5QSSAvIDE4MDsvLyAtOTAg5piv6L2s5o2i5Yiw5Zy65pmv5Z2Q5qCH57O7XHJcbiAgICAgICAgdmFyIHggPSBNYXRoLmNvcyhyYWRpYW4pO1xyXG4gICAgICAgIHZhciB5ID0gTWF0aC5zaW4ocmFkaWFuKTtcclxuICAgICAgICB2YXIgcG9pbnQgPSBuZXcgTGF5YS5Qb2ludCh4LHkpO1xyXG4gICAgICAgIHBvaW50Lm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgIHJldHVybiBwb2ludDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldERpckRpckFuZ2xlKGRpcjEgOiBMYXlhLlBvaW50LGRpcjIgOiBMYXlhLlBvaW50KSA6IG51bWJlclxyXG4gICAgeyAgIFxyXG4gICAgICAgIHZhciBkb3RWYWx1ZSA9IChkaXIxLnggKiBkaXIyLngpICsgKGRpcjEueSAqICBkaXIyLnkpO1xyXG4gICAgICAgIHZhciBjb3MgPSBkb3RWYWx1ZSAvIChkaXIxLmRpc3RhbmNlKDAsMCkgICogZGlyMi5kaXN0YW5jZSgwLDApKTtcclxuICAgICAgICB2YXIgcmFkaWFuID0gTWF0aC5hY29zKGNvcylcclxuICAgICAgICB2YXIgYW5nbGUgPSByYWRpYW4gLyAoMiAqIE1hdGguUEkpICAqIDM2MDtcclxuICAgICAgICByZXR1cm4gYW5nbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXREaXJTY2FsYXJMZW5ndGgoZGlyIDogTGF5YS5Qb2ludCkgOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICB2YXIgc2wgPSBNYXRoLnNxcnQoZGlyLnggKiBkaXIueCArIGRpci55ICogZGlyLnkpO1xyXG4gICAgICAgIHJldHVybiBzbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldFNwT25QYXJlbnRDZW50ZXIoc3AgOiBMYXlhLlNwcml0ZSlcclxuICAgIHtcclxuICAgICAgICBpZihudWxsID09IHNwLnBhcmVudClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZhciBwc3AgPSBzcC5wYXJlbnQgYXMgTGF5YS5TcHJpdGU7XHJcbiAgICAgICAgdmFyIHggID0gMDtcclxuICAgICAgICB2YXIgeSAgPSAwO1xyXG4gICAgICAgIHZhciB4ICA9IHggLSBzcC53aWR0aCAvIDIgKiBzcC5zY2FsZVggKyBwc3Aud2lkdGggLyAyO1xyXG4gICAgICAgIHZhciB5ICA9IHkgLSBzcC5oZWlnaHQgLyAyICAqIHNwLnNjYWxlWSAgKyBwc3AuaGVpZ2h0IC8gMjtcclxuICAgICAgICBzcC54ID0geDtcclxuICAgICAgICBzcC55ID0geTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFBvaW50VG9MaW5lRGlzdGFuY2UoeCA6IG51bWJlcix5IDogbnVtYmVyLExpbmVTdGFydCA6IExheWEuUG9pbnQsTGluZUVuZCA6IExheWEuUG9pbnQpIDogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRvU3RhcnREaXIgPSBuZXcgTGF5YS5Qb2ludCh4ICAtIExpbmVTdGFydC54LHkgLSBMaW5lU3RhcnQueSk7XHJcbiAgICAgICAgdmFyIHRvRW5kRGlyID0gbmV3IExheWEuUG9pbnQoeCAgLSBMaW5lRW5kLngseSAtIExpbmVFbmQueSk7XHJcbiAgICAgICAgdmFyIGxpbmVEaXIgPSBuZXcgTGF5YS5Qb2ludChMaW5lRW5kLnggLSBMaW5lU3RhcnQueSxMaW5lRW5kLnkgLSBMaW5lU3RhcnQueSlcclxuICAgICAgICB2YXIgZG90VG9TdGFydERpciA9IChsaW5lRGlyLnggKiB0b1N0YXJ0RGlyLngpICsgKGxpbmVEaXIueSAqIHRvU3RhcnREaXIueSlcclxuICAgICAgICBpZihkb3RUb1N0YXJ0RGlyIDw9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdG9TdGFydERpci5kaXN0YW5jZSgwLDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZG90VG9FbmREaXIgPSAobGluZURpci54ICogdG9FbmREaXIueCkgKyAobGluZURpci55ICogdG9FbmREaXIueSlcclxuICAgICAgICBpZiAoZG90VG9FbmREaXIgPD0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0b0VuZERpci5kaXN0YW5jZSgwLDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdG9TdGFydERpcyA9IHRvU3RhcnREaXIuZGlzdGFuY2UoMCwwKTtcclxuICAgICAgICB2YXIgbGluZURpckRpcyA9IGxpbmVEaXIuZGlzdGFuY2UoMCwwKTtcclxuICAgICAgICB2YXIgY29zID0gZG90VG9TdGFydERpciAvICh0b1N0YXJ0RGlzICogbGluZURpckRpcyk7XHJcbiAgICAgICAgdmFyIHJhZGlhbnMgPSBNYXRoLmFjb3MoY29zKVxyXG4gICAgICAgIHZhciBkaXMgPSBNYXRoLnNpbihyYWRpYW5zKSAqIHRvU3RhcnREaXNcclxuICAgICAgICByZXR1cm4gZGlzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzSXBob25lWCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUxheWEuQnJvd3Nlci5vbklQaG9uZSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmKChMYXlhLkJyb3dzZXIud2lkdGggPT0gMjQzNiAmJiBMYXlhLkJyb3dzZXIuaGVpZ2h0ID09IDExMjUpIFxyXG4gICAgICAgICAgICB8fCAoTGF5YS5Ccm93c2VyLmhlaWdodCA9PSAyNDM2ICYmIExheWEuQnJvd3Nlci53aWR0aCA9PSAxMTI1KSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfSBcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzSXBob25lKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gTGF5YS5Ccm93c2VyLm9uSVBob25lXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q2hpbGQobm9kZSA6IExheWEuTm9kZSxuYW1lIDogc3RyaW5nKSA6IExheWEuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIGZvcih2YXIgaT0wO2kgPCBub2RlLm51bUNoaWxkcmVuOysraSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IG5vZGUuZ2V0Q2hpbGRBdChpKTtcclxuICAgICAgICAgICAgaWYoY2hpbGQubmFtZSA9PSBuYW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gVXRpbGl0LmdldENoaWxkKGNoaWxkLG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYodGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBGaW5kQ2hpbGQobm9kZTogTGF5YS5Ob2RlLCBuYW1lOiBzdHJpbmcpOiBMYXlhLk5vZGUge1xyXG4gICAgICAgIGxldCBzdHJBcmcgPSBuYW1lLnNwbGl0KFwiL1wiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ckFyZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBuYW1lID0gc3RyQXJnW2ldO1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5nZXRDaGlsZEJ5TmFtZShuYW1lKTsgXHJcbiAgICAgICAgICAgIGlmIChub2RlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFJhbmRvbU51bWJlcihtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBSYW5nZSA9IG1heCAtIG1pbjtcclxuICAgICAgICB2YXIgUmFuZCA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgcmV0dXJuIChtaW4gKyBNYXRoLnJvdW5kKFJhbmQgKiBSYW5nZSkpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFNvdW5kX215cXFfTWdyIGZyb20gXCIuLi9NZ3IvU291bmRNZ3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbl9teXFxX0FuaW0gZXh0ZW5kcyBMYXlhLlNjcmlwdCB7XHJcblxyXG4gICAgcHVibGljIHVzZV9teXFxX1NvdW5kIDogYm9vbGVhbiAgPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XHJcblxyXG4gICAgb25Bd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm93bmVyLm9uKExheWEuRXZlbnQuTU9VU0VfRE9XTiwgdGhpcywgdGhpcy5vbl9teXFxX0Rvd24pO1xyXG4gICAgICAgIHRoaXMub3duZXIub24oTGF5YS5FdmVudC5NT1VTRV9VUCwgdGhpcywgdGhpcy5vbl9teXFxX1VwKTtcclxuICAgICAgICB0aGlzLm93bmVyLm9uKExheWEuRXZlbnQuTU9VU0VfT1VULCB0aGlzLCB0aGlzLm9uX215cXFfVXApO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm93bmVyLm9mZkFsbCgpO1xyXG4gICAgICAgIExheWEuVHdlZW4uY2xlYXJBbGwodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uX215cXFfRG93bigpOiB2b2lkIHtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMub3duZXIsIHsgc2NhbGVYOiAwLjksIHNjYWxlWTogMC45IH0sIDUwKTtcclxuICAgICAgICBpZih0aGlzLnVzZV9teXFxX1NvdW5kKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU291bmRfbXlxcV9NZ3IuaW5zdGFuY2UucGxheVNvdW5kKFwiYW5uaXVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25fbXlxcV9VcCgpOiB2b2lkIHtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMub3duZXIsIHsgc2NhbGVYOiAxLCBzY2FsZVk6IDEgfSwgNTApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJhbm5lcl9teXFxX0FkVmlldyBmcm9tIFwiLi4vLi4vU2hhcmVBZC9WaWV3L0Jhbm5lckFkVmlld1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVW5pdmVyc2FsQm90dG9tWm9uZSBleHRlbmRzIExheWEuU2NyaXB0IFxyXG57XHJcblxyXG4gICAgcHJvdGVjdGVkIF9vd25lclNwcml0ZSA6IExheWEuU3ByaXRlO1xyXG4gICAgcHJvdGVjdGVkIF9hdXRvWm9uZTogTGF5YS5VSUNvbXBvbmVudDtcclxuICAgIHByb3RlY3RlZCBfbG9vcEFEWm9uZTogTGF5YS5VSUNvbXBvbmVudDtcclxuICAgIHByb3RlY3RlZCBfYmFubmVyQURab25lOiBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgcHJvdGVjdGVkIF9iYW5uZXJBZCA6IEJhbm5lcl9teXFxX0FkVmlldztcclxuXHJcbiAgICBvbkF3YWtlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9vd25lclNwcml0ZSA9IHRoaXMub3duZXIgYXMgTGF5YS5TcHJpdGU7XHJcbiAgICAgICAgdGhpcy5fYXV0b1pvbmUgPSB0aGlzLl9vd25lclNwcml0ZS5nZXRDaGlsZEJ5TmFtZShcIkF1dG9ab25lXCIpIGFzIExheWEuVUlDb21wb25lbnQ7XHJcbiAgICAgICAgdGhpcy5fbG9vcEFEWm9uZSA9IHRoaXMuX293bmVyU3ByaXRlLmdldENoaWxkQnlOYW1lKFwiTG9vcEFEXCIpIGFzIExheWEuVUlDb21wb25lbnQ7IFxyXG4gICAgICAgIHRoaXMuX2Jhbm5lckFEWm9uZSA9IHRoaXMuX293bmVyU3ByaXRlLmdldENoaWxkQnlOYW1lKFwiQmFubmVyQURcIikgYXMgTGF5YS5VSUNvbXBvbmVudDsgXHJcbiAgICAgICAgdGhpcy5fYmFubmVyQWQgPSB0aGlzLl9iYW5uZXJBRFpvbmUuZ2V0Q29tcG9uZW50KEJhbm5lcl9teXFxX0FkVmlldyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uRW5hYmxlKCk6IHZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFzcGVjdFJhdGlvID0gTGF5YS5zdGFnZS53aWR0aCAvIExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIGlmKGFzcGVjdFJhdGlvICA8IDAuNSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2F1dG9ab25lLmJvdHRvbSA9IHRoaXMuX2xvb3BBRFpvbmUuaGVpZ2h0ICsgdGhpcy5fYmFubmVyQURab25lLmhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5fbG9vcEFEWm9uZS5ib3R0b20gPSB0aGlzLl9iYW5uZXJBRFpvbmUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl9iYW5uZXJBRFpvbmUudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2F1dG9ab25lLmJvdHRvbSA9IHRoaXMuX2xvb3BBRFpvbmUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl9sb29wQURab25lLmJvdHRvbSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jhbm5lckFEWm9uZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIFxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuX2Jhbm5lckFEWm9uZS52aXNpYmxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fYmFubmVyQWQuY2xlYXJXWEJhbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU29uZyB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL1ZlcnNpb25cIjtcclxuaW1wb3J0IFV0aWxpdCBmcm9tIFwiLi4vLi4vLi4vVXRpbGl0XCI7XHJcbmltcG9ydCBHYW1lQ29uc3QgZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBTb3VuZE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvU291bmRNYW5hZ2VyXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29uZ0Rpc0NlbGwgZXh0ZW5kcyBMYXlhLlNjcmlwdCB7XHJcbiAgICBwcml2YXRlIG5ld0ZsYWc6IExheWEuSW1hZ2UgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBob3RGbGFnOiBMYXlhLkltYWdlID0gbnVsbDtcclxuICAgIHByaXZhdGUgc29uZ05hbWU6IExheWEuTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBzZWxlY3RGbGFnOiBMYXlhLkltYWdlID0gbnVsbDtcclxuICAgIHByaXZhdGUgYmFja2dyb3VuZDogTGF5YS5TcHJpdGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBzdGFyTGV2ZWxzOiBMYXlhLkJveCA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIHNvbmdEYXRhOiBTb25nID0gbnVsbDtcclxuICAgIHB1YmxpYyBjbGlja0hhbmRsZXI6IExheWEuSGFuZGxlciA9IG51bGw7XHJcblxyXG4gICAgb25Bd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5ld0ZsYWcgPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiTmV3RmxhZ1wiKSBhcyBMYXlhLkltYWdlO1xyXG4gICAgICAgIHRoaXMuaG90RmxhZyA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJIb3RGbGFnXCIpIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgdGhpcy5zb25nTmFtZSA9IFV0aWxpdC5GaW5kQ2hpbGQodGhpcy5vd25lciwgXCJTb25nTmFtZS9MYWJlbFwiKSBhcyBMYXlhLkxhYmVsO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0RmxhZyA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJTZWxlY3RGbGFnXCIpIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIikgYXMgTGF5YS5TcHJpdGU7XHJcbiAgICAgICAgdGhpcy5zdGFyTGV2ZWxzID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIlN0YXJMZXZlbHNcIikgYXMgTGF5YS5Cb3g7XHJcblxyXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLk9uQ2xpY2tTb25nKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2xpY2tIYW5kbGVyKSB0aGlzLmNsaWNrSGFuZGxlci5yZWNvdmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZVZpZXcoaW5kZXg6IG51bWJlciwgc29uZzogU29uZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuUmVzZXQoKTtcclxuICAgICAgICBpZiAoc29uZyA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuc29uZ0RhdGEgPSBzb25nO1xyXG4gICAgICAgIHRoaXMuc29uZ05hbWUudGV4dCA9IFwiTm8uXCIgKyAoaW5kZXggKyAxKSArIFwiIFwiICsgc29uZy5zb25nTmFtZTtcclxuICAgICAgICB0aGlzLmhvdEZsYWcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubmV3RmxhZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLmxvYWRJbWFnZShHYW1lQ29uc3QuR2V0UmFuZG9tU29uZ1ByZXZpZXdQbmcpO1xyXG5cclxuICAgICAgICBsZXQgcHJldmlld1BuZ3MgPSBzb25nLnByZXZpZXdQbmdzO1xyXG4gICAgICAgIGlmIChwcmV2aWV3UG5ncy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2VQYXRoID0gcHJldmlld1BuZ3NbVXRpbGl0LkdldFJhbmRvbU51bWJlcigwLCBwcmV2aWV3UG5ncy5sZW5ndGggLSAxKV07XHJcbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZC5sb2FkSW1hZ2UoaW1hZ2VQYXRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXNzU29uZyA9IFNvdW5kTWFuYWdlci5JbnN0YW5jZS5HZXRTb25nUmVjb3JkKHNvbmcubmFtZSk7XHJcbiAgICAgICAgbGV0IGxldmVsID0gcGFzc1NvbmcgPyBwYXNzU29uZy5zdGFyTGV2ZWwgOiAwO1xyXG4gICAgICAgIHRoaXMuU2V0U3RhckxldmVsKGxldmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQWN0aXZlU29uZyhpc0FjdGl2ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnNvbmdEYXRhID09IG51bGwpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5zZWxlY3RGbGFnLnZpc2libGUgPSBpc0FjdGl2ZTtcclxuICAgICAgICBMYXlhLlR3ZWVuLmNsZWFyQWxsKHRoaXMuc2VsZWN0RmxhZyk7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi5jbGVhckFsbCh0aGlzLmJhY2tncm91bmQpO1xyXG4gICAgICAgIGlmIChpc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdEZsYWcuYWxwaGEgPSAwO1xyXG4gICAgICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuc2VsZWN0RmxhZywgeyBhbHBoYTogMSB9LCAwLjMgKiAxMDAwKTtcclxuICAgICAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLmJhY2tncm91bmQsIHsgcm90YXRpb246IHRoaXMuYmFja2dyb3VuZC5yb3RhdGlvbiArIDM2MCAqIDEwIH0sIDEyMCAqIDEwMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5BdXRvVGV4dFNjcm9sbCh0aGlzLnNvbmdOYW1lLnRleHRGaWVsZCwgaXNBY3RpdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2V0U3RhckxldmVsKGxldmVsKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFyID0gdGhpcy5zdGFyTGV2ZWxzLmdldENoaWxkQnlOYW1lKFwiU3RhclwiICsgaSkgYXMgTGF5YS5Ob2RlO1xyXG4gICAgICAgICAgICBsZXQgYWN0aXZlID0gc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkFjdGl2ZVwiKSBhcyBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgICAgICAgICBhY3RpdmUudmlzaWJsZSA9IGkgPD0gbGV2ZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdGltZXI6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIEF1dG9UZXh0U2Nyb2xsKHRleHQ6IExheWEuVGV4dCwgaXNFbmFibGU6IGJvb2xlYW4sIHNwZWVkOiBudW1iZXIgPSA1KSB7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gdGV4dC53aWR0aDtcclxuICAgICAgICBsZXQgVGVzdFdpZHRoID0gdGV4dC50ZXh0V2lkdGg7XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IFRlc3RXaWR0aCAtIHdpZHRoO1xyXG4gICAgICBcclxuICAgICAgICBpZiAoaXNFbmFibGUpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lciA9IDA7XHJcbiAgICAgICAgICAgIExheWEudGltZXIuZnJhbWVMb29wKDEsIHRoaXMsIHRoaXMuVGV4dFNjcm9sbCwgW3RleHQsIHdpZHRoLCBvZmZzZXQsIHNwZWVkXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGV4dC5zY3JvbGxYID0gMDtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLCB0aGlzLlRleHRTY3JvbGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuIFxyXG4gICAgcHJpdmF0ZSBUZXh0U2Nyb2xsKHRleHQ6IExheWEuVGV4dCwgd2lkdGg6bnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgc3BlZWQ6IG51bWJlcikge1xyXG4gICAgICAgIHRleHQuc2Nyb2xsWCA9IE1hdGguc2luKHRoaXMudGltZXIpICogb2Zmc2V0O1xyXG4gICAgICAgIHRoaXMudGltZXIgKz0gc3BlZWQgKiAoTGF5YS50aW1lci5kZWx0YSAvIDEwMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2xpY2tTb25nKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmNsaWNrSGFuZGxlcikge1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrSGFuZGxlci5ydW5XaXRoKHRoaXMuc29uZ0RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBWZXJzaW9uLCB7IFNvbmcgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9WZXJzaW9uXCI7XHJcbmltcG9ydCBVdGlsaXQgZnJvbSBcIi4uLy4uLy4uL1V0aWxpdFwiO1xyXG5pbXBvcnQgU291bmRNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL1NvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQYXNzU29uZyB9IGZyb20gXCIuLi8uLi8uLi9Vc2VyL1VzZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvbmdTdG9yZUNlbGwgZXh0ZW5kcyBMYXlhLlNjcmlwdCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzb25nRGF0YTogU29uZztcclxuXHJcbiAgICBwcml2YXRlIHNvbmdOYW1lOiBMYXlhLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBwbGF5QnV0dG9uOiBMYXlhLkltYWdlO1xyXG4gICAgcHJpdmF0ZSB1bmxvY2tBZEJ1dHRvbjogTGF5YS5JbWFnZTtcclxuICAgIHByaXZhdGUgdW5sb2Nha1Bvd2VyQnV0dG9uOiBMYXlhLkJveDtcclxuICAgIHByaXZhdGUgcmVjb3JkOiBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgcHJpdmF0ZSBzZWxlY3RGbGFnOiBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgcHJpdmF0ZSBzdGFyTGV2ZWxzOiBMYXlhLk5vZGU7XHJcbiAgICBwcml2YXRlIGZyZWVVbmxvY2tCdXR0b246IExheWEuVUlDb21wb25lbnQ7XHJcblxyXG4gICAgcHVibGljIHBsYXlIYW5kZXI6IExheWEuSGFuZGxlciA9IG51bGw7XHJcbiAgICBwdWJsaWMgdW5sb2NrSGFuZGVyOiBMYXlhLkhhbmRsZXIgPSBudWxsO1xyXG5cclxuICAgIG9uQXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb25nTmFtZSA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJTb25nTmFtZVwiKSBhcyBMYXlhLkxhYmVsO1xyXG4gICAgICAgIHRoaXMucGxheUJ1dHRvbiA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJQbGF5QnV0dG9uXCIpIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgdGhpcy51bmxvY2tBZEJ1dHRvbiA9IFV0aWxpdC5GaW5kQ2hpbGQodGhpcy5vd25lciwgXCJPcGVyYXRpb24vQWRUeXBlXCIpIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgdGhpcy51bmxvY2FrUG93ZXJCdXR0b24gPSBVdGlsaXQuRmluZENoaWxkKHRoaXMub3duZXIsIFwiT3BlcmF0aW9uL1Bvd2VyVHlwZVwiKSBhcyBMYXlhLkJveDtcclxuICAgICAgICB0aGlzLnJlY29yZCA9IFV0aWxpdC5GaW5kQ2hpbGQodGhpcy5vd25lciwgXCJPcGVyYXRpb24vUGxheWVkXCIpIGFzIExheWEuQm94O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0RmxhZyA9IFV0aWxpdC5GaW5kQ2hpbGQodGhpcy5vd25lciwgXCJCYWNrZ3JvdW5kL1NlbGVjdGVkXCIpIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgdGhpcy5zdGFyTGV2ZWxzID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIlN0YXJMZXZlbHNcIikgYXMgTGF5YS5Ob2RlO1xyXG4gICAgICAgIHRoaXMuZnJlZVVubG9ja0J1dHRvbiA9IFV0aWxpdC5GaW5kQ2hpbGQodGhpcy5vd25lciwgXCJPcGVyYXRpb24vRnJlZVwiKSBhcyBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZVZpZXcoc29uZzogU29uZykge1xyXG4gICAgICAgIHRoaXMuc29uZ0RhdGEgPSBzb25nO1xyXG4gICAgICAgIHRoaXMuc29uZ05hbWUudGV4dCA9IHNvbmcubmFtZTtcclxuXHJcbiAgICAgICAgbGV0IGNoYXJnZVR5cGUgPSBzb25nLmNoYXJnZVR5cGU7XHJcbiAgICAgICAgbGV0IGlzRnJlZWUgPSBTb3VuZE1hbmFnZXIuSW5zdGFuY2UuQ2hlY2tTb25nSXNGcmVlKHNvbmcpO1xyXG4gICAgICAgIGxldCBpc1VubG9jayA9IFNvdW5kTWFuYWdlci5JbnN0YW5jZS5DaGVja1NvbmdVbmxvY2tlZChzb25nLm5hbWUpO1xyXG4gICAgICAgIHRoaXMucmVjb3JkLnZpc2libGUgPSBpc1VubG9jaztcclxuICAgICAgICB0aGlzLmZyZWVVbmxvY2tCdXR0b24udmlzaWJsZSA9IGlzRnJlZWUgJiYgIWlzVW5sb2NrO1xyXG4gICAgICAgIHRoaXMudW5sb2NrQWRCdXR0b24udmlzaWJsZSA9ICFpc0ZyZWVlICYmICFpc1VubG9jayAmJiBjaGFyZ2VUeXBlID09IDI7XHJcbiAgICAgICAgdGhpcy51bmxvY2FrUG93ZXJCdXR0b24udmlzaWJsZSA9ICFpc0ZyZWVlICYmICFpc1VubG9jayAmJiBjaGFyZ2VUeXBlID09IDE7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGlzVW5sb2NrKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXNzU29uZyA9IFNvdW5kTWFuYWdlci5JbnN0YW5jZS5HZXRTb25nUmVjb3JkKHNvbmcubmFtZSkgYXMgUGFzc1Nvbmc7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0U3RhckxldmVsKHBhc3NTb25nLnN0YXJMZXZlbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5TZXRTdGFyTGV2ZWwoMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5wbGF5SGFuZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUhhbmRlci5yZWNvdmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnVubG9ja0hhbmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnVubG9ja0hhbmRlci5yZWNvdmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2V0U3RhckxldmVsKGxldmVsKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFyID0gdGhpcy5zdGFyTGV2ZWxzLmdldENoaWxkQnlOYW1lKFwiU3RhclwiICsgaSkgYXMgTGF5YS5Ob2RlO1xyXG4gICAgICAgICAgICBsZXQgYWN0aXZlID0gc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkFjdGl2ZVwiKSBhcyBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgICAgICAgICBhY3RpdmUudmlzaWJsZSA9IGkgPD0gbGV2ZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFjdGl2ZVNvbmcoaXNBY3RpdmUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbGVjdEZsYWcudmlzaWJsZSA9IGlzQWN0aXZlOyBcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENlbnRlckxpc3QgZXh0ZW5kcyBMYXlhLlNjcmlwdCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGlzdDogTGF5YS5MaXN0ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX2NlbGxXaWR0aDogbnVtYmVyID0gMjA7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5EcmFnOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9zdGFydE9mZnNldDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2hhc0NoYW5nZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfY2VudGVySW5kZXg6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBfdGFyZ2V0Q2VudGVySW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqIEBwcm9wIHtuYW1lOnNlbnNpdGl2aXR5LHRpcHM6XCLliIfmjaLpobXpnaLnmoTngbXmlY/luqZcIix0eXBlOnNOdW1iZXIsbWluOjAsbWF4OjEsZGVmYXVsdD0wLjUsfSAqL1xyXG4gICAgcHVibGljIHNlbnNpdGl2aXR5OiBudW1iZXIgPSAwLjU7XHJcblxyXG4gICAgLyoqIEBwcm9wIHtuYW1lOnJvbGxSYXRpbyx0aXBzOlwi5ruR5Yqo6KGw5Y+YIOi2iuWwj+ihsOWPmOi2iuW/q1wiLHR5cGU6c051bWJlcixtaW46MC4zLG1heDowLjk2LGRlZmF1bHQ9MC45Nix9Ki9cclxuICAgIHB1YmxpYyByb2xsUmF0aW86IG51bWJlciA9IDAuOTU7XHJcblxyXG4gICAgLyoqIEBwcm9wIHtuYW1lOm1vdmVTcGVlZCx0aXBzOlwi5Zue5q2j5Lit5b+D5pe255qE56e75Yqo6YCf5bqmXCIsdHlwZTpOdW1iZXIsZGVmYXVsdD0xMCx9ICovXHJcbiAgICBwdWJsaWMgbW92ZVNwZWVkOiBudW1iZXIgPSAxMDtcclxuXHJcbiAgICAvKiogQHByb3Age25hbWU6ZW5hYmxlZE1vdmUsdGlwczpcIuaYr+WQpuWPr+S7pei/nue7rea7keWKqFwiLHR5cGU6Qm9vbCxkZWZhdWx0PWZhbHNlfSovXHJcbiAgICBwdWJsaWMgZW5hYmxlZE1vdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgY2VsbFN0YXRlQ2hhbmdlOiBMYXlhLkhhbmRsZXIgPSBudWxsO1xyXG4gICAgcHVibGljIGNlbnRlckNlbGxDaGFuZ2U6IExheWEuSGFuZGxlciA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIGdldCBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5saXN0QmFyLmlzVmVydGljYWw7IH1cclxuICAgIHB1YmxpYyBnZXQgbGlzdEJhcigpOiBMYXlhLlNjcm9sbEJhciB7IHJldHVybiB0aGlzLl9saXN0LnNjcm9sbEJhcjsgfVxyXG4gICAgcHVibGljIGdldCBDZW50ZXJJbmRleCgpOiBudW1iZXIge3JldHVybiB0aGlzLl9jZW50ZXJJbmRleDsgfVxyXG5cclxuICAgIG9uQXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbGlzdCA9IHRoaXMub3duZXIgYXMgTGF5YS5MaXN0O1xyXG4gICAgICAgIHRoaXMuX2xpc3Qub24oTGF5YS5FdmVudC5SRU5ERVIsIHRoaXMsIHRoaXMub25MaXN0UmVuZGVySGFuZGxlcik7XHJcblxyXG4gICAgICAgIHRoaXMuX2xpc3Qub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLCB0aGlzLCB0aGlzLm9uTGlzdE1vdXNlRG93bik7XHJcbiAgICAgICAgdGhpcy5fbGlzdC5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLCB0aGlzLCB0aGlzLm9uTGlzdE1vdXNlVXApO1xyXG4gICAgICAgIHRoaXMuX2xpc3Qub24oTGF5YS5FdmVudC5NT1VTRV9PVVQsIHRoaXMsIHRoaXMub25MaXN0TW91c2VVcCk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlQ2VsbHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBMYXlhLnRpbWVyLmNhbGxMYXRlcih0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQ2VudGVyQ2VsbCh0aGlzLkF1dGVHZXRDZW50ZXJJbmRleCgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTGlzdFJlbmRlckhhbmRsZXIoY2VsbDogTGF5YS5Cb3gsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNoYW5nZUNlbGxzKCk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVDaGlsZFN0YXRlKGNlbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlQ2VsbHMoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNlbGwgPSB0aGlzLl9saXN0LmNlbGxzWzBdO1xyXG4gICAgICAgIHZhciBjZWxsV2lkdGggPSAoY2VsbC53aWR0aCArIHRoaXMuX2xpc3Quc3BhY2VYKSB8fCAxO1xyXG4gICAgICAgIHZhciBjZWxsSGVpZ2h0ID0gKGNlbGwuaGVpZ2h0ICsgdGhpcy5fbGlzdC5zcGFjZVkpIHx8IDE7XHJcbiAgICAgICAgdGhpcy5fY2VsbFdpZHRoID0gdGhpcy5pc1ZlcnRpY2FsID8gY2VsbEhlaWdodCA6IGNlbGxXaWR0aDtcclxuICAgICAgICAvL3RoaXMubGlzdEJhci5yb2xsUmF0aW8gPSB0aGlzLnJvbGxSYXRpbztcclxuICAgICAgICB0aGlzLl90YXJnZXRDZW50ZXJJbmRleCA9IHRoaXMuR2V0Q2VudGVyVGFyZ2V0SW5kZXgodGhpcy5saXN0QmFyLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTGlzdE1vdXNlRG93bigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pbkRyYWcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0T2Zmc2V0ID0gdGhpcy5saXN0QmFyLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX3RhcmdldENlbnRlckluZGV4ID0gdGhpcy5HZXRDZW50ZXJUYXJnZXRJbmRleCh0aGlzLl9zdGFydE9mZnNldCk7XHJcbiAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5vbkxpc3RDZW50ZXJMb29wLCBudWxsLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTGlzdE1vdXNlVXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faW5EcmFnID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMubGlzdEJhci52YWx1ZTtcclxuICAgICAgICBvZmZzZXQgKz0gKG9mZnNldCAtIHRoaXMuX3N0YXJ0T2Zmc2V0KSAqIHRoaXMuc2Vuc2l0aXZpdHk7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0Q2VudGVySW5kZXggPSB0aGlzLkdldENlbnRlclRhcmdldEluZGV4KG9mZnNldCk7XHJcblxyXG4gICAgICAgIGlmIChNYXRoLmFicyhvZmZzZXQpID4gMSkgeyB0aGlzLl9oYXNDaGFuZ2UgPSB0cnVlOyB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkTW92ZSkgeyB0aGlzLlN0b3BMaXN0TW92ZSgpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBVcGRhdGVDaGlsZFN0YXRlKGNlbGw6IExheWEuQm94KTogdm9pZCB7XHJcbiAgICAgICAgY2VsbC5zY2FsZSgxLCAxKTsvL+W9kumbtuefqemYtVxyXG4gICAgICAgIGxldCBvcmdQb2ludCA9IG5ldyBMYXlhLlBvaW50KDAsIDApO1xyXG4gICAgICAgIGxldCBnbG9iYWxQb2ludCA9IGNlbGwubG9jYWxUb0dsb2JhbChvcmdQb2ludCwgZmFsc2UsIHRoaXMuX2xpc3QpO1xyXG5cclxuICAgICAgICBsZXQgZGlzdGFuY2UgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLmlzVmVydGljYWwpIHtcclxuICAgICAgICAgICAgZGlzdGFuY2UgPSBnbG9iYWxQb2ludC5kaXN0YW5jZShnbG9iYWxQb2ludC54LCAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkaXN0YW5jZSA9IGdsb2JhbFBvaW50LmRpc3RhbmNlKDAsIGdsb2JhbFBvaW50LnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNjYWxlID0gMSAtIE1hdGgubWluKDEsIChNYXRoLmFicyhkaXN0YW5jZSkgLyB0aGlzLl9saXN0LndpZHRoKSk7XHJcbiAgICAgICAgaWYgKHRoaXMuY2VsbFN0YXRlQ2hhbmdlKSB7IHRoaXMuY2VsbFN0YXRlQ2hhbmdlLnJ1bldpdGgoW2NlbGwsIHNjYWxlXSk7IH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEdldENlbnRlclRhcmdldEluZGV4KG9mZnNldCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcihvZmZzZXQgLyB0aGlzLl9jZWxsV2lkdGgpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy5fbGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGluZGV4XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY3VyT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0IC0gaW5kZXggKiB0aGlzLl9jZWxsV2lkdGgpO1xyXG4gICAgICAgIGxldCBuZXh0T2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0IC0gKGluZGV4ICsgMSkgKiB0aGlzLl9jZWxsV2lkdGgpO1xyXG4gICAgICAgIGlmIChjdXJPZmZzZXQgPiBuZXh0T2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBBdXRlR2V0Q2VudGVySW5kZXgoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZE1vdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldENlbnRlckluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuR2V0Q2VudGVyVGFyZ2V0SW5kZXgodGhpcy5saXN0QmFyLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFN0b3BMaXN0TW92ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9saXN0LnN0b3BEcmFnKCk7XHJcbiAgICAgICAgdGhpcy5saXN0QmFyLnN0b3BTY3JvbGwoKTtcclxuICAgICAgICB0aGlzLmxpc3RCYXIuc3RhcnRUd2Vlbk1vdmVGb3JjZSgwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTGlzdENlbnRlckxvb3AoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGNlbGxzID0gdGhpcy5fbGlzdC5jZWxscztcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQ2hpbGRTdGF0ZShjZWxsc1tpXSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsYXN0T2ZmZXN0ID0gdGhpcy5saXN0QmFyLmxhc3RPZmZzZXQ7XHJcbiAgICAgICAgbGV0IHRhcmdldEluZGV4ID0gdGhpcy5BdXRlR2V0Q2VudGVySW5kZXgoKTtcclxuICAgICAgICBsZXQgdGFyZ2V0T2Zmc2V0ID0gdGFyZ2V0SW5kZXggKiB0aGlzLl9jZWxsV2lkdGg7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbkRyYWcgJiYgdGhpcy5faGFzQ2hhbmdlID09IHRydWUgJiYgTWF0aC5hYnMobGFzdE9mZmVzdCkgPCBNYXRoLnNxcnQodGhpcy5tb3ZlU3BlZWQpKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMubGlzdEJhci52YWx1ZTtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLkxlcnAodmFsdWUsIHRhcmdldE9mZnNldCwgdGhpcy5tb3ZlU3BlZWQgKiAxIC8gNjApO1xyXG5cclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRhcmdldE9mZnNldCAtIHZhbHVlKSA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc0NoYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdG9wTGlzdE1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdEJhci52YWx1ZSA9IHRhcmdldE9mZnNldDtcclxuICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlQ2VudGVyQ2VsbCh0YXJnZXRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXRDZW50ZXJJbmRleCA9IHRhcmdldEluZGV4O1xyXG4gICAgICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLCB0aGlzLm9uTGlzdENlbnRlckxvb3ApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxpc3RCYXIudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBVcGRhdGVDZW50ZXJDZWxsKGNlbnRlckluZGV4KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NlbnRlckluZGV4ID09IGNlbnRlckluZGV4KXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fY2VudGVySW5kZXggPSBjZW50ZXJJbmRleDtcclxuICAgICAgICBsZXQgY2VsbCA9IHRoaXMuX2xpc3QuZ2V0Q2VsbCh0aGlzLl9jZW50ZXJJbmRleCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY2VudGVyQ2VsbENoYW5nZSkgeyB0aGlzLmNlbnRlckNlbGxDaGFuZ2UucnVuV2l0aChbY2VsbCwgdGhpcy5fY2VudGVySW5kZXhdKTsgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBNb3ZlVG8oaW5kZXgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoaW5kZXggPiB0aGlzLl9saXN0LmFycmF5Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0Q2VudGVySW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLl9saXN0LnNjcm9sbFRvKGluZGV4KTtcclxuICAgICAgICBMYXlhLnRpbWVyLmZyYW1lT25jZSg1LCB0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQ2VudGVyQ2VsbChpbmRleCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGlzdC5jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVDaGlsZFN0YXRlKHRoaXMuX2xpc3QuY2VsbHNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBMZXJwKG51bTEsIG51bTIsIHQpOiBudW1iZXIgeyByZXR1cm4gbnVtMSArIHQgKiAobnVtMiAtIG51bTEpOyB9XHJcbn0iLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBWaWV3X215cXFfTWdyLCB7IFZpZXdEZWYgfSBmcm9tIFwiLi4vLi4vTWdyL1ZpZXdNZ3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cG9ydFZpZXcgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBiYWNrQnV0dG9uOiBMYXlhLkltYWdlO1xyXG5cclxuICAgIG9uQXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5iYWNrQnV0dG9uID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIkJhY2tCdXR0b25cIikgYXMgTGF5YS5JbWFnZTtcclxuXHJcbiAgICAgICAgdGhpcy5iYWNrQnV0dG9uLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuT25DbGlja0JhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIE9uQ2xpY2tCYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBWaWV3X215cXFfTWdyLmluc3RhbmNlLm9wZW5WaWV3KFZpZXdEZWYuR2FtZU1haW5WaWV3LCBudWxsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xvc2VWaWV3KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vVmlld0Jhc2VcIjtcclxuaW1wb3J0IFdYQVBJIGZyb20gXCIuLi8uLi9XWEFQSVwiO1xyXG5pbXBvcnQgR2FtZUNvbnRyb2xsZXIgZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFZpZXdfbXlxcV9NZ3IsIHsgVmlld0RlZiB9IGZyb20gXCIuLi8uLi9NZ3IvVmlld01nclwiO1xyXG5pbXBvcnQgTmF0aXZlQ2FsbGJhY2sgZnJvbSBcIi4uLy4uL05hdGl2ZUNhbGxiYWNrXCI7XHJcbmltcG9ydCBFdmVudF9teXFxX01nciBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnRNZ3JcIjtcclxuaW1wb3J0IHsgRXZlbnREZWYgfSBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnREZWZcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVGYWlsdXJlVmlldyBleHRlbmRzIFZpZXdCYXNlIHtcclxuICAgIHByaXZhdGUgc2tpcEJ0bjogTGF5YS5VSUNvbXBvbmVudDtcclxuICAgIHByaXZhdGUgcmVzdXJnZW5jZUJ0bjogTGF5YS5VSUNvbXBvbmVudDtcclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2tpcEJ0biA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJTa2lwQnRuXCIpIGFzIExheWEuVUlDb21wb25lbnQ7XHJcbiAgICAgICAgdGhpcy5yZXN1cmdlbmNlQnRuID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIlJlc3VyZ2VuY2VCdG5cIikgYXMgTGF5YS5VSUNvbXBvbmVudDtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2tpcEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLm9uQ2xpY2tTa2lwKTtcclxuICAgICAgICB0aGlzLnJlc3VyZ2VuY2VCdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5vbkNsaWNrUmVzdXJnZW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uRW5hYmxlKCk7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UucmVnRXZlbXQoRXZlbnREZWYuUmV3YXJkVmlkZW9GYWlsLHRoaXMsdGhpcy5vblJld2FyZFZpZGV3b0ZhaWwpO1xyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLnJlZ0V2ZW10KEV2ZW50RGVmLlJld2FyZFZpZGVvU3VjY2Vzcyx0aGlzLHRoaXMub25SZXdhcmRWaWRld29TdWNjZXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2tTa2lwKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6Lez6L+H5r+A5Yqx6KeG6aKR5aSN5rS7XCIpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VWaWV3KCk7XHJcbiAgICAgICAgR2FtZUNvbnRyb2xsZXIuSW5zdGFuY2UuR2FtZU92ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25SZXdhcmRWaWRld29GYWlsKCkge1xyXG4gICAgICAgIFZpZXdfbXlxcV9NZ3IuaW5zdGFuY2Uub3BlblZpZXcoVmlld0RlZi5UaXBzVmlldywgXCJWaWRlbyBwbGF5YmFjayBmYWlsZWQuIFJlc3VycmVjdGlvbiBmYWlsZWRcIik7XHJcbiAgICAgICAgdGhpcy5jbG9zZVZpZXcoKTtcclxuICAgICAgICBHYW1lQ29udHJvbGxlci5JbnN0YW5jZS5HYW1lT3ZlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblJld2FyZFZpZGV3b1N1Y2Nlc3MoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZVZpZXcoKTtcclxuICAgICAgICBHYW1lQ29udHJvbGxlci5JbnN0YW5jZS5SZXN1cnJlY3Rpb25HYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrUmVzdXJnZW5jZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIua/gOWKseinhumikeWkjea0u+WHhuWkh1wiKTtcclxuXHJcbiAgICAgICAgLy8gaWYgKHRydWUpIHtcclxuICAgICAgICAvLyAgICAgVmlld19teXFxX01nci5pbnN0YW5jZS5vcGVuVmlldyhWaWV3RGVmLlRpcHNWaWV3LCBcIuaKseatieW9k+WJjeaaguaXtuaXoOazleWkjea0u+OAguOAguOAglwiKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uQW5kcm9pZCB8fCBMYXlhLkJyb3dzZXIub25JT1MpIHtcclxuICAgICAgICAgICAgTmF0aXZlQ2FsbGJhY2suQ2FsbE5hdGl2ZUZ1bmMoXCJzaG93UmV3YXJkVmlkZW9cIik7XHJcbiAgICAgICAgICAgIExheWEuU291bmRNYW5hZ2VyLm11dGVkID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VWaWV3KCk7XHJcbiAgICAgICAgICAgIEdhbWVDb250cm9sbGVyLkluc3RhbmNlLlJlc3VycmVjdGlvbkdhbWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEdhbWVDb250cm9sbGVyLkluc3RhbmNlLk9wZW5SZXdhcmRlZFZpZGVvKExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgKGNvbXBsZXRlZCkgPT4ge1xyXG4gICAgICAgIC8vICAgICBpZiAoIWNvbXBsZXRlZCkge1xyXG4gICAgICAgIC8vICAgICAgICAgVmlld19teXFxX01nci5pbnN0YW5jZS5zaG93VGlwcyhcIuingueci+WujOaVtOinhumikeaJjeiDveWkjea0u1wiKTtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICB0aGlzLmNsb3NlVmlldygpO1xyXG4gICAgICAgIC8vICAgICBHYW1lQ29udHJvbGxlci5JbnN0YW5jZS5SZXN1cnJlY3Rpb25HYW1lKCk7XHJcbiAgICAgICAgLy8gfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBMYXlhLlR3ZWVuLmNsZWFyQWxsKHRoaXMpO1xyXG4gICAgICAgIExheWEudGltZXIuY2xlYXJBbGwodGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UucmVtb3ZlRXZlbnQoRXZlbnREZWYuUmV3YXJkVmlkZW9GYWlsLHRoaXMsdGhpcy5vblJld2FyZFZpZGV3b0ZhaWwpO1xyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLnJlbW92ZUV2ZW50KEV2ZW50RGVmLlJld2FyZFZpZGVvU3VjY2Vzcyx0aGlzLHRoaXMub25SZXdhcmRWaWRld29TdWNjZXNzKTtcclxuICAgIH1cclxufSIsImltcG9ydCBUZXh0dXJlUHJvY2Vzc0JhciBmcm9tIFwiLi4vVGV4dHVyZVByb2Nlc3NCYXJcIjtcclxuaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgR2FtZUNvbnRyb2xsZXIgZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgU29uZyB9IGZyb20gXCIuLi8uLi9HYW1lL1ZlcnNpb25cIjtcclxuaW1wb3J0IFZpZXdfbXlxcV9NZ3IsIHsgVmlld0RlZiB9IGZyb20gXCIuLi8uLi9NZ3IvVmlld01nclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUxvYWRpbmdWaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgY3VyTG9hZFNvbmdOYW1lOiBTb25nID0gbnVsbDtcclxuICAgIHByaXZhdGUgY29tcGxldGVkOiBMYXlhLkhhbmRsZXIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBwcm9jZXNzQmFyOiBUZXh0dXJlUHJvY2Vzc0JhciA9IG51bGxcclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc0JhciA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJQcm9jZXNzQmFyXCIpLmdldENvbXBvbmVudChUZXh0dXJlUHJvY2Vzc0Jhcik7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnByb2Nlc3NCYXIuc2V0VmFsdWUoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5jdXJMb2FkU29uZ05hbWUgPSB0aGlzLl9kYXRhO1xyXG5cclxuICAgICAgICB0aGlzLkxvYWRTb25nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBMb2FkU29uZygpOiB2b2lkIHtcclxuICAgICAgICBMYXlhLnRpbWVyLmNsZWFyQWxsKHRoaXMpO1xyXG4gICAgICAgIEdhbWVDb250cm9sbGVyLkluc3RhbmNlLkdhbWVSZWFkeSh0aGlzLmN1ckxvYWRTb25nTmFtZSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAoc3VjY2VlZCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNvbmcgTG9hZCBTdWNjZWVkXCIpO1xyXG4gICAgICAgIH0pLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIChwcm9jZXNzKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvY2VzczpcIiArIHByb2Nlc3MpO1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NCYXIuc2V0VmFsdWUocHJvY2Vzcyk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICBWaWV3X215cXFfTWdyLmluc3RhbmNlLm9wZW5WaWV3KFZpZXdEZWYuR2FtZVdvcmtWaWV3LCBudWxsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlVmlldygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMjAsIHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvY2Vzc0Jhci5DdXJyZW50VmFsdWUgIT0gMSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIC8v6K6w6L295a6M5oiQXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbXBsZXRlZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlZC5ydW4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2xlYXJIYW5kZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2xlYXJIYW5kZXIoKTogdm9pZCB7XHJcbiAgICAgICAgTGF5YS50aW1lci5jbGVhckFsbCh0aGlzKTtcclxuICAgICAgICBpZiAodGhpcy5jb21wbGV0ZWQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRlZC5yZWNvdmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGVkID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuQ2xlYXJIYW5kZXIoKTtcclxuICAgICAgICBMYXlhLlR3ZWVuLmNsZWFyQWxsKHRoaXMpO1xyXG4gICAgICAgIExheWEudGltZXIuY2xlYXJBbGwodGhpcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZUNvbnRyb2xsZXIgZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFZpZXdfbXlxcV9NZ3IsIHsgVmlld0RlZiB9IGZyb20gXCIuLi8uLi9NZ3IvVmlld01nclwiO1xyXG5pbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBTb3VuZF9teXFxX01nciBmcm9tIFwiLi4vLi4vTWdyL1NvdW5kTWdyXCI7XHJcbmltcG9ydCBHYW1lQ29uc3QgZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBWZXJzaW9uLCB7IFNvbmcsIENoYXJnZVR5cGUgfSBmcm9tIFwiLi4vLi4vR2FtZS9WZXJzaW9uXCI7XHJcbmltcG9ydCBDZW50ZXJMaXN0IGZyb20gXCIuL0NlbnRlckxpc3RcIjtcclxuaW1wb3J0IFV0aWxpdCBmcm9tIFwiLi4vLi4vVXRpbGl0XCI7XHJcbmltcG9ydCBVc2VyX3l5IGZyb20gXCIuLi8uLi9Vc2VyL1VzZXJcIjtcclxuaW1wb3J0IFdYQVBJIGZyb20gXCIuLi8uLi9XWEFQSVwiO1xyXG5pbXBvcnQgU291bmRNYW5hZ2VyLCB7IGNhc3RQbGF5T25lTW9uZXkgfSBmcm9tIFwiLi4vLi4vR2FtZS9Tb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IFNvbmdEaXNDZWxsIGZyb20gXCIuL0NlbGxWaWV3L1NvbmdEaXNDZWxsXCI7XHJcbmltcG9ydCBFdmVudF9teXFxX01nciBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnRNZ3JcIjtcclxuaW1wb3J0IHsgRXZlbnREZWYgfSBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnREZWZcIjtcclxuaW1wb3J0IE5hdGl2ZUNhbGxiYWNrIGZyb20gXCIuLi8uLi9OYXRpdmVDYWxsYmFja1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1haW5WaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgc29uZ0xpc3Q6IExheWEuTGlzdDtcclxuICAgIHByaXZhdGUgY2VudGVyTGlzdDogQ2VudGVyTGlzdDtcclxuXHJcbiAgICBwcml2YXRlIHBvd2VyRmxhZzogTGF5YS5Cb3g7XHJcbiAgICBwcml2YXRlIHZpZGVvRmxhZzogTGF5YS5Cb3g7XHJcbiAgICBwcml2YXRlIGNhc3RMYWJlbDogTGF5YS5MYWJlbDtcclxuICAgIHByaXZhdGUgcGxheUJ1dHRvbjogTGF5YS5VSUNvbXBvbmVudDtcclxuICAgIHByaXZhdGUgc2hhcmRCdXR0b246IExheWEuVUlDb21wb25lbnQ7XHJcbiAgICBwcml2YXRlIHJhbmtCdXR0b246IExheWEuVUlDb21wb25lbnQ7XHJcbiAgICBwcml2YXRlIHN0b3JlQnV0dG9uOiBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgcHJpdmF0ZSBOZXdTb25nRmxhZzogTGF5YS5JbWFnZTtcclxuXHJcbiAgICBwcml2YXRlIHBoeXNpY2FsczogTGF5YS5Cb3g7IFxyXG4gICAgcHJpdmF0ZSBwaHlzaWNhbFZhbHVlczogTGF5YS5MYWJlbDtcclxuICAgIHByaXZhdGUgbm9QaHlzaWNhbDogTGF5YS5VSUNvbXBvbmVudDtcclxuXHJcbiAgICBwcml2YXRlIGNsaWNrU29uZzogU29uZztcclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc29uZ0xpc3QgPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiU29uZ0xpc3RcIikgYXMgTGF5YS5MaXN0O1xyXG4gICAgICAgIHRoaXMuY2VudGVyTGlzdCA9IHRoaXMuc29uZ0xpc3QuZ2V0Q29tcG9uZW50KENlbnRlckxpc3QpO1xyXG4gICAgICAgIHRoaXMucGxheUJ1dHRvbiA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJQbGF5QnV0dG9uXCIpIGFzIExheWEuVUlDb21wb25lbnQ7XHJcbiAgICAgICAgdGhpcy5zaGFyZEJ1dHRvbiA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJTaGFyZUJ1dHRvblwiKSBhcyBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgICAgIHRoaXMucmFua0J1dHRvbiA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJSYW5rQnV0dG9uXCIpIGFzIExheWEuVUlDb21wb25lbnQ7XHJcbiAgICAgICAgdGhpcy5zdG9yZUJ1dHRvbiA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJTb25nU3RvcmVcIikgYXMgTGF5YS5VSUNvbXBvbmVudDtcclxuICAgICAgICB0aGlzLk5ld1NvbmdGbGFnID0gdGhpcy5zdG9yZUJ1dHRvbi5nZXRDaGlsZEJ5TmFtZShcIk5ld1NvbmdcIikgYXMgTGF5YS5JbWFnZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNoYXJkQnV0dG9uLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJhbmtCdXR0b24udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucGh5c2ljYWxWYWx1ZXMgPSBVdGlsaXQuRmluZENoaWxkKHRoaXMub3duZXIsIFwiUGh5c2ljYWxWYWx1ZS9MYWJlbFwiKSBhcyBMYXlhLkxhYmVsO1xyXG4gICAgICAgIHRoaXMucGh5c2ljYWxzID0gdGhpcy5wbGF5QnV0dG9uLmdldENoaWxkQnlOYW1lKFwiQm94XCIpIGFzIExheWEuQm94O1xyXG4gICAgICAgIHRoaXMucG93ZXJGbGFnID0gdGhpcy5wbGF5QnV0dG9uLmdldENoaWxkQnlOYW1lKFwiUG93ZXJcIikgYXMgTGF5YS5Cb3g7XHJcbiAgICAgICAgdGhpcy52aWRlb0ZsYWcgPSB0aGlzLnBsYXlCdXR0b24uZ2V0Q2hpbGRCeU5hbWUoXCJWaWRlb1wiKSBhcyBMYXlhLkJveDtcclxuICAgICAgICB0aGlzLm5vUGh5c2ljYWwgPSB0aGlzLnBsYXlCdXR0b24uZ2V0Q2hpbGRCeU5hbWUoXCJOb1BoeXNpY2FsXCIpIGFzIExheWEuQm94O1xyXG4gICAgICAgIHRoaXMuY2FzdExhYmVsID0gdGhpcy5wb3dlckZsYWcuZ2V0Q2hpbGRCeU5hbWUoXCJMYWJlbFwiKSBhcyBMYXlhLkxhYmVsO1xyXG5cclxuICAgICAgICB0aGlzLnNvbmdMaXN0LmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNvbmdMaXN0LnNlbGVjdEVuYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc29uZ0xpc3QuZWxhc3RpY0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc29uZ0xpc3QucmVuZGVySGFuZGxlciA9IExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5PblJlbmRlclNvbmdMaXN0LCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJMaXN0LmNlbGxTdGF0ZUNoYW5nZSA9IExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5PbkNlbGxTdGF0ZUNoYW5nZSwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyTGlzdC5jZW50ZXJDZWxsQ2hhbmdlID0gTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLk9uQ2VudGVyQ2hhbmdlLCBudWxsLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIHRoaXMucGxheUJ1dHRvbi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLk9uQ2xpY2tQbGF5QnV0dG9uKTtcclxuICAgICAgICB0aGlzLnNoYXJkQnV0dG9uLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuT25DbGlja1NoYXJlQnV0dG9uKTtcclxuICAgICAgICB0aGlzLnN0b3JlQnV0dG9uLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuT25DbGlja1N0b3JlQnV0dG9uKTtcclxuICAgICAgICB0aGlzLnJhbmtCdXR0b24ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5PbkNsaWNrUmFua0J1dHRvbik7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coVmVyc2lvbi5zb25ncy5sZW5ndGgpO1xyXG4gICAgICAgIHRoaXMuc29uZ0xpc3QuYXJyYXkgPSBWZXJzaW9uLnNvbmdzO1xyXG4gICAgICAgIHRoaXMucGh5c2ljYWxWYWx1ZXMudGV4dCA9IFVzZXJfeXkuZ2V0TW9uZXkoKS50b1N0cmluZygpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IFNvdW5kTWFuYWdlci5JbnN0YW5jZS5HZXRMYXN0UGxheVNvbmdJbmRleCgpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyTGlzdC5Nb3ZlVG8oaW5kZXgpO1xyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLnJlZ0V2ZW10KEV2ZW50RGVmLkdhbWVfT25Vc2VyTW9uZXlDaGFuZ2UsIHRoaXMsIHRoaXMuT25Nb25leUNoYW5nZSk7XHJcblxyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLnJlZ0V2ZW10KEV2ZW50RGVmLlJld2FyZFZpZGVvRmFpbCx0aGlzLHRoaXMub25SZXdhcmRWaWRld29GYWlsKTtcclxuICAgICAgICBFdmVudF9teXFxX01nci5pbnN0YW5jZS5yZWdFdmVtdChFdmVudERlZi5SZXdhcmRWaWRlb1N1Y2Nlc3MsdGhpcyx0aGlzLm9uUmV3YXJkVmlkZXdvU3VjY2Vzcyk7XHJcblxyXG4gICAgICAgIGxldCBzb25nID0gVmVyc2lvbi5zb25nc1tpbmRleF07XHJcbiAgICAgICAgbGV0IGNoYXJnZVR5cGU6IENoYXJnZVR5cGUgPSBzb25nLmNoYXJnZVR5cGU7XHJcbiAgICAgICAgbGV0IG1vbmV5RW5vdWdoID0gU291bmRNYW5hZ2VyLkluc3RhbmNlLkNhblBsYXlPbmUoKTtcclxuXHJcbiAgICAgICAgaWYgKCFtb25leUVub3VnaCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vUGh5c2ljYWwudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9GbGFnLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnBvd2VyRmxhZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5ub1BoeXNpY2FsLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy52aWRlb0ZsYWcudmlzaWJsZSA9IGNoYXJnZVR5cGUgPT0gQ2hhcmdlVHlwZS5WaWRlbztcclxuICAgICAgICAgICAgdGhpcy5wb3dlckZsYWcudmlzaWJsZSA9IChjaGFyZ2VUeXBlID09IENoYXJnZVR5cGUuUG93ZXIpIHx8IChjaGFyZ2VUeXBlID09IENoYXJnZVR5cGUuRnJlZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBMYXlhLlR3ZWVuLmNsZWFyQWxsKHRoaXMpO1xyXG4gICAgICAgIExheWEudGltZXIuY2xlYXJBbGwodGhpcyk7XHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UucmVtb3ZlRXZlbnQoRXZlbnREZWYuR2FtZV9PblVzZXJNb25leUNoYW5nZSwgdGhpcywgdGhpcy5Pbk1vbmV5Q2hhbmdlKTtcclxuICAgICAgICBcclxuICAgICAgICBFdmVudF9teXFxX01nci5pbnN0YW5jZS5yZW1vdmVFdmVudChFdmVudERlZi5SZXdhcmRWaWRlb0ZhaWwsdGhpcyx0aGlzLm9uUmV3YXJkVmlkZXdvRmFpbCk7XHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UucmVtb3ZlRXZlbnQoRXZlbnREZWYuUmV3YXJkVmlkZW9TdWNjZXNzLHRoaXMsdGhpcy5vblJld2FyZFZpZGV3b1N1Y2Nlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIG9uUmV3YXJkVmlkZXdvRmFpbCgpIHtcclxuICAgICAgICBpZiAoTmF0aXZlQ2FsbGJhY2suTm93VmlkZW9UeXBlID09IFwiQ2xpY2tQbGF5XCIpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnV0dG9uLm1vdXNlRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFZpZXdfbXlxcV9NZ3IuaW5zdGFuY2Uub3BlblZpZXcoVmlld0RlZi5UaXBzVmlldywgXCJWaWRlbyBwbGF5YmFjayBmYWlsZWQuIGNhbid0IGVudGVyIGdhbWVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uUmV3YXJkVmlkZXdvU3VjY2VzcygpIHtcclxuICAgICAgICBsZXQgc29uZ3MgPSBWZXJzaW9uLnNvbmdzO1xyXG4gICAgICAgIGlmIChzb25ncyA9PSBudWxsIHx8IHNvbmdzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIFZpZXdfbXlxcV9NZ3IuaW5zdGFuY2Uub3BlblZpZXcoVmlld0RlZi5UaXBzVmlldywgXCJUaGUgbGlicmFyeSBpcyBlbXB0eSBhbmQgaXMgYmVpbmcgZXhwZWRpdGVkIC4uLiAuLi5cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHBsYXlTb25nID0gc29uZ3NbdGhpcy5jZW50ZXJMaXN0LkNlbnRlckluZGV4XTtcclxuICAgICAgICBcclxuICAgICAgICBpZihOYXRpdmVDYWxsYmFjay5Ob3dWaWRlb1R5cGUgPT0gXCJDbGlja1NvbmdcIiAmJiB0aGlzLmNsaWNrU29uZyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHBsYXlTb25nID0gdGhpcy5jbGlja1Nvbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLlBsYXlTb25nKHBsYXlTb25nKTtcclxuICAgICAgICBMYXlhLnRpbWVyLmNsZWFyQWxsKHRoaXMpO1xyXG4gICAgICAgIHRoaXMucGxheUJ1dHRvbi5tb3VzZUVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2xpY2tQbGF5QnV0dG9uKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzb25ncyA9IFZlcnNpb24uc29uZ3M7XHJcbiAgICAgICAgaWYgKHNvbmdzID09IG51bGwgfHwgc29uZ3MubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgVmlld19teXFxX01nci5pbnN0YW5jZS5vcGVuVmlldyhWaWV3RGVmLlRpcHNWaWV3LCBcIlRoZSBsaWJyYXJ5IGlzIGVtcHR5IGFuZCBpcyBiZWluZyBleHBlZGl0ZWQgLi4uIC4uLlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/miYvmnLrlubPlj7DpkrHkuI3otrMg55yL5bm/5ZGKXHJcbiAgICAgICAgaWYgKExheWEuQnJvd3Nlci5vbkFuZHJvaWQgfHwgTGF5YS5Ccm93c2VyLm9uSU9TKSB7XHJcbiAgICAgICAgICAgIGlmICghU291bmRNYW5hZ2VyLkluc3RhbmNlLkNhblBsYXlPbmUoKSkge1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlQ2FsbGJhY2suTm93VmlkZW9UeXBlID0gXCJDbGlja1BsYXlcIjtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZUNhbGxiYWNrLkNhbGxOYXRpdmVGdW5jKFwic2hvd1Jld2FyZFZpZGVvXCIpO1xyXG4gICAgICAgICAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIubXV0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5QnV0dG9uLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGxheVNvbmcgPSBzb25nc1t0aGlzLmNlbnRlckxpc3QuQ2VudGVySW5kZXhdO1xyXG4gICAgICAgIGlmICghU291bmRNYW5hZ2VyLkluc3RhbmNlLkNhblBsYXlPbmUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXlTb25nKHBsYXlTb25nKTtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhckFsbCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnV0dG9uLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBMYXlhLnRpbWVyLm9uY2UoMTAwMCwgdGhpcywgKCkgPT4geyB0aGlzLnBsYXlCdXR0b24ubW91c2VFbmFibGVkID0gdHJ1ZTsgfSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wbGF5QnV0dG9uLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIExheWEudGltZXIuY2xlYXJBbGwodGhpcyk7XHJcbiAgICAgICAgTGF5YS50aW1lci5vbmNlKDEwMDAsIHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnV0dG9uLm1vdXNlRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheVNvbmcocGxheVNvbmcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnBoeXNpY2FsVmFsdWVzLnRleHQgPSAoVXNlcl95eS5nZXRNb25leSgpIC0gU291bmRNYW5hZ2VyLkluc3RhbmNlLkdldFNvbmdDYXN0TW9uZXkocGxheVNvbmcpKS50b1N0cmluZygpO1xyXG4gICAgICAgIGxldCBsb2dvID0gVXRpbGl0LkZpbmRDaGlsZCh0aGlzLnBsYXlCdXR0b24sIFwiUG93ZXIvTG9nb1wiKSBhcyBMYXlhLlVJQ29tcG9uZW50OyAvL3RoaXMucGxheUJ1dHRvbi5nZXRDaGlsZEJ5TmFtZShcIkxvZ29cIikgYXMgTGF5YS5VSUNvbXBvbmVudDtcclxuICAgICAgICBsZXQgc3RhcnRQb3MgPSAodGhpcy5waHlzaWNhbFZhbHVlcy5wYXJlbnQgYXMgTGF5YS5VSUNvbXBvbmVudCkubG9jYWxUb0dsb2JhbChuZXcgTGF5YS5Qb2ludCgpKTtcclxuICAgICAgICBsZXQgZW5kUG9zID0gbG9nby5sb2NhbFRvR2xvYmFsKG5ldyBMYXlhLlBvaW50KCkpO1xyXG4gICAgICAgIHRoaXMuU2hvd1BoeXNpY2FsQW5pbSh0aGlzLnBoeXNpY2FscywgbG9nbywgc3RhcnRQb3MsIGVuZFBvcywgMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNob3dQaHlzaWNhbEFuaW0ocGh5c2ljYWxzOiBMYXlhLlVJQ29tcG9uZW50LCBsb2dvOiBMYXlhLlVJQ29tcG9uZW50LCBzdGFydFBvczogTGF5YS5Qb2ludCwgZW5kUG9zOiBMYXlhLlBvaW50LCBvZmZzZXQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHN0YXJ0UG9zID0gcGh5c2ljYWxzLmdsb2JhbFRvTG9jYWwoc3RhcnRQb3MpO1xyXG4gICAgICAgIGVuZFBvcyA9IHBoeXNpY2Fscy5nbG9iYWxUb0xvY2FsKGVuZFBvcyk7XHJcbiAgICAgICAgbGV0IHNjYWxlQ2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBMYXlhLlR3ZWVuLmNsZWFyQWxsKGxvZ28pO1xyXG4gICAgICAgICAgICBsb2dvLnNjYWxlKDEsMSk7XHJcbiAgICAgICAgICAgIExheWEuVHdlZW4uZnJvbShsb2dvLCB7c2NhbGVYOiAxLjQsIHNjYWxlWTogMS40fSwgMC4yICogMTAwMCwgTGF5YS5FYXNlLmJhY2tPdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBoeXNpY2Fscy5fY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBwaHlzaWNhbHMuX2NoaWxkcmVuW2ldIGFzIExheWEuVUlDb21wb25lbnQ7XHJcbiAgICAgICAgICAgIGl0ZW0ueCA9IHN0YXJ0UG9zLng7XHJcbiAgICAgICAgICAgIGl0ZW0ueSA9IHN0YXJ0UG9zLnk7XHJcbiAgICAgICAgICAgIGl0ZW0udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIExheWEuVHdlZW4uY2xlYXJBbGwodGhpcyk7XHJcbiAgICAgICAgICAgIExheWEuVHdlZW4udG8oaXRlbSwge3g6IHN0YXJ0UG9zLnggKyBVdGlsaXQuR2V0UmFuZG9tTnVtYmVyKDAsIG9mZnNldCksIHk6IHN0YXJ0UG9zLnkgKyBVdGlsaXQuR2V0UmFuZG9tTnVtYmVyKDAsIG9mZnNldCl9LCAwLjE1ICogMTAwMCwgbnVsbCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBMYXlhLlR3ZWVuLnRvKGl0ZW0sIHt4OiBlbmRQb3MueCwgeTogZW5kUG9zLnl9LCAoMC4yICsgTWF0aC5yYW5kb20oKSAqIDAuMykgKiAxMDAwLCBudWxsLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBzY2FsZUNoYW5nZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25DbGlja1NoYXJlQnV0dG9uKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBXWEFQSS5zaGFyZSgoaXNDb21wbGV0ZWQpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaXNDb21wbGV0ZWQgPyBcIuWIhuS6q+aIkOWKn1wiIDogXCLnlKjmiLflj5bmtohcIik7XHJcbiAgICAgICAgfSwgXCLprZTpn7PnkIPnkIPvvIwg5b+r5LiA6LW35p2l546p5ZGA77yBXCIsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25DbGlja1JhbmtCdXR0b24oKTogdm9pZCB7XHJcbiAgICAgICAgVmlld19teXFxX01nci5pbnN0YW5jZS5vcGVuVmlldyhWaWV3RGVmLlRpcHNWaWV3LCBcIuWKn+iDveato+WcqOWujOWWhOS4reOAguOAguOAglwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2xpY2tTdG9yZUJ1dHRvbigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgVmlld19teXFxX01nci5pbnN0YW5jZS5vcGVuVmlldyhWaWV3RGVmLlNvbmdTdG9yZVZpZXcsIHRoaXMuY2VudGVyTGlzdC5DZW50ZXJJbmRleCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmNsb3NlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25SZW5kZXJTb25nTGlzdChjZWxsOiBMYXlhLkJveCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHZhciBzb25nID0gdGhpcy5zb25nTGlzdC5hcnJheVtpbmRleF07XHJcbiAgICAgICAgbGV0IHNvbmdDZWxsID0gY2VsbC5nZXRDb21wb25lbnQoU29uZ0Rpc0NlbGwpIGFzIFNvbmdEaXNDZWxsO1xyXG4gICAgICAgIHNvbmdDZWxsLlVwZGF0ZVZpZXcoaW5kZXgsIHNvbmcpO1xyXG4gICAgICAgIHNvbmdDZWxsLmNsaWNrSGFuZGxlciA9IExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5PbkNsaWNrU29uZywgbnVsbCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25DZW50ZXJDaGFuZ2UoY2VudGVyQ2VsbDogTGF5YS5Cb3gsIGNlbnRlckluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgY2VsbHMgPSB0aGlzLnNvbmdMaXN0LmNlbGxzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNlbGwgPSBjZWxsc1tpXVxyXG4gICAgICAgICAgICBsZXQgc29uZ0NlbGwgPSBjZWxsc1tpXS5nZXRDb21wb25lbnQoU29uZ0Rpc0NlbGwpIGFzIFNvbmdEaXNDZWxsO1xyXG4gICAgICAgICAgICBsZXQgYWN0aXZlID0gY2VsbCA9PSBjZW50ZXJDZWxsO1xyXG4gICAgICAgICAgICBzb25nQ2VsbC5BY3RpdmVTb25nKGFjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBzb25nID0gdGhpcy5zb25nTGlzdC5hcnJheVtjZW50ZXJJbmRleF0gYXMgU29uZztcclxuICAgICAgICBTb3VuZE1hbmFnZXIuSW5zdGFuY2UuQXVkaXRpb25Tb25nKHNvbmcpO1xyXG4gICAgICAgIHRoaXMuY2FzdExhYmVsLnRleHQgPSBcIsOXXCIgKyBTb3VuZE1hbmFnZXIuSW5zdGFuY2UuR2V0U29uZ0Nhc3RNb25leShzb25nKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2xpY2tTb25nKHNvbmc6IFNvbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uQW5kcm9pZCB8fCBMYXlhLkJyb3dzZXIub25JT1MpIHtcclxuICAgICAgICAgICAgaWYgKCFTb3VuZE1hbmFnZXIuSW5zdGFuY2UuQ2FuUGxheU9uZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVDYWxsYmFjay5Ob3dWaWRlb1R5cGUgPSBcIkNsaWNrU29uZ1wiO1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlQ2FsbGJhY2suQ2FsbE5hdGl2ZUZ1bmMoXCJzaG93UmV3YXJkVmlkZW9cIik7XHJcbiAgICAgICAgICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrU29uZyA9IHNvbmc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuUGxheVNvbmcoc29uZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBQbGF5U29uZyhzb25nOiBTb25nKTogdm9pZCB7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLkluc3RhbmNlLlBsYXlTb25nKHNvbmcsIHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZVZpZXcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2VsbFN0YXRlQ2hhbmdlKGNlbGw6IExheWEuQm94LCBzY2FsZTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRTY2VsZSA9IDAuNjtcclxuICAgICAgICBjb25zdCBtYXhTY2FsZSA9IDFcclxuICAgICAgICBsZXQgYm94U2NhbGUgPSBNYXRoLm1pbihtYXhTY2FsZSwgKDAuNiArIDAuNCAqIHNjYWxlKSk7XHJcbiAgICAgICAgY2VsbC5zY2FsZShib3hTY2FsZSwgYm94U2NhbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25Nb25leUNoYW5nZShkYXRhKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGN1cnJNb25leSA9IGRhdGEuY3VycjtcclxuICAgICAgICB0aGlzLnBoeXNpY2FsVmFsdWVzLnRleHQgPSBjdXJyTW9uZXkudG9TdHJpbmcoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vVmlld0Jhc2VcIjtcclxuaW1wb3J0IFZpZXdfbXlxcV9NZ3IsIHsgVmlld0RlZiB9IGZyb20gXCIuLi8uLi9NZ3IvVmlld01nclwiO1xyXG5pbXBvcnQgR2FtZUNvbnRyb2xsZXIgZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFV0aWxpdCBmcm9tIFwiLi4vLi4vVXRpbGl0XCI7XHJcbmltcG9ydCBTb3VuZE1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvU291bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCBVc2VyX3l5LCB7IFBhc3NTb25nIH0gZnJvbSBcIi4uLy4uL1VzZXIvVXNlclwiO1xyXG5pbXBvcnQgR2FtZV9teXFxX01nciBmcm9tIFwiLi4vLi4vTWdyL0dhbWVNZ3JcIjtcclxuaW1wb3J0IFdYQVBJIGZyb20gXCIuLi8uLi9XWEFQSVwiO1xyXG5pbXBvcnQgeyBFdmVudERlZiB9IGZyb20gXCIuLi8uLi9FdmVudC9FdmVudERlZlwiO1xyXG5pbXBvcnQgTmF0aXZlQ2FsbGJhY2sgZnJvbSBcIi4uLy4uL05hdGl2ZUNhbGxiYWNrXCI7XHJcbmltcG9ydCBFdmVudF9teXFxX01nciBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnRNZ3JcIjtcclxuaW1wb3J0IFNvdW5kX215cXFfTWdyIGZyb20gXCIuLi8uLi9NZ3IvU291bmRNZ3JcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTZXR0bGVWaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgX3N0YXJzOiBMYXlhLkJveDtcclxuICAgIHByaXZhdGUgX3NvbmdOYW1lOiBMYXlhLkxhYmVsID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3NvbmdTb3VyY2U6IExheWEuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2VuZXJneTogTGF5YS5Cb3ggPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfZW5lcmd5TGFiZWw6IExheWEuRm9udENsaXAgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfcGh5c2ljYWxCb3g6IExheWEuQm94ID0gbnVsbDtcclxuICAgIHByaXZhdGUgX3BoeXNpY2FsVmFsdWU6IExheWEuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX3NraXBCdXR0b246IExheWEuVUlDb21wb25lbnQgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfYWRNdWx0aXBsZU51bTogTGF5YS5Gb250Q2xpcCA9IG51bGw7XHJcbiAgICBwcml2YXRlIF9hZFJlY2VpdmVCdXR0b246IExheWEuVUlDb21wb25lbnQgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBfZnJlZVJlY2VpdmVCdXR0b246IExheWEuVUlDb21wb25lbnQgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX2N1cnJlbnRQYXNzU29uZzogUGFzc1NvbmcgPSBudWxsO1xyXG5cclxuICAgIG9uQXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZW5lcmd5ID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIkVuZXJneVwiKSBhcyBMYXlhLkJveDtcclxuICAgICAgICB0aGlzLl9lbmVyZ3lMYWJlbCA9IHRoaXMuX2VuZXJneS5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpIGFzIExheWEuRm9udENsaXA7XHJcbiAgICAgICAgdGhpcy5fc3RhcnMgPSBVdGlsaXQuRmluZENoaWxkKHRoaXMub3duZXIsIFwiU3RhcnRCb3gvU3RhcnNcIikgYXMgTGF5YS5Cb3g7XHJcbiAgICAgICAgdGhpcy5fc29uZ05hbWUgPSBVdGlsaXQuRmluZENoaWxkKHRoaXMub3duZXIsIFwiU29uZ05hbWUvTGFiZWxcIikgYXMgTGF5YS5MYWJlbDtcclxuICAgICAgICB0aGlzLl9zb25nU291cmNlID0gVXRpbGl0LkZpbmRDaGlsZCh0aGlzLm93bmVyLCBcIlNvdXJjZS9MYWJlbFwiKSBhcyBMYXlhLkxhYmVsO1xyXG4gICAgICAgIHRoaXMuX3NraXBCdXR0b24gPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiU2tpcEJ0blwiKSBhcyBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgICAgIHRoaXMuX2FkUmVjZWl2ZUJ1dHRvbiA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJBZFJlc3VyZ2VuY2VCdG5cIikgYXMgTGF5YS5VSUNvbXBvbmVudDtcclxuICAgICAgICB0aGlzLl9hZE11bHRpcGxlTnVtID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIkxhYmVsXCIpIGFzIExheWEuRm9udENsaXA7XHJcbiAgICAgICAgdGhpcy5fZnJlZVJlY2VpdmVCdXR0b24gPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiRnJlZVJlc3VyZ2VuY2VCdG5cIikgYXMgTGF5YS5VSUNvbXBvbmVudDtcclxuXHJcbiAgICAgICAgdGhpcy5fcGh5c2ljYWxCb3ggPSBVdGlsaXQuRmluZENoaWxkKHRoaXMub3duZXIsIFwiUGh5c2ljYWxWYWx1ZS9Cb3hcIikgYXMgTGF5YS5Cb3g7XHJcbiAgICAgICAgdGhpcy5fcGh5c2ljYWxWYWx1ZSA9IFV0aWxpdC5GaW5kQ2hpbGQodGhpcy5vd25lciwgXCJQaHlzaWNhbFZhbHVlL0xhYmVsXCIpIGFzIExheWEuTGFiZWw7XHJcblxyXG4gICAgICAgIHRoaXMuX3NraXBCdXR0b24ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5vbkNsaWNrRnJlZVJlY2VpdmUpO1xyXG4gICAgICAgIHRoaXMuX2ZyZWVSZWNlaXZlQnV0dG9uLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25DbGlja0ZyZWVSZWNlaXZlKTtcclxuICAgICAgICB0aGlzLl9hZFJlY2VpdmVCdXR0b24ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5vbkNsaWNrQWRSZWNlaXZlKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25FbmFibGUoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uRW5hYmxlKCk7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UucmVnRXZlbXQoRXZlbnREZWYuUmV3YXJkVmlkZW9GYWlsLHRoaXMsdGhpcy5vblJld2FyZFZpZGV3b0ZhaWwpO1xyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLnJlZ0V2ZW10KEV2ZW50RGVmLlJld2FyZFZpZGVvU3VjY2Vzcyx0aGlzLHRoaXMub25SZXdhcmRWaWRld29TdWNjZXNzKTtcclxuXHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UucmVnRXZlbXQoRXZlbnREZWYuSW5zZXJ0VmlkZW9FbmQsdGhpcyx0aGlzLm9uSW5zZXJ0VmlkZW9FbmQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdygpOiB2b2lkIHtcclxuICAgICAgICBsZXQgd2luID0gdGhpcy5fZGF0YTtcclxuICAgICAgICBsZXQgcGFzc1NvbmcgPSBHYW1lQ29udHJvbGxlci5JbnN0YW5jZS5HZXRDdXJyZW50U29uZ1JlY29yZCgpO1xyXG4gICAgICAgIGxldCBzb25nTmFtZSA9IHBhc3NTb25nLm5hbWU7XHJcbiAgICAgICAgbGV0IHN0YXJMZXZlbCA9IHBhc3NTb25nLnN0YXJMZXZlbDsvL0dhbWVDb250cm9sbGVyLkluc3RhbmNlLnN0YXJ0TGV2ZWw7XHJcbiAgICAgICAgbGV0IHNvdXJjZSA9IHBhc3NTb25nLnNvdXJjZTtcclxuICAgICAgICB0aGlzLl9jdXJyZW50UGFzc1NvbmcgPSBwYXNzU29uZztcclxuXHJcbiAgICAgICAgdGhpcy5fc29uZ05hbWUudGV4dCA9IHNvbmdOYW1lO1xyXG4gICAgICAgIHRoaXMuX3NvbmdTb3VyY2UudGV4dCA9IHNvdXJjZS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuX3BoeXNpY2FsVmFsdWUudGV4dCA9IFVzZXJfeXkuZ2V0TW9uZXkoKS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuU2V0U3RhcihzdGFyTGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuX2VuZXJneUxhYmVsLnZhbHVlID0gU291bmRNYW5hZ2VyLkluc3RhbmNlLkdldFNvbmdBd2FyZHMod2luLCBzdGFyTGV2ZWwpLnRvU3RyaW5nKCk7O1xyXG5cclxuICAgICAgICB0aGlzLl9hZFJlY2VpdmVCdXR0b24udmlzaWJsZSA9IHdpbjtcclxuICAgICAgICB0aGlzLl9mcmVlUmVjZWl2ZUJ1dHRvbi52aXNpYmxlID0gIXdpblxyXG5cclxuICAgICAgICAvL3RoaXMuX3NraXBCdXR0b24udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2V0U3RhcihsZXZlbCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3N0YXJzLl9jaGlsZHJlbi5mb3JFYWNoKChzdGFyOiBMYXlhLkltYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXIudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIExheWEudGltZXIub25jZSgwLjMgKiAxMDAwLCB0aGlzLCAoKSA9PiB7IGZvciAobGV0IGkgPSAxOyBpIDw9IDM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc3RhciA9IHRoaXMuX3N0YXJzLmdldENoaWxkQnlOYW1lKFwiU3RhclwiICsgaSkgYXMgTGF5YS5VSUNvbXBvbmVudDtcclxuICAgICAgICAgICAgaWYgKGkgPD0gbGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkZWxheVRpbWUgPSAoaSAtIDEpICogMC4yICogMTAwMDtcclxuICAgICAgICAgICAgICAgIExheWEudGltZXIub25jZShkZWxheVRpbWUsIHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFyLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXIuc2NhbGUoMSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgTGF5YS5Ud2Vlbi5mcm9tKHN0YXIuYWxwaGEsIHthbHBoYTogMC4wMX0sIDAuMSAqIDEwMDAsIClcclxuICAgICAgICAgICAgICAgICAgICBMYXlhLlR3ZWVuLmZyb20oc3RhciwgeyBzY2FsZVg6IDQsIHNjYWxlWTogNCB9LCAwLjMgKiAxMDAwLCBMYXlhLkVhc2UuYmFja091dCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblJld2FyZFZpZGV3b0ZhaWwoKSB7XHJcbiAgICAgICAgVmlld19teXFxX01nci5pbnN0YW5jZS5vcGVuVmlldyhWaWV3RGVmLlRpcHNWaWV3LCBcIkdldCByZXdhcmQgYWZ0ZXIgd2F0Y2ggdGhlIHZpZGVvXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblJld2FyZFZpZGV3b1N1Y2Nlc3MoKSB7XHJcbiAgICAgICAgbGV0IG51bSA9IFNvdW5kTWFuYWdlci5JbnN0YW5jZS5TZXRBZFNvbmdBd2FyZHModGhpcy5fY3VycmVudFBhc3NTb25nLnN0YXJMZXZlbCk7XHJcbiAgICAgICAgdGhpcy5fcGh5c2ljYWxWYWx1ZS50ZXh0ID0gbnVtLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5TaG93R2V0UG93ZXJFZmZlY3QodGhpcy5fYWRSZWNlaXZlQnV0dG9uIGFzIExheWEuVUlDb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0FkUmVjZWl2ZShlOiBMYXlhLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLlgI3mlbDpooblj5blpZblirFcIik7XHJcbiAgICAgICAgLy8gbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vIGxldCBsb29ja0JhY2sgPSAoY29tcGxldGVkKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGlmICghY29tcGxldGVkKSB7IFxyXG4gICAgICAgIC8vICAgICAgICAgVmlld19teXFxX01nci5pbnN0YW5jZS5vcGVuVmlldyhWaWV3RGVmLlRpcHNWaWV3LCBcIueci+WujOinhumikeaJjeiDvemihuWPlue/u+WAjeWlluWKseWTpuOAguOAguOAglwiKTtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgbGV0IG51bSA9IFNvdW5kTWFuYWdlci5JbnN0YW5jZS5TZXRBZFNvbmdBd2FyZHModGhpcy5fY3VycmVudFBhc3NTb25nLnN0YXJMZXZlbCk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX3BoeXNpY2FsVmFsdWUudGV4dCA9IG51bS50b1N0cmluZygpO1xyXG4gICAgICAgIC8vICAgICBzZWxmLlNob3dHZXRQb3dlckVmZmVjdChlLnRhcmdldCBhcyBMYXlhLlVJQ29tcG9uZW50KTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gV1hBUEkuc2hvd1Jld2FyZGVkVmlkZW9BZCgoaXNDbG9zZSkgPT4ge1xyXG4gICAgICAgIC8vICAgICBsb29ja0JhY2suY2FsbChzZWxmLCBpc0Nsb3NlKTtcclxuICAgICAgICAvLyB9LCAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIFZpZXdfbXlxcV9NZ3IuaW5zdGFuY2Uub3BlblZpZXcoVmlld0RlZi5UaXBzVmlldywgXCLop4bpopHliqDovb3lpLHotKXjgILjgILjgIJcIik7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG5cclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uQW5kcm9pZCB8fCBMYXlhLkJyb3dzZXIub25JT1MpIHtcclxuICAgICAgICAgICAgTmF0aXZlQ2FsbGJhY2suQ2FsbE5hdGl2ZUZ1bmMoXCJzaG93UmV3YXJkVmlkZW9cIik7XHJcbiAgICAgICAgICAgIExheWEuU291bmRNYW5hZ2VyLm11dGVkID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSBTb3VuZE1hbmFnZXIuSW5zdGFuY2UuU2V0QWRTb25nQXdhcmRzKHRoaXMuX2N1cnJlbnRQYXNzU29uZy5zdGFyTGV2ZWwpO1xyXG4gICAgICAgICAgICB0aGlzLl9waHlzaWNhbFZhbHVlLnRleHQgPSBudW0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgdGhpcy5TaG93R2V0UG93ZXJFZmZlY3QoZS50YXJnZXQgYXMgTGF5YS5VSUNvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2xvb2NrQmFjay5jYWxsKHNlbGYsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja0ZyZWVSZWNlaXZlKGU6IExheWEuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWFjei0uemihuWPllwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9waHlzaWNhbFZhbHVlLnRleHQgPSBTb3VuZE1hbmFnZXIuSW5zdGFuY2UuU2V0RnJlZVNvbmdBd2FyZHMoKS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuU2hvd0dldFBvd2VyRWZmZWN0KGUudGFyZ2V0IGFzIExheWEuVUlDb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2hvd0dldFBvd2VyRWZmZWN0KGJ1dHRvbjogTGF5YS5VSUNvbXBvbmVudCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBidXR0b24ubW91c2VFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgTGF5YS50aW1lci5vbmNlKDEgKiAxMDAwLCB0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vYnV0dG9uLm1vdXNlRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIFZpZXdfbXlxcV9NZ3IuaW5zdGFuY2Uub3BlblZpZXcoVmlld0RlZi5FeHBvcnRWaWV3LCBudWxsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICBzZWxmLmNsb3NlVmlldygpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgLy8gdmFyIHJhbmROdW0gPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIumaj+acuuaVsOWAvCA9PT09PT09PT09PVwiICsgcmFuZE51bSk7XHJcbiAgICAgICAgICAgIC8vIC8vIHJhbmROdW0gPSAwLjQ2O1xyXG4gICAgICAgICAgICAvLyBpZiAoKExheWEuQnJvd3Nlci5vbkFuZHJvaWQgfHwgTGF5YS5Ccm93c2VyLm9uSU9TKSAmJiByYW5kTnVtID4gMC4yKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBOYXRpdmVDYWxsYmFjay5DYWxsTmF0aXZlRnVuYyhcInNob3dJbnNlcnRWaWRlb1wiKTtcclxuICAgICAgICAgICAgLy8gICAgIE5hdGl2ZUNhbGxiYWNrLk5vd1ZpZGVvVHlwZSA9IFwiaW5zZXJ0QWRcIjtcclxuICAgICAgICAgICAgLy8gICAgIExheWEuU291bmRNYW5hZ2VyLm11dGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICBWaWV3X215cXFfTWdyLmluc3RhbmNlLm9wZW5WaWV3KFZpZXdEZWYuR2FtZU1haW5WaWV3LCBudWxsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgc2VsZi5jbG9zZVZpZXcoKTtcclxuICAgICAgICAgICAgLy8gICAgIH0pXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgVmlld19teXFxX01nci5pbnN0YW5jZS5vcGVuVmlldyhWaWV3RGVmLkdhbWVNYWluVmlldywgbnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZVZpZXcoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0UG9zID0gdGhpcy5fZW5lcmd5LmxvY2FsVG9HbG9iYWwobmV3IExheWEuUG9pbnQodGhpcy5fZW5lcmd5LndpZHRoIC8gMiwgdGhpcy5fZW5lcmd5LmhlaWdodCAvIDIpKTtcclxuICAgICAgICBsZXQgZW5kUG9zID0gdGhpcy5fcGh5c2ljYWxCb3gubG9jYWxUb0dsb2JhbChuZXcgTGF5YS5Qb2ludCgwLDApKTtcclxuICAgICAgICBsZXQgbG9nbyA9IHRoaXMuX3BoeXNpY2FsVmFsdWUucGFyZW50LmdldENoaWxkQnlOYW1lKFwiTG9nb1wiKSBhcyBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgICAgIHRoaXMuU2hvd1BoeXNpY2FsQW5pbSh0aGlzLl9waHlzaWNhbEJveCwgbG9nbywgc3RhcnRQb3MsIGVuZFBvcywgMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkluc2VydFZpZGVvRW5kKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBWaWV3X215cXFfTWdyLmluc3RhbmNlLm9wZW5WaWV3KFZpZXdEZWYuR2FtZU1haW5WaWV3LCBudWxsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xvc2VWaWV3KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgTmF0aXZlQ2FsbGJhY2suQ2FsbE5hdGl2ZUZ1bmMoXCJsb2FkTmV4dEFkXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2hvd1BoeXNpY2FsQW5pbShwaHlzaWNhbHM6IExheWEuVUlDb21wb25lbnQsIGxvZ286IExheWEuVUlDb21wb25lbnQsIHN0YXJ0UG9zOiBMYXlhLlBvaW50LCBlbmRQb3M6IExheWEuUG9pbnQsIG9mZnNldDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgc3RhcnRQb3MgPSBwaHlzaWNhbHMuZ2xvYmFsVG9Mb2NhbChzdGFydFBvcyk7XHJcbiAgICAgICAgZW5kUG9zID0gcGh5c2ljYWxzLmdsb2JhbFRvTG9jYWwoZW5kUG9zKTtcclxuICAgICAgICBsZXQgc2NhbGVDaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIExheWEuVHdlZW4uY2xlYXJBbGwobG9nbyk7XHJcbiAgICAgICAgICAgIGxvZ28uc2NhbGUoMSwxKTtcclxuICAgICAgICAgICAgTGF5YS5Ud2Vlbi5mcm9tKGxvZ28sIHtzY2FsZVg6IDEuNCwgc2NhbGVZOiAxLjR9LCAwLjIgKiAxMDAwLCBMYXlhLkVhc2UuYmFja091dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGh5c2ljYWxzLl9jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHBoeXNpY2Fscy5fY2hpbGRyZW5baV0gYXMgTGF5YS5VSUNvbXBvbmVudDtcclxuICAgICAgICAgICAgaXRlbS54ID0gc3RhcnRQb3MueDtcclxuICAgICAgICAgICAgaXRlbS55ID0gc3RhcnRQb3MueTtcclxuICAgICAgICAgICAgaXRlbS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgTGF5YS5Ud2Vlbi5jbGVhckFsbCh0aGlzKTtcclxuICAgICAgICAgICAgTGF5YS5Ud2Vlbi50byhpdGVtLCB7eDogc3RhcnRQb3MueCArIFV0aWxpdC5HZXRSYW5kb21OdW1iZXIoLW9mZnNldCwgb2Zmc2V0KSwgeTogc3RhcnRQb3MueSArIFV0aWxpdC5HZXRSYW5kb21OdW1iZXIoLW9mZnNldCwgb2Zmc2V0KX0sIDAuMTUgKiAxMDAwLCBudWxsLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIExheWEuVHdlZW4udG8oaXRlbSwge3g6IGVuZFBvcy54LCB5OiBlbmRQb3MueX0sICgwLjIgKyBNYXRoLnJhbmRvbSgpICogMC4zKSAqIDEwMDAsIG51bGwsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlQ2hhbmdlLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIExheWEuVHdlZW4uY2xlYXJBbGwodGhpcyk7XHJcbiAgICAgICAgTGF5YS50aW1lci5jbGVhckFsbCh0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICBFdmVudF9teXFxX01nci5pbnN0YW5jZS5yZW1vdmVFdmVudChFdmVudERlZi5SZXdhcmRWaWRlb0ZhaWwsdGhpcyx0aGlzLm9uUmV3YXJkVmlkZXdvRmFpbCk7XHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UucmVtb3ZlRXZlbnQoRXZlbnREZWYuUmV3YXJkVmlkZW9TdWNjZXNzLHRoaXMsdGhpcy5vblJld2FyZFZpZGV3b1N1Y2Nlc3MpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgR2FtZUNvbnRyb2xsZXIgZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IEV2ZW50X215cXFfTWdyIGZyb20gXCIuLi8uLi9FdmVudC9FdmVudE1nclwiO1xyXG5pbXBvcnQgeyBFdmVudERlZiB9IGZyb20gXCIuLi8uLi9FdmVudC9FdmVudERlZlwiO1xyXG5pbXBvcnQgVXRpbGl0IGZyb20gXCIuLi8uLi9VdGlsaXRcIjtcclxuaW1wb3J0IFZpZXdfbXlxcV9NZ3IsIHsgVmlld0RlZiB9IGZyb20gXCIuLi8uLi9NZ3IvVmlld01nclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVdvcmtWaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgcGxheVRpcDogTGF5YS5VSUNvbXBvbmVudDtcclxuICAgIHByaXZhdGUgdG91Y2hUaXA6IExheWEuVUlDb21wb25lbnQ7XHJcbiAgICBwcml2YXRlIHByb2dyZXNzQmFyOiBQcm9ncmVzc0JhciA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5U3RhdGVGbGFnczogTGF5YS5Cb3g7XHJcblxyXG4gICAgcHJpdmF0ZSBzb25nTmFtZTogTGF5YS5MYWJlbDtcclxuICAgIHByaXZhdGUgc29uZ1NvdXJjZTogTGF5YS5Gb250Q2xpcDtcclxuICAgIHByaXZhdGUgcGVyZmVjdENvdW50OiBMYXlhLkJveDtcclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudG91Y2hUaXAgPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiVG91Y2hcIikgYXMgTGF5YS5VSUNvbXBvbmVudDtcclxuICAgICAgICB0aGlzLnBsYXlUaXAgPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiQ29udGludWVQbGF5XCIpIGFzIExheWEuVUlDb21wb25lbnQ7XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiUHJvZ3Jlc3NCYXJcIik7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhciA9IG5ldyBQcm9ncmVzc0Jhcihub2RlIGFzIExheWEuSW1hZ2UpO1xyXG4gICAgICAgIHRoaXMucGxheVN0YXRlRmxhZ3MgPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiUGxheVN0YXRlRmxhZ3NcIikgYXMgTGF5YS5Cb3g7XHJcblxyXG4gICAgICAgIHRoaXMuc29uZ05hbWUgPSBVdGlsaXQuRmluZENoaWxkKHRoaXMub3duZXIsIFwiU29uZ05hbWUvTGFiZWxcIikgYXMgTGF5YS5MYWJlbDtcclxuICAgICAgICB0aGlzLnNvbmdTb3VyY2UgPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiU29uZ1NvdXJjZVwiKSBhcyBMYXlhLkZvbnRDbGlwO1xyXG4gICAgICAgIHRoaXMucGVyZmVjdENvdW50ID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIlBlcmZlY3RDb3VudFwiKSBhcyBMYXlhLkJveDtcclxuICAgIH1cclxuXHJcbiAgICBvblNob3coKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5SZXNldCgpO1xyXG4gICAgICAgIHRoaXMuU2hvd0dhbWVQbGF5KCk7XHJcbiAgICAgICAgdGhpcy5zb25nTmFtZS50ZXh0ID0gR2FtZUNvbnRyb2xsZXIuSW5zdGFuY2UuY3VycmVudFNvbmcuc29uZ05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb25nTmFtZS50ZXh0ID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNvbmdTb3VyY2UudmFsdWUgPSBcIjBcIjtcclxuICAgICAgICB0aGlzLnByb2dyZXNzQmFyLlJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5wbGF5VGlwLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRvdWNoVGlwLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBsYXlTdGF0ZUZsYWdzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBFdmVudF9teXFxX01nci5pbnN0YW5jZS5yZWdFdmVtdChFdmVudERlZi5HYW1lX0ZhaWx1cmUsIHRoaXMsIHRoaXMuT25HYW1lRmFpbHVyZSk7XHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UucmVnRXZlbXQoRXZlbnREZWYuR2FtZV9SZXN1cmdlbmNlLCB0aGlzLCB0aGlzLm9uUGxheVJlc3VyZ2VuY2UpXHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UucmVnRXZlbXQoRXZlbnREZWYuR2FtZV9TZXR0bGUsIHRoaXMsIHRoaXMub25HYW1lUGxheVN0YXRlKVxyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLnJlZ0V2ZW10KEV2ZW50RGVmLkdhbWVfU3RhdGVDaGFuZ2UsIHRoaXMsIHRoaXMuT25HYW1lU3RhdGVDaGFuZ2UpO1xyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLnJlZ0V2ZW10KEV2ZW50RGVmLkdhbWVfU29uZ1NvdXJjZUNoYW5nZSwgdGhpcywgdGhpcy5vblNvdXJjZUNoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIExheWEuVHdlZW4uY2xlYXJBbGwodGhpcyk7XHJcbiAgICAgICAgTGF5YS50aW1lci5jbGVhckFsbCh0aGlzKTtcclxuICAgICAgICBFdmVudF9teXFxX01nci5pbnN0YW5jZS5yZW1vdmVFdmVudChFdmVudERlZi5HYW1lX0ZhaWx1cmUsIHRoaXMsIHRoaXMuT25HYW1lRmFpbHVyZSk7XHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UucmVtb3ZlRXZlbnQoRXZlbnREZWYuR2FtZV9TZXR0bGUsIHRoaXMsIHRoaXMub25HYW1lUGxheVN0YXRlKVxyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLnJlbW92ZUV2ZW50KEV2ZW50RGVmLkdhbWVfUmVzdXJnZW5jZSwgdGhpcywgdGhpcy5vblBsYXlSZXN1cmdlbmNlKVxyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLnJlbW92ZUV2ZW50KEV2ZW50RGVmLkdhbWVfU3RhdGVDaGFuZ2UsIHRoaXMsIHRoaXMuT25HYW1lU3RhdGVDaGFuZ2UpO1xyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLnJlbW92ZUV2ZW50KEV2ZW50RGVmLkdhbWVfU29uZ1NvdXJjZUNoYW5nZSwgdGhpcywgdGhpcy5vblNvdXJjZUNoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgU2hvd1BlcmZlY3RDb3VudChjb3VudCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBsYWJlbCA9IHRoaXMucGVyZmVjdENvdW50LmdldENoaWxkQnlOYW1lKFwiTGFiZWxcIikgYXMgTGF5YS5Gb250Q2xpcDtcclxuICAgICAgICBsYWJlbC52YWx1ZSA9IGNvdW50O1xyXG4gICAgICAgIHRoaXMucGVyZmVjdENvdW50LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIExheWEudGltZXIub25jZSgxICogMTAwMCwgdGhpcywgdGhpcy5jbG9zZVBlcmZlY3RDb3VudCk7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi5jbGVhckFsbCh0aGlzLnBlcmZlY3RDb3VudCk7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi5mcm9tKHRoaXMucGVyZmVjdENvdW50LCB7c2NhbGVYOiAxLCBzY2FsZVk6IDF9LCAwLjIgKiAxMDAwLCBMYXlhLkVhc2UuYmFja091dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbG9zZVBlcmZlY3RDb3VudCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBlcmZlY3RDb3VudC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25Tb3VyY2VDaGFuZ2Uoc291cmNlLCBwcm9ncmVzcywgY29udGludW91c1BlcmZlY3QpIHtcclxuICAgICAgICB0aGlzLnNvbmdTb3VyY2UudmFsdWUgPSBzb3VyY2U7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5VcGRhdGVWYWx1ZShNYXRoLm1pbigxLCBwcm9ncmVzcykpO1xyXG4gICAgICAgIGlmIChjb250aW51b3VzUGVyZmVjdCA8IDMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlNob3dQZXJmZWN0Q291bnQoY29udGludW91c1BlcmZlY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uR2FtZVBsYXlTdGF0ZShzdWNjZWVkKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMucGxheVN0YXRlRmxhZ3MudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHdpbkZsYWcgPSB0aGlzLnBsYXlTdGF0ZUZsYWdzLmdldENoaWxkQnlOYW1lKFwiV2luXCIpIGFzIExheWEuVUlDb21wb25lbnQ7XHJcbiAgICAgICAgbGV0IGRlZmVhdGVkRmxhZyA9IHRoaXMucGxheVN0YXRlRmxhZ3MuZ2V0Q2hpbGRCeU5hbWUoXCJEZWZlYXRlZFwiKSBhcyBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHdpbkZsYWcudmlzaWJsZSA9IHN1Y2NlZWQ7XHJcbiAgICAgICAgZGVmZWF0ZWRGbGFnLnZpc2libGUgPSAhc3VjY2VlZDtcclxuICAgICAgICBMYXlhLlR3ZWVuLmNsZWFyQWxsKHRoaXMucGxheVN0YXRlRmxhZ3MpO1xyXG4gICAgICAgIExheWEuVHdlZW4uZnJvbSh0aGlzLnBsYXlTdGF0ZUZsYWdzLCB7eTogMH0sIDAuNyAqIDEwMDAsIExheWEuRWFzZS5iYWNrT3V0LCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5vbmNlKDUwMCwgdGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgVmlld19teXFxX01nci5pbnN0YW5jZS5vcGVuVmlldyhWaWV3RGVmLkdhbWVTZXR0bGVWaWV3LCBzdWNjZWVkLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jbG9zZVZpZXcoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgdGhpcy50b3VjaFRpcC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wbGF5VGlwLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBPbkdhbWVGYWlsdXJlKCk6IHZvaWQge1xyXG4gICAgICAgIExheWEudGltZXIub25jZSgxMDAwLCB0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIFZpZXdfbXlxcV9NZ3IuaW5zdGFuY2Uub3BlblZpZXcoVmlld0RlZi5HYW1lRmFpbHVyZVZpZXcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUGxheVJlc3VyZ2VuY2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wbGF5U3RhdGVGbGFncy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5TaG93R2FtZVBsYXkoKTtcclxuICAgIH1cclxuXHJcbiAgICBTaG93R2FtZVBsYXkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50b3VjaFRpcC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuTU9VU0VfRE9XTiwgdGhpcywgdGhpcy5PbkNsaWNrR2FtZVBsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIE9uQ2xpY2tHYW1lUGxheSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uR2FtZVBsYXlcIik7XHJcbiAgICAgICAgdGhpcy50b3VjaFRpcC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFHYW1lQ29udHJvbGxlci5JbnN0YW5jZS5pc0dhbWVpbmcpIHtcclxuICAgICAgICAgICAgR2FtZUNvbnRyb2xsZXIuSW5zdGFuY2UuR2FtZVBsYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lQ29udHJvbGxlci5JbnN0YW5jZS5CYWxsUnVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWEuc3RhZ2Uub2ZmKExheWEuRXZlbnQuTU9VU0VfRE9XTiwgdGhpcywgdGhpcy5PbkNsaWNrR2FtZVBsYXkpXHJcbiAgICB9XHJcblxyXG4gICAgT25HYW1lU3RhdGVDaGFuZ2Uobm90UGF1c2UpOiB2b2lkIHtcclxuICAgICAgICBpZiAobm90UGF1c2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTGF5YS5zdGFnZS5vZmYoTGF5YS5FdmVudC5NT1VTRV9ET1dOLCB0aGlzLCB0aGlzLk9uQ2xpY2tSZXN1bWVHYW1lKTtcclxuICAgICAgICB0aGlzLlNob3dHYW1lUGF1c2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBTaG93R2FtZVBhdXNlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGxheVRpcC52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRvdWNoVGlwLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIEdhbWVDb250cm9sbGVyLkluc3RhbmNlLlBhdXNlR2FtZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLCB0aGlzLCB0aGlzLk9uQ2xpY2tSZXN1bWVHYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBPbkNsaWNrUmVzdW1lR2FtZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uR2FtZVJlc3VtZVwiKTtcclxuICAgICAgICB0aGlzLnBsYXlUaXAudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudG91Y2hUaXAudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIEdhbWVDb250cm9sbGVyLkluc3RhbmNlLlJlc3VtZUdhbWUoKTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9mZihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sIHRoaXMsIHRoaXMuT25DbGlja1Jlc3VtZUdhbWUpXHJcbiAgICB9XHJcblxyXG4gICAgb25LZXlEb3duKGU6TGF5YS5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT0gTGF5YS5LZXlib2FyZC5RKSB7XHJcbiAgICAgICAgICAgIEdhbWVDb250cm9sbGVyLkluc3RhbmNlLlBhdXNlR2FtZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWVDb250cm9sbGVyLkluc3RhbmNlLlJlc3VtZUdhbWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFByb2dyZXNzQmFyIHtcclxuICAgIHByaXZhdGUgbGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1pbkxlZnQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbWluUmlnaHQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcHJvZ3Jlc3M6IExheWEuSW1hZ2U7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9ncmVzc0JhcjogTGF5YS5JbWFnZSkge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9ncmVzc0Jhci5nZXRDaGlsZEJ5TmFtZShcIlByb2dyZXNzXCIpIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgdGhpcy5taW5MZWZ0ID0gdGhpcy5wcm9ncmVzcy5sZWZ0O1xyXG4gICAgICAgIHRoaXMubWluUmlnaHQgPSB0aGlzLnByb2dyZXNzLnJpZ2h0O1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gcHJvZ3Jlc3NCYXIud2lkdGggLSB0aGlzLnByb2dyZXNzLmxlZnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZVZhbHVlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzLnJpZ2h0ID0gdGhpcy5sZW5ndGggLSB0aGlzLmxlbmd0aCAqIHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzLnJpZ2h0IDwgdGhpcy5taW5SaWdodClcclxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5yaWdodCA9IHRoaXMubWluUmlnaHQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzLmxlZnQgPCB0aGlzLm1pbkxlZnQpXHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MubGVmdCA9IHRoaXMubWluTGVmdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcy5sZWZ0ID0gdGhpcy5taW5MZWZ0O1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MucmlnaHQgPSB0aGlzLmxlbmd0aDtcclxuICAgIH1cclxufSIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vVmlld0Jhc2VcIjtcclxuaW1wb3J0IFZlcnNpb24sIHsgU29uZyB9IGZyb20gXCIuLi8uLi9HYW1lL1ZlcnNpb25cIjtcclxuaW1wb3J0IFV0aWxpdCBmcm9tIFwiLi4vLi4vVXRpbGl0XCI7XHJcbmltcG9ydCBWaWV3X215cXFfTWdyLCB7IFZpZXdEZWYgfSBmcm9tIFwiLi4vLi4vTWdyL1ZpZXdNZ3JcIjtcclxuaW1wb3J0IFNvdW5kTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZS9Tb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IFNvbmdTdG9yZUNlbGwgZnJvbSBcIi4vQ2VsbFZpZXcvU29uZ1N0b3JlQ2VsbFwiO1xyXG5pbXBvcnQgTmF0aXZlQ2FsbGJhY2sgZnJvbSBcIi4uLy4uL05hdGl2ZUNhbGxiYWNrXCI7XHJcbmltcG9ydCBFdmVudF9teXFxX01nciBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnRNZ3JcIjtcclxuaW1wb3J0IHsgRXZlbnREZWYgfSBmcm9tIFwiLi4vLi4vRXZlbnQvRXZlbnREZWZcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvbmdTdG9yZVZpZXcgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBzZWxlY3RJbmRleDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjdXJyU29uZ0JveDogTGF5YS5Cb3g7XHJcbiAgICBwcml2YXRlIHNvbmdMaXN0OiBMYXlhLkxpc3Q7XHJcbiAgICBwcml2YXRlIGJhY2tCdXR0b246IExheWEuSW1hZ2U7XHJcblxyXG4gICAgb25Bd2FrZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvbmdMaXN0ID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIlNvbmdMaXN0XCIpIGFzIExheWEuTGlzdDtcclxuICAgICAgICB0aGlzLmN1cnJTb25nQm94ID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIkN1cnJTb25nRGF0YVwiKSBhcyBMYXlhLkxpc3Q7XHJcbiAgICAgICAgdGhpcy5iYWNrQnV0dG9uID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIkJhY2tCdXR0b25cIikgYXMgTGF5YS5JbWFnZTtcclxuXHJcbiAgICAgICAgdGhpcy5zb25nTGlzdC52U2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zb25nTGlzdC5zZWxlY3RFbmFibGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc29uZ0xpc3QuZWxhc3RpY0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc29uZ0xpc3Quc2VsZWN0SGFuZGxlciA9IExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5PblNlbGVjdFNvbmcsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLnNvbmdMaXN0LnJlbmRlckhhbmRsZXIgPSBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMuT25SZW5kZXJTb25nTGlzdCwgbnVsbCwgZmFsc2UpO1xyXG5cclxuICAgICAgICB0aGlzLmJhY2tCdXR0b24ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5PbkNsaWNrQmFja0J1dHRvbik7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UucmVnRXZlbXQoRXZlbnREZWYuUmV3YXJkVmlkZW9GYWlsLHRoaXMsdGhpcy5vblJld2FyZFZpZGV3b0ZhaWwpO1xyXG4gICAgICAgIEV2ZW50X215cXFfTWdyLmluc3RhbmNlLnJlZ0V2ZW10KEV2ZW50RGVmLlJld2FyZFZpZGVvU3VjY2Vzcyx0aGlzLHRoaXMub25SZXdhcmRWaWRld29TdWNjZXNzKTtcclxuICAgIH1cclxuICAgIG9uU2hvdygpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2VsZWN0SW5kZXggPSBTb3VuZE1hbmFnZXIuSW5zdGFuY2UuR2V0TGFzdFBsYXlTb25nSW5kZXgoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdEluZGV4ID0gc2VsZWN0SW5kZXg7XHJcbiAgICAgICAgbGV0IHNvbmcgPSBWZXJzaW9uLnNvbmdzW3NlbGVjdEluZGV4XTtcclxuICAgICAgICB0aGlzLlNldEN1cnJTb25nRGF0YShzb25nKTtcclxuICAgICAgICB0aGlzLnNvbmdMaXN0LmFycmF5ID0gVmVyc2lvbi5zb25ncztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNldEN1cnJTb25nRGF0YShzb25nOiBTb25nKTogdm9pZCAge1xyXG4gICAgICAgIGxldCBuYW1lID0gVXRpbGl0LkZpbmRDaGlsZCh0aGlzLmN1cnJTb25nQm94LCBcIk5hbWUvTGFiZWxcIikgYXMgTGF5YS5MYWJlbDtcclxuICAgICAgICBsZXQgc3RhcnMgPSB0aGlzLmN1cnJTb25nQm94LmdldENoaWxkQnlOYW1lKFwiU3RhckxldmVsc1wiKSBhcyBMYXlhLkJveDtcclxuICAgICAgICBuYW1lLnRleHQgPSBzb25nLm5hbWU7XHJcbiAgICAgICAgbGV0IHNvbmdSZWNvcmQgPSBTb3VuZE1hbmFnZXIuSW5zdGFuY2UuR2V0U29uZ1JlY29yZChzb25nLm5hbWUpO1xyXG4gICAgICAgIGxldCBzdGFyTGV2ZWwgPSAoc29uZ1JlY29yZCA9PSBudWxsKSA/IDAgOiBzb25nUmVjb3JkLnN0YXJMZXZlbDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFyID0gc3RhcnMuZ2V0Q2hpbGRCeU5hbWUoXCJTdGFyXCIgKyBpKTtcclxuICAgICAgICAgICAgbGV0IGFjdGl2ZUZsYWcgPSBzdGFyLmdldENoaWxkQnlOYW1lKFwiQWN0aXZlXCIpIGFzIExheWEuVUlDb21wb25lbnQ7XHJcbiAgICAgICAgICAgIGFjdGl2ZUZsYWcudmlzaWJsZSA9IGkgPD0gc3RhckxldmVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBPblJlbmRlclNvbmdMaXN0KGNlbGw6IExheWEuQm94LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNvbmcgPSB0aGlzLnNvbmdMaXN0LmFycmF5W2luZGV4XSBhcyBTb25nO1xyXG4gICAgICAgIGxldCBzb25nQ2VsbCA9IGNlbGwuZ2V0Q29tcG9uZW50KFNvbmdTdG9yZUNlbGwpIGFzIFNvbmdTdG9yZUNlbGw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc29uZ0NlbGwuVXBkYXRlVmlldyhzb25nKTtcclxuICAgICAgICBzb25nQ2VsbC5BY3RpdmVTb25nKGluZGV4ID09IHRoaXMuc2VsZWN0SW5kZXgpO1xyXG5cclxuICAgICAgICBjZWxsLm9mZihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLk9uQ2xpY2tQbGF5KTtcclxuICAgICAgICBjZWxsLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuT25DbGlja1BsYXkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBPblNlbGVjdFNvbmcoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGxldCBjZWxscyA9IHRoaXMuc29uZ0xpc3QuY2VsbHM7XHJcbiAgICAgICAgbGV0IHNvbmcgPSB0aGlzLnNvbmdMaXN0LmFycmF5W2luZGV4XSBhcyBTb25nO1xyXG4gICAgICAgIGxldCBhY3RpdmVDZWxsID0gdGhpcy5zb25nTGlzdC5nZXRDZWxsKGluZGV4KTtcclxuXHJcbiAgICAgICAgU291bmRNYW5hZ2VyLkluc3RhbmNlLkF1ZGl0aW9uU29uZyhzb25nKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2VsbCA9IGNlbGxzW2ldXHJcbiAgICAgICAgICAgIGxldCBzb25nQ2VsbCA9IGNlbGxzW2ldLmdldENvbXBvbmVudChTb25nU3RvcmVDZWxsKSBhcyBTb25nU3RvcmVDZWxsO1xyXG4gICAgICAgICAgICBzb25nQ2VsbC5BY3RpdmVTb25nKGNlbGwgPT0gYWN0aXZlQ2VsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE9uQ2xpY2tQbGF5KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChMYXlhLkJyb3dzZXIub25BbmRyb2lkIHx8IExheWEuQnJvd3Nlci5vbklPUykge1xyXG4gICAgICAgICAgICBpZiAoIVNvdW5kTWFuYWdlci5JbnN0YW5jZS5DYW5QbGF5T25lKCkpIHtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZUNhbGxiYWNrLk5vd1ZpZGVvVHlwZSA9IFwiU3RvcmVTb25nXCI7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVDYWxsYmFjay5DYWxsTmF0aXZlRnVuYyhcInNob3dSZXdhcmRWaWRlb1wiKTtcclxuICAgICAgICAgICAgICAgIExheWEuU291bmRNYW5hZ2VyLm11dGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RJbmRleCAhPSB0aGlzLnNvbmdMaXN0LnNlbGVjdGVkSW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RJbmRleCA9IHRoaXMuc29uZ0xpc3Quc2VsZWN0ZWRJbmRleFxyXG4gICAgICAgICAgICB0aGlzLlNldEN1cnJTb25nRGF0YSh0aGlzLnNvbmdMaXN0LmFycmF5W3RoaXMuc2VsZWN0SW5kZXhdKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNvbmcgPSB0aGlzLnNvbmdMaXN0LmFycmF5W3RoaXMuc2VsZWN0SW5kZXhdO1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci5JbnN0YW5jZS5QbGF5U29uZyhzb25nLCB0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VWaWV3KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBvblJld2FyZFZpZGV3b0ZhaWwoKSB7XHJcbiAgICAgICAgaWYgKE5hdGl2ZUNhbGxiYWNrLk5vd1ZpZGVvVHlwZSA9PSBcIlN0b3JlU29uZ1wiKSB7XHJcbiAgICAgICAgICAgIFZpZXdfbXlxcV9NZ3IuaW5zdGFuY2Uub3BlblZpZXcoVmlld0RlZi5UaXBzVmlldywgXCJWaWRlbyBwbGF5YmFjayBmYWlsZWQuIGNhbid0IGVudGVyIGdhbWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblJld2FyZFZpZGV3b1N1Y2Nlc3MoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0SW5kZXggIT0gdGhpcy5zb25nTGlzdC5zZWxlY3RlZEluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5kZXggPSB0aGlzLnNvbmdMaXN0LnNlbGVjdGVkSW5kZXhcclxuICAgICAgICAgICAgdGhpcy5TZXRDdXJyU29uZ0RhdGEodGhpcy5zb25nTGlzdC5hcnJheVt0aGlzLnNlbGVjdEluZGV4XSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzb25nID0gdGhpcy5zb25nTGlzdC5hcnJheVt0aGlzLnNlbGVjdEluZGV4XTtcclxuICAgICAgICBTb3VuZE1hbmFnZXIuSW5zdGFuY2UuUGxheVNvbmcoc29uZywgdGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlVmlldygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIE9uQ2xpY2tVbmxvY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zb25nTGlzdC5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgT25DbGlja0JhY2tCdXR0b24oKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIFZpZXdfbXlxcV9NZ3IuaW5zdGFuY2Uub3BlblZpZXcoVmlld0RlZi5HYW1lTWFpblZpZXcsIG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5jbG9zZVZpZXcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICBFdmVudF9teXFxX01nci5pbnN0YW5jZS5yZW1vdmVFdmVudChFdmVudERlZi5SZXdhcmRWaWRlb0ZhaWwsdGhpcyx0aGlzLm9uUmV3YXJkVmlkZXdvRmFpbCk7XHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UucmVtb3ZlRXZlbnQoRXZlbnREZWYuUmV3YXJkVmlkZW9TdWNjZXNzLHRoaXMsdGhpcy5vblJld2FyZFZpZGV3b1N1Y2Nlc3MpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi9WaWV3QmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZ1ZpZXcgZXh0ZW5kcyBWaWV3QmFzZVxyXG57XHJcbiAgICBwcm90ZWN0ZWQgX3Byb2Nlc3NCYXJCZyA6IExheWEuQ2xpcDtcclxuICAgIHByb3RlY3RlZCBfcHJvY2Vzc0JhciA6IExheWEuQ2xpcDtcclxuICAgIHByb3RlY3RlZCBfYmcgOiBMYXlhLkNsaXA7XHJcbiAgICBwcm90ZWN0ZWQgX3ZhbHVlOiBMYXlhLkxhYmVsO1xyXG5cclxuICAgIHByb3RlY3RlZCBfcHJvY2Vzc1dpZHRoIDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBvbkF3YWtlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9iZyA9IHRoaXMub3duZXIuZ2V0Q2hpbGRCeU5hbWUoXCJCZ1wiKSBhcyBMYXlhLkNsaXA7XHJcbiAgICAgICAgdGhpcy5fcHJvY2Vzc0JhckJnID0gdGhpcy5fYmcuZ2V0Q2hpbGRCeU5hbWUoXCJwcm9jZXNzQmFyQmdcIikgYXMgTGF5YS5DbGlwO1xyXG4gICAgICAgIGlmKHRoaXMuX3Byb2Nlc3NCYXJCZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5fcHJvY2Vzc0JhckJnLmdldENoaWxkQnlOYW1lKFwiVmFsdWVcIikgYXMgTGF5YS5MYWJlbDtcclxuICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc0JhciA9IHRoaXMuX3Byb2Nlc3NCYXJCZy5nZXRDaGlsZEJ5TmFtZShcInByb2Nlc3NCYXJcIikgYXMgTGF5YS5DbGlwO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzV2lkdGggPSB0aGlzLl9wcm9jZXNzQmFyLndpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzQmFyID0gdGhpcy5fYmcuZ2V0Q2hpbGRCeU5hbWUoXCJwcm9jZXNzQmFyXCIpIGFzIExheWEuQ2xpcDtcclxuICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc1dpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uRW5hYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRXZlbnQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLmFkZEV2ZW50KCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlRXZlbnQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLnJlbW92ZUV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2JnLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9iZy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICBpZighdGhpcy5fcHJvY2Vzc0JhckJnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc1dpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFByb2Nlc3MocHJvY2VzcyA6IG51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZihwcm9jZXNzIDwgMCApXHJcbiAgICAgICAgICAgIHByb2Nlc3MgPSAwO1xyXG4gICAgICAgIGlmKHByb2Nlc3MgPiAxIClcclxuICAgICAgICAgICAgcHJvY2VzcyA9IDE7XHJcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5fcHJvY2Vzc1dpZHRoICogcHJvY2VzcztcclxuICAgICAgICBpZih3aWR0aCA8IDEpXHJcbiAgICAgICAgICAgIHdpZHRoID0gMTtcclxuICAgICAgICB0aGlzLl9wcm9jZXNzQmFyLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgbGV0IHRtZXAgPSBNYXRoLm1pbihNYXRoLm1heCgwLCBwcm9jZXNzKSwgMSk7XHJcbiAgICAgICAgaWYgKHRtZXAgPCAwKSB0bWVwID0gMDtcclxuICAgICAgICB0aGlzLl92YWx1ZS50ZXh0ID0gdG1lcCAqIDEwMCArIFwiJVwiO1xyXG4gICAgfVxyXG4gICAgXHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0dXJlUHJvY2Vzc0JhciBleHRlbmRzIExheWEuU2NyaXB0IHtcclxuXHJcbiAgICAvKiogQHByb3Age25hbWU6IHJlc1R5cGUsIHRpcHM6XCLlm77niYflnLDlnYBcIix0eXBlOnN0cmluZyxhY2NlcHQ6cmVzfSAqL1xyXG4gICAgcmVzVHlwZTpzdHJpbmcgPVwiXCI7XHJcblxyXG4gICAgLyoqIEBwcm9wIHtuYW1lOiBzcGVlZCwgdGlwczpcIui/m+W6puadoee8k+WKqOmAn+W6plwiLHR5cGU6aW50LGRlZmF1bHQ9NX0gKi9cclxuICAgIHNvb210aFNwZWVkOm51bWJlciA9IDU7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGV4dHVyZTtcclxuICAgIHByaXZhdGUgX2ltYWdlOiBMYXlhLlVJQ29tcG9uZW50O1xyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9jdXJWYWx1ZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IEN1cnJlbnRWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkF3YWtlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2ltYWdlID0gdGhpcy5vd25lciBhcyAgTGF5YS5VSUNvbXBvbmVudDtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl90ZXh0dXJlID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHRoaXMucmVzVHlwZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHRoaXMucmVzVHlwZSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0dXJlID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHRoaXMucmVzVHlwZSk7XHJcbiAgICAgICAgICAgIH0pLG51bGwsIExheWEuTG9hZGVyLklNQUdFLCAxKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jdXJWYWx1ZSA9IHRoaXMuTGVycCh0aGlzLl9jdXJWYWx1ZSwgdGhpcy5fdmFsdWUsIDEgLyA2MCAqIHRoaXMuc29vbXRoU3BlZWQpO1xyXG5cclxuICAgICAgICBpZiAoMSAtIHRoaXMuX2N1clZhbHVlIDw9IDAuMDEpXHJcbiAgICAgICAgICAgIHRoaXMuX2N1clZhbHVlID0gMTtcclxuXHJcbiAgICAgICAgdGhpcy5kcmF3KHRoaXMuX2N1clZhbHVlKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBMZXJwKG51bTEsIG51bTIsIHQpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBudW0xICsgdCAqIChudW0yIC0gbnVtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFZhbHVlKHZhbHVlOiBudW1iZXIsIGN1clZhbHVlID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlID4gMSlcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSAxO1xyXG4gICAgICAgIGlmIChjdXJWYWx1ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9jdXJWYWx1ZSA9IGN1clZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZHJhdyh2YWx1ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl90ZXh0dXJlID09IG51bGwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgeCA9IDAsIHkgPSAwO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSB0aGlzLl9pbWFnZS5oZWlnaHQ7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5faW1hZ2Uud2lkdGggKiB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9pbWFnZS5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgIC8vdGhpcy5nZXRUZXh0dXJlKHRoaXMuX3RleHR1cmUsIDAsIDAsIHRoaXMuX2ltYWdlLndpZHRoLCB0aGlzLl9pbWFnZS5oZWlnaHQpXHJcbiAgICAgICAgdGhpcy5faW1hZ2UuZ3JhcGhpY3MuZmlsbFRleHR1cmUodGhpcy5fdGV4dHVyZSwgeCwgeSwgd2lkdGgsIGhlaWdodCwgXCJuby1yZXBlYXRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUZXh0dXJlKHRleDogTGF5YS5UZXh0dXJlLCB4LHksd2lkdGgsaGVpZ2h0KTogTGF5YS5UZXh0dXJlIHtcclxuXHRcdGlmICh3aWR0aCA8PTApd2lkdGg9MTtcclxuXHRcdGlmIChoZWlnaHQgPD0wKWhlaWdodD0xO1xyXG5cdFx0dGV4LiRfR0lEIHx8ICh0ZXguJF9HSUQ9TGF5YS5VdGlscy5nZXRHSUQoKSlcclxuXHRcdHZhciB0ZXh0dXJlO1xyXG5cdFx0aWYgKCF0ZXh0dXJlIHx8ICF0ZXh0dXJlLl9nZXRTb3VyY2UoKSl7XHJcbiAgICAgICAgICAgIHRleHR1cmU9TGF5YS5UZXh0dXJlLmNyZWF0ZSh0ZXguYml0bWFwLHgseSx3aWR0aCxoZWlnaHQsMCwwLHRleC53aWR0aCx0ZXguaGVpZ2h0KTtcclxuICAgICAgICAgICAgdGV4dHVyZS53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICB0ZXh0dXJlLmhlaWdodCA9IGhlaWdodDtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0ZXh0dXJlO1xyXG5cdH1cclxufSIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vVmlld0Jhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpcHNfbXlxcV9WaWV3IGV4dGVuZHMgVmlld0Jhc2Vcclxue1xyXG4gICAgcHJvdGVjdGVkIF9iZyA6IExheWEuU3ByaXRlO1xyXG4gICAgcHJvdGVjdGVkIF90aXBzVGV4dCA6IExheWEuVGV4dDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoKTsgfVxyXG5cclxuICAgIG9uQXdha2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2JnID0gdGhpcy5vd25lci5nZXRDaGlsZEJ5TmFtZShcIkJnXCIpIGFzIExheWEuU3ByaXRlO1xyXG4gICAgICAgIHRoaXMuX2JnLnggPSBMYXlhLnN0YWdlLndpZHRoIC8gMiAtIHRoaXMuX2JnLndpZHRoIC8gMjtcclxuICAgICAgICB0aGlzLl90aXBzVGV4dCA9IHRoaXMuX2JnLmdldENoaWxkQnlOYW1lKFwiVGV4dFwiKSBhcyBMYXlhLlRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5WaWV3KGRhdGE/OiBhbnkpOiB2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9wZW5WaWV3KGRhdGEpO1xyXG4gICAgICAgIHRoaXMuc2V0X215cXFfVGlwc01zZyhkYXRhKTtcclxuICAgICAgICBMYXlhLnRpbWVyLmNsZWFyQWxsKHRoaXMpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBMYXlhLnRpbWVyLm9uY2UoMzAwMCx0aGlzLGZ1bmN0aW9uKClcclxuICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgIHNlbGYuY2xvc2VWaWV3KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICAvL+W8ueWHuuWQjuiuvue9ruiKgueCueS4uuacgOmrmOiKgueCuVxyXG4gICAgICAgIExheWEuc3RhZ2Uuc2V0Q2hpbGRJbmRleCh0aGlzLm93bmVyLCBMYXlhLnN0YWdlLl9jaGlsZHJlbi5sZW5ndGggLSAxKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0X215cXFfVGlwc01zZyhtc2cgOiBzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fdGlwc1RleHQudGV4dCA9IG1zZztcclxuICAgIH1cclxufSIsImltcG9ydCBWaWV3X215cXFfTWdyLCB7IFZpZXdEZWYgfSBmcm9tIFwiLi4vTWdyL1ZpZXdNZ3JcIjtcclxuaW1wb3J0IEV2ZW50X215cXFfTWdyIGZyb20gXCIuLi9FdmVudC9FdmVudE1nclwiO1xyXG5pbXBvcnQgeyBFdmVudERlZiB9IGZyb20gXCIuLi9FdmVudC9FdmVudERlZlwiO1xyXG5cclxuLy/nlYzpnaLln7rnsbvvvIzmiYDmnInlip/og73mqKHlnZfnlYzpnaLnu6fmib/kuo7ov5nkuKrnsbvjgILov5nnp43nsbvlnovnmoTnlYzpnaLkuI3og73ltYzlpZfjgIJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0Jhc2UgZXh0ZW5kcyBMYXlhLlNjcmlwdCBcclxue1xyXG4gICAgcHVibGljIG9uQ2xvc2VFdmVudCA6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIHB1YmxpYyBvbk9wZW5FdmVudCA6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IF92aWV3QmFzZSA6IGJvb2xlYW4gID0gdHJ1ZVxyXG4gICAgcHJvdGVjdGVkIF92aWV3RGVmIDogVmlld0RlZiA9IFZpZXdEZWYuTm9uZTtcclxuICAgIHByb3RlY3RlZCBfZGF0YSA6IGFueSA9IHt9O1xyXG5cclxuICAgIG9uQXdha2UoKTogdm9pZCB7XHJcbiAgICAgICAgLy/liKDpmaTml7boh6rliqjph4rmlL5cclxuICAgICAgICAodGhpcy5vd25lciBhcyBMYXlhLlZpZXcpLmF1dG9EZXN0cm95QXRDbG9zZWQgPSB0cnVlO1xyXG4gICAgICAgICh0aGlzLm93bmVyIGFzIExheWEuVmlldykuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudCgpO1xyXG4gICAgfVxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnQoKTtcclxuICAgIH1cclxuICAgIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBvcGVuVmlldyhkYXRhPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5zaG93KClcclxuICAgICAgICBFdmVudF9teXFxX01nci5pbnN0YW5jZS5kaXNwYXRjaChFdmVudERlZi5HYW1lX09uVmlld09wZW4se3ZpZXc6dGhpcy5fdmlld0RlZn0pXHJcbiAgICAgICAgaWYodGhpcy5vbk9wZW5FdmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMub25PcGVuRXZlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEV2ZW50KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlRXZlbnQoKSB7XHJcbiAgICAgICAgTGF5YS50aW1lci5jbGVhckFsbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VWaWV3KCkgXHJcbiAgICB7XHJcbiAgICAgICAgVmlld19teXFxX01nci5pbnN0YW5jZS5jbG9zZVZpZXcodGhpcy5fdmlld0RlZik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKVxyXG4gICAge1xyXG4gICAgICAgICh0aGlzLm93bmVyIGFzIExheWEuVmlldykudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25IaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3coKVxyXG4gICAge1xyXG4gICAgICAgICh0aGlzLm93bmVyIGFzIExheWEuVmlldykudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vblNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlld0lzSGlkZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLm93bmVyIGFzIExheWEuVmlldykuYWxwaGEgPT0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25IaWRlKCl7fVxyXG4gICAgcHJvdGVjdGVkIG9uU2hvdygpe31cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKClcclxuICAgIHtcclxuICAgICAgICBMYXlhLnRpbWVyLmNsZWFyQWxsKHRoaXMpO1xyXG4gICAgICAgIExheWEuVHdlZW4uY2xlYXJBbGwodGhpcyk7XHJcbiAgICAgICAgRXZlbnRfbXlxcV9NZ3IuaW5zdGFuY2UuZGlzcGF0Y2goRXZlbnREZWYuR2FtZV9PblZpZXdDbG9zZSx7dmlldzp0aGlzLl92aWV3RGVmfSlcclxuICAgICAgICBpZih0aGlzLm9uQ2xvc2VFdmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMub25DbG9zZUV2ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgV1hBUEkge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBhZFVuaXRJZCA9IFwiXCJcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgYmFubmVyQWRVbml0SWQgPSBcIlwiXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEluc0FkVW5pdElkID0gXCJcIlxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyB3eExvZ2luKG9uU3VjY2VzczogRnVuY3Rpb24sIG9uRmFpbDogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpIHtcclxuICAgICAgICAgICAgTGF5YS5Ccm93c2VyLndpbmRvdy53eC5sb2dpbihcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvZGUgPSByZXMuY29kZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2Vzcyhjb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55m76ZmG5oiQ5YqfLOiOt+WPluWIsGNvZGUgOiBcIiArIGNvZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5r+A5Yqx6KeG6aKRLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9pc1JlZ1Jld2FyZGVkVmlkZW9BZEV2ZW50ID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIF9vblJld2FyZGVkVmlkZW9BZEZhaWxlZDogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBfb25SZXdhcmRlZFZpZGVvQWRDbG9zZTogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBvblJld2FyZGVkVmlkZW9BZExvYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+a/gOWKseinhumikSDlub/lkYrliqDovb3lrozmiJAnKVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBvblJld2FyZGVkVmlkZW9BZEVycm9yKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5bm/5ZGK5Yqg6L295aSx6LSlJyArIGVycilcclxuICAgICAgICBpZiAoV1hBUEkuX29uUmV3YXJkZWRWaWRlb0FkRmFpbGVkKSB7XHJcbiAgICAgICAgICAgIFdYQVBJLl9vblJld2FyZGVkVmlkZW9BZEZhaWxlZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgb25SZXdhcmRlZFZpZGVvQWRDbG9zZShyZXMpIHtcclxuICAgICAgICBpZiAoKHJlcyAmJiByZXMuaXNFbmRlZCkgfHwgcmVzID09IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+a/gOWKseinhumikSDlt7LlrozmlbTop4LnnIsnKVxyXG4gICAgICAgICAgICBpZiAoV1hBUEkuX29uUmV3YXJkZWRWaWRlb0FkQ2xvc2UpIHtcclxuICAgICAgICAgICAgICAgIFdYQVBJLl9vblJld2FyZGVkVmlkZW9BZENsb3NlKHRydWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5pyq5a6M5pW06KeC55yLJylcclxuICAgICAgICAgICAgaWYgKFdYQVBJLl9vblJld2FyZGVkVmlkZW9BZENsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICBXWEFQSS5fb25SZXdhcmRlZFZpZGVvQWRDbG9zZShmYWxzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgcmVnUmV3YXJkZWRWaWRlb0FkRXZlbnQocmV3YXJkZWRWaWRlb0FkKSB7XHJcblxyXG4gICAgICAgIHJld2FyZGVkVmlkZW9BZC5vbkxvYWQoV1hBUEkub25SZXdhcmRlZFZpZGVvQWRMb2FkKVxyXG4gICAgICAgIHJld2FyZGVkVmlkZW9BZC5vbkVycm9yKFdYQVBJLm9uUmV3YXJkZWRWaWRlb0FkRXJyb3IpXHJcbiAgICAgICAgcmV3YXJkZWRWaWRlb0FkLm9uQ2xvc2UoV1hBUEkub25SZXdhcmRlZFZpZGVvQWRDbG9zZSlcclxuXHJcbiAgICAgICAgV1hBUEkuX2lzUmVnUmV3YXJkZWRWaWRlb0FkRXZlbnQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBzaG93UmV3YXJkZWRWaWRlb0FkKG9uQWRDbG9zZTogRnVuY3Rpb24sIG9uRmFpbGVkOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChMYXlhLkJyb3dzZXIub25NaW5pR2FtZSkge1xyXG4gICAgICAgICAgICBXWEFQSS5fb25SZXdhcmRlZFZpZGVvQWRDbG9zZSA9IG9uQWRDbG9zZTtcclxuICAgICAgICAgICAgV1hBUEkuX29uUmV3YXJkZWRWaWRlb0FkRmFpbGVkID0gb25GYWlsZWQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmV3YXJkZWRWaWRlb0FkID0gTGF5YS5Ccm93c2VyLndpbmRvd1tcInd4XCJdLmNyZWF0ZVJld2FyZGVkVmlkZW9BZChcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhZFVuaXRJZDogV1hBUEkuYWRVbml0SWQsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIVdYQVBJLl9pc1JlZ1Jld2FyZGVkVmlkZW9BZEV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBXWEFQSS5yZWdSZXdhcmRlZFZpZGVvQWRFdmVudChyZXdhcmRlZFZpZGVvQWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXdhcmRlZFZpZGVvQWQubG9hZCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSByZXdhcmRlZFZpZGVvQWQuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5bm/5ZGK5pi+56S65oiQ5YqfJykpO1xyXG4gICAgICAgICAgICAgICAgcHJvbWlzZS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkZWRWaWRlb0FkLmxvYWQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiByZXdhcmRlZFZpZGVvQWQuc2hvdygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5bm/5ZGK5pi+56S65aSx6LSlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkZhaWxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRmFpbGVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmv4DlirHop4bpopEg5bm/5ZGK5Yqg6L295aSx6LSlJylcclxuICAgICAgICAgICAgICAgIGlmIChvbkZhaWxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uRmFpbGVkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBvbkFkQ2xvc2UodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWwj+a4uOaIj+i3s+i9rC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHVibGljIHN0YXRpYyBuYXZpZ2F0ZVRvTWluaVByb2dyYW0oYXBwSWQ6IHN0cmluZywgcGF0aDogc3RyaW5nLCBvblN1Y2Nlc3M6IEZ1bmN0aW9uLCBvbkZhaWw6IEZ1bmN0aW9uLCBvbkNvbXBsYXRlOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChMYXlhLkJyb3dzZXIub25NaW5pR2FtZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIui3s+i9rOa4uOaIj++8miBcIiArIGFwcElkKTtcclxuICAgICAgICAgICAgTGF5YS5Ccm93c2VyLndpbmRvd1tcInd4XCJdLm5hdmlnYXRlVG9NaW5pUHJvZ3JhbShcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHBJZDogYXBwSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogcGF0aCxcclxuICAgICAgICAgICAgICAgICAgICBleHRyYURhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW52VmVyc2lvbjogJ3JlbGVhc2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvblN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzcyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRmFpbChyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25Db21wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGF0ZShyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLeWIhuS6qy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgX29uU2hvdzogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBfbGFzdFNoYXJlVGltZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgc2hhcmUoY29tcGxhdGU6IEZ1bmN0aW9uLCB0aXRlbDogc3RyaW5nLCBpbWFnZVVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKExheWEuQnJvd3Nlci5vbk1pbmlHYW1lKSB7XHJcbiAgICAgICAgICAgIFdYQVBJLl9vblNob3cgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBMYXlhLkJyb3dzZXIud2luZG93W1wid3hcIl0ub2ZmU2hvdyhXWEFQSS5fb25TaG93KVxyXG4gICAgICAgICAgICAgICAgV1hBUEkuX29uU2hvdyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB2YXIgYyA9IERhdGUubm93KCkgLSB0aGlzLl9sYXN0U2hhcmVUaW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKERhdGUubm93KCkgLSB0aGlzLl9sYXN0U2hhcmVUaW1lID4gMjAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGF0ZSh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxhdGUoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5vblNob3coV1hBUEkuX29uU2hvdylcclxuICAgICAgICAgICAgdGhpcy5fbGFzdFNoYXJlVGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5zaGFyZUFwcE1lc3NhZ2UoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGVsLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVXJsOiBpbWFnZVVybFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0t5o+S5bGP5bmV5bm/5ZGKLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwdWJsaWMgc3RhdGljIHNob3dJbnRlcnN0aXRpYWxBZChvbkFkQ2xvc2U6IEZ1bmN0aW9uLCBvbkZhaWxlZDogRnVuY3Rpb24pICB7XHJcbiAgICAgICAgaWYgKExheWEuQnJvd3Nlci5vbk1pbmlHYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnRlcnN0aXRpYWxBZCA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDogV1hBUEkuSW5zQWRVbml0SWQsXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBpbnRlcnN0aXRpYWxBZC5vbkxvYWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aPkuWxj+W5v+WRiiDliqDovb3lrozmiJAnKTtcclxuICAgICAgICAgICAgICAgIGludGVyc3RpdGlhbEFkLnNob3coKS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aPkuWxj+W5v+WRiiDmmL7npLrlpLHotKUg77yaJyArIGVycilcclxuICAgICAgICAgICAgICAgICAgICBpZiAob25GYWlsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25GYWlsZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgaW50ZXJzdGl0aWFsQWQub25FcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5o+S5bGP5bm/5ZGKIOWKoOi9veWksei0pScgKyBlcnIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9uRmFpbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25GYWlsZWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGludGVyc3RpdGlhbEFkLm9uQ2xvc2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+aPkuWxj+W5v+WRiiDlhbPpl60nKTtcclxuICAgICAgICAgICAgICAgIGlmIChvbkFkQ2xvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkFkQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG9uQWRDbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5b6X5Yiw5bCP56iL5bqP5ZCv5Yqo5Y+C5pWw55qE5ZCM5q2l5pa55rOV77yM5Y+v5b6X5Yiw5LiA5LiqT2JqZWN06L+U5Zue5YC877yM6L+U5Zue5YC85YW35L2T55qE5pWw5o2u57uT5p6E5Zyo5LiL6Z2i55qE5YiX6KGo5LitXHJcbiAgICAgKiBzY2VuZVx0bnVtYmVyXHTlkK/liqjlsI/muLjmiI/nmoTlnLrmma/lgLxcclxuICAgICAqIHF1ZXJ5XHRPYmplY3RcdOWQr+WKqOWwj+a4uOaIj+eahCBxdWVyeSDlj4LmlbBcclxuICAgICAqIHNoYXJlVGlja2V0XHRzdHJpbmdcdHNoYXJlVGlja2V077yM6K+m6KeB6I635Y+W5pu05aSa6L2s5Y+R5L+h5oGvXHJcbiAgICAgKiByZWZlcnJlckluZm9cdG9iamVjdFx05p2l5rqQ5L+h5oGv44CC5LuO5Y+m5LiA5Liq5bCP56iL5bqP44CB5YWs5LyX5Y+35oiWIEFwcCDov5vlhaXlsI/nqIvluo/ml7bov5Tlm57jgILlkKbliJnov5Tlm54ge31cclxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVycy53ZWl4aW4ucXEuY29tL21pbmlnYW1lL2Rldi9hcGkvYmFzZS9hcHAvbGlmZS1jeWNsZS93eC5nZXRMYXVuY2hPcHRpb25zU3luYy5odG1sXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcmV0dXJucyB7TGF1bmNoT3B0aW9uc30gXHJcbiAgICAgKiBAbWVtYmVyb2YgV1hBUElcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRMYXVuY2hPcHRpb25zU3luYygpIHtcclxuICAgICAgICAvLyBsZXQgcmVzdWx0ID0geyBzY2VuZTogMCwgcXVlcnk6IG51bGwsIHNoYXJlVGlja2V0OiBcIlwiLCByZWZlcnJlckluZm86IG51bGwgfTtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpIHtcclxuICAgICAgICAgICAgbGV0IG9iaiA9IExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5nZXRMYXVuY2hPcHRpb25zU3luYygpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Zy65pmv5YC8IFwiICsgb2JqLnNjZW5lKTtcclxuICAgICAgICAgICAgbGV0IHN0ciA9IEpTT04uc3RyaW5naWZ5KG9iai5xdWVyeSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUXVlcnnlj4LmlbAgXCIgKyBzdHIpO1xyXG4gICAgICAgICAgICBsZXQga2V5ID0gb2JqLnF1ZXJ5W1wia2V5XCJdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlF1ZXJ55Y+C5pWw77yaa2V5IFwiICsga2V5KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTaGFyZVRpY2tldCBcIiArIG9iai5zaGFyZVRpY2tldCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVmZXJyZXJJbmZvLmFwcElkIFwiICsgb2JqLnJlZmVycmVySW5mby5hcHBJZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVmZXJyZXJJbmZvLmV4dHJhRGF0YSBcIiArIG9iai5yZWZlcnJlckluZm8uZXh0cmFEYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9iaiA9IHsgc2NlbmU6IDEwMDEsIHF1ZXJ5OiBcIlwiLCBzaGFyZVRpY2tldDogXCJcIiwgYXBwSWQ6IFwiXCIsIGV4dHJhRGF0YTogXCJcIiB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA5b6u5L+h5bem5LiK6KeS5YiG5Lqr6L2s5Y+R54K55Ye75LqL5Lu2LOWcqOa4uOaIj+mAu+i+keS4reiwg+eUqOS4gOasoeWNs+WPr1xyXG4gICAgICog5rOo5oSP5q2k5pa55rOV5Y+q5Lya5Zyo55yf5py65LiK5omn6KGM77yM5Zyo5b6u5L+h5qih5ouf5Zmo546v5aKD5LiL54K55Ye76L2s5Y+R5oyJ6ZKu5LuA5LmI6YO95LiN5Lya5Y+R55SfXHJcbiAgICAgKiBcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0aXRlbCDliIbkuqvmoIfpophcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZVVybCDliIbkuqvlm77niYflnLDlnYBcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtzdWNjZXNzXSDmiJDlip/lm57osIPlh73mlbAo5Y+v5LiN5aGrKVxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZhaWxdIOWksei0peWbnuiwg+WHveaVsCjlj6/kuI3loaspXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGxhdGVdIOWujOaIkOWbnuiwg+WHveaVsO+8jOaIkOWKn+Wksei0pemDveS8muaJp+ihjCjlj6/kuI3loaspXHJcbiAgICAgKiBAbWVtYmVyb2YgV1hBUElcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTZXRTaGFyZU1lbnUodGl0ZWw6IHN0cmluZywgaW1hZ2VVcmw6IHN0cmluZywgc3VjY2Vzcz86IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24sIGNvbXBsYXRlPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoTGF5YS5Ccm93c2VyLm9uTWluaUdhbWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlsI/muLjmiI/orr7nva7ovazlj5HmjInpkq5cIik7XHJcbiAgICAgICAgICAgIExheWEuQnJvd3Nlci53aW5kb3dbXCJ3eFwiXS5zaG93U2hhcmVNZW51KHtcclxuICAgICAgICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBzdWNjZXNzLFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZmFpbCxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBjb21wbGF0ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgTGF5YS5Ccm93c2VyLndpbmRvd1tcInd4XCJdLm9uU2hhcmVBcHBNZXNzYWdlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGVsLFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVXJsOiBpbWFnZVVybFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG52YXIgUkVHOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcbmV4cG9ydCBtb2R1bGUgdWkuVmlldyB7XHJcbiAgICBleHBvcnQgY2xhc3MgTG9hZGluZ1VJIGV4dGVuZHMgU2NlbmUge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIlNjZW5lXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6MTA4MCxcInRvcFwiOjAsXCJyaWdodFwiOjAsXCJsZWZ0XCI6MCxcImhlaWdodFwiOjE5MjAsXCJib3R0b21cIjowfSxcImNvbXBJZFwiOjIsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6LTE3MixcInhcIjowLFwid2lkdGhcIjoxMDgwLFwic2tpblwiOlwiTG9hZGluZy9iZy5wbmdcIixcImhlaWdodFwiOjI4ODB9LFwiY29tcElkXCI6OX0se1widHlwZVwiOlwiQ2xpcFwiLFwicHJvcHNcIjp7XCJ0b3BcIjowLFwicmlnaHRcIjowLFwibmFtZVwiOlwiQmdcIixcImxlZnRcIjowLFwiYm90dG9tXCI6MH0sXCJjb21wSWRcIjo2LFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjEyNzMsXCJ4XCI6MjU4LFwic2tpblwiOlwiTG9hZGluZy/lvq7kv6Hlm77niYdfMjAxOTEwMjMxNTIxMzkxLnBuZ1wiLFwibmFtZVwiOlwicHJvY2Vzc0JhckJnXCJ9LFwiY29tcElkXCI6OCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkNsaXBcIixcInByb3BzXCI6e1wieVwiOjI0LFwieFwiOjIsXCJ3aWR0aFwiOjU2MCxcInNraW5cIjpcIkxvYWRpbmcv5b6u5L+h5Zu+54mHXzIwMTkxMDIzMTUyMTM5LnBuZ1wiLFwicGl2b3RZXCI6MjIsXCJuYW1lXCI6XCJwcm9jZXNzQmFyXCJ9LFwiY29tcElkXCI6NX0se1widHlwZVwiOlwiTGFiZWxcIixcInByb3BzXCI6e1wieVwiOi02NCxcInhcIjoxODUsXCJ3aWR0aFwiOjE5NCxcInZhbGlnblwiOlwibWlkZGxlXCIsXCJ0ZXh0XCI6XCIwLjAwJVwiLFwibmFtZVwiOlwiVmFsdWVcIixcImhlaWdodFwiOjUyLFwiZm9udFNpemVcIjo1MCxcImNvbG9yXCI6XCIjZmZmZmZmXCIsXCJhbGlnblwiOlwiY2VudGVyXCJ9LFwiY29tcElkXCI6MTB9XX1dfSx7XCJ0eXBlXCI6XCJTY3JpcHRcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcInJ1bnRpbWVcIjpcIlZpZXcvTG9hZGluZ1ZpZXcvTG9hZGluZ1ZpZXcudHNcIn0sXCJjb21wSWRcIjo3fV0sXCJsb2FkTGlzdFwiOltcIkxvYWRpbmcvYmcucG5nXCIsXCJMb2FkaW5nL+W+ruS/oeWbvueJh18yMDE5MTAyMzE1MjEzOTEucG5nXCIsXCJMb2FkaW5nL+W+ruS/oeWbvueJh18yMDE5MTAyMzE1MjEzOS5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExvYWRpbmdVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLlZpZXcuTG9hZGluZ1VJXCIsTG9hZGluZ1VJKTtcclxufVxyIl19
