import MultiplePassOutlineMaterial from "../Shader/MultiplePassOutlineMaterial";
import GameManager from "../Manager/GameManager";

export default class Wheel extends Laya.Script {

    private mWheel:Laya.Sprite3D;
    
    constructor() { super(); }
    
    onAwake(){
        this.mWheel = this.owner as Laya.Sprite3D;
        
        let mesh = this.mWheel.getChildByName("BackRight_0") as Laya.MeshSprite3D;
        mesh.meshRenderer.castShadow = true;
    }

    onUpdate(){
        this.mWheel.transform.localRotationEulerX-=12;
    }

    Reset(){
        // this.mWheel.transform.localRotationEulerX = 0;
    }
}