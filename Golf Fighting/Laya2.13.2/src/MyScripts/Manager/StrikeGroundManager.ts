import PreManager, { PreType } from "./PreManager";

export default class StrikeGroundManager extends Laya.Script3D {

    private static _instance:StrikeGroundManager;
    public static Instance(){
        return this._instance;
    }
    private m_owner:Laya.Sprite3D;
    private m_effect_pre:Laya.Sprite3D;
    private effect_list:Laya.Sprite3D[] = new Array();
    constructor() { super(); }
    
    onAwake(){
        StrikeGroundManager._instance = this;
        this.m_owner = this.owner as Laya.Sprite3D;
        this.m_effect_pre = PreManager.getPre(PreType.StrikeGroundEffect);
        this.effect_list.push(this.m_effect_pre);
        this.m_effect_pre.active = false;
    }

    ShowEffect(pos:Laya.Vector3){
        let effect:Laya.Sprite3D = null;
        for(let i =0; i <this.effect_list.length; i++){
            if(!this.effect_list[i].active){
                effect = this.effect_list[i];
                break;
            }
        }
        if(effect==null){
            effect = PreManager.createPre(PreType.StrikeGroundEffect,this.m_owner);
            this.effect_list.push(effect);
        }
        effect.transform.position = pos;
        effect.active = true;
        Laya.timer.once(1000,this,()=>{
            effect.active = false;
        }) 
    }
}