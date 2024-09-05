import ryw_Utilit from "../Utilit";
import ryw_ViewMgr, { ryw_ViewDef } from "./ViewMgr";
import ryw_User from "../User/User";
import ryw_HttpUnit from "../Net/HttpUnit";
import ryw_MaiLiang from "../MaiLiangAPI/MaiLiang";
import ryw_EventMgr from "../Event/EventMgr";
import { ryw_EventDef } from "../Event/EventDef";
import ryw_WXAPI from "../WXAPI";
import ryw_AppSwitchConfig from "../Config/AppSwitchConfig";
import ryw_WudianMgr from "./WudianMgr";
import ryw_CachedWXBannerAd from "../CachedWXBannerAd";
import ryw_ALD from "../ALD";
import ryw_QQMiniGameAPI from "../QQMiniGameAPI";
import ryw_WXADMgr from "./WXADMgr";
import ryw_CachedQQBannerAd from "../CachedQQBannerAd";
import ryw_AppConfig from "../AppConfig";
import ryw_ViewBase from "../View/ViewBase";
import GameSwitchConfig from "../Config/GameSwitchConfig";

//游戏管理器，游戏代码的入口
export default class ryw_GameMgr extends Laya.Script {

    private static ryw__instance: ryw_GameMgr = null;
    public static ryw_getInstance(): ryw_GameMgr { return ryw_GameMgr.ryw__instance; }

    constructor() {
        super();
        ryw_GameMgr.ryw__instance = this;
    }

    onAwake()  {
        ryw_MaiLiang.ryw_GetMaiLiangOpenId(function (res) {
            console.log("GameUI 买量数据上报成功");
            Laya.Browser.window["wx"].onShow(function () {
                ryw_MaiLiang.ryw_GetMaiLiangOpenId(null, null);
            })
            Laya.Browser.window["wx"].onHide(function () {
                ryw_MaiLiang.ryw_ReportStayTime(null, null);
            })
        },
            function (res) {
                console.log("GameUI 买量数据上报失败");
            }
        );

        ryw_WXAPI.ryw_SetShareMenu("", "",
            () =>  {

            },
            () =>  {

            },
            () =>  {

            })
        

        ryw_WudianMgr.ryw_UpdateIpBlockState();
        this.ryw_reportLaunchOptions();
        
        if(Laya.Browser.onMiniGame)
        {
            ryw_CachedWXBannerAd.ryw_preloadBanner();// 如果是老项目使用了 CachedWXBannerAd 这个类，请打开这一行注释
            ryw_WXADMgr.ryw_init();//如果不是老项目，没有使用 WXADMgr 这个类, 请注释这一行。
        }
        else if (Laya.Browser.onQQMiniGame)
        {
            ryw_CachedQQBannerAd.preloadBanner();
            ryw_QQMiniGameAPI.ryw_LoadAppBoxAd(()=>{},()=>{});
        }
        else if(Laya.Browser.onQGMiniGame)
        {
            if(null != Laya.Browser.window["qg"].reportMonitor && typeof(Laya.Browser.window["qg"].reportMonitor) == 'function')
            {
                Laya.Browser.window["qg"].reportMonitor('game_scene', 0);
            }
        }
    }

    onStart()  {
        this.ryw_preCreateGame();
    }

    private ryw_preCreateGame(): void {
        //todo：这里添加初始化主场景的代码。ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
        //自定义加载器,使模型文件保存在本地,关卡文件放在云端,整局游戏只需要加载一次
        Laya.URL.customFormat = (url : string) =>{
            if (url.indexOf(".ls") == -1 && url.indexOf(ryw_AppConfig.ryw_ResServer+"/LayaScene")>-1){
                // console.log("origin url: " ,url);
                url = url.replace(ryw_AppConfig.ryw_ResServer+"/LayaScene","subRes/LayaScene");
                // console.log("replace url: " ,url);
                return url;
            }
            return url;
        }

        //添加下面代码到 laya.d3.js 的 Laya3D._onMaterilLmatLoaded 函数的中 2002行 var url=loader.url; 这一行之后
		// if(url.indexOf("https://oss.renyouwangluo.cn/jjnw/LayaScene")  > -1)
		// {
		// 	url = url.replace("https://oss.renyouwangluo.cn/jjnw/LayaScene","subRes/LayaScene");
		// }
        
        GameSwitchConfig.getInstance().SetBannerActive();
        ryw_ViewMgr.ryw_instance.ryw_openView(ryw_ViewDef.GameView,null, (v:ryw_ViewBase)=>{
            (v.owner as Laya.View).zOrder = 1;
            // ryw_EventMgr.ryw_instance.ryw_dispatch(ryw_EventDef.App_CloseFirstLoadingView);
        });
    }

    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    public ryw_saveGameData()  {
        Laya.LocalStorage.setItem("Game_Data", ryw_User.ryw_getSaveData());
        // ryw_HttpUnit.ryw_saveGameData(ryw_User.ryw_getSaveData(),
        //     (res) => {
        //         if (res.code == 1) {
        //             console.log("存档成功")
        //         }
        //         else {
        //             console.log("存档失败")
        //         }
        //     },
        //     (res) => {
        //         console.log("存档失败")
        //     })
    }

    protected ryw_reportLaunchOptions()
    {
        ryw_HttpUnit.ryw_Getuserip((res)=>
        {
            if(1 == res.code)
            {
                console.log("获取玩家ip,地区成功 ：",res.data.dqip,res.data.ipxq);
                let opt : any = null;
                if(Laya.Browser.onMiniGame)
                {
                    opt = ryw_WXAPI.ryw_getLaunchOptionsSync();
                }
                else if(Laya.Browser.onQQMiniGame)
                {
                    opt = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync();
                }
                if(null != opt)
                {
                    ryw_ALD.ryw_aldSendReportLaunchOptions(opt.scene,res.data.dqip,res.data.ipxq);
                }
            }
        },(res)=>
        {
            console.log("获取玩家ip,地区失败");
            let opt : any = null;
            if(Laya.Browser.onMiniGame)
            {
                opt = ryw_WXAPI.ryw_getLaunchOptionsSync();
            }
            else if(Laya.Browser.onQQMiniGame)
            {
                opt = ryw_QQMiniGameAPI.ryw_getLaunchOptionsSync();
            }
            if(null != opt)
            {
                ryw_ALD.ryw_aldSendReportLaunchOptions(opt.scene,"","");
            }
        })
    }
}