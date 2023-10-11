import NativeCallback from "../NativeCallback";

export class SwitchConfigData
{
    public openBanner:number = 1;
    public openVideo : number = 1;
    public openInsert: number = 1;
}

export default class GameSwitchConfig
{   
    public openBanner:number = 1;
    public openVideo : number = 1;
    public openInsert: number = 1;

    public static resUrl = "" // "https://gamecfg-xxly.oss-cn-hongkong.aliyuncs.com/luckgolfcfg.json";

    public static getInstance() : GameSwitchConfig
    {
        if(null == GameSwitchConfig._instance)
        {
            GameSwitchConfig.load();
        }
        return GameSwitchConfig._instance
    }
    protected static _instance: GameSwitchConfig;

    protected static load(){
        GameSwitchConfig._instance = new GameSwitchConfig();

        Laya.loader.load(GameSwitchConfig.resUrl, Laya.Handler.create(this, (res) => {
            if (res) {
                for(const key of Object.keys(res)) {
                    GameSwitchConfig._instance[key] = res[key];
                }
                GameSwitchConfig._instance.SetBannerActive();
            }
            GameSwitchConfig._instance.SetBannerActive();
        }))
    }

    public hideBanner() {
        NativeCallback.CallNativeFunc("hideBanner");
    }

    public SetBannerActive() {
        if (this.openBanner == 1) {
            NativeCallback.CallNativeFunc("showBanner");
        }
        else {
            NativeCallback.CallNativeFunc("hideBanner");
        }
    }
}