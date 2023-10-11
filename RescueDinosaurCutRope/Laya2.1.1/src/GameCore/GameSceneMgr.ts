export default class GameSceneMgr extends Laya.Script {
    constructor() {
        super();
    }
    private static _instance: GameSceneMgr;
    public static get Instance(): GameSceneMgr {
        if (this._instance == null) {
            this._instance = Laya.stage.addComponent(GameSceneMgr)
        }
        return this._instance;
    }
    public _currentScene: Laya.Scene;
    public get CurrentScene(): Laya.Scene {
        return this._currentScene;
    }
    private _sceneParent: Laya.UIComponent;
    onAwake() {
        this._sceneParent = Laya.stage.addChildAt(new Laya.UIComponent(), Laya.stage.numChildren) as Laya.UIComponent;
        this._sceneParent.mouseThrough = true;
        this._sceneParent.width = Laya.stage.width;
        this._sceneParent.height = Laya.stage.height;
        this._sceneParent.left = 0;
        this._sceneParent.right = 0;
        this._sceneParent.top = 0;
        this._sceneParent.bottom = 0;
    }
    ResetStageLev() {
        
    }
    LoadScene(urlAddress: string) {
        urlAddress = "GameScene/CutRope.json"
        if (this._currentScene != null) {
            this._currentScene.destroy();
        }
        Laya.Scene.load(urlAddress, Laya.Handler.create(this, (scene) => {
            this._sceneParent.addChild(scene);
            // if()
        }, null));
    }
    ReloadScene() {

    }
}