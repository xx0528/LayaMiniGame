import Utilit_wcjtn_ from "../Utilit";
import View_wcjtn_Mgr, { View_wcjtn_Def } from "./ViewMgr";
import User_wcjtn_ from "../User/User";
import Http_wcjtn_Unit from "../Net/HttpUnit";
import Mai_wcjtn_Liang from "../MaiLiangAPI/MaiLiang";
import Event_wcjtn_Mgr from "../Event/EventMgr";
import { Event_wcjtn_Def } from "../Event/EventDef";
import WX_wcjtn_API from "../WXAPI";
import App_wcjtn_Switch_wcjtn_Config from "../Config/AppSwitchConfig";
import Wu_wcjtn_dian_wcjtn_Mgr from "./WudianMgr";
import Cached_wcjtn_WX_wcjtn_BannerAd from "../CachedWXBannerAd";
import ALD from "../ALD";
import QQ_wcjtn_Mini_wcjtn_GameAPI from "../QQMiniGameAPI";
import WX_wcjtn_ADMgr from "./WXADMgr";
import Cached_wcjtn_QQ_wcjtn_BannerAd from "../CachedQQBannerAd";
import SceneManager from "../MyScripts/Manager/SceneManager";
import GameSwitchConfig from "../Config/GameSwitchConfig";

//游戏管理器，游戏代码的入口
export default class Game_wcjtn_Mgr extends Laya.Script {

    private static _instance: Game_wcjtn_Mgr = null;
    public static get_wcjtn_Instance(): Game_wcjtn_Mgr { return Game_wcjtn_Mgr._instance; }

    constructor() {
        super();
        Game_wcjtn_Mgr._instance = this;
    }

    onAwake()  {
        Mai_wcjtn_Liang.Get_wcjtn_Mai_wcjtn_Liang_wcjtn_OpenId(function (res) {
            console.log("GameUI 买量数据上报成功");
            Laya.Browser.window["wx"].onShow(function () {
                Mai_wcjtn_Liang.Get_wcjtn_Mai_wcjtn_Liang_wcjtn_OpenId(null, null);
            })
            Laya.Browser.window["wx"].onHide(function () {
                Mai_wcjtn_Liang.Report_wcjtn_Stay_wcjtn_Time(null, null);
            })
        },
            function (res) {
                console.log("GameUI 买量数据上报失败");
            }
        );

        WX_wcjtn_API.Set_wcjtn_Share_wcjtn_Menu("", "",
            () =>  {

            },
            () =>  {

            },
            () =>  {

            })
        

        Wu_wcjtn_dian_wcjtn_Mgr.Update_wcjtn_IpBlock_wcjtn_State();
        this.report_wcjtn_Launch_wcjtn_Options();
        
        if(Laya.Browser.onMiniGame)
        {
            //Cached_wcjtn_WX_wcjtn_BannerAd.pre_wcjtn_load_wcjtn_Banner(); 如果是老项目使用了 CachedWXBannerAd 这个类，请打开这一行注释
            WX_wcjtn_ADMgr._wcjtn_init_wcjtn_();//如果不是老项目，没有使用 WXADMgr 这个类, 请注释这一行。
        }
        else if (Laya.Browser.onQQMiniGame)
        {
            Cached_wcjtn_QQ_wcjtn_BannerAd.pre_wcjtn_load_wcjtn_Banner();
            QQ_wcjtn_Mini_wcjtn_GameAPI.Load_wcjtn_App_wcjtn_BoxAd(()=>{},()=>{});
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
        this.pre_wcjtn_Create_wcjtn_Game();
    }

    private pre_wcjtn_Create_wcjtn_Game(): void {
        //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面

        console.log("加载场景");
        let self = this;
        GameSwitchConfig.getInstance().hideBanner();
        //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
        Laya.Scene3D.load("subRes/LayaScene_scenes_01/Conventional/scenes_01.ls", Laya.Handler.create(self, function (scene: Laya.Scene3D): void {
            Laya.stage.addChild(scene) as Laya.Scene3D;
            scene.addComponent(SceneManager);
            Event_wcjtn_Mgr.ins_wcjtn_tance.dis_wcjtn_patch(Event_wcjtn_Def.App_Close_wcjtn_First_wcjtn_Loading_wcjtn_View);
            GameSwitchConfig.getInstance().SetBannerActive();
        }));
    }

    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    public save_wcjtn_Game_wcjtn_Data()  {
        localStorage.setItem("Game_wcjtn_Data", User_wcjtn_.get_wcjtn_Save_wcjtn_Data());
        // Http_wcjtn_Unit.save_wcjtn_Game_wcjtn_Data(User_wcjtn_.get_wcjtn_Save_wcjtn_Data(),
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

    protected report_wcjtn_Launch_wcjtn_Options()
    {
        Http_wcjtn_Unit.Get_wcjtn_user_wcjtn_ip((res)=>
        {
            if(1 == res.code)
            {
                console.log("获取玩家ip,地区成功 ：",res.data.dqip,res.data.ipxq);
                let opt : any = null;
                if(Laya.Browser.onMiniGame)
                {
                    opt = WX_wcjtn_API.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync();
                }
                else if(Laya.Browser.onQQMiniGame)
                {
                    opt = QQ_wcjtn_Mini_wcjtn_GameAPI.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync();
                }
                if(null != opt)
                {
                    ALD.ald_wcjtn_Send_wcjtn_Report_wcjtn_LaunchOptions(opt.scene,res.data.dqip,res.data.ipxq);
                }
            }
        },(res)=>
        {
            console.log("获取玩家ip,地区失败");
            let opt : any = null;
            if(Laya.Browser.onMiniGame)
            {
                opt = WX_wcjtn_API.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync();
            }
            else if(Laya.Browser.onQQMiniGame)
            {
                opt = QQ_wcjtn_Mini_wcjtn_GameAPI.get_wcjtn_Launch_wcjtn_Options_wcjtn_Sync();
            }
            if(null != opt)
            {
                ALD.ald_wcjtn_Send_wcjtn_Report_wcjtn_LaunchOptions(opt.scene,"","");
            }
        })
    }
}