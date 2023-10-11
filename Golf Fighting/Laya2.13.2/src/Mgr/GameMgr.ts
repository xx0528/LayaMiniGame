import Utilit from "../Utilit";
import View_sdlyg_Mgr, { View_sdlyg_Def } from "./ViewMgr";
import Us_sdlyg_er from "../User/User";
import HttpUnit from "../Net/HttpUnit";
import MaiLiang from "../MaiLiangAPI/MaiLiang";
import Event_sdlyg_Mgr from "../Event/EventMgr";
import { Event_sdlyg_Def } from "../Event/EventDef";
import WXAPI from "../WXAPI";
import AppSwitchConfig from "../Config/AppSwitchConfig";
import WudianMgr from "./WudianMgr";
import CachedWXBannerAd from "../CachedWXBannerAd";
import SceneManager from "../MyScripts/Manager/SceneManager";
import GameSwitchConfig from "../Config/GameSwitchConfig";


//游戏管理器，游戏代码的入口
export default class Game_sdlyg_Mgr extends Laya.Script {

    private static _instance: Game_sdlyg_Mgr = null;
    public static getInstance(): Game_sdlyg_Mgr { return Game_sdlyg_Mgr._instance; }

    private level_json :JSON;

    constructor() {
        super();
        Game_sdlyg_Mgr._instance = this;
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
        //CachedWXBannerAd.preloadBanner();
    }

    onStart()  {
        this.preCreateGame();
    }

    private preCreateGame(): void {
        let self = this;
        //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
        GameSwitchConfig.getInstance().hideBanner();
        Laya.loader.load('subRes/json/levelConfig.json',Laya.Handler.create(self,()=>{
            self.level_json = Laya.loader.getRes('subRes/json/levelConfig.json');
            Laya.Scene3D.load("subRes/LayaScene_1/Conventional/1.ls", Laya.Handler.create(self, function(scene:Laya.Scene3D):void {
                Laya.stage.addChild(scene) as Laya.Scene3D;
                scene.addComponent(SceneManager);
                Event_sdlyg_Mgr.instance.dispatch(Event_sdlyg_Def.App_CloseFirstLoadingView); 
                GameSwitchConfig.getInstance().SetBannerActive();
            }));

        }))

    }

    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    public saveGameData()  {
        HttpUnit.saveGameData(Us_sdlyg_er.getSaveData(),
            (res) => {
                if (res.code == 1) {
                    console.log("存档成功")
                }
                else {
                    console.log("存档失败")
                }
            },
            (res) => {
                console.log("存档失败")
            })
    }

    getLevelJson():JSON{
        return this.level_json;
    }

}