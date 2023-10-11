import PlayerManager from "../Manager/PlayerManager";
import GameManager from "../Manager/GameManager";

export default class Rock extends Laya.Script {
    
    private mRock:Laya.Sprite3D;
    private mModel:Laya.MeshSprite3D;
    constructor() { super(); }

    onAwake(){
        this.mRock = this.owner as Laya.Sprite3D;
        this.mModel = this.mRock.getChildByName("model") as Laya.MeshSprite3D;
        this.mModel.meshRenderer.castShadow = true;
    }

    onUpdate(){
        if(PlayerManager.Instance().GetPlayerCar()&&this.InShow()){
            if(this.mRock.transform.position.z-PlayerManager.Instance().GetPlayerCar().GetTailstock().z<-15){
                this.Hide();
            }
        }
    }

    Show(dis:number){
        this.mRock.transform.position = new Laya.Vector3(this.mRock.transform.position.x,
            this.mRock.transform.position.y,dis);
        this.mModel.transform.localRotationEulerY+=Math.random()*360;
        this.mRock.active = true;
    }

    Hide(){
        this.mRock.active = false;
    }

    InShow():boolean{
        return this.mRock.active;
    }

}