import Uti_XYXZS_lit from "../Utilit";
import Vie_XYXZS_wMgr, { Vie_XYXZS_wDef } from "./ViewMgr";
import Us_XYXZS_er from "../User/User";
import Http_XYXZS_Unit from "../Net/HttpUnit";
import Mai_XYXZS_Liang from "../MaiLiangAPI/MaiLiang";
import Even_XYXZS_tMgr from "../Event/EventMgr";
import { Even_XYXZS_tDef } from "../Event/EventDef";
import W_XYXZS_XAPI from "../WXAPI";
import AppSwi_XYXZS_tchConfig from "../Config/AppSwitchConfig";
import Wudi_XYXZS_anMgr from "./WudianMgr";
import Cached_XYXZS_WXBannerAd from "../CachedWXBannerAd";
import A_XYXZS_LD from "../ALD";
import QQMini_XYXZS_GameAPI from "../QQMiniGameAPI";
import Stora_XYXZS_geMgr, { Stor_XYXZS_ageReq } from "./StorageMgr";
import SceneManager from "../Script/GameCore/SceneManager";
import MainView from "../Scrips/MyView/GameView/MainView/MainView";
import GameSwitchConfig from "../Config/GameSwitchConfig";

//游戏管理器，游戏代码的入口
export default class Gam_XYXZS_eMgr extends Laya.Script {

    private static _inst_XYXZS_ance: Gam_XYXZS_eMgr = null;
    public static getIns_XYXZS_tance(): Gam_XYXZS_eMgr { return Gam_XYXZS_eMgr._inst_XYXZS_ance; }
    public isLo_XYXZS_adOver: boolean = false;
    //#region 自定义代码 
    /* 当前游戏场景 */
    /**
     * 当前游戏场景对外封装
     * 
     * @readonly
     * @type {Laya.Scene3D}
     * @memberof GameMgr
     */
    public get Curre_XYXZS_ntScene(): Laya.Scene3D {
        return this._curr_XYXZS_entScene;
    }
    private _curr_XYXZS_entScene: Laya.Scene3D;

    /* 当前关卡等级 */
    private _curr_XYXZS_entLevel: number = 0;
    /* 当前关卡等级对外封装 */
    public get Curr_XYXZS_entLevel(): number {
        return this._curr_XYXZS_entLevel + 1;
    }

    // /**
    //  * 当前游戏场景管理器对外封装
    //  * 
    //  * @readonly
    //  * @type {SceneManager}
    //  * @memberof GameMgr
    //  */
    // public get SceneMgr(): SceneManager {
    //     return this._SceneMgr;
    // }
    // private _SceneMgr: SceneManager;
    // //#endregion

    constructor() {
        super();
        Gam_XYXZS_eMgr._inst_XYXZS_ance = this;
    }

    onAwake() {
        Mai_XYXZS_Liang.GetMai_XYXZS_LiangOpenId(function (res) {
            console.log("GameUI 买量数据上报成功");
            Laya.Browser.window["wx"].onShow(function () {
                Mai_XYXZS_Liang.GetMai_XYXZS_LiangOpenId(null, null);
            })
            Laya.Browser.window["wx"].onHide(function () {
                Mai_XYXZS_Liang.ReportS_XYXZS_tayTime(null, null);
            })
        },
            function (res) {
                console.log("GameUI 买量数据上报失败");
            }
        );

        W_XYXZS_XAPI.SetSha_XYXZS_reMenu("", "",
            () => {

            },
            () => {

            },
            () => {

            })


        Wudi_XYXZS_anMgr.Update_XYXZS_IpBlockState();
        Cached_XYXZS_WXBannerAd.preloa_XYXZS_dBanner();
        this.repor_XYXZS_tLaunchOptions();

    }

    onStart() {
        this.preCre_XYXZS_ateGame();
    }

