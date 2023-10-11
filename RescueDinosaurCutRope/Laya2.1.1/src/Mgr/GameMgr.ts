import Util_JJKLBB_it from "../Utilit";
import View_JJKLBB_Mgr, { View_JJKLBB_Def } from "./ViewMgr";
import Us_JJKLBB_er from "../User/User";
import Http_JJKLBB_Unit from "../Net/HttpUnit";
import Mai_JJKLBB_Liang from "../MaiLiangAPI/MaiLiang";
import Even_JJKLBB_tMgr from "../Event/EventMgr";
import { Event_JJKLBB_Def } from "../Event/EventDef";
import WXAPI from "../WXAPI";
import AppSwitch_JJKLBB_Config from "../Config/AppSwitchConfig";
import Wudi_JJKLBB_anMgr from "./WudianMgr";
import MainView from "../View/MainView/MainView";
import SoundM_JJKLBB_gr from "./SoundMgr";
import CachedW_JJKLBB_XBannerAd from "../CachedWXBannerAd";
import Shar_JJKLBB_eAd from "../ShareAd/ShareAd";
import A_JJKLBB_LD, { ALDEv_JJKLBB_entDef } from "../ALD";
import { FreeRewardType } from "../View/FreeReward/FreeRewardView";
import GameSwitchConfig from "../Config/GameSwitchConfig";

//游戏管理器，游戏代码的入口
export default class Game_JJKLBB_Mgr extends Laya.Script {

    private static _instance: Game_JJKLBB_Mgr = null;
    public static getI_JJKLBB_nstan_JJKLBB_ce(): Game_JJKLBB_Mgr { return Game_JJKLBB_Mgr._instance; }

    constructor() {
        super();
        Game_JJKLBB_Mgr._instance = this;
    }

