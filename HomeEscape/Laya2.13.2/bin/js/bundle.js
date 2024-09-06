(function () {
    'use strict';

    class ryw_NetConfig {
    }
    ryw_NetConfig.ryw_state = 0;
    ryw_NetConfig.ryw_gameid = 38;
    ryw_NetConfig.ryw_serverUrl = "";
    ryw_NetConfig.ryw_Login = "";
    ryw_NetConfig.ryw_SaveGameData = "";
    ryw_NetConfig.ryw_GetUser = "";
    ryw_NetConfig.ryw_IpBlock = "";
    ryw_NetConfig.ryw_reportExport = "";
    ryw_NetConfig.ryw_reportImport = "";
    ryw_NetConfig.ryw_getuserip = "";
    ryw_NetConfig.ryw_signin = "";

    var EventDispatcher = Laya.EventDispatcher;
    class ryw_EventMgr extends EventDispatcher {
        constructor() {
            super();
        }
        ;
        ryw_dispatch(InName, agv) {
            ryw_EventMgr.ryw_eventDispatcher.event(InName, agv);
        }
        ryw_regEvemt(InName, caller, listener, arg) {
            ryw_EventMgr.ryw_eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
        }
        ryw_regOnceEvent(InName, caller, listener, arg) {
            ryw_EventMgr.ryw_eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
        }
        ryw_removeEvent(InName, caller, listener, arg) {
            ryw_EventMgr.ryw_eventDispatcher.off(InName, caller, listener);
        }
    }
    ryw_EventMgr.ryw_eventDispatcher = new EventDispatcher();
    ryw_EventMgr.ryw_instance = new ryw_EventMgr();

    var ryw_EventDef;
    (function (ryw_EventDef) {
        ryw_EventDef[ryw_EventDef["ryw_None"] = 0] = "ryw_None";
        ryw_EventDef[ryw_EventDef["ryw_App_CloseFirstLoadingView"] = 500] = "ryw_App_CloseFirstLoadingView";
        ryw_EventDef[ryw_EventDef["ryw_AD_OnShareAdFail"] = 501] = "ryw_AD_OnShareAdFail";
        ryw_EventDef[ryw_EventDef["ryw_Game_OnViewOpen"] = 600] = "ryw_Game_OnViewOpen";
        ryw_EventDef[ryw_EventDef["ryw_Game_OnViewClose"] = 601] = "ryw_Game_OnViewClose";
        ryw_EventDef[ryw_EventDef["ryw_Game_OnUserMoneyChange"] = 701] = "ryw_Game_OnUserMoneyChange";
        ryw_EventDef[ryw_EventDef["ryw_Game_OnUserCrystalChange"] = 702] = "ryw_Game_OnUserCrystalChange";
        ryw_EventDef[ryw_EventDef["Game_OnUserUnlockedStore"] = 703] = "Game_OnUserUnlockedStore";
        ryw_EventDef[ryw_EventDef["ryw_Game_OnLevelStart"] = 1000] = "ryw_Game_OnLevelStart";
        ryw_EventDef[ryw_EventDef["ryw_Game_OnLevelComplate"] = 1001] = "ryw_Game_OnLevelComplate";
        ryw_EventDef[ryw_EventDef["ryw_AD_WudianBanner_LoadComplete"] = 2217] = "ryw_AD_WudianBanner_LoadComplete";
        ryw_EventDef[ryw_EventDef["ryw_AD_WudianBanner_Show"] = 2218] = "ryw_AD_WudianBanner_Show";
        ryw_EventDef[ryw_EventDef["ryw_AD_WudianBanner_Hide"] = 2219] = "ryw_AD_WudianBanner_Hide";
        ryw_EventDef[ryw_EventDef["ryw_AD_WudianBanner_PreLoad"] = 2220] = "ryw_AD_WudianBanner_PreLoad";
        ryw_EventDef[ryw_EventDef["ryw_App_OnUpdateIpBlockState"] = 2221] = "ryw_App_OnUpdateIpBlockState";
        ryw_EventDef[ryw_EventDef["Game_OnMovePike"] = 10000] = "Game_OnMovePike";
        ryw_EventDef[ryw_EventDef["Game_onOver"] = 10001] = "Game_onOver";
        ryw_EventDef[ryw_EventDef["Game_onOverAction"] = 10002] = "Game_onOverAction";
        ryw_EventDef[ryw_EventDef["Game_onNextGame"] = 10003] = "Game_onNextGame";
        ryw_EventDef[ryw_EventDef["Game_onWarriorMove"] = 11000] = "Game_onWarriorMove";
        ryw_EventDef[ryw_EventDef["Game_onQueenStand"] = 11001] = "Game_onQueenStand";
        ryw_EventDef[ryw_EventDef["Game_onAllowTouch"] = 12000] = "Game_onAllowTouch";
        ryw_EventDef[ryw_EventDef["Game_onShowShade"] = 13000] = "Game_onShowShade";
        ryw_EventDef[ryw_EventDef["Game_onMoveShade"] = 13001] = "Game_onMoveShade";
        ryw_EventDef[ryw_EventDef["Game_onShowGuide"] = 14000] = "Game_onShowGuide";
        ryw_EventDef[ryw_EventDef["Game_onHideGuide"] = 14001] = "Game_onHideGuide";
        ryw_EventDef[ryw_EventDef["RewardVideoSuccess"] = 20010] = "RewardVideoSuccess";
        ryw_EventDef[ryw_EventDef["RewardVideoFail"] = 20011] = "RewardVideoFail";
        ryw_EventDef[ryw_EventDef["InsertVideoEnd"] = 20012] = "InsertVideoEnd";
    })(ryw_EventDef || (ryw_EventDef = {}));

    class ryw_UserGameData {
        constructor() {
            this.levelNum = 1;
            this.moneyNum = 0;
            this.crystalNum = 0;
            this.unlockedItem = [];
            this.usedItem = -1;
            this.levelData = new Array();
            this.localLeveData = new Array();
            this.winLevelData = new Array();
        }
    }
    class ryw_User extends Laya.Script {
        static get ryw_isLogin() {
            return (ryw_User.ryw_code != "") || (ryw_User.ryw_token != "");
        }
        static ryw_getSaveData() {
            return JSON.stringify(ryw_User.ryw__gameData);
        }
        static ryw_testInitUser() {
            var storageStr = Laya.LocalStorage.getItem("Game_Data");
            console.log("读取存储数据 str----" + storageStr);
            var data = JSON.parse(storageStr);
            if (data == null) {
                ryw_User.ryw__gameData.levelNum = 1;
                ryw_User.ryw__gameData.moneyNum = 0;
                ryw_User.ryw__gameData.crystalNum = 0;
                ryw_User.ryw__gameData.levelData = [];
                ryw_User.ryw__gameData.localLeveData = [];
                ryw_User.ryw__gameData.winLevelData = [];
                return;
            }
            ryw_User.ryw__gameData.levelNum = data.levelNum;
            ryw_User.ryw__gameData.moneyNum = data.moneyNum;
            ryw_User.ryw__gameData.crystalNum = data.crystalNum;
            ryw_User.ryw__gameData.levelData = data.levelData || [];
            ryw_User.ryw__gameData.localLeveData = data.localLeveData || [];
            ryw_User.ryw__gameData.winLevelData = data.winLevelData || [];
            if (null != data.unlockedItem) {
                let unlockedItem = data.unlockedItem;
                for (let i = 0; i < unlockedItem.length; ++i) {
                    ryw_User.ryw__gameData.unlockedItem.push(unlockedItem[i]);
                }
            }
            if (null != data.usedItem) {
                ryw_User.ryw__gameData.usedItem = data.usedItem;
            }
        }
        static ryw_initiUser(data) {
            console.log("*****************************  User initUser  **************************************  ");
            console.log(data);
            if (data && 0 != data) {
                ryw_User.ryw__gameData.levelNum = data.levelNum;
                ryw_User.ryw__gameData.moneyNum = data.moneyNum;
                ryw_User.ryw__gameData.crystalNum = data.crystalNum;
                ryw_User.ryw__gameData.levelData = data.levelData;
                ryw_User.ryw__gameData.localLeveData = data.localLeveData;
                ryw_User.ryw__gameData.winLevelData = data.winLevelData || [];
                if (null != data.unlockedItem) {
                    let unlockedItem = data.unlockedItem;
                    for (let i = 0; i < unlockedItem.length; ++i) {
                        ryw_User.ryw__gameData.unlockedItem.push(unlockedItem[i]);
                    }
                }
                if (null != data.usedItem) {
                    ryw_User.ryw__gameData.usedItem = data.usedItem;
                }
            }
            else {
            }
        }
        static setLevelData(data) {
            ryw_User.ryw__gameData.levelData = data;
        }
        static getLevelData() {
            return ryw_User.ryw__gameData.levelData;
        }
        static passLevel() {
            ryw_User.ryw__gameData.levelData.splice(0, 1);
            console.log("passLevel   ryw_User.ryw__gameData.levelData = ", ryw_User.ryw__gameData.levelData);
        }
        static setLocalLevelData(data) {
            ryw_User.ryw__gameData.localLeveData = data;
        }
        static getLocalLevelData() {
            return ryw_User.ryw__gameData.localLeveData;
        }
        static passLoaclLevel() {
            ryw_User.ryw__gameData.localLeveData.splice(0, 1);
            console.log("passLevel   ryw_User.ryw__gameData.localLeveData = ", ryw_User.ryw__gameData.localLeveData);
        }
        static setwinLevelData(data) {
            ryw_User.ryw__gameData.winLevelData = data;
        }
        static getwinLevelData() {
            return ryw_User.ryw__gameData.winLevelData;
        }
        static addwinLevel(num) {
            let index = ryw_User.ryw__gameData.winLevelData.indexOf(num);
            if (index == -1) {
                console.log("addwinLevel num = ", num);
                ryw_User.ryw__gameData.winLevelData.push(num);
            }
            console.log("addwinLevel   ryw_User.ryw__gameData.winLevelData = ", ryw_User.ryw__gameData.winLevelData);
        }
        static ryw_setLeveNum(levelNum) {
            ryw_User.ryw__gameData.levelNum = levelNum;
        }
        static ryw_getLeveNum() {
            return ryw_User.ryw__gameData.levelNum;
        }
        static ryw_addMoney(add) {
            add = Math.ceil(add);
            var last = ryw_User.ryw__gameData.moneyNum;
            ryw_User.ryw__gameData.moneyNum += add;
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_Game_OnUserMoneyChange, {
                curr: ryw_User.ryw__gameData.moneyNum,
                last: last
            });
        }
        static ryw_subMoney(sub) {
            sub = Math.ceil(sub);
            var last = ryw_User.ryw__gameData.moneyNum;
            ryw_User.ryw__gameData.moneyNum -= sub;
            if (ryw_User.ryw__gameData.moneyNum < 0) {
                ryw_User.ryw__gameData.moneyNum = 0;
            }
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_Game_OnUserMoneyChange, {
                curr: ryw_User.ryw__gameData.moneyNum,
                last: last
            });
        }
        static ryw_getMoney() {
            return ryw_User.ryw__gameData.moneyNum;
        }
        static ryw_addCrystal(add) {
            add = Math.ceil(add);
            var last = ryw_User.ryw__gameData.crystalNum;
            ryw_User.ryw__gameData.crystalNum += add;
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_Game_OnUserCrystalChange, {
                curr: ryw_User.ryw__gameData.crystalNum,
                last: last
            });
        }
        static ryw_subCrystal(sub) {
            sub = Math.ceil(sub);
            var last = ryw_User.ryw__gameData.crystalNum;
            ryw_User.ryw__gameData.crystalNum -= sub;
            if (ryw_User.ryw__gameData.crystalNum < 0) {
                ryw_User.ryw__gameData.crystalNum = 0;
            }
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_Game_OnUserCrystalChange, {
                curr: ryw_User.ryw__gameData.crystalNum,
                last: last
            });
        }
        static ryw_getCrystal() {
            return ryw_User.ryw__gameData.crystalNum;
        }
        static getItemUnlocked() {
            let unlocked = new Array();
            for (let i = 0; i < ryw_User.ryw__gameData.unlockedItem.length; ++i) {
                unlocked.push(ryw_User.ryw__gameData.unlockedItem[i]);
            }
            return unlocked;
        }
        static itemIsUnlocked(id) {
            for (let i = 0; i < ryw_User.ryw__gameData.unlockedItem.length; ++i) {
                if (ryw_User.ryw__gameData.unlockedItem[i] == id) {
                    return true;
                }
            }
            return false;
        }
        static unlockItem(id) {
            if (ryw_User.itemIsUnlocked(id)) {
                console.log("商店重复解锁 id : ", id);
                return;
            }
            ryw_User.ryw__gameData.unlockedItem.push(id);
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_OnUserUnlockedStore, { unlocked: id });
        }
        static get curUsedItem() {
            return ryw_User.ryw__gameData.usedItem;
        }
        static set curUsedItem(value) {
            ryw_User.ryw__gameData.usedItem = value;
        }
    }
    ryw_User.ryw_code = "";
    ryw_User.ryw_openId = "";
    ryw_User.ryw_token = null;
    ryw_User.ryw_nickName = "";
    ryw_User.ryw_gender = 0;
    ryw_User.ryw__gameData = new ryw_UserGameData();

    class ryw_AesTools {
        static ryw_encrypt(str) {
            return str;
        }
        static ryw_decrypt(str) {
            return str;
        }
    }
    ryw_AesTools.ryw_KEY = 'b#63fFJ6AvkK3YT*';
    ryw_AesTools.ryw_IV = 'J$f4DU%sNL73M&Go';

    class ryw_AppConfig {
    }
    ryw_AppConfig.ryw_AppID = "";
    ryw_AppConfig.ryw_ResServer = "";
    ryw_AppConfig.ryw_LocalTestReServer = "subRes";
    ryw_AppConfig.ryw_Versions = "0.0.0";
    ryw_AppConfig.onTTMiniGame = false;
    ryw_AppConfig.ryw_GameName = "";
    ryw_AppConfig.showLoadingLogo = false;

    class ryw_requestData {
        constructor() {
            this.ryw_meth = "post";
            this.ryw_url = "";
            this.ryw_onSuccess = null;
            this.ryw_onFail = null;
            this.ryw_data = {};
        }
    }
    class ryw_HttpUnit {
        static request(req) {
            if (req.ryw_url.indexOf("https://") > -1 ||
                req.ryw_url.indexOf("http://") > -1) {
                req.ryw_url = req.ryw_url;
            }
            else {
                req.ryw_url = ryw_NetConfig.ryw_serverUrl + req.ryw_url;
            }
            var completeFunc = (res) => {
                console.log(res, "http Success");
                if (req.ryw_onSuccess) {
                    req.ryw_onSuccess(res);
                }
                req.ryw_onSuccess = null;
                req = null;
            };
            var errorFunc = (res) => {
                console.log(res, "http fail");
                if (req.ryw_onFail) {
                    req.ryw_onFail(res);
                }
                req.ryw_onFail = null;
                req = null;
            };
            var xhr = new Laya.HttpRequest();
            xhr.once(Laya.Event.COMPLETE, ryw_HttpUnit, completeFunc);
            xhr.once(Laya.Event.ERROR, ryw_HttpUnit, errorFunc);
            let dataStr = JSON.stringify(req.ryw_data);
            if (Laya.Browser.onMiniGame || ryw_AppConfig.onTTMiniGame) {
                req.ryw_data.code = ryw_User.ryw_code;
            }
            else if (Laya.Browser.onQGMiniGame) {
                req.ryw_data.oppotoken = ryw_User.ryw_code;
            }
            else if (Laya.Browser.onQQMiniGame) {
                req.ryw_data.code = ryw_User.ryw_code;
            }
            else {
                req.ryw_data.code = ryw_User.ryw_code;
            }
            var time = "time=" + String(Date.now());
            var header = [
                "Content-Type", "application/json",
                "state", ryw_NetConfig.ryw_state,
                "gameid", ryw_NetConfig.ryw_gameid,
                "sign", ryw_AesTools.ryw_encrypt(time),
            ];
            if (ryw_User.ryw_token) {
                header.push("token");
                header.push(ryw_User.ryw_token);
            }
            xhr.send(req.ryw_url, JSON.stringify(req.ryw_data), req.ryw_meth, "json", header);
        }
        static ryw_login(onSuccess, onFail) {
            var req = new ryw_requestData();
            req.ryw_url = ryw_NetConfig.ryw_Login;
            req.ryw_onSuccess = onSuccess;
            req.ryw_onFail = onFail;
            ryw_HttpUnit.request(req);
        }
        static ryw_saveGameData(gameData, onSuccess, onFail) {
            var req = new ryw_requestData();
            req.ryw_url = ryw_NetConfig.ryw_SaveGameData;
            req.ryw_data.gameData = gameData;
            req.ryw_onSuccess = onSuccess;
            req.ryw_onFail = onFail;
            ryw_HttpUnit.request(req);
        }
        static ryw_getGameData(onSuccess, onFail) {
            var req = new ryw_requestData();
            req.ryw_url = ryw_NetConfig.ryw_GetUser;
            req.ryw_onSuccess = onSuccess;
            req.ryw_onFail = onFail;
            ryw_HttpUnit.request(req);
        }
        static ryw_GetIpBlock(onSuccess, onFail) {
            if (-1 != ryw_NetConfig.ryw_gameid) {
                var req = new ryw_requestData();
                req.ryw_url = ryw_NetConfig.ryw_IpBlock;
                req.ryw_onSuccess = onSuccess;
                req.ryw_onFail = onFail;
                ryw_HttpUnit.request(req);
            }
        }
        static ryw_reportExport(appid, game_name, onSuccess, onFail) {
            var req = new ryw_requestData();
            req.ryw_url = ryw_NetConfig.ryw_reportExport;
            req.ryw_data.wbappid = appid;
            req.ryw_data.game_name = game_name;
            req.ryw_onSuccess = onSuccess;
            req.ryw_onFail = onFail;
            ryw_HttpUnit.request(req);
        }
        static ryw_reportImport(appid, channel, onSuccess, onFail) {
            var req = new ryw_requestData();
            req.ryw_url = ryw_NetConfig.ryw_reportImport;
            req.ryw_data.wbappid = appid;
            req.ryw_data.channel = channel;
            req.ryw_onSuccess = onSuccess;
            req.ryw_onFail = onFail;
            ryw_HttpUnit.request(req);
        }
        static ryw_Getuserip(onSuccess, onFail) {
            var req = new ryw_requestData();
            req.ryw_url = ryw_NetConfig.ryw_getuserip;
            req.ryw_onSuccess = onSuccess;
            req.ryw_onFail = onFail;
            ryw_HttpUnit.request(req);
        }
        static SignIn(onSuccess, onFail) {
            var req = new ryw_requestData();
            req.ryw_url = ryw_NetConfig.ryw_signin;
            req.ryw_onSuccess = onSuccess;
            req.ryw_onFail = onFail;
            req.ryw_data.type = 1;
            ryw_HttpUnit.request(req);
        }
        static GetSignIn(onSuccess, onFail) {
            var req = new ryw_requestData();
            req.ryw_url = ryw_NetConfig.ryw_signin;
            req.ryw_onSuccess = onSuccess;
            req.ryw_onFail = onFail;
            req.ryw_data.type = 0;
            ryw_HttpUnit.request(req);
        }
    }

    class ryw_AppSwitchData {
        constructor() {
            this.ryw_version = "";
            this.ryw_banner = 0;
            this.ryw_wudian = 0;
            this.wudianAvailableTime = {
                "0": 0, "1": 0, "2": 0, "3": 0,
                "4": 0, "5": 0, "6": 0, "7": 0,
                "8": 0, "9": 0, "10": 0, "11": 0,
                "12": 0, "13": 0, "14": 0, "15": 0,
                "16": 0, "17": 0, "18": 0, "19": 0,
                "20": 0, "21": 0, "22": 0, "23": 0
            };
            this.ryw_mailiang = 1;
            this.ryw_mailianglist = new Array();
            this.ryw_mailiangSceneList = new Array();
            this.ryw_wxWuDianBanners = new Array();
            this.ryw_recreateBannerIDList = new Array();
            this.ryw_bannerRecreateTime = 5;
            this.ryw_kuangdianjiange = 0;
            this.ryw_btnMoveTimer = 1;
            this.ryw_bannerMoveTimer = 0.5;
            this.ryw_bannerFreshTimer = 200;
            this.ryw_bannerCreateFailNum = 3;
            this.ryw_bannerTodayBannerMax = 10;
            this.ryw_adSwitch = 1;
            this.ryw_wudianSceneList = new Array();
            this.ryw_continueBtnDelayTime = 2;
            this.ryw_bannerShowTime = 30;
            this.fakeBtn = 0;
            this.ryw_popAd = 0;
            this.ryw_continueBanner = 0;
            this.ryw_continueBannerShowTime = 2;
            this.ryw_continueBannerHideTime = 2;
            this.ryw_oppocfg = new ryw_OPPOCfg();
            this.ryw_qqcfg = new ryw_QQCfg();
            this.ryw_ttcfg = new ryw_TTCfg();
            this.ryw_vivocfg = new ryw_VVcfg();
            this.ryw_wxcfg = new WXCfg();
        }
        get wudianTimeAvaliable() {
            return this.wudianAvailableTime[new Date().getHours()] == 1;
        }
    }
    class WXCfg {
        constructor() {
            this.ryw_kuangdianBanner = 0;
            this.ryw_kuangdianLevelSpcacing = 0;
        }
    }
    class ryw_OPPOCfg {
        constructor() {
            this.ryw_yuansheng = 100;
            this.ryw_yuanshengSwitch = 1;
            this.ryw_addToDesktop = 0;
            this.ryw_oppoversions = "";
            this.ryw_btnShowTimer = 0;
            this.ryw_indexAdSwitch = 0;
            this.ryw_endAdSwitch = 0;
            this.ryw_yuansheng2 = 100;
            this.ryw_yuanshengSwitch2 = 1;
        }
    }
    class ryw_QQCfg {
        constructor() {
            this.ryw_kuangdianBanner = 0;
            this.ryw_kuangdianBox = 0;
            this.ryw_box = 0;
            this.ryw_weiyi = 0;
            this.ryw_qqversions = "";
        }
    }
    class ryw_TTCfg {
        constructor() {
            this.ryw_moreGameSwitch = 0;
            this.ryw_kuangdianBanner = 0;
            this.ryw_luping = 0;
            this.ryw_ttversions = "";
        }
    }
    class ryw_VVcfg {
        constructor() {
            this.ryw_yuanshengSwitch = 1;
            this.ryw_yuansheng = 100;
            this.ryw_yuanshengSwitch2 = 1;
            this.ryw_yuansheng2 = 100;
            this.ryw_chapingSwitch = 1;
            this.ryw_chaping = 100;
            this.ryw_addToDesktop = 1;
            this.ryw_vivoversions = "";
            this.btnShowTimer = 1;
        }
    }
    class ryw_AppSwitchConfig {
        constructor() {
            this.ryw__data = new Array();
        }
        static ryw_getInstance() {
            if (null == ryw_AppSwitchConfig.ryw__instance) {
                ryw_AppSwitchConfig.ryw__instance = ryw_AppSwitchConfig.ryw_load();
            }
            return ryw_AppSwitchConfig.ryw__instance;
        }
        static ryw_load() {
            var config = new ryw_AppSwitchConfig();
            var json = Laya.loader.getRes(ryw_AppConfig.ryw_ResServer + "/json/appswitch.json");
            console.log("********************************  AppSwitchConfig load   json ", json);
            if (json) {
                for (var i = 0; i < json.length; ++i) {
                    var row = json[i];
                    var rowData = new ryw_AppSwitchData();
                    rowData.ryw_version = String(row["version"]);
                    rowData.ryw_banner = Number(row["banner"]);
                    rowData.ryw_wudian = Number(row["wudian"]);
                    rowData.wudianAvailableTime = Object(row["wudianTime"]);
                    rowData.ryw_mailiang = Number(row["mailiang"]);
                    var mailianglist = row["mailianglist"];
                    if (null != mailianglist) {
                        for (var j = 0; j < mailianglist.length; ++j) {
                            var flag = Number(mailianglist[j]);
                            rowData.ryw_mailianglist.push(flag);
                        }
                    }
                    var mailiangScenelist = row["mailiangScenelist"];
                    if (null != mailiangScenelist) {
                        for (var j = 0; j < mailiangScenelist.length; ++j) {
                            var sceneValue = Number(mailiangScenelist[j]);
                            rowData.ryw_mailiangSceneList.push(sceneValue);
                        }
                    }
                    var wxwudianbanners = row["wxwudianbanners"];
                    if (null != wxwudianbanners) {
                        for (var j = 0; j < wxwudianbanners.length; ++j) {
                            let bannerid = String(wxwudianbanners[j]);
                            rowData.ryw_wxWuDianBanners.push(bannerid);
                        }
                    }
                    var recreateBannerIDList = row["recreateBannerIDList"];
                    if (null != recreateBannerIDList) {
                        for (var j = 0; j < recreateBannerIDList.length; ++j) {
                            let bannerid = String(recreateBannerIDList[j]);
                            rowData.ryw_recreateBannerIDList.push(bannerid);
                        }
                    }
                    rowData.ryw_bannerRecreateTime = null != row["bannerRecreateTime"] ? Number(row["bannerRecreateTime"]) : rowData.ryw_bannerRecreateTime;
                    rowData.ryw_kuangdianjiange = null != row["kuangdianjiange"] ? Number(row["kuangdianjiange"]) : rowData.ryw_kuangdianjiange;
                    rowData.ryw_btnMoveTimer = Number(row["btnMoveTimer"]);
                    rowData.ryw_bannerMoveTimer = Number(row["bannerMoveTimer"]);
                    rowData.ryw_bannerCreateFailNum = Number(row["createFailNum"]);
                    rowData.ryw_bannerFreshTimer = Number(row["bannerFreshTimer"]);
                    rowData.ryw_bannerTodayBannerMax = Number(row["todayBannerMax"]);
                    rowData.ryw_adSwitch = Number(row["adSwitch"]);
                    var wudianSceneList = row["wudianSceneList"];
                    if (null != wudianSceneList) {
                        for (var j = 0; j < wudianSceneList.length; ++j) {
                            var wudianSceneValue = Number(wudianSceneList[j]);
                            rowData.ryw_wudianSceneList.push(wudianSceneValue);
                        }
                    }
                    rowData.ryw_continueBtnDelayTime = Number(row["continueBtnDelayTime"]);
                    rowData.ryw_bannerShowTime = Number(row["bannerShowTime"]);
                    rowData.fakeBtn = null != row["fakeBtn"] ? Number(row["fakeBtn"]) : rowData.fakeBtn;
                    rowData.ryw_popAd = null != row["popAd"] ? Number(row["popAd"]) : rowData.ryw_popAd;
                    rowData.ryw_continueBanner = null != row["continueBanner"] ? Number(row["continueBanner"]) : rowData.ryw_continueBanner;
                    rowData.ryw_continueBannerShowTime = null != row["continueBannerShowTime"] ? Number(row["continueBannerShowTime"]) : rowData.ryw_continueBannerShowTime;
                    rowData.ryw_continueBannerHideTime = null != row["continueBannerHideTime"] ? Number(row["continueBannerHideTime"]) : rowData.ryw_continueBannerHideTime;
                    if (null != row["oppocfg"]) {
                        let cfg = row["oppocfg"];
                        rowData.ryw_oppocfg.ryw_yuansheng = Number(cfg["yuansheng"]);
                        rowData.ryw_oppocfg.ryw_yuanshengSwitch = Number(cfg["yuanshengSwitch"]);
                        rowData.ryw_oppocfg.ryw_addToDesktop = Number(cfg["addToDesktop"]);
                        rowData.ryw_oppocfg.ryw_oppoversions = String(cfg["oppoversions"]);
                        rowData.ryw_oppocfg.ryw_btnShowTimer = Number(cfg["btnShowTimer"]);
                        rowData.ryw_oppocfg.ryw_indexAdSwitch = Number(cfg["indexAdSwitch"]);
                        rowData.ryw_oppocfg.ryw_endAdSwitch = Number(cfg["endAdSwitch"]);
                        rowData.ryw_oppocfg.ryw_yuansheng2 = null != cfg["yuansheng2"] ? Number(cfg["yuansheng2"]) : rowData.ryw_oppocfg.ryw_yuansheng2;
                        rowData.ryw_oppocfg.ryw_yuanshengSwitch2 = null != cfg["yuanshengSwitch2"] ? Number(cfg["yuanshengSwitch2"]) : rowData.ryw_oppocfg.ryw_yuanshengSwitch2;
                    }
                    if (null != row["qqcfg"]) {
                        let cfg = row["qqcfg"];
                        rowData.ryw_qqcfg.ryw_kuangdianBanner = Number(cfg["kuangdianBanner"]);
                        rowData.ryw_qqcfg.ryw_kuangdianBox = Number(cfg["kuangdianBox"]);
                        rowData.ryw_qqcfg.ryw_box = Number(cfg["box"]);
                        rowData.ryw_qqcfg.ryw_weiyi = Number(cfg["weiyi"]);
                        rowData.ryw_qqcfg.ryw_qqversions = String(cfg["qqversions"]);
                    }
                    if (null != row["ttcfg"]) {
                        let cfg = row["ttcfg"];
                        rowData.ryw_ttcfg.ryw_moreGameSwitch = Number(cfg["moreGameSwitch"]);
                        rowData.ryw_ttcfg.ryw_kuangdianBanner = Number(cfg["kuangdianBanner"]);
                        rowData.ryw_ttcfg.ryw_luping = Number(cfg["luping"]);
                        rowData.ryw_ttcfg.ryw_ttversions = String(cfg["ttversions"]);
                    }
                    if (null != row["vivocfg"]) {
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
                    if (null != row["wxcfg"]) {
                        let cfg = row["wxcfg"];
                        rowData.ryw_wxcfg.ryw_kuangdianBanner = Number(cfg["kuangdianBanner"]);
                        rowData.ryw_wxcfg.ryw_kuangdianLevelSpcacing = Number(cfg["kuangdianLevelSpcacing"]);
                    }
                    config.ryw__data.push(rowData);
                }
                return config;
            }
            else {
                config.ryw__data.push(new ryw_AppSwitchData());
                return config;
            }
        }
        ryw_getAppSwitchData() {
            return this.ryw__data[0];
        }
    }

    class GameRecorder {
        constructor() {
            this._recorder = null;
        }
        get recorder() {
            return this._recorder;
        }
        start() {
            if (null != this.recorder) {
                this.recorder.start();
            }
        }
        stop() {
            if (null != this.recorder) {
                this.recorder.stop();
            }
        }
        pause() {
            if (null != this.recorder) {
                this.recorder.pause();
            }
        }
        resume() {
            if (null != this.recorder) {
                this.recorder.resume();
            }
        }
        abort() {
            if (null != this.recorder) {
                this.recorder.abort();
            }
        }
        showShareBtn() {
            if (null != this.recorder) {
                let button = Laya.Browser.window["wx"].createGameRecorderShareButton({
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
                    image: 'button.jpg',
                    text: '自定义文案',
                    icon: 'icon.jpg',
                    share: {
                        query: 'a=1&b=2',
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
        }
    }
    class ryw_WXAPI {
        static ryw_wxLogin(onSuccess, onFail) {
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window.wx.login({
                    success: (res) => {
                        if (res.code) {
                            let code = res.code;
                            onSuccess(code);
                            console.log("登陆成功,获取到code : " + code);
                        }
                    }
                });
            }
        }
        static ryw_onRewardedVideoAdLoad() {
            console.log('激励视频 广告加载完成');
        }
        static ryw_onRewardedVideoAdError(err) {
            console.log('激励视频 广告加载失败' + err);
            if (ryw_WXAPI.ryw__onRewardedVideoAdFailed) {
                ryw_WXAPI.ryw__onRewardedVideoAdFailed();
            }
        }
        static ryw_onRewardedVideoAdClose(res) {
            if ((res && res.isEnded) || res == null) {
                console.log('激励视频 已完整观看');
                if (ryw_WXAPI.ryw__onRewardedVideoAdClose) {
                    ryw_WXAPI.ryw__onRewardedVideoAdClose(true);
                }
            }
            else {
                console.log('激励视频 未完整观看');
                if (ryw_WXAPI.ryw__onRewardedVideoAdClose) {
                    ryw_WXAPI.ryw__onRewardedVideoAdClose(false);
                }
            }
        }
        static ryw_regRewardedVideoAdEvent(rewardedVideoAd) {
            rewardedVideoAd.onLoad(ryw_WXAPI.ryw_onRewardedVideoAdLoad);
            rewardedVideoAd.onError(ryw_WXAPI.ryw_onRewardedVideoAdError);
            rewardedVideoAd.onClose(ryw_WXAPI.ryw_onRewardedVideoAdClose);
            ryw_WXAPI.ryw__isRegRewardedVideoAdEvent = true;
        }
        static ryw_showRewardedVideoAd(onAdClose, onFailed) {
            if (Laya.Browser.onMiniGame) {
                ryw_WXAPI.ryw__onRewardedVideoAdClose = onAdClose;
                ryw_WXAPI.ryw__onRewardedVideoAdFailed = onFailed;
                var rewardedVideoAd = Laya.Browser.window["wx"].createRewardedVideoAd({
                    adUnitId: ryw_WXAPI.ryw_adUnitId,
                });
                if (!ryw_WXAPI.ryw__isRegRewardedVideoAdEvent) {
                    ryw_WXAPI.ryw_regRewardedVideoAdEvent(rewardedVideoAd);
                }
                rewardedVideoAd.load().then(() => {
                    var promise = rewardedVideoAd.show();
                    promise.then(() => console.log('激励视频 广告显示成功'));
                    promise.catch((err) => {
                        rewardedVideoAd.load()
                            .then(() => rewardedVideoAd.show())
                            .catch(err => {
                            console.log('激励视频 广告显示失败');
                            if (onFailed) {
                                onFailed();
                            }
                        });
                    });
                }).catch(err => {
                    console.log('激励视频 广告加载失败');
                    if (onFailed) {
                        onFailed();
                    }
                });
            }
            else {
                onAdClose(true);
            }
        }
        static ryw_navigateToMiniProgram(appId, path, onSuccess, onFail, onComplate) {
            if (Laya.Browser.onMiniGame) {
                console.log("跳转游戏： " + appId);
                Laya.Browser.window["wx"].navigateToMiniProgram({
                    appId: appId,
                    path: path,
                    extraData: {
                        foo: 'bar'
                    },
                    envVersion: 'release',
                    success(res) {
                        if (onSuccess) {
                            onSuccess(res);
                        }
                    },
                    fail(res) {
                        if (onFail) {
                            onFail(res);
                        }
                    },
                    complete(res) {
                        if (onComplate) {
                            onComplate(res);
                        }
                    }
                });
            }
        }
        static ryw_share(complate, titel, imageUrl) {
            if (Laya.Browser.onMiniGame) {
                ryw_WXAPI.ryw__onShow = () => {
                    Laya.Browser.window["wx"].offShow(ryw_WXAPI.ryw__onShow);
                    ryw_WXAPI.ryw__onShow = null;
                    var c = Date.now() - this.ryw__lastShareTime;
                    if (complate) {
                        if (Date.now() - this.ryw__lastShareTime > 2000) {
                            complate(true);
                        }
                        else {
                            complate(false);
                        }
                    }
                };
                Laya.Browser.window["wx"].onShow(ryw_WXAPI.ryw__onShow);
                ryw_WXAPI.ryw__lastShareTime = Date.now();
                Laya.Browser.window["wx"].shareAppMessage({
                    title: titel,
                    imageUrl: imageUrl
                });
            }
        }
        static ryw_showInterstitialAd(onAdClose, onFailed) {
            if (Laya.Browser.onMiniGame) {
                var interstitialAd = Laya.Browser.window["wx"].createInterstitialAd({
                    adUnitId: ryw_WXAPI.ryw_InsAdUnitId,
                });
                interstitialAd.onLoad(() => {
                    console.log('插屏广告 加载完成');
                    interstitialAd.show().catch((err) => {
                        console.log('插屏广告 显示失败 ：' + err);
                        if (onFailed) {
                            onFailed();
                        }
                    });
                });
                interstitialAd.onError((err) => {
                    console.log('插屏广告 加载失败' + err);
                    if (onFailed) {
                        onFailed();
                    }
                });
                interstitialAd.onClose(() => {
                    console.log('插屏广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                });
            }
            else {
                onAdClose();
            }
        }
        static ryw_getLaunchOptionsSync() {
            if (Laya.Browser.onMiniGame) {
                let obj = Laya.Browser.window["wx"].getLaunchOptionsSync();
                console.log("场景值 " + obj.scene);
                let str = JSON.stringify(obj.query);
                console.log("Query参数 " + str);
                let key = obj.query["key"];
                console.log("Query参数：key " + key);
                console.log("ShareTicket " + obj.shareTicket);
                console.log("ReferrerInfo.appId " + obj.referrerInfo.appId);
                console.log("ReferrerInfo.extraData " + obj.referrerInfo.extraData);
                return obj;
            }
            let obj = { scene: 1001, query: "", shareTicket: "", appId: "", extraData: "" };
            return obj;
        }
        static ryw_SetShareMenu(titel, imageUrl, success, fail, complate) {
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
        }
        static ryw_checkUpdate() {
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
        }
        static tryShowWXCrazyClick(titel, onComplete, onSuccess, onFail) {
            if (!ryw_WudianMgr.ryw_WudianFlag || 1 != ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wxcfg.ryw_kuangdianBanner) {
                if (onFail) {
                    onFail();
                }
                return;
            }
            let kuangdianLevelSpcacing = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wxcfg.ryw_kuangdianLevelSpcacing;
            if (0 != kuangdianLevelSpcacing) {
                let left = ryw_WXAPI._crazyClickShowCounter % kuangdianLevelSpcacing;
                if (0 == left) {
                    ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_WXCrazyClick, {
                        Complete: onComplete,
                        titel: titel
                    }, (v) => {
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
                ++ryw_WXAPI._crazyClickShowCounter;
            }
            else {
                ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_WXCrazyClick, {
                    Complete: onComplete,
                    titel: titel
                }, (v) => {
                    if (onSuccess) {
                        onSuccess();
                    }
                });
            }
        }
    }
    ryw_WXAPI.ryw_adUnitId = "adunit-a97731c5fea902b9";
    ryw_WXAPI.ryw_bannerAdUnitId = "adunit-e848f3f13116bdc4";
    ryw_WXAPI.ryw_InsAdUnitId = "";
    ryw_WXAPI.GameRecorder = new GameRecorder();
    ryw_WXAPI.ryw__isRegRewardedVideoAdEvent = false;
    ryw_WXAPI.ryw__onRewardedVideoAdFailed = null;
    ryw_WXAPI.ryw__onRewardedVideoAdClose = null;
    ryw_WXAPI.ryw__onShow = null;
    ryw_WXAPI.ryw__lastShareTime = 0;
    ryw_WXAPI._crazyClickShowCounter = 0;

    class ryw_QQMiniGameAPI {
        static ryw_Login(onSuccess, onFail) {
            if (Laya.Browser.onQQMiniGame) {
                Laya.Browser.window["qq"].login({
                    success: (res) => {
                        if (res.code) {
                            let code = res.code;
                            onSuccess(code);
                            console.log("登陆成功,获取到code : " + code);
                        }
                    }
                });
            }
        }
        static ryw_onRewardedVideoAdLoad() {
            console.log('激励视频 广告加载完成');
        }
        static ryw_onRewardedVideoAdError(err) {
            console.log('激励视频 广告加载失败' + err);
            if (ryw_QQMiniGameAPI.ryw__onRewardedVideoAdFailed) {
                ryw_QQMiniGameAPI.ryw__onRewardedVideoAdFailed();
            }
        }
        static ryw_onRewardedVideoAdClose(res) {
            if ((res && res.isEnded) || res == null) {
                console.log('激励视频 已完整观看');
                if (ryw_QQMiniGameAPI.ryw__onRewardedVideoAdClose) {
                    ryw_QQMiniGameAPI.ryw__onRewardedVideoAdClose(true);
                }
            }
            else {
                console.log('激励视频 未完整观看');
                if (ryw_QQMiniGameAPI.ryw__onRewardedVideoAdClose) {
                    ryw_QQMiniGameAPI.ryw__onRewardedVideoAdClose(false);
                }
            }
        }
        static ryw_regRewardedVideoAdEvent(rewardedVideoAd) {
            rewardedVideoAd.onLoad(ryw_QQMiniGameAPI.ryw_onRewardedVideoAdLoad);
            rewardedVideoAd.onError(ryw_QQMiniGameAPI.ryw_onRewardedVideoAdError);
            rewardedVideoAd.onClose(ryw_QQMiniGameAPI.ryw_onRewardedVideoAdClose);
            ryw_QQMiniGameAPI.ryw__isRegRewardedVideoAdEvent = true;
        }
        static ryw_showRewardedVideoAd(onAdClose, onFailed) {
            if (Laya.Browser.onQQMiniGame) {
                ryw_QQMiniGameAPI.ryw__onRewardedVideoAdClose = onAdClose;
                ryw_QQMiniGameAPI.ryw__onRewardedVideoAdFailed = onFailed;
                var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd({
                    adUnitId: ryw_QQMiniGameAPI.ryw_adUnitId,
                });
                if (!ryw_QQMiniGameAPI.ryw__isRegRewardedVideoAdEvent) {
                    ryw_QQMiniGameAPI.ryw_regRewardedVideoAdEvent(rewardedVideoAd);
                }
                rewardedVideoAd.load().then(() => {
                    var promise = rewardedVideoAd.show();
                    promise.then(() => console.log('激励视频 广告显示成功'));
                    promise.catch((err) => {
                        rewardedVideoAd.load()
                            .then(() => rewardedVideoAd.show())
                            .catch(err => {
                            console.log('激励视频 广告显示失败');
                            if (onFailed) {
                                onFailed();
                            }
                        });
                    });
                }).catch(err => {
                    console.log('激励视频 广告加载失败');
                    if (onFailed) {
                        onFailed();
                    }
                });
            }
            else {
                onAdClose(true);
            }
        }
        static ryw_navigateToMiniProgram(appId, path, onSuccess, onFail, onComplate) {
            if (Laya.Browser.onQQMiniGame) {
                console.log("跳转游戏： " + appId);
                Laya.Browser.window["qq"].navigateToMiniProgram({
                    appId: appId,
                    path: path,
                    extraData: {
                        foo: 'bar'
                    },
                    envVersion: 'release',
                    success(res) {
                        if (onSuccess) {
                            onSuccess(res);
                        }
                    },
                    fail(res) {
                        if (onFail) {
                            onFail(res);
                        }
                    },
                    complete(res) {
                        if (onComplate) {
                            onComplate(res);
                        }
                    }
                });
            }
        }
        static ryw_share(complate, titel, imageUrl) {
            if (Laya.Browser.onQQMiniGame) {
                ryw_QQMiniGameAPI.ryw__onShow = () => {
                    Laya.Browser.window["qq"].offShow(ryw_QQMiniGameAPI.ryw__onShow);
                    ryw_QQMiniGameAPI.ryw__onShow = null;
                    var c = Date.now() - this.ryw__lastShareTime;
                    if (complate) {
                        if (Date.now() - this.ryw__lastShareTime > 2000) {
                            complate(true);
                        }
                        else {
                            complate(false);
                        }
                    }
                };
                Laya.Browser.window["qq"].onShow(ryw_QQMiniGameAPI.ryw__onShow);
                ryw_QQMiniGameAPI.ryw__lastShareTime = Date.now();
                Laya.Browser.window["qq"].shareAppMessage({
                    title: titel,
                    imageUrl: imageUrl
                });
            }
        }
        static ryw_showInterstitialAd(onAdClose, onFailed) {
            if (Laya.Browser.onQQMiniGame) {
                var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                    adUnitId: ryw_QQMiniGameAPI.ryw_InsAdUnitId,
                });
                let _onLoad = () => {
                    console.log('插屏广告 加载完成');
                    interstitialAd.show().catch((err) => {
                        console.log('插屏广告 显示失败 ：' + err);
                        interstitialAd.offLoad(_onLoad);
                        interstitialAd.offError(_onError);
                        interstitialAd.offClose(_onClose);
                        interstitialAd.destroy();
                        if (onFailed) {
                            onFailed();
                        }
                    });
                };
                interstitialAd.onLoad(_onLoad);
                let _onError = (err) => {
                    console.log('插屏广告 加载失败' + err);
                    interstitialAd.offLoad(_onLoad);
                    interstitialAd.offError(_onError);
                    interstitialAd.offClose(_onClose);
                    interstitialAd.destroy();
                    if (onFailed) {
                        onFailed();
                    }
                };
                interstitialAd.onError(_onError);
                let _onClose = () => {
                    console.log('插屏广告 关闭');
                    interstitialAd.offLoad(_onLoad);
                    interstitialAd.offError(_onError);
                    interstitialAd.offClose(_onClose);
                    interstitialAd.destroy();
                    if (onAdClose) {
                        onAdClose();
                    }
                };
                interstitialAd.onClose(_onClose);
            }
            else {
                onAdClose();
            }
        }
        static ryw_LoadAppBoxAd(onAdClose, onFailed) {
            if (Laya.Browser.onQQMiniGame) {
                ryw_QQMiniGameAPI.ryw_mAppboxAd = Laya.Browser.window["qq"].createAppBox({
                    adUnitId: ryw_QQMiniGameAPI.ryw_AppBoxId,
                });
                ryw_QQMiniGameAPI.ryw_mAppboxAd.load().then(() => {
                    console.log('盒子广告 加载完成');
                });
                ryw_QQMiniGameAPI.ryw_mAppboxAd.onError((err) => {
                    console.log('盒子广告 加载失败' + err);
                    if (onFailed) {
                        onFailed();
                    }
                });
                ryw_QQMiniGameAPI.ryw_onBoxAdClose = () => {
                    console.log('盒子广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                };
                ryw_QQMiniGameAPI.ryw_mAppboxAd.onClose(ryw_QQMiniGameAPI.ryw_onBoxAdClose);
            }
            else {
                onAdClose();
            }
        }
        static ryw_showAppBoxAd(onFailed, onAdClose) {
            if (ryw_QQMiniGameAPI.ryw_mAppboxAd) {
                console.log("显示盒子广告");
                ryw_QQMiniGameAPI.ryw_mAppboxAd.offClose(ryw_QQMiniGameAPI.ryw_onBoxAdClose);
                ryw_QQMiniGameAPI.ryw_onBoxAdClose = () => {
                    console.log('盒子广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                };
                ryw_QQMiniGameAPI.ryw_mAppboxAd.onClose(ryw_QQMiniGameAPI.ryw_onBoxAdClose);
                ryw_QQMiniGameAPI.ryw_mAppboxAd.show().catch((err) => {
                    console.log('盒子广告 显示失败 ：' + err);
                    if (onFailed) {
                        onFailed();
                    }
                });
            }
            else {
                ryw_QQMiniGameAPI.ryw_LoadAppBoxAd(onAdClose, onFailed);
            }
        }
        static ryw_getLaunchOptionsSync() {
            if (Laya.Browser.onQQMiniGame) {
                let obj = Laya.Browser.window["qq"].getLaunchOptionsSync();
                console.log("场景值 " + obj.scene);
                let str = JSON.stringify(obj.query);
                console.log("Query参数 " + str);
                let key = obj.query["key"];
                console.log("Query参数：key " + key);
                console.log("ShareTicket " + obj.shareTicket);
                console.log("ReferrerInfo.appId " + obj.referrerInfo.appId);
                console.log("ReferrerInfo.extraData " + obj.referrerInfo.extraData);
                return obj;
            }
            let obj = { scene: 1001, query: "", shareTicket: "", appId: "", extraData: "" };
            return obj;
        }
        static ryw_SetShareMenu(titel, imageUrl, success, fail, complate) {
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
        }
        static showQQCreazyClick(data, onSuccess, onFail) {
            let launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
            let noEnterBySearch = true;
            let wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
            for (let i = 0; i < wudianSceneList.length; ++i) {
                let wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            let ipBlocked = ryw_WudianMgr.ryw_GetIpBlocked();
            let wudian = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudian;
            let kuangdianBanner = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_kuangdianBanner;
            if (ryw_AppConfig.ryw_Versions == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_qqversions
                && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBanner) {
                ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_QQCrazyClickView, data, () => {
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
        }
        static showQQCreazyClick2(data, onSuccess, onFail) {
            let launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
            let noEnterBySearch = true;
            let wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
            for (let i = 0; i < wudianSceneList.length; ++i) {
                let wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            let ipBlocked = ryw_WudianMgr.ryw_GetIpBlocked();
            let wudian = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudian;
            let kuangdianBox = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_kuangdianBox;
            if (ryw_AppConfig.ryw_Versions == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_qqversions
                && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBox) {
                ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_QQCrazyClickView2, data, () => {
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
        }
    }
    ryw_QQMiniGameAPI.ryw_adUnitId = "";
    ryw_QQMiniGameAPI.ryw_bannerAdUnitId = "";
    ryw_QQMiniGameAPI.ryw_InsAdUnitId = "";
    ryw_QQMiniGameAPI.ryw_AppBoxId = "";
    ryw_QQMiniGameAPI.ryw__isRegRewardedVideoAdEvent = false;
    ryw_QQMiniGameAPI.ryw__onRewardedVideoAdFailed = null;
    ryw_QQMiniGameAPI.ryw__onRewardedVideoAdClose = null;
    ryw_QQMiniGameAPI.ryw__onShow = null;
    ryw_QQMiniGameAPI.ryw__lastShareTime = 0;
    ryw_QQMiniGameAPI.ryw_mAppboxAd = null;
    ryw_QQMiniGameAPI.ryw_onBoxAdClose = null;

    class ryw_WudianMgr {
        static ryw_IpBlockFlag() {
            return ryw_WudianMgr.ryw__ipBlockFlag;
        }
        static ryw_UpdateIpBlockState() {
            ryw_HttpUnit.ryw_GetIpBlock(function (res) {
                console.log("调用IpBlock接口成功,结果为:", res);
                ryw_WudianMgr.ryw__ipBlockFlag = res.code;
                ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_App_OnUpdateIpBlockState, { ipBlockFlag: ryw_WudianMgr.ryw__ipBlockFlag });
            }, null);
        }
        static ryw_GetIpBlocked() {
            return ryw_WudianMgr.ryw__ipBlockFlag == 0;
        }
        static ryw_GetEntryScene() {
            return ryw_WXAPI.ryw_getLaunchOptionsSync().scene == 1006;
        }
        static ryw_IsSwitchOpen() {
            let mainSwitch = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudian == 1;
            let isOpenTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().wudianTimeAvaliable;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "打开时间", isOpenTime);
            return mainSwitch && isOpenTime;
        }
        static get ryw_WudianFlag() {
            let mainSwitch = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudian == 1;
            let launchScene = null;
            if (Laya.Browser.onMiniGame) {
                launchScene = ryw_WXAPI.ryw_getLaunchOptionsSync().scene;
            }
            else if (Laya.Browser.onQQMiniGame) {
                launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
            }
            let noEnterBySearch = true;
            var wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
            for (var i = 0; i < wudianSceneList.length; ++i) {
                var wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            let isOpenTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().wudianTimeAvaliable;
            let ipnotBlock = ryw_WudianMgr.ryw__ipBlockFlag == 0;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock, "打开时间", isOpenTime);
            return mainSwitch && noEnterBySearch && ipnotBlock && isOpenTime;
        }
        static get ryw_NoTimeWudianFlag() {
            let mainSwitch = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudian == 1;
            let launchScene = null;
            if (Laya.Browser.onMiniGame) {
                launchScene = ryw_WXAPI.ryw_getLaunchOptionsSync().scene;
            }
            else if (Laya.Browser.onQQMiniGame) {
                launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
            }
            let noEnterBySearch = true;
            var wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
            for (var i = 0; i < wudianSceneList.length; ++i) {
                var wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            let ipnotBlock = ryw_WudianMgr.ryw__ipBlockFlag == 0;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
            return mainSwitch && noEnterBySearch && ipnotBlock;
        }
    }
    ryw_WudianMgr.ryw__ipBlockFlag = -1;

    var ryw_ViewDef;
    (function (ryw_ViewDef) {
        ryw_ViewDef["ryw_None"] = "";
        ryw_ViewDef["ryw_TipsView"] = "View/TipsView.json";
        ryw_ViewDef["ryw_ClickGetPrize"] = "View/ClickGetPrize.json";
        ryw_ViewDef["ryw_MainView"] = "View/Template/MainViewTemplate.json";
        ryw_ViewDef["ryw_MiniGameView"] = "View/Template/MiniGameViewTemplate.json";
        ryw_ViewDef["ryw_RewardView"] = "View/Template/RewardViewTemplate.json";
        ryw_ViewDef["ryw_InGameView"] = "View/Template/InGameViewTemplate.json";
        ryw_ViewDef["ryw_GameWinView"] = "View/Template/GameWinViewTemplate.json";
        ryw_ViewDef["ryw_GameFailView"] = "View/Template/GameFailViewTemplate.json";
        ryw_ViewDef["ryw_ExportView"] = "View/Template/ExportViewTemplate.json";
        ryw_ViewDef["ryw_Export2View"] = "View/Template/Export2ViewTemplate.json";
        ryw_ViewDef["ryw_Export3View"] = "View/Template/Export3ViewTemplate.json";
        ryw_ViewDef["ryw_WXCrazyClick"] = "View/Template/WXCrazyClick.json";
        ryw_ViewDef["ryw_OPPONativeView"] = "View/Template/OPPONativeViewTemplate.json";
        ryw_ViewDef["ryw_QQCrazyClickView"] = "View/Template/QQ/QQCrazyClick.json";
        ryw_ViewDef["ryw_QQCrazyClickView2"] = "View/Template/QQ/QQCrazyClick2.json";
        ryw_ViewDef["ryw_TTStoreView"] = "View/Template/TT/TTStore.json";
        ryw_ViewDef["ryw_TTSignInView"] = "View/Template/TT/TTSignIn.json";
        ryw_ViewDef["TTRewardView"] = "View/Template/TT/TTReward.json";
        ryw_ViewDef["VVNativeView1"] = "View/Template/VV/VVNativeView1Template.json";
        ryw_ViewDef["VVNativeView2"] = "View/Template/VV/VVNativeView2Template.json";
        ryw_ViewDef["GameView"] = "subRes/GameView.scene";
    })(ryw_ViewDef || (ryw_ViewDef = {}));
    class ryw_ViewMgr {
        constructor() {
            this.ryw__views = {};
            this.ryw__loadingList = new Array();
        }
        ryw_openView(viewType, data, oncomplate) {
            if (this.ryw__views[viewType]) {
                var view = this.ryw__views[viewType];
                let coms = view._components;
                let viewBase = null;
                if (coms) {
                    for (let index = 0; index < coms.length; index++) {
                        const element = coms[index];
                        if (element._viewBase) {
                            viewBase = element;
                            viewBase.ryw_openView(data);
                            break;
                        }
                    }
                }
                if (oncomplate) {
                    oncomplate(viewBase);
                }
                return;
            }
            for (let i = 0; i < this.ryw__loadingList.length; ++i) {
                let def = this.ryw__loadingList[i];
                if (def == viewType) {
                    console.log("界面 : " + String(def) + " 正在加载中，请不要重复加载");
                    return;
                }
            }
            var viewUrl = String(viewType);
            var self = this;
            this.ryw__loadingList.push(viewType);
            Laya.Scene.load(viewUrl, Laya.Handler.create(this, function (owner) {
                Laya.stage.addChild(owner);
                var view = owner;
                self.ryw__views[viewType] = view;
                let coms = owner._components;
                let viewBase = null;
                if (coms) {
                    for (let index = 0; index < coms.length; index++) {
                        const element = coms[index];
                        if (element._viewBase) {
                            viewBase = element;
                            element._viewDef = viewType;
                            viewBase.ryw_openView(data);
                            break;
                        }
                    }
                }
                for (let i = 0; i < self.ryw__loadingList.length; ++i) {
                    let def = self.ryw__loadingList[i];
                    if (def == viewType) {
                        self.ryw__loadingList.splice(i, 1);
                        break;
                    }
                }
                if (oncomplate) {
                    oncomplate(viewBase);
                }
            }));
        }
        ryw_closeView(viewType) {
            var view = this.ryw__views[viewType];
            if (view) {
                var owner = view;
                let coms = owner._components;
                if (coms) {
                    for (let index = 0; index < coms.length; index++) {
                        const element = coms[index];
                        if (element._viewBase) {
                            element.onClose();
                            break;
                        }
                    }
                }
                view.removeSelf();
                view.destroy();
                this.ryw__views[viewType] = null;
            }
        }
        ryw_ShowView(viewType) {
            var view = this.ryw__views[viewType];
            if (view) {
                let coms = view._components;
                if (coms) {
                    for (let index = 0; index < coms.length; index++) {
                        const element = coms[index];
                        if (element._viewBase) {
                            element.ryw_show();
                            break;
                        }
                    }
                }
            }
        }
        ryw_hideView(viewType) {
            var view = this.ryw__views[viewType];
            if (view) {
                let coms = view._components;
                if (coms) {
                    for (let index = 0; index < coms.length; index++) {
                        const element = coms[index];
                        if (element._viewBase) {
                            element.ryw_hide();
                            break;
                        }
                    }
                }
            }
        }
        ryw_getView(viewType) {
            return this.ryw__views[viewType];
        }
        ryw_showTips(msg) {
            this.ryw_openView(ryw_ViewDef.ryw_TipsView, msg);
        }
        tryShowPopAd(complate) {
            if (1 == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_popAd && ryw_WudianMgr.ryw_WudianFlag) {
                ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_Export3View, null, (v) => {
                    if (null != complate)
                        complate(v);
                });
            }
            else {
                if (null != complate)
                    complate(null);
            }
        }
    }
    ryw_ViewMgr.ryw_instance = new ryw_ViewMgr();

    class ryw_OPPOAPI {
        static get ryw_BannerInstance() {
            return ryw_OPPOAPI.ryw__banner;
        }
        static ryw_Login(onSuccess, onFail) {
            if (Laya.Browser.onQGMiniGame) {
                Laya.Browser.window["qg"].login({
                    success: (res) => {
                        let token = res.data.token;
                        onSuccess(token);
                        console.log("OPPO 登陆成功,获取到 token : " + token);
                        for (var key in res) {
                            console.log(key, res[key]);
                        }
                    },
                    fail: (res) => {
                        console.log("OPPO 登陆失败", res);
                        for (var key in res) {
                            console.log(key, res[key]);
                        }
                    }
                });
            }
        }
        static ryw_initAdService(onSuccess, onFail, onComplete) {
            Laya.Browser.window["qg"].initAdService({
                appId: ryw_AppConfig.ryw_AppID,
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
        }
        static ryw_showRewardedVideoAd(onAdClose, onFailed) {
            if (Laya.Browser.onQGMiniGame) {
                var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                    posId: ryw_OPPOAPI.ryw_adUnitId,
                });
                videoAd.onLoad(() => {
                    console.log("oppo 视频广告加载完成");
                    videoAd.show();
                });
                videoAd.onVideoStart(() => {
                    console.log("oppo 视频广告开始播放");
                });
                videoAd.onClose((res) => {
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
                videoAd.onError((err) => {
                    console.log("oppo 视频广告获取失败", err);
                    videoAd.destroy();
                    onFailed();
                });
                videoAd.load();
            }
            else {
                onAdClose(true);
            }
        }
        static ryw_navigateToMiniProgram(pkgName, gameName, path, onSuccess, onFail, onComplate) {
            if (Laya.Browser.onQGMiniGame) {
                console.log("OPPO 跳转游戏： " + pkgName);
                ryw_HttpUnit.ryw_reportExport(pkgName, gameName, (result) => {
                    if (1 == result.code) {
                        console.log("OPPO 导出上报成功");
                    }
                    else {
                        console.log("OPPO 导出上报失败", result.msg);
                    }
                }, (result) => {
                    console.log("OPPO 导出上报失败");
                    for (var key in result) {
                        console.log(key, result[key]);
                    }
                });
                let time = Date.now();
                while (Date.now() - time <= 500) {
                }
                Laya.Browser.window["qg"].navigateToMiniGame({
                    pkgName: pkgName,
                    path: path,
                    extraData: {
                        from: ryw_AppConfig.ryw_AppID
                    },
                    envVersion: 'release',
                    success(res) {
                        if (onSuccess) {
                            onSuccess(res);
                        }
                    },
                    fail(res) {
                        if (onFail) {
                            onFail(res);
                        }
                    },
                });
            }
        }
        static ryw_showInterstitialAd(onAdClose, onFailed) {
            if (Laya.Browser.onQGMiniGame) {
                var insertAd = qg.createInsertAd({
                    posId: ryw_OPPOAPI.ryw_InsAdUnitId
                });
                insertAd.load();
                insertAd.onLoad(() => {
                    console.log("插屏广告加载完成");
                    insertAd.show();
                });
                insertAd.onShow(() => {
                    console.log("插屏广告显示成功");
                });
                insertAd.onError((err) => {
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
        }
        static ryw_showBannaer() {
            if (ryw_OPPOAPI.ryw__banner) {
                ryw_OPPOAPI.ryw__banner.show();
                return;
            }
            var bannerAd = qg.createBannerAd({
                posId: ryw_OPPOAPI.ryw_bannerAdUnitId
            });
            bannerAd.show();
            ryw_OPPOAPI.ryw__banner = bannerAd;
        }
        static ryw_hideBanner() {
            if (ryw_OPPOAPI.ryw__banner) {
                ryw_OPPOAPI.ryw__banner.hide();
            }
        }
        static ryw_destroyBanner() {
            if (ryw_OPPOAPI.ryw__banner) {
                ryw_OPPOAPI.ryw__banner.destroy();
            }
            ryw_OPPOAPI.ryw__banner = null;
        }
        static ryw_getLaunchOptionsSync() {
            let obj = { query: "", referrerInfo: { package: "", extraData: { appid: "" } } };
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
        }
        static ryw_share(complate, titel, imageUrl) {
            complate(false);
        }
        static ryw_createDesktopIcon(onSuccess, onFail) {
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
        }
        static ryw_autoPopCreateDestopIcon(onSuccess, onFail) {
            if (!Laya.Browser.onQGMiniGame) {
                if (null != onFail) {
                    onFail();
                }
                return;
            }
            let rate = Math.floor(Math.random() * 100);
            if (rate <= ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_oppocfg.ryw_addToDesktop) {
                ryw_OPPOAPI.ryw_createDesktopIcon(onSuccess, onFail);
            }
            else {
                if (null != onFail) {
                    onFail();
                }
            }
        }
        static ryw_showNativeAd(onSuccess, onFail) {
            if (!Laya.Browser.onQGMiniGame) {
                if (null != onFail) {
                    onFail();
                }
                return;
            }
            if (1 == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_oppocfg.ryw_yuanshengSwitch) {
                ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_OPPONativeView, null, (v) => {
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
        }
    }
    ryw_OPPOAPI.ryw_adUnitId = "";
    ryw_OPPOAPI.ryw_bannerAdUnitId = "";
    ryw_OPPOAPI.ryw_InsAdUnitId = "";
    ryw_OPPOAPI.ryw_OpenScreenAdUnitId = "";
    ryw_OPPOAPI.ryw_NativeAdId = "";
    ryw_OPPOAPI.ryw__banner = null;

    class ryw_MaiLiang {
        static ryw_request(req) {
            if (req.ryw_url.indexOf("https://") > -1 ||
                req.ryw_url.indexOf("http://") > -1) {
                req.ryw_url = req.ryw_url;
            }
            else {
                req.ryw_url = ryw_MaiLiang.ryw_mainUrl + req.ryw_url;
            }
            var completeFunc = (res) => {
                console.log(res, "MaiLiang http Success");
                res = JSON.parse(res);
                if (res.Status == "200") {
                    if (res.Result["OpenId"] != null && res.Result["OpenId"] != "") {
                        ryw_MaiLiang.ryw_MaiLiangOpenId = res.Result["OpenId"];
                        ryw_MaiLiang.ryw_time = req.ryw_data.posttime;
                        console.log("获得买量系统OpenId " + ryw_MaiLiang.ryw_MaiLiangOpenId);
                    }
                    else {
                        console.log("上报买量系统停留时间成功");
                    }
                    if (req.ryw_onSuccess) {
                        req.ryw_onSuccess(res);
                    }
                }
                else {
                    if (req.ryw_onFail) {
                        req.ryw_onFail(res);
                    }
                }
                req.ryw_onSuccess = null;
                req = null;
            };
            var errorFunc = (res) => {
                console.log(res, "MaiLiang http fail");
                if (req.ryw_onFail) {
                    req.ryw_onFail(res);
                }
                req.ryw_onFail = null;
                req = null;
            };
            var xhr = new Laya.HttpRequest();
            xhr.once(Laya.Event.COMPLETE, ryw_MaiLiang, completeFunc);
            xhr.once(Laya.Event.ERROR, ryw_MaiLiang, errorFunc);
            if (req.ryw_meth == "get") {
                var para = "";
                for (const key of Object.keys(req.ryw_data)) {
                    var value = req.ryw_data[key];
                    para += key + "=" + value + "&";
                }
                req.ryw_url = req.ryw_url + "?" + para;
                xhr.send(req.ryw_url, null, req.ryw_meth);
            }
            else {
                var para = "";
                for (const key of Object.keys(req.ryw_data)) {
                    var value = req.ryw_data[key];
                    para += key + "=" + value + "&";
                }
                xhr.send(req.ryw_url, para, req.ryw_meth, null, ["Content-Type", "application/x-www-form-urlencoded"]);
            }
        }
        static ryw_GetMaiLiangOpenId(onSuccess, onFail) {
            if (Laya.Browser.onMiniGame) {
                let option = ryw_WXAPI.ryw_getLaunchOptionsSync();
                if (option != null) {
                    let key = option.query["key"];
                    if (key != null && key != "" && ryw_User.ryw_openId != "") {
                        ryw_MaiLiang.ryw_key = key;
                        let req = new ryw_requestData();
                        req.ryw_url = ryw_MaiLiang.ryw_uclick;
                        req.ryw_onSuccess = onSuccess;
                        req.ryw_onFail = onFail;
                        req.ryw_data.appid = ryw_AppConfig.ryw_AppID;
                        req.ryw_data.openid = "";
                        let time = new Date().getTime() / 1000;
                        req.ryw_data.posttime = time;
                        req.ryw_data.auth = 0;
                        req.ryw_data.key = key;
                        req.ryw_data.wxopenid = ryw_User.ryw_openId;
                        req.ryw_meth = "POST";
                        console.log("发送买量数据接口");
                        ryw_MaiLiang.ryw_request(req);
                    }
                }
                else {
                    console.log("上报买量数据失败");
                    onFail(null);
                }
            }
            else if (Laya.Browser.onQGMiniGame) {
                let option = ryw_OPPOAPI.ryw_getLaunchOptionsSync();
                ryw_HttpUnit.ryw_reportImport(option.referrerInfo.package, option.referrerInfo.extraData.appid, (result) => {
                    if (1 == result.code) {
                        console.log("OPPO 上报买量数据成功");
                    }
                    else {
                        console.log("OPPO 上报买量数据失败", result.msg);
                    }
                }, (result) => {
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
        }
        static ryw_ReportStayTime(onSuccess, onFail) {
            if (Laya.Browser.onMiniGame) {
                if (ryw_MaiLiang.ryw_MaiLiangOpenId != "") {
                    let req = new ryw_requestData();
                    req.ryw_url = ryw_MaiLiang.ryw_stay;
                    req.ryw_onSuccess = onSuccess;
                    req.ryw_onFail = onFail;
                    req.ryw_data.appid = ryw_AppConfig.ryw_AppID;
                    req.ryw_data.openid = ryw_MaiLiang.ryw_MaiLiangOpenId;
                    let time = new Date().getTime() / 1000;
                    req.ryw_data.posttime = time;
                    let staytime = ryw_MaiLiang.ryw_time != 0 ? time - ryw_MaiLiang.ryw_time : 0;
                    req.ryw_data.time = staytime;
                    req.ryw_meth = "POST";
                    console.log("发送停留时间至买量接口");
                    ryw_MaiLiang.ryw_request(req);
                }
            }
            else {
                console.log("不在微信模式下调用，默认发送停留时间至买量接口失败");
                onFail(null);
            }
        }
    }
    ryw_MaiLiang.ryw_mainUrl = "https://swtj.mrkzx.cn";
    ryw_MaiLiang.ryw_uclick = "/v1.1/api/Activity/uclick.html";
    ryw_MaiLiang.ryw_stay = "/v1.1/api/Activity/stay.html";
    ryw_MaiLiang.ryw_key = "";
    ryw_MaiLiang.ryw_MaiLiangOpenId = "";
    ryw_MaiLiang.ryw_time = 0;

    class ryw_CachedWXBannerAd {
        static ryw_preloadBanner() {
            var wxWuDianBanners = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wxWuDianBanners;
            var bannerTodayBannerMax = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerTodayBannerMax;
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
            Laya.timer.loop(2000, ryw_CachedWXBannerAd.ryw__preLoopObj, () => {
                if (counter >= preLoadBanners.length) {
                    Laya.timer.clearAll(ryw_CachedWXBannerAd.ryw__preLoopObj);
                    return;
                }
                var bannerid = preLoadBanners[counter];
                var banner = ryw_CachedWXBannerAd.ryw__bannerCache[bannerid];
                if (null == banner) {
                    banner = ryw_CachedWXBannerAd.ryw_create(bannerid);
                    if (null != banner) {
                        ryw_CachedWXBannerAd.ryw__bannerCache[bannerid] = banner;
                        console.log("预创建微信Bannaer", bannerid, "完成");
                    }
                }
                ++counter;
            });
        }
        static ryw_getBanner(bannerid) {
            if (null == bannerid || "" == bannerid)
                return null;
            var banner = ryw_CachedWXBannerAd.ryw__bannerCache[bannerid];
            if (null == banner) {
                banner = ryw_CachedWXBannerAd.ryw_create(bannerid);
                if (null != banner) {
                    ryw_CachedWXBannerAd.ryw__bannerCache[bannerid] = banner;
                }
            }
            return banner;
        }
        static ryw_create(bannerid) {
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
                    banner.onLoad((res) => {
                        console.log("CachedWXBanner 广告 加载完成", bannerid);
                        console.log(res);
                    });
                    banner.onError((err) => {
                        console.log("CachedWXBanner 广告 加载失败", bannerid);
                        console.log(err);
                    });
                    banner.onResize(res => {
                        console.log(banner.style.realWidth, banner.style.realHeight);
                    });
                }
                return banner;
            }
            else {
                return null;
            }
        }
        static ryw_show() {
            if (null != ryw_CachedWXBannerAd.ryw__curBanner) {
                ryw_CachedWXBannerAd.ryw__curBanner.hide();
                ryw_CachedWXBannerAd.ryw__curBanner = null;
            }
            var wuDianBanners = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wxWuDianBanners;
            var bannerid = wuDianBanners[Math.floor(Math.random() * wuDianBanners.length)];
            var banner = ryw_CachedWXBannerAd.ryw_getBanner(bannerid);
            if (banner) {
                ryw_CachedWXBannerAd.ryw__curBanner = banner;
                var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
                var sw = sysInfo.screenWidth;
                var sh = sysInfo.screenHeight;
                ryw_CachedWXBannerAd.ryw__curBanner.style.top = (Laya.stage.height - 240) / Laya.stage.height * sh;
                ryw_CachedWXBannerAd.ryw__curBanner.show();
                console.log("CachedWXBanner 广告显示 bannerid ： ", bannerid);
            }
            var time = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerFreshTimer;
        }
        static ryw_hide() {
            Laya.timer.clearAll(ryw_CachedWXBannerAd);
            if (null != ryw_CachedWXBannerAd.ryw__curBanner) {
                ryw_CachedWXBannerAd.ryw__curBanner.hide();
                ryw_CachedWXBannerAd.ryw__curBanner = null;
            }
            console.log("CachedWXBanner 广告隐藏");
        }
        static ryw_changeShow() {
            if (null != ryw_CachedWXBannerAd.ryw__curBanner) {
                ryw_CachedWXBannerAd.ryw__curBanner.hide();
                ryw_CachedWXBannerAd.ryw__curBanner = null;
            }
            ryw_CachedWXBannerAd.ryw_show();
        }
        static ryw_clear() {
            Laya.timer.clearAll(ryw_CachedWXBannerAd);
            for (var key in ryw_CachedWXBannerAd.ryw__bannerCache) {
                var banner = ryw_CachedWXBannerAd.ryw__bannerCache[key];
                if (null != banner) {
                    banner.destroy();
                }
                ryw_CachedWXBannerAd.ryw__bannerCache[key] = null;
            }
        }
    }
    ryw_CachedWXBannerAd.ryw__bannerCache = {};
    ryw_CachedWXBannerAd.ryw__curBanner = null;
    ryw_CachedWXBannerAd.ryw__preLoopObj = {};

    var ryw_ALDEventDef;
    (function (ryw_ALDEventDef) {
        ryw_ALDEventDef["None"] = "";
        ryw_ALDEventDef["ReportAdClickSuccess"] = "\u5E7F\u544A\u5BFC\u51FA\u6210\u529F";
        ryw_ALDEventDef["ReportAdClickFail"] = "\u5E7F\u544A\u5BFC\u51FA\u5931\u8D25";
        ryw_ALDEventDef["ReportLaunchOptions"] = "\u7528\u6237\u542F\u52A8\u53C2\u6570";
        ryw_ALDEventDef["EnterLevelGame"] = "\u8FDB\u5165\u6E38\u620F\u5173\u5361";
        ryw_ALDEventDef["CompleteLevelGame"] = "\u80DC\u5229\u6E38\u620F\u5173\u5361";
        ryw_ALDEventDef["FailLevelGame"] = "\u5931\u8D25\u6E38\u620F\u5173\u5361";
        ryw_ALDEventDef["AgainLevelGame"] = "\u91CD\u6765\u6E38\u620F\u5173\u5361";
        ryw_ALDEventDef["TipLevelGame"] = "\u63D0\u793A\u6E38\u620F\u5173\u5361";
    })(ryw_ALDEventDef || (ryw_ALDEventDef = {}));
    class ryw_ALD {
        static ryw_aldSendOpenId(openid) {
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window["wx"].aldSendOpenid(openid);
                console.log("ALD 上报 openid : ", openid);
            }
            else if (Laya.Browser.onQQMiniGame) {
                Laya.Browser.window["qq"].aldSendOpenid(openid);
                console.log("ALD 上报 openid : ", openid);
            }
        }
        static ryw_aldSendEvent(event, data) {
            var eventName = event;
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window["wx"].aldSendEvent(eventName, data);
            }
            else if (Laya.Browser.onQQMiniGame) {
                Laya.Browser.window["qq"].aldSendEvent(eventName, data);
            }
        }
        static ryw_aldSendReportAdClickSuccess(data) {
            var type = ryw_ALDEventDef.ReportAdClickSuccess + " " + data.title + ":" + String(data.appid);
            ryw_ALD.ryw_aldSendEvent(type, {
                "导出成功": data.title + ":" + String(data.appid)
            });
        }
        static ryw_aldSendReportAdClickFail(data) {
            var type = ryw_ALDEventDef.ReportAdClickFail + " " + data.title + ":" + String(data.appid);
            ryw_ALD.ryw_aldSendEvent(type, {
                "导出失败": data.title + ":" + String(data.appid)
            });
        }
        static ryw_aldSendReportLaunchOptions(sceneid, ip, location) {
            var type = ryw_ALDEventDef.ReportLaunchOptions;
            ryw_ALD.ryw_aldSendEvent(type, {
                "场景值：": String(sceneid),
                "Ip：": String(ip),
                "地区：": JSON.stringify(location)
            });
        }
    }

    class ryw_WXBannderAd {
        constructor(bannerid) {
            this.ryw__id = null;
            this.ryw__banner = null;
            this.ryw__createTime = 0;
            this.ryw__destroyed = false;
            this.ryw__error = null;
            this.ryw__loading = false;
            this.ryw__retryCount = 0;
            this.ryw__bannerTotalShowTime = 0;
            this.ryw__lastShowTime = 0;
            this.ryw__id = bannerid;
        }
        get ryw_Id() {
            return this.ryw__id;
        }
        get ryw_CreateTime() {
            return this.ryw__createTime;
        }
        get ryw_Destroyed() {
            return this.ryw__destroyed;
        }
        get ryw_isReady() {
            return null != this.ryw__banner;
        }
        get ryw_isError() {
            return null != this.ryw__error;
        }
        get ryw_Error() {
            return this.ryw__error;
        }
        get ryw_Loading() {
            return this.ryw__loading;
        }
        get ryw_RetryCount() {
            return this.ryw__retryCount;
        }
        get ryw_BannerTotalShowTime() {
            return this.ryw__bannerTotalShowTime;
        }
        ryw_show() {
            if (this.ryw_isReady) {
                this.ryw__banner.hide();
                let self = this;
                let sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
                let sw = sysInfo.screenWidth;
                let sh = sysInfo.screenHeight;
                let pos = new Laya.Point(0, 0);
                let width = 300;
                let left = sw / 2 - width / 2;
                let top = sh - 130;
                this.ryw__banner.style.left = left;
                this.ryw__banner.style.top = top;
                this.ryw__lastShowTime = Laya.timer.currTimer;
                this.ryw__banner.show();
            }
        }
        ryw_hide() {
            if (this.ryw_isReady) {
                this.ryw__banner.hide();
                this.ryw__bannerTotalShowTime += (Laya.timer.currTimer - this.ryw__lastShowTime);
            }
        }
        ryw_destroy() {
            if (this.ryw__destroyed) {
                console.log("BannerAd 已经被销毁");
                return;
            }
            if (this.ryw__loading) {
                console.log("BannerAd 正在加载中，无法进行销毁");
                return;
            }
            if (null != this.ryw__banner) {
                this.ryw__banner.destroy();
            }
            this.ryw__banner = null;
            this.ryw__destroyed = true;
        }
        ryw_retry(callBack) {
            if (this.ryw__destroyed) {
                console.log("BannerAd 已被销毁，无法重试");
                return;
            }
            if (this.ryw_isReady) {
                console.log("BannerAd 已创建成功，无需重试");
                return;
            }
            if (this.ryw__loading) {
                console.log("BannerAd 正在创建中");
                return;
            }
            if (this.ryw__retryCount >= ryw_WXBannderAd.ryw_MAX_RETRY_COUNT) {
                console.log("此 BannerAd 重试次数已达最大");
                return;
            }
            let self = this;
            this.ryw__create((isOk) => {
                if (null != callBack) {
                    callBack(isOk);
                }
                ++self.ryw__retryCount;
            });
        }
        ryw__create(callBack) {
            if (!Laya.Browser.onMiniGame) {
                if (null != callBack) {
                    callBack(false);
                }
                return;
            }
            let banner = null;
            if (Laya.Browser.onMiniGame) {
                banner = Laya.Browser.window["wx"].createBannerAd({
                    adUnitId: this.ryw__id,
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
                    adUnitId: this.ryw__id,
                    adIntervals: 30,
                    style: {
                        left: 0,
                        top: 0,
                        width: 300,
                    }
                });
            }
            if (null != banner) {
                let self = this;
                this.ryw__loading = true;
                banner.onLoad((res) => {
                    console.log("BannderAd 加载完成", self.ryw__id, res);
                    self.ryw__banner = banner;
                    self.ryw__createTime = Laya.timer.currTimer;
                    self.ryw__loading = false;
                    if (null != callBack) {
                        callBack(true);
                    }
                });
                banner.onError((err) => {
                    console.log("BannderAd 加载失败", self.ryw__id, err);
                    self.ryw__error = err;
                    self.ryw__loading = false;
                    banner.destroy();
                    if (null != callBack) {
                        callBack(false);
                    }
                });
            }
        }
    }
    ryw_WXBannderAd.ryw_MAX_RETRY_COUNT = 3;
    class ryw_WXGridAd {
        constructor(bannerid) {
            this.ryw__id = null;
            this.ryw__gridAd = null;
            this.ryw__createTime = 0;
            this.ryw__destroyed = false;
            this.ryw__error = null;
            this.ryw__loading = false;
            this.ryw__id = bannerid;
        }
        get ryw_CreateTime() {
            return this.ryw__createTime;
        }
        get ryw_Destroyed() {
            return this.ryw__destroyed;
        }
        get ryw_isReady() {
            return null != this.ryw__gridAd;
        }
        get ryw_isError() {
            return null != this.ryw__error;
        }
        get ryw_Error() {
            return this.ryw__error;
        }
        get ryw_Loading() {
            return this.ryw__loading;
        }
        ryw_show() {
            if (this.ryw_isReady) {
                this.ryw__gridAd.show();
            }
        }
        ryw_hide() {
            if (this.ryw_isReady) {
                this.ryw__gridAd.hide();
            }
        }
        ryw_destroy() {
            if (this.ryw__destroyed) {
                console.log("GridAD 已经被销毁");
                return;
            }
            if (this.ryw__loading) {
                console.log("GridAD 正在加载中，无法进行销毁");
                return;
            }
            if (null != this.ryw__gridAd) {
                this.ryw__gridAd.destroy();
            }
            this.ryw__gridAd = null;
            this.ryw__destroyed = true;
        }
        ryw_retry(callBack) {
            if (this.ryw__destroyed) {
                console.log("GridAD 已被销毁，无法重试");
                return;
            }
            if (this.ryw_isReady) {
                console.log("GridAD 已创建成功，无需重试");
                return;
            }
            if (this.ryw__loading) {
                console.log("GridAD 正在创建中");
                return;
            }
            let self = this;
            this.ryw__create((isOk) => {
                if (null != callBack) {
                    callBack(isOk);
                }
            });
        }
        ryw__create(callBack) {
            if (!Laya.Browser.onMiniGame) {
                if (null != callBack) {
                    callBack(false);
                }
                return;
            }
            let gridAd = Laya.Browser.window["wx"].createGridAd({
                adUnitId: this.ryw__id,
                adIntervals: 30,
                style: {
                    left: 0,
                    top: 0,
                    width: 300,
                    height: 150,
                }
            });
            if (null != gridAd) {
                let self = this;
                this.ryw__loading = true;
                gridAd.onLoad((res) => {
                    console.log("GridAD 加载完成", self.ryw__id, res);
                    self.ryw__gridAd = gridAd;
                    self.ryw__createTime = Laya.timer.currTimer;
                    self.ryw__loading = false;
                    if (null != callBack) {
                        callBack(true);
                    }
                });
                gridAd.onError((err) => {
                    console.log("GridAD 加载失败", self.ryw__id, err);
                    self.ryw__error = err;
                    self.ryw__loading = false;
                    gridAd.destroy();
                    if (null != callBack) {
                        callBack(false);
                    }
                });
            }
        }
    }
    class ryw_WXADMgr {
        static ryw_init() {
            if (ryw_WXADMgr.ryw__inited)
                return;
            let banners = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wxWuDianBanners;
            for (let i = 0; i < banners.length; ++i) {
                ryw_WXADMgr.ryw__bannerIds.push(banners[i]);
            }
            for (let i = 0; i < ryw_WXADMgr.ryw__bannerIds.length; ++i) {
                let cur = ryw_WXADMgr.ryw__bannerIds[i];
                ryw_WXADMgr.ryw__bannerIds[i] = banners[Math.floor(Math.random() * banners.length)];
            }
            ryw_WXADMgr.ryw__createBannerAd();
            let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerCreateFailNum * 1000;
            Laya.timer.loop(bannerRecreateTime, ryw_WXADMgr, () => {
                ryw_WXADMgr.ryw__checkBannerAd();
                ryw_WXADMgr.ryw__createBannerAd();
            });
            ryw_WXADMgr.ryw__inited = true;
        }
        static ryw_getBanner(callBack) {
            let readyBannerAd = [];
            let UnreadyBannerAd = [];
            for (let i = 0; i < ryw_WXADMgr.ryw__banners.length; ++i) {
                let bannerAd = ryw_WXADMgr.ryw__banners[i];
                if (!bannerAd.ryw_Destroyed) {
                    if (bannerAd.ryw_isReady) {
                        readyBannerAd.push(bannerAd);
                    }
                    else {
                        UnreadyBannerAd.push(bannerAd);
                    }
                }
            }
            if (ryw_WXADMgr.ryw__curBannerGetIndex >= readyBannerAd.length) {
                ryw_WXADMgr.ryw__curBannerGetIndex = 0;
            }
            let bannerAd = readyBannerAd[ryw_WXADMgr.ryw__curBannerGetIndex];
            ++ryw_WXADMgr.ryw__curBannerGetIndex;
            if (null != bannerAd) {
                callBack(bannerAd);
            }
            else {
                bannerAd = ryw_WXADMgr.ryw__createBannerAd();
                if (null == bannerAd) {
                    bannerAd = ryw_WXADMgr.ryw__banners[Math.floor(Math.random() * ryw_WXADMgr.ryw__banners.length)];
                }
                if (null == bannerAd) {
                    callBack(null);
                }
                else {
                    bannerAd.ryw_retry((ok) => {
                        if (ok) {
                            callBack(bannerAd);
                        }
                        else {
                            callBack(null);
                        }
                    });
                }
            }
        }
        static ryw__createBannerAd() {
            if (ryw_WXADMgr.ryw__curBannerCreateIndex >= ryw_WXADMgr.ryw__bannerIds.length)
                return null;
            let bannerAd = new ryw_WXBannderAd(ryw_WXADMgr.ryw__bannerIds[ryw_WXADMgr.ryw__curBannerCreateIndex]);
            ryw_WXADMgr.ryw__banners.push(bannerAd);
            bannerAd.ryw_retry();
            ++ryw_WXADMgr.ryw__curBannerCreateIndex;
            return bannerAd;
        }
        static ryw__checkBannerAd() {
            let readyBannerAd = [];
            let UnreadyBannerAd = [];
            for (let i = 0; i < ryw_WXADMgr.ryw__banners.length; ++i) {
                let bannerAd = ryw_WXADMgr.ryw__banners[i];
                if (!bannerAd.ryw_Destroyed) {
                    if (bannerAd.ryw_isReady) {
                        readyBannerAd.push(bannerAd);
                    }
                    else {
                        UnreadyBannerAd.push(bannerAd);
                    }
                }
            }
            for (let i = 0; i < ryw_WXADMgr.ryw__banners.length; ++i) {
                let bannerAd = ryw_WXADMgr.ryw__banners[i];
                let bannerShowTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerShowTime;
                if (!bannerAd.ryw_isReady) {
                    if (bannerAd.ryw_RetryCount >= ryw_WXBannderAd.ryw_MAX_RETRY_COUNT) {
                        console.log("BannerAd 超过重试次数，销毁 : ", bannerAd.ryw_Id);
                        bannerAd.ryw_destroy();
                    }
                    else {
                        bannerAd.ryw_retry();
                    }
                }
                else if (readyBannerAd.length >= 2 && bannerAd.ryw_BannerTotalShowTime >= bannerShowTime * 1000) {
                    console.log("BannerAd 展示时间超过限制，销毁 : ", bannerAd.ryw_Id);
                    bannerAd.ryw_destroy();
                }
            }
        }
        static ryw_getBoxAd(callBack) {
            if (ryw_WXADMgr.ryw__wxGridAd.ryw_isReady) {
                callBack(ryw_WXADMgr.ryw__wxGridAd);
            }
            else {
                let gridAd = ryw_WXADMgr.ryw__wxGridAd;
                gridAd.ryw_retry((isOk) => {
                    if (isOk) {
                        callBack(gridAd);
                    }
                    else {
                        callBack(null);
                    }
                });
            }
        }
        static ryw__createGirdAd() {
            if (null != ryw_WXADMgr.ryw__wxGridAd)
                return;
            let gridAd = new ryw_WXGridAd("");
            gridAd.ryw_retry();
            ryw_WXADMgr.ryw__wxGridAd = gridAd;
        }
    }
    ryw_WXADMgr.ryw__inited = false;
    ryw_WXADMgr.ryw__bannerIds = new Array();
    ryw_WXADMgr.ryw__banners = new Array();
    ryw_WXADMgr.ryw__curBannerCreateIndex = 0;
    ryw_WXADMgr.ryw__curBannerGetIndex = 0;
    ryw_WXADMgr.ryw__wxGridAd = null;

    class ryw_CachedQQBannerAd {
        static preloadBanner() {
        }
        static show(bannerid) {
            let wxWuDianBanners = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wxWuDianBanners;
            let bannerTodayBannerMax = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerTodayBannerMax;
            bannerid = wxWuDianBanners[Math.floor(Math.random() * wxWuDianBanners.length)];
            if (Laya.Browser.onQQMiniGame && null != bannerid) {
                let sysInfo = Laya.Browser.window["qq"].getSystemInfoSync();
                let sw = sysInfo.screenWidth;
                let sh = sysInfo.screenHeight;
                let banner = Laya.Browser.window["qq"].createBannerAd({
                    adUnitId: bannerid,
                    adIntervals: 30,
                    style: {
                        left: 0,
                        top: (Laya.stage.height - 240) / Laya.stage.height * sh,
                        width: sw,
                    }
                });
                if (banner) {
                    let self = this;
                    ryw_CachedQQBannerAd.ryw__onLoad = (res) => {
                        console.log("CachedQQBanner 广告 加载完成", bannerid);
                        console.log(res);
                        if (!self.ryw__isHide) {
                            banner.show();
                        }
                        else {
                            banner.offLoad(ryw_CachedQQBannerAd.ryw__onLoad);
                            banner.offError(ryw_CachedQQBannerAd.ryw__onError);
                            banner.destroy();
                        }
                    };
                    banner.onLoad(ryw_CachedQQBannerAd.ryw__onLoad);
                    ryw_CachedQQBannerAd.ryw__onError = (err) => {
                        console.log("CachedQQBanner 广告 加载失败", bannerid);
                        console.log(err);
                        banner.offLoad(ryw_CachedQQBannerAd.ryw__onLoad);
                        banner.offError(ryw_CachedQQBannerAd.ryw__onError);
                        banner.destroy();
                    };
                    banner.onError(ryw_CachedQQBannerAd.ryw__onError);
                    ryw_CachedQQBannerAd.ryw__curBanner = banner;
                }
            }
            ryw_CachedQQBannerAd.ryw__isHide = false;
        }
        static hide() {
            ryw_CachedQQBannerAd.ryw__isHide = true;
            Laya.timer.clearAll(ryw_CachedQQBannerAd);
            if (null != ryw_CachedQQBannerAd.ryw__curBanner) {
                ryw_CachedQQBannerAd.ryw__curBanner.hide();
                ryw_CachedQQBannerAd.ryw__curBanner.offLoad(ryw_CachedQQBannerAd.ryw__onLoad);
                ryw_CachedQQBannerAd.ryw__curBanner.offError(ryw_CachedQQBannerAd.ryw__onError);
                ryw_CachedQQBannerAd.ryw__curBanner.destroy();
                ryw_CachedQQBannerAd.ryw__curBanner = null;
                console.log("CachedQQBanner 广告隐藏");
            }
        }
        static changeShow() {
            if (null != ryw_CachedQQBannerAd.ryw__curBanner) {
                ryw_CachedQQBannerAd.ryw__curBanner.hide();
                ryw_CachedQQBannerAd.ryw__curBanner = null;
            }
            ryw_CachedQQBannerAd.show();
        }
        static clear() {
        }
    }
    ryw_CachedQQBannerAd.ryw__curBanner = null;
    ryw_CachedQQBannerAd.ryw__onLoad = null;
    ryw_CachedQQBannerAd.ryw__onError = null;
    ryw_CachedQQBannerAd.ryw__isHide = true;

    class ryw_SoundMgr {
        constructor() {
            this.ryw__enabled = true;
        }
        get ryw_Enabled() {
            return this.ryw__enabled;
        }
        set ryw_Enabled(e) {
            if (!e) {
                this.ryw_stopBGM();
            }
            this.ryw__enabled = e;
        }
        ryw_getSoundUrl(name) {
            let url = ryw_SoundMgr.ryw_soundResPath + name + ".ogg";
            return url;
        }
        ryw_playSound(name) {
            if (!this.ryw__enabled)
                return;
            var url = this.ryw_getSoundUrl(name);
            if (Laya.Browser.onMiniGame) {
                var sound = Laya.Pool.getItem(name);
                if (sound == null) {
                    sound = wx.createInnerAudioContext();
                    sound.src = ryw_SoundMgr.ryw_soundResPath + name + ".ogg";
                    sound.onEnded(() => {
                        Laya.Pool.recover(name, sound);
                        sound.offEnded();
                    });
                }
                sound.play();
            }
            else {
                Laya.SoundManager.playSound(url, 1);
            }
        }
        ryw_playBGM(name) {
            if (!this.ryw__enabled)
                return;
            let url = this.ryw_getSoundUrl(name);
            if (Laya.Browser.onMiniGame) {
                if (!this.ryw_bgm) {
                    this.ryw_bgm = wx.createInnerAudioContext();
                }
                this.ryw_bgm.pause();
                this.ryw_bgm.src = url;
                this.ryw_bgm.loop = true;
                this.ryw_bgm.play();
            }
            else {
                Laya.SoundManager.playMusic(url, 0);
            }
        }
        ryw_stopBGM() {
            if (Laya.Browser.onMiniGame) {
                if (this.ryw_bgm) {
                    this.ryw_bgm.pause();
                }
            }
            else {
                Laya.SoundManager.stopMusic();
            }
        }
    }
    ryw_SoundMgr.ryw_soundResPath = "subRes/sound/";
    ryw_SoundMgr.ryw_instance = new ryw_SoundMgr();

    class NativeCallback {
        static onVideoFail() {
            console.debug("onVideoFail --------- ------------ ");
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.RewardVideoFail);
            ryw_SoundMgr.ryw_instance.ryw_playBGM('bg');
        }
        static onVideoSuccess(reward) {
            console.debug("onVideoSuccess    --------- ------------ ");
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.RewardVideoSuccess, reward);
            ryw_SoundMgr.ryw_instance.ryw_playBGM('bg');
        }
        static onInsertVideoEnd() {
            console.debug("onInsertVideoEnd    --------- ------------ ");
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.InsertVideoEnd);
        }
        static CallNativeFunc(funcName) {
            if (Laya.Browser.onAndroid) {
                var bridge = window["PlatformClass"].createClass("demo.JSBridge");
                bridge.call(funcName);
            }
            else if (Laya.Browser.onIOS) {
            }
        }
        static ShowLog(log) {
            console.log("输出native日志---" + log);
            if (Laya.Browser.onAndroid) {
                var bridge = window["PlatformClass"].createClass("demo.JSBridge");
                bridge.call("showLog", log);
            }
            else if (Laya.Browser.onIOS) {
            }
        }
    }
    NativeCallback.NowVideoType = "";
    NativeCallback.conchIOS = "Conch-ios";
    NativeCallback.conchAndroid = "Conch-android";
    NativeCallback.os = "";

    class SwitchConfigData {
        constructor() {
            this.openBanner = 1;
            this.openVideo = 1;
            this.openInsert = 1;
        }
    }
    class GameSwitchConfig {
        constructor() {
            this.openBanner = 1;
            this.openVideo = 1;
            this.openInsert = 1;
        }
        static getInstance() {
            if (null == GameSwitchConfig._instance) {
                GameSwitchConfig.load();
            }
            return GameSwitchConfig._instance;
        }
        static load() {
            GameSwitchConfig._instance = new GameSwitchConfig();
            if (GameSwitchConfig.resUrl == "")
                return;
            Laya.loader.load(GameSwitchConfig.resUrl, Laya.Handler.create(this, (res) => {
                if (res) {
                    for (const key of Object.keys(res)) {
                        GameSwitchConfig._instance[key] = res[key];
                    }
                    GameSwitchConfig._instance.SetBannerActive();
                }
                GameSwitchConfig._instance.SetBannerActive();
            }));
        }
        hideBanner() {
            NativeCallback.CallNativeFunc("hideBanner");
        }
        SetBannerActive() {
            if (this.openBanner == 1) {
                NativeCallback.CallNativeFunc("showBanner");
            }
            else {
                NativeCallback.CallNativeFunc("hideBanner");
            }
        }
    }
    GameSwitchConfig.resUrl = "";

    class ryw_GameMgr extends Laya.Script {
        constructor() {
            super();
            ryw_GameMgr.ryw__instance = this;
        }
        static ryw_getInstance() { return ryw_GameMgr.ryw__instance; }
        onAwake() {
            ryw_MaiLiang.ryw_GetMaiLiangOpenId(function (res) {
                console.log("GameUI 买量数据上报成功");
                Laya.Browser.window["wx"].onShow(function () {
                    ryw_MaiLiang.ryw_GetMaiLiangOpenId(null, null);
                });
                Laya.Browser.window["wx"].onHide(function () {
                    ryw_MaiLiang.ryw_ReportStayTime(null, null);
                });
            }, function (res) {
                console.log("GameUI 买量数据上报失败");
            });
            ryw_WXAPI.ryw_SetShareMenu("", "", () => {
            }, () => {
            }, () => {
            });
            ryw_WudianMgr.ryw_UpdateIpBlockState();
            this.ryw_reportLaunchOptions();
            if (Laya.Browser.onMiniGame) {
                ryw_CachedWXBannerAd.ryw_preloadBanner();
                ryw_WXADMgr.ryw_init();
            }
            else if (Laya.Browser.onQQMiniGame) {
                ryw_CachedQQBannerAd.preloadBanner();
                ryw_QQMiniGameAPI.ryw_LoadAppBoxAd(() => { }, () => { });
            }
            else if (Laya.Browser.onQGMiniGame) {
                if (null != Laya.Browser.window["qg"].reportMonitor && typeof (Laya.Browser.window["qg"].reportMonitor) == 'function') {
                    Laya.Browser.window["qg"].reportMonitor('game_scene', 0);
                }
            }
        }
        onStart() {
            this.ryw_preCreateGame();
        }
        ryw_preCreateGame() {
            Laya.URL.customFormat = (url) => {
                if (url.indexOf(".ls") == -1 && url.indexOf(ryw_AppConfig.ryw_ResServer + "/LayaScene") > -1) {
                    url = url.replace(ryw_AppConfig.ryw_ResServer + "/LayaScene", "subRes/LayaScene");
                    return url;
                }
                return url;
            };
            GameSwitchConfig.getInstance().SetBannerActive();
            ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.GameView, null, (v) => {
                v.owner.zOrder = 1;
            });
        }
        ryw_saveGameData() {
            Laya.LocalStorage.setItem("Game_Data", ryw_User.ryw_getSaveData());
        }
        ryw_reportLaunchOptions() {
            ryw_HttpUnit.ryw_Getuserip((res) => {
                if (1 == res.code) {
                    console.log("获取玩家ip,地区成功 ：", res.data.dqip, res.data.ipxq);
                    let opt = null;
                    if (Laya.Browser.onMiniGame) {
                        opt = ryw_WXAPI.ryw_getLaunchOptionsSync();
                    }
                    else if (Laya.Browser.onQQMiniGame) {
                        opt = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync();
                    }
                    if (null != opt) {
                        ryw_ALD.ryw_aldSendReportLaunchOptions(opt.scene, res.data.dqip, res.data.ipxq);
                    }
                }
            }, (res) => {
                console.log("获取玩家ip,地区失败");
                let opt = null;
                if (Laya.Browser.onMiniGame) {
                    opt = ryw_WXAPI.ryw_getLaunchOptionsSync();
                }
                else if (Laya.Browser.onQQMiniGame) {
                    opt = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync();
                }
                if (null != opt) {
                    ryw_ALD.ryw_aldSendReportLaunchOptions(opt.scene, "", "");
                }
            });
        }
    }
    ryw_GameMgr.ryw__instance = null;

    class ryw_ShareAd {
        static ryw_refreshAd(complate) {
        }
        static ryw_getADVs(locationid, complate, useRandom, useLocalRandom, sortDatas) {
        }
        static ryw_reportUserClick(advid) {
        }
        static ryw_getRandomADPosID() {
            return ryw_ShareAd.ryw_AdLocationids[Math.floor(Math.random() * ryw_ShareAd.ryw_AdLocationids.length)];
        }
        static ryw_request(req) {
        }
        static ryw_getAdPosData(onSuccess, onFail) {
        }
        static ryw_reqUserClick(advid, onSuccess, onFail) {
        }
        static ryw_getADVData(locationid, onSuccess, onFail) {
        }
        static ryw_RandomJump(rate = 1) {
        }
        static ryw_isNeedShowAd() {
            return true;
        }
        static ryw_sortDatas(datas) {
            return;
        }
    }
    ryw_ShareAd.ryw_mainUrl = "";
    ryw_ShareAd.ryw_getAdPostion = "";
    ryw_ShareAd.ryw_getAdv = "";
    ryw_ShareAd.ryw_userClick = "";
    ryw_ShareAd.ryw_LoopAdLocationID = 532;
    ryw_ShareAd.ryw_BannerAdLocationID = 531;
    ryw_ShareAd.ryw_InsertAdLocationID = -1;
    ryw_ShareAd.ryw_AniAdLocationID = -1;
    ryw_ShareAd.ryw_HistoryLocationID = 534;
    ryw_ShareAd.ryw_MoreGameLocationID = 533;
    ryw_ShareAd.ryw_UseRandomAdPos = false;
    ryw_ShareAd.ryw_AdLocationids = [];
    ryw_ShareAd.ryw__adPosition = {};
    ryw_ShareAd.ryw__adv = {};
    ryw_ShareAd.ryw__iphoneIgnoreAppIds = [
        "",
        ""
    ];

    class ryw_TTAPI {
        static ryw_ttLogin(onSuccess, onFail) {
            if (ryw_AppConfig.onTTMiniGame) {
                Laya.Browser.window["tt"].login({
                    force: false,
                    success: (res) => {
                        console.log("登陆成功1");
                        let code = res.code;
                        if (code) {
                            onSuccess(code);
                        }
                        else {
                            console.log("用户没有登陆，采用临时code");
                            onFail();
                        }
                    },
                    fail: () => {
                        console.log("登陆失败1");
                        onFail();
                    },
                });
                ryw_TTAPI.ryw_initRecord();
            }
        }
        static ryw_onRewardedVideoAdLoad() {
            console.log('激励视频 广告加载完成');
        }
        static ryw_onRewardedVideoAdError(err) {
            console.log('激励视频 广告加载失败' + err);
            if (ryw_TTAPI.ryw__onRewardedVideoAdFailed) {
                ryw_TTAPI.ryw__onRewardedVideoAdFailed();
            }
        }
        static ryw_onRewardedVideoAdClose(res) {
            if ((res && res.isEnded) || res == null) {
                console.log('激励视频 已完整观看');
                if (ryw_TTAPI.ryw__onRewardedVideoAdClose) {
                    ryw_TTAPI.ryw__onRewardedVideoAdClose(true);
                }
            }
            else {
                console.log('激励视频 未完整观看');
                if (ryw_TTAPI.ryw__onRewardedVideoAdClose) {
                    ryw_TTAPI.ryw__onRewardedVideoAdClose(false);
                }
            }
        }
        static ryw_regRewardedVideoAdEvent(rewardedVideoAd) {
            rewardedVideoAd.onLoad(ryw_TTAPI.ryw_onRewardedVideoAdLoad);
            rewardedVideoAd.onError(ryw_TTAPI.ryw_onRewardedVideoAdError);
            rewardedVideoAd.onClose(ryw_TTAPI.ryw_onRewardedVideoAdClose);
            ryw_TTAPI.ryw__isRegRewardedVideoAdEvent = true;
        }
        static ryw_showRewardedVideoAd(onAdClose, onFailed) {
            if (ryw_AppConfig.onTTMiniGame) {
                ryw_TTAPI.ryw__onRewardedVideoAdClose = onAdClose;
                ryw_TTAPI.ryw__onRewardedVideoAdFailed = onFailed;
                var rewardedVideoAd = Laya.Browser.window["tt"].createRewardedVideoAd({
                    adUnitId: ryw_TTAPI.ryw_adUnitId,
                });
                if (!ryw_TTAPI.ryw__isRegRewardedVideoAdEvent) {
                    ryw_TTAPI.ryw_regRewardedVideoAdEvent(rewardedVideoAd);
                }
                rewardedVideoAd.load().then(() => {
                    var promise = rewardedVideoAd.show();
                    promise.then(() => console.log('激励视频 广告显示成功'));
                    promise.catch((err) => {
                        rewardedVideoAd.load()
                            .then(() => rewardedVideoAd.show())
                            .catch(err => {
                            console.log('激励视频 广告显示失败');
                            if (onFailed) {
                                onFailed();
                            }
                        });
                    });
                }).catch(err => {
                    console.log('激励视频 广告加载失败');
                    if (onFailed) {
                        onFailed();
                    }
                });
            }
            else {
                onAdClose(true);
            }
        }
        static ryw_initRecord() {
            ryw_TTAPI.ryw_record = Laya.Browser.window["tt"].getGameRecorderManager();
            if (ryw_TTAPI.ryw_record != null) {
                ryw_TTAPI.ryw_record.onStart(res => {
                    console.log("录屏开始");
                    ryw_TTAPI.ryw_recordRes = "";
                });
                ryw_TTAPI.ryw_record.onStop(res => {
                    console.log("录屏结束");
                    ryw_TTAPI.ryw_recordRes = res.videoPath;
                });
            }
        }
        static ryw_startRecord(duration = 300) {
            if (!ryw_AppConfig.onTTMiniGame)
                return;
            ryw_TTAPI.ryw_record.start({
                duration
            });
        }
        static ryw_stopRecord() {
            if (!ryw_AppConfig.onTTMiniGame)
                return;
            ryw_TTAPI.ryw_record.stop();
        }
        static ryw_shareRecord(callback = null, Failcallback = null) {
            if (!ryw_AppConfig.onTTMiniGame)
                return;
            if (ryw_TTAPI.ryw_recordRes != "") {
                window["tt"].shareAppMessage({
                    channel: "video",
                    extra: {
                        videoPath: ryw_TTAPI.ryw_recordRes,
                        videoTopics: [ryw_AppConfig.ryw_GameName]
                    },
                    success() {
                        if (callback != null) {
                            callback();
                        }
                        console.log("分享视频成功");
                    },
                    fail(e) {
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
        }
        static ryw_share(complate = null) {
            if (!ryw_AppConfig.onTTMiniGame)
                return;
            window["tt"].shareAppMessage({
                templateId: ryw_TTAPI.ryw__templateId,
                success() {
                    if (complate != null) {
                        complate();
                    }
                },
                fail() {
                    console.log("分享失败");
                }
            });
        }
        static ryw_showBanner() {
        }
        static ryw_hideBanner() {
            if (null != ryw_TTAPI.ryw__banner) {
                ryw_TTAPI.ryw__banner.hide();
            }
        }
        static ryw_showMoreGamesModal(onSuccess, onFail) {
            const systemInfo = Laya.Browser.window["tt"].getSystemInfoSync();
            if (systemInfo.platform !== "ios") {
                Laya.Browser.window["tt"].showMoreGamesModal({
                    appLaunchOptions: [
                        {
                            appId: ryw_AppConfig.ryw_AppID,
                            query: "foo=bar&baz=qux",
                            extraData: {}
                        }
                    ],
                    success(res) {
                        console.log("success", res.errMsg);
                        if (onSuccess) {
                            onSuccess();
                        }
                    },
                    fail(res) {
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
        }
        static autoOpenSignInView(complate) {
            ryw_HttpUnit.GetSignIn((res) => {
                let isSign = res.data.is_sign;
                let signDays = res.data.sign_day_num;
                if (isSign == 0) {
                    ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_TTSignInView, null, () => {
                        complate(true);
                    });
                }
                else {
                    complate(false);
                }
            }, () => {
                complate(false);
            });
        }
    }
    ryw_TTAPI.ryw_adUnitId = "";
    ryw_TTAPI.ryw_bannerAdUnitId = "";
    ryw_TTAPI.ryw_InsAdUnitId = "";
    ryw_TTAPI.ryw__templateId = "";
    ryw_TTAPI.ryw_recordRes = "";
    ryw_TTAPI.ryw__banner = null;
    ryw_TTAPI.ryw__isRegRewardedVideoAdEvent = false;
    ryw_TTAPI.ryw__onRewardedVideoAdFailed = null;
    ryw_TTAPI.ryw__onRewardedVideoAdClose = null;

    class VIVOAPI {
        static get BannerInstance() {
            return this._banner;
        }
        static Login(onSuccess, onFail) {
            if (Laya.Browser.window["qg"].getSystemInfoSync().platformVersionCode >= 1053) {
                console.log("vivo 开始登陆 >= 1053");
                Laya.Browser.window["qg"].login().then((res) => {
                    if (res.data.token) {
                        let token = res.data.token;
                        onSuccess(token, true);
                        console.log("vivo 登陆成功,获取到 token : " + token);
                    }
                    else {
                        console.log('登录失败 res.data.token 为 null');
                        onFail();
                    }
                }, (err) => {
                    console.log('登录失败' + JSON.stringify(err));
                    onFail();
                });
            }
            else {
                console.log("vivo 开始登陆 < 1053");
                Laya.Browser.window["qg"].authorize({
                    type: "token",
                    success: function (data) {
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
        }
        static showDialog(titel, message, buttons, success, cancel, fail) {
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
                    console.log(`handling fail, code = ${code}`);
                    fail();
                }
            });
        }
        static createRewardedVideoAd() {
            if (Laya.Browser.onVVMiniGame) {
                VIVOAPI.rewardedAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                    posId: VIVOAPI.adUnitId,
                    style: {}
                });
                VIVOAPI.rewardedAd.onError(err => {
                    switch (err.errCode) {
                        case -3:
                            console.log("激励广告加载失败---调用太频繁", JSON.stringify(err));
                            break;
                        case -4:
                            console.log("激励广告加载失败--- 一分钟内不能重复加载", JSON.stringify(err));
                            break;
                        case 30008:
                            break;
                        default:
                            console.log("激励广告展示失败");
                            console.log(JSON.stringify(err));
                            break;
                    }
                });
            }
        }
        static showRewardedVideoAd(onAdClose, onFailed) {
            if (Laya.Browser.onVVMiniGame) {
                ryw_SoundMgr.ryw_instance.ryw_stopBGM();
                console.log("---------------------------------- VIVOAPI.rewardedAd:", VIVOAPI.rewardedAd + ",VIVOAPI.rewardedAdNum:", VIVOAPI.rewardedAdNum);
                if (VIVOAPI.rewardedAdNum == 0) {
                    VIVOAPI.createRewardedVideoAd();
                }
                else {
                    let adLoad = VIVOAPI.rewardedAd.load();
                    adLoad && adLoad.catch(err => {
                        console.log("激励广告load失败" + JSON.stringify(err));
                        onFailed();
                    });
                }
                VIVOAPI.rewardedAdNum = 1;
                console.log("近来showRewardedVideoAd");
                VIVOAPI.rewardedAd.onLoad(() => {
                    let adshow = VIVOAPI.rewardedAd.show();
                    adshow && adshow.then(() => {
                        console.log("激励广告展示成功");
                    }).catch(err => {
                        console.log("激励广告展示失败" + JSON.stringify(err));
                        onFailed();
                    });
                });
                VIVOAPI.rewardedAd.onClose(res => {
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
        }
        static showBannerAd() {
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
                let adshow = this.mBannerAd.show();
                adshow && adshow.then(() => {
                    console.log("banner广告展示成功");
                }).catch((err) => {
                    switch (err.code) {
                        case 30003:
                            console.log("新用户7天内不能曝光Banner，请将手机时间调整为7天后，退出游戏重新进入");
                            break;
                        case 30009:
                            console.log("10秒内调用广告次数超过1次，10秒后再调用");
                            break;
                        case 30002:
                            console.log("加载广告失败，重新加载广告");
                            break;
                        default:
                            console.log("banner广告展示失败");
                            console.log(JSON.stringify(err));
                            break;
                    }
                });
                this.mBannerAd.onError(function (err) {
                    console.log('Banner广告加载失败111:' + JSON.stringify(err));
                });
            }
        }
        static hideBannerAd() {
            if (this.mBannerAd) {
                console.log('===========bannerAd 隐藏');
                this.mBannerAd.hide();
                this.mBannerAd.destroy();
                this.mBannerAd = null;
            }
            else {
                console.log('===========bannerAd 为空');
            }
        }
        static navigateToMiniProgram(pkgName, path, onSuccess, onFail, onComplate) {
            if (Laya.Browser.onVVMiniGame) {
                console.log("vivo 跳转游戏： " + pkgName);
                Laya.Browser.window["qg"].navigateToMiniGame({
                    pkgName: pkgName,
                    path: path,
                    extraData: {
                        from: ryw_AppConfig.ryw_AppID
                    },
                    envVersion: 'release',
                    success(res) {
                        if (onSuccess) {
                            onSuccess(res);
                        }
                    },
                    fail(res) {
                        if (onFail) {
                            onFail(res);
                        }
                    },
                    complete(res) {
                        if (onComplate) {
                            onComplate(res);
                        }
                    }
                });
            }
        }
        static showInterstitialAd(onAdClose, onFailed) {
            if (Laya.Browser.onVVMiniGame) {
                var insertAd = Laya.Browser.window["qg"].createInterstitialAd({
                    posId: VIVOAPI.InsAdUnitId
                });
                insertAd.onLoad(() => {
                    console.log("插屏广告加载完成");
                });
                insertAd.onClose(() => {
                    if (onAdClose)
                        onAdClose();
                });
                insertAd.onError((err) => {
                    console.log("插屏广告拉取失败", JSON.stringify(err));
                    if (onFailed) {
                        onFailed();
                    }
                });
                insertAd.show().then(() => {
                    console.log("插屏广告显示成功");
                }).catch(err => {
                    if (onFailed)
                        onFailed();
                });
            }
            else {
                if (onAdClose)
                    onAdClose();
            }
        }
        static getLaunchOptionsSync() {
            return {};
        }
        static share(complate) {
            if (Laya.Browser.onVVMiniGame) {
                Laya.Browser.window["qg"].share({
                    success() {
                        if (complate != null) {
                            complate(true);
                        }
                        Laya.Browser.window["qg"].showToast({
                            message: "分享成功"
                        });
                    },
                    fail(erromsg, errocode) {
                        Laya.Browser.window["qg"].showToast({
                            message: "分享失败"
                        });
                    },
                    cancel() {
                        Laya.Browser.window["qg"].showToast({
                            message: "分享失败"
                        });
                    },
                    complete() {
                    }
                });
            }
        }
        static createDesktopIcon(onSuccess, onFail) {
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
        }
        static showNativeAd(onSuccess, onFail, index) {
            if (1 == index) {
                VIVOAPI.tryShowNativeAd1(onSuccess, onFail);
            }
            else if (2 == index) {
                VIVOAPI.tryShowNativeAd2(onSuccess, onFail);
            }
        }
        static tryShowNativeAd1(onSuccess, onFail) {
            if (!Laya.Browser.onVVMiniGame) {
                if (null != onFail) {
                    onFail();
                }
                return;
            }
            let success = () => {
                if (null != onSuccess) {
                    onSuccess();
                }
            };
            let yuanshengSwitch = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_vivocfg.ryw_yuanshengSwitch;
            let vivoVersions = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_vivocfg.ryw_vivoversions;
            if (1 == yuanshengSwitch && vivoVersions == ryw_AppConfig.ryw_Versions) {
                ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.VVNativeView1, null, (v) => {
                    success();
                });
            }
            else {
                if (null != onFail) {
                    onFail();
                }
            }
        }
        static tryShowNativeAd2(onSuccess, onFail) {
            if (!Laya.Browser.onVVMiniGame) {
                if (null != onFail) {
                    onFail();
                }
                return;
            }
            let success = () => {
                if (null != onSuccess) {
                    onSuccess();
                }
            };
            let yuanshengSwitch = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_vivocfg.ryw_yuanshengSwitch2;
            let vivoVersions = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_vivocfg.ryw_vivoversions;
            if (1 == yuanshengSwitch && vivoVersions == ryw_AppConfig.ryw_Versions) {
                ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.VVNativeView2, null, (v) => {
                    success();
                });
            }
            else {
                if (null != onFail) {
                    onFail();
                }
            }
        }
        static tryPopCreateDestopIcon(onSuccess, onFail) {
            if (!Laya.Browser.onVVMiniGame) {
                if (null != onFail) {
                    onFail();
                }
                return;
            }
            if (1 == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_vivocfg.ryw_addToDesktop) {
                VIVOAPI.createDesktopIcon(onSuccess, onFail);
            }
            else {
                if (null != onFail) {
                    onFail();
                }
            }
        }
        static tryShowInsAd(onSuccess, onFail) {
            let chapingSwitch = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_vivocfg.ryw_chapingSwitch;
            if (1 == chapingSwitch) {
                let rate = Math.random() * 100;
                if (rate <= ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_vivocfg.ryw_chaping) {
                    VIVOAPI.showInterstitialAd(() => {
                        if (onSuccess) {
                            onSuccess();
                        }
                    }, () => {
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
        }
    }
    VIVOAPI.adUnitId = "";
    VIVOAPI.bannerAdUnitId = "";
    VIVOAPI.nativeAdId = "";
    VIVOAPI.InsAdUnitId = "";
    VIVOAPI.rewardedAd = null;
    VIVOAPI.rewardedAdNum = 0;
    VIVOAPI._banner = null;
    VIVOAPI.mBannerAd = null;

    class ryw_KRQ_ComBase extends Laya.Script {
        constructor() {
            super(...arguments);
            this.ryw_AdPosID = -10086;
            this.ryw__datas = [];
            this.ryw__data = null;
        }
        get ryw_Sprite() {
            return this.owner;
        }
        get ryw_Data() {
            return this.ryw__data;
        }
        ryw_refresh(onComplate) {
            let self = this;
            ryw_ShareAd.ryw_getADVs(this.ryw_AdPosID, (datas) => {
                if (null != datas) {
                    self.ryw__datas = datas;
                    self.ryw__data = self.ryw__datas[Math.floor(Math.random() * datas.length)];
                    if (null != onComplate) {
                        onComplate();
                    }
                }
            }, false);
        }
        ryw_navigateToMiniProgram(d) {
            var data = null == d ? this.ryw__data : d;
            if (data) {
                console.log("跳转游戏： " + data.title);
                if (Laya.Browser.onMiniGame) {
                    ryw_WXAPI.ryw_navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        ryw_ShareAd.ryw_reportUserClick(data.appid);
                        ryw_ALD.ryw_aldSendReportAdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败");
                        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            ryw_ALD.ryw_aldSendReportAdClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQGMiniGame) {
                    ryw_OPPOAPI.ryw_navigateToMiniProgram(data.appid, data.title, data.url, (res) => {
                        console.log("跳转成功");
                        ryw_ShareAd.ryw_reportUserClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQQMiniGame) {
                    ryw_QQMiniGameAPI.ryw_navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        ryw_ShareAd.ryw_reportUserClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onVVMiniGame) {
                    VIVOAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        ryw_ShareAd.ryw_reportUserClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (ryw_AppConfig.onTTMiniGame) {
                    ryw_TTAPI.ryw_showMoreGamesModal(() => {
                        console.log("跳转成功");
                        ryw_ShareAd.ryw_reportUserClick(data.appid);
                    }, () => {
                        console.log("跳转失败");
                        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                    });
                }
            }
        }
        ryw_show() {
            this.ryw_Sprite.visible = true;
        }
        ryw_hide() {
            this.ryw_Sprite.visible = false;
        }
        ryw_autoScrollText(text) {
            if (text.overflow != Laya.Text.SCROLL)
                return;
            let forward = true;
            let deltaDis = 0;
            Laya.timer.frameLoop(1, text, () => {
                let d = Laya.timer.delta / 1000 * 10;
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
        }
    }

    class ryw_KRQ_LoopAdBox extends ryw_KRQ_ComBase {
        constructor() {
            super(...arguments);
            this.ryw__originW = 170;
            this.ryw__originH = 170;
        }
        onAwake() {
            this.ryw__displaySp = this.owner.getChildByName("Display");
            this.ryw__originW = this.ryw__displaySp.width;
            this.ryw__originH = this.ryw__displaySp.height;
            this.ryw__disText = this.owner.getChildByName("TitelText");
            this.ryw__disText.overflow = Laya.Text.SCROLL;
            this.ryw__disText.text = "";
        }
        onStart() {
            this.ryw_autoScrollText(this.ryw__disText);
        }
        onEnable() {
            this.ryw_Sprite.on(Laya.Event.CLICK, this, this.ryw_onClickAd);
        }
        onDisable() {
            this.ryw_Sprite.off(Laya.Event.CLICK, this, this.ryw_onClickAd);
        }
        ryw_onClickAd() {
            this.ryw_navigateToMiniProgram();
        }
        ryw_setData(data) {
            this.ryw__data = data;
            if (null != this.ryw__data) {
                let self = this;
                this.ryw__displaySp.loadImage(this.ryw__data.logo, Laya.Handler.create(this, function () {
                    if (!self.ryw__displaySp.destroyed) {
                        self.ryw__displaySp.width = self.ryw__originW;
                        self.ryw__displaySp.height = self.ryw__originH;
                    }
                }));
                let str = String(this.ryw__data.title);
                this.ryw__disText.text = str;
            }
        }
    }

    class ryw_KRQ_HLoopAd extends ryw_KRQ_ComBase {
        constructor() {
            super(...arguments);
            this.ryw_isEnable = true;
            this.ryw_useMovePause = true;
            this.ryw_useLocalRandom = false;
            this.ryw_useRandom = false;
            this.ryw_sortDatas = null;
            this.ryw__scrollForward = true;
            this.ryw__cellSize = new Laya.Point();
        }
        get ryw_Clip() {
            return this.owner;
        }
        onAwake() {
            this.ryw_AdPosID = ryw_ShareAd.ryw_LoopAdLocationID;
            this.ryw__list = this.owner.getChildByName("List");
            this.ryw__list.renderHandler = Laya.Handler.create(this, this.ryw_onListRender, null, false);
            this.ryw__list.hScrollBarSkin = "";
        }
        onStart() {
            let self = this;
            this.ryw__list.width = self.ryw_Clip.width;
            this.ryw__list.height = self.ryw_Clip.height;
            self.ryw_refresh(() => {
                if (null != self.ryw__list.cells && self.ryw__list.cells.length > 0) {
                    let box = self.ryw__list.cells[0];
                    self.ryw__cellSize.x = box.width;
                    self.ryw__cellSize.y = box.height;
                    if (self.ryw_useMovePause) {
                        setTimeout(() => {
                            if (self.ryw__list.scrollBar) {
                                self.ryw__list.scrollBar.value = 0;
                                self.ryw_move();
                            }
                        }, 2000);
                    }
                }
            });
        }
        ryw_refresh(onComplate) {
            if (!this.ryw_isEnable) {
                if (null != onComplate) {
                    onComplate();
                }
                return;
            }
            let self = this;
            ryw_ShareAd.ryw_getADVs(this.ryw_AdPosID, (datas) => {
                if (null != datas && datas.length > 0) {
                    self.ryw__datas = datas;
                    self.ryw__list.array = self.ryw__datas;
                    if (null != self.ryw_Sprite && !self.ryw_Sprite.destroyed) {
                        self.ryw_Sprite.visible = true;
                    }
                    if (null != onComplate) {
                        onComplate();
                    }
                }
                else {
                    if (null != self.ryw_Sprite && !self.ryw_Sprite.destroyed) {
                        self.ryw_Sprite.visible = false;
                    }
                }
            }, this.ryw_useRandom, this.ryw_useLocalRandom, this.ryw_sortDatas);
        }
        ryw_onListRender(cell, index) {
            var data = this.ryw__list.array[index];
            var loopAdBox = cell.getComponent(ryw_KRQ_LoopAdBox);
            loopAdBox.ryw_setData(data);
        }
        ryw_move() {
            let tonum = this.ryw__cellSize.x + this.ryw__list.spaceX;
            let left = 0;
            if (!this.ryw__scrollForward) {
                tonum *= -1;
                left = (this.ryw__list.scrollBar.max - this.ryw__list.scrollBar.value) % tonum * -1;
            }
            else {
                left = this.ryw__list.scrollBar.value % tonum;
            }
            if (this.ryw__list.scrollBar) {
                this.ryw__list.scrollBar.stopScroll();
                let scrollDelta = tonum;
                if (0 != left) {
                    scrollDelta = 2 * tonum - left;
                }
                let self = this;
                Laya.Tween.to(self.ryw__list.scrollBar, { value: self.ryw__list.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self, () => {
                }));
                Laya.timer.once(1010, self, () => {
                    if (self.ryw__list.scrollBar.value >= self.ryw__list.scrollBar.max) {
                        self.ryw__scrollForward = false;
                    }
                    else if (self.ryw__list.scrollBar.value <= 0) {
                        self.ryw__scrollForward = true;
                    }
                    Laya.timer.once(3000, self, () => {
                        if (self.ryw__list.scrollBar) {
                            self.ryw_move();
                        }
                    });
                });
            }
        }
        onUpdate() {
            if (this.ryw_useMovePause)
                return;
            if (this.ryw__scrollForward) {
                this.ryw__list.scrollBar.value += 100 * Laya.timer.delta / 1000;
                if (this.ryw__list.scrollBar.value >= this.ryw__list.scrollBar.max) {
                    this.ryw__scrollForward = false;
                }
            }
            else {
                this.ryw__list.scrollBar.value -= 100 * Laya.timer.delta / 1000;
                if (this.ryw__list.scrollBar.value <= 0) {
                    this.ryw__scrollForward = true;
                }
            }
        }
    }

    class ryw_KRQ_VLoopAd extends ryw_KRQ_HLoopAd {
        onAwake() {
            this.ryw_AdPosID = ryw_ShareAd.ryw_MoreGameLocationID;
            this.ryw__list = this.owner.getChildByName("List");
            this.ryw__list.renderHandler = Laya.Handler.create(this, this.ryw_onListRender, null, false);
            this.ryw__list.vScrollBarSkin = "";
        }
        ryw_move() {
            let tonum = this.ryw__cellSize.y + this.ryw__list.spaceY;
            let left = 0;
            if (!this.ryw__scrollForward) {
                tonum *= -1;
                left = (this.ryw__list.scrollBar.max - this.ryw__list.scrollBar.value) % tonum * -1;
            }
            else {
                left = this.ryw__list.scrollBar.value % tonum;
            }
            if (this.ryw__list.scrollBar) {
                this.ryw__list.scrollBar.stopScroll();
                let scrollDelta = tonum;
                if (0 != left) {
                    scrollDelta = 2 * tonum - left;
                }
                let self = this;
                Laya.Tween.to(self.ryw__list.scrollBar, { value: self.ryw__list.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self, () => {
                }));
                Laya.timer.once(1010, self, () => {
                    if (self.ryw__list.scrollBar.value >= self.ryw__list.scrollBar.max) {
                        self.ryw__scrollForward = false;
                    }
                    else if (self.ryw__list.scrollBar.value <= 0) {
                        self.ryw__scrollForward = true;
                    }
                    Laya.timer.once(3000, self, () => {
                        if (self.ryw__list.scrollBar) {
                            self.ryw_move();
                        }
                    });
                });
            }
        }
    }

    class ryw_KRQ_Banner extends ryw_KRQ_ComBase {
        constructor() {
            super(...arguments);
            this.ryw__wxBanner = null;
            this.ryw__onLoad = null;
            this.ryw__onError = null;
            this.ryw__onResize = null;
            this.ryw__isCreating = false;
            this.ryw__isDestroyed = false;
            this.ryw__isHide = false;
        }
        get ryw_Clip() {
            return this.owner;
        }
        onGetWXBanner() {
            return this.ryw__wxBanner;
        }
        onAwake() {
            this.ryw_AdPosID = ryw_ShareAd.ryw_BannerAdLocationID;
        }
        onStart() {
            this.ryw_refresh();
        }
        onEnable() {
            this.ryw_Sprite.on(Laya.Event.CLICK, this, this.ryw_onClickAd);
        }
        onDisable() {
            this.ryw_Sprite.off(Laya.Event.CLICK, this, this.ryw_onClickAd);
        }
        ryw_onClickAd() {
            this.ryw_navigateToMiniProgram();
        }
        ryw_refresh(onComplate) {
            if (this.ryw__isDestroyed)
                return;
            let banner = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_banner;
            if (1 == banner) {
                this.ryw_refreshWXBanner();
                if (Laya.Browser.onQQMiniGame && ryw_WudianMgr.ryw_GetIpBlocked()) {
                    let launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
                    let noEnterBySearch = true;
                    let wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
                    for (let i = 0; i < wudianSceneList.length; ++i) {
                        let wudianSceneValue = wudianSceneList[i];
                        if (launchScene == wudianSceneValue) {
                            noEnterBySearch = false;
                        }
                    }
                    if (noEnterBySearch) {
                        let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
                        Laya.timer.loop(bannerRecreateTime * 1000, this, this.ryw_refreshWXBanner);
                    }
                }
            }
            else {
                this.ryw_refreshBanner();
                if (Laya.Browser.onQQMiniGame && ryw_WudianMgr.ryw_GetIpBlocked()) {
                    let launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
                    let noEnterBySearch = true;
                    let wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
                    for (let i = 0; i < wudianSceneList.length; ++i) {
                        let wudianSceneValue = wudianSceneList[i];
                        if (launchScene == wudianSceneValue) {
                            noEnterBySearch = false;
                        }
                    }
                    if (noEnterBySearch) {
                        let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
                        Laya.timer.loop(bannerRecreateTime * 1000, this, this.ryw_refreshWXBanner);
                    }
                }
            }
        }
        ryw_refreshBanner() {
            if (null == this.ryw_Sprite || !this.ryw_Sprite.visible)
                return;
            if (this.ryw__isCreating || this.ryw__isDestroyed)
                return;
            this.ryw__isCreating = true;
            super.ryw_refresh(() => {
                if (null != this.ryw__data) {
                    let self = this;
                    this.ryw_Sprite.loadImage(this.ryw__data.logo, Laya.Handler.create(this, function () {
                        if (null != self.ryw_Sprite && !self.ryw_Sprite.destroyed) {
                            self.ryw_Sprite.width = 600;
                            self.ryw_Sprite.height = 205;
                        }
                    }));
                }
                this.ryw__isCreating = false;
            });
        }
        ryw_refreshWXBanner() {
            if ((!Laya.Browser.onMiniGame && !Laya.Browser.onQQMiniGame) || null == this.ryw_Sprite || this.ryw_Sprite.destroyed || !this.ryw_Sprite.visible) {
                Laya.timer.clearAll(this);
                this.ryw_clearWXBaner();
                return;
            }
            if (this.ryw__isCreating || this.ryw__isDestroyed || this.ryw__isHide)
                return;
            this.ryw_clearWXBaner();
            let self = this;
            let sysInfo = null;
            if (Laya.Browser.onMiniGame) {
                sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            }
            else if (Laya.Browser.onQQMiniGame) {
                sysInfo = Laya.Browser.window["qq"].getSystemInfoSync();
            }
            let sw = sysInfo.screenWidth;
            let sh = sysInfo.screenHeight;
            let pos = this.ryw_Sprite.localToGlobal(new Laya.Point(0, 0));
            let width = 300;
            let scale = self.ryw_Sprite.width / Laya.stage.width;
            let realWidth = sw * scale;
            let offset = (realWidth - width) / 2;
            let left = pos.x / Laya.stage.width * sw + offset;
            let top = pos.y / Laya.stage.height * sh;
            if (Laya.Browser.onMiniGame) {
                self.ryw__isCreating = true;
                let recreateBannerIDList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_recreateBannerIDList;
                let bannerAdUnitId = recreateBannerIDList[Math.floor(Math.random() * recreateBannerIDList.length)];
                if (null == bannerAdUnitId) {
                    bannerAdUnitId = ryw_WXAPI.ryw_bannerAdUnitId;
                }
                this.ryw__wxBanner = Laya.Browser.window["wx"].createBannerAd({
                    adUnitId: bannerAdUnitId,
                    adIntervals: 30,
                    style: {
                        left: left,
                        top: top,
                        width: width,
                    }
                });
                if (null != self.ryw__wxBanner) {
                    self.ryw__wxBanner.onLoad((res) => {
                        console.log("KRQ  WXBanner广告 加载完成 : ", bannerAdUnitId);
                        console.log(res);
                        self.ryw__isCreating = false;
                        if (self.ryw__isDestroyed || null == self.ryw__wxBanner || self.ryw__isHide) {
                            self.ryw_clearWXBaner();
                            return;
                        }
                        self.ryw__wxBanner.show();
                    });
                    self.ryw__wxBanner.onError((err) => {
                        console.log("KRQ WXBanner广告 加载失败 : ", bannerAdUnitId);
                        console.log(err);
                        self.ryw__isCreating = false;
                        self.ryw_clearWXBaner();
                        if (self.ryw__isDestroyed || self.ryw__isHide) {
                            return;
                        }
                        self.ryw_refreshBanner();
                    });
                    self.ryw__wxBanner.onResize(res => {
                    });
                }
                else {
                    self.ryw_refreshBanner();
                }
            }
            else if (Laya.Browser.onQQMiniGame) {
                self.ryw__isCreating = true;
                let recreateBannerIDList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_recreateBannerIDList;
                let bannerAdUnitId = recreateBannerIDList[Math.floor(Math.random() * recreateBannerIDList.length)];
                if (null == bannerAdUnitId) {
                    bannerAdUnitId = ryw_QQMiniGameAPI.ryw_bannerAdUnitId;
                }
                self.ryw__wxBanner = Laya.Browser.window["qq"].createBannerAd({
                    adUnitId: bannerAdUnitId,
                    adIntervals: 30,
                    style: {
                        left: left,
                        top: top,
                        width: width,
                    }
                });
                if (null != self.ryw__wxBanner) {
                    self.ryw__onLoad = (res) => {
                        console.log("KRQ QQBanner广告 加载完成 : ", bannerAdUnitId);
                        console.log(res);
                        self.ryw__isCreating = false;
                        if (self.ryw__isDestroyed || null == self.ryw__wxBanner || self.ryw__isHide) {
                            self.ryw_clearWXBaner();
                            return;
                        }
                        self.ryw__wxBanner.show();
                    };
                    self.ryw__wxBanner.onLoad(self.ryw__onLoad);
                    self.ryw__onError = (err) => {
                        console.log("KRQ QQBanner广告 加载失败 : ", bannerAdUnitId);
                        console.log(err);
                        self.ryw__isCreating = false;
                        self.ryw_clearWXBaner();
                        if (self.ryw__isDestroyed || null == self.ryw__wxBanner || self.ryw__isHide) {
                            return;
                        }
                        self.ryw_refreshBanner();
                    };
                    self.ryw__wxBanner.onError(self.ryw__onError);
                    self.ryw__onResize = (res) => {
                    };
                    self.ryw__wxBanner.onResize(self.ryw__onResize);
                }
                else {
                    self.ryw_refreshBanner();
                }
            }
        }
        ryw_clearWXBaner() {
            if (this.ryw__wxBanner) {
                this.ryw__wxBanner.hide();
                this.ryw__wxBanner.offLoad(this.ryw__onLoad);
                this.ryw__wxBanner.offError(this.ryw__onError);
                this.ryw__wxBanner.offResize(this.ryw__onResize);
                this.ryw__wxBanner.destroy();
            }
            this.ryw__wxBanner = null;
        }
        onViewShow() {
            this.ryw__isHide = false;
            let banner = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_banner;
            if (1 == banner) {
                if (null == this.ryw__wxBanner) {
                    this.ryw_refreshWXBanner();
                    if (Laya.Browser.onQQMiniGame && ryw_WudianMgr.ryw_GetIpBlocked()) {
                        let launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
                        let noEnterBySearch = true;
                        let wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
                        for (let i = 0; i < wudianSceneList.length; ++i) {
                            let wudianSceneValue = wudianSceneList[i];
                            if (launchScene == wudianSceneValue) {
                                noEnterBySearch = false;
                            }
                        }
                        if (noEnterBySearch) {
                            let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
                            Laya.timer.loop(bannerRecreateTime * 1000, this, this.ryw_refreshWXBanner);
                        }
                    }
                }
            }
            else {
                this.ryw_refreshBanner();
                if (Laya.Browser.onQQMiniGame && ryw_WudianMgr.ryw_GetIpBlocked()) {
                    let launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
                    let noEnterBySearch = true;
                    let wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
                    for (let i = 0; i < wudianSceneList.length; ++i) {
                        let wudianSceneValue = wudianSceneList[i];
                        if (launchScene == wudianSceneValue) {
                            noEnterBySearch = false;
                        }
                    }
                    if (noEnterBySearch) {
                        let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
                        Laya.timer.loop(bannerRecreateTime * 1000, this, this.ryw_refreshWXBanner);
                    }
                }
            }
        }
        onViewHide() {
            this.ryw_clearWXBaner();
            Laya.timer.clearAll(this);
            this.ryw__isHide = true;
        }
        onDestroy() {
            this.ryw_clearWXBaner();
            Laya.timer.clearAll(this);
            this.ryw__isDestroyed = true;
        }
        ryw_show() {
            super.ryw_show();
            this.onViewShow();
        }
        ryw_hide() {
            super.ryw_hide();
            this.onViewHide();
        }
    }

    class ryw_KRQ_ViewComBase extends Laya.Script {
        constructor() {
            super(...arguments);
            this.ryw_onShow = null;
            this.ryw_onHide = null;
        }
        get ryw_Sprite() {
            return this.owner;
        }
        ryw_show() {
            this.ryw_Sprite.visible = true;
            if (null != this.ryw_onShow) {
                this.ryw_onShow();
            }
        }
        ryw_hide() {
            this.ryw_Sprite.visible = false;
            if (null != this.ryw_onHide) {
                this.ryw_onHide();
            }
        }
    }

    class ryw_Utilit {
        static ryw_Lerp(form, to, delta) {
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
        }
        static ryw_lerpEulerAngle(form, to, delta) {
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
            var next = ryw_Utilit.ryw_Lerp(form, to, delta);
            return next;
        }
        static ryw_getRotationByDir(v) {
            var dotValue = (v.x * ryw_Utilit.ryw_poinDown.x) + (v.y * ryw_Utilit.ryw_poinDown.y);
            var cos = dotValue / (v.distance(0, 0) * ryw_Utilit.ryw_poinDown.distance(0, 0));
            var radian = Math.acos(cos);
            var rotation = radian / (2 * Math.PI) * 360;
            if (v.x < 0) {
                rotation = -rotation;
            }
            return rotation;
        }
        static ryw_getRotationByDirOn3DSpace(v) {
            var dotValue = (v.x * ryw_Utilit.ryw_poinUp.x) + (v.y * ryw_Utilit.ryw_poinUp.y);
            var cos = dotValue / (v.distance(0, 0) * ryw_Utilit.ryw_poinUp.distance(0, 0));
            var radian = Math.acos(cos);
            var rotation = radian / (2 * Math.PI) * 360;
            if (v.x < 0) {
                rotation = rotation + (180 - rotation) * 2;
            }
            return rotation;
        }
        static ryw_getDirByRotation(rotation) {
            var radian = (rotation - 90) * Math.PI / 180;
            var x = Math.cos(radian);
            var y = Math.sin(radian);
            var point = new Laya.Point(x, y);
            point.normalize();
            return point;
        }
        static ryw_getDirDirAngle(dir1, dir2) {
            var dotValue = (dir1.x * dir2.x) + (dir1.y * dir2.y);
            var cos = dotValue / (dir1.distance(0, 0) * dir2.distance(0, 0));
            var radian = Math.acos(cos);
            var angle = radian / (2 * Math.PI) * 360;
            return angle;
        }
        static ryw_getDirScalarLength(dir) {
            var sl = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
            return sl;
        }
        static ryw_setSpOnParentCenter(sp) {
            if (null == sp.parent)
                return;
            var psp = sp.parent;
            var x = 0;
            var y = 0;
            var x = x - sp.width / 2 * sp.scaleX + psp.width / 2;
            var y = y - sp.height / 2 * sp.scaleY + psp.height / 2;
            sp.x = x;
            sp.y = y;
        }
        static ryw_getPointToLineDistance(x, y, LineStart, LineEnd) {
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
        }
        static ryw_isIphoneX() {
            if (!Laya.Browser.onIPhone)
                return false;
            if ((Laya.Browser.width == 2436 && Laya.Browser.height == 1125)
                || (Laya.Browser.height == 2436 && Laya.Browser.width == 1125)) {
                return true;
            }
            return false;
        }
        static ryw_isIphone() {
            return Laya.Browser.onIPhone;
        }
        static ryw_getChild(node, name) {
            for (var i = 0; i < node.numChildren; ++i) {
                var child = node.getChildAt(i);
                if (child.name == name) {
                    return child;
                }
                else {
                    var target = ryw_Utilit.ryw_getChild(child, name);
                    if (target)
                        return target;
                }
            }
            return null;
        }
        static ryw_forEachChild(node, each) {
            for (let i = 0; i < node.numChildren; ++i) {
                let child = node.getChildAt(i);
                each(child);
                ryw_Utilit.ryw_forEachChild(child, each);
            }
        }
    }
    ryw_Utilit.ryw_OriginStageWidth = 1334;
    ryw_Utilit.ryw_OriginStageHeight = 750;
    ryw_Utilit.ryw_grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0, 0, 0, 1, 0];
    ryw_Utilit.ryw_grayscaleFilter = new Laya.ColorFilter(ryw_Utilit.ryw_grayscaleMat);
    ryw_Utilit.ryw_poinDown = new Laya.Point(0, -1);
    ryw_Utilit.ryw_poinUp = new Laya.Point(0, 1);

    class ryw_KRQ_HistoryBox extends ryw_KRQ_ComBase {
        constructor() {
            super(...arguments);
            this.ryw__icon = null;
            this.ryw__text = null;
            this.ryw__mark = null;
        }
        onAwake() {
            this.ryw__icon = this.ryw_Sprite.getChildByName("Icon");
            this.ryw__text = this.ryw_Sprite.getChildByName("Text");
            this.ryw__text.overflow = Laya.Text.SCROLL;
            this.ryw__text.text = "";
            this.ryw__mark = this.ryw_Sprite.getChildByName("Mark");
            this.ryw__mark.visible = false;
        }
        onStart() {
            this.ryw_autoScrollText(this.ryw__text);
        }
        onEnable() {
            this.ryw_Sprite.on(Laya.Event.CLICK, this, this.ryw_onClickAd);
        }
        onDisable() {
            this.ryw_Sprite.off(Laya.Event.CLICK, this, this.ryw_onClickAd);
        }
        ryw_onClickAd() {
            this.ryw_navigateToMiniProgram();
        }
        ryw_setData(data, star) {
            this.ryw__data = data;
            if (null != this.ryw__data) {
                var self = this;
                this.ryw__icon.loadImage(this.ryw__data.logo, Laya.Handler.create(this, function () {
                    if (!self.ryw__icon.destroyed) {
                        self.ryw__icon.width = 100;
                        self.ryw__icon.height = 100;
                    }
                }));
                var str = String(this.ryw__data.title);
                this.ryw__text.text = str;
                this.ryw__mark.visible = star;
            }
        }
    }

    class ryw_KRQ_History extends ryw_KRQ_ComBase {
        constructor() {
            super(...arguments);
            this.ryw_OnBackBtnClick = null;
            this.ryw__topZone = null;
            this.ryw__backBtn = null;
            this.ryw__startList = new Array();
        }
        onAwake() {
            this.ryw_AdPosID = ryw_ShareAd.ryw_HistoryLocationID;
            this.ryw__topZone = this.ryw_Sprite.getChildByName("TopZone");
            this.ryw__backBtn = this.ryw__topZone.getChildByName("BackBtn");
            this.ryw__list = this.ryw_Sprite.getChildByName("List");
            this.ryw__list.renderHandler = Laya.Handler.create(this, this.ryw_onListRender, null, false);
            this.ryw__list.vScrollBarSkin = "";
        }
        onStart() {
            this.ryw_refresh();
        }
        onEnable() {
            this.ryw__backBtn.on(Laya.Event.CLICK, this, this.ryw_onBackBtn);
        }
        onDisable() {
            this.ryw__backBtn.off(Laya.Event.CLICK, this, this.ryw_onBackBtn);
        }
        ryw_refresh(onComplate) {
            let self = this;
            ryw_ShareAd.ryw_getADVs(this.ryw_AdPosID, (datas) => {
                if (null != datas) {
                    self.ryw__datas = datas;
                    self.ryw__startList.splice(0);
                    for (let i = 0; i < self.ryw__datas.length; ++i) {
                        self.ryw__startList.push(false);
                    }
                    let num = Math.floor(self.ryw__startList.length * 0.33);
                    while (num > 0) {
                        let index = Math.floor(Math.random() * self.ryw__startList.length);
                        if (false == self.ryw__startList[index]) {
                            self.ryw__startList[index] = true;
                            --num;
                        }
                    }
                    self.ryw__list.array = self.ryw__datas;
                }
            }, false);
        }
        ryw_onListRender(cell, index) {
            let data = this.ryw__list.array[index];
            let star = this.ryw__startList[index];
            let historyBox = cell.getComponent(ryw_KRQ_HistoryBox);
            historyBox.ryw_setData(data, star);
        }
        ryw_onBackBtn() {
            this.ryw_hide();
            if (null != this.ryw_OnBackBtnClick) {
                this.ryw_OnBackBtnClick();
            }
        }
        ryw_show() {
            super.ryw_show();
            this.ryw_refresh();
        }
    }

    class ryw_KRQ_Export extends ryw_KRQ_ViewComBase {
        constructor() {
            super(...arguments);
            this.ryw_onContinueBtnClick = null;
            this.ryw__topZone = null;
            this.ryw__backBtn = null;
            this.ryw__centerZone = null;
            this.ryw__continueBtn = null;
            this.ryw__krqHistory = null;
            this.ryw__krqBanner = null;
        }
        get ryw_BackBtn() {
            if (null == this.ryw__backBtn) {
                this.ryw__backBtn = this.ryw_Sprite.getChildByName("TopZone").getChildByName("BackBtn");
            }
            return this.ryw__backBtn;
        }
        get ryw_ContinueBtn() {
            if (null == this.ryw__continueBtn) {
                this.ryw__continueBtn = this.ryw_Sprite.getChildByName("CenterZone").getChildByName("ContinueBtn");
            }
            return this.ryw__continueBtn;
        }
        onAwake() {
            this.ryw__topZone = this.ryw_Sprite.getChildByName("TopZone");
            if (ryw_Utilit.ryw_isIphoneX()) {
                this.ryw__topZone.top = this.ryw__topZone.top + 75;
            }
            this.ryw__backBtn = this.ryw__topZone.getChildByName("BackBtn");
            this.ryw__centerZone = this.ryw_Sprite.getChildByName("CenterZone");
            if (ryw_Utilit.ryw_isIphoneX()) {
                this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
            }
            this.ryw__continueBtn = this.ryw__centerZone.getChildByName("ContinueBtn");
            this.ryw__krqHistory = this.owner.getChildByName("KRQ_History").getComponent(ryw_KRQ_History);
            this.ryw__krqBanner = this.owner.getChildByName("KRQ_Banner").getComponent(ryw_KRQ_Banner);
            let self = this;
            this.ryw__krqHistory.ryw_OnBackBtnClick = () => {
                self.ryw__krqBanner.ryw_show();
            };
        }
        onEnable() {
            this.ryw__backBtn.on(Laya.Event.CLICK, this, this.ryw_onBackBtn);
            this.ryw__continueBtn.on(Laya.Event.CLICK, this, this.ryw_onContinueBtn);
        }
        onDisable() {
            this.ryw__backBtn.off(Laya.Event.CLICK, this, this.ryw_onBackBtn);
            this.ryw__continueBtn.off(Laya.Event.CLICK, this, this.ryw_onContinueBtn);
        }
        ryw_onBackBtn() {
            this.ryw__krqHistory.ryw_show();
            this.ryw__krqBanner.ryw_hide();
        }
        ryw_onContinueBtn() {
            if (null != this.ryw_onContinueBtnClick) {
                this.ryw_onContinueBtnClick();
            }
        }
    }

    class ryw_KRQ_SingleAd extends ryw_KRQ_ComBase {
        constructor() {
            super(...arguments);
            this.ryw__originW = 300;
            this.ryw__originH = 300;
        }
        onAwake() {
            this.ryw_AdPosID = ryw_ShareAd.ryw_LoopAdLocationID;
            this.ryw__display = this.ryw_Sprite.getChildByName("Display");
            this.ryw__text = this.ryw_Sprite.getChildByName("Text");
            this.ryw__text.overflow = Laya.Text.SCROLL;
            this.ryw__text.text = "";
        }
        onEnable() {
            this.ryw_Sprite.on(Laya.Event.CLICK, this, this.ryw_onClickAd);
        }
        onDisable() {
            this.ryw_Sprite.off(Laya.Event.CLICK, this, this.ryw_onClickAd);
        }
        onStart() {
            this.ryw_autoScrollText(this.ryw__text);
            this.ryw_refresh();
        }
        ryw_refresh(onComplate) {
            let self = this;
            ryw_ShareAd.ryw_getADVs(this.ryw_AdPosID, (datas) => {
                if (null != datas) {
                    self.ryw__datas = datas;
                    if (self.ryw_Sprite && !self.ryw_Sprite.destroyed) {
                        for (let i = 0; i < self.ryw__datas.length; ++i) {
                            let find = false;
                            let data = self.ryw__datas[i];
                            for (let j = 0; j < ryw_KRQ_SingleAd.ryw__repeatCheckList.length; ++j) {
                                let appid = ryw_KRQ_SingleAd.ryw__repeatCheckList[j];
                                if (appid == data.appid) {
                                    find = true;
                                    break;
                                }
                            }
                            if (!find) {
                                self.ryw_clearRepeat();
                                self.ryw__data = data;
                                break;
                            }
                        }
                        if (null == self.ryw__data) {
                            self.ryw__data = self.ryw__datas[Math.floor(Math.random() * datas.length)];
                        }
                        if (null != self.ryw__data) {
                            self.ryw__display.loadImage(self.ryw__data.logo, Laya.Handler.create(self, function () {
                                if (null != self.ryw_Sprite && !self.ryw_Sprite.destroy) {
                                    self.ryw_Sprite.visible = true;
                                    if (onComplate) {
                                        onComplate();
                                    }
                                }
                            }));
                            var str = self.ryw__data.title;
                            self.ryw__text.text = str;
                            let isHas = false;
                            for (let j = 0; j < ryw_KRQ_SingleAd.ryw__repeatCheckList.length; ++j) {
                                let appid = ryw_KRQ_SingleAd.ryw__repeatCheckList[j];
                                if (appid == self.ryw__data.appid) {
                                    isHas = true;
                                    break;
                                }
                            }
                            if (!isHas) {
                                ryw_KRQ_SingleAd.ryw__repeatCheckList.push(self.ryw__data.appid);
                            }
                        }
                        else {
                            if (null != self.ryw_Sprite && !self.ryw_Sprite.destroy) {
                                self.ryw_Sprite.visible = false;
                            }
                            if (onComplate) {
                                onComplate();
                            }
                        }
                    }
                }
                else {
                    self.ryw_Sprite.visible = false;
                    if (onComplate) {
                        onComplate();
                    }
                }
            });
        }
        ryw_hide() {
            this.ryw_Sprite.visible = false;
            this.ryw_clearRepeat();
        }
        ryw_clearRepeat() {
            if (null != this.ryw__data) {
                for (let i = 0; i < ryw_KRQ_SingleAd.ryw__repeatCheckList.length; ++i) {
                    let appid = ryw_KRQ_SingleAd.ryw__repeatCheckList[i];
                    if (appid == this.ryw__data.appid) {
                        ryw_KRQ_SingleAd.ryw__repeatCheckList.splice(i, 1);
                        break;
                    }
                }
            }
        }
        ryw_onClickAd() {
            this.ryw_navigateToMiniProgram();
            this.ryw_refresh();
        }
        onDestroy() {
            this.ryw_clearRepeat();
        }
    }
    ryw_KRQ_SingleAd.ryw__repeatCheckList = new Array();

    class ryw_KRQ_RockSingleAd extends ryw_KRQ_SingleAd {
        ryw_playAni(onComplate) {
            let self = this;
            self.ryw_Sprite.rotation = 0;
            Laya.Tween.to(self.ryw_Sprite, {
                rotation: 20,
            }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, () => {
                Laya.Tween.to(self.ryw_Sprite, {
                    rotation: 0,
                }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, () => {
                    self.ryw_Sprite.rotation = 0;
                    if (null != onComplate) {
                        onComplate();
                    }
                }));
            }));
        }
    }

    class ryw_KRQ_Floating extends ryw_KRQ_ViewComBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__rockSingleAds = new Array();
            this.ryw__aniSpaceing = 3000;
        }
        onAwake() {
            this.ryw__centerZone = this.ryw_Sprite.getChildByName("CenterZone");
            for (let i = 0; i < this.ryw__centerZone.numChildren; ++i) {
                let child = this.ryw__centerZone.getChildAt(i);
                if (child.visible) {
                    let rockAd = child.getComponent(ryw_KRQ_RockSingleAd);
                    this.ryw__rockSingleAds.push(rockAd);
                }
            }
        }
        onStart() {
            let self = this;
            self.ryw_playAni();
            Laya.timer.loop(this.ryw__rockSingleAds.length * (this.ryw__aniSpaceing + 500), this, () => {
                self.ryw_playAni(() => {
                    self.ryw_refreshAd();
                });
            });
        }
        ryw_refreshAd() {
            for (let i = 0; i < this.ryw__rockSingleAds.length; ++i) {
                let ad = this.ryw__rockSingleAds[i];
                if (null == ad.ryw_Data) {
                    ad.ryw_Sprite.visible = false;
                }
                ad.ryw_refresh();
            }
        }
        ryw_playAni(onComplate) {
            let len = this.ryw__rockSingleAds.length;
            for (let i = 0; i < this.ryw__rockSingleAds.length; ++i) {
                let index = i;
                let ad = this.ryw__rockSingleAds[index];
                Laya.timer.once(this.ryw__aniSpaceing * i, ad, () => {
                    if (index == len - 1) {
                        ad.ryw_playAni(onComplate);
                    }
                    else {
                        ad.ryw_playAni();
                    }
                });
            }
        }
    }

    class ryw_KRQ_RollSingleAd extends ryw_KRQ_SingleAd {
        constructor() {
            super(...arguments);
            this._originX = null;
        }
        onAwake() {
            super.onAwake();
            this._originX = this.ryw_Sprite.x;
            this.ryw_Sprite.x -= Laya.stage.width;
        }
        ryw_playAni(onComplate) {
            let cur = this._originX;
            let next = cur - Laya.stage.width;
            this.ryw_Sprite.x = next;
            Laya.Tween.to(this.ryw_Sprite, {
                rotation: 360,
            }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                this.ryw_Sprite.rotation = 0;
            }));
            Laya.Tween.to(this.ryw_Sprite, {
                x: cur,
            }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                this.ryw_Sprite.x = cur;
                if (null != onComplate) {
                    onComplate();
                }
            }));
        }
    }

    class ryw_KRQ_GameOver extends ryw_KRQ_ViewComBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__rollSingleAds = new Array();
        }
        onAwake() {
            this.ryw__centerZone = this.ryw_Sprite.getChildByName("CenterZone");
            for (let i = 0; i < this.ryw__centerZone.numChildren; ++i) {
                let ad = this.ryw__centerZone.getChildAt(i).getComponent(ryw_KRQ_RollSingleAd);
                this.ryw__rollSingleAds.push(ad);
            }
        }
        onStart() {
            for (let i = 0; i < this.ryw__rollSingleAds.length; ++i) {
                let ad = this.ryw__rollSingleAds[i];
                Laya.timer.once((this.ryw__rollSingleAds.length - i) * 150, this, () => {
                    ad.ryw_playAni();
                });
            }
        }
    }

    class ryw_KRQ_SidePull extends ryw_KRQ_ViewComBase {
        constructor() {
            super(...arguments);
            this.ryw__krqVLoopAd = null;
            this.ryw__pullBtn = null;
        }
        onAwake() {
            this.ryw__krqVLoopAd = this.ryw_Sprite.getChildByName("KRQ_VLoopAd").getComponent(ryw_KRQ_VLoopAd);
            this.ryw__pullBtn = this.ryw__krqVLoopAd.ryw_Sprite.getChildByName("PullBtn");
            this.ryw__krqVLoopAd.ryw_Sprite.x = -this.ryw__krqVLoopAd.ryw_Sprite.width;
        }
        onEnable() {
            this.ryw__pullBtn.on(Laya.Event.CLICK, this, this.ryw_onPullBtn);
        }
        onDisable() {
            this.ryw__pullBtn.off(Laya.Event.CLICK, this, this.ryw_onPullBtn);
        }
        ryw_onPullBtn() {
            if (this.ryw__krqVLoopAd.ryw_Sprite.x < 0) {
                this.ryw_pull();
            }
            else {
                this.ryw_push();
            }
        }
        ryw_pull() {
            Laya.Tween.to(this.ryw__krqVLoopAd.ryw_Sprite, {
                x: 0
            }, 200, Laya.Ease.linearNone, null, 0, true);
        }
        ryw_push() {
            Laya.Tween.to(this.ryw__krqVLoopAd.ryw_Sprite, {
                x: -this.ryw__krqVLoopAd.ryw_Sprite.width
            }, 200, Laya.Ease.linearNone, null, 0, true);
        }
        ryw_onShareAdFail() {
            this.ryw_pull();
        }
    }

    var ryw_KRQ_MainState;
    (function (ryw_KRQ_MainState) {
        ryw_KRQ_MainState[ryw_KRQ_MainState["Normal"] = 0] = "Normal";
        ryw_KRQ_MainState[ryw_KRQ_MainState["NoLoopAd"] = 1] = "NoLoopAd";
        ryw_KRQ_MainState[ryw_KRQ_MainState["NoBannerAd"] = 2] = "NoBannerAd";
    })(ryw_KRQ_MainState || (ryw_KRQ_MainState = {}));
    class ryw_KRQ_Main extends ryw_KRQ_ViewComBase {
        constructor() {
            super(...arguments);
            this.ryw__topZone = null;
            this.ryw__historyBtn = null;
            this.ryw__krqLoopAd = null;
            this.ryw__bottomZone = null;
            this.ryw__krqBanner = null;
            this.ryw__krqHistory = null;
        }
        onAwake() {
            this.ryw__topZone = this.ryw_Sprite.getChildByName("TopZone");
            this.ryw__historyBtn = this.ryw__topZone.getChildByName("HistoryBtn");
            this.ryw__historyBtn.visible = false;
            if (ryw_Utilit.ryw_isIphoneX()) {
                this.ryw__topZone.top = this.ryw__topZone.top + 75;
            }
            this.ryw__krqLoopAd = this.ryw_Sprite.getChildByName("KRQ_HLoopAd").getComponent(ryw_KRQ_HLoopAd);
            this.ryw__krqBanner = this.ryw_Sprite.getChildByName("KRQ_Banner").getComponent(ryw_KRQ_Banner);
            this.ryw__krqHistory = this.ryw_Sprite.getChildByName("KRQ_History").getComponent(ryw_KRQ_History);
            let self = this;
            let aspectRatio = Laya.stage.width / Laya.stage.height;
            this.ryw__krqHistory.ryw_OnBackBtnClick = () => {
                if (aspectRatio < 0.5) {
                    self.ryw__krqBanner.ryw_show();
                }
            };
            this.ryw__krqLoopAd.ryw_Sprite.visible = false;
            if (aspectRatio < 0.5) {
                this.ryw__krqLoopAd.ryw_Clip.top = 100;
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__krqLoopAd.ryw_Clip.top = this.ryw__krqLoopAd.ryw_Clip.top + 75;
                }
                this.ryw__krqBanner.ryw_Sprite.visible = true;
            }
            else {
                this.ryw__krqLoopAd.ryw_Clip.top = Laya.stage.height - 280;
                this.ryw__krqBanner.ryw_Sprite.visible = false;
            }
        }
        ryw_switchState(state) {
            if (state == ryw_KRQ_MainState.Normal) {
                let aspectRatio = Laya.stage.width / Laya.stage.height;
                if (aspectRatio < 0.5) {
                    this.ryw__krqLoopAd.ryw_Clip.top = 100;
                    if (ryw_Utilit.ryw_isIphoneX()) {
                        this.ryw__krqLoopAd.ryw_Clip.top = this.ryw__krqLoopAd.ryw_Clip.top + 75;
                    }
                    this.ryw__krqBanner.ryw_Sprite.visible = true;
                }
                else {
                    this.ryw__krqLoopAd.ryw_Clip.top = Laya.stage.height - 280;
                    this.ryw__krqBanner.ryw_Sprite.visible = false;
                }
            }
            else if (state == ryw_KRQ_MainState.NoLoopAd) {
                this.ryw__krqLoopAd.ryw_isEnable = false;
                this.ryw__krqLoopAd.ryw_Sprite.visible = false;
                this.ryw__krqBanner.ryw_Sprite.visible = true;
            }
            else if (state == ryw_KRQ_MainState.NoBannerAd) {
                this.ryw__krqLoopAd.ryw_Clip.top = Laya.stage.height - 280;
                this.ryw__krqBanner.ryw_AdPosID = -1;
                this.ryw__krqBanner.ryw_Sprite.visible = false;
            }
        }
        onEnable() {
            this.ryw__historyBtn.on(Laya.Event.CLICK, this, this.ryw_onHistoryBtn);
        }
        onDisable() {
            this.ryw__historyBtn.off(Laya.Event.CLICK, this, this.ryw_onHistoryBtn);
        }
        ryw_onHistoryBtn() {
            this.ryw__krqHistory.ryw_show();
            this.ryw__krqBanner.ryw_hide();
        }
    }

    class ryw_KRQ_GamingBanner extends ryw_KRQ_Banner {
        ryw_refresh(onComplate) {
            let launchScene = null;
            if (Laya.Browser.onMiniGame) {
                launchScene = ryw_WXAPI.ryw_getLaunchOptionsSync().scene;
            }
            else if (Laya.Browser.onQQMiniGame) {
                launchScene = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync().scene;
            }
            let noEnterBySearch = true;
            let wudianSceneList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wudianSceneList;
            for (let i = 0; i < wudianSceneList.length; ++i) {
                let wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            let ipBlocked = ryw_WudianMgr.ryw_GetIpBlocked();
            if (!ipBlocked || !noEnterBySearch) {
                this.ryw_Sprite.visible = false;
                if (null != onComplate) {
                    onComplate();
                }
                return;
            }
            let banner = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_banner;
            if (1 == banner) {
                this.ryw_refreshWXBanner();
            }
            else {
                super.ryw_refresh(() => {
                    this.ryw_refreshBanner();
                    if (null != onComplate) {
                        onComplate();
                    }
                });
            }
        }
    }

    function isIViewStateListener(element) {
        if ((null != element.onViewShow && typeof (element.onViewShow) == "function")
            && (null != element.onViewHide && typeof (element.onViewHide) == "function")) {
            return true;
        }
        return false;
    }

    class ryw_ViewBase extends Laya.Script {
        constructor() {
            super(...arguments);
            this.ryw_onCloseEvent = null;
            this.ryw_onOpenEvent = null;
            this._viewBase = true;
            this._viewDef = ryw_ViewDef.ryw_None;
            this._data = {};
        }
        get ryw_View() {
            return this.owner;
        }
        onAwake() {
            this.ryw_View.autoDestroyAtClosed = true;
        }
        onEnable() {
            this.ryw_addEvent();
        }
        onDisable() {
            this.ryw_removeEvent();
        }
        onDestroy() {
            this.ryw_removeEvent();
        }
        ryw_openView(data) {
            this._data = data;
            this.ryw_show();
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_Game_OnViewOpen, { view: this._viewDef });
            if (this.ryw_onOpenEvent) {
                this.ryw_onOpenEvent();
            }
        }
        ryw_addEvent() {
        }
        ryw_removeEvent() {
            Laya.timer.clearAll(this);
        }
        ryw_closeView() {
            ryw_ViewMgr.ryw_instance.ryw_closeView(this._viewDef);
        }
        ryw_hide() {
            this.ryw_View.visible = false;
            this.onHide();
            ryw_Utilit.ryw_forEachChild(this.owner, (child) => {
                let coms = child._components;
                if (coms) {
                    for (let index = 0; index < coms.length; index++) {
                        const element = coms[index];
                        if (isIViewStateListener(element)) {
                            element.onViewHide(this);
                        }
                    }
                }
            });
        }
        ryw_show() {
            this.ryw_View.visible = true;
            this.onShow();
            ryw_Utilit.ryw_forEachChild(this.owner, (child) => {
                let coms = child._components;
                if (coms) {
                    for (let index = 0; index < coms.length; index++) {
                        const element = coms[index];
                        if (isIViewStateListener(element)) {
                            element.onViewShow(this);
                        }
                    }
                }
            });
        }
        ryw_viewIsHide() {
            return this.ryw_View.visible;
        }
        onHide() { }
        onShow() { }
        onClose() {
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this);
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_Game_OnViewClose, { view: this._viewDef });
            if (this.ryw_onCloseEvent) {
                this.ryw_onCloseEvent();
            }
        }
    }

    class GameOverView extends ryw_ViewBase {
        constructor() {
            super(...arguments);
            this._nextBtn = null;
            this._winImg = null;
            this._againBtn = null;
            this._lostImg = null;
            this._topZone = null;
            this._krqHistory = null;
        }
        onAwake() {
            this._nextBtn = this.owner.getChildByName("btnClip").getChildByName("NextBtn");
            this._winImg = this.owner.getChildByName("winImg");
            this._againBtn = this.owner.getChildByName("btnClip").getChildByName("AgainBtn");
            this._lostImg = this.owner.getChildByName("lostImg");
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this._nextBtn.on(Laya.Event.CLICK, this, this.onNextLevelClick);
            this._againBtn.on(Laya.Event.CLICK, this, this.onNextLevelClick);
            this._topZone.on(Laya.Event.CLICK, this, this.onHistoryBtn);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this._nextBtn.off(Laya.Event.CLICK, this, this.onNextLevelClick);
            this._againBtn.off(Laya.Event.CLICK, this, this.onNextLevelClick);
            this._topZone.off(Laya.Event.CLICK, this, this.onHistoryBtn);
        }
        onHistoryBtn() {
        }
        onNextLevelClick() {
            var self = this;
            ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_Export2View, null, (v) => {
                self.ryw_closeView();
            });
        }
        ryw_openView(data) {
            super.ryw_openView(data);
            var result = data.result;
            if (result == 0) {
                this._againBtn.visible = true;
                this._lostImg.visible = true;
                this._nextBtn.visible = false;
                this._winImg.visible = false;
            }
            else {
                this._againBtn.visible = false;
                this._lostImg.visible = false;
                this._nextBtn.visible = true;
                this._winImg.visible = true;
            }
        }
    }

    class ryw_ButtonAnim extends Laya.Script {
        constructor() {
            super();
            this.ryw_useSound = true;
        }
        onAwake() {
            this.owner.on(Laya.Event.MOUSE_DOWN, this, this.ryw_onDown);
            this.owner.on(Laya.Event.MOUSE_UP, this, this.ryw_onUp);
            this.owner.on(Laya.Event.MOUSE_OUT, this, this.ryw_onUp);
        }
        onDisable() {
            this.owner.offAll();
            Laya.Tween.clearAll(this);
        }
        ryw_onDown() {
            Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
            if (this.ryw_useSound) {
                ryw_SoundMgr.ryw_instance.ryw_playSound("anniu");
            }
        }
        ryw_onUp() {
            Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
        }
    }

    class LevelTitle extends Laya.Script {
        constructor() {
            super(...arguments);
            this._bg = null;
            this._diImg = null;
            this._guanImg = null;
            this._fontClip = null;
        }
        onAwake() {
            this._bg = this.owner;
            this._diImg = this.owner.getChildByName("di");
            this._guanImg = this.owner.getChildByName("guan");
            this._fontClip = this.owner.getChildByName("fontClip");
        }
        onStart() {
        }
        setLevelString(num) {
            let str = num.toString();
            this._fontClip.value = str;
        }
    }

    var ryw_UnitType;
    (function (ryw_UnitType) {
        ryw_UnitType["None"] = "";
        ryw_UnitType["ryw_Warrior"] = "Warrior";
        ryw_UnitType["ryw_Queen"] = "Queen";
        ryw_UnitType["ryw_Arrow"] = "Arrow";
        ryw_UnitType["ryw_Bomb"] = "Bomb";
        ryw_UnitType["ryw_Cannon"] = "Cannon";
        ryw_UnitType["ryw_CannonGravity"] = "CannonGravity";
        ryw_UnitType["ryw_Cannonball"] = "Cannonball";
        ryw_UnitType["ryw_Bear"] = "Bear";
        ryw_UnitType["ryw_Tiger"] = "Tiger";
        ryw_UnitType["ryw_Wolf"] = "Wolf";
    })(ryw_UnitType || (ryw_UnitType = {}));

    var ryw_UNITSTATE;
    (function (ryw_UNITSTATE) {
        ryw_UNITSTATE[ryw_UNITSTATE["None"] = 0] = "None";
        ryw_UNITSTATE[ryw_UNITSTATE["ryw_Run"] = 1] = "ryw_Run";
        ryw_UNITSTATE[ryw_UNITSTATE["ryw_Attack"] = 2] = "ryw_Attack";
        ryw_UNITSTATE[ryw_UNITSTATE["ryw_Death"] = 3] = "ryw_Death";
    })(ryw_UNITSTATE || (ryw_UNITSTATE = {}));
    class Unit_JJVW_Base extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this._targetArr = new Array();
            this._naturalEnemyArr = new Array();
            this._isInitEnd = false;
            this._boxHeighy = 0;
            this.ryw__gracityLenght = -0.3;
            this.ryw__currentGravitySpeed = -40;
            this._g = 0;
            this.ryw_standOnTheGround = true;
            this._defaultTimerDelta = 16;
            this.ryw__outHitArr = new Array();
            this.ryw__boxWidth = 0;
            this._subPosX = 0.3;
            this.ryw_state = ryw_UNITSTATE.None;
        }
        ryw_onLastInit() { }
        ;
        ryw_onAssaulted(unit) { }
        ;
        ryw_onBeAssaulted(unit) { }
        ;
        get Type() {
            return this._type;
        }
        get Scene3D() {
            return this._scene3D;
        }
        get Sprite3D() {
            return this._ownerSprite3D;
        }
        get transform() {
            return this._transform;
        }
        ryw_onInit(scene, type) {
            this._type = type;
            this._scene3D = scene;
            this._ownerSprite3D = this.owner;
            this._transform = this._ownerSprite3D.transform;
            this.ryw_onLastInit();
        }
        onStart() {
        }
        onEnable() {
        }
        onDisable() {
        }
        onUpdate() {
        }
        onLateUpdate() {
        }
        ryw_onGravityCheck() {
            if (false == this._isInitEnd) {
                return;
            }
            if (null == this.ryw__lastGravityPos) {
                this.ryw__lastGravityPos = this.transform.localPosition.y - this._boxHeighy;
            }
            var time = this._defaultTimerDelta / 1000;
            let subPosY = (this.ryw__currentGravitySpeed * time + 0.5 * this._g * time * time);
            if (subPosY > -0.3) {
                subPosY = -0.3;
            }
            var fallVec = this.ryw__lastGravityPos + subPosY;
            var begin = new Laya.Vector3(this.transform.localPosition.x, this.ryw__lastGravityPos, this.transform.localPosition.z);
            var end = new Laya.Vector3(this.transform.localPosition.x, fallVec, this.transform.localPosition.z);
            if (this.ryw_onFallDetection(begin, end)) {
                this.ryw__currentGravitySpeed = -40;
                this.ryw_standOnTheGround = true;
            }
            else {
                this.transform.localPositionY = fallVec + this._boxHeighy;
                this.ryw__currentGravitySpeed += this._g * time;
                this.ryw_standOnTheGround = false;
                this.ryw__lastGravityPos = fallVec;
            }
        }
        ryw_onFallDetection(begin, end) {
            this.Scene3D.physicsSimulation.raycastAllFromTo(begin, end, this.ryw__outHitArr);
            if (this.ryw__outHitArr.length == 0) {
                return false;
            }
            var isCrash = false;
            for (let i = 0; i < this.ryw__outHitArr.length; i++) {
                let outHit = this.ryw__outHitArr[i];
                if (outHit.succeeded) {
                    var spr = outHit.collider.owner;
                    if (null == spr || this.Sprite3D == spr) {
                        continue;
                    }
                    var otherUnit = spr.getComponent(Unit_JJVW_Base);
                    if (null == otherUnit) {
                        isCrash = true;
                        continue;
                    }
                    if (ryw_UNITSTATE.ryw_Death == otherUnit.ryw_state) {
                        continue;
                    }
                    if (ryw_UNITSTATE.ryw_Death == this.ryw_state) {
                        continue;
                    }
                    otherUnit.ryw_onBeAssaulted(this.Type);
                    otherUnit.ryw_onAssaulted(this.Type);
                    this.ryw_onBeAssaulted(otherUnit.Type);
                    this.ryw_onAssaulted(otherUnit.Type);
                    isCrash = true;
                    return isCrash;
                }
            }
            return isCrash;
        }
        ryw_onAssaultedArea() {
            if (ryw_UNITSTATE.ryw_Death == this.ryw_state) {
                return;
            }
            if (null == this._lastPos) {
                this._lastPos = new Laya.Vector3(this.transform.localPosition.x, this.transform.localPosition.y, this.transform.localPosition.z);
            }
            var pos = new Laya.Vector3(this.transform.localPosition.x, this.transform.localPosition.y, this.transform.localPosition.z);
            var end = new Laya.Vector3(pos.x, pos.y, pos.z);
            let isAssaulted = this.ryw_onAreaDetection(this._lastPos, pos);
            this._lastPos = end;
            return isAssaulted;
        }
        ryw_onAreaDetection(begin, end) {
            this.Scene3D.physicsSimulation.raycastAllFromTo(begin, end, this.ryw__outHitArr);
            if (this.ryw__outHitArr.length == 0) {
                return;
            }
            for (let i = 0; i < this.ryw__outHitArr.length; i++) {
                let outHit = this.ryw__outHitArr[i];
                if (outHit.succeeded) {
                    var spr = outHit.collider.owner;
                    if (null == spr || this.Sprite3D == spr) {
                        continue;
                    }
                    var otherUnit = spr.getComponent(Unit_JJVW_Base);
                    if (null == otherUnit) {
                        return true;
                    }
                    if (ryw_UNITSTATE.ryw_Death == otherUnit.ryw_state) {
                        continue;
                    }
                    for (let index = 0; index < this._targetArr.length; index++) {
                        let element = this._targetArr[index];
                        if (otherUnit.Type == element) {
                            otherUnit.ryw_onBeAssaulted(this.Type);
                            this.ryw_onAssaulted(otherUnit.Type);
                            break;
                        }
                    }
                    return true;
                }
            }
            return false;
        }
        ryw_destroyUnit() {
            this._ownerSprite3D.removeSelf();
            this._ownerSprite3D.destroy(true);
            this.ryw_standOnTheGround = true;
            this.ryw_state = ryw_UNITSTATE.ryw_Death;
        }
        onDestroy() {
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this.Sprite3D);
            Laya.timer.clearAll(this.Sprite3D);
            Laya.Tween.clearAll(this.transform);
            Laya.timer.clearAll(this.transform);
        }
    }

    class Warrior extends Unit_JJVW_Base {
        constructor() {
            super(...arguments);
            this.ryw__speedX = 40;
            this.ryw_directionX = 1;
            this.ryw__lastStand = true;
            this.ryw__lastState = ryw_UNITSTATE.None;
        }
        onAwake() {
            this._targetArr.push(ryw_UnitType.ryw_Queen);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Bear);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Tiger);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Wolf);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Arrow);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Bomb);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Cannon);
        }
        ryw_onLastInit() {
            this.ryw__collision = this.Sprite3D.getComponent(Laya.PhysicsCollider).colliderShape;
            this._boxHeighy = this.ryw__collision.sizeY / 2;
            console.log("Warrior  this._boxHeighy = " + this._boxHeighy);
            this.ryw__ani = this.Sprite3D.getChildByName("hm_xb").getComponent(Laya.Animator);
            this.ryw__ani.play("daiji");
            this._isInitEnd = true;
        }
        ryw_onWarriorMove(queenPos) {
            this.ryw__queenVec = queenPos;
            var warroirPos = this.transform.localPosition;
            if (warroirPos.x > queenPos.x) {
                this.ryw_directionX = -1;
            }
            else {
                this.ryw_directionX = 1;
            }
            this.ryw_state = ryw_UNITSTATE.ryw_Run;
        }
        ryw_onRun() {
            if (this.ryw_state == ryw_UNITSTATE.ryw_Death) {
                return;
            }
            var time = this._defaultTimerDelta / 1000;
            if (this.ryw__lastStand != this.ryw_standOnTheGround || this.ryw_state != this.ryw__lastState) {
                if (null != this.ryw__queenVec) {
                    this.ryw_onWarriorMove(this.ryw__queenVec);
                }
            }
            if (this.ryw_standOnTheGround) {
                this.transform.localRotationEulerY = 90 * this.ryw_directionX;
                this.transform.localPositionX += this.ryw__speedX * time * this.ryw_directionX;
            }
        }
        ryw_onOpenUpdate() {
            this._isInitEnd = true;
        }
        onLateUpdate() {
            if (false == this._isInitEnd) {
                return;
            }
            this.ryw_onGravityCheck();
            if (this.ryw_onAssaultedArea()) {
                if (ryw_UNITSTATE.ryw_Run == this.ryw_state) {
                    this.ryw_state = ryw_UNITSTATE.None;
                }
            }
            if (ryw_UNITSTATE.ryw_Run == this.ryw_state) {
                this.ryw_onRun();
            }
            if (this.ryw__lastStand == true && this.ryw_standOnTheGround == false) {
                this.transform.localRotationEulerY = 180 - 45 * this.ryw_directionX;
                this.ryw__ani.play("diaoluo02");
            }
            else if (this.ryw__lastStand == false && this.ryw_standOnTheGround == true) {
                if (ryw_UNITSTATE.None == this.ryw_state) {
                    this.transform.localRotationEulerY = 180;
                    this.ryw__ani.play("daiji");
                }
                else if (ryw_UNITSTATE.ryw_Run == this.ryw_state) {
                    this.ryw__ani.play("pao01");
                }
            }
            else if (this.ryw__lastStand == true && this.ryw_standOnTheGround == true) {
                if (ryw_UNITSTATE.None == this.ryw__lastState && ryw_UNITSTATE.ryw_Run == this.ryw_state) {
                    this.ryw__ani.play("pao01");
                }
                else if (ryw_UNITSTATE.ryw_Run == this.ryw__lastState && ryw_UNITSTATE.None == this.ryw_state) {
                    this.ryw__ani.play("daiji");
                }
            }
            if (this.transform.localPositionY < -100) {
                ryw_SoundMgr.ryw_instance.ryw_playSound("queenWin");
                ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOverAction, { result: 0 });
                var fun = function () {
                    ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOver, { result: 1 });
                };
                Laya.timer.frameLoop(30, this, fun);
            }
            this.ryw__lastStand = this.ryw_standOnTheGround;
            this.ryw__lastState = this.ryw_state;
        }
        ryw_onAssaulted(unit) {
            for (let i = 0; i < this._targetArr.length; i++) {
                let type = this._targetArr[i];
                if (type == unit) {
                    console.log(this.Type + " 攻击 " + unit);
                    this.ryw_state = ryw_UNITSTATE.ryw_Attack;
                    this.ryw__ani.play("qingzhu04");
                    let firstFrame = true;
                    let eY = 0;
                    if (this.Sprite3D.transform.localRotationEulerY < 0) {
                        eY = -90;
                    }
                    else {
                        eY = 90;
                    }
                    Laya.Tween.to(this.Sprite3D.transform, { localRotationEulerY: this.Sprite3D.transform.localRotationEulerY + eY }, 500);
                    var fun = function () {
                        if (this.ryw__ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false == firstFrame) {
                            Laya.timer.clear(this, fun);
                            this.ryw_onWin();
                            return;
                        }
                        firstFrame = false;
                    };
                    Laya.timer.frameLoop(1, this, fun);
                    break;
                }
            }
        }
        ryw_onBeAssaulted(unit) {
            for (let i = 0; i < this._naturalEnemyArr.length; i++) {
                let type = this._naturalEnemyArr[i];
                if (type == unit) {
                    console.log(this.Type + " 被攻击 " + unit);
                    this.ryw_state = ryw_UNITSTATE.ryw_Death;
                    this.ryw__ani.play("shibai03");
                    ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOverAction, { result: 2 });
                    ryw_SoundMgr.ryw_instance.ryw_playSound("warriorWin");
                    let firstFrame = true;
                    var fun = function () {
                        if (this.ryw__ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false == firstFrame) {
                            Laya.timer.clear(this, fun);
                            this.ryw__ani.play("ku03");
                            this.ryw_onDeath();
                            return;
                        }
                        firstFrame = false;
                    };
                    Laya.timer.frameLoop(1, this, fun);
                    break;
                }
            }
        }
        ryw_onWin() {
            ryw_SoundMgr.ryw_instance.ryw_playSound("win");
        }
        ryw_onDeath() {
            ryw_SoundMgr.ryw_instance.ryw_playSound("lost");
            console.log("Warrior onDeath");
            Laya.timer.once(1200, this, () => {
                ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOver, { result: 0 });
                this.ryw_state = ryw_UNITSTATE.None;
                this.ryw_destroyUnit();
            });
        }
    }

    class Queen extends Unit_JJVW_Base {
        constructor() {
            super(...arguments);
            this.ryw__lastStand = true;
        }
        onAwake() {
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Bear);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Tiger);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Wolf);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Arrow);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Bomb);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Cannon);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Warrior);
            this.ryw__gracityLenght = -0.5;
        }
        ryw_onLastInit() {
            this.ryw__collision = this.Sprite3D.getComponent(Laya.PhysicsCollider).colliderShape;
            this._boxHeighy = this.ryw__collision.sizeY / 2;
            this.ryw__ani = this.Sprite3D.getChildByName("Queen").getComponent(Laya.Animator);
            this.ryw__ani.enabled = false;
            this._isInitEnd = true;
        }
        ryw_onOpenUpdate() {
            this._isInitEnd = true;
        }
        onLateUpdate() {
            if (false == this._isInitEnd) {
                return;
            }
            this.ryw_onGravityCheck();
            if (this.ryw__lastStand == false && this.ryw_standOnTheGround == true) {
                ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onQueenStand);
            }
            this.ryw__lastStand = this.ryw_standOnTheGround;
        }
        ryw_onAssaulted(unit) {
            for (let i = 0; i < this._targetArr.length; i++) {
                let type = this._targetArr[i];
                if (type == unit) {
                    console.log(this.Type + " 攻击 " + unit);
                    this.ryw_state = ryw_UNITSTATE.None;
                    break;
                }
            }
        }
        ryw_onBeAssaulted(unit) {
            if (ryw_UNITSTATE.ryw_Death == this.ryw_state) {
                return;
            }
            for (let i = 0; i < this._naturalEnemyArr.length; i++) {
                let type = this._naturalEnemyArr[i];
                if (type == unit) {
                    console.log(this.Type + " 被攻击 " + unit);
                    if (ryw_UnitType.ryw_Warrior == unit) {
                        this.ryw__ani.enabled = true;
                        this.ryw__ani.play("open");
                        ryw_SoundMgr.ryw_instance.ryw_playSound("queenWin");
                        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOverAction, { result: 0 });
                        let firstFrame = true;
                        var fun = function () {
                            if (this.ryw__ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false == firstFrame) {
                                this.ryw__ani.enabled = false;
                                Laya.timer.clear(this, fun);
                                Laya.timer.once(2000, this, () => {
                                    this.ryw_onWin();
                                });
                                return;
                            }
                            firstFrame = false;
                        };
                        Laya.timer.frameLoop(1, this, fun);
                        console.log("UnitType.Queen   胜利");
                    }
                    else {
                        this.ryw_state = ryw_UNITSTATE.ryw_Death;
                        this.ryw__ani.enabled = true;
                        this.ryw__ani.play("broken");
                        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOverAction, { result: 1 });
                        let firstFrame = true;
                        var fun = function () {
                            if (this.ryw__ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false == firstFrame) {
                                this.ryw__ani.enabled = false;
                                Laya.timer.clear(this, fun);
                                this.ryw_onDeath();
                                return;
                            }
                            firstFrame = false;
                        };
                        Laya.timer.frameLoop(1, this, fun);
                    }
                    break;
                }
            }
        }
        ryw_onWin() {
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOver, { result: 1 });
        }
        ryw_onDeath() {
            ryw_SoundMgr.ryw_instance.ryw_playSound("lost");
            console.log("Queen onDeath");
            Laya.timer.once(1200, this, () => {
                ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onOver, { result: 0 });
                this.ryw_state = ryw_UNITSTATE.None;
                this.ryw_destroyUnit();
            });
        }
    }

    class Arrow extends Unit_JJVW_Base {
        constructor() {
            super(...arguments);
            this._speedX = -350;
        }
        onAwake() {
            this._targetArr.push(ryw_UnitType.ryw_Warrior);
            this._targetArr.push(ryw_UnitType.ryw_Queen);
            this._targetArr.push(ryw_UnitType.ryw_Bear);
            this._targetArr.push(ryw_UnitType.ryw_Tiger);
            this._targetArr.push(ryw_UnitType.ryw_Wolf);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Bomb);
        }
        ryw_onLastInit() {
            this._collision = this.Sprite3D.getComponent(Laya.PhysicsCollider).colliderShape;
            this._boxHeighy = this._collision.sizeY / 2;
            this._isInitEnd = true;
        }
        ryw_onOpenUpdate() {
            this._isInitEnd = true;
            this.Sprite3D.active;
        }
        onLateUpdate() {
            if (false == this._isInitEnd) {
                return;
            }
            this.ryw_onAssaultedArea();
            let v = new Laya.Vector3();
            this.transform.getRight(v);
            v.x *= this._speedX * 10;
            v.y *= this._speedX * 10;
            v.z *= this._speedX * 10;
            var begin = this.transform.localPosition;
            let end = new Laya.Vector3();
            end.x = v.x + begin.x;
            end.y = v.y + begin.y;
            end.z = v.z + begin.z;
            var time = this._defaultTimerDelta / 1000;
            if (ryw_UNITSTATE.ryw_Run == this.ryw_state) {
                this.ryw_runAssaulted(time);
            }
            else if (ryw_UNITSTATE.None == this.ryw_state) {
                if (this.ryw_onRayCastSprite(begin, end)) {
                    this.ryw_runAssaulted(time);
                }
            }
        }
        ryw_onRayCastSprite(begin, end) {
            var outHit = new Laya.HitResult();
            this.Scene3D.physicsSimulation.raycastFromTo(begin, end, outHit);
            if (outHit.succeeded) {
                let spr = outHit.collider.owner;
                if (null == spr || spr == this.Sprite3D) {
                    return false;
                }
                let name = spr.name;
                let otherUnit = spr.getComponent(Unit_JJVW_Base);
                if (null == otherUnit) {
                    return false;
                }
                if (ryw_UNITSTATE.ryw_Death == otherUnit.ryw_state) {
                    return false;
                }
                for (let index = 0; index < this._targetArr.length; index++) {
                    let element = this._targetArr[index];
                    if (otherUnit.Type == element) {
                        console.log(this.Sprite3D.name + " 检测到 " + name);
                        return true;
                    }
                }
            }
            return false;
        }
        ryw_runAssaulted(time) {
            if (ryw_UNITSTATE.None == this.ryw_state) {
                this.ryw_state = ryw_UNITSTATE.ryw_Run;
                Laya.timer.once(1000 * 3, this, this.ryw_destroyUnit);
                ryw_SoundMgr.ryw_instance.ryw_playSound("arrow");
            }
            let v = new Laya.Vector3();
            this.transform.getRight(v);
            v.x *= this._speedX * time;
            v.y *= this._speedX * time;
            v.z *= this._speedX * time;
            this.transform.localPositionX += v.x;
            this.transform.localPositionY += v.y;
            this.transform.localPositionZ += v.z;
        }
        ryw_onAssaulted(unit) {
            if (ryw_UNITSTATE.ryw_Death == this.ryw_state) {
                return;
            }
            for (let i = 0; i < this._targetArr.length; i++) {
                let type = this._targetArr[i];
                if (type == unit) {
                    console.log(this.Type + " 攻击 " + unit);
                    this.ryw_destroyUnit();
                    break;
                }
            }
        }
        ryw_onBeAssaulted(unit) {
            if (ryw_UNITSTATE.ryw_Death == this.ryw_state) {
                return;
            }
            for (let i = 0; i < this._naturalEnemyArr.length; i++) {
                let type = this._naturalEnemyArr[i];
                if (type == unit) {
                    console.log(this.Type + " 被攻击 " + unit);
                    this.ryw_destroyUnit();
                    break;
                }
            }
        }
        onMouseDown() {
        }
    }

    class Bomb extends Unit_JJVW_Base {
        onAwake() {
            this._targetArr.push(ryw_UnitType.ryw_Warrior);
            this._targetArr.push(ryw_UnitType.ryw_Queen);
            this._targetArr.push(ryw_UnitType.ryw_Bear);
            this._targetArr.push(ryw_UnitType.ryw_Tiger);
            this._targetArr.push(ryw_UnitType.ryw_Wolf);
            this._targetArr.push(ryw_UnitType.ryw_Cannon);
            this._targetArr.push(ryw_UnitType.ryw_Arrow);
        }
        ryw_onLastInit() {
            this._special = this.Sprite3D.getChildByName("GameObject").getChildByName("FX_BOOM").getChildByName("boom");
            this._special.active = false;
            var collider = this.Sprite3D.getComponent(Laya.PhysicsCollider);
            collider.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
            this._collision = collider.colliderShape;
            this._boxHeighy = this._collision.radius;
            this._isInitEnd = true;
        }
        ryw_onOpenUpdate() {
            this._isInitEnd = true;
        }
        onLateUpdate() {
            if (false == this._isInitEnd) {
                return;
            }
            this.ryw_onGravityCheck();
            this.ryw_onAssaultedArea();
        }
        ryw_onGravityCheck() {
            if (false == this._isInitEnd) {
                return;
            }
            if (null == this.ryw__lastGravityPos) {
                this.ryw__lastGravityPos = this.transform.localPosition.y - this._boxHeighy;
            }
            var time = this._defaultTimerDelta / 1000;
            let subPosY = (this.ryw__currentGravitySpeed * time + 0.5 * this._g * time * time);
            if (subPosY > -0.3) {
                subPosY = -0.3;
            }
            var fallVec = this.ryw__lastGravityPos + subPosY;
            var begin = new Laya.Vector3(this.transform.localPosition.x, this.ryw__lastGravityPos, this.transform.localPosition.z);
            var end = new Laya.Vector3(this.transform.localPosition.x, fallVec, this.transform.localPosition.z);
            if (this.ryw_onFallDetection(begin, end)) {
                this.ryw__currentGravitySpeed = -40;
                this.ryw_standOnTheGround = true;
            }
            else {
                this.transform.localPositionY = fallVec + this._boxHeighy;
                this.ryw__currentGravitySpeed += this._g * time;
                this.ryw_standOnTheGround = false;
                this.ryw__lastGravityPos = fallVec;
            }
        }
        ryw_onFallDetection(begin, end) {
            this.Scene3D.physicsSimulation.shapeCastAll(this._collision, begin, end, this.ryw__outHitArr);
            if (this.ryw__outHitArr.length == 0) {
                return;
            }
            let isCrash = false;
            for (let i = 0; i < this.ryw__outHitArr.length; i++) {
                let outHit = this.ryw__outHitArr[i];
                if (outHit.succeeded) {
                    var spr = outHit.collider.owner;
                    if (null == spr || this.Sprite3D == spr) {
                        continue;
                    }
                    let otherUnit = spr.getComponent(Unit_JJVW_Base);
                    if (null == otherUnit) {
                        isCrash = true;
                        continue;
                    }
                    if (ryw_UNITSTATE.ryw_Death == this.ryw_state) {
                        continue;
                    }
                    for (let index = 0; index < this._targetArr.length; index++) {
                        let element = this._targetArr[index];
                        if (otherUnit.ryw_state == ryw_UNITSTATE.ryw_Death) {
                            break;
                        }
                        if (otherUnit.Type == element) {
                            console.log("发生爆炸");
                            otherUnit.ryw_onBeAssaulted(this.Type);
                            this.ryw_onAssaulted(otherUnit.Type);
                            break;
                        }
                    }
                    isCrash = true;
                    return isCrash;
                }
            }
            return isCrash;
        }
        ryw_onAssaultedArea() {
            if (ryw_UNITSTATE.ryw_Death == this.ryw_state) {
                return;
            }
            var pos = new Laya.Vector3(this.transform.localPosition.x - this._boxHeighy * 1, this.transform.localPosition.y, this.transform.localPosition.z);
            var end = new Laya.Vector3(this.transform.localPosition.x + this._boxHeighy * 1, this.transform.localPosition.y, this.transform.localPosition.z);
            let isAssaulted = this.ryw_onAreaDetection(pos, end);
            return isAssaulted;
        }
        ryw_onAreaDetection(begin, end) {
            if (ryw_UNITSTATE.ryw_Death == this.ryw_state) {
                return;
            }
            this.Scene3D.physicsSimulation.raycastAllFromTo(begin, end, this.ryw__outHitArr);
            if (this.ryw__outHitArr.length == 0) {
                return;
            }
            for (let i = 0; i < this.ryw__outHitArr.length; i++) {
                let outHit = this.ryw__outHitArr[i];
                if (outHit.succeeded) {
                    var spr = outHit.collider.owner;
                    if (null == spr || this.Sprite3D == spr) {
                        continue;
                    }
                    var otherUnit = spr.getComponent(Unit_JJVW_Base);
                    if (null == otherUnit) {
                        continue;
                    }
                    if (ryw_UNITSTATE.ryw_Death == otherUnit.ryw_state) {
                        continue;
                    }
                    for (let index = 0; index < this._targetArr.length; index++) {
                        let element = this._targetArr[index];
                        if (otherUnit.Type == element) {
                            otherUnit.ryw_onBeAssaulted(this.Type);
                            this.ryw_onAssaulted(otherUnit.Type);
                            break;
                        }
                    }
                    return true;
                }
            }
            return false;
        }
        ryw_onAssaulted(unit) {
            if (ryw_UNITSTATE.ryw_Death == this.ryw_state) {
                return;
            }
            for (let i = 0; i < this._targetArr.length; i++) {
                let type = this._targetArr[i];
                if (type == unit) {
                    console.log(this.Type + " 攻击 " + unit);
                    this.ryw_state = ryw_UNITSTATE.ryw_Death;
                    this.onBombExplosion();
                    break;
                }
            }
        }
        ryw_onBeAssaulted(unit) {
            if (ryw_UNITSTATE.ryw_Death == this.ryw_state) {
                return;
            }
            for (let i = 0; i < this._naturalEnemyArr.length; i++) {
                let type = this._naturalEnemyArr[i];
                if (type == unit) {
                    console.log(this.Type + " 被攻击 " + unit);
                    this.ryw_state = ryw_UNITSTATE.ryw_Death;
                    this.onBombExplosion();
                    break;
                }
            }
        }
        onBombExplosion() {
            this.ryw_state = ryw_UNITSTATE.ryw_Death;
            ryw_SoundMgr.ryw_instance.ryw_playSound("bomb");
            this._special.active = true;
            this.transform.localScale = new Laya.Vector3();
            Laya.timer.once(1000, this, () => {
                this._special.active = false;
                this.ryw_destroyUnit();
            });
        }
    }

    class Cannonball extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this._targetArr = new Array();
            this._outHitArr = new Array();
            this._boxWidth = 0;
            this._directionX = 1;
            this._speedBallX = 300;
            this._isStop = false;
            this._defaultTimerDelta = 16;
        }
        onAwake() {
            this._targetArr.push(ryw_UnitType.ryw_Warrior);
            this._targetArr.push(ryw_UnitType.ryw_Queen);
            this._targetArr.push(ryw_UnitType.ryw_Bear);
            this._targetArr.push(ryw_UnitType.ryw_Tiger);
            this._targetArr.push(ryw_UnitType.ryw_Wolf);
            this._transform = this.owner.transform;
            this._special = this.owner.getChildByName("Bomb").getChildByName("FX_BOOM").getChildByName("boom");
            this._special.active = false;
            this._collision = this.owner.getComponent(Laya.PhysicsCollider).colliderShape;
            this._boxWidth = this._collision.radius;
        }
        onLateUpdate() {
            if (false == this.owner.active) {
                return;
            }
            if (this._isStop) {
                return;
            }
            if (null == this._lastPos) {
                this._lastPos = this._transform.localPosition;
            }
            var pos = new Laya.Vector3();
            pos.x = this._transform.localPosition.x + this._boxWidth;
            pos.y = this._transform.localPosition.y;
            pos.z = this._transform.localPosition.z;
            if (!this.ryw_onAssaultedDetection(this._lastPos, pos)) {
                this.ryw_runAssaulted();
            }
            this._lastPos = pos;
        }
        ryw_onSetCannon(cannon, orientation) {
            this._cannon = cannon;
            this._scene3D = cannon.Scene3D;
            this._type = cannon.Type;
            this._barrel = cannon.ryw_getBarrel();
            this._orientation = orientation;
            this.owner.active = true;
            Laya.timer.once(1000 * 1, this, this.ryw_destroyUnit);
        }
        ryw_onAssaultedDetection(begin, end) {
            this._scene3D.physicsSimulation.shapeCastAll(this._collision, begin, end, this._outHitArr);
            if (this._outHitArr.length == 0) {
                return;
            }
            for (let i = 0; i < this._outHitArr.length; i++) {
                let outHit = this._outHitArr[i];
                if (outHit.succeeded) {
                    var spr = outHit.collider.owner;
                    if (null == spr || this.owner == spr) {
                        ;
                        continue;
                    }
                    let otherUnit = spr.getComponent(Unit_JJVW_Base);
                    if (null == otherUnit || otherUnit.ryw_state == ryw_UNITSTATE.ryw_Death || ryw_UnitType.ryw_Cannon == otherUnit.Type) {
                        continue;
                    }
                    let isCollisionUnit = false;
                    for (let index = 0; index < this._targetArr.length; index++) {
                        let element = this._targetArr[index];
                        if (otherUnit.Type == element) {
                            otherUnit.ryw_onBeAssaulted(this._type);
                            this.ryw_onAssaulted(otherUnit.Type);
                            isCollisionUnit = true;
                            break;
                        }
                    }
                    if (!isCollisionUnit) {
                        console.log(outHit.collider.owner.name);
                        this.ryw_onAssaulted(ryw_UnitType.None);
                    }
                    return true;
                }
            }
            return false;
        }
        ryw_runAssaulted() {
            let v = new Laya.Vector3();
            var time = this._defaultTimerDelta / 1000;
            v.x = this._speedBallX * time * this._orientation.x;
            v.y = this._speedBallX * time * this._orientation.y;
            v.z = this._speedBallX * time * this._orientation.z;
            this._transform.localPositionX += v.x;
            this._transform.localPositionY += v.y;
            this._transform.localPositionZ += v.z;
        }
        ryw_onAssaulted(unit) {
            console.log(this._type + " 攻击 " + unit);
            this._cannon.ryw_state = ryw_UNITSTATE.None;
            this._isStop = true;
            this.ryw_onBombExplosion();
        }
        ryw_onBeAssaulted(unit) {
            console.log(unit + " 被攻击 " + this._type);
            this._cannon.ryw_state = ryw_UNITSTATE.None;
            this._isStop = true;
            this.ryw_onBombExplosion();
        }
        ryw_onBombExplosion() {
            ryw_SoundMgr.ryw_instance.ryw_playSound("bomb");
            this._special.active = true;
            this.owner.transform.localScale = new Laya.Vector3();
            Laya.timer.once(1000, this, () => {
                this._special.active = false;
                this.ryw_destroyUnit();
            });
        }
        ryw_destroyUnit() {
            this.owner.removeSelf();
            this.owner.destroy(true);
        }
        onDestroy() {
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this.owner);
            Laya.timer.clearAll(this.owner);
            Laya.Tween.clearAll(this._transform);
            Laya.timer.clearAll(this._transform);
        }
    }

    class Cannon extends Unit_JJVW_Base {
        constructor() {
            super(...arguments);
            this.directionX = 1;
            this._speedX = 20;
        }
        onAwake() {
            this._targetArr.push(ryw_UnitType.ryw_Warrior);
            this._targetArr.push(ryw_UnitType.ryw_Queen);
            this._targetArr.push(ryw_UnitType.ryw_Bear);
            this._targetArr.push(ryw_UnitType.ryw_Tiger);
            this._targetArr.push(ryw_UnitType.ryw_Wolf);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Bomb);
        }
        ryw_onLastInit() {
            this._barrel = this.Sprite3D.getChildByName("Barrel");
            this._ballSprite3D = this.Scene3D.getChildByName("Cannonball1");
            this._collision = this.Sprite3D.getComponent(Laya.PhysicsCollider).colliderShape;
            this._boxHeighy = this._collision.sizeY / 2 - this._collision.localOffset.y;
            this._ani = this.Sprite3D.getChildByName("Cannon").getChildByName("Cannon").getComponent(Laya.Animator);
            console.log("Cannon  ryw_onLastInit ");
            this._ani.enabled = false;
            this._isInitEnd = true;
        }
        ryw_onOpenUpdate() {
            this._isInitEnd = true;
        }
        ryw_getBarrel() {
            return this._barrel;
        }
        onLateUpdate() {
            if (false == this._isInitEnd) {
                return;
            }
            this.ryw_onGravityCheck();
            let v = new Laya.Vector3();
            this.transform.getRight(v);
            var begin = this.transform.localPosition;
            let end = new Laya.Vector3();
            end.x = v.x * this._speedX * 5 + begin.x;
            end.y = v.y * this._speedX * 5 + begin.y;
            end.z = v.z * this._speedX * 5 + begin.z;
            var time = this._defaultTimerDelta / 1000;
            if (ryw_UNITSTATE.None == this.ryw_state) {
                if (this.ryw_onRayCastSprite(begin, end)) {
                    this.ryw_runAssaulted(time, v);
                }
            }
        }
        ryw_onRayCastSprite(begin, end) {
            var outHit = new Laya.HitResult();
            this.Scene3D.physicsSimulation.raycastFromTo(begin, end, outHit);
            if (outHit.succeeded) {
                let spr = outHit.collider.owner;
                if (null == spr || spr == this.Sprite3D) {
                    return false;
                }
                let name = spr.name;
                let otherUnit = spr.getComponent(Unit_JJVW_Base);
                if (null == otherUnit) {
                    return false;
                }
                if (ryw_UNITSTATE.ryw_Death == otherUnit.ryw_state) {
                    return false;
                }
                for (let index = 0; index < this._targetArr.length; index++) {
                    let element = this._targetArr[index];
                    if (otherUnit.Type == element) {
                        if (otherUnit.Sprite3D.transform.localPositionX < this.Sprite3D.transform.localPositionX) {
                            this.directionX = -1;
                        }
                        return true;
                    }
                }
            }
            return false;
        }
        ryw_runAssaulted(time, orientation) {
            if (ryw_UNITSTATE.None == this.ryw_state) {
                this._ani.enabled = true;
                console.log("Cannon  ryw_runAssaulted  play gongji");
                this.ryw_state = ryw_UNITSTATE.ryw_Run;
                let firstFrame = true;
                var fun = function () {
                    if (this._ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false == firstFrame) {
                        Laya.timer.clear(this, fun);
                        this._ani.enabled = false;
                        return;
                    }
                    firstFrame = false;
                };
                Laya.timer.frameLoop(1, this, fun);
                Laya.timer.once(0, this, () => {
                    ryw_SoundMgr.ryw_instance.ryw_playSound("cannon");
                    var newball = Laya.Sprite3D.instantiate(this._ballSprite3D);
                    var ball = newball.addComponent(Cannonball);
                    this.Scene3D.addChild(newball);
                    newball.transform.localPosition = this.Sprite3D.transform.localPosition;
                    ball.ryw_onSetCannon(this, orientation);
                });
            }
        }
        ryw_onAssaulted(unit) {
            if (ryw_UNITSTATE.ryw_Death == this.ryw_state) {
                return;
            }
            for (let i = 0; i < this._targetArr.length; i++) {
                let type = this._targetArr[i];
                if (type == unit) {
                    console.log(this.Type + " 攻击 " + unit);
                    break;
                }
            }
        }
        ryw_onBeAssaulted(unit) {
            for (let i = 0; i < this._naturalEnemyArr.length; i++) {
                let type = this._naturalEnemyArr[i];
                if (type == unit) {
                    console.log(this.Type + " 被攻击 " + unit);
                    this.ryw_state = ryw_UNITSTATE.None;
                    this.ryw_destroyUnit();
                    break;
                }
            }
        }
    }

    class Bear extends Unit_JJVW_Base {
        constructor() {
            super(...arguments);
            this._speedX = 50;
            this._directionX = 1;
        }
        onAwake() {
            this._targetArr.push(ryw_UnitType.ryw_Warrior);
            this._targetArr.push(ryw_UnitType.ryw_Queen);
            this._targetArr.push(ryw_UnitType.ryw_Wolf);
            this._targetArr.push(ryw_UnitType.ryw_Tiger);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Arrow);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Bomb);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Cannon);
        }
        ryw_onLastInit() {
            this._collision = this.Sprite3D.getComponent(Laya.PhysicsCollider).colliderShape;
            this._boxHeighy = this._collision.sizeY / 2 - this._collision.localOffset.y;
            this._ani = this.Sprite3D.getChildByName("Bear").getComponent(Laya.Animator);
            this._ani.play("lod");
            this._isInitEnd = true;
        }
        ryw_onOpenUpdate() {
            this._isInitEnd = true;
        }
        onLateUpdate() {
            if (false == this._isInitEnd) {
                return;
            }
            this.ryw_onGravityCheck();
            if (this.ryw_onAssaultedArea()) {
                ryw_UNITSTATE.None == this.ryw_state;
            }
            if (this.ryw_standOnTheGround) {
                this.ryw_onEnemyCheck();
            }
            else {
                if (ryw_UNITSTATE.ryw_Run == this.ryw_state) {
                    var time = this._defaultTimerDelta / 1000;
                    this.ryw_runAssaulted(time);
                }
            }
        }
        ryw_runAssaulted(time) {
            if (this.ryw_state == ryw_UNITSTATE.ryw_Death) {
                return;
            }
            if (ryw_UNITSTATE.None == this.ryw_state) {
                this.ryw_state = ryw_UNITSTATE.ryw_Run;
                this._ani.play("pao");
                this.transform.localRotationEulerY = (this._directionX == 1) ? 180 : 0;
            }
            this._speedX = (this.ryw_standOnTheGround) ? 50 : 10;
            this.transform.localPositionX += this._speedX * this._directionX * time;
        }
        ryw_onEnemyCheck() {
            if (this.ryw_state == ryw_UNITSTATE.ryw_Death) {
                return;
            }
            var begin = this.transform.localPosition;
            var end = new Laya.Vector3();
            end.y = begin.y;
            end.z = begin.z;
            var time = this._defaultTimerDelta / 1000;
            if (ryw_UNITSTATE.ryw_Run == this.ryw_state) {
                this.ryw_runAssaulted(time);
            }
            else if (ryw_UNITSTATE.None == this.ryw_state) {
                this._directionX = 1;
                end.x = begin.x + 100 * this._directionX;
                if (this.ryw_onRayCastSprite(begin, end)) {
                    this.ryw_runAssaulted(time);
                }
                else {
                    this._directionX = -1;
                    end.x = begin.x + 100 * this._directionX;
                    if (this.ryw_onRayCastSprite(begin, end)) {
                        this.ryw_runAssaulted(time);
                    }
                    else {
                    }
                }
            }
        }
        ryw_onAssaulted(unit) {
            if (ryw_UNITSTATE.ryw_Death == this.ryw_state) {
                return;
            }
            for (let i = 0; i < this._targetArr.length; i++) {
                let type = this._targetArr[i];
                if (type == unit) {
                    console.log(this.Type + " 攻击 " + unit);
                    this.ryw_state = ryw_UNITSTATE.ryw_Attack;
                    this._ani.play("gongji");
                    ryw_SoundMgr.ryw_instance.ryw_playSound("bear");
                    let firstFrame = true;
                    var fun = function () {
                        if (this._ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false == firstFrame) {
                            if (ryw_UNITSTATE.ryw_Death != this.ryw_state) {
                                this._ani.play("lod");
                                this.ryw_state = ryw_UNITSTATE.None;
                            }
                            Laya.timer.clear(this, fun);
                            return;
                        }
                        firstFrame = false;
                    };
                    Laya.timer.frameLoop(1, this, fun);
                    break;
                }
            }
        }
        ryw_onBeAssaulted(unit) {
            if (this.ryw_state == ryw_UNITSTATE.ryw_Death) {
                return;
            }
            console.log("onBeAssaulted  unit = " + unit);
            for (let i = 0; i < this._naturalEnemyArr.length; i++) {
                let type = this._naturalEnemyArr[i];
                if (type == unit) {
                    console.log(this.Type + " 被攻击 " + unit);
                    this.ryw_state = ryw_UNITSTATE.ryw_Death;
                    this._ani.play("die");
                    ryw_SoundMgr.ryw_instance.ryw_playSound("animalDeath");
                    let firstFrame = true;
                    var fun = function () {
                        if (this._ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false == firstFrame) {
                            this._ani.speed = 0;
                            Laya.timer.clear(this, fun);
                            this.ryw_onDeath();
                            return;
                        }
                        firstFrame = false;
                    };
                    Laya.timer.frameLoop(1, this, fun);
                    break;
                }
            }
        }
        ryw_onDeath() {
            let index = 0;
            var fun = function () {
                if (index >= 5) {
                    Laya.timer.clear(this, fun);
                    console.log("Bear onDeath index>=5");
                    this.ryw_destroyUnit();
                }
                if (index % 2 == 0) {
                    this.transform.localScale = new Laya.Vector3();
                }
                else {
                    this.transform.localScale = new Laya.Vector3(1, 1, 1);
                }
                index++;
            };
            Laya.timer.loop(150, this, fun);
        }
        ryw_onRayCastSprite(begin, end) {
            var outHit = new Laya.HitResult();
            this.Scene3D.physicsSimulation.raycastFromTo(begin, end, outHit, Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER, Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER ^ Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1);
            if (outHit.succeeded) {
                let spr = outHit.collider.owner;
                if (null == spr || spr == this.Sprite3D) {
                    return false;
                }
                let name = spr.name;
                let otherUnit = spr.getComponent(Unit_JJVW_Base);
                if (null == otherUnit) {
                    return false;
                }
                if (ryw_UNITSTATE.ryw_Death == otherUnit.ryw_state) {
                    return false;
                }
                for (let index = 0; index < this._targetArr.length; index++) {
                    let element = this._targetArr[index];
                    if (otherUnit.Type == element) {
                        return true;
                    }
                }
            }
            return false;
        }
    }

    class Tiger extends Unit_JJVW_Base {
        constructor() {
            super(...arguments);
            this._speedX = 40;
            this._directionX = 1;
            this._lastStand = true;
        }
        onAwake() {
            this._targetArr.push(ryw_UnitType.ryw_Warrior);
            this._targetArr.push(ryw_UnitType.ryw_Queen);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Bear);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Arrow);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Bomb);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Cannon);
        }
        ryw_onLastInit() {
            this._collision = this.Sprite3D.getComponent(Laya.PhysicsCollider).colliderShape;
            this._boxHeighy = this._collision.sizeY / 2 - this._collision.localOffset.y;
            console.log(" this._collision.localOffset.y = " + this._collision.localOffset.y);
            this._ani = this.Sprite3D.getChildByName("Tiger").getComponent(Laya.Animator);
            this._ani.speed = 0.5;
            this._ani.play("load");
            this._isInitEnd = true;
        }
        ryw_onOpenUpdate() {
            this._isInitEnd = true;
        }
        onLateUpdate() {
            if (false == this._isInitEnd) {
                return;
            }
            this.ryw_onGravityCheck();
            if (this.ryw_onAssaultedArea()) {
            }
            if (this.ryw_standOnTheGround) {
                this.ryw_onEnemyCheck();
            }
            else {
                if (ryw_UNITSTATE.ryw_Run == this.ryw_state) {
                    var time = this._defaultTimerDelta / 1000;
                    this.ryw_runAssaulted(time);
                }
            }
            this._lastStand = this.ryw_standOnTheGround;
        }
        ryw_onEnemyCheck() {
            if (this.ryw_state == ryw_UNITSTATE.ryw_Death) {
                return;
            }
            var begin = this.transform.localPosition;
            var end = new Laya.Vector3();
            end.y = begin.y;
            end.z = begin.z;
            var time = this._defaultTimerDelta / 1000;
            if (this.ryw_standOnTheGround) {
                this._directionX = 1;
                end.x = begin.x + 100 * this._directionX;
                if (this.ryw_onRayCastSprite(begin, end)) {
                    this.ryw_runAssaulted(time);
                }
                else {
                    this._directionX = -1;
                    end.x = begin.x + 100 * this._directionX;
                    if (this.ryw_onRayCastSprite(begin, end)) {
                        this.ryw_runAssaulted(time);
                    }
                    else {
                        if (ryw_UNITSTATE.ryw_Run == this.ryw_state) {
                            this.ryw_state = ryw_UNITSTATE.None;
                            this._ani.play("load");
                        }
                    }
                }
            }
            else if (ryw_UNITSTATE.ryw_Run == this.ryw_state) {
                this.ryw_runAssaulted(time);
            }
        }
        ryw_runAssaulted(time) {
            if (this.ryw_state == ryw_UNITSTATE.ryw_Death) {
                return;
            }
            if (ryw_UNITSTATE.None == this.ryw_state) {
                this.ryw_state = ryw_UNITSTATE.ryw_Run;
                this._ani.play("walk");
                this.transform.localRotationEulerY = (this._directionX == 1) ? 180 : 0;
            }
            this._speedX = (this.ryw_standOnTheGround) ? 40 : 10;
            this.transform.localPositionX += this._speedX * this._directionX * time;
        }
        ryw_onRayCastSprite(begin, end) {
            var outHit = new Laya.HitResult();
            this.Scene3D.physicsSimulation.raycastFromTo(begin, end, outHit, Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER, Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER ^ Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1);
            if (outHit.succeeded) {
                let spr = outHit.collider.owner;
                if (null == spr || spr == this.Sprite3D) {
                    return false;
                }
                let name = spr.name;
                let otherUnit = spr.getComponent(Unit_JJVW_Base);
                if (null == otherUnit) {
                    return false;
                }
                if (ryw_UNITSTATE.ryw_Death == otherUnit.ryw_state) {
                    return false;
                }
                for (let index = 0; index < this._targetArr.length; index++) {
                    let element = this._targetArr[index];
                    if (otherUnit.Type == element) {
                        return true;
                    }
                }
            }
            return false;
        }
        ryw_onAssaulted(unit) {
            if (ryw_UNITSTATE.ryw_Death == this.ryw_state) {
                return;
            }
            for (let i = 0; i < this._targetArr.length; i++) {
                let type = this._targetArr[i];
                if (type == unit) {
                    console.log(this.Type + " 攻击 " + unit);
                    this.ryw_state = ryw_UNITSTATE.ryw_Attack;
                    this._ani.play("gongji");
                    ryw_SoundMgr.ryw_instance.ryw_playSound("tiger");
                    let firstFrame = true;
                    var fun = function () {
                        if (this._ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false == firstFrame) {
                            if (ryw_UNITSTATE.ryw_Death != this.ryw_state) {
                                this._ani.play("load");
                                this.ryw_state = ryw_UNITSTATE.None;
                            }
                            Laya.timer.clear(this, fun);
                            return;
                        }
                        firstFrame = false;
                    };
                    Laya.timer.frameLoop(1, this, fun);
                    break;
                }
            }
        }
        ryw_onBeAssaulted(unit) {
            if (this.ryw_state == ryw_UNITSTATE.ryw_Death) {
                return;
            }
            for (let i = 0; i < this._naturalEnemyArr.length; i++) {
                let type = this._naturalEnemyArr[i];
                if (type == unit) {
                    console.log(this.Type + " 被攻击 " + unit);
                    this.ryw_state = ryw_UNITSTATE.ryw_Death;
                    this._ani.play("die");
                    ryw_SoundMgr.ryw_instance.ryw_playSound("animalDeath");
                    let firstFrame = true;
                    var fun = function () {
                        if (this._ani.getCurrentAnimatorPlayState().normalizedTime >= 1 && false == firstFrame) {
                            this._ani.speed = 0;
                            Laya.timer.clear(this, fun);
                            this.ryw_onDeath();
                            return;
                        }
                        firstFrame = false;
                    };
                    Laya.timer.frameLoop(1, this, fun);
                    break;
                }
            }
        }
        ryw_onDeath() {
            let index = 0;
            var fun = function () {
                if (index >= 5) {
                    Laya.timer.clear(this, fun);
                    this.ryw_destroyUnit();
                }
                if (index % 2 == 0) {
                    this.transform.localScale = new Laya.Vector3();
                }
                else {
                    this.transform.localScale = new Laya.Vector3(1, 1, 1);
                }
                index++;
            };
            Laya.timer.loop(150, this, fun);
        }
    }

    class Wolf extends Unit_JJVW_Base {
        constructor() {
            super(...arguments);
            this._speedX = 20;
            this._directionX = 1;
        }
        onAwake() {
            this._targetArr.push(ryw_UnitType.ryw_Warrior);
            this._targetArr.push(ryw_UnitType.ryw_Queen);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Bear);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Arrow);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Bomb);
            this._naturalEnemyArr.push(ryw_UnitType.ryw_Cannon);
        }
        ryw_onLastInit() {
            this._collision = this.Sprite3D.getComponent(Laya.PhysicsCollider).colliderShape;
            this._boxHeighy = this._collision.sizeY / 2 - this._collision.localOffset.y;
            this._ani = this.Sprite3D.getChildByName("Wolf").getComponent(Laya.Animator);
            this._ani.play("lod");
            this._isInitEnd = true;
        }
        ryw_onOpenUpdate() {
            this._isInitEnd = true;
        }
        onLateUpdate() {
            if (false == this._isInitEnd) {
                return;
            }
            this.ryw_onGravityCheck();
            if (this.ryw_onAssaultedArea()) {
                ryw_UNITSTATE.None == this.ryw_state;
            }
            var begin = this.transform.localPosition;
            var end = new Laya.Vector3();
            end.y = begin.y;
            end.z = begin.z;
            var time = this._defaultTimerDelta / 1000;
            if (ryw_UNITSTATE.ryw_Run == this.ryw_state) {
                this.ryw_runAssaulted(time);
            }
            else if (ryw_UNITSTATE.None == this.ryw_state) {
                this._directionX = 1;
                end.x = begin.x + 100 * this._directionX;
                if (this.ryw_onRayCastSprite(begin, end)) {
                    this.ryw_runAssaulted(time);
                }
                else {
                    this._directionX = -1;
                    end.x = begin.x + 100 * this._directionX;
                    if (this.ryw_onRayCastSprite(begin, end)) {
                        this.ryw_runAssaulted(time);
                    }
                    else {
                    }
                }
            }
        }
        ryw_onRayCastSprite(begin, end) {
            var outHit = new Laya.HitResult();
            this.Scene3D.physicsSimulation.raycastFromTo(begin, end, outHit);
            if (outHit.succeeded) {
                let spr = outHit.collider.owner;
                if (null == spr || spr == this.Sprite3D) {
                    return false;
                }
                let name = spr.name;
                let otherUnit = spr.getComponent(Unit_JJVW_Base);
                if (null == otherUnit) {
                    return false;
                }
                if (ryw_UNITSTATE.ryw_Death == otherUnit.ryw_state) {
                    return false;
                }
                for (let index = 0; index < this._targetArr.length; index++) {
                    let element = this._targetArr[index];
                    if (otherUnit.Type == element) {
                        return true;
                    }
                }
            }
            return false;
        }
        ryw_runAssaulted(time) {
            if (ryw_UNITSTATE.None == this.ryw_state) {
                this.ryw_state = ryw_UNITSTATE.ryw_Run;
                this._ani.play("pao");
                if (this._directionX == 1) {
                    this.transform.localRotationEulerY = (this._directionX == 1) ? 180 : 0;
                }
            }
            this.transform.localPositionX += this._speedX * this._directionX * time;
        }
        ryw_onAssaulted(unit) {
            for (let i = 0; i < this._targetArr.length; i++) {
                let type = this._targetArr[i];
                if (type == unit) {
                    console.log(this.Type + " 攻击 " + unit);
                    this.ryw_state = ryw_UNITSTATE.ryw_Attack;
                    this._ani.play("gongji");
                    Laya.timer.frameOnce(1, this, function () {
                        if (this._ani.getCurrentAnimatorPlayState().normalizedTime >= 1) {
                            this._ani.play("load");
                            this.ryw_state = ryw_UNITSTATE.None;
                        }
                    });
                    break;
                }
            }
        }
        ryw_onBeAssaulted(unit) {
            for (let i = 0; i < this._naturalEnemyArr.length; i++) {
                let type = this._naturalEnemyArr[i];
                if (type == unit) {
                    console.log(this.Type + " 被攻击 " + unit);
                    this.ryw_state = ryw_UNITSTATE.ryw_Death;
                    this._ani.play("die");
                    Laya.timer.frameOnce(1, this, function () {
                        if (this._ani.getCurrentAnimatorPlayState().normalizedTime >= 1) {
                            this.ryw_state = ryw_UNITSTATE.None;
                            this.ryw_onDeath();
                        }
                    });
                    break;
                }
            }
        }
        ryw_onDeath() {
            ryw_SoundMgr.ryw_instance.ryw_playSound("animalDeath");
            this.ryw_destroyUnit();
        }
    }

    class CannonGravity extends Cannon {
        ryw_onGravityCheck() {
        }
    }

    class UnitFactory {
        constructor(level) {
            this.ryw__level = level;
        }
        ryw_create(unitType, prefabName) {
            var name = null == prefabName ? String(unitType) : prefabName;
            if (name) {
                var ins = this.ryw__level.Scene3D.getChildByName(name);
                if (ins) {
                    console.log("UnitFactory  name = " + name);
                    var unitComponent = null;
                    switch (unitType) {
                        case ryw_UnitType.ryw_Warrior:
                            unitComponent = ins.addComponent(Warrior);
                            break;
                        case ryw_UnitType.ryw_Queen:
                            unitComponent = ins.addComponent(Queen);
                            break;
                        case ryw_UnitType.ryw_Arrow:
                            unitComponent = ins.addComponent(Arrow);
                            break;
                        case ryw_UnitType.ryw_Bomb:
                            unitComponent = ins.addComponent(Bomb);
                            break;
                        case ryw_UnitType.ryw_Cannon:
                            unitComponent = ins.addComponent(Cannon);
                            break;
                        case ryw_UnitType.ryw_CannonGravity:
                            unitComponent = ins.addComponent(CannonGravity);
                            break;
                        case ryw_UnitType.ryw_Cannonball:
                            unitComponent = ins.addComponent(Cannonball);
                            break;
                        case ryw_UnitType.ryw_Bear:
                            unitComponent = ins.addComponent(Bear);
                            break;
                        case ryw_UnitType.ryw_Tiger:
                            unitComponent = ins.addComponent(Tiger);
                            break;
                        case ryw_UnitType.ryw_Wolf:
                            unitComponent = ins.addComponent(Wolf);
                            break;
                        default:
                            unitComponent = ins.addComponent(Unit_JJVW_Base);
                            break;
                    }
                    if (unitType) {
                        if (unitType == ryw_UnitType.ryw_CannonGravity) {
                            unitType = ryw_UnitType.ryw_Cannon;
                        }
                        unitComponent.ryw_onInit(this.ryw__level.Scene3D, unitType);
                    }
                    return unitComponent;
                }
            }
            return null;
        }
    }

    class ryw_VibrateMgr {
        static ryw_vibrateShort() {
            if (!ryw_VibrateMgr.ryw_isEnable)
                return;
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window["wx"].vibrateShort();
            }
            else if (Laya.Browser.onQGMiniGame) {
                Laya.Browser.window["qg"].vibrateShort();
            }
            else if (Laya.Browser.onQQMiniGame) {
                Laya.Browser.window["qq"].vibrateShort();
            }
            else {
                NativeCallback.CallNativeFunc("vibrateShort");
            }
        }
        static ryw_vibrateLong() {
            if (!ryw_VibrateMgr.ryw_isEnable)
                return;
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window["wx"].vibrateLong();
            }
            else if (Laya.Browser.onQGMiniGame) {
                Laya.Browser.window["qg"].vibrateLong();
            }
            else if (Laya.Browser.onQQMiniGame) {
                Laya.Browser.window["qq"].vibrateLong();
            }
            else {
                NativeCallback.CallNativeFunc("vibrateLong");
            }
        }
        static ryw_vibrate(time) {
            if (!ryw_VibrateMgr.ryw_isEnable)
                return;
            if (Laya.Browser.onMiniGame) {
                let count = time / 15;
                let index = 0;
                let obj = { count: count, index: index };
                Laya.timer.loop(16, obj, function () {
                    ryw_VibrateMgr.ryw_vibrateShort();
                    index++;
                    if (index > count) {
                        Laya.timer.clearAll(obj);
                    }
                });
            }
            else if (Laya.Browser.onQGMiniGame) {
                let count = time / 20;
                let index = 0;
                let obj = { count: count, index: index };
                Laya.timer.loop(21, obj, function () {
                    ryw_VibrateMgr.ryw_vibrateShort();
                    index++;
                    if (index > count) {
                        Laya.timer.clearAll(obj);
                    }
                });
            }
            else if (Laya.Browser.onQQMiniGame) {
                let count = time / 20;
                let index = 0;
                let obj = { count: count, index: index };
                Laya.timer.loop(21, obj, function () {
                    ryw_VibrateMgr.ryw_vibrateShort();
                    index++;
                    if (index > count) {
                        Laya.timer.clearAll(obj);
                    }
                });
            }
            else if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                let count = time / 20;
                let index = 0;
                let obj = { count: count, index: index };
                Laya.timer.loop(21, obj, function () {
                    ryw_VibrateMgr.ryw_vibrateShort();
                    index++;
                    if (index > count) {
                        Laya.timer.clearAll(obj);
                    }
                });
            }
        }
    }
    ryw_VibrateMgr.ryw_isEnable = true;

    class PikeBody extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this.ryw__isAllowTouch = true;
        }
        onAwake() {
            this.ryw__collider = this.owner.getComponent(Laya.PhysicsCollider);
        }
        onEnable() {
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onAllowTouch, this, this.ryw_onAllowTouch);
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_OnMovePike, this, this.ryw_onForbidTouch);
        }
        onDisable() {
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onAllowTouch, this, this.ryw_onAllowTouch);
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_OnMovePike, this, this.ryw_onForbidTouch);
        }
        ryw_onAllowTouch() {
            this.ryw__isAllowTouch = true;
        }
        ryw_onForbidTouch() {
            this.ryw__isAllowTouch = false;
        }
        ryw_onSetPike(pike) {
            this.ryw__pike = pike;
        }
        ryw_onMyPikeMouseDown() {
            if (this.ryw__pike.ryw_tipsModeForbid) {
                console.log("提示模式 此钎子不能动 ", this.ryw__pike.owner.name);
                ryw_SoundMgr.ryw_instance.ryw_playSound("err");
                this.ryw__pike.ryw_onVibrate();
                ryw_VibrateMgr.ryw_vibrateShort();
                return;
            }
            if (false == this.ryw__isAllowTouch) {
                ryw_SoundMgr.ryw_instance.ryw_playSound("err");
                this.ryw__pike.ryw_onVibrate();
                ryw_VibrateMgr.ryw_vibrateShort();
                return;
            }
            this.ryw__isAllowTouch = false;
            this.ryw__collider.enabled = false;
            this.ryw__pike.ryw_onMyMouseDown();
        }
    }

    class Pike extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this.ryw__gravitySpeed = 98 * 8;
            this.ryw__gravityTIme = 3;
            this.ryw_isMove = false;
            this._isVirate = false;
            this.ryw_tipsModeForbid = false;
        }
        onAwake() {
            this._transform = this.owner.transform;
            var pikeBody1 = this.owner.getChildByName("Cylinder").getChildByName("Cylinder_0").addComponent(PikeBody);
            pikeBody1.ryw_onSetPike(this);
            var pikeBody2 = this.owner.getChildByName("pb_Mesh").addComponent(PikeBody);
            pikeBody2.ryw_onSetPike(this);
        }
        ryw_onAssaulted(unit) {
        }
        ryw_onBeAssaulted(unit) {
        }
        ryw_showTipsImage() {
        }
        ryw_onVibrate() {
            if (this._isVirate) {
                return;
            }
            this._isVirate = true;
            this._beginVibratePos = new Laya.Vector3(this._transform.localPosition.x, this._transform.localPosition.y, this._transform.localPosition.z);
            let v = new Laya.Vector3();
            this._transform.getRight(v);
            var self = this;
            let subSpeed = 0.5;
            var move3 = function () {
                Laya.Tween.to(self._transform, {
                    localPositionX: self._beginVibratePos.x,
                    localPositionY: self._beginVibratePos.y,
                    localPositionZ: self._beginVibratePos.z
                }, 100, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                    self._isVirate = false;
                }));
            };
            var index = 0;
            var move2 = function () {
                Laya.Tween.to(self._transform, {
                    localPositionX: v.x * subSpeed * -1 + self._beginVibratePos.x,
                    localPositionY: v.y * subSpeed * -1 + self._beginVibratePos.y,
                    localPositionZ: v.z * subSpeed * -1 + self._beginVibratePos.z
                }, 100, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                    if (index >= 1) {
                        move3();
                    }
                    else {
                        move1();
                    }
                    index++;
                }));
            };
            var move1 = function () {
                Laya.Tween.to(self._transform, {
                    localPositionX: v.x * subSpeed + self._beginVibratePos.x,
                    localPositionY: v.y * subSpeed + self._beginVibratePos.y,
                    localPositionZ: v.z * subSpeed + self._beginVibratePos.z
                }, 100, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                    move2();
                }));
            };
            move1();
        }
        ryw_onMyMouseDown() {
            if (this._isVirate) {
                this._isVirate = false;
                this.ryw_onClearTweenAndTimer();
                this._transform.localPositionX = this._beginVibratePos.x;
                this._transform.localPositionY = this._beginVibratePos.y;
                this._transform.localPositionZ = this._beginVibratePos.z;
            }
            let v = new Laya.Vector3();
            this._transform.getRight(v);
            v.x *= this.ryw__gravitySpeed * this.ryw__gravityTIme;
            v.y *= this.ryw__gravitySpeed * this.ryw__gravityTIme;
            v.z *= this.ryw__gravitySpeed * this.ryw__gravityTIme;
            let endPos = new Laya.Vector3();
            endPos.x = v.x + this._transform.localPositionX;
            endPos.y = v.y + this._transform.localPositionY;
            endPos.z = v.z + this._transform.localPositionZ;
            this.ryw__gravityTween = Laya.Tween.to(this._transform, {
                localPositionX: endPos.x,
                localPositionY: endPos.y,
                localPositionZ: endPos.z
            }, 1000 * 1 * this.ryw__gravityTIme, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                this.ryw_destroyUnit();
            }));
            this.ryw_isMove = true;
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_OnMovePike, { pike: this });
            ryw_SoundMgr.ryw_instance.ryw_playSound("chou");
        }
        ryw_destroyUnit() {
            this.owner.removeSelf();
            this.owner.destroy(true);
        }
        onDestroy() {
            this.ryw_onClearTweenAndTimer();
        }
        ryw_onClearTweenAndTimer() {
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this.owner);
            Laya.timer.clearAll(this.owner);
            Laya.Tween.clearAll(this._transform);
            Laya.timer.clearAll(this._transform);
        }
    }

    var ryw_levelState;
    (function (ryw_levelState) {
        ryw_levelState[ryw_levelState["ryw_playing"] = 0] = "ryw_playing";
        ryw_levelState[ryw_levelState["ryw_gameover"] = 1] = "ryw_gameover";
    })(ryw_levelState || (ryw_levelState = {}));
    class LevelBase extends Laya.Script3D {
        constructor() {
            super();
            this._onPostValue = true;
            this.useBgArr = {
                [0]: 0,
                [1]: 0,
                [2]: 0,
                [3]: 0,
                [4]: 0,
                [5]: 0,
                [6]: 0,
                [7]: 0,
                [8]: 0,
                [9]: 0,
                [10]: 0,
                [11]: 0,
                [12]: 0,
                [13]: 0,
                [14]: 0,
                [15]: 0,
                [16]: 0,
                [17]: 0,
                [18]: 0,
                [19]: 0,
                [20]: 0,
                [21]: 0,
                [22]: 0,
                [23]: 0,
                [24]: 0,
                [25]: 0,
                [26]: 0,
                [27]: 0,
                [28]: 0,
                [29]: 0,
                [30]: 0,
                [31]: 0,
                [32]: 0,
                [33]: 0,
                [34]: 0,
                [35]: 0,
                [36]: 0,
                [37]: 0,
                [38]: 0,
                [39]: 0,
            };
            this.optimalSolutionPathArr = {
                [0]: [0],
                [1]: [0, 1, 2],
                [2]: [0, 2],
                [3]: [1, 0],
                [4]: [2, 1, 0],
                [5]: [3, 1, 0, 2, 4],
                [6]: [0, 2, 1],
                [7]: [0, 1, 2],
                [8]: [2, 1, 0, 3],
                [9]: [1, 0],
                [10]: [2, 1, 0],
                [11]: [0, 1],
                [12]: [2, 0, 1],
                [13]: [0, 3, 2, 1],
                [14]: [1],
                [15]: [4, 3, 0, 1, 5, 2],
                [16]: [2, 1, 0],
                [17]: [2, 5, 4, 1],
                [18]: [2, 0, 1, 5],
                [19]: [2, 1, 0, 3, 4],
                [20]: [4, 1, 0],
                [21]: [3, 2, 0, 1],
                [22]: [0, 2, 3, 1],
                [23]: [0, 1, 3, 5],
                [24]: [1, 0, 3],
                [25]: [2, 0, 3, 1, 4],
                [26]: [0, 2],
                [27]: [1, 3, 2, 0, 4],
                [28]: [1, 2, 4, 3, 5, 0],
                [29]: [1, 2, 3, 0],
                [30]: [1, 2, 3, 4, 0],
                [31]: [1, 2, 3, 0],
                [32]: [1, 4, 3],
                [33]: [3, 2, 4],
                [34]: [1, 0, 2],
                [35]: [4, 1, 0, 3, 2],
                [36]: [1, 0, 3],
            };
            this._levelPikePathArr = {
                [0]: [[0]],
                [1]: [[1, 2]],
                [2]: [[0, 2]],
                [3]: [[0, 1]],
                [4]: [[0, 1]],
                [5]: [[1, 2, 4]],
                [6]: [[1, 2]],
                [7]: [[1, 2]],
                [8]: [[0, 1, 2, 3]],
                [9]: [[0, 1]],
                [10]: [[0, 2]],
                [11]: [[1]],
                [12]: [[1]],
                [13]: [[1, 2, 3]],
                [14]: [[1]],
                [15]: [[2, 5]],
                [16]: [[0, 2]],
                [17]: [[1, 2, 4]],
                [18]: [[1, 2, 5]],
                [19]: [[0, 1, 2, 3, 4]],
                [20]: [[0, 1], [0, 2]],
                [21]: [[1, 2, 3]],
                [22]: [[0, 1, 3]],
                [23]: [[1, 3, 5], [1, 2, 4, 5]],
                [24]: [[0, 1, 3]],
                [25]: [[0, 1, 3, 4]],
                [26]: [[0, 2]],
                [27]: [[0, 1, 2, 4]],
                [28]: [[0, 1, 2, 5], [0, 1, 3, 4, 5]],
                [29]: [[0, 1, 3]],
                [30]: [[0, 1, 4]],
                [31]: [[0]],
                [32]: [[1, 3]],
                [33]: [[2, 3, 4], [0, 1, 3, 4]],
                [34]: [[0, 2]],
                [35]: [[0, 1, 2, 3, 4]],
                [36]: [[0, 1, 3]],
            };
            this._pikePathArr = new Array();
            this._pikeAll = new Array();
            this._solutionArr = new Array();
            this._unitArr = new Array();
            this._isForbidTouch = false;
            this._levelIndex = 1;
            this._isTipMode = false;
            this.point = new Laya.Vector2();
            this._outHitResult = new Laya.HitResult();
            this.gameState = ryw_levelState.ryw_playing;
        }
        get Scene3D() {
            return this._ownerScene3D;
        }
        onAwake() {
            this._isForbidTouch = true;
            this.gameState = ryw_levelState.ryw_playing;
            this._ownerScene3D = this.owner;
            this._unitFactory = new UnitFactory(this);
            for (var i = 0; i < this.Scene3D.numChildren; i++) {
                var child = this.Scene3D.getChildAt(i);
                if (child.name.indexOf("" + "Pike") != -1) {
                    var pike = child.addComponent(Pike);
                    this._pikeAll.push(pike);
                }
                else if (child.name.indexOf("" + "Camera") != -1) {
                    this._camera = child;
                    let num = Number(child.name.slice(6));
                    console.log("Camera  num = ", num);
                    this._camera.orthographicVerticalSize = num * 1.9;
                }
                else if (child.name.indexOf("" + ryw_UnitType.ryw_Warrior) != -1) {
                    this._warrior = this.ryw_addUnit(ryw_UnitType.ryw_Warrior, child.name);
                }
                else if (child.name.indexOf("" + ryw_UnitType.ryw_Queen) != -1) {
                    this._queen = this.ryw_addUnit(ryw_UnitType.ryw_Queen, child.name);
                }
                else if (child.name.indexOf("" + ryw_UnitType.ryw_Bomb) != -1) {
                    this.ryw_addUnit(ryw_UnitType.ryw_Bomb, child.name);
                }
                else if (child.name.indexOf("" + ryw_UnitType.ryw_Bear) != -1) {
                    this.ryw_addUnit(ryw_UnitType.ryw_Bear, child.name);
                }
                else if (child.name.indexOf("" + ryw_UnitType.ryw_CannonGravity) != -1) {
                    this.ryw_addUnit(ryw_UnitType.ryw_CannonGravity, child.name);
                }
                else if (child.name.indexOf("" + ryw_UnitType.ryw_Cannonball) != -1) {
                }
                else if (child.name.indexOf("" + ryw_UnitType.ryw_Cannon) != -1) {
                    this.ryw_addUnit(ryw_UnitType.ryw_Cannon, child.name);
                }
                else if (child.name.indexOf("" + ryw_UnitType.ryw_Arrow) != -1) {
                    this.ryw_addUnit(ryw_UnitType.ryw_Arrow, child.name);
                }
                else if (child.name.indexOf("" + ryw_UnitType.ryw_Tiger) != -1) {
                    this.ryw_addUnit(ryw_UnitType.ryw_Tiger, child.name);
                }
            }
        }
        ryw_onShowGameGuide(pike) {
            var outPos = new Laya.Vector4();
            var endPos = new Laya.Vector4();
            var v = new Laya.Vector3();
            var pTransfrom = pike.owner.transform;
            var pScale = pike.owner.getChildByName("Cylinder").transform.scale;
            pTransfrom.getRight(v);
            var p = pTransfrom.position.clone();
            var p1 = new Laya.Vector3();
            p1.x = -1 * pScale.y * 75 / 100 * 4 * v.x + p.x;
            p1.y = -1 * pScale.y * 75 / 100 * 4 * v.y + p.y;
            p1.z = -1 * pScale.y * 75 / 100 * 4 * v.z + p.z;
            var p2 = new Laya.Vector3();
            p2.x = -1 * pScale.y * 25 / 100 * 4 * v.x + p.x;
            p2.y = -1 * pScale.y * 25 / 100 * 4 * v.y + p.y;
            p2.z = -1 * pScale.y * 25 / 100 * 4 * v.z + p.z;
            this._camera.viewport.project(p1, this._camera.projectionViewMatrix, outPos);
            this._camera.viewport.project(p2, this._camera.projectionViewMatrix, endPos);
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onShowGuide, { x: outPos.x / Laya.stage.clientScaleX, y: outPos.y / Laya.stage.clientScaleY, endX: endPos.x / Laya.stage.clientScaleX, endY: endPos.y / Laya.stage.clientScaleY });
        }
        onStart() {
            var pos1 = this._warrior.transform.localPosition;
            var pos2 = this._queen.transform.localPosition;
            if (pos1.x > pos2.x) {
                this._warrior.ryw_directionX = -1;
            }
            else {
                this._warrior.ryw_directionX = 1;
            }
            this._ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
            this.point = new Laya.Vector2();
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        }
        onDestroy() {
            this.gameState = ryw_levelState.ryw_gameover;
            this.Scene3D.offAll();
        }
        onMouseDown() {
            this.point.x = Laya.MouseManager.instance.mouseX / Laya.stage.clientScaleX;
            this.point.y = Laya.MouseManager.instance.mouseY / Laya.stage.clientScaleY;
            if (this.gameState == ryw_levelState.ryw_gameover) {
                return;
            }
            this._camera.viewportPointToRay(this.point, this._ray);
            this.Scene3D.physicsSimulation.rayCast(this._ray, this._outHitResult);
            if (this._outHitResult.succeeded) {
                let pikeBodyCom = this._outHitResult.collider.owner.getComponent(PikeBody);
                if (pikeBodyCom) {
                    console.log("LevelBase onMouseDown PikeBody");
                    pikeBodyCom.ryw_onMyPikeMouseDown();
                }
            }
        }
        ryw_addUnit(unitType, name) {
            var unit = null;
            unit = this._unitFactory.ryw_create(unitType, name);
            this._unitArr.push(unit);
            return unit;
        }
        onLateUpdate() {
            if (false == this._isForbidTouch) {
                return;
            }
            for (let i = 0; i < this._unitArr.length; i++) {
                let unit = this._unitArr[i];
                if (null == unit) {
                    continue;
                }
                if (unit.ryw_state == ryw_UNITSTATE.ryw_Run || unit.ryw_state == ryw_UNITSTATE.ryw_Attack || false == unit.ryw_standOnTheGround) {
                    return;
                }
            }
            this._isForbidTouch = false;
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onAllowTouch);
        }
        onEnable() {
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_OnMovePike, this, this.ryw_onMovePikeCall);
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onOverAction, this, this.ryw_onOverAction);
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onQueenStand, this, this.ryw_onSaveQueen);
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onOver, this, this.ryw_onOver);
        }
        onDisable() {
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_OnMovePike, this, this.ryw_onMovePikeCall);
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onOverAction, this, this.ryw_onOverAction);
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onQueenStand, this, this.ryw_onSaveQueen);
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onOver, this, this.ryw_onOver);
        }
        ryw_setTipsMode(value) {
            console.log("setTipsMode  value = ", value);
            if (value == false) {
                return;
            }
            this._isTipMode = true;
            this.ryw_tipsSetPikeForbid();
            this._solutionArr = this.optimalSolutionPathArr[this._levelIndex - 1];
            let self = this;
            Laya.timer.once(1000 * 1, this, () => {
                let num = self._solutionArr[0];
                self.ryw_tipsSetPikeForbid(num);
            });
        }
        ryw_tipsSetPikeForbid(num) {
            console.log("tipsSetPikeForbid   num = ", num);
            for (let i = 0; i < this._pikeAll.length; i++) {
                let pike = this._pikeAll[i];
                if (null != pike) {
                    if (null == num) {
                        pike.ryw_tipsModeForbid = true;
                    }
                    else {
                        console.log("pike.owner.name  = ", pike.owner.name);
                        if (pike.owner.name.indexOf("Pike" + num) != -1) {
                            pike.ryw_tipsModeForbid = false;
                            this.ryw_onShowGameGuide(pike);
                            break;
                        }
                        else {
                            pike.ryw_tipsModeForbid = true;
                        }
                    }
                }
                else {
                }
            }
        }
        ryw_onSetPikePath(levelIndex) {
            this._levelIndex = levelIndex;
            let self = this;
            Laya.Sprite3D.load("subRes/LayaScene/Conventional/beijing.lh", Laya.Handler.create(null, function (sp) {
                self.Scene3D.addChild(sp);
            }));
            this._pikePathArr = this._levelPikePathArr[levelIndex - 1];
            if (levelIndex == 1) {
                this.ryw_onShowGameGuide(this._pikeAll[0]);
            }
        }
        ryw_onMovePikeCall(para) {
            var pike = para.pike;
            if (this._isTipMode) {
                var indexStr = pike.owner.name.substring(4);
                console.log("onMovePikeCall   indexStr = ", indexStr);
                var num1 = Number(indexStr);
                let num2 = this._solutionArr[0];
                console.log("onMovePikeCall  num2 = ", num2);
                if (num1 == num2) {
                    this._solutionArr.splice(0, 1);
                    console.log("onMovePikeCall  this._solutionArr = ", this._solutionArr);
                    let self = this;
                    Laya.timer.once(300, this, () => {
                        let num = self._solutionArr[0];
                        console.log("onMovePikeCall  num = ", num);
                        self.ryw_tipsSetPikeForbid(num);
                    });
                    ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onHideGuide);
                }
            }
            else if (this._levelIndex == 1) {
                ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onHideGuide);
            }
            for (let i = 0; i < this._pikeAll.length; i++) {
                let p = this._pikeAll[i];
                if (pike == p) {
                    this._pikeAll.splice(i, 1);
                    break;
                }
            }
            Laya.timer.once(100, this, () => {
                this._isForbidTouch = true;
                var pike = para.pike;
                var indexStr = pike.owner.name.substring(4);
                var num = Number(indexStr);
                for (let i = 0; i < this._pikePathArr.length; i++) {
                    let element = this._pikePathArr[i];
                    if (element.length == 0) {
                        continue;
                    }
                    for (let j = 0; j < element.length; j++) {
                        let pikeNum = element[j];
                        if (pikeNum == num) {
                            element.splice(j, 1);
                            if (this.ryw_onSaveQueen()) {
                                return;
                            }
                            else {
                                break;
                            }
                        }
                    }
                }
            });
        }
        ryw_onOver(para) {
            this.gameState = ryw_levelState.ryw_gameover;
        }
        ryw_onOverAction(para) {
            if (this.gameState == ryw_levelState.ryw_gameover) {
                return;
            }
            this.gameState = ryw_levelState.ryw_gameover;
            let result = para.result;
            var pos1 = this._queen.transform.position;
            var pos2 = this._warrior.transform.position;
            var pos = new Laya.Vector3();
            if (result == 0) {
                pos = new Laya.Vector3(pos1.x * 0.6 + pos2.x * 0.4, (pos1.y + pos2.y) / 2, (pos1.z + pos2.z) / 2);
            }
            else if (result == 1) {
                pos = new Laya.Vector3(pos1.x, pos1.y, pos1.z);
            }
            else if (result == 2) {
                pos = new Laya.Vector3(pos2.x, pos2.y, pos2.z);
            }
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onShowShade);
            var self = this;
            Laya.Tween.to(self._camera.transform, {
                localPositionX: pos.x,
                localPositionY: pos.y
            }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                let outPos = new Laya.Vector4();
                self._camera.viewport.project(pos, self._camera.projectionViewMatrix, outPos);
                console.log("this._camera  pos = ", outPos);
                ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.Game_onMoveShade, { x: outPos.x / Laya.stage.clientScaleX, y: outPos.y / Laya.stage.clientScaleY });
                Laya.Tween.to(self._camera, {
                    orthographicVerticalSize: 50
                }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                }));
            }));
        }
        ryw_onSaveQueen() {
            console.log("onSaveQueen  private onSaveQueen():boolean");
            if (false == this._queen.ryw_standOnTheGround) {
                console.log("onSaveQueen  false==this._queen.standOnTheGround");
                return false;
            }
            for (let i = 0; i < this._pikePathArr.length; i++) {
                let element = this._pikePathArr[i];
                if (element.length == 0) {
                    this._warrior.ryw_onWarriorMove(this._queen.transform.localPosition);
                    console.log("猪脚去救女王");
                    return true;
                }
            }
            return false;
        }
        onPostRender() {
            if (this._onPostValue) {
                this._onPostValue = false;
                ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_App_CloseFirstLoadingView);
            }
        }
    }

    class GameView extends ryw_ViewBase {
        constructor() {
            super(...arguments);
            this._currentLevel = 1;
            this._showLevel = 1;
            this._againBtn = null;
            this._tipBtn = null;
            this._tipBanner = null;
            this._tipNormal = null;
            this._isBannerLoad = true;
            this._isSeverLevel = true;
            this._isTipLevel = false;
            this._adState = false;
            this._MaxLevel = 37;
            this._MaxlocalSave = 20;
            this._testLevel = 0;
        }
        onAwake() {
            this._levelTitle = this.owner.getChildByName("LevelTitle").addComponent(LevelTitle);
            this._againBtn = this.owner.getChildByName("againImg").getChildByName("againBtn");
            this._roundShade = this.owner.getChildByName("roundShade");
            this._turoriaUp = this.owner.getChildByName("turoriaUp");
            this._tipBtn = this.owner.getChildByName("tipBtn");
            this._tipNode = this.owner.getChildByName("tipNode");
            this._tipNode.visible = false;
            this._tipNormal = this._tipNode.getChildByName("tipNormal");
            this._tipBanner = this._tipNode.getChildByName("tipBanner");
            console.log("this._roundShade  = ", this._roundShade);
        }
        onStart() {
            this._adState = false;
            this.init3dScene();
            let show = () => {
                if (this._adState) {
                    this._adState = false;
                    this._isTipLevel = true;
                    ryw_ALD.ryw_aldSendEvent(ryw_ALDEventDef.TipLevelGame, {
                        "提示 当前": this._showLevel,
                        "模板": this._currentLevel
                    });
                    this.onNextLevel();
                }
                console.log("wxShowwxShowwxShowwxShowwxShow  adTouchState.Video == this._adState = ", this._adState);
            };
            let hide = () => {
                if (this._adState) {
                }
                console.log("wxHidewxHidewxHidewxHidewxHide   this._adState", this._adState);
            };
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window["wx"].onShow(show);
                Laya.Browser.window["wx"].onHide(hide);
            }
        }
        onRewardVidewoFail() {
            this._adState = true;
            this.onVideoFaild();
        }
        onRewardVidewoSuccess() {
            this._isTipLevel = true;
            this.onNextLevel();
            this._tipBtn.visible = false;
        }
        ryw_addEvent() {
            this._againBtn.on(Laya.Event.CLICK, this, this.onAgainClick);
            this._tipBtn.on(Laya.Event.CLICK, this, this.onTipClick);
        }
        ryw_removeEvent() {
            this._againBtn.off(Laya.Event.CLICK, this, this.onAgainClick);
            this._tipBtn.off(Laya.Event.CLICK, this, this.onTipClick);
        }
        onTipClick() {
            if (this._level.gameState == ryw_levelState.ryw_gameover) {
                return;
            }
            if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                this._tipBtn.visible = false;
                NativeCallback.NowVideoType = "rewardAd";
                NativeCallback.CallNativeFunc("showRewardVideo");
                ryw_SoundMgr.ryw_instance.ryw_stopBGM();
            }
            else {
                this._isTipLevel = true;
                this.onNextLevel();
                this._tipBtn.visible = false;
            }
        }
        onShareMyGame() {
            console.log("onShareMyGame");
            ryw_WXAPI.ryw_share(() => {
                console.log(" WXAPI.share");
            }, "玩不过了，快来帮帮我！~", "");
            Laya.timer.once(2000, this, () => {
                this._isTipLevel = true;
                ryw_ALD.ryw_aldSendEvent(ryw_ALDEventDef.TipLevelGame, {
                    "提示 当前": this._showLevel,
                    "模板": this._currentLevel
                });
                this.onNextLevel();
            });
        }
        onVideoFaild() {
            console.log("onVideoFaild  ryw_WudianMgr.ryw_WudianFlag = ", ryw_WudianMgr.ryw_WudianFlag);
            Laya.timer.once(3000, this, () => {
                this._tipBtn.visible = true;
            });
            this._tipNode.visible = true;
            this._tipBanner.visible = false;
            this._tipNormal.visible = true;
            let self = this;
            let yPos = this._tipNormal.y;
            Laya.Tween.to(this._tipNormal, {
                y: yPos - 100,
                alpha: 0
            }, 1000, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                self._tipNode.visible = false;
                self._tipNormal.alpha = 1;
                self._tipNormal.y = yPos;
            }));
        }
        onAgainClick() {
            if (this._level.gameState == ryw_levelState.ryw_gameover) {
                return;
            }
            this._isTipLevel = false;
            ryw_ALD.ryw_aldSendEvent(ryw_ALDEventDef.AgainLevelGame, {
                "重来 当前": this._showLevel,
                "模板": this._currentLevel
            });
            this.onNextLevel();
        }
        onEnable() {
            super.onEnable();
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onOver, this, this.onGameOver);
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onNextGame, this, this.onNextLevel);
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onShowShade, this, this.onShowShade);
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onMoveShade, this, this.onMoveShade);
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onShowGuide, this, this.onShowGuide);
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.Game_onHideGuide, this, this.onHideGuide);
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.RewardVideoFail, this, this.onRewardVidewoFail);
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
        }
        onDisable() {
            super.onDisable();
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onOver, this, this.onGameOver);
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onNextGame, this, this.onNextLevel);
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onShowShade, this, this.onShowShade);
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onMoveShade, this, this.onMoveShade);
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onShowGuide, this, this.onShowGuide);
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.Game_onHideGuide, this, this.onHideGuide);
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.RewardVideoFail, this, this.onRewardVidewoFail);
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
        }
        initWinLevelData() {
            console.log("initWinLevelData");
            let _winArr = ryw_User.getwinLevelData();
            if (_winArr == null || _winArr.length < this._showLevel) {
                let _arr = new Array();
                for (let i = 1; i < this._showLevel; i++) {
                    _arr.push(i);
                }
                ryw_User.setwinLevelData(_arr);
            }
        }
        onFailLevelCheck() {
            console.log("onFailLevelCheck");
            let _winArr = ryw_User.getwinLevelData();
            console.log("onFailLevelCheck   _winArr = ", _winArr);
            if (_winArr == null || _winArr.length == 0) {
                return true;
            }
            for (let i = this._MaxlocalSave + 1; i <= this._MaxLevel; i++) {
                if (_winArr.indexOf(i) == -1) {
                    this._currentLevel = i;
                    console.log("onFailLevelCheck  this._currentLevel =", this._currentLevel);
                    return false;
                }
            }
            return true;
        }
        onGameOver(para) {
            if (para.result == 1) {
                this._showLevel += 1;
                console.log("onGameOver  this._isSeverLevel = ", this._isSeverLevel);
                if (this._isSeverLevel) {
                    ryw_User.passLevel();
                }
                else {
                    ryw_User.passLoaclLevel();
                }
                ryw_User.ryw_setLeveNum(this._showLevel);
                ryw_User.addwinLevel(this._currentLevel);
            }
            if (para.result == 1) {
                ryw_ALD.ryw_aldSendEvent(ryw_ALDEventDef.CompleteLevelGame, {
                    "胜利 当前": this._showLevel,
                    "模板": this._currentLevel
                });
            }
            else {
                ryw_ALD.ryw_aldSendEvent(ryw_ALDEventDef.FailLevelGame, {
                    "失败 当前": this._showLevel,
                    "模板": this._currentLevel
                });
            }
            this.onGetNextLevel();
            ryw_GameMgr.ryw_getInstance().ryw_saveGameData();
            var self = this;
            if (para.result == 1) {
                ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_GameWinView, para, (v) => {
                    self.ryw_closeView();
                });
            }
            else {
                ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_GameFailView, para, (v) => {
                    self.ryw_closeView();
                });
            }
        }
        onGetNextLevel() {
            console.log("onGetNextLevel");
            var levelData = ryw_User.getLevelData();
            if (levelData.length == 0) {
                let currIndex = ryw_User.ryw_getLeveNum();
                if (currIndex < this._MaxLevel) {
                    for (let i = currIndex; i <= this._MaxLevel; i++) {
                        levelData.push(i);
                    }
                }
                else {
                    levelData = this.onShuffleArithmetic(this._MaxLevel);
                }
                ryw_User.setLevelData(levelData);
            }
            console.log("onGetNextLevel   levelData = ", levelData);
            this._isSeverLevel = true;
            this._currentLevel = levelData[0];
            console.log("onGetNextLevel   _currentLevel = ", this._currentLevel);
            return this._currentLevel;
        }
        onShuffleArithmetic(endIndex, beginIndex = 2) {
            let normal = new Array();
            for (let i = beginIndex; i <= endIndex; i++) {
                normal.push(i);
            }
            let len = normal.length;
            for (let i = len - 1; i > 0; i--) {
                let randomIndex = Math.floor(Math.random() * (i + 1));
                let temp = normal[i];
                normal[i] = normal[randomIndex];
                normal[randomIndex] = temp;
            }
            return normal;
        }
        onNextLevel() {
            this._3dScene.offAll();
            this.destroy3dScene();
            if (null != this._3dScene) {
                this._3dScene.destroy();
                this._3dScene = null;
                Laya.Resource.destroyUnusedResources();
            }
            if (null != this._level) {
                this._level.destroy();
                this._level = null;
            }
            this._adState = false;
            this.onHideGuide();
            if (this._isTipLevel) {
                this._tipNode.visible = false;
                this._tipBtn.visible = false;
            }
            else {
                this._tipNode.visible = true;
                this._tipBtn.visible = true;
            }
            this.init3dScene();
        }
        init3dScene() {
            if (this._testLevel && this._testLevel != 0) {
                this._currentLevel = this._testLevel;
                this.onLoadLocalScene();
                return;
            }
            this._showLevel = ryw_User.ryw_getLeveNum();
            if (this._showLevel <= this._MaxlocalSave) {
                this.initWinLevelData();
                this.onGetNextLevel();
                this.onLoadLocalScene();
                return;
            }
            if (this.onFailLevelCheck()) {
                this.onGetNextLevel();
            }
            if (this._currentLevel <= this._MaxlocalSave) {
                this.onLoadLocalScene();
            }
            else {
                this.onLoadServerScene();
            }
        }
        onLoadLocalScene() {
            console.log("onLoadLocalScene this._currentLevel =", this._currentLevel);
            let self = this;
            let path = ryw_AppConfig.ryw_LocalTestReServer + "/LayaScene/Conventional/scene" + this._currentLevel + ".ls";
            this._levelTitle.setLevelString(this._showLevel);
            Laya.Scene3D.load(path, Laya.Handler.create(this, function (scene) {
                self._3dScene = scene;
                Laya.stage.addChild(scene);
                this._level = self._3dScene.addComponent(LevelBase);
                this._level.ryw_onSetPikePath(this._currentLevel);
                this._level.ryw_setTipsMode(this._isTipLevel);
                ryw_SoundMgr.ryw_instance.ryw_playBGM("bg");
            }));
        }
        onLoadServerScene() {
            console.log("onLoadServerScene this._currentLevel = ", this._currentLevel);
            let self = this;
            this._levelTitle.setLevelString(this._showLevel);
            let path = ryw_AppConfig.ryw_ResServer + "/LayaScene/Conventional/scene" + this._currentLevel + ".ls";
            Laya.Scene3D.load(path, Laya.Handler.create(this, function (scene) {
                if (scene == null) {
                    self.onInit3dLocalScene();
                    self.onLoadLocalScene();
                    return;
                }
                self._3dScene = scene;
                Laya.stage.addChild(scene);
                this._level = self._3dScene.addComponent(LevelBase);
                this._level.ryw_onSetPikePath(this._currentLevel);
                this._level.ryw_setTipsMode(this._isTipLevel);
                ryw_SoundMgr.ryw_instance.ryw_playBGM("bg");
            }));
        }
        onInit3dLocalScene() {
            var levelData = ryw_User.getLocalLevelData();
            if (levelData == null || levelData.length == 0) {
                if (this._showLevel > this._MaxlocalSave) {
                    levelData = this.onShuffleArithmetic(this._MaxlocalSave);
                    ryw_User.setLocalLevelData(levelData);
                    this._currentLevel = levelData[0];
                }
                else {
                    this._currentLevel = this._showLevel;
                }
            }
            else {
                this._currentLevel = levelData[0];
            }
            this._isSeverLevel = false;
        }
        onHideGuide() {
            if (this._turoriaUp) {
                this._turoriaUp.visible = false;
            }
            this._tipNode.visible = false;
            this._tipNormal.visible = false;
            this._tipBanner.visible = false;
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this);
        }
        onShowGuide(para) {
            let x = para.x;
            let y = para.y;
            let endx = para.endX;
            let endy = para.endY;
            this._turoriaUp.visible = true;
            this._turoriaUp.pos(x, y);
            this.onShowMoveGuide(x, y, endx, endy);
            Laya.timer.loop(3000, this, this.onShowMoveGuide, [x, y, endx, endy]);
        }
        onShowMoveGuide(x, y, endx, endy) {
            if (false == this._turoriaUp.visible) {
            }
            else {
                this.moveGuide(x, y, endx, endy);
            }
        }
        moveGuide(x, y, endx, endy) {
            Laya.Tween.to(this._turoriaUp, {
                x: endx,
                y: endy
            }, 1000, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                this.waitGuide(x, y);
            }));
        }
        waitGuide(x, y) {
            Laya.timer.once(1000, this, () => {
                if (null != this._turoriaUp) {
                    this._turoriaUp.pos(x, y);
                }
            });
        }
        onMoveShade(para) {
            console.log("onMoveShade   para.x = ", para.x);
            let x = para.x;
            let y = para.y;
            this._roundShade.visible = true;
            let self = this;
            Laya.Tween.to(self._roundShade, {
                scaleX: 0.9,
                scaleY: 0.9,
                x: x,
                y: y
            }, 500, Laya.Ease.linearNone);
        }
        onShowShade(para) {
            this._tipBtn.visible = false;
            this._tipNode.visible = false;
            ryw_SoundMgr.ryw_instance.ryw_stopBGM();
            this._roundShade.visible = true;
        }
        destroy3dScene() {
            if (null != this._3dScene) {
                this._3dScene.destroy(true);
                this._3dScene = null;
                Laya.Resource.destroyUnusedResources();
            }
            Laya.Tween.clearAll(this);
            Laya.timer.clearAll(this);
        }
        onDestroy() {
            this.destroy3dScene();
        }
    }

    class MoreGameView extends ryw_ViewBase {
        constructor() {
            super(...arguments);
            this._backBtn = null;
        }
        onAwake() {
            this._backBtn = this.owner.getChildByName("KRQ_History").getChildByName("TopZone").getChildByName("BackBtn");
        }
        ryw_addEvent() {
            this._backBtn.on(Laya.Event.CLICK, this, this.onBackBtn);
        }
        ryw_removeEvent() {
            this._backBtn.off(Laya.Event.CLICK, this, this.onBackBtn);
        }
        onBackBtn() {
            console.log("MoreGameView  onBackBtn");
            this.ryw_closeView();
        }
    }

    class ryw_TwinkleSprite extends Laya.Script {
        constructor() {
            super();
            this.TwinkleSpeed = 1000;
            this.TwinkleMinSize = 0.95;
            this.TwinkleMaxSize = 1.05;
            this.ryw__aniForward = false;
            this.ryw__fontSize = 25;
            this.ryw__originSize = 1;
        }
        onAwake() {
            this.ryw__displaySp = this.owner;
            this.ryw__disText = this.owner.getChildByName("TitelText");
            this.ryw__originSize = this.ryw__displaySp.scaleX;
            if (this.ryw__disText != null) {
                this.ryw__disText.text = "";
                this.ryw__fontSize = this.ryw__disText.fontSize;
            }
        }
        onEnable() {
            this.ryw__displaySp.scale(this.ryw__originSize, this.ryw__originSize);
        }
        onDisable() {
        }
        onUpdate() {
            this.ryw_displayAni();
        }
        ryw_displayAni() {
            if (!this.ryw__aniForward) {
                var scale = this.ryw__displaySp.scaleX - Laya.timer.delta / this.TwinkleSpeed;
                scale = Math.max(scale, this.TwinkleMinSize * this.ryw__originSize);
                this.ryw__displaySp.scale(scale, scale);
                if (this.ryw__displaySp.scaleX <= this.TwinkleMinSize * this.ryw__originSize) {
                    this.ryw__aniForward = true;
                }
            }
            else {
                var scale = this.ryw__displaySp.scaleX + Laya.timer.delta / this.TwinkleSpeed;
                scale = Math.min(scale, this.TwinkleMaxSize * this.ryw__originSize);
                this.ryw__displaySp.scale(scale, scale);
                if (this.ryw__displaySp.scaleX >= this.TwinkleMaxSize * this.ryw__originSize) {
                    this.ryw__aniForward = false;
                }
            }
        }
    }

    class ryw_ClickGetPrize extends ryw_ViewBase {
        constructor() {
            super();
            this.ryw__totalClickTimer = 22;
            this.ryw__needClickTime = 10;
            this.ryw__bannerClickTime = 7;
        }
        onAwake() {
            this.ryw__click_Btn = this.owner.getChildByName("Click_Btn");
            this.ryw__click_Btn.on(Laya.Event.CLICK, this, this.ryw_ButtonClicked);
            this.ryw__arrow_Img = this.ryw__click_Btn.getChildByName("Arrow_Img");
            this.ryw__bg = this.owner.getChildByName("BG");
            this.ryw__open_Btn = this.ryw__bg.getChildByName("Open_Btn");
            this.ryw__getPrize_View = this.owner.getChildByName("GetPrize_View");
            this.ryw__prizeCount_Text = this.ryw__getPrize_View.getChildByName("PrizeCount_Text");
            this.ryw__confirm_Btn = this.ryw__getPrize_View.getChildByName("Confirm_Btn");
            this.ryw__getPrize_View.visible = false;
            this.ryw__clickTime_PBar = this.ryw__bg.getChildByName("ClickTime_PBar");
            this.ryw__clickTime_PBar$Bar = this.ryw__clickTime_PBar.getChildByName("ClickTime_PBar$Bar");
            this.ryw__clickBarOriginalWidth = this.ryw__clickTime_PBar$Bar.width;
            this.ryw__bannerAd_View = this.owner.getChildByName("BannerAd_View");
            this.ryw__clickTime_PBar$Bar.width = 0;
            this.ryw__clickTime = 0;
            this.ryw__totalClickTime = 0;
        }
        onUpdate() {
            if (this.ryw__arrowUp) {
                this.ryw__arrow_Img.top += Laya.timer.delta / 5;
                if (this.ryw__arrow_Img.top > -140) {
                    this.ryw__arrowUp = false;
                }
            }
            else {
                this.ryw__arrow_Img.top -= Laya.timer.delta / 5;
                if (this.ryw__arrow_Img.top < -180) {
                    this.ryw__arrowUp = true;
                }
            }
            if (!this.ryw__bannerClicked) {
                let spd = 2 + (this.ryw__clickTime_PBar$Bar.width / this.ryw__clickBarOriginalWidth) * 6;
                if (this.ryw__clickTime_PBar$Bar.width >= spd) {
                    this.ryw__clickTime_PBar$Bar.width -= spd;
                }
                if ((this.ryw__clickTime_PBar$Bar.width / this.ryw__clickBarOriginalWidth) + 0.1 < (this.ryw__clickTime / this.ryw__needClickTime)) {
                    this.ryw__clickTime--;
                }
            }
        }
        ryw_openView(data) {
            this.ryw__compeletFunction = data.Complete;
            this.ryw__prizeCount = data.PrizeCount;
            super.ryw_openView(data);
        }
        ryw_OpenPrizeWindow() {
            this.ryw__bg.visible = false;
            let self = this;
            this.ryw__prizeCount_Text.text = this.ryw__prizeCount.toString();
            this.ryw__getPrize_View.visible = true;
            this.ryw__confirm_Btn.once(Laya.Event.CLICK, this, function () {
                if (self.ryw__compeletFunction) {
                    self.ryw__compeletFunction();
                }
                self.ryw_closeView();
            });
        }
        ryw_ShowBanner() {
            console.log("AD_WudianBanner_Show");
            ryw_CachedWXBannerAd.ryw_show();
        }
        ryw_ButtonClicked() {
            this.ryw__clickTime++;
            this.ryw__totalClickTime++;
            if (this.ryw__clickTime > this.ryw__needClickTime) {
                this.ryw__clickTime = this.ryw__needClickTime;
            }
            if (this.ryw__clickTime >= this.ryw__bannerClickTime) {
                if (this.ryw__clickTime >= this.ryw__needClickTime) {
                    this.ryw__clickTime = this.ryw__needClickTime - 1;
                }
                this.ryw__bannerClicked = true;
                console.log("误点Banner套路启动");
                this.ryw_ShowBanner();
                Laya.timer.once(2000, this, function () {
                    this.ryw_BannerClicked();
                });
            }
            else if (this.ryw__totalClickTime > this.ryw__totalClickTimer) {
                console.log("用户一直没点到，放他一马", this.ryw__totalClickTime);
                this.ryw_BannerClicked();
            }
            let progress = (this.ryw__clickTime / this.ryw__needClickTime) * this.ryw__clickBarOriginalWidth;
            this.ryw__clickTime_PBar$Bar.width = progress;
        }
        ryw_BannerClicked() {
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_WudianBanner_Hide);
            this.ryw__bannerClicked = true;
            this.ryw__clickTime = this.ryw__needClickTime;
            this.ryw__clickTime_PBar$Bar.width = this.ryw__clickBarOriginalWidth;
            this.ryw__click_Btn.visible = false;
            this.ryw__open_Btn.visible = true;
            this.ryw_OpenPrizeWindow();
        }
        onDestroy() {
            super.onDestroy();
            ryw_CachedWXBannerAd.ryw_hide();
        }
    }

    class ryw_LoadingView extends ryw_ViewBase {
        constructor() {
            super(...arguments);
            this.ryw__processWidth = 0;
        }
        onAwake() {
            this.ryw__bg = this.owner.getChildByName("Bg");
            this.ryw__bottomZone = this.ryw__bg.getChildByName("BottomZone");
            this.ryw__processBarBg = this.ryw__bottomZone.getChildByName("processBarBg");
            this.ryw__processBar = this.ryw__processBarBg.getChildByName("processBar");
            this.ryw__processWidth = this.ryw__processBar.width;
        }
        onStart() {
        }
        onEnable() {
            super.onEnable();
        }
        ryw_addEvent() {
            super.ryw_addEvent();
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
        }
        onUpdate() {
            this.ryw__bg.width = Laya.stage.width;
            this.ryw__bg.height = Laya.stage.height;
        }
        ryw_setProcess(process) {
            console.log("set process---------------- " + process);
            if (process < 0)
                process = 0;
            if (process > 1)
                process = 1;
            var width = this.ryw__processWidth * process;
            if (width < 1)
                width = 1;
            this.ryw__processBar.width = width;
        }
    }

    class ryw_TemplateViewBase extends ryw_ViewBase {
        constructor() {
            super(...arguments);
            this.ryw__historyBtn = null;
            this.ryw__topZone = null;
        }
        get ryw_HistoryBtn() {
            return this.ryw__historyBtn;
        }
        get ryw_TopZone() {
            return this.ryw__topZone;
        }
        onAwake() {
        }
        ryw_addEvent() {
            super.ryw_addEvent();
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
        }
        ryw_onHistoryBtn() {
        }
        get isShowHistoryBtn() {
            return false;
        }
        onUpdateIpBlockState(para) {
        }
    }

    class ryw_Exprot2ViewTemplate extends ryw_TemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__continueBtn = null;
            this.ryw__krqVLoopAd = null;
            this.ryw__KRQ_VLoopAd = null;
            this._isCanClose = false;
            this._banner = null;
            this._waitBanner = false;
        }
        onAwake() {
            super.onAwake();
            this.ryw__krqVLoopAd = this.ryw_View.getChildByName("KRQ_VLoopAd").getComponent(ryw_KRQ_VLoopAd);
            this.ryw__krqVLoopAd.ryw_useLocalRandom = true;
            this.ryw__krqVLoopAd.ryw_useRandom = false;
            this.ryw__krqVLoopAd.ryw_useMovePause = false;
            this.ryw__krqVLoopAd.ryw_sortDatas = this.ryw_sortDatas;
            this.ryw__continueBtn = this.ryw_View.getChildByName("ContinueBtn");
            this.ryw__continueBtn.visible = false;
            let self = this;
            if (ryw_WudianMgr.ryw_WudianFlag && 1 == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_continueBanner) {
                Laya.timer.once(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_continueBtnDelayTime * 1000, self, () => {
                    self.ryw__continueBtn.visible = true;
                    self._waitBanner = true;
                });
            }
            else {
                Laya.timer.once(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_continueBtnDelayTime * 1000, self, () => {
                    self.ryw__continueBtn.visible = true;
                    self._isCanClose = true;
                    self._waitBanner = false;
                });
            }
            this.ryw__KRQ_VLoopAd = this.ryw_View.getChildByName("KRQ_VLoopAd");
            if (ryw_Utilit.ryw_isIphoneX()) {
                this.ryw__KRQ_VLoopAd.top = this.ryw__KRQ_VLoopAd.top + 75;
            }
        }
        onStart() {
            this.ryw__krqVLoopAd.ryw_AdPosID = ryw_ShareAd.ryw_MoreGameLocationID;
            super.onStart();
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__continueBtn.on(Laya.Event.CLICK, this, this.ryw_onContinueBtn);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__continueBtn.off(Laya.Event.CLICK, this, this.ryw_onContinueBtn);
        }
        ShowBanner() {
            let self = this;
            ryw_WXADMgr.ryw_getBanner((banner) => {
                if (null != self._banner) {
                    self._banner.ryw_hide();
                }
                self._banner = banner;
                if (null != self._banner) {
                    self._banner.ryw_show();
                }
                else {
                    this._isCanClose = true;
                }
                if (this.isShowHistoryBtn) {
                    self.ryw_HistoryBtn.visible = true;
                }
            });
        }
        onDestroy() {
            if (null != this._banner) {
                this._banner.ryw_hide();
            }
            this._banner = null;
        }
        ryw_onContinueBtn() {
            let self = this;
            if (this._waitBanner) {
                Laya.timer.once(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_continueBannerShowTime * 1000, self, () => {
                    self.ShowBanner();
                    Laya.timer.once(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_continueBannerHideTime * 1000, self, () => {
                        self._isCanClose = true;
                        if (null != self._banner) {
                            self._banner.ryw_hide();
                        }
                        self._banner = null;
                    });
                });
                this._waitBanner = false;
                return;
            }
            if (!this._isCanClose)
                return;
            let excute = () => {
                let openGameView = () => {
                    ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.GameView, null, (v) => {
                        v.owner.zOrder = 1;
                        self.ryw_closeView();
                    });
                };
                ryw_WXAPI.tryShowWXCrazyClick("下次努力", openGameView, () => {
                    self.ryw_closeView();
                }, () => {
                    openGameView();
                });
            };
            ryw_ViewMgr.ryw_instance.tryShowPopAd((v) => {
                if (null != v) {
                    v.ryw_onCloseEvent = () => {
                        excute();
                    };
                }
                else {
                    excute();
                }
            });
        }
        ryw_sortDatas(datas) {
            if (null == datas || 0 == datas.length)
                return [];
            let dataDic = {};
            let keys = new Array();
            for (let i = 0; i < datas.length; ++i) {
                let data = datas[i];
                if (dataDic[data.appid] == null) {
                    dataDic[data.appid] = new Array();
                    dataDic[data.appid].push(data);
                    keys.push(data.appid);
                }
                else {
                    dataDic[data.appid].push(data);
                }
            }
            for (let i = 0; i < keys.length; ++i) {
                let key = keys[i];
                let randomIndex = Math.floor(Math.random() * keys.length);
                let temp = keys[randomIndex];
                keys[randomIndex] = key;
                keys[i] = temp;
            }
            for (let i = 0; i < keys.length; ++i) {
                let key = keys[i];
                let dataArray = dataDic[key];
                for (let j = 0; j < dataArray.length; ++j) {
                    let data = dataArray[j];
                    let randomIndex = Math.floor(Math.random() * dataArray.length);
                    let temp = dataArray[randomIndex];
                    dataArray[randomIndex] = data;
                    dataArray[j] = temp;
                }
            }
            let res = new Array();
            let ignores = [];
            while (keys.length > 0) {
                let isComplate = true;
                for (let i = 0; i < keys.length; ++i) {
                    let key = keys[i];
                    let isOk = true;
                    for (let j = 0; j < ignores.length; ++j) {
                        let ignore = ignores[j];
                        if (ignore == key) {
                            isOk = false;
                            break;
                        }
                    }
                    if (isOk) {
                        isComplate = false;
                        let data = dataDic[key].shift();
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
                    for (let j = 0; j < keys.length; ++j) {
                        let key = keys[j];
                        let isOk = true;
                        let dataArray = dataDic[key];
                        ignores.splice(0);
                        for (let h = 0; h < dataArray.length; ++h) {
                            let data = dataArray[h];
                            for (let i = 0; i < res.length; ++i) {
                                ignores.push(null == res[i - 2] ? null : res[i - 2].appid);
                                ignores.push(null == res[i - 1] ? null : res[i - 1].appid);
                                ignores.push(null == res[i] ? null : res[i].appid);
                                ignores.push(null == res[i + 1] ? null : res[i + 1].appid);
                                ignores.push(null == res[i + 2] ? null : res[i + 2].appid);
                                for (let k = 0; k < ignores.length; ++k) {
                                    let ignore = ignores[k];
                                    if (null != ignore && ignore == key) {
                                        isOk = false;
                                        break;
                                    }
                                }
                                if (isOk) {
                                    if (null != data) {
                                        let f = res.slice(0, i + 1);
                                        let b = res.slice(i + 1, res.length);
                                        res = f;
                                        res.push(data);
                                        for (let a = 0; a < b.length; ++a) {
                                            res.push(b[a]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
                }
                for (let i = 0; i < keys.length; ++i) {
                    let key = keys[i];
                    let randomIndex = Math.floor(Math.random() * keys.length);
                    let temp = keys[randomIndex];
                    keys[randomIndex] = key;
                    keys[i] = temp;
                }
            }
            return res;
        }
    }

    class ViewAutoScaleByW extends Laya.Script {
        onAwake() {
            var realW = Laya.stage.width;
            var scale = realW / ViewAutoScaleByW.baseWidth;
            var ps = this.owner;
            ps.scale(scale, scale);
        }
    }
    ViewAutoScaleByW.baseWidth = 750;
    ViewAutoScaleByW.baseHeight = 1334;

    class ryw_Exprot3ViewTemplate extends ryw_TemplateViewBase {
        constructor() {
            super(...arguments);
            this._closeBtn = null;
            this._krqVLoopAd = null;
            this._KRQ_VLoopAd = null;
            this._clickTag = false;
            this._clickTimingTag = false;
            this._banner = null;
        }
        onAwake() {
            super.onAwake();
            this._krqVLoopAd = this.ryw_View.getChildByName("KRQ_VLoopAd").getComponent(ryw_KRQ_VLoopAd);
            this._closeBtn = this.ryw_View.getChildByName("CloseBtn");
            this._KRQ_VLoopAd = this.ryw_View.getChildByName("KRQ_VLoopAd");
            if (ryw_Utilit.ryw_isIphoneX()) {
                this._KRQ_VLoopAd.top = this._KRQ_VLoopAd.top + 75;
            }
        }
        onStart() {
            this._krqVLoopAd.ryw_AdPosID = ryw_ShareAd.ryw_MoreGameLocationID;
            super.onStart();
            if (ryw_WudianMgr.ryw_WudianFlag) {
                var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
            }
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this._closeBtn.on(Laya.Event.CLICK, this, this.onCloseBtn);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this._closeBtn.off(Laya.Event.CLICK, this, this.onCloseBtn);
        }
        BannerUp() {
            let self = this;
            ryw_WXADMgr.ryw_getBanner((banner) => {
                if (null != self._banner) {
                    self._banner.ryw_hide();
                }
                self._banner = banner;
                if (null != self._banner) {
                    self._banner.ryw_show();
                }
                if (this.isShowHistoryBtn) {
                    self.ryw_HistoryBtn.visible = true;
                }
            });
        }
        BtnUp() {
            this._clickTag = true;
            this._closeBtn.bottom = 270;
        }
        onCloseBtn() {
            if (!this._clickTag && ryw_WudianMgr.ryw_WudianFlag) {
                var self = this;
                if (!this._clickTimingTag) {
                    this._clickTimingTag = true;
                    var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                    var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                    Laya.timer.once(bannerMoveTimer * 1000, this, this.BannerUp);
                    Laya.timer.once(btnMoveTimer * 1000, this, this.BtnUp);
                }
                return;
            }
            this.ryw_closeView();
        }
        onDestroy() {
            if (null != this._banner) {
                this._banner.ryw_hide();
            }
            this._banner = null;
        }
        onHistoryBtn() {
            let self = this;
            ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.ryw_MiniGameView, null, (v) => {
                self.ryw_hide();
                if (null != self._banner) {
                    self._banner.ryw_hide();
                }
                v.ryw_onCloseEvent = () => {
                    if (null != self.ryw_View && !self.ryw_View.destroyed) {
                        self.ryw_show();
                        if (null != self._banner) {
                            self._banner.ryw_show();
                        }
                    }
                };
            });
        }
    }

    class ryw_ExportViewTemplate extends ryw_TemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__continueBtn = null;
            this.ryw__krqVLoopAd = null;
        }
        onAwake() {
            super.onAwake();
            this.ryw__krqVLoopAd = this.ryw_View.getChildByName("KRQ_VLoopAd").getComponent(ryw_KRQ_VLoopAd);
            this.ryw__krqVLoopAd.ryw_useMovePause = false;
            this.ryw__continueBtn = this.ryw__krqVLoopAd.ryw_Sprite.getChildByName("ContinueBtn");
            this.ryw__continueBtn.visible = false;
            let self = this;
            Laya.timer.once(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_continueBtnDelayTime * 1000, this, () => {
                self.ryw__continueBtn.visible = true;
            });
        }
        onStart() {
            super.onStart();
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__continueBtn.on(Laya.Event.CLICK, this, this.ryw_onContinueBtn);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__continueBtn.off(Laya.Event.CLICK, this, this.ryw_onContinueBtn);
        }
        ryw_onContinueBtn() {
        }
    }

    class ryw_GameFailViewTemplate extends ryw_TemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__backBtn = null;
            this.ryw__continueBtn = null;
            this.ryw__clickTag = false;
            this.ryw__clickTimingTag = false;
        }
        onAwake() {
            super.onAwake();
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            this.ryw__backBtn = this.ryw__centerZone.getChildByName("BackBtn");
            this.ryw__continueBtn = this.ryw__centerZone.getChildByName("ContinueBtn");
        }
        onStart() {
            super.onStart();
        }
        onEnable() {
            super.onEnable();
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.InsertVideoEnd, this, this.onInsertVideoEnd);
        }
        onInsertVideoEnd() {
            var self = this;
            ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.GameView, null, (v) => {
                v.owner.zOrder = 1;
                self.ryw_closeView();
            });
            ryw_SoundMgr.ryw_instance.ryw_playBGM("bg");
            NativeCallback.CallNativeFunc("loadNextAd");
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__backBtn.on(Laya.Event.CLICK, this, this.ryw_onBackBtn);
            this.ryw__continueBtn.on(Laya.Event.CLICK, this, this.ryw_onContinueBtn);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__backBtn.off(Laya.Event.CLICK, this, this.ryw_onBackBtn);
            this.ryw__continueBtn.off(Laya.Event.CLICK, this, this.ryw_onContinueBtn);
        }
        ryw_onBackBtn() {
        }
        ryw_onContinueBtn() {
            var randNum = Math.random();
            console.log("随机数值 ===========" + randNum);
            if ((Laya.Browser.onAndroid || Laya.Browser.onIOS) && randNum > 0.6) {
                NativeCallback.CallNativeFunc("showInsertVideo");
                NativeCallback.NowVideoType = "insertAd";
                ryw_SoundMgr.ryw_instance.ryw_stopBGM();
            }
            else {
                var self = this;
                ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.GameView, null, (v) => {
                    v.owner.zOrder = 1;
                    self.ryw_closeView();
                });
            }
        }
        ryw_BannerUp() {
        }
        ryw_BtnUp() {
            this.ryw__clickTag = true;
            this.ryw__backBtn.y = 720;
            this.ryw__continueBtn.y = 720;
        }
        onDestroy() {
        }
        ryw_onHistoryBtn() {
        }
    }

    class ryw_GameWinViewTemplate extends ryw_TemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__backBtn = null;
            this.ryw__nextBtn = null;
            this.ryw__clickTag = false;
            this.ryw__clickTimingTag = false;
            this.ryw__banner = null;
        }
        onAwake() {
            super.onAwake();
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            if (ryw_Utilit.ryw_isIphoneX()) {
                this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
            }
            this.ryw__backBtn = this.ryw__centerZone.getChildByName("BackBtn");
            this.ryw__nextBtn = this.ryw__centerZone.getChildByName("NextBtn");
        }
        onStart() {
            super.onStart();
        }
        onEnable() {
            super.onEnable();
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.InsertVideoEnd, this, this.onInsertVideoEnd);
        }
        onInsertVideoEnd() {
            var self = this;
            ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.GameView, null, (v) => {
                v.owner.zOrder = 1;
                self.ryw_closeView();
            });
            ryw_SoundMgr.ryw_instance.ryw_playBGM("bg");
            NativeCallback.CallNativeFunc("loadNextAd");
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__backBtn.on(Laya.Event.CLICK, this, this.ryw_onBackBtn);
            this.ryw__nextBtn.on(Laya.Event.CLICK, this, this.ryw_onNextBtn);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__backBtn.off(Laya.Event.CLICK, this, this.ryw_onBackBtn);
            this.ryw__nextBtn.off(Laya.Event.CLICK, this, this.ryw_onNextBtn);
        }
        ryw_onBackBtn() {
        }
        ryw_onNextBtn() {
            var randNum = Math.random();
            console.log("随机数值 ===========" + randNum);
            if ((Laya.Browser.onAndroid || Laya.Browser.onIOS) && randNum > 0.6) {
                NativeCallback.CallNativeFunc("showInsertVideo");
                NativeCallback.NowVideoType = "insertAd";
                ryw_SoundMgr.ryw_instance.ryw_stopBGM();
            }
            else {
                var self = this;
                ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.GameView, null, (v) => {
                    v.owner.zOrder = 1;
                    self.ryw_closeView();
                });
            }
        }
        ryw_BannerUp() {
        }
        ryw_BtnUp() {
            this.ryw__clickTag = true;
            this.ryw__backBtn.y = 720;
            this.ryw__nextBtn.y = 720;
        }
        onDestroy() {
        }
        ryw_onHistoryBtn() {
        }
    }

    var ryw_InGameShowType;
    (function (ryw_InGameShowType) {
        ryw_InGameShowType[ryw_InGameShowType["Normal"] = 0] = "Normal";
        ryw_InGameShowType[ryw_InGameShowType["NoLoopAd"] = 1] = "NoLoopAd";
        ryw_InGameShowType[ryw_InGameShowType["NoBannerAd"] = 2] = "NoBannerAd";
    })(ryw_InGameShowType || (ryw_InGameShowType = {}));
    class ryw_InGameViewTemplate extends ryw_TemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
        }
        onAwake() {
            super.onAwake();
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
            else {
                this.ryw__centerZone.top = this.ryw__centerZone.top - 200;
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
        }
        ryw_openView(data) {
            super.ryw_openView(data);
        }
        onStart() {
            super.onStart();
        }
        ryw_addEvent() {
            super.ryw_addEvent();
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
        }
    }

    class ryw_MainViewTemplate extends ryw_TemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__krqMain = null;
            this.ryw__centerZone = null;
            this.ryw__startBtn = null;
            this.ryw__levelNum = null;
            this.ryw__moneyNum = null;
        }
        onAwake() {
            super.onAwake();
            this.ryw__krqMain = this.ryw_View.getChildByName("KRQ_Main").getComponent(ryw_KRQ_Main);
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
            else {
                this.ryw__centerZone.top = this.ryw__centerZone.top - 200;
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
            this.ryw__startBtn = this.ryw__centerZone.getChildByName("StartBtn");
            this.ryw__levelNum = this.ryw__centerZone.getChildByName("LevelInfo").getChildByName("LevelNum");
            this.ryw__moneyNum = this.ryw__centerZone.getChildByName("MoneyInfo").getChildByName("MoneyNum");
        }
        onStart() {
            super.onStart();
            this.ryw__moneyNum.value = String(ryw_User.ryw_getMoney());
            this.ryw__levelNum.value = String(ryw_User.ryw_getLeveNum());
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__startBtn.on(Laya.Event.CLICK, this, this.ryw_onStartBtn);
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.ryw_Game_OnUserMoneyChange, this, this.ryw_onUserMoneyChange);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__startBtn.off(Laya.Event.CLICK, this, this.ryw_onStartBtn);
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.ryw_Game_OnUserMoneyChange, this, this.ryw_onUserMoneyChange);
        }
        ryw_onStartBtn() {
        }
        ryw_onUserMoneyChange(para) {
            let curr = para.curr;
            let last = para.last;
            this.ryw__moneyNum.value = String(curr);
        }
    }

    class ryw_MiniGameViewTemplate extends ryw_ViewBase {
        constructor() {
            super(...arguments);
            this.ryw__krqhistory = null;
        }
        onAwake() {
            super.onAwake();
            this.ryw__krqhistory = this.ryw_View.getChildByName("KRQ_History").getComponent(ryw_KRQ_History);
            let self = this;
            this.ryw__krqhistory.ryw_OnBackBtnClick = () => {
                self.ryw_closeView();
            };
        }
        onStart() {
            super.onStart();
        }
        ryw_addEvent() {
            super.ryw_addEvent();
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
        }
    }

    class ryw_OPPONativeAdViewTemplate extends ryw_ViewBase {
        constructor() {
            super(...arguments);
            this.ryw__nativeAd = null;
            this.ryw__curAdItem = null;
        }
        onAwake() {
            this.ryw__centerZone = this.owner.getChildByName("CenterZone");
            this.ryw__display = this.ryw__centerZone.getChildByName("Display");
            this.ryw__okBtn = this.ryw__centerZone.getChildByName("OkBtn");
            this.ryw__closeBtn = this.ryw__centerZone.getChildByName("CloseBtn");
            this.ryw__bg = this.owner.getChildByName("BG");
        }
        onEnable() {
            super.onEnable();
            this.ryw_loadAd();
            this.ryw__bg.height = Laya.stage.height;
            this.ryw__closeBtn.visible = false;
            Laya.timer.once(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_oppocfg.ryw_btnShowTimer, this, () => {
                this.ryw__closeBtn.visible = true;
            });
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__okBtn.on(Laya.Event.CLICK, this, this.ryw_onOkBtn);
            this.ryw__closeBtn.on(Laya.Event.CLICK, this, this.ryw_onCloseBtn);
            this.ryw__display.on(Laya.Event.CLICK, this, this.ryw_onDisplayClick);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__okBtn.off(Laya.Event.CLICK, this, this.ryw_onOkBtn);
            this.ryw__closeBtn.off(Laya.Event.CLICK, this, this.ryw_onCloseBtn);
            this.ryw__display.off(Laya.Event.CLICK, this, this.ryw_onDisplayClick);
        }
        ryw_loadAd() {
            var self = this;
            let ipBlocked = ryw_WudianMgr.ryw_GetIpBlocked();
            if (!ipBlocked) {
                self.ryw_closeView();
                return;
            }
            if (Laya.Browser.onQGMiniGame) {
                if (this.ryw__nativeAd) {
                    this.ryw__nativeAd.destroy();
                    this.ryw__nativeAd = null;
                }
                this.ryw__curAdItem = null;
                this.ryw__nativeAd = qg.createNativeAd({
                    posId: ryw_OPPOAPI.ryw_NativeAdId
                });
                this.ryw__nativeAd.load();
                this.ryw__nativeAd.onLoad((res) => {
                    console.log("原生广告加载成功：", res);
                    var adlist = res.adList;
                    for (var i = 0; i < adlist.length; ++i) {
                        var ad = adlist[i];
                        console.log("原生广告数据：", i);
                        for (var key in ad) {
                            console.log(key, ad[key]);
                        }
                    }
                    self.ryw__curAdItem = adlist[Math.floor(Math.random() * adlist.length)];
                    if (null != self.ryw__curAdItem) {
                        for (var i = 0; i < self.ryw__curAdItem.imgUrlList.length; ++i) {
                            console.log("imgUrlList : ", i + " ", self.ryw__curAdItem.imgUrlList[i]);
                        }
                        var imgulr = self.ryw__curAdItem.imgUrlList[Math.floor(Math.random() * self.ryw__curAdItem.imgUrlList.length)];
                        self.ryw__display.loadImage(imgulr);
                        self.ryw__nativeAd.reportAdShow({
                            adId: self.ryw__curAdItem.adId
                        });
                        console.log("加载图片", imgulr);
                        console.log("点击上报！！！");
                    }
                    self.ryw__centerZone.visible = true;
                });
                this.ryw__nativeAd.onError((res) => {
                    console.log("原生广告加载失败：", res);
                    for (var key in res) {
                        console.log(key, res[key]);
                    }
                    self.ryw_closeView();
                });
                this.ryw__centerZone.visible = false;
            }
        }
        ryw_onCloseBtn() {
            this.ryw_closeView();
        }
        ryw_onOkBtn() {
            if (Math.random() * 100 <= ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_oppocfg.ryw_yuansheng) {
                console.log("进入变态广告");
                this.ryw_onDisplayClick();
            }
            this.ryw_closeView();
        }
        ryw_onDisplayClick() {
            if (null != this.ryw__nativeAd && null != this.ryw__curAdItem) {
                console.log("点击上报！！！");
                this.ryw__nativeAd.reportAdClick({
                    adId: this.ryw__curAdItem.adId
                });
            }
        }
        onDestroy() {
            super.onDestroy();
            if (Laya.Browser.onQGMiniGame) {
                if (this.ryw__nativeAd) {
                    this.ryw__nativeAd.destroy();
                }
                this.ryw__nativeAd = null;
                this.ryw__curAdItem = null;
            }
        }
    }

    class ryw_QQCrazyClick extends ryw_ViewBase {
        constructor() {
            super(...arguments);
            this.ryw__clickBar = null;
            this.ryw__totalClickTimer = 15;
            this.ryw__needClickTime = 10;
            this.ryw__bannerClickTime = Math.floor(Math.random() * 5) + 2;
        }
        onAwake() {
            this.ryw__click_Btn = this.owner.getChildByName("Click_Btn");
            this.ryw__click_Btn.on(Laya.Event.CLICK, this, this.ryw_ButtonClicked);
            this.ryw__arrow_Img = this.ryw__click_Btn.getChildByName("Arrow_Img");
            this.ryw__getPrize_View = this.owner.getChildByName("GetPrize_View");
            this.ryw__prizeCount_Text = this.ryw__getPrize_View.getChildByName("PrizeCount_Text");
            this.ryw__confirm_Btn = this.ryw__getPrize_View.getChildByName("Confirm_Btn");
            this.ryw__getPrize_View.visible = false;
            this.ryw__clickBar = this.owner.getChildByName("ClickBar").getChildByName("ClickBar");
            this.ryw__clickBarOriginalWidth = this.ryw__clickBar.width;
            this.ryw__clickBar.width = 0;
            this.ryw__clickTime = 0;
            this.ryw__totalClickTime = 0;
            let self = this;
            Laya.loader.load("ClickGetPrize/quanji.png", Laya.Handler.create(this, (texture) => {
                Laya.loader.load("ClickGetPrize/quanji.sk", Laya.Handler.create(this, (bytes) => {
                    console.log("texture", texture);
                    console.log("bytes", bytes);
                    let template = new Laya.Templet();
                    template.parseData(texture, bytes);
                    self.ryw_drgon = template.buildArmature();
                    self.owner.addChild(self.ryw_drgon);
                    self.ryw_drgon.x = 375;
                    self.ryw_drgon.y = 610;
                    self.ryw_drgon.scaleX = 2;
                    self.ryw_drgon.scaleY = 2;
                    self.ryw_drgon.parent.setChildIndex(self.ryw_drgon, 1);
                    self.ryw_drgon.play(0, true);
                    console.log("quanji 加载完成!!!!", template);
                }), Laya.Handler.create(this, () => { }), "", 0, false, "", true);
            }), Laya.Handler.create(this, () => { }), "", 0, false, "", true);
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            Laya.stage.on(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            Laya.stage.off(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
        }
        onUpdate() {
            if (this.ryw__arrowUp) {
                this.ryw__arrow_Img.top += Laya.timer.delta / 5;
                if (this.ryw__arrow_Img.top > -140) {
                    this.ryw__arrowUp = false;
                }
            }
            else {
                this.ryw__arrow_Img.top -= Laya.timer.delta / 5;
                if (this.ryw__arrow_Img.top < -180) {
                    this.ryw__arrowUp = true;
                }
            }
            if (!this.ryw__bannerClicked) {
                let spd = 2 + (this.ryw__clickBar.width / this.ryw__clickBarOriginalWidth) * 4;
                if (this.ryw__clickBar.width >= spd) {
                    this.ryw__clickBar.width -= spd;
                }
                if ((this.ryw__clickBar.width / this.ryw__clickBarOriginalWidth) + 0.1 < (this.ryw__clickTime / this.ryw__needClickTime)) {
                    this.ryw__clickTime--;
                }
            }
        }
        ryw_openView(data) {
            this.ryw__compeletFunction = data.Complete;
            this.ryw__prizeCount = data.PrizeCount;
            super.ryw_openView(data);
        }
        ryw_OpenPrizeWindow() {
            let self = this;
            this.ryw__prizeCount_Text.text = this.ryw__prizeCount.toString();
            this.ryw__getPrize_View.visible = true;
            this.ryw__confirm_Btn.once(Laya.Event.CLICK, this, function () {
                ryw_CachedQQBannerAd.hide();
                if (self.ryw__compeletFunction) {
                    self.ryw__compeletFunction();
                }
                self.ryw_closeView();
            });
        }
        ryw_ShowBanner() {
            if (ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_kuangdianBanner == 1
                && ryw_AppConfig.ryw_Versions == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_qqversions) {
                ryw_CachedQQBannerAd.show();
            }
        }
        ryw_ButtonClicked() {
            this.ryw__clickTime++;
            this.ryw__totalClickTime++;
            if (null != this.ryw_drgon) {
                this.ryw_drgon.play(1, false);
                this.ryw_drgon.once(Laya.Event.STOPPED, this, () => {
                    this.ryw_drgon.play(0, true);
                });
            }
            if (this.ryw__clickTime > this.ryw__needClickTime) {
                this.ryw__clickTime = this.ryw__needClickTime;
            }
            if (this.ryw__clickTime >= this.ryw__bannerClickTime) {
                if (this.ryw__clickTime >= this.ryw__needClickTime) {
                    this.ryw__clickTime = this.ryw__needClickTime - 1;
                }
                if (this.ryw__bannerClicked) {
                    return;
                }
                this.ryw__bannerClicked = true;
                this.ryw_ShowBanner();
                Laya.timer.once(2000, this, function () {
                    this.ryw_BannerClicked();
                });
            }
            else if (this.ryw__totalClickTime > this.ryw__totalClickTimer) {
                this.ryw_ShowBanner();
                this.ryw_BannerClicked();
            }
            let progress = (this.ryw__clickTime / this.ryw__needClickTime) * this.ryw__clickBarOriginalWidth;
            this.ryw__clickBar.width = progress;
        }
        ryw_BannerClicked() {
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_WudianBanner_Hide);
            this.ryw__bannerClicked = true;
            this.ryw__clickTime = this.ryw__needClickTime;
            this.ryw__clickBar.width = this.ryw__clickBarOriginalWidth;
            this.ryw__click_Btn.visible = false;
            this.ryw_OpenPrizeWindow();
        }
        onDestroy() {
            if (ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_kuangdianBanner == 1
                && ryw_AppConfig.ryw_Versions == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_qqversions) {
                ryw_CachedQQBannerAd.hide();
            }
        }
        onFocusChange() {
            if (null != this.ryw_drgon) {
                this.ryw_drgon.play(0, true);
            }
        }
    }

    class ryw_QQCrazyClick2 extends ryw_ViewBase {
        constructor() {
            super(...arguments);
            this.ryw__clickBar = null;
            this.ryw__totalClickTimer = 15;
            this.ryw__needClickTime = 10;
            this.ryw__bannerClickTime = Math.floor(Math.random() * 5) + 2;
            this.ryw__clickBtn = null;
        }
        onAwake() {
            this.ryw__getPrize_View = this.owner.getChildByName("GetPrize_View");
            this.ryw__prizeCount_Text = this.ryw__getPrize_View.getChildByName("PrizeCount_Text");
            this.ryw__confirm_Btn = this.ryw__getPrize_View.getChildByName("Confirm_Btn");
            this.ryw__getPrize_View.visible = false;
            this.ryw__clickBar = this.owner.getChildByName("ClickBar").getChildByName("ClickBar");
            this.ryw__clickBarOriginalWidth = this.ryw__clickBar.width;
            this.ryw__clickBar.width = 0;
            this.ryw__clickTime = 0;
            this.ryw__totalClickTime = 0;
            let self = this;
            Laya.loader.load("ClickGetPrize/quanji.png", Laya.Handler.create(self, (texture) => {
                Laya.loader.load("ClickGetPrize/quanji.sk", Laya.Handler.create(self, (bytes) => {
                    let template = new Laya.Templet();
                    template.parseData(texture, bytes);
                    self.ryw_drgon = template.buildArmature();
                    self.owner.addChild(self.ryw_drgon);
                    self.ryw_drgon.x = 375;
                    self.ryw_drgon.y = 610;
                    self.ryw_drgon.scaleX = 2;
                    self.ryw_drgon.scaleY = 2;
                    self.ryw_drgon.parent.setChildIndex(self.ryw_drgon, 1);
                    self.ryw_drgon.play(0, true);
                    console.log("quanji 加载完成!!!!", template);
                }), Laya.Handler.create(self, () => { }), "", 0, false, "", true);
            }), Laya.Handler.create(self, () => { }), "", 0, false, "", true);
            Laya.loader.load("ClickGetPrize/NewProject.png", Laya.Handler.create(self, (texture) => {
                Laya.loader.load("ClickGetPrize/NewProject.sk", Laya.Handler.create(self, (bytes) => {
                    let template = new Laya.Templet();
                    template.parseData(texture, bytes);
                    let finger = template.buildArmature();
                    self.owner.addChild(finger);
                    finger.x = 360;
                    finger.y = 617;
                    finger.parent.setChildIndex(finger, 2);
                    finger.play(0, true);
                    self.ryw__clickBtn = new Laya.Clip();
                    self.owner.addChild(self.ryw__clickBtn);
                    self.ryw__clickBtn.x = 360 - 100,
                        self.ryw__clickBtn.y = 617 - 100,
                        self.ryw__clickBtn.width = 200,
                        self.ryw__clickBtn.height = 200,
                        self.ryw__clickBtn.parent.setChildIndex(self.ryw__clickBtn, 3);
                    self.ryw__clickBtn.on(Laya.Event.CLICK, self, self.ButtonClicked);
                    console.log("手指动画 加载完成!!!!", template);
                }), Laya.Handler.create(self, () => { }), "", 0, false, "", true);
            }), Laya.Handler.create(self, () => { }), "", 0, false, "", true);
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            Laya.stage.on(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            Laya.stage.off(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
        }
        onUpdate() {
            if (!this.ryw__bannerClicked) {
                let spd = 2 + (this.ryw__clickBar.width / this.ryw__clickBarOriginalWidth) * 4;
                if (this.ryw__clickBar.width >= spd) {
                    this.ryw__clickBar.width -= spd;
                }
                if ((this.ryw__clickBar.width / this.ryw__clickBarOriginalWidth) + 0.1 < (this.ryw__clickTime / this.ryw__needClickTime)) {
                    this.ryw__clickTime--;
                }
            }
        }
        ryw_openView(data) {
            this.ryw__compeletFunction = data.Complete;
            this.ryw__prizeCount = data.PrizeCount;
            super.ryw_openView(data);
        }
        ryw_OpenPrizeWindow() {
            let self = this;
            this.ryw__prizeCount_Text.text = this.ryw__prizeCount.toString();
            this.ryw__getPrize_View.visible = true;
            this.ryw__confirm_Btn.once(Laya.Event.CLICK, this, function () {
                if (self.ryw__compeletFunction) {
                    self.ryw__compeletFunction();
                }
                self.ryw_closeView();
            });
        }
        ryw_ShowBanner() {
            if (ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_kuangdianBox == 1
                && ryw_AppConfig.ryw_Versions == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_qqversions) {
                ryw_QQMiniGameAPI.ryw_showAppBoxAd(() => {
                });
            }
        }
        ButtonClicked() {
            this.ryw__clickTime++;
            this.ryw__totalClickTime++;
            if (null != this.ryw_drgon) {
                this.ryw_drgon.play(1, false);
                this.ryw_drgon.once(Laya.Event.STOPPED, this, () => {
                    this.ryw_drgon.play(0, true);
                });
            }
            if (this.ryw__clickTime > this.ryw__needClickTime) {
                this.ryw__clickTime = this.ryw__needClickTime;
            }
            if (this.ryw__clickTime >= this.ryw__bannerClickTime) {
                if (this.ryw__clickTime >= this.ryw__needClickTime) {
                    this.ryw__clickTime = this.ryw__needClickTime - 1;
                }
                if (this.ryw__bannerClicked) {
                    return;
                }
                this.ryw__bannerClicked = true;
                this.ryw_ShowBanner();
                Laya.timer.once(2000, this, function () {
                    this.ryw_BannerClicked();
                });
            }
            else if (this.ryw__totalClickTime > this.ryw__totalClickTimer) {
                this.ryw_ShowBanner();
                this.ryw_BannerClicked();
            }
            let progress = (this.ryw__clickTime / this.ryw__needClickTime) * this.ryw__clickBarOriginalWidth;
            this.ryw__clickBar.width = progress;
        }
        ryw_BannerClicked() {
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_WudianBanner_Hide);
            this.ryw__bannerClicked = true;
            this.ryw__clickTime = this.ryw__needClickTime;
            this.ryw__clickBar.width = this.ryw__clickBarOriginalWidth;
            this.ryw__clickBtn.visible = false;
            this.ryw_OpenPrizeWindow();
        }
        onDestroy() {
        }
        onFocusChange() {
            if (null != this.ryw_drgon) {
                this.ryw_drgon.play(0, true);
            }
        }
    }

    class ryw_QQTemplateViewBase extends ryw_ViewBase {
        onAwake() {
        }
        ryw_addEvent() {
            super.ryw_addEvent();
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
        }
    }

    class ryw_QQGameFailViewTemplate extends ryw_QQTemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__backBtn = null;
            this.ryw__continueBtn = null;
            this.ryw__clickTag = false;
            this.ryw__clickTimingTag = false;
        }
        onAwake() {
            super.onAwake();
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            if (ryw_Utilit.ryw_isIphoneX()) {
                this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
            }
            this.ryw__backBtn = this.ryw__centerZone.getChildByName("BackBtn");
            this.ryw__continueBtn = this.ryw__centerZone.getChildByName("ContinueBtn");
        }
        onStart() {
            super.onStart();
            let self = this;
            if (ryw_WudianMgr.ryw_WudianFlag && ryw_AppConfig.ryw_Versions == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_qqversions) {
                if (1 == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_weiyi) {
                    let yPos = this.ryw__centerZone.height - 150;
                    this.ryw__backBtn.y = yPos;
                    this.ryw__continueBtn.y = yPos;
                }
                let excute = function () {
                    self.ryw__clickTimingTag = true;
                    var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                    var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                    Laya.timer.once(bannerMoveTimer * 1000, self, self.ryw_BannerUp);
                    Laya.timer.once(btnMoveTimer * 1000, self, self.ryw_BtnUp);
                };
                if (1 == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_box) {
                    ryw_QQMiniGameAPI.ryw_showAppBoxAd(() => {
                        excute();
                    }, () => {
                        excute();
                    });
                }
                else {
                    excute();
                }
            }
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__backBtn.on(Laya.Event.CLICK, this, this.ryw_onBackBtn);
            this.ryw__continueBtn.on(Laya.Event.CLICK, this, this.ryw_onContinueBtn);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__backBtn.off(Laya.Event.CLICK, this, this.ryw_onBackBtn);
            this.ryw__continueBtn.off(Laya.Event.CLICK, this, this.ryw_onContinueBtn);
        }
        ryw_onBackBtn() {
            if (!this.ryw__clickTag && ryw_WudianMgr.ryw_WudianFlag) {
                var self = this;
                if (!this.ryw__clickTimingTag) {
                    this.ryw__clickTimingTag = true;
                    var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                    var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                    Laya.timer.once(bannerMoveTimer * 1000, this, this.ryw_BannerUp);
                    Laya.timer.once(btnMoveTimer * 1000, this, this.ryw_BtnUp);
                }
                return;
            }
        }
        ryw_onContinueBtn() {
            if (!this.ryw__clickTag && ryw_WudianMgr.ryw_WudianFlag) {
                var self = this;
                if (!this.ryw__clickTimingTag) {
                    this.ryw__clickTimingTag = true;
                    var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                    var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                    Laya.timer.once(bannerMoveTimer * 1000, this, this.ryw_BannerUp);
                    Laya.timer.once(btnMoveTimer * 1000, this, this.ryw_BtnUp);
                }
                return;
            }
        }
        ryw_BannerUp() {
        }
        ryw_BtnUp() {
            this.ryw__clickTag = true;
            this.ryw__backBtn.y = 720;
            this.ryw__continueBtn.y = 720;
        }
        onDestroy() {
        }
    }

    class ryw_QQGameWinViewTemplate extends ryw_QQTemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__backBtn = null;
            this.ryw__nextBtn = null;
            this.ryw__clickTag = false;
            this.ryw__clickTimingTag = false;
        }
        onAwake() {
            super.onAwake();
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            if (ryw_Utilit.ryw_isIphoneX()) {
                this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
            }
            this.ryw__backBtn = this.ryw__centerZone.getChildByName("BackBtn");
            this.ryw__nextBtn = this.ryw__centerZone.getChildByName("NextBtn");
        }
        onStart() {
            super.onStart();
            let self = this;
            if (ryw_WudianMgr.ryw_WudianFlag && ryw_AppConfig.ryw_Versions == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_qqversions) {
                if (1 == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_weiyi) {
                    let yPos = this.ryw__centerZone.height - 150;
                    this.ryw__backBtn.y = yPos;
                    this.ryw__nextBtn.y = yPos;
                }
                let excute = function () {
                    self.ryw__clickTimingTag = true;
                    var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                    var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                    Laya.timer.once(bannerMoveTimer * 1000, self, self.ryw_BannerUp);
                    Laya.timer.once(btnMoveTimer * 1000, self, self.ryw_BtnUp);
                };
                if (ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_qqcfg.ryw_box == 1) {
                    ryw_QQMiniGameAPI.ryw_showAppBoxAd(() => {
                        excute();
                    }, () => {
                        excute();
                    });
                }
                else {
                    excute();
                }
            }
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__backBtn.on(Laya.Event.CLICK, this, this.ryw_onBackBtn);
            this.ryw__nextBtn.on(Laya.Event.CLICK, this, this.ryw_onNextBtn);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__backBtn.off(Laya.Event.CLICK, this, this.ryw_onBackBtn);
            this.ryw__nextBtn.off(Laya.Event.CLICK, this, this.ryw_onNextBtn);
        }
        ryw_onBackBtn() {
            if (!this.ryw__clickTag && ryw_WudianMgr.ryw_WudianFlag) {
                var self = this;
                if (!this.ryw__clickTimingTag) {
                    this.ryw__clickTimingTag = true;
                    var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                    var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                    Laya.timer.once(bannerMoveTimer * 1000, this, this.ryw_BannerUp);
                    Laya.timer.once(btnMoveTimer * 1000, this, this.ryw_BtnUp);
                }
                return;
            }
        }
        ryw_onNextBtn() {
            if (!this.ryw__clickTag && ryw_WudianMgr.ryw_WudianFlag) {
                var self = this;
                if (!this.ryw__clickTimingTag) {
                    this.ryw__clickTimingTag = true;
                    var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                    var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                    Laya.timer.once(bannerMoveTimer * 1000, this, this.ryw_BannerUp);
                    Laya.timer.once(btnMoveTimer * 1000, this, this.ryw_BtnUp);
                }
                return;
            }
        }
        ryw_BannerUp() {
        }
        ryw_BtnUp() {
            this.ryw__clickTag = true;
            this.ryw__backBtn.y = 720;
            this.ryw__nextBtn.y = 720;
        }
        onDestroy() {
        }
    }

    class ryw_QQInGameViewTemplate extends ryw_QQTemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
        }
        onAwake() {
            super.onAwake();
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
            else {
                this.ryw__centerZone.top = this.ryw__centerZone.top - 200;
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
        }
        onStart() {
            super.onStart();
        }
        ryw_addEvent() {
            super.ryw_addEvent();
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
        }
    }

    class ryw_QQMainViewTemplate extends ryw_QQTemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__startBtn = null;
            this.ryw__levelNum = null;
            this.ryw__moneyNum = null;
            this.ryw__moreGameBtn = null;
        }
        onAwake() {
            super.onAwake();
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            this.ryw__moreGameBtn = this.ryw__centerZone.getChildByName("MoreGameBtn");
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
            else {
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
            this.ryw__startBtn = this.ryw__centerZone.getChildByName("StartBtn");
            this.ryw__levelNum = this.ryw__centerZone.getChildByName("LevelInfo").getChildByName("LevelNum");
            this.ryw__moneyNum = this.ryw__centerZone.getChildByName("MoneyInfo").getChildByName("MoneyNum");
        }
        onStart() {
            super.onStart();
            this.ryw__moneyNum.value = String(ryw_User.ryw_getMoney());
            this.ryw__levelNum.value = String(ryw_User.ryw_getLeveNum());
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__startBtn.on(Laya.Event.CLICK, this, this.ryw_onStartBtn);
            this.ryw__moreGameBtn.on(Laya.Event.CLICK, this, this.ryw_onMoreGameBtn);
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.ryw_Game_OnUserMoneyChange, this, this.ryw_onUserMoneyChange);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__startBtn.off(Laya.Event.CLICK, this, this.ryw_onStartBtn);
            this.ryw__moreGameBtn.off(Laya.Event.CLICK, this, this.ryw_onMoreGameBtn);
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.ryw_Game_OnUserMoneyChange, this, this.ryw_onUserMoneyChange);
        }
        ryw_onStartBtn() {
        }
        ryw_onMoreGameBtn() {
            ryw_QQMiniGameAPI.ryw_showAppBoxAd(() => {
            });
        }
        ryw_onUserMoneyChange(para) {
            let curr = para.curr;
            let last = para.last;
            this.ryw__moneyNum.value = String(curr);
        }
    }

    class ryw_RewardViewTemplate extends ryw_TemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__rewardBtn = null;
            this.ryw__skipBtn = null;
        }
        onAwake() {
            super.onAwake();
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            this.ryw__rewardBtn = this.ryw__centerZone.getChildByName("RewradBtn");
            this.ryw__skipBtn = this.ryw__centerZone.getChildByName("SkipBtn");
        }
        onStart() {
            super.onStart();
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__rewardBtn.on(Laya.Event.CLICK, this, this.ryw_onRewardBtn);
            this.ryw__skipBtn.on(Laya.Event.CLICK, this, this.ryw_onSkipBtn);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__rewardBtn.off(Laya.Event.CLICK, this, this.ryw_onRewardBtn);
            this.ryw__skipBtn.off(Laya.Event.CLICK, this, this.ryw_onSkipBtn);
        }
        ryw_onRewardBtn() {
        }
        ryw_onSkipBtn() {
        }
    }

    class ryw_TTCrazyClick extends ryw_ViewBase {
        constructor() {
            super(...arguments);
            this.ryw__clickBar = null;
            this.ryw__totalClickTimer = 15;
            this.ryw__needClickTime = 10;
            this.ryw__bannerClickTime = Math.floor(Math.random() * 5) + 2;
        }
        onAwake() {
            this.ryw__click_Btn = this.owner.getChildByName("Click_Btn");
            this.ryw__click_Btn.on(Laya.Event.CLICK, this, this.ryw_ButtonClicked);
            this.ryw__arrow_Img = this.ryw__click_Btn.getChildByName("Arrow_Img");
            this.ryw__getPrize_View = this.owner.getChildByName("GetPrize_View");
            this.ryw__prizeCount_Text = this.ryw__getPrize_View.getChildByName("PrizeCount_Text");
            this.ryw__confirm_Btn = this.ryw__getPrize_View.getChildByName("Confirm_Btn");
            this.ryw__getPrize_View.visible = false;
            this.ryw__clickBar = this.owner.getChildByName("ClickBar").getChildByName("ClickBar");
            this.ryw__clickBarOriginalWidth = this.ryw__clickBar.width;
            this.ryw__clickBar.width = 0;
            this.ryw__clickTime = 0;
            this.ryw__totalClickTime = 0;
            let self = this;
            Laya.loader.load("ClickGetPrize/quanji.png", Laya.Handler.create(this, (texture) => {
                Laya.loader.load("ClickGetPrize/quanji.sk", Laya.Handler.create(this, (bytes) => {
                    console.log("texture", texture);
                    console.log("bytes", bytes);
                    let template = new Laya.Templet();
                    template.parseData(texture, bytes);
                    self.ryw_drgon = template.buildArmature();
                    self.owner.addChild(self.ryw_drgon);
                    self.ryw_drgon.x = 375;
                    self.ryw_drgon.y = 610;
                    self.ryw_drgon.scaleX = 2;
                    self.ryw_drgon.scaleY = 2;
                    self.ryw_drgon.parent.setChildIndex(self.ryw_drgon, 1);
                    self.ryw_drgon.play(0, true);
                    console.log("quanji 加载完成!!!!", template);
                }), Laya.Handler.create(this, () => { }), "", 0, false, "", true);
            }), Laya.Handler.create(this, () => { }), "", 0, false, "", true);
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            Laya.stage.on(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            Laya.stage.off(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
        }
        onUpdate() {
            if (this.ryw__arrowUp) {
                this.ryw__arrow_Img.top += Laya.timer.delta / 5;
                if (this.ryw__arrow_Img.top > -140) {
                    this.ryw__arrowUp = false;
                }
            }
            else {
                this.ryw__arrow_Img.top -= Laya.timer.delta / 5;
                if (this.ryw__arrow_Img.top < -180) {
                    this.ryw__arrowUp = true;
                }
            }
            if (!this.ryw__bannerClicked) {
                let spd = 2 + (this.ryw__clickBar.width / this.ryw__clickBarOriginalWidth) * 4;
                if (this.ryw__clickBar.width >= spd) {
                    this.ryw__clickBar.width -= spd;
                }
                if ((this.ryw__clickBar.width / this.ryw__clickBarOriginalWidth) + 0.1 < (this.ryw__clickTime / this.ryw__needClickTime)) {
                    this.ryw__clickTime--;
                }
            }
        }
        ryw_openView(data) {
            this.ryw__compeletFunction = data.Complete;
            this.ryw__prizeCount = data.PrizeCount;
            super.ryw_openView(data);
        }
        ryw_OpenPrizeWindow() {
            let self = this;
            this.ryw__prizeCount_Text.text = this.ryw__prizeCount.toString();
            this.ryw__getPrize_View.visible = true;
            this.ryw__confirm_Btn.once(Laya.Event.CLICK, this, function () {
                ryw_TTAPI.ryw_hideBanner();
                if (self.ryw__compeletFunction) {
                    self.ryw__compeletFunction();
                }
                self.ryw_closeView();
            });
        }
        ryw_ShowBanner() {
            if (ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_ttcfg.ryw_kuangdianBanner == 1) {
                ryw_TTAPI.ryw_showBanner();
            }
        }
        ryw_ButtonClicked() {
            this.ryw__clickTime++;
            this.ryw__totalClickTime++;
            if (null != this.ryw_drgon) {
                this.ryw_drgon.play(1, false);
                this.ryw_drgon.once(Laya.Event.STOPPED, this, () => {
                    this.ryw_drgon.play(0, true);
                });
            }
            if (this.ryw__clickTime > this.ryw__needClickTime) {
                this.ryw__clickTime = this.ryw__needClickTime;
            }
            if (this.ryw__clickTime >= this.ryw__bannerClickTime) {
                if (this.ryw__clickTime >= this.ryw__needClickTime) {
                    this.ryw__clickTime = this.ryw__needClickTime - 1;
                }
                if (this.ryw__bannerClicked) {
                    return;
                }
                this.ryw__bannerClicked = true;
                this.ryw_ShowBanner();
                Laya.timer.once(2000, this, function () {
                    this.ryw_BannerClicked();
                });
            }
            else if (this.ryw__totalClickTime > this.ryw__totalClickTimer) {
                this.ryw_ShowBanner();
                this.ryw_BannerClicked();
            }
            let progress = (this.ryw__clickTime / this.ryw__needClickTime) * this.ryw__clickBarOriginalWidth;
            this.ryw__clickBar.width = progress;
        }
        ryw_BannerClicked() {
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_WudianBanner_Hide);
            this.ryw__bannerClicked = true;
            this.ryw__clickTime = this.ryw__needClickTime;
            this.ryw__clickBar.width = this.ryw__clickBarOriginalWidth;
            this.ryw__click_Btn.visible = false;
            this.ryw_OpenPrizeWindow();
        }
        onDestroy() {
            ryw_TTAPI.ryw_hideBanner();
        }
        onFocusChange() {
            if (null != this.ryw_drgon) {
                this.ryw_drgon.play(0, true);
            }
        }
    }

    class ryw_TTTemplateViewBase extends ryw_ViewBase {
        constructor() {
            super(...arguments);
            this._topZone = null;
        }
        get TopZone() {
            if (null == this._topZone) {
                this._topZone = this.ryw_View.getChildByName("TopZone");
            }
            return this._topZone;
        }
        onAwake() {
            this._topZone = this.ryw_View.getChildByName("TopZone");
            if (null != this._topZone && ryw_Utilit.ryw_isIphoneX()) {
                this._topZone.top = this._topZone.top + 75;
            }
        }
        ryw_addEvent() {
            super.ryw_addEvent();
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
        }
    }

    class ryw_TTGameFailViewTemplate extends ryw_TTTemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__clickTag = false;
            this.ryw__clickTimingTag = false;
            this.ryw__moreGameBtn = null;
            this.ryw__shareBtn = null;
            this.ryw__backBtn = null;
            this.ryw__okBtn = null;
            this.ryw__videoBtn = null;
        }
        onAwake() {
            super.onAwake();
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            if (ryw_Utilit.ryw_isIphoneX()) {
                this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
            }
            this.ryw__moreGameBtn = this.ryw__centerZone.getChildByName("MoreGameBtn");
            this.ryw__shareBtn = this.ryw__centerZone.getChildByName("ShareBtn");
            this.ryw__backBtn = this.ryw__centerZone.getChildByName("BackBtn");
            this.ryw__okBtn = this.ryw__centerZone.getChildByName("OkBtn");
            this.ryw__videoBtn = this.ryw__centerZone.getChildByName("VideoBtn");
            this.ryw__moreGameBtn.visible = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_ttcfg.ryw_moreGameSwitch == 1;
        }
        onStart() {
            super.onStart();
            if (ryw_WudianMgr.ryw_WudianFlag) {
                let yPos = this.ryw__centerZone.height - 150;
                this.ryw__backBtn.y = yPos;
                this.ryw__okBtn.y = yPos;
                this.ryw__videoBtn.y = yPos;
            }
            var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
            var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
            Laya.timer.once(bannerMoveTimer * 1000, this, this.ryw_BannerUp);
            Laya.timer.once(btnMoveTimer * 1000, this, this.ryw_BtnUp);
            if (ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_ttcfg.ryw_luping == 1) {
                ryw_TTAPI.ryw_shareRecord(() => {
                }, () => {
                });
            }
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__backBtn.on(Laya.Event.CLICK, this, this.ryw_onBackBtn);
            this.ryw__okBtn.on(Laya.Event.CLICK, this, this.ryw_onOkBtn);
            this.ryw__videoBtn.on(Laya.Event.CLICK, this, this.ryw_onOkBtn);
            this.ryw__moreGameBtn.on(Laya.Event.CLICK, this, this.ryw_onMoreGameBtn);
            this.ryw__shareBtn.on(Laya.Event.CLICK, this, this.ryw_onShareBtn);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__backBtn.off(Laya.Event.CLICK, this, this.ryw_onBackBtn);
            this.ryw__okBtn.off(Laya.Event.CLICK, this, this.ryw_onOkBtn);
            this.ryw__videoBtn.off(Laya.Event.CLICK, this, this.ryw_onOkBtn);
            this.ryw__moreGameBtn.off(Laya.Event.CLICK, this, this.ryw_onMoreGameBtn);
            this.ryw__shareBtn.off(Laya.Event.CLICK, this, this.ryw_onShareBtn);
        }
        ryw_onBackBtn() {
            if (!this.ryw__clickTag && ryw_WudianMgr.ryw_WudianFlag) {
                var self = this;
                if (!this.ryw__clickTimingTag) {
                    this.ryw__clickTimingTag = true;
                    var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                    var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                    Laya.timer.once(bannerMoveTimer * 1000, this, this.ryw_BannerUp);
                    Laya.timer.once(btnMoveTimer * 1000, this, this.ryw_BtnUp);
                }
                return;
            }
        }
        ryw_onOkBtn() {
            if (!this.ryw__clickTag && ryw_WudianMgr.ryw_WudianFlag) {
                var self = this;
                if (!this.ryw__clickTimingTag) {
                    this.ryw__clickTimingTag = true;
                    var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                    var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                    Laya.timer.once(bannerMoveTimer * 1000, this, this.ryw_BannerUp);
                    Laya.timer.once(btnMoveTimer * 1000, this, this.ryw_BtnUp);
                }
                return;
            }
        }
        ryw_onVideoBtn() {
            if (!this.ryw__clickTag && ryw_WudianMgr.ryw_WudianFlag) {
                var self = this;
                if (!this.ryw__clickTimingTag) {
                    this.ryw__clickTimingTag = true;
                    var btnMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_btnMoveTimer;
                    var bannerMoveTimer = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerMoveTimer;
                    Laya.timer.once(bannerMoveTimer * 1000, this, this.ryw_BannerUp);
                    Laya.timer.once(btnMoveTimer * 1000, this, this.ryw_BtnUp);
                }
                return;
            }
            ryw_TTAPI.ryw_shareRecord(() => {
            }, () => {
            });
        }
        ryw_BannerUp() {
            ryw_TTAPI.ryw_showBanner();
        }
        ryw_BtnUp() {
            this.ryw__clickTag = true;
            this.ryw__backBtn.y = 720;
            this.ryw__okBtn.y = 720;
            this.ryw__videoBtn.y = 720;
        }
        ryw_onMoreGameBtn() {
            ryw_TTAPI.ryw_showMoreGamesModal(() => {
            }, () => {
            });
        }
        ryw_onShareBtn() {
            ryw_TTAPI.ryw_share(() => {
            });
        }
        onDestroy() {
            ryw_TTAPI.ryw_hideBanner();
        }
    }

    class ryw_TTGameWinViewTemplate extends ryw_TTGameFailViewTemplate {
    }

    class ryw_TTMainViewTemplate extends ryw_TTTemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__startBtn = null;
            this.ryw__levelNum = null;
            this.ryw__moneyNum = null;
            this.ryw__moreGameBtn = null;
            this.ryw__shareBtn = null;
        }
        onAwake() {
            super.onAwake();
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            this.ryw__moreGameBtn = this.ryw__centerZone.getChildByName("MoreGameBtn");
            this.ryw__shareBtn = this.ryw__centerZone.getChildByName("ShareBtn");
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
            else {
                this.ryw__centerZone.top = this.ryw__centerZone.top - 200;
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
            this.ryw__startBtn = this.ryw__centerZone.getChildByName("StartBtn");
            this.ryw__levelNum = this.ryw__centerZone.getChildByName("LevelInfo").getChildByName("LevelNum");
            this.ryw__moneyNum = this.ryw__centerZone.getChildByName("MoneyInfo").getChildByName("MoneyNum");
            this.ryw__moreGameBtn.visible = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_ttcfg.ryw_moreGameSwitch == 1;
        }
        onStart() {
            super.onStart();
            this.ryw__moneyNum.value = String(ryw_User.ryw_getMoney());
            this.ryw__levelNum.value = String(ryw_User.ryw_getLeveNum());
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__startBtn.on(Laya.Event.CLICK, this, this.ryw_onStartBtn);
            ryw_EventMgr.ryw_instance.ryw_regEvemt(ryw_EventDef.ryw_Game_OnUserMoneyChange, this, this.ryw_onUserMoneyChange);
            this.ryw__moreGameBtn.on(Laya.Event.CLICK, this, this.ryw_onMoreGameBtn);
            this.ryw__shareBtn.on(Laya.Event.CLICK, this, this.ryw_onShareBtn);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__startBtn.off(Laya.Event.CLICK, this, this.ryw_onStartBtn);
            ryw_EventMgr.ryw_instance.ryw_removeEvent(ryw_EventDef.ryw_Game_OnUserMoneyChange, this, this.ryw_onUserMoneyChange);
            this.ryw__moreGameBtn.off(Laya.Event.CLICK, this, this.ryw_onMoreGameBtn);
            this.ryw__shareBtn.off(Laya.Event.CLICK, this, this.ryw_onShareBtn);
        }
        ryw_onStartBtn() {
        }
        ryw_onMoreGameBtn() {
            ryw_TTAPI.ryw_showMoreGamesModal(() => {
            }, () => {
            });
        }
        ryw_onShareBtn() {
            ryw_TTAPI.ryw_share(() => {
            });
        }
        ryw_onUserMoneyChange(para) {
            let curr = para.curr;
            let last = para.last;
            this.ryw__moneyNum.value = String(curr);
        }
    }

    class ryw_TTMoreReward extends ryw_TTTemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__adToggle = null;
            this.ryw__adToggleTag = null;
            this.ryw__rewardBtn = null;
            this.ryw__shareBtn = null;
            this.ryw__ading = false;
        }
        onAwake() {
            this._topZone = this.ryw_View.getChildByName("TopZone");
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
            this.ryw__adToggle = this.ryw__centerZone.getChildByName("AdToggle");
            this.ryw__adToggleTag = this.ryw__adToggle.getChildByName("Tag");
            this.ryw__adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
            this.ryw__rewardBtn = this.ryw__centerZone.getChildByName("RewardBtn");
            this.ryw__shareBtn = this.ryw__centerZone.getChildByName("ShareBtn");
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__rewardBtn.on(Laya.Event.CLICK, this, this.ryw_onResurrectionBtn);
            this.ryw__adToggle.on(Laya.Event.CLICK, this, this.ryw_onAdToggle);
            this.ryw__shareBtn.on(Laya.Event.CLICK, this, this.ryw_onShareBtn);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__rewardBtn.off(Laya.Event.CLICK, this, this.ryw_onResurrectionBtn);
            this.ryw__adToggle.off(Laya.Event.CLICK, this, this.ryw_onAdToggle);
            this.ryw__shareBtn.off(Laya.Event.CLICK, this, this.ryw_onShareBtn);
        }
        ryw_onResurrectionBtn() {
            if (this.ryw__ading)
                return;
            this.ryw__ading = true;
            let self = this;
            if (this.ryw__adToggleTag.visible) {
                ryw_TTAPI.ryw_showRewardedVideoAd((ok) => {
                    if (ok) {
                    }
                    else {
                        self.ryw__ading = false;
                    }
                }, () => {
                    self.ryw__ading = false;
                });
            }
            else {
            }
        }
        ryw_onAdToggle() {
            if (this.ryw__ading)
                return;
            this.ryw__adToggleTag.visible = !this.ryw__adToggleTag.visible;
        }
        ryw_onShareBtn() {
            ryw_TTAPI.ryw_shareRecord(() => {
            }, () => {
            });
        }
    }

    class ryw_TTResurrection extends ryw_TTTemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__adToggle = null;
            this.ryw__adToggleTag = null;
            this.ryw__resurrectionBtn = null;
            this.ryw__skipBtn = null;
            this.ryw__skipOkTag = null;
            this.ryw__skipNoTag = null;
            this.ryw__ading = false;
        }
        onAwake() {
            this._topZone = this.ryw_View.getChildByName("TopZone");
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
            this.ryw__adToggle = this.ryw__centerZone.getChildByName("AdToggle");
            this.ryw__adToggleTag = this.ryw__adToggle.getChildByName("Tag");
            this.ryw__resurrectionBtn = this.ryw__centerZone.getChildByName("ResurrectionBtn");
            this.ryw__skipBtn = this.ryw__centerZone.getChildByName("SkipBtn");
            this.ryw__skipOkTag = this.ryw__skipBtn.getChildByName("Ok");
            this.ryw__skipNoTag = this.ryw__skipBtn.getChildByName("No");
            this.ryw__adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
            this.ryw_onAdToggleStateChange(this.ryw__adToggleTag.visible);
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__resurrectionBtn.on(Laya.Event.CLICK, this, this.ryw_onResurrectionBtn);
            this.ryw__adToggle.on(Laya.Event.CLICK, this, this.ryw_onAdToggle);
            this.ryw__skipBtn.on(Laya.Event.CLICK, this, this.ryw_onSkipBtn);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__resurrectionBtn.off(Laya.Event.CLICK, this, this.ryw_onResurrectionBtn);
            this.ryw__adToggle.off(Laya.Event.CLICK, this, this.ryw_onAdToggle);
            this.ryw__skipBtn.off(Laya.Event.CLICK, this, this.ryw_onSkipBtn);
        }
        ryw_onResurrectionBtn() {
            if (this.ryw__ading)
                return;
            this.ryw__ading = true;
            let self = this;
            ryw_TTAPI.ryw_showRewardedVideoAd((ok) => {
                if (ok) {
                }
                else {
                    self.ryw__ading = false;
                }
            }, () => {
                self.ryw__ading = false;
            });
        }
        ryw_onAdToggle() {
            if (this.ryw__ading)
                return;
            this.ryw__adToggleTag.visible = !this.ryw__adToggleTag.visible;
            this.ryw_onAdToggleStateChange(this.ryw__adToggleTag.visible);
        }
        ryw_onSkipBtn() {
            if (this.ryw__ading)
                return;
            this.ryw__ading = true;
            let self = this;
            if (this.ryw__adToggleTag.visible) {
                ryw_TTAPI.ryw_showRewardedVideoAd((ok) => {
                    if (ok) {
                    }
                    else {
                        self.ryw__ading = false;
                    }
                }, () => {
                    self.ryw__ading = false;
                });
            }
            else {
            }
        }
        ryw_onAdToggleStateChange(visible) {
            if (visible) {
                this.ryw__skipOkTag.visible = true;
                this.ryw__skipNoTag.visible = false;
            }
            else {
                this.ryw__skipOkTag.visible = false;
                this.ryw__skipNoTag.visible = true;
            }
        }
    }

    class ryw_RewardBox extends Laya.Script {
        constructor() {
            super(...arguments);
            this.ryw__view = null;
            this.ryw__adTag = null;
        }
        get ryw_AdTag() {
            return this.ryw__adTag;
        }
        ryw_init(view) {
            this.ryw__view = view;
            this.ryw__adTag = this.owner.getChildByName("AdTag");
        }
        onEnable() {
            this.owner.on(Laya.Event.CLICK, this, this.ryw_onSelfClick);
        }
        onDisable() {
            this.owner.off(Laya.Event.CLICK, this, this.ryw_onSelfClick);
        }
        ryw_onSelfClick() {
            if (null != this.ryw__view) {
                this.ryw__view.onRewardBoxClick(this);
            }
        }
    }

    class ryw_TTReward extends ryw_TTTemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__rewardBoxs = [];
            this.ryw__keysRoot = null;
            this.ryw__keys = [];
            this.ryw__keyCount = 3;
            this.ryw__getKeyZone = null;
            this.ryw__adToggle = null;
            this.ryw__adToggleTag = null;
            this.ryw__getKeyBtn = null;
            this.ryw__skipBtn = null;
            this.ryw__skipOkTag = null;
            this.ryw__skipNoTag = null;
            this.ryw__getKeyTimes = 1;
            this.ryw__ading = false;
        }
        onAwake() {
            super.onAwake();
            this._topZone = this.ryw_View.getChildByName("TopZone");
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
            this.ryw__getKeyZone = this.ryw__centerZone.getChildByName("GetKeyZone");
            this.ryw__adToggle = this.ryw__getKeyZone.getChildByName("AdToggle");
            this.ryw__adToggleTag = this.ryw__adToggle.getChildByName("Tag");
            this.ryw__getKeyBtn = this.ryw__getKeyZone.getChildByName("GetKeyBtn");
            this.ryw__skipBtn = this.ryw__getKeyZone.getChildByName("SkipBtn");
            this.ryw__skipOkTag = this.ryw__skipBtn.getChildByName("Ok");
            this.ryw__skipNoTag = this.ryw__skipBtn.getChildByName("No");
            this.ryw__adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
            this.onAdToggleStateChange(this.ryw__adToggleTag.visible);
            let boxsRoot = this.ryw__centerZone.getChildByName("BoxsRoot");
            let indexs = [];
            for (let i = 0; i < boxsRoot.numChildren; ++i) {
                let boxObj = boxsRoot.getChildAt(i);
                let rewardBox = boxObj.getComponent(ryw_RewardBox);
                rewardBox.ryw_init(this);
                rewardBox.ryw_AdTag.visible = false;
                this.ryw__rewardBoxs.push(rewardBox);
                indexs.push(i);
            }
            for (let i = 0; i < indexs.length; ++i) {
                let index = indexs[i];
                let randomIndex = Math.floor(Math.random() * indexs.length);
                let temp = indexs[randomIndex];
                indexs[randomIndex] = index;
                indexs[i] = temp;
            }
            for (let i = 0; i < 3; ++i) {
                this.ryw__rewardBoxs[indexs.shift()].ryw_AdTag.visible = true;
            }
            this.ryw__keysRoot = this.ryw__centerZone.getChildByName("KeysRoot");
            for (let i = 0; i < this.ryw__keysRoot.numChildren; ++i) {
                let key = this.ryw__keysRoot.getChildAt(i);
                this.ryw__keys.push(key);
            }
            this.refreshKeyState();
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__getKeyBtn.on(Laya.Event.CLICK, this, this.onGetKeyBtn);
            this.ryw__adToggle.on(Laya.Event.CLICK, this, this.onAdToggle);
            this.ryw__skipBtn.on(Laya.Event.CLICK, this, this.onSkipText);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__getKeyBtn.off(Laya.Event.CLICK, this, this.onGetKeyBtn);
            this.ryw__adToggle.off(Laya.Event.CLICK, this, this.onAdToggle);
            this.ryw__skipBtn.off(Laya.Event.CLICK, this, this.onSkipText);
        }
        onRewardBoxClick(box) {
            if (this.ryw__ading) {
                return;
            }
            if (box.ryw_AdTag.visible) {
                this.ryw__ading = true;
                let self = this;
                ryw_TTAPI.ryw_showRewardedVideoAd((ok) => {
                    if (ok) {
                    }
                    else {
                        self.ryw__ading = false;
                        box.ryw_AdTag.visible = false;
                    }
                }, () => {
                    self.ryw__ading = false;
                });
                return;
            }
            else {
                if (this.ryw__keyCount <= 0)
                    return;
                --this.ryw__keyCount;
                this.refreshKeyState();
            }
        }
        refreshKeyState() {
            for (let i = 0; i < this.ryw__keys.length; ++i) {
                let key = this.ryw__keys[i];
                key.visible = ((i + 1) <= this.ryw__keyCount);
            }
            this.ryw__getKeyZone.visible = this.ryw__keyCount <= 0 && this.ryw__getKeyTimes > 0;
            this.ryw__keysRoot.visible = this.ryw__keyCount > 0 || this.ryw__getKeyTimes <= 0;
        }
        onGetKeyBtn() {
            if (this.ryw__ading)
                return;
            if (this.ryw__getKeyTimes <= 0)
                return;
            this.ryw__ading = true;
            let self = this;
            ryw_TTAPI.ryw_showRewardedVideoAd((ok) => {
                if (ok) {
                    --self.ryw__getKeyTimes;
                    self.ryw__keyCount = 3;
                    self.refreshKeyState();
                    self.ryw__ading = false;
                }
                else {
                    self.ryw__ading = false;
                }
            }, () => {
                self.ryw__ading = false;
            });
        }
        onAdToggle() {
            if (this.ryw__ading)
                return;
            this.ryw__adToggleTag.visible = !this.ryw__adToggleTag.visible;
            this.onAdToggleStateChange(this.ryw__adToggleTag.visible);
        }
        onSkipText() {
            if (this.ryw__ading)
                return;
            this.ryw__ading = true;
            let self = this;
            if (this.ryw__adToggleTag.visible && this.ryw__getKeyTimes > 0) {
                ryw_TTAPI.ryw_showRewardedVideoAd((ok) => {
                    if (ok) {
                        --self.ryw__getKeyTimes;
                        self.ryw__keyCount = 3;
                        self.refreshKeyState();
                        self.ryw__ading = false;
                    }
                    else {
                        self.ryw__ading = false;
                    }
                }, () => {
                    self.ryw__ading = false;
                });
            }
            else {
            }
        }
        onAdToggleStateChange(visible) {
            if (visible) {
                this.ryw__skipOkTag.visible = true;
                this.ryw__skipNoTag.visible = false;
            }
            else {
                this.ryw__skipOkTag.visible = false;
                this.ryw__skipNoTag.visible = true;
            }
        }
    }

    class ryw_TTSignIn extends ryw_TTTemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__signIconRoot = null;
            this.ryw__signIcons = [];
            this.ryw__signMasks = [];
            this.ryw__adToggle = null;
            this.ryw__adToggleTag = null;
            this.ryw__signInBtn = null;
            this.ryw__skipBtn = null;
            this.ryw__skipOkTag = null;
            this.ryw__skipNoTag = null;
            this.ryw__signedTag = null;
            this.ryw__signIning = false;
        }
        onAwake() {
            this._topZone = this.ryw_View.getChildByName("TopZone");
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
            this.ryw__signIconRoot = this.ryw__centerZone.getChildByName("SignIconRoot");
            for (let i = 0; i < this.ryw__signIconRoot.numChildren; ++i) {
                let s = this.ryw__signIconRoot.getChildByName(String(i + 1));
                let OkTag = s.getChildByName("Ok");
                OkTag.visible = false;
                let Mask = s.getChildByName("Mask");
                Mask.visible = true;
                this.ryw__signIcons.push(OkTag);
                this.ryw__signMasks.push(Mask);
            }
            this.ryw__adToggle = this.ryw__centerZone.getChildByName("AdToggle");
            this.ryw__adToggleTag = this.ryw__adToggle.getChildByName("Tag");
            this.ryw__signInBtn = this.ryw__centerZone.getChildByName("SignInBtn");
            this.ryw__skipBtn = this.ryw__centerZone.getChildByName("SkipBtn");
            this.ryw__skipOkTag = this.ryw__skipBtn.getChildByName("Ok");
            this.ryw__skipNoTag = this.ryw__skipBtn.getChildByName("No");
            this.ryw__adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
            this.ryw_onAdToggleStateChange(this.ryw__adToggleTag.visible);
            this.ryw__signedTag = this.ryw__centerZone.getChildByName("SignedTag");
            this.ryw__signedTag.visible = false;
        }
        onStart() {
            super.onStart();
            let self = this;
            ryw_HttpUnit.GetSignIn((res) => {
                let isSign = res.data.is_sign;
                let signDays = res.data.sign_day_num;
                self.ryw_refreshSignInState(signDays);
            }, (res) => {
            });
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__signInBtn.on(Laya.Event.CLICK, this, this.ryw_onSignInBtn);
            this.ryw__adToggle.on(Laya.Event.CLICK, this, this.ryw_onAdToggle);
            this.ryw__skipBtn.on(Laya.Event.CLICK, this, this.ryw_onSkipBtn);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__signInBtn.off(Laya.Event.CLICK, this, this.ryw_onSignInBtn);
            this.ryw__adToggle.off(Laya.Event.CLICK, this, this.ryw_onAdToggle);
            this.ryw__skipBtn.off(Laya.Event.CLICK, this, this.ryw_onSkipBtn);
        }
        ryw_refreshSignInState(days) {
            let left = days % 7;
            if (0 == days) {
                for (let i = 0; i < this.ryw__signIcons.length; ++i) {
                    this.ryw__signIcons[i].visible = false;
                    this.ryw__signMasks[i].visible = false;
                }
            }
            else {
                if (0 == left) {
                    for (let i = 0; i < this.ryw__signIcons.length; ++i) {
                        this.ryw__signIcons[i].visible = true;
                        this.ryw__signMasks[i].visible = false;
                    }
                }
                else {
                    for (let i = 0; i < this.ryw__signIcons.length; ++i) {
                        this.ryw__signIcons[i].visible = i < left;
                        this.ryw__signMasks[i].visible = i > left;
                    }
                }
            }
        }
        ryw_onSignInBtn() {
            if (this.ryw__signIning)
                return;
            this.ryw__signIning = true;
            let self = this;
            ryw_TTAPI.ryw_showRewardedVideoAd((ok) => {
                if (ok) {
                    ryw_HttpUnit.SignIn((res) => {
                        let code = res.code;
                        if (1 == code) {
                            ryw_HttpUnit.GetSignIn((res) => {
                                let isSign = res.data.is_sign;
                                let signDays = res.data.sign_day_num;
                                self.ryw_refreshSignInState(signDays);
                                self.ryw__signIning = false;
                            }, (res) => {
                                self.ryw__signIning = false;
                            });
                        }
                        else {
                            console.log("签到失败 ： code", code);
                            self.ryw__signIning = false;
                        }
                    }, () => {
                        self.ryw__signIning = false;
                    });
                }
                else {
                    self.ryw__signIning = false;
                }
            }, () => {
                self.ryw__signIning = false;
            });
        }
        ryw_onAdToggle() {
            if (this.ryw__signIning)
                return;
            this.ryw__adToggleTag.visible = !this.ryw__adToggleTag.visible;
            this.ryw_onAdToggleStateChange(this.ryw__adToggleTag.visible);
        }
        ryw_onSkipBtn() {
            if (this.ryw__signIning)
                return;
            this.ryw__signIning = true;
            let self = this;
            if (this.ryw__adToggleTag.visible) {
                ryw_TTAPI.ryw_showRewardedVideoAd((ok) => {
                    if (ok) {
                        ryw_HttpUnit.SignIn((res) => {
                            let code = res.code;
                            if (1 == code) {
                                ryw_HttpUnit.GetSignIn((res) => {
                                    let isSign = res.data.is_sign;
                                    let signDays = res.data.sign_day_num;
                                    self.ryw_refreshSignInState(signDays);
                                    self.ryw__signIning = false;
                                }, (res) => {
                                    self.ryw__signIning = false;
                                });
                            }
                            else {
                                console.log("签到失败 ： code", code);
                                self.ryw__signIning = false;
                            }
                        }, () => {
                            self.ryw__signIning = false;
                        });
                    }
                    else {
                        self.ryw__signIning = false;
                    }
                }, () => {
                    self.ryw__signIning = false;
                });
            }
            else {
                ryw_HttpUnit.SignIn((res) => {
                    let code = res.code;
                    if (1 == code) {
                        self.ryw__signIning = false;
                        ryw_HttpUnit.GetSignIn((res) => {
                            let isSign = res.data.is_sign;
                            let signDays = res.data.sign_day_num;
                            self.ryw_refreshSignInState(signDays);
                        }, (res) => {
                        });
                    }
                    else {
                        console.log("签到失败 ： code", code);
                        self.ryw__signIning = false;
                    }
                }, () => {
                    self.ryw__signIning = false;
                });
            }
        }
        ryw_onAdToggleStateChange(visible) {
            if (visible) {
                this.ryw__skipOkTag.visible = true;
                this.ryw__skipNoTag.visible = false;
            }
            else {
                this.ryw__skipOkTag.visible = false;
                this.ryw__skipNoTag.visible = true;
            }
        }
    }

    class ryw_TTSkinTips extends ryw_TTTemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__adToggle = null;
            this.ryw__adToggleTag = null;
            this.ryw__okBtn = null;
            this.ryw__skipBtn = null;
            this.ryw__skipOkTag = null;
            this.ryw__skipNoTag = null;
            this.ryw__skinAnchor = null;
            this.ryw__ading = false;
        }
        onAwake() {
            this._topZone = this.ryw_View.getChildByName("TopZone");
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
            this.ryw__adToggle = this.ryw__centerZone.getChildByName("AdToggle");
            this.ryw__adToggleTag = this.ryw__adToggle.getChildByName("Tag");
            this.ryw__okBtn = this.ryw__centerZone.getChildByName("OkBtn");
            this.ryw__skipBtn = this.ryw__centerZone.getChildByName("SkipBtn");
            this.ryw__skipOkTag = this.ryw__skipBtn.getChildByName("Ok");
            this.ryw__skipNoTag = this.ryw__skipBtn.getChildByName("No");
            this.ryw__adToggleTag.visible = (0 == Math.floor(Math.random() * 2));
            this.ryw_onAdToggleStateChange(this.ryw__adToggleTag.visible);
            this.ryw__skinAnchor = this.ryw__centerZone.getChildByName("SkinAnchor");
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__okBtn.on(Laya.Event.CLICK, this, this.ryw_onOkBtn);
            this.ryw__adToggle.on(Laya.Event.CLICK, this, this.ryw_onAdToggle);
            this.ryw__skipBtn.on(Laya.Event.CLICK, this, this.ryw_onSkipText);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__okBtn.off(Laya.Event.CLICK, this, this.ryw_onOkBtn);
            this.ryw__adToggle.off(Laya.Event.CLICK, this, this.ryw_onAdToggle);
            this.ryw__skipBtn.off(Laya.Event.CLICK, this, this.ryw_onSkipText);
        }
        ryw_onOkBtn() {
            if (this.ryw__ading)
                return;
            this.ryw__ading = true;
            let self = this;
            ryw_TTAPI.ryw_showRewardedVideoAd((ok) => {
                if (ok) {
                }
                else {
                    self.ryw__ading = false;
                }
            }, () => {
                self.ryw__ading = false;
            });
        }
        ryw_onAdToggle() {
            if (this.ryw__ading)
                return;
            this.ryw__adToggleTag.visible = !this.ryw__adToggleTag.visible;
            this.ryw_onAdToggleStateChange(this.ryw__adToggleTag.visible);
        }
        ryw_onSkipText() {
            if (this.ryw__ading)
                return;
            this.ryw__ading = true;
            let self = this;
            if (this.ryw__adToggleTag.visible) {
                ryw_TTAPI.ryw_showRewardedVideoAd((ok) => {
                    if (ok) {
                    }
                    else {
                        self.ryw__ading = false;
                    }
                }, () => {
                    self.ryw__ading = false;
                });
            }
            else {
            }
        }
        ryw_onAdToggleStateChange(visible) {
            if (visible) {
                this.ryw__skipOkTag.visible = true;
                this.ryw__skipNoTag.visible = false;
            }
            else {
                this.ryw__skipOkTag.visible = false;
                this.ryw__skipNoTag.visible = true;
            }
        }
    }

    class ryw_PageList extends Laya.Script {
        constructor() {
            super(...arguments);
            this.ryw__list = null;
            this.ryw__pageIcon = new Array();
            this.ryw__pageInfo = null;
            this.ryw__lastScrollValue = 0;
            this.ryw__tweening = false;
            this.ryw__curPage = 0;
        }
        get ryw_List() {
            if (null == this.ryw__list) {
                this.ryw__list = this.owner.getChildByName("List");
            }
            return this.ryw__list;
        }
        onAwake() {
            this.ryw__list = this.owner.getChildByName("List");
            this.ryw__pageInfo = this.owner.getChildByName("PageInfo");
            for (let i = 0; i < this.ryw__pageInfo.numChildren; ++i) {
                let child = this.ryw__pageInfo.getChildAt(i);
                let icon = child.getChildByName("icon");
                this.ryw__pageIcon.push(icon);
            }
        }
        onUpdate() {
            if (!this.ryw__tweening && this.ryw__lastScrollValue != this.ryw__list.scrollBar.value) {
                let totalPage = this.ryw__list.array.length / 6 - 1;
                if (this.ryw__lastScrollValue < this.ryw__list.scrollBar.value) {
                    ++this.ryw__curPage;
                    if (this.ryw__curPage >= totalPage) {
                        this.ryw__curPage = totalPage;
                    }
                }
                else {
                    --this.ryw__curPage;
                    if (this.ryw__curPage <= 0) {
                        this.ryw__curPage = 0;
                    }
                }
                this.ryw__tweening = true;
                let self = this;
                this.ryw__list.tweenTo(this.ryw__curPage * 6, 500, Laya.Handler.create(this, () => {
                }));
                Laya.timer.once(500, this, () => {
                    self.ryw__tweening = false;
                    self.ryw__lastScrollValue = self.ryw__list.scrollBar.value;
                });
            }
        }
    }

    class ryw_StoreBox extends Laya.Script {
        constructor() {
            super(...arguments);
            this.ryw__root = null;
            this.ryw__unlockedTag = null;
            this.ryw__usedTag = null;
            this.ryw__index = -1;
            this.ryw__view = null;
        }
        onAwake() {
            this.ryw__root = this.owner.getChildByName("Root");
            this.ryw__unlockedTag = this.ryw__root.getChildByName("Unlock");
            this.ryw__usedTag = this.ryw__root.getChildByName("Used");
        }
        onEnable() {
            this.owner.on(Laya.Event.CLICK, this, this.ryw_onBoxClick);
        }
        onDisable() {
            this.owner.on(Laya.Event.CLICK, this, this.ryw_onBoxClick);
        }
        ryw_setData(index, view, data, selected) {
            this.ryw__index = index;
            this.ryw__view = view;
            this.ryw__unlockedTag.visible = ryw_User.itemIsUnlocked(data.id);
            this.ryw__usedTag.visible = ryw_User.curUsedItem == data.id;
            this.ryw__root.visible = (-10086 != data.id);
        }
        ryw_onBoxClick() {
            if (null != this.ryw__view && -1 != this.ryw__index) {
                this.ryw__view.ryw_onBoxClick(this.ryw__index);
            }
        }
    }

    class StoreData {
        constructor() {
            this.id = 0;
            this.icon = "";
            this.priceType = 0;
            this.price = 0;
        }
        clone() {
            let t = new StoreData();
            t.id = this.id;
            t.icon = this.icon;
            t.priceType = this.priceType;
            t.price = this.price;
            return t;
        }
    }
    class StoreConfig {
        constructor() {
            this._data = new Array();
        }
        static getInstance() {
            if (null == StoreConfig._instance) {
                StoreConfig._instance = StoreConfig.load();
            }
            return StoreConfig._instance;
        }
        static load() {
            var config = new StoreConfig();
            var json = Laya.loader.getRes(ryw_AppConfig.ryw_ResServer + "/json/storeconfig.json");
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
        }
        getStoreDatas() {
            let datas = new Array();
            for (let i = 0; i < this._data.length; ++i) {
                datas.push(this._data[i].clone());
            }
            return datas;
        }
    }

    class ryw_TTStore extends ryw_TTTemplateViewBase {
        constructor() {
            super(...arguments);
            this.ryw__centerZone = null;
            this.ryw__is3d = false;
            this.ryw__closeBtn = null;
            this.ryw__displayZone = null;
            this.ryw__displayIcon = null;
            this.ryw__storeListZone = null;
            this.ryw__storeList = null;
            this.ryw__priceUnlockBtn = null;
            this.ryw__videoUnlockBtn = null;
            this.ryw__useBtn = null;
            this.ryw__usedTag = null;
            this.ryw__curSelected = 0;
        }
        onAwake() {
            super.onAwake();
            this._topZone = this.ryw_View.getChildByName("TopZone");
            this.ryw__centerZone = this.ryw_View.getChildByName("CenterZone");
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                if (ryw_Utilit.ryw_isIphoneX()) {
                    this.ryw__centerZone.top = this.ryw__centerZone.top + 75;
                }
            }
            this.ryw__closeBtn = this.ryw__centerZone.getChildByName("CloseBtn");
            this.ryw__displayZone = this.ryw__centerZone.getChildByName("DisplayZone");
            this.ryw__displayIcon = this.ryw__displayZone.getChildByName("DisplayIcon");
            this.ryw__storeListZone = this.ryw__centerZone.getChildByName("StoreListZone");
            this.ryw__storeList = this.ryw__storeListZone.getComponent(ryw_PageList);
            this.ryw__storeList.ryw_List.renderHandler = Laya.Handler.create(this, this.ryw_onListRender, null, false);
            this.ryw__storeList.ryw_List.hScrollBarSkin = "";
            this.ryw__videoUnlockBtn = this.ryw__storeListZone.getChildByName("VideoUnlockBtn");
            this.ryw__priceUnlockBtn = this.ryw__storeListZone.getChildByName("PriceUnlockBtn");
            this.ryw__useBtn = this.ryw__storeListZone.getChildByName("UseBtn");
            this.ryw__usedTag = this.ryw__useBtn.getChildByName("Used");
        }
        onStart() {
            super.onStart();
            if (this.ryw__is3d) {
                this.ryw__displayZone.visible = false;
            }
            this.ryw_refreshStoreList();
            this.ryw__storeList.ryw_List.selectedIndex = 0;
            this.ryw_onBoxClick(0);
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this.ryw__closeBtn.on(Laya.Event.CLICK, this, this.ryw_onCloseBtn);
            this.ryw__priceUnlockBtn.on(Laya.Event.CLICK, this, this.ryw_onPriceUnlockBtn);
            this.ryw__videoUnlockBtn.on(Laya.Event.CLICK, this, this.ryw_onVideoUnlockBtn);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this.ryw__closeBtn.off(Laya.Event.CLICK, this, this.ryw_onCloseBtn);
            this.ryw__priceUnlockBtn.off(Laya.Event.CLICK, this, this.ryw_onPriceUnlockBtn);
            this.ryw__videoUnlockBtn.off(Laya.Event.CLICK, this, this.ryw_onVideoUnlockBtn);
        }
        ryw_onCloseBtn() {
            this.ryw_closeView();
        }
        ryw_onPriceUnlockBtn() {
            let data = this.ryw__storeList.ryw_List.array[this.ryw__curSelected];
        }
        ryw_onVideoUnlockBtn() {
            let data = this.ryw__storeList.ryw_List.array[this.ryw__curSelected];
        }
        ryw_refreshStoreList() {
            let storeDatas = StoreConfig.getInstance().getStoreDatas();
            let add = 6 - (storeDatas.length % 6);
            for (let i = 0; i < add; ++i) {
                let d = new StoreData();
                d.id = -10086;
                storeDatas.push(d);
            }
            this.ryw__storeList.ryw_List.array = storeDatas;
        }
        ryw_onListRender(cell, index) {
            let data = this.ryw__storeList.ryw_List.array[index];
            let storeBox = cell.getComponent(ryw_StoreBox);
            storeBox.ryw_setData(index, this, data, this.ryw__curSelected == index);
        }
        ryw_onBoxClick(index) {
            this.ryw__curSelected = index;
            let data = this.ryw__storeList.ryw_List.array[this.ryw__curSelected];
            ryw_User.curUsedItem = data.id;
            let unlocked = ryw_User.itemIsUnlocked(data.id);
            this.ryw__priceUnlockBtn.visible = 0 == data.priceType && !unlocked;
            this.ryw__videoUnlockBtn.visible = 1 == data.priceType && !unlocked;
            this.ryw__useBtn.visible = unlocked;
            this.ryw__usedTag.visible = data.id == ryw_User.curUsedItem;
            this.ryw__storeList.ryw_List.refresh();
        }
    }

    class VVTemplateViewBase extends ryw_ViewBase {
        onAwake() {
        }
        ryw_addEvent() {
            super.ryw_addEvent();
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
        }
    }

    class VVNativeAd1View extends VVTemplateViewBase {
        constructor() {
            super(...arguments);
            this._nativeAd = null;
            this._curAdItem = null;
        }
        onAwake() {
            this._centerZone = this.owner.getChildByName("CenterZone");
            this._display = this._centerZone.getChildByName("Display");
            this._okBtn = this._centerZone.getChildByName("OkBtn");
            this._closeBtn = this._centerZone.getChildByName("CloseBtn");
            this._bg = this.owner.getChildByName("BG");
        }
        onEnable() {
            super.onEnable();
            this.loadAd();
            this._bg.height = Laya.stage.height;
            this._closeBtn.visible = false;
            Laya.timer.once(ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_vivocfg.btnShowTimer, this, () => {
                this._closeBtn.visible = true;
            });
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            this._okBtn.on(Laya.Event.CLICK, this, this.onOkBtn);
            this._closeBtn.on(Laya.Event.CLICK, this, this.onCloseBtn);
            this._display.on(Laya.Event.CLICK, this, this.onDisplayClick);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            this._okBtn.off(Laya.Event.CLICK, this, this.onOkBtn);
            this._closeBtn.off(Laya.Event.CLICK, this, this.onCloseBtn);
            this._display.off(Laya.Event.CLICK, this, this.onDisplayClick);
        }
        loadAd() {
            var self = this;
            let ipBlocked = ryw_WudianMgr.ryw_GetIpBlocked();
            if (!ipBlocked) {
                self.ryw_closeView();
                return;
            }
            if (Laya.Browser.onVVMiniGame) {
                if (this._nativeAd) {
                    this._nativeAd.destroy();
                    this._nativeAd = null;
                }
                this._curAdItem = null;
                this._nativeAd = qg.createNativeAd({
                    posId: VIVOAPI.nativeAdId
                });
                this._nativeAd.load();
                this._nativeAd.onLoad((res) => {
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
                this._nativeAd.onError((res) => {
                    console.log("原生广告加载失败：", res);
                    for (var key in res) {
                        console.log(key, res[key]);
                    }
                    self.ryw_closeView();
                });
                this._centerZone.visible = false;
            }
        }
        onCloseBtn() {
            this.ryw_closeView();
        }
        onOkBtn() {
            if (Math.random() * 100 <= ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_vivocfg.ryw_yuansheng) {
                console.log("进入变态广告");
                this.onDisplayClick();
            }
            this.ryw_closeView();
        }
        onDisplayClick() {
            if (null != this._nativeAd && null != this._curAdItem) {
                console.log("点击上报！！！");
                this._nativeAd.reportAdClick({
                    adId: this._curAdItem.adId
                });
            }
        }
        onDestroy() {
            super.onDestroy();
            if (Laya.Browser.onVVMiniGame) {
                if (this._nativeAd) {
                    this._nativeAd.destroy();
                }
                this._nativeAd = null;
                this._curAdItem = null;
            }
        }
    }

    class VVNativeAd2View extends VVNativeAd1View {
        onOkBtn() {
            if (Math.random() * 100 <= ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_vivocfg.ryw_yuansheng2) {
                console.log("进入变态广告");
                this.onDisplayClick();
            }
            this.ryw_closeView();
        }
    }

    class WXCrazyClick extends ryw_ViewBase {
        constructor() {
            super(...arguments);
            this.ryw__clickBar = null;
            this.ryw__totalClickTimer = 15;
            this.ryw__needClickTime = 10;
            this.ryw__bannerClickTime = Math.floor(Math.random() * 5) + 2;
            this.ryw__banner = null;
        }
        onAwake() {
            this.ryw__click_Btn = this.owner.getChildByName("Click_Btn");
            this.ryw__click_Btn.on(Laya.Event.CLICK, this, this.ButtonClicked);
            this.ryw__arrow_Img = this.ryw__click_Btn.getChildByName("Arrow_Img");
            this.ryw__getPrize_View = this.owner.getChildByName("GetPrize_View");
            this.ryw__prizeCount_Text = this.ryw__getPrize_View.getChildByName("PrizeCount_Text");
            this.ryw__confirm_Btn = this.ryw__getPrize_View.getChildByName("Confirm_Btn");
            this.ryw__getPrize_View.visible = false;
            this.ryw__clickBar = this.owner.getChildByName("ClickBar").getChildByName("ClickBar");
            this.ryw__clickBarOriginalWidth = this.ryw__clickBar.width;
            this.ryw__clickBar.width = 0;
            this.ryw__clickTime = 0;
            this.ryw__totalClickTime = 0;
            let self = this;
            Laya.loader.load("ClickGetPrize/quanji.png", Laya.Handler.create(this, (texture) => {
                Laya.loader.load("ClickGetPrize/quanji.sk", Laya.Handler.create(this, (bytes) => {
                    console.log("texture", texture);
                    console.log("bytes", bytes);
                    let template = new Laya.Templet();
                    template.parseData(texture, bytes);
                    self.ryw_drgon = template.buildArmature();
                    self.owner.addChild(self.ryw_drgon);
                    self.ryw_drgon.x = 375;
                    self.ryw_drgon.y = 610;
                    self.ryw_drgon.scaleX = 2;
                    self.ryw_drgon.scaleY = 2;
                    self.ryw_drgon.parent.setChildIndex(self.ryw_drgon, 1);
                    self.ryw_drgon.play(0, true);
                    console.log("quanji 加载完成!!!!", template);
                }), Laya.Handler.create(this, () => { }), "", 0, false, "", true);
            }), Laya.Handler.create(this, () => { }), "", 0, false, "", true);
        }
        ryw_addEvent() {
            super.ryw_addEvent();
            Laya.stage.on(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
        }
        ryw_removeEvent() {
            super.ryw_removeEvent();
            Laya.stage.off(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
        }
        onUpdate() {
            if (this.ryw__arrowUp) {
                this.ryw__arrow_Img.top += Laya.timer.delta / 5;
                if (this.ryw__arrow_Img.top > -140) {
                    this.ryw__arrowUp = false;
                }
            }
            else {
                this.ryw__arrow_Img.top -= Laya.timer.delta / 5;
                if (this.ryw__arrow_Img.top < -180) {
                    this.ryw__arrowUp = true;
                }
            }
            if (!this.ryw__bannerClicked) {
                let spd = 2 + (this.ryw__clickBar.width / this.ryw__clickBarOriginalWidth) * 4;
                if (this.ryw__clickBar.width >= spd) {
                    this.ryw__clickBar.width -= spd;
                }
                if ((this.ryw__clickBar.width / this.ryw__clickBarOriginalWidth) + 0.1 < (this.ryw__clickTime / this.ryw__needClickTime)) {
                    this.ryw__clickTime--;
                }
            }
        }
        ryw_openView(data) {
            this.ryw__compeletFunction = data.Complete;
            this.ryw__titel = data.titel;
            super.ryw_openView(data);
        }
        ryw_OpenPrizeWindow() {
            let self = this;
            this.ryw__prizeCount_Text.text = this.ryw__titel;
            this.ryw__getPrize_View.visible = true;
            this.ryw__confirm_Btn.once(Laya.Event.CLICK, this, function () {
                if (null != self.ryw__banner) {
                    self.ryw__banner.ryw_hide();
                }
                if (self.ryw__compeletFunction) {
                    self.ryw__compeletFunction();
                }
                self.ryw_closeView();
            });
        }
        ryw_ShowBanner() {
            let self = this;
            ryw_WXADMgr.ryw_getBanner((banner) => {
                if (null != self.ryw__banner) {
                    self.ryw__banner.ryw_hide();
                }
                self.ryw__banner = banner;
                if (null != self.ryw__banner) {
                    self.ryw__banner.ryw_show();
                }
            });
        }
        ButtonClicked() {
            this.ryw__clickTime++;
            this.ryw__totalClickTime++;
            if (null != this.ryw_drgon) {
                this.ryw_drgon.play(1, false);
                this.ryw_drgon.once(Laya.Event.STOPPED, this, () => {
                    this.ryw_drgon.play(0, true);
                });
            }
            if (this.ryw__clickTime > this.ryw__needClickTime) {
                this.ryw__clickTime = this.ryw__needClickTime;
            }
            if (this.ryw__clickTime >= this.ryw__bannerClickTime) {
                if (this.ryw__clickTime >= this.ryw__needClickTime) {
                    this.ryw__clickTime = this.ryw__needClickTime - 1;
                }
                if (this.ryw__bannerClicked) {
                    return;
                }
                this.ryw__bannerClicked = true;
                if (ryw_WudianMgr.ryw_WudianFlag && 1 == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wxcfg.ryw_kuangdianBanner) {
                    this.ryw_ShowBanner();
                }
                Laya.timer.once(2000, this, function () {
                    this.ryw_BannerClicked();
                });
            }
            else if (this.ryw__totalClickTime > this.ryw__totalClickTimer) {
                if (ryw_WudianMgr.ryw_WudianFlag && 1 == ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_wxcfg.ryw_kuangdianBanner) {
                    this.ryw_ShowBanner();
                }
                this.ryw_BannerClicked();
            }
            let progress = (this.ryw__clickTime / this.ryw__needClickTime) * this.ryw__clickBarOriginalWidth;
            this.ryw__clickBar.width = progress;
        }
        ryw_BannerClicked() {
            ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_WudianBanner_Hide);
            this.ryw__bannerClicked = true;
            this.ryw__clickTime = this.ryw__needClickTime;
            this.ryw__clickBar.width = this.ryw__clickBarOriginalWidth;
            this.ryw__click_Btn.visible = false;
            this.ryw_OpenPrizeWindow();
        }
        onDestroy() {
            if (null != this.ryw__banner) {
                this.ryw__banner.ryw_hide();
            }
        }
        onFocusChange() {
            if (null != this.ryw_drgon) {
                this.ryw_drgon.play(0, true);
            }
        }
    }

    class ryw_TipsView extends ryw_ViewBase {
        constructor() { super(); }
        onAwake() {
            this.ryw__bg = this.owner.getChildByName("Bg");
            this.ryw__bg.x = Laya.stage.width / 2 - this.ryw__bg.width / 2;
            this.ryw__tipsText = this.ryw__bg.getChildByName("Text");
        }
        ryw_openView(data) {
            super.ryw_openView(data);
            this.ryw_setTipsMsg(data);
            Laya.timer.clearAll(this);
            var self = this;
            Laya.timer.once(3000, this, function () {
                self.ryw_closeView();
            });
        }
        ryw_setTipsMsg(msg) {
            this.ryw__tipsText.text = msg;
        }
    }

    class ryw_LoopAdBox extends Laya.Script {
        constructor() {
            super(...arguments);
            this.ryw__data = null;
            this.ryw__originW = 150;
            this.ryw__originH = 150;
            this.ryw__fontSize = 25;
        }
        onAwake() {
            this.ryw__displaySp = this.owner.getChildByName("Display");
            this.ryw__originW = this.ryw__displaySp.width;
            this.ryw__originH = this.ryw__displaySp.height;
            this.ryw__disText = this.owner.getChildByName("TitelText");
            this.ryw__disText.text = "";
            this.ryw__fontSize = this.ryw__disText.fontSize;
        }
        onEnable() {
            this.ryw__displaySp.on(Laya.Event.CLICK, this, this.ryw_onSpClick);
        }
        onDisable() {
            this.ryw__displaySp.off(Laya.Event.CLICK, this, this.ryw_onSpClick);
        }
        ryw_setData(data) {
            if (data) {
                var self = this;
                this.ryw__displaySp.loadImage(data.logo, Laya.Handler.create(this, function () {
                    if (!self.ryw__displaySp.destroyed) {
                        self.ryw__displaySp.width = self.ryw__originW;
                        self.ryw__displaySp.height = self.ryw__originH;
                    }
                }));
                var str = String(data.title);
                var num = str.length;
                num = Math.max(5, num);
                var fontSize = Math.floor((5 / num) * this.ryw__fontSize);
                this.ryw__disText.fontSize = fontSize;
                this.ryw__disText.text = str;
                this.ryw__data = data;
            }
        }
        ryw_onSpClick() {
            var data = this.ryw__data;
            if (data) {
                console.log("跳转游戏： " + data.title);
                if (Laya.Browser.onMiniGame) {
                    ryw_WXAPI.ryw_navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        ryw_ShareAd.ryw_reportUserClick(data.appid);
                        ryw_ALD.ryw_aldSendReportAdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败");
                        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            ryw_ALD.ryw_aldSendReportAdClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQGMiniGame) {
                    ryw_OPPOAPI.ryw_navigateToMiniProgram(data.appid, data.title, data.url, (res) => {
                        console.log("跳转成功");
                        ryw_ShareAd.ryw_reportUserClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQQMiniGame) {
                    ryw_QQMiniGameAPI.ryw_navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        ryw_ShareAd.ryw_reportUserClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
            }
        }
    }

    class ryw_HorizontalLoopAdView extends Laya.Script {
        constructor() {
            super(...arguments);
            this.ryw_AdPosID = ryw_ShareAd.ryw_LoopAdLocationID;
            this.ryw__scrollForward = true;
        }
        onAwake() {
            this.ryw__list = this.owner.getChildByName("List");
            this.ryw__list.renderHandler = Laya.Handler.create(this, this.ryw_onListRender, null, false);
            this.ryw__list.hScrollBarSkin = "";
        }
        onEnable() {
            var self = this;
            ryw_ShareAd.ryw_getADVs(this.ryw_AdPosID, (datas) => {
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
                        this.ryw__list.array = temp;
                    }
                    else {
                        this.ryw__list.array = datas;
                    }
                }
            });
        }
        onDisable() {
        }
        onUpdate() {
            if (this.ryw__scrollForward) {
                this.ryw__list.scrollBar.value += 100 * Laya.timer.delta / 1000;
                if (this.ryw__list.scrollBar.value >= this.ryw__list.scrollBar.max) {
                    this.ryw__scrollForward = false;
                }
            }
            else {
                this.ryw__list.scrollBar.value -= 100 * Laya.timer.delta / 1000;
                if (this.ryw__list.scrollBar.value <= 0) {
                    this.ryw__scrollForward = true;
                }
            }
        }
        ryw_onListRender(cell, index) {
            var data = this.ryw__list.array[index];
            var loopAdBox = cell.getComponent(ryw_LoopAdBox);
            loopAdBox.ryw_setData(data);
        }
    }

    class ryw_BannerAdView extends Laya.Script {
        constructor() {
            super(...arguments);
            this.ryw_AdPosID = ryw_ShareAd.ryw_BannerAdLocationID;
            this.ryw__data = null;
            this.ryw__wxBanner = null;
            this._onLoad = null;
            this._onError = null;
            this._onResize = null;
        }
        onAwake() {
            this.ryw__displaySp = this.owner.getChildByName("Display");
            if (null == this.ryw__displaySp) {
                this.ryw__displaySp = this.owner;
            }
        }
        onEnable() {
            this.ryw__displaySp.on(Laya.Event.CLICK, this, this.ryw_onSpClick);
            var banner = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_banner;
            if (0 == banner) {
                this.ryw_refreshBannerDis();
                let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
                Laya.timer.loop(bannerRecreateTime * 1000, this, this.ryw_refreshBannerDis);
            }
            else if (1 == banner) {
                this.ryw_refreshWXBanner();
                let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
                Laya.timer.loop(bannerRecreateTime * 1000, this, this.ryw_refreshWXBanner);
            }
        }
        onDisable() {
            this.ryw__displaySp.off(Laya.Event.CLICK, this, this.ryw_onSpClick);
            this.ryw_clearWXBaner();
        }
        ryw_refreshBannerDis() {
            var self = this;
            ryw_ShareAd.ryw_getADVs(this.ryw_AdPosID, (datas) => {
                if (datas && datas.length > 0) {
                    var data = datas[Math.floor(Math.random() * datas.length)];
                    self.ryw__displaySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                        if (!self.ryw__displaySp.destroyed) {
                            self.ryw__displaySp.width = 750;
                            self.ryw__displaySp.height = 256;
                        }
                    }));
                    self.ryw__data = data;
                }
            }, false);
        }
        ryw_onSpClick() {
            var data = this.ryw__data;
            if (data) {
                console.log("跳转游戏： " + data.title);
                if (Laya.Browser.onMiniGame) {
                    ryw_WXAPI.ryw_navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        ryw_ShareAd.ryw_reportUserClick(data.appid);
                        ryw_ALD.ryw_aldSendReportAdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败");
                        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            ryw_ALD.ryw_aldSendReportAdClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQGMiniGame) {
                    ryw_OPPOAPI.ryw_navigateToMiniProgram(data.appid, data.title, data.url, (res) => {
                        console.log("跳转成功");
                        ryw_ShareAd.ryw_reportUserClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQQMiniGame) {
                    ryw_QQMiniGameAPI.ryw_navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        ryw_ShareAd.ryw_reportUserClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.ryw_AD_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
            }
        }
        ryw_refreshWXBanner() {
            if ((!Laya.Browser.onMiniGame && !Laya.Browser.onQQMiniGame)
                || !this.owner.visible)
                return;
            this.ryw_clearWXBaner();
            var self = this;
            let sysInfo = null;
            if (Laya.Browser.onMiniGame) {
                sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            }
            else if (Laya.Browser.onQQMiniGame) {
                sysInfo = Laya.Browser.window["qq"].getSystemInfoSync();
            }
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            var pos = this.ryw__displaySp.localToGlobal(new Laya.Point(0, 0));
            var left = pos.x / Laya.stage.width * sw;
            var top = pos.y / Laya.stage.height * sh;
            var width = this.ryw_WXBannerWidth ? this.ryw_WXBannerWidth / Laya.stage.width * sw : sw;
            if (Laya.Browser.onMiniGame) {
                let recreateBannerIDList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_recreateBannerIDList;
                let bannerAdUnitId = recreateBannerIDList[Math.floor(Math.random() * recreateBannerIDList.length)];
                if (null == bannerAdUnitId) {
                    bannerAdUnitId = ryw_WXAPI.ryw_bannerAdUnitId;
                }
                self.ryw__wxBanner = Laya.Browser.window["wx"].createBannerAd({
                    adUnitId: bannerAdUnitId,
                    adIntervals: 30,
                    style: {
                        left: left,
                        top: top,
                        width: width,
                    }
                });
                self.ryw__wxBanner.onLoad((res) => {
                    console.log("WXBanner广告 加载完成");
                    console.log(res);
                });
                self.ryw__wxBanner.onError((err) => {
                    console.log("WXBanner广告 加载失败");
                    console.log(err);
                    self.ryw_refreshBannerDis();
                    self.ryw_clearWXBaner();
                });
                self.ryw__wxBanner.onResize(res => {
                });
                self.ryw__wxBanner.show();
            }
            else if (Laya.Browser.onQQMiniGame) {
                let recreateBannerIDList = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_recreateBannerIDList;
                let bannerAdUnitId = recreateBannerIDList[Math.floor(Math.random() * recreateBannerIDList.length)];
                if (null == bannerAdUnitId) {
                    bannerAdUnitId = ryw_QQMiniGameAPI.ryw_bannerAdUnitId;
                }
                self.ryw__wxBanner = Laya.Browser.window["qq"].createBannerAd({
                    adUnitId: bannerAdUnitId,
                    adIntervals: 30,
                    style: {
                        left: left,
                        top: top,
                        width: width,
                    }
                });
                if (null != self.ryw__wxBanner) {
                    self._onLoad = (res) => {
                        console.log("QQBanner广告 加载完成 : ", bannerAdUnitId);
                        console.log(res);
                        self.ryw__wxBanner.show();
                    };
                    self.ryw__wxBanner.onLoad(self._onLoad);
                    self._onError = (err) => {
                        console.log("QQBanner广告 加载失败 : ", bannerAdUnitId);
                        console.log(err);
                        self.ryw_refreshBannerDis();
                        self.ryw_clearWXBaner();
                    };
                    self.ryw__wxBanner.onError(self._onError);
                    self._onResize = (res) => {
                    };
                    self.ryw__wxBanner.onResize(self._onResize);
                }
                else {
                    self.ryw_refreshBannerDis();
                }
            }
        }
        ryw_clearWXBaner() {
            if (this.ryw__wxBanner) {
                this.ryw__wxBanner.offLoad(this._onLoad);
                this.ryw__wxBanner.offError(this._onError);
                this.ryw__wxBanner.offResize(this._onResize);
                this.ryw__wxBanner.destroy();
            }
            this.ryw__wxBanner = null;
        }
        onViewShow() {
            var banner = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_banner;
            if (1 == banner && null == this.ryw__wxBanner) {
                this.ryw_refreshWXBanner();
                let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
                Laya.timer.loop(bannerRecreateTime * 1000, this, this.ryw_refreshWXBanner);
            }
            else {
                this.ryw_refreshBannerDis();
                let bannerRecreateTime = ryw_AppSwitchConfig.ryw_getInstance().ryw_getAppSwitchData().ryw_bannerRecreateTime;
                Laya.timer.loop(bannerRecreateTime * 1000, this, this.ryw_refreshBannerDis);
            }
        }
        onViewHide() {
            this.ryw_clearWXBaner();
            Laya.timer.clearAll(this);
        }
        onDestroy() {
            this.ryw_clearWXBaner();
            Laya.timer.clearAll(this);
        }
    }

    class ryw_UniversalBottomZone extends Laya.Script {
        onAwake() {
            this.ryw__ownerSprite = this.owner;
            this.ryw__autoZone = this.ryw__ownerSprite.getChildByName("AutoZone");
            this.ryw__loopADZone = this.ryw__ownerSprite.getChildByName("LoopAD");
            this.ryw__bannerADZone = this.ryw__ownerSprite.getChildByName("BannerAD");
            this.ryw__bannerAd = this.ryw__bannerADZone.getComponent(ryw_BannerAdView);
        }
        onEnable() {
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                this.ryw__autoZone.bottom = this.ryw__loopADZone.height + this.ryw__bannerADZone.height;
                this.ryw__loopADZone.bottom = this.ryw__bannerADZone.height;
                this.ryw__bannerADZone.visible = true;
            }
            else {
                this.ryw__autoZone.bottom = this.ryw__loopADZone.height;
                this.ryw__loopADZone.bottom = 0;
                this.ryw__bannerADZone.visible = false;
            }
        }
        onDisable() {
        }
        onUpdate() {
            if (!this.ryw__bannerADZone.visible) {
                this.ryw__bannerAd.ryw_clearWXBaner();
            }
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Mgr/GameMgr.ts", ryw_GameMgr);
            reg("KRQ/Com/KRQ_LoopAd/KRQ_LoopAdBox.ts", ryw_KRQ_LoopAdBox);
            reg("KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd.ts", ryw_KRQ_VLoopAd);
            reg("KRQ/Com/KRQ_Banner.ts", ryw_KRQ_Banner);
            reg("KRQ/ViewCom/KRQ_Export.ts", ryw_KRQ_Export);
            reg("KRQ/Com/KRQ_History/KRQ_HistoryBox.ts", ryw_KRQ_HistoryBox);
            reg("KRQ/Com/KRQ_History/KRQ_History.ts", ryw_KRQ_History);
            reg("KRQ/Com/KRQ_RockSingleAd.ts", ryw_KRQ_RockSingleAd);
            reg("KRQ/ViewCom/KRQ_Floating.ts", ryw_KRQ_Floating);
            reg("KRQ/Com/KRQ_RollSingleAd.ts", ryw_KRQ_RollSingleAd);
            reg("KRQ/ViewCom/KRQ_GameOver.ts", ryw_KRQ_GameOver);
            reg("KRQ/ViewCom/KRQ_SidePull.ts", ryw_KRQ_SidePull);
            reg("KRQ/Com/KRQ_LoopAd/KRQ_HLoopAd.ts", ryw_KRQ_HLoopAd);
            reg("KRQ/ViewCom/KRQ_Main.ts", ryw_KRQ_Main);
            reg("KRQ/Com/KRQ_SingleAd.ts", ryw_KRQ_SingleAd);
            reg("KRQ/Com/KRQ_GamingBanner.ts", ryw_KRQ_GamingBanner);
            reg("View/MainView/GameOverView.ts", GameOverView);
            reg("View/ButtonAnim.ts", ryw_ButtonAnim);
            reg("View/MainView/LevelTitle.ts", LevelTitle);
            reg("View/MainView/GameView.ts", GameView);
            reg("View/MainView/MoreGameView.ts", MoreGameView);
            reg("View/TwinkleSprite.ts", ryw_TwinkleSprite);
            reg("View/ClickGetPrize/ClickGetPrize.ts", ryw_ClickGetPrize);
            reg("View/LoadingView/LoadingView.ts", ryw_LoadingView);
            reg("View/TemplateViews/Export2/Exprot2ViewTemplate.ts", ryw_Exprot2ViewTemplate);
            reg("View/Common/ViewAutoScaleByW.ts", ViewAutoScaleByW);
            reg("View/TemplateViews/Export3/Exprot3ViewTemplate.ts", ryw_Exprot3ViewTemplate);
            reg("View/TemplateViews/Export/ExportViewTemplate.ts", ryw_ExportViewTemplate);
            reg("View/TemplateViews/GameFail/GameFailViewTemplate.ts", ryw_GameFailViewTemplate);
            reg("View/TemplateViews/GameWin/GameWinViewTemplate.ts", ryw_GameWinViewTemplate);
            reg("View/TemplateViews/InGame/InGameViewTemplate.ts", ryw_InGameViewTemplate);
            reg("View/TemplateViews/Main/MainViewTemplate.ts", ryw_MainViewTemplate);
            reg("View/TemplateViews/MiniGame/MiniGameViewTemplate.ts", ryw_MiniGameViewTemplate);
            reg("View/TemplateViews/OPPONativeAd/OPPONativeAdViewTemplate.ts", ryw_OPPONativeAdViewTemplate);
            reg("View/QQTemplate/QQCrazyClick/QQCrazyClick.ts", ryw_QQCrazyClick);
            reg("View/QQTemplate/QQCrazyClick/QQCrazyClick2.ts", ryw_QQCrazyClick2);
            reg("View/QQTemplate/GameFail/QQGameFailViewTemplate.ts", ryw_QQGameFailViewTemplate);
            reg("View/QQTemplate/GameWin/QQGameWinViewTemplate.ts", ryw_QQGameWinViewTemplate);
            reg("View/QQTemplate/InGame/QQInGameViewTemplate.ts", ryw_QQInGameViewTemplate);
            reg("View/QQTemplate/Main/QQMainViewTemplate.ts", ryw_QQMainViewTemplate);
            reg("View/TemplateViews/Reward/RewardViewTemplate.ts", ryw_RewardViewTemplate);
            reg("View/TTTemplate/TTCrazyClick/TTCrazyClick.ts", ryw_TTCrazyClick);
            reg("View/TTTemplate/GameFail/TTGameFailViewTemplate.ts", ryw_TTGameFailViewTemplate);
            reg("View/TTTemplate/GameWin/TTGameWinViewTemplate.ts", ryw_TTGameWinViewTemplate);
            reg("View/TTTemplate/Main/TTMainViewTemplate.ts", ryw_TTMainViewTemplate);
            reg("View/TTTemplate/MoreReward/TTMoreReward.ts", ryw_TTMoreReward);
            reg("View/TTTemplate/Resurrection/TTResurrection.ts", ryw_TTResurrection);
            reg("View/TTTemplate/Reward/TTReward.ts", ryw_TTReward);
            reg("View/TTTemplate/Reward/RewardBox.ts", ryw_RewardBox);
            reg("View/TTTemplate/SignIn/TTSignIn.ts", ryw_TTSignIn);
            reg("View/TTTemplate/SkinTips/TTSkinTips.ts", ryw_TTSkinTips);
            reg("View/TTTemplate/Store/TTStore.ts", ryw_TTStore);
            reg("View/TTTemplate/Store/StoreBox.ts", ryw_StoreBox);
            reg("View/TTTemplate/Store/PageList.ts", ryw_PageList);
            reg("View/VVTemplate/NativeAd/VVNativeAd1View.ts", VVNativeAd1View);
            reg("View/VVTemplate/NativeAd/VVNativeAd2View.ts", VVNativeAd2View);
            reg("View/TemplateViews/WXCrazyClick/WXCrazyClick.ts", WXCrazyClick);
            reg("View/TipsView/TipsView.ts", ryw_TipsView);
            reg("ShareAd/View/LoopAdBox.ts", ryw_LoopAdBox);
            reg("ShareAd/View/HorizontalLoopAdView.ts", ryw_HorizontalLoopAdView);
            reg("ShareAd/View/BannerAdView.ts", ryw_BannerAdView);
            reg("View/Common/UniversalBottomZone.ts", ryw_UniversalBottomZone);
        }
    }
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
    GameConfig.init();

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var View;
        (function (View) {
            class LoadingUI extends Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(LoadingUI.uiView);
                }
            }
            LoadingUI.uiView = { "type": "Scene", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Image", "props": { "top": 0, "skin": "res/loading_bg_1.png", "sizeGrid": "3,3,3,3", "right": 0, "left": 0, "bottom": 0 }, "compId": 25 }, { "type": "Image", "props": { "y": 249, "x": 123, "skin": "res/logo.png" }, "compId": 26 }, { "type": "Clip", "props": { "y": 0, "x": 1, "width": 750, "name": "Bg", "height": 1334 }, "compId": 6, "child": [{ "type": "Clip", "props": { "right": 0, "name": "BottomZone", "left": 0, "height": 570, "bottom": 100 }, "compId": 23, "child": [{ "type": "Clip", "props": { "y": 326, "x": 376, "width": 615, "skin": "res/loadingxiatiao.png", "pivotY": 22, "pivotX": 308, "name": "processBarBg", "height": 44, "sizeGrid": "0,25,0,25" }, "compId": 8, "child": [{ "type": "Clip", "props": { "y": 22, "x": 10, "width": 594, "skin": "res/loadingshangtiao.png", "pivotY": 13, "name": "processBar", "left": 11, "height": 26, "bottom": 9, "sizeGrid": "0,12,0,12" }, "compId": 5 }, { "type": "Sprite", "props": { "y": -24, "x": 292, "width": 143, "texture": "res/ziyuanjiazaizhong.png", "pivotY": 12, "pivotX": 72, "height": 23 }, "compId": 10, "child": [{ "type": "Sprite", "props": { "y": 15, "x": 149, "width": 6, "texture": "res/jiazaidunhao.png", "height": 5 }, "compId": 11 }, { "type": "Sprite", "props": { "y": 15, "x": 159, "width": 6, "texture": "res/jiazaidunhao.png", "height": 5 }, "compId": 12 }, { "type": "Sprite", "props": { "y": 15, "x": 168, "width": 6, "texture": "res/jiazaidunhao.png", "height": 5 }, "compId": 13 }] }] }] }] }, { "type": "Script", "props": { "y": 0, "x": 0, "runtime": "View/LoadingView/LoadingView.ts" }, "compId": 7 }], "loadList": ["res/loading_bg_1.png", "res/logo.png", "res/loadingxiatiao.png", "res/loadingshangtiao.png", "res/ziyuanjiazaizhong.png", "res/jiazaidunhao.png"], "loadList3D": [] };
            View.LoadingUI = LoadingUI;
            REG("ui.View.LoadingUI", LoadingUI);
        })(View = ui.View || (ui.View = {}));
    })(ui || (ui = {}));

    class Main {
        constructor() {
            this._loadingUI = null;
            this._loadingView = null;
            this._preLoadRes = new Array();
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            if (true == ryw_AppConfig.onTTMiniGame) {
                Laya.Browser.onMiniGame = false;
            }
            if (!Laya.Browser.onMiniGame
                && !Laya.Browser.onQGMiniGame
                && !Laya.Browser.onQQMiniGame
                && !ryw_AppConfig.onTTMiniGame) {
                ryw_AppConfig.ryw_ResServer = ryw_AppConfig.ryw_LocalTestReServer;
            }
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            Laya.loader.maxLoader = 50;
            this.initLoadingView();
            var firstConfigs = [
                { url: ryw_AppConfig.ryw_ResServer + "/json/appswitch.json", type: Laya.Loader.JSON }
            ];
            var self = this;
            Laya.loader.load(firstConfigs, Laya.Handler.create(this, () => {
                self.loadRes();
            }));
            ryw_EventMgr.ryw_instance.ryw_regOnceEvent(ryw_EventDef.ryw_App_CloseFirstLoadingView, this, this.closeloadingUI);
        }
        initLoadingView() {
            this._loadingUI = new ui.View.LoadingUI();
            Laya.stage.addChild(this._loadingUI);
            this._loadingUI.width = Laya.stage.width;
            this._loadingUI.height = Laya.stage.height;
            this._loadingUI.zOrder = 2;
            this._loadingView = this._loadingUI.getComponent(ryw_LoadingView);
            this._loadingView.ryw_setProcess(0);
        }
        postResToOpenDataContext(onComplate) {
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
        }
        preLoad() {
            this._preLoadRes.push({ url: ryw_AppConfig.ryw_ResServer + "/json/storeconfig.json", type: Laya.Loader.JSON });
        }
        loadRes() {
            this.preLoad();
            var resource = this._preLoadRes;
            var self = this;
            if (Laya.Browser.onMiniGame) {
                var loadSubResTask = Laya.Browser.window["wx"].loadSubpackage({
                    name: 'subRes',
                    success: (res) => {
                        if (resource.length > 0) {
                            Laya.loader.load(resource, Laya.Handler.create(this, () => {
                                self.onLoadResComplate();
                            }), Laya.Handler.create(this, (res) => {
                                self._loadingView.ryw_setProcess(res / 2 + 0.5);
                            }));
                        }
                        else {
                            self.onLoadResComplate();
                        }
                    },
                    fail: (res) => {
                        this.loadRes();
                    }
                });
                loadSubResTask.onProgressUpdate(res => {
                    self._loadingView.ryw_setProcess(res / 2);
                });
            }
            else if (Laya.Browser.onQGMiniGame) {
                var loadSubResTask = Laya.Browser.window["qg"].loadSubpackage({
                    name: 'subRes',
                    success: (res) => {
                        if (resource.length > 0) {
                            Laya.loader.load(resource, Laya.Handler.create(this, () => {
                                self.onLoadResComplate();
                            }), Laya.Handler.create(this, (res) => {
                                self._loadingView.ryw_setProcess(res / 2 + 0.5);
                            }));
                        }
                        else {
                            self.onLoadResComplate();
                        }
                    },
                    fail: (res) => {
                        this.loadRes();
                    }
                });
                loadSubResTask.onProgressUpdate(res => {
                    var progress = res["progress"];
                    var totalBytesWritten = res["totalBytesWritten"];
                    var totalBytesExpectedToWrite = res["totalBytesExpectedToWrite"];
                    self._loadingView.ryw_setProcess(progress / 2);
                });
            }
            else if (Laya.Browser.onQQMiniGame) {
                var loadSubResTask = Laya.Browser.window["qq"].loadSubpackage({
                    name: 'subRes',
                    success: (res) => {
                        if (resource.length > 0) {
                            Laya.loader.load(resource, Laya.Handler.create(this, () => {
                                self.onLoadResComplate();
                            }), Laya.Handler.create(this, (res) => {
                                self._loadingView.ryw_setProcess(res / 2 + 0.5);
                            }));
                        }
                        else {
                            self.onLoadResComplate();
                        }
                    },
                    fail: (res) => {
                        this.loadRes();
                    }
                });
                loadSubResTask.onProgressUpdate(res => {
                    self._loadingView.ryw_setProcess(res / 2);
                });
            }
            else {
                if (resource.length > 0) {
                    Laya.loader.load(resource, Laya.Handler.create(this, () => {
                        self.onLoadResComplate();
                    }), Laya.Handler.create(this, (res) => {
                        self._loadingView.ryw_setProcess(res);
                    }));
                }
                else {
                    self.onLoadResComplate();
                }
            }
        }
        onLoadResComplate() {
            var self = this;
            this._loadingView.ryw_setProcess(1);
            if (Laya.Browser.onMiniGame) {
                ryw_WXAPI.ryw_wxLogin(function (code) {
                    ryw_User.ryw_code = code;
                    ryw_HttpUnit.ryw_login((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            ryw_User.ryw_token = res.data.token;
                            ryw_User.ryw_openId = res.data.openid;
                            ryw_ALD.ryw_aldSendOpenId(ryw_User.ryw_openId);
                            ryw_HttpUnit.ryw_getGameData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    ryw_User.ryw_initiUser(res.data);
                                }
                                else {
                                    ryw_User.ryw_initiUser(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                ryw_User.ryw_token = "";
                                ryw_User.ryw_openId = "";
                                ryw_User.ryw_initiUser(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！" + res);
                            ryw_User.ryw_initiUser(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！" + res);
                        ryw_User.ryw_initiUser(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else if (Laya.Browser.onQGMiniGame) {
                ryw_OPPOAPI.ryw_initAdService(() => {
                }, () => {
                }, () => {
                });
                ryw_OPPOAPI.ryw_Login(function (token) {
                    ryw_User.ryw_code = token;
                    ryw_HttpUnit.ryw_login((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            ryw_User.ryw_token = res.data.token;
                            ryw_User.ryw_openId = res.data.openid;
                            ryw_HttpUnit.ryw_getGameData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    ryw_User.ryw_initiUser(res.data);
                                    console.log("获取用户数据--------------------Start");
                                    for (var key in res.data) {
                                        console.log(key, res.data[key]);
                                    }
                                    console.log("获取用户数据--------------------End");
                                }
                                else {
                                    ryw_User.ryw_initiUser(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                ryw_User.ryw_token = "";
                                ryw_User.ryw_openId = "";
                                ryw_User.ryw_initiUser(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！", res);
                            ryw_User.ryw_initiUser(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！", res);
                        ryw_User.ryw_initiUser(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else if (Laya.Browser.onQQMiniGame) {
                ryw_QQMiniGameAPI.ryw_Login(function (code) {
                    ryw_User.ryw_code = code;
                    ryw_HttpUnit.ryw_login((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            ryw_User.ryw_token = res.data.token;
                            ryw_User.ryw_openId = res.data.openid;
                            ryw_ALD.ryw_aldSendOpenId(ryw_User.ryw_openId);
                            ryw_HttpUnit.ryw_getGameData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    ryw_User.ryw_initiUser(res.data);
                                }
                                else {
                                    ryw_User.ryw_initiUser(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                ryw_User.ryw_token = "";
                                ryw_User.ryw_openId = "";
                                ryw_User.ryw_initiUser(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！" + res);
                            ryw_User.ryw_initiUser(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！" + res);
                        ryw_User.ryw_initiUser(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else if (ryw_AppConfig.onTTMiniGame) {
                ryw_TTAPI.ryw_ttLogin(function (code) {
                    ryw_User.ryw_code = code;
                    ryw_HttpUnit.ryw_login((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            ryw_User.ryw_token = res.data.token;
                            ryw_User.ryw_openId = res.data.openid;
                            ryw_HttpUnit.ryw_getGameData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    ryw_User.ryw_initiUser(res.data);
                                }
                                else {
                                    ryw_User.ryw_initiUser(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                ryw_User.ryw_token = "";
                                ryw_User.ryw_openId = "";
                                ryw_User.ryw_initiUser(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！" + res);
                            ryw_User.ryw_initiUser(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！" + res);
                        ryw_User.ryw_initiUser(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, () => {
                    ryw_User.ryw_initiUser(null);
                    GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                    }));
                });
            }
            else if (Laya.Browser.onVVMiniGame) {
                let login = () => {
                    VIVOAPI.Login(function (token, type) {
                        success(token);
                    }, function () {
                        fail();
                    });
                };
                let success = (code) => {
                    ryw_User.ryw_code = code;
                    ryw_HttpUnit.ryw_login((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            ryw_User.ryw_token = res.data.token;
                            ryw_User.ryw_openId = res.data.openid;
                            ryw_HttpUnit.ryw_getGameData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    ryw_User.ryw_initiUser(res.data);
                                    console.log("获取用户数据--------------------Start");
                                    for (var key in res.data) {
                                        console.log(key, res.data[key]);
                                    }
                                    console.log("获取用户数据--------------------End");
                                }
                                else {
                                    ryw_User.ryw_initiUser(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                ryw_User.ryw_token = "";
                                ryw_User.ryw_openId = "";
                                ryw_User.ryw_initiUser(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！", res);
                            ryw_User.ryw_initiUser(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！", res);
                        ryw_User.ryw_initiUser(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                };
                let failCounter = 0;
                let fail = () => {
                    if (failCounter >= 1) {
                        console.log("vivo 登陆失败！！！重试次数已达上限");
                        ryw_User.ryw_initiUser(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                        return;
                    }
                    VIVOAPI.showDialog("提示", "登录失败，点击确定按钮重试", [
                        {
                            text: '确定',
                            color: '#33dd44'
                        }
                    ], () => {
                        login();
                        ++failCounter;
                    }, () => {
                    }, () => {
                    });
                };
                login();
            }
            else {
                ryw_User.ryw_testInitUser();
                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                }));
            }
        }
        closeloadingUI() {
            if (this._loadingUI && !this._loadingUI.destroyed) {
                this._loadingUI.destroy();
            }
        }
    }
    new Main();
    if (Laya.Browser.window) {
        Laya.Browser.window.NativeCallback = NativeCallback;
    }

}());
//# sourceMappingURL=bundle.js.map
