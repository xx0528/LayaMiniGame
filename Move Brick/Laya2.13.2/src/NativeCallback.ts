import { Event_ZMDGJ_Def } from "./Event/EventDef";
import Sou_FFXCS_ndMgr from "./Mgr/SoundMgr";
import Event_ZMDGJ_Mgr from "./Event/EventMgr";
import Sound_ZMDGJ_Mgr from "./Mgr/SoundMgr";

export default class NativeCallback {
    public static NowVideoType: string = "";
    private static readonly conchIOS: string = "Conch-ios";
    private static readonly conchAndroid: string = "Conch-android";
    private static os: string = "";
    // private static bridge: Laya.IPlatformClass = null;

    public static onVideoFail() {
        console.debug("onVideoFail --------- ------------ ");
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.RewardVideoFail);
        Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_BGM('BGM');
    }

    public static onVideoSuccess(reward:string) {
        console.debug("onVideoSuccess    --------- ------------ ");
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.RewardVideoSuccess, reward);
        Sound_ZMDGJ_Mgr.ins_ZMDGJ_tance.play_ZMDGJ_BGM('BGM');
    }

    public static onInsertVideoEnd() {
        console.debug("onInsertVideoEnd    --------- ------------ ");
        Event_ZMDGJ_Mgr.ins_ZMDGJ_tance.dis_ZMDGJ_patch(Event_ZMDGJ_Def.InsertVideoEnd);
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