import Ground from "./Ground";
import PreManager, { PreType } from "../Manager/PreManager";
import Hole from "./Hole";
import Us_sdlyg_er from "../../User/User";
import GameManager from "../Manager/GameManager";
import SceneManager from "../Manager/SceneManager";

export default class Stage extends Laya.Script3D {


    protected m_stage:Laya.Sprite3D;
    protected m_ground:Laya.MeshSprite3D;
    protected m_flagPos_list:Laya.Vector3[]=new Array();
    protected m_flag_amount:number;
    protected m_beatPos:Laya.Vector3;
    protected m_hole:Hole;

    private barrier_type_list:PreType[] = [
        PreType.ObstacleBarre,      //0
        PreType.ObstacleTurnAround,       //1
        PreType.ObstacleCut,        //2
        PreType.ObstacleTurnAround1,        //3
        PreType.ObstacleStairs          //4
    ];

    protected right_dis:number = 0;
    
    constructor() {
        super();
    }

    onAwake(){
        this.m_stage = this.owner as Laya.Sprite3D;
        this.Init();          
    }
    
    Init(){
        this.m_ground = this.m_stage.getChildByName("Ground") as Laya.MeshSprite3D;
        this.m_ground.addComponent(Ground);
        let flagPos:Laya.Sprite3D = this.m_stage.getChildByName("flagPos") as Laya.Sprite3D;
        this.m_flag_amount = flagPos.numChildren;
        for(let i = 0 ; i < this.m_flag_amount ; i++){
            let qizhi = flagPos.getChildByName("qizhi"+i) as Laya.Sprite3D;
            this.m_flagPos_list.push(qizhi.transform.position);
        }
        let beatPos:Laya.Sprite3D = this.m_stage.getChildByName("beatPos") as Laya.Sprite3D;
        this.m_beatPos = beatPos.transform.position;

        if(GameManager.Instance().getIsAwardGame()){
            this.m_ground.meshRenderer.material = this.m_ground.meshRenderer.materials[1];
            let m_static = this.m_stage.getChildByName("Static") as Laya.MeshSprite3D;
            m_static.meshRenderer.material = m_static.meshRenderer.materials[1];
        }

        if(GameManager.Instance().getIsRank()){
            let i = 0;
            if(Math.floor((Us_sdlyg_er.getRankLevel() / 5)) <=1 ) i = 2;
            if (Math.floor((Us_sdlyg_er.getRankLevel() / 5)) == 3) i = 4;
            if (Math.floor((Us_sdlyg_er.getRankLevel() / 5)) >= 4) i = 1;
            this.m_ground.meshRenderer.material = this.m_ground.meshRenderer.materials[i];
            let m_static = this.m_stage.getChildByName("Static") as Laya.MeshSprite3D;
            m_static.meshRenderer.material = m_static.meshRenderer.materials[i];

        }
    }

    Show(pos:Laya.Vector3){
        this.m_stage.transform.position = pos;
        this.m_stage.active = true;
    }

    Hide(){
        this.m_stage.active = false;
    }
/**
 * 随机获得一个旗帜的位置
 */
    RandomFlagPos():Laya.Vector3{
        let res = Math.floor(Math.random()*this.m_flag_amount);
        return this.m_flagPos_list[res];
    }

    GetBeatPos():Laya.Vector3{
        return this.m_beatPos;
    }

/**
 * 随机设置旗帜在当前场地上的位置
 */
    CreateFlag(barrier_id?:number){
        let flag:Laya.Sprite3D = PreManager.createPre(PreType.Flag,this.m_stage);
        flag.transform.position = this.RandomFlagPos();
        this.m_hole = flag.getChildByName("Hole").addComponent(Hole);


        if(Us_sdlyg_er.getLeveNum()>10){
            if(Math.random()<0.25){
                this.CreateBarrier(flag);
            }
        }else{
            if(barrier_id!=null){
                this.CreateBarrier(flag,barrier_id);
            }           
        }
        this.right_dis = flag.transform.position.z-this.m_beatPos.z;
    } 

    CreateBarrier(flag:Laya.Sprite3D,barrier_id?:number){
        if(barrier_id==null)barrier_id =Math.floor(Math.random()*this.barrier_type_list.length);
        let barrier:Laya.Sprite3D = PreManager.createPre(this.barrier_type_list[barrier_id],this.m_stage);
        barrier.transform.position =flag.transform.position;
    }
    
    SetHoleId(id:number){
        this.m_hole.setId(id);
    }

    getRightDis():number{
        return this.right_dis;
    }

    getHolePos():Laya.Vector3{
        return this.m_hole.getPos();
    }
    

}