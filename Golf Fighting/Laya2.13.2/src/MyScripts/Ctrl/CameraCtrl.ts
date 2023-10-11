import CameraMoveScript from "../../CameraMoveScript";
import { Utils3D } from "../../Utils3D";
import Event_sdlyg_Mgr from "../../Event/EventMgr";
import { Event_sdlyg_Def } from "../../Event/EventDef";
import ConstManager from "../Manager/ConstManager";
import Us_sdlyg_er from "../../User/User";

export default class CameraCtrl extends Laya.Script3D {

    private static _instance:CameraCtrl;
    public static Instance(){
        return this._instance;
    }

    private m_camera:Laya.Camera;
    private m_pos_tween:Laya.Tween;
    private m_rot_tween:Laya.Tween;


    private readonly stage_dis_z:number = 9;
    private readonly start_pos:Laya.Vector3 = new Laya.Vector3(-0.1905804677307608, 1.3980510931855037, -5.151574879005554);
    private readonly start_rot:Laya.Vector3 = new Laya.Vector3( -18.242095295912744, -175.63244273138994,  -2.662174102247288e-7);

    private readonly menu_pos:Laya.Vector3 = new Laya.Vector3(-1.3203681024909018, 0.38740019451555485,  -1.6522341995909826);
    private readonly menu_rot:Laya.Vector3 = new Laya.Vector3( 1.7896551374511018,  -51.74980009938377,  3.0064510732025026e-7);
    
    private readonly over_rot:Laya.Vector3 = new Laya.Vector3( -14.292124256280848, -52.523293122810394,  -1.1418999226818036e-7);

    private readonly look_trans_pos:Laya.Vector3 = new Laya.Vector3(this.menu_pos.x-this.start_pos.x,this.menu_pos.y-this.start_pos.y,this.menu_pos.z-this.start_pos.z);
    private readonly look_trans_rot:Laya.Vector3 = new Laya.Vector3(this.menu_rot.x-this.start_rot.x,this.menu_rot.y-this.start_rot.y,this.menu_rot.z-this.start_rot.z);



    private readonly bag_rot:Laya.Vector3 = new Laya.Vector3( -17.657678344879304,  -51.60885248178163, -0.0000014195851006527938);

    private moveTime:number=0;

    constructor() { super(); }
    
    onAwake(){
        CameraCtrl._instance = this;
        this.m_camera = this.owner as Laya.Camera;
        this.m_camera.addComponent(CameraMoveScript);
        this.moveTime = ConstManager.cameraMoveTime;
        this.SetInStart();
    }
    



    private SetInStart(){
        if(this.m_pos_tween)this.m_pos_tween.clear();
        this.SetTrans(this.start_pos,this.start_rot);
    }

    SetState(state:CameraState){
        let t_pos = this.m_camera.transform.position;      
        let t_rot = this.m_camera.transform.rotationEuler;
        let duration:number = 1000;
        switch (state) {
            case CameraState.Menu:
                t_pos = this.menu_pos;
                t_rot = this.menu_rot;
                break;
            case CameraState.GameStart:
                t_pos = this.start_pos;
                t_rot = this.start_rot;
                duration = 800;
                break;
            case CameraState.GameOver:
                t_pos = new Laya.Vector3(t_pos.x+this.look_trans_pos.x,t_pos.y+this.look_trans_pos.y,t_pos.z+this.look_trans_pos.z);
                t_rot = this.over_rot
                duration = 800;                         
                break;
            case CameraState.Bag:
                t_rot = this.bag_rot;
                duration = 300;
                break;
            case CameraState.GetScore:
                t_pos = new Laya.Vector3(t_pos.x,t_pos.y,t_pos.z+this.stage_dis_z);
                duration = 800;
                break;
            case CameraState.GameRelive:
                t_pos = new Laya.Vector3(t_pos.x-this.look_trans_pos.x,t_pos.y-this.look_trans_pos.y,t_pos.z-this.look_trans_pos.z);
                t_rot = new Laya.Vector3(t_rot.x-this.look_trans_rot.x,t_rot.y-this.look_trans_rot.y,t_rot.z-this.look_trans_rot.z); 
                duration = 800;                         
                break;
            case CameraState.OverDerive:
                if(Us_sdlyg_er.getLeveNum()>3){
                    t_pos = new Laya.Vector3(this.menu_pos.x,this.menu_pos.y,this.menu_pos.z+27);
                }
                duration = 10;                         
                break;
        }      
        this.CameraTween(duration,t_pos,t_rot);
    }

    private SetTrans(pos:Laya.Vector3,rot:Laya.Vector3){
        this.m_camera.transform.position = pos;
        this.m_camera.transform.rotationEuler = rot;
    }


    private CameraTween(duration:number,t_pos:Laya.Vector3,t_rot:Laya.Vector3){
        if(this.m_pos_tween)this.m_pos_tween.clear();
        if(this.m_rot_tween)this.m_rot_tween.clear();        
        let rot = this.m_camera.transform.rotationEuler;                
        let pos = this.m_camera.transform.position;
        this.m_pos_tween = Utils3D.tweenPosition(this.m_camera,duration,pos.x,pos.y,pos.z,t_pos.x,t_pos.y,t_pos.z,Laya.Ease.quintInOut);
        this.m_rot_tween = Utils3D.tweenRotationEuler(this.m_camera,duration,rot.x,rot.y,rot.z,t_rot.x,t_rot.y,t_rot.z,Laya.Ease.quintInOut);
    }

    GetCamera():Laya.Camera{
        return this.m_camera;
    }

    onKeyDown(e:Laya.Event){
        if(e.keyCode == 97){
            console.log("this.m_camera.transform.position",this.m_camera.transform.position);
            console.log("this.m_camera.transform.rotationEuler",this.m_camera.transform.rotationEuler);
        }
    }

}

export enum CameraState{
    Menu,
    GameStart,
    GameOver,
    Bag,
    GetScore,
    GameRelive,
    OverDerive,
}
