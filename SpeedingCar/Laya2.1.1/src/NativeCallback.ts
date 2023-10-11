import Event_wcjtn_Mgr from "./Event/EventMgr";
import { Event_wcjtn_Def } from "./Event/EventDef";
import Sound_wcjtn_Mgr, { Sound_wcjtn_Type } from "./Mgr/SoundMgr";

export default class NativeCallback {
    public static NowVideoType: string = "";
    private static readonly conchIOS: string = "Conch-ios";
    private static readonly conchAndroid: string = "Conch-android";
    private static os: string = "";
    // private static bridge: Laya.IPlatformClass = null;

    public static onVideoFail() {
        NativeCallback.ShowLog("onVideoFail --------- ------------ ");
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.RewardVideoFail);
        Laya.SoundManager.muted = false;
    }

    public static onVideoSuccess(reward:string) {
        NativeCallback.ShowLog("onVideoSuccess    --------- ------------ ");
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.RewardVideoSuccess, reward);
        Laya.SoundManager.muted = false;
    }

    
    public static onInsertVideoEnd() {
        NativeCallback.ShowLog("onInsertVideoEnd    --------- ------------ ");
        Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.InsertVideoEnd);
        Laya.SoundManager.muted = false;
    }

    //进入后台
    public static onPause() {
        Laya.SoundManager.muted = true;
        NativeCallback.ShowLog("进入后台 静音");
    }
    //恢复
    public static onResume() {
        Laya.SoundManager.muted = false;
        NativeCallback.ShowLog("恢复---------");
    }
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
    public static CallNativeFunc(funcName: string){
        if (window['conch']) {
            if (Laya.Browser.onAndroid) {
                var bridge = window["PlatformClass"].createClass("demo.JSBridge");
                bridge.call(funcName);
            }
            else if (Laya.Browser.onIOS) {
                
            }
        }

    }

    public static ShowLog(log: string) {
        console.log("输出native日志---" + log);
        if (Laya.Browser.onAndroid) {
            var bridge = window["PlatformClass"].createClass("demo.JSBridge");
            bridge.call("showLog", log);
        }
        else if (Laya.Browser.onIOS) {
            
        }
    }
}