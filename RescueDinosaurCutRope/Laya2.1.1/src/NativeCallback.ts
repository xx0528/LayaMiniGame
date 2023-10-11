import { Event_JJKLBB_Def } from "./Event/EventDef";
import Sou_FFXCS_ndMgr from "./Mgr/SoundMgr";
import Even_JJKLBB_tMgr from "./Event/EventMgr";
import SoundM_JJKLBB_gr from "./Mgr/SoundMgr";

export default class NativeCallback {
    public static NowVideoType: string = "";
    private static readonly conchIOS: string = "Conch-ios";
    private static readonly conchAndroid: string = "Conch-android";
    private static os: string = "";
    // private static bridge: Laya.IPlatformClass = null;

    public static onVideoFail() {
        console.debug("onVideoFail --------- ------------ ");
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.RewardVideoFail);
        Laya.SoundManager.muted = false;
    }

    public static onVideoSuccess(reward:string) {
        console.debug("onVideoSuccess    --------- ------------ ");
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.RewardVideoSuccess, reward);
        SoundM_JJKLBB_gr.instance.pla_JJKLBB_yBGM('bgm');
        Laya.SoundManager.muted = false;
    }

    public static onInsertVideoEnd() {
        console.debug("onInsertVideoEnd    --------- ------------ ");
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.InsertVideoEnd);
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
}