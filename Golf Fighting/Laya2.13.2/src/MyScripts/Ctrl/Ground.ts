import ConstManager from "../Manager/ConstManager";
import Ball from "./Ball";
import PlayerManager from "../Manager/PlayerManager";
import GameManager from "../Manager/GameManager";

export default class Ground extends Laya.Script3D {
    
    private m_ground:Laya.MeshSprite3D;
    private m_rig:Laya.Rigidbody3D;

    constructor() { super(); }
    
    onAwake(){
        this.Init();
    }

    Init(){
        this.m_ground = this.owner as Laya.MeshSprite3D;        
        this.m_rig = this.m_ground.getComponent(Laya.Rigidbody3D);
        this.m_rig.isKinematic = true;
        this.m_rig.restitution = ConstManager.restitution;

        this.m_rig.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
        
        
        // if(true){
        //     this.m_ground.meshRenderer.material = this.m_ground.meshRenderer.materials[1];
        // }
        //this.showShadow();
        
    }

    showShadow(){
        console.log("执行了一次地面接收影子")
        this.m_ground.meshRenderer.receiveShadow = true;
    }


    // onCollisionEnter(collision: Laya.Collision){
    //     let ball = collision.other.owner as Laya.Sprite3D;
    //     console.log("ball.transform.position",ball.transform.position);
    // }
}