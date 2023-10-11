import Utilit_ from "../Utilit";
import View_ppxhc_Mgr, { View_ppxhc_Def } from "./ViewMgr";
import User_ppxhc from "../User/User";
import Http_ppxhc_Unit from "../Net/HttpUnit";
import MaiLiang from "../MaiLiangAPI/MaiLiang";
import Event_ppxhc_Mgr from "../Event/EventMgr";
import { Event_ppxhc_Def } from "../Event/EventDef";
import WXAPI_ from "../WXAPI";
import AppSwitchConfig from "../Config/AppSwitchConfig";
import Wudian_ppxhc_Mgr from "./WudianMgr";
import CachedWXBanner_ppxhc_Ad from "../CachedWXBannerAd";
import ALD_ppxhc from "../ALD";
import QQMiniGame_ppxhc_API from "../QQMiniGameAPI";
import WXADMgr from "./WXADMgr";
import CachedQQBannerAd from "../CachedQQBannerAd";
import Game from "../Game/Game";

//游戏管理器，游戏代码的入口
export default class Game_ppxhc_Mgr extends Laya.Script {

    private static _instance_: Game_ppxhc_Mgr = null;
    public static getInstance(): Game_ppxhc_Mgr { return Game_ppxhc_Mgr._instance_; }

    constructor() {
        super();
        Game_ppxhc_Mgr._instance_ = this;
    }

    onAwake()  {
        MaiLiang.GetMaiLiangOpen_ppxhc_Id(function (res) {
            console.log("GameUI 买量数据上报成功");
            Laya.Browser.window["wx"].onShow(function () {
                MaiLiang.GetMaiLiangOpen_ppxhc_Id(null, null);
            })
            Laya.Browser.window["wx"].onHide(function () {
                MaiLiang.ReportStay_ppxhc_Time(null, null);
            })
        },
            function (res) {
                console.log("GameUI 买量数据上报失败");
            }
        );

        WXAPI_.SetShareMenu("", "",
            () =>  {

            },
            () =>  {

            },
            () =>  {

            })
        
        Wudian_ppxhc_Mgr.UpdateIpBlock_ppxhc_State();
        this.report_ppxhc_LaunchOptions();
        
        if(Laya.Browser.onMiniGame)
        {
            //CachedWXBannerAd.preloadBanner(); 如果是老项目使用了 CachedWXBannerAd 这个类，请打开这一行注释
            WXADMgr.init();//如果不是老项目，没有使用 WXADMgr 这个类, 请注释这一行。
        }
        else if (Laya.Browser.onQQMiniGame)
        {
            CachedQQBannerAd.preloadBanner();
            QQMiniGame_ppxhc_API.LoadAppBoxAd(()=>{},()=>{});
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
        this.pre_ppxhc_CreateGame();
    }

    private pre_ppxhc_CreateGame(): void {
        //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面

        let basePath = "https://oss.renyouwangluo.cn/ppxhc/Conventional"
        Laya.URL.customFormat = (url: string) => 
        {
            if(url.indexOf(".lh")  == -1 && url.indexOf(basePath)  > -1)
            {
                url = url.replace(basePath,"subRes/Game/LayaScene_Game/Conventional");
                return url;
            }
            return url;
        }

        Game.LoadGame(this, () => {
            Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.App_CloseFirstLoadingView);
            View_ppxhc_Mgr.instance.openView(View_ppxhc_Def.GameHome,{view:0});
            //ViewMgr.instance.openView(ViewDef.GameOver,{Result:1});
            //ViewMgr.instance.openView(ViewDef.GameContinue);
            
        });
    }

    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    public save_ppxhc_GameData()  {
        localStorage.setItem("Game_Data", User_ppxhc.getSaveData());
        // Http_ppxhc_Unit.saveGameData(User_ppxhc.getSaveData(),
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

    protected report_ppxhc_LaunchOptions()
    {
        Http_ppxhc_Unit.Getuserip((res)=>
        {
            if(1 == res.code)
            {
                console.log("获取玩家ip,地区成功 ：",res.data.dqip,res.data.ipxq);
                let opt : any = null;
                if(Laya.Browser.onMiniGame)
                {
                    opt = WXAPI_.getLaunchOptionsSync();
                }
                else if(Laya.Browser.onQQMiniGame)
                {
                    opt = QQMiniGame_ppxhc_API.getLaunchOptionsSync();
                }
                if(null != opt)
                {
                    ALD_ppxhc.aldSendReportLaunchOptions(opt.scene,res.data.dqip,res.data.ipxq);
                }
            }
        },(res)=>
        {
            console.log("获取玩家ip,地区失败");
            let opt : any = null;
            if(Laya.Browser.onMiniGame)
            {
                opt = WXAPI_.getLaunchOptionsSync();
            }
            else if(Laya.Browser.onQQMiniGame)
            {
                opt = QQMiniGame_ppxhc_API.getLaunchOptionsSync();
            }
            if(null != opt)
            {
                ALD_ppxhc.aldSendReportLaunchOptions(opt.scene,"","");
            }
        })
    }
}