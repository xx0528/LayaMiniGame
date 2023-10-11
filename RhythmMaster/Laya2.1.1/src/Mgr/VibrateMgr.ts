import NativeCallback from "../NativeCallback";

export default class Vibrate_myqq_Mgr 
{
    public static isEnable = false;

    //短震动
    public static vibrateShort(): void 
    {
        if(!Vibrate_myqq_Mgr.isEnable)
            return;
        if (Laya.Browser.onMiniGame)  {
            Laya.Browser.window["wx"].vibrateShort();
        }
        else {
            NativeCallback.CallNativeFunc("vibrateShort");
        }
    }

    //长震动
    public static ibrateLong(): void 
    {
        if(!Vibrate_myqq_Mgr.isEnable)
            return;
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].vibrateLong();
        }else {
            NativeCallback.CallNativeFunc("vibrateLong");
        }
    }

    //定时震动,毫秒
    public static vibrate(time: number) 
    {
        if(!Vibrate_myqq_Mgr.isEnable)
            return;
        if (Laya.Browser.onMiniGame)  
        {
            let count = time / 15; //微信小游戏中震动的时间是15毫秒的整数倍时间，本质是对短震动的封装
            let index = 0;
            let obj = { count: count, index: index };
            Laya.timer.loop(16, obj, function () {
                Vibrate_myqq_Mgr.vibrateShort();
                index++;
                if (index > count) {
                        Laya.timer.clearAll(obj);
                }
            });    
        }
    }
}