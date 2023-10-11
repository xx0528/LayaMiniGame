import Camera from "./Camera";
import SceneManager from "../Manager/SceneManager";
import GameManager from "../Manager/GameManager";

export default class Road extends Laya.Script {

    private mRoad:Laya.Sprite3D;
    // private mCameraPos:Laya.Vector3;
    private mShader:Laya.MeshSprite3D;

    constructor() { super(); }
    
    onAwake(){
        this.mRoad = this.owner as Laya.Sprite3D;
        this.mShader = this.mRoad.getChildByName("Plane026") as Laya.MeshSprite3D;
        this.mShader.meshRenderer.receiveShadow = true;
    }

}