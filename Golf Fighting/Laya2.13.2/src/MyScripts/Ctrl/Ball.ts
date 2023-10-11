import ConstManager from "../Manager/ConstManager";
import StrikeGroundManager from "../Manager/StrikeGroundManager";
import Player from "./Player";
import PlayerManager from "../Manager/PlayerManager";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import Us_sdlyg_er from "../../User/User";
import PreManager, { PreType } from "../Manager/PreManager";
import GameManager from "../Manager/GameManager";
import Sound_sdlyg_Mgr, { SoundType } from "../../Mgr/SoundMgr";
import VibrateMgr from "../../Mgr/VibrateMgr";

export default class Ball extends Laya.Script {
   

    private m_ball:Laya.Sprite3D;
    private m_rig:Laya.Rigidbody3D;
    // private max_power:Laya.Vector3 = new Laya.Vector3(0,340,340);  //不同场地对应的最大力度是不一样的
    private max_power:Laya.Vector3 = new Laya.Vector3(0,5.8,5.8);  //不同场地对应的最大力度是不一样的   //这个力度下面满力z轴位移6.68
    
    private m_tuowei:Laya.Sprite3D;
    private current_skin:string = "normal";
    private could_set_skin:boolean = false;
    private start_pos:Laya.Vector3;
    private m_current_tuowei:Laya.Sprite3D;

    private m_manager:Laya.Sprite3D;

    private m_id:number = 0;

    constructor() { super(); }
    
    onAwake(){
        this.m_ball = this.owner as Laya.Sprite3D;
        this.start_pos = this.m_ball.transform.position;
        this.Init();
    }

    onStart(){
        // Event_sdlyg_Mgr.instance.regEvemt(Event_sdlyg_Def.ChangeBall,this,this.setSkin);
    }

    onDestroy(){
        // Event_sdlyg_Mgr.instance.removeEvent(Event_sdlyg_Def.ChangeBall,this,this.setSkin);

    }



    Init(){
        this.m_rig = this.m_ball.getComponent(Laya.Rigidbody3D);
        this.m_rig.restitution = ConstManager.restitution;
        this.m_rig.rollingFriction = ConstManager.rollingFriction;
        this.m_rig.friction =  ConstManager.friction;
        this.m_rig.collisionGroup = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
        this.m_rig.overrideGravity = true;
        this.m_rig.gravity = new Laya.Vector3(0,-10,0);
        // this.m_rig.canCollideWith = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER ^ Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
        this.m_rig.ccdMotionThreshold = 0.001;
        for (let i = 0; i < this.m_ball.numChildren; i++) {
            this.m_ball.getChildAt(i).active = false;
        }
        // this.current_skin = Us_sdlyg_er.getSkinConfig().ball;
        this.hide();     
    }

    show(pos?:Laya.Vector3){
        this.m_rig.clearForces();
        if(this.m_current_tuowei)this.m_current_tuowei.destroy();
        if(pos)this.m_ball.transform.position = new Laya.Vector3(pos.x,pos.y+0.04,pos.z);
        this.m_current_tuowei = PreManager.createPre(PreType.Tuowei,this.m_ball);
        this.m_current_tuowei.transform.position = this.m_ball.transform.position;
        // this.m_rig.isKinematic = true;           
        this.m_ball.active = true;
    }

    hide(){
        this.m_ball.active= false;
    }

    beatBall(ratio:number,x_power:number=0){
        // this.m_rig.isKinematic = false;       
        let power = new Laya.Vector3(x_power,this.max_power.y*ratio,this.max_power.z*ratio);
        this.m_rig.applyImpulse(power);
        VibrateMgr.vibrateShort();
    }

    setSkin(name:string){
        if(!PreManager.CouldSetSkin){
            this.m_ball.getChildByName("normal").active = true;   
        }else if(PreManager.CouldSetSkin && this.owner.name=="aBall"){
            if(name != this.current_skin){
                this.m_ball.getChildByName(this.current_skin).active = false;
                this.current_skin = name;
            }
            this.m_ball.getChildByName(name).active = true; 
        }
    }

    lookAt(pos:Laya.Vector3){
        this.m_ball.transform.lookAt(pos,new Laya.Vector3(0,0,0));
    }

    getActive():boolean{
        return this.m_ball.active;
    }


    ballDestroy(){
        this.owner.destroy();
    }

    getBall():Laya.Sprite3D{
        return this.m_ball;
    }

    setID(id:number){
        this.m_id = id;
    }

    setManager(manager:Laya.Sprite3D){
        this.m_manager = manager;
    }

    getManager():Laya.Sprite3D{
        return this.m_manager;
    }

}