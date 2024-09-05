import { ryw_EventDef } from "./Event/EventDef";
import Sou_FFXCS_ndMgr from "./Mgr/SoundMgr";
import ryw_EventMgr from "./Event/EventMgr";
import ryw_SoundMgr from "./Mgr/SoundMgr";

export default class NativeCallback {
    public static NowVideoType: string = "";
    private static readonly conchIOS: string = "Conch-ios";
    private static readonly conchAndroid: string = "Conch-android";
    private static os: string = "";
    // private static bridge: Laya.IPlatformClass = null;

    public static onVideoFail() {
        console.debug("onVideoFail --------- ------------ ");
        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.RewardVideoFail);
        ryw_SoundMgr.ryw_instance.ryw_playBGM('bg');
    }

    public static onVideoSuccess(reward:string) {
        console.debug("onVideoSuccess    --------- ------------ ");
        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.RewardVideoSuccess, reward);
        ryw_SoundMgr.ryw_instance.ryw_playBGM('bg');
    }

    public static onInsertVideoEnd() {
        console.debug("onInsertVideoEnd    --------- ------------ ");
        ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.InsertVideoEnd);
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