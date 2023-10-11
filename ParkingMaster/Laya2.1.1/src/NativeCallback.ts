
import EventMgr from "./Event/EventMgr";
import { EventDef } from "./Event/EventDef";

export default class NativeCallback {
    public static NowVideoType: string = "";
    private static readonly conchIOS: string = "Conch-ios";
    private static readonly conchAndroid: string = "Conch-android";
    private static os: string = "";
    // private static bridge: Laya.IPlatformClass = null;

    public static onVideoFail() {
        EventMgr.instance.dispatch(EventDef.RewardVideoFail);
        Laya.SoundManager.muted = false;
    }

    public static onVideoSuccess(reward:string) {
        EventMgr.instance.dispatch(EventDef.RewardVideoSuccess, reward);
        Laya.SoundManager.muted = false;
    }

    public static onInsertVideoEnd() {
        console.debug("onInsertVideoEnd    --------- ------------ ");
        EventMgr.instance.dispatch(EventDef.InsertVideoEnd);
        Laya.SoundManager.muted = false;
    }

    //进入后台
    public static onPause() {
        console.debug("进入后台 静音");
        Laya.SoundManager.muted = true;
    }
    //恢复
    public static onResume() {
        console.debug("恢复---------");
        Laya.SoundManager.muted = false;
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
        if (Laya.Browser.onAndroid) {
            var bridge = window["PlatformClass"].createClass("demo.JSBridge");
            bridge.call(funcName);
        }
        else if (Laya.Browser.onIOS) {

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