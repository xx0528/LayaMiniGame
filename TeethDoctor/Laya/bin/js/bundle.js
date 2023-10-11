(function () {
    'use strict';

    var Vie_XYXZS_wDef;
    (function (Vie_XYXZS_wDef) {
        Vie_XYXZS_wDef["No_XYXZS_ne"] = "";
        Vie_XYXZS_wDef["Tips_XYXZS_View"] = "View/TipsView.json";
        Vie_XYXZS_wDef["Cli_XYXZS_ckGetPrize"] = "View/ClickGetPrize.json";
        Vie_XYXZS_wDef["GameP_XYXZS_laying"] = "View/GamePlaying.json";
        Vie_XYXZS_wDef["Main_XYXZS_View"] = "View/MainView.json";
        Vie_XYXZS_wDef["More_XYXZS_GameView"] = "View/MoreGameView.json";
        Vie_XYXZS_wDef["Game_XYXZS_Over"] = "View/GameOver.json";
        Vie_XYXZS_wDef["Game_XYXZS_View"] = "View/GameView.json";
        Vie_XYXZS_wDef["Fake_XYXZS_Export"] = "View/FakeExport.json";
        Vie_XYXZS_wDef["KRQ__XYXZS_TEST"] = "View/KRQ_TEST.json";
    })(Vie_XYXZS_wDef || (Vie_XYXZS_wDef = {}));
    class Vie_XYXZS_wMgr {
        constructor() {
            this._v_XYXZS_iews = {};
        }
        open_XYXZS_View(viewType, data, oncomplate) {
            if (this._v_XYXZS_iews[viewType]) {
                var view = this._v_XYXZS_iews[viewType];
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
                self._v_XYXZS_iews[viewType] = view;
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
        clos_XYXZS_eView(viewType) {
            var view = this._v_XYXZS_iews[viewType];
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
                this._v_XYXZS_iews[viewType] = null;
            }
        }
        Show_XYXZS_View(viewType) {
            var view = this._v_XYXZS_iews[viewType];
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
        hide_XYXZS_View(viewType) {
            var view = this._v_XYXZS_iews[viewType];
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
        get_XYXZS_View(viewType) {
            return this._v_XYXZS_iews[viewType];
        }
        showT_XYXZS_ips(msg) {
            this.open_XYXZS_View(Vie_XYXZS_wDef.Tips_XYXZS_View, msg);
        }
    }
    Vie_XYXZS_wMgr.inst_XYXZS_ance = new Vie_XYXZS_wMgr();

    var EventDispatcher = Laya.EventDispatcher;
    class Even_XYXZS_tMgr extends EventDispatcher {
        constructor() {
            super();
        }
        ;
        disp_XYXZS_atch(InName, agv) {
            Even_XYXZS_tMgr.eventDis_XYXZS_patcher.event(InName, agv);
        }
        reg_XYXZS_Evemt(InName, caller, listener, arg) {
            Even_XYXZS_tMgr.eventDis_XYXZS_patcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
        }
        reg_XYXZS_OnceEvent(InName, caller, listener, arg) {
            Even_XYXZS_tMgr.eventDis_XYXZS_patcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
        }
        re_XYXZS_moveEvent(InName, caller, listener, arg) {
            Even_XYXZS_tMgr.eventDis_XYXZS_patcher.off(InName, caller, listener);
        }
    }
    Even_XYXZS_tMgr.eventDis_XYXZS_patcher = new EventDispatcher();
    Even_XYXZS_tMgr.in_XYXZS_stance = new Even_XYXZS_tMgr();

    var Even_XYXZS_tDef;
    (function (Even_XYXZS_tDef) {
        Even_XYXZS_tDef[Even_XYXZS_tDef["N_XYXZS_one"] = 0] = "N_XYXZS_one";
        Even_XYXZS_tDef[Even_XYXZS_tDef["App_Close_XYXZS_FirstLoadingView"] = 500] = "App_Close_XYXZS_FirstLoadingView";
        Even_XYXZS_tDef[Even_XYXZS_tDef["AD_OnShare_XYXZS_AdFail"] = 501] = "AD_OnShare_XYXZS_AdFail";
        Even_XYXZS_tDef[Even_XYXZS_tDef["Game_OnV_XYXZS_iewOpen"] = 600] = "Game_OnV_XYXZS_iewOpen";
        Even_XYXZS_tDef[Even_XYXZS_tDef["Game_OnVi_XYXZS_ewClose"] = 601] = "Game_OnVi_XYXZS_ewClose";
        Even_XYXZS_tDef[Even_XYXZS_tDef["Game_OnUse_XYXZS_rMoneyChange"] = 701] = "Game_OnUse_XYXZS_rMoneyChange";
        Even_XYXZS_tDef[Even_XYXZS_tDef["Game_OnUs_XYXZS_erCrystalChange"] = 702] = "Game_OnUs_XYXZS_erCrystalChange";
        Even_XYXZS_tDef[Even_XYXZS_tDef["Game_OnLeve_XYXZS_lStart"] = 1000] = "Game_OnLeve_XYXZS_lStart";
        Even_XYXZS_tDef[Even_XYXZS_tDef["Game_OnLeve_XYXZS_lComplate"] = 1001] = "Game_OnLeve_XYXZS_lComplate";
        Even_XYXZS_tDef[Even_XYXZS_tDef["AD_WudianBan_XYXZS_ner_LoadComplete"] = 2217] = "AD_WudianBan_XYXZS_ner_LoadComplete";
        Even_XYXZS_tDef[Even_XYXZS_tDef["AD_WudianBan_XYXZS_ner_Show"] = 2218] = "AD_WudianBan_XYXZS_ner_Show";
        Even_XYXZS_tDef[Even_XYXZS_tDef["AD_WudianB_XYXZS_anner_Hide"] = 2219] = "AD_WudianB_XYXZS_anner_Hide";
        Even_XYXZS_tDef[Even_XYXZS_tDef["AD_Wudian_XYXZS_Banner_PreLoad"] = 2220] = "AD_Wudian_XYXZS_Banner_PreLoad";
        Even_XYXZS_tDef[Even_XYXZS_tDef["AD_Switch_XYXZS_Banner"] = 505] = "AD_Switch_XYXZS_Banner";
        Even_XYXZS_tDef[Even_XYXZS_tDef["APP_Load_XYXZS_Compelete"] = 503] = "APP_Load_XYXZS_Compelete";
        Even_XYXZS_tDef[Even_XYXZS_tDef["RewardVideoSuccess"] = 20010] = "RewardVideoSuccess";
        Even_XYXZS_tDef[Even_XYXZS_tDef["RewardVideoFail"] = 20011] = "RewardVideoFail";
        Even_XYXZS_tDef[Even_XYXZS_tDef["InsertVideoEnd"] = 20012] = "InsertVideoEnd";
    })(Even_XYXZS_tDef || (Even_XYXZS_tDef = {}));

    class UserGa_XYXZS_meData {
        constructor() {
            this.leve_XYXZS_lNum = 1;
            this.mone_XYXZS_yNum = 0;
            this.crys_XYXZS_talNum = 0;
        }
    }
    class Us_XYXZS_er extends Laya.Script {
        static get isLo_XYXZS_gin() {
            return (Us_XYXZS_er.c_XYXZS_ode != "") || (Us_XYXZS_er.to_XYXZS_ken != "");
        }
        static getSa_XYXZS_veData() {
            return JSON.stringify(Us_XYXZS_er._game_XYXZS_Data);
        }
        static testIn_XYXZS_itUser() {
            var storageStr = Laya.LocalStorage.getItem("Game_Data");
            console.log("读取存储数据 str----" + storageStr);
            var data = JSON.parse(storageStr);
            if (data == null) {
                Us_XYXZS_er._game_XYXZS_Data.leve_XYXZS_lNum = 0;
                Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum = 0;
                Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum = 0;
                return;
            }
            Us_XYXZS_er._game_XYXZS_Data.leve_XYXZS_lNum = data.levelNum;
            Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum = data.levelNum;
            Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum = data.levelNum;
        }
        static init_XYXZS_iUser(data) {
            if (data && 0 != data) {
                Us_XYXZS_er._game_XYXZS_Data.leve_XYXZS_lNum = data.levelNum;
                Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum = data.moneyNum;
                Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum = data.crystalNum;
            }
            else {
            }
        }
        static setLe_XYXZS_veNum(levelNum) {
            Us_XYXZS_er._game_XYXZS_Data.leve_XYXZS_lNum = levelNum;
        }
        static getL_XYXZS_eveNum() {
            return Us_XYXZS_er._game_XYXZS_Data.leve_XYXZS_lNum;
        }
        static addM_XYXZS_oney(add) {
            add = Math.ceil(add);
            var last = Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum;
            Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum += add;
            Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.Game_OnUse_XYXZS_rMoneyChange, {
                curr: Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum,
                last: last
            });
        }
        static subM_XYXZS_oney(sub) {
            sub = Math.ceil(sub);
            var last = Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum;
            Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum -= sub;
            if (Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum < 0) {
                Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum = 0;
            }
            Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.Game_OnUse_XYXZS_rMoneyChange, {
                curr: Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum,
                last: last
            });
        }
        static getM_XYXZS_oney() {
            return Us_XYXZS_er._game_XYXZS_Data.mone_XYXZS_yNum;
        }
        static addCr_XYXZS_ystal(add) {
            add = Math.ceil(add);
            var last = Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum;
            Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum += add;
            Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.Game_OnUs_XYXZS_erCrystalChange, {
                curr: Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum,
                last: last
            });
        }
        static sub_XYXZS_Crystal(sub) {
            sub = Math.ceil(sub);
            var last = Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum;
            Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum -= sub;
            if (Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum < 0) {
                Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum = 0;
            }
            Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.Game_OnUs_XYXZS_erCrystalChange, {
                curr: Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum,
                last: last
            });
        }
        static getC_XYXZS_rystal() {
            return Us_XYXZS_er._game_XYXZS_Data.crys_XYXZS_talNum;
        }
    }
    Us_XYXZS_er.c_XYXZS_ode = "";
    Us_XYXZS_er.o_XYXZS_penId = "";
    Us_XYXZS_er.to_XYXZS_ken = null;
    Us_XYXZS_er.nick_XYXZS_Name = "";
    Us_XYXZS_er.gen_XYXZS_der = 0;
    Us_XYXZS_er._game_XYXZS_Data = new UserGa_XYXZS_meData();

    class NetC_XYXZS_onfig {
    }
    NetC_XYXZS_onfig.st_XYXZS_ate = 0;
    NetC_XYXZS_onfig.gam_XYXZS_eid = 86;
    NetC_XYXZS_onfig.ser_XYXZS_verUrl = "";
    NetC_XYXZS_onfig.Lo_XYXZS_gin = "";
    NetC_XYXZS_onfig.Sa_XYXZS_veGameData = "";
    NetC_XYXZS_onfig.Ge_XYXZS_tUser = "";
    NetC_XYXZS_onfig.Ip_XYXZS_Block = "";
    NetC_XYXZS_onfig.repo_XYXZS_rtExport = "";
    NetC_XYXZS_onfig.repo_XYXZS_rtImport = "";
    NetC_XYXZS_onfig.getu_XYXZS_serip = "";

    class Aes_XYXZS_Tools {
        static en_XYXZS_crypt(str) {
            return str;
        }
        static de_XYXZS_crypt(str) {
            return str;
        }
    }
    Aes_XYXZS_Tools.KE_XYXZS_Y = 'b#63fFJ6AvkK3YT*';
    Aes_XYXZS_Tools.I_XYXZS_V = 'J$f4DU%sNL73M&Go';

    class App_XYXZS_Config {
    }
    App_XYXZS_Config.Ap_XYXZS_pID = "";
    App_XYXZS_Config.ResSe_XYXZS_rver = "";
    App_XYXZS_Config.LocalTest_XYXZS_ReServer = "subRes";
    App_XYXZS_Config.Ver_XYXZS_sions = "0.0.0";
    App_XYXZS_Config.onTTMi_XYXZS_niGame = false;

    class reques_XYXZS_tData {
        constructor() {
            this.m_XYXZS_eth = "post";
            this.u_XYXZS_rl = "";
            this.on_XYXZS_Success = null;
            this.onF_XYXZS_ail = null;
            this.da_XYXZS_ta = {};
        }
    }
    class Http_XYXZS_Unit {
        static req_XYXZS_uest(req) {
            if (req.u_XYXZS_rl.indexOf("https://") > -1 ||
                req.u_XYXZS_rl.indexOf("http://") > -1) {
                req.u_XYXZS_rl = req.u_XYXZS_rl;
            }
            else {
                req.u_XYXZS_rl = NetC_XYXZS_onfig.ser_XYXZS_verUrl + req.u_XYXZS_rl;
            }
            var completeFunc = (res) => {
                console.log(res, "http Success");
                if (req.on_XYXZS_Success) {
                    req.on_XYXZS_Success(res);
                }
                req.on_XYXZS_Success = null;
                req = null;
            };
            var errorFunc = (res) => {
                console.log(res, "http fail");
                if (req.onF_XYXZS_ail) {
                    req.onF_XYXZS_ail(res);
                }
                req.onF_XYXZS_ail = null;
                req = null;
            };
            var xhr = new Laya.HttpRequest();
            xhr.once(Laya.Event.COMPLETE, Http_XYXZS_Unit, completeFunc);
            xhr.once(Laya.Event.ERROR, Http_XYXZS_Unit, errorFunc);
            let dataStr = JSON.stringify(req.da_XYXZS_ta);
            if (Laya.Browser.onMiniGame || App_XYXZS_Config.onTTMi_XYXZS_niGame) {
                req.da_XYXZS_ta.code = Us_XYXZS_er.c_XYXZS_ode;
            }
            else if (Laya.Browser.onQGMiniGame) {
                req.da_XYXZS_ta.oppotoken = Us_XYXZS_er.c_XYXZS_ode;
            }
            else if (Laya.Browser.onQQMiniGame) {
                req.da_XYXZS_ta.code = Us_XYXZS_er.c_XYXZS_ode;
            }
            else {
                req.da_XYXZS_ta.code = Us_XYXZS_er.c_XYXZS_ode;
            }
            var time = "time=" + String(Date.now());
            var header = [
                "Content-Type", "application/json",
                "state", NetC_XYXZS_onfig.st_XYXZS_ate,
                "gameid", NetC_XYXZS_onfig.gam_XYXZS_eid,
                "sign", Aes_XYXZS_Tools.en_XYXZS_crypt(time),
            ];
            if (Us_XYXZS_er.to_XYXZS_ken) {
                header.push("token");
                header.push(Us_XYXZS_er.to_XYXZS_ken);
            }
            xhr.send(req.u_XYXZS_rl, JSON.stringify(req.da_XYXZS_ta), req.m_XYXZS_eth, "json", header);
        }
        static log_XYXZS_in(onSuccess, onFail) {
            var req = new reques_XYXZS_tData();
            req.u_XYXZS_rl = NetC_XYXZS_onfig.Lo_XYXZS_gin;
            req.on_XYXZS_Success = onSuccess;
            req.onF_XYXZS_ail = onFail;
            Http_XYXZS_Unit.req_XYXZS_uest(req);
        }
        static saveGa_XYXZS_meData(gameData, onSuccess, onFail) {
            var req = new reques_XYXZS_tData();
            req.u_XYXZS_rl = NetC_XYXZS_onfig.Sa_XYXZS_veGameData;
            req.da_XYXZS_ta.gameData = gameData;
            req.on_XYXZS_Success = onSuccess;
            req.onF_XYXZS_ail = onFail;
            Http_XYXZS_Unit.req_XYXZS_uest(req);
        }
        static getGa_XYXZS_meData(onSuccess, onFail) {
            var req = new reques_XYXZS_tData();
            req.u_XYXZS_rl = NetC_XYXZS_onfig.Ge_XYXZS_tUser;
            req.on_XYXZS_Success = onSuccess;
            req.onF_XYXZS_ail = onFail;
            Http_XYXZS_Unit.req_XYXZS_uest(req);
        }
        static GetI_XYXZS_pBlock(onSuccess, onFail) {
            if (-1 != NetC_XYXZS_onfig.gam_XYXZS_eid) {
                var req = new reques_XYXZS_tData();
                req.u_XYXZS_rl = NetC_XYXZS_onfig.Ip_XYXZS_Block;
                req.on_XYXZS_Success = onSuccess;
                req.onF_XYXZS_ail = onFail;
                Http_XYXZS_Unit.req_XYXZS_uest(req);
            }
        }
        static repo_XYXZS_rtExport(appid, game_name, onSuccess, onFail) {
            var req = new reques_XYXZS_tData();
            req.u_XYXZS_rl = NetC_XYXZS_onfig.repo_XYXZS_rtExport;
            req.da_XYXZS_ta.wbappid = appid;
            req.da_XYXZS_ta.game_name = game_name;
            req.on_XYXZS_Success = onSuccess;
            req.onF_XYXZS_ail = onFail;
            Http_XYXZS_Unit.req_XYXZS_uest(req);
        }
        static reportI_XYXZS_mport(appid, channel, onSuccess, onFail) {
            var req = new reques_XYXZS_tData();
            req.u_XYXZS_rl = NetC_XYXZS_onfig.repo_XYXZS_rtImport;
            req.da_XYXZS_ta.wbappid = appid;
            req.da_XYXZS_ta.channel = channel;
            req.on_XYXZS_Success = onSuccess;
            req.onF_XYXZS_ail = onFail;
            Http_XYXZS_Unit.req_XYXZS_uest(req);
        }
        static Getu_XYXZS_serip(onSuccess, onFail) {
            var req = new reques_XYXZS_tData();
            req.u_XYXZS_rl = NetC_XYXZS_onfig.getu_XYXZS_serip;
            req.on_XYXZS_Success = onSuccess;
            req.onF_XYXZS_ail = onFail;
            Http_XYXZS_Unit.req_XYXZS_uest(req);
        }
    }

    class W_XYXZS_XAPI {
        static wxL_XYXZS_ogin(onSuccess, onFail) {
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
        static onRewarde_XYXZS_dVideoAdLoad() {
            console.log('激励视频 广告加载完成');
        }
        static onRewarde_XYXZS_dVideoAdError(err) {
            console.log('激励视频 广告加载失败' + err);
            if (W_XYXZS_XAPI._onRewarde_XYXZS_dVideoAdFailed) {
                W_XYXZS_XAPI._onRewarde_XYXZS_dVideoAdFailed();
            }
        }
        static onRewarde_XYXZS_dVideoAdClose(res) {
            if ((res && res.isEnded) || res == null) {
                console.log('激励视频 已完整观看');
                if (W_XYXZS_XAPI._onRewarde_XYXZS_dVideoAdClose) {
                    W_XYXZS_XAPI._onRewarde_XYXZS_dVideoAdClose(true);
                }
            }
            else {
                console.log('激励视频 未完整观看');
                if (W_XYXZS_XAPI._onRewarde_XYXZS_dVideoAdClose) {
                    W_XYXZS_XAPI._onRewarde_XYXZS_dVideoAdClose(false);
                }
            }
        }
        static regRewarded_XYXZS_VideoAdEvent(rewardedVideoAd) {
            rewardedVideoAd.onLoad(W_XYXZS_XAPI.onRewarde_XYXZS_dVideoAdLoad);
            rewardedVideoAd.onError(W_XYXZS_XAPI.onRewarde_XYXZS_dVideoAdError);
            rewardedVideoAd.onClose(W_XYXZS_XAPI.onRewarde_XYXZS_dVideoAdClose);
            W_XYXZS_XAPI._isRegRew_XYXZS_ardedVideoAdEvent = true;
        }
        static showRewar_XYXZS_dedVideoAd(onAdClose, onFailed) {
            if (Laya.Browser.onMiniGame) {
                W_XYXZS_XAPI._onRewarde_XYXZS_dVideoAdClose = onAdClose;
                W_XYXZS_XAPI._onRewarde_XYXZS_dVideoAdFailed = onFailed;
                var rewardedVideoAd = Laya.Browser.window["wx"].createRewardedVideoAd({
                    adUnitId: W_XYXZS_XAPI.adU_XYXZS_nitId,
                });
                if (!W_XYXZS_XAPI._isRegRew_XYXZS_ardedVideoAdEvent) {
                    W_XYXZS_XAPI.regRewarded_XYXZS_VideoAdEvent(rewardedVideoAd);
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
        static navigateT_XYXZS_oMiniProgram(appId, path, onSuccess, onFail, onComplate) {
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
        static s_XYXZS_hare(complate, titel, imageUrl) {
            if (Laya.Browser.onMiniGame) {
                W_XYXZS_XAPI._on_XYXZS_Show = () => {
                    Laya.Browser.window["wx"].offShow(W_XYXZS_XAPI._on_XYXZS_Show);
                    W_XYXZS_XAPI._on_XYXZS_Show = null;
                    var c = Date.now() - this._las_XYXZS_tShareTime;
                    if (complate) {
                        if (Date.now() - this._las_XYXZS_tShareTime > 2000) {
                            complate(true);
                        }
                        else {
                            complate(false);
                        }
                    }
                };
                Laya.Browser.window["wx"].onShow(W_XYXZS_XAPI._on_XYXZS_Show);
                W_XYXZS_XAPI._las_XYXZS_tShareTime = Date.now();
                Laya.Browser.window["wx"].shareAppMessage({
                    title: titel,
                    imageUrl: imageUrl
                });
            }
        }
        static showInte_XYXZS_rstitialAd(onAdClose, onFailed) {
            if (Laya.Browser.onMiniGame) {
                var interstitialAd = Laya.Browser.window["wx"].createInterstitialAd({
                    adUnitId: W_XYXZS_XAPI.InsA_XYXZS_dUnitId,
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
        static getLaun_XYXZS_chOptionsSync() {
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
        static SetSha_XYXZS_reMenu(titel, imageUrl, success, fail, complate) {
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
        static chec_XYXZS_kUpdate() {
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
    W_XYXZS_XAPI.adU_XYXZS_nitId = "adunit-6e6219236eed9dae";
    W_XYXZS_XAPI.bann_XYXZS_erAdUnitId = "adunit-2a81056503ffca2c";
    W_XYXZS_XAPI.InsA_XYXZS_dUnitId = "adunit-440e21cc02c0d282";
    W_XYXZS_XAPI._isRegRew_XYXZS_ardedVideoAdEvent = false;
    W_XYXZS_XAPI._onRewarde_XYXZS_dVideoAdFailed = null;
    W_XYXZS_XAPI._onRewarde_XYXZS_dVideoAdClose = null;
    W_XYXZS_XAPI._on_XYXZS_Show = null;
    W_XYXZS_XAPI._las_XYXZS_tShareTime = 0;

    class OPP_XYXZS_OAPI {
        static get BannerI_XYXZS_nstance() {
            return OPP_XYXZS_OAPI._ban_XYXZS_ner;
        }
        static Lo_XYXZS_gin(onSuccess, onFail) {
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
        static initA_XYXZS_dService(onSuccess, onFail, onComplete) {
            Laya.Browser.window["qg"].initAdService({
                appId: App_XYXZS_Config.Ap_XYXZS_pID,
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
        static showRewa_XYXZS_rdedVideoAd(onAdClose, onFailed) {
            if (Laya.Browser.onQGMiniGame) {
                var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                    posId: OPP_XYXZS_OAPI.ad_XYXZS_UnitId,
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
        static navigat_XYXZS_eToMiniProgram(pkgName, gameName, path, onSuccess, onFail, onComplate) {
            if (Laya.Browser.onQGMiniGame) {
                console.log("OPPO 跳转游戏： " + pkgName);
                Http_XYXZS_Unit.repo_XYXZS_rtExport(pkgName, gameName, (result) => {
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
                        from: App_XYXZS_Config.Ap_XYXZS_pID
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
        static showInte_XYXZS_rstitialAd(onAdClose, onFailed) {
            if (Laya.Browser.onQGMiniGame) {
                var insertAd = qg.createInsertAd({
                    posId: OPP_XYXZS_OAPI.Ins_XYXZS_AdUnitId
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
        static showB_XYXZS_annaer() {
            if (OPP_XYXZS_OAPI._ban_XYXZS_ner) {
                OPP_XYXZS_OAPI._ban_XYXZS_ner.show();
                return;
            }
            var bannerAd = qg.createBannerAd({
                posId: OPP_XYXZS_OAPI.ban_XYXZS_nerAdUnitId
            });
            bannerAd.show();
            OPP_XYXZS_OAPI._ban_XYXZS_ner = bannerAd;
        }
        static hide_XYXZS_Banner() {
            if (OPP_XYXZS_OAPI._ban_XYXZS_ner) {
                OPP_XYXZS_OAPI._ban_XYXZS_ner.hide();
            }
        }
        static getLaunch_XYXZS_OptionsSync() {
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
        static s_XYXZS_hare(complate, titel, imageUrl) {
            complate(false);
        }
        static createDes_XYXZS_ktopIcon(onSuccess, onFail) {
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
    OPP_XYXZS_OAPI.ad_XYXZS_UnitId = "134292";
    OPP_XYXZS_OAPI.ban_XYXZS_nerAdUnitId = "134291";
    OPP_XYXZS_OAPI.Ins_XYXZS_AdUnitId = "134294";
    OPP_XYXZS_OAPI.OpenS_XYXZS_creenAdUnitId = "134293";
    OPP_XYXZS_OAPI._ban_XYXZS_ner = null;

    class Mai_XYXZS_Liang {
        static re_XYXZS_quest(req) {
            if (req.u_XYXZS_rl.indexOf("https://") > -1 ||
                req.u_XYXZS_rl.indexOf("http://") > -1) {
                req.u_XYXZS_rl = req.u_XYXZS_rl;
            }
            else {
                req.u_XYXZS_rl = Mai_XYXZS_Liang.ma_XYXZS_inUrl + req.u_XYXZS_rl;
            }
            var completeFunc = (res) => {
                console.log(res, "MaiLiang http Success");
                res = JSON.parse(res);
                if (res.Status == "200") {
                    if (res.Result["OpenId"] != null && res.Result["OpenId"] != "") {
                        Mai_XYXZS_Liang.MaiL_XYXZS_iangOpenId = res.Result["OpenId"];
                        Mai_XYXZS_Liang.t_XYXZS_ime = req.da_XYXZS_ta.posttime;
                        console.log("获得买量系统OpenId " + Mai_XYXZS_Liang.MaiL_XYXZS_iangOpenId);
                    }
                    else {
                        console.log("上报买量系统停留时间成功");
                    }
                    if (req.on_XYXZS_Success) {
                        req.on_XYXZS_Success(res);
                    }
                }
                else {
                    if (req.onF_XYXZS_ail) {
                        req.onF_XYXZS_ail(res);
                    }
                }
                req.on_XYXZS_Success = null;
                req = null;
            };
            var errorFunc = (res) => {
                console.log(res, "MaiLiang http fail");
                if (req.onF_XYXZS_ail) {
                    req.onF_XYXZS_ail(res);
                }
                req.onF_XYXZS_ail = null;
                req = null;
            };
            var xhr = new Laya.HttpRequest();
            xhr.once(Laya.Event.COMPLETE, Mai_XYXZS_Liang, completeFunc);
            xhr.once(Laya.Event.ERROR, Mai_XYXZS_Liang, errorFunc);
            if (req.m_XYXZS_eth == "get") {
                var para = "";
                for (const key of Object.keys(req.da_XYXZS_ta)) {
                    var value = req.da_XYXZS_ta[key];
                    para += key + "=" + value + "&";
                }
                req.u_XYXZS_rl = req.u_XYXZS_rl + "?" + para;
                xhr.send(req.u_XYXZS_rl, null, req.m_XYXZS_eth);
            }
            else {
                var para = "";
                for (const key of Object.keys(req.da_XYXZS_ta)) {
                    var value = req.da_XYXZS_ta[key];
                    para += key + "=" + value + "&";
                }
                xhr.send(req.u_XYXZS_rl, para, req.m_XYXZS_eth, null, ["Content-Type", "application/x-www-form-urlencoded"]);
            }
        }
        static GetMai_XYXZS_LiangOpenId(onSuccess, onFail) {
            if (Laya.Browser.onMiniGame) {
                let option = W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync();
                if (option != null) {
                    let key = option.query["key"];
                    if (key != null && key != "" && Us_XYXZS_er.o_XYXZS_penId != "") {
                        Mai_XYXZS_Liang.k_XYXZS_ey = key;
                        let req = new reques_XYXZS_tData();
                        req.u_XYXZS_rl = Mai_XYXZS_Liang.ucl_XYXZS_ick;
                        req.on_XYXZS_Success = onSuccess;
                        req.onF_XYXZS_ail = onFail;
                        req.da_XYXZS_ta.appid = App_XYXZS_Config.Ap_XYXZS_pID;
                        req.da_XYXZS_ta.openid = "";
                        let time = new Date().getTime() / 1000;
                        req.da_XYXZS_ta.posttime = time;
                        req.da_XYXZS_ta.auth = 0;
                        req.da_XYXZS_ta.key = key;
                        req.da_XYXZS_ta.wxopenid = Us_XYXZS_er.o_XYXZS_penId;
                        req.m_XYXZS_eth = "POST";
                        console.log("发送买量数据接口");
                        Mai_XYXZS_Liang.re_XYXZS_quest(req);
                    }
                }
                else {
                    console.log("上报买量数据失败");
                    onFail(null);
                }
            }
            else if (Laya.Browser.onQGMiniGame) {
                let option = OPP_XYXZS_OAPI.getLaunch_XYXZS_OptionsSync();
                Http_XYXZS_Unit.reportI_XYXZS_mport(option.referrerInfo.package, option.referrerInfo.extraData.appid, (result) => {
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
        static ReportS_XYXZS_tayTime(onSuccess, onFail) {
            if (Laya.Browser.onMiniGame) {
                if (Mai_XYXZS_Liang.MaiL_XYXZS_iangOpenId != "") {
                    let req = new reques_XYXZS_tData();
                    req.u_XYXZS_rl = Mai_XYXZS_Liang.st_XYXZS_ay;
                    req.on_XYXZS_Success = onSuccess;
                    req.onF_XYXZS_ail = onFail;
                    req.da_XYXZS_ta.appid = App_XYXZS_Config.Ap_XYXZS_pID;
                    req.da_XYXZS_ta.openid = Mai_XYXZS_Liang.MaiL_XYXZS_iangOpenId;
                    let time = new Date().getTime() / 1000;
                    req.da_XYXZS_ta.posttime = time;
                    let staytime = Mai_XYXZS_Liang.t_XYXZS_ime != 0 ? time - Mai_XYXZS_Liang.t_XYXZS_ime : 0;
                    req.da_XYXZS_ta.time = staytime;
                    req.m_XYXZS_eth = "POST";
                    console.log("发送停留时间至买量接口");
                    Mai_XYXZS_Liang.re_XYXZS_quest(req);
                }
            }
            else {
                console.log("不在微信模式下调用，默认发送停留时间至买量接口失败");
                onFail(null);
            }
        }
    }
    Mai_XYXZS_Liang.ma_XYXZS_inUrl = "https://swtj.mrkzx.cn";
    Mai_XYXZS_Liang.ucl_XYXZS_ick = "/v1.1/api/Activity/uclick.html";
    Mai_XYXZS_Liang.st_XYXZS_ay = "/v1.1/api/Activity/stay.html";
    Mai_XYXZS_Liang.k_XYXZS_ey = "";
    Mai_XYXZS_Liang.MaiL_XYXZS_iangOpenId = "";
    Mai_XYXZS_Liang.t_XYXZS_ime = 0;

    class AppSwi_XYXZS_tchData {
        constructor() {
            this.ver_XYXZS_sion = "";
            this.ba_XYXZS_nner = 0;
            this.wu_XYXZS_dian = 0;
            this.wudi_XYXZS_anAvailableTime = {
                "0": 0, "1": 0, "2": 0, "3": 0,
                "4": 0, "5": 0, "6": 0, "7": 0,
                "8": 0, "9": 0, "10": 0, "11": 0,
                "12": 0, "13": 0, "14": 0, "15": 0,
                "16": 0, "17": 0, "18": 0, "19": 0,
                "20": 0, "21": 0, "22": 0, "23": 0
            };
            this.mai_XYXZS_liang = 1;
            this.mail_XYXZS_ianglist = new Array();
            this.mailia_XYXZS_ngSceneList = new Array();
            this.wxWuD_XYXZS_ianBanners = new Array();
            this.btnMo_XYXZS_veTimer = 1;
            this.banner_XYXZS_MoveTimer = 0.5;
            this.banner_XYXZS_FreshTimer = 200;
            this.bannerCr_XYXZS_eateFailNum = 3;
            this.bannerTod_XYXZS_ayBannerMax = 10;
            this.adSw_XYXZS_itch = 1;
            this.wudia_XYXZS_nSceneList = new Array();
            this.BackAndNex_XYXZS_tBtnDelayTime = 2;
            this.GoOnBtnDe_XYXZS_layTime = 2;
            this.fakeBtn = 0;
        }
        get wudianTi_XYXZS_meAvaliable() {
            return this.wudi_XYXZS_anAvailableTime[new Date().getHours()] == 1;
        }
    }
    class AppSwi_XYXZS_tchConfig {
        constructor() {
            this._d_XYXZS_ata = new Array();
        }
        static getIn_XYXZS_stance() {
            if (null == AppSwi_XYXZS_tchConfig._ins_XYXZS_tance) {
                AppSwi_XYXZS_tchConfig._ins_XYXZS_tance = AppSwi_XYXZS_tchConfig.l_XYXZS_oad();
            }
            return AppSwi_XYXZS_tchConfig._ins_XYXZS_tance;
        }
        static l_XYXZS_oad() {
            var config = new AppSwi_XYXZS_tchConfig();
            var json = Laya.loader.getRes(App_XYXZS_Config.ResSe_XYXZS_rver + "/json/appswitch.json");
            if (json) {
                for (var i = 0; i < json.length; ++i) {
                    var row = json[i];
                    var rowData = new AppSwi_XYXZS_tchData();
                    rowData.ver_XYXZS_sion = String(row["version"]);
                    rowData.ba_XYXZS_nner = Number(row["banner"]);
                    rowData.wu_XYXZS_dian = Number(row["wudian"]);
                    rowData.wudi_XYXZS_anAvailableTime = Object(row["wudianTime"]);
                    rowData.mai_XYXZS_liang = Number(row["mailiang"]);
                    var mailianglist = row["mailianglist"];
                    if (null != mailianglist) {
                        for (var j = 0; j < mailianglist.length; ++j) {
                            var flag = Number(mailianglist[j]);
                            rowData.mail_XYXZS_ianglist.push(flag);
                        }
                    }
                    var mailiangScenelist = row["mailiangScenelist"];
                    if (null != mailiangScenelist) {
                        for (var j = 0; j < mailiangScenelist.length; ++j) {
                            var sceneValue = Number(mailiangScenelist[j]);
                            rowData.mailia_XYXZS_ngSceneList.push(sceneValue);
                        }
                    }
                    var wxwudianbanners = row["wxwudianbanners"];
                    if (null != wxwudianbanners) {
                        for (var j = 0; j < wxwudianbanners.length; ++j) {
                            var bannerid = String(wxwudianbanners[j]);
                            rowData.wxWuD_XYXZS_ianBanners.push(bannerid);
                        }
                    }
                    rowData.btnMo_XYXZS_veTimer = Number(row["btnMoveTimer"]);
                    rowData.banner_XYXZS_MoveTimer = Number(row["bannerMoveTimer"]);
                    rowData.bannerCr_XYXZS_eateFailNum = Number(row["createFailNum"]);
                    rowData.banner_XYXZS_FreshTimer = Number(row["bannerFreshTimer"]);
                    rowData.bannerTod_XYXZS_ayBannerMax = Number(row["todayBannerMax"]);
                    rowData.adSw_XYXZS_itch = Number(row["adSwitch"]);
                    var wudianSceneList = row["wudianSceneList"];
                    if (null != wudianSceneList) {
                        for (var j = 0; j < wudianSceneList.length; ++j) {
                            var wudianSceneValue = Number(wudianSceneList[j]);
                            rowData.wudia_XYXZS_nSceneList.push(wudianSceneValue);
                        }
                    }
                    rowData.BackAndNex_XYXZS_tBtnDelayTime = Number(row[""]);
                    rowData.GoOnBtnDe_XYXZS_layTime = Number(row[""]);
                    rowData.fakeBtn = Number(row["fakeBtn"]);
                    config._d_XYXZS_ata.push(rowData);
                }
                return config;
            }
            else {
                config._d_XYXZS_ata.push(new AppSwi_XYXZS_tchData());
                return config;
            }
        }
        getAppSwi_XYXZS_tchData() {
            return this._d_XYXZS_ata[0];
        }
    }

    class QQMini_XYXZS_GameAPI {
        static Lo_XYXZS_gin(onSuccess, onFail) {
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
        static onRewarde_XYXZS_dVideoAdLoad() {
            console.log('激励视频 广告加载完成');
        }
        static onRewarded_XYXZS_VideoAdError(err) {
            console.log('激励视频 广告加载失败' + err);
            if (QQMini_XYXZS_GameAPI._onRewarded_XYXZS_VideoAdFailed) {
                QQMini_XYXZS_GameAPI._onRewarded_XYXZS_VideoAdFailed();
            }
        }
        static onRewarde_XYXZS_dVideoAdClose(res) {
            if ((res && res.isEnded) || res == null) {
                console.log('激励视频 已完整观看');
                if (QQMini_XYXZS_GameAPI._onRewardedV_XYXZS_ideoAdClose) {
                    QQMini_XYXZS_GameAPI._onRewardedV_XYXZS_ideoAdClose(true);
                }
            }
            else {
                console.log('激励视频 未完整观看');
                if (QQMini_XYXZS_GameAPI._onRewardedV_XYXZS_ideoAdClose) {
                    QQMini_XYXZS_GameAPI._onRewardedV_XYXZS_ideoAdClose(false);
                }
            }
        }
        static regReward_XYXZS_edVideoAdEvent(rewardedVideoAd) {
            rewardedVideoAd.onLoad(QQMini_XYXZS_GameAPI.onRewarde_XYXZS_dVideoAdLoad);
            rewardedVideoAd.onError(QQMini_XYXZS_GameAPI.onRewarded_XYXZS_VideoAdError);
            rewardedVideoAd.onClose(QQMini_XYXZS_GameAPI.onRewarde_XYXZS_dVideoAdClose);
            QQMini_XYXZS_GameAPI._isRegRewar_XYXZS_dedVideoAdEvent = true;
        }
        static showReward_XYXZS_edVideoAd(onAdClose, onFailed) {
            if (Laya.Browser.onQQMiniGame) {
                QQMini_XYXZS_GameAPI._onRewardedV_XYXZS_ideoAdClose = onAdClose;
                QQMini_XYXZS_GameAPI._onRewarded_XYXZS_VideoAdFailed = onFailed;
                var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd({
                    adUnitId: QQMini_XYXZS_GameAPI.adU_XYXZS_nitId,
                });
                if (!QQMini_XYXZS_GameAPI._isRegRewar_XYXZS_dedVideoAdEvent) {
                    QQMini_XYXZS_GameAPI.regReward_XYXZS_edVideoAdEvent(rewardedVideoAd);
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
        static navigateToMi_XYXZS_niProgram(appId, path, onSuccess, onFail, onComplate) {
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
        static sh_XYXZS_are(complate, titel, imageUrl) {
            if (Laya.Browser.onQQMiniGame) {
                QQMini_XYXZS_GameAPI._on_XYXZS_Show = () => {
                    Laya.Browser.window["qq"].offShow(QQMini_XYXZS_GameAPI._on_XYXZS_Show);
                    QQMini_XYXZS_GameAPI._on_XYXZS_Show = null;
                    var c = Date.now() - this._lastS_XYXZS_hareTime;
                    if (complate) {
                        if (Date.now() - this._lastS_XYXZS_hareTime > 2000) {
                            complate(true);
                        }
                        else {
                            complate(false);
                        }
                    }
                };
                Laya.Browser.window["qq"].onShow(QQMini_XYXZS_GameAPI._on_XYXZS_Show);
                QQMini_XYXZS_GameAPI._lastS_XYXZS_hareTime = Date.now();
                Laya.Browser.window["qq"].shareAppMessage({
                    title: titel,
                    imageUrl: imageUrl
                });
            }
        }
        static showInt_XYXZS_erstitialAd(onAdClose, onFailed) {
            if (Laya.Browser.onQQMiniGame) {
                var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                    adUnitId: QQMini_XYXZS_GameAPI.InsAd_XYXZS_UnitId,
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
        static Loa_XYXZS_dAppBoxAd(onAdClose, onFailed) {
            if (Laya.Browser.onQQMiniGame) {
                QQMini_XYXZS_GameAPI.mAp_XYXZS_pboxAd = Laya.Browser.window["qq"].createAppBox({
                    adUnitId: QQMini_XYXZS_GameAPI.AppBo_XYXZS_xId,
                });
                QQMini_XYXZS_GameAPI.mAp_XYXZS_pboxAd.load().then(() => {
                    console.log('盒子广告 加载完成');
                });
                QQMini_XYXZS_GameAPI.mAp_XYXZS_pboxAd.onError((err) => {
                    console.log('盒子广告 加载失败' + err);
                    if (onFailed) {
                        onFailed();
                    }
                });
                QQMini_XYXZS_GameAPI.mAp_XYXZS_pboxAd.onClose(() => {
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
        static show_XYXZS_AppBoxAd(onFailed) {
            if (QQMini_XYXZS_GameAPI.mAp_XYXZS_pboxAd) {
                console.log("显示盒子广告");
                QQMini_XYXZS_GameAPI.mAp_XYXZS_pboxAd.show().catch((err) => {
                    console.log('盒子广告 显示失败 ：' + err);
                    if (onFailed) {
                        onFailed();
                    }
                });
            }
            else {
                QQMini_XYXZS_GameAPI.Loa_XYXZS_dAppBoxAd((onAdClose) => {
                }, (onFailed) => {
                });
            }
        }
        static getLaunc_XYXZS_hOptionsSync() {
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
        static SetShar_XYXZS_eMenu(titel, imageUrl, success, fail, complate) {
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
    QQMini_XYXZS_GameAPI.adU_XYXZS_nitId = "";
    QQMini_XYXZS_GameAPI.bann_XYXZS_erAdUnitId = "";
    QQMini_XYXZS_GameAPI.InsAd_XYXZS_UnitId = "";
    QQMini_XYXZS_GameAPI.AppBo_XYXZS_xId = "";
    QQMini_XYXZS_GameAPI._isRegRewar_XYXZS_dedVideoAdEvent = false;
    QQMini_XYXZS_GameAPI._onRewarded_XYXZS_VideoAdFailed = null;
    QQMini_XYXZS_GameAPI._onRewardedV_XYXZS_ideoAdClose = null;
    QQMini_XYXZS_GameAPI._on_XYXZS_Show = null;
    QQMini_XYXZS_GameAPI._lastS_XYXZS_hareTime = 0;
    QQMini_XYXZS_GameAPI.mAp_XYXZS_pboxAd = null;

    class Wudi_XYXZS_anMgr {
        static IpBl_XYXZS_ockFlag() {
            return Wudi_XYXZS_anMgr._ipBlo_XYXZS_ckFlag;
        }
        static Update_XYXZS_IpBlockState() {
            Http_XYXZS_Unit.GetI_XYXZS_pBlock(function (res) {
                console.log("调用IpBlock接口成功,结果为:", res);
                Wudi_XYXZS_anMgr._ipBlo_XYXZS_ckFlag = res.code;
            }, null);
        }
        static GetI_XYXZS_pBlocked() {
            return Wudi_XYXZS_anMgr._ipBlo_XYXZS_ckFlag == 0;
        }
        static GetEntry_XYXZS_Scene() {
            return W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync().scene == 1006;
        }
        static IsSwi_XYXZS_tchOpen() {
            let mainSwitch = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wu_XYXZS_dian == 1;
            let isOpenTime = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wudianTi_XYXZS_meAvaliable;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "打开时间", isOpenTime);
            return mainSwitch && isOpenTime;
        }
        static get Wud_XYXZS_ianFlag() {
            let mainSwitch = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wu_XYXZS_dian == 1;
            let launchScene = null;
            if (Laya.Browser.onMiniGame) {
                launchScene = W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync().scene;
            }
            else if (Laya.Browser.onQQMiniGame) {
                launchScene = QQMini_XYXZS_GameAPI.getLaunc_XYXZS_hOptionsSync().scene;
            }
            let noEnterBySearch = true;
            var wudianSceneList = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wudia_XYXZS_nSceneList;
            for (var i = 0; i < wudianSceneList.length; ++i) {
                var wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            let isOpenTime = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wudianTi_XYXZS_meAvaliable;
            let ipnotBlock = Wudi_XYXZS_anMgr._ipBlo_XYXZS_ckFlag == 0;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock, "打开时间", isOpenTime);
            return mainSwitch && noEnterBySearch && ipnotBlock && isOpenTime;
        }
        static get NoTimeW_XYXZS_udianFlag() {
            let mainSwitch = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wu_XYXZS_dian == 1;
            let launchScene = null;
            if (Laya.Browser.onMiniGame) {
                launchScene = W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync().scene;
            }
            else if (Laya.Browser.onQQMiniGame) {
                launchScene = QQMini_XYXZS_GameAPI.getLaunc_XYXZS_hOptionsSync().scene;
            }
            let noEnterBySearch = true;
            var wudianSceneList = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wudia_XYXZS_nSceneList;
            for (var i = 0; i < wudianSceneList.length; ++i) {
                var wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            let ipnotBlock = Wudi_XYXZS_anMgr._ipBlo_XYXZS_ckFlag == 0;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
            return mainSwitch && noEnterBySearch && ipnotBlock;
        }
        static get FakeExportBtn() {
            let mainSwitch = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().fakeBtn == 1;
            let launchScene = null;
            if (Laya.Browser.onMiniGame) {
                launchScene = W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync().scene;
            }
            else if (Laya.Browser.onQQMiniGame) {
                launchScene = QQMini_XYXZS_GameAPI.getLaunc_XYXZS_hOptionsSync().scene;
            }
            let noEnterBySearch = true;
            var wudianSceneList = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wudia_XYXZS_nSceneList;
            for (var i = 0; i < wudianSceneList.length; ++i) {
                var wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            let ipnotBlock = Wudi_XYXZS_anMgr._ipBlo_XYXZS_ckFlag == 0;
            console.log("伪退出Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock);
            return mainSwitch && noEnterBySearch && ipnotBlock;
        }
    }
    Wudi_XYXZS_anMgr._ipBlo_XYXZS_ckFlag = -1;

    class Cached_XYXZS_WXBannerAd {
        static preloa_XYXZS_dBanner() {
            var wxWuDianBanners = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wxWuD_XYXZS_ianBanners;
            var bannerTodayBannerMax = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().bannerTod_XYXZS_ayBannerMax;
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
            Laya.timer.loop(2000, Cached_XYXZS_WXBannerAd._preL_XYXZS_oopObj, () => {
                if (counter >= preLoadBanners.length) {
                    Laya.timer.clearAll(Cached_XYXZS_WXBannerAd._preL_XYXZS_oopObj);
                    return;
                }
                var bannerid = preLoadBanners[counter];
                var banner = Cached_XYXZS_WXBannerAd._bann_XYXZS_erCache[bannerid];
                if (null == banner) {
                    banner = Cached_XYXZS_WXBannerAd.cr_XYXZS_eate(bannerid);
                    if (null != banner) {
                        Cached_XYXZS_WXBannerAd._bann_XYXZS_erCache[bannerid] = banner;
                        console.log("预创建微信Bannaer", bannerid, "完成");
                    }
                }
                ++counter;
            });
        }
        static get_XYXZS_Banner(bannerid) {
            if (null == bannerid || "" == bannerid)
                return null;
            var banner = Cached_XYXZS_WXBannerAd._bann_XYXZS_erCache[bannerid];
            if (null == banner) {
                banner = Cached_XYXZS_WXBannerAd.cr_XYXZS_eate(bannerid);
                if (null != banner) {
                    Cached_XYXZS_WXBannerAd._bann_XYXZS_erCache[bannerid] = banner;
                }
            }
            return banner;
        }
        static cr_XYXZS_eate(bannerid) {
            if (Laya.Browser.onMiniGame) {
                var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
                var sw = sysInfo.screenWidth;
                var sh = sysInfo.screenHeight;
                var banner = Laya.Browser.window["wx"].createBannerAd({
                    adUnitId: bannerid,
                    adIntervals: 30,
                    style: {
                        left: 0,
                        top: (Laya.stage.height - 300) / Laya.stage.height * sh,
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
            if (null != Cached_XYXZS_WXBannerAd._curB_XYXZS_anner) {
                Cached_XYXZS_WXBannerAd._curB_XYXZS_anner.hide();
                Cached_XYXZS_WXBannerAd._curB_XYXZS_anner = null;
            }
            var wuDianBanners = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().wxWuD_XYXZS_ianBanners;
            var bannerid = wuDianBanners[Math.floor(Math.random() * wuDianBanners.length)];
            var banner = Cached_XYXZS_WXBannerAd.get_XYXZS_Banner(bannerid);
            if (banner) {
                Cached_XYXZS_WXBannerAd._curB_XYXZS_anner = banner;
                var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
                var sw = sysInfo.screenWidth;
                var sh = sysInfo.screenHeight;
                Cached_XYXZS_WXBannerAd._curB_XYXZS_anner.style.top = (Laya.stage.height - 300) / Laya.stage.height * sh;
                Cached_XYXZS_WXBannerAd._curB_XYXZS_anner.show();
                console.log("CachedWXBanner 广告显示 bannerid ： ", bannerid);
            }
            var time = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().banner_XYXZS_FreshTimer;
        }
        static hide() {
            Laya.timer.clearAll(Cached_XYXZS_WXBannerAd);
            if (null != Cached_XYXZS_WXBannerAd._curB_XYXZS_anner) {
                Cached_XYXZS_WXBannerAd._curB_XYXZS_anner.hide();
                Cached_XYXZS_WXBannerAd._curB_XYXZS_anner = null;
            }
            console.log("CachedWXBanner 广告隐藏");
        }
        static chan_XYXZS_geShow() {
            if (null != Cached_XYXZS_WXBannerAd._curB_XYXZS_anner) {
                Cached_XYXZS_WXBannerAd._curB_XYXZS_anner.hide();
                Cached_XYXZS_WXBannerAd._curB_XYXZS_anner = null;
            }
            Cached_XYXZS_WXBannerAd.show();
        }
        static clear() {
            Laya.timer.clearAll(Cached_XYXZS_WXBannerAd);
            for (var key in Cached_XYXZS_WXBannerAd._bann_XYXZS_erCache) {
                var banner = Cached_XYXZS_WXBannerAd._bann_XYXZS_erCache[key];
                if (null != banner) {
                    banner.destroy();
                }
                Cached_XYXZS_WXBannerAd._bann_XYXZS_erCache[key] = null;
            }
        }
    }
    Cached_XYXZS_WXBannerAd._bann_XYXZS_erCache = {};
    Cached_XYXZS_WXBannerAd._curB_XYXZS_anner = null;
    Cached_XYXZS_WXBannerAd._preL_XYXZS_oopObj = {};

    var ALDEv_XYXZS_entDef;
    (function (ALDEv_XYXZS_entDef) {
        ALDEv_XYXZS_entDef["N_XYXZS_one"] = "";
        ALDEv_XYXZS_entDef["ReportA_XYXZS_dClickSuccess"] = "\u5E7F\u544A\u5BFC\u51FA\u6210\u529F";
        ALDEv_XYXZS_entDef["ReportAd_XYXZS_ClickFail"] = "\u5E7F\u544A\u5BFC\u51FA\u5931\u8D25";
        ALDEv_XYXZS_entDef["ReportLau_XYXZS_nchOptions"] = "\u7528\u6237\u542F\u52A8\u53C2\u6570";
    })(ALDEv_XYXZS_entDef || (ALDEv_XYXZS_entDef = {}));
    class A_XYXZS_LD {
        static aldSe_XYXZS_ndOpenId(openid) {
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window["wx"].aldSendOpenid(openid);
                console.log("ALD 上报 openid : ", openid);
            }
            else if (Laya.Browser.onQQMiniGame) {
                Laya.Browser.window["qq"].aldSendOpenid(openid);
                console.log("ALD 上报 openid : ", openid);
            }
        }
        static aldSen_XYXZS_dEvent(event, data) {
            var eventName = event;
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window["wx"].aldSendEvent(eventName, data);
            }
            else if (Laya.Browser.onQQMiniGame) {
                Laya.Browser.window["qq"].aldSendEvent(eventName, data);
            }
        }
        static aldSend_XYXZS_ReportAdClickSuccess(data) {
            var type = ALDEv_XYXZS_entDef.ReportA_XYXZS_dClickSuccess + " " + data.title + ":" + String(data.appid);
            A_XYXZS_LD.aldSen_XYXZS_dEvent(type, {
                "导出成功": data.title + ":" + String(data.appid)
            });
        }
        static aldSend_XYXZS_ReportAdClickFail(data) {
            var type = ALDEv_XYXZS_entDef.ReportAd_XYXZS_ClickFail + " " + data.title + ":" + String(data.appid);
            A_XYXZS_LD.aldSen_XYXZS_dEvent(type, {
                "导出失败": data.title + ":" + String(data.appid)
            });
        }
        static aldSendRe_XYXZS_portLaunchOptions(sceneid, ip, location) {
            var type = ALDEv_XYXZS_entDef.ReportLau_XYXZS_nchOptions;
            A_XYXZS_LD.aldSen_XYXZS_dEvent(type, {
                "场景值：": String(sceneid),
                "Ip：": String(ip),
                "地区：": JSON.stringify(location)
            });
        }
    }

    class Stor_XYXZS_ageReq {
        constructor() {
            this.k_XYXZS_ey = null;
            this.d_XYXZS_ata = {};
            this.su_XYXZS_ccess = null;
            this.f_XYXZS_ail = null;
            this.co_XYXZS_mplete = null;
        }
    }
    class Stora_XYXZS_geMgr {
        static setSt_XYXZS_orage(req) {
            let d_XYXZS_ataStr = JSON.stringify(req.d_XYXZS_ata);
            if (!Laya.Browser.onMiniGame) {
                Laya.LocalStorage.setItem(req.k_XYXZS_ey, d_XYXZS_ataStr);
                return;
            }
            wx.setStorage({
                key: req.k_XYXZS_ey,
                data: d_XYXZS_ataStr,
                success: req.su_XYXZS_ccess,
                fail: req.f_XYXZS_ail,
                complete: req.co_XYXZS_mplete
            });
        }
        static getS_XYXZS_torage(key) {
            var value = null;
            try {
                if (!Laya.Browser.onMiniGame) {
                    value = Laya.LocalStorage.getItem(key);
                }
                else {
                    value = wx.getStorageSync(key);
                }
            }
            catch (e) {
            }
            return value;
        }
    }

    var ToothStepType;
    (function (ToothStepType) {
        ToothStepType[ToothStepType["BraceTooth"] = 1] = "BraceTooth";
        ToothStepType[ToothStepType["CalculusTooth"] = 2] = "CalculusTooth";
        ToothStepType[ToothStepType["CutTooth"] = 3] = "CutTooth";
        ToothStepType[ToothStepType["FillingTooth"] = 4] = "FillingTooth";
        ToothStepType[ToothStepType["PaintTooth"] = 5] = "PaintTooth";
        ToothStepType[ToothStepType["PullTooth"] = 6] = "PullTooth";
    })(ToothStepType || (ToothStepType = {}));
    var HandlerState;
    (function (HandlerState) {
        HandlerState[HandlerState["Normal"] = 1] = "Normal";
        HandlerState[HandlerState["PullingTooth"] = 2] = "PullingTooth";
        HandlerState[HandlerState["SwitchingAni"] = 3] = "SwitchingAni";
    })(HandlerState || (HandlerState = {}));
    var HandlerType;
    (function (HandlerType) {
        HandlerType[HandlerType["PointedHandler"] = 1] = "PointedHandler";
        HandlerType[HandlerType["NozzleHandler"] = 2] = "NozzleHandler";
        HandlerType[HandlerType["TweezersHandler"] = 3] = "TweezersHandler";
        HandlerType[HandlerType["PincersHandler"] = 4] = "PincersHandler";
    })(HandlerType || (HandlerType = {}));

    class BaseTooth extends Laya.Script3D {
        constructor() {
            super();
            this._jawPostion = 0;
            this._toothIndex = 0;
            this._toothActive = false;
            this._isCleanned = false;
            this._controlDistance = 1;
            this._controlTimer = 0;
        }
        onAwake() {
            this._ownerSp3D = this.owner;
            this._ctrLoc = this.owner.getChildByName("CtrLoc");
            this.InitTooth();
        }
        InitTooth() {
        }
        onStart() {
        }
        onToothUpdate(handle, arg) {
            if (this._isCleanned) {
                return true;
            }
            let totalDis = Laya.Vector3.distanceSquared(this._ownerSp3D.transform.position, handle.transform.position);
            if (totalDis > 2) {
                this._controlTimer = 0;
                return false;
            }
            else {
                if (this._controlTimer < 1000) {
                    this._controlTimer += Laya.timer.delta;
                }
                this._controlDistance = 1 + (this._controlTimer / 1000) * 2;
            }
        }
    }

    class Uti_XYXZS_lit {
        static Le_XYXZS_rp(form, to, delta) {
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
        static lerpEu_XYXZS_lerAngle(form, to, delta) {
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
            var next = Uti_XYXZS_lit.Le_XYXZS_rp(form, to, delta);
            return next;
        }
        static getRota_XYXZS_tionByDir(v) {
            var dotValue = (v.x * Uti_XYXZS_lit.poi_XYXZS_nDown.x) + (v.y * Uti_XYXZS_lit.poi_XYXZS_nDown.y);
            var cos = dotValue / (v.distance(0, 0) * Uti_XYXZS_lit.poi_XYXZS_nDown.distance(0, 0));
            var radian = Math.acos(cos);
            var rotation = radian / (2 * Math.PI) * 360;
            if (v.x < 0) {
                rotation = -rotation;
            }
            return rotation;
        }
        static getRotat_XYXZS_ionByDirOn3DSpace(v) {
            var dotValue = (v.x * Uti_XYXZS_lit.poi_XYXZS_nUp.x) + (v.y * Uti_XYXZS_lit.poi_XYXZS_nUp.y);
            var cos = dotValue / (v.distance(0, 0) * Uti_XYXZS_lit.poi_XYXZS_nUp.distance(0, 0));
            var radian = Math.acos(cos);
            var rotation = radian / (2 * Math.PI) * 360;
            if (v.x < 0) {
                rotation = rotation + (180 - rotation) * 2;
            }
            return rotation;
        }
        static getDirBy_XYXZS_Rotation(rotation) {
            var radian = (rotation - 90) * Math.PI / 180;
            var x = Math.cos(radian);
            var y = Math.sin(radian);
            var point = new Laya.Point(x, y);
            point.normalize();
            return point;
        }
        static getDi_XYXZS_rDirAngle(dir1, dir2) {
            var dotValue = (dir1.x * dir2.x) + (dir1.y * dir2.y);
            var cos = dotValue / (dir1.distance(0, 0) * dir2.distance(0, 0));
            var radian = Math.acos(cos);
            var angle = radian / (2 * Math.PI) * 360;
            return angle;
        }
        static getDirSc_XYXZS_alarLength(dir) {
            var sl = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
            return sl;
        }
        static setSpOnPare_XYXZS_ntCenter(sp) {
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
        static getPointTo_XYXZS_LineDistance(x, y, LineStart, LineEnd) {
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
        static isIp_XYXZS_honeX() {
            if (!Laya.Browser.onIPhone)
                return false;
            if ((Laya.Browser.width == 2436 && Laya.Browser.height == 1125)
                || (Laya.Browser.height == 2436 && Laya.Browser.width == 1125)) {
                return true;
            }
            return false;
        }
        static isI_XYXZS_phone() {
            return Laya.Browser.onIPhone;
        }
        static getC_XYXZS_hild(node, name) {
            for (var i = 0; i < node.numChildren; ++i) {
                var child = node.getChildAt(i);
                if (child.name == name) {
                    return child;
                }
                else {
                    var target = Uti_XYXZS_lit.getC_XYXZS_hild(child, name);
                    if (target)
                        return target;
                }
            }
            return null;
        }
        static for_XYXZS_EachChild(node, each) {
            for (let i = 0; i < node.numChildren; ++i) {
                let child = node.getChildAt(i);
                each(child);
                Uti_XYXZS_lit.for_XYXZS_EachChild(child, each);
            }
        }
    }
    Uti_XYXZS_lit.OriginSt_XYXZS_ageWidth = 1334;
    Uti_XYXZS_lit.OriginSt_XYXZS_ageHeight = 750;
    Uti_XYXZS_lit.grays_XYXZS_caleMat = [0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0, 0, 0, 1, 0];
    Uti_XYXZS_lit.grays_XYXZS_caleFilter = new Laya.ColorFilter(Uti_XYXZS_lit.grays_XYXZS_caleMat);
    Uti_XYXZS_lit.poi_XYXZS_nDown = new Laya.Point(0, -1);
    Uti_XYXZS_lit.poi_XYXZS_nUp = new Laya.Point(0, 1);

    class CalculusThooth extends BaseTooth {
        constructor() {
            super();
            this._calculsPieceList = [];
            this._tweenPieceList = [];
            this._time = 0;
            this._ctrTimer = 0;
        }
        onAwake() {
            super.onAwake();
        }
        InitTooth() {
            this._currentToothParent = this._ownerSp3D.getChildByName("CalculusThooth");
            this._calculToothPieceParent = this._currentToothParent.getChildByName("yagou");
            this._finishSp = this._currentToothParent.getChildByName("ya");
            this._finishSpMat = this._finishSp.getChildAt(0).meshRenderer.material;
            for (let index = 0; index < this._calculToothPieceParent.numChildren; index++) {
                const element = this._calculToothPieceParent.getChildAt(index);
                this._calculsPieceList.push(element);
            }
            for (let index = 0; index < this._calculsPieceList.length; index++) {
                const piece = this._calculsPieceList[index];
                let rd = Math.random();
                if ((Uti_XYXZS_lit.isI_XYXZS_phone && rd < 0.3) || (!Uti_XYXZS_lit.isI_XYXZS_phone && rd < 0.1)) {
                    this._calculsPieceList.splice(index, 1);
                    piece.destroy();
                    index--;
                }
            }
        }
        onStart() {
            this.ResetToothState();
        }
        ResetToothState() {
            for (let index = 0; index < this._ownerSp3D.numChildren; index++) {
                const tooth = this._ownerSp3D.getChildAt(index);
                if (tooth != this._currentToothParent) {
                    if (tooth.name == "BraceTooth" || tooth.name == "PaintTooth" || tooth.name == "CtrLoc") {
                        tooth.active = false;
                    }
                    else {
                        this._ownerSp3D.removeChild(tooth);
                        tooth.destroy();
                        index--;
                    }
                }
                else {
                    tooth.active = true;
                }
            }
        }
        onToothUpdate(handle) {
            this._currentToothParent.active = true;
            if (!this._isCleanned) {
                this._time += Laya.timer.delta;
                this._finishSpMat.albedoColorR = 0.8 + (Math.sin(this._time / 200)) * 0.2;
                this._finishSpMat.albedoColorG = 0.8 + (Math.sin(this._time / 200)) * 0.2;
                this._finishSpMat.albedoColorB = 0.8 + (Math.sin(this._time / 200)) * 0.2;
            }
            if (super.onToothUpdate(handle))
                return true;
            if (Laya.Vector3.distanceSquared(handle.transform.position, this._ctrLoc.transform.position) > 0.5) {
                this._ctrTimer = 0;
                return false;
            }
            if (this._ctrTimer < 200) {
                this._ctrTimer += Laya.timer.delta;
                return;
            }
            for (let index = 0; index < this._calculsPieceList.length; index++) {
                let piece = this._calculsPieceList[index];
                if (piece == null || piece.transform == null || !piece.active)
                    continue;
                let distance = Laya.Vector3.distanceSquared(handle.transform.position, piece.transform.position);
                if (distance < 0.05 * this._controlDistance) {
                    this._calculsPieceList.splice(index, 1);
                    this._tweenPieceList.push(piece);
                    handle.event("ShowEffect", "CalculusTooth");
                    index--;
                }
            }
            if (this._calculsPieceList.length <= 30) {
                for (let index = 0; index < this._calculsPieceList.length; index++) {
                    const piece = this._calculsPieceList[index];
                    this._calculsPieceList.splice(index, 1);
                    this._tweenPieceList.push(piece);
                    index--;
                }
            }
            this._isCleanned = this._calculsPieceList.length <= 0;
            if (this._isCleanned) {
                this._finishSpMat.albedoColor = new Laya.Vector4(1, 1, 1, 1);
                this._currentToothParent.transform.localScale = new Laya.Vector3(0.9999, 0.9999, 0.9999);
                return true;
            }
            return false;
        }
        onUpdate() {
            let count = 0;
            for (let index = 0; index < this._tweenPieceList.length; index++) {
                let tweenToothPiece = this._tweenPieceList[index];
                let trans = tweenToothPiece.transform;
                let twY = 5;
                let twZ = -7;
                let twX = 1 - Math.random() * 2;
                if (this._ownerSp3D.parent.name == "TopJaw") {
                    twY = -10;
                    twZ = -2;
                }
                Laya.Tween.to(trans, { localPositionX: twX, localPositionY: twY, localPositionZ: twZ, localRotationEulerX: Math.random() * 5, localRotationEulerY: Math.random() * 5, localRotationEulerZ: Math.random() * 5 }, 1000, null, Laya.Handler.create(tweenToothPiece, () => {
                    tweenToothPiece.destroy();
                }));
                this._tweenPieceList.splice(index, 1);
                index--;
                count++;
            }
        }
    }

    class BraceTooth extends BaseTooth {
        constructor() {
            super();
            this._cubeMaterialTimer = 0;
            this._bracerTimer = 0;
        }
        onAwake() {
            super.onAwake();
        }
        InitTooth() {
            this._currentToothParent = this._ownerSp3D.getChildByName("BraceTooth");
            this._cube = this._currentToothParent.getChildByName("Cube");
            this._cubeMaterial = this._cube.meshRenderer.material;
            this._bracer = this._currentToothParent.getChildByName("Bracer");
            for (let index = 0; index < this._ownerSp3D.numChildren; index++) {
                const tooth = this._ownerSp3D.getChildAt(index);
                if (tooth != this._currentToothParent) {
                    if (tooth.name == "CalculusThooth" || tooth.name == "FillTooth" || tooth.name == "CtrLoc") {
                        tooth.active = false;
                    }
                    else {
                        this._ownerSp3D.removeChild(tooth);
                        index--;
                        tooth.destroy();
                    }
                }
                else {
                    this._bracer.active = false;
                    this._cubeMaterial.albedoColorA = 0;
                    tooth.active = true;
                }
            }
        }
        onToothUpdate(handle) {
            this._currentToothParent.active = true;
            if (super.onToothUpdate(handle))
                return true;
            this._cubeMaterialTimer += (Laya.timer.delta / 200);
            this._cubeMaterial.albedoColorA = Math.sin(this._cubeMaterialTimer);
            let distance = Laya.Vector3.distanceSquared(handle.transform.position, this._cube.transform.position);
            if (Laya.Vector3.distanceSquared(handle.transform.position, this._ctrLoc.transform.position) > 0.5) {
                return false;
            }
            if (distance < 0.05 * this._controlDistance) {
                this._cube.active = false;
                this._bracer.active = true;
                handle.event("SwitchAni");
                handle.event("ShowEffect", "BraceTooth");
                this._isCleanned = true;
            }
            return false;
        }
    }

    class FillingTooth extends BaseTooth {
        constructor() {
            super();
            this._fillHoleList = [];
            this._time = 0;
        }
        onAwake() {
            super.onAwake();
        }
        InitTooth() {
            this._currentToothParent = this._ownerSp3D.getChildByName("FillTooth");
            this._fillHoleParent = this._currentToothParent.getChildByName("buya");
            for (let index = 0; index < this._fillHoleParent.numChildren; index++) {
                const fill = this._fillHoleParent.getChildAt(index);
                this._fillHoleList.push(fill);
            }
            this._fillTooth = this._currentToothParent.getChildByName("yadong");
            this._fillSpMat = this._fillTooth.getChildAt(0).meshRenderer.material;
            this._finishSp = this._currentToothParent.getChildByName("ya");
            this._normalMat = this._finishSp.getChildAt(0).meshRenderer.material;
        }
        onStart() {
            this.ResetToothState();
        }
        ResetToothState() {
            for (let index = 0; index < this._ownerSp3D.numChildren; index++) {
                const tooth = this._ownerSp3D.getChildAt(index);
                if (tooth != this._currentToothParent) {
                    if (tooth.name == "BraceTooth" || tooth.name == "PaintTooth" || tooth.name == "CtrLoc") {
                        tooth.active = false;
                    }
                    else {
                        this._ownerSp3D.removeChild(tooth);
                        tooth.destroy();
                        index--;
                    }
                }
            }
            this._currentToothParent.active = true;
            this._fillTooth.active = true;
            this._finishSp.active = false;
        }
        onToothUpdate(handle) {
            if (!this._isCleanned) {
                this._time += Laya.timer.delta;
                this._fillSpMat.albedoColorR = 0.8 + (Math.sin(this._time / 200)) * 0.2;
                this._fillSpMat.albedoColorG = 0.8 + (Math.sin(this._time / 200)) * 0.2;
                this._fillSpMat.albedoColorB = 0.8 + (Math.sin(this._time / 200)) * 0.2;
            }
            if (super.onToothUpdate(handle))
                return true;
            if (Laya.Vector3.distanceSquared(handle.transform.position, this._ctrLoc.transform.position) > 0.5) {
                return false;
            }
            let fillCount = 0;
            for (let index = 0; index < this._fillHoleList.length; index++) {
                let piece = this._fillHoleList[index];
                let distance = Laya.Vector3.distanceSquared(handle.transform.position, piece.transform.position);
                if (distance < 0.07 * this._controlDistance) {
                    let litterBall = piece.getChildAt(0);
                    if (litterBall.transform.localScaleX >= 7) {
                        fillCount++;
                    }
                    else {
                        let scale = litterBall.transform.localScaleX;
                        handle.event("ShowEffect", "FillingTooth");
                        scale += 0.1;
                        litterBall.transform.localScaleX = scale;
                        litterBall.transform.localScaleY = scale;
                        litterBall.transform.localScaleZ = scale;
                    }
                }
            }
            this._isCleanned = fillCount >= 3;
            if (this._isCleanned) {
                this._fillTooth.active = false;
                this._finishSp.active = true;
                this._currentToothParent.transform.localScale = new Laya.Vector3(0.9999, 0.9999, 0.9999);
            }
            return false;
        }
        onUpdate() {
        }
    }

    class PaintTooth extends BaseTooth {
        constructor() {
            super();
            this._paintPieceList = [];
            this._tweenPieceList = [];
        }
        onAwake() {
            super.onAwake();
        }
        InitTooth() {
            this._currentToothParent = this._ownerSp3D.getChildByName("PaintTooth");
            this._paintTooth = this._currentToothParent.getChildByName("yagou");
            this._finishSp = this._currentToothParent.getChildByName("ya");
            this._finishSpMat = this._finishSp.meshRenderer.material;
            for (let index = 0; index < this._paintTooth.numChildren; index++) {
                const element = this._paintTooth.getChildAt(index);
                this._paintPieceList.push(element);
            }
            for (let index = 0; index < this._ownerSp3D.numChildren; index++) {
                const tooth = this._ownerSp3D.getChildAt(index);
                if (tooth != this._currentToothParent) {
                    if (tooth.name == "CalculusThooth" || tooth.name == "FillTooth" || tooth.name == "CtrLoc") {
                        tooth.active = false;
                    }
                    else {
                        this._ownerSp3D.removeChild(tooth);
                        tooth.destroy();
                        index--;
                    }
                }
                else {
                    this._finishSp.active = true;
                    this._paintTooth.active = false;
                }
            }
        }
        onToothUpdate(handle) {
            this._currentToothParent.active = true;
            this._paintTooth.active = true;
            if (super.onToothUpdate(handle))
                return true;
            if (Laya.Vector3.distanceSquared(handle.transform.position, this._ctrLoc.transform.position) > 0.5) {
                return false;
            }
            for (let index = 0; index < this._paintPieceList.length; index++) {
                let piece = this._paintPieceList[index];
                if (piece == null || piece.transform == null || !piece.active)
                    continue;
                let distance = Laya.Vector3.distanceSquared(handle.transform.position, piece.transform.position);
                if (distance < 0.05 * this._controlDistance) {
                    this._paintPieceList.splice(index, 1);
                    this._tweenPieceList.push(piece);
                    handle.event("ShowEffect", "PaintTooth");
                    index--;
                }
            }
            if (this._paintPieceList.length <= 35) {
                for (let index = 0; index < this._paintPieceList.length; index++) {
                    const piece = this._paintPieceList[index];
                    this._paintPieceList.splice(index, 1);
                    this._tweenPieceList.push(piece);
                    index--;
                }
            }
            this._isCleanned = this._paintPieceList.length <= 0;
            if (this._isCleanned) {
                return true;
            }
            return false;
        }
        onUpdate() {
            let count = 0;
            for (let index = 0; index < this._tweenPieceList.length; index++) {
                if (count > 5)
                    return;
                let tweenToothPiece = this._tweenPieceList[index];
                let mat = tweenToothPiece.meshRenderer.material;
                let trans = tweenToothPiece.transform;
                Laya.Tween.to(mat, { albedoColorR: 1, albedoColorG: 0.768, albedoColorB: 0.141 }, 500);
                Laya.Tween.from(trans, { localPositionZ: -0.3 }, 500);
                this._tweenPieceList.splice(index, 1);
                index--;
                count++;
            }
        }
    }

    class PullTooth extends BaseTooth {
        constructor() {
            super();
            this._pullMaterialTimer = 0;
            this._pulling = false;
        }
        onAwake() {
            super.onAwake();
        }
        InitTooth() {
            this._currentToothParent = this._ownerSp3D.getChildByName("PullTooth");
            for (let index = 0; index < this._ownerSp3D.numChildren; index++) {
                const tooth = this._ownerSp3D.getChildAt(index);
                if (tooth != this._currentToothParent && tooth.name != "CtrLoc") {
                    this._ownerSp3D.removeChild(tooth);
                    tooth.destroy();
                    index--;
                }
            }
            this._pullTooth = this._currentToothParent.getChildByName("ya");
            this._pullLoc = this._currentToothParent.getChildByName("PullLoc");
            this._pullToothMaterial = this._pullTooth.meshRenderer.material;
            this._pullToothMaterialV4Orignal = this._pullToothMaterial.albedoColor.clone();
            this._pullToothMaterial.albedoColor = new Laya.Vector4(0.2, 0.2, 0.2, 1);
        }
        onToothUpdate(handle, arg) {
            if (super.onToothUpdate(handle))
                return true;
            if (!this._pulling) {
                let distance = Laya.Vector3.distanceSquared(handle.transform.position, this._pullLoc.transform.position);
                if (distance < 0.1) {
                    this._pulling = true;
                    handle.event("PullingTooth", this._pullLoc.transform);
                }
                else {
                    this._pullMaterialTimer += (Laya.timer.delta / 200);
                    let target = 0.2 + (Math.sin(this._pullMaterialTimer) * 0.05);
                    this._pullToothMaterial.albedoColor = new Laya.Vector4(target, target, target, 1);
                }
            }
            else {
                let PincersHandler = handle.getChildByName("HandlerMeshs").getChildByName("PincersHandler");
                let localTrans = PincersHandler.transform.localPosition.clone();
                if (!arg.upJaw) {
                    localTrans.y *= -1;
                    localTrans.x *= -1;
                }
                if (arg.progress >= 0 && arg.progress < 1) {
                    handle.event("ShowEffect", "PullTooth1");
                    this._pullTooth.transform.localPosition = localTrans;
                }
                else if (arg.progress >= 1 && arg.progress < 1.01) {
                    handle.event("ShowEffect", "PullTooth2");
                    this._pullTooth.transform.localPosition = localTrans;
                }
                else if (arg.progress >= 1.01 && arg.progress < 1.02) {
                    this._pullToothMaterial.albedoColor = this._pullToothMaterialV4Orignal;
                    this._pullTooth.transform.localPosition = localTrans;
                }
                else if (arg.progress >= 1.02 && arg.progress < 2) {
                    this._pullToothMaterial.albedoColor = this._pullToothMaterialV4Orignal;
                    this._pullTooth.transform.localPosition = localTrans;
                }
                else if (arg.progress >= 2) {
                    this._pullTooth.transform.localPosition = new Laya.Vector3(0, 0, 0);
                    this._isCleanned = true;
                }
            }
        }
    }

    class CutTooth extends BaseTooth {
        constructor() {
            super();
            this._cutPieceList = [];
            this._tweenPieceList = [];
            this._time = 0;
            this._ctrTimer = 0;
        }
        onAwake() {
            super.onAwake();
        }
        InitTooth() {
            this._currentToothParent = this._ownerSp3D.getChildByName("CutTooth");
            this._cutTooth = this._currentToothParent.getChildByName("zuanya");
            this._finishSp = this._currentToothParent.getChildByName("ya");
            this._finishSpMat = this._finishSp.meshRenderer.material;
            for (let index = 0; index < this._cutTooth.numChildren; index++) {
                const element = this._cutTooth.getChildAt(index);
                this._cutPieceList.push(element);
            }
        }
        onStart() {
            this.ResetToothState();
        }
        ResetToothState() {
            for (let index = 0; index < this._ownerSp3D.numChildren; index++) {
                const tooth = this._ownerSp3D.getChildAt(index);
                if (tooth != this._currentToothParent && tooth.name != "CtrLoc") {
                    this._ownerSp3D.removeChild(tooth);
                    tooth.destroy();
                    index--;
                }
            }
        }
        onToothUpdate(handle) {
            if (!this._isCleanned) {
                this._time += Laya.timer.delta;
                this._finishSpMat.albedoColorR = 0.8 + (Math.sin(this._time / 200)) * 0.2;
                this._finishSpMat.albedoColorG = 0.8 + (Math.sin(this._time / 200)) * 0.2;
                this._finishSpMat.albedoColorB = 0.8 + (Math.sin(this._time / 200)) * 0.2;
            }
            if (super.onToothUpdate(handle))
                return true;
            if (Laya.Vector3.distanceSquared(handle.transform.position, this._ctrLoc.transform.position) > 0.5) {
                this._ctrTimer = 0;
                return false;
            }
            if (this._ctrTimer < 200) {
                this._ctrTimer += Laya.timer.delta;
                return;
            }
            for (let index = 0; index < this._cutPieceList.length; index++) {
                let piece = this._cutPieceList[index];
                if (piece == null || piece.transform == null || !piece.active)
                    continue;
                let distance = Laya.Vector3.distanceSquared(handle.transform.position, piece.transform.position);
                if (distance < 0.05 * this._controlDistance) {
                    this._cutPieceList.splice(index, 1);
                    this._tweenPieceList.push(piece);
                    handle.event("ShowEffect", "CutTooth");
                    index--;
                }
            }
            if (this._cutPieceList.length <= 10) {
                for (let index = 0; index < this._cutPieceList.length; index++) {
                    const piece = this._cutPieceList[index];
                    this._cutPieceList.splice(index, 1);
                    this._tweenPieceList.push(piece);
                    index--;
                }
            }
            this._isCleanned = this._cutPieceList.length <= 0 && this._tweenPieceList.length <= 0;
            if (this._isCleanned) {
                this._finishSpMat.albedoColor = new Laya.Vector4(1, 1, 1, 1);
                this._currentToothParent.transform.localScale = new Laya.Vector3(0.999, 0.999, 0.999);
                return true;
            }
            return false;
        }
        onUpdate() {
            let count = 0;
            for (let index = 0; index < this._tweenPieceList.length; index++) {
                if (count > 5)
                    return;
                let tweenToothPiece = this._tweenPieceList[index];
                let trans = tweenToothPiece.transform;
                let twY = 5;
                let twZ = -7;
                let twX = 1 - Math.random() * 2;
                if (this._ownerSp3D.parent.name == "TopJaw") {
                    twY = -10;
                    twZ = -2;
                }
                Laya.Tween.to(trans, { localPositionX: twX, localPositionY: twY, localPositionZ: twZ, localRotationEulerX: Math.random() * 5, localRotationEulerY: Math.random() * 5, localRotationEulerZ: Math.random() * 5 }, 1000, null, Laya.Handler.create(tweenToothPiece, () => {
                    tweenToothPiece.destroy();
                }));
                this._tweenPieceList.splice(index, 1);
                index--;
                count++;
            }
        }
    }

    class CleanToothStep extends Laya.Script3D {
        constructor() {
            super();
            this._isActive = false;
            this._toothList = [];
            this._toothSp3DList = [];
            this._cleanedToothCount = 0;
        }
        get ToothStepType() {
            return this._toothStepType;
        }
        get ToothList() {
            return this._toothList;
        }
        get ToothCount() {
            return this._toothList.length;
        }
        get CleandToothCount() {
            return this._cleanedToothCount;
        }
        onToothStepUpdate(handler, arg) {
            let updateResult = true;
            this._cleanedToothCount = 0;
            for (let index = 0; index < this._toothList.length; index++) {
                const toothScript = this._toothList[index];
                let tempResult = toothScript.onToothUpdate(handler, arg);
                if (!tempResult) {
                    updateResult = false;
                }
                else {
                    this._cleanedToothCount++;
                }
            }
            return updateResult;
        }
        SetTooth(toothArray, toothStep) {
            this._toothStepType = toothStep;
            this._toothSp3DList = toothArray;
            for (let index = 0; index < toothArray.length; index++) {
                const tooth = toothArray[index];
                let toothScript = null;
                switch (this._toothStepType) {
                    case ToothStepType.CalculusTooth:
                        toothScript = tooth.addComponent(CalculusThooth);
                        break;
                    case ToothStepType.BraceTooth:
                        toothScript = tooth.addComponent(BraceTooth);
                        break;
                    case ToothStepType.FillingTooth:
                        toothScript = tooth.addComponent(FillingTooth);
                        break;
                    case ToothStepType.PaintTooth:
                        toothScript = tooth.addComponent(PaintTooth);
                        break;
                    case ToothStepType.PullTooth:
                        toothScript = tooth.addComponent(PullTooth);
                        break;
                    case ToothStepType.CutTooth:
                        toothScript = tooth.addComponent(CutTooth);
                        break;
                    default:
                        break;
                }
                this._toothList.push(toothScript);
            }
        }
    }

    class NativeCallback {
        static onVideoFail() {
            console.debug("onVideoFail --------- ------------ ");
            Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.RewardVideoFail);
        }
        static onVideoSuccess(reward) {
            console.debug("onVideoSuccess    --------- ------------ ");
            Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.RewardVideoSuccess, reward);
        }
        static onInsertVideoEnd() {
            console.debug("onInsertVideoEnd    --------- ------------ ");
            Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.InsertVideoEnd);
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
    NativeCallback.NowVideoType = "";
    NativeCallback.conchIOS = "Conch-ios";
    NativeCallback.conchAndroid = "Conch-android";
    NativeCallback.os = "";

    class Vibr_XYXZS_ateMgr {
        static vibr_XYXZS_ateShort() {
            if (!Vibr_XYXZS_ateMgr.isE_XYXZS_nable)
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
        static ibra_XYXZS_teLong() {
            if (!Vibr_XYXZS_ateMgr.isE_XYXZS_nable)
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
        static vibr_XYXZS_ate(time) {
            if (!Vibr_XYXZS_ateMgr.isE_XYXZS_nable)
                return;
            if (Laya.Browser.onMiniGame) {
                let count = time / 15;
                let index = 0;
                let obj = { count: count, index: index };
                Laya.timer.loop(16, obj, function () {
                    Vibr_XYXZS_ateMgr.vibr_XYXZS_ateShort();
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
                    Vibr_XYXZS_ateMgr.vibr_XYXZS_ateShort();
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
                    Vibr_XYXZS_ateMgr.vibr_XYXZS_ateShort();
                    index++;
                    if (index > count) {
                        Laya.timer.clearAll(obj);
                    }
                });
            }
        }
    }
    Vibr_XYXZS_ateMgr.isE_XYXZS_nable = true;

    class Sou_XYXZS_ndMgr {
        constructor() {
            this._en_XYXZS_abled = true;
        }
        get Enab_XYXZS_led() {
            return this._en_XYXZS_abled;
        }
        set Enab_XYXZS_led(e) {
            if (!e) {
                this.stop_XYXZS_BGM();
            }
            this._en_XYXZS_abled = e;
        }
        getS_XYXZS_oundUrl(name) {
            let url = Sou_XYXZS_ndMgr.sound_XYXZS_ResPath + name + ".ogg";
            return url;
        }
        play_XYXZS_Sound(name) {
            if (!this._en_XYXZS_abled)
                return;
            var url = this.getS_XYXZS_oundUrl(name);
            if (Laya.Browser.onMiniGame) {
                var sound = Laya.Pool.getItem(name);
                if (sound == null) {
                    sound = wx.createInnerAudioContext();
                    sound.src = Sou_XYXZS_ndMgr.sound_XYXZS_ResPath + name + ".ogg";
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
        play_XYXZS_BGM(name) {
            if (!this._en_XYXZS_abled)
                return;
            let url = this.getS_XYXZS_oundUrl(name);
            if (Laya.Browser.onMiniGame) {
                if (!this.b_XYXZS_gm) {
                    this.b_XYXZS_gm = wx.createInnerAudioContext();
                }
                this.b_XYXZS_gm.pause();
                this.b_XYXZS_gm.src = url;
                this.b_XYXZS_gm.loop = true;
                this.b_XYXZS_gm.play();
            }
            else {
                Laya.SoundManager.playMusic(url, 0);
            }
        }
        stop_XYXZS_BGM() {
            if (Laya.Browser.onMiniGame) {
                if (this.b_XYXZS_gm) {
                    this.b_XYXZS_gm.pause();
                }
            }
            else {
                Laya.SoundManager.stopMusic();
            }
        }
    }
    Sou_XYXZS_ndMgr.sound_XYXZS_ResPath = "subRes/sound/";
    Sou_XYXZS_ndMgr.ins_XYXZS_tance = new Sou_XYXZS_ndMgr();

    class Handler extends Laya.Script3D {
        constructor() {
            super();
            this._cameraCurRotate = 0;
            this._cameraCurUpDownOffset = 0;
            this._cameraLockRotate = 0;
            this._cameraCurOffset = new Laya.Vector3();
            this._handleCurRotate = 0;
            this._handleCurUpCurDownOffset = 0;
            this._handleCurOffset = new Laya.Vector3();
            this._cleanEffectTimer = 0;
            this._aniTimer = 0;
            this._isGameOver = false;
            this._soundTimer = 0;
            this._startMoveTimer = 0;
            this._enableInput = false;
            this._pullingProgress = 0;
        }
        ;
        get Sprite3D() {
            return this._handlerSp;
        }
        onAwake() {
            this._scene = SceneManager.Instance.CurrentScene;
            this._tongueAni = this._scene.getChildByName("Face").getChildByName("Toung").getComponent(Laya.Animator);
            this._tonsilAni = this._scene.getChildByName("Face").getChildByName("Tonsil").getComponent(Laya.Animator);
            this._gameOverEffect = this._scene.getChildByName("Effect");
            this._gameOverEffect.active = false;
            this._handlerSp = this.owner;
            this._cameraCenter = this._scene.getChildByName("CameraCenter");
            this._camera = this._scene.getChildByName("Main Camera");
            this._handlerMeshs = this._handlerSp.getChildByName("HandlerMeshs");
            this._pointedHandlerSp3D = this._handlerMeshs.getChildByName("PointedHandler");
            this._pincersHandlerSp3d = this._handlerMeshs.getChildByName("PincersHandler");
            this._tweezersHandlerSp3d = this._handlerMeshs.getChildByName("TweezersHandler");
            this._nozzleHandlerSp3d = this._handlerMeshs.getChildByName("NozzleHandler");
            this._pointedHandlerSp3D.active = false;
            this._pincersHandlerSp3d.active = false;
            this._pincersHandlerAni = this._pincersHandlerSp3d.getComponent(Laya.Animator);
            this._pincersHandlerAni.play("Idle");
            this._tweezersHandlerSp3d.active = false;
            this._nozzleHandlerSp3d.active = false;
            this._camera.transform.position = new Laya.Vector3(0, 0, 0);
            this._handlerSp.transform.position = new Laya.Vector3(0, 0, 0);
            Laya.Vector3.add(this._cameraCenter.transform.position, SceneManager.CameraOrigOffset, this._camera.transform.position);
            Laya.Vector3.add(this._cameraCenter.transform.position, SceneManager.HandleOrigOffset, this._handlerSp.transform.position);
            this._camera.transform.position = this._camera.transform.position;
            this._handlerSp.transform.position = this._handlerSp.transform.position;
            this._cameraCurOffset = SceneManager.CameraOrigOffset.clone();
            this._handleCurOffset = SceneManager.HandleOrigOffset.clone();
            this._handlerSp.on("SwitchAni", this, this.SwitchOutIn);
            this._handlerSp.on("PullingTooth", this, this.ClippingTooth);
            this._handlerSp.on("ShowEffect", this, this.ShowEffect);
        }
        onStart() {
            Laya.timer.once(500, this, () => {
                this.Input(0, 0);
            });
        }
        SetHandlerType(handerType, toothName) {
            this._handlerType = handerType;
            this.SwitchHandler(toothName);
        }
        onUpdate() {
            this.SetHandlerMove();
            this.UpdateEffect();
            this.UpdateCamere();
        }
        StartGameMove() {
            this._cameraLockRotate = 60;
            Laya.timer.once(1000, this, () => {
                this._cameraLockRotate = -60;
            });
            Laya.timer.once(2000, this, () => {
                this._cameraLockRotate = 0;
                this._enableInput = true;
            });
        }
        UpdateEffect() {
            if (this._cleanEffect == null) {
                this._cleanEffectTimer = 0;
            }
            else {
                if (this._cleanEffectTimer < 150) {
                    this._cleanEffectTimer += Laya.timer.delta;
                    this._cleanEffect.active = true;
                }
                else {
                    this._cleanEffect.active = false;
                    this;
                }
            }
            if (this._aniTimer < 500) {
                this._aniTimer += Laya.timer.delta;
                this._tongueAni.speed = 1;
                this._tonsilAni.speed = 1;
            }
            else {
                this._tongueAni.speed = 0;
                this._tonsilAni.speed = 0;
            }
            this._soundTimer += Laya.timer.delta;
        }
        UpdateCamere() {
            let speed = 0;
            if (this._cameraLockRotate > this._cameraCurRotate) {
                if (this._isGameOver || !this._enableInput) {
                    speed = Laya.timer.delta / 1000 * 180;
                }
                else {
                    speed = 1 + (this._cameraLockRotate - this._cameraCurRotate) * 0.05;
                }
                this._cameraCurRotate += speed;
                if (this._cameraLockRotate < this._cameraCurRotate) {
                    this._cameraCurRotate = this._cameraLockRotate;
                }
            }
            else if (this._cameraLockRotate < this._cameraCurRotate) {
                if (this._isGameOver || !this._enableInput) {
                    speed = Laya.timer.delta / 1000 * 180;
                }
                else {
                    speed = 1 + (this._cameraCurRotate - this._cameraLockRotate) * 0.05;
                }
                this._cameraCurRotate -= speed;
                if (this._cameraLockRotate > this._cameraCurRotate) {
                    this._cameraCurRotate = this._cameraLockRotate;
                }
            }
            this.SetPosByRotateAndOffset(this._cameraCurRotate, 0, SceneManager.CameraOrigOffset, this._cameraCurOffset);
            Laya.Vector3.add(this._cameraCenter.transform.position, this._cameraCurOffset, this._camera.transform.position);
            this._camera.transform.position = this._camera.transform.position;
            this._camera.transform.lookAt(this._cameraCenter.transform.position, new Laya.Vector3(0, 1, 0));
        }
        ShowEffect(effectName) {
            this._cleanEffectTimer = 0;
            this._aniTimer = 0;
            Vibr_XYXZS_ateMgr.vibr_XYXZS_ateShort();
            if (this._soundTimer > 30) {
                let rd = Math.random();
                if (effectName == "CalculusTooth") {
                    Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("除垢");
                    this._soundTimer = -1500;
                }
                else if (effectName == "PullTooth1") {
                    Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("拔牙夹住牙齿");
                    this._soundTimer = -1500;
                }
                else if (effectName == "PullTooth2") {
                    if (Math.random() < 0.3) {
                        Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("拔牙1");
                    }
                    if (Math.random() < 0.6) {
                        Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("拔牙2");
                    }
                    else {
                        Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("拔牙3");
                    }
                    this._soundTimer = -1000;
                }
                else if (effectName == "PaintTooth") {
                    Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("包金牙");
                    this._soundTimer = -1000;
                }
                else if (effectName == "FillingTooth") {
                    Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("虫牙补洞");
                    this._soundTimer = -800;
                }
                else if (effectName == "BraceTooth") {
                    if (rd < 0.5) {
                        Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("下牙支架链接2");
                    }
                    else {
                        Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("上牙支架链接1");
                    }
                }
                else if (effectName == "CutTooth") {
                    Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("磨牙和洗牙垢");
                    this._soundTimer = -1200;
                }
            }
        }
        PullingToothInputProgress(xInput, yInput) {
            if (this._pullingProgress < 1) {
                if (this._handleCurUpCurDownOffset > 0) {
                    if (yInput > 0) {
                        this._pullingProgress += 1 * yInput / 10;
                    }
                    else {
                        this._pullingProgress += -1 * yInput / 10;
                    }
                    this._currentHanderSp3D.transform.localPositionY = this._pullingProgress * -5;
                }
                else {
                    if (yInput < 0) {
                        this._pullingProgress += -1 * yInput / 10;
                    }
                    else {
                        this._pullingProgress += 1 * yInput / 10;
                    }
                    this._currentHanderSp3D.transform.localPositionY = this._pullingProgress * 5;
                }
            }
            if (this._pullingProgress > 0.18 && this._pullingProgress < 1) {
                this._pullingProgress = 1;
                this.PullToothOut();
            }
            if (this._pullingProgress >= 1.02) {
                if (this._handleCurUpCurDownOffset > 0) {
                    if (yInput < 0) {
                        this._pullingProgress += -1 * yInput / 10;
                    }
                    else {
                        this._pullingProgress += 1 * yInput / 10;
                    }
                    this._currentHanderSp3D.transform.localPositionY = (this._pullingProgress - 1.20) * 5;
                }
                else {
                    if (yInput > 0) {
                        this._pullingProgress += 1 * yInput / 10;
                    }
                    else {
                        this._pullingProgress += -1 * yInput / 10;
                    }
                    this._currentHanderSp3D.transform.localPositionY = (this._pullingProgress - 1.20) * -5;
                }
            }
            if (this._pullingProgress > 1.20) {
                this._pullingProgress = 2;
                this._currentHanderSp3D.transform.localPosition = new Laya.Vector3(0, 0, 0);
                Laya.timer.once(100, this, () => {
                    this._pullingProgress = 0;
                    this.SwitchOutIn();
                });
            }
        }
        PullToothOut() {
            this._handlerState = HandlerState.SwitchingAni;
            let moveLoc = 0;
            if (this._handleCurRotate > 0) {
                moveLoc = -5;
            }
            else {
                moveLoc = 5;
            }
            Laya.Tween.to(this._currentHanderSp3D.transform, { localPositionX: moveLoc, localPositionZ: -5 }, 500, null, Laya.Handler.create(this, () => {
                this._pullingProgress = 1.01;
                this.PullToothIn();
            }));
        }
        PullToothIn() {
            Laya.Tween.to(this._currentHanderSp3D.transform, { localPositionX: 0, localPositionZ: 0 }, 300, null, Laya.Handler.create(this, () => {
                this._pullingProgress = 1.02;
                this._handlerState = HandlerState.PullingTooth;
            }));
        }
        ClippingTooth(pullLocTrans) {
            this._handlerState = HandlerState.SwitchingAni;
            Laya.Tween.to(this._handlerSp.transform.position, { x: pullLocTrans.position.x, y: pullLocTrans.position.y, z: pullLocTrans.position.z }, 500);
            Laya.Tween.to(this._currentHanderSp3D.transform.localRotationEuler, { x: 0, y: 0, z: 0 }, 500);
            Laya.Tween.to(this._currentHanderSp3D.transform.localPosition, { x: 0, y: 0, z: 0 }, 500, null, Laya.Handler.create(this, this.PlayPincersAni));
        }
        PlayPincersAni() {
            this._pincersHandlerAni.play("Clipping");
            Laya.timer.once(600, this, () => {
                this._handlerState = HandlerState.PullingTooth;
            });
        }
        PullingToothSwitchAni() {
            let moveLoc = 0;
            if (this._handleCurRotate > 0) {
                moveLoc = -5;
            }
            else {
                moveLoc = 5;
            }
        }
        SwitchHandler(toothName) {
            this._toothName = toothName;
            if (this._currentHanderSp3D == null) {
                switch (this._handlerType) {
                    case HandlerType.PointedHandler:
                        this._currentHanderSp3D = this._pointedHandlerSp3D;
                        if (this._toothName == "CalculusTooth") {
                            this._cleanEffect = this._currentHanderSp3D.getChildByName("Xiya");
                            this._currentHanderSp3D.getChildByName("Zuanya").active = false;
                        }
                        else if (this._toothName == "CutTooth") {
                            this._cleanEffect = this._currentHanderSp3D.getChildByName("Zuanya");
                            this._currentHanderSp3D.getChildByName("Xiya").active = false;
                        }
                        else if (this._toothName == "FillingTooth") {
                            this._cleanEffect = this._currentHanderSp3D.getChildByName("Xiya");
                            this._currentHanderSp3D.getChildByName("Zuanya").active = false;
                        }
                        else {
                            this._cleanEffect = null;
                        }
                        if (this._cleanEffect != null) {
                            this._cleanEffect.active = false;
                        }
                        break;
                    case HandlerType.NozzleHandler:
                        this._currentHanderSp3D = this._nozzleHandlerSp3d;
                        this._cleanEffect = this._currentHanderSp3D.getChildByName("Effect");
                        this._cleanEffect.active = false;
                        break;
                    case HandlerType.TweezersHandler:
                        this._currentHanderSp3D = this._tweezersHandlerSp3d;
                        this._cleanEffect = null;
                        break;
                    case HandlerType.PincersHandler:
                        this._currentHanderSp3D = this._pincersHandlerSp3d;
                        this._cleanEffect = null;
                        break;
                }
                this.SwitchIn();
            }
            else {
                this.SwitchOutIn();
            }
        }
        GameOver() {
            this._handlerMeshs.active = false;
            this._handlerSp.getChildByName("Select").active = false;
            this._handlerState = HandlerState.SwitchingAni;
            this._cameraLockRotate = 0;
            this._isGameOver = true;
            Laya.Tween.to(this._camera, { fieldOfView: 70 }, 1000);
            Laya.timer.once(500, this, () => {
                this._gameOverEffect.active = true;
            });
        }
        SwitchOutIn() {
            this._handlerState = HandlerState.SwitchingAni;
            let moveLoc = 0;
            if (this._handleCurRotate > 0) {
                moveLoc = -5;
            }
            else {
                moveLoc = 5;
            }
            this._currentHanderSp3D.transform.localRotationEuler = new Laya.Vector3();
            Laya.Tween.to(this._currentHanderSp3D.transform, { localPositionX: moveLoc, localPositionZ: -5 }, 500, null, Laya.Handler.create(this, () => {
                this._currentHanderSp3D.transform.localPositionX = 0;
                this._currentHanderSp3D.transform.localPositionY = 0;
                this._currentHanderSp3D.transform.localPositionZ = 0;
                this._currentHanderSp3D.active = false;
                switch (this._handlerType) {
                    case HandlerType.PointedHandler:
                        this._currentHanderSp3D = this._pointedHandlerSp3D;
                        if (this._toothName == "CalculusTooth") {
                            this._cleanEffect = this._currentHanderSp3D.getChildByName("Xiya");
                            this._currentHanderSp3D.getChildByName("Zuanya").active = false;
                        }
                        else if (this._toothName == "CutTooth") {
                            this._cleanEffect = this._currentHanderSp3D.getChildByName("Zuanya");
                            this._currentHanderSp3D.getChildByName("Xiya").active = false;
                        }
                        else if (this._toothName == "FillingTooth") {
                            this._cleanEffect = this._currentHanderSp3D.getChildByName("Xiya");
                            this._currentHanderSp3D.getChildByName("Zuanya").active = false;
                        }
                        else {
                            this._cleanEffect = null;
                        }
                        if (this._cleanEffect != null) {
                            this._cleanEffect.active = false;
                        }
                        break;
                    case HandlerType.NozzleHandler:
                        this._currentHanderSp3D = this._nozzleHandlerSp3d;
                        this._cleanEffect = this._currentHanderSp3D.getChildByName("Effect");
                        this._cleanEffect.active = false;
                        break;
                    case HandlerType.TweezersHandler:
                        this._currentHanderSp3D = this._tweezersHandlerSp3d;
                        this._cleanEffect = null;
                        break;
                    case HandlerType.PincersHandler:
                        this._currentHanderSp3D = this._pincersHandlerSp3d;
                        this._cleanEffect = null;
                        break;
                }
                this.SwitchIn();
            }));
        }
        SwitchIn() {
            let moveLoc = 0;
            if (this._handleCurRotate > 0) {
                moveLoc = -5;
            }
            else {
                moveLoc = 5;
            }
            this._currentHanderSp3D.active = true;
            this._currentHanderSp3D.transform.localPositionX = moveLoc;
            this._currentHanderSp3D.transform.localPositionZ = -5;
            Laya.timer.once(50, this, () => {
                this._handlerState = HandlerState.Normal;
            });
            this._handleCurUpCurDownOffset = 0;
            this.SetPosByRotateAndOffset(this._handleCurRotate, this._handleCurUpCurDownOffset, SceneManager.HandleOrigOffset, this._handleCurOffset);
            Laya.Vector3.add(this._cameraCenter.transform.position, this._handleCurOffset, this._handlerSp.transform.position);
            this._handlerSp.transform.position = this._handlerSp.transform.position;
            Laya.Tween.to(this._currentHanderSp3D.transform, { localPositionX: 0, localPositionZ: 0, localPositionY: 0 }, 300, null, Laya.Handler.create(this, () => {
            }));
            Laya.Tween.to(this._currentHanderSp3D.transform, { localRotationEulerX: 0, localRotationEulerY: 0, localRotationEulerZ: 0 }, 300, null, Laya.Handler.create(this, () => {
            }));
            Laya.Tween.to(this._handlerMeshs.transform, { localPositionX: 0, localPositionZ: 0, localPositionY: 0 }, 100, null, Laya.Handler.create(this, () => {
            }));
            Laya.Tween.to(this._handlerMeshs.transform, { localRotationEulerX: 0, localRotationEulerY: 0, localRotationEulerZ: 0 }, 100, null, Laya.Handler.create(this, () => {
            }));
        }
        Input(xInput, yInput) {
            if (!this._enableInput)
                return;
            if (this._handlerState == HandlerState.SwitchingAni) {
                return;
            }
            switch (this._handlerType) {
                case HandlerType.NozzleHandler:
                case HandlerType.PointedHandler:
                case HandlerType.TweezersHandler:
                    this.NormalMoveHandler(xInput, yInput);
                    break;
                case HandlerType.PincersHandler:
                    if (this._handlerState == HandlerState.Normal) {
                        this.NormalMoveHandler(xInput, yInput);
                    }
                    if (this._handlerState == HandlerState.PullingTooth) {
                        this.PullingToothInputProgress(xInput, yInput);
                    }
                    break;
            }
        }
        NormalMoveHandler(xInput, yInput) {
            {
                this._handleCurRotate += xInput;
                this._handleCurRotate = Math.max(-1 * SceneManager.MaxHandleRotateAngle, Math.min(SceneManager.MaxHandleRotateAngle, this._handleCurRotate));
                let temp = this._handleCurRotate;
                if (Math.abs(temp - this._cameraLockRotate) > 20) {
                    let dir = this._handleCurRotate > this._cameraLockRotate ? -1 : 1;
                    this._cameraLockRotate -= (dir * 20);
                }
            }
            {
                this._handleCurUpCurDownOffset -= yInput;
                this._handleCurUpCurDownOffset = Math.max(-1 * SceneManager.MaxHandleUpDownOffset, Math.min(SceneManager.MaxHandleUpDownOffset, this._handleCurUpCurDownOffset));
            }
            this.SetPosByRotateAndOffset(this._handleCurRotate, this._handleCurUpCurDownOffset, SceneManager.HandleOrigOffset, this._handleCurOffset);
            Laya.Vector3.add(this._cameraCenter.transform.position, this._handleCurOffset, this._handlerSp.transform.position);
            this._handlerSp.transform.position = this._handlerSp.transform.position;
            let tempv3 = new Laya.Vector3();
            Laya.Vector3.subtract(this._handlerSp.transform.position, this._cameraCenter.transform.position, tempv3);
            Laya.Vector3.add(tempv3, this._handlerSp.transform.position, tempv3);
            tempv3.y = this._handlerSp.transform.position.y;
            this._handlerSp.transform.lookAt(tempv3, new Laya.Vector3(0, 1, 0));
        }
        SetHandlerMove() {
            switch (this._handlerType) {
                case HandlerType.PincersHandler:
                    this.PincersHandlerMove();
                    break;
                case HandlerType.TweezersHandler:
                    this.TweezersHandler();
                    break;
                case HandlerType.PointedHandler:
                case HandlerType.NozzleHandler:
                    this.PointedHandlerMove();
                    break;
            }
        }
        TweezersHandler() {
            {
                this._currentHanderSp3D.transform.localPositionZ = Math.abs(this._handleCurRotate / SceneManager.MaxHandleRotateAngle) * -0.6;
                this._currentHanderSp3D.transform.localPositionY = this._handleCurUpCurDownOffset / SceneManager.MaxHandleUpDownOffset * -0.1;
            }
            {
                this._currentHanderSp3D.transform.localRotationEulerZ = 65 * this._handleCurRotate / SceneManager.MaxHandleRotateAngle;
            }
        }
        PincersHandlerMove() {
            let updown = this._handleCurUpCurDownOffset / SceneManager.MaxHandleUpDownOffset;
            if (updown > 0) {
                this._currentHanderSp3D.transform.localRotationEulerZ = 90 - (Math.min(1, (updown) * 2) * 90);
            }
            else {
                this._currentHanderSp3D.transform.localRotationEulerZ = 90 + Math.min(1, (-updown) * 2) * 90;
            }
            this._handlerSp.transform.position = this._handlerSp.transform.position;
            this._currentHanderSp3D.transform.localRotationEuler = this._currentHanderSp3D.transform.localRotationEuler;
            this._currentHanderSp3D.transform.localPosition = this._currentHanderSp3D.transform.localPosition;
            return;
        }
        PointedHandlerMove() {
            let parentY = this._handlerSp.transform.localRotationEuler.y;
            if (parentY > 0) {
                parentY = ((90 - parentY) / 90) * 45;
            }
            else {
                parentY = ((parentY + 90) / 90) * -45;
            }
            let meshY = this._currentHanderSp3D.transform.localRotationEulerY;
            if (meshY > parentY) {
                meshY -= 3;
                if (meshY < parentY) {
                    meshY = parentY;
                }
            }
            else if (meshY < parentY) {
                meshY += 3;
                if (meshY > parentY) {
                    meshY = parentY;
                }
            }
            {
                let dir = Math.abs(this._handleCurRotate) / SceneManager.MaxHandleRotateAngle;
                this._currentHanderSp3D.transform.localRotationEulerX = (this._handleCurUpCurDownOffset * 10 * -dir);
            }
            {
                let dir = (this._handleCurRotate) / SceneManager.MaxHandleRotateAngle;
                this._currentHanderSp3D.transform.localRotationEulerZ = meshY + (this._handleCurUpCurDownOffset * 30 * dir);
            }
            this._currentHanderSp3D.transform.localRotationEulerY = meshY;
        }
        SetPosByRotateAndOffset(rotate, upDownOffset, origOffset, resOffset) {
            let distance = origOffset.z;
            let rad = (rotate * Math.PI) / 180;
            let z = Math.cos(rad) * distance;
            let x = Math.sin(rad) * distance;
            resOffset.x = x;
            resOffset.z = z;
            resOffset.y = upDownOffset;
        }
        UpdateCleanTooth(step) {
            switch (this._handlerState) {
                case HandlerState.SwitchingAni:
                    if (this._handlerType == HandlerType.PincersHandler) {
                        return step.onToothStepUpdate(this._handlerSp, { progress: this._pullingProgress, upJaw: this._handleCurUpCurDownOffset > 0 });
                    }
                    return false;
                case HandlerState.Normal:
                    return step.onToothStepUpdate(this._handlerSp);
                case HandlerState.PullingTooth:
                    return step.onToothStepUpdate(this._handlerSp, { progress: this._pullingProgress, upJaw: this._handleCurUpCurDownOffset > 0 });
            }
        }
    }

    class SceneManager extends Laya.Script {
        constructor() {
            super();
            this._toothStepList = [];
            this._currentToothStepIndex = 0;
            this._topToothList = [];
            this._bottomToothList = [];
            this._allToothList = [];
            this._isGameOver = false;
            this._currentLevel = 0;
            this._cleanStepCount = 0;
            this._calculusToothList = [];
            this._fillingToothList = [];
            this._pullToothList = [];
            this._cutToothList = [];
            this._braceToothList = [];
            this._paintToothList = [];
            this._normalToothList = [];
        }
        static get Instance() {
            return this._instance;
        }
        get CurrentScene() {
            return this._scene;
        }
        get IsGameOver() {
            return this._isGameOver;
        }
        get CurrentToothStep() {
            return this._currentToothSteep;
        }
        get CurrentToothStepIndex() {
            return this._currentToothStepIndex;
        }
        get ToothStepList() {
            return this._toothStepList;
        }
        onAwake() {
            SceneManager._instance = this;
            this.InitObjects();
            this.RandomSetToothStep();
        }
        StartGame() {
            this._handleScript.StartGameMove();
        }
        Input(xInput, yInput) {
            this._handleScript.Input(xInput, yInput);
        }
        SetGameOver() {
            this._handleScript.GameOver();
        }
        InitObjects() {
            this._scene = this.owner;
            this._faceSp3D = this._scene.getChildByName("Face");
            this._topJaw = this._faceSp3D.getChildByName("TopJaw");
            for (let index = 0; index < this._topJaw.numChildren; index++) {
                const element = this._topJaw.getChildAt(index);
                this._topToothList.push(element);
            }
            this._bottomJaw = this._faceSp3D.getChildByName("BottomJaw");
            for (let index = 0; index < this._bottomJaw.numChildren; index++) {
                const element = this._bottomJaw.getChildAt(index);
                this._bottomToothList.push(element);
            }
            this._allToothList = this._topToothList.concat(this._bottomToothList);
            this._handleScript = this._scene.getChildByName("Handler").addComponent(Handler);
            this._currentLevel = Gam_XYXZS_eMgr.getIns_XYXZS_tance().Curr_XYXZS_entLevel;
        }
        RandomSetToothStep() {
            this._normalToothList = this._allToothList.concat();
            let braceStep = null;
            let paintStep = null;
            let pullStep = null;
            let cutStep = null;
            let calclusStep = null;
            let fillStep = null;
            if (this._currentLevel == 1) {
                calclusStep = this.SetCalculusToothStep();
            }
            else if (this._currentLevel == 2) {
                fillStep = this.SetFillingTooth();
            }
            else if (this._currentLevel == 3) {
                paintStep = this.SetPaintToothStep();
                calclusStep = this.SetCalculusToothStep();
            }
            else if (this._currentLevel == 4) {
                braceStep = this.SetBraceToothStep();
                fillStep = this.SetFillingTooth();
            }
            else if (this._currentLevel == 5) {
                pullStep = this.SetPullToothStep();
                paintStep = this.SetPaintToothStep();
            }
            else if (this._currentLevel == 6) {
                braceStep = this.SetBraceToothStep();
                cutStep = this.SetCutToothStep();
            }
            else {
                let count = 0;
                if (Math.random() > 0.4) {
                    braceStep = this.SetBraceToothStep();
                    if (braceStep != null) {
                        count++;
                    }
                }
                if (Math.random() > 0.4 || braceStep == null) {
                    paintStep = this.SetPaintToothStep();
                    if (paintStep != null) {
                        count++;
                    }
                }
                if (Math.random() > 0.4 || braceStep == null || paintStep == null) {
                    cutStep = this.SetCutToothStep();
                    if (cutStep != null) {
                        count++;
                    }
                }
                if ((Math.random() > 0.8) && count < 4 && (Math.random() > 0.4 || braceStep == null || paintStep == null)) {
                    pullStep = this.SetPullToothStep();
                    if (pullStep != null) {
                        count++;
                    }
                }
                if (count < 4 || (count > 2 && Math.random() > 0.3)) {
                    calclusStep = this.SetCalculusToothStep();
                    count++;
                }
                if (count < 4 || (count > 2 && Math.random() > 0.3)) {
                    fillStep = this.SetFillingTooth();
                    count++;
                }
            }
            let rd = Math.random();
            if (rd < 0.3) {
                if (calclusStep != null) {
                    this._toothStepList.push(calclusStep);
                }
                if (fillStep != null) {
                    this._toothStepList.push(fillStep);
                }
                if (braceStep != null) {
                    this._toothStepList.push(braceStep);
                }
                if (cutStep != null) {
                    this._toothStepList.push(cutStep);
                }
                if (paintStep != null) {
                    this._toothStepList.push(paintStep);
                }
                if (pullStep != null) {
                    this._toothStepList.push(pullStep);
                }
            }
            else if (rd < 0.66) {
                if (calclusStep != null) {
                    this._toothStepList.push(calclusStep);
                }
                if (fillStep != null) {
                    this._toothStepList.push(fillStep);
                }
                if (pullStep != null) {
                    this._toothStepList.push(pullStep);
                }
                if (paintStep != null) {
                    this._toothStepList.push(paintStep);
                }
                if (cutStep != null) {
                    this._toothStepList.push(cutStep);
                }
                if (braceStep != null) {
                    this._toothStepList.push(braceStep);
                }
            }
            else {
                if (calclusStep != null) {
                    this._toothStepList.push(calclusStep);
                }
                if (fillStep != null) {
                    this._toothStepList.push(fillStep);
                }
                if (braceStep != null) {
                    this._toothStepList.push(braceStep);
                }
                if (paintStep != null) {
                    this._toothStepList.push(paintStep);
                }
                if (pullStep != null) {
                    this._toothStepList.push(pullStep);
                }
                if (cutStep != null) {
                    this._toothStepList.push(cutStep);
                }
            }
            this.RemoveUnusedTooth();
        }
        onUpdate() {
            if (!this._isGameOver) {
                if (this._currentToothSteep == null || this._currentToothSteep != this._toothStepList[this._currentToothStepIndex]) {
                    this._currentToothSteep = this._toothStepList[this._currentToothStepIndex];
                    switch (this._currentToothSteep.ToothStepType) {
                        case ToothStepType.CalculusTooth:
                            this._handleScript.SetHandlerType(HandlerType.PointedHandler, "CalculusTooth");
                        case ToothStepType.CutTooth:
                            this._handleScript.SetHandlerType(HandlerType.PointedHandler, "CutTooth");
                            break;
                        case ToothStepType.FillingTooth:
                            this._handleScript.SetHandlerType(HandlerType.PointedHandler, "FillingTooth");
                            break;
                        case ToothStepType.PaintTooth:
                            this._handleScript.SetHandlerType(HandlerType.NozzleHandler);
                            break;
                        case ToothStepType.BraceTooth:
                            this._handleScript.SetHandlerType(HandlerType.TweezersHandler);
                            break;
                        case ToothStepType.PullTooth:
                            this._handleScript.SetHandlerType(HandlerType.PincersHandler);
                            break;
                    }
                }
                let updateRes = this._handleScript.UpdateCleanTooth(this._currentToothSteep);
                if (updateRes) {
                    this._currentToothStepIndex++;
                    if (this._currentToothStepIndex >= this._toothStepList.length) {
                        console.log("所有流程结束");
                        Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("全部完成展示");
                        this._handleScript.GameOver();
                        this._isGameOver = true;
                    }
                    else {
                        Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("小节完成");
                        console.log("游戏进入下一步");
                    }
                }
            }
        }
        SetBraceToothStep() {
            let templist = [];
            if (Math.random() > 0.4) {
                templist = this._topToothList.concat();
            }
            else {
                templist = this._bottomToothList.concat();
            }
            for (let i = 0; i < templist.length; i++) {
                const tempT = templist[i];
                for (let j = 0; j < this._normalToothList.length; j++) {
                    const normalT = this._normalToothList[j];
                    if (normalT == tempT) {
                        this._normalToothList.splice(j, 1);
                        j--;
                        break;
                    }
                }
            }
            if (templist.length > 0) {
                let toothStep = new CleanToothStep();
                this._cleanStepCount++;
                this._braceToothList = templist;
                toothStep.SetTooth(templist, ToothStepType.BraceTooth);
                return toothStep;
            }
            else {
                return null;
            }
        }
        SetPullToothStep() {
            let templist = this._normalToothList.concat();
            for (let index = 0; index < templist.length; index++) {
                const element = templist[index];
                if (element.name != "4" && element.name != "5" && element.name != "6" && element.name != "7") {
                    templist.splice(index, 1);
                    index--;
                }
            }
            if (templist.length > 3) {
                let deccount = Math.floor(Math.random() * (templist.length - 3));
                templist.sort(() => {
                    return Math.random() - 0.5;
                });
                templist.splice(0, deccount);
            }
            for (let i = 0; i < templist.length; i++) {
                const tempT = templist[i];
                for (let j = 0; j < this._normalToothList.length; j++) {
                    const normalT = this._normalToothList[j];
                    if (normalT == tempT) {
                        this._normalToothList.splice(j, 1);
                        j--;
                        break;
                    }
                }
            }
            if (templist.length > 0) {
                let toothStep = new CleanToothStep();
                this._cleanStepCount++;
                this._pullToothList = templist;
                toothStep.SetTooth(templist, ToothStepType.PullTooth);
                return toothStep;
            }
            else {
                return null;
            }
        }
        SetCutToothStep() {
            let templist = this._normalToothList.concat();
            for (let index = 0; index < templist.length; index++) {
                const element = templist[index];
                if (element.name != "4" && element.name != "5" && element.name != "6" && element.name != "7") {
                    templist.splice(index, 1);
                    index--;
                }
            }
            if (templist.length > 3) {
                let deccount = Math.floor(Math.random() * (templist.length - 3));
                templist.sort(() => {
                    return Math.random() - 0.5;
                });
                templist.splice(0, deccount);
            }
            for (let i = 0; i < templist.length; i++) {
                const tempT = templist[i];
                for (let j = 0; j < this._normalToothList.length; j++) {
                    const normalT = this._normalToothList[j];
                    if (normalT == tempT) {
                        this._normalToothList.splice(j, 1);
                        j--;
                        break;
                    }
                }
            }
            if (templist.length > 0) {
                let toothStep = new CleanToothStep();
                this._cleanStepCount++;
                this._cutToothList = templist;
                toothStep.SetTooth(templist, ToothStepType.CutTooth);
                return toothStep;
            }
            else {
                return null;
            }
        }
        SetPaintToothStep() {
            let templist = this._normalToothList.concat();
            for (let index = 0; index < templist.length; index++) {
                const element = templist[index];
                if (element.name != "4" && element.name != "5" && element.name != "6" && element.name != "7") {
                    templist.splice(index, 1);
                    index--;
                }
            }
            if (Uti_XYXZS_lit.isI_XYXZS_phone) {
                if (templist.length > 5) {
                    let deccount = templist.length - 5;
                    templist.sort(() => {
                        return Math.random() - 0.5;
                    });
                    templist.splice(0, deccount);
                }
            }
            else {
                if (templist.length > 3) {
                    let deccount = Math.floor(Math.random() * (templist.length - 3));
                    templist.sort(() => {
                        return Math.random() - 0.5;
                    });
                    templist.splice(0, deccount);
                }
            }
            for (let i = 0; i < templist.length; i++) {
                const tempT = templist[i];
                for (let j = 0; j < this._normalToothList.length; j++) {
                    const normalT = this._normalToothList[j];
                    if (normalT == tempT) {
                        this._normalToothList.splice(j, 1);
                        j--;
                        break;
                    }
                }
            }
            if (templist.length > 0) {
                let toothStep = new CleanToothStep();
                this._cleanStepCount++;
                this._paintToothList = templist;
                toothStep.SetTooth(templist, ToothStepType.PaintTooth);
                return toothStep;
            }
            else {
                return null;
            }
        }
        SetCalculusToothStep() {
            let templist = this._normalToothList.concat();
            templist.concat(this._braceToothList);
            templist.concat(this._paintToothList);
            for (let i = 0; i < this._fillingToothList.length; i++) {
                const calTooth = this._fillingToothList[i];
                for (let j = 0; j < templist.length; j++) {
                    const tempTooth = templist[j];
                    if (tempTooth == calTooth) {
                        templist.splice(j, 1);
                        j--;
                        break;
                    }
                }
            }
            if (Uti_XYXZS_lit.isI_XYXZS_phone) {
                if (templist.length > 5) {
                    let deccount = templist.length - 5;
                    templist.sort(() => {
                        return Math.random() - 0.5;
                    });
                    templist.splice(0, deccount);
                }
            }
            else {
                if (templist.length > 3) {
                    let deccount = Math.floor(Math.random() * (templist.length - 3));
                    templist.sort(() => {
                        return Math.random() - 0.5;
                    });
                    templist.splice(0, deccount);
                }
            }
            for (let i = 0; i < templist.length; i++) {
                const tempT = templist[i];
                for (let j = 0; j < this._normalToothList.length; j++) {
                    const normalT = this._normalToothList[j];
                    if (normalT == tempT) {
                        this._normalToothList.splice(j, 1);
                        j--;
                        break;
                    }
                }
            }
            if (templist.length > 0) {
                let toothStep = new CleanToothStep();
                this._cleanStepCount++;
                this._calculusToothList = templist;
                toothStep.SetTooth(templist, ToothStepType.CalculusTooth);
                return toothStep;
            }
            else {
                return null;
            }
        }
        SetFillingTooth() {
            let templist = this._normalToothList.concat();
            templist.concat(this._braceToothList);
            templist.concat(this._paintToothList);
            for (let i = 0; i < this._calculusToothList.length; i++) {
                const calTooth = this._calculusToothList[i];
                for (let j = 0; j < templist.length; j++) {
                    const tempTooth = templist[j];
                    if (tempTooth == calTooth) {
                        templist.splice(j, 1);
                        j--;
                        break;
                    }
                }
            }
            if (templist.length > 4) {
                let rd = Math.floor(Math.random() * 3) + 4;
                let deccount = templist.length - Math.min(templist.length, rd);
                templist.sort(() => {
                    return Math.random() - 0.5;
                });
                templist.splice(0, deccount);
            }
            for (let i = 0; i < templist.length; i++) {
                const tempT = templist[i];
                for (let j = 0; j < this._normalToothList.length; j++) {
                    const normalT = this._normalToothList[j];
                    if (normalT == tempT) {
                        this._normalToothList.splice(j, 1);
                        j--;
                        break;
                    }
                }
            }
            if (templist.length > 0) {
                this._cleanStepCount++;
                let toothStep = new CleanToothStep();
                this._fillingToothList = templist;
                toothStep.SetTooth(templist, ToothStepType.FillingTooth);
                return toothStep;
            }
            else {
                return null;
            }
        }
        RemoveUnusedTooth() {
            for (let index = 0; index < this._allToothList.length; index++) {
                const tooth = this._allToothList[index];
                if (tooth.getComponent(FillingTooth) == null) {
                    let fillTooth = tooth.getChildByName("FillTooth");
                    if (fillTooth)
                        fillTooth.destroy();
                }
                if (tooth.getComponent(CalculusThooth) == null) {
                    let calculusThooth = tooth.getChildByName("CalculusThooth");
                    if (calculusThooth)
                        calculusThooth.getChildByName("yagou").destroy();
                }
                if (tooth.getComponent(PullTooth) == null) {
                    let pullTooth = tooth.getChildByName("PullTooth");
                    if (pullTooth)
                        pullTooth.destroy();
                }
                if (tooth.getComponent(BraceTooth) == null) {
                    let braceTooth = tooth.getChildByName("BraceTooth");
                    if (braceTooth)
                        braceTooth.destroy();
                }
                if (tooth.getComponent(CutTooth) == null) {
                    let cutTooth = tooth.getChildByName("CutTooth");
                    if (cutTooth)
                        cutTooth.destroy();
                }
                if (tooth.getComponent(PaintTooth) == null) {
                    let paintTooth = tooth.getChildByName("PaintTooth");
                    if (paintTooth)
                        paintTooth.destroy();
                }
            }
        }
    }
    SceneManager.CameraOrigOffset = new Laya.Vector3(0, 0.5, -11);
    SceneManager.MaxHandleRotateAngle = 60;
    SceneManager.HandleOrigOffset = new Laya.Vector3(0, 0, -2.3);
    SceneManager.MaxHandleUpDownOffset = 1.5;

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

    class Gam_XYXZS_eMgr extends Laya.Script {
        constructor() {
            super();
            this.isLo_XYXZS_adOver = false;
            this._curr_XYXZS_entLevel = 0;
            Gam_XYXZS_eMgr._inst_XYXZS_ance = this;
        }
        static getIns_XYXZS_tance() { return Gam_XYXZS_eMgr._inst_XYXZS_ance; }
        get Curre_XYXZS_ntScene() {
            return this._curr_XYXZS_entScene;
        }
        get Curr_XYXZS_entLevel() {
            return this._curr_XYXZS_entLevel + 1;
        }
        onAwake() {
            Mai_XYXZS_Liang.GetMai_XYXZS_LiangOpenId(function (res) {
                console.log("GameUI 买量数据上报成功");
                Laya.Browser.window["wx"].onShow(function () {
                    Mai_XYXZS_Liang.GetMai_XYXZS_LiangOpenId(null, null);
                });
                Laya.Browser.window["wx"].onHide(function () {
                    Mai_XYXZS_Liang.ReportS_XYXZS_tayTime(null, null);
                });
            }, function (res) {
                console.log("GameUI 买量数据上报失败");
            });
            W_XYXZS_XAPI.SetSha_XYXZS_reMenu("", "", () => {
            }, () => {
            }, () => {
            });
            Wudi_XYXZS_anMgr.Update_XYXZS_IpBlockState();
            Cached_XYXZS_WXBannerAd.preloa_XYXZS_dBanner();
            this.repor_XYXZS_tLaunchOptions();
        }
        onStart() {
            this.preCre_XYXZS_ateGame();
        }
        preCre_XYXZS_ateGame() {
            GameSwitchConfig.getInstance().SetBannerActive();
            Vie_XYXZS_wMgr.inst_XYXZS_ance.open_XYXZS_View(Vie_XYXZS_wDef.Main_XYXZS_View, null, (v) => {
                Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.App_Close_XYXZS_FirstLoadingView);
            });
            this.GetStorageData();
            this.CreatGameScene();
        }
        save_XYXZS_GameData() {
            Laya.LocalStorage.setItem("Game_Data", Us_XYXZS_er.getSa_XYXZS_veData());
        }
        repor_XYXZS_tLaunchOptions() {
            Http_XYXZS_Unit.Getu_XYXZS_serip((res) => {
                if (1 == res.code) {
                    console.log("获取玩家ip,地区成功 ：", res.data.dqip, res.data.ipxq);
                    let opt = null;
                    if (Laya.Browser.onMiniGame) {
                        opt = W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync();
                    }
                    else if (Laya.Browser.onQQMiniGame) {
                        opt = QQMini_XYXZS_GameAPI.getLaunc_XYXZS_hOptionsSync();
                    }
                    if (null != opt) {
                        A_XYXZS_LD.aldSendRe_XYXZS_portLaunchOptions(opt.scene, res.data.dqip, res.data.ipxq);
                    }
                }
            }, (res) => {
                console.log("获取玩家ip,地区失败");
                let opt = null;
                if (Laya.Browser.onMiniGame) {
                    opt = W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync();
                }
                else if (Laya.Browser.onQQMiniGame) {
                    opt = QQMini_XYXZS_GameAPI.getLaunc_XYXZS_hOptionsSync();
                }
                if (null != opt) {
                    A_XYXZS_LD.aldSendRe_XYXZS_portLaunchOptions(opt.scene, "", "");
                }
            });
        }
        StorageState() {
            var CurrentLevel = new Stor_XYXZS_ageReq();
            CurrentLevel.k_XYXZS_ey = "CurrentLevel";
            CurrentLevel.d_XYXZS_ata = this._curr_XYXZS_entLevel != null ? this._curr_XYXZS_entLevel : 0;
            Stora_XYXZS_geMgr.setSt_XYXZS_orage(CurrentLevel);
        }
        GetStorageData() {
            let lev = Stora_XYXZS_geMgr.getS_XYXZS_torage("CurrentLevel");
            if (lev == null || lev == "") {
                lev = "0";
            }
            this._curr_XYXZS_entLevel = parseInt(lev);
        }
        CreatNextGameScene() {
            this._curr_XYXZS_entLevel++;
            this.isLo_XYXZS_adOver = false;
            this.CreatGameScene();
        }
        CreatGameScene() {
            this.StorageState();
            let url = "subRes/LayaScene_Test/Conventional/Test.ls";
            if (this._curr_XYXZS_entScene) {
                this._curr_XYXZS_entScene.destroy();
            }
            Laya.Scene3D.load(url, Laya.Handler.create(this, (scene) => {
                this._curr_XYXZS_entScene = scene;
                Laya.stage.addChildAt(this._curr_XYXZS_entScene, 0);
                this._curr_XYXZS_entScene.addComponent(SceneManager);
                this.isLo_XYXZS_adOver = true;
                Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.App_Close_XYXZS_FirstLoadingView);
            }));
        }
    }
    Gam_XYXZS_eMgr._inst_XYXZS_ance = null;

    class Shar_XYXZS_eAd {
        static refr_XYXZS_eshAd(complate) {
        }
        static ge_XYXZS_tADVs(locationid, complate, useRandom, useLocalRandom, randomEveryTime = true) {
        }
        static reportUs_XYXZS_erClick(advid) {
        }
        static getRand_XYXZS_omADPosID() {
            return Shar_XYXZS_eAd.AdLoca_XYXZS_tionids[Math.floor(Math.random() * Shar_XYXZS_eAd.AdLoca_XYXZS_tionids.length)];
        }
        static req_XYXZS_uest(req) {
        }
        static getAd_XYXZS_PosData(onSuccess, onFail) {
        }
        static reqUs_XYXZS_erClick(advid, onSuccess, onFail) {
        }
        static getA_XYXZS_DVData(locationid, onSuccess, onFail) {
        }
        static Rando_XYXZS_mJump(rate = 1) {
        }
        static isNee_XYXZS_dShowAd() {
            return false;
        }
        static sort_XYXZS_Datas(datas) {
            return [];
        }
    }
    Shar_XYXZS_eAd.mai_XYXZS_nUrl = "";
    Shar_XYXZS_eAd.getA_XYXZS_dPostion = "";
    Shar_XYXZS_eAd.get_XYXZS_Adv = "";
    Shar_XYXZS_eAd.use_XYXZS_rClick = "";
    Shar_XYXZS_eAd.LoopA_XYXZS_dLocationID = 270;
    Shar_XYXZS_eAd.Banner_XYXZS_AdLocationID = 272;
    Shar_XYXZS_eAd.Insert_XYXZS_AdLocationID = 271;
    Shar_XYXZS_eAd.AniAd_XYXZS_LocationID = -1;
    Shar_XYXZS_eAd.Histo_XYXZS_ryLocationID = 273;
    Shar_XYXZS_eAd.UseRa_XYXZS_ndomAdPos = false;
    Shar_XYXZS_eAd.AdLoca_XYXZS_tionids = [];
    Shar_XYXZS_eAd._adP_XYXZS_osition = {};
    Shar_XYXZS_eAd._a_XYXZS_dv = {};
    Shar_XYXZS_eAd._iphon_XYXZS_eIgnoreAppIds = [];

    class KRQ__XYXZS_ComBase extends Laya.Script {
        constructor() {
            super(...arguments);
            this.AdP_XYXZS_osID = -10086;
            this._da_XYXZS_tas = [];
            this._d_XYXZS_ata = null;
        }
        get Sp_XYXZS_rite() {
            return this.owner;
        }
        get Da_XYXZS_ta() {
            return this._d_XYXZS_ata;
        }
        re_XYXZS_fres(onComplate) {
            let self = this;
            Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdP_XYXZS_osID, (datas) => {
                if (null != datas) {
                    self._da_XYXZS_tas = datas;
                    self._d_XYXZS_ata = self._da_XYXZS_tas[Math.floor(Math.random() * datas.length)];
                    if (null != onComplate) {
                        onComplate();
                    }
                }
            }, false);
        }
        navigateT_XYXZS_oMiniProgram(d) {
            var data = null == d ? this._d_XYXZS_ata : d;
            if (data) {
                console.log("跳转游戏： " + data.title);
                if (Laya.Browser.onMiniGame) {
                    W_XYXZS_XAPI.navigateT_XYXZS_oMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                        A_XYXZS_LD.aldSend_XYXZS_ReportAdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败");
                        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            A_XYXZS_LD.aldSend_XYXZS_ReportAdClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQGMiniGame) {
                    OPP_XYXZS_OAPI.navigat_XYXZS_eToMiniProgram(data.appid, data.title, data.url, (res) => {
                        console.log("跳转成功");
                        Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQQMiniGame) {
                    QQMini_XYXZS_GameAPI.navigateToMi_XYXZS_niProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
            }
        }
        show() {
            this.Sp_XYXZS_rite.visible = true;
        }
        hide() {
            this.Sp_XYXZS_rite.visible = false;
        }
        autoScr_XYXZS_ollText(text) {
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

    class KRQ_Loo_XYXZS_pAdBox extends KRQ__XYXZS_ComBase {
        constructor() {
            super(...arguments);
            this._originW = 170;
            this._originH = 170;
        }
        onAwake() {
            this._displaySp = this.owner.getChildByName("Display");
            this._originW = this._displaySp.width;
            this._originH = this._displaySp.height;
        }
        onStart() {
        }
        onEnable() {
            this.Sp_XYXZS_rite.on(Laya.Event.CLICK, this, this.onCl_XYXZS_ickAd);
        }
        onDisable() {
            this.Sp_XYXZS_rite.off(Laya.Event.CLICK, this, this.onCl_XYXZS_ickAd);
        }
        onCl_XYXZS_ickAd() {
            this.navigateT_XYXZS_oMiniProgram();
        }
        set_XYXZS_Data(data) {
            this._d_XYXZS_ata = data;
            if (null != this._d_XYXZS_ata) {
                let self = this;
                this._displaySp.loadImage(this._d_XYXZS_ata.logo, Laya.Handler.create(this, function () {
                    if (!self._displaySp.destroyed) {
                        self._displaySp.width = self._originW;
                        self._displaySp.height = self._originH;
                    }
                }));
            }
        }
    }

    class KRQ_HL_XYXZS_oopAd extends KRQ__XYXZS_ComBase {
        constructor() {
            super(...arguments);
            this._scrollForward = true;
            this._cellSize = new Laya.Point();
        }
        get Clip() {
            return this.owner;
        }
        onAwake() {
            this.AdP_XYXZS_osID = Shar_XYXZS_eAd.LoopA_XYXZS_dLocationID;
            this._list = this.owner.getChildByName("List");
            this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this._list.hScrollBarSkin = "";
        }
        onStart() {
            let self = this;
            this._list.width = self.Clip.width;
            this._list.height = self.Clip.height;
            self.refresh(() => {
                let box = this._list.cells[0];
                self._cellSize.x = box.width;
                self._cellSize.y = box.height;
                setTimeout(() => {
                    if (self._list.scrollBar) {
                        self._list.scrollBar.value = 0;
                        self.move();
                    }
                }, 2000);
            });
        }
        refresh(onComplate) {
            let self = this;
            Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdP_XYXZS_osID, (datas) => {
                if (null != datas) {
                    self._da_XYXZS_tas = datas;
                    self._list.array = self._da_XYXZS_tas;
                    if (null != onComplate) {
                        onComplate();
                    }
                }
            });
        }
        onListRender(cell, index) {
            var data = this._list.array[index];
            var loopAdBox = cell.getComponent(KRQ_Loo_XYXZS_pAdBox);
            loopAdBox.set_XYXZS_Data(data);
        }
        move() {
            let tonum = this._cellSize.x + this._list.spaceX;
            let left = 0;
            if (!this._scrollForward) {
                tonum *= -1;
                left = (this._list.scrollBar.max - this._list.scrollBar.value) % tonum * -1;
            }
            else {
                left = this._list.scrollBar.value % tonum;
            }
            if (this._list.scrollBar) {
                this._list.scrollBar.stopScroll();
                let scrollDelta = tonum;
                if (0 != left) {
                    scrollDelta = 2 * tonum - left;
                }
                let self = this;
                Laya.Tween.to(self._list.scrollBar, { value: self._list.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self, () => {
                }));
                Laya.timer.once(1010, self, () => {
                    if (self._list.scrollBar.value >= self._list.scrollBar.max) {
                        self._scrollForward = false;
                    }
                    else if (self._list.scrollBar.value <= 0) {
                        self._scrollForward = true;
                    }
                    Laya.timer.once(3000, self, () => {
                        if (self._list.scrollBar) {
                            self.move();
                        }
                    });
                });
            }
        }
    }

    class KRQ_VL_XYXZS_oopAd extends KRQ_HL_XYXZS_oopAd {
        onAwake() {
            this._list = this.owner.getChildByName("List");
            this._list.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this._list.vScrollBarSkin = "";
        }
        move() {
            let tonum = this._cellSize.y + this._list.spaceY;
            let left = 0;
            if (!this._scrollForward) {
                tonum *= -1;
                left = (this._list.scrollBar.max - this._list.scrollBar.value) % tonum * -1;
            }
            else {
                left = this._list.scrollBar.value % tonum;
            }
            if (this._list.scrollBar) {
                this._list.scrollBar.stopScroll();
                let scrollDelta = tonum;
                if (0 != left) {
                    scrollDelta = 2 * tonum - left;
                }
                let self = this;
                Laya.Tween.to(self._list.scrollBar, { value: self._list.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self, () => {
                }));
                Laya.timer.once(1010, self, () => {
                    if (self._list.scrollBar.value >= self._list.scrollBar.max) {
                        self._scrollForward = false;
                    }
                    else if (self._list.scrollBar.value <= 0) {
                        self._scrollForward = true;
                    }
                    Laya.timer.once(3000, self, () => {
                        if (self._list.scrollBar) {
                            self.move();
                        }
                    });
                });
            }
        }
    }

    class KRQ__XYXZS_Banner extends KRQ__XYXZS_ComBase {
        constructor() {
            super(...arguments);
            this._wxB_XYXZS_anner = null;
        }
        get C_XYXZS_lip() {
            return this.owner;
        }
        onAwake() {
            this.AdP_XYXZS_osID = Shar_XYXZS_eAd.Banner_XYXZS_AdLocationID;
        }
        onStart() {
            this.re_XYXZS_fres();
        }
        onEnable() {
            this.Sp_XYXZS_rite.on(Laya.Event.CLICK, this, this.onCl_XYXZS_ickAd);
        }
        onDisable() {
            this.Sp_XYXZS_rite.off(Laya.Event.CLICK, this, this.onCl_XYXZS_ickAd);
        }
        onCl_XYXZS_ickAd() {
            this.navigateT_XYXZS_oMiniProgram();
        }
        re_XYXZS_fres(onComplate) {
            super.re_XYXZS_fres(() => {
                var banner = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().ba_XYXZS_nner;
                if (1 == banner) {
                    if (null == this._wxB_XYXZS_anner) {
                        this.refres_XYXZS_hWXBanner();
                    }
                }
                else {
                    this.refres_XYXZS_hBanner();
                }
            });
        }
        refres_XYXZS_hBanner() {
            if (!this.Sp_XYXZS_rite.visible)
                return;
            if (null != this._d_XYXZS_ata) {
                let self = this;
                this.Sp_XYXZS_rite.loadImage(this._d_XYXZS_ata.logo, Laya.Handler.create(this, function () {
                    if (null != self.Sp_XYXZS_rite && !self.Sp_XYXZS_rite.destroyed) {
                        self.Sp_XYXZS_rite.width = 600;
                        self.Sp_XYXZS_rite.height = 205;
                    }
                }));
            }
        }
        refres_XYXZS_hWXBanner() {
            if (!Laya.Browser.onMiniGame || !this.Sp_XYXZS_rite.visible)
                return;
            this.clear_XYXZS_WXBaner();
            let self = this;
            let sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            let sw = sysInfo.screenWidth;
            let sh = sysInfo.screenHeight;
            let pos = this.Sp_XYXZS_rite.localToGlobal(new Laya.Point(0, 0));
            let width = 300;
            let scale = self.Sp_XYXZS_rite.width / Laya.stage.width;
            let realWidth = sw * scale;
            let offset = (realWidth - width) / 2;
            let left = pos.x / Laya.stage.width * sw + offset;
            let top = pos.y / Laya.stage.height * sh;
            this._wxB_XYXZS_anner = Laya.Browser.window["wx"].createBannerAd({
                adUnitId: W_XYXZS_XAPI.bann_XYXZS_erAdUnitId,
                adIntervals: 30,
                style: {
                    left: left,
                    top: top,
                    width: width,
                }
            });
            self._wxB_XYXZS_anner.onLoad((res) => {
                console.log("KRQ  WXBanner广告 加载完成 : ", W_XYXZS_XAPI.bann_XYXZS_erAdUnitId);
                console.log(res);
            });
            if (null != this._wxB_XYXZS_anner) {
                this._wxB_XYXZS_anner.onError((err) => {
                    console.log("KRQ WXBanner广告 加载失败 : ", W_XYXZS_XAPI.bann_XYXZS_erAdUnitId);
                    console.log(err);
                    self.refres_XYXZS_hBanner();
                    self.clear_XYXZS_WXBaner();
                });
                this._wxB_XYXZS_anner.onResize(res => {
                });
                this._wxB_XYXZS_anner.show();
            }
            else {
                this.refres_XYXZS_hBanner();
            }
        }
        clear_XYXZS_WXBaner() {
            if (this._wxB_XYXZS_anner) {
                this._wxB_XYXZS_anner.destroy();
            }
            this._wxB_XYXZS_anner = null;
        }
        onView__XYXZS_XYXZS_Show() {
            let banner = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().ba_XYXZS_nner;
            if (1 == banner && null == this._wxB_XYXZS_anner) {
                this.refres_XYXZS_hWXBanner();
            }
        }
        onViewHide() {
            this.clear_XYXZS_WXBaner();
        }
        onDestroy() {
            this.clear_XYXZS_WXBaner();
        }
        show() {
            super.show();
            this.onView__XYXZS_XYXZS_Show();
        }
        hide() {
            super.hide();
            this.onViewHide();
        }
    }

    class KRQ_View_XYXZS_ComBase extends Laya.Script {
        constructor() {
            super(...arguments);
            this.onShow = null;
            this.onHide = null;
        }
        get Sprite() {
            return this.owner;
        }
        show() {
            this.Sprite.visible = true;
            if (null != this.onShow) {
                this.onShow();
            }
        }
        hide() {
            this.Sprite.visible = false;
            if (null != this.onHide) {
                this.onHide();
            }
        }
    }

    class KRQ_E_XYXZS_xport extends KRQ_View_XYXZS_ComBase {
        constructor() {
            super(...arguments);
            this.onContinu_XYXZS_eBtnClick = null;
            this._to_XYXZS_pZone = null;
            this._bac_XYXZS_kBtn = null;
            this._cen_XYXZS_terZone = null;
            this._cont_XYXZS_inueBtn = null;
        }
        get Ba_XYXZS_ckBtn() {
            if (null == this._bac_XYXZS_kBtn) {
                this._bac_XYXZS_kBtn = this.Sprite.getChildByName("TopZone").getChildByName("BackBtn");
            }
            return this._bac_XYXZS_kBtn;
        }
        get Con_XYXZS_tinueBtn() {
            if (null == this._cont_XYXZS_inueBtn) {
                this._cont_XYXZS_inueBtn = this.Sprite.getChildByName("CenterZone").getChildByName("ContinueBtn");
            }
            return this._cont_XYXZS_inueBtn;
        }
        onAwake() {
            this._to_XYXZS_pZone = this.Sprite.getChildByName("TopZone");
            if (Uti_XYXZS_lit.isIp_XYXZS_honeX()) {
                this._to_XYXZS_pZone.top = this._to_XYXZS_pZone.top + 75;
            }
            this._bac_XYXZS_kBtn = this._to_XYXZS_pZone.getChildByName("BackBtn");
            this._cen_XYXZS_terZone = this.Sprite.getChildByName("CenterZone");
            if (Uti_XYXZS_lit.isIp_XYXZS_honeX()) {
                this._cen_XYXZS_terZone.top = this._cen_XYXZS_terZone.top + 75;
            }
            this._cont_XYXZS_inueBtn = this._cen_XYXZS_terZone.getChildByName("ContinueBtn");
        }
        onEnable() {
            this._bac_XYXZS_kBtn.on(Laya.Event.CLICK, this, this.on_XYXZS_BackBtn);
            this._cont_XYXZS_inueBtn.on(Laya.Event.CLICK, this, this.onCo_XYXZS_ntinueBtn);
        }
        onDisable() {
            this._bac_XYXZS_kBtn.off(Laya.Event.CLICK, this, this.on_XYXZS_BackBtn);
            this._cont_XYXZS_inueBtn.off(Laya.Event.CLICK, this, this.onCo_XYXZS_ntinueBtn);
        }
        on_XYXZS_BackBtn() {
            this.hide();
        }
        onCo_XYXZS_ntinueBtn() {
            if (null != this.onContinu_XYXZS_eBtnClick) {
                this.onContinu_XYXZS_eBtnClick();
            }
        }
    }

    class KRQ_Si_XYXZS_ngleAd extends KRQ__XYXZS_ComBase {
        constructor() {
            super(...arguments);
            this._or_XYXZS_iginW = 300;
            this._ori_XYXZS_ginH = 300;
        }
        onAwake() {
            this.AdP_XYXZS_osID = Shar_XYXZS_eAd.LoopA_XYXZS_dLocationID;
            this._dis_XYXZS_play = this.Sp_XYXZS_rite.getChildByName("Display");
            this._t_XYXZS_ext = this.Sp_XYXZS_rite.getChildByName("Text");
            this._t_XYXZS_ext.overflow = Laya.Text.SCROLL;
            this._t_XYXZS_ext.text = "";
        }
        onEnable() {
            this.Sp_XYXZS_rite.on(Laya.Event.CLICK, this, this.onCli_XYXZS_ckAd);
        }
        onDisable() {
            this.Sp_XYXZS_rite.off(Laya.Event.CLICK, this, this.onCli_XYXZS_ckAd);
        }
        onStart() {
            this.autoScr_XYXZS_ollText(this._t_XYXZS_ext);
            this.re_XYXZS_fresh();
        }
        re_XYXZS_fresh(onComplate) {
            let self = this;
            Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdP_XYXZS_osID, (datas) => {
                if (null != datas) {
                    self._d_XYXZS_ata = null;
                    self._da_XYXZS_tas = datas;
                    if (self.Sp_XYXZS_rite && !self.Sp_XYXZS_rite.destroyed) {
                        for (let i = 0; i < self._da_XYXZS_tas.length; ++i) {
                            let find = false;
                            let data = self._da_XYXZS_tas[i];
                            for (let j = 0; j < KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList.length; ++j) {
                                let appid = KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList[j];
                                if (appid == data.appid) {
                                    find = true;
                                    break;
                                }
                            }
                            if (!find) {
                                self.clea_XYXZS_rRepeat();
                                self._d_XYXZS_ata = data;
                                break;
                            }
                        }
                        if (null == self._d_XYXZS_ata) {
                            self._d_XYXZS_ata = self._d_XYXZS_ata[Math.floor(Math.random() * datas.length)];
                        }
                        if (null != self._d_XYXZS_ata) {
                            self._dis_XYXZS_play.loadImage(self._d_XYXZS_ata.logo, Laya.Handler.create(self, function () {
                                if (!self._dis_XYXZS_play.destroyed) {
                                    self.Sp_XYXZS_rite.visible = true;
                                    if (onComplate) {
                                        onComplate();
                                    }
                                }
                            }));
                            var str = self._d_XYXZS_ata.title;
                            self._t_XYXZS_ext.text = str;
                            let isHas = false;
                            for (let j = 0; j < KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList.length; ++j) {
                                let appid = KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList[j];
                                if (appid == self._d_XYXZS_ata.appid) {
                                    isHas = true;
                                    break;
                                }
                            }
                            if (!isHas) {
                                KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList.push(self._d_XYXZS_ata.appid);
                            }
                        }
                        else {
                            self.Sp_XYXZS_rite.visible = false;
                            if (onComplate) {
                                onComplate();
                            }
                        }
                    }
                }
                else {
                    self.Sp_XYXZS_rite.visible = false;
                    if (onComplate) {
                        onComplate();
                    }
                }
            });
        }
        hide() {
            this.Sp_XYXZS_rite.visible = false;
            this.clea_XYXZS_rRepeat();
        }
        clea_XYXZS_rRepeat() {
            if (null != this._d_XYXZS_ata) {
                for (let i = 0; i < KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList.length; ++i) {
                    let appid = KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList[i];
                    if (appid == this._d_XYXZS_ata.appid) {
                        KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList.splice(i, 1);
                        break;
                    }
                }
            }
        }
        onCli_XYXZS_ckAd() {
            this.navigateT_XYXZS_oMiniProgram();
            this.re_XYXZS_fresh();
        }
        onDestroy() {
            this.clea_XYXZS_rRepeat();
        }
    }
    KRQ_Si_XYXZS_ngleAd._repeatC_XYXZS_heckList = new Array();

    class KRQ_Roc_XYXZS_kSingleAd extends KRQ_Si_XYXZS_ngleAd {
        pl_XYXZS_ayAni(onComplate) {
            let self = this;
            self.Sp_XYXZS_rite.rotation = 0;
            Laya.Tween.to(self.Sp_XYXZS_rite, {
                rotation: 20,
            }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, () => {
                Laya.Tween.to(self.Sp_XYXZS_rite, {
                    rotation: 0,
                }, 250, Laya.Ease.linearNone, Laya.Handler.create(self, () => {
                    self.Sp_XYXZS_rite.rotation = 0;
                    if (null != onComplate) {
                        onComplate();
                    }
                }));
            }));
        }
    }

    class KRQ_Fl_XYXZS_oating extends KRQ_View_XYXZS_ComBase {
        constructor() {
            super(...arguments);
            this._cent_XYXZS_erZone = null;
            this._rock_XYXZS_SingleAds = new Array();
            this._aniS_XYXZS_paceing = 3000;
        }
        onAwake() {
            this._cent_XYXZS_erZone = this.Sprite.getChildByName("CenterZone");
            for (let i = 0; i < this._cent_XYXZS_erZone.numChildren; ++i) {
                let child = this._cent_XYXZS_erZone.getChildAt(i);
                if (child.visible) {
                    let rockAd = child.getComponent(KRQ_Roc_XYXZS_kSingleAd);
                    this._rock_XYXZS_SingleAds.push(rockAd);
                }
            }
        }
        onStart() {
            let self = this;
            self.pla_XYXZS_yAni();
            Laya.timer.loop(this._rock_XYXZS_SingleAds.length * (this._aniS_XYXZS_paceing + 500), this, () => {
                self.pla_XYXZS_yAni(() => {
                    self.refr_XYXZS_eshAd();
                });
            });
        }
        refr_XYXZS_eshAd() {
            for (let i = 0; i < this._rock_XYXZS_SingleAds.length; ++i) {
                let ad = this._rock_XYXZS_SingleAds[i];
                if (null == ad.Da_XYXZS_ta) {
                    ad.Sp_XYXZS_rite.visible = false;
                }
                ad.re_XYXZS_fres();
            }
        }
        pla_XYXZS_yAni(onComplate) {
            let len = this._rock_XYXZS_SingleAds.length;
            for (let i = 0; i < this._rock_XYXZS_SingleAds.length; ++i) {
                let index = i;
                let ad = this._rock_XYXZS_SingleAds[index];
                Laya.timer.once(this._aniS_XYXZS_paceing * i, ad, () => {
                    if (index == len - 1) {
                        ad.pl_XYXZS_ayAni(onComplate);
                    }
                    else {
                        ad.pl_XYXZS_ayAni();
                    }
                });
            }
        }
    }

    class KRQ_Rol_XYXZS_lSingleAd extends KRQ_Si_XYXZS_ngleAd {
        constructor() {
            super(...arguments);
            this._ori_XYXZS_ginX = null;
        }
        onAwake() {
            super.onAwake();
            this._ori_XYXZS_ginX = this.Sp_XYXZS_rite.x;
            this.Sp_XYXZS_rite.x -= Laya.stage.width;
        }
        pla_XYXZS_yAni(onComplate) {
            let cur = this._ori_XYXZS_ginX;
            let next = cur - Laya.stage.width;
            this.Sp_XYXZS_rite.x = next;
            Laya.Tween.to(this.Sp_XYXZS_rite, {
                rotation: 360,
            }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                this.Sp_XYXZS_rite.rotation = 0;
            }));
            Laya.Tween.to(this.Sp_XYXZS_rite, {
                x: cur,
            }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                this.Sp_XYXZS_rite.x = cur;
                if (null != onComplate) {
                    onComplate();
                }
            }));
        }
    }

    class KRQ_G_XYXZS_ameOver extends KRQ_View_XYXZS_ComBase {
        constructor() {
            super(...arguments);
            this._cent_XYXZS_erZone = null;
            this._rollSing_XYXZS_leAds = new Array();
        }
        onAwake() {
            this._cent_XYXZS_erZone = this.Sprite.getChildByName("CenterZone");
            for (let i = 0; i < this._cent_XYXZS_erZone.numChildren; ++i) {
                let ad = this._cent_XYXZS_erZone.getChildAt(i).getComponent(KRQ_Rol_XYXZS_lSingleAd);
                this._rollSing_XYXZS_leAds.push(ad);
            }
        }
        onStart() {
            for (let i = 0; i < this._rollSing_XYXZS_leAds.length; ++i) {
                let ad = this._rollSing_XYXZS_leAds[i];
                Laya.timer.once((this._rollSing_XYXZS_leAds.length - i) * 150, this, () => {
                    ad.pla_XYXZS_yAni();
                });
            }
        }
    }

    class KRQ_Sid_XYXZS_ePull extends KRQ_View_XYXZS_ComBase {
        constructor() {
            super(...arguments);
            this._krqV_XYXZS_LoopAd = null;
            this._pul_XYXZS_lBtn = null;
        }
        onAwake() {
            this._krqV_XYXZS_LoopAd = this.Sprite.getChildByName("KRQ_VLoopAd").getComponent(KRQ_VL_XYXZS_oopAd);
            this._pul_XYXZS_lBtn = this._krqV_XYXZS_LoopAd.Sp_XYXZS_rite.getChildByName("PullBtn");
            this._krqV_XYXZS_LoopAd.Sp_XYXZS_rite.x = -this._krqV_XYXZS_LoopAd.Sp_XYXZS_rite.width;
        }
        onEnable() {
            this._pul_XYXZS_lBtn.on(Laya.Event.CLICK, this, this.onPu_XYXZS_llBtn);
        }
        onDisable() {
            this._pul_XYXZS_lBtn.off(Laya.Event.CLICK, this, this.onPu_XYXZS_llBtn);
        }
        onPu_XYXZS_llBtn() {
            if (this._krqV_XYXZS_LoopAd.Sp_XYXZS_rite.x < 0) {
                this.pu_XYXZS_ll();
            }
            else {
                this.pu_XYXZS_sh();
            }
        }
        pu_XYXZS_ll() {
            Laya.Tween.to(this._krqV_XYXZS_LoopAd.Sp_XYXZS_rite, {
                x: 0
            }, 200, Laya.Ease.linearNone, null, 0, true);
        }
        pu_XYXZS_sh() {
            Laya.Tween.to(this._krqV_XYXZS_LoopAd.Sp_XYXZS_rite, {
                x: -this._krqV_XYXZS_LoopAd.Sp_XYXZS_rite.width
            }, 200, Laya.Ease.linearNone, null, 0, true);
        }
        onSha_XYXZS_reAdFail() {
            this.pu_XYXZS_ll();
        }
    }

    class KRQ_Hist_XYXZS_oryBox extends KRQ__XYXZS_ComBase {
        constructor() {
            super(...arguments);
            this._ic_XYXZS_on = null;
            this._t_XYXZS_ext = null;
            this._m_XYXZS_ark = null;
        }
        onAwake() {
            this._ic_XYXZS_on = this.Sp_XYXZS_rite.getChildByName("Icon");
            this._t_XYXZS_ext = this.Sp_XYXZS_rite.getChildByName("Text");
            this._t_XYXZS_ext.overflow = Laya.Text.SCROLL;
            this._t_XYXZS_ext.text = "";
            this._m_XYXZS_ark = this.Sp_XYXZS_rite.getChildByName("Mark");
            this._m_XYXZS_ark.visible = false;
        }
        onStart() {
            this.autoScr_XYXZS_ollText(this._t_XYXZS_ext);
        }
        onEnable() {
            this.Sp_XYXZS_rite.on(Laya.Event.CLICK, this, this.onCli_XYXZS_ckAd);
        }
        onDisable() {
            this.Sp_XYXZS_rite.off(Laya.Event.CLICK, this, this.onCli_XYXZS_ckAd);
        }
        onCli_XYXZS_ckAd() {
            this.navigateT_XYXZS_oMiniProgram();
        }
        set_XYXZS_Data(data, star) {
            this._d_XYXZS_ata = data;
            if (null != this._d_XYXZS_ata) {
                var self = this;
                this._ic_XYXZS_on.loadImage(this._d_XYXZS_ata.logo, Laya.Handler.create(this, function () {
                    if (!self._ic_XYXZS_on.destroyed) {
                        self._ic_XYXZS_on.width = 100;
                        self._ic_XYXZS_on.height = 100;
                    }
                }));
                var str = String(this._d_XYXZS_ata.title);
                this._t_XYXZS_ext.text = str;
                this._m_XYXZS_ark.visible = star;
            }
        }
    }

    class KRQ__XYXZS_History extends KRQ__XYXZS_ComBase {
        constructor() {
            super(...arguments);
            this.OnBackB_XYXZS_tnClick = null;
            this._to_XYXZS_pZone = null;
            this._ba_XYXZS_ckBtn = null;
            this._sta_XYXZS_rtList = new Array();
        }
        onAwake() {
            this.AdP_XYXZS_osID = Shar_XYXZS_eAd.Histo_XYXZS_ryLocationID;
            this._to_XYXZS_pZone = this.Sp_XYXZS_rite.getChildByName("TopZone");
            this._ba_XYXZS_ckBtn = this._to_XYXZS_pZone.getChildByName("BackBtn");
            this._l_XYXZS_ist = this.Sp_XYXZS_rite.getChildByName("List");
            this._l_XYXZS_ist.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this._l_XYXZS_ist.vScrollBarSkin = "";
        }
        onStart() {
            this.re_XYXZS_fres();
        }
        onEnable() {
            this._ba_XYXZS_ckBtn.on(Laya.Event.CLICK, this, this.onBa_XYXZS_ckBtn);
        }
        onDisable() {
            this._ba_XYXZS_ckBtn.off(Laya.Event.CLICK, this, this.onBa_XYXZS_ckBtn);
        }
        re_XYXZS_fres(onComplate) {
            let self = this;
            Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdP_XYXZS_osID, (datas) => {
                if (null != datas) {
                    self._da_XYXZS_tas = datas;
                    self._sta_XYXZS_rtList.splice(0);
                    for (let i = 0; i < self._da_XYXZS_tas.length; ++i) {
                        self._sta_XYXZS_rtList.push(false);
                    }
                    let num = Math.floor(self._sta_XYXZS_rtList.length * 0.33);
                    while (num > 0) {
                        let index = Math.floor(Math.random() * self._sta_XYXZS_rtList.length);
                        if (false == self._sta_XYXZS_rtList[index]) {
                            self._sta_XYXZS_rtList[index] = true;
                            --num;
                        }
                    }
                    self._l_XYXZS_ist.array = self._da_XYXZS_tas;
                }
            });
        }
        onListRender(cell, index) {
            let data = this._l_XYXZS_ist.array[index];
            let star = this._sta_XYXZS_rtList[index];
            let historyBox = cell.getComponent(KRQ_Hist_XYXZS_oryBox);
            historyBox.set_XYXZS_Data(data, star);
        }
        onBa_XYXZS_ckBtn() {
            this.hide();
            if (null != this.OnBackB_XYXZS_tnClick) {
                this.OnBackB_XYXZS_tnClick();
            }
        }
        show() {
            super.show();
            this.re_XYXZS_fres();
        }
    }

    class KRQ__XYXZS_Main extends KRQ_View_XYXZS_ComBase {
        constructor() {
            super(...arguments);
            this._top_XYXZS_Zone = null;
            this._hist_XYXZS_oryBtn = null;
            this._krqLo_XYXZS_opAd = null;
            this._bott_XYXZS_omZone = null;
            this._krqB_XYXZS_anner = null;
            this._krq_XYXZS_History = null;
        }
        onAwake() {
            this._top_XYXZS_Zone = this.Sprite.getChildByName("TopZone");
            this._hist_XYXZS_oryBtn = this._top_XYXZS_Zone.getChildByName("HistoryBtn");
            if (Uti_XYXZS_lit.isIp_XYXZS_honeX()) {
                this._top_XYXZS_Zone.top = this._top_XYXZS_Zone.top + 75;
            }
            this._krqLo_XYXZS_opAd = this.Sprite.getChildByName("KRQ_HLoopAd").getComponent(KRQ_HL_XYXZS_oopAd);
            this._krqB_XYXZS_anner = this.Sprite.getChildByName("KRQ_Banner").getComponent(KRQ__XYXZS_Banner);
            this._krq_XYXZS_History = this.Sprite.getChildByName("KRQ_History").getComponent(KRQ__XYXZS_History);
            let self = this;
            this._krq_XYXZS_History.OnBackB_XYXZS_tnClick = () => {
                self._krqB_XYXZS_anner.show();
            };
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                this._krqLo_XYXZS_opAd.Clip.top = 100;
                if (Uti_XYXZS_lit.isIp_XYXZS_honeX()) {
                    this._krqLo_XYXZS_opAd.Clip.top = this._krqLo_XYXZS_opAd.Clip.top + 75;
                }
                this._krqB_XYXZS_anner.Sp_XYXZS_rite.visible = true;
            }
            else {
                this._krqLo_XYXZS_opAd.Clip.top = Laya.stage.height - 280;
                this._krqB_XYXZS_anner.Sp_XYXZS_rite.visible = false;
            }
        }
        onEnable() {
            this._hist_XYXZS_oryBtn.on(Laya.Event.CLICK, this, this.onHis_XYXZS_toryBtn);
        }
        onDisable() {
            this._hist_XYXZS_oryBtn.off(Laya.Event.CLICK, this, this.onHis_XYXZS_toryBtn);
        }
        onHis_XYXZS_toryBtn() {
            this._krq_XYXZS_History.show();
            this._krqB_XYXZS_anner.hide();
        }
    }

    class TwinkleS_XYXZS_prite extends Laya.Script {
        constructor() {
            super();
            this.TwinkleSpeed = 1000;
            this.TwinkleMinSize = 0.95;
            this.TwinkleMaxSize = 1.05;
            this._ani_XYXZS_Forward = false;
            this._fon_XYXZS_tSize = 25;
            this._ori_XYXZS_ginSize = 1;
        }
        onAwake() {
            this._dis_XYXZS_playSp = this.owner;
            this._dis_XYXZS_Text = this.owner.getChildByName("TitelText");
            this._ori_XYXZS_ginSize = this._dis_XYXZS_playSp.scaleX;
            if (this._dis_XYXZS_Text != null) {
                this._dis_XYXZS_Text.text = "";
                this._fon_XYXZS_tSize = this._dis_XYXZS_Text.fontSize;
            }
        }
        onEnable() {
            this._dis_XYXZS_playSp.scale(this._ori_XYXZS_ginSize, this._ori_XYXZS_ginSize);
        }
        onDisable() {
        }
        onUpdate() {
            this.disp_XYXZS_layAni();
        }
        disp_XYXZS_layAni() {
            if (!this._ani_XYXZS_Forward) {
                var scale = this._dis_XYXZS_playSp.scaleX - Laya.timer.delta / this.TwinkleSpeed;
                scale = Math.max(scale, this.TwinkleMinSize * this._ori_XYXZS_ginSize);
                this._dis_XYXZS_playSp.scale(scale, scale);
                if (this._dis_XYXZS_playSp.scaleX <= this.TwinkleMinSize * this._ori_XYXZS_ginSize) {
                    this._ani_XYXZS_Forward = true;
                }
            }
            else {
                var scale = this._dis_XYXZS_playSp.scaleX + Laya.timer.delta / this.TwinkleSpeed;
                scale = Math.min(scale, this.TwinkleMaxSize * this._ori_XYXZS_ginSize);
                this._dis_XYXZS_playSp.scale(scale, scale);
                if (this._dis_XYXZS_playSp.scaleX >= this.TwinkleMaxSize * this._ori_XYXZS_ginSize) {
                    this._ani_XYXZS_Forward = false;
                }
            }
        }
    }

    function isIView_XYXZS_StateListener(element) {
        if ((null != element.onViewShow && typeof (element.onViewShow) == "function")
            && (null != element.onViewHide && typeof (element.onViewHide) == "function")) {
            return true;
        }
        return false;
    }

    class View_XYXZS_Base extends Laya.Script {
        constructor() {
            super(...arguments);
            this.onCloseEvent = null;
            this.onOpenEvent = null;
            this._viewBase = true;
            this._viewDef = Vie_XYXZS_wDef.No_XYXZS_ne;
            this._data = {};
        }
        onAwake() {
            this.owner.autoDestroyAtClosed = true;
            this.owner.height = Laya.stage.height;
        }
        onEnable() {
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
            Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.Game_OnV_XYXZS_iewOpen, { view: this._viewDef });
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
            Vie_XYXZS_wMgr.inst_XYXZS_ance.clos_XYXZS_eView(this._viewDef);
        }
        hide() {
            this.owner.visible = false;
            this.onHide();
            Uti_XYXZS_lit.for_XYXZS_EachChild(this.owner, (child) => {
                let coms = child._components;
                if (coms) {
                    for (let index = 0; index < coms.length; index++) {
                        const element = coms[index];
                        if (isIView_XYXZS_StateListener(element)) {
                            element.onViewHide(this);
                        }
                    }
                }
            });
        }
        show() {
            this.owner.visible = true;
            this.onShow();
            Uti_XYXZS_lit.for_XYXZS_EachChild(this.owner, (child) => {
                let coms = child._components;
                if (coms) {
                    for (let index = 0; index < coms.length; index++) {
                        const element = coms[index];
                        if (isIView_XYXZS_StateListener(element)) {
                            element.onView__XYXZS_XYXZS_Show(this);
                        }
                    }
                }
            });
        }
        viewIsHide() {
            return this.owner.visible;
        }
        onHide() { }
        onShow() { }
        onClose() {
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this);
            Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.Game_OnVi_XYXZS_ewClose, { view: this._viewDef });
            if (this.onCloseEvent) {
                this.onCloseEvent();
            }
        }
    }

    class ClickG_XYXZS_etPrize extends View_XYXZS_Base {
        constructor() {
            super();
            this._totalCl_XYXZS_ickTimer = 22;
            this._needCl_XYXZS_ickTime = 10;
            this._banne_XYXZS_rClickTime = 7;
        }
        onAwake() {
            this._cli_XYXZS_ck_Btn = this.owner.getChildByName("Click_Btn");
            this._cli_XYXZS_ck_Btn.on(Laya.Event.CLICK, this, this.Butto_XYXZS_nClicked);
            this._ar_XYXZS_row_Img = this._cli_XYXZS_ck_Btn.getChildByName("Arrow_Img");
            this._b_XYXZS_g = this.owner.getChildByName("BG");
            this._op_XYXZS_en_Btn = this._b_XYXZS_g.getChildByName("Open_Btn");
            this._getP_XYXZS_rize_View = this.owner.getChildByName("GetPrize_View");
            this._pri_XYXZS_zeCount_Text = this._getP_XYXZS_rize_View.getChildByName("PrizeCount_Text");
            this._con_XYXZS_firm_Btn = this._getP_XYXZS_rize_View.getChildByName("Confirm_Btn");
            this._getP_XYXZS_rize_View.visible = false;
            this._cli_XYXZS_ckTime_PBar = this._b_XYXZS_g.getChildByName("ClickTime_PBar");
            this._clic_XYXZS_kTime_PBar$Bar = this._cli_XYXZS_ckTime_PBar.getChildByName("ClickTime_PBar$Bar");
            this._clic_XYXZS_kBarOriginalWidth = this._clic_XYXZS_kTime_PBar$Bar.width;
            this._ban_XYXZS_nerAd_View = this.owner.getChildByName("BannerAd_View");
            this._clic_XYXZS_kTime_PBar$Bar.width = 0;
            this._cli_XYXZS_ckTime = 0;
            this._tota_XYXZS_lClickTime = 0;
        }
        onUpdate() {
            if (this._arr_XYXZS_owUp) {
                this._ar_XYXZS_row_Img.top += Laya.timer.delta / 5;
                if (this._ar_XYXZS_row_Img.top > -140) {
                    this._arr_XYXZS_owUp = false;
                }
            }
            else {
                this._ar_XYXZS_row_Img.top -= Laya.timer.delta / 5;
                if (this._ar_XYXZS_row_Img.top < -180) {
                    this._arr_XYXZS_owUp = true;
                }
            }
            if (!this._bann_XYXZS_erClicked) {
                let spd = 2 + (this._clic_XYXZS_kTime_PBar$Bar.width / this._clic_XYXZS_kBarOriginalWidth) * 6;
                if (this._clic_XYXZS_kTime_PBar$Bar.width >= spd) {
                    this._clic_XYXZS_kTime_PBar$Bar.width -= spd;
                }
                if ((this._clic_XYXZS_kTime_PBar$Bar.width / this._clic_XYXZS_kBarOriginalWidth) + 0.1 < (this._cli_XYXZS_ckTime / this._needCl_XYXZS_ickTime)) {
                    this._cli_XYXZS_ckTime--;
                }
            }
        }
        openView(data) {
            this._comp_XYXZS_eletFunction = data.Complete;
            this._pri_XYXZS_zeCount = data.PrizeCount;
            super.openView(data);
        }
        OpenPri_XYXZS_zeWindow() {
            this._b_XYXZS_g.visible = false;
            let self = this;
            this._pri_XYXZS_zeCount_Text.text = this._pri_XYXZS_zeCount.toString();
            this._getP_XYXZS_rize_View.visible = true;
            this._con_XYXZS_firm_Btn.once(Laya.Event.CLICK, this, function () {
                if (self._comp_XYXZS_eletFunction) {
                    self._comp_XYXZS_eletFunction();
                }
                self.closeView();
            });
        }
        ShowB_XYXZS_anner() {
            console.log("AD_WudianBanner_Show");
            Cached_XYXZS_WXBannerAd.show();
        }
        Butto_XYXZS_nClicked() {
            this._cli_XYXZS_ckTime++;
            this._tota_XYXZS_lClickTime++;
            if (this._cli_XYXZS_ckTime > this._needCl_XYXZS_ickTime) {
                this._cli_XYXZS_ckTime = this._needCl_XYXZS_ickTime;
            }
            if (this._cli_XYXZS_ckTime >= this._banne_XYXZS_rClickTime) {
                if (this._cli_XYXZS_ckTime >= this._needCl_XYXZS_ickTime) {
                    this._cli_XYXZS_ckTime = this._needCl_XYXZS_ickTime - 1;
                }
                this._bann_XYXZS_erClicked = true;
                console.log("误点Banner套路启动");
                this.ShowB_XYXZS_anner();
                Laya.timer.once(2000, this, function () {
                    this.BannerClicked();
                });
            }
            else if (this._tota_XYXZS_lClickTime > this._totalCl_XYXZS_ickTimer) {
                console.log("用户一直没点到，放他一马", this._tota_XYXZS_lClickTime);
                this.Banner_XYXZS_Clicked();
            }
            let progress = (this._cli_XYXZS_ckTime / this._needCl_XYXZS_ickTime) * this._clic_XYXZS_kBarOriginalWidth;
            this._clic_XYXZS_kTime_PBar$Bar.width = progress;
        }
        Banner_XYXZS_Clicked() {
            Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_WudianB_XYXZS_anner_Hide);
            this._bann_XYXZS_erClicked = true;
            this._cli_XYXZS_ckTime = this._needCl_XYXZS_ickTime;
            this._clic_XYXZS_kTime_PBar$Bar.width = this._clic_XYXZS_kBarOriginalWidth;
            this._cli_XYXZS_ck_Btn.visible = false;
            this._op_XYXZS_en_Btn.visible = true;
            this.OpenPri_XYXZS_zeWindow();
        }
        onDestroy() {
            super.onDestroy();
            Cached_XYXZS_WXBannerAd.hide();
        }
    }

    class Butt_XYXZS_onAnim extends Laya.Script {
        constructor() {
            super();
            this.use_XYXZS_Sound = true;
        }
        onAwake() {
            this.owner.on(Laya.Event.MOUSE_DOWN, this, this.onD_XYXZS_own);
            this.owner.on(Laya.Event.MOUSE_UP, this, this.o_XYXZS_nUp);
            this.owner.on(Laya.Event.MOUSE_OUT, this, this.o_XYXZS_nUp);
        }
        onDisable() {
            this.owner.offAll();
            Laya.Tween.clearAll(this);
        }
        onD_XYXZS_own() {
            Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
            if (this.use_XYXZS_Sound) {
                Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("anniu");
            }
        }
        o_XYXZS_nUp() {
            Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
        }
    }

    class SkeletonPlayWin extends Laya.Script {
        onAwake() {
            this._sk = this.owner;
            let skeleton = new Laya.Skeleton();
            skeleton.load("subRes/longgu/NewProject.sk", Laya.Handler.create(this, (res) => {
                this._sk.addChild(res);
                res.play(0, true);
            }));
        }
    }

    class GameO_XYXZS_verView extends View_XYXZS_Base {
        onAwake() {
            this._centerZone = this.owner.getChildByName("CenterAd");
            this._btns = this.owner.getChildByName("Btns");
            this._nextLeverBtn = this._btns.getChildByName("NextLeverBtn");
            this._showWin = this.owner.getChildByName("ShowWin");
            Laya.timer.once(2000, this, () => {
                this._showWin.visible = false;
                this.BtnsShow();
            });
        }
        onStart() {
            Laya.timer.once(500, this, () => {
                Gam_XYXZS_eMgr.getIns_XYXZS_tance().CreatNextGameScene();
            });
        }
        onEnable() {
            super.onEnable();
            Even_XYXZS_tMgr.in_XYXZS_stance.reg_XYXZS_OnceEvent(Even_XYXZS_tDef.InsertVideoEnd, this, this.onInsertVideoEnd);
        }
        onInsertVideoEnd() {
            Vie_XYXZS_wMgr.inst_XYXZS_ance.open_XYXZS_View(Vie_XYXZS_wDef.Main_XYXZS_View);
            this.closeView();
            Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_BGM("BGM");
            NativeCallback.CallNativeFunc("loadNextAd");
        }
        addEvent() {
            this._nextLeverBtn.once(Laya.Event.CLICK, this, this.onNextLeverBtn);
        }
        removeEvent() {
            this._nextLeverBtn.off(Laya.Event.CLICK, this, this.onNextLeverBtn);
        }
        onCloseBtn() { }
        onNextLeverBtn() {
            var randNum = Math.random();
            console.log("随机数值 ===========" + randNum);
            if ((Laya.Browser.onAndroid || Laya.Browser.onIOS) && randNum > 0.4) {
                NativeCallback.CallNativeFunc("showInsertVideo");
                NativeCallback.NowVideoType = "insertAd";
                Sou_XYXZS_ndMgr.ins_XYXZS_tance.stop_XYXZS_BGM();
            }
            else {
                Vie_XYXZS_wMgr.inst_XYXZS_ance.open_XYXZS_View(Vie_XYXZS_wDef.Main_XYXZS_View);
                this.closeView();
            }
        }
        BtnsShow() {
            if (Wudi_XYXZS_anMgr.Wud_XYXZS_ianFlag) {
                Cached_XYXZS_WXBannerAd.hide();
                this.InduceClick();
            }
            else {
                Cached_XYXZS_WXBannerAd.show();
            }
        }
        InduceClick() {
            this._btns.bottom = 0;
            this._btns.mouseEnabled = false;
            let btnMoveTimer = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().btnMo_XYXZS_veTimer * 1000;
            let bannerMoveTimer = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().banner_XYXZS_MoveTimer * 1000;
            Laya.timer.once(bannerMoveTimer, this, this.InduceMethod);
            Laya.timer.once(btnMoveTimer, this, this.MoveUp);
        }
        InduceMethod() {
            Cached_XYXZS_WXBannerAd.show();
        }
        MoveUp() {
            console.log("MoveUp");
            this._btns.mouseEnabled = true;
            this._btns.bottom = 284;
        }
        CenterAdMoveShow() {
            Laya.Tween.to(this._centerZone, { x: 0 }, 1000, Laya.Ease.circIn, Laya.Handler.create(this, () => {
            }), null, true);
        }
        onClose() {
            super.onClose();
            Cached_XYXZS_WXBannerAd.hide();
        }
    }

    class Controller extends Laya.Script {
        constructor() {
            super();
            this._x = 0;
            this._y = 0;
        }
        onMouseDown() {
            this._mouseDown = true;
            this._x = Laya.stage.mouseX;
        }
        onMouseUp() {
            this._mouseDown = false;
        }
        onMouseMove() {
            if (this._mouseDown) {
                let movex = (Laya.stage.mouseX - this._x) / 5;
                let movey = (Laya.stage.mouseY - this._y) / 100;
                movex = Math.min(Math.max(-5, movex), 5);
                movey = Math.min(Math.max(-0.15, movey), 0.15);
                this._x = Laya.stage.mouseX;
                this._y = Laya.stage.mouseY;
                SceneManager.Instance.Input(movex, movey);
            }
        }
    }

    class GameView extends View_XYXZS_Base {
        onAwake() {
            var aspectRatio = Laya.stage.width / Laya.stage.height;
        }
        onStart() {
            SceneManager.Instance.StartGame();
            Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_BGM("BGM");
        }
        onUpdate() {
            if (SceneManager.Instance.IsGameOver) {
                Laya.timer.once(2000, this, () => { this.onBtn(); });
            }
        }
        addEvent() {
        }
        removeEvent() {
        }
        onBtn() {
            this.closeView();
            Vie_XYXZS_wMgr.inst_XYXZS_ance.open_XYXZS_View(Vie_XYXZS_wDef.Game_XYXZS_Over);
        }
    }

    class Gold extends View_XYXZS_Base {
        onAwake() {
            this._goldText = this.owner.getChildByName("GoldText");
            this.SetGoldAmount(321);
            this.owner.visible = false;
        }
        SetGoldAmount(glodAmount) {
            this._goldText.text = glodAmount.toString();
        }
    }

    class BadTooth extends Laya.Script {
        constructor() {
            super(...arguments);
            this.TwinkleSpeed = 4000;
            this.TwinkleMinSize = 1.45;
            this.TwinkleMaxSize = 1.55;
            this._aniForward = false;
            this._originSize = 1.45;
            this._badToothArray = new Array(6);
        }
        onAwake() {
            this._displaySp = this.owner;
            this._originSize = this._displaySp.scaleX;
            this._badToothArray[ToothStepType.PaintTooth] = this.owner.getChildByName("GoldTooth");
            this._badToothArray[ToothStepType.CalculusTooth] = this.owner.getChildByName("YaGou");
            this._badToothArray[ToothStepType.PullTooth] = this.owner.getChildByName("BaYa");
            this._badToothArray[ToothStepType.BraceTooth] = this.owner.getChildByName("GuYa");
            this._badToothArray[ToothStepType.FillingTooth] = this.owner.getChildByName("CongYa");
            this._badToothArray[ToothStepType.CutTooth] = this.owner.getChildByName("ZhuangYa");
            this._numberBg = this.owner.getChildByName("Number");
            this._numberText = this._numberBg.getChildByName("Text");
            this._over = this.owner.getChildByName("Over");
            this._numberBg.visible = false;
            this._displaySp.scale(this._originSize, this._originSize);
        }
        onUpdate() {
            if (this._numberBg.visible) {
                this.displayAni();
            }
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
        ShowNumber() {
            this._numberBg.visible = true;
        }
        SetToothNumber(count) {
            if (count > 0) {
                this._numberBg.visible = true;
                var countstr = "X" + count;
                this._numberText.text = countstr;
                Laya.Tween.to(this._numberText, { scaleX: 1.3, scaleY: 1.3 }, 100);
                Laya.timer.once(150, this, () => {
                    Laya.Tween.to(this._numberText, { scaleX: 1, scaleY: 1 }, 100);
                });
            }
            else {
                this._numberBg.visible = false;
                for (var i = 1; i < this._badToothArray.length; i++) {
                    this._badToothArray[i].visible = false;
                }
                this._over.visible = true;
                Laya.Tween.to(this.owner, { scaleX: 0.6, scaleY: 0.6 }, 500);
            }
        }
        SetToothImage(toothType) {
            this._over.visible = false;
            for (var i = 1; i < this._badToothArray.length; ++i) {
                if (toothType == i) {
                    this._badToothArray[i].visible = true;
                }
                else {
                    this._badToothArray[i].visible = false;
                }
            }
        }
    }

    class ToothShow extends Laya.Script {
        constructor() {
            super(...arguments);
            this._totalProgress = 0;
            this._currentProgress = 0;
            this.badTypeArray = new Array();
        }
        onAwake() {
            this._progress_Bar = this.owner.getChildByName("Progress").getChildByName("Progress_Bar");
            this._badTooth1 = this.owner.getChildByName("BadTooth1");
            this._badTooth2 = this.owner.getChildByName("BadTooth2");
            this._badTooth3 = this.owner.getChildByName("BadTooth3");
            this._badTooth4 = this.owner.getChildByName("BadTooth4");
            this._Smile = this.owner.getChildByName("Smile");
            this._toothShow1 = this._badTooth1.getComponent(BadTooth);
            this._toothShow2 = this._badTooth2.getComponent(BadTooth);
            this._toothShow3 = this._badTooth3.getComponent(BadTooth);
            this._toothShow4 = this._badTooth4.getComponent(BadTooth);
            this._guider = this.owner.getChildByName("Guider");
            let skeleton = new Laya.Skeleton();
            skeleton.load("subRes/guider/NewProject.sk", Laya.Handler.create(this, (res) => {
                this._guider.addChild(res);
                res.x = 250;
                res.y = 100;
                res.play(0, true);
            }));
            this._guider.on(Laya.Event.MOUSE_OVER, this, () => {
                this._guider.visible = false;
            });
        }
        onStart() {
            for (var i = 0; i < SceneManager.Instance.ToothStepList.length; i++) {
                this.badTypeArray.push(SceneManager.Instance.ToothStepList[i].ToothStepType);
                this._totalProgress += SceneManager.Instance.ToothStepList[i].ToothCount;
            }
            this.initBadTooth(this.badTypeArray);
            this._toothShow1.SetToothNumber((SceneManager.Instance.CurrentToothStep.ToothList.length - SceneManager.Instance.CurrentToothStep.CleandToothCount));
            this._badStepNumber = (SceneManager.Instance.CurrentToothStep.ToothList.length - SceneManager.Instance.CurrentToothStep.CleandToothCount);
            this.ShowBadTooth(1);
            this._toothShow1.SetToothNumber(this._badStepNumber);
            this._progress_Bar.width = 0;
        }
        onUpdate() {
            if (this._badStepNumber != (SceneManager.Instance.CurrentToothStep.ToothList.length - SceneManager.Instance.CurrentToothStep.CleandToothCount)) {
                this._badStepNumber = (SceneManager.Instance.CurrentToothStep.ToothList.length - SceneManager.Instance.CurrentToothStep.CleandToothCount);
                if (SceneManager.Instance.CurrentToothStep.ToothList.length - SceneManager.Instance.CurrentToothStep.CleandToothCount == 0) {
                    Vibr_XYXZS_ateMgr.ibra_XYXZS_teLong();
                    switch (SceneManager.Instance.CurrentToothStepIndex) {
                        case 1:
                            this._toothShow1.SetToothNumber(this._badStepNumber);
                            this.ShowBadTooth(2);
                            break;
                        case 2:
                            this._toothShow2.SetToothNumber(this._badStepNumber);
                            this.ShowBadTooth(3);
                            break;
                        case 3:
                            this._toothShow3.SetToothNumber(this._badStepNumber);
                            this.ShowBadTooth(4);
                            break;
                        case 4:
                            this._toothShow4.SetToothNumber(this._badStepNumber);
                            break;
                        default: break;
                    }
                    if (!SceneManager.Instance.IsGameOver) {
                        this._guider.visible = true;
                    }
                    else {
                        this._currentProgress = this._totalProgress;
                    }
                    this.showSmile();
                }
                else {
                    Vibr_XYXZS_ateMgr.vibr_XYXZS_ateShort();
                    switch (SceneManager.Instance.CurrentToothStepIndex) {
                        case 0:
                            this._toothShow1.SetToothNumber(this._badStepNumber);
                            break;
                        case 1:
                            this._toothShow2.SetToothNumber(this._badStepNumber);
                            break;
                        case 2:
                            this._toothShow3.SetToothNumber(this._badStepNumber);
                            break;
                        case 3:
                            this._toothShow4.SetToothNumber(this._badStepNumber);
                            break;
                        default: break;
                    }
                    Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_Sound("单个完成");
                    this._currentProgress++;
                }
            }
            this._progress_Bar.width = (this._currentProgress / this._totalProgress) * 490;
        }
        showSmile() {
            this._Smile.x = Math.min(Math.max(130, (750 * Math.random())), 500);
            this._Smile.y = Math.min(Math.max(430, (750 * Math.random())), 850);
            Laya.Tween.to(this._Smile, { alpha: 1 }, 500);
            Laya.timer.once(1000, this, () => { Laya.Tween.to(this._Smile, { alpha: 0 }, 500); });
        }
        initBadTooth(badTypeArray) {
            var TypeCount = badTypeArray.length;
            var _posX = Laya.stage.width / 2;
            if (TypeCount == 1) {
                this._badTooth1.x = _posX;
                this._badTooth2.visible = false;
                this._badTooth3.visible = false;
                this._badTooth4.visible = false;
                this._toothShow1.SetToothImage(badTypeArray[0]);
            }
            else if (TypeCount == 2) {
                this._badTooth1.x = _posX - 75;
                this._badTooth2.x = _posX + 75;
                this._badTooth3.visible = false;
                this._badTooth4.visible = false;
                this._toothShow1.SetToothImage(badTypeArray[0]);
                this._toothShow2.SetToothImage(badTypeArray[1]);
            }
            else if (TypeCount == 3) {
                this._badTooth1.x = _posX - 150;
                this._badTooth2.x = _posX;
                this._badTooth3.x = _posX + 150;
                this._badTooth4.visible = false;
                this._toothShow1.SetToothImage(badTypeArray[0]);
                this._toothShow2.SetToothImage(badTypeArray[1]);
                this._toothShow3.SetToothImage(badTypeArray[2]);
            }
            else if (TypeCount == 4) {
                this._badTooth1.x = _posX - 225;
                this._badTooth2.x = _posX - 75;
                this._badTooth3.x = _posX + 75;
                this._badTooth4.x = _posX + 225;
                this._toothShow1.SetToothImage(badTypeArray[0]);
                this._toothShow2.SetToothImage(badTypeArray[1]);
                this._toothShow3.SetToothImage(badTypeArray[2]);
                this._toothShow4.SetToothImage(badTypeArray[3]);
            }
        }
        ShowBadTooth(index) {
            switch (index) {
                case 1:
                    Laya.Tween.to(this._badTooth1, { scaleX: 1, scaleY: 1 }, 200, null, Laya.Handler.create(this, () => {
                        this._toothShow1.ShowNumber();
                    }), null, true);
                    break;
                case 2:
                    Laya.Tween.to(this._badTooth2, { scaleX: 1, scaleY: 1 }, 200, null, Laya.Handler.create(this, () => {
                        this._toothShow2.ShowNumber();
                    }), null, true);
                    this._toothShow2.ShowNumber();
                    break;
                case 3:
                    Laya.Tween.to(this._badTooth3, { scaleX: 1, scaleY: 1 }, 200, null, Laya.Handler.create(this, () => {
                        this._toothShow3.ShowNumber();
                    }), null, true);
                    this._toothShow3.ShowNumber();
                    break;
                case 4:
                    Laya.Tween.to(this._badTooth4, { scaleX: 1, scaleY: 1 }, 200, null, Laya.Handler.create(this, () => {
                        this._toothShow4.ShowNumber();
                    }), null, true);
                    this._toothShow4.ShowNumber();
                    break;
                default: break;
            }
        }
    }

    class ShowLever extends Laya.Script {
        constructor() {
            super(...arguments);
            this._x = 1;
        }
        onAwake() {
            this._leverIndexOne = this.owner.getChildByName("leverIndexOne");
            this._leverIndexTwo = this.owner.getChildByName("leverIndexTwo");
            this._leverIndexOne.clipX = 10;
            this._leverIndexTwo.clipX = 10;
            this.SetClipLever(Gam_XYXZS_eMgr.getIns_XYXZS_tance().Curr_XYXZS_entLevel);
        }
        SetClipLever(leverindex) {
            if (leverindex < 10) {
                this._leverIndexOne.index = leverindex;
            }
            else if (leverindex < 100) {
                this._leverIndexOne.index = leverindex % 10;
                this._leverIndexTwo.index = (leverindex - leverindex % 10) / 10;
            }
            else {
                this._leverIndexOne.index = 9;
                this._leverIndexTwo.index = 9;
            }
        }
    }

    class Load_XYXZS_ingView extends View_XYXZS_Base {
        constructor() {
            super(...arguments);
            this._proc_XYXZS_essWidth = 0;
        }
        onAwake() {
            this._b_XYXZS_g = this.owner.getChildByName("Bg");
            this._proce_XYXZS_ssBarBg = this._b_XYXZS_g.getChildByName("processBarBg");
            if (this._proce_XYXZS_ssBarBg) {
                this._proc_XYXZS_essBar = this._proce_XYXZS_ssBarBg.getChildByName("processBar");
                this._proc_XYXZS_essWidth = this._proc_XYXZS_essBar.width;
            }
            else {
                this._proc_XYXZS_essBar = this._b_XYXZS_g.getChildByName("processBar");
                this._proc_XYXZS_essWidth = Laya.stage.width;
            }
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
            this._b_XYXZS_g.width = Laya.stage.width;
            this._b_XYXZS_g.height = Laya.stage.height;
            if (!this._proce_XYXZS_ssBarBg) {
                this._proc_XYXZS_essWidth = Laya.stage.width;
            }
        }
        setP_XYXZS_rocess(process) {
            if (process < 0)
                process = 0;
            if (process > 1)
                process = 1;
            var width = this._proc_XYXZS_essWidth * process;
            if (width < 1)
                width = 1;
            this._proc_XYXZS_essBar.width = width;
        }
    }

    class SkeletonPlay extends Laya.Script {
        onAwake() {
            this._sk = this.owner;
            let skeleton = new Laya.Skeleton();
            skeleton.load("subRes/longgu/NewProject.sk", Laya.Handler.create(this, (res) => {
                this._sk.addChild(res);
                res.play(1, true);
            }));
        }
    }

    class JumpButton extends Laya.Script {
        constructor() {
            super();
            this.TwinkleSpeed = 1000;
            this.TwinkleMinSize = 0.95;
            this.TwinkleMaxSize = 1.05;
            this._timer = 0;
            this._angle = 0;
            this._orY = 0;
        }
        onAwake() {
            this._ownerSprite = this.owner;
            this._orY = this._ownerSprite.y;
        }
        onEnable() {
        }
        onDisable() {
        }
        onUpdate() {
            this.displayAni();
        }
        displayAni() {
            if (this._timer < 1000) {
                this._timer += Laya.timer.delta;
            }
            else {
                this._angle += (Laya.timer.delta / 1000) * 360;
                this._ownerSprite.y = this._orY - Math.abs(Math.sin(this._angle * Math.PI / 180) * 50);
                if (this._angle > 360) {
                    this._angle = 0;
                    this._timer = 0;
                }
            }
        }
    }

    class MainView extends View_XYXZS_Base {
        onAwake() {
            this._centerZone = this.owner.getChildByName("CenterZone");
            this._startGameBrn = this._centerZone.getChildByName("StartGameBtn");
            this._topZone = this.owner.getChildByName("TopZone");
            Sou_XYXZS_ndMgr.ins_XYXZS_tance.play_XYXZS_BGM("BGM");
        }
        addEvent() {
            this._startGameBrn.on(Laya.Event.CLICK, this, this.onStartGameBtn);
        }
        removeEvent() {
            this._startGameBrn.off(Laya.Event.CLICK, this, this.onStartGameBtn);
        }
        onStartGameBtn() {
            if (Gam_XYXZS_eMgr.getIns_XYXZS_tance().isLo_XYXZS_adOver) {
                Vie_XYXZS_wMgr.inst_XYXZS_ance.open_XYXZS_View(Vie_XYXZS_wDef.Game_XYXZS_View);
                this.closeView();
            }
        }
        onCloseBtn() {
            Vie_XYXZS_wMgr.inst_XYXZS_ance.open_XYXZS_View(Vie_XYXZS_wDef.Game_XYXZS_Over);
        }
    }

    var openMoreViewType;
    (function (openMoreViewType) {
        openMoreViewType[openMoreViewType["mainView"] = 0] = "mainView";
        openMoreViewType[openMoreViewType["gameView"] = 1] = "gameView";
    })(openMoreViewType || (openMoreViewType = {}));
    class MoreGameView extends View_XYXZS_Base {
        onAwake() {
            this._continueBtn = this.owner.getChildByName("ContinueGameBtn");
            this._continueBtn.visible = false;
            Laya.timer.once(2000, this, () => {
                this._continueBtn.visible = true;
            });
        }
        addEvent() {
            this._continueBtn.once(Laya.Event.CLICK, this, this.onContinueBtn);
        }
        onCloseBtn() {
        }
        onContinueBtn() {
            Vie_XYXZS_wMgr.inst_XYXZS_ance.open_XYXZS_View(Vie_XYXZS_wDef.Main_XYXZS_View);
            this.closeView();
        }
    }

    class Tip_XYXZS_sView extends View_XYXZS_Base {
        constructor() { super(); }
        onAwake() {
            this._b_XYXZS_g = this.owner.getChildByName("Bg");
            this._b_XYXZS_g.x = Laya.stage.width / 2 - this._b_XYXZS_g.width / 2;
            this._tips_XYXZS_Text = this._b_XYXZS_g.getChildByName("Text");
        }
        openView(data) {
            super.openView(data);
            this.setTi_XYXZS_psMsg(data);
            Laya.timer.clearAll(this);
            var self = this;
            Laya.timer.once(3000, this, function () {
                self.closeView();
            });
        }
        setTi_XYXZS_psMsg(msg) {
            this._tips_XYXZS_Text.text = msg;
        }
    }

    class Loop_XYXZS_AdBox extends Laya.Script {
        constructor() {
            super(...arguments);
            this._d_XYXZS_ata = null;
            this._or_XYXZS_iginW = 150;
            this._or_XYXZS_iginH = 150;
            this._fon_XYXZS_tSize = 25;
        }
        onAwake() {
            this._disp_XYXZS_laySp = this.owner.getChildByName("Display");
            this._or_XYXZS_iginW = this._disp_XYXZS_laySp.width;
            this._or_XYXZS_iginH = this._disp_XYXZS_laySp.height;
            this._dis_XYXZS_Text = this.owner.getChildByName("TitelText");
            this._dis_XYXZS_Text.text = "";
            this._fon_XYXZS_tSize = this._dis_XYXZS_Text.fontSize;
        }
        onEnable() {
            this._disp_XYXZS_laySp.on(Laya.Event.CLICK, this, this.onSp_XYXZS_Click);
        }
        onDisable() {
            this._disp_XYXZS_laySp.off(Laya.Event.CLICK, this, this.onSp_XYXZS_Click);
        }
        setData(data) {
            if (data) {
                var self = this;
                this._disp_XYXZS_laySp.loadImage(data.logo, Laya.Handler.create(this, function () {
                    if (!self._disp_XYXZS_laySp.destroyed) {
                        self._disp_XYXZS_laySp.width = self._or_XYXZS_iginW;
                        self._disp_XYXZS_laySp.height = self._or_XYXZS_iginH;
                    }
                }));
                var str = String(data.title);
                var num = str.length;
                num = Math.max(5, num);
                var fontSize = Math.floor((5 / num) * this._fon_XYXZS_tSize);
                this._dis_XYXZS_Text.fontSize = fontSize;
                this._dis_XYXZS_Text.text = str;
                this._d_XYXZS_ata = data;
            }
        }
        onSp_XYXZS_Click() {
            var data = this._d_XYXZS_ata;
            if (data) {
                console.log("跳转游戏： " + data.title);
                if (Laya.Browser.onMiniGame) {
                    W_XYXZS_XAPI.navigateT_XYXZS_oMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                        A_XYXZS_LD.aldSend_XYXZS_ReportAdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败");
                        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            A_XYXZS_LD.aldSend_XYXZS_ReportAdClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQGMiniGame) {
                    OPP_XYXZS_OAPI.navigat_XYXZS_eToMiniProgram(data.appid, data.title, data.url, (res) => {
                        console.log("跳转成功");
                        Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQQMiniGame) {
                    QQMini_XYXZS_GameAPI.navigateToMi_XYXZS_niProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
            }
        }
    }

    class Horizont_XYXZS_alLoopAdView extends Laya.Script {
        constructor() {
            super(...arguments);
            this.AdP_XYXZS_osID = Shar_XYXZS_eAd.LoopA_XYXZS_dLocationID;
            this._scrol_XYXZS_lForward = true;
        }
        onAwake() {
            this._l_XYXZS_ist = this.owner.getChildByName("List");
            this._l_XYXZS_ist.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this._l_XYXZS_ist.hScrollBarSkin = "";
        }
        onEnable() {
            var self = this;
            Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdP_XYXZS_osID, (datas) => {
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
                        this._l_XYXZS_ist.array = temp;
                    }
                    else {
                        this._l_XYXZS_ist.array = datas;
                    }
                }
            });
        }
        onDisable() {
        }
        onUpdate() {
            if (this._scrol_XYXZS_lForward) {
                this._l_XYXZS_ist.scrollBar.value += 100 * Laya.timer.delta / 1000;
                if (this._l_XYXZS_ist.scrollBar.value >= this._l_XYXZS_ist.scrollBar.max) {
                    this._scrol_XYXZS_lForward = false;
                }
            }
            else {
                this._l_XYXZS_ist.scrollBar.value -= 100 * Laya.timer.delta / 1000;
                if (this._l_XYXZS_ist.scrollBar.value <= 0) {
                    this._scrol_XYXZS_lForward = true;
                }
            }
        }
        onListRender(cell, index) {
            var data = this._l_XYXZS_ist.array[index];
            var loopAdBox = cell.getComponent(Loop_XYXZS_AdBox);
            loopAdBox.setData(data);
        }
    }

    class Banne_XYXZS_rAdView extends Laya.Script {
        constructor() {
            super(...arguments);
            this.AdPo_XYXZS_sID = Shar_XYXZS_eAd.Banner_XYXZS_AdLocationID;
            this._d_XYXZS_ata = null;
            this._wxB_XYXZS_anner = null;
        }
        onAwake() {
            this._d_XYXZS_isplaySp = this.owner.getChildByName("Display");
            if (null == this._d_XYXZS_isplaySp) {
                this._d_XYXZS_isplaySp = this.owner;
            }
        }
        onEnable() {
            this._d_XYXZS_isplaySp.on(Laya.Event.CLICK, this, this.onSpC_XYXZS_lick);
            var banner = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().ba_XYXZS_nner;
            if (0 == banner) {
                this.refresh_XYXZS_BannerDis();
            }
            else if (1 == banner) {
                this.refresh_XYXZS_WXBanner();
            }
        }
        onDisable() {
            this._d_XYXZS_isplaySp.off(Laya.Event.CLICK, this, this.onSpC_XYXZS_lick);
            this.clear_XYXZS_WXBaner();
        }
        refresh_XYXZS_BannerDis() {
            var self = this;
            Shar_XYXZS_eAd.ge_XYXZS_tADVs(this.AdPo_XYXZS_sID, (datas) => {
                if (datas && datas.length > 0) {
                    var data = datas[Math.floor(Math.random() * datas.length)];
                    self._d_XYXZS_isplaySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                        if (!self._d_XYXZS_isplaySp.destroyed) {
                        }
                    }));
                    self._d_XYXZS_ata = data;
                }
            }, false);
        }
        onSpC_XYXZS_lick() {
            var data = this._d_XYXZS_ata;
            if (data) {
                console.log("跳转游戏： " + data.title);
                if (Laya.Browser.onMiniGame) {
                    W_XYXZS_XAPI.navigateT_XYXZS_oMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                        A_XYXZS_LD.aldSend_XYXZS_ReportAdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败");
                        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            A_XYXZS_LD.aldSend_XYXZS_ReportAdClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQGMiniGame) {
                    OPP_XYXZS_OAPI.navigat_XYXZS_eToMiniProgram(data.appid, data.title, data.url, (res) => {
                        console.log("跳转成功");
                        Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQQMiniGame) {
                    QQMini_XYXZS_GameAPI.navigateToMi_XYXZS_niProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Shar_XYXZS_eAd.reportUs_XYXZS_erClick(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.AD_OnShare_XYXZS_AdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
            }
        }
        refresh_XYXZS_WXBanner() {
            if (!Laya.Browser.onMiniGame || !this.owner.visible)
                return;
            this.clear_XYXZS_WXBaner();
            var self = this;
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            var pos = this._d_XYXZS_isplaySp.localToGlobal(new Laya.Point(0, 0));
            var left = pos.x / Laya.stage.width * sw;
            var top = pos.y / Laya.stage.height * sh;
            var width = this.WXBann_XYXZS_erWidth ? this.WXBann_XYXZS_erWidth / Laya.stage.width * sw : sw;
            this._wxB_XYXZS_anner = Laya.Browser.window["wx"].createBannerAd({
                adUnitId: W_XYXZS_XAPI.bann_XYXZS_erAdUnitId,
                adIntervals: 30,
                style: {
                    left: left,
                    top: top,
                    width: width,
                }
            });
            self._wxB_XYXZS_anner.onLoad((res) => {
                console.log("WXBanner广告 加载完成");
                console.log(res);
            });
            this._wxB_XYXZS_anner.onError((err) => {
                console.log("WXBanner广告 加载失败");
                console.log(err);
                self.refresh_XYXZS_BannerDis();
                self.clear_XYXZS_WXBaner();
            });
            this._wxB_XYXZS_anner.onResize(res => {
                console.log(self._wxB_XYXZS_anner.style.realWidth, self._wxB_XYXZS_anner.style.realHeight);
            });
            self._wxB_XYXZS_anner.show();
        }
        clear_XYXZS_WXBaner() {
            if (this._wxB_XYXZS_anner) {
                this._wxB_XYXZS_anner.destroy();
            }
            this._wxB_XYXZS_anner = null;
        }
        onView__XYXZS_XYXZS_Show() {
            var banner = AppSwi_XYXZS_tchConfig.getIn_XYXZS_stance().getAppSwi_XYXZS_tchData().ba_XYXZS_nner;
            if (1 == banner && null == this._wxB_XYXZS_anner) {
                this.refresh_XYXZS_WXBanner();
            }
        }
        onViewHide() {
            this.clear_XYXZS_WXBaner();
        }
    }

    class Unive_XYXZS_rsalBottomZone extends Laya.Script {
        onAwake() {
            this._owne_XYXZS_rSprite = this.owner;
            this._aut_XYXZS_oZone = this._owne_XYXZS_rSprite.getChildByName("AutoZone");
            this._loop_XYXZS_ADZone = this._owne_XYXZS_rSprite.getChildByName("LoopAD");
            this._bann_XYXZS_erADZone = this._owne_XYXZS_rSprite.getChildByName("BannerAD");
            this._bann_XYXZS_erAd = this._bann_XYXZS_erADZone.getComponent(Banne_XYXZS_rAdView);
        }
        onEnable() {
            var aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                this._aut_XYXZS_oZone.bottom = this._loop_XYXZS_ADZone.height + this._bann_XYXZS_erADZone.height;
                this._loop_XYXZS_ADZone.bottom = this._bann_XYXZS_erADZone.height;
                this._bann_XYXZS_erADZone.visible = true;
            }
            else {
                this._aut_XYXZS_oZone.bottom = this._loop_XYXZS_ADZone.height;
                this._loop_XYXZS_ADZone.bottom = 0;
                this._bann_XYXZS_erADZone.visible = false;
            }
        }
        onDisable() {
        }
        onUpdate() {
            if (!this._bann_XYXZS_erADZone.visible) {
                this._bann_XYXZS_erAd.clear_XYXZS_WXBaner();
            }
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Mgr/GameMgr.ts", Gam_XYXZS_eMgr);
            reg("KRQ/Com/KRQ_LoopAd/KRQ_LoopAdBox.ts", KRQ_Loo_XYXZS_pAdBox);
            reg("KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd.ts", KRQ_VL_XYXZS_oopAd);
            reg("KRQ/Com/KRQ_Banner.ts", KRQ__XYXZS_Banner);
            reg("KRQ/ViewCom/KRQ_Export.ts", KRQ_E_XYXZS_xport);
            reg("KRQ/Com/KRQ_RockSingleAd.ts", KRQ_Roc_XYXZS_kSingleAd);
            reg("KRQ/ViewCom/KRQ_Floating.ts", KRQ_Fl_XYXZS_oating);
            reg("KRQ/Com/KRQ_RollSingleAd.ts", KRQ_Rol_XYXZS_lSingleAd);
            reg("KRQ/ViewCom/KRQ_GameOver.ts", KRQ_G_XYXZS_ameOver);
            reg("KRQ/ViewCom/KRQ_SidePull.ts", KRQ_Sid_XYXZS_ePull);
            reg("KRQ/Com/KRQ_LoopAd/KRQ_HLoopAd.ts", KRQ_HL_XYXZS_oopAd);
            reg("KRQ/ViewCom/KRQ_Main.ts", KRQ__XYXZS_Main);
            reg("KRQ/Com/KRQ_History/KRQ_HistoryBox.ts", KRQ_Hist_XYXZS_oryBox);
            reg("KRQ/Com/KRQ_History/KRQ_History.ts", KRQ__XYXZS_History);
            reg("KRQ/Com/KRQ_SingleAd.ts", KRQ_Si_XYXZS_ngleAd);
            reg("View/TwinkleSprite.ts", TwinkleS_XYXZS_prite);
            reg("View/ClickGetPrize/ClickGetPrize.ts", ClickG_XYXZS_etPrize);
            reg("View/ButtonAnim.ts", Butt_XYXZS_onAnim);
            reg("Scrips/MyView/GameView/MainView/SkeletonPlayWin.ts", SkeletonPlayWin);
            reg("Scrips/MyView/GameView/GameOverView/GameOverView.ts", GameO_XYXZS_verView);
            reg("Script/GameView/Controller.ts", Controller);
            reg("Scrips/MyView/GameView/GameView/GameView.ts", GameView);
            reg("Scrips/MyView/GameView/MainView/Gold.ts", Gold);
            reg("Scrips/MyView/GameView/GameView/BadTooth.ts", BadTooth);
            reg("Scrips/MyView/GameView/GameView/ToothShow.ts", ToothShow);
            reg("Scrips/MyView/GameView/MainView/ShowLever.ts", ShowLever);
            reg("View/LoadingView/LoadingView.ts", Load_XYXZS_ingView);
            reg("Scrips/MyView/GameView/MainView/SkeletonPlay.ts", SkeletonPlay);
            reg("Scrips/MyView/GameView/MainView/JumpButton.ts", JumpButton);
            reg("Scrips/MyView/GameView/MainView/MainView.ts", MainView);
            reg("Scrips/MyView/GameView/MoreGameView/MoreGameView.ts", MoreGameView);
            reg("View/TipsView/TipsView.ts", Tip_XYXZS_sView);
            reg("ShareAd/View/LoopAdBox.ts", Loop_XYXZS_AdBox);
            reg("ShareAd/View/HorizontalLoopAdView.ts", Horizont_XYXZS_alLoopAdView);
            reg("ShareAd/View/BannerAdView.ts", Banne_XYXZS_rAdView);
            reg("View/Common/UniversalBottomZone.ts", Unive_XYXZS_rsalBottomZone);
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

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var View;
        (function (View) {
            class LoadingUI extends Laya.View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.createView(LoadingUI.uiView);
                }
            }
            LoadingUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "texture": "切图/loading/loading背景.png" }, "compId": 39 }, { "type": "Box", "props": { "top": 0, "right": 0, "name": "Bg", "left": 0, "bottom": 0 }, "compId": 6, "child": [{ "type": "Image", "props": { "x": 49, "top": 150, "skin": "切图/loading/logo.png", "centerX": 0 }, "compId": 37 }, { "type": "Image", "props": { "width": 725, "skin": "切图/loading/loading下条.png", "sizeGrid": "10,23,10,23", "name": "processBarBg", "height": 54, "centerX": 0, "bottom": 250 }, "compId": 8, "child": [{ "type": "Clip", "props": { "width": 713, "skin": "切图/loading/loading上条.png", "sizeGrid": "12,28,10,26", "pivotY": 22, "name": "processBar", "left": 6, "height": 42, "bottom": 7 }, "compId": 5 }, { "type": "Sprite", "props": { "y": -53, "x": 280, "texture": "切图/loading/LOADING.png" }, "compId": 38 }] }] }, { "type": "Script", "props": { "y": 0, "x": 0, "runtime": "View/LoadingView/LoadingView.ts" }, "compId": 7 }], "loadList": ["切图/loading/loading背景.png", "切图/loading/logo.png", "切图/loading/loading下条.png", "切图/loading/loading上条.png", "切图/loading/LOADING.png"], "loadList3D": [] };
            View.LoadingUI = LoadingUI;
            REG("ui.View.LoadingUI", LoadingUI);
        })(View = ui.View || (ui.View = {}));
    })(ui || (ui = {}));

    class TT_XYXZS_API {
        static tt_XYXZS_Login(onSuccess, onFail) {
            if (App_XYXZS_Config.onTTMi_XYXZS_niGame) {
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
            TT_XYXZS_API.init_XYXZS_Record();
        }
        static onRewarde_XYXZS_dVideoAdLoad() {
            console.log('激励视频 广告加载完成');
        }
        static onRewar_XYXZS_dedVideoAdError(err) {
            console.log('激励视频 广告加载失败' + err);
            if (TT_XYXZS_API._onRewarded_XYXZS_VideoAdFailed) {
                TT_XYXZS_API._onRewarded_XYXZS_VideoAdFailed();
            }
        }
        static onRewar_XYXZS_dedVideoAdClose(res) {
            if ((res && res.isEnded) || res == null) {
                console.log('激励视频 已完整观看');
                if (TT_XYXZS_API._onRewarded_XYXZS_VideoAdClose) {
                    TT_XYXZS_API._onRewarded_XYXZS_VideoAdClose(true);
                }
            }
            else {
                console.log('激励视频 未完整观看');
                if (TT_XYXZS_API._onRewarded_XYXZS_VideoAdClose) {
                    TT_XYXZS_API._onRewarded_XYXZS_VideoAdClose(false);
                }
            }
        }
        static regRewar_XYXZS_dedVideoAdEvent(rewardedVideoAd) {
            rewardedVideoAd.onLoad(TT_XYXZS_API.onRewarde_XYXZS_dVideoAdLoad);
            rewardedVideoAd.onError(TT_XYXZS_API.onRewar_XYXZS_dedVideoAdError);
            rewardedVideoAd.onClose(TT_XYXZS_API.onRewar_XYXZS_dedVideoAdClose);
            TT_XYXZS_API._isRegReward_XYXZS_edVideoAdEvent = true;
        }
        static showRewar_XYXZS_dedVideoAd(onAdClose, onFailed) {
            if (App_XYXZS_Config.onTTMi_XYXZS_niGame) {
                TT_XYXZS_API._onRewarded_XYXZS_VideoAdClose = onAdClose;
                TT_XYXZS_API._onRewarded_XYXZS_VideoAdFailed = onFailed;
                var rewardedVideoAd = Laya.Browser.window["tt"].createRewardedVideoAd({
                    adUnitId: TT_XYXZS_API.adUn_XYXZS_itId,
                });
                if (!TT_XYXZS_API._isRegReward_XYXZS_edVideoAdEvent) {
                    TT_XYXZS_API.regRewar_XYXZS_dedVideoAdEvent(rewardedVideoAd);
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
        static init_XYXZS_Record() {
            TT_XYXZS_API.re_XYXZS_cord = Laya.Browser.window["tt"].getGameRecorderManager();
            if (TT_XYXZS_API.re_XYXZS_cord != null) {
                TT_XYXZS_API.re_XYXZS_cord.onStart(res => {
                    console.log("录屏开始");
                    TT_XYXZS_API.rec_XYXZS_ordRes = "";
                });
                TT_XYXZS_API.re_XYXZS_cord.onStop(res => {
                    console.log("录屏结束");
                    TT_XYXZS_API.rec_XYXZS_ordRes = res.videoPath;
                });
            }
        }
        static start_XYXZS_Record(duration = 300) {
            if (!App_XYXZS_Config.onTTMi_XYXZS_niGame)
                return;
            TT_XYXZS_API.re_XYXZS_cord.start({
                duration
            });
        }
        static stop_XYXZS_Record() {
            if (!App_XYXZS_Config.onTTMi_XYXZS_niGame)
                return;
            TT_XYXZS_API.re_XYXZS_cord.stop();
        }
        static sha_XYXZS_reRecord(callback = null) {
            if (!App_XYXZS_Config.onTTMi_XYXZS_niGame)
                return;
            if (TT_XYXZS_API.rec_XYXZS_ordRes != "") {
                window["tt"].shareAppMessage({
                    channel: "video",
                    extra: {
                        videoPath: TT_XYXZS_API.rec_XYXZS_ordRes,
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
        static s_XYXZS_hare(complate = null) {
            if (!App_XYXZS_Config.onTTMi_XYXZS_niGame)
                return;
            window["tt"].shareAppMessage({
                templateId: TT_XYXZS_API._tem_XYXZS_plateId,
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
        static show_XYXZS_Banner() {
        }
    }
    TT_XYXZS_API.adUn_XYXZS_itId = "";
    TT_XYXZS_API.bann_XYXZS_erAdUnitId = "";
    TT_XYXZS_API.Ins_XYXZS_AdUnitId = "";
    TT_XYXZS_API._tem_XYXZS_plateId = "";
    TT_XYXZS_API.rec_XYXZS_ordRes = "";
    TT_XYXZS_API._b_XYXZS_anner = null;
    TT_XYXZS_API._isRegReward_XYXZS_edVideoAdEvent = false;
    TT_XYXZS_API._onRewarded_XYXZS_VideoAdFailed = null;
    TT_XYXZS_API._onRewarded_XYXZS_VideoAdClose = null;

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
            if (true == App_XYXZS_Config.onTTMi_XYXZS_niGame) {
                Laya.Browser.onMiniGame = false;
            }
            if (!Laya.Browser.onMiniGame
                && !Laya.Browser.onQGMiniGame
                && !Laya.Browser.onQQMiniGame
                && !App_XYXZS_Config.onTTMi_XYXZS_niGame) {
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
                { url: App_XYXZS_Config.ResSe_XYXZS_rver + "/json/appswitch.json", type: Laya.Loader.JSON }
            ];
            var self = this;
            Laya.loader.load(firstConfigs, Laya.Handler.create(this, () => {
                self.loadRes();
            }));
            Even_XYXZS_tMgr.in_XYXZS_stance.reg_XYXZS_OnceEvent(Even_XYXZS_tDef.App_Close_XYXZS_FirstLoadingView, this, this.closeloadingUI);
        }
        initLoadingView() {
            this._loadingUI = new ui.View.LoadingUI();
            Laya.stage.addChild(this._loadingUI);
            this._loadingUI.width = Laya.stage.width;
            this._loadingUI.height = Laya.stage.height;
            this._loadingView = this._loadingUI.getComponent(Load_XYXZS_ingView);
            this._loadingView.setP_XYXZS_rocess(0);
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
                                self._loadingView.setP_XYXZS_rocess(res / 2 + 0.5);
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
                    self._loadingView.setP_XYXZS_rocess(res / 2);
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
                                self._loadingView.setP_XYXZS_rocess(res / 2 + 0.5);
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
                    self._loadingView.setP_XYXZS_rocess(progress / 2);
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
                                self._loadingView.setP_XYXZS_rocess(res / 2 + 0.5);
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
                    self._loadingView.setP_XYXZS_rocess(res / 2);
                });
            }
            else {
                if (resource.length > 0) {
                    Laya.loader.load(resource, Laya.Handler.create(this, () => {
                        self.onLoadResComplate();
                    }), Laya.Handler.create(this, (res) => {
                        self._loadingView.setP_XYXZS_rocess(res);
                    }));
                }
                else {
                    self.onLoadResComplate();
                }
            }
        }
        onLoadResComplate() {
            var self = this;
            this._loadingView.setP_XYXZS_rocess(1);
            if (Laya.Browser.onMiniGame) {
                W_XYXZS_XAPI.wxL_XYXZS_ogin(function (code) {
                    Us_XYXZS_er.c_XYXZS_ode = code;
                    Http_XYXZS_Unit.log_XYXZS_in((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            Us_XYXZS_er.to_XYXZS_ken = res.data.token;
                            Us_XYXZS_er.o_XYXZS_penId = res.data.openid;
                            A_XYXZS_LD.aldSe_XYXZS_ndOpenId(Us_XYXZS_er.o_XYXZS_penId);
                            Http_XYXZS_Unit.getGa_XYXZS_meData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    Us_XYXZS_er.init_XYXZS_iUser(res.data);
                                }
                                else {
                                    Us_XYXZS_er.init_XYXZS_iUser(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                Us_XYXZS_er.to_XYXZS_ken = "";
                                Us_XYXZS_er.o_XYXZS_penId = "";
                                Us_XYXZS_er.init_XYXZS_iUser(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！" + res);
                            Us_XYXZS_er.init_XYXZS_iUser(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！" + res);
                        Us_XYXZS_er.init_XYXZS_iUser(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else if (Laya.Browser.onQGMiniGame) {
                OPP_XYXZS_OAPI.initA_XYXZS_dService(() => {
                }, () => {
                }, () => {
                });
                OPP_XYXZS_OAPI.Lo_XYXZS_gin(function (token) {
                    Us_XYXZS_er.c_XYXZS_ode = token;
                    Http_XYXZS_Unit.log_XYXZS_in((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            Us_XYXZS_er.to_XYXZS_ken = res.data.token;
                            Us_XYXZS_er.o_XYXZS_penId = res.data.openid;
                            Http_XYXZS_Unit.getGa_XYXZS_meData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    Us_XYXZS_er.init_XYXZS_iUser(res.data);
                                    console.log("获取用户数据--------------------Start");
                                    for (var key in res.data) {
                                        console.log(key, res.data[key]);
                                    }
                                    console.log("获取用户数据--------------------End");
                                }
                                else {
                                    Us_XYXZS_er.init_XYXZS_iUser(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                Us_XYXZS_er.to_XYXZS_ken = "";
                                Us_XYXZS_er.o_XYXZS_penId = "";
                                Us_XYXZS_er.init_XYXZS_iUser(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！", res);
                            Us_XYXZS_er.init_XYXZS_iUser(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！", res);
                        Us_XYXZS_er.init_XYXZS_iUser(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else if (Laya.Browser.onQQMiniGame) {
                QQMini_XYXZS_GameAPI.Lo_XYXZS_gin(function (code) {
                    Us_XYXZS_er.c_XYXZS_ode = code;
                    Http_XYXZS_Unit.log_XYXZS_in((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            Us_XYXZS_er.to_XYXZS_ken = res.data.token;
                            Us_XYXZS_er.o_XYXZS_penId = res.data.openid;
                            A_XYXZS_LD.aldSe_XYXZS_ndOpenId(Us_XYXZS_er.o_XYXZS_penId);
                            Http_XYXZS_Unit.getGa_XYXZS_meData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    Us_XYXZS_er.init_XYXZS_iUser(res.data);
                                }
                                else {
                                    Us_XYXZS_er.init_XYXZS_iUser(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                Us_XYXZS_er.to_XYXZS_ken = "";
                                Us_XYXZS_er.o_XYXZS_penId = "";
                                Us_XYXZS_er.init_XYXZS_iUser(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！" + res);
                            Us_XYXZS_er.init_XYXZS_iUser(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！" + res);
                        Us_XYXZS_er.init_XYXZS_iUser(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else if (App_XYXZS_Config.onTTMi_XYXZS_niGame) {
                TT_XYXZS_API.tt_XYXZS_Login(function (code) {
                    Us_XYXZS_er.c_XYXZS_ode = code;
                    Http_XYXZS_Unit.log_XYXZS_in((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            Us_XYXZS_er.to_XYXZS_ken = res.data.token;
                            Us_XYXZS_er.o_XYXZS_penId = res.data.openid;
                            Http_XYXZS_Unit.getGa_XYXZS_meData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    Us_XYXZS_er.init_XYXZS_iUser(res.data);
                                }
                                else {
                                    Us_XYXZS_er.init_XYXZS_iUser(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                Us_XYXZS_er.to_XYXZS_ken = "";
                                Us_XYXZS_er.o_XYXZS_penId = "";
                                Us_XYXZS_er.init_XYXZS_iUser(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！" + res);
                            Us_XYXZS_er.init_XYXZS_iUser(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！" + res);
                        Us_XYXZS_er.init_XYXZS_iUser(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else {
                Us_XYXZS_er.testIn_XYXZS_itUser();
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
