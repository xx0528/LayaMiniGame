import Utilit from "../Utilit";
import View_myqq_Mgr, { ViewDef } from "./ViewMgr";
import User_yy from "../User/User";
import Http_myqq_Unit from "../Net/HttpUnit";
import MaiLiang from "../MaiLiangAPI/MaiLiang";
import Event_myqq_Mgr from "../Event/EventMgr";
import { EventDef } from "../Event/EventDef";
import WXAPI from "../WXAPI";
import GameController from "../Game/GameController";
import Version, { Song, ChargeType } from "../Game/Version";
import GameConst from "../Game/GameConst";
import AppSwitchConfig from "../Config/AppSwitchConfig";
import SoundManager from "../Game/SoundManager";

//游戏管理器，游戏代码的入口
export default class Game_myqq_Mgr extends Laya.Script {

    private static _instance : Game_myqq_Mgr = null;
    public static getInstance() : Game_myqq_Mgr { return Game_myqq_Mgr._instance;}

    constructor() 
    {
         super(); 
         Game_myqq_Mgr._instance = this;
    }

    onAwake()
    {
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

        WXAPI.SetShareMenu("","",
        ()=>
        {
            
        },
        ()=>
        {
            
        },
        ()=>
        {

        })
    }

    onStart()
    {
        this.Test();
        this.preCreateGame();
    }

    Test(): void {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window["wx"].onShow(() => { 
                Event_myqq_Mgr.instance.dispatch(EventDef.Game_FOCUS);
            });
            Laya.Browser.window["wx"].onHide(() => { 
                Event_myqq_Mgr.instance.dispatch(EventDef.Game_BLUR);
            });
        } 
        else {
            Laya.stage.on(Laya.Event.BLUR, this, () => {
                Event_myqq_Mgr.instance.dispatch(EventDef.Game_BLUR);
            });
            Laya.stage.on(Laya.Event.FOCUS, this, () => {
                Event_myqq_Mgr.instance.dispatch(EventDef.Game_FOCUS);
            });
        }
    }

    private preCreateGame(): void {
        if (Laya.Browser.onMiniGame) {
            Laya.MiniAdpter.autoCacheFile = true;
        }
        Laya.SoundManager.autoStopMusic = false;

        Version.Load(GameConst.GetLocalSubResVersionPath)
        // Version.Load(GameConst.GetRemoteVersionPath, this, () => {
            
        // });

        this.LoadGame();
        this.save_myqq_GameData();
    }

    private LoadGame(): void {
        //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
        GameController.Instance.Init(this, () => {
            if (SoundManager.Instance.IsFirstEnterGame()) {
                let song = Version.songs[0].clone();
                song.showOneColor = true;
                song.chargeType = ChargeType.Free;
                User_yy.addMoney(10);
                SoundManager.Instance.PlaySong(song, this, () => {
                    Event_myqq_Mgr.instance.dispatch(EventDef.App_CloseFirstLoadingView);
                });
            } else {
                View_myqq_Mgr.instance.openView(ViewDef.GameMainView, null, () => {
                    Event_myqq_Mgr.instance.dispatch(EventDef.App_CloseFirstLoadingView);
                });
            }
        });
    }

    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    public save_myqq_GameData(caller?: any, completed?: Function)  {
        let callBack = (succeed) => { if (completed) completed.call(caller, succeed) }

        localStorage.setItem("Game_Data", User_yy.getSaveData());
        callBack(true);

        // Http_myqq_Unit.saveGameData(User_yy.getSaveData(),
        //     (res) => {
        //         if (res.code != 1) {
        //             callBack(false);
        //             console.log("存档失败")
        //             return;
        //         }

        //         callBack(true);
        //         console.log("存档成功")
        //     },
        //     (res) => {
        //         callBack(false);
        //         console.log("存档失败")
        //     })
    }
}