import RoadMgr from "./Road/RoadMgr";
import CarMgr from "./Car/CarMgr";
import Utilit_ from "../Utilit";
import CameraMoveScript from "./Tools/CameraMoveScript";
import GameControl from "./GameControl";
import View_ppxhc_Mgr, { View_ppxhc_Def } from "../Mgr/ViewMgr";
import CameraFollow from "./Camera/CameraFollow";
import CargoMgr from "./Cargoes/CargoMgr";
import User_ppxhc from "../User/User";
import Event_ppxhc_Mgr from "../Event/EventMgr";
import { Event_ppxhc_Def } from "../Event/EventDef";
import Sound_ppxhc_Mgr from "../Mgr/SoundMgr";
import Game_ppxhc_Mgr from "../Mgr/GameMgr";

export default class Game {
    public static basePath = "subRes/Game/LayaScene_Game/Conventional/";
    public static Scene: Laya.Scene3D = null;
    public static Camera: Laya.Camera = null;
    public static Prefabs: { [id: string]: Laya.Sprite3D } = {};

    public static Control: GameControl = null;
    public static CameraFollow: CameraFollow = null;

    public static LoadGame(caller: any, complete: Function): void {
        var scenePath = this.basePath + "Game.ls"
        Laya.Scene3D.load(scenePath, Laya.Handler.create(this, (scene) => {
            this.Scene = scene;
            this.Camera = Utilit_.FindChild(scene, "Camera/Main Camera") as Laya.Camera;
            Laya.stage.addChild(scene);
            Laya.stage.setChildIndex(scene, 0);
        }));
        let urls = [
            "subRes/Game/LayaScene_Game/Conventional/" + "Prefab.lh",
            "subRes2/Game/LayaScene_Game/Conventional/" + "Cars.lh",
        ]
        this.LoadGamePrefab(urls, this, () => {
            this.InitTools();
            this.InitManager();
            this.LoadGameScene(caller, complete);
            //ViewMgr.instance.openView(ViewDef.TestGame);
        });
    }

    private static LoadGamePrefab(urls: string[], caller: any, complete: Function): void {
        let loadFinishCount = 0;
        function CheckLoadSucceed() {
            loadFinishCount++;
            if (urls.length == loadFinishCount) {
                complete.call(caller);
            }
        }

        for (let i = 0; i < urls.length; i++) {
            let url = urls[i];
            Laya.Sprite3D.load(url, Laya.Handler.create(this, (prefab) => {
                let name = Laya.URL.getFileName(url);
                this.Prefabs[name.split(".")[0]] = prefab;
                CheckLoadSucceed();
            })); 
        }
    }

    private static InitTools(): void {
        this.Camera.addComponent(CameraMoveScript);
        Laya.timer.frameLoop(1, this, this.OnUpdate);
        //User_ppxhc.set_ppxhc_LeveNum(12);
    }

    private static InitManager(): void {
        Laya.Physics3DUtils.gravity = new Laya.Vector3(0, -15, 0);
        CarMgr.Instance.Init();
        RoadMgr.Instance.Init();
        CargoMgr.Instance.Init();
        this.Control = this.Scene.addComponent(GameControl);
        this.CameraFollow = this.Scene.getChildByName("Camera").addComponent(CameraFollow);
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.Car_Dead, this, this.ResetGame);
        Event_ppxhc_Mgr.instance.regEvemt_(Event_ppxhc_Def.Car_LevelUp, this, this.PlayNextGame);
        Sound_ppxhc_Mgr.instance_.play_ppxhc_BGM("background");
    }

    private static LoadGameScene(caller: any = null, complete: Function = null): void {
        let self = this;
        let handler = () => {
            self.Control.GameReady();
            Game_ppxhc_Mgr.getInstance().save_ppxhc_GameData();
        }

        RoadMgr.Instance.LoadRoadLh(this.Control.GetNextRoundName(User_ppxhc.get_ppxhc_LeveNum()), this, () => {
            handler.call(this);
            Event_ppxhc_Mgr.instance.dispatch_(Event_ppxhc_Def.Game_OnLevelStart, User_ppxhc.get_ppxhc_LeveNum());
            (complete != null) && (complete.call(caller));
        });

        Laya.Sprite3D.load(this.Control.GetNextRoundName(User_ppxhc.get_ppxhc_LeveNum() + 1), null)
    }

    public static PlayGame(): void {
        this.Control.GameStart();
    }

    private static ClearGame(): void {
        this.Control.GameClear();
        CarMgr.Instance.Clear();
        RoadMgr.Instance.Clear();
        CargoMgr.Instance.Clear();
        Laya.timer.once(400, this, () => {
            Laya.Resource.destroyUnusedResources();
        })
    }

    public static ResetGame(): void {
        this.ClearGame();
        this.LoadGameScene();
    }

    public static PlayNextGame(): void {
        this.ClearGame();
        this.LoadGameScene();
    }

    private static OnUpdate(): void {
       
    }
}