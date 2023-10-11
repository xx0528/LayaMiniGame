(function () {
    'use strict';

    var EventDispatcher = Laya.EventDispatcher;
    class Event_sdlyg_Mgr extends EventDispatcher {
        constructor() {
            super();
        }
        ;
        dispatch(InName, agv) {
            Event_sdlyg_Mgr.eventDispatcher.event(InName, agv);
        }
        regEvemt(InName, caller, listener, arg) {
            Event_sdlyg_Mgr.eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
        }
        regOnceEvent(InName, caller, listener, arg) {
            Event_sdlyg_Mgr.eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
        }
        removeEvent(InName, caller, listener, arg) {
            Event_sdlyg_Mgr.eventDispatcher.off(InName, caller, listener);
        }
    }
    Event_sdlyg_Mgr.eventDispatcher = new EventDispatcher();
    Event_sdlyg_Mgr.instance = new Event_sdlyg_Mgr();

    var Event_sdlyg_Def;
    (function (Event_sdlyg_Def) {
        Event_sdlyg_Def[Event_sdlyg_Def["None"] = 0] = "None";
        Event_sdlyg_Def[Event_sdlyg_Def["App_CloseFirstLoadingView"] = 500] = "App_CloseFirstLoadingView";
        Event_sdlyg_Def[Event_sdlyg_Def["AD_OnShareAdFail"] = 501] = "AD_OnShareAdFail";
        Event_sdlyg_Def[Event_sdlyg_Def["Game_OnViewOpen"] = 600] = "Game_OnViewOpen";
        Event_sdlyg_Def[Event_sdlyg_Def["Game_OnViewClose"] = 601] = "Game_OnViewClose";
        Event_sdlyg_Def[Event_sdlyg_Def["Game_OnUserMoneyChange"] = 701] = "Game_OnUserMoneyChange";
        Event_sdlyg_Def[Event_sdlyg_Def["Game_OnUserCrystalChange"] = 702] = "Game_OnUserCrystalChange";
        Event_sdlyg_Def[Event_sdlyg_Def["Game_OnLevelStart"] = 1000] = "Game_OnLevelStart";
        Event_sdlyg_Def[Event_sdlyg_Def["Game_OnLevelComplate"] = 1001] = "Game_OnLevelComplate";
        Event_sdlyg_Def[Event_sdlyg_Def["AD_WudianBanner_LoadComplete"] = 2217] = "AD_WudianBanner_LoadComplete";
        Event_sdlyg_Def[Event_sdlyg_Def["AD_WudianBanner_Show"] = 2218] = "AD_WudianBanner_Show";
        Event_sdlyg_Def[Event_sdlyg_Def["AD_WudianBanner_Hide"] = 2219] = "AD_WudianBanner_Hide";
        Event_sdlyg_Def[Event_sdlyg_Def["AD_WudianBanner_PreLoad"] = 2220] = "AD_WudianBanner_PreLoad";
        Event_sdlyg_Def[Event_sdlyg_Def["GameStart"] = 10001] = "GameStart";
        Event_sdlyg_Def[Event_sdlyg_Def["GameOver"] = 10002] = "GameOver";
        Event_sdlyg_Def[Event_sdlyg_Def["ChooseProp"] = 10003] = "ChooseProp";
        Event_sdlyg_Def[Event_sdlyg_Def["ChangeBall"] = 10004] = "ChangeBall";
        Event_sdlyg_Def[Event_sdlyg_Def["GetNewSkin"] = 10005] = "GetNewSkin";
        Event_sdlyg_Def[Event_sdlyg_Def["LastBall"] = 10006] = "LastBall";
        Event_sdlyg_Def[Event_sdlyg_Def["ChangePage"] = 10007] = "ChangePage";
        Event_sdlyg_Def[Event_sdlyg_Def["ResetIcon"] = 10008] = "ResetIcon";
        Event_sdlyg_Def[Event_sdlyg_Def["SubBall"] = 10009] = "SubBall";
        Event_sdlyg_Def[Event_sdlyg_Def["PlayerUpdatePos"] = 10010] = "PlayerUpdatePos";
        Event_sdlyg_Def[Event_sdlyg_Def["HideGuide"] = 10011] = "HideGuide";
        Event_sdlyg_Def[Event_sdlyg_Def["ChangeGamingPic"] = 10012] = "ChangeGamingPic";
        Event_sdlyg_Def[Event_sdlyg_Def["HideGamingPic"] = 10013] = "HideGamingPic";
        Event_sdlyg_Def[Event_sdlyg_Def["ShowrRewardIcon"] = 10014] = "ShowrRewardIcon";
        Event_sdlyg_Def[Event_sdlyg_Def["ShowWudianBanner"] = 10015] = "ShowWudianBanner";
        Event_sdlyg_Def[Event_sdlyg_Def["MoreGameView"] = 20001] = "MoreGameView";
        Event_sdlyg_Def[Event_sdlyg_Def["OutMoreGameView"] = 20002] = "OutMoreGameView";
        Event_sdlyg_Def[Event_sdlyg_Def["OutSideADView"] = 20003] = "OutSideADView";
        Event_sdlyg_Def[Event_sdlyg_Def["RewardVideoSuccess"] = 20004] = "RewardVideoSuccess";
        Event_sdlyg_Def[Event_sdlyg_Def["RewardVideoFail"] = 20005] = "RewardVideoFail";
    })(Event_sdlyg_Def || (Event_sdlyg_Def = {}));

    class UserGameData {
        constructor() {
            this.levelNum = 0;
            this.moneyNum = 0;
            this.crystalNum = 0;
            this.bag = new Array();
            this.club = "normal";
            this.people = "people2";
            this.ball = "normal";
            this.needCoin = 100;
            this.rank_level = 0;
        }
    }
    class Us_sdlyg_er extends Laya.Script {
        static get isLogin() {
            return (Us_sdlyg_er.code != "") || (Us_sdlyg_er.token != "");
        }
        static getSaveData() {
            return JSON.stringify(Us_sdlyg_er._gameData);
        }
        static testInitUser() {
            Us_sdlyg_er._gameData.levelNum = Number(Laya.LocalStorage.getItem("levelNum"));
            Us_sdlyg_er._gameData.moneyNum = Number(Laya.LocalStorage.getItem("moneyNum"));
            Us_sdlyg_er._gameData.crystalNum = Number(Laya.LocalStorage.getItem("crystalNum"));
            var clubStr = Laya.LocalStorage.getItem("club");
            if (clubStr == "" || clubStr == null) {
                Us_sdlyg_er._gameData.club = "normal";
            }
            else {
                Us_sdlyg_er._gameData.people = clubStr;
            }
            var peopleStr = Laya.LocalStorage.getItem("people");
            if (peopleStr == "" || peopleStr == null) {
                Us_sdlyg_er._gameData.people = "people2";
            }
            else {
                Us_sdlyg_er._gameData.people = peopleStr;
            }
            var ballStr = Laya.LocalStorage.getItem("ball");
            if (ballStr == "" || ballStr == null) {
                Us_sdlyg_er._gameData.ball = "normal";
            }
            else {
                Us_sdlyg_er._gameData.ball = ballStr;
            }
            var bagStr = Laya.LocalStorage.getItem("bag");
            if (bagStr == "" || bagStr == null) {
                Us_sdlyg_er._gameData.bag = ["people2"];
            }
            else {
                Us_sdlyg_er._gameData.bag = JSON.parse(bagStr);
            }
            Us_sdlyg_er._gameData.needCoin = 100;
            Us_sdlyg_er._gameData.rank_level = Number(Laya.LocalStorage.getItem("rank_level"));
        }
        static initiUser(data) {
            if (data && 0 != data) {
                Us_sdlyg_er._gameData.levelNum = data.levelNum;
                Us_sdlyg_er._gameData.moneyNum = data.moneyNum;
                Us_sdlyg_er._gameData.crystalNum = data.crystalNum;
                Us_sdlyg_er._gameData.bag = data.bag;
                Us_sdlyg_er._gameData.club = data.club;
                Us_sdlyg_er._gameData.people = data.people;
                Us_sdlyg_er._gameData.ball = data.ball;
                if (!data.needCoin)
                    data.needCoin = 100;
                Us_sdlyg_er._gameData.needCoin = data.needCoin;
                if (!data.rank_level)
                    data.rank_level = 0;
                Us_sdlyg_er._gameData.rank_level = data.rank_level;
                console.log(data);
            }
            else {
                Us_sdlyg_er.testInitUser();
            }
        }
        static addLevelNum() {
            Us_sdlyg_er._gameData.levelNum++;
            Laya.LocalStorage.setItem("levelNum", Us_sdlyg_er._gameData.levelNum.toString());
        }
        static getLeveNum() {
            return Us_sdlyg_er._gameData.levelNum;
        }
        static addMoney(add) {
            add = Math.ceil(add);
            var last = Us_sdlyg_er._gameData.moneyNum;
            Us_sdlyg_er._gameData.moneyNum += add;
            Laya.LocalStorage.setItem("moneyNum", Us_sdlyg_er._gameData.moneyNum.toString());
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.Game_OnUserMoneyChange, {
                curr: Us_sdlyg_er._gameData.moneyNum,
                last: last
            });
        }
        static subMoney(sub) {
            sub = Math.ceil(sub);
            var last = Us_sdlyg_er._gameData.moneyNum;
            Us_sdlyg_er._gameData.moneyNum -= sub;
            if (Us_sdlyg_er._gameData.moneyNum < 0) {
                Us_sdlyg_er._gameData.moneyNum = 0;
            }
            Laya.LocalStorage.setItem("moneyNum", Us_sdlyg_er._gameData.moneyNum.toString());
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.Game_OnUserMoneyChange, {
                curr: Us_sdlyg_er._gameData.moneyNum,
                last: last
            });
        }
        static getMoney() {
            return Us_sdlyg_er._gameData.moneyNum;
        }
        static addCrystal(add) {
            add = Math.ceil(add);
            var last = Us_sdlyg_er._gameData.crystalNum;
            Us_sdlyg_er._gameData.crystalNum += add;
            Laya.LocalStorage.setItem("crystalNum", Us_sdlyg_er._gameData.crystalNum.toString());
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.Game_OnUserCrystalChange, {
                curr: Us_sdlyg_er._gameData.crystalNum,
                last: last
            });
        }
        static subCrystal(sub) {
            sub = Math.ceil(sub);
            var last = Us_sdlyg_er._gameData.crystalNum;
            Us_sdlyg_er._gameData.crystalNum -= sub;
            if (Us_sdlyg_er._gameData.crystalNum < 0) {
                Us_sdlyg_er._gameData.crystalNum = 0;
            }
            Laya.LocalStorage.setItem("crystalNum", Us_sdlyg_er._gameData.crystalNum.toString());
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.Game_OnUserCrystalChange, {
                curr: Us_sdlyg_er._gameData.crystalNum,
                last: last
            });
        }
        static getCrystal() {
            return Us_sdlyg_er._gameData.crystalNum;
        }
        static unlockProp(name) {
            Us_sdlyg_er._gameData.bag.push(name);
            var bagData = JSON.stringify(Us_sdlyg_er._gameData.bag);
            Laya.LocalStorage.setItem("bag", bagData);
        }
        static ownerProp(name) {
            let isOwner = false;
            for (let i = 0; i < Us_sdlyg_er._gameData.bag.length; i++) {
                if (Us_sdlyg_er._gameData.bag[i] == name) {
                    isOwner = true;
                    break;
                }
            }
            return isOwner;
        }
        static setSkin(people, club, ball) {
            Us_sdlyg_er._gameData.people = people;
            Us_sdlyg_er._gameData.club = club;
            Us_sdlyg_er._gameData.ball = ball;
            Laya.LocalStorage.setItem("people", Us_sdlyg_er._gameData.people);
            Laya.LocalStorage.setItem("club", Us_sdlyg_er._gameData.club);
            Laya.LocalStorage.setItem("ball", Us_sdlyg_er._gameData.ball);
        }
        static getSkinConfig() {
            return {
                people: Us_sdlyg_er._gameData.people,
                club: Us_sdlyg_er._gameData.club,
                ball: Us_sdlyg_er._gameData.ball
            };
        }
        static setNeedCoin() {
            Us_sdlyg_er._gameData.needCoin = Math.floor(Us_sdlyg_er._gameData.needCoin * 1.5);
            Laya.LocalStorage.setItem("rank_level", Us_sdlyg_er._gameData.rank_level.toString());
        }
        static getNeedCoin() {
            return Us_sdlyg_er._gameData.needCoin;
        }
        static ownerPropAll() {
            return (Us_sdlyg_er._gameData.bag.length >= 37);
        }
        static getRankLevel() {
            return Us_sdlyg_er._gameData.rank_level;
        }
        static addRankLevel() {
            Us_sdlyg_er._gameData.rank_level++;
            Laya.LocalStorage.setItem("rank_level", Us_sdlyg_er._gameData.rank_level.toString());
        }
        static subRankLevel() {
            Us_sdlyg_er._gameData.rank_level--;
            Us_sdlyg_er._gameData.rank_level = Math.max(0, Us_sdlyg_er._gameData.rank_level);
        }
    }
    Us_sdlyg_er.code = "";
    Us_sdlyg_er.openId = "";
    Us_sdlyg_er.token = null;
    Us_sdlyg_er.nickName = "";
    Us_sdlyg_er.gender = 0;
    Us_sdlyg_er._gameData = new UserGameData();

    class NetConfig {
    }
    NetConfig.state = 0;
    NetConfig.gameid = 44;
    NetConfig.serverUrl = "";
    NetConfig.Login = "";
    NetConfig.SaveGameData = "";
    NetConfig.GetUser = "";
    NetConfig.IpBlock = "";
    NetConfig.reportExport = "";
    NetConfig.reportImport = "";

    class AesTools {
        static encrypt(str) {
            return str;
        }
        static decrypt(str) {
            return str;
        }
    }
    AesTools.KEY = 'b#63fFJ6AvkK3YT*';
    AesTools.IV = 'J$f4DU%sNL73M&Go';

    class App_sdlyg_Config {
    }
    App_sdlyg_Config.AppID = "";
    App_sdlyg_Config.ResServer = "subRes";
    App_sdlyg_Config.LocalTestReServer = "subRes";
    App_sdlyg_Config.Versions = "0.0.0";
    App_sdlyg_Config.onTTMiniGame = false;

    class requestData {
        constructor() {
            this.meth = "post";
            this.url = "";
            this.onSuccess = null;
            this.onFail = null;
            this.data = {};
        }
    }
    class HttpUnit {
        static request(req) {
            if (req.url.indexOf("https://") > -1 ||
                req.url.indexOf("http://") > -1) {
                req.url = req.url;
            }
            else {
                req.url = NetConfig.serverUrl + req.url;
            }
            var completeFunc = (res) => {
                console.log(res, "http Success");
                if (req.onSuccess) {
                    req.onSuccess(res);
                }
                req.onSuccess = null;
                req = null;
            };
            var errorFunc = (res) => {
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
            let dataStr = JSON.stringify(req.data);
            if (Laya.Browser.onMiniGame || App_sdlyg_Config.onTTMiniGame) {
                req.data.code = Us_sdlyg_er.code;
            }
            else if (Laya.Browser.onQGMiniGame) {
                req.data.oppotoken = Us_sdlyg_er.code;
            }
            else if (Laya.Browser.onQQMiniGame) {
                req.data.code = Us_sdlyg_er.code;
            }
            else {
                req.data.code = Us_sdlyg_er.code;
            }
            var time = "time=" + String(Date.now());
            var header = [
                "Content-Type", "application/json",
                "state", NetConfig.state,
                "gameid", NetConfig.gameid,
                "sign", AesTools.encrypt(time),
            ];
            if (Us_sdlyg_er.token) {
                header.push("token");
                header.push(Us_sdlyg_er.token);
            }
            xhr.send(req.url, JSON.stringify(req.data), req.meth, "json", header);
        }
        static login(onSuccess, onFail) {
            var req = new requestData();
            req.url = NetConfig.Login;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            HttpUnit.request(req);
        }
        static saveGameData(gameData, onSuccess, onFail) {
            var req = new requestData();
            req.url = NetConfig.SaveGameData;
            req.data.gameData = gameData;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            HttpUnit.request(req);
        }
        static getGameData(onSuccess, onFail) {
            var req = new requestData();
            req.url = NetConfig.GetUser;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            HttpUnit.request(req);
        }
        static GetIpBlock(onSuccess, onFail) {
            if (-1 != NetConfig.gameid) {
                var req = new requestData();
                req.url = NetConfig.IpBlock;
                req.onSuccess = onSuccess;
                req.onFail = onFail;
                HttpUnit.request(req);
            }
        }
        static reportExport(appid, game_name, onSuccess, onFail) {
            var req = new requestData();
            req.url = NetConfig.reportExport;
            req.data.wbappid = appid;
            req.data.game_name = game_name;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            HttpUnit.request(req);
        }
        static reportImport(appid, channel, onSuccess, onFail) {
            var req = new requestData();
            req.url = NetConfig.reportImport;
            req.data.wbappid = appid;
            req.data.channel = channel;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            HttpUnit.request(req);
        }
    }

    class WXAPI {
        static wxLogin(onSuccess, onFail) {
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
        static onRewardedVideoAdLoad() {
            console.log('激励视频 广告加载完成');
        }
        static onRewardedVideoAdError(err) {
            console.log('激励视频 广告加载失败' + err);
            if (WXAPI._onRewardedVideoAdFailed) {
                WXAPI._onRewardedVideoAdFailed();
            }
        }
        static onRewardedVideoAdClose(res) {
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
        }
        static regRewardedVideoAdEvent(rewardedVideoAd) {
            rewardedVideoAd.onLoad(WXAPI.onRewardedVideoAdLoad);
            rewardedVideoAd.onError(WXAPI.onRewardedVideoAdError);
            rewardedVideoAd.onClose(WXAPI.onRewardedVideoAdClose);
            WXAPI._isRegRewardedVideoAdEvent = true;
        }
        static showRewardedVideoAd(onAdClose, onFailed) {
            if (Laya.Browser.onMiniGame) {
                WXAPI._onRewardedVideoAdClose = onAdClose;
                WXAPI._onRewardedVideoAdFailed = onFailed;
                var rewardedVideoAd = Laya.Browser.window["wx"].createRewardedVideoAd({
                    adUnitId: WXAPI.adUnitId,
                });
                if (!WXAPI._isRegRewardedVideoAdEvent) {
                    WXAPI.regRewardedVideoAdEvent(rewardedVideoAd);
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
        static navigateToMiniProgram(appId, path, onSuccess, onFail, onComplate) {
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
        static share(complate, titel, imageUrl) {
            if (Laya.Browser.onMiniGame) {
                WXAPI._onShow = () => {
                    Laya.Browser.window["wx"].offShow(WXAPI._onShow);
                    WXAPI._onShow = null;
                    var c = Date.now() - this._lastShareTime;
                    if (complate) {
                        if (Date.now() - this._lastShareTime > 2000) {
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
        }
        static showInterstitialAd(onAdClose, onFailed) {
            if (Laya.Browser.onMiniGame) {
                var interstitialAd = Laya.Browser.window["wx"].createInterstitialAd({
                    adUnitId: WXAPI.InsAdUnitId,
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
        static getLaunchOptionsSync() {
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
        static SetShareMenu(titel, imageUrl, success, fail, complate) {
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
        static checkUpdate() {
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
    }
    WXAPI.adUnitId = "adunit-c9c6d8eeb968cb73";
    WXAPI.bannerAdUnitId = "adunit-db0d1a563434b3f8";
    WXAPI.InsAdUnitId = "adunit-5113cac800b3c1dd";
    WXAPI._isRegRewardedVideoAdEvent = false;
    WXAPI._onRewardedVideoAdFailed = null;
    WXAPI._onRewardedVideoAdClose = null;
    WXAPI._onShow = null;
    WXAPI._lastShareTime = 0;

    class OPPOAPI {
        static get BannerInstance() {
            return this._banner;
        }
        static Login(onSuccess, onFail) {
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
        static initAdService(onSuccess, onFail, onComplete) {
            Laya.Browser.window["qg"].initAdService({
                appId: App_sdlyg_Config.AppID,
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
        static showRewardedVideoAd(onAdClose, onFailed) {
            if (Laya.Browser.onQGMiniGame) {
                var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                    posId: OPPOAPI.adUnitId,
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
        static navigateToMiniProgram(pkgName, gameName, path, onSuccess, onFail, onComplate) {
            if (Laya.Browser.onQGMiniGame) {
                console.log("OPPO 跳转游戏： " + pkgName);
                HttpUnit.reportExport(pkgName, gameName, (result) => {
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
                        from: App_sdlyg_Config.AppID
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
        static showInterstitialAd(onAdClose, onFailed) {
            if (Laya.Browser.onQGMiniGame) {
                var insertAd = qg.createInsertAd({
                    posId: OPPOAPI.InsAdUnitId
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
        static showBannaer() {
            if (OPPOAPI._banner) {
                OPPOAPI._banner.show();
                return;
            }
            var bannerAd = qg.createBannerAd({
                posId: OPPOAPI.bannerAdUnitId
            });
            bannerAd.show();
            OPPOAPI._banner = bannerAd;
        }
        static hideBanner() {
            if (OPPOAPI._banner) {
                OPPOAPI._banner.hide();
            }
        }
        static getLaunchOptionsSync() {
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
        static share(complate, titel, imageUrl) {
            complate(false);
        }
        static createDesktopIcon(onSuccess, onFail) {
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
    }
    OPPOAPI.adUnitId = "150711";
    OPPOAPI.bannerAdUnitId = "150708";
    OPPOAPI.InsAdUnitId = "";
    OPPOAPI.OpenScreenAdUnitId = "150709";
    OPPOAPI.NativeAdId = "150710";
    OPPOAPI._banner = null;

    class MaiLiang {
        static request(req) {
            if (req.url.indexOf("https://") > -1 ||
                req.url.indexOf("http://") > -1) {
                req.url = req.url;
            }
            else {
                req.url = MaiLiang.mainUrl + req.url;
            }
            var completeFunc = (res) => {
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
            var errorFunc = (res) => {
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
                for (const key of Object.keys(req.data)) {
                    var value = req.data[key];
                    para += key + "=" + value + "&";
                }
                req.url = req.url + "?" + para;
                xhr.send(req.url, null, req.meth);
            }
            else {
                var para = "";
                for (const key of Object.keys(req.data)) {
                    var value = req.data[key];
                    para += key + "=" + value + "&";
                }
                xhr.send(req.url, para, req.meth, null, ["Content-Type", "application/x-www-form-urlencoded"]);
            }
        }
        static GetMaiLiangOpenId(onSuccess, onFail) {
            if (Laya.Browser.onMiniGame) {
                let option = WXAPI.getLaunchOptionsSync();
                if (option != null) {
                    let key = option.query["key"];
                    if (key != null && key != "" && Us_sdlyg_er.openId != "") {
                        MaiLiang.key = key;
                        let req = new requestData();
                        req.url = MaiLiang.uclick;
                        req.onSuccess = onSuccess;
                        req.onFail = onFail;
                        req.data.appid = App_sdlyg_Config.AppID;
                        req.data.openid = "";
                        let time = new Date().getTime() / 1000;
                        req.data.posttime = time;
                        req.data.auth = 0;
                        req.data.key = key;
                        req.data.wxopenid = Us_sdlyg_er.openId;
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
                let option = OPPOAPI.getLaunchOptionsSync();
                HttpUnit.reportImport(option.referrerInfo.package, option.referrerInfo.extraData.appid, (result) => {
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
        static ReportStayTime(onSuccess, onFail) {
            if (Laya.Browser.onMiniGame) {
                if (MaiLiang.MaiLiangOpenId != "") {
                    let req = new requestData();
                    req.url = MaiLiang.stay;
                    req.onSuccess = onSuccess;
                    req.onFail = onFail;
                    req.data.appid = App_sdlyg_Config.AppID;
                    req.data.openid = MaiLiang.MaiLiangOpenId;
                    let time = new Date().getTime() / 1000;
                    req.data.posttime = time;
                    let staytime = MaiLiang.time != 0 ? time - MaiLiang.time : 0;
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
        }
    }
    MaiLiang.mainUrl = "https://swtj.mrkzx.cn";
    MaiLiang.uclick = "/v1.1/api/Activity/uclick.html";
    MaiLiang.stay = "/v1.1/api/Activity/stay.html";
    MaiLiang.key = "";
    MaiLiang.MaiLiangOpenId = "";
    MaiLiang.time = 0;

    class AppSwitchData {
        constructor() {
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
            this.btnMoveTimer = 1;
            this.bannerMoveTimer = 0.5;
            this.bannerFreshTimer = 200;
            this.bannerCreateFailNum = 3;
            this.bannerTodayBannerMax = 10;
            this.enterGamePop = 1;
            this.adSwitch = 1;
            this.wudianSceneList = new Array();
            this.yuansheng = 0;
            this.morefunpop = 0;
        }
        get wudianTimeAvaliable() {
            return this.wudianAvailableTime[new Date().getHours()] == 1;
        }
    }
    class AppSwitchConfig {
        constructor() {
            this._data = new Array();
        }
        static getInstance() {
            if (null == AppSwitchConfig._instance) {
                AppSwitchConfig._instance = AppSwitchConfig.load();
            }
            return AppSwitchConfig._instance;
        }
        static load() {
            var config = new AppSwitchConfig();
            var json = Laya.loader.getRes(App_sdlyg_Config.ResServer + "/json/appswitch.json");
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
                    rowData.btnMoveTimer = Number(row["btnMoveTimer"]);
                    rowData.bannerMoveTimer = Number(row["bannerMoveTimer"]);
                    rowData.bannerCreateFailNum = Number(row["createFailNum"]);
                    rowData.bannerFreshTimer = Number(row["bannerFreshTimer"]);
                    rowData.bannerTodayBannerMax = Number(row["todayBannerMax"]);
                    var wudianSceneList = row["wudianSceneList"];
                    if (null != wudianSceneList) {
                        for (var j = 0; j < wudianSceneList.length; ++j) {
                            var wudianSceneValue = Number(wudianSceneList[j]);
                            rowData.wudianSceneList.push(wudianSceneValue);
                        }
                    }
                    rowData.adSwitch = Number(row["adSwitch"]);
                    rowData.enterGamePop = Number(row["enterGamePop"]);
                    rowData.yuansheng = Number(row["yuansheng"]);
                    rowData.morefunpop = Number(row["morefunpop"]);
                    config._data.push(rowData);
                }
                return config;
            }
            else {
                config._data.push(new AppSwitchData());
                return config;
            }
        }
        getAppSwitchData() {
            return this._data[0];
        }
    }

    class WudianMgr {
        static IpBlockFlag() {
            return this._ipBlockFlag;
        }
        static UpdateIpBlockState() {
            HttpUnit.GetIpBlock(function (res) {
                console.log("调用IpBlock接口成功,结果为:", res);
                WudianMgr._ipBlockFlag = res.code;
            }, null);
        }
        static GetIpBlocked() {
            return this._ipBlockFlag == 0;
        }
        static GetEntryScene() {
            return WXAPI.getLaunchOptionsSync().scene == 1006;
        }
        static IsSwitchOpen() {
            let mainSwitch = AppSwitchConfig.getInstance().getAppSwitchData().wudian == 1;
            let isOpenTime = AppSwitchConfig.getInstance().getAppSwitchData().wudianTimeAvaliable;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "打开时间", isOpenTime);
            return mainSwitch && isOpenTime;
        }
        static get WudianFlag() {
            let mainSwitch = AppSwitchConfig.getInstance().getAppSwitchData().wudian == 1;
            let launchScene = WXAPI.getLaunchOptionsSync().scene;
            let noEnterBySearch = true;
            var wudianSceneList = AppSwitchConfig.getInstance().getAppSwitchData().wudianSceneList;
            for (var i = 0; i < wudianSceneList.length; ++i) {
                var wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            let isOpenTime = AppSwitchConfig.getInstance().getAppSwitchData().wudianTimeAvaliable;
            let ipnotBlock = this._ipBlockFlag == 0;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock, "打开时间", isOpenTime);
            return mainSwitch && noEnterBySearch && ipnotBlock && isOpenTime;
        }
        static get NoTimeWudianFlag() {
            let mainSwitch = AppSwitchConfig.getInstance().getAppSwitchData().wudian == 1;
            let noEnterBySearch = WXAPI.getLaunchOptionsSync().scene != 1006;
            let ipnotBlock = this._ipBlockFlag == 0;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
            return mainSwitch && noEnterBySearch && ipnotBlock;
        }
    }
    WudianMgr._ipBlockFlag = -1;

    class ConstManager {
    }
    ConstManager.restitution = 0.6;
    ConstManager.rollingFriction = 0.8;
    ConstManager.friction = 0.8;
    ConstManager.ball_Amount = 3;
    ConstManager.stagePre_Amount = 6;
    ConstManager.cameraMoveTime = 800;
    ConstManager.envAmount = 2;
    ConstManager.max_power_timer = 800;
    ConstManager.max_power_dis = 6.68;

    class Ground extends Laya.Script3D {
        constructor() { super(); }
        onAwake() {
            this.Init();
        }
        Init() {
            this.m_ground = this.owner;
            this.m_rig = this.m_ground.getComponent(Laya.Rigidbody3D);
            this.m_rig.isKinematic = true;
            this.m_rig.restitution = ConstManager.restitution;
            this.m_rig.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
        }
        showShadow() {
            console.log("执行了一次地面接收影子");
            this.m_ground.meshRenderer.receiveShadow = true;
        }
    }

    class PreManager extends Laya.Script3D {
        constructor() { super(); }
        onAwake() {
            PreManager.m_owner = this.owner;
            let ball = this.owner.getChildByName("Ball");
            Laya.Sprite3D.load(App_sdlyg_Config.ResServer + "/ball/Conventional/ball.lh", Laya.Handler.create(this, function (sp) {
                let aBall = sp.getChildByName("aBall");
                PreManager.m_owner.addChild(aBall);
                PreManager.could_set_skin = true;
                console.log("球资源加载完成");
            }));
            PreManager.m_owner.active = false;
        }
        static get CouldSetSkin() {
            return PreManager.could_set_skin;
        }
        static getPre(type) {
            return PreManager.m_owner.getChildByName(type);
        }
        static createPre(type, parent) {
            return Laya.Sprite3D.instantiate(PreManager.getPre(type), parent);
        }
    }
    PreManager.could_set_skin = false;
    var PreType;
    (function (PreType) {
        PreType["Ball"] = "Ball";
        PreType["aBall"] = "aBall";
        PreType["Flag"] = "Flag";
        PreType["OverFlag"] = "OverFlag";
        PreType["Stage1"] = "Stage1";
        PreType["Stage2"] = "Stage2";
        PreType["Stage3"] = "Stage3";
        PreType["Stage4"] = "Stage4";
        PreType["Stage5"] = "Stage5";
        PreType["Stage6"] = "Stage6";
        PreType["StrikeGroundEffect"] = "StrikeGroundEffect";
        PreType["ObstacleBarre"] = "ObstacleBarre";
        PreType["ObstacleCut"] = "ObstacleCut";
        PreType["ObstacleStairs"] = "ObstacleStairs";
        PreType["ObstacleTurnAround"] = "ObstacleTurnAround";
        PreType["ObstacleTurnAround1"] = "ObstacleTurnAround1";
        PreType["Tuowei"] = "Tuowei";
    })(PreType || (PreType = {}));

    class NativeCallback {
        static onVideoFail() {
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.RewardVideoFail);
        }
        static onVideoSuccess(reward) {
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.RewardVideoSuccess, reward);
        }
        static CallNativeFunc(funcName) {
            if (Laya.Browser.onAndroid) {
                var bridge = window["PlatformClass"].createClass("demo.JSBridge");
                bridge.call(funcName);
            }
            else if (Laya.Browser.onIOS) {
            }
        }
    }
    NativeCallback.conchIOS = "Conch-ios";
    NativeCallback.conchAndroid = "Conch-android";
    NativeCallback.os = "";

    class VibrateMgr {
        static vibrateShort() {
            if (!VibrateMgr.isEnable)
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
        static ibrateLong() {
            if (!VibrateMgr.isEnable)
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
        static vibrate(time) {
            if (!VibrateMgr.isEnable)
                return;
            if (Laya.Browser.onMiniGame) {
                let count = time / 15;
                let index = 0;
                let obj = { count: count, index: index };
                Laya.timer.loop(16, obj, function () {
                    VibrateMgr.vibrateShort();
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
                    VibrateMgr.vibrateShort();
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
                    VibrateMgr.vibrateShort();
                    index++;
                    if (index > count) {
                        Laya.timer.clearAll(obj);
                    }
                });
            }
        }
    }
    VibrateMgr.isEnable = true;

    class Ball extends Laya.Script {
        constructor() {
            super();
            this.max_power = new Laya.Vector3(0, 5.8, 5.8);
            this.current_skin = "normal";
            this.could_set_skin = false;
            this.m_id = 0;
        }
        onAwake() {
            this.m_ball = this.owner;
            this.start_pos = this.m_ball.transform.position;
            this.Init();
        }
        onStart() {
        }
        onDestroy() {
        }
        Init() {
            this.m_rig = this.m_ball.getComponent(Laya.Rigidbody3D);
            this.m_rig.restitution = ConstManager.restitution;
            this.m_rig.rollingFriction = ConstManager.rollingFriction;
            this.m_rig.friction = ConstManager.friction;
            this.m_rig.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
            this.m_rig.overrideGravity = true;
            this.m_rig.gravity = new Laya.Vector3(0, -10, 0);
            this.m_rig.ccdMotionThreshold = 0.001;
            for (let i = 0; i < this.m_ball.numChildren; i++) {
                this.m_ball.getChildAt(i).active = false;
            }
            this.hide();
        }
        show(pos) {
            this.m_rig.clearForces();
            if (this.m_current_tuowei)
                this.m_current_tuowei.destroy();
            if (pos)
                this.m_ball.transform.position = new Laya.Vector3(pos.x, pos.y + 0.04, pos.z);
            this.m_current_tuowei = PreManager.createPre(PreType.Tuowei, this.m_ball);
            this.m_current_tuowei.transform.position = this.m_ball.transform.position;
            this.m_ball.active = true;
        }
        hide() {
            this.m_ball.active = false;
        }
        beatBall(ratio, x_power = 0) {
            let power = new Laya.Vector3(x_power, this.max_power.y * ratio, this.max_power.z * ratio);
            this.m_rig.applyImpulse(power);
            VibrateMgr.vibrateShort();
        }
        setSkin(name) {
            if (!PreManager.CouldSetSkin) {
                this.m_ball.getChildByName("normal").active = true;
            }
            else if (PreManager.CouldSetSkin && this.owner.name == "aBall") {
                if (name != this.current_skin) {
                    this.m_ball.getChildByName(this.current_skin).active = false;
                    this.current_skin = name;
                }
                this.m_ball.getChildByName(name).active = true;
            }
        }
        lookAt(pos) {
            this.m_ball.transform.lookAt(pos, new Laya.Vector3(0, 0, 0));
        }
        getActive() {
            return this.m_ball.active;
        }
        ballDestroy() {
            this.owner.destroy();
        }
        getBall() {
            return this.m_ball;
        }
        setID(id) {
            this.m_id = id;
        }
        setManager(manager) {
            this.m_manager = manager;
        }
        getManager() {
            return this.m_manager;
        }
    }

    class Sound_sdlyg_Mgr {
        constructor() {
            this._enabled = true;
        }
        get Enabled() {
            return this._enabled;
        }
        set Enabled(e) {
            if (!e) {
                this.stopBGM();
            }
            this._enabled = e;
        }
        getSoundUrl(name) {
            let url = Sound_sdlyg_Mgr.soundResPath + name + ".wav";
            return url;
        }
        playSound(name) {
            if (!this._enabled)
                return;
            var url = this.getSoundUrl(name);
            if (Laya.Browser.onMiniGame) {
                var sound = Laya.Pool.getItem(name);
                if (sound == null) {
                    sound = wx.createInnerAudioContext();
                    sound.src = Sound_sdlyg_Mgr.soundResPath + name + ".wav";
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
        playBGM(name) {
            if (!this._enabled)
                return;
            let url = this.getSoundUrl(name);
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
        }
        stopBGM() {
            if (Laya.Browser.onMiniGame) {
                if (this.bgm) {
                    this.bgm.stop();
                }
            }
            else {
                Laya.SoundManager.stopMusic();
            }
        }
    }
    Sound_sdlyg_Mgr.soundResPath = "subRes/sound/";
    Sound_sdlyg_Mgr.instance = new Sound_sdlyg_Mgr();
    var SoundType;
    (function (SoundType) {
        SoundType["Button"] = "\u6309\u94AE";
        SoundType["DesorbPower"] = "\u9AD8\u5C14\u592B\u6325\u6746";
        SoundType["Unlock"] = "\u89E3\u9501\u65B0\u76AE\u80A4";
        SoundType["GetScore"] = "\u7403\u6389\u8FDB\u6D1E\u91CC";
        SoundType["StrikeGround"] = "\u7403\u649E\u5230\u5899\u4E0A";
        SoundType["Win"] = "\u6E38\u620F\u80DC\u5229";
        SoundType["Lose"] = "\u6E38\u620F\u5931\u8D25";
        SoundType["GetCoin"] = "\u5F97\u5230\u91D1\u5E01";
        SoundType["SkinBtn"] = "\u76AE\u80A4\u754C\u9762\u6309\u94AE";
        SoundType["AddStar"] = "\u52A0\u661F";
    })(SoundType || (SoundType = {}));

    class Player extends Laya.Script {
        constructor() { super(); }
        onAwake() {
            this.m_player = this.owner;
            this.m_ani = this.m_player.getComponent(Laya.Animator);
            this.hide();
        }
        show() {
            this.m_player.active = true;
        }
        hide() {
            this.m_player.active = false;
        }
        showPlayerByPos(pos) {
            if (!this.m_player.active)
                this.show();
            this.m_player.transform.position = new Laya.Vector3(pos.x + 0.3, pos.y + 0.02, pos.z);
            this.m_ani.play(PlayerAniType.Idle);
        }
        storgePower() {
            this.m_ani.speed = 1;
            this.m_ani.crossFade(PlayerAniType.StoragePower, 0.05);
            this.m_ani.play(PlayerAniType.StoragePower);
        }
        playAni(type) {
            this.m_ani.speed = 1;
            this.m_ani.crossFade(type, 0.05);
        }
        desorbPower(ratio) {
            this.m_ani.speed = 1;
            if (ratio <= 0.5) {
                this.m_ani.play(PlayerAniType.LowDesorbPowerUp);
            }
            else if (ratio < 0.8) {
                this.m_ani.play(PlayerAniType.MiddleDesorbPowerUp);
            }
            else {
                this.m_ani.play(PlayerAniType.MaxDesorbPowerUp);
            }
            Sound_sdlyg_Mgr.instance.playSound(SoundType.DesorbPower);
        }
        getTrans() {
            return this.m_player.transform.position;
        }
        lookAt(pos) {
            this.m_player.transform.lookAt(pos, new Laya.Vector3(0, 0, 0));
        }
    }
    var PlayerAniType;
    (function (PlayerAniType) {
        PlayerAniType["Idle"] = "Idle";
        PlayerAniType["StoragePower"] = "StoragePower";
        PlayerAniType["MaxDesorbPowerUp"] = "MaxDesorbPowerUp";
        PlayerAniType["MiddleDesorbPowerUp"] = "MiddleDesorbPowerUp";
        PlayerAniType["LowDesorbPowerUp"] = "LowDesorbPowerUp";
        PlayerAniType["Celebrate"] = "Celebrate";
        PlayerAniType["Dismay"] = "Dismay";
        PlayerAniType["wudao"] = "wudao";
    })(PlayerAniType || (PlayerAniType = {}));

    class BallManager extends Laya.Script {
        constructor() {
            super();
            this._amount = ConstManager.ball_Amount;
            this._ballList = new Array();
            this._aBallList = new Array();
            this._current_ball_id = 0;
            this.game_ball_amount = 0;
            this.could_create = true;
            this.m_current_stage_id = 0;
            this.could_beat = true;
        }
        onAwake() {
            this._amount = ConstManager.ball_Amount;
            this.m_owner = this.owner;
            this.m_player = this.m_owner.parent.getComponent(PlayerManager);
            this.beat_effect = this.m_owner.getChildByName("daji");
            this.beat_effect.active = false;
        }
        onStart() {
            this.createBall();
        }
        updatePos() {
            this.m_current_stage_id++;
            this.m_current_showPos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
        }
        BeatBall(ratio) {
            if (this.beat_effect.active)
                this.beat_effect.active = false;
            if (this.game_ball_amount <= 0)
                return;
            if (!this.could_beat)
                return;
            this.could_beat = false;
            this.game_ball_amount--;
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.SubBall);
            if (this.game_ball_amount == 0) {
                if (GameManager.Instance().getIsAwardGame()) {
                    Laya.timer.once(2000, this, () => {
                        if (GameManager.Instance().getInGame()) {
                            GameManager.Instance().gameOver(GameManager.Instance().getOnerKeyNum() > 0);
                        }
                    });
                }
                else {
                    Laya.timer.once(2000, this, () => {
                        if (GameManager.Instance().getInGame()) {
                            GameManager.Instance().couldRelive();
                        }
                    });
                }
            }
            this.beat_effect.transform.position = this.m_current_showPos;
            this.beat_effect.active = true;
            this._ballList[this._current_ball_id].beatBall(ratio);
            this._current_ball_id++;
            Laya.timer.once(250, this, () => {
                this.ShowBall();
            });
        }
        ShowBall() {
            this.could_beat = true;
            if (this._current_ball_id >= this._amount)
                this._current_ball_id = 0;
            this._ballList[this._current_ball_id].show(this.m_current_showPos);
        }
        createBall(ballSkinComplete = false) {
            if (ballSkinComplete && this.could_create) {
                this.m_current_showPos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
                this._ballList.forEach(ball => {
                    ball.ballDestroy();
                });
                this._ballList = [];
                for (let i = 0; i < this._amount; i++) {
                    let ball;
                    ball = PreManager.createPre(PreType.aBall, this.m_owner).addComponent(Ball);
                    this._ballList.push(ball);
                    ball.setID(i);
                    ball.setManager(this.owner.parent);
                }
                this.could_create = false;
                this.changeSkin(Us_sdlyg_er.getSkinConfig().ball);
            }
            else if (this._ballList.length <= 0) {
                this.m_current_showPos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
                for (let i = 0; i < this._amount; i++) {
                    console.log("创建了球");
                    let ball;
                    ball = PreManager.createPre(PreType.Ball, this.m_owner).addComponent(Ball);
                    this._ballList.push(ball);
                    ball.setID(i);
                    ball.setManager(this.owner.parent);
                }
                this.changeSkin(Us_sdlyg_er.getSkinConfig().ball);
            }
            this.ShowBall();
        }
        changeSkin(name) {
            this._ballList.forEach(ball => {
                ball.setSkin(name);
            });
        }
        setBallAmount(num) {
            Laya.timer.clearAll(this);
            this.game_ball_amount = num;
        }
        RecoverAllBall() {
            if (this._ballList.length > 0) {
                this._ballList.forEach(ball => {
                    ball.hide();
                });
            }
            this.m_current_stage_id = 0;
            this.m_current_showPos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
        }
    }

    class CameraMoveScript extends Laya.Script3D {
        constructor() {
            super();
            this._tempVector3 = new Laya.Vector3();
            this.yawPitchRoll = new Laya.Vector3();
            this.resultRotation = new Laya.Quaternion();
            this.tempRotationZ = new Laya.Quaternion();
            this.tempRotationX = new Laya.Quaternion();
            this.tempRotationY = new Laya.Quaternion();
            this.rotaionSpeed = 0.00006;
        }
        onAwake() {
            Laya.stage.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.mouseDown);
            Laya.stage.on(Laya.Event.RIGHT_MOUSE_UP, this, this.mouseUp);
            this.camera = this.owner;
        }
        _onDestroy() {
            Laya.stage.off(Laya.Event.RIGHT_MOUSE_DOWN, this, this.mouseDown);
            Laya.stage.off(Laya.Event.RIGHT_MOUSE_UP, this, this.mouseUp);
        }
        onUpdate() {
            var elapsedTime = Laya.timer.delta;
            if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY) && this.isMouseDown) {
                var scene = this.owner.scene;
                Laya.KeyBoardManager.hasKeyDown(87) && this.moveForward(-0.01 * elapsedTime);
                Laya.KeyBoardManager.hasKeyDown(83) && this.moveForward(0.01 * elapsedTime);
                Laya.KeyBoardManager.hasKeyDown(65) && this.moveRight(-0.01 * elapsedTime);
                Laya.KeyBoardManager.hasKeyDown(68) && this.moveRight(0.01 * elapsedTime);
                Laya.KeyBoardManager.hasKeyDown(81) && this.moveVertical(0.01 * elapsedTime);
                Laya.KeyBoardManager.hasKeyDown(69) && this.moveVertical(-0.01 * elapsedTime);
                var offsetX = Laya.stage.mouseX - this.lastMouseX;
                var offsetY = Laya.stage.mouseY - this.lastMouseY;
                var yprElem = this.yawPitchRoll;
                yprElem.x -= offsetX * this.rotaionSpeed * elapsedTime;
                yprElem.y -= offsetY * this.rotaionSpeed * elapsedTime;
                this.updateRotation();
            }
            this.lastMouseX = Laya.stage.mouseX;
            this.lastMouseY = Laya.stage.mouseY;
        }
        mouseDown(e) {
            this.camera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll);
            this.lastMouseX = Laya.stage.mouseX;
            this.lastMouseY = Laya.stage.mouseY;
            this.isMouseDown = true;
        }
        mouseUp(e) {
            this.isMouseDown = false;
        }
        moveForward(distance) {
            this._tempVector3.x = 0;
            this._tempVector3.y = 0;
            this._tempVector3.z = distance;
            this.camera.transform.translate(this._tempVector3);
        }
        moveRight(distance) {
            this._tempVector3.y = 0;
            this._tempVector3.z = 0;
            this._tempVector3.x = distance;
            this.camera.transform.translate(this._tempVector3);
        }
        moveVertical(distance) {
            this._tempVector3.x = this._tempVector3.z = 0;
            this._tempVector3.y = distance;
            this.camera.transform.translate(this._tempVector3, false);
        }
        updateRotation() {
            if (Math.abs(this.yawPitchRoll.y) < 1.50) {
                Laya.Quaternion.createFromYawPitchRoll(this.yawPitchRoll.x, this.yawPitchRoll.y, this.yawPitchRoll.z, this.tempRotationZ);
                this.tempRotationZ.cloneTo(this.camera.transform.localRotation);
                this.camera.transform.localRotation = this.camera.transform.localRotation;
            }
        }
    }

    class Utils3D {
        static get defalutVec3() {
            var vect = this.mDefalutVec3 || (this.mDefalutVec3 = new Laya.Vector3);
            vect.toDefault();
            return vect;
        }
        static setToVec3(vec3, x, y, z) {
            vec3.x = x;
            vec3.y = y;
            vec3.z = z;
            return vec3;
        }
        static position(target, x, y, z) {
            var vec3 = target.transform.position;
            vec3.x = x;
            vec3.y = y;
            vec3.z = z;
            target.transform.position = target.transform.position;
        }
        static rotationEuler(target, x, y, z) {
            var vec3 = target.transform.rotationEuler;
            vec3.x = x;
            vec3.y = y;
            vec3.z = z;
            target.transform.rotationEuler = target.transform.rotationEuler;
        }
        static localPosition(target, x, y, z) {
            var vec3 = target.transform.localPosition;
            vec3.x = x;
            vec3.y = y;
            vec3.z = z;
            target.transform.localPosition = target.transform.localPosition;
        }
        static localPositionByVec3(target, vec3) {
            var vec3_1 = target.transform.localPosition;
            vec3_1.x = vec3.x;
            vec3_1.y = vec3.y;
            vec3_1.z = vec3.z;
            target.transform.localPosition = target.transform.localPosition;
        }
        static rotation(target, x, y, z) {
            var vec3 = this.setToVec3(this.defalutVec3, x, y, z);
            var a = 180 / Math.PI;
            Laya.Quaternion.createFromYawPitchRoll(vec3.y / a, vec3.x / a, vec3.z / a, target.transform.localRotation);
            target.transform.localRotation = target.transform.localRotation;
        }
        static rotationByVec3(target, vec3) {
            var a = 180 / Math.PI;
            Laya.Quaternion.createFromYawPitchRoll(vec3.y / a, vec3.x / a, vec3.z / a, target.transform.localRotation);
            target.transform.localRotation = target.transform.localRotation;
        }
        static positionX(target, x) {
            var vec3 = target.transform.position;
            vec3.x = x;
            target.transform.position = target.transform.position;
        }
        static positionY(target, y) {
            var vec3 = target.transform.position;
            vec3.y = y;
            target.transform.position = target.transform.position;
        }
        static positionZ(target, z) {
            var vec3 = target.transform.position;
            vec3.z = z;
            target.transform.position = target.transform.position;
            return vec3.z;
        }
        static localPositionX(target, x) {
            var vec3 = target.transform.localPosition;
            vec3.x = x;
            target.transform.localPosition = target.transform.localPosition;
        }
        static localPositionY(target, y) {
            var vec3 = target.transform.localPosition;
            vec3.y = y;
            target.transform.localPosition = target.transform.localPosition;
        }
        static localPositionZ(target, z) {
            var vec3 = target.transform.localPosition;
            vec3.z = z;
            target.transform.localPosition = target.transform.localPosition;
            return vec3.z;
        }
        static rotationX(target, x) {
            var vec3 = this.setToVec3(this.defalutVec3, x, 0, 0);
            var a = 180 / Math.PI;
            Laya.Quaternion.createFromYawPitchRoll(vec3.y / a, vec3.x / a, vec3.z / a, target.transform.localRotation);
            target.transform.localRotation = target.transform.localRotation;
        }
        static rotationY(target, y) {
            var transform = target.transform || target['_transform'];
            var vec3 = this.setToVec3(this.defalutVec3, 0, y, 0);
            var a = 180 / Math.PI;
            Laya.Quaternion.createFromYawPitchRoll(vec3.y / a, vec3.x / a, vec3.z / a, transform.localRotation);
            transform.localRotation = transform.localRotation;
        }
        static rotationZ(target, z) {
            var vec3 = this.setToVec3(this.defalutVec3, 0, 0, z);
            var a = 180 / Math.PI;
            Laya.Quaternion.createFromYawPitchRoll(vec3.y / a, vec3.x / a, vec3.z / a, target.transform.localRotation);
            target.transform.localRotation = target.transform.localRotation;
        }
        static tweenScale(callBack, target, timer, x, y, z, tx, ty, tz, ease = null) {
            var vect = Laya.Pool.getItemByClass("Vector3", Laya.Vector3);
            this.setToVec3(vect, x, y, z);
            var tween = Laya.Tween.to(vect, { x: tx, y: ty, z: tz }, timer, Laya.Ease.bounceOut, Laya.Handler.create(this, () => {
                callBack();
            }), 0, false, true);
            tween.update = Laya.Handler.create(this, () => {
                if (!target.transform) {
                    callBack();
                    return;
                }
                this.scale(target, vect.x, vect.y, vect.z);
            }, null, false);
        }
        static scale(target, x, y, z) {
            var scale = target.transform.scale;
            scale.x = x;
            scale.y = y;
            scale.z = z;
            target.transform.scale = target.transform.scale;
        }
        static scaleByVec3(target, vec3) {
            target.transform.scale = vec3;
        }
        static scaleX(target, x) {
            target.transform.scale.x = x;
            target.transform.scale = target.transform.scale;
        }
        static scaleY(target, y) {
            target.transform.scale.y = y;
            target.transform.scale = target.transform.scale;
        }
        static scaleZ(target, z) {
            target.transform.scale.z = z;
            target.transform.scale = target.transform.scale;
        }
        static tweenRotate(target, timer, x, y, z, tx, ty, tz, ease = null, update = null, callback = null) {
        }
        static tweenRotationEuler(target, timer, x, y, z, tx, ty, tz, ease = null, update = null, callback = null) {
            var vect = Laya.Pool.getItemByClass("Vector3", Laya.Vector3);
            this.setToVec3(vect, x, y, z);
            let tween = Laya.Tween.to(vect, { x: tx, y: ty, z: tz }, timer, ease, Laya.Handler.create(this, () => {
                if (callback != null) {
                    callback();
                }
            }), 0, false, true);
            tween.update = Laya.Handler.create(this, () => {
                if (!target.transform) {
                    if (callback != null) {
                        callback();
                    }
                    return;
                }
                this.rotationEuler(target, vect.x, vect.y, vect.z);
                update && update.runWith(vect);
            }, null, false);
            return tween;
        }
        static tweenRotateByLayTween(target, timer, x, y, z, tx, ty, tz) {
            var vect = Laya.Pool.getItemByClass("Vector3", Laya.Vector3);
            this.setToVec3(vect, x, y, z);
            Laya.Tween.to(vect, { x: tx, y: ty, z: tz }, timer).update = new Laya.Handler(this, () => {
                if (!target.transform)
                    return;
                this.rotationByVec3(target, vect);
            }, null, false);
        }
        static tweenLocalRotate(target, timer, x, y, z, tx, ty, tz) {
        }
        static tweenLocalPosition(target, timer, x, y, z, tx, ty, tz, ease = null) {
            var vect = Laya.Pool.getItemByClass("Vector3", Laya.Vector3);
            this.setToVec3(vect, x, y, z);
            var tween = Laya.Tween.to(vect, { x: tx, y: ty, z: tz }, timer, ease);
            tween.update = Laya.Handler.create(this, () => {
                if (!target.transform)
                    return;
                this.localPosition(target, vect.x, vect.y, vect.z);
            }, null, false);
        }
        static tweenLocalPositionPromise(callback, target, timer, x, y, z, tx, ty, tz, ease = null) {
            var vect = Laya.Pool.getItemByClass("Vector3", Laya.Vector3);
            this.setToVec3(vect, x, y, z);
            var tween = Laya.Tween.to(vect, { x: tx, y: ty, z: tz }, timer, ease, Laya.Handler.create(this, () => {
                callback();
            }), 0, false, true);
            tween.update = Laya.Handler.create(this, () => {
                if (!target.transform) {
                    callback();
                    return;
                }
                this.localPosition(target, vect.x, vect.y, vect.z);
            }, null, false);
        }
        static tweenPosition(target, timer, x, y, z, tx, ty, tz, ease = null, update = null, callback = null) {
            var vect = Laya.Pool.getItemByClass("Vector3", Laya.Vector3);
            this.setToVec3(vect, x, y, z);
            let tween = Laya.Tween.to(vect, { x: tx, y: ty, z: tz }, timer, ease, Laya.Handler.create(this, () => {
                if (callback != null) {
                    callback();
                }
            }), 0, false, true);
            tween.update = Laya.Handler.create(this, () => {
                if (!target.transform) {
                    if (callback != null) {
                        callback();
                    }
                    return;
                }
                this.position(target, vect.x, vect.y, vect.z);
                update && update.runWith(vect);
            }, null, false);
            return tween;
        }
    }

    class CameraCtrl extends Laya.Script3D {
        constructor() {
            super();
            this.stage_dis_z = 9;
            this.start_pos = new Laya.Vector3(-0.1905804677307608, 1.3980510931855037, -5.151574879005554);
            this.start_rot = new Laya.Vector3(-18.242095295912744, -175.63244273138994, -2.662174102247288e-7);
            this.menu_pos = new Laya.Vector3(-1.3203681024909018, 0.38740019451555485, -1.6522341995909826);
            this.menu_rot = new Laya.Vector3(1.7896551374511018, -51.74980009938377, 3.0064510732025026e-7);
            this.over_rot = new Laya.Vector3(-14.292124256280848, -52.523293122810394, -1.1418999226818036e-7);
            this.look_trans_pos = new Laya.Vector3(this.menu_pos.x - this.start_pos.x, this.menu_pos.y - this.start_pos.y, this.menu_pos.z - this.start_pos.z);
            this.look_trans_rot = new Laya.Vector3(this.menu_rot.x - this.start_rot.x, this.menu_rot.y - this.start_rot.y, this.menu_rot.z - this.start_rot.z);
            this.bag_rot = new Laya.Vector3(-17.657678344879304, -51.60885248178163, -0.0000014195851006527938);
            this.moveTime = 0;
        }
        static Instance() {
            return this._instance;
        }
        onAwake() {
            CameraCtrl._instance = this;
            this.m_camera = this.owner;
            this.m_camera.addComponent(CameraMoveScript);
            this.moveTime = ConstManager.cameraMoveTime;
            this.SetInStart();
        }
        SetInStart() {
            if (this.m_pos_tween)
                this.m_pos_tween.clear();
            this.SetTrans(this.start_pos, this.start_rot);
        }
        SetState(state) {
            let t_pos = this.m_camera.transform.position;
            let t_rot = this.m_camera.transform.rotationEuler;
            let duration = 1000;
            switch (state) {
                case CameraState.Menu:
                    t_pos = this.menu_pos;
                    t_rot = this.menu_rot;
                    break;
                case CameraState.GameStart:
                    t_pos = this.start_pos;
                    t_rot = this.start_rot;
                    duration = 800;
                    break;
                case CameraState.GameOver:
                    t_pos = new Laya.Vector3(t_pos.x + this.look_trans_pos.x, t_pos.y + this.look_trans_pos.y, t_pos.z + this.look_trans_pos.z);
                    t_rot = this.over_rot;
                    duration = 800;
                    break;
                case CameraState.Bag:
                    t_rot = this.bag_rot;
                    duration = 300;
                    break;
                case CameraState.GetScore:
                    t_pos = new Laya.Vector3(t_pos.x, t_pos.y, t_pos.z + this.stage_dis_z);
                    duration = 800;
                    break;
                case CameraState.GameRelive:
                    t_pos = new Laya.Vector3(t_pos.x - this.look_trans_pos.x, t_pos.y - this.look_trans_pos.y, t_pos.z - this.look_trans_pos.z);
                    t_rot = new Laya.Vector3(t_rot.x - this.look_trans_rot.x, t_rot.y - this.look_trans_rot.y, t_rot.z - this.look_trans_rot.z);
                    duration = 800;
                    break;
                case CameraState.OverDerive:
                    if (Us_sdlyg_er.getLeveNum() > 3) {
                        t_pos = new Laya.Vector3(this.menu_pos.x, this.menu_pos.y, this.menu_pos.z + 27);
                    }
                    duration = 10;
                    break;
            }
            this.CameraTween(duration, t_pos, t_rot);
        }
        SetTrans(pos, rot) {
            this.m_camera.transform.position = pos;
            this.m_camera.transform.rotationEuler = rot;
        }
        CameraTween(duration, t_pos, t_rot) {
            if (this.m_pos_tween)
                this.m_pos_tween.clear();
            if (this.m_rot_tween)
                this.m_rot_tween.clear();
            let rot = this.m_camera.transform.rotationEuler;
            let pos = this.m_camera.transform.position;
            this.m_pos_tween = Utils3D.tweenPosition(this.m_camera, duration, pos.x, pos.y, pos.z, t_pos.x, t_pos.y, t_pos.z, Laya.Ease.quintInOut);
            this.m_rot_tween = Utils3D.tweenRotationEuler(this.m_camera, duration, rot.x, rot.y, rot.z, t_rot.x, t_rot.y, t_rot.z, Laya.Ease.quintInOut);
        }
        GetCamera() {
            return this.m_camera;
        }
        onKeyDown(e) {
            if (e.keyCode == 97) {
                console.log("this.m_camera.transform.position", this.m_camera.transform.position);
                console.log("this.m_camera.transform.rotationEuler", this.m_camera.transform.rotationEuler);
            }
        }
    }
    var CameraState;
    (function (CameraState) {
        CameraState[CameraState["Menu"] = 0] = "Menu";
        CameraState[CameraState["GameStart"] = 1] = "GameStart";
        CameraState[CameraState["GameOver"] = 2] = "GameOver";
        CameraState[CameraState["Bag"] = 3] = "Bag";
        CameraState[CameraState["GetScore"] = 4] = "GetScore";
        CameraState[CameraState["GameRelive"] = 5] = "GameRelive";
        CameraState[CameraState["OverDerive"] = 6] = "OverDerive";
    })(CameraState || (CameraState = {}));

    class PropManager {
        constructor() {
            this.typeList = [
                {
                    type: "ball",
                    amount: 8
                },
                {
                    type: "club",
                    amount: 20
                },
                {
                    type: "people",
                    amount: 9
                }
            ];
        }
        static getInstance() {
            if (null == PropManager._instance) {
                PropManager._instance = new PropManager();
            }
            return PropManager._instance;
        }
        getPropBase(type) {
            return this.typeList[type];
        }
        getPropTypeNum() {
            return this.typeList.length;
        }
    }
    var PropType;
    (function (PropType) {
        PropType[PropType["ball"] = 0] = "ball";
        PropType[PropType["club"] = 1] = "club";
        PropType[PropType["peopel"] = 2] = "peopel";
    })(PropType || (PropType = {}));

    class PlayerManager extends Laya.Script {
        constructor() {
            super();
            this.inGame = false;
            this.m_current_stage_id = 0;
            this.showWatiTime = 0;
            this.menu_pos = new Laya.Vector3(0, 0.133, -2.88);
            this.current_club_name = "normal";
            this.current_people_name = "people2";
            this.current_ball_name = "normal";
            this.isFirst = false;
            this.could_beat = true;
            this.record = false;
            this.record_timer = 0;
            this.max_timer = 400;
        }
        static Instance() {
            return this._isntance;
        }
        onAwake() {
            PlayerManager._isntance = this;
            let play = this.owner.getChildByName("Player");
            this.m_player = play.addComponent(Player);
            this.m_club = play.getChildByName("club");
            this.m_ballManager = this.owner.getChildByName("BallManager").addComponent(BallManager);
            this.m_win_effect = this.owner.getChildByName("WinEffect");
            this.showWatiTime = ConstManager.cameraMoveTime;
            this.max_timer = ConstManager.max_power_timer;
            this.addEvent();
            this.showInMenu();
            for (let i = 0; i < this.m_club.numChildren; i++) {
                this.m_club.getChildAt(i).active = false;
            }
            let people_skin_amount = PropManager.getInstance().getPropBase(PropType.peopel).amount;
            for (let i = 0; i < people_skin_amount; i++) {
                play.getChildByName("people" + i).active = false;
            }
            play.getChildByName("guangquan").active = true;
        }
        onStart() {
            this.hideWinEffect();
            this.getPlayerSet();
            this.choosePeople(this.current_people_name);
            this.chooseClub(this.current_club_name);
        }
        onDestroy() {
            this.removeEvent();
        }
        onUpdate() {
            if (this.record)
                this.record_timer += Laya.timer.delta;
        }
        addEvent() {
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.GameStart, this, this.onGameStart);
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ChooseProp, this, this.onChooseProp);
        }
        removeEvent() {
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.GameStart, this, this.onGameStart);
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ChooseProp, this, this.onChooseProp);
        }
        onGameStart() {
            this.inGame = true;
            this.m_ballManager.setBallAmount(GameManager.Instance().getGameBall());
            this.current_pos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
            this.showPlayer();
        }
        onGameOver(isWin) {
            this.inGame = false;
            if (isWin) {
                this.m_player.playAni(PlayerAniType.wudao);
                this.showWinEffect();
            }
            else {
                this.m_player.playAni(PlayerAniType.Dismay);
            }
        }
        onChooseProp(name) {
            if (name.search("people") != -1) {
                this.choosePeople(name);
            }
            else if (name.search("club") != -1) {
                this.chooseClub(name);
            }
            else if (name.search("ball") != -1) {
                this.current_ball_name = name;
                this.m_ballManager.changeSkin(name);
            }
        }
        resetPlayer() {
            let data = Us_sdlyg_er.getSkinConfig();
            this.choosePeople(data.people);
            this.chooseClub(data.club);
            this.m_ballManager.changeSkin(data.ball);
            this.m_ballManager.createBall(PreManager.CouldSetSkin);
            this.hideWinEffect();
            this.m_current_stage_id = 0;
            this.m_ballManager.RecoverAllBall();
            this.inGame = false;
            this.isFirst = GameManager.Instance().getFirst();
        }
        showPlayer() {
            if (!this.current_pos) {
                this.current_pos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
            }
            this.m_player.showPlayerByPos(this.current_pos);
            this.m_player.playAni(PlayerAniType.Idle);
            this.m_ballManager.ShowBall();
        }
        showInMenu() {
            this.m_player.showPlayerByPos(this.menu_pos);
            this.m_player.playAni(PlayerAniType.Idle);
        }
        showWinEffect() {
            let pos = this.m_player.getTrans();
            this.m_win_effect.transform.position = new Laya.Vector3(pos.x, pos.y + 2, pos.z);
            this.m_win_effect.active = true;
        }
        hideWinEffect() {
            if (this.m_win_effect)
                this.m_win_effect.active = false;
        }
        storgePower() {
            if (this.inGame && this.could_beat) {
                this.m_player.playAni(PlayerAniType.Idle);
                this.m_player.storgePower();
                this.record = true;
                this.record_timer = 0;
                this.could_beat = false;
            }
        }
        desorbPower() {
            if (this.isFirst)
                Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.HideGuide);
            if (this.inGame && this.record) {
                this.record = false;
                let ratio = Math.min(this.record_timer / this.max_timer, 1);
                this.m_player.desorbPower(ratio);
                Laya.timer.once(60 * ratio, this, () => {
                    this.m_ballManager.BeatBall(ratio);
                    this.could_beat = true;
                });
            }
        }
        updatePos(hole_id) {
            if (hole_id >= this.m_current_stage_id && this.inGame) {
                this.m_ballManager.updatePos();
                this.m_current_stage_id++;
                this.current_pos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
                CameraCtrl.Instance().SetState(CameraState.GetScore);
                Laya.timer.once(this.showWatiTime, this, this.showPlayer);
                Sound_sdlyg_Mgr.instance.playSound(SoundType.GetScore);
                if (GameManager.Instance().getIsAwardGame()) {
                    let num = GameManager.Instance().getGameBall();
                    this.m_ballManager.setBallAmount(num);
                }
                Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.PlayerUpdatePos);
            }
        }
        getCurrentStageID() {
            return this.m_current_stage_id;
        }
        chooseClub(name = "normal") {
            this.m_club.getChildByName(this.current_club_name).active = false;
            this.current_club_name = name;
            this.m_club.getChildByName(this.current_club_name).active = true;
            let club = this.m_club.getChildByName(this.current_club_name);
        }
        choosePeople(name = "people2") {
            this.current_people_render = this.m_player.owner.getChildByName(this.current_people_name);
            if (this.current_people_name != name) {
                this.current_people_render.active = false;
                this.current_people_name = name;
                this.current_people_render = this.m_player.owner.getChildByName(this.current_people_name);
            }
            this.current_people_render.active = true;
        }
        savePlayerSet() {
            Us_sdlyg_er.setSkin(this.current_people_name, this.current_club_name, this.current_ball_name);
            Game_sdlyg_Mgr.getInstance().saveGameData();
        }
        getPlayerSet() {
            let data = Us_sdlyg_er.getSkinConfig();
            this.current_people_name = data.people;
            this.current_club_name = data.club;
            this.current_ball_name = data.ball;
        }
        getPlayerPos() {
            return this.m_player.getTrans();
        }
    }

    class AImanager extends Laya.Script {
        constructor() {
            super();
            this.inGame = false;
            this.m_current_stage_id = 0;
            this.showWatiTime = 0;
            this.current_club_name = "normal";
            this.current_people_name = "people2";
            this.max_timer = ConstManager.max_power_timer;
            this.m_ball_list = new Array();
            this.current_ball_id = 0;
            this.beat_wait_timer = 2000;
            this.m_level = 0;
            this.beat_right_rat = 0;
        }
        static Instance() {
            return this._instance;
        }
        onAwake() {
            AImanager._instance = this;
            this.m_owner = this.owner;
            let play = this.owner.getChildByName("Player");
            this.ai_player = play.addComponent(Player);
            this.m_club = play.getChildByName("club");
            this.showWatiTime = ConstManager.cameraMoveTime;
            this.max_timer = ConstManager.max_power_timer;
            for (let i = 0; i < this.m_club.numChildren; i++) {
                this.m_club.getChildAt(i).active = false;
            }
            let people_skin_amount = PropManager.getInstance().getPropBase(PropType.peopel).amount;
            for (let i = 0; i < people_skin_amount; i++) {
                play.getChildByName("people" + i).active = false;
            }
            play.getChildByName("guangquan").active = true;
            for (let i = 0; i < 2; i++) {
                let b = this.m_owner.getChildByName("ball" + i).addComponent(Ball);
                b.hide();
                b.setManager(this.m_owner);
                this.m_ball_list.push(b);
            }
            this.m_owner.active = false;
        }
        onGameStart() {
            this.setAILevel();
            this.m_owner.active = false;
            this.inGame = true;
            this.m_current_stage_id = 0;
            this.current_pos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
            this.current_hole_pos = StageManager.Instance().GetStageById(this.m_current_stage_id).getHolePos();
            this.current_ball_pos = new Laya.Vector3(this.current_pos.x - 0.6, this.current_pos.y, this.current_pos.z);
            this.randomSkin();
            this.showPlayer();
        }
        onGameOver(isWin = false) {
            if (this.inGame) {
                Laya.timer.clearAll(this);
                this.inGame = false;
                if (isWin) {
                    this.ai_player.playAni(PlayerAniType.wudao);
                }
                else {
                    this.ai_player.playAni(PlayerAniType.Dismay);
                }
            }
        }
        hide() {
            this.m_owner.active = false;
        }
        resetAIPlayer() {
            this.m_current_stage_id = 0;
            this.inGame = false;
            this.m_owner.active = false;
        }
        setAILevel() {
            let num = Math.max((Us_sdlyg_er.getRankLevel() + Math.floor(-3 + Math.random() * 6)), 0);
            let level = Math.min(Math.floor(num / 5), 5);
            this.beat_right_rat = AIlevel["level" + level];
            console.log("ai进球命中率", this.beat_right_rat);
        }
        showPlayer() {
            Laya.timer.clearAll(this);
            this.m_owner.active = true;
            if (!this.current_pos) {
                this.current_pos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
            }
            let show_pos = new Laya.Vector3(this.current_pos.x - 0.6, this.current_pos.y, this.current_pos.z);
            this.ai_player.showPlayerByPos(show_pos);
            this.ai_player.playAni(PlayerAniType.Idle);
            Laya.timer.once(500, this, this.autoStart);
        }
        autoStart() {
            this.beatBall();
        }
        beatBall() {
            let right_x_dis = StageManager.Instance().getRightDis(this.m_current_stage_id);
            this.m_ball_list[this.current_ball_id].show(this.current_ball_pos);
            let ratio = Math.sqrt(6.8 * StageManager.Instance().getRightDis(this.m_current_stage_id)) / ConstManager.max_power_dis;
            if (this.beat_right_rat <= Math.random()) {
                let bias = Math.random() > 0.5 ? (0.1 + (Math.random() * 0.2)) : -(0.1 + (Math.random() * 0.2));
                ratio += bias;
                ratio = Math.max(0.3, Math.min(1, ratio));
            }
            this.ai_player.storgePower();
            Laya.timer.once(ratio * this.max_timer, this, () => {
                this.ai_player.desorbPower(ratio);
                let x_power = 2.5 / (5.8 * ratio);
                this.m_ball_list[this.current_ball_id].beatBall(ratio, x_power);
                this.current_ball_id++;
                if (this.current_ball_id >= this.m_ball_list.length)
                    this.current_ball_id = 0;
                Laya.timer.once(this.beat_wait_timer, this, this.beatBall);
            });
        }
        randomSkin() {
            let people = "people" + Math.floor(Math.random() * 9);
            let club = "club" + Math.floor(Math.random() * 20);
            this.choosePeople(people);
            this.chooseClub(club);
        }
        updatePos(hole_id) {
            let self = this;
            if (hole_id >= this.m_current_stage_id && this.inGame) {
                this.m_current_stage_id++;
                this.current_pos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
                this.current_ball_pos = new Laya.Vector3(this.current_pos.x - 0.6, this.current_pos.y, this.current_pos.z);
                Laya.timer.once(800, self, () => {
                    self.showPlayer();
                    Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.ChangeGamingPic);
                });
            }
        }
        getCurrentStageID() {
            return this.m_current_stage_id;
        }
        chooseClub(name = "normal") {
            this.m_club.getChildByName(this.current_club_name).active = false;
            this.current_club_name = name;
            this.m_club.getChildByName(this.current_club_name).active = true;
            let club = this.m_club.getChildByName(this.current_club_name);
        }
        choosePeople(name = "people2") {
            this.current_people_render = this.ai_player.owner.getChildByName(this.current_people_name);
            if (this.current_people_name != name) {
                this.current_people_render.active = false;
                this.current_people_name = name;
                this.current_people_render = this.ai_player.owner.getChildByName(this.current_people_name);
            }
            this.current_people_render.active = true;
        }
        onKeyDown(e) {
            if (e.keyCode == 98) {
                console.log("展示了AI");
                this.onGameStart();
            }
        }
        getAIPos() {
            return this.ai_player.getTrans();
        }
    }
    var AIlevel;
    (function (AIlevel) {
        AIlevel[AIlevel["level0"] = 0.3] = "level0";
        AIlevel[AIlevel["level1"] = 0.4] = "level1";
        AIlevel[AIlevel["level2"] = 0.5] = "level2";
        AIlevel[AIlevel["level3"] = 0.6] = "level3";
        AIlevel[AIlevel["level4"] = 0.7] = "level4";
        AIlevel[AIlevel["level5"] = 0.8] = "level5";
    })(AIlevel || (AIlevel = {}));

    class Hole extends Laya.Script3D {
        constructor() {
            super();
            this.isAwardGame = false;
        }
        onAwake() {
            this.m_flag = this.owner;
            this.getScore_effect = this.m_flag.getChildByName("jinqiu");
            this.m_key = this.owner.parent.getChildByName("Key");
            this.m_key.active = false;
            this.getScore_effect.active = false;
            this.isAwardGame = GameManager.Instance().getIsAwardGame();
        }
        onStart() {
            this.m_key.active = this.isAwardGame;
        }
        setId(id) {
            this.m_id = id;
        }
        onCollisionEnter(collision) {
            if (collision.other.owner.name == "Ball" || collision.other.owner.name == "aBall") {
                let ball = collision.other.owner.getComponent(Ball);
                ball.hide();
                let manager = ball.getManager();
                if (manager.name == "PlayerManager") {
                    this.getScore_effect.active = true;
                    PlayerManager.Instance().updatePos(this.m_id);
                    this.m_key.active = false;
                    VibrateMgr.vibrateShort();
                }
            }
            else if (collision.other.owner.name == "ball0" || collision.other.owner.name == "ball1") {
                let ball = collision.other.owner.getComponent(Ball);
                ball.hide();
                let manager = ball.getManager().getComponent(AImanager);
                manager.updatePos(this.m_id);
            }
        }
        getPos() {
            return this.m_flag.transform.position;
        }
    }

    class Stage extends Laya.Script3D {
        constructor() {
            super();
            this.m_flagPos_list = new Array();
            this.barrier_type_list = [
                PreType.ObstacleBarre,
                PreType.ObstacleTurnAround,
                PreType.ObstacleCut,
                PreType.ObstacleTurnAround1,
                PreType.ObstacleStairs
            ];
            this.right_dis = 0;
        }
        onAwake() {
            this.m_stage = this.owner;
            this.Init();
        }
        Init() {
            this.m_ground = this.m_stage.getChildByName("Ground");
            this.m_ground.addComponent(Ground);
            let flagPos = this.m_stage.getChildByName("flagPos");
            this.m_flag_amount = flagPos.numChildren;
            for (let i = 0; i < this.m_flag_amount; i++) {
                let qizhi = flagPos.getChildByName("qizhi" + i);
                this.m_flagPos_list.push(qizhi.transform.position);
            }
            let beatPos = this.m_stage.getChildByName("beatPos");
            this.m_beatPos = beatPos.transform.position;
            if (GameManager.Instance().getIsAwardGame()) {
                this.m_ground.meshRenderer.material = this.m_ground.meshRenderer.materials[1];
                let m_static = this.m_stage.getChildByName("Static");
                m_static.meshRenderer.material = m_static.meshRenderer.materials[1];
            }
            if (GameManager.Instance().getIsRank()) {
                let i = 0;
                if (Math.floor((Us_sdlyg_er.getRankLevel() / 5)) <= 1)
                    i = 2;
                if (Math.floor((Us_sdlyg_er.getRankLevel() / 5)) == 3)
                    i = 4;
                if (Math.floor((Us_sdlyg_er.getRankLevel() / 5)) >= 4)
                    i = 1;
                this.m_ground.meshRenderer.material = this.m_ground.meshRenderer.materials[i];
                let m_static = this.m_stage.getChildByName("Static");
                m_static.meshRenderer.material = m_static.meshRenderer.materials[i];
            }
        }
        Show(pos) {
            this.m_stage.transform.position = pos;
            this.m_stage.active = true;
        }
        Hide() {
            this.m_stage.active = false;
        }
        RandomFlagPos() {
            let res = Math.floor(Math.random() * this.m_flag_amount);
            return this.m_flagPos_list[res];
        }
        GetBeatPos() {
            return this.m_beatPos;
        }
        CreateFlag(barrier_id) {
            let flag = PreManager.createPre(PreType.Flag, this.m_stage);
            flag.transform.position = this.RandomFlagPos();
            this.m_hole = flag.getChildByName("Hole").addComponent(Hole);
            if (Us_sdlyg_er.getLeveNum() > 10) {
                if (Math.random() < 0.25) {
                    this.CreateBarrier(flag);
                }
            }
            else {
                if (barrier_id != null) {
                    this.CreateBarrier(flag, barrier_id);
                }
            }
            this.right_dis = flag.transform.position.z - this.m_beatPos.z;
        }
        CreateBarrier(flag, barrier_id) {
            if (barrier_id == null)
                barrier_id = Math.floor(Math.random() * this.barrier_type_list.length);
            let barrier = PreManager.createPre(this.barrier_type_list[barrier_id], this.m_stage);
            barrier.transform.position = flag.transform.position;
        }
        SetHoleId(id) {
            this.m_hole.setId(id);
        }
        getRightDis() {
            return this.right_dis;
        }
        getHolePos() {
            return this.m_hole.getPos();
        }
    }

    class StrikeGroundManager extends Laya.Script3D {
        constructor() {
            super();
            this.effect_list = new Array();
        }
        static Instance() {
            return this._instance;
        }
        onAwake() {
            StrikeGroundManager._instance = this;
            this.m_owner = this.owner;
            this.m_effect_pre = PreManager.getPre(PreType.StrikeGroundEffect);
            this.effect_list.push(this.m_effect_pre);
            this.m_effect_pre.active = false;
        }
        ShowEffect(pos) {
            let effect = null;
            for (let i = 0; i < this.effect_list.length; i++) {
                if (!this.effect_list[i].active) {
                    effect = this.effect_list[i];
                    break;
                }
            }
            if (effect == null) {
                effect = PreManager.createPre(PreType.StrikeGroundEffect, this.m_owner);
                this.effect_list.push(effect);
            }
            effect.transform.position = pos;
            effect.active = true;
            Laya.timer.once(1000, this, () => {
                effect.active = false;
            });
        }
    }

    class OverHole extends Hole {
        constructor() {
            super();
            this.couldOver = true;
        }
        onAwake() {
            super.onAwake();
            this.m_box = this.owner.parent.getChildByName("Box");
        }
        onStart() {
            super.onStart();
            this.m_box.active = !this.isAwardGame && !GameManager.Instance().getIsRank();
        }
        onCollisionEnter(collision) {
            if (!this.couldOver)
                return;
            if (collision.other.owner.name == "Ball" || collision.other.owner.name == "aBall") {
                this.couldOver = false;
                let ball = collision.other.owner.getComponent(Ball);
                ball.hide();
                let manager = ball.getManager();
                if (manager.name == "PlayerManager") {
                    this.getScore_effect.active = true;
                    VibrateMgr.vibrateShort();
                    this.m_key.active = false;
                    console.log("游戏结束");
                    GameManager.Instance().gameOver();
                    AImanager.Instance().onGameOver(false);
                }
            }
            else if (collision.other.owner.name == "ball0" || collision.other.owner.name == "ball1") {
                this.couldOver = false;
                console.log("对手进球了");
                let ball = collision.other.owner.getComponent(Ball);
                ball.hide();
                GameManager.Instance().gameOver(false);
                AImanager.Instance().onGameOver(true);
            }
        }
    }

    class OverStage extends Stage {
        constructor() { super(); }
        CreateFlag() {
            let flag = PreManager.createPre(PreType.OverFlag, this.m_stage);
            flag.transform.position = this.RandomFlagPos();
            this.m_hole = flag.getChildByName("Hole").addComponent(OverHole);
            this.right_dis = flag.transform.position.z - this.m_beatPos.z;
        }
    }

    class StageManager extends Laya.Script3D {
        constructor() {
            super();
            this._levelConfig = new Array();
            this.stage_dis = 9;
            this._level_right_dis = new Array();
        }
        static Instance() {
            return this._instance;
        }
        onAwake() {
            StageManager._instance = this;
            this.m_owner = this.owner;
            this.m_owner.addComponent(StrikeGroundManager);
        }
        SetStage(array, complete, barrier_list, barrier_type_list) {
            this._levelConfig = [];
            this._level_right_dis = [];
            let pos_z = 0;
            let barrier_num = 0;
            for (let i = 0; i < array.length; i++) {
                if (i < array.length - 1) {
                    let stage = PreManager.createPre(PreType[array[i]], this.m_owner).addComponent(Stage);
                    if (barrier_list) {
                        if (barrier_list[barrier_num] == i) {
                            stage.CreateFlag(barrier_type_list[barrier_num]);
                            barrier_num++;
                        }
                        else {
                            stage.CreateFlag();
                        }
                    }
                    else {
                        stage.CreateFlag();
                    }
                    stage.SetHoleId(i);
                    stage.Show(new Laya.Vector3(0, 0, pos_z));
                    this._levelConfig.push(stage);
                    this._level_right_dis.push(stage.getRightDis());
                    pos_z += this.stage_dis;
                }
                else {
                    let stage = PreManager.createPre(PreType[array[i]], this.m_owner).addComponent(OverStage);
                    stage.CreateFlag();
                    stage.SetHoleId(i);
                    stage.Show(new Laya.Vector3(0, 0, pos_z));
                    this._levelConfig.push(stage);
                    this._level_right_dis.push(stage.getRightDis());
                }
            }
            if (complete)
                complete();
        }
        GetStageById(id) {
            return this._levelConfig[id];
        }
        DestroyStage() {
            if (this._levelConfig) {
                this._levelConfig.forEach(item => {
                    let stage = item.owner;
                    stage.destroy();
                });
            }
        }
        getRightDis(id) {
            return this._level_right_dis[id];
        }
    }

    var View_sdlyg_Def;
    (function (View_sdlyg_Def) {
        View_sdlyg_Def["None"] = "";
        View_sdlyg_Def["TipsView"] = "View/TipsView.json";
        View_sdlyg_Def["ClickGetPrize"] = "View/ClickGetPrize.json";
        View_sdlyg_Def["MenuView"] = "subRes/View/MenuView.json";
        View_sdlyg_Def["LotteryView"] = "subRes/View/LotteryView.json";
        View_sdlyg_Def["BagView"] = "subRes/View/BagView.json";
        View_sdlyg_Def["OverView"] = "subRes/View/OverView.json";
        View_sdlyg_Def["OverDeriveView"] = "subRes/View/OverDeriveView.json";
        View_sdlyg_Def["MoreGameView"] = "subRes/View/MoreGameView.json";
        View_sdlyg_Def["GameView"] = "subRes/View/GameView.json";
        View_sdlyg_Def["ReliveView"] = "subRes/View/ReliveView.json";
        View_sdlyg_Def["SideAdView"] = "subRes/View/SideAdView.json";
        View_sdlyg_Def["RankView"] = "subRes/View/RankView.json";
        View_sdlyg_Def["MoreGame"] = "subRes/View/MoreGame.json";
        View_sdlyg_Def["TrySkinView"] = "subRes/View/TrySkinView.json";
        View_sdlyg_Def["EnterGamePop"] = "subRes/View/EnterGamePop.json";
        View_sdlyg_Def["NativeView"] = "subRes/View/NativeView.json";
    })(View_sdlyg_Def || (View_sdlyg_Def = {}));
    class View_sdlyg_Mgr {
        constructor() {
            this._views = {};
        }
        openView(viewType, data, oncomplate) {
            if (this._views[viewType]) {
                var view = this._views[viewType];
                let coms = view._components;
                let viewBase = null;
                if (coms) {
                    for (let index = 0; index < coms.length; index++) {
                        const element = coms[index];
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
                let coms = owner._components;
                let viewBase = null;
                if (coms) {
                    for (let index = 0; index < coms.length; index++) {
                        const element = coms[index];
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
        }
        closeView(viewType) {
            var view = this._views[viewType];
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
                this._views[viewType] = null;
            }
        }
        ShowView(viewType) {
            var view = this._views[viewType];
            if (view) {
                let coms = view._components;
                if (coms) {
                    for (let index = 0; index < coms.length; index++) {
                        const element = coms[index];
                        if (element._viewBase) {
                            element.show();
                            break;
                        }
                    }
                }
            }
        }
        hideView(viewType) {
            var view = this._views[viewType];
            if (view) {
                let coms = view._components;
                if (coms) {
                    for (let index = 0; index < coms.length; index++) {
                        const element = coms[index];
                        if (element._viewBase) {
                            element.hide();
                            break;
                        }
                    }
                }
            }
        }
        getView(viewType) {
            return this._views[viewType];
        }
        showTips(msg) {
            this.openView(View_sdlyg_Def.TipsView, msg);
        }
    }
    View_sdlyg_Mgr.instance = new View_sdlyg_Mgr();

    class ViewBase extends Laya.Script {
        constructor() {
            super(...arguments);
            this.onCloseEvent = null;
            this.onOpenEvent = null;
            this._viewBase = true;
            this._viewDef = View_sdlyg_Def.None;
            this._data = {};
        }
        onAwake() {
            this.owner.autoDestroyAtClosed = true;
            this.owner.height = Laya.stage.height;
        }
        onEnable() {
            console.log("onEnable");
            this.addEvent();
        }
        onDisable() {
            this.removeEvent();
        }
        onDestroy() {
            this.removeEvent();
        }
        openView(data) {
            this._data = data;
            this.show();
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.Game_OnViewOpen, { view: this._viewDef });
            if (this.onOpenEvent) {
                this.onOpenEvent();
            }
        }
        addEvent() {
        }
        removeEvent() {
            Laya.timer.clearAll(this);
        }
        closeView() {
            View_sdlyg_Mgr.instance.closeView(this._viewDef);
        }
        hide() {
            this.owner.visible = false;
            this.onHide();
        }
        show() {
            this.owner.visible = true;
            this.onShow();
        }
        viewIsHide() {
            return this.owner.alpha == 0;
        }
        onHide() { }
        onShow() { }
        onClose() {
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this);
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.Game_OnViewClose, { view: this._viewDef });
            if (this.onCloseEvent) {
                this.onCloseEvent();
            }
        }
    }

    class Cup extends Laya.Script {
        constructor() {
            super();
            this.starList = new Array();
            this.current_star_num = 0;
        }
        onAwake() {
            this.m_owner = this.owner;
            this.condition = this.m_owner.getChildByName("condition");
            let stars = this.m_owner.getChildByName("stars");
            for (let i = 0; i < 5; i++) {
                let s = stars.getChildByName("star" + i);
                s.alpha = 0;
                this.starList.push(s);
            }
            this.showStar();
        }
        showStar() {
            let rank_level = Math.min(Math.floor(Us_sdlyg_er.getRankLevel() / 5), 5);
            this.condition.skin = "Rank/condition" + rank_level + ".png";
            this.m_owner.skin = "Rank/level" + rank_level + ".png";
            this.current_star_num = Us_sdlyg_er.getRankLevel() % 5;
            for (let i = 0; i <= this.current_star_num; i++) {
                this.starList[i].alpha = 1;
            }
        }
        hideStar() {
            for (let i = 0; i < 5; i++) {
                this.starList[i].alpha = 0;
            }
        }
    }

    class OverCup extends Cup {
        constructor() { super(); }
        onStart() {
            super.onStart();
            this.condition.visible = false;
        }
        addStar() {
            if (Us_sdlyg_er.getRankLevel() >= 30)
                return;
            Us_sdlyg_er.addRankLevel();
            this.current_star_num++;
            if (this.current_star_num >= 5) {
                this.changeLevel();
            }
            else {
                this.starList[this.current_star_num].scale(0, 0);
                Laya.timer.once(500, this, () => {
                    Sound_sdlyg_Mgr.instance.playSound(SoundType.AddStar);
                    Laya.Tween.to(this.starList[this.current_star_num], { alpha: 1, scaleX: 1.2, scaleY: 1.2 }, 500, Laya.Ease.quadInOut, Laya.Handler.create(this, () => {
                        Laya.Tween.to(this.starList[this.current_star_num], { scaleX: 1, scaleY: 1 }, 200, Laya.Ease.circInOut);
                    }));
                });
            }
        }
        subStar() {
            Us_sdlyg_er.subRankLevel();
            if (this.current_star_num <= 0) {
                this.changeLevel();
            }
            else {
                Laya.timer.once(500, this, () => {
                    Laya.Tween.to(this.starList[this.current_star_num], { alpha: 0 }, 500);
                });
            }
        }
        changeLevel() {
            Laya.Tween.to(this.m_owner, { scaleX: 0, scaleY: 0 }, 500, Laya.Ease.circInOut, Laya.Handler.create(this, () => {
                this.hideStar();
                this.current_star_num = 0;
                this.showStar();
                Laya.Tween.to(this.m_owner, { scaleX: 1, scaleY: 1 }, 800, Laya.Ease.circInOut);
            }));
        }
        hide() {
            this.m_owner.visible = false;
        }
    }

    class CachedWXBannerAd {
        static preloadBanner() {
            var wxWuDianBanners = AppSwitchConfig.getInstance().getAppSwitchData().wxWuDianBanners;
            var bannerTodayBannerMax = AppSwitchConfig.getInstance().getAppSwitchData().bannerTodayBannerMax;
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
            Laya.timer.loop(2000, CachedWXBannerAd._preLoopObj, () => {
                if (counter >= preLoadBanners.length) {
                    Laya.timer.clearAll(CachedWXBannerAd._preLoopObj);
                    return;
                }
                var bannerid = preLoadBanners[counter];
                var banner = CachedWXBannerAd._bannerCache[bannerid];
                if (null == banner) {
                    banner = CachedWXBannerAd.create(bannerid);
                    if (null != banner) {
                        CachedWXBannerAd._bannerCache[bannerid] = banner;
                        console.log("预创建微信Bannaer", bannerid, "完成");
                    }
                }
                ++counter;
            });
        }
        static getBanner(bannerid) {
            if (null == bannerid || "" == bannerid)
                return null;
            var banner = CachedWXBannerAd._bannerCache[bannerid];
            if (null == banner) {
                banner = CachedWXBannerAd.create(bannerid);
                if (null != banner) {
                    CachedWXBannerAd._bannerCache[bannerid] = banner;
                }
            }
            return banner;
        }
        static create(bannerid) {
            if (Laya.Browser.onMiniGame) {
                var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
                var sw = sysInfo.screenWidth;
                var sh = sysInfo.screenHeight;
                var banner = Laya.Browser.window["wx"].createBannerAd({
                    adUnitId: bannerid,
                    adIntervals: 30,
                    style: {
                        left: 0,
                        top: (Laya.stage.height - 270) / Laya.stage.height * sh,
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
        static show() {
            if (null != CachedWXBannerAd._curBanner) {
                CachedWXBannerAd._curBanner.hide();
                CachedWXBannerAd._curBanner = null;
            }
            var wuDianBanners = AppSwitchConfig.getInstance().getAppSwitchData().wxWuDianBanners;
            var bannerid = wuDianBanners[Math.floor(Math.random() * wuDianBanners.length)];
            var banner = CachedWXBannerAd.getBanner(bannerid);
            if (banner) {
                CachedWXBannerAd._curBanner = banner;
                var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
                var sw = sysInfo.screenWidth;
                var sh = sysInfo.screenHeight;
                CachedWXBannerAd._curBanner.style.top = (Laya.stage.height - 270) / Laya.stage.height * sh;
                CachedWXBannerAd._curBanner.show();
                console.log("CachedWXBanner 广告显示 bannerid ： ", bannerid);
            }
            var time = AppSwitchConfig.getInstance().getAppSwitchData().bannerFreshTimer;
        }
        static hide() {
            Laya.timer.clearAll(CachedWXBannerAd);
            if (null != CachedWXBannerAd._curBanner) {
                CachedWXBannerAd._curBanner.hide();
                CachedWXBannerAd._curBanner = null;
            }
            console.log("CachedWXBanner 广告隐藏");
        }
        static changeShow() {
            if (null != CachedWXBannerAd._curBanner) {
                CachedWXBannerAd._curBanner.hide();
                CachedWXBannerAd._curBanner = null;
            }
            CachedWXBannerAd.show();
        }
        static clear() {
            Laya.timer.clearAll(CachedWXBannerAd);
            for (var key in CachedWXBannerAd._bannerCache) {
                var banner = CachedWXBannerAd._bannerCache[key];
                if (null != banner) {
                    banner.destroy();
                }
                CachedWXBannerAd._bannerCache[key] = null;
            }
        }
    }
    CachedWXBannerAd._bannerCache = {};
    CachedWXBannerAd._curBanner = null;
    CachedWXBannerAd._preLoopObj = {};

    class OverView extends ViewBase {
        constructor() {
            super();
            this.is_rank = false;
            this.moveDis = 250;
            this.wudianBannerShow = false;
        }
        onAwake() {
            this.btn_openTreasure = this.owner.getChildByName("btn_openTreasure");
            this.btn_continue = this.owner.getChildByName("btn_continue");
            this.title = this.owner.getChildByName("title");
            this.btn_sideAD = this.owner.getChildByName("btn_sideAD");
            this.btn_sideAD.visible = false;
            this.bg = this.owner.getChildByName("bg");
            this.m_cup = this.owner.getChildByName("cup").getComponent(OverCup);
            this.is_rank = GameManager.Instance().getIsRank();
        }
        onStart() {
            this.setTitle(this._data);
            if (this.is_rank) {
                this.inRank();
            }
            else {
                this.inNormal();
            }
            if (WudianMgr.WudianFlag) {
                this.hideBanner();
                this.addWuDianEvent();
                this.btnMoveStart();
            }
            else {
                this.showBanner();
                this.addBtnEvent();
            }
        }
        onDestroy() {
            super.onDestroy();
            this.hideBanner();
            Game_sdlyg_Mgr.getInstance().saveGameData();
        }
        addEvent() {
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.MoreGameView, this, this.hideBanner);
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.OutMoreGameView, this, this.backMoreGame);
            this.btn_sideAD.on(Laya.Event.CLICK, this, this.clickSideAD);
        }
        removeEvent() {
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.MoreGameView, this, this.hideBanner);
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.OutMoreGameView, this, this.backMoreGame);
            this.btn_sideAD.off(Laya.Event.CLICK, this, this.clickSideAD);
            this.removeBtnEvent();
        }
        addBtnEvent() {
            this.btn_openTreasure.on(Laya.Event.CLICK, this, this.clickOpenTreasure);
            this.btn_continue.on(Laya.Event.CLICK, this, this.clickContinue);
        }
        removeBtnEvent() {
            this.btn_openTreasure.off(Laya.Event.CLICK, this, this.clickOpenTreasure);
            this.btn_continue.off(Laya.Event.CLICK, this, this.clickContinue);
        }
        addWuDianEvent() {
            this.btn_openTreasure.on(Laya.Event.CLICK, this, this.clickShowWudianBanner);
            this.btn_continue.on(Laya.Event.CLICK, this, this.clickShowWudianBanner);
        }
        removeWuDianEvent() {
            this.btn_openTreasure.off(Laya.Event.CLICK, this, this.clickShowWudianBanner);
            this.btn_continue.off(Laya.Event.CLICK, this, this.clickShowWudianBanner);
        }
        btnMoveStart() {
            this.btn_openTreasure.bottom = this.btn_openTreasure.bottom - this.moveDis;
            this.btn_continue.bottom = this.btn_continue.bottom - this.moveDis;
        }
        btnMoveEnd() {
            this.btn_openTreasure.bottom = this.btn_openTreasure.bottom + this.moveDis;
            this.btn_continue.bottom = this.btn_continue.bottom + this.moveDis;
        }
        setTitle(type) {
            this.title.alpha = 0;
            switch (type) {
                case OverViewType.WinGame:
                    this.title.skin = "Over/win_title.min.png";
                    if (this.is_rank) {
                        this.btn_openTreasure.visible = false;
                        this.m_cup.addStar();
                    }
                    else {
                        this.btn_continue.visible = false;
                    }
                    break;
                case OverViewType.LoseGame:
                    this.title.skin = "Over/lose_title.min.png";
                    this.btn_openTreasure.visible = false;
                    if (this.is_rank) {
                        this.m_cup.subStar();
                    }
                    break;
                case OverViewType.ClickGetPrize:
                    this.title.skin = "Over/win_title.min.png";
                    if (this.is_rank) {
                        this.btn_openTreasure.visible = false;
                        this.m_cup.addStar();
                    }
                    else {
                        this.btn_continue.visible = false;
                    }
                    break;
            }
            Laya.Tween.to(this.title, { alpha: 1 }, 500, Laya.Ease.quintOut);
        }
        inRank() {
            this.bg.visible = true;
            this.title.visible = false;
            Laya.timer.once(2000, this, () => {
                WXAPI.showInterstitialAd(() => { }, () => { });
            });
        }
        inNormal() {
            this.bg.visible = false;
            this.m_cup.hide();
            WXAPI.showInterstitialAd(() => { }, () => { });
        }
        clickOpenTreasure() {
            Laya.Tween.clearAll(this.title);
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.LotteryView, this._data);
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.OverView);
        }
        clickContinue() {
            Laya.Tween.clearAll(this.title);
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.OverView);
            if (GameManager.Instance().getIsRank()) {
                AImanager.Instance().hide();
                CameraCtrl.Instance().SetState(CameraState.Menu);
                View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.RankView);
            }
            else {
                GameManager.Instance().normalStart();
            }
        }
        clickSideAD() {
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.SideAdView);
        }
        backMoreGame() {
            if (this.wudianBannerShow)
                this.showBanner();
        }
        showBanner() {
            CachedWXBannerAd.show();
        }
        hideBanner() {
            CachedWXBannerAd.hide();
        }
        clickShowWudianBanner() {
            this.removeWuDianEvent();
            Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer * 1000, this, () => {
                this.showBanner();
                this.wudianBannerShow = true;
            });
            Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer * 1000, this, () => {
                this.addBtnEvent();
                this.btnMoveEnd();
            });
        }
    }
    var OverViewType;
    (function (OverViewType) {
        OverViewType[OverViewType["WinGame"] = 0] = "WinGame";
        OverViewType[OverViewType["LoseGame"] = 1] = "LoseGame";
        OverViewType[OverViewType["ClickGetPrize"] = 2] = "ClickGetPrize";
    })(OverViewType || (OverViewType = {}));

    class GameManager extends Laya.Script {
        constructor() {
            super();
            this._stage_Max = 8;
            this._stage_Min = 4;
            this._stage_current_amount = 0;
            this.inGame = false;
            this.current_game_ball_amount = 0;
            this.isFirst = true;
            this.gameTimer = 0;
            this.owner_key = 1;
            this.user_avatarUrl = null;
            this.is_rank_game = false;
        }
        static Instance() {
            return this._instance;
        }
        onAwake() {
            GameManager._instance = this;
            this.m_owner = this.owner;
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MenuView);
            this.level_config_json = Game_sdlyg_Mgr.getInstance().getLevelJson();
        }
        onStart() {
            StageManager.Instance().SetStage(this.RandomLevel());
            SceneManager.Instance().setAwardScene();
        }
        SetLevelByJson() {
            let data = this.level_config_json[Us_sdlyg_er.getLeveNum()];
            let res = this.RandomLevel(data.amount);
            StageManager.Instance().SetStage(res, () => {
                PlayerManager.Instance().resetPlayer();
            }, data.barrier_id_list, data.barrier_type_list);
        }
        RandomLevel(amount) {
            let res = new Array();
            if (!amount)
                amount = this._stage_Min + Math.floor(Math.random() * (this._stage_Max - this._stage_Min));
            this._stage_current_amount = amount;
            this.current_game_ball_amount = amount * 3;
            if (Us_sdlyg_er.getLeveNum() == 0) {
                this.current_game_ball_amount = 100;
            }
            for (let i = 0; i < amount; i++) {
                let stage_random = Math.floor(ConstManager.stagePre_Amount * Math.random()) + 1;
                let name = "Stage" + stage_random;
                res.push(name);
            }
            if (this.gameTimer == 3)
                this.current_game_ball_amount = 3;
            if (this.is_rank_game)
                this.current_game_ball_amount = 1000;
            return res;
        }
        normalStart() {
            if (WudianMgr.WudianFlag) {
                this.openClickGetPrize(Laya.Handler.create(this, () => {
                    this.refreshStage();
                }));
            }
            else {
                this.refreshStage();
            }
        }
        rankStart(ai_path) {
            if (WudianMgr.WudianFlag) {
                this.openClickGetPrize(Laya.Handler.create(this, () => {
                    this.rankGameStart(ai_path);
                }));
            }
            else {
                this.rankGameStart(ai_path);
            }
        }
        refreshStage() {
            let self = this;
            this.is_rank_game = false;
            Game_sdlyg_Mgr.getInstance().saveGameData();
            StageManager.Instance().DestroyStage();
            if (Us_sdlyg_er.getLeveNum() < 10 && this.gameTimer != 3) {
                this.SetLevelByJson();
            }
            else if (this.gameTimer == 3 && !this.is_rank_game) {
                StageManager.Instance().SetStage(this.RandomLevel(9), () => {
                    PlayerManager.Instance().resetPlayer();
                });
            }
            else {
                StageManager.Instance().SetStage(this.RandomLevel(), () => {
                    PlayerManager.Instance().resetPlayer();
                });
            }
            SceneManager.Instance().randomEnv();
            Laya.timer.once(850, this, this.gameStart);
        }
        gameStart() {
            let complete = Laya.Handler.create(this, () => {
                this.inGame = true;
                this.getIsAwardGame() ? this.owner_key = 0 : this.owner_key = 1;
                View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.GameView);
                Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.GameStart);
                CameraCtrl.Instance().SetState(CameraState.GameStart);
            });
            if (Us_sdlyg_er.ownerPropAll()) {
                complete.method();
            }
            else {
                View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.TrySkinView, complete);
            }
        }
        rankGameStart(ai_path) {
            let complete = Laya.Handler.create(this, () => {
                this.is_rank_game = true;
                let data = {
                    aiPic: ai_path,
                    playPic: this.user_avatarUrl
                };
                StageManager.Instance().DestroyStage();
                StageManager.Instance().SetStage(this.RandomLevel(), () => {
                    PlayerManager.Instance().resetPlayer();
                });
                SceneManager.Instance().randomEnv();
                Laya.timer.once(850, this, () => {
                    this.inGame = true;
                    View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.GameView, data);
                    Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.GameStart);
                    CameraCtrl.Instance().SetState(CameraState.GameStart);
                    AImanager.Instance().onGameStart();
                });
            });
            if (Us_sdlyg_er.ownerPropAll()) {
                complete.method();
            }
            else {
                View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.TrySkinView, complete);
            }
        }
        openClickGetPrize(method) {
            let data = {};
            data.Complete = function () {
                console.log("狂点按钮结束");
                method.method();
                Us_sdlyg_er.addMoney(50);
                Sound_sdlyg_Mgr.instance.playSound(SoundType.GetCoin);
            };
            data.PrizeCount = 50;
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.ClickGetPrize, data);
        }
        couldRelive() {
            this.inGame = false;
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.GameView);
            PlayerManager.Instance().onGameOver(false);
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.ReliveView);
        }
        gameOver(isWin = true) {
            if (this.isFirst)
                this.isFirst = false;
            if (!this.inGame && isWin)
                return;
            this.inGame = false;
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.GameView);
            PlayerManager.Instance().onGameOver(isWin);
            CameraCtrl.Instance().SetState(CameraState.GameOver);
            Laya.timer.once(2000, this, () => {
                if (isWin) {
                    View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.OverView, OverViewType.WinGame);
                }
                else {
                    View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.OverView, OverViewType.LoseGame);
                }
            });
            if (isWin) {
                if (this.gameTimer != 3 && !this.is_rank_game)
                    Us_sdlyg_er.addLevelNum();
                Sound_sdlyg_Mgr.instance.playSound(SoundType.Win);
            }
            else {
                Sound_sdlyg_Mgr.instance.playSound(SoundType.Lose);
            }
            if (!this.is_rank_game)
                this.gameTimer++;
            if (this.gameTimer > 3)
                this.gameTimer = 0;
        }
        gameRelive() {
            this.current_game_ball_amount = 3;
            this.inGame = true;
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.GameStart);
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.GameView);
        }
        getInGame() {
            return this.inGame;
        }
        getGameBall() {
            return this.current_game_ball_amount;
        }
        getHighView() {
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            return (aspectRatio < 0.5);
        }
        onKeyDown(e) {
            console.log(e.keyCode);
            if (e.keyCode == 80) {
                this.refreshStage();
            }
            else if (e.keyCode == 101) {
                this.gameStart();
            }
            else if (e.keyCode == 104) {
                CameraCtrl.Instance().SetState(CameraState.GameStart);
            }
        }
        getFirst() {
            return this.isFirst;
        }
        getIsAwardGame() {
            return (this.gameTimer == 3 && !this.is_rank_game);
        }
        getOnerKeyNum() {
            return this.owner_key;
        }
        setOnerKeyNum(num) {
            this.owner_key = num;
        }
        getCurrentStageAmount() {
            return this._stage_current_amount;
        }
        getUserAvatarUrl() {
            return this.user_avatarUrl;
        }
        saveUserAvatarUrl(path) {
            this.user_avatarUrl = path;
        }
        getIsRank() {
            return this.is_rank_game;
        }
    }
    GameManager.is_first_add_ball = true;

    class SceneManager extends Laya.Script3D {
        constructor() {
            super();
            this.env_plane_list = new Array();
            this.last_specila_trans = 0;
            this.env_sprite3D_list = new Array();
            this.skyPath = [
                "subRes/LayaScene_1/Conventional/Assets/Mat/sky04.lmat",
                "subRes/LayaScene_1/Conventional/Assets/Mat/sky02.lmat",
            ];
            this.awardSkyPath = "subRes/LayaScene_1/Conventional/Assets/Mat/sky07.lmat";
        }
        static Instance() {
            return this._instance;
        }
        onAwake() {
            SceneManager._instance = this;
            this.m_scene = this.owner;
            this.Init();
        }
        Init() {
            let preManager = this.m_scene.getChildByName("PreManager");
            preManager.addComponent(PreManager);
            let gameManager = this.m_scene.getChildByName("GameManager");
            gameManager.addComponent(GameManager);
            let stageManager = this.m_scene.getChildByName("StageManager");
            stageManager.addComponent(StageManager);
            let camera = this.m_scene.getChildByName("Main Camera");
            camera.addComponent(CameraCtrl);
            let playerManager = this.m_scene.getChildByName("PlayerManager");
            playerManager.addComponent(PlayerManager);
            let aiManager = this.m_scene.getChildByName("AIManager");
            aiManager.addComponent(AImanager);
            this.m_directionLight = this.m_scene.getChildByName("Directional Light");
            this.sky = this.m_scene.skyRenderer;
            this.m_plane = this.m_scene.getChildByName("Plane");
            for (let i = 0; i < 4; i++) {
                let p = this.m_plane.getChildByName("Plane" + i);
                this.env_plane_list.push(p);
            }
            this.m_water = this.m_plane.getChildByName("water");
            Laya.Sprite3D.load(App_sdlyg_Config.ResServer + "/stage/Conventional/stage.lh", Laya.Handler.create(this, function (sp) {
                for (let i = 0; i < 4; i++) {
                    let cj = sp.getChildByName("cj" + i);
                    this.m_scene.addChild(cj);
                    this.env_sprite3D_list.push(cj);
                    cj.transform.translate(new Laya.Vector3(0, 0.25, 0));
                    cj.active = false;
                }
                console.log(this.env_sprite3D_list.length);
            }));
            this.randomEnv();
        }
        setLight() {
            this.m_directionLight.shadowMode = Laya.ShadowMode.SoftLow;
            this.m_directionLight.shadowDistance = 5;
            this.m_directionLight.shadowResolution = 2048;
        }
        randomEnv() {
            this.m_plane.active = true;
            this.m_water.active = true;
            if (this.current_special_cj)
                this.current_special_cj.active = false;
            let num = Math.floor(Math.random() * 2);
            if (GameManager.Instance().getIsAwardGame()) {
                this.setAwardScene();
            }
            else {
                this.SetSkyMat(this.skyPath[num]);
            }
            this.env_plane_list.forEach(plane => {
                if (num == 0)
                    num = 2;
                plane.meshRenderer.material = plane.meshRenderer.materials[num];
            });
            if (GameManager.Instance().getIsRank()) {
                this.addEnv();
            }
        }
        setRankEnv(cj) {
            cj.transform.translate(new Laya.Vector3(0, 0, -this.last_specila_trans));
            let num = 9 - GameManager.Instance().getCurrentStageAmount();
            this.last_specila_trans = -9 * num + 2;
            let tran = new Laya.Vector3(0, 0, this.last_specila_trans);
            cj.transform.translate(tran);
            cj.active = true;
            this.m_water.active = false;
        }
        addEnv() {
            if (this.env_sprite3D_list.length > 0) {
                let i = 0;
                if (Math.floor((Us_sdlyg_er.getRankLevel() / 5)) == 2)
                    i = 1;
                if (Math.floor((Us_sdlyg_er.getRankLevel() / 5)) == 3)
                    i = 2;
                if (Math.floor((Us_sdlyg_er.getRankLevel() / 5)) == 4)
                    i = 3;
                if (Math.floor((Us_sdlyg_er.getRankLevel() / 5)) == 5)
                    i = 3;
                this.current_special_cj = this.env_sprite3D_list[i];
                this.setRankEnv(this.current_special_cj);
                this.m_plane.active = i == 0;
            }
        }
        setAwardScene() {
            this.SetSkyMat(this.awardSkyPath);
        }
        SetSkyMat(path) {
            Laya.BaseMaterial.load(path, Laya.Handler.create(this, function (mat) {
                this.sky.material = mat;
            }));
        }
    }

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
                GameSwitchConfig._instance = new GameSwitchConfig();
            }
            return GameSwitchConfig._instance;
        }
        static load() {
            if (GameSwitchConfig.resUrl != '') {
                Laya.loader.load(GameSwitchConfig.resUrl, Laya.Handler.create(this, (res) => {
                    if (res) {
                        for (const key of Object.keys(res)) {
                            GameSwitchConfig._instance[key] = res[key];
                        }
                        GameSwitchConfig._instance.SetBannerActive();
                    }
                }));
            }
            else {
                GameSwitchConfig._instance.SetBannerActive();
            }
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

    class Game_sdlyg_Mgr extends Laya.Script {
        constructor() {
            super();
            Game_sdlyg_Mgr._instance = this;
        }
        static getInstance() { return Game_sdlyg_Mgr._instance; }
        onAwake() {
            MaiLiang.GetMaiLiangOpenId(function (res) {
                console.log("GameUI 买量数据上报成功");
                Laya.Browser.window["wx"].onShow(function () {
                    MaiLiang.GetMaiLiangOpenId(null, null);
                });
                Laya.Browser.window["wx"].onHide(function () {
                    MaiLiang.ReportStayTime(null, null);
                });
            }, function (res) {
                console.log("GameUI 买量数据上报失败");
            });
            WXAPI.SetShareMenu("", "", () => {
            }, () => {
            }, () => {
            });
            WudianMgr.UpdateIpBlockState();
        }
        onStart() {
            this.preCreateGame();
        }
        preCreateGame() {
            let self = this;
            GameSwitchConfig.getInstance().hideBanner();
            Laya.loader.load('subRes/json/levelConfig.json', Laya.Handler.create(self, () => {
                self.level_json = Laya.loader.getRes('subRes/json/levelConfig.json');
                Laya.Scene3D.load("subRes/LayaScene_1/Conventional/1.ls", Laya.Handler.create(self, function (scene) {
                    Laya.stage.addChild(scene);
                    scene.addComponent(SceneManager);
                    Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.App_CloseFirstLoadingView);
                    GameSwitchConfig.getInstance().SetBannerActive();
                }));
            }));
        }
        saveGameData() {
            HttpUnit.saveGameData(Us_sdlyg_er.getSaveData(), (res) => {
                if (res.code == 1) {
                    console.log("存档成功");
                }
                else {
                    console.log("存档失败");
                }
            }, (res) => {
                console.log("存档失败");
            });
        }
        getLevelJson() {
            return this.level_json;
        }
    }
    Game_sdlyg_Mgr._instance = null;

    class MyBagItem extends Laya.Script {
        constructor() {
            super();
            this.icon_skin_path = "subRes/propsLogo/";
            this.new_rot = 1;
        }
        onAwake() {
            this.m_icon = this.owner.getChildByName("m_icon");
            this.m_lock = this.owner.getChildByName("m_lock");
            this.choose = this.owner.getChildByName("choose");
            this.m_new = this.owner.getChildByName("new");
            this.m_new.visible = false;
            this.choose.visible = false;
            this.m_name = this.owner.name;
            this.setLock();
            this.setIcon();
        }
        onStart() {
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ChooseProp, this, this.onChoose);
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.GetNewSkin, this, this.GetNew);
        }
        onDestroy() {
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ChooseProp, this, this.onChoose);
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.GetNewSkin, this, this.GetNew);
        }
        onUpdate() {
            if (this.m_new.visible) {
                this.m_new.rotation += this.new_rot;
                if (Math.abs(this.m_new.rotation) >= 15)
                    this.new_rot = -this.new_rot;
            }
        }
        setLock() {
            if (this.m_lock) {
                this.m_lock.visible = !Us_sdlyg_er.ownerProp(this.m_name);
            }
        }
        GetNew(name) {
            if (name == this.m_name)
                this.m_new.visible = true;
            this.setLock();
        }
        setIcon() {
            if (this.m_name) {
                this.m_icon.skin = this.icon_skin_path + this.m_name + ".png";
            }
        }
        onClick() {
            Sound_sdlyg_Mgr.instance.playSound(SoundType.Button);
            if (Us_sdlyg_er.ownerProp(this.m_name)) {
                if (this.m_new.visible)
                    this.m_new.visible = false;
                Sound_sdlyg_Mgr.instance.playSound(SoundType.SkinBtn);
                Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.ChooseProp, this.m_name);
            }
        }
        onChoose(name) {
            name == this.m_name ? this.choose.visible = true : this.choose.visible = false;
        }
    }

    class MyList extends Laya.Script {
        constructor() {
            super();
            this.x_page_space = 0;
            this.x_repeat = 0;
            this.y_repeat = 0;
            this.x_item_space = 0;
            this.y_item_space = 0;
            this.repeat_amount = 0;
            this.type_name = "所属类型名称";
            this.start_x = 0;
            this.page_List = new Array();
            this.in_move = false;
            this.current_index = 0;
            this.last_mouse_x = 0;
            this.pageNum = 0;
            this.start_click_x = 0;
            this.prop_id = 0;
        }
        onAwake() {
            this.m_owner = this.owner;
            this.page_item.visible = false;
            this.start_x = this.m_owner.x;
            this.pageNum = Math.ceil(this.repeat_amount / (this.x_repeat * this.y_repeat));
        }
        onStart() {
            for (let i = 0; i < this.pageNum; i++) {
                this.createPage(i);
            }
            this.m_owner.width = this.page_item.width * this.pageNum + this.x_page_space * (this.pageNum - 1);
        }
        createPage(id) {
            let page = new Laya.Sprite();
            page.height = this.page_item.height;
            page.width = this.page_item.width;
            page.texture = this.page_item.texture;
            page.pos(this.page_item.x + id * (this.page_item.width + this.x_page_space), this.page_item.y);
            for (let y_id = 0; y_id < this.y_repeat; y_id++) {
                for (let x_id = 0; x_id < this.x_repeat; x_id++) {
                    if (this.prop_id < this.repeat_amount) {
                        let item = this.createItem(this.prop_id, x_id, y_id, page);
                        this.prop_id++;
                    }
                }
            }
            this.m_owner.addChild(page);
            this.page_List.push(page);
        }
        createItem(id, x_id, y_id, parent) {
            let item = Laya.Pool.getItemByCreateFun("render_item", this.render_item.create, this.render_item);
            let x = x_id * item.width + this.x_item_space * (x_id + 1);
            let y = y_id * item.width + this.y_item_space * (y_id + 1);
            item.pos(x, y);
            item.name = this.type_name + id;
            this.addItemComponent(item);
            parent.addChild(item);
        }
        toPageByIndex(index) {
            this.current_index = index;
            let move_x = this.start_x - index * (this.page_item.width + this.x_page_space);
            Laya.Tween.to(this.m_owner, { x: move_x }, 50);
        }
        toPageByID(id) {
            let index = Math.floor(id / (this.x_repeat * this.y_repeat));
            this.toPageByIndex(index);
        }
        getCurrentIndex() {
            return this.current_index;
        }
        addItemComponent(item) {
            item.addComponent(MyBagItem);
        }
        onMouseDown(e) {
            this.in_move = true;
            this.last_mouse_x = e.stageX;
            this.start_click_x = e.stageX;
        }
        onMouseMove(e) {
            if (this.in_move) {
                let dis = e.stageX - this.last_mouse_x;
                this.m_owner.x += dis;
                this.last_mouse_x = e.stageX;
            }
        }
        onMouseUp(e) {
            this.in_move = false;
            if ((this.start_click_x - e.stageX > this.page_item.width / 3)) {
                this.current_index++;
            }
            else if ((this.start_click_x - e.stageX) < -this.page_item.width / 3) {
                this.current_index--;
            }
            if (this.current_index <= 0)
                this.current_index = 0;
            if (this.current_index >= this.pageNum - 1)
                this.current_index = this.pageNum - 1;
            this.toPageByIndex(this.current_index);
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.ChangePage, this.current_index);
        }
    }

    class SkinTitle extends Laya.Script {
        constructor() { super(); }
        onAwake() {
            this.m_BagView = this.owner.parent.getComponent(BagView);
            this.m_name = this.owner.name.slice(6);
            this.btn_choose = this.owner.getChildByName("btn_choose");
            this.click_bg = this.btn_choose.getChildByName("click_bg");
            this.m_display = this.owner.getChildByName("display");
            this.m_icon = this.owner.getChildByName("icon");
            this.m_display_list = this.m_display.getComponent(MyList);
            this.btn_choose.on(Laya.Event.CLICK, this, this.clickChoose);
            this.onNotChoose();
        }
        onChoose(id) {
            this.click_bg.visible = true;
            this.m_display.visible = true;
            this.m_icon.visible = true;
            this.m_display_list.toPageByID(id);
        }
        onNotChoose() {
            this.click_bg.visible = false;
            this.m_display.visible = false;
            this.m_icon.visible = false;
        }
        clickChoose() {
            this.m_BagView.chooseTitle(this.m_name);
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.ResetIcon);
        }
        getName() {
            return this.m_name;
        }
    }

    class BagView extends ViewBase {
        constructor() {
            super();
            this.title_list = new Array();
            this.titie_name_list = ["people", "club", "ball"];
        }
        onAwake() {
            this.btn_home = this.owner.getChildByName("btn_home");
            this.btn_getSkin = this.owner.getChildByName("btn_getSkin");
            this.txt_getSkinNum = this.btn_getSkin.getChildByName("num");
            for (let i = 0; i < this.titie_name_list.length; i++) {
                let title = this.owner.getChildByName("title_" + this.titie_name_list[i]).getComponent(SkinTitle);
                this.title_list.push(title);
            }
        }
        onStart() {
            let self = this;
            if (this._data) {
                this.chooseTitle(this._data.type, this._data.id);
                Laya.timer.once(100, self, () => {
                    Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.GetNewSkin, (self._data.type + self._data.id));
                });
            }
            else {
                this.chooseTitle();
            }
            this.setGetSkinBtn();
        }
        addEvent() {
            this.btn_home.on(Laya.Event.CLICK, this, this.clickBack);
            this.btn_getSkin.on(Laya.Event.CLICK, this, this.clickGetSkin);
        }
        clickBack() {
            PlayerManager.Instance().savePlayerSet();
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MenuView);
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.BagView);
        }
        clickGetSkin() {
            Us_sdlyg_er.subMoney(Us_sdlyg_er.getNeedCoin());
            Us_sdlyg_er.setNeedCoin();
            let prop_type = "";
            let prop_id = 0;
            do {
                let id = Math.floor(Math.random() * PropManager.getInstance().getPropTypeNum());
                let amount = PropManager.getInstance().getPropBase(id).amount;
                prop_type = PropManager.getInstance().getPropBase(id).type;
                prop_id = Math.floor(Math.random() * amount);
            } while (Us_sdlyg_er.ownerProp(prop_type + prop_id));
            Us_sdlyg_er.unlockProp(prop_type + prop_id);
            this.chooseTitle(prop_type, prop_id);
            Laya.timer.once(100, this, () => {
                Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.GetNewSkin, (prop_type + prop_id));
            });
            this.setGetSkinBtn();
        }
        setGetSkinBtn() {
            this.btn_getSkin.disabled = (!(Us_sdlyg_er.getNeedCoin() <= Us_sdlyg_er.getMoney())) || Us_sdlyg_er.ownerPropAll();
            this.txt_getSkinNum.text = Us_sdlyg_er.getNeedCoin().toString();
        }
        chooseTitle(name = "people", id = 0) {
            console.log(name);
            this.title_list.forEach(title => {
                if (title.getName() == name) {
                    title.onChoose(id);
                }
                else {
                    title.onNotChoose();
                }
            });
        }
    }

    class PageIcon extends Laya.Script {
        constructor() {
            super();
            this.amount = 0;
            this.page_list = new Array();
        }
        onAwake() {
            this.m_owner = this.owner;
            for (let i = 0; i < this.amount; i++) {
                let sp = this.m_owner.getChildByName("icon" + i).getChildByName("page");
                sp.visible = false;
                this.page_list.push(sp);
            }
            this.page_list[0].visible = true;
        }
        onStart() {
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ChangePage, this, this.setPage);
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ResetIcon, this, this.setPage);
        }
        onDestroy() {
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ChangePage, this, this.setPage);
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ResetIcon, this, this.setPage);
        }
        setPage(num = 0) {
            if (this.m_owner.visible) {
                this.page_list.forEach(page => {
                    page.visible = false;
                });
                this.page_list[num].visible = true;
            }
        }
    }

    class Coin extends Laya.Script {
        constructor() { super(); }
        onAwake() {
            this.amount = Us_sdlyg_er.getMoney();
            this.coin_text = this.owner.getChildByName("amount");
            this.coin_text.text = this.amount.toString();
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.Game_OnUserMoneyChange, this, this.updateCoin);
        }
        onDestroy() {
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.Game_OnUserMoneyChange, this, this.updateCoin);
        }
        updateCoin() {
            let coin = Us_sdlyg_er.getMoney();
            let step = (coin - this.amount) / 10;
            for (let i = 0; i < 10; i++) {
                Laya.timer.once(20 * i, this, () => {
                    this.amount += step;
                    this.coin_text.text = Math.floor(this.amount).toString();
                });
            }
        }
    }

    class Utilit {
        static Lerp(form, to, delta) {
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
        static lerpEulerAngle(form, to, delta) {
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
        }
        static getRotationByDir(v) {
            var dotValue = (v.x * Utilit.poinDown.x) + (v.y * Utilit.poinDown.y);
            var cos = dotValue / (v.distance(0, 0) * Utilit.poinDown.distance(0, 0));
            var radian = Math.acos(cos);
            var rotation = radian / (2 * Math.PI) * 360;
            if (v.x < 0) {
                rotation = -rotation;
            }
            return rotation;
        }
        static getRotationByDirOn3DSpace(v) {
            var dotValue = (v.x * Utilit.poinUp.x) + (v.y * Utilit.poinUp.y);
            var cos = dotValue / (v.distance(0, 0) * Utilit.poinUp.distance(0, 0));
            var radian = Math.acos(cos);
            var rotation = radian / (2 * Math.PI) * 360;
            if (v.x < 0) {
                rotation = rotation + (180 - rotation) * 2;
            }
            return rotation;
        }
        static getDirByRotation(rotation) {
            var radian = (rotation - 90) * Math.PI / 180;
            var x = Math.cos(radian);
            var y = Math.sin(radian);
            var point = new Laya.Point(x, y);
            point.normalize();
            return point;
        }
        static getDirDirAngle(dir1, dir2) {
            var dotValue = (dir1.x * dir2.x) + (dir1.y * dir2.y);
            var cos = dotValue / (dir1.distance(0, 0) * dir2.distance(0, 0));
            var radian = Math.acos(cos);
            var angle = radian / (2 * Math.PI) * 360;
            return angle;
        }
        static getDirScalarLength(dir) {
            var sl = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
            return sl;
        }
        static setSpOnParentCenter(sp) {
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
        static getPointToLineDistance(x, y, LineStart, LineEnd) {
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
        static isIphoneX() {
            if (!Laya.Browser.onIPhone)
                return false;
            if ((Laya.Browser.width == 2436 && Laya.Browser.height == 1125)
                || (Laya.Browser.height == 2436 && Laya.Browser.width == 1125)) {
                return true;
            }
            return false;
        }
        static isIphone() {
            return Laya.Browser.onIPhone;
        }
        static getChild(node, name) {
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
        }
    }
    Utilit.OriginStageWidth = 1334;
    Utilit.OriginStageHeight = 750;
    Utilit.grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0, 0, 0, 1, 0];
    Utilit.grayscaleFilter = new Laya.ColorFilter(Utilit.grayscaleMat);
    Utilit.poinDown = new Laya.Point(0, -1);
    Utilit.poinUp = new Laya.Point(0, 1);

    var ALDEventDef;
    (function (ALDEventDef) {
        ALDEventDef["None"] = "";
        ALDEventDef["ReportAdClickSuccess"] = "\u5E7F\u544A\u5BFC\u51FA\u6210\u529F";
        ALDEventDef["ReportAdClickFail"] = "\u5E7F\u544A\u5BFC\u51FA\u5931\u8D25";
    })(ALDEventDef || (ALDEventDef = {}));
    class ALD {
        static aldSendOpenId(openid) {
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window["wx"].aldSendOpenid(openid);
                console.log("ALD 上报 openid : ", openid);
            }
            else if (Laya.Browser.onQQMiniGame) {
                Laya.Browser.window["qq"].aldSendOpenid(openid);
                console.log("ALD 上报 openid : ", openid);
            }
        }
        static aldSendEvent(event, data) {
            var eventName = event;
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window["wx"].aldSendEvent(eventName, data);
            }
            else if (Laya.Browser.onQQMiniGame) {
                Laya.Browser.window["qq"].aldSendEvent(eventName, data);
            }
        }
        static aldSendReportAdClickSuccess(data) {
            var type = ALDEventDef.ReportAdClickSuccess + " " + data.title + ":" + String(data.appid);
            var ald = ALD;
            ald.aldSendEvent(type, {
                "导出成功": data.title + ":" + String(data.appid)
            });
        }
        static aldSendReportAdClickFail(data) {
            var type = ALDEventDef.ReportAdClickFail + " " + data.title + ":" + String(data.appid);
            var ald = ALD;
            ald.aldSendEvent(type, {
                "导出失败": data.title + ":" + String(data.appid)
            });
        }
    }

    class Share_sdlyg_Ad {
        static refreshAd(complate) {
            Share_sdlyg_Ad.getAdPosData((res) => {
                if (1 == res.code) {
                    console.log("获取分享广告数据成功");
                    Share_sdlyg_Ad._adPosition = res.result;
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
            }, (res) => {
                console.log("获取分享广告数据失败");
                if (complate) {
                    complate(false);
                }
            });
        }
        static getADVs(locationid, complate, useRandom, useLocalRandom) {
            if (!Share_sdlyg_Ad.isNeedShowAd()) {
                complate(null);
                return;
            }
            useRandom = null == useRandom ? Share_sdlyg_Ad.UseRandomAdPos : useRandom;
            useLocalRandom = null == useLocalRandom ? true : useRandom;
            if (useRandom) {
                locationid = Share_sdlyg_Ad.getRandomADPosID();
            }
            var datas = Share_sdlyg_Ad._adv[locationid];
            if (datas) {
                for (var i = datas.length - 1; i >= 0; --i) {
                    var randomIndex = Math.floor(Math.random() * datas.length);
                    var curValue = datas[i];
                    var randomValue = datas[randomIndex];
                    datas[randomIndex] = curValue;
                    datas[i] = randomValue;
                }
                complate(datas);
            }
            else {
                var self = this;
                Share_sdlyg_Ad.getADVData(locationid, (res) => {
                    if (1 == res.code) {
                        Share_sdlyg_Ad._adv[locationid] = res.result;
                        datas = Share_sdlyg_Ad._adv[locationid];
                        if (datas && Utilit.isIphone()) {
                            for (var i = 0; i < datas.length; ++i) {
                                var data = datas[i];
                                for (var j = 0; j < Share_sdlyg_Ad._iphoneIgnoreAppIds.length; ++j) {
                                    if (data.appid == Share_sdlyg_Ad._iphoneIgnoreAppIds[j]) {
                                        datas.splice(i, 1);
                                        --i;
                                        break;
                                    }
                                }
                            }
                        }
                        if (datas && useLocalRandom) {
                            datas = self.sortDatas(datas);
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
                }, (res) => {
                    if (complate) {
                        complate(null);
                    }
                });
            }
        }
        static reportUserClick(advid) {
            Share_sdlyg_Ad.reqUserClick(advid, (res) => {
                if (1 == res.code) {
                    console.log("点击广告上报成功");
                }
                else {
                    console.log("点击广告上报失败");
                }
            }, (res) => {
                console.log("点击广告上报失败");
            });
        }
        static getRandomADPosID() {
            return Share_sdlyg_Ad.AdLocationids[Math.floor(Math.random() * Share_sdlyg_Ad.AdLocationids.length)];
        }
        static request(req) {
            if (req.url.indexOf("https://") > -1 ||
                req.url.indexOf("http://") > -1) {
                req.url = req.url;
            }
            else {
                req.url = Share_sdlyg_Ad.mainUrl + req.url;
            }
            var completeFunc = (res) => {
                console.log(res, "http Success");
                res = JSON.parse(res);
                if (req.onSuccess) {
                    req.onSuccess(res);
                }
                req.onSuccess = null;
                req = null;
            };
            var errorFunc = (res) => {
                console.log(res, "http fail");
                if (req.onFail) {
                    req.onFail(res);
                }
                req.onFail = null;
                req = null;
            };
            var xhr = new Laya.HttpRequest();
            xhr.once(Laya.Event.COMPLETE, Share_sdlyg_Ad, completeFunc);
            xhr.once(Laya.Event.ERROR, Share_sdlyg_Ad, errorFunc);
            if (req.meth == "get") {
                var para = "";
                for (const key of Object.keys(req.data)) {
                    var value = req.data[key];
                    para += key + "=" + value + "&";
                }
                req.url = req.url + "?" + para;
                var header = [
                    "versions", App_sdlyg_Config.Versions,
                ];
                xhr.send(req.url, null, req.meth, null, header);
            }
            else {
                var para = "";
                for (const key of Object.keys(req.data)) {
                    var value = req.data[key];
                    para += key + "=" + value + "&";
                }
                var header = [
                    "Content-Type", "application/x-www-form-urlencoded",
                    "versions", App_sdlyg_Config.Versions,
                ];
                xhr.send(req.url, para, req.meth, null, header);
            }
        }
        static getAdPosData(onSuccess, onFail) {
            var req = new requestData();
            req.url = Share_sdlyg_Ad.getAdPostion;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            req.data.softid = App_sdlyg_Config.AppID;
            req.meth = "get";
            Share_sdlyg_Ad.request(req);
        }
        static reqUserClick(advid, onSuccess, onFail) {
            var req = new requestData();
            req.url = Share_sdlyg_Ad.userClick;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            req.data.softid = App_sdlyg_Config.AppID;
            req.data.uid = Us_sdlyg_er.openId;
            req.data.advid = advid;
            Share_sdlyg_Ad.request(req);
        }
        static getADVData(locationid, onSuccess, onFail) {
            var req = new requestData();
            req.url = Share_sdlyg_Ad.getAdv;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            req.data.softid = App_sdlyg_Config.AppID;
            req.data.locationid = locationid;
            req.data.preview = 0;
            Share_sdlyg_Ad.request(req);
        }
        static RandomJump(rate = 1) {
            console.log("随机跳转,rate：" + rate);
            if (rate > 1) {
                rate = rate / 100;
            }
            let rd = Math.random();
            if (rd <= rate) {
                var adLocationID = Share_sdlyg_Ad.LoopAdLocationID;
                var Locations = [
                    Share_sdlyg_Ad.LoopAdLocationID,
                    Share_sdlyg_Ad.InsertAdLocationID,
                    Share_sdlyg_Ad.BannerAdLocationID,
                    Share_sdlyg_Ad.AniAdLocationID,
                ];
                if (Share_sdlyg_Ad.UseRandomAdPos) {
                    for (var i = 0; i < Share_sdlyg_Ad.AdLocationids.length; ++i) {
                        Locations.push(Share_sdlyg_Ad.AdLocationids[i]);
                    }
                }
                adLocationID = Locations[Math.floor(Math.random() * Locations.length)];
                var datas = Share_sdlyg_Ad.getADVs(adLocationID, function (datas) {
                    if (datas) {
                        let rd = Math.floor(datas.length * Math.random());
                        let data = datas[rd];
                        console.log("跳转游戏： " + data.title);
                        WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                            console.log("跳转成功");
                            Share_sdlyg_Ad.reportUserClick(data.appid);
                            ALD.aldSendReportAdClickSuccess(data);
                        }, (res) => {
                            console.log("跳转失败");
                            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                            if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                                console.log("用户取消跳转");
                                ALD.aldSendReportAdClickFail(data);
                            }
                        }, (res) => {
                            console.log("跳转完成");
                        });
                    }
                }, true);
            }
        }
        static isNeedShowAd() {
            if (0 == AppSwitchConfig.getInstance().getAppSwitchData().adSwitch)
                return false;
            var mailiang = AppSwitchConfig.getInstance().getAppSwitchData().mailiang;
            var mailianglist = AppSwitchConfig.getInstance().getAppSwitchData().mailianglist;
            var mailiangscenelist = AppSwitchConfig.getInstance().getAppSwitchData().mailiangSceneList;
            if (1 == mailiang) {
                if (Laya.Browser.onMiniGame) {
                    var flag = WXAPI.getLaunchOptionsSync().query['chid'];
                    if (null != flag && null != mailianglist && mailianglist.length > 0) {
                        for (var i = 0; i < mailianglist.length; ++i) {
                            if (flag == mailianglist[i]) {
                                return false;
                            }
                        }
                    }
                    var scene = WXAPI.getLaunchOptionsSync().scene;
                    if (null != scene && null != mailiangscenelist && mailiangscenelist.length > 0) {
                        for (var i = 0; i < mailiangscenelist.length; ++i) {
                            if (scene == mailiangscenelist[i]) {
                                return false;
                            }
                        }
                    }
                }
                else if (Laya.Browser.onQGMiniGame) {
                    return false;
                }
                else if (Laya.Browser.onQQBrowser) {
                    return false;
                }
            }
            return true;
        }
        static sortDatas(datas) {
            if (null == datas || 0 == datas.length)
                return [];
            var dataDic = {};
            var dataArray = new Array();
            for (var i = 0; i < datas.length; ++i) {
                var data = datas[i];
                if (dataDic[data.appid] == null) {
                    dataDic[data.appid] = new Array();
                    dataDic[data.appid].push(data);
                    dataArray.push(dataDic[data.appid]);
                }
                else {
                    dataDic[data.appid].push(data);
                }
            }
            for (let i = 0; i < dataArray.length; i++) {
                for (let j = i + 1; j < dataArray.length; j++) {
                    if (dataArray[i].length < dataArray[j].length) {
                        let d = dataArray[j];
                        dataArray[j] = dataArray[i];
                        dataArray[i] = d;
                    }
                }
            }
            var groupArray = new Array();
            for (let i = 0; i < dataArray[0].length; i++) {
                groupArray[i] = new Array();
                for (let j = 0; j < dataArray.length; j++) {
                    if (dataArray[j].length > i) {
                        groupArray[i].push(dataArray[j][i]);
                    }
                }
            }
            var res = new Array();
            for (let i = 0; i < groupArray.length; i++) {
                for (let j = 0; j < groupArray[i].length; j++) {
                    res.push(groupArray[i][j]);
                }
            }
            return res;
        }
    }
    Share_sdlyg_Ad.mainUrl = "https://swwww.mrkzx.cn";
    Share_sdlyg_Ad.getAdPostion = "/v1.1/api/getAdPosition.html";
    Share_sdlyg_Ad.getAdv = "/v1.1/api/getAdv.html";
    Share_sdlyg_Ad.userClick = "/v1.1/api/userclick.html";
    Share_sdlyg_Ad.LoopAdLocationID = 204;
    Share_sdlyg_Ad.BannerAdLocationID = 206;
    Share_sdlyg_Ad.InsertAdLocationID = 205;
    Share_sdlyg_Ad.AniAdLocationID = 207;
    Share_sdlyg_Ad.UseRandomAdPos = true;
    Share_sdlyg_Ad.AdLocationids = [
        204, 205
    ];
    Share_sdlyg_Ad._adPosition = {};
    Share_sdlyg_Ad._adv = {};
    Share_sdlyg_Ad._iphoneIgnoreAppIds = [
        "wx2d2acce3c45f4ddf",
        "wxeb93c1298ec7c62b",
        "wx9540f9021d5f809d",
        "wxe372a630ec9ebe44",
        "wx887a573910b69793",
        "wxd21a086ce755a4b7",
        "wx8e142a9ae9318118",
    ];

    class QQMiniGameAPI {
        static Login(onSuccess, onFail) {
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
        static onRewardedVideoAdLoad() {
            console.log('激励视频 广告加载完成');
        }
        static onRewardedVideoAdError(err) {
            console.log('激励视频 广告加载失败' + err);
            if (QQMiniGameAPI._onRewardedVideoAdFailed) {
                QQMiniGameAPI._onRewardedVideoAdFailed();
            }
        }
        static onRewardedVideoAdClose(res) {
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
        }
        static regRewardedVideoAdEvent(rewardedVideoAd) {
            rewardedVideoAd.onLoad(QQMiniGameAPI.onRewardedVideoAdLoad);
            rewardedVideoAd.onError(QQMiniGameAPI.onRewardedVideoAdError);
            rewardedVideoAd.onClose(QQMiniGameAPI.onRewardedVideoAdClose);
            QQMiniGameAPI._isRegRewardedVideoAdEvent = true;
        }
        static showRewardedVideoAd(onAdClose, onFailed) {
            if (Laya.Browser.onQQMiniGame) {
                QQMiniGameAPI._onRewardedVideoAdClose = onAdClose;
                QQMiniGameAPI._onRewardedVideoAdFailed = onFailed;
                var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd({
                    adUnitId: QQMiniGameAPI.adUnitId,
                });
                if (!QQMiniGameAPI._isRegRewardedVideoAdEvent) {
                    QQMiniGameAPI.regRewardedVideoAdEvent(rewardedVideoAd);
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
        static navigateToMiniProgram(appId, path, onSuccess, onFail, onComplate) {
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
        static share(complate, titel, imageUrl) {
            if (Laya.Browser.onQQMiniGame) {
                QQMiniGameAPI._onShow = () => {
                    Laya.Browser.window["qq"].offShow(QQMiniGameAPI._onShow);
                    QQMiniGameAPI._onShow = null;
                    var c = Date.now() - this._lastShareTime;
                    if (complate) {
                        if (Date.now() - this._lastShareTime > 2000) {
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
        }
        static showInterstitialAd(onAdClose, onFailed) {
            if (Laya.Browser.onQQMiniGame) {
                var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                    adUnitId: QQMiniGameAPI.InsAdUnitId,
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
        static LoadAppBoxAd(onAdClose, onFailed) {
            if (Laya.Browser.onQQMiniGame) {
                this.mAppboxAd = Laya.Browser.window["qq"].createAppBox({
                    adUnitId: QQMiniGameAPI.AppBoxId,
                });
                this.mAppboxAd.load().then(() => {
                    console.log('盒子广告 加载完成');
                });
                this.mAppboxAd.onError((err) => {
                    console.log('盒子广告 加载失败' + err);
                    if (onFailed) {
                        onFailed();
                    }
                });
                this.mAppboxAd.onClose(() => {
                    console.log('盒子广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                });
            }
            else {
                onAdClose();
            }
        }
        static showAppBoxAd(onFailed) {
            if (this.mAppboxAd) {
                console.log("显示盒子广告");
                this.mAppboxAd.show().catch((err) => {
                    console.log('盒子广告 显示失败 ：' + err);
                    if (onFailed) {
                        onFailed();
                    }
                });
            }
            else {
                QQMiniGameAPI.LoadAppBoxAd((onAdClose) => {
                }, (onFailed) => {
                });
            }
        }
        static getLaunchOptionsSync() {
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
        static SetShareMenu(titel, imageUrl, success, fail, complate) {
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
    }
    QQMiniGameAPI.adUnitId = "";
    QQMiniGameAPI.bannerAdUnitId = "";
    QQMiniGameAPI.InsAdUnitId = "";
    QQMiniGameAPI.AppBoxId = "";
    QQMiniGameAPI._isRegRewardedVideoAdEvent = false;
    QQMiniGameAPI._onRewardedVideoAdFailed = null;
    QQMiniGameAPI._onRewardedVideoAdClose = null;
    QQMiniGameAPI._onShow = null;
    QQMiniGameAPI._lastShareTime = 0;
    QQMiniGameAPI.mAppboxAd = null;

    class LoopAdBox extends Laya.Script {
        constructor() {
            super(...arguments);
            this._data = null;
            this._originW = 150;
            this._originH = 150;
            this._fontSize = 25;
        }
        onAwake() {
            this._displaySp = this.owner.getChildByName("Display");
            this._originW = this._displaySp.width;
            this._originH = this._displaySp.height;
            this._disText = this.owner.getChildByName("TitelText");
            this._disText.text = "";
            this._fontSize = this._disText.fontSize;
        }
        onEnable() {
            this._displaySp.on(Laya.Event.CLICK, this, this.onSpClick);
        }
        onDisable() {
            this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
        }
        setData(data) {
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
        }
        onSpClick() {
            var data = this._data;
            if (data) {
                console.log("跳转游戏： " + data.title);
                if (Laya.Browser.onMiniGame) {
                    WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_sdlyg_Ad.reportUserClick(data.appid);
                        ALD.aldSendReportAdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            ALD.aldSendReportAdClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQGMiniGame) {
                    OPPOAPI.navigateToMiniProgram(data.appid, data.title, data.url, (res) => {
                        console.log("跳转成功");
                        Share_sdlyg_Ad.reportUserClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQQMiniGame) {
                    QQMiniGameAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_sdlyg_Ad.reportUserClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
            }
        }
    }

    class VerticalLoopAdView extends Laya.Script {
        constructor() {
            super(...arguments);
            this.AdPosID = Share_sdlyg_Ad.InsertAdLocationID;
            this._scrollForward = true;
        }
        onAwake() {
            this._list = this.owner.getChildByName("List");
            this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this._list.vScrollBarSkin = "";
        }
        onEnable() {
            var self = this;
            Share_sdlyg_Ad.getADVs(this.AdPosID, (datas) => {
                if (datas != null)
                    datas.sort(function () { return Math.random() - 0.5; });
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
                        this._list.array = temp;
                    }
                    else {
                        this._list.array = datas;
                    }
                }
            });
        }
        onDisable() {
        }
        onUpdate() {
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
        }
        onListRender(cell, index) {
            var data = this._list.array[index];
            var loopAdBox = cell.getComponent(LoopAdBox);
            loopAdBox.setData(data);
        }
        RefreshAD() {
            this._list.scrollBar.value += Math.random() * 100;
        }
    }

    class EnterGamePop extends ViewBase {
        constructor() { super(); }
        onAwake() {
            this.btn_close = this.owner.getChildByName("btn_close");
        }
        addEvent() {
            this.btn_close.on(Laya.Event.CLICK, this, this.clickClose);
        }
        clickClose() {
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.EnterGamePop);
        }
    }

    class GameHeadPic extends Laya.Script {
        constructor() { super(); }
        onAwake() {
            this.m_owner = this.owner;
            this.m_camera = CameraCtrl.Instance().GetCamera();
            this.m_pic = this.m_owner.getChildByName("pic");
        }
        onStart() {
            let mask = new Laya.Sprite();
            mask.graphics.drawCircle(this.m_pic.width / 2, this.m_pic.height / 2, 30, "#ff0000");
            mask.pos(0, 0);
            this.m_pic.mask = mask;
        }
        setPic(path) {
            this.m_pic.skin = path;
        }
        show(tarPos) {
            let outPos = new Laya.Vector4(0, 0, 0);
            this.m_camera.viewport.project(tarPos, this.m_camera.projectionViewMatrix, outPos);
            let x = outPos.x / Laya.stage.clientScaleX - 15 * (Laya.stage.width / 750);
            let y = outPos.y / Laya.stage.clientScaleY - 350 * (Laya.stage.height / 1334);
            this.m_owner.pos(x, y);
            this.m_owner.visible = true;
        }
        hide() {
            this.m_owner.visible = false;
        }
    }

    class GameView extends ViewBase {
        constructor() {
            super();
            this.ball_amount = 0;
            this.owner_key = 0;
            this.show_key_dis = 150;
            this.key_list = new Array();
            this.power_timer = 0;
            this.max_power_timer = 400;
            this.m_current_stage_id = 0;
            this.is_award = false;
            this.bar_change = 0.02;
            this.is_beat = false;
            this.is_rank = false;
            this.head_pic_show_timer = 1000;
            this.could_show_right_bar = false;
        }
        onAwake() {
            this.ball_num = this.owner.getChildByName("ballNum");
            this.txt_ball_num = this.ball_num.getChildByName("num");
            this.guide = this.owner.getChildByName("guide");
            this.award_Level_Ball = this.owner.getChildByName("award_Level_Ball");
            this.show_key = this.owner.getChildByName("addkey");
            this.power = this.owner.getChildByName("power");
            this.power_bar = this.power.getChildByName("bar");
            this.power_right_bar = this.power.getChildByName("right_bar");
            this.btn_close = this.owner.getChildByName("btn_close");
            this.btn_getRightBar = this.owner.getChildByName("btn_getRightBar");
            this.clickArea = this.owner.getChildByName("clickArea");
            this.bottomLoopAD = this.owner.getChildByName("LoopAD");
            this.key = this.owner.getChildByName("key");
            for (let i = 0; i < 9; i++) {
                let k = this.key.getChildByName("key" + i).getChildByName("key");
                this.key_list.push(k);
                k.alpha = 0;
            }
            this.rank = this.owner.getChildByName("rank");
            this.play_head_pic = this.owner.getChildByName("play_head_pic").getComponent(GameHeadPic);
            this.ai_head_pic = this.owner.getChildByName("ai_head_pic").getComponent(GameHeadPic);
            this.max_power_timer = ConstManager.max_power_timer;
            this.rank.visible = false;
            this.award_Level_Ball.visible = false;
            this.guide.visible = false;
            this.key.visible = false;
            this.show_key.alpha = 0;
            this.m_camera = CameraCtrl.Instance().GetCamera();
            if (GameManager.Instance().getFirst()) {
                this.guide.visible = true;
            }
            this.is_award = GameManager.Instance().getIsAwardGame();
            this.m_current_stage_id = PlayerManager.Instance().getCurrentStageID();
            this.m_level = this.owner.getChildByName("level");
            this.m_level.value = (Us_sdlyg_er.getLeveNum() + 1).toString();
            this.m_level.visible = !GameManager.Instance().getIsAwardGame();
            this.is_rank = GameManager.Instance().getIsRank();
        }
        onDestroy() {
            super.onDestroy();
            if (this.is_award) {
                if (this.owner_key == 8)
                    this.owner_key = 9;
                GameManager.Instance().setOnerKeyNum(this.owner_key);
            }
        }
        addEvent() {
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.SubBall, this, this.subBall);
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.HideGuide, this, this.hideGuide);
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.PlayerUpdatePos, this, this.playerUpdatePos);
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ChangeGamingPic, this, this.changeHeadPic);
            this.btn_close.on(Laya.Event.CLICK, this, this.clickClose);
            this.btn_getRightBar.on(Laya.Event.CLICK, this, this.clickGetRightBar);
            this.clickArea.on(Laya.Event.MOUSE_DOWN, this, this.downClickArea);
            this.clickArea.on(Laya.Event.MOUSE_UP, this, this.upClickArea);
        }
        removeEvent() {
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ChangeGamingPic, this, this.changeHeadPic);
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.SubBall, this, this.subBall);
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.HideGuide, this, this.hideGuide);
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.PlayerUpdatePos, this, this.playerUpdatePos);
            this.clickArea.off(Laya.Event.MOUSE_DOWN, this, this.downClickArea);
            this.clickArea.off(Laya.Event.MOUSE_UP, this, this.upClickArea);
        }
        onStart() {
            if (GameManager.Instance().getHighView()) {
                this.btn_close.top = 147;
            }
            this.ball_amount = GameManager.Instance().getGameBall();
            if (this.ball_amount >= 100)
                this.txt_ball_num.visible = false;
            this.txt_ball_num.text = this.ball_amount.toString();
            this.show_key_startY = this.show_key.y;
            this.hideHeadPic();
            if (this.is_award) {
                this.ball_num.visible = false;
                this.key.visible = true;
                this.showAwardBall();
            }
            if (this.is_rank) {
                this.ai_head_pic.setPic(this._data.aiPic);
                this.play_head_pic.setPic(this._data.playPic);
                this.ball_num.visible = false;
                this.m_level.visible = false;
                this.rank.visible = true;
                Laya.timer.once(this.head_pic_show_timer, this, () => {
                    this.changeHeadPic();
                });
            }
            this.btn_getRightBar.visible = false;
            this.setRightBar();
            this.upPowerBarPos();
            this.refreshPowerBar();
            if (Laya.Browser.onMiniGame) {
            }
            else if (Laya.Browser.onQGMiniGame) {
                this.onQGGame();
            }
        }
        onUpdate() {
            if (this.power.visible && this.is_beat) {
                this.power_timer += Laya.timer.delta;
                let ratio = Math.min(this.power_timer / this.max_power_timer, 1);
                this.power_bar.scaleX = ratio;
            }
            if (this.power_right_bar.visible) {
                if (this.power_right_bar.alpha <= 0) {
                    this.bar_change = 0.1;
                }
                else if (this.power_right_bar.alpha >= 0.9) {
                    this.bar_change -= 0.1;
                }
                this.power_right_bar.alpha += this.bar_change;
            }
        }
        downClickArea() {
            PlayerManager.Instance().storgePower();
        }
        upClickArea() {
            PlayerManager.Instance().desorbPower();
        }
        onEnable() {
            super.onEnable();
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.RewardVideoFail, this, this.onRewardVidewoFail);
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
        }
        onDisable() {
            super.onDisable();
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.RewardVideoFail, this, this.onRewardVidewoFail);
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
        }
        onRewardVidewoFail() {
        }
        onRewardVidewoSuccess(reward) {
            this.btn_getRightBar.visible = false;
            this.could_show_right_bar = true;
            this.setRightBar();
        }
        clickGetRightBar() {
            let success = Laya.Handler.create(this, () => {
                this.btn_getRightBar.visible = false;
                this.could_show_right_bar = true;
                this.setRightBar();
            });
            if (GameSwitchConfig.getInstance().openVideo != 1) {
                return;
            }
            if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                NativeCallback.CallNativeFunc("showRewardVideo");
            }
            else if (Laya.Browser.onMiniGame) {
                WXAPI.showRewardedVideoAd((res) => {
                    if (res) {
                        success.method();
                    }
                    else {
                        console.log("获得精准击打视频未完整观看");
                    }
                }, () => {
                    console.log("获得精准击打视频加载观看");
                });
            }
            else if (Laya.Browser.onQGMiniGame) {
                OPPOAPI.showRewardedVideoAd((res) => {
                    if (res) {
                        success.method();
                    }
                    else {
                        console.log("获得精准击打视频未完整观看");
                    }
                }, () => {
                    console.log("获得精准击打视频加载观看");
                });
            }
        }
        clickClose() {
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MoreGameView, true);
        }
        subBall() {
            this.ball_amount--;
            this.txt_ball_num.text = this.ball_amount.toString();
            if (this.award_Level_Ball.visible) {
                let b = this.award_Level_Ball.getChildByName("ball" + this.ball_amount);
                Laya.Tween.to(b, { alpha: 0 }, 300);
            }
        }
        showAwardBall() {
            for (let i = 0; i < 3; i++) {
                let b = this.award_Level_Ball.getChildByName("ball" + i);
                b.alpha = 1;
            }
            this.award_Level_Ball.visible = true;
        }
        playerUpdatePos() {
            this.m_current_stage_id++;
            if (this.is_award) {
                Laya.Tween.to(this.key_list[this.owner_key], { alpha: 1 }, 600);
                this.owner_key++;
                GameManager.Instance().setOnerKeyNum(this.owner_key);
                this.ball_amount = GameManager.Instance().getGameBall();
                this.showAwardBall();
            }
            if (this.is_rank) {
                this.hideHeadPic();
                Laya.timer.once(this.head_pic_show_timer, this, () => {
                    this.changeHeadPic();
                });
            }
            this.upPowerBarPos();
            this.setRightBar();
        }
        hideGuide() {
            if (this.guide.visible)
                this.guide.visible = false;
        }
        setRightBar() {
            if ((Us_sdlyg_er.getLeveNum() >= 11 && this.m_current_stage_id >= 1 || this.is_rank) && !this.could_show_right_bar) {
                this.power_right_bar.visible = false;
                if (!this.is_rank)
                    this.btn_getRightBar.visible = true;
            }
            else {
                this.power_right_bar.visible = true;
                let rat = Math.sqrt(6.3 * StageManager.Instance().getRightDis(this.m_current_stage_id)) / ConstManager.max_power_dis;
                this.power_right_bar.width = this.power_bar.width * rat;
            }
        }
        keyShow() {
            this.show_key.pos(this.show_key.x, this.show_key_startY);
            this.show_key.alpha = 1;
            Laya.Tween.to(this.show_key, { y: this.show_key_startY - this.show_key_dis, alpha: 0 }, 800);
        }
        changeHeadPic() {
            this.play_head_pic.show(PlayerManager.Instance().getPlayerPos());
            if (PlayerManager.Instance().getCurrentStageID() == AImanager.Instance().getCurrentStageID()) {
                this.ai_head_pic.show(AImanager.Instance().getAIPos());
            }
            else {
                this.ai_head_pic.hide();
            }
        }
        hideHeadPic() {
            this.play_head_pic.hide();
            this.ai_head_pic.hide();
        }
        refreshPowerBar() {
            this.is_beat = false;
            this.power_timer = 0;
            this.power_bar.scaleX = 0;
        }
        upPowerBarPos() {
            return;
            let outPos = new Laya.Vector4(0, 0, 0);
            let beatPos = StageManager.Instance().GetStageById(this.m_current_stage_id).GetBeatPos();
            this.m_camera.viewport.project(beatPos, this.m_camera.projectionViewMatrix, outPos);
            this.power.pos(outPos.x / Laya.stage.clientScaleX - 180, outPos.y / Laya.stage.clientScaleY + 60);
        }
        onKeyDown(e) {
            if (e.keyCode == 97) {
                this.changeHeadPic();
            }
            else if (e.keyCode = 99) {
                this.hideHeadPic();
            }
        }
        onStageMouseDown() {
            this.is_beat = true;
        }
        onStageMouseUp() {
            this.refreshPowerBar();
        }
        onMiniGame() {
        }
        onQGGame() {
            this.bottomLoopAD.visible = false;
            OPPOAPI.showBannaer();
        }
    }

    class RecordVedioIcon extends Laya.Script {
        constructor() { super(); }
        onAwake() {
            this.mIcon = this.owner;
        }
        onStart() {
            if (WudianMgr.WudianFlag) {
                this.mIcon.alpha = 0;
            }
        }
    }

    class GuangQuan extends Laya.Script {
        constructor() { super(); }
        onAwake() {
            this.m_owner = this.owner;
        }
        onUpdate() {
            if (this.m_owner.visible) {
                this.m_owner.rotation += 0.5;
            }
        }
    }

    class TreasureBox extends Laya.Script {
        constructor() {
            super();
            this.could_click = true;
        }
        onAwake() {
            this.m_owner = this.owner;
            this.m_treasure = this.m_owner.getChildByName("treasure");
            this.m_award = this.m_owner.getChildByName("award");
            this.m_coin = this.m_award.getChildByName("coin");
            this.m_num = this.m_coin.getChildByName("num");
            this.m_prop = this.m_award.getChildByName("prop");
            this.m_rewardIcon = this.m_owner.getChildByName("m_rewardIcon");
            this.m_award.visible = false;
            this.m_coin.visible = false;
            this.m_num.visible = false;
            this.m_prop.visible = false;
            this.m_rewardIcon.visible = false;
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ShowrRewardIcon, this, this.showrRewardIcon);
        }
        onDestroy() {
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ShowrRewardIcon, this, this.showrRewardIcon);
        }
        onUpdate() {
            if (this.m_treasure.visible && !this.treasure_tween && Math.random() < 0.0025)
                this.treasureShow();
        }
        Init(coin, url, complete) {
            if (url) {
                this.m_prop.loadImage(url, Laya.Handler.create(this, () => {
                    complete.method();
                    this.m_prop.visible = true;
                }));
            }
            else {
                this.m_coin.visible = true;
                this.m_num.text = coin.toString();
                this.m_num.visible = true;
            }
        }
        treasureShow() {
            let self = this;
            this.treasure_tween = Laya.Tween.to(self.m_treasure, { rotation: 15 }, 150, Laya.Ease.quadOut, Laya.Handler.create(self, () => {
                Laya.Tween.to(self.m_treasure, { rotation: -15 }, 300, Laya.Ease.quadOut, Laya.Handler.create(self, () => {
                    Laya.Tween.to(self.m_treasure, { rotation: 0 }, 150, Laya.Ease.quadOut, Laya.Handler.create(self, () => {
                        this.treasure_tween = null;
                    }));
                }));
            }));
        }
        ClickBox() {
            this.m_view.clickAward(this);
        }
        setView(view) {
            this.m_view = view;
        }
        showBox() {
            if (this.treasure_tween)
                this.treasure_tween.clear();
            this.m_treasure.visible = false;
            this.m_award.visible = true;
            if (this.could_click)
                this.could_click = false;
            this.m_rewardIcon.visible = false;
        }
        onMouseDown() {
            if (this.could_click)
                this.ClickBox();
            this.m_owner.scale(0.92, 0.92);
        }
        onMouseUp() {
            this.m_owner.scale(1, 1);
        }
        showrRewardIcon() {
            if (!this.m_award.visible)
                this.m_rewardIcon.visible = true;
        }
    }

    class LotteryView extends ViewBase {
        constructor() {
            super();
            this._array = [5, 5, 10, 10, 10, 50, 50, 100, 5, 10];
            this.treasure_time = 1;
            this.click_time = 0;
            this.owner_key_num = 0;
            this.openRewardType = 0;
            this.current_award_coin = 0;
        }
        onAwake() {
            this.openRewardType = 0;
            this.list_award = this.owner.getChildByName("list_award");
            this.btn_back = this.owner.getChildByName("btn_back");
            this.btn_getkey = this.owner.getChildByName("btn_getkey");
            this.btn_rank = this.owner.getChildByName("btn_rank");
            this.btn_start = this.owner.getChildByName("btn_start");
            this.btn_lookSkin = this.owner.getChildByName("btn_lookSkin");
            this.key = this.owner.getChildByName("key");
            this.key_num = this.key.getChildByName("key_num");
            this.best_award = this.owner.getChildByName("best_award").getChildByName("best_prop");
            this.best_coin = this.owner.getChildByName("best_award").getChildByName("coin");
            this.best_coin.visible = false;
            this.m_bg = this.owner.getChildByName("bg");
            this.m_bg.height = Laya.stage.height;
            this.m_bg.width = Laya.stage.height;
            this.list_award.array = this._array;
            this.list_award.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this._array.sort(() => { return 0.5 - Math.random(); });
            if (Us_sdlyg_er.getLeveNum() > 1) {
                this.treasure_time += (2 + Math.floor(Math.random() * 7));
            }
            if (Us_sdlyg_er.ownerPropAll()) {
                this.treasure_time = 10;
                this.best_coin.visible = true;
            }
            else {
                this.setBest();
            }
            console.log(GameManager.Instance().getOnerKeyNum());
            this.updateKeyNum(GameManager.Instance().getOnerKeyNum());
        }
        onDestroy() {
            super.onDestroy();
            if (this.btn_autho)
                this.btn_autho.destroy();
        }
        onStart() {
            this.btn_lookSkin.visible = false;
            this.key.pos(this.btn_getkey.x, this.btn_getkey.y - 60);
            this.btn_getkey.visible = false;
            if (Us_sdlyg_er.getMoney() >= Us_sdlyg_er.getNeedCoin())
                this.lookSkinBtnShow();
            this.btn_rank.visible = (Us_sdlyg_er.getMoney() >= 100);
            if (Laya.Browser.onMiniGame) {
                let self = this;
                Laya.Browser.window["wx"].getUserInfo({
                    success: function (res) {
                        var userInfo = res.userInfo;
                        var nickName = userInfo.nickName;
                        var avatarUrl = userInfo.avatarUrl;
                        console.log("用户授权了", userInfo);
                        GameManager.Instance().saveUserAvatarUrl(avatarUrl);
                    },
                    fail: function (res) {
                        console.log("用户没有授权");
                        self.noAuthor();
                    }
                });
            }
            this.btn_start.visible = (this._data == OverViewType.ClickGetPrize);
        }
        addEvent() {
            this.btn_back.on(Laya.Event.CLICK, this, this.clickBack);
            this.btn_getkey.on(Laya.Event.CLICK, this, this.clickGetCoin);
            this.btn_lookSkin.on(Laya.Event.CLICK, this, this.clickLookSkin);
            this.btn_rank.on(Laya.Event.CLICK, this, this.clickRank);
            this.btn_start.on(Laya.Event.CLICK, this, this.clickStart);
        }
        updateKeyNum(num = 0) {
            this.owner_key_num += num;
            this.key_num.text = this.owner_key_num.toString();
            if (this.owner_key_num <= 0) {
                this.key.visible = false;
                Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.ShowrRewardIcon);
            }
        }
        setBest() {
            do {
                let id = Math.floor(Math.random() * PropManager.getInstance().getPropTypeNum());
                let amount = PropManager.getInstance().getPropBase(id).amount;
                this.best_award_type = PropManager.getInstance().getPropBase(id).type;
                this.best_award_id = Math.floor(Math.random() * amount);
                this.best_award_url = "subRes/propsLogo/" + this.best_award_type + this.best_award_id + ".png";
            } while (Us_sdlyg_er.ownerProp(this.best_award_type + this.best_award_id));
            this.best_award.skin = this.best_award_url;
        }
        lookSkinBtnShow() {
            this.btn_lookSkin.pos(Laya.stage.width, this.btn_lookSkin.y);
            this.btn_lookSkin.visible = true;
            Laya.Tween.to(this.btn_lookSkin, { x: Laya.stage.width - this.btn_lookSkin.width }, 300);
        }
        onEnable() {
            super.onEnable();
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.RewardVideoFail, this, this.onRewardVidewoFail);
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
        }
        onDisable() {
            super.onDisable();
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.RewardVideoFail, this, this.onRewardVidewoFail);
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
            this.openRewardType = 0;
        }
        onRewardVidewoFail() {
            if (this.openRewardType == 1) {
            }
            else if (this.openRewardType == 2) {
            }
            else if (this.openRewardType == 3) {
            }
            this.openRewardType = 0;
        }
        onRewardVidewoSuccess(reward) {
            if (this.openRewardType == 1) {
                this.click_time++;
                var box = this.param;
                let coin = this._array[this.click_time];
                if (this.click_time == this.treasure_time) {
                    console.log("中奖了");
                    box.Init(coin, this.best_award_url, Laya.Handler.create(this, () => {
                        this.lookSkinBtnShow();
                        Us_sdlyg_er.unlockProp(this.best_award_type + this.best_award_id);
                        Sound_sdlyg_Mgr.instance.playSound(SoundType.Unlock);
                    }));
                }
                else {
                    console.log("没有中奖");
                    if (this._data != OverViewType.ClickGetPrize)
                        this.btn_getkey.visible = true;
                    box.Init(coin);
                    Us_sdlyg_er.addMoney(coin);
                    Sound_sdlyg_Mgr.instance.playSound(SoundType.GetCoin);
                    this.current_award_coin += coin;
                }
                box.showBox();
            }
            else if (this.openRewardType == 2) {
                this.updateKeyNum(3);
            }
            else if (this.openRewardType == 3) {
                Us_sdlyg_er.addMoney(this.current_award_coin * 3);
                Sound_sdlyg_Mgr.instance.playSound(SoundType.GetCoin);
                this.btn_getkey.visible = false;
            }
            this.openRewardType = 0;
        }
        clickBack() {
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.OverDeriveView);
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.LotteryView);
        }
        clickAward(box) {
            let award = Laya.Handler.create(this, () => {
                let coin = this._array[this.click_time];
                if (this.click_time == this.treasure_time) {
                    console.log("中奖了");
                    box.Init(coin, this.best_award_url, Laya.Handler.create(this, () => {
                        this.lookSkinBtnShow();
                        Us_sdlyg_er.unlockProp(this.best_award_type + this.best_award_id);
                        Sound_sdlyg_Mgr.instance.playSound(SoundType.Unlock);
                    }));
                }
                else {
                    console.log("没有中奖");
                    if (this._data != OverViewType.ClickGetPrize)
                        this.btn_getkey.visible = true;
                    box.Init(coin);
                    Us_sdlyg_er.addMoney(coin);
                    Sound_sdlyg_Mgr.instance.playSound(SoundType.GetCoin);
                    this.current_award_coin += coin;
                }
                box.showBox();
            });
            if (this.owner_key_num <= 0) {
                console.log("钥匙不够,看视频");
                if (GameSwitchConfig.getInstance().openVideo != 1) {
                    return;
                }
                this.openRewardType = 1;
                this.param = box;
                if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                    NativeCallback.CallNativeFunc("showRewardVideo");
                }
                else {
                    WXAPI.showRewardedVideoAd((res) => {
                        if (res) {
                            this.click_time++;
                            award.method();
                        }
                        else {
                            console.log("点开宝箱视频未完整看完");
                        }
                    }, () => {
                        console.log("点开宝箱视频加载失败");
                    });
                }
            }
            else {
                this.updateKeyNum(-1);
                this.click_time++;
                if (this.click_time >= 9) {
                    this.key.visible = false;
                }
                award.method();
            }
        }
        clickRank() {
            Laya.Tween.clearAll(this.btn_lookSkin);
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.RankView);
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.LotteryView);
        }
        clickStart() {
            GameManager.Instance().refreshStage();
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.LotteryView);
            Sound_sdlyg_Mgr.instance.playSound(SoundType.Button);
        }
        clickGetKey() {
            if (GameSwitchConfig.getInstance().openVideo != 1) {
                return;
            }
            let self = this;
            this.openRewardType = 2;
            if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                NativeCallback.CallNativeFunc("showRewardVideo");
            }
            else {
                WXAPI.showRewardedVideoAd((complete) => {
                    if (complete) {
                        self.updateKeyNum(3);
                    }
                    else {
                        console.log("获取钥匙视频未完整观看");
                    }
                }, () => {
                    console.log("获取钥匙视频加载失败");
                });
            }
        }
        clickGetCoin() {
            if (GameSwitchConfig.getInstance().openVideo != 1) {
                return;
            }
            let self = this;
            this.openRewardType = 3;
            if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                NativeCallback.CallNativeFunc("showRewardVideo");
            }
            else {
                WXAPI.showRewardedVideoAd((complete) => {
                    if (complete) {
                        Us_sdlyg_er.addMoney(self.current_award_coin * 3);
                        Sound_sdlyg_Mgr.instance.playSound(SoundType.GetCoin);
                        this.btn_getkey.visible = false;
                    }
                    else {
                        console.log("金币翻倍视频未完整观看");
                    }
                }, () => {
                    console.log("金币翻倍视频加载失败");
                });
            }
        }
        clickLookSkin() {
            Laya.Tween.clearAll(this.btn_lookSkin);
            let data = {
                type: this.best_award_type,
                id: this.best_award_id
            };
            if (this.click_time >= this.treasure_time) {
                View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.BagView, data);
            }
            else {
                View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.BagView);
            }
            CameraCtrl.Instance().SetState(CameraState.Bag);
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.LotteryView);
        }
        onListRender(cell, index) {
            let treasureBox = cell.getComponent(TreasureBox);
            treasureBox.setView(this);
        }
        noAuthor() {
            var self = this;
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            var left = 0;
            var top = this.btn_rank.y / Laya.stage.height * sh;
            var width = this.btn_rank.width / Laya.stage.width * sw;
            var height = this.btn_rank.height / Laya.stage.width * sw;
            this.btn_autho = Laya.Browser.window["wx"].createUserInfoButton({
                type: 'image',
                image: "",
                style: {
                    left: left,
                    top: top,
                    width: width,
                    height: height,
                }
            });
            this.btn_autho.onTap((res) => {
                var userInfo = res.userInfo;
                var nickName = userInfo.nickName;
                var avatarUrl = userInfo.avatarUrl;
                console.log("用户授权了", userInfo);
                GameManager.Instance().saveUserAvatarUrl(avatarUrl);
                this.clickRank();
            });
        }
    }

    class ButtonShan extends Laya.Script {
        constructor() { super(); }
        onAwake() {
            this.m_owner = this.owner;
            this.m_shan = this.owner.getChildByName("shan");
            this.m_shan.pos(this.right_x, this.m_shan.y);
            let mask = new Laya.Sprite();
            mask.graphics.drawRect(this.m_owner.x, this.m_owner.y, this.m_owner.width, this.m_owner.height, "#ff0000");
            mask.pos(-this.m_owner.x, -this.m_owner.y);
            this.m_owner.mask = mask;
            this.shanShow();
        }
        shanShow() {
            Laya.Tween.to(this.m_shan, { x: this.left_x }, 400, null, Laya.Handler.create(this, () => {
                this.m_shan.pos(this.right_x, this.m_shan.y);
                Laya.timer.once(1000, this, () => {
                    this.shanShow();
                });
            }));
        }
    }

    class MyButton extends Laya.Script {
        constructor() {
            super();
            this.press = false;
            this.minScale = 0.85;
            this.breath = false;
            this.breathOff = 0.1;
            this.breathTime = 1;
            this.startScale = new Laya.Vector2(0, 0);
        }
        onAwake() {
            this.mButton = this.owner;
            this.mButton.pivot(this.mButton.width / 2, this.mButton.height / 2);
            this.startScale.x = this.mButton.scaleX;
            this.startScale.y = this.mButton.scaleY;
            this.breathTime = this.breathTime * 1000;
        }
        onStart() {
            if (this.mButton.visible && this.breath) {
                this.Breath();
            }
        }
        onDestroy() {
            Laya.Tween.clearAll(this.mButton);
        }
        Breath() {
            let minScale = new Laya.Vector2(this.startScale.x - this.breathOff, this.startScale.y - this.breathOff);
            let maxScale = new Laya.Vector2(this.startScale.x + this.breathOff, this.startScale.y + this.breathOff);
            Laya.Tween.to(this.mButton, { scaleX: minScale.x, scaleY: minScale.y }, this.breathTime, null, Laya.Handler.create(this, () => {
                Laya.Tween.to(this.mButton, { scaleX: maxScale.x, scaleY: maxScale.y }, this.breathTime, null, Laya.Handler.create(this, () => {
                    this.Breath();
                }));
            }));
        }
        onMouseDown() {
            if (this.press) {
                this.mButton.scale(this.minScale, this.minScale);
            }
        }
        onMouseUp() {
            if (this.press) {
                this.mButton.scale(1, 1);
            }
        }
        onMouseOut() {
            if (this.press) {
                this.mButton.scale(1, 1);
            }
        }
    }

    class HorizontalLoopAdView extends Laya.Script {
        constructor() {
            super(...arguments);
            this.AdPosID = Share_sdlyg_Ad.LoopAdLocationID;
            this._scrollForward = true;
        }
        onAwake() {
            this._list = this.owner.getChildByName("List");
            this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this._list.hScrollBarSkin = "";
        }
        onEnable() {
            var self = this;
            Share_sdlyg_Ad.getADVs(this.AdPosID, (datas) => {
                if (self.owner && !self.owner.destroyed) {
                    if (datas && datas.length > 0 && datas.length < 50) {
                        this._list.array = Share_sdlyg_Ad.sortDatas(datas);
                    }
                    else {
                        this._list.array = datas;
                    }
                }
            });
        }
        onDisable() {
        }
        onUpdate() {
            if (this._scrollForward) {
                this._list.scrollBar.value += 100 * Laya.timer.delta / 800;
                if (this._list.scrollBar.value >= this._list.scrollBar.max) {
                    this._scrollForward = false;
                }
            }
            else {
                this._list.scrollBar.value -= 100 * Laya.timer.delta / 800;
                if (this._list.scrollBar.value <= 0) {
                    this._scrollForward = true;
                }
            }
        }
        onListRender(cell, index) {
            var data = this._list.array[index];
            var loopAdBox = cell.getComponent(LoopAdBox);
            loopAdBox.setData(data);
        }
    }

    class VerticalLoopAdView$1 extends HorizontalLoopAdView {
        constructor() { super(); }
        onAwake() {
            this._list = this.owner.getChildByName("List");
            this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this._list.vScrollBarSkin = "";
        }
    }

    class MoreGameView2 extends ViewBase {
        constructor() { super(); }
        onAwake() {
            this.btn_close = this.owner.getChildByName("btn_close");
            this.btn_continue = this.owner.getChildByName("btn_continue");
            this.btn_continue.visible = false;
            Laya.timer.once(2000, this, () => {
                this.btn_continue.visible = true;
            });
            if (Laya.Browser.onQGMiniGame)
                this.clickContinue();
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.MoreGameView);
        }
        onDestroy() {
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.OutMoreGameView);
        }
        onStart() {
            super.onStart();
            if (GameManager.Instance().getHighView()) {
                this.btn_close.top = 147;
            }
            Share_sdlyg_Ad.RandomJump(AppSwitchConfig.getInstance().getAppSwitchData().morefunpop);
        }
        addEvent() {
            this.btn_continue.on(Laya.Event.CLICK, this, this.clickContinue);
            this.btn_close.on(Laya.Event.CLICK, this, this.clickClose);
        }
        clickContinue() {
            if (this._data) {
                if (this._data.onlyShow) {
                    View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MoreGame);
                }
                else {
                    if (this._data.win) {
                        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.OverView, OverViewType.WinGame);
                    }
                    else {
                        View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.OverView, OverViewType.LoseGame);
                    }
                    View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MoreGame);
                }
            }
            else {
                View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MenuView);
                View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MoreGame);
            }
        }
        clickClose() {
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MoreGame);
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MoreGameView);
        }
    }

    class MoreGameLoopAdBox extends LoopAdBox {
        constructor() { super(); }
        onAwake() {
            super.onAwake();
            this.star = this.owner.getChildByName("star");
            this.star.visible = Math.random() > 0.8;
            let mask = new Laya.Sprite();
            mask.graphics.drawCircle(8, 8, 60, "#ff0000");
            mask.pos(this._displaySp.width / 2, this._displaySp.height / 2);
            this._displaySp.mask = mask;
        }
        onEnable() {
            this.owner.on(Laya.Event.CLICK, this, this.onSpClick);
        }
        setData(data) {
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
                this._disText.fontSize = this._fontSize;
                this._disText.text = str;
                this._data = data;
            }
        }
        onDisable() {
            this.owner.off(Laya.Event.CLICK, this, this.onSpClick);
        }
    }

    class MoreGameLoopAdView extends HorizontalLoopAdView {
        constructor() { super(); }
        onAwake() {
            this._list = this.owner.getChildByName("List");
            this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this._list.vScrollBarSkin = "";
        }
        onUpdate() {
        }
        onListRender(cell, index) {
            var data = this._list.array[index];
            var loopAdBox = cell.getComponent(MoreGameLoopAdBox);
            loopAdBox.setData(data);
        }
    }

    class MoreGameView extends ViewBase {
        constructor() { super(); }
        onAwake() {
            this.btn_back = this.owner.getChildByName("btn_back");
        }
        addEvent() {
            this.btn_back.on(Laya.Event.CLICK, this, this.clickBack);
        }
        clickBack() {
            if (this._data) {
                View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MoreGameView);
            }
            else {
                View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MenuView);
                View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MoreGameView);
            }
        }
    }

    class NativeAdView extends ViewBase {
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
        }
        onEnable() {
            super.onEnable();
            this.loadAd();
        }
        addEvent() {
            super.addEvent();
            this._okBtn.on(Laya.Event.CLICK, this, this.onOkBtn);
            this._closeBtn.on(Laya.Event.CLICK, this, this.onCloseBtn);
            this._display.on(Laya.Event.CLICK, this, this.onDisplayClick);
        }
        removeEvent() {
            super.removeEvent();
            this._okBtn.off(Laya.Event.CLICK, this, this.onOkBtn);
            this._closeBtn.off(Laya.Event.CLICK, this, this.onCloseBtn);
            this._display.off(Laya.Event.CLICK, this, this.onDisplayClick);
        }
        loadAd() {
            var self = this;
            if (Laya.Browser.onQGMiniGame) {
                if (this._nativeAd) {
                    this._nativeAd.destroy();
                    this._nativeAd = null;
                }
                this._curAdItem = null;
                this._nativeAd = qg.createNativeAd({
                    posId: OPPOAPI.NativeAdId
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
                    self.closeView();
                });
                this._centerZone.visible = false;
            }
        }
        onCloseBtn() {
            this.closeView();
        }
        onOkBtn() {
            if (Math.random() * 100 <= AppSwitchConfig.getInstance().getAppSwitchData().yuansheng) {
                console.log("进入变态广告");
                this.onDisplayClick();
            }
            this.closeView();
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
            if (Laya.Browser.onQGMiniGame) {
                if (this._nativeAd) {
                    this._nativeAd.destroy();
                }
                this._nativeAd = null;
                this._curAdItem = null;
            }
        }
    }

    class OverDeriveView extends ViewBase {
        constructor() {
            super();
            this.share_url = "subRes/sdlyg_share.png";
            this.share_title = "来一杆！";
            this.moveDis = 250;
            this.wudianBannerShow = false;
        }
        onAwake() {
            this.btn_next = this.owner.getChildByName("btn_next");
            this.btn_home = this.owner.getChildByName("btn_home");
            this.btn_share = this.owner.getChildByName("btn_share");
            this.btn_share.visible = false;
            CameraCtrl.Instance().SetState(CameraState.OverDerive);
        }
        onStart() {
            if (WudianMgr.WudianFlag) {
                this.hideBanner();
                this.addWuDianEvent();
                this.btnMoveStart();
            }
            else {
                this.showBanner();
                this.addBtnEvent();
            }
        }
        addEvent() {
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.MoreGameView, this, this.hideBanner);
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.OutMoreGameView, this, this.backMoreGame);
        }
        removeEvent() {
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.MoreGameView, this, this.hideBanner);
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.OutMoreGameView, this, this.backMoreGame);
            this.removeBtnEvent();
        }
        addBtnEvent() {
            this.btn_next.on(Laya.Event.CLICK, this, this.clickNext);
            this.btn_home.on(Laya.Event.CLICK, this, this.clickHome);
            this.btn_share.on(Laya.Event.CLICK, this, this.clickShare);
        }
        removeBtnEvent() {
            this.btn_next.off(Laya.Event.CLICK, this, this.clickNext);
            this.btn_home.off(Laya.Event.CLICK, this, this.clickHome);
            this.btn_share.off(Laya.Event.CLICK, this, this.clickShare);
        }
        addWuDianEvent() {
            this.btn_next.on(Laya.Event.CLICK, this, this.clickShowWudianBanner);
            this.btn_home.on(Laya.Event.CLICK, this, this.clickShowWudianBanner);
            this.btn_share.on(Laya.Event.CLICK, this, this.clickShowWudianBanner);
        }
        removeWuDianEvent() {
            this.btn_next.off(Laya.Event.CLICK, this, this.clickShowWudianBanner);
            this.btn_home.off(Laya.Event.CLICK, this, this.clickShowWudianBanner);
            this.btn_share.off(Laya.Event.CLICK, this, this.clickShowWudianBanner);
        }
        btnMoveStart() {
            this.btn_home.bottom = this.btn_home.bottom - this.moveDis;
            this.btn_next.bottom = this.btn_next.bottom - this.moveDis;
            this.btn_share.bottom = this.btn_share.bottom - this.moveDis;
        }
        btnMoveEnd() {
            this.btn_home.bottom = this.btn_home.bottom + this.moveDis;
            this.btn_next.bottom = this.btn_next.bottom + this.moveDis;
            this.btn_share.bottom = this.btn_share.bottom + this.moveDis;
        }
        onClose() {
            super.onClose();
            this.removeBtnEvent();
            this.hideBanner();
        }
        clickNext() {
            if (GameManager.Instance().getIsRank()) {
                AImanager.Instance().hide();
                CameraCtrl.Instance().SetState(CameraState.Menu);
                View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.RankView);
                View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.OverDeriveView);
            }
            else {
                GameManager.Instance().normalStart();
                View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.OverDeriveView);
            }
        }
        clickHome() {
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MenuView);
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.OverDeriveView);
        }
        clickShare() {
            WXAPI.share(() => {
                console.log("分享了游戏");
            }, this.share_title, this.share_url);
        }
        clickShowWudianBanner() {
            this.removeWuDianEvent();
            Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer * 1000, this, () => {
                this.showBanner();
                this.wudianBannerShow = true;
            });
            Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer * 1000, this, () => {
                this.addBtnEvent();
                this.btnMoveEnd();
            });
        }
        backMoreGame() {
            if (this.wudianBannerShow)
                this.showBanner();
        }
        showBanner() {
            CachedWXBannerAd.show();
        }
        hideBanner() {
            CachedWXBannerAd.hide();
        }
    }

    class HeadPic extends Laya.Script {
        constructor() { super(); }
        onAwake() {
            this.m_pic = this.owner.getChildByName("pic");
            this.m_level = this.owner.getChildByName("board").getChildByName("level");
        }
        set(level, path) {
            let num = Math.floor(level / 5);
            switch (num) {
                case 0:
                    this.m_level.text = "Bronze";
                    break;
                case 1:
                    this.m_level.text = "Silver";
                    break;
                case 2:
                    this.m_level.text = "Gold";
                    break;
                case 3:
                    this.m_level.text = "Platinum";
                    break;
                case 4:
                    this.m_level.text = "Diamond";
                    break;
                case 5:
                    this.m_level.text = "King";
                    break;
            }
            if (path)
                this.m_pic.skin = path;
        }
    }

    class RankView extends ViewBase {
        constructor() {
            super();
            this.periodList = new Array();
            this.periodAmount = 6;
            this.current_period = 0;
        }
        onAwake() {
            this.bg = this.owner.getChildByName("BG");
            this.bg.height = Laya.stage.height;
            this.match = this.owner.getChildByName("match");
            this.btn_match = this.owner.getChildByName("btn_match");
            this.btn_home = this.owner.getChildByName("btn_home");
            this.vs = this.owner.getChildByName("vs");
            this.my_head_pic = this.owner.getChildByName("my_head_pic").getComponent(HeadPic);
            this.ai_head_pic = this.owner.getChildByName("ai_head_pic").getComponent(HeadPic);
        }
        onStart() {
            this.match.visible = false;
            let peroids = this.match.getChildByName("periods");
            for (let i = 0; i < this.periodAmount; i++) {
                let p = peroids.getChildByName("period" + i);
                p.visible = false;
                this.periodList.push(p);
            }
            let coin = this.btn_match.getChildByName("coin");
            let record = this.btn_match.getChildByName("record");
            if (Us_sdlyg_er.getMoney() >= 100) {
                coin.visible = true;
                record.visible = false;
            }
            else {
                coin.visible = false;
                record.visible = true;
            }
            this.my_head_pic.set(Us_sdlyg_er.getRankLevel(), GameManager.Instance().getUserAvatarUrl());
            CameraCtrl.Instance().SetState(CameraState.Menu);
        }
        addEvent() {
            this.btn_match.on(Laya.Event.CLICK, this, this.clickMatch);
            this.btn_home.on(Laya.Event.CLICK, this, this.clickHome);
        }
        clickHome() {
            Laya.timer.clearAll(this);
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MenuView);
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.RankView);
        }
        onEnable() {
            super.onEnable();
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.RewardVideoFail, this, this.onRewardVidewoFail);
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
        }
        onDisable() {
            super.onDisable();
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.RewardVideoFail, this, this.onRewardVidewoFail);
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
        }
        onRewardVidewoFail() {
        }
        onRewardVidewoSuccess() {
            this.vs.visible = false;
            this.btn_match.visible = false;
            this.showMatch();
            Laya.timer.once(Math.random() * 1000 + 1500, this, this.hideMatch);
        }
        clickMatch() {
            let match = Laya.Handler.create(this, () => {
                this.vs.visible = false;
                this.btn_match.visible = false;
                this.showMatch();
                Laya.timer.once(Math.random() * 1000 + 1500, this, this.hideMatch);
            });
            if (Us_sdlyg_er.getMoney() >= 100) {
                Us_sdlyg_er.addMoney(-100);
                match.method();
            }
            else {
                if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                    NativeCallback.CallNativeFunc("showRewardVideo");
                }
                else {
                    WXAPI.showRewardedVideoAd((success) => {
                        if (success) {
                            match.method();
                        }
                        else {
                            console.log("排位按钮视频未完整观看");
                        }
                    }, () => {
                        console.log("排位按钮视频加载失败");
                    });
                }
            }
        }
        showMatch() {
            this.match.visible = true;
            Laya.timer.loop(200, this, this.showPeriod);
        }
        hideMatch() {
            Laya.timer.clearAll(this);
            this.match.visible = false;
            this.vs.visible = true;
            let num = Math.max(0, (Us_sdlyg_er.getRankLevel() + -3 + (Math.floor(Math.random() * 6))));
            let path = "https://oss.renyouwangluo.cn/sdlyg/wxpic/" + Math.floor(Math.random() * 100) + ".jpg";
            this.ai_head_pic.set(num, path);
            Laya.timer.once(1500, this, () => {
                GameManager.Instance().rankStart(path);
                View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.RankView);
            });
        }
        showPeriod() {
            if (this.current_period >= this.periodAmount) {
                for (let i = 0; i < this.periodAmount; i++) {
                    this.periodList[i].visible = false;
                }
                this.current_period = 0;
            }
            this.periodList[this.current_period].visible = true;
            this.current_period++;
        }
    }

    class ReliveView extends ViewBase {
        constructor() {
            super();
            this.moveDis = 250;
            this.wudianBannerShow = false;
        }
        onAwake() {
            this.btn_getBall = this.owner.getChildByName("btn_getBall");
            this.btn_giveUp = this.owner.getChildByName("btn_giveUp");
        }
        onStart() {
            this.btn_giveUp.visible = false;
            this.btn_giveUp.visible = true;
            if (WudianMgr.WudianFlag) {
                this.hideBanner();
                this.addWuDianEvent();
                this.btnMoveStart();
            }
            else {
                this.showBanner();
                this.addBtnEvent();
            }
        }
        onClose() {
            super.onClose();
            this.hideBanner();
        }
        addEvent() {
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.MoreGameView, this, this.hideBanner);
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.OutMoreGameView, this, this.backMoreGame);
        }
        removeEvent() {
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.MoreGameView, this, this.hideBanner);
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.OutMoreGameView, this, this.backMoreGame);
            this.removeBtnEvent;
        }
        onEnable() {
            super.onEnable();
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.RewardVideoFail, this, this.onRewardVidewoFail);
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
        }
        onDisable() {
            super.onDisable();
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.RewardVideoFail, this, this.onRewardVidewoFail);
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
        }
        onRewardVidewoFail() {
        }
        onRewardVidewoSuccess() {
            GameManager.Instance().gameRelive();
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.ReliveView);
        }
        clickGetBall() {
            if (GameManager.is_first_add_ball) {
                GameManager.is_first_add_ball = false;
                GameManager.Instance().gameRelive();
                View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.ReliveView);
            }
            else {
                if (GameSwitchConfig.getInstance().openVideo != 1) {
                    return;
                }
                if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                    NativeCallback.CallNativeFunc("showRewardVideo");
                }
                else {
                    WXAPI.showRewardedVideoAd((complete) => {
                        if (complete) {
                            GameManager.Instance().gameRelive();
                            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.ReliveView);
                        }
                        else {
                            console.log("加球视频未完整观看");
                        }
                    }, () => {
                        console.log("加球视频加载失败");
                    });
                }
            }
        }
        clickGiveUp() {
            GameManager.Instance().gameOver(false);
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.ReliveView);
        }
        addBtnEvent() {
            this.btn_getBall.on(Laya.Event.CLICK, this, this.clickGetBall);
            this.btn_giveUp.on(Laya.Event.CLICK, this, this.clickGiveUp);
        }
        removeBtnEvent() {
            this.btn_getBall.off(Laya.Event.CLICK, this, this.clickGetBall);
            this.btn_giveUp.off(Laya.Event.CLICK, this, this.clickGiveUp);
        }
        addWuDianEvent() {
            this.btn_getBall.on(Laya.Event.CLICK, this, this.clickGetBall);
            this.btn_giveUp.on(Laya.Event.CLICK, this, this.clickGiveUp);
        }
        removeWuDianEvent() {
            this.btn_getBall.off(Laya.Event.CLICK, this, this.clickGetBall);
            this.btn_giveUp.off(Laya.Event.CLICK, this, this.clickGiveUp);
        }
        btnMoveStart() {
            this.btn_getBall.bottom = this.btn_getBall.bottom - this.moveDis;
            this.btn_giveUp.bottom = this.btn_giveUp.bottom - this.moveDis;
        }
        btnMoveEnd() {
            this.btn_getBall.bottom = this.btn_getBall.bottom + this.moveDis;
            this.btn_giveUp.bottom = this.btn_giveUp.bottom + this.moveDis;
        }
        clickShowWudianBanner() {
            this.removeWuDianEvent();
            Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer * 1000, this, () => {
                this.showBanner();
                this.wudianBannerShow = true;
            });
            Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer * 1000, this, () => {
                this.addBtnEvent();
                this.btnMoveEnd();
            });
        }
        backMoreGame() {
            if (this.wudianBannerShow)
                this.showBanner();
        }
        showBanner() {
            CachedWXBannerAd.show();
        }
        hideBanner() {
            CachedWXBannerAd.hide();
        }
    }

    class WudianSprite extends Laya.Script {
        constructor() {
            super();
            this.move_dis = 0;
        }
        onAwake() {
            this.m_owner = this.owner;
            this.m_owner.width = this.tar_button.width;
            this.m_owner.height = this.tar_button.height;
            this.m_owner.pos(this.tar_button.x, this.tar_button.y);
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ShowWudianBanner, this, this.wudianShow);
        }
        onDestroy() {
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ShowWudianBanner, this, this.wudianShow);
        }
        onStart() {
            this.m_owner.visible = this.tar_button.visible;
            if (WudianMgr.WudianFlag && this.m_owner.visible) {
                this.inWudianStart();
                this.m_owner.on(Laya.Event.CLICK, this, () => {
                    Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.ShowWudianBanner);
                });
                this.m_owner.mouseThrough = false;
            }
        }
        inWudianStart() {
            let x = this.m_owner.x;
            let y = this.m_owner.y + this.move_dis;
            this.m_owner.pos(x, y);
            this.tar_button.pos(x, y);
        }
        wudianShow() {
            Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().bannerMoveTimer * 1000, this, () => {
                CachedWXBannerAd.show();
            });
            Laya.timer.once(AppSwitchConfig.getInstance().getAppSwitchData().btnMoveTimer * 1000, this, () => {
                let x = this.tar_button.x;
                let y = this.tar_button.y - this.move_dis;
                this.tar_button.pos(x, y);
                this.m_owner.destroy();
            });
        }
    }

    class VerticalSideADLoopView extends HorizontalLoopAdView {
        constructor() { super(); }
        onAwake() {
            this._list = this.owner.getChildByName("List");
            this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this._list.vScrollBarSkin = "";
        }
        onUpdate() {
            if (this._scrollForward) {
                this._list.scrollBar.value += 100 * Laya.timer.delta / 1500;
                if (this._list.scrollBar.value >= this._list.scrollBar.max) {
                    this._scrollForward = false;
                }
            }
            else {
                this._list.scrollBar.value -= 100 * Laya.timer.delta / 1500;
                if (this._list.scrollBar.value <= 0) {
                    this._scrollForward = true;
                }
            }
        }
    }

    class SideADView extends ViewBase {
        constructor() {
            super();
            this.start_x = 0;
        }
        onAwake() {
            this.sideAD = this.owner.getChildByName("sideAD");
            this.btn_close = this.sideAD.getChildByName("btn_close");
            this.start_x = -this.sideAD.width;
        }
        onStart() {
        }
        addEvent() {
            this.btn_close.on(Laya.Event.CLICK, this, this.clickClose);
        }
        clickClose() {
            this.sideADHide();
        }
        sideADShow() {
            Laya.Tween.to(this.sideAD, { x: 0 }, 300, Laya.Ease.expoOut, Laya.Handler.create(this, () => {
                this.btn_close.visible = true;
            }));
        }
        sideADHide() {
            Laya.Tween.clearAll(this);
            this.btn_close.visible = false;
            Laya.Tween.to(this.sideAD, { x: this.start_x }, 300, Laya.Ease.expoOut, Laya.Handler.create(this, () => {
                View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.SideAdView);
            }));
        }
    }

    class TrySkinView extends ViewBase {
        constructor() {
            super();
            this.m_rewardType = 0;
        }
        onAwake() {
            this.btn_giveUp = this.owner.getChildByName("btn_giveUp");
            let try_window = this.owner.getChildByName("try_window");
            this.try0 = try_window.getChildByName("try0");
            this.try1 = try_window.getChildByName("try1");
            this.try0_icon = this.try0.getChildByName("display").getChildByName("icon");
            this.try1_icon = this.try1.getChildByName("display").getChildByName("icon");
            if (GameManager.Instance().getHighView()) {
            }
        }
        onStart() {
            super.onStart();
            this.m_rewardType = 0;
            do {
                let id = Math.floor(Math.random() * PropManager.getInstance().getPropTypeNum());
                let amount = PropManager.getInstance().getPropBase(id).amount;
                this.try0_name = PropManager.getInstance().getPropBase(id).type + Math.floor(Math.random() * amount);
            } while (Us_sdlyg_er.ownerProp(this.try0_name));
            this.try0_icon.skin = "subRes/propsLogo/" + this.try0_name + ".png";
            do {
                let id = Math.floor(Math.random() * PropManager.getInstance().getPropTypeNum());
                let amount = PropManager.getInstance().getPropBase(id).amount;
                this.try1_name = PropManager.getInstance().getPropBase(id).type + Math.floor(Math.random() * amount);
            } while (Us_sdlyg_er.ownerProp(this.try1_name));
            this.try1_icon.skin = "subRes/propsLogo/" + this.try1_name + ".png";
        }
        addEvent() {
            this.btn_giveUp.on(Laya.Event.CLICK, this, this.clickGiveUp);
            this.try0.on(Laya.Event.CLICK, this, this.clickTry0);
            this.try1.on(Laya.Event.CLICK, this, this.clickTry1);
        }
        clickGiveUp() {
            if (this._data) {
                this._data.method();
            }
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.TrySkinView);
        }
        onEnable() {
            super.onEnable();
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.RewardVideoFail, this, this.onRewardVidewoFail);
            Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
        }
        onDisable() {
            super.onDisable();
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.RewardVideoFail, this, this.onRewardVidewoFail);
            Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
            this.m_rewardType = 0;
        }
        onRewardVidewoFail() {
            if (this.m_rewardType = 1) {
                this.clickGiveUp();
            }
            else if (this.m_rewardType = 2) {
                this.clickGiveUp();
            }
            this.m_rewardType = 0;
        }
        onRewardVidewoSuccess() {
            if (this.m_rewardType = 1) {
                this.clickGiveUp();
                PlayerManager.Instance().onChooseProp(this.try0_name);
            }
            else if (this.m_rewardType = 2) {
                this.clickGiveUp();
                PlayerManager.Instance().onChooseProp(this.try1_name);
            }
            this.m_rewardType = 0;
        }
        clickTry0() {
            let self = this;
            this.m_rewardType = 1;
            if (GameSwitchConfig.getInstance().openVideo != 1) {
                self.clickGiveUp();
                return;
            }
            if (Laya.Browser.onAndroid) {
                NativeCallback.CallNativeFunc("showRewardVideo");
            }
            else {
                WXAPI.showRewardedVideoAd((res) => {
                    if (res) {
                        self.clickGiveUp();
                        PlayerManager.Instance().onChooseProp(self.try0_name);
                    }
                    else {
                        self.clickGiveUp();
                        console.log("试用皮肤视频未完整观看");
                    }
                }, () => {
                    self.clickGiveUp();
                    console.log("试用皮肤视频加载失败");
                });
            }
        }
        clickTry1() {
            let self = this;
            if (GameSwitchConfig.getInstance().openVideo != 1) {
                self.clickGiveUp();
                return;
            }
            this.m_rewardType = 2;
            if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                NativeCallback.CallNativeFunc("showRewardVideo");
            }
            else {
                WXAPI.showRewardedVideoAd((res) => {
                    if (res) {
                        self.clickGiveUp();
                        PlayerManager.Instance().onChooseProp(self.try1_name);
                    }
                    else {
                        self.clickGiveUp();
                        console.log("试用皮肤视频未完整观看");
                    }
                }, () => {
                    self.clickGiveUp();
                    console.log("试用皮肤视频加载失败");
                });
            }
        }
    }

    class SpriteBreath extends Laya.Script {
        constructor() { super(); }
        onAwake() {
            this.m_owner = this.owner;
            this.fix_x = this.m_owner.scaleX;
            this.rat = this.rat / 1000;
        }
        onUpdate() {
            if (this.m_owner.visible) {
                if (Math.abs(this.m_owner.scaleX - this.fix_x) >= this.changeRange)
                    this.rat = -this.rat;
                let x = this.m_owner.scaleX + this.rat;
                let y = this.m_owner.scaleY + this.rat;
                this.m_owner.scale(x, y);
            }
        }
    }

    class MenuView extends ViewBase {
        constructor() {
            super();
            this.couldRank = true;
        }
        onAwake() {
            this.btn_start = this.owner.getChildByName("btn_start");
            this.btn_skin = this.owner.getChildByName("btn_skin");
            this.btn_moreGame = this.owner.getChildByName("btn_moreGame");
            this.btn_moreGame.visible = false;
            this.btn_sideAD = this.owner.getChildByName("btn_sideAD");
            this.btn_sideAD.visible = false;
            this.btn_close = this.owner.getChildByName("btn_close");
            this.btn_rank = this.owner.getChildByName("btn_rank");
            this.logo = this.owner.getChildByName("logo");
            this.m_level = this.owner.getChildByName("level");
            this.m_level.value = (Us_sdlyg_er.getLeveNum() + 1).toString();
            if (GameManager.Instance().getHighView()) {
                this.btn_start.bottom += 200;
                this.btn_skin.bottom += 200;
                this.btn_moreGame.bottom += 200;
                this.btn_close.top = 147;
            }
        }
        onDestroy() {
            super.onDestroy();
            if (this.btn_autho)
                this.btn_autho.destroy();
        }
        onStart() {
            AImanager.Instance().hide();
            CameraCtrl.Instance().SetState(CameraState.Menu);
            PlayerManager.Instance().showInMenu();
            this.logo.scale(0, 0);
            this.m_level.alpha = 0;
            Laya.Tween.to(this.logo, { scaleX: 1, scaleY: 1 }, 600, Laya.Ease.quadInOut);
            Laya.Tween.to(this.m_level, { alpha: 1 }, 600);
            if (Laya.Browser.onMiniGame) {
                this.onMiniGame();
            }
            else if (Laya.Browser.onQGMiniGame) {
                this.onQGGame();
            }
        }
        addEvent() {
            this.btn_start.on(Laya.Event.CLICK, this, this.clickStart);
            this.btn_skin.on(Laya.Event.CLICK, this, this.clickSkin);
            this.btn_moreGame.on(Laya.Event.CLICK, this, this.clickMoreGame);
            this.btn_sideAD.on(Laya.Event.CLICK, this, this.clickSideAD);
            this.btn_rank.on(Laya.Event.CLICK, this, this.clickRank);
            this.btn_close.on(Laya.Event.CLICK, this, this.clickClose);
        }
        removeEvent() {
            this.btn_start.off(Laya.Event.CLICK, this, this.clickStart);
            this.btn_skin.off(Laya.Event.CLICK, this, this.clickSkin);
            this.btn_moreGame.off(Laya.Event.CLICK, this, this.clickMoreGame);
            this.btn_sideAD.off(Laya.Event.CLICK, this, this.clickSideAD);
            this.btn_rank.off(Laya.Event.CLICK, this, this.clickRank);
            this.btn_close.off(Laya.Event.CLICK, this, this.clickClose);
        }
        clickClose() {
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MenuView);
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MoreGameView);
        }
        clickStart() {
            GameManager.Instance().normalStart();
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MenuView);
            Sound_sdlyg_Mgr.instance.playSound(SoundType.Button);
        }
        clickRank() {
            if (this.couldRank) {
                View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.RankView);
                View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MenuView);
                Sound_sdlyg_Mgr.instance.playSound(SoundType.Button);
            }
        }
        noAuthor() {
            var self = this;
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            var left = 0;
            var top = this.btn_rank.y / Laya.stage.height * sh;
            var width = this.btn_rank.width / Laya.stage.width * sw;
            var height = this.btn_rank.height / Laya.stage.width * sw;
            this.btn_autho = Laya.Browser.window["wx"].createUserInfoButton({
                type: 'image',
                image: "",
                style: {
                    left: left,
                    top: top,
                    width: width,
                    height: height,
                }
            });
            this.btn_autho.onTap((res) => {
                var userInfo = res.userInfo;
                var nickName = userInfo.nickName;
                var avatarUrl = userInfo.avatarUrl;
                console.log("用户授权了", userInfo);
                GameManager.Instance().saveUserAvatarUrl(avatarUrl);
                self.couldRank = true;
            });
        }
        clickSideAD() {
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.SideAdView);
        }
        clickSkin() {
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.BagView);
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MenuView);
            CameraCtrl.Instance().SetState(CameraState.Bag);
            Sound_sdlyg_Mgr.instance.playSound(SoundType.Button);
        }
        clickMoreGame() {
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.MoreGame);
            View_sdlyg_Mgr.instance.closeView(View_sdlyg_Def.MenuView);
        }
        onMiniGame() {
            this.getUserInfo();
            WXAPI.showInterstitialAd(() => { }, () => { });
            if (AppSwitchConfig.getInstance().getAppSwitchData().enterGamePop) {
                View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.EnterGamePop);
            }
            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.SideAdView);
        }
        onQGGame() {
            OPPOAPI.showBannaer();
        }
        getUserInfo() {
            let self = this;
            Laya.Browser.window["wx"].getUserInfo({
                success: function (res) {
                    var userInfo = res.userInfo;
                    var nickName = userInfo.nickName;
                    var avatarUrl = userInfo.avatarUrl;
                    console.log("用户授权了", userInfo);
                    GameManager.Instance().saveUserAvatarUrl(avatarUrl);
                    self.couldRank = true;
                },
                fail: function (res) {
                    console.log("用户没有授权");
                    self.noAuthor();
                }
            });
        }
    }

    class SingleAniADView extends Laya.Script {
        constructor() {
            super(...arguments);
            this.AdPosID = Share_sdlyg_Ad.AniAdLocationID;
            this._data = null;
        }
        onAwake() {
            this._ownerSprite = this.owner;
            this._animation = this.owner.getChildByName("Animation");
        }
        onEnable() {
            this.refreshADVDis();
            this._ownerSprite.on(Laya.Event.CLICK, this, this.onSpClick);
        }
        onDisable() {
            Laya.timer.clearAll(this);
            this._ownerSprite.off(Laya.Event.CLICK, this, this.onSpClick);
        }
        refreshADVDis() {
            var self = this;
            Share_sdlyg_Ad.getADVs(this.AdPosID, (datas) => {
                if (datas && datas.length > 0) {
                    self._ownerSprite.visible = true;
                    var data = datas[Math.floor(Math.random() * datas.length)];
                    self._animation.loadAtlas(data.atlas, Laya.Handler.create(self, function () {
                        self._animation.play(0, true);
                    }));
                    self._data = data;
                }
                else {
                    self._ownerSprite.visible = false;
                }
            }, false);
        }
        onSpClick() {
            var data = this._data;
            if (data) {
                console.log("跳转游戏： " + data.title);
                if (Laya.Browser.onMiniGame) {
                    WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_sdlyg_Ad.reportUserClick(data.appid);
                        ALD.aldSendReportAdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            ALD.aldSendReportAdClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQGMiniGame) {
                    OPPOAPI.navigateToMiniProgram(data.appid, data.title, data.url, (res) => {
                        console.log("跳转成功");
                        Share_sdlyg_Ad.reportUserClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQQMiniGame) {
                    QQMiniGameAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_sdlyg_Ad.reportUserClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
            }
        }
    }

    class MenuSingleAniADView extends SingleAniADView {
        constructor() { super(); }
        onSpClick() {
            var data = this._data;
            if (data) {
                console.log("跳转游戏： " + data.title);
                if (Laya.Browser.onMiniGame) {
                    WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_sdlyg_Ad.reportUserClick(data.appid);
                        ALD.aldSendReportAdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            ALD.aldSendReportAdClickFail(data);
                            View_sdlyg_Mgr.instance.openView(View_sdlyg_Def.SideAdView);
                        }
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQGMiniGame) {
                    OPPOAPI.navigateToMiniProgram(data.appid, data.title, data.url, (res) => {
                        console.log("跳转成功");
                        Share_sdlyg_Ad.reportUserClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQQMiniGame) {
                    QQMiniGameAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_sdlyg_Ad.reportUserClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
            }
        }
    }

    class TwinkleSprite extends Laya.Script {
        constructor() {
            super();
            this.TwinkleSpeed = 1000;
            this.TwinkleMinSize = 0.95;
            this.TwinkleMaxSize = 1.05;
            this._aniForward = false;
            this._fontSize = 25;
            this._originSize = 1;
        }
        onAwake() {
            this._displaySp = this.owner;
            this._disText = this.owner.getChildByName("TitelText");
            this._originSize = this._displaySp.scaleX;
            if (this._disText != null) {
                this._disText.text = "";
                this._fontSize = this._disText.fontSize;
            }
        }
        onEnable() {
            this._displaySp.scale(this._originSize, this._originSize);
        }
        onDisable() {
        }
        onUpdate() {
            this.displayAni();
        }
        displayAni() {
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
        }
    }

    class ClickGetPrize extends ViewBase {
        constructor() {
            super();
            this._totalClickTimer = 22;
            this._needClickTime = 10;
            this._bannerClickTime = 7;
        }
        onAwake() {
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
        }
        onStart() {
            super.onStart();
            this.play1.visible = false;
            this.getPrizeBg.visible = false;
        }
        onUpdate() {
            if (!this._bannerClicked) {
                let spd = 2 + (this._clickTime_PBar$Bar.width / this._clickBarOriginalWidth) * 6;
                if (this._clickTime_PBar$Bar.width >= spd) {
                    this._clickTime_PBar$Bar.width -= spd;
                }
                if ((this._clickTime_PBar$Bar.width / this._clickBarOriginalWidth) + 0.1 < (this._clickTime / this._needClickTime)) {
                    this._clickTime--;
                }
            }
        }
        openView(data) {
            this._compeletFunction = data.Complete;
            this._prizeCount = data.PrizeCount;
            super.openView(data);
        }
        OpenPrizeWindow() {
            this.getPrizeBg.visible = true;
            this._bg.visible = false;
            let self = this;
            this._prizeCount_Text.text = this._prizeCount.toString();
            this._getPrize_View.visible = true;
            this._confirm_Btn.once(Laya.Event.CLICK, this, function () {
                if (self._compeletFunction) {
                    self._compeletFunction();
                }
                self.closeView();
            });
        }
        ShowBanner() {
            console.log("AD_WudianBanner_Show");
            CachedWXBannerAd.show();
        }
        ButtonClicked() {
            this.ShowBit();
            this._clickTime++;
            this._totalClickTime++;
            if (this._clickTime > this._needClickTime) {
                this._clickTime = this._needClickTime;
            }
            if (this._clickTime >= this._bannerClickTime) {
                if (this._clickTime >= this._needClickTime) {
                    this._clickTime = this._needClickTime - 1;
                }
                this._bannerClicked = true;
                console.log("误点Banner套路启动");
                this.ShowBanner();
                Laya.timer.once(150, this, function () {
                    this.BannerClicked();
                });
            }
            else if (this._totalClickTime > this._totalClickTimer) {
                console.log("用户一直没点到，放他一马", this._totalClickTime);
                this.BannerClicked();
            }
            let progress = (this._clickTime / this._needClickTime) * this._clickBarOriginalWidth;
            this._clickTime_PBar$Bar.width = progress;
        }
        BannerClicked() {
            Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_WudianBanner_Hide);
            this._bannerClicked = true;
            this._clickTime = this._needClickTime;
            this._clickTime_PBar$Bar.width = this._clickBarOriginalWidth;
            this._click_Btn.visible = false;
            this._open_Btn.visible = true;
            this.OpenPrizeWindow();
        }
        onDestroy() {
            super.onDestroy();
            CachedWXBannerAd.hide();
        }
        ShowBit() {
            Laya.timer.clearAll(this);
            this.BeforeBit();
            Laya.timer.once(30, this, () => {
                this.AfterBit();
                Laya.timer.once(350, this, () => {
                    this.BeforeBit();
                });
            });
        }
        BeforeBit() {
            this.play1.visible = false;
            this.play0.visible = true;
        }
        AfterBit() {
            this.play1.visible = true;
            this.play0.visible = false;
        }
    }

    class LoadingView extends ViewBase {
        constructor() {
            super(...arguments);
            this._processWidth = 0;
        }
        onAwake() {
            this._bg = this.owner.getChildByName("Bg");
            this._processBarBg = this._bg.getChildByName("processBarBg");
            this._loading = this.owner.getChildByName("loading");
            this.m_bg = this.owner.getChildByName("m_bg");
            this._loading.skin = "res/loading.png";
            this.m_bg.skin = "res/沙雕来一杆loading.png";
            this._bg.skin = "res/进度条1.png";
            if (this._processBarBg) {
                this._processBar = this._processBarBg.getChildByName("processBar");
                this._processWidth = this._processBar.width;
            }
            else {
                this._processBar = this._bg.getChildByName("processBar");
                this._processBar.skin = "res/进度条2.png";
                this._processWidth = this._processBar.width;
            }
            this._processBar.width = 0;
            console.log(this._processBar.width);
        }
        onEnable() {
            super.onEnable();
        }
        addEvent() {
            super.addEvent();
        }
        removeEvent() {
            super.removeEvent();
        }
        onUpdate() {
            if (this._processBar.width <= this._processWidth) {
                this._processBar.width += 6;
                Math.min(this._processBar.width, this._processWidth);
            }
        }
        setProcess(process) {
            return;
            console.log(process);
            if (process < 0)
                process = 0;
            if (process > 1)
                process = 1;
            var width = this._processWidth * process;
            this._processBar.width = width;
        }
    }

    class TipsView extends ViewBase {
        constructor() { super(); }
        onAwake() {
            this._bg = this.owner.getChildByName("Bg");
            this._bg.x = Laya.stage.width / 2 - this._bg.width / 2;
            this._tipsText = this._bg.getChildByName("Text");
        }
        openView(data) {
            super.openView(data);
            this.setTipsMsg(data);
            Laya.timer.clearAll(this);
            var self = this;
            Laya.timer.once(3000, this, function () {
                self.closeView();
            });
        }
        setTipsMsg(msg) {
            this._tipsText.text = msg;
        }
    }

    class BannerAdView extends Laya.Script {
        constructor() {
            super(...arguments);
            this.AdPosID = Share_sdlyg_Ad.BannerAdLocationID;
            this._data = null;
            this._wxBanner = null;
        }
        onAwake() {
            this._displaySp = this.owner.getChildByName("Display");
            if (null == this._displaySp) {
                this._displaySp = this.owner;
            }
        }
        onEnable() {
            this._displaySp.on(Laya.Event.CLICK, this, this.onSpClick);
            var banner = AppSwitchConfig.getInstance().getAppSwitchData().banner;
            if (0 == banner) {
                this.refreshBannerDis();
            }
            else if (1 == banner) {
                this.refreshWXBanner();
            }
        }
        onDisable() {
            this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
            this.clearWXBaner();
        }
        refreshBannerDis() {
            var self = this;
            Share_sdlyg_Ad.getADVs(this.AdPosID, (datas) => {
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
        }
        onSpClick() {
            var data = this._data;
            if (data) {
                console.log("跳转游戏： " + data.title);
                if (Laya.Browser.onMiniGame) {
                    WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_sdlyg_Ad.reportUserClick(data.appid);
                        ALD.aldSendReportAdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            ALD.aldSendReportAdClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQGMiniGame) {
                    OPPOAPI.navigateToMiniProgram(data.appid, data.title, data.url, (res) => {
                        console.log("跳转成功");
                        Share_sdlyg_Ad.reportUserClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQQMiniGame) {
                    QQMiniGameAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_sdlyg_Ad.reportUserClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.AD_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
            }
        }
        refreshWXBanner() {
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
                adUnitId: WXAPI.bannerAdUnitId,
                adIntervals: 30,
                style: {
                    left: left,
                    top: top,
                    width: width,
                }
            });
            self._wxBanner.onLoad((res) => {
                console.log("WXBanner广告 加载完成");
                console.log(res);
            });
            this._wxBanner.onError((err) => {
                console.log("WXBanner广告 加载失败");
                console.log(err);
                self.refreshBannerDis();
                self.clearWXBaner();
            });
            this._wxBanner.onResize(res => {
                console.log(self._wxBanner.style.realWidth, self._wxBanner.style.realHeight);
            });
            self._wxBanner.show();
        }
        clearWXBaner() {
            if (this._wxBanner) {
                this._wxBanner.destroy();
            }
            this._wxBanner = null;
        }
    }

    class UniversalBottomZone extends Laya.Script {
        onAwake() {
            this._ownerSprite = this.owner;
            this._autoZone = this._ownerSprite.getChildByName("AutoZone");
            this._loopADZone = this._ownerSprite.getChildByName("LoopAD");
            this._bannerADZone = this._ownerSprite.getChildByName("BannerAD");
            this._bannerAd = this._bannerADZone.getComponent(BannerAdView);
        }
        onEnable() {
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
        }
        onDisable() {
        }
        onUpdate() {
            if (!this._bannerADZone.visible) {
                this._bannerAd.clearWXBaner();
            }
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Mgr/GameMgr.ts", Game_sdlyg_Mgr);
            reg("MyScripts/View/BagView.ts", BagView);
            reg("MyScripts/Ctrl/SkinTitle.ts", SkinTitle);
            reg("Common/MyList.ts", MyList);
            reg("MyScripts/Ctrl/PageIcon.ts", PageIcon);
            reg("MyScripts/Ctrl/Coin.ts", Coin);
            reg("ShareAd/View/LoopAdBox.ts", LoopAdBox);
            reg("ShareAd/MyView/EnterPopVerticalLoopAdView.ts", VerticalLoopAdView);
            reg("MyScripts/View/EnterGamePop.ts", EnterGamePop);
            reg("MyScripts/View/GameView.ts", GameView);
            reg("MyScripts/Ctrl/GameHeadPic.ts", GameHeadPic);
            reg("MyScripts/Ctrl/RecordVedioIcon.ts", RecordVedioIcon);
            reg("MyScripts/Ctrl/GuangQuan.ts", GuangQuan);
            reg("MyScripts/Ctrl/TreasureBox.ts", TreasureBox);
            reg("MyScripts/View/LotteryView.ts", LotteryView);
            reg("MyScripts/Ctrl/ButtonShan.ts", ButtonShan);
            reg("Common/MyButton.ts", MyButton);
            reg("ShareAd/View/HorizontalLoopAdView.ts", HorizontalLoopAdView);
            reg("ShareAd/MyView/VerticalLoopAdView.ts", VerticalLoopAdView$1);
            reg("MyScripts/View/MoreGameView2.ts", MoreGameView2);
            reg("ShareAd/MyView/MoreGameLoopAdBox.ts", MoreGameLoopAdBox);
            reg("ShareAd/MyView/MoreGameLoopAdView.ts", MoreGameLoopAdView);
            reg("MyScripts/View/MoreGameView.ts", MoreGameView);
            reg("MyScripts/View/NativeAdView.ts", NativeAdView);
            reg("MyScripts/View/OverDeriveView.ts", OverDeriveView);
            reg("MyScripts/View/OverView.ts", OverView);
            reg("MyScripts/Ctrl/OverCup.ts", OverCup);
            reg("MyScripts/Ctrl/Cup.ts", Cup);
            reg("MyScripts/Ctrl/HeadPic.ts", HeadPic);
            reg("MyScripts/View/RankView.ts", RankView);
            reg("MyScripts/View/ReliveView.ts", ReliveView);
            reg("Common/WudianSprite.ts", WudianSprite);
            reg("ShareAd/MyView/VerticalSideADLoopView.ts", VerticalSideADLoopView);
            reg("MyScripts/View/SideADView.ts", SideADView);
            reg("MyScripts/View/TrySkinView.ts", TrySkinView);
            reg("Common/SpriteBreath.ts", SpriteBreath);
            reg("MyScripts/View/MenuView.ts", MenuView);
            reg("ShareAd/MyView/MenuSingleAniADView.ts", MenuSingleAniADView);
            reg("View/TwinkleSprite.ts", TwinkleSprite);
            reg("View/ClickGetPrize/ClickGetPrize.ts", ClickGetPrize);
            reg("View/LoadingView/LoadingView.ts", LoadingView);
            reg("View/TipsView/TipsView.ts", TipsView);
            reg("ShareAd/View/BannerAdView.ts", BannerAdView);
            reg("View/Common/UniversalBottomZone.ts", UniversalBottomZone);
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
            LoadingUI.uiView = { "type": "Scene", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Image", "props": { "top": 0, "right": 0, "name": "m_bg", "left": 0 }, "compId": 9 }, { "type": "Clip", "props": { "width": 650, "name": "Bg", "height": 35, "centerX": 0, "bottom": 200 }, "compId": 6, "child": [{ "type": "Clip", "props": { "y": 26, "x": 13, "width": 619, "pivotY": 22, "name": "processBar", "height": 23 }, "compId": 5 }] }, { "type": "Script", "props": { "y": 0, "x": 0, "runtime": "View/LoadingView/LoadingView.ts" }, "compId": 7 }, { "type": "Image", "props": { "width": 200, "name": "loading", "height": 50, "centerX": 0, "bottom": 300 }, "compId": 8 }], "loadList": [], "loadList3D": [] };
            View.LoadingUI = LoadingUI;
            REG("ui.View.LoadingUI", LoadingUI);
        })(View = ui.View || (ui.View = {}));
    })(ui || (ui = {}));

    class TTAPI {
        static ttLogin(onSuccess, onFail) {
            if (App_sdlyg_Config.onTTMiniGame) {
                Laya.Browser.window.tt.login({
                    success: (res) => {
                        if (res.code) {
                            let code = res.code;
                            onSuccess(code);
                            console.log("登陆成功,获取到code : " + code);
                        }
                    }
                });
            }
            TTAPI.initRecord();
        }
        static onRewardedVideoAdLoad() {
            console.log('激励视频 广告加载完成');
        }
        static onRewardedVideoAdError(err) {
            console.log('激励视频 广告加载失败' + err);
            if (TTAPI._onRewardedVideoAdFailed) {
                TTAPI._onRewardedVideoAdFailed();
            }
        }
        static onRewardedVideoAdClose(res) {
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
        }
        static regRewardedVideoAdEvent(rewardedVideoAd) {
            rewardedVideoAd.onLoad(TTAPI.onRewardedVideoAdLoad);
            rewardedVideoAd.onError(TTAPI.onRewardedVideoAdError);
            rewardedVideoAd.onClose(TTAPI.onRewardedVideoAdClose);
            TTAPI._isRegRewardedVideoAdEvent = true;
        }
        static showRewardedVideoAd(onAdClose, onFailed) {
            if (App_sdlyg_Config.onTTMiniGame) {
                TTAPI._onRewardedVideoAdClose = onAdClose;
                TTAPI._onRewardedVideoAdFailed = onFailed;
                var rewardedVideoAd = Laya.Browser.window["tt"].createRewardedVideoAd({
                    adUnitId: TTAPI.adUnitId,
                });
                if (!TTAPI._isRegRewardedVideoAdEvent) {
                    TTAPI.regRewardedVideoAdEvent(rewardedVideoAd);
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
        static initRecord() {
            TTAPI.record = Laya.Browser.window["tt"].getGameRecorderManager();
            if (TTAPI.record != null) {
                TTAPI.record.onStart(res => {
                    console.log("录屏开始");
                    TTAPI.recordRes = "";
                });
                TTAPI.record.onStop(res => {
                    console.log("录屏结束");
                    TTAPI.recordRes = res.videoPath;
                });
            }
        }
        static startRecord(duration = 300) {
            if (!App_sdlyg_Config.onTTMiniGame)
                return;
            TTAPI.record.start({
                duration
            });
        }
        static stopRecord() {
            if (!App_sdlyg_Config.onTTMiniGame)
                return;
            TTAPI.record.stop();
        }
        static shareRecord(callback = null) {
            if (!App_sdlyg_Config.onTTMiniGame)
                return;
            if (TTAPI.recordRes != "") {
                window["tt"].shareAppMessage({
                    channel: "video",
                    extra: {
                        videoPath: TTAPI.recordRes,
                        videoTopics: ["快来和我一起玩吧！"]
                    },
                    success() {
                        if (callback != null) {
                            callback();
                        }
                        console.log("分享视频成功");
                    },
                    fail(e) {
                        console.log("分享视频失败");
                    }
                });
            }
            else {
                console.log("分享视频为空");
            }
        }
        static share(complate = null) {
            if (!App_sdlyg_Config.onTTMiniGame)
                return;
            window["tt"].shareAppMessage({
                templateId: this._templateId,
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
        static showBanner() {
            if (!App_sdlyg_Config.onTTMiniGame)
                return;
            if (!TTAPI._banner) {
                const { windowWidth, windowHeight } = Laya.Browser.window["tt"].getSystemInfoSync();
                var targetBannerAdWidth = 150;
                TTAPI._banner = Laya.Browser.window["tt"].createBannerAd({
                    adUnitId: TTAPI.bannerAdUnitId,
                    adIntervals: 30,
                    style: {
                        width: targetBannerAdWidth,
                        top: windowHeight - (targetBannerAdWidth / 16) * 9,
                    }
                });
                TTAPI._banner.onResize(size => {
                    console.log(size.width, size.height);
                    TTAPI._banner.style.top = windowHeight - size.height;
                    TTAPI._banner.style.left = (windowWidth - size.width) / 2;
                });
                TTAPI._banner.show();
            }
        }
    }
    TTAPI.adUnitId = "";
    TTAPI.bannerAdUnitId = "";
    TTAPI.InsAdUnitId = "";
    TTAPI._templateId = "";
    TTAPI.recordRes = "";
    TTAPI._banner = null;
    TTAPI._isRegRewardedVideoAdEvent = false;
    TTAPI._onRewardedVideoAdFailed = null;
    TTAPI._onRewardedVideoAdClose = null;

    class Main {
        constructor() {
            this._loadingUI = null;
            this._loadingView = null;
            this._preLoadRes = new Array();
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height, null, Laya.Handler.create(this, this.initMain));
            else {
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
                this.initMain();
            }
        }
        initMain() {
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
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
            if (true == App_sdlyg_Config.onTTMiniGame) {
                Laya.Browser.onMiniGame = false;
            }
            if (!Laya.Browser.onMiniGame
                && !Laya.Browser.onQGMiniGame
                && !Laya.Browser.onQQMiniGame
                && !App_sdlyg_Config.onTTMiniGame) {
                App_sdlyg_Config.ResServer = App_sdlyg_Config.LocalTestReServer;
            }
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            Laya.loader.maxLoader = 50;
            this.initLoadingView();
            var firstConfigs = [
                { url: App_sdlyg_Config.ResServer + "/json/appswitch.json", type: Laya.Loader.JSON }
            ];
            var self = this;
            Laya.loader.load(firstConfigs, Laya.Handler.create(this, () => {
                self.loadRes();
            }));
            Event_sdlyg_Mgr.instance.regOnceEvent(Event_sdlyg_Def.App_CloseFirstLoadingView, this, this.closeloadingUI);
        }
        initLoadingView() {
            this._loadingUI = new ui.View.LoadingUI();
            Laya.stage.addChild(this._loadingUI);
            this._loadingUI.width = Laya.stage.width;
            this._loadingUI.height = Laya.stage.height;
            this._loadingView = this._loadingUI.getComponent(LoadingView);
            this._loadingView.setProcess(0);
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
            if (Laya.Browser.onMiniGame) {
                WXAPI.checkUpdate();
                CachedWXBannerAd.preloadBanner();
            }
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
                                self._loadingView.setProcess(res / 2 + 0.5);
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
                    self._loadingView.setProcess(res / 2);
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
                                self._loadingView.setProcess(res / 2 + 0.5);
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
                    self._loadingView.setProcess(progress / 2);
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
                                self._loadingView.setProcess(res / 2 + 0.5);
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
                    self._loadingView.setProcess(res / 2);
                });
            }
            else {
                if (resource.length > 0) {
                    Laya.loader.load(resource, Laya.Handler.create(this, () => {
                        self.onLoadResComplate();
                    }), Laya.Handler.create(this, (res) => {
                        self._loadingView.setProcess(res);
                    }));
                }
                else {
                    self.onLoadResComplate();
                }
            }
        }
        onLoadResComplate() {
            var self = this;
            this._loadingView.setProcess(1);
            if (Laya.Browser.onMiniGame) {
                WXAPI.wxLogin(function (code) {
                    Us_sdlyg_er.code = code;
                    HttpUnit.login((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            Us_sdlyg_er.token = res.data.token;
                            Us_sdlyg_er.openId = res.data.openid;
                            ALD.aldSendOpenId(Us_sdlyg_er.openId);
                            HttpUnit.getGameData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    Us_sdlyg_er.initiUser(res.data);
                                }
                                else {
                                    Us_sdlyg_er.initiUser(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                Us_sdlyg_er.token = "";
                                Us_sdlyg_er.openId = "";
                                Us_sdlyg_er.initiUser(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！" + res);
                            Us_sdlyg_er.initiUser(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！" + res);
                        Us_sdlyg_er.initiUser(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else if (Laya.Browser.onQGMiniGame) {
                OPPOAPI.initAdService(() => {
                }, () => {
                }, () => {
                });
                OPPOAPI.Login(function (token) {
                    Us_sdlyg_er.code = token;
                    HttpUnit.login((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            Us_sdlyg_er.token = res.data.token;
                            Us_sdlyg_er.openId = res.data.openid;
                            HttpUnit.getGameData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    Us_sdlyg_er.initiUser(res.data);
                                    console.log("获取用户数据--------------------Start");
                                    for (var key in res.data) {
                                        console.log(key, res.data[key]);
                                    }
                                    console.log("获取用户数据--------------------End");
                                }
                                else {
                                    Us_sdlyg_er.initiUser(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                Us_sdlyg_er.token = "";
                                Us_sdlyg_er.openId = "";
                                Us_sdlyg_er.initiUser(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！", res);
                            Us_sdlyg_er.initiUser(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！", res);
                        Us_sdlyg_er.initiUser(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else if (Laya.Browser.onQQMiniGame) {
                QQMiniGameAPI.Login(function (code) {
                    Us_sdlyg_er.code = code;
                    HttpUnit.login((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            Us_sdlyg_er.token = res.data.token;
                            Us_sdlyg_er.openId = res.data.openid;
                            ALD.aldSendOpenId(Us_sdlyg_er.openId);
                            HttpUnit.getGameData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    Us_sdlyg_er.initiUser(res.data);
                                }
                                else {
                                    Us_sdlyg_er.initiUser(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                Us_sdlyg_er.token = "";
                                Us_sdlyg_er.openId = "";
                                Us_sdlyg_er.initiUser(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！" + res);
                            Us_sdlyg_er.initiUser(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！" + res);
                        Us_sdlyg_er.initiUser(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else if (App_sdlyg_Config.onTTMiniGame) {
                TTAPI.ttLogin(function (code) {
                    Us_sdlyg_er.code = code;
                    HttpUnit.login((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            Us_sdlyg_er.token = res.data.token;
                            Us_sdlyg_er.openId = res.data.openid;
                            HttpUnit.getGameData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    Us_sdlyg_er.initiUser(res.data);
                                }
                                else {
                                    Us_sdlyg_er.initiUser(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                Us_sdlyg_er.token = "";
                                Us_sdlyg_er.openId = "";
                                Us_sdlyg_er.initiUser(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！" + res);
                            Us_sdlyg_er.initiUser(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！" + res);
                        Us_sdlyg_er.initiUser(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else {
                Us_sdlyg_er.testInitUser();
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