    onAwake() {
        A_JJKLBB_LD.aldSendOnlySingleReport(ALDEv_JJKLBB_entDef.EnterLoading);
        Wudi_JJKLBB_anMgr.Update_JJKLBB_IpBlock_JJKLBB_State();
        Laya.loader.maxLoader = 50;
        Mai_JJKLBB_Liang.GetMaiL_JJKLBB_iangOp_JJKLBB_enId(function (res) {
            console.log("GameUI 买量数据上报成功");
            Laya.Browser.window["wx"].onShow(function () {
                Mai_JJKLBB_Liang.GetMaiL_JJKLBB_iangOp_JJKLBB_enId(null, null);
            })
            Laya.Browser.window["wx"].onHide(function () {
                Mai_JJKLBB_Liang.Repo_JJKLBB_rtStayTim_JJKLBB_e(null, null);
            })
        },
            function (res) {
                console.log("GameUI 买量数据上报失败");
            }
        );

        WXAPI.SetShareMenu("恐龙宝宝被人绑架了，快来救救它吧！", "subRes/image/fenxiang.png",
            () => {

            },
            () => {

            },
            () => {

            })

        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_onGameC_JJKLBB_omplate, this, this.onGame_JJKLBB_Complate);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_Start_JJKLBB_Game, this, this.LoadG_JJKLBB_ame);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_PlayBgm, this, this.playBgm);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_StopBgm, this, this.stopBgm);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.AD_OnShareAdFail_UseCancel, this, this.switchBanner);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUserCr_JJKLBB_ystalChange, this, this.saveGa_JJKLBB_meData);
        Even_JJKLBB_tMgr.insta_JJKLBB_nce.regE_JJKLBB_vemt(Event_JJKLBB_Def.Game_OnUserE_JJKLBB_nergyCh_JJKLBB_ange, this, this.saveGa_JJKLBB_meData);
        this.saveGa_JJKLBB_meData();
        CachedW_JJKLBB_XBannerAd.preload_JJKLBB_Banner();
        Laya.timer.once(2000, this, () => {
            Shar_JJKLBB_eAd.get_JJKLBB_ADVs(Shar_JJKLBB_eAd.Insert_JJKLBB_AdLocationID, (res) => {
                console.log("预加载广告InsertAdLocationID");
            }, false, false);
            Shar_JJKLBB_eAd.get_JJKLBB_ADVs(Shar_JJKLBB_eAd.LoopAd_JJKLBB_LocationID, (res) => {
                console.log("预加载广告LoopAdLocationID");
            }, false, false);
            Shar_JJKLBB_eAd.get_JJKLBB_ADVs(Shar_JJKLBB_eAd.BannerAdL_JJKLBB_ocationID, (res) => {
                console.log("预加载广告BannerAdLocationID");
            }, false, false);
        });
    }

    onStart() {
        this.preCr_JJKLBB_eateGame();
    }

    private preCr_JJKLBB_eateGame(): void {
        if (Us_JJKLBB_er.getLev_JJKLBB_eNum() <= 1) {
            Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.App_CloseF_JJKLBB_irstLoadingView);
            let data = { levelNum: 1, costEnergy: 0, crystalReward: 5 };
            this.LoadG_JJKLBB_ame(data);
        }
        else {
            //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
            View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.MainView, null, (v: MainView) => {
                Even_JJKLBB_tMgr.insta_JJKLBB_nce.dispa_JJKLBB_tch(Event_JJKLBB_Def.App_CloseF_JJKLBB_irstLoadingView);
            })
        }

        SoundM_JJKLBB_gr.instance.pla_JJKLBB_yBGM("bgm");
        GameSwitchConfig.getInstance().SetBannerActive();
    }

    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    public saveGa_JJKLBB_meData() {
        localStorage.setItem("Game_Data", Us_JJKLBB_er.getS_JJKLBB_aveData());
        // Http_JJKLBB_Unit.saveGa_JJKLBB_meData(Us_JJKLBB_er.getS_JJKLBB_aveData(),
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

    protected onGame_JJKLBB_Complate(para) {
        var isWin: boolean = para.isWin;
        var levelNum: number = para.levelNum;
        var crystalReward: number = para.crystalReward;
        // let func: Function = () => {
        //     if (isWin) {
        //         Us_JJKLBB_er.unLockMax_JJKLBB_LevelNum(levelNum + 1);//解锁下一个关卡
        //         View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.GameRewardView,
        //             {
        //                 isWin: true,
        //                 levelNum: levelNum,
        //                 rewardNum: crystalReward
        //             });
        //     }
        //     else {
        //         View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.GameOverView,
        //             {
        //                 isWin: false,
        //                 levelNum: levelNum,
        //             });
        //     }
        // }

        // /* 游戏结束后直接打开更多好玩 */
        // View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.MoreGameView, { ContinueGame: true, closeFunction: func });

        if (isWin) {
            Us_JJKLBB_er.unLockMax_JJKLBB_LevelNum(levelNum + 1);//解锁下一个关卡
            View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.GameRewardView,
                {
                    isWin: true,
                    levelNum: levelNum,
                    rewardNum: crystalReward
                });
        }
        else {
            View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.GameOverView,
                {
                    isWin: false,
                    levelNum: levelNum,
                });
        }

    }

    LoadG_JJKLBB_ame(date: any) {
        if (Wudi_JJKLBB_anMgr.FirstWudianFlag && date.levelNum != 1) {
            let currTime = Laya.timer.currTimer;
            let data: any = {};
            data.PrizeCount = "恭喜获得皮肤";
            data.ClickType = 1;
            data.CompleteHander = Laya.Handler.create(this, (d) => {
                {
                    console.log("游戏开始狂点停留时间", (Laya.timer.currTimer - currTime) / 1000);
                    A_JJKLBB_LD.aldSendOnlySingleReport(ALDEv_JJKLBB_entDef.StayStartClickGetPrizeTime, {
                        "时间": (Laya.timer.currTimer - currTime) / 1000
                    });
                    View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.GameView, d);
                }
            }, [date]);
            View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.ClickGetPrize_2, data, () => {
                A_JJKLBB_LD.aldSendOnlySingleReport(ALDEv_JJKLBB_entDef.EnterStartClickGetPrize);
                A_JJKLBB_LD.aldSendOnlySingleReport(ALDEv_JJKLBB_entDef.EnterStartClickGetPrizeScene,
                    {
                        "场景值": WXAPI.getLaunchOptionsSync().scene
                    });
            });
        }
        else {
            if (Us_JJKLBB_er.getEn_JJKLBB_ergy < date.costEnergy) {
                View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.FreeRewardView,
                    {
                        rewardType: FreeRewardType.Energy
                    });
                View_JJKLBB_Mgr.insta_JJKLBB_nce.showTips("You have no energy left");
            }
            else {
                console.log("能量充足,开始游戏");
                View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.GameView, date);
            }

        }
        SoundM_JJKLBB_gr.instance.sto_JJKLBB_pBGM();
        // View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.GameView, date);
    }
    playBgm() {
        SoundM_JJKLBB_gr.instance.pla_JJKLBB_yBGM("bgm");
    }
    stopBgm() {
        SoundM_JJKLBB_gr.instance.sto_JJKLBB_pBGM();
    }
    switchBanner() {
        console.log("触发取消打开更多好玩");
        let moreGame = View_JJKLBB_Mgr.insta_JJKLBB_nce.getView(View_JJKLBB_Def.MoreGameView);
        let gamePlaying = View_JJKLBB_Mgr.insta_JJKLBB_nce.getView(View_JJKLBB_Def.GameView);
        if (moreGame == null && gamePlaying == null) {
            console.log("没有更多好玩界面或者游戏进行中界面，打开");
            View_JJKLBB_Mgr.insta_JJKLBB_nce.openView(View_JJKLBB_Def.MoreGameView, { ContinueGame: true, closeFunction: null });
        }
    }
}