
import PlayerManager from "../Manager/PlayerManager";
import SceneManager from "../Manager/SceneManager";
import GameManager from "../Manager/GameManager";
import Event_wcjtn_Mgr from "../../Event/EventMgr";
import { Event_wcjtn_Def } from "../../Event/EventDef";

export default class Coin extends Laya.Script {

    private mCoin:Laya.Sprite3D;
    private mGetEffect:Laya.Sprite3D;
    private mCoinModel:Laya.MeshSprite3D;
    private mCamera:Laya.Camera;
    
    constructor() { super(); }
    
    onAwake(){
        this.mCoin = this.owner as Laya.Sprite3D;
        this.mCoin.transform.scale.setValue(0.6,0.6,0.6);
        this.mGetEffect = this.mCoin.getChildByName("GetEffect") as Laya.Sprite3D;
        this.mGetEffect.active = false;
        this.mCoinModel = this.mCoin.getChildByName("CoinModel") as Laya.MeshSprite3D;
        
        this.mCamera = SceneManager.Instance().GetChildByName("Camera").getChildByName("Main Camera") as Laya.Camera;
    
        this.mCoinModel.meshRenderer.castShadow = true;
    }

    onEnable(){
        Event_wcjtn_Mgr.ins_wcjtn_tance.reg_wcjtn_Evemt(Event_wcjtn_Def.RecoverCoin,this,this.Hide);
    }

    onDestroy(){
        Event_wcjtn_Mgr.ins_wcjtn_tance.remove_wcjtn_Event(Event_wcjtn_Def.RecoverCoin,this,this.Hide);
        
    }

    onUpdate(){
        if(this.mCoinModel.active){
            this.mCoin.transform.localRotationEulerY-=6;
            this.JudgeGet();
        }
        if(this.mGetEffect.active){
            //跟随摄像机
            this.mGetEffect.transform.position = this.mCamera.transform.position;
        }
    }

    private JudgeGet(){
        if((Math.abs(this.mCoin.transform.position.x-PlayerManager.Instance().GetPlayerCar().GetHeadstock().x)<0.5)
            &&(Math.abs(this.mCoin.transform.position.z-PlayerManager.Instance().GetPlayerCar().GetHeadstock().z)<0.5)){
                this.GetCoin();
                this.mCoinModel.active = false;
            }
    }

    Show(pos:Laya.Vector3){
        this.mCoin.active = true;
        this.mCoinModel.active = true;
        this.mGetEffect.active = false;        
        this.mCoin.transform.localRotationEulerY = 0;
        this.mCoin.transform.position = pos;
    }

    Hide(){
        this.mCoin.active = false;
    }

    GetCoin(){
        GameManager.Instance().AddGetCoin(1);
        //展示获得金币的特效
        return;
        this.mGetEffect.active = true;
        Laya.timer.once(2000,this,()=>{
            // this.mGetEffect.active = false;
            this.Hide();
        })
        //记录金币TODO
    }

}