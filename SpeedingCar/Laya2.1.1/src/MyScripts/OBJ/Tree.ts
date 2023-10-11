import PlayerManager from "../Manager/PlayerManager";
import GameManager from "../Manager/GameManager";

export default class Tree extends Laya.Script {
    
    private mTree:Laya.Sprite3D;
    constructor() { super(); }

    onAwake(){
        this.mTree = this.owner as Laya.Sprite3D;
        this.mTree._children.forEach(child => {
            child.meshRenderer.castShadow = true;
        });
    }

    onUpdate(){
        if(PlayerManager.Instance().GetPlayerCar()&&this.InShow()){
            if(this.mTree.transform.position.z-PlayerManager.Instance().GetPlayerCar().GetTailstock().z<-50){
                this.Hide();
            }
        }
    }

    Show(dis:number){
        if(Math.random()>0.5){
            this.mTree.transform.position = new Laya.Vector3(this.mTree.transform.position.x,
                this.mTree.transform.position.y,dis);
        }else{
            this.mTree.transform.position = new Laya.Vector3(-this.mTree.transform.position.x,
                this.mTree.transform.position.y,dis);
        }

        this.mTree.active = true;
    }

    Hide(){
        this.mTree.active = false;

    }

    InShow():boolean{
        return this.mTree.active;
    }

}