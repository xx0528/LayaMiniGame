import Utilit from "../Utilit";
import ViewMgr, { ViewDef } from "./ViewMgr";
import User, { UserGameData } from "../User/User";
import HttpUnit from "../Net/HttpUnit";
import MaiLiang from "../MaiLiangAPI/MaiLiang";
import EventMgr from "../Event/EventMgr";
import { EventDef } from "../Event/EventDef";
import WXAPI from "../WXAPI";
import AppSwitchConfig from "../Config/AppSwitchConfig";
import WudianMgr from "./WudianMgr";
import CachedWXBannerAd from "../CachedWXBannerAd";
import ALD from "../ALD";
import QQMiniGameAPI from "../QQMiniGameAPI";
import GameScene3D from "../ParkingJam/View/GameScene3D";
import AppConfig from "../AppConfig";
import ViewBase from "../View/ViewBase";
import WXADMgr from "./WXADMgr";
import CachedQQBannerAd from "../CachedQQBannerAd";

//游戏管理器，游戏代码的入口
export default class GameMgr extends Laya.Script {

    private static _instance: GameMgr = null;
    public static getInstance(): GameMgr { return GameMgr._instance; }

    constructor() {
        super();
        GameMgr._instance = this;
    }

    onAwake()  {
        MaiLiang.GetMaiLiangOpenId(function (res) {
            console.log("GameUI 买量数据上报成功");
            Laya.Browser.window["wx"].onShow(function () {
                MaiLiang.GetMaiLiangOpenId(null, null);
            })
            Laya.Browser.window["wx"].onHide(function () {
                MaiLiang.ReportStayTime(null, null);
            })
        },
            function (res) {
                console.log("GameUI 买量数据上报失败");
            }
        );

        WXAPI.SetShareMenu("", "",
            () =>  {

            },
            () =>  {

            },
            () =>  {

            })
        

        WudianMgr.UpdateIpBlockState();
        this.reportLaunchOptions();
        
        if(Laya.Browser.onMiniGame)
        {
            //CachedWXBannerAd.preloadBanner(); 如果是老项目使用了 CachedWXBannerAd 这个类，请打开这一行注释
            WXADMgr.init();//如果不是老项目，没有使用 WXADMgr 这个类, 请注释这一行。
        }
        else if (Laya.Browser.onQQMiniGame)
        {
            CachedQQBannerAd.preloadBanner();
            QQMiniGameAPI.LoadAppBoxAd(()=>{},()=>{});
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
        this.preCreateGame();
    }

    private preCreateGame(): void {
        //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
        this.load3DGameScene();
    }

    public load3DGameScene(onComplete? : Function): void {
        Laya.Scene3D.load(AppConfig.LocalTestReServer + "/LayaScene_KLTCC_03/Conventional/" + "KLTCC_03.ls", Laya.Handler.create(this,(scene : Laya.Scene3D)=>
        {
            Laya.stage.addChild(scene);
            scene.addComponent(GameScene3D);

            ViewMgr.instance.openView(ViewDef.GameView);

            if (null != onComplete) {
                onComplete();
            }
        }))
    }

    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    public saveGameData()  {
        localStorage.setItem("Game_Data", User.getSaveData());
        // HttpUnit.saveGameData(User.getSaveData(),
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

    protected reportLaunchOptions()
    {
        HttpUnit.Getuserip((res)=>
        {
            if(1 == res.code)
            {
                console.log("获取玩家ip,地区成功 ：",res.data.dqip,res.data.ipxq);
                let opt : any = null;
                if(Laya.Browser.onMiniGame)
                {
                    opt = WXAPI.getLaunchOptionsSync();
                }
                else if(Laya.Browser.onQQMiniGame)
                {
                    opt = QQMiniGameAPI.getLaunchOptionsSync();
                }
                if(null != opt)
                {
                    ALD.aldSendReportLaunchOptions(opt.scene,res.data.dqip,res.data.ipxq);
                }
            }
        },(res)=>
        {
            console.log("获取玩家ip,地区失败");
            let opt : any = null;
            if(Laya.Browser.onMiniGame)
            {
                opt = WXAPI.getLaunchOptionsSync();
            }
            else if(Laya.Browser.onQQMiniGame)
            {
                opt = QQMiniGameAPI.getLaunchOptionsSync();
            }
            if(null != opt)
            {
                ALD.aldSendReportLaunchOptions(opt.scene,"","");
            }
        })
    }
}