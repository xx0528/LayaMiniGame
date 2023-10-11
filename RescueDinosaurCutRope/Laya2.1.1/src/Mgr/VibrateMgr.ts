import NativeCallback from "../NativeCallback";

export default class Vibrat_JJKLBB_eMgr 
{
    public static isEn_JJKLBB_able = true;

    //短震动
    public static vibrat_JJKLBB_eShort(): void 
    {
        if(!Vibrat_JJKLBB_eMgr.isEn_JJKLBB_able)
            return;
        if (Laya.Browser.onMiniGame)  {
            Laya.Browser.window["wx"].vibrateShort();
        }
        else if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].vibrateShort();
        }
        else if (Laya.Browser.onQQMiniGame) { //qq小游戏
            Laya.Browser.window["qq"].vibrateShort();
        }
        else {
            NativeCallback.CallNativeFunc("vibrateShort");
        }
    }

    //长震动
    public static ibrat_JJKLBB_eLong(): void 
    {
        if(!Vibrat_JJKLBB_eMgr.isEn_JJKLBB_able)
            return;
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].vibrateLong();
        }
        else if (Laya.Browser.onQGMiniGame) {
            Laya.Browser.window["qg"].vibrateLong();
        }
        else if (Laya.Browser.onQQMiniGame) { //qq小游戏
            Laya.Browser.window["qq"].vibrateLong();
        }
        else {
            NativeCallback.CallNativeFunc("vibrateLong");
        }
    }

    //定时震动,毫秒
    public static vibr_JJKLBB_ate(time: number) 
    {
        if(!Vibrat_JJKLBB_eMgr.isEn_JJKLBB_able)
            return;
        if (Laya.Browser.onMiniGame)  
        {
            let count = time / 15; //微信小游戏中震动的时间是15毫秒的整数倍时间，本质是对短震动的封装
            let index = 0;
            let obj = { count: count, index: index };
            Laya.timer.loop(16, obj, function () {
                Vibrat_JJKLBB_eMgr.vibrat_JJKLBB_eShort();
                index++;
                if (index > count) {
                        Laya.timer.clearAll(obj);
                }
            });    
        }
        else if (Laya.Browser.onQGMiniGame)  
        {
            let count = time / 20; //OPPO小游戏中震动的时间是20毫秒的整数倍时间，本质是对短震动的封装
            let index = 0;
            let obj = { count: count, index: index };
            Laya.timer.loop(21, obj, function () {
                Vibrat_JJKLBB_eMgr.vibrat_JJKLBB_eShort();
                index++;
                if (index > count) {
                        Laya.timer.clearAll(obj);
                }
            });    
        }
        else if (Laya.Browser.onQQMiniGame)//qq小游戏
        {
            let count = time / 20; //OPPO小游戏中震动的时间是20毫秒的整数倍时间，本质是对短震动的封装
            let index = 0;
            let obj = { count: count, index: index };
            Laya.timer.loop(21, obj, function () {
                Vibrat_JJKLBB_eMgr.vibrat_JJKLBB_eShort();
                index++;
                if (index > count) {
                        Laya.timer.clearAll(obj);
                }
            });    
        }
        else if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
            let count = time / 20; //OPPO小游戏中震动的时间是20毫秒的整数倍时间，本质是对短震动的封装
            let index = 0;
            let obj = { count: count, index: index };
            Laya.timer.loop(21, obj, function () {
                Vibrat_JJKLBB_eMgr.vibrat_JJKLBB_eShort();
                index++;
                if (index > count) {
                        Laya.timer.clearAll(obj);
                }
            });    
        }
    }
}