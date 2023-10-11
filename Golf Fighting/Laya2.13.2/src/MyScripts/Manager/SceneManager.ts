import GameManager from "./GameManager";
import PreManager from "./PreManager";
import StageManager from "./StageManager";
import BallManager from "./BallManager";
import CameraCtrl from "../Ctrl/CameraCtrl";
import PlayerManager from "./PlayerManager";
import App_sdlyg_Config from "../../AppConfig";
import AImanager from "./AIManager";
import Us_sdlyg_er from "../../User/User";

export default class SceneManager extends Laya.Script3D {


    private static _instance: SceneManager;
    public static Instance() {
        return this._instance;
    }
    private m_scene: Laya.Scene3D;
    private m_directionLight: Laya.DirectionLight;
    private env_plane_list: Laya.MeshSprite3D[] = new Array();
    private sky: Laya.SkyRenderer;
    private m_plane: Laya.MeshSprite3D;
    private m_water: Laya.Sprite3D;

    private last_specila_trans :number = 0;

    private env_sprite3D_list: Laya.Sprite3D[] = new Array();

    private readonly skyPath: string[] = [
        "subRes/LayaScene_1/Conventional/Assets/Mat/sky04.lmat",            //夜晚        
        "subRes/LayaScene_1/Conventional/Assets/Mat/sky02.lmat",            //白天
    ]
    private readonly awardSkyPath: string = "subRes/LayaScene_1/Conventional/Assets/Mat/sky07.lmat"      //奖励天空材质

    private current_special_cj: Laya.Sprite3D;

    constructor() { super(); }

    onAwake() {
        SceneManager._instance = this;
        this.m_scene = this.owner as Laya.Scene3D;
        this.Init();
    }

    Init() {
        let preManager = this.m_scene.getChildByName("PreManager") as Laya.Sprite3D;
        preManager.addComponent(PreManager);
        let gameManager = this.m_scene.getChildByName("GameManager") as Laya.Sprite3D;
        gameManager.addComponent(GameManager);
        let stageManager = this.m_scene.getChildByName("StageManager") as Laya.Sprite3D;
        stageManager.addComponent(StageManager);
        let camera = this.m_scene.getChildByName("Main Camera") as Laya.Camera;
        camera.addComponent(CameraCtrl);
        let playerManager = this.m_scene.getChildByName("PlayerManager") as Laya.Sprite3D;
        playerManager.addComponent(PlayerManager);
        let aiManager = this.m_scene.getChildByName("AIManager") as Laya.Sprite3D;
        aiManager.addComponent(AImanager);

        this.m_directionLight = this.m_scene.getChildByName("Directional Light") as Laya.DirectionLight;
        this.sky = this.m_scene.skyRenderer;
        this.m_plane = this.m_scene.getChildByName("Plane") as Laya.MeshSprite3D;
        for (let i = 0; i < 4; i++) {
            let p = this.m_plane.getChildByName("Plane" + i) as Laya.MeshSprite3D;
            this.env_plane_list.push(p);
        }
        this.m_water = this.m_plane.getChildByName("water") as Laya.Sprite3D;

        Laya.Sprite3D.load(App_sdlyg_Config.ResServer + "/stage/Conventional/stage.lh", Laya.Handler.create(this, function (sp) {
            for (let i = 0; i < 4; i++) {
                let cj = sp.getChildByName("cj" + i) as Laya.Sprite3D;
                this.m_scene.addChild(cj);                
                this.env_sprite3D_list.push(cj);
                cj.transform.translate(new Laya.Vector3(0,0.25,0));
                cj.active = false;
            }
            console.log(this.env_sprite3D_list.length);
            // this.special_cj_0 = sp.getChildByName("cj0") as Laya.Sprite3D;
            // this.m_scene.addChild(this.special_cj_0);
            // this.special_cj_0.active = false;
            // this.special_cj_0.transform.translate(new Laya.Vector3(0,0.25,0));
            // this.special_cj_0_startPos = this.special_cj_0.transform.position;
        }));
        // this.setLight();
        this.randomEnv();
    }

    setLight() {
        //灯光开启阴影
        this.m_directionLight.shadowMode = Laya.ShadowMode.SoftLow;
        //可见阴影距离
        this.m_directionLight.shadowDistance = 5;
        //生成阴影贴图尺寸
        this.m_directionLight.shadowResolution = 2048;
        // //生成阴影贴图数量
        // this.m_directionLight.shadowPSSMCount = 1;
        // //模糊等级,越大越高,更耗性能
        // this.m_directionLight.shadowPCFType = 3;
    }

    /**
    * 随机配置当局游戏环境
    */
    randomEnv() {
        // this.m_plane.meshRenderer.material = this.m_plane.meshRenderer.materials[0]; 
        this.m_plane.active = true;
        this.m_water.active = true;
        if (this.current_special_cj) this.current_special_cj.active = false;
        let num = Math.floor(Math.random() * 2);
        if (GameManager.Instance().getIsAwardGame()) {
            this.setAwardScene();
        } else {
            this.SetSkyMat(this.skyPath[num]);
        }
        this.env_plane_list.forEach(plane => {
            if (num == 0) num = 2;
            plane.meshRenderer.material = plane.meshRenderer.materials[num];
        });
        // if(Math.random()<1 && this.special_cj_0)this.addEnv();
        if (GameManager.Instance().getIsRank()) {
            this.addEnv();
        }
    }

    setRankEnv(cj: Laya.Sprite3D) {
        cj.transform.translate(new Laya.Vector3(0,0,-this.last_specila_trans));
        let num = 9 - GameManager.Instance().getCurrentStageAmount();
        this.last_specila_trans = -9 * num + 2;
        let tran = new Laya.Vector3(0, 0, this.last_specila_trans);
        cj.transform.translate(tran);
        cj.active = true;
        this.m_water.active = false;
    }
    /**
     * 加入特殊场景
     */
    addEnv() {
        if (this.env_sprite3D_list.length > 0) {
            let i = 0;
            if (Math.floor((Us_sdlyg_er.getRankLevel() / 5)) == 2) i = 1;
            if (Math.floor((Us_sdlyg_er.getRankLevel() / 5)) == 3) i = 2;
            if (Math.floor((Us_sdlyg_er.getRankLevel() / 5)) == 4) i = 3;
            if (Math.floor((Us_sdlyg_er.getRankLevel() / 5)) == 5) i = 3;
            this.current_special_cj = this.env_sprite3D_list[i];
            this.setRankEnv(this.current_special_cj);
            this.m_plane.active = i == 0;
        }
    }

    setAwardScene() {
        this.SetSkyMat(this.awardSkyPath);
        // this.m_plane.meshRenderer.material = this.m_plane.meshRenderer.materials[1];
    }

    SetSkyMat(path: string) {
        Laya.BaseMaterial.load(path, Laya.Handler.create(this, function (mat) {
            //设置天空盒材质
            this.sky.material = mat;
        }));
    }



}