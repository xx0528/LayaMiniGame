import StageManager from "../Manager/StageManager";
import BallManager from "../Manager/BallManager";
import CameraCtrl from "./CameraCtrl";
import Sound_sdlyg_Mgr, { SoundType } from "../../Mgr/SoundMgr";
import ShadowMaterial from "../../Common/ShadowMaterial";


export default class Player extends Laya.Script {

    private m_player:Laya.Sprite3D;
    private m_ani:Laya.Animator;

    constructor() { super(); }
    
    onAwake(){
        this.m_player = this.owner as Laya.Sprite3D;
        this.m_ani = this.m_player.getComponent(Laya.Animator);
        this.hide();   
    }
/**
 * 显示
 */
    show(){
        this.m_player.active = true;
    }
/**
 * 隐藏
 */
    hide(){
        this.m_player.active = false;
    }

/**
*根据不同的位置展示人物 
*/
    showPlayerByPos(pos:Laya.Vector3){
        if(!this.m_player.active)this.show();
        this.m_player.transform.position = new Laya.Vector3(pos.x+0.3,pos.y+0.02,pos.z);
        this.m_ani.play(PlayerAniType.Idle);
    }


/**
 * 蓄力
 */
    storgePower(){
        this.m_ani.speed = 1;
        this.m_ani.crossFade(PlayerAniType.StoragePower,0.05);
        this.m_ani.play(PlayerAniType.StoragePower);
    }
/**
 * 播放各种状态
 */    
    playAni(type:PlayerAniType){
        this.m_ani.speed = 1;
        this.m_ani.crossFade(type,0.05);
    }





/**
 * 释放力量
 * 返回力量比例
 */
    desorbPower(ratio:number){         
        this.m_ani.speed = 1;
        //不同的力度配上不同的效果
        if(ratio<=0.5){
            this.m_ani.play(PlayerAniType.LowDesorbPowerUp);
        }else if(ratio<0.8){
            this.m_ani.play(PlayerAniType.MiddleDesorbPowerUp);
        }else{
            this.m_ani.play(PlayerAniType.MaxDesorbPowerUp);
        }
        Sound_sdlyg_Mgr.instance.playSound(SoundType.DesorbPower);
    }

    getTrans():Laya.Vector3{
        return this.m_player.transform.position;
    }

    lookAt(pos:Laya.Vector3){
        this.m_player.transform.lookAt(pos,new Laya.Vector3(0,0,0))
    }

}

export enum PlayerAniType{
    Idle ="Idle",
    StoragePower = "StoragePower",
    MaxDesorbPowerUp = "MaxDesorbPowerUp",
    MiddleDesorbPowerUp = "MiddleDesorbPowerUp",
    LowDesorbPowerUp = "LowDesorbPowerUp",
    Celebrate = "Celebrate",
    Dismay = "Dismay",
    wudao = "wudao",
    
}