    private preCre_XYXZS_ateGame(): void {
        GameSwitchConfig.getInstance().SetBannerActive();
        //todo：这里添加初始化主场景的代码。EventMgr.instance.dispatch(EventDef.App_CloseFirstLoadingView); 添加到你的关卡加载完成的回调中，关闭加载界面
        Vie_XYXZS_wMgr.inst_XYXZS_ance.open_XYXZS_View(Vie_XYXZS_wDef.Main_XYXZS_View, null, (v: MainView) => {
            Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.App_Close_XYXZS_FirstLoadingView);
        })
        this.GetStorageData();
        this.CreatGameScene();
        // ViewMgr.instance.openView(ViewDef.FakeExport);
    }

    //游戏存档,仅当作示例，实际存档根据实际项目各自实现
    public save_XYXZS_GameData() {
        Laya.LocalStorage.setItem("Game_Data", Us_XYXZS_er.getSa_XYXZS_veData());
        // Http_XYXZS_Unit.saveGa_XYXZS_meData(Us_XYXZS_er.getSa_XYXZS_veData(),
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

    protected repor_XYXZS_tLaunchOptions() {
        Http_XYXZS_Unit.Getu_XYXZS_serip((res) => {
            if (1 == res.code) {
                console.log("获取玩家ip,地区成功 ：", res.data.dqip, res.data.ipxq);
                let opt: any = null;
                if (Laya.Browser.onMiniGame) {
                    opt = W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync();
                }
                else if (Laya.Browser.onQQMiniGame) {
                    opt = QQMini_XYXZS_GameAPI.getLaunc_XYXZS_hOptionsSync();
                }
                if (null != opt) {
                    A_XYXZS_LD.aldSendRe_XYXZS_portLaunchOptions(opt.scene, res.data.dqip, res.data.ipxq);
                }
            }
        }, (res) => {
            console.log("获取玩家ip,地区失败");
            let opt: any = null;
            if (Laya.Browser.onMiniGame) {
                opt = W_XYXZS_XAPI.getLaun_XYXZS_chOptionsSync();
            }
            else if (Laya.Browser.onQQMiniGame) {
                opt = QQMini_XYXZS_GameAPI.getLaunc_XYXZS_hOptionsSync();
            }
            if (null != opt) {
                A_XYXZS_LD.aldSendRe_XYXZS_portLaunchOptions(opt.scene, "", "");
            }
        })
    }


    //#region 自己写的代码
    /**
     * 存储游戏数据到本地
     * 
     * @memberof GameUI
     */
    StorageState() {
        var CurrentLevel = new Stor_XYXZS_ageReq();
        CurrentLevel.k_XYXZS_ey = "CurrentLevel";
        CurrentLevel.d_XYXZS_ata = this._curr_XYXZS_entLevel != null ? this._curr_XYXZS_entLevel : 0;
        Stora_XYXZS_geMgr.setSt_XYXZS_orage(CurrentLevel);
    }
    /**
     * 
     * 
     * @memberof GameUI
     */
    GetStorageData() {
        let lev = Stora_XYXZS_geMgr.getS_XYXZS_torage("CurrentLevel") as string;
        if (lev == null || lev == "") {
            lev = "0";
        }
        this._curr_XYXZS_entLevel = parseInt(lev);
    }
    /**
     * 加载下一关游戏场景
     * 
     * @memberof GameManager
     */
    public CreatNextGameScene() {
        this._curr_XYXZS_entLevel++;
        // if (this._currentLevel > 2) {
        //     this._currentLevel = 1;
        // }
        this.isLo_XYXZS_adOver = false;
        this.CreatGameScene();
    }
    /**
     * 加载游戏场景
     * 
     * @memberof GameManager
     */
    public CreatGameScene() {
        this.StorageState();
        let url = "subRes/LayaScene_Test/Conventional/Test.ls";
        if (this._curr_XYXZS_entScene) {
            this._curr_XYXZS_entScene.destroy();
        }
        Laya.Scene3D.load(url, Laya.Handler.create(this, (scene) => {
            this._curr_XYXZS_entScene = scene;
            Laya.stage.addChildAt(this._curr_XYXZS_entScene, 0);
            this._curr_XYXZS_entScene.addComponent(SceneManager);
            // ViewMgr.instance.openView(ViewDef.GamePlaying);
            //ViewMgr.instance.openView(ViewDef.MainView)
            this.isLo_XYXZS_adOver = true;
            Even_XYXZS_tMgr.in_XYXZS_stance.disp_XYXZS_atch(Even_XYXZS_tDef.App_Close_XYXZS_FirstLoadingView);
        }));
    }
    //#endregion
}