import { Event_tippy_Def } from "./Event/EventDef";
import Sou_FFXCS_ndMgr from "./Mgr/SoundMgr";
import Event_tippy_Mgr from "./Event/EventMgr";
import Sound_tippy_Mgr from "./Mgr/SoundMgr";

export default class NativeCallback {
    public static NowVideoType: string = "";
    private static readonly conchIOS: string = "Conch-ios";
    private static readonly conchAndroid: string = "Conch-android";
    private static os: string = "";
    // private static bridge: Laya.IPlatformClass = null;

    public static onVideoFail() {
        console.debug("onVideoFail --------- ------------ ");
        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.RewardVideoFail);
        Sound_tippy_Mgr.instance.play_tippy_BGM("bgmusic");
    }

    public static onVideoSuccess(reward:string) {
        console.debug("onVideoSuccess    --------- ------------ ");
        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.RewardVideoSuccess, reward);
        Sound_tippy_Mgr.instance.play_tippy_BGM("bgmusic");
    }

    public static onInsertVideoEnd() {
        console.debug("onInsertVideoEnd    --------- ------------ ");
        Event_tippy_Mgr.ins_tippy_tance.dispatch(Event_tippy_Def.InsertVideoEnd);
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
}