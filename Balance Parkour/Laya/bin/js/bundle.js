(function () {
    'use strict';

    var EventDispatcher = Laya.EventDispatcher;
    class Event_tippy_Mgr extends EventDispatcher {
        constructor() {
            super();
        }
        ;
        dispatch(InName, agv) {
            Event_tippy_Mgr.event_tippy_Dispatcher.event(InName, agv);
        }
        regEvemt(InName, caller, listener, arg) {
            Event_tippy_Mgr.event_tippy_Dispatcher.on(InName, caller, listener, (arg == null) ? null : ([arg]));
        }
        regOnceEvent(InName, caller, listener, arg) {
            Event_tippy_Mgr.event_tippy_Dispatcher.once(InName, caller, listener, (arg == null) ? null : ([arg]));
        }
        removeEvent(InName, caller, listener, arg) {
            Event_tippy_Mgr.event_tippy_Dispatcher.off(InName, caller, listener);
        }
    }
    Event_tippy_Mgr.event_tippy_Dispatcher = new EventDispatcher();
    Event_tippy_Mgr.ins_tippy_tance = new Event_tippy_Mgr();

    var Event_tippy_Def;
    (function (Event_tippy_Def) {
        Event_tippy_Def[Event_tippy_Def["None"] = 0] = "None";
        Event_tippy_Def[Event_tippy_Def["App_CloseFirstLoadingView"] = 500] = "App_CloseFirstLoadingView";
        Event_tippy_Def[Event_tippy_Def["AD__tippy_OnShareAdFail"] = 501] = "AD__tippy_OnShareAdFail";
        Event_tippy_Def[Event_tippy_Def["Game__tippy_OnViewOpen"] = 600] = "Game__tippy_OnViewOpen";
        Event_tippy_Def[Event_tippy_Def["Game__tippy_OnViewClose"] = 601] = "Game__tippy_OnViewClose";
        Event_tippy_Def[Event_tippy_Def["Game__tippy_OnUserMoneyChange"] = 701] = "Game__tippy_OnUserMoneyChange";
        Event_tippy_Def[Event_tippy_Def["Game__tippy_OnUserCrystalChange"] = 702] = "Game__tippy_OnUserCrystalChange";
        Event_tippy_Def[Event_tippy_Def["Game__tippy_OnLevelStart"] = 1000] = "Game__tippy_OnLevelStart";
        Event_tippy_Def[Event_tippy_Def["Game__tippy_OnLevelComplate"] = 1001] = "Game__tippy_OnLevelComplate";
        Event_tippy_Def[Event_tippy_Def["AD_WudianBanner_LoadComplete"] = 2217] = "AD_WudianBanner_LoadComplete";
        Event_tippy_Def[Event_tippy_Def["AD_WudianBanner_Show"] = 2218] = "AD_WudianBanner_Show";
        Event_tippy_Def[Event_tippy_Def["AD_WudianBanner_Hide"] = 2219] = "AD_WudianBanner_Hide";
        Event_tippy_Def[Event_tippy_Def["AD_WudianBanner_PreLoad"] = 2220] = "AD_WudianBanner_PreLoad";
        Event_tippy_Def[Event_tippy_Def["RewardVideoSuccess"] = 20010] = "RewardVideoSuccess";
        Event_tippy_Def[Event_tippy_Def["RewardVideoFail"] = 20011] = "RewardVideoFail";
        Event_tippy_Def[Event_tippy_Def["InsertVideoEnd"] = 20012] = "InsertVideoEnd";
    })(Event_tippy_Def || (Event_tippy_Def = {}));

    class User_tippy_GameData {
        constructor() {
            this.levelNum = 1;
            this.moneyNum = 0;
            this.crystalNum = 0;
        }
    }
    class Us_tippy_er extends Laya.Script {
        static get isLogin() {
            return (Us_tippy_er.co_tippy_de != "") || (Us_tippy_er.tok_tippy_en != "");
        }
        static getSave_tippy_Data() {
            return JSON.stringify(Us_tippy_er._game_tippy_Data);
        }
        static testInit_tippy_User() {
            var storageStr = Laya.LocalStorage.getItem("Game_Data");
            console.log("读取存储数据 str----" + storageStr);
            var data = JSON.parse(storageStr);
            if (data == null) {
                Us_tippy_er._game_tippy_Data.levelNum = 1;
                Us_tippy_er._game_tippy_Data.moneyNum = 0;
                Us_tippy_er._game_tippy_Data.crystalNum = 0;
                return;
            }
            Us_tippy_er._game_tippy_Data.levelNum = data.levelNum;
            Us_tippy_er._game_tippy_Data.moneyNum = data.moneyNum;
            Us_tippy_er._game_tippy_Data.crystalNum = data.crystalNum;
        }
        static initi_tippy_User(data) {
            if (data && 0 != data) {
                Us_tippy_er._game_tippy_Data.levelNum = data.levelNum;
                Us_tippy_er._game_tippy_Data.moneyNum = data.moneyNum;
                Us_tippy_er._game_tippy_Data.crystalNum = data.crystalNum;
            }
            else {
            }
        }
        static setLeve_tippy_Num(levelNum) {
            Us_tippy_er._game_tippy_Data.levelNum = levelNum;
        }
        static getLeve_tippy_Num() {
            return Us_tippy_er._game_tippy_Data.levelNum;
        }
        static add_tippy_Money(add) {
            add = Math.ceil(add);
            var last = Us_tippy_er._game_tippy_Data.moneyNum;
            Us_tippy_er._game_tippy_Data.moneyNum += add;
            Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.Game__tippy_OnUserMoneyChange, {
                curr: Us_tippy_er._game_tippy_Data.moneyNum,
                last: last
            });
        }
        static sub_tippy_Money(sub) {
            sub = Math.ceil(sub);
            var last = Us_tippy_er._game_tippy_Data.moneyNum;
            Us_tippy_er._game_tippy_Data.moneyNum -= sub;
            if (Us_tippy_er._game_tippy_Data.moneyNum < 0) {
                Us_tippy_er._game_tippy_Data.moneyNum = 0;
            }
            Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.Game__tippy_OnUserMoneyChange, {
                curr: Us_tippy_er._game_tippy_Data.moneyNum,
                last: last
            });
        }
        static get_tippy_Money() {
            return Us_tippy_er._game_tippy_Data.moneyNum;
        }
        static add_tippy_Crystal(add) {
            add = Math.ceil(add);
            var last = Us_tippy_er._game_tippy_Data.crystalNum;
            Us_tippy_er._game_tippy_Data.crystalNum += add;
            Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.Game__tippy_OnUserCrystalChange, {
                curr: Us_tippy_er._game_tippy_Data.crystalNum,
                last: last
            });
        }
        static sub_tippy_Crystal(sub) {
            sub = Math.ceil(sub);
            var last = Us_tippy_er._game_tippy_Data.crystalNum;
            Us_tippy_er._game_tippy_Data.crystalNum -= sub;
            if (Us_tippy_er._game_tippy_Data.crystalNum < 0) {
                Us_tippy_er._game_tippy_Data.crystalNum = 0;
            }
            Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.Game__tippy_OnUserCrystalChange, {
                curr: Us_tippy_er._game_tippy_Data.crystalNum,
                last: last
            });
        }
        static get_tippy_Crystal() {
            return Us_tippy_er._game_tippy_Data.crystalNum;
        }
    }
    Us_tippy_er.co_tippy_de = "";
    Us_tippy_er.open_tippy_Id = "";
    Us_tippy_er.tok_tippy_en = null;
    Us_tippy_er.nick_tippy_Name = "";
    Us_tippy_er.gen_tippy_der = 0;
    Us_tippy_er.is_tippy_Login = false;
    Us_tippy_er._game_tippy_Data = new User_tippy_GameData();

    class Camaermove extends Laya.Script3D {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
            this.swichss = false;
            this.moverotate = false;
            this.lastpos = { x: null, y: null };
        }
        onAwake() {
            console.log("设置相机移动");
            this.cam = this.owner;
            this.initcam();
        }
        initcam() {
            this.Mainscenesp = Game_tippy_Mgr.mainsp;
            this.player = this.Mainscenesp.player;
            let a = this.player.transform.localPosition;
            this.cam.transform.localPosition = new Laya.Vector3(a.x - 11, a.y + 7, a.z);
        }
        onEnable() {
        }
        onDisable() {
        }
        setcamaermove() {
            Laya.stage.on(Laya.Event.KEY_DOWN, this, (e) => {
                let speed = 0.2;
                if (e.keyCode == 65) {
                    this.cam.transform.translate(new Laya.Vector3(-speed, 0, 0), true);
                }
                else if (e.keyCode == 68) {
                    this.cam.transform.translate(new Laya.Vector3(speed, 0, 0), true);
                }
                else if (e.keyCode == 87) {
                    this.cam.transform.translate(new Laya.Vector3(0, 0, -speed), true);
                }
                else if (e.keyCode == 83) {
                    this.cam.transform.translate(new Laya.Vector3(0, 0, speed), true);
                }
                else if (e.keyCode == 66) {
                    this.swichss = !this.swichss;
                }
            });
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, (e) => {
                this.moverotate = true;
            });
            Laya.stage.on(Laya.Event.MOUSE_UP, this, () => {
                this.moverotate = false;
                this.lastpos.x = null;
                this.lastpos.y = null;
            });
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, (e) => {
                if (!this.moverotate) {
                    return;
                }
                if (this.lastpos.x == null) {
                    this.lastpos.x = e.stageX;
                    this.lastpos.y = e.stageY;
                    return;
                }
                this.countrota(e.stageX, e.stageY);
            });
        }
        countrota(x, y) {
            if (!this.swichss) {
                return;
            }
            let dex = (x - this.lastpos.x) / 5;
            let dey = (y - this.lastpos.y) / 5;
            this.cam.transform.rotate(new Laya.Vector3(-dey, 0, 0), true, false);
            this.cam.transform.rotate(new Laya.Vector3(0, -dex, 0), false, false);
            this.lastpos.x = x;
            this.lastpos.y = y;
        }
        onLateUpdate() {
            if (!this.Mainscenesp.iswin) {
                let a = this.player.transform.localPosition;
                this.cam.transform.localPosition = new Laya.Vector3(a.x - 11, a.y + 7, a.z);
            }
            else {
                this.movetoplayer();
            }
        }
        movetoplayer() {
            let a = this.player.transform.localPosition;
            if (this.cam.transform.localPosition.x >= a.x - 5) {
            }
            else {
                this.cam.transform.localPositionX += 0.1;
            }
            if (this.cam.transform.localPosition.y <= a.y + 4) {
            }
            else {
                this.cam.transform.localPositionY -= 0.1 / 2;
            }
        }
        onUpdate() {
        }
    }

    class MoveFunc extends Laya.Script3D {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
        }
        static getabpos(a, b) {
            let t = a.transform;
            let bt = b.transform;
            let r = Math.pow(Math.pow(t.localPositionX - bt.localPositionX, 2) + Math.pow(t.localPositionZ - bt.localPositionZ, 2), 1 / 2);
            return r;
        }
        static rotateto(clear, angelneed, tar, time, onetime) {
            if (clear) {
                Laya.timer.clearAll(this);
            }
            let cha = { x: 0, y: 0, z: 0 };
            cha.x = angelneed.x - tar.transform.localRotationEulerX;
            cha.y = angelneed.y - tar.transform.localRotationEulerY;
            cha.z = angelneed.z - tar.transform.localRotationEulerZ;
            let havetime = 0;
            let alltime = time / onetime;
            let roateone = { x: cha.x / alltime, y: cha.y / alltime, z: cha.z / alltime };
            let func = () => {
                havetime += 1;
                tar.transform.localRotationEulerX += roateone.x;
                tar.transform.localRotationEulerY += roateone.y;
                tar.transform.localRotationEulerZ += roateone.z;
                if (havetime >= alltime) {
                    tar.transform.localRotationEulerX = angelneed.x;
                    tar.transform.localRotationEulerY = angelneed.y;
                    tar.transform.localRotationEulerZ = angelneed.z;
                    Laya.timer.clear(this, func);
                }
            };
            Laya.timer.loop(onetime, this, func);
        }
        static fadeshow(type, tar, time, call) {
            let onetime = 30;
            let alltime = time / onetime;
            let havetime = 0;
            let addonetime;
            let color = tar.meshRenderer.material['albedoColor'];
            tar.active = true;
            if (type == 1) {
                addonetime = (1 - color.w) / alltime;
            }
            else {
                addonetime = (-color.w) / alltime;
            }
            tar.meshRenderer.material['albedoColor'] = color;
            let func = () => {
                havetime += 1;
                color.w += addonetime;
                tar.meshRenderer.material['albedoColor'] = color;
                if (havetime >= alltime) {
                    if (call) {
                        call();
                    }
                    Laya.timer.clear(this, func);
                }
            };
            Laya.timer.loop(onetime, this, func);
        }
    }

    class Sound_tippy_Mgr {
        constructor() {
            this._enabled = true;
        }
        get Enabled() {
            return this._enabled;
        }
        set Enabled(e) {
            if (!e) {
                this.stop_tippy_BGM();
            }
            this._enabled = e;
        }
        get_tippy_SoundUrl(name) {
            let url = Sound_tippy_Mgr.soundResPath + name + ".ogg";
            return url;
        }
        play_tippy_Sound(name) {
            if (!this._enabled)
                return;
            var url = this.get_tippy_SoundUrl(name);
            if (Laya.Browser.onMiniGame) {
                var sound = Laya.Pool.getItem(name);
                if (sound == null) {
                    sound = wx.createInnerAudioContext();
                    sound.src = Sound_tippy_Mgr.soundResPath + name + ".ogg";
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
        play_tippy_BGM(name) {
            if (!this._enabled)
                return;
            let url = this.get_tippy_SoundUrl(name);
            if (Laya.Browser.onMiniGame) {
                if (!this.bg_tippy_m) {
                    this.bg_tippy_m = wx.createInnerAudioContext();
                }
                this.bg_tippy_m.stop();
                this.bg_tippy_m.src = url;
                this.bg_tippy_m.loop = true;
                this.bg_tippy_m.play();
            }
            else {
                Laya.SoundManager.playMusic(url, 0);
            }
        }
        stop_tippy_BGM() {
            if (Laya.Browser.onMiniGame) {
                if (this.bg_tippy_m) {
                    this.bg_tippy_m.stop();
                }
            }
            else {
                Laya.SoundManager.stopMusic();
            }
        }
    }
    Sound_tippy_Mgr.soundResPath = "subRes/sound/";
    Sound_tippy_Mgr.instance = new Sound_tippy_Mgr();

    class NativeCallback {
        static onVideoFail() {
            console.debug("onVideoFail --------- ------------ ");
            Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.RewardVideoFail);
            Sound_tippy_Mgr.instance.play_tippy_BGM("bgmusic");
        }
        static onVideoSuccess(reward) {
            console.debug("onVideoSuccess    --------- ------------ ");
            Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.RewardVideoSuccess, reward);
            Sound_tippy_Mgr.instance.play_tippy_BGM("bgmusic");
        }
        static onInsertVideoEnd() {
            console.debug("onInsertVideoEnd    --------- ------------ ");
            Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.InsertVideoEnd);
        }
        static CallNativeFunc(funcName) {
            if (window['conch']) {
                if (Laya.Browser.onAndroid) {
                    var bridge = window["PlatformClass"].createClass("demo.JSBridge");
                    bridge.call(funcName);
                }
                else if (Laya.Browser.onIOS) {
                }
            }
        }
    }
    NativeCallback.NowVideoType = "";
    NativeCallback.conchIOS = "Conch-ios";
    NativeCallback.conchAndroid = "Conch-android";
    NativeCallback.os = "";

    class Vibrate_tippy_Mgr {
        static vibrate_tippy_Short() {
            if (!Vibrate_tippy_Mgr.isEnable)
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
        static ibrate_tippy_Long() {
            if (!Vibrate_tippy_Mgr.isEnable)
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
        static vib_tippy_rate(time) {
            if (!Vibrate_tippy_Mgr.isEnable)
                return;
            if (Laya.Browser.onMiniGame) {
                let count = time / 15;
                let index = 0;
                let obj = { count: count, index: index };
                Laya.timer.loop(16, obj, function () {
                    Vibrate_tippy_Mgr.vibrate_tippy_Short();
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
                    Vibrate_tippy_Mgr.vibrate_tippy_Short();
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
                    Vibrate_tippy_Mgr.vibrate_tippy_Short();
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
                    Vibrate_tippy_Mgr.vibrate_tippy_Short();
                    index++;
                    if (index > count) {
                        Laya.timer.clearAll(obj);
                    }
                });
            }
        }
    }
    Vibrate_tippy_Mgr.isEnable = true;

    class Player extends Laya.Script3D {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
            this.isrotate = false;
            this.hitcotime = 0;
            this.playerinfo = {
                x: 0,
                y: 0.75,
                z: 0,
                rx: 0,
                ry: -90,
                rz: 0.
            };
            this.looptime = 0;
            this.havein = false;
            this.movespeed = 0.03;
            this.basespeed = 0.015;
            this.nowstay = 1;
            this.laststay = 'up';
            this.readtorota = false;
            this.isleft = false;
            this.hitResult = new Laya.HitResult();
            this.hitResult2 = new Laya.HitResult();
            this.hitResult3 = new Laya.HitResult();
            this.hitResult4 = new Laya.HitResult();
            this.checkresult = new Laya.HitResult();
            this.checkresult2 = new Laya.HitResult();
        }
        onAwake() {
            this.Mainscenesp = Game_tippy_Mgr.mainsp;
            let a = this.owner.getComponent(Laya.Rigidbody3D);
            a.isTrigger = false;
            this.nodes = this.owner;
            a.isKinematic = true;
            a.gravity = new Laya.Vector3(0, -10, 0);
            a.angularFactor = new Laya.Vector3(0, 0, 0);
            this.rigid = a;
            console.log(this.nodes.transform.localPositionY, "a啊啊啊");
            console.log(this.nodes.transform.localRotationEulerY);
            this.Mainscenesp.playerinitinfo = {
                posx: 0,
                posy: 0.75,
                posz: 0,
                rotx: 0,
                roty: -90,
                rotz: 0,
            };
            console.log(this.owner.getChildAt(0), "动画信息");
            this.anmantor = this.owner.getChildAt(0).getChildAt(0).getComponent(Laya.Animator);
            this.anmantor.play("ANIM_Char_Idlewalk");
            let cu = this.nodes.getChildAt(0).getChildAt(0).getChildAt(0);
            cu.skinnedMeshRenderer.castShadow = true;
        }
        initplace(isfuhuoback) {
            let cu = this.nodes.getChildAt(0).getChildAt(0).getChildAt(0);
            cu.skinnedMeshRenderer.castShadow = true;
            this.rigid.isKinematic = false;
            this.loopstant();
            if (isfuhuoback) {
                this.nodes.transform.localPositionX = this.playerinfo.x;
                this.nodes.transform.localPositionY = this.playerinfo.y;
                this.nodes.transform.localPositionZ = this.playerinfo.z;
                this.nodes.transform.localRotationEulerX = this.playerinfo.rx;
                this.nodes.transform.localRotationEulerY = this.playerinfo.ry;
                this.nodes.transform.localRotationEulerZ = this.playerinfo.rz;
            }
            else {
                this.nodes.transform.localPositionX = this.Mainscenesp.playerinitinfo.posx;
                this.nodes.transform.localPositionY = this.Mainscenesp.playerinitinfo.posy;
                this.nodes.transform.localPositionZ = this.Mainscenesp.playerinitinfo.posz;
                this.nodes.transform.localRotationEulerX = this.Mainscenesp.playerinitinfo.rotx;
                this.nodes.transform.localRotationEulerY = this.Mainscenesp.playerinitinfo.roty;
                this.nodes.transform.localRotationEulerZ = this.Mainscenesp.playerinitinfo.rotz;
            }
        }
        loopstant() {
            if (this.Mainscenesp.havestart) {
                return;
            }
            if (this.havein) {
                return;
            }
            this.havein = true;
            this.anmantor.speed = 0.7;
            this.looptime++;
            let t;
            if (this.looptime <= 5) {
                this.anmantor.crossFade("ANIM_Char_Stant", 0.3, 0);
                t = this.anmantor.getCurrentAnimatorPlayState();
                setTimeout(() => {
                    this.loopstant();
                }, (0.6 * 1000) / this.anmantor.speed);
            }
            else {
                this.looptime = 0;
                this.anmantor.crossFade("ANIM_Char_Stant2", 0.3, 0);
                t = this.anmantor.getCurrentAnimatorPlayState();
                setTimeout(() => {
                    this.loopstant();
                }, (0.7 * 1000) / this.anmantor.speed);
            }
        }
        saveinfo(pos, rot) {
            this.playerinfo.x = pos.x;
            this.playerinfo.y = pos.y;
            this.playerinfo.z = pos.z;
            this.playerinfo.rx = rot.x;
            this.playerinfo.ry = rot.y;
            this.playerinfo.rz = rot.z;
        }
        onCollisionEnter(collision) {
            if (collision.other['haveuse']) {
                return;
            }
            collision.other['haveuse'] = true;
            if (collision.other.owner.name == 'ci') {
                console.log("踩到刺了");
                this.anmantor.crossFade('ANIM_Char_Idlewalk', 0.4, 0);
                if (this.Mainscenesp.fuhuochance >= 1) {
                    this.Mainscenesp.pausegame();
                }
                else {
                    this.Mainscenesp.losegame();
                }
            }
        }
        onCollisionExit(collision) {
        }
        onTriggerEnter(collider) {
            console.log("触发开始");
            let colpar = collider.owner.parent;
            if (colpar['haveactive']) {
                return;
            }
            this.Mainscenesp.playsound("getd.ogg");
            colpar['haveactive'] = true;
            let pri = collider.owner.parent.getChildAt(1);
            pri.active = true;
            Vibrate_tippy_Mgr.vibrate_tippy_Short();
            collider.owner.active = false;
            setTimeout(() => {
                pri.active = false;
            }, 1600);
            this.Mainscenesp.gameuicontrosp.addzuanshi();
        }
        onEnable() {
        }
        onDisable() {
        }
        onUpdate() {
            this.move();
            this.raycast();
        }
        onLateUpdate() {
        }
        onStart() {
            this.nodes.transform.localPositionY = 0.75;
        }
        move() {
            if (!this.Mainscenesp.havestart) {
                return;
            }
            if (this.readtorota) {
                this.nodes.transform.translate(new Laya.Vector3(0, 0, this.basespeed * 1.5));
                let r = MoveFunc.getabpos(this.nodes, this.Mainscenesp.conbox.parent);
                if (r <= 2 + 0.1) {
                    this.readtorota = false;
                    this.rotate(this.isleft);
                    return;
                }
                return;
            }
            if (this.isrotate) {
                return;
            }
            this.getstay();
            let movescal = 1;
            if (this.nowstay == 0) {
                if (this.laststay != 'up') {
                    this.laststay = 'up';
                    this.animachange();
                }
                this.nodes.transform.translate(new Laya.Vector3(0, 0, this.basespeed));
            }
            else if (this.nowstay == this.facedata.left) {
                if (this.laststay != 'left') {
                    this.laststay = 'left';
                    this.animachange();
                }
            }
            else if (this.nowstay == this.facedata.right) {
                if (this.laststay != 'right') {
                    this.laststay = 'right';
                    this.animachange();
                }
            }
            else if (this.nowstay == this.facedata.down) {
                if (this.laststay != 'down') {
                    this.laststay = 'down';
                    this.animachange();
                }
                movescal = 0.4;
            }
            else if (this.nowstay == this.facedata.up) {
                if (this.laststay != 'upg') {
                    this.laststay = 'upg';
                    this.animachange();
                }
                this.nodes.transform.translate(new Laya.Vector3(0, 0, this.basespeed / 2));
            }
            this.nodes.transform.localPositionX += this.movespeed * -this.Mainscenesp.bili.y * movescal;
            this.nodes.transform.localPositionZ += this.movespeed * this.Mainscenesp.bili.x * movescal;
            this.changespeed();
        }
        getstay() {
            if (this.Mainscenesp.bili.y > 0) {
                if (this.Mainscenesp.bili.y + 0.2 > Math.abs(this.Mainscenesp.bili.x)) {
                    this.nowstay = 1;
                }
                else if (this.Mainscenesp.bili.x > 0) {
                    this.nowstay = 3;
                }
                else if (this.Mainscenesp.bili.x < 0) {
                    this.nowstay = 2;
                }
            }
            else if (this.Mainscenesp.bili.y < 0) {
                if (Math.abs(this.Mainscenesp.bili.y) + 0.2 > Math.abs(this.Mainscenesp.bili.x)) {
                    this.nowstay = 4;
                }
                else if (this.Mainscenesp.bili.x > 0) {
                    this.nowstay = 3;
                }
                else if (this.Mainscenesp.bili.x < 0) {
                    this.nowstay = 2;
                }
            }
            else if (this.Mainscenesp.bili.y == 0) {
                if (this.Mainscenesp.bili.x == 0) {
                    this.nowstay = 0;
                }
                else if (this.Mainscenesp.bili.x > 0) {
                    this.nowstay = 3;
                }
                else if (this.Mainscenesp.bili.x < 0) {
                    this.nowstay = 2;
                }
            }
        }
        rotateface() {
            let data = {
                up: 4,
                down: 1,
                left: 2,
                right: 3,
                movez: 3,
            };
            console.log(this.nodes.transform.localRotationEulerY);
            this.saveinfo(this.nodes.transform.localPosition, this.nodes.transform.localRotationEuler);
            let st = this.nodes.transform.localRotationEulerY / 90;
            st = Number(st.toFixed(0));
            if (st == 1 || st == -3) {
                data = {
                    up: 4,
                    down: 1,
                    left: 2,
                    right: 3,
                    movez: 3,
                };
            }
            else if (st == 2 || st == -2) {
                data = {
                    up: 2,
                    down: 3,
                    left: 1,
                    right: 4,
                    movez: 2,
                };
            }
            else if (st == 3 || st == -1) {
                data = {
                    up: 1,
                    down: 4,
                    left: 3,
                    right: 2,
                    movez: 1,
                };
            }
            else if (st == 4 || st == 0) {
                data = {
                    up: 3,
                    down: 2,
                    left: 4,
                    right: 1,
                    movez: 4,
                };
            }
            this.facedata = data;
        }
        changespeed() {
            let r = Math.pow(Math.pow(this.Mainscenesp.bili.x, 2) + Math.pow(this.Mainscenesp.bili.y, 2), 1 / 2);
            let sp = 1.8 * r;
            if (sp < 1.3) {
                sp = 1.3;
            }
            this.anmantor.speed = sp;
        }
        animachange() {
            let time = 0.5;
            let guitime = 0;
            if (this.laststay == "down") {
                this.anmantor.crossFade('ANIM_Char_FallBack', time, guitime);
            }
            else if (this.laststay == "right") {
                this.anmantor.crossFade('ANIM_Char_StrafeRight', time, guitime);
            }
            else if (this.laststay == "left") {
                this.anmantor.crossFade('ANIM_Char_StrafeLeft', time, guitime);
            }
            else if (this.laststay == "up") {
                this.anmantor.crossFade('ANIM_Char_Idlewalk', time, guitime);
            }
            else if (this.laststay == "upg") {
                this.anmantor.crossFade('ANIM_Char_MoveForward', time, guitime);
            }
        }
        rotate(isleft) {
            let rotabox = this.Mainscenesp.conbox.parent;
            console.log(" this.conbox Y " + rotabox.transform.localRotationEulerY);
            this.isrotate = true;
            isleft = true;
            let a;
            let b;
            let c;
            let d;
            if (this.facedata.movez == 1) {
                a = rotabox.transform.localPositionZ;
                b = this.nodes.transform.localPositionZ;
                if (isleft) {
                    a = a + b;
                    b = a - b;
                    a = a - b;
                }
                c = 2;
                d = 2 + this.nodes.transform.localPositionX - rotabox.transform.localPositionX;
            }
            else if (this.facedata.movez == 2) {
                a = this.nodes.transform.localPositionX;
                b = rotabox.transform.localPositionX;
                if (isleft) {
                    a = a + b;
                    b = a - b;
                    a = a - b;
                }
                c = 2;
                d = 2 + this.nodes.transform.localPositionZ - rotabox.transform.localPositionZ;
            }
            else if (this.facedata.movez == 3) {
                a = this.nodes.transform.localPositionZ;
                b = rotabox.transform.localPositionZ;
                if (isleft) {
                    a = a + b;
                    b = a - b;
                    a = a - b;
                }
                c = 2;
                d = 2 + rotabox.transform.localPositionX - this.nodes.transform.localPositionX;
            }
            else if (this.facedata.movez == 4) {
                a = rotabox.transform.localPositionX;
                b = this.nodes.transform.localPositionX;
                if (isleft) {
                    a = a + b;
                    b = a - b;
                    a = a - b;
                }
                c = 2;
                d = 2 + rotabox.transform.localPositionZ - this.nodes.transform.localPositionZ;
            }
            let cha = a - b;
            let duo = 4 - d;
            let tarpos = c - cha - duo;
            if (tarpos < 0) {
                tarpos = 0;
            }
            let tosmll = false;
            let r = MoveFunc.getabpos(this.nodes, rotabox);
            console.log(this.facedata.movez, a, b, c, duo, r, tarpos);
            if (r > 2 + 0.1) {
                console.log("没到");
                this.readtorota = true;
                return;
            }
            if (this.laststay != 'up') {
                this.laststay = 'up';
                this.animachange();
            }
            if (tarpos >= d) {
                tarpos = d - 0.3;
                console.log("超了");
            }
            let long = 2 * Math.PI * tarpos * 0.25;
            if (isleft) {
                if (tosmll) {
                    this.rotateby(2000, 20, 90, long, isleft, true);
                }
                else {
                    this.rotateby(2000, 20, 90, long, isleft);
                }
            }
            else {
                if (tosmll) {
                    this.rotateby(2000, 20, 90, long, false, true);
                }
                else {
                    this.rotateby(2000, 20, 90, long);
                }
            }
        }
        rotateby(time, onetime, rotationy, movepo, isleft, tosmll) {
            let havetime = 0;
            let alltime = time / onetime;
            let rotateonetime = rotationy / alltime;
            this.Mainscenesp.playsound("rotate.ogg");
            if (isleft) {
                rotateonetime = -rotateonetime;
            }
            let moveonetime = movepo / alltime;
            let tars = this.Mainscenesp.conbox.getChildAt(0);
            let tar = tars.transform;
            let func = () => {
                havetime += 1;
                this.nodes.transform.localRotationEulerY -= rotateonetime;
                this.nodes.transform.translate(new Laya.Vector3(0, 0, moveonetime));
                tar.localRotationEulerY -= rotateonetime;
                if (havetime >= alltime) {
                    Laya.timer.clear(this, func);
                    this.isrotate = false;
                    let a = Number((this.nodes.transform.localRotationEulerY / 90).toFixed(0));
                    this.nodes.transform.localRotationEulerY = 90 * a;
                    tar.localRotationEulerY = Number(tar.localRotationEulerY.toFixed(0));
                    tar.localRotationEulerY = 90;
                    this.rotateface();
                    if (this.Mainscenesp.readtomove) {
                        this.Mainscenesp.countrota(1, 23, 3, 4, true);
                    }
                }
            };
            Laya.timer.loop(onetime, this, func);
        }
        raycast() {
            let d = 0.53;
            let bian = 0.15;
            let posstart = new Laya.Vector3(this.nodes.transform.position.x - bian, this.nodes.transform.position.y, this.nodes.transform.position.z - bian);
            this.Mainscenesp.gamescene.physicsSimulation.raycastFromTo(this.nodes.transform.position, new Laya.Vector3(this.nodes.transform.position.x - bian, this.nodes.transform.position.y - d, this.nodes.transform.position.z + bian), this.hitResult);
            this.Mainscenesp.gamescene.physicsSimulation.raycastFromTo(posstart, new Laya.Vector3(this.nodes.transform.position.x - bian, this.nodes.transform.position.y - 3.5, this.nodes.transform.position.z - bian), this.checkresult);
            let time = 1;
            let chek = (ty) => {
                if (ty.succeeded) {
                    let haveactipos = ty.collider.owner.parent;
                    if (this.cultname(ty.collider.owner.name) == 'MESH') {
                        if (haveactipos['haveactive']) {
                        }
                        else {
                            this.rotateface();
                            haveactipos['haveactive'] = true;
                            this.hitcube();
                            this.newbolk(ty.collider, true);
                        }
                    }
                    else if (this.cultname(ty.collider.owner.name, '02') == 'Cube' || this.cultname(ty.collider.owner.name, '0') == 'fangkuai') {
                        if (haveactipos['haveactive']) {
                        }
                        else {
                            this.rotateface();
                            haveactipos['haveactive'] = true;
                            this.hitcube();
                            this.newbolk(ty.collider);
                        }
                    }
                    else if (this.cultname(ty.collider.owner.name) == 'zhuanpan') {
                        if (haveactipos['haveactive']) {
                        }
                        else {
                            haveactipos['haveactive'] = true;
                            this.hitcube();
                            this.Mainscenesp.cubeback(this.Mainscenesp.conbox.parent);
                            this.changecolroand(ty.collider);
                            this.isleft = false;
                            this.rotate();
                        }
                    }
                    else if (this.cultname(ty.collider.owner.name) == 'rotatecubeleft') {
                        if (haveactipos['haveactive']) {
                        }
                        else {
                            haveactipos['haveactive'] = true;
                            this.Mainscenesp.cubeback(this.Mainscenesp.conbox.parent);
                            this.changecolroand(ty.collider);
                            console.log("左边的");
                            this.isleft = true;
                            this.rotate(true);
                        }
                    }
                    else if (this.cultname(ty.collider.owner.name) == 'zhongdian') {
                        if (haveactipos['haveactive']) {
                        }
                        else {
                            this.hitcube();
                            ty.collider.owner.getChildAt(0).active = true;
                            haveactipos['haveactive'] = true;
                            this.newbolk(ty.collider, false, true);
                            this.anmantor.crossFade('ANIM_Char_Win', 0.4, 0);
                            this.Mainscenesp.win();
                        }
                    }
                    return true;
                }
                else {
                    time += 1;
                    if (time == 2) {
                        this.Mainscenesp.gamescene.physicsSimulation.raycastFromTo(this.nodes.transform.position, new Laya.Vector3(this.nodes.transform.position.x - bian, this.nodes.transform.position.y - d, this.nodes.transform.position.z - bian), this.hitResult2);
                    }
                    else if (time == 3) {
                        this.Mainscenesp.gamescene.physicsSimulation.raycastFromTo(this.nodes.transform.position, new Laya.Vector3(this.nodes.transform.position.x + bian, this.nodes.transform.position.y - d, this.nodes.transform.position.z - bian), this.hitResult3);
                    }
                    else if (time == 4) {
                        this.Mainscenesp.gamescene.physicsSimulation.raycastFromTo(this.nodes.transform.position, new Laya.Vector3(this.nodes.transform.position.x + bian, this.nodes.transform.position.y - d, this.nodes.transform.position.z + bian), this.hitResult4);
                    }
                    if (time <= 4) {
                        chek(this['hitResult' + time]);
                    }
                    else {
                        return false;
                    }
                }
            };
            let chekresu = (ry) => {
                if (this.cultname(ry.collider.owner.name, '02') == 'Cube' || this.cultname(ry.collider.owner.name) == 'MESH' || this.cultname(ry.collider.owner.name, '0') == 'fangkuai') {
                    if (ry.collider.owner['haveactive']) {
                        if (Math.abs(this.nodes.transform.position.y - ry.point.y - this.nodes.transform.localScaleY / 2) > 0.15) {
                            this.nodes.transform.position.y = ry.point.y + this.nodes.transform.localScaleY / 2 + 0.1;
                        }
                    }
                }
            };
            if (chek(this.hitResult)) {
            }
            else if (this.checkresult.succeeded) {
                chekresu(this.checkresult);
            }
            else {
                posstart.x += bian * 2;
                posstart.z += bian * 2;
                this.Mainscenesp.gamescene.physicsSimulation.raycastFromTo(posstart, new Laya.Vector3(this.nodes.transform.position.x + bian, this.nodes.transform.position.y - 3.5, this.nodes.transform.position.z + bian), this.checkresult2);
                if (this.checkresult2.succeeded) {
                    chekresu(this.checkresult2);
                }
                else {
                    if (!this.Mainscenesp.havestart) {
                        return;
                    }
                    this.Mainscenesp.havestart = false;
                    this.Mainscenesp.conbox.meshRenderer.material.albedoColor = this.lastcolor;
                    this.Mainscenesp.playsound("fall.ogg");
                    console.log("输了");
                    this.anmantor.crossFade('ANIM_Char_Idlewalk', 0.4, 0);
                    if (this.Mainscenesp.fuhuochance >= 1) {
                        this.Mainscenesp.pausegame();
                    }
                    else {
                        this.Mainscenesp.losegame();
                    }
                }
            }
        }
        hitcube() {
            this.hitcotime += 1;
            this.Mainscenesp.gameuicontrosp.setjindu(this.hitcotime);
        }
        cultname(str, lab) {
            let a = str.split("_");
            if (lab) {
                a = str.split(lab);
            }
            return a[0];
        }
        changecolroand(backbolk, parent) {
            this.rigid.gravity = new Laya.Vector3(0, -10, 0);
            if (this.cultname(this.Mainscenesp.conbox.name, '02') == 'Cube' || this.cultname(this.Mainscenesp.conbox.name) == 'MESH') {
                this.Mainscenesp.conbox.meshRenderer.material.albedoColor = this.lastcolor;
            }
            this.Mainscenesp.conbox = backbolk.owner;
            this.lastcolor = backbolk.owner.meshRenderer.material.albedoColor;
            if (this.cultname(this.Mainscenesp.conbox.name, '02') == 'Cube' || this.cultname(this.Mainscenesp.conbox.name) == 'MESH') {
                backbolk.owner.meshRenderer.material.albedoColor = new Laya.Vector4(5 / 255, 226 / 255, 255 / 255, 1.0);
            }
        }
        newbolk(backbolk, parent, isend) {
            if (!this.Mainscenesp.conbox) {
                return;
            }
            this.Mainscenesp.cubeback(this.Mainscenesp.conbox.parent);
            if (!this.lastcolor) {
                console.log("初次赋值");
                this.lastcolor = this.Mainscenesp.conbox.meshRenderer.material.albedoColor;
            }
            if (parent) {
                this.changecolroand(backbolk, parent);
            }
            else {
                this.changecolroand(backbolk);
            }
            if (this.Mainscenesp.readtomove) {
                if (!isend) {
                    this.Mainscenesp.countrota(1, 23, 3, 4, true);
                }
            }
        }
    }

    class Cubemove extends Laya.Script {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
        }
        onAwake() {
            this.mainsp = Game_tippy_Mgr.mainsp;
        }
        onEnable() {
        }
        onDisable() {
        }
        move(type, tar) {
            if (type == 1) {
                this.moveby(tar, type);
            }
            else if (type == 2) {
                this.moveby(tar, type);
            }
            else {
                this.rotateby(tar);
            }
        }
        moveby(tar, type) {
            let onetime = 30;
            let moveonetime = 1000 / onetime;
            let moveoner = 0.5;
            let rotateonetime = moveoner / moveonetime;
            let func;
            let max = 0.45;
            let min = -0.45;
            if (type == 1) {
                func = () => {
                    if (!this.mainsp.havestart) {
                        return;
                    }
                    tar.transform.localPositionZ += rotateonetime;
                    if (tar.transform.localPositionZ > max) {
                        tar.transform.localPositionZ = max;
                        rotateonetime = -rotateonetime;
                    }
                    else if (tar.transform.localPositionZ < min) {
                        tar.transform.localPositionZ = min;
                        rotateonetime = -rotateonetime;
                    }
                };
            }
            else {
                func = () => {
                    if (!this.mainsp.havestart) {
                        return;
                    }
                    tar.transform.localPositionX += rotateonetime;
                    if (tar.transform.localPositionX > max) {
                        tar.transform.localPositionX = max;
                        rotateonetime = -rotateonetime;
                    }
                    else if (tar.transform.localPositionX < min) {
                        tar.transform.localPositionX = min;
                        rotateonetime = -rotateonetime;
                    }
                };
            }
            Laya.timer.loop(onetime, this, func);
        }
        rotateby(tar) {
            let onetime = 30;
            let moveonetime = 1000 / onetime;
            let moveoner = 120;
            let rotateonetime = moveoner / moveonetime;
            let func = () => {
                if (!this.mainsp.havestart) {
                    return;
                }
                tar.transform.localRotationEulerY -= rotateonetime;
            };
            Laya.timer.loop(onetime, this, func);
        }
        onDestroy() {
            Laya.timer.clearAll(this);
        }
    }

    class createcube extends Laya.Script {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
            this.loaded = false;
            this.dir = 1;
            this.pos = { up: 4, y: 0.5 };
            this.lastpos = new Laya.Vector3(0, 0, 0);
            this.leavedata = {
                leave1: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) },
                ],
                leave2: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave3: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave4: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai01", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave5: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave6: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "fangkuai02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "fangkuai01", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave7: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "fangkuai02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave8: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai01", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave9: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai09", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave10: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai01", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave11: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave12: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai08", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave13: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave14: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "fangkuai01", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "fangkuai09", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave15: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai09", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave16: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai09", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave17: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai09", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai08", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave18: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai09", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai08", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave19: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai06", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "MESH_L", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai08", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave20: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai06", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai08", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave21: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "fangkuai06", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "fangkuai08", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave22: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "fangkuai06", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "fangkuai08", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "fangkuai01", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave23: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "fangkuai06", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai08", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai01", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave24: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai01", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave25: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai01", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave26: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai01", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai06", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave27: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai01", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai06", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai06", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave28: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai06", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai08", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave29: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "fangkuai06", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "fangkuai09", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave30: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai09", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "fangkuai06", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.4627451, 0.6039216, 0.9803922, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.345098, 0.4313726, 0.7647059, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave31: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "fangkuai06", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai08", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai08", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai06", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave32: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai02", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "fangkuai09", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai01", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai01", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.8313726, 0.5372549, 0.4509804, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.5490196, 0.2705882, 0.2862745, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave33: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "fangkuai01", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave34: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai07", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "MESH_U", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai02", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.2, 0.4980392, 0.3568628, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.2901961, 0.7058824, 0.4235294, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave35: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai06", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai05", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai04", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai09", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
                leave36: [
                    { name: "Cube02", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "MESH_O", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai09", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "MESH_T", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai08", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "MESH_H", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "Cube02", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhuanpan", color: new Laya.Vector4(0.8196079, 0.2901961, 0.3137255, 1.0) },
                    { name: "fangkuai03", color: new Laya.Vector4(0.9647059, 0.3921569, 0.7882353, 1.0) },
                    { name: "fangkuai09", color: new Laya.Vector4(0.6235294, 0.3803922, 0.8784314, 1.0) },
                    { name: "zhongdian", color: new Laya.Vector4(1, 1, 1, 1.0) }
                ],
            };
            this.leave = 1;
            this.useleave = 1;
            this.cubepoop = [];
            this.cubeinitinfo = [];
            this.jun = 1;
            this.have = 0;
            this.all = 0;
            this.bgcolor = [
                { R: 239, G: 209, B: 185 },
                { R: 176, G: 232, B: 145 },
                { R: 178, G: 167, B: 245 },
                { R: 190, G: 208, B: 248 },
            ];
        }
        onAwake() {
            this.Mainscenesp = Game_tippy_Mgr.mainsp;
            this.ep = this.Mainscenesp.gamescene.getChildAt(5);
            this.createlayer = this.Mainscenesp.gamescene.getChildAt(3);
            this.norcube = this.ep.getChildAt(1);
            this.zhongdian = this.ep.getChildAt(3);
            this.zhuanpan = this.ep.getChildAt(2);
            this.meshs = this.ep.getChildAt(4);
            this.fangkuais = this.ep.getChildAt(5);
            this.baoshi = this.ep.getChildAt(0);
            let b = this.baoshi.getChildAt(0);
            b.meshRenderer.castShadow = true;
            let a = Number(Laya.LocalStorage.getItem("leave"));
            if (a) {
                console.log("有过游戏记录！！！", a);
                this.useleave = a;
                this.leave = a;
            }
        }
        cultnameandreturncube(str) {
            let func = (lab, re) => {
                let a;
                a = str.split(lab);
                if (re) {
                    return a[1];
                }
                else {
                    return a[0];
                }
            };
            let c;
            if (str == 'Cube02') {
                c = this.norcube;
            }
            else if (str == 'zhuanpan') {
                c = this.zhuanpan;
            }
            else if (func('0') == 'fangkuai') {
                c = this.fangkuais.getChildAt(Number(func('0', true)) - 1);
            }
            else if (func('_') == 'MESH') {
                c = this.meshs.getChildByName(str);
            }
            else if (str == 'zhongdian') {
                c = this.zhongdian;
            }
            return c;
        }
        addcubecon(a) {
            let b;
            b = a.name.split('0');
            if (b[0] == 'fangkuai') {
                let c = a.addComponent(Cubemove);
                if (b[1] == '1' || b[1] == '9') {
                    if (this.dir == 1 || this.dir == 3) {
                        c.move(1, a.getChildAt(0).getChildAt(0));
                    }
                    else {
                        c.move(2, a.getChildAt(0).getChildAt(0));
                    }
                }
                else if (b[1] == '8' || b[1] == '7') {
                    c.move(3, a.getChildAt(0).getChildAt(0));
                }
            }
        }
        createcube(call, not) {
            console.log("创建", this.useleave);
            let a = Number(Laya.LocalStorage.getItem("leave"));
            if (a) {
                if (!not) {
                    this.useleave = a;
                }
            }
            if (!this.leavedata['leave' + this.useleave]) {
                this.useleave = Math.ceil(Math.random() * 36);
                this.createcube(call, true);
                console.log("没有这个等级下一个");
                return;
            }
            this.initcube(true);
            this.initrandowcreate();
            for (const key in this.leavedata['leave' + this.useleave]) {
                let inf = this.leavedata['leave' + this.useleave][key];
                let item = this.cultnameandreturncube(inf.name);
                let yt = item.getChildAt(0);
                yt.meshRenderer.receiveShadow = true;
                let x = this.lastpos.x;
                let y = this.lastpos.y;
                let z = this.lastpos.z;
                let a = Laya.Sprite3D.instantiate(item, this.createlayer, false, new Laya.Vector3(x, y, z));
                if (key == '0') {
                    this.Mainscenesp.conbox = a.getChildAt(0);
                    this.Mainscenesp.playersp.lastcolor = inf.color;
                }
                a.transform.localRotationEulerY = 90;
                console.log(a.transform.localPosition, " this.conbox Y " + a.transform.localRotationEulerY);
                this.addcubecon(a);
                if (inf.color) {
                    let t = a.getChildAt(0);
                    t.meshRenderer.receiveShadow = true;
                    t.meshRenderer.material['albedoColor'] = inf.color;
                    if (inf.name == "fangkuai01" || inf.name == "fangkuai02" || inf.name == "fangkuai03" || inf.name == "fangkuai04" || inf.name == "fangkuai05" || inf.name == "fangkuai06" || inf.name == "fangkuai09") {
                        for (var i = 0; i < t.numChildren; i++) {
                            let cont = t.getChildAt(i);
                            cont.meshRenderer.castShadow = true;
                        }
                    }
                    else if (inf.name == "fangkuai07" || inf.name == "fangkuai08") {
                        let tt = t.getChildAt(0).getChildAt(0);
                        tt.meshRenderer.castShadow = true;
                    }
                }
                this.savecubeinfo(a);
                if (key != '0') {
                    if (inf.name != "zhongdian" && inf.name != "MESH_T" && inf.name != "zhuanpan") {
                        if (this.have < this.all) {
                            this.create(this.jun, a);
                        }
                    }
                }
                else {
                }
            }
            call();
        }
        initrandowcreate() {
            this.have = 0;
            let randownum = 10 + Math.ceil(Math.random() * 5);
            this.all = randownum;
            let can = 0;
            for (const key in this.leavedata['leave' + this.useleave]) {
                let n = this.leavedata['leave' + this.useleave][key].name;
                if (n != "zhongdian" && n != "MESH_T" && n != "zhuanpan") {
                    can++;
                }
            }
            can--;
            this.jun = randownum / can;
            this.jun = Number(this.jun.toFixed(0));
            if (this.jun < 1) {
                this.jun = 1;
            }
            else if (this.jun > 4) {
                this.jun = 4;
            }
        }
        create(time, tar) {
            let po = 1.5;
            let ran = [
                { x: -po, y: po, use: false },
                { x: po, y: -po, use: false },
                { x: po, y: po, use: false },
                { x: -po, y: -po, use: false },
            ];
            let ranbase = [
                { x: -1, y: 1, use: false },
                { x: -1, y: -1, use: false },
                { x: 1, y: 1, use: false },
                { x: 1, y: -1, use: false },
                { x: 0, y: 0, use: false },
                { x: 0, y: po, use: false },
                { x: po, y: 0, use: false },
                { x: 0, y: -po, use: false },
                { x: -po, y: 0, use: false },
            ];
            let allisuse = 0;
            let getrand = (base) => {
                let rann;
                let tar;
                if (base) {
                    tar = ranbase;
                    rann = Math.floor(Math.random() * 8.99);
                }
                else {
                    tar = ran;
                    rann = Math.floor(Math.random() * 3.99);
                }
                if (tar[rann].use) {
                    if (base) {
                        return getrand(base);
                    }
                    else {
                        return getrand();
                    }
                }
                else {
                    tar[rann].use = true;
                    return tar[rann];
                }
            };
            for (let k = 0; k < time; k++) {
                let rann;
                if (tar.name == "Cube02" || tar.name == "fangkuai09" || tar.name == "fangkuai01" || tar.name == "fangkuai07" || tar.name == "fangkuai08") {
                    rann = getrand(true);
                }
                else {
                    rann = getrand();
                }
                let a = Laya.Sprite3D.instantiate(this.baoshi, tar, false, new Laya.Vector3(0, 1, 0));
                a.transform.localPositionX = rann.x;
                a.transform.localPositionY = 1;
                a.transform.localPositionZ = rann.y;
                a.transform.localRotationEulerX = -90;
                let t = a.getChildAt(0);
                t.meshRenderer.castShadow = true;
                a.getChildAt(1).active = false;
                this.have++;
            }
        }
        savecubeinfo(cub) {
            if (cub.name == 'zhuanpan') {
                this.dir -= 1;
                if (this.dir < 1) {
                    this.dir = 4;
                }
            }
            if (this.dir == 1) {
                this.lastpos.x -= this.pos.up;
            }
            else if (this.dir == 2) {
                this.lastpos.z -= this.pos.up;
            }
            else if (this.dir == 3) {
                this.lastpos.x += this.pos.up;
            }
            else if (this.dir == 4) {
                this.lastpos.z += this.pos.up;
            }
            this.lastpos.y -= this.pos.y;
            this.cubepoop.push(cub);
            let info = { x: cub.transform.localPositionX, y: cub.transform.localPositionY, z: cub.transform.localPositionZ };
            this.cubeinitinfo.push(info);
        }
        initcube(des, call) {
            console.log("初始化");
            this.Mainscenesp.gameuicontrosp.nextleave(this.leave, this.leavedata['leave' + this.useleave].length);
            this.lastpos = new Laya.Vector3(0, 0, 0);
            this.dir = 1;
            if (des) {
                for (const key in this.cubepoop) {
                    this.cubepoop[key].destroy();
                }
                let key = ((this.leave + 1) / 2) % 4;
                console.log(key);
                key = Math.floor(key);
                console.log("用的是第", key);
                this.Mainscenesp.Maincam.clearColor = new Laya.Vector4(this.bgcolor[key].R / 255, this.bgcolor[key].G / 255, this.bgcolor[key].B / 255, 1);
                this.cubepoop = [];
                this.cubeinitinfo = [];
            }
            else {
                for (const key in this.cubepoop) {
                    this.cubepoop[key].transform.localPositionX = this.cubeinitinfo[key].x;
                    this.cubepoop[key].transform.localPositionY = this.cubeinitinfo[key].y;
                    this.cubepoop[key].transform.localPositionZ = this.cubeinitinfo[key].z;
                    this.cubepoop[key].transform.localRotationEulerY = 90;
                    this.cubepoop[key].haveactive = false;
                    let ch = this.cubepoop[key]._children;
                    for (const keys in ch) {
                        if (ch[keys].name == "Cylinder001") {
                            ch[keys].haveactive = false;
                            let tar = ch[keys].getChildAt(0);
                            let color = tar.meshRenderer.material['albedoColor'];
                            color.w = 1.0;
                            tar.meshRenderer.material['albedoColor'] = color;
                            tar.active = true;
                            ch[keys].getChildAt(1).active = false;
                        }
                    }
                }
            }
            if (call) {
                call();
            }
        }
        onEnable() {
        }
        onDisable() {
        }
    }

    class movefunc2d extends Laya.Script {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
        }
        static btnsave(tar, time) {
            if (tar['btnsaveclicked']) {
                return false;
            }
            let t = 600;
            if (time) {
                t = time;
            }
            tar['btnsaveclicked'] = true;
            setTimeout(() => {
                tar['btnsaveclicked'] = false;
            }, t);
            return true;
        }
        static btnmove(btn, time, call, once, safe, safetime, tar) {
            if (btn.pivotX != btn.width / 2) {
                btn.pivotX = btn.width / 2;
                btn.pivotY = btn.height / 2;
                btn.x += btn.width / 2;
                btn.y += btn.height / 2;
            }
            let type = 'on';
            if (once) {
                type = 'once';
            }
            btn[type](Laya.Event.MOUSE_DOWN, btn, (e) => {
                e.stopPropagation();
                if (btn['havescale']) {
                    return;
                }
                btn['havescale'] = true;
                Laya.Tween.clearTween(btn);
                Laya.Tween.to(btn, { scaleX: 1.15, scaleY: 1.15 }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, () => {
                }));
            });
            btn[type](Laya.Event.MOUSE_UP, btn, (e) => {
                e.stopPropagation();
                if (btn['havescale']) {
                    btn['havescale'] = false;
                    Laya.Tween.clearTween(btn);
                    Laya.Tween.to(btn, { scaleX: 1, scaleY: 1 }, time, Laya.Ease.cubicIn, Laya.Handler.create(this, () => {
                    }));
                    if (safe) {
                        if (safetime) {
                            if (this.btnsave(btn, safetime)) {
                                call(e);
                            }
                        }
                        else {
                            if (this.btnsave(btn)) {
                                call(e);
                            }
                        }
                    }
                    else {
                        call(e);
                    }
                }
            });
            btn[type](Laya.Event.MOUSE_OUT, btn, (e) => {
                e.stopPropagation();
                if (btn['havescale']) {
                    btn['havescale'] = false;
                    Laya.Tween.clearTween(btn);
                    Laya.Tween.to(btn, { scaleX: 1, scaleY: 1 }, time, Laya.Ease.cubicIn, Laya.Handler.create(this, () => {
                    }));
                }
            });
        }
        static moveby(v2, tar, time, call) {
            let x = tar.x + v2.x;
            let y = tar.y + v2.y;
            Laya.Tween.to(tar, { x: x, y: y }, time, Laya.Ease.circIn, Laya.Handler.create(this, () => {
                if (call) {
                    call();
                }
            }));
        }
        static fadeto(alp, tar, time, call) {
            Laya.Tween.to(tar, { alpha: alp }, time, Laya.Ease.circIn, Laya.Handler.create(this, () => {
                if (call) {
                    call();
                }
            }));
        }
        static getsrcchangepic(src, tar) {
            var textureUrl = src;
            tar.graphics.clear();
            var texture = Laya.loader.getRes(textureUrl);
            tar.loadImage(textureUrl);
        }
    }

    class Share_tippy_Ad {
        static refresh_tippy_Ad(complate) {
        }
        static getADV_tippy_s(locationid, complate, useRandom, useLocalRandom) {
        }
        static reportUser_tippy_Click(advid) {
        }
        static getRandomAD_tippy_PosID() {
            return Share_tippy_Ad.AdLocationids[Math.floor(Math.random() * Share_tippy_Ad.AdLocationids.length)];
        }
        static re_tippy_quest(req) {
        }
        static getAdPos_tippy_Data(onSuccess, onFail) {
        }
        static reqUser_tippy_Click(advid, onSuccess, onFail) {
        }
        static getADV_tippy_Data(locationid, onSuccess, onFail) {
        }
        static Random_tippy_Jump(rate = 1) {
        }
        static isNeed_tippy_ShowAd() {
            return true;
        }
    }
    Share_tippy_Ad.mainUrl = "";
    Share_tippy_Ad.getAdPostion = "";
    Share_tippy_Ad.getAdv = "";
    Share_tippy_Ad.userClick = "";
    Share_tippy_Ad.LoopAdLocationID = 98;
    Share_tippy_Ad.BannerAdLocationID = 100;
    Share_tippy_Ad.InsertAdLocationID = 99;
    Share_tippy_Ad.AniAdLocationID = 108;
    Share_tippy_Ad.UseRandomAdPos = true;
    Share_tippy_Ad.AdLocationids = [
        98, 99
    ];
    Share_tippy_Ad._adPosition = {};
    Share_tippy_Ad._adv = {};
    Share_tippy_Ad._iphoneIgnoreAppIds = [
        "",
        "",
        ""
    ];

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
    }
    WXAPI.adUnitId = "adunit-e20df20a923a2d81";
    WXAPI.bannerAdUnitId = "adunit-3506d72c3074c591";
    WXAPI.InsAdUnitId = "adunit-440e21cc02c0d282";
    WXAPI._isRegRewardedVideoAdEvent = false;
    WXAPI._onRewardedVideoAdFailed = null;
    WXAPI._onRewardedVideoAdClose = null;
    WXAPI._onShow = null;
    WXAPI._lastShareTime = 0;

    var ALDEventDef;
    (function (ALDEventDef) {
        ALDEventDef["None"] = "fea3123d149edac85b1c2a96bbf338f2";
        ALDEventDef["ReportAdClickSuccess"] = "\u5E7F\u544A\u5BFC\u51FA\u6210\u529F";
        ALDEventDef["ReportAdClickFail"] = "\u5E7F\u544A\u5BFC\u51FA\u5931\u8D25";
    })(ALDEventDef || (ALDEventDef = {}));
    class AL_tippy_D {
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
        static aldSend_tippy_Event(event, data) {
            var eventName = event;
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window["wx"].aldSendEvent(eventName, data);
            }
            else if (Laya.Browser.onQQMiniGame) {
                Laya.Browser.window["qq"].aldSendEvent(eventName, data);
            }
        }
        static aldSendReport_tippy_AdClickSuccess(data) {
            var type = ALDEventDef.ReportAdClickSuccess + " " + data.title + ":" + String(data.appid);
            var ald = AL_tippy_D;
            ald.aldSend_tippy_Event(type, {
                "导出成功": data.title + ":" + String(data.appid)
            });
        }
        static aldSendReportAd_tippy_ClickFail(data) {
            var type = ALDEventDef.ReportAdClickFail + " " + data.title + ":" + String(data.appid);
            var ald = AL_tippy_D;
            ald.aldSend_tippy_Event(type, {
                "导出失败": data.title + ":" + String(data.appid)
            });
        }
    }

    class AppConfig {
    }
    AppConfig.AppID = "";
    AppConfig.ResServer = "";
    AppConfig.LocalTestReServer = "subRes";
    AppConfig.Versions = "0.0.0";
    AppConfig.onTTMiniGame = false;

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
                appId: AppConfig.AppID,
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
        static navigateToMiniProgram(pkgName, path, onSuccess, onFail, onComplate) {
            if (Laya.Browser.onQGMiniGame) {
                console.log("OPPO 跳转游戏： " + pkgName);
                Laya.Browser.window["qg"].navigateToMiniGame({
                    pkgName: pkgName,
                    path: path,
                    extraData: {
                        from: AppConfig.AppID
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
            return {};
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
    OPPOAPI.adUnitId = "134292";
    OPPOAPI.bannerAdUnitId = "134291";
    OPPOAPI.InsAdUnitId = "134294";
    OPPOAPI.OpenScreenAdUnitId = "134293";
    OPPOAPI._banner = null;

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
                console.log("不是的不打开");
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
    QQMiniGameAPI.adUnitId = "95f8d1b6a8615a56daf1857dade41bba";
    QQMiniGameAPI.bannerAdUnitId = "8ce9707a6237587628ee26d39b8c42e8";
    QQMiniGameAPI.InsAdUnitId = "";
    QQMiniGameAPI.AppBoxId = "13f9b0c1167e5ca0a75b35b6634baffe";
    QQMiniGameAPI._isRegRewardedVideoAdEvent = false;
    QQMiniGameAPI._onRewardedVideoAdFailed = null;
    QQMiniGameAPI._onRewardedVideoAdClose = null;
    QQMiniGameAPI._onShow = null;
    QQMiniGameAPI._lastShareTime = 0;
    QQMiniGameAPI.mAppboxAd = null;

    class SingleAd_tippy_View extends Laya.Script {
        constructor() {
            super(...arguments);
            this.AdPosID = Share_tippy_Ad.LoopAdLocationID;
            this._aniForward = false;
            this._data = null;
            this._fontSize = 25;
            this._originSize = 1;
            this._originW = 150;
            this._originH = 150;
        }
        onAwake() {
            this._ownerSprite = this.owner;
            this._displaySp = this.owner.getChildByName("Display");
            this._originW = this._displaySp.width;
            this._originH = this._displaySp.height;
            this._disText = this.owner.getChildByName("TitelText");
            this._disText.text = "";
            this._fontSize = this._disText.fontSize;
            this._originSize = this._displaySp.scaleX;
            this.btn = this.owner.getChildByName("btngo1");
            if (this.btn) {
                movefunc2d.btnmove(this.btn, 100, (e) => {
                });
            }
        }
        onEnable() {
            this.refresh_tippy_ADVDis();
            Laya.timer.loop(3000, this, this.refresh_tippy_ADVDis);
            this._ownerSprite.on(Laya.Event.CLICK, this, this.onSp_tippy_Click);
        }
        onDisable() {
            Laya.timer.clearAll(this);
            this._ownerSprite.off(Laya.Event.CLICK, this, this.onSp_tippy_Click);
        }
        refresh_tippy_ADVDis() {
            var self = this;
            Share_tippy_Ad.getADV_tippy_s(this.AdPosID, (datas) => {
                if (self.owner && !self.owner.destroyed) {
                    if (datas && datas.length > 0) {
                        self.owner.visible = true;
                        var data = datas[Math.floor(Math.random() * datas.length)];
                        self._displaySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                            if (!self._displaySp.destroyed) {
                                self._displaySp.width = self._originW;
                                self._displaySp.height = self._originH;
                                self._displaySp.scale(self._originSize, self._originSize);
                            }
                        }));
                        var str = String(data.title);
                        var num = str.length;
                        var fontSize = Math.floor((5 / num) * this._fontSize);
                        self._disText.fontSize = fontSize;
                        self._disText.text = str;
                        self._data = data;
                        window['nulad'] = false;
                    }
                    else {
                        console.log("单个错误！！！！！！！！！！");
                        window['nulad'] = true;
                        Laya.timer.clearAll(this);
                        self.owner.visible = false;
                    }
                }
            });
        }
        onUpdate() {
            this.display_tippy_Ani();
        }
        display_tippy_Ani() {
            if (!this._aniForward) {
                var scale = this._displaySp.scaleX - Laya.timer.delta / 3000 * 1;
                scale = Math.max(scale, 0);
                this._displaySp.scale(scale, scale);
                if (this._displaySp.scaleX <= 0.95 * this._originSize) {
                    this._aniForward = true;
                }
            }
            else {
                var scale = this._displaySp.scaleX + Laya.timer.delta / 3000 * 1;
                scale = Math.min(scale, 1 * this._originSize);
                this._displaySp.scale(scale, scale);
                if (this._displaySp.scaleX >= this._originSize) {
                    this._aniForward = false;
                }
            }
        }
        playsound(name) {
            var url = "subRes/music/" + name;
            if (Laya.Browser.onMiniGame) {
                var sound = Laya.Pool.getItem(name);
                if (sound == null) {
                    sound = wx.createInnerAudioContext();
                    sound.src = url;
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
        onSp_tippy_Click(e) {
            e.stopPropagation();
            this.playsound("click.ogg");
            var data = this._data;
            if (data) {
                console.log("跳转游戏： " + data.title);
                if (Laya.Browser.onMiniGame) {
                    WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                        AL_tippy_D.aldSendReport_tippy_AdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            gameuiContro.cebian.move(1);
                            AL_tippy_D.aldSendReportAd_tippy_ClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQGMiniGame) {
                    OPPOAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQQMiniGame) {
                    QQMiniGameAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        gameuiContro.cebian.move(1);
                        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
            }
        }
        static onSpClick(call) {
            if (!SingleAd_tippy_View.datas) {
                return;
            }
            else if (SingleAd_tippy_View.datas == 1) {
                setTimeout(() => {
                    SingleAd_tippy_View.onSpClick(call);
                }, 500);
                return;
            }
            var data = SingleAd_tippy_View.datas[Math.floor(Math.random() * SingleAd_tippy_View.datas.length)];
            if (data) {
                console.log("跳转游戏： " + data.title);
                WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                    console.log("跳转成功");
                    Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                    AL_tippy_D.aldSendReport_tippy_AdClickSuccess(data);
                }, (res) => {
                    console.log("跳转失败");
                    Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                    if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                        call();
                        console.log("用户取消跳转");
                        AL_tippy_D.aldSendReportAd_tippy_ClickFail(data);
                    }
                }, (res) => {
                    console.log("跳转完成");
                });
            }
        }
    }

    class Net_tippy_Config {
    }
    Net_tippy_Config.st_tippy_ate = 4;
    Net_tippy_Config.game_tippy_id = 57;
    Net_tippy_Config.server_tippy_Url = "";
    Net_tippy_Config.Lo_tippy_gin = "";
    Net_tippy_Config.Save_tippy_GameData = "";
    Net_tippy_Config.Get_tippy_User = "";
    Net_tippy_Config.Ip_tippy_Block = "";
    Net_tippy_Config.version = "1.0.0";

    class Aes_tippy_Tools {
        static _tippy_encrypt(str) {
            return str;
        }
        static _tippy_decrypt(str) {
            return str;
        }
    }
    Aes_tippy_Tools.KE_tippy_Y = 'b#63fFJ6AvkK3YT*';
    Aes_tippy_Tools.I_tippy_V = 'J$f4DU%sNL73M&Go';

    class request_tippy_Data {
        constructor() {
            this.meth = "post";
            this.url = "";
            this.onSuccess = null;
            this.onFail = null;
            this.data = {};
        }
    }
    class Http_tippy_Unit {
        static re_tippy_quest(req) {
            if (req.url.indexOf("https://") > -1 ||
                req.url.indexOf("http://") > -1) {
                req.url = req.url;
            }
            else {
                req.url = Net_tippy_Config.server_tippy_Url + req.url;
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
            xhr.once(Laya.Event.COMPLETE, Http_tippy_Unit, completeFunc);
            xhr.once(Laya.Event.ERROR, Http_tippy_Unit, errorFunc);
            let dataStr = JSON.stringify(req.data);
            if (Laya.Browser.onMiniGame || AppConfig.onTTMiniGame) {
                req.data.code = Us_tippy_er.co_tippy_de;
            }
            else if (Laya.Browser.onQGMiniGame) {
                req.data.code = Us_tippy_er.co_tippy_de;
            }
            else if (Laya.Browser.onQQMiniGame) {
                req.data.code = Us_tippy_er.co_tippy_de;
            }
            else {
                req.data.code = Us_tippy_er.co_tippy_de;
            }
            var time = "time=" + String(Date.now());
            var header = [
                "Content-Type", "application/json",
                "state", Net_tippy_Config.st_tippy_ate,
                "gameid", Net_tippy_Config.game_tippy_id,
                "sign", Aes_tippy_Tools._tippy_encrypt(time),
            ];
            if (Us_tippy_er.tok_tippy_en) {
                header.push("token");
                header.push(Us_tippy_er.tok_tippy_en);
            }
            xhr.send(req.url, JSON.stringify(req.data), req.meth, "json", header);
        }
        static lo_tippy_gin(onSuccess, onFail) {
            var req = new request_tippy_Data();
            req.url = Net_tippy_Config.Lo_tippy_gin;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            Http_tippy_Unit.re_tippy_quest(req);
        }
        static saveGame_tippy_Data(gameData, onSuccess, onFail) {
            var req = new request_tippy_Data();
            req.url = Net_tippy_Config.Save_tippy_GameData;
            req.data.gameData = gameData;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            Http_tippy_Unit.re_tippy_quest(req);
        }
        static get_tippy_GameData(onSuccess, onFail) {
            var req = new request_tippy_Data();
            req.url = Net_tippy_Config.Get_tippy_User;
            req.onSuccess = onSuccess;
            req.onFail = onFail;
            Http_tippy_Unit.re_tippy_quest(req);
        }
        static GetIp_tippy_Block(onSuccess, onFail) {
            if (-1 != Net_tippy_Config.game_tippy_id) {
                var req = new request_tippy_Data();
                req.url = Net_tippy_Config.Ip_tippy_Block;
                req.onSuccess = onSuccess;
                req.onFail = onFail;
                Http_tippy_Unit.re_tippy_quest(req);
            }
        }
    }

    class AppSwitch_tippy_Data {
        constructor() {
            this.version = "1.0.0";
            this.share_next = 1;
            this.share_level = 3;
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
            this.wxWuDianBanners = new Array();
            this.btnMoveTimer = 1;
            this.bannerMoveTimer = 0.5;
            this.bannerFreshTimer = 200;
            this.bannerCreateFailNum = 3;
            this.bannerTodayBannerMax = 10;
            this.adSwitch = 1;
            this.wudianSceneList = new Array();
        }
        get wudianTimeAvaliable() {
            return this.wudianAvailableTime[new Date().getHours()] == 1;
        }
    }
    class AppSwitch_tippy_Config {
        constructor() {
            this._da_tippy_ta = new Array();
        }
        static get_tippy_Instance() {
            if (null == AppSwitch_tippy_Config._ins_tippy_tance) {
                AppSwitch_tippy_Config._ins_tippy_tance = AppSwitch_tippy_Config.lo_tippy_ad();
            }
            return AppSwitch_tippy_Config._ins_tippy_tance;
        }
        static lo_tippy_ad() {
            var config = new AppSwitch_tippy_Config();
            var json = Laya.loader.getRes(AppConfig.ResServer + "/json/appswitch.json");
            if (json) {
                for (var i = 0; i < json.length; ++i) {
                    var row = json[i];
                    var rowData = new AppSwitch_tippy_Data();
                    rowData.version = String(row["version"]);
                    rowData.share_next = Number(row["share_next"]);
                    rowData.share_level = Number(row["share_level"]);
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
                    rowData.adSwitch = Number(row["adSwitch"]);
                    var wudianSceneList = row["wudianSceneList"];
                    if (null != wudianSceneList) {
                        for (var j = 0; j < wudianSceneList.length; ++j) {
                            var wudianSceneValue = Number(wudianSceneList[j]);
                            rowData.wudianSceneList.push(wudianSceneValue);
                        }
                    }
                    config._da_tippy_ta.push(rowData);
                }
                return config;
            }
            else {
                config._da_tippy_ta.push(new AppSwitch_tippy_Data());
                return config;
            }
        }
        getAppSwitchData() {
            return this._da_tippy_ta[0];
        }
    }

    class Wudian_tippy_Mgr {
        static IpBlockFlag() {
            return Wudian_tippy_Mgr._ipBlockFlag;
        }
        static UpdateIpBlockState() {
            Http_tippy_Unit.GetIp_tippy_Block(function (res) {
                console.log("调用IpBlock接口成功,结果为:", res);
                Wudian_tippy_Mgr._ipBlockFlag = res.code;
            }, null);
        }
        static GetIpBlocked() {
            return Wudian_tippy_Mgr._ipBlockFlag == 0;
        }
        static GetEntryScene() {
            return WXAPI.getLaunchOptionsSync().scene == 1006;
        }
        static IsSwitchOpen() {
            let mainSwitch = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().wudian == 1;
            let isOpenTime = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().wudianTimeAvaliable;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "打开时间", isOpenTime);
            return mainSwitch && isOpenTime;
        }
        static get WudianFlag() {
            let mainSwitch = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().wudian == 1;
            let launchScene = QQMiniGameAPI.getLaunchOptionsSync().scene;
            let noEnterBySearch = true;
            var wudianSceneList = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().wudianSceneList;
            for (var i = 0; i < wudianSceneList.length; ++i) {
                var wudianSceneValue = wudianSceneList[i];
                if (launchScene == wudianSceneValue) {
                    noEnterBySearch = false;
                }
            }
            let isOpenTime = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().wudianTimeAvaliable;
            let ipnotBlock = this._ipBlockFlag == 0;
            let version = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().version == Net_tippy_Config.version;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽", ipnotBlock, "打开时间", isOpenTime, "版本号:", version);
            console.log("----------------------------------------- version:" + AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().version);
            return mainSwitch && noEnterBySearch && ipnotBlock && isOpenTime && version;
        }
        static get NoTimeWudianFlag() {
            let mainSwitch = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().wudian == 1;
            let noEnterBySearch = WXAPI.getLaunchOptionsSync().scene != 1006;
            let ipnotBlock = Wudian_tippy_Mgr._ipBlockFlag == 0;
            console.log("误点Flag状态: ", "总开关:", mainSwitch, "场景进入", noEnterBySearch, "IP未被屏蔽");
            return mainSwitch && noEnterBySearch && ipnotBlock;
        }
    }
    Wudian_tippy_Mgr._ipBlockFlag = -1;

    class fuhuolayer extends Laya.Script {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
            this.haveopen = false;
            this.waking = false;
        }
        onAwake() {
            this.nodes = this.owner;
            console.log("复活layer");
            this.getchild();
            this.Mainscenesp = Game_tippy_Mgr.mainsp;
            this.uiconr = this.Mainscenesp.gameuicontrosp;
        }
        wake() {
            if (this.waking) {
                return;
            }
            this.waking = true;
            setTimeout(() => {
                setTimeout(() => {
                    this.haveopen = true;
                    this.waking = false;
                    this.down.bottom = 350;
                }, 500);
            }, 500);
        }
        getchild() {
            this.down = this.owner.getChildByName("down");
            this.btnfuhuo = this.down.getChildByName("btnfuhuo");
            this.btngiveup = this.down.getChildByName("btngiveup");
            console.log("复活加载完");
            this.movepos();
        }
        movepos() {
            let addrange = Laya.stage.height - 1334;
        }
        onEnable() {
            Event_tippy_Mgr.ins_tippy_tance.regEvemt(Event_tippy_Def.RewardVideoSuccess, this, this.onRewardVideoSuccess);
            Event_tippy_Mgr.ins_tippy_tance.regEvemt(Event_tippy_Def.RewardVideoFail, this, this.onRewardVideoFail);
        }
        onDisable() {
            Event_tippy_Mgr.ins_tippy_tance.removeEvent(Event_tippy_Def.RewardVideoSuccess, this, this.onRewardVideoSuccess);
            Event_tippy_Mgr.ins_tippy_tance.removeEvent(Event_tippy_Def.RewardVideoFail, this, this.onRewardVideoFail);
        }
        onRewardVideoFail() {
        }
        onRewardVideoSuccess() {
            fuhuolayer.isend = false;
            var self = this;
            Laya.Tween.to(self.nodes, { alpha: 0 }, 500, null, Laya.Handler.create(self, () => {
                self.nodes.visible = false;
                self.Mainscenesp.fuhuo();
            }));
        }
        reflash() {
            if (Wudian_tippy_Mgr.WudianFlag) {
                this.down.bottom = 0;
                this.haveopen = false;
            }
            else {
                this.down.bottom = 350;
            }
            fuhuolayer.isend = true;
            this.nodes.visible = true;
            this.nodes.alpha = 1;
            this.setbtn();
            if (!this.uiconr) {
                this.uiconr = this.Mainscenesp.gameuicontrosp;
            }
            try {
            }
            catch (error) {
            }
        }
        setbtn() {
            if (!this.btnfuhuo) {
                this.getchild();
            }
            movefunc2d.btnmove(this.btnfuhuo, 100, () => {
                this.Mainscenesp.playsound("click.ogg");
                movefunc2d.btnsave(this.btnfuhuo, 3000);
                var self = this;
                if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                    NativeCallback.CallNativeFunc("showRewardVideo");
                    Sound_tippy_Mgr.instance.stop_tippy_BGM();
                }
                else {
                    fuhuolayer.isend = false;
                    Laya.Tween.to(self.nodes, { alpha: 0 }, 500, null, Laya.Handler.create(self, () => {
                        self.nodes.visible = false;
                        self.Mainscenesp.fuhuo();
                    }));
                }
            }, false);
            movefunc2d.btnmove(this.btngiveup, 100, () => {
                this.Mainscenesp.playsound("click.ogg");
                movefunc2d.btnsave(this.btngiveup);
                if (Wudian_tippy_Mgr.WudianFlag) {
                    if (!this.haveopen) {
                        this.wake();
                        return;
                    }
                }
                try {
                }
                catch (error) {
                }
                this.Mainscenesp.boxmove(1, () => {
                    this.Mainscenesp.initgame(false, 3);
                    this.nodes.visible = false;
                });
            }, false);
        }
    }
    fuhuolayer.isend = false;

    class endlayer extends Laya.Script {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
            this.iswin = false;
            this.clicked = false;
            this.haveopen = false;
            this.waking = false;
        }
        onAwake() {
            this.gameUI = Game_tippy_Mgr.mainsp;
            this.uiconr = this.gameUI.gameuicontrosp;
            this.nodes = this.owner;
            this.getchild();
            this.setbtn();
        }
        onStart() {
            this.btndouw.visible = true;
        }
        btnsave(time) {
            if (this.clicked) {
                return;
            }
            let t = 600;
            if (time) {
                t = time;
            }
            this.clicked = true;
            setTimeout(() => {
                this.clicked = false;
            }, t);
        }
        wake() {
        }
        setbtn() {
            movefunc2d.btnmove(this.btnconti, 100, () => {
                this.gameUI.playsound("click.ogg");
                this.btnsave();
                fuhuolayer.isend = false;
                this.gameUI.box.once(Laya.Event.MOUSE_DOWN, this, (e) => {
                    this.gameUI.startgame();
                });
                if (!this.uiconr) {
                    this.uiconr = this.gameUI.gameuicontrosp;
                }
                try {
                }
                catch (error) {
                }
                let c = this.gameUI.box.getChildAt(0);
                c.visible = true;
                this.gameUI.box.alpha = 1;
                Game_tippy_Mgr.mainsp.addlayer();
                Laya.Tween.to(this.nodes, { alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
                    this.nodes.visible = false;
                }));
            }, false, true);
            movefunc2d.btnmove(this.btnback, 100, () => {
                this.gameUI.playsound("click.ogg");
                this.btnsave();
                fuhuolayer.isend = false;
                this.gameUI.boxmove(1, () => {
                    this.nodes.visible = false;
                    if (!this.uiconr) {
                        this.uiconr = this.gameUI.gameuicontrosp;
                    }
                    if (window['nulad']) {
                        this.uiconr.mainlayersp.reflash();
                        return;
                    }
                    setTimeout(() => {
                        this.gameUI.boxmove(2, () => {
                            let c = this.gameUI.box.getChildAt(0);
                            c.visible = true;
                            this.gameUI.box.alpha = 1;
                        });
                    }, 100);
                });
            }, false, true);
            movefunc2d.btnmove(this.btndouw, 100, () => {
                console.log("双倍");
                this.gameUI.playsound("click.ogg");
                this.btnsave(3000);
                var self = this;
                if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
                    NativeCallback.CallNativeFunc("showRewardVideo");
                    Sound_tippy_Mgr.instance.stop_tippy_BGM();
                }
                else {
                    endlayer.nexttime++;
                    Game_tippy_Mgr.mainsp.addlayer();
                    self.zuanshifly();
                    let add = Number(self.addzuan.value);
                    if (!self.uiconr) {
                        self.uiconr = self.gameUI.gameuicontrosp;
                    }
                    let save = Number(Laya.LocalStorage.getItem("allzuan")) + add;
                    self.addzuan.value = add * 2 + '';
                    self.allzuan.value = save + '';
                    Laya.LocalStorage.setItem("allzuan", save + '');
                    self.btndouw.visible = false;
                }
            }, false, true);
        }
        zuanshifly() {
            let rangex = 40;
            let rangey = 40;
            for (let index = 0; index < 10; index++) {
                let endx = 180 + (Math.random() * rangex - rangex / 2);
                let createx = this.btndouw.x + (Math.random() * rangex - rangex / 2);
                let createy = this.btndouw.y + (Math.random() * rangey - rangey / 2);
                var ape = new Laya.Sprite();
                ape.pos(createx, createy);
                ape.scale(0.5, 0.5);
                this.createlayer.addChild(ape);
                ape.loadImage("subRes/gamezuanshi.png");
                ape.alpha = 0;
                movefunc2d.fadeto(1, ape, 200);
                Laya.Tween.to(ape, { x: endx, y: 65 }, 1000, Laya.Ease.circOut, Laya.Handler.create(this, (res) => {
                    movefunc2d.fadeto(0, res, 200, () => {
                        res.destroy();
                    });
                }, [ape]));
            }
        }
        getchild() {
            this.title = this.nodes.getChildByName("title");
            this.level = this.nodes.getChildByName("level");
            this.levelNum = this.level.getChildByName("levelText");
            this.btndown = this.nodes.getChildByName("down");
            this.btndouw = this.btndown.getChildByName("btndouzuan");
            this.btnconti = this.btndown.getChildByName("btncontinue");
            this.btnback = this.btndown.getChildByName("btnbacktomain");
            this.allzuan = this.nodes.getChildByName("allzuan").getChildAt(0);
            this.addzuanbg = this.nodes.getChildByName("addzuan");
            this.addzuan = this.addzuanbg.getChildAt(1);
            this.createlayer = this.nodes.getChildByName("createlayer");
            this.movepos();
        }
        movepos() {
        }
        onEnable() {
            Event_tippy_Mgr.ins_tippy_tance.regEvemt(Event_tippy_Def.RewardVideoSuccess, this, this.onRewardVideoSuccess);
            Event_tippy_Mgr.ins_tippy_tance.regEvemt(Event_tippy_Def.RewardVideoFail, this, this.onRewardVideoFail);
        }
        onDisable() {
            Event_tippy_Mgr.ins_tippy_tance.removeEvent(Event_tippy_Def.RewardVideoSuccess, this, this.onRewardVideoSuccess);
            Event_tippy_Mgr.ins_tippy_tance.removeEvent(Event_tippy_Def.RewardVideoFail, this, this.onRewardVideoFail);
        }
        onRewardVideoFail() {
        }
        onRewardVideoSuccess() {
            endlayer.nexttime++;
            Game_tippy_Mgr.mainsp.addlayer();
            this.zuanshifly();
            let add = Number(this.addzuan.value);
            if (!this.uiconr) {
                this.uiconr = this.gameUI.gameuicontrosp;
            }
            let save = Number(Laya.LocalStorage.getItem("allzuan")) + add;
            this.addzuan.value = add * 2 + '';
            this.allzuan.value = save + '';
            Laya.LocalStorage.setItem("allzuan", save + '');
            this.btndouw.visible = false;
        }
        reflash(iswin, leave, addzuan, justre, b) {
            if (window['nulad']) {
                justre = true;
            }
            this.gameUI.fuhuochance = 1;
            this.iswin = iswin;
            this.levelNum.value = leave;
            if (!this.uiconr) {
                this.uiconr = this.gameUI.gameuicontrosp;
            }
            try {
            }
            catch (error) {
            }
            if (Wudian_tippy_Mgr.WudianFlag) {
                this.btndown.bottom = 0;
                this.haveopen = false;
            }
            else {
                this.btndown.bottom = 300;
            }
            if (iswin) {
                this.gameUI.addboxlayer();
                this.levelNum.value = Laya.LocalStorage.getItem("leave");
                this.addzuanbg.visible = true;
                this.addzuan.value = addzuan + '';
                if (!this.uiconr) {
                    this.uiconr = this.gameUI.gameuicontrosp;
                }
                let savezuan = Number(addzuan) + Number(Laya.LocalStorage.getItem("allzuan"));
                this.allzuan.value = savezuan + '';
                Laya.LocalStorage.setItem("allzuan", savezuan + '');
                fuhuolayer.isend = false;
                this.btndouw.visible = true;
            }
            else {
                this.gameUI.addboxlayer();
                this.levelNum.value = Laya.LocalStorage.getItem("leave");
                fuhuolayer.isend = true;
                this.btndouw.visible = false;
                this.addzuanbg.visible = false;
                this.allzuan.value = Laya.LocalStorage.getItem("allzuan");
                let fin = 0;
                let r = Math.random() * 100;
                if (r <= fin) {
                    SingleAd_tippy_View.onSpClick(() => {
                    });
                }
                console.log("失败打开！！！！");
            }
            if (!justre) {
                if (b) {
                    fuhuolayer.isend = true;
                }
                if (this.uiconr) {
                    this.uiconr = this.gameUI.gameuicontrosp;
                }
                return;
            }
            this.nodes.alpha = 1;
            this.nodes.visible = true;
        }
        show() {
            console.log("从更多过来打开!!!");
            try {
            }
            catch (error) {
            }
        }
        getsrcchangepic(src, tar, font) {
            if (font) {
                this.levelNum.graphics.clear();
                this.levelNum.skin = src;
            }
            else {
                var textureUrl = src;
                var texture = Laya.loader.getRes(textureUrl);
                tar.graphics.clear();
                tar.loadImage(textureUrl);
            }
        }
    }
    endlayer.nexttime = 0;

    var ViewDef;
    (function (ViewDef) {
        ViewDef["None"] = "";
        ViewDef["TipsView"] = "View/TipsView.json";
        ViewDef["ClickGetPrize"] = "View/ClickGetPrize.json";
        ViewDef["wudian"] = "View/wudian.json";
    })(ViewDef || (ViewDef = {}));
    class View_tippy_Mgr {
        constructor() {
            this._views = {};
        }
        open_tippy_View(viewType, data, oncomplate) {
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
        close_tippy_View(viewType) {
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
        Show_tippy_View(viewType) {
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
        hide_tippy_View(viewType) {
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
        get_tippy_View(viewType) {
            return this._views[viewType];
        }
        show_tippy_Tips(msg) {
            this.open_tippy_View(ViewDef.TipsView, msg);
        }
    }
    View_tippy_Mgr.insta_tippy_nce = new View_tippy_Mgr();

    class View_tippy_Base extends Laya.Script {
        constructor() {
            super(...arguments);
            this.onCloseEvent = null;
            this.onOpenEvent = null;
            this._viewBase = true;
            this._viewDef = ViewDef.None;
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
            Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.Game__tippy_OnViewOpen, { view: this._viewDef });
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
            View_tippy_Mgr.insta_tippy_nce.close_tippy_View(this._viewDef);
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
            Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.Game__tippy_OnViewClose, { view: this._viewDef });
            if (this.onCloseEvent) {
                this.onCloseEvent();
            }
        }
    }

    class MainLayer extends View_tippy_Base {
        constructor() {
            super();
            this.clicked = false;
            this.allzuann = 0;
        }
        onAwake() {
            console.log("这里");
            this.gameUI = Game_tippy_Mgr.mainsp;
            this.uiconr = this.gameUI.gameuicontrosp;
            console.log("不是");
            this.nodes = this.owner;
            this.getchild();
            this.reflash();
            this.setbtn();
            this.setkongbai();
            this.settalpha();
            this.test();
        }
        onStart() {
        }
        test() {
            if (window['nulad']) {
                this.btnmorefun.visible = false;
            }
            else {
                this.btnmorefun.visible = true;
            }
            setTimeout(() => {
                this.test();
            }, 300);
        }
        settalpha() {
            if (this.gameUI) {
                if (this.gameUI.blackbox) {
                    if (this.gameUI.loadread) {
                        console.log("准备释放");
                        setTimeout(() => {
                        }, 1500);
                    }
                    else {
                        setTimeout(() => {
                            this.settalpha();
                        }, 100);
                    }
                }
                else {
                    setTimeout(() => {
                        this.settalpha();
                    }, 100);
                }
            }
            else {
                this.gameUI = Game_tippy_Mgr.mainsp;
                setTimeout(() => {
                    this.settalpha();
                }, 100);
            }
        }
        btnsave(time) {
            if (this.clicked) {
                return;
            }
            let t = 600;
            if (time) {
                t = time;
            }
            this.clicked = true;
            setTimeout(() => {
                this.clicked = false;
            }, t);
        }
        reflash() {
            this.nodes.visible = true;
            MainLayer.onmain = true;
            let a = Laya.LocalStorage.getItem("allzuan");
            if (a) {
                console.log("之前有钻石记录");
                this.allzuann = Number(a);
                this.allzuan.value = a + '';
            }
            else {
                console.log("没有钻石记录？？？");
                this.allzuan.value = 0 + '';
            }
            let b = Laya.LocalStorage.getItem("leave");
            if (b) {
                console.log("有关卡记录");
                this.guan.value = b + '';
            }
            else {
                this.guan.value = 1 + '';
            }
            setTimeout(() => {
                this.gameUI.box.alpha = 0;
                if (!this.uiconr) {
                    this.uiconr = this.gameUI.gameuicontrosp;
                }
                this.uiconr.gameUI.alpha = 0;
                try {
                }
                catch (error) {
                }
                let fin = 0;
                let r = Math.random() * 100;
                console.log(r, fin, "概率！！");
                if (r <= fin) {
                    console.log("概率到，弹出");
                    SingleAd_tippy_View.onSpClick(() => {
                        this.uiconr.cebianlayer.btnopen.alpha = 0;
                        this.uiconr.cebianlayer.spr.alpha = 1;
                        this.uiconr.cebianlayer.btnback.visible = true;
                        this.uiconr.cebianlayer.move(1);
                    });
                }
            }, 200);
        }
        setkongbai() {
            console.log(this.nodes.hitArea, "趋势与vvv");
            this.nodes.on(Laya.Event.CLICK, this, (e) => {
                e.stopPropagation();
                let fin = 0;
                let r = Math.random() * 100;
                console.log(r, fin, "空白概率！！");
                if (r <= fin) {
                    console.log("概率到，弹出");
                    SingleAd_tippy_View.onSpClick(() => {
                        this.uiconr.cebianlayer.btnopen.alpha = 0;
                        this.uiconr.cebianlayer.spr.alpha = 1;
                        this.uiconr.cebianlayer.btnback.visible = true;
                        this.uiconr.cebianlayer.move(1);
                    });
                }
            });
        }
        btnmove() {
        }
        setbtn() {
            this.btnplay.hitTestPrior = true;
            this.btnmorefun.hitTestPrior = true;
            this.btnmove();
            this.btnplay.on(Laya.Event.CLICK, this.btnplay, (e) => {
                this.gameUI.playsound("click.ogg");
                e.stopPropagation();
                this.btnsave();
                this.gameUI.boxmove(1, () => {
                    this.nodes.visible = false;
                    this.gameUI.box.alpha = this.gameUI.boxalpha;
                    Game_tippy_Mgr.mainsp.addlayer();
                    this.gameUI.startgame();
                }, 400);
            });
            this.btnmorefun.on(Laya.Event.CLICK, this.btnmorefun, (e) => {
                e.stopPropagation();
                this.gameUI.playsound("click.ogg");
                this.btnsave();
                if (!this.uiconr) {
                    this.uiconr = this.gameUI.gameuicontrosp;
                }
                this.uiconr.adlayersp.reflash();
            });
        }
        getchild() {
            this.allzuan = this.nodes.getChildByName("labbg").getChildAt(0);
            this.btnmorefun = this.nodes.getChildAt(2).getChildByName("btnmoregame");
            this.btnplay = this.nodes.getChildAt(2).getChildByName("btngamestart");
            this.guan = this.nodes.getChildByName("level").getChildByName("levelText");
            this.box = this.nodes.getChildAt(0);
            console.log("主页加载完");
        }
        onEnable() {
        }
        onDisable() {
        }
    }
    MainLayer.onmain = false;

    class gameuiContro extends Laya.Script {
        constructor() {
            super();
            this.intType = 1000;
            this.numType = 1000;
            this.strType = "hello laya";
            this.boolType = true;
            this.zuanshinum = 0;
        }
        onEnable() {
        }
        onDisable() {
        }
        onAwake() {
            this.getgameuichild();
        }
        getgameuichild() {
            gameuiContro.manager = this;
            console.log("场景控制", this.owner);
            this.gameUI = this.owner.getChildAt(0).getChildByName("GameUI");
            console.log("gameUI");
            this.zuanshilab = this.gameUI.getChildAt(0).getChildAt(1).getChildAt(1);
            this.jindutiao = this.gameUI.getChildAt(0).getChildAt(2).getChildAt(0);
            this.setduiqi(this.gameUI, true);
            this.setduiqi(this.owner.getChildAt(0).getChildByName("Mainscene"), true);
            this.setduiqi(this.owner.getChildAt(0).getChildByName("fuhuolayer"), true);
            this.setduiqi(this.owner.getChildAt(0).getChildByName("endlayer"), true);
            this.loadinglayer = this.owner.getChildAt(0).getChildByName("loadinglayer");
            this.setduiqi(this.loadinglayer, true);
            this.mainlayersp = this.owner.getChildAt(0).getChildByName("Mainscene").addComponent(MainLayer);
            this.fuhuolayersp = this.owner.getChildAt(0).getChildByName("fuhuolayer").addComponent(fuhuolayer);
            this.endlayersp = this.owner.getChildAt(0).getChildByName("endlayer").addComponent(endlayer);
        }
        showcebianbanner() {
            console.log("展示");
            if (window['nulad']) {
                return;
            }
        }
        unshowcebianbanner() {
            console.log("影藏");
            if (window['nulad']) {
                return;
            }
        }
        setduiqi(tar, height, banner) {
            if (!tar) {
                return;
            }
            if (height) {
                tar.height = Laya.stage.height;
            }
            else {
                tar.y = Laya.stage.height - tar.height;
                console.log(tar.y);
                if (banner) {
                    tar.y = Laya.stage.height - tar.height - 60;
                }
            }
        }
        nextleave(leave, allcube) {
            this.allcube = allcube;
            this.zuanshinum = 0;
            this.zuanshilab.value = this.zuanshinum + '';
            this.setjindu(0);
        }
        addzuanshi() {
            this.zuanshinum += 1;
            this.zuanshilab.value = this.zuanshinum + '';
            console.log("钻石数量", this.zuanshinum);
        }
        setjindu(now) {
            let bili = now / this.allcube;
            this.jindutiao.scaleX = bili;
        }
        backtoMainscene() {
        }
    }

    class CachedWXBannerAd {
        static preloadBanner() {
            var wxWuDianBanners = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().wxWuDianBanners;
            var bannerTodayBannerMax = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().bannerTodayBannerMax;
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
                if (Laya.Browser.onQQMiniGame) {
                    preLoadBanners.length = 1;
                }
                console.log("进入");
                if (counter >= preLoadBanners.length) {
                    console.log("超数");
                    Laya.timer.clearAll(CachedWXBannerAd._preLoopObj);
                    return;
                }
                var bannerid = preLoadBanners[counter];
                var banner = CachedWXBannerAd._bannerCache[bannerid];
                if (null == banner) {
                    console.log("有敌意");
                    banner = CachedWXBannerAd.create(bannerid);
                    if (null != banner) {
                        console.log("有敌意2");
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
            if (Laya.Browser.onQQMiniGame) {
                var sysInfo = Laya.Browser.window["qq"].getSystemInfoSync();
                var sw = sysInfo.screenWidth;
                var sh = sysInfo.screenHeight;
                var banner = Laya.Browser.window["qq"].createBannerAd({
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
                        setTimeout(() => {
                            CachedWXBannerAd.show();
                        }, 200);
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
            var wuDianBanners = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().wxWuDianBanners;
            var bannerid = wuDianBanners[Math.floor(Math.random() * wuDianBanners.length)];
            var banner = CachedWXBannerAd.getBanner(bannerid);
            if (banner) {
                CachedWXBannerAd._curBanner = banner;
                var sysInfo = Laya.Browser.window["qq"].getSystemInfoSync();
                var sw = sysInfo.screenWidth;
                var sh = sysInfo.screenHeight;
                CachedWXBannerAd._curBanner.style.top = (Laya.stage.height - 240) / Laya.stage.height * sh;
                CachedWXBannerAd._curBanner.show();
                console.log("CachedWXBanner 广告显示 bannerid ： ", bannerid);
            }
            var time = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().bannerFreshTimer;
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

    class Game_tippy_Mgr extends Laya.Script {
        constructor() {
            super();
            this.fuhuochance = 1;
            this.havestart = false;
            this.havedid = false;
            this.loadread = false;
            this.bili = { x: 0, y: 0 };
            this.stop = false;
            this.move = false;
            this.needre = false;
            this.boxalpha = 1;
            this.iswin = false;
            Game_tippy_Mgr._ins_tippy_tance = this;
        }
        static getI_tippy_nstance() { return Game_tippy_Mgr._ins_tippy_tance; }
        onAwake() {
            Game_tippy_Mgr.mainsp = this;
        }
        onStart() {
            this.preCreate_tippy_Game();
        }
        preCreate_tippy_Game() {
            if (Laya.Browser.onQQMiniGame) {
                this.UIlayer = Laya.stage.getChildByName("root");
            }
            else {
                this.UIlayer = Laya.stage.getChildAt(0);
            }
            console.log(Laya.Browser.width, Laya.Browser.height, "物理");
            console.log(Laya.Browser.clientWidth, Laya.Browser.clientHeight, "像素");
            console.log(Laya.stage.height, Laya.stage.width);
            this.playmusic("bgmusic.ogg");
            window['nulad'] = true;
            this.stratgame();
            GameSwitchConfig.getInstance().SetBannerActive();
        }
        playmusic(name) {
            var url = "subRes/music/" + name;
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
        playsound(name) {
            var url = "subRes/music/" + name;
            if (Laya.Browser.onMiniGame) {
                var sound = Laya.Pool.getItem(name);
                if (sound == null) {
                    sound = wx.createInnerAudioContext();
                    sound.src = url;
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
        stratgame() {
            if (this.havedid) {
                this.initgame(false, 1);
                return;
            }
            this.havedid = true;
            console.log("开始场景加载");
            Laya.Scene3D.load("subRes/LayaScene_MainScene/Conventional/MainScene.ls", Laya.Handler.create(this, (scene) => {
                console.log("场景ok");
                this.gamescene = scene;
                this.ligh = this.gamescene.getChildAt(2);
                this.ligh.shadowMode = Laya.ShadowMode.Hard;
                this.ligh.shadowDistance = 20;
                this.ligh.shadowResolution = 2400;
                this.createsp = this.gamescene.addComponent(createcube);
                console.log("加载完成");
                Laya.stage.addChildAt(scene, 0);
                this.getchilds();
                this.setcontro();
                this.initgame(false, 1);
                this.loadread = true;
                movefunc2d.fadeto(0, this.gameuicontrosp.loadinglayer, 500, () => {
                    this.gameuicontrosp.loadinglayer.visible = false;
                });
            }));
        }
        onLateUpdate() {
        }
        getchilds() {
            console.log("开始加载");
            this.gameuicontrosp = this.UIlayer.addComponent(gameuiContro);
            this.player = this.gamescene.getChildByName("Player");
            this.playersp = this.player.addComponent(Player);
            this.Maincam = this.gamescene.getChildByName("Main Camera");
            this.Maincam.addComponent(Camaermove);
            this.touchplace = this.UIlayer.getChildAt(0).getChildByName("ctron");
            this.cir = this.touchplace.getChildAt(0);
            this.bian = this.touchplace.getChildAt(1);
            this.box = this.UIlayer.getChildAt(0).getChildByName("box");
            this.blackbox = this.UIlayer.getChildAt(0).getChildByName("blackbox");
            console.log("gamemgr加载完");
            this.box.alpha = 0;
        }
        addlayer() {
            if (Wudian_tippy_Mgr.WudianFlag) {
                CachedWXBannerAd.hide();
                console.log("打开狂点");
                let data = {};
                data.Complete = function () {
                    console.log("狂点按钮结束");
                };
                data.PrizeCount = 30;
                setTimeout(() => {
                    View_tippy_Mgr.insta_tippy_nce.open_tippy_View(ViewDef.ClickGetPrize, data);
                }, 100);
            }
        }
        addboxlayer() {
            if (Wudian_tippy_Mgr.WudianFlag) {
                let data = {};
                data.Complete = function () {
                    console.log("狂点盒子结束");
                };
                data.PrizeCount = 30;
                View_tippy_Mgr.insta_tippy_nce.open_tippy_View(ViewDef.wudian, data);
            }
        }
        setcontro() {
            this.UIlayer.getChildAt(0).on(Laya.Event.MOUSE_DOWN, this, (e) => {
                if (!this.havestart) {
                    return;
                }
                this.touchplace.x = e.stageX;
                this.touchplace.y = e.stageY;
                this.readtomove = true;
            });
            this.UIlayer.getChildAt(0).on(Laya.Event.MOUSE_MOVE, this, (e) => {
                if (!this.havestart) {
                    return;
                }
                if (!this.readtomove) {
                    return;
                }
                this.countrota(e.stageX, e.stageY, this.touchplace.x, this.touchplace.y);
            });
            this.UIlayer.getChildAt(0).on(Laya.Event.MOUSE_UP, this, () => {
                this.mouseup();
                this.touchplace.x = 375;
                this.touchplace.y = 1000;
            });
        }
        mouseup(not) {
            this.readtomove = false;
            this.move = false;
            this.cir.x = this.touchplace.width / 2;
            this.cir.y = this.touchplace.height / 2;
            if (!not) {
                this.cubeback();
            }
            this.bian.rotation = 0;
            this.bili = { x: 0, y: 0 };
        }
        countrota(x, y, cx, cy, usebili) {
            let conxxx = this.conbox.parent;
            let dey = y - cy;
            let dex = x - cx;
            let lo = Math.pow(Math.pow(dey, 2) + Math.pow(dex, 2), 1 / 2);
            let readx = dex;
            let ready = dey;
            let maxb = 128;
            if (lo > maxb) {
                let bili = dey / dex;
                dey == dex * bili;
                let x = Math.pow(Math.pow(maxb, 2) / (1 + Math.pow(bili, 2)), 1 / 2);
                if (dex < 0) {
                    x = -Math.abs(x);
                }
                else {
                    x = Math.abs(x);
                }
                let y = x * bili;
                if (x == 0) {
                    if (dey > 0) {
                        y = maxb;
                    }
                    else {
                        y = -maxb;
                    }
                }
                readx = x;
                ready = y;
            }
            var angle = Math.atan2((dey), (dex));
            var theta = angle * (180 / Math.PI);
            if (!usebili) {
                this.cir.x = maxb + readx;
                this.cir.y = maxb + ready;
                this.bian.rotation = theta + 90;
            }
            let max = 10;
            let bilix = readx / maxb;
            let biliy = ready / maxb;
            if (bilix > 1) {
                bilix = 1;
            }
            else if (bilix < -1) {
                bilix = -1;
            }
            if (biliy > 1) {
                biliy = 1;
            }
            else if (biliy < -1) {
                biliy = -1;
            }
            if (usebili) {
                if (this.playersp.isrotate) {
                    return;
                }
                MoveFunc.rotateto(false, new Laya.Vector3(-this.bili.y * max, conxxx.transform.localRotationEulerY, this.bili.x * max), this.conbox.parent, 200, 20);
                this.stop = true;
                setTimeout(() => {
                    this.stop = false;
                }, 200);
            }
            else {
                this.bili.x = bilix;
                this.bili.y = biliy;
                if (this.playersp.isrotate) {
                    return;
                }
                if (this.stop) {
                    return;
                }
                let chaz = Math.abs(conxxx.transform.localRotationEulerZ - bilix * max);
                let chax = Math.abs(conxxx.transform.localRotationEulerX - -biliy * max);
                let speed = 0.2;
                let time;
                if (chaz > chax) {
                    time = chaz / speed;
                }
                else {
                    time = chax / speed;
                }
                if (time != 0) {
                    Laya.Tween.clearAll(conxxx.transform);
                }
                this.move = true;
            }
            if (Math.abs(conxxx.transform.localRotationEulerX) > max) {
                if (conxxx.transform.localRotationEulerX < 0) {
                    conxxx.transform.localRotationEulerX = -max;
                }
                else {
                    conxxx.transform.localRotationEulerX = max;
                }
            }
            if (Math.abs(conxxx.transform.localRotationEulerZ) > max) {
                if (conxxx.transform.localRotationEulerZ < 0) {
                    conxxx.transform.localRotationEulerZ = -max;
                }
                else {
                    conxxx.transform.localRotationEulerZ = max;
                }
            }
        }
        movecube() {
            if (!this.havestart) {
                return;
            }
            if (!this.readtomove) {
                return;
            }
            if (this.stop) {
                return;
            }
            if (this.playersp.isrotate) {
                return;
            }
            if (this.move) {
                let max = 10;
                let conxxx = this.conbox.parent;
                let chaz = conxxx.transform.localRotationEulerZ - this.bili.x * max;
                let chax = conxxx.transform.localRotationEulerX - -this.bili.y * max;
                let speed = 10;
                let addz = speed / Laya.timer.delta;
                let addx = speed / Laya.timer.delta;
                let cha = 0.2;
                if (chaz > cha) {
                    addz = -speed / Laya.timer.delta;
                }
                else if (chaz < -cha) {
                    addz = speed / Laya.timer.delta;
                }
                else {
                    addz = 0;
                }
                if (chax > cha) {
                    addx = -speed / Laya.timer.delta;
                }
                else if (chax < -cha) {
                    addx = speed / Laya.timer.delta;
                }
                else {
                    addx = 0;
                }
                if (conxxx.transform.localRotationEulerZ + addz > max) {
                    conxxx.transform.localRotationEulerZ = max;
                }
                else {
                    conxxx.transform.localRotationEulerZ += addz;
                }
                if (conxxx.transform.localRotationEulerX + addx > max) {
                    conxxx.transform.localRotationEulerX = max;
                }
                else {
                    conxxx.transform.localRotationEulerX += addx;
                }
            }
        }
        onUpdate() {
            this.movecube();
        }
        cubeback(backbox) {
            let conxxx = this.conbox.parent;
            if (!this.conbox) {
                return;
            }
            let dirx;
            let diry;
            if (conxxx.transform.localRotationEulerX < 0) {
                dirx = 1;
            }
            else {
                dirx = -1;
            }
            if (conxxx.transform.localRotationEulerZ < 0) {
                diry = 1;
            }
            else {
                diry = -1;
            }
            if (backbox) {
                let func = (dirx, diry) => {
                    backbox.transform.localRotationEulerX += dirx * 0.5;
                    backbox.transform.localRotationEulerZ += diry * 0.5;
                    let ok = false;
                    if (dirx > 0) {
                        if (backbox.transform.localRotationEulerX > 0) {
                            backbox.transform.localRotationEulerX = 0;
                            if (ok) {
                                Laya.timer.clear(this, func);
                            }
                            else {
                                ok = true;
                            }
                        }
                    }
                    else {
                        if (backbox.transform.localRotationEulerX < 0) {
                            backbox.transform.localRotationEulerX = 0;
                            if (ok) {
                                Laya.timer.clear(this, func);
                            }
                            else {
                                ok = true;
                            }
                        }
                    }
                    if (diry > 0) {
                        if (backbox.transform.localRotationEulerZ > 0) {
                            backbox.transform.localRotationEulerZ = 0;
                            if (ok) {
                                Laya.timer.clear(this, func);
                            }
                            else {
                                ok = true;
                            }
                        }
                    }
                    else {
                        if (backbox.transform.localRotationEulerZ < 0) {
                            backbox.transform.localRotationEulerZ = 0;
                            if (ok) {
                                Laya.timer.clear(this, func);
                            }
                            else {
                                ok = true;
                            }
                        }
                    }
                };
                Laya.timer.frameLoop(1, this, func, [dirx, diry]);
            }
            else {
                Laya.timer.frameLoop(1, this, this.backfunc, [dirx, diry]);
            }
        }
        backfunc(dirx, diry) {
            let conxxx = this.conbox.parent;
            conxxx.transform.localRotationEulerX += dirx * 0.5;
            conxxx.transform.localRotationEulerZ += diry * 0.5;
            let ok = false;
            if (dirx > 0) {
                if (conxxx.transform.localRotationEulerX > 0) {
                    conxxx.transform.localRotationEulerX = 0;
                    if (ok) {
                        Laya.timer.clear(this, this.backfunc);
                    }
                    else {
                        ok = true;
                    }
                }
            }
            else {
                if (conxxx.transform.localRotationEulerX < 0) {
                    conxxx.transform.localRotationEulerX = 0;
                    if (ok) {
                        Laya.timer.clear(this, this.backfunc);
                    }
                    else {
                        ok = true;
                    }
                }
            }
            if (diry > 0) {
                if (conxxx.transform.localRotationEulerZ > 0) {
                    conxxx.transform.localRotationEulerZ = 0;
                    if (ok) {
                        Laya.timer.clear(this, this.backfunc);
                    }
                    else {
                        ok = true;
                    }
                }
            }
            else {
                if (conxxx.transform.localRotationEulerZ < 0) {
                    conxxx.transform.localRotationEulerZ = 0;
                    if (ok) {
                        Laya.timer.clear(this, this.backfunc);
                    }
                    else {
                        ok = true;
                    }
                }
            }
        }
        boxmove(type, call, time) {
            let t = 400;
            if (time) {
                t = time;
            }
            if (type == 1) {
                this.blackbox.y = 1700;
                Laya.Tween.to(this.blackbox, { y: 0 }, t, Laya.Ease.circIn, Laya.Handler.create(this, () => {
                    if (call) {
                        call();
                    }
                }));
            }
            else {
                this.blackbox.y = 0;
                Laya.Tween.to(this.blackbox, { y: -1700 }, t, Laya.Ease.circOut, Laya.Handler.create(this, () => {
                    if (call) {
                        call();
                    }
                }));
            }
        }
        startgame() {
            this.playersp.rigid.isKinematic = false;
            this.playersp.rotateface();
            this.havestart = true;
            this.playersp.havein = false;
            this.playersp.anmantor.play("ANIM_Char_Idlewalk");
            this.playersp.anmantor.speed = 1;
            this.touchplace.visible = true;
            this.touchplace.alpha = 1;
            this.box.alpha = 0;
            this.gameuicontrosp.gameUI.alpha = 1;
            this.gameuicontrosp.nextleave(Number(Laya.LocalStorage.getItem("leave")), 11);
            try {
            }
            catch (error) {
            }
        }
        gamepause() {
            if (this.playersp.isrotate) {
                return false;
            }
            if (window['nulad']) {
                return;
            }
            if (this.havestart) {
                this.havestart = false;
                this.needre = true;
                this.touchplace.alpha = 0;
            }
            return true;
        }
        repause() {
            if (this.needre) {
                this.needre = false;
                this.havestart = true;
                this.touchplace.alpha = 1;
            }
        }
        initgame(re, juststart, justflash, notshow) {
            if (this.playerinitinfo) {
                this.playersp.initplace();
            }
            else {
            }
            this.iswin = false;
            this.playersp.hitcotime = 0;
            this.havestart = false;
            this.touchplace.alpha = 0;
            this.readtomove = false;
            this.cir.x = this.touchplace.width / 2;
            this.cir.y = this.touchplace.height / 2;
            this.touchplace.visible = false;
            this.touchplace.x = 375;
            this.touchplace.y = 1000;
            this.bian.rotation = 0;
            this.bili = { x: 0, y: 0 };
            if (re) {
                let l = this.createsp.leave;
                let z = this.gameuicontrosp.zuanshinum;
                this.createsp.initcube(false, () => {
                    setTimeout(() => {
                        this.boxmove(2, null);
                    }, 200);
                    if (juststart == 1) {
                        let c = this.box.getChildAt(0);
                        c.visible = true;
                    }
                    else {
                        let c = this.box.getChildAt(0);
                        c.visible = false;
                        if (juststart == 2) {
                            this.gameuicontrosp.endlayersp.reflash(true, l, z);
                        }
                        else if (juststart == 3) {
                            this.gameuicontrosp.endlayersp.reflash(false, l);
                        }
                    }
                });
            }
            else {
                this.fuhuochance = 1;
                let l = this.createsp.leave;
                let z = this.gameuicontrosp.zuanshinum;
                this.createsp.createcube(() => {
                    setTimeout(() => {
                        this.boxmove(2, null);
                    }, 200);
                    if (juststart == 1) {
                        this.box.once(Laya.Event.MOUSE_DOWN, this, (e) => {
                            this.startgame();
                        });
                        let c = this.box.getChildAt(0);
                        c.visible = true;
                    }
                    else {
                        let c = this.box.getChildAt(0);
                        c.visible = false;
                        if (juststart == 2) {
                            this.gameuicontrosp.endlayersp.reflash(true, l, z);
                        }
                        else if (juststart == 3) {
                            this.gameuicontrosp.endlayersp.reflash(false, l, z);
                        }
                    }
                });
            }
        }
        losegame() {
            this.playsound("lose.ogg");
            this.fuhuochance = 1;
            this.boxmove(1, () => {
                this.initgame(true, 3);
            });
            this.cubeback();
            this.havestart = false;
            this.touchplace.alpha = 0;
            this.readtomove = false;
            this.cir.x = this.touchplace.width / 2;
            this.cir.y = this.touchplace.height / 2;
            this.touchplace.visible = false;
            this.bian.rotation = 0;
            this.bili = { x: 0, y: 0 };
        }
        pausegame(nofuhuo) {
            this.fuhuochance -= 1;
            this.cubeback();
            this.havestart = false;
            this.touchplace.alpha = 0;
            this.touchplace.visible = false;
            this.readtomove = false;
            this.cir.x = this.touchplace.width / 2;
            this.cir.y = this.touchplace.height / 2;
            this.bian.rotation = 0;
            this.bili = { x: 0, y: 0 };
            this.boxmove(1, () => {
                if (!nofuhuo) {
                    this.gameuicontrosp.fuhuolayersp.reflash();
                }
                this.playersp.initplace(true);
                if (this.conbox.name != "zhuanpan") {
                    this.conbox.meshRenderer.material['albedoColor'] = new Laya.Vector4(0.0, 165 / 255, 223 / 255, 1.0);
                }
                let c = this.box.getChildAt(0);
                c.visible = false;
                setTimeout(() => {
                    this.boxmove(2, null);
                }, 200);
            });
        }
        fuhuo() {
            this.box.alpha = this.boxalpha;
            this.touchplace.visible = false;
            this.touchplace.x = 375;
            this.touchplace.y = 1000;
            this.box.once(Laya.Event.MOUSE_DOWN, this, (e) => {
                this.startgame();
            });
            let c = this.box.getChildAt(0);
            c.visible = true;
        }
        win() {
            this.addboxlayer();
            setTimeout(() => {
                this.boxmove(1, () => {
                    this.initgame(false, 2);
                });
            }, 2000);
            this.playsound("win.ogg");
            this.iswin = true;
            this.createsp.leave += 1;
            Laya.LocalStorage.setItem("leave", this.createsp.leave);
            this.cubeback();
            this.havestart = false;
            this.touchplace.alpha = 0;
            this.readtomove = false;
            this.cir.x = this.touchplace.width / 2;
            this.cir.y = this.touchplace.height / 2;
            this.bian.rotation = 0;
            this.bili = { x: 0, y: 0 };
        }
        saveGameData() {
            Laya.LocalStorage.setItem("Game_Data", Us_tippy_er.getSave_tippy_Data());
        }
    }
    Game_tippy_Mgr._ins_tippy_tance = null;
    Game_tippy_Mgr.adinfo = [
        {
            "banner": 1,
            "endpagepopup": 0,
            "morefunpopup": 0,
            "indexpopup": 0,
            "sanbeizuanshi": 1,
        }
    ];

    class Tips_tippy_View extends View_tippy_Base {
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

    class LoopAd_tippy_Box extends Laya.Script {
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
            this._displaySp.on(Laya.Event.CLICK, this, this.onSp_tippy_Click);
        }
        onDisable() {
            this._displaySp.off(Laya.Event.CLICK, this, this.onSp_tippy_Click);
        }
        set_tippy_Data(data) {
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
        playsound(name) {
            var url = "subRes/music/" + name;
            if (Laya.Browser.onMiniGame) {
                var sound = Laya.Pool.getItem(name);
                if (sound == null) {
                    sound = wx.createInnerAudioContext();
                    sound.src = url;
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
        onSp_tippy_Click(e) {
            e.stopPropagation();
            this.playsound("click.ogg");
            var data = this._data;
            if (data) {
                console.log("跳转游戏： " + data.title);
                if (Laya.Browser.onMiniGame) {
                    WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                        AL_tippy_D.aldSendReport_tippy_AdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            gameuiContro.cebian.move(1);
                            console.log("用户取消跳转");
                            AL_tippy_D.aldSendReportAd_tippy_ClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQGMiniGame) {
                    OPPOAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQQMiniGame) {
                    QQMiniGameAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        gameuiContro.cebian.move(1);
                        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
            }
        }
    }

    class HorizontalLoopAd_tippy_View extends Laya.Script {
        constructor() {
            super(...arguments);
            this.AdPosID = Share_tippy_Ad.LoopAdLocationID;
            this._scrollForward = true;
        }
        onAwake() {
            this._list = this.owner.getChildByName("List");
            console.log("横向", this._list.itemRender);
            this._list.renderHandler = Laya.Handler.create(this, this.onList_tippy_Render, null, false);
            this._list.hScrollBarSkin = "";
        }
        onEnable() {
            var self = this;
            Share_tippy_Ad.getADV_tippy_s(this.AdPosID, (datas) => {
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
                        this._list.array = temp;
                        window['nulad'] = false;
                    }
                    else {
                        this._list.array = datas;
                        console.log("横向错误！！！！！！！！！！");
                        window['nulad'] = true;
                        self.owner.visible = false;
                        Laya.timer.clearAll(this);
                        self.owner.destroy();
                    }
                    this._list.array = temp;
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
        onList_tippy_Render(cell, index) {
            var data = this._list.array[index];
            var loopAdBox = cell.getComponent(LoopAd_tippy_Box);
            loopAdBox.set_tippy_Data(data);
        }
    }

    class BannerAd_tippy_View extends Laya.Script {
        constructor() {
            super(...arguments);
            this.AdPosID = Share_tippy_Ad.BannerAdLocationID;
            this._data = null;
            this._wxBanner = null;
        }
        onAwake() {
            window["testbanner"] = false;
            console.log("nanner");
            this._displaySp = this.owner.getChildByName("Display");
            if (null == this._displaySp) {
                this._displaySp = this.owner;
            }
            console.log(this._displaySp.localToGlobal(new Laya.Point(0, 0)), "这是啥");
        }
        onEnable() {
        }
        createbanner() {
            if (window['nulad']) {
                return;
            }
            this._displaySp.on(Laya.Event.CLICK, this, this.onSpClick);
            var banner = AppSwitch_tippy_Config.get_tippy_Instance().getAppSwitchData().banner;
            if (0 == banner) {
                if (window["testbanner"]) {
                    this.refreshWXBanner();
                }
                else {
                    this.refreshBannerDis();
                    Laya.timer.loop(3000, this, this.refreshBannerDis);
                }
            }
            else if (1 == banner) {
                if (window["testbanner"]) {
                    this.refreshBannerDis();
                    Laya.timer.loop(3000, this, this.refreshBannerDis);
                }
                else {
                    this.refreshWXBanner();
                }
            }
        }
        offbanner() {
            this._displaySp.off(Laya.Event.CLICK, this, this.onSpClick);
            this.clearWXBaner();
            Laya.timer.clear(this, this.refreshBannerDis);
        }
        onDisable() {
        }
        refreshBannerDis() {
            var self = this;
            Share_tippy_Ad.getADV_tippy_s(this.AdPosID, (datas) => {
                if (datas && datas.length > 0) {
                    var data = datas[Math.floor(Math.random() * datas.length)];
                    self._displaySp.loadImage(data.logo, Laya.Handler.create(self, function () {
                        if (!self._displaySp.destroyed) {
                            self._displaySp.width = 750;
                            self._displaySp.height = 256;
                        }
                    }));
                    self._data = data;
                    window['nulad'] = false;
                }
                else {
                    console.log("banner错误！！！！！！！！！！！！！");
                    window['nulad'] = true;
                    this.owner['visble'] = false;
                }
            }, false);
        }
        playsound(name) {
            var url = "subRes/music/" + name;
            if (Laya.Browser.onMiniGame) {
                var sound = Laya.Pool.getItem(name);
                if (sound == null) {
                    sound = wx.createInnerAudioContext();
                    sound.src = url;
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
        onSpClick() {
            var data = this._data;
            this.playsound("click.ogg");
            if (data) {
                let self = this;
                console.log("跳转游戏： " + data.title);
                if (Laya.Browser.onMiniGame) {
                    WXAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                        AL_tippy_D.aldSendReport_tippy_AdClickSuccess(data);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                        if (res.errMsg == "navigateToMiniProgram:fail cancel") {
                            console.log("用户取消跳转");
                            AL_tippy_D.aldSendReportAd_tippy_ClickFail(data);
                        }
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQGMiniGame) {
                    OPPOAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
                    }, (res) => {
                        console.log("跳转完成");
                    });
                }
                else if (Laya.Browser.onQQMiniGame) {
                    QQMiniGameAPI.navigateToMiniProgram(data.appid, data.url, (res) => {
                        console.log("跳转成功");
                        Share_tippy_Ad.reportUser_tippy_Click(data.appid);
                    }, (res) => {
                        console.log("跳转失败");
                        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD__tippy_OnShareAdFail);
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
            if (window['nulad']) {
                return;
            }
            var self = this;
            var sysInfo = Laya.Browser.window["wx"].getSystemInfoSync();
            var sw = sysInfo.screenWidth;
            var sh = sysInfo.screenHeight;
            var pos = this._displaySp.localToGlobal(new Laya.Point(0, 0));
            var left = pos.x / Laya.stage.width * sw;
            var top = (pos.y - 28) / Laya.stage.height * sh;
            var width = this.WXBannerWidth ? this.WXBannerWidth / Laya.stage.width * sw : sw;
            console.log(top, "数值是");
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
        onUpdate() {
        }
    }

    class UniversalBottomZone extends Laya.Script {
        onAwake() {
            this._ownerSprite = this.owner;
            this._autoZone = this._ownerSprite.getChildByName("AutoZone");
            this._loopADZone = this._ownerSprite.getChildByName("LoopAD");
            this._bannerADZone = this._ownerSprite.getChildByName("BannerAD");
            this._bannerAd = this._bannerADZone.getComponent(BannerAd_tippy_View);
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

    class ClickGetPrize extends View_tippy_Base {
        constructor() {
            super();
            this._totalClickTimer = 22;
            this._needClickTime = 10;
            this._bannerClickTime = 4;
        }
        onAwake() {
            this.drgon = this.owner.getChildByName("panch");
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
        addEvent() {
            super.addEvent();
            Laya.stage.on(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
        }
        removeEvent() {
            super.removeEvent();
            Laya.stage.off(Laya.Event.FOCUS_CHANGE, this, this.onFocusChange);
        }
        onUpdate() {
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
            this._bg.visible = false;
            let self = this;
            this._prizeCount_Text.text = this._prizeCount.toString();
            this._getPrize_View.visible = true;
            this._confirm_Btn.once(Laya.Event.CLICK, this, function () {
                let save = Number(Laya.LocalStorage.getItem("allzuan"));
                save += this._prizeCount;
                Laya.LocalStorage.setItem("allzuan", save + '');
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
            this._clickTime++;
            this._totalClickTime++;
            this.drgon.play(1, false);
            this.drgon.once(Laya.Event.STOPPED, this, () => {
                this.drgon.play(0, true);
            });
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
                console.log("误点Banner套路启动");
                this.ShowBanner();
                Laya.timer.once(2000, this, function () {
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
            Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD_WudianBanner_Hide);
            this._bannerClicked = true;
            this._clickTime = this._needClickTime;
            this._clickTime_PBar$Bar.width = this._clickBarOriginalWidth;
            this._click_Btn.visible = false;
            this._open_Btn.visible = true;
            this.OpenPrizeWindow();
        }
        onDestroy() {
            super.onDestroy();
        }
        onFocusChange() {
            if (null != this.drgon) {
                this.drgon.play(0, true);
            }
        }
    }

    class Loading_tippy_View extends View_tippy_Base {
        constructor() {
            super(...arguments);
            this.moved = false;
        }
        onAwake() {
            this._bg = this.owner.getChildByName("Bg");
            this._processBar = this._bg.getChildAt(0).getChildByName("processBar");
            this.lab = this._processBar.getChildAt(1);
            this.blackbox = this.owner.getChildByName("blackbox");
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
        }
        setProcess(process) {
            console.log("设置了么", process);
            if (process < 0)
                process = 0;
            if (process > 1)
                process = 1;
            var width = 609 * process;
            if (width < 1)
                width = 1;
            this._processBar.width = width;
            this.lab.value = (process * 100).toFixed(0);
            if (process == 1) {
                this.boxmove();
            }
        }
        boxmove() {
            if (this.moved) {
                return;
            }
            this.moved = true;
            this.blackbox.y = -1700;
        }
    }

    class ClickGetPrize$1 extends View_tippy_Base {
        constructor() {
            super();
            this._totalClickTimer = 22;
            this._needClickTime = 10;
            this._bannerClickTime = 4;
        }
        onAwake() {
            this._click_Btn = this.owner.getChildByName("Click_Btn");
            this._click_Btn.on(Laya.Event.CLICK, this, this.ButtonClicked);
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
            this._bg.visible = false;
            let self = this;
            this._prizeCount_Text.text = this._prizeCount.toString();
            this._getPrize_View.visible = true;
            this._confirm_Btn.once(Laya.Event.CLICK, this, function () {
                let save = Number(Laya.LocalStorage.getItem("allzuan"));
                save += this._prizeCount;
                Laya.LocalStorage.setItem("allzuan", save + '');
                if (self._compeletFunction) {
                    self._compeletFunction();
                }
                self.closeView();
            });
        }
        openbox() {
            QQMiniGameAPI.showAppBoxAd(() => {
                console.log("打开失败");
            });
        }
        ButtonClicked() {
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
                this.openbox();
                Laya.timer.once(2000, this, function () {
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
            Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.AD_WudianBanner_Hide);
            this._bannerClicked = true;
            this._clickTime = this._needClickTime;
            this._clickTime_PBar$Bar.width = this._clickBarOriginalWidth;
            this._click_Btn.visible = false;
            this._open_Btn.visible = true;
            this.OpenPrizeWindow();
        }
        onDestroy() {
            super.onDestroy();
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Mgr/GameMgr.ts", Game_tippy_Mgr);
            reg("View/TipsView/TipsView.ts", Tips_tippy_View);
            reg("ShareAd/View/LoopAdBox.ts", LoopAd_tippy_Box);
            reg("ShareAd/View/HorizontalLoopAdView.ts", HorizontalLoopAd_tippy_View);
            reg("ShareAd/View/BannerAdView.ts", BannerAd_tippy_View);
            reg("View/Common/UniversalBottomZone.ts", UniversalBottomZone);
            reg("View/TwinkleSprite.ts", TwinkleSprite);
            reg("View/ClickGetPrize/ClickGetPrize.ts", ClickGetPrize);
            reg("View/LoadingView/LoadingView.ts", Loading_tippy_View);
            reg("View/ClickGetPrize/wudian.ts", ClickGetPrize$1);
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "subRes/View/GameMain.scene";
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
            LoadingUI.uiView = { "type": "Scene", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 750, "height": 1700, "bgColor": "#afe790" }, "compId": 15 }, { "type": "Clip", "props": { "top": 360, "skin": "Loading/loadingcold.png", "right": 0, "name": "Bg" }, "compId": 6, "child": [{ "type": "Sprite", "props": { "y": 720, "x": -86, "texture": "Loading/loadye.png" }, "compId": 9, "child": [{ "type": "Clip", "props": { "y": 31, "x": 16, "width": 609, "skin": "Loading/loadedg.png", "pivotY": 22, "name": "processBar", "height": 37 }, "compId": 5, "child": [{ "type": "Sprite", "props": { "y": 2, "x": 225, "texture": "Loading/Loadinglan.png" }, "compId": 11 }, { "type": "FontClip", "props": { "x": 356, "value": "0", "spaceX": -5, "skin": "Loading/numloadnum.png", "sheet": "0123456789", "centerY": 2 }, "compId": 12, "child": [{ "type": "Clip", "props": { "skin": "Loading/xx.png", "right": -23 }, "compId": 14 }] }] }] }] }, { "type": "Script", "props": { "y": 0, "x": 0, "runtime": "View/LoadingView/LoadingView.ts" }, "compId": 7 }, { "type": "Sprite", "props": { "y": 130, "x": 104, "texture": "Loading/logo.png" }, "compId": 16 }, { "type": "Box", "props": { "y": 1700, "width": 750, "name": "blackbox", "height": 1700, "bgColor": "#000000" }, "compId": 17 }], "loadList": ["Loading/loadingcold.png", "Loading/loadye.png", "Loading/loadedg.png", "Loading/Loadinglan.png", "Loading/numloadnum.png", "Loading/xx.png", "Loading/logo.png"], "loadList3D": [] };
            View.LoadingUI = LoadingUI;
            REG("ui.View.LoadingUI", LoadingUI);
        })(View = ui.View || (ui.View = {}));
    })(ui || (ui = {}));

    class TTAPI {
        static ttLogin(onSuccess, onFail) {
            if (AppConfig.onTTMiniGame) {
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
            if (AppConfig.onTTMiniGame) {
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
            if (!AppConfig.onTTMiniGame)
                return;
            TTAPI.record.start({
                duration
            });
        }
        static stopRecord() {
            if (!AppConfig.onTTMiniGame)
                return;
            TTAPI.record.stop();
        }
        static shareRecord(callback = null) {
            if (!AppConfig.onTTMiniGame)
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
            if (!AppConfig.onTTMiniGame)
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
            Config.isAntialias = true;
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            if (true == AppConfig.onTTMiniGame) {
                Laya.Browser.onMiniGame = false;
            }
            if (!Laya.Browser.onMiniGame
                && !Laya.Browser.onQGMiniGame
                && !Laya.Browser.onQQMiniGame
                && !AppConfig.onTTMiniGame) {
                AppConfig.ResServer = AppConfig.LocalTestReServer;
            }
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            Laya.loader.maxLoader = 50;
            this.initLoadingView();
            window['base'] = Math.ceil(Math.random() * 9000);
            var firstConfigs = [
                { url: AppConfig.ResServer + "/json/appswitch.json", type: Laya.Loader.JSON }
            ];
            var self = this;
            Laya.loader.load(firstConfigs, Laya.Handler.create(this, () => {
                self.loadRes();
            }));
            Event_tippy_Mgr.ins_tippy_tance.regOnceEvent(Event_tippy_Def.App_CloseFirstLoadingView, this, this.closeloadingUI);
        }
        initLoadingView() {
            this._loadingUI = new ui.View.LoadingUI();
            Laya.stage.addChild(this._loadingUI);
            this._loadingUI.width = Laya.stage.width;
            this._loadingUI.height = Laya.stage.height;
            this._loadingView = this._loadingUI.getComponent(Loading_tippy_View);
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
            this._preLoadRes.push({ url: AppConfig.ResServer + "/json/appswitch.json", type: Laya.Loader.JSON });
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
                console.log("开始加载?");
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
                        console.log(res);
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
                    Us_tippy_er.co_tippy_de = code;
                    Http_tippy_Unit.lo_tippy_gin((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            Us_tippy_er.tok_tippy_en = res.data.token;
                            Us_tippy_er.open_tippy_Id = res.data.openid;
                            Http_tippy_Unit.get_tippy_GameData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    Us_tippy_er.initi_tippy_User(res.data);
                                }
                                else {
                                    Us_tippy_er.initi_tippy_User(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                    self._loadingUI.destroy();
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                Us_tippy_er.tok_tippy_en = "";
                                Us_tippy_er.open_tippy_Id = "";
                                Us_tippy_er.initi_tippy_User(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                    self._loadingUI.destroy();
                                }));
                            });
                        }
                    }, (res) => {
                        console.log("登陆失败！！！" + res);
                        Us_tippy_er.initi_tippy_User(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            self._loadingUI.destroy();
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
                    Us_tippy_er.co_tippy_de = token;
                    Http_tippy_Unit.lo_tippy_gin((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            Us_tippy_er.tok_tippy_en = res.data.token;
                            Us_tippy_er.open_tippy_Id = res.data.openid;
                            Http_tippy_Unit.get_tippy_GameData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    Us_tippy_er.initi_tippy_User(res.data);
                                    console.log("获取用户数据--------------------Start");
                                    for (var key in res.data) {
                                        console.log(key, res.data[key]);
                                    }
                                    console.log("获取用户数据--------------------End");
                                }
                                else {
                                    Us_tippy_er.initi_tippy_User(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                Us_tippy_er.tok_tippy_en = "";
                                Us_tippy_er.open_tippy_Id = "";
                                Us_tippy_er.initi_tippy_User(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                    }, (res) => {
                        console.log("登陆失败！！！", res);
                        Us_tippy_er.initi_tippy_User(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else if (Laya.Browser.onQQMiniGame) {
                QQMiniGameAPI.Login(function (code) {
                    Us_tippy_er.co_tippy_de = code;
                    Http_tippy_Unit.lo_tippy_gin((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            Us_tippy_er.tok_tippy_en = res.data.token;
                            Us_tippy_er.open_tippy_Id = res.data.openid;
                            Http_tippy_Unit.get_tippy_GameData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    Us_tippy_er.initi_tippy_User(res.data);
                                }
                                else {
                                    Us_tippy_er.initi_tippy_User(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                    self._loadingUI.destroy();
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                Us_tippy_er.tok_tippy_en = "";
                                Us_tippy_er.open_tippy_Id = "";
                                Us_tippy_er.initi_tippy_User(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                    self._loadingUI.destroy();
                                }));
                            });
                        }
                    }, (res) => {
                        console.log("登陆失败！！！" + res);
                        Us_tippy_er.initi_tippy_User(null);
                        console.log("初始化完");
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                            console.log("打开主场景！！");
                            self._loadingUI.destroy();
                        }));
                    });
                }, null);
            }
            else if (AppConfig.onTTMiniGame) {
                TTAPI.ttLogin(function (code) {
                    Us_tippy_er.co_tippy_de = code;
                    Http_tippy_Unit.lo_tippy_gin((res) => {
                        if (res.code == 1) {
                            console.log("登陆成功！！！");
                            Us_tippy_er.tok_tippy_en = res.data.tok_tippy_en;
                            Us_tippy_er.open_tippy_Id = res.data.open_tippy_Id;
                            Http_tippy_Unit.get_tippy_GameData((res) => {
                                console.log("获取用户数据成功！！！");
                                if (1 == res.code) {
                                    Us_tippy_er.initi_tippy_User(res.data);
                                }
                                else {
                                    Us_tippy_er.initi_tippy_User(null);
                                }
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            }, (res) => {
                                console.log("获取用户数据失败！！！");
                                Us_tippy_er.tok_tippy_en = "";
                                Us_tippy_er.open_tippy_Id = "";
                                Us_tippy_er.initi_tippy_User(null);
                                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                                }));
                            });
                        }
                    }, (res) => {
                        console.log("登陆失败！！！" + res);
                        Us_tippy_er.initi_tippy_User(null);
                        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                        }));
                    });
                }, null);
            }
            else {
                Us_tippy_er.testInit_tippy_User();
                GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
                    self._loadingUI.destroy();
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
