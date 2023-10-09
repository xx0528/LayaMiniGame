(function () {
    'use strict';

    class Utilit_ZMDGJ_ {
        static Lerp_ZMDGJ_(form, to, delta) {
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
        static lerp_ZMDGJ_Euler_ZMDGJ_Angle(form, to, delta) {
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
            var next = Utilit_ZMDGJ_.Lerp_ZMDGJ_(form, to, delta);
            return next;
        }
        static get_ZMDGJ_RotationBy_ZMDGJ_Dir(v) {
            var dotValue = (v.x * Utilit_ZMDGJ_.poin_ZMDGJ_Down.x) + (v.y * Utilit_ZMDGJ_.poin_ZMDGJ_Down.y);
            var cos = dotValue / (v.distance(0, 0) * Utilit_ZMDGJ_.poin_ZMDGJ_Down.distance(0, 0));
            var radian = Math.acos(cos);
            var rotation = radian / (2 * Math.PI) * 360;
            if (v.x < 0) {
                rotation = -rotation;
            }
            return rotation;
        }
        static get_ZMDGJ_Rotation_ZMDGJ_ByDirOn3DSpace(v) {
            var dotValue = (v.x * Utilit_ZMDGJ_.poin_ZMDGJ_Up.x) + (v.y * Utilit_ZMDGJ_.poin_ZMDGJ_Up.y);
            var cos = dotValue / (v.distance(0, 0) * Utilit_ZMDGJ_.poin_ZMDGJ_Up.distance(0, 0));
            var radian = Math.acos(cos);
            var rotation = radian / (2 * Math.PI) * 360;
            if (v.x < 0) {
                rotation = rotation + (180 - rotation) * 2;
            }
            return rotation;
        }
        static get_ZMDGJ_DirBy_ZMDGJ_Rotation(rotation) {
            var radian = (rotation - 90) * Math.PI / 180;
            var x = Math.cos(radian);
            var y = Math.sin(radian);
            var point = new Laya.Point(x, y);
            point.normalize();
            return point;
        }
        static get_ZMDGJ_DirDir_ZMDGJ_Angle(dir1, dir2) {
            var dotValue = (dir1.x * dir2.x) + (dir1.y * dir2.y);
            var cos = dotValue / (dir1.distance(0, 0) * dir2.distance(0, 0));
            var radian = Math.acos(cos);
            var angle = radian / (2 * Math.PI) * 360;
            return angle;
        }
        static get_ZMDGJ_Dir_ZMDGJ_ScalarLength(dir) {
            var sl = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
            return sl;
        }
        static set_ZMDGJ_SpOn_ZMDGJ_ParentCenter(sp) {
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
        static get_ZMDGJ_Point_ZMDGJ_To_ZMDGJ_Line_ZMDGJ_Distance(x, y, LineStart, LineEnd) {
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
        static is_ZMDGJ_IphoneX() {
            if (!Laya.Browser.onIPhone)
                return false;
            if ((Laya.Browser.width == 2436 && Laya.Browser.height == 1125)
                || (Laya.Browser.height == 2436 && Laya.Browser.width == 1125)) {
                return true;
            }
            return false;
        }
        static is_ZMDGJ_Iphone6() {
            if (!Laya.Browser.onIPhone)
                return false;
            if (Laya.Browser.onMiniGame) {
                var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
                if (sysInfo.model.indexOf("iPhone 6") > -1) {
                    return true;
                }
            }
            return false;
        }
        static is_ZMDGJ_Iphone() {
            return Laya.Browser.onIPhone;
        }
        static get_ZMDGJ_Child(node, name) {
            for (var i = 0; i < node.numChildren; ++i) {
                var child = node.getChildAt(i);
                if (child.name == name) {
                    return child;
                }
                else {
                    var target = Utilit_ZMDGJ_.get_ZMDGJ_Child(child, name);
                    if (target)
                        return target;
                }
            }
            return null;
        }
        static for_ZMDGJ_Each_ZMDGJ_Child(node, each) {
            for (let i = 0; i < node.numChildren; ++i) {
                let child = node.getChildAt(i);
                each(child);
                Utilit_ZMDGJ_.for_ZMDGJ_Each_ZMDGJ_Child(child, each);
            }
        }
    }
    Utilit_ZMDGJ_.Origin_ZMDGJ_StageWidth = 1334;
    Utilit_ZMDGJ_.Origin_ZMDGJ_StageHeight = 750;
    Utilit_ZMDGJ_.grayscale_ZMDGJ_Mat = [0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0.3086, 0.6094, 0.0820, 0, 0,
        0, 0, 0, 1, 0];
    Utilit_ZMDGJ_.grayscale_ZMDGJ_Filter = new Laya.ColorFilter(Utilit_ZMDGJ_.grayscale_ZMDGJ_Mat);
    Utilit_ZMDGJ_.poin_ZMDGJ_Down = new Laya.Point(0, -1);
    Utilit_ZMDGJ_.poin_ZMDGJ_Up = new Laya.Point(0, 1);

    class App_ZMDGJ_Config {
    }
    App_ZMDGJ_Config.App_ZMDGJ_ID = "";
    App_ZMDGJ_Config.Res_ZMDGJ_Server = "";
    App_ZMDGJ_Config.Local_ZMDGJ_Test_ZMDGJ_ReServer = "subRes";
    App_ZMDGJ_Config.Versions_ZMDGJ_ = "1.0.0";
    App_ZMDGJ_Config.onTTMiniGame = false;
    App_ZMDGJ_Config.Game_ZMDGJ_Name = "";
    App_ZMDGJ_Config.showLoadingLogo = false;

    class App_ZMDGJ_Switch_ZMDGJ_Data {
        constructor() {
            this.ver_ZMDGJ_sion = "";
            this.ba_ZMDGJ_nner = 0;
            this.wu_ZMDGJ_dian = 0;
            this.wudianAvailableTime = {
                "0": 0, "1": 0, "2": 0, "3": 0,
                "4": 0, "5": 0, "6": 0, "7": 0,
                "8": 0, "9": 0, "10": 0, "11": 0,
                "12": 0, "13": 0, "14": 0, "15": 0,
                "16": 0, "17": 0, "18": 0, "19": 0,
                "20": 0, "21": 0, "22": 0, "23": 0
            };
            this.mai_ZMDGJ_liang = 1;
            this.mailiang_ZMDGJ_list = new Array();
            this.mailiang_ZMDGJ_Scene_ZMDGJ_List = new Array();
            this.wx_ZMDGJ_Wu_ZMDGJ_Dian_ZMDGJ_Banners = new Array();
            this.recreate_ZMDGJ_Banner_ZMDGJ_IDList = new Array();
            this.banner_ZMDGJ_Recreate_ZMDGJ_Time = 5;
            this.kuang_ZMDGJ_dian_ZMDGJ_jiange = 0;
            this.btn_ZMDGJ_Move_ZMDGJ_Timer = 1;
            this.banner_ZMDGJ_Move_ZMDGJ_Timer = 0.5;
            this.banner_ZMDGJ_Fresh_ZMDGJ_Timer = 200;
            this.banner_ZMDGJ_Create_ZMDGJ_FailNum = 3;
            this.banner_ZMDGJ_Today_ZMDGJ_Banner_ZMDGJ_Max = 10;
            this.ad_ZMDGJ_Switch = 1;
            this.wu_ZMDGJ_dian_ZMDGJ_Scene_ZMDGJ_List = new Array();
            this.continue_ZMDGJ_Btn_ZMDGJ_DelayTime = 2;
            this.banner_ZMDGJ_Show_ZMDGJ_Time = 30;
            this.fakeBtn = 0;
            this.pop_ZMDGJ_Ad = 0;
            this.continue_ZMDGJ_Banner = 0;
            this.continue_ZMDGJ_Banner_ZMDGJ_ShowTime = 2;
            this.continue_ZMDGJ_Banner_ZMDGJ_HideTime = 2;
            this.oppo_ZMDGJ_cfg = new OPPO_ZMDGJ_Cfg();
            this.qq_ZMDGJ_cfg = new QQ_ZMDGJ_Cfg();
            this.tt_ZMDGJ_cfg = new TT_ZMDGJ_Cfg();
            this.vivocfg = new VVcfg();
            this.wxcfg = new WXCfg();
        }
        get wudianTimeAvaliable() {
            return this.wudianAvailableTime[new Date().getHours()] == 1;
        }
    }
    class WXCfg {
        constructor() {
            this.kuang_ZMDGJ_dian_ZMDGJ_Banner = 0;
            this.kuang_ZMDGJ_dian_ZMDGJ_LevelSpcacing = 0;
            this.startKuangdianLevel = 1;
        }
    }
    class OPPO_ZMDGJ_Cfg {
        constructor() {
            this.yuan_ZMDGJ_sheng = 100;
            this.yuan_ZMDGJ_sheng_ZMDGJ_Switch = 1;
            this.add_ZMDGJ_To_ZMDGJ_Desktop = 0;
            this.oppo_ZMDGJ_versions = "";
            this.btn_ZMDGJ_Show_ZMDGJ_Timer = 0;
            this.index_ZMDGJ_Ad_ZMDGJ_Switch = 0;
            this.end_ZMDGJ_Ad_ZMDGJ_Switch = 0;
            this.yuan_ZMDGJ_sheng2 = 100;
            this.yuan_ZMDGJ_sheng_ZMDGJ_Switch2 = 1;
        }
    }
    class QQ_ZMDGJ_Cfg {
        constructor() {
            this.kuang_ZMDGJ_dian_ZMDGJ_Banner = 0;
            this.kuangdian_ZMDGJ_Box = 0;
            this.box = 0;
            this.wei_ZMDGJ_yi = 0;
            this.qq_ZMDGJ_versions = "";
        }
    }
    class TT_ZMDGJ_Cfg {
        constructor() {
            this.more_ZMDGJ_Game_ZMDGJ_Switch = 0;
            this.kuang_ZMDGJ_dian_ZMDGJ_Banner = 0;
            this.lu_ZMDGJ_ping = 0;
            this.tt_ZMDGJ_versions = "";
        }
    }
    class VVcfg {
        constructor() {
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
    }
    class App_ZMDGJ_Switch_ZMDGJ_Config {
        constructor() {
            this._data = new Array();
        }
        static get_ZMDGJ_Instance() {
            if (null == App_ZMDGJ_Switch_ZMDGJ_Config._instance) {
                App_ZMDGJ_Switch_ZMDGJ_Config._instance = App_ZMDGJ_Switch_ZMDGJ_Config.lo_ZMDGJ_ad();
            }
            return App_ZMDGJ_Switch_ZMDGJ_Config._instance;
        }
        static lo_ZMDGJ_ad() {
            var config = new App_ZMDGJ_Switch_ZMDGJ_Config();
            var json = Laya.loader.getRes(App_ZMDGJ_Config.Res_ZMDGJ_Server + "/json/appswitch.json");
            if (json) {
                for (var i = 0; i < json.length; ++i) {
                    var row = json[i];
                    var rowData = new App_ZMDGJ_Switch_ZMDGJ_Data();
                    rowData.ver_ZMDGJ_sion = String(row["version"]);
                    rowData.ba_ZMDGJ_nner = Number(row["banner"]);
                    rowData.wu_ZMDGJ_dian = Number(row["wudian"]);
                    rowData.wudianAvailableTime = Object(row["wudianTime"]);
                    rowData.mai_ZMDGJ_liang = Number(row["mailiang"]);
                    var mailianglist = row["mailianglist"];
                    if (null != mailianglist) {
                        for (var j = 0; j < mailianglist.length; ++j) {
                            var flag = Number(mailianglist[j]);
                            rowData.mailiang_ZMDGJ_list.push(flag);
                        }
                    }
                    var mailiangScenelist = row["mailiangScenelist"];
                    if (null != mailiangScenelist) {
                        for (var j = 0; j < mailiangScenelist.length; ++j) {
                            var sceneValue = Number(mailiangScenelist[j]);
                            rowData.mailiang_ZMDGJ_Scene_ZMDGJ_List.push(sceneValue);
                        }
                    }
                    var wxwudianbanners = row["wxwudianbanners"];
                    if (null != wxwudianbanners) {
                        for (var j = 0; j < wxwudianbanners.length; ++j) {
                            var bannerid = String(wxwudianbanners[j]);
                            rowData.wx_ZMDGJ_Wu_ZMDGJ_Dian_ZMDGJ_Banners.push(bannerid);
                        }
                    }
                    var recreateBannerIDList = row["recreateBannerIDList"];
                    if (null != recreateBannerIDList) {
                        for (var j = 0; j < recreateBannerIDList.length; ++j) {
                            let bannerid = String(recreateBannerIDList[j]);
                            rowData.recreate_ZMDGJ_Banner_ZMDGJ_IDList.push(bannerid);
                        }
                    }
                    rowData.banner_ZMDGJ_Recreate_ZMDGJ_Time = null != row["bannerRecreateTime"] ? Number(row["bannerRecreateTime"]) : rowData.banner_ZMDGJ_Recreate_ZMDGJ_Time;
                    rowData.kuang_ZMDGJ_dian_ZMDGJ_jiange = null != row["kuangdianjiange"] ? Number(row["kuangdianjiange"]) : rowData.kuang_ZMDGJ_dian_ZMDGJ_jiange;
                    rowData.btn_ZMDGJ_Move_ZMDGJ_Timer = Number(row["btnMoveTimer"]);
                    rowData.banner_ZMDGJ_Move_ZMDGJ_Timer = Number(row["bannerMoveTimer"]);
                    rowData.banner_ZMDGJ_Create_ZMDGJ_FailNum = Number(row["createFailNum"]);
                    rowData.banner_ZMDGJ_Fresh_ZMDGJ_Timer = Number(row["bannerFreshTimer"]);
                    rowData.banner_ZMDGJ_Today_ZMDGJ_Banner_ZMDGJ_Max = Number(row["todayBannerMax"]);
                    rowData.ad_ZMDGJ_Switch = Number(row["adSwitch"]);
                    var wudianSceneList = row["wudianSceneList"];
                    if (null != wudianSceneList) {
                        for (var j = 0; j < wudianSceneList.length; ++j) {
                            var wudianSceneValue = Number(wudianSceneList[j]);
                            rowData.wu_ZMDGJ_dian_ZMDGJ_Scene_ZMDGJ_List.push(wudianSceneValue);
                        }
                    }
                    rowData.continue_ZMDGJ_Btn_ZMDGJ_DelayTime = Number(row["continueBtnDelayTime"]);
                    rowData.banner_ZMDGJ_Show_ZMDGJ_Time = Number(row["bannerShowTime"]);
                    rowData.fakeBtn = null != row["fakeBtn"] ? Number(row["fakeBtn"]) : rowData.fakeBtn;
                    rowData.pop_ZMDGJ_Ad = null != row["popAd"] ? Number(row["popAd"]) : rowData.pop_ZMDGJ_Ad;
                    rowData.continue_ZMDGJ_Banner = null != row["continueBanner"] ? Number(row["continueBanner"]) : rowData.continue_ZMDGJ_Banner;
                    rowData.continue_ZMDGJ_Banner_ZMDGJ_ShowTime = null != row["continueBannerShowTime"] ? Number(row["continueBannerShowTime"]) : rowData.continue_ZMDGJ_Banner_ZMDGJ_ShowTime;
                    rowData.continue_ZMDGJ_Banner_ZMDGJ_HideTime = null != row["continueBannerHideTime"] ? Number(row["continueBannerHideTime"]) : rowData.continue_ZMDGJ_Banner_ZMDGJ_HideTime;
                    if (null != row["oppocfg"]) {
                        let cfg = row["oppocfg"];
                        rowData.oppo_ZMDGJ_cfg.yuan_ZMDGJ_sheng = Number(cfg["yuansheng"]);
                        rowData.oppo_ZMDGJ_cfg.yuan_ZMDGJ_sheng_ZMDGJ_Switch = Number(cfg["yuanshengSwitch"]);
                        rowData.oppo_ZMDGJ_cfg.add_ZMDGJ_To_ZMDGJ_Desktop = Number(cfg["addToDesktop"]);
                        rowData.oppo_ZMDGJ_cfg.oppo_ZMDGJ_versions = String(cfg["oppoversions"]);
                        rowData.oppo_ZMDGJ_cfg.btn_ZMDGJ_Show_ZMDGJ_Timer = Number(cfg["btnShowTimer"]);
                        rowData.oppo_ZMDGJ_cfg.index_ZMDGJ_Ad_ZMDGJ_Switch = Number(cfg["indexAdSwitch"]);
                        rowData.oppo_ZMDGJ_cfg.end_ZMDGJ_Ad_ZMDGJ_Switch = Number(cfg["endAdSwitch"]);
                        rowData.oppo_ZMDGJ_cfg.yuan_ZMDGJ_sheng2 = null != cfg["yuansheng2"] ? Number(cfg["yuansheng2"]) : rowData.oppo_ZMDGJ_cfg.yuan_ZMDGJ_sheng2;
                        rowData.oppo_ZMDGJ_cfg.yuan_ZMDGJ_sheng_ZMDGJ_Switch2 = null != cfg["yuanshengSwitch2"] ? Number(cfg["yuanshengSwitch2"]) : rowData.oppo_ZMDGJ_cfg.yuan_ZMDGJ_sheng_ZMDGJ_Switch2;
                    }
                    if (null != row["qqcfg"]) {
                        let cfg = row["qqcfg"];
                        rowData.qq_ZMDGJ_cfg.kuang_ZMDGJ_dian_ZMDGJ_Banner = Number(cfg["kuangdianBanner"]);
                        rowData.qq_ZMDGJ_cfg.kuangdian_ZMDGJ_Box = Number(cfg["kuangdianBox"]);
                        rowData.qq_ZMDGJ_cfg.box = Number(cfg["box"]);
                        rowData.qq_ZMDGJ_cfg.wei_ZMDGJ_yi = Number(cfg["weiyi"]);
                        rowData.qq_ZMDGJ_cfg.qq_ZMDGJ_versions = String(cfg["qqversions"]);
                    }
                    if (null != row["ttcfg"]) {
                        let cfg = row["ttcfg"];
                        rowData.tt_ZMDGJ_cfg.more_ZMDGJ_Game_ZMDGJ_Switch = Number(cfg["moreGameSwitch"]);
                        rowData.tt_ZMDGJ_cfg.kuang_ZMDGJ_dian_ZMDGJ_Banner = Number(cfg["kuangdianBanner"]);
                        rowData.tt_ZMDGJ_cfg.lu_ZMDGJ_ping = Number(cfg["luping"]);
                        rowData.tt_ZMDGJ_cfg.tt_ZMDGJ_versions = String(cfg["ttversions"]);
                    }
                    if (null != row["vivocfg"]) {
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
                    if (null != row["wxcfg"]) {
                        let cfg = row["wxcfg"];
                        rowData.wxcfg.kuang_ZMDGJ_dian_ZMDGJ_Banner = Number(cfg["kuangdianBanner"]);
                        rowData.wxcfg.kuang_ZMDGJ_dian_ZMDGJ_LevelSpcacing = Number(cfg["kuangdianLevelSpcacing"]);
                        rowData.wxcfg.startKuangdianLevel = Number(cfg["startKuangdianLevel"]);
                    }
                    config._data.push(rowData);
                }
                return config;
            }
            else {
                config._data.push(new App_ZMDGJ_Switch_ZMDGJ_Data());
                return config;
            }
        }
        get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data() {
            return this._data[0];
        }
    }

    class Net_ZMDGJ_Config {
    }
    Net_ZMDGJ_Config.state_ZMDGJ_ = 0;
    Net_ZMDGJ_Config.game_ZMDGJ_id = 68;
    Net_ZMDGJ_Config.server_ZMDGJ_Url = "";
    Net_ZMDGJ_Config.Login_ZMDGJ_ = "";
    Net_ZMDGJ_Config.Save_ZMDGJ_Game_ZMDGJ_Data = "";
    Net_ZMDGJ_Config.Get_ZMDGJ_User = "";
    Net_ZMDGJ_Config.Ip_ZMDGJ_Block = "";
    Net_ZMDGJ_Config.report_ZMDGJ_Export = "";
    Net_ZMDGJ_Config.report_ZMDGJ_Import = "";
    Net_ZMDGJ_Config.get_ZMDGJ_user_ZMDGJ_ip = "";
    Net_ZMDGJ_Config.signin = "";

    var EventDispatcher = Laya.EventDispatcher;
    class Event_ZMDGJ_Mgr extends EventDispatcher {
        constructor() {
            super();
        }
        ;
        dis_ZMDGJ_patch(InName, agv) {
            Event_ZMDGJ_Mgr.eventDispatcher.event(InName, agv);
        }
        reg_ZMDGJ_Evemt(InName, caller, listener, arg) {
            Event_ZMDGJ_Mgr.eventDispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
        }
        reg_ZMDGJ_OnceEvent(InName, caller, listener, arg) {
            Event_ZMDGJ_Mgr.eventDispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
        }
        remove_ZMDGJ_Event(InName, caller, listener, arg) {
            Event_ZMDGJ_Mgr.eventDispatcher.off(InName, caller, listener);
        }
    }
    Event_ZMDGJ_Mgr.eventDispatcher = new EventDispatcher();
    Event_ZMDGJ_Mgr.ins_ZMDGJ_tance = new Event_ZMDGJ_Mgr();

    var Event_ZMDGJ_Def;
    (function (Event_ZMDGJ_Def) {
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["None"] = 0] = "None";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["App_Close_ZMDGJ_First_ZMDGJ_Loading_ZMDGJ_View"] = 500] = "App_Close_ZMDGJ_First_ZMDGJ_Loading_ZMDGJ_View";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["AD_On_ZMDGJ_ShareAd_ZMDGJ_Fail"] = 501] = "AD_On_ZMDGJ_ShareAd_ZMDGJ_Fail";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["Game_On_ZMDGJ_View_ZMDGJ_Open"] = 600] = "Game_On_ZMDGJ_View_ZMDGJ_Open";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["Game_On_ZMDGJ_View_ZMDGJ_Close"] = 601] = "Game_On_ZMDGJ_View_ZMDGJ_Close";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change"] = 701] = "Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["Game_On_ZMDGJ_User_ZMDGJ_Crystal_ZMDGJ_Change"] = 702] = "Game_On_ZMDGJ_User_ZMDGJ_Crystal_ZMDGJ_Change";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["Game_OnUserUnlockedStore"] = 703] = "Game_OnUserUnlockedStore";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["Game_On_ZMDGJ_Level_ZMDGJ_Start"] = 1000] = "Game_On_ZMDGJ_Level_ZMDGJ_Start";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["Game_On_ZMDGJ_Level_ZMDGJ_Complate"] = 1001] = "Game_On_ZMDGJ_Level_ZMDGJ_Complate";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["AD_Wu_ZMDGJ_dianBanner_Load_ZMDGJ_Complete"] = 2217] = "AD_Wu_ZMDGJ_dianBanner_Load_ZMDGJ_Complete";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["AD_Wu_ZMDGJ_dian_ZMDGJ_Banner_Show"] = 2218] = "AD_Wu_ZMDGJ_dian_ZMDGJ_Banner_Show";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["AD_Wu_ZMDGJ_dian_ZMDGJ_Banner__ZMDGJ_Hide"] = 2219] = "AD_Wu_ZMDGJ_dian_ZMDGJ_Banner__ZMDGJ_Hide";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["AD_Wu_ZMDGJ_dian_ZMDGJ_Banner_Pre_ZMDGJ_Load"] = 2220] = "AD_Wu_ZMDGJ_dian_ZMDGJ_Banner_Pre_ZMDGJ_Load";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["App_On_ZMDGJ_Update_ZMDGJ_IpBlockState"] = 2221] = "App_On_ZMDGJ_Update_ZMDGJ_IpBlockState";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["Game_OnInputMove"] = 10000] = "Game_OnInputMove";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["Game_OnInputStart"] = 10001] = "Game_OnInputStart";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["Game_OnInputRelease"] = 10002] = "Game_OnInputRelease";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["Game_TrySkin"] = 10003] = "Game_TrySkin";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["Game_BoxChange"] = 20001] = "Game_BoxChange";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["Game_BloodChange"] = 20002] = "Game_BloodChange";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["RewardVideoSuccess"] = 20010] = "RewardVideoSuccess";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["RewardVideoFail"] = 20011] = "RewardVideoFail";
        Event_ZMDGJ_Def[Event_ZMDGJ_Def["InsertVideoEnd"] = 20012] = "InsertVideoEnd";
    })(Event_ZMDGJ_Def || (Event_ZMDGJ_Def = {}));

    class User_ZMDGJ_Game_ZMDGJ_Data {
        constructor() {
            this.levelNum = 1;
            this.moneyNum = 0;
            this.crystalNum = 0;
            this.unlockedItem = [0];
            this.usedItem = 0;
        }
    }
    class User_ZMDGJ_ extends Laya.Script {
        static get is_ZMDGJ_Login() {
            return (User_ZMDGJ_.code_ZMDGJ_ != "") || (User_ZMDGJ_._ZMDGJ_token != "");
        }
        static get_ZMDGJ_Save_ZMDGJ_Data() {
            return JSON.stringify(User_ZMDGJ_._game_ZMDGJ_Data);
        }
        static test_ZMDGJ_InitUser() {
            var storageStr = Laya.LocalStorage.getItem("Game_Data");
            console.log("读取存储数据 str----" + storageStr);
            var data = JSON.parse(storageStr);
            if (data == null) {
                User_ZMDGJ_._game_ZMDGJ_Data.levelNum = 1;
                User_ZMDGJ_._game_ZMDGJ_Data.moneyNum = 0;
                User_ZMDGJ_._game_ZMDGJ_Data.crystalNum = 0;
                this.set_ZMDGJ_FakerLeveNum();
                return;
            }
            User_ZMDGJ_._game_ZMDGJ_Data.levelNum = data.levelNum;
            User_ZMDGJ_._game_ZMDGJ_Data.moneyNum = data.moneyNum;
            User_ZMDGJ_._game_ZMDGJ_Data.crystalNum = data.crystalNum;
            if (null != data.unlockedItem) {
                let unlockedItem = data.unlockedItem;
                for (let i = 0; i < unlockedItem.length; ++i) {
                    User_ZMDGJ_._game_ZMDGJ_Data.unlockedItem.push(unlockedItem[i]);
                }
            }
            if (null != data.usedItem) {
                User_ZMDGJ_._game_ZMDGJ_Data.usedItem = data.usedItem;
            }
            this.set_ZMDGJ_FakerLeveNum();
        }
        static initi_ZMDGJ_User(data) {
            if (data && 0 != data) {
                User_ZMDGJ_._game_ZMDGJ_Data.levelNum = data.levelNum;
                User_ZMDGJ_._game_ZMDGJ_Data.moneyNum = data.moneyNum;
                User_ZMDGJ_._game_ZMDGJ_Data.crystalNum = data.crystalNum;
                if (null != data.unlockedItem) {
                    let unlockedItem = data.unlockedItem;
                    for (let i = 0; i < unlockedItem.length; ++i) {
                        User_ZMDGJ_._game_ZMDGJ_Data.unlockedItem.push(unlockedItem[i]);
                    }
                }
                if (null != data.usedItem) {
                    User_ZMDGJ_._game_ZMDGJ_Data.usedItem = data.usedItem;
                }
            }
            else {
            }
            this.set_ZMDGJ_FakerLeveNum();
        }
        static set_ZMDGJ_LeveNum(levelNum) {
            User_ZMDGJ_._game_ZMDGJ_Data.levelNum = levelNum;
            this.set_ZMDGJ_FakerLeveNum();
        }
        static get_ZMDGJ_LeveNum() {
            return User_ZMDGJ_._game_ZMDGJ_Data.levelNum;
        }
        static set_ZMDGJ_FakerLeveNum() {
            if (User_ZMDGJ_.fakerLeveNum != User_ZMDGJ_.fakerNextLeveNum) {
                User_ZMDGJ_.fakerLeveNum = User_ZMDGJ_._game_ZMDGJ_Data.levelNum <= User_ZMDGJ_.maxLeveNum ? User_ZMDGJ_._game_ZMDGJ_Data.levelNum : User_ZMDGJ_.fakerNextLeveNum;
            }
            else {
                if (User_ZMDGJ_._game_ZMDGJ_Data.levelNum <= User_ZMDGJ_.maxLeveNum) {
                    User_ZMDGJ_.fakerLeveNum = User_ZMDGJ_._game_ZMDGJ_Data.levelNum;
                }
                else {
                    var tempNum = 1;
                    do {
                        tempNum = Math.ceil(Math.random() * User_ZMDGJ_.maxLeveNum);
                    } while (tempNum <= 0 || tempNum > User_ZMDGJ_.maxLeveNum);
                    User_ZMDGJ_.fakerLeveNum = tempNum;
                }
            }
            if (User_ZMDGJ_._game_ZMDGJ_Data.levelNum < User_ZMDGJ_.maxLeveNum) {
                User_ZMDGJ_.fakerNextLeveNum = User_ZMDGJ_._game_ZMDGJ_Data.levelNum + 1;
            }
            else {
                var tempNum = 1;
                do {
                    tempNum = Math.ceil(Math.random() * User_ZMDGJ_.maxLeveNum);
                } while (tempNum <= 0 || tempNum > User_ZMDGJ_.maxLeveNum || tempNum == User_ZMDGJ_.fakerLeveNum);
                User_ZMDGJ_.fakerNextLeveNum = tempNum;
            }
        }
        static get_ZMDGJ_FakerNextLeveNum() {
            return User_ZMDGJ_.fakerNextLeveNum;
        }
        static get_ZMDGJ_FakerLeveNum() {
            return User_ZMDGJ_.fakerLeveNum;
        }
        static add_ZMDGJ_Money(add) {
            add = Math.ceil(add);
            var last = User_ZMDGJ_._game_ZMDGJ_Data.moneyNum;
            User_ZMDGJ_._game_ZMDGJ_Data.moneyNum += add;
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change, {
                curr: User_ZMDGJ_._game_ZMDGJ_Data.moneyNum,
                last: last
            });
        }
        static sub_ZMDGJ_Money(sub) {
            sub = Math.ceil(sub);
            var last = User_ZMDGJ_._game_ZMDGJ_Data.moneyNum;
            User_ZMDGJ_._game_ZMDGJ_Data.moneyNum -= sub;
            if (User_ZMDGJ_._game_ZMDGJ_Data.moneyNum < 0) {
                User_ZMDGJ_._game_ZMDGJ_Data.moneyNum = 0;
            }
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change, {
                curr: User_ZMDGJ_._game_ZMDGJ_Data.moneyNum,
                last: last
            });
        }
        static get_ZMDGJ_Money() {
            return User_ZMDGJ_._game_ZMDGJ_Data.moneyNum;
        }
        static add_ZMDGJ_Crystal(add) {
            add = Math.ceil(add);
            var last = User_ZMDGJ_._game_ZMDGJ_Data.crystalNum;
            User_ZMDGJ_._game_ZMDGJ_Data.crystalNum += add;
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Crystal_ZMDGJ_Change, {
                curr: User_ZMDGJ_._game_ZMDGJ_Data.crystalNum,
                last: last
            });
        }
        static sub_ZMDGJ_Crystal(sub) {
            sub = Math.ceil(sub);
            var last = User_ZMDGJ_._game_ZMDGJ_Data.crystalNum;
            User_ZMDGJ_._game_ZMDGJ_Data.crystalNum -= sub;
            if (User_ZMDGJ_._game_ZMDGJ_Data.crystalNum < 0) {
                User_ZMDGJ_._game_ZMDGJ_Data.crystalNum = 0;
            }
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Crystal_ZMDGJ_Change, {
                curr: User_ZMDGJ_._game_ZMDGJ_Data.crystalNum,
                last: last
            });
        }
        static get_ZMDGJ_Crystal() {
            return User_ZMDGJ_._game_ZMDGJ_Data.crystalNum;
        }
        static getItemUnlocked() {
            let unlocked = new Array();
            for (let i = 0; i < User_ZMDGJ_._game_ZMDGJ_Data.unlockedItem.length; ++i) {
                unlocked.push(User_ZMDGJ_._game_ZMDGJ_Data.unlockedItem[i]);
            }
            return unlocked;
        }
        static itemIsUnlocked(id) {
            for (let i = 0; i < User_ZMDGJ_._game_ZMDGJ_Data.unlockedItem.length; ++i) {
                if (User_ZMDGJ_._game_ZMDGJ_Data.unlockedItem[i] == id) {
                    return true;
                }
            }
            return false;
        }
        static unlockItem(id) {
            if (User_ZMDGJ_.itemIsUnlocked(id)) {
                console.log("商店重复解锁 id : ", id);
                return;
            }
            User_ZMDGJ_._game_ZMDGJ_Data.unlockedItem.push(id);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_OnUserUnlockedStore, { unlocked: id });
        }
        static get curUsedItem() {
            return User_ZMDGJ_._game_ZMDGJ_Data.usedItem;
        }
        static set curUsedItem(value) {
            User_ZMDGJ_._game_ZMDGJ_Data.usedItem = value;
        }
    }
    User_ZMDGJ_.code_ZMDGJ_ = "";
    User_ZMDGJ_.openId_ZMDGJ_ = "";
    User_ZMDGJ_._ZMDGJ_token = null;
    User_ZMDGJ_.nick_ZMDGJ_Name = "";
    User_ZMDGJ_.gender_ZMDGJ_ = 0;
    User_ZMDGJ_.maxLeveNum = 20;
    User_ZMDGJ_.fakerLeveNum = 1;
    User_ZMDGJ_.fakerNextLeveNum = 1;
    User_ZMDGJ_._game_ZMDGJ_Data = new User_ZMDGJ_Game_ZMDGJ_Data();

    class Aes_ZMDGJ_Tools {
        static en_ZMDGJ_crypt(str) {
            return str;
        }
        static de_ZMDGJ_crypt(str) {
            return str;
        }
    }
    Aes_ZMDGJ_Tools._ZMDGJ_KEY_ZMDGJ_ = 'b#63fFJ6AvkK3YT*';
    Aes_ZMDGJ_Tools._ZMDGJ_IV_ZMDGJ_ = 'J$f4DU%sNL73M&Go';

    class request_ZMDGJ_Data {
        constructor() {
            this.meth_ZMDGJ_ = "post";
            this.url_ZMDGJ_ = "";
            this.on_ZMDGJ_Success = null;
            this.on_ZMDGJ_Fail = null;
            this._ZMDGJ_data_ZMDGJ_ = {};
        }
    }
    class Http_ZMDGJ_Unit {
        static request_ZMDGJ_(req) {
            if (req.url_ZMDGJ_.indexOf("https://") > -1 ||
                req.url_ZMDGJ_.indexOf("http://") > -1) {
                req.url_ZMDGJ_ = req.url_ZMDGJ_;
            }
            else {
                req.url_ZMDGJ_ = Net_ZMDGJ_Config.server_ZMDGJ_Url + req.url_ZMDGJ_;
            }
            var completeFunc = (res) => {
                console.log(res, "http Success");
                if (req.on_ZMDGJ_Success) {
                    req.on_ZMDGJ_Success(res);
                }
                req.on_ZMDGJ_Success = null;
                req = null;
            };
            var errorFunc = (res) => {
                console.log(res, "http fail");
                if (req.on_ZMDGJ_Fail) {
                    req.on_ZMDGJ_Fail(res);
                }
                req.on_ZMDGJ_Fail = null;
                req = null;
            };
            var xhr = new Laya.HttpRequest();
            xhr.once(Laya.Event.COMPLETE, Http_ZMDGJ_Unit, completeFunc);
            xhr.once(Laya.Event.ERROR, Http_ZMDGJ_Unit, errorFunc);
            let dataStr = JSON.stringify(req._ZMDGJ_data_ZMDGJ_);
            if (Laya.Browser.onMiniGame || App_ZMDGJ_Config.onTTMiniGame) {
                req._ZMDGJ_data_ZMDGJ_.code = User_ZMDGJ_.code_ZMDGJ_;
            }
            else if (Laya.Browser.onQGMiniGame) {
                req._ZMDGJ_data_ZMDGJ_.oppotoken = User_ZMDGJ_.code_ZMDGJ_;
            }
            else if (Laya.Browser.onQQMiniGame) {
                req._ZMDGJ_data_ZMDGJ_.code = User_ZMDGJ_.code_ZMDGJ_;
            }
            else {
                req._ZMDGJ_data_ZMDGJ_.code = User_ZMDGJ_.code_ZMDGJ_;
            }
            var time = "time=" + String(Date.now());
            var header = [
                "Content-Type", "application/json",
                "state", Net_ZMDGJ_Config.state_ZMDGJ_,
                "gameid", Net_ZMDGJ_Config.game_ZMDGJ_id,
                "sign", Aes_ZMDGJ_Tools.en_ZMDGJ_crypt(time),
            ];
            if (User_ZMDGJ_._ZMDGJ_token) {
                header.push("token");
                header.push(User_ZMDGJ_._ZMDGJ_token);
            }
            xhr.send(req.url_ZMDGJ_, JSON.stringify(req._ZMDGJ_data_ZMDGJ_), req.meth_ZMDGJ_, "json", header);
        }
        static login_ZMDGJ_(onSuccess, onFail) {
            var req = new request_ZMDGJ_Data();
            req.url_ZMDGJ_ = Net_ZMDGJ_Config.Login_ZMDGJ_;
            req.on_ZMDGJ_Success = onSuccess;
            req.on_ZMDGJ_Fail = onFail;
            Http_ZMDGJ_Unit.request_ZMDGJ_(req);
        }
        static save_ZMDGJ_Game_ZMDGJ_Data(gameData, onSuccess, onFail) {
            var req = new request_ZMDGJ_Data();
            req.url_ZMDGJ_ = Net_ZMDGJ_Config.Save_ZMDGJ_Game_ZMDGJ_Data;
            req._ZMDGJ_data_ZMDGJ_.gameData = gameData;
            req.on_ZMDGJ_Success = onSuccess;
            req.on_ZMDGJ_Fail = onFail;
            Http_ZMDGJ_Unit.request_ZMDGJ_(req);
        }
        static get_ZMDGJ_Game_ZMDGJ_Data(onSuccess, onFail) {
            var req = new request_ZMDGJ_Data();
            req.url_ZMDGJ_ = Net_ZMDGJ_Config.Get_ZMDGJ_User;
            req.on_ZMDGJ_Success = onSuccess;
            req.on_ZMDGJ_Fail = onFail;
            Http_ZMDGJ_Unit.request_ZMDGJ_(req);
        }
        static Get_ZMDGJ_Ip_ZMDGJ_Block(onSuccess, onFail) {
            if (-1 != Net_ZMDGJ_Config.game_ZMDGJ_id) {
                var req = new request_ZMDGJ_Data();
                req.url_ZMDGJ_ = Net_ZMDGJ_Config.Ip_ZMDGJ_Block;
                req.on_ZMDGJ_Success = onSuccess;
                req.on_ZMDGJ_Fail = onFail;
                Http_ZMDGJ_Unit.request_ZMDGJ_(req);
            }
        }
        static report_ZMDGJ_Export(appid, game_name, onSuccess, onFail) {
            var req = new request_ZMDGJ_Data();
            req.url_ZMDGJ_ = Net_ZMDGJ_Config.report_ZMDGJ_Export;
            req._ZMDGJ_data_ZMDGJ_.wbappid = appid;
            req._ZMDGJ_data_ZMDGJ_.game_name = game_name;
            req.on_ZMDGJ_Success = onSuccess;
            req.on_ZMDGJ_Fail = onFail;
            Http_ZMDGJ_Unit.request_ZMDGJ_(req);
        }
        static report_ZMDGJ_Import(appid, channel, onSuccess, onFail) {
            var req = new request_ZMDGJ_Data();
            req.url_ZMDGJ_ = Net_ZMDGJ_Config.report_ZMDGJ_Import;
            req._ZMDGJ_data_ZMDGJ_.wbappid = appid;
            req._ZMDGJ_data_ZMDGJ_.channel = channel;
            req.on_ZMDGJ_Success = onSuccess;
            req.on_ZMDGJ_Fail = onFail;
            Http_ZMDGJ_Unit.request_ZMDGJ_(req);
        }
        static Get_ZMDGJ_user_ZMDGJ_ip(onSuccess, onFail) {
            var req = new request_ZMDGJ_Data();
            req.url_ZMDGJ_ = Net_ZMDGJ_Config.get_ZMDGJ_user_ZMDGJ_ip;
            req.on_ZMDGJ_Success = onSuccess;
            req.on_ZMDGJ_Fail = onFail;
            Http_ZMDGJ_Unit.request_ZMDGJ_(req);
        }
        static SignIn(onSuccess, onFail) {
            var req = new request_ZMDGJ_Data();
            req.url_ZMDGJ_ = Net_ZMDGJ_Config.signin;
            req.on_ZMDGJ_Success = onSuccess;
            req.on_ZMDGJ_Fail = onFail;
            req._ZMDGJ_data_ZMDGJ_.type = 1;
            Http_ZMDGJ_Unit.request_ZMDGJ_(req);
        }
        static GetSignIn(onSuccess, onFail) {
            var req = new request_ZMDGJ_Data();
            req.url_ZMDGJ_ = Net_ZMDGJ_Config.signin;
            req.on_ZMDGJ_Success = onSuccess;
            req.on_ZMDGJ_Fail = onFail;
            req._ZMDGJ_data_ZMDGJ_.type = 0;
            Http_ZMDGJ_Unit.request_ZMDGJ_(req);
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
    class WX_ZMDGJ_API {
        static _ZMDGJ_wxLogin_ZMDGJ_(onSuccess, onFail) {
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
        static on_ZMDGJ_Rewarded_ZMDGJ_VideoAdLoad() {
            console.log('激励视频 广告加载完成');
        }
        static onRewarded_ZMDGJ_Video_ZMDGJ_AdError(err) {
            console.log('激励视频 广告加载失败' + err);
            if (WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed) {
                WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed();
            }
        }
        static on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close(res) {
            if ((res && res.isEnded) || res == null) {
                console.log('激励视频 已完整观看');
                if (WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close) {
                    WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close(true);
                }
            }
            else {
                console.log('激励视频 未完整观看');
                if (WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close) {
                    WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close(false);
                }
            }
        }
        static reg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event(rewardedVideoAd) {
            rewardedVideoAd.onLoad(WX_ZMDGJ_API.on_ZMDGJ_Rewarded_ZMDGJ_VideoAdLoad);
            rewardedVideoAd.onError(WX_ZMDGJ_API.onRewarded_ZMDGJ_Video_ZMDGJ_AdError);
            rewardedVideoAd.onClose(WX_ZMDGJ_API.on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close);
            WX_ZMDGJ_API._isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event = true;
        }
        static show_ZMDGJ_Rewarded_ZMDGJ_VideoAd(onAdClose, onFailed) {
            if (Laya.Browser.onMiniGame) {
                WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close = onAdClose;
                WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed = onFailed;
                var rewardedVideoAd = Laya.Browser.window["wx"].createRewardedVideoAd({
                    adUnitId: WX_ZMDGJ_API.ad_ZMDGJ_UnitId,
                });
                if (!WX_ZMDGJ_API._isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event) {
                    WX_ZMDGJ_API.reg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event(rewardedVideoAd);
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
        static navigate_ZMDGJ_To_ZMDGJ_MiniProgram(appId, path, onSuccess, onFail, onComplate) {
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
        static share_ZMDGJ_(complate, titel, imageUrl) {
            if (Laya.Browser.onMiniGame) {
                WX_ZMDGJ_API._onShow = () => {
                    Laya.Browser.window["wx"].offShow(WX_ZMDGJ_API._onShow);
                    WX_ZMDGJ_API._onShow = null;
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
                Laya.Browser.window["wx"].onShow(WX_ZMDGJ_API._onShow);
                WX_ZMDGJ_API._lastShareTime = Date.now();
                Laya.Browser.window["wx"].shareAppMessage({
                    title: titel,
                    imageUrl: imageUrl
                });
            }
        }
        static show_ZMDGJ_Interstitial_ZMDGJ_Ad(onAdClose, onFailed) {
            if (Laya.Browser.onMiniGame) {
                var interstitialAd = Laya.Browser.window["wx"].createInterstitialAd({
                    adUnitId: WX_ZMDGJ_API.Ins_ZMDGJ_AdUnitId,
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
        static get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync() {
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
        static Set_ZMDGJ_Share_ZMDGJ_Menu(titel, imageUrl, success, fail, complate) {
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
        static check_ZMDGJ_Update() {
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
            if (!Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag || 1 != App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wxcfg.kuang_ZMDGJ_dian_ZMDGJ_Banner) {
                if (onFail) {
                    onFail();
                }
                return;
            }
            let kuangdianLevelSpcacing = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wxcfg.kuang_ZMDGJ_dian_ZMDGJ_LevelSpcacing;
            if (0 != kuangdianLevelSpcacing) {
                let left = WX_ZMDGJ_API._crazyClickShowCounter % kuangdianLevelSpcacing;
                if (0 == left) {
                    View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.WXCrazyClick, {
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
                ++WX_ZMDGJ_API._crazyClickShowCounter;
            }
            else {
                View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.WXCrazyClick, {
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
    WX_ZMDGJ_API.ad_ZMDGJ_UnitId = "adunit-34eb7092cc7ab967";
    WX_ZMDGJ_API.banner_ZMDGJ_AdUnitId = "adunit-ddfa85bf4306713f";
    WX_ZMDGJ_API.Ins_ZMDGJ_AdUnitId = "adunit-ddfa85bf4306713f";
    WX_ZMDGJ_API.GameRecorder = new GameRecorder();
    WX_ZMDGJ_API._isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event = false;
    WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed = null;
    WX_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close = null;
    WX_ZMDGJ_API._onShow = null;
    WX_ZMDGJ_API._lastShareTime = 0;
    WX_ZMDGJ_API._crazyClickShowCounter = 0;

    class QQ_ZMDGJ_Mini_ZMDGJ_GameAPI {
        static _ZMDGJ_Login_ZMDGJ_(onSuccess, onFail) {
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
        static onRewarded_ZMDGJ_VideoAd_ZMDGJ_Load() {
            console.log('激励视频 广告加载完成');
        }
        static onRewarded_ZMDGJ_VideoAd_ZMDGJ_Error(err) {
            console.log('激励视频 广告加载失败' + err);
            if (QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Failed) {
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Failed();
            }
        }
        static onRewarded_ZMDGJ_Video_ZMDGJ_AdClose(res) {
            if ((res && res.isEnded) || res == null) {
                console.log('激励视频 已完整观看');
                if (QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Close) {
                    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Close(true);
                }
            }
            else {
                console.log('激励视频 未完整观看');
                if (QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Close) {
                    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Close(false);
                }
            }
        }
        static reg_ZMDGJ_Rewarded_ZMDGJ_Video_ZMDGJ_AdEvent(rewardedVideoAd) {
            rewardedVideoAd.onLoad(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.onRewarded_ZMDGJ_VideoAd_ZMDGJ_Load);
            rewardedVideoAd.onError(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.onRewarded_ZMDGJ_VideoAd_ZMDGJ_Error);
            rewardedVideoAd.onClose(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.onRewarded_ZMDGJ_Video_ZMDGJ_AdClose);
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAdEvent = true;
        }
        static show_ZMDGJ_Rewarded_ZMDGJ_VideoAd(onAdClose, onFailed) {
            if (Laya.Browser.onQQMiniGame) {
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Close = onAdClose;
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Failed = onFailed;
                var rewardedVideoAd = Laya.Browser.window["qq"].createRewardedVideoAd({
                    adUnitId: QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.ad_ZMDGJ_UnitId,
                });
                if (!QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAdEvent) {
                    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.reg_ZMDGJ_Rewarded_ZMDGJ_Video_ZMDGJ_AdEvent(rewardedVideoAd);
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
        static navigate_ZMDGJ_To_ZMDGJ_Mini_ZMDGJ_Program(appId, path, onSuccess, onFail, onComplate) {
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
        static share_ZMDGJ_(complate, titel, imageUrl) {
            if (Laya.Browser.onQQMiniGame) {
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onShow_ZMDGJ_ = () => {
                    Laya.Browser.window["qq"].offShow(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onShow_ZMDGJ_);
                    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onShow_ZMDGJ_ = null;
                    var c = Date.now() - this._last_ZMDGJ_Share_ZMDGJ_Time;
                    if (complate) {
                        if (Date.now() - this._last_ZMDGJ_Share_ZMDGJ_Time > 2000) {
                            complate(true);
                        }
                        else {
                            complate(false);
                        }
                    }
                };
                Laya.Browser.window["qq"].onShow(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onShow_ZMDGJ_);
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._last_ZMDGJ_Share_ZMDGJ_Time = Date.now();
                Laya.Browser.window["qq"].shareAppMessage({
                    title: titel,
                    imageUrl: imageUrl
                });
            }
        }
        static show_ZMDGJ_Interstitial_ZMDGJ_Ad(onAdClose, onFailed) {
            if (Laya.Browser.onQQMiniGame) {
                var interstitialAd = Laya.Browser.window["qq"].createInterstitialAd({
                    adUnitId: QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.Ins_ZMDGJ_AdUnitId,
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
        static Load_ZMDGJ_App_ZMDGJ_BoxAd(onAdClose, onFailed) {
            if (Laya.Browser.onQQMiniGame) {
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_box_ZMDGJ_Ad = Laya.Browser.window["qq"].createAppBox({
                    adUnitId: QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.App_ZMDGJ_BoxId,
                });
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_box_ZMDGJ_Ad.load().then(() => {
                    console.log('盒子广告 加载完成');
                });
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_box_ZMDGJ_Ad.onError((err) => {
                    console.log('盒子广告 加载失败' + err);
                    if (onFailed) {
                        onFailed();
                    }
                });
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.on_ZMDGJ_BoxAd_ZMDGJ_Close = () => {
                    console.log('盒子广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                };
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_box_ZMDGJ_Ad.onClose(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.on_ZMDGJ_BoxAd_ZMDGJ_Close);
            }
            else {
                onAdClose();
            }
        }
        static show_ZMDGJ_App_ZMDGJ_BoxAd(onFailed, onAdClose) {
            if (this.mApp_ZMDGJ_box_ZMDGJ_Ad) {
                console.log("显示盒子广告");
                this.mApp_ZMDGJ_box_ZMDGJ_Ad.offClose(this.on_ZMDGJ_BoxAd_ZMDGJ_Close);
                this.on_ZMDGJ_BoxAd_ZMDGJ_Close = () => {
                    console.log('盒子广告 关闭');
                    if (onAdClose) {
                        onAdClose();
                    }
                };
                this.mApp_ZMDGJ_box_ZMDGJ_Ad.onClose(this.on_ZMDGJ_BoxAd_ZMDGJ_Close);
                this.mApp_ZMDGJ_box_ZMDGJ_Ad.show().catch((err) => {
                    console.log('盒子广告 显示失败 ：' + err);
                    if (onFailed) {
                        onFailed();
                    }
                });
            }
            else {
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.Load_ZMDGJ_App_ZMDGJ_BoxAd(onAdClose, onFailed);
            }
        }
        static get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync() {
            if (Laya.Browser.onQQMiniGame) {
                let obj = Laya.Browser.window["qq"].get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync();
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
        static Set_ZMDGJ_Share_ZMDGJ_Menu(titel, imageUrl, success, fail, complate) {
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
            let launchScene = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
            let noEnterBySearch = true;
            let wudianSceneList = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian_ZMDGJ_Scene_ZMDGJ_List;
            for (let i = 0; i < wudianSceneList.length; ++i) {
                let wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            let ipBlocked = Wu_ZMDGJ_dian_ZMDGJ_Mgr.Get_ZMDGJ_Ip_ZMDGJ_Blocked();
            let wudian = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian;
            let kuangdianBanner = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().qq_ZMDGJ_cfg.kuang_ZMDGJ_dian_ZMDGJ_Banner;
            if (App_ZMDGJ_Config.Versions_ZMDGJ_ == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().qq_ZMDGJ_cfg.qq_ZMDGJ_versions
                && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBanner) {
                View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.QQCrazyClickView, data, () => {
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
            let launchScene = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
            let noEnterBySearch = true;
            let wudianSceneList = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian_ZMDGJ_Scene_ZMDGJ_List;
            for (let i = 0; i < wudianSceneList.length; ++i) {
                let wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            let ipBlocked = Wu_ZMDGJ_dian_ZMDGJ_Mgr.Get_ZMDGJ_Ip_ZMDGJ_Blocked();
            let wudian = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian;
            let kuangdianBox = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().qq_ZMDGJ_cfg.kuangdian_ZMDGJ_Box;
            if (App_ZMDGJ_Config.Versions_ZMDGJ_ == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().qq_ZMDGJ_cfg.qq_ZMDGJ_versions
                && ipBlocked && noEnterBySearch && 1 == wudian && 1 == kuangdianBox) {
                View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.QQCrazyClickView2, data, () => {
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
        static show_ZMDGJ_AppBlock_ZMDGJ_Ad(onFail, top = 150, orientation = "landscape") {
            if (!Laya.Browser.onQQMiniGame)
                return;
            if (!Laya.Browser.window["qq"].createBlockAd)
                return;
            if (QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.is_ZMDGJ_AppBlock_ZMDGJ_AdLoading)
                return;
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.is_ZMDGJ_AppBlock_ZMDGJ_AdLoading = true;
            if (isNaN(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.screen_ZMDGJ_Width)) {
                try {
                    let res = Laya.Browser.window["qq"].getSystemInfoSync();
                    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.screen_ZMDGJ_Width = res.windowWidth;
                    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.screen_ZMDGJ_Height = res.windowHeight;
                    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.pixel_ZMDGJ_Ratio = res.pixelRatio;
                    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.is_ZMDGJ_Ios = res.platform == "ios";
                    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.skd_ZMDGJ_Version = res.SDKVersion;
                    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.screen_ZMDGJ_Width *= (QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.is_ZMDGJ_Ios ? 1 : QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.pixel_ZMDGJ_Ratio);
                    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.screen_ZMDGJ_Height *= (QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.is_ZMDGJ_Ios ? 1 : QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.pixel_ZMDGJ_Ratio);
                    console.log("getSystemInfoSync ==> ", res.SDKVersion);
                }
                catch (e) {
                    if (onFail)
                        onFail();
                    return;
                }
            }
            let arr1 = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.skd_ZMDGJ_Version.split(".").map(v => parseInt(v));
            let arr2 = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.support_ZMDGJ_SDKVersion.split(".").map(v => parseInt(v));
            let isSupport = true;
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] < arr2[i]) {
                    isSupport = false;
                    break;
                }
            }
            if (!isSupport)
                return;
            console.log("QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.showAppBlockAd ", top);
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.destroy_ZMDGJ_App_ZMDGJ_BlockAd();
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.on_ZMDGJ_Fail = onFail;
            let min = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.is_ZMDGJ_Ios ? 32 / QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.pixel_ZMDGJ_Ratio : 32;
            let mTop = Math.max(min, top / (QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.is_ZMDGJ_Ios ? QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.pixel_ZMDGJ_Ratio : 1));
            let mLeft = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.screen_ZMDGJ_Width / 2;
            mLeft = min;
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_BlockAd = Laya.Browser.window["qq"].createBlockAd({
                adUnitId: QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.block_ZMDGJ_AdArray[Math.floor(Math.random() * QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.block_ZMDGJ_AdArray.length)],
                style: { left: mLeft, top: mTop },
                size: QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.App_ZMDGJ_Block_ZMDGJ_Size,
                orientation: orientation,
            });
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_BlockAd.onError(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.app_ZMDGJ_Block_ZMDGJ_ADError);
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_BlockAd.show().catch((err) => {
                console.log('积木广告 显示失败 ：' + JSON.stringify(err));
                if (onFail) {
                    onFail();
                }
            });
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.is_ZMDGJ_AppBlock_ZMDGJ_AdLoading = false;
        }
        static app_ZMDGJ_Block_ZMDGJ_ADResize(obj) {
            if (!QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_BlockAd["style"])
                return;
            let realWidth = obj.width;
            let realHeight = obj.height;
            let mLeft = (QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.screen_ZMDGJ_Width - realWidth) / 2;
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_BlockAd.style.left = mLeft;
        }
        static app_ZMDGJ_Block_ZMDGJ_ADError(err) {
            console.log("积木广告  加载失败 ", JSON.stringify(err));
            if (QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.on_ZMDGJ_Fail)
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.on_ZMDGJ_Fail();
        }
        static destroy_ZMDGJ_App_ZMDGJ_BlockAd() {
            if (!Laya.Browser.onQQMiniGame)
                return;
            if (!QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_BlockAd)
                return;
            console.log("QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.destroyAppBlockAd");
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_BlockAd.offResize(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.app_ZMDGJ_Block_ZMDGJ_ADResize);
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_BlockAd.offError(QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.app_ZMDGJ_Block_ZMDGJ_ADError);
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_BlockAd.hide();
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_BlockAd.destroy();
            QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_BlockAd = null;
        }
    }
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.ad_ZMDGJ_UnitId = "";
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.banner_ZMDGJ_AdUnitId = "";
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.Ins_ZMDGJ_AdUnitId = "";
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.App_ZMDGJ_BoxId = "";
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.block_ZMDGJ_AdArray = [];
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.App_ZMDGJ_Block_ZMDGJ_Style = { left: 120, top: 200 };
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.App_ZMDGJ_Block_ZMDGJ_Size = 5;
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.App_ZMDGJ_Block_ZMDGJ_Orientation = "landscape";
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAdEvent = false;
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Failed = null;
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onRewarded_ZMDGJ_VideoAd_ZMDGJ_Close = null;
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._onShow_ZMDGJ_ = null;
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._last_ZMDGJ_Share_ZMDGJ_Time = 0;
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_box_ZMDGJ_Ad = null;
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.on_ZMDGJ_BoxAd_ZMDGJ_Close = null;
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.mApp_ZMDGJ_BlockAd = null;
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.screen_ZMDGJ_Width = NaN;
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.is_ZMDGJ_AppBlock_ZMDGJ_AdLoading = false;
    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.support_ZMDGJ_SDKVersion = "1.15.0";

    class Wu_ZMDGJ_dian_ZMDGJ_Mgr {
        static Ip_ZMDGJ_Block_ZMDGJ_Flag() {
            return Wu_ZMDGJ_dian_ZMDGJ_Mgr._ipBlockFlag;
        }
        static Update_ZMDGJ_IpBlock_ZMDGJ_State() {
            Http_ZMDGJ_Unit.Get_ZMDGJ_Ip_ZMDGJ_Block(function (res) {
                console.log("调用IpBlock接口成功,结果为:", res);
                Wu_ZMDGJ_dian_ZMDGJ_Mgr._ipBlockFlag = res.code;
                Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.App_On_ZMDGJ_Update_ZMDGJ_IpBlockState, { ipBlockFlag: Wu_ZMDGJ_dian_ZMDGJ_Mgr._ipBlockFlag });
            }, null);
        }
        static Get_ZMDGJ_Ip_ZMDGJ_Blocked() {
            return Wu_ZMDGJ_dian_ZMDGJ_Mgr._ipBlockFlag == 0;
        }
        static Get_ZMDGJ_Entry_ZMDGJ_Scene() {
            return WX_ZMDGJ_API.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene == 1006;
        }
        static Is_ZMDGJ_Switch_ZMDGJ_Open() {
            let mainSwitch = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian == 1;
            let isOpenTime = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wudianTimeAvaliable;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "打开时间", isOpenTime);
            return mainSwitch && isOpenTime;
        }
        static get Wu_ZMDGJ_dian_ZMDGJ_Flag() {
            let mainSwitch = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian == 1;
            let launchScene = null;
            if (Laya.Browser.onMiniGame) {
                launchScene = WX_ZMDGJ_API.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
            }
            else if (Laya.Browser.onQQMiniGame) {
                launchScene = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
            }
            let noEnterBySearch = true;
            var wudianSceneList = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian_ZMDGJ_Scene_ZMDGJ_List;
            for (var i = 0; i < wudianSceneList.length; ++i) {
                var wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            let isOpenTime = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wudianTimeAvaliable;
            let ipnotBlock = Wu_ZMDGJ_dian_ZMDGJ_Mgr._ipBlockFlag == 0;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock, "打开时间", isOpenTime);
            return mainSwitch && noEnterBySearch && ipnotBlock && isOpenTime;
        }
        static get No_ZMDGJ_Time_ZMDGJ_Wudian_ZMDGJ_Flag() {
            let mainSwitch = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian == 1;
            let launchScene = null;
            if (Laya.Browser.onMiniGame) {
                launchScene = WX_ZMDGJ_API.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
            }
            else if (Laya.Browser.onQQMiniGame) {
                launchScene = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync().scene;
            }
            let noEnterBySearch = true;
            var wudianSceneList = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wu_ZMDGJ_dian_ZMDGJ_Scene_ZMDGJ_List;
            for (var i = 0; i < wudianSceneList.length; ++i) {
                var wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            let ipnotBlock = Wu_ZMDGJ_dian_ZMDGJ_Mgr._ipBlockFlag == 0;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
            return mainSwitch && noEnterBySearch && ipnotBlock;
        }
    }
    Wu_ZMDGJ_dian_ZMDGJ_Mgr._ipBlockFlag = -1;

    var View_ZMDGJ_Def;
    (function (View_ZMDGJ_Def) {
        View_ZMDGJ_Def["None"] = "";
        View_ZMDGJ_Def["TipsView"] = "View/TipsView.json";
        View_ZMDGJ_Def["ClickGetPrize"] = "View/ClickGetPrize.json";
        View_ZMDGJ_Def["MainView"] = "View/Template/MainViewTemplate.json";
        View_ZMDGJ_Def["MiniGameView"] = "View/Template/MiniGameViewTemplate.json";
        View_ZMDGJ_Def["RewardView"] = "View/Template/RewardViewTemplate.json";
        View_ZMDGJ_Def["InGameView"] = "View/Template/InGameViewTemplate.json";
        View_ZMDGJ_Def["GameWinView"] = "View/Template/GameWinViewTemplate.json";
        View_ZMDGJ_Def["GameFailView"] = "View/Template/GameFailViewTemplate.json";
        View_ZMDGJ_Def["ExportView"] = "View/Template/ExportViewTemplate.json";
        View_ZMDGJ_Def["Export2View"] = "View/Template/Export2ViewTemplate.json";
        View_ZMDGJ_Def["Export3View"] = "View/Template/Export3ViewTemplate.json";
        View_ZMDGJ_Def["WXCrazyClick"] = "View/Template/WXCrazyClick.json";
        View_ZMDGJ_Def["OPPONativeView"] = "View/Template/OPPONativeViewTemplate.json";
        View_ZMDGJ_Def["QQCrazyClickView"] = "View/Template/QQ/QQCrazyClick.json";
        View_ZMDGJ_Def["QQCrazyClickView2"] = "View/Template/QQ/QQCrazyClick2.json";
        View_ZMDGJ_Def["TTStoreView"] = "View/Template/TT/TTStore.json";
        View_ZMDGJ_Def["TTSignInView"] = "View/Template/TT/TTSignIn.json";
        View_ZMDGJ_Def["TTRewardView"] = "View/Template/TT/TTReward.json";
        View_ZMDGJ_Def["VVNativeView1"] = "View/Template/VV/VVNativeView1Template.json";
        View_ZMDGJ_Def["VVNativeView2"] = "View/Template/VV/VVNativeView2Template.json";
        View_ZMDGJ_Def["SkinTipsView"] = "View/SkinTips.json";
    })(View_ZMDGJ_Def || (View_ZMDGJ_Def = {}));
    class View_ZMDGJ_Mgr {
        constructor() {
            this._ZMDGJ__views_ZMDGJ_ = {};
            this._loading_ZMDGJ_List = new Array();
        }
        open_ZMDGJ_View(viewType, data, oncomplate) {
            if (this._ZMDGJ__views_ZMDGJ_[viewType]) {
                var view = this._ZMDGJ__views_ZMDGJ_[viewType];
                let coms = view._components;
                let viewBase = null;
                if (coms) {
                    for (let index = 0; index < coms.length; index++) {
                        const element = coms[index];
                        if (element._viewBase) {
                            viewBase = element;
                            viewBase.open_ZMDGJ_View(data);
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
            this._loading_ZMDGJ_List.push(viewType);
            Laya.Scene.load(viewUrl, Laya.Handler.create(this, function (owner) {
                Laya.stage.addChild(owner);
                var view = owner;
                self._ZMDGJ__views_ZMDGJ_[viewType] = view;
                let coms = owner._components;
                let viewBase = null;
                if (coms) {
                    for (let index = 0; index < coms.length; index++) {
                        const element = coms[index];
                        if (element._viewBase) {
                            viewBase = element;
                            element._viewDef = viewType;
                            viewBase.open_ZMDGJ_View(data);
                            break;
                        }
                    }
                }
                if (oncomplate) {
                    oncomplate(viewBase);
                }
            }));
        }
        close_ZMDGJ_View(viewType) {
            var view = this._ZMDGJ__views_ZMDGJ_[viewType];
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
                this._ZMDGJ__views_ZMDGJ_[viewType] = null;
            }
        }
        Show_ZMDGJ_View(viewType) {
            var view = this._ZMDGJ__views_ZMDGJ_[viewType];
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
        hide_ZMDGJ_View(viewType) {
            var view = this._ZMDGJ__views_ZMDGJ_[viewType];
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
        get_ZMDGJ_View(viewType) {
            return this._ZMDGJ__views_ZMDGJ_[viewType];
        }
        show_ZMDGJ_Tips(msg) {
            this.open_ZMDGJ_View(View_ZMDGJ_Def.TipsView, msg);
        }
        tryShowPopAd(complate) {
            if (1 == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().pop_ZMDGJ_Ad && Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag) {
                View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.Export3View, null, (v) => {
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
    View_ZMDGJ_Mgr.ins_ZMDGJ_tance = new View_ZMDGJ_Mgr();

    var ALD_ZMDGJ_Event_ZMDGJ_Def;
    (function (ALD_ZMDGJ_Event_ZMDGJ_Def) {
        ALD_ZMDGJ_Event_ZMDGJ_Def["None"] = "";
        ALD_ZMDGJ_Event_ZMDGJ_Def["Report_ZMDGJ_AdClickSuccess"] = "\u5E7F\u544A\u5BFC\u51FA\u6210\u529F";
        ALD_ZMDGJ_Event_ZMDGJ_Def["Report_ZMDGJ_AdClickFail"] = "\u5E7F\u544A\u5BFC\u51FA\u5931\u8D25";
        ALD_ZMDGJ_Event_ZMDGJ_Def["Report_ZMDGJ_LaunchOptions"] = "\u7528\u6237\u542F\u52A8\u53C2\u6570";
        ALD_ZMDGJ_Event_ZMDGJ_Def["EnterMainView"] = "\u8FDB\u5165\u4E3B\u754C\u9762";
        ALD_ZMDGJ_Event_ZMDGJ_Def["EnterGameView"] = "\u8FDB\u5165\u6E38\u620F\u754C\u9762";
        ALD_ZMDGJ_Event_ZMDGJ_Def["EnterGameComplateView"] = "\u8FDB\u5165\u6E38\u620F\u7ED3\u675F\u754C\u9762";
        ALD_ZMDGJ_Event_ZMDGJ_Def["EnterGameOverMoreGame"] = "\u6E38\u620F\u7ED3\u675F\u8FDB\u5165\u5BFC\u51FA\u754C\u9762";
    })(ALD_ZMDGJ_Event_ZMDGJ_Def || (ALD_ZMDGJ_Event_ZMDGJ_Def = {}));
    class ALD {
        static ald_ZMDGJ_Send_ZMDGJ_OpenId(openid) {
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window["wx"].aldSendOpenid(openid);
                console.log("ALD 上报 openid : ", openid);
            }
            else if (Laya.Browser.onQQMiniGame) {
                Laya.Browser.window["qq"].aldSendOpenid(openid);
                console.log("ALD 上报 openid : ", openid);
            }
        }
        static ald_ZMDGJ_Send_ZMDGJ_Event(event, data) {
            var eventName = event;
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window["wx"].aldSendEvent(eventName, data);
            }
            else if (Laya.Browser.onQQMiniGame) {
                Laya.Browser.window["qq"].aldSendEvent(eventName, data);
            }
        }
        static ald_ZMDGJ_Send_ZMDGJ_ReportAdClickSuccess(data) {
            var type = ALD_ZMDGJ_Event_ZMDGJ_Def.Report_ZMDGJ_AdClickSuccess + " " + data.title + ":" + String(data.appid);
            ALD.ald_ZMDGJ_Send_ZMDGJ_Event(type, {
                "导出成功": data.title + ":" + String(data.appid)
            });
        }
        static aldSend_ZMDGJ_ReportAd_ZMDGJ_ClickFail(data) {
            var type = ALD_ZMDGJ_Event_ZMDGJ_Def.Report_ZMDGJ_AdClickFail + " " + data.title + ":" + String(data.appid);
            ALD.ald_ZMDGJ_Send_ZMDGJ_Event(type, {
                "导出失败": data.title + ":" + String(data.appid)
            });
        }
        static ald_ZMDGJ_Send_ZMDGJ_Report_ZMDGJ_LaunchOptions(sceneid, ip, location) {
            var type = ALD_ZMDGJ_Event_ZMDGJ_Def.Report_ZMDGJ_LaunchOptions;
            ALD.ald_ZMDGJ_Send_ZMDGJ_Event(type, {
                "场景值：": String(sceneid),
                "Ip：": String(ip),
                "地区：": JSON.stringify(location)
            });
        }
        static aldSendOnlySingleReport(eventType, reportData) {
            ALD.ald_ZMDGJ_Send_ZMDGJ_Event(eventType, reportData);
        }
    }

    class CameraFollow extends Laya.Script3D {
        constructor() {
            super();
            this._camera = null;
            this._spriteRole = null;
            this._initPos = new Laya.Vector3(0, 47.5, -60);
        }
        onAwake() {
            super.onAwake();
            console.log("设置相机移动");
            this._camera = this.owner;
            this._spriteRole = this.owner.scene.getChildByName("Role");
            this.InitCamera();
        }
        InitCamera() {
            this._initPos = this._camera.transform.localPosition.clone();
        }
        onLateUpdate() {
            this._camera.transform.localPositionX = Utilit_ZMDGJ_.Lerp_ZMDGJ_(this._camera.transform.localPositionX, this._initPos.x + this._spriteRole.transform.localPositionX, 0.2);
            this._camera.transform.localPositionZ = Utilit_ZMDGJ_.Lerp_ZMDGJ_(this._camera.transform.localPositionZ, this._initPos.z + this._spriteRole.transform.localPositionZ, 0.2);
        }
    }

    class Sound_ZMDGJ_Mgr {
        constructor() {
            this._enabled_ZMDGJ_ = true;
        }
        get _ZMDGJ_Enabled_ZMDGJ_() {
            return this._enabled_ZMDGJ_;
        }
        set _ZMDGJ_Enabled_ZMDGJ_(e) {
            if (!e) {
                this.stop_ZMDGJ_BGM();
            }
            this._enabled_ZMDGJ_ = e;
        }
        get_ZMDGJ_Sound_ZMDGJ_Url(name) {
            let url = Sound_ZMDGJ_Mgr.sound_ZMDGJ_Res_ZMDGJ_Path + name + ".ogg";
            return url;
        }
        play_ZMDGJ_Sound(name) {
            if (!this._enabled_ZMDGJ_)
                return;
            var url = this.get_ZMDGJ_Sound_ZMDGJ_Url(name);
            if (Laya.Browser.onMiniGame) {
                var sound = Laya.Pool.getItem(name);
                if (sound == null) {
                    sound = wx.createInnerAudioContext();
                    sound.src = Sound_ZMDGJ_Mgr.sound_ZMDGJ_Res_ZMDGJ_Path + name + ".ogg";
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
        play_ZMDGJ_BGM(name) {
            if (!this._enabled_ZMDGJ_)
                return;
            let url = this.get_ZMDGJ_Sound_ZMDGJ_Url(name);
            if (Laya.Browser.onMiniGame) {
                if (!this._ZMDGJ_bgm_ZMDGJ_) {
                    this._ZMDGJ_bgm_ZMDGJ_ = wx.createInnerAudioContext();
                }
                this._ZMDGJ_bgm_ZMDGJ_.pause();
                this._ZMDGJ_bgm_ZMDGJ_.src = url;
                this._ZMDGJ_bgm_ZMDGJ_.loop = true;
                this._ZMDGJ_bgm_ZMDGJ_.play();
            }
            else {
                Laya.SoundManager.playMusic(url, 0);
            }
        }
        stop_ZMDGJ_BGM() {
            if (Laya.Browser.onMiniGame) {
                if (this._ZMDGJ_bgm_ZMDGJ_) {
                    this._ZMDGJ_bgm_ZMDGJ_.pause();
                }
            }
            else {
                Laya.SoundManager.stopMusic();
            }
        }
    }
    Sound_ZMDGJ_Mgr.sound_ZMDGJ_Res_ZMDGJ_Path = "subRes/sound/";
    Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance = new Sound_ZMDGJ_Mgr();

    class NativeCallback {
        static onVideoFail() {
            console.debug("onVideoFail --------- ------------ ");
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.RewardVideoFail);
            Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_BGM('BGM');
        }
        static onVideoSuccess(reward) {
            console.debug("onVideoSuccess    --------- ------------ ");
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.RewardVideoSuccess, reward);
            Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_BGM('BGM');
        }
        static onInsertVideoEnd() {
            console.debug("onInsertVideoEnd    --------- ------------ ");
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.InsertVideoEnd);
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

    class Vibrate_ZMDGJ_Mgr {
        static vibrate_ZMDGJ_Short() {
            if (!Vibrate_ZMDGJ_Mgr.is_ZMDGJ_Enable)
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
        static vibrate_ZMDGJ_Long() {
            if (!Vibrate_ZMDGJ_Mgr.is_ZMDGJ_Enable)
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
        static vibrate_ZMDGJ_(time) {
            if (!Vibrate_ZMDGJ_Mgr.is_ZMDGJ_Enable)
                return;
            if (Laya.Browser.onMiniGame) {
                let count = time / 15;
                let index = 0;
                let obj = { count: count, index: index };
                Laya.timer.loop(16, obj, function () {
                    Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_Short();
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
                    Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_Short();
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
                    Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_Short();
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
                    Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_Short();
                    index++;
                    if (index > count) {
                        Laya.timer.clearAll(obj);
                    }
                });
            }
        }
    }
    Vibrate_ZMDGJ_Mgr.is_ZMDGJ_Enable = true;

    class Coin extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this._sprite3D = null;
            this._bUp = true;
            this._bRotate = true;
            this._bSmaller = true;
            this._nScal = 1;
            this._nInitScal = new Laya.Vector3(1, 0.1, 1);
        }
        onAwake() {
            super.onAwake();
            this._sprite3D = this.owner;
            this._nInitScal = this._sprite3D.transform.localScale.clone();
        }
        onUpdate() {
            super.onUpdate();
            if (this._bUp) {
                if (this._sprite3D.transform.localRotationEulerX < 90) {
                    this._sprite3D.transform.localRotationEulerX += 18;
                    this._sprite3D.transform.localPositionY += 0.18;
                }
                else {
                    this._bUp = false;
                    this._bRotate = true;
                    if (this.owner.name == "Coin") {
                        if (this._sprite3D.getChildByName("EffectCoin") != null) {
                            this._sprite3D.getChildByName("EffectCoin").active = true;
                        }
                    }
                    Laya.timer.once(500, this, () => {
                        this._bRotate = false;
                        this._bSmaller = true;
                    });
                }
            }
            else if (this._bRotate) {
                this._sprite3D.transform.localRotationEulerY += 30;
            }
            else if (this._bSmaller) {
                if (this._nScal <= 0.1) {
                    this._sprite3D.active = false;
                }
                else {
                    this._nScal -= 0.1;
                    this._sprite3D.transform.localScale = new Laya.Vector3(this._nInitScal.x * this._nScal, this._nInitScal.y * this._nScal, this._nInitScal.z * this._nScal);
                }
            }
        }
        onEnable() {
            super.onEnable();
        }
        onDisable() {
            super.onDisable();
            Laya.timer.frameOnce(1, this, () => {
                this._sprite3D.destroy();
            });
        }
        onDestroy() {
            super.onDestroy();
            Laya.timer.clearAll(this);
        }
    }

    class Drop extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this._sprite3D = null;
            this._collider = null;
            this._scene = null;
            this._lines = new Laya.PixelLineSprite3D();
            this._lineStart = new Laya.Vector3(0, 0.5, 0);
            this._lineEnd = new Laya.Vector3(4, 0.5, 0);
            this._moveDir = new Laya.Vector3(0, 0, 0);
            this._gravity = -10;
            this._highest = 0;
            this._lowst = 0;
            this._lowstZ = 0;
            this._rotateY = 0;
            this._rotateX = 0;
            this._ShakeX = 0;
            this._ShakeXPer = 0;
            this._bStart = false;
            this._bRotate = false;
            this._bDrop = false;
            this._bShake = false;
            this._bShakeUp = true;
        }
        onAwake() {
            super.onAwake();
            this._sprite3D = this.owner;
            this._scene = this.owner.scene;
            this._collider = this.owner.getComponent(Laya.PhysicsCollider);
            this._collider.enabled = false;
            this._highest = this._sprite3D.transform.localPositionY;
            this._lowst = 0;
            this._lowstZ = this._sprite3D.transform.getWorldLossyScale().z / 2;
            this.InitLines();
        }
        onEnable() {
            super.onEnable();
        }
        onDisable() {
            super.onDisable();
        }
        onUpdate() {
            super.onUpdate();
            if (this._bStart) {
                if (this._bDrop) {
                    if (this._sprite3D.transform.localPositionY <= this._lowst + Math.sin(Math.abs(this._sprite3D.transform.localRotationEulerX) * Math.PI / 180) * this._lowstZ) {
                        this._sprite3D.transform.localPositionY = this._lowst + Math.sin(Math.abs(this._sprite3D.transform.localRotationEulerX) * Math.PI / 180) * this._lowstZ;
                        this._bDrop = false;
                        this._bShake = true;
                    }
                    else {
                        this._moveDir.y += (this._gravity * Laya.timer.delta / 1000);
                        this._sprite3D.transform.translate(new Laya.Vector3(this._moveDir.x * Laya.timer.delta / 1000, this._moveDir.y * Laya.timer.delta / 1000, this._moveDir.z * Laya.timer.delta / 1000), false);
                        this._sprite3D.transform.localRotationEulerY += this._rotateY;
                        if (this._bRotate) {
                            this._sprite3D.transform.localRotationEulerX += this._rotateX;
                        }
                    }
                    this.CheckCollision();
                }
                if (this._bShake) {
                    if (this._ShakeX < 2.5) {
                        this._sprite3D.transform.localPositionY = this._lowst;
                        this._sprite3D.transform.localRotationEulerX = 0;
                        this._bShake = false;
                        this.DropStop();
                    }
                    else {
                        if (this._bShakeUp) {
                            this._sprite3D.transform.localRotationEulerX += this._ShakeXPer;
                            if (this._sprite3D.transform.localRotationEulerX >= this._ShakeX) {
                                this._sprite3D.transform.localRotationEulerX = this._ShakeX;
                                this._bShakeUp = false;
                            }
                        }
                        else {
                            this._sprite3D.transform.localRotationEulerX -= this._ShakeXPer;
                            if (this._sprite3D.transform.localRotationEulerX <= this._ShakeX) {
                                this._sprite3D.transform.localRotationEulerX = -this._ShakeX;
                                this._ShakeX = this._ShakeX / 2;
                                this._ShakeXPer = this._ShakeX / 5 > 1 ? this._ShakeX / 5 : 1;
                                this._bShakeUp = true;
                            }
                        }
                        this._sprite3D.transform.localPositionY = this._lowst + Math.sin(Math.abs(this._sprite3D.transform.localRotationEulerX) * Math.PI / 180) * this._lowstZ;
                    }
                }
            }
        }
        InitLines() {
            this._lines.maxLineCount = 1;
            this._scene.addChild(this._lines);
            this._lineStart = this._sprite3D.transform.position.clone();
            this._lineEnd = this._lineStart.clone();
            this._lines.addLine(this._lineStart, this._lineEnd, Laya.Color.WHITE, Laya.Color.WHITE);
        }
        DropStart(initDir, bRotate = false) {
            this._moveDir = initDir;
            this._bStart = true;
            this._bRotate = true;
            this._bDrop = true;
            this._rotateY = Math.random() * this._highest * 2 - this._highest;
            this._rotateX = (Math.random() * this._highest) * 10;
            this._ShakeX = (Math.random() * this._highest) * 10;
            this._ShakeXPer = this._ShakeX / 5 > 1 ? this._ShakeX / 5 : 1;
        }
        DropStop() {
            this._collider.enabled = true;
            this.destroy();
        }
        CheckCollision() {
            this._lineStart = this._sprite3D.transform.position.clone();
            this._lineEnd = this._lineStart.clone();
            this._lineEnd.x += this._moveDir.x / 5;
            this._lineEnd.z += this._moveDir.z / 5;
            var HitResult = new Array();
            this._scene.physicsSimulation.raycastAllFromTo(this._lineStart, this._lineEnd, HitResult);
            for (var index = 0; index < HitResult.length; index++) {
                var other = HitResult[index].collider.owner;
                if (other.name.indexOf("Wall") > -1 || other.name == "Battery" || other.name.indexOf("Barrier") > -1) {
                    var normal = HitResult[index].normal.clone();
                    var IdotN = normal.x * this._moveDir.x + normal.y * this._moveDir.y + normal.z * this._moveDir.z;
                    this._moveDir = new Laya.Vector3(this._moveDir.x - 2 * IdotN * normal.x, this._moveDir.y - 2 * IdotN * normal.y, this._moveDir.z - 2 * IdotN * normal.z);
                }
            }
        }
    }

    class Role extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this._sprite3D = null;
            this._rigid = null;
            this._animator = null;
            this._boxsSprite3D = null;
            this._effectsSprite3D = null;
            this._coinPre = null;
            this._boxsObects = null;
            this._coinsObects = null;
            this._roleMesh = null;
            this._skinMesh = null;
            this._skinMaterials = [];
            this._bHit = false;
            this._moveDir = new Laya.Vector3(0, 0, 0);
            this._hittedMoveDir = new Laya.Vector3(0, 0, 0);
            this._moveSpeed = 0.06;
            this._moveSpeedNormal = 0.06;
            this._moveSpeedSlow = 0.04;
            this._targetRotation = 1000;
            this._nBlood = 100;
            this._nScalMax = 1.5;
            this._nScal = 1;
            this._BoxPoint = new Laya.Vector3(1, 1, 1);
            this._nSpeedPer = 1;
            this._bSuperMan = false;
        }
        onAwake() {
            this._sprite3D = this.owner;
            this._rigid = this.owner.getComponent(Laya.Rigidbody3D);
            this._roleMesh = this._sprite3D.getChildByName("Role");
            this._animator = this._roleMesh.getComponent(Laya.Animator);
            this._boxsSprite3D = this._sprite3D.getChildByName("Boxs");
            this._effectsSprite3D = this._sprite3D.getChildByName("Effects");
            this._coinPre = this._sprite3D.getChildByName("Coin");
            this._boxsObects = this._sprite3D.scene.getChildByName("Objects").getChildByName("GoodsAll");
            this._coinsObects = this._sprite3D.scene.getChildByName("Objects").getChildByName("Coins");
            this._BoxPoint = this._boxsSprite3D.transform.localPosition.clone();
            this._skinMesh = this._roleMesh.getChildByName("Box001");
            this._skinMaterials = this._skinMesh.skinnedMeshRenderer.materials;
            this._animator.play("IdleNormal");
            this.InitRigid();
            this.ChangeSkin(User_ZMDGJ_.curUsedItem);
        }
        InitRigid() {
            this._rigid.restitution = 0;
            this._rigid.friction = 0;
            this._rigid.rollingFriction = 0;
            this._rigid.linearDamping = 0;
            this._rigid.angularDamping = 0;
            this._rigid.linearFactor = new Laya.Vector3(1, 0, 1);
            this._rigid.angularFactor = new Laya.Vector3(0, 0, 0);
            this._rigid.gravity = new Laya.Vector3(0, 0, 0);
            this._rigid.sleepLinearVelocity = -1;
            this._rigid.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
            this._coinPre.getComponent(Laya.PhysicsCollider).collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
        }
        onEnable() {
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_OnInputStart, this, this.onMoveStart);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_OnInputRelease, this, this.onMoveStop);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_OnInputMove, this, this.onMoving);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_TrySkin, this, this.TrySkin);
        }
        onDisable() {
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_OnInputStart, this, this.onMoveStart);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_OnInputRelease, this, this.onMoveStop);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_OnInputMove, this, this.onMoving);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_TrySkin, this, this.TrySkin);
            Laya.timer.frameOnce(1, this, () => {
                this._sprite3D.destroy();
            });
        }
        onDestroy() {
            Laya.timer.clearAll(this);
        }
        onUpdate() {
            this._rigid.wakeUp();
            this._rigid.linearVelocity = this._bHit ? this._hittedMoveDir : this._moveDir;
        }
        onCollisionEnter(collision) {
            this.Collision(collision);
        }
        onCollisionStay(collision) {
        }
        Collision(collision) {
            var other = collision.other.owner;
            collision.other.enabled = false;
            switch (other.name) {
                case "Goods": {
                    this._boxsSprite3D.addChild(other);
                    other.transform.localPosition = new Laya.Vector3(Math.random() * 0.1 - 0.03, (this._boxsSprite3D.numChildren - 1) * 0.6, Math.random() * 0.1 - 0.03);
                    other.transform.localRotationEulerY = 0;
                    this._moveSpeed = this._moveSpeedSlow;
                    if (this._moveDir.x != 0 || this._moveDir.z != 0) {
                        this._animator.play("Walk");
                    }
                    else {
                        this._animator.play("IdleBoxs");
                    }
                    Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_BoxChange, { RoleNum: this._boxsSprite3D.numChildren });
                    Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_(250);
                    break;
                }
                case "SpeedUp": {
                    this._nSpeedPer = 1.5;
                    Laya.timer.once(5000, this, () => {
                        this._nSpeedPer = 1;
                    });
                    other.removeSelf();
                    break;
                }
                case "SuperMan": {
                    this._bSuperMan = true;
                    console.log("SuperMan");
                    Laya.timer.once(3000, this, () => {
                        this._bSuperMan = false;
                    });
                    other.removeSelf();
                    break;
                }
                case "Blood": {
                    this._nBlood += 20;
                    this._nBlood = this._nBlood > 100 ? 100 : this._nBlood;
                    other.removeSelf();
                    Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_BloodChange, { BloodNum: this._nBlood });
                    break;
                }
                case "Coin":
                case "Mail":
                case "Diamond": {
                    var award = other.name == "Coin" ? 1 : 10;
                    other.addComponent(Coin);
                    User_ZMDGJ_.add_ZMDGJ_Money(award);
                    Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_Sound("Coin");
                    if (this._nScal < 1.5) {
                        this._nScal += 0.01;
                        this._sprite3D.transform.localScaleZ = this._sprite3D.transform.localScaleY = this._sprite3D.transform.localScaleX = this._nScal;
                        this._boxsSprite3D.transform.localPosition = new Laya.Vector3(this._BoxPoint.x + 0.3 * (this._nScal - 1), this._BoxPoint.y + 0.3 * (this._nScal - 1), this._BoxPoint.z);
                    }
                    break;
                }
                case "Bullet":
                case "BarrierBall":
                case "BarrierEnemy":
                case "BarrierBull": {
                    collision.other.enabled = other.name != "Bullet";
                    var normal = collision.contacts[0].normal.clone();
                    this.beHitted(normal, true);
                    Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_(300);
                    break;
                }
                case "BarrierHammer": {
                    collision.other.enabled = true;
                    var normal = collision.contacts[0].normal.clone();
                    this.beHitted(normal, false);
                    this._hittedMoveDir = new Laya.Vector3(0, 0, 0);
                    this._effectsSprite3D.getChildByName("EffectHitted").active = true;
                    Laya.timer.once(1500, this, () => {
                        this._effectsSprite3D.getChildByName("EffectHitted").active = false;
                    });
                    Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_(300);
                    break;
                }
                case "BarrierStab": {
                    collision.other.enabled = true;
                    var normal = collision.contacts[0].normal.clone();
                    this.beHitted(normal, false);
                    this._hittedMoveDir = new Laya.Vector3(0, 0, 0);
                    Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_(300);
                    break;
                }
                case "Terminus": {
                    collision.other.enabled = true;
                    if (this._boxsObects.numChildren <= 0) {
                        Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_Sound("Win");
                        Vibrate_ZMDGJ_Mgr.vibrate_ZMDGJ_(500);
                        Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().CurLevel.LevelOver(true);
                    }
                    break;
                }
                default: {
                    collision.other.enabled = true;
                    break;
                }
            }
            this._rigid.linearVelocity = this._bHit ? this._hittedMoveDir : this._moveDir;
        }
        beHitted(normal, bReflect = false) {
            if (this._bHit || this._bSuperMan) {
                return;
            }
            this._nBlood -= 20;
            this._nScal = 1;
            this._sprite3D.transform.localScaleZ = this._sprite3D.transform.localScaleY = this._sprite3D.transform.localScaleX = this._nScal;
            this._boxsSprite3D.transform.localPosition = this._BoxPoint;
            if (this._nBlood <= 0) {
                Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_Sound("Fail");
                Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().CurLevel.LevelOver(false);
            }
            this._bHit = true;
            this._moveSpeed = this._moveSpeedNormal;
            this._hittedMoveDir = bReflect ? new Laya.Vector3(100 * normal.x * this._moveSpeed, 0, 100 * normal.z * this._moveSpeed) : this._moveDir;
            if (this._boxsSprite3D.numChildren > 0) {
                this._animator.play("HittedBoxs");
            }
            else {
                this._animator.play("HittedNormal");
            }
            Laya.timer.once(300, this, () => {
                this._bHit = false;
                this._rigid.linearVelocity = this._moveDir;
            });
            this.GoodsDrop(normal);
            this.CoinDrop();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_BoxChange, { RoleNum: this._boxsSprite3D.numChildren });
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_BloodChange, { BloodNum: this._nBlood });
        }
        GoodsDrop(normal) {
            for (var i = 0; this._boxsSprite3D.numChildren > 0; i++) {
                var good = this._boxsSprite3D.getChildAt(0);
                var pos = good.transform.position.clone();
                var rotate = good.transform.rotationEuler.clone();
                this._boxsObects.addChild(good);
                good.transform.localPosition = pos;
                good.transform.localRotationEuler = rotate;
                var speedRandom = Math.random() + i * 2;
                good.addComponent(Drop).DropStart(new Laya.Vector3(speedRandom * normal.x, 0, speedRandom * normal.z));
            }
            Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_Sound("Drop");
        }
        CoinDrop() {
            var dropCoinNum = 0;
            dropCoinNum = User_ZMDGJ_.get_ZMDGJ_Money() > 10 ? Math.floor(Math.random() * 5) + 5 : User_ZMDGJ_.get_ZMDGJ_Money();
            User_ZMDGJ_.sub_ZMDGJ_Money(dropCoinNum);
            for (var i = 0; i < dropCoinNum; i++) {
                var coin = Laya.Sprite3D.instantiate(this._coinPre, this._coinsObects);
                var pos = this._coinPre.transform.position.clone();
                var rotate = this._coinPre.transform.rotationEuler.clone();
                coin.transform.localPosition = pos;
                coin.transform.localRotationEuler = rotate;
                coin.active = true;
                var numPer = i <= 5 ? i : 5;
                var speedRandomX = Math.random() * (1 + numPer) * 3 - (1 + numPer) * 1.5;
                var speedRandomZ = Math.random() * (1 + numPer) * 3 - (1 + numPer) * 1.5;
                var speedRandomY = Math.random() * 7.5;
                speedRandomX = speedRandomX < 1 ? speedRandomX + 1 : speedRandomX;
                speedRandomZ = speedRandomZ < 1 ? speedRandomZ + 1 : speedRandomZ;
                coin.addComponent(Drop).DropStart(new Laya.Vector3(speedRandomX, speedRandomY, speedRandomZ), true);
            }
        }
        onMoveStart() {
        }
        onMoveStop() {
            if (!this._bHit) {
                if (this._boxsSprite3D.numChildren > 0) {
                    this._animator.play("IdleBoxs");
                }
                else {
                    this._animator.play("IdleNormal");
                }
            }
            this._moveDir = new Laya.Vector3(0, 0, 0);
            this._rigid.linearVelocity = this._bHit ? this._hittedMoveDir : this._moveDir;
            Laya.timer.clear(this, this.RotationChange);
        }
        onMoving(para) {
            if (!this._bHit) {
                if (this._boxsSprite3D.numChildren > 0) {
                    this._animator.play("Walk");
                }
                else {
                    this._animator.play("Run");
                }
            }
            var dir = para.dir;
            this._targetRotation = Math.atan2(-dir.y, dir.x) * 180 / Math.PI;
            this._moveDir = new Laya.Vector3(-dir.x * this._moveSpeed * this._nScal * this._nSpeedPer, 0, -dir.y * this._moveSpeed * 1.1 * this._nScal * this._nSpeedPer);
            this._rigid.linearVelocity = this._bHit ? this._hittedMoveDir : this._moveDir;
            var nMaxChange = this._targetRotation - this._sprite3D.transform.localRotationEulerY;
            if (Math.abs(nMaxChange) > 180) {
                nMaxChange = nMaxChange > 0 ? nMaxChange - 360 : nMaxChange + 360;
            }
            if (Math.abs(nMaxChange) <= 10) {
                this._sprite3D.transform.localRotationEulerY = this._targetRotation;
            }
            else {
                var nFrameChange = nMaxChange > 0 ? 10 : -10;
                Laya.timer.frameLoop(1, this, this.RotationChange, [nFrameChange]);
            }
        }
        RotationChange(nChange) {
            if (Math.abs(this._sprite3D.transform.localRotationEulerY - this._targetRotation) <= 10) {
                this._sprite3D.transform.localRotationEulerY = this._targetRotation;
                Laya.timer.clear(this, this.RotationChange);
                return;
            }
            this._sprite3D.transform.localRotationEulerY += nChange;
        }
        ChangeSkin(index) {
            this._skinMesh.skinnedMeshRenderer.material = this._skinMaterials[index];
            for (var i = 0; i < this._roleMesh.numChildren; i++) {
                if (this._roleMesh.getChildAt(i).name.indexOf("Hat") == -1) {
                    continue;
                }
                this._roleMesh.getChildAt(i).active = this._roleMesh.getChildAt(i).name.indexOf("Hat" + (index + 1).toString()) > -1;
            }
        }
        TrySkin(para) {
            var skinID = para.SkinId;
            this.ChangeSkin(skinID);
        }
    }

    class Bullet extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this._sprite3D = null;
            this._rigid = null;
            this._moveDir = new Laya.Vector3(0, 0, 0);
            this._moveSpeed = 6;
        }
        onAwake() {
            super.onAwake();
            this._sprite3D = this.owner;
            this._rigid = this.owner.getComponent(Laya.Rigidbody3D);
            this.InitRigid();
        }
        onEnable() {
            super.onEnable();
        }
        onDisable() {
            super.onDisable();
            Laya.timer.frameOnce(1, this, () => {
                this._sprite3D.destroy();
            });
        }
        onUpdate() {
            super.onUpdate();
            this._rigid.wakeUp();
        }
        onDestroy() {
            super.onDestroy();
            Laya.timer.clearAll(this);
        }
        onCollisionEnter(collision) {
            var other = collision.other.owner;
            if (other.name == "Goods") {
                var normal = collision.contacts[0].normal.clone();
                var IdotN = normal.x * this._moveDir.x + normal.y * this._moveDir.y + normal.z * this._moveDir.z;
                this._moveDir = new Laya.Vector3(this._moveDir.x - 2 * IdotN * normal.x, this._moveDir.y - 2 * IdotN * normal.y, this._moveDir.z - 2 * IdotN * normal.z);
                this._rigid.linearVelocity = this._moveDir;
            }
            else {
                this._sprite3D.meshRenderer.enable = false;
                this._sprite3D.getChildByName("EffectBoom").active = true;
                this._moveDir = new Laya.Vector3(0, 0, 0);
                this._rigid.linearVelocity = this._moveDir;
                this._rigid.enabled = false;
                Laya.timer.once(1500, this, () => {
                    this._sprite3D.active = false;
                });
            }
        }
        InitRigid() {
            this._rigid.restitution = 0;
            this._rigid.friction = 0;
            this._rigid.rollingFriction = 0;
            this._rigid.linearDamping = 0;
            this._rigid.angularDamping = 0;
            this._rigid.linearFactor = new Laya.Vector3(1, 0, 1);
            this._rigid.angularFactor = new Laya.Vector3(0, 0, 0);
            this._rigid.gravity = new Laya.Vector3(0, 0, 0);
            this._rigid.sleepLinearVelocity = -1;
            this._rigid.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
            this._moveDir.x = -this._moveSpeed * Math.cos(this._sprite3D.transform.localRotationEulerY * Math.PI / 180);
            this._moveDir.z = this._moveSpeed * Math.sin(this._sprite3D.transform.localRotationEulerY * Math.PI / 180);
            this._moveDir.y = 0;
            this._rigid.linearVelocity = this._moveDir;
        }
    }

    class Battery extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this._sprite3D = null;
            this._rotateSprite3D = null;
            this._targetSprite3D = null;
            this._RayPoint1Sprite3D = null;
            this._RayPoint2Sprite3D = null;
            this._bulletPre = null;
            this._scene = null;
            this._bRotate = false;
            this._bStart = false;
            this._nCDTime = 3000;
            this._nBlood = 3;
            this._targetRotation = 1000;
            this._angleSpeed = 0.5;
            this._lineStart = new Laya.Vector3(0, 0, 0);
            this._lineEnd = new Laya.Vector3(0, 0, 0);
        }
        onAwake() {
            super.onAwake();
            this._sprite3D = this.owner;
            this._rotateSprite3D = this._sprite3D.getChildByName("Rotate");
            this._RayPoint1Sprite3D = this._sprite3D.getChildByName("RayPoint1");
            this._RayPoint2Sprite3D = this._sprite3D.getChildByName("RayPoint2");
            this._bulletPre = this._sprite3D.getChildByName("Bullet");
            this._scene = this._sprite3D.scene;
            this._targetSprite3D = this._scene.getChildByName("Role");
            this._bRotate = this._rotateSprite3D.active;
            this._bulletPre.active = false;
        }
        onEnable() {
            super.onEnable();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start, this, this.ShootStart);
        }
        onDisable() {
            super.onDisable();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start, this, this.ShootStart);
            Laya.timer.frameOnce(1, this, () => {
                this._sprite3D.destroy();
            });
        }
        onUpdate() {
            super.onUpdate();
            if (this._bRotate && this._bStart) {
                var dir = new Laya.Vector2(0, 0);
                dir.x = this._targetSprite3D.transform.position.x - this._sprite3D.transform.position.x;
                dir.y = this._targetSprite3D.transform.position.z - this._sprite3D.transform.position.z;
                this._targetRotation = Math.atan2(dir.y, -dir.x) * 180 / Math.PI;
                this._sprite3D.transform.localRotationEulerY = Utilit_ZMDGJ_.lerp_ZMDGJ_Euler_ZMDGJ_Angle(this._sprite3D.transform.localRotationEulerY, this._targetRotation, this._angleSpeed);
            }
            this.CheckCollision();
        }
        onDestroy() {
            super.onDestroy();
            Laya.timer.clearAll(this);
        }
        onCollisionEnter(collision) {
            var other = collision.other.owner;
            if (other.name == "Bullet") {
                this._nBlood--;
                if (this._nBlood <= 0) {
                    this._sprite3D.active = false;
                }
            }
        }
        CheckCollision() {
            this._lineStart = this._RayPoint1Sprite3D.transform.position.clone();
            this._lineEnd = this._RayPoint2Sprite3D.transform.position.clone();
            var HitResult = new Array();
            this._scene.physicsSimulation.raycastAllFromTo(this._lineStart, this._lineEnd, HitResult);
            for (var index = 0; index < HitResult.length; index++) {
                var other = HitResult[index].collider.owner;
                if (other.name == "Goods") {
                    var moveX = this._RayPoint2Sprite3D.transform.position.x - this._RayPoint1Sprite3D.transform.position.x;
                    var moveZ = this._RayPoint2Sprite3D.transform.position.z - this._RayPoint1Sprite3D.transform.position.z;
                    other.transform.position = new Laya.Vector3(other.transform.position.x + 0.1 * moveX, other.transform.position.y, other.transform.position.z + 0.1 * moveZ);
                }
            }
        }
        ShootStart() {
            this.Shoot();
            Laya.timer.loop(this._nCDTime, this, this.Shoot);
            this._bStart = true;
        }
        Shoot() {
            var bulletIns = Laya.Sprite3D.instantiate(this._bulletPre, this._scene);
            bulletIns.addComponent(Bullet);
            bulletIns.active = true;
            Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_Sound("Shoot");
        }
    }

    class BarrierEnemy extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this._sprite3D = null;
            this._rigid = null;
            this._animator = null;
            this._followSprite3D = null;
            this._targetSprite3D = null;
            this._scene = null;
            this._bStart = false;
            this._bFollow = false;
            this._bMove = false;
            this._bCollision = false;
            this._nTriggerDis = 2;
            this._moveSpeed = 1.5;
            this._moveDir = new Laya.Vector3(0, 0, 0);
            this._targetRotation = 1000;
            this._angleSpeed = 4;
        }
        onAwake() {
            super.onAwake();
            this._sprite3D = this.owner;
            this._rigid = this.owner.getComponent(Laya.Rigidbody3D);
            this._animator = this._sprite3D.getChildByName("BarrierEnemy").getComponent(Laya.Animator);
            this._followSprite3D = this._sprite3D.getChildByName("IsFollow");
            this._scene = this._sprite3D.scene;
            this._targetSprite3D = this._scene.getChildByName("Role");
            this._bFollow = this._followSprite3D.active;
            this._animator.enabled = false;
            this.InitRigid();
        }
        onEnable() {
            super.onEnable();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start, this, this.LevelStart);
        }
        onDisable() {
            super.onDisable();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start, this, this.LevelStart);
            Laya.timer.frameOnce(1, this, () => {
                this._sprite3D.destroy();
            });
        }
        onDestroy() {
            super.onDestroy();
            Laya.timer.clearAll(this);
        }
        onUpdate() {
            var dir = new Laya.Vector2(0, 0);
            dir.x = this._targetSprite3D.transform.position.x - this._sprite3D.transform.position.x;
            dir.y = this._targetSprite3D.transform.position.z - this._sprite3D.transform.position.z;
            var distance = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
            this.CheckMove(distance);
            if (!this._bMove || !this._bStart || this._bCollision) {
                this._moveDir = new Laya.Vector3(0, 0, 0);
                this._rigid.linearVelocity = this._moveDir;
                this._animator.enabled = false;
                return;
            }
            this._targetRotation = Math.atan2(dir.y, -dir.x) * 180 / Math.PI;
            this._sprite3D.transform.localRotationEulerY = Utilit_ZMDGJ_.lerp_ZMDGJ_Euler_ZMDGJ_Angle(this._sprite3D.transform.localRotationEulerY, this._targetRotation, this._angleSpeed);
            this._moveDir.x = -this._moveSpeed * Math.cos(this._sprite3D.transform.localRotationEulerY * Math.PI / 180);
            this._moveDir.z = this._moveSpeed * Math.sin(this._sprite3D.transform.localRotationEulerY * Math.PI / 180);
            this._moveDir.y = 0;
            this._rigid.linearVelocity = this._moveDir;
            if (!this._animator.enabled) {
                this._animator.enabled = true;
                Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_Sound("Snake");
            }
        }
        onCollisionEnter(collision) {
            var other = collision.other.owner;
            console.log(other.name);
            if (other.name == "Role") {
                this._bCollision = true;
                Laya.timer.once(2000, this, () => {
                    this._bCollision = false;
                });
            }
            else if (other.name == "Bullet") {
                this._sprite3D.active = false;
            }
        }
        InitRigid() {
            this._rigid.restitution = 0;
            this._rigid.friction = 0;
            this._rigid.rollingFriction = 0;
            this._rigid.linearDamping = 0;
            this._rigid.angularDamping = 0;
            this._rigid.gravity = new Laya.Vector3(0, 0, 0);
            this._rigid.linearFactor = new Laya.Vector3(1, 0, 1);
            this._rigid.angularFactor = new Laya.Vector3(0, 0, 0);
            this._rigid.sleepLinearVelocity = -1;
            this._rigid.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
        }
        LevelStart() {
            this._bStart = true;
        }
        CheckMove(distance) {
            if (this._bFollow || (!this._bFollow && distance < this._nTriggerDis)) {
                this._bMove = true;
            }
            else {
                this._bMove = false;
            }
        }
    }

    class BarrierRock extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this._sprite3D = null;
            this._collider = null;
            this._animator = null;
        }
        onAwake() {
            super.onAwake();
            this._sprite3D = this.owner;
            this._collider = this.owner.getComponent(Laya.PhysicsCollider);
            this._animator = this._sprite3D.getComponent(Laya.Animator);
            this._animator.enabled = false;
            this.BeHitted();
        }
        onEnable() {
            super.onEnable();
        }
        onDisable() {
            super.onDisable();
            Laya.timer.frameOnce(1, this, () => {
                this._sprite3D.destroy();
            });
        }
        onDestroy() {
            super.onDestroy();
            Laya.timer.clearAll(this);
        }
        BeHitted() {
            this._collider.enabled = false;
            this._animator.enabled = true;
            Laya.timer.once(2200, this, this.DestroySelf, null, false);
            console.log("BeHitted");
        }
        DestroySelf() {
            this._sprite3D.active = false;
        }
    }

    class BarrierBull extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this._sprite3D = null;
            this._rigid = null;
            this._animator = null;
            this._targetSprite3D = null;
            this._scene = null;
            this._bStart = false;
            this._bCollision = false;
            this._bMove = false;
            this._bMoving = false;
            this._nMoveTime = 0;
            this._nMoveTimeMax = 60;
            this._nTriggerDis = 3.5;
            this._moveSpeed = 5;
            this._moveDir = new Laya.Vector3(0, 0, 0);
            this._targetRotation = 1000;
            this._angleSpeed = 5;
        }
        onAwake() {
            super.onAwake();
            this._sprite3D = this.owner;
            this._rigid = this.owner.getComponent(Laya.Rigidbody3D);
            this._animator = this._sprite3D.getChildByName("BarrierBull").getComponent(Laya.Animator);
            this._scene = this._sprite3D.scene;
            this._targetSprite3D = this._scene.getChildByName("Role");
            this._animator.play("Idle");
            this.InitRigid();
        }
        onEnable() {
            super.onEnable();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start, this, this.LevelStart);
        }
        onDisable() {
            super.onDisable();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start, this, this.LevelStart);
            Laya.timer.frameOnce(1, this, () => {
                this._sprite3D.destroy();
            });
        }
        onDestroy() {
            super.onDestroy();
            Laya.timer.clearAll(this);
        }
        onUpdate() {
            super.onUpdate();
            var dir = new Laya.Vector2(0, 0);
            dir.x = this._targetSprite3D.transform.position.x - this._sprite3D.transform.position.x;
            dir.y = this._targetSprite3D.transform.position.z - this._sprite3D.transform.position.z;
            var distance = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
            this._bMove = distance < this._nTriggerDis ? true : false;
            this._rigid.wakeUp();
            if (!this._bMove || !this._bStart || this._bCollision) {
                this._moveDir = new Laya.Vector3(0, 0, 0);
                this._rigid.linearVelocity = this._moveDir;
                if (this._bCollision) {
                }
                else {
                    this._animator.play("Idle");
                }
                return;
            }
            this._animator.play("Hit");
            if (!this._bMoving) {
                this._targetRotation = Math.atan2(dir.y, -dir.x) * 180 / Math.PI;
                this._sprite3D.transform.localRotationEulerY = Utilit_ZMDGJ_.lerp_ZMDGJ_Euler_ZMDGJ_Angle(this._sprite3D.transform.localRotationEulerY, this._targetRotation, this._angleSpeed);
                this._sprite3D.transform.localRotationEulerY = this._sprite3D.transform.localRotationEulerY > 180 ? this._sprite3D.transform.localRotationEulerY - 360 : this._sprite3D.transform.localRotationEulerY;
                this._sprite3D.transform.localRotationEulerY = this._sprite3D.transform.localRotationEulerY <= -180 ? this._sprite3D.transform.localRotationEulerY + 360 : this._sprite3D.transform.localRotationEulerY;
                if (Math.abs(this._sprite3D.transform.localRotationEulerY - this._targetRotation) < 1) {
                    this._moveDir.x = -this._moveSpeed * Math.cos(this._sprite3D.transform.localRotationEulerY * Math.PI / 180);
                    this._moveDir.z = this._moveSpeed * Math.sin(this._sprite3D.transform.localRotationEulerY * Math.PI / 180);
                    this._moveDir.y = 0;
                    this._rigid.linearVelocity = this._moveDir;
                    this._bMoving = true;
                    Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_Sound("Shoot");
                }
            }
            else {
                this._nMoveTime++;
                this._rigid.linearVelocity = this._moveDir;
                if (this._nMoveTime >= this._nMoveTimeMax) {
                    this._bCollision = true;
                    this._animator.play("Idle");
                    Laya.timer.once(2000, this, () => {
                        this._bCollision = false;
                    });
                    this._bMoving = false;
                    this._nMoveTime = 0;
                    this._moveDir = new Laya.Vector3(0, 0, 0);
                    this._rigid.linearVelocity = this._moveDir;
                }
            }
        }
        onCollisionEnter(collision) {
            var other = collision.other.owner;
            if (other.name == "Bullet") {
                this._sprite3D.active = false;
            }
            else if (other.name == "BarrierRock") {
                if (other.getComponent(BarrierRock) == null) {
                    other.addComponent(BarrierRock);
                }
                this.Collision();
            }
            else if (other.name == "Role" || other.name.indexOf("Wall") > -1 || other.name == "Battery" || other.name.indexOf("Barrier") > -1) {
                this.Collision();
            }
        }
        InitRigid() {
            this._rigid.restitution = 0;
            this._rigid.friction = 0;
            this._rigid.rollingFriction = 0;
            this._rigid.linearDamping = 0;
            this._rigid.angularDamping = 0;
            this._rigid.gravity = new Laya.Vector3(0, 0, 0);
            this._rigid.linearFactor = new Laya.Vector3(1, 0, 1);
            this._rigid.angularFactor = new Laya.Vector3(0, 0, 0);
            this._rigid.sleepLinearVelocity = -1;
            this._rigid.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER | Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
        }
        LevelStart() {
            this._bStart = true;
        }
        Collision() {
            this._bCollision = true;
            this._animator.play("Collision");
            Laya.timer.once(3500, this, () => {
                this._bCollision = false;
                this._animator.play("Idle");
            });
            this._bMoving = false;
            this._nMoveTime = 0;
            this._moveDir = new Laya.Vector3(0, 0, 0);
            this._rigid.linearVelocity = this._moveDir;
        }
    }

    class Goods extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this._sprite3D = null;
            this._nInitScal = new Laya.Vector3(1, 1, 1);
        }
        onAwake() {
            super.onAwake();
            this._sprite3D = this.owner;
            this._nInitScal = this._sprite3D.transform.getWorldLossyScale().clone();
        }
        onUpdate() {
            super.onUpdate();
            this._sprite3D.transform.setWorldLossyScale(this._nInitScal);
        }
    }

    class BarrierHammer extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this._sprite3D = null;
            this._rigid = null;
            this._nInitpos = new Laya.Vector3(0, 0, 0);
        }
        onAwake() {
            super.onAwake();
            this._sprite3D = this.owner.getChildByName("BarrierHammer");
            this._rigid = this._sprite3D.getComponent(Laya.Rigidbody3D);
            this._nInitpos = this._sprite3D.transform.localPosition.clone();
            this._rigid.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
        }
        onUpdate() {
            super.onUpdate();
            this._sprite3D.transform.localPosition = this._nInitpos;
        }
    }

    class BarrierStab extends Laya.Script {
        constructor() {
            super(...arguments);
            this._sprite3D = null;
            this._rigid = null;
            this._nInitpos = new Laya.Vector3(0, 0, 0);
            this._nInitRotion = new Laya.Vector3(0, 0, 0);
        }
        onAwake() {
            super.onAwake();
            this._sprite3D = this.owner.getChildByName("BarrierStab");
            this._rigid = this._sprite3D.getComponent(Laya.Rigidbody3D);
            this._nInitpos = this._sprite3D.transform.localPosition.clone();
            this._nInitRotion = this._sprite3D.transform.localRotationEuler.clone();
            this._rigid.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
        }
        onUpdate() {
            super.onUpdate();
            this._sprite3D.transform.localPositionX = this._nInitpos.x;
            this._sprite3D.transform.localPositionZ = this._nInitpos.z;
            this._sprite3D.transform.localRotationEuler = this._nInitRotion;
        }
    }

    class Level extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this._scene = null;
            this._camera = null;
            this._roleSprite = null;
            this._objectsSprite = null;
            this._role = null;
            this._isStart = false;
            this._nAllBoxNum = 0;
        }
        get IsStart() { return this._isStart; }
        get AllBoxNum() { return this._nAllBoxNum; }
        onAwake() {
            super.onAwake();
            this._scene = this.owner;
            this._camera = this.owner.getChildByName("Main Camera");
            this._roleSprite = this.owner.getChildByName("Role");
            this._objectsSprite = this.owner.getChildByName("Objects");
            this.InitCamera();
            this.InitRole();
            this.InitObjects();
        }
        onStart() {
            super.onStart();
            this.LevelStart();
        }
        onEnable() {
            super.onEnable();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start, this, this.LevelStart);
        }
        onDisable() {
            super.onDisable();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start, this, this.LevelStart);
        }
        InitCamera() {
            this._camera.addComponent(CameraFollow);
        }
        InitRole() {
            this._role = this._roleSprite.addComponent(Role);
        }
        InitObjects() {
            var GoodsAll = this._objectsSprite.getChildByName("GoodsAll");
            var Coins = this._objectsSprite.getChildByName("Coins");
            var Batterys = this._objectsSprite.getChildByName("Batterys");
            var Barriers = this._objectsSprite.getChildByName("Barriers");
            var i = 0;
            this._nAllBoxNum = GoodsAll.numChildren;
            for (i = 0; i < GoodsAll.numChildren; i++) {
                GoodsAll.getChildAt(i).addComponent(Goods);
            }
            for (i = 0; i < Coins.numChildren; i++) {
                if (Coins.getChildAt(i).getComponent(Laya.PhysicsCollider) != null) {
                    Coins.getChildAt(i).getComponent(Laya.PhysicsCollider).collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
                    Coins.getChildAt(i).getComponent(Laya.PhysicsCollider).isTrigger = true;
                }
            }
            for (i = 0; i < Batterys.numChildren; i++) {
                Batterys.getChildAt(i).addComponent(Battery);
            }
            for (i = 0; i < Barriers.numChildren; i++) {
                switch (Barriers.getChildAt(i).name) {
                    case "BarrierEnemy":
                        Barriers.getChildAt(i).addComponent(BarrierEnemy);
                        break;
                    case "BarrierBull":
                        Barriers.getChildAt(i).addComponent(BarrierBull);
                        break;
                    case "BarrierRock":
                        Barriers.getChildAt(i).getComponent(Laya.Animator).enabled = false;
                        ;
                        break;
                    case "BarrierHammer":
                        Barriers.getChildAt(i).addComponent(BarrierHammer);
                        break;
                    case "BarrierStab":
                        Barriers.getChildAt(i).addComponent(BarrierStab);
                        break;
                }
            }
        }
        LevelStart() {
            this._isStart = true;
        }
        LevelOver(isWin) {
            if (!this._isStart) {
                return;
            }
            this._isStart = false;
            Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().GameOver(isWin);
        }
        DestroySelf() {
            if (this._scene) {
                this._scene.active = false;
                Laya.timer.frameOnce(1, this, () => {
                    this._scene.removeSelf();
                    this._scene.destroy();
                });
            }
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

    class Game_ZMDGJ_Mgr extends Laya.Script {
        constructor() {
            super();
            this._curLevel = null;
            this._bSceneOpen = false;
            Game_ZMDGJ_Mgr._instance = this;
        }
        static get_ZMDGJ_Instance() { return Game_ZMDGJ_Mgr._instance; }
        get CurLevel() { return this._curLevel; }
        onAwake() {
        }
        onStart() {
            this.pre_ZMDGJ_Create_ZMDGJ_Game();
        }
        pre_ZMDGJ_Create_ZMDGJ_Game() {
            Laya.URL.customFormat = (url) => {
                return url;
            };
            Laya.MouseManager.multiTouchEnabled = false;
            this.EnterGameScene(() => {
                Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.App_Close_ZMDGJ_First_ZMDGJ_Loading_ZMDGJ_View);
            });
        }
        save_ZMDGJ_Game_ZMDGJ_Data() {
            Laya.LocalStorage.setItem("Game_Data", User_ZMDGJ_.get_ZMDGJ_Save_ZMDGJ_Data());
        }
        report_ZMDGJ_Launch_ZMDGJ_Options() {
            Http_ZMDGJ_Unit.Get_ZMDGJ_user_ZMDGJ_ip((res) => {
                if (1 == res.code) {
                    console.log("获取玩家ip,地区成功 ：", res.data.dqip, res.data.ipxq);
                    let opt = null;
                    if (Laya.Browser.onMiniGame) {
                        opt = WX_ZMDGJ_API.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync();
                    }
                    else if (Laya.Browser.onQQMiniGame) {
                        opt = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync();
                    }
                    if (null != opt) {
                        ALD.ald_ZMDGJ_Send_ZMDGJ_Report_ZMDGJ_LaunchOptions(opt.scene, res.data.dqip, res.data.ipxq);
                    }
                }
            }, (res) => {
                console.log("获取玩家ip,地区失败");
                let opt = null;
                if (Laya.Browser.onMiniGame) {
                    opt = WX_ZMDGJ_API.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync();
                }
                else if (Laya.Browser.onQQMiniGame) {
                    opt = QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.get_ZMDGJ_Launch_ZMDGJ_Options_ZMDGJ_Sync();
                }
                if (null != opt) {
                    ALD.ald_ZMDGJ_Send_ZMDGJ_Report_ZMDGJ_LaunchOptions(opt.scene, "", "");
                }
            });
        }
        EnterGameScene(onComplate) {
            if (this._bSceneOpen) {
                return;
            }
            var levelScene = App_ZMDGJ_Config.Res_ZMDGJ_Server + "/LayaScene/Conventional/" + User_ZMDGJ_.get_ZMDGJ_FakerLeveNum().toString() + ".ls";
            Laya.Scene3D.load(levelScene, Laya.Handler.create(this, (scene) => {
                console.log("GameMgr.EnterGameScene : " + levelScene + " loaded");
                Laya.stage.addChild(scene);
                this._curLevel = scene.addComponent(Level);
                View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.MainView, null, onComplate);
                this._bSceneOpen = true;
                GameSwitchConfig.getInstance().SetBannerActive();
            }));
            Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_BGM("BGM");
            GameSwitchConfig.getInstance().SetBannerActive();
        }
        GameOver(bWin) {
            if (!this._bSceneOpen) {
                return;
            }
            var gameOverView = bWin ? View_ZMDGJ_Def.GameWinView : View_ZMDGJ_Def.GameFailView;
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(gameOverView, { bWin: bWin }, () => {
                View_ZMDGJ_Mgr.ins_ZMDGJ_tance.close_ZMDGJ_View(View_ZMDGJ_Def.InGameView);
                this._curLevel.DestroySelf();
                this._bSceneOpen = false;
            });
            Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.stop_ZMDGJ_BGM();
        }
        PreLoadScene(level) {
            if (Utilit_ZMDGJ_.is_ZMDGJ_Iphone6()) {
                console.log("is_ZMDGJ_Iphone6 不预加载远程场景关卡");
                return;
            }
            let levelScene = App_ZMDGJ_Config.Res_ZMDGJ_Server + "/LayaScene/Conventional/" + level + ".ls";
            Laya.Scene3D.load(levelScene, Laya.Handler.create(this, function (scene) {
                console.log("预加载远程场景关卡" + levelScene + "  加载完成");
            }));
        }
    }
    Game_ZMDGJ_Mgr._instance = null;

    function isIViewStateListener(element) {
        if ((null != element.onViewShow && typeof (element.onViewShow) == "function")
            && (null != element.onViewHide && typeof (element.onViewHide) == "function")) {
            return true;
        }
        return false;
    }

    class View_ZMDGJ_Base extends Laya.Script {
        constructor() {
            super(...arguments);
            this.on_ZMDGJ_CloseEvent = null;
            this.on_ZMDGJ_OpenEvent = null;
            this._viewBase = true;
            this._viewDef = View_ZMDGJ_Def.None;
            this._data = {};
        }
        get View_ZMDGJ_() {
            return this.owner;
        }
        onAwake() {
            super.onAwake();
        }
        onEnable() {
            super.onEnable();
            this.add_ZMDGJ_Event();
        }
        onDisable() {
            super.onDisable();
            this.remove_ZMDGJ_Event();
        }
        onDestroy() {
            super.onDestroy();
            this.remove_ZMDGJ_Event();
        }
        open_ZMDGJ_View(data) {
            this._data = data;
            this.show_ZMDGJ_();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_On_ZMDGJ_View_ZMDGJ_Open, { view: this._viewDef });
            if (this.on_ZMDGJ_OpenEvent) {
                this.on_ZMDGJ_OpenEvent();
            }
        }
        add_ZMDGJ_Event() {
        }
        remove_ZMDGJ_Event() {
            Laya.timer.clearAll(this);
        }
        close_ZMDGJ_View() {
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.close_ZMDGJ_View(this._viewDef);
        }
        hide_ZMDGJ_() {
            this.View_ZMDGJ_.visible = false;
            this.onHide();
            Utilit_ZMDGJ_.for_ZMDGJ_Each_ZMDGJ_Child(this.owner, (child) => {
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
        show_ZMDGJ_() {
            this.View_ZMDGJ_.visible = true;
            this.onShow();
            Utilit_ZMDGJ_.for_ZMDGJ_Each_ZMDGJ_Child(this.owner, (child) => {
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
        view_ZMDGJ_IsHide() {
            return this.View_ZMDGJ_.visible;
        }
        onHide() { }
        onShow() { }
        onClose() {
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_On_ZMDGJ_View_ZMDGJ_Close, { view: this._viewDef });
            if (this.on_ZMDGJ_CloseEvent) {
                this.on_ZMDGJ_CloseEvent();
            }
        }
    }

    class Loading_ZMDGJ_View extends View_ZMDGJ_Base {
        constructor() {
            super(...arguments);
            this._process_ZMDGJ_Width = 0;
        }
        onAwake() {
            super.onAwake();
            this._bg_ZMDGJ_ = this.owner.getChildByName("Bg");
            this._bottom_ZMDGJ_Zone = this._bg_ZMDGJ_.getChildByName("BottomZone");
            this._process_ZMDGJ_BarBg = this._bottom_ZMDGJ_Zone.getChildByName("processBarBg");
            this._process_ZMDGJ_Bar = this._process_ZMDGJ_BarBg.getChildByName("processBar");
            this._process_ZMDGJ_Width = this._process_ZMDGJ_Bar.width;
        }
        onStart() {
            super.onStart();
            Laya.timer.once(250, this, () => {
            });
        }
        onEnable() {
            super.onEnable();
        }
        add_ZMDGJ_Event() {
            super.add_ZMDGJ_Event();
        }
        remove_ZMDGJ_Event() {
            super.remove_ZMDGJ_Event();
        }
        onUpdate() {
            super.onUpdate();
            this._bg_ZMDGJ_.width = Laya.stage.width;
            this._bg_ZMDGJ_.height = Laya.stage.height;
        }
        set_ZMDGJ_Process(process) {
            if (process < 0)
                process = 0;
            if (process > 1)
                process = 1;
            var width = this._process_ZMDGJ_Width * process;
            if (width < 1)
                width = 1;
            this._process_ZMDGJ_Bar.width = width;
        }
    }

    class Button_ZMDGJ_Anim extends Laya.Script {
        constructor() {
            super();
            this.use_ZMDGJ_Sound = true;
        }
        onAwake() {
            super.onAwake();
            this.owner.on(Laya.Event.MOUSE_DOWN, this, this.on_ZMDGJ_Down);
            this.owner.on(Laya.Event.MOUSE_UP, this, this.on_ZMDGJ_Up);
            this.owner.on(Laya.Event.MOUSE_OUT, this, this.on_ZMDGJ_Up);
        }
        onDisable() {
            super.onDisable();
            this.owner.offAll();
            Laya.Tween.clearAll(this);
        }
        on_ZMDGJ_Down() {
            Laya.Tween.to(this.owner, { scaleX: 0.9, scaleY: 0.9 }, 50);
            if (this.use_ZMDGJ_Sound) {
                Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_Sound("anniu");
            }
        }
        on_ZMDGJ_Up() {
            Laya.Tween.to(this.owner, { scaleX: 1, scaleY: 1 }, 50);
        }
    }

    class Template_ZMDGJ_View_ZMDGJ_Base extends View_ZMDGJ_Base {
        onAwake() {
            super.onAwake();
        }
        add_ZMDGJ_Event() {
            super.add_ZMDGJ_Event();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.App_On_ZMDGJ_Update_ZMDGJ_IpBlockState, this, this.on_ZMDGJ_UpdateIp_ZMDGJ_BlockState);
        }
        remove_ZMDGJ_Event() {
            super.remove_ZMDGJ_Event();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.App_On_ZMDGJ_Update_ZMDGJ_IpBlockState, this, this.on_ZMDGJ_UpdateIp_ZMDGJ_BlockState);
        }
        on_ZMDGJ_History_ZMDGJ_Btn() {
            let self = this;
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.MiniGameView, null, (v) => {
                self.hide_ZMDGJ_();
                v.on_ZMDGJ_CloseEvent = () => {
                    if (null != self.View_ZMDGJ_ && !self.View_ZMDGJ_.destroyed) {
                        self.show_ZMDGJ_();
                    }
                };
            });
        }
        get is_ZMDGJ_Show_ZMDGJ_HistoryBtn() {
            return true;
        }
        on_ZMDGJ_UpdateIp_ZMDGJ_BlockState(para) {
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
            var json = Laya.loader.getRes(App_ZMDGJ_Config.Local_ZMDGJ_Test_ZMDGJ_ReServer + "/json/storeconfig.json");
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

    class WX_ZMDGJ_BannderAd {
        constructor(bannerid) {
            this._id_ZMDGJ_ = null;
            this._banner_ZMDGJ_ = null;
            this._create_ZMDGJ_Time = 0;
            this._destroyed_ZMDGJ_ = false;
            this._ZMDGJ__error_ZMDGJ_ = null;
            this._loading_ZMDGJ_ = false;
            this._retry_ZMDGJ_Count = 0;
            this._banner_ZMDGJ_Total_ZMDGJ_ShowTime = 0;
            this._last_ZMDGJ_Show_ZMDGJ_Time = 0;
            this._id_ZMDGJ_ = bannerid;
        }
        get _ZMDGJ_Id_ZMDGJ_() {
            return this._id_ZMDGJ_;
        }
        get Create_ZMDGJ_Time() {
            return this._create_ZMDGJ_Time;
        }
        get Destroyed_ZMDGJ_() {
            return this._destroyed_ZMDGJ_;
        }
        get is_ZMDGJ_Ready() {
            return null != this._banner_ZMDGJ_;
        }
        get is_ZMDGJ_Error() {
            return null != this._ZMDGJ__error_ZMDGJ_;
        }
        get _ZMDGJ_Error_ZMDGJ_() {
            return this._ZMDGJ__error_ZMDGJ_;
        }
        get Load_ZMDGJ_ing() {
            return this._loading_ZMDGJ_;
        }
        get Retry_ZMDGJ_Count() {
            return this._retry_ZMDGJ_Count;
        }
        get Banner_ZMDGJ_Total_ZMDGJ_ShowTime() {
            return this._banner_ZMDGJ_Total_ZMDGJ_ShowTime;
        }
        _ZMDGJ_show_ZMDGJ_() {
            if (this.is_ZMDGJ_Ready) {
                this._banner_ZMDGJ_.hide();
                let self = this;
                let sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
                let sw = sysInfo.screenWidth;
                let sh = sysInfo.screenHeight;
                let pos = new Laya.Point(0, 0);
                let width = 300;
                let left = sw / 2 - width / 2;
                let top = sh - 130;
                this._banner_ZMDGJ_.style.left = left;
                this._banner_ZMDGJ_.style.top = top;
                this._last_ZMDGJ_Show_ZMDGJ_Time = Laya.timer.currTimer;
                this._banner_ZMDGJ_.show();
            }
        }
        _ZMDGJ_hide_ZMDGJ_() {
            if (this.is_ZMDGJ_Ready) {
                this._banner_ZMDGJ_.hide();
                this._banner_ZMDGJ_Total_ZMDGJ_ShowTime += (Laya.timer.currTimer - this._last_ZMDGJ_Show_ZMDGJ_Time);
            }
        }
        des_ZMDGJ_troy() {
            if (this._destroyed_ZMDGJ_) {
                console.log("BannerAd 已经被销毁");
                return;
            }
            if (this._loading_ZMDGJ_) {
                console.log("BannerAd 正在加载中，无法进行销毁");
                return;
            }
            if (null != this._banner_ZMDGJ_) {
                this._banner_ZMDGJ_.destroy();
            }
            this._banner_ZMDGJ_ = null;
            this._destroyed_ZMDGJ_ = true;
        }
        _ZMDGJ_retry_ZMDGJ_(callBack) {
            if (this._destroyed_ZMDGJ_) {
                console.log("BannerAd 已被销毁，无法重试");
                return;
            }
            if (this.is_ZMDGJ_Ready) {
                console.log("BannerAd 已创建成功，无需重试");
                return;
            }
            if (this._loading_ZMDGJ_) {
                console.log("BannerAd 正在创建中");
                return;
            }
            if (this._retry_ZMDGJ_Count >= WX_ZMDGJ_BannderAd.MAX__ZMDGJ_RETRY_COUNT_ZMDGJ_) {
                console.log("此 BannerAd 重试次数已达最大");
                return;
            }
            let self = this;
            this._create_ZMDGJ_((isOk) => {
                if (null != callBack) {
                    callBack(isOk);
                }
                ++self._retry_ZMDGJ_Count;
            });
        }
        _create_ZMDGJ_(callBack) {
            if (!Laya.Browser.onMiniGame) {
                if (null != callBack) {
                    callBack(false);
                }
                return;
            }
            let banner = null;
            if (Laya.Browser.onMiniGame) {
                banner = Laya.Browser.window["wx"].createBannerAd({
                    adUnitId: this._id_ZMDGJ_,
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
                    adUnitId: this._id_ZMDGJ_,
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
                this._loading_ZMDGJ_ = true;
                banner.onLoad((res) => {
                    console.log("BannderAd 加载完成", self._id_ZMDGJ_, res);
                    self._banner_ZMDGJ_ = banner;
                    self._create_ZMDGJ_Time = Laya.timer.currTimer;
                    self._loading_ZMDGJ_ = false;
                    if (null != callBack) {
                        callBack(true);
                    }
                });
                banner.onError((err) => {
                    console.log("BannderAd 加载失败", self._id_ZMDGJ_, err);
                    self._ZMDGJ__error_ZMDGJ_ = err;
                    self._loading_ZMDGJ_ = false;
                    banner.destroy();
                    if (null != callBack) {
                        callBack(false);
                    }
                });
            }
        }
    }
    WX_ZMDGJ_BannderAd.MAX__ZMDGJ_RETRY_COUNT_ZMDGJ_ = 3;
    class WX_ZMDGJ_GridAd {
        constructor(bannerid) {
            this._id_ZMDGJ_ = null;
            this._grid_ZMDGJ_Ad = null;
            this._create_ZMDGJ_Time = 0;
            this._des_ZMDGJ_troyed = false;
            this._ZMDGJ__error_ZMDGJ_ = null;
            this._load_ZMDGJ_ing = false;
            this._id_ZMDGJ_ = bannerid;
        }
        get Create_ZMDGJ_Time() {
            return this._create_ZMDGJ_Time;
        }
        get Des_ZMDGJ_troyed() {
            return this._des_ZMDGJ_troyed;
        }
        get is_ZMDGJ_Ready() {
            return null != this._grid_ZMDGJ_Ad;
        }
        get is_ZMDGJ_Error() {
            return null != this._ZMDGJ__error_ZMDGJ_;
        }
        get _ZMDGJ_Error_ZMDGJ_() {
            return this._ZMDGJ__error_ZMDGJ_;
        }
        get Load_ZMDGJ_ing() {
            return this._load_ZMDGJ_ing;
        }
        _ZMDGJ_show_ZMDGJ_() {
            if (this.is_ZMDGJ_Ready) {
                this._grid_ZMDGJ_Ad.show();
            }
        }
        _ZMDGJ_hide_ZMDGJ_() {
            if (this.is_ZMDGJ_Ready) {
                this._grid_ZMDGJ_Ad.hide();
            }
        }
        des_ZMDGJ_troy() {
            if (this._des_ZMDGJ_troyed) {
                console.log("GridAD 已经被销毁");
                return;
            }
            if (this._load_ZMDGJ_ing) {
                console.log("GridAD 正在加载中，无法进行销毁");
                return;
            }
            if (null != this._grid_ZMDGJ_Ad) {
                this._grid_ZMDGJ_Ad.destroy();
            }
            this._grid_ZMDGJ_Ad = null;
            this._des_ZMDGJ_troyed = true;
        }
        _ZMDGJ_retry_ZMDGJ_(callBack) {
            if (this._des_ZMDGJ_troyed) {
                console.log("GridAD 已被销毁，无法重试");
                return;
            }
            if (this.is_ZMDGJ_Ready) {
                console.log("GridAD 已创建成功，无需重试");
                return;
            }
            if (this._load_ZMDGJ_ing) {
                console.log("GridAD 正在创建中");
                return;
            }
            let self = this;
            this._ZMDGJ__create_ZMDGJ_((isOk) => {
                if (null != callBack) {
                    callBack(isOk);
                }
            });
        }
        _ZMDGJ__create_ZMDGJ_(callBack) {
            if (!Laya.Browser.onMiniGame) {
                if (null != callBack) {
                    callBack(false);
                }
                return;
            }
            let gridAd = Laya.Browser.window["wx"].createGridAd({
                adUnitId: this._id_ZMDGJ_,
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
                this._load_ZMDGJ_ing = true;
                gridAd.onLoad((res) => {
                    console.log("GridAD 加载完成", self._id_ZMDGJ_, res);
                    self._grid_ZMDGJ_Ad = gridAd;
                    self._create_ZMDGJ_Time = Laya.timer.currTimer;
                    self._load_ZMDGJ_ing = false;
                    if (null != callBack) {
                        callBack(true);
                    }
                });
                gridAd.onError((err) => {
                    console.log("GridAD 加载失败", self._id_ZMDGJ_, err);
                    self._ZMDGJ__error_ZMDGJ_ = err;
                    self._load_ZMDGJ_ing = false;
                    gridAd.destroy();
                    if (null != callBack) {
                        callBack(false);
                    }
                });
            }
        }
    }
    class WX_ZMDGJ_ADMgr {
        static _ZMDGJ_init_ZMDGJ_() {
            if (WX_ZMDGJ_ADMgr._inited_ZMDGJ_)
                return;
            let banners = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wx_ZMDGJ_Wu_ZMDGJ_Dian_ZMDGJ_Banners;
            for (let i = 0; i < banners.length; ++i) {
                WX_ZMDGJ_ADMgr._banner_ZMDGJ_Ids.push(banners[i]);
            }
            for (let i = 0; i < WX_ZMDGJ_ADMgr._banner_ZMDGJ_Ids.length; ++i) {
                let cur = WX_ZMDGJ_ADMgr._banner_ZMDGJ_Ids[i];
                WX_ZMDGJ_ADMgr._banner_ZMDGJ_Ids[i] = banners[Math.floor(Math.random() * banners.length)];
            }
            WX_ZMDGJ_ADMgr._create_ZMDGJ_BannerAd_ZMDGJ_();
            let bannerRecreateTime = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Create_ZMDGJ_FailNum * 1000;
            Laya.timer.loop(bannerRecreateTime, WX_ZMDGJ_ADMgr, () => {
                WX_ZMDGJ_ADMgr._check_ZMDGJ_BannerAd_ZMDGJ_();
                WX_ZMDGJ_ADMgr._create_ZMDGJ_BannerAd_ZMDGJ_();
            });
            WX_ZMDGJ_ADMgr._inited_ZMDGJ_ = true;
        }
        static get_ZMDGJ_Banner(callBack) {
            let readyBannerAd = [];
            let UnreadyBannerAd = [];
            for (let i = 0; i < WX_ZMDGJ_ADMgr._banners_ZMDGJ_.length; ++i) {
                let bannerAd = WX_ZMDGJ_ADMgr._banners_ZMDGJ_[i];
                if (!bannerAd.Destroyed_ZMDGJ_) {
                    if (bannerAd.is_ZMDGJ_Ready) {
                        readyBannerAd.push(bannerAd);
                    }
                    else {
                        UnreadyBannerAd.push(bannerAd);
                    }
                }
            }
            if (WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_GetIndex >= readyBannerAd.length) {
                WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_GetIndex = 0;
            }
            let bannerAd = readyBannerAd[WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_GetIndex];
            ++WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_GetIndex;
            if (null != bannerAd) {
                callBack(bannerAd);
            }
            else {
                bannerAd = WX_ZMDGJ_ADMgr._create_ZMDGJ_BannerAd_ZMDGJ_();
                if (null == bannerAd) {
                    bannerAd = WX_ZMDGJ_ADMgr._banners_ZMDGJ_[Math.floor(Math.random() * WX_ZMDGJ_ADMgr._banners_ZMDGJ_.length)];
                }
                if (null == bannerAd) {
                    callBack(null);
                }
                else {
                    bannerAd._ZMDGJ_retry_ZMDGJ_((ok) => {
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
        static _create_ZMDGJ_BannerAd_ZMDGJ_() {
            if (WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_CreateIndex >= WX_ZMDGJ_ADMgr._banner_ZMDGJ_Ids.length)
                return null;
            let bannerAd = new WX_ZMDGJ_BannderAd(WX_ZMDGJ_ADMgr._banner_ZMDGJ_Ids[WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_CreateIndex]);
            WX_ZMDGJ_ADMgr._banners_ZMDGJ_.push(bannerAd);
            bannerAd._ZMDGJ_retry_ZMDGJ_();
            ++WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_CreateIndex;
            return bannerAd;
        }
        static _check_ZMDGJ_BannerAd_ZMDGJ_() {
            let readyBannerAd = [];
            let UnreadyBannerAd = [];
            for (let i = 0; i < WX_ZMDGJ_ADMgr._banners_ZMDGJ_.length; ++i) {
                let bannerAd = WX_ZMDGJ_ADMgr._banners_ZMDGJ_[i];
                if (!bannerAd.Destroyed_ZMDGJ_) {
                    if (bannerAd.is_ZMDGJ_Ready) {
                        readyBannerAd.push(bannerAd);
                    }
                    else {
                        UnreadyBannerAd.push(bannerAd);
                    }
                }
            }
            for (let i = 0; i < WX_ZMDGJ_ADMgr._banners_ZMDGJ_.length; ++i) {
                let bannerAd = WX_ZMDGJ_ADMgr._banners_ZMDGJ_[i];
                let bannerShowTime = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Show_ZMDGJ_Time;
                if (!bannerAd.is_ZMDGJ_Ready) {
                    if (bannerAd.Retry_ZMDGJ_Count >= WX_ZMDGJ_BannderAd.MAX__ZMDGJ_RETRY_COUNT_ZMDGJ_) {
                        console.log("BannerAd 超过重试次数，销毁 : ", bannerAd._ZMDGJ_Id_ZMDGJ_);
                        bannerAd.des_ZMDGJ_troy();
                    }
                    else {
                        bannerAd._ZMDGJ_retry_ZMDGJ_();
                    }
                }
                else if (readyBannerAd.length >= 2 && bannerAd.Banner_ZMDGJ_Total_ZMDGJ_ShowTime >= bannerShowTime * 1000) {
                    console.log("BannerAd 展示时间超过限制，销毁 : ", bannerAd._ZMDGJ_Id_ZMDGJ_);
                    bannerAd.des_ZMDGJ_troy();
                }
            }
        }
        static get_ZMDGJ_Box_ZMDGJ_Ad(callBack) {
            if (WX_ZMDGJ_ADMgr._wx_ZMDGJ_GridAd.is_ZMDGJ_Ready) {
                callBack(WX_ZMDGJ_ADMgr._wx_ZMDGJ_GridAd);
            }
            else {
                let gridAd = WX_ZMDGJ_ADMgr._wx_ZMDGJ_GridAd;
                gridAd._ZMDGJ_retry_ZMDGJ_((isOk) => {
                    if (isOk) {
                        callBack(gridAd);
                    }
                    else {
                        callBack(null);
                    }
                });
            }
        }
        static _create_ZMDGJ_GirdAd() {
            if (null != WX_ZMDGJ_ADMgr._wx_ZMDGJ_GridAd)
                return;
            let gridAd = new WX_ZMDGJ_GridAd("");
            gridAd._ZMDGJ_retry_ZMDGJ_();
            WX_ZMDGJ_ADMgr._wx_ZMDGJ_GridAd = gridAd;
        }
    }
    WX_ZMDGJ_ADMgr._inited_ZMDGJ_ = false;
    WX_ZMDGJ_ADMgr._banner_ZMDGJ_Ids = new Array();
    WX_ZMDGJ_ADMgr._banners_ZMDGJ_ = new Array();
    WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_CreateIndex = 0;
    WX_ZMDGJ_ADMgr._cur_ZMDGJ_Banner_ZMDGJ_GetIndex = 0;
    WX_ZMDGJ_ADMgr._wx_ZMDGJ_GridAd = null;

    class SkinTips extends Template_ZMDGJ_View_ZMDGJ_Base {
        constructor() {
            super(...arguments);
            this._centerZone = null;
            this._okBtn = null;
            this._skipBtn = null;
            this._skinAnchor = null;
            this._banner = null;
            this._ading = false;
            this._skinID = 0;
            this._bUp = true;
            this._bBanner = true;
        }
        onAwake() {
            super.onAwake();
            this._centerZone = this.View_ZMDGJ_.getChildByName("CenterZone");
            this._okBtn = this._centerZone.getChildByName("OkBtn");
            this._skipBtn = this._centerZone.getChildByName("SkipBtn");
            this._skinAnchor = this._centerZone.getChildByName("SkinAnchor");
            this.InitSkin();
        }
        onEnable() {
            super.onEnable();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.RewardVideoFail, this, this.onRewardVidewoFail);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
        }
        onDisable() {
            super.onDisable();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.RewardVideoFail, this, this.onRewardVidewoFail);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.RewardVideoSuccess, this, this.onRewardVidewoSuccess);
        }
        onRewardVidewoFail() {
            this._ading = false;
            this.CloseSelf();
        }
        onRewardVidewoSuccess() {
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_TrySkin, { SkinId: this._skinID });
            this.CloseSelf();
        }
        add_ZMDGJ_Event() {
            super.add_ZMDGJ_Event();
            this._okBtn.on(Laya.Event.CLICK, this, this.onOkBtn);
            this._skipBtn.on(Laya.Event.CLICK, this, this.onSkipBtn);
        }
        remove_ZMDGJ_Event() {
            super.remove_ZMDGJ_Event();
            this._okBtn.off(Laya.Event.CLICK, this, this.onOkBtn);
            this._skipBtn.off(Laya.Event.CLICK, this, this.onSkipBtn);
        }
        onDestroy() {
            super.onDestroy();
            if (null != this._banner) {
                this._banner._ZMDGJ_hide_ZMDGJ_();
            }
            this._banner = null;
        }
        InitSkin() {
            var skinAllDatas = StoreConfig.getInstance().getStoreDatas();
            var skinIndex = Math.floor(Math.random() * (skinAllDatas.length - 1)) + 1;
            this._skinID = skinIndex;
            var self = this;
            Laya.Scene3D.load(App_ZMDGJ_Config.Res_ZMDGJ_Server + "/LayaScene/Conventional/RoleShow.ls", Laya.Handler.create(this, (scene) => {
                console.log("LayaScene load RoleShow");
                this._skinAnchor.addChild(scene);
                var scale = Laya.stage.width / 750;
                var role = scene.getChildByName("Role");
                role.transform.localScaleX = role.transform.localScaleX * scale;
                role.transform.localScaleY = role.transform.localScaleY * scale;
                role.transform.localScaleZ = role.transform.localScaleZ * scale;
                var animator = role.getComponent(Laya.Animator);
                var skinMesh = role.getChildByName("Box001");
                skinMesh.skinnedMeshRenderer.material = skinMesh.skinnedMeshRenderer.materials[skinIndex];
                for (var i = 0; i < role.numChildren; i++) {
                    if (role.getChildAt(i).name.indexOf("Hat") == -1) {
                        continue;
                    }
                    role.getChildAt(i).active = role.getChildAt(i).name.indexOf("Hat" + (skinIndex + 1).toString()) > -1;
                }
                Laya.timer.loop(1, this, () => {
                    role.transform.localRotationEulerY += 2;
                });
                animator.play("Win2");
            }));
        }
        onOkBtn() {
            if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                NativeCallback.CallNativeFunc("showRewardVideo");
                Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.stop_ZMDGJ_BGM();
            }
            else {
                Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_TrySkin, { SkinId: this._skinID });
                this.CloseSelf();
            }
        }
        onSkipBtn() {
            this.CloseSelf();
        }
        BtnUp() {
            if (!this._bUp) {
                this._skipBtn.bottom += 200;
                this._bUp = true;
            }
        }
        BannerUp() {
            console.log("BannerUp");
            let self = this;
            WX_ZMDGJ_ADMgr.get_ZMDGJ_Banner((banner) => {
                if (null != self._banner) {
                    this._banner._ZMDGJ_hide_ZMDGJ_();
                }
                self._banner = banner;
                if (null != self._banner) {
                    this._banner._ZMDGJ_show_ZMDGJ_();
                }
            });
            this._bBanner = true;
        }
        CloseSelf() {
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.InGameView, null, () => {
                View_ZMDGJ_Mgr.ins_ZMDGJ_tance.close_ZMDGJ_View(View_ZMDGJ_Def.SkinTipsView);
                Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_On_ZMDGJ_Level_ZMDGJ_Start);
            });
        }
    }

    class _ZMDGJ_ShareAd_ZMDGJ_ {
        static refresh_ZMDGJ_Ad(complate) {
        }
        static get_ZMDGJ_ADVs(locationid, complate, useRandom, useLocalRandom, sortDatas) {
        }
        static report_ZMDGJ_User_ZMDGJ_Click(advid) {
        }
        static get_ZMDGJ_Random_ZMDGJ_ADPosID() {
            return 0;
        }
        static request_ZMDGJ_(req) {
        }
        static get_ZMDGJ_Ad_ZMDGJ_PosData(onSuccess, onFail) {
        }
        static req_ZMDGJ_User_ZMDGJ_Click(advid, onSuccess, onFail) {
        }
        static get_ZMDGJ_ADV_ZMDGJ_Data(locationid, onSuccess, onFail) {
        }
        static Random_ZMDGJ_Jump(rate = 1) {
        }
        static isNeed_ZMDGJ_ShowAd() {
            return true;
        }
        static sort_ZMDGJ_Datas(datas) {
            return [];
        }
    }
    _ZMDGJ_ShareAd_ZMDGJ_.main_ZMDGJ_Url = "";
    _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_AdPostion = "";
    _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_Adv = "";
    _ZMDGJ_ShareAd_ZMDGJ_.user_ZMDGJ_Click = "";
    _ZMDGJ_ShareAd_ZMDGJ_.LoopAd_ZMDGJ_LocationID = 593;
    _ZMDGJ_ShareAd_ZMDGJ_.Banner_ZMDGJ_AdLocationID = 595;
    _ZMDGJ_ShareAd_ZMDGJ_.Insert_ZMDGJ_AdLocationID = -1;
    _ZMDGJ_ShareAd_ZMDGJ_.AniAd_ZMDGJ_LocationID = -1;
    _ZMDGJ_ShareAd_ZMDGJ_.History_ZMDGJ_LocationID = -1;
    _ZMDGJ_ShareAd_ZMDGJ_.MoreGame_ZMDGJ_LocationID = 594;
    _ZMDGJ_ShareAd_ZMDGJ_.Use_ZMDGJ_Random_ZMDGJ_AdPos = true;
    _ZMDGJ_ShareAd_ZMDGJ_.Ad_ZMDGJ_Locationids = [
        593, 594
    ];
    _ZMDGJ_ShareAd_ZMDGJ_._ad_ZMDGJ_Position = {};
    _ZMDGJ_ShareAd_ZMDGJ_._adv_ZMDGJ_ = {};
    _ZMDGJ_ShareAd_ZMDGJ_._iphone_ZMDGJ_Ignore_ZMDGJ_AppIds = [
        "",
        ""
    ];

    class OPPO_ZMDGJ_API {
        static get Banner_ZMDGJ_Instance() {
            return OPPO_ZMDGJ_API._banner_ZMDGJ_;
        }
        static _ZMDGJ_Login_ZMDGJ_(onSuccess, onFail) {
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
        static init_ZMDGJ_AdService(onSuccess, onFail, onComplete) {
            Laya.Browser.window["qg"].initAdService({
                appId: App_ZMDGJ_Config.App_ZMDGJ_ID,
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
        static show_ZMDGJ_Reward_ZMDGJ_edVideoAd(onAdClose, onFailed) {
            if (Laya.Browser.onQGMiniGame) {
                var videoAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                    posId: OPPO_ZMDGJ_API.ad_ZMDGJ_UnitId,
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
        static navigate_ZMDGJ_To_ZMDGJ_MiniProgram(pkgName, gameName, path, onSuccess, onFail, onComplate) {
            if (Laya.Browser.onQGMiniGame) {
                console.log("OPPO 跳转游戏： " + pkgName);
                Http_ZMDGJ_Unit.report_ZMDGJ_Export(pkgName, gameName, (result) => {
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
                        from: App_ZMDGJ_Config.App_ZMDGJ_ID
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
        static show_ZMDGJ_Interstitial_ZMDGJ_Ad(onAdClose, onFailed) {
            if (Laya.Browser.onQGMiniGame) {
                var insertAd = qg.createInsertAd({
                    posId: OPPO_ZMDGJ_API.Ins_ZMDGJ_AdUnitId
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
        static show_ZMDGJ_Bannaer() {
            if (OPPO_ZMDGJ_API._banner_ZMDGJ_) {
                OPPO_ZMDGJ_API._banner_ZMDGJ_.show();
                return;
            }
            var bannerAd = qg.createBannerAd({
                posId: OPPO_ZMDGJ_API.banner_ZMDGJ_AdUnitId
            });
            bannerAd.show();
            OPPO_ZMDGJ_API._banner_ZMDGJ_ = bannerAd;
        }
        static hide_ZMDGJ_Banner() {
            if (OPPO_ZMDGJ_API._banner_ZMDGJ_) {
                OPPO_ZMDGJ_API._banner_ZMDGJ_.hide();
            }
        }
        static destroyBanner() {
            if (OPPO_ZMDGJ_API._banner_ZMDGJ_) {
                OPPO_ZMDGJ_API._banner_ZMDGJ_.destroy();
            }
            OPPO_ZMDGJ_API._banner_ZMDGJ_ = null;
        }
        static get_ZMDGJ_LaunchOpt_ZMDGJ_ionsSync() {
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
        static _ZMDGJ_share_ZMDGJ_(complate, titel, imageUrl) {
            complate(false);
        }
        static create_ZMDGJ_DesktopIcon(onSuccess, onFail) {
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
        static auto_ZMDGJ_Pop_ZMDGJ_Create_ZMDGJ_DestopIcon(onSuccess, onFail) {
            if (!Laya.Browser.onQGMiniGame) {
                if (null != onFail) {
                    onFail();
                }
                return;
            }
            let rate = Math.floor(Math.random() * 100);
            if (rate <= App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().oppo_ZMDGJ_cfg.add_ZMDGJ_To_ZMDGJ_Desktop) {
                OPPO_ZMDGJ_API.create_ZMDGJ_DesktopIcon(onSuccess, onFail);
            }
            else {
                if (null != onFail) {
                    onFail();
                }
            }
        }
        static show_ZMDGJ_NativeAd(onSuccess, onFail) {
            if (!Laya.Browser.onQGMiniGame) {
                if (null != onFail) {
                    onFail();
                }
                return;
            }
            if (1 == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().oppo_ZMDGJ_cfg.yuan_ZMDGJ_sheng_ZMDGJ_Switch) {
                View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.OPPONativeView, null, (v) => {
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
    OPPO_ZMDGJ_API.ad_ZMDGJ_UnitId = "";
    OPPO_ZMDGJ_API.banner_ZMDGJ_AdUnitId = "";
    OPPO_ZMDGJ_API.Ins_ZMDGJ_AdUnitId = "";
    OPPO_ZMDGJ_API.Open_ZMDGJ_Screen_ZMDGJ_AdUnitId = "";
    OPPO_ZMDGJ_API.Native_ZMDGJ_AdId = "";
    OPPO_ZMDGJ_API._banner_ZMDGJ_ = null;

    class TT_ZMDGJ_API {
        static _ZMDGJ_ttLogin_ZMDGJ_(onSuccess, onFail) {
            if (App_ZMDGJ_Config.onTTMiniGame && null != Laya.Browser.window["tt"]) {
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
                TT_ZMDGJ_API.init_ZMDGJ_Record();
            }
        }
        static on_ZMDGJ_Rewarded_ZMDGJ_Video_ZMDGJ_AdLoad() {
            console.log('激励视频 广告加载完成');
        }
        static on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Error(err) {
            console.log('激励视频 广告加载失败' + err);
            if (TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed) {
                TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed();
            }
        }
        static on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close(res) {
            if ((res && res.isEnded) || res == null) {
                console.log('激励视频 已完整观看');
                if (TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close) {
                    TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close(true);
                }
            }
            else {
                console.log('激励视频 未完整观看');
                if (TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close) {
                    TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close(false);
                }
            }
        }
        static reg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event(rewardedVideoAd) {
            rewardedVideoAd.onLoad(TT_ZMDGJ_API.on_ZMDGJ_Rewarded_ZMDGJ_Video_ZMDGJ_AdLoad);
            rewardedVideoAd.onError(TT_ZMDGJ_API.on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Error);
            rewardedVideoAd.onClose(TT_ZMDGJ_API.on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close);
            TT_ZMDGJ_API._isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event = true;
        }
        static show_ZMDGJ_Rewarded_ZMDGJ_VideoAd(onAdClose, onFailed) {
            if (App_ZMDGJ_Config.onTTMiniGame && null != Laya.Browser.window["tt"]) {
                TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close = onAdClose;
                TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed = onFailed;
                var rewardedVideoAd = Laya.Browser.window["tt"].createRewardedVideoAd({
                    adUnitId: TT_ZMDGJ_API.ad_ZMDGJ_UnitId,
                });
                if (!TT_ZMDGJ_API._isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event) {
                    TT_ZMDGJ_API.reg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event(rewardedVideoAd);
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
        static init_ZMDGJ_Record() {
            TT_ZMDGJ_API.record_ZMDGJ_ = Laya.Browser.window["tt"].getGameRecorderManager();
            if (TT_ZMDGJ_API.record_ZMDGJ_ != null) {
                TT_ZMDGJ_API.record_ZMDGJ_.onStart(res => {
                    console.log("录屏开始");
                    TT_ZMDGJ_API.record_ZMDGJ_Res = "";
                });
                TT_ZMDGJ_API.record_ZMDGJ_.onStop(res => {
                    console.log("录屏结束");
                    TT_ZMDGJ_API.record_ZMDGJ_Res = res.videoPath;
                });
            }
        }
        static start_ZMDGJ_Record(duration = 300) {
            if (!App_ZMDGJ_Config.onTTMiniGame)
                return;
            TT_ZMDGJ_API.record_ZMDGJ_.start({
                duration
            });
        }
        static stop_ZMDGJ_Record() {
            if (!App_ZMDGJ_Config.onTTMiniGame)
                return;
            TT_ZMDGJ_API.record_ZMDGJ_.stop();
        }
        static share_ZMDGJ_Record(callback = null, Failcallback = null) {
            if (!App_ZMDGJ_Config.onTTMiniGame)
                return;
            if (TT_ZMDGJ_API.record_ZMDGJ_Res != "") {
                window["tt"].shareAppMessage({
                    channel: "video",
                    extra: {
                        videoPath: TT_ZMDGJ_API.record_ZMDGJ_Res,
                        videoTopics: [App_ZMDGJ_Config.Game_ZMDGJ_Name]
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
        static share_ZMDGJ_(complate = null) {
            if (!App_ZMDGJ_Config.onTTMiniGame && null == Laya.Browser.window["tt"])
                return;
            window["tt"].shareAppMessage({
                templateId: TT_ZMDGJ_API._templateId_ZMDGJ_,
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
        static show_ZMDGJ_Banner() {
        }
        static hideBanner() {
            if (null != TT_ZMDGJ_API._banner_ZMDGJ_) {
                TT_ZMDGJ_API._banner_ZMDGJ_.hide();
            }
        }
        static showMoreGamesModal(onSuccess, onFail) {
            const systemInfo = Laya.Browser.window["tt"].getSystemInfoSync();
            if (systemInfo.platform !== "ios") {
                Laya.Browser.window["tt"].showMoreGamesModal({
                    appLaunchOptions: [
                        {
                            appId: App_ZMDGJ_Config.App_ZMDGJ_ID,
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
            Http_ZMDGJ_Unit.GetSignIn((res) => {
                let isSign = res.data.is_sign;
                let signDays = res.data.sign_day_num;
                if (isSign == 0) {
                    View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.TTSignInView, null, () => {
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
    TT_ZMDGJ_API.ad_ZMDGJ_UnitId = "";
    TT_ZMDGJ_API.banner_ZMDGJ_AdUnitId = "";
    TT_ZMDGJ_API.Ins_ZMDGJ_AdUnitId = "";
    TT_ZMDGJ_API._templateId_ZMDGJ_ = "";
    TT_ZMDGJ_API.record_ZMDGJ_Res = "";
    TT_ZMDGJ_API._banner_ZMDGJ_ = null;
    TT_ZMDGJ_API._isReg_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Event = false;
    TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Failed = null;
    TT_ZMDGJ_API._on_ZMDGJ_Rewarded_ZMDGJ_VideoAd_ZMDGJ_Close = null;

    class VIVO_ZMDGJ_API {
        static get Banner_ZMDGJ_Instance() {
            return VIVO_ZMDGJ_API._banner_ZMDGJ_;
        }
        static Login_ZMDGJ_(onSuccess, onFail) {
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
        static show_ZMDGJ_Dialog(titel, message, buttons, success, cancel, fail) {
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
        static create_ZMDGJ_Rewarded_ZMDGJ_VideoAd() {
            if (Laya.Browser.onVVMiniGame) {
                VIVO_ZMDGJ_API.rewardedAd = Laya.Browser.window["qg"].createRewardedVideoAd({
                    posId: VIVO_ZMDGJ_API.ad_ZMDGJ_UnitId,
                    style: {}
                });
                VIVO_ZMDGJ_API.rewardedAd.onError(err => {
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
        static show_ZMDGJ_Rewarded_ZMDGJ_VideoAd(onAdClose, onFailed) {
            if (Laya.Browser.onVVMiniGame) {
                Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.stop_ZMDGJ_BGM();
                console.log("---------------------------------- VIVO_ZMDGJ_API.rewardedAd:", VIVO_ZMDGJ_API.rewardedAd + ",VIVO_ZMDGJ_API.rewardedAdNum:", VIVO_ZMDGJ_API.rewardedAdNum);
                if (VIVO_ZMDGJ_API.rewardedAdNum == 0) {
                    VIVO_ZMDGJ_API.create_ZMDGJ_Rewarded_ZMDGJ_VideoAd();
                }
                else {
                    let adLoad = VIVO_ZMDGJ_API.rewardedAd.load();
                    adLoad && adLoad.catch(err => {
                        console.log("激励广告load失败" + JSON.stringify(err));
                        onFailed();
                    });
                }
                VIVO_ZMDGJ_API.rewardedAdNum = 1;
                console.log("近来showRewardedVideoAd");
                VIVO_ZMDGJ_API.rewardedAd.onLoad(() => {
                    let adshow = VIVO_ZMDGJ_API.rewardedAd.show();
                    adshow && adshow.then(() => {
                        console.log("激励广告展示成功");
                    }).catch(err => {
                        console.log("激励广告展示失败" + JSON.stringify(err));
                        onFailed();
                    });
                });
                VIVO_ZMDGJ_API.rewardedAd.onClose(res => {
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
        static show_ZMDGJ_BannerAd() {
            var self = VIVO_ZMDGJ_API;
            if (Laya.Browser.onVVMiniGame) {
                console.log('===========bannerAd showBanerAd');
                var systemInfo = Laya.Browser.window["qg"].getSystemInfoSync();
                var sw = systemInfo.screenWidth;
                var sh = systemInfo.screenHeight;
                VIVO_ZMDGJ_API.m_ZMDGJ_BannerAd = qg.createBannerAd({
                    posId: VIVO_ZMDGJ_API.bannerAd_ZMDGJ_UnitId,
                    style: {}
                });
                let adshow = VIVO_ZMDGJ_API.m_ZMDGJ_BannerAd.show();
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
                VIVO_ZMDGJ_API.m_ZMDGJ_BannerAd.onError(function (err) {
                    console.log('Banner广告加载失败111:' + JSON.stringify(err));
                });
            }
        }
        static hide_ZMDGJ_BannerAd() {
            if (VIVO_ZMDGJ_API.m_ZMDGJ_BannerAd) {
                console.log('===========bannerAd 隐藏');
                VIVO_ZMDGJ_API.m_ZMDGJ_BannerAd.hide();
                VIVO_ZMDGJ_API.m_ZMDGJ_BannerAd.destroy();
                VIVO_ZMDGJ_API.m_ZMDGJ_BannerAd = null;
            }
            else {
                console.log('===========bannerAd 为空');
            }
        }
        static navigate_ZMDGJ_To_ZMDGJ_MiniProgram(pkgName, path, onSuccess, onFail, onComplate) {
            if (Laya.Browser.onVVMiniGame) {
                console.log("vivo 跳转游戏： " + pkgName);
                Laya.Browser.window["qg"].navigateToMiniGame({
                    pkgName: pkgName,
                    path: path,
                    extraData: {
                        from: App_ZMDGJ_Config.App_ZMDGJ_ID
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
        static show_ZMDGJ_Interstitial_ZMDGJ_Ad(onAdClose, onFailed) {
            if (Laya.Browser.onVVMiniGame) {
                var insertAd = Laya.Browser.window["qg"].createInterstitialAd({
                    posId: VIVO_ZMDGJ_API.Ins_ZMDGJ_Ad_ZMDGJ_UnitId
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
        static get_ZMDGJ_Launch_ZMDGJ_OptionsSync() {
            return {};
        }
        static _ZMDGJ_share_ZMDGJ_(complate) {
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
        static create_ZMDGJ_Desktop_ZMDGJ_Icon(onSuccess, onFail) {
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
        static show_ZMDGJ_Native_ZMDGJ_Ad(onSuccess, onFail, index) {
            if (1 == index) {
                VIVO_ZMDGJ_API.tryShowNativeAd1(onSuccess, onFail);
            }
            else if (2 == index) {
                VIVO_ZMDGJ_API.tryShowNativeAd2(onSuccess, onFail);
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
            let yuanshengSwitch = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().vivocfg.yuanshengSwitch;
            let vivoVersions = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().vivocfg.vivoversions;
            if (1 == yuanshengSwitch && vivoVersions == App_ZMDGJ_Config.Versions_ZMDGJ_) {
                View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.VVNativeView1, null, (v) => {
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
            let yuanshengSwitch = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().vivocfg.yuanshengSwitch2;
            let vivoVersions = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().vivocfg.vivoversions;
            if (1 == yuanshengSwitch && vivoVersions == App_ZMDGJ_Config.Versions_ZMDGJ_) {
                View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.VVNativeView2, null, (v) => {
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
            if (1 == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().vivocfg.addToDesktop) {
                VIVO_ZMDGJ_API.create_ZMDGJ_Desktop_ZMDGJ_Icon(onSuccess, onFail);
            }
            else {
                if (null != onFail) {
                    onFail();
                }
            }
        }
        static tryShowInsAd(onSuccess, onFail) {
            let chapingSwitch = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().vivocfg.chapingSwitch;
            if (1 == chapingSwitch) {
                let rate = Math.random() * 100;
                if (rate <= App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().vivocfg.chaping) {
                    VIVO_ZMDGJ_API.show_ZMDGJ_Interstitial_ZMDGJ_Ad(() => {
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
    VIVO_ZMDGJ_API.ad_ZMDGJ_UnitId = "";
    VIVO_ZMDGJ_API.bannerAd_ZMDGJ_UnitId = "";
    VIVO_ZMDGJ_API.native_ZMDGJ_AdId = "";
    VIVO_ZMDGJ_API.Ins_ZMDGJ_Ad_ZMDGJ_UnitId = "";
    VIVO_ZMDGJ_API.rewardedAd = null;
    VIVO_ZMDGJ_API.rewardedAdNum = 0;
    VIVO_ZMDGJ_API._banner_ZMDGJ_ = null;
    VIVO_ZMDGJ_API.m_ZMDGJ_BannerAd = null;

    class KRQ__ZMDGJ_Com_ZMDGJ_Base extends Laya.Script {
        constructor() {
            super(...arguments);
            this.Ad_ZMDGJ_Pos_ZMDGJ_ID = -10086;
            this._datas = [];
            this._data = null;
        }
        get _ZMDGJ_Sprite_ZMDGJ_() {
            return this.owner;
        }
        get _ZMDGJ_Data_ZMDGJ_() {
            return this._data;
        }
        ref_ZMDGJ_resh(onComplate) {
            let self = this;
            _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_ADVs(this.Ad_ZMDGJ_Pos_ZMDGJ_ID, (datas) => {
                if (null != datas) {
                    self._datas = datas;
                    self._data = self._datas[Math.floor(Math.random() * datas.length)];
                    if (null != onComplate) {
                        onComplate();
                    }
                }
            }, false);
        }
        navigate_ZMDGJ_To_ZMDGJ_Mini_ZMDGJ_Program(d) {
            var data = null == d ? this._data : d;
            if (data) {
                console.log("跳转游戏： " + data.title);
                if (Laya.Browser.onMiniGame) {
                    WX_ZMDGJ_API.navigate_ZMDGJ_To_ZMDGJ_MiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        _ZMDGJ_ShareAd_ZMDGJ_.report_ZMDGJ_User_ZMDGJ_Click(data.appid);
                        ALD.ald_ZMDGJ_Send_ZMDGJ_ReportAdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_On_ZMDGJ_ShareAd_ZMDGJ_Fail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            ALD.aldSend_ZMDGJ_ReportAd_ZMDGJ_ClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQGMiniGame) {
                    OPPO_ZMDGJ_API.navigate_ZMDGJ_To_ZMDGJ_MiniProgram(data.appid, data.title, data.url, (res) => {
                        console.log("跳转成功");
                        _ZMDGJ_ShareAd_ZMDGJ_.report_ZMDGJ_User_ZMDGJ_Click(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_On_ZMDGJ_ShareAd_ZMDGJ_Fail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQQMiniGame) {
                    QQ_ZMDGJ_Mini_ZMDGJ_GameAPI.navigate_ZMDGJ_To_ZMDGJ_Mini_ZMDGJ_Program(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        _ZMDGJ_ShareAd_ZMDGJ_.report_ZMDGJ_User_ZMDGJ_Click(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_On_ZMDGJ_ShareAd_ZMDGJ_Fail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onVVMiniGame) {
                    VIVO_ZMDGJ_API.navigate_ZMDGJ_To_ZMDGJ_MiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        _ZMDGJ_ShareAd_ZMDGJ_.report_ZMDGJ_User_ZMDGJ_Click(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_On_ZMDGJ_ShareAd_ZMDGJ_Fail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (App_ZMDGJ_Config.onTTMiniGame) {
                    TT_ZMDGJ_API.showMoreGamesModal(() => {
                        console.log("跳转成功");
                        _ZMDGJ_ShareAd_ZMDGJ_.report_ZMDGJ_User_ZMDGJ_Click(data.appid);
                    }, () => {
                        console.log("跳转失败");
                        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_On_ZMDGJ_ShareAd_ZMDGJ_Fail);
                    });
                }
            }
        }
        _ZMDGJ_show_ZMDGJ_() {
            this._ZMDGJ_Sprite_ZMDGJ_.visible = true;
        }
        _ZMDGJ_hide_ZMDGJ_() {
            this._ZMDGJ_Sprite_ZMDGJ_.visible = false;
        }
        auto_ZMDGJ_Scroll_ZMDGJ_Text(text) {
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

    class KRQ_ZMDGJ__Loop_ZMDGJ_Ad_ZMDGJ_Box extends KRQ__ZMDGJ_Com_ZMDGJ_Base {
        constructor() {
            super(...arguments);
            this._ZMDGJ__originW_ZMDGJ_ = 170;
            this._ZMDGJ__originH_ZMDGJ_ = 170;
        }
        onAwake() {
            this._display_ZMDGJ_Sp = this.owner.getChildByName("Display");
            this._ZMDGJ__originW_ZMDGJ_ = this._display_ZMDGJ_Sp.width;
            this._ZMDGJ__originH_ZMDGJ_ = this._display_ZMDGJ_Sp.height;
            this._ZMDGJ__disText_ZMDGJ_ = this.owner.getChildByName("TitelText");
            this._ZMDGJ__disText_ZMDGJ_.overflow = Laya.Text.SCROLL;
            this._ZMDGJ__disText_ZMDGJ_.text = "";
        }
        onStart() {
            this.auto_ZMDGJ_Scroll_ZMDGJ_Text(this._ZMDGJ__disText_ZMDGJ_);
        }
        onEnable() {
            this._ZMDGJ_Sprite_ZMDGJ_.on(Laya.Event.CLICK, this, this.on_ZMDGJ_Click_ZMDGJ_Ad);
        }
        onDisable() {
            this._ZMDGJ_Sprite_ZMDGJ_.off(Laya.Event.CLICK, this, this.on_ZMDGJ_Click_ZMDGJ_Ad);
        }
        on_ZMDGJ_Click_ZMDGJ_Ad() {
            this.navigate_ZMDGJ_To_ZMDGJ_Mini_ZMDGJ_Program();
        }
        set_ZMDGJ_Data(data) {
            this._data = data;
            if (null != this._data) {
                let self = this;
                this._display_ZMDGJ_Sp.loadImage(this._data.logo, Laya.Handler.create(this, function () {
                    if (!self._display_ZMDGJ_Sp.destroyed) {
                        self._display_ZMDGJ_Sp.width = self._ZMDGJ__originW_ZMDGJ_;
                        self._display_ZMDGJ_Sp.height = self._ZMDGJ__originH_ZMDGJ_;
                    }
                }));
                let str = String(this._data.title);
                this._ZMDGJ__disText_ZMDGJ_.text = str;
            }
        }
    }

    class KRQ_ZMDGJ__H_ZMDGJ_Loop_ZMDGJ_Ad extends KRQ__ZMDGJ_Com_ZMDGJ_Base {
        constructor() {
            super(...arguments);
            this._scroll_ZMDGJ_Forward = true;
            this._cell_ZMDGJ_Size = new Laya.Point();
            this.isEnable = true;
            this.useMovePause = true;
            this.use_ZMDGJ_Local_ZMDGJ_Random = true;
            this.use_ZMDGJ_Random = true;
            this.sort_ZMDGJ_Datas = null;
        }
        get _ZMDGJ_Clip_ZMDGJ_() {
            return this.owner;
        }
        onAwake() {
            this.Ad_ZMDGJ_Pos_ZMDGJ_ID = _ZMDGJ_ShareAd_ZMDGJ_.LoopAd_ZMDGJ_LocationID;
            this._ZMDGJ__list_ZMDGJ_ = this.owner.getChildByName("List");
            this._ZMDGJ__list_ZMDGJ_.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this._ZMDGJ__list_ZMDGJ_.hScrollBarSkin = "";
        }
        onStart() {
            let self = this;
            this._ZMDGJ__list_ZMDGJ_.width = self._ZMDGJ_Clip_ZMDGJ_.width;
            this._ZMDGJ__list_ZMDGJ_.height = self._ZMDGJ_Clip_ZMDGJ_.height;
            self.ref_ZMDGJ_resh(() => {
                if (null != self._ZMDGJ__list_ZMDGJ_.cells && self._ZMDGJ__list_ZMDGJ_.cells.length > 0) {
                    let box = self._ZMDGJ__list_ZMDGJ_.cells[0];
                    self._cell_ZMDGJ_Size.x = box.width;
                    self._cell_ZMDGJ_Size.y = box.height;
                    if (self.useMovePause) {
                        setTimeout(() => {
                            if (self._ZMDGJ__list_ZMDGJ_.scrollBar) {
                                self._ZMDGJ__list_ZMDGJ_.scrollBar.value = 0;
                                self.move();
                            }
                        }, 2000);
                    }
                }
            });
        }
        ref_ZMDGJ_resh(onComplate) {
            if (!this.isEnable) {
                if (null != onComplate) {
                    onComplate();
                }
                return;
            }
            let self = this;
            _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_ADVs(this.Ad_ZMDGJ_Pos_ZMDGJ_ID, (datas) => {
                if (null != datas && datas.length > 0) {
                    self._datas = datas;
                    self._ZMDGJ__list_ZMDGJ_.array = self._datas;
                    if (null != self._ZMDGJ_Sprite_ZMDGJ_ && !self._ZMDGJ_Sprite_ZMDGJ_.destroyed) {
                        self._ZMDGJ_Sprite_ZMDGJ_.visible = true;
                    }
                    if (null != onComplate) {
                        onComplate();
                    }
                }
                else {
                    if (null != self._ZMDGJ_Sprite_ZMDGJ_ && !self._ZMDGJ_Sprite_ZMDGJ_.destroyed) {
                        self._ZMDGJ_Sprite_ZMDGJ_.visible = false;
                    }
                }
            }, this.use_ZMDGJ_Random, this.use_ZMDGJ_Local_ZMDGJ_Random, this.sort_ZMDGJ_Datas);
        }
        onListRender(cell, index) {
            var data = this._ZMDGJ__list_ZMDGJ_.array[index];
            var loopAdBox = cell.getComponent(KRQ_ZMDGJ__Loop_ZMDGJ_Ad_ZMDGJ_Box);
            loopAdBox.set_ZMDGJ_Data(data);
        }
        move() {
            let tonum = this._cell_ZMDGJ_Size.x + this._ZMDGJ__list_ZMDGJ_.spaceX;
            let left = 0;
            if (!this._scroll_ZMDGJ_Forward) {
                tonum *= -1;
                left = (this._ZMDGJ__list_ZMDGJ_.scrollBar.max - this._ZMDGJ__list_ZMDGJ_.scrollBar.value) % tonum * -1;
            }
            else {
                left = this._ZMDGJ__list_ZMDGJ_.scrollBar.value % tonum;
            }
            if (this._ZMDGJ__list_ZMDGJ_.scrollBar) {
                this._ZMDGJ__list_ZMDGJ_.scrollBar.stopScroll();
                let scrollDelta = tonum;
                if (0 != left) {
                    scrollDelta = 2 * tonum - left;
                }
                let self = this;
                Laya.Tween.to(self._ZMDGJ__list_ZMDGJ_.scrollBar, { value: self._ZMDGJ__list_ZMDGJ_.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self, () => {
                }));
                Laya.timer.once(1010, self, () => {
                    if (self._ZMDGJ__list_ZMDGJ_.scrollBar.value >= self._ZMDGJ__list_ZMDGJ_.scrollBar.max) {
                        self._scroll_ZMDGJ_Forward = false;
                    }
                    else if (self._ZMDGJ__list_ZMDGJ_.scrollBar.value <= 0) {
                        self._scroll_ZMDGJ_Forward = true;
                    }
                    Laya.timer.once(3000, self, () => {
                        if (self._ZMDGJ__list_ZMDGJ_.scrollBar) {
                            self.move();
                        }
                    });
                });
            }
        }
        onUpdate() {
            if (this.useMovePause)
                return;
            if (this._scroll_ZMDGJ_Forward) {
                this._ZMDGJ__list_ZMDGJ_.scrollBar.value += 100 * Laya.timer.delta / 1000;
                if (this._ZMDGJ__list_ZMDGJ_.scrollBar.value >= this._ZMDGJ__list_ZMDGJ_.scrollBar.max) {
                    this._scroll_ZMDGJ_Forward = false;
                }
            }
            else {
                this._ZMDGJ__list_ZMDGJ_.scrollBar.value -= 100 * Laya.timer.delta / 1000;
                if (this._ZMDGJ__list_ZMDGJ_.scrollBar.value <= 0) {
                    this._scroll_ZMDGJ_Forward = true;
                }
            }
        }
    }

    class KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad extends KRQ_ZMDGJ__H_ZMDGJ_Loop_ZMDGJ_Ad {
        onAwake() {
            this.Ad_ZMDGJ_Pos_ZMDGJ_ID = _ZMDGJ_ShareAd_ZMDGJ_.LoopAd_ZMDGJ_LocationID;
            this._ZMDGJ__list_ZMDGJ_ = this.owner.getChildByName("List");
            this._ZMDGJ__list_ZMDGJ_.renderHandler = Laya.Handler.create(this, this.onListRender, null, false);
            this._ZMDGJ__list_ZMDGJ_.vScrollBarSkin = "";
        }
        move() {
            let tonum = this._cell_ZMDGJ_Size.y + this._ZMDGJ__list_ZMDGJ_.spaceY;
            let left = 0;
            if (!this._scroll_ZMDGJ_Forward) {
                tonum *= -1;
                left = (this._ZMDGJ__list_ZMDGJ_.scrollBar.max - this._ZMDGJ__list_ZMDGJ_.scrollBar.value) % tonum * -1;
            }
            else {
                left = this._ZMDGJ__list_ZMDGJ_.scrollBar.value % tonum;
            }
            if (this._ZMDGJ__list_ZMDGJ_.scrollBar) {
                this._ZMDGJ__list_ZMDGJ_.scrollBar.stopScroll();
                let scrollDelta = tonum;
                if (0 != left) {
                    scrollDelta = 2 * tonum - left;
                }
                let self = this;
                Laya.Tween.to(self._ZMDGJ__list_ZMDGJ_.scrollBar, { value: self._ZMDGJ__list_ZMDGJ_.scrollBar.value + scrollDelta }, 1000, null, Laya.Handler.create(self, () => {
                }));
                Laya.timer.once(1010, self, () => {
                    if (self._ZMDGJ__list_ZMDGJ_.scrollBar.value >= self._ZMDGJ__list_ZMDGJ_.scrollBar.max) {
                        self._scroll_ZMDGJ_Forward = false;
                    }
                    else if (self._ZMDGJ__list_ZMDGJ_.scrollBar.value <= 0) {
                        self._scroll_ZMDGJ_Forward = true;
                    }
                    Laya.timer.once(3000, self, () => {
                        if (self._ZMDGJ__list_ZMDGJ_.scrollBar) {
                            self.move();
                        }
                    });
                });
            }
        }
    }

    class Exprot2_ZMDGJ_View_ZMDGJ_Template extends Template_ZMDGJ_View_ZMDGJ_Base {
        constructor() {
            super(...arguments);
            this._continue_ZMDGJ_Btn = null;
            this._krq_ZMDGJ_VLoopAd = null;
            this._KRQ_V_ZMDGJ_LoopAd = null;
            this._isCanClose = false;
            this._banner = null;
        }
        onAwake() {
            super.onAwake();
            this._krq_ZMDGJ_VLoopAd = this.View_ZMDGJ_.getChildByName("KRQ_VLoopAd").getComponent(KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad);
            this._krq_ZMDGJ_VLoopAd.use_ZMDGJ_Local_ZMDGJ_Random = true;
            this._krq_ZMDGJ_VLoopAd.use_ZMDGJ_Random = false;
            this._krq_ZMDGJ_VLoopAd.useMovePause = false;
            this._krq_ZMDGJ_VLoopAd.sort_ZMDGJ_Datas = this.sort_ZMDGJ_Datas;
            this._continue_ZMDGJ_Btn = this.View_ZMDGJ_.getChildByName("ContinueBtn");
            this._continue_ZMDGJ_Btn.visible = false;
            let self = this;
            if (Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag && 1 == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().continue_ZMDGJ_Banner) {
                Laya.timer.once(App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().continue_ZMDGJ_Btn_ZMDGJ_DelayTime * 1000, self, () => {
                    self._continue_ZMDGJ_Btn.visible = true;
                    Laya.timer.once(App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().continue_ZMDGJ_Banner_ZMDGJ_ShowTime * 1000, self, () => {
                        self.ShowBanner();
                        Laya.timer.once(App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().continue_ZMDGJ_Banner_ZMDGJ_HideTime * 1000, self, () => {
                            self._isCanClose = true;
                            if (null != self._banner) {
                                self._banner._ZMDGJ_hide_ZMDGJ_();
                            }
                            self._banner = null;
                        });
                    });
                });
            }
            else {
                Laya.timer.once(App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().continue_ZMDGJ_Btn_ZMDGJ_DelayTime * 1000, self, () => {
                    self._continue_ZMDGJ_Btn.visible = true;
                    self._isCanClose = true;
                });
            }
            this._KRQ_V_ZMDGJ_LoopAd = this.View_ZMDGJ_.getChildByName("KRQ_VLoopAd");
            if (Utilit_ZMDGJ_.is_ZMDGJ_IphoneX()) {
                this._KRQ_V_ZMDGJ_LoopAd.top = this._KRQ_V_ZMDGJ_LoopAd.top + 75;
            }
        }
        onStart() {
            this._krq_ZMDGJ_VLoopAd.Ad_ZMDGJ_Pos_ZMDGJ_ID = _ZMDGJ_ShareAd_ZMDGJ_.MoreGame_ZMDGJ_LocationID;
            super.onStart();
        }
        add_ZMDGJ_Event() {
            super.add_ZMDGJ_Event();
            this._continue_ZMDGJ_Btn.on(Laya.Event.CLICK, this, this.on_ZMDGJ_Continue_ZMDGJ_Btn);
        }
        remove_ZMDGJ_Event() {
            super.remove_ZMDGJ_Event();
            this._continue_ZMDGJ_Btn.off(Laya.Event.CLICK, this, this.on_ZMDGJ_Continue_ZMDGJ_Btn);
        }
        ShowBanner() {
            let self = this;
            WX_ZMDGJ_ADMgr.get_ZMDGJ_Banner((banner) => {
            });
        }
        onDestroy() {
            if (null != this._banner) {
                this._banner._ZMDGJ_hide_ZMDGJ_();
            }
            this._banner = null;
        }
        on_ZMDGJ_Continue_ZMDGJ_Btn() {
            if (!this._isCanClose)
                return;
            let self = this;
            let excute = () => {
                Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().EnterGameScene(() => {
                    View_ZMDGJ_Mgr.ins_ZMDGJ_tance.close_ZMDGJ_View(View_ZMDGJ_Def.Export2View);
                });
            };
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.tryShowPopAd((v) => {
                if (null != v) {
                    v.on_ZMDGJ_CloseEvent = () => {
                        excute();
                    };
                }
                else {
                    excute();
                }
            });
        }
        sort_ZMDGJ_Datas(datas) {
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
            super.onAwake();
            var realW = Laya.stage.width;
            var scale = realW / ViewAutoScaleByW.baseWidth;
            var ps = this.owner;
            ps.scale(scale, scale);
        }
    }
    ViewAutoScaleByW.baseWidth = 750;
    ViewAutoScaleByW.baseHeight = 1334;

    class Exprot3ViewTemplate extends Template_ZMDGJ_View_ZMDGJ_Base {
        constructor() {
            super(...arguments);
            this._close_ZMDGJ_Btn = null;
            this._krq_ZMDGJ_VLoopAd = null;
            this._KRQ__ZMDGJ_VLoopAd = null;
            this._click_ZMDGJ_Tag = false;
            this._click_ZMDGJ_TimingTag = false;
            this._banner_ZMDGJ_ = null;
        }
        onAwake() {
            super.onAwake();
            this._krq_ZMDGJ_VLoopAd = this.View_ZMDGJ_.getChildByName("KRQ_VLoopAd").getComponent(KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad);
            this._close_ZMDGJ_Btn = this.View_ZMDGJ_.getChildByName("CloseBtn");
            this._KRQ__ZMDGJ_VLoopAd = this.View_ZMDGJ_.getChildByName("KRQ_VLoopAd");
            if (Utilit_ZMDGJ_.is_ZMDGJ_IphoneX()) {
                this._KRQ__ZMDGJ_VLoopAd.top = this._KRQ__ZMDGJ_VLoopAd.top + 75;
            }
            let aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                this._KRQ__ZMDGJ_VLoopAd.height = 900;
            }
            else {
                this._KRQ__ZMDGJ_VLoopAd.height = 750;
            }
        }
        onStart() {
            this._krq_ZMDGJ_VLoopAd.Ad_ZMDGJ_Pos_ZMDGJ_ID = _ZMDGJ_ShareAd_ZMDGJ_.MoreGame_ZMDGJ_LocationID;
            super.onStart();
            if (Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag) {
                var btnMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer;
                var bannerMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer;
                Laya.timer.once(bannerMoveTimer * 1000, this, this.Banner_ZMDGJ_Up);
                Laya.timer.once(btnMoveTimer * 1000, this, this.Btn_ZMDGJ_Up);
            }
        }
        add_ZMDGJ_Event() {
            super.add_ZMDGJ_Event();
            this._close_ZMDGJ_Btn.on(Laya.Event.CLICK, this, this.onClose_ZMDGJ_Btn);
        }
        remove_ZMDGJ_Event() {
            super.remove_ZMDGJ_Event();
            this._close_ZMDGJ_Btn.off(Laya.Event.CLICK, this, this.onClose_ZMDGJ_Btn);
        }
        Banner_ZMDGJ_Up() {
            let self = this;
            WX_ZMDGJ_ADMgr.get_ZMDGJ_Banner((banner) => {
            });
        }
        Btn_ZMDGJ_Up() {
            this._click_ZMDGJ_Tag = true;
            let aspectRatio = Laya.stage.width / Laya.stage.height;
            if (aspectRatio < 0.5) {
                this._close_ZMDGJ_Btn.bottom = 270;
            }
            else {
                this._close_ZMDGJ_Btn.bottom = 370;
            }
        }
        onClose_ZMDGJ_Btn() {
            if (!this._click_ZMDGJ_Tag && Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag) {
                var self = this;
                if (!this._click_ZMDGJ_TimingTag) {
                    this._click_ZMDGJ_TimingTag = true;
                    var btnMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().btn_ZMDGJ_Move_ZMDGJ_Timer;
                    var bannerMoveTimer = App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().banner_ZMDGJ_Move_ZMDGJ_Timer;
                    Laya.timer.once(bannerMoveTimer * 1000, this, this.Banner_ZMDGJ_Up);
                    Laya.timer.once(btnMoveTimer * 1000, this, this.Btn_ZMDGJ_Up);
                }
                return;
            }
            this.close_ZMDGJ_View();
        }
        onDestroy() {
            if (null != this._banner_ZMDGJ_) {
                this._banner_ZMDGJ_._ZMDGJ_hide_ZMDGJ_();
            }
            this._banner_ZMDGJ_ = null;
        }
        on_ZMDGJ_History_ZMDGJ_Btn() {
            let self = this;
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.MiniGameView, null, (v) => {
                self.hide_ZMDGJ_();
                if (null != self._banner_ZMDGJ_) {
                    self._banner_ZMDGJ_._ZMDGJ_hide_ZMDGJ_();
                }
                v.on_ZMDGJ_CloseEvent = () => {
                    if (null != self.View_ZMDGJ_ && !self.View_ZMDGJ_.destroyed) {
                        self.show_ZMDGJ_();
                        if (null != self._banner_ZMDGJ_) {
                            self._banner_ZMDGJ_._ZMDGJ_show_ZMDGJ_();
                        }
                    }
                };
            });
        }
    }

    class Game_ZMDGJ_Fail_ZMDGJ_View_ZMDGJ_Template extends Template_ZMDGJ_View_ZMDGJ_Base {
        constructor() {
            super(...arguments);
            this._center_ZMDGJ_Zone = null;
            this._back_ZMDGJ_Btn = null;
            this._continue_ZMDGJ_Btn = null;
            this._roll_ZMDGJ_SingleAds = new Array();
            this._click_ZMDGJ_Tag = false;
            this._click_ZMDGJ_TimingTag = false;
            this._banner = null;
            this._bAlive = true;
        }
        onAwake() {
            super.onAwake();
            this._center_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("CenterZone");
            if (Utilit_ZMDGJ_.is_ZMDGJ_IphoneX()) {
                this._center_ZMDGJ_Zone.top = this._center_ZMDGJ_Zone.top + 75;
            }
            this._back_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("BackBtn");
            this._continue_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("ContinueBtn");
        }
        onStart() {
            super.onStart();
            this._bAlive = true;
        }
        onShow() {
            this._bAlive = true;
        }
        add_ZMDGJ_Event() {
            super.add_ZMDGJ_Event();
            this._back_ZMDGJ_Btn.on(Laya.Event.CLICK, this, this.onBack_ZMDGJ_Btn);
            this._continue_ZMDGJ_Btn.on(Laya.Event.CLICK, this, this.on_ZMDGJ_Continue_ZMDGJ_Btn);
            this._bAlive = true;
        }
        remove_ZMDGJ_Event() {
            super.remove_ZMDGJ_Event();
            this._back_ZMDGJ_Btn.off(Laya.Event.CLICK, this, this.onBack_ZMDGJ_Btn);
            this._continue_ZMDGJ_Btn.off(Laya.Event.CLICK, this, this.on_ZMDGJ_Continue_ZMDGJ_Btn);
            this._bAlive = true;
        }
        onBack_ZMDGJ_Btn() {
            this.NextLevel();
        }
        on_ZMDGJ_Continue_ZMDGJ_Btn() {
            this.NextLevel();
        }
        NextLevel() {
            if (!this._bAlive) {
                return;
            }
            this._bAlive = false;
            Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().EnterGameScene(() => {
                View_ZMDGJ_Mgr.ins_ZMDGJ_tance.close_ZMDGJ_View(View_ZMDGJ_Def.GameWinView);
            });
        }
        BannerUp() {
        }
        BtnUp() {
            this._click_ZMDGJ_Tag = true;
            this._back_ZMDGJ_Btn.y = 720;
            this._continue_ZMDGJ_Btn.y = 720;
        }
        onDestroy() {
            super.onDestroy();
            if (null != this._banner) {
                this._banner._ZMDGJ_hide_ZMDGJ_();
            }
            this._banner = null;
            Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().save_ZMDGJ_Game_ZMDGJ_Data();
        }
        on_ZMDGJ_History_ZMDGJ_Btn() {
        }
    }

    class Game_ZMDGJ_Win_ZMDGJ_ViewTemplate extends Template_ZMDGJ_View_ZMDGJ_Base {
        constructor() {
            super(...arguments);
            this._center_ZMDGJ_Zone = null;
            this._back_ZMDGJ_Btn = null;
            this._next_ZMDGJ_Btn = null;
            this._roll_ZMDGJ_SingleAds = new Array();
            this._click_ZMDGJ_Tag = false;
            this._click_ZMDGJ_TimingTag = false;
            this._banner = null;
            this._bAlive = true;
        }
        onAwake() {
            super.onAwake();
            this._center_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("CenterZone");
            if (Utilit_ZMDGJ_.is_ZMDGJ_IphoneX()) {
                this._center_ZMDGJ_Zone.top = this._center_ZMDGJ_Zone.top + 75;
            }
            this._back_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("BackBtn");
            this._next_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("NextBtn");
            this._bAlive = true;
            Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().PreLoadScene(User_ZMDGJ_.get_ZMDGJ_FakerNextLeveNum().toString());
        }
        onShow() {
            this._bAlive = true;
        }
        onStart() {
            super.onStart();
            this._bAlive = true;
        }
        add_ZMDGJ_Event() {
            super.add_ZMDGJ_Event();
            this._bAlive = true;
            this._back_ZMDGJ_Btn.on(Laya.Event.CLICK, this, this.onBack_ZMDGJ_Btn);
            this._next_ZMDGJ_Btn.on(Laya.Event.CLICK, this, this.onNext_ZMDGJ_Btn);
        }
        remove_ZMDGJ_Event() {
            super.remove_ZMDGJ_Event();
            this._bAlive = true;
            this._back_ZMDGJ_Btn.off(Laya.Event.CLICK, this, this.onBack_ZMDGJ_Btn);
            this._next_ZMDGJ_Btn.off(Laya.Event.CLICK, this, this.onNext_ZMDGJ_Btn);
        }
        onBack_ZMDGJ_Btn() {
            this.NextLevel();
        }
        onNext_ZMDGJ_Btn() {
            this.NextLevel();
        }
        NextLevel() {
            if (!this._bAlive) {
                return;
            }
            this._bAlive = false;
            User_ZMDGJ_.set_ZMDGJ_LeveNum(User_ZMDGJ_.get_ZMDGJ_LeveNum() + 1);
            Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().EnterGameScene(() => {
                View_ZMDGJ_Mgr.ins_ZMDGJ_tance.close_ZMDGJ_View(View_ZMDGJ_Def.GameWinView);
            });
        }
        BannerUp() {
        }
        BtnUp() {
            this._click_ZMDGJ_Tag = true;
            this._back_ZMDGJ_Btn.y = 720;
            this._next_ZMDGJ_Btn.y = 720;
        }
        onDestroy() {
            super.onDestroy();
            if (null != this._banner) {
                this._banner._ZMDGJ_hide_ZMDGJ_();
            }
            this._banner = null;
            Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().save_ZMDGJ_Game_ZMDGJ_Data();
        }
        on_ZMDGJ_History_ZMDGJ_Btn() {
        }
    }

    class GameInfo extends Laya.Script {
        constructor() {
            super(...arguments);
            this._center_ZMDGJ_Zone = null;
            this._level_ZMDGJ_Num = null;
            this._AllBoxNum = null;
            this._BoxNum = null;
            this._CoinNum = null;
            this._BloodInfoBar = null;
            this._HintInfo = null;
            this._nBloodInfoBarWidth = 0;
            this._scene = null;
            this._goodsAllSprite = null;
            this._terminusSprite = null;
            this._targetSprite3D = null;
        }
        onAwake() {
            super.onAwake();
            this._center_ZMDGJ_Zone = this.owner;
            this._level_ZMDGJ_Num = this._center_ZMDGJ_Zone.getChildByName("LevelInfo").getChildByName("LevelNum");
            this._AllBoxNum = this._center_ZMDGJ_Zone.getChildByName("BoxInfo").getChildByName("AllBoxNum");
            this._BoxNum = this._center_ZMDGJ_Zone.getChildByName("BoxInfo").getChildByName("BoxNum");
            this._CoinNum = this._center_ZMDGJ_Zone.getChildByName("CoinInfo").getChildByName("CoinNum");
            this._BloodInfoBar = this._center_ZMDGJ_Zone.getChildByName("BloodInfo").getChildByName("BloodInfoBar");
            this._HintInfo = this._center_ZMDGJ_Zone.getChildByName("HintInfo");
            this._scene = Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().CurLevel.owner;
            this._goodsAllSprite = this._scene.getChildByName("Objects").getChildByName("GoodsAll");
            this._terminusSprite = this._scene.getChildByName("Objects").getChildByName("Terminus");
            this._targetSprite3D = this._scene.getChildByName("Role");
            if (Utilit_ZMDGJ_.is_ZMDGJ_IphoneX()) {
                this._center_ZMDGJ_Zone.getChildByName("LevelInfo").top += 75;
                this._center_ZMDGJ_Zone.getChildByName("CoinInfo").top += 75;
                this._center_ZMDGJ_Zone.getChildByName("BoxInfo").top += 75;
            }
            if (Laya.stage.width / Laya.stage.height > 0.5) {
                this._center_ZMDGJ_Zone.getChildByName("BloodInfo").top -= 150;
                this._center_ZMDGJ_Zone.getChildByName("HintInfo").top -= 150;
            }
        }
        onStart() {
            super.onStart();
            this._level_ZMDGJ_Num.value = String(User_ZMDGJ_.get_ZMDGJ_LeveNum());
            this._AllBoxNum.value = String(Game_ZMDGJ_Mgr.get_ZMDGJ_Instance().CurLevel.AllBoxNum);
            this._BoxNum.value = String(0);
            this._CoinNum.value = String(User_ZMDGJ_.get_ZMDGJ_Money());
            this._nBloodInfoBarWidth = this._BloodInfoBar.width;
        }
        onEnable() {
            super.onEnable();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_BoxChange, this, this.BoxNumChange);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_BloodChange, this, this.BloodNumChange);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change, this, this.CoinNumChange);
        }
        onDisable() {
            super.onDisable();
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_BoxChange, this, this.BoxNumChange);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_BloodChange, this, this.BloodNumChange);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change, this, this.CoinNumChange);
        }
        onUpdate() {
            super.onUpdate();
            this.HintChange();
        }
        BoxNumChange(para) {
            this._BoxNum.value = para.RoleNum.toString();
        }
        BloodNumChange(para) {
            this._BloodInfoBar.width = this._nBloodInfoBarWidth * (para.BloodNum / 100);
        }
        CoinNumChange() {
            this._CoinNum.value = String(User_ZMDGJ_.get_ZMDGJ_Money());
        }
        HintChange() {
            var index = -1;
            var minDis = 99999;
            var dir = new Laya.Vector2(0, 0);
            for (var i = 0; i < this._goodsAllSprite.numChildren; i++) {
                dir.x = this._goodsAllSprite.getChildAt(i).transform.position.x - this._targetSprite3D.transform.position.x;
                dir.y = this._goodsAllSprite.getChildAt(i).transform.position.z - this._targetSprite3D.transform.position.z;
                var distance = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
                if (distance < minDis) {
                    index = i;
                    minDis = distance;
                }
            }
            if (index != -1) {
                dir.x = this._goodsAllSprite.getChildAt(index).transform.position.x - this._targetSprite3D.transform.position.x;
                dir.y = this._goodsAllSprite.getChildAt(index).transform.position.z - this._targetSprite3D.transform.position.z;
            }
            else {
                dir.x = this._terminusSprite.transform.position.x - this._targetSprite3D.transform.position.x;
                dir.y = this._terminusSprite.transform.position.z - this._targetSprite3D.transform.position.z;
            }
            this._HintInfo.rotation = Math.atan2(-dir.y, -dir.x) * 180 / Math.PI;
        }
    }

    class Input extends Laya.Script {
        constructor() {
            super(...arguments);
            this._ownerSp = null;
            this._centerPoint = new Laya.Vector2(0, 0);
        }
        onAwake() {
            super.onAwake();
            this._ownerSp = this.owner;
        }
        onEnable() {
            super.onEnable();
            this._ownerSp.on(Laya.Event.MOUSE_DOWN, this, this.onDown);
        }
        onDisable() {
            super.onDisable();
            this._ownerSp.off(Laya.Event.MOUSE_DOWN, this, this.onDown);
            this._ownerSp.off(Laya.Event.MOUSE_UP, this, this.onClickUp);
            this._ownerSp.off(Laya.Event.MOUSE_MOVE, this, this.onMove);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_OnInputRelease);
        }
        onDown() {
            var point = this._ownerSp.globalToLocal(new Laya.Point(this._ownerSp.mouseX, this._ownerSp.mouseY));
            this._centerPoint = new Laya.Vector2(point.x, point.y);
            this._ownerSp.on(Laya.Event.MOUSE_MOVE, this, this.onMove);
            this._ownerSp.on(Laya.Event.MOUSE_UP, this, this.onClickUp);
            this._ownerSp.on(Laya.Event.MOUSE_OUT, this, this.onClickUp);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_OnInputStart);
        }
        onClickUp() {
            this._ownerSp.off(Laya.Event.MOUSE_MOVE, this, this.onMove);
            this._ownerSp.off(Laya.Event.MOUSE_UP, this, this.onClickUp);
            this._ownerSp.off(Laya.Event.MOUSE_OUT, this, this.onClickUp);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_OnInputRelease);
        }
        onMove() {
            var mouseLocalPoint = this._ownerSp.globalToLocal(new Laya.Point(this._ownerSp.mouseX, this._ownerSp.mouseY));
            var moveX = mouseLocalPoint.x - this._centerPoint.x;
            var moveY = mouseLocalPoint.y - this._centerPoint.y;
            var dirTemp = new Laya.Vector2(moveX, moveY);
            if (moveX * moveX + moveY * moveY <= 10) {
                return;
            }
            if (moveX * moveX + moveY * moveY >= 10000) {
                dirTemp.x = 100 * Math.cos(Math.atan2(moveY, moveX));
                dirTemp.y = 100 * Math.sin(Math.atan2(moveY, moveX));
                this._centerPoint = new Laya.Vector2(mouseLocalPoint.x - dirTemp.x, mouseLocalPoint.y - dirTemp.y);
            }
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.Game_OnInputMove, { dir: dirTemp });
        }
    }

    var In_ZMDGJ_Game_ZMDGJ_ShowType;
    (function (In_ZMDGJ_Game_ZMDGJ_ShowType) {
        In_ZMDGJ_Game_ZMDGJ_ShowType[In_ZMDGJ_Game_ZMDGJ_ShowType["_ZMDGJ_Normal_ZMDGJ_"] = 0] = "_ZMDGJ_Normal_ZMDGJ_";
        In_ZMDGJ_Game_ZMDGJ_ShowType[In_ZMDGJ_Game_ZMDGJ_ShowType["_ZMDGJ_NoLoopAd_ZMDGJ_"] = 1] = "_ZMDGJ_NoLoopAd_ZMDGJ_";
        In_ZMDGJ_Game_ZMDGJ_ShowType[In_ZMDGJ_Game_ZMDGJ_ShowType["_ZMDGJ_NoBannerAd_ZMDGJ_"] = 2] = "_ZMDGJ_NoBannerAd_ZMDGJ_";
    })(In_ZMDGJ_Game_ZMDGJ_ShowType || (In_ZMDGJ_Game_ZMDGJ_ShowType = {}));
    class In_ZMDGJ_Game_ZMDGJ_View_ZMDGJ_Template extends Template_ZMDGJ_View_ZMDGJ_Base {
        constructor() {
            super(...arguments);
            this._center_ZMDGJ_Zone = null;
        }
        onAwake() {
            super.onAwake();
            this._center_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("CenterZone");
            var aspectRatio = Laya.stage.width / Laya.stage.height;
        }
        open_ZMDGJ_View(data) {
            super.open_ZMDGJ_View(data);
            if (null != data && null != data.showType) {
            }
        }
        onStart() {
            super.onStart();
        }
        add_ZMDGJ_Event() {
            super.add_ZMDGJ_Event();
        }
        remove_ZMDGJ_Event() {
            super.remove_ZMDGJ_Event();
        }
    }

    class Ani extends Laya.Script {
        constructor() {
            super(...arguments);
            this._mArmature = null;
        }
        onEnable() {
            var _name = "subRes/Ani/NewProject.sk";
            this._mArmature = new Laya.Skeleton();
            this.owner.addChild(this._mArmature);
            this._mArmature.load(_name, Laya.Handler.create(this, (res) => {
                res.lock = true;
            }));
        }
        onDisable() {
        }
    }

    class Main_ZMDGJ_View_ZMDGJ_Template extends Template_ZMDGJ_View_ZMDGJ_Base {
        constructor() {
            super(...arguments);
            this._center_ZMDGJ_Zone = null;
            this._start_ZMDGJ_Btn = null;
            this._level_ZMDGJ_Num = null;
            this._money_ZMDGJ_Num = null;
        }
        onAwake() {
            super.onAwake();
            this._center_ZMDGJ_Zone = this.View_ZMDGJ_.getChildByName("CenterZone");
            this._start_ZMDGJ_Btn = this._center_ZMDGJ_Zone.getChildByName("StartBtn");
            this._level_ZMDGJ_Num = this._center_ZMDGJ_Zone.getChildByName("LevelInfo").getChildByName("LevelNum");
            this._money_ZMDGJ_Num = this._center_ZMDGJ_Zone.getChildByName("MoneyInfo").getChildByName("MoneyNum");
        }
        onStart() {
            super.onStart();
            this._money_ZMDGJ_Num.value = String(User_ZMDGJ_.get_ZMDGJ_Money());
            this._level_ZMDGJ_Num.value = String(User_ZMDGJ_.get_ZMDGJ_LeveNum());
        }
        add_ZMDGJ_Event() {
            super.add_ZMDGJ_Event();
            this._start_ZMDGJ_Btn.on(Laya.Event.CLICK, this, this.on_ZMDGJ_Start_ZMDGJ_Btn);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_Evemt(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change, this, this.on_ZMDGJ_UserMoney_ZMDGJ_Change);
        }
        remove_ZMDGJ_Event() {
            super.remove_ZMDGJ_Event();
            this._start_ZMDGJ_Btn.off(Laya.Event.CLICK, this, this.on_ZMDGJ_Start_ZMDGJ_Btn);
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.remove_ZMDGJ_Event(Event_ZMDGJ_Def.Game_On_ZMDGJ_User_ZMDGJ_Money_ZMDGJ_Change, this, this.on_ZMDGJ_UserMoney_ZMDGJ_Change);
        }
        on_ZMDGJ_Start_ZMDGJ_Btn() {
            var award = Math.floor(Math.random() * 50 + 50);
            var self = this;
            self.onLevelStart();
        }
        on_ZMDGJ_UserMoney_ZMDGJ_Change(para) {
            let curr = para.curr;
            let last = para.last;
            this._money_ZMDGJ_Num.value = String(curr);
        }
        onLevelStart() {
            View_ZMDGJ_Mgr.ins_ZMDGJ_tance.open_ZMDGJ_View(View_ZMDGJ_Def.SkinTipsView, null, () => {
                View_ZMDGJ_Mgr.ins_ZMDGJ_tance.close_ZMDGJ_View(View_ZMDGJ_Def.MainView);
            });
        }
    }

    class KRQ__ZMDGJ_History_ZMDGJ_Box extends KRQ__ZMDGJ_Com_ZMDGJ_Base {
        constructor() {
            super(...arguments);
            this.__ZMDGJ_icon = null;
            this.__ZMDGJ_text = null;
            this.__ZMDGJ_mark = null;
        }
        onAwake() {
            this.__ZMDGJ_icon = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("Icon");
            this.__ZMDGJ_text = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("Text");
            this.__ZMDGJ_text.overflow = Laya.Text.SCROLL;
            this.__ZMDGJ_text.text = "";
            this.__ZMDGJ_mark = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("Mark");
            this.__ZMDGJ_mark.visible = false;
        }
        onStart() {
            this.auto_ZMDGJ_Scroll_ZMDGJ_Text(this.__ZMDGJ_text);
        }
        onEnable() {
            this._ZMDGJ_Sprite_ZMDGJ_.on(Laya.Event.CLICK, this, this.onClic_ZMDGJ_kAd);
        }
        onDisable() {
            this._ZMDGJ_Sprite_ZMDGJ_.off(Laya.Event.CLICK, this, this.onClic_ZMDGJ_kAd);
        }
        onClic_ZMDGJ_kAd() {
            this.navigate_ZMDGJ_To_ZMDGJ_Mini_ZMDGJ_Program();
        }
        setData(data, star) {
            this._data = data;
            if (null != this._data) {
                var self = this;
                this.__ZMDGJ_icon.loadImage(this._data.logo, Laya.Handler.create(this, function () {
                    if (!self.__ZMDGJ_icon.destroyed) {
                        self.__ZMDGJ_icon.width = 100;
                        self.__ZMDGJ_icon.height = 100;
                    }
                }));
                var str = String(this._data.title);
                this.__ZMDGJ_text.text = str;
                this.__ZMDGJ_mark.visible = star;
            }
        }
    }

    class KRQ_ZMDGJ__His_ZMDGJ_tory extends KRQ__ZMDGJ_Com_ZMDGJ_Base {
        constructor() {
            super(...arguments);
            this.On_ZMDGJ_Back_ZMDGJ_Btn_ZMDGJ_Click = null;
            this._top_ZMDGJ_Zone = null;
            this._back_ZMDGJ_Btn = null;
            this._start_ZMDGJ_List = new Array();
        }
        onAwake() {
            this.Ad_ZMDGJ_Pos_ZMDGJ_ID = _ZMDGJ_ShareAd_ZMDGJ_.History_ZMDGJ_LocationID;
            this._top_ZMDGJ_Zone = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("TopZone");
            this._back_ZMDGJ_Btn = this._top_ZMDGJ_Zone.getChildByName("BackBtn");
            this._list = this._ZMDGJ_Sprite_ZMDGJ_.getChildByName("List");
            this._list.renderHandler = Laya.Handler.create(this, this.on_ZMDGJ_List_ZMDGJ_Render, null, false);
            this._list.vScrollBarSkin = "";
        }
        onStart() {
            this.ref_ZMDGJ_resh();
        }
        onEnable() {
            this._back_ZMDGJ_Btn.on(Laya.Event.CLICK, this, this.on_ZMDGJ_Back_ZMDGJ_Btn);
        }
        onDisable() {
            this._back_ZMDGJ_Btn.off(Laya.Event.CLICK, this, this.on_ZMDGJ_Back_ZMDGJ_Btn);
        }
        ref_ZMDGJ_resh(onComplate) {
            let self = this;
            _ZMDGJ_ShareAd_ZMDGJ_.get_ZMDGJ_ADVs(this.Ad_ZMDGJ_Pos_ZMDGJ_ID, (datas) => {
                if (null != datas) {
                    self._datas = datas;
                    self._start_ZMDGJ_List.splice(0);
                    for (let i = 0; i < self._datas.length; ++i) {
                        self._start_ZMDGJ_List.push(false);
                    }
                    let num = Math.floor(self._start_ZMDGJ_List.length * 0.33);
                    while (num > 0) {
                        let index = Math.floor(Math.random() * self._start_ZMDGJ_List.length);
                        if (false == self._start_ZMDGJ_List[index]) {
                            self._start_ZMDGJ_List[index] = true;
                            --num;
                        }
                    }
                    self._list.array = self._datas;
                }
            }, false);
        }
        on_ZMDGJ_List_ZMDGJ_Render(cell, index) {
            let data = this._list.array[index];
            let star = this._start_ZMDGJ_List[index];
            let historyBox = cell.getComponent(KRQ__ZMDGJ_History_ZMDGJ_Box);
            historyBox.setData(data, star);
        }
        on_ZMDGJ_Back_ZMDGJ_Btn() {
            this._ZMDGJ_hide_ZMDGJ_();
            if (null != this.On_ZMDGJ_Back_ZMDGJ_Btn_ZMDGJ_Click) {
                this.On_ZMDGJ_Back_ZMDGJ_Btn_ZMDGJ_Click();
            }
        }
        _ZMDGJ_show_ZMDGJ_() {
            super._ZMDGJ_show_ZMDGJ_();
            this.ref_ZMDGJ_resh();
        }
    }

    class Mini_ZMDGJ_Game_ZMDGJ_View_ZMDGJ_Template extends View_ZMDGJ_Base {
        constructor() {
            super(...arguments);
            this._krq_ZMDGJ_history = null;
        }
        onAwake() {
            super.onAwake();
            this._krq_ZMDGJ_history = this.View_ZMDGJ_.getChildByName("KRQ_History").getComponent(KRQ_ZMDGJ__His_ZMDGJ_tory);
            let self = this;
            this._krq_ZMDGJ_history.On_ZMDGJ_Back_ZMDGJ_Btn_ZMDGJ_Click = () => {
                self.close_ZMDGJ_View();
            };
        }
        onStart() {
            super.onStart();
        }
        add_ZMDGJ_Event() {
            super.add_ZMDGJ_Event();
        }
        remove_ZMDGJ_Event() {
            super.remove_ZMDGJ_Event();
        }
    }

    class WXCrazyClick extends View_ZMDGJ_Base {
        constructor() {
            super(...arguments);
            this._clickBar = null;
            this._totalClickTimer = 15;
            this._needClickTime = 10;
            this._bannerClickTime = Math.floor(Math.random() * 5) + 2;
            this._banner = null;
        }
        onAwake() {
            super.onAwake();
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
            let self = this;
            Laya.loader.load("ClickGetPrize/quanji.png", Laya.Handler.create(this, (texture) => {
                Laya.loader.load("ClickGetPrize/quanji.sk", Laya.Handler.create(this, (bytes) => {
                    console.log("texture", texture);
                    console.log("bytes", bytes);
                    let template = new Laya.Templet();
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
                }), Laya.Handler.create(this, () => { }), "", 0, false, "", true);
            }), Laya.Handler.create(this, () => { }), "", 0, false, "", true);
        }
        add_ZMDGJ_Event() {
            super.add_ZMDGJ_Event();
            Laya.stage.on(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
        }
        remove_ZMDGJ_Event() {
            super.remove_ZMDGJ_Event();
            Laya.stage.off(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
        }
        onUpdate() {
            super.onUpdate();
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
                let spd = 2 + (this._clickBar.width / this._clickBarOriginalWidth) * 4;
                if (this._clickBar.width >= spd) {
                    this._clickBar.width -= spd;
                }
                if ((this._clickBar.width / this._clickBarOriginalWidth) + 0.1 < (this._clickTime / this._needClickTime)) {
                    this._clickTime--;
                }
            }
        }
        open_ZMDGJ_View(data) {
            this._compeletFunction = data.Complete;
            this._titel = data.titel;
            super.open_ZMDGJ_View(data);
        }
        OpenPrizeWindow() {
            let self = this;
            this._prizeCount_Text.text = this._titel;
            this._getPrize_View.visible = true;
            this._confirm_Btn.once(Laya.Event.CLICK, this, function () {
                if (null != self._banner) {
                    self._banner._ZMDGJ_hide_ZMDGJ_();
                }
                if (self._compeletFunction) {
                    self._compeletFunction();
                }
                self.close_ZMDGJ_View();
            });
        }
        ShowBanner() {
            let self = this;
            WX_ZMDGJ_ADMgr.get_ZMDGJ_Banner((banner) => {
                if (null != self._banner) {
                    self._banner._ZMDGJ_hide_ZMDGJ_();
                }
                self._banner = banner;
                if (null != self._banner) {
                    self._banner._ZMDGJ_show_ZMDGJ_();
                }
            });
        }
        ButtonClicked() {
            this._clickTime++;
            this._totalClickTime++;
            if (null != this.drgon) {
                this.drgon.play(1, false);
                this.drgon.once(Laya.Event.STOPPED, this, () => {
                    this.drgon.play(0, true);
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
                if (Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag && 1 == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wxcfg.kuang_ZMDGJ_dian_ZMDGJ_Banner) {
                    this.ShowBanner();
                }
                Laya.timer.once(2000, this, function () {
                    this.BannerClicked();
                });
            }
            else if (this._totalClickTime > this._totalClickTimer) {
                if (Wu_ZMDGJ_dian_ZMDGJ_Mgr.Wu_ZMDGJ_dian_ZMDGJ_Flag && 1 == App_ZMDGJ_Switch_ZMDGJ_Config.get_ZMDGJ_Instance().get_ZMDGJ_App_ZMDGJ_Switch_ZMDGJ_Data().wxcfg.kuang_ZMDGJ_dian_ZMDGJ_Banner) {
                    this.ShowBanner();
                }
                this.BannerClicked();
            }
            let progress = (this._clickTime / this._needClickTime) * this._clickBarOriginalWidth;
            this._clickBar.width = progress;
        }
        BannerClicked() {
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.AD_Wu_ZMDGJ_dian_ZMDGJ_Banner__ZMDGJ_Hide);
            this._bannerClicked = true;
            this._clickTime = this._needClickTime;
            this._clickBar.width = this._clickBarOriginalWidth;
            this._click_Btn.visible = false;
            this.OpenPrizeWindow();
        }
        onDestroy() {
            super.onDestroy();
            if (null != this._banner) {
                this._banner._ZMDGJ_hide_ZMDGJ_();
            }
        }
        onFocusChange() {
            if (null != this.drgon) {
                this.drgon.play(0, true);
            }
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Mgr/GameMgr.ts", Game_ZMDGJ_Mgr);
            reg("View/LoadingView/LoadingView.ts", Loading_ZMDGJ_View);
            reg("View/ButtonAnim.ts", Button_ZMDGJ_Anim);
            reg("View/SkinTips/SkinTips.ts", SkinTips);
            reg("KRQ/Com/KRQ_LoopAd/KRQ_LoopAdBox.ts", KRQ_ZMDGJ__Loop_ZMDGJ_Ad_ZMDGJ_Box);
            reg("KRQ/Com/KRQ_LoopAd/KRQ_VLoopAd.ts", KRQ_ZMDGJ__V_ZMDGJ_Loop_ZMDGJ_Ad);
            reg("View/TemplateViews/Export2/Exprot2ViewTemplate.ts", Exprot2_ZMDGJ_View_ZMDGJ_Template);
            reg("View/Common/ViewAutoScaleByW.ts", ViewAutoScaleByW);
            reg("View/TemplateViews/Export3/Exprot3ViewTemplate.ts", Exprot3ViewTemplate);
            reg("View/TemplateViews/GameFail/GameFailViewTemplate.ts", Game_ZMDGJ_Fail_ZMDGJ_View_ZMDGJ_Template);
            reg("View/TemplateViews/GameWin/GameWinViewTemplate.ts", Game_ZMDGJ_Win_ZMDGJ_ViewTemplate);
            reg("View/TemplateViews/InGame/GameInfo.ts", GameInfo);
            reg("View/TemplateViews/InGame/Input.ts", Input);
            reg("View/TemplateViews/InGame/InGameViewTemplate.ts", In_ZMDGJ_Game_ZMDGJ_View_ZMDGJ_Template);
            reg("View/TemplateViews/Main/Ani.ts", Ani);
            reg("View/TemplateViews/Main/MainViewTemplate.ts", Main_ZMDGJ_View_ZMDGJ_Template);
            reg("View/TemplateViews/MiniGame/MiniGameViewTemplate.ts", Mini_ZMDGJ_Game_ZMDGJ_View_ZMDGJ_Template);
            reg("KRQ/Com/KRQ_History/KRQ_HistoryBox.ts", KRQ__ZMDGJ_History_ZMDGJ_Box);
            reg("KRQ/Com/KRQ_History/KRQ_History.ts", KRQ_ZMDGJ__His_ZMDGJ_tory);
            reg("View/TemplateViews/WXCrazyClick/WXCrazyClick.ts", WXCrazyClick);
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
            LoadingUI.uiView = { "type": "Scene", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Clip", "props": { "y": 0, "x": 1, "width": 750, "skin": "Loading/Juxing.png", "name": "Bg", "height": 1334 }, "compId": 6, "child": [{ "type": "Clip", "props": { "right": 0, "name": "BottomZone", "left": 0, "height": 570, "bottom": 99 }, "compId": 23, "child": [{ "type": "Clip", "props": { "y": 327, "x": 376, "width": 615, "skin": "Loading/loadingxiatiao.png", "pivotY": 22, "pivotX": 308, "name": "processBarBg", "height": 44, "sizeGrid": "0,25,0,25" }, "compId": 8, "child": [{ "type": "Clip", "props": { "width": 594, "skin": "Loading/loadingshangtiao.png", "pivotY": 13, "name": "processBar", "left": 11, "height": 26, "bottom": 8, "sizeGrid": "0,12,0,12" }, "compId": 5 }, { "type": "Sprite", "props": { "y": -23, "x": 308, "width": 143, "texture": "Loading/ziyuanjiazaizhong.png", "pivotY": 12, "pivotX": 72, "height": 23 }, "compId": 10 }] }] }, { "type": "Clip", "props": { "top": 200, "skin": "Loading/Logo.png", "name": "Logo", "centerX": 0 }, "compId": 24 }] }, { "type": "Script", "props": { "y": 0, "x": 0, "runtime": "View/LoadingView/LoadingView.ts" }, "compId": 7 }], "loadList": ["Loading/Juxing.png", "Loading/loadingxiatiao.png", "Loading/loadingshangtiao.png", "Loading/ziyuanjiazaizhong.png", "Loading/Logo.png"], "loadList3D": [] };
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
            if (true == App_ZMDGJ_Config.onTTMiniGame) {
                Laya.Browser.onMiniGame = false;
            }
            if (!Laya.Browser.onMiniGame
                && !Laya.Browser.onQGMiniGame
                && !Laya.Browser.onQQMiniGame
                && !App_ZMDGJ_Config.onTTMiniGame) {
                App_ZMDGJ_Config.Res_ZMDGJ_Server = App_ZMDGJ_Config.Local_ZMDGJ_Test_ZMDGJ_ReServer;
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
                { url: App_ZMDGJ_Config.Res_ZMDGJ_Server + "/json/appswitch.json", type: Laya.Loader.JSON }
            ];
            var self = this;
            Laya.loader.load(firstConfigs, Laya.Handler.create(this, () => {
                self.loadRes();
            }));
            Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.reg_ZMDGJ_OnceEvent(Event_ZMDGJ_Def.App_Close_ZMDGJ_First_ZMDGJ_Loading_ZMDGJ_View, this, this.closeloadingUI);
        }
        initLoadingView() {
            this._loadingUI = new ui.View.LoadingUI();
            Laya.stage.addChild(this._loadingUI);
            this._loadingUI.width = Laya.stage.width;
            this._loadingUI.height = Laya.stage.height;
            this._loadingView = this._loadingUI.getComponent(Loading_ZMDGJ_View);
            this._loadingView.set_ZMDGJ_Process(0);
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
            this._preLoadRes.push({ url: App_ZMDGJ_Config.Local_ZMDGJ_Test_ZMDGJ_ReServer + "/json/storeconfig.json", type: Laya.Loader.JSON });
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
                                self._loadingView.set_ZMDGJ_Process(res / 2 + 0.5);
                            }));
                        }
                        else {
                            loadSubResTask = Laya.Browser.window["wx"].loadSubpackage({
                                name: 'subRes1',
                                success: (res) => {
                                    if (resource.length > 0) {
                                        Laya.loader.load(resource, Laya.Handler.create(this, () => {
                                            self.onLoadResComplate();
                                        }), Laya.Handler.create(this, (res) => {
                                            self._loadingView.set_ZMDGJ_Process(res / 2 + 0.5);
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
                        }
                    },
                    fail: (res) => {
                        this.loadRes();
                    }
                });
                loadSubResTask.onProgressUpdate(res => {
                    self._loadingView.set_ZMDGJ_Process(res / 2);
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
                                self._loadingView.set_ZMDGJ_Process(res / 2 + 0.5);
                            }));
                        }
                        else {
                            var loadSubResTask = Laya.Browser.window["qg"].loadSubpackage({
                                name: 'subRes1',
                                success: (res) => {
                                    if (resource.length > 0) {
                                        Laya.loader.load(resource, Laya.Handler.create(this, () => {
                                            self.onLoadResComplate();
                                        }), Laya.Handler.create(this, (res) => {
                                            self._loadingView.set_ZMDGJ_Process(res / 2 + 0.5);
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
                    self._loadingView.set_ZMDGJ_Process(progress / 2);
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
                                self._loadingView.set_ZMDGJ_Process(res / 2 + 0.5);
                            }));
                        }
                        else {
                            loadSubResTask = Laya.Browser.window["qq"].loadSubpackage({
                                name: 'subRes1',
                                success: (res) => {
                                    if (resource.length > 0) {
                                        Laya.loader.load(resource, Laya.Handler.create(this, () => {
                                            self.onLoadResComplate();
                                        }), Laya.Handler.create(this, (res) => {
                                            self._loadingView.set_ZMDGJ_Process(res / 2 + 0.5);
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
                        }
                    },
                    fail: (res) => {
                        this.loadRes();
                    }
                });
                loadSubResTask.onProgressUpdate(res => {
                    self._loadingView.set_ZMDGJ_Process(res / 2);
                });
            }
            else {
                if (resource.length > 0) {
                    Laya.loader.load(resource, Laya.Handler.create(this, () => {
                        self.onLoadResComplate();
                    }), Laya.Handler.create(this, (res) => {
                        self._loadingView.set_ZMDGJ_Process(res);
                    }));
                }
                else {
                    self.onLoadResComplate();
                }
            }
        }
        onLoadResComplate() {
            var self = this;
            this._loadingView.set_ZMDGJ_Process(1);
            if (Laya.Browser.onMiniGame) {
                WX_ZMDGJ_API._ZMDGJ_wxLogin_ZMDGJ_(function (code) {
                    User_ZMDGJ_.code_ZMDGJ_ = code;
                    Http_ZMDGJ_Unit.login_ZMDGJ_((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            User_ZMDGJ_._ZMDGJ_token = res.data.token;
                            User_ZMDGJ_.openId_ZMDGJ_ = res.data.openid;
                            ALD.ald_ZMDGJ_Send_ZMDGJ_OpenId(User_ZMDGJ_.openId_ZMDGJ_);
                            Http_ZMDGJ_Unit.get_ZMDGJ_Game_ZMDGJ_Data((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    User_ZMDGJ_.initi_ZMDGJ_User(res.data);
                                }
                                else {
                                    User_ZMDGJ_.initi_ZMDGJ_User(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                User_ZMDGJ_._ZMDGJ_token = "";
                                User_ZMDGJ_.openId_ZMDGJ_ = "";
                                User_ZMDGJ_.initi_ZMDGJ_User(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！" + res);
                            User_ZMDGJ_.initi_ZMDGJ_User(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！" + res);
                        User_ZMDGJ_.initi_ZMDGJ_User(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else if (Laya.Browser.onQGMiniGame) {
                OPPO_ZMDGJ_API.init_ZMDGJ_AdService(() => {
                }, () => {
                }, () => {
                });
                OPPO_ZMDGJ_API._ZMDGJ_Login_ZMDGJ_(function (token) {
                    User_ZMDGJ_.code_ZMDGJ_ = token;
                    Http_ZMDGJ_Unit.login_ZMDGJ_((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            User_ZMDGJ_._ZMDGJ_token = res.data.token;
                            User_ZMDGJ_.openId_ZMDGJ_ = res.data.openid;
                            Http_ZMDGJ_Unit.get_ZMDGJ_Game_ZMDGJ_Data((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    User_ZMDGJ_.initi_ZMDGJ_User(res.data);
                                    console.log("获取用户数据--------------------Start");
                                    for (var key in res.data) {
                                        console.log(key, res.data[key]);
                                    }
                                    console.log("获取用户数据--------------------End");
                                }
                                else {
                                    User_ZMDGJ_.initi_ZMDGJ_User(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                User_ZMDGJ_._ZMDGJ_token = "";
                                User_ZMDGJ_.openId_ZMDGJ_ = "";
                                User_ZMDGJ_.initi_ZMDGJ_User(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！", res);
                            User_ZMDGJ_.initi_ZMDGJ_User(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！", res);
                        User_ZMDGJ_.initi_ZMDGJ_User(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else if (Laya.Browser.onQQMiniGame) {
                QQ_ZMDGJ_Mini_ZMDGJ_GameAPI._ZMDGJ_Login_ZMDGJ_(function (code) {
                    User_ZMDGJ_.code_ZMDGJ_ = code;
                    Http_ZMDGJ_Unit.login_ZMDGJ_((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            User_ZMDGJ_._ZMDGJ_token = res.data.token;
                            User_ZMDGJ_.openId_ZMDGJ_ = res.data.openid;
                            ALD.ald_ZMDGJ_Send_ZMDGJ_OpenId(User_ZMDGJ_.openId_ZMDGJ_);
                            Http_ZMDGJ_Unit.get_ZMDGJ_Game_ZMDGJ_Data((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    User_ZMDGJ_.initi_ZMDGJ_User(res.data);
                                }
                                else {
                                    User_ZMDGJ_.initi_ZMDGJ_User(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                User_ZMDGJ_._ZMDGJ_token = "";
                                User_ZMDGJ_.openId_ZMDGJ_ = "";
                                User_ZMDGJ_.initi_ZMDGJ_User(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！" + res);
                            User_ZMDGJ_.initi_ZMDGJ_User(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！" + res);
                        User_ZMDGJ_.initi_ZMDGJ_User(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else if (App_ZMDGJ_Config.onTTMiniGame) {
                TT_ZMDGJ_API._ZMDGJ_ttLogin_ZMDGJ_(function (code) {
                    User_ZMDGJ_.code_ZMDGJ_ = code;
                    Http_ZMDGJ_Unit.login_ZMDGJ_((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            User_ZMDGJ_._ZMDGJ_token = res.data.token;
                            User_ZMDGJ_.openId_ZMDGJ_ = res.data.openid;
                            Http_ZMDGJ_Unit.get_ZMDGJ_Game_ZMDGJ_Data((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    User_ZMDGJ_.initi_ZMDGJ_User(res.data);
                                }
                                else {
                                    User_ZMDGJ_.initi_ZMDGJ_User(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                User_ZMDGJ_._ZMDGJ_token = "";
                                User_ZMDGJ_.openId_ZMDGJ_ = "";
                                User_ZMDGJ_.initi_ZMDGJ_User(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                        else {
                            console.log("登陆失败！！！" + res);
                            User_ZMDGJ_.initi_ZMDGJ_User(null);
                            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            }));
                        }
                    }, (res) => {
                        console.log("登陆失败！！！" + res);
                        User_ZMDGJ_.initi_ZMDGJ_User(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, () => {
                    User_ZMDGJ_.initi_ZMDGJ_User(null);
                    GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                    }));
                });
            }
            else {
                User_ZMDGJ_.test_ZMDGJ_InitUser();
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
